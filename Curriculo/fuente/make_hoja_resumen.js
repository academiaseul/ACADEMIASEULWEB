// Hoja resumen (one-pager) de los cursos · Cohorte octubre 2026 · para enviar por WhatsApp o correo.
// Datos: lib/nivel1.ts (horarios, profes, cupos, precio, cierre) + Curriculo/publico/ (para quién es,
// "Al terminar el curso podrás…", WhatsApp_Cursos_Octubre_2026.md). No agrega políticas nuevas.
// Estilo de la casa: US Letter, Arial (+ Malgun Gothic para el coreano), azul #4236F6, navy #003478. Nunca rojo.
// Uso: cd <scratchpad> && node curriculo/make_hoja_resumen.js
// Salida: Curriculo/publico/Hoja_Resumen_Cursos_Octubre_2026.pdf (1 página) y .png (1632×2112, para WhatsApp).
const fs = require("fs");
const path = require("path");

const SCRATCH = process.env.AS_SCRATCH ||
  "C:\\Users\\Chingu\\AppData\\Local\\Temp\\claude\\C--Users-Chingu-Desktop-ACADEMIASEULWEB\\d4111e1b-5523-44ea-97b2-b1a1d9545b9e\\scratchpad";
const req = require("module").createRequire(path.join(SCRATCH, "package.json"));
const puppeteer = req("puppeteer-core");
const QRCode = req("qrcode");

const REPO = "C:\\Users\\Chingu\\Desktop\\ACADEMIASEULWEB";
const OUT = path.join(REPO, "Curriculo", "publico");
const NOMBRE = "Hoja_Resumen_Cursos_Octubre_2026";
const b64 = (f) => "data:image/png;base64," + fs.readFileSync(f).toString("base64");
const LOGO_BLANCO = b64(path.join(SCRATCH, "igpost", "logo-blanco.png"));
const SELLO = b64(path.join(SCRATCH, "igpost", "sello-azul.png"));

const URL_INSCRIPCION = "https://www.academiaseul.com/nivel-1";
const URL_WHATSAPP = "https://wa.me/56942115562";

// ---- contenido (todo verificado contra lib/nivel1.ts y Curriculo/publico/) ----
const CURSOS = [
  {
    nivel: "A1.1", nombre: "Básico 1", sub: "Primeras Palabras", kr: "첫 한국어", color: "#4236F6",
    para: "Nunca has estudiado coreano.",
    logros: ["Leer Hangul (한글), el alfabeto coreano", "Presentarte y presentar a tu familia", "Contar tu día y lo que te gusta"],
    horario: "Mar <span style=\"font-weight:normal\">o</span> jue 20:00", who: "con Kiran · desde mar 13 o jue 15 oct", nota: "Mismo curso: eliges el día",
  },
  {
    nivel: "A1.2", nombre: "Básico 2", sub: "Pasado, presente y futuro", kr: "기초 한국어 2", color: "#2F62D9",
    para: "Ya lees Hangul y te presentas.",
    logros: ["Contar tu fin de semana y tus planes", "Decir la hora, tu edad y tu teléfono", "Conversar unos 5 minutos"],
    horario: "Mié 21:00", who: "con Jay · desde el 14 oct", nota: "Sigue a Básico 1 (= Nivel 1 de julio)",
  },
  {
    nivel: "A2.1", nombre: "Conversacional 1", sub: "Corea que amas", kr: "회화 A2.1", color: "#0B7F86",
    para: "Usas pasado y futuro, pero te cuesta conversar.",
    logros: ["Conversar de K-pop, viajes y comida", "Pedir en un restaurante coreano", "Dar tu opinión con matices"],
    horario: "Mar 21:00", who: "con Abby (vive en Corea) · desde el 13 oct", nota: "Clase en coreano",
  },
  {
    nivel: "B1+", nombre: "TOPIK II", sub: "Estrategia de examen", kr: "토픽 II 준비반", color: "#003478",
    para: "Tienes nivel intermedio y vas por el TOPIK II.",
    logros: ["Un simulacro completo con cronómetro", "쓰기 51–54 con corrección personal", "Tu plan de estudio hasta el examen"],
    horario: "Jue 21:00", who: "con Jay · desde el 15 oct", nota: "Máx. 8 personas",
  },
  {
    nivel: "8–15 años", nombre: "Coreano para Niños", sub: "Juega y aprende", kr: "어린이 한국어", color: "#6A4BD8",
    para: "Niños y niñas de 8 a 15 años, desde cero.",
    logros: ["Escribir su nombre en coreano (한글)", "Presentarse y contar hasta 10", "Un mini-show final para la familia"],
    horario: "Lun 18:00", who: "con Jay y Abby · del 19 oct al 7 dic", nota: "Máx. 12 niños",
  },
];

const GUIA = [
  ["No leo Hangul", "Básico 1"],
  ["Leo y me presento", "Básico 2"],
  ["Hice el Nivel 1 de julio", "Básico 2"],
  ["Hablo en pasado y futuro", "Conversacional 1"],
  ["Voy por el TOPIK II", "TOPIK II"],
];

const INCLUYE = [
  "8 clases en vivo con corrección en el momento",
  "Grabación de cada clase",
  "Material, slides y tareas corregidas",
  "Grupo de WhatsApp con tu profe",
  "Certificado de finalización",
];

// ---- iconos (SVG en línea, trazo azul) ----
const ico = (d) => `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#4236F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const ICON = {
  cal: ico('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>'),
  live: ico('<rect x="2" y="6" width="14" height="12" rx="2"/><path d="M16 10l6-3v10l-6-3"/>'),
  price: ico('<circle cx="12" cy="12" r="9"/><path d="M15 9.5c-.5-1-1.6-1.5-3-1.5-1.7 0-3 .9-3 2.1 0 2.8 6 1.4 6 4.3 0 1.2-1.3 2.1-3 2.1-1.4 0-2.6-.6-3.1-1.6M12 6v2M12 16v2"/>'),
  cert: ico('<circle cx="12" cy="9" r="6"/><path d="M8.5 14l-1.5 8 5-3 5 3-1.5-8"/>'),
  check: '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#4236F6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#4236F6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  clock: '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
};

const cardHtml = (c) => `
  <div class="card" style="--c:${c.color}">
    <div class="card-top">
      <div class="t"><span class="pill">${c.nivel}</span><h3>${c.nombre}</h3></div>
      ${c.nota ? `<span class="nota">${c.nota}</span>` : ""}
    </div>
    <div class="sub">${c.sub} · <span class="kr">${c.kr}</span></div>
    <p class="para"><b>Para ti si:</b> ${c.para.charAt(0).toLowerCase() + c.para.slice(1)}</p>
    <ul>${c.logros.map((l) => `<li>${ICON.check}<span>${l}</span></li>`).join("")}</ul>
    <div class="when">
      <span class="h">${ICON.clock} ${c.horario}</span>
      <span class="who">${c.who}</span>
    </div>
  </div>`;

async function main() {
  const qr = async (u) => QRCode.toString(u, { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark: "#003478", light: "#FFFFFF" } });
  const qrInscripcion = await qr(URL_INSCRIPCION);

  // Niños: "Para" en vez de "Para ti si".
  const cards = CURSOS.map((c) => c.nombre === "Coreano para Niños"
    ? cardHtml(c).replace("<b>Para ti si:</b> niños", "<b>Para:</b> niños")
    : cardHtml(c)).join("");

  const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Academia Seúl · Cursos de coreano · octubre 2026</title>
<style>
  @page { size: Letter; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root { --azul: #4236F6; --navy: #003478; --ink: #1B1C24; --grey: #5C5F6B; --tint: #EEF1F6; --line: #D9DDE6; --oro: #E8B84B; }
  html, body { width: 8.5in; height: 11in; }
  body { font-family: Arial, "Malgun Gothic", sans-serif; color: var(--ink); background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; overflow: hidden; }
  .kr { font-family: "Malgun Gothic", Arial, sans-serif; }
  .page { position: relative; width: 8.5in; min-height: 11in; display: flex; flex-direction: column; }
  a { color: inherit; text-decoration: none; }

  header { flex: none; background: var(--azul); color: #fff; padding: 20px 40px 18px; position: relative; overflow: hidden; }
  .head-row { display: flex; justify-content: space-between; align-items: center; gap: 20px; position: relative; }
  header .sello { position: absolute; right: -34px; top: -26px; width: 230px; opacity: .13; filter: brightness(0) invert(1); }
  header .logo { height: 32px; display: block; margin-bottom: 10px; }
  header h1 { font-size: 32px; line-height: 1.1; letter-spacing: -.3px; }
  header .lead { font-size: 13px; margin-top: 6px; color: #E3E1FF; line-height: 1.4; }
  header .lead .kr { color: #fff; font-weight: bold; }
  .badge { flex: none; background: #fff; color: var(--navy); border-radius: 12px; padding: 10px 16px 11px; text-align: center; box-shadow: 0 4px 14px rgba(0,0,0,.18); }
  .badge .k { font-size: 10.5px; font-weight: bold; letter-spacing: 1.4px; color: var(--azul); }
  .badge .v { font-size: 19px; font-weight: bold; margin-top: 2px; }
  .badge .s { font-size: 11px; color: var(--grey); margin-top: 3px; }

  .facts { flex: none; display: grid; grid-template-columns: repeat(4, 1fr); background: var(--tint); border-bottom: 1px solid var(--line); padding: 0 26px; }
  .fact { display: flex; gap: 10px; align-items: center; padding: 13px 10px 13px 14px; }
  .fact + .fact { border-left: 1px solid var(--line); }
  .fact svg { flex: none; }
  .fact b { display: block; font-size: 13.5px; color: var(--navy); }
  .fact span { display: block; font-size: 11.5px; color: var(--grey); margin-top: 2px; line-height: 1.25; }

  main { padding: 16px 40px 0; flex: 1; display: flex; flex-direction: column; }
  .sec { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 9px; }
  .sec h2 { font-size: 18px; color: var(--navy); }
  .sec small { font-size: 11px; color: var(--grey); }

  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .card { border: 1px solid var(--line); border-top: 5px solid var(--c); border-radius: 10px; padding: 10px 14px 10px; display: flex; flex-direction: column; }
  .card-top { display: flex; justify-content: space-between; align-items: center; }
  .pill { background: var(--c); color: #fff; font-size: 10.5px; font-weight: bold; padding: 3px 9px; border-radius: 99px; letter-spacing: .3px; }
  .nota { font-size: 10.5px; font-weight: bold; color: var(--c); border: 1.5px solid var(--c); padding: 2px 8px; border-radius: 99px; }
  .card-top .t { display: flex; align-items: center; gap: 8px; }
  .card h3 { font-size: 17px; color: var(--ink); }
  .card .sub { font-size: 11.5px; color: var(--grey); margin-top: 3px; }
  .card .para { font-size: 11.8px; margin-top: 5px; line-height: 1.3; }
  .card .para b { color: var(--navy); }
  .card ul { list-style: none; margin-top: 3px; }
  .card li { display: flex; gap: 6px; align-items: flex-start; font-size: 11.8px; line-height: 1.3; margin-top: 2px; }
  .card li svg { flex: none; margin-top: 1px; }
  .card .when { margin-top: auto; padding-top: 7px; border-top: 1px dashed var(--line); display: flex; justify-content: space-between; align-items: baseline; gap: 8px; }
  .card ul + .when { margin-top: 7px; }
  .card .when .h { font-size: 13px; font-weight: bold; color: var(--c); display: inline-flex; gap: 5px; align-items: baseline; white-space: nowrap; }
  .card .when .h svg { align-self: center; }
  .card .when .who { font-size: 11px; color: var(--grey); text-align: right; }

  .guia { background: var(--tint); border: 1px solid var(--line); border-top: 5px solid var(--oro); }
  .guia h3 { margin-top: 0; }
  .guia .row { display: flex; align-items: center; gap: 7px; font-size: 11.8px; margin-top: 4px; }
  .guia .row .q { flex: 1; }
  .guia .row b { color: var(--navy); flex: none; width: 112px; }
  .guia .test { margin-top: auto; padding-top: 7px; border-top: 1px dashed var(--line); font-size: 11.3px; line-height: 1.35; }
  .guia .test b { color: var(--azul); }
  .guia .prox { font-size: 11px; color: var(--grey); margin-top: 4px; }

  .bottom { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 12px; }
  .box { border: 1px solid var(--line); border-radius: 10px; padding: 12px 16px; }
  .box h4 { font-size: 13px; color: var(--navy); letter-spacing: .3px; margin-bottom: 6px; }
  .incl li { list-style: none; display: flex; gap: 6px; align-items: center; font-size: 11.8px; margin-top: 2px; }
  .pago { margin-top: 8px; padding-top: 7px; border-top: 1px dashed var(--line); font-size: 11px; color: var(--grey); line-height: 1.35; }
  .cta { background: var(--navy); color: #fff; border: none; display: flex; flex-direction: column; }
  .cta h4 { color: #fff; }
  .cta-row { display: flex; gap: 14px; align-items: center; }
  .cta .code { background: #fff; padding: 10px; border-radius: 6px; width: 100px; height: 100px; flex: none; display: block; }
  .cta h4 { margin-bottom: 3px; }
  .cta .code svg { width: 100%; height: 100%; display: block; }
  .cta .url { display: block; font-size: 16px; font-weight: bold; }
  .cta .precio { font-size: 12px; color: #fff; margin-top: 5px; line-height: 1.35; }
  .cta .wa { display: block; font-size: 11.5px; color: #CFD8EA; margin-top: 5px; }
  .cta .wa b { color: #fff; }
  .cta .cierre { margin-top: 10px; background: var(--oro); color: var(--navy); border-radius: 7px; padding: 6px 10px; font-size: 12px; font-weight: bold; text-align: center; }

  footer { flex: none; padding: 8px 40px 24px; font-size: 11px; color: var(--grey); line-height: 1.4; display: flex; justify-content: space-between; gap: 18px; }
  footer b { color: var(--navy); }
  footer .r { text-align: right; white-space: nowrap; }
</style></head><body><div class="page">
  <header>
    <img class="sello" src="${SELLO}" alt="">
    <div class="head-row"><div>
    <img class="logo" src="${LOGO_BLANCO}" alt="Academia Seúl">
    <h1>Cursos de coreano en vivo</h1>
    <p class="lead">Octubre 2026 · desde cero hasta TOPIK II · adultos y niños (8–15)<br>Profes coreanos, clases pensadas para hispanohablantes. <span class="kr">같이 배워요!</span></p>
    </div><div class="badge"><div class="k">INICIO</div><div class="v">Semana del 12 de octubre</div><div class="s">Niños: lunes 19 de octubre</div></div></div>
  </header>

  <section class="facts">
    <div class="fact">${ICON.cal}<div><b>8 semanas</b><span>1 clase por semana<br>de 60 minutos</span></div></div>
    <div class="fact">${ICON.live}<div><b>En vivo por Zoom</b><span>Máx. 15 por grupo<br>(TOPIK II: 8 · Niños: 12)</span></div></div>
    <div class="fact">${ICON.price}<div><b>US$150</b><span>el curso completo<br>o 2 cuotas de US$75</span></div></div>
    <div class="fact">${ICON.cert}<div><b>Certificado</b><span>de finalización<br>en todos los cursos</span></div></div>
  </section>

  <main>
    <div class="sec"><h2>Elige tu curso</h2><small>Hora de Chile (UTC-3) · México (CDMX) −3 h · Colombia y Perú −2 h · Argentina, misma hora</small></div>
    <div class="grid">
      ${cards}
      <div class="card guia">
        <div class="card-top"><span class="pill" style="background:var(--oro);color:var(--navy)">¿Qué curso tomo?</span></div>
        ${GUIA.map(([q, a]) => `<div class="row"><span class="q">${q}</span>${ICON.arrow}<b>${a}</b></div>`).join("")}
        <div class="test"><b>¿No sabes tu nivel?</b> Test gratis de 2 minutos en <a href="https://www.academiaseul.com/test-nivel"><b>academiaseul.com/test-nivel</b></a> o escríbenos y te orientamos.
          <div class="prox">Próximamente: <b>Conversacional 2 (A2.2)</b> · enero 2027</div></div>
      </div>
    </div>

    <div class="bottom">
      <div class="box">
        <h4>TODOS LOS CURSOS INCLUYEN</h4>
        <ul class="incl">${INCLUYE.map((i) => `<li>${ICON.check}<span>${i}</span></li>`).join("")}</ul>
        <div class="pago">Pago: transferencia en Chile, Mercado Pago o PayPal.</div>
      </div>
      <div class="box cta">
        <div class="cta-row">
          <a class="code" href="${URL_INSCRIPCION}">${qrInscripcion}</a>
          <div class="cta-txt">
            <h4>INSCRÍBETE</h4>
            <a class="url" href="${URL_INSCRIPCION}">academiaseul.com/nivel-1</a>
            <div class="precio">Inscripción de todos los cursos: eliges tu clase y tu país.</div>
            <a class="wa" href="${URL_WHATSAPP}">¿Dudas? WhatsApp <b>+56 9 4211 5562</b></a>
          </div>
        </div>
        <div class="cierre">Cierre: dom 11 oct, o antes si se llenan los cupos</div>
      </div>
    </div>
  </main>

  <footer>
    <div><b>Gratis hoy:</b> Lector de Hangul, juego Dubu y taller grabado en <a href="https://www.academiaseul.com/recursos">academiaseul.com/recursos</a></div>
    <div class="r"><a href="https://www.instagram.com/academiaseul">@academiaseul</a> · <a href="https://www.instagram.com/jaychingu.oficial">@jaychingu.oficial</a></div>
  </footer>
</div></body></html>`;

  fs.writeFileSync(path.join(SCRATCH, "curriculo", NOMBRE + ".html"), html);

  const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--no-sandbox", "--disable-lcd-text"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 816, height: 1056, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: "load" });
  await page.evaluateHandle("document.fonts.ready");
  // Control de desborde: nada puede salirse de la hoja carta.
  const medida = await page.evaluate(() => {
    const pg = document.querySelector(".page").getBoundingClientRect();
    const alto = document.querySelector(".page").scrollHeight;
    const main = document.querySelector("main"); const foot = document.querySelector("footer").getBoundingClientRect();
    const over = [...document.querySelectorAll(".card, .box")].filter((e) => e.scrollHeight > e.clientHeight + 1).map((e) => e.querySelector("h3,h4")?.textContent);
    return { alto, pageH: pg.height, footerBottom: Math.round(foot.bottom), mainScroll: main.scrollHeight - main.clientHeight, over };
  });
  console.log("medida", JSON.stringify(medida));
  await page.pdf({ path: path.join(OUT, NOMBRE + ".pdf"), format: "Letter", printBackground: true, pageRanges: "1", margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  await page.screenshot({ path: path.join(OUT, NOMBRE + ".png"), clip: { x: 0, y: 0, width: 816, height: 1056 } });
  await browser.close();
  console.log("ok", path.join(OUT, NOMBRE + ".pdf"));
}
main().catch((e) => { console.error(e); process.exit(1); });
