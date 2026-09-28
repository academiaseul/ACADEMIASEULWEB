# Fase 5 · Conversacional 2 (A2.2) · Diseño del curso
### Corea por dentro · 회화 A2.2 · cohorte enero 2027 · la columna vertebral para los 8 redactores

**Documento interno de Dirección Académica · versión 1.0 · lunes 28 de septiembre de 2026**
Para Jay y para el equipo que redactará las 8 guías del profesor y los 8 materiales de los alumnos. Va en **español**. Las guías también van en español, pero **todo lo que el profe dice en clase va escrito en coreano**, listo para que la guía se traduzca entera al coreano si el curso lo da Abby (sección 0, regla 3). Lo que reciben los alumnos va en español con el coreano en 한글 y **sin romanización**. Nada de este archivo se entrega tal cual: los recuadros **Texto para el alumno** están listos para copiarse en su material.

> **Cómo leer este documento**
> - **Este curso todavía no tiene syllabus publicado con gramática por semana.** Lo único público es la página "Próximamente · enero 2027" (`Curriculo/publico/Programa_Conversacional2_A2-2.md`), la ficha corta de `textos_generales.js` (`conv2`) y `CONVERSACIONAL_2` en `lib/nivel1.ts`. Este diseño propone el syllabus. Donde se aparta de lo anunciado, lo dice (sección I) y lo marca **DECISIÓN DE JAY**. No se cambia nada en silencio.
> - **[POR CONFIRMAR]** = fecha, día u hora que dependen de Jay (profe, día y hora del curso). Las semanas se escriben **S1…S8 (enero–marzo 2027)**, y el calendario tentativo está en la tabla de hechos fijos.
> - **⚑ revisar con nativo** = coreano o dato que se valida antes de usarlo (Jay, que es nativo; para usos muy actuales de Corea, segunda opinión de Abby). **DECISIÓN DE JAY** = nombres, políticas, plazos, precios o textos públicos.
> - **[regla del certificado: pendiente de decisión de Jay]** aparece en todo lo que depende de la regla de certificado (sección E). No se inventa ninguna política.
> - **PROFE** = material con respuestas, notas y tiempos (va a `profes/`). **ALUMNO** = material sin respuestas ni notas internas (va a `alumnos/`). Nunca se mezclan en un mismo archivo.
> - Fuentes: brief maestro (§5 y §8–25) · `Curriculo/Fase1_Arquitectura_Academica.md` (§4.2, §4.7, §5.3, §6.4, §7.3, §8.3, §9.3, §10.2–10.6, §11, §12, §13, §14, mapa maestro) · `Curriculo/Fase4_Conversacional1/00_Diseno_Conversacional1.md` (el curso que alimenta a este) · formato de `Curriculo/Fase3_Basico2/` y `Curriculo/Fase4_Conversacional1/` · decks de julio en `A2_Nivel_2/` · lo anunciado al público.
> - *Korean Grammar in Use · Beginning* se puede citar por unidad para el profe. **No se copian sus explicaciones, ejemplos ni ejercicios**, ni letras de canciones, guiones de dramas, artículos de prensa o cuentos editados. Todos los ejemplos de este documento son originales; los cuentos tradicionales se **vuelven a contar** con palabras propias.

**Hechos fijos**

| | |
|---|---|
| Curso | **Conversacional 2 (A2.2) · Corea por dentro · 회화 A2.2** (`lib/nivel1.ts`: `CONVERSACIONAL_2`, paso 4, requiere Conversacional 1 (A2.1), "enero 2027") |
| Formato | 8 semanas · **1 clase en vivo de 60 minutos por semana** · Zoom con salas de grupos · **máximo 15 alumnos** (el tope de las secciones de adultos de octubre; la página pública todavía dice "Confirmar": DECISIÓN DE JAY 5) |
| Precio | **"US$150 el curso completo · o 2 cuotas de US$75"** (precio único de la casa; no se cambia aquí) |
| Profe | **POR DEFINIR (DECISIÓN DE JAY 1).** `Horarios_Equipo_2026-2` y `Desarrollo_Clases_2026-2` §4.2 lo asignaban tentativamente a Abby (홍미영). Este diseño sirve para cualquiera de las dos opciones: guía en español con el coreano del profe escrito, traducible al coreano si enseña Abby |
| Día y hora | **POR DEFINIR (DECISIÓN DE JAY 2).** Tentativo en `Horarios_Equipo_2026-2` §5: **miércoles 21:00 (Chile) = jueves 09:00 (Corea)**. Chile sigue en UTC−3 hasta el cambio de hora de abril (⚑ confirmar la fecha de 2027), así que todo el curso queda a 12 h de Corea. Referencias con el tentativo: México (CDMX) 18:00 · Colombia y Perú 19:00 · Argentina 21:00 · Nueva York 19:00 · España 01:00 del jueves (no le sirve) |
| Fechas | **S1…S8 (enero–marzo 2027).** Calendario tentativo abajo, **[POR CONFIRMAR]** |
| 설날 2027 | **Domingo 7 de febrero de 2027.** Feriado en Corea: **sábado 6 al martes 9** (6, 7 y 8 de 설 연휴 + **martes 9, feriado sustituto** porque el 7 cae en domingo). Verificado en la Fase 1 §10.6 y de nuevo hoy en calendarios coreanos de 2027 (month2k, kholidayz, holiday.kimgoon) ⚑ confirmar con el calendario oficial (인사혁신처) cuando Jay publique fechas. 추석 2027: miércoles 15 de septiembre |
| Estructura de clase | Igual que Conversacional 1, para que el alumno no tenga que reaprender nada: **quiz oral 5' · 스몰토크 en pares 10' · tema con el deck 20' · salas de 2–3 20' · cierre 5'**. En los labs (S4 y S8), los bloques 3 y 4 se funden en 40' de práctica oral (B.1, B.10) |
| Garantía | **Al menos el 50 % de cada clase en conversación de los alumnos** (B.1) · **2 laboratorios** (S4 y S8) · **máximo 3 estructuras nuevas por clase** y ninguna en S4 ni en S8 (B.11) |
| Alumnos esperados | **Egresados de Conversacional 1 de octubre** (primera cohorte de Abby, máx. 15; en octubre entraron por test de nivel, no desde Básico 2: B0) + externos con nivel equivalente, si Jay lo abre (DECISIÓN DE JAY 6). Los egresados de Básico 2 de octubre van a Conversacional 1 en enero (`Horarios_Equipo_2026-2` §5), no a este curso |
| Ecosistema | Clips SunHi en `public/audio/kr` (voz del Lector): **generados el 28 sept para toda la lista C y las 24 frases clave** (C y B.14; falta el push a `main`: ⚑ N-1). El Lector y Dubu **no se asignan** en este curso (Fase 1 §14.2): su trabajo es de A1 |

**Calendario tentativo [POR CONFIRMAR]** (supone inicio la semana del 11 de enero y clase los miércoles 21:00 Chile = jueves 09:00 Corea, como en `Horarios_Equipo_2026-2`)

| S | Chile | Corea | Tema (propuesta de este diseño) | Qué pasa en Corea esa semana |
|---|---|---|---|---|
| — | lun 7 dic 2026 | — | Certificados de octubre + **preventa** (textos_generales, guía del alumno) | — |
| — | dom 10 ene 2027 ⚑ | — | Cierre de matrícula (propuesta; DECISIÓN DE JAY 2) | 겨울 방학 (vacaciones de invierno de los colegios) |
| S1 | mié 13 ene | jue 14 ene | La escuela en Corea + reencuentro y diagnóstico | Plena temporada de 겨울 방학 y de postulaciones universitarias |
| S2 | mié 20 ene | jue 21 ene | El día del 수능 | Los resultados del 수능 2026 ya salieron; se definen las admisiones (정시) ⚑ |
| S3 | mié 27 ene | jue 28 ene | La vida en la oficina | — |
| **S4** | **mié 3 feb** | **jue 4 feb** | **Lab 3 + "se viene el 설날"** (preparar la visita) | Faltan 3 días para el 설날: 귀성길, compras, sets de regalo |
| — | sáb 6 → mar 9 feb | sáb 6 → mar 9 feb | — | **설 연휴** (설날 = dom 7; mar 9 = feriado sustituto). En Latinoamérica, lun 8 y mar 9 son Carnaval en varios países ⚑ |
| **S5** | **mié 10 feb** | **jue 11 feb** | **설날, contado** (la semana del feriado) + 추석 como espejo | La gente vuelve al trabajo: "명절 잘 보내셨어요?" |
| S6 | mié 17 feb | jue 18 feb | Mitos y leyendas | El domingo 21 es **정월대보름**, la primera luna llena del año (calculado: 15 del 1.er mes lunar) ⚑ |
| S7 | mié 24 feb | jue 25 feb | K-drama y la Corea de hoy | Graduaciones de colegios y universidades (febrero) |
| S8 | mié 3 mar | jue 4 mar | Lab 4 + proyecto final | **개학**: el año escolar coreano empezó el martes 2; lun 1 = 삼일절 (feriado) |
| — | vie 5 mar | — | Reposiciones e informe del profe a Jay (propuesta) | — |
| — | lun 8 mar ⚑ | — | Certificados + preventa de la cohorte siguiente (propuesta, mismo patrón que octubre) | — |

**Por qué este calendario:** con inicio la semana del 11 de enero y clase a mitad de semana, **la S4 cae tres días antes del 설날** (se prepara la visita: saludos, 세배, qué decir a los mayores) y **la S5 cae en la misma semana del feriado, apenas termina** (se cuenta en pasado, como lo cuenta cualquier coreano el día que vuelve al trabajo). Es la alineación que propone la Fase 1 (§4.7 y §10.6, decisión 11).

**Si Jay elige otra semana u otro día** (las fiestas son cápsulas móviles: Fase 1 §10.6):

| Inicio / día | Clase justo antes del 설날 | Clase justo después | Qué cambia |
|---|---|---|---|
| **Semana del 11 ene · mié** (recomendado) | S4 (3 feb) | **S5 (10 feb)** | Nada: es este diseño |
| Semana del 11 ene · **mar 21:00** (= mié 09:00 KST, el horario de Conversacional 1) | S4 (mar 2 feb) | S5 (mar 9 feb = mié 10 KST) | Nada en Corea (el 10 ya es día hábil). ⚑ En Chile el mar 9 no es feriado, pero en Argentina, Brasil y otros países es Carnaval: avisar |
| Semana del 11 ene · **lun** | S4 (lun 1 feb) | S5 (lun 8 feb = mar 9 KST, **feriado en Corea**) | Si la profe vive en Corea, la S5 cae en su feriado: mover la S5 al jueves 11 o cambiar de día (ya advertido en la Fase 1 §4.9 para Niños 2) |
| Semana del **4 ene** | S5 (3 feb) | S6 (10 feb) | Intercambiar S4 ↔ S5 del mapa: el Lab 3 queda en S5 y el 설날 en S6; mitos pasa a S4 |
| Semana del **18 ene** | S3 (3 feb) | S4 (10 feb) | El 설날 queda en S4 y el Lab 3 en S5; la oficina pasa a S3 igual. Es la opción más incómoda (el 설날 llega antes de la mitad) |

**Qué hace este documento en una frase:** convierte la promesa pública de Conversacional 2 ("ahora vas a entender cómo se vive Corea por dentro") en un curso de 8 semanas que **empieza exactamente donde termina Conversacional 1**, trae los puentes que la Fase 1 dice que faltan antes del tramo B1 (honoríficos, -(으)니까, -는데, 반말, 한다체 de reconocimiento), **alinea el 설날 con la fecha real**, suma los dos laboratorios que el brief no tenía y resuelve el 추석 fuera de temporada como **DECISIÓN DE JAY**, no en silencio.

---

## 0. Para los 8 redactores: reglas de trabajo

1. **Una semana por redactor.** Tu fuente es tu bloque de la sección B, la lista maestra (C) **hasta tu semana** y, para lo que el alumno ya trae, la lista C de Conversacional 1 (`../Fase4_Conversacional1/00_Diseno_Conversacional1.md`, sección C) y la tabla B0.1. Si una palabra o estructura no está en ninguna antes de tu semana, no la pidas al alumno: úsala solo en voz del profe (R) o márcala como fórmula y avísalo en tu entrega.
2. **Dos archivos por semana, siempre separados** (G.3): `profes/S0N_Guia_Profesor.md` y `alumnos/S0N_Material_Alumno.md`. Las piezas que cruzan semanas se llaman `C2_<Pieza>.md`.
3. **Idiomas de la guía del profesor: español, con todo lo que el profe dice en coreano.** Cada consigna, explicación, pregunta, corrección modelo y broma que el profe dice en clase va **escrita en coreano natural**, en un recuadro:
   > **🗣️ El profe dice**
   > 여러분, 오늘은 한국의 학교에 대해 이야기해 볼 거예요. 먼저 두 명씩 방에 들어가서 5분 동안 이야기하세요.

   Lo que se proyecta o se pega en el chat en español va en otro recuadro:
   > **📋 Slide / chat (español)**
   > *-(으)니까 = "como…, entonces (propón, pide, aconseja)". 시간이 없으니까 빨리 가요.*

   Así la guía sirve a un profe bilingüe (Jay) y **se traduce al coreano sin reescribir la clase** si enseña Abby: se traducen las explicaciones para el profe y los recuadros 🗣️ quedan igual. Las fechas van en hora de Chile con Corea entre paréntesis, siempre como **[POR CONFIRMAR]** hasta que Jay fije el horario.
4. **Mismo formato que las Fases 2, 3 y 4.** Guía: *0. En una mirada · A. Ficha de la semana (17 campos) · B. Plan minuto a minuto (60') · C. Guía del profesor (C.1 Objetivo · C.2 Checklist · C.3 Secuencia exacta y lo que dice el profe · C.4 Las 4 etapas R→C→G→L por estructura · C.5 Explicación desde el español · C.6 Pronunciación · C.7 Errores previsibles y corrección · C.8 Diálogo modelo · C.9 Preguntas para los alumnos · C.10 Apoyo, reto y distintos niveles · C.11 Si sobra tiempo · C.12 Si falta tiempo · C.13 Plan técnico B · C.14 Evaluación y registro · C.15 Mensaje post-clase al grupo · C.16 Claves · C.17 Guion de slides) · D. ⚑ Revisar con nativo y pendientes · E. Anexo "Si enseña Abby" (qué cambia: regla de idioma, qué traducir, horas KST)*. Material: *1. Esta semana vas a poder decir… · 2. Vocabulario · 3. Gramática, explicada desde el español · 4. Cómo suena · 5. Diálogo o texto · 6. Ejercicios · 7. En clase (tarjeta de sala) · 8. Nota cultural · 9. Tarea de la semana (con apoyo y reto) · 10. Ya puedo decir…*
5. **Speaking-first:** abre tu guía con "Después de esta clase el alumno puede decir…" (tus frases de B) y marca el ciclo **R-C-G-L** de cada estructura: **R** reconocer (input real: foto, audio corto, texto) → **C** práctica controlada (la primera frase siempre es del alumno sobre sí mismo) → **G** producción guiada (tarjeta de sala con resultado) → **L** producción libre (sin tarjeta: 스몰토크 de la semana siguiente, debate, relato).
6. **Conversación ≥ 50 % de cada clase** (B.1): el 스몰토크 (10') y las salas (20') no se recortan; si vas atrasado, se recorta la explicación, nunca la práctica. Las salas siempre tienen una tarea **oral con resultado** (una decisión, un plan, una lista acordada, un cuento terminado), nunca una hoja escrita.
7. **Tope de 3 estructuras nuevas por clase** (B.11); en los labs, ninguna. Lo demás es reactivación, fórmula, ampliación o reconocimiento, y se marca.
8. **Sin romanización** en ningún material (Fase 1 §7.4: "Conversacional 1–2: romanización nunca"). La pronunciación va en 한글 entre corchetes: 맞죠 [맏쬬].
9. **Coreano:** natural, **해요체 para hablar**; -ㅂ니다 solo donde se enseña (S3) y en fórmulas; 반말 solo para reconocer hasta la S7 y, desde ahí, solo en el role play pactado. Con 띄어쓰기 (가고 싶어 해요, 할 수도 있죠, 좋아하게 됐어요) y partículas según el 받침. **Honoríficos coherentes:** nunca -(으)시- sobre uno mismo. Si dudas: **⚑ revisar con nativo**. No inventes expresiones.
10. **Cultura conectada a una frase** que el alumno dice (frase ancla), con **capa** (tradicional, contemporánea, generacional, regional, diáspora), **puente** a Latinoamérica y **matiz**. Regla editorial de la Fase 1 §10.4: nada de "los coreanos + verbo en presente general" sin cuantificador (muchos, en Seúl, los jóvenes, en mi familia); nunca "siempre" ni "nunca" en costumbres. La frase anti-estereotipo del curso es **옛날에는… 요즘은… · 사람마다 / 집집마다 / 회사마다 / 지역마다 달라요.**
11. **No repitas lo que la casa ya publicó: profundiza.** El blog ya contó el mito de Dangún y el 개천절 (`app/blog/dangun-por-que-corea-nacio-de-una-osa`), la sopa de algas, el 엿 y los aviones del 수능 (`app/blog/sopa-de-algas-antes-de-un-examen-supersticion-coreana`), el 눈치 y el piso 4; el carrusel de 추석 (`Campana_Assets/instagram/octubre/chuseok/`, 8 láminas) ya explicó qué es, cuándo cae, 한복 y 강강술래. Aquí se enlazan como lectura previa y la clase va **al paso siguiente**: qué cambia hoy, por qué, y cómo se dice.
12. **El profe no produce material** (Fase 1 §14.4): producción redacta; el profe revisa la naturalidad del coreano (≈ 20 min por semana); Jay aprueba. Todo lo visual con la plantilla de la casa. **Nunca texto rojo** (acento azul `#4236F6`, cabeceras navy `#003478`), tampoco en íconos ni en los niveles del diagnóstico (**A · B · C**).
13. **Temas sensibles** (DECISIÓN DE JAY 11): en el 수능 se habla de presión y de salud mental **sin cifras ni casos**; en la oficina, de jerarquía y cambios **sin burla**; en las fiestas, de estrés familiar **con humor, sin juicio**; natalidad, Corea del Norte, religión y política quedan fuera salvo pregunta de un alumno (respuesta breve, neutra, y se vuelve al tema).

---

## A. Diseño del curso (los 16 campos del brief §8)

**1 · Nombre del curso.** Conversacional 2 (A2.2) · Corea por dentro.

**2 · Nombre coreano.** 회화 A2.2 ("conversación A2.2"). En mensajes internos y con Abby: 회화 2.

**3 · Nivel CEFR (con la regla honesta de la Fase 1).** *El código del nombre describe el tramo del temario, no el nivel logrado* (Fase 1 §3.5). Fórmula interna: **"Conversacional 2 (A2.2): trabajas los contenidos de la segunda etapa del nivel A2 del Marco Común Europeo (MCER)".**
**Qué significa "A2.2" con 8 horas en vivo, dicho sin adornos:** son 8 h de clase + la misión semanal (25–30 min × 7 ≈ 3–3,5 h) + el proyecto (≈ 1,5 h) ≈ **12–14 h guiadas**. Desde cero, un alumno que hiciera toda la escalera (Básico 1 → Conversacional 2) sumaría 32 h en vivo, ≈ 45 h con misiones y ≈ 67–77 h con la carga de tarea de octubre (Fase 1 §3.1). Con eso no se "completa" un A2: en los institutos coreanos un 급 ronda las 200 h (Fase 1 §3.2, cifra orientativa ⚑). Lo que el curso **sí** da es el **temario de la segunda mitad de A2** (las funciones y estructuras que un 2급 trabaja: razones y propósitos, cortesía formal, narrar con fondo y hecho, registro) **practicado en conversación** y aplicado a temas de sociedad. Lo esperable al terminar: **un A2 más completo en los temas ensayados, con apoyo del interlocutor, y en el umbral de B1 solo en la narración breve** (Fase 1 §13), con unas **500–650 palabras activas acumuladas** si viene de la escalera (Fase 1 §5.3). **No se sostienen** con estas horas: "A2 completo" ni "preparación TOPIK I-2" (lo dice `Desarrollo_Clases_2026-2` §4.2, documento interno), ni la fila "TOPIK I nivel 2 alto" de `textos_generales.js` como promesa (sirve como orientación de la industria, con "orientativo"). Recomendación para el certificado (DECISIÓN DE JAY 8): **"Conversacional 2 (A2.2) · contenidos de la segunda etapa del nivel A2 (MCER) · no es una certificación oficial"**. Argumento honesto que sí se puede decir: *el TOPIK I mide lectura y escucha; nuestra evaluación mide lo que el examen no mide: hablar y explicar.*

**4 · Alumno objetivo.** Adulto hispanohablante que terminó Conversacional 1 (A2.1) o tiene un nivel equivalente: conversa unos 5 minutos sobre sus gustos, cuenta experiencias (가 봤어요), propone planes (갈까요?), pide en un restaurante y opina con 것 같아요, **pero todavía no explica por qué funciona algo, no cuenta una historia larga ni sabe cambiar de registro con intención**. Le interesa Corea más allá del fandom (escuela, trabajo, fiestas, historias). **En enero, en concreto** (B0.1): los egresados de la primera cohorte de Conversacional 1, que **en octubre entraron por test** (autodidactas, fans, algún ex-alumno de julio, quizás alguien con raíces coreanas): buen oído y mucho 반말 de canciones y dramas, huecos de partículas, y tres meses seguidos de clase con Abby al 90 % en coreano. Enero y febrero son vacaciones de verano en el cono sur: habrá alumnos que viajan (la grabación + misión importa más que nunca) y otros con más tiempo que en octubre.

**5 · Prerrequisitos.** Publicados: "requiere Conversacional 1 (A2.1)" (`lib/nivel1.ts`) y, en la página, una lista de "puedes hacer…" para quien llega con nivel equivalente. Reales (B0.1): las estructuras de salida de Conversacional 1 (-아/어 봤어요, N 중에서 제일, -아서, -(으)ㄹ까요?, -(으)러, -(으)세요 → -아/어 주세요 → -지 마세요, -아/어 보여요, -(으)ㄴ/는 것 같아요, modificadores con el mapa, -(으)ㄹ 때, -기 전에/-(으)ㄴ 후에, -(으)면) y las frases de reparación. Técnicos: Zoom con cámara, audífonos con micrófono, **teclado coreano** (guía de la Fase 2, `../Fase2_Basico1/alumnos/S01_Material_Alumno.md`). Edad: la regla de adultos que Jay fije (Fase 1, decisión 10).

**6 · Promesa del curso.** La pública: *"Ya hablas de la Corea que amas: ahora vas a entender cómo se vive por dentro."* En una línea para la marca: **de "puedo usar el coreano" a "puedo explicar Corea en coreano".**

**7 · Objetivos de aprendizaje** (los 7 de la página pública, precisados con la lengua que los hace posibles):
1. **Comparar tu vida con la vida en Corea** (escuela, trabajo, fiestas) con frases conectadas: -(으)니까, -기 때문에, -(으)려고, -죠, **옛날에는… 요즘은…**
2. **Dar tu opinión y defenderla con razones**, estar de acuerdo, no estarlo o matizar: 제 생각에는 · 저도 그렇게 생각해요 · 저는 좀 다르게 생각해요 · 그럴 수도 있죠 · -다고 생각해요 (fórmula).
3. **Narrar una historia en pasado** con principio, problema y final: -는데 (fondo + hecho), -았/었을 때, 밖에, conectores (어느 날, 그런데, 그래서, 결국); reconocer el 한다체 de un cuento escrito.
4. **Hablar con el respeto que corresponde** a un jefe, a una persona mayor o a alguien que acabas de conocer: -(으)시-, -ㅂ니다, -아/어도 될까요?, 께서 (reconocer); **darte cuenta cuando alguien pasa al 반말** y usarlo con quien lo pactó (말 놓을까요?).
5. **Saludar y participar en las fiestas coreanas** con las expresiones que se usan de verdad: 새해 복 많이 받으세요, 명절 잘 보내셨어요?, -(으)ㄹ게요 para ofrecer ayuda, -네요 para reaccionar.
6. **Explicar costumbres coreanas** (수능, 회식, 세배, 송편) a alguien que no las conoce, y compararlas con las de tu país sin estereotipos (사람마다 달라요).
7. **Preparar y presentar un tema en coreano** (mini-pódcast de 3 minutos) y sostener la conversación de preguntas que viene después.

**8 · Resultados esperados ("puede hacer").** *En los temas que practicó, con un interlocutor paciente y, cuando se indica, con preparación.* Explica en 3 minutos un aspecto de la sociedad coreana con una estructura clara (qué es · antes y ahora · un ejemplo · comparación · opinión) · da razones y propósitos con tres herramientas distintas (-아서, -(으)니까, -기 때문에; -(으)려고) y elige bien cuál · se presenta en una situación formal con -ㅂ니다 y habla **de** superiores y mayores con -(으)시- (부장님은 회의실에 계세요) · pide permiso con cortesía (먼저 퇴근해도 될까요?) · cuenta una fiesta y un cuento en pasado con fondo y hecho (-는데) · reacciona como un nativo (-네요, -죠) y se ofrece (-(으)ㄹ게요) · habla del deseo de otro (-고 싶어 해요) · reconoce el 반말 y el 한다체 de un cuento o una reseña, y **usa un 반말 básico** en un role play pactado · escribe un 일기 corto en 한다체 con la tabla de conversión.
**Todavía no:** discurso indirecto (-다고 했어요, -(으)라고 했어요: B1.1), -더라고요 / -거든요, argumentar por escrito, 한다체 productivo más allá del 일기 guiado, entender un drama sin subtítulos, honoríficos avanzados (여쭙다, 모시다, 뵙다 fuera de la fórmula).

**9 · Vocabulario requerido.** **181 filas** en la lista maestra (C): **86 de núcleo** (72 N nuevas + 14 N↺ que vienen de Básico 1–2 o de Conversacional 1 y se reactivan) + 8 paradigmas, 33 del tema, 30 fórmulas y 24 de reconocimiento. Carga semanal: 16–25 filas (S1 24 · S2 24 · S3 24 · S4 20 · S5 24 · S6 25 · S7 24 · S8 16). Reglas (las de Conversacional 1): **núcleo** = se produce y entra en el quiz y en el proyecto; **tema** = se usa en clase y se reconoce; **paradigma** = serie que se aprende junta; **fórmula** = se imita sin explicar la regla; **reconocimiento** = lo dice el profe o es cultura; no se pide ni se evalúa. Meta: **500–650 activas acumuladas** (Fase 1 §5.3). Siguiendo la Fase 1 §5.2 y el anexo I.10 de la Fase 4, el núcleo prioriza **verbos y sustantivos de alta frecuencia que sirven fuera del tema** (다니다, 모이다, 남다, 나타나다, 설명하다, 비교하다, 경험, 변화, 결과, 의견) y deja lo muy temático (구미호, 재벌, 치맥, 야간 자율 학습) como tema o reconocimiento. **Reciclaje explícito (V4 de la Fase 1):** el diagnóstico de la S1 y los dos labs obligan a usar palabras de Conversacional 1 (B.12).

**10 · Gramática** (tope: 3 estructuras nuevas por clase; conteo en B.11):
S1 **-(으)니까** (frente a -아서) · **-죠** (+ 반말 para reconocer en boca de un 선배; N 때 como fórmula) → S2 **-아/어야 해요** (en octubre solo se reconoció: es nueva para producir) · **-기 때문에 / N 때문에** · **-(으)려고** (frente a -(으)러) (+ 한 번밖에 없어요 como fórmula) → S3 **-(으)시-** (presente, pasado, pregunta y los verbos especiales) · **-ㅂ니다/습니다 en producción** · **-아/어도 돼요? / -(으)면 안 돼요** (+ 께서/께 para reconocer; N(이)라서 como fórmula) → S4 **Lab 3: 0 nuevas** → S5 **-(으)ㄹ게요** · **-네요** · **-고 싶어 해요** (+ 드리다 como fórmula) → S6 **-는데 (fondo + hecho)** · **N밖에 + negación** (+ **-았/었을 때 como ampliación** de -(으)ㄹ 때, que no cuenta; **한다체 y 와/과 para reconocer**) → S7 **반말 básico en producción** · **N처럼** · **-게 되다** (+ -다고 생각해요 como fórmula) → S8 **Lab 4 + proyecto: 0 nuevas.** Total: **16 estructuras nuevas** en 6 clases, todas las de la lista A2.2 de la Fase 1 §4.7 y del mapa maestro, más -아/어야 해요, que la cohorte real no produjo en octubre.

**11 · Pronunciación.** Se suma a lo de Conversacional 1 (Fase 1 §6.4): **경음화 y 구개음화 explicados como sistema** y **ritmo de frase**. Por semana: S1 경음화 tras ㄱ/ㄷ/ㅂ (학교 [학꾜], 급식 [급씩], 맞죠 [맏쬬]) y el primer 구개음화 (같이 [가치]) · S2 경음화 que **no** se deduce en palabras sino-coreanas (점수 [점쑤] frente a 성적 [성적]: se aprende por palabra) · S3 비음화 de -ㅂ니다 (입니다 [임니다], 뵙겠습니다 [뵙께씀니다]) y lectura por bloques de una presentación formal · S5 **-네요 siempre nasaliza** el 받침 (맛있네요 [마신네요], 좋네요 [존네요], 먹네요 [멍네요]) y **-(으)ㄹ게요 siempre suena [께]** (할게요 [할께요]) · S6 옛날 [옌날], 밖에 [바께], 끝이 [끄치] (구개음화), 한다체 leído (살았다 [사랃따]) · S7 **la misma forma con otra entonación en 반말** (가? ↗ / 가. ↘ / 가! →), ㅎ que se cae (놓을까요 [노을까요], 좋아 [조아]). *Se corrige siempre:* ㅓ/ㅗ, las tensas, el 받침 sin vocal de apoyo y la ㄹ entre vocales como *rr* española (여러분, 말이). **Una sola cosa por turno, con modelo y repetición.**

**12 · Cultura.** Eje de Conversacional 2 (Fase 1 §10.3): **Corea por dentro** — *"¿Por qué Corea funciona así y cómo está cambiando?"*. Capas protagonistas: **tradicional ↔ contemporánea ↔ generacional**, más la **regional** y la **diáspora coreana en Latinoamérica** (Patronato en Santiago, Flores en Buenos Aires, los 한글학교 de los sábados: el ángulo más propio de la casa, porque Jay creció en Chile y Kiran en Argentina ⚑ Jay aporta su experiencia). Lo que el alumno sabe *hacer*: explicar con **옛날에는… 요즘은…**, comparar sin jerarquizar (**우리 나라에서는… · 사람마다 달라요**), hablar de mayores y superiores con -(으)시-, pedir permiso en la oficina, saludar en 설날 y hacer la visita, contar un cuento como se cuenta en coreano (옛날 옛적에…), notar el paso al 반말 en un drama. Cada semana tiene **frase ancla, capa, puente y matiz** (B).

**13 · Speaking.** **Al menos el 50 % de cada clase en conversación de los alumnos** (B.1): 30 de 60 minutos en pares y salas en las semanas de tema, 50 en el Lab 3 y ≈ 50 en la S8; más el quiz oral y los turnos del deck. Meta: **15–18 minutos de habla por alumno y clase** (Fase 1 §6.2). Cada semana tiene una **tarea de speaking central con resultado** (B) y un audio semanal de 90 s (misión). Tipos de habla nuevos respecto de Conversacional 1: **debatir** (S2), **presentarse en formal** (S3), **visitar a una familia** (S4–S5), **narrar** (S6), **recomendar y pactar el registro** (S7), **exponer y responder preguntas** (S8).

**14 · Lectura.** Textos de **300–600 sílabas**, narrativos y expositivos (Fase 1 §7.3), todos **originales o recontados por producción**: ficha "un día en un 고등학교" (S1) · titulares y nota breve sobre el día del 수능, recreados (S2; puente a TOPIK 읽기) · correo de bienvenida de una empresa en -습니다 (S3; semilla del 51 de TOPIK II) · calendario del 설 연휴 2027 y tarjeta de 설날 (S4) · "El 설날 de Minji", texto en 해요체 (S5) · **해와 달이 된 오누이 recontado en 한다체** (≈ 400 sílabas, S6: primer 한다체 escrito) · reseña de drama de 3–4 frases en 한다체 (S7). **1 ítem con formato TOPIK I por quiz** (E.4).

**15 · Escritura.** Mensajes por WhatsApp en 한글 y dos textos guiados: 3 frases de comparación escolar (S1) → opinión de 120–200 caracteres con una razón (S2) → correo formal de 3–4 frases en -습니다 (S3) → mensaje de 설날 a un amigo coreano (S4) → comparación de fiestas en 5–6 frases (S5) → **일기 de 4–6 frases en 한다체** con la tabla de conversión (S6; reto: en 원고지, primer contacto) → **guion del proyecto de 8–10 frases** (S7, corregido) → reseña opcional en 한다체 (S7, reto). Meta interna (Fase 1 §8.3): el 일기 en 한다체 es el escalón que faltaba entre "5 frases" y el ensayo de TOPIK II. 띄어쓰기 que se corrige: 가고 싶어 해요, 좋아하게 됐어요, 할 수도 있죠, 먹을 때, 갔을 때, 하나밖에 (밖에 va pegado).

**16 · Listening.** El profe habla en coreano a velocidad natural moderada (D). Además, **Audioteca A4** (Fase 1 §9.3): un **monólogo de 60–90 s por semana en voz del equipo** (guion de producción; el profe lo graba en 5 minutos): "mi colegio" (S1), "el día de mi 수능" (S2, idealmente contado por un coreano que lo rindió ⚑), un mensaje de voz de un 과장님 (S3), "mi 설날 de este año" (S5, contado por el profe apenas vuelve), un cuento (S6), "el drama que me cambió" (S7). Tráileres **oficiales** por enlace (S7), nunca clips descargados. Clips SunHi de toda la lista C y de las 24 frases clave (C, B.14). A6: 1 ítem TOPIK I de escucha en los quizzes que lo permitan. A5 (conversación no ensayada entre dos nativos del equipo) queda para 2027.

---

## B0. Perfil de entrada: quién llega, qué trae y cómo se diagnostica en la S1

### B0.1 La salida real de Conversacional 1 frente a lo que pide Conversacional 2

Conversacional 2 **empieza exactamente donde termina Conversacional 1 de octubre** (el que dio Abby, no la versión de enero de la Fase 1). La columna 1 sale de la Fase 4 (A.8 "puede hacer", B.11, lista C y F.3 "mínimo para estar listo para Conversacional 2"). Ojo con dos diferencias frente al plan de la Fase 1 §4.7, que suponía la redistribución de enero: **-아/어야 해요 no se produjo en octubre** (solo se reconoció 예약해야 해요) y **-고 있어요 fue solo fórmula**.

| Pieza | Salida de Conversacional 1 (octubre, Fase 4) | Externo con "nivel equivalente" (test) | Lo que pide Conversacional 2 | Consecuencia |
|---|---|---|---|---|
| Hablar de sí 2–3 min | Sí, sin leer ("antes y después" de la S8) | Variable | Base del diagnóstico | Se mide en la S1 |
| -아/어 봤어요 · N 중에서 제일 · -아서 | Producción (S2) | Suele traer -아서; 봤어요 de oído | Reactivar desde la S1 | Tarjeta del diagnóstico |
| -(으)ㄹ까요? · -(으)러 · -아서 (secuencia) | Producción (S3) | 할까? en 반말 | S1 (-(으)니까 + -(으)ㄹ까요?), S2 (-(으)러 vs -(으)려고) | Contraste explícito |
| -(으)세요 → -아/어 주세요 → -지 마세요 | Producción (S4) | 주세요 de oído | Base de -(으)시- (S3) | S3 parte de lo que ya dicen |
| 드세요 · 몇 분이세요? · preguntas con -세요? | **Solo reconocer / fórmula** | Variable | Sistema en la S3 | Nuevo |
| -아/어 보여요 · -(으)ㄴ/는 것 같아요 · mapa -는/-(으)ㄴ/-(으)ㄹ | Producción (S6) | 것 같아 de oído | Opinar (S2, S7, S8); 가는 학생이 많아요 (S1) | Reactivar |
| -(으)ㄹ 때 · -기 전에 / -(으)ㄴ 후에 · -(으)면 · 어렸을 때 (F) | Producción (S7) | Variable | S1 (학교가 끝난 후에), S3 (-(으)면 안 돼요), S6 (-았/었을 때) | Reactivar y ampliar |
| -고 싶어요 | Producción (S1) | Sí | Base de -고 싶어 해요 (S5) | Reactivar |
| -아/어야 해요 | **Solo reconocer** (예약해야 해요; reto en la tarjeta de la agencia) | A veces | **Nuevo en la S2** | Se cuenta como estructura nueva |
| Reparación y 맞장구 (다시 한번 말해 주세요, 무슨 뜻이에요?, 진짜요?, 글쎄요) | Producción (S5, núcleo) | Variable | Base del debate y de la versión cortés 말씀해 주시겠어요? (S4) | Reactivar |
| 존댓말 / 반말 · 말 놔도 돼요? · 말씀 편하게 하세요 | **Solo reconocer** (cultura S1) | **Mucho 반말** de dramas | Reconocer (S1) → producción básica pactada (S7) | Por fin se ordena lo que el fan ya oye |
| -(으)니까 · -기 때문에 · -(으)려고 · -는데 · -네요 · -죠 · -(으)ㄹ게요 · 처럼 · 밖에 · -게 되다 · -고 싶어 해요 | **No** (-는데 solo como reto; -고 싶어 해요 solo en voz de Abby) | Algunas de oído | Todo el curso | Nuevo |
| -ㅂ니다 | Fórmulas (잘 먹겠습니다, 수고하셨습니다, 알겠습니다) | Fórmulas | Producción en la S3 | Nuevo como sistema |
| 한다체 | No | No | Reconocer en la S6; 일기 guiado | Nuevo |
| Vocabulario activo | 380–480 acumulado (Fase 1 §5.3); en octubre, impredecible (entraron por test) | Impredecible | 500–650 al terminar | Reciclaje en S1 y labs |
| Lectura | Menú, metro, post corto (150–300 sílabas) | Variable | 300–600 sílabas, primer 한다체 | Escalón en la S6 |
| Escritura | Mensajes y 6–8 frases | Variable | 일기 en 한다체 + guion de 8–10 frases | Escalón en S6–S7 |
| Horas acumuladas | Desconocidas (entrada por test) + 8 h de Conversacional 1 | Desconocidas | — | Por eso existe el diagnóstico |

### B0.2 Quién puede entrar y con qué prueba (DECISIÓN DE JAY 6)

| Perfil | Cómo entra (propuesta) | Por qué |
|---|---|---|
| **Egresado de Conversacional 1 con certificado** | Directo, sin test (lo que ya dice la página pública: "su certificado te da acceso directo") | Es el contrato de la escalera |
| Egresado de Conversacional 1 **con "recomendación de refuerzo"** en su informe (nota < 60 % o foco en tiempos) | Directo + **kit de refuerzo** (B0.4, punto 5) antes de la S1 | La Fase 1 §11.3 propone que la nota no bloquee: define el siguiente paso |
| Externo (autodidacta, otra academia, hablante de herencia) | **Audio guiado de 2 minutos por WhatsApp + micro-diagnóstico de 12 ítems** antes de pagar (Fase 1 §12) | `/test-nivel` hoy es autodeclarativo y no recomienda A2.2 (Fase 1 §15 #23) |
| Alumno que terminó Básico 2 en octubre | **No**: va a Conversacional 1 en enero (`Horarios_Equipo_2026-2` §5) | Le faltaría todo A2.1 |

**Audio guiado de 2 minutos (externos).** Jay manda 5 preguntas por WhatsApp; el alumno responde en un solo audio, sin leer: (1) 자기소개를 해 주세요. 한국어를 배운 지 얼마나 됐어요? (2) 한국에 가 봤어요? 한국에서 어디에 가 보고 싶어요? 왜요? (3) 한국 음식 중에서 뭐가 제일 좋아요? 식당에서 어떻게 주문해요? (4) 지난 주말에 뭐 했어요? (5) 요즘 한국 드라마나 노래 중에서 뭐가 좋은 것 같아요? **Pasa** si en 4 de 5 respuestas hay una frase completa con la estructura de Conversacional 1 que la pregunta pide (-아/어 봤어요, 제일 + -아서, 주세요, pasado, 것 같아요) y se le entiende sin esfuerzo.
**Micro-diagnóstico de 12 ítems** (Google Form con clave, 10 minutos): 4 de estructura de Conversacional 1 (completar: 가 ___ 봤어요? · 바다를 보___ 가요 · 물 좀 ___ · 편해 ___), 4 de lectura (un menú y un aviso de metro con 2 preguntas cada uno) y 4 de escucha (clips SunHi de frases de Conversacional 1: elegir la respuesta adecuada). **Pasa con 8/12.** Quien no pasa: Conversacional 1 de enero, sin costo de cambio (DECISIÓN DE JAY 6).

### B0.3 El diagnóstico oral de la S1 (sin nota)

**Qué mide:** si el alumno trae la salida de Conversacional 1 en uso real (no en ejercicio), cómo reacciona a una pregunta de seguimiento y qué registro usa. Es el "antes" del proyecto final.

**Logística.** Durante los 20' de salas de la S1: **3 rondas de 6' en pares** (un trío si el número es impar), la ronda 1 al azar y las rondas 2 y 3 armadas por el profe para que nadie repita pareja. El profe visita **6 salas en 18'** (≈ 2,5' cada una, como en Conversacional 1 B0.2: con traslados no caben más), o sea ≈ 12 de 15 alumnos; a quien no escuchó lo diagnostica con el audio de la misión. Escucha 60–90 s sin intervenir y luego hace **dos preguntas de seguimiento** por alumno.

**Tarjeta de entrevista del reencuentro (ALUMNO; 5 preguntas, en cualquier orden).**

| # | Pregunta | Qué deja ver |
|---|---|---|
| 1 | 크리스마스하고 새해에 뭐 했어요? | Pasado, conectores (-고, -아서) |
| 2 | 회화 1에서 뭐가 제일 재미있었어요? 왜요? | 제일 + -아서 (Conversacional 1 S2) |
| 3 | 고등학교 때 교복을 입었어요? 학교가 몇 시에 끝났어요? | Pasado + vocabulario nuevo del día (con la lámina a la vista) |
| 4 | 학교가 끝난 후에 보통 뭐 했어요? | -(으)ㄴ 후에 (Conversacional 1 S7) |
| 5 | 이번 수업에서 뭐 하고 싶어요? | -고 싶어요 + meta personal |

**Preguntas de seguimiento del profe (PROFE; elige 2).** 왜요? · 그때 기분이 어땠어요? · 한국 학교하고 뭐가 달라요? · 한국에서 그런 경험을 해 봤어요? · 선생님한테도 그렇게 말해요? (para ver si nota el registro).

**Planilla del diagnóstico (PROFE).** Las columnas de Conversacional 1 + 2 nuevas, con **A · B · C** (nunca colores):

| Dimensión | A · sólido | B · en camino | C · a reforzar |
|---|---|---|---|
| **Fluidez** | Responde, desarrolla y pregunta de vuelta | Frases completas con pausas | Frases cortas o sueltas; vuelve al español |
| **Pronunciación** | ㅓ/ㅗ, tensas y 받침 bien | Errores que a veces confunden | Cuesta entenderle |
| **Comprensión e interacción** | Entiende la pregunta de seguimiento a la primera y reacciona | Necesita una repetición | Necesita reformulación |
| **Estructuras de Conversacional 1** | Usa 3+ (봤어요, 제일 + -아서, -(으)ㄴ 후에, 것 같아요, -(으)면…) sin que se las pidan | 1–2 | Solo presente y pasado simple |
| **Registro** (nueva) | 해요체 constante con el profe y con el compañero | Se le escapa algún 반말 | 반말 o mezcla frecuente |
| **Conectar ideas** (nueva) | Da razones y encadena (-아서, -지만, 그래서, 그런데) | Una razón simple | Frases sueltas |
| **Meta personal** | Texto libre | | |

**Perfil** = la letra que más se repite. **El audio de la misión** completa el cuadro: 90 s sobre "mi colegio" + **lectura en voz alta de 5 frases** (tarjeta de lectura: *고등학교 때 교복을 입었어요 · 학교가 끝난 후에 학원에 갔어요 · 맞죠? 그렇죠! · 급식이 맛있었어요 · 같이 공부할까요?*; mide 경음화, 구개음화 y 연음 sin gastar clase). **Quien falte a la S1** manda ese audio + las 5 preguntas de la tarjeta en otro audio de 1–2 minutos, antes del **domingo siguiente [POR CONFIRMAR: dom 17 ene]**.

**Salida: el mapa del grupo** (viernes de la S1 [POR CONFIRMAR: vie 15 ene]): el profe manda la planilla y Jay arma (1) **parejas A + B o B + B**, nunca A + A (como en Conversacional 1), rehechas después del Lab 3; (2) quién recibe tarjeta de **apoyo** y quién de **reto** (B0.4); (3) el aviso a quien convenga reforzar (kit, punto 5). El diagnóstico **no lleva nota**.

### B0.4 Cómo se atienden distintos niveles de soltura

1. **Parejas por perfil** y **líder de sala rotativo** (reparte turnos, avisa "1분 남았어요"), como en Conversacional 1.
2. **Tarjeta de apoyo y tarjeta reto** en cada sala: el apoyo trae **3 frases modelo** y un banco de 6 palabras; el reto pide **una frase más con la estructura de la semana anterior** o una pregunta de seguimiento al compañero. La tarea núcleo es la misma para todos.
3. **La escalera de respuesta A2.2** (se muestra en la S1, lámina 0): *frase → frase + razón → + ejemplo propio → + comparación (우리 나라에서는…) → + pregunta de vuelta*. El profe siempre pide **un peldaño más** que el que el alumno dio.
4. **20 segundos de preparación en silencio** antes de cada sala: 3 palabras clave, no frases.
5. **Kit de refuerzo** (perfil C en estructuras de Conversacional 1): las secciones 3 y 10 de los materiales de Conversacional 1 que el informe señale (`../Fase4_Conversacional1/alumnos/S0N_Material_Alumno.md`) + una nota de voz de 1 minuto al profe con 5 frases. En clase no se reenseña: modelo de 10 segundos y se sigue.
6. **Hablantes de herencia o muy fluidos:** reto de **precisión de registro** (해요체 constante, -(으)시- bien puesto, -ㅂ니다 cuando corresponde) y rol de "modelo" en la sala; en la S7, son los que muestran el paso al 반말 en el role play.
7. **Presupuesto de corrección** (Fase 1 §14.4): ≈ 3 minutos por alumno y semana; los 2–3 errores comunes van al cierre y al mensaje del grupo; lo individual, en nota de voz corta (un tercio del grupo por semana).

### B0.5 Qué es repaso para unos y nuevo para otros

| S | Tema | Egresado de Conversacional 1 | Externo por test | Heritage / muy fluido | Qué hace el profe |
|---|---|---|---|---|---|
| 1 | Escuela | -(으)니까 y -죠 nuevos; todo lo demás, repaso | -죠 y 반말 de oído | Todo de oído | Diagnóstico; escalera de respuesta |
| 2 | 수능 | -아/어야 해요 reconocido → producir; -기 때문에 y -(으)려고 nuevos | -아야 돼 de oído (반말) | 때문에 de oído | Mapa de las 3 razones (-아서 · -(으)니까 · -기 때문에) |
| 3 | Oficina | 드세요 y 몇 분이세요? como fórmulas → sistema | Honoríficos sueltos | Los usa, a veces mal puestos (sobre sí mismo) | "Nunca sobre ti" |
| 4 | Lab 3 | Todo repaso + fórmulas de 설날 | Igual | Igual | Rehace parejas; 2 puntos de pronunciación por alumno |
| 5 | 설날 | -(으)ㄹ게요, -네요, -고 싶어 해요 nuevos | -ㄹ게, -네 de oído (반말) | De oído | Contraste con -(으)ㄹ 거예요 y -아요 |
| 6 | Mitos | -는데 era reto en Conversacional 1; 밖에 nuevo | Variable | De oído | Cuento en cadena con imágenes |
| 7 | K-drama | 반말 reconocido → producir con pacto | Mucho 반말 **sin reglas** | 반말 natural | Ordenar, no enseñar desde cero; quién sí, quién no |
| 8 | Lab 4 + proyecto | Nada nuevo | Igual | Igual | Nadie ve nada por primera vez el día del proyecto |

---

## B. Mapa de 8 semanas

### B.0 Vista rápida

**Propuesta de orden (Opción A, recomendada · DECISIÓN DE JAY 4).** Conserva los siete temas del brief y de la página pública, **agrega los dos labs** que el brief no tenía, **alinea el 설날 con la fecha real** y **pliega el 추석 dentro de la clase del 설날** como espejo, porque una semana propia de 추석 en febrero quedaría siete meses fuera de temporada y pegada al 설날 (Fase 1 §10.6 y §15 #31). La Opción B (más conservadora) está en I.2.

| S | Fecha tentativa [POR CONFIRMAR] (Chile · Corea) | Tema | Estructuras nuevas | Frase ancla | Pares/salas | Evaluación |
|---|---|---|---|---|---|---|
| 1 | mié 13 ene · jue 14 ene | **La escuela en Corea · 한국의 학교** + reencuentro | 2 (-(으)니까 · -죠) | 학교가 끝난 후에 학원에 가는 학생이 많아요. 그렇지만 사람마다 달라요. | 20' + 20' de ronda y comparación | Diagnóstico oral (sin nota) |
| 2 | mié 20 ene · jue 21 ene | **El día del 수능 · 수능 날** | 3 (-아/어야 해요 · -기 때문에 · -(으)려고) | 좋은 대학교에 가려고 밤늦게까지 공부하는 학생이 많아요. | 30' (debate incluido) | Quiz 1 |
| 3 | mié 27 ene · jue 28 ene | **La vida en la oficina · 한국의 직장 생활** | 3 (-(으)시- · -ㅂ니다 · -아/어도 돼요? / -(으)면 안 돼요) | 김 과장님, 식사하셨어요? | 30' | Quiz 2 |
| 4 | **mié 3 feb · jue 4 feb** | **Lab 3 · 회화 랩 3** + se viene el 설날 | 0 | 할머니, 새해 복 많이 받으세요! | **50'** | Quiz 3 · autoevaluación · comentario de mitad |
| 5 | **mié 10 feb · jue 11 feb** | **설날, contado** + 추석 como espejo · 설날과 추석 | 3 (-(으)ㄹ게요 · -네요 · -고 싶어 해요) | 옛날에는 설날에 가족이 다 모였어요. 요즘은 여행 가는 사람도 많아요. | 30' | Quiz 4 |
| 6 | mié 17 feb · jue 18 feb | **Mitos y leyendas · 옛날 옛적에** | 2 (-는데 · N밖에 + negación) + ampliación (-았/었을 때) | 옛날 옛적에 호랑이 담배 피우던 시절에… | 30' (cuento en cadena) | Quiz 5 |
| 7 | mié 24 feb · jue 25 feb | **K-drama y la Corea de hoy · K-드라마로 보는 한국 사회** | 3 (반말 básico · N처럼 · -게 되다) | 드라마는 재미있지만 현실하고 좀 다른 것 같아요. | 30' | Quiz 6 · temas del proyecto |
| 8 | mié 3 mar · jue 4 mar | **Lab 4 · 회화 랩 4 + proyecto final** | 0 | 제 생각에는 좋은 점도 있고 안 좋은 점도 있는 것 같아요. | **≈ 50'** | Proyecto final |

Romanización: ninguna semana. Los corchetes siempre son 한글.

### B.1 La hora de clase (60 minutos completos) y la garantía de conversación

**Estructura de las semanas de tema (S2, S3, S5, S6, S7)**, la misma de Conversacional 1 para que nadie tenga que reaprender la clase:

| Minuto | Tentativo Chile · Corea | Bloque | Cómo se usa | ¿Hablan los alumnos? |
|---|---|---|---|---|
| — | 20:58 · 08:58 | (entrada del profe) | Reclama anfitrión, abre salas preconfiguradas, admite | — |
| 0–5 | 21:00–21:05 · 09:00–09:05 | Quiz oral de la clase anterior | 4 preguntas + **1 ítem TOPIK I** (E.4); en voz alta por nombre o en el chat ("solo anfitrión") | Sí (turnos) |
| 5–15 | 21:05–21:15 · 09:05–09:15 | 스몰토크 en pares | Pregunta del día + una anterior (B.13); cámaras encendidas; sin corrección | **Sí: 10'** |
| 15–35 | 21:15–21:35 · 09:15–09:35 | Tema con el deck | **R** input real (foto, monólogo A4 de 60–90 s, texto corto; 3') → **C** las 2–3 estructuras, cada una con una frase del alumno sobre sí mismo (11') → **cultura: frase ancla + capa + puente + matiz** (4') → consigna de sala (2'). **Tope duro: 20'** | Sí (≈ 5' de turnos) |
| 35–55 | 21:35–21:55 · 09:35–09:55 | Salas de 2–3 | Tarea **con resultado** y tarjeta de sala · el profe rota (≈ 2,5' por sala) y corrige pronunciación uno a uno · líder de sala · aviso de 60 s | **Sí: 20'** |
| 55–60 | 21:55–22:00 · 09:55–10:00 | Cierre | Los 2–3 errores comunes con modelo · **las 3 frases clave en coro** (B.14; quedan en la grabación) · modelo de la misión · 수고했어요 / 감사합니다 | Sí (coro) |

**Qué cuenta como conversación:** los alumnos hablan coreano entre ellos o con el profe con un propósito comunicativo (pares, salas, debate, ronda de preguntas); no cuentan el coro ni la repetición. Reglas (las de Conversacional 1): (1) el 스몰토크 y las salas no se recortan; (2) si crece la explicación, se recorta la explicación; (3) si la clase parte tarde, el quiz baja a 3 preguntas.

| S | Pares o salas | Conversación en plenario | Total | % de 60' |
|---|---|---|---|---|
| 1 | 20' (entrevistas) | 10' ronda de reencuentro + 8' "allá y acá" + 3' metas | 41' | 68 % |
| 2 | 30' (스몰토크 + debate en salas) | 5' quiz + 4' conclusiones de cada sala | 39' | 65 % |
| 3, 5, 6, 7 | 30' (스몰토크 + salas) | 5' (quiz oral) | 35' | 58 % |
| 4 · Lab 3 | 50' (스몰토크 + 40' de lab) | 5' (decisiones de cada grupo) | 55' | 92 % |
| 8 · Lab 4 + proyecto | ≈ 45' (lab + preguntas en tríos) | ≈ 7' (ronda final) | ≈ 52' | ≈ 87 % |

**Conteo conservador que deben traer las guías** (descontando abrir salas, instrucciones y coros): ninguna semana de tema puede quedar bajo el 52 %. La más justa es la **S3** (la del -(으)시- y el -ㅂ니다, con mucha forma nueva): su guía prohíbe pasar de 20' en el deck y convierte la práctica de -ㅂ니다 en turnos personales dentro del deck (cada alumno se presenta en formal), que sí cuentan como conversación.


### B.2 Semana 1 · S1 (enero 2027) · La escuela en Corea + reencuentro y diagnóstico

| Campo | Semana 1 |
|---|---|
| Fecha | **S1 · enero 2027** · tentativo **mié 13 ene, 21:00–22:00 (Chile) = jue 14 ene, 09:00–10:00 (Corea) [POR CONFIRMAR]** |
| Tema | Te reencuentras con el grupo, reactivas Conversacional 1 y comparas tu colegio con un colegio coreano: horario, 교복, 학원, 방학, el trato entre 선배 y 후배 (página pública, semana 1). Mientras hablas, el profe hace el diagnóstico |
| **Después de esta clase puedo decir…** | 1. 고등학교 때 저는 교복을 입고 학교에 다녔어요.<br>2. 학교가 끝난 후에 학원에 가는 학생이 많죠?<br>3. 지금 한국은 겨울 방학이에요. 칠레는 여름 방학이에요.<br>4. 내일 시험이 있으니까 오늘은 같이 공부할까요?<br>5. 선배한테는 존댓말을 써요. |
| Gramática de apoyo · carga: 2 + reactivación | • [nueva 1] **-(으)니까** ("como…, entonces": una razón que empuja a **proponer, pedir o aconsejar**): 시간이 없으니까 빨리 가요 · 비가 오니까 우산을 가져가세요 · 시험이 있으니까 같이 공부할까요? Forma: vocal o ㄹ → -니까 (가니까, 사니까: la ㄹ se cae), consonante → -으니까 (있으니까, 먹으니까), pasado → -았/었으니까 (늦었으니까 택시를 탈까요?). **Desde el español:** los dos dicen "porque", pero **-아서 no puede ir con -(으)세요, -(으)ㄹ까요? ni con el -아요 de propuesta** (시간이 없어서 빨리 가세요* ✗), y tampoco con pasado (늦었어서* ✗); **-(으)니까 sí**. Es la nota que la Fase 4 dejó escrita en la S2 de Conversacional 1 ("ahí va -(으)니까, A2.2"). Matiz para el profe: en frases informativas a un desconocido o a un superior, -아서 suena más suave (바빠서 못 가요 mejor que 바쁘니까 못 가요, que puede sonar a "obvio"); para agradecer o disculparse, siempre -아서 (늦어서 죄송해요) ⚑ confirmar la regla del "obvio" con nativo antes de ponerla en el material<br>• [nueva 2] **-죠** ("¿cierto?", "¿no?": confirmas algo que crees que el otro sabe o comparte; o das la razón): 한국 학교는 3월에 시작하죠? · 교복이 좀 불편하죠? · 맞죠? — 그렇죠! Forma: 가죠, 먹죠, 학생이죠 / 친구죠 (이다 → 이죠 tras consonante; 죠 tras vocal). Es la contracción de -지요. Entonación: pregunta ↗ para confirmar; afirmación ↘ para dar la razón<br>• [reconocer] **반말 en boca de un 선배 o de un 동기**: 밥 먹었어? · 어디 가? · 응, 알았어. Solo se reconoce: el sistema llega en la S7<br>• [fórmula] **N + 때** (고등학교 때, 방학 때) · [R] **-(으)ㄴ 적이 있어요** (학원에 다닌 적이 있어요? = 다녀 봤어요?)<br>• [reactiva] -아/어 봤어요, 제일 + -아서, -(으)ㄴ 후에, -(으)ㄹ 때 (학교 다닐 때), -(으)ㄴ/는 + N (학원에 가는 학생), -고 싶어요, 것 같아요, -(으)면: todo en la tarjeta del diagnóstico<br>• Ciclo: **R** = el profe cuenta su colegio en 6 frases con 3 fotos (monólogo A4) · **C** = cada uno dice "고등학교 때 저는…" y una propuesta con -(으)니까 a partir de una situación en pantalla (시험이 있어요 → …으니까 같이 공부할까요?) · **G** = entrevista con tarjeta (diagnóstico) · **L** = comparación "allá y acá" en plenario sin tarjeta |
| Vocabulario (24) | **Núcleo (12):** 교복 · 과목 · 시간표 · 다니다 · 입학하다 · 졸업하다 · 선배 · 후배 + ↺ 방학 · 학원 · 숙제 · 존댓말/반말 (en Conversacional 1 eran reconocimiento)<br>**Paradigmas (2):** 초등학교 · 중학교 · 고등학교 · 국어 · 영어 · 수학 · 과학 · 체육<br>**Tema (4):** 동기 · 담임 선생님 · 급식 · 동아리<br>**Fórmulas (3):** 맞죠? · 그렇죠! · 고등학교 때 / 방학 때 · 다시 만나서 반가워요!<br>**Reconocimiento (3):** 야간 자율 학습 · 밥 먹었어? / 어디 가? (반말) · 다닌 적이 있어요 |
| Expresiones | • 다시 만나서 반가워요! 방학 잘 보냈어요? (para quien tuvo vacaciones) · 크리스마스하고 새해에 뭐 했어요?<br>• 맞죠? — 그렇죠! · ___ 씨는요? (↺)<br>• 한국 학교하고 뭐가 달라요? — ___은/는 비슷하지만 ___은/는 달라요.<br>• Frases clave del coro: 고등학교 때 저는 교복을 입고 학교에 다녔어요. / 학교가 끝난 후에 학원에 가는 학생이 많죠? / 내일 시험이 있으니까 오늘은 같이 공부할까요? |
| Pronunciación | **경음화 tras ㄱ/ㄷ/ㅂ, explicado como regla por primera vez:** 학교 [학꾜] · 급식 [급씩] · 숙제 [숙쩨] · 맞죠 [맏쬬] · 입고 [입꼬]. **El primer 구개음화:** 같이 [가치] (ㄷ/ㅌ + 이 → ㅈ/ㅊ; vuelve en la S6). 연음 y ㅎ: 졸업 [조럽] · 입학 [이팍] · 학원 [하권] · 있으니까 [이쓰니까] · 많죠 [만쵸]. Se corrige: ㅓ/ㅗ en 선배 y 고등학교; el 받침 sin vocal de apoyo ("ku-bok"). |
| Cultura | Capas: contemporánea + generacional + diáspora. **No repetir** el "학교에 가요. 그리고 학원에 가요" de Básico 1 (S6): aquí se da **el porqué y el cambio**. (1) **교복:** la mayoría de los 중·고등학교 lo usa; en los últimos años muchos colegios lo hicieron más cómodo (poleras, buzos) ⚑ dato general, sin cifras. (2) **학원 y 사교육:** muchos estudiantes van a una academia privada después del colegio; hay familias que lo ven como necesario y otras que lo critican por el costo y el cansancio; en Seúl hay límites de horario para los 학원 ⚑ (confirmar la hora y el alcance antes de decirla). (3) **선배/후배/동기:** el año de ingreso ordena el trato aunque la diferencia sea de un año; entre 동기 se habla en 반말, al 선배 en 존댓말 (y 선배 le puede hablar en 반말 al 후배): **así se engancha el 반말 que el fan oye en los dramas**. (4) **Calendario al revés:** en Corea el año escolar empieza en marzo (el 2) y ahora es 겨울 방학; en Chile, Argentina o Uruguay también empieza en marzo, pero enero es 여름 방학. (5) **Diáspora:** en Santiago y en Buenos Aires hay 한글학교 los sábados para hijos de familias coreanas; el libro de Básico 1 (한글학교 한국어) viene de ahí ⚑ Jay cuenta su experiencia si quiere. **Frase ancla:** 학교가 끝난 후에 학원에 가는 학생이 많아요. 그렇지만 사람마다 달라요. **Puente:** el "preu" chileno, las academias de ingreso en Perú o México, los colegios con uniforme de toda Latinoamérica; el "mechón" y el "novato" frente al 후배. **Sin estereotipo:** "no todos los estudiantes coreanos estudian hasta medianoche: depende de la familia, de la ciudad, del año escolar y de la persona". |
| Tarea de speaking central | **Entrevista del reencuentro** (3 rondas de 6', cambiando de pareja) con la tarjeta de 5 preguntas (B0.3), mientras el profe diagnostica. De vuelta en plenario: **"allá y acá"**: cada pareja dice una diferencia y una semejanza entre su colegio y un colegio coreano (우리 학교는 ___았/었어요. 한국 학교는 ___죠?), y el grupo responde 맞아요 / 글쎄요… Cierre: cada uno dice su meta del curso con -고 싶어요. |
| Escucha y lectura | **R:** monólogo del profe "mi colegio" (60–90 s, A4). **Lectura:** ficha "un día en un 고등학교" (300–350 sílabas, original: horario, 급식, 청소, 학원, 방학) con 3 preguntas; se lee en casa. |
| Recurso digital (exacto) | Tarjeta de entrevista y tarjeta de lectura (enlace en el chat) · planilla del diagnóstico (Drive, solo profe y Jay) · 🔊 clips SunHi del vocabulario y de las 3 frases clave (C, B.14) · nota de voz de WhatsApp. **Lector y Dubu: no se asignan** (Fase 1 §14.2). |
| Hora de clase | 0–3 bienvenida (lámina 0: reglas de idioma, cámaras, escalera de respuesta A2.2, las 5 frases de supervivencia ↺) · 3–13 **ronda de reencuentro**: cada uno dice qué hizo en las fiestas y una cosa que recuerda de Conversacional 1 (en vez del 스몰토크) · 13–20 R (monólogo del profe) + C de -(으)니까 y -죠 · 20–40 **entrevistas 3 × 6'** + diagnóstico · 40–48 "allá y acá" · 48–55 cultura (선배/후배, 반말 para reconocer) + metas · 55–60 cierre (errores comunes, 3 frases clave, modelo de la misión). **Sin quiz** (no hay clase anterior). |
| Tarea (prepara la S2) | ≈ 25 min, antes de la S2. (1) **Audio de 90 s, 12 min: "Mi colegio"** (cómo era, qué te gustaba, qué es distinto en Corea, una propuesta con -(으)니까) + **lectura en voz alta de las 5 frases** de la tarjeta. **Guárdalo: es tu "antes".** (2) **Lectura, 8 min:** la ficha "un día en un 고등학교" y sus 3 preguntas. (3) **Prepara la S2, 5 min:** piensa en **el examen más importante de tu vida** (PAES o PSU, Saber 11, EXANI, un examen de ingreso, una prueba de trabajo, el examen de manejo…) y anota 3 palabras: cuándo, cómo te preparaste, cómo te fue. **Destino exacto:** el 스몰토크 de la S2 empieza con esa historia. **Apoyo:** modelo de audio del profe. **Reto:** usa -죠 una vez para preguntarle algo al profe en el audio. |
| Entregable del alumno | Audio "antes" (90 s + lectura) · respuestas de la lectura · 3 palabras del examen. Quien faltó: además, las 5 preguntas de la tarjeta por audio. |
| Evaluación | **Sin quiz.** Diagnóstico oral sin nota (B0.3) → mapa del grupo. Registro: asistencia en vivo / grabación + misión en columnas separadas **[regla del certificado: pendiente de decisión de Jay]**. |
| Grupo mixto | Egresado: -(으)니까 y -죠 nuevos, el resto repaso · externo: reto de registro · heritage: reto de precisión (해요체 con el compañero aunque se conozcan). |

### B.3 Semana 2 · S2 (enero 2027) · El día del 수능

| Campo | Semana 2 |
|---|---|
| Fecha | **S2 · enero 2027** · tentativo **mié 20 ene (Chile) = jue 21 ene (Corea) [POR CONFIRMAR]** |
| Tema | Explicas qué es el 수능 y por qué ese día cambia la rutina de un país; cuentas un examen importante de tu vida; das tu opinión con razones: ¿está bien que un examen pese tanto? (página pública, semana 2) |
| **Después de esta clase puedo decir…** | 1. 수능은 한국의 대학 입학 시험이에요. 보통 11월에 봐요.<br>2. 좋은 대학교에 가려고 밤늦게까지 공부하는 학생이 많아요.<br>3. 수능은 일 년에 한 번밖에 없기 때문에 스트레스를 많이 받아요.<br>4. 수능 날에는 아침 일찍 시험장에 가야 해요.<br>5. 제 생각에는 시험 하나가 너무 중요한 것 같아요. |
| Gramática de apoyo · carga: 3 | • [1] **-아/어야 해요** ("hay que", "tengo que"): 공부해야 해요 · 일찍 가야 해요 · 수험표를 가져가야 해요 · 과거: 가야 했어요. Variante oral igual de correcta: -아/어야 돼요. **Para la cohorte real es nueva:** en Conversacional 1 de octubre solo se reconoció (예약해야 해요, S3) y la Fase 1 §4.7 la daba por "reactivar" porque suponía la redistribución de enero. En las salas se nota: el que la trae la usa, el que no, la aprende hoy<br>• [2] **-기 때문에 / N 때문에** (la razón que **explica**, con más peso; muy frecuente al explicar un fenómeno y por escrito): 경쟁이 심하기 때문에 학원에 다녀요 · 수능 때문에 스트레스를 받아요 · 과거: 공부를 많이 했기 때문에 합격했어요 (admite pasado, a diferencia de -아서). Tampoco va con -(으)세요 ni -(으)ㄹ까요? (ahí, -(으)니까). **Mapa de las tres razones** (una lámina, se vuelve a usar todo el curso): **-아서** = la razón cotidiana, neutra · **-(으)니까** = razón que lleva a proponer, pedir o aconsejar · **-기 때문에** = explicar por qué pasa algo, con énfasis<br>• [3] **-(으)려고** ("para", "con la intención de"): 대학교에 가려고 공부해요 · 합격하려고 학원에 다녀요 · 일찍 일어나려고 일찍 자요. **Contraste con -(으)러** (Conversacional 1 S3): -(으)러 solo con verbos de movimiento (공부하러 도서관에 가요); -(으)려고 con cualquier verbo (공부하려고 일찍 일어나요; *공부하러 일찍 일어나요 ✗). Ampliación sin contarla: **-(으)려고 해요** = "pienso…" (이번 방학에 한국어를 열심히 공부하려고 해요)<br>• [fórmulas] 제 생각에는… · 저도 그렇게 생각해요 · 저는 좀 다르게 생각해요 · 그럴 수도 있죠 (-죠 ↺ S1) · **한 번밖에 없어요** (밖에 se explica en la S6)<br>• Ciclo: **R** = monólogo "el día de mi 수능" (60–90 s, A4) y dos titulares recreados · **C** = cada uno: "저는 ___(으)려고 한국어를 공부해요" y "___ 때문에 ___" sobre su propia vida · **G** = "mi examen importante" en pares · **L** = mini-debate |
| Vocabulario (24) | **Núcleo (12):** 수험생 · 성적 · 점수 · 합격하다 · 떨어지다 · 경쟁 · 스트레스를 받다 · 노력하다 + ↺ 수능 · 시험을 보다 · 준비하다 · 긴장되다<br>**Tema (4):** 밤늦게까지 · 시험장 · 결과 · 인생<br>**Fórmulas (4):** 제 생각에는 · 저도 그렇게 생각해요 / 저는 좀 다르게 생각해요 · 그럴 수도 있죠 · 한 번밖에 없어요<br>**Reconocimiento (4):** 수시 · 정시 · 재수 · 수험표 · 엿 · 찹쌀떡 |
| Expresiones | • 시험 잘 봤어요? — 네, 잘 봤어요! / 아니요, 좀 어려웠어요.<br>• 합격했어요! 축하해요! · 떨어졌어요… 괜찮아요, 다음에 잘하면 돼요. (consuelo ⚑)<br>• Debate: 제 생각에는… · 저도 그렇게 생각해요 · 저는 좀 다르게 생각해요 · 그럴 수도 있죠, 그렇지만…<br>• Frases clave: 좋은 대학교에 가려고 밤늦게까지 공부하는 학생이 많아요. / 수능은 일 년에 한 번밖에 없기 때문에 스트레스를 많이 받아요. / 수능 날에는 아침 일찍 시험장에 가야 해요. |
| Pronunciación | **경음화 que no se deduce:** en palabras sino-coreanas a veces hay tensa y a veces no, y se aprende por palabra: 점수 [점쑤] pero 성적 [성적] · 합격 [합껵] (esta sí es la regla de ㄱ/ㄷ/ㅂ de la S1) · 밤늦게 [밤늗께] · 입학시험 [이팍씨험]. 밖에 [바께] (연음 de ㄲ). Ritmo: el debate en bloques (제 생각에는 / 시험 하나가 / 너무 중요한 것 같아요). |
| Cultura | Capas: contemporánea + generacional. **No repetir el blog** (미역국, 엿, 찹쌀떡, aviones, oficinas que abren tarde, policía que lleva a los atrasados): se enlaza como lectura previa y la clase va a **cómo funciona y qué se discute**. (1) **Dos caminos a la universidad:** 수시 (antecedentes, entrevistas, ensayos) y 정시 (el puntaje del 수능) ⚑ sin cifras de proporción salvo fuente oficial. (2) **재수:** volver a rendir al año siguiente es común y tiene su propia palabra. (3) **La discusión real en Corea:** costo del 사교육, cansancio, equidad entre regiones, y también quienes defienden el 수능 por ser igual para todos (정시 se asocia a "justo") ⚑ presentar las dos posturas, sin tomar partido. (4) **La lengua lo dice:** el examen "se ve" (시험을 보다), se "pega" o "se cae" (붙다 / 떨어지다), y a todos los que rinden se les llama 수험생, una categoría social con sus propias frases (수고했어! el día del examen). **Frase ancla:** 좋은 대학교에 가려고 밤늦게까지 공부하는 학생이 많아요. **Puente:** PAES (Chile), ENEM (Brasil), Saber 11 (Colombia), exámenes de admisión por universidad (México, Perú) y el ingreso sin examen nacional en muchas universidades públicas argentinas ⚑ (confirmar cómo se dice con precisión). **Sin caricatura:** nada de "los estudiantes coreanos son robots"; se habla de presión **sin cifras ni casos** (sección 0, regla 13). |
| Tarea de speaking central | **Mini-debate "¿Está bien que un solo examen pese tanto?"** (página pública). En salas de 3: 5' **"mi examen importante"** (cada uno cuenta el suyo en pasado: 언제, 왜, 어떻게 준비했어요, 결과) → 12' **debate con tarjetas de postura** (A: el 수능 es justo porque es igual para todos · B: un examen no muestra todo · C: moderador que pide razones: 왜 그렇게 생각해요?) → **resultado:** la sala acuerda **una frase de conclusión** con -기 때문에 y la dice en plenario (4'). |
| Escucha y lectura | **R:** monólogo A4 "el día de mi 수능" (idealmente grabado por un coreano del equipo que lo rindió ⚑). **Lectura:** 4 titulares y una nota breve recreados por producción (≈ 300 sílabas: el día del examen, el tráfico, los 후배 que animan en la puerta) con 3 preguntas: puente a TOPIK 읽기. |
| Recurso digital (exacto) | Tarjetas de postura (enlace en el chat) · lámina "mapa de las tres razones" · blog `/blog/sopa-de-algas-antes-de-un-examen-supersticion-coreana` como lectura previa opcional · 🔊 clips C y B.14. |
| Hora de clase | 0–5 **quiz 1** (S1) · 5–15 스몰토크 (B.13) · 15–35 R (monólogo + titulares) → C de -아/어야 해요, -기 때문에 y -(으)려고 con el mapa de las razones → cultura · 35–55 salas: examen + debate · 55–60 conclusiones de cada sala (en el cierre) + 3 frases clave. |
| Tarea (prepara la S3) | ≈ 25 min. (1) **Audio de 90 s, 12 min:** tu examen importante + tu opinión sobre el 수능 con al menos **una** de las tres razones y un -(으)려고. (2) **Escritura, 8 min:** tu opinión en **120–200 caracteres** por WhatsApp (제 생각에는… · -기 때문에…). (3) **Prepara la S3, 5 min:** ¿cómo llamas a tu jefe, a tus colegas y a tu profe? ¿Tuteas en tu trabajo? Anota 3 ejemplos (en español vale). **Destino exacto:** el 스몰토크 y la cultura de la S3. **Reto:** usa también -(으)니까 para dar un consejo a un 수험생. |
| Entregable del alumno | Audio · opinión escrita · 3 ejemplos de trato en el trabajo. |
| Evaluación | **Quiz 1** (E.4) · registro de turnos en el debate · **[regla del certificado: pendiente de decisión de Jay]**. |
| Grupo mixto | Quien no rindió nunca un examen grande cuenta una entrevista de trabajo o un examen de manejo. Externo: si trae -아야 돼 en 반말, se sube a 해요체 con una sonrisa. |

### B.4 Semana 3 · S3 (enero 2027) · La vida en la oficina

| Campo | Semana 3 |
|---|---|
| Fecha | **S3 · enero 2027** · tentativo **mié 27 ene (Chile) = jue 28 ene (Corea) [POR CONFIRMAR]** |
| Tema | Te presentas en un contexto de trabajo y hablas con el respeto que corresponde: el cargo en lugar del nombre, -(으)시- para hablar de un superior, -ㅂ니다 para presentarte, pedir permiso y entender lo que no se hace (página pública, semana 3) |
| **Después de esta clase puedo decir…** | 1. 처음 뵙겠습니다. 저는 마케팅팀 카밀라 로하스입니다. 잘 부탁드립니다.<br>2. 김 과장님, 식사하셨어요?<br>3. 부장님은 지금 회의실에 계세요.<br>4. 부장님, 오늘 먼저 퇴근해도 될까요?<br>5. 회의에 늦으면 안 돼요. |
| Gramática de apoyo · carga: 3 | • [1] **-(으)시-** (respeto hacia **la persona de la que hablas**, el sujeto): 가세요 / 가셨어요 / 가세요? · 읽으세요 / 읽으셨어요 · 이다 → 이세요 / 세요 (과장님이세요, 회의 중이세요). **Verbos especiales (un paradigma):** 먹다·마시다 → **드시다** · 있다 (persona) → **계시다** · 자다 → **주무시다** · 말하다 → **말씀하시다**. Pero "tener": 시간 있으세요? (no 계세요) ⚑ explicar con 2 ejemplos, no como regla larga. **Nunca sobre ti mismo** (저는 가세요* ✗). **Desde el español:** el "usted" marca al que te escucha; -(으)시- marca a la persona **de la que hablas**, aunque no esté: 우리 할머니가 주무세요 se dice también hablando con un amigo. Parte de lo que ya dicen: 여기 앉으세요, 맛있게 드세요, 몇 분이세요? (Conversacional 1 S4, fórmulas) → "eso era -(으)시-"<br>• [2] **-ㅂ니다/습니다 en producción** (formal: presentarse, reuniones, anuncios): 입니다 · 합니다 · 있습니다 · 알겠습니다 · 부탁드립니다. Pregunta -ㅂ니까? solo para reconocer. Se produce en dos contextos cerrados: **la presentación formal** y **un informe de 3 frases en una reunión** (오늘 회의는 세 시에 있습니다. 자료는 제가 준비했습니다.). Venía como fórmula desde Básico 2 (반갑습니다, 먼저 들어가 보겠습니다)<br>• [3] **-아/어도 돼요? · -(으)면 안 돼요** (pedir permiso · prohibir; un par): 여기 앉아도 돼요? · 사진 찍어도 돼요? · 회의에 늦으면 안 돼요 · 회의 중에 전화하면 안 돼요. Con un superior, más suave: **-아/어도 될까요?** (먼저 퇴근해도 될까요?: -(으)ㄹ까요? ↺). Respuestas: 네, 그러세요 · 네, 먼저 들어가세요 · 죄송하지만 안 돼요. -(으)면 안 돼요 usa -(으)면 de Conversacional 1 S7<br>• [reconocer] **께서 · 께** (= 이/가 · 에게 con respeto: 부장님께서 말씀하셨어요) · -십니다 (하십니다) · **-지 않아도 돼요** ("no hace falta")<br>• [fórmulas] 처음 뵙겠습니다 · 잘 부탁드립니다 · 식사하셨어요? · 먼저 들어가 보겠습니다 · 네, 알겠습니다 · **신입이라서 긴장돼요** (N(이)라서: la Fase 4 la dejó para A2.2; aquí como fórmula)<br>• Ciclo: **R** = mensaje de voz de un 과장님 y un correo de bienvenida en -습니다 · **C** = transformaciones rápidas sobre gente real del alumno (우리 엄마는 은행에서 일해요 → 일하세요) y la presentación formal de cada uno en turnos · **G** = role play con tarjetas · **L** = informe final del nuevo empleado |
| Vocabulario (24) | **Núcleo (9):** 직장 · 동료 · 상사 · 신입 사원 · 회의 · 야근 · 회식 · 명함 + ↺ 출근하다 / 퇴근하다<br>**Paradigmas (2):** 계시다 · 드시다 · 주무시다 · 말씀하시다 · 사원 · 대리 · 과장 · 부장 · 사장<br>**Tema (3):** 팀장님 · 점심시간 · 워라밸<br>**Fórmulas (6):** 처음 뵙겠습니다 · 잘 부탁드립니다 · 식사하셨어요? · 먼저 들어가 보겠습니다 · 네, 알겠습니다 · 신입이라서 긴장돼요<br>**Reconocimiento (4):** 께서 / 께 · 수고하셨습니다 · 주 52시간 · 칼퇴 |
| Expresiones | • 처음 뵙겠습니다. ___입니다. 잘 부탁드립니다. · 명함 여기 있습니다. (dos manos)<br>• 과장님, 식사하셨어요? — 네, 먹었어요. ___ 씨도 식사했어요? (el jefe puede responder sin -시- ⚑)<br>• 부장님, ___아/어도 될까요? — 네, 그러세요.<br>• Al irse: 먼저 들어가 보겠습니다. — 네, 들어가세요. / 수고했어요.<br>• Frases clave: 처음 뵙겠습니다. 잘 부탁드립니다. / 부장님은 지금 회의실에 계세요. / 부장님, 오늘 먼저 퇴근해도 될까요? |
| Pronunciación | **비음화 de -ㅂ니다** (↺ Básico 2, ahora en producción): 입니다 [임니다] · 뵙겠습니다 [뵙께씀니다] · 부탁드립니다 [부탁뜨림니다] · 알겠습니다 [알게씀니다]. 식사하셨어요 [식싸하셔써요] · 직장 [직짱] · 동료 [동뇨] · 신입 [시닙]. **Ritmo:** la presentación formal se dice en tres bloques con pausa (처음 뵙겠습니다 / 저는 ___입니다 / 잘 부탁드립니다), con una pequeña reverencia en el primero. |
| Cultura | Capas: contemporánea + generacional. **No repetir** el 먼저 들어가 보겠습니다 de Básico 2 como dato suelto: aquí se explica **el sistema**. (1) **직급과 호칭:** en muchas empresas se llama a las personas por el apellido + cargo + 님 (김 과장님), no por el nombre; y **hay empresas que lo están cambiando** (todos "님", nombres en inglés, un solo cargo) ⚑ dar la tendencia sin nombrar empresas salvo fuente. (2) **명함** con las dos manos, mirándolo un momento antes de guardarlo. (3) **회식:** la cena del equipo fue durante años casi obligatoria y larga (1차, 2차…); hoy muchas se hacen al almuerzo, son más cortas o con actividades, y la ley de la semana de 52 horas cambió rutinas ⚑ confirmar año y alcance. (4) **Generaciones:** los medios hablan de "MZ세대" y del 워라밸; la clase lo trata como **discurso**, no como verdad sobre "los jóvenes". (5) **La lengua lo dice:** el respeto no es solo el tono: está en la gramática (-(으)시-) y en el vocabulario (드시다, 계시다). Matiz del 표준 언어 예절: a un superior no se le dice 수고하셨습니다 (queda como de arriba hacia abajo); se prefiere 먼저 들어가 보겠습니다 / 내일 뵙겠습니다 ⚑ (la Fase 1 §10.2 ya lo aplicó con la profe). **Frase ancla:** 김 과장님, 식사하셨어요? **Puente:** "licenciado" o "ingeniero" en México, "don/doña", el tuteo en muchas oficinas de Chile o Argentina; el "after office" voluntario frente a un 회식 que era difícil rechazar. **Sin estereotipo:** 회사마다 달라요: una startup, un banco y el sector público no se parecen. |
| Tarea de speaking central | **Role play "Primer día en una empresa coreana"** (página pública), salas de 3 con tarjetas: **A** 신입 사원 · **B** 팀장님 · **C** 선배 (compañero con más tiempo). **Tiene que pasar:** presentación formal con -ㅂ니다 y 명함 · saludo con -(으)시- (식사하셨어요?) · **dos permisos** con -아/어도 될까요? · **dos reglas** de la oficina con -(으)면 안 돼요 (las da C) · la salida (먼저 들어가 보겠습니다). Se rota A cada 6'. **Resultado:** A informa en la sala en 3 frases: "팀장님은 ___세요. ___(으)면 안 돼요. 내일은 ___아/어야 해요." |
| Escucha y lectura | **R:** mensaje de voz del 과장님 (30–40 s) + **correo de bienvenida en -습니다** (≈ 300 sílabas, original: hora de entrada, reunión, almuerzo, 회식 del viernes) con 3 preguntas. Es la semilla del ítem 51 de TOPIK II (Fase 1 §8.3). |
| Recurso digital (exacto) | Tarjetas de rol A/B/C (enlace en el chat) · plantilla de 명함 de juego (producida; nombre, equipo, cargo) · lámina de cargos · 🔊 clips C y B.14. |
| Hora de clase | 0–5 quiz 2 (S2) · 5–15 스몰토크 · 15–35 R → C: -(으)시- (8') · -ㅂ니다 en turnos (cada uno se presenta en formal: 4') · permiso/prohibición (4') · cultura (4') · 35–55 role play · 55–60 cierre. **Semana más densa en forma:** el deck no pasa de 20' (B.1). |
| Tarea (prepara la S4) | ≈ 25 min. (1) **Audio de 90 s, 12 min:** tu **presentación formal** (-ㅂ니다, 30 s) + **habla de una persona mayor de tu familia o de tu jefe** con -(으)시- (우리 할머니는 ___에 사세요. 매일 ___으세요…; 60 s). (2) **Escritura, 8 min:** un correo corto de 3–4 frases en -습니다 a un "팀장님" (te presentas y pides permiso para algo). (3) **Prepara la S4, 5 min:** repasa la **guía de estudio S1–S3** (C2_Guia_Estudio_S1-S3) y piensa **cómo recibes tú el Año Nuevo** (3 palabras) y a qué persona mayor le harías el 세배. **Destino exacto:** las estaciones del Lab 3. |
| Entregable del alumno | Audio · correo · 3 palabras de Año Nuevo. |
| Evaluación | **Quiz 2** (S2) · registro del role play · **[regla del certificado: pendiente de decisión de Jay]**. |
| Grupo mixto | Heritage: -(으)시- sobre sí mismos es su error típico; reto: el informe entero en -ㅂ니다. Quien no trabaja: la tarjeta A sirve igual ("primer día de práctica"). |

### B.5 Semana 4 · S4 (febrero 2027) · Lab 3 + "se viene el 설날"

| Campo | Semana 4 |
|---|---|
| Fecha | **S4 · febrero 2027** · tentativo **mié 3 feb (Chile) = jue 4 feb (Corea) [POR CONFIRMAR]**, tres días antes del 설날 |
| Tema | **Laboratorio de conversación 3:** integras S1–S3 (escuela, 수능, oficina) en estaciones con resultado, y **preparas la visita de 설날**: saludar a los mayores, hacer el 세배, responder sus preguntas, llevar un regalo. Es la evidencia de mitad de curso |
| **Después de esta clase puedo decir…** | 1. 할머니, 새해 복 많이 받으세요! 건강하세요!<br>2. 선생님은 설날에 어디 가세요?<br>3. 한국에서는 설날에 떡국을 먹죠?<br>4. 시간이 없으니까 선물은 과일 세트로 할까요?<br>5. 죄송해요, 다시 한번 말씀해 주시겠어요? |
| Gramática de apoyo · carga: 0 | **Integración, sin estructuras nuevas** (lab): -(으)니까 / -죠 (S1) · -아/어야 해요, -기 때문에, -(으)려고 (S2) · -(으)시-, -ㅂ니다, -아/어도 될까요? (S3) · todo Conversacional 1. **Fórmulas de 설날** (no cuentan): 새해 복 많이 받으세요 · 건강하세요 · 설날 잘 보내세요 · **다시 한번 말씀해 주시겠어요?** (la reparación de Conversacional 1 en versión honorífica: 말하다 → 말씀하시다 + -아/어 주시다 + -겠어요 como bloque). **Reconocer:** el 반말 de los mayores (올해 몇 살이지? · 밥 많이 먹어! · 공부는 잘하고 있어?) al que se responde en 존댓말 |
| Vocabulario (20) | **Núcleo (11):** 새해 · 세배 · 세뱃돈 · 명절 · 연휴 · 댁 · 부모님 · 친척 + ↺ 설날 · 고향 · 선물<br>**Tema (3):** 음력 · 신정 · 귀성길<br>**Fórmulas (4):** 새해 복 많이 받으세요 · 건강하세요 · 다시 한번 말씀해 주시겠어요? · 설날 잘 보내세요<br>**Reconocimiento (2):** 까치설날 · 설 선물 세트 |
| Expresiones | • 새해 복 많이 받으세요! — 그래, 너도 새해 복 많이 받아라. (respuesta del mayor, en 반말: reconocer ⚑)<br>• 설날 잘 보내세요! · 고향에 가세요?<br>• Lab: 잠깐만요, 다시 한번 말씀해 주시겠어요? · 그럼 ___(으)로 할까요? · 좋은 생각이에요! (↺)<br>• Frases clave: 할머니, 새해 복 많이 받으세요! / 선생님은 설날에 어디 가세요? / 다시 한번 말씀해 주시겠어요? |
| Pronunciación | Sin foco nuevo (lab): **2 puntos por alumno** en la planilla → nota de voz en 48 h. Se oyen: 설날 [설랄] (유음화 ↺) · 받으세요 [바드세요] · 세뱃돈 [세배똔] · 말씀 [말씀]. |
| Cultura | Capas: tradicional + contemporánea. **Cápsula "se viene el 설날"** (5'): el 설날 es el 1 del 1.er mes lunar (este año, el domingo 7); **hay dos Años Nuevos:** el 1 de enero (신정: muchos van a ver el primer amanecer, 해돋이) y el 설날, la gran fiesta familiar con feriado largo · el 귀성길 (millones viajan a la casa familiar; tráfico) · **cómo se hace el 세배** (se practica de pie frente a la cámara, sin exigirlo) y qué se dice · **el 반말 de los mayores** en la mesa (preguntas que en Latinoamérica también conocemos: "¿y el trabajo?", "¿y la pareja?") → la S5 lo retoma como 잔소리. **Frase ancla:** 할머니, 새해 복 많이 받으세요! **Puente:** las cábalas del 31 de diciembre, el abrazo de medianoche; en Chile el 설날 cae en pleno verano: **en el barrio Patronato también se celebra** ⚑ (Jay). **Matiz:** no todas las familias hacen 세배 ni 차례; depende de la familia y de la religión. |
| Tarea de speaking central | **Lab 3** (B.10): tríos fijos, **la tarjeta cambia cada 8'** (el profe dice "2번 카드!"): **1 · 학교 인터뷰** (resultado: 3 diferencias y 1 semejanza entre los colegios de los tres, con -죠 y -(으)니까) · **2 · 수능 토론** (resultado: la sala decide "¿un examen o varias pruebas?" con dos razones con -기 때문에) · **3 · 회사 첫날** (resultado: 3 reglas y 2 permisos del nuevo empleado) · **Tarea final (10'): la visita de 설날** — A es 할머니/할아버지 (tarjeta con preguntas en 반말), B y C son los nietos: saludan, hacen el 세배, responden en 존댓말, **deciden el regalo** (설 선물) con un presupuesto de 10만 원 y lo explican: 할머니께서 ___을/를 좋아하시니까 ___(으)로 할까요? **Resultado visible:** cada trío presenta su regalo y su razón en 1' (queda en la grabación). |
| Escucha y lectura | **Lectura:** el calendario del 설 연휴 2027 (una lámina) y una tarjeta de 설날 de juego (original). **Escucha:** las preguntas del "abuelo" en 반말 que trae la tarjeta A, leídas por el profe al abrir el lab. |
| Recurso digital (exacto) | Tarjetas de estación 1–3 + tarjeta final (enlace en el chat) · **guía de estudio S1–S3** (C2_Guia_Estudio_S1-S3, sale con el material de la S3) · planilla de pronunciación · formulario de autoevaluación de mitad · 🔊 clips C y B.14. |
| Hora de clase | 0–5 quiz 3 (S3) · 5–15 스몰토크 · 15–17 instrucciones del lab (lámina con tríos y líderes) · 17–41 **tarjetas 1–3** (8' c/u) · 41–51 **tarea final: la visita de 설날** · 51–56 regalos y razones en plenario · 56–60 cierre: cápsula de 설날 en 3 frases + 3 frases clave + 설날 잘 보내세요! |
| Tarea (prepara la S5) | ≈ 25 min. (1) **Autoevaluación de mitad, 8 min** (formulario; en español se permite): qué puedo, qué me cuesta, qué quiero practicar. (2) **Mensaje de 설날, 7 min:** por WhatsApp, un mensaje de Año Nuevo **a un amigo coreano imaginario o real** (새해 복 많이 받으세요 + 2 deseos + una pregunta con -(으)시- si es mayor). (3) **Prepara la S5, 10 min:** **mira el 설날 de esta semana** en redes, noticias o preguntándole a alguien (fotos, 떡국, trenes llenos) y trae **una foto** y 3 palabras; si tu familia tiene una fiesta parecida, trae una foto de ella. **Destino exacto:** el 스몰토크 y la sala de la S5 ("la fiesta de mi familia"). |
| Entregable del alumno | Autoevaluación · mensaje de 설날 · foto para la S5. |
| Evaluación | **Quiz 3** · **Lab 3 = evidencia de mitad** (2 puntos de pronunciación + participación en las 4 tarjetas + autoevaluación) → **comentario de mitad de 3 líneas** (una fortaleza · un foco · el siguiente paso) hasta el domingo después de la S5 [POR CONFIRMAR: dom 14 feb] · **[regla del certificado: pendiente de decisión de Jay]**. |
| Grupo mixto | Tríos A + B + C con líder rotativo; el heritage hace de 할머니 en la tarea final (sus preguntas en 반말 salen naturales). |

### B.6 Semana 5 · S5 (febrero 2027) · 설날, contado + 추석 como espejo

| Campo | Semana 5 |
|---|---|
| Fecha | **S5 · febrero 2027** · tentativo **mié 10 feb (Chile) = jue 11 feb (Corea) [POR CONFIRMAR]**: la semana del feriado (lun 8 y mar 9 aún eran feriado en Corea); todos vuelven al trabajo |
| Tema | Cuentas cómo fue el 설날 (el del profe, el que viste, el de tu familia en Año Nuevo), reaccionas a las fotos de otros, te ofreces a ayudar en la casa y hablas de lo que quieren los demás. Comparas el 설날 con el 추석 y con una fiesta de tu país: **qué se mantiene y qué cambia hoy** (página pública, semanas 5 y 6, unidas: DECISIÓN DE JAY 4) |
| **Después de esta clase puedo decir…** | 1. 떡국이 정말 맛있어 보이네요!<br>2. 제가 설거지할게요. 할머니는 좀 쉬세요.<br>3. 아이들은 세뱃돈을 받고 싶어 해요.<br>4. 옛날에는 설날에 가족이 다 모였어요. 요즘은 여행 가는 사람도 많아요.<br>5. 설날에는 떡국을 먹고, 추석에는 송편을 먹어요. |
| Gramática de apoyo · carga: 3 | • [1] **-(으)ㄹ게요** ("yo me encargo", "lo hago": te comprometes u ofreces algo **pensando en el otro**): 제가 설거지할게요 · 제가 도와 드릴게요 · 내년에는 꼭 갈게요 · 이따 전화할게요. Forma: 갈게요, 먹을게요, 만들게요 (ㄹ). **Contraste con -(으)ㄹ 거예요** (plan o predicción, neutra): 내일 부산에 갈 거예요 (te informo) / 내일 갈게요 (te lo prometo, te aviso por ti). Solo con "yo" (o "nosotros") y **nunca en pregunta** (갈게요?* ✗: ahí va -(으)ㄹ까요?). Es el -(으)ㄹ게요 que la Fase 1 §4.2 ubicó "en A2.2 (설날)"<br>• [2] **-네요** (reacción en el momento, "¡qué…!", "vaya, …"): 맛있네요 · 사람이 많네요 · 벌써 2월이네요 · 한복이 예뻐 보이네요 (con -아/어 보여요 ↺). **Contraste:** -아요 informa; -네요 muestra que **lo acabas de notar**. No se usa para lo que ya sabías ni, normalmente, para tus propios actos<br>• [3] **-고 싶어 해요** (lo que **otra persona** quiere): 아이들은 세뱃돈을 받고 싶어 해요 · 동생이 한국에 가고 싶어 해요 · 할머니는 손주들을 보고 싶어 하세요 (+ -시- ↺). **Desde el español:** en coreano no se afirma directamente lo que siente o quiere otro con 싶다: se dice "muestra que quiere" (-어 하다, como 좋다 → **좋아하다**, que ya conocen). 띄어쓰기: 가고 싶어 해요 (separado). Era el "modelo en voz de Abby" de Conversacional 1 S1<br>• [fórmula] **제가 도와 드릴게요** (-아/어 드리다 = hacer algo por un mayor: fórmula; sistema en B1) · **명절 잘 보내셨어요?** · **옛날에는… 요즘은…** · **집집마다 / 사람마다 달라요**<br>• [reactiva] -(으)시- y 께서 (할머니께서 떡국을 만드셨어요), -죠, -기 때문에, -아/어야 해요<br>• Ciclo: **R** = monólogo del profe "mi 설날 de este año" con 4 fotos (o, si el profe no lo pasó en Corea, el de un coreano del equipo ⚑) · **C** = reacciones con -네요 a fotos que trajeron los alumnos (misión S4) · ofrecimientos con -(으)ㄹ게요 en una "casa" dibujada (tareas en la cocina) · **G** = visita completa con tarjetas · **L** = "la fiesta de mi familia" sin tarjeta |
| Vocabulario (24) | **Núcleo (12):** 떡국 · 차례 · 조상 · 성묘 · 송편 · 한가위 · 모이다 · 설거지하다 · 잔소리 · 보름달 · 전 + ↺ 추석<br>**Tema (4):** 윷놀이 · 손주 · 차가 막히다 · 한 살 더 먹다<br>**Fórmulas (4):** 명절 잘 보내셨어요? · 제가 도와 드릴게요 · 옛날에는 · 요즘은 · 집집마다 달라요 / 사람마다 달라요<br>**Reconocimiento (4):** 역귀성 · 명절 스트레스 · 차례상 · 떡만둣국 |
| Expresiones | • 명절 잘 보내셨어요? — 네, 잘 보냈어요. 가족들하고 떡국을 먹었어요.<br>• 사진 보여 주세요! — 와, 떡국이 정말 맛있어 보이네요!<br>• 제가 할게요! · 제가 도와 드릴게요. — 괜찮아, 앉아 있어. (respuesta del mayor en 반말: reconocer)<br>• Frases clave: 떡국이 정말 맛있어 보이네요! / 제가 설거지할게요. / 요즘은 설날에 여행 가는 사람도 많아요. |
| Pronunciación | **-네요 siempre nasaliza el 받침:** 맛있네요 [마신네요] · 있네요 [인네요] · 좋네요 [존네요] · 먹네요 [멍네요] · 많네요 [만네요]. **-(으)ㄹ게요 siempre suena [께]:** 할게요 [할께요] · 먹을게요 [머글께요]. 윷놀이 [윤노리] · 떡국 [떡꾹] · 설거지 [설거지]. Se corrige también la entonación de -네요 (sube y baja: sorpresa, no pregunta). |
| Cultura | Capas: tradicional → contemporánea + generacional + regional + diáspora. **No repetir el carrusel de 추석** (qué es, 음력 8월 15일, 한복, 강강술래): se enlaza y se va a **lo que cambia hoy**. (1) **Lo que se mantiene:** 세배, 세뱃돈, 떡국 ("con el 떡국 se suma un año", aunque la edad oficial es la internacional, 만 나이, desde 2023) y 윷놀이. (2) **Lo que cambia:** muchas familias simplifican el 차례 o no lo hacen (religión, distancia, generación) ⚑ hubo en 2022 una guía pública para simplificar la mesa del 차례: confirmar fuente antes de citarla · **역귀성** (los padres viajan a la ciudad de los hijos) · viajar durante el 연휴 en vez de reunirse · quién cocina y quién limpia: más reparto entre hombres y mujeres que antes ⚑ sin cifras · **명절 스트레스 y 잔소리** (las preguntas de los parientes: ¿y el trabajo?, ¿y la pareja?) · las familias de una persona (1인 가구) pasan el 명절 de otra manera. (3) **추석 como espejo** (10'): otra época (otoño, cosecha, luna llena), otra comida (송편 frente a 떡국), otro rito (성묘 y 차례 frente al 세배), la misma lógica (volver a casa, antepasados, 잔소리) y el mismo cambio. (4) **Regional:** el 떡국 varía (con 만두 en muchas familias, sobre todo del norte) ⚑. (5) **Diáspora:** en Santiago o Buenos Aires el 설날 cae en pleno verano ("설날인데 한여름이에요!") ⚑ Jay. **Frase ancla:** 옛날에는 설날에 가족이 다 모였어요. 요즘은 여행 가는 사람도 많아요. **Puente:** Fiestas Patrias (el 18 en Chile, con viaje al campo y tráfico en las carreteras), Navidad y Año Nuevo en familia, "la pregunta incómoda del tío" = 잔소리. **Sin estereotipo:** 집집마다 달라요. |
| Tarea de speaking central | Salas de 3, dos momentos. **(a) 12' · "La visita completa"** (versión larga de la tarea final del Lab 3): llegar (명절 잘 보내셨어요? / 새해 복 많이 받으세요), reaccionar a la comida y a la casa con **-네요**, ofrecerse con **-(으)ㄹ게요**, hablar de lo que quieren los niños o los abuelos con **-고 싶어 해요**, despedirse (건강하세요). Se rotan los roles. **(b) 8' · "La fiesta de mi familia"** (la práctica que la página pública ponía en la semana 6): cada uno presenta su fiesta con la foto de la misión; la sala completa un **cuadro de 3 columnas** (설날 · 추석 · nuestras fiestas) con **2 parecidos y 2 diferencias**. **Resultado:** el cuadro, pegado en el chat. |
| Escucha y lectura | **R:** monólogo del profe (60–90 s) con fotos. **Lectura:** "El 설날 de Minji" (≈ 350 sílabas en 해요체, original: viaje, 세배, 잔소리 de una tía, 윷놀이, regreso con tráfico) con 3 preguntas + enlace al carrusel de 추석 de la casa como repaso previo. |
| Recurso digital (exacto) | Carrusel `Campana_Assets/instagram/octubre/chuseok/` (publicado en Instagram el 25 sept: enlace al post) · tarjetas de la visita · plantilla del cuadro de 3 columnas · 🔊 clips C y B.14. |
| Hora de clase | 0–5 quiz 4 (S4) · 5–15 스몰토크 (B.13) · 15–35 R (monólogo) → C: -네요 con las fotos de los alumnos · -(으)ㄹ게요 en la casa dibujada · -고 싶어 해요 · cápsula de 추석 como espejo · 35–55 salas (a) + (b) · 55–60 cierre. |
| Tarea (prepara la S6) | ≈ 25 min. (1) **Audio de 90 s, 12 min:** compara una fiesta de tu país con el 설날 o el 추석 (옛날에는… 요즘은… · -고 싶어 해요 · 집집마다 달라요). (2) **Escritura, 5 min:** 5–6 frases de la comparación por WhatsApp. (3) **Prepara la S6, 8 min:** elige **una leyenda o cuento de tu país** (La Llorona, el Caleuche, la Pincoya, el Pombero, el Silbón, la Pachamama, el Tunche…), anota **5 palabras clave** y **un personaje**; si no recuerdas ninguna, pregúntale a alguien de tu familia (쉬운 방법!). **Destino exacto:** el cuento en cadena de la S6. **Reto:** 1 minuto de tu leyenda ya en coreano. |
| Entregable del alumno | Audio · 5–6 frases · 5 palabras de la leyenda. |
| Evaluación | **Quiz 4** (Lab 3 + fórmulas de 설날) · comentario de mitad (hasta el domingo) · **[regla del certificado: pendiente de decisión de Jay]**. |
| Grupo mixto | Quien no siguió el 설날 en la semana usa la lectura de Minji como "su" fuente. Reto: una frase con -는데 (se enseña en la S6: solo para quien ya la trae). |

### B.7 Semana 6 · S6 (febrero 2027) · Mitos y leyendas · 옛날 옛적에

| Campo | Semana 6 |
|---|---|
| Fecha | **S6 · febrero 2027** · tentativo **mié 17 feb (Chile) = jue 18 feb (Corea) [POR CONFIRMAR]** (el domingo 21 es 정월대보름) |
| Tema | Narras una historia en pasado con principio, problema y final; describes a los personajes y ordenas los hechos. Conoces un cuento tradicional coreano contado como se cuenta en coreano, reconoces el 한다체 del cuento escrito y cuentas una leyenda de tu país (página pública, semana 4) |
| **Después de esta clase puedo decir…** | 1. 옛날 옛적에 산속에 엄마하고 오누이가 살았어요.<br>2. 엄마가 고개를 넘는데 호랑이가 나타났어요.<br>3. 떡이 하나밖에 안 남았어요.<br>4. 호랑이가 문 앞에 왔을 때 아이들은 나무 위로 도망갔어요.<br>5. 우리 나라에도 비슷한 이야기가 있는데, 제가 한번 이야기해 볼게요. |
| Gramática de apoyo · carga: 2 + ampliación + reconocimiento | • [1] **-는데 / -(으)ㄴ데 / -았/었는데** (el **fondo** y después **lo que pasa**: "iba… y…", "era de noche y…"): 엄마가 고개를 넘는데 호랑이가 나타났어요 · 밤이었는데 누가 문을 두드렸어요 · 아이들이 자고 있었는데… Forma: verbo -는데 (가는데, 먹는데; ㄹ: 사는데), adjetivo -(으)ㄴ데 (추운데, 작은데), pasado -았/었는데, 이다 → 인데. **Desde el español:** es el imperfecto que prepara la escena ("caminaba por el cerro cuando…"); también sirve para **presentar un tema** antes de contarlo (비슷한 이야기가 있는데, 제가…). El uso de contraste ("pero": 비싼데 맛있어요) solo se reconoce: llega en B1.1 (Fase 1 §4.8). En Conversacional 1 fue "reto"<br>• [2] **N밖에 + negación** ("solo", con la idea de "no alcanza"): 떡이 하나밖에 안 남았어요 · 천 원밖에 없어요 · 한 번밖에 못 봤어요. **Siempre con verbo negativo** (하나밖에 있어요* ✗). **Contraste con 만** (positivo, neutro): 하나만 있어요 ≈ 하나밖에 없어요, pero 밖에 lamenta. Venía como fórmula desde Básico 2 (하나밖에 안 남았어요) y la S2 (한 번밖에 없어요)<br>• [ampliación, no cuenta] **-았/었을 때** frente a **-(으)ㄹ 때** (Conversacional 1 S7): 호랑이가 왔을 때 (ya había llegado) / 호랑이가 올 때 (cuando venía, en camino) · 한국에 갔을 때 사진을 많이 찍었어요. Era la fórmula 어렸을 때: ahora es el sistema<br>• [reconocer] **한다체 del cuento escrito:** 살았다 · 나타났다 · 말했다 · 호랑이였다 · 간다 (una tabla: -았/었어요 → -았/었다 · -아요 → -(느)ㄴ다 · 이에요 → 이다) · **와/과** (= 하고, escrito: 엄마와 아이들) · el **반말 del tigre** (떡 하나 주면 안 잡아먹지!) · **-기로 했어요** (곰과 호랑이는 사람이 되기로 했어요: fórmula R)<br>• [fórmulas y conectores] 옛날 옛적에 · 어느 날 · 그런데 · 그래서 · 결국 · 그 후로 · 제가 한번 이야기해 볼게요 (-(으)ㄹ게요 ↺)<br>• Ciclo: **R** = el profe cuenta el cuento con 6 láminas (sin texto) · **C** = cadena de frases con -는데 sobre las láminas y con 밖에 sobre la cesta de 떡 · **G** = cuento en cadena en salas · **L** = la leyenda de cada uno |
| Vocabulario (25) | **Núcleo (11):** 옛날이야기 · 전설 · 호랑이 · 곰 · 나타나다 · 도망가다 · 잡아먹다 · 남다 · 변하다 · 착하다 · 무섭다<br>**Tema (6):** 오누이 · 어느 날 · 결국 · 도깨비 · 구미호 · 고개<br>**Paradigma (1):** 해 · 달<br>**Fórmulas (3):** 옛날 옛적에 · 떡 하나 주면 안 잡아먹지! · 제가 한번 이야기해 볼게요<br>**Reconocimiento (4):** 신화 · 호랑이 담배 피우던 시절에 · 살았다 / 나타났다 / 호랑이였다 · 정월대보름 / 부럼 |
| Expresiones | • 옛날 옛적에… · 호랑이 담배 피우던 시절에… (la fórmula coreana de "había una vez", para reconocer y sonreír)<br>• 그래서 어떻게 됐어요? · 그다음에요? · 무섭네요! (-네요 ↺) · 진짜요? (↺)<br>• Frases clave: 옛날 옛적에 산속에 엄마하고 오누이가 살았어요. / 엄마가 고개를 넘는데 호랑이가 나타났어요. / 떡이 하나밖에 안 남았어요. |
| Pronunciación | 옛날 [옌날] (비음화) · 옛날이야기 [옌날리야기] (se agrega un sonido y se asimila: solo imitar) · 밖에 [바께] · 잡아먹다 [자바먹따] · 남았어요 [나마써요] · **구개음화 otra vez:** 끝이 [끄치] ("이야기의 끝이…"), 같이 [가치] · **한다체 leído:** 살았다 [사랃따], 나타났다 [나타낟따]. Ritmo del cuento: pausa después de cada -는데. |
| Cultura | Capas: tradicional → contemporánea (y regional). **No repetir el blog de Dangún** (osa, tigre, 100 días, ajo y artemisa, 개천절, mascotas olímpicas): se enlaza como "el mito de origen" en 1 minuto y la clase va a **los cuentos populares y a su vida hoy**. (1) **해와 달이 된 오누이** (el cuento que la página pública ya anuncia): el tigre, la cesta de 떡, "떡 하나 주면 안 잡아먹지", los niños que suben al cielo y se vuelven el sol y la luna; se **recuenta con palabras propias** (es un cuento tradicional, sin versión editorial). (2) **El tigre coreano no es solo temible:** en los cuentos es muchas veces torpe o engañado; **호랑이 담배 피우던 시절** es la manera juguetona de decir "hace muchísimo". (3) **도깨비 y 구미호:** de los cuentos a los dramas (enlaza con la S7). (4) **Regional:** Jeju tiene sus propios mitos (la giganta 설문대할망) ⚑ confirmar antes de usarlo. (5) **Calendario:** el domingo 21 es **정월대보름**, la primera luna llena del año: se parten nueces (부럼) y se piden deseos a la luna, **la misma luna del cuento** ⚑. **La lengua lo dice:** los cuentos escritos van en 한다체 y los mayores los cuentan en 반말 a los niños: por eso el 반말 del tigre suena "de cuento". **Frase ancla:** 옛날 옛적에 호랑이 담배 피우던 시절에… **Puente:** La Llorona, el Caleuche, la Pincoya, el Pombero, el Silbón, el Tunche: todas las culturas tienen un ser que asusta a los niños para que vuelvan temprano a casa. |
| Tarea de speaking central | **Cuento en cadena** (página pública): tríos con **6 láminas** de 해와 달이 된 오누이 (ilustraciones propias). Cada uno cuenta 2 láminas con **una frase con -는데** y **una con 밖에 o -았/었을 때** + conectores (어느 날 · 그런데 · 그래서 · 결국); el siguiente sigue. Segunda vuelta al revés, sin mirar la lámina. Después (8'), **cada uno cuenta su leyenda en 1 minuto** (misión S5) y los otros reaccionan (무섭네요! 그래서 어떻게 됐어요?) y hacen una pregunta. **Resultado:** la sala pega en el chat **un resumen de 3 frases** de la leyenda que más le gustó. |
| Escucha y lectura | **R:** el cuento contado por el profe (≈ 2'). **Lectura:** **해와 달이 된 오누이 recontado en 한다체** (≈ 400 sílabas, original de producción, con la tabla de conversión al lado): el **primer 한다체 escrito** del curso. 3 preguntas de orden de hechos (formato TOPIK I). |
| Recurso digital (exacto) | 6 láminas del cuento (propias) · texto en 한다체 + tabla de conversión · blog `/blog/dangun-por-que-corea-nacio-de-una-osa` (lectura previa opcional) · plantilla de 원고지 (reto) · 🔊 clips C y B.14. |
| Hora de clase | 0–5 quiz 5 (S5) · 5–15 스몰토크 · 15–35 R (cuento) → C: -는데 con las láminas · 밖에 con la cesta · -았/었을 때 vs -(으)ㄹ 때 en 2 pares de ejemplos · 한다체: 2 minutos, solo para reconocer · cultura · 35–55 cuento en cadena + leyendas · 55–60 cierre. |
| Tarea (prepara la S7) | ≈ 30 min (la escritura larga del curso). (1) **Audio de 90 s, 10 min:** cuenta tu leyenda con -는데, conectores y un final. (2) **일기 en 한다체, 12 min:** 4–6 frases de tu día o de la clase de hoy, con la tabla (오늘 한국어 수업에서 호랑이 이야기를 들었다. 재미있었다…). **Reto:** en la plantilla de 원고지. (3) **Prepara la S7, 8 min:** elige **un K-drama que te guste** (o una película, un webtoon o un programa coreano si no ves dramas) y anota: de qué trata, el o la protagonista, qué quiere, y **una escena** que te acuerdes. **Destino exacto:** el club del drama de la S7. |
| Entregable del alumno | Audio · 일기 en 한다체 · ficha del drama. |
| Evaluación | **Quiz 5** (S5) · el 일기 se corrige con 3 marcas (terminación, partícula, 띄어쓰기), sin nota aparte · **[regla del certificado: pendiente de decisión de Jay]**. |
| Grupo mixto | El 한다체 es solo para reconocer y para el 일기 guiado: nadie lo tiene que hablar. Heritage: reto de contar la leyenda sin mirar las palabras clave. |

### B.8 Semana 7 · S7 (febrero 2027) · K-drama y la Corea de hoy

| Campo | Semana 7 |
|---|---|
| Fecha | **S7 · febrero 2027** · tentativo **mié 24 feb (Chile) = jue 25 feb (Corea) [POR CONFIRMAR]** |
| Tema | Cuentas de qué trata un drama que te gusta, describes a sus personajes y opinas sobre qué muestra de la Corea actual y qué exagera. Reconoces el momento en que dos personajes dejan el 존댓말 y pasan al 반말, y lo usas en un role play pactado (página pública, semana 7). Eliges el tema de tu proyecto |
| **Después de esta clase puedo decir…** | 1. 이 드라마는 서울에서 혼자 사는 직장인 이야기예요.<br>2. 드라마를 보고 한국 문화를 좋아하게 됐어요.<br>3. 저도 주인공처럼 서울에서 살아 보고 싶어요.<br>4. 우리 말 놓을까요? — 좋아, 말 놓자!<br>5. 드라마는 재미있지만 현실하고 좀 다른 것 같아요. |
| Gramática de apoyo · carga: 3 | • [1] **반말 básico (해체) en producción, con pacto:** la regla general es **"quita el 요"** (가요 → 가 · 먹었어요 → 먹었어 · 갈 거예요 → 갈 거야 · 할게요 → 할게 · 갈까요? → 갈까?) y tres cambios: **이에요/예요 → 이야/야** (학생이야, 친구야) · **저/제 → 나/내** (내가, 내 친구) · **네/아니요 → 응/아니**; 너 / 네가 [니가] con cuidado (se usa poco: se prefiere el nombre). Fórmula para proponer: **-자** (가자! 먹자! 말 놓자!). **Cuándo sí:** con amigos de la misma edad (동갑) o menores **después de acordarlo** (말 놓을까요? · 말 놔도 돼요? ↺ Conversacional 1); **cuándo no:** con la profe, un jefe, un desconocido o un mayor. En clase, solo en el role play pactado<br>• [2] **N처럼** ("como"): 주인공처럼 · 드라마처럼 · 한국 사람처럼 (↺ fórmula de Básico 2). Reconocer **N 같은 N** (드라마 같은 이야기). Ya estaba en los decks de julio y la Fase 4 la pasó a A2.2<br>• [3] **-게 되다** ("terminé…", "llegué a…": un cambio que no fue un plan, o que decidieron las circunstancias): 드라마를 보고 한국 문화를 좋아하게 됐어요 · 한국 친구를 알게 됐어요 · 서울에서 일하게 됐어요. **Desde el español:** "terminé enganchado", "resultó que me fui a vivir…". Es la pregunta clave del proyecto: ¿cómo llegaste a interesarte en esto?<br>• [fórmula] **-다고 생각해요** (opinión, solo con adjetivos, 있다 y 없다 en presente: 재미있다고 생각해요 · 현실하고 다르다고 생각해요): es la forma del 한다체 de la S6 + 고 생각해요, y la semilla del discurso indirecto de B1.1 · 꼭 보세요! · 우리 말 놓을까요?<br>• [reactiva] -고 싶어 해요 (주인공은 가수가 되고 싶어 해요), -는데 (제일 좋은 장면은… -는데…), 것 같아요, 제일 · N 중에서<br>• Ciclo: **R** = escena de 30 s de un tráiler **oficial** (enlace) + un diálogo original en que dos personajes pasan al 반말 · **C** = "quita el 요" en cadena sobre frases del alumno · **G** = club del drama con receta · **L** = role play del paso al 반말 y preguntas libres del club |
| Vocabulario (24) | **Núcleo (10):** 주인공 · 배우 · 장면 · 결말 · 현실 · 추천하다 · 감동적이다 · 취업 · 동갑 · 말을 놓다<br>**Paradigmas (2):** 나 · 너 · 응 · 아니<br>**Tema (7):** 사극 · 웹툰 · 1인 가구 · 혼밥 · 재벌 · 치맥 · 과장하다<br>**Fórmulas (3):** 꼭 보세요! · 재미있다고 생각해요 · 우리 말 놓을까요?<br>**Reconocimiento (2):** 오빠 · 언니 (fuera de la familia) · 드라마 같은 이야기 |
| Expresiones | • 요즘 무슨 드라마 봐요? — ___ 봐요. 진짜 재미있어요. 꼭 보세요!<br>• 이 드라마는 ___ 이야기예요. 주인공은 ___고 싶어 해요.<br>• 우리 동갑이죠? 말 놓을까요? — 좋아, 말 놓자! (y desde ahí: 뭐 해? 밥 먹었어?)<br>• Frases clave: 드라마를 보고 한국 문화를 좋아하게 됐어요. / 저도 주인공처럼 서울에서 살아 보고 싶어요. / 우리 말 놓을까요? — 좋아, 말 놓자! |
| Pronunciación | **La misma forma, otra entonación** (clave del 반말): 가? ↗ (pregunta) / 가. ↘ (afirmación) / 가! → (orden o ánimo); 뭐 해? ↗ / 뭐 해! (reproche). ㅎ que se cae: 놓을까요 [노을까요] · 좋아 [조아] · 괜찮아 [괜차나]. 1인 [이린] · 결말 [결말] · 네가 [니가] (así se dice para distinguirlo de 내가). |
| Cultura | Capas: contemporánea + generacional. (1) **Lo real en los dramas:** el 취업 (buscar trabajo), vivir solo (1인 가구, hoy uno de los tipos de hogar más comunes en Corea ⚑ cifra solo con fuente oficial), 혼밥, el 치맥 del viernes, la vida de oficina (enlaza con la S3), el 수능 (S2), el 설날 (S5), el 구미호 y el 도깨비 (S6). (2) **Lo exagerado:** los herederos de 재벌, las casualidades, los triángulos amorosos: "no todos los coreanos son herederos". (3) **La lengua lo dice:** el paso al 반말 es un momento de trama (se vuelven cercanos); 오빠 y 언니 fuera de la familia (lo que dicen las mujeres a un amigo o amiga mayor); el trato entre 선배 y 후배 que ya vieron en la S1. (4) **Industria:** sin cifras ni rankings; los dramas se ven en plataformas oficiales (enlazar solo tráileres oficiales). **Frase ancla:** 드라마는 재미있지만 현실하고 좀 다른 것 같아요. **Puente:** la telenovela latinoamericana (la heredera, la amnesia, el triángulo: "la amnesia es universal"); qué exagera una serie de tu país sobre tu país. **Sin estereotipo:** un drama no es Corea; 사람마다 달라요 también en la pantalla. |
| Tarea de speaking central | **"Club del drama"** (página pública), salas de 3. Cada uno **recomienda su drama en 60–90 s** con una receta: 이 드라마는 ___ 이야기예요 → 주인공은 ___고 싶어 해요 → 제일 좋은 장면 (…-는데…) → 현실하고 비슷한 점 / 다른 점 (것 같아요 · -다고 생각해요) → 저는 이 드라마를 보고 ___게 됐어요 → 꼭 보세요! Los otros dos hacen **2 preguntas**. Después (5'), **role play "el momento del 반말"** en pares: dos compañeros de trabajo de la misma edad que se tratan de 존댓말 descubren que son 동갑, **pactan** (말 놓을까요?) y siguen 1 minuto en 반말. **Resultado:** la sala elige **un drama para recomendar al grupo** y lo dice en plenario con 처럼 o -게 되다. |
| Escucha y lectura | **R:** tráiler oficial (≤ 30 s, enlace) + **diálogo original** de 8 líneas en que dos personajes pasan al 반말 (grabado por el profe y un colega, o SunHi como respaldo). **Lectura:** **reseña de drama de 3–4 frases en 한다체** (original: 이 드라마는 재미있다. 주인공은…) con la tabla de la S6. |
| Recurso digital (exacto) | Enlaces a tráileres **oficiales** elegidos por producción (⚑ verificar que sigan públicos la semana de la clase) · diálogo del 반말 · tarjeta del club con la receta · **consigna del proyecto** (F.1) y lista de temas · 🔊 clips C y B.14. |
| Hora de clase | 0–5 quiz 6 (S6) · 5–15 스몰토크 · 15–35 R → C: 반말 ("quita el 요" + 3 cambios, 7') · 처럼 (3') · -게 되다 (4') · cultura (4') · consigna del proyecto (2') · 35–55 club del drama + role play · 55–60 cierre: cada uno dice su tema de proyecto en una frase (제 주제는 ___예요) + 3 frases clave. |
| Tarea (prepara la S8) | ≈ 30 min. (1) **Guion del proyecto, 15 min:** **8–10 frases** con el esqueleto de F.1, enviadas por WhatsApp **hasta el sábado [POR CONFIRMAR: sáb 27 feb, 22:00 Chile]** para la corrección del profe (3 marcas por frase como máximo). (2) **Tarjeta de palabras clave, 5 min:** máximo 8 palabras, ninguna frase. (3) **3 preguntas, 5 min:** para hacerle a un compañero sobre su tema (se reparten en la S8). (4) **Opcional, 5 min:** la reseña de tu drama en 3–4 frases en 한다체. |
| Entregable del alumno | Guion · tarjeta · 3 preguntas · (reseña). |
| Evaluación | **Quiz 6** (S6) · guion corregido (no puntúa aparte: prepara el proyecto) · **[regla del certificado: pendiente de decisión de Jay]**. |
| Grupo mixto | Quien no ve dramas recomienda una película, un webtoon o un programa. El fan "experto" en 반말: reto de explicar en coreano **cuándo no** usarlo. |

### B.9 Semana 8 · S8 (marzo 2027) · Lab 4 + proyecto final

| Campo | Semana 8 |
|---|---|
| Fecha | **S8 · marzo 2027** · tentativo **mié 3 mar (Chile) = jue 4 mar (Corea) [POR CONFIRMAR]** (en Corea empezó el año escolar el martes 2) |
| Tema | **Laboratorio 4 + proyecto final "Corea por dentro, contada por ti":** tu mini-pódcast ya está enviado; en clase conversas sobre tu tema a partir de las preguntas del grupo y del profe, y cierras el curso |
| **Después de esta clase puedo decir…** | 1. 제 발표 주제는 한국의 회식 문화예요.<br>2. 옛날에는 회식이 밤늦게까지 있었는데, 요즘은 점심에 회식을 하는 회사도 있어요.<br>3. 제 생각에는 좋은 점도 있고 안 좋은 점도 있는 것 같아요.<br>4. 좋은 질문이네요! 음… 제 생각에는…<br>5. 그동안 감사했습니다. 다음 단계에서도 열심히 할게요! |
| Gramática de apoyo · carga: 0 | Integración: **1** explicar y comparar (-(으)니까, -기 때문에, -(으)려고, 옛날에는… 요즘은…, 처럼, -죠) · **2** contar (-는데, -았/었을 때, 밖에, -게 되다) · **3** hablar con respeto y reaccionar (-(으)시-, -ㅂ니다, -(으)ㄹ게요, -네요, -고 싶어 해요) · **4** opinar (것 같아요, -다고 생각해요). **Nada se ve por primera vez hoy.** |
| Vocabulario (16) | **Núcleo (9):** 주제 · 설명하다 · 비교하다 · 의견 · 질문 · 경험 · 변화 · 사회 + ↺ 대답하다<br>**Paradigma (1):** 장점 · 단점<br>**Tema (2):** 팟캐스트 · 청취자<br>**Fórmulas (3):** 좋은 질문이네요! · 그동안 감사했습니다 · 다음 단계에서도 열심히 할게요<br>**Reconocimiento (1):** 개학 |
| Expresiones | • 좋은 질문이네요! · 음… 잠깐만요, 생각해 볼게요. · 다시 한번 말씀해 주시겠어요? (↺ S4)<br>• ___ 씨는 어떻게 생각해요? · 칠레에서는 어때요?<br>• 축하해요! · 모두 수고했어요! (el profe) — 선생님, 그동안 감사했습니다! (el grupo)<br>• Frases clave: 제 생각에는 좋은 점도 있고 안 좋은 점도 있는 것 같아요. / 좋은 질문이네요! / 그동안 감사했습니다. |
| Pronunciación | Sin foco nuevo: se evalúa (F.6). 장점 [장쩜] · 단점 [단쩜] · 좋은 질문이네요 [조은 질무니네요] · 감사했습니다 [감사핻씀니다]. |
| Cultura | **개학:** el martes 2 empezó el año escolar coreano (y el de muchos colegios del cono sur esta misma semana): cierre en espiral con la S1. **Cierre de la marca:** "la mejor forma de entender Corea por dentro es explicarla en coreano, con tus palabras" (página pública). Uso cultural que se comenta: 감사했습니다 al profe (no 수고하셨습니다, Fase 1 §10.2). **Frase ancla:** 제 생각에는 좋은 점도 있고 안 좋은 점도 있는 것 같아요. |
| Tarea de speaking central | **Lab 4 "preguntas cruzadas"** (12', tríos del proyecto; calentamiento, no puntúa): cada uno dice su tema en 3 frases y los otros le hacen las preguntas que prepararon (misión S7) → **proyecto en vivo** (F.5): el profe entra a cada trío (**7' por trío**), escucha a cada alumno resumir su pódcast en 30 s y le hace **1 pregunta**; un compañero le hace **otra**; el alumno **hace una pregunta** a otro → **ronda final**: cada uno dice en una frase qué entendió de Corea en el curso y su meta. |
| Escucha y lectura | Los pódcasts del grupo (el profe los escucha antes; los alumnos pueden escuchar 2 de sus compañeros después, si todos lo autorizan: DECISIÓN DE JAY 12). |
| Recurso digital (exacto) | Carpeta del curso con los pódcasts · planilla de la rúbrica · tarjetas de preguntas de reserva (por si un trío se queda sin preguntas) · formulario de autoevaluación final y encuesta · 🔊 clips C y B.14. |
| Hora de clase | 0–2 entrada (tríos preparados) · 2–14 **Lab 4** · 14–16 el profe publica el orden · 16–51 **5 tríos × 7'** (los tríos que esperan siguen con las tarjetas de reserva; los que terminan, también) · 51–58 ronda final en plenario (queda en la grabación) · 58–60 축하해요 · 감사했습니다. **Sin quiz.** |
| Tarea (antes y después) | **Antes de la clase:** (1) **pódcast de 3 minutos** hasta el **lunes anterior [POR CONFIRMAR: lun 1 mar, 22:00 Chile = mar 2 mar, 10:00 Corea]**, sin leer, con la tarjeta de palabras clave; (2) repasar las 3 preguntas. **Después:** autoevaluación final y encuesta (hasta el viernes [POR CONFIRMAR: vie 5 mar]). |
| Entregable del alumno | Pódcast · participación en vivo · autoevaluación y encuesta. |
| Evaluación | **Proyecto final** con la rúbrica de F.6 · el "antes" (audio de la S1) y el pódcast se comparan en el informe · quien falte hace la parte en vivo en una cita de 10' por Zoom esa semana · informe individual y certificado **[regla del certificado: pendiente de decisión de Jay]**. |
| Grupo mixto | Tríos A + B + C; nadie presenta en vivo sin haber enviado antes el pódcast (si no lo envió, en vivo hace el resumen de 1 minuto con la tarjeta y el pódcast entra como reposición). |


### B.10 Los dos laboratorios (S4 y S8), definidos como tales

Un laboratorio de Conversacional 2 es, como en Conversacional 1 (Fase 4 B.10), una clase **sin estructura nueva**, en la que los bloques 3 y 4 se funden en **40 minutos de práctica oral continua** en salas pequeñas, con **tarjetas que obligan a un resultado**, un **líder de sala** que reparte turnos y el profe rotando para escuchar y **corregir pronunciación uno a uno**. Son **dos de ocho sesiones** (la numeración sigue la de Conversacional 1: Lab 1 y Lab 2 fueron allá).

| | **Lab 3 · S4 · formativo y de mitad** | **Lab 4 · S8 · integrador, con el proyecto** |
|---|---|---|
| Integra | S1–S3 (escuela, 수능, oficina) + la visita de 설날 | Todo el curso, a través del tema de cada uno |
| Formato | **Tríos fijos**; la tarjeta cambia cada 8' (no se mueve a 15 personas entre salas) + tarea final de 10' | 12' de "preguntas cruzadas" en los tríos del proyecto + 35' de proyecto en vivo (el profe visita 5 tríos × 7') |
| Tarjetas | **1 · 학교 인터뷰** · **2 · 수능 토론** · **3 · 회사 첫날** · **Final: la visita de 설날** con regalo (10만 원) | Las 3 preguntas que preparó cada alumno + tarjetas de reserva (una por tema del curso) |
| Corrección | 2 puntos de pronunciación por alumno (planilla) → nota de voz en 48 h | Rúbrica de F.6 |
| Resultado visible | Cada trío presenta su regalo de 설날 y su razón en 1' (queda en la grabación) | La ronda final y el informe individual |
| Reparación | **Se exige**, en versión honorífica: cada tarjeta trae la franja "잠깐만요 · 다시 한번 말씀해 주시겠어요? · ___이/가 무슨 뜻이에요?" | Se evalúa dentro de "Comprensión e interacción" |
| Reciclaje de vocabulario (V4 de la Fase 1) | Cada tarjeta pide **2 palabras de Conversacional 1** (marcadas en la tarjeta: 목표, 경험 ↺, 예약하다, 계속하다, 긴장되다…) | La tarjeta de palabras clave del proyecto puede incluir 2 palabras de Conversacional 1 |

### B.11 Carga cognitiva y continuidad

| S | Estructuras nuevas (cuentan; tope 3) | No cuentan (fórmula · reconocimiento · ampliación · reactivación) | Recicla |
|---|---|---|---|
| 1 | 2 (-(으)니까 · -죠) | 반말 (R) · N 때 (F) · -(으)ㄴ 적이 있어요 (R) | Todo Conversacional 1 en el diagnóstico · -(으)ㄹ까요? con -(으)니까 · -(으)ㄴ 후에 · -(으)ㄴ/는 + N |
| 2 | 3 (-아/어야 해요 · -기 때문에 / N 때문에 · -(으)려고) | 한 번밖에 없어요 (F) · -(으)려고 해요 (ampliación) · fórmulas de debate · 수시/정시 (R) | -아서 y -(으)니까 (mapa de las razones) · -(으)러 (contraste) · 것 같아요 · -죠 (그럴 수도 있죠) |
| 3 | 3 (-(으)시- · -ㅂ니다 · -아/어도 돼요? / -(으)면 안 돼요) | 께서/께, -지 않아도 돼요 (R) · N(이)라서, 처음 뵙겠습니다… (F) | -(으)세요 (Conv1 S4) · 드세요, 몇 분이세요? (Conv1 R/F) · -(으)면 (Conv1 S7) · -(으)ㄹ까요? (될까요?) · -아/어야 해요 (S2) |
| 4 | 0 | Fórmulas de 설날 · 말씀해 주시겠어요? · 반말 de los mayores (R) | S1–S3 completas |
| 5 | 3 (-(으)ㄹ게요 · -네요 · -고 싶어 해요) | 제가 도와 드릴게요 (F) · 옛날에는… 요즘은… (F) · 명절 스트레스, 역귀성 (R) | -(으)시- (S3) · -아/어 보여요 (Conv1 S6 → 보이네요) · -고 싶어요 (Conv1 S1) · -(으)ㄹ 거예요 (contraste) · 마다 |
| 6 | 2 (-는데 · N밖에 + negación) | **-았/었을 때 (ampliación de -(으)ㄹ 때)** · 한다체, 와/과, 반말 del tigre, -기로 했어요 (R) · conectores (léxico) | -(으)ㄹ 때 y 어렸을 때 (Conv1 S7) · -(으)ㄹ게요 (S5: 제가 한번 이야기해 볼게요) · -네요 (무섭네요) |
| 7 | 3 (반말 básico · N처럼 · -게 되다) | -다고 생각해요 (F) · N 같은 N, 오빠/언니 (R) | -고 싶어 해요 (S5) · -는데 (S6) · 한다체 (S6 → -다고 생각해요) · 말 놔도 돼요? (Conv1 R) · 것 같아요 · 제일 |
| 8 | 0 | Integración | Todo el curso |

Criterio de conteo (Fase 1 §4.1): cuenta lo que se explica y se practica para producirlo; un paradigma o un par (-아/어도 돼요? / -(으)면 안 돼요) cuenta una vez; **una ampliación de una forma ya enseñada no cuenta** (como el "(으)로 ampliado" de Conversacional 1 S3), pero se marca. **Las semanas 2, 3, 5 y 7 están al tope:** sus misiones piden **una** producción larga (el audio) y lo demás es corto. La S3 es la más densa en forma (dos registros nuevos en una hora): por eso el -ㅂ니다 se limita a la presentación y a un informe de 3 frases, y el resto de la clase es 해요체 con -(으)시-.

**Continuidad: nada se usa antes de enseñarse.**

| Pieza | Se enseña | Se usa antes como… | Se recicla en |
|---|---|---|---|
| -(으)니까 | S1 | (nota de Conv1 S2: "ahí va -(으)니까") | S2 (mapa) · S4 (regalo) · S8 |
| -아/어야 해요 | S2 | R en Conv1 S3 (예약해야 해요) | S3 (내일은 ___아/어야 해요) · S5 · S8 |
| -(으)시- | S3 | 여기 앉으세요, 맛있게 드세요, 몇 분이세요? (Conv1, fórmulas) · consignas del profe | S4 (할머니, 어디 가세요?) · S5 (하세요, 드셨어요) · S8 |
| -ㅂ니다 | S3 | 반갑습니다, 감사합니다, 먼저 들어가 보겠습니다 (fórmulas de Básico 2) | S8 (그동안 감사했습니다) |
| -(으)ㄹ게요 | S5 | 알았어요, 할게요 de oído (fans) | S6 (이야기해 볼게요) · S7 (반말: 말 놓을게) · S8 (열심히 할게요) |
| -네요 | S5 | — | S6 (무섭네요) · S8 (좋은 질문이네요) |
| 밖에 | S6 | Fórmula en Básico 2 (하나밖에 안 남았어요) y S2 (한 번밖에 없어요) | S8 |
| -는데 | S6 | Reto en Conv1 | S7 (el mejor momento del drama) · S8 (옛날에는… -는데, 요즘은…) |
| 한다체 | S6 (R) | — | S7 (reseña, -다고 생각해요) · B1 |
| 반말 | S7 (producción) | R en Conv1 S1 y en S1, S4, S5, S6 de este curso | S8 (solo si se pregunta cómo se habla entre amigos) |
| 드리다 | Fórmula (S5) | 부탁드려요 / 부탁드립니다 | B1 (sistema -아/어 드리다) |
| -다고 생각해요 | Fórmula (S7) | — | S8 · B1.1 (discurso indirecto) |

**Continuidad con Conversacional 1 (qué se recicla y dónde).**

| De Conversacional 1 | Semana de origen | Dónde vuelve en Conversacional 2 | Cómo |
|---|---|---|---|
| -아/어 봤어요 | S2 | S1 (diagnóstico) · S7 (살아 보고 싶어요) | Reactivación |
| N 중에서 제일 · 제일 좋아하는 N | S2 | S1 (tarjeta) · S7 (드라마 중에서 제일…) | Reactivación |
| -아서 (causa, secuencia) | S2–S3 | S1 (contraste con -(으)니까) · S2 (mapa de las 3 razones) | Se ordena |
| -(으)ㄹ까요? | S3 | S1 (…으니까 같이 공부할까요?) · S3 (퇴근해도 될까요?) · S7 (말 놓을까요?) | Se combina |
| -(으)러 | S3 | S2 (contraste con -(으)려고) | Se contrasta |
| -(으)세요 → -아/어 주세요 → -지 마세요 | S4 | S3 (de la petición al honorífico del sujeto) · S4 (말씀해 주시겠어요?) | Se sistematiza |
| 맛있게 드세요 · 몇 분이세요? (R/F) | S4 | S3 (드시다, -이세요) | De fórmula a sistema |
| Reparación y 맞장구 | S5 | S2 (debate) · S4 (versión honorífica) · S5 (-네요 como reacción nueva) | Se amplía |
| -아/어 보여요 · -(으)ㄴ/는 것 같아요 · mapa de modificadores | S6 | S1 (학원에 가는 학생) · S2 (debate) · S5 (맛있어 보이네요) · S7 · S8 | Reactivación |
| -(으)ㄹ 때 · 어렸을 때 · -기 전에 / -(으)ㄴ 후에 · -(으)면 | S7 | S1 (학교가 끝난 후에) · S3 (-(으)면 안 돼요) · S6 (-았/었을 때) | Se amplía |
| -고 싶어요 · -고 싶어 해요 (voz de Abby) | S1 | S5 (-고 싶어 해요 como estructura) | Se completa |
| 존댓말 / 반말 · 말 놔도 돼요? · 말씀 편하게 하세요 (R) | S1 | S1 (선배/후배) · S4–S5 (mayores) · S7 (producción pactada) | Se ordena |
| 수능 대박! · 시험 잘 보세요 (R) | S6 | S2 | Contexto completo |
| 사람마다 달라요 · 것 같아요 (anti-estereotipo) | S6 | Todas: + 집집마다, 회사마다, 지역마다; 옛날에는… 요즘은… | Se amplía |
| N + (이)라서 (R) | S2, S6 | S3 (신입이라서 긴장돼요, fórmula) | De R a fórmula |
| Vocabulario: 목표, 준비하다, 긴장되다, 전통, 문화, 계속하다, 평가, 발표, 한복 | S1–S8 | S2 (준비하다, 긴장되다: N↺), S4 (한복 en el 세배), labs (2 palabras de Conv1 por tarjeta) | Reciclaje explícito |
| ⚑ Abierto en Conversacional 1: **잘 못해요 / 못 해요** (Fase 4, D-13) | S7 | Si aparece (저는 운전을 잘 못해요), se sigue la decisión que Jay tome para Conv1 | Coherencia |

### B.12 Preparación hacia el tramo B1 (lo que este curso deja listo)

La Fase 1 dice que falta un peldaño entre A2.2 y TOPIK II (§0, §4.8, §15 #1). Conversacional 2 no lo reemplaza: **deja puestas las semillas** para que el tramo Intermedio B1 (nombre y fecha: DECISIÓN DE JAY 8 de la Fase 1) empiece donde este termina.

| Semilla en Conversacional 2 | Semana | Lo que se construye en B1 | Por qué importa para TOPIK II |
|---|---|---|---|
| -(으)니까 frente a -아서 | S1 | -(으)니까 de descubrimiento (가 보니까…) | TOPIK II S1 lo da por sabido (Fase 1 §2.2) |
| Mapa de las 3 razones + -기 때문에 · -(으)려고 | S2 | -기 위해서 · -도록 · -(으)ㄹ 수밖에 없다 | Conectores del 53–54 |
| -(으)시- · -ㅂ니다 · 께서 | S3 | Honoríficos completos (여쭙다, 뵙다, 모시다, -아/어 드리다) | Registro de 듣기 y 읽기 |
| -네요 · -죠 · -(으)ㄹ게요 | S1, S5 | -더라고요 · -거든요 · -잖아요 | Comprensión de diálogos de 듣기 |
| -는데 (fondo) | S6 | -는데 de contraste y para presentar tema | Lectura de textos conectados |
| 밖에 + negación | S6 | -(으)ㄹ 수밖에 없다 | Ítems de gramática en contexto |
| **한다체 de reconocimiento + 일기 guiado** | S6–S7 | **한다체 en producción** (párrafos de 200–300 caracteres) | El 52–54 se escribe en 한다체: era el error nº 1 de TOPIK II (Fase 1 §8.1) |
| -다고 생각해요 (fórmula) | S7 | Discurso indirecto -다고 / -냐고 / -자고 / -(으)라고 | Base del 54 (citar posturas) |
| -게 되다 | S7 | -아/어지다 (cambio de estado) | Vocabulario de gráficos del 53 (늘어나게 되다 · 증가하다) |
| 반말 básico pactado | S7 | 반말 fluido | 듣기 con diálogos informales |
| 장점 · 단점 · 변화 · 사회 · 의견 · 경험 | S8 | Vocabulario de opinión | Temas de 읽기 y del 54 |
| 원고지, primer contacto (reto) | S6 | 원고지 regular | 53–54 |
| Textos de 300–600 sílabas | Todo | 600–1.000 sílabas | 읽기 1–50 |
| 500–650 palabras activas | Todo | Hacia ~3.000 pasivas ⚑ | Vocabulario TOPIK II |

### B.13 La pregunta del día del 스몰토크 (10' en pares, sin corrección)

Cada tarjeta = **la pregunta del día + una de semanas anteriores** (espiral, como en Conversacional 1). Quien responde no mira el cuaderno; ambos devuelven la pregunta (___ 씨는요?).

| S | Pregunta del día | + una anterior |
|---|---|---|
| 1 | — (la clase abre con la ronda de reencuentro) | — |
| 2 | 인생에서 제일 긴장된 시험이 뭐였어요? (misión S1) | 학교 다닐 때 무슨 과목을 제일 좋아했어요? |
| 3 | 요즘 일이나 공부 때문에 바빠요? 보통 몇 시에 퇴근해요? | 한국어 시험을 보고 싶어요? 왜요? |
| 4 | 새해 목표가 뭐예요? 벌써 시작했어요? | 우리 나라에서는 회사에서 윗사람을 어떻게 불러요? |
| 5 | 새해에 가족하고 보통 뭐 해요? (con la foto de la misión S4) | 설날에 한국에 있으면 뭐 하고 싶어요? |
| 6 | 어렸을 때 무슨 이야기를 좋아했어요? | 우리 나라에서 제일 큰 명절이 뭐예요? |
| 7 | 요즘 무슨 드라마나 영화를 봐요? | 무서운 이야기 좋아해요? 왜요? |
| 8 | — (el Lab 4 reemplaza el 스몰토크) | — |

### B.14 Las 3 frases clave (Audioteca A2 · 24 frases)

El profe las dice **en coro con el grupo** al cierre de cada clase (en la sala principal, así quedan en la grabación). El clip de 20 segundos se recorta de la grabación de Zoom (lo hace la persona de producción que Jay designe; el profe no graba ni edita: Fase 1 §14.4). Nombre: `C2_S0N_frases_clave.mp3`. Además, **cada frase ya tiene su clip SunHi** (generados el 28 sept; los enlaces 🔊 están comprobados: el archivo existe y el nombre es el hex del UTF-8 del texto sin el punto o el "!" final). **⚑ N-1: esos clips todavía no están en git**; hasta el push a `main`, los 🔊 dan 404 en el sitio. La frase 3 de la S7 tiene dos clips (pregunta y respuesta).

| S | Frase 1 | Frase 2 | Frase 3 |
|---|---|---|---|
| 1 | 고등학교 때 저는 교복을 입고 학교에 다녔어요. [🔊](https://www.academiaseul.com/audio/kr/eab3a0eb93b1ed9599eab59020eb958c20eca080eb8a9420eab590ebb3b5ec9d8420ec9e85eab3a020ed9599eab590ec979020eb8ba4eb8594ec96b4ec9a94.mp3) | 학교가 끝난 후에 학원에 가는 학생이 많죠? [🔊](https://www.academiaseul.com/audio/kr/ed9599eab590eab08020eb819deb829c20ed9b84ec979020ed9599ec9b90ec979020eab080eb8a9420ed9599ec839dec9db420eba78eeca3a03f.mp3) | 내일 시험이 있으니까 오늘은 같이 공부할까요? [🔊](https://www.academiaseul.com/audio/kr/eb82b4ec9dbc20ec8b9ced9798ec9db420ec9e88ec9cbceb8b88eab98c20ec98a4eb8a98ec9d8020eab099ec9db420eab3b5ebb680ed95a0eab98cec9a943f.mp3) |
| 2 | 좋은 대학교에 가려고 밤늦게까지 공부하는 학생이 많아요. [🔊](https://www.academiaseul.com/audio/kr/eca28bec9d8020eb8c80ed9599eab590ec979020eab080eba0a4eab3a020ebb0a4eb8aa6eab28ceab98ceca78020eab3b5ebb680ed9598eb8a9420ed9599ec839dec9db420eba78eec9584ec9a94.mp3) | 수능은 일 년에 한 번밖에 없기 때문에 스트레스를 많이 받아요. [🔊](https://www.academiaseul.com/audio/kr/ec8898eb8aa5ec9d8020ec9dbc20eb8584ec979020ed959c20ebb288ebb096ec979020ec9786eab8b020eb958cebacb8ec979020ec8aa4ed8ab8eba088ec8aa4eba5bc20eba78eec9db420ebb09bec9584ec9a94.mp3) | 수능 날에는 아침 일찍 시험장에 가야 해요. [🔊](https://www.academiaseul.com/audio/kr/ec8898eb8aa520eb82a0ec9790eb8a9420ec9584ecb9a820ec9dbcecb08d20ec8b9ced9798ec9ea5ec979020eab080ec95bc20ed95b4ec9a94.mp3) |
| 3 | 처음 뵙겠습니다. 잘 부탁드립니다. [🔊](https://www.academiaseul.com/audio/kr/ecb298ec9d8c20ebb599eab2a0ec8ab5eb8b88eb8ba42e20ec9e9820ebb680ed8381eb939ceba6bdeb8b88eb8ba4.mp3) | 부장님은 지금 회의실에 계세요. [🔊](https://www.academiaseul.com/audio/kr/ebb680ec9ea5eb8b98ec9d8020eca780eab88820ed9a8cec9d98ec8ba4ec979020eab384ec84b8ec9a94.mp3) | 부장님, 오늘 먼저 퇴근해도 될까요? [🔊](https://www.academiaseul.com/audio/kr/ebb680ec9ea5eb8b982c20ec98a4eb8a9820eba8bceca08020ed87b4eab7bced95b4eb8f8420eb90a0eab98cec9a943f.mp3) |
| 4 | 할머니, 새해 복 많이 받으세요! [🔊](https://www.academiaseul.com/audio/kr/ed95a0eba8b8eb8b882c20ec8388ed95b420ebb3b520eba78eec9db420ebb09bec9cbcec84b8ec9a94.mp3) | 선생님은 설날에 어디 가세요? [🔊](https://www.academiaseul.com/audio/kr/ec84a0ec839deb8b98ec9d8020ec84a4eb82a0ec979020ec96b4eb949420eab080ec84b8ec9a943f.mp3) | 다시 한번 말씀해 주시겠어요? [🔊](https://www.academiaseul.com/audio/kr/eb8ba4ec8b9c20ed959cebb28820eba790ec9480ed95b420eca3bcec8b9ceab2a0ec96b4ec9a943f.mp3) |
| 5 | 떡국이 정말 맛있어 보이네요! [🔊](https://www.academiaseul.com/audio/kr/eb96a1eab5adec9db420eca095eba79020eba79bec9e88ec96b420ebb3b4ec9db4eb84a4ec9a94.mp3) | 제가 설거지할게요. [🔊](https://www.academiaseul.com/audio/kr/eca09ceab08020ec84a4eab1b0eca780ed95a0eab28cec9a94.mp3) | 요즘은 설날에 여행 가는 사람도 많아요. [🔊](https://www.academiaseul.com/audio/kr/ec9a94eca698ec9d8020ec84a4eb82a0ec979020ec97aced968920eab080eb8a9420ec82aceb9e8ceb8f8420eba78eec9584ec9a94.mp3) |
| 6 | 옛날 옛적에 산속에 엄마하고 오누이가 살았어요. [🔊](https://www.academiaseul.com/audio/kr/ec989beb82a020ec989beca081ec979020ec82b0ec868dec979020ec9784eba788ed9598eab3a020ec98a4eb8884ec9db4eab08020ec82b4ec9598ec96b4ec9a94.mp3) | 엄마가 고개를 넘는데 호랑이가 나타났어요. [🔊](https://www.academiaseul.com/audio/kr/ec9784eba788eab08020eab3a0eab09ceba5bc20eb8498eb8a94eb8db020ed98b8eb9e91ec9db4eab08020eb8298ed8380eb82acec96b4ec9a94.mp3) | 떡이 하나밖에 안 남았어요. [🔊](https://www.academiaseul.com/audio/kr/eb96a1ec9db420ed9598eb8298ebb096ec979020ec958820eb82a8ec9598ec96b4ec9a94.mp3) |
| 7 | 드라마를 보고 한국 문화를 좋아하게 됐어요. [🔊](https://www.academiaseul.com/audio/kr/eb939ceb9dbceba788eba5bc20ebb3b4eab3a020ed959ceab5ad20ebacb8ed9994eba5bc20eca28bec9584ed9598eab28c20eb9090ec96b4ec9a94.mp3) | 저도 주인공처럼 서울에서 살아 보고 싶어요. [🔊](https://www.academiaseul.com/audio/kr/eca080eb8f8420eca3bcec9db8eab3b5ecb298eb9fbc20ec849cec9ab8ec9790ec849c20ec82b4ec958420ebb3b4eab3a020ec8bb6ec96b4ec9a94.mp3) | 우리 말 놓을까요? — 좋아, 말 놓자! [🔊](https://www.academiaseul.com/audio/kr/ec9ab0eba6ac20eba79020eb8693ec9d84eab98cec9a943f.mp3) [🔊](https://www.academiaseul.com/audio/kr/eca28bec95842c20eba79020eb8693ec9e90.mp3) |
| 8 | 제 생각에는 좋은 점도 있고 안 좋은 점도 있는 것 같아요. [🔊](https://www.academiaseul.com/audio/kr/eca09c20ec839deab081ec9790eb8a9420eca28bec9d8020eca090eb8f8420ec9e88eab3a020ec958820eca28bec9d8020eca090eb8f8420ec9e88eb8a9420eab28320eab099ec9584ec9a94.mp3) | 좋은 질문이네요! [🔊](https://www.academiaseul.com/audio/kr/eca28bec9d8020eca788ebacb8ec9db4eb84a4ec9a94.mp3) | 그동안 감사했습니다. [🔊](https://www.academiaseul.com/audio/kr/eab7b8eb8f99ec958820eab090ec82aced9688ec8ab5eb8b88eb8ba4.mp3) |

---

## C. Lista maestra de vocabulario del curso

Sin romanización. Tipos (los de Conversacional 1): **N** núcleo nuevo (se produce; entra en el quiz y en el proyecto) · **N↺** núcleo que ya estaba en Básico 1, Básico 2 o Conversacional 1 (se reactiva y se evalúa) · **T** del tema (se usa en clase; se reconoce) · **P** paradigma (serie que se aprende junta) · **F** fórmula (se imita sin explicar la regla) · **R** reconocimiento (lo dice el profe o es cultura; no se pide ni se evalúa). **Audio** = hay clip SunHi en `public/audio/kr` (nombre = hex del UTF-8 del texto, como en `../audio/Clips_Octubre_2026.md`): **las 181 filas tienen clip** (comprobado por script el 28 sept; en las filas con " · ", un clip por pieza: **234 clips distintos** (213 de la lista y 25 de las frases clave, 4 compartidos), **188 de ellos generados hoy** con la misma voz y el mismo formato del sitio: ko-KR-SunHiNeural, −8 %, MP3 24 kHz). ⚑ N-1: los 188 nuevos no están en git. Enlace en el material: `[🔊](https://www.academiaseul.com/audio/kr/<hex>.mp3)`, fila por fila, como en las Fases 2–4.

**Resumen:** 181 filas · **86 de núcleo** (72 N + 14 N↺) · 8 P · 33 T · 30 F · 24 R · por semana: S1 24 · S2 24 · S3 24 · S4 20 · S5 24 · S6 25 · S7 24 · S8 16. Frente a la meta de la Fase 1 (500–650 activas al terminar A2.2), el curso aporta ≈ 90 activas nuevas (N + P) sobre las 380–480 de salida de Conversacional 1: el resto llega por el reciclaje y por las misiones. **Contraste con una lista de frecuencia** (V3 de la Fase 1: 한국어 학습용 어휘 목록 del 국립국어원) ⚑ pendiente para producción: confirmar que el núcleo de este curso esté en los grados A–B.

| S | Coreano | Español | Tipo | Audio | Nota |
|---|---|---|---|---|---|
| 1 | 초등학교 · 중학교 · 고등학교 | primaria · secundaria básica · secundaria superior | P | sí | Equivalencias por país en el material (tabla) |
| 1 | 교복 | uniforme escolar | N | sí |  |
| 1 | 과목 | asignatura, ramo | N | sí |  |
| 1 | 시간표 | horario de clases | N | sí |  |
| 1 | 다니다 | ir regularmente a, asistir (학교에 다니다) | N | sí | Conv1 lo usó sin listarlo |
| 1 | 입학하다 | entrar a un colegio o a la universidad | N | sí | 입학 [이팍] |
| 1 | 졸업하다 | egresar, graduarse | N | sí | 졸업 [조럽] |
| 1 | 선배 | quien entró antes que tú (compañero/a mayor) | N | sí |  |
| 1 | 후배 | quien entró después que tú (compañero/a menor) | N | sí |  |
| 1 | 방학 | vacaciones escolares | N↺ | sí | Básico 2 |
| 1 | 학원 | academia privada (después del colegio) | N↺ | sí | Básico 1 |
| 1 | 숙제 | tarea | N↺ | sí | Básico 2 |
| 1 | 존댓말 · 반말 | habla formal · habla informal | N↺ | sí | En Conv1 eran R: ahora se nombran y se discuten |
| 1 | 동기 | compañero/a del mismo año de ingreso | T | sí |  |
| 1 | 담임 선생님 | profesor/a jefe | T | sí |  |
| 1 | 급식 | almuerzo escolar | T | sí | 급식 [급씩] |
| 1 | 동아리 | club escolar o universitario | T | sí |  |
| 1 | 국어 · 영어 · 수학 · 과학 · 체육 | lenguaje · inglés · matemáticas · ciencias · educación física | P | sí |  |
| 1 | 맞죠? · 그렇죠 | ¿cierto? · ¡así es! | F | sí | -죠 se explica hoy |
| 1 | 고등학교 때 · 방학 때 | cuando estaba en la secundaria · en vacaciones | F | sí | N + 때 |
| 1 | 다시 만나서 반가워요 | ¡qué bueno verte de nuevo! | F | sí |  |
| 1 | 야간 자율 학습 | estudio nocturno en el colegio (야자) | R | sí | ⚑ dato de la profe: hoy es menos común y depende del colegio |
| 1 | 밥 먹었어? · 어디 가? | ¿comiste? · ¿adónde vas? (반말 de un 선배 o de un 동기) | R | sí | Solo reconocer (sistema en la S7) |
| 1 | 다닌 적이 있어요 | he ido alguna vez (= 다녀 봤어요) | R | sí | -(으)ㄴ 적이 있다 solo se reconoce |
| 2 | 수능 | examen nacional de ingreso a la universidad | N↺ | sí | Básico 2 · Conv1 S6 (R) |
| 2 | 시험을 보다 | rendir un examen | N↺ | sí | Básico 2 (시험 잘 보세요!) |
| 2 | 수험생 | quien rinde el examen (sobre todo el 수능) | N | sí |  |
| 2 | 성적 | notas, rendimiento | N | sí | 성적 [성적]: sin tensa (contraste con 점수) |
| 2 | 점수 | puntaje | N | sí | 점수 [점쑤] |
| 2 | 합격하다 | aprobar, quedar admitido/a | N | sí | 합격 [합껵] |
| 2 | 떨어지다 | reprobar, no quedar (lit. caerse) | N | sí |  |
| 2 | 경쟁 | competencia | N | sí |  |
| 2 | 스트레스를 받다 | estresarse | N | sí |  |
| 2 | 노력하다 | esforzarse | N | sí |  |
| 2 | 준비하다 | preparar | N↺ | sí | Conv1 S8 |
| 2 | 긴장되다 | estar nervioso/a | N↺ | sí | Conv1 S8 |
| 2 | 밤늦게까지 | hasta tarde en la noche | T | sí | 밤늦게 [밤늗께] |
| 2 | 시험장 | lugar donde se rinde el examen | T | sí |  |
| 2 | 결과 | resultado | T | sí |  |
| 2 | 인생 | la vida (de una persona) | T | sí |  |
| 2 | 제 생각에는 | en mi opinión… | F | sí |  |
| 2 | 저도 그렇게 생각해요 · 저는 좀 다르게 생각해요 | yo también lo creo · yo lo veo un poco distinto | F | sí |  |
| 2 | 그럴 수도 있죠 | puede ser | F | sí | Reactiva -죠 (S1) |
| 2 | 한 번밖에 없어요 | hay una sola vez (y nada más) | F | sí | 밖에 se explica en la S6 |
| 2 | 수시 · 정시 | las dos vías de admisión (por antecedentes · por puntaje del 수능) | R | sí | ⚑ sin cifras de proporción sin fuente |
| 2 | 재수 | volver a rendir el 수능 al año siguiente | R | sí |  |
| 2 | 수험표 | credencial del examen | R | sí |  |
| 2 | 엿 · 찹쌀떡 | regalos 'pegajosos' para aprobar | R | sí | Ya están en el blog: solo se enlaza |
| 3 | 직장 | lugar de trabajo | N | sí | 직장 [직짱] |
| 3 | 동료 | colega | N | sí | 동료 [동뇨] |
| 3 | 상사 | superior, jefe/a | N | sí |  |
| 3 | 신입 사원 | empleado/a nuevo/a | N | sí | 신입 [시닙] |
| 3 | 회의 | reunión | N | sí |  |
| 3 | 출근하다 · 퇴근하다 | entrar a trabajar · salir del trabajo | N↺ | sí | Básico 2 |
| 3 | 야근 | trabajar hasta tarde, horas extra | N | sí |  |
| 3 | 회식 | cena o salida del equipo de trabajo | N | sí |  |
| 3 | 명함 | tarjeta de presentación | N | sí | Se da y se recibe con las dos manos |
| 3 | 계시다 · 드시다 · 주무시다 · 말씀하시다 | estar · comer o beber · dormir · decir (con respeto) | P | sí | Verbos especiales de -(으)시- |
| 3 | 사원 · 대리 · 과장 · 부장 · 사장 | cargos: empleado · asistente · jefe de sección · gerente de área · presidente | P | sí | ⚑ la escala varía según la empresa |
| 3 | 팀장님 | jefe/a de equipo | T | sí | Muy frecuente hoy |
| 3 | 점심시간 | hora de almuerzo | T | sí |  |
| 3 | 워라밸 | equilibrio entre vida y trabajo | T | sí | de work-life balance |
| 3 | 처음 뵙겠습니다 | mucho gusto (primera vez, formal) | F | sí |  |
| 3 | 잘 부탁드립니다 | cuento con usted (formal) | F | sí | ↺ 잘 부탁드려요 (Conv1) |
| 3 | 식사하셨어요? | ¿ya comió? (saludo de oficina) | F | sí |  |
| 3 | 먼저 들어가 보겠습니다 | me retiro (al irse antes que otros) | F | sí | ↺ Básico 2 |
| 3 | 네, 알겠습니다 | entendido | F | sí |  |
| 3 | 신입이라서 긴장돼요 | como soy nuevo/a, estoy nervioso/a | F | sí | N(이)라서: fórmula (Conv1 lo dejó para A2.2) |
| 3 | 께서 · 께 | partículas de respeto (= 이/가 · = 에게/한테) | R | sí |  |
| 3 | 수고하셨습니다 | gracias por el esfuerzo (a quién se dice: C.5 de la guía) | R | sí | ↺ Conv1 S8 (R) |
| 3 | 주 52시간 | la semana laboral de 52 horas (ley) | R | sí | ⚑ dato: confirmar vigencia y año |
| 3 | 칼퇴 | salir justo a la hora (coloquial) | R | sí | ⚑ registro coloquial |
| 4 | 설날 | Año Nuevo lunar | N↺ | sí | Básico 1 (추석 · 설날) |
| 4 | 새해 | año nuevo | N | sí |  |
| 4 | 세배 | reverencia de Año Nuevo a los mayores | N | sí |  |
| 4 | 세뱃돈 | dinero que dan los mayores tras el 세배 | N | sí | 세뱃돈 [세배똔/세밷똔] |
| 4 | 명절 | fiesta tradicional (con feriado) | N | sí |  |
| 4 | 연휴 | feriado largo, días libres seguidos | N | sí |  |
| 4 | 고향 | pueblo o ciudad natal | N↺ | sí | Básico 2 |
| 4 | 댁 | casa (con respeto: 할머니 댁) | N | sí |  |
| 4 | 부모님 | padres (con respeto) | N | sí |  |
| 4 | 친척 | parientes | N | sí |  |
| 4 | 선물 | regalo | N↺ | sí | Básico 2 |
| 4 | 음력 | calendario lunar | T | sí |  |
| 4 | 신정 | Año Nuevo del 1 de enero | T | sí |  |
| 4 | 귀성길 | viaje de regreso al pueblo en las fiestas | T | sí |  |
| 4 | 새해 복 많이 받으세요 | ¡feliz año nuevo! (lit. recibe mucha fortuna) | F | sí |  |
| 4 | 건강하세요 | ¡que tenga salud! (a un mayor) | F | sí |  |
| 4 | 다시 한번 말씀해 주시겠어요? | ¿podría repetirlo, por favor? (muy cortés) | F | sí | Versión honorífica de la reparación de Conv1 |
| 4 | 설날 잘 보내세요 | ¡que pase un buen 설날! | F | sí |  |
| 4 | 까치설날 | víspera del 설날 (en el habla infantil) | R | sí | ⚑ No se usa la letra de la canción (derechos) |
| 4 | 설 선물 세트 | sets de regalo de 설날 | R | sí |  |
| 5 | 떡국 | sopa de 떡 (de Año Nuevo) | N | sí | 떡국 [떡꾹] |
| 5 | 차례 | rito en honor a los antepasados | N | sí |  |
| 5 | 조상 | antepasados | N | sí |  |
| 5 | 성묘 | visita a las tumbas familiares | N | sí |  |
| 5 | 추석 | fiesta de la cosecha (15 del 8.º mes lunar) | N↺ | sí | Básico 1 |
| 5 | 송편 | pastelito de arroz de 추석 | N | sí |  |
| 5 | 한가위 | otro nombre de 추석 | N | sí |  |
| 5 | 모이다 | reunirse | N | sí |  |
| 5 | 설거지하다 | lavar la loza | N | sí |  |
| 5 | 잔소리 | sermón; preguntas incómodas de los parientes | N | sí |  |
| 5 | 보름달 | luna llena | N | sí |  |
| 5 | 전 | 'panqueque' salado frito (전을 부치다) | N | sí |  |
| 5 | 윷놀이 | juego tradicional de palitos | T | sí | 윷놀이 [윤노리] |
| 5 | 손주 | nietos (nietas y nietos) | T | sí |  |
| 5 | 차가 막히다 | haber tráfico | T | sí |  |
| 5 | 한 살 더 먹다 | cumplir un año más (con el 떡국) | T | sí | 만 나이 oficial desde 2023: matiz |
| 5 | 명절 잘 보내셨어요? | ¿pasó bien las fiestas? | F | sí |  |
| 5 | 제가 도와 드릴게요 | yo le ayudo (드리다 como fórmula) | F | sí |  |
| 5 | 옛날에는 · 요즘은 | antes… · hoy… | F | sí | Frase ancla del curso |
| 5 | 집집마다 달라요 · 사람마다 달라요 | depende de cada casa · de cada persona | F | sí | 마다 ↺ Básico 2 |
| 5 | 역귀성 | los padres viajan a la ciudad de los hijos | R | sí |  |
| 5 | 명절 스트레스 | estrés de las fiestas | R | sí |  |
| 5 | 차례상 | mesa del rito | R | sí | ⚑ la norma 'simplificada' de 2022: confirmar fuente antes de citarla |
| 5 | 떡만둣국 | sopa de 떡 con 만두 (varía por familia y región) | R | sí | ⚑ |
| 6 | 옛날이야기 | cuento tradicional | N | sí | 옛날이야기 [옌날리야기] |
| 6 | 전설 | leyenda | N | sí |  |
| 6 | 호랑이 | tigre | N | sí |  |
| 6 | 곰 | oso/osa | N | sí |  |
| 6 | 나타나다 | aparecer | N | sí |  |
| 6 | 도망가다 | huir | N | sí |  |
| 6 | 잡아먹다 | comerse (a alguien, un depredador) | N | sí | 잡아먹다 [자바먹따] |
| 6 | 남다 | quedar, sobrar | N | sí |  |
| 6 | 변하다 | transformarse, cambiar | N | sí |  |
| 6 | 착하다 | ser bueno/a de corazón | N | sí |  |
| 6 | 무섭다 | dar miedo; tener miedo | N | sí | irregular en ㅂ (무서워요) |
| 6 | 오누이 | hermano y hermana | T | sí |  |
| 6 | 어느 날 | un día | T | sí |  |
| 6 | 결국 | al final | T | sí |  |
| 6 | 도깨비 | duende del folclor coreano | T | sí |  |
| 6 | 구미호 | zorro de nueve colas | T | sí |  |
| 6 | 고개 | paso de montaña, cuesta | T | sí |  |
| 6 | 해 · 달 | sol · luna | P | sí | ↺ pictogramas del Lector |
| 6 | 옛날 옛적에 | había una vez | F | sí |  |
| 6 | 떡 하나 주면 안 잡아먹지 | dame un 떡 y no te como (frase del tigre, en 반말) | F | sí | Se dice como cita, no se analiza |
| 6 | 제가 한번 이야기해 볼게요 | les voy a contar una (historia) | F | sí | -(으)ㄹ게요 ↺ S5 |
| 6 | 신화 | mito | R | sí | ↺ blog de Dangún |
| 6 | 호랑이 담배 피우던 시절에 | 'cuando los tigres fumaban' (= hace muchísimo) | R | sí |  |
| 6 | 살았다 · 나타났다 · 호랑이였다 | 한다체 del cuento escrito | R | sí | Tabla de conversión en el material |
| 6 | 정월대보름 · 부럼 | primera luna llena del año · nueces que se parten ese día | R | sí | Dom 21 feb 2027 (calculado desde el 설날) |
| 7 | 주인공 | protagonista | N | sí |  |
| 7 | 배우 | actor, actriz | N | sí |  |
| 7 | 장면 | escena | N | sí |  |
| 7 | 결말 | final de la historia | N | sí |  |
| 7 | 현실 | realidad | N | sí |  |
| 7 | 추천하다 | recomendar | N | sí |  |
| 7 | 감동적이다 | ser conmovedor/a | N | sí |  |
| 7 | 취업 | conseguir trabajo, inserción laboral | N | sí |  |
| 7 | 동갑 | de la misma edad | N | sí |  |
| 7 | 말을 놓다 | pasar a hablarse en 반말 | N | sí | ↺ 말 놔도 돼요? (Conv1, R) |
| 7 | 나 · 너 | yo · tú (반말) | P | sí | 내가 · 네가 [니가] |
| 7 | 응 · 아니 | sí · no (반말) | P | sí |  |
| 7 | 사극 | drama histórico | T | sí |  |
| 7 | 웹툰 | webtoon | T | sí |  |
| 7 | 1인 가구 | hogar de una sola persona | T | sí | 1인 [이린] |
| 7 | 혼밥 | comer solo/a | T | sí |  |
| 7 | 재벌 | gran conglomerado familiar (y su familia) | T | sí |  |
| 7 | 치맥 | pollo frito y cerveza | T | sí |  |
| 7 | 과장하다 | exagerar | T | sí |  |
| 7 | 꼭 보세요 | ¡tienes que verlo! | F | sí |  |
| 7 | 재미있다고 생각해요 | creo que es entretenido (-다고 생각해요) | F | sí | Solo con adjetivos y 있다/없다 |
| 7 | 우리 말 놓을까요? | ¿nos tuteamos? | F | sí |  |
| 7 | 오빠 · 언니 | fuera de la familia: amigo/a mayor (lo dicen las mujeres) | R | sí | ↺ Básico 1 (familia) |
| 7 | 드라마 같은 이야기 | una historia de drama (N 같은 N) | R | sí |  |
| 8 | 주제 | tema | N | sí |  |
| 8 | 설명하다 | explicar | N | sí |  |
| 8 | 비교하다 | comparar | N | sí |  |
| 8 | 장점 · 단점 | ventaja · desventaja | P | sí | 장점 [장쩜] · 단점 [단쩜] · reaparecen en TOPIK II |
| 8 | 의견 | opinión | N | sí |  |
| 8 | 질문 | pregunta | N | sí |  |
| 8 | 경험 | experiencia | N | sí |  |
| 8 | 변화 | cambio | N | sí |  |
| 8 | 사회 | sociedad | N | sí |  |
| 8 | 대답하다 | responder | N↺ | sí | Básico 2 |
| 8 | 팟캐스트 | pódcast | T | sí |  |
| 8 | 청취자 | oyente | T | sí |  |
| 8 | 좋은 질문이네요 | ¡buena pregunta! | F | sí | -네요 ↺ S5 |
| 8 | 그동안 감사했습니다 | gracias por todo este tiempo | F | sí |  |
| 8 | 다음 단계에서도 열심히 할게요 | en la siguiente etapa también me voy a esforzar | F | sí |  |
| 8 | 개학 | inicio de clases (en Corea, el 2 de marzo) | R | sí |  |

---

## D. Política de idiomas en clase (sin romanización; cuánto español)

### D.1 La regla depende de quién enseñe (DECISIÓN DE JAY 7)

La página pública dice "Idioma de la clase: Confirmar con Academia Seúl (en Conversacional 1 la clase es casi toda en coreano)". **Recomendación: mantener lo que los alumnos ya conocen de Conversacional 1: el coreano es el idioma de la clase y el español vive escrito.** Lo que cambia según el profe es solo cuánto español puede aparecer **en voz**.

| | Si enseña **Abby** (tentativo en `Horarios_Equipo_2026-2`) | Si enseña **Jay** (u otro profe bilingüe) |
|---|---|---|
| Regla | **90/10**, idéntica a Conversacional 1 (Fase 4, D.1): Abby habla solo coreano; el español está en el deck (glosa ES/EN) y en las líneas 📋 que la guía le da ya escritas para pegar en el chat | **85/15**: el profe habla coreano en todo lo que se practica; puede usar español **en voz** solo en tres ventanas: (a) el contraste de cada estructura con el español (≤ 2 min por estructura: es lo que la guía marca como 📋), (b) un matiz cultural delicado (presión del 수능, 명절 스트레스) para que no se malentienda, (c) lo administrativo al final. **Nunca** traduce en voz frases que acaba de decir en coreano |
| Guía | Se traduce al coreano (las explicaciones para el profe); los recuadros 🗣️ quedan igual | Se usa tal cual (español + 🗣️ en coreano) |
| Horas en la guía | KST con Chile entre paréntesis | Chile con Corea entre paréntesis |

**En los dos casos:**

| Quién | Coreano | Español |
|---|---|---|
| **Profe** | Explicaciones, consignas, correcciones, bromas, cultura, preguntas de seguimiento | Escrito en el deck (cada palabra nueva con su glosa; cada estructura con una línea de contraste) y en el chat (📋). En voz, solo lo de arriba |
| **Alumnos** | Todo lo que dicen en clase y en las salas | **Una palabra en el chat** cuando la necesitan ("¿sindicato?"); el profe responde en coreano y la escribe. Nada de conversaciones en español en las salas |
| **Material del alumno** | Todo el coreano en 한글, **sin romanización**; pronunciación en 한글 entre corchetes | Explicaciones, consignas, notas culturales (se leen antes o después de clase) |
| **Jay** | — | Lo administrativo y el apoyo en español **por WhatsApp**, fuera de la clase |

**Por qué el coreano manda también aquí:** el curso trata de **registro** (존댓말, -(으)시-, -ㅂ니다, 반말). El registro se aprende oyéndolo y usándolo; si la clase pasa al español, el alumno pierde justo el input que el curso quiere enseñar. Y por qué **no hay romanización** (Fase 1 §7.4): a esta altura el alumno lee 한글 hace meses; la romanización solo haría leer con reglas del español.

### D.2 Cuando un alumno se pierde: la escalera de apoyo (PROFE)

Igual que en Conversacional 1 (Fase 4, D.2), en este orden y parando en cuanto el alumno entiende: (1) repetir más despacio · (2) reformular con palabras de la lista C o de Conversacional 1 · (3) mostrar (imagen, gesto, pizarra) · (4) escribir la palabra clave en coreano en el chat · (5) pegar la línea 📋 en español · (6) un compañero-puente la dice en coreano más simple · (7) 괜찮아요!, tarjeta de apoyo en la sala y una línea para Jay en el reporte post-clase; Jay le escribe en español esa noche o al día siguiente. **Nunca:** explicaciones largas, traducir frases completas, pasar al inglés, corregir un relato mientras ocurre.

### D.3 Texto para el alumno (mensaje de bienvenida y sección 1 del material de la S1)

> **Texto para el alumno**
>
> **En Conversacional 2 seguimos hablando en coreano (y está bien no entenderlo todo)**
> Como en Conversacional 1, en clase se habla **en coreano**. El español no desaparece: está **escrito** en las slides (cada palabra nueva, con su traducción) y en el chat, y en tu hoja de la semana, que lees antes y después de clase.
> Este curso trata de **cómo se habla en Corea según con quién hablas**: con un jefe, con una abuela en 설날, con un amigo de tu edad. Por eso vas a oír (y a usar) distintas formas de respeto. En clase hablamos en 해요체, como siempre; el 반말 lo usamos solo cuando lo practicamos, y ya vas a ver por qué.
> **Si te pierdes:** 다시 한번 말해 주세요 · 천천히 말해 주세요 · ___이/가 무슨 뜻이에요? · 잘 모르겠어요 · 잠깐만요! Desde la clase 4 aprendes la versión más cortés: **다시 한번 말씀해 주시겠어요?**
> **¿Te falta una palabra?** Escríbela en español en el chat: te la damos en coreano.
> **¿Te quedó una duda?** Mira la grabación y tu hoja; si sigue, escríbele a Jay por WhatsApp (+56 9 4211 5562): te responde en español.
> **Nadie te va a pedir perfección.** Te vamos a pedir que expliques Corea con tus palabras. 화이팅!

---

## E. Evaluación del curso

### E.1 Principios
Se evalúa lo que el alumno puede **hacer** en coreano (explicar, contar, comparar, adecuar el registro); **el curso es oral**, con dos escritos cortos que no puntúan aparte (el 일기 y el guion, que preparan el proyecto); pocas evidencias y todas útiles; primero el comentario, después la nota; **nada se evalúa antes de enseñarse** y nada se ve por primera vez el día del proyecto. Lo publicado para este curso: "quizzes cortos al inicio de las clases, tus tareas semanales con comentarios, una guía de estudio a mitad de curso y el proyecto final de la semana 8. El detalle de la evaluación: Confirmar con Academia Seúl".

### E.2 Componentes y certificado: **[regla del certificado: pendiente de decisión de Jay]**

En octubre conviven tres versiones (Fase 1 §11.1; Fase 4 E.2): la de las fichas por curso (40/30/30, ≥ 60 % + 6 de 8 **en vivo**), la de los términos, el FAQ, los kits y la guía del alumno (25/25/15/35, participación con **grabación + tarea**) y, en Conversacional 1, una tercera ("salvo aviso previo"). Para enero, la Fase 1 propone **una sola** (decisión 6, bloque 1 antes de la preventa del 7 de diciembre):

| Componente | Propuesta de la Fase 1 ("Pasaporte Chingu") | Qué incluye en Conversacional 2 |
|---|---|---|
| **Clase** | 40 % | Asistencia activa (en vivo o recuperada con la **misión de recuperación**: grabación + audio de 60 s de la actividad oral de esa clase), turnos de habla, quizzes orales S2–S7, participación en los labs |
| **Misiones semanales** | 25 % | Las 7 misiones de 25–30 min (entregada o no, + bonus de calidad); incluye el 일기 (S6) y el guion (S7) |
| **Proyecto final** | 35 % | Pódcast + parte en vivo, con la rúbrica de F.6 |

**Certificado (propuesta de la Fase 1 §11.3, no aplicada):** 6 de 8 clases (en vivo o recuperadas) + proyecto presentado; la nota no bloquea el certificado: con 60 % o más, pase directo al siguiente peldaño. **Hasta que Jay decida, este diseño no fija umbrales ni pesos**: el registro del curso separa todo (asistencia en vivo · grabación + misión · cada misión y su fecha · cada quiz · labs · pódcast · rúbrica) para poder aplicar cualquier regla al final. La página pública ya dice "se consideran tu asistencia y tu participación", que es compatible con cualquiera de las opciones.

### E.3 Diagnóstico de entrada (S1)
B0.3. Sin nota. Es el "antes" del informe final. Para externos, además, el audio guiado y el micro-diagnóstico de B0.2 (antes de pagar).

### E.4 Quiz oral de las clases 2 a 7

Como en Conversacional 1: 5 minutos al inicio, **cinco preguntas sobre la clase anterior** (vocabulario + una estructura), respondidas en voz alta (2–3 alumnos por nombre, rotando) o en el chat ("solo anfitrión"). **La quinta es un ítem con formato TOPIK I** (Fase 1 §7.3 y §9.3): un ítem oficial publicado en topik.go.kr, citando edición y número, del tipo que calza con el tema (selección de producción, validada por Jay ⚑ N-3; hay material de consulta en `D:\Deskotop to D\2. Korean Clases\Topik 1\` (64.º TOPIK I)). Las claves van en C.16 de cada guía (PROFE). **No hay quiz en la S1 ni en la S8.**

| Quiz | Abre | Evalúa | 4 preguntas (tipo) | 5.ª · ítem TOPIK I (tipo) |
|---|---|---|---|---|
| 1 | S2 | S1 | Completa: 내일 시험이 있___ 같이 공부할까요? · Confirma con -죠: "한국 학교는 3월에 시작해요" → ___? · ¿선배 y 후배 en español? · Respuesta personal: 고등학교 때 교복을 입었어요? | Lectura: "¿de qué se habla?" (학교 · 방학) |
| 2 | S3 | S2 | 대학교에 가___ 공부해요 (-(으)려고) · 수능은 한 번밖에 없___ 스트레스를 받아요 (-기 때문에) · 수능 날에는 일찍 가___ (-아/어야 해요) · 합격하다 ↔ ? (떨어지다) | Lectura de un aviso breve (horario, lugar) |
| 3 | S4 | S3 | 할머니가 자요 → (주무세요) · 저는 카밀라예요 → formal (카밀라입니다) · 사진을 찍___ 돼요? · ¿qué es un 명함? | Lectura: la respuesta adecuada a un mensaje de trabajo |
| 4 | S5 | S4 | ¿Qué le dices a tu abuela en 설날? · 선생님은 설날에 어디 ___? (가세요) · ¿세뱃돈? · Repara con cortesía: (다시 한번 말씀해 주시겠어요?) | Escucha: la respuesta adecuada en un diálogo corto |
| 5 | S6 | S5 | Elige: 제가 할게요 / 할 거예요 en dos situaciones · Reacciona a una foto con -네요 · 동생은 세뱃돈을 받고 싶어요 → (받고 싶어 해요) · 떡국 y 송편: ¿qué fiesta? | Lectura de un texto corto sobre una fiesta (3 preguntas → 1) |
| 6 | S7 | S6 | Une con -는데: 엄마가 고개를 넘어요 + 호랑이가 나타났어요 · 떡이 하나 있어요 → con 밖에 · -(으)ㄹ 때 o -았/었을 때: 한국에 ___ 사진을 많이 찍었어요 · ¿Qué significa 살았다? | Lectura: ordenar los hechos de una historia |

**Quien falta a un quiz:** las 5 preguntas en nota de voz antes del domingo, con la lámina de la grabación (igual que la decisión 12 de Conversacional 1; DECISIÓN DE JAY 10).

### E.5 Mitad del curso (S3 → S5)
La página pública promete "una guía de estudio y comentarios de tu profe a mitad de curso". Se cumple **sin agregar un examen**:
1. **Guía de estudio S1–S3** (`alumnos/C2_Guia_Estudio_S1-S3.md`): sale con el material de la S3. Las 3 frases clave de cada clase, cada estructura con un ejemplo, el mapa de las tres razones, las fórmulas de la oficina y la versión cortés de la reparación. Es la hoja de preparación del Lab 3.
2. **Evidencia:** diagnóstico S1, audios S1–S3, quizzes 1–3, **Lab 3** (2 puntos de pronunciación + las 4 tarjetas) y la **autoevaluación** (misión S4).
3. **Comentario personal de 3 líneas** (una fortaleza · un foco · el siguiente paso), con un **banco de comentarios bilingüe** (`profes/C2_Banco_Comentarios.md`) si enseña Abby. Plazo propuesto: **domingo después de la S5 [POR CONFIRMAR: dom 14 feb]** (la S4 cae justo antes del feriado del 설날: si enseña Abby, el plazo le deja el feriado libre).
4. Parejas nuevas para S5–S8 (B0.4).

### E.6 Proyecto final (S8) y calendario

| Cuándo [POR CONFIRMAR] | Qué | Quién |
|---|---|---|
| S6 (mié 17 feb) | Aviso escrito: el proyecto, los temas posibles, las fechas | Jay en el grupo, con el profe |
| **S7 (mié 24 feb)** | Consigna en clase (F.1) · cada uno dice su tema · tríos del proyecto publicados | Profe en clase; Jay publica |
| hasta **sáb 27 feb, 22:00** | Guion de 8–10 frases por WhatsApp | Alumno |
| dom 28 feb | Guion corregido (3 marcas por frase como máximo) | Profe |
| **lun 1 mar, 22:00 Chile** (= mar 2, 10:00 KST) | **Pódcast de 3 minutos** en la carpeta del curso o por WhatsApp | Alumno |
| mar 2 – mié 3 mar | El profe escucha los pódcasts (≈ 15 × 5 min) y adelanta la rúbrica: en vivo solo quedan las preguntas | Profe |
| **mié 3 mar, 21:00** (jue 4, 09:00 KST) | **S8:** Lab 4 + proyecto en vivo en tríos | Profe |
| jue 4 → vie 5 mar | Citas de 10' para quien faltó · pódcasts atrasados | Profe |
| **vie 5 mar** | Rúbricas, informe individual y recomendación de peldaño a Jay | Profe → Jay |
| **lun 8 mar** ⚑ | Certificado + informe + preventa de la cohorte siguiente | Jay |

**Tarea de recuperación** para quien quede al borde (Conversacional 1, nota publicada 7): un segundo pódcast con 7 días de plazo. Depende de la regla: **[regla del certificado: pendiente de decisión de Jay]**.

### E.7 Rúbrica
La de F.6: 5 criterios × 4 niveles, máximo 20 puntos, 20 % cada uno (la de Conversacional 1, para que el alumno la reconozca), con **la opción (a) de la Fase 1 para meter la cultura** ("Vocabulario" pasa a **"Vocabulario y uso cultural"**; "Comprensión e interacción" ya existe desde octubre): DECISIÓN DE JAY 12 de la Fase 1.

### E.8 Certificado, informe y pase
- **Regla:** E.2 → **[regla del certificado: pendiente de decisión de Jay]**. 75 % = 6 de 8 clases, si se usa esa regla.
- **Línea de nivel recomendada** (A.3): "Conversacional 2 (A2.2) · contenidos de la segunda etapa del nivel A2 (MCER) · no es una certificación oficial". **Evitar** "A2 completo" y "preparación TOPIK I-2" (DECISIÓN DE JAY 8).
- **Informe individual:** las 5 habilidades de la rúbrica, una fortaleza, un foco, **el "antes y después"** (audio de la S1 frente al pódcast) y la recomendación de peldaño.
- **Pase:** el siguiente peldaño natural es el **Intermedio B1** que la Fase 1 propone crear (2 × 8 semanas; nombre, fecha y precio: DECISIÓN DE JAY 8 de la Fase 1). Mientras no exista, la recomendación honesta es: **TOPIK II solo con su diagnóstico previo** (a la mayoría de los egresados de A2.2 todavía no le corresponde) o volver a Conversacional 2 con otros temas. El informe no promete un curso que no está publicado.

---

## F. Proyecto final: "Corea por dentro, contada por ti · 내가 설명하는 한국"

**La idea mejorada.** El brief pedía "Explica algo de la sociedad coreana"; la Fase 1 lo convirtió en un mini-pódcast de 3 minutos + preguntas + guion. Aquí se afina en tres puntos: (1) **el guion es un paso, no el producto**: se escribe y se corrige en la S7, pero el pódcast se graba **sin leer**, con una tarjeta de 8 palabras (como el monólogo de Conversacional 1); (2) **una estructura fija de 5 movimientos** que obliga a usar lo que el curso enseña (explicar · antes y ahora · ejemplo contado · comparación sin estereotipo · opinión y pregunta al oyente); (3) **la parte en vivo es conversación**, no exposición: el alumno responde preguntas y **hace una**. Así se evalúa lo que la marca promete: explicar Corea en coreano y sostener la conversación que viene después.

### F.1 Consigna (ALUMNO)

> **Texto para el alumno**
>
> **Tu proyecto final: "Corea por dentro, contada por ti" · 내가 설명하는 한국**
> Durante 8 semanas miraste Corea por dentro: la escuela, el 수능, la oficina, el 설날 y el 추석, los cuentos del tigre y los dramas. Ahora **tú se lo explicas a alguien que no conoce Corea**, en coreano, en un episodio de pódcast de 3 minutos. Después, en la clase 8, conversas sobre tu tema con tu grupo.
>
> **1 · Elige tu tema** (lo dices en la clase 7): 학교와 학원 · 수능 · 회사 생활 (회식, 존댓말…) · 설날 o 추석 · 옛날이야기 (un cuento o mito coreano, contado y comparado con uno de tu país) · K-드라마와 한국 사회 · o un tema libre del curso que tu profe apruebe (나이와 존댓말, 1인 가구…).
>
> **2 · Escribe tu guion (8–10 frases)** y mándalo por WhatsApp **hasta el sábado de la semana 7 a las 22:00 (hora de Chile)**. Tu profe te lo devuelve corregido el domingo. Sigue estos 5 pasos:
> 1. **Saluda y presenta el tema:** 제 주제는 ___예요. 이 주제를 고른 이유는 ___기 때문이에요.
> 2. **Explica qué es y cómo cambió:** ___은/는 ___예요. 옛날에는… 요즘은…
> 3. **Cuenta un ejemplo o una historia:** con **-는데** (…했는데, …) o **-았/었을 때**.
> 4. **Compara con tu país, sin estereotipos:** 우리 나라에서는… 그런데 사람마다 (집집마다 / 회사마다) 달라요.
> 5. **Da tu opinión y pregúntale al oyente:** 제 생각에는 … 것 같아요. 여러분은 어떻게 생각해요?
>
> **3 · Graba tu pódcast (3 minutos, sin leer)** y súbelo **hasta el lunes antes de la clase 8, a las 22:00 (hora de Chile)**. Puedes mirar tu **tarjeta de palabras clave** (máximo 8 palabras, ninguna frase). Habla como si alguien te escuchara: 안녕하세요, 여러분!
>
> **4 · En la clase 8, conversa.** En tu sala, resumes tu tema en 30 segundos. Tu profe te hace **una pregunta** y un compañero **otra**; después **tú le haces una pregunta** a otro. Prepara 3 preguntas para tus compañeros.
>
> **Usa lo que aprendiste:** -(으)니까 · -기 때문에 · -(으)려고 · -아/어야 해요 · -(으)시- (si hablas de mayores o jefes) · -는데 · 밖에 · -네요 · -죠 · 처럼 · -게 되다 · 것 같아요.
> **Qué miramos (5 cosas, lo mismo en el pódcast y en vivo):** fluidez, que uses bien las estructuras del curso, el vocabulario y el uso cultural (explicar sin estereotipos, el registro correcto), la pronunciación y cómo escuchas y respondes. **Hablar lento no baja la nota; leer, sí.**
> **Si faltas a la clase 8:** haces la parte en vivo con tu profe en una cita de 10 minutos por Zoom esa misma semana.
> **Ejemplo de tarjeta de palabras clave (tema: 회식):** 회식 · 팀장님 · 1차 2차 · 옛날에는 · 점심 · 술 · 회사마다 · 장점.

### F.2 Lenguaje esperado (PROFE)

| Movimiento | Estructuras | Semana | Ejemplo |
|---|---|---|---|
| 1 · Tema y razón | -기 때문에 (final: -기 때문이에요) · -게 되다 | S2 · S7 | 이 주제를 고른 이유는 드라마에서 회식 장면을 자주 봤기 때문이에요. |
| 2 · Qué es · antes y ahora | 옛날에는… 요즘은… · -(으)시- · -아/어야 해요 · -(으)면 안 돼요 | S3 · S5 | 옛날에는 회식이 밤늦게까지 있었어요. 요즘은 점심에 하는 팀도 있어요. |
| 3 · Ejemplo contado | -는데 · -았/었을 때 · 밖에 · conectores | S6 | 처음 한국 회사에 갔을 때 회식이 있었는데, 저는 술을 한 잔밖에 못 마셨어요. |
| 4 · Comparación | 처럼 · -죠 · 사람마다 / 회사마다 달라요 | S1 · S7 | 멕시코에도 회식처럼 동료들하고 같이 먹는 문화가 있어요. |
| 5 · Opinión y pregunta | 것 같아요 · -다고 생각해요 · 장점/단점 | S2 · S7 · S8 | 제 생각에는 좋은 점도 있고 안 좋은 점도 있는 것 같아요. 여러분 회사는 어때요? |
| En vivo | -네요 · -(으)ㄹ게요 · reparación cortés · -(으)니까 | S4 · S5 | 좋은 질문이네요! 음… 잠깐만요, 생각해 볼게요. |

### F.3 Criterios (PROFE)
Se puntúa con la rúbrica de F.6. **Mínimo esperado para "listo para el siguiente peldaño":** el pódcast dura **2:30–3:30 sin leer** y tiene los **5 movimientos** · usa **al menos 5 estructuras de Conversacional 2** bien formadas (de 3 semanas distintas) · hay **un "antes y ahora"** y **una comparación con cuantificador** (사람마다, 많은, 요즘 젊은 사람 중에는…) · en vivo, responde las 2 preguntas con al menos 2 frases cada una, **repara si no entiende** (말씀해 주시겠어요?) y **hace su pregunta** · el registro es coherente (해요체; -(으)시- cuando habla de mayores o jefes; nunca sobre sí mismo) · se le entiende con un interlocutor paciente. El "antes y después" (audio S1 frente al pódcast) no se puntúa aparte: es el corazón del informe.

### F.4 Modelo en coreano natural, con traducción (PROFE · no se entrega completo: en la S7 se muestran los movimientos 1 y 2 como ejemplo)

Solo con lenguaje de la lista C, de Conversacional 1 y de Básico 1–2; lo que no está en ninguna va marcado (R) y se entiende por contexto. ⚑ **N-4: Jay revisa el modelo completo antes de la S7.**

**Modelo 1 · Pódcast "한국의 회식 문화" (≈ 3 min).** Diego, mexicano, ingeniero en Monterrey.

| Coreano | Español |
|---|---|
| 안녕하세요, 여러분! "코리아 인사이드" 세 번째 에피소드예요. 저는 디에고예요. 멕시코 몬테레이에 살고, 회사에서 엔지니어로 일해요. | ¡Hola a todos! Este es el tercer episodio de "Korea Inside". Soy Diego. Vivo en Monterrey, México, y trabajo como ingeniero en una empresa. |
| 제 주제는 한국의 회식 문화예요. 이 주제를 고른 이유는 한국 드라마에서 회식 장면을 자주 봤기 때문이에요. | Mi tema es la cultura del 회식 en Corea. Lo elegí porque vi muchas escenas de 회식 en los dramas coreanos. |
| 회식은 회사 사람들이 일이 끝난 후에 같이 먹는 저녁 식사예요. 보통 팀장님이 날짜를 정하세요. (정하다 = R) | El 회식 es la cena que la gente de una empresa comparte después del trabajo. Normalmente el jefe o la jefa de equipo pone la fecha. |
| 옛날에는 회식이 밤늦게까지 있었는데, 1차, 2차, 3차까지 가는 회사도 많았어요. | Antes, el 회식 duraba hasta tarde, y había muchas empresas en que se iba a un segundo y a un tercer lugar. |
| 그런데 요즘은 많이 바뀌었어요. 점심에 회식을 하는 팀도 있고, 같이 영화를 보는 팀도 있어요. (바뀌다 = R) | Pero hoy cambió mucho. Hay equipos que hacen el 회식 al almuerzo, y otros que van juntos al cine. |
| 짧은 회식을 좋아하는 직원도 많아요. 퇴근 후 시간도 중요하니까요. | También hay muchos empleados a los que les gusta un 회식 corto. Porque el tiempo después del trabajo también es importante. |
| 회식에는 예의도 있어요. 윗사람이 술을 따라 주시면 두 손으로 받아요. (윗사람, 따르다 = R) | En el 회식 también hay etiqueta. Si un superior te sirve un trago, lo recibes con las dos manos. |
| 그리고 술을 못 마시면 안 마셔도 돼요. 콜라를 마셔도 괜찮아요. | Y si no puedes tomar alcohol, no tienes que tomar. Puedes tomar una bebida. |
| 처음 한국 회사에 출장을 갔을 때 저도 회식에 갔는데, 너무 긴장돼서 고기를 한 점밖에 못 먹었어요! (출장, 한 점 = R) | La primera vez que fui de viaje de trabajo a una empresa coreana, fui a un 회식, ¡y estaba tan nervioso que solo alcancé a comer un pedazo de carne! |
| 우리 멕시코 회사에도 회식처럼 동료들하고 같이 먹는 문화가 있어요. 금요일에 타코를 먹으러 가요. 하지만 안 가도 괜찮아요. | En mi empresa en México también hay algo como el 회식: comer con los colegas. Los viernes vamos a comer tacos. Pero si no vas, no pasa nada. |
| 그런데 회사마다 달라요. 한국에도 회식이 거의 없는 회사가 있고, 멕시코에도 회식이 많은 회사가 있어요. (거의 = R) | Pero depende de cada empresa. En Corea también hay empresas que casi no hacen 회식, y en México hay empresas que hacen muchos. |
| 제 생각에는 회식은 좋은 점도 있고 안 좋은 점도 있는 것 같아요. 동료들하고 친해질 수 있지만, 너무 자주 하면 피곤해요. (친해지다 = R) | En mi opinión, el 회식 tiene cosas buenas y cosas no tan buenas. Te puedes hacer amigo de tus colegas, pero si es muy seguido, cansa. |
| 여러분 회사는 어때요? 회식을 자주 해요? 알려 주세요! 들어 주셔서 감사합니다. | ¿Y en tu empresa? ¿Hacen 회식 seguido? ¡Cuéntame! Gracias por escuchar. |

*Estructuras que aparecen:* -기 때문에 · -(으)시- (정하세요, 따라 주시면) · 옛날에는… 요즘은… · -는데 (×2) · -(으)니까요 · -아/어도 돼요 · -았/었을 때 · 밖에 · 처럼 · 회사마다 달라요 · 것 같아요. ⚑ N-4: confirmar "고기를 한 점밖에 못 먹었어요" (점 como contador de trozos de carne).

**Modelo 2 · La parte en vivo (≈ 2 min), sobre el mismo tema.** P = profe · C = compañera · D = Diego.

| | Coreano | Español |
|---|---|---|
| D | 제 주제는 한국의 회식 문화예요. 옛날에는 회식이 길었는데, 요즘은 짧게 하는 팀이 많아요. 그런데 회사마다 달라요. (짧게 = R, como 맵게 en Conv1) | Mi tema es la cultura del 회식. Antes era largo; hoy muchos equipos lo hacen corto. Pero depende de la empresa. |
| P | 디에고 씨는 회식이 좋아요? 왜요? | Diego, ¿a ti te gusta el 회식? ¿Por qué? |
| D | 음… 좋은 질문이네요! 저는 동료들하고 이야기할 수 있으니까 좋아요. 그렇지만 너무 늦게까지 하면 힘들 것 같아요. | Mmm… ¡buena pregunta! Me gusta porque puedo conversar con mis colegas. Pero si dura hasta muy tarde, creo que es pesado. |
| C | 멕시코에서는 팀장님도 같이 가요? | En México, ¿el jefe de equipo también va? |
| D | 네, 가끔 같이 가세요. 그런데 팀장님이 계시면 좀 긴장돼요! | Sí, a veces va con nosotros. ¡Pero si está el jefe, me pongo un poco nervioso! |
| D | 카밀라 씨 주제는 설날이죠? 칠레에서도 설날을 하는 한국 가족이 있어요? | Camila, tu tema es el 설날, ¿cierto? ¿En Chile también hay familias coreanas que lo celebran? |

### F.5 Logística del día (PROFE)
- **S7:** Jay publica los **tríos del proyecto** (A + B + C, temas distintos en cada trío) y el calendario de E.6.
- **Mar 2 por la noche en Corea = mar 2 por la mañana en Chile** [POR CONFIRMAR]: el profe publica el orden de las salas; cada alumno entra con su número de sala delante del nombre en Zoom.
- **S8, min 2–14:** Lab 4 "preguntas cruzadas" (no puntúa). Mientras, el profe deja lista su planilla con las rúbricas adelantadas por los pódcasts.
- **Min 16–51 (35'):** el profe entra a cada trío (**7'**): cada alumno resume en 30 s; el profe hace 1 pregunta (banco de F.4b) y un compañero otra; el alumno hace una pregunta. Los tríos que esperan o que ya terminaron siguen con las tarjetas de reserva (no se van).
- **Min 51–60:** plenario: cada uno dice en una frase qué entendió de Corea en el curso (한국을 ___게 됐어요 / 옛날에는 ___ 요즘은 ___) y su meta; 축하해요 · 모두 수고했어요 (el profe) — 선생님, 그동안 감사했습니다! (el grupo). Queda en la grabación.
- **Grabación de las salas:** la nube de Zoom no graba las salas (Fase 4 F.5). Como el pódcast ya es la evidencia grabada, **no hace falta grabar la parte en vivo**; si Jay la quiere, la misma opción que en Conversacional 1: nota de voz de cada trío con consentimiento y borrado tras el informe (DECISIÓN DE JAY 12).
- **Privacidad de los pódcasts:** son de uso del curso; compartirlos con el grupo o en redes solo con permiso escrito de cada alumno (DECISIÓN DE JAY 12).

**F.4b · Banco de preguntas del profe (PROFE; una por alumno, del tema de su pódcast):** 학교: 한국 학교하고 우리 나라 학교 중에서 어디가 더 힘든 것 같아요? 왜요? · 수능: 시험 하나로 대학교에 가는 게 좋아요? (R: -는 게) / 수능 날에 한국에 있으면 뭐 하고 싶어요? · 회사: 한국 회사에서 일해 보고 싶어요? 왜요? · 설날/추석: 우리 나라에서 제일 비슷한 명절이 뭐예요? · 옛날이야기: 그 이야기에서 누가 제일 착해요? 왜요? · 드라마: 그 드라마를 보고 뭐가 달라졌어요? (R: 달라지다) · Cierre: 이 수업에서 뭐가 제일 재미있었어요?

### F.6 Rúbrica (PROFE · 5 criterios, 20 % cada uno, con descriptores para A2.2)

| Criterio | 4 · Destaca | 3 · Lo logra | 2 · En camino | 1 · Empezando |
|---|---|---|---|---|
| **Fluidez** | 3 minutos sin leer, con los 5 movimientos; encadena con -는데, -기 때문에, 그런데; pausas breves | 2:30–3:30 sin leer; los 5 movimientos; algunas pausas | Menos de 2:30 o falta un movimiento; depende de la tarjeta | Lee o no sostiene el tema |
| **Precisión de las estructuras del curso** | 7 o más estructuras de Conversacional 2 bien formadas y bien elegidas (-(으)니까 vs -아서, -(으)ㄹ게요 vs -(으)ㄹ 거예요) | 5–6; 1–2 errores de forma que no confunden | 3–4, o errores que a veces confunden | Solo estructuras de Conversacional 1 |
| **Vocabulario y uso cultural** (opción (a) de la Fase 1) | Vocabulario del tema con naturalidad; explica con 옛날에는… 요즘은… y compara con cuantificador, sin estereotipos; registro adecuado (-(으)시- con mayores y jefes) | Vocabulario del tema; una comparación con cuantificador; registro correcto casi siempre | Vocabulario limitado; generaliza ("los coreanos…"); -(으)시- ausente o mal puesto | Muy limitado; estereotipos |
| **Pronunciación** | Clara; tensas, 받침, 경음화 y la nasalización de -네요 salen solas; ritmo de frase | Acento leve; todo se entiende | Errores que a veces confunden (ㅓ/ㅗ, tensas) | Difícil de entender |
| **Comprensión e interacción** | Entiende las preguntas a la primera; responde con 2+ frases, repara con cortesía si hace falta y hace una buena pregunta | Entiende con una repetición; responde; hace su pregunta | Necesita reformulación; respuestas de una frase | No sigue las preguntas |

**Puntaje** = suma de los 5 criterios (máx. 20). **Qué pieza informa cada criterio:** fluidez (pódcast) · precisión (pódcast + en vivo) · vocabulario y uso cultural (pódcast) · pronunciación (los dos) · interacción (en vivo). **Lista de chequeo (no suma, ordena el comentario):** hizo "antes y ahora" · comparó sin estereotipo · reparó con cortesía · hizo su pregunta · 해요체 constante · 감사했습니다 al profe. **Devolución:** informe individual (E.8), con una fortaleza primero.

---

## G. Biblioteca de materiales de Conversacional 2

### G.1 Lo que ya existe (verificado el 28 sept; lo de `D:\` es **solo lectura**: no se mueve ni se modifica)

| Archivo | Qué es | Sirve para | Veredicto |
|---|---|---|---|
| `Curriculo/publico/Programa_Conversacional2_A2-2.md` · `Programa_Completo_Octubre_2026/fuente/textos_generales.js` (`conv2`, `cefrRows`, FAQ) · `lib/nivel1.ts` (`CONVERSACIONAL_2`) | Lo anunciado al público ("Próximamente · enero 2027") | Punto de partida de temas, promesas y FAQ | **Manda en lo que ya dice**; lo que este diseño cambia está en I |
| `A2_Nivel_2/Programa_Cultura_10_Semanas/Decks/Semana06_Educacion_Suneung.pptx` | Deck de julio (9 láminas, trilingüe, plantilla de la casa): vocabulario (학교, 학원, 수능, 입학, 졸업, 성적, 합격하다, 떨어지다, 경쟁…), 3 claves culturales, gramática -(으)면 / -(으)려면 / -아/어야 되다 | S1–S2 | **Adaptar:** vocabulario y fotos sí; la gramática no es la de este diseño (-(으)려면 queda fuera; -(으)면 ya es de Conv1); las preguntas usan **당신 나라** (poco natural: → ___ 씨 나라에서는 / 칠레에서는; Fase 4 D-20); "todo el país se detiene" → "muchas cosas cambian ese día"; faltan 3 fotos ("사진을 추가하세요") |
| `…/Decks/Semana07_Trabajo_Hoesik.pptx` | Deck de julio: 회사, 사장님, 부장님, 선배, 후배, 동료, 회의, 야근, 회식, 건배, 따르다, 출근/퇴근, 예의; gramática **-(으)시-, -아/어도 되다, -(으)면 안 되다** (= la de la S3) | **S3** | **Adaptar** (es el que más calza): se suma -ㅂ니다; se corrige "당신 나라"; el dato "los jóvenes piden versiones más cortas" pasa a "muchos"; 수고하셨습니다 con matiz (a un superior, no) |
| `…/Decks/Semana08_Folclore_Mitos.pptx` | Deck de julio: 옛날이야기, 전설, 호랑이, 도깨비, 선녀, 나무꾼, 신, 왕, 나타나다, 사라지다, 변하다, 도와주다, 착하다, 욕심, 벌, 상; gramática -았/었었어요, -(으)니까, -네요/-군요 | **S6** | **Adaptar:** vocabulario y láminas culturales sí; la gramática del deck no es la de la S6 (-았/었었어요 sale; -(으)니까 y -네요 ya se vieron en S1 y S5); el ejemplo "날씨가 추우니까 나무꾼이 집으로 갔어요" usa -(으)니까 en narración pasada, donde lo natural es -아서 (추워서) ⚑ |
| `…/Decks/Semana09_Fiestas_Seollal_Chuseok_ABBY.pptx` + `TalkFile_korean_holidays_seollal_chuseok (1).pptx.pptx` (11 láminas) | Módulo de Abby: 음력, 설날 vs 추석, 떡국, 송편, 세배, 차례, 윷놀이, 강강술래, 세뱃돈, 명절; expresiones 새해 복 많이 받으세요, 건강하세요, 추석 잘 보내세요; gramática -(으)ㄴ 반면에, N보다, N처럼 | **S4–S5** | **Adaptar:** vocabulario, expresiones y láminas "설날 vs 추석" sí (base del espejo de la S5); **-(으)ㄴ 반면에 sale** (la Fase 1 §15.1 ya dudaba de su naturalidad y su nivel); 처럼 pasa a la S7; se suma "lo que cambia hoy" |
| `…/Decks/Semana10_KDrama_Medios.pptx` | Deck de julio: 주인공, 배우, 감독, 작가, 회, 시즌, 촬영지, 사랑에 빠지다, 헤어지다, 결말, 감동하다, 추천하다; gramática **discurso indirecto completo** + -았/었으면 좋겠다 + 것 같다 | **S7** | **Adaptar:** vocabulario sí; **el discurso indirecto sale** (es B1: Fase 1 §4.2 y §4.7); se suma 반말 · 처럼 · -게 되다 |
| `A2_Nivel_2/Programa_Cultura_10_Semanas/Academia_Seul_Programa_10_Semanas_Cultura_A2.pdf` · `A2_Nivel_2/Programa_Curso_Nivel2_A2_AcademiaSeul.pdf` | Esqueleto de julio del programa A2 de 10 semanas (en inglés, "culture is the carrier, grammar is the cargo") | Referencia de enfoque | Consulta; no se publica |
| `Desarrollo_Clases_2026-2.pdf` §4.2 · `Horarios_Equipo_2026-2.pdf` §4–5 | Plan interno anterior de A2.2 (8 clases: reconexión · M06 · M07 · Lab 3 · M08 · M09 · M10 · Lab 4) y horario tentativo (mié 21:00, Abby) | Calendario y orden | Este diseño se parece a ese plan (labs en S4 y S8); la línea "Certificado A2 completo · prep. TOPIK I-2" **no se usa** (A.3) |
| `Curriculo/Fase4_Conversacional1/alumnos/S01…S08_Material_Alumno.md` y `profes/` | Lo que los alumnos vieron en octubre | Kit de refuerzo (B0.4) · guía de estudio · continuidad | **Usar** como referencia; no se reenvía completo |
| `Curriculo/Fase2_Basico1/alumnos/S01_Material_Alumno.md` ("Teclado coreano en 5 minutos") | Guía de teclado | Mensaje de bienvenida (para externos) | **Reutilizar** |
| Blog: `app/blog/dangun-por-que-corea-nacio-de-una-osa` · `sopa-de-algas-antes-de-un-examen-supersticion-coreana` · `nunchi-el-arte-coreano-de-leer-el-ambiente` · `por-que-en-corea-no-existe-el-piso-4` · `hangul-el-alfabeto-mas-cientifico` | Artículos de la casa | Lectura previa opcional: Dangún (S6), sopa de algas (S2), 눈치 (S3: leer el ambiente en la oficina) | **Enlazar; no repetir** su contenido en clase |
| `Campana_Assets/instagram/octubre/chuseok/chuseok_01…08.png` (+ `octubre/00_chuseok_story.png`) | Carrusel de 추석 (25 sept 2026): qué es, 음력 8월 15일, fechas 2026, costumbres (incl. 한복 y 강강술래) | Repaso previo de la S5 | **Enlazar el post; no repetir** |
| `public/audio/kr/` · `Curriculo/audio/Clips_Octubre_2026.md` | Clips SunHi | 🔊 de toda la lista C y de las 24 frases clave | **Hecho el 28 sept:** 234 clips distintos comprobados (188 generados hoy con `scratchpad/clips_c2/gen.js`, misma voz y formato); ⚑ N-1: los nuevos no están en git; falta sumar la sección de Conversacional 2 al índice `Clips_Octubre_2026.md` (o crear `Clips_Enero_2027.md`) |
| `D:\Deskotop to D\2. Korean Clases\한국어 수업 A3\제10과 큰 소리로 이야기 하면 안돼요 21.03.31.pptx` (+ `.pdf`) | Clase de Jay (2021): -(으)면 안 돼요 y -(으)세요 honorífico (할머니는 댁에…, 진지 드세요) | S3 (reglas de la oficina) | **Consulta de Jay**; ideas de ejemplos, sin copiar láminas |
| `D:\…\한국어 수업 A3\제11과 아버지를 도와 드렸어 21.03.31.pptx` | Clase de Jay (2021): -아/어 드리다 y repaso de -아/어도 돼요 / -(으)면 안 돼요, en 반말 | S5 (제가 도와 드릴게요) · S7 | Consulta |
| `D:\…\한국어 수업 A3\제3과 주말에 할머니 댁에 가요.docx` | Clase de Jay (2021): invitación de 설날 a la casa de los abuelos (menú: 떡국, 전, 만두, 식혜…) | S4–S5 (la visita) | Consulta; buena idea de "invitación" para la tarjeta del Lab 3 |
| `D:\…\한국어 수업 A3\제8과 다음 주에 보는 게 어떄 21.03.29.pptx` · `제9과 모르는 말이 많아 21.03.31.pptx` | Clases de Jay (2021) en 반말 | S7 | Consulta. ⚑ el archivo del 제9과 muestra en sus primeras láminas el contenido del 제10과: revisar si es la versión correcta |
| `D:\…\한국어 수업 A3\한글학교 한국어 5.pdf` + `한글학교+한국어+5(교사용+지침서).pdf` | Libro de la serie de Básico 1 (nivel 5) y su guía docente | Consulta de secuencia | **Solo consulta**: no se escanea ni se distribuye |
| `D:\…\2. Korean Clases\Topik 1\64th-TOPIK-I-*.pdf` | 64.º TOPIK I oficial (cuadernillo, transcripción, respuestas) | Ítem TOPIK I de los quizzes (E.4) | Usar citando edición y número |
| `D:\…\2. Korean Clases\한국어 수업 교제\Korean Grammar in Use_ Beginning to Early Intermediate ( PDFDrive ).pdf` | PDF de la referencia gramatical | Consulta del profe por unidad | ⚑ **Es una copia descargada, no una edición comprada:** no se comparte ni se escanea; si el curso la cita, que sea por unidad y sobre un ejemplar legítimo (DECISIÓN DE JAY 13) |
| Lector (`/lector-coreano`) · Dubu (`/dubu`) · taller (`/taller`) | Ecosistema gratis | — | **No se asignan** (Fase 1 §14.2): entrenan decodificación de A1 |

### G.2 Lo que hay que producir para enero (regla N−2: el material de la semana N está listo al cierre de la semana N−2)

Producción redacta; el profe revisa la naturalidad del coreano (≈ 20 min por semana); Jay aprueba. Plantilla de la casa, azul `#4236F6`, cabeceras navy `#003478`, **nunca texto rojo**, sin romanización, imágenes propias o con licencia libre (Korea.net, 공공누리 tipo 1 ⚑), **nunca** escaneos de libros, letras de canciones, guiones de dramas, fotos de terceros ni artículos copiados. Deck **trilingüe** (coreano + glosa ES + glosa EN) con la lámina 0 fija (D). Como las fiestas de fin de año cortan la semana N−2 de la S1–S2, se adelanta al **viernes 18 de diciembre** ⚑.

| Prioridad | Pieza | Dónde va | Plazo [POR CONFIRMAR] |
|---|---|---|---|
| **P0** | **Aprobación de este diseño** + decisiones 1–5 de Jay (profe, día y hora, inicio, orden de temas, cupo) | — | **Antes de la preventa del lun 7 dic** |
| **P0** | **Página pública actualizada** (I.1) + ficha `conv2` en `cursos_es.json` / `cursos_en.json` + PDF de `/programas` (hoy no existe) | Repo | lun 7 dic |
| **P0** | Micro-diagnóstico de 12 ítems + guion del audio guiado (B0.2), para externos | Form + WhatsApp | lun 7 dic |
| **P0** | Guía S1 + material S1 + **deck S1** (lámina 0, escalera A2.2, -(으)니까 y -죠, cultura escolar) + **tarjeta de entrevista** + tarjeta de lectura + ficha "un día en un 고등학교" + planilla del diagnóstico | `profes/S01…` · `alumnos/S01…` · Drive | **vie 18 dic** |
| **P0** | Guía S2 + material S2 + deck S2 (desde Semana06) + **lámina "mapa de las 3 razones"** + tarjetas de postura + titulares recreados + guion del monólogo A4 "el día de mi 수능" | `S02…` | **vie 18 dic** |
| **P0** | Mensaje de bienvenida (D.3) + guía de teclado para externos | WhatsApp | lun 11 ene |
| **P0** | Registro del curso con columnas separadas (E.2) | Drive | antes de la S1 |
| **P0** | **Push a `main` de los 188 clips nuevos** (⚑ N-1) + índice de clips de Conversacional 2 | `public/audio/kr` · `Curriculo/audio/` | antes de la S1 |
| **P0** | Si enseña Abby: **traducción al coreano** de las guías S1–S2 (explicaciones; los 🗣️ ya están) + mensaje con los ajustes | `profes/` | vie 18 dic |
| P1 | Guía + material + deck S3 (desde Semana07) + tarjetas A/B/C + plantilla de 명함 + correo de bienvenida en -습니다 + guion del mensaje de voz del 과장님 + **guía de estudio S1–S3** | `S03…` · `alumnos/C2_Guia_Estudio_S1-S3.md` | vie 15 ene |
| P1 | Lab 3: 3 tarjetas de estación + tarjeta final (설날, regalo de 10만 원) + calendario del 설 연휴 + tarjeta de 설날 + planilla de pronunciación + formulario de autoevaluación | `S04…` · `alumnos/C2_Tarjetas_Lab3.md` | vie 22 ene |
| P1 | Guía + material + deck S4–S5 (desde Semana09 de Abby + TalkFile) + "El 설날 de Minji" + cuadro de 3 columnas + guion del monólogo "mi 설날" | `S05…` | vie 29 ene |
| P1 | Banco de comentarios bilingüe (≈ 30 líneas ES/KO: fortalezas, focos, siguientes pasos) | `profes/C2_Banco_Comentarios.md` | vie 29 ene |
| P1 | Guía + material + deck S6 (desde Semana08) + **6 láminas de 해와 달이 된 오누이 (ilustración propia)** + **cuento recontado en 한다체** + tabla de conversión + plantilla de 원고지 | `S06…` | vie 5 feb |
| P1 | Guía + material + deck S7 (desde Semana10) + diálogo original del paso al 반말 (grabado por el equipo) + enlaces a tráileres oficiales + reseña en 한다체 + **consigna del proyecto** (F.1) | `S07…` · `alumnos/C2_Proyecto_Final.md` | vie 12 feb |
| P1 | Lab 4 + proyecto: tarjetas de reserva + planilla de la rúbrica + plantilla del informe individual + banco de preguntas (F.4b) + formulario de autoevaluación final y encuesta | `S08…` · `profes/C2_Proyecto_Final_Profe.md` | vie 19 feb |
| P1 | Quizzes 1–6 con clave + ítems TOPIK I seleccionados (⚑ N-3) | En cada guía (PROFE) | N−2 |
| P1 | 6 monólogos A4 (60–90 s; guion de producción, los graba el profe en 5 min) | Drive + grupo | N−2 |
| P1 | 8 clips `C2_S0N_frases_clave.mp3` (recorte del coro) | Drive + grupo | 48 h después de cada clase |
| P1 | Plantilla del certificado con la línea de nivel que Jay decida | Jay | antes de la S8 |
| P2 | Audioteca A5 (conversación no ensayada entre dos nativos del equipo, también contenido de marca) · paquete de salida de Conversacional 2 (§2.3 de la Fase 1) para el tramo B1 | — | 2027 |

*No se producen:* los audios y pódcasts de los alumnos, sus fotos, ni las fotos personales del profe para los monólogos (las elige el profe).

### G.3 Carpetas, nombres y estructura común
- `Curriculo/Fase5_Conversacional2/00_Diseno_Conversacional2.md` · este documento (interno, en español).
- `Curriculo/Fase5_Conversacional2/profes/S0N_Guia_Profesor.md` · **en español con todo lo que dice el profe en coreano** (recuadros 🗣️) y los recuadros 📋 en español (sección 0, regla 3). Si enseña Abby: `S0N_Guia_Profesora_KO.md` (traducción). Piezas transversales: `profes/C2_<Pieza>.md`.
- `Curriculo/Fase5_Conversacional2/alumnos/S0N_Material_Alumno.md` · **en español con el coreano en 한글**, sin romanización, sin respuestas ni notas internas. Piezas transversales: `alumnos/C2_<Pieza>.md`.
- **Audio en los materiales:** 🔊 fila por fila en la sección 2 y en las 3 frases de la sección 10, con `[🔊](https://www.academiaseul.com/audio/kr/<hex del UTF-8 del texto>.mp3)` (sin el punto ni el "!" final; el "?" se mantiene). La tarjeta de lectura de la S1 **no** lleva audio, a propósito (mide la lectura).
- En Drive, lo que se sube después de cada clase: `Conv2_S01_2027-01-13_Escuela.pdf` (fecha de Chile si enseña Jay; de Corea si enseña Abby) [POR CONFIRMAR].

---

## H. Control de calidad (brief §22) aplicado a Conversacional 2

| Criterio | Estado en este diseño | Pendiente para los redactores |
|---|---|---|
| **Coreano correcto y natural** | Todas las frases son originales y en 해요체 salvo donde se enseña otro registro (-ㅂ니다 en S3; 반말 pactado en S7; 한다체 solo para leer y en el 일기); 띄어쓰기 cuidado (가고 싶어 해요, 좋아하게 됐어요, 할 수도 있죠, 먹을 때, 갔을 때, 하나밖에); honoríficos coherentes (nunca -(으)시- sobre uno mismo; 할머니께서 … 드셨어요); los dudosos llevan ⚑ y están reunidos al final | Jay revisa cada guía y cada hoja; si enseña Abby, ella revisa la naturalidad; los ⚑ se resuelven antes del N−2 de su semana |
| **Nivel adecuado** | Nada de B1 en producción: discurso indirecto (solo -다고 생각해요 como fórmula con adjetivos), -더라고요, -거든요, -아/어지다, -는데 de contraste, -아/어 드리다 como sistema, -(으)ㄴ 반면에 (sale del deck de Abby), -았/었었어요 (sale del deck de mitos) | Revisar que ningún ejemplo "se escape" (típico: 했더라고요, 한다고 했어요, 바빠졌어요, 가 보니까) |
| **Español correcto** | Neutro latinoamericano con puentes de Chile, México, Colombia, Perú, Argentina y Uruguay | Revisión de estilo con la voz de la marca |
| **Cultura precisa y sin estereotipos** | Cada semana con capa, puente y matiz; regla editorial de la Fase 1 §10.4 (cuantificadores, sin "siempre/nunca"); temas sensibles con la regla 13 de la sección 0; datos verificables marcados ⚑ (límite horario de los 학원, 주 52시간, guía del 차례 de 2022, 1인 가구, Carnaval 2027, 설문대할망) | "Muchos", "en Seúl", "en muchas familias"; nunca "los coreanos" + verbo |
| **No repetir lo ya publicado** | Blog (Dangún, sopa de algas, 눈치) y carrusel de 추석 se enlazan; las clases van al paso siguiente (cómo funciona, qué cambia, cómo se dice) | Revisar cada nota cultural contra esas piezas |
| **Calidad pedagógica** | Ciclo R-C-G-L por semana; **cada misión prepara la clase siguiente con destino exacto** (colegio → examen importante → trato en el trabajo → Año Nuevo y guía de estudio → foto del 설날 → leyenda de tu país → drama → guion y pódcast) | La guía marca las 4 etapas, el apoyo y el reto |
| **¿El alumno habla coreano en clase?** | ≥ 50 % en todas las clases (B.1): 58–92 %; 2 labs; tareas de sala con resultado | Conteo conservador en el punto 0 de cada guía |
| **Carga cognitiva** | ≤ 3 estructuras nuevas por clase, 0 en S4 y S8 (B.11); misiones de 25–30 min | En semanas de 3, una sola producción larga |
| **Continuidad** | B0.1 (salida real de Conversacional 1, incluido lo que **no** se produjo: -아/어야 해요), B.11 (nada antes de enseñarse; tabla de reciclaje), B.12 (semillas de B1) | Usar C hasta tu semana + la lista C de Conversacional 1 |
| **Autenticidad** | Frases que se dicen: 식사하셨어요? · 먼저 들어가 보겠습니다 · 명절 잘 보내셨어요? · 제가 설거지할게요 · 떡 하나 주면 안 잡아먹지 · 호랑이 담배 피우던 시절에 · 말 놓을까요? · 좋은 질문이네요 | Preferir la forma natural del mismo nivel a la "de libro" |
| **Separación profe / alumno** | Claves, notas, rúbricas y banco de preguntas solo en `profes/`; en el material, solo consignas y textos | Revisarlo en el control final de continuidad |

---

## I. Diferencias con lo ya anunciado en el programa público "Próximamente" (qué hay que actualizar)

### I.1 Semana por semana

| S | Página pública (`Curriculo/publico/Programa_Conversacional2_A2-2.md`) | Este diseño (Opción A) | ¿Cambia algo público? |
|---|---|---|---|
| 1 | La escuela en Corea + reencuentro y repaso; entrevista y "allá y acá" | Igual + diagnóstico | No |
| 2 | El día del 수능; mini-debate | Igual | No |
| 3 | La vida en la oficina; "primer día en una empresa coreana" | Igual | No |
| 4 | **Mitos y leyendas**; cuento en cadena | **Lab 3 + "se viene el 설날"** | **Sí** |
| 5 | 설날; visita de 설날 a una familia | 설날, **contado después del feriado**, con la visita completa + **추석 como espejo** + "la fiesta de mi familia" | Sí (suma el 추석) |
| 6 | **추석**; "la fiesta de mi familia" | **Mitos y leyendas** (el cuento en cadena de la antigua S4) | **Sí** |
| 7 | K-drama y la Corea de hoy; club del drama | Igual + role play del paso al 반말 | No |
| 8 | Proyecto final: presentas un tema y conversas | **Lab 4** + proyecto (pódcast enviado antes + conversación en vivo) | Precisión |

### I.2 El 추석 y el orden: DECISIÓN DE JAY 4

- **Opción A (recomendada, la de este diseño):** Lab 3 en S4 (tres días antes del 설날), 설날 en S5 con el 추석 como espejo, mitos en S6. **Ventajas:** el 설날 se prepara antes y se cuenta después, como en la vida real; el curso gana los dos labs que el brief no tenía (A2.1 tiene dos); la mitad del curso tiene su evidencia (Lab 3); no hay una semana de 추석 siete meses antes de la fiesta. **Costo:** cambian dos filas de la página pública (S4 y S6).
- **Opción B (conservadora):** S4 mitos (con una cápsula de 10' sobre el 설날 al cierre: el 까치호랑이 como pintura de Año Nuevo ⚑), S5 설날 + 추석 como espejo, **S6 Lab 3** ("명절과 옛날이야기": estaciones de S1–S5), S7 K-drama, S8 Lab 4 + proyecto. **Ventajas:** la página pública solo cambia la S6 (추석 → Lab 3). **Costos:** el lab de mitad llega tarde (S6), el 설날 no se prepara la semana anterior y la S4 (mitos, con -는데 y 밖에) cae antes del 설날, así que la S5 no puede usar -는데 para contar.
- **Opción C (no recomendada):** mantener la semana propia de 추석 en S6: sin labs, dos fiestas seguidas y una fuera de temporada (Fase 1 §10.6 y §15 #31).

### I.3 Otros textos públicos que hay que tocar (antes de la preventa del 7 de diciembre)

| Dónde | Hoy dice | Propuesta | Decisión |
|---|---|---|---|
| Página pública · "Programa de 8 semanas" y "Corea que descubrirás" | Orden del brief; "El detalle de gramática de cada semana: Confirmar" | Tabla de I.1 (Opción elegida) + una línea por semana con la función (no la lista de gramática) | 4 |
| Página pública · "Semana 6 · 추석" | Texto de 추석 con sets de regalo de Spam, 강강술래, refrán | Pasa a la semana del 설날 como "espejo", con "lo que cambia hoy" | 4 |
| Página pública · "Semana 4 · Mitos" | Dangún en detalle (osa, tigre, cueva, 쑥 y 마늘) | Pasa a la S6; el detalle de Dangún se deja al blog y el texto va a 해와 달이 된 오누이 y al tigre de los cuentos | 4 |
| Página pública · "¿Cómo funcionan las clases?" · Idioma | "Confirmar" | "La clase es casi toda en coreano; el español está escrito en las slides, en el chat y en tu hoja" (D) | 7 |
| Página pública · Horario, profe, inicio, cierre | "Por anunciar" | Datos de Jay (calendario tentativo) | 1, 2, 3 |
| Página pública · Cupos | "Confirmar" | 15 por sección | 5 |
| Página pública · Certificado | "Requisitos exactos: Confirmar" | La regla que Jay decida para enero (E.2) + línea de nivel (A.3) | 8 |
| Página pública · "¿Puedo entrar sin Conversacional 1?" | "Confirmar" | Audio guiado + micro-diagnóstico antes de pagar (B0.2) | 6 |
| Página pública · "Qué vas a aprender" | Ejemplos: 고등학교 때 저는 매일 교복을 입고 학교에 갔어요 · 시험이 한 번밖에 없어서 학생들이 너무 힘든 것 같아요 · 옛날 옛적에 호랑이 한 마리가 살았어요 · 과장님, 식사하셨어요? | **Se mantienen** (son naturales y calzan con el diseño; 밖에 y -아서 ya los trae el curso) | — |
| Página pública · FAQ "¿El certificado es oficial?" | "el nivel A2.2 corresponde aproximadamente a un TOPIK I nivel 2" | Mantener con "como referencia orientativa" (ya lo dice) | — |
| `textos_generales.js` · `cefrRows` (ES/EN) | Conversacional 2 = "TOPIK I nivel 2 alto" | "Orientativo: TOPIK I nivel 2" o quitar "alto" (Fase 1 §3.4) | 8 |
| `textos_generales.js` · FAQ "¿Qué pasa cuando termino?" | "enero 2027: Básico 1, Básico 2, Conversacional 2, Niños 2" | Sumar **Conversacional 1** (`Horarios_Equipo_2026-2` §5 lo abre en enero) | 3 |
| `Programa_Completo_Octubre_2026/fuente/cursos_es.json` / `cursos_en.json` | No hay ficha de A2.2 | Ficha nueva (8 semanas desde B, evaluación desde E) para generar el PDF de `/programas` | 3 |
| `lib/nivel1.ts` · `CONVERSACIONAL_2` | "enero 2027", `href: /notificarme?curso=conversacion` | Cuando haya horario: pasa a ser una `Clase` con día, hora, profe y links de pago (precio único) | 1, 2 |
| `Desarrollo_Clases_2026-2` §4.2 (interno) | "Certificado A2 completo · prep. TOPIK I-2" | No usar (A.3) | 8 |

---

## Decisiones para Jay

| # | Decisión | Opciones | Recomendación | Plazo |
|---|---|---|---|---|
| 1 | **Profe** de Conversacional 2 | (a) Abby (tentativo en `Horarios_Equipo_2026-2`) · (b) Jay · (c) otra persona | (a) si Abby puede sumar una segunda clase en enero (el mismo documento prevé "2 en enero con A2.2"): da continuidad a la cohorte que viene de ella. El diseño sirve para (b) sin cambios | **Antes de la preventa del lun 7 dic** |
| 2 | **Día y hora** | (a) mié 21:00 Chile = jue 09:00 KST (tentativo) · (b) mar 21:00 (el de Conversacional 1, si Conversacional 1 de enero va otro día) · (c) otro | (a); evitar el lunes (la S5 caería en el feriado sustituto de Corea) | lun 7 dic |
| 3 | **Semana de inicio** (define dónde cae el 설날; Fase 1, decisión 11) | 4, 11 o 18 de enero | **Semana del 11 de enero**; cierre de matrícula dom 10 ene | lun 7 dic |
| 4 | **Orden de temas y el 추석** | Opción A · B · C (I.2) | **A** | lun 7 dic |
| 5 | **Cupo** | 15 (como adultos de octubre) · otro | 15 | lun 7 dic |
| 6 | **Entrada sin Conversacional 1** y qué pasa con quien sale de Conversacional 1 con refuerzo | Audio guiado + micro-diagnóstico (B0.2) · solo egresados | Abrir a externos con la prueba de B0.2, antes del pago; egresados con refuerzo entran con el kit | lun 7 dic |
| 7 | **Política de idiomas** | 90/10 (Abby) · 85/15 (profe bilingüe) (D.1) | La que corresponda al profe; publicar "casi toda en coreano" | lun 7 dic |
| 8 | **Certificado:** regla, pesos y línea de nivel | Pasaporte Chingu (Fase 1 §11.2–11.3) · fichas · kits | **[regla del certificado: pendiente de decisión de Jay]**; línea: "contenidos de la segunda etapa del nivel A2 (MCER)" | lun 7 dic |
| 9 | ¿**Quién produce** las 8 guías, los 8 materiales y los 6 decks adaptados? | Producción en borrador → profe revisa → Jay aprueba (como en octubre) | Igual que octubre; P0 el vie 18 dic | Antes del lun 7 dic |
| 10 | Cómo recupera un quiz quien falta | Nota de voz con las 5 preguntas antes del domingo | Igual que Conversacional 1 | Antes de la S2 |
| 11 | **Temas sensibles** (sección 0, regla 13) | Tratar presión escolar, estrés de las fiestas y jerarquía sin cifras ni casos; natalidad, Corea del Norte, religión y política fuera salvo pregunta | Sí | Antes de la S1 |
| 12 | **Grabaciones y privacidad:** salas del proyecto, pódcasts compartidos con el grupo | Sin grabar las salas (el pódcast es la evidencia) · compartir solo con permiso escrito | Sí | Antes de la S7 |
| 13 | *Korean Grammar in Use*: el PDF de `D:\…\한국어 수업 교제\` es una copia descargada | Citar solo por unidad sobre un ejemplar legítimo · no citarlo | Citar por unidad; no distribuir ni escanear | Antes de la S1 |
| 14 | Fecha de certificados y preventa de la cohorte siguiente | lun 8 mar (patrón de octubre) · otra | lun 8 mar ⚑ | Con el calendario |
| 15 | ¿Se abre el **Intermedio B1** después de esta cohorte? (Fase 1, decisión 8) | Sí, en la cohorte siguiente · más adelante | Decidirlo antes de la S7, para que el informe y la invitación del cierre digan algo concreto | Antes de la S7 |

---

## ⚑ Para revisión nativa y verificación (Jay; segunda opinión de Abby para usos muy actuales de Corea)

Plazo general: antes del N−2 de su semana (S1–S2: vie 18 dic · S3: vie 15 ene · S4: vie 22 ene · S5: vie 29 ene · S6: vie 5 feb · S7: vie 12 feb · S8: vie 19 feb) [POR CONFIRMAR]. **Si Jay cambia una frase con 🔊, se genera su clip nuevo** (el nombre del archivo es el hex del texto) y se corrige en la guía, en el material y en C.

### 1 · Coreano

| # | Dónde | Qué confirmar |
|---|---|---|
| K-1 | S1 · -(으)니까 | La regla práctica "en frases informativas a un superior, -아서 suena más suave que -(으)니까" (바빠서 못 가요 / 바쁘니까 못 가요) |
| K-2 | S1 · tarjeta | "크리스마스하고 새해에 뭐 했어요?" como primera pregunta del reencuentro (¿mejor 연말 잘 보냈어요?) |
| K-3 | S2 | "떨어졌어요… 괜찮아요, 다음에 잘하면 돼요" como consuelo natural; "제 생각에는 시험 하나가 너무 중요한 것 같아요" |
| K-4 | S3 | La respuesta del jefe a 식사하셨어요? sin -시- ("네, 먹었어요. ___ 씨도 식사했어요?"); 시간 있으세요 frente a 계세요 como única nota de 있다 |
| K-5 | S4 | La respuesta del mayor "그래, 너도 새해 복 많이 받아라" (reconocimiento); "다시 한번 말씀해 주시겠어요?" como fórmula de A2.2 |
| K-6 | S5 | "제가 설거지할게요. 할머니는 좀 쉬세요." · "괜찮아, 앉아 있어." · "할머니는 손주들을 보고 싶어 하세요" |
| K-7 | S6 | "엄마가 고개를 넘는데 호랑이가 나타났어요" · "호랑이 담배 피우던 시절에" · el recuento del cuento en 한다체 (original de producción) |
| K-8 | S7 | "우리 말 놓을까요? — 좋아, 말 놓자!" (¿el paso inmediato al 반말 suena natural o cómico?) · "재미있다고 생각해요" como fórmula |
| K-9 | S8 · F.4 | El modelo completo del pódcast, en particular "고기를 한 점밖에 못 먹었어요" y "짧은 회식을 좋아하는 직원도 많아요. 퇴근 후 시간도 중요하니까요." |
| K-10 | G.1 | El ejemplo del deck de mitos "날씨가 추우니까 나무꾼이 집으로 갔어요" (-(으)니까 en narración pasada: ¿cambiar a 추워서?) |

### 2 · Datos y fuentes (no son de coreano)

| # | Dónde | Qué verificar |
|---|---|---|
| D-1 | Hechos fijos | 설 연휴 2027 (sáb 6 – mar 9 feb, con feriado sustituto el 9) en el calendario oficial; fecha del cambio de hora de Chile en abril de 2027 |
| D-2 | Calendario | Carnaval 2027 (lun 8 y mar 9 feb) en los países de los alumnos; 정월대보름 = dom 21 feb 2027 |
| D-3 | S1 | Límite horario de los 학원 en Seúl (hora y alcance) · "uniformes más cómodos" como tendencia · 한글학교 en Santiago y Buenos Aires (Jay) |
| D-4 | S2 | Cómo describir 수시/정시 sin cifras; cómo decir con precisión el ingreso sin examen nacional en universidades públicas argentinas |
| D-5 | S3 | Ley de la semana de 52 horas (año y alcance) · empresas que eliminan los cargos en el trato (sin nombrar empresas salvo fuente) |
| D-6 | S5 | Guía de 2022 para simplificar el 차례 (fuente exacta) · 떡국 / 떡만둣국 por región · el 설날 en Patronato (Jay) |
| D-7 | S6 | 설문대할망 (Jeju) · el 까치호랑이 como pintura de Año Nuevo (solo si se usa la Opción B) |
| D-8 | S7 | Cifra de hogares de una persona (solo con fuente oficial, o sin cifra) · que los tráileres elegidos sigan públicos |
| D-9 | G.1 | ¿El archivo "제9과 모르는 말이 많아" es la versión correcta? (sus primeras láminas son las del 제10과) |

### 3 · Producción y técnica

| # | Qué |
|---|---|
| N-1 | **Push a `main` de los 188 clips nuevos** de `public/audio/kr` (generados el 28 sept para C y B.14): sin eso, los 🔊 dan 404 en el sitio. Sumar la sección de Conversacional 2 al índice de clips |
| N-2 | Las piezas `C2_*` (guía de estudio, tarjetas del Lab 3, banco de comentarios, proyecto alumno/profe, diagnóstico, quizzes TOPIK) **todavía no existen**: están en G.2 con sus plazos |
| N-3 | Selección de los 6 ítems TOPIK I (edición y número; validación de Jay) |
| N-4 | Revisión del modelo de pódcast (F.4) antes de la S7 |
| N-5 | Si enseña Abby: traducir las guías al coreano y enviarle un mensaje con lo que difiere de su deck de 명절 (-(으)ㄴ 반면에 fuera; 처럼 en la S7) |
