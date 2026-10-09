const puppeteer = require("puppeteer-core"), path = require("path"), fs = require("fs");
(async () => {
  const dir = __dirname.split(path.sep).join("/");
  fs.writeFileSync(path.join(__dirname, "full1080.html"), '<body style="margin:0;background:#000"><video id="v" src="v.mp4" muted preload="auto" style="width:1080px;height:1920px;display:block"></video></body>');
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, userDataDir: path.join(__dirname, "perfil"), args: ["--allow-file-access-from-files", "--no-first-run"] });
  const p = await b.newPage(); await p.setViewport({ width: 1080, height: 1920 });
  await p.goto("file:///" + dir + "/full1080.html");
  await p.evaluate(() => new Promise((r) => { const v = document.getElementById("v"); if (v.readyState >= 1) r(); v.onloadedmetadata = () => r(); }));
  for (const t of process.argv.slice(2).map(Number)) {
    await p.evaluate((t) => new Promise((r) => { const v = document.getElementById("v"); v.onseeked = () => r(); v.currentTime = t; setTimeout(r, 4000); }), t);
    await p.screenshot({ path: path.join(__dirname, `c_${String(t).replace(".", "_")}.jpg`), type: "jpeg", quality: 92 });
  }
  // hoja chica de candidatos
  const ts = process.argv.slice(2);
  fs.writeFileSync(path.join(__dirname, "cand.html"), `<body style="margin:0;background:#222;color:#fff;font:20px sans-serif;display:flex;gap:8px;padding:8px">${ts.map((t) => `<div><img src="c_${t.replace(".", "_")}.jpg" style="width:270px;display:block">${t} s</div>`).join("")}</body>`);
  await p.setViewport({ width: ts.length * 278 + 16, height: 520 }); await p.goto("file:///" + dir + "/cand.html"); await new Promise((r) => setTimeout(r, 400));
  await p.screenshot({ path: path.join(__dirname, "cand.jpg"), type: "jpeg", quality: 80 });
  await b.close(); console.log("ok");
})();
