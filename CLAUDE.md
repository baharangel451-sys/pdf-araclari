# CLAUDE.md

PDF okuma ve MEB Fen Bilimleri soru üretim projesi. Ayrıntı: `README.md`, beceri: `.claude/skills/pdf-analiz/SKILL.md`.

- PDF'leri Read aracıyla değil `node bin/pdf-oku.js` ile oku (Türkçe metin, tablo ve OCR doğru çıkar).
- Soru yazmadan önce `soru-paketi` üret; sayısal veriler yalnızca `src/facts.js`'ten. Yazılan bankayı `denetle` ile doğrula.
- Kod ESM (Node 20+). Değişiklikten sonra `npm test` çalıştır.
- Hedef kitle 6. sınıf: kısa cümle, kazanım kodu (FB.6.5.x), "Neden yanlış" bölümü yok, kaldırma kuvveti yok.
