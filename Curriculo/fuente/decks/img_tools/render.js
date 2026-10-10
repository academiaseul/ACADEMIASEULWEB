// SVG → PNG respetando la proporción del viewBox. Uso: node render.js <a.svg> [b.svg …]  → <carpeta>/_png/<nombre>.png
// (NODE_PATH = node_modules del scratchpad, por puppeteer-core)
const puppeteer = require("puppeteer-core"), fs = require("fs"), path = require("path");
const dims = (svg) => { const m = svg.match(/viewBox="\s*([-\d.]+)[\s,]+([-\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)\s*"/); return m ? { w: +m[3], h: +m[4] } : null; };
async function render(files, ancho = 900) {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, userDataDir: path.join(require("os").tmpdir(), "perfil_img_" + process.pid) });
  const out = [];
  for (const f of files) {
    const svg = fs.readFileSync(f, "utf8"); const d = dims(svg);
    if (!d) { out.push({ f, error: "sin viewBox" }); continue; }
    const w = ancho, h = Math.round(ancho * d.h / d.w);
    const p = await b.newPage(); await p.setViewport({ width: w, height: h });
    await p.setContent(`<html><head><style>html,body{margin:0;background:transparent}svg{display:block;width:${w}px;height:${h}px}</style></head><body>${svg}</body></html>`, { waitUntil: "load" });
    const dir = path.join(path.dirname(f), "_png"); fs.mkdirSync(dir, { recursive: true });
    const png = path.join(dir, path.basename(f, ".svg") + ".png");
    await p.screenshot({ path: png, omitBackground: true }); await p.close();
    out.push({ f, png, w, h });
  }
  await b.close(); return out;
}
module.exports = { render, dims };
if (require.main === module) render(process.argv.slice(2)).then((r) => r.forEach((x) => console.log(x.error ? "ERROR " + x.f + ": " + x.error : "ok " + x.png + " (" + x.w + "x" + x.h + ")")));
