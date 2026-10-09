// Reel 4 «Llegué a Chile sin hablar español»: rótulos PNG transparentes 1080×1920 para CapCut + portada
// Se corre desde una carpeta que tenga v.mp4 (el video de Jay) y c_0_5.jpg (cuadro para la portada; lo saca cuadros.js)
const puppeteer = require("puppeteer-core"), path = require("path"), fs = require("fs");
const REPO = "C:/Users/Chingu/Desktop/ACADEMIASEULWEB";
const OUT = REPO + "/Campana_Assets/instagram/octubre/reels/reel04_llegue";
fs.mkdirSync(OUT, { recursive: true });
const SELLO = fs.readFileSync(REPO + "/Curriculo/Flashcards/marca/sello_linea_v2.svg", "utf8").replace("<svg", '<svg style="width:100%;height:auto;display:block"');
const FONTS = '<link href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Plus+Jakarta+Sans:wght@600;800&display=swap" rel="stylesheet">';
const BASE = `body{margin:0;width:1080px;height:1920px;position:relative;overflow:hidden;background:transparent;font-family:'Plus Jakarta Sans','Malgun Gothic',sans-serif}
.c{position:absolute;left:60px;right:60px;text-align:center}
.az{display:inline-block;background:#4236F6;color:#fff;font-weight:800;padding:18px 34px;border-radius:22px;line-height:1.15}
.bl{display:inline-block;background:#fff;color:#003478;font-weight:800;padding:16px 32px;border-radius:22px;line-height:1.15;box-shadow:0 10px 30px rgba(0,0,0,.18)}
.ko{font-family:'Black Han Sans','Malgun Gothic',sans-serif;font-weight:400}
.sub{display:inline-block;margin-top:14px;background:rgba(0,20,60,.86);color:#E8B84B;font-weight:800;padding:10px 24px;border-radius:14px}
.seal{display:inline-block;width:86px;vertical-align:middle;margin-right:18px;color:#4236F6}`;
(async () => {
  const dir = __dirname.split(path.sep).join("/");
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, userDataDir: path.join(__dirname, "perfil"), args: ["--allow-file-access-from-files", "--no-first-run", "--disable-lcd-text"] });
  const p = await b.newPage(); await p.setViewport({ width: 1080, height: 1920 });
  const render = async (html, file, transp) => {
    fs.writeFileSync(path.join(__dirname, "tmp.html"), `<!doctype html><html><head><meta charset="utf-8">${FONTS}<style>${BASE}</style></head><body>${html}</body></html>`);
    await p.goto("file:///" + dir + "/tmp.html", { waitUntil: "load" }); await p.evaluate(() => document.fonts.ready); await new Promise((r) => setTimeout(r, 300));
    await p.screenshot({ path: OUT + "/" + file, omitBackground: !!transp });
  };
  // Todos los rótulos van arriba (y 200–520), sobre la pared: no tapan la cara ni los subtítulos de CapCut
  const T = 200;
  await render(`<div class="c" style="top:${T}px"><div class="az" style="font-size:62px">Llegué a Chile a los 10 años<br>sin hablar español</div></div>`, "rotulo_1_gancho_0-4s.png", true);
  await render(`<div class="c" style="top:${T}px"><div class="bl" style="font-size:66px"><span class="seal">${SELLO}</span>Academia Seúl</div><br><div class="sub" style="font-size:40px"><span class="ko" style="font-size:44px">한국어를 배우고, 한국을 알아가요</span></div></div>`, "rotulo_2_academia_15-19s.png", true);
  await render(`<div class="c" style="top:${T}px"><div class="bl" style="font-size:64px">Kiran · <span class="ko" style="font-size:70px">기란</span></div><br><div class="sub" style="font-size:42px">Básico 1 · desde cero · mar o jue 20:00</div></div>`, "rotulo_3_kiran.png", true);
  await render(`<div class="c" style="top:${T}px"><div class="bl" style="font-size:64px">Abby · <span class="ko" style="font-size:70px">홍미영</span></div><br><div class="sub" style="font-size:42px">Conversacional 1 · desde Corea · mar 21:00</div></div>`, "rotulo_4_abby.png", true);
  await render(`<div class="c" style="top:${T}px"><div class="bl" style="font-size:64px">Y yo, Jay · <span class="ko" style="font-size:70px">김재희</span></div><br><div class="sub" style="font-size:42px">Básico 2 · TOPIK II · Niños</div></div>`, "rotulo_5_jay.png", true);
  await render(`<div class="c" style="top:${T}px"><div class="az" style="font-size:56px">Tu primera palabra en <span class="ko" style="font-size:66px">한글</span> ✍️</div></div>`, "rotulo_6_hangul.png", true);
  await render(`<div class="c" style="top:${T}px"><div class="bl" style="font-size:46px">En vivo por Zoom · 8 semanas<br>grupos pequeños · certificado</div><br><div class="sub" style="font-size:38px">US$150 el curso completo ·<br>o 2 cuotas de US$75</div></div>`, "rotulo_7_oferta.png", true);
  await render(`<div class="c" style="top:${T}px"><div class="az" style="font-size:52px;padding:16px 30px">Matrícula hasta este domingo 11</div><br><div class="bl" style="font-size:52px;margin-top:16px">academiaseul.com/inscribete</div></div>`, "rotulo_8_cierre.png", true);
  // Portada: cara seria a cámara (0,5 s, sin subtítulo) + texto en la zona segura de la grilla 3:4 (y 240–1680)
  await render(`<div style="position:absolute;inset:0;background:url(c_0_5.jpg) 50% -400px/114% auto no-repeat #001433"></div>
    <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,20,60,0) 50%,rgba(0,20,60,.78) 62%,#001433 70%,#001433 100%)"></div>
    <div class="c" style="top:1215px"><div class="az" style="font-size:88px;padding:18px 40px">LLEGUÉ SIN HABLAR<br>ESPAÑOL</div><br>
    <div class="sub" style="font-size:44px;margin-top:22px">empezamos la semana del 12</div></div>
    <div style="position:absolute;left:50%;margin-left:-55px;top:1745px;width:110px;color:#fff">${SELLO}</div>`, "Reel04_llegue_portada.png");
  // vista previa de los rótulos sobre cuadros del video
  await b.close(); console.log("ok");
})();
