// Usage: node make.js "NOMBRE" /out/path.pdf [--flat]
const chromium = require('@sparticuz/chromium').default;
const { chromium: pw } = require('playwright-core');
const fs = require('fs');
(async () => {
  const name = process.argv[2] || 'NOMBRE APELLIDO';
  const out = process.argv[3] || '/tmp/cert/out.pdf';
  const flat = process.argv.includes('--flat');
  const exe = await chromium.executablePath();
  const b = await pw.launch({ executablePath: exe, args: chromium.args });
  const page = await b.newPage({ viewport: { width: 1123, height: 794 }, deviceScaleFactor: flat ? 2.5 : 1 });
  let html = fs.readFileSync('/tmp/cert/certificado.html','utf8').replace('{{NOMBRE}}', name);
  fs.writeFileSync('/tmp/cert/_r.html', html);
  await page.goto('file:///tmp/cert/_r.html');
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(250);
  if (flat) {
    // flatten: whole page -> one raster -> PDF (signature baked in, not extractable)
    await page.screenshot({ path: '/tmp/cert/_flat.png' });
  } else {
    await page.pdf({ path: out, width: '1123px', height: '794px', printBackground: true, pageRanges: '1' });
  }
  await b.close();
  console.log(flat ? 'rendered_flat' : 'pdf ok');
})().catch(e => { console.error(e.message); process.exit(1); });
