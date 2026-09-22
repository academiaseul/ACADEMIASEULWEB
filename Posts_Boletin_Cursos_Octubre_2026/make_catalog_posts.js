// Posts de Instagram (1080×1350) estilo "boletín de cursos" universitario (MIT / Stanford)
// para la cohorte de octubre 2026. Genera 7 HTML en ./out y luego se renderizan a PNG con Chrome headless.
const fs = require("fs");
const path = require("path");
const OUT = path.join(__dirname, "out");
fs.mkdirSync(OUT, { recursive: true });

const AZUL = "#4236F6", NAVY = "#003478", INK = "#0A0A0F", PAPER = "#F6F3EC", RULE = "#0A0A0F", MUTED = "#5C5F6B", GOLD = "#B8962E";
const SELLO = "../../igpost/sello-azul.png"; // relativo a out/
const LOGO_AZUL = "../../logo-azul.png";

const HEAD = `<!doctype html><html lang="es"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;0,900;1,500;1,700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&family=IBM+Plex+Mono:wght@400;500;600&family=Noto+Sans+KR:wght@500;700;900&display=swap">
<style>
  * { box-sizing: border-box; }
  html, body { margin: 0; background: ${PAPER}; }
  body { width: 1080px; height: 1350px; overflow: hidden; font-family: 'Source Serif 4', Georgia, serif; color: ${INK}; -webkit-font-smoothing: antialiased; }
  .page { position: relative; width: 1080px; height: 1350px; padding: 54px 64px 48px; display: flex; flex-direction: column; }
  .page::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 14px; background: ${AZUL}; }
  .mono { font-family: 'IBM Plex Mono', monospace; }
  .kr { font-family: 'Noto Sans KR', sans-serif; }
  .display { font-family: 'Playfair Display', Georgia, serif; }
  .top { display: flex; justify-content: space-between; align-items: center; padding-bottom: 16px; border-bottom: 3px solid ${RULE}; }
  .top .brand { font-family: 'IBM Plex Mono', monospace; font-size: 17px; letter-spacing: 4px; text-transform: uppercase; color: ${INK}; font-weight: 600; }
  .top .brand span { color: ${AZUL}; }
  .top img { height: 66px; width: auto; }
  .code-row { display: flex; align-items: flex-end; justify-content: space-between; margin-top: 22px; }
  .code { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 116px; line-height: 0.95; letter-spacing: -2px; color: ${INK}; white-space: nowrap; flex: none; font-variant-numeric: lining-nums; }
  .code em { font-style: normal; color: ${AZUL}; }
  .tags { display: flex; gap: 10px; padding-bottom: 12px; white-space: nowrap; }
  .tag { font-family: 'IBM Plex Mono', monospace; font-size: 17px; font-variant-numeric: lining-nums; letter-spacing: 2px; text-transform: uppercase; padding: 8px 14px; border: 2px solid ${INK}; color: ${INK}; font-weight: 600; }
  .tag.fill { background: ${INK}; color: ${PAPER}; }
  .tag.blue { border-color: ${AZUL}; color: ${AZUL}; }
  .title { display: flex; align-items: baseline; gap: 22px; margin-top: 10px; }
  .title h1 { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 66px; line-height: 1; margin: 0; white-space: nowrap; }
  .title .sub { font-family: 'Playfair Display', serif; font-style: italic; font-weight: 500; font-size: 32px; color: ${MUTED}; }
  .title .ko { font-family: 'Noto Sans KR', sans-serif; font-weight: 700; font-size: 30px; color: ${AZUL}; margin-left: auto; }
  .meta { margin-top: 26px; border-top: 1.5px solid ${INK}; border-bottom: 1.5px solid ${INK}; display: grid; grid-template-columns: 1fr 1fr; column-gap: 40px; }
  .meta > div { display: flex; gap: 14px; padding: 11px 0; border-bottom: 1px solid rgba(10,10,15,.18); align-items: baseline; }
  .meta > div:nth-last-child(-n+2) { border-bottom: 0; }
  .meta .k { font-family: 'IBM Plex Mono', monospace; font-size: 15px; letter-spacing: 1.5px; text-transform: uppercase; color: ${MUTED}; width: 132px; flex: none; }
  .meta .v { font-size: 22px; font-weight: 600; line-height: 1.2; }
  .meta .v .kr { font-weight: 700; }
  h2 { font-family: 'IBM Plex Mono', monospace; font-size: 15px; letter-spacing: 3px; text-transform: uppercase; color: ${AZUL}; margin: 30px 0 10px; font-weight: 600; }
  h2 span { color: ${MUTED}; }
  h2 .kr { text-transform: none; letter-spacing: 1px; }
  p.desc { font-size: 24px; line-height: 1.4; margin: 0; }
  ul.logros { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 8px 28px; }
  ul.logros li { font-size: 22px; line-height: 1.3; padding-left: 26px; position: relative; text-wrap: balance; }
  ul.logros li::before { content: "✓"; position: absolute; left: 0; color: ${AZUL}; font-weight: 700; }
  ol.prog { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: 1fr 1fr; column-gap: 32px; row-gap: 8px; }
  ol.prog li { display: flex; gap: 12px; align-items: baseline; font-size: 21px; line-height: 1.25; border-bottom: 1px dotted rgba(10,10,15,.3); padding-bottom: 6px; }
  ol.prog li .n { font-family: 'IBM Plex Mono', monospace; font-size: 15px; color: ${AZUL}; font-weight: 600; flex: none; width: 28px; }
  ol.prog li .kr { font-weight: 700; }
  .foot { margin-top: auto; padding-top: 16px; border-top: 3px solid ${RULE}; display: flex; justify-content: space-between; align-items: center; }
  ol.prog { margin-bottom: 26px !important; }
  .foot .cta { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 24px; font-variant-numeric: lining-nums; line-height: 1.3; }
  .foot .cta span { color: ${AZUL}; }
  .foot .handles { font-family: 'IBM Plex Mono', monospace; font-size: 16px; color: ${MUTED}; letter-spacing: 1px; text-align: right; line-height: 1.4; }
</style></head><body>`;
const TAIL = `</body></html>`;

const top = (label, seal = true) => `<div class="top"><div class="brand">Academia Seúl · <span>Boletín de cursos</span> · Octubre 2026${label ? " · " + label : ""}</div>${seal ? `<img src="${SELLO}" alt="Sello Academia Seúl">` : "<div style=\"height:66px\"></div>"}</div>`;
const foot = (cta) => `<div class="foot"><div class="cta">${cta || 'Inscripción abierta hasta el <span>domingo 11 de octubre</span><br>→ academiaseul.com/nivel-1'}</div><div class="handles">@academiaseul<br>@jaychingu.oficial</div></div>`;

// ─── datos (lib/nivel1.ts · cohorte octubre 2026) ───
const CURSOS = [
  {
    file: "01_KOR101_Basico1", code: "KOR <em>101</em>", secciones: "Secciones 01 · 02", cefr: "A1.1", nombre: "Básico 1", sub: "Primeras Palabras", ko: "첫 한국어",
    horario: "Martes 20:00 o Jueves 20:00 <span class='mono' style='font-size:15px;color:#5C5F6B;white-space:nowrap'>(hora Chile)</span>", profe: "Kiran · <span class='kr'>기란</span> (nativa, bilingüe)", req: "Ninguno — desde cero", cupo: "15 por sección",
    desc: "El punto de partida: aprender a leer el alfabeto coreano y decir tus primeras frases reales. El drilling de lectura vive en el Lector de Hangul como tarea gamificada, así la hora en vivo se usa para hablar.",
    logros: ["Leer cualquier sílaba en coreano (Hangul completo + batchim)", "Presentarte y presentar a tu familia", "Contar en los dos sistemas de números y decir la hora", "Decir a dónde vas, qué haces y qué te gusta"],
    prog: ["<span class='kr'>가나다라 I</span> · La sílaba", "<span class='kr'>가나다라 II + 안녕하세요</span>", "<span class='kr'>이게 뭐예요?</span> · ¿Qué es esto?", "<span class='kr'>우리 엄마예요</span> · Mi familia", "<span class='kr'>집이 어디예요?</span> · Lugares", "<span class='kr'>학교에 가요</span> · Mi día", "<span class='kr'>내 방</span> · Mi pieza y mis verbos", "<span class='kr'>사과를 좋아해요</span> + examen"],
    libro: "한글학교 한국어 1 + Lector de Hangul",
  },
  {
    file: "02_KOR102_Basico2", code: "KOR <em>102</em>", secciones: "Sección 01", cefr: "A1.2", nombre: "Básico 2", sub: "Pasado, presente y futuro", ko: "기초 한국어 2",
    horario: "Miércoles 21:00 <span class='mono' style='font-size:15px;color:#5C5F6B;white-space:nowrap'>(hora Chile)</span>", profe: "Jay Kim · <span class='kr'>김재희</span> (fundador)", req: "Básico 1 <span style='color:#5C5F6B;font-weight:400'>o Nivel 1 de julio</span>", cupo: "15",
    desc: "La continuación directa de Básico 1 (y del Nivel 1 de julio): del presente al pasado y al futuro. Cuentas lo que hiciste, planeas lo que harás y sumas las partículas que hacen sonar natural tu coreano.",
    logros: ["Hablar en pasado, presente y futuro", "Decir qué no haces, qué no puedes y qué sabes hacer", "Comparar y precisar con <span class='kr'>보다, 처럼, 마다, 밖에</span>…", "Conversar 5 minutos seguidos en coreano"],
    prog: ["Re-presentación + diagnóstico", "Números aplicados: edad y hora", "Presente completo + irregulares", "El pasado · <span class='kr'>-았/었어요</span>", "El futuro · <span class='kr'>-(으)ㄹ 거예요</span>", "Negación y habilidad · <span class='kr'>안 · 못 · -(으)ㄹ 수 있다</span>", "Partículas avanzadas · <span class='kr'>의 · 도 · 만 · 처럼 · 보다</span>", "Conectores <span class='kr'>-고 · -지만</span> + examen final"],
    libro: "Uso de la gramática coreana · Nivel inicial",
  },
  {
    file: "03_KOR201_Conversacional1", code: "KOR <em>201</em>", secciones: "Sección 01", cefr: "A2.1", nombre: "Conversacional 1", titleSize: 58, sub: "Corea que amas", ko: "회화 A2.1",
    horario: "Martes 21:00 <span class='mono' style='font-size:15px;color:#5C5F6B;white-space:nowrap'>(hora Chile · mié 09:00 KST)</span>", profe: "Abby · <span class='kr'>홍미영</span> (nativa, en Corea)", req: "Básico 2 <span style='color:#5C5F6B;font-weight:400'>o test de nivel</span>", cupo: "15",
    desc: "Puro hablar: cada semana un tema de la Corea que amas — K-pop, Jeju, comida, hanbok, e-sports — con una profesora coreana nativa y grupos pequeños. Dos sesiones son laboratorio puro de conversación.",
    logros: ["Conversar sobre tus temas favoritos", "Planear y contar un viaje", "Pedir y recomendar comida como local", "Perder el miedo a hablar con una nativa"],
    prog: ["Orientación + diagnóstico oral", "K-pop y cultura fan", "Viajes: Jeju y Seúl", "Cultura gastronómica", "Lab de conversación 1", "Hanbok y estética", "<span class='kr'>PC방</span> y e-sports", "Lab 2 + evaluación oral · certificado A2.1"],
    libro: "Módulos conversacionales propios",
  },
  {
    file: "04_KOR301_TOPIK2", code: "KOR <em>301</em>", secciones: "Sección 01 · máx. 8", cefr: "B1+", nombre: "TOPIK II", sub: "Estrategia de examen", ko: "토픽 II 준비반",
    horario: "Jueves 21:00 <span class='mono' style='font-size:15px;color:#5C5F6B;white-space:nowrap'>(hora Chile)</span>", profe: "Jay Kim · <span class='kr'>김재희</span>", req: "Nivel intermedio (B1)", cupo: "8 — grupo chico",
    desc: "Grupo chico (máx. 8) enfocado 100 % en el examen oficial: estrategia por sección, corrección personalizada de escritura (<span class='kr'>쓰기</span>) y simulacros cronometrados. Ideal si apuntas al TOPIK de abril de 2027.",
    logros: ["Dominar la estrategia de cada sección", "Escribir los formatos 51–54 con corrección", "Rendir un simulacro completo cronometrado", "Salir con un plan de estudio hasta tu examen"],
    prog: ["Diagnóstico + radiografía del TOPIK II", "<span class='kr'>읽기 I</span> · Lectura, preguntas 1–20", "<span class='kr'>듣기 I</span> · Escucha activa", "<span class='kr'>쓰기 51–52</span> · Completar oraciones", "<span class='kr'>쓰기 53</span> · El gráfico", "<span class='kr'>읽기/듣기 II</span> · Nivel 4–6", "<span class='kr'>쓰기 54</span> · El ensayo", "Simulacro final + plan personal"],
    libro: "Exámenes TOPIK oficiales + material propio",
  },
  {
    file: "05_KOR050_Ninos", code: "KOR <em>050</em>", secciones: "Sección 01", cefr: "Niños", nombre: "Coreano para Niños", titleSize: 54, sub: "Juega y aprende", ko: "어린이 한국어",
    horario: "Lunes 18:00 <span class='mono' style='font-size:15px;color:#5C5F6B;white-space:nowrap'>(hora Chile)</span>", profe: "Jay y Abby · <span class='kr'>김재희 · 홍미영</span>", req: "Ninguno — desde cero", cupo: "12", inicio: "Lunes 19 de octubre",
    desc: "Coreano desde cero para niños y niñas, con juegos, canciones y dibujos. Aprenden a leer el alfabeto, presentarse y decir sus primeras frases — y terminan con un mini-show para la familia.",
    logros: ["Leer sus primeras palabras en coreano", "Presentarse: nombre y edad", "Contar del 1 al 10 · animales y comidas", "Presentar un mini-show en coreano a la familia"], podra: "Al terminar, tu hijo/a podrá",
    prog: ["¡Hola, Corea! · <span class='kr'>안녕하세요</span>", "Mi nombre en coreano · <span class='kr'>이름</span>", "La fábrica de sílabas · <span class='kr'>글자</span>", "Los animales · <span class='kr'>동물</span>", "Mi familia · <span class='kr'>가족</span>", "Los números mágicos · <span class='kr'>숫자</span>", "¡Ñam! Comida coreana · <span class='kr'>음식</span>", "Show final + certificado · <span class='kr'>무대</span>"],
    libro: "Material propio Academia Seúl + Lector de Hangul",
  },
];

function cursoPage(c) {
  return HEAD + `<div class="page">
  ${top(c.cefr === "Niños" ? "Niños" : c.cefr)}
  <div class="code-row">
    <div class="code">${c.code}</div>
    <div class="tags"><div class="tag fill">${c.cefr === "Niños" ? "8–15 años" : "Nivel " + c.cefr}</div><div class="tag">${c.secciones}</div></div>
  </div>
  <div class="title"><h1 style="font-size:${c.titleSize || 66}px">${c.nombre}</h1><div class="sub">${c.sub}</div><div class="ko">${c.ko}</div></div>
  <div class="meta">
    <div><div class="k">Horario</div><div class="v">${c.horario}</div></div>
    <div><div class="k">Duración</div><div class="v">8 semanas · 60 min por sesión</div></div>
    <div><div class="k">Profesor/a</div><div class="v">${c.profe}</div></div>
    <div><div class="k">Modalidad</div><div class="v">En vivo por Zoom · certificado</div></div>
    <div><div class="k">Prerrequisito</div><div class="v">${c.req}</div></div>
    <div><div class="k">Cupo</div><div class="v">${c.cupo}</div></div>
    <div><div class="k">Arancel</div><div class="v">US$150 · o 2 cuotas de US$75</div></div>
    <div><div class="k">Inicio</div><div class="v">${c.inicio || "Semana del 12 de octubre"}</div></div>
  </div>
  <h2>Descripción del curso</h2>
  <p class="desc">${c.desc}</p>
  <h2>${c.podra || "Al terminar podrás"}</h2>
  <ul class="logros">${c.logros.map((l) => `<li>${l}</li>`).join("")}</ul>
  <h2>Programa <span>· 8 sesiones · <span class="kr">${c.libro}</span></span></h2>
  <ol class="prog">${c.prog.map((t, i) => `<li><span class="n">${String(i + 1).padStart(2, "0")}</span><span>${t}</span></li>`).join("")}</ol>
  ${foot()}
</div>` + TAIL;
}

// ─── portada: índice del boletín ───
function portada() {
  const rows = [
    ["KOR 101", "Básico 1 · Primeras Palabras", "A1.1", "Mar 20:00 o Jue 20:00", "Kiran"],
    ["KOR 102", "Básico 2 · Pasado, presente y futuro", "A1.2", "Mié 21:00", "Jay"],
    ["KOR 201", "Conversacional 1 · Corea que amas", "A2.1", "Mar 21:00", "Abby"],
    ["KOR 301", "TOPIK II · Estrategia de examen", "B1+", "Jue 21:00", "Jay"],
    ["KOR 050", "Coreano para Niños · Juega y aprende", "8–15", "Lun 18:00", "Jay y Abby"],
    ["KOR 202", "Conversacional 2 · Corea por dentro", "A2.2", "Enero 2027", "—"],
  ];
  return HEAD + `<style>
    .cover-seal { display: flex; justify-content: center; margin-top: 34px; }
    .cover-seal img { height: 150px; width: auto; }
    .cover-kicker { text-align: center; font-family: 'IBM Plex Mono', monospace; font-size: 17px; letter-spacing: 5px; text-transform: uppercase; color: ${MUTED}; margin-top: 24px; }
    .cover-title { text-align: center; font-family: 'Playfair Display', serif; font-weight: 900; font-size: 104px; line-height: 0.98; letter-spacing: -2px; margin: 8px 0 0; }
    .cover-title em { font-style: italic; font-weight: 700; color: ${AZUL}; }
    .cover-sub { text-align: center; font-family: 'Playfair Display', serif; font-style: italic; font-size: 30px; color: ${MUTED}; margin-top: 14px; }
    table.idx { width: 100%; border-collapse: collapse; margin-top: 34px; border-top: 3px solid ${INK}; }
    table.idx th { font-family: 'IBM Plex Mono', monospace; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; color: ${MUTED}; text-align: left; padding: 12px 8px 10px; border-bottom: 1.5px solid ${INK}; font-weight: 600; }
    table.idx td { padding: 17px 8px; border-bottom: 1px solid rgba(10,10,15,.2); font-size: 22px; vertical-align: middle; }
    table.idx td.code { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 26px; color: ${AZUL}; white-space: nowrap; font-variant-numeric: lining-nums; }
    table.idx td.lvl { font-family: 'IBM Plex Mono', monospace; font-size: 17px; font-weight: 600; }
    table.idx tr.next td { color: ${MUTED}; }
    table.idx tr.next td.code { color: ${MUTED}; }
    .common { margin-top: 36px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
    .common > div { border: 2px solid ${INK}; padding: 20px 12px 18px; text-align: center; }
    .common .big { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 30px; line-height: 1; }
    .common .lbl { font-family: 'IBM Plex Mono', monospace; font-size: 17px; letter-spacing: 1.5px; text-transform: uppercase; color: ${INK}; margin-top: 10px; font-weight: 600; }
  </style><div class="page">
  ${top("", false)}
  <div class="cover-seal"><img src="${SELLO}" alt="Sello"></div>
  <div class="cover-kicker">Santiago de Chile · en línea para LATAM y España</div>
  <h1 class="cover-title">Boletín de <em>cursos</em></h1>
  <div class="cover-sub">Cohorte de octubre 2026 · clases en vivo con profes coreanos nativos</div>
  <table class="idx">
    <tr><th>Código</th><th>Curso</th><th>Nivel</th><th>Horario (Chile)</th><th>Profe</th></tr>
    ${rows.map((r, i) => `<tr class="${i === 5 ? "next" : ""}"><td class="code">${r[0]}</td><td>${r[1]}</td><td class="lvl">${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td></tr>`).join("")}
  </table>
  <div class="common">
    <div><div class="big">8</div><div class="lbl">semanas</div></div>
    <div><div class="big">60′</div><div class="lbl">por sesión</div></div>
    <div><div class="big">US$150</div><div class="lbl">o 2 × US$75</div></div>
    <div><div class="big">✓</div><div class="lbl">certificado</div></div>
  </div>
  ${foot('Inscripciones abiertas hasta el <span>domingo 11 de octubre</span><br>→ academiaseul.com/nivel-1')}
</div>` + TAIL;
}

// ─── calendario académico + cómo inscribirse ───
function calendario() {
  const fechas = [
    ["15 sep – 11 oct", "Periodo de inscripción", "Reserva tu cupo en academiaseul.com/nivel-1 · pago único o 2 cuotas"],
    ["Dom 11 oct", "Cierre de matrícula", "o hasta llenar los cupos (15 por sección · Niños: 12 · TOPIK II: 8)"],
    ["Semana del 12 oct", "Inicio de clases", "Mar Básico 1 + Conversacional 1 · Mié Básico 2<br>Jue Básico 1 + TOPIK&nbsp;II · Niños: lun 19 oct (el 12 es feriado)"],
    ["Semana del 30 nov", "Sesión 8 · examen final", "Presentación final + certificado Academia Seúl (Niños: lun 7 dic)"],
    ["Enero 2027", "Siguiente periodo", "Conversacional 2 (A2.2) · continuación de Conversacional 1"],
  ];
  return HEAD + `<style>
    .cal-title { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 84px; line-height: 1; letter-spacing: -2px; margin: 26px 0 0; }
    .cal-title em { font-style: italic; font-weight: 700; color: ${AZUL}; }
    .cal-sub { font-family: 'Playfair Display', serif; font-style: italic; font-size: 28px; color: ${MUTED}; margin-top: 10px; }
    .dates { margin-top: 26px; border-top: 3px solid ${INK}; }
    .dates > div { display: grid; grid-template-columns: 230px 1fr; gap: 20px; padding: 15px 0; border-bottom: 1px solid rgba(10,10,15,.22); align-items: baseline; }
    .dates .d { font-family: 'IBM Plex Mono', monospace; font-size: 19px; font-weight: 600; color: ${AZUL}; letter-spacing: 1px; }
    .dates .t { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 27px; line-height: 1.1; }
    .dates .x { font-size: 19px; color: ${MUTED}; margin-top: 4px; line-height: 1.3; }
    .steps { margin-top: 28px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
    .steps > div { border: 2px solid ${INK}; padding: 20px 20px 18px; }
    .steps .n { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 44px; color: ${AZUL}; line-height: 1; }
    .steps .h { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 24px; margin-top: 8px; line-height: 1.1; }
    .steps .p { font-size: 19px; color: ${MUTED}; margin-top: 8px; line-height: 1.3; }
    .fee { margin-top: 24px; background: ${INK}; color: ${PAPER}; padding: 22px 28px; display: flex; justify-content: space-between; align-items: center; }
    .fee .a { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 32px; line-height: 1.15; }
    .fee .a span { color: #D4AF37; }
    .fee .b { font-family: 'IBM Plex Mono', monospace; font-size: 16px; letter-spacing: 1px; text-align: right; line-height: 1.5; color: #D8DCF5; }
  </style><div class="page">
  ${top("Calendario")}
  <h1 class="cal-title">Calendario <em>académico</em></h1>
  <div class="cal-sub">Cohorte de octubre de 2026 · todas las fechas en hora de Chile (UTC−3)</div>
  <div class="dates">${fechas.map((f) => `<div><div class="d">${f[0]}</div><div><div class="t">${f[1]}</div><div class="x">${f[2]}</div></div></div>`).join("")}</div>
  <div class="steps">
    <div><div class="n">1</div><div class="h">Elige tu curso</div><div class="p">Toca tu caso en la escalera: nunca estudié · ya leo hangul · quiero hablar · voy por el TOPIK.</div></div>
    <div><div class="n">2</div><div class="h">Reserva tu cupo</div><div class="p">Formulario de 1 minuto. Ves tu horario en la hora de tu país.</div></div>
    <div><div class="n">3</div><div class="h">Paga como prefieras</div><div class="p">Mercado Pago (tarjeta), PayPal o transferencia por WhatsApp.</div></div>
  </div>
  <div class="fee"><div class="a">Arancel: <span>US$150</span> el curso completo<br>o 2&nbsp;cuotas de <span>US$75</span></div><div class="b">Mismo precio en<br>todos los niveles<br>Certificado incluido</div></div>
  ${foot('Inscríbete en <span>academiaseul.com/nivel-1</span> · WhatsApp +56 9 4211 5562')}
</div>` + TAIL;
}

fs.writeFileSync(path.join(OUT, "00_Portada_Boletin.html"), portada());
CURSOS.forEach((c) => fs.writeFileSync(path.join(OUT, c.file + ".html"), cursoPage(c)));
fs.writeFileSync(path.join(OUT, "06_Calendario_Academico.html"), calendario());
console.log("OK", fs.readdirSync(OUT).filter((f) => f.endsWith(".html")).join(", "));
