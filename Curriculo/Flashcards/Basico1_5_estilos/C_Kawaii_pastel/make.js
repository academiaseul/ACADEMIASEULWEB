// Flashcards Básico 1 · estilo C · Kawaii pastel
// Renderiza tarjetas.html -> Flashcards_Basico1_C_Kawaii_pastel.pdf (carta, 6 págs) + vista_previa.png (hoja de contacto).
// Uso: node make.js   (puppeteer-core y Chrome del sistema)
const path = require('path');
const fs = require('fs');
const req = require('module').createRequire('C:/Users/Chingu/AppData/Local/Temp/claude/C--Users-Chingu-Desktop-ACADEMIASEULWEB/d4111e1b-5523-44ea-97b2-b1a1d9545b9e/scratchpad/package.json');
const puppeteer = req('puppeteer-core');

const DIR = __dirname;
const HTML = path.join(DIR, 'tarjetas.html');
const PDF = path.join(DIR, 'Flashcards_Basico1_C_Kawaii_pastel.pdf');
const PNG = path.join(DIR, 'vista_previa.png');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--no-sandbox', '--disable-lcd-text'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1100, deviceScaleFactor: 2 });
  await page.goto('file:///' + HTML.replace(/\\/g, '/'), { waitUntil: 'networkidle0', timeout: 90000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() => window.__listo === true, { timeout: 60000 });
  const fuentes = await page.evaluate(() => ({
    jua: document.fonts.check('82px Jua', '우유'),
    nunito: document.fonts.check('900 52px Nunito', 'leche'),
  }));
  if (!fuentes.jua || !fuentes.nunito) console.warn('AVISO: fuentes no cargadas', fuentes);

  // Revisión automática: nada se sale de su tarjeta
  const problemas = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll('.card .inner').forEach((inner) => {
      const n = inner.parentElement.dataset.n, lado = inner.parentElement.classList.contains('front') ? 'anverso' : 'reverso';
      if (inner.scrollHeight > inner.clientHeight + 1) out.push(`${lado} ${n}: alto ${inner.scrollHeight} > ${inner.clientHeight}`);
      inner.querySelectorAll('.es, .ex-kr, .ex-es, .hangul, .kr, .pill').forEach((el) => {
        if (el.scrollWidth > el.clientWidth + 1) out.push(`${lado} ${n}: ancho ${el.className} ${el.scrollWidth} > ${el.clientWidth}`);
      });
    });
    return out;
  });
  if (problemas.length) console.warn('AVISO desbordes:\n' + problemas.join('\n'));

  await page.emulateMediaType('print');
  await page.pdf({ path: PDF, format: 'Letter', printBackground: true, preferCSSPageSize: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  await page.emulateMediaType('screen');

  // Hoja de contacto: 12 anversos + 12 reversos en miniatura
  const box = await page.evaluate(() => {
    const sheet = document.createElement('div');
    sheet.id = 'sheet';
    sheet.style.cssText = 'position:absolute;left:0;top:0;z-index:99;background:#EFEBFF;padding:22px 24px 24px;width:' + (6 * 168 + 5 * 12 + 48) + 'px;font-family:Nunito,sans-serif';
    const title = (t) => { const h = document.createElement('div'); h.textContent = t; h.style.cssText = 'font-weight:900;font-size:16px;color:#003478;margin:4px 0 10px'; return h; };
    const grid = () => { const g = document.createElement('div'); g.style.cssText = 'display:grid;grid-template-columns:repeat(6,168px);gap:12px;margin-bottom:14px'; return g; };
    const add = (g, card) => {
      const w = document.createElement('div'); w.style.cssText = 'width:168px;height:228px;overflow:hidden;position:relative';
      const c = card.cloneNode(true); c.style.cssText = 'transform:scale(.5);transform-origin:0 0;position:absolute;left:0;top:0';
      w.appendChild(c); g.appendChild(w);
    };
    sheet.appendChild(title('Flashcards Básico 1 · C · Kawaii pastel — anversos'));
    const gf = grid(); for (let n = 1; n <= 12; n++) add(gf, document.querySelector(`.card.front[data-n="${n}"]`)); sheet.appendChild(gf);
    sheet.appendChild(title('Reversos'));
    const gb = grid(); for (let n = 1; n <= 12; n++) add(gb, document.querySelector(`.card.back[data-n="${n}"]`)); sheet.appendChild(gb);
    document.body.appendChild(sheet);
    const r = sheet.getBoundingClientRect();
    return { x: r.left + window.scrollX, y: r.top + window.scrollY, width: r.width, height: r.height };
  });
  await page.setViewport({ width: Math.ceil(box.width), height: Math.ceil(box.height), deviceScaleFactor: 1.5 });
  const el = await page.$('#sheet');
  await el.screenshot({ path: PNG });
  await browser.close();

  const kb = (f) => (fs.statSync(f).size / 1024).toFixed(0) + ' KB';
  console.log('PDF:', PDF, kb(PDF));
  console.log('PNG:', PNG, kb(PNG));
})().catch((e) => { console.error(e); process.exit(1); });
