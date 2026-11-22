// Test fikstürleri üretir: ders kitabı benzeri metin+tablo PDF'i ve metin+taranmış karışık PDF.
// Kullanım: node test/make-fixtures.js
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Playwright ortamda global kurulu; proje bağımlılığı yapmıyoruz.
const req = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = req('playwright')); } catch {
  const g = execFileSync('npm', ['root', '-g'], { encoding: 'utf8' }).trim();
  ({ chromium } = createRequire(path.join(g, 'noop.js'))('playwright'));
}

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'fixtures');
mkdirSync(dir, { recursive: true });

const html = `<!doctype html><html lang="tr"><meta charset="utf-8"><style>
body{font-family:'DejaVu Sans',sans-serif;font-size:12pt;margin:40px;line-height:1.5}
h1{font-size:18pt} h2{font-size:14pt;margin-top:24px}
table{border-collapse:collapse;margin:12px 0} td,th{border:1px solid #333;padding:6px 14px;text-align:left}
.page{page-break-after:always}
</style><body>
<div class="page">
<h1>Maddenin Ayırt Edici Özellikleri</h1>
<h2>Genleşme ve Büzülme</h2>
<p>Isı alan maddeler genleşir. Isı veren maddeler büzülür. Genleşme sırasında tanecikler büyümez, tanecikler arasındaki boşluk artar. Demir yolu raylarının arasına yazın genleşme payı bırakılır.</p>
<p>Aynı uzunluktaki bakır ve demir çubuklar eşit süre ısıtıldığında bakır çubuk daha fazla uzar. Bu nedenle genleşme maddeler için ayırt edici bir özelliktir.</p>
<h2>Erime, Donma ve Kaynama Noktası</h2>
<p>Saf bir maddenin erime noktası ile donma noktası aynıdır. Suyun kaynama noktası 100 °C'tur. Hâl değişimi sırasında saf maddenin sıcaklığı sabit kalır.</p>
<table><tr><th>Madde</th><th>Erime noktası (°C)</th><th>Kaynama noktası (°C)</th><th>Yoğunluk (g/cm³)</th></tr>
<tr><td>Su</td><td>0</td><td>100</td><td>1</td></tr>
<tr><td>Etil alkol</td><td>-114</td><td>78</td><td>0,79</td></tr>
<tr><td>Laurik asit</td><td>44</td><td>299</td><td>0,88</td></tr>
<tr><td>Kurşun</td><td>327</td><td>1749</td><td>11,3</td></tr></table>
<h2>Yoğunluk</h2>
<p>Yoğunluk, kütlenin hacme bölünmesiyle bulunur. Buzun yoğunluğu suyun yoğunluğundan azdır, bu yüzden buz suda yüzer. Su donarken hacmi artar.</p>
</div>
<div><h2>Suyun Donması ve Canlılar</h2><p>Göller yüzeyden donar. Buz tabakasının altındaki su sıvı kalır ve balıklar yaşamını sürdürür. Kışın dışarıda kalan su boruları, içindeki su donup genleştiği için patlayabilir.</p></div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(html);
const kitap = path.join(dir, 'ornek-ders-kitabi.pdf');
await page.pdf({ path: kitap, format: 'A4' });
await browser.close();

// 2. sayfayı görüntüye çevirip "taranmış" sayfa olarak geri ekle → karışık PDF
const tmp = path.join(dir, '.tmp');
mkdirSync(tmp, { recursive: true });
execFileSync('pdftoppm', ['-r', '200', '-gray', '-png', '-f', '2', '-l', '2', kitap, path.join(tmp, 's')]);
execFileSync('convert', [path.join(tmp, 's-2.png'), '-rotate', '0.5', '-attenuate', '0.3', '+noise', 'Gaussian', '-compress', 'JPEG', '-quality', '70', path.join(tmp, 'scan.pdf')]);
execFileSync('pdfseparate', ['-f', '1', '-l', '1', kitap, path.join(tmp, 'text.pdf')]);
execFileSync('pdfunite', [path.join(tmp, 'text.pdf'), path.join(tmp, 'scan.pdf'), path.join(dir, 'karisik-metin-ve-tarama.pdf')]);
// MEB programının 2. sayfasından tek sayfalık taranmış PDF
execFileSync('pdftoppm', ['-r', '200', '-gray', '-png', '-f', '2', '-l', '2', path.join(dir, 'meb-6-sinif-5-unite-kazanimlar.pdf'), path.join(tmp, 'm')]);
execFileSync('convert', [path.join(tmp, 'm-2.png'), '-rotate', '0.4', '-attenuate', '0.3', '+noise', 'Gaussian', '-compress', 'JPEG', '-quality', '70', path.join(dir, 'taranmis-sayfa.pdf')]);
execFileSync('rm', ['-rf', tmp]);
console.log('fikstürler hazır:', dir);
