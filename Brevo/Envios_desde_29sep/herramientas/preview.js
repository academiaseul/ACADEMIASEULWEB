#!/usr/bin/env node
/*
 * preview.js · Academia Seúl · vista previa y control de calidad de correos para Brevo
 *
 * Uso (desde esta carpeta o con la ruta completa):
 *   node preview.js <correo.html> [<otro.html> ...] [opciones]
 *
 * Opciones:
 *   --nombre "Camila"        valor de ejemplo para {{ contact.FIRSTNAME }}; --nombre "" prueba el valor por defecto
 *   --asunto "texto"         valida también el asunto (etiquetas de Brevo, largo, emojis)
 *   --permitir "5 de octubre" deja pasar una fecha "vieja" a propósito (se puede repetir)
 *   --sin-links              no comprueba los links por internet
 *   --sin-capturas           no genera los PNG
 *   --out <carpeta>          dónde guardar los PNG (por defecto ./previews)
 *
 * Qué hace:
 *   1. Revisa el HTML: doctype, <meta charset="utf-8">, tamaño < 90 KB, comentarios, etiquetas de Brevo
 *      (lista blanca, bien cerradas, en una sola línea), colores rojizos, precio literal, fechas y
 *      nombres viejos, marcadores sin rellenar, emojis problemáticos, botones, imágenes y links.
 *   2. Reemplaza las etiquetas de Brevo por valores de ejemplo y guarda capturas en escritorio (700 px)
 *      y celular (390 px), y mide si algo se sale de la pantalla del celular.
 *   3. Pide cada link por internet y exige 200 (el PDF de programas/ que aún no se publica sale aparte).
 * Sale con código 1 si hay alguna FALLA.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

// ───────────────────────── configuración de la casa ─────────────────────────
const PRECIO = 'US$150 el curso completo · o 2 cuotas de US$75';
const WA = '56942115562';
const CLASES_OK = ['a11-martes', 'a11-jueves', 'a12', 'a21', 'topik2', 'ninos'];
const MAX_BYTES = 90 * 1024;
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
// Etiquetas de Brevo permitidas (Brevo Template Language = pongo2, parecido a Django)
const VARS_SISTEMA = ['unsubscribe', 'mirror', 'update_profile'];
const ATRIBUTOS_BASE = ['FIRSTNAME', 'LASTNAME', 'EMAIL'];          // existen en toda cuenta de Brevo
const ATRIBUTOS_PROPIOS = ['CURSO_SUGERIDO'];                        // hay que crearlos en Brevo
const FILTROS_OK = ['default', 'capfirst', 'title', 'upper', 'lower'];
const BLOQUES_OK = ['if', 'elif', 'else', 'endif'];
// Pendiente de deploy: se informa aparte y no hace fallar
const PENDIENTE_DEPLOY = /academiaseul\.com\/programas\/Hoja_Resumen_Cursos_Octubre_2026\.(pdf|png)/i;
// Sitios que suelen bloquear robots: si no dan 200 es un aviso, no una falla
const ANTI_ROBOT = /(^|\.)instagram\.com$|(^|\.)wa\.me$|(^|\.)whatsapp\.com$|(^|\.)tiktok\.com$|(^|\.)facebook\.com$/i;

const FECHAS_VIEJAS = [
  { re: /\b5 de octubre\b/i, txt: '"5 de octubre" (fecha de inicio vieja)' },
  { re: /\b28 de septiembre\b/i, txt: '"28 de septiembre" (ya pasó / inicio viejo)' },
  { re: /\bGuiran\b|\bGiran\b/i, txt: 'nombre viejo de la profesora (es Kiran)' },
  { re: /\b8\s*[–-]\s*12\b/, txt: '"8–12" (rango de edad viejo de Niños; es 8–15)' },
];
const AVISOS_TEXTO = [
  { re: /(desde|parte[n]?|empieza[n]?|comienza[n]?|inicio|nos vemos)\s+(el\s+)?(lunes\s+)?12 de octubre/i, txt: 'di "la semana del 12 de octubre" (la 1.ª clase es el martes 13; Niños el lunes 19)' },
  { re: /Chuseok|추석/i, txt: 'menciona Chuseok (fue el 25 de septiembre): revisa si el saludo sigue vigente' },
  { re: /#LeoCoreanoEn7D[ií]as/i, txt: 'menciona el reto #LeoCoreanoEn7Días: confirma que las fechas del reto sean las nuevas' },
  { re: /150\.000/, txt: 'aparece "$150.000" (CLP): el precio público es en US$; úsalo solo si hablas del link de Mercado Pago' },
];
const EMOJI_ROJO = /[\u2764\u2665\u2763\u274C\u2B55\u26D4\u{1F534}\u{1F7E5}\u{1F494}\u{1FA78}\u{1F4D5}\u{1F339}\u{1F34E}\u{1F6A8}\u{1F6D1}\u{1F353}\u{1F336}\u{1F48B}\u{1F975}\u{1F621}\u{1F9E7}\u{1F4DB}\u{1F198}\u{1F232}\u{1F250}\u3297\u3299\u{1F170}\u{1F171}\u{1F18E}\u{1F17E}]/u;
const EMOJI_ROJIZO = /[\u{1F3AF}\u{1F352}\u{1F388}\u{1F3EE}\u{1F349}\u2757\u203C\u2049\u2753]/u;

const NAMED_COLORS = {
  red: '#ff0000', darkred: '#8b0000', firebrick: '#b22222', crimson: '#dc143c', indianred: '#cd5c5c',
  lightcoral: '#f08080', salmon: '#fa8072', darksalmon: '#e9967a', lightsalmon: '#ffa07a', tomato: '#ff6347',
  orangered: '#ff4500', coral: '#ff7f50', maroon: '#800000', brown: '#a52a2a', hotpink: '#ff69b4',
  deeppink: '#ff1493', palevioletred: '#db7093', mediumvioletred: '#c71585', pink: '#ffc0cb', lightpink: '#ffb6c1',
  rosybrown: '#bc8f8f', mistyrose: '#ffe4e1', lavenderblush: '#fff0f5', snow: '#fffafa',
};

// ───────────────────────── argumentos ─────────────────────────
function parseArgs(argv) {
  const o = { files: [], nombre: 'Camila', asunto: null, permitir: [], links: true, capturas: true, out: path.join(__dirname, 'previews') };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--nombre') o.nombre = argv[++i] ?? '';
    else if (a === '--asunto') o.asunto = argv[++i] ?? '';
    else if (a === '--permitir') o.permitir.push((argv[++i] || '').toLowerCase());
    else if (a === '--sin-links') o.links = false;
    else if (a === '--sin-capturas') o.capturas = false;
    else if (a === '--out') o.out = path.resolve(argv[++i]);
    else if (a === '-h' || a === '--help') { console.log(fs.readFileSync(__filename, 'utf8').split('*/')[0]); process.exit(0); }
    else o.files.push(path.resolve(a));
  }
  if (!o.files.length) { console.error('Falta el archivo. Uso: node preview.js correo.html [--nombre Camila] [--asunto "..."]'); process.exit(2); }
  return o;
}

// ───────────────────────── utilidades ─────────────────────────
function decodeEntities(s) {
  const named = { nbsp: ' ', middot: '·', amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", zwnj: '', zwj: '', ndash: '–', mdash: '—', rarr: '→', hellip: '…', copy: '©', iexcl: '¡', iquest: '¿', aacute: 'á', eacute: 'é', iacute: 'í', oacute: 'ó', uacute: 'ú', ntilde: 'ñ', Uacute: 'Ú', Aacute: 'Á', Eacute: 'É', Iacute: 'Í', Oacute: 'Ó', Ntilde: 'Ñ', uuml: 'ü', ordf: 'ª', ordm: 'º' };
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&([a-z]+);/gi, (m, n) => (n in named ? named[n] : m));
}
function htmlToText(html) {
  return decodeEntities(html
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(style|script)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|tr|td|h\d|li|table)>/gi, '\n')
    .replace(/<[^>]+>/g, ''))
    .replace(/[\u00A0\u2007\u034F\u200C\u200B]/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/\s*\n\s*/g, '\n')
    .trim();
}
function lineOf(src, idx) { return src.slice(0, idx).split('\n').length; }
function hexToRgb(h) {
  h = h.replace('#', '');
  if (h.length === 3 || h.length === 4) h = h.slice(0, 3).split('').map(c => c + c).join('');
  if (h.length === 8) h = h.slice(0, 6);
  if (h.length !== 6) return null;
  return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16));
}
function rgbToHsl([r, g, b]) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
  if (max === min) return [0, 0, l * 100];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return [h * 60, s * 100, l * 100];
}
function parseColor(tok) {
  tok = tok.trim().toLowerCase();
  if (tok.startsWith('#')) return hexToRgb(tok);
  let m = tok.match(/^rgba?\(\s*(\d+)\D+(\d+)\D+(\d+)/);
  if (m) return [+m[1], +m[2], +m[3]];
  m = tok.match(/^hsla?\(\s*([\d.]+)(?:deg)?[\s,]+([\d.]+)%[\s,]+([\d.]+)%/);
  if (m) return { hsl: [+m[1], +m[2], +m[3]] };
  if (NAMED_COLORS[tok]) return hexToRgb(NAMED_COLORS[tok]);
  return null;
}
function isReddish(c) {
  const [h, s] = c.hsl ? c.hsl : rgbToHsl(c);
  return (h < 15 || h > 340) && s > 40;
}

// ───────────────────────── etiquetas de Brevo ─────────────────────────
// Devuelve { tags: [{kind, raw, inner, line, name, filters, cond}], errores: [] }
function scanBrevoTags(src, where) {
  const tags = [], errores = [], consumidos = [];
  const re = /\{\{|\{%|\{#/g;
  let m;
  while ((m = re.exec(src))) {
    const open = m[0], start = m.index, line = lineOf(src, start);
    if (open === '{#') { errores.push(`${where} línea ${line}: "{#" abre un comentario de plantilla de Brevo; si no se cierra en la misma línea con "#}", la campaña no compila. Sepáralo ("{ #") o quítalo.`); continue; }
    const close = open === '{{' ? '}}' : '%}';
    const end = src.indexOf(close, start + 2);
    const nl = src.indexOf('\n', start);
    if (end === -1) { errores.push(`${where} línea ${line}: "${open}" sin cerrar (falta "${close}").`); continue; }
    if (nl !== -1 && nl < end) { errores.push(`${where} línea ${line}: la etiqueta "${src.slice(start, nl).trim()}…" está partida en dos líneas; Brevo (pongo2) no acepta saltos de línea dentro de {{ }} ni {% %}.`); consumidos.push([start, end + 2]); re.lastIndex = end + 2; continue; }
    const raw = src.slice(start, end + 2), inner = src.slice(start + 2, end).trim();
    re.lastIndex = end + 2;
    consumidos.push([start, end + 2]);
    const t = { kind: open === '{{' ? 'var' : 'block', raw, inner, line, start, end: end + 2 };
    if (/[\\{]/.test(inner)) { errores.push(`${where} línea ${line}: ${raw} tiene "\\" o "{" adentro (¿copiado de una tabla Markdown con "\\|"?). Brevo no lo compila.`); continue; }
    if (/[\u201C\u201D\u2018\u2019\u00AB\u00BB]/.test(inner)) { errores.push(`${where} línea ${line}: ${raw} usa comillas tipográficas (“ ” ‘ ’ « »). Brevo solo acepta comillas rectas " o '.`); continue; }
    if (t.kind === 'var') {
      const mm = inner.match(/^([A-Za-z_][\w]*(?:\.[A-Za-z_][\w]*)*)((?:\s*\|\s*[a-z_]+(?:\s*:\s*(?:"[^"]*"|'[^']*'))?)*)\s*$/);
      if (!mm) { errores.push(`${where} línea ${line}: ${raw} no tiene la forma {{ variable|filtro:"valor" }}.`); continue; }
      t.name = mm[1];
      t.filters = [...mm[2].matchAll(/\|\s*([a-z_]+)(?:\s*:\s*("([^"]*)"|'([^']*)'))?/g)].map(f => ({ name: f[1], arg: f[3] ?? f[4] ?? null, hasArg: !!f[2] }));
    } else {
      const mm = inner.match(/^([a-z_]+)\b\s*(.*)$/);
      t.name = mm ? mm[1] : inner;
      t.cond = mm ? mm[2] : '';
    }
    tags.push(t);
  }
  // llaves sueltas que quedaron fuera de una etiqueta válida
  let resto = src;
  for (const [a, b] of [...consumidos].sort((x, y) => y[0] - x[0])) resto = resto.slice(0, a) + src.slice(a, b).replace(/[^\n]/g, ' ') + resto.slice(b);
  for (const s of ['}}', '%}']) {
    let i = -1;
    while ((i = resto.indexOf(s, i + 1)) !== -1) {
      const prev = resto.lastIndexOf('{', i);
      if (prev === -1 || resto.slice(prev, i).includes('\n') || !/\{[{%]/.test(resto.slice(prev, prev + 2))) errores.push(`${where} línea ${lineOf(src, i)}: "${s}" suelto (cierre sin apertura).`);
    }
  }
  return { tags, errores };
}
function validateTags(tags, where, res) {
  const stack = [];
  for (const t of tags) {
    if (t.kind === 'var') {
      const parts = t.name.split('.');
      if (VARS_SISTEMA.includes(t.name)) {
        if (t.filters.length) res.falla(`${where} línea ${t.line}: ${t.raw} no lleva filtros.`);
      } else if (parts[0] === 'contact' && parts.length === 2) {
        if (ATRIBUTOS_PROPIOS.includes(parts[1])) res.aviso(`${where} línea ${t.line}: ${t.raw} usa el atributo propio ${parts[1]}: confirma que existe en Brevo (Contacts → Settings → Contact attributes) y que no trae texto de más.`);
        else if (!ATRIBUTOS_BASE.includes(parts[1])) res.falla(`${where} línea ${t.line}: ${t.raw}: atributo "${parts[1]}" fuera de la lista blanca (${[...ATRIBUTOS_BASE, ...ATRIBUTOS_PROPIOS].join(', ')}). Los nombres de atributo van en MAYÚSCULAS, igual que en Brevo.`);
        if (!t.filters.some(f => f.name === 'default') && parts[1] !== 'EMAIL') res.aviso(`${where} línea ${t.line}: ${t.raw} no tiene |default:"…": si el contacto no tiene ese dato, se verá vacío.`);
      } else {
        res.falla(`${where} línea ${t.line}: ${t.raw}: variable fuera de la lista blanca (contact.FIRSTNAME, contact.LASTNAME, contact.EMAIL, contact.CURSO_SUGERIDO, unsubscribe, mirror, update_profile).`);
      }
      for (const f of t.filters) {
        if (!FILTROS_OK.includes(f.name)) res.falla(`${where} línea ${t.line}: ${t.raw}: filtro "${f.name}" fuera de la lista blanca (${FILTROS_OK.join(', ')}).`);
        if (f.name === 'default' && (!f.hasArg || !f.arg)) res.falla(`${where} línea ${t.line}: ${t.raw}: default necesita un texto entre comillas, p. ej. default:"chingu".`);
      }
    } else {
      if (!BLOQUES_OK.includes(t.name)) { res.falla(`${where} línea ${t.line}: ${t.raw}: bloque "{% ${t.name} %}" fuera de la lista blanca (${BLOQUES_OK.join(', ')}).`); continue; }
      if (t.name === 'if') stack.push(t);
      else if (t.name === 'endif') { if (!stack.pop()) res.falla(`${where} línea ${t.line}: {% endif %} sin {% if %}.`); }
      else if (!stack.length) res.falla(`${where} línea ${t.line}: {% ${t.name} %} fuera de un {% if %}.`);
      if (t.name === 'if' || t.name === 'elif') for (const a of (t.cond.match(/contact.([A-Za-z_]+)/g) || []).map(x => x.slice(8))) if (![...ATRIBUTOS_BASE, ...ATRIBUTOS_PROPIOS].includes(a)) res.falla(`${where} línea ${t.line}: la condición usa contact.${a}, fuera de la lista blanca.`);
      if ((t.name === 'if' || t.name === 'elif') && !/^contact\.[A-Z_]+(\s*(==|!=)\s*("[^"]*"|'[^']*'))?$/.test(t.cond.trim())) res.aviso(`${where} línea ${t.line}: condición "${t.cond}" poco común; pruébala con "Preview as a contact" en Brevo.`);
    }
  }
  for (const t of stack) res.falla(`${where} línea ${t.line}: {% if %} sin {% endif %}.`);
}
// Reemplaza las etiquetas por valores de ejemplo (para la vista previa)
function renderBrevo(src, tags, sample) {
  const val = (t) => {
    if (VARS_SISTEMA.includes(t.name)) return '#';
    const attr = t.name.split('.')[1];
    let v = sample[attr] ?? '';
    for (const f of t.filters || []) {
      if (f.name === 'default' && !v) v = f.arg || '';
      else if (f.name === 'upper') v = v.toUpperCase();
      else if (f.name === 'lower') v = v.toLowerCase();
      else if (f.name === 'capfirst') v = v.charAt(0).toUpperCase() + v.slice(1);
      else if (f.name === 'title') v = v.replace(/\S+/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
    }
    return v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  };
  const evalCond = (c) => {
    const m = c.trim().match(/^contact\.([A-Z_]+)(?:\s*(==|!=)\s*(?:"([^"]*)"|'([^']*)'))?$/);
    if (!m) return false;
    const v = sample[m[1]] ?? '';
    if (!m[2]) return !!v;
    const lit = m[3] ?? m[4];
    return m[2] === '==' ? v === lit : v !== lit;
  };
  let out = '', pos = 0;
  const stack = []; // {taken, active}
  const activo = () => stack.every(s => s.active);
  for (const t of tags) {
    if (activo()) out += src.slice(pos, t.start);
    pos = t.end;
    if (t.kind === 'var') { if (activo()) out += val(t); continue; }
    if (t.name === 'if') { const ok = evalCond(t.cond); stack.push({ taken: ok, active: ok }); }
    else if (t.name === 'elif') { const s = stack[stack.length - 1]; if (!s) continue; const ok = !s.taken && evalCond(t.cond); s.active = ok; s.taken = s.taken || ok; }
    else if (t.name === 'else') { const s = stack[stack.length - 1]; if (!s) continue; s.active = !s.taken; s.taken = true; }
    else if (t.name === 'endif') stack.pop();
  }
  if (activo()) out += src.slice(pos);
  return out;
}

// ───────────────────────── informe ─────────────────────────
function makeResult(name) {
  const r = { name, fallas: [], avisos: [], ok: [], info: [], links: [] };
  r.falla = (s) => r.fallas.push(s);
  r.aviso = (s) => r.avisos.push(s);
  r.bien = (s) => r.ok.push(s);
  r.nota = (s) => r.info.push(s);
  return r;
}

// ───────────────────────── revisión estática ─────────────────────────
function revisar(file, opts) {
  const res = makeResult(path.basename(file));
  const buf = fs.readFileSync(file);
  let src;
  try { src = new TextDecoder('utf-8', { fatal: true }).decode(buf); res.bien('El archivo es UTF-8 válido.'); }
  catch { res.falla('El archivo NO es UTF-8 válido (se guardó en otra codificación). Vuelve a guardarlo como UTF-8.'); src = buf.toString('latin1'); }
  if (src.charCodeAt(0) === 0xFEFF) { res.aviso('El archivo empieza con BOM (EF BB BF). No rompe nada, pero al copiar y pegar a veces arrastra un carácter invisible; mejor UTF-8 sin BOM.'); src = src.slice(1); }
  res.src = src;

  // 1 · documento completo
  const head1024 = buf.slice(0, 1024).toString('latin1');
  if (/^\s*<!doctype html>/i.test(src)) res.bien('Empieza con <!doctype html>.');
  else res.falla('No empieza con <!doctype html>: al abrirlo o pegarlo, el navegador/cliente lo trata como documento "quirks".');
  if (/<meta\s+charset=["']?utf-8["']?\s*\/?>/i.test(head1024) || /<meta[^>]+content=["'][^"']*charset=utf-8/i.test(head1024)) res.bien('Declara <meta charset="utf-8"> en los primeros 1024 bytes.');
  else if (/charset=["']?utf-8/i.test(src)) res.aviso('Declara utf-8, pero después de los primeros 1024 bytes: los navegadores podrían no verlo. Súbelo al principio del <head>.');
  else res.falla('Falta <meta charset="utf-8">: con doble clic en Windows el navegador tiene que adivinar la codificación y un texto corto puede verse "SeÃºl".');
  if (!/<html[^>]*\blang=/i.test(src)) res.aviso('Falta <html lang="es">.');
  if (!/<meta[^>]+name=["']viewport/i.test(src)) res.aviso('Falta <meta name="viewport" …> (ayuda en celulares y en el navegador).');
  const title = (src.match(/<title>([\s\S]*?)<\/title>/i) || [])[1];
  if (!title || !title.trim()) res.aviso('Falta <title> (se ve en "Ver en el navegador" y en la pestaña).');
  if (!/<body[\s>]/i.test(src)) res.aviso('Falta <body>.');

  // 2 · tamaño
  const kb = buf.length / 1024;
  const hrefCount = (src.match(/href=/gi) || []).length;
  const estim = (buf.length + hrefCount * 110 + 600) / 1024; // Brevo reescribe cada link para medir clics y agrega el píxel
  if (buf.length >= MAX_BYTES) res.falla(`Pesa ${kb.toFixed(1)} KB (máximo 90 KB; Gmail recorta cerca de 102 KB y esconde el pie con la baja).`);
  else res.bien(`Pesa ${kb.toFixed(1)} KB (con el seguimiento de links de Brevo, ~${estim.toFixed(1)} KB; Gmail recorta cerca de 102 KB).`);

  // 3 · comentarios
  const comments = [...src.matchAll(/<!--([\s\S]*?)-->/g)];
  let condicionales = 0;
  for (const c of comments) {
    const body = c[1], line = lineOf(src, c.index);
    const esMso = /^\[if [^\]]+\]>[\s\S]*<!\[endif\]$/.test(body) || /^\[if [^\]]+\]>/.test(body) || /^<!\[endif\]$/.test(body) || /<!\[endif\]$/.test(body);
    if (/\{\{|\{%|\{#/.test(body)) res.falla(`Comentario en la línea ${line} con etiquetas de Brevo adentro: Brevo las procesa aunque estén en un comentario (una mal escrita rompe la campaña) y el comentario viaja a cada destinatario. Mueve esas notas al .md.`);
    else if (body.includes('<!--')) res.falla(`Comentario anidado en la línea ${line}: el primer "-->" lo cierra antes de tiempo y el resto se ve en el correo.`);
    else if (esMso) condicionales++;
    else res.aviso(`Comentario HTML en la línea ${line} ("${body.trim().slice(0, 50)}…"): se envía a todos los destinatarios. Las instrucciones van en un .md aparte.`);
  }
  if (condicionales) res.nota(`${condicionales} comentario(s) condicional(es) de Outlook (<!--[if mso]>) — son parte del diseño, no instrucciones.`);
  // Copia del HTML sin los comentarios de instrucciones (los condicionales de Outlook se quedan): lo que de verdad se ve
  const vis = src.replace(/<!--([\s\S]*?)-->/g, (m, body) => (/^\[if |<!\[endif\]$/.test(body) ? m : m.replace(/[^\n]/g, ' ')));
  if (!comments.length || comments.length === condicionales) res.bien('Sin comentarios de instrucciones dentro del HTML.');

  // 4 · etiquetas de Brevo
  const { tags, errores } = scanBrevoTags(src, 'HTML');
  errores.forEach(e => res.falla(e));
  validateTags(tags, 'HTML', res);
  res.tags = tags;
  const vars = [...new Set(tags.map(t => t.raw))];
  if (!errores.length) res.bien(`Etiquetas de Brevo bien cerradas y en una línea: ${vars.length ? vars.join('  ') : '(ninguna)'}`);
  if (!/href\s*=\s*["']\{\{\s*unsubscribe\s*\}\}["']/i.test(src)) res.falla('Falta el link de baja <a href="{{ unsubscribe }}">: es obligatorio en Brevo.');
  else res.bien('Tiene el link de baja {{ unsubscribe }} dentro de un href.');

  // 5 · colores rojizos
  const colorTokens = [];
  for (const m of vis.matchAll(/style\s*=\s*"([^"]*)"/gi)) {
    for (const d of m[1].split(';')) {
      const [prop, ...rest] = d.split(':'); const v = rest.join(':');
      if (!prop || !/color|background|border|outline|fill|stroke/i.test(prop)) continue;
      for (const tok of v.match(/#[0-9a-f]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)|\b[a-z]+\b/gi) || []) colorTokens.push({ tok, line: lineOf(src, m.index), prop: prop.trim() });
    }
  }
  for (const m of vis.matchAll(/\b(bgcolor|color)\s*=\s*"([^"]+)"/gi)) colorTokens.push({ tok: m[2], line: lineOf(src, m.index), prop: m[1] });
  const rojos = [];
  for (const c of colorTokens) {
    const col = parseColor(c.tok);
    if (col && isReddish(col)) rojos.push(`${c.tok} (${c.prop}, línea ${c.line})`);
  }
  if (rojos.length) res.falla(`Colores rojizos (regla de la casa: nunca rojo): ${[...new Set(rojos)].join(' · ')}. Usa azul #4236F6, navy #003478 o dorado #E8B84B.`);
  else res.bien(`Ningún color rojizo (${new Set(colorTokens.map(c => c.tok.toLowerCase()).filter(t => parseColor(t))).size} colores revisados).`);

  // 6 · texto: precio, fechas, marcadores, codificación, emojis
  const texto = htmlToText(src);
  const plano = texto.replace(/\n/g, ' ');
  const plus = [];
  let i = -1; while ((i = plano.indexOf(PRECIO, i + 1)) !== -1) plus.push([i, i + PRECIO.length]);
  const montos = [...plano.matchAll(/US\$\s?\d[\d.,]*/g)];
  const sueltos = montos.filter(m => !plus.some(([a, b]) => m.index >= a && m.index < b));
  if (!montos.length) res.nota('No menciona el precio.');
  else if (sueltos.length) res.falla(`Precio fuera de la fórmula exacta "${PRECIO}": ${sueltos.map(m => `"…${plano.slice(Math.max(0, m.index - 25), m.index + 30).trim()}…"`).join(' · ')}`);
  else res.bien(`El precio aparece ${plus.length === 1 ? '1 vez' : plus.length + ' veces'} y siempre como "${PRECIO}".`);
  if (/desde\s+US\$/i.test(plano)) res.falla('Dice "desde US$…": el precio nunca va con "desde".');
  if (/\/\s*mes\b|\bal mes\b|\bpor mes\b/i.test(plano)) res.falla('Menciona el precio "por mes" o "/mes": son 2 cuotas de US$75, no una mensualidad.');
  let viejas = 0;
  for (const f of FECHAS_VIEJAS) {
    const m = plano.match(f.re);
    if (m && !opts.permitir.includes(m[0].toLowerCase())) { res.falla(`Texto viejo: ${f.txt} → "…${plano.slice(Math.max(0, m.index - 30), m.index + 40).trim()}…" (si es a propósito: --permitir "${m[0]}")`); viejas++; }
  }
  if (!viejas) res.bien('Sin fechas ni nombres viejos ("5 de octubre", "28 de septiembre", "Guiran", "8–12").');
  for (const a of AVISOS_TEXTO) { const m = plano.match(a.re); if (m) res.aviso(`Texto: ${a.txt} → "…${plano.slice(Math.max(0, m.index - 20), m.index + 45).trim()}…"`); }
  const marcadores = [...new Set([...(vis.match(/\[(?:LINK|NOMBRE|CURSO|PROFE|HORA|D[ÍI]A|N|CUPOS?|PARTICIPANTES|POR CONFIRMAR)[^\]]{0,40}\]/g) || []), ...(plano.match(/\[[A-ZÁÉÍÓÚÑ0-9][A-ZÁÉÍÓÚÑ0-9 _/.\-]{1,40}\]/g) || [])])];
  if (marcadores.length) res.falla(`Marcadores sin rellenar: ${marcadores.join(' ')}`);
  if (/Ã[\u0080-\u00BF\u00A1-\u00FF]|Â[·°ºª ]|â€|ì•|ê¸/.test(texto)) res.falla('Hay "mojibake" (p. ej. "SeÃºl"): el texto se guardó o copió con la codificación equivocada.');
  const flags = texto.match(/[\u{1F1E6}-\u{1F1FF}]{2}/gu);
  if (flags) res.aviso(`Emoji de bandera ${[...new Set(flags)].join(' ')}: en Windows (Outlook de escritorio, Chrome/Edge) se ve como dos letras ("KR"). Mejor 🐯 o 💙.`);
  const rojoEmoji = [...texto].filter(ch => EMOJI_ROJO.test(ch));
  if (rojoEmoji.length) res.falla(`Emojis rojos (regla de la casa): ${[...new Set(rojoEmoji)].join(' ')}. Usa 💙.`);
  const rojizo = [...texto].filter(ch => EMOJI_ROJIZO.test(ch));
  if (rojizo.length) res.aviso(`Emojis con bastante rojo: ${[...new Set(rojizo)].join(' ')} (¿cambiarlos por 💙 🐯 ✨?).`);
  const nEmoji = (texto.match(/\p{Extended_Pictographic}/gu) || []).length;
  if (nEmoji > 12) res.aviso(`${nEmoji} emojis en el cuerpo: con tantos, algunos filtros lo miran como promocional. Apunta a 5 o menos.`);

  // 7 · estructura de correo
  const pre = src.match(/<body[^>]*>\s*<div[^>]*display\s*:\s*none[^>]*>([\s\S]*?)<\/div>/i) || src.match(/^[\s\S]{0,3000}?<div[^>]*display\s*:\s*none[^>]*>([\s\S]*?)<\/div>/i);
  if (pre && htmlToText(pre[1]).trim().length > 10) res.bien(`Preheader oculto: "${htmlToText(pre[1]).replace(/\s+/g, ' ').trim().slice(0, 90)}"`);
  else res.aviso('No encontré el preheader oculto al inicio del <body> (el texto gris que se ve junto al asunto en la bandeja).');
  for (const tag of ['script', 'form', 'iframe', 'video', 'audio', 'embed', 'object']) if (new RegExp(`<${tag}[\\s>]`, 'i').test(src)) res.falla(`Usa <${tag}>: Brevo lo marca como "Never use" (no funciona en correos).`);
  if (/<style[\s>]/i.test(src)) res.aviso('Tiene un bloque <style>: Brevo recomienda estilos en línea (algunos clientes lo borran).');
  if (/<link[^>]+stylesheet/i.test(src)) res.aviso('Carga una hoja de estilos externa: casi ningún cliente de correo la respeta.');
  if (/data:image\//i.test(src)) res.aviso('Imagen incrustada en base64: aumenta el peso y Gmail/Outlook la bloquean. Usa una URL https.');
  const lineasPunto = vis.split('\n').map((l, n) => [l, n + 1]).filter(([l]) => /^[.,]/.test(l));
  if (lineasPunto.length) res.aviso(`Líneas que empiezan con "." o "," (${lineasPunto.map(x => x[1]).join(', ')}): según Brevo, algunos clientes las borran. Agrega un espacio al inicio.`);
  // botones: <a> con fondo que no está dentro de una celda con bgcolor
  for (const m of vis.matchAll(/<a\b[^>]*style\s*=\s*"[^"]*background[^"]*"[^>]*>/gi)) {
    const antes = vis.slice(0, m.index); const td = antes.lastIndexOf('<td');
    const tdTag = td === -1 ? '' : antes.slice(td, antes.indexOf('>', td) + 1);
    if (!/bgcolor=/i.test(tdTag)) res.aviso(`Botón en la línea ${lineOf(src, m.index)}: el color de fondo está en el <a>; Outlook de escritorio ignora ese padding y el botón se ve como un link plano. Pon el color también en la celda (<td bgcolor="#4236F6">).`);
  }
  // imágenes
  for (const m of vis.matchAll(/<img\b[^>]*>/gi)) {
    const tag = m[0], line = lineOf(src, m.index);
    const srcAttr = (tag.match(/\bsrc\s*=\s*"([^"]*)"/i) || [])[1] || '';
    if (!/\balt\s*=/.test(tag)) res.falla(`Imagen sin alt en la línea ${line} (Outlook bloquea imágenes por defecto y solo muestra el alt).`);
    if (!/^https:\/\//i.test(srcAttr)) res.falla(`Imagen con src no absoluto/https en la línea ${line}: "${srcAttr.slice(0, 60)}".`);
    if (!/\bwidth\s*=\s*"\d+"/i.test(tag)) res.aviso(`Imagen sin atributo width en la línea ${line} (Outlook la muestra a tamaño real).`);
    if (/logo-(tiger|stamp|text)(-red)?\.png/i.test(srcAttr)) res.falla(`La imagen ${srcAttr} es roja/coral: en la línea ${line} usa logo-white.png sobre azul.`);
  }

  // 8 · links (estáticos)
  const hrefs = [...vis.matchAll(/\bhref\s*=\s*"([^"]*)"/gi)].map(m => ({ url: decodeEntities(m[1]), line: lineOf(src, m.index) }));
  const imgs = [...vis.matchAll(/<img\b[^>]*\bsrc\s*=\s*"([^"]*)"/gi)].map(m => ({ url: decodeEntities(m[1]), line: lineOf(src, m.index) }));
  const campañas = new Set(); let sinUtm = 0;
  for (const h of hrefs) {
    const u = h.url.trim();
    if (/^\{\{\s*(unsubscribe|mirror|update_profile)\s*\}\}$/.test(u)) continue;
    if (/^(mailto|tel):/i.test(u)) continue;
    if (u === '#' || u === '') { res.falla(`Link vacío o "#" en la línea ${h.line}.`); continue; }
    if (/\{\{|\{%/.test(u)) { res.aviso(`Link con etiqueta de Brevo en la línea ${h.line}: ${u}`); continue; }
    if (/^\[.*\]$/.test(u)) continue; // ya reportado como marcador
    if (!/^https?:\/\//i.test(u)) { res.falla(`Link relativo o raro en la línea ${h.line}: "${u}" (en un correo todo link debe ser https://…).`); continue; }
    if (/^http:\/\//i.test(u)) res.aviso(`Link sin https en la línea ${h.line}: ${u}`);
    let url; try { url = new URL(u); } catch { res.falla(`Link mal formado en la línea ${h.line}: ${u}`); continue; }
    if (/wa\.me$/i.test(url.hostname) && !url.pathname.startsWith('/' + WA)) res.falla(`WhatsApp con otro número en la línea ${h.line}: ${u} (debe ser wa.me/${WA}).`);
    if (/academiaseul\.com$/i.test(url.hostname)) {
      const clase = url.searchParams.get('clase');
      if (clase !== null && !CLASES_OK.includes(clase)) res.falla(`?clase=${clase} no existe (línea ${h.line}); válidas: ${CLASES_OK.join(', ')}.`);
      if (!/\.(pdf|png|jpg)$/i.test(url.pathname)) {
        if (url.searchParams.get('utm_source') !== 'brevo' || url.searchParams.get('utm_medium') !== 'email' || !url.searchParams.get('utm_campaign')) sinUtm++;
        else campañas.add(url.searchParams.get('utm_campaign'));
      }
    }
  }
  if (sinUtm) res.aviso(`${sinUtm} link(s) a academiaseul.com sin utm_source=brevo&utm_medium=email&utm_campaign=… (no sabrás de qué correo vino la visita).`);
  if (campañas.size > 1) res.aviso(`utm_campaign distintos en el mismo correo: ${[...campañas].join(', ')}.`);
  else if (campañas.size === 1) res.nota(`utm_campaign = "${[...campañas][0]}"${[...campañas][0] === 'base' ? ' → cámbialo por el id del envío (p. ej. programa_oct).' : ''}`);
  res.urls = [...new Map([...hrefs, ...imgs].filter(h => /^https?:\/\//i.test(h.url.trim())).map(h => [h.url.trim(), h])).values()];

  // 9 · asunto
  if (opts.asunto !== null) {
    const a = opts.asunto;
    const r = scanBrevoTags(a, 'ASUNTO');
    r.errores.forEach(e => res.falla(e));
    validateTags(r.tags, 'ASUNTO', res);
    const visible = renderBrevo(a, r.tags, { FIRSTNAME: opts.nombre });
    const nE = (a.match(/\p{Extended_Pictographic}/gu) || []).length;
    if (visible.length > 60) res.aviso(`Asunto de ${visible.length} caracteres (en el celular se corta cerca de 40–50): "${visible}"`);
    if (nE > 1) res.aviso(`El asunto tiene ${nE} emojis: usa uno como máximo.`);
    if ([...a].some(ch => EMOJI_ROJO.test(ch))) res.falla('Emoji rojo en el asunto.');
    if (/[\u{1F1E6}-\u{1F1FF}]{2}/u.test(a)) res.aviso('Bandera en el asunto: en Windows se ve como letras.');
    if (!r.errores.length) res.bien(`Asunto OK para Brevo → se verá: "${visible}"`);
  }
  return res;
}

// ───────────────────────── links por internet ─────────────────────────
async function comprobarLinks(res) {
  const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36';
  const cola = [...res.urls];
  const worker = async () => {
    while (cola.length) {
      const h = cola.shift();
      let status = 0, final = h.url, err = '';
      try {
        const r = await fetch(h.url, { method: 'GET', redirect: 'follow', headers: { 'User-Agent': UA, 'Accept-Language': 'es-CL,es;q=0.9' }, signal: AbortSignal.timeout(20000) });
        status = r.status; final = r.url; try { await r.body?.cancel(); } catch {}
      } catch (e) { err = (e.cause && e.cause.code) || e.name || String(e); }
      const host = (() => { try { return new URL(h.url).hostname; } catch { return ''; } })();
      let estado;
      if (status === 200) estado = 'OK';
      else if (status === 404 && PENDIENTE_DEPLOY.test(h.url)) estado = 'PENDIENTE DE DEPLOY';
      else if (ANTI_ROBOT.test(host)) estado = 'REVISAR A MANO';
      else estado = 'FALLA';
      res.links.push({ ...h, status: status || err, final, estado });
    }
  };
  await Promise.all(Array.from({ length: 6 }, worker));
  res.links.sort((a, b) => a.line - b.line);
  for (const l of res.links) {
    if (l.estado === 'FALLA') res.falla(`Link roto (${l.status}) en la línea ${l.line}: ${l.url}`);
    if (l.estado === 'REVISAR A MANO') res.aviso(`${new URL(l.url).hostname} respondió ${l.status} a un robot (normal en ese sitio): ábrelo a mano una vez → ${l.url}`);
  }
}

// ───────────────────────── capturas ─────────────────────────
async function capturas(browser, res, opts) {
  const base = res.name.replace(/\.html?$/i, '');
  const rendered = renderBrevo(res.src, res.tags, { FIRSTNAME: opts.nombre, LASTNAME: '', EMAIL: 'camila@ejemplo.com' });
  const tmp = path.join(opts.out, `_render_${base}.html`);
  fs.writeFileSync(tmp, rendered, 'utf8');
  const page = await browser.newPage();
  const out = {};
  for (const [label, width] of [['escritorio', 700], ['celular', 390]]) {
    // isMobile: false a propósito: así el ancho de diseño es exactamente 390 px, como lo pinta una app de correo
    await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
    await page.goto(pathToFileURL(tmp).href, { waitUntil: 'networkidle0', timeout: 30000 }).catch(() => {});
    const info = await page.evaluate(() => ({
      sw: document.documentElement.scrollWidth, iw: window.innerWidth, cs: document.characterSet,
      moj: /Ã[\u0080-\u00BF\u00A1-\u00FF]/.test(document.body ? document.body.innerText : ''),
      imgsRotas: [...document.images].filter(i => i.complete && i.naturalWidth === 0).map(i => i.src),
    }));
    const png = path.join(opts.out, `${base}_${width}.png`);
    await page.screenshot({ path: png, fullPage: true });
    out[label] = png;
    if (label === 'celular') {
      if (info.sw > info.iw + 1) res.falla(`En el celular (390 px) el correo mide ${info.sw} px de ancho: se sale de la pantalla (ancho fijo sin max-width).`);
      else res.bien('En el celular (390 px) nada se sale de la pantalla.');
    }
    if (label === 'escritorio') {
      if (info.cs.toLowerCase() !== 'utf-8') res.falla(`Chrome abrió el archivo como ${info.cs}, no UTF-8.`);
      if (info.moj) res.falla('En la captura aparece mojibake ("Ã…").');
      for (const s of info.imgsRotas) res.falla(`Imagen que no carga: ${s}`);
    }
  }
  await page.close();
  try { fs.unlinkSync(tmp); } catch {}
  return out;
}

function imprimir(res, pngs) {
  const L = '─'.repeat(78);
  const lines = [];
  lines.push(L, `CORREO: ${res.name}`, L);
  for (const s of res.ok) lines.push(`  OK     ${s}`);
  for (const s of res.info) lines.push(`  INFO   ${s}`);
  for (const s of res.avisos) lines.push(`  AVISO  ${s}`);
  for (const s of res.fallas) lines.push(`  FALLA  ${s}`);
  if (res.links.length) {
    lines.push('', '  LINKS (' + res.links.length + ')');
    for (const l of res.links) lines.push(`    ${String(l.estado).padEnd(19)} ${String(l.status).padEnd(4)} l.${String(l.line).padEnd(4)} ${l.url}`);
  } else if (res.urls && res.urls.length) {
    lines.push('', `  LINKS (${res.urls.length}, sin comprobar)`);
    for (const u of res.urls) lines.push(`    l.${String(u.line).padEnd(4)} ${u.url}`);
  }
  if (pngs) lines.push('', `  CAPTURAS  escritorio: ${pngs.escritorio}`, `            celular:    ${pngs.celular}`);
  lines.push('', `  RESULTADO: ${res.fallas.length ? `NO LISTO · ${res.fallas.length} falla(s)` : 'LISTO PARA PEGAR EN BREVO'} · ${res.avisos.length} aviso(s)`, '');
  const txt = lines.join('\n');
  console.log(txt);
  return txt;
}

(async () => {
  const opts = parseArgs(process.argv.slice(2));
  fs.mkdirSync(opts.out, { recursive: true });
  let browser = null;
  if (opts.capturas) {
    let puppeteer; try { puppeteer = require('puppeteer-core'); } catch (e) { puppeteer = require('module').createRequire(path.join(process.env.AS_SCRATCH || 'C:/Users/Chingu/AppData/Local/Temp/claude/C--Users-Chingu-Desktop-ACADEMIASEULWEB/d4111e1b-5523-44ea-97b2-b1a1d9545b9e/scratchpad', 'package.json'))('puppeteer-core'); }
    browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--disable-lcd-text', '--lang=es-CL', '--font-render-hinting=none', '--hide-scrollbars'] });
  }
  let totalFallas = 0;
  for (const file of opts.files) {
    if (!fs.existsSync(file)) { console.error(`No existe: ${file}`); totalFallas++; continue; }
    const res = revisar(file, opts);
    if (opts.links) await comprobarLinks(res);
    const pngs = browser ? await capturas(browser, res, opts) : null;
    const txt = imprimir(res, pngs);
    fs.writeFileSync(path.join(opts.out, res.name.replace(/\.html?$/i, '') + '_informe.txt'), txt, 'utf8');
    totalFallas += res.fallas.length;
  }
  if (browser) await browser.close();
  process.exit(totalFallas ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
