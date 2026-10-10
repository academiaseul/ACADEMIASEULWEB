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
  const s = String(text ?? "").replace(/([\u3131-\u318E]) (?=[\u3131-\u318E])/g, "$1\u00A0") // series de jamo
    .replace(/(^|[\s(])(\d+|\uD55C|\uB450|\uC138|\uB124|\uB2E4\uC12F|\uC5EC\uC12F|\uC77C\uACF1|\uC5EC\uB35F|\uC544\uD649|\uC5F4|\uC2A4\uBB3C|\uC2A4\uBB34|\uC11C\uB978|\uBC31|\uCC9C|\uB9CC|\uC624\uCC9C|\uC624\uB9CC) (?=(\uC6D0|\uC0B4|\uC2DC|\uBA85|\uAC1C|\uBD84|\uBC88|\uB9C8\uB9AC|\uC794|\uAD8C|\uCE35))/g, "$1$2\u00A0") // n\u00FAmero + contador
    .replace(/\uC218 (?=(\uC788|\uC5C6))/g, "\uC218\u00A0"); // \uD560 \uC218 \uC788\uB2E4
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
    for (const i of sp) { if (NO_PARTIR.test(t.slice(0, i))) continue; const ls = [t.slice(0, i), t.slice(i + 1)]; const sz = talla(ls); const bal = Math.max(...ls.map(ems)); if (sz > best.size || (sz === best.size && best.text.includes("\n") && bal < bal0)) { best = { text: ls.join("\n"), size: sz }; bal0 = bal; } }
  }
  return best;
}
const NO_PARTIR = /(^|\s)(\d+|한|두|세|네|다섯|여섯|일곱|여덟|아홉|열|스물|서른|백|천|만|수)$/;
// Talla de un texto corrido para que quepa en una caja (w × h en pulgadas); estimación con ems y 20 % de holgura por el salto de palabra
function tallaTexto(t, w, h, max, min = 11) {
  const e = Math.max(1, ems(t));
  for (let z = max; z > min; z--) { const cap = (w * 72) / z; const nl = Math.ceil((e * 1.2) / cap); if (nl * z * 1.22 <= h * 72) return z; }
  return min;
}
// Alto aproximado (pulgadas) de una lista con viñetas a la talla z en un ancho w
const altoBullets = (items, w, z) => items.reduce((a, b) => a + Math.ceil((ems(b) * 0.92 * z) / ((w - 0.3) * 72)) * z * 1.22 / 72 + 8 / 72, 0); // Arial real ≈ 0,5 em por letra
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
// ─── imágenes de las láminas: Curriculo/fuente/decks/img/<B1S1…B2S8>/map.json ───
const IMG = process.env.DECKS_IMG || REPO + "/Curriculo/fuente/decks/img/";
const crypto = require("crypto");
function tamano(file) { // proporción de PNG / JPG / SVG (viewBox)
  const b = fs.readFileSync(file);
  if (/\.svg$/i.test(file)) { const m = b.toString("utf8").match(/viewBox="\s*[-\d.]+[\s,]+[-\d.]+[\s,]+([\d.]+)[\s,]+([\d.]+)/); return m ? { w: +m[1], h: +m[2] } : { w: 1, h: 1 }; }
  if (b[0] === 0x89) return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
  let i = 2; while (i + 9 < b.length) { if (b[i] !== 0xff) { i++; continue; } const m = b[i + 1], L = b.readUInt16BE(i + 2); if (m >= 0xc0 && m <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(m)) return { w: b.readUInt16BE(i + 7), h: b.readUInt16BE(i + 5) }; i += 2 + L; }
  return { w: 1, h: 1 };
}
async function imgArchivo(file, ancho = 900) { // SVG → PNG con la proporción del viewBox (caché por contenido); PNG/JPG tal cual
  if (!/\.svg$/i.test(file)) return file;
  const svg = fs.readFileSync(file, "utf8"); const { w, h } = tamano(file);
  const out = path.join(CACHE, "img_" + crypto.createHash("sha1").update(svg).digest("hex").slice(0, 16) + ".png");
  if (fs.existsSync(out)) return out;
  if (!browser) browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, userDataDir: path.join(__dirname, "perfil") });
  const H = Math.round((ancho * h) / w); const p = await browser.newPage(); await p.setViewport({ width: ancho, height: H });
  await p.setContent(`<html><head><style>html,body{margin:0;background:transparent}svg{display:block;width:${ancho}px;height:${H}px}</style></head><body>${svg}</body></html>`);
  await p.screenshot({ path: out, omitBackground: true }); await p.close(); return out;
}
async function ponerImg(slide, file, x, y, w, h, name) { // imagen contenida (sin deformar), centrada en la caja
  const png = await imgArchivo(file); const t = tamano(file); const r = Math.min(w / t.w, h / t.h); const iw = t.w * r, ih = t.h * r;
  slide.addImage({ path: png, x: x + (w - iw) / 2, y: y + (h - ih) / 2, w: iw, h: ih, objectName: name });
}
const rimg = (s) => { const w = s._imgW || 4.25; return { x: MX + 12.13 - w, y: TOP, w, h: BOT - TOP }; }; // imagen de lámina: a la derecha
const anchoC = (s) => (s._img ? 12.13 - rimg(s).w - 0.3 : 12.13); // ancho del contenido cuando hay imagen de lámina
const ponerImgR = (slide, s) => { const r = rimg(s); return ponerImg(slide, s._img, r.x, r.y, r.w, r.h, "imagen"); };
function cargarImagenes(d) {
  const key = (d.curso.startsWith("Básico 1") ? "B1" : "B2") + "S" + d.semana; const dir = IMG + key + "/";
  if (!fs.existsSync(dir + "map.json")) return;
  const m = JSON.parse(fs.readFileSync(dir + "map.json", "utf8"));
  for (const im of m.imagenes || []) {
    const s = d.slides.find((x) => String(x.L) === String(im.L)); const f = dir + im.archivo;
    if (!s || !fs.existsSync(f)) { console.warn(`  ! ${key} L${im.L}: ${im.archivo} sin lámina o sin archivo`); continue; }
    if (im.destino === "slide" && /^(portada|cierre)$/.test(s.layout)) { console.warn(`  ! ${key} L${im.L}: imagen en ${s.layout} (la plantilla ya trae logo y sello), se omite`); continue; }
    const arr = { item: s.ejercicio && s.ejercicio.items, glifo: s.glifos, palabra: s.palabras, col: s.columnas }[im.destino];
    if (im.destino === "slide") s._img = f; else if (arr && arr[im.indice]) arr[im.indice]._img = f; else { console.warn(`  ! ${key} L${im.L}: ${im.destino}[${im.indice}] no existe`); continue; }
    s._conImg = (s._conImg || 0) + 1;
  }
  for (const si of m.sin_imagen || []) { const s = d.slides.find((x) => String(x.L) === String(si.L)); if (s && !s._conImg) s._sinImg = si; }
}
const pendiente = (s) => s.imagen && !s._conImg && !(s._sinImg && s._sinImg.motivo === "plantilla");
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

// el coreano va en el título si todo cabe en una línea a 22 pt (en el cierre, siempre)
const koEnTitulo = (s) => !!s.titulo_ko && !String(s.titulo).includes(s.titulo_ko) && (s.layout === "cierre" || ems(s.titulo_ko + "  " + s.titulo) * 22 <= 11.2 * 72 * 0.9);
function tituloRuns(s) {
  const r = [];
  const conKo = koEnTitulo(s);
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
    const zT = Math.max(26, Math.min(44, Math.floor((11.9 * 72 * 0.92) / Math.max(1, ems(s.titulo))))); const dosL = ems(s.titulo) * zT > 11.9 * 72 * 0.92;
    slide.addText(runs(s.titulo, { fontSize: zT, align: "left" }), dosL ? { x: 0.7, y: 3.3, w: 11.9, h: 1.3, isTextBox: true, margin: 0, valign: "top", bold: true, color: COL.blanco, fontSize: zT } : { placeholder: "title", align: "left" });
    const sub = [s.subtitulo, ...(s.bullets || [])].filter(Boolean).join("\n");
    // el subtítulo se achica si trae muchas líneas o líneas largas (caja de 2,0" sobre el pie)
    const nl = sub ? sub.split("\n").reduce((a, l) => a + Math.max(1, Math.ceil(ems(l) / 52)), 0) : 0;
    if (sub) slide.addText(lineas(sub, { fontSize: nl <= 3 ? 22 : nl <= 4 ? 19 : nl <= 5 ? 16 : 14, color: COL.oro }), dosL ? { x: 0.7, y: 4.75, w: 11.9, h: 1.85, isTextBox: true, margin: 0, valign: "top" } : { placeholder: "body" });
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
    let y = TOP; const TW = s._img ? 6.2 : 7.6; const bl = s.bullets || [];
    if (s.subtitulo) { slide.addText(runs(s.subtitulo, { fontSize: 18, italic: true, color: COL.azul }), { x: MX, y, w: TW, h: 0.6, isTextBox: true, margin: 0, valign: "top" }); y += 0.7; }
    const largoB = bl.reduce((a, b) => a + len(b), 0);
    bulletsBox(slide, bl, MX, y, TW, BOT - y, bl.length <= 4 && largoB < 160 ? 28 : 24);
    // visual a la derecha: el coreano del título o la primera palabra coreana de la lámina, en grande
    const ko = s.titulo_ko; // panel derecho: la imagen de la lámina, o el coreano del título; si no hay, el sello
    const solo = !s.subtitulo && !(s.bullets || []).length;
    if (s._img && solo) { // lámina que es solo imagen
      if (ko) { const k = koFit(ko, 12.1, 0.8, 40, 20); slide.addText(lineas(k.text, { fontSize: k.size, bold: true, color: COL.azul, align: "center" }), { x: MX, y: TOP, w: 12.13, h: 0.8, valign: "middle", isTextBox: true, margin: 0, objectName: "ko_grande" }); }
      await ponerImg(slide, s._img, MX, TOP + (ko ? 0.9 : 0), 12.13, BOT - TOP - (ko ? 0.9 : 0), "imagen");
      return slide;
    }
    if (s._img) { // panel grande con la imagen; el coreano del título va debajo solo si no cupo en el título
      const PX = MX + TW + 0.25, PW = MX + 12.13 - PX, rot = ko && !koEnTitulo(s);
      slide.addShape(pres.ShapeType.roundRect, { x: PX, y: TOP + 0.05, w: PW, h: BOT - TOP - 0.05, fill: { color: COL.tinte }, line: { color: COL.tinte }, rectRadius: 0.25, objectName: "panel" });
      await ponerImg(slide, s._img, PX + 0.12, TOP + 0.15, PW - 0.24, BOT - TOP - 0.25 - (rot ? 1.0 : 0), "imagen");
      if (rot) { const k = koFit(ko, PW - 0.3, 0.85, 40, 16); slide.addText(lineas(k.text, { fontSize: k.size, bold: true, color: COL.azul, align: "center" }), { x: PX + 0.15, y: BOT - 1.0, w: PW - 0.3, h: 0.85, valign: "middle", isTextBox: true, margin: 0, objectName: "ko_grande" }); }
      return slide;
    }
    if (ko || !pendiente(s) || !solo) slide.addShape(pres.ShapeType.roundRect, { x: 8.75, y: TOP + 0.1, w: 3.95, h: 4.9, fill: { color: COL.tinte }, line: { color: COL.tinte }, rectRadius: 0.25, objectName: "panel" });
    if (false) {
    } else if (ko) { const k = koFit(ko, 3.6, 3.0, 96, 28); slide.addText(lineas(k.text, { fontSize: k.size, bold: true, color: COL.azul, align: "center" }), { x: 8.85, y: TOP + 0.6, w: 3.75, h: 3.2, valign: "middle", isTextBox: true, margin: 0, objectName: "ko_grande" }); await audioEn(slide, ko, 10.5, TOP + 4.0); }
    else if (pendiente(s)) { // falta la imagen: el panel dice cuál pegar (se reemplaza en PowerPoint); sin texto a la izquierda, ocupa toda la lámina
      const [px, pw] = solo ? [MX, 12.13] : [8.95, 3.55];
      slide.addText([{ text: "Imagen pendiente", options: { fontSize: solo ? 24 : 16, bold: true, color: COL.azul, breakLine: true } }, ...runs(s._sinImg ? s._sinImg.instruccion : s.imagen, { fontSize: solo ? 18 : 13, color: COL.tinta2 })], { x: px, y: TOP + 0.3, w: pw, h: 4.5, valign: "middle", align: "center", isTextBox: true, margin: 6, fill: solo ? { color: COL.tinte } : undefined, objectName: "imagen_pendiente" });
    } else slide.addImage({ path: SELLO.azul, x: 9.9, y: TOP + 1.75, w: 1.65, h: 1.65, objectName: "sello" });
    return slide;
  },
  async glifos(pres, s, d) {
    const slide = pres.addSlide({ masterName: "AS_CONTENIDO", sectionTitle: d._sec });
    slide.addText(tituloRuns(s), { placeholder: "title" });
    const g = s.glifos || []; const n = g.length || 1;
    const W = anchoC(s); if (s._img) await ponerImgR(slide, s);
    const cols = Math.max(1, Math.min(n <= 4 ? n : n <= 6 ? 3 : n <= 8 ? 4 : n <= 10 ? 5 : 7, Math.floor((W + 0.25) / (1.45 + 0.25)))); const rows = Math.ceil(n / cols);
    let y0 = TOP; if (s.subtitulo) { slide.addText(runs(s.subtitulo, { fontSize: 18, italic: true, color: COL.azul }), { x: MX, y: y0, w: W, h: 0.5, isTextBox: true, margin: 0 }); y0 += 0.6; }
    const nota = (s.bullets || []).join(" · "); const yMax = nota ? BOT - 0.7 : BOT;
    const gap = 0.25, cw = (W - gap * (cols - 1)) / cols, ch = Math.min(2.6, (yMax - y0 - gap * (rows - 1)) / rows);
    const tieneRom = d.romanizacion === "si" && g.some((x) => x.rom);
    // alto que necesita el español a 16 pt (la más larga de la lámina): la imagen y el hangul usan el resto
    const altoEs = Math.max(0.3, ...g.filter((it) => it.es).map((it) => Math.ceil((ems(it.es) * 1.15 * 16) / ((cw - 0.2) * 72)) * 16 * 1.25 / 72));
    const qDe = (it) => (it._img ? Math.max(ch * 0.35, Math.min(ch - altoEs - 0.24, cw * 0.45, ch * 0.62)) : 0);
    // talla común del hangul: la menor de las tarjetas (que 집 no salga el doble que 회사)
    const tallaKo = Math.min(...g.map((it) => { const q = qDe(it); return koFit(it.ko, cw - (q ? q + 0.14 : 0) - 0.1, q ? q * (tieneRom && it.rom ? 0.66 : 0.95) : ch * 0.6, 96, 16).size; }));
    const yEs = (it) => { const q = qDe(it); if (q) return q + 0.14; let a = ch * 0.64; if (tieneRom && it.rom) a += ch * 0.16; return a; };
    const tallaEs = Math.max(12, Math.min(...g.filter((it) => it.es).map((it) => tallaTexto(it.es, cw - 0.14, ch - yEs(it) - 0.06, Math.max(12, Math.min(20, Math.round(ch * 7.5))), 10)), 20));
    for (let i = 0; i < n; i++) {
      const x = MX + (i % cols) * (cw + gap), y = y0 + Math.floor(i / cols) * (ch + gap), it = g[i];
      slide.addShape(pres.ShapeType.roundRect, { x, y, w: cw, h: ch, fill: { color: COL.tinte }, line: { color: COL.borde, width: 1 }, rectRadius: 0.15, objectName: "tile_" + i });
      // con imagen del glifo: la imagen arriba a la izquierda, el hangul a su lado; romanización y español debajo, a todo el ancho
      const q = qDe(it); if (it._img) await ponerImg(slide, it._img, x + 0.08, y + 0.06, q, q, "glifo_img_" + i);
      const tx = x + (q ? q + 0.1 : 0), tw = cw - (q ? q + 0.14 : 0);
      const conRom = tieneRom && it.rom;
      const k = koFit(it.ko, tw - 0.1, q ? q * (conRom ? 0.66 : 0.95) : ch * 0.6, tallaKo, 16);
      slide.addText(lineas(k.text, { fontSize: k.size, bold: true, color: COL.azul, align: "center" }), { x: tx, y: y + (q ? 0.06 : 0.08), w: tw, h: q ? q * (conRom ? 0.68 : 1) : ch * 0.62, valign: "middle", isTextBox: true, margin: 0 });
      let yy = y + (q ? q + 0.14 : ch * 0.64);
      if (q && conRom) { slide.addText(it.rom, { x: tx, y: y + 0.06 + q * 0.68, w: tw, h: q * 0.32, fontSize: Math.max(12, Math.min(20, Math.round(q * 14))), color: COL.gris, align: "center", isTextBox: true, margin: 0, objectName: "rom_" + (romN++) }); }
      else if (conRom) { slide.addText(it.rom, { x, y: yy, w: cw, h: ch * 0.16, fontSize: Math.max(12, Math.min(22, Math.round(ch * 8))), color: COL.gris, align: "center", isTextBox: true, margin: 0, objectName: "rom_" + (romN++) }); yy += ch * 0.16; }
      if (it.es) slide.addText(runs(it.es, { fontSize: tallaEs, color: COL.tinta2, align: "center" }), { x: x + 0.05, y: yy, w: cw - 0.1, h: y + ch - yy - 0.04, valign: "top", isTextBox: true, margin: 0 });
    }
    if (nota) slide.addText(runs(nota, { fontSize: 16, color: COL.ink }), { x: MX, y: BOT - 0.55, w: W, h: 0.55, isTextBox: true, margin: 0, valign: "middle" });
    return slide;
  },
  async palabras(pres, s, d) {
    const slide = pres.addSlide({ masterName: "AS_CONTENIDO", sectionTitle: d._sec });
    slide.addText(tituloRuns(s), { placeholder: "title" });
    const p = s.palabras || []; const n = p.length || 1;
    const cols = n <= 4 ? n : Math.ceil(n / 2); const rows = Math.ceil(n / cols);
    const W = anchoC(s); if (s._img) await ponerImgR(slide, s);
    let y0 = TOP; if (s.subtitulo) { slide.addText(runs(s.subtitulo, { fontSize: 18, italic: true, color: COL.azul }), { x: MX, y: y0, w: W, h: 0.5, isTextBox: true, margin: 0 }); y0 += 0.6; }
    const gap = 0.25, cw = (W - gap * (cols - 1)) / cols, ch = Math.min(4.8, (BOT - y0 - gap * (rows - 1)) / rows);
    const conDib = await Promise.all(p.map(async (it) => !!(it._img || (await dibujo(it.ko)))));
    const tallaP = Math.min(...p.map((it, i) => koFit(it.ko, cw - 0.2, ch * (conDib[i] ? 0.2 : 0.34), 54, 16).size));
    for (let i = 0; i < n; i++) {
      const x = MX + (i % cols) * (cw + gap), y = y0 + Math.floor(i / cols) * (ch + gap), it = p[i];
      slide.addShape(pres.ShapeType.roundRect, { x, y, w: cw, h: ch, fill: { color: COL.blanco }, line: { color: COL.borde, width: 1 }, rectRadius: 0.15, shadow: sh(), objectName: "card_" + i });
      const img = it._img || (await dibujo(it.ko));
      const imgH = img ? Math.min(ch * 0.48, cw * 0.62) : 0;
      if (it._img) await ponerImg(slide, it._img, x + (cw - imgH) / 2, y + 0.12, imgH, imgH, "dibujo_" + i);
      else if (img) slide.addImage({ path: img, x: x + (cw - imgH) / 2, y: y + 0.12, w: imgH, h: imgH, objectName: "dibujo_" + i });
      let yy = y + 0.12 + imgH + (img ? 0.02 : ch * 0.12);
      const kH = ch * (img ? 0.2 : 0.34);
      const kp = koFit(it.ko, cw - 0.2, kH, tallaP, 16); slide.addText(lineas(kp.text, { fontSize: kp.size, bold: true, color: COL.azul, align: "center" }), { x, y: yy, w: cw, h: kH, valign: "middle", isTextBox: true, margin: 0 });
      yy += kH;
      if (it.pron) { slide.addText(runs(it.pron, { fontSize: 13, color: COL.gris, align: "center" }), { x, y: yy, w: cw, h: 0.3, isTextBox: true, margin: 0 }); yy += 0.3; }
      if (d.romanizacion === "si" && it.rom) { slide.addText(it.rom, { x, y: yy, w: cw, h: 0.3, fontSize: 16, color: COL.gris, align: "center", isTextBox: true, margin: 0, objectName: "rom_" + (romN++) }); yy += 0.3; }
      const hEs = Math.max(0.3, y + ch - yy - 0.08);
      slide.addText(runs(it.es, { fontSize: tallaTexto(it.es, cw - 0.2, hEs, 16, 10), color: COL.tinta2, align: "center" }), { x: x + 0.08, y: yy, w: cw - 0.16, h: hEs, valign: "top", isTextBox: true, margin: 0 });
      await audioEn(slide, it.ko, x + cw - 0.44, y + 0.08, 0.34);
    }
    return slide;
  },
  async comparar(pres, s, d) {
    const slide = pres.addSlide({ masterName: "AS_CONTENIDO", sectionTitle: d._sec });
    slide.addText(tituloRuns(s), { placeholder: "title" });
    const c = (s.columnas || []).slice(0, 3); const n = c.length || 1;
    if (s._img && n >= 3) s._imgW = 3.0;
    const W = anchoC(s); if (s._img) await ponerImgR(slide, s);
    let y0 = TOP; if (s.subtitulo) { slide.addText(runs(s.subtitulo, { fontSize: 18, italic: true, color: COL.azul }), { x: MX, y: y0, w: W, h: 0.5, isTextBox: true, margin: 0 }); y0 += 0.6; }
    const nota = (s.bullets || []).join(" · "); const yMax = nota ? BOT - 0.7 : BOT;
    const gap = 0.35, cw = (W - gap * (n - 1)) / n, ch = yMax - y0;
    for (const [i, col] of c.entries()) {
      const x = MX + i * (cw + gap);
      slide.addShape(pres.ShapeType.roundRect, { x, y: y0, w: cw, h: ch, fill: { color: i % 2 ? COL.blanco : COL.tinte }, line: { color: COL.borde, width: 1 }, rectRadius: 0.15, objectName: "col_" + i });
      slide.addText(runs(col.titulo, { fontSize: 20, bold: true, color: COL.navy }), { x: x + 0.25, y: y0 + 0.2, w: cw - 0.5, h: 0.6, isTextBox: true, margin: 0, valign: "top" });
      let yy = y0 + 0.85; const tach = esTachada(col.titulo, s) ? TACHAR : {};
      const zB = n === 3 ? 18 : 20, items = col.items || [];
      if (col._img) {
        const libre = y0 + ch - yy - 0.15 - (col.ko ? 1.1 : 0) - altoBullets(items, cw - 0.4, zB) - 0.1;
        const ih = Math.max(0.75, Math.min(1.7, ((cw - 0.5) * 200) / 440, libre));
        await ponerImg(slide, col._img, x + 0.25, yy, cw - 0.5, ih, "col_img_" + i); yy += ih + 0.1;
      }
      if (col.ko) { const k = koFit(col.ko, cw - 0.5, 1.0, 54, 18); slide.addText(lineas(k.text, { fontSize: k.size, bold: true, color: COL.azul, ...tach }), { x: x + 0.25, y: yy, w: cw - 0.5, h: 1.0, isTextBox: true, margin: 0, valign: "middle" }); yy += 1.1; }
      // la letra baja hasta que las viñetas caben en lo que queda de la tarjeta
      const hB = y0 + ch - yy - 0.15; let z = zB; while (z > 12 && altoBullets(items, cw - 0.4, z) > hB) z--;
      bulletsBox(slide, items, x + 0.2, yy, cw - 0.4, hB, z, tach);
    }
    if (nota) slide.addText(runs(nota, { fontSize: 16, color: COL.ink }), { x: MX, y: BOT - 0.55, w: W, h: 0.55, isTextBox: true, margin: 0, valign: "middle" });
    return slide;
  },
  async ejercicio(pres, s, d) {
    const slide = pres.addSlide({ masterName: "AS_CONTENIDO", sectionTitle: d._sec });
    slide.addText(tituloRuns(s), { placeholder: "title" });
    const e = s.ejercicio || { consigna: "", items: [] };
    const W = anchoC(s); if (s._img) await ponerImgR(slide, s);
    let y0 = TOP; const cons = [s.subtitulo, e.consigna].filter(Boolean).join(" · ");
    if (cons) { slide.addText(runs(cons, { fontSize: 18, italic: true, color: COL.azul }), { x: MX, y: y0, w: W, h: 0.6, isTextBox: true, margin: 0, valign: "top" }); y0 += 0.7; }
    const it = e.items.slice(0, 6); const n = it.length || 1; const mIni = String(s.titulo).match(/(\d+)\s*[–-]\s*(\d+)/); const ini = mIni && +mIni[2] - +mIni[1] + 1 === it.length ? +mIni[1] : 1;
    if (it.length && it.every((q) => q._img)) return ejercicioTarjetas(pres, slide, s, it, ini, y0, W);
    const conMini = it.some((q) => q._img); const gap = 0.14, rh = Math.min(conMini ? 1.05 : n <= 2 ? 1.3 : 0.95, (BOT - y0 - gap * (n - 1)) / n);
    if (n <= 3) y0 += Math.max(0, (BOT - y0 - (n * rh + (n - 1) * gap)) / 2) * 0.6; // pocos ítems: el bloque baja hacia el centro
    // columna de respuesta más ancha si las respuestas son largas
    const maxR = Math.max(1, ...it.map((q) => ems(q.respuesta))); const ansW = Math.min(maxR > 26 ? 6.3 : maxR > 16 ? 5.4 : 4.53, W * 0.48); const ansX = MX + W - ansW;
    // miniatura por ítem (si alguno la trae, todas las preguntas se corren igual)
    const tb = conMini ? Math.min(rh - 0.04, 1.0) : 0; const qX = MX + 0.7 + (tb ? tb + 0.12 : 0); const qW = ansX - qX - 0.25;
    // talla de la respuesta: en una línea si cabe a ≥ 16 pt; si no, en dos líneas con alto para las dos (nunca se sale de la caja)
    const tallaR = (r) => {
      const w = (ansW - 0.2) * 72 * 0.88, h = (rh - 0.12) * 72, e_ = Math.max(1, ems(r));
      const una = Math.min(22, Math.floor(w / e_), Math.floor(h / 1.25));
      return una >= 16 ? una : Math.max(11, Math.min(22, Math.floor((2 * w) / e_), Math.floor(h / 2.5)));
    };
    for (const [i, q] of it.entries()) {
      const y = y0 + i * (rh + gap);
      slide.addShape(pres.ShapeType.ellipse, { x: MX, y: y + (rh - 0.5) / 2, w: 0.5, h: 0.5, fill: { color: COL.navy }, line: { color: COL.navy }, objectName: "num_" + i });
      slide.addText(String(ini + i), { x: MX, y: y + (rh - 0.5) / 2, w: 0.5, h: 0.5, fontSize: 16, bold: true, color: COL.blanco, align: "center", valign: "middle", isTextBox: true, margin: 0 });
      const preg = String(q.pregunta).replace(new RegExp("^\\s*" + (ini + i) + "\\s*[·.)]\\s*"), ""); // el número ya va en el círculo
      if (q._img) await ponerImg(slide, q._img, MX + 0.62, y + (rh - tb) / 2, tb, tb, "item_img_" + i);
      slide.addText(runs(preg, { fontSize: Math.min(fit(preg, 24, 16, 40), tallaTexto(preg, qW, rh, 24, 12)), color: COL.ink }), { x: qX, y, w: qW, h: rh, valign: "middle", isTextBox: true, margin: 0 });
      slide.addShape(pres.ShapeType.roundRect, { x: ansX, y: y + 0.04, w: ansW, h: rh - 0.08, fill: { color: COL.azul }, line: { color: COL.azul }, rectRadius: 0.12, objectName: "rev_" + revN + "_caja" });
      slide.addText(runs(q.respuesta, { fontSize: tallaR(q.respuesta), bold: true, color: COL.blanco, align: "center" }), { x: ansX + 0.1, y: y + 0.04, w: ansW - 0.2, h: rh - 0.08, valign: "middle", isTextBox: true, margin: 0, objectName: "rev_" + (revN++) + "_txt" });
    }
    return slide;
  },
  async tabla(pres, s, d) {
    const slide = pres.addSlide({ masterName: "AS_CONTENIDO", sectionTitle: d._sec });
    slide.addText(tituloRuns(s), { placeholder: "title" });
    const t = s.tabla || { cabeceras: [], filas: [] };
    const W = anchoC(s); if (s._img) await ponerImgR(slide, s);
    let y0 = TOP; if (s.subtitulo) { slide.addText(runs(s.subtitulo, { fontSize: 18, italic: true, color: COL.azul }), { x: MX, y: y0, w: W, h: 0.5, isTextBox: true, margin: 0 }); y0 += 0.6; }
    const nf = t.filas.length, nc = Math.max(t.cabeceras.length, ...t.filas.map((f) => f.length), 1);
    const maxLen = Math.max(...t.filas.flat().map(len), ...t.cabeceras.map(len), 1);
    const fz = nf > 6 || nc > 4 || maxLen > 40 ? 16 : 18;
    const conCab = t.cabeceras.some((h) => String(h || "").trim()); const tachCol = Array.from({ length: nc }, (_, j) => esTachada(t.cabeceras[j], s));
    const cell = (v, head, odd, tach) => ({ text: runs(v, { fontSize: fz, bold: head, color: head ? COL.blanco : COL.ink, ...(tach ? TACHAR : {}) }), options: { fill: { color: head ? COL.navy : odd ? COL.tinte : COL.blanco }, valign: "middle", margin: [4, 8, 4, 8] } });
    const rows = [...(conCab ? [Array.from({ length: nc }, (_, j) => cell(t.cabeceras[j] ?? "", true))] : []), ...t.filas.map((f, i) => Array.from({ length: nc }, (_, j) => cell(f[j] ?? "", false, i % 2 === 0, tachCol[j])))];
    slide.addTable(rows, { x: MX, y: y0, w: W, colW: Array(nc).fill(W / nc), border: { type: "solid", pt: 0.75, color: COL.borde }, rowH: Math.min(0.62, (BOT - y0) / (nf + (conCab ? 1 : 0))), objectName: "tabla" });
    return slide;
  },
  async frase(pres, s, d) {
    const slide = pres.addSlide({ masterName: "AS_CONTENIDO", sectionTitle: d._sec });
    slide.addText(tituloRuns(s), { placeholder: "title" });
    const f = s.frase || { ko: "", es: "" };
    // con imagen: el panel de la frase pasa a la izquierda y la imagen va a la derecha
    const PX = s._img ? MX : 1.4, PW = s._img ? anchoC(s) : 10.53; if (s._img) await ponerImgR(slide, s);
    slide.addShape(pres.ShapeType.roundRect, { x: PX, y: 1.8, w: PW, h: 3.4, fill: { color: COL.tinte }, line: { color: COL.tinte }, rectRadius: 0.3, objectName: "panel" });
    const kf = koFit(f.ko, PW - 0.43, f.es ? 2.0 : 2.9, 64, 24);
    const opK = { fontSize: kf.size, bold: true, color: COL.azul, align: "center" };
    const rk = f.destacar && f.ko.includes(f.destacar) ? lineasDestacar(kf.text, opK, f.destacar) : lineas(kf.text, opK);
    slide.addText(rk, { x: PX + 0.2, y: f.es ? 2.0 : 1.95, w: PW - 0.4, h: f.es ? 2.0 : 3.1, valign: "middle", isTextBox: true, margin: 0, objectName: "frase_ko" });
    if (f.es) slide.addText(runs(f.es, { fontSize: tallaTexto(f.es, PW - 1.3, 0.9, 24, 14), color: COL.tinta2, align: "center" }), { x: PX + 0.55, y: 4.0, w: PW - 1.3, h: 0.9, valign: "top", isTextBox: true, margin: 0 });
    await audioEn(slide, f.ko, PX + PW - 0.63, 4.55);
    const extra = [s.subtitulo, ...(s.bullets || [])].filter(Boolean);
    if (extra.length) bulletsBox(slide, extra, PX, 5.4, PW, BOT - 5.4, 18);
    return slide;
  },
};

// Frase con una parte destacada: lo destacado en azul, el resto en navy
function lineasDestacar(text, opts, dest) {
  const out = [];
  text.split("\n").forEach((l, li, arr) => {
    const partes = l.split(dest); const rr = [];
    partes.forEach((p, i) => { if (p) rr.push(...runs(p, { ...opts, color: COL.navy })); if (i < partes.length - 1) rr.push(...runs(dest, { ...opts, color: COL.azul })); });
    if (li < arr.length - 1 && rr.length) rr[rr.length - 1].options = { ...rr[rr.length - 1].options, breakLine: true };
    out.push(...rr);
  });
  return out;
}
// Ejercicio en tarjetas: cuando cada ítem trae imagen, la imagen manda (grande), la pregunta abajo y la respuesta con clic
async function ejercicioTarjetas(pres, slide, s, it, ini, y0, W) {
  const n = it.length, cols = n <= 5 ? n : 3, rows = Math.ceil(n / cols), gap = 0.2;
  const cw = (W - gap * (cols - 1)) / cols, ch = (BOT - y0 - gap * (rows - 1)) / rows;
  const largas = Math.max(...it.map((q) => ems(q.pregunta))) > 18 || Math.max(...it.map((q) => ems(q.respuesta))) > 14;
  const aH = largas ? Math.min(0.95, ch * 0.22) : Math.min(0.7, ch * 0.18), pH = largas ? Math.min(1.35, ch * 0.3) : Math.min(0.85, ch * 0.2), iH = ch - aH - pH - 0.3;
  const tallaPreg = Math.max(13, Math.min(...it.map((q) => tallaTexto(String(q.pregunta), cw - 0.2, pH, 22, 12))));
  const tallaResp = Math.max(12, Math.min(...it.map((q) => tallaTexto(String(q.respuesta), cw - 0.3, aH - 0.08, 20, 11))));
  for (const [i, q] of it.entries()) {
    const x = MX + (i % cols) * (cw + gap), y = y0 + Math.floor(i / cols) * (ch + gap);
    slide.addShape(pres.ShapeType.roundRect, { x, y, w: cw, h: ch, fill: { color: COL.blanco }, line: { color: COL.borde, width: 1 }, rectRadius: 0.15, shadow: sh(), objectName: "card_" + i });
    await ponerImg(slide, q._img, x + 0.12, y + 0.1, cw - 0.24, iH, "item_img_" + i);
    slide.addShape(pres.ShapeType.ellipse, { x: x + 0.1, y: y + 0.1, w: 0.46, h: 0.46, fill: { color: COL.navy }, line: { color: COL.blanco, width: 1.5 }, objectName: "num_" + i });
    slide.addText(String(ini + i), { x: x + 0.1, y: y + 0.1, w: 0.46, h: 0.46, fontSize: 15, bold: true, color: COL.blanco, align: "center", valign: "middle", isTextBox: true, margin: 0 });
    const preg = String(q.pregunta).replace(new RegExp("^\\s*" + (ini + i) + "\\s*[·.)]\\s*"), "");
    slide.addText(runs(preg, { fontSize: tallaPreg, color: COL.ink, align: "center" }), { x: x + 0.1, y: y + 0.1 + iH + 0.05, w: cw - 0.2, h: pH, valign: "middle", isTextBox: true, margin: 0 });
    const ay = y + ch - aH - 0.1;
    slide.addShape(pres.ShapeType.roundRect, { x: x + 0.12, y: ay, w: cw - 0.24, h: aH, fill: { color: COL.azul }, line: { color: COL.azul }, rectRadius: 0.12, objectName: "rev_" + revN + "_caja" });
    slide.addText(runs(q.respuesta, { fontSize: tallaResp, bold: true, color: COL.blanco, align: "center" }), { x: x + 0.15, y: ay, w: cw - 0.3, h: aH, valign: "middle", isTextBox: true, margin: 0, objectName: "rev_" + (revN++) + "_txt" });
  }
  return slide;
}

async function deck(d, outDir) {
  romN = 0; revN = 0;
  const pres = new pptxgen(); pres.layout = "LAYOUT_WIDE"; pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
  pres.title = `${d.curso} · Semana ${d.semana} · ${d.titulo_clase}`; pres.author = "Academia Seúl"; pres.company = "Academia Seúl";
  const pie = `${d.curso} · Semana ${d.semana} · ${d.profe} · Academia Seúl`;
  layouts(pres, pie);
  d._sec = `Semana ${d.semana}`; pres.addSection({ title: d._sec });
  const pendientes = [];
  cargarImagenes(d);
  for (const s of d.slides) if (s.titulo_ko && !koEnTitulo(s) && !String(s.titulo).includes(s.titulo_ko) && !/^(lista|portada|cierre)$/.test(s.layout) && !String(s.subtitulo || "").includes(s.titulo_ko)) s.subtitulo = s.titulo_ko + (s.subtitulo ? " · " + s.subtitulo : "");
  for (const s of d.slides) {
    const fn = LAY[s.layout] || LAY.lista;
    const slide = await fn(pres, s, d);
    const nImg = s._conImg ? "Imagen: incluida (dibujo de la casa)." : pendiente(s) ? "Imagen pendiente: " + (s._sinImg ? s._sinImg.instruccion : s.imagen) : "";
    const notas = [s.notas, nImg, s.fuente ? "Fuente: " + s.fuente : "", "Lámina " + s.L].filter(Boolean).join("\n\n");
    slide.addNotes(notas);
    if (pendiente(s)) pendientes.push({ L: s.L, motivo: s._sinImg ? s._sinImg.motivo : "sin_resolver", texto: s._sinImg ? s._sinImg.instruccion : s.imagen });
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
    const outDir = process.env.DECKS_OUT || (REPO + (d.curso.startsWith("Básico 1") ? "/Curriculo/Fase2_Basico1/decks" : "/Curriculo/Fase3_Basico2/decks"));
    fs.mkdirSync(outDir, { recursive: true });
    res.push(await deck(d, outDir));
  }
  if (browser) await browser.close();
  fs.writeFileSync(path.join(__dirname, "ultimo_build.json"), JSON.stringify(res, null, 2));
  for (const r of res) console.log(`✓ ${path.basename(r.file)} · ${r.slides} láminas${r.pendientes.length ? " · imágenes pendientes: " + r.pendientes.length : ""}`);
})().catch((e) => { console.error(e); process.exit(1); });
