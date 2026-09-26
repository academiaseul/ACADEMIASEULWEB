# Fase 3 · Básico 2 (A1.2) · Diseño del curso
### Pasado, presente y futuro · 기초 한국어 2 · cohorte octubre 2026 · la columna vertebral para los 8 redactores

**Documento interno de Dirección Académica · versión 1.1 (control final de continuidad: sección J) · sábado 26 de septiembre de 2026**
Para Jay y para el equipo que redacta las 8 guías del profesor y el material de los alumnos. Nada de este archivo se entrega tal cual a los alumnos: los recuadros marcados **Texto para el alumno** están listos para copiarse en su material.

> **Cómo leer este documento**
> - **Manda lo publicado.** Temas, gramática, unidades del libro, práctica, tareas, cultura y evaluación salen de `Programa_Completo_Octubre_2026/fuente/cursos_es.json` (curso `a12`), que ya está en el PDF `public/programas/Programa_Basico2_Octubre_2026.pdf`, en el programa público (`Curriculo/publico/Programa_Basico2_A1-2.md`) y en la Guía del Alumno. Aquí se ordena, se precisa y se completa, sin contradecirlo.
> - **[YA]** = mejora de la Fase 1 que se aplica en octubre sin cambiar nada publicado. **[ENE]** = va al anexo I (enero 2027). **⚑** = coreano o dato que se valida antes de usarlo (en este curso lo valida Jay, que es nativo; para usos muy actuales en Corea, segunda opinión de Abby). **DECISIÓN DE JAY** = nombres, políticas o textos públicos.
> - **[regla del certificado: pendiente de decisión de Jay]** aparece donde la ficha `a12` y la Guía del Alumno no coinciden (sección E).
> - **PROFE** = material con respuestas, notas y tiempos (va a `profes/`). **ALUMNO** = material sin respuestas ni notas internas (va a `alumnos/`). No se mezclan nunca en un mismo archivo.
> - El libro *Uso de la gramática coreana · Nivel inicial* (edición en español de *Korean Grammar in Use · Beginning*) se cita por unidad, tal como lo hace la ficha publicada ("Tiempos 03", "Partículas 08"). **No se copian sus explicaciones, ejemplos ni ejercicios:** todos los ejemplos de este documento son originales. ⚑ La numeración de unidades es la de la ficha publicada: confirmarla con el ejemplar antes de citar páginas (este documento no cita páginas).

**Hechos fijos (no se tocan)**

| | |
|---|---|
| Curso | Básico 2 (A1.2) · Pasado, presente y futuro · 기초 한국어 2 · código KOR 102 |
| Profesor | Jay Kim (김재희): coreano nativo, nació en Seúl y creció en Chile; explica en español, conversa, felicita y corrige en coreano |
| Sección | Una sola: **miércoles 21:00–22:00** (hora de Chile, UTC−3 todo el curso) = jueves 09:00 en Corea · máximo 15 alumnos · Zoom con salas de grupos |
| Duración | 8 semanas · 1 clase de 60 minutos. Es la única clase del miércoles en la cuenta de Zoom: **se planifica con los 60 minutos completos** (termina a las 22:00) |
| Fechas | S1 mié 14 oct · S2 21 oct · S3 28 oct · S4 4 nov · S5 11 nov · S6 18 nov · S7 25 nov · S8 mié 2 dic |
| Libro | *Uso de la gramática coreana · Nivel inicial*: Fundamentos 01–05 · Tiempos 01–04 · Negación 01–03 · Habilidad 01 · Partículas 05, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17 · Enumeración y contraste 01–03 |
| Ecosistema | Lector de Hangul (`/lector-coreano`: Practicar → Sílabas, Batchim, Números, Palabras, Pictogramas; Aprender 7 "Dos maneras de contar") · Dubu (`/dubu`, solo como remedial) · taller en video (`/taller`) · 918 clips nativos en `public/audio/kr` (entre ellos, todos los números 1–99 en las dos series, la frase 세 시 삼십 분 y, desde el 26 sept, un clip por cada fila de la lista C y por cada frase clave: `../audio/Clips_Octubre_2026.md`) |
| Alumnos reales de octubre | Ex-alumnos del Nivel 1 de julio (hoy Básico 1) + quienes entran por el test de nivel. **Básico 1 de octubre corre en paralelo**: sus egresados llegan recién en enero. El grupo será mixto (sección B0) |
| Hitos | Diagnóstico oral en la S1 (mapa del grupo el vie 16 oct) · quizzes en línea S3 y S5 · mitad del curso en la S4 (comentario + guía de estudio, dom 8 nov) · tarjeta del oral y parejas en la S7 · simulacro corto el lun 30 nov · examen escrito + conversación evaluada **dentro** de la clase 8 (mié 2 dic) · audios de reposición hasta el vie 4 dic · certificados el lun 7 dic |

**Qué hace este documento en una frase:** convierte el syllabus publicado de Básico 2 en un mapa semana a semana que 8 redactores pueden usar sin inventar nada, con un tope de 3 estructuras nuevas por clase (la S7 incluida), sin usar nada antes de enseñarlo, con un grupo mixto nivelado desde la S1 y sin enseñar y evaluar lo mismo el último día.

---

## 0. Para los 8 redactores: reglas de trabajo

1. **Una semana por redactor.** Tu fuente es tu bloque de la sección B, la lista maestra (C) **hasta tu semana** y, para lo que el alumno ya trae, la lista C de Básico 1 (`../Fase2_Basico1/00_Diseno_Basico1.md`) y la tabla B0.1. Si una palabra o estructura no está en ninguna de las dos antes de tu semana, no la uses; si la necesitas, márcala como fórmula y avísalo en tu entrega.
2. **Dos archivos por semana, siempre separados** (convención en G.3): `profes/S0N_Guia_Profesor.md` (secuencia de 60 minutos, explicaciones desde el español, errores previsibles, claves, guion de slides, plan B) y `alumnos/S0N_Material_Alumno.md` (hoja de la sesión, ejercicios, tarjetas de sala y la tarea con destino exacto; sin respuestas ni notas internas). Las piezas que cruzan semanas usan `B2_<Pieza>`.
3. **Mismo formato que la Fase 2**, para que el sistema sea uno solo: las guías tienen *0. En una mirada · A. Ficha de la semana (17 campos) · B. Plan de clase minuto a minuto (60 minutos · termina a las 22:00) · C. Guía del profesor (C.1 a C.17) · D. ⚑ Para revisar con nativo y pendientes · E. Anexo "Enero 2027"*; los materiales, *1. Esta semana vas a poder decir… · 2. Vocabulario · 3. Gramática, explicada desde el español · 4. Cómo suena · 5. Diálogo · 6. Ejercicios · 7. En clase · 8. Nota cultural · 9. Tarea de la semana · 10. Ya puedo decir…* (G.3).
4. **Speaking-first:** abre tu guía con "Después de esta clase puedo decir…" (tus frases de B) y marca el ciclo R-C-G-L de cada estructura: reconocer → práctica controlada → producción guiada → producción libre. El programa publica que "el alumno produce una frase propia desde el primer ejemplo": el primer C de cada estructura es una frase **sobre él mismo**.
5. **Sin romanización** (sección D). La pronunciación va en Hangul entre corchetes: 먹었어요 [머거써요].
6. **Tareas exactas:** pestaña, sección y "3 rondas seguidas" del Lector tal como aparecen en B. El Lector no deja elegir el modo (rota solo: Lectura → Escucha → Inversa) ni el grupo (cambia cada 3 rondas y **recuerda dónde quedó cada alumno**). Por eso se pide "rondas seguidas hasta que el encabezado diga…".
7. **Coreano:** natural, 해요체 para hablar (-ㅂ니다/습니다 solo en la S3, como lo pone el syllabus), con 띄어쓰기 y partículas según 받침. Si dudas, **⚑**. No inventes expresiones.
8. **Cultura conectada a una frase** que el alumno dice (frase ancla), con el matiz [YA] de B y sin generalizar ("muchos", "en Seúl", "en mi familia"; nunca "los coreanos" + verbo en presente general). En Básico 2 la frase anti-estereotipo es parte del contenido: **사람마다 달라요** (S7).
9. **Jay no produce material** (Fase 1 §14.4: es el cuello de botella de octubre). Revisa y aprueba. Todo lo visual lo hace producción con la plantilla de la casa.
10. **Voz Academia Seúl:** cálida, moderna, creíble; humor cuando calza; nada infantil para adultos; emojis con moderación. **Nunca texto rojo** (acento azul `#4236F6`), tampoco en íconos, cruces ni "semáforos": los niveles del diagnóstico son A · B · C, no colores.

---

## A. Diseño del curso (los 16 campos del brief §8)

**1 · Nombre del curso.** Básico 2 (A1.2) · Pasado, presente y futuro.

**2 · Nombre coreano.** 기초 한국어 2 ("coreano básico 2").

**3 · Nivel CEFR (con la regla honesta de la Fase 1).** *El código del nombre describe el tramo del temario, no el nivel logrado.* Fórmula interna: "Básico 2 (A1.2): trabajas los contenidos de la segunda etapa del nivel A1 del Marco Común Europeo (MCER)". Horas reales: 8 h en vivo + tarea (núcleo de 25–30 min × 7 ≈ 3,5 h; con los extras publicados, hasta ~2 h por semana ≈ 14 h) ≈ **11–22 h** guiadas; acumuladas desde cero, **≈ 27–39 h** para un ex-alumno de julio (16,5 h en julio) y ≈ 23–37 h para quien venga de Básico 1. Lo esperable al terminar: **un A1 en los temas centrales, con primeras islas de A2 (rutina y pasado)** (Fase 1 §13), 250–320 palabras activas acumuladas y 450–600 pasivas.
Dos textos publicados no se sostienen con esas horas (Fase 1 §3.4): el certificado "**CEFR A1 completo (A2 parcial)** · preparación TOPIK I niveles 1–2" y el nombre "**examen A2 de la casa**" para un curso A1.2. No se tocan sin Jay: la línea del certificado es la **DECISIÓN DE JAY 2** (recomendación: "Básico 2 (A1.2) · contenidos del nivel A1 (MCER)"); el examen, en clase y en los materiales, se llama **"examen final"** (el programa público ya lo hace), y en los documentos internos "examen final (publicado como 'examen A2 de la casa')".

**4 · Alumno objetivo.** Adultos hispanohablantes (Latinoamérica, España y EE.UU.) que leen Hangul, se presentan y hablan en presente, y quieren contar qué hicieron y qué van a hacer. **En octubre, en concreto:** (a) ex-alumnos del Nivel 1 de julio, que estudiaron el libro 한글학교 한국어 1 hasta las lecciones 8–9 con romanización entre corchetes en todo el material (B0); (b) personas que aprendieron por su cuenta (K-pop, K-dramas, apps) y pasaron el test de nivel de 5 preguntas, con un perfil impredecible: buen oído para el 반말 de las canciones, partículas débiles, a veces dependientes de la romanización; (c) eventualmente, alguien con raíces coreanas que entiende más de lo que lee. Estudian de noche, después del trabajo; hasta 15 por grupo.

**5 · Prerrequisitos.** Publicados: Básico 1 (A1.1) o el Nivel 1 de julio aprobado, o el test de nivel; "en la práctica: leer cualquier sílaba en Hangul, presentarse (저는 ~예요), manejar 이에요/예요 y 있어요/없어요, contar con los sino-coreanos y formar el presente -아요/어요 con verbos regulares. No se enseña el alfabeto". Reales: los de la tabla B0.1. Técnicos: Zoom con cámara y micrófono, audífonos y **teclado coreano instalado** (el examen de la clase 8 se tipea: se reutiliza la guía de teclado de Básico 1, G.2). Edad: la misma regla que Básico 1 (DECISIÓN DE JAY 10 de la Fase 1).

**6 · Promesa del curso.** *"Pasa de frases sueltas a contar tu vida en coreano: lo que hiciste, lo que haces y lo que vas a hacer."* (la del programa público).

**7 · Objetivos de aprendizaje** (los 6 publicados, sin cambios):
1. Hablar de tu rutina, tu pasado y tus planes usando los tres tiempos: -아요/어요 (presente), -았어요/었어요 (pasado) y -(으)ㄹ 거예요 (futuro).
2. Usar los números sino-coreanos y nativos en la vida real: edad, cumpleaños, hora (몇 시) y teléfono.
3. Decir qué no haces, qué no puedes y qué sabes hacer con 안, 못 y -(으)ㄹ 수 있어요/없어요.
4. Comparar y precisar como un nativo con las partículas 보다, 처럼, 마다, 밖에, 만, 도 y 한테.
5. Encadenar frases con -고 (y) y -지만 (pero) y conversar 5 minutos seguidos en coreano sin volver al español.
6. Aprobar el examen A2 de la casa y la evaluación oral, y quedar listo para Conversacional 1 (A2.1).
*Cómo se leen en octubre:* el 4 se cumple con **producción** de 도/만, 보다/더 y 마다 y **uso guiado o reconocimiento** de 밖에, 처럼 y 한테 (B.8); el 5, con -고 y -지만 usados como fórmula desde la S3 y la S6 y sistematizados en la S8 (E.6).

**8 · Resultados esperados ("puede hacer").** *Siempre en los temas que practicó, con un interlocutor paciente y con preparación cuando se indica.* Dice y entiende su edad, la fecha, un cumpleaños, la hora y un teléfono · cuenta su rutina con unos 20 verbos en presente, incluidos los irregulares de todos los días · cuenta su fin de semana en 6–8 frases en pasado (cuándo, dónde, con quién) · cuenta sus planes en futuro, dice cómo va a ir y ofrece alternativas · dice qué no hace, qué no puede y qué sabe hacer, y rechaza una invitación con una razón y 다음에 · compara dos cosas y dice "también", "solo" y "cada" · une dos ideas con -고 y -지만 · conversa unos 5 minutos con un compañero sobre 6 temas del curso, con pausas y sin pasar al español · reconoce el estilo -ㅂ니다 cuando lo oye.
**Todavía no:** pedir y comprar con soltura, decir "quiero" (-고 싶다), dar razones más allá de 그래서 y -지만, pedir favores con cortesía (-(으)세요, -아/어 주세요), honoríficos, entender audio auténtico a velocidad real.

**9 · Vocabulario requerido.** **172 entradas** en la lista maestra (C): **95 de núcleo publicado** (12 por semana y 10 en la S7; se producen y se evalúan; 15 de ellas ya estaban en Básico 1 o en julio y se reactivan) + 77 del tema, paradigmas, fórmulas, reconocimiento y cultura. Carga semanal: 16–24 filas. Meta: 250–320 activas acumuladas al terminar. Reglas: núcleo = se produce y entra en quiz y examen; del tema = se usa en clase y se reconoce; paradigma = se aprende como serie (números, meses, días); fórmula = se imita sin explicar la regla; reconocimiento = lo dice Jay o es cultura, no se pide ni se evalúa.

**10 · Gramática** (tope: 3 estructuras nuevas por clase; conteo en B.10):
S1 reactivación + contraste 은/는 vs 이/가 con preguntas → S2 nativos con contador (살, 시) · fechas y minutos con sino-coreanos · 에 de tiempo → S3 irregulares ㅂ/ㄷ/으 (+ 르 como forma fija) · 에서 vs 에 (+ -ㅂ니다 para reconocer; -고 como fórmula) → S4 -았/었어요 (e 이었어요/였어요) · 부터~까지 / 에서~까지 · 하고 / (이)랑 → S5 -(으)ㄹ 거예요 · -거나 / N(이)나 · (으)로 → S6 안 / -지 않아요 · 못 (+ -지 못해요 para reconocer) · -(으)ㄹ 수 있어요/없어요 (+ -지만 como fórmula) → S7 도 / 만 · 보다 + 더 · 마다 (+ 밖에, 한테 y 처럼 en frases guiadas; 쯤 y 의 para reconocer) → S8 -고 y -지만 pasan de fórmula a regla + integración, examen y conversación evaluada.

**11 · Pronunciación.** En Básico 2 **las reglas de sonido se explican** (Fase 1 §6.4), siempre con la palabra del curso por delante: la 연음 (직업이에요 [지거비에요], 먹었어요 [머거써요]) · el 비음화 de -ㅂ니다/습니다 (갑니다 [감니다], 먹습니다 [먹씀니다]) y de 못 + ㅁ/ㄴ (못 먹어요 [몬머거요]) · la tensión después de -(으)ㄹ (갈 거예요 [갈꺼에요], 할 수 있어요 [할쑤이써요]) · la aspiración con ㅎ (못 해요 [모태요], 축하해요 [추카해요], 그렇지만 [그러치만]) · 같이 [가치] · 몇 월 [며둴] · la ㅎ que se cae (좋아요 [조아요]). *Se corrige siempre* (nota publicada): la vocal de apoyo tras el 받침 (밥 → "ba-bu"), ㅓ/ㅗ y las tensas ㄲ/ㄸ/ㅃ. *Se deja pasar* (nota publicada): la entonación y la ㄹ entre vocales.

**12 · Cultura.** Eje de Básico 2 (Fase 1 §10.3): **Corea en el tiempo** — "¿cómo organiza un coreano su día, su año y su edad?". Capas: contemporánea + generacional. Lo que el alumno sabe *hacer*: presentarse con 인사 y 반갑습니다 · entender por qué se pregunta la edad (y el 만 나이) · el 미역국 del cumpleaños · la despedida de la oficina · el small talk del lunes (주말 잘 보냈어요?) · las vacaciones cortas · rechazar sin decir "no" (못 + razón + 다음에) · el 수능 (la clase de la S6 cae en pleno examen) · decir **사람마다 달라요** en vez de generalizar · 수고했어요 y a quién se le dice. Cada semana tiene su **frase ancla** (B) y el matiz [YA] que Jay dice en voz, sin tocar el PDF.

**13 · Speaking.** Los 20 minutos de pares no se recortan nunca (publicado): **≥ 20 minutos de cada clase con los alumnos hablando coreano en salas de 2–3**, más drill y producción en la lección; unos 11–13 minutos de habla por alumno y clase. Cada semana cierra la sala con el **minuto libre** [YA] (3 minutos sin guion, tarjeta de B.11) y la clase con **3 alumnos que resumen en una frase** (publicado) y **las 3 frases clave en coro** [YA] (B.12). Producción final: conversación de 5 minutos en pares sobre 6 temas + audio de 1 minuto en tres tiempos (F).

**14 · Lectura.** De la frase al mini-texto (Fase 1 §7.3): frases modelo (S1–S3) → horario y agenda (S2–S4) → mini-diario de 4–6 frases (S4) → itinerario (S5) → mensaje de invitación y de rechazo tipo KakaoTalk (S6) → comparaciones (S7). [YA] **1 ítem con formato TOPIK I en cada quiz** (E.3). Lectura en voz alta con la 연음 marcada. Meta interna: leer un mensaje de 60–80 sílabas y responder 3 preguntas en 3 minutos.

**15 · Escritura.** Teclado en todas las semanas (mini-diario por WhatsApp, examen tipeado). Producción: 3 frases de mini-diario (S4) → plan de 4 frases (S5) → 5 frases comparando (S7) → 5 frases personales en el examen → guion de 6–8 frases en tres tiempos para el audio final. 띄어쓰기 que se corrige desde la S2: partícula pegada al sustantivo (저는, 회사에서) y **separado** lo que en español parece una sola palabra: 갈 거예요, 할 수 있어요, 안 가요, 못 가요, 운동 안 해요. Registro: 해요체; -ㅂ니다 solo en la presentación formal de la S3.

**16 · Listening.** Audioteca Chingu (Fase 1 §9.3): A1 = los números 1–99 de las dos series y 세 시 삼십 분 (clips del sitio, en el Lector) + desde el 26 sept, un clip SunHi de cada palabra de la lista C y de cada frase clave, enlazado con 🔊 en el material del alumno · A2 = **las 3 frases clave de cada clase** (24 frases con la voz de Jay, B.12) · A6 = un ítem TOPIK I de escucha en los quizzes que lo permitan. En clase: dictados de números, horas y fechas (S2), la "escucha selectiva" -아요 / -ㅂ니다 (S3, publicada), dictado de partículas en formato de examen (S7). Meta publicada: entender edad, fecha y hora "a velocidad normal"; en la práctica, **a la velocidad natural de Jay en clase, sin exagerar la pronunciación** (ningún audio del curso es auténtico todavía: A3–A4 van a [ENE]).

---

## B0. Nivelación: quién llega, qué trae y cómo se atiende un grupo mixto

### B0.1 Lo que trae cada perfil frente a lo que pide Básico 2

Fuentes: para julio, `A1_Nivel_1/Guia_Estudio_MidTerm_A1.docx` (capítulos 0–8, el registro más fiel de lo que se dio en clase), `Examen_MidTerm_A1.docx` y los apuntes fechados de Jay (del 8 de agosto al 12 de septiembre, lecciones 1–9 del libro). El plan original de 11 sesiones (`00_Curriculum/`, carpetas `05_` a `11_`: fechas, comprar, pasado, futuro, invitar) **no se dio así**: la clase siguió el libro, y pasado y futuro aparecieron solo como "bonus de la clase 10" (갔어요 · 갈 거예요, "no entra al examen"). ⚑ **Jay confirma** que las sesiones 05–11 del plan original no se dictaron y si hubo clases después del 12 de septiembre.

| Pieza | Nivel 1 de julio (ex-alumnos) | Salida de Básico 1 (Fase 2; llegan desde enero) | Lo que pide la entrada publicada de `a12` | Consecuencia en Básico 2 |
|---|---|---|---|---|
| Lectura de Hangul | Completa, **con romanización "a la española" entre corchetes en todo el material** ([cho-nun], [ga-io]) | Completa, sin romanización desde la S5; notación [ ] en Hangul | "Leer cualquier sílaba con soltura, batchim incluido" | La mayor diferencia de julio no es de contenido: es de **hábito**. La política D se explica el día 1 |
| Teclado coreano | No consta | Instalado desde la S1 | No se menciona (pero el examen se tipea) | Guía de teclado en el mensaje de bienvenida y chequeo en la S1 |
| 이에요/예요 · 이/가 아니에요 | Sí (L2–L3) | Sí (S2–S3) | Sí | Reactivar (S1) |
| 은/는 y 이/가 | 은/는 como tema; 이/가 con 있어요 | 은/는 en 저는 y 우리 가족은; 이/가 con 있어요; contraste solo para reconocer (S7) | "Repaso contrastivo" en la S1 | **Primer uso productivo del contraste** para casi todos (S1) |
| 있어요/없어요 + 에 | Sí (L5, "hay / tener") | Sí ("está en" S5 · "hay" S7) | Sí | Reactivar, sumando "tener" (형제가 있어요?) |
| 을/를 | Sí (L8) | Sí (S7) | No se nombra | Se da por sabido; se corrige desde la S1 |
| 에서 | **No** | Solo reconocer (3번 출구에서 만나요) | No | Nuevo para todos (S3); se corrige desde la S1 como "error de base" (nota publicada) |
| Presente -아요/어요 | ~10–12 verbos (가요, 와요, 봐요, 먹어요, 마셔요, 읽어요, 그려요, 써요, 해요, 입어요, 신어요) | ~20 verbos; 들어요 como forma fija | "Con verbos regulares" · "unos 10 verbos" | Reactivar (S1) y completar con irregulares (S3) |
| 좋아해요 / 싫어해요 | Sí (L9) | Sí (S8) | — | Reactivar como vocabulario |
| 안 | **안 + verbo** (학교에 안 가요) | Solo la frase fija 안 좋아해요 | "En Básico 1 solo con 안 좋아해요" (S6 publicada) | S6: repaso para julio, nuevo para Básico 1 |
| Sino-coreanos | 1–100 (+ 백, 천 nombrados) | 1–100 + 공 para teléfonos | Sí | Reactivar; en S2 se aplican a fechas y minutos |
| Nativos | **1–10** con 한/두/세/네 y contadores 개 · 명 · 잔 | 1–5, solo con 명 | "Formas cortas antes del contador" (S2) | S2: 11–99 (스물, 서른…) nuevo para todos |
| Hora | **Vista**: 세 시 삼십 분, 몇 시예요? ("el gran mestizaje") | **No** (prohibida en Básico 1) | S2 | S2: repaso parcial para julio, nuevo para Básico 1 |
| Edad y fechas | No (la sesión 05 no se dio ⚑) | No | S2 | Nuevo para todos |
| Pasado y futuro | Solo vistos como bonus (갔어요 · 갈 거예요) | Solo oídos en la lámina final de la S8 | S4 y S5 | Nuevo para todos (julio los "reconoce") |
| Otros de julio | 제 동생 (제 como palabra) · 여보세요 · 만나서 반갑습니다 · 커피 두 잔 주세요 · la idea de los niveles de formalidad (가 / 가요 / 갑니다 / 가세요) | 우리, 이분, 저기요, 명 | — | Ventajas que se aprovechan: 제 en la S1, -ㅂ니다 en la S3 |
| Horas acumuladas | 16,5 h en vivo (11 × 90 min) | 8 h en vivo | — | Julio llega con más horas, pero **con 4 semanas sin clase** y con muleta de romanización |

**Quien entra por el test de nivel** (5 preguntas de autodeclaración, Fase 1 §12): perfil típico, cada caso se confirma en el diagnóstico. Suele traer **oído** (canciones, dramas: 사랑해, 괜찮아, 했어), formas en 반말 que hay que llevar a 해요체, partículas débiles u omitidas, a veces lectura lenta o apoyada en la romanización, y huecos sueltos (puede saber 했어 y no saber 에). Si alguien de este grupo no lee 받침 con fluidez en la S1, la recomendación es Básico 1 (martes o jueves 20:00, que parten la misma semana): **DECISIÓN DE JAY 9** (la norma publicada solo habla de cambios de sección hasta la S2, no de cambio de curso).

### B0.2 El diagnóstico oral de la S1 (2 minutos por alumno, sin nota)

Lo publicado: "Diagnóstico oral individual de 2 minutos con Jay en una sala aparte, mientras el resto juega '있어요/없어요' con los objetos de su escritorio (en la clase 1 no hay quiz ni drill: esos 10 minutos se suman al bloque de pares para alcanzar a los 15)". Así se hace:

**Logística (21:25–21:55).** Todos pasan a salas de 2–3 con la tarjeta de sala de la S1. Jay se queda en la **sala principal** y llama por "Transmitir mensaje" a dos alumnos por vez ("Camila y Daniel: vuelvan a la sala principal"); mientras uno hace su diagnóstico, el otro espera con la cámara apagada y el micrófono silenciado (así no hay tiempo muerto en el cambio). Ajustes de Zoom: salas con **"permitir que los participantes vuelvan a la sesión principal"** y **"permitir elegir sala"** activados (⚑ probarlo con dos dispositivos antes del 14 de octubre). Con 30 minutos caben 12–13 diagnósticos. **Quien no alcance** (y quien falte a la S1) manda el mismo diagnóstico como audio por WhatsApp antes del **domingo 18 de octubre**: las 6 preguntas van en su tarjeta, y se responde sin leer.

**Guion fijo (Jay pregunta; el alumno responde sin leer; 1:40 de conversación + 0:20 de lectura).**

| # | Pregunta de Jay | Qué mide | Lo que pasa si no sale |
|---|---|---|---|
| 1 | 안녕하세요! 이름이 뭐예요? 어느 나라 사람이에요? | 이에요/예요 · rutina de saludo | Jay repite más despacio y pasa a la 2 |
| 2 | 어디에 살아요? | -아요 con un verbo nuevo (lo imita) · 에 | Acepta "산티아고예요" y lo marca |
| 3 | 형제가 있어요? (o 가족이 몇 명이에요?) | 있어요/없어요 como "tener" · nativos con 명 | Jay muestra la foto de su familia como modelo |
| 4 | 매일 뭐 해요? (pide 2–3 cosas) | -아요/어요 con verbos del curso · 을/를 · 에/에서 | Anota si dice 회사에 일해요* (error de base) |
| 5 | (muestra su escritorio) 책상 위에 뭐가 있어요? | 이/가 · posiciones · vocabulario de objetos | — |
| 6 | **Extra, solo si las 5 salieron fluidas:** 어제 뭐 했어요? · 몇 시에 일어나요? | Marca si ya trae pasado u hora | Si no sale, es lo esperable: no baja nada |
| Lectura (20 s) | Lee en voz alta, desde la pantalla: **직업이에요 · 생일 · 없어요 · 좋아해요 · 읽어요** | 연음 · ㅐ · tensión escondida [업써요] · ㅎ que se cae · 받침 doble | Si deletrea sílaba por sílaba, lectura = C |

**Planilla del diagnóstico (PROFE; una fila por alumno).** Cinco columnas con **A · B · C** y una de "trae":

| Dimensión | A · sólido | B · en camino | C · a reforzar |
|---|---|---|---|
| Lectura (tarjeta de 5 palabras) | Fluida, aplica la 연음 | Correcta pero lenta | Deletrea o se traba en el 받침 |
| Comprensión | Entiende las preguntas a la primera | Necesita una repetición | Necesita español o reformulación |
| Estructuras (이에요 · 있어요 · -아요 · partículas) | Casi todo bien | Se entiende, con errores de partícula | Frases incompletas o sin verbo conjugado |
| Vocabulario | Responde sin buscar palabras | Busca algunas | Muy limitado |
| Pronunciación | ㅓ/ㅗ, 받침 y tensas bien | Vocal de apoyo o ㅓ/ㅗ a veces | Cuesta entenderle |
| **Trae** (marcar) | pasado · futuro · hora · edad · 안 + verbo · 에서 · 반말 · romanización (escribe o pide letras latinas) | | |

**Perfil del alumno** = la letra que más se repite (con dos C en Lectura o Estructuras, el perfil es C). **Salida:** el **mapa del grupo** (vie 16 oct), que Jay usa para (1) armar las parejas de la S2 en adelante: **A + B o B + B, nunca A + A** (nota publicada: "fuerte + medio, nunca fuerte + fuerte"); los C van en trío con un A y un B; (2) decidir quién recibe la **tarjeta reto** y quién la **tarjeta rescate** de cada semana (B0.3); (3) mandar a cada alumno una línea personal con el primer comentario ("tu punto fuerte es… · esta semana fíjate en…"). El diagnóstico **no lleva nota** (publicado) y es el "antes" del audio de 1 minuto de la S8.

**Evidencia escrita que lo completa:** la Hoja 1 (tarea publicada de la S1: 10 frases con 이에요/예요, 있어요/없어요 y 은/는 · 이/가 + 3 frases sobre la familia) y el audio de 30 s de re-presentación. Si la hoja muestra partículas en C y el oral en A, manda la hoja: el examen es escrito.

### B0.3 Tres herramientas para el grupo mixto (todas dentro de lo publicado)

1. **Parejas por perfil** (arriba). Se rehacen en la S4 con la evidencia de mitad de curso.
2. **Tarjeta reto y tarjeta rescate** en el material de cada semana (misma tarea núcleo para todos; cambia el extra). El reto de las S3–S5 es lo que la nota publicada de diferenciación propone ("a quien vaya rápido dale -고 있어요 y el formal -ㅂ니다 como extra"); el rescate, lo que propone para quien va lento ("reduce la lista de verbos de la semana 3 a 6 y pídele solo el audio, no la hoja"). El rescate **nunca** quita la parte oral.
3. **Rol de experto.** En las semanas en que julio ya vio algo (hora en la S2, 안 en la S6), el ex-alumno de julio abre la sala explicando en 1 minuto, en español, lo que recuerda; después la tarjeta es igual para los dos.

**Plan de nivelación para perfil C en lectura** (2 semanas, antes de la S3): Lector → Aprender 6 "El truco del batchim" + Practicar → Batchim y Sílabas, 3 rondas seguidas cada día; Dubu, barrios 5 Río Han y 6 Estación de Seúl (solo oído: la palabra no se muestra, se escucha y se arma); el taller en video (`/taller`) desde el segundo 2414 si falta base. Opcional: **clínica de lectura** de 12 minutos antes de la clase 2 y la 3 (mié 20:45–20:57, mismo Zoom) **(DECISIÓN DE JAY 10)**.

### B0.4 Qué es repaso para unos y nuevo para otros, semana a semana

| S | Tema | Ex-julio | Entró por test (típico) | Egresado de Básico 1 (desde enero) | Qué hace Jay en octubre |
|---|---|---|---|---|---|
| 1 | Re-presentación | Repaso, **sin los corchetes** de siempre | Repaso con huecos (partículas, 에) | Repaso | Diagnóstico · mensaje "adiós romanización" · 에 vs "ser/estar" desde el día 1 |
| 2 | Números aplicados | Repaso: nativos 1–10, 몇 시, 세 시 삼십 분 · Nuevo: edad, fechas, 스물… | Suele contar 하나–열 de canciones; nuevo lo demás | Todo nuevo salvo sino 1–100 | Julio como "experto" de la hora en sala · reto: 몇 월 며칠 + 오전/오후 · rescate: Lector → Números, solo "sino" y "nativos" |
| 3 | Presente completo | Repaso de -아요; nuevo: irregulares, 에서, -ㅂ니다 (ya vio 갑니다 como "nivel formal") | Lleva formas 반말 (먹어, 해) a 해요체 | Repaso de ~20 verbos; 들어요 deja de ser "forma fija" | Reto: -고 있어요 · rescate: 6 verbos + audio (nota publicada) |
| 4 | Pasado | Reconoce 갔어요 (bonus); lo demás nuevo | Puede traer 했어 de los dramas: se sube a 했어요 | Nuevo | Mini-diario oral: quien ya lo trae abre la ronda |
| 5 | Futuro | Reconoce 갈 거예요 (bonus) | Puede traer 할 거야 | Nuevo | Reto: 뭐 타고 갈 거예요? · rescate: solo -(으)ㄹ 거예요 + 로 |
| 6 | Negación y habilidad | **Repaso de 안 + verbo**; nuevo: 못, -(으)ㄹ 수 | 못 de canciones; -(으)ㄹ 수 nuevo | 안 nuevo con otros verbos (solo conocía 안 좋아해요) | Julio "experto" de 안 · reto: -지 않아요 / -지 못해요 en la hoja · rescate: solo 안 y 못 |
| 7 | Partículas | 제 ya conocido; lo demás nuevo | 도/만 a veces de oído | 저도요 como fórmula; lo demás nuevo | 3 en producción para todos; reto: 처럼 y 한테 en frases propias |
| 8 | Conectores + evaluación | -고 y -지만 vistos como fórmula en este curso | Igual | Igual | Nadie ve nada por primera vez el día del examen (E.6) |

---

## B. Mapa de 8 semanas

### B.0 Vista rápida

| S | Fecha | Unidad del libro | Tema | Estructuras nuevas | Frase clave | Recurso | Evaluación |
|---|---|---|---|---|---|---|---|
| 1 | mié 14 oct | Fundamentos 01–02 | Re-presentación + diagnóstico | 1 (contraste 은/는 vs 이/가) + reactivación | 산티아고에 살아요. | Lector: Sílabas + Batchim | Sin quiz · diagnóstico oral (sin nota) |
| 2 | mié 21 oct | Fundamentos 03–05 | Números aplicados | 3 (nativos con 살/시 · fechas y minutos · 에 de tiempo) | 생일이 언제예요? | Lector: Aprender 7 + Números | Quiz 1 |
| 3 | mié 28 oct | Tiempos 01–02 | Presente completo · mi rutina | 2 (irregulares · 에서 vs 에) + -ㅂ니다 para reconocer + fórmula -고 | 회사에서 일해요. | Lector: Palabras · quiz en línea 1 | Quiz 2 · quiz en línea 1 |
| 4 | mié 4 nov | Tiempos 03 · Partículas 08 | El pasado · -았/었어요 (mitad del curso) | 3 (-았/었어요 · 부터~까지 · 하고/(이)랑) | 주말에 뭐 했어요? | Lector: Números (Inversa) | Quiz 3 · chequeo de mitad |
| 5 | mié 11 nov | Tiempos 04 · Enumeración y contraste 02 · Partículas 13 | El futuro · -(으)ㄹ 거예요 | 3 (-(으)ㄹ 거예요 · -거나/(이)나 · (으)로) | 기차로 부산에 갈 거예요. | Lector: Palabras · quiz en línea 2 | Quiz 4 · quiz en línea 2 |
| 6 | mié 18 nov | Negación 01–03 · Habilidad 01 | Negación y habilidad | 3 (안 · 못 · -(으)ㄹ 수 있다/없다) + fórmula -지만 | 미안해요, 내일은 못 가요. | Lector: Pictogramas | Quiz 5 |
| 7 | mié 25 nov | Partículas 05, 09, 10, 11, 12, 14, 15, 16, 17 | Partículas pro | 3 en producción (도/만 · 보다+더 · 마다) + 3 guiadas + 2 para reconocer | 사람마다 달라요. | Hoja de partículas (formato examen) | Quiz 6 · dictado de partículas (formativo) |
| 8 | mié 2 dic | Enumeración y contraste 01 y 03 | Conectores + examen | 0 nunca vistas (-고 y -지만 pasan de fórmula a regla) | 한국어는 어렵지만 재미있어요. | Lector: Progreso (opcional) | Examen final escrito + conversación evaluada |

Romanización: ninguna semana (sección D). Los números entre corchetes de este documento siempre son Hangul: 먹었어요 [머거써요].

### B.1 La hora de clase (60 minutos completos)

La estructura publicada se respeta tal cual. Lo único que se agrega va **dentro** de sus bloques: el minuto libre (3 minutos finales de los pares) y las 3 frases clave (en el cierre, junto con el resumen de 3 alumnos que ya está publicado).

| Minuto | Hora | Bloque (publicado) | Cómo se usa en octubre |
|---|---|---|---|
| 0–5 | 21:00–21:05 | Quiz de la clase anterior (clases 2 a 7) | 4 ítems de la semana anterior + 1 ítem con formato TOPIK I [YA] (E.3), en el chat o en pantalla; se corrige la hoja de tarea en pantalla |
| 5–30 | 21:05–21:30 | Lección con el deck (25') | Máximo 3 estructuras; cada una **R → C** con una frase del alumno sobre sí mismo desde el primer ejemplo; contraste explícito con el español; 3 minutos de cultura con su frase ancla |
| 30–35 | 21:30–21:35 | Drill de transformación (5') | Cadena oral de 3 segundos por alumno; corrección de pronunciación al vuelo |
| 35–55 | 21:35–21:55 | Práctica oral en pares (20') | Salas de 2–3 por perfil (B0.2) · 17' de tarjeta + **3' de minuto libre** [YA] · Jay rota (≈ 2,5' por sala) · cierre automático a los 19' + 60 s de cuenta regresiva |
| 55–60 | 21:55–22:00 | Cierre y tarea (5') | 3 alumnos resumen la clase en una frase (publicado) · los 2–3 errores del día · **3 frases clave en coro** [YA] · tarea con destino exacto · anticipo del quiz |

**Semanas que cambian el formato:** **S1** no tiene quiz ni drill (publicado): 21:00–21:25 bienvenida, reglas, "adiós romanización" y lección de reactivación · 21:25–21:55 pares **30'** con el diagnóstico en la sala principal (B0.2) · 21:55–22:00 cierre. **S4** es la de mitad de curso: clase normal; el chequeo se hace con la evidencia que ya existe (E.4). **S7** usa el drill para el dictado de partículas con formato de examen (publicado) y los 20' de pares para las comparaciones y "Solo tengo…". **S8:** 21:00–21:10 calentamiento de conectores · 21:10–21:40 examen escrito en línea (30', cronometrado, con Jay presente) · 21:40–21:57 conversación evaluada en pares (consigna de 1' + 15' de salas, armadas durante el examen, + la vuelta) · 21:57–22:00 cierre en la sala principal con la frase ancla y el coro, que así queda grabado (logística en F.5; ⚑ S8-4).

### B.2 Semana 1 · mié 14 oct · Re-presentación + diagnóstico

| Campo | Semana 1 |
|---|---|
| Fecha | Miércoles 14 de octubre de 2026 · 21:00–22:00 (hora de Chile) · jueves 15, 09:00 en Corea |
| Unidad del libro | Fundamentos 01–02: 이다 (ser) y 있다 (haber · tener · estar) |
| Tema | Re-presentación + diagnóstico: te vuelves a presentar, ahora con detalle |
| **Después de esta clase puedo decir…** | 1. 안녕하세요! 저는 카밀라예요. 반갑습니다.<br>2. 저는 회사원이에요. 학생이 아니에요.<br>3. 제 고향은 멕시코예요. 지금은 칠레에 살아요.<br>4. 형제가 있어요? — 네, 오빠가 한 명 있어요.<br>5. 취미가 뭐예요? — 요리예요. 요즘 한국 요리를 배워요. |
| Gramática · carga: 1 + reactivación | • [reactiva] N이에요/예요 y N이/가 아니에요: 저는 학생이 아니에요 (publicado)<br>• [reactiva] 있어요/없어요 con N에 = "hay · está": 집에 강아지가 있어요; **nuevo uso: "tener"** = N이/가 있어요 (형제가 있어요? · 강아지가 있어요?)<br>• [nueva 1] **은/는 frente a 이/가, en producción**: la pregunta usa 이/가 (이름이 뭐예요? 고향이 어디예요? 누가 대학생이에요?) y la respuesta usa 은/는 cuando presentas un tema o contrastas (제 고향은 멕시코예요. 지금은 칠레에 살아요.). Regla de bolsillo: *은/는 = "en cuanto a…"; 이/가 = "el que…, la que…"*<br>• [reactiva] -아요/어요 con 살다 (살아요, primer verbo en ㄹ: aquí es regular), 일하다, 공부하다 (publicado)<br>• Error de base que se corrige desde hoy (nota publicada): "ser" y "estar" cruzados (저는 집이에요* → 집에 있어요) y 에 por 에서 (회사에 일해요* → se explica en la S3; hoy solo se marca)<br>• Léxico: 제 (mi, humilde: 제 이름, 제 고향; su porqué, en la S7) · 누가 · ___ 씨<br>• Ciclo: R = Jay se re-presenta en 6 frases con fotos · C = "¿이 o 은?" con las preguntas de la entrevista, cada uno con una frase suya · G = entrevista en pares con tarjeta y presentar al compañero en tercera persona (다니엘 씨는 멕시코 사람이에요. 대학생이에요.) (publicado) · L = minuto libre: 요즘 어떻게 지내요? sin guion |
| Vocabulario | **Núcleo publicado (12 ítems, 13 palabras; se evalúan):** 직업 profesión · 회사원 empleado/a de oficina (↺) · 대학생 estudiante universitario/a · 고향 ciudad natal · 취미 pasatiempo · 요즘 últimamente · 아직 todavía · 반갑습니다 encantado/a (↺) · 형제 hermanos · 남편 esposo · 아내 esposa · 강아지 perrito (↺) · 회사 empresa (↺)<br>**Del tema y fórmulas (8):** 살다 vivir · 제 mi (humilde) · 씨 (tras el nombre de un compañero) · 외동 hijo/a único/a ⚑ · 누가 quién (sujeto) · 숙제 tarea · 요즘 어떻게 지내요? [F] · ___ 씨는요? ¿y tú? [F]<br>**Cultura (2):** 인사 · 악수 [R]<br>Total de la semana: 23. |
| Expresiones | • 요즘 어떻게 지내요? — 잘 지내요. ___ 씨는요?<br>• 어디에 살아요? · 고향이 어디예요? · 형제가 있어요? · 취미가 뭐예요?<br>• (leve inclinación) 반갑습니다.<br>• Reconocer (lo dice Jay): 무슨 일 하세요? (la forma cortés de preguntar el trabajo) ⚑ D-5<br>• Frases clave del coro de cierre: 저는 회사원이에요. 학생이 아니에요. / 산티아고에 살아요. / 취미가 뭐예요? |
| Pronunciación | **Se explica la 연음:** si una sílaba termina en consonante y la siguiente empieza con ㅇ muda, la consonante "se muda": 직업이에요 [지거비에요] · 살아요 [사라요] · 있어요 [이써요] · 이름이 [이르미]. Se imitan: 대학생 [대학쌩] · 반갑습니다 [반갑씀니다] (la regla, en la S3). Se corrige: vocal de apoyo tras el 받침 (직업 → "chi-go-bu"), ㅓ/ㅗ en 고향 y 요즘, ㅟ de 취미 de un solo golpe. |
| Cultura | Capa contemporánea. **Publicado:** al conocerse, en Corea casi no se da la mano: se hace una pequeña reverencia (인사) y se dice 반갑습니다; preguntar la edad al presentarse sirve para saber cómo hablarle al otro. **Matiz [YA]** (Fase 1 §10.5): "al conocerse se hace una pequeña reverencia; en el trabajo también es común darse la mano, inclinando un poco la cabeza". **Frase ancla:** (inclinación) 반갑습니다. 저는 ___예요/이에요. La edad se anuncia hoy y se trabaja en la S2 (espiral: presentarse → edad y registro). **Puente:** en Latinoamérica la mano o el beso; en Corea, la inclinación hace ese trabajo. **Matiz de 씨:** entre compañeros, nombre + 씨 (다니엘 씨); a Jay, 선생님; nunca 씨 con tu propio nombre ⚑ D-3. |
| Recurso digital (exacto) | Lector → Practicar → **Sílabas, 3 rondas seguidas, y Batchim, 3 rondas seguidas** (el modo rota solo: en 3 rondas pasas una vez por Escucha, que es lo que pide el programa) → Progreso: captura. **Rescate (perfil C de lectura):** Aprender 6 "El truco del batchim" + Dubu, barrios 5 Río Han y 6 Estación de Seúl (solo oído) + taller en video (plan B0.3). |
| Tarea (prepara la clase siguiente) | ≈ 30 min, antes de la clase 2. (1) **Lector, 8 min:** Sílabas y Batchim, 3 rondas seguidas cada uno; captura de Progreso. (2) **Hoja 1, 12 min** (publicada): completar 10 frases con 이에요/예요, 있어요/없어요 y la partícula correcta (은/는 · 이/가) + 3 frases sobre tu familia. (3) **Audio de 30 s, 5 min** (publicado): tu re-presentación en 5 frases, sin leer, por el grupo. (4) **Prepara la S2, 3 min:** anota tu cumpleaños y tu edad en cifras, tu teléfono (real o inventado) y a qué hora te levantas, almuerzas y te acuestas. **Reto:** tipea tu re-presentación con 제 이름은… / 제 취미는…. **Rescate:** plan de nivelación (B0.3). |
| Entregable del alumno | Captura de Progreso · Hoja 1 · audio de 30 s · (si no alcanzó en clase o faltó) el audio de diagnóstico con las 6 preguntas de su tarjeta, antes del **dom 18 oct**. |
| Evaluación | **Sin quiz ni drill** (publicado). **Diagnóstico oral individual de 2 minutos, sin nota** (B0.2) + Hoja 1 → **mapa del grupo el vie 16 oct** (parejas, reto y rescate). Registro: asistencia (en vivo / grabación + tarea, en columnas separadas) **[regla del certificado: pendiente de decisión de Jay]** · turnos de habla. |
| Grupo mixto | Todo es repaso. Julio: primer día **sin corchetes** (texto de D en voz de Jay) · test: huecos de partículas y de 에 · todos: el error de "ser/estar" se corrige desde hoy. |

### B.3 Semana 2 · mié 21 oct · Números aplicados

| Campo | Semana 2 |
|---|---|
| Fecha | Miércoles 21 de octubre · 21:00–22:00 (hora de Chile) |
| Unidad del libro | Fundamentos 03–05: numerales sino-coreanos y nativos · fechas y días de la semana · la hora (몇 시) |
| Tema | Números aplicados: edad, cumpleaños, hora y teléfono |
| **Después de esta clase puedo decir…** | 1. 몇 살이에요? — 스물다섯 살이에요.<br>2. 생일이 언제예요? — 유월 십오 일이에요.<br>3. 지금 몇 시예요? — 밤 아홉 시 반이에요.<br>4. 몇 시에 일어나요? — 일곱 시에 일어나요.<br>5. 오늘은 시월 이십일 일 수요일이에요. |
| Gramática · carga: 3 | • [nueva 1] **Nativos con contador:** 1–99 (하나… 열 · 스물, 서른, 마흔…) con 살 (edad) y 시 (hora); **formas cortas** antes del contador: 한 시, 두 살, 세 시, 네 명, **스무 살** (스물 → 스무). Las decenas 서른, 마흔… solo para la edad (tarjeta [YA])<br>• [nueva 2] **Sino-coreanos aplicados** (reactivados): fechas (월 + 일; **유월** y **시월** pierden la consonante), minutos (분; 반 = y media) y teléfono (공). *Se escribe 6월 15일, se lee 유월 십오 일*<br>• [nueva 3] **N에 de tiempo:** 일곱 시에, 월요일에, 생일에; **nunca** con 오늘, 어제, 내일, 지금, 매일<br>• Léxico: 몇 (몇 살 · 몇 시 · 몇 월) · 며칠 (se escribe así, nunca "몇일") · 언제 · 오전/오후 · 아침/점심/저녁/밤 · días de la semana<br>• Reconocer [YA]: 천 · 만 · 원 en la tarjeta de números (el programa nombra "precios" en esta semana; se usan de verdad en la S7)<br>• Regla de bolsillo (hispanohablantes): **hora = nativo · minutos = sino · edad = nativo · fecha, teléfono y precio = sino**. 세 시 삼십 분 mezcla los dos en una frase<br>• Ciclo: R = calendario de octubre en pantalla y el reloj de Jay (지금 칠레는 밤 아홉 시예요. 한국은 아침 아홉 시예요.) · C = dictado de números en cadena (publicado) · G = reloj humano en pares (publicado) · L = encuesta de cumpleaños: 생일이 언제예요? a 3 compañeros → calendario del curso en pantalla (publicado) + minuto libre |
| Vocabulario | **Núcleo publicado (12):** 살 años (edad) · 생일 cumpleaños · 월 mes · 일 día del mes · 요일 día de la semana · 시 hora · 분 minuto · 반 y media · 오전 a. m. · 오후 p. m. · 전화번호 número de teléfono (↺) · 언제 cuándo<br>**Paradigmas (5):** nativos 1–10 · decenas 스물… 아흔 · formas cortas 한/두/세/네/스무 · los 12 meses (유월, 시월) · lunes a domingo<br>**Del tema (5):** 몇 · 며칠 · 아침 · 점심 · 저녁 (una fila) · 밤 · 천 · 만 · 원 (tarjeta, reconocer)<br>**Cultura (2):** 만 나이 · 미역국 [R]<br>Total de la semana: 24. |
| Expresiones | • 몇 살이에요? (entre compañeros) — ___ 살이에요. · Reconocer: 나이가 어떻게 되세요? (a un mayor; lo dice Jay)<br>• 생일이 언제예요? · 오늘은 며칠이에요? · 무슨 요일이에요? (reconocer)<br>• 지금 몇 시예요? · 몇 시에 ___아요/어요?<br>• 전화번호가 뭐예요? — 구, 팔칠육오, 사삼이일이에요.<br>• Frases clave del coro de cierre: 몇 살이에요? — 스물다섯 살이에요. / 생일이 언제예요? — 유월 십오 일이에요. / 일곱 시에 일어나요. |
| Pronunciación | Tensión después de ㄷ, ㄱ, ㅂ (se explica con los números): 몇 시 [멷씨] · 몇 살 [멷쌀] · 여섯 시 [여섣씨] · 일곱 시 [일곱씨] · **몇 월 [며둴]** (la ㅊ final suena ㄷ y se muda) · 십육 [심뉵] (se imita) · 유월 y 시월 (sin la consonante) · 이십일 일 [이시비릴] (연음 en cadena). |
| Cultura | Capa contemporánea + generacional. **Publicado:** la "edad coreana" tradicional (naces con un año y sumas uno cada Año Nuevo) y la internacional, **만 나이**, la única oficial desde junio de 2023: a veces se oyen dos números para la misma persona. **[YA]** La edad sirve para elegir cómo hablarle al otro: entre compañeros adultos, 몇 살이에요? es normal; a alguien claramente mayor, Jay muestra 나이가 어떻게 되세요? (se reconoce). **Frase ancla:** **생일에 미역국을 먹어요.** (en muchas familias el cumpleaños empieza con sopa de algas; vuelve en la S6 con el 수능). **Puente:** en Latinoamérica la torta y el "cumpleaños feliz"; en Corea también hay torta (케이크), pero el 미역국 es lo que "sabe a cumpleaños". |
| Recurso digital (exacto) | Lector → **Aprender 7 "Dos maneras de contar"** (explorador del 1 al 99 con las dos voces; toca el 🔊 de 세 시 삼십 분) + Practicar → **Números: rondas seguidas hasta hacer 3 con el encabezado "nativos" y 3 con "mezclados"** (el grupo cambia cada 3 rondas y el Lector recuerda dónde quedaste: si hoy empieza en "sino-coreanos", sigue de largo). En Números las opciones son cifras, no romanización; la línea de corrección sí la trae: tápala con el dedo. |
| Tarea (prepara la clase siguiente) | ≈ 30 min, antes de la clase 3. (1) **Lector, ≈ 12 min** (publicado: las tres series en Lectura y Escucha; Aprender 7 + Números). (2) **Hoja 2, 10 min** (publicada): tu edad, tu cumpleaños, tu teléfono y tres horas de tu día (levantarte, almorzar, dormir), en cifras **y** como se leen (6월 15일 → 유월 십오 일). (3) **Audio de 40 s, 6 min** (publicado): las horas de tu día normal en 5 frases con N에 (일곱 시에 일어나요…). (4) **Prepara la S3, 2 min:** anota 8 cosas que haces en un día normal (en español o con el verbo en diccionario). **Reto:** 몇 월 며칠 + 오전/오후 en la hoja. **Rescate:** en el Lector, solo "sino-coreanos" y "nativos". |
| Entregable del alumno | Captura de Progreso (Números) · Hoja 2 · audio de 40 s. |
| Evaluación | **Quiz 1** (abre la clase 2, sobre la S1; E.3). Observación en pares: ¿pone 에 con las horas y lo quita con 오늘/매일? |
| Grupo mixto | Julio es "experto" de la hora en su sala (1 minuto, en español, lo que recuerda de 세 시 삼십 분) · edad y fechas, nuevas para todos · quien trae números de canciones (하나, 둘, 셋) suele fallar en 스무 살 y 유월/시월: son los 2 ítems del quiz 2. |

### B.4 Semana 3 · mié 28 oct · Presente completo · mi rutina

| Campo | Semana 3 |
|---|---|
| Fecha | Miércoles 28 de octubre · 21:00–22:00 (hora de Chile) |
| Unidad del libro | Tiempos 01–02: presente cortés -아요/어요 completo y presente formal -ㅂ니다/습니다 · verbos irregulares de uso diario · 에서 frente a 에 |
| Tema | Presente completo: tu rutina real con 10 verbos |
| **Después de esta clase puedo decir…** | 1. 보통 일곱 시쯤 일어나요. 씻고 아침을 먹어요.<br>2. 아홉 시에 출근해요. 회사에서 일해요.<br>3. 요즘 너무 바빠요.<br>4. 오늘 산티아고는 더워요. 서울은 추워요. ⚑ D-6<br>5. 저는 카밀라입니다. 회사원입니다. 반갑습니다. (presentación formal breve) |
| Gramática · carga: 2 + reconocimiento + fórmula | • [reactiva] -아요/어요 completo (publicado): ㅏ/ㅗ → -아요 · el resto → -어요 · 하다 → 해요 · contracciones (가요, 봐요, 마셔요, 배워요)<br>• [nueva 1] **Irregulares de todos los días, como un solo paradigma:** ㅂ → 워요 (덥다 더워요 · 춥다 추워요 · 어렵다 어려워요 · 쉽다 쉬워요) · ㄷ → ㄹ ante vocal (듣다 들어요) · 으 se cae (바쁘다 바빠요 · 쓰다 써요) · 르 como forma fija (모르다 몰라요 · 빠르다 빨라요) · ㄹ: regular en -아요 (살아요, 놀아요) y se cae en -ㅂ니다 (삽니다). *Ojo:* no toda ㅂ o ㅅ final es irregular: 입다 → 입어요, 씻다 → 씻어요. Puente: como "tener → tengo" en español, son pocos y se aprenden usándolos<br>• [nueva 2] **에서 frente a 에:** 에 = donde algo **está**, a donde **vas**, **cuándo** (집에 있어요 · 회사에 가요 · 아홉 시에); 에서 = donde **ocurre una acción** (회사에서 일해요 · 집에서 쉬어요 · 카페에서 공부해요). Regla de bolsillo: *있다/없다 y 가다/오다 → 에; cualquier otra acción → 에서*. Con 살다 valen los dos (칠레에 살아요 / 칠레에서 살아요). En español las dos son "en": por eso es el error de base<br>• [reconocer] **-ㅂ니다/습니다:** vocal → -ㅂ니다 (갑니다) · consonante → -습니다 (먹습니다) · 이다 → 입니다 · ㄹ se cae (삽니다). Dónde se oye: metro (이번 역은 시청입니다), noticias, tiendas, presentaciones. Para producir, una sola fórmula: 저는 ___입니다. ___입니다. 반갑습니다.<br>• Fórmula [YA] (Fase 1): **-고** para unir dos acciones de la rutina: 씻고 아침을 먹어요 · 아침을 먹고 출근해요 · 일하고 운동해요 (la regla, en la S8). Con 일어나다 lo natural es 일어나서 씻어요: Jay lo dice, no se pide ⚑ D-8<br>• Palabra [YA]: **쯤** con horas (일곱 시쯤); vuelve en la S7<br>• Ciclo: R = el día de Jay en 6 fotos con horas · C = rueda de conjugación de 3 segundos; los irregulares valen doble (publicado) · G = "mi rutina" en pares y el compañero la cuenta al grupo (publicado) · L = minuto libre: 요즘 바빠요? + la escucha selectiva -아요 / -ㅂ니다 (publicada) como R del formal |
| Vocabulario | **Núcleo publicado (12):** 일어나다 (↺) · 씻다 · 아침을 먹다 · 출근하다 · 퇴근하다 · 쉬다 (↺) · 운동하다 (↺) · 듣다 (↺, ahora con la regla) · 바쁘다 · 덥다 · 춥다 · 모르다<br>**Del tema (10):** 쯤 · 보통 · 너무 · 수업 · 날씨 · 알다 · 어렵다 [A, núcleo de la S8] · 쉽다 [A, núcleo de la S8] · 빠르다 · -고 [F]<br>**Reconocer (2):** 이번 역은 ___입니다 · 먼저 들어가 보겠습니다 ⚑ D-7<br>Total de la semana: 24. |
| Expresiones | • 보통 몇 시에 일어나요? — 일곱 시쯤 일어나요.<br>• 요즘 바빠요? — 네, 너무 바빠요.<br>• 알아요? — 아니요, 몰라요.<br>• 날씨가 더워요 / 추워요.<br>• 저는 ___입니다. 반갑습니다. (formal)<br>• Frases clave del coro de cierre: 씻고 아침을 먹어요. / 회사에서 일해요. / 요즘 너무 바빠요. |
| Pronunciación | **Se explica el 비음화 de -ㅂ니다:** ㅂ ante ㄴ suena ㅁ → 갑니다 [감니다] · 입니다 [임니다] · 먹습니다 [먹씀니다] · 반갑습니다 [반갑씀니다]. 연음 con irregulares: 들어요 [드러요] · 더워요 · 씻어요 [씨서요]. 몰라요 y 빨라요: ㄹㄹ = una l larga. Se corrige: 바빠요 (ㅃ tensa, sin aire) · 퇴근해요 (ㅚ). |
| Cultura | Capa contemporánea. **Publicado:** en una oficina coreana el saludo cambia con la hora: 안녕하세요 al llegar y, si te vas antes que tus colegas, 먼저 가겠습니다; retirarse en silencio se nota. **Matiz [YA]** ⚑ D-7 (Fase 1 §10.5): lo más frecuente sería **먼저 들어가 보겠습니다**; se reconoce, no se pide. Decirlo como "en muchas oficinas", nunca "en Corea todos". **Frase ancla:** 아홉 시에 출근해요. 여섯 시에 퇴근해요. **Puente:** el "me voy, que les vaya bien" antes de salir de la pega. |
| Recurso digital (exacto) | Lector → Practicar → **Palabras, 3 rondas seguidas** (5 min, para mantener la velocidad de lectura; una de las rondas es Escucha). **[YA]** El programa pide "Contrarreloj en modo Escucha", que no existe (el Contrarreloj siempre es Lectura y se responde con romanización): queda como extra opcional. + **Quiz en línea de 10 preguntas** sobre presente e irregulares (formulario; publicado). |
| Tarea (prepara la clase siguiente) | ≈ 30 min, antes de la clase 4. (1) **Hoja 3, 12 min** (publicada): tabla de 20 verbos (12 regulares y 8 irregulares) en -아요/어요 y -ㅂ니다/습니다 (la columna formal se completa con la regla: es reconocimiento). (2) **Lector, 5 min:** Palabras, 3 rondas. (3) **Quiz en línea, 8 min** (se revisa al abrir la clase 4). (4) **Prepara la S4, 5 min:** escribe 5 cosas que hiciste el fin de semana pasado (en español o con el verbo en diccionario: 친구 만나다, 영화 보다…). **Reto** (nota publicada): 3 frases con -고 있어요 en la hoja. **Rescate** (nota publicada): 6 verbos y un audio de 30 s de tu rutina en lugar de la hoja completa. |
| Entregable del alumno | Hoja 3 · captura de Progreso · quiz en línea 1. |
| Evaluación | **Quiz 2** (sobre la S2) · **quiz en línea 1** (sobre la S3; se revisa en la clase 4). |
| Grupo mixto | Julio repasa -아요 y conoce la idea del "nivel formal" (갑니다) · quien trae 반말 de los dramas (먹어, 해) lo sube a 해요체 · irregulares y 에서, nuevos para todos. |

### B.5 Semana 4 · mié 4 nov · El pasado · -았/었어요 (mitad del curso)

| Campo | Semana 4 |
|---|---|
| Fecha | Miércoles 4 de noviembre · 21:00–22:00 (hora de Chile) |
| Unidad del libro | Tiempos 03: pasado -았어요/었어요 · Partículas 08: 부터~까지 · expresiones de tiempo pasado · 하고 / (이)랑 |
| Tema | El pasado: qué hiciste, cuándo, dónde y con quién |
| **Después de esta clase puedo decir…** | 1. 주말에 뭐 했어요? — 친구하고 카페에 갔어요.<br>2. 어제 집에서 쉬었어요. 드라마를 봤어요.<br>3. 아홉 시부터 여섯 시까지 일했어요. 너무 피곤했어요.<br>4. 지난주에 부산에 갔어요. 정말 재미있었어요.<br>5. 작년에는 대학생이었어요. 지금은 회사원이에요. |
| Gramática · carga: 3 | • [nueva 1] **-았어요/었어요**: la misma regla de la vocal que el presente (*si sabes el presente, sabes el pasado*): 가요 → 갔어요 · 봐요 → 봤어요 · 먹어요 → 먹었어요 · 마셔요 → 마셨어요 · 해요 → 했어요; los irregulares de la S3 siguen su regla (더웠어요, 들었어요, 바빴어요, 몰랐어요). Con sustantivos: **이었어요** tras 받침 (대학생이었어요) y **였어요** tras vocal (의사였어요). **Pasado coreano vs español:** hay un solo pasado para "fui", "iba" y "he ido"; lo que en español elige el verbo, en coreano lo dice el contexto (어제, 작년에). Lo habitual del pasado ("cuando era niño, iba…") es de Conversacional<br>• [nueva 2] **N부터 N까지** (desde… hasta, tiempo) y **N에서 N까지** (de… a, lugares): 아홉 시부터 여섯 시까지 · 서울에서 부산까지. El 에서 de "desde" es el de la S3, ahora como punto de partida<br>• [nueva 3] **N하고 / N(이)랑** (con; y): 친구하고 영화를 봤어요 · 동생이랑 놀았어요 (이랑 tras 받침, 랑 tras vocal; 하고 sirve siempre). Pregunta: 누구하고 갔어요?<br>• Léxico: tiempo con y sin 에 — 어제, 오늘 (sin 에) · 주말에, 지난주에, 작년에, 오늘 아침에 (con 에)<br>• Fórmula [YA] (desde la S3): -고 en pasado, con el tiempo **solo en el último verbo**: 밥을 먹고 커피를 마셨어요<br>• Ciclo: R = el fin de semana de Jay en 6 fotos · C = cadena de transformación: presente → pasado + un tiempo (publicada) · G = agenda ficticia en pares: 몇 시부터 몇 시까지 일했어요? · 어디에서 어디까지 갔어요? (publicada) · L = mini-diario oral del fin de semana con 2 preguntas del grupo: 누구하고 갔어요? 어디에서 먹었어요? (publicado) + minuto libre |
| Vocabulario | **Núcleo publicado (12):** 주말 · 어제 · 지난주 · 작년 · 여행하다 · 만나다 · 사다 · 놀다 · 영화를 보다 (↺) · 요리하다 (↺) · 재미있다 · 피곤하다<br>**Del tema (6):** 지난 주말 · 오늘 아침 · 같이 · 혼자 · 맛있다 · 누구하고 / 누구랑 [F]<br>**Reconocer (1):** 주말 잘 보냈어요?<br>Total de la semana: 19. |
| Expresiones | • 주말에 뭐 했어요? · 누구하고 갔어요? · 어디에서 먹었어요?<br>• 재미있었어요? — 네, 정말 재미있었어요. · 맛있었어요!<br>• Reconocer: 주말 잘 보냈어요? (el small talk del lunes)<br>• Frases clave del coro de cierre: 주말에 뭐 했어요? / 친구하고 영화를 봤어요. / 아홉 시부터 여섯 시까지 일했어요. |
| Pronunciación | 했어요 [해써요] · 갔어요 [가써요] · 먹었어요 [머거써요] · 만났어요 [만나써요] · 맛있었어요 [마시써써요] · **같이 [가치]** (se explica: ㅌ + 이 → 치, como en 같이 가요) · 재미있었어요 [재미이써써요]. Error típico: 먹았어요* / 먹어었어요* → drill de 3 segundos con la mano arriba para ㅏ/ㅗ (nota publicada). |
| Cultura | Capa contemporánea. **Publicado:** un fin de semana típico en Seúl se cuenta con 카페에 갔어요 y 집에서 쉬었어요; el café es el lugar por defecto para encontrarse, estudiar y descansar. **Matiz [YA]** (Fase 1 §10.5): sin la cifra de "densidad de cafeterías" (no tiene fuente): "hay cafés en todas partes y son el lugar para juntarse". **Frase ancla:** 주말 잘 보냈어요? — 네, 친구하고 카페에 갔어요. (lunes en la oficina o en la universidad). **Puente:** el "¿y, qué tal el finde?" de cada lunes. |
| Recurso digital (exacto) | Lector → Practicar → **Números: 3 rondas seguidas mientras el encabezado diga "nativos" o "mezclados"** (una de las 3 es Inversa, que es lo que pide el programa: ves la cifra y eliges el número en 한글; así 아홉 시부터 여섯 시까지 sale sin pensar). |
| Tarea (prepara la clase siguiente) | ≈ 28 min, antes de la clase 5. (1) **Mini-diario escrito, 5 min** (publicado): 3 frases en pasado sobre tu día de hoy, por el grupo (texto o foto del cuaderno). (2) **Lector, 8 min** (publicado 10). (3) **Hoja 4, 12 min** (publicada): 15 frases de presente a pasado + un texto corto con 부터~까지. (4) **Prepara la S5, 3 min:** elige un lugar al que quieres viajar y guarda una foto (la muestras en la clase 5). **Reto:** 2 frases del mini-diario unidas con -고. **Rescate:** mini-diario + 8 frases de la hoja. |
| Entregable del alumno | Mini-diario · captura · Hoja 4. |
| Evaluación | **Quiz 3** (sobre la S3) + revisión del quiz en línea 1. **Mitad del curso** (E.4): comentario de 3 líneas y guía de estudio, **dom 8 nov**. Se rehacen las parejas. |
| Grupo mixto | Julio reconoce 갔어요 (bonus de julio) · quien trae 했어 de los dramas lo sube a 했어요 · en el mini-diario oral, abre la ronda quien ya lo trae. |

### B.6 Semana 5 · mié 11 nov · El futuro · -(으)ㄹ 거예요

| Campo | Semana 5 |
|---|---|
| Fecha | Miércoles 11 de noviembre · 21:00–22:00 (hora de Chile) · en Corea ya es jueves 12 |
| Unidad del libro | Tiempos 04: futuro e intención -(으)ㄹ 거예요 · Enumeración y contraste 02: -거나 · Partículas 13: (으)로 (medio de transporte) |
| Tema | El futuro y tus planes: vacaciones soñadas y la próxima semana |
| **Después de esta clase puedo decir…** | 1. 이번 주말에 뭐 할 거예요? — 친구를 만날 거예요.<br>2. 내년에 한국에 갈 거예요. 비행기로 갈 거예요.<br>3. 토요일에 영화를 보거나 집에서 쉴 거예요.<br>4. 바다를 보고 사진을 찍을 거예요.<br>5. 다음 주에 같이 영화 봐요! — 좋아요! |
| Gramática · carga: 3 | • [nueva 1] **-(으)ㄹ 거예요** (futuro e intención; "voy a…" y "-ré" a la vez): vocal → -ㄹ 거예요 (갈 거예요, 볼 거예요) · consonante → -을 거예요 (먹을 거예요) · **ㄹ final: no se agrega nada** (살 거예요, 놀 거예요) · ㄷ irregular: 들을 거예요. Se escribe **separado**: 갈 거예요. Con el clima o con otra persona también es "probablemente" (내일 추울 거예요): se reconoce<br>• [nueva 2] **-거나** (o, entre verbos): 영화를 보거나 쉴 거예요 (como con -고, el tiempo va solo en el último verbo) · **N(이)나** (o, entre sustantivos): 커피나 차 · 빵이나 밥 (이나 tras 받침)<br>• [nueva 3] **N(으)로** (en, por: medio): 비행기로, 기차로, 버스로, 차로; tras ㄹ, solo 로 (지하철로); tras otra consonante, 으로 (손으로). **A pie** = 걸어서 (fórmula, sin 로). El mismo 로 de **이거 한국어로 뭐예요?**, la pregunta más útil del curso<br>• Léxico: futuro con y sin 에 — 내일 (sin 에) · 이번 주말에 · 다음 주에 · 내년에<br>• Fórmula [YA] **para invitar:** 같이 ___아요/어요! (같이 영화 봐요! · 같이 가요!) + 좋아요!. Reemplaza la pregunta publicada del role play (토요일에 영화를 보거나 산에 갈 거예요?), que pregunta por un plan y no invita (Fase 1 §15.1); -(으)ㄹ까요? se reconoce en voz de Jay (같이 갈까요?) y se enseña en Conversacional 1<br>• Fórmula [YA] (desde la S3): -고 en futuro: 바다를 보고 사진을 찍을 거예요<br>• Ciclo: R = las vacaciones soñadas de Jay con una foto · C = "tres tiempos, una frase" (publicado: Jay lanza un verbo y 어제 / 오늘 / 내일) · G = vacaciones soñadas en pares: plan de 3 días (어디에 갈 거예요? 언제? 뭐 할 거예요? 뭐로 갈 거예요?) presentado en 6 frases (publicado) · L = role play "quedemos" (publicado) con 같이 ___요! + minuto libre |
| Vocabulario | **Núcleo publicado (12):** 내일 · 다음 주 · 내년 · 휴가 · 계획 · 비행기 · 기차 · 바다 (↺) · 산 · 호텔 · 사진을 찍다 · 구경하다<br>**Del tema y fórmulas (9):** 이번 주말 · 버스 · 지하철 · 차 (auto; también "té") · 걸어서 [F] · 여름 · 방학 · 같이 ___요! / 좋아요! [F] · 이거 한국어로 뭐예요? [F]<br>**Reconocer (2):** 빼빼로데이 · 뭐 타고 갈 거예요?<br>Total de la semana: 23. |
| Expresiones | • 이번 주말에 뭐 할 거예요? · 휴가에 어디에 갈 거예요? · 뭐로 갈 거예요? (reconocer: 뭐 타고 갈 거예요?)<br>• 같이 ___아요/어요! — 좋아요!<br>• 이거 한국어로 뭐예요?<br>• Frases clave del coro de cierre: 다음 주에 뭐 할 거예요? / 기차로 부산에 갈 거예요. / 영화를 보거나 쉴 거예요. |
| Pronunciación | **Se explica la tensión después de -(으)ㄹ:** 갈 거예요 [갈꺼에요] · 먹을 거예요 [머글꺼에요] · 할 거예요 [할꺼에요] (se escribe 거, suena 꺼) · 거예요 se dice [거에요]. 사진을 찍을 거예요 [사지늘 찌글꺼에요] · 지하철로 (ㄹ + 로 = una l larga). Se corrige: 가을 거예요* / 먹ㄹ 거예요* con drill de 3 segundos (nota publicada). |
| Cultura | Capa contemporánea. **Publicado:** las vacaciones de verano en Corea son cortas: muchos trabajadores toman solo 3–5 días seguidos, a fines de julio o comienzos de agosto, así que el viaje típico es intenso: Jeju, Busan o Japón en un fin de semana largo. **Frase ancla:** **여름휴가에 제주도에 갈 거예요.** **Puente:** nuestras vacaciones largas de enero y febrero (hemisferio sur) frente a 3–5 días; y 휴가 (del trabajo) frente a 방학 (del colegio o la universidad, largas en verano y en invierno). **Gancho [YA]** (Fase 1 §10.6, 1 minuto): en Corea ya es jueves 12: 어제 한국은 빼빼로데이였어요 (fecha comercial, no tradición; y de paso, un pasado con 였어요). |
| Recurso digital (exacto) | Lector → Practicar → **Palabras, 3 rondas seguidas** (5 min). **[YA]** El programa pide el Contrarreloj, que siempre se responde con romanización: queda como extra (si lo juegas, di la palabra en voz alta antes de tocar y guarda tu marca en Progreso, como pide el programa). + **Quiz en línea 2** de 10 preguntas (futuro y expresiones de tiempo; publicado). |
| Tarea (prepara la clase siguiente) | ≈ 30 min, antes de la clase 6. (1) **Hoja 5, 12 min** (publicada): itinerario de viaje con -(으)ㄹ 거예요, -거나 y (으)로 (12 huecos) + tu plan del fin de semana en 4 frases. (2) **Lector, 5 min.** (3) **Quiz en línea 2, 8 min** (se revisa al abrir la clase 6). (4) **Prepara la S6, 5 min:** anota 3 cosas que sabes hacer (nadar, cocinar, manejar, tocar guitarra…) y 3 que no, y piensa en una invitación que tendrías que rechazar. **Reto:** 뭐 타고 갈 거예요? en tu itinerario + 2 frases con -고. **Rescate:** itinerario solo con -(으)ㄹ 거예요 y 로. |
| Entregable del alumno | Hoja 5 · captura de Progreso · quiz en línea 2. |
| Evaluación | **Quiz 4** (sobre la S4) · **quiz en línea 2** (sobre la S5; se revisa en la clase 6). |
| Grupo mixto | Julio reconoce 갈 거예요 (bonus de julio) · quien trae 할 거야 lo sube a 할 거예요 · el role play se arma con parejas nuevas (las de mitad de curso). |

### B.7 Semana 6 · mié 18 nov · Negación y habilidad

| Campo | Semana 6 |
|---|---|
| Fecha | Miércoles 18 de noviembre · 21:00–22:00 (hora de Chile) = **jueves 19, 09:00 en Corea: en ese momento se está rindiendo el 수능** |
| Unidad del libro | Negación 01–03: 안 / -지 않아요 · 못 / -지 못해요 · negaciones que son palabras propias · Habilidad 01: -(으)ㄹ 수 있어요/없어요 |
| Tema | Negación y habilidad: lo que no hago, lo que no puedo y lo que sé hacer |
| **Después de esta clase puedo decir…** | 1. 저는 고기를 안 먹어요.<br>2. 수영할 수 있어요? — 아니요, 수영 못 해요.<br>3. 매운 음식을 잘 못 먹어요.<br>4. 미안해요, 내일은 일이 있어서 못 가요. 다음에 같이 가요!<br>5. 운전은 할 수 있지만 수영은 못 해요. |
| Gramática · carga: 3 + fórmulas | • [nueva 1] **안 + verbo o adjetivo** (no, por decisión o estado) y **-지 않아요** (lo mismo, más escrito o formal): 안 먹어요 / 먹지 않아요 · 안 바빠요. Con N하다, 안 va en medio: 운동 안 해요 (nunca 안 운동해요*) (publicado)<br>• [nueva 2] **못 + verbo** (no poder: por circunstancia o por falta de habilidad): 못 가요 · 수영 못 해요 · 잘 못 먹어요; **-지 못해요** se reconoce (가지 못해요). **Para hispanohablantes:** "no voy" puede ser 안 가요 (decidí no ir) o 못 가요 (no puedo). Ante una invitación, 안 가요 suena a "no quiero": se usa 못 가요 + una razón<br>• [nueva 3] **-(으)ㄹ 수 있어요/없어요** (poder, capacidad o posibilidad): vocal → -ㄹ 수 (할 수 있어요) · consonante → -을 수 (먹을 수 있어요) · ㄷ irregular: 들을 수 있어요. Se escribe separado: 할 수 있어요. En A1, 수영할 수 있어요 sirve para "puedo nadar" y "sé nadar"; 수영할 줄 알아요 se reconoce (Conversacional)<br>• Léxico (publicado): **negaciones que son palabras propias:** 있다 → 없다 · 알다 → 모르다 (nunca 안 알아요*) · 좋아하다 → 싫어하다 (suena fuerte: mejor 안 좋아해요)<br>• Fórmulas [YA]: **일이 있어서** (la razón; -아서 llega en Conversacional 1) · **다음에 같이 가요!** · **-지만** para contrastar dos habilidades: 운전은 할 수 있지만 수영은 못 해요 (la regla, en la S8)<br>• Ciclo: R = tres cosas que Jay no hace, no puede y sí puede (con humor) · C = drill afirmativo → negativo con 안 y 못 · G = encuesta "¿sabes…?" (publicada) + reporte en tercera persona (마리아 씨는 운전할 수 있어요) · L = role play "la invitación que no puedo aceptar" (publicado; la invitación usa 내일 같이 영화 봐요! en lugar de 내일 같이 영화 볼 거예요? [YA]) + "tres tarjetas, tres negaciones" (publicado) + minuto libre |
| Vocabulario | **Núcleo publicado (12):** 수영하다 · 운전하다 · 기타를 치다 · 노래하다 · 춤을 추다 · 매운 음식 · 술을 마시다 · 담배를 피우다 · 늦게 · 잘 · 전혀 · 싫어하다 (↺)<br>**Del tema y fórmulas (6):** 맵다 (매워요) · 미안해요 · 다음에 · 일이 있어서 [F] · 다이어트하다 · -지만 [F]<br>**Reconocer (2):** 수능 · 시험 잘 보세요!<br>Total de la semana: 20. |
| Expresiones | • ___할 수 있어요? — 네, 할 수 있어요. / 아니요, 못 해요. · 전혀 못 해요.<br>• 미안해요, ___은/는 못 가요. 일이 있어서 못 가요. 다음에 같이 가요!<br>• 알아요? — 아니요, 몰라요.<br>• 매워요? — 조금 매워요.<br>• Frases clave del coro de cierre: 수영할 수 있어요? / 미안해요, 내일은 못 가요. / 다음에 같이 가요! |
| Pronunciación | **Se explica 못:** 못 해요 [모태요] (ㄷ + ㅎ → ㅌ) · 못 먹어요 [몬머거요] (ㄷ ante ㅁ → ㄴ) · 못 가요 [몯까요]. 할 수 있어요 [할쑤이써요] · 먹을 수 [머글쑤] · 않아요 [아나요] (la ㅎ se cae) · 먹지 않아요 [먹찌아나요] · 춤을 춰요 (ㅝ de un golpe). |
| Cultura | Capa contemporánea. **Publicado:** rechazar una invitación rara vez es un "no" seco: se usa 못 con una razón (일이 있어서 못 가요) y muchas veces 다음에 (la próxima), aunque no haya próxima: es cortesía, no promesa. **Frase ancla:** **미안해요, 일이 있어서 못 가요. 다음에 같이 가요!** **Puente:** "ahí vemos", "te aviso" (Fase 1 §10.4). **Gancho de calendario [YA]** (Fase 1 §10.6): mientras dura la clase, en Corea se rinde el 수능 (lo que se les dice a los que rinden: 시험 잘 보세요!, se reconoce) + espiral con la S2: muchos evitan el 미역국 antes de un examen, "para no resbalar" (lectura opcional en español: el artículo del blog del sitio, `/blog/sopa-de-algas-antes-de-un-examen-supersticion-coreana`). Decirlo como "muchos", nunca "los coreanos". |
| Recurso digital (exacto) | Lector → Practicar → **Pictogramas, 3 rondas seguidas** (5 min; preguntas y opciones sin romanización; la línea de corrección sí la trae). **[YA]** El Contrarreloj que pide el programa ("superar tu marca") queda como extra. |
| Tarea (prepara la clase siguiente) | ≈ 30 min, antes de la clase 7. (1) **Lector, 5 min.** (2) **Hoja 6, 15 min** (publicada): elegir 안 / 못 / -(으)ㄹ 수 없어요 en 15 situaciones (+ 2 de ellas también en forma larga -지 않아요, que el quiz 6 pide a todos) + 5 cosas que sabes hacer y 5 que no. (3) **Audio de 40 s, 5 min** (publicado): "할 수 있어요, 못 해요", 6 frases mezclando habilidad y negación (pueden salir de la Parte B de la hoja: una sola producción, B.10). (4) **Prepara la S7, 5 min:** elige dos ciudades, dos comidas o dos ídolos para comparar y guarda una foto de cada uno; deja a la vista lo que hay en tu escritorio. **Reto:** -지 않아요 / -지 못해요 en 5 situaciones + 1 frase con -지만. **Rescate:** solo 안 y 못 (10 situaciones) + el audio. |
| Entregable del alumno | Captura de Progreso · Hoja 6 · audio de 40 s. |
| Evaluación | **Quiz 5** (sobre la S5) + revisión del quiz en línea 2. |
| Grupo mixto | Julio es "experto" de 안 + verbo (lo usaba desde julio: 학교에 안 가요) · para quien venga de Básico 1, 안 era solo 안 좋아해요 · 못 y -(으)ㄹ 수, nuevos para todos. |

### B.8 Semana 7 · mié 25 nov · Partículas pro

| Campo | Semana 7 |
|---|---|
| Fecha | Miércoles 25 de noviembre · 21:00–22:00 (hora de Chile) |
| Unidad del libro | Partículas (selección): 05 의 · 09 에게/한테 · 10 도 · 11 만 · 12 밖에 · 14 쯤 · 15 처럼 · 16 보다 · 17 마다 |
| Tema | Partículas pro: comparar, precisar y matizar |
| **Después de esta clase puedo decir…** | 1. 저도 가요! / 저는 커피만 마셔요.<br>2. 서울이 산티아고보다 더 커요.<br>3. 주말마다 운동해요.<br>4. 지갑에 천 원밖에 없어요.<br>5. 사람마다 달라요. |
| Gramática · carga: 3 en producción + 3 guiadas + 2 para reconocer | **Cómo se resuelven 9 partículas en una hora sin cambiar lo publicado:** las 9 se ven y se reconocen (el examen pide *elegir* la correcta, E.5), pero solo 3 mecanismos se practican hasta producirlos; 3 se usan en marcos fijos y 2 se reconocen (la nota publicada ya lo permite: "쯤 y 의 pueden quedar como lectura en casa"; "si te alcanza el tiempo, elimina ejemplos, no actividades").<br>**Producción (cuentan):**<br>• [nueva 1] **도 y 만** (también · solo), un solo mecanismo: **reemplazan** a 은/는, 이/가 y 을/를 (저는 → 저도 · 커피를 → 커피만) y **se suman** a 에 y 에서 (한국에도 · 집에서만). El 저도요 de Básico 1, ahora con la regla<br>• [nueva 2] **N보다 (더)** (más que): *A이/가 B보다 더 ___*: 서울이 산티아고보다 더 커요. El orden va al revés del español ("más grande que Santiago" → "Santiago-que más grande"); **제일** (el más) como palabra: 커피를 제일 좋아해요<br>• [nueva 3] **N마다** (cada): 주말마다 · 아침마다 · 사람마다. "Todos los días" sigue siendo 매일 (o 날마다)<br>**Marcos guiados (fórmulas, no cuentan):**<br>• **N밖에 + negación** (nada más que): ___밖에 없어요 (천 원밖에 없어요 = 천 원만 있어요); siempre con verbo negativo. [YA] Aquí entran **천 y 만**, sin 일 delante: 천 원, 만 원 (Fase 1)<br>• **N한테** (a alguien) con 주다, 전화하다 y 편지를 쓰다: 친구한테 선물을 줬어요 · 엄마한테 전화해요 (에게 = lo mismo, más escrito)<br>• **N처럼** (como): 한국 사람처럼 말해요! (el cumplido que todos quieren oír)<br>**Reconocer:** **쯤** (palabra desde la S3: 세 시쯤 만나요 · 만 원쯤) · **의** (de): está dentro de 제 (= 저의) y 내 (= 나의); en la conversación casi siempre se omite (친구 가방); lectura en casa<br>• Ciclo: R = Jay compara dos fotos (Seúl y Santiago) · C = drill: 저는 커피를 마셔요 → 저도… → 커피만… · G = comparación en pares con 3 pares de fotos y reacción 저도요 / 맞아요 (publicada) + "Solo tengo…" con el escritorio: 만 y 밖에; Jay lee las frases mezcladas y el grupo adivina de quién es cada escritorio (publicada) · L = minuto libre. **Dictado de partículas con formato de examen** (publicado) en el bloque del drill |
| Vocabulario | **Núcleo publicado (10):** 키가 크다 · 더 · 제일 · 선물 · 주다 · 전화하다 · 편지 · 매일 (↺) · 가끔 · 자주<br>**Del tema y fórmulas (12):** 천 · 만 · 원 · 지갑 · 다르다 (달라요) · 크다 · 작다 · 비싸다 · 싸다 · 도시 · 맞아요 [F] · 잠깐만요 [F]<br>**Reconocer (1):** 하나밖에 안 남았어요<br>Total de la semana: 23. |
| Expresiones | • 저도요! / 저는 아니에요. (publicado; ⚑ D-11) · 맞아요!<br>• ___이/가 ___보다 더 ___아요/어요. · ___을/를 제일 좋아해요.<br>• ___마다 ___아요/어요. · ___밖에 없어요.<br>• 잠깐만요! (para pasar entre la gente en el metro; publicado)<br>• Reconocer: 하나밖에 안 남았어요 · 한국 사람처럼 말해요!<br>• Frases clave del coro de cierre: 저도요! / 서울이 산티아고보다 더 커요. / 사람마다 달라요. |
| Pronunciación | 밖에 [바께] · 천 원 [처눤] · 만 원 [마눤] (연음) · 달라요 (ㄹㄹ) · **par mínimo del día:** 싸요 ("es barato", ㅆ tensa) / 사요 ("compro") · 커요 (ㅋ con aire) · 처럼 y 보다 (ㅓ/ㅗ en la misma frase). |
| Cultura | Capa contemporánea. **Publicado:** dos partículas que se oyen todo el día: 밖에 en las tiendas (하나밖에 안 남았어요, "solo queda uno", la frase favorita para vender) y 만 escondido en **잠깐만요** ("un momento"), para pasar entre la gente en el metro. **[YA] Lenguaje anti-estereotipo como contenido** (Fase 1 §10.3–10.4): la tarea pide comparar tu país con Corea; esta semana aprendes a responder con honestidad a "¿a los coreanos les gusta el picante?": **사람마다 달라요**. **Frase ancla:** 사람마다 달라요. **Puente:** "depende de la persona". |
| Recurso digital (exacto) | Lo publicado no pide Lector esta semana. La herramienta es la **Hoja de partículas 7 con formato de examen**. Opcional: Lector → Practicar → Pictogramas, 3 rondas (mantener vocabulario) y, si están listas, las flashcards de Básico 2 (G.2). |
| Tarea (prepara la clase siguiente) | ≈ 30 min, antes de la clase 8 (publicada). (1) **Hoja de partículas 7, 12 min:** 20 huecos (은/는 · 이/가 · 을/를 · 에 · 에서 · 도 · 만 · 밖에 · 보다 · 마다 · 한테); **obligatoria** porque tiene el formato del examen; entrega propuesta: **dom 29 nov**, para recibir la corrección antes del examen. (2) **Repaso de vocabulario S1–S7, 10 min:** marca las 20 palabras que no te salen solas y repásalas en voz alta. (3) **5 frases comparando tu país con Corea** (보다 / 처럼 / 도) **+ audio, 8 min**; si quieres, una con 사람마다 달라요. (4) **Prepara la S8:** hoy recibes la **tarjeta de la conversación evaluada** (6 temas, F.1) y tu pareja; practiquen 5 minutos por WhatsApp o Zoom antes del miércoles (recomendado). El **simulacro corto** llega el lun 30 nov. **Reto:** 처럼 y 한테 en frases propias. **Rescate:** en las 5 frases, solo 도, 만 y 보다. |
| Entregable del alumno | Hoja de partículas 7 · tus 20 palabras · 5 frases + audio. |
| Evaluación | **Quiz 6** (sobre la S6) · dictado de partículas en formato de examen (formativo, sin nota) · parejas y tarjeta del oral publicadas en el grupo · si Jay cambia la línea del certificado, aviso breve hoy (DECISIÓN DE JAY 2). |
| Grupo mixto | Nuevo para todos, salvo 저도요 (fórmula de Básico 1) y 제 (julio) · el reto y el rescate cambian la cantidad, no el mecanismo. |

### B.9 Semana 8 · mié 2 dic · Conectores + examen final

| Campo | Semana 8 |
|---|---|
| Fecha | Miércoles 2 de diciembre · 21:00–22:00 (hora de Chile) |
| Unidad del libro | Enumeración y contraste 01 y 03: -고 (y) · -지만 (pero) · integración de las 7 clases · examen + evaluación oral · certificado |
| Tema | Conectores + examen final + conversación de 5 minutos |
| **Después de esta clase puedo decir…** | 1. 주말에 친구를 만나고 영화를 봤어요.<br>2. 한국어는 어렵지만 재미있어요.<br>3. 먼저 씻고 아침을 먹어요. 그다음에 출근해요.<br>4. 내년에 회화 수업을 들을 거예요.<br>5. 수고했어요! — 감사합니다! |
| Gramática · carga: 0 nunca vistas (2 pasan de fórmula a regla) | • [de fórmula a regla] **-고** (y; enumeración o secuencia), usado desde la S3 (씻고 아침을 먹어요), la S4 (먹고 마셨어요) y la S5 (보고 찍을 거예요). Regla: raíz + 고, sin importar la vocal; **el tiempo va solo en el último verbo** (밥을 먹고 커피를 마셨어요); con dos sujetos: 저는 커피를 마시고 친구는 차를 마셔요 (publicado)<br>• [de fórmula a regla] **-지만** (pero), usado desde la S6 (할 수 있지만 못 해요) y la S7. Regla: raíz + 지만; **sí lleva pasado** (어려웠지만 재미있었어요); entre dos frases, 그렇지만 (publicado)<br>• Léxico: conectores entre frases: 그리고 · 그렇지만 · 그래서 · 먼저 · 그다음에 · 마지막으로<br>• Integración (publicado): presente, pasado y futuro + negación + partículas en un relato de 8–10 frases<br>• Ciclo (10 minutos): R = Jay une en pantalla dos frases dichas por el grupo en el curso · C = cadena rápida: cada alumno une dos pares con -고 o -지만 (publicado) · G/L = la conversación evaluada |
| Vocabulario | **Núcleo publicado (12):** 그리고 (↺) · 그렇지만 · 그래서 · 먼저 · 그다음에 · 마지막으로 · 시험 · 문제 · 대답하다 · 어렵다 (desde la S3) · 쉽다 (desde la S3) · 축하해요<br>**Del tema y fórmulas (3):** 회화 · 이 수업 · 수고했어요 [F]<br>**Cultura (1):** 두 손으로 [R]<br>Total de la semana: 16. |
| Expresiones | • 먼저… 그다음에… 마지막으로…<br>• ___고 ___아요/어요. · ___지만 ___아요/어요.<br>• 수고했어요! — 감사합니다! · 축하해요!<br>• Frases clave del coro de cierre: 밥을 먹고 커피를 마셨어요. / 한국어는 어렵지만 재미있어요. / 수고했어요! |
| Pronunciación | 그렇지만 [그러치만] (ㅎ + ㅈ → ㅊ) · 어렵지만 [어렵찌만] · 먹고 [먹꼬] · 축하해요 [추카해요] · 수고했어요 [수고해써요]. En la conversación se miran los criterios de la rúbrica: 받침 sin vocal de apoyo, ㅓ/ㅗ y tensas. La lentitud no se penaliza. |
| Cultura | **Publicado:** al terminar un examen o un curso se dice **수고했어요** (se reconoce el esfuerzo antes que el resultado), y el certificado se entrega y se recibe con las dos manos (두 손으로). **Matiz [YA]** (Fase 1 §10.2): Jay se lo dice al grupo; los alumnos a Jay, mejor **감사합니다** (el 『표준 언어 예절』 del 국립국어원 recomienda evitar 수고 con superiores). **Frase ancla:** 수고했어요! — 감사합니다! **Puente:** el "¡buen trabajo, equipo!". |
| Recurso digital (exacto) | **Antes:** simulacro corto de 10 preguntas (lun 30 nov; publicado). **Después:** Lector → **Progreso**, captura final (publicado como "Contrarreloj, ronda final, recomendada, no obligatoria": el Contrarreloj queda opcional). |
| Tarea (prepara la clase siguiente) | **Antes de la clase** (publicado): repasar las hojas 1–7 y hacer el simulacro corto. **Después, ≈ 15 min** (publicado): grabar tu **presentación de 1 minuto en tres tiempos** (quién soy, qué hice en este curso, qué haré) y subirla al grupo: es tu "después" frente al diagnóstico de la S1 y tu punto de partida en Conversacional 1. |
| Entregable del alumno | Examen escrito (en clase) · conversación evaluada (en clase o, si no alcanzó a ser escuchado, audio de 3 min dentro de las 48 h) · audio final de 1 minuto. |
| Evaluación | Examen final escrito (40 pts, 4 secciones publicadas, **sin ítems obligatorios de -고/-지만**) + conversación evaluada en pares (rúbrica publicada de 4 criterios) (E.5, E.6, F). **[regla del certificado: pendiente de decisión de Jay]**. |
| Grupo mixto | Nadie ve nada por primera vez el día del examen (E.6). |

### B.10 Carga cognitiva y continuidad

| S | Estructuras nuevas (cuentan; tope 3) | No cuentan (fórmula · reconocimiento · léxico · reactivación) | Recicla |
|---|---|---|---|
| 1 | 1 (contraste 은/는 vs 이/가 en producción) | Reactivación: 이에요/예요, 아니에요, 있어요/없어요 + 에, -아요 · léxico: 제, 누가, 씨 · fórmulas: 요즘 어떻게 지내요?, ___ 씨는요? | Todo Básico 1 / julio |
| 2 | 3 (nativos con 살/시 · fechas y minutos con sino · 에 de tiempo) | 몇, 며칠, 언제 (léxico) · 천/만/원 (reconocer) · 나이가 어떻게 되세요? (reconocer) | Sino 1–100 y 명 (Básico 1) · 에 (S1) |
| 3 | 2 (irregulares ㅂ/ㄷ/으 con 르 como forma fija · 에서 vs 에) | -ㅂ니다 (reconocer + fórmula 저는 ___입니다) · -고 (fórmula) · 쯤 (palabra) · -아요 completo (reactivación) | Horas (S2) en la rutina · 살아요 (S1) |
| 4 | 3 (-았/었어요 · 부터~까지 / 에서~까지 · 하고/(이)랑) | Tiempo con y sin 에 (léxico) · -고 en pasado (fórmula) · 주말 잘 보냈어요? (reconocer) | Irregulares (S3) en pasado · 에서 (S3) · horas (S2) |
| 5 | 3 (-(으)ㄹ 거예요 · -거나/(이)나 · (으)로) | 같이 ___요! (fórmula) · 걸어서, 한국어로 뭐예요? (fórmulas) · -고 en futuro · -(으)ㄹ까요?, 뭐 타고 (reconocer) | Pasado (S4) en "tres tiempos" · 에 de tiempo (S2) |
| 6 | 3 (안 / -지 않아요 · 못 · -(으)ㄹ 수 있다/없다) | -지 못해요 (reconocer) · negaciones léxicas · 일이 있어서, 다음에 같이 가요!, -지만 (fórmulas) · 수능, 시험 잘 보세요! (reconocer) | Futuro (S5) en la invitación · 같이 ___요! (S5) · 모르다 (S3) |
| 7 | 3 (도/만 · 보다 + 더 · 마다) | 밖에, 한테, 처럼 (marcos fijos) · 쯤, 의 (reconocer) · 천/만 (tema) · 제일 (léxico) | 쯤 (S3) · 제 (S1) · 저도요 (Básico 1) · -지만 (S6) · 크다/다르다 con irregulares (S3) |
| 8 | 0 nunca vistas (2 pasan de fórmula a regla: -고 · -지만) | Conectores entre frases (léxico) · 수고했어요 (fórmula) | Todo el curso |

Criterio de conteo (Fase 1 §4.1): cuenta lo que se explica y se practica para producirlo; un paradigma cuenta una vez; no cuentan lo que se reactiva, lo que solo se reconoce, el léxico ni las fórmulas que se imitan sin explicar. **Ninguna clase de octubre pasa de 3, sin cambiar nada publicado.** Los dos puntos de riesgo del syllabus se resuelven así: **S3** (5 irregulares + -ㅂ니다 + 에서) = un paradigma de irregulares + 에서, con -ㅂ니다 para reconocer; **S7** (9 partículas) = 3 en producción, 3 en marcos fijos y 2 para reconocer. La carga de las semanas 2, 4, 5, 6 y 7 es alta (3): por eso sus tareas piden **una** producción larga y el resto es reconocimiento o práctica corta.

**Continuidad (nada se usa antes de enseñarse):**

| Pieza | Se enseña | Se usa antes como… | Se recicla en |
|---|---|---|---|
| 은/는 vs 이/가 | S1 (producción) | Básico 1: reconocer; julio: 은/는 tema | S3 (오늘 산티아고는…), S4 (작년에는…), S6 (운전은… 수영은…), S7 (reemplazo por 도/만) |
| 에 de tiempo | S2 | — (en la S1 se evita: 요즘 y 지금 van sin 에) | S3–S8 |
| 에서 | S3 | Básico 1: solo reconocer (3번 출구에서 만나요); S1: el error se marca, no se explica | S4 (에서~까지, 어디에서 먹었어요?), S5, S8 |
| Irregulares ㅂ/ㄷ/으/르 | S3 | 들어요 y 써요 como formas fijas (Básico 1) | S4 (더웠어요, 들었어요), S5 (들을 거예요), S6 (매워요, 들을 수), S7 (커요, 달라요), S8 (어려워요) |
| -ㅂ니다 | S3 (reconocer) | 감사합니다, 반갑습니다 (fórmulas) | S8 (en el examen solo se reconoce) |
| -았/었어요 | S4 | Julio: bonus 갔어요 (reconocer) | S5 (tres tiempos), S6 (못 + razón), S7 (줬어요), S8 |
| -(으)ㄹ 거예요 | S5 | Julio: bonus 갈 거예요 (reconocer) | S6 (invitación y rechazo), S8 |
| 안 + verbo | S6 | Básico 1: 안 좋아해요 (fórmula); julio: en uso | S7 (하나밖에 안 남았어요, reconocer), S8 |
| -고 | S8 (regla) | Fórmula desde la S3 (rutina), S4 (pasado) y S5 (futuro) | Examen (producción libre, opcional) y conversación |
| -지만 | S8 (regla) | Fórmula desde la S6 (habilidades) y la S7 (comparar) | Idem |
| 쯤 | S7 (partícula) | Palabra desde la S3 (일곱 시쯤) | S8 |
| 천 · 만 | S7 (con 원 y 밖에) | S2: tarjeta de números (reconocer) | Examen (reconocer) |
| 제 / 의 | S7 (의, reconocer) | 제 como palabra desde la S1 | S8 |
| 같이 | S4 (palabra) | — | S5 (같이 ___요!), S6 (다음에 같이 가요!), S8 |
| Números nativos 11–99 | S2 | Básico 1: 1–5 con 명; julio: 1–10 | S3 (horas de la rutina), S4 (부터~까지), S5, S7 (천/만 son sino) |

### B.11 Minuto libre [YA] (3 minutos al final de los pares, sin guion)

Una tarjeta por semana: la pregunta de la semana + una de semanas anteriores. Los compañeros la hacen en cualquier orden, y quien responde no mira el cuaderno. Es el ensayo, semana a semana, de la conversación evaluada de la S8.

| S | Tarjeta (pregunta de la semana + una anterior) |
|---|---|
| 1 | 요즘 어떻게 지내요? + una de Básico 1: 매일 뭐 해요? |
| 2 | 생일이 언제예요? · 몇 시에 자요? + una de la S1: 형제가 있어요? |
| 3 | 보통 몇 시에 일어나요? · 요즘 바빠요? + una de la S2: 생일이 언제예요? |
| 4 | 주말에 뭐 했어요? + una de la S3: 보통 어디에서 공부해요? |
| 5 | 이번 주말에 뭐 할 거예요? + una de la S4: 어제 뭐 했어요? |
| 6 | 뭐 할 수 있어요? (수영, 운전, 요리…) + una de la S5: 휴가에 어디에 갈 거예요? |
| 7 | 커피하고 차, 뭐가 더 좋아요? · 서울하고 산티아고, 어디가 더 커요? + una de la S6: 매운 음식을 먹을 수 있어요? |
| 8 | No aplica: la conversación evaluada es el minuto libre largo. |

### B.12 Las 3 frases clave (Audioteca A2 · 24 frases)

Jay las dice en coro con el grupo al cierre. **El clip de 20 segundos se recorta de la grabación de Zoom** o, si el coro sale con ruido, Jay lo graba después con el celular (en este curso el profesor es Jay: no hace falta pedírselo a nadie más; el recorte lo hace la persona de producción que Jay designe). Nombre de archivo: `B2_S0N_frases_clave.mp3`. Son también las frases del ejercicio de shadowing de cada material.

| S | Frase 1 | Frase 2 | Frase 3 |
|---|---|---|---|
| 1 | 저는 회사원이에요. 학생이 아니에요. | 산티아고에 살아요. | 취미가 뭐예요? |
| 2 | 몇 살이에요? — 스물다섯 살이에요. | 생일이 언제예요? — 유월 십오 일이에요. | 일곱 시에 일어나요. |
| 3 | 씻고 아침을 먹어요. | 회사에서 일해요. | 요즘 너무 바빠요. |
| 4 | 주말에 뭐 했어요? | 친구하고 영화를 봤어요. | 아홉 시부터 여섯 시까지 일했어요. |
| 5 | 다음 주에 뭐 할 거예요? | 기차로 부산에 갈 거예요. | 영화를 보거나 쉴 거예요. |
| 6 | 수영할 수 있어요? | 미안해요, 내일은 못 가요. | 다음에 같이 가요! |
| 7 | 저도요! | 서울이 산티아고보다 더 커요. | 사람마다 달라요. |
| 8 | 밥을 먹고 커피를 마셨어요. | 한국어는 어렵지만 재미있어요. | 수고했어요! |

---

## C. Lista maestra de vocabulario del curso

Sin romanización (sección D). Tipo: **N** núcleo publicado nuevo (se produce y se evalúa) · **N↺** núcleo publicado que ya estaba en Básico 1 o en julio (se reactiva y se evalúa) · **T** del tema (se usa en clase; en el examen solo se reconoce) · **P** paradigma (serie que se aprende junta) · **F** fórmula (se imita sin explicar la regla) · **A** anticipo (núcleo de una semana posterior que se usa antes, marcado) · **R** reconocimiento (lo dice Jay o es cultura; no se pide ni se evalúa). "Audio" = hay clip nativo en `public/audio/kr` (voz SunHi, la del Lector; desde el 26 sept, las 172 filas: URL de cada una en `../audio/Clips_Octubre_2026.md`; en 제, 일, 시 y 원 el clip es la sílaba, que suena igual). Los clips nuevos están fuera de git hasta el push a `main` (⚑ N-1).
Para lo que el alumno ya trae, la referencia es la lista C de Básico 1 (`../Fase2_Basico1/00_Diseno_Basico1.md`), que los redactores pueden usar sin marcarla.

| S | Coreano | Español | Tipo | Audio | Nota |
|---|---|---|---|---|---|
| 1 | 직업 | profesión, ocupación | N | sí | 직업이 뭐예요? |
| 1 | 회사원 | empleado, empleada (de oficina) | N↺ | sí | Básico 1 S2 (T) |
| 1 | 대학생 | estudiante universitario/a | N | sí |  |
| 1 | 고향 | ciudad o pueblo natal | N | sí | 고향이 어디예요? |
| 1 | 취미 | pasatiempo | N | sí | 취미가 뭐예요? |
| 1 | 요즘 | últimamente, estos días | N | sí | al inicio de la frase, sin partícula |
| 1 | 아직 | todavía | N | sí | 아직 학생이에요. |
| 1 | 반갑습니다 | encantado, encantada (de conocerte) | N↺ | sí | Básico 1 S2 (F); frase ancla de la S1 |
| 1 | 형제 | hermanos (y hermanas) | N | sí | 형제가 있어요? |
| 1 | 남편 | esposo | N | sí |  |
| 1 | 아내 | esposa | N | sí | publicado junto con 남편 como un solo ítem |
| 1 | 강아지 | perro, perrito | N↺ | sí | Básico 1 S4 (T) |
| 1 | 회사 | empresa, oficina | N↺ | sí | Básico 1 S5 (N) |
| 1 | 살다 | vivir (살아요) | T | sí | verbo en ㄹ: regular en -아요; ver S3 y S5 |
| 1 | 제 | mi (forma humilde; = 저의) | T | sí | como palabra: 제 이름, 제 취미; 의 se explica en la S7 |
| 1 | 씨 | (tras el nombre) trato cortés entre compañeros: 다니엘 씨 | T | sí | nunca con el propio nombre ⚑ D-3 |
| 1 | 외동 | hijo único, hija única | T | sí | ⚑ D-4 |
| 1 | 누가 | quién (como sujeto; = 누구 + 가) | T | sí | 누가 학생이에요? |
| 1 | 숙제 | tarea (de clase) | T | sí | lenguaje de clase |
| 1 | 요즘 어떻게 지내요? | ¿cómo has estado?, ¿qué tal todo? | F | sí | abre el minuto libre |
| 1 | ___ 씨는요? | ¿y tú? (devolver la pregunta) | F | sí | 카밀라 씨는요? |
| 1 | 인사 | saludo con leve inclinación | R | sí | cultura |
| 1 | 악수 | apretón de manos | R | sí | cultura: matiz [YA] |
| 2 | 살 | años (de edad), con nativos | N | sí | 스물다섯 살 |
| 2 | 생일 | cumpleaños | N | sí | 생일이 언제예요? |
| 2 | 월 | mes (con sino-coreanos) | N | sí | 시월 = octubre |
| 2 | 일 | día del mes (con sino-coreanos) | N | sí | 이십일 일 |
| 2 | 요일 | día de la semana | N | sí | 무슨 요일이에요? (reconocer) |
| 2 | 시 | hora (con nativos) | N | sí | 일곱 시 |
| 2 | 분 | minuto (con sino-coreanos) | N | sí | 삼십 분 |
| 2 | 반 | y media | N | sí | 아홉 시 반 |
| 2 | 오전 | a. m., en la mañana | N | sí |  |
| 2 | 오후 | p. m., en la tarde | N | sí |  |
| 2 | 전화번호 | número de teléfono | N↺ | sí | Básico 1 S4 (T) |
| 2 | 언제 | cuándo | N | sí |  |
| 2 | 하나 둘 셋 넷 다섯 여섯 일곱 여덟 아홉 열 | números nativos 1–10 | P | sí | 하나–다섯 ya vistos en Básico 1 (con 명) |
| 2 | 스물 서른 마흔 쉰 예순 일흔 여든 아흔 | decenas nativas 20–90 | P | sí | para la edad adulta |
| 2 | 한 · 두 · 세 · 네 · 스무 | formas cortas antes del contador | P | sí | 한 시, 두 살, 스무 살 |
| 2 | 일월 이월 삼월 사월 오월 유월 칠월 팔월 구월 시월 십일월 십이월 | los 12 meses | P | sí | 유월 y 시월 pierden la consonante |
| 2 | 월요일 화요일 수요일 목요일 금요일 토요일 일요일 | lunes a domingo | P | sí |  |
| 2 | 몇 | cuántos; qué número | T | sí | 몇 살 · 몇 시 · 몇 월 [며둴] |
| 2 | 며칠 | qué día (del mes) | T | sí | se escribe 며칠, nunca 몇일 |
| 2 | 아침 · 점심 · 저녁 | mañana · mediodía · tarde-noche (y desayuno · almuerzo · cena) | T | sí | 아침 여덟 시 · 저녁 일곱 시 |
| 2 | 밤 | noche | T | sí | 밤 아홉 시 = las 21:00 |
| 2 | 만 나이 | edad internacional (oficial desde junio de 2023) | R | sí | cultura |
| 2 | 천 · 만 · 원 | mil · diez mil · won | R | sí | solo en la tarjeta de números; se usan en la S7 |
| 2 | 미역국 | sopa de algas (la de los cumpleaños) | R | sí | frase ancla: 생일에 미역국을 먹어요 |
| 3 | 일어나다 | levantarse (일어나요) | N↺ | sí | Básico 1 S6 (T) |
| 3 | 씻다 | lavarse (씻어요) | N | sí |  |
| 3 | 아침을 먹다 | desayunar | N | sí | 아침 (S2) + 먹다 |
| 3 | 출근하다 | ir al trabajo | N | sí |  |
| 3 | 퇴근하다 | salir del trabajo | N | sí |  |
| 3 | 쉬다 | descansar (쉬어요) | N↺ | sí | Básico 1 S6 (T) |
| 3 | 운동하다 | hacer ejercicio | N↺ | sí | Básico 1 S6 (N) |
| 3 | 듣다 | escuchar (들어요): irregular ㄷ | N↺ | sí | Básico 1 S7 (N, forma fija); ahora con la regla |
| 3 | 바쁘다 | estar ocupado/a (바빠요): irregular 으 | N | sí |  |
| 3 | 덥다 | hacer calor; tener calor (더워요): irregular ㅂ | N | sí |  |
| 3 | 춥다 | hacer frío; tener frío (추워요): irregular ㅂ | N | sí |  |
| 3 | 모르다 | no saber, no conocer (몰라요): 르, forma fija | N | sí |  |
| 3 | 쯤 | más o menos (con horas y cantidades) | T | sí | [YA] como palabra: 일곱 시쯤; reaparece en la S7 |
| 3 | 보통 | normalmente | T | sí |  |
| 3 | 너무 | demasiado; muy | T | sí |  |
| 3 | 수업 | clase | T | sí | 수업이 있어요 |
| 3 | 날씨 | clima, tiempo | T | sí | 날씨가 더워요 |
| 3 | 알다 | saber, conocer (알아요) | T | sí | par de 모르다 (S6) |
| 3 | 어렵다 | ser difícil (어려워요) | A | sí | núcleo de la S8; ejemplo de irregular ㅂ |
| 3 | 쉽다 | ser fácil (쉬워요) | A | sí | núcleo de la S8; ejemplo de irregular ㅂ |
| 3 | 빠르다 | ser rápido (빨라요) | T | sí | segundo ejemplo de 르 |
| 3 | -고 (씻고 아침을 먹어요) | y (une dos acciones) | F | sí | [YA] fórmula; regla en la S8 |
| 3 | 이번 역은 ___입니다 | "la próxima estación es…" (metro) | R | sí | ejemplo de -ㅂ니다 |
| 3 | 먼저 들어가 보겠습니다 | me voy primero (en la oficina) | R | sí | ⚑ D-7; matiz [YA] |
| 4 | 주말 | fin de semana | N | sí |  |
| 4 | 어제 | ayer | N | sí | sin 에 |
| 4 | 지난주 | la semana pasada | N | sí | 지난주에 |
| 4 | 작년 | el año pasado | N | sí | 작년에 |
| 4 | 여행하다 | viajar | N | sí |  |
| 4 | 만나다 | encontrarse con, ver a (alguien) | N | sí | 친구를 만나요 (con 을/를) |
| 4 | 사다 | comprar (샀어요) | N | sí |  |
| 4 | 놀다 | salir a divertirse, jugar (놀아요) | N | sí | verbo en ㄹ |
| 4 | 영화를 보다 | ver una película | N↺ | sí | 영화: Básico 1 S8 (N) |
| 4 | 요리하다 | cocinar | N↺ | sí | Básico 1 S6 (T) |
| 4 | 재미있다 | ser divertido/a, entretenido/a | N | sí | 재미있었어요 |
| 4 | 피곤하다 | estar cansado/a | N | sí |  |
| 4 | 지난 주말 | el fin de semana pasado | T | sí |  |
| 4 | 오늘 아침 | esta mañana | T | sí | 오늘 아침에 |
| 4 | 같이 | juntos | T | sí | [가치] |
| 4 | 혼자 | solo, sola (sin compañía) | T | sí |  |
| 4 | 맛있다 | ser rico, sabroso | T | sí | [마싣따] · 맛있었어요 |
| 4 | 누구하고 / 누구랑 | ¿con quién? | F | sí |  |
| 4 | 주말 잘 보냈어요? | ¿qué tal tu fin de semana? | R | sí | small talk del lunes; se responde con el pasado |
| 5 | 내일 | mañana (el día siguiente) | N | sí | sin 에 |
| 5 | 다음 주 | la próxima semana | N | sí | 다음 주에 |
| 5 | 내년 | el año que viene | N | sí | 내년에 |
| 5 | 휴가 | vacaciones (del trabajo) | N | sí |  |
| 5 | 계획 | plan | N | sí | 계획이 있어요? |
| 5 | 비행기 | avión | N | sí | 비행기로 |
| 5 | 기차 | tren | N | sí | 기차로 |
| 5 | 바다 | mar | N↺ | sí | Básico 1 S1 (N) |
| 5 | 산 | montaña | N | sí |  |
| 5 | 호텔 | hotel | N | sí |  |
| 5 | 사진을 찍다 | sacar fotos | N | sí |  |
| 5 | 구경하다 | recorrer, mirar (un lugar) | N | sí |  |
| 5 | 이번 주말 | este fin de semana | T | sí | 이번 주말에 |
| 5 | 버스 | bus | T | sí | 버스로 |
| 5 | 지하철 | metro | T | sí | 지하철로 (ㄹ + 로) |
| 5 | 차 | auto; también "té" | T | sí | 차로 가요 · 차를 마셔요 |
| 5 | 걸어서 | a pie | F | sí | 걸어서 가요 (sin 로) |
| 5 | 여름 | verano | T | sí | 여름휴가 (una sola palabra en el diccionario; ⚑ S5-6) |
| 5 | 방학 | vacaciones (del colegio o la universidad) | T | sí | contraste con 휴가 |
| 5 | 같이 ___아요/어요! · 좋아요! | ¡(hagamos) … juntos! · ¡dale! | F | sí | [YA] propuesta sin -(으)ㄹ까요 |
| 5 | 이거 한국어로 뭐예요? | ¿cómo se dice esto en coreano? | F | sí | el mismo (으)로 del transporte |
| 5 | 빼빼로데이 | Día del Pepero (11 de noviembre) | R | sí | fecha comercial; gancho de 1 minuto |
| 5 | 뭐 타고 갈 거예요? | ¿en qué vas a ir? | R | sí | lo dice Jay; variante de 뭐로 갈 거예요? |
| 6 | 수영하다 | nadar | N | sí |  |
| 6 | 운전하다 | conducir, manejar | N | sí |  |
| 6 | 기타를 치다 | tocar la guitarra | N | sí |  |
| 6 | 노래하다 | cantar | N | sí |  |
| 6 | 춤을 추다 | bailar (춰요) | N | sí |  |
| 6 | 매운 음식 | comida picante | N | sí | 매운 = "picante" delante del sustantivo (fórmula) |
| 6 | 술을 마시다 | beber alcohol | N | sí |  |
| 6 | 담배를 피우다 | fumar | N | sí |  |
| 6 | 늦게 | tarde (adverbio) | N | sí | 늦게 자요 |
| 6 | 잘 | bien | N | sí | 잘 못 먹어요 · 잘 몰라요 |
| 6 | 전혀 | para nada (con negación) | N | sí | 전혀 못 해요 |
| 6 | 싫어하다 | no gustar, detestar (suena fuerte) | N↺ | sí | Básico 1 S8 (N) |
| 6 | 맵다 | ser picante (매워요) | T | sí | irregular ㅂ (S3) |
| 6 | 미안해요 | perdón, lo siento | T | sí |  |
| 6 | 다음에 | la próxima vez | T | sí | 다음에 같이 가요! |
| 6 | 일이 있어서 | es que tengo algo (que hacer) | F | sí | -아서 de causa llega en Conversacional 1 |
| 6 | 다이어트하다 | hacer dieta | T | sí |  |
| 6 | -지만 (할 수 있지만 못 해요) | pero (contraste dentro de la frase) | F | sí | [YA] fórmula; regla en la S8 |
| 6 | 수능 | examen de ingreso a la universidad | R | sí | cultura: la clase cae durante el 수능 (jue 19 nov en Corea) |
| 6 | 시험 잘 보세요! | ¡que te vaya bien en el examen! | R | sí | se reconoce; -(으)세요 es de Conversacional 1 |
| 7 | 키가 크다 | ser alto/a | N | sí | 키가 커요 |
| 7 | 더 | más | N | sí | 보다 + 더 |
| 7 | 제일 | el/la más | N | sí | 제일 좋아해요 |
| 7 | 선물 | regalo | N | sí |  |
| 7 | 주다 | dar (줘요, 줬어요) | N | sí |  |
| 7 | 전화하다 | llamar por teléfono | N | sí | 친구한테 전화해요 |
| 7 | 편지 | carta | N | sí |  |
| 7 | 매일 | todos los días | N↺ | sí | Básico 1 S6 (N); contraste con N마다 |
| 7 | 가끔 | a veces | N | sí |  |
| 7 | 자주 | a menudo, seguido | N | sí |  |
| 7 | 천 | mil | T | sí | [YA] con 원: 천 원 (sin 일 delante) |
| 7 | 만 | diez mil | T | sí | [YA] 만 원 (sin 일 delante) |
| 7 | 원 | won (moneda) | T | sí |  |
| 7 | 지갑 | billetera | T | sí | 지갑에 천 원밖에 없어요 |
| 7 | 다르다 | ser distinto (달라요) | T | sí | 르 (S3) · 사람마다 달라요 |
| 7 | 크다 | ser grande (커요) | T | sí | 으 (S3) |
| 7 | 작다 | ser pequeño (작아요) | T | sí |  |
| 7 | 비싸다 | ser caro | T | sí |  |
| 7 | 싸다 | ser barato | T | sí |  |
| 7 | 도시 | ciudad | T | sí |  |
| 7 | 맞아요 | así es, cierto | F | sí | reacción |
| 7 | 잠깐만요 | un momento; permiso (para pasar) | F | sí | cultura publicada |
| 7 | 하나밖에 안 남았어요 | solo queda uno | R | sí | cultura publicada (tiendas) |
| 8 | 그리고 | y (entre dos frases) | N↺ | sí | Básico 1 S6 (T) |
| 8 | 그렇지만 | sin embargo, pero (entre frases) | N | sí | = -지만 entre dos frases |
| 8 | 그래서 | por eso | N | sí |  |
| 8 | 먼저 | primero | N | sí |  |
| 8 | 그다음에 | después, luego | N | sí |  |
| 8 | 마지막으로 | por último | N | sí |  |
| 8 | 시험 | examen | N | sí | 시험을 보다 = rendir un examen |
| 8 | 문제 | pregunta (de examen); problema | N | sí |  |
| 8 | 대답하다 | responder | N | sí |  |
| 8 | 어렵다 | ser difícil (어려워요) | N | sí | anticipado desde la S3 |
| 8 | 쉽다 | ser fácil (쉬워요) | N | sí | anticipado desde la S3 |
| 8 | 축하해요 | ¡felicidades! | N | sí |  |
| 8 | 수고했어요 | buen trabajo (reconoce el esfuerzo) | F | sí | matiz [YA]: al profesor, 감사합니다 |
| 8 | 회화 | conversación (como curso) | T | sí | 회화 수업 = Conversacional |
| 8 | 이 수업 | esta clase, este curso | T | sí |  |
| 8 | 두 손으로 | con las dos manos | R | sí | cultura: dar y recibir |

**Resumen por semana:**

| S | Entradas | Núcleo publicado (de ellas, reactivadas de Básico 1) | Con clip nativo |
|---|---|---|---|
| 1 | 23 | 13 (4) | 23 |
| 2 | 24 | 12 (1) | 24 |
| 3 | 24 | 12 (4) | 24 |
| 4 | 19 | 12 (2) | 19 |
| 5 | 23 | 12 (1) | 23 |
| 6 | 20 | 12 (1) | 20 |
| 7 | 23 | 10 (1) | 23 |
| 8 | 16 | 12 (1) | 16 |
| **Total** | **172** | **95 (15)** | **172** |

Notas. (1) El núcleo publicado son 94 ítems (12 por semana y 10 en la S7); aquí son 95 filas porque 남편 · 아내 se publicaron como un solo ítem. (2) Las 15 filas **N↺** son las que el syllabus repite de Básico 1 (Fase 1 §5.1 contaba 6 repetidas contra el núcleo de Básico 1; aquí se cuentan también las que en Básico 1 eran "del tema"): no se enseñan como nuevas, se reactivan con un uso nuevo (듣다 con su regla, 영화를 보다 en pasado, 바다 en un plan). (3) **Audio:** desde el 26 sept las 172 filas y las 24 frases clave tienen clip SunHi (`../audio/Clips_Octubre_2026.md`); el material del alumno los enlaza con 🔊 en las 8 semanas (S1, S2 y S7 fila por fila; S3–S6 y S8 en una línea al final de la sección 2) y en las 3 frases de la sección 10. La voz de Jay sigue en la grabación y en el clip del coro (B.12). Se publican con el push a `main` (⚑ N-1). (4) Los nombres propios (ciudades, países, famosos) y las palabras "a pedido" de cada guía no entran en la lista: se dan solo si un alumno las necesita y no se evalúan. (5) **Flashcards:** la base es `A1_Nivel_1/200_Flashcards_Coreano_A1.xlsx`, que ya trae 36 de estas palabras (entre ellas 어제, 내일, 주말, 요일, 월, 분, 언제, 사다, 만나다, 살다, 알다, 주다, 덥다, 춥다, 바쁘다, 재미있다, 맛있다, 비싸다, 싸다, 시험), además de los números y 아침 · 점심 · 저녁; se filtra por esta lista, se agregan las que faltan y **se oculta la columna de romanización** (G.2).

**Complemento de C · Fórmulas y frases de reconocimiento que ya usan las guías y los materiales** (control final, 26 sept). No suman filas a las 172 ni a la carga de la semana (B.10), no entran en quizzes ni en el examen y no tienen clip propio (salvo las que coinciden con una fila de C). Se registran aquí para que la lista maestra coincida con lo que de verdad aparece en cada semana. **F** = se imita y se usa · **R** = se reconoce (la dice Jay, es una consigna o es cultura).

| S | Coreano | Español | Tipo | Dónde aparece |
|---|---|---|---|---|
| 1 | 제가요! | ¡yo! (respuesta a 누가…?) | F | material 3.4 y diálogo · ⚑ S1-20 |
| 1 | 여기 있어요! | ¡aquí está! | F | tarjeta de sala, ronda 3 (여기 y 있어요, de Básico 1) |
| 1 | 무슨 일 하세요? | ¿a qué te dedicas? (cortés) | R | material 2 · ⚑ D-5 |
| 1 | 오랜만이에요! | ¡tanto tiempo! | R | saludo de Jay a los de julio |
| 2 | 나이가 어떻게 되세요? | ¿cuántos años tiene? (a un mayor) | R | material 2 y 8 · B.3 |
| 2 | 무슨 요일이에요? | ¿qué día de la semana es? | R | material 2 · B.3 |
| 2 | 생일 축하해요! | ¡feliz cumpleaños! | R | material 2 y diálogo (anticipa 축하해요, núcleo de la S8) · ⚑ S2-5 |
| 2 | 새벽 | madrugada | R | material 2 · guía C.5 |
| 2 | 무엇에 대한 이야기입니까? · 맞는 것을 고르십시오 | ¿de qué se habla? · elige la correcta | R | consignas de los ítems estilo TOPIK I, siempre con glosa |
| 3 | 먼저 가겠습니다 | me voy primero (en la oficina) | R | publicado · material 2 y 8 · ⚑ D-7 |
| 3 | -고 있어요 | estar + -ando | reto | nota publicada de diferenciación (Hoja 3) |
| 4 | 카공 | estudiar en un café (카페 + 공부) | R | material 8 · ⚑ S4-6 |
| 4 | 주말 잘 보내세요! | ¡buen fin de semana! | R | material 8 · ⚑ S4-6 |
| 5 | 같이 갈까요? | ¿vamos juntos? | R | material 2 (Conversacional 1) |
| 5 | 시간이 있어요 | estoy libre (tengo tiempo) | F | tarjeta de sala, ronda 2 · ⚑ S5-18 |
| 5 | 몇 시에 만나요? · 어디에서 만나요? · ___에 봐요! | ¿a qué hora / dónde nos juntamos? · ¡nos vemos el…! | F | material 3.5, diálogo y ronda 2 · ⚑ S5-2 |
| 5 | 말하세요 · 쓰세요 · 읽으세요 · 고르세요 · 연결하세요 · 바꾸세요 | di · escribe · lee · elige · une · cambia | R | consignas con glosa desde la S5 (política D) |
| 6 | ___은/는요? | ¿y el…? (para otro día) | F | diálogo y ronda 3 (como ___ 씨는요? de la S1) |
| 6 | 노래방 | karaoke | R | diálogo (노래 + 방: palabras a pedido) · ⚑ S6-3 |
| 7 | 한국 사람처럼 말해요! | ¡hablas como coreano! | R | material 2 y diálogo · ⚑ S7-2 |
| 7 | 에게 | a (alguien), escrito | R | material 3.4 |
| 7 | 저는 아니에요 | yo no | F | publicado · ⚑ D-11 |
| 7 | 오천 원 · 오만 원 | cinco mil · cincuenta mil wones | T | billetes (tarjeta de sala, ronda 2) |
| 8 | 수고하셨습니다 | buen trabajo (respetuoso) | R | material 8 · ⚑ S8-2 |
| 8 | 시작! · 끝! · ___분 남았어요 · 대답하세요 · 과거로/미래로 바꾸세요 | ¡empiecen! · ¡terminó! · quedan ___ minutos · responde · cambia al pasado/futuro | R | consignas del examen, en voz de Jay o con glosa · ⚑ S8-3, S8-7 |

**Tarjeta de números [YA] (S2; la entrega producción, Jay no la produce):** nativos 1–10 · 스물, 서른, 마흔, 쉰, 예순, 일흔, 여든, 아흔 (para la edad) · 한/두/세/네/스무 + 살/시/명 · los 12 meses con **유월** y **시월** destacados · lunes a domingo · la regla de bolsillo (hora = nativo · minutos, fechas, teléfono y precios = sino) · para reconocer: 천 원, 만 원.

---

## D. Política de "adiós romanización" en Básico 2

**Regla:** Básico 2 **no usa romanización** en ningún material del curso (Fase 1 §7.4: "Básico 2 en adelante: coreano + español contextual → coreano con glosa · romanización: nunca · pronunciación: [ ] en Hangul"). La política de la Fase 1 no deja casos puntuales para los cursos de adultos desde Básico 2: la romanización queda solo para el marketing (reels, taller gratis) y para la nota a las familias de Niños.

| Contexto | Cómo se hace en Básico 2 |
|---|---|
| Deck, hojas, quizzes, examen, mensajes del grupo | Coreano + español. Desde la S5, las consignas simples van en coreano con glosa (읽으세요 · lean). La pronunciación, siempre en Hangul entre corchetes: 먹었어요 [머거써요] |
| Nombres propios | En el texto en español, en su forma habitual (Seúl, Busan, Jeju, BTS): eso no es romanización de estudio. En la frase coreana, en 한글 (서울에 갈 거예요) |
| Lector y Dubu | La romanización aparece en la línea de corrección de Practicar, en el explorador de Aprender 7, en las opciones del Contrarreloj y en los barrios 1–4 de Dubu. **No se toca código en octubre**: por eso se asignan **Números** (opciones en cifras), **Pictogramas** (sin romanización en preguntas ni opciones), **Palabras** diciendo la palabra en voz alta antes de mirar y **Dubu 5–6** (solo oído); el Contrarreloj queda siempre como extra |
| Chat de Zoom y WhatsApp | Si alguien escribe en letras latinas, Jay responde con la misma frase en 한글, sin reproche. Si no tiene teclado: guía de teclado (G.2) |
| Alumno con lectura lenta (perfil C) | El puente es el **audio** (clip del sitio o una nota de voz de 10 s de Jay) y el 한글 entre corchetes, nunca letras latinas (plan B0.3) |
| Ex-alumnos de julio | Su material traía corchetes con romanización a la española ([cho-nun], [ga-io]). En Básico 2 **los corchetes son siempre 한글**. Se explica el día 1 y se repite en una línea en la S3 |

**Qué hace Jay en clase [YA]:** el texto de abajo, en sus palabras, en los minutos de bienvenida de la S1 (1 minuto); en la S3, una línea («¿se acuerdan de los corchetes de julio? Ahora siempre van en 한글: [감니다]. Nada de letras latinas», guía de la S3, bloque 6); y cada vez que corrige pronunciación, escribe la forma entre corchetes en el chat.

> **Texto para el alumno** (va, tal cual, en la sección 2 del material de la S1 y se repite en una línea en la S3; en el control final se alineó palabra por palabra con el material)
>
> **Adiós, romanización (y por qué es una buena noticia)**
> En Básico 2 ya no vas a ver palabras coreanas escritas con nuestras letras. Si vienes del Nivel 1 de julio, acuérdate de los corchetes con letras latinas: desde hoy, cuando necesites saber cómo suena algo, **el corchete va a estar en 한글**: 저는 **[저는]**, 먹었어요 **[머거써요]**. Te contamos por qué:
> - **Ya lees 한글.** Si lees 한글, la romanización no te suma: te resta, porque tu ojo se va primero a las letras que conoces.
> - **Te hace pronunciar en español.** La *j* se lee con jota, *eo* parece dos vocales y *g, k, kk* parecen la misma letra. En coreano son sonidos distintos.
> - **No te dice cómo suena de verdad.** 먹었어요 se escribe con letras latinas de una forma y se dice [머거써요]; 갈 거예요 se dice [갈꺼에요]. El corchete en 한글 sí te lo muestra, y en este curso vas a aprender por qué suena así.
> - **Fuera de clase no existe.** Ni en KakaoTalk, ni en un menú, ni en los subtítulos, ni en el TOPIK.
>
> **Cómo lo hacemos:** si una palabra no te sale, escúchala (con el 🔊 de este material, en la grabación, en el Lector o pídele a Jay una nota de voz en el grupo) y mira el corchete. Si el Lector te muestra letras latinas, tápalas con el dedo. Y si todavía no tienes el teclado coreano, instálalo esta semana (guía al final de la sección 9): el examen final se escribe en 한글. 화이팅!

---

## E. Evaluación del curso

### E.1 Principios
Se evalúa lo que el alumno puede **hacer** en coreano; pocas evidencias y todas útiles; primero el comentario, después la nota; "evaluamos para orientar, no para castigar" (Guía del Alumno); "la clase 8 sirve para ubicarte en el siguiente peldaño, no para 'reprobar'" (PDF del programa). **Nada se evalúa antes de enseñarse**, y lo del último día se usó antes como fórmula (E.6).

### E.2 Componentes: dos tablas publicadas que no coinciden

| | Ficha `a12` (`cursos_es.json`, Programa Completo, PDF por curso) | Guía del Alumno entregada (y términos, FAQ, Parte I) |
|---|---|---|
| Participación | 40 % "participación y quizzes" (asistencia + intervención en pares + quizzes) | 25 % (asistencia en vivo **o grabación + tarea**, y participación oral) |
| Tareas | 30 % (al menos 6 de 7 entregas; la hoja de partículas de la S7, obligatoria) | 25 % |
| Quizzes | Dentro del 40 % | 15 % |
| Final | 30 % "examen A2 escrito + oral" | 35 % "examen escrito + oral corto" |
| Certificado | Nota ≥ 60 % **y** ≥ 75 % de asistencia (6 de 8 **en vivo**; "ver la grabación no cuenta") | Por participación, con ≥ 75 % de asistencia **en vivo o grabada con la tarea**; el 60 % es solo recomendación de nivel |
| Entrega | "Semana del 7 de diciembre" | "Lunes 7 de diciembre" (el PDF del programa dice "en la última clase o por correo esa misma semana") |

**[regla del certificado: pendiente de decisión de Jay]** (DECISIÓN DE JAY 1). Recomendación, la misma de la Fase 1 (decisión 1) y de Básico 1: la **de la Guía del Alumno**, que es la que los alumnos ya recibieron y la que no contradice los términos; reparto del final: mitad y mitad (examen 40 pts → 17,5 % · conversación 16 pts → 17,5 %). **Mientras Jay decide, se registra todo por separado:** asistencia en vivo · asistencia por grabación + tarea · cada tarea · cada quiz · examen · oral. Así se puede aplicar cualquiera de las dos reglas el 4 de diciembre.

### E.3 Chequeos semanales cortos (quizzes 1–6 y los dos quizzes en línea)

Quiz de 5 minutos al inicio de las clases 2 a 7 (publicado): 4 ítems sobre la clase anterior + **1 ítem con formato TOPIK I** [YA] (Fase 1 §7.3 y §9.3: un ítem oficial publicado en topik.go.kr, del tipo que calza con el tema de la semana, citando la edición y el número ⚑ D-12). Se corrige en el momento y se anota; las claves van en la guía de cada semana (PROFE).

| Quiz | Abre la clase | Evalúa | 4 ítems de la semana (tipo) | Ítem TOPIK I (tipo) |
|---|---|---|---|---|
| 1 | 2 | S1 | 학생___ 아니에요 (이/가) · 고향___ 어디예요? / 제 고향___ 멕시코예요 (이 / 은) · 있어요 o 없어요 con un dibujo · 살다 → ___ | Lectura: "¿de qué se habla?" (직업 · 가족 · 취미) |
| 2 | 3 | S2 | Una hora en 한글 (7:30) · una edad (20 → 스무 살, el ítem que B.3 anticipa como más fallado) · una fecha (6월 15일 → 유월 십오 일) · 몇 시에 자요? respondida con 에 | Lectura de un horario o una fecha |
| 3 | 4 | S3 | 덥다 → ___ · 모르다 → ___ · 회사___ 일해요 (에서) · ¿cuál es formal? 가요 / 갑니다 | Lectura: un aviso corto |
| 4 | 5 | S4 | 가다 → 갔어요 · 먹다 → 먹었어요 · 대학생이다 → 대학생이었어요 · 아홉 시___ 여섯 시___ 일했어요 | Lectura: mini-texto de un fin de semana |
| 5 | 6 | S5 | 가다 → 갈 거예요 · 먹다 → 먹을 거예요 · 살다 → 살 거예요 · 지하철___ 가요 (로) | Escucha o lectura: un plan |
| 6 | 7 | S6 | Situación → 안 o 못 · 먹어요 → 먹지 않아요 · 수영하다 → 수영할 수 있어요 · 운동해요 → 운동 안 해요 | Lectura: un mensaje de invitación |

**Quizzes en línea (publicados):** 10 preguntas en la **S3** (presente e irregulares; se revisa al abrir la clase 4) y en la **S5** (futuro y expresiones de tiempo; se revisa al abrir la clase 6). Formulario con autocorrección (plataforma: DECISIÓN DE JAY 5). Cuentan como tarea de esa semana.

### E.4 Mitad del curso (S4 · 4 de noviembre)
Lo publicado promete "guía de estudio y comentarios de tu profesor a mitad de curso". Se cumple **sin agregar un examen**:
1. **Evidencia que ya existe:** diagnóstico de la S1, audios de la S1 y la S2, quizzes 1–3, quiz en línea 1, hojas 1–3 y el mini-diario oral de la clase 4.
2. **Salida para el alumno:** la **guía de estudio de mitad de curso de Básico 2** (S1–S4: presentarse, números y hora, presente e irregulares, 에/에서, pasado; hay que producirla, G.2) + **un comentario de 3 líneas** de Jay: una fortaleza · un foco · el siguiente paso. Plazo propuesto: **domingo 8 de noviembre** (DECISIÓN DE JAY 8). Presupuesto realista: 15 × 3 minutos.
3. **Parejas nuevas** para las semanas 5–8, con la misma regla (B0.2).
4. Si alguien sigue en C de lectura o de estructuras en la S4: conversación de 5 minutos con Jay por WhatsApp y plan de refuerzo (no cambia el curso).

### E.5 Evaluación final (S8 · 2 de diciembre)

**Examen final escrito** (publicado como "examen A2 de la casa"): **30 minutos cronometrados dentro de la clase 8** (21:10–21:40), en línea, con Jay presente en la sala principal; **40 puntos en 4 secciones**; sin romanización; se tipea en 한글. Se devuelve corregido dentro de la semana (propuesta: vie 4 dic).

| Sección (publicada) | Pts | Diseño de octubre |
|---|---|---|
| 1 · Vocabulario bidireccional | 10 | 5 coreano → español + 5 español → coreano (tipeado). Solo **núcleo (N y N↺) de la S1 a la S7** + 어렵다 y 쉽다 (usados desde la S3); **nada del núcleo nuevo de la S8**, que se ve ese día. Un ítem por semana y dirección como máximo |
| 2 · Partículas | 10 | 10 huecos con recuadro de 11 (은/는 · 이/가 · 을/를 · 에 · 에서 · 도 · 만 · 밖에 · 보다 · 마다 · 한테), en frases del curso. Es **elegir** la correcta: por eso 밖에 y 한테 (usados en marcos fijos) pueden entrar. Formato idéntico al de la hoja de partículas de la S7 |
| 3 · Tiempos y datos | 10 | 3 frases al pasado (una con irregular: 들어요 → 들었어요) · 3 al futuro (una con ㄹ: 살아요 → 살 거예요) · 2 fechas escritas como se leen (p. ej., 10월 9일 → 시월 구 일) · 2 horas (p. ej., 9:30 · 11:15) |
| 4 · Traducción y producción | 10 | **Traducción** de 6 frases con -아요/어요 y -았어요/었어요 (3 coreano → español y 3 español → coreano; 0,5 pts cada una = 3) + **producción personal** de 5 frases sobre ti: una de tu rutina (presente), una de tu último fin de semana (pasado), un plan (futuro), algo que no haces o no puedes, y una libre (1 pt por frase comprensible con el tiempo pedido = 5; + 2 pts de precisión: partículas y conjugación) |

**Fuera del examen:** -고 y -지만 como ítems obligatorios (E.6) · -ㅂ니다 en producción (solo reconocer) · 처럼, 쯤 y 의 · -지 않아요 / -지 못해요 en producción · 주세요, -고 싶다, -(으)세요, -(으)ㄹ까요, -아서. **Simulacro corto** (publicado): 10 preguntas con las mismas 4 secciones, en el grupo el **lun 30 nov**.
**Base existente:** el "examen A2 de la casa" **no está en el repo**, pero sí en la PC de Jay: `D:\Deskotop to D\2. Korean Clases\한국어 수업 A2\한국어 시험(A2) (1).pdf` + `HOJADERESPUESTAS_A2_Profesor.xlsx` y `_Alumno.xlsx` (curso del Instituto Chileno Coreano, 2020–21; nota en escala 1–7). Veredicto: **adaptar**, no usar tal cual: su formato no es el publicado (4 secciones, 40 pts) y trae vocabulario y formas que este curso no enseña (p. ej., 졸업했어요, 불렀어요, 변호사, 외국인, 숟가락, 젓가락, 설탕). Sus ítems de fechas, horas, teléfono, traducción y partículas sí sirven de modelo (DECISIÓN DE JAY 0).

**Conversación evaluada** (publicada): 5 minutos en pares sobre 6 temas del curso, en salas, con Jay rotando y puntuando con la rúbrica de 4 criterios; quien no alcance a ser escuchado envía **un audio de 3 minutos respondiendo a las mismas preguntas dentro de las 48 horas**. Consigna, modelo, logística y rúbrica: sección F.

### E.6 "-고 y -지만 enseñados y evaluados el mismo día", resuelto sin cambiar lo publicado
La Fase 1 (§15 #5) detectó que la clase 8 enseña -고 y -지만 y ese mismo día evalúa. En octubre:
1. **-고 entra como fórmula en la S3** [YA] (씻고 아침을 먹어요), con ejemplos de rutina en los que suena natural, y se reutiliza en la S4 con pasado (먹고 마셨어요: el tiempo va solo en el último verbo) y en la S5 con futuro (보고 찍을 거예요). Aparece en tareas de reto y en el mini-diario.
2. **-지만 entra como fórmula en la S6** [YA] (운전은 할 수 있지만 수영은 못 해요, donde el contraste es natural) y se reutiliza en la S7 al comparar (한국어는 어렵지만 재미있어요: 어렵다 se usa desde la S3).
3. **La S8 no los "enseña"**: sus 10 minutos de calentamiento (publicados) nombran la regla de algo que el grupo ya dice, y lo practican en cadena.
4. **Examen:** ningún ítem obligatorio de -고 o -지만. Pueden aparecer en la traducción coreano → español (reconocer) y usarse en la frase libre de la producción, donde cuentan como una frase más (no hay puntos extra).
5. **Conversación:** la rúbrica publicada no tiene criterio de conectores; la tarjeta invita a usarlos, y Jay los comenta en la devolución.
6. **Material de repaso:** la hoja de la S7 incluye 2 frases para unir con -고 y 2 con -지만 (reto).

### E.7 Certificado y cierre
- **Regla:** ver E.2 → **[regla del certificado: pendiente de decisión de Jay]**. En Básico 2, 75 % = **6 de las 8 clases**.
- **Línea de nivel** publicada: "Básico 2 (A1.2) · CEFR A1 completo (A2 parcial) · preparación TOPIK I niveles 1–2". Recomendación (Fase 1 decisión 5): "Básico 2 (A1.2) · contenidos del nivel A1 (MCER)"; si Jay la cambia, aviso breve en la S7 (DECISIÓN DE JAY 2).
- **Quien falta a la clase 8** (examen y oral): lo publicado cubre solo el oral no escuchado (audio de 3 min en 48 h). Para el escrito, propuesta: rendirlo en línea con tiempo hasta el **vie 4 dic, 22:00** → **[regla del certificado: pendiente de decisión de Jay]**.
- **Pase a Conversacional 1:** la ficha dice que con el certificado se entra directo, sin test; la nota publicada para el profesor dice "comunica ese mismo día quién pasa y a quién le conviene un refuerzo". Propuesta: ese día, un mensaje general ("todos reciben su resultado el viernes"); el **vie 4 dic**, la recomendación individual con el examen corregido (DECISIÓN DE JAY 11). **Dónde sigue** Básico 2 en enero no está resuelto en los textos públicos (DECISIÓN DE JAY 6).
- **Calendario:** simulacro lun 30 nov · examen y oral mié 2 dic · audios de reposición hasta vie 4 dic 22:00 · devolución e informe vie 4 dic · certificados y preventa lun 7 dic (DECISIÓN DE JAY 3 sobre la fecha).
- **Audio "antes y después":** diagnóstico de la S1 + audio de 1 minuto en tres tiempos de la S8. Es la evidencia más motivadora y la que abre Conversacional 1.

---

## F. Proyecto final: "Mi vida en tres tiempos"

En octubre se mantiene el formato publicado: **conversación de 5 minutos en pares sobre 6 temas del curso** (clase 8), con la rúbrica de 4 criterios, y después de la clase el **audio de 1 minuto en tres tiempos**. Lo que se agrega [YA] es preparación: la tarjeta y las parejas salen en la S7 y el minuto libre de cada semana (B.11) es el ensayo. El proyecto de la Fase 1 ("Mi semana y mi plan · 지난주와 다음 주", con agenda escrita) queda para enero (anexo I).

### F.1 Consigna (ALUMNO)

> **Texto para el alumno**
>
> **Tu proyecto final: "Mi vida en tres tiempos"**
> En la clase 8, después del examen escrito, vas a conversar **5 minutos en coreano** con tu pareja, en una sala de Zoom, con la cámara encendida. Jay va a pasar por las salas y a escucharlos. No es un examen de memoria: es una conversación de verdad, con lo que aprendiste en estas 8 semanas.
>
> **La tarjeta (6 temas).** Pregúntense y respondan en cualquier orden. Intenten tocar **al menos 4 temas** y usar **presente, pasado y futuro**.
>
> | Tema | Para empezar |
> |---|---|
> | 1 · Tu día | 보통 몇 시에 일어나요? · 매일 뭐 해요? |
> | 2 · Tu último fin de semana | 주말에 뭐 했어요? · 누구하고 했어요? |
> | 3 · Tus vacaciones | 휴가에 어디에 갈 거예요? · 뭐로 갈 거예요? |
> | 4 · Lo que sabes hacer | 뭐 할 수 있어요? · 수영할 수 있어요? |
> | 5 · Tu familia | 형제가 있어요? · 가족이 몇 명이에요? |
> | 6 · Corea y tu país | ___하고 한국은 뭐가 달라요? · 어디가 더 ___아요/어요? |
>
> **Para que suene a conversación:** responde y devuelve la pregunta (___ 씨는요?) · reacciona (저도요! · 맞아요! · 와!) · une ideas con **-고** y **-지만** · si no entendiste, di **네?** y tu pareja lo repite.
>
> **Cómo lo preparas:** en la clase 7 recibes la tarjeta y tu pareja. Practiquen al menos una vez por WhatsApp o Zoom (5 minutos, cronometrados). No escribas un guion para leer: apréndete las ideas y un par de frases por tema. El lunes 30 de noviembre llega el simulacro corto del examen escrito.
>
> **Qué miramos:** que sigas hablando sin pasar al español, que uses bien presente, pasado y futuro, las partículas y la pronunciación. **Hablar lento no baja la nota.** Si te quedas en blanco, mira la tarjeta y cambia de tema.
>
> **Si no alcanzamos a escucharte, o faltaste ese día:** mandas un audio de 3 minutos respondiendo las preguntas de la tarjeta, dentro de las 48 horas.
>
> **Después de la clase:** grabas tu **presentación de 1 minuto en tres tiempos** (quién eres, qué hiciste en este curso y qué harás) y la subes al grupo. Escúchala junto a tu audio de la semana 1: ese es tu "antes y después". 화이팅!

### F.2 Lenguaje esperado (PROFE)

| Tema de la tarjeta | Estructuras | Semana | Ejemplo |
|---|---|---|---|
| 1 · Tu día | -아요/어요 + irregulares · horas con 에 · 쯤 · 에/에서 · -고 | S2–S3 | 여섯 시 반쯤 일어나요. 씻고 커피를 마셔요. |
| 2 · Fin de semana | -았/었어요 · 하고/(이)랑 · 에서 · 부터~까지 | S4 | 언니랑 카페에 갔어요. 빵을 먹고 커피를 마셨어요. |
| 3 · Vacaciones | -(으)ㄹ 거예요 · (으)로 · -거나 | S5 | 이월에 바다에 갈 거예요. 수영하거나 사진을 찍을 거예요. |
| 4 · Lo que sabes hacer | -(으)ㄹ 수 있어요/없어요 · 못 · 안 · -지만 | S6 | 수영은 할 수 있지만 운전은 못 해요. |
| 5 · Familia | N이/가 있어요 ("tener") · 명 · 보다 | S1, S7 | 오빠가 한 명 있어요. 오빠는 저보다 키가 커요. |
| 6 · Corea y tu país | 보다 + 더 · 마다 · 도/만 | S7 | 멕시코 음식이 한국 음식보다 더 매워요. 그렇지만 사람마다 달라요. |
| Interacción | ___ 씨는요? · 저도요 · 맞아요 · 네? | S1, S7, Básico 1 | — |

### F.3 Criterios (PROFE)
Se puntúa con la rúbrica de F.6. **Mínimo esperado para "está listo para Conversacional 1":** conversa los 5 minutos con pausas pero sin pasar al español (1–2 palabras sueltas se toleran) · usa los tres tiempos al menos una vez cada uno, con la forma correcta · toca al menos 4 de los 6 temas · hace al menos 2 preguntas a su pareja · se le entiende con un interlocutor paciente. -고 y -지만 **suman en el comentario, no en la nota** (E.6).

### F.4 Respuesta modelo (PROFE · no se entrega completa: en la S7 se muestran solo 3 intercambios como ejemplo)

Una conversación de unos 4–5 minutos a ritmo de A1, solo con lenguaje de la lista C y de Básico 1. A = 카밀라 (chilena, trabaja en una oficina) · B = 다니엘 (mexicano, universitario). ⚑ D-13.

| # | Coreano | Español |
|---|---|---|
| 1 | A: 다니엘 씨, 안녕하세요! 요즘 어떻게 지내요? | ¡Hola, Daniel! ¿Cómo has estado? |
| 2 | B: 잘 지내요. 요즘 조금 바빠요. 카밀라 씨는요? | Bien. Estos días ando un poco ocupado. ¿Y tú, Camila? |
| 3 | A: 저도 바빠요. 매일 아홉 시부터 여섯 시까지 일해요. | Yo también. Trabajo todos los días de nueve a seis. |
| 4 | B: 보통 몇 시에 일어나요? | ¿A qué hora te levantas normalmente? |
| 5 | A: 여섯 시 반쯤 일어나요. 씻고 커피를 마셔요. 그리고 회사에 가요. 다니엘 씨는요? | Como a las seis y media. Me ducho y tomo café. Y me voy a la oficina. ¿Y tú? |
| 6 | B: 저는 대학생이에요. 수업이 열 시에 있어요. 여덟 시쯤 일어나요. | Yo soy universitario. Tengo clase a las diez. Me levanto como a las ocho. |
| 7 | A: 주말에 뭐 했어요? | ¿Qué hiciste el fin de semana? |
| 8 | B: 토요일에 친구하고 공원에 갔어요. 같이 운동했어요. 정말 재미있었어요. | El sábado fui al parque con un amigo. Hicimos ejercicio juntos. Lo pasamos muy bien. |
| 9 | B: 일요일에는 집에서 쉬었어요. 카밀라 씨는 주말에 뭐 했어요? | El domingo descansé en casa. ¿Y tú qué hiciste el fin de semana? |
| 10 | A: 저는 언니랑 카페에 갔어요. 빵을 먹고 커피를 마셨어요. 맛있었어요! | Fui a un café con mi hermana. Comimos pan y tomamos café. ¡Estaba rico! |
| 11 | B: 와, 좋아요! 휴가에 뭐 할 거예요? | ¡Qué bueno! ¿Y qué vas a hacer en tus vacaciones? |
| 12 | A: 이월에 바다에 갈 거예요. 버스로 갈 거예요. 수영하거나 사진을 찍을 거예요. | En febrero voy a ir a la playa. Voy a ir en bus. Voy a nadar o a sacar fotos. |
| 13 | B: 수영할 수 있어요? | ¿Sabes nadar? |
| 14 | A: 네, 수영은 할 수 있지만 운전은 못 해요. 다니엘 씨는요? | Sí, nadar sé, pero manejar no. ¿Y tú? |
| 15 | B: 저는 운전할 수 있지만 춤은 전혀 못 춰요! | Yo sé manejar, ¡pero no sé bailar para nada! |
| 16 | A: 하하, 저도 춤은 못 춰요! | ¡Jaja, yo tampoco sé bailar! |
| 17 | B: 형제가 있어요? | ¿Tienes hermanos? |
| 18 | A: 네, 오빠가 한 명 있어요. 오빠는 저보다 키가 커요. | Sí, tengo un hermano mayor. Es más alto que yo. |
| 19 | B: 저는 형제가 없어요. 외동이에요. | Yo no tengo hermanos. Soy hijo único. |
| 20 | A: 다니엘 씨, 멕시코하고 한국은 뭐가 달라요? | Daniel, ¿en qué se diferencian México y Corea? |
| 21 | B: 음… 멕시코 음식이 한국 음식보다 더 매워요! 하하. 그렇지만 사람마다 달라요. | Mmm… ¡la comida mexicana es más picante que la coreana! Jaja. Pero depende de la persona. |
| 22 | A: 맞아요. 다니엘 씨, 한국어 공부 재미있어요? | Es verdad. Daniel, ¿te gusta estudiar coreano? |
| 23 | B: 네, 한국어는 어렵지만 정말 재미있어요! | Sí, ¡el coreano es difícil, pero muy entretenido! |
| 24 | A: 저도요! 다음에 같이 카페에 가요! | ¡Yo también! ¡La próxima vamos juntos a un café! |
| 25 | B: 좋아요! | ¡Dale! |

Notas para Jay: 그렇지만 (línea 21) es vocabulario de la S8; si un alumno no lo usa, basta -지만 o nada. La línea 16 junta 도 y 은 (저도 춤은): natural, pero no se exige. "음…" y "하하" son relleno natural y bienvenido: cuentan a favor de la fluidez.

**Modelo del audio de 1 minuto en tres tiempos (después de la clase):**

| Coreano | Español |
|---|---|
| 안녕하세요! 저는 카밀라예요. 칠레 사람이에요. 산티아고에 살아요. | ¡Hola! Soy Camila. Soy chilena. Vivo en Santiago. |
| 저는 회사원이에요. 매일 아홉 시부터 여섯 시까지 일해요. | Soy empleada. Trabajo todos los días de nueve a seis. |
| 시월부터 십이월까지 이 수업에서 한국어를 공부했어요. | De octubre a diciembre estudié coreano en este curso. |
| 주말마다 숙제를 했어요. 한국어는 어렵지만 재미있어요. | Todos los fines de semana hice la tarea. El coreano es difícil, pero entretenido. |
| 내년에 회화 수업을 들을 거예요. 그리고 한국에 갈 거예요. | El próximo año voy a tomar la clase de conversación. Y voy a ir a Corea. |
| 감사합니다! | ¡Gracias! |

### F.5 Logística del día (PROFE)
- **S7 (25 nov):** Jay publica en el grupo las parejas (por perfil: A + B o B + B; trío si el número es impar) y la tarjeta de F.1.
- **S8, 21:40–21:41:** consigna (45 s); las salas por pareja se arman durante el examen (21:12–21:20), sin abrirlas. **21:41–21:56:** con la tarjeta en pantalla o en el celular, cada pareja conversa **dos veces 5 minutos** (primero abre A, temas 1–3; después abre B, temas 4–6) y una ronda libre de 3 minutos (tríos: 4 minutos por persona). Jay rota por todas las salas (≈ 2 minutos por sala) y puntúa en la planilla mientras escucha. Cierre automático a las 21:56 + 60 s y **vuelta a la sala principal a las 21:57** para la frase ancla (수고했어요! — 감사합니다!), 두 손으로 y el coro de las 3 frases clave, que así quedan en la grabación (guía de la S8, ajuste 2; ⚑ S8-4). El resultado llega el vie 4 dic (E.7).
- **Grabación [YA · DECISIÓN DE JAY 4]:** 2 minutos por sala no alcanzan para puntuar 5 minutos. Propuesta: cada pareja graba su conversación con el celular (nota de voz de WhatsApp, junto al computador) y la envía a Jay esa misma noche. Jay puntúa con lo que escuchó en vivo y usa el audio solo si le falta información. Con aviso en la S7, consentimiento en el grupo y borrado después del informe. **Ensayo:** el minuto libre de la S6 o la S7 se graba igual, para probar el celular.
- **Quien no alcanza o falta** (publicado): audio de 3 minutos respondiendo las 6 preguntas de la tarjeta, dentro de las 48 horas (hasta el vie 4 dic, 22:00).
- **Reglas de la sala:** cámara encendida; la tarjeta sí, un guion escrito no; si un compañero se desconecta, el otro espera 1 minuto y avisa por el chat.

### F.6 Rúbrica para el profesor (PROFE · los 4 criterios publicados, con descriptores para Básico 2)

| Criterio (publicado) | 4 · Excelente | 3 · Bien | 2 · En proceso | 1 · Inicial |
|---|---|---|---|---|
| **Fluidez sin volver al español** | Sostiene los 5 minutos con pausas breves; pregunta, responde y reacciona; nada de español | Pausas para pensar; 1–2 palabras en español; sigue sola o solo | Frases sueltas; depende de la tarjeta o de su pareja; vuelve al español a veces | No sostiene el intercambio sin ayuda |
| **Presente, pasado y futuro** | Los tres, bien formados y bien elegidos (어제… 갔어요 · 내일… 갈 거예요) | Los tres; 1–2 errores de forma que no confunden (먹았어요*) | Sobre todo presente; pasado o futuro con errores que a veces confunden | Solo presente |
| **Partículas** | 이/가, 을/를, 은/는, 에/에서 bien + al menos una de 도, 만, 보다, 마다 | 1–2 errores que no bloquean; omitir 을/를 en lo oral es leve | Errores u omisiones frecuentes; se entiende | Errores que bloquean |
| **Pronunciación** | Clara; 받침 sin vocal de apoyo, ㅓ/ㅗ y tensas bien; la 연음 sale sola en las frases del curso | Acento leve; todo se entiende | Vocal de apoyo, ㅓ/ㅗ o tensas a veces confunden | Difícil de entender |

**Puntaje oral** = suma de los 4 criterios (máx. 16). **Lista de chequeo (no suma, ordena el comentario):** temas tocados (de 6) · preguntas hechas (≥ 2) · usó -고 / -지만 · reaccionó (저도요, 맞아요). **Uso cultural (no puntúa en octubre, se comenta):** ___ 씨 con el compañero, 감사합니다 al terminar. La entonación y la ㄹ entre vocales no se evalúan (nota publicada). **Devolución:** 3 líneas por escrito dentro de las 48 horas (una fortaleza primero).

---

## G. Biblioteca de materiales de Básico 2

### G.1 Lo que ya existe (verificado en el repo y en la PC de Jay el 26 sept)

| Archivo | Qué es | Sirve para | Veredicto |
|---|---|---|---|
| `Programa_Completo_Octubre_2026/fuente/cursos_es.json` (a12) · `public/programas/Programa_Basico2_Octubre_2026.pdf` · `Curriculo/publico/Programa_Basico2_A1-2.md` | Syllabus y programa publicados | Fuente de todo este diseño | **Manda**; no se edita en octubre |
| **Deck trilingüe ES/KO/EN de cada sesión** (prometido en `materiales`) | — | Las 8 clases | **No existe** ni en el repo ni en `D:\Deskotop to D\2. Korean Clases\한국어 수업 A2\`. Hay que producirlo (G.2) |
| **Hojas de actividad 1–7 + hoja de partículas en formato de examen** (prometidas) | — | Tareas | **No existen**. Hay que producirlas (G.2) |
| **"Examen A2 de la casa"** (`Desarrollo_Clases_2026-2` lo da por listo) | `D:\…\한국어 수업 A2\한국어 시험(A2) (1).pdf` + `HOJADERESPUESTAS_A2_Profesor.xlsx` / `_Alumno.xlsx` (2020–21, fuera del repo) | Base del examen final | **Adaptar** al formato publicado (E.5; DECISIÓN DE JAY 0) |
| Clases de Jay 2020–21 en `D:\…\한국어 수업 A2\`: `Tiempo gramatical.pptx/.docx/.pdf` · `친구를 만났어요 201230.pdf` · `롯데월드에 갈 거예요.pdf` · `거나 201210.pdf` · `이나 2020년 11월 26일.pdf` · `영화를 안 봐요.pdf` · `쯤 수업 201202` · `의 201117.pdf` / `의 210111.docx` · `Torpedo A.V` | Explicaciones y ejemplos propios por tema | Ideas para los decks S3–S7 | **Consultar**: son de clases de 100 minutos y otro orden; revisar romanización y rojo antes de reutilizar una lámina |
| `D:\…\한국어 수업 A2\한국어 기초 2반 문법 교제.pdf` | Extracto escaneado del libro | Referencia de Jay | **Uso interno.** No se sube a la carpeta del curso ni se comparte (derechos de autor) |
| `A1_Nivel_1/05_Fechas_Numeros/` (`Clase_Numeros_Fechas_Hora.pptx`, `Sesion_05_Fechas_Numeros_v4.pptx`, `OnePager_Numeros_Sino_vs_Nativo.pdf`, `Guia_Numeros_Coreanos_A1.pdf`, `Lista_Contadores_Coreanos.pdf`, `Guia_Contadores_Coreanos_A1.pdf`) | Números, fechas y hora de julio (90 min) | S2 y la tarjeta de números | **Adaptar**: sin romanización, en 60 min; los contadores de cosas (개, 잔) quedan como "a pedido" |
| `A1_Nivel_1/07_Rutina_Diaria/Sesion_07_Rutina_Diaria_v2.pptx` | 부터~까지, -고, irregular ㄷ, nativos | S3 y S4 | **Adaptar** |
| `A1_Nivel_1/09_Pasado/Sesion_09_Pasado.pptx` + materiales | -았/었어요, -고, 으 | S4 | **Adaptar**: quitar -아서 (es de Conversacional 1) |
| `A1_Nivel_1/10_Futuro_Vacaciones/Sesion_10_Futuro_Vacaciones.pptx` + materiales | -을 거예요, -고 싶다, -지만, ㅂ | S5 (y -지만 en la S6) | **Adaptar**: -고 싶다 va a enero |
| `A1_Nivel_1/11_Invitar_Cierre/Sesion_11_Cierre_A1.pptx` + materiales | -ㄹ까요, -으러, -을 수 있다, 못 | S6 | **Adaptar**: -ㄹ까요 y -으러 solo como reconocimiento |
| `A1_Nivel_1/08_Comprar/Sesion_08_Comprar.pptx` | Contadores, 주세요, precios | S7 (천, 만, 밖에) y enero | Usar solo las láminas de precios |
| `A1_Nivel_1/Particulas_Coreanas_Editable.pptx` · `Guia_Particulas_Coreanas_ES.md` · `Libro_PrimerasPalabras_Cap3_Particulas.pdf` | Partículas desde el español | S1 (은/는 vs 이/가), S3 (에/에서), S7 | **Usar** como lámina y lectura de apoyo |
| `A1_Nivel_1/Guia_Estudio_MidTerm_A1.docx` · `Examen_MidTerm_A1.docx` | Lo que se dio en julio | Diagnóstico (B0) y repaso de la S1 | Referencia; **no entregar** (romanización en todo el texto y link viejo `/lector-hangul`) |
| `A1_Nivel_1/200_Flashcards_Coreano_A1.xlsx` (hoja "Importar Anki-Quizlet") | 230 tarjetas por campos | Flashcards de Básico 2 | **Filtrar** por C y ocultar la romanización (trae 36 filas de C) |
| Lector (`/lector-coreano`: Números, Aprender 7, Palabras, Pictogramas, Progreso) · Dubu (barrios 5–6) · taller (`/taller`, YouTube `zmbuLPcgfpw` desde el segundo 2414) · 918 clips (desde el 26 sept, uno por fila de C y por frase clave) | Ecosistema gratis | Tareas (B) y nivelación (B0.3) | **Usar** como está |
| Guía de teclado (`Curriculo/Fase2_Basico1/alumnos/S01_Material_Alumno.md`, sección "Teclado coreano en 5 minutos") | Instalar el 두벌식 | Mensaje de bienvenida de Básico 2 | **Reutilizar** tal cual |
| `A2_Nivel_2/Programa_Cultura_10_Semanas/Decks/` | Decks de Abby (Conversacional) | — | No aplican a Básico 2 |
| Blog del sitio: `/blog/sopa-de-algas-antes-de-un-examen-supersticion-coreana` | Artículo en español | S2 y S6 (lectura cultural opcional) | **Enlazar** |

### G.2 Lo que hay que producir (regla N−2: el material de la semana N está listo al cierre de la semana N−2)

Jay no produce: revisa y aprueba (Fase 1 §14.4). Reglas para todo lo visual: plantilla de la casa, acento azul `#4236F6`, cabeceras navy `#003478`, **nunca rojo** (tampoco en cruces, X, ni en el "semáforo" del diagnóstico: A · B · C), sin romanización, imágenes propias o con licencia libre y **nunca escaneos ni ejercicios del libro**.

| Prioridad | Pieza | Dónde va | Plazo |
|---|---|---|---|
| **P0** | Deck S1 y S2 (trilingüe: español + coreano + una línea en inglés por lámina; alcance del inglés: DECISIÓN DE JAY 7) | Drive · guion en `profes/S01…S02` | **vie 9 oct** |
| **P0** | Hoja 1 y Hoja 2 + tarjeta de números [YA] | `alumnos/S01…S02_Material_Alumno.md` → PDF | **vie 9 oct** |
| **P0** | Protocolo del diagnóstico: tarjeta de 6 preguntas (también para quien responde por audio), tarjeta de lectura de 5 palabras, planilla A/B/C y mapa del grupo | `profes/B2_Diagnostico_S1.md` + planilla en Drive | **vie 9 oct** |
| **P0** | Mensaje de bienvenida con guía de teclado + texto "adiós romanización" (D) | Grupo de WhatsApp (el b3 ya existe en `Lanzamiento_Octubre_2026/alumnos/Mensajes_Alumnos.md`; se le suma el teclado) | **lun 12 oct** |
| **P0** | Registro del curso: asistencia en vivo / grabación + tarea / cada tarea / cada quiz / examen / oral, en columnas separadas | Drive | **antes del 14 oct** |
| **P0** | **Publicar los clips de audio** (push a `main` de los 355 clips nuevos de `public/audio/kr`): los 🔊 de los 8 materiales dan error hasta entonces | Quien publique el sitio (Jay) | **lun 12 oct** |
| **P0** | Tarjeta de sala de cada semana como link o PDF (sección 7 de cada material; las guías la citan como `[PLACEHOLDER: link de la tarjeta de sala S0N]`) | Drive · link en el chat | S1 vie 9 oct; las demás, con su deck |
| P1 | Hoja "Calendario del curso" (12 filas, 일월 a 십이월) para la cadena de cumpleaños de la S2 y su captura para el grupo | Drive (hoja o lámina editable) | vie 16 oct |
| P1 | Láminas del quiz de cada semana (2–7) con sus ítems estilo TOPIK I y, aparte, las piezas que las guías piden dibujadas: casa + gato del quiz 1 (S2), las 22 tarjetas del drill (S2), 4 pares con dibujo 에 / 에서 (S3), temporizador de 30 min (S8) | Dentro de cada deck | Con su deck (N−2) |
| P1 | Fotos con licencia libre o dibujo propio (nunca escaneos): S1 dos adultos inclinándose · S2 미역국 · S3 oficina · S4 café de Seúl · S5 caja genérica de palitos (11/11) y mapa Seúl–Jeju–Busan · S6 centro de examen del 수능 (sin menores identificables) · S7 Seúl y Santiago, metro lleno, estante con un solo pan. Las fotos personales (día, fin de semana, plan, escritorio, billetera, tazas) las elige Jay | Dentro de cada deck | Con su deck (N−2) |
| P1 | Clave de la Hoja 3 en PDF para la carpeta (se corrige fuera de clase: guía de la S4, ajuste 3) | Carpeta del curso | jue 5 nov, con la grabación de la S4 |
| P1 | PDF del plan B del examen (mismas 4 secciones, numeradas), sin publicar | Carpeta del curso | vie 20 nov |
| P1 | Planilla del oral en Drive con las parejas de la S7 y la columna "fuente: en vivo / audio" (guía de la S8, C.14) | Drive | vie 20 nov |
| P1 | Decks S3–S8 | Drive | S3 vie 16 oct · S4 vie 23 oct · S5 vie 30 oct · S6 vie 6 nov · S7 vie 13 nov · S8 vie 20 nov |
| P1 | Hojas 3–6 y **hoja de partículas 7 con formato de examen** | `alumnos/S0N_Material_Alumno.md` → PDF | Mismos plazos que su deck |
| P1 | Quizzes 1–6 con clave + selección de ítems TOPIK I (⚑ D-12) | En cada guía (PROFE) | N−2 |
| P1 | Quiz en línea 1 (S3) y 2 (S5) con autocorrección | Formulario (DECISIÓN DE JAY 5) | vie 23 oct · vie 6 nov |
| P1 | Flashcards de Básico 2 sin romanización (desde las 230 de julio + las que faltan) | `alumnos/B2_Flashcards.xlsx` | vie 23 oct |
| P1 | Guía de estudio de mitad de curso (S1–S4) + plantilla del comentario de 3 líneas | `alumnos/B2_Guia_Estudio_Mitad.md` · `profes/B2_Plantilla_Comentario_Mitad.md` | vie 30 oct (entrega a alumnos dom 8 nov) |
| P1 | Tarjeta de la conversación (F.1), planilla de la rúbrica (F.6) y lista de parejas | `alumnos/B2_Proyecto_Final.md` · `profes/B2_Proyecto_Final_Profe.md` | vie 13 nov |
| P1 | Examen final adaptado (E.5) + clave + simulacro corto de 10 preguntas | `profes/B2_Examen_Final_Clave.md` + formulario | vie 20 nov (simulacro al grupo el lun 30 nov) |
| P1 | Tarjetas del minuto libre (B.11) y guion de las 3 frases clave (B.12) | `alumnos/B2_Minuto_Libre.md` · `profes/B2_Frases_Clave.md` | vie 9 oct (todas juntas) |
| P1 | 8 clips `B2_S0N_frases_clave.mp3` | Recorte de la grabación o Jay con el celular | 48 h después de cada clase |
| P1 | Plantilla del certificado (con la línea de nivel que Jay decida) | Jay | antes del lun 30 nov |
| P1 | Informe final por alumno (asistencia, tareas, quizzes, examen, oral, recomendación) | Planilla | vie 4 dic |
| P2 [ENE] | Audioteca A3–A4 (mini-diálogos de 2 voces y monólogos), micro-diagnóstico de 12 ítems, audio del vocabulario con la voz de Jay | — | Anexo I |
| **Hecho** | Audio de todo el vocabulario de C (172 filas) y de las 24 frases clave (voz SunHi) | `public/audio/kr` · URLs en `../audio/Clips_Octubre_2026.md` · enlazados con 🔊 en los 8 materiales | 26 sept · **falta publicarlos** (fila P0 de arriba) |

*No se producen:* los audios de los alumnos, los objetos del escritorio ni las fotos de viaje (son de los alumnos); las fotos de Jay para el R de cada semana las elige Jay (5 minutos por semana).

### G.3 Carpetas, nombres y estructura común

- `Curriculo/Fase3_Basico2/00_Diseno_Basico2.md` · este documento (interno).
- `Curriculo/Fase3_Basico2/profes/S0N_Guia_Profesor.md` · la guía de cada semana (con claves, tiempos, guion de slides y notas). Piezas transversales: `profes/B2_<Pieza>.md`.
- `Curriculo/Fase3_Basico2/alumnos/S0N_Material_Alumno.md` · el material de cada semana (hoja, ejercicios, tarjetas de sala y tarea con destino exacto). **Sin respuestas ni notas internas.** Piezas transversales: `alumnos/B2_<Pieza>.md`.
- **Estructura común (la misma de la Fase 2):** guías: *0. En una mirada · A. Ficha de la semana (17 campos) · B. Plan de clase minuto a minuto (60 minutos · termina a las 22:00) · C. Guía del profesor (C.1 Objetivo · C.2 Checklist · C.3 Secuencia exacta de enseñanza · C.4 Cada estructura en 4 pasos · C.5 Explicaciones pensadas para hispanohablantes · C.6 Pronunciación · C.7 Errores típicos · C.8 Diálogo modelo original · C.9 Preguntas para el grupo · C.10 Extensión (reto) · C.11 Emergencia · C.12 Si vas atrasado · C.13 Plan B técnico · C.14 Evaluación y seguimiento · C.15 Mensaje post-clase · C.16 Clave de respuestas · C.17 Guion de slides) · D. ⚑ Para revisar con nativo y pendientes · E. Anexo "Enero 2027"*. Materiales: *1. Esta semana vas a poder decir… · 2. Vocabulario · 3. Gramática, explicada desde el español · 4. Cómo suena · 5. Diálogo · 6. Ejercicios · 7. En clase · 8. Nota cultural · 9. Tarea de la semana (con reto y rescate) · 10. Ya puedo decir…*.
- **Audio en los materiales (control final):** los 8 materiales enlazan los clips del sitio con 🔊: fila por fila en la S1, la S2 y la S7; en una línea "🔊 Escucha las palabras de la semana" al final de la sección 2 en las S3–S6 y la S8; y las 3 frases de la sección 10 en todas.
- En Drive, lo que se sube después de cada clase sigue la convención del kit: `Curso_S01_Fecha_Tema.pdf` (p. ej., `Basico2_S01_2026-10-14_Re-presentacion.pdf`).

---

## H. Control de calidad (brief §22) aplicado a Básico 2

| Criterio | Estado en este diseño | Pendiente para los redactores |
|---|---|---|
| **Coreano correcto y natural** | Ejemplos con 띄어쓰기 (갈 거예요, 할 수 있어요, 운동 안 해요) y partículas según 받침; nada copiado del libro; se corrigieron las dos invitaciones publicadas que no invitan (S5 y S6); los dudosos llevan ⚑ | Jay revisa cada hoja antes de publicarla; los ⚑ se resuelven antes del plazo N−2 |
| **Nivel adecuado** | Nada fuera de A1.2: sin -고 싶다, -아서 (salvo la fórmula 일이 있어서), -(으)세요, -(으)ㄹ까요, modificadores (salvo 매운 음식, léxico publicado) ni honoríficos | Revisar que ningún ejemplo "se escape" (típico: -고 싶어요, 가서, 볼까요?, 드세요) |
| **Español correcto** | Neutro latinoamericano, con puentes de Chile, México y Colombia | Revisión de estilo con la voz de la marca |
| **Cultura precisa** | Matices [YA] de la Fase 1 §10.5 incorporados (mano en la S1, 먼저 들어가 보겠습니다, cafés sin cifra); fechas verificadas (만 나이 junio 2023, 빼빼로데이 11 nov, 수능 jue 19 nov) | "Muchos", "en muchas oficinas", "en Seúl"; nunca "los coreanos" + verbo |
| **Calidad pedagógica** | Ciclo R-C-G-L por semana; cada tarea prepara la siguiente (datos → rutina → fin de semana → viaje → habilidades → comparaciones → conversación) | La guía marca las 4 etapas, el reto y el rescate |
| **¿El alumno habla coreano en clase?** | ≥ 20 minutos por clase en salas de 2–3 (30 en la S1), drill oral, minuto libre, resumen de 3 alumnos, coro de 3 frases | Las salas siempre tienen tarea oral, no escrita |
| **Carga cognitiva** | ≤ 3 estructuras nuevas por clase (B.10); la S3 y la S7 resueltas sin tocar lo publicado; tareas núcleo de 25–30 minutos con extras separados | En semanas de 3, una sola producción larga en la tarea |
| **Continuidad** | Tabla de B.10: todo lo que se adelanta está marcado (쯤, 천/만, -고, -지만, 제, 어렵다/쉽다); B0 fija lo que cada perfil ya trae | Usar C hasta tu semana + la C de Básico 1 |
| **Autenticidad** | Frases que se dicen: 주말 잘 보냈어요?, 몰라요, 일이 있어서 못 가요, 이거 한국어로 뭐예요?, 사람마다 달라요 | Preferir la forma natural del mismo nivel a la "de libro" |

---

## I. Anexo "Enero 2027": cambios recomendados que NO se aplican en octubre

Todo esto cambiaría lo publicado (syllabus, PDFs, fichas, términos o herramientas). Queda para la cohorte de enero y requiere aprobación de Jay.

| # | Cambio | Fuente | Por qué no en octubre |
|---|---|---|---|
| 1 | **Nuevo orden de Básico 2** (decisión 7 de la Fase 1): S1 sin estructuras nuevas + 저는 ___입니다 como fórmula · S2 fechas, edad y hora (sin teléfono ni precios) · S3 rutina con irregulares ㅂ/ㄷ/으, 부터~까지 y 마다 · **S4 "De compras y en el café"** (이거 얼마예요?, 백/천/만, contador + 주세요, -고 싶어요, -(으)세요 para reconocer) · S5 pasado con 에서 vs 에 y -고 · S6 futuro con (으)로 y -(으)ㄹ까요? · S7 안/못, -(으)ㄹ 수 있다 y 보다/더/제일 (+ -지만) · S8 sin gramática nueva | Fase 1 §4.5 | Cambia temas y gramática publicados |
| 2 | 처럼 y 밖에 pasan a A2.2; -거나 a A2.1 como vocabulario; -지 못해요 solo para reconocer; 의 dentro de 제/내; 쯤 como palabra | Fase 1 §4.5 | Cambia la S7 y la S5 publicadas |
| 3 | Examen final renombrado ("Examen final de Básico 2", no "A2") y rehecho según el orden nuevo | Fase 1 §3.4, §15 #3 | Texto y examen publicados |
| 4 | Línea del certificado "contenidos del nivel A1 (MCER)"; regla única de certificado y marco Pasaporte Chingu 40/25/35 con misión de recuperación | Fase 1 §3.5, §11.2–11.3 | Política pública (términos §6, fichas, PDFs) |
| 5 | Proyecto final **"Mi semana y mi plan · 지난주와 다음 주"**: semana pasada + plan + invitación aceptada o rechazada, con agenda escrita en 한글 | Fase 1 §11.5 | Cambia el formato publicado del final |
| 6 | Rúbrica oral con interacción y cultura ("Comprensión e interacción" · "Vocabulario y uso cultural") | Fase 1 §11.2, decisión 12 | Cambia la rúbrica publicada |
| 7 | Misión semanal de 25 minutos (drill corto + mini-diario escrito y en audio + una pregunta para la clase siguiente) en lugar de 3 entregas y "2 horas" | Fase 1 §11.6 | Cambia las tareas y la carga publicadas |
| 8 | Micro-diagnóstico de 12 ítems (4 lectura, 4 partículas, 4 conjugación) + audio de 30 s para entrar; test web corregido (pregunta 4, y que no recomiende TOPIK II) | Fase 1 §12 | Cambia el ingreso y el sitio |
| 9 | Audioteca A3 (mini-diálogos de 2 voces: Jay + Kiran o Abby) y A4 (monólogos de 45–90 s) para Básico 2 | Fase 1 §9.3 | Producción larga |
| 10 | Lectura: mensajes de KakaoTalk, avisos y agendas de 60–120 sílabas; 1 ítem TOPIK I por quiz, oficial en la ficha | Fase 1 §7.3 | Contenido y ficha nuevos |
| 11 | Escritura: párrafo de 8–10 frases en tres tiempos con 3 conectores + mensaje de invitación y de rechazo | Fase 1 §8.3 | Contenido nuevo |
| 12 | Fichas corregidas: "Contrarreloj en modo Escucha" (S3), "casi no se da la mano" (S1), 먼저 가겠습니다 (S3), "densidad de cafeterías" (S4), invitaciones de la S5 y la S6 (→ 볼까요? / 볼래요?), estructura de clase (25' en la ficha, 30' en el PDF) | Fase 1 §10.5, §15.1 | Textos publicados |
| 13 | Vocabulario con columnas núcleo/tema en la ficha, contraste con la lista del 국립국어원 y reciclaje de 50 palabras de Básico 1 en el diagnóstico | Fase 1 §5.4 | Cambia la ficha |
| 14 | Lector: elegir modo y grupo, modo sin romanización, "Mis palabras de la semana"; el Contrarreloj sale de las fichas de Básico 2 | Fase 1 §7.4 [2027] | Cambia código y fichas |
| 15 | Audio para todo el vocabulario del curso con el pipeline de SunHi: **hecho el 26 sept 2026** (filas de C sin clip: 0; ver `../audio/Clips_Octubre_2026.md`). Para enero queda la versión con la voz de Jay | Fase 1 §5.4 V5 [2027] | Producción larga (voz de Jay) |
| 16 | Paquete de salida de Básico 2 (gramática núcleo, 50 palabras, 3 "puede hacer", informe) como entrada de Conversacional 1 | Fase 1 §2.3 | Contrato entre cursos, nuevo |

---

## Decisiones que este diseño necesita de Jay

| # | Decisión | Recomendación | Plazo |
|---|---|---|---|
| 0 | El "examen A2 de la casa" está en tu PC (`D:\…\한국어 수업 A2\한국어 시험(A2) (1).pdf`, 2020–21), no en el repo. ¿Hay una versión más nueva? | Adaptarlo al formato publicado de 4 secciones y 40 pts (E.5) | Confirmar antes del jue 1 oct · examen listo vie 20 nov |
| 1 | Regla de certificado y pesos de octubre (ficha `a12` vs Guía del Alumno) y reparto del final | La de la Guía del Alumno; final 17,5 % escrito + 17,5 % oral | Antes del 14 oct |
| 2 | Línea de nivel del certificado ("CEFR A1 completo (A2 parcial) · preparación TOPIK I niveles 1–2") | "Básico 2 (A1.2) · contenidos del nivel A1 (MCER)", con aviso en la S7 | Antes del 25 nov |
| 3 | Fecha del certificado (lun 7 dic en la Guía; "semana del 7" en la ficha; "en la última clase" en el PDF) | Lunes 7 de diciembre | Antes del 14 oct |
| 4 | Grabación con el celular de la conversación evaluada | Sí, con consentimiento en la S7 y borrado tras el informe | Antes del 25 nov |
| 5 | Plataforma del examen cronometrado (dentro de la clase), de los quizzes en línea y del simulacro | Formulario con autocorrección y ventana de 30 minutos | vie 16 oct |
| 6 | Dónde sigue Básico 2 en enero (textos_generales no lista Conversacional 1 en enero; `Horarios_Equipo` sí) | Definirlo antes de la clase 8, para el cierre y la preventa | Antes del 25 nov |
| 7 | Decks trilingües: quién los produce y cuánto inglés llevan | Producción; inglés = título + una glosa por lámina | Antes del jue 1 oct |
| 8 | Plazo del comentario de mitad de curso + guía de estudio | Domingo 8 de noviembre | Antes del 4 nov |
| 9 | Alumno que en la S1 no lee 받침: ¿se le ofrece pasar a Básico 1 (misma semana de inicio)? La norma solo cubre cambios de sección | Ofrecerlo por WhatsApp, no imponerlo | jue 15 oct |
| 10 | Clínica de lectura de 12 min antes de las clases 2 y 3 (mié 20:45) | Sí, opcional, solo perfil C | Antes del 21 oct |
| 11 | Comunicación del pase a Conversacional 1: la nota publicada dice "ese mismo día" | Mensaje general el día 2; recomendación individual el vie 4 dic | Antes del 2 dic |
| 12 | ¿El alumno debe comprar el libro? (pendiente en el programa público) | No obligatorio: hojas y decks originales | Antes del 12 oct |
| 13 | Cómo se repone una clase si se corta la conexión de Jay (C.13 de las 8 guías) | Grabación de la parte perdida + tarea; si se perdió la clase entera, 30 minutos esa misma semana (en la S7, antes del examen) | Antes del 14 oct |
| 14 | Cómo recupera un quiz quien falta (guía de la S2, ⚑ 12) | Los 5 ítems por escrito en el grupo antes del domingo, con la lámina de la grabación; registro aparte | Antes del 21 oct |

---

## J. Control final de continuidad (Dirección Académica · 26 sept 2026)

Se leyeron completos los 17 archivos (este diseño, las 8 guías y los 8 materiales) contra lo publicado de `a12`, la salida de Básico 1 (`../Fase2_Basico1/`) y lo que se dio en el Nivel 1 de julio (B0.1), y se corrigió directamente lo siguiente.

| Qué se revisó | Resultado | Qué se cambió |
|---|---|---|
| **Nada antes de enseñarse** | En los materiales del alumno ninguna estructura aparece antes de su semana. Lo que se adelanta está marcado y se usa como fórmula o para reconocer: -고 (desde la S3), -지만 (desde la S6), 어렵다 y 쉽다 (S3, núcleo de la S8), 쯤 (palabra desde la S3), 천/만 (tarjeta de la S2), 생일 축하해요 (S2, anticipa 축하해요 de la S8), -(으)ㄹ까요? y -(으)세요 (solo en voz de Jay o como consignas con glosa). En las guías, lo que no es del nivel va como "lo dice Jay", "a pedido" o reto | **Complemento de C** con las 25 fórmulas y frases de reconocimiento que las guías y los materiales ya usaban sin estar en la lista (제가요!, 시간이 있어요, 카공, 노래방, 수고하셨습니다, consignas…). No se agregó ninguna estructura |
| **La lista maestra coincide con las semanas** | Las 172 filas de C coinciden con B.2–B.9 y con la sección 2 de cada material (núcleo, tema, reconocimiento y cultura, semana por semana); las 15 N↺ se verificaron contra la lista C de Básico 1 (semana y tipo correctos) | Columna "Audio" y resumen de C actualizados (17 → 172 filas con clip); 여름휴가 escrito junto en B.6 y en C, como en la guía y el material de la S5 |
| **La tarea prepara la clase siguiente** | Cadena completa: datos personales (S1) → S2 · 8 cosas de tu día (S2) → S3 · 5 cosas del fin de semana (S3) → S4 · foto de un viaje (S4) → S5 · 3 cosas que sabes hacer, 3 que no y una invitación que rechazarías (S5) → S6 · fotos para comparar y el escritorio (S6) → S7 · Hoja 7, pareja y tarjeta (S7) → S8 · audio final (S8) → Conversacional 1. Cada quiz (1–6) evalúa exactamente la semana anterior (E.3) y está anunciado en el material | B.3 alineado con la guía y el material (Lector ≈ 12 min, total ≈ 30 min) · B.7: la Hoja 6 pide a todos 2 frases con -지 않아요, porque el quiz 6 las pregunta · E.3: el ítem de edad del quiz 2 es 20 → 스무 살 (el que B.3 anticipa como más fallado), como en la guía de la S3 |
| **S4, examen, conversación y proyecto** | La mitad del curso (S4) solo usa evidencia de S1–S4, sin examen extra · el examen v1 (guía de la S8, C.16) solo pide núcleo de S1–S7 + 어렵다/쉽다, las 11 partículas de la Hoja 7 y datos de la S2, sin ítems obligatorios de -고/-지만 (E.6) · la tarjeta de 6 temas, el modelo F.4 y el audio final solo usan la lista C y la de Básico 1 | E.5 alineado con el examen v1 (un ítem por semana **y dirección**; ejemplos de fechas y horas) · B.1 y F.5 alineados con la hora de la guía de la S8 (salas armadas durante el examen, conversación 21:41–21:56, vuelta a la sala principal a las 21:57 para la frase ancla y el coro) |
| **Formato y voz de la Fase 2** | Las 8 guías tienen 0 · A (17 campos) · B · C (C.1–C.17) · D · E, y los 8 materiales, las secciones 1–10, en el mismo orden (G.3) | Título de la sección D unificado en las 8 guías, el README y G.3: **"⚑ Para revisar con nativo y pendientes"** (siete decían "Para revisar y pendientes") · **mecánica del quiz única** (chat en "solo anfitrión"; las guías de la S3 a la S6 usaban "a todos + 하나, 둘, 셋" o mensaje privado; el ⚑ 20 de la S2 queda resuelto) · C.13 de la S2, la S5 y la S7 ya no prometen reponer la clase perdida: es DECISIÓN DE JAY (13, abajo), como en las demás · referencia cruzada corregida en la guía de la S5 (파트너 = ⚑ 7) |
| **Fechas** | 381 combinaciones día-fecha comprobadas por script en los 17 archivos: 0 errores (S1 mié 14 oct · S2 21 oct · S3 28 oct · S4 4 nov · S5 11 nov · S6 18 nov · S7 25 nov · S8 mié 2 dic; hitos del vie 9 oct al lun 7 dic). Horas por país correctas con los cambios de hora (España, dom 25 oct; EE. UU., dom 1 nov) | — |
| **Continuidad con Básico 1 y con julio** | B0.1 coincide con el mapa y la lista C de la Fase 2 (을/를 en la S7, 좋아해요 en la S8, nativos 1–5 solo con 명, hora prohibida, 안 solo en 안 좋아해요, 에서 solo en 3번 출구에서 만나요, sin romanización desde la S5) y con lo que se dio en julio (lecciones 1–9 del libro; pasado y futuro solo como bonus: ⚑ D-16) | — |
| **Romanización (D)** | Quedaban tres restos en los materiales: el "go" de la sección 2 y el *[gal go-e-io]* de la sección 4 de la S5, y el *mot haeyo* de la sección 4 de la S6 | Reescritos sin letras latinas · el texto para el alumno de D, alineado palabra por palabra con el material de la S1 (sin *[cho-nun]*, *Jeo* ni *meogeoyo*); la S1 conserva solo letras sueltas (*j*, *eo*, *g, k, kk*) para explicar el porqué |
| **Audio** | Desde el 26 sept existen clips SunHi de las 172 filas de C y de las 24 frases clave, pero los materiales de las S3–S6 y la S8 decían "no hay audio" o "llega en el mensaje del grupo", y las guías de la S3, la S5 y la S6 hablaban de "0 clips" | 🔊 en los 5 materiales que no lo tenían (línea "Escucha las palabras de la semana" al final de la sección 2 y las 3 frases de la sección 10) · guías S3, S4, S5 y S6, y este diseño (hechos fijos: 918 clips · A.16 · C · G.1 · G.2 · I #15) actualizados. **Falta publicarlos** (⚑ N-1) |
| **Coreano unificado** | La S8 escribía 잘 못해요 junto y explicaba que 못 해요 separado es "no puedo" (수영 못 해요), en contradicción con la S6, que enseña 수영 못 해요 como "no sé nadar" y recomienda escribir separado en todo octubre | Material y guía de la S8 alineados con la S6: en el curso, **못 해요 separado**; en hojas y examen valen las dos grafías. Queda un solo ⚑ para todo el curso (S6-1) |
| **Biblioteca (G)** | G.2 no listaba todo lo que las guías piden producir | G.2 completada: publicar los clips (P0), link o PDF de la tarjeta de sala de cada semana, hoja "Calendario del curso", láminas del quiz y piezas dibujadas, fotos de cada semana, clave de la Hoja 3 en PDF, PDF del plan B del examen y planilla del oral; fila "Hecho" para el audio · G.3 con la regla del 🔊 en los materiales |

Lo que no se cambió porque cambiaría lo publicado sigue en el anexo I y en la sección E de cada guía. La regla del certificado sigue igual: **[regla del certificado: pendiente de decisión de Jay]** (E.2, E.7).

**Dos decisiones nuevas** quedaron en la tabla "Decisiones que este diseño necesita de Jay": la **13** (cómo se repone una clase si se corta la conexión de Jay, que las guías de la S2, la S5 y la S7 prometían reponer y ahora dejan en tus manos, como las demás) y la **14** (cómo recupera un quiz quien falta).

화이팅, chingu.

---

## ⚑ Para revisión nativa (Jay; segunda opinión de Abby para usos muy actuales)

**Todos los ⚑ que quedan abiertos en los 17 archivos** (los 8 materiales del alumno no llevan ⚑: sus dudas están en la guía de la misma semana). Códigos: **D-n** = este diseño (las guías los citan como "D-n del diseño") · **Sn-x** = sección D de la guía de la semana n (x = el número o código que tiene allí) · **N-n** = nuevos del control final. Plazo general: resolver cada ⚑ antes del plazo N−2 de su semana (S1–S2: vie 9 oct · S3: vie 16 oct · S4: vie 23 oct · S5: vie 30 oct · S6: vie 6 nov · S7: vie 13 nov · S8: vie 20 nov). **Si Jay cambia una frase, se cambia en la guía y en el material del alumno de esa semana** (y en la lista C si es una fila, con su clip nuevo).

### 1 · Transversales (tocan varias semanas o todo el curso)

| # | ⚑ | Qué hay que decidir | Dónde |
|---|---|---|---|
| D-2 | **제 como palabra desde la S1** | Se usa en 제 이름은 / 제 고향은 / 제 취미는 y se explica como 저 + 의 en la S7. ¿OK adelantarlo? | B.2, C · S1-2 |
| D-3 | **___ 씨 entre compañeros y 선생님 para Jay** | Nombre + 씨 entre adultos de distintas edades, y 선생님 para ti: ¿es lo que quieres enseñar? | B.2, C · S1-3 · material S1 3.6 y 8 |
| D-7 | **먼저 들어가 보겠습니다 / 먼저 가겠습니다** y la respuesta de los colegas | El publicado dice 먼저 가겠습니다; la Fase 1 propone 먼저 들어가 보겠습니다. ¿Cuál dices en voz? ¿Sumas 먼저 퇴근하겠습니다? ¿Y la respuesta: 안녕히 가세요, 들어가세요 o 수고하셨습니다? | B.4 · S3-2 · S3-a · material S3 2, 5 y 8 |
| S8-2 | **수고했어요 / 수고하셨습니다** | Propuesta: "a mí, 감사합니다; entre ustedes, 수고했어요", y 수고하셨습니다 (oficina, también hacia arriba) solo para reconocer. ¿Así lo dices en el cierre? | B.9 · F.6 · guía S8 C.5 #10 · material S8 8 |
| D-9 | **같이 ___요! para invitar** | 다음 주에 같이 영화 봐요! · 내일 같이 영화 봐요! · 토요일 오후에 같이 산에 가요! en lugar de …볼 거예요?: ¿natural para invitar sin -(으)ㄹ까요? | B.6, B.7 · S5-1 · S6-4 |
| D-10 | **일이 있어서 못 가요** | Fórmula con -아서 (se enseña en Conversacional 1): ¿cómodo usándola sin explicar? | B.7 · S6-5 |
| D-14 | **미역국** | "En muchas familias el cumpleaños empieza con 미역국" (y la explicación del posparto) y "muchos lo evitan antes de un examen" (el blog del sitio dice "nadie"): ¿tono justo? | B.3, B.7 · S2-6 · S6-7 |
| D-12 | **Ítems estilo TOPIK I de los quizzes 1–6** | Todos son originales con formato de 읽기 (31–33 "¿de qué se habla?", 40–42 "elige la que no es correcta"). ¿Los reemplazas por ítems oficiales de topik.go.kr, citando edición y número? ¿Siguen vigentes esos formatos? | E.3 · S2-7 · S3-4 · S4-9 · S5-8 · S6-8 · S7-6 |
| D-17 | **Notación de pronunciación [ ]** | 여섯 시 [여섣씨] · 몇 월 [며둴] · 십육 일 [심뉴길] · 스물여섯 [스물려섣] · 먹습니다 [먹씀니다] · 씻고 [씯꼬] · 작년 [장년] · 갈 거예요 [갈꺼에요] · 할 수 있어요 [할쑤이써요] · 못 가요 [몯까요] · 못 봐요 [몯뽜요] · 밖에 [바께] · 잠깐만요 [잠깐만뇨] · 대답해요 [대다패요]: ¿las escribes así en el deck? ¿Se dice la ㄴ agregada de 스물여섯? | B.3–B.9 · S2-2 · S3-7 · S4-15 · S7-16 (1) |
| S6-1 | **띄어쓰기 de 못 해요 / 못해요** (una sola decisión para todo el curso) | El diccionario escribe 못하다 junto cuando es "no saber, hacerlo mal" (수영을 못해요, 노래를 잘 못해요) y 못 하다 separado cuando algo lo impide. Octubre, por ahora: **separado siempre** (regla "못 + verbo" de la S6) y las dos grafías valen en hojas y examen. ¿Lo dejas así o se aplica la del diccionario en deck, materiales, tarjetas y claves a la vez? | S6-1 · S7-16 (2) · S8-5 · material S6 3.3 y S8 5 |
| S2-3 | **띄어쓰기 de números y contadores** | El curso escribe separado (세 시, 삼십 분, 십오 일), como el Lector; la norma también admite 세시. Propuesta: en quizzes y examen valen las dos | S2-3 · guía S8 C.16 §3 |
| S5-7 | **파트너** en el cierre de la S5 y la S6 | Préstamo fuera de la lista, solo en tu voz. Alternativa: «[A] 씨, [B] 씨는 뭐 할 거예요?» | S5-7 · S6-12 |

### 2 · Semana por semana

| # | Sem. | ⚑ | Pregunta para Jay | Dónde |
|---|---|---|---|---|
| D-1 | S1 | 형제가 있어요? | ¿Natural entre adultos en la entrevista, o sumas 형제가 어떻게 돼요? para reconocer? | B.2, F.1 · S1-1 |
| D-4 | S1 | 외동이에요 | ¿Natural en A1, o mejor solo 형제가 없어요? (diálogo, Hoja 1, ejercicio 5, F.4) | C, F.4 · S1-4 |
| D-5 | S1 | 무슨 일 하세요? | ¿La mencionas como la forma cortés que se oye, junto a 직업이 뭐예요? | B.2 · S1-5 |
| S1-20 | S1 | 제가요! | Respuesta a 누가…? como fórmula: ¿OK? | Complemento de C · material S1 3.4 y 5 |
| S1-21 | S1 | Listas a pedido | Grafías de ciudades (메데인, 콘셉시온, 과달라하라, 몬테레이, 발파라이소…) y pasatiempos (음악 감상, 영화 감상, 그림 그리기, 사진 찍기 en bloque; 드라마 y 케이팝 con verbo) | S1-21 · material S1 2 y S3 2 (S3-c: las 14 ciudades) |
| S1-22 | S1 | 다니엘 씨는 취미가 요리예요 | Doble sujeto en tercera persona: ¿natural, o prefieres 다니엘 씨 취미는 요리예요? | S1 C.16 · material S1 7 |
| S2-1 | S2 | Diálogo | «와! 지금 한국은 시월 이십이 일이에요!» · «한국은 지금 목요일 아침 아홉 시 반이에요. 생일 축하해요!» · «하하, 지금이에요!» (alternativa nativa fuera de nivel: 어, 지금이네요!) | S2 C.8 · material S2 5 |
| S2-4 | S2 | 21:00 y la madrugada | 밤 아홉 시 (frase clave) o 저녁 아홉 시; de 1 a 5 a. m., 새벽 (reconocer) o 밤 한 시 | S2 C.5 · material S2 3.3 |
| S2-5 | S2 | 생일 축하해요 | Como reconocimiento en la S2 (adelanta 축하해요 de la S8): ¿cómodo? | Complemento de C · material S2 2 y 5 |
| S2-8 | S2 | Teléfono | ¿Mencionas el guion dicho [에] (공일공에…) o solo la pausa? | S2 C.5 #14 |
| D-6 | S3 | 서울은 추워요 | A fines de octubre, ¿추워요 o 쌀쌀해요 (fuera de nivel, como input)? | B.4 · S3-1 · material S3 1 |
| D-8 | S3 | -고 con la rutina | 씻고 아침을 먹어요 · 퇴근하고 운동해요 / 한국어를 공부해요 · 아침을 먹고 출근해요 · 음악을 듣고 자요 como fórmula; 일어나서 씻어요 solo como input: ¿de acuerdo con todas? | B.4, E.6 · S3-3 |
| S3-a | S3 | Diálogo | 퇴근하고 한국어를 공부해요 · 오늘 멕시코는 더워요? — 네, 조금 더워요. 산티아고는요? · 음… 몰라요! 지금 집에 있어요 · 아, 선생님이에요! | S3 C.8 · material S3 5 |
| S4-1 | S4 | Diálogo y mini-diario | 부산이요? 제 고향이에요! · 아, 아홉 시예요. 화이팅! · 동생이랑 요리했어요. 불고기를 먹었어요. · 바다에서 놀았어요 (adultos) · 친구 두 명하고 같이 갔어요 | S4 C.8 · material S4 5 |
| S4-3 | S4 | 여행하다 con lugar | Se enseña 혼자 여행했어요 · 한국을 여행했어요 y se corrige 한국에 여행했어요*. ¿O solo 한국에 갔어요? (diálogo: 서울에서 부산까지 여행했어요) | S4 A.1, C.5 #14 |
| S4-4 | S4 | Omisión oral de 에 | 주말 뭐 했어요?: "no se corrige en lo oral, sí en lo escrito". ¿De acuerdo? | S4 C.5 #8 |
| S4-5 | S4 | Regla de bolsillo del 에 | "Si en español dirías 'el ___', lleva 에": ¿algún caso del curso en que falle? | S4 C.3 · material S4 3.6 |
| S4-6 | S4 | 카공 · 주말 잘 보내세요! | Como reconocimiento | Complemento de C · material S4 8 |
| S4-16 | S4 | Dos ejemplos nuevos | 작년에 제 취미는 드라마였어요. 지금은 한국어예요! · 어제 점심은 빵하고 우유였어요. | material S4 3.4 y ejercicio 3 |
| S5-2 | S5 | Cierres de la cita | 몇 시에 만나요? · 어디에서 만나요? · 토요일에 봐요! · 다음 주에 봐요! | Complemento de C · S5 C.3 · material S5 3.5 y 7 |
| S5-3 | S5 | 부산을 구경할 거예요 | ¿O 부산 구경을 할 거예요? | material S5 5 y Hoja 5 |
| S5-6 | S5 | 여름휴가 junto | Aplicado en guía, material y diseño (B.6, C) según el 표준국어대사전: confirmar | B.6, C · S5-6 |
| S5-9 | S5 | 다음 주 토요일에 | Con 에 por coherencia con la regla del día; en el habla, también sin 에 | material S5 5 |
| S5-18 | S5 | 시간이 있어요 | Para las casillas libres de la agenda; ¿o 시간 있어요 al hablar? | Complemento de C · material S5 7 |
| S5-19 | S5 | 좋아요! como reacción al plan ajeno | Tras 한국 기차는 정말 빨라요: si suena raro (lo natural sería 좋겠어요! o 와, 좋네요!, fuera de nivel), cambiarlo por 와! en guía y material | material S5 5 |
| S6-3 | S6 | Diálogo | 금요일은 갈 수 있어요! (¿o 금요일은 괜찮아요?) · 네, 잘 먹어요! · 노래는 할 수 있어요 (¿o 노래는 잘해요?) · 다음에 같이 노래방에 가요! | S6 C.8 · material S6 5 |
| S6-C3 | S6 | Despedida del día del 수능 | «오늘 수능 보는 학생들, 화이팅!» (보는 = modificador fuera de nivel, solo en tu voz). ¿La dices o solo «여러분, 화이팅!»? | S6 C.3, bloque 12 |
| D-11 | S7 | 저는 아니에요 (publicado) | Como reacción a un gusto: ¿lo dejas o, dentro del nivel, 저는 안 좋아해요 / 저는 잘 못 먹어요? | B.8 · S7 D-11 · material S7 2 y 7 |
| S7-1 | S7 | 저도요 = "yo tampoco" | Tras una frase negativa: ¿lo enseñas así? | material S7 3.1 |
| S7-2 | S7 | 한국 사람처럼 말해요! | Como cumplido para reconocer (quizá dirías 한국 사람 같아요!, fuera de nivel) | Complemento de C · material S7 2, 3.4 y 5 |
| S7-4 | S7 | 한테 + 주다 con mayores | Con abuelos o padres lo esperable es 께 드려요 (Conversacional 1): ¿OK 엄마한테 전화해요 como ejemplo central y 주다 solo con amigos y hermanos? | S7 C.3, bloque 7 |
| S7-7 | S7 | Diálogo | 감사합니다 entre amigas (고마워요 no está enseñado) · 칠레에서도 사람마다 달라요 · 빵이 하나밖에 안 남았어요 (el empleado) | S7 C.8 · material S7 5 |
| S7-17 | S7 | 이 음식은 김치처럼 매워요 | Modelo de 처럼 en la ronda 1: ¿natural o prefieres otro? | material S7 7 |
| D-13 | S8 | Modelo de conversación (F.4) | Naturalidad completa, en especial la broma del picante (línea 21) y 저도 춤은 못 춰요 (línea 16) | F.4 · guía S7 L-E2 |
| S8-1 | S8 | 친구를 만나고 영화를 봤어요 | Publicado en el "puede decir": si viste la película con ese amigo, lo natural es 만나서. ¿Lo dejas y das 만나서 como input si preguntan? | B.9 · S8 C.5 #7, C.16 |
| S8-3 | S8 | Consignas del examen en coreano | 바꾸세요 · 쓰세요 · 대답하세요 · 읽는 대로 쓰세요 · 과거로 / 미래로 (con glosa): ¿claras? | S8 C.16 §4 |
| S8-5 | S8 | 기타는 칠 수 있지만 노래는 잘 못 해요 · 요리는 잘 못 해요 | Tono de "no soy bueno para…" (la grafía va con S6-1) | S8 C.8 · material S8 5 |
| S8-6 | S8 | 부산에서 바다를 구경하고 쉴 거예요 | En enero no se nada en Busan: por eso 구경하다. ¿Natural? | material S8 5 |
| S8-7 | S8 | 15분 남았어요 · 시작! · 끝! | Tus consignas durante el examen | S8 C.3, bloque 6 |
| S8-8 | S8 | Examen v1 | Traducciones 4.1–4.6 y frases de partículas 2.1–2.10 (en especial 2.7 물만 y 2.10 아침마다: la glosa decide) | S8 C.16 §4 |
| S8-9 | S8 | 잘 지내요. 그렇지만 요즘 너무 바빠요. | En el habla real, 근데 / 그런데; se deja 그렇지만 porque es el conector de la semana. ¿O 그런데 con nota "se reconoce"? | material S8 5 |

### 3 · ⚑ que no son de coreano (probar, confirmar un dato o preparar)

| # | ⚑ | Qué hay que hacer | Quién · plazo | Dónde |
|---|---|---|---|---|
| N-1 | **Publicar los clips de audio** | 355 clips nuevos en `public/audio/kr` están fuera de git: sin el push a `main`, los 🔊 de los 8 materiales dan error | Jay (quien publica el sitio) · **lun 12 oct** | G.2 · S1-26 · S2-19 · S3-15 · S4-11 · S7-15 |
| D-15 | Unidades del libro | Confirmar con el ejemplar la numeración de la ficha (Fundamentos 01–05, Tiempos 01–04, Negación 01–03, Habilidad 01, Partículas 05…17, Enumeración y contraste 01–03) y buscar la unidad de 하고 / (이)랑 (ver S4-14), que la ficha no cita | Jay · antes del 14 oct | Encabezado · A.2 de cada guía |
| D-16 | Qué se vio en julio | Confirmar que las sesiones 05–11 del plan original no se dictaron y si hubo clases después del 12 de septiembre; si se vieron fechas, 에서, -ㅂ니다 o 저도, el rol de experto se amplía | Jay · antes del 14 oct | B0.1 · S1-16 · S2-11 · S3-6 · S7 D-16 |
| D-18 | Zoom con dos dispositivos | Salas con "volver a la sesión principal" y "elegir sala", "Transmitir mensaje", pausar y reanudar la grabación, y el chat en "solo anfitrión" (quizzes, dictado, adivinanza) | Jay · antes del vie 9 oct | B0.2 · S1-18 · S2-13 · S3-16 · S7-12 |
| S6-6 | Horario del 수능 2026 | Confirmar en kice.re.kr que a las 09:00 KST corre la 1.ª prueba (국어); los aviones y la entrada tardía de oficinas, solo si preguntan | Jay · lun 16 nov | B.7 · S6 C.2 y C.3 |
| S5-4 · S5-5 | Datos de la S5 | 빼빼로데이 "fecha comercial, popular desde los años 90" (y 가래떡 solo si preguntan) · vacaciones de 3–5 días a fines de julio o comienzos de agosto · Jeju sin tren · Seúl–Busan en tren rápido ≈ 2,5 h | Jay · vie 30 oct | B.6 · material S5 8 |
| S7-3 · S7-5 | Datos de la S7 | Seúl ≈ 9,4 millones frente a Gran Santiago (censo 2024) si lo dices en voz · el clima real del 25 nov para "오늘은 산티아고가 서울보다 더 더워요" | Jay · mar 24 nov | S7 C.3, bloque 4 · material S7 5 |
| S1-19 · S3-b · S4-2 · S6-2 | Tus datos en las R | Los guiones de L5 (S1), del día (S3), del fin de semana (S4) y de las tres fotos (S6) son ejemplos: cambia los datos, no la estructura | Jay · N−2 de cada semana | Guías, C.3 |
| S1-34 | El que espera oye el diagnóstico | Si lo notas en los primeros 2–3, llama al siguiente cuando el actual empiece la lectura | Jay · en vivo | S1 C.14 |
| S8-4 | Cierre de la S8 a las 21:57 | Ya aplicado en B.1 y F.5 de este diseño; confirmar que prefieres el coro grabado en la sala principal a 3 minutos más de sala | Jay · vie 20 nov | B.1, F.5 · S8 ajuste 2 |
| S2-15 | Blog del 미역국 | ¿Se enlaza en la S2 o se guarda para la S6? (propuesta: S6, como ya está en los materiales) | Jay | G.1 · S6 |

*Las DECISIONES DE JAY (0–14) no son ⚑: están en "Decisiones que este diseño necesita de Jay" y en la sección J (13 y 14). Las guías registran además decisiones operativas propias (grabación en pausa durante el diagnóstico, S1-23; audio de diagnóstico por privado, S1-24; bienvenida b3 con el teclado, S1-29; salas de 3 en la S2, S2-9; plazo de la Hoja 7, S7-8; plazos y plan B del examen, S8 D 1–11).*

화이팅, chingu.
