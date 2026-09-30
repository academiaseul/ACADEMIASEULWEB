// Revisa E0c_Institucion_Mailchimp.html (etiquetas de Mailchimp, links, colores, precio) y lo renderiza
// con y sin nombre, a 700 y 390 px. Las capturas quedan FUERA del repo (carpeta temporal del sistema).
// Uso: node Brevo/Envios_desde_29sep/herramientas/e0c_check_mailchimp.js [archivo.html]
const fs = require('fs'), os = require('os'), path = require('path'), { pathToFileURL } = require('url');
const SRC = process.argv[2] || path.join(__dirname, '..', 'E0c_Institucion_Mailchimp.html');
const OUT = path.join(os.tmpdir(), 'e0c_mailchimp_render');
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
fs.mkdirSync(OUT, { recursive: true });
const src = fs.readFileSync(SRC, 'utf8');
const fallas = [], ok = [];

// 1 · etiquetas de Mailchimp
const OK_TAGS = ['MC:SUBJECT', 'IF:FNAME', 'ELSE:', 'END:IF', 'FNAME', 'LIST:COMPANY', 'LIST:DESCRIPTION', 'LIST:ADDRESS', 'LIST:ADDRESSLINE', 'HTML:LIST_ADDRESS_HTML', 'UNSUB', 'UPDATE_PROFILE', 'ARCHIVE', 'IF:REWARDS', 'HTML:REWARDS'];
const tags = [...src.matchAll(/\*\|([^|*\n]*)\|\*/g)].map(m => ({ name: m[1], idx: m.index }));
for (const t of tags) if (!OK_TAGS.includes(t.name)) fallas.push('Etiqueta desconocida: *|' + t.name + '|*');
const sueltos = src.replace(/\*\|[^|*\n]*\|\*/g, '').match(/\*\||\|\*/g) || [];
if (sueltos.length) fallas.push('Delimitadores *| o |* sueltos: ' + sueltos.length);
let depth = 0;
for (const t of tags) { if (t.name.startsWith('IF:')) depth++; else if (t.name === 'END:IF') depth--; if (depth < 0) fallas.push('END:IF sin IF'); }
if (depth) fallas.push('IF sin END:IF'); else ok.push('Condicionales IF/ELSE/END:IF balanceados');
if (/href="\*\|UNSUB\|\*"/.test(src)) ok.push('*|UNSUB|* dentro de un href'); else fallas.push('Falta <a href="*|UNSUB|*"> (obligatorio en Mailchimp)');
if (tags.some(t => /^(LIST:ADDRESS|LIST:ADDRESSLINE|HTML:LIST_ADDRESS_HTML)$/.test(t.name))) ok.push('Tiene la dirección de la audiencia'); else fallas.push('Falta *|LIST:ADDRESSLINE|* (o *|LIST:ADDRESS|*)');
if (tags.some(t => t.name === 'LIST:DESCRIPTION')) ok.push('Tiene el recordatorio de permiso *|LIST:DESCRIPTION|*'); else fallas.push('Falta *|LIST:DESCRIPTION|*');
if (tags.some(t => t.name === 'HTML:REWARDS')) ok.push('Tiene *|HTML:REWARDS|* (obligatorio en el plan gratis)'); else fallas.push('Falta *|IF:REWARDS|* *|HTML:REWARDS|* *|END:IF|*');
if (/\{\{|\{%/.test(src)) fallas.push('Tiene etiquetas de Brevo {{ }} o {% %}'); else ok.push('Sin etiquetas de Brevo');
const comments = [...src.matchAll(/<!--([\s\S]*?)-->/g)].filter(c => !/^\[if |<!\[endif\]$/.test(c[1]));
if (comments.length) fallas.push('Comentarios de instrucciones: ' + comments.length); else ok.push('Sin comentarios de instrucciones');

// 2 · links, precio y colores
const utm = [...src.matchAll(/href="(https:\/\/www\.academiaseul\.com[^"]*)"/g)].map(m => m[1]).filter(u => !/\.pdf$/.test(u));
const malUtm = utm.filter(u => !/utm_source=institucion&utm_medium=email&utm_campaign=educadores_(oct|ene)$/.test(u));
if (malUtm.length) fallas.push('Links sin la UTM de la institución: ' + malUtm.join(' ')); else ok.push(utm.length + ' links a academiaseul.com con utm_source=institucion');
const texto = src.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ');
const precios = texto.match(/US\$\s?\d+[^.<]*/g) || [];
if (precios.length && !texto.includes('US$150 el curso completo · o 2 cuotas de US$75')) fallas.push('El precio no está escrito como "US$150 el curso completo · o 2 cuotas de US$75"');
else if (precios.length) ok.push('Precio exacto: "US$150 el curso completo · o 2 cuotas de US$75"');
const hex = [...new Set((src.match(/#[0-9a-fA-F]{6}\b/g) || []).map(h => h.toUpperCase()))];
const rojizos = hex.filter(h => {
  const r = parseInt(h.slice(1, 3), 16) / 255, g = parseInt(h.slice(3, 5), 16) / 255, b = parseInt(h.slice(5, 7), 16) / 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
  if (d < 0.15) return false; // grises y casi blancos
  let hue = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  hue = (hue * 60 + 360) % 360;
  return hue >= 330 || hue <= 20; // rojos y rosados (el dorado #E8B84B está en ~41°)
});
if (rojizos.length) fallas.push('Colores rojizos o rosados: ' + rojizos.join(' ')); else ok.push('Ningún color rojizo ni rosado (' + hex.length + ' colores revisados)');

// 3 · render con valores de ejemplo (no son datos de ninguna lista)
function render(fname) {
  let s = src;
  s = s.replace(/\*\|IF:FNAME\|\*([\s\S]*?)\*\|ELSE:\|\*([\s\S]*?)\*\|END:IF\|\*/g, (_, a, b) => (fname ? a : b));
  s = s.replace(/\*\|IF:REWARDS\|\*[\s\S]*?\*\|END:IF\|\*/g, '');
  const vals = { 'MC:SUBJECT': 'Recursos gratis de coreano para tus estudiantes', FNAME: fname, 'LIST:COMPANY': 'Institución de ejemplo', 'LIST:DESCRIPTION': 'Recibes este correo porque te suscribiste a las noticias de nuestra institución.', 'LIST:ADDRESSLINE': 'Institución de ejemplo · Av. Ejemplo 123 · Comuna · Chile', UNSUB: '#', UPDATE_PROFILE: '#', ARCHIVE: '#' };
  s = s.replace(/\*\|([^|*\n]*)\|\*/g, (m, n) => (n in vals ? vals[n] : m));
  const left = s.match(/\*\|[^|]*\|\*/g);
  if (left) fallas.push('Render ' + (fname || 'sin nombre') + ': quedan etiquetas ' + left.join(' '));
  return s;
}
function loadPuppeteer() {
  try { return require('puppeteer-core'); } catch (e) {
    const scratch = process.env.AS_SCRATCH || 'C:/Users/Chingu/AppData/Local/Temp/claude/C--Users-Chingu-Desktop-ACADEMIASEULWEB/d4111e1b-5523-44ea-97b2-b1a1d9545b9e/scratchpad';
    return require('module').createRequire(path.join(scratch, 'package.json'))('puppeteer-core');
  }
}
(async () => {
  const puppeteer = loadPuppeteer();
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--disable-lcd-text', '--lang=es-CL', '--font-render-hinting=none', '--hide-scrollbars'] });
  const page = await browser.newPage();
  const base = path.basename(SRC, '.html');
  for (const [label, fname] of [['con_nombre', 'Ejemplo'], ['sin_nombre', '']]) {
    const file = path.join(OUT, base + '_' + label + '.html');
    fs.writeFileSync(file, render(fname), 'utf8');
    for (const w of [700, 390]) {
      await page.setViewport({ width: w, height: 900, deviceScaleFactor: 1 });
      await page.goto(pathToFileURL(file).href, { waitUntil: 'networkidle0' });
      const info = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth, saludo: document.querySelector('p').innerText, title: document.title }));
      if (info.sw > info.iw + 1) fallas.push(label + ' ' + w + ' px: se sale (' + info.sw + ' px)');
      else ok.push(label + ' ' + w + ' px: nada se sale · saludo "' + info.saludo + '" · title "' + info.title + '"');
      await page.screenshot({ path: path.join(OUT, base + '_' + label + '_' + w + '.png'), fullPage: true });
    }
  }
  await browser.close();
  ok.forEach(s => console.log('OK     ' + s));
  fallas.forEach(s => console.log('FALLA  ' + s));
  console.log(fallas.length ? 'NO LISTO' : 'LISTO PARA PEGAR EN MAILCHIMP', '· capturas en', OUT);
  process.exitCode = fallas.length ? 1 : 0;
})();
