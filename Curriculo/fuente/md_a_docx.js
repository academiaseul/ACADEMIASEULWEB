// md_a_docx.js · Markdown -> Word (docx) con el estilo de la casa de Academia Seúl.
// Compila un curso del currículo en dos documentos (carpeta, portadas y nombres de salida en CURSOS, al final):
//   a) Guía del profesor: portada + índice + 00_Diseno_<Curso>.md + profes/S01…S08 (cada archivo en página nueva)
//      (con guia.disenoAlFinal el diseño va al final, como anexo, después de las 8 guías)
//   b) Cuaderno del alumno: portada + índice + alumnos/S01…S08 (nada del material del profesor)
// Cursos:
//   basico1 (por defecto) -> Curriculo/Fase2_Basico1/Guia_Profesor_Basico1_Octubre_2026.docx
//                            Curriculo/Fase2_Basico1/Cuaderno_Alumno_Basico1_Octubre_2026.docx
//   basico2               -> Curriculo/Fase3_Basico2/Guia_Profesor_Basico2_Octubre_2026.docx
//                            Curriculo/Fase3_Basico2/Cuaderno_Alumno_Basico2_Octubre_2026.docx
//   conversacional1       -> Curriculo/Fase4_Conversacional1/Guia_Profesora_Conversacional1_Octubre_2026.docx
//                            Curriculo/Fase4_Conversacional1/Cuaderno_Alumno_Conversacional1_Octubre_2026.docx
//      (guías en coreano para Abby: profes/S0N_Guia_Profesora.md, índice y pie en coreano, diseño en español como anexo)
//   topik2                -> Curriculo/Fase6_TOPIK2/Guia_Profesor_TOPIK2_Octubre_2026.docx
//                            Curriculo/Fase6_TOPIK2/Cuaderno_Alumno_TOPIK2_Octubre_2026.docx  (cuaderno de estrategia)
//   ninos                 -> Curriculo/Fase7_Ninos/Guia_Profesores_Ninos_Octubre_2026.docx  (profes/S0N_Guia_Profesores.md)
//                            Curriculo/Fase7_Ninos/Cuaderno_Actividades_Ninos_Octubre_2026.docx
//      (cuaderno de los niños con letra más grande y grillas para escribir y dibujar: cuaderno.estilo)
//
// Markdown soportado: # a #### (títulos azul #4236F6 / navy #003478), párrafos (los saltos de línea
// simples se respetan), **negrita**, *cursiva*, ***ambas***, ~~tachado~~, <u>subrayado</u>, `código` (como
// texto normal), [links](url), <br>, <sub>romanización</sub> (gris y pequeña), \escapes, listas con viñeta,
// numeradas y de casillas (- [ ]) con anidación simple y líneas de continuación "perezosas" (con 1 espacio,
// pegadas al ítem: las opciones " ① … ② …" de TOPIK II), tablas (cabecera navy con texto blanco, filas cebra,
// bordes grises; una tabla con cabecera vacía se dibuja como tabla etiqueta | valor; un | dentro de `código`
// no parte la celda; también sangradas dentro de un ítem de lista), citas (>) como recuadro azul claro
// (también sangradas dentro de un ítem de lista), bloques ``` como recuadro gris y separadores (---).
// El * de forma incorrecta pegado a una palabra (먹았어요*, 안 운동해요*) queda literal: un * solo abre
// cursiva si es "left-flanking" (CommonMark).
// Estilo: US Letter, Arial 10,5 pt (Malgun Gothic para el hangul), márgenes 0,9", encabezado con el
// título del documento, pie con www.academiaseul.com y número de página, logo azul en la portada.
// Cada documento puede cambiar los tamaños con guia.estilo / cuaderno.estilo (ver ESTILO_BASE). Nunca rojo.
//
// Uso: cd <scratchpad> && node curriculo/md_a_docx.js [basico1|basico2|conversacional1|topik2|ninos|todos]
//   (sin argumento se usa la variable de entorno AS_CURSO y, si no está, basico1: el comportamiento de siempre).
//   AS_OUT_DIR=<carpeta> escribe los .docx ahí en vez de en la carpeta del curso (útil para comparar versiones).
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
  InternalHyperlink, ExternalHyperlink, LineRuleType, TableLayoutType,
} = docx;

const REPO = "C:\\Users\\Chingu\\Desktop\\ACADEMIASEULWEB";
const CURRICULO = path.join(REPO, "Curriculo");

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
const BODY = 21;                            // 10,5 pt (portadas e índice; el cuerpo usa EST.cuerpo)
// Tamaños (medios puntos) del cuerpo de cada documento. Por defecto, los de siempre (Básico 1 y 2, Conversacional 1,
// TOPIK II); un documento los cambia con guia.estilo / cuaderno.estilo (p. ej. el cuaderno de Niños, con letra más grande).
const ESTILO_BASE = {
  cuerpo: 21,                               // párrafos y listas (10,5 pt)
  recuadro: 20,                             // texto dentro de citas (>)
  codigo: 18,                               // bloques ```
  tabla: [18, 17, 16, 15],                  // tablas de ≤4, ≤7, ≤10 y más columnas
  titulos: { 1: 32, 2: 26, 3: 23, 4: 21 },  // # a ####
  filaVacia: 460,                           // alto mínimo (twips) de una fila de tabla vacía, para escribir
  filaParaEscribir: 0,                      // alto mínimo de una fila con alguna celda vacía (0 = sin mínimo)
  grillas: false,                           // tabla sin cabecera de 1 o de 3+ columnas = grilla (sin columna etiqueta
                                            // ni cebra; centrada si las celdas son cortas), no tabla etiqueta | valor;
  cuadro: 2160,                             // con grillas, la de 1 columna es un cuadro para dibujar de este alto mínimo
  tablasAnchas: false,                      // planillas de 8+ columnas que no caben: letra más chica y ancho fijo (renderTable)
};
let EST = ESTILO_BASE;
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

// CommonMark: un * solo abre cursiva si es "left-flanking": lo que sigue no es espacio y, si es puntuación,
// lo que va antes es espacio, puntuación o el inicio. Así el asterisco de forma incorrecta de los ejemplos
// ("nunca 안 운동해요*)", "nunca 안 알아요*") queda literal en vez de abrir una cursiva hasta el siguiente *.
const RE_PUNCT = /[\p{P}\p{S}]/u;
function leftFlanking(src, k) {
  const nx = src[k + 1], pv = k > 0 ? src[k - 1] : " ";
  if (!nx || /\s/.test(nx)) return false;
  return !RE_PUNCT.test(nx) || /\s/.test(pv) || RE_PUNCT.test(pv);
}

// Un * pegado al final de una palabra ("안 잘해요*는 꼭 교정 … · *참고: …*") no abre cursiva si el siguiente * suelto
// va después de un espacio (solo puede abrir): como en CommonMark, el cierre se empareja con ese * y no con este,
// que queda literal (es la marca de forma incorrecta). Un * intrapalabra con su cierre ("버스*보다*") sigue abriendo.
const intraPalabra = (src, k) => k > 0 && /[\p{L}\p{N}]/u.test(src[k - 1]);
function otroAbreAntes(src, from) {
  for (let p = from; p < src.length; p++) {
    if (src[p] === "`") { const e = src.indexOf("`", p + 1); if (e > p) { p = e; continue; } }
    if (src[p] === "*" && src[p + 1] === "*") { p++; continue; }
    if (src[p] === "*") {
      if (src[p - 1] !== " ") return false;                  // puede cerrar: es el cierre de este *
      if (src[p + 1] && src[p + 1] !== " ") return true;     // después de un espacio: solo puede abrir
    }
  }
  return false;
}

// Devuelve segmentos { t, b, i, s, sub, href } (con u: true si va subrayado) o { br: true }.
function parseInline(src) {
  src = src.split(/(`[^`]*`)/).map((p, k) => (k % 2 ? p : curly(p))).join("");
  const out = [];
  let b = false, i = false, s = false, sub = false, u = false, buf = "";
  const flush = () => { if (buf) { const sg = { t: buf, b, i, s, sub }; if (u) sg.u = true; out.push(sg); buf = ""; } };
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
      // <u>…</u>: subrayado (TOPIK II: "밑줄 친 부분", la parte subrayada de la pregunta).
      if (/^<u>/i.test(rest)) { flush(); u = true; k += 3; continue; }
      if (/^<\/u>/i.test(rest)) { flush(); u = false; k += 4; continue; }
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
      // "**…추워지만***": dentro de una negrita sin cursiva, el primer * es literal y los dos últimos la cierran.
      if (b && !i && src[k + 2] === "*" && src[k + 3] !== "*") { buf += "*"; flush(); b = false; k += 3; continue; }
      if (b) { flush(); b = false; k += 2; continue; }
      const nx = src[k + 2];
      if (nx && nx !== " " && src.indexOf("**", k + 2) > 0) { flush(); b = true; k += 2; continue; }
      buf += "**"; k += 2; continue;
    }
    if (c === "*") {
      if (i && src[k - 1] !== " ") { flush(); i = false; k++; continue; }
      const nx = src[k + 1];
      if (!i && nx && nx !== " " && leftFlanking(src, k) && hasClosingStar(src, k + 1) && !(intraPalabra(src, k) && otroAbreAntes(src, k + 1))) { flush(); i = true; k++; continue; }
      buf += "*"; k++; continue;
    }
    if (c === "[") {
      const m = /^\[([^\]]+)\]\(([^)\s]+)\)/.exec(src.slice(k));
      if (m) { flush(); const sg = { t: m[1], b, i, s, sub, href: m[2] }; if (u) sg.u = true; out.push(sg); k += m[0].length; continue; }
    }
    buf += c; k++;
  }
  flush();
  out.state = { b, i, s, sub, u };
  return out;
}

const plain = (src) => parseInline(src).map((sg) => (sg.br ? " " : sg.t)).join("").replace(/\s+/g, " ").trim();

// Segmentos -> TextRun / ExternalHyperlink. base: { size, color, bold, italics, font }
function toRuns(segs, base = {}) {
  const size = base.size || EST.cuerpo;
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
    if (sg.u) o.underline = {};
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
    // Un `código` con | adentro (p. ej. `revHint || rom`) no parte la celda.
    if (t[k] === "`") { const e = t.indexOf("`", k + 1); if (e > k) { cur += t.slice(k, e + 1); k = e; continue; } }
    if (t[k] === "|") { cells.push(cur.trim()); cur = ""; continue; }
    cur += t[k];
  }
  cells.push(cur.trim());
  return cells;
}

// opts.perezosas: acepta líneas de continuación "perezosas" en los ítems de lista (ver más abajo). Solo lo activan los
// cursos con cfg.perezosas (TOPIK II y Niños): en Básico 1 y 2 y Conversacional 1 cambiaría ~12 párrafos ya revisados.
function parseBlocks(lines, opts = {}) {
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

  // Tabla que empieza en lines[start] (cabecera + separador + filas); sirve también para una tabla sangrada dentro de un ítem.
  function readTable(start) {
    const header = splitRow(lines[start]);
    const align = splitRow(lines[start + 1]).map((c) => (/^:-+:$/.test(c) ? "center" : /-:$/.test(c) ? "right" : "left"));
    const rows = [];
    let j = start + 2;
    while (j < n && /^\s*\|/.test(lines[j])) { rows.push(splitRow(lines[j])); j++; }
    return { block: { type: "table", header, align, rows }, next: j };
  }

  while (i < n) {
    const l = lines[i];
    if (isBlank(l)) { i++; continue; }
    if (RE_FENCE.test(l)) { const r = readFence(i); r.block.indent = indentOf(l); blocks.push(r.block); i = r.next; continue; }
    let m = RE_HEAD.exec(l);
    if (m && indentOf(l) < 4) { blocks.push({ type: "h", level: m[1].length, text: m[2] }); i++; continue; }
    if (RE_HR.test(l)) { blocks.push({ type: "hr" }); i++; continue; }
    if (isTableStart(l, lines[i + 1])) { const r = readTable(i); blocks.push(r.block); i = r.next; continue; }
    if (RE_QUOTE.test(l)) {
      const inner = [];
      while (i < n && RE_QUOTE.test(lines[i])) { inner.push(lines[i].replace(/^\s{0,3}> ?/, "")); i++; }
      blocks.push({ type: "quote", blocks: parseBlocks(inner, opts) });
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
        // Sangrada como el texto del ítem, o "perezosa" (CommonMark): con menos sangría pero pegada al ítem, sin línea
        // en blanco entre medio, como las opciones " ① 있어서 ② 있으니까 …" bajo cada pregunta de TOPIK II.
        const sangria = indentOf(c) >= Math.max(2, ind + 2);
        const perezosa = !!opts.perezosas && !sangria && indentOf(c) >= 1 && !isBlank(lines[i - 1]);
        if ((sangria || perezosa) && !RE_LI.test(c)) {
          const minInd = sangria ? Math.max(2, ind + 2) : 1;
          if (RE_FENCE.test(c)) { const r = readFence(i); item.children.push(r.block); i = r.next; continue; }
          // Tabla sangrada dentro del ítem ("  | Palabra | Acción |"): tabla con la sangría del ítem.
          if (isTableStart(c, lines[i + 1])) { const r = readTable(i); item.children.push(r.block); i = r.next; continue; }
          // Cita sangrada dentro del ítem ("   > 수요일 밤 아홉 시에…"): recuadro azul con la sangría del ítem.
          if (/^\s*>/.test(c)) {
            const inner = [];
            while (i < n && /^\s*>/.test(lines[i]) && indentOf(lines[i]) >= minInd) { inner.push(lines[i].replace(/^\s*> ?/, "")); i++; }
            item.children.push({ type: "quote", blocks: parseBlocks(inner, opts) });
            continue;
          }
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

// Color y espacios de cada nivel; el tamaño sale de EST.titulos (headSize).
const HEAD_STYLE = {
  1: { color: AZUL, before: 0, after: 140 },
  2: { color: AZUL, before: 280, after: 100 },
  3: { color: NAVY, before: 200, after: 80 },
  4: { color: NAVY, before: 160, after: 60 },
};
const headSize = (lv) => EST.titulos[lv];
const HEADING_LEVEL = { 1: HeadingLevel.HEADING_1, 2: HeadingLevel.HEADING_2, 3: HeadingLevel.HEADING_3, 4: HeadingLevel.HEADING_4 };

function heading(level, text, opts = {}) {
  const lv = Math.min(level, 4);
  const st = HEAD_STYLE[lv];
  const size = headSize(lv);
  let children = inlineRuns(text, { size, color: st.color, bold: true, subColor: st.color, linkColor: st.color });
  if (opts.bookmark) children = [new Bookmark({ id: opts.bookmark, children })];
  const p = {
    heading: HEADING_LEVEL[lv], children, keepNext: true, keepLines: true,
    spacing: { before: opts.pageBreak ? 0 : st.before, after: st.after, ...ls(size) },
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
  const size = EST.codigo;
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

function quoteBox(innerBlocks, width, indent = 0) {
  const w = width - indent;
  const innerW = w - 170 - 150 - 40;
  let paras = renderBlocks(innerBlocks, { width: innerW, inBox: true });
  if (!paras.length || paras[paras.length - 1] instanceof Table) paras.push(new Paragraph({ children: [], spacing: { after: 0 } }));
  const left = { style: BorderStyle.SINGLE, size: 24, color: AZUL };
  return boxTable(paras, w, {
    fill: QUOTE_FILL, borders: { top: none, bottom: none, left, right: none, insideHorizontal: none, insideVertical: none },
    margins: { top: 100, bottom: 100, left: 170, right: 150 }, indent,
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

// pad: márgenes de la celda + holgura (twips). Devuelve los anchos y, en w.sMin, la suma de los mínimos (la palabra más larga
// de cada columna): si pasa de W, Word estira la tabla más allá del margen.
function autoWidths(allRows, W, size, headerRow, pad = 200) {
  const ncol = allRows[0].length;
  const cw = 5 * size;               // ancho medio de un carácter en twips (≈ 0,5 em)
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
  w.sMin = sMin;
  return w;
}

// indent (twips): tabla sangrada dentro de un ítem de lista; W es entonces el ancho que queda.
function renderTable(tb, W, indent = 0) {
  const ncol = Math.max(tb.header.length, ...tb.rows.map((r) => r.length));
  const pad = (r) => { const x = r.slice(0, ncol); while (x.length < ncol) x.push(""); return x; };
  const header = pad(tb.header);
  const rows = tb.rows.map(pad);
  const headerEmpty = header.every((h) => !h.trim());
  // Con EST.grillas, una tabla sin cabecera de 1 o de 3+ columnas es una grilla (letras, cartón de bingo, cuadro para
  // dibujar): sin columna etiqueta ni cebra. Con 2 columnas sigue siendo etiqueta | valor.
  const grilla = headerEmpty && EST.grillas && ncol !== 2;
  const kvTabla = headerEmpty && !grilla;
  let size = EST.tabla[ncol <= 4 ? 0 : ncol <= 7 ? 1 : ncol <= 10 ? 2 : 3];
  const all = headerEmpty ? rows : [header, ...rows];
  if (!all.length) return null;
  let widths = autoWidths(all, W, size, !headerEmpty);
  // Planilla de 8+ columnas que no cabe (EST.tablasAnchas): letra más chica (mínimo 6,5 pt), márgenes de celda angostos y
  // ancho fijo, para que Word no la estire más allá del margen derecho (las palabras muy largas se parten dentro de la celda).
  const apretada = EST.tablasAnchas && ncol >= 8 && widths.sMin > W;
  if (apretada) {
    size = Math.max(13, Math.floor(size * W / widths.sMin));
    widths = autoWidths(all, W, size, !headerEmpty, 110);
  }
  const mCelda = apretada ? 40 : 90;
  const centrar = grilla && all.every((r) => r.every((x) => plain(x).length <= 14));
  const align = (c) => (centrar ? AlignmentType.CENTER : ({ center: AlignmentType.CENTER, right: AlignmentType.RIGHT }[tb.align[c]] || AlignmentType.LEFT));

  const cellParas = (text, c, base) => {
    const lines = splitBr(parseInline(text));
    return lines.map((segs, li) => new Paragraph({
      children: toRuns(segs, base), alignment: align(c),
      spacing: { after: li === lines.length - 1 ? 0 : 30, ...ls(base.size || EST.cuerpo) },
    }));
  };
  const mk = (children, c, extra = {}) => new TableCell(Object.assign({
    children, width: { size: widths[c], type: WidthType.DXA },
    margins: { top: 45, bottom: 45, left: mCelda, right: mCelda },
  }, extra));

  // Grilla de 1 columna = cuadro para dibujar o escribir ("| *(dibujo)* |", o varias filas vacías): una sola celda alta,
  // sin rayas entre filas; cada fila del Markdown suma EST.filaVacia de alto, con un mínimo de EST.cuadro.
  if (grilla && ncol === 1) {
    const texto = rows.map((r) => r[0]).filter((x) => x.trim()).join("<br>");
    const cell = mk(cellParas(texto, 0, { size }), 0, { verticalAlign: VerticalAlign.CENTER });
    const t = { width: { size: W, type: WidthType.DXA }, columnWidths: [W], borders: allThin,
      rows: [new TableRow({ cantSplit: true, height: { value: Math.max(EST.cuadro, rows.length * EST.filaVacia), rule: HeightRule.ATLEAST }, children: [cell] })] };
    if (indent) t.indent = { size: indent, type: WidthType.DXA };
    return new Table(t);
  }

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
      const kv = kvTabla && c === 0;
      const base = kv ? { size, bold: true, color: NAVY } : { size };
      const fill = kv ? TINT : (ri % 2 === 1 && !grilla ? ZEBRA : null);
      const extra = { verticalAlign: longRow ? VerticalAlign.TOP : VerticalAlign.CENTER };
      if (fill) extra.shading = { type: ShadingType.CLEAR, fill };
      return mk(cellParas(x, c, base), c, extra);
    }) };
    if (empty) rowOpts.height = { value: EST.filaVacia, rule: HeightRule.ATLEAST };
    else if (EST.filaParaEscribir && r.some((x) => !x.trim())) rowOpts.height = { value: EST.filaParaEscribir, rule: HeightRule.ATLEAST };
    out.push(new TableRow(rowOpts));
  });
  const t = { width: { size: W, type: WidthType.DXA }, columnWidths: widths, borders: allThin, rows: out };
  if (indent) t.indent = { size: indent, type: WidthType.DXA };
  if (apretada) t.layout = TableLayoutType.FIXED;
  return new Table(t);
}

// Espacio chico después de una tabla o un recuadro, para que el texto siguiente no quede pegado.
const gap = (after = 100) => new Paragraph({ children: [], spacing: { before: 0, after, line: 200 } });

function renderList(items, ctx) {
  const out = [];
  items.forEach((it, idx) => {
    const lv = it.indent === 0 ? 0 : it.indent <= 4 ? 1 : 2;
    const last = idx === items.length - 1;
    const after = last && !it.children.length ? 120 : 40;
    const size = ctx.inBox ? EST.recuadro : EST.cuerpo;
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
      } else if (ch.type === "quote") {
        out.push(quoteBox(ch.blocks, ctx.width || CONTENT_W, Math.min(textLeft, 720)));
        out.push(gap(lastCh ? 100 : 40));
      } else if (ch.type === "table") {
        const ind = Math.min(textLeft, 720);
        const t = renderTable(ch, (ctx.width || CONTENT_W) - ind, ind);
        if (t) { out.push(t); out.push(gap(lastCh ? 120 : 40)); }
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
        const size = ctx.inBox ? EST.recuadro : EST.cuerpo;
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
function loadMd(file, opts) {
  const md = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n");
  return parseBlocks(md.split("\n"), opts);
}

// Un archivo = una parte del documento: su primer # abre página nueva y lleva un marcador para el índice.
// rotulo (opcional, lista de TextRun): una línea chica sobre el # (p. ej. "부록 · Anexo") que abre la página y lleva el marcador.
function renderFile(blocks, id, withH2Marks, rotulo) {
  let first = true;
  let h2n = 0;
  const marks = [];
  const els = renderBlocks(blocks, {
    width: CONTENT_W,
    headingOpts: (bl) => {
      if (bl.level === 1 && first) { first = false; return rotulo ? {} : { pageBreak: true, bookmark: id }; }
      if (bl.level === 2 && withH2Marks) { const bm = id + "_" + (++h2n); marks.push({ id: bm, text: plain(bl.text) }); return { bookmark: bm }; }
      return {};
    },
  });
  if (rotulo) els.unshift(new Paragraph({ pageBreakBefore: true, keepNext: true, children: [new Bookmark({ id, children: rotulo })], spacing: { before: 0, after: 120, ...ls(19) } }));
  else if (first) els.unshift(new Paragraph({ pageBreakBefore: true, children: [new Bookmark({ id, children: [] })], spacing: { after: 0 } }));
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

const NOTA_INDICE = "Cada parte empieza en una página nueva. En Word, los títulos del índice son vínculos (Ctrl + clic) y el panel de navegación (Vista → Panel de navegación) muestra todos los títulos.";

function indice(titulo, entradas, nota = NOTA_INDICE) {
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
  ch.push(new Paragraph({ spacing: { before: 280 }, children: [r(nota, { size: 18, color: GREY, italics: true })] }));
  return ch;
}

// pagina: texto del número de página en el pie ("Página 3 de 120" por defecto).
const PAGINA_ES = (cur, tot) => ["Página ", cur, " de ", tot];

function documento({ titulo, descripcion, children, pagina = PAGINA_ES }) {
  const small = { size: 16, color: GREY };
  return new Document({
    creator: "Academia Seúl",
    title: titulo,
    description: descripcion,
    numbering: NUMBERING,
    styles: {
      default: { document: { run: { font: FONT, size: EST.cuerpo, color: INK }, paragraph: { spacing: { after: 100, ...ls(EST.cuerpo) } } } },
      paragraphStyles: [1, 2, 3, 4].map((lv) => ({
        id: "Heading" + lv, name: "Heading " + lv, basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { font: FONT, size: headSize(lv), bold: true, color: HEAD_STYLE[lv].color },
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
          new TextRun({ children: pagina(PageNumber.CURRENT, PageNumber.TOTAL_PAGES), font: FONT, size: 16, color: GREY }),
        ] })] }),
      },
      children,
    }],
  });
}

const SEMANAS = [1, 2, 3, 4, 5, 6, 7, 8];
const firstH1 = (blocks) => { const h = blocks.find((x) => x.type === "h" && x.level === 1); return h ? plain(h.text) : ""; };

// ============================ CURSOS ============================
// Todo lo que cambia de un curso a otro: carpeta, archivo de diseño, prefijo que se quita de los títulos de las
// guías en el índice, títulos (encabezado y propiedades del .docx), portadas y nombres de salida.
// Para sumar un curso: copiar un bloque, cambiar sus datos y compilar con  node md_a_docx.js <clave>.
// portada() devuelve [líneas centradas, caja azul (lista de párrafos), pie] para portada().
// Opcionales (si faltan, todo queda como en Básico 1 y 2):
//   guiaMd            nombre de las guías: profes/S0N_<guiaMd>.md (por defecto "Guia_Profesor")
//   guia.disenoAlFinal  el diseño va al final, como anexo, después de las guías (por defecto va primero)
//   guia.rotuloDiseno() línea chica sobre el título del diseño cuando va como anexo (lista de TextRun)
//   guia.indice / cuaderno.indice  textos del índice: titulo, nota, semana(n), quitarSemana, disenoNum, disenoTexto
//   guia.pagina / cuaderno.pagina  (cur, tot) => partes del número de página del pie
//   guia.estilo / cuaderno.estilo  tamaños del cuerpo que cambian respecto de ESTILO_BASE (letra, títulos, tablas, grillas)
//   perezosas         acepta líneas de continuación "perezosas" en las listas (1 espacio, pegadas al ítem; ver parseBlocks)
const CURSOS = {
  basico1: {
    carpeta: "Fase2_Basico1",
    diseno: "00_Diseno_Basico1.md",
    prefijo: /^Básico 1 \(A1\.1\) · /,
    guia: {
      salida: "Guia_Profesor_Basico1_Octubre_2026.docx",
      titulo: "Básico 1 (A1.1) · Guía del profesor · Cohorte octubre 2026",
      descripcion: "Básico 1 (A1.1) · diseño del curso y guías de la profesora, semanas 1 a 8 · cohorte octubre 2026",
      portada: () => [[
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
      ]],
    },
    cuaderno: {
      salida: "Cuaderno_Alumno_Basico1_Octubre_2026.docx",
      titulo: "Básico 1 (A1.1) · Cuaderno del alumno · Cohorte octubre 2026",
      descripcion: "Básico 1 (A1.1) · Primeras Palabras · 첫 한국어 · material del alumno, semanas 1 a 8 · cohorte octubre 2026",
      portada: () => [[
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
      ]],
    },
  },

  basico2: {
    carpeta: "Fase3_Basico2",
    diseno: "00_Diseno_Basico2.md",
    prefijo: /^Básico 2 \(A1\.2\) · /,
    guia: {
      salida: "Guia_Profesor_Basico2_Octubre_2026.docx",
      titulo: "Básico 2 (A1.2) · Guía del profesor · Cohorte octubre 2026",
      descripcion: "Básico 2 (A1.2) · Pasado, presente y futuro · diseño del curso y guías del profesor (Jay), semanas 1 a 8 · cohorte octubre 2026",
      portada: () => [[
        centro([r("기초 한국어 2 · Pasado, presente y futuro", { bold: true, size: 30, color: AZUL })], 120, 80),
        centro([r("Básico 2 (A1.2)", { bold: true, size: 60 })], 0, 60),
        centro([r("Guía del profesor", { bold: true, size: 44, color: AZUL })], 0, 160),
        centro([r("Cohorte octubre 2026 · Profesor: Jay (김재희)", { size: 26, color: NAVY, bold: true })], 0, 80),
        centro([r("Sección única: miércoles 21:00–22:00, hora de Chile (jueves 09:00 en Corea) · 8 semanas por Zoom", { size: 21, color: GREY })], 0, 60),
      ], [
        [r("Material del profesor", { bold: true, size: 22, color: NAVY })],
        [r("Diseño del curso + guías de clase de las semanas 1 a 8: plan minuto a minuto, explicaciones desde el español, diagnóstico, claves, rúbricas y notas.", { size: 20 })],
        [r("No se comparte con los alumnos: su material va en el Cuaderno del alumno.", { size: 20, bold: true, color: AZUL })],
      ], [
        centro([r(WEB + " · WhatsApp " + WA + " · @academiaseul", { size: 19, color: GREY })], 120, 60),
        centro([r("Versión del 26 de septiembre de 2026 · compilada desde Curriculo/Fase3_Basico2 (00_Diseno_Basico2.md y profes/S01–S08)", { size: 16, color: GREY, italics: true })], 80, 0),
      ]],
    },
    cuaderno: {
      salida: "Cuaderno_Alumno_Basico2_Octubre_2026.docx",
      titulo: "Básico 2 (A1.2) · Cuaderno del alumno · Cohorte octubre 2026",
      descripcion: "Básico 2 (A1.2) · Pasado, presente y futuro · 기초 한국어 2 · material del alumno, semanas 1 a 8 · cohorte octubre 2026",
      portada: () => [[
        centro([r("Básico 2 (A1.2)", { bold: true, size: 60 })], 120, 60),
        centro([r("Pasado, presente y futuro · 기초 한국어 2", { bold: true, size: 36, color: AZUL })], 0, 160),
        centro([r("Cuaderno del alumno", { bold: true, size: 44, color: NAVY })], 0, 160),
        centro([r("Cohorte octubre 2026 · con Jay (김재희 선생님) · miércoles 21:00, hora de Chile", { size: 22, color: GREY })], 0, 360),
        centro([r("Nombre: ______________________________", { size: 22 })], 0, 60),
      ], [
        [r("8 semanas para contar tu vida en coreano: lo que hiciste, lo que haces y lo que vas a hacer.", { bold: true, size: 22, color: NAVY })],
        [r("Cada semana: lo que vas a poder decir, vocabulario, gramática, cómo suena, diálogo, ejercicios, tarjeta de sala, nota cultural y tarea.", { size: 20 })],
        [r("Sin romanización: la pronunciación va en 한글 entre corchetes, 먹었어요 [머거써요].", { size: 20 })],
      ], [
        centro([r(WEB + " · WhatsApp " + WA + " · @academiaseul", { size: 19, color: GREY })], 120, 60),
        centro([r("화이팅!", { bold: true, size: 26, color: AZUL })], 60, 0),
      ]],
    },
  },

  // Guías en coreano para Abby (홍미영): portada, índice y pie en coreano; el diseño (en español, para Jay) va al final como anexo.
  conversacional1: {
    carpeta: "Fase4_Conversacional1",
    diseno: "00_Diseno_Conversacional1.md",
    guiaMd: "Guia_Profesora",
    prefijo: /^회화 1 \(A2\.1\) · /,
    guia: {
      salida: "Guia_Profesora_Conversacional1_Octubre_2026.docx",
      titulo: "회화 A2.1 · Conversacional 1 · 교사용 가이드 · 2026년 10월",
      descripcion: "Conversacional 1 (A2.1) · Corea que amas · 회화 A2.1 · 교사용 가이드 (홍미영 · Abby), 1~8주차 + 부록: 코스 설계 문서 (스페인어) · cohorte octubre 2026",
      disenoAlFinal: true,
      rotuloDiseno: () => [
        r("부록 · Anexo", { bold: true, size: 19, color: AZUL }),
        r("   코스 설계 문서 (스페인어, Jay용) · Diseño del curso, en español", { size: 19, color: GREY }),
      ],
      indice: {
        titulo: "목차",
        nota: "각 부분은 새 페이지에서 시작해요. Word에서 목차 제목은 링크예요 (Ctrl + 클릭). 보기 → 탐색 창을 켜면 모든 제목이 보여요. 부록(코스 설계 문서)은 Jay용으로 스페인어로 되어 있어요.",
        semana: (n) => n + "주차",
        quitarSemana: /^\d+주차 · /,
        disenoNum: "부록",
        disenoTexto: "코스 설계 문서 · Diseño del curso (en español, para Jay)",
      },
      pagina: (cur, tot) => [cur, " / ", tot],
      portada: () => [[
        centro([r("회화 A2.1", { bold: true, size: 30, color: AZUL })], 120, 80),
        centro([r("Conversacional 1", { bold: true, size: 60 })], 0, 60),
        centro([r("교사용 가이드", { bold: true, size: 44, color: AZUL })], 0, 160),
        centro([r("2026년 10월 · 홍미영 (Abby)", { size: 26, color: NAVY, bold: true })], 0, 80),
        centro([r("매주 수요일 09:00–10:00 (한국 시간) = 칠레 화요일 21:00 · 10월 14일 ~ 12월 2일 · Zoom 8주", { size: 21, color: GREY })], 0, 60),
      ], [
        [r("교사용 자료", { bold: true, size: 22, color: NAVY })],
        [r("1~8주차 수업 가이드: 한눈에 보기, 주차 개요, 분 단위 수업 계획, 교사 가이드 (정답·루브릭·진단표), 원어민 검토 사항.", { size: 20 })],
        [r("부록: 코스 설계 문서 (스페인어, Jay용).", { size: 20 })],
        [r("학생들에게는 공유하지 않아요. 학생 자료는 학생용 워크북 (Cuaderno del alumno)에 따로 있어요.", { size: 20, bold: true, color: AZUL })],
      ], [
        centro([r(WEB + " · WhatsApp " + WA + " · @academiaseul", { size: 19, color: GREY })], 120, 60),
        centro([r("2026년 9월 26일 버전 · Curriculo/Fase4_Conversacional1 (profes/S01–S08 + 부록 00_Diseno_Conversacional1.md)에서 컴파일", { size: 16, color: GREY, italics: true })], 80, 0),
      ]],
    },
    cuaderno: {
      salida: "Cuaderno_Alumno_Conversacional1_Octubre_2026.docx",
      titulo: "Conversacional 1 (A2.1) · Cuaderno del alumno · Cohorte octubre 2026",
      descripcion: "Conversacional 1 (A2.1) · Corea que amas · 회화 A2.1 · material del alumno, semanas 1 a 8 · cohorte octubre 2026",
      portada: () => [[
        centro([r("Conversacional 1 (A2.1)", { bold: true, size: 60 })], 120, 60),
        centro([r("Corea que amas · 회화 A2.1", { bold: true, size: 36, color: AZUL })], 0, 160),
        centro([r("Cuaderno del alumno", { bold: true, size: 44, color: NAVY })], 0, 160),
        centro([r("Cohorte octubre 2026 · con Abby (홍미영 선생님) · martes 21:00, hora de Chile", { size: 22, color: GREY })], 0, 360),
        centro([r("Nombre: ______________________________", { size: 22 })], 0, 60),
      ], [
        [r("8 semanas para conversar en coreano sobre la Corea que amas: K-pop, viajes, comida, 한복 y PC방.", { bold: true, size: 22, color: NAVY })],
        [r("Cada semana: lo que vas a poder decir, vocabulario, gramática, cómo suena, diálogo, ejercicios, tarjeta de sala y guion del role play, nota cultural y tarea.", { size: 20 })],
        [r("La clase es en coreano; el español vive aquí. Sin romanización: la pronunciación va en 한글 entre corchetes, 한라산 [할라산].", { size: 20 })],
      ], [
        centro([r(WEB + " · WhatsApp " + WA + " · @academiaseul", { size: 19, color: GREY })], 120, 60),
        centro([r("화이팅!", { bold: true, size: 26, color: AZUL })], 60, 0),
      ]],
    },
  },

  // Guías en español para Jay; el cuaderno de estrategia lleva <u>subrayados</u> (밑줄 친 부분) y opciones ① ② ③ ④ con 1 espacio.
  topik2: {
    carpeta: "Fase6_TOPIK2",
    diseno: "00_Diseno_TOPIK2.md",
    prefijo: /^TOPIK II \(B1\+\) · /,
    perezosas: true,
    guia: {
      salida: "Guia_Profesor_TOPIK2_Octubre_2026.docx",
      titulo: "TOPIK II (B1+) · Guía del profesor · Cohorte octubre 2026",
      descripcion: "TOPIK II (B1+) · Estrategia de examen · 토픽 II 준비반 · diseño del curso y guías del profesor (Jay), semanas 1 a 8 · cohorte octubre 2026",
      estilo: { tablasAnchas: true },   // planillas de 14 a 22 columnas (S1–S8) dentro del margen
      portada: () => [[
        centro([r("토픽 II 준비반 · Estrategia de examen", { bold: true, size: 30, color: AZUL })], 120, 80),
        centro([r("TOPIK II (B1+)", { bold: true, size: 60 })], 0, 60),
        centro([r("Guía del profesor", { bold: true, size: 44, color: AZUL })], 0, 160),
        centro([r("Cohorte octubre 2026 · Profesor: Jay (김재희)", { size: 26, color: NAVY, bold: true })], 0, 80),
        centro([r("Sección única: jueves 21:00–22:00, hora de Chile (viernes 09:00 en Corea) · 15 de octubre al 3 de diciembre · 8 semanas por Zoom · máximo 8 alumnos", { size: 21, color: GREY })], 0, 60),
      ], [
        [r("Material del profesor", { bold: true, size: 22, color: NAVY })],
        [r("Diseño del curso + guías de clase de las semanas 1 a 8: plan minuto a minuto, estrategia explicada desde el español, claves del Banco Chingu, criterios de corrección de 쓰기 51–54, plantillas y notas.", { size: 20 })],
        [r("Los exámenes oficiales se citan por edición, sección e ítems: no se copian. Fechas y sedes del examen real: confirmar en topik.go.kr.", { size: 20 })],
        [r("No se comparte con los alumnos: su material va en el Cuaderno de estrategia.", { size: 20, bold: true, color: AZUL })],
      ], [
        centro([r(WEB + " · WhatsApp " + WA + " · @academiaseul", { size: 19, color: GREY })], 120, 60),
        centro([r("Versión del 27 de septiembre de 2026 · compilada desde Curriculo/Fase6_TOPIK2 (00_Diseno_TOPIK2.md y profes/S01–S08)", { size: 16, color: GREY, italics: true })], 80, 0),
      ]],
    },
    cuaderno: {
      salida: "Cuaderno_Alumno_TOPIK2_Octubre_2026.docx",
      titulo: "TOPIK II (B1+) · Cuaderno de estrategia · Cohorte octubre 2026",
      descripcion: "TOPIK II (B1+) · Estrategia de examen · 토픽 II 준비반 · cuaderno de estrategia del alumno, semanas 1 a 8 · cohorte octubre 2026",
      estilo: { tablasAnchas: true },
      portada: () => [[
        centro([r("TOPIK II (B1+)", { bold: true, size: 60 })], 120, 60),
        centro([r("Estrategia de examen · 토픽 II 준비반", { bold: true, size: 36, color: AZUL })], 0, 160),
        centro([r("Cuaderno de estrategia", { bold: true, size: 44, color: NAVY })], 0, 160),
        centro([r("Cohorte octubre 2026 · con Jay (김재희 선생님) · jueves 21:00, hora de Chile", { size: 22, color: GREY })], 0, 360),
        centro([r("Nombre: ______________________________     Mi meta: ______급", { size: 22 })], 0, 60),
      ], [
        [r("8 semanas para entrar al TOPIK II con estrategia: conocer el examen por dentro, manejar el tiempo y escribir el 51, el 52, el 53 y el 54.", { bold: true, size: 22, color: NAVY })],
        [r("Cada semana: lo que vas a poder decir y hacer, vocabulario, gramática y estrategia, cómo suena, texto modelo, ejercicios originales con el formato del examen, tarjetas de clase, nota cultural y tarea.", { size: 20 })],
        [r("Los exámenes oficiales no vienen aquí: cada uno los descarga de topik.go.kr (edición y sección en tu cuaderno). Sin romanización.", { size: 20 })],
      ], [
        centro([r(WEB + " · WhatsApp " + WA + " · @academiaseul", { size: 19, color: GREY })], 120, 60),
        centro([r("화이팅!", { bold: true, size: 26, color: AZUL })], 60, 0),
      ]],
    },
  },

  // Guías en español (Jay conduce) con el bloque AB en coreano para Abby. El cuaderno de los niños va con letra más
  // grande y las tablas sin cabecera como grillas para escribir, colorear y dibujar (estilo).
  ninos: {
    carpeta: "Fase7_Ninos",
    diseno: "00_Diseno_Ninos.md",
    guiaMd: "Guia_Profesores",
    prefijo: /^Coreano para Niños \(8–15\) · /,
    perezosas: true,
    guia: {
      salida: "Guia_Profesores_Ninos_Octubre_2026.docx",
      titulo: "Coreano para Niños (8–15) · Guía de los profesores · Cohorte octubre 2026",
      descripcion: "Coreano para Niños (8–15) · Juega y aprende · 어린이 한국어 · diseño del curso y guías de los profes (Jay y Abby), semanas 1 a 8 · cohorte octubre 2026",
      estilo: { grillas: true, tablasAnchas: true },
      portada: () => [[
        centro([r("어린이 한국어 · Juega y aprende", { bold: true, size: 30, color: AZUL })], 120, 80),
        centro([r("Coreano para Niños (8–15)", { bold: true, size: 56 })], 0, 60),
        centro([r("Guía de los profesores", { bold: true, size: 44, color: AZUL })], 0, 160),
        centro([r("Cohorte octubre 2026 · Jay (김재희) y Abby (홍미영)", { size: 26, color: NAVY, bold: true })], 0, 80),
        centro([r("Lunes 18:00–19:00, hora de Chile (martes 06:00 en Corea) · 19 de octubre al 7 de diciembre · 8 semanas por Zoom · máximo 12 niños, en 2 salas", { size: 21, color: GREY })], 0, 60),
      ], [
        [r("Material de los profes", { bold: true, size: 22, color: NAVY })],
        [r("Diseño del curso + guías de clase de las semanas 1 a 8: plan minuto a minuto, resumen en coreano para Abby (Abby를 위한 요약), juegos en dos versiones (Explorador 8–11 y Reto 12–15), claves, planillas y la nota semanal a la familia.", { size: 20 })],
        [r("No se comparte con los niños ni con las familias: su material va en el Cuaderno de actividades.", { size: 20, bold: true, color: AZUL })],
      ], [
        centro([r(WEB + " · WhatsApp " + WA + " · @academiaseul", { size: 19, color: GREY })], 120, 60),
        centro([r("Versión del 27 de septiembre de 2026 · compilada desde Curriculo/Fase7_Ninos (00_Diseno_Ninos.md y profes/S01–S08)", { size: 16, color: GREY, italics: true })], 80, 0),
      ]],
    },
    cuaderno: {
      salida: "Cuaderno_Actividades_Ninos_Octubre_2026.docx",
      titulo: "Coreano para Niños (8–15) · Mi cuaderno de coreano · Cohorte octubre 2026",
      descripcion: "Coreano para Niños (8–15) · Juega y aprende · 어린이 한국어 · cuaderno de actividades de los niños, semanas 1 a 8 · cohorte octubre 2026",
      // Letra de 12 pt (en vez de 10,5), títulos y tablas más grandes, filas altas para escribir y grillas sin columna etiqueta.
      estilo: {
        cuerpo: 24, recuadro: 23, codigo: 20, tabla: [22, 21, 20, 18],
        titulos: { 1: 36, 2: 30, 3: 26, 4: 24 },
        filaVacia: 720, filaParaEscribir: 560, grillas: true, cuadro: 2600, tablasAnchas: true,
      },
      indice: {
        titulo: "Mis 8 semanas",
        nota: "Cada semana empieza en una página nueva. En el computador, los títulos de esta lista y los 🔊 son vínculos (en Word: Ctrl + clic).",
      },
      portada: () => [[
        centro([r("어린이 한국어 · Juega y aprende", { bold: true, size: 32, color: AZUL })], 120, 100),
        centro([r("Mi cuaderno de coreano", { bold: true, size: 64 })], 0, 80),
        centro([r("Coreano para Niños (8–15) · Cuaderno de actividades", { bold: true, size: 30, color: NAVY })], 0, 160),
        centro([r("Lunes 18:00, hora de Chile · 19 de octubre al 7 de diciembre · con Jay 선생님 y Abby 선생님", { size: 22, color: GREY })], 0, 360),
        centro([r("Nombre: ______________________________", { size: 28, bold: true })], 0, 60),
      ], [
        [r("8 semanas para saludar, leer 한글, contar y presentar tu show en coreano.", { bold: true, size: 24, color: NAVY })],
        [r("Cada semana: lo que vas a poder decir, tus palabras, juegos, la canción y la tarjeta de tu sala, Corea de cerca y tu misión.", { size: 22 })],
        [r("Explorador (8 a 11 años) y Reto (12 a 15 años): cada uno hace la suya… ¡y puede probar la otra! Al final de cada semana hay un recuadro para la familia.", { size: 22 })],
      ], [
        centro([r(WEB + " · WhatsApp " + WA + " · @academiaseul", { size: 19, color: GREY })], 120, 60),
        centro([r("화이팅!", { bold: true, size: 30, color: AZUL })], 60, 0),
      ]],
    },
  },
};

const carpetaDe = (cfg) => path.join(CURRICULO, cfg.carpeta);
const salidaDe = (cfg, archivo) => path.join(process.env.AS_OUT_DIR || carpetaDe(cfg), archivo);
// Fuentes Markdown de cada semana (las usan también los scripts de verificación).
const archivoGuia = (cfg, s) => `S0${s}_${cfg.guiaMd || "Guia_Profesor"}.md`;
const archivoAlumno = (cfg, s) => `S0${s}_Material_Alumno.md`;
// Textos del índice por defecto (Básico 1 y 2); cada curso puede cambiarlos con guia.indice / cuaderno.indice.
const INDICE_ES = {
  titulo: "Contenido", nota: NOTA_INDICE, semana: (n) => "Semana " + n, quitarSemana: /^Semana \d+ · /,
  disenoNum: "Diseño", disenoTexto: "Diseño del curso · la columna vertebral de las 8 semanas",
};

// Arma un documento con los tamaños de su estilo (guia.estilo / cuaderno.estilo sobre ESTILO_BASE) y vuelve al de siempre.
function conEstilo(estilo, fn) {
  const antes = EST;
  EST = estilo ? Object.assign({}, ESTILO_BASE, estilo, { titulos: Object.assign({}, ESTILO_BASE.titulos, estilo.titulos) }) : ESTILO_BASE;
  try { return fn(); } finally { EST = antes; }
}

// ---------------- a) Guía del profesor ----------------
function guiaProfesor(cfg) { return conEstilo(cfg.guia.estilo, () => armarGuia(cfg)); }
function armarGuia(cfg) {
  const BASE = carpetaDe(cfg);
  const g = cfg.guia;
  const ix = Object.assign({}, INDICE_ES, g.indice);
  const alFinal = !!g.disenoAlFinal;
  const sinPrefijo = (t) => t.replace(cfg.prefijo, "");
  const po = { perezosas: !!cfg.perezosas };
  const diseno = loadMd(path.join(BASE, cfg.diseno), po);
  const semanas = SEMANAS.map((s) => loadMd(path.join(BASE, "profes", archivoGuia(cfg, s)), po));

  // Cada parte se arma en el orden en que aparece en el documento.
  const armarDis = () => renderFile(diseno, "diseno", true, alFinal && g.rotuloDiseno ? g.rotuloDiseno() : undefined);
  const armarSem = () => semanas.map((bl, k) => renderFile(bl, "semana" + (k + 1), false));
  let dis, sem;
  if (alFinal) { sem = armarSem(); dis = armarDis(); } else { dis = armarDis(); sem = armarSem(); }

  const eDis = [{ id: "diseno", num: ix.disenoNum, text: ix.disenoTexto }];
  dis.marks.forEach((m) => eDis.push({ id: m.id, text: m.text, sub: true }));
  const eSem = semanas.map((bl, k) => ({ id: "semana" + (k + 1), num: ix.semana(k + 1), text: sinPrefijo(firstH1(bl)).replace(ix.quitarSemana, "") }));
  const entradas = alFinal ? [...eSem, ...eDis] : [...eDis, ...eSem];
  const partes = alFinal ? [...sem, dis] : [dis, ...sem];

  const children = [
    ...portada(...g.portada()),
    ...indice(ix.titulo, entradas, ix.nota),
    ...partes.flatMap((p) => p.els),
  ];
  return { file: salidaDe(cfg, g.salida), doc: documento({ titulo: g.titulo, descripcion: g.descripcion, children, pagina: g.pagina }) };
}

// ---------------- b) Cuaderno del alumno ----------------
function cuadernoAlumno(cfg) { return conEstilo(cfg.cuaderno.estilo, () => armarCuaderno(cfg)); }
function armarCuaderno(cfg) {
  const BASE = carpetaDe(cfg);
  const c = cfg.cuaderno;
  const ix = Object.assign({}, INDICE_ES, c.indice);
  const semanas = SEMANAS.map((s) => loadMd(path.join(BASE, "alumnos", archivoAlumno(cfg, s)), { perezosas: !!cfg.perezosas }));
  const sem = semanas.map((bl, k) => renderFile(bl, "semana" + (k + 1), false));
  const entradas = semanas.map((bl, k) => ({ id: "semana" + (k + 1), num: ix.semana(k + 1), text: firstH1(bl).replace(ix.quitarSemana, "") }));

  const children = [
    ...portada(...c.portada()),
    ...indice(ix.titulo, entradas, ix.nota),
    ...sem.flatMap((s) => s.els),
  ];
  return { file: salidaDe(cfg, c.salida), doc: documento({ titulo: c.titulo, descripcion: c.descripcion, children, pagina: c.pagina }) };
}

// Compila la guía y el cuaderno de un curso (clave de CURSOS) y devuelve las rutas escritas.
async function compilar(clave) {
  const cfg = CURSOS[clave];
  if (!cfg) throw new Error("Curso desconocido: " + clave + " · opciones: " + Object.keys(CURSOS).join(", ") + ", todos");
  const hechos = [];
  for (const make of [guiaProfesor, cuadernoAlumno]) {
    const { file, doc } = make(cfg);
    const buf = await Packer.toBuffer(doc);
    fs.writeFileSync(file, buf);
    console.log("OK", file, (buf.length / 1024).toFixed(0) + " KB");
    hechos.push(file);
  }
  return hechos;
}

module.exports = { parseBlocks, parseInline, renderBlocks, documento, CURSOS, compilar, archivoGuia, archivoAlumno };

if (require.main === module) {
  (async () => {
    const pedido = (process.argv[2] || process.env.AS_CURSO || "basico1").trim().toLowerCase().replace(/[\s_-]/g, "");
    const claves = pedido === "todos" ? Object.keys(CURSOS) : [pedido];
    for (const clave of claves) await compilar(clave);
  })().catch((e) => { console.error(e.message || e); process.exit(1); });
}
