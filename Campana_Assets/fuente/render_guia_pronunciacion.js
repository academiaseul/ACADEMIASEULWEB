// Renderiza la Guía de Pronunciación (versión azul) a PDF.
//
//   Fuente : Campana_Assets/fuente/pronunciacion-coreana-PRINT_azul.html
//   Salida : public/pronunciacion-coreana-academia-seul.pdf   (enlazado desde /recursos/guias)
//
// Uso (desde una carpeta que tenga puppeteer-core en node_modules, p. ej. el scratchpad):
//   node C:/Users/Chingu/Desktop/ACADEMIASEULWEB/Campana_Assets/fuente/render_guia_pronunciacion.js [salida.pdf]
//
// Página A4 (595.32 × 841.92 pt, igual que el PDF anterior), márgenes 0 (los define @page en el
// HTML; cada .page trae su propio padding), fondos impresos. Antes de imprimir comprueba que
// ninguna .page pase de 297 mm, para que cada sección quede en una sola hoja y nada se corte.
const path = require('path');
const fs = require('fs');

// puppeteer-core se resuelve desde la carpeta de trabajo (cwd) y, si no está, desde junto al script.
const puppeteer = require(require.resolve('puppeteer-core', { paths: [process.cwd(), __dirname] }));

const ROOT = path.resolve(__dirname, '..', '..');
const SRC = path.join(__dirname, 'pronunciacion-coreana-PRINT_azul.html');
const OUT = process.argv[2] ? path.resolve(process.argv[2]) : path.join(ROOT, 'public', 'pronunciacion-coreana-academia-seul.pdf');
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, args: ['--font-render-hinting=none'] });
  try {
    const page = await browser.newPage();
    await page.emulateMediaType('print');
    await page.goto('file:///' + SRC.replace(/\\/g, '/'), { waitUntil: 'networkidle0', timeout: 120000 });
    // Google Fonts (Inter, Pacifico, Noto Sans KR): esperar a que estén cargadas de verdad
    await page.evaluate(async () => {
      await document.fonts.ready;
      const need = ['900 20px "Noto Sans KR"', '400 20px Pacifico', '700 20px Inter'];
      await Promise.all(need.map((f) => document.fonts.load(f, '한국어 Aa')));
    });
    const fonts = await page.evaluate(() => ['Noto Sans KR', 'Pacifico', 'Inter'].map((f) => f + ':' + document.fonts.check(`20px "${f}"`, '한A')));
    console.log('Fuentes:', fonts.join('  '));

    // Control: cada .page debe medir como máximo 297 mm (1122.5 px a 96 dpi)
    const alturas = await page.evaluate(() => [...document.querySelectorAll('.page')].map((p, i) => ({ i: i + 1, mm: +(p.scrollHeight * 25.4 / 96).toFixed(1) })));
    const largas = alturas.filter((a) => a.mm > 297.2);
    console.log('Alto por página (mm):', alturas.map((a) => `${a.i}:${a.mm}`).join('  '));
    if (largas.length) {
      throw new Error('Páginas que no caben en A4: ' + largas.map((a) => `${a.i} (${a.mm} mm)`).join(', '));
    }

    await page.pdf({
      path: OUT,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });
    console.log('PDF:', OUT, (fs.statSync(OUT).size / 1024).toFixed(0) + ' KB');
  } finally {
    await browser.close();
  }
})().catch((e) => { console.error(e.message || e); process.exit(1); });
