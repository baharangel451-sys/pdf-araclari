// Soru üretim katmanı.
// 1) soruPaketi(): Kazanım başına bağlam paketi (Claude'un ya da öğretmenin soru yazarken kullanacağı
//    tek doğruluk kaynağı) + Markdown yönerge dosyası.
// 2) taslakSorular(): PDF metninden kural tabanlı taslak sorular (boşluk doldurma, doğru-yanlış, eşleştirme).
//    Taslaklar "taslak: true" ile işaretlenir; yayımlamadan önce gözden geçirilmelidir.
// 3) soruDenetle(): Soru bankasını şema, 6. sınıf okunabilirliği, bilimsel veri ve tekrar açısından denetler.
import { sentences, linkTextToOutcomes } from './meb.js';
import { KURALLAR, checkFacts } from './facts.js';

export const SORU_SEMASI = {
  id: 'string (benzersiz, ör. "p1-07")',
  kazanim: 'FB.6.5.x',
  surecBileseni: 'a | b | c | ç | d (opsiyonel)',
  tur: 'coktan-secmeli | dogru-yanlis | bosluk-doldurma | eslestirme | grafik-okuma | deney-yorumlama',
  zorluk: '1 (kolay) | 2 (orta) | 3 (zor)',
  beceri: 'FBAB3 | FBAB4 | FBAB7 | FBAB8 | FBAB9 | FBAB11',
  soru: 'string — en fazla ~35 kelime, 6. sınıf dili',
  secenekler: 'string[] — çoktan seçmelide 4 seçenek',
  cevap: 'number (seçenek indeksi) | boolean | string',
  aciklama: 'string — doğru bilimsel açıklama, 1-2 kısa cümle (yanlış cevapta gösterilir)',
};

/** Kazanım başına soru yazım bağlamı. kitapMetni verilirse ilgili ders kitabı cümleleri de eklenir. */
export function soruPaketi(curr, kitapMetni = '') {
  const bagli = kitapMetni ? linkTextToOutcomes(kitapMetni, curr) : [];
  const beceriler = curr.alanBecerileri;
  const turler = oneriTurler(curr.olcmeDegerlendirme || '');
  return {
    ders: curr.ders, sinif: curr.sinif, unite: curr.unite,
    temelKabuller: curr.temelKabuller,
    anahtarKavramlar: curr.anahtarKavramlar,
    onerilenSoruTurleri: turler,
    kazanimlar: curr.ogrenmeCiktilari.map((c) => ({
      kod: c.kod,
      baslik: c.baslik,
      surecBilesenleri: c.surecBilesenleri,
      beceri: beceriFor(c.baslik, beceriler),
      etkinlikler: c.etkinlikler ?? [],
      gunlukYasamOrnekleri: c.gunlukYasamOrnekleri ?? [],
      dogrulanmisKurallar: KURALLAR.filter((k) => k.kod === c.kod).map((k) => k.dogru),
      kitapCumleleri: bagli.filter((b) => b.kazanim === c.kod).map((b) => b.cumle).slice(0, 25),
    })),
  };
}

function oneriTurler(s) {
  const t = [];
  if (/kısa cevap/i.test(s)) t.push('kısa cevaplı / boşluk doldurma');
  if (/doğru-yanlış/i.test(s)) t.push('doğru-yanlış');
  if (/eşleştirme/i.test(s)) t.push('eşleştirme');
  if (/yazılı yoklama/i.test(s)) t.push('açık uçlu (yazılı yoklama)');
  t.push('çoktan seçmeli (grafik, tablo, deney düzeneği yorumlama)');
  return t;
}

function beceriFor(baslik, beceriler) {
  const b = baslik.toLocaleLowerCase('tr');
  const map = [
    [/gözleme dayalı tahmin/, 'FBAB3'], [/veriye dayalı tahmin/, 'FBAB4'], [/deney yapabilme/, 'FBAB7'],
    [/çıkarım/, 'FBAB8'], [/model oluştur/, 'FBAB9'], [/tümdengelim/, 'FBAB11'],
  ];
  const kod = map.find(([re]) => re.test(b))?.[1];
  return beceriler.find((x) => x.kod === kod) ?? null;
}

/** Soru paketini Claude/öğretmen için okunur Markdown yönergesine çevirir. */
export function paketMarkdown(p) {
  const L = [];
  L.push(`# Soru Üretim Paketi — ${p.ders ?? ''} ${p.sinif ?? ''}. Sınıf, ${p.unite ? `${p.unite.no}. Ünite: ${p.unite.ad}` : ''}`);
  L.push('', '> Bu dosya `pdf-oku soru-paketi` ile PDF\'ten otomatik üretildi. Soru yazarken tek kaynak olarak bunu kullanın.', '');
  L.push('## Yazım kuralları (6. sınıf)', '');
  L.push('- Cümleler kısa ve açık olsun; soru kökü en fazla ~35 kelime.');
  L.push('- Her soru tek bir kazanıma (FB.6.5.x) bağlansın ve kodu yazılsın.');
  L.push('- Ezber yerine gözlem, tahmin, veri/grafik okuma ve deney yorumlama soruları ağırlıkta olsun.');
  L.push('- Çeldiriciler gerçek kavram yanılgılarından seçilsin (ör. "genleşmede tanecikler büyür").');
  L.push('- Açıklama 1–2 cümle: doğru bilimsel bilgiyi söyler; "neden yanlış" bölümü yazılmaz.');
  L.push('- Sayısal veriler aşağıdaki doğrulanmış tablodan alınır (`src/facts.js`). Kaldırma kuvveti konusuna girilmez (program sınırı).');
  L.push('', `**Temel kabuller:** ${p.temelKabuller ?? '-'}`, '');
  L.push(`**Anahtar kavramlar:** ${p.anahtarKavramlar.join(', ')}`, '');
  L.push(`**Önerilen soru türleri:** ${p.onerilenSoruTurleri.join('; ')}`, '');
  for (const k of p.kazanimlar) {
    L.push(`## ${k.kod} — ${k.baslik}`, '');
    if (k.beceri) L.push(`Alan becerisi: **${k.beceri.kod} ${k.beceri.ad}**`, '');
    for (const s of k.surecBilesenleri) L.push(`- **${s.harf})** ${s.metin}`);
    if (k.dogrulanmisKurallar.length) { L.push('', '**Doğrulanmış bilgiler:**'); k.dogrulanmisKurallar.forEach((x) => L.push(`- ${x}`)); }
    if (k.etkinlikler.length) { L.push('', '**Programdaki deney/etkinlikler (soru bağlamı olarak kullanılabilir):**'); k.etkinlikler.forEach((x) => L.push(`- ${x}`)); }
    if (k.gunlukYasamOrnekleri.length) { L.push('', '**Günlük yaşam örnekleri:**'); k.gunlukYasamOrnekleri.forEach((x) => L.push(`- ${x}`)); }
    if (k.kitapCumleleri.length) { L.push('', '**Ders kitabından ilgili cümleler:**'); k.kitapCumleleri.forEach((x) => L.push(`- ${x}`)); }
    L.push('');
  }
  L.push('## Soru JSON şeması', '', '```json', JSON.stringify(SORU_SEMASI, null, 2), '```', '');
  return L.join('\n');
}

// ---------------------------------------------------------------------------
// Kural tabanlı taslak üretimi

const ZIT = [
  ['genleşir', 'büzülür'], ['genleşme', 'büzülme'], ['ısı alan', 'ısı veren'], ['ısı alır', 'ısı verir'],
  ['artar', 'azalır'], ['yüzer', 'batar'], ['üstte', 'altta'], ['az', 'fazla'], ['büyük', 'küçük'],
  ['aynı', 'farklı'], ['sabit kalır', 'artar'], ['değişmez', 'değişir'],
];

function swapOnce(s) {
  const low = s.toLocaleLowerCase('tr');
  for (const [a, b] of ZIT) {
    for (const [x, y] of [[a, b], [b, a]]) {
      const re = new RegExp(`(^|[\\s(])${x}(?=[\\s.,;)]|$)`, 'i');
      // Zıt kelime cümlede zaten geçiyorsa ("genleşme ve büzülme") değiştirme anlamsız olur
      if (re.test(s) && !low.includes(y)) return s.replace(re, (_, pre, off, str) => { const w = str.slice(off + pre.length, off + pre.length + x.length); return pre + (w[0] === w[0].toLocaleUpperCase('tr') ? y[0].toLocaleUpperCase('tr') + y.slice(1) : y); });
    }
  }
  return null;
}

/**
 * @param {string} metin PDF'ten çıkarılmış düz metin (program ya da ders kitabı)
 * @param {object} curr parseCurriculum çıktısı
 */
export function taslakSorular(metin, curr, { max = 60 } = {}) {
  const bagli = linkTextToOutcomes(metin, curr).filter((b) => b.kazanim && b.cumle.split(' ').length <= 30);
  const out = [];
  let i = 0;
  const id = (t) => `taslak-${t}-${String(++i).padStart(3, '0')}`;
  // Öğretmene yönelik yönerge cümlelerini ele (öğrenciye soru olamaz)
  const ogretmenCumlesi = /öğrencilerden|istenir|beklenir|sağlanır|sağlanabilir|verilebilir|değinilir|vurgulanır|yöneltilebilir|kullanılabilir|değerlendirilebilir/i;
  const bilgi = bagli.filter((b) => !ogretmenCumlesi.test(b.cumle));
  const kaynak = [...bilgi.map((b) => ({ cumle: b.cumle, kazanim: b.kazanim, kavramlar: b.kavramlar })),
    ...KURALLAR.map((k) => ({ cumle: k.dogru, kazanim: k.kod, kavramlar: curr.anahtarKavramlar.filter((c) => k.dogru.toLocaleLowerCase('tr').includes(c)) }))];

  for (const b of kaynak) {
    const k = b.kavramlar[0];
    if (k) {
      // Kavramın geçtiği kelimenin tamamını boşalt (çekim ekiyle birlikte: "yoğunluğu" → "______")
      const re = new RegExp(`${k.slice(0, -1)}[\\p{L}]*`, 'iu');
      const m = b.cumle.match(re);
      if (m && m[0].length - k.length <= 1) out.push({ id: id('bosluk'), taslak: true, kazanim: b.kazanim, tur: 'bosluk-doldurma', soru: b.cumle.replace(re, '______'), cevap: m[0], kaynakCumle: b.cumle });
    }
    const yanlis = swapOnce(b.cumle);
    if (yanlis) {
      out.push({ id: id('dy'), taslak: true, kazanim: b.kazanim, tur: 'dogru-yanlis', soru: yanlis, cevap: false, aciklama: b.cumle, kaynakCumle: b.cumle });
      out.push({ id: id('dy'), taslak: true, kazanim: b.kazanim, tur: 'dogru-yanlis', soru: b.cumle, cevap: true, aciklama: b.cumle, kaynakCumle: b.cumle });
    }
    if (out.length >= max) break;
  }
  return dedupe(out).slice(0, max);
}

// ---------------------------------------------------------------------------
// Denetim

const tokens = (s) => new Set(s.toLocaleLowerCase('tr').match(/[a-zçğıöşüâ0-9]+/g) || []);
export function benzerlik(a, b) {
  const A = tokens(a), B = tokens(b);
  let n = 0; for (const t of A) if (B.has(t)) n++;
  return n / Math.max(1, A.size + B.size - n);
}

function dedupe(qs, esik = 0.85) {
  const out = [];
  for (const q of qs) if (!out.some((o) => o.tur === q.tur && benzerlik(o.soru, q.soru) >= esik)) out.push(q);
  return out;
}

/**
 * Soru bankasını denetler. Dönüş: { hatalar: [...], uyarilar: [...], ozet: {...} }
 * @param {object[]} sorular
 * @param {object} [curr] parseCurriculum çıktısı (kazanım kodu kontrolü için)
 */
export function soruDenetle(sorular, curr) {
  const hatalar = [], uyarilar = [];
  const kodlar = new Set(curr?.ogrenmeCiktilari.map((c) => c.kod) ?? []);
  const ids = new Set();
  sorular.forEach((q, i) => {
    const yer = q.id ?? `#${i}`;
    if (!q.soru) hatalar.push({ yer, sorun: 'soru metni yok' });
    if (q.id && ids.has(q.id)) hatalar.push({ yer, sorun: 'tekrarlanan id' });
    ids.add(q.id);
    if (kodlar.size && !kodlar.has(q.kazanim)) hatalar.push({ yer, sorun: `geçersiz kazanım kodu: ${q.kazanim}` });
    if (q.tur === 'coktan-secmeli' || Array.isArray(q.secenekler)) {
      const s = q.secenekler ?? [];
      if (s.length < 3) hatalar.push({ yer, sorun: 'en az 3 seçenek olmalı' });
      if (new Set(s.map((x) => String(x).trim().toLocaleLowerCase('tr'))).size !== s.length) hatalar.push({ yer, sorun: 'aynı seçenek iki kez yazılmış' });
      if (!(Number.isInteger(q.cevap) && q.cevap >= 0 && q.cevap < s.length)) hatalar.push({ yer, sorun: 'cevap indeksi geçersiz' });
      if (s.some((x) => /hepsi|hiçbiri/i.test(x))) uyarilar.push({ yer, sorun: '"hepsi/hiçbiri" seçeneği tahmin edilebilirliği artırır' });
      const uz = s.map((x) => String(x).length);
      if (Number.isInteger(q.cevap) && uz[q.cevap] > 1.8 * Math.max(...uz.filter((_, j) => j !== q.cevap))) uyarilar.push({ yer, sorun: 'doğru seçenek diğerlerinden belirgin uzun (ipucu veriyor)' });
    }
    if (q.tur === 'dogru-yanlis' && typeof q.cevap !== 'boolean') hatalar.push({ yer, sorun: 'doğru-yanlış cevabı true/false olmalı' });
    const kelime = (q.soru || '').split(/\s+/).length;
    if (kelime > 45) uyarilar.push({ yer, sorun: `soru kökü uzun (${kelime} kelime) — 6. sınıf için kısaltın` });
    const uzunCumle = sentences(q.soru || '').find((c) => c.split(/\s+/).length > 28);
    if (uzunCumle) uyarilar.push({ yer, sorun: 'çok uzun cümle (28+ kelime)' });
    if (!q.aciklama && q.tur !== 'bosluk-doldurma') uyarilar.push({ yer, sorun: 'açıklama yok (yanlış cevapta gösterilecek bilgi)' });
    if (/neden yanlış/i.test(`${q.aciklama ?? ''}`)) hatalar.push({ yer, sorun: '"Neden yanlış" bölümü kaldırılmalı' });
    if (/kaldırma kuvveti/i.test(`${q.soru} ${q.aciklama ?? ''}`)) uyarilar.push({ yer, sorun: 'kaldırma kuvveti 6. sınıf programında bu ünitede işlenmiyor' });
    for (const f of checkFacts(`${q.soru} ${(q.secenekler ?? [])[q.cevap] ?? ''} ${q.aciklama ?? ''}`)) {
      hatalar.push({ yer, sorun: `bilimsel veri hatası: ${f.madde} ${f.ozellik} ${f.yazilan} yazılmış, doğrusu ${f.dogru}` });
    }
  });
  for (let a = 0; a < sorular.length; a++) for (let b = a + 1; b < sorular.length; b++) {
    const s = benzerlik(sorular[a].soru || '', sorular[b].soru || '');
    if (s >= 0.7) uyarilar.push({ yer: `${sorular[a].id ?? a} ~ ${sorular[b].id ?? b}`, sorun: `sorular çok benzer (%${Math.round(s * 100)})` });
  }
  const dagilim = {};
  for (const q of sorular) dagilim[q.kazanim] = (dagilim[q.kazanim] ?? 0) + 1;
  if (kodlar.size) for (const k of kodlar) if (!dagilim[k]) uyarilar.push({ yer: k, sorun: 'bu kazanıma hiç soru yok' });
  return { hatalar, uyarilar, ozet: { toplam: sorular.length, kazanimDagilimi: dagilim, hata: hatalar.length, uyari: uyarilar.length } };
}
