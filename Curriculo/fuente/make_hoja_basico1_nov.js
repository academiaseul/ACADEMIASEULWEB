// Hoja de venta de una página · Básico 1 · Coreano desde cero con Kiran · desde el martes 10 de noviembre de 2026.
// Campaña «Básico 1 · noviembre 2026» (decisiones de Jay, lun 26 oct 2026): un solo curso, una fecha, un botón.
// Base: Curriculo/fuente/make_hoja_resumen.js (misma casa: US Letter, Arial + Malgun Gothic, azul #4236F6,
// navy #003478, oro #E8B84B; nunca rojo, rosado, coral ni magenta).
// Datos: brief de la campaña (fecha, ritmo, precio, profesora) + Curriculo/Fase2_Basico1/00_Diseno_Basico1.md (las 8 clases).
// Sin datos personales: solo Kiran (profesora; la foto sale de la portada del reel ya publicado) y el WhatsApp de la academia.
// En lo público no va fecha de término: «8 martes desde el 10 de noviembre».
//
// Uso (desde cualquier carpeta; toma puppeteer-core y qrcode del node_modules del scratchpad):
//   node Curriculo/fuente/make_hoja_basico1_nov.js
//   (también con NODE_PATH=<scratchpad>/node_modules; AS_SCRATCH=<scratchpad> cambia la carpeta del scratchpad)
// Salida: Curriculo/publico/Hoja_Basico1_Noviembre_2026.pdf (1 página carta, con links) y .png (1632×2112, WhatsApp/Instagram).
// Letra mínima 13 px (en la hoja de 816 px) para que se lea en el celular al hacer zoom; ~24 px libres arriba y abajo
// para que, si Instagram la recorta a 4:5, no se pierda texto.
const fs = require("fs");
const path = require("path");

const SCRATCH = process.env.AS_SCRATCH ||
  "C:\\Users\\Chingu\\AppData\\Local\\Temp\\claude\\C--Users-Chingu-Desktop-ACADEMIASEULWEB\\d4111e1b-5523-44ea-97b2-b1a1d9545b9e\\scratchpad";
const req = (m) => { try { return require(m); } catch (e) { return require("module").createRequire(path.join(SCRATCH, "package.json"))(m); } };
const puppeteer = req("puppeteer-core");
const QRCode = req("qrcode");

const REPO = path.resolve(__dirname, "..", "..");
const OUT = path.join(REPO, "Curriculo", "publico");
const NOMBRE = "Hoja_Basico1_Noviembre_2026";
const TMP = path.join(SCRATCH, "b1nov", "hoja");
fs.mkdirSync(TMP, { recursive: true });

// Marca en vector (fill="currentColor"): Curriculo/Flashcards/marca/ (logo principal y sello del tigre v2 sin marco).
const svgMarca = (f) => fs.readFileSync(path.join(REPO, "Curriculo", "Flashcards", "marca", f), "utf8")
  .replace(/^<svg /, '<svg preserveAspectRatio="xMidYMid meet" ');
const LOGO_SVG = svgMarca("logo_principal.svg");
const SELLO_SVG = svgMarca("sello_linea_v2.svg");
// Foto de Kiran: portada del reel ya publicado; al generar se recorta un cuadrado de la cara.
const FOTO_KIRAN = path.join(REPO, "Campana_Assets", "instagram", "octubre", "reels", "kiran", "Reel_Kiran_portada.png");
const RECORTE = { x: 255, y: 440, lado: 560, salida: 360 }; // en píxeles del PNG 1080×1920

const URL_INSCRIPCION = "https://academiaseul.com/inscribete?clase=a11-martes"; // redirect 307 → /nivel-1?clase=a11-martes
const URL_INSCRIPCION_TXT = "academiaseul.com/inscribete";
const URL_WHATSAPP = "https://wa.me/56942115562?text=" +
  encodeURIComponent("Hola Jay, quiero inscribirme en Básico 1 con el precio de lanzamiento");
const URL_RECURSOS = "https://www.academiaseul.com/recursos";

// ---- contenido (brief del 26 oct 2026 + diseño de Básico 1: 가나다라 I–II y lecciones 1–9 de 한글학교 한국어 1) ----
// Las 8 clases: lo que logras, una frase modelo en coreano y su traducción.
const CLASES = [
  { que: "Lees 한글: vocales y consonantes", kr: "가 나 다 라 마", es: "Romanización solo en las clases 1 y 2." },
  { que: "Completas el alfabeto y te presentas", kr: "안녕하세요! 저는 마리아예요.", es: "¡Hola! Soy María." },
  { que: "Preguntas «¿qué es esto?» y respondes", kr: "이게 뭐예요? 빵이에요.", es: "¿Qué es esto? Es pan." },
  { que: "Presentas a tu familia y cuentas", kr: "우리 엄마예요.", es: "Es mi mamá." },
  { que: "Dices dónde están los lugares y las cosas", kr: "화장실이 어디예요?", es: "¿Dónde está el baño?" },
  // 회사 (no 학교 = escuela): es la frase clave de la clase 6 y la misma del carrusel (lámina 4).
  { que: "Cuentas a dónde vas cada día", kr: "매일 회사에 가요.", es: "Voy a la oficina todos los días." },
  { que: "Describes tu pieza y lo que haces", kr: "방에 침대가 있어요.", es: "En mi pieza hay una cama." },
  { que: "Dices lo que te gusta y presentas «Yo en coreano»", kr: "커피를 좋아해요.", es: "Me gusta el café." },
];

// Martes 20:00 en Chile (UTC-3 todo el curso). Desde el 10 nov EE.UU. (1 nov) y España (25 oct) ya cambiaron de hora.
const HORAS = [
  ["Chile · Argentina · Uruguay", "20:00"],
  ["Venezuela · Bolivia", "19:00"],
  ["Colombia · Perú · Ecuador", "18:00"],
  ["EE.UU. (hora del Este)", "18:00"],
  ["México (CDMX)", "17:00"],
  ["España", "00:00 <small>(mié)</small>"],
  ["Corea", "08:00 <small>(mié)</small>"],
];

const INCLUYE = [
  "8 clases en vivo por Zoom",
  "Grabación de cada clase",
  "Material semanal con audio nativo",
  "Grupo de WhatsApp del curso",
  "Certificado incluido",
];

// ---- iconos (SVG en línea) ----
const ICON = {
  check: '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="#4236F6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  clock: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  cal: '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
  wa: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5z"/></svg>',
};

function html({ qr, foto }) {
  const filas = CLASES.map((c, i) => `
      <li><span class="n">${i + 1}</span><div class="t"><b>${c.que}</b>
        <span class="ej"><span class="kr">${c.kr}</span>${c.es ? ` <span class="es">${c.es}</span>` : ""}</span></div></li>`).join("");
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Academia Seúl · Básico 1 con Kiran · desde el martes 10 de noviembre</title>
<style>
  @page { size: Letter; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root { --azul: #4236F6; --navy: #003478; --ink: #1B1C24; --grey: #50535F; --tint: #EEF1F6; --line: #D5DAE4; --oro: #E8B84B; --orotint: #FBF3DF; }
  html, body { width: 8.5in; height: 11in; }
  body { font-family: Arial, "Malgun Gothic", sans-serif; color: var(--ink); background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; overflow: hidden; }
  .kr { font-family: "Malgun Gothic", Arial, sans-serif; }
  .page { position: relative; width: 8.5in; height: 11in; display: flex; flex-direction: column; }
  a { color: inherit; text-decoration: none; }

  /* ---- cabecera: curso + fecha (izq.) y Kiran (der.) ---- */
  header { flex: none; background: var(--azul); color: #fff; padding: 21px 36px 17px; position: relative; overflow: hidden; display: flex; justify-content: space-between; align-items: center; gap: 18px; }
  header .sello { position: absolute; left: 330px; top: -54px; width: 300px; height: 290px; color: #fff; opacity: .1; }
  header .sello svg, header .logo svg { width: 100%; height: 100%; display: block; }
  .hl { position: relative; }
  .h-top { display: flex; align-items: center; gap: 12px; }
  header .logo { width: 106px; height: 36px; color: #fff; flex: none; }
  .lvl { font-size: 13px; font-weight: bold; letter-spacing: 1px; border: 2px solid rgba(255,255,255,.8); border-radius: 99px; padding: 4px 10px; white-space: nowrap; }
  .kicker { font-size: 15px; color: #E3E1FF; white-space: nowrap; }
  .kicker .kr { color: #fff; font-weight: bold; }
  header h1 { font-size: 50px; line-height: 1; letter-spacing: -1px; margin-top: 9px; }
  header .h1b { font-size: 28px; font-weight: bold; line-height: 1.1; margin-top: 3px; }
  .inicio { display: inline-flex; align-items: center; gap: 8px; margin-top: 11px; white-space: nowrap; background: #fff; color: var(--navy); border-radius: 10px; padding: 7px 14px; font-size: 18px; font-weight: bold; box-shadow: 0 4px 14px rgba(0,0,0,.18); }
  .inicio svg { color: var(--azul); flex: none; }
  .inicio span { color: var(--azul); }
  .hr { position: relative; flex: none; width: 190px; text-align: center; }
  .hr .foto { width: 104px; height: 104px; margin: 0 auto; border-radius: 50%; overflow: hidden; border: 4px solid #fff; box-shadow: 0 4px 14px rgba(0,0,0,.22); }
  .hr .foto img { width: 100%; height: 100%; display: block; }
  .hr .rol { font-size: 12.5px; font-weight: bold; letter-spacing: 1.4px; color: #E3E1FF; margin-top: 7px; }
  .hr .nom { font-size: 21px; font-weight: bold; margin-top: 1px; }
  .hr .bio { font-size: 13.5px; color: #E3E1FF; line-height: 1.3; margin-top: 3px; }

  main { flex: 1; padding: 13px 36px 0; display: flex; flex-direction: column; gap: 10px; }
  .cols { display: grid; grid-template-columns: 1fr 282px; gap: 12px; }
  .box { border: 1px solid var(--line); border-radius: 12px; padding: 11px 16px; }
  h2 { font-size: 21px; color: var(--navy); line-height: 1.1; }
  h4 { font-size: 15px; letter-spacing: .6px; color: var(--navy); }

  /* ---- las 8 clases ---- */
  .logros { border-top: 5px solid var(--azul); padding-bottom: 10px; }
  .logros ol { list-style: none; margin-top: 6px; }
  .logros li { display: flex; gap: 10px; align-items: flex-start; padding: 2.5px 0; }
  .logros li + li { border-top: 1px dashed var(--line); }
  .logros .n { flex: none; width: 25px; height: 25px; border-radius: 50%; background: var(--azul); color: #fff; font-size: 14px; font-weight: bold; display: flex; align-items: center; justify-content: center; margin-top: 2px; }
  .logros .t b { display: block; font-size: 15.5px; line-height: 1.22; }
  .logros .ej { display: block; font-size: 14px; line-height: 1.3; margin-top: 1px; }
  .logros .ej .kr { color: var(--azul); font-weight: bold; font-size: 15px; }
  .logros .ej .es { color: var(--grey); }
  .logros .pie { margin-top: 5px; padding: 6px 11px; background: var(--tint); border-radius: 8px; font-size: 14px; line-height: 1.32; }
  .logros .pie b { color: var(--navy); }

  /* ---- columna derecha: horario + incluye ---- */
  .side { display: flex; flex-direction: column; gap: 12px; }
  .horas { border-top: 5px solid var(--oro); }
  .horas .big { display: flex; gap: 7px; align-items: center; font-size: 22px; font-weight: bold; color: var(--navy); }
  .horas .big svg { color: var(--azul); }
  .horas .sub { font-size: 14px; color: var(--ink); margin-top: 3px; line-height: 1.3; }
  .horas .sub b { color: var(--navy); }
  .horas table { width: 100%; border-collapse: collapse; margin-top: 7px; }
  .horas td { font-size: 13.5px; padding: 3px 0; border-top: 1px solid var(--line); line-height: 1.2; }
  .horas td.h { font-weight: bold; color: var(--navy); white-space: nowrap; text-align: right; padding-left: 6px; font-size: 14.5px; }
  .horas td.h small { font-weight: normal; font-size: 13px; color: var(--grey); }
  .horas tr:first-child td { background: var(--tint); }
  .horas tr:first-child td:first-child { padding-left: 6px; border-radius: 6px 0 0 6px; }
  .horas tr:first-child td:last-child { padding-right: 6px; border-radius: 0 6px 6px 0; }
  .horas tr:first-child td, .horas tr:nth-child(2) td { border-top: none; }
  .incl { flex: 1; display: flex; flex-direction: column; }
  .incl ul { list-style: none; margin-top: 3px; }
  .incl li { display: flex; gap: 7px; align-items: center; font-size: 14.5px; margin-top: 4px; line-height: 1.2; }
  .incl li svg { flex: none; }
  .incl .pago { margin-top: auto; padding-top: 7px; border-top: 1px dashed var(--line); font-size: 13px; color: var(--grey); line-height: 1.3; }
  .incl ul + .pago { margin-top: 9px; }

  /* ---- precio ---- */
  .precio { display: grid; grid-template-columns: 1fr 262px; border: 2px solid var(--oro); border-radius: 12px; overflow: hidden; }
  .lanz { background: var(--orotint); padding: 11px 18px 12px; }
  .lanz .tag { display: inline-block; background: var(--oro); color: var(--navy); font-size: 13.5px; font-weight: bold; letter-spacing: 1px; border-radius: 99px; padding: 4px 12px; }
  .lanz .row { display: flex; align-items: center; gap: 12px; margin-top: 6px; }
  .lanz .antes { font-size: 22px; color: var(--grey); text-decoration: line-through; text-decoration-thickness: 2px; }
  .lanz .ahora { font-size: 42px; font-weight: bold; color: var(--navy); line-height: 1; letter-spacing: -.5px; }
  .lanz .que { font-size: 17px; font-weight: bold; color: var(--navy); line-height: 1.2; }
  .lanz .hasta { font-size: 15.5px; margin-top: 6px; color: var(--ink); }
  .lanz .hasta b { color: var(--azul); }
  .lanz .clp { font-size: 14px; color: var(--grey); margin-top: 3px; }
  .normal { padding: 12px 16px; border-left: 2px dashed var(--oro); display: flex; flex-direction: column; justify-content: center; }
  .normal .k { font-size: 13px; font-weight: bold; letter-spacing: .8px; color: var(--grey); line-height: 1.3; }
  .normal .v { font-size: 16.5px; font-weight: bold; color: var(--navy); margin-top: 5px; line-height: 1.25; }
  .normal .clp { font-size: 14px; color: var(--grey); margin-top: 5px; line-height: 1.3; }

  /* ---- inscripción ---- */
  .cta { background: var(--navy); color: #fff; border: none; display: flex; gap: 18px; align-items: center; padding: 13px 16px; }
  .cta .code { background: #fff; padding: 7px; border-radius: 8px; width: 114px; height: 114px; flex: none; display: block; }
  .cta .code svg { width: 100%; height: 100%; display: block; }
  .cta .mid { flex: 1; }
  .cta h4 { color: #fff; }
  .cta .url { display: block; font-size: 25px; font-weight: bold; line-height: 1.15; margin-top: 3px; }
  .cta .scan { font-size: 14px; color: #CFD8EA; margin-top: 3px; line-height: 1.3; }
  .cta .wa { display: flex; gap: 7px; align-items: center; font-size: 16px; color: #fff; margin-top: 9px; }
  .cta .wa b { font-size: 17px; }
  .cta .cierre { flex: none; width: 178px; align-self: stretch; background: var(--oro); color: var(--navy); border-radius: 9px; padding: 10px 12px; text-align: center; display: flex; flex-direction: column; justify-content: center; }
  .cta .cierre .k { font-size: 12.5px; font-weight: bold; letter-spacing: 1px; }
  .cta .cierre .v { font-size: 19px; font-weight: bold; line-height: 1.15; margin-top: 4px; }
  .cta .cierre .s { font-size: 13px; margin-top: 4px; line-height: 1.25; }

  footer { flex: none; padding: 9px 36px 26px; font-size: 13px; color: var(--grey); line-height: 1.35; display: flex; justify-content: space-between; gap: 14px; align-items: flex-end; }
  footer b { color: var(--navy); }
  footer .r { text-align: right; white-space: nowrap; }
</style></head><body><div class="page">
  <header>
    <div class="sello">${SELLO_SVG}</div>
    <div class="hl">
      <div class="h-top"><div class="logo">${LOGO_SVG}</div><span class="lvl">A1.1 · DESDE CERO</span><span class="kicker">Primeras Palabras · <span class="kr">첫 한국어</span></span></div>
      <h1>Básico 1</h1>
      <div class="h1b">Coreano desde cero con Kiran</div>
      <div class="inicio">${ICON.cal}Desde el martes 10 de noviembre</div>
    </div>
    <div class="hr">
      <div class="foto"><img src="${foto}" alt="Kiran, profesora de Básico 1"></div>
      <div class="rol">TU PROFESORA</div>
      <div class="nom">Kiran · <span class="kr">기란</span></div>
      <div class="bio">Coreana criada en Argentina</div>
    </div>
  </header>

  <main>
    <div class="cols">
      <div class="box logros">
        <h2>Qué vas a lograr en 8 clases</h2>
        <ol>${filas}</ol>
        <div class="pie"><b>Proyecto final:</b> hablas de ti 1 a 2 minutos, sin leer.</div>
      </div>
      <div class="side">
        <div class="box horas">
          <div class="big">${ICON.clock} Martes 20:00</div>
          <div class="sub">hora de Chile · 60 min por Zoom<br><b>8 martes desde el 10 de noviembre</b></div>
          <table>${HORAS.map(([p, h]) => `<tr><td>${p}</td><td class="h">${h}</td></tr>`).join("")}</table>
        </div>
        <div class="box incl">
          <h4>INCLUYE</h4>
          <ul>${INCLUYE.map((i) => `<li>${ICON.check}<span>${i}</span></li>`).join("")}</ul>
          <div class="pago">Transferencia, Mercado Pago o PayPal.</div>
        </div>
      </div>
    </div>

    <div class="precio">
      <div class="lanz">
        <span class="tag">PRECIO DE LANZAMIENTO · −20 %</span>
        <div class="row"><span class="antes">US$150</span><span class="ahora">US$120</span><span class="que">el curso completo ·<br>o 2 cuotas de US$60</span></div>
        <div class="hasta">Hasta el <b>domingo 8 de noviembre</b> (23:59, hora de Chile)</div>
        <div class="clp">En pesos chilenos: $120.000 · o 2 cuotas de $60.000</div>
      </div>
      <div class="normal">
        <div class="k">PRECIO NORMAL, DESDE EL LUNES 9 DE NOVIEMBRE</div>
        <div class="v">US$150 el curso completo ·<br>o 2 cuotas de US$75</div>
        <div class="clp">$150.000 · o 2 cuotas de $75.000</div>
      </div>
    </div>

    <div class="box cta">
      <a class="code" href="${URL_INSCRIPCION}">${qr}</a>
      <div class="mid">
        <h4>INSCRÍBETE</h4>
        <a class="url" href="${URL_INSCRIPCION}">${URL_INSCRIPCION_TXT}</a>
        <div class="scan">Escanea el código: te lleva directo a la clase del martes.</div>
        <a class="wa" href="${URL_WHATSAPP}">${ICON.wa}<span>o escríbenos por WhatsApp <b>+56 9 4211 5562</b></span></a>
      </div>
      <div class="cierre"><div class="k">INSCRIPCIONES</div><div class="v">hasta el lunes 9 de noviembre</div><div class="s">o hasta llenar los cupos</div></div>
    </div>
  </main>

  <footer>
    <div><b>Gratis:</b> Lector de Hangul, Dubu y la clase grabada en <a href="${URL_RECURSOS}"><b>academiaseul.com/recursos</b></a></div>
    <div class="r"><a href="https://www.instagram.com/academiaseul">@academiaseul</a> · <a href="https://www.instagram.com/jaychingu.oficial">@jaychingu.oficial</a></div>
  </footer>
</div></body></html>`;
}

async function recortarFoto(browser) {
  const page = await browser.newPage();
  const src = "data:image/png;base64," + fs.readFileSync(FOTO_KIRAN).toString("base64");
  await page.setContent(`<img id="i" src="${src}">`, { waitUntil: "load" });
  const data = await page.evaluate(({ x, y, lado, salida }) => {
    const img = document.getElementById("i");
    const c = document.createElement("canvas"); c.width = salida; c.height = salida;
    c.getContext("2d").drawImage(img, x, y, lado, lado, 0, 0, salida, salida);
    return c.toDataURL("image/jpeg", 0.9);
  }, RECORTE);
  await page.close();
  return data;
}

async function main() {
  const qr = await QRCode.toString(URL_INSCRIPCION, { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark: "#003478", light: "#FFFFFF" } });
  const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--no-sandbox", "--disable-lcd-text"] });
  const foto = await recortarFoto(browser);
  const doc = html({ qr, foto });
  fs.writeFileSync(path.join(TMP, NOMBRE + ".html"), doc);

  const page = await browser.newPage();
  await page.setViewport({ width: 816, height: 1056, deviceScaleFactor: 2 });
  await page.setContent(doc, { waitUntil: "load" });
  await page.evaluateHandle("document.fonts.ready");
  // Control: nada puede salirse de la hoja carta ni de su caja, y ningún texto baja de 13 px.
  const medida = await page.evaluate(() => {
    const foot = document.querySelector("footer").getBoundingClientRect();
    const over = [...document.querySelectorAll(".box, .precio, .hl, .hr, .cta > *")].filter((e) => e.scrollHeight > e.clientHeight + 1 || e.scrollWidth > e.clientWidth + 1)
      .map((e) => (e.querySelector("h2,h4,b") || e).textContent.slice(0, 40));
    const conTexto = [...document.querySelectorAll("body *")].filter((e) => [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()));
    const minFont = Math.min(...conTexto.map((e) => parseFloat(getComputedStyle(e).fontSize)));
    const main = document.querySelector("main");
    return { pageScroll: document.querySelector(".page").scrollHeight, footerBottom: Math.round(foot.bottom), sobra: Math.round(main.getBoundingClientRect().bottom - [...main.children].pop().getBoundingClientRect().bottom), over, minFont };
  });
  console.log("medida", JSON.stringify(medida));
  if (medida.pageScroll > 1056 || medida.footerBottom > 1056 || medida.over.length || medida.minFont < 12.5) console.warn("OJO: revisar la hoja", medida);
  await page.pdf({ path: path.join(OUT, NOMBRE + ".pdf"), format: "Letter", printBackground: true, pageRanges: "1", margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  await page.screenshot({ path: path.join(OUT, NOMBRE + ".png"), clip: { x: 0, y: 0, width: 816, height: 1056 } });
  await browser.close();
  console.log("ok", path.join(OUT, NOMBRE + ".pdf"));
  console.log("ok", path.join(OUT, NOMBRE + ".png"));
}
main().catch((e) => { console.error(e); process.exit(1); });
