// Reel de Kiran: portada 1080x1920 + rótulos PNG transparentes para CapCut
const puppeteer = require("puppeteer-core"), path = require("path"), fs = require("fs");
const REPO = "C:/Users/Chingu/Desktop/ACADEMIASEULWEB";
const OUT = REPO + "/Campana_Assets/instagram/octubre/reels/kiran";
fs.mkdirSync(OUT, { recursive: true });
const SELLO = fs.readFileSync(REPO + "/Curriculo/Flashcards/marca/sello_linea_v2.svg", "utf8");
const FONTS = '<link href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Plus+Jakarta+Sans:wght@600;800&display=swap" rel="stylesheet">';
const BASE = "body{margin:0;width:1080px;height:1920px;position:relative;overflow:hidden;font-family:'Plus Jakarta Sans','Malgun Gothic',sans-serif;background:transparent}.c{position:absolute;left:0;right:0;text-align:center}.blk{display:inline-block;background:#4236F6;color:#fff;font-family:'Plus Jakarta Sans','Black Han Sans','Malgun Gothic';font-weight:800;padding:14px 34px 8px}.wh{display:inline-block;background:#fff;color:#003478;font-family:'Plus Jakarta Sans','Black Han Sans','Malgun Gothic';font-weight:800;padding:12px 30px 6px}.pill{display:inline-block;background:rgba(0,20,60,.85);color:#E8B84B;font-weight:800;padding:12px 28px;border-radius:12px}";
(async () => {
  const dir = __dirname.split(path.sep).join("/");
  fs.writeFileSync(path.join(__dirname, "full.html"), '<body style="margin:0;background:#000"><video id="v" src="v.mp4" muted preload="auto" style="width:1080px;height:1920px;display:block"></video></body>');
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--allow-file-access-from-files", "--disable-lcd-text"] });
  const p = await b.newPage(); await p.setViewport({ width: 1080, height: 1920 });
  await p.goto("file:///" + dir + "/full.html");
  await p.evaluate(() => new Promise((r) => { const v = document.getElementById("v"); if (v.readyState >= 1) r(); v.onloadedmetadata = () => r(); }));
  for (const t of [4.3, 8.3, 11.3, 15.5]) {
    await p.evaluate((t) => new Promise((r) => { const v = document.getElementById("v"); v.onseeked = () => r(); v.currentTime = t; setTimeout(r, 4000); }), t);
    await p.screenshot({ path: path.join(__dirname, `k_${String(t).replace(".", "_")}.jpg`), type: "jpeg", quality: 94 });
  }
  const render = async (html, file, transparent) => {
    fs.writeFileSync(path.join(__dirname, "tmp.html"), `<!doctype html><html><head><meta charset="utf-8">${FONTS}<style>${BASE}</style></head><body>${html}</body></html>`);
    await p.goto("file:///" + dir + "/tmp.html", { waitUntil: "networkidle0" }); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: OUT + "/" + file, omitBackground: !!transparent });
  };
  // Portada: zoom 1.35 sobre el cuadro de 8,3 s, cara arriba, texto sobre el torso
  await render(`<div style="position:absolute;inset:0;background:url(k_15_5.jpg) no-repeat;background-size:1350px 2400px;background-position:-150px -330px"></div>
    <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,20,60,0) 52%,rgba(0,20,60,.6) 64%,#001433 80%)"></div>
    <div class="c" style="top:1130px"><div class="blk" style="font-size:80px">CONOCE A TU PROFE</div><br>
    <div class="wh" style="font-size:118px;margin-top:14px">KIRAN · 기란</div><br>
    <div class="pill" style="font-size:46px;margin-top:24px">Básico 1 (A1.1) · desde cero</div></div>
    <div style="position:absolute;left:50%;margin-left:-55px;top:1735px;width:110px;color:#fff">${SELLO.replace("<svg", '<svg style="width:100%;height:auto"')}</div>`, "Reel_Kiran_portada.png");
  // Rótulo 1 (0–3 s): título arriba, en el espacio libre de la pared
  await render(`<div class="c" style="top:300px"><div class="blk" style="font-size:70px">CONOCE A TU PROFE 👋</div></div>`, "rotulo_1_titulo.png", true);
  // Rótulo 2 (2–9 s): nombre
  await render(`<div class="c" style="top:300px"><div class="wh" style="font-size:104px">KIRAN · 기란</div><br><div class="pill" style="font-size:44px;margin-top:16px">Profe de Básico 1 (A1.1)</div></div>`, "rotulo_2_nombre.png", true);
  // Rótulo 3 (9–15 s): horario
  await render(`<div class="c" style="top:300px"><div class="blk" style="font-size:66px">MARTES o JUEVES · 20:00</div><br><div class="pill" style="font-size:42px;margin-top:16px">hora Chile · 8 semanas · en vivo por Zoom</div></div>`, "rotulo_3_horario.png", true);
  // Cierre (último 1,5 s, sobre fondo azul)
  await render(`<div style="position:absolute;inset:0;background:#4236F6"></div>
    <div style="position:absolute;left:50%;margin-left:-110px;top:470px;width:220px;color:#fff">${SELLO.replace("<svg", '<svg style="width:100%;height:auto"')}</div>
    <div class="c" style="top:780px;color:#fff;font-family:'Plus Jakarta Sans';font-weight:800;font-size:92px;line-height:1.1">Básico 1 con Kiran</div>
    <div class="c" style="top:930px;color:#fff;font-size:48px;font-weight:600">empieza la semana del 12 de octubre</div>
    <div class="c" style="top:1090px"><div class="wh" style="font-size:54px">Matrícula hasta el domingo 11</div></div>
    <div class="c" style="top:1240px;color:#E8B84B;font-size:50px;font-weight:800">academiaseul.com/nivel-1</div>`, "cierre_kiran.png");
  await b.close(); console.log("ok");
})();
