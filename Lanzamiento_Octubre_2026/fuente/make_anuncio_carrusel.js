// Carrusel para ANUNCIO de Meta (Facebook + Instagram) · cohorte octubre 2026 · Academia Seúl
//
// 5 tarjetas que se entienden solas (en un carrusel de anuncio cada tarjeta lleva su propio titular y link):
//   01 Gancho (azul)  ·  02 Básico 1 desde cero (papel)  ·  03 ¿Ya sabes algo? 3 cursos (azul)
//   04 Coreano para Niños (papel)  ·  05 Cierre: precio, fecha límite, web (azul)
// Dos formatos: 1x1 (1080×1080, el seguro para todas las ubicaciones) y 4x5 (1080×1350, feed de Instagram).
//
// Sistema visual = el del boletín de cursos (papel #F6F3EC, tinta, franja vertical a la izquierda,
// Playfair Display + IBM Plex, hangul en Noto) pero en clave de anuncio: una idea por tarjeta, letras grandes,
// mucho contraste, fondos que alternan azul / papel. Marca: azul #4236F6, navy #003478, oro #E8B84B, blanco.
// Cabecera = logo principal (Curriculo/Flashcards/marca/logo_principal.svg, 260×88 px, blanco sobre azul y azul sobre
// papel) + etiqueta a la derecha. El sello del tigre aparece una sola vez: en la tarjeta 5, al final del filete.
// NUNCA rojo ni rosado. Oro solo sobre azul (sobre papel no se lee). Sin fotos ni dibujos de niños.
// Reglas de anuncio: titulares ≥ 64 px, texto ≥ 34 px, margen seguro 90 px, sin cajas que parezcan botones,
// sin flechas tipo "haz clic", sin preguntas que aludan a atributos personales.
//
// Datos: lib/nivel1.ts (fuente única). Al arrancar, el generador compara sus textos con ese archivo y avisa si
// algo cambió (hora, día, profe, primera clase, precio, cierre).
//
// Uso (desde cualquier carpeta; usa el puppeteer-core del scratchpad):
//   node Lanzamiento_Octubre_2026/fuente/make_anuncio_carrusel.js          → 10 PNG + vista_previa.png
//   node Lanzamiento_Octubre_2026/fuente/make_anuncio_carrusel.js 02 05    → solo esas tarjetas (sin hoja de contacto)
//
// Salida: Campana_Assets/instagram/octubre/anuncio_carrusel/{1x1,4x5}/anuncio_01…05.png + vista_previa.png
// Las fuentes vienen de Google Fonts (requiere internet).

const fs = require("fs");
const path = require("path");

const REPO = "C:/Users/Chingu/Desktop/ACADEMIASEULWEB";
const SCRATCH = "C:/Users/Chingu/AppData/Local/Temp/claude/C--Users-Chingu-Desktop-ACADEMIASEULWEB/d4111e1b-5523-44ea-97b2-b1a1d9545b9e/scratchpad";
const OUT = path.join(REPO, "Campana_Assets/instagram/octubre/anuncio_carrusel");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";

let puppeteer;
try { puppeteer = require("module").createRequire(path.join(SCRATCH, "package.json"))("puppeteer-core"); }
catch (e) { puppeteer = require("puppeteer-core"); }

// ─── marca ───
const AZUL = "#4236F6", NAVY = "#003478", GOLD = "#E8B84B", WHITE = "#FFFFFF";
const PAPER = "#F6F3EC", INK = "#0A0A0F", MUTED = "#4A4D59";
const AZUL_DEEP = "#2D22C9"; // franja de las tarjetas azules (un tono más profundo del mismo azul)

// logo principal (wordmark "ACADEMIA / Seúl", vector, fill=currentColor, proporción 2,95:1) → cabecera de todas las
// tarjetas; blanco sobre azul, azul #4236F6 sobre papel. Se fija solo la altura: el ancho sale del viewBox (no se deforma).
const LOGO_SVG = fs.readFileSync(path.join(REPO, "Curriculo/Flashcards/marca/logo_principal.svg"), "utf8")
  .replace(/<\?xml[^>]*>/, "").replace("<svg ", '<svg class="logo" ');
// sello del tigre (vector, fill=currentColor) → solo en la tarjeta 5, cerrando el filete sobre la web
const SELLO_SVG = fs.readFileSync(path.join(REPO, "Curriculo/Flashcards/marca/sello_linea_v2.svg"), "utf8")
  .replace(/<\?xml[^>]*>/, "").replace("<svg ", '<svg class="sello" ');

// ─── datos (deben coincidir con lib/nivel1.ts) ───
const DATA = {
  precio: "US$150 el curso completo · o 2 cuotas de US$75",
  cierre: "domingo 11 de octubre",
  clases: {
    "a11-martes": { dia: "Martes", hora: "20:00", profe: "guiran", primera: "martes 13 de octubre" },
    "a11-jueves": { dia: "Jueves", hora: "20:00", profe: "guiran", primera: "jueves 15 de octubre" },
    a12: { dia: "Miércoles", hora: "21:00", profe: "jay", primera: "miércoles 14 de octubre" },
    a21: { dia: "Martes", hora: "21:00", profe: "abby", primera: "martes 13 de octubre" },
    topik2: { dia: "Jueves", hora: "21:00", profe: "jay", primera: "jueves 15 de octubre", cupos: 8 },
    ninos: { dia: "Lunes", hora: "18:00", profe: "ninos", primera: "lunes 19 de octubre", cupos: 12 }, // tarjeta 4: "Máx. 12 niños"
  },
};

function verificarDatos() {
  const src = fs.readFileSync(path.join(REPO, "lib/nivel1.ts"), "utf8");
  const avisos = [];
  for (const [id, c] of Object.entries(DATA.clases)) {
    const linea = src.split("\n").find((l) => l.includes(`id: "${id}"`) && l.includes("horaChile"));
    if (!linea) { avisos.push(`no encontré la clase ${id} en lib/nivel1.ts`); continue; }
    const campo = (k) => (linea.match(new RegExp(`${k}: "([^"]*)"`)) || [])[1];
    if (campo("dia") !== c.dia) avisos.push(`${id}: día ${campo("dia")} ≠ ${c.dia}`);
    if (campo("horaChile") !== c.hora) avisos.push(`${id}: hora ${campo("horaChile")} ≠ ${c.hora}`);
    if (campo("profeId") !== c.profe) avisos.push(`${id}: profe ${campo("profeId")} ≠ ${c.profe}`);
    if (campo("primeraClase") !== c.primera) avisos.push(`${id}: primera clase ${campo("primeraClase")} ≠ ${c.primera}`);
    if (c.cupos) { const m = linea.match(/cupos: (\d+)/); if (!m || +m[1] !== c.cupos) avisos.push(`${id}: cupos ≠ ${c.cupos}`); }
  }
  if (!/PRECIO_UNICO = 150;/.test(src) || !/PRECIO_MENSUAL = 75;/.test(src)) avisos.push("el precio ya no es US$150 / US$75");
  if (!src.includes(`CIERRE_MATRICULA = "${DATA.cierre}`)) avisos.push(`el cierre de matrícula ya no es "${DATA.cierre}"`);
  if (avisos.length) { console.warn("⚠ lib/nivel1.ts no coincide con el carrusel:\n  - " + avisos.join("\n  - ")); process.exitCode = 2; }
  else console.log("✓ datos verificados contra lib/nivel1.ts");
}

// ─── formatos ───
const FORMATS = {
  "1x1": { w: 1080, h: 1080, cls: "sq" },
  "4x5": { w: 1080, h: 1350, cls: "pt" },
};

const FONTS = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900" +
  "&family=IBM+Plex+Sans:wght@500;600;700&family=IBM+Plex+Mono:wght@500;600" +
  "&family=Noto+Serif+KR:wght@700;900&family=Noto+Sans+KR:wght@700;900&display=block";

const CSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { background: ${PAPER}; }
  body { width: var(--W); height: var(--H); overflow: hidden; color: ${INK};
         font-family: 'IBM Plex Sans', Arial, sans-serif; -webkit-font-smoothing: antialiased;
         font-variant-numeric: lining-nums; }
  .card { position: relative; width: var(--W); height: var(--H); padding: 90px; display: flex; flex-direction: column; background: ${PAPER}; }
  .card::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 16px; background: ${AZUL}; }
  .card.blue { background: ${AZUL}; color: ${WHITE}; }
  .card.blue::before { background: ${NAVY}; }

  .pf { font-family: 'Playfair Display', Georgia, serif; }
  .mono { font-family: 'IBM Plex Mono', monospace; }
  .kr { font-family: 'Noto Sans KR', sans-serif; }
  .krs { font-family: 'Noto Serif KR', serif; }
  .gold { color: ${GOLD}; }
  .azul { color: ${AZUL}; }
  .navy { color: ${NAVY}; }

  /* cabecera: logo principal | etiqueta */
  .head { display: flex; justify-content: space-between; align-items: center; flex: none; height: 88px; }
  .logo { height: 88px; width: auto; aspect-ratio: 732.51 / 248.22; display: block; flex: none; color: ${AZUL}; }
  .blue .logo { color: ${WHITE}; }
  .sello { height: 84px; width: auto; display: block; color: ${AZUL}; }
  .blue .sello { color: ${WHITE}; }
  .tag { font-family: 'IBM Plex Mono', monospace; font-weight: 600; font-size: 34px; letter-spacing: 3px;
         text-transform: uppercase; white-space: nowrap; color: ${AZUL};
         transform: translateY(7px); } /* centrada en el cuerpo de "Seúl", no en la caja del logo (que incluye ACADEMIA) */
  .blue .tag { color: ${GOLD}; }

  /* zona visual que se queda con el aire sobrante, y bloque de texto apoyado abajo */
  .vis { flex: 1; display: flex; align-items: center; justify-content: center; min-height: 0; }
  .txt { flex: none; }

  .h1 { font-family: 'Playfair Display', Georgia, serif; font-weight: 900; line-height: 1.04; letter-spacing: -0.5px; }
  .h1 em { font-style: italic; }
  .lead { font-weight: 600; font-size: 40px; line-height: 1.3; }
  .info { font-weight: 600; font-size: 36px; line-height: 1.35; }
  .rule { height: 3px; background: currentColor; opacity: 1; }
  .card:not(.blue) .rule { background: ${INK}; }
  .card.blue .rule { background: rgba(255,255,255,.55); }
  .nw { white-space: nowrap; }
`;

// ════════════════════════════════════════════════════════════════════════
// Tarjetas
// ════════════════════════════════════════════════════════════════════════
const head = (tag) =>
  `<div class="head">${LOGO_SVG}<div class="tag">${tag}</div></div>`;

// íconos (SVG, sin texto) para la tarjeta de Niños
const ICON = {
  // dado
  juegos: `<svg viewBox="0 0 120 120" aria-hidden="true"><rect x="14" y="14" width="92" height="92" rx="20" fill="${AZUL}"/>
    <circle cx="38" cy="38" r="9" fill="#fff"/><circle cx="82" cy="38" r="9" fill="#fff"/><circle cx="60" cy="60" r="9" fill="#fff"/>
    <circle cx="38" cy="82" r="9" fill="#fff"/><circle cx="82" cy="82" r="9" fill="#fff"/></svg>`,
  // corchea doble
  canciones: `<svg viewBox="0 0 120 120" aria-hidden="true"><path d="M44 30 L98 18 V30 L44 42 Z" fill="${NAVY}"/>
    <rect x="40" y="30" width="8" height="58" fill="${NAVY}"/><rect x="92" y="18" width="8" height="58" fill="${NAVY}"/>
    <ellipse cx="32" cy="90" rx="17" ry="13" transform="rotate(-18 32 90)" fill="${NAVY}"/>
    <ellipse cx="84" cy="78" rx="17" ry="13" transform="rotate(-18 84 78)" fill="${NAVY}"/></svg>`,
  // lápiz de color
  dibujos: `<svg viewBox="0 0 120 120" aria-hidden="true"><g transform="rotate(45 60 60)">
    <rect x="46" y="4" width="28" height="74" rx="4" fill="${GOLD}"/><rect x="46" y="4" width="28" height="14" rx="4" fill="${NAVY}"/>
    <path d="M46 78 H74 L60 108 Z" fill="#F3D9A0"/><path d="M54.5 96 H65.5 L60 108 Z" fill="${NAVY}"/></g></svg>`,
};

const CARDS = [
  // 01 · GANCHO
  {
    n: 1, blue: true,
    css: `
      .c1 .hg { font-family: 'Noto Serif KR', serif; font-weight: 900; line-height: 1; letter-spacing: -6px; color: ${WHITE}; }
      .sq .c1 .hg { font-size: 270px; }  .pt .c1 .hg { font-size: 290px; }
      .c1 .h1 { font-size: 92px; }
      .c1 .lead { margin-top: 30px; }
      .pt .c1 .vis { padding-bottom: 20px; }`,
    body: () => `
      ${head("Octubre 2026")}
      <div class="vis"><div class="hg" lang="ko">한국어</div></div>
      <div class="txt">
        <div class="h1">Aprende coreano<br><em class="gold">con profes coreanos</em></div>
        <div class="lead">Clases en vivo por Zoom<br><span class="gold">desde la semana del 12 de octubre</span></div>
      </div>`,
  },
  // 02 · BÁSICO 1
  {
    n: 2,
    css: `
      .c2 .eq { display: flex; align-items: flex-start; gap: 26px; font-family: 'Noto Sans KR', sans-serif; font-weight: 900; line-height: 1; }
      .c2 .eq .j { color: ${NAVY}; }
      .c2 .eq .op { font-family: 'IBM Plex Sans', sans-serif; font-weight: 500; color: ${MUTED}; }
      .c2 .eq .s { color: ${AZUL}; }
      .c2 .eq .col { display: flex; flex-direction: column; align-items: center; }
      .c2 .eq .col > span { display: flex; align-items: center; justify-content: center; }
      .sq .c2 .eq .col > span { height: 190px; }  .pt .c2 .eq .col > span { height: 210px; }
      .c2 .eq .col i { font-family: 'IBM Plex Mono', monospace; font-style: normal; font-weight: 600; font-size: 54px; color: ${MUTED}; margin-top: 16px; line-height: 1; }
      .pt .c2 .eq .col i { font-size: 60px; margin-top: 20px; }
      .c2 .eq .col i.azul { color: ${AZUL}; }
      .sq .c2 .eq { font-size: 190px; } .pt .c2 .eq { font-size: 210px; }
      .sq .c2 .eq .op { font-size: 120px; } .pt .c2 .eq .op { font-size: 130px; }
      .c2 .h1 { font-size: 90px; }  .pt .c2 .h1 { font-size: 118px; }
      .c2 .h1 .br { display: none; }  .pt .c2 .h1 .br { display: inline; }
      .c2 .lead { margin-top: 18px; }
      .c2 .lead .kr { font-weight: 700; }
      .c2 .rule { margin: 34px 0 24px; }
      .pt .c2 .rule { margin: 40px 0 28px; }`,
    body: () => `
      ${head("Básico 1 · A1.1")}
      <div class="vis"><div class="eq"><div class="col"><span class="j" lang="ko">ㄱ</span><i>g</i></div><div class="col"><span class="op">+</span><i>&nbsp;</i></div><div class="col"><span class="j" lang="ko">ㅏ</span><i>a</i></div><div class="col"><span class="op">=</span><i>&nbsp;</i></div><div class="col"><span class="s" lang="ko">가</span><i class="azul">ga</i></div></div></div>
      <div class="txt">
        <div class="h1">Coreano<br class="br"> desde <em class="azul">cero</em></div>
        <div class="lead">En 8 semanas lees <span class="kr" lang="ko">한글</span><br>y te presentas en coreano.</div>
        <div class="rule"></div>
        <div class="info">Martes o jueves 20:00 (hora de Chile) · con Kiran</div>
        <div class="info">Empieza el <span class="azul">13 o el 15 de octubre</span></div>
      </div>`,
  },
  // 03 · ¿YA SABES ALGO?
  {
    n: 3, blue: true,
    css: `
      .c3 .txt, .c3 .vis, .c3 > .info { text-align: center; }
      .c3 .h1 { font-size: 80px; margin-top: 44px; }  .pt .c3 .h1 { font-size: 92px; margin-top: 64px; }
      .c3 .vis { flex-direction: column; align-items: stretch; justify-content: center; padding: 26px 0; }
      .c3 .row { padding: 16px 0 18px; border-top: 2px solid rgba(255,255,255,.5); }
      .c3 .row:last-child { border-bottom: 2px solid rgba(255,255,255,.5); }
      .pt .c3 .row { padding: 28px 0 30px; }
      .c3 .cn { font-family: 'Playfair Display', Georgia, serif; font-weight: 900; font-size: 56px; line-height: 1.08; white-space: nowrap; }
      .pt .c3 .cn { font-size: 62px; }
      .c3 .lv { font-family: 'IBM Plex Mono', monospace; font-weight: 600; font-size: 34px; color: ${GOLD}; margin-left: 18px; letter-spacing: 1px; }
      .c3 .when { font-weight: 600; font-size: 36px; line-height: 1.3; margin-top: 6px; white-space: nowrap; }
      .pt .c3 .when { font-size: 38px; margin-top: 8px; }
      .c3 .info { font-size: 34px; font-weight: 500; }`,
    body: () => `
      ${head("A1.2 · A2.1 · B1+")}
      <div class="txt"><div class="h1">¿Ya sabes algo<br>de <em class="gold">coreano</em>?</div></div>
      <div class="vis">
        <div class="row"><div class="cn">Básico 2<span class="lv">A1.2</span></div><div class="when">Miércoles 21:00 · con Jay</div></div>
        <div class="row"><div class="cn">Conversacional 1<span class="lv">A2.1</span></div><div class="when">Martes 21:00 · con Abby · en coreano</div></div>
        <div class="row"><div class="cn">TOPIK II<span class="lv">B1+</span></div><div class="when">Jueves 21:00 · con Jay · máx. 8 alumnos</div></div>
      </div>
      <div class="info">Hora de Chile · desde la semana del 12 de octubre</div>`,
  },
  // 04 · NIÑOS
  {
    n: 4,
    css: `
      .c4 .vis { flex-direction: column; gap: 34px; }
      .c4 .hi { display: flex; align-items: baseline; gap: 26px; }
      .c4 .hi .kr { font-weight: 900; color: ${AZUL}; line-height: 1; letter-spacing: -4px; }
      .sq .c4 .hi .kr { font-size: 200px; } .pt .c4 .hi .kr { font-size: 270px; }
      .c4 .hi .gl { font-family: 'Playfair Display', Georgia, serif; font-style: italic; font-weight: 700; font-size: 52px; color: ${NAVY}; }
      .pt .c4 .hi .gl { font-size: 62px; }
      .c4 .icons { display: flex; gap: 64px; }
      .c4 .icons div { display: flex; align-items: center; gap: 14px; font-weight: 600; font-size: 38px; }
      .c4 .icons svg { width: 72px; height: 72px; flex: none; }
      .c4 .icons { gap: 54px; }
      .pt .c4 .icons div { font-size: 40px; }
      .pt .c4 .icons svg { width: 88px; height: 88px; }
      .pt .c4 .vis { gap: 48px; }
      .c4 .h1 { font-size: 96px; }
      .c4 .ages { font-family: 'Playfair Display', Georgia, serif; font-style: italic; font-weight: 700; font-size: 64px; color: ${AZUL}; line-height: 1.1; margin-top: 4px; }
      .c4 .rule { margin: 30px 0 22px; }
      .pt .c4 .rule { margin: 36px 0 26px; }`,
    body: () => `
      ${head("Máx. 12 niños")}
      <div class="vis">
        <div class="hi"><span class="kr" lang="ko">안녕!</span><span class="gl">¡hola!</span></div>
        <div class="icons"><div>${ICON.juegos}juegos</div><div>${ICON.canciones}canciones</div><div>${ICON.dibujos}dibujos</div></div>
      </div>
      <div class="txt">
        <div class="h1">Coreano para Niños</div>
        <div class="ages">de 8 a 15 años</div>
        <div class="rule"></div>
        <div class="info">Lunes 18:00 (hora de Chile) · desde el <span class="azul">19 de octubre</span></div>
        <div class="info">Con Jay y Abby, profes coreanos</div>
      </div>`,
  },
  // 05 · CIERRE
  {
    n: 5, blue: true,
    css: `
      .c5 .vis { flex-direction: column; align-items: flex-start; justify-content: center; }
      .c5 .feat { font-weight: 600; font-size: 38px; white-space: nowrap; }
      .pt .c5 .feat { font-size: 40px; }
      .c5 .price { display: flex; align-items: center; gap: 30px; margin-top: 30px; }
      .c5 .price .big { font-family: 'Playfair Display', Georgia, serif; font-weight: 900; color: ${GOLD}; line-height: 0.95; letter-spacing: -2px; }
      .sq .c5 .price .big { font-size: 172px; } .pt .c5 .price .big { font-size: 250px; }
      .pt .c5 .price { flex-direction: column; align-items: flex-start; gap: 42px; margin-top: 36px; }
      .pt .c5 .price .side { font-size: 64px; }  .pt .c5 .price .side br { display: none; }
      .c5 .price .side { font-family: 'Playfair Display', Georgia, serif; font-weight: 700; font-size: 50px; line-height: 1.08; }
      .c5 .cuotas { font-family: 'Playfair Display', Georgia, serif; font-weight: 700; font-size: 64px; line-height: 1.1; margin-top: 12px; }
      .pt .c5 .cuotas { font-size: 68px; }
      .c5 .sealrule { display: flex; align-items: center; gap: 24px; margin: 0 0 22px; }
      .pt .c5 .sealrule { margin: 0 0 28px; }
      .c5 .sealrule .rule { flex: 1; }
      .c5 .sealrule .sello { height: 72px; }
      .c5 .dl { font-weight: 600; font-size: 40px; line-height: 1.3; }
      .c5 .go { font-weight: 600; font-size: 40px; line-height: 1.3; margin-top: 18px; }
      .c5 .web { font-family: 'Playfair Display', Georgia, serif; font-weight: 900; font-size: 64px; white-space: nowrap; line-height: 1.34; letter-spacing: -0.5px; margin-top: -8px; }`,
    body: () => `
      ${head("Matrícula abierta")}
      <div class="vis">
        <div class="feat">8 semanas · en vivo por Zoom · certificado</div>
        <div class="price"><div class="big">US$150</div><div class="side">el curso<br> completo</div></div>
        <div class="cuotas">o 2 cuotas de <span class="gold">US$75</span></div>
      </div>
      <div class="txt">
        <div class="sealrule"><div class="rule"></div>${SELLO_SVG}</div>
        <div class="dl">Matrícula hasta el <span class="gold nw">domingo 11 de octubre</span></div>
        <div class="go">Inscríbete en</div>
        <div class="web">academiaseul.com/inscribete</div>
      </div>`,
  },
];

function doc(card, fmt) {
  const F = FORMATS[fmt];
  return `<!doctype html><html lang="es"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<style>:root{--W:${F.w}px;--H:${F.h}px}${CSS}${card.css}</style></head>
<body class="${F.cls}"><div class="card c${card.n}${card.blue ? " blue" : ""}">${card.body()}</div></body></html>`;
}

// control automático: fuentes cargadas, textos dentro del margen seguro de 90 px, nada desbordado ni solapado,
// tamaños mínimos (texto ≥ 34 px), píxeles rojizos
async function revisar(page, W, H) {
  return page.evaluate(async (W, H) => {
    const out = [];
    const fam = ["Playfair Display", "IBM Plex Sans", "IBM Plex Mono", "Noto Serif KR", "Noto Sans KR"];
    for (const f of fam) {
      const used = [...document.querySelectorAll("*")].some((el) => getComputedStyle(el).fontFamily.includes(f));
      if (used && !document.fonts.check(`700 40px "${f}"`, "가A")) out.push(`fuente sin cargar: ${f}`);
    }
    const M = 90;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const range = document.createRange();
    let node;
    while ((node = walker.nextNode())) {
      if (!node.textContent.trim()) continue;
      range.selectNodeContents(node);
      const el = node.parentElement;
      const fs = parseFloat(getComputedStyle(el).fontSize);
      if (fs < 34) out.push(`texto de ${fs}px: "${node.textContent.trim().slice(0, 30)}"`);
      for (const r of range.getClientRects()) {
        if (r.left < M - 1 || r.right > W - M + 1 || r.top < M - 1 || r.bottom > H - M + 1)
          out.push(`fuera del margen (${Math.round(r.left)},${Math.round(r.top)}–${Math.round(r.right)},${Math.round(r.bottom)}): "${node.textContent.trim().slice(0, 30)}"`);
      }
    }
    document.querySelectorAll(".card *").forEach((el) => {
      if (el.closest("svg")) return;
      if (el.scrollWidth > el.clientWidth + 2 && getComputedStyle(el).overflow !== "visible")
        out.push(`desborda: .${el.className}`);
    });
    // bloques de primer nivel sin solaparse
    const kids = [...document.querySelector(".card").children].map((e) => [e, e.getBoundingClientRect()]);
    for (let i = 1; i < kids.length; i++) {
      // la altura útil del contenido (no la caja flex) para .vis
      const prev = kids[i - 1][1], cur = kids[i][1];
      if (cur.top < prev.bottom - 1) out.push(`solape entre bloques ${i} y ${i + 1}`);
    }
    const vis = document.querySelector(".vis");
    if (vis && vis.scrollHeight > vis.clientHeight + 2) out.push(`la zona visual no cabe (${vis.scrollHeight} > ${vis.clientHeight})`);
    return out;
  }, W, H);
}

async function rojizos(page, png) {
  return page.evaluate(async (b64) => {
    const img = new Image();
    img.src = "data:image/png;base64," + b64;
    await img.decode();
    const c = document.createElement("canvas");
    c.width = img.width; c.height = img.height;
    const ctx = c.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const d = ctx.getImageData(0, 0, c.width, c.height).data;
    let n = 0;
    for (let i = 0; i < d.length; i += 4) {
      const r = d[i], g = d[i + 1], b = d[i + 2];
      if (r > 150 && r - g > 70 && r - b > 50 && !(g > 120 && b < 110)) n++; // rojo/rosado (excluye oro)
    }
    return n;
  }, Buffer.from(png).toString("base64"));
}

async function main() {
  verificarDatos();
  const filtro = process.argv.slice(2);
  const browser = await puppeteer.launch({
    executablePath: CHROME, headless: true,
    args: ["--disable-lcd-text", "--font-render-hinting=none", "--force-color-profile=srgb", "--hide-scrollbars"],
  });
  const page = await browser.newPage();
  let problemas = 0;
  for (const fmt of Object.keys(FORMATS)) {
    const F = FORMATS[fmt];
    fs.mkdirSync(path.join(OUT, fmt), { recursive: true });
    await page.setViewport({ width: F.w, height: F.h, deviceScaleFactor: 1 });
    for (const card of CARDS) {
      const name = `anuncio_${String(card.n).padStart(2, "0")}.png`;
      if (filtro.length && !filtro.some((f) => name.includes(f))) continue;
      await page.setContent(doc(card, fmt), { waitUntil: "load", timeout: 90000 });
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all(["Playfair Display", "IBM Plex Sans", "IBM Plex Mono", "Noto Serif KR", "Noto Sans KR"]
          .flatMap((f) => [400, 500, 600, 700, 900].map((w) => document.fonts.load(`${w} 40px "${f}"`, "Aa가한국어ㄱㅏ안녕"))));
        await document.fonts.ready;
      });
      const file = path.join(OUT, fmt, name);
      const png = await page.screenshot({ path: file, type: "png" });
      const p = await revisar(page, F.w, F.h);
      const red = await rojizos(page, png);
      if (red > 50) p.push(`${red} píxeles rojizos`);
      problemas += p.length;
      console.log(`${p.length ? "⚠" : "✓"} ${fmt}/${name}${p.length ? "\n    - " + p.join("\n    - ") : ""}`);
    }
  }

  if (!filtro.length) {
    // hoja de contacto: fila 1x1 y fila 4x5
    const tw = 340, gap = 24, pad = 48;
    const img = (fmt, n) => "data:image/png;base64," + fs.readFileSync(path.join(OUT, fmt, `anuncio_0${n}.png`)).toString("base64");
    const fila = (fmt) => `<div class="lab">${fmt === "1x1" ? "1:1 · 1080×1080 (todas las ubicaciones)" : "4:5 · 1080×1350 (feed de Instagram)"}</div>
      <div class="row">${[1, 2, 3, 4, 5].map((n) => `<div class="cell"><img src="${img(fmt, n)}"><span>${n}</span></div>`).join("")}</div>`;
    const sheetW = pad * 2 + tw * 5 + gap * 4;
    const html = `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="${FONTS}"><style>
      body { margin: 0; background: #E9E6DE; font-family: 'IBM Plex Mono', monospace; color: ${INK}; width: ${sheetW}px; }
      .wrap { padding: ${pad}px; }
      h1 { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 40px; margin: 0 0 6px; }
      h1 em { color: ${AZUL}; }
      .sub { font-size: 18px; color: ${MUTED}; margin-bottom: 26px; letter-spacing: 1px; }
      .lab { font-size: 18px; letter-spacing: 2px; text-transform: uppercase; color: ${AZUL}; font-weight: 600; margin: 18px 0 12px; }
      .row { display: flex; gap: ${gap}px; align-items: flex-start; }
      .cell { width: ${tw}px; position: relative; }
      .cell img { width: ${tw}px; display: block; box-shadow: 0 2px 10px rgba(0,0,0,.18); }
      .cell span { position: absolute; top: -10px; left: -10px; background: ${INK}; color: #fff; font-size: 16px; font-weight: 600; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
    </style></head><body><div class="wrap">
      <h1>Carrusel para anuncio · <em>cohorte octubre 2026</em></h1>
      <div class="sub">ACADEMIA SEÚL · META (FACEBOOK + INSTAGRAM) · MINIATURAS A ${Math.round((tw / 1080) * 100)} %</div>
      ${fila("1x1")}${fila("4x5")}</div></body></html>`;
    await page.setViewport({ width: sheetW, height: 400, deviceScaleFactor: 1 });
    await page.setContent(html, { waitUntil: "load", timeout: 90000 });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(OUT, "vista_previa.png"), fullPage: true });
    console.log(`✓ vista_previa.png`);
  }
  await browser.close();
  console.log(problemas ? `\n${problemas} aviso(s) del control automático` : "\nControl automático: sin avisos");
}

main().catch((e) => { console.error(e); process.exit(1); });
