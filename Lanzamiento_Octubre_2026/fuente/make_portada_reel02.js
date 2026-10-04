// Portada del Reel 2 (3 piropos): cuadro del video a 1080×1920 + texto de la serie
const puppeteer = require("puppeteer-core");
const path = require("path");
const fs = require("fs");
const REPO = "C:/Users/Chingu/Desktop/ACADEMIASEULWEB";
const OUT = REPO + "/Campana_Assets/instagram/octubre/reels";
fs.mkdirSync(OUT, { recursive: true });
const SELLO = fs.readFileSync(REPO + "/Curriculo/Flashcards/marca/sello_linea_v2.svg", "utf8");
(async () => {
  const dir = __dirname.split(path.sep).join("/");
  fs.writeFileSync(path.join(__dirname, "full.html"), '<body style="margin:0;background:#000"><video id="v" src="v.mp4" muted preload="auto" style="width:1080px;height:1920px;display:block;object-fit:cover"></video></body>');
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--allow-file-access-from-files", "--disable-lcd-text"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1080, height: 1920 });
  await p.goto("file:///" + dir + "/full.html");
  await p.evaluate(() => new Promise((r) => { const v = document.getElementById("v"); if (v.readyState >= 1) r(); v.onloadedmetadata = () => r(); }));
  const tiempos = [8.3, 12.6, 14.3, 34.6, 36.3, 38.3];
  for (const t of tiempos) {
    await p.evaluate((t) => new Promise((r) => { const v = document.getElementById("v"); v.onseeked = () => r(); v.currentTime = t; setTimeout(r, 4000); }), t);
    await p.screenshot({ path: path.join(__dirname, `cuadro_${String(t).replace(".", "_")}.jpg`), type: "jpeg", quality: 92 });
  }
  const variantes = [
    { t: 14.3, archivo: "Reel02_piropos_portada_A.png", l1: "3 PIROPOS", l2: "EN COREANO", sub: "el 3.º ya es matrimonio" },
    { t: 36.3, archivo: "Reel02_piropos_portada_B.png", l1: "¿PIROPO", l2: "O MATRIMONIO?", sub: "3 frases en coreano", l2size: 98 },
  ];
  for (const v of variantes) {
    const img = "cuadro_" + String(v.t).replace(".", "_") + ".jpg";
    const html = `<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Do+Hyeon&family=Plus+Jakarta+Sans:wght@800&display=swap" rel="stylesheet"><style>
      body{margin:0;width:1080px;height:1920px;position:relative;overflow:hidden;font-family:'Plus Jakarta Sans',sans-serif}
      .bg{position:absolute;inset:0;background:url(${img}) no-repeat;background-size:1312px 2333px;background-position:-116px -413px}
      .shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,52,120,0) 48%,rgba(0,20,60,.6) 64%,#001433 77%,#001433 100%)}
      /* zona segura de la grilla 3:4 = y 240–1680; texto entre ~1180 y 1560 */
      .box{position:absolute;left:90px;right:90px;top:1130px;text-align:center}
      .l1,.l2{display:inline-block;background:#4236F6;color:#fff;font-family:'Black Han Sans','Plus Jakarta Sans',sans-serif;font-size:118px;line-height:1.05;padding:14px 34px 6px;letter-spacing:1px}
      .l2{background:#fff;color:#003478;margin-top:14px}
      .sub{margin-top:26px;display:inline-block;background:rgba(0,20,60,.82);color:#E8B84B;font-size:52px;font-weight:800;padding:12px 28px;border-radius:10px}
      .sello{position:absolute;left:50%;margin-left:-60px;top:1720px;width:120px;color:#fff;filter:drop-shadow(0 2px 6px rgba(0,0,0,.35))}
      .sello svg{width:100%;height:auto;display:block}
    </style></head><body><div class="bg"></div><div class="shade"></div>
      <div class="sello">${SELLO}</div>
      <div class="box"><div class="l1">${v.l1}</div><br><div class="l2" style="font-size:${v.l2size||118}px">${v.l2}</div><br><div class="sub">${v.sub}</div></div>
    </body></html>`;
    fs.writeFileSync(path.join(__dirname, "portada.html"), html);
    await p.goto("file:///" + dir + "/portada.html", { waitUntil: "networkidle0" });
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: OUT + "/" + v.archivo });
  }
  await b.close();
  console.log("ok");
})();
