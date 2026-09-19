// Capturas de pantalla de Dubu: mapa, tipos de nivel, victoria, fin de mundo, noche y escritorio.
const puppeteer = require("puppeteer-core");
const path = require("path");
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--no-sandbox", "--autoplay-policy=no-user-gesture-required"] });
  const page = await browser.newPage();
  const errors = []; page.on("pageerror", (e) => errors.push(e.message)); page.on("console", (m) => { if (m.type() === "error" && !/404/.test(m.text())) errors.push(m.text()); });
  const shot = (name) => page.screenshot({ path: path.join(__dirname, "s_" + name + ".png") });
  const abre = async (id) => { await page.evaluate((id) => { const n = window.Dubu.NIVELES.find((n) => n.id === id); window.Dubu.abreNivel(n); }, id); await wait(900); };
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  await page.evaluateOnNewDocument(() => { localStorage.setItem("as-theme", "light"); localStorage.removeItem("dubu-progreso"); });
  await page.goto("http://localhost:3111/dubu?dev=1", { waitUntil: "networkidle2", timeout: 90000 });
  await wait(1500); await page.click("#btn-entrar"); await wait(1200); await shot("mapa");
  await abre("1-3"); await shot("1-3_reconocer");
  await abre("1-4"); await page.evaluate(() => { document.querySelector(".slot.s-voc").click(); }); await wait(500); await shot("1-4_cadena_lado");
  await abre("1-5"); await shot("1-5_oido");
  await abre("2-2"); await page.evaluate(() => { const D = window.Dubu; D.selChip(D.S().bandeja.indexOf("ㄱ")); D.selSlot(0, "ini"); D.selChip(D.S().bandeja.indexOf("ㅣ")); }); await wait(500); await shot("2-2_forja_pads");
  await abre("3-2"); await page.evaluate(() => { const D = window.Dubu; D.selChip(D.S().bandeja.indexOf("ㅁ")); D.selSlot(1, "ini"); D.selSlot(1, "ini"); }); await wait(500); await shot("3-2_trazo");
  await abre("4-2"); await shot("4-2_tensas");
  await abre("5-4"); await page.evaluate(() => { const D = window.Dubu; D.selChip(D.S().bandeja.indexOf("ㅅ")); D.selSlot(0, "ini"); D.selChip(D.S().bandeja.indexOf("ㅣ")); D.accionPunto("d"); D.selSlot(0, "voc"); D.selChip(D.S().bandeja.indexOf("ㄱ")); D.selSlot(1, "ini"); D.selChip(D.S().bandeja.indexOf("ㅡ")); D.accionPunto("a"); D.selSlot(1, "voc"); D.selChip(D.S().bandeja.indexOf("ㅣ")); D.accionPunto("d"); }); await wait(500); await shot("5-4_wrap_antes");
  await page.evaluate(() => { window.Dubu.selSlot(1, "voc"); }); await wait(1500); await shot("5-4_victoria");
  // oído con fallo: eco + zona parpadeando + pista al 2.º fallo
  await abre("6-1"); await page.evaluate(() => { const D = window.Dubu; const S = D.S; D.selChip(S().bandeja.indexOf("ㅇ")); D.selSlot(0, "ini"); D.selChip(S().bandeja.indexOf("ㅡ")); D.accionPunto("b"); D.selSlot(0, "voc"); D.selChip(S().bandeja.indexOf("ㅅ")); D.selSlot(1, "ini"); D.selChip(S().bandeja.indexOf("ㅣ")); D.accionPunto("d"); D.selSlot(1, "voc"); D.selChip(S().bandeja.indexOf("ㄴ")); D.selSlot(1, "fin"); /* 우산 correcto: cambiamos a 우선 para fallar */ }); await wait(300);
  await page.evaluate(() => { const D = window.Dubu; D.selSlot(1, "voc"); D.accionLado(); D.comprobar(); }); await wait(300); await page.evaluate(() => { window.Dubu.comprobar(); }); await wait(400); await shot("6-1_oido_fallo");
  // fin de mundo: completar el barrio 1 en progreso y ganar 1-5
  await page.evaluate(() => { const P = window.Dubu.P(); for (const id of ["1-1", "1-2", "1-3", "1-4"]) P.niveles[id] = { cubitos: 3, movs: 3 }; P.oido = { "ㅓ/ㅗ": { ok: 4, total: 5 }, "ㅡ/ㅜ": { ok: 2, total: 4 } }; localStorage.setItem("dubu-progreso", JSON.stringify(P)); });
  await abre("1-5"); await page.evaluate(() => { const D = window.Dubu; const S = D.S; D.selChip(S().bandeja.indexOf("ㅇ")); D.selSlot(0, "ini"); D.selChip(S().bandeja.indexOf("ㅡ")); D.accionPunto("b"); D.selSlot(0, "voc"); D.selChip(S().bandeja.indexOf("ㅇ")); D.selSlot(1, "ini"); D.selChip(S().bandeja.indexOf("ㅡ")); D.accionPunto("b"); D.accionPunto("b"); D.selSlot(1, "voc"); D.comprobar(); }); await wait(1500);
  await page.evaluate(() => { const b = [...document.querySelectorAll("#victoria .btn")].find((b) => /plato/.test(b.textContent)); if (b) b.click(); }); await wait(800); await shot("fin_mundo");
  await page.evaluate(() => { document.querySelectorAll(".velo.on").forEach((v) => v.classList.remove("on")); window.Dubu.muestraMapa(); }); await wait(500); await shot("mapa_progreso");
  // álbum
  await page.click("#btn-album"); await wait(500); await shot("album"); await page.evaluate(() => { document.querySelectorAll(".velo.on").forEach((v) => v.classList.remove("on")); });
  // modo noche
  await page.evaluate(() => { localStorage.setItem("as-theme", "dark"); }); await page.reload({ waitUntil: "networkidle2" }); await wait(1200); await page.click("#btn-entrar"); await wait(800); await shot("dark_mapa");
  await abre("2-1"); await page.evaluate(() => { const D = window.Dubu; D.selChip(D.S().bandeja.indexOf("ㄱ")); D.selSlot(0, "ini"); D.selChip(D.S().bandeja.indexOf("ㅡ")); D.accionPunto("a"); D.selSlot(0, "voc"); D.selChip(D.S().bandeja.indexOf("ㄱ")); }); await wait(500); await shot("dark_2-1");
  // escritorio
  await page.setViewport({ width: 1024, height: 800 }); await page.evaluate(() => { localStorage.setItem("as-theme", "light"); }); await page.reload({ waitUntil: "networkidle2" }); await wait(1200); await page.click("#btn-entrar"); await wait(600);
  await abre("3-5"); await shot("desktop_3-5");
  const dims = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: innerWidth }));
  console.log("desktop overflow:", dims.sw > dims.iw, dims);
  console.log("errores JS:", errors.length, errors.slice(0, 5));
  await browser.close();
})();
