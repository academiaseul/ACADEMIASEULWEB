// Flashcards Básico 1 · Estilo A · Sticker pop
// Genera tarjetas.html (24 caras, 6 páginas carta) y, con puppeteer-core,
// Flashcards_Basico1_A_Sticker_pop.pdf + vista_previa.png.
// Uso: node make.js   (desde cualquier carpeta)
'use strict';
const fs = require('fs');
const path = require('path');
const SCRATCH = 'C:/Users/Chingu/AppData/Local/Temp/claude/C--Users-Chingu-Desktop-ACADEMIASEULWEB/d4111e1b-5523-44ea-97b2-b1a1d9545b9e/scratchpad/package.json';
const req = require('module').createRequire(SCRATCH);
const QR = req('qrcode');
const puppeteer = req('puppeteer-core');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const DIR = __dirname;
const DATOS = path.join(DIR, '..', 'palabras.json');
const HTML = path.join(DIR, 'tarjetas.html');
const PDF = path.join(DIR, 'Flashcards_Basico1_A_Sticker_pop.pdf');
const PNG = path.join(DIR, 'vista_previa.png');

// ---------- Paleta (sin rojo ni rosado) ----------
const D = '#14142B', W = '#FFFFFF', AZ = '#4236F6', AZ2 = '#2A1FC7', LAV = '#DCE0FA';
const GOLD = '#E8B84B', GOLD2 = '#B9861E', CREAM = '#FFF4D9', PEACH = '#FFB98A', NAVY = '#003478';
const CAT = {
  'Comida y bebida': { bg: '#E8B84B', tint: '#FCEFC9' },
  'Naturaleza': { bg: '#9FD8FF', tint: '#DDF1FF' },
  'Objetos': { bg: '#C7B8FF', tint: '#ECE6FF' },
  'Animales': { bg: '#8FE3C6', tint: '#D3F6EA' },
};

// ---------- Piezas de dibujo (viewBox 0 0 220 220) ----------
const f = n => +(+n).toFixed(2);
function sparkle(x, y, r) {
  const k = 0.2 * r;
  return `<path d="M${f(x)} ${f(y - r)} Q${f(x + k)} ${f(y - k)} ${f(x + r)} ${f(y)} Q${f(x + k)} ${f(y + k)} ${f(x)} ${f(y + r)} Q${f(x - k)} ${f(y + k)} ${f(x - r)} ${f(y)} Q${f(x - k)} ${f(y - k)} ${f(x)} ${f(y - r)} Z" fill="${W}" stroke="${D}" stroke-width="3" stroke-linejoin="round"/>`;
}
const ring = (x, y, r = 6) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${D}" stroke-width="3"/>`;
function drop(x, y, s, fill) { // punta arriba en (x,y)
  return `<path d="M${x} ${y} C${x} ${y} ${f(x - 10 * s)} ${f(y + 13 * s)} ${f(x - 10 * s)} ${f(y + 19 * s)} A${f(10 * s)} ${f(10 * s)} 0 0 0 ${f(x + 10 * s)} ${f(y + 19 * s)} C${f(x + 10 * s)} ${f(y + 13 * s)} ${x} ${y} ${x} ${y} Z" fill="${fill}" stroke="${D}" stroke-width="3" stroke-linejoin="round"/>`;
}
function face(cx, cy, s = 1) {
  return `<ellipse cx="${f(cx - 14 * s)}" cy="${f(cy)}" rx="${f(6.5 * s)}" ry="${f(8.5 * s)}" fill="${D}"/>
<ellipse cx="${f(cx + 14 * s)}" cy="${f(cy)}" rx="${f(6.5 * s)}" ry="${f(8.5 * s)}" fill="${D}"/>
<circle cx="${f(cx - 11.8 * s)}" cy="${f(cy - 3.4 * s)}" r="${f(2.4 * s)}" fill="${W}"/>
<circle cx="${f(cx + 16.2 * s)}" cy="${f(cy - 3.4 * s)}" r="${f(2.4 * s)}" fill="${W}"/>
<ellipse cx="${f(cx - 26 * s)}" cy="${f(cy + 14 * s)}" rx="${f(7 * s)}" ry="${f(4.5 * s)}" fill="${PEACH}"/>
<ellipse cx="${f(cx + 26 * s)}" cy="${f(cy + 14 * s)}" rx="${f(7 * s)}" ry="${f(4.5 * s)}" fill="${PEACH}"/>
<path d="M${f(cx - 8 * s)} ${f(cy + 13 * s)} Q${f(cx)} ${f(cy + 25 * s)} ${f(cx + 8 * s)} ${f(cy + 13 * s)} Z" fill="${D}" stroke="${D}" stroke-width="${f(3 * s)}" stroke-linejoin="round"/>`;
}
// Silueta de sticker: sombra + borde oscuro + borde blanco (como el prototipo)
function sticker(items) {
  const body = add => items.map(it => typeof it === 'string' ? it
    : `<path d="${it.tail}" fill="none" stroke-width="${it.w + add}"/>`).join('');
  const g = (paint, sw, add, extra = '') => `<g${extra} fill="${paint}" stroke="${paint}" stroke-width="${sw}" stroke-linejoin="round" stroke-linecap="round">${body(add)}</g>`;
  return g(D, 24, 28, ' transform="translate(6 7)" opacity="0.28"') + g(D, 24, 28) + g(W, 17, 21);
}
const P = (d, fill, sw = 4, extra = '') => `<path d="${d}" fill="${fill}" stroke="${D}" stroke-width="${sw}" stroke-linejoin="round" stroke-linecap="round"${extra}/>`;
const L = (d, color, sw) => `<path d="${d}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;

const ILU = {};

// 01 우유 · cartón de leche (idéntico al prototipo aprobado)
ILU['우유'] = `
<g transform="translate(6 7)" opacity="0.28"><path d="M62 192 L62 92 L78 47 L78 35 L158 35 L158 47 L174 78 L174 178 L142 192 Z" fill="${D}" stroke="${D}" stroke-width="24" stroke-linejoin="round"/></g>
<path d="M62 192 L62 92 L78 47 L78 35 L158 35 L158 47 L174 78 L174 178 L142 192 Z" fill="${D}" stroke="${D}" stroke-width="24" stroke-linejoin="round"/>
<path d="M62 192 L62 92 L78 47 L78 35 L158 35 L158 47 L174 78 L174 178 L142 192 Z" fill="${W}" stroke="${W}" stroke-width="17" stroke-linejoin="round"/>
<path d="M142 92 L174 78 L174 178 L142 192 Z" fill="${LAV}" stroke="${D}" stroke-width="4" stroke-linejoin="round"/>
<path d="M142 168 L174 154 L174 178 L142 192 Z" fill="${AZ2}" stroke="${D}" stroke-width="4" stroke-linejoin="round"/>
<path d="M62 92 L142 92 L142 192 L62 192 Z" fill="${W}" stroke="${D}" stroke-width="4" stroke-linejoin="round"/>
<path d="M62 168 Q82 158 102 168 T142 168 L142 192 L62 192 Z" fill="${AZ}" stroke="${D}" stroke-width="4" stroke-linejoin="round"/>
<path d="M62 92 L142 92 L158 47 L78 47 Z" fill="${AZ}" stroke="${D}" stroke-width="4" stroke-linejoin="round"/>
<path d="M142 92 L174 78 L158 47 Z" fill="${AZ2}" stroke="${D}" stroke-width="4" stroke-linejoin="round"/>
<path d="M78 35 L158 35 L158 47 L78 47 Z" fill="${W}" stroke="${D}" stroke-width="4" stroke-linejoin="round"/>
<path d="M70 100 L70 112" stroke="${LAV}" stroke-width="4" stroke-linecap="round"/>
${face(102, 122, 1)}
${sparkle(40, 50, 13)}${sparkle(200, 110, 9)}
<path d="M30 114 C30 114 20 127 20 133 A10 10 0 0 0 40 133 C40 127 30 114 30 114 Z" fill="${W}" stroke="${D}" stroke-width="3" stroke-linejoin="round"/>
${ring(196, 44)}`;

// 02 나무 · árbol
{
  const crown = 'M62 140 A30 30 0 0 1 46 96 A34 34 0 0 1 80 52 A38 38 0 0 1 140 52 A34 34 0 0 1 174 96 A30 30 0 0 1 158 140 A120 120 0 0 1 62 140 Z';
  const trunk = 'M97 132 L95 184 Q94 192 102 192 L118 192 Q126 192 125 184 L123 132 Z';
  ILU['나무'] = sticker([`<path d="${crown}"/>`, `<path d="${trunk}"/>`, `<ellipse cx="110" cy="192" rx="48" ry="10"/>`])
    + `<ellipse cx="110" cy="192" rx="48" ry="10" fill="#7FD69A" stroke="${D}" stroke-width="4"/>`
    + L('M74 192 L78 184 L82 192', '#2F8F57', 3) + L('M138 192 L142 184 L146 192', '#2F8F57', 3)
    + P(trunk, '#A86B3C')
    + L('M105 158 L105 176', '#74461F', 4) + L('M115 168 L115 182', '#74461F', 4)
    + P(crown, '#5CC98A')
    + L('M62 88 Q66 68 86 60', '#B4F0C8', 6)
    + L('M136 66 Q142 72 148 66', '#2F8F57', 4) + L('M146 122 Q152 128 158 122', '#2F8F57', 4)
    + L('M58 120 Q64 126 70 120', '#2F8F57', 4) + L('M98 62 Q104 68 110 62', '#2F8F57', 4)
    + face(110, 98, 1)
    + sparkle(188, 36, 12) + sparkle(30, 174, 9) + ring(190, 168);
}

// 03 바다 · mar (insignia con olas, sol y pez)
ILU['바다'] = sticker([`<circle cx="110" cy="122" r="74"/>`, `<circle cx="166" cy="56" r="24"/>`])
  + `<defs><clipPath id="clipMar"><circle cx="110" cy="122" r="72"/></clipPath></defs>`
  + `<circle cx="110" cy="122" r="74" fill="#E6F5FF"/>`
  + `<g clip-path="url(#clipMar)">`
  + L('M58 88 Q64 81 70 88 Q76 81 82 88', D, 3) + L('M90 70 Q94 65 98 70 Q102 65 106 70', D, 2.5)
  + P('M20 128 Q40 114 60 128 T100 128 T140 128 T180 128 T220 128 L220 222 L20 222 Z', '#8FB0FF')
  + L('M114 126 Q120 121 126 126', W, 3.5) + L('M34 126 Q40 121 46 126', W, 3.5)
  + P('M4 150 Q26 134 48 150 T92 150 T136 150 T180 150 T224 150 L224 222 L4 222 Z', AZ)
  + L('M18 148 Q26 141 34 148', W, 4) + L('M106 148 Q114 141 122 148', W, 4) + L('M194 148 Q202 141 210 148', W, 4)
  // pez entero dentro del círculo (antes quedaba cortado por el borde)
  + P('M130 174 m-14 0 a14 9 0 1 0 28 0 a14 9 0 1 0 -28 0 Z', GOLD, 3) + P('M117 174 L105 165 L105 183 Z', GOLD, 3)
  + `<circle cx="136" cy="172" r="2" fill="${D}"/>`
  + `<circle cx="84" cy="176" r="4" fill="${W}"/><circle cx="94" cy="190" r="2.6" fill="${W}"/><circle cx="74" cy="192" r="2" fill="${W}"/>`
  + `</g>`
  + `<circle cx="110" cy="122" r="74" fill="none" stroke="${D}" stroke-width="4"/>`
  + `<circle cx="166" cy="56" r="24" fill="${GOLD}" stroke="${D}" stroke-width="4"/>`
  + `<ellipse cx="159" cy="54" rx="3.2" ry="4.2" fill="${D}"/><ellipse cx="173" cy="54" rx="3.2" ry="4.2" fill="${D}"/>`
  + `<ellipse cx="153" cy="63" rx="4" ry="2.6" fill="${PEACH}"/><ellipse cx="179" cy="63" rx="4" ry="2.6" fill="${PEACH}"/>`
  + L('M160 62 Q166 68 172 62', D, 3)
  + sparkle(34, 44, 12) + sparkle(204, 152, 9) + ring(30, 192);

// 04 모자 · sombrero de paja
{
  const crownH = 'M64 150 C62 96 84 66 110 66 C136 66 158 96 156 150 Q110 166 64 150 Z';
  ILU['모자'] = sticker([`<ellipse cx="110" cy="150" rx="86" ry="28"/>`, `<path d="${crownH}"/>`])
    + `<defs><clipPath id="clipGorro"><path d="${crownH}"/></clipPath></defs>`
    + `<ellipse cx="110" cy="150" rx="86" ry="28" fill="${GOLD}" stroke="${D}" stroke-width="4"/>`
    + L('M34 148 L48 151', GOLD2, 4) + L('M42 164 L55 160', GOLD2, 4) + L('M186 148 L172 151', GOLD2, 4) + L('M178 164 L165 160', GOLD2, 4)
    + L('M92 166 L93 174', GOLD2, 4) + L('M128 166 L127 174', GOLD2, 4)
    + P(crownH, GOLD)
    + `<g clip-path="url(#clipGorro)">${P('M30 120 Q110 142 190 120 L190 152 Q110 174 30 152 Z', AZ)}</g>`
    + `<path d="${crownH}" fill="none" stroke="${D}" stroke-width="4" stroke-linejoin="round"/>`
    + P('M142 140 L127 130 L127 150 Z', AZ2, 3) + P('M142 140 L157 130 L157 150 Z', AZ2, 3)
    + `<circle cx="142" cy="140" r="5.5" fill="${GOLD}" stroke="${D}" stroke-width="3"/>`
    + L('M90 80 L95 88', GOLD2, 4) + L('M130 80 L125 88', GOLD2, 4) + L('M110 74 L110 82', GOLD2, 4)
    + face(110, 104, 0.85)
    + sparkle(38, 58, 13) + sparkle(188, 62, 10) + ring(30, 196); // abajo a la izquierda: en (196,204) lo tapaba el botón de audio
}

// 05 빵 · pan de molde (식빵)
{
  const slice = 'M54 182 L54 100 C32 94 32 50 70 46 C86 30 134 30 150 46 C188 50 188 94 166 100 L166 182 Q166 192 156 192 L64 192 Q54 192 54 182 Z';
  const miga = 'M66 176 L66 91 C46 86 47 60 75 58 C90 45 130 45 145 58 C173 60 174 86 154 91 L154 176 Q154 180 150 180 L70 180 Q66 180 66 176 Z';
  ILU['빵'] = sticker([`<path d="${slice}"/>`])
    + P(slice, '#C98A3E')
    + `<path d="${miga}" fill="#FFE6B8" stroke="#DDA45A" stroke-width="2.5" stroke-linejoin="round"/>`
    + `<ellipse cx="84" cy="158" rx="3.5" ry="2.5" fill="#EDC27E"/><ellipse cx="138" cy="164" rx="3" ry="2" fill="#EDC27E"/>`
    + `<ellipse cx="130" cy="72" rx="3" ry="2" fill="#EDC27E"/><ellipse cx="88" cy="78" rx="2.5" ry="2" fill="#EDC27E"/><ellipse cx="142" cy="140" rx="2.5" ry="2" fill="#EDC27E"/>`
    + face(110, 120, 1)
    + sparkle(28, 30, 11) + sparkle(198, 150, 10) + sparkle(28, 162, 8) + ring(196, 28);
}

// 06 물 · vaso de agua + gota
{
  const vaso = 'M60 62 L160 62 L148 186 Q147 194 139 194 L81 194 Q73 194 72 186 Z';
  const gota = 'M178 20 C178 20 158 46 158 58 A20 20 0 0 0 198 58 C198 46 178 20 178 20 Z';
  ILU['물'] = sticker([`<path d="${vaso}"/>`, `<path d="${gota}"/>`])
    + `<defs><clipPath id="clipVaso"><path d="${vaso}"/></clipPath></defs>`
    + `<path d="${vaso}" fill="#F3F6FF"/>`
    + `<g clip-path="url(#clipVaso)">${P('M40 102 Q62 92 84 102 T128 102 T172 102 L172 200 L40 200 Z', '#9DB7FF', 3.5)}`
    + `<circle cx="92" cy="176" r="3.5" fill="${W}"/><circle cx="134" cy="182" r="2.5" fill="${W}"/><circle cx="128" cy="116" r="2.5" fill="${W}"/></g>`
    + L('M71 74 L79 172', W, 6)
    + `<path d="${vaso}" fill="none" stroke="${D}" stroke-width="4" stroke-linejoin="round"/>`
    + face(110, 140, 0.95)
    + P(gota, AZ) + L('M169 46 Q165 55 169 63', W, 4)
    + sparkle(36, 40, 12) + sparkle(28, 150, 9) + ring(196, 170);
}

// 07 책 · libro abierto
{
  const tapa = 'M26 82 L110 98 L194 82 L194 178 L110 196 L26 178 Z';
  const abajo = 'M34 76 Q72 64 110 90 Q148 64 186 76 L186 176 Q148 164 110 188 Q72 164 34 176 Z';
  const izq = 'M38 68 Q74 56 110 82 L110 180 Q74 156 38 168 Z';
  const der = 'M182 68 Q146 56 110 82 L110 180 Q146 156 182 168 Z';
  const cinta = 'M118 184 L118 208 L124 202 L130 208 L130 182 Z';
  ILU['책'] = sticker([`<path d="${tapa}"/>`, `<path d="${abajo}"/>`, `<path d="${izq}"/>`, `<path d="${der}"/>`, `<path d="${cinta}"/>`])
    + P(cinta, GOLD, 3.5)
    + P(tapa, AZ) + P(abajo, LAV) + P(izq, W) + P(der, W)
    + L('M50 80 Q74 71 98 87', '#B3B8D6', 3.5) + L('M50 94 Q74 85 98 101', '#B3B8D6', 3.5)
    + L('M170 80 Q146 71 122 87', '#B3B8D6', 3.5) + L('M170 94 Q146 85 122 101', '#B3B8D6', 3.5)
    + face(110, 130, 1)
    + sparkle(32, 34, 12) + sparkle(188, 32, 10) + ring(28, 204);
}

// 08 가방 · mochila
{
  const asa = { tail: 'M88 72 C88 40 132 40 132 72', w: 10 };
  ILU['가방'] = sticker([asa, `<rect x="54" y="64" width="112" height="130" rx="32"/>`, `<rect x="40" y="118" width="20" height="54" rx="8"/>`, `<rect x="160" y="118" width="20" height="54" rx="8"/>`])
    + L(asa.tail, D, 18) + L(asa.tail, AZ, 10)
    + `<rect x="40" y="118" width="20" height="54" rx="8" fill="#6FCFAE" stroke="${D}" stroke-width="4"/>`
    + `<rect x="160" y="118" width="20" height="54" rx="8" fill="#6FCFAE" stroke="${D}" stroke-width="4"/>`
    + `<rect x="54" y="64" width="112" height="130" rx="32" fill="#8FE3C6" stroke="${D}" stroke-width="4"/>`
    + P('M54 106 L54 96 Q54 64 86 64 L134 64 Q166 64 166 96 L166 106 Q110 122 54 106 Z', AZ)
    + `<rect x="103" y="107" width="14" height="14" rx="3" fill="${GOLD}" stroke="${D}" stroke-width="3"/>`
    + `<rect x="72" y="150" width="76" height="36" rx="13" fill="${AZ}" stroke="${D}" stroke-width="4"/>`
    + L('M82 162 L138 162', LAV, 3) + L('M130 162 L130 171', D, 3)
    + `<rect x="126" y="170" width="8" height="9" rx="2" fill="${GOLD}" stroke="${D}" stroke-width="2.5"/>`
    + face(110, 130, 0.72)
    + sparkle(30, 46, 12) + sparkle(192, 50, 10) + ring(26, 200); // abajo a la izquierda: en (196,204) lo tapaba el botón de audio
}

// 09 커피 · taza de café con vapor
{
  const taza = 'M58 98 L162 98 L154 168 Q151 188 130 188 L90 188 Q69 188 66 168 Z';
  const asaT = { tail: 'M157 118 C186 112 188 156 151 158', w: 10 };
  const vapor = ['M86 80 Q78 68 86 58 Q94 48 86 36', 'M110 78 Q102 64 110 52 Q118 40 110 26', 'M134 80 Q126 68 134 58 Q142 48 134 36'];
  ILU['커피'] = vapor.map(d => L(d, D, 13) + L(d, W, 6)).join('')
    + sticker([`<ellipse cx="110" cy="190" rx="78" ry="14"/>`, asaT, `<path d="${taza}"/>`])
    + `<ellipse cx="110" cy="190" rx="78" ry="14" fill="${W}" stroke="${D}" stroke-width="4"/>`
    + `<ellipse cx="110" cy="188" rx="50" ry="7" fill="${LAV}"/>`
    + L(asaT.tail, D, 18) + L(asaT.tail, W, 10)
    + P(taza, W)
    + P('M63.9 150 L156.1 150 L154 168 Q151 188 130 188 L90 188 Q69 188 66 168 Z', AZ)
    + `<circle cx="86" cy="168" r="3.2" fill="${GOLD}"/><circle cx="110" cy="171" r="3.2" fill="${GOLD}"/><circle cx="134" cy="168" r="3.2" fill="${GOLD}"/>`
    + `<ellipse cx="110" cy="98" rx="52" ry="11" fill="#6E4424" stroke="${D}" stroke-width="4"/>`
    + `<ellipse cx="102" cy="96" rx="28" ry="4.2" fill="#A0703F"/>`
    + face(110, 124, 0.85)
    + sparkle(30, 60, 12) + sparkle(194, 40, 10) + ring(198, 86);
}

// 10 우산 · paraguas con gotas de lluvia
{
  const copa = 'M28 114 C28 62 66 32 110 32 C154 32 192 62 192 114 Q171.5 100 151 114 Q130.5 100 110 114 Q89.5 100 69 114 Q48.5 100 28 114 Z';
  const baston = { tail: 'M110 110 L110 176 Q110 196 94 196 Q80 196 80 182', w: 8 };
  ILU['우산'] = sticker([baston, `<path d="${copa}"/>`, `<circle cx="110" cy="25" r="7"/>`])
    + L(baston.tail, D, 16) + L(baston.tail, GOLD, 8)
    + `<circle cx="110" cy="25" r="7" fill="${GOLD}" stroke="${D}" stroke-width="3.5"/>`
    + P(copa, AZ)
    + `<path d="M110 32 Q76 50 69 114 Q89.5 100 110 114 Q130.5 100 151 114 Q144 50 110 32 Z" fill="${LAV}"/>`
    + L('M110 32 Q76 50 69 114', D, 3.5) + L('M110 32 Q144 50 151 114', D, 3.5) + L('M110 32 L110 114', D, 3.5)
    + `<path d="${copa}" fill="none" stroke="${D}" stroke-width="4" stroke-linejoin="round"/>`
    + face(110, 76, 0.85)
    + drop(34, 138, 0.8, '#8FB0FF') + drop(188, 140, 0.8, '#8FB0FF') + drop(44, 176, 0.65, '#8FB0FF') + drop(172, 178, 0.65, '#8FB0FF')
    + sparkle(24, 32, 10) + sparkle(198, 30, 10);
}

// 11 고양이 · gato (idéntico al prototipo aprobado)
ILU['고양이'] = `
<g transform="translate(6 7)" opacity="0.28" fill="${D}" stroke="${D}" stroke-width="24" stroke-linejoin="round" stroke-linecap="round">
<path d="M128 184 C170 190 192 158 178 132" fill="none" stroke-width="44"/><path d="M58 74 L62 28 L94 54 Z"/><path d="M142 74 L138 28 L106 54 Z"/><ellipse cx="100" cy="92" rx="52" ry="44"/><path d="M62 192 C56 156 72 124 100 124 C128 124 144 156 138 192 Z"/><ellipse cx="86" cy="190" rx="13" ry="8.5"/><ellipse cx="114" cy="190" rx="13" ry="8.5"/></g>
<g fill="${D}" stroke="${D}" stroke-width="24" stroke-linejoin="round" stroke-linecap="round">
<path d="M128 184 C170 190 192 158 178 132" fill="none" stroke-width="44"/><path d="M58 74 L62 28 L94 54 Z"/><path d="M142 74 L138 28 L106 54 Z"/><ellipse cx="100" cy="92" rx="52" ry="44"/><path d="M62 192 C56 156 72 124 100 124 C128 124 144 156 138 192 Z"/><ellipse cx="86" cy="190" rx="13" ry="8.5"/><ellipse cx="114" cy="190" rx="13" ry="8.5"/></g>
<g fill="${W}" stroke="${W}" stroke-width="17" stroke-linejoin="round" stroke-linecap="round">
<path d="M128 184 C170 190 192 158 178 132" fill="none" stroke-width="37"/><path d="M58 74 L62 28 L94 54 Z"/><path d="M142 74 L138 28 L106 54 Z"/><ellipse cx="100" cy="92" rx="52" ry="44"/><path d="M62 192 C56 156 72 124 100 124 C128 124 144 156 138 192 Z"/><ellipse cx="86" cy="190" rx="13" ry="8.5"/><ellipse cx="114" cy="190" rx="13" ry="8.5"/></g>
<path d="M128 184 C170 190 192 158 178 132" fill="none" stroke="${D}" stroke-width="24" stroke-linecap="round"/>
<path d="M128 184 C170 190 192 158 178 132" fill="none" stroke="${GOLD}" stroke-width="16" stroke-linecap="round"/>
<path d="M173.2 160.6 L183.8 166" stroke="${GOLD2}" stroke-width="4" stroke-linecap="round"/>
<path d="M176 144.7 L187.8 143.2" stroke="${GOLD2}" stroke-width="4" stroke-linecap="round"/>
<path d="M62 192 C56 156 72 124 100 124 C128 124 144 156 138 192 Z" fill="${GOLD}" stroke="${D}" stroke-width="4" stroke-linejoin="round"/>
<ellipse cx="100" cy="166" rx="20" ry="22" fill="${CREAM}"/>
<path d="M66 152 Q74 150 78 156" stroke="${GOLD2}" stroke-width="4" stroke-linecap="round" fill="none"/>
<path d="M64 168 Q72 166 76 172" stroke="${GOLD2}" stroke-width="4" stroke-linecap="round" fill="none"/>
<path d="M134 152 Q126 150 122 156" stroke="${GOLD2}" stroke-width="4" stroke-linecap="round" fill="none"/>
<path d="M136 168 Q128 166 124 172" stroke="${GOLD2}" stroke-width="4" stroke-linecap="round" fill="none"/>
<ellipse cx="86" cy="190" rx="13" ry="8.5" fill="${CREAM}" stroke="${D}" stroke-width="4"/>
<ellipse cx="114" cy="190" rx="13" ry="8.5" fill="${CREAM}" stroke="${D}" stroke-width="4"/>
<path d="M82 191 L82 196.5" stroke="${D}" stroke-width="2.6" stroke-linecap="round"/>
<path d="M90 191 L90 196.5" stroke="${D}" stroke-width="2.6" stroke-linecap="round"/>
<path d="M110 191 L110 196.5" stroke="${D}" stroke-width="2.6" stroke-linecap="round"/>
<path d="M118 191 L118 196.5" stroke="${D}" stroke-width="2.6" stroke-linecap="round"/>
<path d="M58 74 L62 28 L94 54 Z" fill="${GOLD}" stroke="${D}" stroke-width="4" stroke-linejoin="round"/>
<path d="M142 74 L138 28 L106 54 Z" fill="${GOLD}" stroke="${D}" stroke-width="4" stroke-linejoin="round"/>
<path d="M66 64 L68 38 L86 52 Z" fill="#FFC59E"/>
<path d="M134 64 L132 38 L114 52 Z" fill="#FFC59E"/>
<ellipse cx="100" cy="92" rx="52" ry="44" fill="${GOLD}" stroke="${D}" stroke-width="4"/>
<path d="M100 51 L100 63" stroke="${GOLD2}" stroke-width="4.5" stroke-linecap="round"/>
<path d="M88 53 L90 63" stroke="${GOLD2}" stroke-width="4.5" stroke-linecap="round"/>
<path d="M112 53 L110 63" stroke="${GOLD2}" stroke-width="4.5" stroke-linecap="round"/>
<ellipse cx="100" cy="110" rx="20" ry="13" fill="${CREAM}"/>
<ellipse cx="70" cy="106" rx="8" ry="5" fill="${PEACH}"/>
<ellipse cx="130" cy="106" rx="8" ry="5" fill="${PEACH}"/>
<ellipse cx="82" cy="92" rx="8" ry="10.5" fill="${D}"/>
<ellipse cx="118" cy="92" rx="8" ry="10.5" fill="${D}"/>
<circle cx="85" cy="87.5" r="3.2" fill="${W}"/>
<circle cx="121" cy="87.5" r="3.2" fill="${W}"/>
<circle cx="79.5" cy="97" r="1.6" fill="${W}"/>
<circle cx="115.5" cy="97" r="1.6" fill="${W}"/>
<path d="M95 104 L105 104 L100 110 Z" fill="${D}" stroke="${D}" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M100 110 L100 114" stroke="${D}" stroke-width="3.2" stroke-linecap="round"/>
<path d="M91 113 Q95.5 120 100 114 Q104.5 120 109 113" stroke="${D}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M58 101 L44 96" stroke="${D}" stroke-width="3.2" stroke-linecap="round"/>
<path d="M58 109 L42 111" stroke="${D}" stroke-width="3.2" stroke-linecap="round"/>
<path d="M142 101 L156 96" stroke="${D}" stroke-width="3.2" stroke-linecap="round"/>
<path d="M142 109 L158 111" stroke="${D}" stroke-width="3.2" stroke-linecap="round"/>
${sparkle(186, 48, 11)}${sparkle(28, 160, 10)}${ring(36, 52)}`;

// 12 강아지 · perrito de orejas caídas con collar
{
  const TAN = '#D9A35F';
  const cola = { tail: 'M132 178 C162 180 178 156 170 134', w: 16 };
  const orejaI = 'M62 66 C44 66 32 100 40 126 C46 140 64 132 68 112 Z';
  const orejaD = 'M138 66 C156 66 168 100 160 126 C154 140 136 132 132 112 Z';
  const cuerpo = 'M62 192 C56 156 72 124 100 124 C128 124 144 156 138 192 Z';
  ILU['강아지'] = sticker([cola, `<path d="${orejaI}"/>`, `<path d="${orejaD}"/>`, `<ellipse cx="100" cy="94" rx="52" ry="42"/>`, `<path d="${cuerpo}"/>`, `<ellipse cx="86" cy="190" rx="13" ry="8.5"/>`, `<ellipse cx="114" cy="190" rx="13" ry="8.5"/>`])
    + L(cola.tail, D, 24) + L(cola.tail, CREAM, 16) + L('M168 140 Q172 136 170 132', TAN, 6)
    + P(cuerpo, CREAM)
    + `<ellipse cx="100" cy="168" rx="18" ry="20" fill="${W}"/>`
    + `<ellipse cx="86" cy="190" rx="13" ry="8.5" fill="${W}" stroke="${D}" stroke-width="4"/><ellipse cx="114" cy="190" rx="13" ry="8.5" fill="${W}" stroke="${D}" stroke-width="4"/>`
    + L('M82 191 L82 196.5', D, 2.6) + L('M90 191 L90 196.5', D, 2.6) + L('M110 191 L110 196.5', D, 2.6) + L('M118 191 L118 196.5', D, 2.6)
    + `<ellipse cx="100" cy="94" rx="52" ry="42" fill="${CREAM}" stroke="${D}" stroke-width="4"/>`
    + `<ellipse cx="119" cy="89" rx="15" ry="14" fill="${TAN}"/>`
    + P(orejaI, TAN) + P(orejaD, TAN)
    + L('M100 58 Q104 52 110 54', D, 3)
    + `<ellipse cx="100" cy="114" rx="22" ry="15" fill="${W}"/>`
    + `<ellipse cx="75" cy="106" rx="6.5" ry="4.2" fill="${PEACH}"/><ellipse cx="125" cy="106" rx="6.5" ry="4.2" fill="${PEACH}"/>`
    + `<ellipse cx="83" cy="91" rx="7.5" ry="9.5" fill="${D}"/><ellipse cx="117" cy="91" rx="7.5" ry="9.5" fill="${D}"/>`
    + `<circle cx="86" cy="86.8" r="3" fill="${W}"/><circle cx="120" cy="86.8" r="3" fill="${W}"/><circle cx="80.8" cy="95.5" r="1.5" fill="${W}"/><circle cx="114.8" cy="95.5" r="1.5" fill="${W}"/>`
    + `<path d="M92 105 Q100 100 108 105 Q106 111 100 112 Q94 111 92 105 Z" fill="${D}" stroke="${D}" stroke-width="2" stroke-linejoin="round"/>`
    + `<circle cx="97.5" cy="104" r="1.6" fill="${W}"/>`
    + L('M100 112 L100 116', D, 3.2) + L('M91 115 Q95.5 122 100 116 Q104.5 122 109 115', D, 3.2)
    + L('M74 140 Q100 152 126 140', D, 11) + L('M74 140 Q100 152 126 140', AZ, 5)
    + `<circle cx="100" cy="153" r="6" fill="${GOLD}" stroke="${D}" stroke-width="3"/>`
    + sparkle(188, 42, 11) + sparkle(26, 176, 9) + ring(38, 38);
}

// ---------- Iconos ----------
const ICON_AUDIO = `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="${D}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9.5 L7.5 9.5 L12.5 5.5 L12.5 18.5 L7.5 14.5 L4 14.5 Z" fill="${W}"/><path d="M16 9.2 C17.2 10.6 17.2 13.4 16 14.8"/><path d="M18.8 6.6 C21.4 9.6 21.4 14.4 18.8 17.4"/></svg>`;
const ICON_AUDIO_MINI = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${D}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9.5 L7.5 9.5 L12.5 5.5 L12.5 18.5 L7.5 14.5 L4 14.5 Z" fill="${GOLD}"/><path d="M16 9.2 C17.2 10.6 17.2 13.4 16 14.8"/><path d="M18.8 6.6 C21.4 9.6 21.4 14.4 18.8 17.4"/></svg>`;
const ICON_FLECHA = `<svg width="16" height="14" viewBox="0 0 16 14" fill="none" stroke="#3A3D55" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 7 L13 7"/><path d="M9 3 L13 7 L9 11"/></svg>`;
const ICON_ESTRELLA = `<svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 Q13.6 10.4 22 12 Q13.6 13.6 12 22 Q10.4 13.6 2 12 Q10.4 10.4 12 2 Z" fill="${AZ}"/></svg>`;
const ONDA = `<svg width="93" height="16" viewBox="0 0 93 16" fill="none" aria-hidden="true"><path d="M3 8 Q10.25 0 17.5 8 T32 8 T46.5 8 T61 8 T75.5 8 T90 8" stroke="${D}" stroke-width="3.5" stroke-linecap="round"/></svg>`;

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const nn = n => String(n).padStart(2, '0');

// ---------- Caras ----------
function anverso(p) {
  const c = CAT[p.categoria];
  const sil = [...p.kr].length;
  const fs = sil === 1 ? 108 : sil === 2 ? 96 : 80;
  return `<div class="card front">
  <div class="panel" style="background-color:${c.bg}">
    <span class="num">${nn(p.n)}/12</span>
    <svg class="ilu" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(p.es)}">${ILU[p.kr]}</svg>
    <div class="audio">${ICON_AUDIO}</div>
  </div>
  <div class="hangul" lang="ko" style="font-size:${fs}px">${esc(p.kr)}</div>
</div>`;
}
function reverso(p, qr) {
  const c = CAT[p.categoria];
  const ej = esc(p.ejemplo_kr).replace(esc(p.kr), `<span class="hl">${esc(p.kr)}</span>`);
  return `<div class="card back">
  <div class="top"><span class="pill" style="background:${c.bg}">${esc(p.categoria)}</span><span class="n">${nn(p.n)}</span></div>
  <div class="kr"><b lang="ko">${esc(p.kr)}</b><span class="rom">${esc(p.rom)}</span></div>
  <div class="es"><span style="background:linear-gradient(${c.bg},${c.bg}) left bottom / 100% 40% no-repeat">${esc(p.es)}</span></div>
  <div class="spacer">${ONDA}</div>
  <div class="bubble" style="background:${c.tint}">
    <svg class="tail" width="28" height="20" viewBox="0 0 28 20" fill="none" aria-hidden="true"><path d="M2 20 L10 2 L26 20 Z" fill="${c.tint}"/><path d="M3.33 17 L10 2 L23.33 17" stroke="${D}" stroke-width="3" stroke-linejoin="round"/></svg>
    <div class="ej-kr" lang="ko">${ej}</div>
    <div class="ej-es">${ICON_FLECHA}<span>${esc(p.ejemplo_es)}</span></div>
  </div>
  <div class="foot">
    <div class="meta">
      <span class="semana">Básico 1 · Semana ${p.semana}</span>
      <span class="marca">${ICON_ESTRELLA}Academia Seúl</span>
    </div>
    <div class="qr">
      <div class="marco">${qr}</div>
      <span class="cap">${ICON_AUDIO_MINI}Escúchala</span>
    </div>
  </div>
</div>`;
}

// ---------- Marcas de corte ----------
const PW = 816, PH = 1056, CW = 336, CH = 456, GAP = 24;
const X0 = (PW - 2 * CW - GAP) / 2, Y0 = (PH - 2 * CH - GAP) / 2; // 60, 60
const COLX = [X0, X0 + CW + GAP], ROWY = [Y0, Y0 + CH + GAP];
function marcas() {
  const OFF = 3, LEN = 8; let s = '';
  for (const x of COLX) for (const y of ROWY) for (const [cx, dx] of [[x, -1], [x + CW, 1]]) for (const [cy, dy] of [[y, -1], [y + CH, 1]]) {
    s += `<line x1="${cx + dx * OFF}" y1="${cy}" x2="${cx + dx * (OFF + LEN)}" y2="${cy}"/>`;
    s += `<line x1="${cx}" y1="${cy + dy * OFF}" x2="${cx}" y2="${cy + dy * (OFF + LEN)}"/>`;
  }
  return `<svg class="marks" width="${PW}" height="${PH}" viewBox="0 0 ${PW} ${PH}" aria-hidden="true"><g stroke="#8A8FA8" stroke-width="0.75" stroke-linecap="butt">${s}</g></svg>`;
}

async function construir() {
  const palabras = JSON.parse(fs.readFileSync(DATOS, 'utf8'));
  for (const p of palabras) if (!ILU[p.kr]) throw new Error('Falta ilustración: ' + p.kr);
  const qrs = {};
  for (const p of palabras) {
    let svg = await QR.toString(p.audio, { type: 'svg', margin: 4, errorCorrectionLevel: 'M', color: { dark: NAVY + 'ff', light: '#ffffffff' } });
    svg = svg.replace('<svg ', `<svg width="76" height="76" role="img" aria-label="QR audio ${esc(p.kr)}" `);
    qrs[p.n] = svg;
  }
  let paginas = '';
  for (let g = 0; g < 3; g++) {
    const grupo = palabras.slice(g * 4, g * 4 + 4);
    // Anversos: [1 2 / 3 4]
    let fr = '', bk = '';
    grupo.forEach((p, i) => {
      const col = i % 2, row = Math.floor(i / 2);
      fr += `<div class="cell" data-cara="f" data-n="${p.n}" style="left:${COLX[col]}px;top:${ROWY[row]}px">${anverso(p)}</div>`;
      // Reversos: columnas invertidas para dúplex por el borde largo
      bk += `<div class="cell" data-cara="b" data-n="${p.n}" style="left:${COLX[1 - col]}px;top:${ROWY[row]}px">${reverso(p, qrs[p.n])}</div>`;
    });
    paginas += `<section class="page" aria-label="Anversos ${grupo[0].n}–${grupo[grupo.length - 1].n}">${marcas()}${fr}</section>\n`;
    paginas += `<section class="page" aria-label="Reversos ${grupo[0].n}–${grupo[grupo.length - 1].n}">${marcas()}${bk}</section>\n`;
  }

  const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Flashcards Básico 1 · Sticker pop</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Fredoka:wght@400;500;600;700&family=Jua&display=swap" rel="stylesheet">
<style>
@page { size: letter; margin: 0 }
* { box-sizing: border-box }
html, body { margin: 0; padding: 0 }
body { background: #E9ECF5; font-family: 'Fredoka', 'Jua', sans-serif; color: ${D}; -webkit-print-color-adjust: exact; print-color-adjust: exact }
.page { position: relative; width: ${PW}px; height: ${PH}px; margin: 24px auto; background: #fff; overflow: hidden; box-shadow: 0 2px 14px rgba(20,20,43,.18) }
.page:not(:last-of-type) { break-after: page; page-break-after: always }
@media print { body { background: #fff } .page { margin: 0; box-shadow: none } }
.marks { position: absolute; left: 0; top: 0 }
.cell { position: absolute; width: ${CW}px; height: ${CH}px }
.card { position: absolute; left: 6px; top: 6px; width: 318px; height: 438px; border: 4px solid ${D}; border-radius: 28px; box-shadow: 6px 6px 0 ${D} }

/* ANVERSO */
.front { background: ${AZ}; padding: 14px; display: flex; flex-direction: column; gap: 14px }
.panel { position: relative; height: 268px; flex: none; border: 3.5px solid ${D}; border-radius: 22px;
  background-image: radial-gradient(rgba(20,20,43,.14) 1.6px, transparent 1.9px); background-size: 13px 13px;
  display: flex; align-items: center; justify-content: center }
.ilu { width: 240px; height: 240px; display: block }
.num { position: absolute; top: -13px; left: 14px; height: 26px; padding: 0 10px; border: 2.5px solid ${D}; border-radius: 999px; background: #fff;
  display: inline-flex; align-items: center; font: 700 13px/1 'Fredoka', sans-serif; letter-spacing: .5px; color: ${D} }
.audio { position: absolute; right: 14px; bottom: -24px; width: 58px; height: 58px; border-radius: 50%; background: ${GOLD};
  border: 3.5px solid ${D}; box-shadow: 4px 4px 0 ${D}; display: flex; align-items: center; justify-content: center }
.hangul { flex: 1; min-height: 0; display: flex; align-items: center; justify-content: center; padding-top: 18px;
  font-family: 'Black Han Sans', sans-serif; line-height: 1; letter-spacing: 2px; color: #fff; text-shadow: 4px 4px 0 ${D}; white-space: nowrap }

/* REVERSO */
.back { background: #fff; padding: 18px 20px 16px; display: flex; flex-direction: column }
.back > * { flex: none }
.top { display: flex; align-items: center; justify-content: space-between }
.pill { display: inline-flex; align-items: center; height: 30px; padding: 0 12px; border: 2.5px solid ${D}; border-radius: 999px;
  font: 600 13px/1 'Fredoka', sans-serif; color: ${D} }
.n { width: 34px; height: 34px; border: 2.5px solid ${D}; border-radius: 50%; background: #fff; display: flex; align-items: center; justify-content: center;
  font: 700 13px/1 'Fredoka', sans-serif; color: ${D} }
.kr { display: flex; align-items: baseline; gap: 10px; margin-top: 16px }
.kr b { font-family: 'Black Han Sans', sans-serif; font-weight: 400; font-size: 46px; line-height: 1; color: ${AZ} }
.rom { font: 500 15px/1 'Fredoka', sans-serif; letter-spacing: .5px; color: #5E6280 }
.es { margin-top: 10px; font-family: 'Fredoka', sans-serif; font-weight: 700; font-size: 60px; line-height: 1.02; color: ${D}; white-space: nowrap }
.es span { padding: 0 6px; margin-left: -6px; border-radius: 8px; -webkit-box-decoration-break: clone; box-decoration-break: clone }
.back > .spacer { flex: 1 1 auto; min-height: 24px; display: flex; align-items: center; justify-content: flex-end; padding-right: 6px; overflow: hidden }
.bubble { position: relative; border: 3px solid ${D}; border-radius: 18px; box-shadow: 4px 4px 0 ${D}; padding: 10px 14px; display: flex; flex-direction: column; gap: 3px }
.bubble .tail { position: absolute; top: -19px; left: 20px }
.ej-kr { font-family: 'Jua', sans-serif; font-size: 22px; line-height: 1.25; color: ${D}; white-space: nowrap }
.ej-kr .hl { color: ${AZ} }
.ej-es { display: flex; align-items: flex-start; gap: 6px; font: 500 15px/1.25 'Fredoka', sans-serif; color: #3A3D55 }
.ej-es svg { flex: none; margin-top: 3px }
.foot { display: flex; align-items: flex-end; justify-content: space-between; margin-top: 14px }
.meta { display: flex; flex-direction: column; gap: 6px; padding-bottom: 4px }
.semana { font: 600 13px/1.1 'Fredoka', sans-serif; color: #3A3D55 }
.marca { display: flex; align-items: center; gap: 6px; font: 600 12px/1 'Fredoka', sans-serif; letter-spacing: .3px; color: #5E6280 }
.qr { display: flex; flex-direction: column; align-items: center; gap: 4px }
.marco { width: 81px; height: 81px; border: 2.5px solid ${D}; border-radius: 10px; background: #fff; overflow: hidden; display: flex; align-items: center; justify-content: center }
.marco svg { display: block }
.cap { display: flex; align-items: center; gap: 4px; font: 600 11.5px/1 'Fredoka', sans-serif; color: ${D} }

/* Hoja de contacto (tarjetas.html#contacto) */
#contacto { width: 1106px; padding: 22px 24px 26px; background: #F4F7FF }
#contacto h1 { margin: 0 0 4px; font: 700 22px 'Fredoka', sans-serif; color: ${D} }
#contacto h2 { margin: 16px 0 8px; font: 600 15px 'Fredoka', sans-serif; color: #3A3D55 }
#contacto .grid { display: grid; grid-template-columns: repeat(6, ${CW}px); gap: 20px; zoom: .5 }
#contacto .cell { position: relative !important; left: auto !important; top: auto !important }
body.modo-contacto { background: #F4F7FF; width: 1106px }
</style>
</head>
<body>
${paginas}<script>
(async function () {
  try {
    await Promise.all([
      document.fonts.load('96px "Black Han Sans"', '우유나무바다모자빵물책가방커피우산고양이강아지'),
      document.fonts.load('22px "Jua"', '를마셔요공원에가있어이거예빵을좋아해물이책읽어방안매일커피산디고양우리강아지?.'),
      document.fonts.load('700 60px "Fredoka"', 'leche árbol'), document.fonts.load('600 13px "Fredoka"', 'Básico'),
      document.fonts.load('500 15px "Fredoka"', 'Tomo'),
    ]);
  } catch (e) {}
  await document.fonts.ready;
  for (const b of document.querySelectorAll('.back')) {
    const es = b.querySelector('.es'), sp = es.querySelector('span');
    const cabe = () => sp.getBoundingClientRect().right <= es.getBoundingClientRect().right + 1;
    let s = 60; es.style.fontSize = s + 'px';
    while (!cabe() && s > 44) { s -= 2; es.style.fontSize = s + 'px'; }
    if (!cabe()) { es.style.whiteSpace = 'normal'; s = 46; es.style.fontSize = s + 'px'; }
    const ek = b.querySelector('.ej-kr'); let k = 22; ek.style.fontSize = k + 'px';
    while (ek.scrollWidth > ek.clientWidth && k > 16) { k -= 0.5; ek.style.fontSize = k + 'px'; }
    // si el reverso no cabe (el pie pasa el padding inferior), achica el significado
    const ft = b.querySelector('.foot');
    const cabeAlto = () => ft.getBoundingClientRect().bottom <= b.getBoundingClientRect().bottom - 4 - 16 + 0.5;
    while (!cabeAlto() && s > 30) { s -= 2; es.style.fontSize = s + 'px'; }
    b.dataset.es = s;
  }
  if (location.hash === '#contacto') {
    const c = document.createElement('div'); c.id = 'contacto';
    c.innerHTML = '<h1>Flashcards Básico 1 · A · Sticker pop</h1><h2>Anversos 01–12</h2><div class="grid" id="gF"></div><h2>Reversos 01–12</h2><div class="grid" id="gB"></div>';
    const gF = c.querySelector('#gF'), gB = c.querySelector('#gB');
    for (let n = 1; n <= 12; n++) {
      gF.appendChild(document.querySelector('.cell[data-cara="f"][data-n="' + n + '"]').cloneNode(true));
      gB.appendChild(document.querySelector('.cell[data-cara="b"][data-n="' + n + '"]').cloneNode(true));
    }
    document.querySelectorAll('.page').forEach(p => p.remove());
    document.body.prepend(c); document.body.classList.add('modo-contacto');
  }
  window.__listo = true;
})();
</script>
</body>
</html>
`;
  fs.writeFileSync(HTML, html, 'utf8');
  return palabras;
}

async function renderizar() {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox', '--disable-lcd-text'] });
  try {
    const url = 'file:///' + HTML.replace(/\\/g, '/');
    const page = await browser.newPage();
    await page.setViewport({ width: 900, height: 1200, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 90000 });
    await page.evaluateHandle('document.fonts.ready');
    await page.waitForFunction('window.__listo === true', { timeout: 60000 });
    await page.emulateMediaType('print');
    await page.pdf({ path: PDF, format: 'letter', printBackground: true, preferCSSPageSize: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });

    const p2 = await browser.newPage();
    await p2.setViewport({ width: 1106, height: 900, deviceScaleFactor: 1.5 });
    await p2.goto(url + '#contacto', { waitUntil: 'networkidle0', timeout: 90000 });
    await p2.evaluateHandle('document.fonts.ready');
    await p2.waitForFunction('window.__listo === true', { timeout: 60000 });
    const el = await p2.$('#contacto');
    await el.screenshot({ path: PNG });
  } finally {
    await browser.close();
  }
}

(async () => {
  await construir();
  console.log('HTML  ', HTML);
  await renderizar();
  console.log('PDF   ', PDF, (fs.statSync(PDF).size / 1024).toFixed(0) + ' KB');
  console.log('PNG   ', PNG, (fs.statSync(PNG).size / 1024).toFixed(0) + ' KB');
})().catch(e => { console.error(e); process.exit(1); });
