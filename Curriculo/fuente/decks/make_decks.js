// Decks de clase · Academia Seúl (Básico 1 y Básico 2, octubre 2026)
// Uso: node make_decks.js specs.json [filtro]   (specs.json = [{curso, semana, titulo_clase, profe, romanizacion, slides:[...]}])
// Salida: Curriculo/Fase2_Basico1/decks/*.pptx y Curriculo/Fase3_Basico2/decks/*.pptx
// Después: post_com.ps1 agrega animaciones (romanización rom_* y respuestas rev_* aparecen con clic) y exporta PNG para QA.
const fs = require("fs");
const path = require("path");
const pptxgen = require("pptxgenjs");
const puppeteer = require("puppeteer-core");
const { sinCorteCoreano } = require("./sin_corte.js");
const { applyTheme } = require("C:/Users/Chingu/AppData/Roaming/Claude/local-agent-mode-sessions/skills-plugin/7b3bb76d-ee2d-4098-8154-47937cff2f23/896d20ea-cb61-4a3d-b255-6aac8abf1475/skills/pptx/scripts/apply_theme.js");

const REPO = "C:/Users/Chingu/Desktop/ACADEMIASEULWEB";
const AUDIO = REPO + "/public/audio/kr/";
const ILU = REPO + "/Curriculo/Flashcards/Basico1_completo/A_Sticker_pop/ilustraciones/";
const CACHE = path.join(__dirname, "cache");
fs.mkdirSync(CACHE, { recursive: true });

const THEME = {
  name: "Academia Seul", headFontFace: "Arial", bodyFontFace: "Arial",
  colors: { dk1: "14142B", lt1: "FFFFFF", dk2: "003478", lt2: "F1F0FE", accent1: "4236F6", accent2: "E8B84B", accent3: "003478", accent4: "8A83FF", accent5: "5C5F6B", accent6: "B8962E", hlink: "4236F6", folHlink: "003478" },
};
const COL = { ink: "14142B", navy: "003478", azul: "4236F6", oro: "E8B84B", gris: "8A8DA0", tinta2: "5C5F6B", tinte: "F1F0FE", borde: "D9D7F7", blanco: "FFFFFF" };
const KO_FONT = "Malgun Gothic";
const W = 13.333, H = 7.5, MX = 0.6, TOP = 1.45, BOT = 6.75;

const HANGUL = /[\u1100-\u11FF\u3130-\u318F\uAC00-\uD7AF]/;
const hex = (t) => Buffer.from(t, "utf8").toString("hex");
const clip = (t) => { if (!t) return null; for (const x of [t, t.replace(/[.?!。~]+$/, "")]) { const p = AUDIO + hex(x) + ".mp3"; if (x && fs.existsSync(p)) return p; } return null; };
const len = (s) => [...String(s || "")].length;

// Parte un texto en runs: lo coreano en Malgun Gothic
function runs(text, opts = {}) {
  const s = String(text ?? "");
  const out = []; let cur = "", ko = null;
  for (const ch of s) {
    const isKo = HANGUL.test(ch) || (ko && /\s/.test(ch));
    if (ko === null) ko = isKo;
    if (isKo !== ko) { out.push({ text: cur, options: { ...opts, ...(ko ? { fontFace: KO_FONT } : {}) } }); cur = ""; ko = isKo; }
    cur += ch;
  }
  if (cur) out.push({ text: cur, options: { ...opts, ...(ko ? { fontFace: KO_FONT } : {}) } });
  return out.length ? out : [{ text: "", options: opts }];
}
const fontFor = (t) => (HANGUL.test(String(t || "")) ? KO_FONT : "Arial");
// Talla por largo: base para textos cortos; baja por tramos sin pasar del mínimo
const fit = (t, base, min, per) => Math.max(min, Math.round(base - Math.max(0, len(t) - per) * (base - min) / (per * 2)));
// Ancho aproximado en "ems": hangul = 1, latino ≈ 0,58, espacio ≈ 0,3
const ems = (s) => [...String(s)].reduce((a, ch) => a + (HANGUL.test(ch) ? 1 : ch === " " ? 0.3 : 0.58), 0);
// Coreano grande que nunca se corta a mitad de palabra: talla por ancho y alto; si queda muy chico, parte en 2 líneas por un espacio
function koFit(text, wIn, hIn, max, min = 18) {
  const t = String(text || "").trim();
  const talla = (lines) => Math.max(min, Math.min(max, Math.floor((wIn * 72 * 0.9) / Math.max(1, ...lines.map(ems))), Math.floor((hIn * 72) / (lines.length * 1.25))));
  let best = { text: t, size: talla([t]) };
  const sp = [...t.matchAll(/ /g)].map((m) => m.index);
  if (sp.length && best.size < max * 0.7) {
    let bal0 = Infinity;
    for (const i of sp) { const ls = [t.slice(0, i), t.slice(i + 1)]; const sz = talla(ls); const bal = Math.max(...ls.map(ems)); if (sz > best.size || (sz === best.size && best.text.includes("\n") && bal < bal0)) { best = { text: ls.join("\n"), size: sz }; bal0 = bal; } }
  }
  return best;
}
// Texto con saltos de línea → runs por línea (sin "\n" dentro de un run)
function lineas(text, opts = {}) {
  const ls = String(text ?? "").split("\n"); const out = [];
  ls.forEach((l, i) => { const rr = runs(l, opts); if (i < ls.length - 1) rr[rr.length - 1].options = { ...rr[rr.length - 1].options, breakLine: true }; out.push(...rr); });
  return out;
}

// ─── imágenes (sello y dibujos SVG → PNG) ───
const SELLO = { navy: REPO + "/public/email/sello-navy.png", blanco: REPO + "/public/email/sello-blanco.png", azul: REPO + "/public/email/sello-azul.png" };
let browser;
async function svgPng(file, out, size = 360) {
  if (fs.existsSync(out)) return out;
  if (!browser) browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, userDataDir: path.join(__dirname, "perfil") });
  const p = await browser.newPage(); await p.setViewport({ width: size, height: size });
  const svg = fs.readFileSync(file, "utf8");
  await p.setContent(`<html><body style="margin:0;background:transparent"><div style="width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center">${svg.replace("<svg", `<svg style="width:${size}px;height:${size}px"`)}</div></body></html>`);
  await p.screenshot({ path: out, omitBackground: true }); await p.close();
  return out;
}
const dibujo = async (ko) => { const f = ILU + hex(ko) + ".svg"; return fs.existsSync(f) ? svgPng(f, path.join(CACHE, hex(ko) + ".png")) : null; };
async function iconoAudio() {
  const out = path.join(CACHE, "audio_icon.png"); if (fs.existsSync(out)) return out;
  const f = path.join(CACHE, "audio_icon.svg");
  fs.writeFileSync(f, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="#4236F6"/><path d="M18 26h8l10-8v28l-10-8h-8z" fill="#fff"/><path d="M41 24c3 2.5 3 13.5 0 16M45 20c6 5 6 19 0 24" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`);
  return svgPng(f, out, 128);
}

// ─── layouts (uno por marco) ───
function layouts(pres, pie) {
  pres.defineSlideMaster({ title: "AS_PORTADA", background: { color: COL.navy }, objects: [
    { image: { path: SELLO.blanco, x: 0.7, y: 0.6, w: 0.9, h: 0.9 } },
    { text: { text: "ACADEMIA SEÚL", options: { x: 1.75, y: 0.78, w: 6, h: 0.5, fontSize: 14, bold: true, color: COL.blanco, charSpacing: 6, isTextBox: true, margin: 0 } } },
    { placeholder: { options: { name: "title", type: "title", x: 0.7, y: 3.35, w: 11.9, h: 1.0, fontSize: 44, bold: true, color: COL.blanco, valign: "top", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "body", type: "body", x: 0.7, y: 4.55, w: 11.9, h: 2.0, fontSize: 22, color: COL.oro, valign: "top", margin: 0 }, text: "" } },
    { text: { text: pie, options: { x: 0.7, y: 6.75, w: 11.9, h: 0.4, fontSize: 12, color: "B9C3DA", isTextBox: true, margin: 0 } } },
  ] });
  pres.defineSlideMaster({ title: "AS_CONTENIDO", background: { color: COL.blanco }, margin: [0.4, 0.6, 0.6, 0.6], slideNumber: { x: 12.3, y: 7.0, w: 0.6, h: 0.3, fontSize: 10, color: COL.gris, align: "right" }, objects: [
    { placeholder: { options: { name: "title", type: "title", x: MX, y: 0.35, w: 11.2, h: 0.9, fontSize: 30, bold: true, color: COL.navy, valign: "middle", margin: 0 }, text: "" } },
    { image: { path: SELLO.azul, x: 12.25, y: 0.45, w: 0.55, h: 0.55 } },
    { text: { text: pie, options: { x: MX, y: 7.0, w: 10, h: 0.3, fontSize: 10, color: COL.gris, isTextBox: true, margin: 0 } } },
  ] });
  pres.defineSlideMaster({ title: "AS_CIERRE", background: { color: COL.azul }, objects: [
    { image: { path: SELLO.blanco, x: 6.17, y: 0.55, w: 1.0, h: 1.0 } },
    { placeholder: { options: { name: "title", type: "title", x: 0.8, y: 1.85, w: 11.73, h: 1.2, fontSize: 40, bold: true, color: COL.blanco, align: "center", valign: "middle", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "body", type: "body", x: 1.6, y: 3.25, w: 10.13, h: 3.2, fontSize: 22, color: COL.blanco, valign: "top", margin: 0 }, text: "" } },
    { text: { text: pie, options: { x: 0.8, y: 6.85, w: 11.73, h: 0.35, fontSize: 11, color: "D9D7F7", align: "center", isTextBox: true, margin: 0 } } },
  ] });
}

function tituloRuns(s) {
  const r = [];
  const conKo = s.titulo_ko && !String(s.titulo).includes(s.titulo_ko);
  // el título vive en una línea de 11,2": se elige la talla más grande que cabe; si la glosa en inglés no cabe, se omite (nunca queda colgando)
  const base = ems((conKo ? s.titulo_ko + "  " : "") + s.titulo), en = s.titulo_en ? ems("   " + s.titulo_en) * 15 : 0, ANCHO = 11.2 * 72 * 0.9;
  let fz = [30, 26, 22].find((z) => base * z + en <= ANCHO), conEn = !!s.titulo_en;
  if (!fz) { conEn = false; fz = [30, 26, 22].find((z) => base * z <= ANCHO) || 22; }
  if (conKo) r.push(...runs(s.titulo_ko + "  ", { color: COL.azul, fontSize: fz }));
  r.push(...runs(s.titulo, { fontSize: fz }));
  if (conEn) r.push({ text: "   " + s.titulo_en, options: { fontSize: 15, bold: false, italic: true, color: COL.gris } });
  return r;
}
// Columna de "lo incorrecto": gris y tachada si su cabecera lo pide, o si la lámina lo pide y la cabecera es la de errores
const TACHAR = { color: COL.gris, strike: "sngStrike" };
const esTachada = (cab, s) => /tachad|en gris/i.test(cab || "") || (/lo que o[ií]|incorrect|as[ií] no|errores?\b/i.test(cab || "") && /tachad|gris/i.test([s.subtitulo, ...(s.bullets || []), s.ejercicio && s.ejercicio.consigna].join(" ")));
const sh = () => ({ type: "outer", blur: 6, offset: 2, angle: 90, color: "14142B", opacity: 0.12 });
let romN = 0, revN = 0;

async function audioEn(slide, texto, x, y, sz = 0.42) {
  const c = clip(texto); if (!c) return false;
  slide.addMedia({ type: "audio", path: c, x, y, w: sz, h: sz, cover: "image/png;base64," + fs.readFileSync(await iconoAudio()).toString("base64") });
  return true;
}

function bulletsBox(slide, items, x, y, w, h, base = 24, extra = {}) {
  const largo = items.reduce((a, b) => a + len(b), 0);
  const fs_ = Math.min(base, largo > 420 ? 18 : largo > 300 ? 20 : largo > 200 ? 22 : base);
  const arr = [];
  items.forEach((b, i) => { const rr = runs(b, { fontSize: fs_, color: COL.ink, ...extra }); rr[0].options = { ...rr[0].options, bullet: { indent: 18 }, paraSpaceAfter: 8 }; if (i < items.length - 1) rr[rr.length - 1].options = { ...rr[rr.length - 1].options, breakLine: true }; arr.push(...rr); });
  slide.addText(arr, { x, y, w, h, valign: "top", isTextBox: true, margin: [4, 4, 4, 2], objectName: "lista" });
}

// ─── un tipo de lámina por función ───
const LAY = {
  async portada(pres, s, d) {
    const slide = pres.addSlide({ masterName: "AS_PORTADA", sectionTitle: d._sec });
    if (s.titulo_ko) { const k = koFit(s.titulo_ko, 11.9, 1.3, 66, 32); slide.addText(lineas(k.text, { fontSize: k.size, bold: true, color: COL.oro }), { x: 0.7, y: 1.85, w: 11.9, h: 1.4, valign: "bottom", isTextBox: true, margin: 0, objectName: "titulo_ko" }); }
    slide.addText(runs(s.titulo, { fontSize: ems(s.titulo) > 38 ? 34 : 44, align: "left" }), { placeholder: "title", align: "left" });
    const sub = [s.subtitulo, ...(s.bullets || [])].filter(Boolean).join("\n");
    // el subtítulo se achica si trae muchas líneas o líneas largas (caja de 2,0" sobre el pie)
    const nl = sub ? sub.split("\n").reduce((a, l) => a + Math.max(1, Math.ceil(ems(l) / 52)), 0) : 0;
    if (sub) slide.addText(lineas(sub, { fontSize: nl <= 3 ? 22 : nl <= 4 ? 19 : nl <= 5 ? 16 : 14, color: COL.oro }), { placeholder: "body" });
    return slide;
  },
  async cierre(pres, s, d) {
    const slide = pres.addSlide({ masterName: "AS_CIERRE", sectionTitle: d._sec });
    slide.addText(tituloRuns({ ...s, titulo_en: "" }).map((r) => ({ ...r, options: { ...r.options, color: COL.blanco } })), { placeholder: "title" });
    const items = [s.subtitulo, ...(s.bullets || [])].filter(Boolean);
    if (items.length) { const arr = []; items.forEach((b, i) => { const rr = runs(b, { fontSize: items.length > 4 ? 18 : 22, color: COL.blanco, align: "center" }); if (i < items.length - 1) rr[rr.length - 1].options.breakLine = true; arr.push(...rr); }); slide.addText(arr, { placeholder: "body", align: "center" }); }
    return slide;
  },
  async lista(pres, s, d) {
    const slide = pres.addSlide({ masterName: "AS_CONTENIDO", sectionTitle: d._sec });
    slide.addText(tituloRuns(s), { placeholder: "title" });
    let y = TOP;
    if (s.subtitulo) { slide.addText(runs(s.subtitulo, { fontSize: 18, italic: true, color: COL.azul }), { x: MX, y, w: 7.6, h: 0.6, isTextBox: true, margin: 0, valign: "top" }); y += 0.7; }
    bulletsBox(slide, s.bullets || [], MX, y, 7.6, BOT - y);
    // visual a la derecha: el coreano del título o la primera palabra coreana de la lámina, en grande
    const ko = s.titulo_ko; // panel derecho: solo el coreano del título; si no hay, el sello
    if (ko || !s.imagen || s.subtitulo || (s.bullets || []).length) slide.addShape(pres.ShapeType.roundRect, { x: 8.75, y: TOP + 0.1, w: 3.95, h: 4.9, fill: { color: COL.tinte }, line: { color: COL.tinte }, rectRadius: 0.25, objectName: "panel" });
    if (ko) { const k = koFit(ko, 3.6, 3.0, 96, 28); slide.addText(lineas(k.text, { fontSize: k.size, bold: true, color: COL.azul, align: "center" }), { x: 8.85, y: TOP + 0.6, w: 3.75, h: 3.2, valign: "middle", isTextBox: true, margin: 0, objectName: "ko_grande" }); await audioEn(slide, ko, 10.5, TOP + 4.0); }
    else if (s.imagen) { // falta la imagen: el panel dice cuál pegar (se reemplaza en PowerPoint); sin texto a la izquierda, ocupa toda la lámina
      const solo = !s.subtitulo && !(s.bullets || []).length;
      const [px, pw] = solo ? [MX, 12.13] : [8.95, 3.55];
      slide.addText([{ text: "Imagen pendiente", options: { fontSize: solo ? 24 : 16, bold: true, color: COL.azul, breakLine: true } }, ...runs(s.imagen, { fontSize: solo ? 18 : 13, color: COL.tinta2 })], { x: px, y: TOP + 0.3, w: pw, h: 4.5, valign: "middle", align: "center", isTextBox: true, margin: 6, fill: solo ? { color: COL.tinte } : undefined, objectName: "imagen_pendiente" });
    } else slide.addImage({ path: SELLO.azul, x: 9.9, y: TOP + 1.75, w: 1.65, h: 1.65, objectName: "sello" });
    return slide;
  },
  async glifos(pres, s, d) {
    const slide = pres.addSlide({ masterName: "AS_CONTENIDO", sectionTitle: d._sec });
    slide.addText(tituloRuns(s), { placeholder: "title" });
    const g = s.glifos || []; const n = g.length || 1;
    const cols = n <= 4 ? n : n <= 6 ? 3 : n <= 8 ? 4 : n <= 10 ? 5 : 7; const rows = Math.ceil(n / cols);
    let y0 = TOP; if (s.subtitulo) { slide.addText(runs(s.subtitulo, { fontSize: 18, italic: true, color: COL.azul }), { x: MX, y: y0, w: 12.1, h: 0.5, isTextBox: true, margin: 0 }); y0 += 0.6; }
    const nota = (s.bullets || []).join(" · "); const yMax = nota ? BOT - 0.7 : BOT;
    const gap = 0.25, cw = (12.13 - gap * (cols - 1)) / cols, ch = Math.min(2.6, (yMax - y0 - gap * (rows - 1)) / rows);
    const tieneRom = d.romanizacion === "si" && g.some((x) => x.rom);
    for (let i = 0; i < n; i++) {
      const x = MX + (i % cols) * (cw + gap), y = y0 + Math.floor(i / cols) * (ch + gap), it = g[i];
      slide.addShape(pres.ShapeType.roundRect, { x, y, w: cw, h: ch, fill: { color: COL.tinte }, line: { color: COL.borde, width: 1 }, rectRadius: 0.15, objectName: "tile_" + i });
      const k = koFit(it.ko, cw - 0.1, ch * 0.6, 96, 16);
      slide.addText(lineas(k.text, { fontSize: k.size, bold: true, color: COL.azul, align: "center" }), { x, y: y + 0.08, w: cw, h: ch * 0.62, valign: "middle", isTextBox: true, margin: 0 });
      let yy = y + ch * 0.64;
      if (tieneRom && it.rom) { slide.addText(it.rom, { x, y: yy, w: cw, h: ch * 0.16, fontSize: Math.max(12, Math.min(22, Math.round(ch * 8))), color: COL.gris, align: "center", isTextBox: true, margin: 0, objectName: "rom_" + (romN++) }); yy += ch * 0.16; }
      if (it.es) slide.addText(runs(it.es, { fontSize: Math.max(12, Math.min(20, Math.round(ch * 7.5))), color: COL.tinta2, align: "center" }), { x: x + 0.05, y: yy, w: cw - 0.1, h: y + ch - yy - 0.04, valign: "top", isTextBox: true, margin: 0 });
    }
    if (nota) slide.addText(runs(nota, { fontSize: 16, color: COL.ink }), { x: MX, y: BOT - 0.55, w: 12.1, h: 0.55, isTextBox: true, margin: 0, valign: "middle" });
    return slide;
  },
  async palabras(pres, s, d) {
    const slide = pres.addSlide({ masterName: "AS_CONTENIDO", sectionTitle: d._sec });
    slide.addText(tituloRuns(s), { placeholder: "title" });
    const p = s.palabras || []; const n = p.length || 1;
    const cols = n <= 4 ? n : Math.ceil(n / 2); const rows = Math.ceil(n / cols);
    let y0 = TOP; if (s.subtitulo) { slide.addText(runs(s.subtitulo, { fontSize: 18, italic: true, color: COL.azul }), { x: MX, y: y0, w: 12.1, h: 0.5, isTextBox: true, margin: 0 }); y0 += 0.6; }
    const gap = 0.25, cw = (12.13 - gap * (cols - 1)) / cols, ch = Math.min(4.8, (BOT - y0 - gap * (rows - 1)) / rows);
    for (let i = 0; i < n; i++) {
      const x = MX + (i % cols) * (cw + gap), y = y0 + Math.floor(i / cols) * (ch + gap), it = p[i];
      slide.addShape(pres.ShapeType.roundRect, { x, y, w: cw, h: ch, fill: { color: COL.blanco }, line: { color: COL.borde, width: 1 }, rectRadius: 0.15, shadow: sh(), objectName: "card_" + i });
      const img = await dibujo(it.ko);
      const imgH = img ? Math.min(ch * 0.42, cw * 0.55) : 0;
      if (img) slide.addImage({ path: img, x: x + (cw - imgH) / 2, y: y + 0.12, w: imgH, h: imgH, objectName: "dibujo_" + i });
      let yy = y + 0.12 + imgH + (img ? 0.02 : ch * 0.12);
      const kH = ch * (img ? 0.22 : 0.34);
      const kp = koFit(it.ko, cw - 0.2, kH, 54, 16); slide.addText(lineas(kp.text, { fontSize: kp.size, bold: true, color: COL.azul, align: "center" }), { x, y: yy, w: cw, h: kH, valign: "middle", isTextBox: true, margin: 0 });
      yy += kH;
      if (it.pron) { slide.addText(runs(it.pron, { fontSize: 13, color: COL.gris, align: "center" }), { x, y: yy, w: cw, h: 0.3, isTextBox: true, margin: 0 }); yy += 0.3; }
      if (d.romanizacion === "si" && it.rom) { slide.addText(it.rom, { x, y: yy, w: cw, h: 0.3, fontSize: 16, color: COL.gris, align: "center", isTextBox: true, margin: 0, objectName: "rom_" + (romN++) }); yy += 0.3; }
      slide.addText(runs(it.es, { fontSize: 16, color: COL.tinta2, align: "center" }), { x: x + 0.08, y: yy, w: cw - 0.16, h: Math.max(0.3, y + ch - yy - 0.45), valign: "top", isTextBox: true, margin: 0 });
      await audioEn(slide, it.ko, x + cw - 0.48, y + ch - 0.46, 0.36);
    }
    return slide;
  },
  async comparar(pres, s, d) {
    const slide = pres.addSlide({ masterName: "AS_CONTENIDO", sectionTitle: d._sec });
    slide.addText(tituloRuns(s), { placeholder: "title" });
    const c = (s.columnas || []).slice(0, 3); const n = c.length || 1;
    let y0 = TOP; if (s.subtitulo) { slide.addText(runs(s.subtitulo, { fontSize: 18, italic: true, color: COL.azul }), { x: MX, y: y0, w: 12.1, h: 0.5, isTextBox: true, margin: 0 }); y0 += 0.6; }
    const nota = (s.bullets || []).join(" · "); const yMax = nota ? BOT - 0.7 : BOT;
    const gap = 0.35, cw = (12.13 - gap * (n - 1)) / n, ch = yMax - y0;
    c.forEach((col, i) => {
      const x = MX + i * (cw + gap);
      slide.addShape(pres.ShapeType.roundRect, { x, y: y0, w: cw, h: ch, fill: { color: i % 2 ? COL.blanco : COL.tinte }, line: { color: COL.borde, width: 1 }, rectRadius: 0.15, objectName: "col_" + i });
      slide.addText(runs(col.titulo, { fontSize: 20, bold: true, color: COL.navy }), { x: x + 0.25, y: y0 + 0.2, w: cw - 0.5, h: 0.6, isTextBox: true, margin: 0, valign: "top" });
      let yy = y0 + 0.85; const tach = esTachada(col.titulo, s) ? TACHAR : {};
      if (col.ko) { const k = koFit(col.ko, cw - 0.5, 1.0, 54, 18); slide.addText(lineas(k.text, { fontSize: k.size, bold: true, color: COL.azul, ...tach }), { x: x + 0.25, y: yy, w: cw - 0.5, h: 1.0, isTextBox: true, margin: 0, valign: "middle" }); yy += 1.1; }
      bulletsBox(slide, col.items || [], x + 0.2, yy, cw - 0.4, y0 + ch - yy - 0.15, n === 3 ? 18 : 20, tach);
    });
    if (nota) slide.addText(runs(nota, { fontSize: 16, color: COL.ink }), { x: MX, y: BOT - 0.55, w: 12.1, h: 0.55, isTextBox: true, margin: 0, valign: "middle" });
    return slide;
  },
  async ejercicio(pres, s, d) {
    const slide = pres.addSlide({ masterName: "AS_CONTENIDO", sectionTitle: d._sec });
    slide.addText(tituloRuns(s), { placeholder: "title" });
    const e = s.ejercicio || { consigna: "", items: [] };
    let y0 = TOP; const cons = [s.subtitulo, e.consigna].filter(Boolean).join(" · ");
    if (cons) { slide.addText(runs(cons, { fontSize: 18, italic: true, color: COL.azul }), { x: MX, y: y0, w: 12.1, h: 0.6, isTextBox: true, margin: 0, valign: "top" }); y0 += 0.7; }
    const it = e.items.slice(0, 6); const n = it.length || 1; const mIni = String(s.titulo).match(/(\d+)\s*[–-]\s*(\d+)/); const ini = mIni && +mIni[2] - +mIni[1] + 1 === it.length ? +mIni[1] : 1; const gap = 0.14, rh = Math.min(0.95, (BOT - y0 - gap * (n - 1)) / n);
    // columna de respuesta más ancha si las respuestas son largas
    const maxR = Math.max(1, ...it.map((q) => ems(q.respuesta))); const ansW = maxR > 26 ? 6.3 : maxR > 16 ? 5.4 : 4.53; const ansX = MX + 12.13 - ansW; const qW = ansX - (MX + 0.7) - 0.25;
    // talla de la respuesta: en una línea si cabe a ≥ 16 pt; si no, en dos líneas con alto para las dos (nunca se sale de la caja)
    const tallaR = (r) => {
      const w = (ansW - 0.2) * 72 * 0.88, h = (rh - 0.12) * 72, e_ = Math.max(1, ems(r));
      const una = Math.min(22, Math.floor(w / e_), Math.floor(h / 1.25));
      return una >= 16 ? una : Math.max(11, Math.min(22, Math.floor((2 * w) / e_), Math.floor(h / 2.5)));
    };
    it.forEach((q, i) => {
      const y = y0 + i * (rh + gap);
      slide.addShape(pres.ShapeType.ellipse, { x: MX, y: y + (rh - 0.5) / 2, w: 0.5, h: 0.5, fill: { color: COL.navy }, line: { color: COL.navy }, objectName: "num_" + i });
      slide.addText(String(ini + i), { x: MX, y: y + (rh - 0.5) / 2, w: 0.5, h: 0.5, fontSize: 16, bold: true, color: COL.blanco, align: "center", valign: "middle", isTextBox: true, margin: 0 });
      const preg = String(q.pregunta).replace(new RegExp("^\\s*" + (ini + i) + "\\s*[·.)]\\s*"), ""); // el número ya va en el círculo
      slide.addText(runs(preg, { fontSize: fit(preg, 24, 16, 40), color: COL.ink }), { x: MX + 0.7, y, w: qW, h: rh, valign: "middle", isTextBox: true, margin: 0 });
      slide.addShape(pres.ShapeType.roundRect, { x: ansX, y: y + 0.04, w: ansW, h: rh - 0.08, fill: { color: COL.azul }, line: { color: COL.azul }, rectRadius: 0.12, objectName: "rev_" + revN + "_caja" });
      slide.addText(runs(q.respuesta, { fontSize: tallaR(q.respuesta), bold: true, color: COL.blanco, align: "center" }), { x: ansX + 0.1, y: y + 0.04, w: ansW - 0.2, h: rh - 0.08, valign: "middle", isTextBox: true, margin: 0, objectName: "rev_" + (revN++) + "_txt" });
    });
    return slide;
  },
  async tabla(pres, s, d) {
    const slide = pres.addSlide({ masterName: "AS_CONTENIDO", sectionTitle: d._sec });
    slide.addText(tituloRuns(s), { placeholder: "title" });
    const t = s.tabla || { cabeceras: [], filas: [] };
    let y0 = TOP; if (s.subtitulo) { slide.addText(runs(s.subtitulo, { fontSize: 18, italic: true, color: COL.azul }), { x: MX, y: y0, w: 12.1, h: 0.5, isTextBox: true, margin: 0 }); y0 += 0.6; }
    const nf = t.filas.length, nc = Math.max(t.cabeceras.length, ...t.filas.map((f) => f.length), 1);
    const maxLen = Math.max(...t.filas.flat().map(len), ...t.cabeceras.map(len), 1);
    const fz = nf > 6 || nc > 4 || maxLen > 40 ? 16 : 18;
    const conCab = t.cabeceras.some((h) => String(h || "").trim()); const tachCol = Array.from({ length: nc }, (_, j) => esTachada(t.cabeceras[j], s));
    const cell = (v, head, odd, tach) => ({ text: runs(v, { fontSize: fz, bold: head, color: head ? COL.blanco : COL.ink, ...(tach ? TACHAR : {}) }), options: { fill: { color: head ? COL.navy : odd ? COL.tinte : COL.blanco }, valign: "middle", margin: [4, 8, 4, 8] } });
    const rows = [...(conCab ? [Array.from({ length: nc }, (_, j) => cell(t.cabeceras[j] ?? "", true))] : []), ...t.filas.map((f, i) => Array.from({ length: nc }, (_, j) => cell(f[j] ?? "", false, i % 2 === 0, tachCol[j])))];
    slide.addTable(rows, { x: MX, y: y0, w: 12.13, colW: Array(nc).fill(12.13 / nc), border: { type: "solid", pt: 0.75, color: COL.borde }, rowH: Math.min(0.62, (BOT - y0) / (nf + (conCab ? 1 : 0))), objectName: "tabla" });
    return slide;
  },
  async frase(pres, s, d) {
    const slide = pres.addSlide({ masterName: "AS_CONTENIDO", sectionTitle: d._sec });
    slide.addText(tituloRuns(s), { placeholder: "title" });
    const f = s.frase || { ko: "", es: "" };
    slide.addShape(pres.ShapeType.roundRect, { x: 1.4, y: 1.8, w: 10.53, h: 3.4, fill: { color: COL.tinte }, line: { color: COL.tinte }, rectRadius: 0.3, objectName: "panel" });
    const kf = koFit(f.ko, 10.1, 2.0, 64, 24); slide.addText(lineas(kf.text, { fontSize: kf.size, bold: true, color: COL.azul, align: "center" }), { x: 1.6, y: 2.0, w: 10.13, h: 2.0, valign: "middle", isTextBox: true, margin: 0, objectName: "frase_ko" });
    slide.addText(runs(f.es, { fontSize: 24, color: COL.tinta2, align: "center" }), { x: 1.6, y: 4.0, w: 10.13, h: 0.9, valign: "top", isTextBox: true, margin: 0 });
    await audioEn(slide, f.ko, 11.3, 4.55);
    const extra = [s.subtitulo, ...(s.bullets || [])].filter(Boolean);
    if (extra.length) bulletsBox(slide, extra, 1.4, 5.4, 10.53, BOT - 5.4, 18);
    return slide;
  },
};

async function deck(d, outDir) {
  romN = 0; revN = 0;
  const pres = new pptxgen(); pres.layout = "LAYOUT_WIDE"; pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
  pres.title = `${d.curso} · Semana ${d.semana} · ${d.titulo_clase}`; pres.author = "Academia Seúl"; pres.company = "Academia Seúl";
  const pie = `${d.curso} · Semana ${d.semana} · ${d.profe} · Academia Seúl`;
  layouts(pres, pie);
  d._sec = `Semana ${d.semana}`; pres.addSection({ title: d._sec });
  const pendientes = [];
  for (const s of d.slides) {
    const fn = LAY[s.layout] || LAY.lista;
    const slide = await fn(pres, s, d);
    const notas = [s.notas, s.imagen ? "Imagen sugerida: " + s.imagen : "", s.fuente ? "Fuente: " + s.fuente : "", "Lámina " + s.L].filter(Boolean).join("\n\n");
    slide.addNotes(notas);
    if (s.imagen) pendientes.push(`L${s.L}: ${s.imagen}`);
  }
  const slug = String(d.titulo_clase || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "").slice(0, 40);
  const profe = String(d.profe || "").trim().split(/[\s(]+/)[0]; const file = path.join(outDir, `${d.curso.startsWith("Básico 1") ? "Basico1" : "Basico2"}_S${String(d.semana).padStart(2, "0")}_${profe}.pptx`); void slug;
  await pres.writeFile({ fileName: file });
  await applyTheme(file, THEME);
  await sinCorteCoreano(file);
  return { file, slides: d.slides.length, pendientes };
}

(async () => {
  const specs = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
  const filtro = process.argv[3];
  const res = [];
  for (const d of specs) {
    if (filtro && !`${d.curso} S${d.semana}`.includes(filtro)) continue;
    const outDir = REPO + (d.curso.startsWith("Básico 1") ? "/Curriculo/Fase2_Basico1/decks" : "/Curriculo/Fase3_Basico2/decks");
    fs.mkdirSync(outDir, { recursive: true });
    res.push(await deck(d, outDir));
  }
  if (browser) await browser.close();
  fs.writeFileSync(path.join(__dirname, "ultimo_build.json"), JSON.stringify(res, null, 2));
  for (const r of res) console.log(`✓ ${path.basename(r.file)} · ${r.slides} láminas${r.pendientes.length ? " · imágenes sugeridas: " + r.pendientes.length : ""}`);
})().catch((e) => { console.error(e); process.exit(1); });
