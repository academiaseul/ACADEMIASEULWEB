// Diseños de Instagram/TikTok de la campaña «Básico 1 · noviembre 2026» · Academia Seúl
// Una oferta, una fecha, un botón: Básico 1 (A1.1) · coreano desde cero · con Kiran (기란) · martes 20:00 (hora de Chile)
// · 8 martes desde el martes 10 de noviembre · precio de lanzamiento US$120 el curso completo · o 2 cuotas de US$60
// hasta el domingo 8 de noviembre (después, US$150 el curso completo · o 2 cuotas de US$75) · matrícula hasta el lun 9.
// Decisiones de Jay del lun 26 oct 2026. En lo público no va la fecha de término: «8 martes desde el 10 de noviembre».
//
// Mismo sistema que make_disenos_octubre.js ("boletín universitario"): papel #F6F3EC, tinta #0A0A0F, franja azul
// #4236F6 a la izquierda, cabecera mono "ACADEMIA SEÚL · …", sello del tigre v2, acentos oro. Variante azul (fondo
// #4236F6, franja navy #003478) para portadas y cierres. NUNCA rojo, rosado, coral ni magenta.
// El precio tachado (US$150) va en gris/tinta, jamás en rojo.
//
// Coreano: los ejemplos salen de Curriculo/Fase2_Basico1/00_Diseno_Basico1.md (B.2–B.9 y B.12, frases clave de cada
// semana). Romanización solo en lo de las clases 1–2 (política D del diseño); desde la clase 3, puro 한글.
//
// Feed = 1080×1350 · Historias y portada de TikTok = 1080×1920 con zona segura (nada importante en los 250 px de
// arriba ni en los 340 px de abajo: el contenido vive entre y=262 y y=1568).
//
// Uso:  node make_disenos_basico1_nov.js            → genera y renderiza todo
//       node make_disenos_basico1_nov.js 02 b1n_1   → solo los archivos cuyo nombre contenga "02" o "b1n_1"
// (usa el puppeteer-core del scratchpad si no hay uno instalado al lado; las fuentes vienen de Google Fonts: requiere internet)
//
// Salida: C:/Users/Chingu/Desktop/ACADEMIASEULWEB/Campana_Assets/instagram/noviembre_basico1/*.png
// Después del render corre el mismo control automático que el generador de octubre (fuentes, imágenes, textos fuera
// de márgenes o de la zona segura, textos que se salen de sus cajas, solapes y píxeles rojizos).

const fs = require("fs");
const os = require("os");
const path = require("path");

const REPO = "C:/Users/Chingu/Desktop/ACADEMIASEULWEB";
const SCRATCH = "C:/Users/Chingu/AppData/Local/Temp/claude/C--Users-Chingu-Desktop-ACADEMIASEULWEB/d4111e1b-5523-44ea-97b2-b1a1d9545b9e/scratchpad";
const OUT = path.join(REPO, "Campana_Assets/instagram/noviembre_basico1");
const HTML_DIR = fs.existsSync(SCRATCH) ? path.join(SCRATCH, "b1nov/html_disenos") : path.join(os.tmpdir(), "as_disenos_b1nov");
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

// Foto de Kiran: la portada del reel ya publicado (cuadro del video, sin texto en la parte de arriba).
// Si no está, la lámina de Kiran sale sin foto (con su nombre en hangul en grande).
const KIRAN_FILE = path.join(REPO, "Campana_Assets/instagram/octubre/reels/kiran/Reel_Kiran_portada.png");
const KIRAN = fs.existsSync(KIRAN_FILE) ? "data:image/png;base64," + fs.readFileSync(KIRAN_FILE).toString("base64") : "";
if (!KIRAN) console.warn("⚠ No encontré Reel_Kiran_portada.png: b1n_03 sale sin foto.");

// ─── paleta (sin rojo) ───
const AZUL = "#4236F6", NAVY = "#003478", INK = "#0A0A0F", PAPER = "#F6F3EC", MUTED = "#5C5F6B";
const GOLD = "#B8962E", GOLD2 = "#E8B84B", LILA = "#D8DCF5";

const W = 1080, FEED_H = 1350, STORY_H = 1920, SAFE_TOP = 250, SAFE_BOTTOM = 340;

// ─── datos de la campaña (decisiones de Jay, lun 26 oct 2026) ───
const D = {
  url: "academiaseul.com/inscribete",
  wa: "+56 9 4211 5562",
  lanz: "US$120", lanzCuota: "US$60", normal: "US$150", normalCuota: "US$75",
};
// martes 20:00 en Chile (UTC−3, horario de verano) desde el 10 nov: EE.UU. ya cambió de hora el 1 nov y España el 25 oct
// (mismas filas que TZ_ROWS de lib/nivel1.ts, columna "después")
const TZ = [["México", "17:00"], ["Colombia y Perú", "18:00"], ["Argentina", "20:00"], ["EE.UU. (Este)", "18:00"], ["España", "00:00", "mié"]];

const FONTS = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;0,900;1,500;1,700;1,900" +
  "&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400" +
  "&family=IBM+Plex+Mono:wght@400;500;600&family=Noto+Sans+KR:wght@500;700;900&family=Noto+Serif+KR:wght@600;700" +
  "&display=swap";

const BASE_CSS = (H) => `
  * { box-sizing: border-box; }
  :root { --bg: ${PAPER}; --fg: ${INK}; --muted: ${MUTED}; --azul: ${AZUL}; --gold: ${GOLD}; --line: rgba(10,10,15,.2); --strip: ${AZUL}; }
  body.dark { --bg: ${INK}; --fg: ${PAPER}; --muted: #B4B7C6; --azul: #8A83FF; --gold: ${GOLD2}; --line: rgba(246,243,236,.22); }
  body.blue { --bg: ${AZUL}; --fg: #FFFFFF; --muted: ${LILA}; --azul: ${GOLD2}; --gold: ${GOLD2}; --line: rgba(255,255,255,.4); --strip: ${NAVY}; }
  html, body { margin: 0; background: var(--bg); }
  body { width: ${W}px; height: ${H}px; overflow: hidden; font-family: 'Source Serif 4', Georgia, serif; color: var(--fg);
         -webkit-font-smoothing: antialiased; font-variant-numeric: lining-nums; }
  .page { position: relative; width: ${W}px; height: ${H}px; display: flex; flex-direction: column; }
  .page::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 14px; background: var(--strip); }
  .feed .page { padding: 54px 64px 44px; }
  .safe { position: absolute; left: 72px; right: 72px; top: ${SAFE_TOP + 12}px; bottom: ${SAFE_BOTTOM + 12}px; display: flex; flex-direction: column; }
  .mono { font-family: 'IBM Plex Mono', monospace; }
  .kr { font-family: 'Noto Sans KR', sans-serif; }
  .krs { font-family: 'Noto Serif KR', serif; }
  .pf { font-family: 'Playfair Display', Georgia, serif; }
  .azul { color: var(--azul); }
  .muted { color: var(--muted); }
  .nw { white-space: nowrap; }
  .top { display: flex; justify-content: space-between; align-items: center; padding-bottom: 16px; border-bottom: 3px solid var(--fg); flex: none; }
  .top .brand { font-family: 'IBM Plex Mono', monospace; font-size: 17px; letter-spacing: 4px; text-transform: uppercase; font-weight: 600; white-space: nowrap; }
  .top .brand span { color: var(--azul); }
  .top .brand .ko { font-family: 'Noto Sans KR', sans-serif; font-weight: 700; text-transform: none; letter-spacing: 2px; }
  .top img, .top .seal-ph { height: 66px; width: auto; }
  .story .top .brand { font-size: 20px; letter-spacing: 4px; }
  .story .top img { height: 72px; }
  body.dark .top img, body.blue .top img, .wseal { filter: brightness(0) invert(1); }
  .foot { margin-top: auto; padding-top: 16px; border-top: 3px solid var(--fg); display: flex; justify-content: space-between; align-items: center; gap: 24px; flex: none; }
  .foot .cta { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 26px; line-height: 1.3; }
  .foot .cta span { color: var(--azul); }
  .foot .handles { font-family: 'IBM Plex Mono', monospace; font-size: 16px; color: var(--muted); letter-spacing: 1px; text-align: right; line-height: 1.4; white-space: nowrap; }
  s.old { text-decoration-line: line-through; text-decoration-thickness: 4px; text-decoration-color: currentColor; color: var(--muted); font-weight: 700; }
`;

// fit: el render ajusta la variable --s (escala tipográfica) hasta que el último bloque quede a ~70 px del anterior
function doc({ story, css = "", body, dark = false, blue = false, fit = false }) {
  const H = story ? STORY_H : FEED_H;
  return `<!doctype html><html lang="es"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<style>${BASE_CSS(H)}${css}</style></head>
<body class="${story ? "story" : "feed"}${dark ? " dark" : ""}${blue ? " blue" : ""}"><div class="page">${story ? `<div class="safe"${fit ? " data-fit" : ""}>${body}</div>` : body}</div></body></html>`;
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

// caja del precio de lanzamiento (fondo tinta; en las variantes azul y oscura se adapta sola)
const PRECIO_CSS = `
  .precio { background: ${INK}; color: ${PAPER}; padding: 24px 30px 26px; flex: none; }
  body.dark .precio { background: #1B1C24; border: 2px solid rgba(246,243,236,.25); }
  body.blue .precio { background: ${NAVY}; }
  .precio .lbl { font-family: 'IBM Plex Mono', monospace; font-weight: 600; font-size: 19px; letter-spacing: 2.5px; text-transform: uppercase; color: ${GOLD2}; }
  .precio .a { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 38px; line-height: 1.22; margin-top: 8px; }
  .precio .a b { color: ${GOLD2}; font-weight: 900; }
  .precio .a s.old { color: #A9ACBC; font-size: .82em; margin-right: 6px; }
  .precio .h { font-family: 'IBM Plex Mono', monospace; font-size: 19px; color: ${LILA}; letter-spacing: .5px; margin-top: 10px; }
`;
const precioLanz = (hasta = "hasta el domingo 8 de noviembre") => `<div class="precio">
  <div class="lbl">Precio de lanzamiento · ${hasta}</div>
  <div class="a"><s class="old">${D.normal}</s> <b>${D.lanz}</b> el curso completo<br>· o 2 cuotas de <b>${D.lanzCuota}</b></div></div>`;

// ════════════════════════════════════════════════════════════════════════
// b1n_01 · Anuncio (feed, mar 27 oct)
// ════════════════════════════════════════════════════════════════════════
const CAL_CSS = `
  .fecha { display: grid; grid-template-columns: 196px 1fr; column-gap: 30px; align-items: center; flex: none; }
  .cal { border: 3px solid var(--fg); background: #FFFDF8; text-align: center; padding: 10px 0 12px; color: ${INK}; }
  body.blue .cal { background: #FFFFFF; border-color: #FFFFFF; }
  .cal .m { font-family: 'IBM Plex Mono', monospace; font-weight: 600; font-size: 24px; letter-spacing: 4px; color: ${AZUL}; text-transform: uppercase; }
  .cal .n { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 116px; line-height: .95; letter-spacing: -3px; }
  .fecha .t { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 44px; line-height: 1.12; }
  .fecha .t span { color: var(--azul); }
  .fecha .d { font-family: 'IBM Plex Mono', monospace; font-weight: 600; font-size: 23px; letter-spacing: .5px; margin-top: 12px; color: var(--azul); line-height: 1.4; }
  .fecha .d span { color: var(--muted); font-weight: 500; }
`;
const calendario = (t = "Empieza el<br><span>martes 10 de noviembre</span>", d = "8 martes · 20:00 hora de Chile<br><span>60 min en vivo por Zoom</span>") =>
  `<div class="fecha"><div class="cal"><div class="m">mar</div><div class="n">10</div><div class="m">nov</div></div>
   <div><div class="t">${t}</div><div class="d">${d}</div></div></div>`;

const INCLUYE = ["Certificado incluido", "Grabación de cada clase", "Material de cada semana", "Grupo de WhatsApp"];
const INCL_CSS = `
  .incl { display: grid; grid-template-columns: 1fr 1fr; column-gap: 26px; row-gap: 12px; flex: none; }
  .incl div { display: flex; align-items: center; gap: 14px; font-size: 28px; line-height: 1.2; white-space: nowrap; }
  .incl i { flex: none; width: 30px; height: 30px; border-radius: 50%; background: var(--azul); position: relative; }
  body.blue .incl i { background: ${GOLD2}; }
  .incl i::after { content: ""; position: absolute; left: 10px; top: 5px; width: 8px; height: 14px; border: solid #FFFFFF; border-width: 0 3.5px 3.5px 0; transform: rotate(45deg); }
  body.blue .incl i::after { border-color: ${INK}; }
`;
const incluye = () => `<div class="incl">${INCLUYE.map((x) => `<div><i data-deco></i><span>${x}</span></div>`).join("")}</div>`;

function anuncioFeed() {
  const css = CAL_CSS + INCL_CSS + PRECIO_CSS + `
  .ko { font-family: 'Noto Sans KR', sans-serif; font-weight: 900; font-size: 84px; line-height: 1.1; color: ${AZUL}; margin-top: 30px; letter-spacing: -1px; display: flex; align-items: baseline; gap: 22px; }
  .ko small { font-family: 'Playfair Display', serif; font-style: italic; font-weight: 500; font-size: 30px; color: ${MUTED}; letter-spacing: 0; }
  .ttl { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 104px; line-height: 1; letter-spacing: -3px; margin: 4px 0 0; white-space: nowrap; }
  .ttl em { font-style: italic; color: ${AZUL}; }
  .lead { font-family: 'Playfair Display', serif; font-size: 36px; margin-top: 16px; }
  .lead b { font-weight: 900; }
  .lead .kr { font-weight: 700; color: ${AZUL}; font-size: 32px; }
  .prom { font-family: 'Playfair Display', serif; font-style: italic; font-size: 30px; color: ${MUTED}; margin-top: 12px; line-height: 1.3; }
  .prom .kr { font-style: normal; font-weight: 700; color: ${AZUL}; font-size: 27px; }
  .fecha { margin-top: 34px; padding-top: 30px; border-top: 3px solid ${INK}; }
  .incl { margin-top: 34px; }
  .incl div { font-size: 30px; }
  .precio { margin-top: 34px; }
  .precio .a { font-size: 42px; }
  `;
  const body = `
  ${top("Básico 1 · A1.1", "Noviembre 2026")}
  <div class="ko">첫 한국어<small>tu primer coreano</small></div>
  <h1 class="ttl">Coreano <em>desde cero</em></h1>
  <div class="lead"><b>Básico 1</b> con <b>Kiran</b> · <span class="kr">기란</span></div>
  <div class="prom">De no reconocer ni una letra a presentarte en coreano: lees <span class="kr">한글</span> y dices tus primeras frases.</div>
  ${calendario()}
  ${incluye()}
  ${precioLanz()}
  ${foot(`Inscríbete en <span>${D.url}</span><br>o por WhatsApp ${D.wa}`)}`;
  return doc({ story: false, css, body });
}

// ════════════════════════════════════════════════════════════════════════
// b1n_02 · Carrusel «Qué vas a lograr en 8 clases» (feed, mié 28 oct) · 6 láminas
// ════════════════════════════════════════════════════════════════════════
// Las frases son las "Después de esta clase puedo decir…" y las frases clave (B.12) de 00_Diseno_Basico1.md.
const LAMINAS = [
  {
    n: "1–2", libro: "<span class='kr'>가나다라</span> I–II · lección 1", ttl: "Lees <span class='kr'>한글</span> y te presentas",
    ej: [
      { k: "아 · 어 · 오 · 우 · 으 · 이", r: "a · eo · o · u · eu · i", es: "las 6 vocales base", big: true },
      { k: "나무 · 바다 · 우유", r: "namu · bada · uyu", es: "árbol · mar · leche" },
      { k: "안녕하세요! 저는 마리아예요.", es: "¡Hola! Soy María." },
      { k: "저는 칠레 사람이에요.", es: "Soy de Chile." },
    ],
    nota: "Romanización (en gris) solo en las clases 1 y 2. Desde la 3, puro <span class='kr'>한글</span>.",
  },
  {
    n: "3–4", libro: "lecciones 2, 3 y 4", ttl: "Preguntas qué es algo y presentas a tu familia",
    ej: [
      { k: "이게 뭐예요? — 책이에요.", es: "¿Qué es esto? — Es un libro." },
      { k: "아니요, 빵이 아니에요.", es: "No, no es pan." },
      { k: "누구예요? — 우리 엄마예요.", es: "¿Quién es? — Es mi mamá." },
      { k: "우리 가족은 네 명이에요.", es: "En mi familia somos cuatro." },
    ],
    nota: "Y cuentas del 1 al 100 (<span class='kr'>일, 이, 삼… 백</span>) para dictar tu teléfono.",
  },
  {
    n: "5–6", libro: "lecciones 5 y 6", ttl: "Dices dónde están las cosas y adónde vas",
    ej: [
      { k: "화장실이 어디예요? — 저기 있어요.", es: "¿Dónde está el baño? — Está allá." },
      { k: "책이 책상 위에 있어요.", es: "El libro está sobre el escritorio." },
      { k: "어디에 가요? — 회사에 가요.", es: "¿Adónde vas? — Voy a la oficina." },
      { k: "매일 커피 마셔요.", es: "Tomo café todos los días." },
    ],
    nota: "Tu día con verbos en presente: <span class='kr'>가요 · 먹어요 · 봐요 · 공부해요</span>.",
  },
  {
    n: "7–8", libro: "lecciones 7, 8 y 9 + repaso", ttl: "Describes tu pieza y dices lo que te gusta",
    ej: [
      { k: "방에 침대가 있어요.", es: "En la pieza hay una cama." },
      { k: "책을 읽어요. 음악을 들어요.", es: "Leo un libro. Escucho música." },
      { k: "뭘 좋아해요? — 불고기를 정말 좋아해요.", es: "¿Qué te gusta? — Me encanta el bulgogi." },
      { k: "아니요, 안 좋아해요.", es: "No, no me gusta." },
    ],
    nota: "<b>Proyecto final «Yo en coreano»:</b> 1 a 2 minutos sobre ti, sin leer.",
  },
];

const CARR_CSS = `
  .cls { display: flex; align-items: flex-end; justify-content: space-between; margin-top: 36px; flex: none; }
  .cls .n { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 128px; line-height: .8; letter-spacing: -3px; color: ${AZUL}; white-space: nowrap; }
  .cls .n small { font-family: 'IBM Plex Mono', monospace; font-weight: 600; font-size: 24px; letter-spacing: 3px; text-transform: uppercase; color: ${INK}; margin-left: 14px; }
  .cls .lb { font-family: 'IBM Plex Mono', monospace; font-size: 19px; letter-spacing: 1px; text-align: right; line-height: 1.45; color: ${MUTED}; padding-bottom: 4px; }
  .cls .lb b { display: block; color: ${INK}; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; }
  .cls .lb .kr { font-weight: 700; color: ${INK}; letter-spacing: 0; }
  .lt { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 66px; line-height: 1.05; letter-spacing: -1px; margin: 30px 0 0; text-wrap: balance; }
  .lt .kr { color: ${AZUL}; font-weight: 900; font-size: .92em; }
  .ejs { margin-top: 30px; border-top: 3px solid ${INK}; flex: none; }
  .ej { padding: 20px 0 19px 28px; border-bottom: 1px solid rgba(10,10,15,.2); position: relative; }
  .ej::before { content: ""; position: absolute; left: 0; top: 26px; bottom: 25px; width: 6px; background: ${AZUL}; }
  .ej .k { font-family: 'Noto Sans KR', sans-serif; font-weight: 700; font-size: 44px; line-height: 1.3; color: ${INK}; white-space: nowrap; }
  .ej.big .k { font-size: 52px; color: ${AZUL}; font-weight: 900; }
  .ej .r { font-family: 'IBM Plex Mono', monospace; font-size: 23px; color: #8E919C; letter-spacing: 1px; margin-top: 2px; }
  .ej .es { font-family: 'Playfair Display', serif; font-style: italic; font-size: 31px; color: ${MUTED}; margin-top: 4px; line-height: 1.2; }
  .nota { margin-top: 30px; border: 2.5px solid ${INK}; background: #FFFDF8; padding: 20px 26px; font-size: 29px; line-height: 1.3; flex: none; }
  .nota .kr { font-weight: 700; color: ${AZUL}; }
  .foot .cta .sw { font-family: 'IBM Plex Mono', monospace; font-weight: 600; font-size: 20px; letter-spacing: 2px; text-transform: uppercase; }
`;

function carruselLamina(x, i) {
  const ej = x.ej.map((e) => `<div class="ej${e.big ? " big" : ""}"><div class="k">${e.k}</div>${e.r ? `<div class="r">${e.r}</div>` : ""}<div class="es">${e.es}</div></div>`).join("");
  const body = `
  ${top("Básico 1 · Qué vas a lograr", `${i + 2}/6`)}
  <div class="cls"><div class="n">${x.n}<small>clases</small></div><div class="lb"><b>libro</b><span class="kr">한글학교 한국어 1</span><br>${x.libro}</div></div>
  <h2 class="lt">${x.ttl}</h2>
  <div class="ejs">${ej}</div>
  <div class="nota">${x.nota}</div>
  ${foot(`<span class="sw">${i < 3 ? "Desliza →" : "Última lámina →"}</span>`)}`;
  return doc({ story: false, css: CARR_CSS, body });
}

function carruselPortada() {
  const PASOS = [
    ["clase 1", "아"],
    ["clase 2", "저는 마리아예요."],
    ["clase 3", "이게 뭐예요?"],
    ["clase 8", "불고기를 정말 좋아해요!"],
  ];
  const css = `
  .ttl { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 112px; line-height: 1; letter-spacing: -3px; margin: 40px 0 0; }
  .ttl em { font-style: italic; color: ${GOLD2}; }
  .sub { font-family: 'Playfair Display', serif; font-size: 36px; margin-top: 22px; color: ${LILA}; line-height: 1.3; }
  .sub b { color: #FFFFFF; }
  .esc { margin-top: 40px; flex: none; }
  .esc > div { padding: 14px 0 12px; border-top: 2px solid rgba(255,255,255,.4); }
  .esc > div:last-child { border-bottom: 2px solid rgba(255,255,255,.4); }
  .esc .c { font-family: 'IBM Plex Mono', monospace; font-weight: 600; font-size: 21px; letter-spacing: 3px; text-transform: uppercase; color: ${GOLD2}; }
  .esc .k { font-family: 'Noto Sans KR', sans-serif; font-weight: 900; line-height: 1.2; white-space: nowrap; margin-top: 2px; }
  .ini { margin-top: 30px; font-family: 'IBM Plex Mono', monospace; font-weight: 600; font-size: 22px; letter-spacing: 2px; text-transform: uppercase; color: #FFFFFF; flex: none; }
  .ini span { color: ${GOLD2}; }
  .foot .cta .sw { font-family: 'IBM Plex Mono', monospace; font-weight: 600; font-size: 22px; letter-spacing: 2px; text-transform: uppercase; color: ${GOLD2}; }
  `;
  // escalera: cada paso entra más a la derecha y un poco más grande
  const esc = PASOS.map((p, i) => `<div style="padding-left:${i * 56}px"><div class="c">${p[0]}</div><div class="k" style="font-size:${54 + i * 6}px">${p[1]}</div></div>`).join("");
  const body = `
  ${top("Básico 1 · A1.1", "1/6")}
  <h1 class="ttl">Qué vas a lograr<br><em>en 8 clases</em></h1>
  <div class="sub"><b>Coreano desde cero</b> con Kiran:<br>de no leer ni una letra a hablar de ti.</div>
  <div class="esc">${esc}</div>
  <div class="ini">Empieza el <span>martes 10 de noviembre</span> · 20:00 hora de Chile</div>
  ${foot(`<span class="sw">Desliza →</span>`)}`;
  return doc({ story: false, css, body, blue: true });
}

function carruselCierre() {
  const css = CAL_CSS + INCL_CSS + PRECIO_CSS + `
  .ttl { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 104px; line-height: 1.02; letter-spacing: -2px; margin: 40px 0 0; }
  .ttl em { font-style: italic; color: ${GOLD2}; }
  .fecha { margin-top: 44px; }
  .fecha .d span { color: ${LILA}; }
  .incl { margin-top: 40px; }
  .incl div { font-size: 29px; }
  .precio { margin-top: 40px; }
  .precio .a { font-size: 42px; }
  .url { margin-top: 38px; font-family: 'Playfair Display', serif; font-weight: 900; font-size: 56px; color: #FFFFFF; white-space: nowrap; flex: none; }
  .url small { display: block; font-family: 'IBM Plex Mono', monospace; font-weight: 500; font-size: 20px; color: ${LILA}; letter-spacing: 1px; margin-top: 6px; }
  .foot .cta .kr { font-family: 'Noto Sans KR', sans-serif; font-weight: 900; color: ${GOLD2}; }
  `;
  const body = `
  ${top("Básico 1 · A1.1", "6/6")}
  <h1 class="ttl">Tu primera clase<br><em>es un martes</em></h1>
  ${calendario("Empieza el<br><span>martes 10 de noviembre</span>", "8 martes · 20:00 hora de Chile<br><span>con Kiran · 60 min por Zoom</span>")}
  ${incluye()}
  ${precioLanz()}
  <div class="url">${D.url}<small>o por WhatsApp ${D.wa} · la web te muestra la hora de tu país</small></div>
  ${foot(`Nos vemos en clase · <span class="kr">화이팅!</span>`)}`;
  return doc({ story: false, css, body, blue: true });
}

// ════════════════════════════════════════════════════════════════════════
// b1n_03 · Kiran (feed, jue 29 oct)
// ════════════════════════════════════════════════════════════════════════
function kiranFeed() {
  // recorte de la portada del reel (1080×1920): x 290–790, y 290–1063 → 440×680 px (escala 0,88), por encima de los rótulos
  const S = 0.88;
  const css = `
  .ttl { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 88px; line-height: 1; letter-spacing: -2px; margin: 30px 0 0; white-space: nowrap; }
  .ttl em { font-style: italic; font-weight: 700; color: ${AZUL}; }
  .grid { display: grid; grid-template-columns: 440px 1fr; column-gap: 36px; margin-top: 34px; flex: none; }
  .foto { width: 440px; height: 680px; border: 3px solid ${INK}; background-color: #D9D5CC;
          background-image: url(${KIRAN}); background-repeat: no-repeat; background-size: ${Math.round(1080 * S)}px ${Math.round(1920 * S)}px;
          background-position: -${Math.round(290 * S)}px -${Math.round(290 * S)}px; }
  .sinfoto { width: 440px; height: 680px; border: 3px solid ${INK}; background: ${PAPER}; display: flex; align-items: center; justify-content: center;
             font-family: 'Noto Sans KR', sans-serif; font-weight: 900; font-size: 150px; color: ${AZUL}; }
  .info { display: flex; flex-direction: column; }
  .nm { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 96px; line-height: .95; letter-spacing: -2px; }
  .nmk { font-family: 'Noto Sans KR', sans-serif; font-weight: 900; font-size: 64px; color: ${AZUL}; line-height: 1.2; margin-top: 6px; }
  .rol { font-family: 'IBM Plex Mono', monospace; font-weight: 600; font-size: 20px; letter-spacing: 2px; text-transform: uppercase; margin-top: 18px; line-height: 1.45; }
  .rol span { color: ${AZUL}; }
  .bio { font-size: 30px; line-height: 1.32; margin-top: 18px; padding-top: 18px; border-top: 2px solid ${INK}; }
  .bio i { color: ${MUTED}; }
  .hola { margin-top: auto; border: 3px solid ${INK}; background: #FFFDF8; padding: 18px 22px; }
  .hola .k { font-family: 'Noto Sans KR', sans-serif; font-weight: 700; font-size: 32px; line-height: 1.35; color: ${AZUL}; }
  .hola .es { font-family: 'Playfair Display', serif; font-style: italic; font-size: 25px; color: ${MUTED}; margin-top: 4px; line-height: 1.25; }
  .det { margin-top: 34px; background: ${INK}; color: ${PAPER}; padding: 24px 28px; display: flex; justify-content: space-between; align-items: center; gap: 20px; flex: none; }
  .det .a { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 32px; line-height: 1.3; white-space: nowrap; }
  .det .a s.old { color: #A9ACBC; font-size: .85em; }
  .det .a span { color: ${GOLD2}; }
  .det .b { font-family: 'IBM Plex Mono', monospace; font-size: 18px; letter-spacing: 1px; text-align: right; line-height: 1.5; color: ${LILA}; white-space: nowrap; }
  `;
  const foto = KIRAN ? `<div class="foto" role="img" aria-label="Kiran, profesora de Básico 1"></div>` : `<div class="sinfoto">기란</div>`;
  const body = `
  ${top("Equipo docente", "Básico 1 · Noviembre 2026")}
  <h1 class="ttl">Tu profe <em>de Básico 1</em></h1>
  <div class="grid">${foto}
    <div class="info">
      <div class="nm">Kiran</div>
      <div class="nmk">기란</div>
      <div class="rol">Básico 1 <span>(A1.1)</span><br>coreano desde cero</div>
      <div class="bio">Profesora coreana criada en Argentina: <i>bilingüe</i>. Años enseñando coreano en español.</div>
      <div class="hola"><div class="k">안녕하세요!<br>저는 기란이에요.</div><div class="es">¡Hola! Soy Kiran. En la clase 2 te presentas tú.</div></div>
    </div></div>
  <div class="det"><div class="a">Martes 20:00 (Chile) · 8 martes desde el <span>10 de noviembre</span><br><s class="old">${D.normal}</s> <span>${D.lanz}</span> el curso completo · o 2 cuotas de <span>${D.lanzCuota}</span></div></div>
  ${foot(`Precio de lanzamiento hasta el <span>domingo 8 de noviembre</span><br>→ ${D.url}`)}`;
  return doc({ story: false, css, body });
}

// ════════════════════════════════════════════════════════════════════════
// Historias
// ════════════════════════════════════════════════════════════════════════
const TZ_CSS = `
  .tz { flex: none; border-top: 3px solid var(--fg); }
  .tz > div { display: grid; grid-template-columns: 1fr auto; align-items: baseline; padding: 9px 0; border-bottom: 1px solid var(--line); }
  .tz .c { font-family: 'IBM Plex Mono', monospace; font-size: 24px; letter-spacing: 1.5px; text-transform: uppercase; font-weight: 600; }
  .tz .h { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 40px; line-height: 1.1; }
  .tz .h small { font-family: 'IBM Plex Mono', monospace; font-weight: 500; font-size: 19px; color: var(--muted); margin-left: 8px; }
  .tz .hc { font-family: 'IBM Plex Mono', monospace; font-size: 17px; color: var(--muted); letter-spacing: 2px; text-transform: uppercase; padding: 8px 0 0; border: 0; display: block; }
`;
const tzTabla = (chile = true) => `<div class="tz">${chile ? `<div><div class="c">Chile</div><div class="h">20:00</div></div>` : ""}${TZ.map((t) => `<div><div class="c">${t[0]}</div><div class="h">${t[1]}${t[2] ? `<small>(${t[2]})</small>` : ""}</div></div>`).join("")}</div>`;

const URL_CSS = `
  .url { margin-top: auto; display: flex; align-items: center; justify-content: space-between; gap: 20px; border-top: 3px solid var(--fg); padding-top: 16px; flex: none; }
  .url .u { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 50px; color: var(--azul); white-space: nowrap; }
  .url .w { font-family: 'IBM Plex Mono', monospace; font-size: 19px; color: var(--muted); letter-spacing: 1px; text-align: right; line-height: 1.45; white-space: nowrap; }
`;
const urlRow = () => `<div class="url"><div class="u">${D.url}</div><div class="w">o WhatsApp<br>${D.wa}</div></div>`;

// clase única (una fila, como la tabla de octubre)
const CLASE_CSS = `
  .cl { border-top: 3px solid var(--fg); flex: none; }
  .cl .row { display: grid; grid-template-columns: 186px 1fr auto; column-gap: 18px; align-items: center; padding: 16px 0; border-bottom: 1px solid var(--line); }
  .cl .dh { font-family: 'IBM Plex Mono', monospace; font-size: 27px; font-weight: 600; letter-spacing: 1px; white-space: nowrap; }
  .cl .dh span { color: var(--azul); }
  .cl .c { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 38px; line-height: 1.1; }
  .cl .c small { font-family: 'IBM Plex Mono', monospace; font-weight: 500; font-size: 19px; color: var(--muted); margin-left: 8px; letter-spacing: .5px; }
  .cl .p { font-size: 30px; font-style: italic; color: var(--muted); text-align: right; white-space: nowrap; }
  .cl .hc { font-family: 'IBM Plex Mono', monospace; font-size: 18px; color: var(--muted); letter-spacing: 1.5px; text-transform: uppercase; padding: 10px 0 0; line-height: 1.5; }
  .cl .hc b { color: var(--fg); font-weight: 600; }
`;
const claseHTML = (nota = "<b>desde el martes 10 de noviembre</b> · 8 martes · 60 min · certificado incluido") =>
  `<div class="cl"><div class="row"><div class="dh">Mar <span>20:00</span></div><div class="c">Básico 1<small>A1.1 · desde cero</small></div><div class="p">Kiran</div></div>
   <div class="hc">hora Chile (UTC−3) · ${nota}</div></div>`;

// b1n_10 · Anuncio (historia, mar 27 oct)
function anuncioStory() {
  const css = CAL_CSS + PRECIO_CSS + URL_CSS + `
  .ko { font-family: 'Noto Sans KR', sans-serif; font-weight: 900; font-size: 100px; line-height: 1.1; color: ${AZUL}; margin-top: 34px; letter-spacing: -1px; display: flex; align-items: baseline; gap: 24px; flex: none; }
  .ko small { font-family: 'Playfair Display', serif; font-style: italic; font-weight: 500; font-size: 34px; color: ${MUTED}; letter-spacing: 0; }
  .ttl { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 138px; line-height: .98; letter-spacing: -4px; margin: 6px 0 0; }
  .ttl em { font-style: italic; color: ${AZUL}; }
  .lead { font-family: 'Playfair Display', serif; font-size: 40px; margin-top: 20px; }
  .lead b { font-weight: 900; }
  .lead .kr { font-weight: 700; color: ${AZUL}; font-size: 36px; }
  .fecha { margin-top: 38px; padding-top: 32px; border-top: 3px solid ${INK}; }
  .tzl { font-family: 'IBM Plex Mono', monospace; font-size: 20px; color: ${MUTED}; letter-spacing: .5px; line-height: 1.6; margin-top: 24px; flex: none; }
  .tzl b { color: ${INK}; font-weight: 600; }
  .tzl span { white-space: nowrap; }
  .precio { margin-top: 32px; }
  .precio .a { font-size: 42px; }
  `;
  const body = `
  ${top("Básico 1 · A1.1", "Noviembre 2026")}
  <div class="ko">첫 한국어<small>tu primer coreano</small></div>
  <h1 class="ttl">Coreano<br><em>desde cero</em></h1>
  <div class="lead"><b>Básico 1</b> con <b>Kiran</b> · <span class="kr">기란</span></div>
  ${calendario()}
  <div class="tzl"><b>En tu país:</b> ${TZ.map((t) => `<span>${t[0]} ${t[1]}${t[2] ? ` (${t[2]})` : ""}</span>`).join(" · ")}</div>
  ${precioLanz()}
  ${urlRow()}`;
  return doc({ story: true, css, body });
}

// b1n_11 · Precio de lanzamiento (historia)
function precioStory() {
  const css = CLASE_CSS + URL_CSS + `
  .kick { display: flex; align-items: center; gap: 18px; margin-top: 50px; flex: none; }
  .kick .t { font-family: 'IBM Plex Mono', monospace; font-weight: 600; font-size: 28px; letter-spacing: 4px; text-transform: uppercase; }
  .kick .pct { font-family: 'IBM Plex Mono', monospace; font-weight: 600; font-size: 28px; letter-spacing: 2px; background: ${GOLD2}; color: ${INK}; padding: 6px 14px; }
  .old { margin-top: 34px; font-family: 'Playfair Display', serif; font-size: 90px; line-height: 1; }
  .old s.old { color: ${MUTED}; text-decoration-thickness: 6px; }
  .big { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 262px; line-height: .86; letter-spacing: -8px; color: ${AZUL}; margin-top: 10px; white-space: nowrap; }
  .cc { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 58px; line-height: 1.15; margin-top: 24px; }
  .cc b { color: ${AZUL}; font-weight: 900; }
  .hasta { margin-top: 36px; background: ${INK}; color: ${PAPER}; padding: 24px 30px; flex: none; }
  .hasta .a { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 40px; line-height: 1.2; }
  .hasta .a span { color: ${GOLD2}; }
  .hasta .b { font-family: 'IBM Plex Mono', monospace; font-size: 21px; color: ${LILA}; letter-spacing: .3px; margin-top: 10px; line-height: 1.5; }
  .cl { margin-top: 40px; }
  `;
  const body = `
  ${top("Básico 1 · A1.1", "Noviembre 2026")}
  <div class="kick"><div class="t">Precio de lanzamiento</div><div class="pct">−20 %</div></div>
  <div class="old"><s class="old">${D.normal}</s></div>
  <div class="big">${D.lanz}</div>
  <div class="cc">el curso completo<br>· o 2 cuotas de <b>${D.lanzCuota}</b></div>
  <div class="hasta"><div class="a">Hasta el <span>domingo 8 de noviembre</span> · 23:59 (Chile)</div>
    <div class="b">En Chile: $120.000 CLP o 2 × $60.000<br>Desde el lunes 9: ${D.normal} el curso completo · o 2 cuotas de ${D.normalCuota}</div></div>
  ${claseHTML()}
  ${urlRow()}`;
  return doc({ story: true, css, body });
}

// b1n_12 / b1n_13 · Quedan N días del precio de lanzamiento (historias, dom 1 y jue 5 nov)
function quedan(n, fecha) {
  const css = CLASE_CSS + PRECIO_CSS + URL_CSS + `
  .ttl { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 190px; line-height: 1; letter-spacing: -5px; margin: 50px 0 0; white-space: nowrap; }
  .ttl em { font-style: italic; color: ${AZUL}; }
  .when { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 48px; line-height: 1.2; margin-top: 30px; }
  .when span { color: ${AZUL}; }
  .when small { font-family: 'IBM Plex Mono', monospace; font-weight: 500; font-size: 22px; color: ${MUTED}; letter-spacing: 1px; }
  .cl { margin-top: 40px; }
  .precio { margin-top: 32px; }
  .precio .a { font-size: 42px; }
  .luego { font-family: 'IBM Plex Mono', monospace; font-size: 20px; color: ${MUTED}; letter-spacing: .3px; margin-top: 14px; line-height: 1.45; flex: none; }
  `;
  const body = `
  ${top("Lanzamiento", fecha)}
  <h1 class="ttl">QUEDAN<br><em>${n} DÍAS</em></h1>
  <div class="when">de precio de lanzamiento:<br>hasta el <span class="nw"><span>domingo 8 · 23:59</span> <small>(Chile)</small></span></div>
  ${claseHTML()}
  ${precioLanz("hasta el domingo 8")}
  <div class="luego">Desde el lunes 9: ${D.normal} el curso completo · o 2 cuotas de ${D.normalCuota}</div>
  ${urlRow()}`;
  return doc({ story: true, css, body });
}

// variantes oscuras (como 09b / 09f de octubre): último día del precio (dom 8) y últimas horas de matrícula (lun 9)
const OSCURO_CSS = `
  .ttl { font-family: 'Playfair Display', serif; font-weight: 900; line-height: .9; letter-spacing: -5px; margin: 44px 0 0; }
  .ttl em { font-style: italic; color: ${GOLD2}; }
  .when { display: flex; align-items: baseline; gap: 20px; margin-top: 30px; flex: none; }
  .when .h { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 92px; line-height: 1; color: ${GOLD2}; }
  .when .z { font-family: 'IBM Plex Mono', monospace; font-size: 25px; letter-spacing: 3px; text-transform: uppercase; font-weight: 600; line-height: 1.35; }
  .bio { margin-top: auto; display: flex; align-items: center; justify-content: space-between; background: ${AZUL}; color: ${PAPER}; padding: 24px 32px; flex: none; }
  .bio .t { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 54px; line-height: 1; white-space: nowrap; }
  .bio .t small { display: block; font-family: 'IBM Plex Mono', monospace; font-weight: 500; font-size: 20px; letter-spacing: 1px; margin-top: 10px; color: ${LILA}; }
  .bio .t small.k { margin: 0 0 10px; font-weight: 600; font-size: 21px; letter-spacing: 3px; text-transform: uppercase; color: ${GOLD2}; }
  .bio img { height: 76px; width: auto; flex: none; }
`;
// Sin «link en la bio» ni flecha: estas historias también van al estado de WhatsApp, donde no hay sticker ni bio.
const bioBox = () => `<div class="bio"><div class="t"><small class="k">Inscríbete en</small>${D.url}<small>o por WhatsApp ${D.wa}</small></div>${sello("wseal")}</div>`;

// b1n_14 · Último día del precio de lanzamiento (dom 8 nov)
function ultimoDiaPrecio() {
  const css = OSCURO_CSS + CLASE_CSS + PRECIO_CSS + `
  .ttl { font-size: 178px; line-height: 1; margin-top: 36px; }
  .sub { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 50px; margin-top: 16px; line-height: 1.1; }
  .cl { margin-top: 34px; }
  .precio { margin-top: 30px; }
  .precio .a { font-size: 42px; }
  .luego { font-family: 'IBM Plex Mono', monospace; font-size: 21px; color: var(--muted); letter-spacing: .3px; margin-top: 14px; line-height: 1.45; flex: none; }
  `;
  const body = `
  ${top("Lanzamiento", "Domingo 8 de noviembre")}
  <h1 class="ttl">ÚLTIMO<br><em>DÍA</em></h1>
  <div class="sub">del precio de lanzamiento</div>
  <div class="when"><div class="h">23:59</div><div class="z">hora Chile · hoy</div></div>
  ${claseHTML()}
  ${precioLanz("solo hasta hoy")}
  <div class="luego">Desde mañana: ${D.normal} el curso completo · o 2 cuotas de ${D.normalCuota}</div>
  ${bioBox()}`;
  return doc({ story: true, css, body, dark: true });
}

// b1n_15 · Últimas horas de matrícula (lun 9 nov) — ya rige el precio normal
function ultimasHoras() {
  const css = OSCURO_CSS + CLASE_CSS + `
  .ttl { font-size: 168px; line-height: .96; }
  .man { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 46px; line-height: 1.2; margin-top: 34px; flex: none; }
  .man span { color: ${GOLD2}; }
  .cl { margin-top: 40px; }
  .fee { margin-top: 34px; border: 2px solid rgba(246,243,236,.25); background: #1B1C24; padding: 24px 30px; flex: none; }
  .fee .a { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 38px; line-height: 1.2; }
  .fee .a span { color: ${GOLD2}; }
  `;
  const body = `
  ${top("Matrícula", "Lunes 9 de noviembre")}
  <h1 class="ttl">ÚLTIMAS<br><em>HORAS</em></h1>
  <div class="when"><div class="h">23:59</div><div class="z">hora Chile<br>la matrícula cierra hoy</div></div>
  <div class="man">Mañana empezamos:<br><span>martes 10 de noviembre · 20:00</span> (Chile)</div>
  ${claseHTML("8 martes · 60 min · grabación de cada clase · certificado incluido")}
  <div class="fee"><div class="a"><span>${D.normal}</span> el curso completo · o 2 cuotas de <span>${D.normalCuota}</span></div></div>
  ${bioBox()}`;
  return doc({ story: true, css, body, dark: true });
}

// b1n_16 · Hoy empezamos (mar 10 nov, 20:00)
function empezamosStory() {
  const css = TZ_CSS + `
  .ko { font-family: 'Noto Sans KR', sans-serif; font-weight: 900; font-size: 112px; line-height: 1.1; color: ${AZUL}; margin-top: 34px; letter-spacing: -2px; flex: none; }
  .ttl { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 132px; line-height: .98; letter-spacing: -4px; margin: 6px 0 0; }
  .ttl em { font-style: italic; color: ${AZUL}; }
  .who { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 44px; margin-top: 22px; line-height: 1.2; }
  .who span { color: ${AZUL}; }
  .tz { margin-top: 28px; }
  .c1 { margin-top: 28px; border: 3px solid ${INK}; background: #FFFDF8; padding: 20px 28px; flex: none; }
  .c1 .lbl { font-family: 'IBM Plex Mono', monospace; font-size: 20px; letter-spacing: 3px; text-transform: uppercase; color: ${AZUL}; font-weight: 600; }
  .c1 .lbl .kr { font-weight: 700; letter-spacing: 1px; }
  .c1 .k { font-family: 'Noto Sans KR', sans-serif; font-weight: 900; font-size: 64px; line-height: 1.2; margin-top: 6px; white-space: nowrap; }
  .c1 .r { font-family: 'IBM Plex Mono', monospace; font-size: 22px; color: #9A9DA8; letter-spacing: 1px; }
  .fin { margin-top: auto; display: flex; align-items: center; justify-content: space-between; border-top: 3px solid ${INK}; padding-top: 16px; flex: none; }
  .fin .t { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 48px; }
  .fin .t .kr { color: ${AZUL}; }
  .fin img { height: 72px; width: auto; }
  `;
  const body = `
  ${top("Inicio de clases", "Martes 10 nov")}
  <div class="ko">시작합니다</div>
  <h1 class="ttl">HOY<br><em>EMPEZAMOS</em></h1>
  <div class="who">Básico 1 con Kiran · <span>20:00 hora de Chile</span></div>
  ${tzTabla(false)}
  <div class="c1"><div class="lbl">Clase 1 · <span class="kr">가나다라</span> I</div><div class="k">아 어 오 우 으 이</div><div class="r">a · eo · o · u · eu · i</div></div>
  <div class="fin"><div class="t">Nos vemos en Zoom · <span class="kr">화이팅!</span></div>${sello()}</div>`;
  return doc({ story: true, css, body });
}

// b1n_17 · Trae a un chingu: la dice el alumno («Yo ya estudio coreano en Academia Seúl»). SOLO para los alumnos de
//          Básico 2 (mensaje §5.3 del plan), que la suben a sus historias y etiquetan a su chingu.
// b1n_18 · La misma idea para las cuentas propias (@academiaseul, @jaychingu.oficial), Kiran y ex-alumnos: sin
//          primera persona del alumno (en la boca de la academia o de Jay, «yo ya estudio…» sería falso).
function traeUnChingu(cuentas = false) {
  const css = CLASE_CSS + PRECIO_CSS + `
  .kick { font-family: 'IBM Plex Mono', monospace; font-weight: 600; font-size: 22px; letter-spacing: 3px; text-transform: uppercase; color: ${MUTED}; margin-top: 40px; flex: none; }
  .chingu { display: flex; align-items: flex-end; gap: 26px; margin-top: 10px; flex: none; }
  .chingu .k { font-family: 'Noto Sans KR', sans-serif; font-weight: 900; font-size: 210px; line-height: 1.05; color: ${AZUL}; letter-spacing: -6px; }
  .chingu .g { font-family: 'Playfair Display', serif; padding-bottom: 34px; }
  .chingu .g b { display: block; font-style: italic; font-weight: 700; font-size: 50px; }
  .chingu .g span { font-size: 30px; color: ${MUTED}; font-style: italic; }
  .ttl { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 104px; line-height: 1.02; letter-spacing: -2px; margin: 22px 0 0; }
  .ttl em { font-style: italic; color: ${AZUL}; }
  .lead { font-size: 36px; line-height: 1.3; margin-top: 22px; }
  .cl { margin-top: 36px; }
  .precio { margin-top: 32px; }
  .precio .a { font-size: 42px; }
  .tag { margin-top: auto; display: flex; align-items: center; justify-content: space-between; background: ${AZUL}; color: ${PAPER}; padding: 22px 30px; flex: none; }
  .tag .t { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 46px; line-height: 1.1; }
  .tag .t small { display: block; font-family: 'IBM Plex Mono', monospace; font-weight: 500; font-size: 19px; letter-spacing: 1px; margin-top: 8px; color: ${LILA}; }
  .tag svg { width: 50px; height: 50px; flex: none; }
  `;
  const body = `
  ${top("Trae a un chingu", "Básico 1")}
  <div class="kick">${cuentas ? "¿Tienes un chingu que siempre quiso aprender coreano?" : "Yo ya estudio coreano en Academia Seúl"}</div>
  <div class="chingu"><div class="k">친구</div><div class="g"><b>chingu</b><span>amigo, amiga · se aprende en la clase 4</span></div></div>
  <h1 class="ttl">${cuentas ? "Aprendan <em>juntos</em>" : "¿Y tú, <em>te animas</em>?"}</h1>
  <div class="lead">Básico 1 es coreano desde cero: en las dos primeras clases ya lees <span class="kr" style="font-weight:700;color:${AZUL}">한글</span> y te presentas.</div>
  ${claseHTML()}
  ${precioLanz()}
  <div class="tag"><div class="t">${cuentas ? "Mándasela a tu chingu" : "Etiqueta a tu chingu"}<small>${D.url} · WhatsApp ${D.wa}</small></div><svg data-deco viewBox="0 0 24 24" fill="none" stroke="${PAPER}" stroke-width="2.6" stroke-linecap="square"><path d="M12 3v17M5 13l7 7 7-7"/></svg></div>`;
  return doc({ story: true, css, body });
}

// b1n_20 · Portada de TikTok (1080×1920). TikTok recorta la grilla del perfil a 3:4 (centro, y≈240–1680)
// y pone botones a la derecha y el texto abajo: todo lo importante va centrado entre y≈300 y y≈1500.
function tiktokPortada() {
  const css = `
  .safe { align-items: center; text-align: center; justify-content: center; }
  .ko { font-family: 'Noto Sans KR', sans-serif; font-weight: 900; font-size: 170px; line-height: 1.1; color: ${GOLD2}; letter-spacing: -3px; flex: none; }
  .ttl { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 180px; line-height: .95; letter-spacing: -5px; margin: 18px 0 0; color: #FFFFFF; }
  .ttl em { font-style: italic; color: ${GOLD2}; }
  .n8 { margin-top: 40px; font-family: 'Playfair Display', serif; font-weight: 700; font-size: 66px; line-height: 1.15; color: #FFFFFF; }
  .pill { margin-top: 44px; display: inline-block; background: #FFFFFF; color: ${NAVY}; padding: 20px 34px; font-family: 'Playfair Display', serif; font-weight: 900; font-size: 52px; line-height: 1.1; flex: none; }
  .pill span { color: ${AZUL}; }
  .sm { margin-top: 26px; font-family: 'IBM Plex Mono', monospace; font-weight: 600; font-size: 26px; letter-spacing: 3px; text-transform: uppercase; color: ${LILA}; }
  .seal { margin-top: 40px; height: 96px; width: auto; }
  `;
  const body = `
  <div class="ko">첫 한국어</div>
  <h1 class="ttl">Coreano<br><em>desde cero</em></h1>
  <div class="n8">en 8 clases con Kiran</div>
  <div class="pill">desde el <span>martes 10 de noviembre</span></div>
  <div class="sm">Básico 1 · Academia Seúl</div>
  ${sello("seal wseal")}`;
  return doc({ story: true, css, body, blue: true });
}

// ─── lista de diseños ───
const DISENOS = [
  { file: "b1n_01_anuncio_feed.png", story: false, html: anuncioFeed() },
  { file: "b1n_02_carrusel_1.png", story: false, html: carruselPortada() },
  ...LAMINAS.map((x, i) => ({ file: `b1n_02_carrusel_${i + 2}.png`, story: false, html: carruselLamina(x, i) })),
  { file: "b1n_02_carrusel_6.png", story: false, html: carruselCierre() },
  { file: "b1n_03_kiran_feed.png", story: false, html: kiranFeed() },
  { file: "b1n_10_anuncio_story.png", story: true, html: anuncioStory() },
  { file: "b1n_11_precio_story.png", story: true, html: precioStory() },
  { file: "b1n_12_quedan_7_story.png", story: true, html: quedan(7, "Domingo 1 de noviembre") },
  { file: "b1n_13_quedan_3_story.png", story: true, html: quedan(3, "Jueves 5 de noviembre") },
  { file: "b1n_14_ultimo_dia_precio_story.png", story: true, html: ultimoDiaPrecio() },
  { file: "b1n_15_ultimas_horas_story.png", story: true, html: ultimasHoras() },
  { file: "b1n_16_empezamos_story.png", story: true, html: empezamosStory() },
  { file: "b1n_17_trae_un_chingu_story.png", story: true, html: traeUnChingu() },
  { file: "b1n_18_trae_un_chingu_cuentas_story.png", story: true, html: traeUnChingu(true) },
  { file: "b1n_20_tiktok_portada.png", story: true, html: tiktokPortada() },
];

// ─── control de calidad dentro del navegador (el mismo de make_disenos_octubre.js) ───
function qa({ story, W, H, SAFE_TOP, SAFE_BOTTOM }) {
  const probs = [];
  const cargada = (fam) => [...document.fonts].some((f) => f.family.replace(/["']/g, "") === fam && f.status === "loaded");
  const usadas = new Set();
  for (const el of document.querySelectorAll(".page, .page *")) usadas.add(getComputedStyle(el).fontFamily.split(",")[0].replace(/["']/g, "").trim());
  for (const fam of ["Playfair Display", "IBM Plex Mono", "Source Serif 4", "Noto Sans KR", "Noto Serif KR"])
    if (usadas.has(fam) && !cargada(fam)) probs.push("fuente no cargada: " + fam);
  for (const img of document.images) if (!img.complete || !img.naturalWidth) probs.push("imagen rota");
  const minX = 16, maxX = W - 20, minY = story ? SAFE_TOP : 20, maxY = story ? H - SAFE_BOTTOM : H - 20;
  const boxed = (el) => {
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
  // contenedores que se desbordan (p. ej. la .safe o la .page cuando el contenido no cabe)
  for (const el of [cont, ...cont.querySelectorAll("*")]) {
    if (el.scrollHeight > el.clientHeight + 2 && getComputedStyle(el).overflow !== "visible") probs.push(`desborde vertical en .${el.className}`);
  }
  const last = kids[kids.length - 1].getBoundingClientRect();
  if (last.bottom > (story ? H - SAFE_BOTTOM : H - 20) + 1) probs.push(`el último bloque termina en y=${Math.round(last.bottom)}: no cabe`);
  return { probs, finContenido: Math.round(last.bottom) };
}

// corre en el navegador: cuenta píxeles rojos / naranja-rojo / rosados en el PNG recién hecho (regla "nunca rojo")
// La foto de Kiran (.foto) no se cuenta: labios y piel tienen tonos rojizos naturales.
async function contarRojo(src) {
  const img = new Image(); img.src = src; await img.decode();
  const c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
  const x = c.getContext("2d"); x.drawImage(img, 0, 0);
  const d = x.getImageData(0, 0, c.width, c.height).data;
  const fotos = [...document.querySelectorAll(".foto")].map((f) => f.getBoundingClientRect());
  let n = 0;
  for (let i = 0; i < d.length; i += 4) {
    const px = (i / 4) % c.width, py = Math.floor(i / 4 / c.width);
    if (fotos.some((r) => px >= r.left && px <= r.right && py >= r.top && py <= r.bottom)) continue;
    const R = d[i], G = d[i + 1], B = d[i + 2];
    if (R > 140 && R - G > 70 && R - B > 70 && G < 150) n++;           // rojo / coral
    else if (R > 170 && B > 120 && R - G > 60 && B - G > 30) n++;       // rosado / magenta
  }
  return n;
}

// ─── render ───
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  fs.mkdirSync(HTML_DIR, { recursive: true });
  const filtros = process.argv.slice(2);
  const lista = filtros.length ? DISENOS.filter((d) => filtros.some((f) => d.file.includes(f))) : DISENOS;
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, // --disable-lcd-text: suavizado en gris (sin él, ClearType deja bordes rojizos en el texto)
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
    if (rojos) probs.push(`${rojos} píxeles rojizos o rosados (revisa colores)`);
    if (probs.length) conProblemas++;
    console.log(`${probs.length ? "✗" : "✓"} ${d.file}  (${W}×${H}, fin del contenido y=${finContenido}${fit ? `, escala ${fit.s}, aire ${fit.gap} px` : ""})`);
    probs.forEach((p) => console.log("    · " + p));
  }
  await browser.close();
  console.log(`\n${lista.length} diseños → ${OUT}${conProblemas ? `  ·  ${conProblemas} con avisos` : "  ·  sin avisos"}`);
})().catch((e) => { console.error(e); process.exit(1); });
