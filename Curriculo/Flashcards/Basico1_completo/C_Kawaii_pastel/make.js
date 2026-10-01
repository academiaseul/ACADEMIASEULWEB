// Flashcards Básico 1 · MAZO COMPLETO · estilo C · Kawaii pastel
// Base: ../../Basico1_5_estilos/C_Kawaii_pastel/build.js (mazo aprobado de 12 tarjetas).
//
// Uso (desde cualquier carpeta; puppeteer-core, qrcode, jsqr y pngjs viven en el scratchpad):
//   node make.js                    PDFs por semana (_S1 … _S8), el _completo y vista_S1.png … vista_S8.png
//   node make.js --semana 3         solo la semana 3 (PDF + vista); se puede repetir: --semana 3 --semana 4
//   node make.js --galeria          galeria_ilustraciones.png: todas las ilustraciones/<hex>.svg sobre el color de su categoría
//   node make.js --galeria 우유,학생  solo esas palabras (en coreano o en hex)
//   node make.js --faltan           palabras sin ilustración (n, semana, categoría, archivo esperado, dibujo)
//   node make.js --hex 우유          nombre de archivo de una palabra (ec9ab0ec9ca0.svg)
//   Opciones: --datos <json>  --salida <carpeta>  --sin-qr (no decodifica los QR)  --sin-html (no deja tarjetas.html)
//
// Datos: ../palabras_basico1.json (163 objetos: n, kr, rom, es, semana, tipo, categoria, ejemplo_kr, ejemplo_es,
//        audio, audio_ejemplo, dibujo, tipo_dibujo). Si no existe, usa ../../Basico1_5_estilos/palabras.json (12).
// Ilustraciones: ilustraciones/<hex UTF-8 de kr>.svg (ver ilustraciones/_GUIA.md). Si falta, anverso tipográfico.
const fs = require('fs');
const path = require('path');
const SCRATCH = 'C:/Users/Chingu/AppData/Local/Temp/claude/C--Users-Chingu-Desktop-ACADEMIASEULWEB/d4111e1b-5523-44ea-97b2-b1a1d9545b9e/scratchpad';
const req = require('module').createRequire(SCRATCH + '/package.json');
const reqRev = require('module').createRequire(SCRATCH + '/revhoja/package.json');

const DIR = __dirname;
const REPO = path.resolve(DIR, '..', '..', '..', '..');
const ILU = path.join(DIR, 'ilustraciones');
const ESTILO = 'C_Kawaii_pastel';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

// ---------- argumentos ----------
const argv = process.argv.slice(2);
const opt = { semanas: [], galeria: null, faltan: false, hex: null, datos: null, salida: null, qr: true, html: true };
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === '--semana') opt.semanas.push(+argv[++i]);
  else if (a === '--galeria') opt.galeria = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : '';
  else if (a === '--faltan') opt.faltan = true;
  else if (a === '--hex') opt.hex = argv[++i];
  else if (a === '--datos') opt.datos = path.resolve(argv[++i]);
  else if (a === '--salida') opt.salida = path.resolve(argv[++i]);
  else if (a === '--sin-qr') opt.qr = false;
  else if (a === '--sin-html') opt.html = false;
  else { console.error('Opción desconocida: ' + a); process.exit(2); }
}
const OUT = opt.salida || DIR;
const hexDe = (kr) => Buffer.from(String(kr).normalize('NFC'), 'utf8').toString('hex');
if (opt.hex) { console.log(hexDe(opt.hex) + '.svg'); process.exit(0); }

// ---------- marca y paleta ----------
const AZUL = '#4236F6', NAVY = '#003478', DORADO = '#E8B84B';

// Sello del tigre v2 (línea, sin marco), vector de una tinta: ../../marca/sello_linea_v2.svg (ver marca/LEEME.md).
// Va UNA vez como <symbol id="sello-as"> al inicio del documento y cada cara lo usa con <use>; el color sale de style="color:…".
// Colores permitidos: azul #4236F6, lila #A99BFF, crema #F3F0E4 (fondos oscuros), negro #111. Nunca coral ni rosado.
const SELLO_LILA = '#A99BFF';   // anverso: suave, esquina inferior derecha
const SELLO_AZUL = AZUL;        // reverso: al pie, junto a "Academia Seúl"
const SELLO_ANV_IN = 0.36, SELLO_REV_IN = 0.32; // ancho en pulgadas (96 px = 1 in)
const SELLO = (() => {
  const f = path.resolve(DIR, '..', '..', 'marca', 'sello_linea_v2.svg');
  const s = fs.readFileSync(f, 'utf8');
  const vb = (s.match(/viewBox\s*=\s*"([^"]+)"/) || [])[1];
  // las 5 rutas son de la misma tinta (nonzero, transform identidad): se unen en una sola
  const d0 = [...s.matchAll(/\sd="([^"]+)"/g)].map((m) => m[1].trim()).join(' ');
  if (!vb || !d0) throw new Error('No pude leer el sello: ' + f);
  if (!/matrix\(1 0 0 1 0 0\)/.test(s) || /matrix\((?!1 0 0 1 0 0\))/.test(s)) throw new Error('El sello trae transformaciones: revisar antes de unir rutas');
  const [x0, y0, w, h] = vb.split(/[\s,]+/).map(Number);
  // Chrome escribe la ruta en el PDF una vez por tarjeta (326 veces) con las coordenadas tal cual vienen: "243.44922 526.47656".
  // Se lleva a un lienzo propio 0 0 ≈1000 y se redondea a enteros (error ≤ 0,07 unidades del original, invisible a 0,3 in):
  // la ruta pesa menos de la mitad y el PDF completo no engorda más de lo justo.
  const K = 999 / Math.max(w, h);
  const tok = d0.match(/[MCLZmclz]|-?\d*\.?\d+(?:e-?\d+)?/g);
  let out = '', xy = 0;
  for (const t of tok) {
    if (/^[MCLZ]$/.test(t)) { out += (out ? ' ' : '') + t; xy = 0; continue; }
    if (/^[a-z]$/.test(t)) throw new Error('El sello trae comandos relativos (' + t + '): adaptar el normalizador');
    const v = Math.round((+t - (xy % 2 ? y0 : x0)) * K);
    out += (/[MCLZ]$/.test(out) ? '' : ' ') + v; xy++;
  }
  return { vb: `0 0 ${Math.round(w * K)} ${Math.round(h * K)}`, d: out.replace(/([MCLZ]) ?/g, '$1'), ratio: h / w };
})();
const selloSymbol = () => `<svg class="kw-defs" width="0" height="0" aria-hidden="true" focusable="false"><symbol id="sello-as" viewBox="${SELLO.vb}"><path fill="currentColor" d="${SELLO.d}"/></symbol></svg>`;
const sello = (clase, pulgadas, color) => {
  const w = +(pulgadas * 96).toFixed(2), h = +(w * SELLO.ratio).toFixed(2);
  return `<svg class="${clase}" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="color:${color}" role="img" aria-label="Sello de Academia Seúl"><use href="#sello-as" width="${w}" height="${h}"/></svg>`;
};

// 10 categorías exactas. bg = panel del dibujo y caja del ejemplo · bd = borde · gr = suelo (.kw-suelo).
// Cada familia de tono tiene una versión clara y una media, para distinguirlas también por luminosidad.
const CAT = {
  'Personas y familia':          { bg: '#FFDAB9', bd: '#EFC08E', gr: '#F2C497' }, // durazno         L 0.76 (ΔE00 10,5 con Lugares; antes #FFE0BD daba 7,8)
  'Comida y bebida':             { bg: '#CDE8FF', bd: '#B4D6F7', gr: '#B3D5F6' }, // celeste         L 0.78 (aprobado)
  'Objetos':                     { bg: '#E6E1FF', bd: '#CFC8FF', gr: '#D2CBFA' }, // lila            L 0.78 (aprobado)
  'Lugares':                     { bg: '#FFF1C9', bd: '#EFD995', gr: '#F0DA9C' }, // mantequilla     L 0.88 (aprobado)
  'Naturaleza y animales':       { bg: '#CFF2E3', bd: '#ABDFC7', gr: '#A6DEC4' }, // menta           L 0.82 (aprobado)
  'Acciones':                    { bg: '#F8D27A', bd: '#E2B44E', gr: '#EDBF5C' }, // dorado medio    L 0.68
  'Tiempo y rutina':             { bg: '#A9C9F7', bd: '#8DB3EC', gr: '#8FB4EE' }, // azul medio      L 0.57
  'Saludos y frases':            { bg: '#DDF0A8', bd: '#C3DE84', gr: '#C6E08C' }, // lima            L 0.81
  'Preguntas y palabras útiles': { bg: '#C6BBFA', bd: '#AEA0F2', gr: '#ADA1F0' }, // lavanda media   L 0.54
  'Posición':                    { bg: '#9EDDC9', bd: '#7FCAB1', gr: '#80CBB3' }, // menta media     L 0.63
};
const CAT_DEFECTO = { bg: '#E6E1FF', bd: '#CFC8FF', gr: '#D2CBFA' };
// Brillos que se ven sobre cada fondo (blanco siempre): sin dorado sobre amarillos, sin lila sobre lilas/azul medio.
const SIN_DORADO = ['Lugares', 'Acciones'];
const SIN_LILA = ['Objetos', 'Preguntas y palabras útiles', 'Tiempo y rutina'];
const sinTilde = (s) => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
const ALIAS = { 'naturaleza': 'Naturaleza y animales', 'animales': 'Naturaleza y animales' };
const catKey = (c) => {
  const k = sinTilde(c);
  for (const name of Object.keys(CAT)) if (sinTilde(name) === k) return name;
  return ALIAS[k] || String(c || '');
};

// Paleta de las ilustraciones (ver _GUIA.md). Fuera de paleta = aviso; rojo/rosado = error.
const PALETA = [
  // base
  '#003478', '#4236F6', '#E8B84B', '#FFFFFF', '#FFFDF8', '#FFF6E6', '#FFCBA0', '#7A70FF',
  // lilas
  '#E4E0FF', '#E0DAFF', '#D2CBFA', '#CFC8FF', '#C9C1FF', '#B9B0F5',
  // azules
  '#D6E3FF', '#C9DBFF', '#B5DDFB', '#B3D5F6', '#A6D6FA', '#9FD3FA', '#8FB6FF', '#8CCBF6', '#7FC3F4', '#6FB8EE', '#6AB2EC',
  // verdes
  '#D6F4DD', '#CDEFE0', '#C6F0DE', '#A6E1B4', '#A3E0C6', '#A6DEC4', '#8ED3A0', '#7FD0B0', '#6CC7A4',
  // amarillos
  '#FFF3CC', '#FFF2D4', '#FBE08A', '#FBDD7E', '#F9DD8E', '#F6D47A', '#F3D27A', '#F0DA9C', '#E2B44E',
  // madera, pan, café, pelaje
  '#E9D6C0', '#E9C48E', '#E7B46E', '#E2B271', '#D9A462', '#C99A5E', '#8C6448', '#E8A866',
  // pieles y pelo (personas)
  '#FFE4C8', '#F2C99A', '#C98F5E', '#3B4566', '#DADCE6',
  // grises fríos (metal, pantallas, piedra)
  '#F1F2F7', '#D5D9E4', '#A9AFC3', '#6E7591',
  // fondos y suelos de categoría
  ...Object.values(CAT).flatMap((c) => [c.bg, c.bd, c.gr]),
].map((h) => h.toUpperCase());

// ---------- utilidades ----------
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// "이거 · 그거 · 저거": el punto medio queda pegado a la palabra anterior al partir la línea
const txt = (s) => esc(s).replace(/ · /g, ' · ');
// Significado en español con hangul ("nosotros; "mi" en 우리 엄마"): las palabras coreanas seguidas quedan unidas
// (espacio duro) y, con word-break: keep-all, nunca se parte una palabra coreana por sílabas.
const txtEs = (s) => txt(s).replace(/([ᄀ-ᇿ㄰-㆏가-힣]) (?=[ᄀ-ᇿ㄰-㆏가-힣])/g, '$1 ');
// Hangul en serie ("이거 · 그거 · 저거", "추석 · 설날"), anverso y reverso: espacios finos alrededor del punto. El espacio de Jua
// es muy ancho y con espacios normales "추석 · 설날" quedaba con huecos enormes (QC 1 oct 2026). Jua no trae el punto medio
// (caía en Noto Sans KR, de ancho completo): el punto va en Nunito (.pt).
const krAnverso = (s) => (String(s).split(' · ').length >= 2 ? esc(s).replace(/ · /g, ' <span class="pt">·</span> ') : txt(s));
const rgb = (h) => { const c = h.replace('#', ''); const f = c.length === 3 ? c.split('').map((x) => x + x).join('') : c; return [0, 2, 4].map((i) => parseInt(f.substr(i, 2), 16) / 255); };
const lum = (h) => { const v = rgb(h).map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4)); return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]; };
const contraste = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
const hsl = (h) => {
  const [r, g, b] = rgb(h), mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn, l = (mx + mn) / 2;
  if (!d) return { h: 0, s: 0, l };
  const s = d / (1 - Math.abs(2 * l - 1));
  let H = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  H *= 60; if (H < 0) H += 360;
  return { h: H, s, l };
};
const esRojoRosado = (h) => { const c = hsl(h); return c.s >= 0.25 && c.l < 0.97 && (c.h >= 290 || c.h < 22); };

// ---------- datos ----------
function cargaDatos() {
  const candidatos = opt.datos ? [opt.datos] : [path.resolve(DIR, '..', 'palabras_basico1.json'), path.resolve(DIR, '..', '..', 'Basico1_5_estilos', 'palabras.json')];
  const f = candidatos.find((c) => fs.existsSync(c));
  if (!f) throw new Error('No encuentro los datos: ' + candidatos.join(' | '));
  let raw = JSON.parse(fs.readFileSync(f, 'utf8'));
  if (!Array.isArray(raw)) raw = raw.palabras || raw.items || [];
  const vacio = (v) => v == null || /^[\s—–-]*$/.test(String(v));
  const lista = raw.map((p, i) => {
    const kr = String(p.kr || '').normalize('NFC').trim();
    return {
      n: Number.isFinite(+p.n) && +p.n > 0 ? +p.n : i + 1,
      kr,
      rom: vacio(p.rom) ? '' : String(p.rom).trim(),
      es: String(p.es || '').trim(),
      semana: +p.semana || 0,
      tipo: p.tipo || '',
      categoria: catKey(p.categoria),
      ejemplo_kr: vacio(p.ejemplo_kr) ? '' : String(p.ejemplo_kr).trim(),
      ejemplo_es: vacio(p.ejemplo_es) ? '' : String(p.ejemplo_es).trim(),
      audio: vacio(p.audio) ? `https://www.academiaseul.com/audio/kr/${hexDe(kr)}.mp3` : String(p.audio).trim(),
      audioInventado: vacio(p.audio),
      audio_ejemplo: p.audio_ejemplo || null,
      dibujo: p.dibujo || '',
      tipo_dibujo: p.tipo_dibujo || '',
      hex: hexDe(kr),
    };
  }).sort((a, b) => a.n - b.n);
  const total = Math.max(lista.length, ...lista.map((p) => p.n));
  return { f, lista, total };
}

// ---------- ilustraciones ----------
function leeIlustraciones() {
  const map = new Map();
  if (!fs.existsSync(ILU)) return map;
  for (const f of fs.readdirSync(ILU)) {
    if (!/^[0-9a-f]+\.svg$/i.test(f)) continue; // _GUIA.md, _plantilla.svg, etc. se ignoran
    map.set(f.replace(/\.svg$/i, '').toLowerCase(), path.join(ILU, f));
  }
  return map;
}
// Revisa un archivo y devuelve { inner, avisos, errores }
function revisaSvg(txt, nombre) {
  const avisos = [], errores = [];
  const s = txt.replace(/^\uFEFF/, '').replace(/<\?xml[^>]*\?>/g, '').replace(/<!DOCTYPE[^>]*>/gi, '').trim();
  const m = s.match(/<svg\b[^>]*>/i);
  const fin = s.lastIndexOf('</svg>');
  if (!m || fin < 0) { errores.push('no hay un <svg>…</svg> completo'); return { inner: null, avisos, errores }; }
  const vb = (m[0].match(/viewBox\s*=\s*"([^"]+)"/i) || [])[1];
  if (!vb || vb.trim().split(/[\s,]+/).map(Number).join(' ') !== '0 0 220 200') errores.push(`viewBox debe ser "0 0 220 200" (tiene "${vb || 'nada'}")`);
  const inner = s.slice(m.index + m[0].length, fin);
  if (/<(script|style|image|foreignObject|filter|linearGradient|radialGradient|pattern|mask|clipPath)\b/i.test(inner)) errores.push('usa elementos no permitidos (script/style/image/foreignObject/filtros/gradientes/patrones/máscaras)');
  if (/\sid\s*=/i.test(inner)) errores.push('define ids propios (chocan entre tarjetas): usa solo los defs compartidos kw-*');
  if (/href\s*=\s*"(?!#kw-)/i.test(inner)) errores.push('href que no apunta a un def kw-*');
  for (const ref of inner.matchAll(/href\s*=\s*"#([^"]+)"/gi)) if (!DEF_IDS.includes(ref[1])) errores.push(`#${ref[1]} no existe en los defs`);
  if (/style\s*=/i.test(inner)) avisos.push('atributo style: mejor atributos de presentación (fill, stroke…)');
  if (/rgba?\(|hsla?\(/i.test(inner)) avisos.push('colores rgb()/hsl(): usa hex de la paleta');
  if (/opacity\s*=/i.test(inner)) avisos.push('opacity: el estilo usa colores planos, sin transparencias');
  const colores = new Set([...inner.matchAll(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g)].map((x) => x[0].toUpperCase()));
  for (const c of colores) {
    const full = c.length === 4 ? '#' + c.slice(1).split('').map((x) => x + x).join('') : c;
    if (esRojoRosado(full)) errores.push(`color ${full} es rojo/rosado (prohibido)`);
    else if (!PALETA.includes(full)) avisos.push(`color ${full} fuera de paleta`);
  }
  if (!/kw-suelo/.test(inner) && !/[MLQT]s*-d/.test(inner)) avisos.push('sin suelo (<ellipse class="kw-suelo" …>); solo las escenas a sangre pueden omitirlo');
  if (!/#kw-cara|#kw-ojo/.test(inner) && !/fill="#003478"\s*\/>/.test(inner)) avisos.push('¿sin cara kawaii? (kw-cara, kw-ojo o ojos propios)');
  return { inner, avisos, errores, nombre };
}

// ---------- defs compartidos (las ilustraciones solo los referencian) ----------
const N = NAVY;
function caraBase(o) { // misma geometría que face() del mazo aprobado
  const { ex, r, cdx, cdy = 11, crx, cry, mw = 6, my = 8, mejillas = true } = o;
  const hl = +(r * 0.33).toFixed(2);
  return [
    mejillas ? `<ellipse cx="${-cdx}" cy="${cdy}" rx="${crx}" ry="${cry}" fill="#FFCBA0"/><ellipse cx="${cdx}" cy="${cdy}" rx="${crx}" ry="${cry}" fill="#FFCBA0"/>` : '',
    `<circle cx="${-ex}" cy="0" r="${r}" fill="${N}"/><circle cx="${ex}" cy="0" r="${r}" fill="${N}"/>`,
    `<circle cx="${-ex + hl}" cy="${-hl}" r="${hl}" fill="#FFFFFF"/><circle cx="${ex + hl}" cy="${-hl}" r="${hl}" fill="#FFFFFF"/>`,
    `<path d="M${-mw} ${my} Q0 ${my + 7} ${mw} ${my}" fill="none" stroke="${N}" stroke-width="2.6" stroke-linecap="round"/>`,
  ].join('');
}
const MEJILLAS = `<ellipse cx="-27" cy="11" rx="8" ry="5" fill="#FFCBA0"/><ellipse cx="27" cy="11" rx="8" ry="5" fill="#FFCBA0"/>`;
const DEFS = {
  'kw-brillo': `<path id="kw-brillo" d="M0 -1 Q0.2 -0.2 1 0 Q0.2 0.2 0 1 Q-0.2 0.2 -1 0 Q-0.2 -0.2 0 -1 Z"/>`,
  'kw-ojo': `<g id="kw-ojo"><circle r="6" fill="${N}"/><circle cx="1.98" cy="-1.98" r="1.98" fill="#FFFFFF"/></g>`,
  'kw-cara': `<g id="kw-cara">${caraBase({ ex: 15, r: 6, cdx: 27, crx: 8, cry: 5 })}</g>`,
  'kw-cara-chica': `<g id="kw-cara-chica">${caraBase({ ex: 12, r: 5.3, cdx: 0, crx: 0, cry: 0, mw: 5, my: 7, mejillas: false })}</g>`,
  'kw-cara-feliz': `<g id="kw-cara-feliz">${MEJILLAS}<path d="M-21 2 Q-15 -7 -9 2 M9 2 Q15 -7 21 2" fill="none" stroke="${N}" stroke-width="3" stroke-linecap="round"/><path d="M-7 7 Q0 8 7 7 Q6.5 17 0 17 Q-6.5 17 -7 7 Z" fill="${N}" stroke="${N}" stroke-width="1.5" stroke-linejoin="round"/></g>`,
  'kw-cara-dormida': `<g id="kw-cara-dormida">${MEJILLAS}<path d="M-21 -1 Q-15 6 -9 -1 M9 -1 Q15 6 21 -1" fill="none" stroke="${N}" stroke-width="3" stroke-linecap="round"/><path d="M-4 10 Q0 13 4 10" fill="none" stroke="${N}" stroke-width="2.6" stroke-linecap="round"/></g>`,
  'kw-cara-o': `<g id="kw-cara-o">${MEJILLAS}<circle cx="-15" cy="0" r="6" fill="${N}"/><circle cx="15" cy="0" r="6" fill="${N}"/><circle cx="-13.02" cy="-1.98" r="1.98" fill="#FFFFFF"/><circle cx="16.98" cy="-1.98" r="1.98" fill="#FFFFFF"/><ellipse cx="0" cy="12" rx="3.6" ry="4.4" fill="${N}"/></g>`,
};
const DEF_IDS = Object.keys(DEFS);
const defsSvg = () => `<svg class="kw-defs" width="0" height="0" aria-hidden="true" focusable="false"><defs>${Object.values(DEFS).join('')}</defs></svg>`;

// ---------- íconos ----------
const speaker = (size, color) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" aria-hidden="true"><path d="M4 9.5 H7.5 L12 5.5 V18.5 L7.5 14.5 H4 Z" stroke-width="2" stroke-linejoin="round"/><path d="M15.5 9 A4 4 0 0 1 15.5 15" stroke-width="2" stroke-linecap="round"/><path d="M18.5 6.5 A7.5 7.5 0 0 1 18.5 17.5" stroke-width="2" stroke-linecap="round"/></svg>`;
const sparkle = (size, fill) => `<svg width="${size}" height="${size}" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 1 Q11.8 8.2 19 10 Q11.8 11.8 10 19 Q8.2 11.8 1 10 Q8.2 8.2 10 1 Z" fill="${fill}"/></svg>`;
const brillo = (x, y, s, fill) => `<use href="#kw-brillo" transform="translate(${x} ${y}) scale(${s})" fill="${fill}"/>`;
const punto = (x, y, r, fill) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;

// Adorno del anverso tipográfico (panel 292 × 346): brillos, puntos y la nubecita kawaii sobre su suelo.
function adornoTipo(c, cat) {
  const oro = SIN_DORADO.includes(cat) ? '#FFFFFF' : DORADO;
  const lila = SIN_LILA.includes(cat) ? '#FFFFFF' : '#CFC8FF';
  return `<svg class="adorno" viewBox="0 0 292 346" width="292" height="346" aria-hidden="true">
    ${brillo(250, 44, 10, '#FFFFFF')}${brillo(30, 78, 7, oro)}${brillo(262, 210, 6, lila)}${brillo(36, 236, 8, '#FFFFFF')}
    ${punto(270, 92, 3, '#FFFFFF')}${punto(24, 150, 2.5, '#FFFFFF')}${punto(66, 300, 2.5, oro)}${punto(228, 292, 2.5, '#FFFFFF')}
    <ellipse class="kw-suelo" cx="146" cy="326" rx="54" ry="7"/>
    <g transform="translate(146 300)">
      <path d="M-34 22 Q-50 22 -50 8 Q-50 -6 -36 -7 Q-34 -24 -16 -25 Q-6 -36 8 -32 Q22 -30 26 -18 Q44 -20 48 -4 Q54 12 40 22 Z" fill="#FFFFFF" stroke="${N}" stroke-width="3" stroke-linejoin="round"/>
      <ellipse cx="-20" cy="-17" rx="6" ry="3.4" fill="#E4E0FF" transform="rotate(-25 -20 -17)"/>
      <use href="#kw-cara-chica" transform="translate(0 0) scale(0.9)"/>
      <ellipse cx="-17" cy="10" rx="5" ry="3.2" fill="#FFCBA0"/><ellipse cx="17" cy="10" rx="5" ry="3.2" fill="#FFCBA0"/>
    </g>
  </svg>`;
}

// Significado: "hermana mayor (lo dice una mujer)" -> principal + nota pequeña
function partesEs(es) {
  const m = es.match(/^(.*?)\s*(\([^)]*\))\s*(.*)$/);
  if (m && m[1].trim()) return { main: (m[1] + (m[3] ? ' ' + m[3] : '')).trim(), nota: m[2] };
  return { main: es, nota: '' };
}

// ---------- tarjetas ----------
function construyeHtml(lista, total, ilu, qrs) {
  const nn = (n) => String(n).padStart(3, '0') + '/' + String(total).padStart(3, '0');
  const front = (p) => {
    const c = CAT[p.categoria] || CAT_DEFECTO;
    const vars = `--bg:${c.bg};--bd:${c.bd};--suelo:${c.gr}`;
    const svg = ilu.get(p.n);
    if (svg) {
      return `<div class="card front" data-n="${p.n}" data-semana="${p.semana}"><div class="inner">
      <div class="art" style="${vars}">
        <div class="num">${nn(p.n)}</div>
        <svg class="ill" viewBox="0 0 220 200" width="268" height="244" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(p.es)}">${svg}</svg>
      </div>
      <div class="word">
        <div class="hangul" lang="ko">${krAnverso(p.kr)}</div>
        <div class="audio">${speaker(24, AZUL)}</div>
      </div>
      ${sello('sello-anv', SELLO_ANV_IN, SELLO_LILA)}
    </div></div>`;
    }
    // anverso tipográfico de reserva: hangul muy grande sobre el color de la categoría
    const tinta = contraste(c.bg, AZUL) >= 4.5 ? AZUL : NAVY;
    return `<div class="card front tipo" data-n="${p.n}" data-semana="${p.semana}"><div class="inner">
      <div class="art tipo-art" style="${vars}">
        <div class="num">${nn(p.n)}</div>
        ${adornoTipo(c, p.categoria)}
        <div class="tipo-zona"><div class="hangul-big" lang="ko" style="color:${tinta}">${txt(p.kr)}</div></div>
      </div>
      <div class="word solo-audio"><div class="audio">${speaker(24, AZUL)}</div></div>
      ${sello('sello-anv', SELLO_ANV_IN, SELLO_LILA)}
    </div></div>`;
  };
  const back = (p) => {
    const c = CAT[p.categoria] || CAT_DEFECTO;
    const { main, nota } = partesEs(p.es);
    const ex = p.ejemplo_kr ? `<div class="ex" style="background:${c.bg};border-color:${c.bd}">
        <div class="ex-label">Ejemplo</div>
        <div class="ex-kr" lang="ko">${esc(p.ejemplo_kr)}</div>
        ${p.ejemplo_es ? `<div class="ex-es">${esc(p.ejemplo_es)}</div>` : ''}
      </div>` : '';
    return `<div class="card back" data-n="${p.n}" data-semana="${p.semana}"><div class="inner">
      <div class="top">
        <div class="pill" style="background:${c.bg};border-color:${c.bd}">${esc(p.categoria)}</div>
        <div class="num-sm">${sparkle(14, DORADO)}<span>${nn(p.n)}</span></div>
      </div>
      <div class="head">
        <div class="kr" lang="ko">${krAnverso(p.kr)}</div>
        ${p.rom ? `<div class="rom">${esc(p.rom)}</div>` : ''}
        <div class="es"><span class="es-main">${txtEs(main)}</span>${nota ? `<span class="es-nota">${txtEs(nota)}</span>` : ''}</div>
      </div>
      <div class="divider"><span></span>${sparkle(12, '#CFC8FF')}<span></span></div>
      ${ex}
      <div class="foot">
        <div class="foot-l">
          ${sello('sello-rev', SELLO_REV_IN, SELLO_AZUL)}
          <div class="foot-txt">
            <div class="lvl">Básico 1 · Semana ${p.semana || '—'}</div>
            <div class="brand">Academia Seúl</div>
          </div>
        </div>
        <div class="qr">
          <div class="qr-box">${qrs.get(p.n)}</div>
          <div class="qr-cap">${speaker(11, NAVY)}<span>Escúchala</span></div>
        </div>
      </div>
    </div></div>`;
  };

  // Página carta: 816 × 1056 px (96 dpi). Tarjeta 336 × 456 (3,5 × 4,75 in). Separación 24.
  const X = [60, 420], Y = [60, 540], W = 336, H = 456;
  const cutMarks = (slots) => {
    const L = 11, G = 3; let s = '';
    for (const [x, y] of slots) {
      for (const [cx, cy, dx, dy] of [[x, y, -1, -1], [x + W, y, 1, -1], [x, y + H, -1, 1], [x + W, y + H, 1, 1]]) {
        s += `<path d="M${cx + dx * G} ${cy} L${cx + dx * (G + L)} ${cy} M${cx} ${cy + dy * G} L${cx} ${cy + dy * (G + L)}"/>`;
      }
    }
    return `<svg class="cuts" width="816" height="1056" viewBox="0 0 816 1056" aria-hidden="true"><g stroke="#8E8E8E" stroke-width="0.6" fill="none">${s}</g></svg>`;
  };

  const semanas = [...new Set(lista.map((p) => p.semana))].sort((a, b) => a - b);
  const pages = [];
  for (const s of semanas) {
    const deLa = lista.filter((p) => p.semana === s);
    const hojas = Math.ceil(deLa.length / 4);
    for (let g = 0; g < hojas; g++) {
      const grupo = deLa.slice(g * 4, g * 4 + 4);
      const pie = (lado) => `<div class="pie">Básico 1 · Kawaii pastel · Semana ${s || '—'} · hoja ${g + 1}/${hojas} · ${lado} · ${nn(grupo[0].n).split('/')[0]}–${nn(grupo[grupo.length - 1].n)} · imprimir a doble cara, borde largo</div>`;
      const fPos = grupo.map((p, i) => [X[i % 2], Y[Math.floor(i / 2)]]);
      const fSlots = grupo.map((p, i) => `<div class="slot" style="left:${fPos[i][0]}px;top:${fPos[i][1]}px">${front(p)}</div>`).join('');
      pages.push(`<section class="page" data-semana="${s}" data-lado="anversos">${cutMarks(fPos)}${fSlots}${pie('anversos')}</section>`);
      // reversos: columnas invertidas [2 1 / 4 3] para doble cara por el borde largo
      const bPos = grupo.map((p, i) => [X[1 - (i % 2)], Y[Math.floor(i / 2)]]);
      const bSlots = grupo.map((p, i) => `<div class="slot" style="left:${bPos[i][0]}px;top:${bPos[i][1]}px">${back(p)}</div>`).join('');
      pages.push(`<section class="page" data-semana="${s}" data-lado="reversos">${cutMarks(bPos)}${bSlots}${pie('reversos')}</section>`);
    }
  }

  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Flashcards Básico 1 · Kawaii pastel</title>
<meta name="description" content="Academia Seúl · ${lista.length} flashcards de Básico 1 (octubre 2026), estilo C Kawaii pastel. Carta, 4 tarjetas por hoja, doble cara por el borde largo.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Jua&family=Nunito:wght@600;700;800;900&display=swap" rel="stylesheet">
<style>
@page { size: letter; margin: 0 }
:root {
  --azul: ${AZUL}; --navy: ${NAVY}; --dorado: ${DORADO};
  --crema: #FFFDF8; --lila: #C9C1FF; --lila-lip: #DAD4FF; --gris: #5F6478; --gris-2: #4B5170; --texto-2: #3B4566;
}
* { box-sizing: border-box }
html, body { margin: 0; padding: 0; background: #FFFFFF }
body { -webkit-print-color-adjust: exact; print-color-adjust: exact; font-family: 'Nunito', 'Jua', sans-serif; color: var(--navy) }
.kw-defs { position: absolute; width: 0; height: 0; overflow: hidden }
.page { position: relative; width: 816px; height: 1056px; overflow: hidden; background: #FFFFFF; break-after: page; page-break-after: always }
.page.ultima { break-after: auto; page-break-after: auto }
@media screen {
  body { background: #E9E7F2; padding: 16px 0 }
  .page { margin: 0 auto 16px; box-shadow: 0 2px 10px rgba(0, 52, 120, .15) }
}
.cuts { position: absolute; inset: 0 }
.pie { position: absolute; left: 0; right: 0; bottom: 22px; text-align: center; font-size: 9px; font-weight: 700; color: var(--gris); letter-spacing: .3px }
.slot { position: absolute; width: 336px; height: 456px }
[lang="ko"], .es-main, .es-nota, .ex-es { word-break: keep-all; overflow-wrap: normal }
.pt { font-family: 'Nunito', sans-serif; font-weight: 800; margin: 0 .1em }

/* tarjeta: fondo lila punteado a sangre (tolera el desfase del doble cara) + tarjeta crema redondeada */
.card { width: 336px; height: 456px; padding: 7px 7px 9px; background-color: #F1EEFF; background-image: radial-gradient(#E0DAFF 1.4px, transparent 1.7px); background-size: 18px 18px; background-position: 4px 4px }
.inner { position: relative; width: 100%; height: 100%; border-radius: 24px; background: var(--crema); border: 2px solid var(--lila); box-shadow: 0 3px 0 var(--lila-lip); display: flex; flex-direction: column; overflow: hidden }

/* ---------- anverso ---------- */
.front .inner { padding: 13px }
.art { position: relative; height: 252px; flex: none; border-radius: 18px; border: 1.5px solid var(--bd); background: var(--bg); display: flex; align-items: center; justify-content: center; overflow: hidden }
.art .ill { display: block; margin-top: 4px; overflow: visible }
.kw-suelo { fill: var(--suelo) }
.num { position: absolute; top: 10px; left: 10px; z-index: 1; padding: 3px 10px; border-radius: 999px; background: #FFFFFF; color: var(--navy); font-weight: 800; font-size: 11px; letter-spacing: .5px }
.word { flex: 1; min-height: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; padding-top: 2px }
.hangul { font-family: 'Jua', sans-serif; font-size: 82px; line-height: 1; color: var(--azul); text-shadow: 0 4px 0 #DCD6FF; letter-spacing: 2px; white-space: nowrap; text-align: center; max-width: 100% }
.hangul.dos { line-height: 1.04; text-wrap: balance; letter-spacing: 1px }
.audio { flex: none; width: 46px; height: 46px; border-radius: 50%; background: #F0EDFF; border: 2px solid var(--azul); box-shadow: 0 3px 0 #CFC8FF; display: flex; align-items: center; justify-content: center }
/* anverso tipográfico */
.tipo-art { height: 346px; align-items: stretch; justify-content: stretch }
.adorno { position: absolute; left: 0; top: 0; width: 100%; height: 100% }
.tipo-zona { position: absolute; left: 16px; right: 16px; top: 34px; height: 228px; display: flex; align-items: center; justify-content: center }
.hangul-big { position: relative; font-family: 'Jua', sans-serif; font-size: 116px; line-height: 1; letter-spacing: 2px; text-align: center; white-space: nowrap; text-shadow: 0 5px 0 rgba(255, 255, 255, .8); max-width: 100% }
.hangul-big.dos { line-height: 1.06; text-wrap: balance; letter-spacing: 1px }
.solo-audio { padding-top: 0 }
/* sello del tigre: lila suave en la esquina inferior derecha, centrado a la altura del botón de audio (152 de 163 tarjetas)
   y alineado con el borde derecho del panel del dibujo; misma posición en todas */
.sello-anv { position: absolute; right: 13px; bottom: 29px; display: block; pointer-events: none }

/* ---------- reverso ---------- */
.back .inner { padding: 15px 17px 13px }
.top { display: flex; align-items: center; justify-content: space-between; gap: 8px; flex: none }
.pill { padding: 5px 12px; border-radius: 999px; border: 1.5px solid; color: var(--navy); font-weight: 800; font-size: 12px; line-height: 1.2; white-space: nowrap }
.num-sm { display: flex; align-items: center; gap: 5px; font-weight: 800; font-size: 11px; color: var(--gris-2); white-space: nowrap }
.head { display: flex; flex-direction: column; align-items: center; justify-content: safe center; padding: 6px 0 4px; flex: 1 1 auto; min-height: 0 }
.kr { font-family: 'Jua', sans-serif; font-size: 40px; line-height: 1.12; color: var(--navy); white-space: nowrap; text-align: center; max-width: 100% }
.kr.dos { text-wrap: balance; line-height: 1.08 }
.rom { font-weight: 700; font-size: 14px; color: var(--gris); letter-spacing: 1px; margin-top: 1px; text-align: center }
.es { display: flex; flex-direction: column; align-items: center; margin-top: 8px; max-width: 100% }
.es-main { font-weight: 900; font-size: 52px; line-height: 1.02; color: var(--azul); white-space: nowrap; text-align: center; max-width: 100% }
.es-main.dos { line-height: .98; text-wrap: balance }
.es-nota { font-weight: 800; font-size: 14px; line-height: 1.2; color: var(--gris-2); margin-top: 4px; text-align: center }
.divider { display: flex; align-items: center; gap: 8px; margin-top: 4px; flex: none }
.divider span { flex: 1; border-top: 2px dashed #D9D3FF }
.ex { margin-top: 10px; border-radius: 16px; border: 1.5px solid; padding: 9px 13px 10px; display: flex; flex-direction: column; gap: 2px; flex: none }
.ex-label { font-weight: 800; font-size: 10.5px; letter-spacing: 1.2px; text-transform: uppercase; color: var(--navy) }
.ex-kr { font-family: 'Jua', sans-serif; font-size: 22px; line-height: 1.25; color: var(--navy) }
.ex-es { font-weight: 700; font-size: 14px; line-height: 1.3; color: var(--texto-2) }
.foot { display: flex; align-items: flex-end; justify-content: space-between; margin-top: 10px; flex: none }
.foot-l { display: flex; align-items: center; gap: 7px; padding-bottom: 4px }
.foot-txt { display: flex; flex-direction: column; gap: 4px }
.sello-rev { flex: none; display: block }
.lvl { font-weight: 800; font-size: 12.5px; color: var(--navy) }
.brand { display: flex; align-items: center; gap: 5px; font-weight: 800; font-size: 10.5px; color: var(--gris-2) }
.qr { display: flex; flex-direction: column; align-items: center; gap: 2px }
.qr-box { width: 74px; height: 74px; border-radius: 8px; border: 1.5px solid #D9D3FF; overflow: hidden; background: #FFFFFF }
.qr-svg { display: block; width: 100%; height: 100% }
.qr-cap { display: flex; align-items: center; gap: 3px; font-weight: 800; font-size: 10.5px; color: var(--navy) }
</style>
</head>
<body>
${selloSymbol()}
${defsSvg()}
${pages.join('\n')}
<script>
(${ajustaTodo.toString()})();
</script>
</body>
</html>
`;
}

// Se ejecuta en el navegador: ajusta los textos al ancho/alto de la tarjeta.
function ajustaTodo() {
  function px(el, s) { el.style.fontSize = s + 'px'; }
  function fs(el) { return parseFloat(el.style.fontSize || getComputedStyle(el).fontSize); }
  // ancho real del texto (la línea más larga), no el de la caja: sirve igual en una línea y partido
  function anchoTexto(el) { var r = document.createRange(); r.selectNodeContents(el); return r.getBoundingClientRect().width; }
  function cabe(el, w, h) { return anchoTexto(el) <= w + 0.5 && el.scrollWidth <= el.clientWidth + 0.5 && (!h || el.offsetHeight <= h + 0.5); }
  // o: { w, h, max, min1 (una línea), max2, min2 (dos líneas), coma (partir en ", ") }
  function ajusta(el, o) {
    var w = o.w, s = o.max;
    el.classList.remove('dos'); el.style.whiteSpace = 'nowrap'; px(el, s);
    while (!cabe(el, w, o.h) && s > o.min1) px(el, --s);
    if (cabe(el, w, o.h)) return;
    var txt = el.textContent.trim();
    if (/\s/.test(txt)) {
      var sep = o.coma ? [', ', '; ', ' / '].find(function (x) { return txt.indexOf(x) > 0; }) : null;
      // dos significados unidos por un punto medio: cada uno empieza en su línea (el punto queda al final de la primera)
      if (!sep && o.coma && txt.split('·').length === 2) sep = [' · ', ' · '].find(function (x) { return txt.indexOf(x) > 0; }) || null;
      if (sep) {
        var partes = txt.split(sep);
        el.textContent = '';
        el.appendChild(document.createTextNode(partes[0] + (sep.trim() === '·' ? ' ·' : sep.trim().replace('/', ' /'))));
        el.appendChild(document.createElement('br'));
        el.appendChild(document.createTextNode(partes.slice(1).join(sep)));
      }
      el.style.whiteSpace = 'normal'; el.classList.add('dos');
      s = o.max2; px(el, s);
      while (!cabe(el, w, o.h2 || o.h) && s > o.min2) px(el, --s);
      return;
    }
    while (!cabe(el, w, o.h) && s > o.min2) px(el, --s);
  }
  function correr() {
    document.querySelectorAll('.card.front:not(.tipo) .hangul').forEach(function (el) {
      var word = el.parentElement;
      // "이거 · 그거 · 저거": mejor en una sola línea un poco más chica que partida con el punto colgando
      var serie = el.textContent.split('·').length >= 3;
      if (serie) el.style.letterSpacing = '0.5px';
      ajusta(el, { w: word.clientWidth - 6, h: word.clientHeight - 46 - 14, max: 82, min1: serie ? 40 : 50, max2: 58, min2: 26 });
    });
    document.querySelectorAll('.hangul-big').forEach(function (el) {
      var z = el.parentElement;
      ajusta(el, { w: z.clientWidth, h: z.clientHeight, max: 116, min1: 64, max2: 84, min2: 30 });
    });
    document.querySelectorAll('.card.back').forEach(function (card) {
      var inner = card.querySelector('.inner'), head = card.querySelector('.head');
      var w = head.clientWidth - 6;
      var kr = card.querySelector('.kr'), es = card.querySelector('.es-main');
      ajusta(kr, { w: w, max: 40, min1: 28, max2: 34, min2: 20, h2: 80 });
      ajusta(es, { w: w, max: 52, min1: 40, max2: 44, min2: 22, h2: 104, coma: true });
      // si la tarjeta igual se desborda, achica por etapas: primero un poco de todo, después más
      var pasos = [['.es-main', 36, 2], ['.ex-kr', 18, 1], ['.ex-es', 12.5, 0.5], ['.kr', 30, 2], ['.es-nota', 11, 0.5],
        ['.es-main', 20, 2], ['.kr', 20, 2], ['.ex-kr', 15, 1], ['.ex-es', 11.5, 0.5]];
      // significado corto ("y", "no", "sí"): no se achica primero; ceden antes el ejemplo y el hangul
      if (es.textContent.trim().length <= 6) pasos = [['.ex-kr', 18, 1], ['.ex-es', 12.5, 0.5], ['.kr', 30, 2], ['.es-nota', 11, 0.5]].concat(pasos);
      var guard = 0;
      while ((inner.scrollHeight > inner.clientHeight + 1 || head.scrollHeight > head.clientHeight + 1) && guard++ < 80) {
        var hecho = false;
        for (var i = 0; i < pasos.length && !hecho; i++) {
          var el = card.querySelector(pasos[i][0]);
          if (el && fs(el) - pasos[i][2] >= pasos[i][1]) { px(el, fs(el) - pasos[i][2]); hecho = true; }
        }
        if (!hecho) break;
      }
    });
    window.__listo = true;
  }
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(correr);
}

// ---------- QR ----------
async function generaQrs(lista) {
  const QR = req('qrcode');
  const qrs = new Map();
  for (const p of lista) {
    let svg = await QR.toString(p.audio, { type: 'svg', errorCorrectionLevel: 'M', margin: 4, color: { dark: '#003478ff', light: '#ffffffff' } });
    svg = svg.replace('<svg ', `<svg class="qr-svg" role="img" aria-label="QR: audio de ${esc(p.kr)}" `);
    qrs.set(p.n, svg);
  }
  return qrs;
}

// ---------- navegador ----------
async function abreNavegador() {
  const puppeteer = req('puppeteer-core');
  return puppeteer.launch({ executablePath: CHROME, args: ['--no-sandbox', '--disable-lcd-text', '--font-render-hinting=none'] });
}
async function cargaPagina(browser, htmlPath, revisarFuentes = true) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1100, deviceScaleFactor: 2 });
  await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0', timeout: 120000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() => window.__listo === true, { timeout: 120000 });
  if (revisarFuentes) {
    const fuentes = await page.evaluate(() => ({ jua: document.fonts.check('82px Jua', '우유'), nunito: document.fonts.check('900 52px Nunito', 'leche') }));
    if (!fuentes.jua || !fuentes.nunito) console.warn('AVISO: fuentes no cargadas (¿sin internet?)', fuentes);
  }
  return page;
}

// Hoja de contacto: anversos + reversos en miniatura (6 columnas, escala 0,5)
async function hojaContacto(page, ns, titulo, png) {
  await page.setViewport({ width: 1200, height: 1100, deviceScaleFactor: 2 });
  const box = await page.evaluate((ns, titulo) => {
    const old = document.getElementById('sheet'); if (old) old.remove();
    const sheet = document.createElement('div');
    sheet.id = 'sheet';
    sheet.style.cssText = 'position:absolute;left:0;top:0;z-index:99;background:#EFEBFF;padding:22px 24px 24px;width:' + (6 * 168 + 5 * 12 + 48) + 'px;font-family:Nunito,sans-serif';
    const title = (t) => { const h = document.createElement('div'); h.textContent = t; h.style.cssText = 'font-weight:900;font-size:16px;color:#003478;margin:4px 0 10px'; return h; };
    const grid = () => { const g = document.createElement('div'); g.style.cssText = 'display:grid;grid-template-columns:repeat(6,168px);gap:12px;margin-bottom:14px'; return g; };
    const add = (g, card) => {
      const w = document.createElement('div'); w.style.cssText = 'width:168px;height:228px;overflow:hidden;position:relative';
      const c = card.cloneNode(true); c.style.cssText = 'transform:scale(.5);transform-origin:0 0;position:absolute;left:0;top:0';
      w.appendChild(c); g.appendChild(w);
    };
    sheet.appendChild(title(titulo + ' — anversos'));
    const gf = grid(); ns.forEach((n) => add(gf, document.querySelector('.card.front[data-n="' + n + '"]'))); sheet.appendChild(gf);
    sheet.appendChild(title('Reversos'));
    const gb = grid(); ns.forEach((n) => add(gb, document.querySelector('.card.back[data-n="' + n + '"]'))); sheet.appendChild(gb);
    document.body.appendChild(sheet);
    window.scrollTo(0, 0);
    const r = sheet.getBoundingClientRect();
    return { width: r.width, height: r.height };
  }, ns, titulo);
  await page.setViewport({ width: Math.ceil(box.width), height: Math.ceil(box.height), deviceScaleFactor: 1.5 });
  const el = await page.$('#sheet');
  await el.screenshot({ path: png });
  await page.evaluate(() => document.getElementById('sheet').remove());
}

async function imprime(page, semana, pdf) {
  await page.evaluate((semana) => {
    const pages = [...document.querySelectorAll('.page')];
    pages.forEach((p) => { p.style.display = semana == null || p.dataset.semana === String(semana) ? '' : 'none'; p.classList.remove('ultima'); });
    const vis = pages.filter((p) => p.style.display !== 'none');
    if (vis.length) vis[vis.length - 1].classList.add('ultima');
  }, semana);
  await page.emulateMediaType('print');
  await page.pdf({ path: pdf, format: 'Letter', printBackground: true, preferCSSPageSize: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  await page.emulateMediaType('screen');
  await page.evaluate(() => document.querySelectorAll('.page').forEach((p) => { p.style.display = ''; p.classList.remove('ultima'); }));
}

const kb = (f) => (fs.statSync(f).size / 1024).toFixed(0) + ' KB';

// ---------- modos ----------
async function main() {
  const { f: datosF, lista, total } = cargaDatos();
  const archivos = leeIlustraciones();
  console.log(`Datos: ${path.relative(REPO, datosF)} · ${lista.length} palabras (numeración /${total}) · ilustraciones: ${archivos.size}`);

  // revisión de datos
  const dup = lista.filter((p, i) => lista.findIndex((q) => q.n === p.n) !== i);
  if (dup.length) console.warn('AVISO n repetidos: ' + dup.map((p) => p.n).join(', '));
  const sinCat = lista.filter((p) => !CAT[p.categoria]);
  if (sinCat.length) console.warn('AVISO categoría desconocida (color por defecto): ' + sinCat.map((p) => `${p.n} ${p.kr} "${p.categoria}"`).join(' · '));
  const sinSem = lista.filter((p) => !(p.semana >= 1 && p.semana <= 8));
  if (sinSem.length) console.warn('AVISO semana fuera de 1–8: ' + sinSem.map((p) => `${p.n} ${p.kr}`).join(' · '));
  const inventado = lista.filter((p) => p.audioInventado);
  if (inventado.length) console.warn('AVISO sin campo audio (se armó la URL por hex): ' + inventado.map((p) => p.kr).join(' · '));
  const pref = 'https://www.academiaseul.com/audio/kr/';
  const sinMp3 = lista.filter((p) => p.audio.startsWith(pref) && !fs.existsSync(path.join(REPO, 'public', 'audio', 'kr', decodeURIComponent(p.audio.slice(pref.length)))));
  if (sinMp3.length) console.warn('AVISO el QR apunta a un mp3 que no está en public/audio/kr: ' + sinMp3.map((p) => `${p.n} ${p.kr}`).join(' · '));

  if (opt.faltan) {
    const faltan = lista.filter((p) => !archivos.has(p.hex));
    console.log(`Sin ilustración: ${faltan.length} de ${lista.length}`);
    for (const p of faltan) console.log([String(p.n).padStart(3, '0'), 'S' + p.semana, p.kr, p.es, p.categoria, 'ilustraciones/' + p.hex + '.svg', p.tipo_dibujo, p.dibujo].join(' | '));
    const sobran = [...archivos.keys()].filter((h) => !lista.some((p) => p.hex === h));
    if (sobran.length) console.log('Archivos que no corresponden a ninguna palabra: ' + sobran.map((h) => h + ' (' + Buffer.from(h, 'hex').toString('utf8') + ')').join(' · '));
    return;
  }

  // ilustraciones: revisión y carga
  const ilu = new Map();
  let nErr = 0;
  const revisa = (hex) => {
    const r = revisaSvg(fs.readFileSync(archivos.get(hex), 'utf8'), hex);
    const kr = Buffer.from(hex, 'hex').toString('utf8');
    for (const e of r.errores) { console.warn(`ERROR ilustraciones/${hex}.svg (${kr}): ${e}`); nErr++; }
    for (const a of r.avisos) console.warn(`aviso ilustraciones/${hex}.svg (${kr}): ${a}`);
    return r.errores.length ? null : r.inner;
  };

  if (opt.galeria !== null) return galeria(lista, archivos, revisa);

  for (const p of lista) if (archivos.has(p.hex)) { const inner = revisa(p.hex); if (inner) ilu.set(p.n, inner); }
  const sobran = [...archivos.keys()].filter((h) => !lista.some((p) => p.hex === h));
  if (sobran.length) console.warn('AVISO archivos sin palabra: ' + sobran.map((h) => h + '.svg (' + Buffer.from(h, 'hex').toString('utf8') + ')').join(' · '));
  console.log(`Anversos ilustrados: ${ilu.size} · tipográficos de reserva: ${lista.length - ilu.size}${nErr ? ` · ${nErr} errores de ilustración (esas van tipográficas)` : ''}`);

  const qrs = await generaQrs(lista);
  const html = construyeHtml(lista, total, ilu, qrs);
  fs.mkdirSync(OUT, { recursive: true });
  const htmlPath = opt.html ? path.join(OUT, 'tarjetas.html') : path.join(require('os').tmpdir(), `kawaii_tarjetas_${process.pid}.html`);
  fs.writeFileSync(htmlPath, html, 'utf8');

  const browser = await abreNavegador();
  try {
    const page = await cargaPagina(browser, htmlPath);

    // revisión automática: nada se sale de su tarjeta
    const problemas = await page.evaluate(() => {
      const out = [];
      document.querySelectorAll('.card .inner').forEach((inner) => {
        const card = inner.parentElement, n = card.dataset.n, lado = card.classList.contains('front') ? 'anverso' : 'reverso';
        if (inner.scrollHeight > inner.clientHeight + 1) out.push(`${lado} ${n}: alto ${inner.scrollHeight} > ${inner.clientHeight}`);
        const head = inner.querySelector('.head');
        if (head && head.scrollHeight > head.clientHeight + 1) out.push(`${lado} ${n}: cabecera del reverso ${head.scrollHeight} > ${head.clientHeight}`);
        inner.querySelectorAll('.es-main, .ex-kr, .ex-es, .hangul, .hangul-big, .kr, .pill').forEach((el) => {
          const lim = el.classList.contains('hangul') || el.classList.contains('hangul-big') || el.classList.contains('kr') || el.classList.contains('es-main') ? el.parentElement.clientWidth : el.clientWidth;
          if (el.scrollWidth > lim + 1) out.push(`${lado} ${n}: ancho ${el.className} ${el.scrollWidth} > ${lim}`);
        });
        const top = inner.querySelector('.top');
        if (top && top.scrollWidth > top.clientWidth + 1) out.push(`${lado} ${n}: cabecera ancha`);
      });
      return out;
    });
    if (problemas.length) console.warn('AVISO desbordes:\n  ' + problemas.join('\n  '));
    else console.log('Revisión de desbordes: OK');

    // sello: dentro de la tarjeta y sin tocar número, audio, palabra, ilustración, QR ni textos
    const sellos = await page.evaluate(() => {
      const out = [], pos = new Set();
      const choca = (a, b, m) => a.left < b.right + m && b.left < a.right + m && a.top < b.bottom + m && b.top < a.bottom + m;
      const rectTexto = (el) => { const r = document.createRange(); r.selectNodeContents(el); return r.getBoundingClientRect(); };
      document.querySelectorAll('.card').forEach((card) => {
        const n = card.dataset.n, front = card.classList.contains('front'), lado = front ? 'anverso' : 'reverso';
        const s = card.querySelector(front ? '.sello-anv' : '.sello-rev');
        if (!s) { out.push(`${lado} ${n}: sin sello`); return; }
        const r = s.getBoundingClientRect(), c = card.getBoundingClientRect(), i = card.querySelector('.inner').getBoundingClientRect();
        if (r.left < i.left || r.right > i.right || r.top < i.top || r.bottom > i.bottom) out.push(`${lado} ${n}: el sello se sale de la tarjeta`);
        if (front) pos.add(`${Math.round(r.left - c.left)},${Math.round(r.top - c.top)},${Math.round(r.width)}`);
        const otros = front ? ['.num', '.audio', '.art'] : ['.qr', '.lvl', '.brand', '.ex'];
        for (const q of otros) { const e = card.querySelector(q); if (e && choca(r, e.getBoundingClientRect(), 3)) out.push(`${lado} ${n}: el sello toca ${q}`); }
        const t = card.querySelector('.hangul, .hangul-big');
        if (t && choca(r, rectTexto(t), 3)) out.push(`${lado} ${n}: el sello toca la palabra`);
      });
      if (pos.size > 1) out.push('el sello del anverso no está en la misma posición en todas: ' + [...pos].join(' | '));
      return out;
    });
    if (sellos.length) console.warn('AVISO sello:\n  ' + sellos.join('\n  '));
    else console.log('Revisión del sello: OK (misma posición, sin tocar nada)');

    // QR: se decodifican desde la página renderizada
    if (opt.qr) {
      const jsQR = reqRev('jsqr'), { PNG } = reqRev('pngjs');
      let ok = 0; const malos = [];
      for (const p of lista) {
        if (opt.semanas.length && !opt.semanas.includes(p.semana)) continue;
        const el = await page.$(`.card.back[data-n="${p.n}"] .qr-box`);
        const buf = await el.screenshot();
        const img = PNG.sync.read(Buffer.from(buf));
        const r = jsQR(new Uint8ClampedArray(img.data.buffer, img.data.byteOffset, img.data.length), img.width, img.height);
        if (r && r.data === p.audio) ok++; else malos.push(`${p.n} ${p.kr}: ${r ? r.data : 'no se lee'}`);
      }
      console.log(`QR decodificados: ${ok}${malos.length ? ' · FALLAN ' + malos.length + ':\n  ' + malos.join('\n  ') : ' · todos OK'}`);
    }

    const semanas = [...new Set(lista.map((p) => p.semana))].sort((a, b) => a - b).filter((s) => !opt.semanas.length || opt.semanas.includes(s));
    const base = `Flashcards_Basico1_${ESTILO}`;
    for (const s of semanas) {
      const pdf = path.join(OUT, `${base}_S${s}.pdf`);
      await imprime(page, s, pdf);
      const ns = lista.filter((p) => p.semana === s).map((p) => p.n);
      const png = path.join(OUT, `vista_S${s}.png`);
      await hojaContacto(page, ns, `Flashcards Básico 1 · C · Kawaii pastel · Semana ${s} (${ns.length} tarjetas)`, png);
      console.log(`S${s}: ${ns.length} tarjetas · ${path.basename(pdf)} ${kb(pdf)} · ${path.basename(png)} ${kb(png)}`);
    }
    if (!opt.semanas.length) {
      const pdf = path.join(OUT, `${base}_completo.pdf`);
      await imprime(page, null, pdf);
      console.log(`Completo: ${lista.length} tarjetas · ${path.basename(pdf)} ${kb(pdf)}`);
    }
  } finally {
    await browser.close();
    if (!opt.html) try { fs.unlinkSync(htmlPath); } catch (e) { /* nada */ }
  }
  console.log('Salida: ' + OUT);
}

// Galería: cada ilustración sobre el color de su categoría, con palabra y nombre de archivo (para revisar dibujos nuevos).
async function galeria(lista, archivos, revisa) {
  let hexes = [...archivos.keys()];
  if (opt.galeria) {
    const pedidos = opt.galeria.split(',').map((s) => s.trim()).filter(Boolean).map((s) => (/^[0-9a-f]+$/i.test(s) ? s.toLowerCase() : hexDe(s)));
    const no = pedidos.filter((h) => !archivos.has(h));
    if (no.length) console.warn('No existen: ' + no.map((h) => h + '.svg').join(', '));
    hexes = pedidos.filter((h) => archivos.has(h));
  }
  const orden = (h) => { const p = lista.find((q) => q.hex === h); return p ? p.n : 9999; };
  hexes.sort((a, b) => orden(a) - orden(b));
  const celdas = hexes.map((h) => {
    const inner = revisa(h);
    const p = lista.find((q) => q.hex === h);
    const kr = Buffer.from(h, 'hex').toString('utf8');
    const c = (p && CAT[p.categoria]) || CAT_DEFECTO;
    const cuerpo = inner ? `<svg class="ill" viewBox="0 0 220 200" width="268" height="244">${inner}</svg>` : `<div class="err">ERROR: ver consola</div>`;
    return `<div class="cel"><div class="art" style="--bg:${c.bg};--bd:${c.bd};--suelo:${c.gr}">${cuerpo}</div>
      <div class="lab"><b lang="ko">${esc(kr)}</b> · ${esc(p ? p.es : '(no está en los datos)')}<br><span>${p ? String(p.n).padStart(3, '0') + ' · ' + esc(p.categoria) + ' · ' : ''}${h}.svg</span></div></div>`;
  }).join('');
  const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Galería Kawaii</title>
<link href="https://fonts.googleapis.com/css2?family=Jua&family=Nunito:wght@700;900&display=swap" rel="stylesheet">
<style>body{margin:0;background:#EFEBFF;font-family:Nunito,sans-serif;color:#003478}#g{display:grid;grid-template-columns:repeat(${Math.min(5, Math.max(1, hexes.length))},292px);gap:14px;padding:20px;width:max-content}
.art{position:relative;width:292px;height:252px;border-radius:18px;border:1.5px solid var(--bd);background:var(--bg);display:flex;align-items:center;justify-content:center;overflow:hidden}
.ill{display:block;margin-top:4px;overflow:visible}.kw-suelo{fill:var(--suelo)}.lab{font-size:12px;margin-top:5px;line-height:1.35}.lab b{font-family:Jua,sans-serif;font-size:16px;font-weight:400}.lab span{color:#4B5170;font-size:10.5px}
.err{font-weight:900;color:#003478}.kw-defs{position:absolute;width:0;height:0}</style></head>
<body>${defsSvg()}<div id="g">${celdas}</div><script>(document.fonts?document.fonts.ready:Promise.resolve()).then(function(){window.__listo=true});</script></body></html>`;
  const tmp = path.join(require('os').tmpdir(), `kawaii_galeria_${process.pid}.html`);
  fs.writeFileSync(tmp, html, 'utf8');
  const browser = await abreNavegador();
  try {
    const page = await cargaPagina(browser, tmp, false);
    const r = await page.evaluate(() => { const b = document.getElementById('g').getBoundingClientRect(); return { w: b.width, h: b.height }; });
    await page.setViewport({ width: Math.ceil(r.w), height: Math.ceil(r.h), deviceScaleFactor: 1.25 });
    fs.mkdirSync(OUT, { recursive: true });
    const png = path.join(OUT, 'galeria_ilustraciones.png');
    await (await page.$('#g')).screenshot({ path: png });
    console.log(`Galería: ${hexes.length} ilustraciones · ${png} ${kb(png)}`);
  } finally {
    await browser.close();
    try { fs.unlinkSync(tmp); } catch (e) { /* nada */ }
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
