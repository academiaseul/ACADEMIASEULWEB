// Flashcards Básico 1 · Estilo D · Chingu tigre (marca)
// 1) Construye tarjetas.html (24 caras, 6 páginas carta, 4 tarjetas de 3,5 x 4,75 in por página)
//    a partir de ../palabras.json, con dibujos SVG propios y QR (navy sobre blanco) al audio de cada palabra.
// 2) Con puppeteer-core genera Flashcards_Basico1_D_Chingu_tigre.pdf y vista_previa.png.
// Uso: node make.js            (opcional: CARDS_DIR=<carpeta> para volcar cada cara en PNG grande)
const fs = require('fs');
const path = require('path');
const req = require('module').createRequire('C:/Users/Chingu/AppData/Local/Temp/claude/C--Users-Chingu-Desktop-ACADEMIASEULWEB/d4111e1b-5523-44ea-97b2-b1a1d9545b9e/scratchpad/package.json');
const QR = req('qrcode');
const puppeteer = req('puppeteer-core');

const DIR = __dirname;
const WORDS = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'palabras.json'), 'utf8'));
const HTML_OUT = path.join(DIR, 'tarjetas.html');
const PDF_OUT = path.join(DIR, 'Flashcards_Basico1_D_Chingu_tigre.pdf');
const PNG_OUT = path.join(DIR, 'vista_previa.png');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const TOTAL = WORDS.length;

// ---------- paleta ----------
const N = '#003478', B = '#4236F6', G = '#E8B84B', W = '#FFFFFF';
const LB = '#DDE1FB', LIL = '#B7BEEC', PEACH = '#F3B07A';

// acc = banda/botón, on = texto sobre la banda, ink = texto de acento sobre blanco, panel = fondo de la ilustración
const CAT = {
  'Comida y bebida': { acc: B, on: W, ink: B, panel: '#E6E9FE' },
  'Naturaleza':      { acc: '#2E7D32', on: W, ink: '#2E7D32', panel: '#E2F2DC' },
  'Objetos':         { acc: '#00738A', on: W, ink: '#00738A', panel: '#DAF0F4' },
  'Animales':        { acc: G, on: N, ink: '#8A5D00', panel: '#FFF1CC' },
};

// ---------- utilidades SVG ----------
const shadow = (rx = 46, cy = 158) => `<ellipse cx="85" cy="${cy}" rx="${rx}" ry="6" fill="${N}" opacity="0.12"/>`;
const plus = (x, y, s, c, w = 3.5) => `<path d="M${x} ${y - s}v${2 * s}M${x - s} ${y}h${2 * s}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`;
const dot = (x, y, r, c) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`;
function face(x, y, { s = 1, ex = 13, cx = 23, cheeks = true } = {}) {
  return `<g transform="translate(${x} ${y}) scale(${s})">` +
    `<ellipse cx="${-ex}" cy="0" rx="4.4" ry="5.2" fill="${N}"/><ellipse cx="${ex}" cy="0" rx="4.4" ry="5.2" fill="${N}"/>` +
    `<circle cx="${-ex + 1.6}" cy="-1.8" r="1.6" fill="${W}"/><circle cx="${ex + 1.6}" cy="-1.8" r="1.6" fill="${W}"/>` +
    `<path d="M-6.5 7.5q6.5 6.5 13 0" fill="none" stroke="${N}" stroke-width="3" stroke-linecap="round"/>` +
    (cheeks ? `<ellipse cx="${-cx}" cy="9" rx="5" ry="3.2" fill="${PEACH}"/><ellipse cx="${cx}" cy="9" rx="5" ry="3.2" fill="${PEACH}"/>` : '') +
    `</g>`;
}
// silueta unida de varios círculos con contorno navy (capa de trazo + capa de relleno)
const blob = (circles, fill, sw = 3.5) =>
  circles.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${N}" stroke="${N}" stroke-width="${sw * 2}"/>`).join('') +
  circles.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`).join('');
const outlined = (d, sw, inner, iw) =>
  `<path d="${d}" fill="none" stroke="${N}" stroke-width="${sw}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${inner}" stroke-width="${iw}" stroke-linecap="round"/>`;
const rain = (x, y, c) => `<path d="M${x} ${y}c-3 5-5 7.5-5 10a5 5 0 0 0 10 0c0-2.5-2-5-5-10z" fill="${c}" stroke="${N}" stroke-width="2" stroke-linejoin="round"/>`;

// ---------- dibujos (viewBox 0 0 170 170) ----------
const ART = {
  // 우유 · cartón de leche (idéntico al prototipo)
  1: shadow(46) + plus(28, 42, 6, G) + plus(146, 74.5, 4.5, B, 3) + dot(140, 38, 3.5, G) + dot(30, 112, 3, B) +
    `<rect x="64" y="16" width="42" height="13" rx="3" fill="${W}" stroke="${N}" stroke-width="3.5"/>` +
    `<path d="M44 62L64 29H106L126 62Z" fill="${W}" stroke="${N}" stroke-width="3.5" stroke-linejoin="round"/>` +
    `<path d="M95 31.5H104.6L121.5 59.5H109Z" fill="${LB}"/>` +
    `<circle cx="80" cy="47" r="6.5" fill="${G}" stroke="${N}" stroke-width="3"/>` +
    `<rect x="44" y="62" width="82" height="90" rx="6" fill="${W}"/>` +
    `<rect x="113" y="66" width="9" height="34" rx="4" fill="${LB}"/>` +
    `<path d="M44 104q10.25-9 20.5 0t20.5 0t20.5 0t20.5 0V146a6 6 0 0 1-6 6H50a6 6 0 0 1-6-6Z" fill="${B}"/>` +
    `<rect x="51" y="116" width="6" height="26" rx="3" fill="${W}" opacity="0.35"/>` +
    `<path d="M85 116c-5.5 7.5-8 11.5-8 15a8 8 0 0 0 16 0c0-3.5-2.5-7.5-8-15z" fill="${W}"/>` +
    `<rect x="44" y="62" width="82" height="90" rx="6" fill="none" stroke="${N}" stroke-width="3.5"/>` +
    face(85, 80, { cx: 23 }),

  // 나무 · árbol
  2: shadow(50) + plus(26, 40, 6, B) + plus(148, 128, 4.5, G, 3) + dot(146, 34, 3.5, G) + dot(22, 112, 3, B) +
    `<path d="M47 155l3-9l3 9M55 155l3-7l3 7M109 155l3-9l3 9M117 155l3-7l3 7" fill="none" stroke="#2E7D32" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<path d="M73 153C76 138 77 124 77 104H93C93 124 94 138 97 153Z" fill="#B9844F" stroke="${N}" stroke-width="3.5" stroke-linejoin="round"/>` +
    `<path d="M86 130q-3 6 0 12M80 141q2 4 0 8" fill="none" stroke="#7E5128" stroke-width="2.5" stroke-linecap="round"/>` +
    blob([[85, 62, 38], [53, 88, 25], [117, 88, 25], [70, 106, 20], [100, 106, 20]], '#62BC69') +
    `<path d="M59 54q6-17 23-21" fill="none" stroke="#A3DEA6" stroke-width="5" stroke-linecap="round"/>` +
    `<path d="M108 50q3 3.5 6 0M42 94q3 3.5 6 0M122 100q3 3.5 6 0M84 115q3 3.5 6 0M54 106q3 3.5 6 0" fill="none" stroke="#2F8A3A" stroke-width="2.5" stroke-linecap="round"/>` +
    face(85, 78),

  // 바다 · mar (sello redondo con olas, barco y sol)
  3: `<defs><clipPath id="clipBada"><circle cx="85" cy="84" r="62"/></clipPath></defs>` +
    shadow(44) + plus(20, 30, 6, G) + plus(152, 128, 4.5, B, 3) + dot(153, 28, 3.5, B) + dot(17, 122, 3, G) +
    `<circle cx="85" cy="84" r="62" fill="#EEF3FF"/>` +
    `<g clip-path="url(#clipBada)">` +
    // sol con 8 rayos completos, todos dentro del círculo (antes 3 de 5 rayos quedaban recortados y los 2 visibles parecían rayitas sueltas)
    `<path d="${Array.from({ length: 8 }, (_, i) => { const a = (i * Math.PI) / 4, c = Math.cos(a), s = Math.sin(a); return `M${(110 + 18.5 * c).toFixed(1)} ${(58 + 18.5 * s).toFixed(1)}L${(110 + 21.5 * c).toFixed(1)} ${(58 + 21.5 * s).toFixed(1)}`; }).join('')}" fill="none" stroke="${G}" stroke-width="3" stroke-linecap="round"/>` +
    `<circle cx="110" cy="58" r="14" fill="${G}" stroke="${N}" stroke-width="3"/>` +
    `<circle cx="105" cy="57" r="2" fill="${N}"/><circle cx="115" cy="57" r="2" fill="${N}"/>` +
    `<path d="M107 62q3 3 6 0" fill="none" stroke="${N}" stroke-width="2" stroke-linecap="round"/>` +
    `<path d="M38 62a8 8 0 0 1 8-8a10 10 0 0 1 19 2a7 7 0 0 1 2 13H44a7 7 0 0 1-6-7z" fill="${W}" stroke="${N}" stroke-width="2.5" stroke-linejoin="round"/>` +
    `<path d="M72 38q4-4 8 0q4-4 8 0" fill="none" stroke="${N}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<path d="M58 90V64" stroke="${N}" stroke-width="2.5" stroke-linecap="round"/>` +
    `<path d="M60.5 66V86H75Z" fill="${W}" stroke="${N}" stroke-width="2.5" stroke-linejoin="round"/>` +
    `<path d="M55.5 71V86H46Z" fill="${B}" stroke="${N}" stroke-width="2.5" stroke-linejoin="round"/>` +
    `<path d="M42 89H74L68 100H48Z" fill="${G}" stroke="${N}" stroke-width="2.5" stroke-linejoin="round"/>` +
    `<path d="M10 100q10.5-12 21 0t21 0t21 0t21 0t21 0t21 0t21 0V170H10Z" fill="${LIL}" stroke="${N}" stroke-width="3" stroke-linejoin="round"/>` +
    `<path d="M0 116q10.5-12 21 0t21 0t21 0t21 0t21 0t21 0t21 0t21 0V170H0Z" fill="#7F88CF" stroke="${N}" stroke-width="3" stroke-linejoin="round"/>` +
    `<path d="M10 132q10.5-12 21 0t21 0t21 0t21 0t21 0t21 0t21 0V170H10Z" fill="${B}" stroke="${N}" stroke-width="3" stroke-linejoin="round"/>` +
    `<path d="M24 142q5-5 10 0M66 142q5-5 10 0M108 142q5-5 10 0M45 108q4-4 8 0M108 106q4-4 8 0" fill="none" stroke="${W}" stroke-width="3" stroke-linecap="round"/>` +
    `</g>` +
    `<circle cx="85" cy="84" r="62" fill="none" stroke="${N}" stroke-width="3.5"/>`,

  // 모자 · gorro de lana con pompón
  4: shadow(54) + plus(24, 42, 6, G) + plus(150, 54, 4.5, B, 3) + dot(146, 30, 3.5, G) + dot(22, 98, 3, B) +
    `<path d="M36 122C36 76 58 50 85 50C112 50 134 76 134 122Z" fill="${LIL}" stroke="${N}" stroke-width="3.5" stroke-linejoin="round"/>` +
    `<path d="M62 61Q50 88 50 118M108 61Q120 88 120 118" fill="none" stroke="#8F98DA" stroke-width="3" stroke-linecap="round"/>` +
    `<rect x="30" y="112" width="110" height="36" rx="13" fill="${B}" stroke="${N}" stroke-width="3.5"/>` +
    `<path d="${Array.from({ length: 10 }, (_, i) => `M${(42 + i * 9.6).toFixed(1)} 119V141`).join('')}" fill="none" stroke="#8C86FF" stroke-width="3" stroke-linecap="round"/>` +
    blob([[85, 30, 9], [75, 36, 9], [95, 36, 9], [79, 45, 8], [91, 45, 8], [85, 38, 10]], G, 3) +
    `<path d="M79 30l2 2M90 33l2 2M84 41l2 2M75 40l2 2M94 42l2 2" fill="none" stroke="#B9862A" stroke-width="2" stroke-linecap="round"/>` +
    face(85, 88, { cx: 21 }),

  // 빵 · pan de molde con mantequilla
  5: shadow(46) + plus(26, 44, 6, B) + plus(148, 118, 4.5, G, 3) + dot(146, 34, 3.5, B) + dot(22, 116, 3, G) +
    `<path d="M50 148V92C34 88 32 56 56 49C64 33 106 33 114 49C138 56 136 88 120 92V148Q120 154 114 154H56Q50 154 50 148Z" fill="#D99A45" stroke="${N}" stroke-width="3.5" stroke-linejoin="round"/>` +
    `<path d="M59 143V85C46 82 44 62 63 57C70 44 100 44 107 57C126 62 124 82 111 85V143Q111 146 108 146H62Q59 146 59 143Z" fill="#FCE6AE"/>` +
    `<g fill="#E6BC72"><circle cx="69" cy="78" r="1.8"/><circle cx="101" cy="76" r="1.8"/><circle cx="74" cy="134" r="1.8"/><circle cx="97" cy="137" r="1.8"/><circle cx="66" cy="120" r="1.5"/><circle cx="105" cy="124" r="1.5"/></g>` +
    `<g transform="rotate(-10 85 64)"><rect x="72" y="55" width="26" height="17" rx="3" fill="#FFF0A0" stroke="${N}" stroke-width="2.5"/><path d="M76 60h10" stroke="${W}" stroke-width="2.5" stroke-linecap="round"/></g>` +
    face(85, 102, { cx: 21 }),

  // 물 · vaso de agua y gota
  6: `<defs><clipPath id="clipMul"><path d="M50 52L57 146Q58 152 64 152H106Q112 152 113 146L120 52Z"/></clipPath></defs>` +
    shadow(40) + plus(26, 48, 6, G) + plus(28, 122, 4.5, B, 3) + dot(150, 96, 3.5, G) + dot(146, 130, 3, B) +
    `<path d="M50 52L57 146Q58 152 64 152H106Q112 152 113 146L120 52Z" fill="${W}"/>` +
    `<g clip-path="url(#clipMul)"><path d="M40 86q8.75-8 17.5 0t17.5 0t17.5 0t17.5 0t17.5 0V160H40Z" fill="#8EC0FA"/>` +
    `<path d="M40 86q8.75-8 17.5 0t17.5 0t17.5 0t17.5 0t17.5 0" fill="none" stroke="${N}" stroke-width="2.5"/></g>` +
    `<path d="M62 96L65.5 138" stroke="${W}" stroke-width="5" stroke-linecap="round"/>` +
    `<path d="M59 64L60.5 76" stroke="${LB}" stroke-width="5" stroke-linecap="round"/>` +
    `<path d="M50 52L57 146Q58 152 64 152H106Q112 152 113 146L120 52" fill="none" stroke="${N}" stroke-width="3.5" stroke-linejoin="round"/>` +
    `<ellipse cx="85" cy="52" rx="35" ry="6" fill="#F4F6FF" stroke="${N}" stroke-width="3.5"/>` +
    face(85, 116, { cx: 21 }) +
    `<path d="M138 8C132 18 126 25 126 33a12 12 0 0 0 24 0C150 25 144 18 138 8Z" fill="${B}" stroke="${N}" stroke-width="3" stroke-linejoin="round"/>` +
    `<ellipse cx="132.5" cy="33" rx="2.5" ry="4.2" fill="${W}"/>`,

  // 책 · libro abierto con cinta
  7: shadow(60) + plus(26, 34, 6, G) + plus(146, 36, 4.5, B, 3) + dot(85, 32, 3.5, G) + dot(150, 152, 3, B) +
    `<path d="M81 136V160L85 155.5L89 160V136Z" fill="${G}" stroke="${N}" stroke-width="2.5" stroke-linejoin="round"/>` +
    `<path d="M18 72Q52 60 85 74Q118 60 152 72V142Q118 132 85 146Q52 132 18 142Z" fill="${B}" stroke="${N}" stroke-width="3.5" stroke-linejoin="round"/>` +
    `<path d="M23 68Q55 56 85 70V140Q55 128 23 138Z" fill="${LB}" stroke="${N}" stroke-width="3" stroke-linejoin="round"/>` +
    `<path d="M147 68Q115 56 85 70V140Q115 128 147 138Z" fill="${LB}" stroke="${N}" stroke-width="3" stroke-linejoin="round"/>` +
    `<path d="M28 62Q57 50 85 64V134Q57 122 28 132Z" fill="${W}" stroke="${N}" stroke-width="3.5" stroke-linejoin="round"/>` +
    `<path d="M142 62Q113 50 85 64V134Q113 122 142 132Z" fill="${W}" stroke="${N}" stroke-width="3.5" stroke-linejoin="round"/>` +
    `<path d="M38 72Q56 65 74 72M38 82Q56 75 74 82M96 72Q114 65 132 72M96 82Q114 75 132 82" fill="none" stroke="${LIL}" stroke-width="3" stroke-linecap="round"/>` +
    face(85, 104, { ex: 18, cx: 31 }),

  // 가방 · mochila
  8: shadow(50) + plus(24, 40, 6, G) + plus(150, 62, 4.5, B, 3) + dot(146, 34, 3.5, G) + dot(20, 74, 3, B) +
    outlined('M72 50C72 28 98 28 98 50', 9, '#6E66F8', 3.5) +
    `<rect x="32" y="96" width="20" height="42" rx="7" fill="${LIL}" stroke="${N}" stroke-width="3"/>` +
    `<rect x="118" y="96" width="20" height="42" rx="7" fill="${LIL}" stroke="${N}" stroke-width="3"/>` +
    `<rect x="44" y="44" width="82" height="110" rx="26" fill="${B}"/>` +
    `<path d="M44 78V70C44 56 56 44 70 44H100C114 44 126 56 126 70V78Q85 94 44 78Z" fill="#2B20B8"/>` +
    `<path d="M45 78Q85 94 125 78" fill="none" stroke="${N}" stroke-width="3"/>` +
    `<rect x="44" y="44" width="82" height="110" rx="26" fill="none" stroke="${N}" stroke-width="3.5"/>` +
    `<rect x="64" y="84" width="10" height="14" rx="2" fill="#2B20B8" stroke="${N}" stroke-width="2.5"/>` +
    `<rect x="96" y="84" width="10" height="14" rx="2" fill="#2B20B8" stroke="${N}" stroke-width="2.5"/>` +
    `<rect x="62" y="90" width="14" height="9" rx="2" fill="${G}" stroke="${N}" stroke-width="2.5"/>` +
    `<rect x="94" y="90" width="14" height="9" rx="2" fill="${G}" stroke="${N}" stroke-width="2.5"/>` +
    `<rect x="54" y="104" width="62" height="44" rx="14" fill="${LB}" stroke="${N}" stroke-width="3"/>` +
    `<path d="M62 112H108" stroke="${N}" stroke-width="2" stroke-dasharray="3 3"/>` +
    `<path d="M109 112v7" stroke="${N}" stroke-width="2.5" stroke-linecap="round"/><circle cx="109" cy="122" r="3.2" fill="${G}" stroke="${N}" stroke-width="2"/>` +
    face(85, 128, { s: 0.85, cx: 21 }),

  // 커피 · taza de café humeante
  9: shadow(54) + plus(24, 46, 6, G) + plus(148, 40, 4.5, B, 3) + dot(150, 72, 3.5, G) + dot(22, 112, 3, B) +
    `<ellipse cx="82" cy="148" rx="54" ry="9" fill="${LB}" stroke="${N}" stroke-width="3.5"/>` +
    outlined('M120 84C144 82 146 122 120 124', 15, W, 8) +
    `<path d="M42 66H122V120Q122 146 96 146H68Q42 146 42 120Z" fill="${W}" stroke="${N}" stroke-width="3.5" stroke-linejoin="round"/>` +
    `<path d="M43.75 80H120.25V89H43.75Z" fill="${B}"/>` +
    `<ellipse cx="82" cy="66" rx="40" ry="9" fill="#7A4A26" stroke="${N}" stroke-width="3.5"/>` +
    `<ellipse cx="82" cy="66.5" rx="27" ry="5" fill="#B07B45"/>` +
    `<path d="M66 50c-6-6 6-10 0-17M82 47c-6-6 6-10 0-17c-6-6 6-10 0-14M98 50c-6-6 6-10 0-17" fill="none" stroke="#7F88CF" stroke-width="4" stroke-linecap="round"/>` +
    face(82, 112, { cx: 22 }),

  // 우산 · paraguas con lluvia
  // (las gotas laterales se separan de las puntas del paraguas: antes quedaban medio tapadas por la tela)
  10: shadow(42) + rain(26, 28, B) + rain(146, 24, '#8EC0FA') + rain(13, 106, '#8EC0FA') + rain(157, 106, B) + rain(34, 124, B) + rain(140, 128, '#8EC0FA') +
    outlined('M85 96V138a10 10 0 0 1-20 0', 10, B, 4.5) +
    `<path d="M85 40V29" stroke="${N}" stroke-width="3.5" stroke-linecap="round"/><circle cx="85" cy="27" r="4" fill="${G}" stroke="${N}" stroke-width="2.5"/>` +
    `<path d="M24 100C24 62 52 38 85 38C118 38 146 62 146 100q-15.25-12-30.5 0q-15.25-12-30.5 0q-15.25-12-30.5 0q-15.25-12-30.5 0Z" fill="${G}" stroke="${N}" stroke-width="3.5" stroke-linejoin="round"/>` +
    `<path d="M37 82Q41 61 61 49" fill="none" stroke="#F7DE94" stroke-width="5" stroke-linecap="round"/>` +
    `<path d="M85 38Q64 60 54.5 100M85 38Q106 60 115.5 100M85 38V52" fill="none" stroke="${N}" stroke-width="2.5" stroke-linecap="round"/>` +
    face(85, 76, { s: 0.9, cx: 20 }),

  // 고양이 · gato (idéntico al prototipo)
  // (la cruz navy pasa de (148,132.5), donde la cola la tapaba y dejaba un trocito suelto, a (152,64))
  11: shadow(50) + plus(28, 46, 6, B) + plus(152, 64, 4.5, N, 3) + dot(144, 36, 3.5, B) + dot(24, 104, 3, N) +
    outlined('M114 146C146 148 152 118 138 102', 17, LIL, 10.5) +
    `<path d="M50 152C44 124 56 98 85 98C114 98 126 124 120 152Z" fill="${LIL}" stroke="${N}" stroke-width="3.5" stroke-linejoin="round"/>` +
    `<path d="M71 152C69 130 76 114 85 114C94 114 101 130 99 152Z" fill="${W}"/>` +
    `<ellipse cx="72" cy="151" rx="11" ry="7" fill="${W}" stroke="${N}" stroke-width="3"/>` +
    `<ellipse cx="98" cy="151" rx="11" ry="7" fill="${W}" stroke="${N}" stroke-width="3"/>` +
    `<path d="M69 149v4M75 149v4M95 149v4M101 149v4" fill="none" stroke="${N}" stroke-width="2" stroke-linecap="round"/>` +
    `<path d="M50 64L51 24L80 46Z" fill="${LIL}" stroke="${N}" stroke-width="3.5" stroke-linejoin="round"/>` +
    `<path d="M120 64L119 24L90 46Z" fill="${LIL}" stroke="${N}" stroke-width="3.5" stroke-linejoin="round"/>` +
    `<path d="M56 54L56.5 35L71 46Z" fill="#F3C99A"/><path d="M114 54L113.5 35L99 46Z" fill="#F3C99A"/>` +
    `<ellipse cx="85" cy="70" rx="41" ry="33" fill="${LIL}" stroke="${N}" stroke-width="3.5"/>` +
    `<path d="M78 41l1.8 7M85 39.5v8.5M92 41l-1.8 7" fill="none" stroke="#7F88CF" stroke-width="3" stroke-linecap="round"/>` +
    `<ellipse cx="85" cy="84" rx="15" ry="10" fill="${W}"/>` +
    `<ellipse cx="68" cy="70" rx="6" ry="7.5" fill="${N}"/><ellipse cx="102" cy="70" rx="6" ry="7.5" fill="${N}"/>` +
    `<circle cx="70.2" cy="67" r="2.4" fill="${W}"/><circle cx="104.2" cy="67" r="2.4" fill="${W}"/>` +
    `<circle cx="66.4" cy="73.6" r="1.1" fill="${W}"/><circle cx="100.4" cy="73.6" r="1.1" fill="${W}"/>` +
    `<ellipse cx="56" cy="77" rx="5" ry="3.3" fill="${PEACH}"/><ellipse cx="114" cy="77" rx="5" ry="3.3" fill="${PEACH}"/>` +
    `<path d="M80.5 79.5h9l-4.5 5z" fill="${PEACH}" stroke="${N}" stroke-width="2" stroke-linejoin="round"/>` +
    `<path d="M85 84.5v2.5M85 87q-4 4.2-8.2 1M85 87q4 4.2 8.2 1" fill="none" stroke="${N}" stroke-width="2.4" stroke-linecap="round"/>` +
    `<path d="M64 83L36 79M64 88L37 93M106 83L134 79M106 88L133 93" fill="none" stroke="${N}" stroke-width="2.2" stroke-linecap="round"/>`,

  // 강아지 · perrito de orejas caídas con collar
  12: shadow(50) + plus(26, 40, 6, B) + plus(150, 132, 4.5, N, 3) + dot(146, 30, 3.5, B) + dot(22, 112, 3, N) +
    outlined('M116 144C136 142 142 124 134 110', 15, W, 8) +
    `<path d="M141 100l7-5M145 112h8" fill="none" stroke="${N}" stroke-width="2.5" stroke-linecap="round"/>` +
    `<path d="M50 152C44 124 56 98 85 98C114 98 126 124 120 152Z" fill="${W}" stroke="${N}" stroke-width="3.5" stroke-linejoin="round"/>` +
    `<ellipse cx="104" cy="128" rx="9" ry="8" fill="#EFCB92"/>` +
    `<ellipse cx="72" cy="151" rx="11" ry="7" fill="${W}" stroke="${N}" stroke-width="3"/>` +
    `<ellipse cx="98" cy="151" rx="11" ry="7" fill="${W}" stroke="${N}" stroke-width="3"/>` +
    `<path d="M69 149v4M75 149v4M95 149v4M101 149v4" fill="none" stroke="${N}" stroke-width="2" stroke-linecap="round"/>` +
    outlined('M59 100Q85 114 111 100', 10, B, 5) +
    `<circle cx="85" cy="113" r="6" fill="${G}" stroke="${N}" stroke-width="2.5"/>` +
    `<ellipse cx="85" cy="66" rx="40" ry="33" fill="${W}" stroke="${N}" stroke-width="3.5"/>` +
    `<ellipse cx="102" cy="62" rx="12.5" ry="11.5" fill="#EFCB92"/>` +
    `<ellipse cx="85" cy="82" rx="16" ry="10.5" fill="#FBEBD0"/>` +
    `<path d="M58 40C40 36 28 56 32 80C34 92 46 94 52 84C58 72 62 54 58 40Z" fill="#D49A55" stroke="${N}" stroke-width="3.5" stroke-linejoin="round"/>` +
    `<path d="M112 40C130 36 142 56 138 80C136 92 124 94 118 84C112 72 108 54 112 40Z" fill="#D49A55" stroke="${N}" stroke-width="3.5" stroke-linejoin="round"/>` +
    `<ellipse cx="68" cy="51" rx="3.2" ry="2" fill="#D49A55"/><ellipse cx="102" cy="49" rx="3.2" ry="2" fill="#B07A3A"/>` +
    `<ellipse cx="68" cy="64" rx="5.5" ry="7" fill="${N}"/><ellipse cx="102" cy="64" rx="5.5" ry="7" fill="${N}"/>` +
    `<circle cx="70.2" cy="61" r="2.3" fill="${W}"/><circle cx="104.2" cy="61" r="2.3" fill="${W}"/>` +
    `<circle cx="66.4" cy="67.4" r="1" fill="${W}"/><circle cx="100.4" cy="67.4" r="1" fill="${W}"/>` +
    `<ellipse cx="62" cy="79" rx="5" ry="3.3" fill="${PEACH}"/><ellipse cx="108" cy="79" rx="5" ry="3.3" fill="${PEACH}"/>` +
    `<ellipse cx="85" cy="76.5" rx="7" ry="5" fill="${N}"/><ellipse cx="82.8" cy="75" rx="2.2" ry="1.3" fill="${W}"/>` +
    `<path d="M85 81.5v3M85 84.5q-4 4.2-8.2 1M85 84.5q4 4.2 8.2 1" fill="none" stroke="${N}" stroke-width="2.4" stroke-linecap="round"/>`,
};

// ---------- mascota tigre y altavoz (del prototipo) ----------
const TIGER = (size) => `<svg width="${size}" height="${size}" viewBox="0 0 80 80" style="flex:none" xmlns="http://www.w3.org/2000/svg">
<circle cx="18" cy="20" r="10" fill="${G}" stroke="${N}" stroke-width="3"/><circle cx="62" cy="20" r="10" fill="${G}" stroke="${N}" stroke-width="3"/>
<circle cx="18" cy="21" r="4.5" fill="${W}"/><circle cx="62" cy="21" r="4.5" fill="${W}"/>
<ellipse cx="40" cy="44" rx="31" ry="28" fill="${G}" stroke="${N}" stroke-width="3"/>
<path d="M40 18.5v9M31 20.5l2.5 6M49 20.5l-2.5 6M10 37h7M10.5 45.5h6M70 37h-7M69.5 45.5h-6" fill="none" stroke="${B}" stroke-width="3" stroke-linecap="round"/>
<path d="M40 50c-4-4.5-16-4-16 5.5c0 7 8.5 8.5 16 4.5c7.5 4 16 2.5 16-4.5c0-9.5-12-10-16-5.5z" fill="${W}" stroke="${N}" stroke-width="2.5" stroke-linejoin="round"/>
<ellipse cx="29" cy="39" rx="3.6" ry="4.4" fill="${N}"/><ellipse cx="51" cy="39" rx="3.6" ry="4.4" fill="${N}"/>
<circle cx="30.3" cy="37.4" r="1.3" fill="${W}"/><circle cx="52.3" cy="37.4" r="1.3" fill="${W}"/>
<path d="M35.5 49.5q4.5-1.6 9 0q-1 3.6-4.5 4.6q-3.5-1-4.5-4.6z" fill="${N}"/>
<path d="M40 54v2.4M40 56.4q-3 3-6.2 0.6M40 56.4q3 3 6.2 0.6" fill="none" stroke="${N}" stroke-width="2" stroke-linecap="round"/>
<ellipse cx="18" cy="51" rx="4.2" ry="2.8" fill="${PEACH}"/><ellipse cx="62" cy="51" rx="4.2" ry="2.8" fill="${PEACH}"/>
</svg>`;
const SPEAKER = (c) => `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9.2a4 4 0 0 1 0 5.6"/><path d="M18.4 6.6a8 8 0 0 1 0 10.8"/></svg>`;
const BUBBLE_ICON = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${N}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M4 5h16v11H9l-5 4z"/></svg>`;

// ---------- utilidades ----------
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const num = (n) => String(n).padStart(2, '0');
function lum(hex) {
  const v = hex.replace('#', '').match(/../g).map((h) => parseInt(h, 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
}
const contrast = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

function highlight(sentence, word) {
  const i = sentence.indexOf(word);
  if (i < 0) return esc(sentence);
  return esc(sentence.slice(0, i)) + `<span class="acc">${esc(word)}</span>` + esc(sentence.slice(i + word.length));
}

function front(w) {
  const c = CAT[w.categoria];
  const len = [...w.kr].length;
  const size = len === 1 ? 104 : len === 2 ? 94 : 82;
  return `<div class="card front" style="--acc:${c.acc};--on:${c.on};--ink:${c.ink};--panel:${c.panel}">
  <div class="band"><div class="num"><b>${num(w.n)}</b><span>/${TOTAL}</span></div><span class="chip">Básico 1</span></div>
  <div class="panel"><svg width="168" height="168" viewBox="0 0 170 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(w.es)}">${ART[w.n]}</svg></div>
  <div class="word"><span class="hl fit" data-max="${size}" data-min="60" lang="ko">${esc(w.kr)}</span></div>
  <div class="foot">
    <div class="play">${SPEAKER(c.on)}</div>
    <div class="bubble">¡Escucha!<i></i></div>
    ${TIGER(56)}
  </div>
</div>`;
}

function back(w, qrSvg) {
  const c = CAT[w.categoria];
  return `<div class="card back" style="--acc:${c.acc};--on:${c.on};--ink:${c.ink};--panel:${c.panel}">
  <div class="thin"></div>
  <div class="bbody">
    <div class="row1"><span class="chip cat">${esc(w.categoria)}</span><span class="n">${num(w.n)}/${TOTAL}</span></div>
    <div class="krrow"><span class="kr" lang="ko">${esc(w.kr)}</span><span class="rom">${esc(w.rom)}</span></div>
    <div class="mean fit" data-max="54" data-min="26">${esc(w.es)}</div>
    <div class="ex">
      <div class="exlab">${BUBBLE_ICON}<span>Ejemplo</span></div>
      <div class="exkr fit" data-max="26" data-min="17" lang="ko">${highlight(w.ejemplo_kr, w.kr)}</div>
      <div class="exes">${esc(w.ejemplo_es)}</div>
    </div>
    <div class="qrrow">
      <div class="qr">${qrSvg}</div>
      <div class="bubble l"><i></i><b>Escúchala</b><small>escanea el código</small></div>
      ${TIGER(48)}
    </div>
    <div class="bfoot"><span class="wk">Básico 1 · Semana ${w.semana}</span><span class="brand">Academia Seúl</span></div>
  </div>
</div>`;
}

// ---------- página ----------
const PAGE_W = 816, PAGE_H = 1056, CW = 336, CH = 456, GAP = 24;
const X0 = (PAGE_W - (2 * CW + GAP)) / 2, Y0 = (PAGE_H - (2 * CH + GAP)) / 2;
function cutMarks() {
  const out = [];
  const g = 3, L = 12;
  for (let r = 0; r < 2; r++) for (let col = 0; col < 2; col++) {
    const x0 = X0 + col * (CW + GAP), y0 = Y0 + r * (CH + GAP), x1 = x0 + CW, y1 = y0 + CH;
    for (const [x, y, dx, dy] of [[x0, y0, -1, -1], [x1, y0, 1, -1], [x0, y1, -1, 1], [x1, y1, 1, 1]]) {
      out.push(`M${x + dx * g} ${y}H${x + dx * L}`, `M${x} ${y + dy * g}V${y + dy * L}`);
    }
  }
  return `<svg class="marks" width="${PAGE_W}" height="${PAGE_H}" viewBox="0 0 ${PAGE_W} ${PAGE_H}" xmlns="http://www.w3.org/2000/svg"><path d="${out.join('')}" fill="none" stroke="#9EA3B5" stroke-width="0.6"/></svg>`;
}
function page(cards, isBack, label) {
  const cells = cards.map(({ html, n }, k) => {
    const r = Math.floor(k / 2), col = isBack ? 1 - (k % 2) : k % 2;
    return `<div class="cell" data-face="${isBack ? 'back' : 'front'}" data-n="${n}" style="left:${X0 + col * (CW + GAP)}px;top:${Y0 + r * (CH + GAP)}px">${html}</div>`;
  }).join('\n');
  return `<section class="page" aria-label="${esc(label)}">${cutMarks()}\n${cells}\n</section>`;
}

const CSS = `
@page { size: letter; margin: 0 }
*{box-sizing:border-box}
html,body{margin:0;padding:0}
body{background:#fff;color:${N};font-family:'Plus Jakarta Sans',system-ui,sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.page{position:relative;width:${PAGE_W}px;height:${PAGE_H}px;overflow:hidden;background:#fff;page-break-after:always;break-after:page}
.page:last-child{page-break-after:auto;break-after:auto}
@media screen{body{background:#D9DCE8;padding:24px 0}.page{margin:0 auto 24px;box-shadow:0 2px 14px rgba(0,20,60,.18)}}
.marks{position:absolute;left:0;top:0}
.cell{position:absolute;width:${CW}px;height:${CH}px;background:#fff}
.card{position:absolute;left:10px;top:10px;width:311px;height:431px;background:#fff;border:3px solid ${N};border-radius:22px;box-shadow:5px 5px 0 ${N};overflow:hidden;display:flex;flex-direction:column}
.chip{font-size:11.5px;font-weight:800;color:${N};background:#fff;border:2px solid ${N};border-radius:999px;padding:3px 10px;white-space:nowrap;line-height:1.25}
/* anverso */
.band{height:50px;flex:none;background:var(--acc);border-bottom:3px solid ${N};display:flex;align-items:center;justify-content:space-between;padding:0 14px 0 16px}
.num{display:flex;align-items:baseline;color:var(--on)}
.num b{font-size:21px;font-weight:800;letter-spacing:.02em}
.num span{font-size:13px;font-weight:700}
.panel{margin:13px 13px 0;height:176px;flex:none;background:var(--panel);border-radius:16px;display:flex;align-items:center;justify-content:center}
.word{flex:1;min-height:0;display:flex;align-items:center;justify-content:center;padding:0 10px}
.word .hl{display:block;max-width:100%;overflow:hidden;white-space:nowrap;font-family:'Do Hyeon',sans-serif;line-height:1.08;color:${N};background:linear-gradient(transparent 62%,#F7DE94 62%,#F7DE94 92%,transparent 92%);padding:0 12px;border-radius:4px}
.foot{flex:none;display:flex;align-items:center;gap:10px;padding:0 13px 13px}
.play{width:54px;height:54px;flex:none;border-radius:50%;background:var(--acc);border:3px solid ${N};box-shadow:3px 3px 0 ${N};display:flex;align-items:center;justify-content:center}
.bubble{position:relative;margin-left:auto;margin-right:4px;background:#fff;border:2.5px solid ${N};border-radius:14px;padding:7px 11px;font-size:13.5px;font-weight:800;color:${N};white-space:nowrap}
.bubble i{position:absolute;right:-7.5px;top:50%;width:10px;height:10px;margin-top:-6px;background:#fff;border-top:2.5px solid ${N};border-right:2.5px solid ${N};transform:rotate(45deg)}
/* reverso */
.thin{height:14px;flex:none;background:var(--acc);border-bottom:3px solid ${N}}
.bbody{flex:1;min-height:0;display:flex;flex-direction:column;padding:12px 16px 10px}
.row1{display:flex;align-items:center;justify-content:space-between}
.row1 .cat{background:var(--panel)}
.row1 .n{font-size:12px;font-weight:700;color:#5B6190}
.krrow{display:flex;align-items:baseline;gap:10px;margin-top:12px}
.krrow .kr{font-family:'Do Hyeon',sans-serif;font-size:44px;line-height:1;color:${N}}
.krrow .rom{font-size:14px;font-weight:600;color:#6B7080;letter-spacing:.06em}
.mean{margin-top:5px;font-size:50px;font-weight:800;line-height:1.08;letter-spacing:-.02em;color:var(--ink);white-space:nowrap;overflow:hidden;padding-bottom:2px}
.ex{margin-top:12px;margin-right:3px;background:#FFF6DC;border:2.5px solid ${N};border-radius:14px;box-shadow:3px 3px 0 ${N};padding:8px 13px 10px;display:flex;flex-direction:column;gap:4px}
.exlab{display:flex;align-items:center;gap:6px;font-size:10.5px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:${N}}
.exkr{font-family:'Do Hyeon',sans-serif;font-size:25px;line-height:1.15;color:${N};white-space:nowrap;overflow:hidden}
.exkr .acc{color:var(--ink)}
.exes{font-size:13.5px;font-weight:600;color:#3A3F63;line-height:1.3}
.qrrow{margin-top:auto;display:flex;align-items:center;gap:10px}
.qr{width:82px;height:82px;flex:none;border:2px solid ${N};border-radius:10px;overflow:hidden;background:#fff}
.qr svg{display:block;width:78px;height:78px}
.bubble.l{margin-left:8px;margin-right:auto;display:flex;flex-direction:column;gap:1px;padding:7px 12px 8px;white-space:nowrap}
.bubble.l b{font-size:14.5px;font-weight:800;color:${N}}
.bubble.l small{font-size:10.5px;font-weight:600;color:#5B6190}
.bubble.l i{right:auto;left:-7.5px;border-top:none;border-right:none;border-left:2.5px solid ${N};border-bottom:2.5px solid ${N}}
.bfoot{margin-top:12px;padding-top:7px;border-top:2px dashed #D3D6F2;display:flex;align-items:center;justify-content:space-between;font-size:11px}
.bfoot .wk{font-weight:800;color:${N}}
.bfoot .brand{font-weight:700;color:#5B6190;letter-spacing:.02em}
`;

const FIT_JS = `
(function(){
  function fit(){
    document.querySelectorAll('.fit').forEach(function(el){
      var s=+el.dataset.max, min=+el.dataset.min; el.style.fontSize=s+'px';
      while(el.scrollWidth>el.clientWidth+0.5 && s>min){ s-=0.5; el.style.fontSize=s+'px'; }
    });
    document.documentElement.setAttribute('data-ready','1');
  }
  if(document.fonts && document.fonts.ready){ document.fonts.ready.then(fit); } else { window.addEventListener('load',fit); }
})();`;

async function build() {
  // contraste de textos de acento (regla de la casa: >= 4.5:1)
  for (const [k, c] of Object.entries(CAT)) {
    const a = contrast(c.on, c.acc), b = contrast(c.ink, '#FFFFFF'), d = contrast(c.ink, '#FFF6DC');
    console.log(`contraste ${k.padEnd(16)} banda ${a.toFixed(2)} · tinta/blanco ${b.toFixed(2)} · tinta/crema ${d.toFixed(2)}`);
    if (Math.min(a, b, d) < 4.5) throw new Error('Contraste insuficiente en ' + k);
  }
  for (const [lab, f, bg] of [['romanización', '#6B7080', '#FFFFFF'], ['gris', '#5B6190', '#FFFFFF'], ['traducción', '#3A3F63', '#FFF6DC']]) {
    console.log(`contraste ${lab.padEnd(16)} ${contrast(f, bg).toFixed(2)}`);
  }

  const qrs = {};
  for (const w of WORDS) {
    let s = await QR.toString(w.audio, { type: 'svg', errorCorrectionLevel: 'M', margin: 4, color: { dark: N, light: '#FFFFFF' } });
    s = s.replace(/<\?xml[^>]*>/, '').replace('<svg ', '<svg width="78" height="78" role="img" aria-label="QR audio ' + esc(w.kr) + '" ');
    qrs[w.n] = s.trim();
  }

  const pages = [];
  for (let i = 0; i < TOTAL; i += 4) {
    const group = WORDS.slice(i, i + 4);
    const a = i + 1, z = i + group.length;
    pages.push(page(group.map((w) => ({ n: w.n, html: front(w) })), false, `Anversos ${a}–${z}`));
    pages.push(page(group.map((w) => ({ n: w.n, html: back(w, qrs[w.n]) })), true, `Reversos ${a}–${z}`));
  }

  const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Flashcards Básico 1 · Chingu tigre</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
<style>${CSS}</style>
</head>
<body>
<!-- Academia Seúl · Flashcards Básico 1 · Estilo D (Chingu tigre). Imprimir en carta, 100 %, a doble cara por el borde largo. -->
${pages.join('\n')}
<script>${FIT_JS}</script>
</body>
</html>
`;
  fs.writeFileSync(HTML_OUT, html, 'utf8');
  console.log('HTML  ', HTML_OUT);
}

async function render() {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--disable-lcd-text'] });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 900, height: 1200, deviceScaleFactor: 2 });
    await page.goto('file:///' + HTML_OUT.replace(/\\/g, '/'), { waitUntil: 'networkidle0', timeout: 90000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(() => document.documentElement.getAttribute('data-ready') === '1', { timeout: 30000 });
    const fontsOk = await page.evaluate(() => [document.fonts.check('40px "Do Hyeon"', '우유'), document.fonts.check('800 20px "Plus Jakarta Sans"', 'leche')]);
    console.log('fuentes Do Hyeon / Plus Jakarta:', fontsOk.join(' / '));
    if (!fontsOk.every(Boolean)) throw new Error('Fuentes no cargadas');

    // revisión de desbordes
    const issues = await page.evaluate(() => {
      const out = [];
      document.querySelectorAll('.fit').forEach((el) => { if (el.scrollWidth > el.clientWidth + 1) out.push('fit ' + el.closest('.cell').dataset.n + ' ' + el.textContent); });
      document.querySelectorAll('.bbody').forEach((el) => { if (el.scrollHeight > el.clientHeight + 1) out.push('reverso alto ' + el.closest('.cell').dataset.n); });
      document.querySelectorAll('.exes').forEach((el) => { const lh = parseFloat(getComputedStyle(el).lineHeight); if (el.clientHeight > lh * 2 + 1) out.push('traducción >2 líneas ' + el.closest('.cell').dataset.n); });
      document.querySelectorAll('.front').forEach((el) => { if (el.scrollHeight > el.clientHeight + 1) out.push('anverso alto ' + el.closest('.cell').dataset.n); });
      return out;
    });
    console.log(issues.length ? 'AVISOS: ' + issues.join(' | ') : 'sin desbordes');

    await page.pdf({ path: PDF_OUT, format: 'letter', printBackground: true, preferCSSPageSize: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
    console.log('PDF   ', PDF_OUT);

    // capturas de cada cara (pantalla)
    await page.emulateMediaType('screen');
    const shots = { front: {}, back: {} };
    const dump = process.env.CARDS_DIR;
    if (dump) fs.mkdirSync(dump, { recursive: true });
    for (const face of ['front', 'back']) {
      for (const w of WORDS) {
        const el = await page.$(`.cell[data-face="${face}"][data-n="${w.n}"]`);
        const buf = await el.screenshot({ type: 'png' });
        shots[face][w.n] = Buffer.from(buf).toString('base64');
        if (dump) fs.writeFileSync(path.join(dump, `${face}_${num(w.n)}.png`), buf);
      }
    }

    // hoja de contacto
    const sheet = await browser.newPage();
    await sheet.setViewport({ width: 1340, height: 900, deviceScaleFactor: 1 });
    const row = (face) => WORDS.map((w) => `<figure><img src="data:image/png;base64,${shots[face][w.n]}"><figcaption>${num(w.n)} · ${esc(w.kr)}</figcaption></figure>`).join('');
    await sheet.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>
      body{margin:0;background:#EEF0F7;font-family:'Segoe UI',sans-serif;color:${N}}
      .wrap{padding:22px 24px 26px}
      h1{font-size:20px;margin:0 0 4px}
      h2{font-size:15px;margin:18px 0 10px;letter-spacing:.06em;text-transform:uppercase}
      p{margin:0;font-size:12.5px;color:#4A5078}
      .grid{display:grid;grid-template-columns:repeat(6,206px);gap:12px}
      figure{margin:0}
      img{display:block;width:206px;height:auto}
      figcaption{font-size:11.5px;color:#4A5078;margin-top:3px;text-align:center}
    </style></head><body><div class="wrap">
      <h1>Flashcards Básico 1 · Estilo D · Chingu tigre (marca)</h1>
      <p>12 palabras · 24 caras · tarjetas de 3,5 × 4,75 in · imprimir en carta a doble cara por el borde largo</p>
      <h2>Anversos</h2><div class="grid">${row('front')}</div>
      <h2>Reversos</h2><div class="grid">${row('back')}</div>
    </div></body></html>`, { waitUntil: 'load' });
    await sheet.evaluate(() => Promise.all([...document.images].map((i) => i.decode())));
    await sheet.screenshot({ path: PNG_OUT, fullPage: true });
    console.log('PNG   ', PNG_OUT);
  } finally {
    await browser.close();
  }
}

(async () => {
  await build();
  await render();
})().catch((e) => { console.error(e); process.exit(1); });
