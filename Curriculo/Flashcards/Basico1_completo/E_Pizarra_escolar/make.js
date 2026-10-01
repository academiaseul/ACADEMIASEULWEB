// Flashcards Básico 1 (mazo completo) · estilo E · Pizarra escolar coreana
//
// Uso (desde cualquier carpeta; las dependencias salen del scratchpad):
//   node make.js                         PDFs S1…S8 + completo + vista_S1…S8.png
//   node make.js --semana 3              solo la semana 3 (PDF + vista); se puede repetir: --semana 3 --semana 4
//   node make.js --completo              solo el PDF completo
//   node make.js --muestra [우유 …|hex …] hoja ilustraciones/_muestra.png con los dibujos (todos o los indicados)
//                --png <ruta.png>        (con --muestra) otra ruta de salida, útil si varios dibujan a la vez
//   node make.js --texturas              regenera textura/pizarra.jpg y textura/grano.png
//   node make.js --datos <json> --salida <carpeta>   otro JSON u otra carpeta de salida (pruebas)
//   node make.js --sin-qr                no verifica los QR (por defecto se decodifican todos con jsQR)
//
// Datos: ../palabras_basico1.json (163 objetos: n, kr, rom, es, semana, tipo, categoria, ejemplo_kr,
// ejemplo_es, audio, audio_ejemplo, dibujo, tipo_dibujo). Si no existe, usa el mazo de 12 de
// ../../Basico1_5_estilos/palabras.json adaptando las categorías.
// Ilustraciones: ilustraciones/<hex UTF-8 de kr>.svg (ver ilustraciones/_GUIA.md). Si falta una
// o no pasa la validación, la tarjeta sale con el anverso tipográfico de reserva (nunca falla).
//
// Peso: nada se rasteriza por tarjeta. La pizarra (textura/pizarra.jpg) y el grano de tiza
// (textura/grano.png) son dos imágenes compartidas que el PDF incrusta una sola vez; las tramas
// de relleno se convierten en líneas vectoriales recortadas; sin filtros SVG ni sombras difusas.
//
// Sello de Academia Seúl: ../../marca/sello_linea_v2.svg (una tinta, fill="currentColor") se define
// UNA vez como <symbol id="sello-as"> al inicio del documento y cada cara lo usa con <use>.
// Anverso: en tiza #F3F0E4 (0,4 in) en la esquina superior izquierda de la pizarra, junto a "오늘의 단어",
// bajo el grano de tiza (se ve dibujado). Reverso: azul #4236F6 (0,32 in) al pie, delante de "Academia Seúl · nnn".
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const SCRATCH = 'C:/Users/Chingu/AppData/Local/Temp/claude/C--Users-Chingu-Desktop-ACADEMIASEULWEB/d4111e1b-5523-44ea-97b2-b1a1d9545b9e/scratchpad';
const req = require('module').createRequire(SCRATCH + '/package.json');
const QR = req('qrcode');
const puppeteer = req('puppeteer-core');
const { PNG } = req('pngjs');
let jsQR = null;
try { jsQR = require('module').createRequire(SCRATCH + '/revhoja/package.json')('jsqr'); } catch (e) { /* sin verificación de QR */ }
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

// ---------- Argumentos ----------
const ARGS = process.argv.slice(2);
const opt = (k) => { const i = ARGS.indexOf(k); return i >= 0 ? ARGS[i + 1] : null; };
const optAll = (k) => ARGS.reduce((a, v, i) => (v === k && ARGS[i + 1] ? a.concat(ARGS[i + 1]) : a), []);
const has = (k) => ARGS.includes(k);

const AQUI = __dirname;
const OUT = path.resolve(opt('--salida') || AQUI);
const ILUS = path.join(AQUI, 'ilustraciones');
const TEX = path.join(AQUI, 'textura');
const HTML_DIR = path.join(OUT, '_html');
const BASE = 'Flashcards_Basico1_E_Pizarra_escolar';
const ESTILO = 'E · Pizarra escolar';

// ---------- Paleta (sin rojo ni rosado) ----------
const W = '#F3F0E4';   // tiza blanca (trazo principal)
const G = '#E8B84B';   // tiza dorada (acentos, estrellas)
const A = '#9FCBEF';   // tiza celeste (agua, cielo, vidrio)
const M = '#9ED9B0';   // tiza menta (hojas, verduras, plantas)
const P = '#F4B98C';   // durazno (solo mejillas, naricitas, orejas internas)
const B = '#1F3B33';   // pizarra (rellenos que tapan, pupilas)
const NAVY = '#003478';
const PERMITIDOS = [W, G, A, M, P, B];

// 10 categorías: >= 4.5:1 sobre el papel crema (#FBF6E8) y con texto blanco; luminosidad escalonada
// (de 0,038 a 0,156) para que se distingan también en gris. Nada rojo ni rosado.
const CAT = {
  'Tiempo y rutina': '#003478',            // navy        L 0.038
  'Saludos y frases': '#4B2A80',           // índigo      L 0.047
  'Posición': '#6A4526',                   // café        L 0.075
  'Preguntas y palabras útiles': '#465766',// pizarra gris L 0.091
  'Objetos': '#4236F6',                    // azul marca  L 0.105
  'Acciones': '#5A6410',                   // oliva       L 0.113
  'Personas y familia': '#8340B8',         // púrpura     L 0.120
  'Lugares': '#08707A',                    // verde azulado L 0.130
  'Comida y bebida': '#9A5B00',            // ámbar       L 0.144
  'Naturaleza y animales': '#2B7D40',      // verde       L 0.156
};
const CAT_ANTIGUA = { 'naturaleza': 'Naturaleza y animales', 'animales': 'Naturaleza y animales' };
const sinTilde = (s) => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
function categoria(c) {
  const k = sinTilde(c);
  for (const nombre of Object.keys(CAT)) if (sinTilde(nombre) === k) return nombre;
  if (CAT_ANTIGUA[k]) return CAT_ANTIGUA[k];
  return null;
}

// ---------- Datos ----------
const hex = (s) => Buffer.from(String(s).normalize('NFC'), 'utf8').toString('hex');
function cargarDatos() {
  const candidatos = [opt('--datos'), path.join(AQUI, '..', 'palabras_basico1.json'), path.join(AQUI, '..', '..', 'Basico1_5_estilos', 'palabras.json')].filter(Boolean);
  const archivo = candidatos.find((f) => fs.existsSync(f));
  if (!archivo) throw new Error('No encuentro el JSON de palabras: ' + candidatos.join(' | '));
  const crudo = JSON.parse(fs.readFileSync(archivo, 'utf8').replace(/^\uFEFF/, ''));
  const lista = Array.isArray(crudo) ? crudo : crudo.palabras;
  const vistos = new Set();
  const datos = lista.map((d, i) => {
    const kr = String(d.kr || '').normalize('NFC').trim();
    const cat = categoria(d.categoria);
    if (!cat) console.warn(`  ! ${kr}: categoría desconocida "${d.categoria}" (uso el color navy)`);
    const rom = String(d.rom || '').trim();
    const n = Number(d.n) || i + 1;
    if (vistos.has(n)) console.warn(`  ! número repetido: ${n}`);
    vistos.add(n);
    return {
      n, kr,
      rom: /^[-—–\s]*$/.test(rom) ? '' : rom,
      es: String(d.es || '').trim(),
      semana: Number(d.semana) || 0,
      tipo: d.tipo || '',
      categoria: cat || String(d.categoria || ''),
      color: cat ? CAT[cat] : NAVY,
      ejemplo_kr: String(d.ejemplo_kr || '').trim(),
      ejemplo_es: String(d.ejemplo_es || '').trim(),
      audio: d.audio || `https://www.academiaseul.com/audio/kr/${hex(kr)}.mp3`,
      dibujo: d.dibujo || '',
      tipo_dibujo: d.tipo_dibujo || '',
    };
  }).sort((a, b) => a.n - b.n);
  return { archivo, datos };
}

// ---------- Ilustraciones ----------
const DEFS_USO = ['cara', 'cara-feliz', 'cara-dormida', 'cara-sorpresa', 'cara-disgusto', 'estrella', 'estrella-b', 'gota', 'corazon', 'nota'];
const TRAMAS_ID = ['rt', 'rb', 'rd', 'ra', 'rm'];
function validarIlustracion(txt) {
  const errores = [], avisos = [];
  const t = txt.replace(/^\uFEFF/, '').replace(/<\?xml[^>]*>/, '').replace(/<!--[\s\S]*?-->/g, '').trim();
  const m = t.match(/^<svg\b([^>]*)>([\s\S]*)<\/svg>\s*$/);
  if (!m) return { errores: ['no es un único elemento <svg>…</svg>'], avisos, interior: '' };
  const vb = (m[1].match(/viewBox="([^"]*)"/) || [])[1];
  if (!vb || vb.trim().split(/[\s,]+/).map(Number).join(' ') !== '0 0 220 176') errores.push(`viewBox debe ser "0 0 220 176" (tiene "${vb || 'nada'}")`);
  const interior = m[2];
  if (!/<(path|circle|ellipse|rect|line|polyline|polygon|use)\b/.test(interior)) errores.push('dibujo vacío');
  const prohibidas = interior.match(/<\s*(script|style|foreignObject|image|filter|mask|pattern|clipPath|linearGradient|radialGradient|defs|text|tspan|symbol|svg|a|iframe)\b/gi);
  if (prohibidas) errores.push('etiquetas no permitidas: ' + [...new Set(prohibidas.map((s) => s.replace(/[<\s]/g, '')))].join(', '));
  if (/\s(id|style|class)\s*=/.test(interior)) errores.push('no se permiten atributos id, style ni class dentro del dibujo');
  if (/\son[a-z]+\s*=/i.test(interior)) errores.push('no se permiten atributos de evento (on…)');
  if (/\s(opacity|filter|mask|clip-path)\s*=/.test(interior)) errores.push('no uses opacity/filter/mask/clip-path: solo stroke-opacity o fill-opacity');
  for (const [, ref] of interior.matchAll(/href\s*=\s*"([^"]*)"/g)) {
    if (!ref.startsWith('#') || !DEFS_USO.includes(ref.slice(1))) errores.push(`href no permitido: ${ref}`);
  }
  for (const [, ref] of interior.matchAll(/url\(\s*#?([^)]*)\)/g)) {
    if (!TRAMAS_ID.includes(ref.replace('#', ''))) errores.push(`url(#${ref}) no existe (tramas: ${TRAMAS_ID.join(', ')})`);
  }
  for (const [, c] of interior.matchAll(/#([0-9a-fA-F]{3,8})\b/g)) {
    if (!PERMITIDOS.includes('#' + c.toUpperCase())) errores.push(`color fuera de la paleta: #${c}`);
  }
  for (const [, prop, v] of interior.matchAll(/\b(fill|stroke|color|stop-color)\s*=\s*"([^"#u][^"]*)"/g)) {
    if (!/^(none|currentColor)$/.test(v)) errores.push(`${prop}="${v}": usa solo los hex de la paleta`);
  }
  if (/rgba?\(|hsla?\(/i.test(interior)) errores.push('no uses rgb()/hsl(): solo los hex de la paleta');
  for (const [, w] of interior.matchAll(/stroke-width\s*=\s*"([\d.]+)"/g)) {
    if (+w > 5 || +w < 1.2) avisos.push(`stroke-width ${w} fuera de 1.2–5`);
  }
  if (txt.length > 16000) avisos.push(`archivo grande (${Math.round(txt.length / 1024)} KB): simplifica trazos`);
  return { errores, avisos, interior };
}
function cargarIlustraciones(datos) {
  const res = {};
  for (const d of datos) {
    const f = path.join(ILUS, hex(d.kr) + '.svg');
    if (!fs.existsSync(f)) { res[d.n] = { estado: 'falta', archivo: f }; continue; }
    const v = validarIlustracion(fs.readFileSync(f, 'utf8'));
    res[d.n] = { estado: v.errores.length ? 'invalida' : 'ok', archivo: f, ...v };
  }
  return res;
}

// ---------- Defs compartidos (las ilustraciones solo los referencian por id) ----------
function caraDef(id, ojos, boca) {
  return `<g id="${id}">${ojos}${boca}
      <ellipse cx="-22" cy="11" rx="6" ry="3.4" fill="${P}" stroke="none"/>
      <ellipse cx="22" cy="11" rx="6" ry="3.4" fill="${P}" stroke="none"/></g>`;
}
const OJOS = `<ellipse cx="-11" cy="0" rx="4.4" ry="5.4" fill="${W}" stroke="none"/><ellipse cx="11" cy="0" rx="4.4" ry="5.4" fill="${W}" stroke="none"/>
      <circle cx="-12.4" cy="-1.8" r="1.6" fill="${B}" stroke="none"/><circle cx="9.6" cy="-1.8" r="1.6" fill="${B}" stroke="none"/>`;
const T = `fill="none" stroke="${W}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"`;
const SONRISA = `<path d="M-8 12 Q0 20 8 12" ${T}/>`;
const ESTRELLA = 'M0 -10 L2.4 -2.4 L10 0 L2.4 2.4 L0 10 L-2.4 2.4 L-10 0 L-2.4 -2.4 Z';
const ASPERO = '1.2 3.1 0.6 4.4 2 2.6 0.8 5';
function conAspero(id, d, color, w, relleno = 'fill="none"') {
  return `<g id="${id}"><path d="${d}" fill="none" stroke="${color}" stroke-width="${w + 1.2}" stroke-opacity="0.55" stroke-dasharray="${ASPERO}"/><path d="${d}" ${relleno} stroke="${color}" stroke-width="${w}" stroke-linejoin="round"/></g>`;
}
function defsGlobales() {
  return `<svg class="defs" width="0" height="0" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden">
  <defs>
    <pattern id="rt" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(-50)"><rect width="1.3" height="4" fill="${W}" fill-opacity="0.38"/></pattern>
    <pattern id="rb" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(38)"><rect width="1.7" height="5" fill="${W}" fill-opacity="0.6"/></pattern>
    <pattern id="rd" width="4.5" height="4.5" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><rect width="1.8" height="4.5" fill="${G}" fill-opacity="0.75"/></pattern>
    <pattern id="ra" width="4.5" height="4.5" patternUnits="userSpaceOnUse" patternTransform="rotate(40)"><rect width="1.8" height="4.5" fill="${A}" fill-opacity="0.7"/></pattern>
    <pattern id="rm" width="4.5" height="4.5" patternUnits="userSpaceOnUse" patternTransform="rotate(-40)"><rect width="1.8" height="4.5" fill="${M}" fill-opacity="0.7"/></pattern>
    ${caraDef('cara', OJOS, SONRISA)}
    ${caraDef('cara-feliz', `<path d="M-15.5 1.5 Q-11 -5 -6.5 1.5 M6.5 1.5 Q11 -5 15.5 1.5" ${T}/>`, `<path d="M-7 10 Q0 21 7 10 Z" fill="${W}" fill-opacity="0.85" ${T.replace('fill="none" ', '')}/>`)}
    ${caraDef('cara-dormida', `<path d="M-15.5 -0.5 Q-11 4.5 -6.5 -0.5 M6.5 -0.5 Q11 4.5 15.5 -0.5" ${T}/>`, `<path d="M-4 14 Q0 16.5 4 14" ${T}/>`)}
    ${caraDef('cara-sorpresa', OJOS, `<ellipse cx="0" cy="15" rx="3.6" ry="4.6" ${T}/>`)}
    ${caraDef('cara-disgusto', `<path d="M-16 -3 L-7 1 L-16 4 M16 -3 L7 1 L16 4" ${T}/>`, `<path d="M-8 16 Q-4 12 0 16 Q4 20 8 16" ${T}/>`)}
    ${conAspero('estrella', ESTRELLA, G, 2.5)}
    ${conAspero('estrella-b', ESTRELLA, W, 3)}
    ${conAspero('gota', 'M0 -6 C2 -2, 4 0, 4 2 A4 4 0 0 1 -4 2 C-4 0, -2 -2, 0 -6 Z', A, 2, `fill="${A}" fill-opacity="0.4"`)}
    ${conAspero('corazon', 'M0 -1 C0 -7, -8 -10, -9 -4 C-10 2, -2 6, 0 11 C2 6, 10 2, 9 -4 C8 -10, 0 -7, 0 -1 Z', G, 2.4)}
    <g id="nota"><path d="M-3 8 V-10 L9 -13 V5" fill="none" stroke="${G}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="-6.5" cy="8.5" rx="4.2" ry="3.2" fill="${G}" stroke="none"/><ellipse cx="5.5" cy="5.5" rx="4.2" ry="3.2" fill="${G}" stroke="none"/></g>
  </defs>
</svg>`;
}
// Trama → líneas vectoriales: [color, opacidad, grosor, periodo, ángulo]. Debe coincidir con los <pattern>.
const TRAMAS = { rt: [W, 0.38, 1.3, 4, -50], rb: [W, 0.6, 1.7, 5, 38], rd: [G, 0.75, 1.8, 4.5, 35], ra: [A, 0.7, 1.8, 4.5, 40], rm: [M, 0.7, 1.8, 4.5, -40] };

// ---------- Texturas compartidas ----------
const BW = 312, BH = 404; // pizarra dentro del marco
function rng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
function htmlPizarra() {
  const R = rng(7);
  let polvo = '';
  for (let i = 0; i < 560; i++) {
    polvo += `<circle cx="${(R() * BW).toFixed(1)}" cy="${(R() * BH).toFixed(1)}" r="${(0.45 + R() * 0.75).toFixed(2)}" fill="${W}" fill-opacity="${(0.06 + R() * 0.09).toFixed(3)}"/>`;
  }
  for (let i = 0; i < 70; i++) {
    const x = (R() * BW).toFixed(1), y = (R() * BH).toFixed(1);
    polvo += `<rect x="${x}" y="${y}" width="${(1.5 + R() * 2.5).toFixed(1)}" height="0.7" fill="${W}" fill-opacity="${(0.05 + R() * 0.06).toFixed(3)}" transform="rotate(${(R() * 180 - 90).toFixed(0)} ${x} ${y})"/>`;
  }
  return `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;background:${B}}
  #t{position:relative;width:${BW}px;height:${BH}px;background:${B};overflow:hidden}
  #t svg{position:absolute;left:0;top:0}
  #sh{position:absolute;inset:0;box-shadow:inset 0 0 0 2px #15302A, inset 0 8px 18px rgba(0,0,0,.32)}</style></head><body><div id="t">
  <svg width="${BW}" height="${BH}" viewBox="0 0 ${BW} ${BH}">
    <filter id="m" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.009 0.014" numOctaves="3" seed="5"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.953  0 0 0 0 0.941  0 0 0 0 0.894  0 0 0 0.1 -0.036"/>
    </filter>
    <rect width="${BW}" height="${BH}" filter="url(#m)"/>
    <filter id="f" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="2" seed="9"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.953  0 0 0 0 0.941  0 0 0 0 0.894  0 0 0 0.16 -0.062"/>
    </filter>
    <rect width="${BW}" height="${BH}" filter="url(#f)"/>
    ${polvo}
  </svg><div id="sh"></div></div></body></html>`;
}
// Grano de tiza: manchitas del color de la pizarra que "muerden" el trazo (fino + medio)
function htmlGrano() {
  const fila = (k, b) => `0 0 0 ${k} ${b}`;
  return `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;background:transparent}
  #t{position:relative;width:${BW}px;height:${BH}px}</style></head><body><div id="t">
  <svg width="${BW}" height="${BH}" viewBox="0 0 ${BW} ${BH}">
    <filter id="g1" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="1.05" numOctaves="2" seed="13"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  ${fila(-3.6, 1.95)}"/>
    </filter>
    <filter id="g2" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.42" numOctaves="2" seed="29"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  ${fila(-9, 3.3)}"/>
    </filter>
    <rect width="${BW}" height="${BH}" filter="url(#g1)"/>
    <rect width="${BW}" height="${BH}" filter="url(#g2)"/>
  </svg></div></body></html>`;
}
async function generarTexturas(browser) {
  fs.mkdirSync(TEX, { recursive: true });
  const page = await browser.newPage();
  await page.setViewport({ width: BW, height: BH, deviceScaleFactor: 2 });
  await page.setContent(htmlPizarra());
  await page.screenshot({ path: path.join(TEX, 'pizarra.jpg'), type: 'jpeg', quality: 82, clip: { x: 0, y: 0, width: BW, height: BH } });
  await page.setContent(htmlGrano());
  const buf = await page.screenshot({ omitBackground: true, clip: { x: 0, y: 0, width: BW, height: BH } });
  await page.close();
  // Color único (pizarra) y alfa en 5 niveles: el PNG comprime mucho mejor
  const png = PNG.sync.read(Buffer.from(buf));
  const niveles = [0, 64, 128, 192, 255];
  for (let i = 0; i < png.data.length; i += 4) {
    const a = png.data[i + 3];
    png.data[i] = 0x1F; png.data[i + 1] = 0x3B; png.data[i + 2] = 0x33;
    png.data[i + 3] = niveles.reduce((p, v) => (Math.abs(v - a) < Math.abs(p - a) ? v : p), 0);
  }
  fs.writeFileSync(path.join(TEX, 'grano.png'), PNG.sync.write(png, { colorType: 6, deflateLevel: 9 }));
  console.log('Texturas:', ['pizarra.jpg', 'grano.png'].map((f) => `${f} ${Math.round(fs.statSync(path.join(TEX, f)).size / 1024)} KB`).join(' · '));
}

// ---------- Sello de Academia Seúl (vector de una tinta, compartido) ----------
// Colores permitidos (marca/LEEME.md): azul #4236F6, lila #A99BFF, crema/tiza #F3F0E4 sobre fondos oscuros, negro.
// Nunca coral ni rosado. Las coordenadas se redondean a 1 decimal (invisible a 0,4 in; el PDF pesa ~30 % menos por copia).
const SELLO_ARCHIVO = path.join(AQUI, '..', '..', 'marca', 'sello_linea_v2.svg');
const SELLO_ALT = 'Sello de Academia Seúl';
const SELLO_TIZA = { ancho: 38.4, color: W };          // anverso: 0,4 in en tiza
const SELLO_AZUL = { ancho: 30.7, color: '#4236F6' };  // reverso: 0,32 in en azul de marca
function cargarSello() {
  const txt = fs.readFileSync(SELLO_ARCHIVO, 'utf8');
  const vb = (txt.match(/<svg\b[^>]*\bviewBox="([^"]+)"/) || [])[1];
  if (!vb) throw new Error('El sello no tiene viewBox: ' + SELLO_ARCHIVO);
  const [, , vw, vh] = vb.trim().split(/[\s,]+/).map(Number);
  const r1 = (d) => d.replace(/-?\d*\.\d+/g, (n) => String(+(+n).toFixed(1))).replace(/\s+/g, ' ').trim();
  const trazos = [...txt.matchAll(/<path\b([^>]*)>/g)].map(([, at]) => {
    const d = (at.match(/\sd="([^"]+)"/) || [])[1];
    const regla = (at.match(/fill-rule="([^"]+)"/) || [])[1];
    return d ? `<path d="${r1(d)}"${regla && regla !== 'nonzero' ? ` fill-rule="${regla}"` : ''}/>` : '';
  }).join('');
  if (!trazos) throw new Error('El sello no tiene trazos: ' + SELLO_ARCHIVO);
  return { vb, proporcion: vh / vw, trazos };
}
const SELLO = cargarSello();
function defsSello() {
  return `<svg class="defs-sello" width="0" height="0" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden">
  <symbol id="sello-as" viewBox="${SELLO.vb}" fill="currentColor">${SELLO.trazos}</symbol>
</svg>`;
}
// Una copia del sello: solo referencia el <symbol> (la ruta no se repite en el HTML)
function sello(clase, { ancho, color }) {
  return `<svg class="${clase}" width="${ancho}" height="${(ancho * SELLO.proporcion).toFixed(1)}" role="img" aria-label="${SELLO_ALT}" style="color:${color}"><use href="#sello-as"/></svg>`;
}

// ---------- Utilidades ----------
const pad3 = (n) => String(n).padStart(3, '0');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ICONO_AUDIO = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9.5 H7.5 L12.5 5.5 V18.5 L7.5 14.5 H4 Z"/><path d="M16 9.2 C 17.4 10.8, 17.4 13.2, 16 14.8"/><path d="M18.8 6.6 C 21.6 9.8, 21.6 14.2, 18.8 17.4"/></svg>`;
const esHangul = (ch) => /[\u1100-\u11FF\u3130-\u318F\uAC00-\uD7A3]/.test(ch);

// ---------- Anverso ----------
function manchas(n) {
  const a = n % 2;
  return `<svg class="manchas" width="${BW}" height="${BH}" viewBox="0 0 ${BW} ${BH}" aria-hidden="true">
      <path d="M-10 ${a ? 330 : 312} C 60 ${a ? 312 : 334}, 160 ${a ? 346 : 304}, 330 ${a ? 316 : 330}" fill="none" stroke="${W}" stroke-opacity="0.045" stroke-width="38" stroke-linecap="round"/>
      <path d="M20 ${138 + (n % 7) * 5} C 90 120, 170 150, 280 128" fill="none" stroke="${W}" stroke-opacity="0.03" stroke-width="30" stroke-linecap="round"/>
      <path d="M170 ${34 + (n % 3) * 6} C 210 24, 250 48, 320 30" fill="none" stroke="${W}" stroke-opacity="0.035" stroke-width="22" stroke-linecap="round"/>
    </svg>`;
}
function adornoReserva(d) {
  // Estrellas de tiza alrededor del cartel tipográfico (mismos defs que las ilustraciones)
  const pos = d.n % 2 ? [[28, 86, 1], [286, 120, 0.7], [34, 318, 0.7], [280, 300, 1]] : [[284, 84, 1], [30, 132, 0.7], [276, 322, 0.75], [36, 296, 1]];
  return `<svg class="adorno" width="${BW}" height="${BH}" viewBox="0 0 ${BW} ${BH}" aria-hidden="true">
      ${pos.map(([x, y, k], i) => `<use href="#${i % 2 ? 'estrella-b' : 'estrella'}" transform="translate(${x} ${y}) scale(${k})"/>`).join('')}
      <path d="M${d.n % 2 ? 70 : 60} 352 C 120 ${d.n % 2 ? 344 : 360}, 190 ${d.n % 2 ? 362 : 342}, ${d.n % 2 ? 250 : 256} 350" fill="none" stroke="${G}" stroke-width="4" stroke-linecap="round" stroke-dasharray="40 5 60 6 200"/>
    </svg>`;
}
function anverso(d, ilu, total) {
  const ac = d.color;
  const flip = d.n % 2 ? 1 : -1;
  const giro = ['', 'scaleX(-1)', 'scaleY(-1)', 'scale(-1,-1)'][d.n % 4];
  const conDibujo = ilu && ilu.estado === 'ok';
  const centro = conDibujo
    ? `<svg class="ilus" width="262" height="210" viewBox="0 0 220 176" role="img" aria-label="${esc(d.es)}">
      <g fill="none" stroke="${W}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${ilu.interior}</g>
    </svg>
    <div class="hangul"><span lang="ko">${esc(d.kr)}</span></div>
    <svg class="raya" width="200" height="16" viewBox="0 0 200 16" aria-hidden="true"><path d="" fill="none" stroke="${G}" stroke-width="4" stroke-linecap="round" stroke-dasharray="${flip > 0 ? '70 4 300' : '120 5 300'}"/></svg>`
    : `${adornoReserva(d)}
    <div class="cartel" style="background:${ac};transform:rotate(${flip > 0 ? -1.6 : 1.4}deg)">
      <span class="iman" style="left:22px"></span><span class="iman" style="right:22px"></span>
      <div class="cartel-kr" lang="ko">${esc(d.kr)}</div>
    </div>`;
  return `<div class="card front${conDibujo ? '' : ' reserva'}" data-n="${d.n}" data-cara="a">
  <div class="board">
    <div class="fondo"${d.n % 2 ? ' style="transform:scaleX(-1)"' : ''}></div>
    ${manchas(d.n)}
    ${sello('sello-tiza', SELLO_TIZA)}
    <div class="head">
      <div class="titulo">
        <span>오늘의 단어</span>
        <svg width="80" height="7" viewBox="0 0 80 7" aria-hidden="true"><path d="M2 ${flip > 0 ? 4.2 : 3.4} C 22 ${flip > 0 ? 1.8 : 5.6}, 44 ${flip > 0 ? 5.8 : 1.8}, 78 ${flip > 0 ? 3 : 4}" fill="none" stroke="${G}" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="18 3 26 4 60"/></svg>
      </div>
      <div class="der">
        <span class="num">${pad3(d.n)}/${pad3(total)}</span>
        <div class="audio" style="background:${ac}">${ICONO_AUDIO}</div>
      </div>
    </div>
    ${centro}
    <div class="grano"${giro ? ` style="transform:${giro}"` : ''}></div>
  </div>
  <div class="tray">
    <div class="ledge"></div>
    <div class="borrador"><div></div><div></div></div>
    <div class="polvito"></div>
    <div class="tiza" style="left:178px;width:38px;background:${W}"></div>
    <div class="tiza" style="left:224px;width:30px;background:${ac}"></div>
    <div class="tiza" style="left:262px;width:22px;background:${G}"></div>
  </div>
</div>`;
}

// ---------- Reverso ----------
function cajasHangul(kr, ac) {
  // Un grupo con borde por cada tramo de Hangul; espacios y signos quedan fuera de las cajas
  const partes = [];
  for (const palabra of kr.split(/\s+/).filter(Boolean)) {
    const tramos = palabra.match(/[\u1100-\u11FF\u3130-\u318F\uAC00-\uD7A3]+|[^\u1100-\u11FF\u3130-\u318F\uAC00-\uD7A3]+/g) || [];
    partes.push(tramos.map((t) => esHangul(t[0])
      ? `<span class="grupo" style="border-color:${ac}">${[...t].map((s, i, a) => `<span class="s" style="border-right:${i < a.length - 1 ? `1.5px solid ${ac}` : 'none'}">${s}</span>`).join('')}</span>`
      : `<span class="p">${esc(t)}</span>`).join(''));
  }
  return partes.join('<span class="esp"></span>');
}
function reverso(d, qr, total) {
  const ac = d.color;
  const rot = d.n % 2 ? -12 : 9;
  const lineas = Array.from({ length: 12 }, (_, k) => `M0 ${94.5 + 32 * k} H336`).join(' ');
  const conEj = !!d.ejemplo_kr;
  return `<div class="card back${conEj ? '' : ' sin-ej'}" data-n="${d.n}" data-cara="r" data-audio="${esc(d.audio)}">
  <svg class="renglones" width="336" height="456" viewBox="0 0 336 456" aria-hidden="true">
    <path d="M0 58.5 H336" stroke="#B7C4EC" stroke-width="1"/>
    <path d="M0 62 H336" stroke="#B7C4EC" stroke-width="2"/>
    <path d="${lineas}" stroke="#CBD5EF" stroke-width="1"/>
  </svg>
  <div class="margen" style="background:${ac}"></div>
  <div class="hoyo" style="top:100px"></div><div class="hoyo" style="top:220px"></div><div class="hoyo" style="top:340px"></div>
  <div class="b-head">
    <span class="cinta">Básico 1 · Semana ${d.semana}</span>
    <span class="cat" style="color:${ac}"><i style="background:${ac}"></i><span>${esc(d.categoria)}</span></span>
  </div>
  <div class="b-hangul">
    <div class="cajas" lang="ko">${cajasHangul(d.kr, ac)}</div>
    ${d.rom ? `<span class="rom">${esc(d.rom)}</span>` : ''}
  </div>
  <div class="b-sig"><span class="sigw"><span class="hl" style="transform:rotate(${d.n % 2 ? -1.5 : 1.2}deg)"></span><span class="sig" data-txt="${esc(d.es)}">${esc(d.es)}</span></span></div>
  ${conEj ? `<div class="b-label"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6B6660" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20 L5 15 L16 4 L20 8 L9 19 Z"/><path d="M13.5 6.5 L17.5 10.5"/></svg><span>예문 · ejemplo</span></div>
  <div class="b-ej"><span class="ej" lang="ko">${esc(d.ejemplo_kr)}</span></div>
  ${d.ejemplo_es ? `<div class="b-tr"><svg width="18" height="12" viewBox="0 0 18 12" fill="none" stroke="${ac}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 6.5 C 6 5.5, 10 6.5, 15 6"/><path d="M11 2 L15.5 6 L11 10"/></svg><span>${esc(d.ejemplo_es)}</span></div>` : ''}` : ''}
  <div class="sello" style="border-color:${ac};color:${ac};transform:rotate(${rot}deg)">
    <div class="sello-in" style="border-color:${ac}"></div>
    <svg width="24" height="11" viewBox="0 0 26 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 2.5 V4.5 M20 2.5 V4.5"/><path d="M6 7.5 C 9 11, 17 11, 20 7.5"/></svg>
    <span class="s1">참</span><span class="s2">잘했어요</span>
    <svg class="desgaste" width="78" height="78" viewBox="0 0 86 86" aria-hidden="true"><g fill="#FBF6E8"><circle cx="14" cy="30" r="1.6"/><circle cx="71" cy="22" r="1.2"/><circle cx="62" cy="70" r="1.8"/><circle cx="22" cy="64" r="1.1"/><circle cx="44" cy="8" r="1.3"/><circle cx="78" cy="48" r="1"/><circle cx="36" cy="50" r="0.9"/><circle cx="54" cy="36" r="0.8"/></g></svg>
  </div>
  <div class="qr">${qr}<div class="qr-cap"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="${NAVY}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9.5 H7.5 L12.5 5.5 V18.5 L7.5 14.5 H4 Z"/><path d="M16 9.2 C 17.4 10.8, 17.4 13.2, 16 14.8"/><path d="M18.8 6.6 C 21.6 9.8, 21.6 14.2, 18.8 17.4"/></svg><span>Escúchala</span></div></div>
  ${sello('sello-marca', SELLO_AZUL)}
  <span class="marca">Academia Seúl · ${pad3(d.n)}/${pad3(total)}</span>
</div>`;
}

// ---------- Hoja carta: 4 tarjetas de 3,5 × 4,75 in, marcas de corte ----------
const CARD_W = 336, CARD_H = 456, GAP = 24, PAGE_W = 816, PAGE_H = 1056;
const X0 = (PAGE_W - (2 * CARD_W + GAP)) / 2, Y0 = (PAGE_H - (2 * CARD_H + GAP)) / 2;
function marcas(ocupados) {
  let d = '';
  const L = 8, o = 3;
  ocupados.forEach((ok, i) => {
    if (!ok) return;
    const c = i % 2, r = Math.floor(i / 2);
    const x0 = X0 + c * (CARD_W + GAP), y0 = Y0 + r * (CARD_H + GAP), x1 = x0 + CARD_W, y1 = y0 + CARD_H;
    for (const [x, sx] of [[x0, -1], [x1, 1]]) for (const [y, sy] of [[y0, -1], [y1, 1]]) {
      d += `M${x + sx * o} ${y} H${x + sx * (o + L)} M${x} ${y + sy * o} V${y + sy * (o + L)} `;
    }
  });
  return `<svg class="marcas" width="${PAGE_W}" height="${PAGE_H}" viewBox="0 0 ${PAGE_W} ${PAGE_H}" aria-hidden="true"><path d="${d}" stroke="#9A9A9A" stroke-width="0.6" fill="none"/></svg>`;
}
function pagina(caras, titulo) {
  const pos = caras.map((html, i) => {
    if (!html) return '';
    const c = i % 2, r = Math.floor(i / 2);
    return `<div class="slot" style="left:${X0 + c * (CARD_W + GAP)}px;top:${Y0 + r * (CARD_H + GAP)}px">${html}</div>`;
  }).join('\n');
  return `<section class="page" aria-label="${esc(titulo)}">${marcas(caras.map(Boolean))}${pos}</section>`;
}

const CSS = `
@page { size: letter; margin: 0; }
* { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
html, body { margin: 0; padding: 0; }
body { background: #FFFFFF; font-family: 'Gowun Dodum', sans-serif; color: #2E2B3A; }
@media screen {
  body { background: #D9D4C7; padding: 24px 0; }
  .page { margin: 0 auto 24px; outline: 1px solid #C9C2B2; }
}
.page { position: relative; width: 816px; height: 1056px; overflow: hidden; background: #FFFFFF; page-break-after: always; break-after: page; }
.page:last-of-type { page-break-after: auto; break-after: auto; }
.marcas { position: absolute; left: 0; top: 0; }
.slot { position: absolute; width: 336px; height: 456px; }
.card { position: relative; width: 336px; height: 456px; box-sizing: border-box; overflow: hidden; }

/* ---------- Anverso: pizarra con marco de madera (sin sombras difusas: no se rasteriza nada) ---------- */
.front { background: #B88654; padding: 12px 12px 0 12px; display: flex; flex-direction: column;
  box-shadow: inset 0 0 0 1px #8C5D33, inset 0 3px 0 rgba(255,232,196,.28), inset 0 -2px 0 rgba(110,70,35,.25); }
.board { position: relative; flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: space-between;
  padding: 10px 16px 8px; border-radius: 6px; background: ${B}; overflow: hidden; }
.fondo { position: absolute; left: 0; top: 0; width: ${BW}px; height: ${BH}px; background: ${B} url(TEX_PIZARRA) 0 0 / ${BW}px ${BH}px no-repeat; }
.manchas, .adorno { position: absolute; left: 0; top: 0; }
.grano { position: absolute; left: 0; top: 0; width: ${BW}px; height: ${BH}px; z-index: 2; background: url(TEX_GRANO) 0 0 / ${BW}px ${BH}px no-repeat; pointer-events: none; }
.head { position: relative; z-index: 3; align-self: stretch; height: 46px; display: flex; align-items: center; justify-content: space-between; }
.titulo { display: flex; flex-direction: column; align-items: flex-start; gap: 2px; padding-left: 46px; }
/* Sello de la academia dibujado en tiza en la esquina superior izquierda; queda bajo el grano (z-index 2) para verse de tiza */
.sello-tiza { position: absolute; left: 13px; top: 14px; z-index: 1; overflow: visible; transform: rotate(-5deg); }
.titulo span { font-family: 'Gaegu', 'Mali', cursive; font-weight: 700; font-size: 18px; line-height: 1; letter-spacing: .5px; color: #F3F0E4; }
.der { display: flex; align-items: center; gap: 12px; }
.num { font-family: 'Gaegu', 'Mali', cursive; font-weight: 700; font-size: 19px; line-height: 1; letter-spacing: 1px; color: #F3F0E4; opacity: .92; }
.audio { position: relative; width: 46px; height: 46px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transform: rotate(-6deg);
  box-shadow: 0 0 0 2px rgba(243,240,228,.55), 0 4px 0 rgba(0,0,0,.3), inset 0 -4px 0 rgba(0,0,0,.2), inset 0 3px 0 rgba(255,255,255,.25); }
.ilus { position: relative; z-index: 1; flex: none; }
.hangul { position: relative; z-index: 1; display: inline-block; padding: 0 4px; max-width: 288px; }
.hangul span { position: relative; display: block; text-align: center; font-family: 'Gaegu', 'Mali', cursive; font-weight: 700; font-size: 84px; line-height: 1; letter-spacing: 3px; color: #F5F2E8; white-space: nowrap;
  -webkit-text-stroke: 0.8px rgba(245,242,232,.45); }
.hangul span.dos { line-height: 1.02; }
.hangul-dos .ilus { width: 216px; height: 173px; }
.raya { position: relative; z-index: 1; flex: none; margin-top: -6px; }
/* Anverso de reserva (sin ilustración): cartel de papel del color de la categoría, pegado con imanes */
.reserva .board { justify-content: flex-start; }
.cartel { position: relative; z-index: 3; margin-top: 22px; width: 236px; height: 252px; box-sizing: border-box; border-radius: 5px; display: flex; align-items: center; justify-content: center; padding: 18px 14px;
  box-shadow: 0 3px 0 rgba(0,0,0,.28), inset 0 0 0 7px rgba(255,255,255,.08), inset 0 0 0 9px rgba(255,255,255,.5); }
.iman { position: absolute; top: -7px; width: 16px; height: 16px; border-radius: 50%; background: ${G}; box-shadow: 0 2px 0 rgba(0,0,0,.3), inset 0 -3px 0 rgba(0,0,0,.18), inset 0 2px 0 rgba(255,255,255,.4); }
.cartel-kr { font-family: 'Gaegu', 'Mali', cursive; font-weight: 700; font-size: 110px; line-height: 1.02; color: #FFFFFF; text-align: center; letter-spacing: 2px; white-space: nowrap; }
.tray { position: relative; height: 40px; flex: none; }
.ledge { position: absolute; left: -12px; right: -12px; top: 12px; height: 13px; background: #9A683A; box-shadow: inset 0 2px 0 rgba(255,236,205,.25), 0 3px 0 #77502C; }
.borrador { position: absolute; left: 22px; bottom: 28px; width: 64px; height: 20px; display: flex; flex-direction: column; border-radius: 4px; overflow: hidden; transform: rotate(-3deg); box-shadow: 0 2px 0 rgba(0,0,0,.25); }
.borrador div:first-child { height: 13px; background: ${NAVY}; box-shadow: inset 0 2px 0 rgba(255,255,255,.18); }
.borrador div:last-child { flex: 1; background: #D9D3C4; }
.polvito { position: absolute; left: 158px; bottom: 26px; width: 14px; height: 3px; border-radius: 2px; background: rgba(243,240,228,.55); }
.tiza { position: absolute; bottom: 28px; height: 8px; border-radius: 4px; box-shadow: 0 2px 0 rgba(0,0,0,.22), inset 0 2px 0 rgba(255,255,255,.25); }

/* ---------- Reverso: hoja de cuaderno ---------- */
.back { background: #FBF6E8; box-shadow: inset 0 0 0 1px #E2D5B6; }
.renglones { position: absolute; left: 0; top: 0; }
.margen { position: absolute; left: 46px; top: 0; bottom: 0; width: 2px; opacity: .75; }
.hoyo { position: absolute; left: 15px; width: 15px; height: 15px; border-radius: 50%; background: radial-gradient(circle at 50% 30%, #D2C7AE 0%, #DED5C0 45%, #E9E2D0 75%); }
.b-head { position: absolute; left: 62px; right: 16px; top: 0; height: 58px; display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.cinta { flex: none; display: inline-block; margin-left: -24px; padding: 4px 11px; background: #F2D48A; color: ${NAVY}; font-size: 12px; letter-spacing: .2px; transform: rotate(-2deg);
  clip-path: polygon(0 10%, 3% 0, 97% 6%, 100% 0, 98% 50%, 100% 100%, 3% 94%, 0 100%, 2% 50%); }
.cat { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; line-height: 1.15; letter-spacing: .3px; text-align: right; max-width: 150px; }
.cat i { flex: none; display: inline-block; width: 8px; height: 8px; border-radius: 50%; }
.b-hangul { position: absolute; left: 62px; right: 16px; top: 66px; height: 56px; display: flex; align-items: center; gap: 12px; }
.b-hangul.apilado { flex-direction: column; align-items: flex-start; justify-content: center; gap: 3px; top: 62px; height: 62px; }
.cajas { --sz: 44px; display: flex; align-items: center; flex: none; }
.cajas .grupo { display: flex; border: 1.5px solid; background: #FFFCF3; }
.cajas .s { width: var(--sz); height: var(--sz); display: flex; align-items: center; justify-content: center; font-family: 'Gaegu', 'Mali', cursive; font-weight: 700; font-size: calc(var(--sz) * .73); line-height: 1; color: #2E2B3A; }
.cajas .p { padding: 0 3px; font-family: 'Gaegu', 'Mali', cursive; font-weight: 700; font-size: calc(var(--sz) * .62); line-height: 1; color: #2E2B3A; }
.cajas .esp { display: inline-block; width: calc(var(--sz) * .3); }
.rom { font-size: 13px; letter-spacing: .5px; color: #67625C; white-space: nowrap; }
.b-sig { position: absolute; left: 60px; right: 16px; top: 126px; height: 96px; display: flex; align-items: flex-end; }
.sigw { position: relative; display: inline-block; margin-bottom: 1px; max-width: 100%; }
.sigw.dos .hl { display: none; }
.mk { background: linear-gradient(to bottom, transparent 50%, rgba(232,184,75,.42) 50%, rgba(232,184,75,.42) 84%, transparent 84%); border-radius: 4px 10px 6px 12px; padding: 0 6px; margin: 0 -6px; }
.hl { position: absolute; left: -6px; right: -8px; bottom: 15px; height: 22px; background: ${G}; opacity: .42; border-radius: 4px 10px 6px 12px; }
.sig { position: relative; display: block; font-family: 'Mali', 'Gaegu', cursive; font-weight: 700; font-size: 60px; line-height: 1; color: ${NAVY}; white-space: nowrap; }
.sig.dos { line-height: .98; }
.b-label { position: absolute; left: 62px; right: 18px; top: 222px; height: 32px; box-sizing: border-box; padding-bottom: 6px; display: flex; align-items: flex-end; gap: 6px; }
.b-label span { font-size: 11px; line-height: 1; letter-spacing: .6px; color: #67625C; }
.b-ej { position: absolute; left: 62px; right: 16px; top: 254px; height: 32px; display: flex; align-items: flex-end; }
.ej { font-family: 'Gaegu', 'Mali', cursive; font-weight: 700; font-size: 23px; line-height: 1; color: #2E2B3A; margin-bottom: -3px; white-space: nowrap; }
.ej-dos .b-ej { top: 258px; height: 64px; align-items: flex-start; }
.ej-dos .ej { white-space: normal; line-height: 32px; margin-bottom: 0; }
.b-tr { position: absolute; left: 62px; right: 16px; top: 291px; display: flex; align-items: flex-start; gap: 6px; }
.ej-dos .b-tr { top: 323px; }
.ej-cuatro .b-label { display: none; }
.ej-cuatro .b-ej { top: 226px; height: 64px; align-items: flex-start; }
.ej-cuatro .ej { white-space: normal; line-height: 32px; margin-bottom: 0; }
.b-tr { max-height: 64px; overflow: hidden; }
.ej-dos .b-tr { max-height: 34px; }
.apretado .b-tr span { line-height: 20px; }
.apretado .b-tr svg { margin-top: 5px; }
.b-tr svg { flex: none; margin-top: 12px; }
.b-tr span { font-family: 'Mali', 'Gaegu', cursive; font-weight: 500; font-size: 18px; line-height: 32px; color: #4A4560; }
.sello { position: absolute; left: 152px; top: 352px; width: 78px; height: 78px; box-sizing: border-box; border-radius: 50%; border: 3px solid; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0; opacity: .95; mix-blend-mode: multiply; }
.sello-in { position: absolute; left: 3px; top: 3px; right: 3px; bottom: 3px; border-radius: 50%; border: 1.5px solid; }
.sello .s1 { font-family: 'Gaegu', 'Mali', cursive; font-weight: 700; font-size: 22px; line-height: 1; margin-top: 2px; }
.sello .s2 { font-family: 'Gaegu', 'Mali', cursive; font-weight: 700; font-size: 14px; line-height: 1; letter-spacing: .5px; }
.sello .desgaste { position: absolute; left: -3px; top: -3px; pointer-events: none; }
.qr { position: absolute; right: 18px; top: 354px; width: 72px; display: flex; flex-direction: column; align-items: center; gap: 3px; }
.qr > svg { display: block; width: 72px; height: 72px; box-shadow: 0 0 0 1px #E2D5B6; }
.qr-cap { display: flex; align-items: center; gap: 3px; }
.qr-cap span { font-family: 'Mali', 'Gaegu', cursive; font-weight: 700; font-size: 12.5px; line-height: 1; color: ${NAVY}; }
.marca { position: absolute; left: 98px; bottom: 14px; font-size: 10.5px; letter-spacing: .4px; color: #67625C; }
/* Sello azul al pie, delante de la firma: forma la firma "[sello] Academia Seúl · nnn/163" */
.sello-marca { position: absolute; left: 62px; bottom: 15px; overflow: visible; }
`;

// Script de la página: tramas vectoriales + ajustes de texto (se ejecuta antes de imprimir)
const AJUSTE = `
var TRAMAS = ${JSON.stringify(TRAMAS)};
var NS = 'http://www.w3.org/2000/svg', nTrama = 0;
function tramas(raiz) {
  (raiz || document).querySelectorAll('svg.ilus [fill^="url(#r"]').forEach(function (el) {
    var id = (el.getAttribute('fill').match(/url\\(#(r[a-z])\\)/) || [])[1], t = TRAMAS[id];
    if (!t) return;
    var bb; try { bb = el.getBBox(); } catch (e) { return; }
    if (!bb || !bb.width || !bb.height) return;
    var svg = el.ownerSVGElement, defs = svg.querySelector('defs.tramas');
    if (!defs) { defs = document.createElementNS(NS, 'defs'); defs.setAttribute('class', 'tramas'); svg.insertBefore(defs, svg.firstChild); }
    var cid = 'tr' + (++nTrama), cp = document.createElementNS(NS, 'clipPath'); cp.setAttribute('id', cid);
    var forma = document.createElementNS(NS, el.localName);
    ['d', 'cx', 'cy', 'r', 'rx', 'ry', 'x', 'y', 'width', 'height', 'points', 'x1', 'y1', 'x2', 'y2'].forEach(function (a) { if (el.hasAttribute(a)) forma.setAttribute(a, el.getAttribute(a)); });
    cp.appendChild(forma); defs.appendChild(cp);
    var g = document.createElementNS(NS, 'g');
    if (el.hasAttribute('transform')) g.setAttribute('transform', el.getAttribute('transform'));
    g.setAttribute('clip-path', 'url(#' + cid + ')');
    var a = t[4] * Math.PI / 180, c = Math.cos(a), s = Math.sin(a), xs = [], ys = [];
    [[bb.x, bb.y], [bb.x + bb.width, bb.y], [bb.x, bb.y + bb.height], [bb.x + bb.width, bb.y + bb.height]].forEach(function (p) { xs.push(c * p[0] + s * p[1]); ys.push(-s * p[0] + c * p[1]); });
    var x0 = Math.min.apply(0, xs), x1 = Math.max.apply(0, xs), y0 = (Math.min.apply(0, ys) - 2).toFixed(1), y1 = (Math.max.apply(0, ys) + 2).toFixed(1), per = t[3], d = '';
    for (var i = Math.floor(x0 / per) - 1; i * per <= x1 + per; i++) d += 'M' + (+(i * per + t[2] / 2).toFixed(2)) + ' ' + y0 + 'V' + y1;
    var p = document.createElementNS(NS, 'path');
    p.setAttribute('d', d); p.setAttribute('transform', 'rotate(' + t[4] + ')'); p.setAttribute('fill', 'none');
    p.setAttribute('stroke', t[0]); p.setAttribute('stroke-opacity', t[1]); p.setAttribute('stroke-width', t[2]); p.setAttribute('stroke-linecap', 'butt');
    g.appendChild(p);
    el.parentNode.insertBefore(g, el);
    el.setAttribute('fill', 'none');
  });
}
// Borde áspero de tiza: bajo cada trazo va una copia un poco más ancha, en trazos cortos e irregulares
// (vectorial y liviano; reemplaza al filtro de desplazamiento que obligaba a rasterizar cada tarjeta)
var ASPERO = '1.2 3.1 0.6 4.4 2 2.6 0.8 5';
function aspero(raiz) {
  (raiz || document).querySelectorAll('svg.ilus').forEach(function (svg) {
    svg.querySelectorAll('path,ellipse,circle,rect,polygon,polyline,line').forEach(function (el) {
      if (el.closest('defs') || el.closest('[clip-path]') || el.hasAttribute('data-aspero')) return;
      var cs = getComputedStyle(el);
      if (cs.stroke === 'none' || !parseFloat(cs.strokeWidth) || !parseFloat(cs.strokeOpacity)) return;
      var c = el.cloneNode(false);
      c.setAttribute('data-aspero', '1'); c.setAttribute('fill', 'none'); c.setAttribute('stroke', cs.stroke);
      c.setAttribute('stroke-width', (parseFloat(cs.strokeWidth) + 1.2).toFixed(2));
      c.setAttribute('stroke-dasharray', ASPERO); c.setAttribute('stroke-linecap', 'butt');
      c.setAttribute('stroke-opacity', String(Math.min(0.55, parseFloat(cs.strokeOpacity) * 0.55)));
      c.removeAttribute('fill-opacity');
      el.parentNode.insertBefore(c, el);
    });
  });
}
function escH(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
// Reparte un texto en n líneas equilibradas; prefiere cortar tras coma o antes de paréntesis
function partir(txt, n) {
  var w = txt.split(' ');
  if (n <= 1 || w.length < 2) return [txt];
  n = Math.min(n, w.length);
  function largo(a, b) { return w.slice(a, b).join(' ').length; }
  function pena(b) { var p = w[b - 1], q = w[b]; if (/[,;:]$/.test(p) || p === '·') return -6; if (/^[(\\[]/.test(q)) return -4; if (/^[·\\/]$/.test(q)) return 3; return 0; }
  var best = {}, from = {};
  function key(i, k) { return i + '_' + k; }
  for (var i = 1; i <= w.length; i++) { best[key(i, 1)] = largo(0, i); from[key(i, 1)] = 0; }
  for (var k = 2; k <= n; k++) for (var i = k; i <= w.length; i++) {
    var mejor = 1e9, de = -1;
    for (var j = k - 1; j < i; j++) { var v = Math.max(best[key(j, k - 1)], largo(j, i)) + pena(j); if (v < mejor) { mejor = v; de = j; } }
    best[key(i, k)] = mejor; from[key(i, k)] = de;
  }
  var cortes = [], i2 = w.length;
  for (var k2 = n; k2 >= 1; k2--) { var j2 = from[key(i2, k2)]; cortes.unshift(w.slice(j2, i2).join(' ')); i2 = j2; }
  return cortes;
}
// Listas "이거 · 그거 · 저거": el salto de línea reemplaza al punto medio (nunca queda un "·" colgando)
function enDosKr(txt) {
  var items = txt.split(/\\s+·\\s+/);
  if (items.length < 2) return partir(txt, 2);
  var k = Math.ceil(items.length / 2);
  return [items.slice(0, k).join(' · '), items.slice(k).join(' · ')];
}
// El "·" del borde de un renglón se quita solo si ese renglón empieza en un ítem ("esto · eso" / "aquello");
// si el corte partió un ítem ("fiesta de" / "la cosecha ·" / "Año Nuevo lunar") el punto se queda para separar
function enLineasSig(txt, n) {
  var lin = partir(txt, n);
  for (var i = 1; i < lin.length; i++) if (/^·\\s+/.test(lin[i])) { lin[i] = lin[i].replace(/^·\\s+/, ''); lin[i - 1] += ' ·'; }
  var inicio = true;
  return lin.map(function (t) {
    var fin = /\\s+·$/.test(t), r = fin && inicio ? t.replace(/\\s+·$/, '') : t;
    inicio = fin;
    return r;
  });
}
// Una frase en hangul dentro del español ("우리 엄마", "이게 뭐예요?") no se parte entre renglones
function unirHangul(t) { return t.replace(/([\\uAC00-\\uD7A3]\\S*)\\s+(?=[\\uAC00-\\uD7A3])/g, '$1\\u00A0'); }
// Ni la raya de diálogo ni un guion ("K-pop", "010-1234") quedan colgando al final del renglón
function sinCortesFeos(t) { return t.replace(/—\\s+/g, '—\\u00A0').replace(/—(?=\\S)/g, '—\\u2060').replace(/(\\S)-(?=\\S)/g, '$1-\\u2060'); }
function ajustarFrente(card) {
  var h = card.querySelector('.hangul span');
  if (h) {
    var maxW = 280, txt = h.dataset.txt || h.textContent; h.dataset.txt = txt;
    h.textContent = txt; h.classList.remove('dos'); card.classList.remove('hangul-dos');
    var fs = 84; h.style.fontSize = fs + 'px';
    while (h.scrollWidth > maxW && fs > 46) { fs -= 2; h.style.fontSize = fs + 'px'; }
    if (h.scrollWidth > maxW && txt.indexOf(' ') > 0) {
      h.innerHTML = enDosKr(txt).map(escH).join('<br>'); h.classList.add('dos'); card.classList.add('hangul-dos');
      fs = 64; h.style.fontSize = fs + 'px';
      while (h.scrollWidth > maxW && fs > 32) { fs -= 2; h.style.fontSize = fs + 'px'; }
    }
    while (h.scrollWidth > maxW && fs > 26) { fs -= 2; h.style.fontSize = fs + 'px'; }
    // raya dorada a la medida de la palabra
    var raya = card.querySelector('.raya');
    if (raya) {
      var rw = Math.max(90, Math.min(292, Math.round(h.offsetWidth * 0.92 + 26)));
      raya.setAttribute('width', rw); raya.setAttribute('viewBox', '0 0 ' + rw + ' 16');
      var f = +card.dataset.n % 2 ? 1 : -1;
      raya.querySelector('path').setAttribute('d', 'M8 ' + (f > 0 ? 9 : 8) + ' C 36 ' + (f > 0 ? 3 : 13) + ', 60 ' + (f > 0 ? 13 : 3) + ', ' + (rw / 2) + ' 8 C ' + (rw * 0.7).toFixed(1) + ' 4, ' + (rw * 0.85).toFixed(1) + ' 7, ' + (rw - 8) + ' 9');
    }
  }
  var ck = card.querySelector('.cartel-kr');
  if (ck) {
    var caja = ck.parentNode, mw = caja.clientWidth - 28, mh = caja.clientHeight - 36, t2 = ck.dataset.txt || ck.textContent; ck.dataset.txt = t2;
    var mejor = null;
    for (var n = 1; n <= 3; n++) {
      var lin = partir(t2, n); if (n > 1 && lin.length < n) break;
      ck.innerHTML = lin.map(escH).join('<br>');
      var f2 = 118;
      ck.style.fontSize = f2 + 'px';
      while ((ck.scrollWidth > mw || ck.offsetHeight > mh) && f2 > 30) { f2 -= 2; ck.style.fontSize = f2 + 'px'; }
      if (!mejor || f2 > mejor.f + 6) mejor = { f: f2, html: ck.innerHTML };
    }
    ck.innerHTML = mejor.html; ck.style.fontSize = mejor.f + 'px';
  }
}
function ajustarReverso(card) {
  // 1) cajas de Hangul (+ romanización si hay)
  var hb = card.querySelector('.b-hangul'), cajas = hb.querySelector('.cajas');
  hb.classList.remove('apilado');
  var sz = 44; cajas.style.setProperty('--sz', sz + 'px');
  while (hb.scrollWidth > hb.clientWidth + 1 && sz > 28) { sz -= 2; cajas.style.setProperty('--sz', sz + 'px'); }
  if (hb.scrollWidth > hb.clientWidth + 1 && hb.querySelector('.rom')) {
    hb.classList.add('apilado'); sz = 40; cajas.style.setProperty('--sz', sz + 'px');
  }
  while (cajas.scrollWidth > hb.clientWidth + 1 && sz > 18) { sz -= 2; cajas.style.setProperty('--sz', sz + 'px'); }
  // 2) significado: 1 línea grande; si no cabe, 2 o 3 líneas (corte tras coma o antes de paréntesis)
  var caja = card.querySelector('.b-sig'), sig = card.querySelector('.sig'), sw = sig.parentNode, max = caja.clientWidth - 10, txt = sig.dataset.txt;
  var planes = [[1, 60, 44], [2, 46, 30], [3, 33, 20]], hecho = false;
  for (var i = 0; i < planes.length && !hecho; i++) {
    var n = planes[i][0], fs = planes[i][1], min = planes[i][2], lin = enLineasSig(unirHangul(txt), n);
    if (n > 1 && lin.length < n) continue;
    sw.classList.toggle('dos', n > 1); sig.classList.toggle('dos', n > 1);
    if (n === 1) sig.textContent = txt;
    else sig.innerHTML = lin.map(function (t) { return '<span class="mk">' + escH(t) + '</span>'; }).join('<br>');
    sig.style.fontSize = fs + 'px';
    while ((sig.scrollWidth > max || sig.offsetHeight > 96) && fs > min) { fs -= 2; sig.style.fontSize = fs + 'px'; }
    hecho = sig.scrollWidth <= max && sig.offsetHeight <= 96;
  }
  // Una sola palabra larga ("restaurante", "computador"): no se puede partir, así que baja un poco más la letra
  if (!hecho && txt.indexOf(' ') < 0) {
    sw.classList.remove('dos'); sig.classList.remove('dos'); sig.textContent = txt;
    var f1 = 44; sig.style.fontSize = f1 + 'px';
    while (sig.scrollWidth > max && f1 > 30) { f1 -= 1; sig.style.fontSize = f1 + 'px'; }
    hecho = sig.scrollWidth <= max;
  }
  if (!hecho) card.classList.add('aviso-sig');
  // 3) ejemplo + traducción en 3 renglones (254→350, el sello empieza en 352):
  //    a) ejemplo en 1 renglón y traducción en ≤ 2; b) ejemplo en 2 y traducción en 1; c) todo más chico
  var ej = card.querySelector('.ej');
  if (ej) {
    var tr = card.querySelector('.b-tr span'), maxEj = card.querySelector('.b-ej').clientWidth;
    var ejTxt = ej.dataset.txt || ej.textContent; ej.dataset.txt = ejTxt;
    var trTxt = tr ? (tr.dataset.txt || tr.textContent) : ''; if (tr) tr.dataset.txt = trTxt;
    // Diálogo "A — B": en el modo de 4 renglones cada turno va en su propio renglón
    var turnos = function (t) { var m = t.match(/^(.+?)\\s+(—\\s*.+)$/); return m ? [m[1], m[2]] : null; };
    var ejT = turnos(ejTxt), trT = turnos(trTxt);
    // modo: 'uno' = ejemplo en 1 renglón + traducción en ≤ 2; 'dos' = ejemplo en 2 + traducción en 1;
    //       'cuatro' = sin la etiqueta "예문 · ejemplo": ejemplo en 2 renglones + traducción en 2 (diálogos largos)
    var probar = function (modo, minEj, minTr) {
      card.classList.toggle('ej-dos', modo === 'dos');
      card.classList.toggle('ej-cuatro', modo === 'cuatro');
      var partido = modo !== 'uno' && ejT;
      if (partido) ej.innerHTML = escH(ejT[0]) + '<br>' + escH(ejT[1]); else ej.textContent = sinCortesFeos(ejTxt);
      ej.style.whiteSpace = partido ? 'nowrap' : '';
      var f2 = modo === 'uno' ? 23 : 21; ej.style.fontSize = f2 + 'px';
      if (modo === 'uno' || partido) {
        while (ej.scrollWidth > maxEj && f2 > minEj) { f2 -= 1; ej.style.fontSize = f2 + 'px'; }
        if (ej.scrollWidth > maxEj) return false;
      } else { while (ej.offsetHeight > 64 && f2 > minEj) { f2 -= 1; ej.style.fontSize = f2 + 'px'; } if (ej.offsetHeight > 64) return false; }
      if (!tr) return true;
      var lim = modo === 'dos' ? 32 : 64, f3 = 18;
      // traducción de un diálogo en 2 renglones: primero un turno por renglón (si cabe con letra ≥ 17)
      if (modo !== 'dos' && trT) {
        tr.innerHTML = escH(sinCortesFeos(unirHangul(trT[0]))) + '<br>' + escH(sinCortesFeos(unirHangul(trT[1]))); tr.style.fontSize = f3 + 'px';
        while (tr.offsetHeight > lim && f3 > 17) { f3 -= 1; tr.style.fontSize = f3 + 'px'; }
        if (tr.offsetHeight <= lim) return true;
        f3 = 18;
      }
      // si no, corte libre, pero la raya de diálogo nunca queda sola al final del renglón ("… —" / "¡Que…")
      tr.textContent = sinCortesFeos(unirHangul(trTxt)); tr.style.fontSize = f3 + 'px';
      while (tr.offsetHeight > lim && f3 > minTr) { f3 -= 1; tr.style.fontSize = f3 + 'px'; }
      return tr.offsetHeight <= lim;
    };
    card.classList.remove('apretado');
    // Un diálogo que en 1 renglón quedaría con letra chica pasa antes al modo de 4 renglones (un turno por renglón)
    if (!probar('uno', 18, 14) && !(ejT && probar('cuatro', 16, 14)) && !probar('uno', 16, 14) && !probar('dos', 15, 13) && !probar('cuatro', 16, 14) && !probar('uno', 13, 12)) {
      card.classList.add('apretado'); probar('uno', 12, 11);
    }
  }
  // 4) categoría larga: letra un poco menor
  var cat = card.querySelector('.cat'), fc = 12; cat.style.fontSize = fc + 'px';
  var head = card.querySelector('.b-head');
  while (head.scrollWidth > head.clientWidth + 1 && fc > 10) { fc -= 0.5; cat.style.fontSize = fc + 'px'; }
}
function ajustar() {
  tramas();
  aspero();
  document.querySelectorAll('.front').forEach(ajustarFrente);
  document.querySelectorAll('.back').forEach(ajustarReverso);
  document.body.setAttribute('data-listo', '1');
}
if (document.fonts && document.fonts.ready) { document.fonts.ready.then(function () { setTimeout(ajustar, 60); }); } else { window.addEventListener('load', ajustar); }
window.ajustar = ajustar;
`;

function documento(titulo, cuerpo) {
  const css = CSS.replace('TEX_PIZARRA', pathToFileURL(path.join(TEX, 'pizarra.jpg')).href).replace('TEX_GRANO', pathToFileURL(path.join(TEX, 'grano.png')).href);
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Gaegu:wght@400;700&family=Gowun+Dodum&family=Mali:wght@400;500;700&display=swap" rel="stylesheet">
<style>${css}</style>
</head>
<body>
${defsSello()}
${defsGlobales()}
${cuerpo}
<script>${AJUSTE}</script>
</body>
</html>
`;
}

async function qrSvg(d) {
  let s = await QR.toString(d.audio, { type: 'svg', margin: 4, errorCorrectionLevel: 'M', color: { dark: NAVY, light: '#FFFFFF' } });
  return s.replace('<svg ', `<svg width="72" height="72" role="img" aria-label="QR: audio de ${esc(d.kr)}" `).trim();
}

async function construirHTML(tarjetas, total, ilus, titulo) {
  const paginas = [];
  for (let g = 0; g < tarjetas.length; g += 4) {
    const grupo = tarjetas.slice(g, g + 4);
    while (grupo.length < 4) grupo.push(null);
    const rango = `${pad3(grupo[0].n)}–${pad3(grupo.filter(Boolean).pop().n)}`;
    paginas.push(pagina(grupo.map((d) => d && anverso(d, ilus[d.n], total)), `Anversos ${rango}`));
    // Reversos con columnas invertidas: impresión a doble cara, volteo por el borde largo
    const rev = [grupo[1], grupo[0], grupo[3], grupo[2]];
    const caras = [];
    for (const d of rev) caras.push(d ? reverso(d, await qrSvg(d), total) : null);
    paginas.push(pagina(caras, `Reversos ${rango}`));
  }
  return documento(titulo, paginas.join('\n'));
}

async function abrir(browser, html, nombre) {
  fs.mkdirSync(HTML_DIR, { recursive: true });
  const f = path.join(HTML_DIR, nombre + '.html');
  fs.writeFileSync(f, html, 'utf8');
  const page = await browser.newPage();
  await page.setViewport({ width: 900, height: 1100, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(f).href, { waitUntil: 'networkidle0', timeout: 120000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForSelector('body[data-listo="1"]', { timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  return page;
}

// Avisos de textos que no caben cómodos (para acortarlos en el JSON)
async function avisosTexto(page) {
  const av = await page.evaluate(() => [...document.querySelectorAll('.back')].map((c) => {
    const kr = c.querySelector('.cajas').textContent.trim();
    const m = [];
    if (c.classList.contains('aviso-sig')) m.push('significado demasiado largo');
    if (c.classList.contains('apretado')) m.push('ejemplo/traducción apretados (letra mínima)');
    return m.length ? `  ! ${String(c.dataset.n).padStart(3, '0')} ${kr}: ${m.join(' · ')}` : null;
  }).filter(Boolean));
  av.forEach((l) => console.warn(l));
}

async function verificarQR(page) {
  if (!jsQR) { console.log('  (jsQR no disponible: QR sin verificar)'); return 0; }
  await page.setViewport({ width: 900, height: 1100, deviceScaleFactor: 3 });
  const els = await page.$$('.back .qr > svg');
  let malos = 0;
  for (const el of els) {
    const esperado = await el.evaluate((e) => e.closest('.back').dataset.audio);
    const img = PNG.sync.read(Buffer.from(await el.screenshot({ type: "png" })));
    const r = jsQR(new Uint8ClampedArray(img.data), img.width, img.height);
    if (!r || r.data !== esperado) { malos++; console.warn('  ! QR ilegible o distinto:', esperado, '→', r && r.data); }
  }
  await page.setViewport({ width: 900, height: 1100, deviceScaleFactor: 1 });
  return { total: els.length, malos };
}

async function hojaContacto(page, titulo, png) {
  await page.evaluate((titulo) => {
    const caras = [...document.querySelectorAll('.card')];
    const ns = [...new Set(caras.map((c) => +c.dataset.n))].sort((a, b) => a - b);
    const por = {};
    caras.forEach((c) => { por[c.dataset.cara + c.dataset.n] = c; });
    const hoja = document.createElement('div');
    hoja.id = 'hoja';
    hoja.innerHTML = '<h1></h1>';
    hoja.querySelector('h1').textContent = titulo;
    const pad = (n) => String(n).padStart(3, '0');
    for (let i = 0; i < ns.length; i += 7) {
      const tramo = ns.slice(i, i + 7);
      for (const [t, nombre] of [['a', 'Anversos'], ['r', 'Reversos']]) {
        const et = document.createElement('div'); et.className = 'et'; et.textContent = `${nombre} ${pad(tramo[0])}–${pad(tramo[tramo.length - 1])}`; hoja.appendChild(et);
        const fila = document.createElement('div'); fila.className = 'fila';
        for (const n of tramo) { const m = document.createElement('div'); m.className = 'mini'; m.appendChild(por[t + n]); fila.appendChild(m); }
        hoja.appendChild(fila);
      }
    }
    document.querySelectorAll('.page').forEach((p) => p.remove());
    const st = document.createElement('style');
    st.textContent = `body{background:#ECE7DA!important;padding:0!important}
      #hoja{padding:22px 28px 26px;width:max-content}
      #hoja h1{margin:0 0 4px;font-family:'Gowun Dodum',sans-serif;font-size:20px;color:#003478;font-weight:400}
      .et{font-family:'Gowun Dodum',sans-serif;font-size:13px;color:#5F5A54;margin:12px 0 6px}
      .fila{display:flex;gap:14px}
      .mini{width:168px;height:228px;position:relative;overflow:hidden;outline:1px solid rgba(40,30,10,.18)}
      .mini .card{position:absolute;left:0;top:0;transform:scale(.5);transform-origin:0 0}`;
    document.head.appendChild(st);
    document.body.prepend(hoja);
  }, titulo);
  await page.setViewport({ width: 1400, height: 1100, deviceScaleFactor: 1.25 });
  await new Promise((r) => setTimeout(r, 300));
  const el = await page.$('#hoja');
  await el.screenshot({ path: png });
}

async function imprimir(page, pdf) {
  await page.emulateMediaType('print');
  await page.pdf({ path: pdf, format: 'letter', printBackground: true, preferCSSPageSize: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  await page.emulateMediaType('screen');
}

const kb = (f) => (fs.statSync(f).size / 1048576).toFixed(2) + ' MB';

// ---------- Modo muestra: revisar dibujos sin armar el mazo ----------
async function muestra(browser, datos) {
  const pedidos = ARGS.slice(ARGS.indexOf('--muestra') + 1).filter((a) => !a.startsWith('--') && a !== opt('--png'));
  let archivos = fs.readdirSync(ILUS).filter((f) => /^[0-9a-f]+\.svg$/.test(f)).sort();
  if (pedidos.length) {
    const quiero = new Set(pedidos.map((p) => (/^[0-9a-f]+$/.test(p) ? p : hex(p))));
    archivos = archivos.filter((f) => quiero.has(f.replace('.svg', '')));
    for (const q of quiero) if (!archivos.includes(q + '.svg')) console.warn('  ! no existe ilustraciones/' + q + '.svg');
  }
  if (!archivos.length) { console.log('No hay ilustraciones que mostrar.'); return; }
  const porHex = {};
  datos.forEach((d) => { porHex[hex(d.kr)] = d; });
  const celdas = archivos.map((f, i) => {
    const h = f.replace('.svg', '');
    const kr = Buffer.from(h, 'hex').toString('utf8');
    const d = porHex[h] || { n: i + 1, kr, es: '', categoria: 'Objetos', color: CAT.Objetos };
    const v = validarIlustracion(fs.readFileSync(path.join(ILUS, f), 'utf8'));
    const ilu = { estado: v.errores.length ? 'invalida' : 'ok', ...v };
    const nota = v.errores.length ? `<b>ERROR:</b> ${esc(v.errores.join(' · '))}` : v.avisos.length ? `aviso: ${esc(v.avisos.join(' · '))}` : 'ok';
    console.log(`  ${v.errores.length ? 'ERROR' : v.avisos.length ? 'aviso' : 'ok   '} ${kr} (${f})${v.errores.length || v.avisos.length ? ': ' + v.errores.concat(v.avisos).join(' · ') : ''}`);
    return `<div class="celda"><div class="mini">${anverso(d, ilu, datos.length)}</div><div class="pie"><span lang="ko">${esc(kr)}</span> · ${esc(d.es || '')}<br><code>${h}.svg</code><br><small>${nota}</small></div></div>`;
  });
  const html = documento('Muestra de ilustraciones', `<div id="hoja"><h1>Ilustraciones · ${ESTILO} · ${archivos.length}</h1><div class="grilla">${celdas.join('')}</div></div>
<style>body{background:#ECE7DA!important;padding:0!important}#hoja{padding:20px 24px;width:max-content}
#hoja h1{margin:0 0 10px;font-family:'Gowun Dodum',sans-serif;font-size:20px;color:#003478;font-weight:400}
.grilla{display:grid;grid-template-columns:repeat(${Math.min(6, archivos.length)},252px);gap:16px 14px}
.mini{width:252px;height:342px;position:relative;overflow:hidden}.mini .card{position:absolute;left:0;top:0;transform:scale(.75);transform-origin:0 0}
.pie{font-family:'Gowun Dodum',sans-serif;font-size:12px;color:#2E2B3A;margin-top:4px;line-height:1.35;width:252px;overflow-wrap:anywhere}.pie code{font-size:11px;color:#5F5A54}.pie b{color:#003478}</style>`);
  const nombre = `_muestra_${process.pid}`; // nombre único: varios dibujantes pueden correrlo a la vez
  const page = await abrir(browser, html, nombre);
  await page.setViewport({ width: 1700, height: 1000, deviceScaleFactor: 1.5 });
  await new Promise((r) => setTimeout(r, 300));
  const salida = path.resolve(opt('--png') || path.join(ILUS, '_muestra.png'));
  await (await page.$('#hoja')).screenshot({ path: salida });
  await page.close();
  try { fs.unlinkSync(path.join(HTML_DIR, nombre + '.html')); } catch (e) { /* nada */ }
  console.log('Muestra:', salida);
}

// ---------- Principal ----------
(async () => {
  const { archivo, datos } = cargarDatos();
  const total = datos.length;
  console.log(`Datos: ${archivo} (${total} palabras)`);
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--disable-lcd-text', '--allow-file-access-from-files'] });
  try {
    if (has('--texturas') || !fs.existsSync(path.join(TEX, 'pizarra.jpg')) || !fs.existsSync(path.join(TEX, 'grano.png'))) await generarTexturas(browser);
    if (has('--muestra')) { await muestra(browser, datos); return; }
    if (has('--texturas') && ARGS.length === 1) return;

    const ilus = cargarIlustraciones(datos);
    const faltan = datos.filter((d) => ilus[d.n].estado !== 'ok');
    for (const d of datos) if (ilus[d.n].estado === 'invalida') console.warn(`  ! ${d.kr} (${path.basename(ilus[d.n].archivo)}): ${ilus[d.n].errores.join(' · ')} → anverso tipográfico`);
    console.log(`Ilustraciones: ${total - faltan.length}/${total} · tipográficas de reserva: ${faltan.length}`);
    if (!opt('--salida')) {
      const lista = faltan.map((d) => `${pad3(d.n)}\tS${d.semana}\t${hex(d.kr)}.svg\t${d.kr}\t${d.es}\t${d.categoria}${d.dibujo ? '\t' + d.dibujo : ''}`);
      fs.writeFileSync(path.join(ILUS, '_faltantes.txt'), `# Palabras sin ilustración válida (n · semana · archivo · kr · es · categoría · dibujo)\n${lista.join('\n')}\n`, 'utf8');
    }
    fs.mkdirSync(OUT, { recursive: true });

    const semanasPedidas = optAll('--semana').map(Number);
    const soloCompleto = has('--completo');
    const semanas = [...new Set(datos.map((d) => d.semana))].sort((a, b) => a - b).filter((s) => (semanasPedidas.length ? semanasPedidas.includes(s) : !soloCompleto));
    for (const s of semanas) {
      const tarjetas = datos.filter((d) => d.semana === s);
      const titulo = `Flashcards Básico 1 · ${ESTILO} · Semana ${s} (${tarjetas.length} tarjetas)`;
      const page = await abrir(browser, await construirHTML(tarjetas, total, ilus, titulo), `S${s}`);
      const pdf = path.join(OUT, `${BASE}_S${s}.pdf`);
      await avisosTexto(page);
      await imprimir(page, pdf);
      const qr = has('--sin-qr') ? null : await verificarQR(page);
      const png = path.join(OUT, `vista_S${s}.png`);
      await hojaContacto(page, titulo, png);
      await page.close();
      console.log(`S${s}: ${tarjetas.length} tarjetas · ${path.basename(pdf)} ${kb(pdf)}${qr ? ` · QR ${qr.total - qr.malos}/${qr.total} ok` : ''} · ${path.basename(png)} ${kb(png)}`);
    }
    if (!semanasPedidas.length) {
      const titulo = `Flashcards Básico 1 · ${ESTILO} · completo (${total} tarjetas)`;
      const page = await abrir(browser, await construirHTML(datos, total, ilus, titulo), 'completo');
      const pdf = path.join(OUT, `${BASE}_completo.pdf`);
      await imprimir(page, pdf);
      await page.close();
      console.log(`Completo: ${total} tarjetas · ${path.basename(pdf)} ${kb(pdf)}`);
    }
  } finally {
    await browser.close();
  }
})().catch((e) => { console.error(e); process.exit(1); });
