// Hoja de contacto de los PNG exportados por PowerPoint: node hoja_qa.js <carpeta_png> <salida.jpg> [cols]
const puppeteer = require("puppeteer-core"), fs = require("fs"), path = require("path");
(async () => {
  const dir = process.argv[2], out = process.argv[3], cols = +(process.argv[4] || 3);
  const files = fs.readdirSync(dir).filter((f) => /\.png$/i.test(f)).sort((a, b) => parseInt(a.match(/\d+/)) - parseInt(b.match(/\d+/)));
  const w = +(process.env.TW || 640), h = Math.round(w * 9 / 16);
  const html = `<body style="margin:0;background:#333;display:grid;grid-template-columns:repeat(${cols},${w}px);gap:8px;padding:8px;font:16px sans-serif;color:#fff">${files.map((f) => `<div><img src="file:///${path.join(dir, f).split(path.sep).join("/")}" style="width:${w}px;height:${h}px;display:block">${f}</div>`).join("")}</body>`;
  const tmp = path.join(__dirname, "hoja_qa.html"); fs.writeFileSync(tmp, html);
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, userDataDir: path.join(__dirname, "perfil"), args: ["--allow-file-access-from-files"] });
  const p = await b.newPage(); await p.setViewport({ width: cols * (w + 8) + 8, height: 800 });
  await p.goto("file:///" + tmp.split(path.sep).join("/"), { waitUntil: "load" }); await new Promise((r) => setTimeout(r, 500));
  await p.screenshot({ path: out, fullPage: true, type: "jpeg", quality: 80 }); await b.close(); console.log("ok", files.length);
})();
