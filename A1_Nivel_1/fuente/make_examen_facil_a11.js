// Examen fácil de Básico 1 (A1.1): alfabeto, palabras, ortografía, frases y completar.
// Genera la prueba y la clave (misma fuente de datos). Estilo de la casa: US Letter, Arial + Malgun Gothic,
// cabeceras navy #003478, acento azul #4236F6, nunca rojo.
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun, AlignmentType,
  WidthType, BorderStyle, ShadingType, Footer, PageNumber, TabStopType, VerticalAlign,
} = require("docx");

const OUT = "C:/Users/Chingu/Desktop/ACADEMIASEULWEB/A1_Nivel_1";
const LOGO = fs.readFileSync(path.join(__dirname, "logo-azul.png"));
const FONT = { ascii: "Arial", hAnsi: "Arial", cs: "Arial", eastAsia: "Malgun Gothic" };
const AZUL = "4236F6", NAVY = "003478", INK = "1F2433", GRIS = "6B7280", SUAVE = "EEF0FE";

// ---------- contenido ----------
const P1 = { letras: ["ㅁ", "ㅏ", "ㄴ", "ㅜ", "ㅅ", "ㅓ", "ㄱ", "ㅣ", "ㅂ", "ㅗ"],
  sonidos: ["m", "a", "n", "u", "s", "eo", "g / k", "i", "b / p", "o"],
  banco: "a · b / p · eo · g / k · i · m · n · o · s · u" };
const P2 = [
  ["우유", ["pan", "leche", "agua"], 1], ["바다", ["mar", "árbol", "cabeza"], 0],
  ["어머니", ["padre", "amigo", "madre"], 2], ["학생", ["estudiante", "profesor", "médico"], 0],
  ["물", ["libro", "agua", "café"], 1], ["책", ["silla", "reloj", "libro"], 2],
  ["친구", ["amigo, amiga", "familia", "nombre"], 0], ["고양이", ["perro", "gato", "pepino"], 1],
];
const P3 = { es: ["pan", "Corea", "nombre", "mamá", "lápiz", "café", "perro", "paraguas"],
  ko: ["커피", "이름", "빵", "우산", "한국", "강아지", "엄마", "연필"], clave: ["c", "e", "b", "g", "h", "a", "f", "d"] };
const P4A = [
  ["annyeonghaseyo (hola)", ["아녕하세요", "안녕하세요", "안녕하새요"], 1],
  ["gamsahamnida (gracias)", ["감사합니다", "감사함니다", "감싸합니다"], 0],
  ["hanguk (Corea)", ["한극", "항국", "한국"], 2],
  ["kimchi (kimchi)", ["김치", "긴치", "김지"], 0],
  ["seonsaengnim (profesor)", ["선생임", "섬생님", "선생님"], 2],
  ["hangeul (alfabeto coreano)", ["한굴", "한글", "항글"], 1],
];
const P4B = [["na", "yo", "나"], ["u-yu", "leche", "우유"], ["o-i", "pepino", "오이"],
  ["ba-da", "mar", "바다"], ["na-mu", "árbol", "나무"], ["mo-ja", "gorro", "모자"]];
const P5 = [
  ["안녕하세요.", ["Gracias.", "Hola.", "Adiós."], 1],
  ["감사합니다.", ["Gracias.", "Perdón.", "Encantado."], 0],
  ["반갑습니다.", ["Hasta mañana.", "¿Qué es esto?", "Encantado/a de conocerte."], 2],
  ["이거 뭐예요?", ["¿Qué es esto?", "¿Dónde está?", "¿Quién es?"], 0],
  ["저는 학생이에요.", ["Soy profesor.", "Soy estudiante.", "Soy chileno."], 1],
  ["안녕히 가세요.", ["Adiós (a quien se va).", "Bienvenido.", "¿Cómo estás?"], 0],
];
const P6 = { banco: "안녕 · 는 · 이에요 · 예요 · 뭐 · 가방",
  items: [["", "하세요!", "¡Hola!", "안녕"], ["저", " 칠레 사람이에요.", "Soy chileno / chilena.", "는"],
    ["저는 학생", ".", "Soy estudiante.", "이에요"], ["제 이름은 마리아", ".", "Me llamo María.", "예요"],
    ["이거 ", "예요?", "¿Qué es esto?", "뭐"], ["이거는 ", "이에요.", "Esto es una mochila.", "가방"]] };

// ---------- helpers ----------
const r = (t, o = {}) => new TextRun({ text: t, font: FONT, size: 22, color: INK, ...o });
const ans = (t) => r(t, { color: AZUL, bold: true });
const p = (children, o = {}) => new Paragraph({ children, spacing: { after: 80, line: 300, lineRule: "atLeast" }, ...o });
const LINEA = "______________";
const nb = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const NOB = { top: nb, bottom: nb, left: nb, right: nb, insideHorizontal: nb, insideVertical: nb };
const fino = { style: BorderStyle.SINGLE, size: 4, color: "C9CDE0" };
const FINO = { top: fino, bottom: fino, left: fino, right: fino, insideHorizontal: fino, insideVertical: fino };

function seccion(n, titulo, pts, instr) {
  return [
    new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, borders: NOB, rows: [new TableRow({ children: [
      new TableCell({ shading: { type: ShadingType.CLEAR, fill: NAVY, color: "auto" }, margins: { top: 70, bottom: 70, left: 140, right: 140 },
        children: [new Paragraph({ tabStops: [{ type: TabStopType.RIGHT, position: 9900 }], children: [
          r(n === "extra" ? titulo : `Parte ${n} · ${titulo}`, { bold: true, color: "FFFFFF", size: 24 }), r(`\t${pts} puntos`, { color: "FFFFFF", size: 20 })] })] })] })] }),
    p([r(instr, { italics: true, color: GRIS, size: 20 })], { spacing: { before: 100, after: 120 } }),
  ];
}
const cell = (children, o = {}) => new TableCell({ children, verticalAlign: VerticalAlign.CENTER, margins: { top: 60, bottom: 60, left: 100, right: 100 }, ...o });

function opciones(items, clave, kr) {
  // pregunta | a | b | c  — en la clave la correcta va en azul y marcada
  return new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, borders: FINO, rows: items.map(([q, ops, ok], i) =>
    new TableRow({ children: [
      cell([p([r(`${i + 1}. `, { bold: true, color: AZUL }), r(q, kr ? { size: 26, bold: true } : {})], { spacing: { after: 0 } })], { width: { size: 34, type: WidthType.PERCENTAGE } }),
      ...ops.map((o, j) => cell([p([
        r((clave && j === ok ? "☑ " : "☐ ") + "abc"[j] + ") ", { color: clave && j === ok ? AZUL : GRIS }),
        clave && j === ok ? ans(o) : r(o, kr ? {} : { size: kr === false ? 26 : 22 })], { spacing: { after: 0 } })], { width: { size: 22, type: WidthType.PERCENTAGE } })),
    ] })) });
}

function construir(clave) {
  const ch = [];
  ch.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 }, children: [new ImageRun({ type: "png", data: LOGO, transformation: { width: 174, height: 60 } })] }));
  ch.push(p([r(clave ? "Clave de respuestas · Examen fácil" : "Examen fácil", { bold: true, size: 36, color: NAVY })], { alignment: AlignmentType.CENTER, spacing: { after: 20 } }));
  ch.push(p([r("Básico 1 (A1.1) · 기초 한국어 1 · 30 minutos · 50 puntos (+2 de bonus)", { size: 20, color: GRIS })], { alignment: AlignmentType.CENTER, spacing: { after: 160 } }));
  if (!clave) {
    ch.push(new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, borders: FINO, rows: [new TableRow({ children: [
      cell([p([r("Nombre: ", { bold: true })], { spacing: { after: 0 } })], { width: { size: 50, type: WidthType.PERCENTAGE } }),
      cell([p([r("Fecha: ", { bold: true })], { spacing: { after: 0 } })], { width: { size: 25, type: WidthType.PERCENTAGE } }),
      cell([p([r("Puntaje:          / 50", { bold: true })], { spacing: { after: 0 } })], { width: { size: 25, type: WidthType.PERCENTAGE } })] })] }));
    ch.push(p([r("¡Tranquilo! Es una prueba fácil para ver cuánto ya sabes. Lee cada instrucción con calma. 화이팅! 🐯", { size: 20, color: AZUL })], { spacing: { before: 120, after: 160 } }));
  } else {
    ch.push(p([r("Las respuestas correctas están en azul. Puntaje sugerido: 1 punto por respuesta; en la Parte 4B acepta la palabra bien escrita aunque la letra sea irregular.", { size: 20, color: GRIS })], { spacing: { after: 160 } }));
  }

  // Parte 1
  ch.push(...seccion(1, "El alfabeto · 한글", 10, "Escribe cómo suena cada letra. Usa el banco de sonidos."));
  ch.push(p([r("Banco de sonidos:  ", { bold: true, size: 20 }), r(P1.banco, { size: 20 })], { shading: { type: ShadingType.CLEAR, fill: SUAVE, color: "auto" } }));
  const fila = (de, a) => new TableRow({ children: P1.letras.slice(de, a).map((l, i) => cell([
    p([r(l, { size: 44, bold: true, color: NAVY })], { alignment: AlignmentType.CENTER, spacing: { after: 0 } }),
    p([clave ? ans(P1.sonidos[de + i]) : r("______", { color: GRIS })], { alignment: AlignmentType.CENTER, spacing: { after: 0 } })], { width: { size: 20, type: WidthType.PERCENTAGE } })) });
  ch.push(new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, borders: FINO, rows: [fila(0, 5), fila(5, 10)] }));

  // Parte 2
  ch.push(p([], { spacing: { after: 160 } }), ...seccion(2, "¿Qué significa? · Coreano → español", 8, "Marca el significado correcto."));
  ch.push(opciones(P2, clave, true));

  // Parte 3
  ch.push(new Paragraph({ pageBreakBefore: true, children: [] }), ...seccion(3, "¿Cómo se dice en coreano? · Español → coreano", 8, "Une cada palabra con su traducción. Escribe la letra en la línea."));
  ch.push(new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, borders: NOB, rows: P3.es.map((w, i) => new TableRow({ children: [
    cell([p([r(`${i + 1}. ${w}`)], { spacing: { after: 0 } })], { width: { size: 30, type: WidthType.PERCENTAGE } }),
    cell([p([clave ? ans(P3.clave[i]) : r("_____", { color: GRIS })], { spacing: { after: 0 } })], { width: { size: 20, type: WidthType.PERCENTAGE } }),
    cell([p([r(`${"abcdefgh"[i]})  `, { color: AZUL, bold: true }), r(P3.ko[i], { size: 26, bold: true })], { spacing: { after: 0 } })], { width: { size: 50, type: WidthType.PERCENTAGE } }),
  ] })) }));

  // Parte 4
  ch.push(p([], { spacing: { after: 160 } }), ...seccion(4, "Lee y escribe", 12, "A) ¿Cuál está bien escrito? Marca la opción correcta. (6 puntos)"));
  ch.push(opciones(P4A, clave, false));
  ch.push(p([r("B) Escribe en hangul. Ejemplo: ga → 가  ·  ma-ma → 마마  (6 puntos)", { italics: true, color: GRIS, size: 20 })], { spacing: { before: 200, after: 120 } }));
  ch.push(new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, borders: FINO, rows: [0, 3].map((de) => new TableRow({ children: P4B.slice(de, de + 3).map(([rom, es, kr], i) => cell([
    p([r(`${de + i + 1}. `, { bold: true, color: AZUL }), r(rom, { bold: true }), r(`  (${es})`, { color: GRIS, size: 20 })], { spacing: { after: 60 } }),
    p([clave ? ans(kr) : r("→ ____________", { color: GRIS })], { spacing: { after: 0 } })], { width: { size: 33, type: WidthType.PERCENTAGE } })) })) }));

  // Parte 5
  ch.push(new Paragraph({ pageBreakBefore: true, children: [] }), ...seccion(5, "Frases · ¿Qué quiere decir?", 6, "Marca el significado en español."));
  ch.push(opciones(P5, clave, true));

  // Parte 6
  ch.push(p([], { spacing: { after: 160 } }), ...seccion(6, "Completa la frase", 6, "Usa el banco de palabras. Cada palabra se usa una vez."));
  ch.push(p([r("Banco de palabras:  ", { bold: true, size: 20 }), r(P6.banco, { size: 24, bold: true, color: NAVY })], { shading: { type: ShadingType.CLEAR, fill: SUAVE, color: "auto" } }));
  ch.push(p([r("Recuerda: ", { bold: true, size: 20, color: AZUL }), r("예요 va después de vocal (마리아예요) · 이에요 va después de consonante (학생이에요).", { size: 20 })]));
  P6.items.forEach(([a, b, es, ok], i) => ch.push(p([
    r(`${i + 1}. `, { bold: true, color: AZUL }), r(a, { size: 26 }), clave ? ans(` ${ok} `) : r(" _________ ", { color: GRIS }), r(b, { size: 26 }),
    r(`   (${es})`, { color: GRIS, size: 20 })], { spacing: { after: 140 } })));

  // Bonus
  ch.push(p([], { spacing: { after: 120 } }), ...seccion("extra", "Bonus", 2, "Escribe tu nombre en hangul. ¡Inténtalo!"));
  ch.push(p([clave ? r("Cualquier intento razonable vale (ej.: María → 마리아, Diego → 디에고, Camila → 카밀라).", { color: AZUL }) : r("내 이름은 ______________________________ 예요 / 이에요.", { size: 26 })]));
  ch.push(p([r(clave ? "" : "¡Muy bien! 수고했어요! 🐯", { bold: true, color: AZUL })], { alignment: AlignmentType.CENTER, spacing: { before: 240 } }));

  return new Document({
    creator: "Academia Seúl", title: clave ? "Clave · Examen fácil Básico 1" : "Examen fácil Básico 1",
    styles: { default: { document: { run: { font: FONT, size: 22, color: INK } } } },
    sections: [{
      properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1000, bottom: 900, left: 1100, right: 1100 } } },
      footers: { default: new Footer({ children: [new Paragraph({ tabStops: [{ type: TabStopType.RIGHT, position: 10040 }], children: [
        r("Academia Seúl · www.academiaseul.com", { size: 16, color: GRIS }), new TextRun({ children: ["\t", PageNumber.CURRENT], font: FONT, size: 16, color: GRIS })] })] }) },
      children: ch,
    }],
  });
}

(async () => {
  for (const [clave, nombre] of [[false, "Examen_Facil_Basico1_A1.1"], [true, "Examen_Facil_Basico1_A1.1_CLAVE"]]) {
    fs.writeFileSync(`${OUT}/${nombre}.docx`, await Packer.toBuffer(construir(clave)));
    console.log("ok", nombre);
  }
})();
