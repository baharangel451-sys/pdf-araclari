#!/usr/bin/env node
// pdf-oku — PDF okuma, tablo çıkarma, OCR ve MEB kazanım/soru analizi komut satırı aracı.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { extractPdf } from '../src/extract.js';
import { ocrImage, terminateOcr } from '../src/ocr.js';
import { pdfInfo } from '../src/poppler.js';
import { parseCurriculum } from '../src/meb.js';
import { soruPaketi, paketMarkdown, taslakSorular, soruDenetle } from '../src/questions.js';
import { checkFacts } from '../src/facts.js';

const YARDIM = `pdf-oku <komut> [seçenekler]

Komutlar:
  bilgi <pdf>                         Sayfa sayısı, başlık, üretici vb.
  metin <pdf>                         Metni yazdırır (taranmış sayfalarda otomatik OCR)
  tablolar <pdf>                      Tabloları çıkarır (--format md|csv|json)
  ocr <pdf|png|jpg>                   OCR'ı zorla çalıştırır
  analiz <pdf> --cikti <klasör>       Hepsini dosyalara yazar (metin, sayfalar, tablolar; MEB programıysa kazanımlar)
  kazanim <program.pdf>               MEB programındaki öğrenme çıktılarını JSON olarak verir
  soru-paketi <program.pdf> --cikti <klasör> [--kitap <kitap.pdf> ...]
                                      Kazanım başına soru yazım paketi + taslak sorular
  denetle <sorular.json> [--program <program.pdf>]
                                      Soru bankasını şema, dil düzeyi, bilimsel veri ve tekrar açısından denetler
  veri-kontrol <metin|dosya>          Metindeki erime/kaynama/yoğunluk değerlerini doğrular

Seçenekler:
  --sayfa 1,3-5     Yalnızca bu sayfalar
  --ocr auto|always|never   (varsayılan auto)
  --dil tur+eng     OCR dilleri
  --dpi 300         OCR görüntü çözünürlüğü
  --duzen           metin komutunda Poppler düzen (-layout) çıktısını kullan
  --sessiz          ilerleme mesajlarını gizle
`;

function parseArgs(argv) {
  const pos = [], o = { kitap: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) { pos.push(a); continue; }
    const k = a.slice(2);
    if (['duzen', 'sessiz', 'yardim', 'help'].includes(k)) { o[k] = true; continue; }
    const v = argv[++i];
    if (k === 'kitap') o.kitap.push(v); else o[k] = v;
  }
  return { pos, o };
}

function pageList(spec) {
  if (!spec) return undefined;
  return spec.split(',').flatMap((p) => {
    const [a, b] = p.split('-').map(Number);
    return b ? Array.from({ length: b - a + 1 }, (_, i) => a + i) : [a];
  });
}

const { pos: [cmd, ...args], o } = parseArgs(process.argv.slice(2));
const log = (m) => { if (!o.sessiz) process.stderr.write(`· ${m}\n`); };
const extractOpts = () => ({ pages: pageList(o.sayfa), ocr: o.ocr ?? 'auto', langs: (o.dil ?? 'tur+eng').split('+'), dpi: +(o.dpi ?? 300), onProgress: log });
const need = (x, msg) => { if (!x) { console.error(msg); process.exit(2); } return x; };

async function main() {
  switch (cmd) {
    case 'bilgi': {
      const f = need(args[0], 'PDF yolu gerekli');
      console.log(JSON.stringify(await pdfInfo(f), null, 2));
      break;
    }
    case 'metin': {
      const r = await extractPdf(need(args[0], 'PDF yolu gerekli'), extractOpts());
      for (const p of r.pages) {
        console.log(`\n===== Sayfa ${p.page} [${p.method}${p.confidence != null ? `, güven %${p.confidence}` : ''}] =====`);
        console.log(o.duzen && p.layoutText ? p.layoutText : p.text);
      }
      break;
    }
    case 'tablolar': {
      const r = await extractPdf(need(args[0], 'PDF yolu gerekli'), { ...extractOpts(), ocr: 'never' });
      const fmt = o.format ?? 'md';
      const all = r.pages.flatMap((p) => p.tables.map((t, i) => ({ sayfa: p.page, sira: i + 1, ...t })));
      if (fmt === 'json') console.log(JSON.stringify(all.map(({ sayfa, sira, rows }) => ({ sayfa, sira, rows })), null, 2));
      else for (const t of all) console.log(`\n### Sayfa ${t.sayfa} — Tablo ${t.sira}\n\n${fmt === 'csv' ? t.csv : t.markdown}`);
      if (!all.length) log('tablo bulunamadı');
      break;
    }
    case 'ocr': {
      const f = need(args[0], 'Dosya yolu gerekli');
      if (/\.(png|jpe?g|tiff?|bmp|webp)$/i.test(f)) {
        const r = await ocrImage(f, { langs: (o.dil ?? 'tur+eng').split('+') });
        await terminateOcr();
        console.log(`[güven %${r.confidence}]\n${r.text}`);
      } else {
        const r = await extractPdf(f, { ...extractOpts(), ocr: 'always' });
        for (const p of r.pages) console.log(`\n===== Sayfa ${p.page} [OCR, güven %${p.confidence}] =====\n${p.text}`);
      }
      break;
    }
    case 'analiz': {
      const f = need(args[0], 'PDF yolu gerekli');
      const dir = need(o.cikti, '--cikti <klasör> gerekli');
      await mkdir(dir, { recursive: true });
      const r = await extractPdf(f, extractOpts());
      await writeFile(path.join(dir, 'metin.txt'), r.pages.map((p) => `===== Sayfa ${p.page} [${p.method}] =====\n${p.layoutText ?? p.text}`).join('\n\n'));
      await writeFile(path.join(dir, 'sayfalar.json'), JSON.stringify(r, null, 2));
      const tabs = r.pages.flatMap((p) => p.tables.map((t, i) => `### Sayfa ${p.page} — Tablo ${i + 1}\n\n${t.markdown}`));
      await writeFile(path.join(dir, 'tablolar.md'), tabs.join('\n\n') || '_Tablo bulunamadı._');
      const yazilan = ['metin.txt', 'sayfalar.json', 'tablolar.md'];
      if (/FB\.\d+\.\d+\.\d+/.test(r.text)) {
        await writeFile(path.join(dir, 'kazanimlar.json'), JSON.stringify(parseCurriculum(r), null, 2));
        yazilan.push('kazanimlar.json');
      }
      const ozet = r.pages.reduce((a, p) => ((a[p.method] = (a[p.method] ?? 0) + 1), a), {});
      console.log(JSON.stringify({ dosya: f, sayfa: r.pageCount, yontemler: ozet, tablo: tabs.length, yazilan: yazilan.map((x) => path.join(dir, x)) }, null, 2));
      break;
    }
    case 'kazanim': {
      const r = await extractPdf(need(args[0], 'PDF yolu gerekli'), extractOpts());
      console.log(JSON.stringify(parseCurriculum(r), null, 2));
      break;
    }
    case 'soru-paketi': {
      const f = need(args[0], 'Program PDF yolu gerekli');
      const dir = need(o.cikti, '--cikti <klasör> gerekli');
      await mkdir(dir, { recursive: true });
      const prog = await extractPdf(f, extractOpts());
      const curr = parseCurriculum(prog);
      let kitap = '';
      for (const k of o.kitap) { log(`ders kitabı: ${k}`); kitap += '\n' + (await extractPdf(k, extractOpts())).text; }
      const paket = soruPaketi(curr, kitap);
      // Taslaklar öğrenciye yönelik metinden (ders kitabı) ve doğrulanmış kurallardan üretilir; program metni öğretmene yöneliktir.
      const taslak = taslakSorular(kitap, curr);
      await writeFile(path.join(dir, 'kazanimlar.json'), JSON.stringify(curr, null, 2));
      await writeFile(path.join(dir, 'soru-paketi.json'), JSON.stringify(paket, null, 2));
      await writeFile(path.join(dir, 'soru-paketi.md'), paketMarkdown(paket));
      await writeFile(path.join(dir, 'taslak-sorular.json'), JSON.stringify(taslak, null, 2));
      console.log(JSON.stringify({ kazanim: curr.ogrenmeCiktilari.length, taslakSoru: taslak.length, klasor: dir }, null, 2));
      break;
    }
    case 'denetle': {
      const raw = JSON.parse(await readFile(need(args[0], 'sorular.json gerekli'), 'utf8'));
      const sorular = Array.isArray(raw) ? raw : raw.sorular ?? Object.values(raw).flat();
      const curr = o.program ? parseCurriculum(await extractPdf(o.program, extractOpts())) : null;
      const r = soruDenetle(sorular, curr);
      console.log(JSON.stringify(r, null, 2));
      process.exitCode = r.hatalar.length ? 1 : 0;
      break;
    }
    case 'veri-kontrol': {
      const a = need(args[0], 'metin ya da dosya gerekli');
      const t = await readFile(a, 'utf8').catch(() => args.join(' '));
      const r = checkFacts(t);
      console.log(r.length ? JSON.stringify(r, null, 2) : 'Sorun bulunamadı.');
      process.exitCode = r.length ? 1 : 0;
      break;
    }
    default:
      console.log(YARDIM);
      process.exitCode = cmd && !['yardim', 'help', '--help'].includes(cmd) ? 2 : 0;
  }
}

main().catch(async (e) => { await terminateOcr().catch(() => {}); console.error('HATA:', e.message); process.exit(1); });
