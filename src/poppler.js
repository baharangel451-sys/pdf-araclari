// Poppler komut satırı araçları (pdfinfo, pdftotext, pdftoppm, pdfimages) için ince sarmalayıcı.
// Poppler kurulu değilse fonksiyonlar null döner; çağıran taraf PDF.js'e düşer.
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdtemp, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

const run = promisify(execFile);
const OPTS = { maxBuffer: 256 * 1024 * 1024, encoding: 'utf8' };
const cache = new Map();

export async function hasTool(name) {
  if (cache.has(name)) return cache.get(name);
  let ok = false;
  try { await run(name, ['-v'], OPTS); ok = true; } catch (e) { ok = e.code !== 'ENOENT'; }
  cache.set(name, ok);
  return ok;
}

export async function popplerAvailable() {
  return (await hasTool('pdftotext')) && (await hasTool('pdftoppm'));
}

/** pdfinfo çıktısını nesneye çevirir. */
export async function pdfInfo(file) {
  if (!(await hasTool('pdfinfo'))) return null;
  const { stdout } = await run('pdfinfo', ['-enc', 'UTF-8', file], OPTS);
  const info = {};
  for (const line of stdout.split('\n')) {
    const m = line.match(/^([^:]+):\s*(.*)$/);
    if (m) info[m[1].trim()] = m[2].trim();
  }
  return info;
}

/** Sayfa metnini düzeni koruyarak (-layout) çıkarır. page 1 tabanlıdır; verilmezse tüm belge. */
export async function pdfToTextLayout(file, page) {
  if (!(await hasTool('pdftotext'))) return null;
  const args = ['-layout', '-enc', 'UTF-8'];
  if (page) args.push('-f', String(page), '-l', String(page));
  args.push(file, '-');
  const { stdout } = await run('pdftotext', args, OPTS);
  return stdout;
}

/** Sayfayı PNG olarak işler, dosya yolunu döner. Çağıran geçici klasörü silmelidir (cleanup). */
export async function renderPagePng(file, page, dpi = 300) {
  if (!(await hasTool('pdftoppm'))) return null;
  const dir = await mkdtemp(path.join(tmpdir(), 'pdfoku-'));
  await run('pdftoppm', ['-r', String(dpi), '-png', '-gray', '-f', String(page), '-l', String(page), file, path.join(dir, 'p')], OPTS);
  const png = (await readdir(dir)).find((f) => f.endsWith('.png'));
  return { png: path.join(dir, png), cleanup: () => rm(dir, { recursive: true, force: true }) };
}

/** Sayfadaki gömülü görselleri listeler (taranmış sayfa tespiti için yardımcı). */
export async function listImages(file) {
  if (!(await hasTool('pdfimages'))) return null;
  const { stdout } = await run('pdfimages', ['-list', file], OPTS);
  return stdout.split('\n').slice(2).filter(Boolean).map((l) => {
    const c = l.trim().split(/\s+/);
    return { page: +c[0], width: +c[3], height: +c[4] };
  });
}
