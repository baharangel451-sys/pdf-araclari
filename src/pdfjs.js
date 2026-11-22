// PDF.js ile konum bilgili metin çıkarma ve (Poppler yoksa) sayfa görüntüleme.
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
let pdfjsPromise;
function pdfjs() {
  pdfjsPromise ??= import('pdfjs-dist/legacy/build/pdf.mjs');
  return pdfjsPromise;
}
const pkgDir = path.dirname(require.resolve('pdfjs-dist/package.json'));
const asDirUrl = (d) => pathToFileURL(path.join(pkgDir, d) + path.sep).href;

export async function openPdf(file) {
  const { getDocument } = await pdfjs();
  const data = new Uint8Array(await readFile(file));
  return getDocument({
    data,
    // Türkçe karakterler ve CJK fontları için CMap ve standart font verileri
    cMapUrl: asDirUrl('cmaps'),
    cMapPacked: true,
    standardFontDataUrl: asDirUrl('standard_fonts'),
    useSystemFonts: false,
    verbosity: 0,
  }).promise;
}

/**
 * Bir sayfanın metin parçalarını konumlarıyla döndürür ve satırlara birleştirir.
 * y ekseni yukarıdan aşağıya olacak şekilde çevrilir.
 */
export async function pageItems(doc, pageNo) {
  const page = await doc.getPage(pageNo);
  const vp = page.getViewport({ scale: 1 });
  const tc = await page.getTextContent({ includeMarkedContent: false });
  const items = tc.items
    .filter((it) => typeof it.str === 'string' && it.str.trim() !== '')
    .map((it) => {
      const [, , , d, e, f] = it.transform;
      const h = Math.abs(it.height || d) || 10;
      return { str: it.str, x: e, y: vp.height - f, w: it.width, h };
    });
  return { width: vp.width, height: vp.height, items, lines: groupLines(items) };
}

/** Aynı taban çizgisindeki parçaları satırlarda toplar; satır içi büyük boşlukları "hücre" ayrımı olarak işaretler. */
export function groupLines(items) {
  const sorted = [...items].sort((a, b) => a.y - b.y || a.x - b.x);
  const lines = [];
  for (const it of sorted) {
    const last = lines[lines.length - 1];
    if (last && Math.abs(last.y - it.y) <= Math.max(2, Math.min(last.h, it.h) * 0.45)) {
      last.items.push(it);
      last.h = Math.max(last.h, it.h);
    } else {
      lines.push({ y: it.y, h: it.h, items: [it] });
    }
  }
  for (const line of lines) {
    line.items.sort((a, b) => a.x - b.x);
    // Hücrelere böl: aradaki boşluk font yüksekliğinin ~0.9 katından büyükse yeni hücre
    const cells = [];
    for (const it of line.items) {
      const cur = cells[cells.length - 1];
      const gap = cur ? it.x - (cur.x1) : Infinity;
      if (cur && gap < line.h * 0.9) {
        cur.text += (gap > line.h * 0.15 && !cur.text.endsWith(' ') && !it.str.startsWith(' ') ? ' ' : '') + it.str;
        cur.x1 = it.x + it.w;
      } else {
        cells.push({ x0: it.x, x1: it.x + it.w, text: it.str });
      }
    }
    line.cells = cells.map((c) => ({ ...c, text: c.text.replace(/\s+/g, ' ').trim() }));
    line.x = line.cells[0]?.x0 ?? 0;
    line.text = line.cells.map((c) => c.text).join('  ');
  }
  return lines;
}

/** Poppler yoksa PDF.js + @napi-rs/canvas ile sayfayı PNG tamponuna işler (OCR için). */
export async function renderPagePngBuffer(doc, pageNo, dpi = 300) {
  const { createCanvas } = await import('@napi-rs/canvas');
  const page = await doc.getPage(pageNo);
  const vp = page.getViewport({ scale: dpi / 72 });
  const canvas = createCanvas(Math.ceil(vp.width), Math.ceil(vp.height));
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  await page.render({ canvasContext: ctx, canvas, viewport: vp }).promise;
  return canvas.toBuffer('image/png');
}

/** Sayfada çizilmiş bir raster görsel var mı? (taranmış sayfa tespiti) */
export async function pageHasImage(doc, pageNo) {
  const { OPS } = await pdfjs();
  const page = await doc.getPage(pageNo);
  const ops = await page.getOperatorList();
  const img = new Set([OPS.paintImageXObject, OPS.paintInlineImageXObject, OPS.paintImageXObjectRepeat, OPS.paintImageMaskXObject].filter((x) => x !== undefined));
  return ops.fnArray.some((f) => img.has(f));
}
