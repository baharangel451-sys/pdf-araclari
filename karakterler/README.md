# Karakter kütüphanesi

Fen Bilimleri HTML oyunlarında ve kitaplarda kullanılan karakterlerin tek doğru kaynağı.
Bir karakteri oyuna ya da kitaba koymadan önce kartını oku. Kartta "değişmez" yazan hiçbir şey değiştirilmez.

## Yapı

```
karakterler/
  README.md          bu dosya
  sesler.json        karakter → ElevenLabs ses ID'si (anahtar YOK)
  _sablon/kart.md    yeni karakter için boş kart
  <karakter>/
    kart.md          kimlik kartı
    referans/        onaylı referans görseller
```

| Karakter | Klasör | Durum |
|---|---|---|
| Mr. Atom | `mr-atom/` | taslak (ses ID'si hazır, görünüş değişmez) |
| Gıdık | `gidik/` | taslak, bilgi bekleniyor |
| Mr. Konak | `mr-konak/` | taslak, Lumen oyunundaki tasarım bekleniyor |

## Kurallar

1. **Görünüş:** Referans görsel ile kart çelişirse referans görsel kazanır. Mr. Atom'un görünüşü hiçbir koşulda değiştirilmez.
2. **Yeni karakter:** `_sablon/kart.md` dosyasını yeni klasöre kopyala, doldur, `sesler.json` dosyasına satır ekle.
3. **Referans görseller:** `referans/` klasörüne yalnızca onaylanmış görseller girer. Dosya adları: `on.png`, `yan.png`, `ifadeler.png`.
4. **Dil:** Replikler 6. sınıf düzeyinde, kısa cümlelerle yazılır. Kazanım kodu (FB.6.5.x) kartta belirtilir. Kaldırma kuvveti konusu yok.

## Ses güvenliği

- ElevenLabs API anahtarı **asla** HTML'e, JS'e ya da bu depoya yazılmaz. `.env` dosyaları `.gitignore` ile dışarıda tutulur.
- Oyunlar sesi doğrudan ElevenLabs'e değil, anahtarı saklayan **güvenli bir backend**'e sorar. Backend yalnızca `sesler.json` içindeki ses ID'lerine izin verir.
- Üretilen sesler **önbelleğe** alınır (aynı replik için tekrar ücret ödenmez). Sık kullanılan replikler önceden üretilip dosya olarak saklanabilir.
- Backend'e ulaşılamazsa oyun **yedek ses** kullanır: tarayıcının Türkçe sesi (`speechSynthesis`, `tr-TR`).
