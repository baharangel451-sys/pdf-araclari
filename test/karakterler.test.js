import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const kok = join(dirname(fileURLToPath(import.meta.url)), '..', 'karakterler');
const sesler = JSON.parse(readFileSync(join(kok, 'sesler.json'), 'utf8'));
const klasorler = readdirSync(kok).filter((a) => !a.startsWith('_') && statSync(join(kok, a)).isDirectory());

test('her karakterin kartı, referans klasörü ve ses kaydı var', () => {
  assert.ok(klasorler.length >= 3);
  for (const k of klasorler) {
    assert.ok(existsSync(join(kok, k, 'kart.md')), `${k}/kart.md eksik`);
    assert.ok(existsSync(join(kok, k, 'referans')), `${k}/referans eksik`);
    assert.ok(k in sesler.karakterler, `${k} sesler.json içinde yok`);
  }
});

test('Mr. Atom ses ID değişmedi', () => {
  assert.equal(sesler.karakterler['mr-atom'].ses_id, 'D8MMW4UPF0Vmhg6m5QKV');
});

test('karakterler klasöründe API anahtarı yok', () => {
  const tara = (d) => readdirSync(d).flatMap((a) => {
    const y = join(d, a);
    return statSync(y).isDirectory() ? tara(y) : [y];
  });
  for (const f of tara(kok).filter((f) => /\.(md|json|html|js)$/.test(f))) {
    const m = readFileSync(f, 'utf8');
    assert.doesNotMatch(m, /sk_[a-f0-9]{20,}/i, `${f} içinde anahtar benzeri metin`);
    assert.doesNotMatch(m, /xi-api-key\s*[:=]\s*["'][^"']+/i, `${f} içinde xi-api-key değeri`);
  }
});
