// ⚙️ CONFIGURACIÓN DE LA COHORTE · OCTUBRE 2026
//
// Fuente única de verdad del programa: precios, clases, horarios (con zonas
// horarias) y syllabus de 8 semanas. La leen /nivel-1 (matrícula), /programa
// (syllabus público), la home (Courses) y el checkout de Mercado Pago.
//
// Para cerrar la matrícula cuando arranque la cohorte: COHORTE_ABIERTA = false.

export const COHORTE_ABIERTA = true;

export const PROXIMA_COHORTE_LABEL = "Octubre 2026";
export const INICIO_LABEL = "Semana del 5 de octubre de 2026";
export const INICIO_ISO = "2026-10-05";
export const FIN_LABEL = "Semana del 23 de noviembre de 2026";

// 💵 Precios (USD) — cada curso: pago único o mensual.
export const PRECIO_UNICO = 150;
export const PRECIO_MENSUAL = 75;
export const MESES = 2;

// 🔗 Links de pago PayPal (crear en PayPal → Pay Links / botones con monto fijo).
// TODO(Jay): generar el link nuevo por US$150 y otro por US$75 y pegarlos aquí.
// Mientras PAYPAL_LINK_MENSUAL esté vacío, el plan mensual se coordina por WhatsApp.
export const PAYPAL_LINK_UNICO = "https://www.paypal.com/ncp/payment/5X33QK4A928FU";
export const PAYPAL_LINK_MENSUAL = "";

// 🔗 Hotmart (checkout en la moneda del alumno: USD/EUR/moneda local — ideal
// para alumnos fuera de LatAm). Los botones solo aparecen cuando el link existe.
// TODO(Jay): crear el producto en hotmart.com y pegar aquí los links de checkout.
export const HOTMART_LINK_UNICO = "";
export const HOTMART_LINK_MENSUAL = "";

export const WHATSAPP = "56942115562";

export type ClaseId =
  | "ninos"
  | "a11-martes"
  | "a11-jueves"
  | "a21"
  | "a12"
  | "topik2";

export type Clase = {
  id: ClaseId;
  cursoId: "ninos" | "a11" | "a12" | "a21" | "topik2";
  label: string; // para selects y correos
  nombre: string;
  koreanTitle: string;
  nivel: string;
  profe: string;
  dia: string;
  horaChile: string; // "18:00"
  primeraClase: string; // "lunes 5 de octubre"
  emoji: string;
  cupos: number;
};

export const CLASES: Clase[] = [
  {
    id: "ninos",
    cursoId: "ninos",
    label: "🧒 Coreano para Niños · Lunes 18:00 Chile",
    nombre: "Coreano para Niños",
    koreanTitle: "어린이 한국어",
    nivel: "A1.1K · 8–12 años",
    profe: "Por anunciar",
    dia: "Lunes",
    horaChile: "18:00",
    primeraClase: "lunes 5 de octubre",
    emoji: "🧒",
    cupos: 12,
  },
  {
    id: "a11-martes",
    cursoId: "a11",
    label: "🌱 Básico 1 (A1.1) · Martes 20:00 Chile · Prof.ª Guiran",
    nombre: "Básico 1 · Primeras Palabras",
    koreanTitle: "첫 한국어",
    nivel: "A1.1 · desde cero",
    profe: "Prof.ª Guiran (기란)",
    dia: "Martes",
    horaChile: "20:00",
    primeraClase: "martes 6 de octubre",
    emoji: "🌱",
    cupos: 15,
  },
  {
    id: "a11-jueves",
    cursoId: "a11",
    label: "🌱 Básico 1 (A1.1) · Jueves 20:00 Chile · Prof.ª Guiran",
    nombre: "Básico 1 · Primeras Palabras",
    koreanTitle: "첫 한국어",
    nivel: "A1.1 · desde cero",
    profe: "Prof.ª Guiran (기란)",
    dia: "Jueves",
    horaChile: "20:00",
    primeraClase: "jueves 8 de octubre",
    emoji: "🌱",
    cupos: 15,
  },
  {
    id: "a21",
    cursoId: "a21",
    label: "💬 Conversacional A2.1 · Martes 21:00 Chile · Prof.ª Abby",
    nombre: "Conversacional A2.1 · Corea que amas",
    koreanTitle: "회화 A2.1",
    nivel: "A2.1 · requiere A1",
    profe: "Prof.ª Abby (홍미영)",
    dia: "Martes",
    horaChile: "21:00",
    primeraClase: "martes 6 de octubre",
    emoji: "💬",
    cupos: 15,
  },
  {
    id: "a12",
    cursoId: "a12",
    label: "🚀 Básico 2 (A1.2) · Miércoles 21:00 Chile · Prof. Jay",
    nombre: "Básico 2 · Tu primer año coreano",
    koreanTitle: "기초 한국어 2",
    nivel: "A1.2 · requiere Básico 1",
    profe: "Prof. Jay (김재희)",
    dia: "Miércoles",
    horaChile: "21:00",
    primeraClase: "miércoles 7 de octubre",
    emoji: "🚀",
    cupos: 15,
  },
  {
    id: "topik2",
    cursoId: "topik2",
    label: "🎯 Preparación TOPIK II · Jueves 21:00 Chile · Prof. Jay",
    nombre: "Preparación TOPIK II",
    koreanTitle: "토픽 II 준비반",
    nivel: "B1+ · examen oficial",
    profe: "Prof. Jay (김재희)",
    dia: "Jueves",
    horaChile: "21:00",
    primeraClase: "jueves 8 de octubre",
    emoji: "🎯",
    cupos: 8,
  },
];

// 🌎 Conversión de horarios (octubre–noviembre 2026, Chile en horario de verano UTC-3).
// España resta 1 hora desde el 25 de octubre (fin del horario de verano europeo);
// EE.UU. resta 1 hora desde el 1 de noviembre. México CDMX no cambia (sin DST).
export const TZ_NOTA =
  "España cambia de hora el 25 de octubre y EE.UU. el 1 de noviembre (la tabla muestra antes → después). Chile, Argentina, México, Colombia, Perú y Corea no cambian durante el curso.";

export type TzRow = {
  horaChile: string;
  mexico: string;
  colombiaPeru: string;
  argentina: string;
  usaEste: string;
  espana: string;
  corea: string;
};

export const TZ_ROWS: TzRow[] = [
  {
    horaChile: "18:00",
    mexico: "15:00",
    colombiaPeru: "16:00",
    argentina: "18:00",
    usaEste: "17:00 → 16:00",
    espana: "23:00 → 22:00",
    corea: "06:00 (día sig.)",
  },
  {
    horaChile: "20:00",
    mexico: "17:00",
    colombiaPeru: "18:00",
    argentina: "20:00",
    usaEste: "19:00 → 18:00",
    espana: "01:00 → 00:00 (día sig.)",
    corea: "08:00 (día sig.)",
  },
  {
    horaChile: "21:00",
    mexico: "18:00",
    colombiaPeru: "19:00",
    argentina: "21:00",
    usaEste: "20:00 → 19:00",
    espana: "02:00 → 01:00 (día sig.)",
    corea: "09:00 (día sig.)",
  },
];

// 📚 Syllabus de 8 semanas por curso (para /programa y /nivel-1).
export type Sesion = { num: number; titulo: string; desc: string };

export type Curso = {
  cursoId: Clase["cursoId"];
  nombre: string;
  koreanTitle: string;
  nivel: string;
  libro: string;
  descripcion: string;
  logros: string[]; // "al terminar vas a poder…"
  sesiones: Sesion[];
};

export const CURSOS: Curso[] = [
  {
    cursoId: "ninos",
    nombre: "Coreano para Niños",
    koreanTitle: "어린이 한국어",
    nivel: "A1.1K · 8 a 12 años",
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
      { num: 8, titulo: "🎤 Show final + diploma", desc: "Mini-presentación en coreano para las familias + certificado" },
    ],
  },
  {
    cursoId: "a11",
    nombre: "Básico 1 · Primeras Palabras",
    koreanTitle: "첫 한국어",
    nivel: "A1.1 · desde cero absoluto",
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
    nombre: "Básico 2 · Tu primer año coreano",
    koreanTitle: "기초 한국어 2",
    nivel: "A1.2 → A2 · requiere Básico 1 (o quiz de nivel)",
    libro: "Uso de la gramática coreana · Nivel inicial (Korean Grammar in Use en español)",
    descripcion:
      "El curso que te lleva del presente al pasado y al futuro: cuentas lo que hiciste, planeas lo que harás y sumas las partículas que hacen sonar natural tu coreano. Termina con el examen A2 de la casa.",
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
    nombre: "Conversacional A2.1 · Corea que amas",
    koreanTitle: "회화 A2.1",
    nivel: "A2.1 · requiere A1 completo (o quiz de nivel)",
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
      { num: 8, titulo: "Lab 2 + evaluación oral", desc: "Evaluación de etapa · certificado A2.1 · invitación a A2.2 (enero)" },
    ],
  },
  {
    cursoId: "topik2",
    nombre: "Preparación TOPIK II",
    koreanTitle: "토픽 II 준비반",
    nivel: "B1+ · para rendir el examen oficial 한국어능력시험",
    libro: "Exámenes TOPIK oficiales + material de estrategia propio",
    descripcion:
      "Grupo chico (máx. 8) enfocado 100% en el examen: estrategia por sección, corrección personalizada de escritura (쓰기) y simulacros cronometrados. Ideal si apuntas al TOPIK de abril 2027.",
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
];

export function cursoDe(clase: Clase): Curso {
  return CURSOS.find((c) => c.cursoId === clase.cursoId)!;
}
