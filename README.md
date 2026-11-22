# meb-pdf-toolkit

MEB Fen Bilimleri ders kitaplarını ve öğretim programı (kazanım) PDF'lerini okuyup soru üretiminde
kullanılacak yapılandırılmış veriye dönüştüren araç takımı.

| Katman | Kullanılan araç | Görevi |
|---|---|---|
| Metin + konum | **PDF.js** (`pdfjs-dist`) | Metin katmanı, satır/hücre gruplama, tablo tespiti |
| Düzen metni, görüntüleme | **Poppler** (`pdftotext -layout`, `pdftoppm`, `pdfinfo`) | Bozuk font eşlemelerinde yedek metin, OCR için 300 dpi görüntü |
| OCR | **Tesseract.js** + `@tesseract.js-data/tur`, `eng` | Taranmış sayfalar; dil verisi npm'den, internet gerekmez |
| MEB analizi | `src/meb.js` | Öğrenme çıktıları (FB.x.y.z), süreç bileşenleri, uygulamalar, anahtar kavramlar |
| Soru desteği | `src/questions.js`, `src/facts.js` | Soru paketi, taslak sorular, bilimsel veri ve dil düzeyi denetimi |

Poppler yoksa sayfa görüntüleme PDF.js + `@napi-rs/canvas` ile yapılır (otomatik).

## Kurulum

```bash
npm install
# Poppler (önerilir): Debian/Ubuntu: apt-get install -y poppler-utils   macOS: brew install poppler
npm test
```

## Kullanım

```bash
node bin/pdf-oku.js bilgi program.pdf
node bin/pdf-oku.js metin kitap.pdf --sayfa 12-15
node bin/pdf-oku.js tablolar kitap.pdf --format csv
node bin/pdf-oku.js ocr taranmis.pdf --dil tur --dpi 400
node bin/pdf-oku.js analiz kitap.pdf --cikti cikti/kitap
node bin/pdf-oku.js kazanim program.pdf > kazanimlar.json
node bin/pdf-oku.js soru-paketi program.pdf --kitap kitap.pdf --cikti cikti/unite5
node bin/pdf-oku.js denetle sorular.json --program program.pdf
node bin/pdf-oku.js veri-kontrol "Etil alkolün kaynama noktası 90 °C'tur."
```

### Sayfa yöntemi seçimi (`--ocr auto`)

1. PDF.js metin katmanını okur.
2. Metin bozuksa (geçersiz karakter oranı > %2) Poppler düzen metnine geçer.
3. Sayfada 40'tan az harf varsa **ve** sayfa bir görsel içeriyorsa (ya da hiç metin yoksa) sayfa taranmış sayılır ve OCR yapılır.
   Tek satırlık gerçek sayfalar (ör. "Güncelleme tarihi") boşuna OCR'a gitmez.

`--ocr always` her sayfayı OCR'lar, `--ocr never` hiç OCR yapmaz.

## Programatik kullanım

```js
import { extractPdf, parseCurriculum, soruPaketi, soruDenetle } from './src/index.js';
const prog = await extractPdf('program.pdf');
const kazanim = parseCurriculum(prog);
const kitap = await extractPdf('kitap.pdf');
const paket = soruPaketi(kazanim, kitap.text);
const rapor = soruDenetle(sorular, kazanim);
```

## Çıktılar

- `metin.txt` sayfa başlıklı düz metin, `sayfalar.json` sayfa başına yöntem, OCR güveni, satırlar, tablolar
- `tablolar.md` tüm tablolar Markdown olarak
- `kazanimlar.json` ünite, öğrenme çıktıları, süreç bileşenleri, uygulamalar, etkinlikler, günlük yaşam örnekleri
- `soru-paketi.md` / `.json` kazanım başına soru yazım bağlamı ve soru JSON şeması
- `taslak-sorular.json` kural tabanlı taslaklar (gözden geçirilmeden yayımlanmamalı)

## Testler

`npm test` 13 test çalıştırır: metin, tablo, tam taranmış sayfa OCR'ı, karışık PDF, kazanım ayrıştırma
(metin ve OCR'dan), ders kitabı–kazanım eşleştirme, soru paketi, veri ve soru denetimi, CLI.
Fikstürleri yeniden üretmek için: `npm run fikstur` (Playwright/Chromium, Poppler ve ImageMagick gerekir).
