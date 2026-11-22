// Doğrulanmış bilimsel veri tablosu (1 atm, °C, g/cm³; değerler yuvarlanmıştır).
// Kaynak: CRC Handbook of Chemistry and Physics / standart ders kitabı değerleri.
// Soru metinlerindeki sayısal iddiaları denetlemek ve simülasyonlarda kullanmak içindir.

export const MADDELER = {
  su:            { ad: 'Su',            erime: 0,     kaynama: 100,  yogunluk: 1.0,   saf: true,  not: 'Yoğunluk 4 °C’de en büyüktür (1 g/cm³).' },
  buz:           { ad: 'Buz',           erime: 0,     kaynama: null, yogunluk: 0.92,  saf: true,  not: 'Buz suda yüzer; donan su genleşir.' },
  'etil alkol':  { ad: 'Etil alkol',    erime: -114,  kaynama: 78,   yogunluk: 0.79,  saf: true },
  civa:          { ad: 'Cıva',          erime: -39,   kaynama: 357,  yogunluk: 13.6,  saf: true },
  naftalin:      { ad: 'Naftalin',      erime: 80,    kaynama: 218,  yogunluk: 1.14,  saf: true },
  'laurik asit': { ad: 'Laurik asit',   erime: 44,    kaynama: 299,  yogunluk: 0.88,  saf: true,  not: 'MEB programında deney maddesi olarak önerilir.' },
  'stearik asit':{ ad: 'Stearik asit',  erime: 69,    kaynama: 361,  yogunluk: 0.94,  saf: true,  not: 'MEB programında deney maddesi olarak önerilir.' },
  gliserin:      { ad: 'Gliserin',      erime: 18,    kaynama: 290,  yogunluk: 1.26,  saf: true },
  kursun:        { ad: 'Kurşun',        erime: 327,   kaynama: 1749, yogunluk: 11.3,  saf: true },
  aluminyum:     { ad: 'Alüminyum',     erime: 660,   kaynama: 2470, yogunluk: 2.7,   saf: true },
  gumus:         { ad: 'Gümüş',         erime: 962,   kaynama: 2162, yogunluk: 10.5,  saf: true },
  altin:         { ad: 'Altın',         erime: 1064,  kaynama: 2970, yogunluk: 19.3,  saf: true },
  bakir:         { ad: 'Bakır',         erime: 1085,  kaynama: 2562, yogunluk: 8.96,  saf: true },
  demir:         { ad: 'Demir',         erime: 1538,  kaynama: 2862, yogunluk: 7.87,  saf: true },
  'yemek tuzu':  { ad: 'Yemek tuzu',    erime: 801,   kaynama: 1465, yogunluk: 2.16,  saf: true },
  oksijen:       { ad: 'Oksijen',       erime: -218,  kaynama: -183, yogunluk: null,  saf: true },
  zeytinyagi:    { ad: 'Zeytinyağı',    erime: null,  kaynama: null, yogunluk: 0.92,  saf: false, not: 'Karışımdır; belirli bir erime/kaynama noktası yoktur.' },
  'tuzlu su':    { ad: 'Tuzlu su',      erime: null,  kaynama: null, yogunluk: 1.03,  saf: false, not: 'Karışım; saf sudan daha yüksek sıcaklıkta kaynar, daha düşükte donar.' },
};

// Doğru-yanlış sorularında ve kavram yanılgısı tespitinde kullanılan, 6. sınıf düzeyinde doğrulanmış kurallar.
export const KURALLAR = [
  { kod: 'FB.6.5.1', dogru: 'Isı alan maddeler genelde genleşir, ısı veren maddeler büzülür.' },
  { kod: 'FB.6.5.1', dogru: 'Genleşme ayırt edici bir özelliktir: aynı koşulda farklı metaller farklı miktarda genleşir.' },
  { kod: 'FB.6.5.1', dogru: 'Genleşmede maddenin tanecikleri büyümez; tanecikler arası boşluk artar.' },
  { kod: 'FB.6.5.1', dogru: 'Isıtılan maddenin kütlesi değişmez, hacmi değişir.' },
  { kod: 'FB.6.5.2', dogru: 'Saf bir maddenin erime noktası ile donma noktası aynı sıcaklıktır.' },
  { kod: 'FB.6.5.2', dogru: 'Hâl değişimi sırasında saf maddenin sıcaklığı sabit kalır.' },
  { kod: 'FB.6.5.2', dogru: 'Erime, donma ve kaynama noktaları saf maddeler için ayırt edici özelliktir.' },
  { kod: 'FB.6.5.2', dogru: 'Erime ve kaynama noktası maddenin miktarına bağlı değildir.' },
  { kod: 'FB.6.5.3', dogru: 'Yoğunluk, kütlenin hacme bölümüdür (d = m / V).' },
  { kod: 'FB.6.5.3', dogru: 'Aynı saf maddenin miktarı değişse de yoğunluğu değişmez.' },
  { kod: 'FB.6.5.3', dogru: 'Suda çözünmeyen bir katının hacmi, dereceli silindirde yükselen su miktarına eşittir.' },
  { kod: 'FB.6.5.4', dogru: 'Sıvıdan daha az yoğun olan cisim o sıvıda yüzer, daha yoğun olan batar.' },
  { kod: 'FB.6.5.4', dogru: 'Birbirine karışmayan sıvılarda yoğunluğu az olan sıvı üstte kalır.' },
  { kod: 'FB.6.5.5', dogru: 'Buzun yoğunluğu suyun yoğunluğundan azdır; bu yüzden buz suda yüzer.' },
  { kod: 'FB.6.5.5', dogru: 'Su donarken hacmi artar.' },
  { kod: 'FB.6.5.5', dogru: 'Göller yüzeyden donar; buzun altındaki su sıvı kalır ve canlılar yaşamını sürdürür.' },
  { kod: 'FB.6.5.6', dogru: 'Gemi, içindeki hava ile birlikte ortalama yoğunluğu sudan az olduğu için yüzer.' },
];

const norm = (s) => s.toLocaleLowerCase('tr').normalize('NFC')
  .replace(/ı/g, 'i').replace(/ş/g, 's').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ç/g, 'c').replace(/â/g, 'a');

const ALIAS = Object.fromEntries(Object.keys(MADDELER).map((k) => [norm(k), k]));
Object.assign(ALIAS, { alkol: 'etil alkol', etanol: 'etil alkol', 'sofra tuzu': 'yemek tuzu', tuz: 'yemek tuzu', 'zeytin yagi': 'zeytinyagi' });

/**
 * Bir metindeki "<madde> ... erime/donma/kaynama noktası ... X °C" ve "<madde> ... yoğunluğu ... X g/cm³"
 * iddialarını tabloyla karşılaştırır. Uyuşmayanları döner.
 */
export function checkFacts(text, { tolC = 3, tolD = 0.06 } = {}) {
  const issues = [];
  const sents = text.split(/(?<=[.!?])\s+/);
  for (const s of sents) {
    const n = norm(s);
    const names = Object.keys(ALIAS).filter((a) => new RegExp(`(^|[^a-z])${a}`).test(n)).sort((a, b) => b.length - a.length);
    if (names.length !== 1 && !(names.length > 1 && names.every((x) => ALIAS[x] === ALIAS[names[0]]))) continue; // birden çok madde: belirsiz
    const key = ALIAS[names[0]];
    const m = MADDELER[key];
    const checks = [
      ['erime', /erime noktasi[^0-9-−]*([-−]?\d+(?:[.,]\d+)?)\s*°?\s*c/],
      ['erime', /donma noktasi[^0-9-−]*([-−]?\d+(?:[.,]\d+)?)\s*°?\s*c/],
      ['kaynama', /kaynama noktasi[^0-9-−]*([-−]?\d+(?:[.,]\d+)?)\s*°?\s*c/],
      ['yogunluk', /yogunlugu[^0-9]*(\d+(?:[.,]\d+)?)\s*g\s*\/\s*cm/],
    ];
    for (const [prop, re] of checks) {
      const mm = n.match(re);
      if (!mm || m[prop] == null) continue;
      const v = parseFloat(mm[1].replace('−', '-').replace(',', '.'));
      const tol = prop === 'yogunluk' ? tolD * Math.max(1, m[prop]) : tolC;
      if (Math.abs(v - m[prop]) > tol) issues.push({ cumle: s.trim(), madde: m.ad, ozellik: prop, yazilan: v, dogru: m[prop] });
    }
  }
  return issues;
}

export function lookup(name) {
  return MADDELER[ALIAS[norm(name)]] ?? null;
}
