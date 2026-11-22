// Ana çıkarım hattı: her sayfa için PDF.js metni → (gerekirse) Poppler düzen metni → (taranmışsa) OCR.
import { openPdf, pageItems, renderPagePngBuffer, pageHasImage } from './pdfjs.js';
import { pdfInfo, pdfToTextLayout, renderPagePng, popplerAvailable } from './poppler.js';
import { ocrImage, terminateOcr } from './ocr.js';
import { detectTables } from './tables.js';

/** Sayfada anlamlı metin katmanı yoksa (taranmış sayfa) true. */
export function looksScanned(text, minChars = 40) {
  const letters = (text.match(/[\p{L}\p{N}]/gu) || []).length;
  return letters < minChars;
}

/** PDF.js'in bazen yanlış eşlediği karakterleri (ör. bozuk ToUnicode) tespit eder. */
function garbled(text) {
  if (!text) return false;
  const bad = (text.match(/[�\u0000-\u0008]/g) || []).length;
  return bad / text.length > 0.02;
}

/**
 * @param {string} file PDF yolu
 * @param {object} opt
 * @param {'auto'|'always'|'never'} [opt.ocr='auto']
 * @param {number[]} [opt.pages] 1 tabanlı sayfa listesi (varsayılan: tümü)
 * @param {string[]} [opt.langs=['tur','eng']]
 * @param {number} [opt.dpi=300]
 * @param {(msg:string)=>void} [opt.onProgress]
 */
export async function extractPdf(file, opt = {}) {
  const { ocr = 'auto', langs = ['tur', 'eng'], dpi = 300, onProgress = () => {} } = opt;
  const doc = await openPdf(file);
  const info = (await pdfInfo(file)) ?? {};
  const meta = await doc.getMetadata().catch(() => ({}));
  const total = doc.numPages;
  const pages = opt.pages?.length ? opt.pages.filter((p) => p >= 1 && p <= total) : [...Array(total).keys()].map((i) => i + 1);
  const usePoppler = await popplerAvailable();
  const out = [];
  try {
    for (const n of pages) {
      onProgress(`sayfa ${n}/${total}`);
      const pg = await pageItems(doc, n);
      let text = pg.lines.map((l) => l.text).join('\n');
      let method = 'pdfjs';
      let confidence = null;
      let tables = detectTables(pg.lines);
      let layoutText = usePoppler ? await pdfToTextLayout(file, n) : null;
      if (garbled(text) && layoutText && !garbled(layoutText)) { text = layoutText; method = 'poppler'; }

      // Az metinli sayfa ancak görsel içeriyorsa (ya da hiç metni yoksa) taranmış kabul edilir;
      // böylece "Güncelleme tarihi" gibi tek satırlık sayfalar boşuna OCR'a girmez.
      const scanned = looksScanned(text) && (!text.trim() || (await pageHasImage(doc, n)));
      const needOcr = ocr === 'always' || (ocr === 'auto' && (scanned || garbled(text)));
      if (needOcr) {
        onProgress(`sayfa ${n}: OCR (${langs.join('+')})`);
        let r;
        if (usePoppler) {
          const img = await renderPagePng(file, n, dpi);
          try { r = await ocrImage(img.png, { langs }); } finally { await img.cleanup(); }
        } else {
          r = await ocrImage(await renderPagePngBuffer(doc, n, dpi), { langs });
        }
        text = cleanOcr(r.text);
        layoutText = text;
        method = 'ocr';
        confidence = r.confidence;
        tables = []; // OCR satırlarında konum ölçeği farklı; tablo tespiti metin katmanlı sayfalarda yapılır
      }
      out.push({ page: n, method, confidence, text, layoutText, tables, lines: pg.lines.map((l) => ({ y: +l.y.toFixed(1), x: +l.x.toFixed(1), cells: l.cells.map((c) => c.text) })) });
    }
  } finally {
    await terminateOcr();
    await (doc.destroy?.() ?? doc.cleanup?.());
  }
  return {
    file,
    title: meta?.info?.Title || info.Title || null,
    pageCount: total,
    info,
    pages: out,
    text: out.map((p) => p.text).join('\n\n'),
  };
}

function cleanOcr(t) {
  return t
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/ﬁ/g, 'fi').replace(/ﬂ/g, 'fl')
    .trim();
}
