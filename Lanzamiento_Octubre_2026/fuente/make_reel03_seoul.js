// Reel 3 (서울): rótulos PNG transparentes 1080×1920 para CapCut + portada
const puppeteer = require("puppeteer-core"), path = require("path"), fs = require("fs");
const REPO = "C:/Users/Chingu/Desktop/ACADEMIASEULWEB";
const OUT = REPO + "/Campana_Assets/instagram/octubre/reels/reel03_seoul";
fs.mkdirSync(OUT, { recursive: true });
const SELLO = fs.readFileSync(REPO + "/Curriculo/Flashcards/marca/sello_linea_v2.svg", "utf8").replace("<svg", '<svg style="width:100%;height:auto;display:block"');
const FONTS = '<link href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Plus+Jakarta+Sans:wght@600;800&display=swap" rel="stylesheet">';
const BASE = `body{margin:0;width:1080px;height:1920px;position:relative;overflow:hidden;background:transparent;font-family:'Plus Jakarta Sans','Malgun Gothic',sans-serif}
.c{position:absolute;left:60px;right:60px;text-align:center}
.az{display:inline-block;background:#4236F6;color:#fff;font-weight:800;padding:18px 34px;border-radius:22px;line-height:1.15}
.bl{display:inline-block;background:#fff;color:#003478;font-weight:800;padding:16px 32px;border-radius:22px;line-height:1.15;box-shadow:0 10px 30px rgba(0,0,0,.18)}
.ko{font-family:'Black Han Sans','Malgun Gothic',sans-serif;font-weight:400}
.sub{display:inline-block;margin-top:14px;background:rgba(0,20,60,.86);color:#E8B84B;font-weight:800;padding:10px 24px;border-radius:14px}`;
(async () => {
  const dir = __dirname.split(path.sep).join("/");
  fs.writeFileSync(path.join(__dirname, "full1080.html"), '<body style="margin:0;background:#000"><video id="v" src="v.mp4" muted preload="auto" style="width:1080px;height:1920px;display:block"></video></body>');
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, userDataDir: path.join(__dirname, "perfil"), args: ["--allow-file-access-from-files", "--no-first-run", "--disable-lcd-text"] });
  const p = await b.newPage(); await p.setViewport({ width: 1080, height: 1920 });
  await p.goto("file:///" + dir + "/full1080.html");
  await p.evaluate(() => new Promise((r) => { const v = document.getElementById("v"); if (v.readyState >= 1) r(); v.onloadedmetadata = () => r(); }));
  for (const t of [4.6, 4.9, 9.3, 16.8]) {
    await p.evaluate((t) => new Promise((r) => { const v = document.getElementById("v"); v.onseeked = () => r(); v.currentTime = t; setTimeout(r, 4000); }), t);
    await p.screenshot({ path: path.join(__dirname, `c_${String(t).replace(".", "_")}.jpg`), type: "jpeg", quality: 94 });
  }
  const render = async (html, file, transp) => {
    fs.writeFileSync(path.join(__dirname, "tmp.html"), `<!doctype html><html><head><meta charset="utf-8">${FONTS}<style>${BASE}</style></head><body>${html}</body></html>`);
    await p.goto("file:///" + dir + "/tmp.html", { waitUntil: "load" }); await p.evaluate(() => document.fonts.ready); await new Promise((r) => setTimeout(r, 300));
    await p.screenshot({ path: OUT + "/" + file, omitBackground: !!transp });
  };
  // Rótulos (el texto va arriba de los subtítulos, sobre el pecho, sin tapar la cara)
  await render(`<div class="c" style="top:250px"><div class="az" style="font-size:62px">Cuando le dices “Seúl”<br>a un coreano 😂</div></div>`, "rotulo_1_gancho_0-3s.png", true);
  await render(`<div class="c" style="top:1020px"><div class="bl ko" style="font-size:230px;padding:10px 60px 0">서울</div></div>`, "rotulo_2_seoul_grande_9-10s.png", true);
  await render(`<div class="c" style="top:1040px"><div class="bl ko" style="font-size:150px;padding:6px 50px 0">서 · 울</div><br><div class="sub" style="font-size:44px">2 sílabas parejas</div></div>`, "rotulo_3_silabas_13-16s.png", true);
  await render(`<div class="c" style="top:1040px"><div class="bl" style="font-size:58px"><span class="ko" style="font-size:96px;vertical-align:-8px">ㅓ</span> = boca de “a”,<br>dices “o”</div></div>`, "rotulo_4_eo_19-21s.png", true);
  await render(`<div class="c" style="top:1040px"><div class="bl" style="font-size:58px"><span class="ko" style="font-size:96px;vertical-align:-8px">울</span> = u + la “l” de “sol”</div></div>`, "rotulo_5_ul_21-23s.png", true);
  await render(`<div class="c" style="top:1000px"><div class="az" style="font-size:60px">¿Se-ÚL, Soul o <span class="ko">서울</span>? 👇</div><br><div class="sub" style="font-size:44px">Te leo en los comentarios</div></div>`, "rotulo_6_final_30-33s.png", true);
  // Portada: el coreano confundido (어디요?) + texto en la zona segura de la grilla 3:4
  await render(`<div style="position:absolute;inset:0;background:url(c_4_9.jpg) center/cover"></div>
    <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,20,60,0) 46%,rgba(0,20,60,.75) 58%,#001433 65%,#001433 100%)"></div>
    <div style="position:absolute;left:0;right:0;top:600px;height:420px"></div>
    <div class="c" style="top:1130px"><div class="az" style="font-size:96px;padding:16px 40px 10px;font-family:'Black Han Sans','Plus Jakarta Sans'">¿SE-ÚL? ¿SOUL?</div><br>
    <div class="bl" style="font-size:150px;margin-top:18px;padding:4px 50px 0"><span style="font-size:90px;vertical-align:20px">→ </span><span class="ko">서울</span></div><br>
    <div class="sub" style="font-size:46px;margin-top:22px">Cuando le dices “Seúl” a un coreano 😂</div></div>
    <div style="position:absolute;left:50%;margin-left:-55px;top:1745px;width:110px;color:#fff">${SELLO}</div>`, "Reel03_seoul_portada.png");
  await b.close(); console.log("ok");
})();
