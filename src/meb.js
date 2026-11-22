// MEB öğretim programı (Türkiye Yüzyılı Maarif Modeli) ve ders kitabı metinlerini yapılandırır.
// Çıktı: ünite bilgisi, öğrenme çıktıları (FB.x.y.z) + süreç bileşenleri (a, b, c, ç, d...),
// her çıktıya ait "Öğrenme-Öğretme Uygulamaları" metni, anahtar kavramlar, köprü kurma örnekleri.

const TR_LETTERS = 'abcçdefgğhıijklmnoöprsştuüvyz';
const CODE_RE = /\b([A-ZÇĞİÖŞÜ]{2,4})\.(\d{1,2})\.(\d{1,2})\.(\d{1,2})\.?/g;

/** pdftotext/PDF.js satırlarını tek paragraflı düz metne çevirir; tirelemeleri birleştirir. */
export function normalize(text) {
  return text
    .replace(/\r/g, '')
    .replace(/(^|\s)[¢©¿]\)/g, '$1ç)') // OCR: "ç)" sık sık "¢)" okunur
    .replace(/([a-zçğıöşü])-\n\s*([a-zçğıöşü])/g, '$1$2')
    .replace(/[ \t]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .trim();
}

const flat = (s) => s.replace(/\s*\n\s*/g, ' ').replace(/\s{2,}/g, ' ').trim();

/** Tablolardan "Başlık → içerik" sözlüğü üretir (aynı başlık sayfalara bölünmüşse birleştirir). */
function tableFields(pages) {
  const f = {};
  for (const p of pages) for (const t of p.tables) for (const r of t.rows) {
    if (r.length < 2 || !r[0]) continue;
    const key = flat(r[0]);
    const val = flat(r.slice(1).join(' '));
    f[key] = f[key] ? `${f[key]} ${val}` : val;
  }
  return f;
}

const fieldLike = (fields, ...names) => {
  for (const n of names) {
    const k = Object.keys(fields).find((x) => x.toLocaleLowerCase('tr').includes(n.toLocaleLowerCase('tr')));
    if (k) return fields[k];
  }
  return null;
};

/** "a) ... b) ... ç) ..." alt maddelerini ayırır. */
export function splitSubItems(s) {
  const re = new RegExp(`(?:^|\\s)([${TR_LETTERS}])\\)\\s`, 'g');
  const marks = [...s.matchAll(re)];
  if (!marks.length) return { head: s.trim(), items: [] };
  // Harflerin sıralı olduğundan emin ol (a, b, c, ç, d ...) — metindeki rastgele "x)" ifadelerini ele
  const seq = [];
  let expect = 0;
  for (const m of marks) {
    const idx = TR_LETTERS.indexOf(m[1]);
    if (idx === expect) { seq.push(m); expect++; }
  }
  if (!seq.length) return { head: s.trim(), items: [] };
  const head = s.slice(0, seq[0].index).trim();
  const items = seq.map((m, i) => ({
    harf: m[1],
    metin: s.slice(m.index + m[0].length, i + 1 < seq.length ? seq[i + 1].index : undefined).trim(),
  }));
  return { head, items };
}

/** Kod listesi: "FBAB3. Bilimsel Gözleme Dayalı Tahmin, FBAB4. ..." → [{kod, ad}] */
function codeList(s) {
  if (!s) return [];
  const re = /([A-ZÇĞİÖŞÜ]{1,5}\d+(?:\.\d+)*)\.\s*([^,]+?)(?=,\s*[A-ZÇĞİÖŞÜ]{1,5}\d|$)/g;
  return [...s.matchAll(re)].map((m) => ({ kod: m[1], ad: m[2].trim() }));
}

/**
 * Programın tamamını yapılandırır.
 * @param {{pages:{text:string,tables:any[]}[], text:string, title?:string}} doc extractPdf çıktısı
 */
export function parseCurriculum(doc) {
  const text = normalize(doc.pages.map((p) => p.text).join('\n'));
  const one = flat(text);
  const fields = tableFields(doc.pages);

  const unitM = one.match(/(\d+)\s*\.?\s*Ünite\s*:\s*(.+?)(?=\s+Bu ünitede|\s+Ders Saati|$)/i);
  const gradeM = (doc.title || one).match(/(\d{1,2})\s*\.?\s*Sınıf/i);
  const dersM = one.match(/^(.+?Dersi)/);

  // Öğrenme çıktıları: kod + başlık + alt maddeler. Kaynak olarak "Öğrenme Çıktıları ve Süreç Bileşenleri" alanı;
  // yoksa tüm metin.
  const ocSrc = fieldLike(fields, 'Süreç Bileşenleri', 'Öğrenme Çıktıları') || one;
  const ciktilar = [];
  const marks = [...ocSrc.matchAll(CODE_RE)].filter((m) => m[1] === 'FB' || m[1].length <= 3);
  for (let i = 0; i < marks.length; i++) {
    const m = marks[i];
    const kod = `${m[1]}.${m[2]}.${m[3]}.${m[4]}`;
    if (ciktilar.some((c) => c.kod === kod)) continue;
    const body = ocSrc.slice(m.index + m[0].length, i + 1 < marks.length ? marks[i + 1].index : undefined);
    const { head, items } = splitSubItems(body);
    ciktilar.push({ kod, sinif: +m[2], unite: +m[3], sira: +m[4], baslik: head, surecBilesenleri: items });
  }

  // Öğrenme-öğretme uygulamaları: metinde her kodun kendi başlığı altında yer alır (tablonun dışında sayfalara taşar).
  const uygStart = one.search(/Öğrenme-Öğretme\s+(?:[A-Z]{2}\.\d+\.\d+\.\d+\.?\s+)?Uygulamaları/i);
  const uygEnd = (() => { const i = one.search(/Farklılaştırma\s+Zenginleştirme|\bFarklılaştırma\b/); return i > uygStart ? i : one.length; })();
  const uygText = uygStart >= 0 ? one.slice(uygStart, uygEnd) : '';
  const uMarks = [...uygText.matchAll(CODE_RE)];
  for (let i = 0; i < uMarks.length; i++) {
    const kod = `${uMarks[i][1]}.${uMarks[i][2]}.${uMarks[i][3]}.${uMarks[i][4]}`;
    const c = ciktilar.find((x) => x.kod === kod);
    if (!c || c.uygulamalar) continue;
    const body = uygText.slice(uMarks[i].index + uMarks[i][0].length, i + 1 < uMarks.length ? uMarks[i + 1].index : undefined).replace(/^\s*Uygulamaları\s+/, '').trim();
    c.uygulamalar = stripCodes(body);
    c.etkinlikler = activitiesFrom(c.uygulamalar);
    c.gunlukYasamOrnekleri = examplesFrom(c.uygulamalar);
  }

  const anahtar = keyConcepts(fieldLike(fields, 'Anahtar Kavramlar'), one);
  const icerik = fieldLike(fields, 'İçerik Çerçevesi');

  const farkZ = (one.match(/Zenginleştirme\s+(.+?)(?=\s+Destekleme|$)/) || [])[1];
  const farkD = (one.match(/Destekleme\s+(.+?)(?=\s+Güncelleme tarihi|$)/) || [])[1];
  const guncelleme = (one.match(/Güncelleme tarihi\s*:\s*([\d.]+)/) || [])[1] || null;

  return {
    kaynak: doc.file,
    baslik: doc.title || null,
    ders: dersM ? dersM[1].trim() : null,
    sinif: gradeM ? +gradeM[1] : null,
    unite: unitM ? { no: +unitM[1], ad: unitM[2].trim() } : null,
    amac: (one.match(/(Bu ünitede.+?amaçlanmaktadır\.(?:.+?amaçlanmaktadır\.)?)/) || [])[1] || null,
    dersSaati: +(fieldLike(fields, 'Ders Saati') || '').match(/\d+/)?.[0] || null,
    alanBecerileri: codeList(fieldLike(fields, 'Alan Becerileri')),
    egilimler: codeList(fieldLike(fields, 'Eğilimler')),
    degerler: codeList(fieldLike(fields, 'Değerler')),
    okuryazarlik: codeList(fieldLike(fields, 'Okuryazarlık')),
    icerikCercevesi: icerik ? splitFrame(icerik, anahtar) : [],
    anahtarKavramlar: anahtar,
    olcmeDegerlendirme: fieldLike(fields, 'Öğrenme Kanıtları'),
    temelKabuller: fieldLike(fields, 'Temel Kabuller'),
    onDegerlendirme: fieldLike(fields, 'Ön Değerlendirme'),
    kopruKurma: fieldLike(fields, 'Köprü Kurma'),
    ogrenmeCiktilari: ciktilar,
    farklilastirma: { zenginlestirme: farkZ || null, destekleme: farkD || null },
    guncellemeTarihi: guncelleme,
  };
}

/**
 * Anahtar kavramlar: tablo alanı varsa oradan; yoksa (OCR gibi sütun sırası bozulmuş metinlerde)
 * küçük harfli, virgülle ayrılmış en uzun kısa-ifade listesini seçer.
 */
function keyConcepts(field, one) {
  const list = (s) => s.split(/,\s*/).map((x) => x.trim()).filter(Boolean);
  if (field) return list(field);
  const re = /(?<!\p{L})(?:[a-zçğıöşüâ]+(?: [a-zçğıöşüâ]+){0,2}, ){2,}[a-zçğıöşüâ]+(?: [a-zçğıöşüâ]+){0,2}/gu;
  const best = [...(one.match(re) || [])].map(list).sort((a, b) => b.length - a.length)[0];
  return best ?? [];
}

function stripCodes(s) {
  // "(SDB1.1)", "(OB1, E3.4)", "(D20.2, SDB2.2)" gibi beceri kodlarını sadeleştir
  return s.replace(/\s*\((?:[A-ZÇĞİÖŞÜ]{1,4}\d+(?:\.\d+)*(?:,\s*)?)+\)/g, '').replace(/\s{2,}/g, ' ').trim();
}

/** Başlık satırları kelime kelime ayrılmış olabilir: "Genleşme ve Büzülme Maddenin Hâl Değişim Noktaları Yoğunluk" */
function splitFrame(s, anahtar) {
  const parts = s.split(/\s+(?=[A-ZÇĞİÖŞÜ])/);
  const out = [];
  for (const p of parts) {
    const last = out[out.length - 1];
    // "ve" ile bağlanan ya da küçük harfle devam eden kelimeleri bir önceki başlığa ekle
    if (last && (/^(ve|ile)$/i.test(last.split(' ').pop()) || /^(Hâl|Değişim|Noktaları|Noktası)(?=\s|$)/.test(p))) out[out.length - 1] = `${last} ${p}`;
    else out.push(p);
  }
  return out;
}

/** Uygulama metninden deney/etkinlik cümlelerini seçer. */
function activitiesFrom(s) {
  return sentences(s).filter((x) => /deney|etkinli|ölçül|gözle|düzene|yaptırıl|daldırıl|ısıtıl|atılarak|doldurul|hesapla|tasarla|model/i.test(x));
}

/** "... vb. örnekler verilir" kalıbındaki günlük yaşam örneklerini çıkarır. */
function examplesFrom(s) {
  const out = new Set();
  for (const sent of sentences(s)) {
    const m = sent.match(/(?:durumlara ilişkin|günlük yaşamdan|örnek olarak)\s+(.+?)\s+(?:vb\.|gibi)\s/i);
    if (!m) continue;
    m[1].replace(/^.*?durumlara ilişkin\s+/, '').split(/,\s*|\s+ve\s+(?=[a-zçğıöşü]+\s)/).forEach((x) => x.length > 8 && x.length < 160 && out.add(x.trim()));
  }
  return [...out];
}

/** Türkçe cümle bölücü ("vb." ve "örn." gibi kısaltmaları korur). */
export function sentences(s) {
  const protectedText = s.replace(/\b(vb|vs|örn|bkz|Prof|Dr|sn)\./gi, '$1§');
  return protectedText
    .split(/(?<=[.!?])\s+(?=[A-ZÇĞİÖŞÜ"“(])/)
    .map((x) => x.replace(/§/g, '.').trim())
    .filter((x) => x.length > 15);
}

/**
 * Ders kitabı vb. serbest metni kazanımlara bağlar: her cümle, içerdiği anahtar kavram ve
 * kazanım başlığındaki önemli kelimelere göre puanlanır.
 */
/**
 * Serbest metni "düz yazı"ya çevirir: başlık satırlarını ve tablo satırlarını cümlelerden ayırır,
 * satır sonlarında bölünmüş cümleleri birleştirir.
 */
export function prose(text) {
  // Hücre ayrımı (çift boşluk) normalize() ile kaybolmadan önce satırlara böl
  const lines = text.replace(/\r/g, '').split('\n').map((l) => [l.split(/\s{2,}/).length, normalize(l)]);
  const paras = [];
  let cur = '';
  const push = () => { if (cur.trim()) paras.push(cur.trim()); cur = ''; };
  for (const [cells, raw] of lines) {
    const line = raw.trim();
    if (!line || /^=====/.test(line)) { push(); continue; }
    const toks = line.split(/\s+/);
    const numeric = toks.filter((t) => /^[-−]?\d+([.,]\d+)?$/.test(t)).length / toks.length;
    if (cells >= 3 || numeric > 0.4) { push(); continue; } // tablo satırı
    const title = toks.every((t) => /^(ve|ile|ya|da|de|ya da)$/.test(t) || /^[A-ZÇĞİÖŞÜ0-9(]/.test(t));
    const heading = !/[.!?:;]$/.test(line) && (title || !/[.!?:;,]/.test(line)) && toks.length <= 7 && /^[A-ZÇĞİÖŞÜ0-9]/.test(line) && (!cur || /[.!?:]$/.test(cur.trim()));
    if (heading) { push(); continue; }
    cur = cur && /[a-zçğıöşü]-$/.test(cur) && /^[a-zçğıöşü]/.test(line) ? cur.slice(0, -1) + line : cur + (cur ? ' ' : '') + line;
  }
  push();
  return paras.join('\n\n');
}

// Kazanıma özgü konu ipuçları (6. sınıf 5. ünite). Başka üniteler için eklenebilir; eşleşmeyen kodlar etkilenmez.
export const IPUCU = {
  'FB.6.5.1': /genleş|büzül|ray|gravzant|termometre|kavanoz kapağı/,
  'FB.6.5.2': /erime noktas|donma noktas|kaynama noktas|hâl değiş|hal değiş|ısıtma eğrisi/,
  'FB.6.5.3': /kütle|hacim|hacme|dereceli silindir|taşırma|terazi|d\s*=\s*m/,
  'FB.6.5.4': /yüzer|batar|askıda|karışmayan|zeytinyağı|hipotez/,
  'FB.6.5.5': /buz|don(ar|du|ma)|göl|boru/,
  'FB.6.5.6': /gemi|taka|tekne|model/,
};

export function linkTextToOutcomes(text, curriculum) {
  const sents = prose(text).split(/\n\n/).flatMap((p) => sentences(p));
  const stop = new Set('ve ile bir bu için olan olarak ilişkin yönelik gösteren yapabilme edebilme maddelerin maddenin çeşitli sonucunda hakkında'.split(' '));
  const kw = curriculum.ogrenmeCiktilari.map((c) => ({
    kod: c.kod,
    words: [...new Set(`${c.baslik} ${c.surecBilesenleri.map((s) => s.metin).join(' ')}`
      .toLocaleLowerCase('tr').match(/[a-zçğıöşüâ]{5,}/g) || [])].filter((w) => !stop.has(w)).map((w) => w.slice(0, 6)),
  }));
  const concepts = curriculum.anahtarKavramlar.map((k) => k.toLocaleLowerCase('tr'));
  return sents.map((s) => {
    const low = s.toLocaleLowerCase('tr');
    const kavramlar = concepts.filter((k) => low.includes(k.slice(0, Math.max(5, k.length - 2))));
    const scores = kw.map((k) => ({ kod: k.kod, puan: k.words.filter((w) => low.includes(w)).length + kavramlar.length * 0.5 + (IPUCU[k.kod]?.test(low) ? 2 : 0) }));
    scores.sort((a, b) => b.puan - a.puan);
    return { cumle: s, kavramlar, kazanim: scores[0]?.puan >= 2 ? scores[0].kod : null, sayisalVeri: /\d+\s*(°C|g\/cm|cm3|cm³|mL|g\b|kg)/.test(s) };
  });
}
