// Çalıştırma: npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import {
  extractPdf, parseCurriculum, linkTextToOutcomes, soruPaketi, paketMarkdown,
  taslakSorular, soruDenetle, checkFacts, lookup, popplerAvailable, toMarkdown,
} from '../src/index.js';

const FX = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'fixtures');
const MEB = path.join(FX, 'meb-6-sinif-5-unite-kazanimlar.pdf');
const KITAP = path.join(FX, 'ornek-ders-kitabi.pdf');
const KARISIK = path.join(FX, 'karisik-metin-ve-tarama.pdf');
const TARAMA = path.join(FX, 'taranmis-sayfa.pdf');

let meb; // paylaşılan çıkarım (yavaş işlemleri tekrarlamamak için)
const getMeb = async () => (meb ??= await extractPdf(MEB));

test('Poppler kurulu ve algılanıyor', async () => {
  assert.equal(await popplerAvailable(), true);
});

test('PDF.js: MEB programı metni Türkçe karakterlerle eksiksiz çıkıyor', async () => {
  const r = await getMeb();
  assert.equal(r.pageCount, 9);
  assert.ok(r.pages.every((p) => p.method === 'pdfjs'), 'metin katmanlı sayfalar OCR’a gitmemeli');
  assert.match(r.text, /Maddenin Ayırt Edici Özellikleri/);
  assert.match(r.text, /Gravzant halkası/);
  assert.match(r.text, /ğ|ş|ı|ö|ü|ç/);
});

test('Tablolar: MEB başlık–içerik tabloları ayrıştırılıyor', async () => {
  const r = await getMeb();
  const rows = r.pages.flatMap((p) => p.tables.flatMap((t) => t.rows));
  const get = (k) => rows.find((x) => x[0].startsWith(k))?.[1];
  assert.equal(get('Ders Saati'), '32');
  assert.match(get('Anahtar Kavramlar'), /^genleşme, büzülme, erime noktası/);
  assert.match(get('Köprü Kurma'), /tren raylarının/);
  assert.ok(rows.some((x) => x[0] === 'Öğrenme Çıktıları ve Süreç Bileşenleri'), 'iki satıra bölünmüş etiket birleşmeli');
});

test('Tablolar: sayısal veri tablosu sütunlarıyla çıkıyor', async () => {
  const r = await extractPdf(KITAP, { ocr: 'never' });
  const t = r.pages[0].tables[0];
  assert.equal(t.columns, 4);
  assert.deepEqual(t.rows[0], ['Madde', 'Erime noktası (°C)', 'Kaynama noktası (°C)', 'Yoğunluk (g/cm³)']);
  assert.deepEqual(t.rows.find((x) => x[0] === 'Laurik asit'), ['Laurik asit', '44', '299', '0,88']);
  assert.match(toMarkdown(t.rows), /\| Kurşun \| 327 \| 1749 \| 11,3 \|/);
});

test('OCR: tamamen taranmış sayfa Tesseract ile okunuyor', async () => {
  const r = await extractPdf(TARAMA);
  const p = r.pages[0];
  assert.equal(p.method, 'ocr');
  assert.ok(p.confidence >= 80, `güven düşük: ${p.confidence}`);
  assert.match(p.text, /FB\.6\.5\.1/);
  assert.match(p.text, /genleşip büzüleceğine/);
});

test('OCR: karışık PDF’te yalnızca taranmış sayfa OCR’a gidiyor', async () => {
  const r = await extractPdf(KARISIK);
  assert.deepEqual(r.pages.map((p) => p.method), ['pdfjs', 'ocr']);
  assert.match(r.pages[1].text, /Göller yüzeyden donar/);
});

test('MEB: 6 öğrenme çıktısı ve süreç bileşenleri doğru', async () => {
  const c = parseCurriculum(await getMeb());
  assert.equal(c.sinif, 6);
  assert.deepEqual(c.unite, { no: 5, ad: 'Maddenin Ayırt Edici Özellikleri' });
  assert.equal(c.dersSaati, 32);
  assert.deepEqual(c.ogrenmeCiktilari.map((o) => o.kod), ['FB.6.5.1', 'FB.6.5.2', 'FB.6.5.3', 'FB.6.5.4', 'FB.6.5.5', 'FB.6.5.6']);
  assert.deepEqual(c.ogrenmeCiktilari.map((o) => o.surecBilesenleri.length), [5, 2, 4, 2, 3, 2]);
  assert.deepEqual(c.ogrenmeCiktilari[0].surecBilesenleri.map((s) => s.harf), ['a', 'b', 'c', 'ç', 'd']);
  assert.deepEqual(c.anahtarKavramlar, ['genleşme', 'büzülme', 'erime noktası', 'donma noktası', 'kaynama noktası', 'yoğunluk']);
  assert.deepEqual(c.icerikCercevesi, ['Genleşme ve Büzülme', 'Maddenin Hâl Değişim Noktaları', 'Yoğunluk']);
  assert.ok(c.ogrenmeCiktilari.every((o) => o.uygulamalar?.length > 500), 'her çıktının uygulama metni olmalı');
  assert.ok(c.ogrenmeCiktilari[1].uygulamalar.includes('laurik asit'));
  assert.ok(!/\(SDB\d/.test(c.ogrenmeCiktilari[0].uygulamalar), 'beceri kodları temizlenmeli');
  assert.equal(c.guncellemeTarihi, '24.08.2026');
});

test('MEB: OCR ile okunan taranmış programdan da çıktılar ayrışıyor', async () => {
  const c = parseCurriculum(await extractPdf(TARAMA));
  assert.deepEqual(c.ogrenmeCiktilari.map((o) => o.surecBilesenleri.length), [5, 2, 4, 2, 3, 2]);
  assert.deepEqual(c.anahtarKavramlar.slice(0, 2), ['genleşme', 'büzülme']);
});

test('Ders kitabı cümleleri doğru kazanımlara bağlanıyor', async () => {
  const c = parseCurriculum(await getMeb());
  const k = await extractPdf(KITAP, { ocr: 'never' });
  const b = linkTextToOutcomes(k.text, c);
  const kod = (re) => b.find((x) => re.test(x.cumle))?.kazanim;
  assert.equal(kod(/^Isı alan maddeler genleşir/), 'FB.6.5.1');
  assert.equal(kod(/erime noktası ile donma noktası aynıdır/), 'FB.6.5.2');
  assert.equal(kod(/kütlenin hacme bölünmesiyle/), 'FB.6.5.3');
  assert.equal(kod(/^Buzun yoğunluğu/), 'FB.6.5.5');
  assert.ok(!b.some((x) => /^Madde Erime/.test(x.cumle)), 'tablo satırları cümle sayılmamalı');
});

test('Soru paketi ve taslak sorular üretiliyor', async () => {
  const c = parseCurriculum(await getMeb());
  const k = await extractPdf(KITAP, { ocr: 'never' });
  const p = soruPaketi(c, k.text);
  assert.equal(p.kazanimlar.length, 6);
  assert.equal(p.kazanimlar[2].beceri.kod, 'FBAB4');
  const md = paketMarkdown(p);
  assert.match(md, /## FB\.6\.5\.5/);
  const t = taslakSorular(k.text, c);
  assert.ok(t.length >= 15);
  assert.ok(t.every((q) => q.taslak && q.kazanim?.startsWith('FB.6.5.')));
  const dy = t.filter((q) => q.tur === 'dogru-yanlis' && q.cevap === false);
  assert.ok(dy.some((q) => /buz suda batar/.test(q.soru)));
  assert.ok(!dy.some((q) => /büzülme ve büzülme/.test(q.soru)), 'anlamsız zıtlık üretilmemeli');
  // Taslaklar denetimden bilimsel veri hatasız geçmeli
  assert.equal(soruDenetle(t, c).hatalar.filter((h) => /bilimsel/.test(h.sorun)).length, 0);
});

test('Bilimsel veri denetimi yanlış değerleri yakalıyor', () => {
  assert.deepEqual(checkFacts('Suyun kaynama noktası 100 °C’tur. Kurşunun erime noktası 327 °C’tur.'), []);
  const r = checkFacts('Etil alkolün kaynama noktası 90 °C’tur. Cıvanın donma noktası −39 °C’tur.');
  assert.equal(r.length, 1);
  assert.equal(r[0].dogru, 78);
  assert.equal(lookup('sofra tuzu').erime, 801);
  assert.equal(lookup('Stearik asit').erime, 69);
});

test('Soru bankası denetimi hataları buluyor', () => {
  const r = soruDenetle([
    { id: 'a', kazanim: 'FB.6.5.2', tur: 'coktan-secmeli', soru: 'Suyun kaynama noktası kaç °C’tur?', secenekler: ['90', '100', '100'], cevap: 5, aciklama: 'x' },
    { id: 'b', kazanim: 'FB.6.5.5', tur: 'dogru-yanlis', soru: 'Buz suda yüzer.', cevap: true, aciklama: 'Neden yanlış: ...' },
  ]);
  const s = r.hatalar.map((h) => h.sorun).join('\n');
  assert.match(s, /aynı seçenek/);
  assert.match(s, /cevap indeksi/);
  assert.match(s, /Neden yanlış/);
});

test('CLI: yardım ve analiz komutları çalışıyor', () => {
  const bin = path.join(FX, '..', 'bin', 'pdf-oku.js');
  assert.match(execFileSync('node', [bin, 'yardim'], { encoding: 'utf8' }), /soru-paketi/);
  const out = JSON.parse(execFileSync('node', [bin, 'analiz', MEB, '--cikti', path.join(FX, '..', '.cache', 'test-analiz'), '--sessiz'], { encoding: 'utf8' }));
  assert.equal(out.sayfa, 9);
  assert.ok(out.yazilan.some((f) => f.endsWith('kazanimlar.json')));
});
