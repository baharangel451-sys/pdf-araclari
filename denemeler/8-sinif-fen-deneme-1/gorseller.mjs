// 8. sınıf Fen Bilimleri denemesi — soru görselleri (elle çizilmiş SVG, 2D / 2.5D gölgelendirmeli).
// Sayısal değer içermez; tüm görseller nitel karşılaştırmaya dayanır.

const f = (n) => Math.round(n * 10) / 10;
const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const pts = (arr) => arr.map((p) => `${f(p[0])},${f(p[1])}`).join(' ');
const T = (x, y, s, o = {}) =>
  `<text x="${x}" y="${y}" font-size="${o.size ?? 11}" font-weight="${o.w ?? 600}" fill="${o.fill ?? '#1f2a37'}" text-anchor="${o.a ?? 'middle'}"${o.style ? ` style="${o.style}"` : ''}>${s}</text>`;

// Belge genelinde paylaşılan degrade ve filtreler
export const ortakTanimlar = `
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
  <filter id="golge" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="1.5" dy="2.5" stdDeviation="2" flood-color="#0b1a2b" flood-opacity=".28"/></filter>
  <filter id="golgeHafif" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="1" dy="1.5" stdDeviation="1.2" flood-color="#0b1a2b" flood-opacity=".2"/></filter>
  <filter id="parilti"><feGaussianBlur stdDeviation="6"/></filter>
  <linearGradient id="gAhsap" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c99a63"/><stop offset="1" stop-color="#9a6b3a"/></linearGradient>
  <linearGradient id="gKagit" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#eef2f6"/></linearGradient>
  <linearGradient id="gMetal" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7d8792"/><stop offset=".45" stop-color="#e9edf1"/><stop offset="1" stop-color="#5e6873"/></linearGradient>
  <linearGradient id="gFener" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8f1d1d"/><stop offset=".45" stop-color="#e35454"/><stop offset="1" stop-color="#6d1212"/></linearGradient>
  <radialGradient id="gIsikDik"><stop offset="0" stop-color="#fff7b0" stop-opacity="1"/><stop offset=".7" stop-color="#ffe55c" stop-opacity=".95"/><stop offset="1" stop-color="#ffd84a" stop-opacity=".55"/></radialGradient>
  <radialGradient id="gIsikEgik"><stop offset="0" stop-color="#fff7b0" stop-opacity=".62"/><stop offset=".75" stop-color="#ffe55c" stop-opacity=".42"/><stop offset="1" stop-color="#ffd84a" stop-opacity=".15"/></radialGradient>
  <linearGradient id="gKoni" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff4a3" stop-opacity=".65"/><stop offset="1" stop-color="#fff4a3" stop-opacity=".2"/></linearGradient>
  <linearGradient id="gGokyuzu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fc8ef"/><stop offset="1" stop-color="#e3f3fc"/></linearGradient>
  <radialGradient id="gGunes" cx=".45" cy=".4"><stop offset="0" stop-color="#fffbe0"/><stop offset=".45" stop-color="#ffd23f"/><stop offset="1" stop-color="#f29111"/></radialGradient>
  <linearGradient id="gCati" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d0533b"/><stop offset="1" stop-color="#9e3322"/></linearGradient>
  <linearGradient id="gDuvar" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f6e7cf"/><stop offset="1" stop-color="#e2cba7"/></linearGradient>
  <linearGradient id="gDuvarYan" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d9bf97"/><stop offset="1" stop-color="#c4a67b"/></linearGradient>
  <linearGradient id="gPanel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2c4f8f"/><stop offset=".5" stop-color="#1b3466"/><stop offset="1" stop-color="#0f1f40"/></linearGradient>
  <radialGradient id="gUzay" cx=".5" cy=".5" r=".75"><stop offset="0" stop-color="#1c2b52"/><stop offset="1" stop-color="#070c1c"/></radialGradient>
  <radialGradient id="gDunya" cx=".38" cy=".35"><stop offset="0" stop-color="#7fd0ff"/><stop offset=".6" stop-color="#2273c7"/><stop offset="1" stop-color="#0d3c78"/></radialGradient>
  <linearGradient id="gGeceSag" x1="1" y1="0" x2="0" y2="0"><stop offset=".46" stop-color="#000" stop-opacity="0"/><stop offset=".56" stop-color="#000" stop-opacity=".62"/><stop offset="1" stop-color="#000" stop-opacity=".72"/></linearGradient>
  <linearGradient id="gGeceSol" x1="0" y1="0" x2="1" y2="0"><stop offset=".46" stop-color="#000" stop-opacity="0"/><stop offset=".56" stop-color="#000" stop-opacity=".62"/><stop offset="1" stop-color="#000" stop-opacity=".72"/></linearGradient>
  <linearGradient id="gGeceUst" x1="0" y1="0" x2="0" y2="1"><stop offset=".46" stop-color="#000" stop-opacity="0"/><stop offset=".56" stop-color="#000" stop-opacity=".62"/><stop offset="1" stop-color="#000" stop-opacity=".72"/></linearGradient>
  <linearGradient id="gGeceAlt" x1="0" y1="1" x2="0" y2="0"><stop offset=".46" stop-color="#000" stop-opacity="0"/><stop offset=".56" stop-color="#000" stop-opacity=".62"/><stop offset="1" stop-color="#000" stop-opacity=".72"/></linearGradient>
  <linearGradient id="gGrafik" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#f3f7fb"/></linearGradient>
  <linearGradient id="gDag" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9b8a7a"/><stop offset="1" stop-color="#5d4d40"/></linearGradient>
  <linearGradient id="gKar" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#cfe3f2"/></linearGradient>
  <radialGradient id="gHucre" cx=".4" cy=".4"><stop offset="0" stop-color="#ffe3ec"/><stop offset="1" stop-color="#f3a7c0"/></radialGradient>
  <radialGradient id="gCekirdek" cx=".4" cy=".35"><stop offset="0" stop-color="#d9c2f2"/><stop offset="1" stop-color="#7a4bb0"/></radialGradient>
  <radialGradient id="gFosfat" cx=".35" cy=".35"><stop offset="0" stop-color="#fff6c4"/><stop offset="1" stop-color="#e3b311"/></radialGradient>
  <linearGradient id="gSeker" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffc58f"/><stop offset="1" stop-color="#e4761e"/></linearGradient>
  <radialGradient id="gTohumSari" cx=".35" cy=".32"><stop offset="0" stop-color="#fffbd1"/><stop offset=".55" stop-color="#f2d43b"/><stop offset="1" stop-color="#b9940c"/></radialGradient>
  <radialGradient id="gTohumYesil" cx=".35" cy=".32"><stop offset="0" stop-color="#e3f7c4"/><stop offset=".55" stop-color="#7cbf3a"/><stop offset="1" stop-color="#3f7a16"/></radialGradient>
  <linearGradient id="gYaprak" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8fd16a"/><stop offset="1" stop-color="#3d8a22"/></linearGradient>
  <linearGradient id="gKum" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3d79b"/><stop offset="1" stop-color="#d9a95a"/></linearGradient>
  <linearGradient id="gCol" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd9a0"/><stop offset="1" stop-color="#fff2d6"/></linearGradient>
  <linearGradient id="gKutup" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a9cdea"/><stop offset="1" stop-color="#eef6fc"/></linearGradient>
  <linearGradient id="gKarOn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d4e6f4"/></linearGradient>
  <linearGradient id="gKarUst" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f5fbff"/><stop offset="1" stop-color="#e3f0fa"/></linearGradient>
  <linearGradient id="gKarYan" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c3d9ec"/><stop offset="1" stop-color="#a7c4de"/></linearGradient>
  <linearGradient id="gIz" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fbcd6"/><stop offset="1" stop-color="#6f93b5"/></linearGradient>
  <linearGradient id="gCam" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#dfeef7" stop-opacity=".9"/><stop offset=".15" stop-color="#ffffff" stop-opacity=".35"/><stop offset=".85" stop-color="#ffffff" stop-opacity=".2"/><stop offset="1" stop-color="#c7dbe8" stop-opacity=".9"/></linearGradient>
  <linearGradient id="gSu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7cc4ee"/><stop offset="1" stop-color="#2f7fbf"/></linearGradient>
  <linearGradient id="gYag" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7e38a"/><stop offset="1" stop-color="#d1a821"/></linearGradient>
  <linearGradient id="gHidrolik" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4b860"/><stop offset="1" stop-color="#b86a12"/></linearGradient>
  <linearGradient id="gDeniz" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3fa2d9"/><stop offset="1" stop-color="#145c94"/></linearGradient>
  <linearGradient id="gArazi" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ccf6b"/><stop offset="1" stop-color="#5e8f35"/></linearGradient>
  <linearGradient id="gSilindir" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9aa6b2"/><stop offset=".4" stop-color="#eef2f5"/><stop offset="1" stop-color="#7b8794"/></linearGradient>
  <linearGradient id="gDepo" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3b6fa8"/><stop offset=".4" stop-color="#7fb0e0"/><stop offset="1" stop-color="#2c5689"/></linearGradient>
  <linearGradient id="gBina" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f1e4d3"/><stop offset="1" stop-color="#e0ccb2"/></linearGradient>
  <linearGradient id="gCips" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff8a3d"/><stop offset=".5" stop-color="#e8541c"/><stop offset="1" stop-color="#b8370c"/></linearGradient>
  <linearGradient id="gPet" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#bfe3f5" stop-opacity=".9"/><stop offset=".35" stop-color="#ffffff" stop-opacity=".8"/><stop offset="1" stop-color="#8cc7e6" stop-opacity=".9"/></linearGradient>
  <marker id="okUc" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#334155"/></marker>
  <marker id="okUcBeyaz" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#ffffff"/></marker>
  <marker id="okUcKirmizi" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#c0392b"/></marker>
</defs></svg>`;

/* ------------------------------------------------------------------ S1 */
function elFeneri() {
  return `<g filter="url(#golgeHafif)">
    <rect x="-12" y="-92" width="24" height="9" rx="2.5" fill="#2b2f36"/>
    <rect x="-11" y="-85" width="22" height="62" rx="3" fill="url(#gFener)"/>
    <rect x="-4" y="-66" width="8" height="13" rx="2" fill="#1d1f24"/>
    <path d="M-12,-24 L12,-24 L17,0 L-17,0 Z" fill="url(#gMetal)"/>
    <ellipse cx="0" cy="0" rx="17" ry="4" fill="#fffbd6" stroke="#b9c2cc" stroke-width=".8"/>
  </g>`;
}
function duzenek(x0, egik) {
  const BL = [20, 200], BR = [212, 200], TR = [238, 138], TL = [46, 138];
  let g = `<g transform="translate(${x0},0)">`;
  g += `<polygon points="${pts([[2, 214], [232, 214], [262, 126], [30, 126]])}" fill="url(#gAhsap)"/>`;
  g += `<polygon points="${pts([BL, BR, TR, TL])}" fill="url(#gKagit)" stroke="#9fb3c6" stroke-width=".8"/>`;
  for (let i = 1; i < 10; i++) { const a = lerp(BL, BR, i / 10), b = lerp(TL, TR, i / 10); g += `<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}" stroke="#a9c4dc" stroke-width=".6"/>`; }
  for (let j = 1; j < 6; j++) { const a = lerp(BL, TL, j / 6), b = lerp(BR, TR, j / 6); g += `<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}" stroke="#a9c4dc" stroke-width=".6"/>`; }
  const c = [129, 169];
  if (!egik) {
    g += `<polygon points="${pts([[c[0] - 17, 92], [c[0] + 17, 92], [c[0] + 25, c[1]], [c[0] - 25, c[1]]])}" fill="url(#gKoni)"/>`;
    g += `<ellipse cx="${c[0]}" cy="${c[1]}" rx="25" ry="10" fill="url(#gIsikDik)"/>`;
    g += `<g transform="translate(${c[0]},92)">${elFeneri()}</g>`;
    g += T(c[0] + 58, 60, 'Işık dik geliyor', { size: 10, w: 500, fill: '#475569' });
  } else {
    const a = 50 * Math.PI / 180, d = 77;
    const L = [c[0] - d * Math.sin(a), c[1] - d * Math.cos(a)];
    const p = [Math.cos(a), -Math.sin(a)];
    const e1 = [L[0] + 17 * p[0], L[1] + 17 * p[1]], e2 = [L[0] - 17 * p[0], L[1] - 17 * p[1]];
    g += `<polygon points="${pts([e1, [c[0] + 56, c[1]], [c[0] - 56, c[1]], e2])}" fill="url(#gKoni)" opacity=".8"/>`;
    g += `<ellipse cx="${c[0]}" cy="${c[1]}" rx="56" ry="17" fill="url(#gIsikEgik)"/>`;
    g += `<g transform="translate(${f(L[0])},${f(L[1])}) rotate(-50)">${elFeneri()}</g>`;
    g += T(c[0] + 70, 60, 'Işık eğik geliyor', { size: 10, w: 500, fill: '#475569' });
  }
  g += T(130, 16, egik ? 'Düzenek 2' : 'Düzenek 1', { size: 12, w: 700 });
  return g + '</g>';
}
export function s1() {
  // Çatı ve panel (2.5D)
  const R = [[80, 100], [162, 84], [212, 116], [128, 134]]; // çatı düzlemi
  const bil = (u, v) => { const a = lerp(R[0], R[1], u), b = lerp(R[3], R[2], u); return lerp(a, b, v); };
  const P = [bil(.18, .16), bil(.85, .16), bil(.85, .84), bil(.18, .84)];
  let pan = `<polygon points="${pts(P)}" fill="url(#gPanel)" stroke="#c7d2e0" stroke-width="1.2"/>`;
  for (let i = 1; i < 5; i++) { const a = bil(.18 + .67 * i / 5, .16), b = bil(.18 + .67 * i / 5, .84); pan += `<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}" stroke="#7f9cc9" stroke-width=".6"/>`; }
  for (let j = 1; j < 3; j++) { const a = bil(.18, .16 + .68 * j / 3), b = bil(.85, .16 + .68 * j / 3); pan += `<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}" stroke="#7f9cc9" stroke-width=".6"/>`; }
  const ev = `<g transform="translate(476,0)">
    <rect x="0" y="4" width="226" height="212" rx="10" fill="url(#gGokyuzu)"/>
    <circle cx="196" cy="36" r="30" fill="#ffd84a" opacity=".35" filter="url(#parilti)"/>
    <circle cx="196" cy="36" r="17" fill="url(#gGunes)"/>
    ${[0, 1, 2].map((i) => `<line x1="${180 - i * 12}" y1="${52 + i * 6}" x2="${150 - i * 14}" y2="${92 + i * 6}" stroke="#f2a20c" stroke-width="2" stroke-dasharray="5 3" marker-end="url(#okUcKirmizi)"/>`).join('')}
    <rect x="0" y="198" width="226" height="18" fill="#8dbf5a"/>
    <polygon points="${pts([[128, 134], [212, 116], [212, 190], [128, 206]])}" fill="url(#gDuvarYan)"/>
    <polygon points="${pts([[34, 134], [80, 100], [128, 134], [128, 206], [34, 206]])}" fill="url(#gDuvar)"/>
    <rect x="66" y="160" width="26" height="46" rx="2" fill="#8a5a33"/>
    <rect x="148" y="140" width="20" height="18" fill="#bfe1f6" stroke="#fff" stroke-width="2"/>
    <rect x="180" y="134" width="20" height="18" fill="#bfe1f6" stroke="#fff" stroke-width="2"/>
    <polygon points="${pts([[28, 136], [80, 98], [80, 104], [34, 138]])}" fill="#7d2416"/>
    <polygon points="${pts(R)}" fill="url(#gCati)"/>
    ${[.25, .5, .75].map((v) => { const a = bil(0, v), b = bil(1, v); return `<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}" stroke="#7d2416" stroke-width=".7" opacity=".6"/>`; }).join('')}
    <g filter="url(#golgeHafif)">${pan}</g>
    ${T(113, 230, 'Çatıdaki güneş paneli', { size: 11 })}
  </g>`;
  return `<svg viewBox="0 0 704 236" class="gorsel">${duzenek(0, false)}${duzenek(232, true)}${ev}
    ${T(130, 230, 'Kareli kâğıt', { size: 10, w: 500, fill: '#475569' })}${T(362, 230, 'Kareli kâğıt', { size: 10, w: 500, fill: '#475569' })}</svg>`;
}

/* ------------------------------------------------------------------ S2 */
function dunya(cx, cy, r, gece) {
  const t = 23.5, rad = t * Math.PI / 180, d = [Math.sin(rad), -Math.cos(rad)];
  const k = 1.65;
  const n = [cx + d[0] * r * k, cy + d[1] * r * k], s = [cx - d[0] * r * k, cy - d[1] * r * k];
  const id = `kl${cx}${cy}`;
  return `<g>
    <clipPath id="${id}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath>
    <line x1="${f(s[0])}" y1="${f(s[1])}" x2="${f(cx)}" y2="${f(cy)}" stroke="#e6edf5" stroke-width="1.6"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#gDunya)"/>
    <g clip-path="url(#${id})" fill="#4caf50" opacity=".85">
      <path d="M${cx - r * .55},${cy - r * .35} q${r * .3},${-r * .35} ${r * .6},${-r * .1} q${r * .15},${r * .3} ${-r * .1},${r * .45} q${-r * .35},${r * .1} ${-r * .5},${-r * .35}z"/>
      <path d="M${cx + r * .1},${cy + r * .05} q${r * .35},${-r * .15} ${r * .55},${r * .15} q${-r * .05},${r * .45} ${-r * .35},${r * .5} q${-r * .25},${-r * .2} ${-r * .2},${-r * .65}z"/>
    </g>
    <ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${f(r * .24)}" transform="rotate(${t} ${cx} ${cy})" fill="none" stroke="#ffe08a" stroke-width="1" stroke-dasharray="2.5 2" clip-path="url(#${id})"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${gece})"/>
    <line x1="${f(cx)}" y1="${f(cy)}" x2="${f(n[0])}" y2="${f(n[1])}" stroke="#e6edf5" stroke-width="1.6"/>
    <circle cx="${f(cx + d[0] * r)}" cy="${f(cy + d[1] * r)}" r="3.2" fill="#ff4d4d" stroke="#fff" stroke-width=".8"/>
  </g>`;
}
export function s2() {
  const cx = 330, cy = 128, rx = 255, ry = 90;
  const ok = (th) => {
    const a = th * Math.PI / 180; const x = cx + rx * Math.cos(a), y = cy + ry * Math.sin(a);
    const ang = Math.atan2(-ry * Math.cos(a), rx * Math.sin(a)) * 180 / Math.PI;
    return `<path d="M-7,-5 L7,0 L-7,5 z" fill="#ffd166" transform="translate(${f(x)},${f(y)}) rotate(${f(ang)})"/>`;
  };
  let yildiz = '';
  const rs = [[30, 20], [90, 60], [150, 18], [210, 230], [470, 25], [520, 210], [610, 40], [640, 230], [40, 200], [395, 240], [250, 70], [560, 90], [120, 240], [600, 160], [20, 120]];
  for (const [x, y] of rs) yildiz += `<circle cx="${x}" cy="${y}" r="${(x * y) % 3 === 0 ? 1.3 : .8}" fill="#fff" opacity=".8"/>`;
  const lbl = (x, y, s) => `<g><circle cx="${x}" cy="${y}" r="11" fill="#fff"/>${T(x, y + 4, s, { size: 12, w: 800, fill: '#13294b' })}</g>`;
  return `<svg viewBox="0 0 660 262" class="gorsel">
    <rect x="0" y="0" width="660" height="262" rx="12" fill="url(#gUzay)"/>${yildiz}
    <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="#9fb4d9" stroke-width="1.4"/>
    ${[60, 150, 240, 330].map(ok).join('')}
    <circle cx="${cx}" cy="${cy}" r="58" fill="#ffb020" opacity=".35" filter="url(#parilti)"/>
    <circle cx="${cx}" cy="${cy}" r="38" fill="url(#gGunes)"/>
    ${T(cx, cy + 4, 'Güneş', { size: 11, w: 700, fill: '#7a3b00' })}
    ${dunya(75, cy, 22, 'gGeceSag')}
    ${dunya(cx, cy + ry, 26, 'gGeceUst')}
    ${dunya(cx + rx, cy, 22, 'gGeceSol')}
    ${dunya(cx, cy - ry, 18, 'gGeceAlt')}
    ${lbl(34, cy + 34, 'K')}${lbl(cx + 46, cy + ry + 18, 'L')}${lbl(cx + rx + 42, cy + 34, 'M')}${lbl(cx + 40, cy - ry - 4, 'N')}
    <g transform="translate(16,236)"><circle cx="6" cy="0" r="4" fill="#ff4d4d" stroke="#fff" stroke-width=".8"/>${T(16, 4, 'Kuzey Kutbu', { size: 10, w: 500, fill: '#fff', a: 'start' })}
      <line x1="100" y1="0" x2="124" y2="0" stroke="#e6edf5" stroke-width="1.6"/>${T(130, 4, 'Dönme ekseni', { size: 10, w: 500, fill: '#fff', a: 'start' })}
      <path d="M222,-4 L234,0 L222,4z" fill="#ffd166"/>${T(240, 4, 'Dolanma yönü', { size: 10, w: 500, fill: '#fff', a: 'start' })}</g>
  </svg>`;
}

/* ------------------------------------------------------------------ S4 */
export function s4() {
  const grafik = (x0, baslik, yol, renk) => `<g transform="translate(${x0},0)">
    <rect x="0" y="0" width="200" height="178" rx="8" fill="url(#gGrafik)" stroke="#cbd5e1"/>
    ${T(100, 18, baslik, { size: 11, w: 700 })}
    ${[50, 80, 110, 140].map((y) => `<line x1="30" y1="${y}" x2="186" y2="${y}" stroke="#e2e8f0"/>`).join('')}
    <line x1="30" y1="152" x2="30" y2="30" stroke="#334155" stroke-width="1.4" marker-end="url(#okUc)"/>
    <line x1="30" y1="152" x2="190" y2="152" stroke="#334155" stroke-width="1.4" marker-end="url(#okUc)"/>
    <polyline points="${yol}" fill="none" stroke="${renk}" stroke-width="2.4" stroke-linejoin="round"/>
    ${yol.split(' ').map((p) => { const [x, y] = p.split(','); return `<circle cx="${x}" cy="${y}" r="2.3" fill="${renk}"/>`; }).join('')}
    ${T(110, 168, 'Zaman (Geçmiş → Günümüz)', { size: 9.5, w: 500, fill: '#475569' })}
  </g>`;
  const sic = '38,128 52,121 66,126 80,113 94,117 108,104 122,109 136,92 150,97 164,80 178,72';
  const buz = '38,48 52,52 66,51 80,60 94,63 108,72 122,78 136,90 150,99 164,113 178,124';
  const dag = (x0, buyuk, etiket) => {
    const kar = buyuk
      ? 'M18,92 L60,30 L104,92 L92,88 L84,98 L72,86 L62,96 L50,85 L38,97 L28,88 Z'
      : 'M44,54 L60,30 L78,56 L71,58 L64,52 L57,60 L50,53 Z';
    return `<g transform="translate(${x0},14)">
      <rect x="0" y="0" width="122" height="150" rx="6" fill="#fff" stroke="#cbd5e1" filter="url(#golgeHafif)"/>
      <rect x="6" y="6" width="110" height="114" rx="3" fill="url(#gGokyuzu)"/>
      <path d="M6,120 L6,96 L28,80 L60,30 L96,82 L116,96 L116,120 Z" fill="url(#gDag)"/>
      <path d="M84,64 L96,82 L116,96 L116,120 L70,120 Z" fill="#4c3e33" opacity=".35"/>
      <path d="${kar}" fill="url(#gKar)"/>
      <rect x="6" y="112" width="110" height="8" fill="#7da05a"/>
      ${T(61, 140, etiket, { size: 11, w: 700 })}
    </g>`;
  };
  return `<svg viewBox="0 0 704 182" class="gorsel">
    ${grafik(0, 'Ortalama sıcaklık', sic, '#d9480f')}
    ${grafik(210, 'Buzulun kapladığı alan', buz, '#1c7ed6')}
    ${dag(436, true, 'Geçmişte')}${dag(574, false, 'Günümüzde')}
  </svg>`;
}

/* ------------------------------------------------------------------ S5 */
export function s5() {
  const kitaplar = [];
  const renk = ['#c0392b', '#2471a3', '#27ae60', '#d68910', '#7d3c98', '#117a65', '#a04000', '#2e4053', '#b03a2e', '#1f618d'];
  for (let r = 0; r < 3; r++) {
    let x = 196;
    let i = 0;
    while (x < 318) {
      const w = 8 + ((r * 7 + i * 5) % 5); const h = 26 - ((r + i * 3) % 7);
      const y = 40 + r * 34 + (30 - h);
      kitaplar.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${renk[(i + r * 3) % renk.length]}" stroke="#00000033" stroke-width=".5"/><line x1="${x + 1.5}" y1="${y + 4}" x2="${x + w - 1.5}" y2="${y + 4}" stroke="#ffffff88" stroke-width="1"/>`);
      x += w + 1.2; i++;
    }
  }
  const satir = (x, y, w) => `<line x1="${x}" y1="${y}" x2="${x + w}" y2="${y}" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>`;
  let sayfaSol = '', sayfaSag = '';
  for (let i = 0; i < 7; i++) sayfaSol += satir(392, 54 + i * 11, 62 - (i % 3) * 6);
  for (let i = 0; i < 7; i++) sayfaSag += satir(478, 54 + i * 11, 60 - ((i + 1) % 3) * 7);
  return `<svg viewBox="0 0 704 168" class="gorsel">
    <g filter="url(#golgeHafif)">
      <ellipse cx="78" cy="86" rx="68" ry="54" fill="url(#gHucre)" stroke="#d96b93" stroke-width="1.5"/>
      <circle cx="84" cy="82" r="27" fill="url(#gCekirdek)" stroke="#5d3592"/>
      ${[[74, 72], [92, 76], [80, 92], [96, 92]].map(([x, y]) => `<path d="M${x - 4},${y - 5} L${x + 4},${y + 5} M${x + 4},${y - 5} L${x - 4},${y + 5}" stroke="#fff" stroke-width="2" stroke-linecap="round"/>`).join('')}
      <ellipse cx="36" cy="110" rx="7" ry="4" fill="#e08aa8"/><ellipse cx="120" cy="60" rx="6" ry="3.5" fill="#e08aa8"/>
    </g>
    ${T(78, 160, 'Hücre çekirdeği', { size: 11 })}
    <line x1="104" y1="64" x2="182" y2="28" stroke="#94a3b8" stroke-dasharray="4 3"/><line x1="104" y1="100" x2="182" y2="148" stroke="#94a3b8" stroke-dasharray="4 3"/>
    <g filter="url(#golge)">
      <polygon points="182,30 332,30 342,22 192,22" fill="#b07a45"/>
      <polygon points="332,30 342,22 342,140 332,148" fill="#7a4f27"/>
      <rect x="182" y="30" width="150" height="118" fill="url(#gAhsap)"/>
      <rect x="190" y="36" width="134" height="106" fill="#5b3a1d"/>
      ${kitaplar.join('')}
      <rect x="190" y="70" width="134" height="4" fill="#a47148"/><rect x="190" y="104" width="134" height="4" fill="#a47148"/>
    </g>
    ${T(257, 162, 'Kütüphane ve kitaplar', { size: 11 })}
    <line x1="346" y1="86" x2="374" y2="86" stroke="#334155" stroke-width="1.6" marker-end="url(#okUc)"/>
    <g filter="url(#golge)">
      <path d="M382,36 Q426,28 466,40 L466,140 Q426,128 382,136 Z" fill="#fffdf6" stroke="#cbd5e1"/>
      <path d="M466,40 Q506,28 552,36 L552,136 Q506,128 466,140 Z" fill="#fffaf0" stroke="#cbd5e1"/>
      <line x1="466" y1="40" x2="466" y2="140" stroke="#d6c7a8" stroke-width="2"/>
    </g>
    <rect x="474" y="64" width="72" height="27" rx="3" fill="#ffe066" opacity=".75"/>
    ${sayfaSol}${sayfaSag}
    ${T(467, 162, 'Kitaptaki bir konu', { size: 11 })}
    <line x1="556" y1="86" x2="584" y2="86" stroke="#334155" stroke-width="1.6" marker-end="url(#okUc)"/>
    <g>
      ${T(642, 98, 'H A R', { size: 30, w: 800, fill: '#334155', style: 'letter-spacing:2px' })}
      <circle cx="616" cy="86" r="24" fill="#d7ecff" fill-opacity=".45" stroke="#334155" stroke-width="3.5"/>
      <line x1="633" y1="103" x2="652" y2="124" stroke="#5b3a1d" stroke-width="7" stroke-linecap="round"/>
    </g>
    ${T(642, 162, 'Harfler', { size: 11 })}
  </svg>`;
}

/* ------------------------------------------------------------------ S6 */
const BAZ = { A: '#e5534b', T: '#3d8fd6', G: '#2fa35b', C: '#8e5cc4' };
function besgen(cx, cy, r, fill = 'url(#gSeker)') {
  const p = [];
  for (let i = 0; i < 5; i++) { const a = (-90 + i * 72) * Math.PI / 180; p.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); }
  return `<polygon points="${pts(p)}" fill="${fill}" stroke="#b45309" stroke-width=".8"/>`;
}
function bazKutu(x, y, w, h, b) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${BAZ[b]}" stroke="#00000040"/><rect x="${x + 2}" y="${y + 2}" width="${w - 4}" height="${h / 3}" rx="2" fill="#ffffff40"/>${T(x + w / 2, y + h / 2 + 4.5, b, { size: 12.5, w: 800, fill: '#fff' })}`;
}
export function s6() {
  const sol = ['A', 'G', 'T', 'C'], sag = ['T', 'C', 'G', 'G'];
  let g = '';
  const xs = 64, xd = 256;
  g += `<line x1="${xs}" y1="18" x2="${xs}" y2="222" stroke="#64748b" stroke-width="2.4"/><line x1="${xd}" y1="18" x2="${xd}" y2="222" stroke="#64748b" stroke-width="2.4"/>`;
  sol.forEach((b, i) => {
    const y = 44 + i * 50;
    g += `<circle cx="${xs}" cy="${y - 25}" r="9" fill="url(#gFosfat)" stroke="#a16207" stroke-width=".8"/>`;
    g += `<circle cx="${xd}" cy="${y + 25}" r="9" fill="url(#gFosfat)" stroke="#a16207" stroke-width=".8"/>`;
    g += besgen(xs, y, 12) + besgen(xd, y, 12);
    g += `<line x1="${xs + 12}" y1="${y}" x2="${xs + 18}" y2="${y}" stroke="#64748b" stroke-width="2"/><line x1="${xd - 18}" y1="${y}" x2="${xd - 12}" y2="${y}" stroke="#64748b" stroke-width="2"/>`;
    g += bazKutu(xs + 18, y - 11, 74, 22, b) + bazKutu(xd - 92, y - 11, 74, 22, sag[i]);
    g += T(286, y + 4, `${i + 1}.`, { size: 11, w: 700, fill: '#475569' });
  });
  // gösterge
  const gy = 252;
  g += `<rect x="4" y="${gy - 16}" width="312" height="44" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>`;
  g += `<circle cx="18" cy="${gy - 2}" r="6.5" fill="url(#gFosfat)" stroke="#a16207" stroke-width=".8"/>${T(28, gy + 2, 'Fosfat', { size: 9.5, a: 'start', w: 500 })}`;
  g += besgen(82, gy - 2, 8) + T(93, gy + 2, 'Deoksiriboz şekeri', { size: 9.5, a: 'start', w: 500 });
  g += T(196, gy + 2, 'Organik bazlar:', { size: 9.5, a: 'start', w: 500 });
  ['A', 'T', 'G', 'C'].forEach((b, i) => { g += `<rect x="${18 + i * 76}" y="${gy + 9}" width="12" height="10" rx="2" fill="${BAZ[b]}"/>` + T(34 + i * 76, gy + 18, { A: 'Adenin', T: 'Timin', G: 'Guanin', C: 'Sitozin' }[b], { size: 9.5, a: 'start', w: 500 }); });
  return `<svg viewBox="0 0 320 282" class="gorsel">${g}</svg>`;
}

/* ------------------------------------------------------------------ S7 */
export function s7() {
  const eski = '#1e3a8a', yeni = '#38bdf8';
  const nuk = (x, y, b, rot = 0) => `<g transform="translate(${x},${y}) rotate(${rot})"><circle cx="-11" cy="0" r="3.6" fill="url(#gFosfat)"/>${besgen(-3, 0, 4.6)}<rect x="1.5" y="-3" width="13" height="6" rx="1.5" fill="${BAZ[b]}"/></g>`;
  let g = '';
  // üstteki çift zincir
  for (let i = 0; i < 4; i++) { const y = 22 + i * 17; const b = ['A', 'G', 'C', 'T'][i]; const k = { A: 'T', T: 'A', G: 'C', C: 'G' }[b]; g += `<rect x="186" y="${y - 3}" width="14" height="6" fill="${BAZ[b]}"/><rect x="200" y="${y - 3}" width="14" height="6" fill="${BAZ[k]}"/>`; }
  g += `<line x1="185" y1="12" x2="185" y2="92" stroke="${eski}" stroke-width="4" stroke-linecap="round"/><line x1="215" y1="12" x2="215" y2="92" stroke="${eski}" stroke-width="4" stroke-linecap="round"/>`;
  // dallar
  const dal = (sx, ex, isaret) => {
    const S = [sx, 92], E = [ex, 228];
    const d = [E[0] - S[0], E[1] - S[1]]; const L = Math.hypot(...d); const u = [d[0] / L, d[1] / L];
    const n = [-u[1] * isaret, u[0] * isaret]; // içe doğru
    let s = `<line x1="${S[0]}" y1="${S[1]}" x2="${E[0]}" y2="${E[1]}" stroke="${eski}" stroke-width="4" stroke-linecap="round"/>`;
    const Y0 = [S[0] + d[0] * .3 + n[0] * 24, S[1] + d[1] * .3 + n[1] * 24], Y1 = [E[0] + n[0] * 24, E[1] + n[1] * 24];
    s += `<line x1="${f(Y0[0])}" y1="${f(Y0[1])}" x2="${f(Y1[0])}" y2="${f(Y1[1])}" stroke="${yeni}" stroke-width="4" stroke-linecap="round"/>`;
    const bz = ['T', 'C', 'G', 'A', 'G'];
    bz.forEach((b, i) => {
      const t = .38 + i * .14; const P = [S[0] + d[0] * t, S[1] + d[1] * t];
      const k = { A: 'T', T: 'A', G: 'C', C: 'G' }[b];
      const ang = Math.atan2(n[1], n[0]) * 180 / Math.PI;
      s += `<g transform="translate(${f(P[0])},${f(P[1])}) rotate(${f(ang)})"><rect x="2" y="-3" width="10" height="6" fill="${BAZ[b]}"/><rect x="12" y="-3" width="10" height="6" fill="${BAZ[k]}"/></g>`;
    });
    return s;
  };
  g += dal(185, 118, -1) + dal(215, 282, 1);
  g += nuk(196, 196, 'A', -20) + nuk(206, 222, 'C', 15) + nuk(186, 236, 'G', 5) + nuk(28, 210, 'T', -10) + nuk(300, 140, 'A', 20) + nuk(298, 176, 'G', -15);
  // hücre simgesi
  g += `<g filter="url(#golgeHafif)"><ellipse cx="58" cy="60" rx="46" ry="34" fill="url(#gHucre)" stroke="#d96b93"/><circle cx="64" cy="58" r="15" fill="url(#gCekirdek)"/></g>`;
  g += T(58, 112, 'Deri hücresi', { size: 10.5 });
  g += `<line x1="80" y1="48" x2="170" y2="30" stroke="#94a3b8" stroke-dasharray="4 3"/><line x1="80" y1="68" x2="170" y2="88" stroke="#94a3b8" stroke-dasharray="4 3"/>`;
  g += T(254, 20, 'Serbest', { size: 10, w: 600, fill: '#475569' }) + T(254, 32, 'nükleotitler', { size: 10, w: 600, fill: '#475569' });
  g += `<line x1="256" y1="38" x2="290" y2="128" stroke="#94a3b8" stroke-width=".8"/>`;
  // gösterge
  g += `<rect x="4" y="252" width="312" height="22" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>`;
  g += `<line x1="14" y1="263" x2="40" y2="263" stroke="${eski}" stroke-width="4" stroke-linecap="round"/>${T(46, 267, 'Başlangıçtaki (eski) zincir', { size: 9.5, a: 'start', w: 500 })}`;
  g += `<line x1="180" y1="263" x2="206" y2="263" stroke="${yeni}" stroke-width="4" stroke-linecap="round"/>${T(212, 267, 'Yeni oluşan zincir', { size: 9.5, a: 'start', w: 500 })}`;
  return `<svg viewBox="0 0 320 278" class="gorsel">${g}</svg>`;
}

/* ------------------------------------------------------------------ S8 */
export function s8() {
  const yaprak = (x, y, r, s = 1) => `<ellipse cx="${x}" cy="${y}" rx="${16 * s}" ry="${8 * s}" transform="rotate(${r} ${x} ${y})" fill="url(#gYaprak)" stroke="#2f6b18" stroke-width=".6"/>`;
  const cicek = (x, y) => `<g filter="url(#golgeHafif)"><path d="M${x},${y} c-14,-12 -16,6 -6,10 c-8,6 2,14 8,6 c4,8 14,0 6,-6 c10,-4 6,-20 -8,-10z" fill="#ffffff" stroke="#b8c2cc" stroke-width=".9"/><circle cx="${x + 1}" cy="${y + 3}" r="2.5" fill="#e9f0c9"/></g>`;
  const etiket = (x, y, s, hx, hy) => `<line x1="${hx}" y1="${hy}" x2="${x}" y2="${y + 11}" stroke="#334155" stroke-width="1"/><circle cx="${hx}" cy="${hy}" r="2.5" fill="#334155"/><g filter="url(#golgeHafif)"><rect x="${x}" y="${y}" width="104" height="22" rx="11" fill="#fff8e1" stroke="#d4a017"/></g>${T(x + 52, y + 15, s, { size: 11, w: 700 })}`;
  return `<svg viewBox="0 0 320 238" class="gorsel">
    <rect x="0" y="0" width="320" height="238" rx="10" fill="#f3faf0"/>
    <path d="M0,216 Q160,206 320,216 L320,238 L0,238 Z" fill="#8b5e3c"/>
    <path d="M96,214 C92,160 104,110 98,60 C96,40 102,24 108,14" fill="none" stroke="#3d8a22" stroke-width="4.5" stroke-linecap="round"/>
    ${yaprak(80, 186, 20)}${yaprak(116, 176, -25)}${yaprak(78, 140, 15, .9)}${yaprak(118, 124, -20, .9)}${yaprak(82, 92, 20, .8)}${yaprak(116, 74, -20, .75)}
    <path d="M118,120 c10,-6 16,2 10,8 c-6,4 -10,-2 -4,-4" fill="none" stroke="#3d8a22" stroke-width="1.4"/>
    <path d="M78,60 c-10,-4 -12,8 -4,10" fill="none" stroke="#3d8a22" stroke-width="1.4"/>
    ${cicek(112, 22)}${cicek(84, 50)}
    <g filter="url(#golgeHafif)">
      <path d="M100,156 C120,140 158,140 172,158 C156,170 120,172 100,156 Z" fill="#7fc04a" stroke="#3d7a1e"/>
      <path d="M106,156 C124,148 152,148 166,158 C150,164 124,166 106,156 Z" fill="#dff0c4"/>
      ${[116, 130, 144, 157].map((x) => `<circle cx="${x}" cy="157" r="5.2" fill="url(#gTohumSari)"/>`).join('')}
    </g>
    ${etiket(190, 16, 'Boy: Uu', 108, 30)}
    ${etiket(190, 62, 'Çiçek rengi: mm', 92, 54)}
    ${etiket(190, 150, 'Tohum rengi: SS', 160, 157)}
  </svg>`;
}

/* ------------------------------------------------------------------ S9 */
export function s9() {
  const tohum = (x, y, r, sari) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#${sari ? 'gTohumSari' : 'gTohumYesil'})" stroke="${sari ? '#a37f07' : '#356b12'}" stroke-width=".6"/>`;
  const satir = (y, ad, harf, sonuc) => {
    let s = T(8, y - 36, ad, { size: 11.5, w: 800, a: 'start', fill: '#13294b' });
    s += `<g filter="url(#golgeHafif)">${tohum(30, y, 15, true)}${tohum(100, y, 15, false)}</g>`;
    s += T(30, y + 32, `${harf} (sarı)`, { size: 10, w: 600 }) + T(100, y + 32, 'Yeşil', { size: 10, w: 600 });
    s += T(65, y + 6, '×', { size: 20, w: 700, fill: '#334155' });
    s += `<line x1="124" y1="${y}" x2="160" y2="${y}" stroke="#334155" stroke-width="1.8" marker-end="url(#okUc)"/>`;
    s += `<rect x="168" y="${y - 30}" width="146" height="60" rx="10" fill="#fffdf5" stroke="#d6c58f"/>`;
    sonuc.forEach((sari, i) => { s += tohum(186 + (i % 5) * 27, y - 12 + Math.floor(i / 5) * 24, 9, sari); });
    return s;
  };
  return `<svg viewBox="0 0 320 236" class="gorsel">
    ${T(241, 14, 'Oluşan bezelyelerin', { size: 9.5, w: 600, fill: '#475569' })}${T(241, 25, 'tohumları', { size: 9.5, w: 600, fill: '#475569' })}
    ${satir(78, 'Deney 1', 'X', [1, 1, 1, 1, 1, 1, 1, 1, 1, 1])}
    <line x1="4" y1="128" x2="316" y2="128" stroke="#e2e8f0"/>
    ${satir(186, 'Deney 2', 'Y', [1, 0, 1, 1, 0, 0, 1, 0, 1, 0])}
  </svg>`;
}

/* ------------------------------------------------------------------ S10 (avatarlar) */
export function avatar(tur) {
  const ten = '#f2c9a0';
  const yuz = `<circle cx="30" cy="32" r="17" fill="${ten}"/><circle cx="24" cy="31" r="1.8" fill="#2b2b2b"/><circle cx="36" cy="31" r="1.8" fill="#2b2b2b"/><path d="M24,39 q6,5 12,0" fill="none" stroke="#a0522d" stroke-width="1.6" stroke-linecap="round"/>`;
  const govde = (renk) => `<path d="M8,60 q2,-14 22,-14 q20,0 22,14 z" fill="${renk}"/>`;
  const s = {
    babaanne: `${govde('#7e57c2')}<path d="M10,36 q0,-26 20,-26 q20,0 20,26 q-4,10 -6,14 l0,-16 q-14,-12 -28,0 l0,16 q-2,-4 -6,-14z" fill="#9575cd"/>${yuz}<path d="M13,30 q2,-16 17,-16 q15,0 17,16 q-8,-8 -17,-8 q-9,0 -17,8z" fill="#9575cd"/><circle cx="24" cy="31" r="4.2" fill="none" stroke="#555" stroke-width="1"/><circle cx="36" cy="31" r="4.2" fill="none" stroke="#555" stroke-width="1"/><line x1="28.2" y1="31" x2="31.8" y2="31" stroke="#555"/>`,
    komsu: `${govde('#2e7d32')}${yuz}<path d="M13,28 q0,-15 17,-15 q17,0 17,15 q-6,-6 -17,-6 q-11,0 -17,6z" fill="#6d4c41"/><path d="M22,37 q8,-4 16,0 q-8,3 -16,0z" fill="#5d4037"/>`,
    baba: `${govde('#1565c0')}${yuz}<path d="M13,27 q1,-14 17,-14 q16,0 17,14 q-3,-6 -17,-6 q-14,0 -17,6z" fill="#3e2723"/><path d="M16,38 q14,14 28,0 q-2,10 -14,10 q-12,0 -14,-10z" fill="#4e342e" opacity=".85"/>`,
    ayse: `${govde('#e91e63')}<path d="M12,34 q-2,-22 18,-22 q20,0 18,22 l-3,-8 q-15,-8 -30,0z" fill="#5d4037"/><path d="M46,22 q12,4 8,20 q-2,-10 -10,-12z" fill="#5d4037"/>${yuz}<path d="M13,28 q2,-14 17,-14 q15,0 17,14 q-8,-7 -17,-7 q-9,0 -17,7z" fill="#5d4037"/><circle cx="47" cy="20" r="3" fill="#ff80ab"/>`,
  }[tur];
  return `<svg viewBox="0 0 60 60" class="avatar"><circle cx="30" cy="30" r="30" fill="#eef2ff"/><clipPath id="av${tur}"><circle cx="30" cy="30" r="30"/></clipPath><g clip-path="url(#av${tur})">${s}</g></svg>`;
}

/* ------------------------------------------------------------------ S11 */
export function s11() {
  const E = (x, y, hasta) => `<rect x="${x - 11}" y="${y - 11}" width="22" height="22" fill="${hasta ? '#334155' : '#fff'}" stroke="#334155" stroke-width="1.8"/>`;
  const K = (x, y, hasta) => `<circle cx="${x}" cy="${y}" r="11.5" fill="${hasta ? '#334155' : '#fff'}" stroke="#334155" stroke-width="1.8"/>`;
  const l = (a, b, c, d) => `<line x1="${a}" y1="${b}" x2="${c}" y2="${d}" stroke="#334155" stroke-width="1.6"/>`;
  let g = '';
  g += ['I', 'II', 'III', 'IV'].map((r, i) => T(12, [30, 92, 152, 212][i] + 4, r, { size: 11.5, w: 800, fill: '#7c3aed', a: 'start' })).join('');
  // I
  g += l(141, 30, 179, 30) + E(130, 30) + K(190, 30) + l(160, 30, 160, 60) + l(98, 60, 222, 60) + l(98, 60, 98, 81) + l(222, 60, 222, 81);
  // II
  g += l(56, 92, 87, 92) + K(45, 92) + E(98, 92) + l(233, 92, 264, 92) + K(222, 92) + E(275, 92);
  g += l(72, 92, 72, 122) + l(72, 122, 130, 122) + l(130, 122, 130, 141);
  g += l(248, 92, 248, 122) + l(248, 122, 190, 122) + l(190, 122, 190, 140);
  // III akraba evliliği
  g += l(141, 150, 178, 150) + l(141, 154, 178, 154) + E(130, 152) + K(190, 152);
  g += l(160, 152, 160, 182) + l(122, 182, 198, 182) + l(122, 182, 122, 201) + l(198, 182, 198, 200);
  // IV
  g += E(122, 212, true) + K(198, 212);
  // gösterge
  const gy = 246;
  g += `<rect x="4" y="${gy - 14}" width="312" height="42" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>`;
  g += `<rect x="12" y="${gy - 7}" width="11" height="11" fill="#fff" stroke="#334155" stroke-width="1.4"/>${T(28, gy + 2, 'Sağlıklı erkek', { size: 9.5, a: 'start', w: 500 })}`;
  g += `<circle cx="117" cy="${gy - 1.5}" r="6" fill="#fff" stroke="#334155" stroke-width="1.4"/>${T(127, gy + 2, 'Sağlıklı kadın', { size: 9.5, a: 'start', w: 500 })}`;
  g += `<rect x="212" y="${gy - 7}" width="11" height="11" fill="#334155"/>${T(228, gy + 2, 'Hasta erkek', { size: 9.5, a: 'start', w: 500 })}`;
  g += `<line x1="12" y1="${gy + 14}" x2="30" y2="${gy + 14}" stroke="#334155" stroke-width="1.4"/><line x1="12" y1="${gy + 18}" x2="30" y2="${gy + 18}" stroke="#334155" stroke-width="1.4"/>${T(36, gy + 20, 'Akraba evliliği', { size: 9.5, a: 'start', w: 500 })}`;
  g += `<line x1="117" y1="${gy + 16}" x2="140" y2="${gy + 16}" stroke="#334155" stroke-width="1.4"/>${T(146, gy + 20, 'Evlilik', { size: 9.5, a: 'start', w: 500 })}`;
  return `<svg viewBox="0 0 320 280" class="gorsel">${g}</svg>`;
}

/* ------------------------------------------------------------------ S13 */
function tilki(x, y, cesit) {
  const col = cesit === 'col';
  const govde = col ? '#e8c38f' : '#f7fafc', golge = col ? '#c99a5b' : '#c9d6e2', ic = col ? '#f3a6a0' : '#e8c9c9';
  const kulak = col
    ? `<path d="M16,-70 L2,-122 L32,-80 Z" fill="${govde}" stroke="${golge}"/><path d="M17,-76 L8,-112 L27,-82 Z" fill="${ic}"/>
       <path d="M30,-80 L44,-126 L48,-74 Z" fill="${govde}" stroke="${golge}"/><path d="M33,-80 L43,-116 L45,-78 Z" fill="${ic}"/>`
    : `<path d="M17,-74 Q16,-90 28,-80 Z" fill="${govde}" stroke="${golge}"/><path d="M33,-79 Q40,-94 46,-75 Z" fill="${govde}" stroke="${golge}"/>`;
  const rx = col ? 30 : 37, ry = col ? 21 : 27;
  return `<g transform="translate(${x},${y})" filter="url(#golge)">
    <path d="M-24,-20 C-62,-14 -70,-48 -48,-58 C-44,-36 -34,-30 -18,-30 Z" fill="${govde}" stroke="${golge}"/>
    ${col ? '<path d="M-58,-52 C-56,-44 -52,-40 -48,-38 C-52,-44 -54,-50 -48,-58Z" fill="#3b2a1a"/>' : ''}
    <ellipse cx="0" cy="${-ry - 2}" rx="${rx}" ry="${ry}" fill="${govde}" stroke="${golge}"/>
    <ellipse cx="4" cy="${-ry + 6}" rx="${rx * .7}" ry="${ry * .5}" fill="${golge}" opacity=".35"/>
    <rect x="12" y="-14" width="7" height="14" rx="3" fill="${govde}" stroke="${golge}"/><rect x="22" y="-14" width="7" height="14" rx="3" fill="${govde}" stroke="${golge}"/>
    <rect x="-22" y="-12" width="8" height="12" rx="3" fill="${govde}" stroke="${golge}"/>
    <path d="M8,${-ry - 14} Q18,-70 34,-58 L40,-46 Q26,${-ry + 2} 14,${-ry + 6} Z" fill="${govde}" stroke="${golge}"/>
    ${kulak}
    <circle cx="30" cy="${col ? -62 : -64}" r="${col ? 15 : 17}" fill="${govde}" stroke="${golge}"/>
    <path d="M40,${col ? -68 : -70} L62,-58 L40,${col ? -52 : -54} Z" fill="${govde}" stroke="${golge}"/>
    <circle cx="61" cy="-58" r="2.8" fill="#222"/>
    <circle cx="36" cy="${col ? -66 : -68}" r="2.4" fill="#222"/>
  </g>`;
}
export function s13() {
  return `<svg viewBox="0 0 704 196" class="gorsel">
    <g><rect x="0" y="0" width="346" height="170" rx="10" fill="url(#gCol)"/>
      <circle cx="300" cy="36" r="26" fill="#ffcf40" opacity=".4" filter="url(#parilti)"/><circle cx="300" cy="36" r="16" fill="url(#gGunes)"/>
      <path d="M0,120 Q70,88 150,116 Q230,140 346,104 L346,160 Q346,170 336,170 L10,170 Q0,170 0,160 Z" fill="url(#gKum)"/>
      <path d="M0,146 Q90,124 190,148 Q270,164 346,140 L346,160 Q346,170 336,170 L10,170 Q0,170 0,160 Z" fill="#c99446" opacity=".55"/>
      <path d="M262,126 l0,-30 m0,10 l-8,-6 m8,14 l8,-8" stroke="#5f8a3a" stroke-width="4" stroke-linecap="round" fill="none"/>
      ${tilki(150, 152, 'col')}
    </g>
    ${T(173, 188, 'Çöl tilkisi', { size: 12, w: 700 })}
    <g transform="translate(358,0)"><rect x="0" y="0" width="346" height="170" rx="10" fill="url(#gKutup)"/>
      <path d="M0,98 L50,58 L90,84 L140,40 L200,92 L346,70 L346,120 L0,120 Z" fill="#dfeaf4"/>
      <path d="M0,118 Q90,100 180,116 Q260,128 346,110 L346,160 Q346,170 336,170 L10,170 Q0,170 0,160 Z" fill="url(#gKar)"/>
      ${[[30, 30], [80, 18], [230, 26], [300, 50], [260, 14], [120, 22]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2" fill="#fff"/>`).join('')}
      ${tilki(170, 156, 'kutup')}
    </g>
    ${T(531, 188, 'Kutup tilkisi', { size: 12, w: 700 })}
  </svg>`;
}

/* ------------------------------------------------------------------ S15 */
function karBlok(x0, iz, genis, botMu, canta, harf, aciklama) {
  const cx = 86, w = genis ? 92 : 36;
  const top = 128, alt = 196, x1 = 14, x2 = 158, dx = 16, dy = 18;
  const onYuz = `M${x1},${top} L${cx - w / 2},${top} L${cx - w / 2 + 4},${top + iz} L${cx + w / 2 - 4},${top + iz} L${cx + w / 2},${top} L${x2},${top} L${x2},${alt} L${x1},${alt} Z`;
  let g = `<g transform="translate(${x0},0)">`;
  g += `<polygon points="${pts([[x1, top], [x2, top], [x2 + dx, top - dy], [x1 + dx, top - dy]])}" fill="url(#gKarUst)" stroke="#b8cfe3" stroke-width=".8"/>`;
  g += `<polygon points="${pts([[x2, top], [x2 + dx, top - dy], [x2 + dx, alt - dy], [x2, alt]])}" fill="url(#gKarYan)"/>`;
  g += `<polygon points="${pts([[cx - w / 2, top], [cx + w / 2, top], [cx + w / 2 + dx * .8, top - dy * .8], [cx - w / 2 + dx * .8, top - dy * .8]])}" fill="#9fbcd6" opacity=".75"/>`;
  g += `<path d="M${cx - w / 2 + 4},${top + iz} L${cx + w / 2 - 4},${top + iz} L${cx + w / 2 - 4 + dx * .8},${top + iz - dy * .8} L${cx - w / 2 + 4 + dx * .8},${top + iz - dy * .8} Z" fill="#7d9fc0" opacity=".6"/>`;
  g += `<path d="${onYuz}" fill="url(#gKarOn)" stroke="#b8cfe3" stroke-width=".8"/>`;
  g += `<path d="M${cx - w / 2},${top} L${cx - w / 2 + 4},${top + iz} L${cx + w / 2 - 4},${top + iz} L${cx + w / 2},${top}" fill="none" stroke="#5b84ad" stroke-width="2"/>`;
  // ayakkabı / raket simgesi
  if (botMu) {
    g += `<g transform="translate(${cx - 22},40)" filter="url(#golgeHafif)"><path d="M10,0 L28,0 L30,30 L48,34 Q54,36 54,44 L54,50 L6,50 L6,44 Z" fill="#5d3a1a"/><path d="M6,44 L54,44 L54,50 L6,50Z" fill="#2b1b0c"/><path d="M10,6 L28,6 M10,14 L28,14 M10,22 L28,22" stroke="#c7a27a" stroke-width="1.4"/></g>`;
  } else {
    g += `<g transform="translate(${cx},76)" filter="url(#golgeHafif)"><ellipse cx="0" cy="0" rx="44" ry="15" fill="#e2e8f0" stroke="#1f2937" stroke-width="3.2"/>${[-30, -15, 0, 15, 30].map((x) => `<line x1="${x}" y1="-13" x2="${x}" y2="13" stroke="#64748b" stroke-width="1"/>`).join('')}<line x1="-42" y1="0" x2="42" y2="0" stroke="#64748b" stroke-width="1"/>
      <g transform="translate(-20,-48)"><path d="M10,0 L28,0 L30,30 L48,34 Q54,36 54,44 L54,48 L6,48 L6,44 Z" fill="#5d3a1a"/><path d="M6,42 L54,42 L54,48 L6,48Z" fill="#2b1b0c"/></g></g>`;
  }
  if (canta) g += `<g transform="translate(128,12)" filter="url(#golgeHafif)"><rect x="0" y="6" width="30" height="36" rx="7" fill="#b03a2e"/><rect x="4" y="2" width="22" height="16" rx="6" fill="#922b21"/><rect x="6" y="24" width="18" height="12" rx="3" fill="#7b241c"/><path d="M8,6 q7,-10 14,0" fill="none" stroke="#5b1d16" stroke-width="2.5"/></g>${T(143, 10, 'ağır çanta', { size: 9, w: 700, fill: '#7b241c' })}`;
  g += `<g><circle cx="22" cy="22" r="12" fill="#13294b"/>${T(22, 26.5, harf, { size: 12.5, w: 800, fill: '#fff' })}</g>`;
  g += T(92, 214, aciklama, { size: 10, w: 600 });
  return g + '</g>';
}
export function s15() {
  return `<svg viewBox="0 0 704 222" class="gorsel">
    ${karBlok(0, 24, false, true, false, 'K', 'Kar botu – çantasız')}
    ${karBlok(176, 7, true, false, false, 'L', 'Kar raketi – çantasız')}
    ${karBlok(352, 14, true, false, true, 'M', 'Kar raketi – ağır çantalı')}
    ${karBlok(528, 40, false, true, true, 'N', 'Kar botu – ağır çantalı')}
  </svg>`;
}

/* ------------------------------------------------------------------ S16 */
function deney(x0, no, sivi, genis, derin, fark) {
  const bx1 = 10, bx2 = genis ? 114 : 80, ust = 58, alt = 196, yuz = 78;
  const hx = genis ? 62 : 45, hy = derin ? 166 : 102;
  const mx = genis ? 132 : 112;
  const taban = 136, sol = taban + fark / 2, sag = taban - fark / 2;
  const renk = sivi === 'yag' ? 'url(#gYag)' : 'url(#gSu)';
  let g = `<g transform="translate(${x0},0)">`;
  g += `<rect x="${bx1}" y="${yuz}" width="${bx2 - bx1}" height="${alt - yuz}" fill="${renk}" opacity=".85"/>`;
  g += `<ellipse cx="${(bx1 + bx2) / 2}" cy="${yuz}" rx="${(bx2 - bx1) / 2}" ry="4" fill="${sivi === 'yag' ? '#fbeeb0' : '#b5e0f7'}"/>`;
  // huni
  g += `<path d="M${hx - 14},${hy + 8} L${hx + 14},${hy + 8} L${hx + 3},${hy - 6} L${hx - 3},${hy - 6} Z" fill="url(#gMetal)" stroke="#475569" stroke-width=".8"/>`;
  g += `<line x1="${hx - 14}" y1="${hy + 8}" x2="${hx + 14}" y2="${hy + 8}" stroke="#c2185b" stroke-width="2.4"/>`;
  // hortum
  g += `<path d="M${hx},${hy - 6} L${hx},40 Q${hx},30 ${hx + 10},30 L${mx - 8},30 Q${mx},30 ${mx},40 L${mx},60" fill="none" stroke="#6b7280" stroke-width="3.2" stroke-linecap="round"/>`;
  // kap
  g += `<path d="M${bx1},${ust} L${bx1},${alt} Q${bx1},${alt + 4} ${bx1 + 4},${alt + 4} L${bx2 - 4},${alt + 4} Q${bx2},${alt + 4} ${bx2},${alt} L${bx2},${ust}" fill="url(#gCam)" stroke="#7aa6c2" stroke-width="1.6"/>`;
  g += `<ellipse cx="${(bx1 + bx2) / 2}" cy="${ust}" rx="${(bx2 - bx1) / 2}" ry="4" fill="none" stroke="#7aa6c2" stroke-width="1.2"/>`;
  // derinlik
  g += `<line x1="${bx1 - 6}" y1="${yuz}" x2="${bx1 - 6}" y2="${hy + 8}" stroke="#334155" stroke-width="1" marker-start="url(#okUc)" marker-end="url(#okUc)"/>`;
  g += T(bx1 - 8, (yuz + hy + 8) / 2 + 4, derin ? 'h₂' : 'h₁', { size: 10, w: 700, a: 'end', fill: '#334155' });
  // U boru
  const ux = mx, uw = 22;
  g += `<path d="M${ux},60 L${ux},176 Q${ux},190 ${ux + uw / 2},190 Q${ux + uw},190 ${ux + uw},176 L${ux + uw},64" fill="none" stroke="#94a3b8" stroke-width="8" stroke-linecap="round"/>`;
  g += `<path d="M${ux},${sol} L${ux},176 Q${ux},190 ${ux + uw / 2},190 Q${ux + uw},190 ${ux + uw},176 L${ux + uw},${sag}" fill="none" stroke="#e53935" stroke-width="5"/>`;
  g += `<path d="M${ux},60 L${ux},176 Q${ux},190 ${ux + uw / 2},190 Q${ux + uw},190 ${ux + uw},176 L${ux + uw},64" fill="none" stroke="#ffffff" stroke-opacity=".35" stroke-width="2"/>`;
  g += `<line x1="${ux - 6}" y1="${sol}" x2="${ux + uw + 6}" y2="${sol}" stroke="#334155" stroke-dasharray="2 2"/><line x1="${ux - 6}" y1="${sag}" x2="${ux + uw + 6}" y2="${sag}" stroke="#334155" stroke-dasharray="2 2"/>`;
  g += T(88, 16, `Deney ${no}`, { size: 11.5, w: 800 });
  g += T(88, 222, sivi === 'yag' ? 'Zeytinyağı' : genis ? 'Su (geniş kap)' : 'Su', { size: 10, w: 600, fill: '#475569' });
  return g + '</g>';
}
export function s16() {
  return `<svg viewBox="0 0 704 230" class="gorsel">
    ${deney(10, 1, 'su', false, false, 10)}${deney(184, 2, 'su', false, true, 34)}${deney(358, 3, 'yag', false, true, 26)}${deney(526, 4, 'su', true, true, 34)}
  </svg>`;
}

/* ------------------------------------------------------------------ S17 */
function paket(x, y, sisik) {
  return sisik
    ? `<g transform="translate(${x},${y})" filter="url(#golgeHafif)"><path d="M-30,-30 Q0,-42 30,-30 Q42,0 30,30 Q0,42 -30,30 Q-42,0 -30,-30Z" fill="url(#gCips)"/><path d="M-30,-30 Q0,-42 30,-30" fill="none" stroke="#8a2a08" stroke-width="2.2" stroke-dasharray="3 2"/><path d="M-30,30 Q0,42 30,30" fill="none" stroke="#8a2a08" stroke-width="2.2" stroke-dasharray="3 2"/><ellipse cx="-8" cy="-10" rx="12" ry="7" fill="#fff" opacity=".35"/>${T(0, 6, 'CİPS', { size: 11, w: 800, fill: '#fff4d6' })}</g>`
    : `<g transform="translate(${x},${y})" filter="url(#golgeHafif)"><path d="M-26,-28 L26,-28 Q29,0 26,28 L-26,28 Q-29,0 -26,-28Z" fill="url(#gCips)"/><path d="M-26,-28 L26,-28" stroke="#8a2a08" stroke-width="2.2" stroke-dasharray="3 2"/><path d="M-26,28 L26,28" stroke="#8a2a08" stroke-width="2.2" stroke-dasharray="3 2"/><path d="M-14,-18 l6,30 M10,-16 l-4,28" stroke="#b8370c" stroke-width="1" opacity=".6"/>${T(0, 5, 'CİPS', { size: 11, w: 800, fill: '#fff4d6' })}</g>`;
}
function sise(x, y, ezik) {
  const yan = ezik
    ? 'M-9,-30 L-9,-24 Q-16,-18 -15,-10 Q-6,-4 -14,4 Q-6,10 -14,18 Q-6,24 -14,30 L14,30 Q6,24 14,18 Q6,10 14,4 Q6,-4 15,-10 Q16,-18 9,-24 L9,-30 Z'
    : 'M-9,-30 L-9,-24 Q-17,-18 -17,-8 L-17,30 L17,30 L17,-8 Q17,-18 9,-24 L9,-30 Z';
  return `<g transform="translate(${x},${y})" filter="url(#golgeHafif)"><path d="${yan}" fill="url(#gPet)" stroke="#5aa5cf" stroke-width="1.2"/><rect x="-10" y="-38" width="20" height="9" rx="2" fill="#1e88e5"/></g>`;
}
export function s17() {
  const cam = (x, y) => `<g transform="translate(${x},${y})"><path d="M0,0 L-7,16 L7,16 Z" fill="#2f6b2a"/><path d="M0,8 L-9,26 L9,26 Z" fill="#3a7d32"/><rect x="-1.5" y="26" width="3" height="5" fill="#5d3a1a"/></g>`;
  const kutu = (x, baslik, icerik) => `<g transform="translate(${x},162)"><rect x="0" y="0" width="226" height="104" rx="10" fill="#ffffff" stroke="#cbd5e1" filter="url(#golgeHafif)"/>${T(113, 18, baslik, { size: 11, w: 800, fill: '#13294b' })}${icerik}</g>`;
  return `<svg viewBox="0 0 704 270" class="gorsel">
    <rect x="0" y="0" width="704" height="150" rx="10" fill="url(#gGokyuzu)"/>
    <path d="M300,150 L400,40 L470,90 L540,30 L640,86 L704,60 L704,150 Z" fill="#a7b4c2"/>
    <path d="M540,30 L560,44 L548,46 L538,40 L526,46Z" fill="#fff"/><path d="M400,40 L414,56 L404,54 L396,48 L388,54Z" fill="#fff"/>
    <path d="M0,150 L0,112 Q60,104 120,112 L160,116 C260,120 330,110 420,76 C470,60 520,58 704,58 L704,150 Z" fill="url(#gArazi)"/>
    <path d="M0,112 Q60,104 120,112 L120,150 L0,150 Z" fill="url(#gDeniz)"/>
    <path d="M10,120 q10,-4 20,0 t20,0 M50,132 q10,-4 20,0 t20,0" stroke="#bfe6ff" stroke-width="1.4" fill="none"/>
    <path d="M140,118 C250,122 330,108 420,80 C470,64 520,62 640,62" fill="none" stroke="#5b5b5b" stroke-width="6" stroke-linecap="round"/>
    <path d="M140,118 C250,122 330,108 420,80 C470,64 520,62 640,62" fill="none" stroke="#f8f8f8" stroke-width="1.2" stroke-dasharray="7 6"/>
    ${[[560, 34], [586, 30], [612, 36], [668, 30], [690, 34]].map(([x, y]) => cam(x, y)).join('')}
    <g transform="translate(330,92) rotate(-17)"><rect x="-22" y="-14" width="44" height="12" rx="4" fill="#c62828"/><path d="M-14,-14 L-8,-24 L10,-24 L16,-14Z" fill="#e53935"/><path d="M-10,-15 L-6,-22 L1,-22 L1,-15Z M3,-15 L3,-22 L9,-22 L13,-15Z" fill="#bbdefb"/><circle cx="-12" cy="-1" r="5" fill="#222"/><circle cx="12" cy="-1" r="5" fill="#222"/></g>
    ${T(60, 98, 'Sahil', { size: 12, w: 800, fill: '#0b3d66' })}${T(620, 100, 'Yayla', { size: 12, w: 800, fill: '#1f4d12' })}
    ${kutu(0, '1. Sahil (gidiş)', paket(113, 64, false))}
    ${kutu(239, '2. Yayla', paket(70, 62, true) + sise(166, 66, false) + T(166, 101, 'Kapağı kapatıldı', { size: 9, w: 600, fill: '#475569' }))}
    ${kutu(478, '3. Sahil (dönüş)', sise(113, 66, true))}
  </svg>`;
}

/* ------------------------------------------------------------------ S18 */
export function s18() {
  return `<svg viewBox="0 0 320 246" class="gorsel">
    <rect x="0" y="0" width="320" height="246" rx="10" fill="#f1f5f9"/>
    <rect x="0" y="222" width="320" height="24" rx="0" fill="#cbd5e1"/>
    <!-- sıvı ve kap -->
    <path d="M34,112 L34,206 Q34,214 42,214 L286,214 Q294,214 294,206 L294,124 L156,124 L156,190 L62,190 L62,112 Z" fill="url(#gHidrolik)"/>
    <path d="M30,60 L30,208 Q30,218 40,218 L288,218 Q298,218 298,208 L298,80 M152,80 L152,186 L66,186 L66,60" fill="none" stroke="#475569" stroke-width="4" stroke-linejoin="round"/>
    <ellipse cx="48" cy="60" rx="18" ry="5" fill="none" stroke="#475569" stroke-width="2"/>
    <ellipse cx="225" cy="80" rx="73" ry="8" fill="none" stroke="#475569" stroke-width="2"/>
    <!-- küçük piston -->
    <rect x="33" y="102" width="30" height="10" fill="url(#gSilindir)" stroke="#475569"/>
    <rect x="45" y="44" width="6" height="58" fill="url(#gSilindir)" stroke="#475569" stroke-width=".8"/>
    <rect x="36" y="38" width="24" height="7" rx="2" fill="#334155"/>
    <line x1="48" y1="6" x2="48" y2="34" stroke="#c0392b" stroke-width="3" marker-end="url(#okUcKirmizi)"/>
    ${T(62, 16, 'Kuvvet', { size: 10, w: 700, fill: '#c0392b', a: 'start' })}
    <!-- büyük piston -->
    <rect x="155" y="114" width="140" height="10" fill="url(#gSilindir)" stroke="#475569"/>
    <rect x="215" y="72" width="20" height="42" fill="url(#gSilindir)" stroke="#475569" stroke-width=".8"/>
    <rect x="160" y="64" width="130" height="8" rx="2" fill="#334155"/>
    <g transform="translate(225,40)" filter="url(#golgeHafif)">
      <path d="M-56,14 L-54,2 Q-50,-4 -40,-6 L-26,-20 Q-22,-24 -14,-24 L18,-24 Q26,-24 30,-18 L40,-6 Q54,-4 56,4 L56,14 Z" fill="#1e88e5"/>
      <path d="M-22,-8 L-14,-19 L-2,-19 L-2,-8 Z M2,-8 L2,-19 L16,-19 L26,-8 Z" fill="#d6ecff"/>
      <circle cx="-34" cy="16" r="9" fill="#222"/><circle cx="-34" cy="16" r="4" fill="#9e9e9e"/><circle cx="34" cy="16" r="9" fill="#222"/><circle cx="34" cy="16" r="4" fill="#9e9e9e"/>
    </g>
    ${T(104, 206, 'Hidrolik yağ', { size: 10, w: 700, fill: '#7c2d12' })}
    <line x1="14" y1="84" x2="36" y2="104" stroke="#334155"/>${T(0, 70, 'Küçük', { size: 8.5, w: 600, a: 'start' })}${T(0, 80, 'piston', { size: 8.5, w: 600, a: 'start' })}
    <line x1="270" y1="140" x2="262" y2="122" stroke="#334155"/>${T(250, 152, 'Büyük piston', { size: 9.5, w: 600, a: 'start' })}
  </svg>`;
}

/* ------------------------------------------------------------------ S19 */
export function s19(ifadeler) {
  const kutu = (x, y, w, h, metin, no) => `<g filter="url(#golgeHafif)"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="#fff" stroke="#6366f1" stroke-width="1.3"/></g>
    <foreignObject x="${x + 6}" y="${y + 4}" width="${w - 12}" height="${h - 8}"><div xmlns="http://www.w3.org/1999/xhtml" class="dy-kutu"><b>${no}.</b> ${metin}</div></foreignObject>`;
  const ok = (x1, y1, x2, y2, et) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#334155" stroke-width="1.4" marker-end="url(#okUc)"/><g><circle cx="${(x1 + x2) / 2}" cy="${(y1 + y2) / 2}" r="8" fill="${et === 'D' ? '#16a34a' : '#dc2626'}"/>${T((x1 + x2) / 2, (y1 + y2) / 2 + 3.6, et, { size: 10, w: 800, fill: '#fff' })}</g>`;
  const L3 = [6, 182, 358, 534], w3 = 164;
  let g = kutu(220, 4, 264, 64, ifadeler[0], 1);
  g += kutu(54, 100, 262, 78, ifadeler[1], 2) + kutu(388, 100, 262, 78, ifadeler[2], 3);
  g += ok(300, 68, 210, 98, 'D') + ok(404, 68, 494, 98, 'Y');
  L3.forEach((x, i) => { g += kutu(x, 216, w3, 96, ifadeler[3 + i], 4 + i); });
  g += ok(150, 178, 96, 214, 'D') + ok(220, 178, 262, 214, 'Y') + ok(484, 178, 440, 214, 'D') + ok(560, 178, 612, 214, 'Y');
  let cikis = 0;
  L3.forEach((x) => {
    [x + 40, x + w3 - 40].forEach((cx, j) => {
      cikis++;
      g += ok(cx, 312, cx, 336, j === 0 ? 'D' : 'Y');
      g += `<g><rect x="${cx - 13}" y="338" width="26" height="22" rx="5" fill="#13294b"/>${T(cx, 353.5, String(cikis), { size: 12, w: 800, fill: '#fff' })}</g>`;
    });
  });
  return `<svg viewBox="0 0 704 362" class="gorsel">${g}</svg>`;
}

/* ------------------------------------------------------------------ S20 */
export function s20() {
  const pencere = (x, y) => `<rect x="${x}" y="${y}" width="24" height="22" rx="1.5" fill="#bfe1f6" stroke="#fff" stroke-width="2"/><line x1="${x + 12}" y1="${y}" x2="${x + 12}" y2="${y + 22}" stroke="#fff" stroke-width="1.5"/>`;
  const katlar = [[78, 'En üst kat'], [128, ''], [178, ''], [228, 'Zemin kat']];
  let g = `<rect x="0" y="0" width="320" height="290" rx="10" fill="url(#gGokyuzu)"/><rect x="0" y="270" width="320" height="20" fill="#8dbf5a"/>`;
  g += `<polygon points="${pts([[226, 70], [256, 54], [256, 254], [226, 270]])}" fill="#cdb89a"/>`;
  g += `<polygon points="${pts([[76, 70], [226, 70], [256, 54], [106, 54]])}" fill="#b9a383"/>`;
  g += `<rect x="76" y="70" width="150" height="200" fill="url(#gBina)" stroke="#bfa98a"/>`;
  [120, 170, 220].forEach((y) => { g += `<line x1="76" y1="${y}" x2="226" y2="${y}" stroke="#cbb594" stroke-width="1.2"/>`; });
  katlar.forEach(([y]) => { g += pencere(150, y + 12) + pencere(190, y + 12); });
  g += `<rect x="186" y="236" width="22" height="34" fill="#8a5a33"/>`;
  // depo
  g += `<g filter="url(#golge)"><rect x="128" y="18" width="74" height="40" fill="url(#gDepo)"/><ellipse cx="165" cy="58" rx="37" ry="7" fill="#2c5689"/><ellipse cx="165" cy="18" rx="37" ry="7" fill="#9cc6ee"/></g>`;
  g += `<rect x="150" y="26" width="30" height="26" rx="3" fill="#1d4f8a" stroke="#cfe6fb"/><rect x="151" y="34" width="28" height="17" fill="#4fa3e8"/>`;
  g += T(165, 12, 'Su deposu', { size: 10, w: 700, fill: '#0b3d66' });
  // boru
  g += `<path d="M138,58 L138,62 L56,62 L56,262" fill="none" stroke="#6b7280" stroke-width="5" stroke-linejoin="round"/>`;
  const musluk = (y, guc, etiket) => {
    let s = `<path d="M56,${y} L96,${y}" stroke="#6b7280" stroke-width="5"/><rect x="92" y="${y - 7}" width="16" height="12" rx="2" fill="url(#gMetal)" stroke="#475569"/><rect x="97" y="${y - 13}" width="6" height="6" fill="#475569"/>`;
    s += `<path d="M108,${y + 1} q${guc},2 ${guc * 1.4},${30 - guc / 6}" fill="none" stroke="#2f8be0" stroke-width="3.2" stroke-linecap="round" opacity=".85"/>`;
    if (etiket) s += T(10, y + 4, etiket, { size: 9.5, w: 700, a: 'start', fill: '#1f2a37' });
    return s;
  };
  g += musluk(100, 8, '') + musluk(150, 18, '') + musluk(250, 40, '');
  g += T(14, 96, 'En üst', { size: 9.5, w: 700, a: 'start' }) + T(14, 107, 'kat', { size: 9.5, w: 700, a: 'start' });
  g += T(14, 146, 'Orta', { size: 9.5, w: 700, a: 'start' }) + T(14, 157, 'kat', { size: 9.5, w: 700, a: 'start' });
  g += T(14, 246, 'Zemin', { size: 9.5, w: 700, a: 'start' }) + T(14, 257, 'kat', { size: 9.5, w: 700, a: 'start' });
  return `<svg viewBox="0 0 320 290" class="gorsel">${g}</svg>`;
}

/* ------------------------------------------------------------------ küçük simgeler (tablolar) */
export const simge = {
  yagmur: `<svg viewBox="0 0 32 32" class="simge"><path d="M8,18 a6,6 0 0 1 2,-11 a8,8 0 0 1 14,2 a5,5 0 0 1 0,9z" fill="#90a4ae"/><path d="M10,22 l-2,5 M16,22 l-2,5 M22,22 l-2,5" stroke="#1e88e5" stroke-width="2" stroke-linecap="round"/></svg>`,
  cay: `<svg viewBox="0 0 32 32" class="simge"><path d="M6,26 C6,12 16,4 27,5 C27,17 18,26 6,26z" fill="#43a047"/><path d="M6,26 L22,10" stroke="#1b5e20" stroke-width="1.4"/></svg>`,
  grafik: `<svg viewBox="0 0 32 32" class="simge"><rect x="3" y="3" width="26" height="26" rx="3" fill="#fff3e0" stroke="#fb8c00"/><polyline points="6,24 11,20 15,22 20,14 26,8" fill="none" stroke="#e65100" stroke-width="2"/></svg>`,
  sis: `<svg viewBox="0 0 32 32" class="simge"><path d="M5,11 h22 M3,16 h24 M7,21 h22 M5,26 h18" stroke="#90a4ae" stroke-width="2.6" stroke-linecap="round"/></svg>`,
  sera: `<svg viewBox="0 0 32 32" class="simge"><path d="M3,27 L3,15 Q16,3 29,15 L29,27z" fill="#c8e6c9" stroke="#2e7d32"/><path d="M16,8 L16,27 M3,20 H29" stroke="#2e7d32"/></svg>`,
  gunes: `<svg viewBox="0 0 32 32" class="simge"><circle cx="16" cy="16" r="6" fill="#ffca28"/><g stroke="#ffa000" stroke-width="2" stroke-linecap="round"><path d="M16,3v4M16,25v4M3,16h4M25,16h4M7,7l3,3M22,22l3,3M25,7l-3,3M10,22l-3,3"/></g></svg>`,
  ari: `<svg viewBox="0 0 32 32" class="simge"><ellipse cx="16" cy="18" rx="9" ry="7" fill="#fbc02d"/><path d="M12,12 v12 M17,11 v14" stroke="#3e2723" stroke-width="2.4"/><ellipse cx="13" cy="9" rx="5" ry="3" fill="#e3f2fd" stroke="#90caf9"/><ellipse cx="20" cy="9" rx="5" ry="3" fill="#e3f2fd" stroke="#90caf9"/></svg>`,
  radyasyon: `<svg viewBox="0 0 32 32" class="simge"><circle cx="16" cy="16" r="13" fill="#ffeb3b" stroke="#333"/><circle cx="16" cy="16" r="2.6" fill="#333"/><path d="M16,13 L11,5 A12,12 0 0 1 21,5z M13.4,17.5 L4.5,18 A12,12 0 0 0 9.5,26.5z M18.6,17.5 L22.5,26.5 A12,12 0 0 0 27.5,18z" fill="#333"/></svg>`,
  dambil: `<svg viewBox="0 0 32 32" class="simge"><rect x="4" y="10" width="5" height="12" rx="1.5" fill="#455a64"/><rect x="23" y="10" width="5" height="12" rx="1.5" fill="#455a64"/><rect x="9" y="14.5" width="14" height="3" fill="#90a4ae"/></svg>`,
  bugday: `<svg viewBox="0 0 32 32" class="simge"><path d="M16,30 V8" stroke="#a1887f" stroke-width="1.6"/>${[8, 12, 16, 20].map((y) => `<ellipse cx="12.5" cy="${y}" rx="3.2" ry="1.8" transform="rotate(-35 12.5 ${y})" fill="#f9a825"/><ellipse cx="19.5" cy="${y}" rx="3.2" ry="1.8" transform="rotate(35 19.5 ${y})" fill="#f9a825"/>`).join('')}</svg>`,
  keci: `<svg viewBox="0 0 32 32" class="simge"><ellipse cx="15" cy="19" rx="10" ry="6" fill="#8d6e63"/><circle cx="25" cy="12" r="4" fill="#8d6e63"/><path d="M24,8 q-4,-6 -8,-4 M27,8 q2,-6 -2,-6" stroke="#5d4037" stroke-width="1.6" fill="none"/><path d="M9,24v5M13,24v5M18,24v5M22,24v5" stroke="#5d4037" stroke-width="2"/></svg>`,
  goz: `<svg viewBox="0 0 32 32" class="simge"><path d="M3,16 Q16,4 29,16 Q16,28 3,16z" fill="#fff" stroke="#37474f" stroke-width="1.5"/><circle cx="16" cy="16" r="5.5" fill="#1e88e5"/><circle cx="16" cy="16" r="2.4" fill="#111"/></svg>`,
  inek: `<svg viewBox="0 0 32 32" class="simge"><ellipse cx="15" cy="18" rx="11" ry="7" fill="#fafafa" stroke="#424242"/><circle cx="11" cy="16" r="3" fill="#424242"/><circle cx="19" cy="20" r="2.5" fill="#424242"/><ellipse cx="26" cy="13" rx="4" ry="3.5" fill="#fafafa" stroke="#424242"/><path d="M8,24v5M13,24v5M18,24v5M22,24v5" stroke="#424242" stroke-width="2"/></svg>`,
};
