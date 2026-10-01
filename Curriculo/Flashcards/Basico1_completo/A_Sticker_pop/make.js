// Flashcards Básico 1 · mazo completo · Estilo A · Sticker pop
//
// Lee ../palabras_basico1.json (si no existe, ../../Basico1_5_estilos/palabras.json),
// toma cada ilustración de ilustraciones/<hex UTF-8 de kr>.svg (si falta, arma un
// anverso tipográfico de reserva) y genera, en tarjetas de 3,5 × 4,75 in, 4 por hoja
// carta, con marcas de corte y reversos espejados para doble cara por el borde largo:
//   Flashcards_Basico1_A_Sticker_pop_S1.pdf … _S8.pdf   (numeración global 001/163)
//   Flashcards_Basico1_A_Sticker_pop_completo.pdf
//   vista_S1.png … vista_S8.png                        (hojas de contacto)
//   tarjetas.html                                      (todas las caras, para mirar en el navegador)
//
// Uso (desde cualquier carpeta):
//   node make.js                       todo (PDF por semana + completo + hojas de contacto)
//   node make.js --semana 3            solo la semana 3 (PDF + vista_S3.png); admite 3,5
//   node make.js --validar             revisa las ilustraciones (paleta, viewBox, prohibidos) sin renderizar
//   node make.js --muestra 우유,엄마    hoja de contacto de esas tarjetas (por kr o por n) → PNG en %TEMP%
//        [--png C:/ruta/muestra.png]
//   --datos <archivo.json>             usar otro JSON de palabras
//   --salida <carpeta>                 escribir las salidas en otra carpeta (pruebas)
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const SCRATCH = 'C:/Users/Chingu/AppData/Local/Temp/claude/C--Users-Chingu-Desktop-ACADEMIASEULWEB/d4111e1b-5523-44ea-97b2-b1a1d9545b9e/scratchpad/package.json';
const req = require('module').createRequire(SCRATCH);
const QR = req('qrcode');
const puppeteer = req('puppeteer-core');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const DIR = __dirname;
const ILU_DIR = path.join(DIR, 'ilustraciones');
const BASE = 'Flashcards_Basico1_A_Sticker_pop';
const ESTILO = 'A · Sticker pop';

// ---------- Argumentos ----------
const ARGS = (() => {
  const a = process.argv.slice(2), o = {};
  for (let i = 0; i < a.length; i++) {
    const k = a[i];
    if (!k.startsWith('--')) continue;
    const v = a[i + 1] && !a[i + 1].startsWith('--') ? a[++i] : true;
    o[k.slice(2)] = v;
  }
  return o;
})();
const SALIDA = ARGS.salida ? path.resolve(String(ARGS.salida)) : DIR;

// ---------- Paleta (sin rojo ni rosado) ----------
const D = '#14142B', W = '#FFFFFF', AZ = '#4236F6', NAVY = '#003478', GOLD = '#E8B84B';
// 10 categorías: tonos del estilo, escalonados por luminosidad (L ≈ 0,26 → 0,84) y
// todos con contraste ≥ 5,3:1 contra la tinta #14142B (la píldora y el resaltado llevan texto oscuro).
const CAT = {
  'Tiempo y rutina':             '#8C7CF0', // violeta        L 0,26
  'Preguntas y palabras útiles': '#4AA3E6', // celeste fuerte L 0,33
  'Acciones':                    '#42C07A', // verde          L 0,40
  'Personas y familia':          '#F29B4E', // naranja        L 0,43
  'Comida y bebida':             '#E8B84B', // dorado         L 0,52 (mazo aprobado)
  'Objetos':                     '#CDC0FF', // lila           L 0,58 (mazo aprobado, un punto más claro)
  'Naturaleza y animales':       '#8FE3C6', // menta          L 0,65 (mazo aprobado)
  'Lugares':                     '#B5E1FF', // cielo          L 0,71
  'Saludos y frases':            '#DDEF7A', // lima           L 0,79
  'Posición':                    '#E9ECF8', // gris lavanda   L 0,84
};
const CAT_ALIAS = { 'Naturaleza': 'Naturaleza y animales', 'Animales': 'Naturaleza y animales', 'Posicion': 'Posición', 'Personas': 'Personas y familia' };
const CAT_RESERVA = '#E9ECF8';
const mezcla = (hex, t) => '#' + [1, 3, 5].map(i => Math.round(parseInt(hex.slice(i, i + 2), 16) * (1 - t) + 255 * t).toString(16).padStart(2, '0')).join('').toUpperCase();
function colorCat(cat) {
  const k = CAT[cat] ? cat : CAT_ALIAS[cat];
  const bg = CAT[k] || CAT_RESERVA;
  return { nombre: k || cat, bg, tint: mezcla(bg, 0.7) };
}

// Paleta permitida en las ilustraciones (ver ilustraciones/_GUIA.md). Fuera de lista = aviso;
// rojo o rosado = error y la tarjeta usa el anverso tipográfico.
const PALETA = new Set([
  '#14142B', '#FFFFFF',                                                                   // tinta y blanco
  '#4236F6', '#2A1FC7', '#003478', '#DCE0FA', '#8FB0FF', '#9DB7FF', '#9FD8FF', '#E6F5FF', '#F3F6FF', '#B3B8D6', // azules
  '#C7B8FF', '#ECE6FF',                                                                   // lilas
  '#E8B84B', '#B9861E', '#FFF4D9', '#FFE6B8', '#EDC27E', '#DDA45A', '#FFD95E', '#F29B4E', // dorados, amarillo, naranja
  '#5CC98A', '#2F8F57', '#7FD69A', '#B4F0C8', '#8FE3C6', '#6FCFAE',                       // verdes
  '#C98A3E', '#A86B3C', '#74461F', '#6E4424', '#A0703F', '#D9A35F', '#4A3426',            // marrones
  '#FFB98A', '#FFC59E',                                                                   // mejillas (durazno)
  '#FFE0C4', '#F3C39A', '#C98A5E', '#8D5A3B',                                             // piel
  '#E3E6F2', '#8A8FA8', '#5E6280',                                                        // grises
]);

// ---------- Utilidades ----------
const f = n => +(+n).toFixed(2);
const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const hexDe = s => Buffer.from(String(s), 'utf8').toString('hex');
const silabas = s => [...String(s)].filter(ch => /[\uAC00-\uD7A3]/.test(ch)).length || [...String(s).replace(/\s/g, '')].length;
function sparkle(x, y, r) {
  const k = 0.2 * r;
  return `<path d="M${f(x)} ${f(y - r)} Q${f(x + k)} ${f(y - k)} ${f(x + r)} ${f(y)} Q${f(x + k)} ${f(y + k)} ${f(x)} ${f(y + r)} Q${f(x - k)} ${f(y + k)} ${f(x - r)} ${f(y)} Q${f(x - k)} ${f(y - k)} ${f(x)} ${f(y - r)} Z" fill="${W}" stroke="${D}" stroke-width="3" stroke-linejoin="round"/>`;
}
const ring = (x, y, r = 6) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${D}" stroke-width="3"/>`;

function hsl(hex) {
  const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255);
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn, l = (mx + mn) / 2;
  let h = 0;
  if (d) { if (mx === r) h = ((g - b) / d) % 6; else if (mx === g) h = (b - r) / d + 2; else h = (r - g) / d + 4; h *= 60; if (h < 0) h += 360; }
  return { h, s: d ? d / (1 - Math.abs(2 * l - 1)) : 0, l };
}
const esRojoRosado = hex => { const { h, s, l } = hsl(hex); return s >= 0.25 && l > 0.18 && l < 0.95 && (h >= 300 || h < 18); };
const NOMBRES_ROJOS = /^(red|darkred|crimson|firebrick|indianred|tomato|coral|lightcoral|salmon|darksalmon|lightsalmon|orangered|pink|lightpink|hotpink|deeppink|palevioletred|mediumvioletred|magenta|fuchsia|maroon|rosybrown|violet|orchid|plum)$/i;

// ---------- Ilustraciones ----------
function normHex(c) {
  c = c.toUpperCase();
  if (/^#[0-9A-F]{3}$/.test(c)) c = '#' + c.slice(1).split('').map(x => x + x).join('');
  if (/^#[0-9A-F]{8}$/.test(c)) c = c.slice(0, 7);
  return c;
}
function validarSVG(txt) {
  const errores = [], avisos = [];
  const raiz = txt.match(/<svg\b[^>]*>/i);
  if (!raiz) { errores.push('no hay elemento <svg>'); return { errores, avisos }; }
  const vb = raiz[0].match(/viewBox\s*=\s*"([^"]*)"/i);
  if (!vb || vb[1].trim().split(/[\s,]+/).map(Number).join(' ') !== '0 0 220 220') errores.push(`viewBox debe ser "0 0 220 220" (tiene ${vb ? '"' + vb[1] + '"' : 'ninguno'})`);
  if (/<text\b/i.test(txt)) avisos.push('usa <text>: la palabra ya va en la tarjeta; dibuja sin letras');
  if (/<(image|foreignObject|script|style)\b/i.test(txt)) errores.push('contiene <image>, <foreignObject>, <script> o <style>');
  if (/href\s*=\s*"(?!#)/i.test(txt)) errores.push('referencia externa en href');
  if (/<(linearGradient|radialGradient|filter|pattern|mask)\b/i.test(txt)) avisos.push('usa degradados, filtros, patrones o máscaras: el estilo es de color plano');
  if (/\bclass\s*=/.test(txt)) avisos.push('usa class: los estilos van como atributos');
  const ops = [...txt.matchAll(/\b(?:fill-|stroke-)?opacity\s*=\s*"([^"]+)"/g)].map(m => +m[1]).filter(v => v !== 0.28 && v !== 1);
  if (ops.length) avisos.push('opacidades distintas de 0.28 (sombra): ' + [...new Set(ops)].join(', '));
  const fuera = new Set(), rojos = new Set();
  for (const m of txt.matchAll(/(?:fill|stroke|stop-color|color|flood-color)\s*[=:]\s*"?\s*(#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)|[a-zA-Z]+)/g)) {
    let c = m[1];
    if (/^(none|transparent|currentColor|inherit)$/i.test(c)) continue;
    if (/^(rgb|hsl)/i.test(c)) { avisos.push('color en ' + c + ': usa hex de la paleta'); continue; }
    if (/^[a-zA-Z]+$/.test(c)) { if (NOMBRES_ROJOS.test(c)) rojos.add(c); else fuera.add(c); continue; }
    c = normHex(c);
    if (esRojoRosado(c)) rojos.add(c);
    else if (!PALETA.has(c)) fuera.add(c);
  }
  if (rojos.size) errores.push('ROJO o ROSADO (prohibido): ' + [...rojos].join(', '));
  if (fuera.size) avisos.push('colores fuera de la paleta: ' + [...fuera].join(', '));
  return { errores, avisos };
}
function cargarIlustracion(p) {
  const hex = hexDe(p.kr), n3 = String(p.n).padStart(3, '0');
  for (const nombre of [`${hex}_${n3}.svg`, `${hex}.svg`]) {
    const archivo = path.join(ILU_DIR, nombre);
    if (!fs.existsSync(archivo)) continue;
    let txt = fs.readFileSync(archivo, 'utf8').replace(/^\uFEFF/, '').replace(/<\?xml[^>]*\?>/g, '').replace(/<!--[\s\S]*?-->/g, '');
    const { errores, avisos } = validarSVG(txt);
    if (errores.length) return { archivo: nombre, errores, avisos, svg: null };
    let inner = txt.replace(/^[\s\S]*?<svg\b[^>]*>/i, '').replace(/<\/svg>\s*$/i, '');
    // ids locales → únicos en el documento (dos dibujos pueden usar el mismo id "clip")
    const pref = 'i' + hex + '_' + n3 + '-';
    for (const id of new Set([...inner.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]))) {
      inner = inner.split(`id="${id}"`).join(`id="${pref + id}"`).split(`url(#${id})`).join(`url(#${pref + id})`).split(`href="#${id}"`).join(`href="#${pref + id}"`);
    }
    return { archivo: nombre, errores, avisos, svg: inner.trim() };
  }
  return null;
}

// Anverso tipográfico de reserva: el hangul como sticker (sombra + borde tinta + borde blanco),
// sobre el color de la categoría, con chispas y anillo. El script de la página lo encaja en el panel.
function lineasTipo(kr) {
  const s = String(kr).trim();
  if (s.includes('·')) return s.split('·').map(x => x.trim()).filter(Boolean);
  const pal = s.split(/\s+/);
  if (pal.length < 2 || silabas(s) <= 5) return [s];
  let mejor = [s], peor = Infinity;
  for (let i = 1; i < pal.length; i++) {
    const a = pal.slice(0, i).join(' '), b = pal.slice(i).join(' ');
    const m = Math.max(silabas(a), silabas(b));
    if (m < peor) { peor = m; mejor = [a, b]; }
  }
  return mejor;
}
function anversoTipografico(p) {
  const lin = lineasTipo(p.kr), FS = 100, LH = 1.12;
  const tsp = lin.map((l, i) => `<tspan x="0" y="${f((i - (lin.length - 1) / 2) * FS * LH + FS * 0.36)}">${esc(l)}</tspan>`).join('');
  const t = attrs => `<text font-family="'Black Han Sans', sans-serif" font-size="${FS}" text-anchor="middle" ${attrs}>${tsp}</text>`;
  return `<g class="tipo"><g class="tipo-in">`
    + `<g transform="translate(6 7)" opacity="0.28">${t(`fill="${D}" stroke="${D}" stroke-width="26" stroke-linejoin="round"`)}</g>`
    + t(`fill="${D}" stroke="${D}" stroke-width="26" stroke-linejoin="round"`)
    + t(`fill="${W}" stroke="${W}" stroke-width="18" stroke-linejoin="round"`)
    + t(`fill="${AZ}" stroke="${D}" stroke-width="3" stroke-linejoin="round"`)
    + `</g></g>`
    + sparkle(26, 28, 11) + sparkle(196, 30, 9) + sparkle(22, 184, 8) + ring(203, 178, 5);
}

// ---------- Iconos ----------
const ICON_AUDIO = `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="${D}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9.5 L7.5 9.5 L12.5 5.5 L12.5 18.5 L7.5 14.5 L4 14.5 Z" fill="${W}"/><path d="M16 9.2 C17.2 10.6 17.2 13.4 16 14.8"/><path d="M18.8 6.6 C21.4 9.6 21.4 14.4 18.8 17.4"/></svg>`;
const ICON_AUDIO_MINI = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${D}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9.5 L7.5 9.5 L12.5 5.5 L12.5 18.5 L7.5 14.5 L4 14.5 Z" fill="${GOLD}"/><path d="M16 9.2 C17.2 10.6 17.2 13.4 16 14.8"/><path d="M18.8 6.6 C21.4 9.6 21.4 14.4 18.8 17.4"/></svg>`;
const ICON_FLECHA = `<svg width="16" height="14" viewBox="0 0 16 14" fill="none" stroke="#3A3D55" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 7 L13 7"/><path d="M9 3 L13 7 L9 11"/></svg>`;
const ONDA = `<svg width="93" height="16" viewBox="0 0 93 16" fill="none" aria-hidden="true"><path d="M3 8 Q10.25 0 17.5 8 T32 8 T46.5 8 T61 8 T75.5 8 T90 8" stroke="${D}" stroke-width="3.5" stroke-linecap="round"/></svg>`;

// ---------- Sello del tigre v2 (línea, sin marco) ----------
// Vector de una tinta: ../../marca/sello_linea_v2.svg (ver marca/LEEME.md). Va UNA vez como
// <symbol id="sello-as"> al inicio del documento y cada cara lo usa con <use> (el PDF no repite la ruta
// en el HTML); el color sale de style="color:…". Colores permitidos: azul #4236F6, lila #A99BFF,
// crema #F3F0E4 (fondos oscuros), negro #111. Nunca coral ni rosado.
//   Anverso: azul, 0,38 in, esquina superior derecha del panel (el número va arriba a la izquierda y el
//            audio abajo a la derecha), con el contorno blanco de sticker del estilo.
//   Reverso: azul, 0,32 in, en el pie junto a "Academia Seúl" (reemplaza la estrellita).
const SELLO_ANV_IN = 0.38, SELLO_REV_IN = 0.32;  // ancho en pulgadas (96 px = 1 in)
const SELLO_HALO_PX = 2;                          // contorno blanco del anverso, por lado
const SELLO = (() => {
  const archivo = path.resolve(DIR, '..', '..', 'marca', 'sello_linea_v2.svg');
  const s = fs.readFileSync(archivo, 'utf8');
  const vb = (s.match(/viewBox\s*=\s*"([^"]+)"/) || [])[1];
  // las 5 rutas son de la misma tinta (nonzero, transform identidad): se unen en una sola
  const d0 = [...s.matchAll(/\sd="([^"]+)"/g)].map(m => m[1].trim()).join(' ');
  if (!vb || !d0) throw new Error('No pude leer el sello: ' + archivo);
  if (/matrix\((?!1 0 0 1 0 0\))/.test(s) || /transform="(?!matrix\(1 0 0 1 0 0\))/.test(s)) throw new Error('El sello trae transformaciones: revisar antes de unir rutas');
  const [x0, y0, w, h] = vb.split(/[\s,]+/).map(Number);
  // Chrome escribe en el PDF las coordenadas tal como vienen: se llevan al origen (0,0) y se redondean a
  // 0,1 unidad (≈ 0,03 px con el sello a 0,38 in, invisible) para que las 326 copias pesen ~40 % menos.
  // Solo hay comandos absolutos M y C (pares x,y); si el archivo cambia, se usa la ruta tal cual.
  let d = d0;
  if (/^[MC\d\s.,-]+$/.test(d0)) {
    let i = 0;
    d = d0.replace(/[MC]|-?\d*\.?\d+(?:e-?\d+)?/g, t => /[MC]/.test(t) ? t : String(+(+t - (i++ % 2 ? y0 : x0)).toFixed(1)));
  }
  return { vb: `0 0 ${w} ${h}`, d, w, ratio: h / w };
})();
const selloSymbol = () => `<svg class="defs" width="0" height="0" aria-hidden="true" focusable="false"><symbol id="sello-as" viewBox="${SELLO.vb}" overflow="visible"><path fill="currentColor" d="${SELLO.d}"/></symbol></svg>`;
function sello(clase, pulgadas, color, haloPx = 0) {
  const w = f(pulgadas * 96), h = f(w * SELLO.ratio);
  // el halo es la misma figura en blanco con trazo redondeado (en unidades del símbolo) debajo de la tinta
  const halo = haloPx ? `<use href="#sello-as" width="${w}" height="${h}" style="color:${W}" stroke="${W}" stroke-width="${f(2 * haloPx * SELLO.w / w)}" stroke-linejoin="round" stroke-linecap="round"/>` : '';
  return `<svg class="${clase}" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" overflow="visible" style="color:${color}" role="img" aria-label="Sello de Academia Seúl">${halo}<use href="#sello-as" width="${w}" height="${h}"/></svg>`;
}

// ---------- Datos ----------
function leerDatos() {
  const cands = ARGS.datos ? [path.resolve(String(ARGS.datos))]
    : [path.join(DIR, '..', 'palabras_basico1.json'), path.join(DIR, '..', '..', 'Basico1_5_estilos', 'palabras.json')];
  const archivo = cands.find(c => fs.existsSync(c));
  if (!archivo) throw new Error('No encuentro el JSON de palabras: ' + cands.join(' | '));
  const crudo = JSON.parse(fs.readFileSync(archivo, 'utf8'));
  const lista = Array.isArray(crudo) ? crudo : (crudo.palabras || []);
  const vacio = v => v == null || /^\s*(—|-|–)?\s*$/.test(String(v));
  const palabras = lista.map((p, i) => ({
    n: +p.n || i + 1,
    kr: String(p.kr || '').trim(),
    rom: vacio(p.rom) ? '' : String(p.rom).trim(),
    es: String(p.es || '').trim(),
    semana: +p.semana || 0,
    tipo: p.tipo || '',
    categoria: String(p.categoria || '').trim(),
    ejemplo_kr: vacio(p.ejemplo_kr) ? '' : String(p.ejemplo_kr).trim(),
    ejemplo_es: vacio(p.ejemplo_es) ? '' : String(p.ejemplo_es).trim(),
    audio: vacio(p.audio) ? '' : String(p.audio).trim(),
    tipo_dibujo: p.tipo_dibujo || '',
  })).sort((a, b) => a.n - b.n);
  return { archivo, palabras, total: Math.max(palabras.length, ...palabras.map(p => p.n)) };
}

// Resalta la palabra en el ejemplo: exacta, por partes (이거 · 그거) o por la raíz del verbo (가다 → 가요).
// Prefiere la aparición a comienzo de palabra (요 en "요예요", no el 요 final de "아니에요").
function envolverHL(txt, c) {
  let idx = -1;
  for (let i = txt.indexOf(c); i !== -1; i = txt.indexOf(c, i + 1)) {
    if (i === 0 || /[\s.,!?…—–(¿¡"'·]/.test(txt[i - 1])) { idx = i; break; }
  }
  if (idx === -1) idx = txt.indexOf(c);
  return txt.slice(0, idx) + `<span class="hl">${c}</span>` + txt.slice(idx + c.length);
}
// Si no aparece tal cual, prueba la forma conjugada que trae la nota del significado ("venir (와요)" → 와요):
// sin esto 오다/보다/하다/쓰다/듣다 quedaban sin resaltar y 그리다 resaltaba "그림을" en vez de "그려요".
function resaltar(ejemplo, kr, es = '') {
  const e = esc(ejemplo);
  const cands = [kr, ...kr.split(/\s*[·,/]\s*/)].map(s => s.trim()).filter(Boolean);
  for (const c of cands) { const ec = esc(c); if (e.includes(ec)) return envolverHL(e, ec); }
  const nota = (String(es).match(/\(([^)]*)\)\s*$/) || [])[1] || '';
  for (const forma of nota.split(/[^가-힣]+/).filter(x => x.length >= 2)) { if (e.includes(forma)) return envolverHL(e, forma); }
  if (/다$/.test(kr) && kr.length >= 2) {
    const raiz = kr.slice(0, -1);
    const min = Math.max(1, [...raiz].length - 1);
    const tokens = ejemplo.split(/\s+/);
    for (let k = [...raiz].length; k >= min; k--) {
      const pre = [...raiz].slice(0, k).join('');
      const tok = tokens.find(t => t.startsWith(pre));
      if (tok) { const limpio = tok.replace(/[.?!,…]+$/, ''); return envolverHL(e, esc(limpio)); }
    }
  }
  return e;
}
// "a · b": el punto medio se queda al final de la línea (no abre la siguiente)
const puntoMedio = s => esc(s).replace(/ · /g, ' · ');
// Traducción del ejemplo: sin palabras huérfanas cortas al final ("…la salida 3.")
const sinHuerfana = s => esc(s).replace(/ (\S{1,4})$/, ' $1');
// Anverso: "이거 · 그거 · 저거" en una línea con separador estrecho (el hangul sale más grande)
const hangulFrente = s => esc(s).replace(/\s*·\s*/g, '<span class="sep">·</span>');

// ---------- Caras ----------
function anverso(p, total, ilu) {
  const c = colorCat(p.categoria);
  const sil = silabas(p.kr);
  const fsz = sil <= 1 ? 108 : sil === 2 ? 96 : sil === 3 ? 80 : sil === 4 ? 64 : sil === 5 ? 54 : 46;
  const dibujo = ilu && ilu.svg ? ilu.svg : anversoTipografico(p);
  return `<div class="card front${ilu && ilu.svg ? '' : ' reserva'}">
  <div class="panel" style="background-color:${c.bg}">
    <span class="num">${String(p.n).padStart(3, '0')}/${String(total).padStart(3, '0')}</span>
    <svg class="ilu" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(p.es)}">${dibujo}</svg>
    <div class="audio">${ICON_AUDIO}</div>
    ${sello('sello-anv', SELLO_ANV_IN, AZ, SELLO_HALO_PX)}
  </div>
  <div class="hangul" lang="ko" style="font-size:${fsz}px"><span>${hangulFrente(p.kr)}</span></div>
</div>`;
}
function reverso(p, qr) {
  const c = colorCat(p.categoria);
  const m = p.es.match(/^(.*?)\s*(\([^)]*\))\s*$/);
  const esT = m && m[1] ? m[1] : p.es, esNota = m && m[1] ? m[2] : '';
  const burbuja = p.ejemplo_kr ? `<div class="bubble" style="background:${c.tint}">
    <svg class="tail" width="28" height="20" viewBox="0 0 28 20" fill="none" aria-hidden="true"><path d="M2 20 L10 2 L26 20 Z" fill="${c.tint}"/><path d="M3.33 17 L10 2 L23.33 17" stroke="${D}" stroke-width="3" stroke-linejoin="round"/></svg>
    <div class="ej-kr" lang="ko">${resaltar(p.ejemplo_kr, p.kr, p.es)}</div>
    ${p.ejemplo_es ? `<div class="ej-es">${ICON_FLECHA}<span>${sinHuerfana(p.ejemplo_es)}</span></div>` : ''}
  </div>` : '';
  return `<div class="card back">
  <div class="top"><span class="pill" style="background:${c.bg}">${esc(c.nombre)}</span><span class="n">${String(p.n).padStart(3, '0')}</span></div>
  <div class="kr"><b lang="ko">${esc(p.kr)}</b>${p.rom ? `<span class="rom">${esc(p.rom)}</span>` : ''}</div>
  <div class="es"><span class="es-t" style="background:linear-gradient(${c.bg},${c.bg}) left bottom / 100% 40% no-repeat">${puntoMedio(esT)}</span>${esNota ? `<span class="es-nota">${esc(esNota)}</span>` : ''}</div>
  <div class="spacer">${ONDA}</div>
  ${burbuja}
  <div class="foot">
    <div class="meta">
      <span class="semana">Básico 1 · Semana ${p.semana}</span>
      <span class="marca">${sello('sello-rev', SELLO_REV_IN, AZ)}<span>Academia Seúl</span></span>
    </div>
    ${qr ? `<div class="qr"><div class="marco">${qr}</div><span class="cap">${ICON_AUDIO_MINI}Escúchala</span></div>` : ''}
  </div>
</div>`;
}

// ---------- Hoja carta: 4 tarjetas de 3,5 × 4,75 in (336 × 456 px a 96 dpi) ----------
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

async function construirHTML(palabras, total, archivoHTML, titulo) {
  const ilus = {}, informe = { con: 0, tipograficas: [], errores: [], avisos: [] };
  const vistos = {};
  for (const p of palabras) {
    if (vistos[p.kr]) informe.avisos.push(`${p.kr}: aparece dos veces (n ${vistos[p.kr]} y ${p.n}); para dibujos distintos usa ${hexDe(p.kr)}_${String(p.n).padStart(3, '0')}.svg`);
    vistos[p.kr] = p.n;
    const r = cargarIlustracion(p);
    ilus[p.n] = r;
    if (r && r.svg) informe.con++;
    else informe.tipograficas.push(`${String(p.n).padStart(3, '0')} ${p.kr}`);
    if (r && r.errores.length) informe.errores.push(`${r.archivo} (${p.kr}): ${r.errores.join('; ')} → anverso tipográfico`);
    if (r && r.avisos.length) informe.avisos.push(`${r.archivo} (${p.kr}): ${r.avisos.join('; ')}`);
    if (!CAT[p.categoria] && !CAT_ALIAS[p.categoria]) informe.avisos.push(`${p.kr}: categoría desconocida "${p.categoria}" (color de reserva)`);
  }
  const qrs = {};
  for (const p of palabras) {
    if (!p.audio) { informe.avisos.push(`${p.kr}: sin audio, la tarjeta sale sin QR`); continue; }
    let svg = await QR.toString(p.audio, { type: 'svg', margin: 4, errorCorrectionLevel: 'M', color: { dark: NAVY + 'ff', light: '#ffffffff' } });
    qrs[p.n] = svg.replace('<svg ', `<svg width="76" height="76" role="img" aria-label="QR audio ${esc(p.kr)}" `);
  }
  // Páginas: cada semana empieza hoja nueva; 4 tarjetas por hoja (anversos) + su hoja de reversos.
  const semanas = [...new Set(palabras.map(p => p.semana))].sort((a, b) => a - b);
  let paginas = '';
  for (const s of semanas) {
    const ps = palabras.filter(p => p.semana === s);
    const hojas = Math.ceil(ps.length / 4);
    for (let g = 0; g < hojas; g++) {
      const grupo = ps.slice(g * 4, g * 4 + 4);
      let fr = '', bk = '';
      grupo.forEach((p, i) => {
        const col = i % 2, row = Math.floor(i / 2);
        fr += `<div class="cell" data-cara="f" data-n="${p.n}" data-semana="${s}" style="left:${COLX[col]}px;top:${ROWY[row]}px">${anverso(p, total, ilus[p.n])}</div>`;
        // Reversos: columnas invertidas para dúplex por el borde largo
        bk += `<div class="cell" data-cara="b" data-n="${p.n}" data-semana="${s}" style="left:${COLX[1 - col]}px;top:${ROWY[row]}px">${reverso(p, qrs[p.n])}</div>`;
      });
      const rango = `${String(grupo[0].n).padStart(3, '0')}–${String(grupo[grupo.length - 1].n).padStart(3, '0')}`;
      const pie = cara => `<div class="pie-hoja">Básico 1 · ${ESTILO} · Semana ${s} · hoja ${g + 1}/${hojas} · ${cara} ${rango} · imprimir a doble cara, voltear por el borde largo</div>`;
      paginas += `<section class="page" data-semana="${s}" aria-label="Semana ${s}, anversos ${rango}">${marcas()}${fr}${pie('anversos')}</section>\n`;
      paginas += `<section class="page" data-semana="${s}" aria-label="Semana ${s}, reversos ${rango}">${marcas()}${bk}${pie('reversos')}</section>\n`;
    }
  }
  const txtKo = [...new Set([...palabras.map(p => p.kr + p.ejemplo_kr + p.es + p.ejemplo_es).join('')])].filter(ch => /[\u1100-\u11FF\u3130-\u318F\uAC00-\uD7A3]/.test(ch)).join('');
  const txtLat = [...new Set([...palabras.map(p => p.es + p.ejemplo_es + p.rom + p.categoria).join('') + 'BásicoSemanaAcademiaSeúlEscúchala0123456789/·–'])].filter(ch => !/[\uAC00-\uD7A3\s]/.test(ch)).join('');

  const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
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
.pie-hoja { position: absolute; left: 0; right: 0; bottom: 22px; text-align: center; font: 500 9.5px/1 'Fredoka', sans-serif; letter-spacing: .3px; color: #5E6280 }
.cell { position: absolute; width: ${CW}px; height: ${CH}px }
.card { position: absolute; left: 6px; top: 6px; width: 318px; height: 438px; border: 4px solid ${D}; border-radius: 28px; box-shadow: 6px 6px 0 ${D}; overflow: hidden }

/* ANVERSO */
.front { background: ${AZ}; padding: 14px; display: flex; flex-direction: column; gap: 14px; overflow: visible }
.panel { position: relative; height: 268px; flex: none; border: 3.5px solid ${D}; border-radius: 22px;
  background-image: radial-gradient(rgba(20,20,43,.14) 1.6px, transparent 1.9px); background-size: 13px 13px;
  display: flex; align-items: center; justify-content: center }
.ilu { width: 240px; height: 240px; display: block; overflow: hidden }
.num { position: absolute; top: -13px; left: 14px; height: 26px; padding: 0 10px; border: 2.5px solid ${D}; border-radius: 999px; background: #fff;
  display: inline-flex; align-items: center; font: 700 13px/1 'Fredoka', sans-serif; letter-spacing: .5px; color: ${D}; z-index: 2 }
.audio { position: absolute; right: 14px; bottom: -24px; width: 58px; height: 58px; border-radius: 50%; background: ${GOLD};
  border: 3.5px solid ${D}; box-shadow: 4px 4px 0 ${D}; display: flex; align-items: center; justify-content: center; z-index: 2 }
.hangul { flex: 1; min-height: 0; display: flex; align-items: center; justify-content: center; padding-top: 18px; text-align: center;
  font-family: 'Black Han Sans', sans-serif; line-height: 1; letter-spacing: 2px; color: #fff; text-shadow: 4px 4px 0 ${D}; white-space: nowrap }
.hangul span { display: inline-block }
.hangul .sep { margin: 0 .14em }
/* el coreano solo se corta entre palabras (sin keep-all, "좋아해요" podía partirse en "좋 / 아해요") */
.hangul, .kr b, .es, .ej-kr { word-break: keep-all; overflow-wrap: normal }

/* REVERSO */
.back { background: #fff; padding: 18px 20px 16px; display: flex; flex-direction: column }
.back > * { flex: none }
.top { display: flex; align-items: center; justify-content: space-between; gap: 8px }
.pill { display: inline-flex; align-items: center; height: 30px; padding: 0 12px; border: 2.5px solid ${D}; border-radius: 999px;
  font: 600 13px/1 'Fredoka', sans-serif; color: ${D}; white-space: nowrap }
.n { min-width: 34px; height: 34px; padding: 0 7px; border: 2.5px solid ${D}; border-radius: 999px; background: #fff; display: flex; align-items: center; justify-content: center;
  font: 700 13px/1 'Fredoka', sans-serif; letter-spacing: .3px; color: ${D} }
.kr { display: flex; flex-wrap: wrap; align-items: baseline; column-gap: 10px; row-gap: 2px; margin-top: 16px; min-width: 0 }
.kr b { font-family: 'Black Han Sans', sans-serif; font-weight: 400; font-size: 46px; line-height: 1.05; color: ${AZ}; white-space: nowrap }
.rom { font: 500 15px/1 'Fredoka', sans-serif; letter-spacing: .5px; color: #5E6280 }
.es { margin-top: 10px; font-family: 'Fredoka', 'Jua', sans-serif; font-weight: 700; font-size: 60px; line-height: 1.02; color: ${D} }
.es-t { white-space: nowrap; padding: 0 6px; margin-left: -6px; border-radius: 8px; -webkit-box-decoration-break: clone; box-decoration-break: clone }
.es-nota { display: block; margin-top: 5px; font: 600 16px/1.2 'Fredoka', 'Jua', sans-serif; color: #3A3D55 }
.back > .spacer { flex: 1 1 auto; min-height: 24px; display: flex; align-items: center; justify-content: flex-end; padding-right: 6px; overflow: hidden }
.bubble { position: relative; border: 3px solid ${D}; border-radius: 18px; box-shadow: 4px 4px 0 ${D}; padding: 10px 14px; display: flex; flex-direction: column; gap: 3px }
.bubble .tail { position: absolute; top: -19px; left: 20px }
.ej-kr { font-family: 'Jua', sans-serif; font-size: 22px; line-height: 1.25; color: ${D}; white-space: nowrap }
.ej-kr .hl { color: ${AZ} }
.ej-es { display: flex; align-items: flex-start; gap: 6px; font: 500 15px/1.25 'Fredoka', 'Jua', sans-serif; color: #3A3D55 }
.ej-es svg { flex: none; margin-top: 3px }
.foot { display: flex; align-items: flex-end; justify-content: space-between; margin-top: 14px; min-height: 100px }
.meta { display: flex; flex-direction: column; gap: 6px; padding-bottom: 4px }
.semana { font: 600 13px/1.1 'Fredoka', sans-serif; color: #3A3D55 }
.marca { display: flex; align-items: center; gap: 6px; font: 600 12px/1 'Fredoka', sans-serif; letter-spacing: .3px; color: #5E6280 }
/* Sello (símbolo #sello-as, definido una vez al inicio del body) */
.defs { position: absolute; width: 0; height: 0; overflow: hidden }
.sello-anv { position: absolute; top: 5px; right: 5px; display: block; z-index: 1; pointer-events: none }
.sello-rev { display: block; flex: none }
/* reverso con mucho texto: márgenes más cortos antes de achicar letras */
.back.apretada .kr { margin-top: 10px }
.back.apretada .es { margin-top: 6px }
.back.apretada .foot { margin-top: 8px }
.qr { display: flex; flex-direction: column; align-items: center; gap: 4px }
.marco { width: 81px; height: 81px; border: 2.5px solid ${D}; border-radius: 10px; background: #fff; overflow: hidden; display: flex; align-items: center; justify-content: center }
.marco svg { display: block }
.cap { display: flex; align-items: center; gap: 4px; font: 600 11.5px/1 'Fredoka', sans-serif; color: ${D} }

/* Hoja de contacto (tarjetas.html#contacto-S3 · #contacto) */
#contacto { width: 1106px; padding: 22px 24px 26px; background: #F4F7FF }
#contacto h1 { margin: 0 0 4px; font: 700 22px 'Fredoka', sans-serif; color: ${D} }
#contacto h2 { margin: 16px 0 8px; font: 600 15px 'Fredoka', sans-serif; color: #3A3D55 }
#contacto .grid { display: grid; grid-template-columns: repeat(6, ${CW}px); gap: 20px; zoom: .5 }
#contacto .cell { position: relative !important; left: auto !important; top: auto !important }
body.modo-contacto { background: #F4F7FF; width: 1106px }
</style>
</head>
<body>
${selloSymbol()}
${paginas}<script>
(async function () {
  const TITULO = ${JSON.stringify(titulo)};
  const h = decodeURIComponent(location.hash.slice(1));
  const mc = h.match(/^contacto(?:-S(\\d+))?$/), ms = h.match(/^S(\\d+)$/);
  const semana = mc ? mc[1] : ms ? ms[1] : null;
  if (semana) document.querySelectorAll('.page').forEach(p => { if (p.dataset.semana !== semana) p.remove(); });
  try {
    await Promise.all([
      document.fonts.load('96px "Black Han Sans"', ${JSON.stringify(txtKo)}),
      document.fonts.load('22px "Jua"', ${JSON.stringify(txtKo)}),
      document.fonts.load('700 60px "Fredoka"', ${JSON.stringify(txtLat)}),
      document.fonts.load('600 13px "Fredoka"', ${JSON.stringify(txtLat)}),
      document.fonts.load('500 15px "Fredoka"', ${JSON.stringify(txtLat)}),
    ]);
  } catch (e) {}
  await document.fonts.ready;
  const prob = window.__problemas = [];
  const px = (el, v) => { el.style.fontSize = v + 'px'; };
  const W = el => el.getBoundingClientRect().width, R = el => el.getBoundingClientRect();
  // Anverso de reserva: encajar el hangul-sticker en el panel (caja útil 170 × 128 centrada en 110,104)
  for (const g of document.querySelectorAll('.tipo')) {
    const inn = g.querySelector('.tipo-in'), t = inn.querySelectorAll('text')[1], b = t.getBBox(), pad = 26;
    const k = Math.min(170 / (b.width + pad), 128 / (b.height + pad), 1.5);
    inn.setAttribute('transform', 'translate(110 104) scale(' + k.toFixed(4) + ') translate(' + (-(b.x + b.width / 2)).toFixed(2) + ' ' + (-(b.y + b.height / 2)).toFixed(2) + ')');
  }
  // Anverso: hangul grande en una línea; si no cabe, achicar; si es frase, partir en dos líneas
  for (const hg of document.querySelectorAll('.front .hangul')) {
    const sp = hg.firstElementChild; let s = parseFloat(hg.style.fontSize);
    const frase = /\\s/.test(sp.textContent.trim());
    const cabe = () => W(sp) <= hg.clientWidth - 8 && R(sp).height <= hg.clientHeight - 8;
    while (!cabe() && s > (frase ? 50 : 24)) px(hg, s -= 2);
    if (!cabe() && frase) {
      hg.style.whiteSpace = 'normal'; hg.style.lineHeight = '1.06'; px(hg, s = 56);
      while (!cabe() && s > 24) px(hg, s -= 2);
    }
    if (!cabe()) prob.push(hg.closest('.cell').dataset.n + ' anverso: el hangul no cabe');
  }
  // Reverso
  for (const b of document.querySelectorAll('.back')) {
    const kr = b.querySelector('.kr'), kb = kr.querySelector('b');
    let k = 46; px(kb, k);
    while (W(kb) > kr.clientWidth && k > 28) px(kb, k -= 2);
    if (W(kb) > kr.clientWidth) kb.style.whiteSpace = 'normal';
    const es = b.querySelector('.es'), sp = es.querySelector('.es-t'), nota = es.querySelector('.es-nota');
    const ft = b.querySelector('.foot');
    const cabeAlto = () => R(ft).bottom <= R(b).bottom - 4 - 16 + 0.5;
    // significado a tamaño s: en una línea si cabe; desde 46 hacia abajo puede ir en dos (cortando entre palabras)
    const ponerEs = s => {
      px(es, s); sp.style.whiteSpace = 'nowrap';
      if (R(sp).right <= R(es).right + 1) return true;
      if (s > 46) return false;
      sp.style.whiteSpace = 'normal';
      return R(sp).right <= R(es).right + 1;
    };
    // el significado más grande (60 → min) con el que el pie no se sale de la tarjeta
    const probar = min => { for (let t = 60; t >= min; t -= 2) if (ponerEs(t) && cabeAlto()) return t; return 0; };
    const ek = b.querySelector('.ej-kr'); let e = 22;
    if (ek) {
      px(ek, e);
      while (ek.scrollWidth > ek.clientWidth && e > 17) px(ek, e -= 0.5);
      if (ek.scrollWidth > ek.clientWidth) { ek.style.whiteSpace = 'normal'; px(ek, e = 19); }
    }
    let s = probar(30);
    // si el significado quedó chico por falta de alto, probar con márgenes cortos (la onda y la cola de la
    // burbuja conservan sus 24 px); se queda así solo si gana al menos 6 px (o si sin eso no cabía).
    // Si aun así no cabe con el significado ≥ 30: achicar ejemplo y nota; luego significado hasta 24 y por último el hangul
    if (s < 48) {
      const s0 = s;
      b.classList.add('apretada');
      const s1 = probar(30);
      if (s0 && s1 < s0 + 6) { b.classList.remove('apretada'); ponerEs(s0); s = s0; }
      else s = s1;
    }
    while (!s && ek && e > 16) { px(ek, e = Math.max(16, Math.ceil(e) - 1)); s = probar(30); }
    let nn = 16; while (!s && nota && nn > 13) { px(nota, nn -= 1); s = probar(30); }
    if (!s) s = probar(24);
    while (!s && k > 28) { px(kb, k -= 2); s = probar(24); }
    if (!s) { ponerEs(24); prob.push(b.closest('.cell').dataset.n + ' reverso: no cabe'); }
    b.dataset.es = s;
  }
  if (mc) {
    const c = document.createElement('div'); c.id = 'contacto';
    const fr = [...document.querySelectorAll('.cell[data-cara="f"]')].sort((a, b) => a.dataset.n - b.dataset.n);
    const bk = [...document.querySelectorAll('.cell[data-cara="b"]')].sort((a, b) => a.dataset.n - b.dataset.n);
    const p3 = x => String(x).padStart(3, '0');
    const rango = fr.length ? p3(fr[0].dataset.n) + '–' + p3(fr[fr.length - 1].dataset.n) : '';
    c.innerHTML = '<h1></h1><h2>Anversos ' + rango + '</h2><div class="grid" id="gF"></div><h2>Reversos ' + rango + '</h2><div class="grid" id="gB"></div>';
    c.querySelector('h1').textContent = TITULO + (semana ? ' · Semana ' + semana : '') + ' · ' + fr.length + ' tarjetas';
    // se MUEVEN (no se clonan): así no se duplican ids ni quedan defs dentro de display:none
    fr.forEach(x => c.querySelector('#gF').appendChild(x));
    bk.forEach(x => c.querySelector('#gB').appendChild(x));
    document.querySelectorAll('.page').forEach(p => p.remove());
    document.body.prepend(c); document.body.classList.add('modo-contacto');
  }
  window.__listo = true;
})();
</script>
</body>
</html>
`;
  fs.writeFileSync(archivoHTML, html, 'utf8');
  return informe;
}

async function renderizar(archivoHTML, trabajos) {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox', '--disable-lcd-text', '--font-render-hinting=none'] });
  const problemas = new Set();
  try {
    const url = 'file:///' + archivoHTML.replace(/\\/g, '/');
    for (const t of trabajos) {
      const page = await browser.newPage();
      if (t.png) await page.setViewport({ width: 1106, height: 900, deviceScaleFactor: 1.5 });
      else await page.setViewport({ width: 900, height: 1200, deviceScaleFactor: 1 });
      await page.goto(url + t.hash, { waitUntil: 'networkidle0', timeout: 180000 });
      await page.evaluateHandle('document.fonts.ready');
      await page.waitForFunction('window.__listo === true', { timeout: 180000 });
      for (const p of await page.evaluate('window.__problemas')) problemas.add(p);
      if (t.pdf) {
        await page.emulateMediaType('print');
        await page.pdf({ path: t.pdf, format: 'letter', printBackground: true, preferCSSPageSize: true, margin: { top: 0, right: 0, bottom: 0, left: 0 }, timeout: 0 });
      } else {
        const el = await page.$('#contacto');
        await el.screenshot({ path: t.png });
      }
      const out = t.pdf || t.png;
      console.log((t.pdf ? 'PDF  ' : 'PNG  '), out, (fs.statSync(out).size / 1024).toFixed(0) + ' KB');
      await page.close();
    }
  } finally {
    await browser.close();
  }
  return [...problemas].sort();
}

function imprimirInforme(inf, total) {
  console.log(`Ilustraciones: ${inf.con}/${total} con dibujo · ${inf.tipograficas.length} con anverso tipográfico`);
  if (inf.tipograficas.length) console.log('  tipográficas: ' + inf.tipograficas.join(', '));
  for (const e of inf.errores) console.log('  ERROR  ' + e);
  for (const a of inf.avisos) console.log('  aviso  ' + a);
}

(async () => {
  const { archivo, palabras, total } = leerDatos();
  console.log('Datos ', archivo, `(${palabras.length} palabras, numeración /${total})`);
  fs.mkdirSync(SALIDA, { recursive: true });

  if (ARGS.validar) {
    const inf = { con: 0, tipograficas: [], errores: [], avisos: [] };
    for (const p of palabras) {
      const r = cargarIlustracion(p);
      if (r && r.svg) inf.con++; else inf.tipograficas.push(`${String(p.n).padStart(3, '0')} ${p.kr} (${hexDe(p.kr)}.svg)`);
      if (r && r.errores.length) inf.errores.push(`${r.archivo} (${p.kr}): ${r.errores.join('; ')}`);
      if (r && r.avisos.length) inf.avisos.push(`${r.archivo} (${p.kr}): ${r.avisos.join('; ')}`);
    }
    const usados = new Set(palabras.flatMap(p => [hexDe(p.kr) + '.svg', hexDe(p.kr) + '_' + String(p.n).padStart(3, '0') + '.svg']));
    for (const fn of fs.readdirSync(ILU_DIR).filter(x => x.endsWith('.svg') && !usados.has(x))) inf.avisos.push(`${fn}: no corresponde a ninguna palabra del JSON`);
    imprimirInforme(inf, palabras.length);
    process.exit(inf.errores.length ? 1 : 0);
  }

  if (ARGS.muestra) {
    const pedidas = String(ARGS.muestra).split(',').map(s => s.trim()).filter(Boolean);
    const sel = palabras.filter(p => pedidas.includes(p.kr) || pedidas.includes(String(p.n)));
    if (!sel.length) throw new Error('Ninguna palabra coincide con --muestra ' + ARGS.muestra);
    const html = path.join(os.tmpdir(), 'flashcards_A_muestra.html');
    const png = ARGS.png ? path.resolve(String(ARGS.png)) : path.join(os.tmpdir(), 'muestra_A_Sticker_pop.png');
    const inf = await construirHTML(sel, total, html, `Muestra · Básico 1 · ${ESTILO}`);
    imprimirInforme(inf, sel.length);
    const prob = await renderizar(html, [{ hash: '#contacto', png }]);
    for (const p of prob) console.log('  ajuste  ' + p);
    return;
  }

  const HTML = path.join(SALIDA, 'tarjetas.html');
  const inf = await construirHTML(palabras, total, HTML, `Flashcards Básico 1 · ${ESTILO}`);
  console.log('HTML  ', HTML);
  imprimirInforme(inf, palabras.length);
  const todas = [...new Set(palabras.map(p => p.semana))].sort((a, b) => a - b);
  const pedidas = ARGS.semana ? String(ARGS.semana).split(',').map(Number).filter(s => todas.includes(s)) : todas;
  const trabajos = [];
  for (const s of pedidas) {
    trabajos.push({ hash: '#S' + s, pdf: path.join(SALIDA, `${BASE}_S${s}.pdf`) });
    trabajos.push({ hash: '#contacto-S' + s, png: path.join(SALIDA, `vista_S${s}.png`) });
  }
  if (!ARGS.semana) trabajos.push({ hash: '', pdf: path.join(SALIDA, `${BASE}_completo.pdf`) });
  const prob = await renderizar(HTML, trabajos);
  for (const p of prob) console.log('  ajuste  ' + p);
  console.log(prob.length ? `${prob.length} tarjeta(s) con problemas de espacio` : 'Todas las caras caben.');
})().catch(e => { console.error(e); process.exit(1); });
