// make.js · Flashcards Básico 1 · Estilo B "Webtoon"
// 1) Arma tarjetas.html desde ../palabras.json (ilustraciones SVG + QR del audio).
// 2) Con puppeteer-core abre tarjetas.html, espera las fuentes y genera
//    Flashcards_Basico1_B_Webtoon.pdf (carta, 6 páginas, doble cara por borde largo)
//    y vista_previa.png (hoja de contacto: 12 anversos + 12 reversos).
// Uso:  node make.js            (arma el HTML y renderiza)
//       node make.js --solo-pdf (renderiza el tarjetas.html que ya existe, sin rearmarlo)
'use strict';
const fs = require('fs');
const path = require('path');
const SCR = 'C:/Users/Chingu/AppData/Local/Temp/claude/C--Users-Chingu-Desktop-ACADEMIASEULWEB/d4111e1b-5523-44ea-97b2-b1a1d9545b9e/scratchpad';
const req = require('module').createRequire(SCR + '/package.json');
const QR = req('qrcode');
const puppeteer = req('puppeteer-core');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const DIR = __dirname;
const DATOS = path.join(DIR, '..', 'palabras.json');
const HTML = path.join(DIR, 'tarjetas.html');
const PDF = path.join(DIR, 'Flashcards_Basico1_B_Webtoon.pdf');
const PNG = path.join(DIR, 'vista_previa.png');

// ---------- Paleta (sin rojo ni rosado; texto >= 4.5:1 sobre blanco) ----------
const K = '#111111', W = '#FFFFFF', G = '#E8B84B', P = '#F5BE86', CAFE = '#4A3A2C', NAVY = '#003478';
const COLOR = {
  'Comida y bebida': '#4236F6', // azul de la marca (6.8:1)
  'Naturaleza': '#0F7B45',      // verde (5.3:1)
  'Objetos': '#7B2FBE',         // violeta (7.0:1)
  'Animales': '#9C6100',        // ocre (5.1:1)
};

const pad = (n) => String(n).padStart(2, '0');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const f = (v) => Math.round(v * 10) / 10;
const sw = (w) => `stroke="${K}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;

// ---------- Piezas del lenguaje visual Webtoon ----------
function fondo(id) {
  return `<defs>
<pattern id="${id}-dots" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><circle cx="4.5" cy="4.5" r="1.9" fill="currentColor"/></pattern>
<pattern id="${id}-tone" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><circle cx="2.5" cy="2.5" r="1.2" fill="${K}"/></pattern>
<pattern id="${id}-acc" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><circle cx="3" cy="3" r="1.6" fill="currentColor"/></pattern>
</defs>
<rect x="-7" y="0" width="282" height="266" fill="${W}"/>
<rect x="-7" y="0" width="282" height="266" fill="url(#${id}-dots)" opacity="0.3"/>`;
}
// Cara: ojos negros con brillo, cejas, mejillas durazno y boca abierta (igual que el prototipo)
function cara(cx, cy, s = 1, o = {}) {
  const dx = (o.dx || 15) * s, rx = 7 * s, ry = 9 * s, cd = (o.dx || 15) + 12;
  let t = '';
  if (o.cejas !== false) t += `<path d="M${f(cx - dx - 6 * s)} ${f(cy - 14 * s)} Q ${f(cx - dx)} ${f(cy - 19 * s)} ${f(cx - dx + 6 * s)} ${f(cy - 14 * s)} M${f(cx + dx - 6 * s)} ${f(cy - 14 * s)} Q ${f(cx + dx)} ${f(cy - 19 * s)} ${f(cx + dx + 6 * s)} ${f(cy - 14 * s)}" fill="none" stroke="${K}" stroke-width="${f(2.5 * s)}" stroke-linecap="round"/>`;
  for (const sx of [-1, 1]) {
    const ex = cx + sx * dx;
    t += `<ellipse cx="${f(ex)}" cy="${f(cy)}" rx="${f(rx)}" ry="${f(ry)}" fill="${K}"/>`;
    t += `<circle cx="${f(ex - 2.5 * s)}" cy="${f(cy - 4 * s)}" r="${f(2.6 * s)}" fill="${W}"/><circle cx="${f(ex + 2.5 * s)}" cy="${f(cy + 4 * s)}" r="${f(1.2 * s)}" fill="${W}"/>`;
    t += `<ellipse cx="${f(cx + sx * cd * s)}" cy="${f(cy + 16 * s)}" rx="${f(8 * s)}" ry="${f(4.5 * s)}" fill="${P}"/>`;
  }
  t += `<path d="M${f(cx - 9 * s)} ${f(cy + 14 * s)} Q ${f(cx)} ${f(cy + 28 * s)} ${f(cx + 9 * s)} ${f(cy + 14 * s)} Z" fill="${K}" stroke="${K}" stroke-width="${f(2 * s)}" stroke-linejoin="round"/>`;
  return t;
}
const chispa = (x, y, s = 1) => `<path d="M0 -10 L2.4 -2.4 L10 0 L2.4 2.4 L0 10 L-2.4 2.4 L-10 0 L-2.4 -2.4 Z" transform="translate(${x} ${y}) scale(${s})" fill="${G}" stroke="${K}" stroke-width="1.8" stroke-linejoin="round"/>`;
const gota = (x, y, rot = 0, s = 1) => `<path d="M0 -9 C 5 -2, 7 2, 5 5 C 3 8.5, -3 8.5, -5 5 C -7 2, -5 -2, 0 -9 Z" transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" fill="${W}" stroke="${K}" stroke-width="2.2" stroke-linejoin="round"/>`;
const burbuja = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${W}" stroke="${K}" stroke-width="2"/>`;
function ono(txt, x, y, rot, size) {
  return `<g transform="translate(${x} ${y}) rotate(${rot})"><text x="4" y="4" font-family="Black Han Sans, sans-serif" font-size="${size}" fill="currentColor" stroke="currentColor" stroke-width="8" stroke-linejoin="round">${txt}</text><text x="0" y="0" font-family="Black Han Sans, sans-serif" font-size="${size}" fill="${W}" stroke="${K}" stroke-width="8" stroke-linejoin="round" paint-order="stroke">${txt}</text></g>`;
}
// Líneas de concentración (집중선)
function rafaga(cx, cy, r1, r2, n = 24) {
  let tri = '', lin = '';
  for (let i = 0; i < n; i++) {
    const a = i * 2 * Math.PI / n, r = i % 2 ? r2 : r1;
    const ix = cx + Math.cos(a) * r, iy = cy + Math.sin(a) * r;
    const ox = cx + Math.cos(a) * 240, oy = cy + Math.sin(a) * 240;
    const px = -Math.sin(a) * 4.5, py = Math.cos(a) * 4.5;
    tri += `M${f(ix)} ${f(iy)} L${f(ox + px)} ${f(oy + py)} L${f(ox - px)} ${f(oy - py)} Z `;
    const b = a + Math.PI / n, rr = r1 + 30;
    lin += `M${f(cx + Math.cos(b) * rr)} ${f(cy + Math.sin(b) * rr)} L${f(cx + Math.cos(b) * 240)} ${f(cy + Math.sin(b) * 240)} `;
  }
  return `<path d="${tri}" fill="${K}"/><path d="${lin}" fill="none" stroke="${K}" stroke-width="1.6"/>`;
}
// Unión de círculos con contorno (nubes, copa del árbol, espuma)
function union(c, borde, relleno, extra = '') {
  return c.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r + borde}" fill="${K}"/>`).join('') +
    c.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${relleno}"/>`).join('') + extra;
}
const sombra = (id, cx, cy, rx, ry) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#${id}-tone)" opacity="0.5"/>`;
const hojita = (x, y, rot, s = 1) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M0 -11 C 8 -5, 8 5, 0 11 C -8 5, -8 -5, 0 -11 Z" fill="currentColor" ${sw(2)}/><path d="M0 -7 L0 7" stroke="${W}" stroke-width="1.6" stroke-linecap="round"/></g>`;
const fruta = (x, y) => `<circle cx="${x}" cy="${y}" r="7.5" fill="${G}" ${sw(2.2)}/><circle cx="${x - 2.5}" cy="${y - 2.5}" r="2" fill="${W}"/><path d="M${x} ${y - 7} L${x + 2} ${y - 11}" ${sw(2)}/>`;
const nota = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M6 -16 L6 6 M6 -16 L18 -20 L18 2" fill="none" ${sw(2.6)}/><ellipse cx="2" cy="7" rx="5.5" ry="4.2" fill="${K}" transform="rotate(-20 2 7)"/><ellipse cx="14" cy="3" rx="5.5" ry="4.2" fill="${K}" transform="rotate(-20 14 3)"/></g>`;
const grano = (x, y, rot) => `<g transform="translate(${x} ${y}) rotate(${rot})"><ellipse cx="0" cy="0" rx="9" ry="12" fill="${CAFE}" ${sw(2.2)}/><path d="M0 -9 C -4 -3, 4 3, 0 9" fill="none" stroke="${W}" stroke-width="1.8" stroke-linecap="round"/></g>`;
// Doble trazo: contorno negro + relleno de color (asas, tallos, colas)
const doble = (d, ancho, color, borde = 3.5) => `<path d="${d}" fill="none" stroke="${K}" stroke-width="${ancho + 2 * borde}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${color}" stroke-width="${ancho}" stroke-linecap="round" stroke-linejoin="round"/>`;

// ---------- Las 12 ilustraciones (viewBox -7 0 282 266) ----------
// Zonas libres: arriba-izquierda (número) x<50,y<26 · abajo-derecha (globo de audio) x>200,y>215
const ILUS = {
  // 1 우유 · cartón de leche (dibujo del prototipo aprobado)
  1: (id) => fondo(id) + `
<path d="M230 146 L364 150.5 L364 141.5 Z M246.1 176 L355 210 L357.4 201.3 Z M217.1 194 L331 264.9 L335.4 257.1 Z M216 228 L293.4 311.8 L299.8 305.4 Z M182 229.1 L245.1 347.4 L252.9 342.9 Z M164 258.1 L189.2 369.4 L197.9 367 Z M134 242 L129.5 376 L138.5 376 Z M104 258.1 L70.1 367 L78.8 369.4 Z M86 229.1 L15.1 342.9 L22.9 347.4 Z M52 228 L-31.8 305.4 L-25.4 311.8 Z M50.9 194 L-67.4 257.1 L-63 264.9 Z M21.9 176 L-89.4 201.3 L-87 210 Z M38 146 L-96 141.5 L-96 150.5 Z M21.9 116 L-87 82 L-89.4 90.7 Z M50.9 98 L-63 27.1 L-67.4 34.9 Z M52 64 L-25.4 -19.8 L-31.8 -13.4 Z M86 62.9 L22.9 -55.4 L15.1 -50.9 Z M104 33.9 L78.8 -77.4 L70.1 -75 Z M134 50 L138.5 -84 L129.5 -84 Z M164 33.9 L197.9 -75 L189.2 -77.4 Z M182 62.9 L252.9 -50.9 L245.1 -55.4 Z M216 64 L299.8 -13.4 L293.4 -19.8 Z M217.1 98 L335.4 34.9 L331 27.1 Z M246.1 116 L357.4 90.7 L355 82 Z" fill="${K}"/>
<path d="M260.9 162.7 L362 176 M252.3 195 L346.5 234 M235.6 223.9 L316.5 286 M211.9 247.6 L274 328.5 M183 264.3 L222 358.5 M85 264.3 L46 358.5 M56.1 247.6 L-6 328.5 M32.4 223.9 L-48.5 286 M15.7 195 L-78.5 234 M7.1 162.7 L-94 176 M7.1 129.3 L-94 116 M15.7 97 L-78.5 58 M32.4 68.1 L-48.5 6 M56.1 44.4 L-6 -36.5 M85 27.7 L46 -66.5 M117.3 19.1 L104 -82 M150.7 19.1 L164 -82 M183 27.7 L222 -66.5 M211.9 44.4 L274 -36.5 M235.6 68.1 L316.5 6 M252.3 97 L346.5 58 M260.9 129.3 L362 116" fill="none" stroke="${K}" stroke-width="1.6"/>
${chispa(42, 76, 1.1)}${chispa(24, 110, 0.75)}
${gota(80, 84, -25)}${gota(216, 104, 20)}
<path d="M92 172 Q 70 166 64 142" fill="none" stroke="${K}" stroke-width="4.5" stroke-linecap="round"/>
<circle cx="63" cy="136" r="7" fill="${W}" stroke="${K}" stroke-width="3"/>
<path d="M200 170 Q 222 162 226 140" fill="none" stroke="${K}" stroke-width="4.5" stroke-linecap="round"/>
<circle cx="227" cy="134" r="7" fill="${W}" stroke="${K}" stroke-width="3"/>
<path d="M118 230 L116 246 M152 230 L154 246" fill="none" stroke="${K}" stroke-width="4.5" stroke-linecap="round"/>
<ellipse cx="111" cy="249" rx="10" ry="5.5" fill="${K}"/><ellipse cx="159" cy="249" rx="10" ry="5.5" fill="${K}"/>
<polygon points="172,104 202,90 202,218 172,232" fill="${W}" stroke="${K}" stroke-width="3" stroke-linejoin="round"/>
<polygon points="172,104 202,90 202,218 172,232" fill="url(#${id}-tone)" opacity="0.55"/>
<polygon points="131,70 161,56 202,90 172,104" fill="currentColor" stroke="${K}" stroke-width="3" stroke-linejoin="round"/>
<polygon points="127,71 165,53 165,43 127,61" fill="${W}" stroke="${K}" stroke-width="3" stroke-linejoin="round"/>
<polygon points="90,104 131,70 172,104" fill="${W}" stroke="${K}" stroke-width="3" stroke-linejoin="round"/>
<circle cx="131" cy="91" r="5" fill="${G}" stroke="${K}" stroke-width="2"/>
<rect x="90" y="104" width="82" height="128" fill="${W}" stroke="${K}" stroke-width="3" stroke-linejoin="round"/>
<path d="M90 194 C 102 186, 114 202, 131 194 C 148 186, 160 202, 172 194 L172 232 L90 232 Z" fill="currentColor" stroke="${K}" stroke-width="3" stroke-linejoin="round"/>
<path d="M131 204 C 136 211, 138 215, 136 219 C 134 223, 128 223, 126 219 C 124 215, 126 211, 131 204 Z" fill="${W}"/>
${cara(131, 140, 1)}
${ono('꿀꺽', 170, 62, 10, 42)}`,

  // 2 나무 · árbol con frutos dorados
  2: (id) => {
    const C = [[134, 112, 64], [78, 118, 38], [190, 118, 38], [96, 72, 36], [172, 72, 36], [134, 50, 36], [100, 152, 30], [168, 152, 30]];
    const circ = (fill) => C.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`).join('');
    return fondo(id) + `
${chispa(26, 64, 1.1)}${chispa(248, 178, 0.8)}
<path d="M4 168 Q 16 160 28 168 M-2 184 Q 14 174 30 184 M232 52 Q 244 44 256 52" fill="none" ${sw(2.5)}/>
<path d="M-8 236 Q 60 222 134 228 Q 210 234 276 222 L276 266 L-8 266 Z" fill="${W}" ${sw(3)}/>
<path d="M-8 236 Q 60 222 134 228 Q 210 234 276 222 L276 266 L-8 266 Z" fill="url(#${id}-acc)" opacity="0.5"/>
<path d="M36 232 L40 221 L44 231 M48 230 L53 217 L57 229 M78 228 L82 218 L86 228" fill="none" ${sw(2.5)}/>
<path d="M102 241 C 116 232, 120 210, 118 160 L 150 160 C 148 210, 152 232, 166 241 Z" fill="${W}" ${sw(3.5)}/>
<path d="M127 196 Q 131 205 128 216 M142 184 Q 138 192 141 202" fill="none" ${sw(2.2)}/>
${C.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r + 3.5}" fill="${K}"/>`).join('')}
${circ(W)}<g opacity="0.2">${circ('currentColor')}</g><g opacity="0.55">${circ(`url(#${id}-acc)`)}</g>
<path d="M58 118 Q 66 110 74 118 M198 98 Q 206 90 214 98 M150 34 Q 158 26 166 34 M74 160 Q 82 152 90 160 M184 160 Q 192 152 200 160" fill="none" ${sw(2.5)}/>
${fruta(84, 82)}${fruta(200, 134)}${fruta(112, 172)}${fruta(120, 30)}
${cara(134, 114, 1.15)}
${hojita(26, 136, -30)}${hojita(240, 146, 40, 0.9)}${hojita(214, 196, 15, 0.8)}
${ono('살랑', 186, 48, 8, 36)}`;
  },

  // 3 바다 · mar: ola con espuma, velero, sol y gaviotas (el agua va en azul para que se lea "mar")
  3: (id) => {
    const MAR = '#4236F6';
    const ola = 'M-8 266 L-8 196 C 14 160, 50 126, 104 116 C 160 106, 204 128, 214 166 C 220 190, 204 206, 186 200 C 172 195, 170 178, 182 174 C 196 200, 236 222, 276 218 L276 266 Z';
    const espuma = 'M30 150 C 60 120, 110 104, 160 110 C 196 116, 216 140, 214 166 C 212 182, 200 192, 190 190 C 198 178, 194 162, 182 156 C 172 150, 164 160, 154 152 C 144 144, 132 156, 120 147 C 108 139, 96 152, 84 144 C 72 136, 56 152, 30 150 Z';
    const atras = 'M-8 128 Q 14 120 36 128 T 80 128 T 124 128 T 168 128 T 212 128 T 256 128 T 300 128 V 266 H -8 Z';
    return fondo(id) + `<defs><pattern id="${id}-mar" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><circle cx="3" cy="3" r="1.6" fill="${MAR}"/></pattern></defs>
<path d="M62 38 L62 30 M38 48 L32 42 M86 48 L92 42 M28 72 L20 72 M96 72 L104 72" fill="none" ${sw(3)}/>
<circle cx="62" cy="72" r="24" fill="${G}" ${sw(3)}/>
${union([[118, 50, 11], [132, 44, 14], [146, 50, 10], [132, 55, 9]], 3, W)}
<path d="M100 92 Q 107 83 114 92 Q 121 83 128 92 M142 78 Q 148 71 154 78 Q 160 71 166 78" fill="none" ${sw(3)}/>
<path d="${atras}" fill="${W}" ${sw(3)}/><path d="${atras}" fill="${MAR}" opacity="0.2"/>
<path d="M240 88 L240 121" ${sw(3)}/>
<path d="M243 92 L243 117 L263 117 Z" fill="${G}" ${sw(2.5)}/>
<path d="M237 97 L237 117 L221 117 Z" fill="${W}" ${sw(2.5)}/>
<path d="M214 121 L266 121 L257 133 L223 133 Z" fill="${W}" ${sw(2.8)}/>
<path d="M228 152 q 8 -6 16 0 M246 176 q 7 -5 14 0" fill="none" ${sw(2.2)}/>
<path d="${ola}" fill="${W}"/><path d="${ola}" fill="${MAR}" opacity="0.4"/><path d="${ola}" fill="url(#${id}-mar)" opacity="0.5"/>
<path d="M-8 246 C 30 232, 70 228, 116 232 M30 264 C 70 252, 112 250, 160 256" fill="none" stroke="${MAR}" stroke-width="5" stroke-linecap="round"/>
<path d="${ola}" fill="none" ${sw(3.5)}/>
<path d="${espuma}" fill="${W}" ${sw(3)}/>
${burbuja(222, 196, 4.5)}${burbuja(52, 168, 3.5)}
${cara(96, 186, 1.1)}
${gota(230, 146, 30, 0.9)}${gota(204, 108, 15, 0.8)}
${chispa(184, 96, 0.8)}${chispa(18, 108, 0.8)}
${ono('철썩', 172, 56, 8, 40)}`;
  },

  // 4 모자 · sombrero de ala ancha con cinta y moño
  4: (id) => fondo(id) + rafaga(134, 146, 104, 124) + `
${sombra(id, 134, 242, 106, 8)}
<g transform="rotate(-8 134 170)">
<ellipse cx="134" cy="196" rx="124" ry="40" fill="currentColor" ${sw(3.5)}/>
<ellipse cx="134" cy="190" rx="124" ry="40" fill="${W}" ${sw(3.5)}/>
<ellipse cx="134" cy="190" rx="124" ry="40" fill="url(#${id}-acc)" opacity="0.4"/>
<ellipse cx="134" cy="188" rx="78" ry="21" fill="currentColor" opacity="0.22"/>
<path d="M22 186 L34 189 M40 210 L51 205 M228 210 L217 205 M246 186 L234 189 M86 224 L90 215 M182 224 L178 215" fill="none" stroke="${K}" stroke-width="2.2" stroke-linecap="round" opacity="0.55"/>
<path d="M76 184 L80 128 C 82 106, 106 98, 134 98 C 162 98, 186 106, 188 128 L192 184 A 58 15 0 0 1 76 184 Z" fill="${W}" ${sw(3.5)}/>
<path d="M78 156 A 56 14 0 0 0 190 156 L192 184 A 58 15 0 0 1 76 184 Z" fill="currentColor" ${sw(3)}/>
<path d="M112 106 Q 134 116 156 106" fill="none" ${sw(2.5)}/>
<path d="M176 180 C 192 164, 206 182, 188 188 Z M176 180 C 186 196, 168 202, 164 190 Z" fill="${G}" ${sw(2.5)}/>
<circle cx="176" cy="181" r="5.5" fill="${G}" ${sw(2.5)}/>
${cara(134, 132, 1.0)}
</g>
${chispa(34, 84, 1.1)}${chispa(238, 120, 0.9)}${chispa(46, 140, 0.7)}
${ono('짠!', 178, 60, 10, 42)}`,

  // 5 빵 · rebanada de pan en su plato
  5: (id) => {
    const corteza = 'M72 232 L72 124 C 46 116, 44 70, 82 60 C 104 40, 164 40, 186 60 C 224 70, 222 116, 196 124 L196 232 Q 196 240 188 240 L80 240 Q 72 240 72 232 Z';
    const miga = 'M84 230 L84 114 C 62 108, 60 76, 90 70 C 110 54, 158 54, 178 70 C 208 76, 206 108, 184 114 L184 230 Z';
    return fondo(id) + `
<path d="M112 38 C 102 28, 122 20, 112 6 M142 36 C 132 26, 152 18, 142 4" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round"/>
<ellipse cx="134" cy="238" rx="110" ry="18" fill="${W}" ${sw(3)}/>
<ellipse cx="134" cy="236" rx="86" ry="11" fill="currentColor" opacity="0.25" stroke="${K}" stroke-width="2"/>
<path d="${corteza}" fill="${G}" ${sw(3.5)}/>
<path d="${miga}" fill="#FFF7E3" stroke="${K}" stroke-width="1.6"/>
<g fill="${G}" opacity="0.7"><ellipse cx="104" cy="94" rx="3.2" ry="2"/><ellipse cx="166" cy="92" rx="3.2" ry="2"/><ellipse cx="148" cy="80" rx="2.5" ry="1.6"/><ellipse cx="100" cy="210" rx="3" ry="2"/><ellipse cx="170" cy="214" rx="3" ry="2"/><ellipse cx="134" cy="216" rx="2.5" ry="1.6"/></g>
${cara(134, 150, 1.2)}
<path d="M74 176 Q 52 170 46 146" fill="none" stroke="${K}" stroke-width="4.5" stroke-linecap="round"/><circle cx="45" cy="140" r="7" fill="${W}" stroke="${K}" stroke-width="3"/>
<path d="M194 176 Q 216 170 222 146" fill="none" stroke="${K}" stroke-width="4.5" stroke-linecap="round"/><circle cx="223" cy="140" r="7" fill="${W}" stroke="${K}" stroke-width="3"/>
${chispa(34, 84, 1.1)}${chispa(240, 198, 0.8)}${chispa(22, 196, 0.7)}
${ono('냠냠', 186, 48, 10, 38)}`;
  },

  // 6 물 · gota de agua sobre una onda
  6: (id) => {
    const g = 'M134 28 C 152 70, 206 118, 206 166 C 206 210, 174 236, 134 236 C 94 236, 62 210, 62 166 C 62 118, 116 70, 134 28 Z';
    return fondo(id) + `
<ellipse cx="134" cy="236" rx="128" ry="23" fill="none" stroke="${K}" stroke-width="2" stroke-dasharray="7 6"/>
<ellipse cx="134" cy="236" rx="104" ry="17" fill="${W}" ${sw(3)}/>
<ellipse cx="134" cy="236" rx="104" ry="17" fill="currentColor" opacity="0.3"/>
<path d="${g}" fill="${W}"/><path d="${g}" fill="currentColor" opacity="0.3"/><path d="${g}" fill="url(#${id}-acc)" opacity="0.45"/>
<path d="${g}" fill="none" ${sw(3.5)}/>
<path d="M86 150 C 86 126, 98 104, 114 86" fill="none" stroke="${W}" stroke-width="8" stroke-linecap="round"/>
<circle cx="85" cy="170" r="5" fill="${W}"/>
${cara(134, 172, 1.2)}
${gota(38, 210, -35, 1.1)}${gota(232, 194, 35, 0.95)}${gota(58, 66, 0, 0.9)}${gota(214, 84, 0, 1)}${gota(28, 160, -20, 0.7)}
${chispa(34, 112, 1)}${chispa(240, 134, 0.8)}
${ono('똑똑', 180, 50, 8, 38)}`;
  },

  // 7 책 · libro abierto con una página que vuela
  7: (id) => {
    const izq = (dy) => `M28 ${98 + dy} C 66 ${86 + dy}, 108 ${92 + dy}, 134 ${112 + dy} L134 ${226 + dy} C 108 ${208 + dy}, 66 ${202 + dy}, 28 ${212 + dy} Z`;
    const der = (dy) => `M240 ${98 + dy} C 202 ${86 + dy}, 160 ${92 + dy}, 134 ${112 + dy} L134 ${226 + dy} C 160 ${208 + dy}, 202 ${202 + dy}, 240 ${212 + dy} Z`;
    return fondo(id) + `
${sombra(id, 134, 248, 112, 8)}
<path d="M16 118 L134 140 L252 118 L252 224 L134 246 L16 224 Z" fill="currentColor" ${sw(3.5)}/>
<path d="${izq(8)}" fill="${W}" ${sw(3)}/><path d="${der(8)}" fill="${W}" ${sw(3)}/>
<path d="${izq(0)}" fill="${W}" ${sw(3)}/><path d="${der(0)}" fill="${W}" ${sw(3)}/>
<path d="M42 112 C 70 103, 100 106, 120 120 M42 124 C 70 115, 100 118, 120 132 M226 112 C 198 103, 168 106, 148 120 M226 124 C 198 115, 168 118, 148 132" fill="none" stroke="${K}" stroke-width="2.4" stroke-linecap="round" opacity="0.35"/>
<path d="M42 198 C 62 192, 80 192, 96 196 M226 198 C 206 192, 188 192, 172 196" fill="none" stroke="${K}" stroke-width="2.4" stroke-linecap="round" opacity="0.35"/>
<path d="M134 112 C 150 78, 182 56, 222 52 C 212 70, 214 86, 232 98 C 198 90, 160 94, 134 112 Z" fill="${W}" ${sw(3)}/>
<path d="M164 84 C 180 74, 196 70, 210 70 M170 94 C 184 86, 198 82, 212 84" fill="none" stroke="${K}" stroke-width="2.2" stroke-linecap="round" opacity="0.35"/>
<path d="M236 60 L252 54 M240 78 L256 76" fill="none" ${sw(2.5)}/>
${cara(134, 164, 1.1, { dx: 26 })}
<text x="182" y="40" font-family="Black Han Sans, sans-serif" font-size="26" fill="currentColor" stroke="${K}" stroke-width="1.5" paint-order="stroke" transform="rotate(-12 182 40)">ㄱ</text>
<text x="150" y="58" font-family="Black Han Sans, sans-serif" font-size="20" fill="currentColor" stroke="${K}" stroke-width="1.5" paint-order="stroke" transform="rotate(10 150 58)">ㅏ</text>
${chispa(118, 64, 0.9)}${chispa(260, 102, 0.8)}
${ono('팔랑', 30, 70, -10, 36)}`;
  },

  // 8 가방 · mochila con un libro asomado
  8: (id) => {
    const cuerpo = 'M70 102 C 70 74, 92 62, 134 62 C 176 62, 198 74, 198 102 L200 222 Q 200 240 182 240 L86 240 Q 68 240 68 222 Z';
    const bolsillo = 'M84 152 Q 84 138 98 138 L170 138 Q 184 138 184 152 L184 214 Q 184 228 170 228 L98 228 Q 84 228 84 214 Z';
    return fondo(id) + `
${sombra(id, 134, 244, 88, 8)}
${doble('M74 106 C 52 122, 52 196, 66 226', 7, 'currentColor', 3.5)}
${doble('M194 106 C 216 122, 216 196, 202 226', 7, 'currentColor', 3.5)}
<g transform="rotate(-12 112 68)"><rect x="92" y="38" width="42" height="54" rx="3" fill="${W}" ${sw(3)}/><rect x="92" y="38" width="10" height="54" rx="2" fill="${G}" ${sw(3)}/><path d="M110 50 L126 50 M110 58 L122 58" ${sw(2)}/></g>
${doble('M112 66 C 112 36, 160 36, 160 66', 5, W, 3.5)}
<path d="${cuerpo}" fill="currentColor" ${sw(3.5)}/>
<path d="M80 96 Q 134 82 188 96" fill="none" stroke="${W}" stroke-width="2.5" stroke-dasharray="5 4"/>
<rect x="180" y="94" width="8" height="15" rx="3" fill="${G}" ${sw(2)}/>
<path d="M82 124 Q 84 110 94 102" fill="none" stroke="${W}" stroke-width="5" stroke-linecap="round"/>
<path d="${bolsillo}" fill="${W}" ${sw(3.5)}/>
<path d="M98 152 L170 152" fill="none" stroke="${K}" stroke-width="2" stroke-dasharray="4 3"/>
<rect x="166" y="150" width="8" height="14" rx="3" fill="${G}" ${sw(2)}/>
${cara(134, 190, 1.05)}
${nota(28, 108, 1)}${nota(222, 152, 0.9)}
${chispa(42, 176, 0.9)}${chispa(236, 92, 0.8)}
${ono('룰루', 182, 50, 8, 38)}`;
  },

  // 9 커피 · taza de café con vapor
  9: (id) => fondo(id) + `
${grano(26, 206, -30)}${grano(50, 230, 20)}${grano(246, 196, 40)}
<ellipse cx="134" cy="228" rx="104" ry="22" fill="${W}" ${sw(3.5)}/>
<ellipse cx="134" cy="226" rx="70" ry="13" fill="currentColor" opacity="0.28" stroke="${K}" stroke-width="2"/>
${doble('M190 132 C 236 126, 240 190, 184 188', 7, W, 3.5)}
<path d="M74 108 L84 206 Q 88 228 112 228 L156 228 Q 180 228 184 206 L194 108 Z" fill="${W}" ${sw(3.5)}/>
<path d="M82 190 L186 190 L184 206 Q 180 228 156 228 L112 228 Q 88 228 84 206 Z" fill="currentColor" ${sw(3)}/>
<path d="M98 200 L170 200" fill="none" stroke="${W}" stroke-width="2.5" stroke-dasharray="2 6" stroke-linecap="round"/>
<ellipse cx="134" cy="108" rx="60" ry="14" fill="${W}" ${sw(3.5)}/>
<ellipse cx="134" cy="110" rx="50" ry="9" fill="${CAFE}"/>
<ellipse cx="116" cy="108" rx="10" ry="2.6" fill="${W}" opacity="0.85"/>
${doble('M116 88 C 104 74, 128 62, 116 46', 4, W, 3)}
${doble('M146 86 C 134 70, 158 58, 146 40', 4, W, 3)}
${cara(134, 150, 1.1)}
${chispa(38, 74, 1.1)}${chispa(66, 40, 0.7)}${chispa(242, 98, 0.8)}
${ono('호로록', 168, 48, 8, 32)}`,

  // 10 우산 · paraguas bajo la lluvia
  10: (id) => {
    const tela = 'M26 140 C 30 80, 80 46, 134 46 C 188 46, 238 80, 242 140 Q 215 124 188 140 Q 161 124 134 140 Q 107 124 80 140 Q 53 124 26 140 Z';
    return fondo(id) + `
${gota(70, 22, 0, 0.9)}${gota(104, 14, 0, 0.7)}${gota(14, 98, 0, 0.9)}${gota(254, 104, 0, 0.9)}${gota(20, 184, 0, 1)}${gota(248, 178, 0, 0.8)}${gota(52, 216, 0, 0.8)}
<ellipse cx="134" cy="248" rx="92" ry="11" fill="currentColor" opacity="0.3" ${sw(2.5)}/>
<path d="M98 248 q 6 -5 12 0 M160 250 q 6 -5 12 0" fill="none" ${sw(2)}/>
${doble('M134 140 L134 222 C 134 246, 104 246, 104 228', 6, G, 3.5)}
<path d="${tela}" fill="${W}"/>
<path d="M134 46 C 80 46, 30 80, 26 140 Q 53 124 80 140 C 92 90, 112 60, 134 46 Z" fill="currentColor"/>
<path d="M134 46 C 188 46, 238 80, 242 140 Q 215 124 188 140 C 176 90, 156 60, 134 46 Z" fill="currentColor"/>
<path d="M134 46 C 112 60, 92 90, 80 140 M134 46 C 156 60, 176 90, 188 140" fill="none" ${sw(3)}/>
<path d="${tela}" fill="none" ${sw(3.5)}/>
<path d="M48 110 Q 58 86 80 70" fill="none" stroke="${W}" stroke-width="5" stroke-linecap="round"/>
<path d="M134 46 L134 32" ${sw(4)}/><circle cx="134" cy="30" r="5" fill="${G}" ${sw(2.2)}/>
<circle cx="26" cy="140" r="3.5" fill="${K}"/><circle cx="80" cy="140" r="3.5" fill="${K}"/><circle cx="188" cy="140" r="3.5" fill="${K}"/><circle cx="242" cy="140" r="3.5" fill="${K}"/>
${cara(134, 98, 1)}
${chispa(222, 222 - 30, 0.8)}${chispa(36, 52, 0.9)}
${ono('톡톡', 178, 36, 8, 34)}`;
  },

  // 11 고양이 · gato (dibujo del prototipo aprobado)
  11: (id) => fondo(id) + `
<ellipse cx="134" cy="160" rx="112" ry="100" fill="${W}"/>
<circle cx="40" cy="78" r="12" fill="${W}" stroke="${K}" stroke-width="2.2"/>
<path d="M33 75 Q 35 70 39 69" fill="none" stroke="${K}" stroke-width="1.8" stroke-linecap="round"/>
<circle cx="66" cy="50" r="6" fill="${W}" stroke="${K}" stroke-width="2"/>
<circle cx="232" cy="112" r="9" fill="${W}" stroke="${K}" stroke-width="2.2"/>
<path d="M227 110 Q 228 106 231 105" fill="none" stroke="${K}" stroke-width="1.6" stroke-linecap="round"/>
<circle cx="248" cy="138" r="4.5" fill="${W}" stroke="${K}" stroke-width="1.8"/>
<circle cx="26" cy="140" r="5" fill="${W}" stroke="${K}" stroke-width="1.8"/>
${chispa(56, 112, 1.1)}${chispa(232, 184, 0.9)}
<g transform="translate(0 6)">
<path d="M34 176 Q 24 186 26 200 M22 182 Q 14 192 17 204" fill="none" stroke="${K}" stroke-width="2.5" stroke-linecap="round"/>
<path d="M92 230 C 48 236, 30 204, 46 180 C 54 168, 68 170, 64 182" fill="none" stroke="${K}" stroke-width="18" stroke-linecap="round"/>
<path d="M92 230 C 48 236, 30 204, 46 180 C 54 168, 68 170, 64 182" fill="none" stroke="${W}" stroke-width="11" stroke-linecap="round"/>
<path d="M42.6 219.1 L50.4 212.9 M62.4 232.9 L65.6 223.3" fill="none" stroke="${K}" stroke-width="3.5" stroke-linecap="round"/>
<path d="M82 238 C 76 200, 92 150, 134 148 C 176 150, 192 200, 186 238 Z" fill="${W}" stroke="${K}" stroke-width="3.5" stroke-linejoin="round"/>
<path d="M88 200 Q 96 198 100 204 M86 218 Q 94 216 98 222 M180 200 Q 172 198 168 204 M182 218 Q 174 216 170 222" fill="none" stroke="${K}" stroke-width="3" stroke-linecap="round"/>
<ellipse cx="114" cy="238" rx="15" ry="9" fill="${W}" stroke="${K}" stroke-width="3.5"/>
<ellipse cx="154" cy="238" rx="15" ry="9" fill="${W}" stroke="${K}" stroke-width="3.5"/>
<path d="M109 235 L109 241 M119 235 L119 241 M149 235 L149 241 M159 235 L159 241" fill="none" stroke="${K}" stroke-width="2" stroke-linecap="round"/>
<polygon points="80,92 86,40 124,66" fill="${W}" stroke="${K}" stroke-width="3.5" stroke-linejoin="round"/>
<polygon points="90,80 92,54 112,68" fill="${P}"/>
<polygon points="188,92 182,40 144,66" fill="${W}" stroke="${K}" stroke-width="3.5" stroke-linejoin="round"/>
<polygon points="178,80 176,54 156,68" fill="${P}"/>
<ellipse cx="134" cy="114" rx="64" ry="50" fill="${W}" stroke="${K}" stroke-width="3.5"/>
<path d="M124 70 L126 82 M134 66 L134 80 M144 70 L142 82" fill="none" stroke="${K}" stroke-width="4" stroke-linecap="round"/>
<ellipse cx="110" cy="112" rx="9" ry="11" fill="${K}"/><ellipse cx="158" cy="112" rx="9" ry="11" fill="${K}"/>
<circle cx="106.5" cy="107" r="3.4" fill="${W}"/><circle cx="154.5" cy="107" r="3.4" fill="${W}"/>
<circle cx="113" cy="117" r="1.5" fill="${W}"/><circle cx="161" cy="117" r="1.5" fill="${W}"/>
<ellipse cx="94" cy="130" rx="10" ry="5.5" fill="${P}"/><ellipse cx="174" cy="130" rx="10" ry="5.5" fill="${P}"/>
<path d="M129 122 L139 122 L134 128 Z" fill="${K}" stroke="${K}" stroke-width="2" stroke-linejoin="round"/>
<path d="M134 128 C 134 135, 125 137, 122 131 M134 128 C 134 135, 143 137, 146 131" fill="none" stroke="${K}" stroke-width="2.6" stroke-linecap="round"/>
<path d="M92 120 L64 114 M92 127 L62 128 M176 120 L204 114 M176 127 L206 128" fill="none" stroke="${K}" stroke-width="2.4" stroke-linecap="round"/>
<path d="M90 150 Q 134 180 178 150" fill="none" stroke="${K}" stroke-width="12" stroke-linecap="round"/>
<path d="M90 150 Q 134 180 178 150" fill="none" stroke="currentColor" stroke-width="6.5" stroke-linecap="round"/>
<circle cx="134" cy="172" r="9" fill="${G}" stroke="${K}" stroke-width="2.6"/>
<path d="M128 173 L140 173" fill="none" stroke="${K}" stroke-width="2" stroke-linecap="round"/>
<circle cx="134" cy="177" r="1.6" fill="${K}"/>
</g>
${ono('야옹', 184, 54, 8, 38)}`,

  // 12 강아지 · perrito de orejas caídas
  12: (id) => fondo(id) + `
<ellipse cx="134" cy="160" rx="112" ry="100" fill="${W}"/>
${burbuja(36, 84, 11)}${burbuja(62, 56, 5.5)}${burbuja(26, 138, 5)}
${chispa(46, 198, 1.0)}${chispa(240, 128, 0.9)}
<g transform="translate(0 6)">
${doble('M178 224 C 206 220, 222 200, 216 178', 10, W, 3.5)}
<path d="M228 170 Q 236 180 232 192 M238 162 Q 248 176 242 194" fill="none" ${sw(2.5)}/>
<path d="M82 238 C 76 200, 92 150, 134 148 C 176 150, 192 200, 186 238 Z" fill="${W}" ${sw(3.5)}/>
<ellipse cx="164" cy="204" rx="13" ry="10" fill="${G}" transform="rotate(-20 164 204)"/>
<ellipse cx="114" cy="238" rx="15" ry="9" fill="${W}" ${sw(3.5)}/>
<ellipse cx="154" cy="238" rx="15" ry="9" fill="${W}" ${sw(3.5)}/>
<path d="M109 235 L109 241 M119 235 L119 241 M149 235 L149 241 M159 235 L159 241" fill="none" stroke="${K}" stroke-width="2" stroke-linecap="round"/>
<ellipse cx="134" cy="112" rx="62" ry="52" fill="${W}" ${sw(3.5)}/>
<ellipse cx="160" cy="108" rx="16" ry="18" fill="${G}"/>
<path d="M94 78 C 66 68, 46 98, 54 136 C 58 156, 80 160, 88 144 C 94 130, 100 102, 94 78 Z" fill="${G}" ${sw(3.5)}/>
<path d="M174 78 C 202 68, 222 98, 214 136 C 210 156, 188 160, 180 144 C 174 130, 168 102, 174 78 Z" fill="${G}" ${sw(3.5)}/>
<ellipse cx="110" cy="110" rx="9" ry="11" fill="${K}"/><ellipse cx="158" cy="110" rx="9" ry="11" fill="${K}"/>
<circle cx="106.5" cy="105" r="3.4" fill="${W}"/><circle cx="154.5" cy="105" r="3.4" fill="${W}"/>
<circle cx="113" cy="115" r="1.5" fill="${W}"/><circle cx="161" cy="115" r="1.5" fill="${W}"/>
<path d="M100 92 Q 108 86 116 91 M152 91 Q 160 86 168 92" fill="none" ${sw(2.6)}/>
<ellipse cx="102" cy="134" rx="9" ry="5" fill="${P}"/><ellipse cx="166" cy="134" rx="9" ry="5" fill="${P}"/>
<ellipse cx="134" cy="126" rx="9.5" ry="7" fill="${K}"/><ellipse cx="131" cy="123.5" rx="3" ry="1.8" fill="${W}"/>
<path d="M127 140 Q 127 155 134 155 Q 141 155 141 140 Z" fill="${P}" ${sw(2.2)}/>
<path d="M134 133 C 134 140, 125 142, 122 136 M134 133 C 134 140, 143 142, 146 136" fill="none" ${sw(2.6)}/>
<path d="M90 152 Q 134 182 178 152" fill="none" stroke="${K}" stroke-width="12" stroke-linecap="round"/>
<path d="M90 152 Q 134 182 178 152" fill="none" stroke="currentColor" stroke-width="6.5" stroke-linecap="round"/>
<g transform="translate(134 176)">
<circle cx="-9" cy="-3.4" r="5.6" fill="${K}"/><circle cx="-9" cy="3.4" r="5.6" fill="${K}"/><circle cx="9" cy="-3.4" r="5.6" fill="${K}"/><circle cx="9" cy="3.4" r="5.6" fill="${K}"/><rect x="-10" y="-5.6" width="20" height="11.2" fill="${K}"/>
<circle cx="-9" cy="-3.4" r="3.4" fill="${G}"/><circle cx="-9" cy="3.4" r="3.4" fill="${G}"/><circle cx="9" cy="-3.4" r="3.4" fill="${G}"/><circle cx="9" cy="3.4" r="3.4" fill="${G}"/><rect x="-10" y="-3.4" width="20" height="6.8" fill="${G}"/>
</g>
</g>
${ono('멍멍', 184, 50, 8, 38)}`,
};

// ---------- Piezas fijas del prototipo ----------
const AUDIO = `<svg class="audio" width="74" height="62" viewBox="0 0 74 62" aria-label="Escuchar">
<ellipse cx="41" cy="37" rx="31" ry="23" fill="currentColor"/>
<path d="M17 21 L2 2 L28 13 Z" fill="${W}" stroke="${K}" stroke-width="3" stroke-linejoin="round"/>
<ellipse cx="38" cy="34" rx="31" ry="23" fill="${W}" stroke="${K}" stroke-width="3"/>
<path d="M17 21 L2 2 L28 13 Z" fill="${W}"/>
<path d="M26 30 L31 30 L37 25 L37 43 L31 38 L26 38 Z" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"/>
<path d="M41.5 29.5 C 44.5 31.8, 44.5 36.2, 41.5 38.5 M45.5 25.5 C 51 29.5, 51 38.5, 45.5 42.5" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/>
</svg>`;
const AVATAR = `<svg class="avatar" width="60" height="56" viewBox="0 0 86 80">
<path d="M4 80 C 6 62, 22 55, 43 55 C 64 55, 80 62, 82 80 Z" fill="currentColor" stroke="${K}" stroke-width="3" stroke-linejoin="round"/>
<path d="M33 56 L43 66 L53 56" fill="${W}" stroke="${K}" stroke-width="2.5" stroke-linejoin="round"/>
<circle cx="61" cy="70" r="3.5" fill="${G}" stroke="${K}" stroke-width="1.5"/>
<circle cx="20" cy="36" r="5" fill="${W}" stroke="${K}" stroke-width="2.5"/>
<circle cx="66" cy="36" r="5" fill="${W}" stroke="${K}" stroke-width="2.5"/>
<circle cx="43" cy="34" r="23" fill="${W}" stroke="${K}" stroke-width="3"/>
<path d="M20 32 C 19 15, 30 7, 44 8 C 58 8, 68 17, 66 32 L 60 25 L 55 31 L 49 21 L 43 29 L 37 20 L 31 30 L 26 23 Z" fill="${K}" stroke="${K}" stroke-width="1.5" stroke-linejoin="round"/>
<ellipse cx="35" cy="39" rx="2.8" ry="3.6" fill="${K}"/><ellipse cx="51" cy="39" rx="2.8" ry="3.6" fill="${K}"/>
<circle cx="34" cy="37.6" r="1" fill="${W}"/><circle cx="50" cy="37.6" r="1" fill="${W}"/>
<ellipse cx="28" cy="46" rx="4.5" ry="2.4" fill="${P}"/><ellipse cx="58" cy="46" rx="4.5" ry="2.4" fill="${P}"/>
<path d="M37 46 Q 43 53 49 46 Z" fill="${K}" stroke="${K}" stroke-width="1.5" stroke-linejoin="round"/>
</svg>`;
const COLA = `<svg class="cola" width="24" height="18" viewBox="0 0 24 18"><path d="M2 0 L22 0 L6 18 Z" fill="${W}"/><path d="M2.5 1.5 L6 17 L21 1.5" fill="none" stroke="${K}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/></svg>`;
const FLECHA = `<svg width="18" height="12" viewBox="0 0 18 12" style="flex:none"><path d="M1.5 6 L15.5 6 M10.5 1.5 L15.5 6 L10.5 10.5" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const FLECHA_QR = `<svg width="34" height="18" viewBox="0 0 34 18" style="flex:none"><path d="M2 9 L28 9 M20 2.5 L29 9 L20 15.5" fill="none" stroke="${K}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 9 L28 9 M20 2.5 L29 9 L20 15.5" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

// ---------- Caras ----------
function anverso(p) {
  const id = 'a' + pad(p.n), acc = COLOR[p.categoria];
  const sil = [...p.kr].length;
  const tam = sil <= 1 ? 100 : sil === 2 ? 88 : 80;
  return `<div class="card" style="--acc:${acc};color:${K}">
  <div class="panel ilus">
    <svg width="282" height="266" viewBox="-7 0 282 266" style="display:block;color:${acc}" role="img" aria-label="${esc(p.es)}">${ILUS[p.n](id)}</svg>
    <div class="num">${pad(p.n)}/12</div>
  </div>
  <div class="panel palabra"><div class="kr-big" lang="ko" style="font-size:${tam}px">${esc(p.kr)}</div></div>
  <div style="color:${acc}">${AUDIO}</div>
</div>`;
}

function reverso(p, qr) {
  const id = 'r' + pad(p.n), acc = COLOR[p.categoria];
  const i = p.ejemplo_kr.indexOf(p.kr);
  const frase = i < 0 ? esc(p.ejemplo_kr)
    : esc(p.ejemplo_kr.slice(0, i)) + `<span class="hl">${esc(p.kr)}</span>` + esc(p.ejemplo_kr.slice(i + p.kr.length));
  return `<div class="card" style="--acc:${acc};color:${K}">
  <div class="hdr"><div class="tag">${esc(p.categoria)}</div><div class="pill">${pad(p.n)}/12</div></div>
  <div class="panel sig">
    <svg width="96" height="74" viewBox="0 0 96 74" style="position:absolute;top:0;right:0;color:${acc}"><defs><pattern id="${id}-d1" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><circle cx="4" cy="4" r="1.7" fill="currentColor"/></pattern></defs><path d="M0 0 L96 0 L96 74 Z" fill="url(#${id}-d1)" opacity="0.45"/></svg>
    <div class="kr-mid" lang="ko">${esc(p.kr)}</div>
    <div class="rom">${esc(p.rom)}</div>
    <div class="es" data-fit data-max="58" data-min="26" data-w="262">${esc(p.es)}</div>
  </div>
  <div class="panel ej">
    <svg width="140" height="106" viewBox="0 0 140 106" style="position:absolute;left:0;bottom:0;color:${acc}"><defs><pattern id="${id}-d2" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><circle cx="4" cy="4" r="1.7" fill="currentColor"/></pattern></defs><circle cx="40" cy="122" r="76" fill="url(#${id}-d2)" opacity="0.4"/></svg>
    <div style="color:${acc}">${AVATAR}</div>
    <div class="bubble"><span class="frase" lang="ko" data-fit data-max="19" data-min="13" data-w="230">${frase}</span>${COLA}</div>
    <div class="tr" style="color:${K}"><span style="color:${acc};display:flex">${FLECHA}</span><span class="tr-txt" data-fit data-max="19" data-min="14" data-w="172" data-h="42">${esc(p.ejemplo_es)}</span></div>
  </div>
  <div class="qrrow">
    <div class="qrtxt">
      <div class="esc">Escúchala <span style="color:${acc};display:flex">${FLECHA_QR}</span></div>
      <div class="curso">Básico 1 · Semana ${p.semana}</div>
      <div class="marca"><b>Academia Seúl</b> · @academiaseul</div>
    </div>
    <div class="qrbox">${qr}</div>
  </div>
</div>`;
}

function cortes() {
  let d = '';
  for (const x0 of [60, 420]) for (const y0 of [60, 540]) {
    for (const [x, dx] of [[x0, -1], [x0 + 336, 1]]) for (const [y, dy] of [[y0, -1], [y0 + 456, 1]]) {
      d += `M${x + dx * 2} ${y} L${x + dx * 11} ${y} M${x} ${y + dy * 2} L${x} ${y + dy * 11} `;
    }
  }
  return `<svg class="cortes" width="816" height="1056" viewBox="0 0 816 1056" aria-hidden="true"><path d="${d}" stroke="#8C8C8C" stroke-width="0.6" fill="none"/></svg>`;
}

const CSS = `
@page { size: letter; margin: 0 }
*{box-sizing:border-box}
html,body{margin:0;padding:0}
body{font-family:'Noto Sans KR',sans-serif;color:#111;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.hoja{position:relative;width:816px;height:1056px;overflow:hidden;background:#fff;page-break-after:always;break-after:page}
.hoja:last-of-type{page-break-after:auto;break-after:auto}
.cortes{position:absolute;left:0;top:0}
.slot{position:absolute;width:336px;height:456px}
.c0{left:60px}.c1{left:420px}.r0{top:60px}.r1{top:540px}
.card{position:absolute;left:8px;top:8px;width:314px;height:434px;display:flex;flex-direction:column;gap:10px;padding:10px;background:#fff;border:3px solid #111;border-radius:12px;box-shadow:6px 6px 0 #111}
.panel{position:relative;overflow:hidden;border:3px solid #111;background:#fff}
/* anverso */
.ilus{flex:none;height:272px}
.num{position:absolute;top:0;left:0;background:#111;color:#fff;font-family:'Bangers',sans-serif;font-size:16px;letter-spacing:1px;line-height:1;padding:5px 10px 4px 8px;border-bottom-right-radius:8px}
.palabra{flex:1;display:flex;align-items:center;justify-content:center}
.kr-big{font-family:'Black Han Sans',sans-serif;line-height:1;letter-spacing:2px;color:#111;text-shadow:4px 4px 0 var(--acc);padding-right:8px}
.audio{position:absolute;right:14px;top:228px}
/* reverso */
.hdr{flex:none;height:30px;display:flex;align-items:center;justify-content:space-between}
.tag{background:#E8B84B;border:3px solid #111;padding:4px 10px 2px;font-family:'Bangers',sans-serif;font-size:17px;line-height:1;letter-spacing:1.2px;color:#111;text-transform:uppercase;transform:rotate(-1.5deg)}
.pill{background:#111;color:#fff;font-family:'Bangers',sans-serif;font-size:16px;line-height:1;letter-spacing:1px;padding:5px 10px 4px;border-radius:999px}
.sig{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center}
.kr-mid{position:relative;font-family:'Black Han Sans',sans-serif;font-size:44px;line-height:1;letter-spacing:1px;color:#111}
.rom{position:relative;margin-top:5px;font-size:14px;font-weight:500;line-height:1.2;letter-spacing:2px;color:#6B6B6B}
.es{position:relative;margin-top:9px;font-family:'Bangers',sans-serif;font-size:58px;line-height:0.95;letter-spacing:2px;color:var(--acc);text-shadow:3px 3px 0 #111;white-space:nowrap;padding-right:3px}
.ej{flex:none;height:112px}
.avatar{position:absolute;left:8px;bottom:0}
.bubble{position:absolute;top:9px;left:10px;right:10px;border:3px solid #111;border-radius:24px;background:#fff;padding:7px 12px 6px;text-align:center;line-height:1.3;color:#111}
.frase{display:inline-block;white-space:nowrap;font-size:19px;font-weight:700}
.hl{color:var(--acc);border-bottom:3px solid #E8B84B}
.cola{position:absolute;left:30px;top:100%;display:block}
.tr{position:absolute;left:76px;right:10px;bottom:9px;display:flex;justify-content:flex-end;align-items:center;gap:5px}
.tr-txt{display:block;max-width:172px;text-align:right;text-wrap:balance;font-family:'Bangers',sans-serif;font-size:19px;line-height:1.08;letter-spacing:0.6px;color:#111}
.qrrow{flex:none;height:78px;display:flex;align-items:center;gap:8px}
.qrtxt{flex:1;min-width:0;display:flex;flex-direction:column;justify-content:center;gap:5px;padding-left:2px}
.esc{display:flex;align-items:center;gap:6px;font-family:'Bangers',sans-serif;font-size:30px;line-height:1;letter-spacing:1.2px;color:#111;text-shadow:2px 2px 0 var(--acc)}
.curso{font-size:11.5px;font-weight:900;letter-spacing:1.2px;text-transform:uppercase;color:#111;line-height:1.2}
.marca{font-size:10px;font-weight:500;letter-spacing:1px;color:#555;line-height:1.2}
.marca b{font-weight:700;text-transform:uppercase}
.qrbox{flex:none;width:78px;height:78px;border:3px solid #111;border-radius:4px;background:#fff}
.qrbox svg{display:block}
@media screen{
  body{background:#D9D6CF;padding:24px 0}
  .hoja{margin:0 auto 24px;box-shadow:0 2px 14px rgba(0,0,0,.18)}
  body.contacto{background:#ECE9E2;padding:0}
}
body.contacto .contacto-wrap{padding:26px 32px 32px;width:max-content}
body.contacto h1{font-family:'Bangers',sans-serif;font-size:40px;letter-spacing:2px;margin:0 0 4px;color:#111}
body.contacto h2{font-family:'Bangers',sans-serif;font-size:28px;letter-spacing:2px;margin:14px 0 8px;color:#111}
body.contacto .rejilla{display:grid;grid-template-columns:repeat(6,336px);gap:10px}
body.contacto .slot{position:relative;left:auto;top:auto}
`;

const SCRIPT = `
(function(){
  if (location.hash === '#contacto') {
    document.body.classList.add('contacto');
    var wrap = document.createElement('div'); wrap.className = 'contacto-wrap';
    var h1 = document.createElement('h1'); h1.textContent = 'Flashcards Básico 1 · Estilo B · Webtoon'; wrap.appendChild(h1);
    [['a','Anversos'],['r','Reversos']].forEach(function(par){
      var h = document.createElement('h2'); h.textContent = par[1]; wrap.appendChild(h);
      var g = document.createElement('div'); g.className = 'rejilla';
      Array.prototype.slice.call(document.querySelectorAll('.slot[data-cara="' + par[0] + '"]'))
        .sort(function(x, y){ return x.dataset.n - y.dataset.n; })
        .forEach(function(s){ g.appendChild(s); });
      wrap.appendChild(g);
    });
    Array.prototype.slice.call(document.querySelectorAll('.hoja')).forEach(function(h){ h.remove(); });
    document.body.appendChild(wrap);
  }
  function ajustar(){
    document.querySelectorAll('[data-fit]').forEach(function(el){
      var s = +el.dataset.max, min = +el.dataset.min, w = +el.dataset.w, h = +(el.dataset.h || 1e9);
      el.style.fontSize = s + 'px';
      while (s > min && (el.scrollWidth > w || el.offsetHeight > h)) { s -= 0.5; el.style.fontSize = s + 'px'; }
    });
    document.documentElement.setAttribute('data-listo', '1');
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(ajustar); else window.addEventListener('load', ajustar);
  window.__ajustar = ajustar;
})();`;

async function construir() {
  const palabras = JSON.parse(fs.readFileSync(DATOS, 'utf8'));
  if (palabras.length !== 12) throw new Error('Se esperaban 12 palabras');
  const qrs = {};
  for (const p of palabras) {
    let s = await QR.toString(p.audio, { type: 'svg', errorCorrectionLevel: 'M', margin: 4, color: { dark: NAVY, light: W } });
    s = s.replace('<svg ', `<svg width="72" height="72" role="img" aria-label="QR: audio de ${esc(p.kr)}" `);
    qrs[p.n] = s;
  }
  const hojas = [];
  for (let g = 0; g < 3; g++) {
    const grupo = palabras.slice(g * 4, g * 4 + 4);
    const slot = (p, cara, col, fila, html) => `<div class="slot c${col} r${fila}" data-cara="${cara}" data-n="${p.n}">${html}</div>`;
    hojas.push(`<section class="hoja" aria-label="Página ${g * 2 + 1}: anversos ${g * 4 + 1}–${g * 4 + 4}">${cortes()}
${grupo.map((p, i) => slot(p, 'a', i % 2, Math.floor(i / 2), anverso(p))).join('\n')}</section>`);
    // Reverso: columnas invertidas para doble cara por el borde largo
    hojas.push(`<section class="hoja" aria-label="Página ${g * 2 + 2}: reversos ${g * 4 + 1}–${g * 4 + 4}">${cortes()}
${grupo.map((p, i) => slot(p, 'r', 1 - (i % 2), Math.floor(i / 2), reverso(p, qrs[p.n]))).join('\n')}</section>`);
  }
  const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Flashcards Básico 1 · Webtoon</title>
<!-- Generado por make.js a partir de ../palabras.json. Estilo B · Webtoon. Academia Seúl. -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bangers&amp;family=Black+Han+Sans&amp;family=Noto+Sans+KR:wght@500;700;900&amp;display=swap" rel="stylesheet">
<style>${CSS}</style>
</head>
<body>
${hojas.join('\n')}
<script>${SCRIPT}</script>
</body>
</html>
`;
  fs.writeFileSync(HTML, html, 'utf8');
  console.log('HTML:', HTML, (html.length / 1024).toFixed(0) + ' KB');
}

async function esperarListo(page) {
  await page.evaluate(async () => {
    const txt = document.body.innerText + ' ' + Array.from(document.querySelectorAll('svg text')).map((t) => t.textContent).join(' ');
    const cargas = ['16px "Black Han Sans"', '16px Bangers', '500 16px "Noto Sans KR"', '700 16px "Noto Sans KR"', '900 16px "Noto Sans KR"'];
    await Promise.all(cargas.map((c) => document.fonts.load(c, txt).catch(() => null)));
    await document.fonts.ready;
    window.__ajustar();
  });
  await page.waitForFunction(() => document.documentElement.getAttribute('data-listo') === '1');
  const ok = await page.evaluate(() => ['16px "Black Han Sans"', '16px Bangers', '700 16px "Noto Sans KR"'].map((c) => c + ': ' + document.fonts.check(c, '우유 고양이 leche')));
  console.log('Fuentes:', ok.join(' | '));
  await new Promise((r) => setTimeout(r, 400));
}

async function renderizar() {
  const url = 'file:///' + HTML.replace(/\\/g, '/');
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox', '--disable-lcd-text'] });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 816, height: 1056, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 90000 });
    await esperarListo(page);
    await page.pdf({ path: PDF, format: 'letter', printBackground: true, preferCSSPageSize: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
    console.log('PDF:', PDF, (fs.statSync(PDF).size / 1024).toFixed(0) + ' KB');

    const hoja = await browser.newPage();
    await hoja.setViewport({ width: 2140, height: 1200, deviceScaleFactor: 0.55 });
    await hoja.goto(url + '#contacto', { waitUntil: 'networkidle0', timeout: 90000 });
    await esperarListo(hoja);
    await hoja.screenshot({ path: PNG, fullPage: true });
    console.log('PNG:', PNG, (fs.statSync(PNG).size / 1024).toFixed(0) + ' KB');
  } finally {
    await browser.close();
  }
}

(async () => {
  if (!process.argv.includes('--solo-pdf')) await construir();
  await renderizar();
})().catch((e) => { console.error(e); process.exit(1); });
