// ⚙️ CONFIGURACIÓN DE LA COHORTE · OCTUBRE 2026
//
// Fuente única de verdad del programa: NOMBRES, precios, clases, horarios (con
// zonas horarias), profesores y syllabus de 8 semanas. La leen /nivel-1
// (matrícula), /programa (syllabus público), la home (Courses), los PDFs
// descargables (scratchpad/make_programas_pdf.js) y el checkout de Mercado Pago.
//
// Regla de nombres (una sola en todo el sitio):
//   nombreCorto  → "Básico 1 (A1.1)"     en títulos, selects, correos, WhatsApp
//   cefr         → "A1.1"                en pills y en la escalera
//   subtitulo    → "Primeras Palabras"   solo como línea gris secundaria
//   koreanTitle  → decorativo
//
// Para cerrar la matrícula cuando arranque la cohorte: COHORTE_ABIERTA = false.

export const COHORTE_ABIERTA = true;

export const PROXIMA_COHORTE_LABEL = "Octubre 2026";
export const INICIO_LABEL = "Semana del 5 de octubre de 2026";
export const INICIO_SEMANA = "la semana del 5 de octubre";
export const INICIO_ISO = "2026-10-05";
export const FIN_LABEL = "Semana del 23 de noviembre de 2026";
export const CIERRE_MATRICULA = "domingo 4 de octubre (o hasta llenar los cupos)";

// 💵 Precios (USD) — cada curso: pago único o 2 cuotas.
export const PRECIO_UNICO = 150;
export const PRECIO_MENSUAL = 75;
export const MESES = 2;
/** Una sola redacción del precio en todo el sitio. */
export const precioLabel = () =>
  `US$${PRECIO_UNICO} el curso completo · o ${MESES} cuotas de US$${PRECIO_MENSUAL}`;
export const PRECIO_CORTO = `US$${PRECIO_UNICO} · o ${MESES} × US$${PRECIO_MENSUAL}`;

// 🔗 Links de pago PayPal (Pay Links con monto fijo, confirmados por Jay el 15 sept 2026).
// Si PAYPAL_LINK_MENSUAL queda vacío, el plan en cuotas se coordina por WhatsApp.
// Pendiente en PayPal: "Cuenta de PayPal opcional" = activado y retorno automático a
// https://www.academiaseul.com/nivel-1?pago=success
export const PAYPAL_LINK_UNICO = "https://www.paypal.com/ncp/payment/5X33QK4A928FU"; // US$150 · curso completo
export const PAYPAL_LINK_MENSUAL = "https://www.paypal.com/ncp/payment/SQ2YHGEZFUDEC"; // US$75 · cuota 1 de 2

// 🔗 Hotmart (checkout en la moneda del alumno: USD/EUR/moneda local — ideal
// para alumnos fuera de LatAm). Los botones solo aparecen cuando el link existe.
// TODO(Jay): crear el producto en hotmart.com y pegar aquí los links de checkout.
export const HOTMART_LINK_UNICO = "";
export const HOTMART_LINK_MENSUAL = "";

export const WHATSAPP = "56942115562";

// 👩‍🏫 Equipo docente
export type ProfeId = "jay" | "abby" | "guiran" | "ninos";
export type Profe = {
  id: ProfeId;
  nombre: string; // "Jay Kim · 김재희"
  corto: string; // "Jay"
  emoji: string;
  rol: string;
  bio: string;
};
export const PROFES: Profe[] = [
  {
    id: "jay",
    nombre: "Jay Kim · 김재희",
    corto: "Jay",
    emoji: "🐯",
    rol: "Fundador · Básico 2 y TOPIK II",
    bio: "Coreano nativo radicado en Chile. Creador del Método Chingu™ y del Lector de Hangul. 8+ años enseñando a hispanohablantes.",
  },
  {
    id: "guiran",
    nombre: "Guiran · 기란",
    corto: "Guiran",
    emoji: "🌱",
    rol: "Básico 1 (martes y jueves)",
    bio: "Profesora coreana criada en Argentina — bilingüe perfecta. Años de experiencia enseñando coreano en español.",
  },
  {
    id: "abby",
    nombre: "Abby · 홍미영",
    corto: "Abby",
    emoji: "💬",
    rol: "Conversacional 1",
    bio: "Profesora coreana nativa, pedagoga (MSU). Dicta el conversacional desde Corea — clases donde solo se habla.",
  },
  {
    id: "ninos",
    nombre: "Profesor/a de Niños",
    corto: "por confirmar",
    emoji: "🧒",
    rol: "Coreano para Niños",
    bio: "Docente con experiencia en clases para 8–12 años. Te lo presentamos por WhatsApp antes de que pagues.",
  },
];
export const profeDe = (id: ProfeId): Profe => PROFES.find((p) => p.id === id)!;

export type CursoId = "ninos" | "a11" | "a12" | "a21" | "topik2";

export type ClaseId =
  | "a11-martes"
  | "a11-jueves"
  | "a12"
  | "a21"
  | "topik2"
  | "ninos";

export type Clase = {
  id: ClaseId;
  cursoId: CursoId;
  label: string; // para selects y correos: "Básico 1 (A1.1) · Martes 20:00 Chile · Guiran"
  profeId: ProfeId;
  dia: string;
  horaChile: string; // "18:00"
  primeraClase: string; // "martes 6 de octubre"
  cupos: number;
};

// Orden = orden de la escalera (Básico 1 → Básico 2 → Conversacional 1 → TOPIK II), Niños al final.
export const CLASES: Clase[] = [
  { id: "a11-martes", cursoId: "a11", label: "Básico 1 (A1.1) · Martes 20:00 Chile · Guiran", profeId: "guiran", dia: "Martes", horaChile: "20:00", primeraClase: "martes 6 de octubre", cupos: 15 },
  { id: "a11-jueves", cursoId: "a11", label: "Básico 1 (A1.1) · Jueves 20:00 Chile · Guiran", profeId: "guiran", dia: "Jueves", horaChile: "20:00", primeraClase: "jueves 8 de octubre", cupos: 15 },
  { id: "a12", cursoId: "a12", label: "Básico 2 (A1.2) · Miércoles 21:00 Chile · Jay", profeId: "jay", dia: "Miércoles", horaChile: "21:00", primeraClase: "miércoles 7 de octubre", cupos: 15 },
  { id: "a21", cursoId: "a21", label: "Conversacional 1 (A2.1) · Martes 21:00 Chile · Abby", profeId: "abby", dia: "Martes", horaChile: "21:00", primeraClase: "martes 6 de octubre", cupos: 15 },
  { id: "topik2", cursoId: "topik2", label: "TOPIK II (B1+) · Jueves 21:00 Chile · Jay", profeId: "jay", dia: "Jueves", horaChile: "21:00", primeraClase: "jueves 8 de octubre", cupos: 8 },
  { id: "ninos", cursoId: "ninos", label: "Coreano para Niños (8–12) · Lunes 18:00 Chile", profeId: "ninos", dia: "Lunes", horaChile: "18:00", primeraClase: "lunes 5 de octubre", cupos: 12 },
];

// 🌎 Conversión de horarios (octubre–noviembre 2026, Chile en horario de verano UTC-3).
export type TzRow = {
  horaChile: string;
  mexico: string;
  colombiaPeru: string;
  argentina: string;
  usaEste: string;
  espana: string;
  corea: string;
};
export type PaisKey = "chile" | keyof Omit<TzRow, "horaChile">;

export const TZ_ROWS: TzRow[] = [
  { horaChile: "18:00", mexico: "15:00", colombiaPeru: "16:00", argentina: "18:00", usaEste: "17:00 → 16:00", espana: "23:00 → 22:00", corea: "06:00 (día sig.)" },
  { horaChile: "20:00", mexico: "17:00", colombiaPeru: "18:00", argentina: "20:00", usaEste: "19:00 → 18:00", espana: "01:00 → 00:00 (día sig.)", corea: "08:00 (día sig.)" },
  { horaChile: "21:00", mexico: "18:00", colombiaPeru: "19:00", argentina: "21:00", usaEste: "20:00 → 19:00", espana: "02:00 → 01:00 (día sig.)", corea: "09:00 (día sig.)" },
];
export const TZ_NOTA =
  "España cambia de hora el 25 de octubre y EE.UU. el 1 de noviembre (se muestra antes → después). Chile, Argentina, México, Colombia, Perú y Corea no cambian durante el curso.";

export const PAISES: { key: PaisKey; label: string; corto: string; bandera: string; cambiaHora?: string }[] = [
  { key: "chile", label: "Chile", corto: "Chile", bandera: "🇨🇱" },
  { key: "argentina", label: "Argentina / Uruguay / Brasil", corto: "Argentina", bandera: "🇦🇷" },
  { key: "colombiaPeru", label: "Colombia / Perú / Ecuador", corto: "Col/Perú", bandera: "🇨🇴" },
  { key: "mexico", label: "México (CDMX)", corto: "México", bandera: "🇲🇽" },
  { key: "usaEste", label: "EE.UU. (hora del Este)", corto: "EE.UU. Este", bandera: "🇺🇸", cambiaHora: "En EE.UU. la hora cambia el 1 de noviembre (se muestra antes → después)." },
  { key: "espana", label: "España", corto: "España", bandera: "🇪🇸", cambiaHora: "En España la hora cambia el 25 de octubre (se muestra antes → después)." },
  { key: "corea", label: "Corea", corto: "Corea", bandera: "🇰🇷", cambiaHora: "Para Corea, las clases caen a la mañana del día siguiente." },
];
export function horaLocal(horaChile: string, pais: PaisKey): string {
  if (pais === "chile") return horaChile;
  const row = TZ_ROWS.find((r) => r.horaChile === horaChile);
  return row ? row[pais] : horaChile;
}
/** Adivina el país por la zona horaria del navegador (solo como valor inicial). */
export function paisPorTimezone(tz: string): PaisKey {
  if (/Santiago|Punta_Arenas/.test(tz)) return "chile";
  if (/Argentina|Montevideo|Sao_Paulo|Asuncion/.test(tz)) return "argentina";
  if (/Bogota|Lima|Guayaquil|Panama/.test(tz)) return "colombiaPeru";
  if (/Mexico_City|Merida|Monterrey|Guatemala|Costa_Rica|El_Salvador|Tegucigalpa/.test(tz)) return "mexico";
  if (/New_York|Miami|Toronto|Detroit|Havana|Santo_Domingo|Puerto_Rico/.test(tz)) return "usaEste";
  if (/Madrid|Europe\//.test(tz)) return "espana";
  if (/Seoul/.test(tz)) return "corea";
  return "chile";
}

// 📚 Cursos con syllabus de 8 semanas.
export type Sesion = { num: number; titulo: string; desc: string };

export type Curso = {
  cursoId: CursoId;
  nombreCorto: string; // "Básico 1 (A1.1)"
  cefr: string; // "A1.1"
  emoji: string;
  subtitulo: string; // "Primeras Palabras"
  koreanTitle: string;
  paso: number; // 1..5 en la escalera de adultos; 0 = ruta Niños
  grupo: "adultos" | "ninos";
  requiere: string | null; // texto del prerrequisito
  alias?: string; // nombre antiguo, p.ej. "Nivel 1 · julio 2026"
  libro: string;
  descripcion: string;
  logros: string[];
  sesiones: Sesion[];
  /** @deprecated usar nombreCorto + subtitulo */
  nombre: string;
  /** @deprecated usar cefr + requiere */
  nivel: string;
};

export const CURSOS: Curso[] = [
  {
    cursoId: "a11",
    emoji: "🌱",
    nombreCorto: "Básico 1 (A1.1)",
    cefr: "A1.1",
    subtitulo: "Primeras Palabras",
    koreanTitle: "첫 한국어",
    paso: 1,
    grupo: "adultos",
    requiere: null,
    alias: "Nivel 1 · julio 2026",
    nombre: "Básico 1 · Primeras Palabras",
    nivel: "A1.1 · desde cero",
    libro: "한글학교 한국어 1 + Lector de Hangul (tarea con audio nativo)",
    descripcion:
      "El punto de partida: aprender a leer el alfabeto coreano y decir tus primeras frases reales. El drilling de lectura vive en el Lector de Hangul como tarea gamificada, así la hora en vivo se usa para hablar y ser corregido.",
    logros: [
      "Leer cualquier sílaba en coreano (Hangul completo + batchim)",
      "Presentarte y presentar a tu familia",
      "Contar en los dos sistemas de números y decir la hora",
      "Decir a dónde vas, qué haces y qué te gusta",
    ],
    sesiones: [
      { num: 1, titulo: "가나다라 I · La sílaba", desc: "Vocales y consonantes básicas — lees tus primeras sílabas en voz alta" },
      { num: 2, titulo: "가나다라 II + 안녕하세요", desc: "Batchim y dobles · saludos · 저는 ~예요: te presentas con nombre y país" },
      { num: 3, titulo: "이게 뭐예요? · ¿Qué es esto?", desc: "이거/그거/저거 · 이에요/예요 · preguntas y respondes qué es cualquier cosa" },
      { num: 4, titulo: "우리 엄마예요 · Mi familia", desc: "Familia · el famoso 우리 · 누구예요? · números sino-coreanos" },
      { num: 5, titulo: "집이 어디예요? · Lugares", desc: "어디 · N에 있어요 · dices dónde vives y dónde están las cosas" },
      { num: 6, titulo: "학교에 가요 · Mi día", desc: "Presente -아/어요 · N에 가다 · cuentas a dónde vas cada día" },
      { num: 7, titulo: "Mi pieza y mis verbos", desc: "이/가 · 을/를 · 있다/없다 · describes tu pieza y qué haces" },
      { num: 8, titulo: "사과를 좋아해요 + examen", desc: "Gustos · repaso integral · mini-presentación final · certificado" },
    ],
  },
  {
    cursoId: "a12",
    emoji: "🚀",
    nombreCorto: "Básico 2 (A1.2)",
    cefr: "A1.2",
    subtitulo: "Pasado, presente y futuro",
    koreanTitle: "기초 한국어 2",
    paso: 2,
    grupo: "adultos",
    requiere: "Básico 1 (A1.1) o el Nivel 1 de julio",
    nombre: "Básico 2 · Pasado, presente y futuro",
    nivel: "A1.2 · requiere Básico 1",
    libro: "Uso de la gramática coreana · Nivel inicial (Korean Grammar in Use en español)",
    descripcion:
      "La continuación directa de Básico 1 (y del Nivel 1 de julio): del presente al pasado y al futuro. Cuentas lo que hiciste, planeas lo que harás y sumas las partículas que hacen sonar natural tu coreano. Termina con el examen A2 de la casa.",
    logros: [
      "Hablar en pasado, presente y futuro",
      "Decir qué no haces, qué no puedes y qué sabes hacer",
      "Comparar y precisar con 보다, 처럼, 마다, 밖에…",
      "Conversar 5 minutos seguidos en coreano",
    ],
    sesiones: [
      { num: 1, titulo: "Re-presentación + diagnóstico", desc: "이다/있다 consolidados · repaso activo de Básico 1 · diagnóstico oral" },
      { num: 2, titulo: "Números aplicados", desc: "Sino y nativos en la vida real: edad, cumpleaños, hora (몇 시) y teléfono" },
      { num: 3, titulo: "Presente completo", desc: "-아/어요 + irregulares de uso diario · describes tu rutina con 10 verbos" },
      { num: 4, titulo: "El pasado · -았/었어요", desc: "부터~까지 · cuentas qué hiciste el fin de semana (mini-diario)" },
      { num: 5, titulo: "El futuro · -(으)ㄹ 거예요", desc: "-거나 · planeas tus vacaciones soñadas" },
      { num: 6, titulo: "Negación y habilidad", desc: "안 · 못 · -지 않아요 · -(으)ㄹ 수 있다/없다: qué no haces y qué sabes hacer" },
      { num: 7, titulo: "Partículas pro", desc: "의 · 도 · 만 · 쯤 · 처럼 · 보다 · 한테 · 밖에 · 마다 — precisión de nativo" },
      { num: 8, titulo: "Conectores + examen A2", desc: "-고 · -지만 · conversas 5 minutos · examen A2 + oral · certificado" },
    ],
  },
  {
    cursoId: "a21",
    emoji: "💬",
    nombreCorto: "Conversacional 1 (A2.1)",
    cefr: "A2.1",
    subtitulo: "Corea que amas",
    koreanTitle: "회화 A2.1",
    paso: 3,
    grupo: "adultos",
    requiere: "Básico 2 (A1.2) o test de nivel",
    nombre: "Conversacional 1 · Corea que amas",
    nivel: "A2.1 · requiere Básico 2 o test de nivel",
    libro: "Módulos conversacionales propios (K-pop, viajes, comida…) · con profesora nativa",
    descripcion:
      "Puro hablar: cada semana un tema de la Corea que amas — K-pop, Jeju, comida, hanbok, e-sports — con una profesora coreana nativa y grupos pequeños. La mitad de las sesiones son laboratorio oral.",
    logros: [
      "Conversar sobre tus temas favoritos de Corea",
      "Planear y contar un viaje",
      "Pedir y recomendar comida como local",
      "Perder el miedo a hablar con una nativa",
    ],
    sesiones: [
      { num: 1, titulo: "Orientación + diagnóstico oral", desc: "Romper el hielo · fijar tus metas personales de conversación" },
      { num: 2, titulo: "K-pop y cultura fan", desc: "Hablar de tu grupo, tu bias y los conciertos" },
      { num: 3, titulo: "Viajes: Jeju y Seúl", desc: "Planear y contar viajes por Corea" },
      { num: 4, titulo: "Cultura gastronómica", desc: "Pedir, recomendar y describir sabores" },
      { num: 5, titulo: "Lab de conversación 1", desc: "Práctica oral pura en grupos pequeños (módulos 1–3)" },
      { num: 6, titulo: "Hanbok y estética", desc: "Describir y opinar" },
      { num: 7, titulo: "PC방 y e-sports", desc: "La Corea gamer" },
      { num: 8, titulo: "Lab 2 + evaluación oral", desc: "Evaluación de etapa · certificado A2.1 · invitación a Conversacional 2 (enero)" },
    ],
  },
  {
    cursoId: "topik2",
    emoji: "🎯",
    nombreCorto: "TOPIK II (B1+)",
    cefr: "B1+",
    subtitulo: "Estrategia de examen",
    koreanTitle: "토픽 II 준비반",
    paso: 5,
    grupo: "adultos",
    requiere: "Nivel intermedio (B1)",
    nombre: "Preparación TOPIK II",
    nivel: "B1+ · examen oficial",
    libro: "Exámenes TOPIK oficiales + material de estrategia propio",
    descripcion:
      "Grupo chico (máx. 8) enfocado 100% en el examen oficial: estrategia por sección, corrección personalizada de escritura (쓰기) y simulacros cronometrados. Ideal si apuntas al TOPIK de abril 2027.",
    logros: [
      "Dominar la estrategia de cada sección del examen",
      "Escribir los formatos 51–54 con corrección personal",
      "Rendir un simulacro completo cronometrado",
      "Salir con un plan de estudio personal hasta tu examen",
    ],
    sesiones: [
      { num: 1, titulo: "Diagnóstico + radiografía del TOPIK II", desc: "Simulacro diagnóstico · cómo se puntúa · tu nivel de partida" },
      { num: 2, titulo: "읽기 I · Lectura", desc: "Preguntas 1–20: tipos, trampas y manejo del tiempo" },
      { num: 3, titulo: "듣기 I · Escucha", desc: "Dictado activo · preguntas 1–20 · notas mientras escuchas" },
      { num: 4, titulo: "쓰기 51–52", desc: "Completar oraciones: los puntos más rentables del examen" },
      { num: 5, titulo: "쓰기 53 · El gráfico", desc: "Describir datos en 200–300 caracteres con la plantilla que funciona" },
      { num: 6, titulo: "읽기/듣기 II · Nivel 4–6", desc: "Las preguntas difíciles: inferencia, orden y actitud del hablante" },
      { num: 7, titulo: "쓰기 54 · El ensayo", desc: "Opinión en 600–700 caracteres · estructura + corrección personal" },
      { num: 8, titulo: "Simulacro final + plan personal", desc: "Examen completo cronometrado · análisis · tu plan hasta el TOPIK real" },
    ],
  },
  {
    cursoId: "ninos",
    emoji: "🧒",
    nombreCorto: "Coreano para Niños (8–12)",
    cefr: "8–12 años",
    subtitulo: "Juega y aprende",
    koreanTitle: "어린이 한국어",
    paso: 0,
    grupo: "ninos",
    requiere: null,
    nombre: "Coreano para Niños",
    nivel: "8–12 años · desde cero",
    libro: "Material propio Academia Seúl + Lector de Hangul",
    descripcion:
      "Coreano desde cero para niños y niñas, con juegos, canciones y dibujos. Aprenden a leer el alfabeto, presentarse y decir sus primeras frases — y terminan con un mini-show para la familia.",
    logros: [
      "Leer sus primeras palabras en coreano",
      "Presentarse: nombre y edad",
      "Contar del 1 al 10 y nombrar animales y comidas",
    ],
    sesiones: [
      { num: 1, titulo: "¡Hola, Corea! · 안녕하세요", desc: "Saludos con canciones + primeras vocales jugando" },
      { num: 2, titulo: "Mi nombre en coreano", desc: "Consonantes básicas + cada uno escribe su nombre en 한글" },
      { num: 3, titulo: "La fábrica de sílabas", desc: "Armar y leer sílabas + bingo de lectura" },
      { num: 4, titulo: "Los animales · 동물", desc: "10 animales + '¡es un…!' (이에요/예요) con dibujos" },
      { num: 5, titulo: "Mi familia · 가족", desc: "엄마, 아빠, 할머니… presentar a la familia con una foto o dibujo" },
      { num: 6, titulo: "Los números mágicos", desc: "Contar del 1 al 10 + decir la edad" },
      { num: 7, titulo: "¡Ñam! Comida coreana", desc: "김밥, 라면, 불고기 + 'me gusta' (좋아해요)" },
      { num: 8, titulo: "🎤 Show final + certificado", desc: "Mini-presentación en coreano para las familias + certificado" },
    ],
  },
];

// Peldaño futuro (enero 2027) — aparece en la escalera pero no tiene clase abierta.
export const CONVERSACIONAL_2 = {
  nombreCorto: "Conversacional 2 (A2.2)",
  cefr: "A2.2",
  subtitulo: "Corea por dentro",
  paso: 4,
  requiere: "Conversacional 1 (A2.1)",
  cuando: "enero 2027",
  href: "/notificarme?curso=conversacion",
};

export const cursoDe = (clase: Clase): Curso => CURSOS.find((c) => c.cursoId === clase.cursoId)!;
export const cursoPorId = (id: CursoId): Curso => CURSOS.find((c) => c.cursoId === id)!;
export const clasesDe = (cursoId: CursoId): Clase[] => CLASES.filter((c) => c.cursoId === cursoId);
/** Texto de profe para una clase: "Guiran" */
export const profeCorto = (clase: Clase): string => profeDe(clase.profeId).corto;
/** "Martes o jueves 20:00" para un curso con varias secciones. */
export function horarioDe(cursoId: CursoId, pais: PaisKey = "chile"): string {
  const cs = clasesDe(cursoId);
  if (!cs.length) return "";
  const dias = cs.map((c) => c.dia.toLowerCase());
  const hora = horaLocal(cs[0].horaChile, pais);
  const diasTxt = dias.length > 1 ? `${dias.slice(0, -1).join(", ")} o ${dias[dias.length - 1]}` : dias[0];
  return `${diasTxt.charAt(0).toUpperCase()}${diasTxt.slice(1)} ${hora}`;
}
/** Primera clase disponible de un curso (para deep links ?clase=). */
export const primeraClaseDe = (cursoId: CursoId): ClaseId => clasesDe(cursoId)[0].id;

// 📄 PDFs descargables (public/programas/, generados con scratchpad/make_programas_pdf.js).
const PDF_SLUG: Record<CursoId, string> = {
  ninos: "Ninos",
  a11: "Basico1",
  a12: "Basico2",
  a21: "ConversacionalA21",
  topik2: "TOPIK2",
};
export const PROGRAMA_GENERAL_PDF = "/programas/Programa_Cursos_Octubre_2026.pdf";
export function pdfDe(cursoId: CursoId): string {
  return `/programas/Programa_${PDF_SLUG[cursoId]}_Octubre_2026.pdf`;
}
