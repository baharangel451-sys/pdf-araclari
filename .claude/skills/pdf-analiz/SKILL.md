---
name: pdf-analiz
description: PDF okuma, tablo çıkarma, taranmış sayfalarda OCR ve MEB öğretim programı / ders kitabı analizi. Bir PDF'in metni, tabloları veya kazanımları gerektiğinde; Fen Bilimleri soru yazmadan önce bağlam paketi hazırlamak, soru bankasını bilimsel doğruluk ve 6. sınıf dil düzeyi açısından denetlemek için kullan.
---

# PDF analiz araç takımı

Bu projedeki `bin/pdf-oku.js` aracı PDF.js (metin + konum), Poppler (düzen metni, sayfa görüntüleme)
ve Tesseract.js (Türkçe+İngilizce OCR, dil verisi yerel) ile çalışır. İnternet gerekmez.

## Ne zaman hangi komut

| İhtiyaç | Komut |
|---|---|
| Bir PDF'i hızlıca okumak | `node bin/pdf-oku.js metin <pdf> [--sayfa 2-4]` |
| Tabloları almak | `node bin/pdf-oku.js tablolar <pdf> [--format md\|csv\|json]` |
| Taranmış / fotoğraf PDF ya da görsel | `node bin/pdf-oku.js ocr <pdf\|png\|jpg>` (metin komutu da taranmış sayfaları otomatik OCR'lar) |
| Her şeyi dosyaya dökmek | `node bin/pdf-oku.js analiz <pdf> --cikti cikti/<ad>` |
| MEB programındaki kazanımlar | `node bin/pdf-oku.js kazanim <program.pdf>` |
| Soru yazmadan önce bağlam | `node bin/pdf-oku.js soru-paketi <program.pdf> --kitap <kitap.pdf> --cikti cikti/<ad>` |
| Soru bankasını denetlemek | `node bin/pdf-oku.js denetle <sorular.json> --program <program.pdf>` |
| Metindeki erime/kaynama/yoğunluk değerleri doğru mu | `node bin/pdf-oku.js veri-kontrol "<metin>"` |

Uzun PDF'lerde (ders kitabı) önce `analiz` ile dosyaya yaz, sonra `cikti/<ad>/metin.txt` içinde Grep ile ara;
tüm metni bağlama okumaktan kaçın.

## Soru üretim iş akışı

1. `soru-paketi` çalıştır → `soru-paketi.md` dosyasını oku. Bu, her kazanım için süreç bileşenlerini,
   programdaki deneyleri, günlük yaşam örneklerini, doğrulanmış kuralları ve ders kitabından bağlı cümleleri içerir.
2. Soruları bu paketteki bilgilere dayanarak yaz; sayısal değerleri yalnızca `src/facts.js` tablosundan al.
   Her soruya `kazanim` kodu ve kısa `aciklama` ekle (şema `soru-paketi.md` sonunda).
3. `taslak-sorular.json` kural tabanlı ham taslaklardır (boşluk doldurma, doğru-yanlış); doğrudan yayımlama,
   iyileştirerek kullan.
4. Yazdığın bankayı `denetle` ile kontrol et; `hatalar` boş olmadan teslim etme, `uyarilar`ı tek tek değerlendir.

## Bilinen sınırlar

- Tablo tespiti metin katmanlı sayfalarda yapılır; OCR sayfalarında tablo düz metin olarak gelir.
- OCR güveni sayfa başına raporlanır (`güven %`); %80 altındaysa metni gözle kontrol et, gerekirse `--dpi 400`.
- Kazanım ayrıştırıcı Maarif Modeli program biçimine (FB.x.y.z + a) b) c) ç) ...) göre yazıldı; farklı biçimde
  `kazanimlar.json` boş gelirse `metin.txt` üzerinden elle çalış.
- `src/meb.js` içindeki `IPUCU` haritası yalnızca 6. sınıf 5. ünite için konu ipuçları içerir; başka ünite
  analiz edilecekse aynı biçimde eklenebilir (eklenmezse eşleştirme yalnızca kelime örtüşmesiyle yapılır).
