// Test automático: carga /dubu?dev=1, revisa la verificación de carga y juega los 30 niveles usando el motor (window.Dubu).
const puppeteer = require("puppeteer-core");
const path = require("path");
(async () => {
  const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--no-sandbox", "--autoplay-policy=no-user-gesture-required"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  const logs = [], errors = [];
  page.on("console", (m) => { const t = m.text(); logs.push(m.type() + ": " + t); if (m.type() === "error") errors.push(t); });
  page.on("pageerror", (e) => errors.push("PAGEERROR " + e.message));
  await page.goto("http://localhost:3111/dubu?dev=1", { waitUntil: "networkidle2", timeout: 90000 });
  await new Promise((r) => setTimeout(r, 2500));
  console.log("--- consola (verificación) ---");
  for (const l of logs.filter((l) => /clips|Verific|inválido|faltan/.test(l))) console.log(l.slice(0, 160));
  console.log("errores de carga:", errors.length, errors.slice(0, 5));
  // entrar
  await page.click("#btn-entrar");
  await new Promise((r) => setTimeout(r, 800));
  // jugar cada nivel con el motor
  const resultados = await page.evaluate(async () => {
    const D = window.Dubu; const out = [];
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    const decomp = D.decompose;
    for (const n of D.NIVELES) {
      D.abreNivel(n); await wait(300);
      const S = () => D.S();
      try {
        if (n.tipo === "reconocer") {
          for (let r = 0; r < n.rondas.length; r++) { await wait(400); const t = S().ronda.target; D.eligeCand(t); await wait(800); }
        } else if (n.tipo === "cadena") {
          // resolver por BFS sobre el estado real: probamos acciones hasta que gane
          const esc = [n.inicio, ...(n.via || []), n.fin];
          for (let k = 1; k < esc.length; k++) {
            const [ti, tm, tf] = decomp(esc[k]);
            const b = () => S().casa[0];
            // batchim: quitar/poner/cambiar
            if ((b().fin || "") !== (tf || "")) {
              if (tf && S().bandeja.includes(tf)) { D.selChip(S().bandeja.indexOf(tf)); D.selSlot(0, "fin"); await wait(200); }
              else if (tf && b().fin && D.compose("ㅇ", "ㅏ", tf)) {
                // trazo o gemela sobre el batchim
                D.selSlot(0, "fin"); await wait(100);
                if (S().fichas.gemela > 0 && S().bandeja.includes(b().fin)) D.accionGemela(); else D.accionTrazo(); await wait(200);
              }
            }
            if (b().ini !== ti) {
              D.selSlot(0, "ini"); await wait(100);
              if (S().bandeja.includes(ti)) { S().sel = null; D.selChip(S().bandeja.indexOf(ti)); D.selSlot(0, "ini"); }
              else if (S().fichas.gemela > 0 && S().bandeja.includes(b().ini)) D.accionGemela();
              else D.accionTrazo();
              await wait(200);
            }
            if (b().voc !== tm) {
              D.selSlot(0, "voc"); await wait(100);
              const v = b().voc;
              const GIRAR = { "ㅏ": "ㅗ", "ㅗ": "ㅏ", "ㅓ": "ㅜ", "ㅜ": "ㅓ" }, LADO = { "ㅏ": "ㅓ", "ㅓ": "ㅏ", "ㅗ": "ㅜ", "ㅜ": "ㅗ", "ㅐ": "ㅔ", "ㅔ": "ㅐ" };
              if (LADO[v] === tm) D.accionLado(); else if (GIRAR[v] === tm) D.accionGirar();
              await wait(200);
            }
          }
        } else {
          // forja / oido: usar el plan de necesidades
          const plan = D.necesidades(n.meta, n.bandeja);
          const pool = () => S().bandeja;
          const syls = [...n.meta].map(decomp);
          const VOW = { "ㅣ": ["ㅣ", null, 0], "ㅡ": ["ㅡ", null, 0], "ㅏ": ["ㅣ", "d", 1], "ㅑ": ["ㅣ", "d", 2], "ㅓ": ["ㅣ", "i", 1], "ㅕ": ["ㅣ", "i", 2], "ㅗ": ["ㅡ", "a", 1], "ㅛ": ["ㅡ", "a", 2], "ㅜ": ["ㅡ", "b", 1], "ㅠ": ["ㅡ", "b", 2] };
          const WRAP = { "ㅘ": ["ㅗ", "ㅏ"], "ㅝ": ["ㅜ", "ㅓ"], "ㅢ": ["ㅡ", "ㅣ"], "ㅚ": ["ㅗ", "ㅣ"], "ㅟ": ["ㅜ", "ㅣ"] };
          const COMP = { "ㅐ": ["ㅏ", "ㅣ"], "ㅔ": ["ㅓ", "ㅣ"] };
          const TRAZO = { "ㄱ": "ㅋ", "ㄴ": "ㄷ", "ㄷ": "ㅌ", "ㅁ": "ㅂ", "ㅂ": "ㅍ", "ㅅ": "ㅈ", "ㅈ": "ㅊ", "ㅇ": "ㅎ" };
          const GEM = { "ㄲ": "ㄱ", "ㄸ": "ㄷ", "ㅃ": "ㅂ", "ㅆ": "ㅅ", "ㅉ": "ㅈ" };
          const ponCons = async (ci, slot, c) => {
            const base = GEM[c] || c;
            // encontrar ficha: exacta, o antecesora por trazo
            let chip = pool().includes(base) ? base : null; let pasos = 0;
            if (!chip) for (const b of ["ㄱ", "ㄴ", "ㅁ", "ㅅ", "ㅇ", "ㄷ", "ㅂ", "ㅈ"]) { let x = b, p = 0; while (x !== base && TRAZO[x] && p < 4) { x = TRAZO[x]; p++; } if (x === base && pool().includes(b)) { chip = b; pasos = p; break; } }
            D.selChip(pool().indexOf(chip)); D.selSlot(ci, slot); await wait(150);
            for (let i = 0; i < pasos; i++) { if (!(S().sel && S().sel.tipo === "slot" && S().sel.c === ci && S().sel.s === slot)) D.selSlot(ci, slot); D.accionTrazo(); await wait(150); }
            if (GEM[c]) { if (!(S().sel && S().sel.tipo === "slot" && S().sel.c === ci && S().sel.s === slot)) D.selSlot(ci, slot); D.accionGemela(); await wait(150); }
          };
          const ponVocSimple = async (ci, v, primera) => {
            const [bar, lado, dots] = VOW[v]; D.selChip(pool().indexOf(bar)); await wait(80);
            for (let i = 0; i < dots; i++) { D.accionPunto(lado); await wait(120); }
            // la ficha sigue seleccionada en la tabla; colocar
            if (!S().sel) { const idx = pool().indexOf(v); D.selChip(idx); }
            D.selSlot(ci, "voc"); await wait(150);
          };
          const ponVoc = async (ci, m) => {
            if (WRAP[m]) { await ponVocSimple(ci, WRAP[m][0]); await ponVocSimple(ci, WRAP[m][1]); }
            else if (COMP[m]) { await ponVocSimple(ci, COMP[m][0]); await ponVocSimple(ci, COMP[m][1]); }
            else await ponVocSimple(ci, m);
          };
          for (let ci = 0; ci < syls.length; ci++) {
            const [i, m, f] = syls[ci];
            await ponCons(ci, "ini", i); await ponVoc(ci, m); if (f) await ponCons(ci, "fin", f);
          }
          if (n.tipo === "oido") { D.comprobar(); }
          await wait(300);
        }
        await wait(700);
        const st = S();
        out.push({ id: n.id, ganado: !!(st && st.ganado), palabra: D.palabraCasa(), cubitos: st && st.ganado ? D.cubitosGanados() : 0, fallos: st ? st.fallos : "-" });
      } catch (e) { out.push({ id: n.id, error: e.message }); }
      // cerrar tarjeta de victoria
      document.querySelectorAll(".velo.on").forEach((v) => v.classList.remove("on"));
      await wait(200);
    }
    return out;
  });
  console.log("--- partida automática ---");
  let ok = 0; for (const r of resultados) { if (r.ganado) ok++; console.log((r.ganado ? "✓" : "✗"), r.id, r.error || (r.palabra + " · cubitos " + r.cubitos + " · fallos " + r.fallos)); }
  console.log("ganados:", ok, "/", resultados.length);
  console.log("errores JS totales:", errors.length); errors.slice(0, 8).forEach((e) => console.log("  !", e.slice(0, 200)));
  await page.screenshot({ path: path.join(__dirname, "shot_final.png") });
  await browser.close();
})();
