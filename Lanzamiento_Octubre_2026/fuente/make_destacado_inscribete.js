// Destacado "INSCRÍBETE" de Instagram: portada + 4 historias 1080×1920 (azul, navy y blanco; nunca rojo ni rosado).
// Textos del Kit_Como_Me_Inscribo_Octubre_2026.md §5; desde el 26 oct 2026, solo Básico 1 de noviembre (ver LAMINAS).
// Se ejecuta desde el scratchpad (node_modules con puppeteer-core):  node make_destacado_inscribete.js
const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");
const REPO = "C:/Users/Chingu/Desktop/ACADEMIASEULWEB";
const OUT = REPO + "/Campana_Assets/instagram/octubre/destacado_inscribete";
fs.mkdirSync(OUT, { recursive: true });
const SELLO = fs.readFileSync(REPO + "/Curriculo/Flashcards/marca/sello_linea_v2.svg", "utf8").replace("<svg", '<svg style="width:100%;height:auto;display:block"');

const BASE = `
*{box-sizing:border-box}
body{margin:0;width:1080px;height:1920px;overflow:hidden;font-family:'Plus Jakarta Sans','Noto Sans KR',sans-serif;background:#4236F6;color:#fff;position:relative}
.sello{position:absolute;width:110px;left:50%;margin-left:-55px;top:150px;color:#fff}
.zona{position:absolute;left:84px;right:84px;top:300px;bottom:420px;display:flex;flex-direction:column;justify-content:center;gap:34px}
.kicker{font-size:34px;font-weight:800;letter-spacing:.14em;color:#C9C4FF}
h1{margin:0;font-size:104px;line-height:1.02;font-weight:800;letter-spacing:-.01em}
.sub{font-size:44px;font-weight:600;color:#E3E0FF}
.card{background:#fff;color:#003478;border-radius:36px;padding:38px 42px}
.card h2{margin:0 0 18px;font-size:40px;font-weight:800;letter-spacing:.06em;color:#4236F6}
.fila{display:flex;justify-content:space-between;gap:20px;font-size:38px;line-height:1.35;padding:12px 0;border-top:2px solid #E6E8F5}
.fila:first-of-type{border-top:0}
.fila b{color:#003478;white-space:nowrap}.fila span{color:#4A5079;text-align:right}
.paso{display:flex;gap:26px;align-items:flex-start}
.num{flex:0 0 92px;height:92px;border-radius:50%;background:#fff;color:#4236F6;font-size:52px;font-weight:800;display:flex;align-items:center;justify-content:center}
.paso h3{margin:4px 0 8px;font-size:50px;font-weight:800}
.paso p{margin:0;font-size:38px;line-height:1.35;color:#E3E0FF}
.precio{font-size:66px;font-weight:800;line-height:1.15}
.nota{font-size:34px;color:#C9C4FF}
.pie{position:absolute;left:84px;right:84px;bottom:250px;text-align:center;font-size:34px;font-weight:700;color:#C9C4FF}
.gold{color:#E8B84B}
`;
const page = (body) => `<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Noto+Sans+KR:wght@700&display=swap" rel="stylesheet"><style>${BASE}</style></head><body><div class="sello">${SELLO}</div>${body}</body></html>`;

// Básico 1 de noviembre (decisión de Jay, lun 26 oct 2026): una sola clase (Básico 1 con Kiran, martes 20:00 Chile,
// 8 martes desde el mar 10 nov), precio de lanzamiento US$120 · o 2 cuotas de US$60 hasta el dom 8 nov (después
// US$150 · o 2 cuotas de US$75), matrícula hasta el lun 9 nov 23:59. Los links de pago que existen cobran el precio
// normal: el de lanzamiento se coordina por WhatsApp. La lámina 4 de octubre (4_cierre_domingo_18.png) quedó en
// _historico_octubre/ y la reemplaza 4_matricula_lunes_9.png.
const LAMINAS = {
  "1_paso1_elige_tu_clase.png": `
    <div class="zona">
      <div class="kicker">¿CÓMO ME INSCRIBO?</div>
      <h1>3 pasos,<br>todo online</h1>
      <div class="card">
        <h2>PASO 1 · TU CLASE</h2>
        <div class="fila"><b>Básico 1 · A1.1</b><span>coreano desde cero</span></div>
        <div class="fila"><b>Profe</b><span>Kiran · 기란</span></div>
        <div class="fila"><b>Día y hora</b><span>martes 20:00 (Chile)</span></div>
        <div class="fila"><b>Empieza</b><span>martes 10 de noviembre</span></div>
        <div class="fila"><b>Duración</b><span>8 martes · 60 min por Zoom</span></div>
      </div>
      <div class="nota">Hora de Chile · la web te muestra la hora de tu país</div>
    </div>
    <div class="pie">academiaseul.com/inscribete</div>`,
  "2_pasos2y3_datos_y_pago.png": `
    <div class="zona" style="gap:56px">
      <div class="kicker">¿CÓMO ME INSCRIBO?</div>
      <div class="paso"><div class="num">2</div><div><h3>Deja tus datos</h3><p>Llena el formulario en<br><b style="color:#fff">academiaseul.com/inscribete</b><br>→ tu cupo queda reservado</p></div></div>
      <div class="paso"><div class="num">3</div><div><h3>Paga y confirma</h3><p>Paga en la web o coordina por WhatsApp<br>→ te confirmamos el cupo por correo y WhatsApp</p></div></div>
      <div class="card" style="font-size:36px;line-height:1.4">Antes de tu primera clase (<b>martes 10 de noviembre</b>) te llegan por correo tu grupo de WhatsApp y tu link de Zoom.</div>
    </div>
    <div class="pie">sin crear cuenta · 화이팅!</div>`,
  "3_como_pago.png": `
    <div class="zona" style="gap:30px">
      <div class="kicker">¿CÓMO PAGO? · PRECIO DE LANZAMIENTO</div>
      <div class="precio"><s style="color:#C9C4FF;font-size:52px;font-weight:700;text-decoration-thickness:5px">US$150</s> US$120<br><span style="font-size:52px;font-weight:700">el curso completo ·</span><br><span style="font-size:52px;font-weight:700">o 2 cuotas de US$60</span></div>
      <div class="nota">Hasta el domingo 8 de noviembre. Desde el lunes 9: US$150 el curso completo · o 2 cuotas de US$75</div>
      <div class="card">
        <div class="fila"><b>En Chile</b><span>transferencia o Mercado Pago · $120.000 o 2 × $60.000</span></div>
        <div class="fila"><b>Otros países</b><span>PayPal en dólares</span></div>
      </div>
      <div class="sub">Para el precio de lanzamiento, escríbenos por WhatsApp<br><b style="color:#fff">+56 9 4211 5562</b></div>
    </div>`,
  "4_matricula_lunes_9.png": `
    <div class="zona" style="text-align:center;align-items:center">
      <div class="kicker">LA MATRÍCULA CIERRA EL</div>
      <h1 style="font-size:118px">LUNES 9<br>DE NOVIEMBRE</h1>
      <div class="sub"><span class="gold">23:59</span> · hora de Chile</div>
      <div class="card" style="text-align:center;font-size:40px;line-height:1.45;width:100%">Empezamos el <b>martes 10 de noviembre</b><br>8 martes en vivo · grabaciones · certificado</div>
      <div class="sub">¿Dudas? Escríbenos<br><b style="color:#fff">INSCRIBIRME</b> por DM</div>
    </div>`,
};

(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--disable-lcd-text"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1080, height: 1920 });
  // Filtro opcional: node make_destacado_inscribete.js 4_   → solo las láminas cuyo nombre contenga "4_"
  // (la portada solo se rehace sin filtro o con el filtro "portada").
  const filtros = process.argv.slice(2);
  const pasa = (n) => !filtros.length || filtros.some((f) => n.includes(f));
  for (const [archivo, body] of Object.entries(LAMINAS)) {
    if (!pasa(archivo)) continue;
    await p.setContent(page(body), { waitUntil: "load", timeout: 60000 });
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(OUT, archivo) });
    console.log("ok", archivo);
  }
  if (!pasa("0_portada_destacado.png")) { await b.close(); return; }
  // Portada del destacado (Instagram la recorta en círculo: el sello va centrado)
  await p.setViewport({ width: 1080, height: 1080 });
  await p.setContent(`<!doctype html><html><head><meta charset="utf-8"></head><body style="margin:0;width:1080px;height:1080px;background:#4236F6;display:flex;align-items:center;justify-content:center"><div style="width:520px;color:#fff">${SELLO}</div></body></html>`);
  await p.screenshot({ path: path.join(OUT, "0_portada_destacado.png") });
  console.log("ok portada");
  await b.close();
})();
