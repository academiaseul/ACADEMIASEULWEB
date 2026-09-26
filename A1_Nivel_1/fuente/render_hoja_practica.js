// render_hoja_practica.js · Academia Seúl
// Hoja 가나다라 I (Básico 1 · A1.1, semana 1): HTML → PDF US Letter con Chrome + puppeteer-core.
//
//   Fuente:  A1_Nivel_1/fuente/Hoja_Practica_Hangul_A1.html (+ logo-azul.png al lado)
//   Salida:  A1_Nivel_1/Hoja_Practica_Hangul_A1.pdf (sobrescribe)
//
// Uso (puppeteer-core vive en el scratchpad de esta PC):
//   cd <scratchpad> && node C:/Users/Chingu/Desktop/ACADEMIASEULWEB/A1_Nivel_1/fuente/render_hoja_practica.js
//   Opcional: --png <carpeta>  → además guarda una captura PNG por página (para el QA visual).
//
// Controles antes de escribir el PDF: fuentes (Arial + Noto Sans KR) cargadas, 3 páginas,
// nada se sale de la hoja ni pisa el pie, y ningún color rojizo (regla de la casa: nunca rojo).

const fs = require("fs");
const path = require("path");

const FUENTE = path.join(__dirname, "Hoja_Practica_Hangul_A1.html");
const SALIDA = path.join(__dirname, "..", "Hoja_Practica_Hangul_A1.pdf");
const CHROME = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const SCRATCH = "C:/Users/Chingu/AppData/Local/Temp/claude/C--Users-Chingu-Desktop-ACADEMIASEULWEB/d4111e1b-5523-44ea-97b2-b1a1d9545b9e/scratchpad";

function cargarPuppeteer() {
  const rutas = ["puppeteer-core", path.join(process.cwd(), "node_modules/puppeteer-core"), path.join(SCRATCH, "node_modules/puppeteer-core")];
  for (const r of rutas) { try { return require(r); } catch (e) { /* siguiente */ } }
  throw new Error("No encontré puppeteer-core. Ejecuta desde una carpeta con node_modules/puppeteer-core (npm i puppeteer-core).");
}

const PAGINAS = 3;
const MM = 96 / 25.4; // px por mm a 96 dpi

(async () => {
  if (!fs.existsSync(FUENTE)) throw new Error("Falta " + FUENTE);
  if (!fs.existsSync(path.join(__dirname, "logo-azul.png"))) console.warn("⚠ Falta fuente/logo-azul.png: la cabecera sale sin logo.");
  const iPng = process.argv.indexOf("--png");
  const PNG_DIR = iPng > -1 ? process.argv[iPng + 1] : null;

  const puppeteer = cargarPuppeteer();
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--allow-file-access-from-files", "--font-render-hinting=none"] });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: Math.round(215.9 * MM), height: Math.round(279.4 * MM), deviceScaleFactor: 2 });
    await page.emulateMediaType("print");
    await page.goto("file:///" + FUENTE.split(path.sep).join("/"), { waitUntil: "networkidle0", timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);

    // ── Controles ──
    const qa = await page.evaluate((MM) => {
      const probs = [];
      if (!document.fonts.check("700 20px 'Noto Sans KR'", "가나다")) probs.push("Noto Sans KR no disponible");
      if (!document.fonts.check("12px Arial", "Aa")) probs.push("Arial no disponible");
      const pages = [...document.querySelectorAll(".page")];
      pages.forEach((pg, i) => {
        const r = pg.getBoundingClientRect();
        const foot = pg.querySelector(".foot").getBoundingClientRect();
        const limDer = r.right - 15 * MM, limAbajo = foot.top - 1.5 * MM;
        let maxDer = 0, maxAbajo = 0;
        pg.querySelectorAll("*").forEach((el) => {
          if (el.closest(".foot")) return;
          const b = el.getBoundingClientRect();
          if (!b.width && !b.height) return;
          maxDer = Math.max(maxDer, b.right); maxAbajo = Math.max(maxAbajo, b.bottom);
          if (b.right > limDer + 0.5) probs.push(`pág. ${i + 1}: <${el.tagName.toLowerCase()} class="${el.className}"> se sale por la derecha (${((b.right - limDer) / MM).toFixed(1)} mm)`);
          if (b.bottom > limAbajo + 0.5) probs.push(`pág. ${i + 1}: <${el.tagName.toLowerCase()} class="${el.className}"> pisa el pie (${((b.bottom - limAbajo) / MM).toFixed(1)} mm)`);
        });
        pg.dataset.holgura = `der ${((limDer - maxDer) / MM).toFixed(1)} mm · abajo ${((limAbajo - maxAbajo) / MM).toFixed(1)} mm`;
      });
      // nunca rojo: texto, fondos y bordes
      const rojizo = (c) => { const m = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/); if (!m) return false; const [R, G, B] = m.slice(1).map(Number); return R > 150 && R - G > 60 && R - B > 60; };
      document.querySelectorAll("*").forEach((el) => {
        const cs = getComputedStyle(el);
        for (const p of ["color", "backgroundColor", "borderTopColor", "borderLeftColor", "borderBottomColor"]) {
          if (rojizo(cs[p])) probs.push(`color rojizo en <${el.tagName.toLowerCase()} class="${el.className}"> (${p}: ${cs[p]})`);
        }
      });
      return { probs: [...new Set(probs)].slice(0, 40), paginas: pages.length, holguras: pages.map((p) => p.dataset.holgura) };
    }, MM);

    qa.holguras.forEach((h, i) => console.log(`pág. ${i + 1}: holgura ${h}`));
    if (qa.paginas !== PAGINAS) qa.probs.push(`se esperaban ${PAGINAS} páginas y hay ${qa.paginas}`);
    if (PNG_DIR) { // capturas también cuando algo falla: sirven para ver qué arreglar
      fs.mkdirSync(PNG_DIR, { recursive: true });
      const secciones = await page.$$(".page");
      for (let i = 0; i < secciones.length; i++) await secciones[i].screenshot({ path: path.join(PNG_DIR, `hoja_p${i + 1}.png`) });
    }
    if (qa.probs.length) { console.error("✗ Problemas:\n  " + qa.probs.join("\n  ")); process.exitCode = 1; return; }

    await page.pdf({ path: SALIDA, format: "Letter", printBackground: true, preferCSSPageSize: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
    console.log("✓ PDF: " + SALIDA);
  } finally {
    await browser.close();
  }
})().catch((e) => { console.error(e); process.exit(1); });
