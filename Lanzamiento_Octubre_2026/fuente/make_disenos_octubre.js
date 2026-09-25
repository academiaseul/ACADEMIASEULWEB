// Diseños de Instagram para el lanzamiento de la cohorte de octubre 2026 · Academia Seúl
// Estilo "boletín universitario" (mismo sistema que Posts_Boletin_Cursos_Octubre_2026/make_catalog_posts.js):
// papel #F6F3EC, tinta #0A0A0F, franja azul #4236F6 a la izquierda, cabecera mono "ACADEMIA SEÚL · …",
// sello del tigre azul, acentos oro. NUNCA rojo.
//
// Feed = 1080×1350 · Historias = 1080×1920 con zonas seguras (nada importante en los 250 px de arriba
// ni en los 340 px de abajo; el contenido vive entre y=262 y y=1568).
//
// Uso:  node make_disenos_octubre.js            → genera y renderiza todo
//       node make_disenos_octubre.js 04 07_reto  → solo los archivos cuyo nombre contenga "04" o "07_reto"
//
// Salida: C:/Users/Chingu/Desktop/ACADEMIASEULWEB/Campana_Assets/instagram/octubre/*.png
// Las imágenes van incrustadas como data URI; las fuentes vienen de Google Fonts (requiere internet).
// Después del render corre un control automático (fuentes cargadas, imágenes, textos fuera de márgenes,
// fuera de zona segura en historias, textos que se salen de sus cajas).

const fs = require("fs");
const os = require("os");
const path = require("path");

const REPO = "C:/Users/Chingu/Desktop/ACADEMIASEULWEB";
const SCRATCH = "C:/Users/Chingu/AppData/Local/Temp/claude/C--Users-Chingu-Desktop-ACADEMIASEULWEB/d4111e1b-5523-44ea-97b2-b1a1d9545b9e/scratchpad";
const OUT = path.join(REPO, "Campana_Assets/instagram/octubre");
const HTML_DIR = fs.existsSync(SCRATCH) ? path.join(SCRATCH, "lanzamiento/html_disenos") : path.join(os.tmpdir(), "as_disenos_octubre");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";

let puppeteer;
try { puppeteer = require("puppeteer-core"); }
catch (e) { puppeteer = require(path.join(SCRATCH, "node_modules/puppeteer-core")); }

// ─── imágenes (data URI) ───
const SELLO_FILE = [process.env.SELLO_PATH, path.join(SCRATCH, "igpost/sello-azul.png"), path.join(__dirname, "sello-azul.png")]
  .filter(Boolean).find((p) => fs.existsSync(p));
if (!SELLO_FILE) console.warn("⚠ No encontré sello-azul.png: los diseños salen sin sello. Define SELLO_PATH.");
const SELLO = SELLO_FILE ? "data:image/png;base64," + fs.readFileSync(SELLO_FILE).toString("base64") : "";
const sello = (cls = "") => (SELLO ? `<img class="${cls}" src="${SELLO}" alt="Sello Academia Seúl">` : `<div class="${cls}"></div>`);

// ─── paleta (sin rojo) ───
const AZUL = "#4236F6", NAVY = "#003478", INK = "#0A0A0F", INK2 = "#1B1C24", PAPER = "#F6F3EC", MUTED = "#5C5F6B";
const GOLD = "#B8962E", GOLD2 = "#E8B84B";

// Las banderas llevan rojo; por la regla "nunca rojo" no se dibujan (en gris se veían como manchas): van solo los nombres de país.
// Cambia a true si Jay las quiere a color.
const BANDERAS_A_COLOR = false;

const W = 1080, FEED_H = 1350, STORY_H = 1920, SAFE_TOP = 250, SAFE_BOTTOM = 340;

const FONTS = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;0,900;1,500;1,700;1,900" +
  "&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400" +
  "&family=IBM+Plex+Mono:wght@400;500;600&family=Noto+Sans+KR:wght@500;700;900&family=Noto+Serif+KR:wght@600;700" +
  "&family=Noto+Color+Emoji&display=swap";

const BASE_CSS = (H) => `
  * { box-sizing: border-box; }
  :root { --bg: ${PAPER}; --fg: ${INK}; --muted: ${MUTED}; --azul: ${AZUL}; --gold: ${GOLD}; --line: rgba(10,10,15,.2); }
  body.dark { --bg: ${INK}; --fg: ${PAPER}; --muted: #B4B7C6; --azul: #8A83FF; --gold: ${GOLD2}; --line: rgba(246,243,236,.22); }
  html, body { margin: 0; background: var(--bg); }
  body { width: ${W}px; height: ${H}px; overflow: hidden; font-family: 'Source Serif 4', Georgia, serif; color: var(--fg);
         -webkit-font-smoothing: antialiased; font-variant-numeric: lining-nums; }
  .page { position: relative; width: ${W}px; height: ${H}px; display: flex; flex-direction: column; }
  .page::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 14px; background: ${AZUL}; }
  .feed .page { padding: 54px 64px 44px; }
  .safe { position: absolute; left: 72px; right: 72px; top: ${SAFE_TOP + 12}px; bottom: ${SAFE_BOTTOM + 12}px; display: flex; flex-direction: column; }
  .mono { font-family: 'IBM Plex Mono', monospace; }
  .kr { font-family: 'Noto Sans KR', sans-serif; }
  .krs { font-family: 'Noto Serif KR', serif; }
  .pf { font-family: 'Playfair Display', Georgia, serif; }
  .flag { font-family: 'Noto Color Emoji', sans-serif; }
  .azul { color: var(--azul); }
  .muted { color: var(--muted); }
  .top { display: flex; justify-content: space-between; align-items: center; padding-bottom: 16px; border-bottom: 3px solid var(--fg); flex: none; }
  .top .brand { font-family: 'IBM Plex Mono', monospace; font-size: 17px; letter-spacing: 4px; text-transform: uppercase; font-weight: 600; white-space: nowrap; }
  .top .brand span { color: var(--azul); }
  .top .brand .nc { text-transform: none; letter-spacing: 2px; }
  .top .brand .ko { font-family: 'Noto Sans KR', sans-serif; font-weight: 700; text-transform: none; letter-spacing: 2px; }
  .top img, .top .seal-ph { height: 66px; width: auto; }
  .story .top .brand { font-size: 20px; letter-spacing: 4px; }
  .story .top img { height: 72px; }
  body.dark .top img, body.dark .sign img { filter: brightness(0) invert(1); }
  .foot { margin-top: auto; padding-top: 16px; border-top: 3px solid var(--fg); display: flex; justify-content: space-between; align-items: center; gap: 24px; flex: none; }
  .foot .cta { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 24px; line-height: 1.3; }
  .foot .cta span { color: var(--azul); }
  .foot .handles { font-family: 'IBM Plex Mono', monospace; font-size: 16px; color: var(--muted); letter-spacing: 1px; text-align: right; line-height: 1.4; white-space: nowrap; }
  .tag { font-family: 'IBM Plex Mono', monospace; font-size: 15px; letter-spacing: 1.5px; text-transform: uppercase; padding: 6px 11px; border: 2px solid var(--fg); font-weight: 600; white-space: nowrap; }
  .tag.fill { background: var(--fg); color: var(--bg); }
  .tag.blue { border-color: ${AZUL}; color: ${AZUL}; }
  .tag.gold { border-color: ${GOLD}; color: ${INK}; background: ${GOLD2}; }
`;

// fit: el render ajusta la variable --s (escala tipográfica) hasta que el último bloque quede a ~70 px del anterior
function doc({ story, css = "", body, dark = false, fit = false }) {
  const H = story ? STORY_H : FEED_H;
  return `<!doctype html><html lang="es"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<style>${BASE_CSS(H)}${css}</style></head>
<body class="${story ? "story" : "feed"}${dark ? " dark" : ""}"><div class="page">${story ? `<div class="safe"${fit ? " data-fit" : ""}>${body}</div>` : body}</div></body></html>`;
}

// corre dentro del navegador: sube o baja --s en pasos de 0,02 (entre 0,85 y 1,3)
function ajustar() {
  const box = document.querySelector("[data-fit]");
  if (!box) return null;
  const kids = [...box.children];
  const last = kids[kids.length - 1], prev = kids[kids.length - 2];
  const gap = () => last.getBoundingClientRect().top - prev.getBoundingClientRect().bottom;
  const wide = () => [...box.querySelectorAll("*")].some((e) => e.scrollWidth > e.clientWidth + 1 && getComputedStyle(e).whiteSpace === "nowrap")
    || [...box.querySelectorAll("*")].some((e) => e.getBoundingClientRect().right > box.getBoundingClientRect().right + 1);
  let s = 1;
  const set = (v) => { s = Math.round(v * 100) / 100; box.style.setProperty("--s", s); };
  while (gap() > 80 && s < 1.3) { set(s + 0.02); if (wide()) { set(s - 0.02); break; } }
  while ((gap() < 40 || wide()) && s > 0.85) set(s - 0.02);
  return { s, gap: Math.round(gap()) };
}

const top = (mid, right, withSeal = true) =>
  `<div class="top"><div class="brand">Academia Seúl · <span>${mid}</span>${right ? " · " + right : ""}</div>${withSeal ? sello() : ""}</div>`;
const foot = (cta) => `<div class="foot"><div class="cta">${cta}</div><div class="handles">@academiaseul<br>@jaychingu.oficial</div></div>`;

// ─── datos de la cohorte (lib/nivel1.ts · hora Chile) ───
const CLASES = [
  { dia: "Lun", hora: "18:00", curso: "Coreano para Niños", nivel: "8–15 años", profe: "Jay y Abby", nota: "desde el lun 19" },
  { dia: "Mar", hora: "20:00", curso: "Básico 1", nivel: "A1.1", profe: "Kiran" },
  { dia: "Mar", hora: "21:00", curso: "Conversacional 1", nivel: "A2.1", profe: "Abby" },
  { dia: "Mié", hora: "21:00", curso: "Básico 2", nivel: "A1.2", profe: "Jay" },
  { dia: "Jue", hora: "20:00", curso: "Básico 1", nivel: "A1.1", profe: "Kiran" },
  { dia: "Jue", hora: "21:00", curso: "TOPIK II", nivel: "B1+", profe: "Jay" },
];

// ════════════════════════════════════════════════════════════════════════
// 00 · Chuseok (historia, vie 25 sep) — sobrio, cálido, sin vender
// ════════════════════════════════════════════════════════════════════════
function chuseok() {
  const css = `
  .safe { align-items: center; text-align: center; }
  .top { align-self: stretch; }
  .moon-wrap { position: relative; width: 470px; height: 470px; margin-top: 62px; display: flex; align-items: center; justify-content: center; flex: none; }
  .moon { position: absolute; inset: 0; border-radius: 50%;
          background: radial-gradient(circle at 36% 32%, #F7E1A6 0%, ${GOLD2} 55%, #D9A73A 100%);
          box-shadow: 0 0 0 20px rgba(232,184,75,.17), 0 0 0 44px rgba(232,184,75,.08); }
  .ch { position: relative; font-family: 'Noto Sans KR', sans-serif; font-weight: 900; font-size: 196px; line-height: 1; color: ${INK}; letter-spacing: -2px; margin-top: -8px; }
  .rom { font-family: 'Playfair Display', serif; font-style: italic; font-weight: 500; font-size: 84px; line-height: 1; margin-top: 78px; }
  .orn { display: flex; align-items: center; gap: 18px; margin: 34px 0 30px; }
  .orn i { display: block; width: 110px; height: 2px; background: ${GOLD}; }
  .orn b { display: block; width: 13px; height: 13px; background: ${GOLD}; transform: rotate(45deg); }
  .lede { font-size: 46px; line-height: 1.3; margin: 0; max-width: 860px; text-wrap: balance; }
  .greet { margin-top: 58px; font-family: 'Noto Sans KR', sans-serif; font-weight: 700; font-size: 60px; line-height: 1.3; color: ${AZUL}; }
  .greet-es { font-family: 'Playfair Display', serif; font-style: italic; font-size: 42px; color: ${MUTED}; margin-top: 6px; }
  .sign { margin-top: auto; display: flex; align-items: center; gap: 16px; }
  .sign img { height: 78px; width: auto; }
  .sign div { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 38px; }
  `;
  const body = `
  ${top("Chuseok · <span class='ko'>추석</span>", "2026", false)}
  <div class="moon-wrap"><div class="moon" data-deco></div><div class="ch">추석</div></div>
  <div class="rom">Chuseok</div>
  <div class="orn" data-deco><i></i><b></b><i></i></div>
  <p class="lede">Hoy Corea celebra la cosecha y vuelve a casa con su familia.</p>
  <div class="greet">추석 잘 보내세요</div>
  <div class="greet-es">que pases un lindo Chuseok</div>
  <div class="sign">${sello()}<div>Academia Seúl</div></div>`;
  return doc({ story: true, css, body });
}

// ════════════════════════════════════════════════════════════════════════
// 01 · Reto #LeoCoreanoEn7Días (feed, lun 28 sep)
// ════════════════════════════════════════════════════════════════════════
const RETO = [
  { d: 1, fecha: "lun 28 sep", tarea: "Las vocales", det: "pestaña Alfabeto · 21 vocales con audio", app: "Lector" },
  { d: 2, fecha: "mar 29 sep", tarea: "Consonantes + tu primera palabra: <span class='kr'>우유</span>", det: "consonantes en el Lector · <span class='kr'>우유</span> en Dubu (Bukchon, nivel 5)", app: "Lector + Dubu" },
  { d: 3, fecha: "mié 30 sep", tarea: "Dubu: barrios 1 y 2", det: "Bukchon e Insadong", app: "Dubu" },
  { d: 4, fecha: "jue 1 oct", tarea: "Practicar", det: "vocales y consonantes", app: "Lector" },
  { d: 5, fecha: "vie 2 oct", tarea: "Dubu: barrios 3 y 4", det: "Hongdae y Gwangjang", app: "Dubu" },
  { d: 6, fecha: "sáb 3 oct", tarea: "Clase en vivo · 20:00 Chile", det: "«Lee tu nombre en coreano»", app: "En vivo", live: true },
  { d: 7, fecha: "dom 4 oct", tarea: "La prueba", det: "Contrarreloj (Lector) + Tu oído (Dubu)", app: "Lector + Dubu" },
];

function retoFeed() {
  const css = `
  .ttl { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 88px; line-height: 1; letter-spacing: -2px; margin: 30px 0 0; white-space: nowrap; }
  .ttl em { font-style: normal; color: ${AZUL}; }
  .sub { display: flex; gap: 12px; align-items: center; margin-top: 18px; flex-wrap: nowrap; }
  .sub .t { font-family: 'Playfair Display', serif; font-style: italic; font-size: 30px; color: ${MUTED}; white-space: nowrap; }
  .days { margin-top: 26px; border-top: 3px solid ${INK}; }
  .days > div { display: grid; grid-template-columns: 76px 128px 1fr auto; column-gap: 16px; align-items: center; padding: 14px 0; border-bottom: 1px solid rgba(10,10,15,.2); }
  .days .n { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 36px; color: ${AZUL}; line-height: 1; }
  .days .f { font-family: 'IBM Plex Mono', monospace; font-size: 18px; font-weight: 600; letter-spacing: .5px; white-space: nowrap; }
  .days .t { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 27px; line-height: 1.15; }
  .days .t .kr, .days .x .kr { font-weight: 700; color: ${AZUL}; }
  .days .x { font-size: 19px; color: ${MUTED}; margin-top: 4px; line-height: 1.25; }
  .days .live .n { color: ${INK}; }
  .prize { margin-top: 26px; background: ${INK}; color: ${PAPER}; padding: 24px 30px; display: flex; justify-content: space-between; align-items: center; gap: 20px; }
  .prize .a { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 36px; line-height: 1.1; }
  .prize .a span { color: ${GOLD2}; }
  .prize .b { font-family: 'IBM Plex Mono', monospace; font-size: 17px; letter-spacing: 1px; text-align: right; line-height: 1.45; color: #D8DCF5; white-space: nowrap; }
  .sube { margin-top: 24px; font-size: 27px; line-height: 1.3; display: flex; align-items: center; gap: 14px; }
  .sube b { color: ${AZUL}; }
  .sube .ico { flex: none; width: 34px; height: 34px; border: 2.5px solid ${INK}; border-radius: 9px; position: relative; }
  .sube .ico::after { content: ""; position: absolute; width: 12px; height: 12px; border: 2.5px solid ${INK}; border-radius: 50%; left: 50%; top: 50%; transform: translate(-50%,-50%); }
  .fine { font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: ${MUTED}; margin-top: 10px; letter-spacing: .3px; }
  `;
  const rows = RETO.map((r) => `<div class="${r.live ? "live" : ""}"><div class="n">D${r.d}</div><div class="f">${r.fecha}</div>
    <div><div class="t">${r.tarea}</div><div class="x">${r.det}</div></div>
    <div class="tag ${r.live ? "fill" : r.app === "Dubu" ? "blue" : ""}">${r.app}</div></div>`).join("");
  const body = `
  ${top("Reto gratis", "Sep–Oct 2026")}
  <h1 class="ttl">#LeoCoreano<em>En7Días</em></h1>
  <div class="sub"><span class="t">10 minutos al día · lun 28 de septiembre → dom 4 de octubre</span><span class="tag fill">gratis</span></div>
  <div class="days">${rows}</div>
  <div class="prize"><div class="a">Premio: <span>1 cupo gratis</span><br>en Básico 1</div><div class="b">se anuncia el<br>lun 5 de octubre</div></div>
  <div class="sube"><span class="ico" data-deco></span><span>Sube tu captura cada día y etiqueta a <b>@academiaseul</b></span></div>
  ${foot("Lector y Dubu gratis en <span>academiaseul.com</span>")}
  <div class="fine">Reto de Academia Seúl; no está patrocinado ni administrado por Instagram.</div>`;
  return doc({ story: false, css, body });
}

// ════════════════════════════════════════════════════════════════════════
// 07 · Historias del reto, día 1 a 7
// ════════════════════════════════════════════════════════════════════════
const LECTOR = ["Lector de Hangul", "academiaseul.com/lector-coreano"];
const DUBU = ["Dubu · 두부", "academiaseul.com/dubu"];
const DIAS = [
  { d: 1, fecha: "lunes 28 de septiembre", tarea: "Las vocales", kr: "ㅏ ㅓ ㅗ ㅜ ㅡ ㅣ", krSize: 92,
    det: "Escucha las 21 vocales en la pestaña <b>Alfabeto</b> y repítelas en voz alta.", rutas: [LECTOR] },
  { d: 2, fecha: "martes 29 de septiembre", tarea: "Consonantes + tu primera palabra", kr: "우유", krSize: 120, krGloss: "leche",
    det: "Recorre las 19 consonantes en el Lector y arma <b class='kr'>우유</b> en Dubu: <b>Bukchon, nivel 5</b>.", rutas: [["Lector", LECTOR[1]], ["Dubu", DUBU[1]]] },
  { d: 3, fecha: "miércoles 30 de septiembre", tarea: "Dubu: barrios 1 y 2", kr: "북촌 · 인사동", krSize: 92,
    det: "Bukchon e Insadong · 10 niveles: consonante + vocal → palabra.", rutas: [DUBU] },
  { d: 4, fecha: "jueves 1 de octubre", tarea: "Practicar", kr: "가 나 다 라", krSize: 92,
    det: "Entra a la pestaña <b>Practicar</b> y juega una ronda de vocales y otra de consonantes.", rutas: [LECTOR] },
  { d: 5, fecha: "viernes 2 de octubre", tarea: "Dubu: barrios 3 y 4", kr: "홍대 · 광장", krSize: 92,
    det: "Hongdae y Gwangjang · 10 niveles más: ya llevas 4 de 6 barrios.", rutas: [DUBU] },
  { d: 6, fecha: "sábado 3 de octubre", tarea: "Clase en vivo: «Lee tu nombre en coreano»", kr: "이름", krSize: 110, krGloss: "nombre",
    det: "Escribe tu nombre en los comentarios y lo escribo en vivo.", live: true, lbl: "Hoy · clase en vivo · 30 min" },
  { d: 7, fecha: "domingo 4 de octubre", tarea: "La prueba",
    det: "<b>Contrarreloj</b> en el Lector + <b>Tu oído</b> en Dubu. Tienes hasta las 23:59 (hora Chile).", rutas: [["Lector", LECTOR[1]], ["Dubu", DUBU[1]]], premio: true },
];

function retoStory(x) {
  // --s = escala tipográfica; el render la ajusta para que el bloque llene la zona segura sin huecos grandes
  const css = `
  .safe { --s: 1; }
  .dia { display: flex; align-items: flex-end; justify-content: space-between; margin-top: calc(var(--s) * 30px); flex: none; }
  .dia .n { font-family: "Playfair Display", serif; font-weight: 900; font-size: calc(var(--s) * 176px); line-height: .8; letter-spacing: -4px; white-space: nowrap; }
  .dia .n em { font-style: normal; color: ${AZUL}; }
  .dia .n small { font-size: calc(var(--s) * 96px); color: ${MUTED}; letter-spacing: -1px; }
  .dia .f { font-family: "IBM Plex Mono", monospace; font-size: 21px; letter-spacing: 1px; text-align: right; line-height: 1.45; font-weight: 600; padding-bottom: 6px; }
  .dia .f span { color: ${MUTED}; font-weight: 500; }
  .hash { font-family: "Playfair Display", serif; font-style: italic; font-weight: 700; font-size: calc(min(var(--s), 1.15) * 54px); color: ${AZUL}; margin-top: calc(var(--s) * 20px); line-height: 1.1; }
  .prog { display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px; margin-top: calc(var(--s) * 22px); flex: none; }
  .prog i { display: block; height: 14px; border: 2px solid ${INK}; }
  .prog i.on { background: ${AZUL}; border-color: ${AZUL}; }
  .prog i.hoy { background: ${INK}; border-color: ${INK}; }
  .tarea { margin-top: calc(var(--s) * 32px); border: 3px solid ${INK}; padding: calc(var(--s) * 28px) 36px calc(var(--s) * 32px); background: #FFFDF8; flex: none; }
  .tarea .lbl { font-family: "IBM Plex Mono", monospace; font-size: 20px; letter-spacing: 3px; text-transform: uppercase; color: ${AZUL}; font-weight: 600; }
  .tarea h1 { font-family: "Playfair Display", serif; font-weight: 900; font-size: calc(var(--s) * 66px); line-height: 1.04; margin: calc(var(--s) * 12px) 0 0; text-wrap: balance; }
  .tarea .krbig { display: flex; align-items: baseline; gap: 22px; margin-top: calc(var(--s) * 14px); }
  .tarea .krbig .k { font-family: "Noto Sans KR", sans-serif; font-weight: 900; color: ${AZUL}; font-size: calc(var(--s) * var(--kr)); line-height: 1.12; white-space: nowrap; }
  .tarea .krbig .g { font-family: "Playfair Display", serif; font-style: italic; font-size: calc(var(--s) * 36px); color: ${MUTED}; }
  .tarea p { font-size: calc(min(var(--s), 1.2) * 34px); line-height: 1.34; margin: calc(var(--s) * 14px) 0 0; text-wrap: balance; }
  .tarea p b.kr { color: ${AZUL}; }
  .premio { margin-top: calc(var(--s) * 18px); padding-top: 16px; border-top: 2px dashed rgba(10,10,15,.35); font-family: "Playfair Display", serif; font-weight: 700; font-size: calc(min(var(--s), 1.2) * 32px); line-height: 1.2; }
  .premio span { color: ${AZUL}; }
  .premio small { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 19px; color: ${MUTED}; margin-top: 6px; letter-spacing: .5px; }
  .rutas { margin-top: calc(var(--s) * 26px); flex: none; }
  .ruta { display: flex; align-items: baseline; gap: 18px; padding: calc(var(--s) * 12px) 0; border-top: 2px solid ${INK}; }
  .ruta:last-child { border-bottom: 2px solid ${INK}; }
  .ruta .k { font-family: "IBM Plex Mono", monospace; font-size: 19px; letter-spacing: 2px; text-transform: uppercase; color: ${MUTED}; width: 120px; flex: none; font-weight: 600; }
  .ruta .v { font-family: "Playfair Display", serif; font-weight: 700; font-size: 42px; color: ${AZUL}; white-space: nowrap; }
  .vivo { margin-top: calc(var(--s) * 26px); display: flex; align-items: center; gap: 24px; background: ${AZUL}; color: ${PAPER}; padding: calc(var(--s) * 22px) 30px; flex: none; }
  .vivo .dot { width: 26px; height: 26px; border-radius: 50%; background: ${PAPER}; box-shadow: 0 0 0 8px rgba(246,243,236,.3); flex: none; }
  .vivo .t { font-family: "Playfair Display", serif; font-weight: 900; font-size: calc(min(var(--s), 1.25) * 60px); line-height: 1; white-space: nowrap; }
  .vivo .t small { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 20px; letter-spacing: 2px; margin-top: 10px; text-transform: uppercase; }
  .cta { margin-top: auto; background: ${INK}; color: ${PAPER}; padding: 26px 32px; display: flex; align-items: center; gap: 24px; flex: none; }
  .cta .t { font-family: "Playfair Display", serif; font-weight: 700; font-size: 42px; line-height: 1.15; }
  .cta .t span { color: ${GOLD2}; }
  `;
  const prog = Array.from({ length: 7 }, (_, i) => `<i class="${i + 1 < x.d ? "on" : i + 1 === x.d ? "hoy" : ""}"></i>`).join("");
  const krbig = x.kr ? `<div class="krbig"><span class="k" style="--kr:${x.krSize}px">${x.kr}</span>${x.krGloss ? `<span class="g">${x.krGloss}</span>` : ""}</div>` : "";
  const premio = x.premio ? `<div class="premio">Premio: <span>1 cupo gratis en Básico 1</span><small>se anuncia el lun 5 de octubre</small></div>` : "";
  const rutas = x.live
    ? `<div class="vivo"><div class="dot" data-deco></div><div class="t">Hoy 20:00 en vivo aquí<small>hora Chile · @academiaseul</small></div></div>`
    : `<div class="rutas">${x.rutas.map((r) => `<div class="ruta"><div class="k">${r[0].split(" ")[0]}</div><div class="v">${r[1]}</div></div>`).join("")}</div>`;
  const body = `
  ${top("Reto gratis", "28 sep → 4 oct")}
  <div class="dia"><div class="n">Día <em>${x.d}</em><small>/7</small></div><div class="f">${x.fecha.split(" ")[0]}<br><span>${x.fecha.split(" ").slice(1).join(" ")}</span></div></div>
  <div class="hash">#LeoCoreanoEn7Días</div>
  <div class="prog" data-deco>${prog}</div>
  <div class="tarea"><div class="lbl">${x.lbl || "La tarea de hoy · 10 min"}</div><h1>${x.tarea}</h1>${krbig}<p>${x.det}</p>${premio}</div>
  ${rutas}
  <div class="cta"><div class="t">Sube tu captura y etiqueta <span>@academiaseul</span></div></div>`;
  return doc({ story: true, css, body, fit: true });
}

// ════════════════════════════════════════════════════════════════════════
// 02 · Conoce a tus profes (feed, vie 2 oct) — solo tipografía y hangul
// ════════════════════════════════════════════════════════════════════════
function profes() {
  const P = [
    { ko: "기란", ro: "Kiran", cod: "KOR 101", curso: "Básico 1 <span class='lv'>(A1.1)</span>", hora: "martes o jueves 20:00 Chile", bio: "coreana criada en Argentina, bilingüe" },
    { ko: "홍미영", ro: "Abby", cod: "KOR 201 · 050", curso: "Conversacional 1 <span class='lv'>(A2.1)</span>", hora: "martes 21:00 Chile <span>(miércoles 9:00 en Seúl)</span>", extra: "<span class='y'>y Niños con Jay</span> <span class='lv'>(8–15)</span>", extraHora: "lunes 18:00 Chile", bio: "pedagoga, enseña desde Corea" },
    { ko: "김재희", ro: "Jay", cod: "KOR 102 · 301", curso: "Básico 2 <span class='lv'>(A1.2)</span> y TOPIK II", hora: "miércoles y jueves 21:00 Chile", bio: "nació en Seúl, creció en Chile" },
  ];
  const css = `
  .ttl { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 94px; line-height: 1; letter-spacing: -2px; margin: 26px 0 0; white-space: nowrap; }
  .ttl em { font-style: italic; font-weight: 700; color: ${AZUL}; }
  .lead { font-family: 'Playfair Display', serif; font-style: italic; font-size: 30px; color: ${MUTED}; margin-top: 14px; }
  .cards { margin-top: 26px; display: flex; flex-direction: column; gap: 20px; }
  .card { display: grid; grid-template-columns: 250px 1fr; border: 2.5px solid ${INK}; background: #FFFDF8; }
  .card .mono-g { border-right: 2.5px solid ${INK}; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px 10px; background: ${PAPER}; }
  .card .mono-g .k { font-family: 'Noto Sans KR', sans-serif; font-weight: 900; font-size: 66px; line-height: 1.1; color: ${AZUL}; white-space: nowrap; letter-spacing: -1px; }
  .card .mono-g .r { font-family: 'IBM Plex Mono', monospace; font-size: 16px; letter-spacing: 2px; white-space: nowrap; text-transform: uppercase; color: ${MUTED}; margin-top: 8px; font-weight: 600; }
  .card .info { padding: 24px 32px 24px; }
  .card .nm { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 56px; line-height: 1; }
  .card .nm .kr { font-weight: 700; font-size: 32px; color: ${MUTED}; margin-left: 10px; letter-spacing: 0; }
  .card .cu { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 30px; margin-top: 14px; line-height: 1.2; }
  .card .cu .lv { font-family: 'IBM Plex Mono', monospace; font-size: 20px; font-weight: 600; color: ${AZUL}; }
  .card .cu .y { font-style: italic; font-weight: 500; color: ${INK}; }
  .card .ho { font-family: 'IBM Plex Mono', monospace; font-size: 19px; font-weight: 600; color: ${AZUL}; margin-top: 12px; letter-spacing: .3px; }
  .card .ho span { color: ${MUTED}; font-weight: 500; }
  .card .cu2 { margin-top: 10px; font-size: 27px; }
  .card .bio { font-size: 24px; font-style: italic; color: ${MUTED}; margin-top: 10px; }
  `;
  const cards = P.map((p) => `<div class="card"><div class="mono-g"><div class="k">${p.ko}</div><div class="r">${p.cod}</div></div>
    <div class="info"><div class="nm">${p.ro}<span class="kr">· ${p.ko}</span></div><div class="cu">${p.curso}</div><div class="ho">${p.hora}</div>${p.extra ? `<div class="cu cu2">${p.extra}</div><div class="ho">${p.extraHora}</div>` : ""}<div class="bio">${p.bio}</div></div></div>`).join("");
  const body = `
  ${top("Equipo docente", "Octubre 2026")}
  <h1 class="ttl">Tus profes <em>de octubre</em></h1>
  <div class="lead">Clases en vivo por Zoom · 8 semanas · 60 min por sesión</div>
  <div class="cards">${cards}</div>
  ${foot("Clases desde la <span>semana del 12 de octubre</span><br>→ academiaseul.com/nivel-1")}`;
  return doc({ story: false, css, body });
}

// ════════════════════════════════════════════════════════════════════════
// 03 · En vivo "Lee tu nombre en coreano" (historia, sáb 3 oct · 개천절)
// ════════════════════════════════════════════════════════════════════════
function vivo() {
  const TZ = [
    ["🇲🇽", "México", "17:00", ""],
    ["🇨🇴🇵🇪", "Colombia · Perú", "18:00", ""],
    ["🇦🇷", "Argentina", "20:00", ""],
    ["🇺🇸", "EE.UU. (Este)", "19:00", ""],
    ["🇪🇸", "España", "01:00", "(dom)"],
  ];
  const css = `
  .row1 { display: flex; align-items: center; justify-content: space-between; margin-top: 34px; flex: none; }
  .live { display: inline-flex; align-items: center; gap: 18px; background: ${AZUL}; color: ${PAPER}; padding: 14px 26px 14px 22px; font-family: 'IBM Plex Mono', monospace; font-weight: 600; font-size: 34px; letter-spacing: 8px; }
  .live i { width: 22px; height: 22px; border-radius: 50%; background: ${PAPER}; box-shadow: 0 0 0 7px rgba(246,243,236,.3); }
  .gcj { text-align: right; }
  .gcj .k { font-family: 'Noto Sans KR', sans-serif; font-weight: 900; font-size: 44px; color: ${GOLD}; line-height: 1.1; }
  .gcj .e { font-family: 'IBM Plex Mono', monospace; font-size: 17px; letter-spacing: 1px; color: ${MUTED}; line-height: 1.35; }
  .ttl { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 116px; line-height: .98; letter-spacing: -3px; margin: 30px 0 0; }
  .ttl em { font-style: italic; font-weight: 700; color: ${AZUL}; }
  .when { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 46px; margin-top: 22px; line-height: 1.15; }
  .when span { color: ${AZUL}; }
  .tz { margin-top: 26px; border-top: 3px solid ${INK}; flex: none; }
  .tz > div { display: grid; grid-template-columns: ${BANDERAS_A_COLOR ? "150px " : ""}1fr auto; align-items: center; padding: 11px 0; border-bottom: 1px solid rgba(10,10,15,.2); }
  .tz .fl { font-size: 42px; line-height: 1.2; white-space: nowrap; letter-spacing: 6px; ${BANDERAS_A_COLOR ? "" : "filter: grayscale(1) contrast(1.08); opacity: .9;"} }
  .tz .c { font-family: 'IBM Plex Mono', monospace; font-size: ${BANDERAS_A_COLOR ? 22 : 28}px; letter-spacing: 1.5px; text-transform: uppercase; font-weight: 600; }
  .tz .h { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 46px; line-height: 1.1; }
  .tz .h small { font-family: 'IBM Plex Mono', monospace; font-weight: 500; font-size: 20px; color: ${MUTED}; margin-left: 8px; }
  .com { margin-top: 28px; border: 3px solid ${INK}; background: #FFFDF8; padding: 24px 30px; flex: none; }
  .com .t { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 40px; line-height: 1.18; text-wrap: balance; }
  .com .ej { margin-top: 12px; display: flex; align-items: baseline; gap: 16px; font-family: 'IBM Plex Mono', monospace; font-size: 20px; color: ${MUTED}; letter-spacing: 1px; }
  .com .ej b { font-family: 'Playfair Display', serif; font-size: 34px; color: ${INK}; letter-spacing: 0; }
  .com .ej .kr { font-size: 36px; font-weight: 900; color: ${AZUL}; letter-spacing: 0; }
  .handle { margin-top: auto; display: flex; align-items: center; justify-content: space-between; border-top: 3px solid ${INK}; padding-top: 16px; flex: none; }
  .handle .h { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 54px; color: ${AZUL}; }
  .handle img { height: 72px; width: auto; }
  `;
  const body = `
  ${top("Clase gratis", "Sábado 3 de octubre", false)}
  <div class="row1"><div class="live"><i data-deco></i>EN VIVO</div><div class="gcj"><div class="k">개천절</div><div class="e">3 de octubre<br>día de la fundación de Corea</div></div></div>
  <h1 class="ttl">Lee tu nombre<br>en <em>coreano</em></h1>
  <div class="when">sábado 3 de octubre · <span>20:00 Chile</span></div>
  <div class="tz">${TZ.map((t) => `<div>${BANDERAS_A_COLOR ? `<div class="fl flag">${t[0]}</div>` : ""}<div class="c">${t[1]}</div><div class="h">${t[2]}${t[3] ? `<small>${t[3]}</small>` : ""}</div></div>`).join("")}</div>
  <div class="com"><div class="t">Escribe tu nombre en los comentarios y lo escribo en vivo</div><div class="ej">ej.: <b>María</b> → <span class="kr">마리아</span></div></div>
  <div class="handle"><div class="h">@academiaseul</div>${sello()}</div>`;
  return doc({ story: true, css, body });
}

// ════════════════════════════════════════════════════════════════════════
// 04 · 한글날 (feed, vie 9 oct)
// ════════════════════════════════════════════════════════════════════════
function hangeulnal() {
  const css = `
  .kick { display: flex; align-items: baseline; gap: 16px; margin-top: 36px; font-family: 'Playfair Display', serif; font-weight: 700; font-size: 38px; line-height: 1.1; white-space: nowrap; }
  .kick .kr { color: ${AZUL}; font-weight: 900; font-size: 44px; }
  .kick .d { color: ${MUTED}; font-style: italic; font-weight: 500; }
  .big { display: flex; align-items: center; gap: 34px; margin-top: 20px; }
  .big .n { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 340px; line-height: .86; letter-spacing: -8px; color: ${INK}; }
  .big .s { display: flex; flex-direction: column; gap: 18px; }
  .big .s .a { font-family: 'Playfair Display', serif; font-weight: 700; font-style: italic; font-size: 104px; line-height: .9; color: ${AZUL}; }
  .big .s .y { font-family: 'IBM Plex Mono', monospace; font-size: 30px; font-weight: 600; letter-spacing: 2px; white-space: nowrap; }
  .big .s .y span { color: ${MUTED}; font-weight: 500; }
  .jamo { display: flex; justify-content: space-between; margin-top: 36px; padding: 14px 0; border-top: 1.5px solid ${INK}; }
  .jamo span { font-family: 'Noto Sans KR', sans-serif; font-weight: 700; font-size: 44px; line-height: 1.2; color: ${AZUL}; opacity: .55; }
  .quote { margin-top: 0; border-top: 3px solid ${INK}; border-bottom: 1.5px solid ${INK}; padding: 36px 0 30px; position: relative; }
  .quote .qm { position: absolute; left: -6px; top: -4px; font-family: 'Playfair Display', serif; font-weight: 900; font-size: 150px; line-height: 1; color: ${GOLD2}; }
  .quote .ko { font-family: 'Noto Serif KR', serif; font-weight: 700; font-size: 39px; line-height: 1.55; padding-left: 70px; word-break: keep-all; }
  .quote .es { font-family: 'Playfair Display', serif; font-style: italic; font-size: 33px; line-height: 1.35; color: ${INK}; margin-top: 16px; padding-left: 70px; }
  .quote .src { font-family: 'IBM Plex Mono', monospace; font-size: 17px; letter-spacing: 1px; color: ${MUTED}; margin-top: 14px; padding-left: 70px; }
  .try { margin-top: 36px; background: ${INK}; color: ${PAPER}; padding: 30px 32px; display: flex; align-items: center; justify-content: space-between; gap: 18px; }
  .try .a { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 33px; line-height: 1.22; }
  .try .a span { color: ${GOLD2}; }
  .try .b { font-family: 'Noto Sans KR', sans-serif; font-weight: 900; font-size: 56px; color: ${GOLD2}; white-space: nowrap; }
  `;
  const body = `
  ${top("<span class='ko'>한글날</span> · Día del Hangul", "9 de octubre 2026")}
  <div class="kick"><span>9 de octubre</span><span class="kr">한글날</span><span class="d">Día del Hangul</span></div>
  <div class="big"><div class="n">580</div><div class="s"><div class="a">años</div><div class="y">1446 <span>→</span> 2026</div></div></div>
  <div class="jamo" data-deco>${"ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ".split("").map((j) => `<span>${j}</span>`).join("")}</div>
  <div class="quote"><div class="qm" data-deco>“</div>
    <div class="ko">슬기로운 사람은 아침나절이 되기 전에 깨치고,<br>어리석은 사람도 열흘이면 배울 수 있다.</div>
    <div class="es">Un sabio lo aprende antes de que termine la mañana; incluso el más lento, en diez días.</div>
    <div class="src">— Hunminjeongeum Haerye (1446), postfacio de Jeong In-ji</div></div>
  <div class="try"><div class="a">Pruébalo tú: <span>Dubu</span> y el <span>Lector de Hangul</span>,<br>gratis en academiaseul.com</div><div class="b">가나다</div></div>
  ${foot("Básico 1 desde el <span>martes 13</span> · matrícula hasta el <span>domingo 11</span>")}`;
  return doc({ story: false, css, body });
}

// ════════════════════════════════════════════════════════════════════════
// 05 · Últimos días (historia, lun 5 → sáb 10) y 05b · Hoy cierra (dom 11)
// ════════════════════════════════════════════════════════════════════════
const clasesCSS = `
  .cl { margin-top: 26px; border-top: 3px solid var(--fg); flex: none; }
  .cl > div { display: grid; grid-template-columns: 196px 1fr auto; column-gap: 18px; align-items: center; padding: 14px 0; border-bottom: 1px solid var(--line); }
  .cl .dh { font-family: 'IBM Plex Mono', monospace; font-size: 25px; font-weight: 600; letter-spacing: 1px; white-space: nowrap; }
  .cl .dh span { color: var(--azul); }
  .cl .c { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 33px; line-height: 1.1; }
  .cl .c small { font-family: 'IBM Plex Mono', monospace; font-weight: 500; font-size: 18px; color: var(--muted); margin-left: 6px; letter-spacing: .5px; }
  .cl .c .nt { display: block; font-family: 'IBM Plex Mono', monospace; font-weight: 500; font-size: 17px; color: var(--muted); margin: 4px 0 0; letter-spacing: .5px; }
  .cl .p { font-size: 25px; font-style: italic; color: var(--muted); text-align: right; white-space: nowrap; }
  .cl .hc { font-family: 'IBM Plex Mono', monospace; font-size: 16px; color: var(--muted); letter-spacing: 2px; text-transform: uppercase; padding: 8px 0 0; border: 0; display: block; }
`;
const clasesHTML = () => `<div class="cl">${CLASES.map((c) => `<div><div class="dh">${c.dia} <span>${c.hora}</span></div>
  <div class="c">${c.curso}<small>${c.nivel}</small>${c.nota ? `<span class="nt">${c.nota}</span>` : ""}</div><div class="p">${c.profe}</div></div>`).join("")}
  <div class="hc">hora Chile (UTC−3) · 8 semanas · 60 min · certificado incluido</div></div>`;

function cierre() {
  const css = clasesCSS + `
  .ttl { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 150px; line-height: 1.04; letter-spacing: -4px; margin: 56px 0 0; }
  .ttl em { font-style: italic; color: ${AZUL}; }
  .when { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 44px; line-height: 1.2; margin-top: 26px; }
  .when .nw { white-space: nowrap; }
  .when span { color: ${AZUL}; }
  .when small { font-family: 'IBM Plex Mono', monospace; font-weight: 500; font-size: 22px; color: ${MUTED}; letter-spacing: 1px; }
  .fee { margin-top: 24px; background: ${INK}; color: ${PAPER}; padding: 22px 30px; flex: none; }
  .fee .a { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 38px; line-height: 1.2; }
  .fee .a span { color: ${GOLD2}; }
  .url { margin-top: auto; display: flex; align-items: center; justify-content: space-between; border-top: 3px solid ${INK}; padding-top: 16px; flex: none; }
  .url .u { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 50px; color: ${AZUL}; white-space: nowrap; }
  .url .arr { font-family: 'IBM Plex Mono', monospace; font-size: 18px; color: ${MUTED}; letter-spacing: 2px; text-transform: uppercase; text-align: right; line-height: 1.4; }
  `;
  const body = `
  ${top("Matrícula", "Octubre 2026")}
  <h1 class="ttl">ÚLTIMOS<br><em>DÍAS</em></h1>
  <div class="when">La matrícula de octubre cierra el<br><span class="nw"><span>domingo 11 · 23:59</span> <small>(Chile)</small></span></div>
  ${clasesHTML()}
  <div class="fee"><div class="a"><span>US$150</span> el curso completo · o 2 cuotas de <span>US$75</span></div></div>
  <div class="url"><div class="u">academiaseul.com/nivel-1</div></div>`;
  return doc({ story: true, css, body });
}

function hoyCierra() {
  const css = clasesCSS + `
  .ttl { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 196px; line-height: .9; letter-spacing: -5px; margin: 44px 0 0; }
  .ttl em { font-style: italic; color: ${GOLD2}; }
  .when { display: flex; align-items: baseline; gap: 20px; margin-top: 30px; }
  .when .h { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 92px; line-height: 1; color: ${GOLD2}; }
  .when .z { font-family: 'IBM Plex Mono', monospace; font-size: 26px; letter-spacing: 3px; text-transform: uppercase; font-weight: 600; }
  .bio { margin-top: auto; display: flex; align-items: center; justify-content: space-between; background: ${AZUL}; color: ${PAPER}; padding: 24px 32px; flex: none; }
  .bio .t { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 60px; line-height: 1; }
  .bio svg { width: 54px; height: 54px; flex: none; }
  `;
  const body = `
  ${top("Matrícula", "Domingo 11 de octubre")}
  <h1 class="ttl">HOY<br><em>CIERRA</em></h1>
  <div class="when"><div class="h">23:59</div><div class="z">hora Chile</div></div>
  ${clasesHTML()}
  <div class="bio"><div class="t">Link en la bio</div><svg data-deco viewBox="0 0 24 24" fill="none" stroke="${PAPER}" stroke-width="2.6" stroke-linecap="square"><path d="M12 21V4M5 11l7-7 7 7"/></svg></div>`;
  return doc({ story: true, css, body, dark: true });
}

// ════════════════════════════════════════════════════════════════════════
// 06 · Empezamos esta semana (feed, lun 12 oct)
// ════════════════════════════════════════════════════════════════════════
function empezamos() {
  const SEM = [
    { dow: "mar", n: "13", clases: [["20:00", "Básico 1", "con Kiran"], ["21:00", "Conversacional 1", "con Abby"]] },
    { dow: "mié", n: "14", clases: [["21:00", "Básico 2", "con Jay"]] },
    { dow: "jue", n: "15", clases: [["20:00", "Básico 1", "con Kiran"], ["21:00", "TOPIK II", "con Jay"]] },
    { dow: "lun", n: "19", clases: [["18:00", "Coreano para Niños", "con Jay y Abby"]] },
  ];
  const css = `
  .ko { font-family: 'Noto Sans KR', sans-serif; font-weight: 900; font-size: 112px; line-height: 1.05; color: ${AZUL}; margin-top: 30px; letter-spacing: -2px; }
  .ttl { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 84px; line-height: 1; letter-spacing: -2px; margin: 6px 0 0; white-space: nowrap; }
  .ttl em { font-style: italic; font-weight: 700; }
  .wk { margin-top: 34px; border-top: 3px solid ${INK}; }
  .wk > div { display: grid; grid-template-columns: 176px 1fr; column-gap: 26px; padding: 20px 0; border-bottom: 1px solid rgba(10,10,15,.22); align-items: center; }
  .wk .d { display: flex; align-items: baseline; gap: 12px; }
  .wk .d .n { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 80px; line-height: .9; }
  .wk .d .w { font-family: 'IBM Plex Mono', monospace; font-size: 20px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: ${AZUL}; line-height: 1.25; }
  .wk .d .w span { display: block; color: ${MUTED}; font-weight: 500; }
  .wk .cs > div { display: flex; align-items: baseline; gap: 18px; padding: 6px 0; }
  .wk .cs .h { font-family: 'IBM Plex Mono', monospace; font-size: 24px; font-weight: 600; color: ${AZUL}; flex: none; width: 88px; }
  .wk .cs .c { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 38px; line-height: 1.1; }
  .wk .cs .c span { font-weight: 500; font-style: italic; color: ${MUTED}; }
  .wk .nx .d .n { color: ${MUTED}; }
  .hc { margin-top: 12px; font-family: 'IBM Plex Mono', monospace; font-size: 17px; letter-spacing: 2px; text-transform: uppercase; color: ${MUTED}; }
  .hc b { color: ${INK}; }
  .espera { margin-top: 30px; background: ${INK}; color: ${PAPER}; padding: 24px 30px; display: flex; align-items: center; justify-content: space-between; gap: 20px; }
  .espera .a { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 32px; line-height: 1.2; }
  .espera .a span { color: ${GOLD2}; }
  .espera .b { font-family: 'IBM Plex Mono', monospace; font-size: 17px; letter-spacing: 1px; text-align: right; line-height: 1.45; color: #D8DCF5; white-space: nowrap; }
  .espera .wseal { height: 64px; width: auto; filter: brightness(0) invert(1); flex: none; }
  .foot .cta .kr { font-family: 'Noto Sans KR', sans-serif; font-weight: 900; color: ${AZUL}; }
  `;
  const body = `
  ${top("Inicio de clases", "Semana del 12 de octubre")}
  <div class="ko">시작합니다</div>
  <h1 class="ttl">Empezamos <em>esta semana</em></h1>
  <div class="wk">${SEM.map((s, i) => `<div class="${i === 3 ? "nx" : ""}"><div class="d"><div class="n">${s.n}</div><div class="w">${s.dow}<span>oct</span></div></div>
    <div class="cs">${s.clases.map((c) => `<div><div class="h">${c[0]}</div><div class="c">${c[1]} <span>${c[2]}</span></div></div>`).join("")}</div></div>`).join("")}</div>
  <div class="hc"><b>hora Chile</b> · 8 semanas · 60 min · en vivo por Zoom</div>
  <div class="espera"><div class="a">¿No alcanzaste? Lista de espera<br>para <span>enero 2027</span> en academiaseul.com</div>${sello("wseal")}</div>
  ${foot("Nos vemos en clase · <span class='kr'>화이팅!</span>")}`;
  return doc({ story: false, css, body });
}

// ─── lista de diseños ───
const DISENOS = [
  { file: "00_chuseok_story.png", story: true, html: chuseok() },
  { file: "01_reto_leocoreanoen7dias.png", story: false, html: retoFeed() },
  { file: "02_conoce_a_tus_profes.png", story: false, html: profes() },
  { file: "03_vivo_lee_tu_nombre_story.png", story: true, html: vivo() },
  { file: "04_hangeulnal_9_octubre.png", story: false, html: hangeulnal() },
  { file: "05_cierre_domingo_11_story.png", story: true, html: cierre() },
  { file: "05b_hoy_cierra_story.png", story: true, html: hoyCierra() },
  { file: "06_empezamos_esta_semana.png", story: false, html: empezamos() },
  ...DIAS.map((x) => ({ file: `07_reto_dia_${x.d}_story.png`, story: true, html: retoStory(x) })),
];

// ─── control de calidad dentro del navegador ───
function qa({ story, W, H, SAFE_TOP, SAFE_BOTTOM }) {
  const probs = [];
  // cada familia usada debe tener al menos una cara cargada (Google Fonts la trae solo si se usa)
  const cargada = (fam) => [...document.fonts].some((f) => f.family.replace(/["']/g, "") === fam && f.status === "loaded");
  const usadas = new Set();
  for (const el of document.querySelectorAll(".page, .page *")) usadas.add(getComputedStyle(el).fontFamily.split(",")[0].replace(/["']/g, "").trim());
  for (const fam of ["Playfair Display", "IBM Plex Mono", "Source Serif 4", "Noto Sans KR", "Noto Serif KR", "Noto Color Emoji"])
    if (usadas.has(fam) && !cargada(fam)) probs.push("fuente no cargada: " + fam);
  if (document.querySelector(".flag") && !document.fonts.check("40px 'Noto Color Emoji'", "🇲🇽")) probs.push("emoji de banderas no cargado");
  for (const img of document.images) if (!img.complete || !img.naturalWidth) probs.push("imagen rota");
  const minX = 16, maxX = W - 20, minY = story ? SAFE_TOP : 20, maxY = story ? H - SAFE_BOTTOM : H - 20;
  const boxed = (el) => { // ancestros con borde o fondo = cajas que deben contener su texto
    const out = [];
    for (let a = el; a && !a.classList.contains("page"); a = a.parentElement) {
      const cs = getComputedStyle(a);
      if (parseFloat(cs.borderTopWidth) > 0 && parseFloat(cs.borderLeftWidth) > 0 || (cs.backgroundColor !== "rgba(0, 0, 0, 0)" && a.tagName !== "BODY")) out.push(a);
    }
    return out;
  };
  const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = tw.nextNode())) {
    const txt = n.textContent.trim();
    if (!txt || !n.parentElement || n.parentElement.closest("style,[data-deco]")) continue;
    const range = document.createRange();
    range.selectNodeContents(n);
    const rects = [...range.getClientRects()].filter((r) => r.width > 1);
    for (const r of rects) {
      const where = `[${Math.round(r.left)},${Math.round(r.top)} → ${Math.round(r.right)},${Math.round(r.bottom)}]`;
      if (r.left < minX || r.right > maxX) { probs.push(`se sale en horizontal: "${txt.slice(0, 40)}" ${where}`); break; }
      if (r.top < minY || r.bottom > maxY) { probs.push(`${story ? "fuera de zona segura" : "se sale en vertical"}: "${txt.slice(0, 40)}" ${where}`); break; }
      const bad = boxed(n.parentElement).find((b) => { const br = b.getBoundingClientRect(); return r.left < br.left - 1 || r.right > br.right + 1 || r.top < br.top - 1 || r.bottom > br.bottom + 1; });
      if (bad) { probs.push(`se sale de su caja (.${bad.className}): "${txt.slice(0, 40)}" ${where}`); break; }
    }
  }
  // elementos que chocan: hermanos directos de .safe/.page que se solapan
  const cont = document.querySelector(".safe") || document.querySelector(".page");
  const kids = [...cont.children].filter((k) => !k.hasAttribute("data-deco"));
  for (let i = 1; i < kids.length; i++) {
    const a = kids[i - 1].getBoundingClientRect(), b = kids[i].getBoundingClientRect();
    if (b.top < a.bottom - 1) probs.push(`solape: .${kids[i - 1].className} / .${kids[i].className} (${Math.round(a.bottom - b.top)} px)`);
  }
  const last = kids[kids.length - 1].getBoundingClientRect();
  return { probs, finContenido: Math.round(last.bottom) };
}

// corre en el navegador: cuenta píxeles rojos / naranja-rojo en el PNG recién hecho (regla "nunca rojo")
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
  const lista = filtros.length ? DISENOS.filter((d) => filtros.some((f) => d.file.includes(f))) : DISENOS;
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, // --disable-lcd-text: suavizado en gris (sin él, ClearType deja bordes rojizos/naranjas en el texto)
    args: ["--no-sandbox", "--allow-file-access-from-files", "--disable-lcd-text"] });
  const page = await browser.newPage();
  let conProblemas = 0;
  for (const d of lista) {
    const H = d.story ? STORY_H : FEED_H;
    const htmlPath = path.join(HTML_DIR, d.file.replace(/\.png$/, ".html"));
    fs.writeFileSync(htmlPath, d.html, "utf8");
    await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
    await page.goto("file:///" + htmlPath.split(path.sep).join("/"), { waitUntil: "networkidle0", timeout: 90000 });
    await page.evaluate(() => document.fonts.ready);
    await new Promise((r) => setTimeout(r, 700));
    const fit = await page.evaluate(ajustar);
    const { probs, finContenido } = await page.evaluate(qa, { story: d.story, W, H, SAFE_TOP, SAFE_BOTTOM });
    const png = await page.screenshot({ path: path.join(OUT, d.file), clip: { x: 0, y: 0, width: W, height: H } });
    const rojos = await page.evaluate(contarRojo, "data:image/png;base64," + Buffer.from(png).toString("base64"));
    if (rojos) probs.push(`${rojos} píxeles rojizos (revisa colores o banderas)`);
    if (probs.length) conProblemas++;
    console.log(`${probs.length ? "✗" : "✓"} ${d.file}  (${W}×${H}, fin del contenido y=${finContenido}${fit ? `, escala ${fit.s}, aire ${fit.gap} px` : ""})`);
    probs.forEach((p) => console.log("    · " + p));
  }
  await browser.close();
  console.log(`\n${lista.length} diseños → ${OUT}${conProblemas ? `  ·  ${conProblemas} con avisos` : "  ·  sin avisos"}`);
})().catch((e) => { console.error(e); process.exit(1); });
