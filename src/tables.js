// Konum bilgisinden tablo çıkarma.
// Satırlar içindeki büyük yatay boşluklar sütun sınırı kabul edilir; ardışık çok sütunlu satırlar
// ortak sütun çapalarına (x konumları) hizalanarak tabloya dönüştürülür. Satırı kaydırılmış
// (alt satıra taşan) hücreler dikey boşluğa bakılarak önceki satırla birleştirilir.

const near = (a, b, tol) => Math.abs(a - b) <= tol;

function anchorIndex(anchors, x, tol) {
  let best = -1, bestD = Infinity;
  anchors.forEach((a, i) => { const d = Math.abs(a - x); if (d < bestD) { bestD = d; best = i; } });
  return bestD <= tol ? best : -1;
}

export function detectTables(lines, { minRows = 1, colTol = 14 } = {}) {
  const tables = [];
  let t = null;
  let prev = null;

  const close = () => {
    if (t && t.rows.length >= minRows && t.lineCount >= 2 && t.anchors.length >= 2) tables.push(finish(t));
    t = null;
  };

  for (const line of lines) {
    const gap = prev ? line.y - prev.y : Infinity;
    const tight = gap < line.h * 2.0; // aynı hücrenin devam satırı mı?
    if (line.cells.length >= 2) {
      if (t && gap > line.h * 4) close();
      if (!t) {
        t = { anchors: line.cells.map((c) => c.x0), rows: [], lineCount: 0 };
        // Tablonun ilk etiketi bir üst satırda tek başına kalmış olabilir ("Öğrenme Çıktıları ve" / "Süreç Bileşenleri")
        if (prev && prev.cells.length === 1 && tight && near(prev.cells[0].x0, line.cells[0].x0, colTol)) {
          appendLine(t, prev, [0], false);
          appendLine(t, line, line.cells.map((c) => anchorIndex(t.anchors, c.x0, colTol)), true);
          prev = line;
          continue;
        }
      }
      const idx = line.cells.map((c) => {
        let i = anchorIndex(t.anchors, c.x0, colTol);
        if (i < 0) { t.anchors.push(c.x0); t.anchors.sort((a, b) => a - b); i = anchorIndex(t.anchors, c.x0, colTol); }
        return i;
      });
      appendLine(t, line, idx, tight && t.rows.length > 0);
    } else if (t) {
      const c = line.cells[0];
      const i = anchorIndex(t.anchors, c.x0, colTol);
      if (i >= 0 && gap < line.h * 4 && (i > 0 || tight)) {
        // tek hücreli satır: sütun içi devam ya da yeni satırın tek dolu hücresi
        appendLine(t, line, [i], tight);
      } else {
        close();
      }
    }
    prev = line;
  }
  close();
  return tables;
}

function appendLine(t, line, idx, continuation) {
  const n = t.anchors.length;
  t.lineCount++;
  if (!continuation || !t.rows.length) t.rows.push({ cells: new Array(n).fill(''), y: line.y });
  const row = t.rows[t.rows.length - 1];
  while (row.cells.length < n) row.cells.push('');
  line.cells.forEach((c, k) => {
    const i = idx[k];
    row.cells[i] = row.cells[i] ? joinText(row.cells[i], c.text) : c.text;
  });
}

function joinText(a, b) {
  // satır sonu tirelemesini birleştir ("hesap-" + "lama")
  if (/[a-zçğıöşü]-$/i.test(a) && /^[a-zçğıöşü]/.test(b)) return a.slice(0, -1) + b;
  return a + ' ' + b;
}

function finish(t) {
  const n = t.anchors.length;
  const rows = t.rows.map((r) => { const c = [...r.cells]; while (c.length < n) c.push(''); return c; });
  // tamamen boş sütunları at
  const keep = [...Array(n).keys()].filter((i) => rows.some((r) => r[i]));
  const clean = rows.map((r) => keep.map((i) => r[i]));
  return { columns: keep.length, rows: clean, markdown: toMarkdown(clean), csv: toCsv(clean) };
}

export function toMarkdown(rows) {
  if (!rows.length) return '';
  const esc = (s) => String(s).replace(/\|/g, '\\|');
  const head = rows[0];
  const out = [`| ${head.map(esc).join(' | ')} |`, `| ${head.map(() => '---').join(' | ')} |`];
  for (const r of rows.slice(1)) out.push(`| ${r.map(esc).join(' | ')} |`);
  return out.join('\n');
}

export function toCsv(rows) {
  const q = (s) => (/[",\n;]/.test(s) ? `"${String(s).replace(/"/g, '""')}"` : s);
  return rows.map((r) => r.map(q).join(',')).join('\n');
}
