// Hoja de contacto de los PNG de una o más carpetas _png. Uso: node sheet.js <salida.jpg> <carpeta_png…>
const puppeteer = require("puppeteer-core"), fs = require("fs"), path = require("path");
(async () => {
  const [out, ...dirs] = process.argv.slice(2); const files = [];
  for (const d of dirs) fs.readdirSync(d).filter((f) => /\.png$/i.test(f)).sort().forEach((f) => files.push(path.join(d, f)));
  const html = `<body style="margin:0;background:#fff;display:grid;grid-template-columns:repeat(4,300px);gap:10px;padding:10px;font:13px Arial;color:#14142B">${files.map((f) => `<div style="border:1px solid #D9D7F7;border-radius:8px;padding:6px;background:#F1F0FE"><div style="height:260px;display:flex;align-items:center;justify-content:center;background:#fff;border-radius:6px"><img src="file:///${f.split(path.sep).join("/")}" style="max-width:288px;max-height:256px"></div>${path.basename(path.dirname(path.dirname(f)))}/${path.basename(f)}</div>`).join("")}</body>`;
  const tmp = path.join(__dirname, "_sheet.html"); fs.writeFileSync(tmp, html);
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, userDataDir: path.join(require("os").tmpdir(), "perfil_img_" + process.pid), args: ["--allow-file-access-from-files"] });
  const p = await b.newPage(); await p.setViewport({ width: 4 * 310 + 10, height: 800 });
  await p.goto("file:///" + tmp.split(path.sep).join("/"), { waitUntil: "load" }); await new Promise((r) => setTimeout(r, 400));
  await p.screenshot({ path: out, fullPage: true, type: "jpeg", quality: 82 }); await b.close(); console.log("ok", files.length, out);
})();
