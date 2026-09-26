// md_a_docx.js · Markdown -> Word (docx) con el estilo de la casa de Academia Seúl.
// Compila Básico 1 (A1.1) en dos documentos:
//   a) Curriculo/Fase2_Basico1/Guia_Profesor_Basico1_Octubre_2026.docx
//      portada + índice + 00_Diseno_Basico1.md + profes/S01…S08 (cada archivo en página nueva)
//   b) Curriculo/Fase2_Basico1/Cuaderno_Alumno_Basico1_Octubre_2026.docx
//      portada + índice + alumnos/S01…S08 (nada del material del profesor)
//
// Markdown soportado: # a #### (títulos azul #4236F6 / navy #003478), párrafos (los saltos de línea
// simples se respetan), **negrita**, *cursiva*, ***ambas***, ~~tachado~~, `código` (como texto normal),
// [links](url), <br>, <sub>romanización</sub> (gris y pequeña), \escapes, listas con viñeta, numeradas
// y de casillas (- [ ]) con anidación simple, tablas (cabecera navy con texto blanco, filas cebra,
// bordes grises; una tabla con cabecera vacía se dibuja como tabla etiqueta | valor), citas (>) como
// recuadro azul claro, bloques ``` como recuadro gris y separadores (---).
// Estilo: US Letter, Arial 10,5 pt (Malgun Gothic para el hangul), márgenes 0,9", encabezado con el
// título del documento, pie con www.academiaseul.com y número de página, logo azul en la portada.
// Nunca rojo.
//
// Uso: cd <scratchpad> && node curriculo/md_a_docx.js
// La copia del repo (Curriculo/fuente/md_a_docx.js) usa el docx del scratchpad (AS_SCRATCH) si no lo encuentra.
const fs = require("fs");
const path = require("path");

const SCRATCH = process.env.AS_SCRATCH ||
  "C:\\Users\\Chingu\\AppData\\Local\\Temp\\claude\\C--Users-Chingu-Desktop-ACADEMIASEULWEB\\d4111e1b-5523-44ea-97b2-b1a1d9545b9e\\scratchpad";
let docx;
try { docx = require("docx"); } catch (e) { docx = require("module").createRequire(path.join(SCRATCH, "package.json"))("docx"); }
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun, Tab,
  WidthType, AlignmentType, BorderStyle, ShadingType, Footer, Header, PageNumber,
  TabStopType, VerticalAlign, HeadingLevel, LevelFormat, HeightRule, Bookmark,
  InternalHyperlink, ExternalHyperlink, LineRuleType,
} = docx;

const REPO = "C:\\Users\\Chingu\\Desktop\\ACADEMIASEULWEB";
const BASE = path.join(REPO, "Curriculo", "Fase2_Basico1");

// ============================ ESTILO DE LA CASA ============================
const AZUL = "4236F6", NAVY = "003478", INK = "1B1C24", GREY = "5C5F6B";
const LINE = "CCCCCC", TINT = "EEF1F6", ZEBRA = "F7F8FA", WHITE = "FFFFFF";
const QUOTE_FILL = "EEF0FE", CODE_FILL = "F4F5F7";
// Todo texto (con o sin hangul) lleva Malgun Gothic en el espacio eastAsia: Word lo usa para el 한글.
const FONT = { ascii: "Arial", hAnsi: "Arial", cs: "Arial", eastAsia: "Malgun Gothic" };
// Solo para diagramas de texto (```) que necesitan columnas alineadas; el hangul sigue en Malgun Gothic.
const FONT_MONO = { ascii: "Consolas", hAnsi: "Consolas", cs: "Consolas", eastAsia: "Malgun Gothic" };
const PAGE_W = 12240, PAGE_H = 15840;       // US Letter
const MARGIN = 1296;                        // 0,9"
const CONTENT_W = PAGE_W - 2 * MARGIN;      // 9648
const BODY = 21;                            // 10,5 pt
const WEB = "www.academiaseul.com";
const WA = "+56 9 4211 5562";
const LOGO = fs.readFileSync(path.join(SCRATCH, "logo-azul.png"));
const SELLO_PATH = path.join(SCRATCH, "igpost", "sello-azul.png");
const SELLO = fs.existsSync(SELLO_PATH) ? fs.readFileSync(SELLO_PATH) : null;

// Interlineado "al menos": Malgun Gothic es más alta que Arial; con interlineado automático las líneas con
// 한글 quedarían más separadas que las demás. Con AT_LEAST todas las líneas miden lo mismo.
const ls = (size) => ({ line: Math.round(size * 13.6), lineRule: LineRuleType.AT_LEAST });

const thin = { style: BorderStyle.SINGLE, size: 4, color: LINE };
const none = { style: BorderStyle.NONE, size: 0, color: WHITE };
const allThin = { top: thin, bottom: thin, left: thin, right: thin, insideHorizontal: thin, insideVertical: thin };

// ============================ INLINE ============================
const curly = (s) => s.replace(/"([^"\n]*)"/g, "\u201C$1\u201D");

// ¿Hay un * de cierre (no parte de **) más adelante?
function hasClosingStar(src, from) {
  for (let p = from; p < src.length; p++) {
    if (src[p] === "`") { const e = src.indexOf("`", p + 1); if (e > p) { p = e; continue; } }
    if (src[p] === "*" && src[p + 1] === "*") { p++; continue; }
    if (src[p] === "*" && src[p - 1] !== " ") return true;
  }
  return false;
}

// Devuelve segmentos { t, b, i, s, sub, href } o { br: true }.
function parseInline(src) {
  src = src.split(/(`[^`]*`)/).map((p, k) => (k % 2 ? p : curly(p))).join("");
  const out = [];
  let b = false, i = false, s = false, sub = false, buf = "";
  const flush = () => { if (buf) { out.push({ t: buf, b, i, s, sub }); buf = ""; } };
  let k = 0;
  const n = src.length;
  while (k < n) {
    const c = src[k];
    const rest = src.slice(k, k + 8);
    if (c === "\\" && k + 1 < n && /[\\`*_{}\[\]()#+\-.!|<>~"]/.test(src[k + 1])) { buf += src[k + 1]; k += 2; continue; }
    if (c === "`") {
      const e = src.indexOf("`", k + 1);
      if (e > k) { buf += src.slice(k + 1, e); k = e + 1; continue; }
    }
    if (c === "<") {
      const m = /^<br\s*\/?>/i.exec(rest);
      if (m) { flush(); out.push({ br: true }); k += m[0].length; continue; }
      if (/^<sub>/i.test(rest)) { flush(); sub = true; k += 5; continue; }
      if (/^<\/sub>/i.test(rest)) { flush(); sub = false; k += 6; continue; }
    }
    if (c === "~" && src[k + 1] === "~") {
      if (s || (src[k + 2] && src[k + 2] !== " " && src.indexOf("~~", k + 2) > 0)) { flush(); s = !s; k += 2; continue; }
    }
    // "***x**" (CommonMark): el primer * es literal y el resto abre la negrita, p. ej. ***사 명** = **\*사 명**.
    if (c === "*" && src[k + 1] === "*" && src[k + 2] === "*" && !b && !i && src[k + 3] && src[k + 3] !== " ") {
      const m = /\*+/.exec(src.slice(k + 3));
      if (m && m[0].length === 2) { flush(); b = true; buf = "*"; k += 3; continue; }
    }
    if (c === "*" && src[k + 1] === "*") {
      if (b) { flush(); b = false; k += 2; continue; }
      const nx = src[k + 2];
      if (nx && nx !== " " && src.indexOf("**", k + 2) > 0) { flush(); b = true; k += 2; continue; }
      buf += "**"; k += 2; continue;
    }
    if (c === "*") {
      if (i && src[k - 1] !== " ") { flush(); i = false; k++; continue; }
      const nx = src[k + 1];
      if (!i && nx && nx !== " " && hasClosingStar(src, k + 1)) { flush(); i = true; k++; continue; }
      buf += "*"; k++; continue;
    }
    if (c === "[") {
      const m = /^\[([^\]]+)\]\(([^)\s]+)\)/.exec(src.slice(k));
      if (m) { flush(); out.push({ t: m[1], b, i, s, sub, href: m[2] }); k += m[0].length; continue; }
    }
    buf += c; k++;
  }
  flush();
  out.state = { b, i, s, sub };
  return out;
}

const plain = (src) => parseInline(src).map((sg) => (sg.br ? " " : sg.t)).join("").replace(/\s+/g, " ").trim();

// Segmentos -> TextRun / ExternalHyperlink. base: { size, color, bold, italics, font }
function toRuns(segs, base = {}) {
  const size = base.size || BODY;
  const font = base.font || FONT;
  const runs = [];
  for (const sg of segs) {
    if (sg.br) { runs.push(new TextRun({ break: 1, font, size })); continue; }
    const o = {
      text: sg.t, font,
      size: sg.sub ? Math.max(12, Math.round(size * 0.8)) : size,
      color: sg.sub ? (base.subColor || GREY) : (sg.href ? (base.linkColor || AZUL) : (base.color || INK)),
      bold: !!(base.bold || sg.b),
      italics: !!(base.italics || sg.i),
    };
    if (sg.s) o.strike = true;
    if (sg.href) { o.underline = {}; runs.push(new ExternalHyperlink({ link: sg.href, children: [new TextRun(o)] })); }
    else runs.push(new TextRun(o));
  }
  return runs;
}
const inlineRuns = (src, base) => toRuns(parseInline(src), base);

// Parte los segmentos en líneas en cada <br> (para celdas de tabla).
function splitBr(segs) {
  const lines = [[]];
  for (const sg of segs) { if (sg.br) lines.push([]); else lines[lines.length - 1].push(sg); }
  return lines;
}

// ============================ BLOQUES ============================
const RE_FENCE = /^(\s*)(```|~~~)/;
const RE_HEAD = /^(#{1,6})\s+(.*?)\s*#*\s*$/;
const RE_HR = /^\s{0,3}(-{3,}|\*{3,})\s*$/;
const RE_LI = /^(\s*)([-*+]|\d{1,3}[.)])\s+(.*)$/;
const RE_QUOTE = /^\s{0,3}>/;
const RE_SEP = /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/;
const isTableStart = (l, next) => /^\s*\|/.test(l) && next !== undefined && RE_SEP.test(next) && next.includes("-");
const isBlank = (l) => !l || !l.trim();
const indentOf = (l) => l.match(/^ */)[0].length;

function splitRow(l) {
  let t = l.trim();
  if (t.startsWith("|")) t = t.slice(1);
  if (t.endsWith("|") && !t.endsWith("\\|")) t = t.slice(0, -1);
  const cells = [];
  let cur = "";
  for (let k = 0; k < t.length; k++) {
    if (t[k] === "\\" && t[k + 1] === "|") { cur += "|"; k++; continue; }
    if (t[k] === "|") { cells.push(cur.trim()); cur = ""; continue; }
    cur += t[k];
  }
  cells.push(cur.trim());
  return cells;
}

function parseBlocks(lines) {
  const blocks = [];
  let i = 0;
  const n = lines.length;
  const startsBlock = (l, next) =>
    RE_FENCE.test(l) || RE_HEAD.test(l) || RE_HR.test(l) || RE_QUOTE.test(l) || RE_LI.test(l) || isTableStart(l, next);

  function readFence(start) {
    const ind = indentOf(lines[start]);
    const code = [];
    let j = start + 1;
    while (j < n && !/^\s*(```|~~~)\s*$/.test(lines[j])) { code.push(lines[j]); j++; }
    const strip = (l) => { let c = 0; while (c < ind && l[c] === " ") c++; return l.slice(c); };
    return { block: { type: "code", lines: code.map(strip) }, next: j + 1 };
  }

  while (i < n) {
    const l = lines[i];
    if (isBlank(l)) { i++; continue; }
    if (RE_FENCE.test(l)) { const r = readFence(i); r.block.indent = indentOf(l); blocks.push(r.block); i = r.next; continue; }
    let m = RE_HEAD.exec(l);
    if (m && indentOf(l) < 4) { blocks.push({ type: "h", level: m[1].length, text: m[2] }); i++; continue; }
    if (RE_HR.test(l)) { blocks.push({ type: "hr" }); i++; continue; }
    if (isTableStart(l, lines[i + 1])) {
      const header = splitRow(l);
      const align = splitRow(lines[i + 1]).map((c) => (/^:-+:$/.test(c) ? "center" : /-:$/.test(c) ? "right" : "left"));
      const rows = [];
      let j = i + 2;
      while (j < n && /^\s*\|/.test(lines[j])) { rows.push(splitRow(lines[j])); j++; }
      blocks.push({ type: "table", header, align, rows });
      i = j; continue;
    }
    if (RE_QUOTE.test(l)) {
      const inner = [];
      while (i < n && RE_QUOTE.test(lines[i])) { inner.push(lines[i].replace(/^\s{0,3}> ?/, "")); i++; }
      blocks.push({ type: "quote", blocks: parseBlocks(inner) });
      continue;
    }
    m = RE_LI.exec(l);
    if (m) {
      const ind = m[1].length;
      const item = { type: "li", indent: ind, marker: m[2], text: m[3], cont: [], children: [] };
      const ck = /^\[( |x|X)\]\s+(.*)$/.exec(item.text);
      if (ck && /[-*+]/.test(item.marker)) { item.check = ck[1] !== " "; item.text = ck[2]; }
      i++;
      // Líneas de continuación: sangradas y que no son un ítem nuevo (se permite una línea en blanco entre medio).
      while (i < n) {
        const c = lines[i];
        if (isBlank(c)) {
          const nx = lines[i + 1];
          if (nx !== undefined && indentOf(nx) >= Math.max(2, ind + 2) && !RE_LI.test(nx) && !isBlank(nx)) { i++; continue; }
          break;
        }
        if (indentOf(c) >= Math.max(2, ind + 2) && !RE_LI.test(c)) {
          if (RE_FENCE.test(c)) { const r = readFence(i); item.children.push(r.block); i = r.next; continue; }
          item.children.push({ type: "cont", text: c.trim() });
          i++; continue;
        }
        break;
      }
      blocks.push(item);
      continue;
    }
    // Párrafo: líneas seguidas hasta una línea en blanco o el inicio de otro bloque.
    const pl = [l.trim()];
    i++;
    while (i < n && !isBlank(lines[i]) && !startsBlock(lines[i], lines[i + 1])) { pl.push(lines[i].trim()); i++; }
    blocks.push({ type: "p", lines: pl });
  }
  return blocks;
}

// ============================ RENDER ============================
const NUMBERING = {
  config: [{
    reference: "vinetas",
    levels: [0, 1, 2].map((lv) => ({
      level: lv, format: LevelFormat.BULLET, text: ["\u2022", "\u25E6", "\u25AA"][lv], alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 360 + lv * 360, hanging: 260 } }, run: { color: AZUL, bold: true, font: { ascii: "Arial", hAnsi: "Arial", cs: "Arial", eastAsia: "Malgun Gothic" } } },
    })),
  }],
};

const HEAD_STYLE = {
  1: { size: 32, color: AZUL, before: 0, after: 140 },
  2: { size: 26, color: AZUL, before: 280, after: 100 },
  3: { size: 23, color: NAVY, before: 200, after: 80 },
  4: { size: 21, color: NAVY, before: 160, after: 60 },
};
const HEADING_LEVEL = { 1: HeadingLevel.HEADING_1, 2: HeadingLevel.HEADING_2, 3: HeadingLevel.HEADING_3, 4: HeadingLevel.HEADING_4 };

function heading(level, text, opts = {}) {
  const lv = Math.min(level, 4);
  const st = HEAD_STYLE[lv];
  let children = inlineRuns(text, { size: st.size, color: st.color, bold: true, subColor: st.color, linkColor: st.color });
  if (opts.bookmark) children = [new Bookmark({ id: opts.bookmark, children })];
  const p = {
    heading: HEADING_LEVEL[lv], children, keepNext: true, keepLines: true,
    spacing: { before: opts.pageBreak ? 0 : st.before, after: st.after, ...ls(st.size) },
  };
  if (lv === 1) p.border = { bottom: { style: BorderStyle.SINGLE, size: 8, color: LINE, space: 4 } };
  if (opts.pageBreak) p.pageBreakBefore = true;
  return new Paragraph(p);
}

function isDiagram(codeLines) {
  const txt = codeLines.join("\n");
  if (/[\u2500-\u257F]/.test(txt)) return true;                 // └ ─ │ …
  if (/\+-{2,}|-{2,}\+|={4,}/.test(txt)) return true;           // +----+  ====
  return codeLines.filter((l) => /\S {3,}\S/.test(l)).length >= 2; // columnas alineadas con espacios
}

function boxTable(paras, width, { fill, borders, margins, indent }) {
  const t = {
    width: { size: width, type: WidthType.DXA }, columnWidths: [width], borders,
    rows: [new TableRow({ children: [new TableCell({ children: paras, width: { size: width, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill }, margins })] })],
  };
  if (indent) t.indent = { size: indent, type: WidthType.DXA };
  return new Table(t);
}

function codeBox(lines, width, indent = 0) {
  const mono = isDiagram(lines);
  const font = mono ? FONT_MONO : FONT;
  const size = 18;
  const paras = (lines.length ? lines : [""]).map((l) => new Paragraph({
    children: [new TextRun({ text: l.replace(/\t/g, "    "), font, size, color: INK })],
    spacing: { after: 0, ...ls(size) }, keepLines: true,
  }));
  const w = width - indent;
  return boxTable(paras, w, {
    fill: CODE_FILL, borders: { top: thin, bottom: thin, left: thin, right: thin, insideHorizontal: none, insideVertical: none },
    margins: { top: 90, bottom: 90, left: 150, right: 150 }, indent,
  });
}

function quoteBox(innerBlocks, width) {
  const innerW = width - 170 - 150 - 40;
  let paras = renderBlocks(innerBlocks, { width: innerW, inBox: true });
  if (!paras.length || paras[paras.length - 1] instanceof Table) paras.push(new Paragraph({ children: [], spacing: { after: 0 } }));
  const left = { style: BorderStyle.SINGLE, size: 24, color: AZUL };
  return boxTable(paras, width, {
    fill: QUOTE_FILL, borders: { top: none, bottom: none, left, right: none, insideHorizontal: none, insideVertical: none },
    margins: { top: 100, bottom: 100, left: 170, right: 150 },
  });
}

// ---- tablas ----
function units(s) {
  let u = 0;
  for (const ch of s) {
    const cp = ch.codePointAt(0);
    if ((cp >= 0x1100 && cp <= 0x11FF) || (cp >= 0x3130 && cp <= 0x318F) || (cp >= 0xAC00 && cp <= 0xD7AF)) u += 1.85;
    else if (cp >= 0x2190) u += 1.8;                 // flechas, símbolos, emoji
    else if (/[A-ZÁÉÍÓÚÑMW@%&]/.test(ch)) u += 1.25;
    else if (/[ilIjtf.,;:'!|·\s]/.test(ch)) u += 0.6;
    else u += 1;
  }
  return u;
}

function autoWidths(allRows, W, size, headerRow) {
  const ncol = allRows[0].length;
  const cw = 5 * size;               // ancho medio de un carácter en twips (≈ 0,5 em)
  const pad = 200;
  const mins = [], maxs = [];
  for (let c = 0; c < ncol; c++) {
    let mn = 0, mx = 0;
    allRows.forEach((r, ri) => {
      const k = (ri === 0 && headerRow) ? 1.08 : 1;
      const lines = splitBr(parseInline(r[c] || "")).map((segs) => segs.map((s) => s.t).join(""));
      for (const ln of lines) {
        mx = Math.max(mx, units(ln) * cw * k);
        for (const w of ln.split(/\s+/)) mn = Math.max(mn, units(w) * cw * k);
      }
    });
    mins.push(Math.min(Math.max(mn + pad, 380), W * 0.42));
    maxs.push(Math.max(mx + pad, mins[c]));
  }
  const sMin = mins.reduce((a, b) => a + b, 0), sMax = maxs.reduce((a, b) => a + b, 0);
  if (process.env.AS_DEBUG_TABLAS && sMin > W) console.log("TABLA ESTRECHA", ncol, "cols · sMin", Math.round(sMin), "> W", W, "·", JSON.stringify(allRows[0].map((x) => x.slice(0, 18))));
  let w;
  if (sMax <= W) w = maxs.map((x) => x + (W - sMax) * (x / sMax));
  else if (sMin <= W) w = mins.map((x, c) => x + (maxs[c] - x) * (W - sMin) / (sMax - sMin));
  else w = mins.map((x) => x * W / sMin);
  w = w.map((x) => Math.max(200, Math.round(x)));
  w[w.length - 1] += W - w.reduce((a, b) => a + b, 0);
  return w;
}

function renderTable(tb, W) {
  const ncol = Math.max(tb.header.length, ...tb.rows.map((r) => r.length));
  const pad = (r) => { const x = r.slice(0, ncol); while (x.length < ncol) x.push(""); return x; };
  const header = pad(tb.header);
  const rows = tb.rows.map(pad);
  const headerEmpty = header.every((h) => !h.trim());
  const size = ncol <= 4 ? 18 : ncol <= 7 ? 17 : ncol <= 10 ? 16 : 15;
  const all = headerEmpty ? rows : [header, ...rows];
  if (!all.length) return null;
  const widths = autoWidths(all, W, size, !headerEmpty);
  const align = (c) => ({ center: AlignmentType.CENTER, right: AlignmentType.RIGHT }[tb.align[c]] || AlignmentType.LEFT);

  const cellParas = (text, c, base) => {
    const lines = splitBr(parseInline(text));
    return lines.map((segs, li) => new Paragraph({
      children: toRuns(segs, base), alignment: align(c),
      spacing: { after: li === lines.length - 1 ? 0 : 30, ...ls(base.size || BODY) },
    }));
  };
  const mk = (children, c, extra = {}) => new TableCell(Object.assign({
    children, width: { size: widths[c], type: WidthType.DXA },
    margins: { top: 45, bottom: 45, left: 90, right: 90 },
  }, extra));

  const out = [];
  if (!headerEmpty) {
    out.push(new TableRow({
      tableHeader: true, cantSplit: true,
      children: header.map((h, c) => mk(cellParas(h, c, { size, color: WHITE, bold: true, subColor: "DDE3F0", linkColor: WHITE }), c, {
        shading: { type: ShadingType.CLEAR, fill: NAVY }, verticalAlign: VerticalAlign.CENTER,
      })),
    }));
  }
  rows.forEach((r, ri) => {
    const len = r.reduce((a, x) => a + x.length, 0);
    const empty = r.every((x) => !x.trim());
    const longRow = r.some((x) => plain(x).length > 90);
    const rowOpts = { cantSplit: len < 400, children: r.map((x, c) => {
      const kv = headerEmpty && c === 0;
      const base = kv ? { size, bold: true, color: NAVY } : { size };
      const fill = kv ? TINT : (ri % 2 === 1 ? ZEBRA : null);
      const extra = { verticalAlign: longRow ? VerticalAlign.TOP : VerticalAlign.CENTER };
      if (fill) extra.shading = { type: ShadingType.CLEAR, fill };
      return mk(cellParas(x, c, base), c, extra);
    }) };
    if (empty) rowOpts.height = { value: 460, rule: HeightRule.ATLEAST };
    out.push(new TableRow(rowOpts));
  });
  return new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: widths, borders: allThin, rows: out });
}

// Espacio chico después de una tabla o un recuadro, para que el texto siguiente no quede pegado.
const gap = (after = 100) => new Paragraph({ children: [], spacing: { before: 0, after, line: 200 } });

function renderList(items, ctx) {
  const out = [];
  items.forEach((it, idx) => {
    const lv = it.indent === 0 ? 0 : it.indent <= 4 ? 1 : 2;
    const last = idx === items.length - 1;
    const after = last && !it.children.length ? 120 : 40;
    const size = ctx.inBox ? 20 : BODY;
    let p;
    if (it.check !== undefined) {
      p = new Paragraph({
        children: [new TextRun({ text: it.check ? "\u2611" : "\u2610", font: { ascii: "Segoe UI Symbol", hAnsi: "Segoe UI Symbol", eastAsia: "Malgun Gothic", cs: "Segoe UI Symbol" }, size: size + 2, color: AZUL }),
          new TextRun({ children: [new Tab()], font: FONT, size }), ...inlineRuns(it.text, { size })],
        indent: { left: 380 + lv * 360, hanging: 340 }, spacing: { after, ...ls(size) },
      });
    } else if (/^\d/.test(it.marker)) {
      p = new Paragraph({
        children: [new TextRun({ text: it.marker, font: FONT, size, bold: true, color: AZUL }),
          new TextRun({ children: [new Tab()], font: FONT, size }), ...inlineRuns(it.text, { size })],
        indent: { left: 400 + lv * 360, hanging: 400 }, spacing: { after, ...ls(size) },
      });
    } else {
      p = new Paragraph({ children: inlineRuns(it.text, { size }), numbering: { reference: "vinetas", level: lv }, spacing: { after, ...ls(size) } });
    }
    out.push(p);
    const textLeft = (it.check !== undefined ? 380 : /^\d/.test(it.marker) ? 400 : 360) + lv * 360;
    it.children.forEach((ch, ci) => {
      const lastCh = last && ci === it.children.length - 1;
      if (ch.type === "cont") {
        out.push(new Paragraph({ children: inlineRuns(ch.text, { size }), indent: { left: textLeft }, spacing: { after: lastCh ? 120 : 40, ...ls(size) } }));
      } else if (ch.type === "code") {
        out.push(codeBox(ch.lines, ctx.width, Math.min(textLeft, 720)));
        out.push(gap(lastCh ? 100 : 40));
      }
    });
  });
  return out;
}

function renderBlocks(blocks, ctx) {
  const out = [];
  const W = ctx.width || CONTENT_W;
  for (let b = 0; b < blocks.length; b++) {
    const bl = blocks[b];
    const next = blocks[b + 1];
    switch (bl.type) {
      case "h": {
        const opts = ctx.headingOpts ? ctx.headingOpts(bl, b) : {};
        out.push(heading(bl.level, bl.text, opts));
        break;
      }
      case "p": {
        const size = ctx.inBox ? 20 : BODY;
        const runs = [];
        bl.lines.forEach((ln, k) => { if (k) runs.push(new TextRun({ break: 1, font: FONT, size })); runs.push(...inlineRuns(ln, { size })); });
        const label = bl.lines.length === 1 && (/^\*\*[^*].*\*\*:?$/.test(bl.lines[0]) || /:$/.test(bl.lines[0])) && plain(bl.lines[0]).length < 160;
        const lastInBox = ctx.inBox && !next;
        out.push(new Paragraph({ children: runs, keepNext: label && !!next, spacing: { after: lastInBox ? 0 : (ctx.inBox ? 70 : 110), ...ls(size) } }));
        break;
      }
      case "hr":
        out.push(new Paragraph({ children: [], border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: LINE, space: 1 } }, spacing: { before: 60, after: 200 } }));
        break;
      case "code":
        out.push(codeBox(bl.lines, W));
        if (!ctx.inBox || next) out.push(gap());
        break;
      case "table": {
        const t = renderTable(bl, W);
        if (t) { out.push(t); if (!ctx.inBox || next) out.push(gap(120)); }
        break;
      }
      case "quote":
        out.push(quoteBox(bl.blocks, W));
        if (!ctx.inBox || next) out.push(gap(120));
        break;
      case "li": {
        const items = [bl];
        while (blocks[b + 1] && blocks[b + 1].type === "li") { items.push(blocks[b + 1]); b++; }
        out.push(...renderList(items, ctx));
        break;
      }
      default: break;
    }
  }
  return out;
}

// ============================ ARCHIVOS, PORTADA E ÍNDICE ============================
function loadMd(file) {
  const md = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n");
  return parseBlocks(md.split("\n"));
}

// Un archivo = una parte del documento: su primer # abre página nueva y lleva un marcador para el índice.
function renderFile(blocks, id, withH2Marks) {
  let first = true;
  let h2n = 0;
  const marks = [];
  const els = renderBlocks(blocks, {
    width: CONTENT_W,
    headingOpts: (bl) => {
      if (bl.level === 1 && first) { first = false; return { pageBreak: true, bookmark: id }; }
      if (bl.level === 2 && withH2Marks) { const bm = id + "_" + (++h2n); marks.push({ id: bm, text: plain(bl.text) }); return { bookmark: bm }; }
      return {};
    },
  });
  if (first) els.unshift(new Paragraph({ pageBreakBefore: true, children: [new Bookmark({ id, children: [] })], spacing: { after: 0 } }));
  return { els, marks };
}

const para = (runs, o = {}) => new Paragraph(Object.assign({ children: Array.isArray(runs) ? runs : [runs], spacing: { after: 100, ...ls(BODY) } }, o));
const r = (t, o = {}) => new TextRun(Object.assign({ text: t, font: FONT, size: BODY, color: INK }, o));

function portada(lineas, caja, pie) {
  const ch = [
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 700, after: 360 }, children: [new ImageRun({ type: "png", data: LOGO, transformation: { width: 261, height: 90 } })] }),
    ...lineas,
  ];
  if (caja) {
    const b = { style: BorderStyle.SINGLE, size: 8, color: AZUL };
    ch.push(new Paragraph({ children: [], spacing: { before: 240, after: 0 } }));
    ch.push(boxTable(caja.map((runs, k) => new Paragraph({ children: runs, alignment: AlignmentType.CENTER, spacing: { after: k === caja.length - 1 ? 0 : 80, ...ls(20) } })), CONTENT_W, {
      fill: TINT, borders: { top: b, bottom: b, left: b, right: b, insideHorizontal: none, insideVertical: none }, margins: { top: 160, bottom: 160, left: 240, right: 240 },
    }));
  }
  if (SELLO) ch.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 520 }, children: [new ImageRun({ type: "png", data: SELLO, transformation: { width: 84, height: 81 } })] }));
  ch.push(...pie);
  return ch;
}
const centro = (runs, before, after) => new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before, after, ...ls(22) }, children: runs });

function indice(titulo, entradas) {
  const ch = [new Paragraph({ pageBreakBefore: true, spacing: { before: 0, after: 200 }, border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: LINE, space: 4 } },
    children: [r(titulo, { bold: true, size: 32, color: AZUL })] })];
  for (const e of entradas) {
    const runs = [];
    if (e.num) runs.push(r(e.num, { bold: true, color: AZUL, size: e.sub ? 19 : 22 }), new TextRun({ children: [new Tab()], font: FONT, size: 22 }));
    runs.push(r(e.text, { bold: !e.sub, size: e.sub ? 19 : 22, color: e.sub ? GREY : INK }));
    ch.push(new Paragraph({
      children: [new InternalHyperlink({ anchor: e.id, children: runs })],
      indent: e.sub ? { left: 1300, hanging: 0 } : { left: 1300, hanging: 1300 },
      tabStops: [{ type: TabStopType.LEFT, position: 1300 }],
      spacing: { before: e.sub ? 0 : 140, after: e.sub ? 20 : 40, ...ls(22) },
    }));
  }
  ch.push(new Paragraph({ spacing: { before: 280 }, children: [r("Cada parte empieza en una página nueva. En Word, los títulos del índice son vínculos (Ctrl + clic) y el panel de navegación (Vista → Panel de navegación) muestra todos los títulos.", { size: 18, color: GREY, italics: true })] }));
  return ch;
}

function documento({ titulo, descripcion, children }) {
  const small = { size: 16, color: GREY };
  return new Document({
    creator: "Academia Seúl",
    title: titulo,
    description: descripcion,
    numbering: NUMBERING,
    styles: {
      default: { document: { run: { font: FONT, size: BODY, color: INK }, paragraph: { spacing: { after: 100, ...ls(BODY) } } } },
      paragraphStyles: [1, 2, 3, 4].map((lv) => ({
        id: "Heading" + lv, name: "Heading " + lv, basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { font: FONT, size: HEAD_STYLE[lv].size, bold: true, color: HEAD_STYLE[lv].color },
        paragraph: { spacing: { before: HEAD_STYLE[lv].before, after: HEAD_STYLE[lv].after }, keepNext: true, keepLines: true, outlineLevel: lv - 1 },
      })),
    },
    sections: [{
      properties: { titlePage: true, page: { size: { width: PAGE_W, height: PAGE_H }, margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN, header: 560, footer: 560 } } },
      headers: {
        first: new Header({ children: [new Paragraph({ children: [] })] }),
        default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: LINE, space: 4 } }, children: [r("Academia Seúl · " + titulo, small)] })] }),
      },
      footers: {
        first: new Footer({ children: [new Paragraph({ children: [] })] }),
        default: new Footer({ children: [new Paragraph({ tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_W }], children: [
          r(WEB, small), new TextRun({ children: [new Tab()], font: FONT, size: 16 }),
          new TextRun({ children: ["Página ", PageNumber.CURRENT, " de ", PageNumber.TOTAL_PAGES], font: FONT, size: 16, color: GREY }),
        ] })] }),
      },
      children,
    }],
  });
}

const SEMANAS = [1, 2, 3, 4, 5, 6, 7, 8];
const firstH1 = (blocks) => { const h = blocks.find((x) => x.type === "h" && x.level === 1); return h ? plain(h.text) : ""; };
const sinPrefijo = (t) => t.replace(/^Básico 1 \(A1\.1\) · /, "");

// ---------------- a) Guía del profesor ----------------
function guiaProfesor() {
  const titulo = "Básico 1 (A1.1) · Guía del profesor · Cohorte octubre 2026";
  const diseno = loadMd(path.join(BASE, "00_Diseno_Basico1.md"));
  const semanas = SEMANAS.map((s) => loadMd(path.join(BASE, "profes", `S0${s}_Guia_Profesor.md`)));

  const dis = renderFile(diseno, "diseno", true);
  const sem = semanas.map((bl, k) => renderFile(bl, "semana" + (k + 1), false));

  const entradas = [{ id: "diseno", num: "Diseño", text: "Diseño del curso · la columna vertebral de las 8 semanas" }];
  dis.marks.forEach((m) => entradas.push({ id: m.id, text: m.text, sub: true }));
  semanas.forEach((bl, k) => {
    const t = sinPrefijo(firstH1(bl)).replace(/^Semana \d+ · /, "");
    entradas.push({ id: "semana" + (k + 1), num: "Semana " + (k + 1), text: t });
  });

  const children = [
    ...portada([
      centro([r("첫 한국어 · Primeras Palabras", { bold: true, size: 30, color: AZUL })], 120, 80),
      centro([r("Básico 1 (A1.1)", { bold: true, size: 60 })], 0, 60),
      centro([r("Guía del profesor", { bold: true, size: 44, color: AZUL })], 0, 160),
      centro([r("Cohorte octubre 2026 · Profesora: Kiran (기란)", { size: 26, color: NAVY, bold: true })], 0, 80),
      centro([r("Sección martes y sección jueves · 20:00–20:58, hora de Chile · 8 semanas por Zoom", { size: 21, color: GREY })], 0, 60),
    ], [
      [r("Material de la profesora", { bold: true, size: 22, color: NAVY })],
      [r("Diseño del curso + guías de clase de las semanas 1 a 8: plan minuto a minuto, explicaciones desde el español, claves, rúbricas y notas.", { size: 20 })],
      [r("No se comparte con los alumnos: su material va en el Cuaderno del alumno.", { size: 20, bold: true, color: AZUL })],
    ], [
      centro([r(WEB + " · WhatsApp " + WA + " · @academiaseul", { size: 19, color: GREY })], 120, 60),
      centro([r("Versión del 26 de septiembre de 2026 · compilada desde Curriculo/Fase2_Basico1 (00_Diseno_Basico1.md y profes/S01–S08)", { size: 16, color: GREY, italics: true })], 80, 0),
    ]),
    ...indice("Contenido", entradas),
    ...dis.els,
    ...sem.flatMap((s) => s.els),
  ];
  return { file: path.join(BASE, "Guia_Profesor_Basico1_Octubre_2026.docx"), doc: documento({ titulo, descripcion: "Básico 1 (A1.1) · diseño del curso y guías de la profesora, semanas 1 a 8 · cohorte octubre 2026", children }) };
}

// ---------------- b) Cuaderno del alumno ----------------
function cuadernoAlumno() {
  const titulo = "Básico 1 (A1.1) · Cuaderno del alumno · Cohorte octubre 2026";
  const semanas = SEMANAS.map((s) => loadMd(path.join(BASE, "alumnos", `S0${s}_Material_Alumno.md`)));
  const sem = semanas.map((bl, k) => renderFile(bl, "semana" + (k + 1), false));
  const entradas = semanas.map((bl, k) => ({ id: "semana" + (k + 1), num: "Semana " + (k + 1), text: firstH1(bl).replace(/^Semana \d+ · /, "") }));

  const children = [
    ...portada([
      centro([r("Básico 1 (A1.1)", { bold: true, size: 60 })], 120, 60),
      centro([r("Primeras Palabras · 첫 한국어", { bold: true, size: 36, color: AZUL })], 0, 160),
      centro([r("Cuaderno del alumno", { bold: true, size: 44, color: NAVY })], 0, 160),
      centro([r("Cohorte octubre 2026 · con Kiran (기란) · martes o jueves 20:00, hora de Chile", { size: 22, color: GREY })], 0, 360),
      centro([r("Nombre: ______________________________     Sección:  martes  /  jueves", { size: 22 })], 0, 60),
    ], [
      [r("8 semanas para leer 한글 y decir tus primeras frases reales.", { bold: true, size: 22, color: NAVY })],
      [r("Cada semana: lo que vas a poder decir, vocabulario, gramática, cómo suena, diálogo, ejercicios, tarjeta de sala, nota cultural y tarea.", { size: 20 })],
    ], [
      centro([r(WEB + " · WhatsApp " + WA + " · @academiaseul", { size: 19, color: GREY })], 120, 60),
      centro([r("화이팅!", { bold: true, size: 26, color: AZUL })], 60, 0),
    ]),
    ...indice("Contenido", entradas),
    ...sem.flatMap((s) => s.els),
  ];
  return { file: path.join(BASE, "Cuaderno_Alumno_Basico1_Octubre_2026.docx"), doc: documento({ titulo, descripcion: "Básico 1 (A1.1) · Primeras Palabras · 첫 한국어 · material del alumno, semanas 1 a 8 · cohorte octubre 2026", children }) };
}

module.exports = { parseBlocks, parseInline, renderBlocks, documento };

if (require.main === module) {
  (async () => {
    for (const make of [guiaProfesor, cuadernoAlumno]) {
      const { file, doc } = make();
      const buf = await Packer.toBuffer(doc);
      fs.writeFileSync(file, buf);
      console.log("OK", file, (buf.length / 1024).toFixed(0) + " KB");
    }
  })().catch((e) => { console.error(e); process.exit(1); });
}
