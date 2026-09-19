// Test automático v2: carga /dubu?dev=1, revisa la verificación y juega los 30 niveles con el motor (window.Dubu).
// También prueba un fallo a propósito (Eco + desmoronado parcial) y el deshacer.
const puppeteer = require("puppeteer-core");
const path = require("path");
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--no-sandbox", "--autoplay-policy=no-user-gesture-required"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  const logs = [], errors = [];
  page.on("console", (m) => { const t = m.text(); logs.push(m.type() + ": " + t); if (m.type() === "error" && !/404/.test(t)) errors.push(t); });
  page.on("pageerror", (e) => errors.push("PAGEERROR " + e.message));
  await page.evaluateOnNewDocument(() => { localStorage.removeItem("dubu-progreso"); });
  await page.goto("http://localhost:3111/dubu?dev=1", { waitUntil: "networkidle2", timeout: 90000 });
  await wait(2500);
  for (const l of logs.filter((l) => /clips|Verific|inválido|faltan/.test(l))) console.log(l.slice(0, 160));
  await page.click("#btn-entrar"); await wait(800);
  const resultados = await page.evaluate(async () => {
    const D = window.Dubu; const out = []; const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    for (const n of D.NIVELES) {
      D.abreNivel(n); await wait(300); const S = () => D.S();
      try {
        if (n.tipo === "reconocer") { for (let r = 0; r < n.rondas.length; r++) { await wait(350); D.eligeCand(S().ronda.target); await wait(750); } }
        else {
          const idx = (j) => S().tiles.findIndex((t) => !t.usado && t.j === j);
          for (const s of n.meta) { const [i, m, f] = D.decompose(s); D.tapTile(idx(i)); await wait(120); D.tapTile(idx(m)); await wait(160); if (f) { D.tapTile(idx(f)); await wait(160); } }
        }
        await wait(700); const st = S();
        out.push({ id: n.id, ganado: !!(st && st.ganado), palabra: D.palabraArmada(), cubitos: st && st.ganado ? D.cubitosGanados() : 0, fallos: st ? st.fallos : "-" });
      } catch (e) { out.push({ id: n.id, error: e.message }); }
      document.querySelectorAll(".velo.on").forEach((v) => v.classList.remove("on")); await wait(150);
    }
    // prueba de fallo: 2-1 고기 — poner ㄱ + ㅓ (par mínimo de ㅗ) → debe desmoronar solo la vocal y contar 1 fallo
    const n = D.NIVELES.find((n) => n.id === "2-1"); D.abreNivel(n); await wait(300);
    const idx = (j) => D.S().tiles.findIndex((t) => !t.usado && t.j === j);
    D.tapTile(idx("ㄱ")); await wait(100); D.tapTile(idx("ㅓ")); await wait(300);
    const b = D.S().slots[0]; out.push({ id: "fallo-test", ini: b.ini, voc: b.voc, fallos: D.S().fallos, libres: D.S().tiles.filter((t) => !t.usado).length });
    D.deshacer(); await wait(100); out.push({ id: "undo-test", ini: D.S().slots[0].ini, libres: D.S().tiles.filter((t) => !t.usado).length });
    return out;
  });
  let ok = 0; for (const r of resultados) { if (r.ganado) ok++; console.log((r.ganado ? "✓" : r.id.includes("test") ? "·" : "✗"), r.id, r.error || (r.palabra !== undefined ? r.palabra + " · cubitos " + r.cubitos + " · fallos " + r.fallos : JSON.stringify(r))); }
  console.log("ganados:", ok, "/ 30");
  console.log("errores JS (sin 404):", errors.length); errors.slice(0, 6).forEach((e) => console.log("  !", e.slice(0, 200)));
  await page.screenshot({ path: path.join(__dirname, "shot_v2.png") });
  await browser.close();
})();
