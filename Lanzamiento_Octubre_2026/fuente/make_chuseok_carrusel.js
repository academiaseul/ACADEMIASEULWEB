// Carrusel de Instagram «¿Qué es 추석?» · Academia Seúl · septiembre 2026
// 8 láminas de feed 1080×1350 con el mismo sistema "boletín" de make_disenos_octubre.js:
// papel #F6F3EC, tinta #0A0A0F, franja azul #4236F6 a la izquierda, cabecera mono "ACADEMIA SEÚL · CULTURA · 추석 · 2026"
// con número de lámina, sello del tigre azul, acentos oro (luna). NUNCA rojo (ni rosado): azul, navy, oro, verde 쑥 y blanco.
// Contenido: caption de Jay (post de Chuseok). Ilustraciones hechas en SVG dentro del HTML (sin fotos ni imágenes de terceros).
//
// Uso:  node lanzamiento/make_chuseok_carrusel.js        → renderiza las 8 láminas
//       node lanzamiento/make_chuseok_carrusel.js 01 07  → solo las láminas cuyo archivo contenga "01" o "07"
//
// Salida: C:/Users/Chingu/Desktop/ACADEMIASEULWEB/Campana_Assets/instagram/octubre/chuseok/chuseok_01.png … chuseok_08.png
// Revisión: en la carpeta HTML del scratchpad quedan chuseok_hoja_contactos.png (las 8 a 1/4) y chuseok_01_miniatura.png (1/3, grilla).
// Las fuentes vienen de Google Fonts (requiere internet). Después del render corre el mismo control automático
// que los diseños de octubre (fuentes, imágenes, textos fuera de márgenes o de sus cajas, solapes, píxeles rojizos).

const fs = require("fs");
const os = require("os");
const path = require("path");

const REPO = "C:/Users/Chingu/Desktop/ACADEMIASEULWEB";
const SCRATCH = "C:/Users/Chingu/AppData/Local/Temp/claude/C--Users-Chingu-Desktop-ACADEMIASEULWEB/d4111e1b-5523-44ea-97b2-b1a1d9545b9e/scratchpad";
const OUT = path.join(REPO, "Campana_Assets/instagram/octubre/chuseok");
const HTML_DIR = fs.existsSync(SCRATCH) ? path.join(SCRATCH, "lanzamiento/html_chuseok") : path.join(os.tmpdir(), "as_chuseok_carrusel");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";

let puppeteer;
try { puppeteer = require("puppeteer-core"); }
catch (e) { puppeteer = require(path.join(SCRATCH, "node_modules/puppeteer-core")); }

// ─── sello (data URI) ───
const SELLO_FILE = [process.env.SELLO_PATH, path.join(SCRATCH, "igpost/sello-azul.png"), path.join(__dirname, "sello-azul.png")]
  .filter(Boolean).find((p) => fs.existsSync(p));
if (!SELLO_FILE) console.warn("⚠ No encontré sello-azul.png: las láminas salen sin sello. Define SELLO_PATH.");
const SELLO = SELLO_FILE ? "data:image/png;base64," + fs.readFileSync(SELLO_FILE).toString("base64") : "";
const sello = (cls = "") => (SELLO ? `<img class="${cls}" src="${SELLO}" alt="Sello Academia Seúl">` : `<div class="${cls}"></div>`);

// ─── paleta (sin rojo) ───
const AZUL = "#4236F6", NAVY = "#003478", INK = "#0A0A0F", PAPER = "#F6F3EC", MUTED = "#5C5F6B", CARD = "#FFFDF8";
const GOLD = "#B8962E", GOLD2 = "#E8B84B", MOON_HI = "#F7E1A6", MOON_LO = "#D9A73A";
// GOLD sobre papel da 2,55:1 (ilegible como texto): para tipografía dorada sobre papel se usa GOLD_TXT (≈5,2:1).
// GOLD sigue para ilustraciones y GOLD2 para texto sobre las bandas negras.
const GOLD_TXT = "#7F6310";
const SSUK = "#A7C08A", SSUK_D = "#6F8F57", SSUK_L = "#C9D8B6", SSUK_XL = "#DDE6D0"; // 쑥 (verde suave)
const YEL = "#F4D97A", YEL_D = "#C9A640", STONE = "#C9C6BC", STONE_D = "#8C8F9C", WHITE = "#FFFFFF";

const W = 1080, H = 1350, TOTAL = 8;
const pad = (n) => String(n).padStart(2, "0");

const FONTS = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;0,900;1,500;1,700;1,900" +
  "&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400" +
  "&family=IBM+Plex+Mono:wght@400;500;600&family=Noto+Sans+KR:wght@500;700;900&family=Noto+Serif+KR:wght@600;700" +
  "&display=swap";

const MOON_BG = `radial-gradient(circle at 36% 32%, ${MOON_HI} 0%, ${GOLD2} 55%, ${MOON_LO} 100%)`;

const BASE_CSS = `
  * { box-sizing: border-box; }
  html, body { margin: 0; background: ${PAPER}; }
  body { width: ${W}px; height: ${H}px; overflow: hidden; font-family: 'Source Serif 4', Georgia, serif; color: ${INK};
         -webkit-font-smoothing: antialiased; font-variant-numeric: lining-nums; }
  .page { position: relative; width: ${W}px; height: ${H}px; display: flex; flex-direction: column; padding: 54px 64px 44px; }
  .page::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 14px; background: ${AZUL}; }
  .mono { font-family: 'IBM Plex Mono', monospace; }
  .kr { font-family: 'Noto Sans KR', sans-serif; }
  .krs { font-family: 'Noto Serif KR', serif; }
  .pf { font-family: 'Playfair Display', Georgia, serif; }
  .azul { color: ${AZUL}; }
  .muted { color: ${MUTED}; }
  .top { display: flex; justify-content: space-between; align-items: center; padding-bottom: 16px; border-bottom: 3px solid ${INK}; flex: none; height: 85px; }
  .top .brand { font-family: 'IBM Plex Mono', monospace; font-size: 17px; letter-spacing: 4px; text-transform: uppercase; font-weight: 600; white-space: nowrap; }
  .top .brand span { color: ${AZUL}; }
  .top .brand .ko { font-family: 'Noto Sans KR', sans-serif; font-weight: 700; text-transform: none; letter-spacing: 2px; }
  .top .tr { display: flex; align-items: center; gap: 22px; }
  .top .num { font-family: 'IBM Plex Mono', monospace; font-size: 22px; font-weight: 600; letter-spacing: 2px; color: ${MUTED}; white-space: nowrap; }
  .top .num b { color: ${AZUL}; font-weight: 600; }
  .top img { height: 66px; width: auto; }
  .foot { margin-top: auto; padding-top: 16px; border-top: 3px solid ${INK}; display: flex; justify-content: space-between; align-items: center; gap: 24px; flex: none; }
  .foot .h, .foot .sw { flex: 1; font-family: 'IBM Plex Mono', monospace; font-size: 19px; letter-spacing: 1px; white-space: nowrap; }
  .foot .h { color: ${MUTED}; }
  .foot .sw { text-align: right; color: ${AZUL}; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; }
  .foot .sw.url { text-transform: none; letter-spacing: 1px; }
  .foot .prog { display: flex; gap: 8px; align-items: center; flex: none; }
  .foot .prog i { display: block; width: 22px; height: 8px; border: 2px solid ${INK}; }
  .foot .prog i.past { background: ${INK}; }
  .foot .prog i.on { background: ${AZUL}; border-color: ${AZUL}; width: 42px; }
  /* bloque que se apoya sobre el pie: se lleva todo el aire sobrante (el pie ya no reparte margen automático) */
  .push { margin-top: auto !important; margin-bottom: 28px; }
  .push + .foot { margin-top: 0; }
  .q { display: flex; justify-content: space-between; align-items: baseline; gap: 20px; margin-top: 26px; flex: none; }
  .q .t { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 38px; line-height: 1.15; }
  .q .t em { color: ${AZUL}; font-style: italic; }
  .q .c { font-family: 'IBM Plex Mono', monospace; font-size: 20px; font-weight: 600; letter-spacing: 2px; color: ${MUTED}; white-space: nowrap; }
`;

const top = (n, withSeal = true) =>
  `<div class="top"><div class="brand">Academia Seúl · <span>Cultura</span> · <span class="ko">추석</span> · 2026</div>` +
  `<div class="tr"><div class="num"><b>${pad(n)}</b>/${pad(TOTAL)}</div>${withSeal ? sello() : ""}</div></div>`;

const foot = (n) => {
  const prog = Array.from({ length: TOTAL }, (_, i) => `<i class="${i + 1 < n ? "past" : i + 1 === n ? "on" : ""}"></i>`).join("");
  // en la última lámina la URL ya está en la banda del CTA: el pie pide guardar y compartir
  const sw = n < TOTAL ? `<div class="sw">Desliza →</div>` : `<div class="sw">Guarda y comparte</div>`;
  return `<div class="foot"><div class="h">@academiaseul</div><div class="prog" data-deco>${prog}</div>${sw}</div>`;
};

function doc(css, body) {
  return `<!doctype html><html lang="es"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<style>${BASE_CSS}${css}</style></head>
<body><div class="page">${body}</div></body></html>`;
}

// ════════════════════════════════════════════════════════════════════════
// Ilustraciones (SVG, viewBox 0 0 360 360)
// ════════════════════════════════════════════════════════════════════════
const svg = (inner, vb = "0 0 360 360") => `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${inner}</svg>`;
const r1 = (x) => Math.round(x * 10) / 10;

// espiga de arroz madura: un solo arco (curva cúbica) que sube desde la base (bx,by) hasta una altura h,
// se dobla hacia dir (−1 izquierda, 1 derecha) y cuelga "droop" px; los granos van en la mitad final del arco
function espiga(bx, by, h, w, droop, dir, color, grano = 9) {
  const P = [[bx, by], [bx + dir * w * 0.04, by - h * 0.92], [bx + dir * w * 0.62, by - h * 1.14], [bx + dir * w, by - h + droop]];
  const B = (t) => [0, 1].map((k) => (1 - t) ** 3 * P[0][k] + 3 * (1 - t) ** 2 * t * P[1][k] + 3 * (1 - t) * t * t * P[2][k] + t ** 3 * P[3][k]);
  const D = (t) => [0, 1].map((k) => 3 * (1 - t) ** 2 * (P[1][k] - P[0][k]) + 6 * (1 - t) * t * (P[2][k] - P[1][k]) + 3 * t * t * (P[3][k] - P[2][k]));
  let s = `<path d="M${P[0].join(" ")} C${P.slice(1).map((p) => p.map(r1).join(" ")).join(", ")}" stroke="${color}" stroke-width="3.6" fill="none" stroke-linecap="round"/>`;
  const N = 13;
  for (let i = 0; i < N; i++) {
    const t = 0.5 + (0.5 * (i + 0.5)) / N;
    const [px, py] = B(t), [dx, dy] = D(t);
    const L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L;
    const side = i % 2 ? 1 : -1, off = grano * 0.6;
    const gx = px + side * nx * off, gy = py + side * ny * off;
    const ang = (Math.atan2(dy, dx) * 180) / Math.PI + side * 24;
    const g = grano * (1.05 - 0.3 * ((t - 0.5) / 0.5));
    s += `<ellipse cx="${r1(gx)}" cy="${r1(gy)}" rx="${r1(g)}" ry="${r1(g * 0.46)}" transform="rotate(${r1(ang)} ${r1(gx)} ${r1(gy)})" fill="${color}"/>`;
  }
  return s;
}
// hoja larga y fina que sale de la base
const hoja = (bx, by, lx, ly, bend, color) => {
  const mx = (bx + lx) / 2 + bend, my = (by + ly) / 2;
  return `<path d="M${bx} ${by} Q${r1(mx - 7)} ${r1(my)} ${lx} ${ly} Q${r1(mx + 7)} ${r1(my + 6)} ${bx + 6} ${by} Z" fill="${color}"/>`;
};

// portada: arrozal en silueta frente a la luna (svg 952×330, suelo en y≈318)
function arrozal() {
  let s = `<path d="M0 330 V326 Q238 290 476 298 T952 326 V330 Z" fill="${NAVY}"/>`;
  // [base x, base y, altura, alcance, caída] del grupo izquierdo; el derecho es su espejo
  const izq = [
    [292, 304, 236, 128, 96], [262, 306, 196, 116, 84], [322, 302, 168, 104, 74],
    [232, 310, 150, 96, 66], [350, 300, 118, 84, 56],
  ];
  const hojasIzq = [[270, 306, 196, 214, -16], [300, 304, 352, 196, 18], [330, 302, 290, 232, -10], [244, 310, 214, 252, -6]];
  for (const [bx, by, lx, ly, bend] of hojasIzq) {
    s += hoja(bx, by, lx, ly, bend, NAVY);
    s += hoja(952 - bx, by, 952 - lx, ly, -bend, NAVY);
  }
  for (const [bx, by, h, w, dr] of izq) {
    s += espiga(bx, by, h, w, dr, -1, NAVY);
    s += espiga(952 - bx, by, h, w, dr, 1, NAVY);
  }
  return svg(s, "0 0 952 330");
}

// 귀성 · volver a la ciudad natal: camino que sube hasta un hanok bajo la luna
function ilGwiseong() {
  return svg(`
  <circle cx="284" cy="80" r="56" fill="none" stroke="${GOLD2}" stroke-opacity=".28" stroke-width="12"/>
  <circle cx="284" cy="80" r="40" fill="${GOLD2}"/>
  <path d="M0 214 L58 168 L104 198 L166 146 L236 202 L298 170 L360 206 V360 H0Z" fill="${SSUK_XL}"/>
  <path d="M0 246 Q90 206 180 236 T360 228 V360 H0Z" fill="${SSUK_L}"/>
  <rect x="181" y="240" width="108" height="9" rx="2" fill="${STONE}"/>
  <rect x="190" y="204" width="90" height="37" fill="${WHITE}" stroke="${NAVY}" stroke-width="3"/>
  <path d="M220 204 V241 M250 204 V241" stroke="${NAVY}" stroke-width="3"/>
  <rect x="197" y="212" width="17" height="15" fill="${MOON_HI}" stroke="${NAVY}" stroke-width="2"/>
  <rect x="256" y="212" width="17" height="15" fill="${MOON_HI}" stroke="${NAVY}" stroke-width="2"/>
  <rect x="224" y="209" width="22" height="31" fill="${GOLD2}" stroke="${NAVY}" stroke-width="2"/>
  <path d="M235 209 V240 M224 224 H246" stroke="${NAVY}" stroke-width="1.8"/>
  <path d="M166 196 C180 201 192 194 201 186 L214 171 L256 171 L269 186 C278 194 290 201 304 196 C298 207 286 209 276 207 L194 207 C184 209 172 207 166 196 Z" fill="${NAVY}"/>
  <rect x="207" y="165" width="56" height="8" rx="3" fill="${NAVY}"/>
  <path d="M0 290 Q110 258 212 283 T360 276 V360 H0Z" fill="${SSUK}"/>
  <path d="M52 360 C118 322 188 300 224 250 L242 250 C214 302 178 332 168 360 Z" fill="#EFE9DC"/>
  <path d="M110 360 C156 326 204 302 233 254" stroke="${GOLD}" stroke-width="4" stroke-dasharray="12 10" fill="none"/>
  <g transform="translate(150 318) rotate(-30)">
    <rect x="-20" y="-8" width="40" height="15" rx="6" fill="${AZUL}"/>
    <path d="M-11 -8 L-6 -17 H8 L13 -8 Z" fill="${AZUL}"/>
    <path d="M-5 -9 L-2 -14 H6 L9 -9 Z" fill="${CARD}"/>
    <circle cx="-11" cy="8" r="5" fill="${INK}"/><circle cx="11" cy="8" r="5" fill="${INK}"/>
  </g>`);
}

// 송편 · pasteles de arroz en media luna (blanco, verde 쑥, amarillo) sobre agujas de pino
// liso y brillante (lleva aceite de sésamo): sin costura punteada, que lo haría parecer mandu o empanada
function ilSongpyeon() {
  const pieza = (x, y, a, f, st) => `<g transform="translate(${x} ${y}) rotate(${a})">
    <path d="M-48 -6 Q0 -12 48 -6 C52 40 -52 40 -48 -6 Z" fill="${f}" stroke="${st}" stroke-width="2.6"/>
    <path d="M-24 18 Q0 26 22 18" stroke="${WHITE}" stroke-opacity=".75" stroke-width="3" fill="none" stroke-linecap="round"/></g>`;
  let agujas = "";
  const pinos = [[92, 118, 10], [270, 110, 150], [70, 250, -20], [290, 270, 200], [180, 96, 80], [180, 300, 260]];
  for (const [x, y, a] of pinos) {
    for (let k = -2; k <= 2; k++) {
      const ang = ((a + k * 13) * Math.PI) / 180, L = 46;
      agujas += `<path d="M${x} ${y} L${r1(x + Math.cos(ang) * L)} ${r1(y + Math.sin(ang) * L)}" stroke="${SSUK_D}" stroke-width="2.6" stroke-linecap="round"/>`;
    }
  }
  return svg(`
  <ellipse cx="180" cy="336" rx="130" ry="10" fill="${INK}" opacity=".06"/>
  <circle cx="180" cy="190" r="148" fill="#E3E9F2" stroke="${NAVY}" stroke-width="4"/>
  <circle cx="180" cy="190" r="128" fill="none" stroke="${NAVY}" stroke-width="1.6" stroke-dasharray="2 7" stroke-linecap="round" opacity=".7"/>
  ${agujas}
  ${pieza(134, 140, -14, WHITE, "#A9A393")}
  ${pieza(234, 138, 12, SSUK, SSUK_D)}
  ${pieza(116, 214, 8, YEL, YEL_D)}
  ${pieza(218, 206, -8, WHITE, "#A9A393")}
  ${pieza(160, 270, 4, SSUK, SSUK_D)}
  ${pieza(246, 262, 14, YEL, YEL_D)}`);
}

// 차례 · mesa ceremonial sobria frente a un biombo (navy, piedra, blanco; el oro solo en fruta y llamas)
// en el centro, el 지방 (tablilla de papel) en su soporte: es lo que convierte la mesa en 차례상
function ilCharye() {
  let biombo = "";
  for (let i = 0; i < 6; i++) {
    const x = 30 + i * 50;
    biombo += `<rect x="${x}" y="36" width="50" height="198" fill="#EFEBE2" stroke="${STONE_D}" stroke-width="2"/>`;
    biombo += `<rect x="${x + 7}" y="46" width="36" height="178" fill="none" stroke="#C3C5CC" stroke-width="1.5"/>`;
    biombo += `<path d="M${x + 25} 70 V200" stroke="#D5D6DB" stroke-width="3" stroke-dasharray="10 9"/>`;
  }
  const vela = (cx) => `<ellipse cx="${cx}" cy="229" rx="15" ry="4" fill="${NAVY}"/>
    <rect x="${cx - 3}" y="162" width="6" height="67" fill="${NAVY}"/>
    <ellipse cx="${cx}" cy="162" rx="13" ry="3.5" fill="${NAVY}"/>
    <rect x="${cx - 6}" y="130" width="12" height="32" fill="${WHITE}" stroke="${STONE_D}" stroke-width="1.5"/>
    <path d="M${cx} 110 Q${cx + 7} 121 ${cx} 129 Q${cx - 7} 121 ${cx} 110 Z" fill="${GOLD2}"/>`;
  const plato = (cx, y) => `<rect x="${cx - 28}" y="${y}" width="56" height="7" rx="2" fill="${NAVY}"/>
    <path d="M${cx - 8} ${y + 7} L${cx - 5} 226 H${cx + 5} L${cx + 8} ${y + 7} Z" fill="${NAVY}"/>
    <rect x="${cx - 17}" y="225" width="34" height="7" rx="2" fill="${NAVY}"/>`;
  let peras = "";
  for (const [x, y] of [[103, 186], [125, 186], [147, 186], [114, 166], [136, 166], [125, 146]])
    peras += `<circle cx="${x}" cy="${y}" r="11" fill="${GOLD2}" stroke="${GOLD}" stroke-width="1.6"/>`;
  let tteok = "";
  [[186, 48], [176, 44], [166, 40], [156, 36]].forEach(([y, w]) => {
    tteok += `<rect x="${235 - w / 2}" y="${y}" width="${w}" height="10" rx="2" fill="${WHITE}" stroke="${STONE_D}" stroke-width="1.5"/>`;
  });
  return svg(`
  ${biombo}
  <rect x="30" y="232" width="300" height="3" fill="${STONE_D}"/>
  ${vela(66)}${vela(294)}
  ${plato(125, 197)}${peras}
  ${plato(235, 197)}${tteok}
  <rect x="167" y="116" width="26" height="114" rx="2" fill="${NAVY}"/>
  <rect x="172" y="122" width="16" height="50" fill="${WHITE}" stroke="${STONE_D}" stroke-width="1.4"/>
  <path d="M180 129 V165" stroke="${STONE_D}" stroke-width="2" stroke-dasharray="4 3" opacity=".75"/>
  <path d="M158 206 H202 Q200 229 180 229 Q160 229 158 206 Z" fill="${WHITE}" stroke="${NAVY}" stroke-width="2.2"/>
  <path d="M160 206 Q180 184 200 206 Z" fill="${WHITE}" stroke="${NAVY}" stroke-width="2.2"/>
  <circle cx="180" cy="192" r="4" fill="${NAVY}"/>
  <rect x="34" y="232" width="292" height="14" rx="2" fill="${NAVY}"/>
  <rect x="48" y="246" width="264" height="16" fill="#12407F"/>
  <path d="M62 262 H80 V314 Q80 324 90 326 H56 Q64 322 62 314 Z" fill="${NAVY}"/>
  <path d="M298 262 H280 V314 Q280 324 270 326 H304 Q296 322 298 314 Z" fill="${NAVY}"/>
  <rect x="20" y="326" width="320" height="3" fill="${STONE_D}" opacity=".6"/>`);
}

// 성묘 · túmulo familiar (봉분) con su lápida y un pino, en calma
function ilSeongmyo() {
  // mata de pasto: tres hojas rellenas de base ancha y punta arriba (las líneas finas en abanico se leían como flechas "v")
  const mata = (x, y, o = 1) => `<path d="M${x - 6} ${y} L${x - 9} ${y - 10} L${x - 2} ${y} Z M${x - 2.5} ${y} L${x} ${y - 13} L${x + 2.5} ${y} Z M${x + 2} ${y} L${x + 9} ${y - 10} L${x + 6} ${y} Z" fill="${SSUK_D}" opacity="${o}"/>`;
  const pasto = [[118, 228], [150, 208], [184, 202], [202, 203], [246, 222], [164, 250], [224, 252]].map(([x, y]) => mata(x, y)).join("");
  const suelo = [[34, 306], [112, 340], [248, 338], [338, 322]].map(([x, y]) => mata(x, y, 0.7)).join("");
  // copa del pino (소나무): cojines de base plana y lomo ondulado, como en la pintura coreana (cx, base, ancho, alto)
  const copa = ([x, y, w, h]) => `<path d="M${x - w / 2} ${y} C${x - w / 2} ${y - h * 0.7} ${x - w * 0.34} ${y - h * 0.86} ${x - w * 0.2} ${y - h * 0.8}
    C${x - w * 0.12} ${y - h * 1.08} ${x + w * 0.14} ${y - h * 1.1} ${x + w * 0.2} ${y - h * 0.82} C${x + w * 0.36} ${y - h * 0.9} ${x + w / 2} ${y - h * 0.62} ${x + w / 2} ${y}
    Q${x} ${y + h * 0.22} ${x - w / 2} ${y} Z" fill="${NAVY}"/>`;
  return svg(`
  <path d="M0 196 Q100 146 200 180 T360 166 V360 H0Z" fill="${SSUK_XL}"/>
  <path d="M0 272 Q180 246 360 266 V360 H0Z" fill="${SSUK_L}"/>
  <path d="M84 276 C88 176 276 176 282 272 Z" fill="${SSUK}" stroke="${SSUK_D}" stroke-width="3"/>
  ${pasto}
  <path d="M62 282 C120 270 250 268 304 280" stroke="${SSUK_D}" stroke-width="2.5" fill="none" opacity=".6"/>
  <rect x="146" y="282" width="80" height="16" rx="2" fill="${STONE}" stroke="${STONE_D}" stroke-width="2"/>
  <rect x="156" y="298" width="10" height="16" fill="${STONE_D}"/><rect x="206" y="298" width="10" height="16" fill="${STONE_D}"/>
  <rect x="58" y="232" width="28" height="64" rx="2" fill="${STONE}" stroke="${STONE_D}" stroke-width="2"/>
  <rect x="53" y="224" width="38" height="11" rx="3" fill="#B7B4AA" stroke="${STONE_D}" stroke-width="2"/>
  <path d="M72 246 V282" stroke="${STONE_D}" stroke-width="2" stroke-dasharray="4 5"/>
  <g transform="translate(-24 0)">
    <path d="M318 304 C311 256 327 212 314 134" stroke="${NAVY}" stroke-width="10" fill="none" stroke-linecap="round"/>
    <path d="M317 224 C302 214 290 208 276 197" stroke="${NAVY}" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M320 190 C330 186 336 182 342 176" stroke="${NAVY}" stroke-width="5" fill="none" stroke-linecap="round"/>
    ${[[314, 126, 66, 28], [294, 160, 80, 28], [338, 176, 40, 22], [272, 197, 62, 24], [336, 210, 44, 20]].map(copa).join("")}
  </g>
  ${suelo}`);
}

// 한복 · chogori amarillo con cuello, cintas y puños navy + falda (chima) azul con borde dorado
// 우임: el panel izquierdo de quien lo viste cruza sobre el derecho. Visto de frente, el 겉깃 baja desde el hombro
// DERECHO del espectador hasta el pecho IZQUIERDO del espectador, y ahí se ata el 고름 (lado derecho de quien lo lleva).
function ilHanbok() {
  const manga = `<path d="M142 74 C110 78 70 100 50 150 C58 170 84 172 100 160 C112 128 128 112 146 106 Z" fill="${YEL}" stroke="${YEL_D}" stroke-width="2"/>
    <path d="M50 150 C58 170 84 172 100 160 L93 146 C80 154 64 152 57 136 Z" fill="${NAVY}"/>`;
  return svg(`
  <ellipse cx="180" cy="340" rx="140" ry="9" fill="${INK}" opacity=".07"/>
  <path d="M122 150 H238 C258 210 300 288 318 330 Q180 348 42 330 C60 288 102 210 122 150 Z" fill="${AZUL}"/>
  <path d="M150 162 L106 332 M168 162 L150 340 M192 162 L210 340 M210 162 L254 332 M134 160 L74 326 M226 160 L286 326" stroke="#7A72FF" stroke-width="2.4" opacity=".75"/>
  <path d="M50 316 Q180 334 310 316" stroke="${GOLD2}" stroke-width="5" fill="none"/>
  <path d="M60 304 Q180 320 300 304" stroke="${GOLD2}" stroke-width="2" fill="none" stroke-dasharray="3 9" stroke-linecap="round"/>
  ${manga}
  <g transform="translate(360 0) scale(-1 1)">${manga}</g>
  <path d="M142 70 H218 L232 162 H128 Z" fill="${YEL}" stroke="${YEL_D}" stroke-width="2"/>
  <path d="M151 70 L164 70 L186 98 L175 105 Z" fill="${NAVY}"/>
  <path d="M159 70 L178 95" stroke="${WHITE}" stroke-width="3.5" fill="none"/>
  <path d="M193 70 L208 70 L168 123 L154 115 Z" fill="${NAVY}"/>
  <path d="M197 70 L167 106" stroke="${WHITE}" stroke-width="3.5" fill="none"/>
  <g transform="translate(360 0) scale(-1 1)">
    <path d="M194 116 L182 200 L193 201 L199 118 Z" fill="${NAVY}"/>
    <path d="M198 116 L214 190 L224 187 L203 115 Z" fill="${NAVY}"/>
    <ellipse cx="190" cy="114" rx="13" ry="6" transform="rotate(-20 190 114)" fill="${NAVY}"/>
    <circle cx="199" cy="116" r="5" fill="${NAVY}"/>
  </g>`);
}

// 강강술래 · ronda de personas tomadas de la mano bajo la luna llena
// brazos: solo entre vecinas (no un polígono que cruce la ronda). Cada par baja del hombro a las manos unidas (una V con
// un punto), para que se lea "tomadas de la mano" y no una cuerda; los del fondo van detrás de las personas y los del frente delante.
// 7 figuras con una al frente al centro: ninguna queda tapada por otra (con 8 se encimaban a los costados).
function ilGanggang() {
  const cx = 180, cy = 270, rx = 144, ry = 58, N = 7, K = 1.3;
  const colores = [AZUL, GOLD2, NAVY, AZUL, GOLD2, NAVY, GOLD2]; // sin dos vecinas del mismo color
  const figs = Array.from({ length: N }, (_, i) => {
    const th = Math.PI / 2 + (i / N) * Math.PI * 2; // una figura al frente, al centro
    const x = cx + rx * Math.cos(th), y = cy + ry * Math.sin(th);
    const s = K * (0.7 + 0.3 * ((Math.sin(th) + 1) / 2));
    return { x, y, s, c: colores[i] };
  });
  let brazosAtras = "", brazosDelante = "";
  figs.forEach((a, i) => {
    const b = figs[(i + 1) % N], dir = Math.sign(b.x - a.x) || 1;
    // cada brazo sale del costado de la blusa (no del centro del torso) y baja hasta las manos, entre las dos figuras
    const x1 = a.x + dir * 9 * a.s, y1 = a.y - 50 * a.s, x2 = b.x - dir * 9 * b.s, y2 = b.y - 50 * b.s;
    const hx = (x1 + x2) / 2, hy = Math.max(y1, y2) + 16 * ((a.s + b.s) / 2);
    const arco = `<path d="M${r1(x1)} ${r1(y1)} L${r1(hx)} ${r1(hy)} L${r1(x2)} ${r1(y2)}" fill="none" stroke="${NAVY}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<circle cx="${r1(hx)}" cy="${r1(hy)}" r="4.2" fill="${NAVY}"/>`;
    if ((a.y + b.y) / 2 < cy) brazosAtras += arco; else brazosDelante += arco;
  });
  let personas = "";
  for (const f of [...figs].sort((a, b) => a.y - b.y)) {
    const { x, y, s, c } = f;
    personas += `<g transform="translate(${r1(x)} ${r1(y)}) scale(${r1(s * 100) / 100})">
      <path d="M-19 0 Q0 7 19 0 L7 -40 H-7 Z" fill="${c}"/>
      <path d="M-10 -38 H10 L8 -56 H-8 Z" fill="${c === GOLD2 ? WHITE : YEL}" stroke="${c === GOLD2 ? "#B3AD9E" : YEL_D}" stroke-width="1.5"/>
      <circle cx="0" cy="-66" r="10" fill="${NAVY}"/>
      <circle cx="${c === GOLD2 ? 7 : -7}" cy="-72" r="5" fill="${NAVY}"/></g>`;
  }
  return svg(`
  <circle cx="180" cy="74" r="62" fill="none" stroke="${GOLD2}" stroke-opacity=".25" stroke-width="12"/>
  <circle cx="180" cy="74" r="48" fill="${GOLD2}"/>
  <circle cx="196" cy="64" r="10" fill="${MOON_LO}" opacity=".25"/><circle cx="166" cy="88" r="7" fill="${MOON_LO}" opacity=".25"/>
  <ellipse cx="180" cy="276" rx="166" ry="68" fill="#EDE7DA"/>
  <ellipse cx="180" cy="272" rx="152" ry="58" fill="none" stroke="${GOLD}" stroke-width="2" stroke-dasharray="4 9" stroke-linecap="round"/>
  ${brazosAtras}${personas}${brazosDelante}`);
}

// íconos de la lámina 6 (viewBox 0 0 64 64, línea navy)
const ic = (inner) => svg(`<g fill="none" stroke="${NAVY}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">${inner}</g>`, "0 0 64 64");
const ICONOS = {
  casa: ic(`<path d="M6 30 L28 12 L50 30"/><path d="M12 26 V54 H44 V26"/><path d="M23 54 V41 H33 V54"/>
    <path d="M50 4 a8 8 0 0 1 8 8 c0 6 -8 14 -8 14 s-8 -8 -8 -14 a8 8 0 0 1 8 -8 z" fill="${AZUL}" stroke="${AZUL}"/><circle cx="50" cy="12" r="2.6" fill="${CARD}" stroke="none"/>`),
  maleta: ic(`<rect x="12" y="20" width="40" height="32" rx="5"/><path d="M24 20 V13 H40 V20"/><path d="M22 20 V52 M42 20 V52"/>
    <circle cx="20" cy="57" r="3"/><circle cx="44" cy="57" r="3"/>`),
  sofa: ic(`<path d="M12 34 V26 a6 6 0 0 1 6 -6 H46 a6 6 0 0 1 6 6 V34"/><path d="M6 38 a4 4 0 0 1 8 0 V42 H50 V38 a4 4 0 0 1 8 0 V50 H6 Z"/>
    <path d="M11 50 V56 M53 50 V56"/><path d="M40 6 a7 7 0 1 0 8 9 a6 6 0 0 1 -8 -9 z" fill="${GOLD2}" stroke="${GOLD}" stroke-width="2"/>`),
  bol: ic(`<path d="M8 34 H50 C50 46 41 54 29 54 C17 54 8 46 8 34 Z"/><path d="M20 26 C16 22 24 18 20 12 M31 26 C27 22 35 18 31 12" stroke="${AZUL}"/>
    <path d="M44 6 L56 30 M50 4 L60 26"/>`),
  gente: ic(`<circle cx="22" cy="24" r="7"/><path d="M8 54 C8 42 14 36 22 36 C30 36 36 42 36 54"/><circle cx="44" cy="28" r="6"/>
    <path d="M34 54 C34 46 38 40 44 40 C50 40 56 46 56 54"/>
    <path d="M33 17 L27 11 a3.6 3.6 0 0 1 6 -4.6 a3.6 3.6 0 0 1 6 4.6 Z" fill="${AZUL}" stroke="${AZUL}" stroke-width="1.5"/>`),
};

// ════════════════════════════════════════════════════════════════════════
// 01 · Portada
// ════════════════════════════════════════════════════════════════════════
function l1() {
  const css = `
  .hero { position: relative; height: 652px; margin-top: 22px; flex: none; }
  .moon { position: absolute; left: 50%; top: 32px; width: 580px; height: 580px; margin-left: -290px; border-radius: 50%;
          background: ${MOON_BG}; box-shadow: 0 0 0 22px rgba(232,184,75,.17), 0 0 0 46px rgba(232,184,75,.08); overflow: hidden; }
  .moon svg { position: absolute; inset: 0; width: 100%; height: 100%; }
  .rice { position: absolute; left: 0; bottom: 0; width: 952px; height: 330px; }
  .rice svg { display: block; width: 100%; height: 100%; }
  .ttl { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 148px; line-height: 1; letter-spacing: -3px; text-align: center; margin: 30px 0 0; white-space: nowrap; flex: none; }
  .ttl .kr { font-weight: 900; color: ${AZUL}; letter-spacing: -4px; font-size: .94em; }
  .sub { font-family: 'Playfair Display', serif; font-style: italic; font-size: 44px; line-height: 1.2; text-align: center; margin-top: 30px; text-wrap: balance; flex: none; }
  .sub b { font-style: normal; font-weight: 700; }
  /* portada: la única señal de carrusel tiene que verse en el celular; el pie mantiene su alto (line-height fijo) */
  .foot .sw { font-size: 26px; line-height: 25px; }
  .chip { align-self: center; font-family: 'IBM Plex Mono', monospace; font-size: 26px; font-weight: 600; letter-spacing: .5px; color: ${AZUL};
          border: 2.5px solid ${INK}; padding: 10px 20px; line-height: 1.2; white-space: nowrap; background: ${CARD}; }
  `;
  const crateres = svg(`<g fill="#C99A2E" opacity=".13"><circle cx="340" cy="170" r="48"/><circle cx="178" cy="300" r="30"/><circle cx="372" cy="330" r="22"/><circle cx="248" cy="118" r="17"/><circle cx="286" cy="236" r="12"/></g>`, "0 0 524 524");  const body = `
  ${top(1)}
  <div class="hero"><div class="moon" data-deco>${crateres}</div><div class="rice" data-deco>${arrozal()}</div></div>
  <h1 class="ttl">¿Qué es <span class="kr">추석</span>?</h1>
  <div class="sub"><b>Chuseok</b> · la gran celebración de la cosecha en Corea</div>
  <div class="chip push">6 costumbres + 1 frase para guardar →</div>
  ${foot(1)}`;
  return doc(css, body);
}

// ════════════════════════════════════════════════════════════════════════
// 02 · Qué es
// ════════════════════════════════════════════════════════════════════════
function l2() {
  const css = `
  .kick { font-family: 'Playfair Display', serif; font-style: italic; font-size: 36px; line-height: 1.25; color: ${MUTED}; margin-top: 30px; flex: none; text-wrap: balance; }
  .word { display: flex; align-items: flex-end; gap: 40px; margin-top: 6px; flex: none; }
  .word .k { font-family: 'Noto Sans KR', sans-serif; font-weight: 900; font-size: 226px; line-height: 1.12; color: ${AZUL}; letter-spacing: -7px; white-space: nowrap; }
  .word .r { padding-bottom: 50px; }
  .word .r .ro { font-family: 'Playfair Display', serif; font-style: italic; font-weight: 700; font-size: 92px; line-height: 1; }
  /* 추 chu 秋 otoño / 석 seok 夕 noche: sonido + significado del carácter (秋夕 = «noche de otoño») */
  .word .r .sy { display: grid; grid-template-columns: auto auto auto auto; justify-content: start; align-items: baseline; column-gap: 14px; row-gap: 2px;
                 font-family: 'IBM Plex Mono', monospace; font-size: 28px; letter-spacing: 1px; color: ${MUTED}; margin-top: 18px; white-space: nowrap; line-height: 1.3; }
  .word .r .sy b { color: ${AZUL}; font-family: 'Noto Sans KR', sans-serif; font-weight: 700; }
  .word .r .sy i { font-style: normal; font-family: 'Noto Serif KR', serif; font-weight: 700; color: ${NAVY}; padding-left: 10px; }
  .word .r .sy .g { color: ${INK}; }
  .lede { font-size: 36px; line-height: 1.34; margin: 8px 0 0; flex: none; }
  .lede b { font-weight: 600; color: ${NAVY}; }
  .cuando { margin-top: 36px; display: grid; grid-template-columns: 1fr 1fr; border: 3px solid ${INK}; background: ${CARD}; flex: none; }
  .cuando > div { padding: 26px 28px 28px; }
  .cuando > div + div { border-left: 3px solid ${INK}; }
  .lbl { font-family: 'IBM Plex Mono', monospace; font-size: 18px; letter-spacing: 3px; text-transform: uppercase; color: ${AZUL}; font-weight: 600; white-space: nowrap; }
  .luna { display: flex; gap: 20px; align-items: center; margin-top: 16px; }
  .luna i { display: block; width: 64px; height: 64px; border-radius: 50%; background: ${MOON_BG}; flex: none; box-shadow: 0 0 0 7px rgba(232,184,75,.2); }
  .luna .ek { font-family: 'Noto Sans KR', sans-serif; font-weight: 700; font-size: 36px; line-height: 1.2; white-space: nowrap; }
  .cuando .t { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 31px; line-height: 1.24; margin-top: 16px; text-wrap: balance; }
  .cal { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 16px; }
  .cal > div { border: 2px solid ${INK}; text-align: center; padding: 8px 0 10px; background: ${PAPER}; }
  .cal .d { font-family: 'IBM Plex Mono', monospace; font-size: 18px; letter-spacing: 2px; text-transform: uppercase; font-weight: 600; }
  .cal .n { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 60px; line-height: 1.05; }
  .cal .on { background: ${GOLD2}; }
  .cal .fer { background: ${MOON_HI}; } /* los otros dos días del feriado, en oro claro (la nota lo dice en texto) */
  .cal .x { font-family: 'Noto Sans KR', sans-serif; font-weight: 700; font-size: 24px; line-height: 1.2; }
  .cuando .nota { font-size: 28px; line-height: 1.3; margin-top: 16px; }
  .cuando .nota b { font-weight: 700; }
  .next { background: ${INK}; color: ${PAPER}; padding: 24px 30px; display: flex; justify-content: space-between; align-items: center; gap: 20px; flex: none; }
  .next .t { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 38px; line-height: 1.18; }
  .next .t span { color: ${GOLD2}; }
  .next .a { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 70px; line-height: 1; color: ${GOLD2}; }
  `;
  const body = `
  ${top(2)}
  <div class="kick">Si estás aprendiendo coreano, vas a escuchar esta palabra muchas veces:</div>
  <div class="word"><div class="k">추석</div><div class="r"><div class="ro">Chuseok</div>
    <div class="sy"><b>추</b><span>chu</span><i>秋</i><span class="g">otoño</span><b>석</b><span>seok</span><i>夕</i><span class="g">noche</span></div></div></div>
  <p class="lede">Es una de las celebraciones tradicionales más importantes de Corea: muchas familias se reúnen para <b>compartir, agradecer y recordar a sus antepasados</b>.</p>
  <div class="cuando">
    <div><div class="lbl">¿Cuándo?</div>
      <div class="luna"><i data-deco></i><div class="ek">음력 8월 15일</div></div>
      <div class="t">El día 15 del 8.º mes del calendario lunar, con luna llena.</div></div>
    <div><div class="lbl">Septiembre 2026</div>
      <div class="cal"><div class="fer"><div class="d">jue</div><div class="n">24</div></div>
        <div class="on"><div class="d">vie</div><div class="n">25</div><div class="x">추석</div></div>
        <div class="fer"><div class="d">sáb</div><div class="n">26</div></div></div>
      <div class="nota">Feriado en Corea del 24 al 26; el día de <b class="kr">추석</b> fue el viernes 25.</div></div>
  </div>
  <div class="next push"><div class="t">¿Qué hacen los coreanos<br>durante <span>Chuseok</span>?</div><div class="a" data-deco>→</div></div>
  ${foot(2)}`;
  return doc(css, body);
}

// ════════════════════════════════════════════════════════════════════════
// 03 · 04 · 05 · Costumbres (dos por lámina)
// ════════════════════════════════════════════════════════════════════════
const COSTUMBRES = [
  { k: "귀성", r: "Gwiseong", d: `Muchas personas vuelven a su <span class="kr">고향</span> (pueblo o ciudad natal) para reunirse con su familia.`, il: ilGwiseong },
  { k: "송편", r: "Songpyeon", d: "Pastelito de arroz en forma de media luna, relleno de sésamo, porotos o castaña y cocido al vapor sobre agujas de pino.", il: ilSongpyeon },
  { k: "차례", r: "Charye", d: "Algunas familias realizan una ceremonia para recordar y honrar a sus antepasados.", il: ilCharye, sobrio: true },
  // 성묘 = visitar las tumbas y saludar a los antepasados; cortar el pasto y limpiar es el 벌초, que se hace ANTES de Chuseok
  { k: "성묘", r: "Seongmyo", d: `Visitar las tumbas de los antepasados para presentarles sus respetos (antes se corta el pasto: <span class="kr">벌초</span>).`, il: ilSeongmyo, sobrio: true },
  { k: "한복", r: "Hanbok", d: "Algunas personas usan ropa tradicional para las celebraciones.", il: ilHanbok },
  { k: "강강술래", r: "Ganggangsullae", d: "Una danza en círculo, tomados de la mano bajo la luna llena de Chuseok. Patrimonio Inmaterial de la UNESCO (2009).", il: ilGanggang },
];

const costumbreCSS = `
  .items { margin-top: 20px; flex: none; }
  /* align-items:start + padding fijo: el número y la palabra coreana caen a la misma altura en 03, 04 y 05 */
  .item { display: grid; grid-template-columns: 416px 1fr; column-gap: 40px; padding: 32px 0; border-top: 3px solid ${INK}; align-items: start; }
  .ill { width: 416px; height: 416px; border: 2.5px solid ${INK}; background: ${CARD}; }
  .ill svg { display: block; width: 100%; height: 100%; }
  .txt { padding-top: 28px; }
  .txt .n { font-family: 'IBM Plex Mono', monospace; font-size: 20px; font-weight: 600; letter-spacing: 2px; color: ${MUTED}; }
  .txt .n b { color: ${AZUL}; font-weight: 600; }
  .txt .k { font-family: 'Noto Sans KR', sans-serif; font-weight: 900; font-size: 116px; line-height: 1.16; color: ${AZUL}; letter-spacing: -3px; white-space: nowrap; margin-top: 4px; }
  .txt .r { font-family: 'Playfair Display', serif; font-style: italic; font-weight: 700; font-size: 50px; line-height: 1.05; white-space: nowrap; }
  .txt .d { font-size: 31px; line-height: 1.34; margin-top: 18px; text-wrap: pretty; }
  .txt .d .kr { font-weight: 700; white-space: nowrap; line-height: 1; } /* 벌초, 고향: sin cortar la palabra ni agrandar el renglón */
  .sobrio .txt .k { color: ${NAVY}; }
  .sobrio .txt .n b { color: ${NAVY}; }
`;

function costumbres(n, a, b) {
  const item = (c, i) => `<div class="item${c.sobrio ? " sobrio" : ""}"><div class="ill" data-deco>${c.il()}</div>
    <div class="txt"><div class="n"><b>${pad(i + 1)}</b> / 06</div><div class="k">${c.k}</div><div class="r">${c.r}</div><div class="d">${c.d}</div></div></div>`;
  const body = `
  ${top(n)}
  <div class="q"><div class="t">¿Qué hacen los coreanos durante <em>Chuseok</em>?</div></div>
  <div class="items">${item(COSTUMBRES[a], a)}${item(COSTUMBRES[b], b)}</div>
  ${foot(n)}`;
  return doc(costumbreCSS, body);
}

// ════════════════════════════════════════════════════════════════════════
// 06 · Chuseok hoy
// ════════════════════════════════════════════════════════════════════════
function l6() {
  const css = `
  .ttl { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 120px; line-height: 1; letter-spacing: -3px; margin: 34px 0 0; white-space: nowrap; flex: none; }
  .ttl em { font-style: italic; font-weight: 700; color: ${AZUL}; }
  .kick { font-family: 'Playfair Display', serif; font-style: italic; font-size: 40px; line-height: 1.22; margin-top: 18px; flex: none; text-wrap: balance; }
  .ways { margin-top: 30px; border-top: 3px solid ${INK}; flex: none; }
  .ways > div { display: flex; align-items: center; gap: 30px; padding: 14px 0; border-bottom: 1px solid rgba(10,10,15,.22); }
  .ways .ic { width: 96px; height: 96px; border: 2.5px solid ${INK}; background: ${CARD}; flex: none; display: flex; align-items: center; justify-content: center; }
  .ways .ic svg { width: 66px; height: 66px; display: block; }
  .ways .t { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 42px; line-height: 1.12; }
  .cada { background: ${INK}; color: ${PAPER}; padding: 26px 32px; display: flex; align-items: center; justify-content: space-between; gap: 20px; flex: none; }
  .cada .t { font-family: 'Playfair Display', serif; font-weight: 700; font-style: italic; font-size: 46px; line-height: 1.15; }
  .cada .t span { color: ${GOLD2}; }
  .cada i { display: block; width: 62px; height: 62px; border-radius: 50%; background: ${MOON_BG}; flex: none; box-shadow: 0 0 0 7px rgba(232,184,75,.22); }
  `;
  const W5 = [
    [ICONOS.casa, "Volver al pueblo o ciudad natal"],
    [ICONOS.maleta, "Viajar (incluso al extranjero)"],
    [ICONOS.sofa, "Descansar en casa"],
    [ICONOS.bol, "Comer juntos"],
    [ICONOS.gente, "Pasar tiempo con los seres queridos"],
  ];
  const body = `
  ${top(6)}
  <h1 class="ttl">Chuseok <em>hoy</em></h1>
  <div class="kick">Como muchas tradiciones, Chuseok también ha cambiado.</div>
  <div class="ways">${W5.map(([i, t]) => `<div><div class="ic" data-deco>${i}</div><div class="t">${t}</div></div>`).join("")}</div>
  <div class="cada push"><div class="t">Cada familia lo celebra <span>a su manera.</span></div><i data-deco></i></div>
  ${foot(6)}`;
  return doc(css, body);
}

// ════════════════════════════════════════════════════════════════════════
// 07 · La frase
// ════════════════════════════════════════════════════════════════════════
function l7() {
  const css = `
  .kick { display: flex; align-items: baseline; justify-content: space-between; margin-top: 30px; flex: none; }
  .kick .t { font-family: 'Playfair Display', serif; font-style: italic; font-size: 38px; line-height: 1.2; color: ${MUTED}; }
  .kick .save { font-family: 'IBM Plex Mono', monospace; font-size: 24px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: ${AZUL};
                white-space: nowrap; display: flex; align-items: center; gap: 10px; }
  .kick .save svg { width: 22px; height: 28px; display: block; }
  /* 추석 / 잘 보내세요!: 잘 va con el verbo al que modifica; la luna llena ocupa el aire a la derecha de la línea 1 */
  .frase { position: relative; font-family: 'Noto Sans KR', sans-serif; font-weight: 900; font-size: 150px; line-height: 1.06; letter-spacing: -5px; margin-top: 12px; flex: none; }
  .frase .w1 { color: ${AZUL}; } .frase .w2 { color: ${GOLD_TXT}; } .frase .w3 { color: ${INK}; }
  .frase .mn { position: absolute; right: 18px; top: 22px; width: 118px; height: 118px; border-radius: 50%; background: ${MOON_BG};
               box-shadow: 0 0 0 11px rgba(232,184,75,.17), 0 0 0 23px rgba(232,184,75,.07); }
  .ro { font-family: 'IBM Plex Mono', monospace; font-size: 30px; letter-spacing: 1px; color: ${MUTED}; margin-top: 10px; flex: none; white-space: nowrap; }
  .ro span { font-family: 'Noto Sans KR', sans-serif; font-weight: 700; color: ${INK}; letter-spacing: 0; margin-left: 14px; }
  .es { font-family: 'Playfair Display', serif; font-style: italic; font-weight: 700; font-size: 54px; line-height: 1.1; margin-top: 14px; flex: none; }
  .desg { margin-top: 30px; border-top: 3px solid ${INK}; flex: none; }
  .desg > div { display: grid; grid-template-columns: 236px 1fr; column-gap: 26px; padding: 14px 0; border-bottom: 1px solid rgba(10,10,15,.22); align-items: baseline; }
  .desg .k { font-family: 'Noto Sans KR', sans-serif; font-weight: 900; font-size: 52px; line-height: 1.2; white-space: nowrap; letter-spacing: -1px; }
  .desg .v { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 40px; line-height: 1.15; }
  .desg .v small { display: block; font-family: 'Source Serif 4', serif; font-weight: 400; font-size: 28px; line-height: 1.32; color: ${MUTED}; margin-top: 6px; }
  .desg .v small .kr { color: ${INK}; font-weight: 700; }
  .desg .v small b { color: ${INK}; font-weight: 600; }
  /* nota en dos filas: a quién y cuándo (antes / durante) + qué se dice cuando el feriado ya pasó (el post sale el 26) */
  .nota { border: 3px solid ${INK}; background: ${CARD}; padding: 20px 26px; display: grid; grid-template-columns: auto 1fr; column-gap: 22px; row-gap: 14px; align-items: baseline; flex: none; }
  .nota .lbl { font-family: 'IBM Plex Mono', monospace; font-size: 18px; letter-spacing: 3px; text-transform: uppercase; color: ${AZUL}; font-weight: 600; white-space: nowrap; line-height: 1.4; }
  .nota .t { font-size: 29px; line-height: 1.3; }
  .nota .t .kr { font-weight: 700; line-height: 1; }
  .nota hr { grid-column: 1 / -1; margin: 0; border: 0; border-top: 1px solid rgba(10,10,15,.22); }
  `;
  // ícono "guardar" (marcador, como el de Instagram)
  const guardar = svg(`<path d="M3 3 H19 V25 L11 18 L3 25 Z" fill="none" stroke="${AZUL}" stroke-width="3" stroke-linejoin="round"/>`, "0 0 22 28");
  const body = `
  ${top(7)}
  <div class="kick"><div class="t">Una frase que puedes aprender hoy</div><div class="save">Guárdala ${guardar}</div></div>
  <div class="frase"><span class="w1">추석</span><i class="mn" data-deco></i><br><span class="w2">잘</span> <span class="w3">보내세요!</span></div>
  <div class="ro">chu·seok jal bo·nae·se·yo<span>[추석 짤 보내세요]</span></div>
  <div class="es">¡Que pases un lindo Chuseok!</div>
  <div class="desg">
    <div><div class="k" style="color:${AZUL}">추석</div><div class="v">Chuseok</div></div>
    <div><div class="k" style="color:${GOLD_TXT}">잘</div><div class="v">bien</div></div>
    <div><div class="k">보내세요</div><div class="v">que pases<small>de <span class="kr">보내다</span> <b>«pasar (un tiempo)»</b> + <span class="kr">-(으)세요</span>, forma cortés</small></div></div>
  </div>
  <div class="nota push">
    <div class="lbl">¿Cuándo?</div><div class="t">Antes o durante el feriado, a profes, compañeros y conocidos. A amigos cercanos: <b class="kr">추석 잘 보내!</b></div>
    <hr>
    <div class="lbl">¿Ya pasó?</div><div class="t">Pregunta: <b class="kr">추석 잘 보내셨어요?</b> (¿Pasaste un lindo Chuseok?)</div>
  </div>
  ${foot(7)}`;
  return doc(css, body);
}

// ════════════════════════════════════════════════════════════════════════
// 08 · Cierre
// ════════════════════════════════════════════════════════════════════════
function l8() {
  const css = `
  .st { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 74px; line-height: 1.05; letter-spacing: -1.5px; margin: 40px 0 0; flex: none; }
  .st em { font-style: italic; font-weight: 700; color: ${AZUL}; }
  .lede { font-size: 37px; line-height: 1.34; margin: 22px 0 0; flex: none; }
  .motto { margin-top: 40px; padding: 30px 0 28px; border-top: 3px solid ${INK}; border-bottom: 1.5px solid ${INK}; display: flex; align-items: center; justify-content: space-between; gap: 24px; flex: none; }
  .motto .ko { font-family: 'Noto Serif KR', serif; font-weight: 700; font-size: 64px; line-height: 1.3; color: ${NAVY}; white-space: nowrap; }
  .motto .es { font-family: 'Playfair Display', serif; font-style: italic; font-size: 42px; line-height: 1.2; margin-top: 10px; padding-left: 2px; }
  .motto i { display: block; width: 176px; height: 176px; border-radius: 50%; background: ${MOON_BG}; flex: none; box-shadow: 0 0 0 13px rgba(232,184,75,.17), 0 0 0 27px rgba(232,184,75,.07); margin-right: 28px; }
  .sign { display: flex; align-items: center; gap: 24px; margin-top: 40px; flex: none; }
  .sign img { height: 118px; width: auto; }
  .sign .h { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 50px; color: ${AZUL}; line-height: 1; }
  .sign .h small { display: block; font-family: 'IBM Plex Mono', monospace; font-weight: 500; font-size: 24px; color: ${MUTED}; letter-spacing: 1px; margin-top: 12px; }
  .bar { background: ${INK}; color: ${PAPER}; padding: 24px 30px 26px; flex: none; }
  .bar .a { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 35px; line-height: 1.25; }
  .bar .a span { color: ${GOLD2}; }
  .bar .u { font-family: 'IBM Plex Mono', monospace; font-weight: 600; font-size: 30px; letter-spacing: 1px; color: ${GOLD2}; margin-top: 12px; }
  `;
  const body = `
  ${top(8)}
  <div class="st">En Academia Seúl <em>no solo aprendemos coreano.</em></div>
  <p class="lede">Aprendemos las palabras, historias y costumbres que ayudan a entender la cultura detrás del idioma.</p>
  <div class="motto"><div><div class="ko">한국어를 배우고,<br>한국을 알아가요.</div><div class="es">Aprende coreano. Conoce Corea.</div></div><i data-deco></i></div>
  <div class="sign">${sello()}<div class="h">@academiaseul<small>@jaychingu.oficial</small></div></div>
  <div class="bar push"><div class="a">Clases desde la <span>semana del 12 de octubre</span><br>Matrícula hasta el <span>domingo 11</span></div><div class="u">→ academiaseul.com/nivel-1</div></div>
  ${foot(8)}`;
  return doc(css, body);
}

// ─── lista de láminas ───
const LAMINAS = [
  { file: "chuseok_01.png", html: l1() },
  { file: "chuseok_02.png", html: l2() },
  { file: "chuseok_03.png", html: costumbres(3, 0, 1) },
  { file: "chuseok_04.png", html: costumbres(4, 2, 3) },
  { file: "chuseok_05.png", html: costumbres(5, 4, 5) },
  { file: "chuseok_06.png", html: l6() },
  { file: "chuseok_07.png", html: l7() },
  { file: "chuseok_08.png", html: l8() },
];

// ─── control de calidad dentro del navegador (mismo criterio que make_disenos_octubre.js) ───
function qa({ W, H }) {
  const probs = [];
  const cargada = (fam) => [...document.fonts].some((f) => f.family.replace(/["']/g, "") === fam && f.status === "loaded");
  const usadas = new Set();
  for (const el of document.querySelectorAll(".page, .page *")) usadas.add(getComputedStyle(el).fontFamily.split(",")[0].replace(/["']/g, "").trim());
  for (const fam of ["Playfair Display", "IBM Plex Mono", "Source Serif 4", "Noto Sans KR", "Noto Serif KR"])
    if (usadas.has(fam) && !cargada(fam)) probs.push("fuente no cargada: " + fam);
  for (const img of document.images) if (!img.complete || !img.naturalWidth) probs.push("imagen rota");
  const minX = 60, maxX = W - 60, minY = 20, maxY = H - 20; // márgenes de seguridad de 64 px (con 4 px de tolerancia)
  const boxed = (el) => {
    const out = [];
    for (let a = el; a && !a.classList.contains("page"); a = a.parentElement) {
      const cs = getComputedStyle(a);
      if (parseFloat(cs.borderTopWidth) > 0 && parseFloat(cs.borderLeftWidth) > 0 || (cs.backgroundColor !== "rgba(0, 0, 0, 0)" && a.tagName !== "BODY")) out.push(a);
    }
    return out;
  };
  const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n, minFont = 99, minFontTxt = "";
  while ((n = tw.nextNode())) {
    const txt = n.textContent.trim();
    if (!txt || !n.parentElement || n.parentElement.closest("style,[data-deco]")) continue;
    const fs = parseFloat(getComputedStyle(n.parentElement).fontSize);
    if (!n.parentElement.closest(".top,.foot,.lbl,.cal,.n,.save,small") && fs < minFont) { minFont = fs; minFontTxt = txt.slice(0, 30); }
    const range = document.createRange();
    range.selectNodeContents(n);
    const rects = [...range.getClientRects()].filter((r) => r.width > 1);
    for (const r of rects) {
      const where = `[${Math.round(r.left)},${Math.round(r.top)} → ${Math.round(r.right)},${Math.round(r.bottom)}]`;
      if (r.left < minX || r.right > maxX) { probs.push(`se sale del margen lateral: "${txt.slice(0, 40)}" ${where}`); break; }
      if (r.top < minY || r.bottom > maxY) { probs.push(`se sale en vertical: "${txt.slice(0, 40)}" ${where}`); break; }
      const bad = boxed(n.parentElement).find((b) => { const br = b.getBoundingClientRect(); return r.left < br.left - 1 || r.right > br.right + 1 || r.top < br.top - 1 || r.bottom > br.bottom + 1; });
      if (bad) { probs.push(`se sale de su caja (.${bad.className}): "${txt.slice(0, 40)}" ${where}`); break; }
    }
  }
  // elementos anchos (nowrap) que desbordan su contenedor
  for (const el of document.querySelectorAll(".page *")) {
    if (el.closest("[data-deco]") || el.tagName === "svg") continue;
    if (el.scrollWidth > el.clientWidth + 1 && getComputedStyle(el).whiteSpace === "nowrap" && getComputedStyle(el).overflow !== "visible") probs.push(`desborde: .${el.className}`);
  }
  const cont = document.querySelector(".page");
  const kids = [...cont.children];
  for (let i = 1; i < kids.length; i++) {
    const a = kids[i - 1].getBoundingClientRect(), b = kids[i].getBoundingClientRect();
    if (b.top < a.bottom - 1) probs.push(`solape: .${kids[i - 1].className} / .${kids[i].className} (${Math.round(a.bottom - b.top)} px)`);
  }
  // mayor hueco vertical entre bloques consecutivos (para detectar láminas con aire mal repartido)
  let aire = 0;
  for (let i = 1; i < kids.length; i++) aire = Math.max(aire, kids[i].getBoundingClientRect().top - kids[i - 1].getBoundingClientRect().bottom);
  if (aire > 180) probs.push(`hueco vertical grande: ${Math.round(aire)} px`);
  return { probs, aire: Math.round(aire), minFont, minFontTxt };
}

// cuenta píxeles rojos / naranja-rojo en el PNG recién hecho (regla "nunca rojo")
async function contarRojo(src) {
  const img = new Image(); img.src = src; await img.decode();
  const c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
  const x = c.getContext("2d"); x.drawImage(img, 0, 0);
  const d = x.getImageData(0, 0, c.width, c.height).data;
  let n = 0;
  for (let i = 0; i < d.length; i += 4) { const R = d[i], G = d[i + 1], B = d[i + 2]; if (R > 140 && R - G > 70 && R - B > 70 && G < 150) n++; }
  return n;
}

// ─── render ───
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  fs.mkdirSync(HTML_DIR, { recursive: true });
  const filtros = process.argv.slice(2);
  const lista = filtros.length ? LAMINAS.filter((d) => filtros.some((f) => d.file.includes(f))) : LAMINAS;
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, // --disable-lcd-text: sin bordes de color del ClearType
    args: ["--no-sandbox", "--allow-file-access-from-files", "--disable-lcd-text"] });
  const page = await browser.newPage();
  let conProblemas = 0;
  for (const d of lista) {
    const htmlPath = path.join(HTML_DIR, d.file.replace(/\.png$/, ".html"));
    fs.writeFileSync(htmlPath, d.html, "utf8");
    await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
    await page.goto("file:///" + htmlPath.split(path.sep).join("/"), { waitUntil: "networkidle0", timeout: 90000 });
    await page.evaluate(() => document.fonts.ready);
    await new Promise((r) => setTimeout(r, 700));
    const { probs, aire, minFont, minFontTxt } = await page.evaluate(qa, { W, H });
    const png = await page.screenshot({ path: path.join(OUT, d.file), clip: { x: 0, y: 0, width: W, height: H } });
    const rojos = await page.evaluate(contarRojo, "data:image/png;base64," + Buffer.from(png).toString("base64"));
    if (rojos) probs.push(`${rojos} píxeles rojizos (revisa colores)`);
    if (minFont < 26) probs.push(`texto de cuerpo bajo 26 px: ${minFont}px ("${minFontTxt}")`);
    if (probs.length) conProblemas++;
    console.log(`${probs.length ? "✗" : "✓"} ${d.file}  (mayor hueco ${aire} px, cuerpo mínimo ${minFont}px)`);
    probs.forEach((p) => console.log("    · " + p));
  }
  // hojas de revisión (solo en el scratchpad): las 8 a 1/4 y la portada a 1/3 (tamaño aprox. de la grilla)
  if (lista.length === LAMINAS.length) {
    const src = (f) => "file:///" + path.join(OUT, f).split(path.sep).join("/");
    const hoja = `<!doctype html><html><body style="margin:0;background:#ddd;display:grid;grid-template-columns:repeat(4,270px);gap:12px;padding:12px;width:${4 * 270 + 5 * 12}px">
      ${LAMINAS.map((l) => `<img src="${src(l.file)}" style="width:270px;height:337.5px;display:block">`).join("")}</body></html>`;
    const hojaPath = path.join(HTML_DIR, "hoja_contactos.html");
    fs.writeFileSync(hojaPath, hoja, "utf8");
    await page.setViewport({ width: 4 * 270 + 5 * 12, height: 2 * 337.5 + 3 * 12, deviceScaleFactor: 1 });
    await page.goto("file:///" + hojaPath.split(path.sep).join("/"), { waitUntil: "load" });
    await page.screenshot({ path: path.join(HTML_DIR, "chuseok_hoja_contactos.png") });
    const mini = `<!doctype html><html><body style="margin:0"><img src="${src("chuseok_01.png")}" style="width:360px;height:450px;display:block;object-fit:cover"></body></html>`;
    const miniPath = path.join(HTML_DIR, "miniatura.html");
    fs.writeFileSync(miniPath, mini, "utf8");
    await page.setViewport({ width: 360, height: 450, deviceScaleFactor: 1 });
    await page.goto("file:///" + miniPath.split(path.sep).join("/"), { waitUntil: "load" });
    await page.screenshot({ path: path.join(HTML_DIR, "chuseok_01_miniatura.png") });
  }
  await browser.close();
  console.log(`\n${lista.length} láminas → ${OUT}${conProblemas ? `  ·  ${conProblemas} con avisos` : "  ·  sin avisos"}`);
})().catch((e) => { console.error(e); process.exit(1); });
