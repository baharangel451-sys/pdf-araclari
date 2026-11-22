// Tesseract.js ile OCR. Dil verileri npm'den (@tesseract.js-data/*) yerel olarak yüklenir;
// internet/CDN erişimi gerekmez.
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CACHE = path.join(ROOT, '.cache', 'tesseract');

function langPath(lang) {
  const dir = path.dirname(require.resolve(`@tesseract.js-data/${lang}/package.json`));
  // 4.0.0_best_int: LSTM "best" modelinin tamsayı sürümü — doğruluk/hız dengesi iyi
  return path.join(dir, '4.0.0_best_int');
}

let workerPromise = null;
let workerLangs = null;

/** Tek bir paylaşımlı worker; dil değişirse yeniden oluşturulur. */
export async function getWorker(langs = ['tur', 'eng']) {
  const key = langs.join('+');
  if (workerPromise && workerLangs === key) return workerPromise;
  if (workerPromise) await terminateOcr();
  const { createWorker, OEM } = await import('tesseract.js');
  mkdirSync(CACHE, { recursive: true });
  // Birden çok dil farklı paketlerde durduğu için her dil kendi langPath'ine sahip olamaz;
  // bu yüzden tüm .traineddata.gz dosyalarının aynı klasörde olduğu ilk dili esas alıp
  // diğerlerini önbelleğe kopyalıyoruz.
  const { copyFileSync, existsSync } = await import('node:fs');
  const shared = path.join(CACHE, 'lang');
  mkdirSync(shared, { recursive: true });
  for (const l of langs) {
    const dst = path.join(shared, `${l}.traineddata.gz`);
    if (!existsSync(dst)) copyFileSync(path.join(langPath(l), `${l}.traineddata.gz`), dst);
  }
  workerLangs = key;
  workerPromise = createWorker(langs, OEM.LSTM_ONLY, {
    langPath: shared,
    cachePath: CACHE,
    gzip: true,
    logger: () => {},
    errorHandler: () => {},
  });
  return workerPromise;
}

/**
 * Görseli (dosya yolu ya da PNG tamponu) OCR'dan geçirir.
 * @returns {{text:string, confidence:number, lines:{text:string,confidence:number,bbox:object}[]}}
 */
export async function ocrImage(image, { langs = ['tur', 'eng'], psm = '3' } = {}) {
  const worker = await getWorker(langs);
  await worker.setParameters({ tessedit_pageseg_mode: psm, preserve_interword_spaces: '1' });
  const { data } = await worker.recognize(image, {}, { text: true, blocks: true });
  const lines = [];
  for (const b of data.blocks ?? []) for (const p of b.paragraphs ?? []) for (const l of p.lines ?? []) {
    lines.push({ text: l.text.trim(), confidence: Math.round(l.confidence), bbox: l.bbox });
  }
  return { text: data.text, confidence: Math.round(data.confidence), lines };
}

export async function terminateOcr() {
  if (!workerPromise) return;
  const w = await workerPromise;
  workerPromise = null;
  workerLangs = null;
  await w.terminate();
}
