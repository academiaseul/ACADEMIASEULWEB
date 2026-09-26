# Fase 1 · Arquitectura académica de Academia Seúl
### Del cero al TOPIK II: cómo encaja todo, qué falla y qué cambiamos

**Documento interno de Dirección Académica · versión 1 · 26 de septiembre de 2026**
Para Jay. Las partes marcadas **[Para profes]** se pueden reenviar a Kiran y Abby. Nada de este documento es material para alumnos.

> **Cómo leer este documento**
> - **[YA]** = se aplica en la cohorte de octubre 2026 **sin cambiar nada publicado** (notas internas, lo que la profe dice en clase, tarjetas extra, cómo se asigna una herramienta).
> - **[ENE]** = arquitectura desde enero 2027 (fichas, PDFs, exámenes, cursos nuevos).
> - **[2027]** = producción más larga (cambios en el Lector y Dubu, audioteca, tramo B1).
> - **DECISIÓN DE JAY** = todo lo que toca nombres, precios, horarios, políticas o textos públicos. Aquí solo se recomienda.
> - **⚑** = coreano o dato que hay que validar con un nativo del equipo (Jay, Kiran, Abby) o con una fuente antes de usarlo.
> - Citas: `a12 · S7` = `Programa_Completo_Octubre_2026/fuente/cursos_es.json`, Básico 2, semana 7. Cursos: `a11` Básico 1 · `a12` Básico 2 · `a21` Conversacional 1 · `topik2` TOPIK II · `ninos` Coreano para Niños.
> - Base: cuatro análisis internos del 26 de septiembre (gramática y CEFR · habilidades · cultura y Niños · evaluación y materiales). Juntos revisaron `cursos_es.json`, `lib/nivel1.ts`, `textos_generales.js`, términos, privacidad, FAQ, `/test-nivel`, el Lector, Dubu, los 563 clips de audio, las 230 flashcards de julio, los kits de Kiran y Abby, las guías de alumnos y familias, los decks de A2 y la clase 1 de TOPIK II.

**Hechos fijos de la cohorte de octubre 2026 (hora Chile, UTC-3). No se tocan.**

| Curso | Día y hora | Profe | 1.ª clase | Notas |
|---|---|---|---|---|
| Básico 1 (A1.1) · "Primeras Palabras · 첫 한국어" | mar 20:00 **o** jue 20:00 | Kiran | mar 13 / jue 15 oct | Libro 한글학교 한국어 1 |
| Básico 2 (A1.2) · "Pasado, presente y futuro · 기초 한국어 2" | mié 21:00 | Jay | mié 14 oct | Referencia: *Uso de la gramática coreana · Nivel inicial* |
| Conversacional 1 (A2.1) · "Corea que amas · 회화 A2.1" | mar 21:00 (= mié 09:00 en Corea) | Abby | mar 13 oct | Módulos propios |
| TOPIK II (B1+) | jue 21:00 | Jay | jue 15 oct | Máximo 8 |
| Coreano para Niños (8–15) | lun 18:00 | Jay y Abby | lun 19 oct | El 12 es feriado en Chile; termina el 7 dic |
| Conversacional 2 (A2.2) · "Corea por dentro · 회화 A2.2" | enero 2027 | — | — | Sin syllabus todavía |

8 semanas · 1 clase de 60 min por semana · Zoom · "US$150 el curso completo · o 2 cuotas de US$75" · cierre de matrícula el domingo 11 de octubre.
Semanas de adultos: S1 12–16 oct · S2 19–23 · S3 26–30 · S4 2–6 nov · S5 9–13 · S6 16–20 · S7 23–27 · S8 30 nov–4 dic. Niños: S1 lun 19 oct → S8 lun 7 dic.

---

## 0. Resumen ejecutivo para Jay

**Qué está bien (y hay que proteger)**
- **Hangul desde el día 1 con audio nativo.** El Lector y Dubu llevan de la letra a la palabra mejor que casi cualquier curso online. Ningún syllabus usa romanización.
- **Speaking-first de verdad en la estructura.** Los 20 minutos de pares no se recortan, y Conversacional 1 es un curso modelo: la cultura *es* la tarea (pedir en el 식당, planear Jeju, discutir sobre e-sports).
- **La espiral hacia atrás funciona.** Cada curso abre reactivando el anterior (A1.2 S1, A2.1 S1, TOPIK II S1).
- **TOPIK II es un buen curso de estrategia**, honesto con el alumno ("si sacas 0 de 3, te recomendamos Conversacional").
- **Niños tiene buena base:** bloques cortos, dos profes, salas de 6, nota semanal a la familia, evaluación sin notas y una guía de privacidad para familias.

**Los 5 problemas más importantes**
1. **Falta el peldaño B1.** TOPIK II pide "B1, un peldaño por encima de A2.2", pero ese peldaño no existe. Además da por sabidos -(으)니까 y el 한다체, que ningún curso enseña. Nadie puede llegar a TOPIK II desde la escalera.
2. **Prometemos más de lo que las horas dan, y con dos reglas distintas.** Cada curso son 8 h en vivo (unas 15–22 h con tarea). Aun así, el certificado de Básico 2 dice "CEFR A1 completo (A2 parcial)", el de TOPIK II "CEFR B1+", y Básico 1 promete en la web "decir la hora", que el curso no enseña. Además conviven dos reglas de certificado: la de los términos, el FAQ y los kits, y otra más estricta en las fichas por curso.
3. **Lo más útil llega tarde y algunas semanas revientan.** Pedir y comprar (주세요, 얼마예요), "quiero" (-고 싶다), la petición cortés -(으)세요 y el honorífico -(으)시- llegan en A2.1 o nunca. Básico 2 S7 mete 9 partículas en una hora. En Básico 1, el examen se rinde antes de la clase que enseña 좋아해요.
4. **Escuchar, escribir y el vocabulario no tienen escalones.** No hay ni un audio de frases antes de A2.1: de los 563 clips, solo uno es una frase. El teclado coreano se exige desde la S1 y nadie lo enseña. El párrafo y el 한다체 aparecen recién en TOPIK II. Las listas suman unas 280 palabras de cero a A2.1, contra las 800 que nuestra propia guía pide para A1. La romanización no tiene fecha de salida: el Lector y Dubu la usan como clave de respuesta.
5. **La operación de octubre está al límite.** Niños no tiene material de clase y su rango 8–15 no está diseñado para los de 13–15 (no pueden ni decir su edad con lo que se enseña). Los decks de Conversacional 1 no calzan con la gramática publicada (M01 es el 20 de octubre). Jay suma unas 13–19 h semanales entre clases, corrección y coordinación, antes de producir nada.

**Las 5 recomendaciones más importantes**
1. **Una sola regla, honesta.** "El código CEFR describe el tramo del temario, no el nivel logrado." Marco de evaluación único **Pasaporte Chingu** (Clase 40 · Misiones 25 · Proyecto 35) y certificado por **6 de 8 clases + proyecto final**. La nota solo decide el pase directo. En octubre ya se aplica la regla general, que es la que conocen alumnos y profes y la que no contradice los términos. *(DECISIÓN DE JAY)*
2. **Redistribuir la gramática para enero, sin engordarla.** Mismos temas, mismo libro, mismos módulos: pedir, comprar y querer entran en A1; honoríficos, -(으)니까 y 한다체 de reconocimiento en A2.2; **máximo 3 estructuras nuevas por clase y ninguna semana 8 con gramática nueva.**
3. **Construir el tramo Intermedio B1 (2 × 8 semanas)** y presentar TOPIK II como un *track* paralelo con diagnóstico **antes** del pago.
4. **Escaleras de habilidades con lo que ya tenemos:** Audioteca Chingu (empieza con "las 3 frases clave" de cada clase, recortadas del coro de cierre en la grabación de Zoom), guía de teclado, política de romanización por curso, las 230 flashcards como "Núcleo A1" y escritura escalonada hasta el 일기 en 한다체 en A2.2.
5. **Niños con diseño propio:** salas por edad ya; decidir para enero entre un grupo 8–15 o Niños (8–11) + Teens (12–15); alinear en 14 años la entrada a adultos; cerrar las grietas de privacidad; syllabus de Niños 2 antes de la venta de enero.

**Qué NO cambia para octubre**
Nombres, precios, horarios, profes, fechas, 8 semanas de 60 min, el syllabus publicado (temas y gramática por semana), los PDFs de `/programas`, el libro de Kiran y los módulos de Abby. Todo lo marcado [YA] se hace *dentro* de lo publicado: adelantar algo como fórmula, dar una tarjeta extra, matizar un dato cultural en voz, cambiar qué pestaña del Lector se pide.
**Excepciones que se comunican por escrito:** el sorteo del monólogo de A2.1 (la ficha dice "domingo 22"; si pasa al cierre de la S7, aviso en el grupo en la S6) y el formato del show de Niños (si la lectura y la comprensión pasan a las salas antes de que entren las familias, aviso a los apoderados antes de la S7, porque la ficha y la guía para familias dicen que las tres partes son "ante las familias").

**Cuatro decisiones que no pueden esperar al 13 de octubre:** (0) decks de Básico 1 en formato de 60 min: ¿existen? (`Horarios_Equipo_2026-2` los da por listos; en el repo no están) · (1) qué regla de certificado se aplica en octubre · (2) quién rehace M01 de Conversacional 1 (clase del 20 de octubre) y el kit de la clase 1 de Niños (19 de octubre) · (3) TOPIK II: diagnóstico por WhatsApp antes del cierre de matrícula (dom 11 oct). Detalle y plazos en "Decisiones para Jay".

---

## 1. Ruta de aprendizaje de Academia Seúl

### 1.1 La idea en una frase
**Primero lees y te presentas, después usas el coreano para lo que amas de Corea, después entiendes cómo funciona Corea por dentro, y recién ahí conviertes tu nivel en puntaje TOPIK.** Siempre con gente (친구) y hablando desde la primera clase (말하기).

### 1.2 Las etapas

| Etapa | Cursos | Tramo MCER (del temario) | Pregunta que responde | Estado |
|---|---|---|---|---|
| **Puerta gratis** | Taller en video (`/taller`) · Lector (`/lector-coreano`) · Dubu (`/dubu`) · Test (`/test-nivel`) | — | "¿Puedo con el coreano?" | Publicado |
| **Etapa 1 · Leo y me presento** | Básico 1 (A1.1) → Básico 2 (A1.2) | A1 | "¿Puedo hablar de mí, de mi día y de mis planes?" | Publicado |
| **Etapa 2 · Uso el coreano** | Conversacional 1 (A2.1) → Conversacional 2 (A2.2) | A2 | "¿Puedo conversar sobre lo que me gusta y entender cómo funciona Corea?" | A2.1 publicado · A2.2 enero 2027 |
| **Etapa 3 · Corea real** | Intermedio B1.1 → B1.2 (nombre: DECISIÓN DE JAY) | B1 | "¿Puedo contar, explicar, citar y escribir un párrafo?" | **Por crear** |
| **Track examen** | TOPIK II (B1+) | Examen | "¿Cómo convierto mi nivel en puntaje?" | Publicado |
| **Track Niños** | Niños (8–15) → Niños 2 → [Teens 12–15, a decidir] → Básico 1 desde los 14 | Pre-A1 (sin etiqueta) | "¿Mi hijo/a puede leer y jugar en coreano?" | Niños publicado · Niños 2 prometido para enero, sin syllabus |

### 1.3 Los cuatro pilares a lo largo de la ruta

| Pilar | Niños | Etapa 1 (A1) | Etapa 2 (A2) | Etapa 3 (B1) | TOPIK II |
|---|---|---|---|---|---|
| **한글** | Leer sílabas y palabras jugando | Decodificar todo; leer frases y carteles | Leer textos auténticos cortos (menú, metro, reseñas) | Textos conectados, 한다체 | 읽기 1–50 con estrategia |
| **말하기** | Mini-show de 30–60 s | Presentarse, rutina, pasado y planes; 5 min en pares | 5 min con una nativa sin volver al español | Narrar, citar, argumentar | Oral 10 % (el examen no lo mide) |
| **문화** | Corea que se juega | Corea en la vida diaria / en el tiempo | Corea que amas / Corea por dentro | Corea real | Corea en debate |
| **친구** | Salas de 6, familia en el show | Pares, grupo de WhatsApp | Labs de conversación | Proyectos en grupo | Grupo de 8, corrección entre pares |

### 1.4 Reglas de la ruta (propuestas [ENE])
1. **Se entra por diagnóstico, no por autodeclaración** (§12).
2. **La salida de un curso es la entrada del siguiente.** Cada curso publica su "paquete de salida" (gramática núcleo + 50 palabras núcleo) y el siguiente lo verifica en su S1 (§2.3).
3. **Cada curso abre reactivando y cierra sin gramática nueva** (S1 = reactivación y diagnóstico · S8 = integración y proyecto).
4. **La tarea es la palanca, no un extra:** una misión de 25 minutos por semana (§11.6). Con una hora semanal de clase, la automatización ocurre en casa.
5. **TOPIK es un track, no un nivel:** se entra con B1 venga de donde venga (Intermedio o nivel acreditado).
6. **Niños es un track con puente explícito a adultos** (§12, §13).

---

## 2. Progresión entre cursos

### 2.1 ¿Cada curso termina donde empieza el siguiente?

| Traspaso | Lo que entrega el curso de salida | Lo que exige el de entrada | ¿Calza? | Cabo suelto |
|---|---|---|---|---|
| Nivel 1 de julio → Básico 2 | Libro 한글학교 한국어 1 hasta las lecciones 8–9 | Batchim, 이에요/예요, 있어요, sino-coreanos, -아요 regular | **Sí** | El programa de julio anunciaba pasado, futuro y -고 싶다, pero lo que se dio fue el libro. "Nivel 1 = Básico 1" es correcto por contenido |
| Básico 1 → Básico 2 | Hangul, 이에요/예요, 있어요, 은/는, 이/가, 을/를, 에, -아요 (~15 verbos), sino 1–100 | Lo mismo | **Sí**, con dos cabos | 좋아해요 queda recién vista (S8); 에서 no se da en A1.1 y Jay lo corrige como "error de base" desde la clase 1 de A1.2 |
| Básico 2 → Conversacional 1 | 3 tiempos, negación, habilidad, partículas, -고/-지만, números y hora | 3 tiempos, 이/가, 을/를, 에, 에서, 2–3 min de conversación | **Sí, en el papel** | Abby recibe "pasado y futuro todavía verdes" (`a21 · notas`); A2.1 S2 usa 좋아하는 노래 (modificador) sin haberlo enseñado |
| Conversacional 1 → Conversacional 2 | Experiencia, propuestas, peticiones, modificadores sueltos, -(으)면 / -(으)ㄹ 때 / -기 전에 | Sin syllabus | **Por diseñar** | Es el lugar natural para honoríficos, -(으)니까, 한다체 de reconocimiento, 반말 y el mapa de modificadores |
| Conversacional 2 → TOPIK II | (A2.2) | B1: -(으)니까, -기 위해서, escribir el 51, leer textos en 한다체, ~3.000 palabras ⚑ | **No** | Falta un tramo completo |
| Niños → Básico 1 | 6 vocales, 10 consonantes, batchim ㄴㅁㅇㄹ (reconocer), fórmulas, nativos 1–10 | Nada (Básico 1 parte de cero) | Sí, con repetición sana | Niños 1 ≈ semanas 1–3 de Básico 1. La regla de edad se contradice (13 vs 14, §12) |

### 2.2 La espiral: funciona hacia atrás, falla hacia adelante
La reactivación está bien. El problema es la dirección contraria: **hay cursos que usan estructuras antes de que otro curso las enseñe.**
- -지 마세요 (A2.1 S4) llega antes que -(으)세요, que no se enseña nunca.
- 좋아하는 노래 (A2.1 S2) aparece antes del sistema de modificadores.
- -(으)니까 es criterio del diagnóstico de TOPIK II S1, pero ningún curso lo enseña.
- Los role plays de invitación de A1.2 S5–S6 se hacen sin -(으)ㄹ까요?.
- El examen de A1.1 evalúa la lección 9 antes de la clase que la enseña.
- **El vocabulario no hace espiral:** entre A1.2 y A2.1 se repite 1 palabra (다음, dentro de 다음 주 y 다음 단계); entre A2.1 y TOPIK II, 2 (목표, 예약하다).

### 2.3 Contrato de traspaso [ENE]
Cada curso cierra con un **paquete de salida** de una página, que es exactamente el **diagnóstico de entrada** del siguiente:

| Pieza | Contenido | Quién la usa |
|---|---|---|
| Gramática núcleo | 8–12 estructuras que el alumno produce (tabla del §4) | Diagnóstico de 12 ítems del curso siguiente |
| 50 palabras núcleo | Las activas del curso (§5) | Prueba de reconocimiento en S1 del siguiente + labs |
| 3 tareas "puede hacer" | Del §13 | Audio de entrada de 1–2 min |
| Informe Pasaporte Chingu | 5 habilidades + foco (§11) | La profe del curso siguiente lo lee antes de la S1 |

---

## 3. Progresión CEFR (con honestidad sobre las horas)

### 3.1 Horas reales por curso

| Curso | En vivo | Tarea (declarada o estimada) | Total estimado |
|---|---|---|---|
| Básico 1 (A1.1) | 8 × 60 min = 8 h | 3 entregas por semana, sin cifra declarada; ≈ 1 h × 7 | **≈ 15 h** |
| Básico 2 (A1.2) | 8 h | "unas 2 horas de tarea repartidas en la semana" (`a12 · perfil`) × 7 | **≈ 22 h** |
| Conversacional 1 (A2.1) | 8 h | 2–3 entregas por semana ≈ 1–1,5 h × 7 | **≈ 15–18 h** |
| Conversacional 2 (A2.2) *(proyección)* | 8 h | Como Conversacional 1 o Básico 2 | **≈ 15–22 h** |
| TOPIK II | 8 h | 1 tarea cronometrada por semana + simulacro de 180 min | **≈ 25 h** |
| Niños | 8 h | "unas 2 horas semanales" (en la práctica, 60–80 min) | **≈ 15–22 h** |

- **Entre 15 y 25 minutos por clase presentan contenido nuevo** (15' en Básico 1, 20' en Conversacional 1, 25' en Básico 2; TOPIK II dedica 15' a estrategia). En un curso eso da **unas 2–3 h de exposición a lo nuevo**. No es un defecto (es el pilar 말하기), pero pone techo a cuánto temario cabe.
- Con 6 de 8 clases, un alumno certificado puede tener **6 h en vivo**.
- **Del cero al final de A2.2: 32 h en vivo + ~35–45 h de tarea con la carga actual ≈ 67–77 h; con la misión de 25 min propuesta (§11.6), ≈ 44 h** (32 h + 4 cursos × 7 misiones × 25 min), más el shadowing opcional (§6.2).
- **Compresión respecto de julio:** el mismo libro se dio en 16,5 h (11 × 90 min) y llegó a las lecciones 8–9. Básico 1 cubre las lecciones 1–10 en 8 h. El Lector absorbe el *drilling* de la lectura, pero no el de la gramática de las lecciones 3–9.

### 3.2 Referencias externas (solo para dimensionar, no para publicar) ⚑
- En los institutos de idiomas de las universidades coreanas, un 급 ronda las **~200 h** (unas 10 semanas × ~20 h). ⚑ Cifra típica: verificar con el instituto que se quiera citar.
- Cambridge estima ~90–100 h guiadas para un A1 de inglés. El coreano es una lengua lejana para un hispanohablante (otra escritura, SOV, partículas, honoríficos), así que un A1 sólido pide **bastante más de 100 h guiadas** ⚑ (estimación, no cifra oficial).

### 3.3 Veredicto
- **Como descriptor del temario, las etiquetas se sostienen:** A1.1 + A1.2 cubren a grandes rasgos el temario de un 1급, y A2.1 + A2.2 el de un 2급.
- **Como nivel logrado, no se sostienen.** Con 45–77 h (según la carga de tarea), lo esperable es **un A1 sólido con islas de A2 en los temas ensayados.**
- **Destrezas cojas:** la escalera es fuerte en interacción oral y en lectura de Hangul, y débil en comprensión auditiva a velocidad real y en escritura funcional. Un "A2" sin escucha entrenada es un A2 cojo (§7–9).

### 3.4 Equivalencias: qué es defendible y qué no

| Afirmación | Dónde | ¿Defendible? | Ajuste [ENE] |
|---|---|---|---|
| TOPIK 1≈A1 · 2≈A2 · 3≈B1 · 4≈B2 | Guía CEFR–TOPIK §1 | **Sí, como orientación de la industria.** ⚑ Hasta donde sabemos, el 국립국제교육원 no publica una tabla oficial TOPIK ↔ MCER | Mantener, con "equivalencia orientativa" |
| TOPIK 5≈C1 · **6≈C2** | Guía §1 | Discutible | "5–6 ≈ C1" |
| Cortes TOPIK I 80/140 sobre 200 · TOPIK II 120/150/190/230 sobre 300 | Guía; `topik2` | Sí | — |
| Vocabulario ~800 (1급) · 1.500–2.000 (2급) · 3.000 / 4.000+ (3–4급) | Guía §1 | 1–2: sí. 3–4: ⚑ no confirmadas como cifras oficiales | "aprox." en 3 y 4 |
| "Grilla oficial de autoevaluación CEFR **para coreano**" | Guía §2 | ⚑ verificar que exista | "grilla de autoevaluación del MCER" |
| Básico 1: "CEFR A1 (parcial) · preparación TOPIK I nivel 1" | `a11 · certificado` | Aceptable con "parcial" | Fórmula de §3.5 |
| Básico 2: "**CEFR A1 completo (A2 parcial)**" | `a12 · certificado` | **No** (16 h en vivo acumuladas y sin comprar ni pedir) | "Contenidos del nivel A1 (MCER) · base para TOPIK I" |
| "**Examen A2 de la casa**" en un curso A1.2 | `a12 · evaluación`; `lib/nivel1.ts` | **No** (confunde) | "Examen final de Básico 2" |
| Conversacional 1: "preparación TOPIK I nivel 2" | `a21 · certificado` | No es realista (140/200 con ~400 palabras) | "Contenidos de A2.1 · TOPIK I como meta siguiente" |
| TOPIK II: "TOPIK II nivel 3–4" | `textos_generales · cefrRows` | Sí, **si el alumno entra con B1** | "Orientado al nivel 3 (4 si llegas con un B1 sólido)" |
| TOPIK II: certificado "**CEFR B1+**" | `topik2 · certificado` | **No** (el curso mide estrategia y puntaje, no CEFR) | "Preparación TOPIK II · puntaje del simulacro final: X/300 (nivel estimado)" |
| "Básico 1 y 2 te llevan al TOPIK I" | FAQ | Vago | "Te preparan para intentar el TOPIK I nivel 1" |

Argumento honesto y fuerte que conviene conservar: **TOPIK I solo mide comprensión (lectura y escucha); nuestra evaluación oral cubre justo lo que el examen no mide.**

### 3.5 Cómo decirlo sin cambiar los nombres
- **[ENE] Regla de redacción:** *el código CEFR del nombre describe el tramo del temario, nunca el resultado.* Fórmula: "Básico 1 (A1.1): trabajas los contenidos de la primera etapa del nivel A1 del Marco Común Europeo (MCER)."
- **[ENE] Línea de nivel del certificado:** nombre del curso + "8 clases en vivo" + "contenidos de [tramo] (MCER)" + "no es una certificación oficial; el TOPIK lo otorga el 국립국제교육원". Niños: sin etiqueta CEFR (Niños 1 ≈ Pre-A1, solo para uso interno).
- **DECISIÓN DE JAY:** los certificados de octubre se emiten el 7 de diciembre. Recomendación (decisión 5): suavizar ya, en la versión mínima, la línea "A1 completo (A2 parcial)" de Básico 2 y "CEFR B1+" de TOPIK II, que es lo que §3.4 marca como no defendible. Es el cambio que menos se aparta del PDF publicado.
- **[Borrador para alumnos · no publicar sin Jay]** FAQ: *"¿Termino Básico 1 con nivel A1.1? El nombre te dice qué parte del nivel A1 trabajas. En 8 clases, y con tu misión semanal, sales usando esas estructuras en los temas que practicaste. La soltura llega peldaño a peldaño, y por eso cada curso empieza reactivando el anterior."*

---

## 4. Progresión gramatical núcleo

### 4.1 Criterios de la propuesta [ENE]
1. **Redistribuir, no engordar.** El mismo número de estructuras nuevas por curso que hoy (±2) y **máximo 3 estructuras nuevas por clase (2 en semanas de lab o de evaluación)**. Cuenta como estructura lo que se explica y se practica para producirlo; un paradigma cuenta una vez (p. ej., "irregulares ㅂ/ㄷ/으" o "números nativos"). No cuentan lo que se reactiva, lo que solo se reconoce, el léxico (제, 오늘, 뭐, 어디) ni las fórmulas que se imitan sin explicar: van aparte, entre paréntesis, en la tabla de §4.3.
2. **Frecuencia comunicativa antes que exhaustividad:** 주세요, -고 싶다, -고 있다 y -(으)ㄹ까요 pesan más que 처럼, 쯤 o -거나.
3. **Ninguna semana 8 con gramática nueva.**
4. **Nada se usa antes de enseñarse**; si se usa, se marca como "fórmula".
5. **Se respetan el libro de Kiran y los módulos de Abby:** cambian el orden y la asignación de estructuras, no los temas (con una excepción en Básico 2, marcada).

### 4.2 Estructuras clave: dónde están hoy y dónde deberían estar

"Nivel habitual" = dónde suelen aparecer en los manuales de los institutos coreanos (Seúl, Yonsei, Sogang, KGIU). ⚑ Es orientativo: contrastarlo con el 국제 통용 한국어 표준 교육과정 antes de fijarlo.

| Estructura | Hoy | Nivel habitual | Veredicto | Propuesta [ENE] |
|---|---|---|---|---|
| **N 주세요 · 얼마예요? · 원** | 주세요: A2.1 S4 (-아/어 주세요) · 원 y precios sin 얼마: A1.2 S2 (sino-coreanos "para… precios") y S7 (천 원밖에 없어요, sin que ningún curso enseñe 천), y como dato cultural en A2.1 S7 (1.500 원) · 얼마예요?: nunca | 1급 | **Tarde**: comprar y pedir abren el descriptor de TOPIK 1급 | N 주세요 en A1.1 S3 (fórmula); comprar en A1.2 S4 con **백, 천, 만** (sin 일 delante: 천 원, 만 원) |
| **-고 싶다** | A2.1 S1 (una frase) | 1급 | **Tarde**: A1.2 S5 planifica "vacaciones soñadas" sin poder decir "quiero" | A1.2 S4 |
| **-(으)세요** (petición) | Nunca (solo 안녕히 가세요 y comandos de clase) | 1급 | **Falta**, y A2.1 S4 enseña -지 마세요 antes | Reconocer en A1.2 S4; sistematizar en A2.1 S4 |
| **-(으)시-** (드시다, 계시다, 주무시다) | Nunca (solo léxico: 선생님, 사장님) | 1급 final–2급 | **Falta crítica**: 할머니 se enseña en A1.1 S4, pero no 할머니가 주무세요 | Reconocer en A2.1 S4 (맛있게 드세요); sistema en A2.2 S3 |
| -(으)ㄹ까요? | A2.1 S3 | 1급 | Algo tarde | A1.2 S6; A2.1 S3 reactiva y suma -(으)ㄹ래요? como fórmula |
| -고 있다 | Solo "extra" en notas de A1.2 | 1급 | Falta | A2.1 S1 (한국어를 배우고 있어요) |
| -아/어야 하다 | Nunca antes de TOPIK II S4 | 1–2급 | **Falta** | A2.1 S3 (표를 예약해야 해요) |
| -아/어서 | A2.1 S2 (causa) y S3 (secuencia) | 1–2급 | Bien | Nota para la profe: no va con pasado (*갔어서*) ni con imperativo o propuesta; ahí entra -(으)니까 |
| **-(으)니까** | Nunca (TOPIK II S1 lo da por sabido) | 2급 | **Falta** | A2.2 S1, en contraste con -아/어서 |
| -(으)면 | A2.1 S7 | 1–2급 | Bien | Se queda en A2.1 S7 (S3 ya llega al tope de §4.1) |
| -아/어 보다 | A2.1 S2 (experiencia) | 1–2급 | Bien; falta el "prueba a…" de recomendar | A2.1 S4: 이거 먹어 보세요 |
| 보다/더 · 제일 | A1.2 S7 · A2.1 S2 | 1–2급 | Bien secuenciados | A1.2 S7, sin las otras 8 partículas encima |
| -아/어도 되다 · -(으)면 안 되다 | Nunca | 2급 | Falta | A2.2 S3 (normas de oficina) |
| -(으)ㄹ래요 · -(으)ㄹ게요 | Nunca · TOPIK II S3 | 1–2급 · 2급 | Falta | -(으)ㄹ래요? como fórmula en A2.1 S3 (볼래요?); -(으)ㄹ게요 en A2.2 (설날) |
| -네요 · -죠 | -네요: nunca · -죠: solo como -아/어야죠 en TOPIK II S3 | 1–2급 · 2급 | Falta (son las terminaciones que más "suenan a coreano") | -네요 y -죠 en A2.2 S5 (A2.1 ya llega al tope) |
| -는데 | Solo en notas de A2.1 ("a quien va sobrado") | 2급 | Falta | A2.2 (narrar: fondo + hecho) |
| -기 때문에 · -(으)려고 | Nunca antes de TOPIK II | 2급 | Falta | A2.2 S2 |
| **Modificadores** -는 / -(으)ㄴ / -(으)ㄹ | Seis fórmulas sueltas en A2.1 (S1, S2, S4, S6, S7) sin sistema | 2급 | **Riesgo**: el mismo mecanismo, que nadie explica | -(으)ㄴ + N junto con el mapa de una página en A2.1 S6 (sale de S4); sistema en A2.2 |
| Irregulares ㅎ | Nunca, y hay **trampa en A2.1 S6**: los colores del 한복 (빨간, 파란, 하얀, 노란) | 2급 | Falta | [YA] aviso a Abby; enseñarlos como vocabulario |
| -ㅂ니다/습니다 | A1.2 S3, solo reconocer | 1급 | Bien para reconocer; nunca producido | Fórmula en A1.2 S1 (저는 ___입니다, 반갑습니다); producción en A2.2 S3 |
| **한다체** | TOPIK II S4 (primera vez) | 3급 escrito | **Falta** | Reconocer en A2.2 (cuentos, diario); producir en Intermedio |
| **반말** | Solo como nota cultural (A2.1 S1) | 2–3급 | **Falta**, y es lo que más oye el público de K-pop (사랑해, 고마워, 보고 싶어) | Reconocer desde A2.2 S1 (letras y dramas); producción básica en A2.2 S7 |
| 께서 · 께 · 와/과 | Nunca | 2급 · 1급 escrito | Falta para leer textos escritos | Reconocer en A2.2 |
| Discurso indirecto | Nunca (los decks M06–M10 de julio lo cargan completo en una clase) | 3급 | Es B1 | Intermedio |

**Lectura de conjunto:** en A1 faltan sobre todo **funciones de supervivencia** (pedir, comprar, querer, estar haciendo, deber). En A2.1 faltan las **terminaciones de interacción** (-네요, -(으)ㄹ래요, -(으)ㄹ게요, -죠) y los **honoríficos**. A2.2 tiene una lista larga de 2급 sin casa. Nada de esto se arregla con más horas de gramática: se arregla redistribuyendo y aceptando que 처럼, 쯤 o 밖에 valen menos que -고 싶다 o 주세요.

### 4.3 Carga de estructuras nuevas por semana (hoy y propuesta de enero)

"Hoy" cuenta cada punto que la ficha lista como gramática. "Ene" aplica el criterio de §4.1 (un paradigma = 1; entre paréntesis, lo que es fórmula, reconocimiento o léxico). Por eso las dos columnas no se comparan número a número: lo que muestra "Ene" es que **ninguna clase pasa de 3 estructuras nuevas, ni de 2 en lab o evaluación**. En A1.1, el Hangul I (vocales, consonantes y bloque silábico) ocupa la S1 entera y cuenta 3; el Hangul II y el batchim oclusivo cuentan 1 cada uno, porque amplían el mismo sistema.

| S | A1.1 hoy | A1.1 ene | A1.2 hoy | A1.2 ene | A2.1 hoy | A2.1 ene |
|---|---|---|---|---|---|---|
| 1 | 3 (sistema de escritura) | 3: Hangul I ocupa la clase (+ fórmulas orales) | 1 | 0 (+ fórmula -ㅂ니다; fechas para reconocer) | 2 | 2: -(으)ㄴ 지 됐어요 · -고 있어요 (+ reactivar -고 싶어요, que llega desde A1.2 S4) |
| 2 | **4 + batchim, tensas y compuestas** | 3: Hangul II (tensas, compuestas, batchim sonante) · 이에요/예요 · 은/는 (+ 저도요) | **5** (dos sistemas de números, 살, 시/분, 몇, 에 temporal) | 3: nativos (살, 시) · fechas y minutos · 에 temporal | 4 | 3: -아/어 봤어요 · N 중에서 · -아서 (+ 제일 좋아하는 + N) |
| 3 | 3 | 3: 이거/그거/저거 · 아니에요 · batchim oclusivo (+ N 주세요) | **5 irregulares + -ㅂ니다 + 에서** | 3: irregulares ㅂ/ㄷ/으 · 부터~까지 · 마다 (+ -고, 쯤 como palabra) | 3–4 | 3: -(으)러 · -아서 (secuencia) · -아/어야 해요 (+ -(으)ㄹ래요?) |
| 4 | 4 | 3: 우리 N · sino-coreanos 1–100 · nativos con 명 (+ 제 como palabra) | 4 | 3: 얼마예요 + precios · contador + 주세요 · -고 싶어요 (+ reconocer -(으)세요; 만) | 4 (dos modificadores irregulares) | 3: -(으)세요 → -아/어 주세요 → -지 마세요 (+ 먹어 보세요; reconocer 맛있게 드세요) |
| 5 | 4 | 3: 있다 (está / hay) · posiciones · 이/가 | 4 | 3: -았/었어요 · 에서 vs 에 · -고 (+ 하고/(이)랑, 한테) | 0 (lab) | 0 (lab) |
| 6 | 4 | 2: -아요/어요 · N에 가요/와요 | 4 | 3: -(으)ㄹ 거예요 · (으)로 · -(으)ㄹ까요? | 2 | 3: -아/어 보여요 · -(으)ㄴ/는 것 같아요 · -(으)ㄴ + N con el mapa |
| 7 | 4 (dos lecciones) | 3: 을/를 · contracciones · 좋아해요 (+ reconocer 에서 y 은/는 vs 이/가) | **9 partículas** | 3: 안/못 · -(으)ㄹ 수 있어요 · 보다/더/제일 (+ -지만) | 3 conectores de cláusula | 3: -(으)ㄹ 때 · -기 전에/-(으)ㄴ 후에 · -(으)면 |
| 8 | **1–2 nuevas + examen + presentaciones** | 0 | **2 nuevas + examen + oral** | 0 | 0 | 0 |

### 4.4 Básico 1 (A1.1) · 한글학교 한국어 1 · por semana

| S | Octubre 2026 (publicado) | Enero 2027 (propuesta) | Cambio |
|---|---|---|---|
| 1 | 가나다라 I: 10 vocales + 14 consonantes; ㅇ mudo; bloque silábico | Igual + **fórmulas orales** sin explicar: 안녕하세요, 저는 ___예요/이에요, 감사합니다 | Hablar desde el día 1 |
| 2 | 가나다라 II + L1: batchim (7 sonidos), tensas, 8 vocales compuestas; 저는 N이에요/예요; 은/는; 가세요/계세요; países | Tensas + compuestas frecuentes + **batchim sonante** ㄴ ㅁ ㅇ ㄹ · 저는 N이에요/예요 · N 사람이에요 · 은/는 · **저도요** (fórmula; 도 no se explica como estructura aparte) | Batchim oclusivo pasa a S3; 도 entra como fórmula |
| 3 | L2 + L3: 이거/그거/저거, 이게; 뭐예요?; 네/아니요; N이/가 아니에요 | Igual + **batchim ㄱ/ㄷ/ㅂ y neutralización** (옷 [옫], 부엌 [부억]) + **N 주세요** como fórmula (이거 주세요, 물 주세요) | Pedir lo que nombras |
| 4 | L4: 우리 N; 누구예요?; sino-coreanos 1–100 + 공; nativos 1–5 con 명 | Igual + **제 (= 저의)** como palabra · sino-coreanos con teléfono; nativos con 명 (우리 가족은 네 명이에요) · los precios, que piden 백/천/만, quedan para A1.2 S4 | 제 baja desde A1.2 S7 |
| 5 | L5: 어디예요?; N에 있어요/없어요; posiciones; 이/가 solo con 있어요 | **L5 + L7:** "está en" + **"hay" (N에 N이/가 있어요)** + posiciones | Une los dos usos de 있다 |
| 6 | L6: -아요/어요; N에 가요/와요; 오늘/매일/지금 | Igual | = |
| 7 | L7 + L8: 있어요 = "hay"; 을/를; 은/는 vs 이/가; contracciones | **L8 + L9:** 을/를 + contracciones + **N을/를 좋아해요 / 안 좋아해요** · **에서** solo como fórmula de reconocimiento (회사에서 일해요) · 은/는 vs 이/가 solo con ejemplos del libro | 좋아해요 sube; 에서 se oye, no se explica |
| 8 | L9 + L10: 좋아해요; repaso; mini-presentación; examen | **L10: sin gramática nueva.** Integración + proyecto + evaluación | Se deja de evaluar lo no enseñado |

**Balance:** entran N 주세요 (fórmula, S3), 저도요 (fórmula, S2), 제 (como palabra, S4) y 좋아해요 (S7, sube desde S8); el batchim oclusivo pasa a S3 y "hay" se une a "está en" en S5. Salen la gramática nueva de S8, los precios (pasan a A1.2 S4 con 백/천/만) y el 있어요 = "hay" como punto aparte en S7; 에서 y 은/는 vs 이/가 quedan como reconocimiento. Ninguna semana pasa de 3 estructuras nuevas (§4.3).

**[YA] Para Kiran en octubre:** en el cierre de S7, 좋아해요 / 안 좋아해요 como una de "las 3 frases clave" (encaja: S7 enseña 을/를, y 김치를 좋아해요 es exactamente eso) + tarjeta de 10 palabras de gustos para el guion (la prepara la Fase 2, bloque E; Kiran no produce material). En el examen, **máximo 2 ítems de la lección 9** y corrección flexible de la parte "gustos" (Jay y Kiran lo acuerdan).

### 4.5 Básico 2 (A1.2) · por semana

| S | Octubre 2026 (publicado) | Enero 2027 (propuesta) | Cambio |
|---|---|---|---|
| 1 | Reactivación (이에요, 있어요, 은/는 vs 이/가, -아요) · N이/가 아니에요 · diagnóstico oral | Reactivación + contraste 은/는 vs 이/가 + diagnóstico oral · **저는 ___입니다 / 반갑습니다** (fórmula formal) · fechas **solo para reconocer** (el calendario del curso en pantalla) | S1 sin estructuras nuevas (§1.4.3); -ㅂ니다 como fórmula |
| 2 | Nativos con 살 y 시; 한/두/세/네; 몇 시 / 몇 살 / 며칠; N에 temporal; teléfono, minutos, precios | **Fechas, edad y hora:** nativos con 살 y 시 (**incluye 스물, 서른, 마흔… y 스무 살**) · sino-coreanos para fechas y minutos (월/일/요일, 며칠, 언제, 생일, **유월, 시월**, 분, 반) · N에 temporal (몇 시에, 생일에) | Teléfono (ya visto en A1.1) y precios salen de S2 |
| 3 | Irregulares ㅂ, ㄷ, 으, 르, ㄹ; -ㅂ니다 (reconocer); 에서 vs 에 | **Mi rutina:** -아요 completo (reactivar) + irregulares **ㅂ, ㄷ, 으** · 르 como forma fija (몰라요, 빨라요) · ㄹ: regular en -아요 (살아요, 만들어요); se avisa en S4 con -(으)세요 (어디 사세요?, 아세요?) y en S6 con el futuro (살 거예요, 만들 거예요) · **부터~까지** · **마다** (+ -고 como fórmula: 씻고 아침을 먹어요; 세 시쯤 como palabra) | 부터~까지 y 마다 van con la rutina |
| 4 | -았/었어요; 이었어요/였어요; 부터~까지; 하고/(이)랑 | **"De compras y en el café" (tema nuevo):** 이거 얼마예요? + precios: **백, 천, 만** (sin 일 delante: 천 원, 만 원) · 커피 사천오백 원 · 떡볶이 삼천 원 · 만 오천 원 · N + 개/잔/병 + 주세요 · **-고 싶어요** · **-(으)세요** (reconocer: 여기 앉으세요, 어디 사세요?) · 이거만 주세요 (fórmula) | **Cambia el orden de temas** (DECISIÓN DE JAY) |
| 5 | -(으)ㄹ 거예요; -거나 / N(이)나; (으)로 | **El pasado:** -았/었어요 · 이었어요/였어요 · **에서 vs 에** (어디에서 먹었어요?) · **-고** (el tiempo va solo en el último verbo: 밥을 먹고 커피를 마셨어요) (+ fórmulas: 친구하고/친구랑, 친구한테 줬어요) | Pasado a S5; -고 y 에서 vs 에 se explican con el relato del fin de semana |
| 6 | 안 / -지 않아요; 못 / -지 못해요; -(으)ㄹ 수 있어요/없어요 | **El futuro y los planes:** -(으)ㄹ 거예요 · (으)로 · **-(으)ㄹ까요?** | Futuro a S6; -거나 pasa a A2.1 como vocabulario |
| 7 | 9 partículas (보다/더, 처럼, 만, 밖에, 도, 마다, 쯤, 의, 한테) | **Negación, habilidad y comparación:** 안 / -지 않아요 y 못, en contraste (decisión o circunstancia) · -(으)ㄹ 수 있어요/없어요 · **보다/더/제일** (+ -지만 como fórmula: 한국어는 어렵지만 재미있어요) | -지 못해요 solo se reconoce; 처럼 y 밖에 pasan a A2.2 |
| 8 | -고, -지만 · examen "A2 de la casa" + oral | **Sin gramática nueva** · integración + proyecto + examen final de Básico 2 | — |

**Balance:** salen como estructura 처럼 y 밖에 (a A2.2), -거나 (a A2.1 como vocabulario), -지 못해요 (solo reconocer), 르/ㄹ como sistema, -ㅂ니다 como conjugación y 의 (se ve dentro de 제/내). **쯤 queda solo como palabra** (세 시쯤), y 만, 하고/(이)랑, 한테 y -지만 quedan como fórmulas. Entran 얼마예요 con precios (백, 천, 만), contadores con 주세요, -고 싶어요, -(으)세요 (reconocer) y -(으)ㄹ까요?. Con el criterio de §4.1, ninguna semana pasa de 3 estructuras nuevas y S1 queda para reactivar y diagnosticar (§4.3).
**Alternativa más conservadora (si prefieres no mover los temas):** mantener el orden actual de temas y meter "comprar" dentro de S5 (vacaciones → comprar recuerdos: 이거 얼마예요? 이거 주세요) y -고 싶어요 en S5. Se pierde menos que con el orden actual, pero S5 queda por encima del tope de §4.1. En cualquiera de las dos opciones hay que rehacer el examen final de Básico 2.

**[YA] Para Jay en octubre:** adelantar -고 en S3 como fórmula con ejemplos de rutina en los que suena natural (씻고 아침을 먹어요 · 아침을 먹고 회사에 가요 · 일하고 운동해요; con 일어나다, lo natural es 일어나서 씻어요 ⚑ revisar con nativo si se quiere mantener 일어나고) y -지만 en S7 (한국어는 어렵지만 재미있어요) como fórmula; en S7, aplicar tu propia nota (쯤 y 의 como lectura en casa) y, al dar 천 원밖에 없어요, presentar 천 y 만 (천 원, 만 원: sin 일 delante); en S2, tarjeta con 유월/시월 y las decenas nativas para la edad.

### 4.6 Conversacional 1 (A2.1) · módulos de Abby intactos

| S | Módulo | Octubre 2026 (publicado) | Enero 2027 (propuesta) |
|---|---|---|---|
| 1 | Orientación | -고 싶어요; -(으)ㄴ 지 … 됐어요; reactivación | Igual + **-고 있어요** (-고 싶어요 pasa a reactivarse: llega desde A1.2 S4) |
| 2 | K-pop | -아/어 봤어요; 제일/가장; N 중에서; -아서 (causa) | -아/어 봤어요 · N 중에서 · -아서 (causa) · 제일 (reactivar desde A1.2 S7) + **제일 좋아하는 + N** como fórmula explícita (el sistema llega con el mapa de S6) |
| 3 | Viajes | -(으)ㄹ까요?; -(으)러 가요; (으)로; -아서 (secuencia) | -(으)러 · -(으)ㄹ까요? (reactivar) · -아서 (secuencia) · **-아/어야 해요** · **-(으)ㄹ래요?** como fórmula (볼래요?, 먹을래요?) · (-거나 como vocabulario) |
| 4 | Comida | -아/어 주세요; 개/병/잔 + 인분; -지 마세요; -(으)ㄴ + N (매운, 단) | **-(으)세요 → -아/어 주세요 → -지 마세요** (en ese orden) · 이거 먹어 보세요 (combina -아/어 보다 de S2 con -(으)세요; no se cuenta aparte) · contadores (reactivar) · 매운 거 / 안 매운 거 como palabras · reconocer **맛있게 드세요** |
| 5 | Lab 1 | Estrategias de reparación | Sin gramática nueva |
| 6 | Hanbok | -아/어 보여요; -(으)ㄴ/는 것 같아요 | Igual + **-(으)ㄴ + N con el mapa de modificadores** (-는 / -(으)ㄴ / -(으)ㄹ; **regulares primero**, luego 매운/단) + **colores irregulares en ㅎ** como vocabulario (빨간, 파란, 하얀, 노란) |
| 7 | PC방 | -(으)ㄹ 때; -기 전에 / -(으)ㄴ 후에; -(으)면 | Igual |
| 8 | Lab 2 + oral | Integración | Sin gramática nueva |

**Balance:** A2.1 suma 3 estructuras (-고 있어요, -아/어야 해요 y -(으)세요 como petición, que ordena lo que ya estaba en S4) y 2 fórmulas (-(으)ㄹ래요?, 좋아하는 + N). Pasan a A2.2 **-네요, 처럼, 밖에, 반말 (reconocer) y -고 싶어 해요** (con 띄어쓰기: -어 하다 va separado cuando se une a una frase, como 가고 싶어 하다). -(으)ㄴ + N sale de S4 y se enseña en S6 junto con el mapa. -고 싶어요 y -(으)ㄹ까요? dejan de ser nuevas (llegan desde A1.2 S4 y S6). Ninguna semana pasa de 3 estructuras nuevas, y S4, que tiene solo 20 minutos de deck ("no dejes que el deck pase de 20 minutos", `a21 · notas`), queda con 3 (§4.3).

**[YA] Para Abby en octubre [Para profes]:** en S4, una lámina con -(으)세요 antes de -지 마세요 y adjetivos regulares (짠, 싼, 좋은, 작은) antes que 매운/단 ("las rebeldes"). En S6, aviso de los colores en ㅎ y una lámina con el mapa -는 / -(으)ㄴ / -(으)ㄹ.

### 4.7 Conversacional 2 (A2.2) · propuesta para enero 2027
El orden está anclado al 설날 real (§10.6), suponiendo un inicio la semana del 11 de enero ⚑. Si la cohorte parte otra semana, las filas de 설날 se corren.

| S | Tema | Gramática núcleo |
|---|---|---|
| 1 | Reconexión + diagnóstico · "dos años nuevos" (신정 y 설날) | **-(으)니까** frente a -아/어서 (-(으)니까 admite imperativo y propuesta) · 반말 para reconocer en letras y dramas (viene de A2.1) |
| 2 | Educación y 수능 | -아/어야 하다 (reactivar) · **-기 때문에** · **-(으)려고 (하다)** · -게 되다 |
| 3 | Trabajo y 회식 | **-(으)시- en presente y pasado** · 드시다/계시다/주무시다/말씀하시다 · 께서/께 (reconocer) · **-ㅂ니다/습니다 en producción** · -아/어도 돼요 / -(으)면 안 돼요 |
| 4 | **Lab 3** + planes para el 설날 | Sin gramática nueva |
| 5 | 설날 contado + 추석 como comparación | **-(으)ㄹ게요** (제가 설거지할게요) · **-죠** · **-네요** (떡국이 맛있네요; viene de A2.1) · honoríficos en familia (reactivar) |
| 6 | Mitos y leyendas | **-는데 / -았/었는데** (fondo + hecho) · -았/었을 때 · **밖에 + negación** (떡이 하나밖에 안 남았어요; viene de A2.1) · **한다체 para reconocer** (옛날에 호랑이가 살았다) · 와/과 (reconocer) |
| 7 | K-drama y sociedad | **반말 básico en producción** · **처럼** (드라마 주인공처럼) · **-고 싶어 해요** (el deseo de otro: 주인공이 한국에 가고 싶어 해요) · -다고 생각해요 (fórmula de opinión) · reseña de 3–4 frases en 한다체 |
| 8 | **Lab 4** + proyecto final | Sin gramática nueva |

⚑ Los ejemplos son ilustrativos: validarlos con la profe al diseñar los decks. Ojo: el deck M10 de julio carga el discurso indirecto completo en una clase; eso es B1, no A2.2.

### 4.8 Intermedio B1 (tramo a crear · 2 × 8 semanas · nombre: DECISIÓN DE JAY)
Es la gramática que la Guía CEFR–TOPIK de septiembre ya listaba para "Intermedio B1 · Corea Real"; aquí solo se ordena por frecuencia y por utilidad para el TOPIK 3.

**Esta propuesta cambia un plan anterior, y conviene verlo antes de decidir.** La Guía de septiembre planteaba B1 como 16 sesiones en 8 semanas, a 2 por semana ("NUEVO · diseñado aquí · preventa 30 nov"), un TOPIK I intensivo de 4 semanas y el track TOPIK con un especialista (modelo B de comisiones, 75/25). Esta propuesta: **(a)** mismas 16 h, pero en 2 × 8 semanas de 1 clase, para mantener el ritmo de la escalera; **(b)** TOPIK I dentro de los quizzes (1 ítem oficial por quiz) en vez de un curso; **(c)** lanzamiento en 2027 y no preventa en noviembre. Las tres son opciones para Jay (decisión 8), no hechos consumados.

| B1.1 (propuesta) | B1.2 (propuesta) |
|---|---|
| Discurso indirecto -다고/-냐고/-자고/-(으)라고 (하다) y contracciones · -는데 (contraste, presentar tema) · -더라고요 · -거든요 · -아/어지다 · -게 되다 · honoríficos completos · 반말 fluido | Pasivas y causativas frecuentes (-이/히/리/기-) · -(으)ㄴ/는 편이다 · -(으)ㄹ 텐데 · -도록 · -기 위해서 · -(으)ㄹ 수밖에 없다 · -(으)ㄹ 뿐만 아니라 · **한다체 en producción** (párrafos de 200–300 caracteres, antesala del 53; el 54 llega en el track) |

### 4.9 TOPIK II (track) y Niños
- **TOPIK II:** sin cambios de temario (es un buen curso de estrategia). La gramática de 3–4급 se presenta para reconocerla (-자마자, -(으)ㄹ수록, -기 마련이다, -(으)ㄴ/는 셈이다…), que es lo correcto para quien ya es B1. **[YA] Kit de nivelación** (PDF corto que Jay manda antes de la clase 1): 한다체 en una página, 20 conectores de nivel 3 con ejemplo y 10 fórmulas del 51.
- **Niños:** todo en fórmulas. Es la decisión correcta y no conviene cambiarla. **[YA]** Agregar 열세 / 열네 / 열다섯 살 a la tarjeta de S6: los mayores ya conocen 한/두/세/네 del mismo curso, así que sale como 열 + 한… **[ENE]** Versión "reto" para 12–15: mini-explicación de 이에요/예요 y de 을/를, y batchim oclusivo.

**Niños 2 (prometido para enero 2027) · esqueleto propuesto.** Meta: que Niños 1 + Niños 2 ≈ el núcleo de Básico 1 en versión lúdica. Las lecciones son de la fase 7.

| S | Tema | Lenguaje | Cultura |
|---|---|---|---|
| 1 | Reencuentro + repaso con Dubu | Saludo, nombre, edad · **몇 학년이야?** (así se pregunta entre niños y de adulto a niño) — 저는 중학교 2학년이에요 (con una tabla de equivalencias de grado para Chile, México, Argentina…: un 8.º básico chileno ≈ 중학교 2학년) | 가위바위보 para los turnos |
| 2 | Las letras que soplan y las que aprietan | ㅋ ㅌ ㅍ ㅊ / ㄲ ㄸ ㅃ ㅆ ㅉ (Dubu: vuelta a Gwangjang, que en Niños 1 se jugó de oído; ahora con explicación) | Mercado de Gwangjang |
| 3 | Mi colegio | 학교, 교실, 있어요/없어요 | 급식, 실내화, los alumnos limpian su sala |
| 4 | 설날 se acerca (según la fecha real) | 세배, 새해 복 많이 받으세요 | 떡국, 윷놀이, 설빔 / 한복 |
| 5 | ¿Qué haces? | 가요, 먹어요, 놀아요, 자요 | Un día de un niño coreano |
| 6 | La tienda (가게놀이) | Sino-coreanos hasta 100 + 백 y 천 (sin 일 delante: 천 원), 원, 얼마예요?, 주세요 · billetes de juguete de 100, 500, 1.000 y 5.000 원 | 문구점 |
| 7 | Cuento: 호랑이와 곶감 | Narrar con 이에요 / 있어요 | Cuentos tradicionales |
| 8 | Show 2 + certificado | Integración | 세배 en el show si calza con la fecha |

⚑ Con inicio el lunes 11 de enero, la clase del lunes 8 de febrero (martes 9, 06:00 KST) cae en el feriado sustituto del 설날 en Corea: revisarlo con Abby.

---

## 5. Vocabulario

### 5.1 Inventario real (conteo automático sobre `cursos_es.json`)

| | Básico 1 | Básico 2 | Conv. 1 | TOPIK II | Niños |
|---|---|---|---|---|---|
| Ítems listados | 96 (12/sem) | 94 | 92 | 96 | 85 |
| Repetidos del curso anterior | — | 6 | **1** (다음, dentro de 다음 주 / 다음 단계) | **2** (목표, 예약하다) | 32 con Básico 1 |
| Están en las 230 flashcards de julio | 71 | 20 | 3 | 0 | 42 |
| Están en el Lector o en Dubu | 24 | 4 | 0 | 0 | 28 |
| **Tienen clip nativo** en `/audio/kr` | **26 (27 %)** | **7 (7 %)** | **1 (1 %)** | **0** | **39 (45 %)** |
| Palabras distintas a las que se expone (gramática, práctica, cultura) | ~160 | ~210 | ~135 | ~140 | ~90 |

- **El Lector y Dubu enseñan 71 palabras distintas**, 47 de ellas fuera de la lista de Básico 1 (꽃, 옷, 돈, 고양이, 서울, 주세요…). Es buen input, pero va por un carril paralelo al curso.
- **Las 230 flashcards de julio** (14 campos: saludos, familia, comida, casa, lugares, números, tiempo, verbos, adjetivos…) son hoy **la única lista de A1 organizada por campos de uso**, y ningún curso de octubre las nombra.

### 5.2 Diagnóstico
- **La espiral no llega al vocabulario:** cada curso trae su lista y no vuelve a pedir las anteriores.
- **Nuestra propia referencia no calza con la carga real:** la Guía dice A1 ≈ 800 palabras y A2 ≈ 1.500–2.000, y de cero a A2.1 las listas suman **~280**. El perfil de entrada de A2.1 asume 300–400 palabras. El de TOPIK II asume ~3.000: entre la salida de A2.2 y esa cifra hay **~1.700 palabras que ningún curso cubre**.
- **A2.1 lista palabras temáticas de baja frecuencia** (응원봉, 저고리, 결승, 렌터카) y deja fuera verbos de altísima frecuencia que ya usa sin listarlos: 타다, 알다, 생각하다, 필요하다, 시작하다, 끝나다, 기다리다.

### 5.3 Rangos realistas (activo = lo produce sin ayuda · pasivo = lo reconoce en contexto)

| Curso | Activo al terminar | Pasivo al terminar | Frente a la Guía de la casa |
|---|---|---|---|
| Básico 1 | 120–160 | 250–300 | ≈ 1/3 de A1 (coherente con "A1 parcial") |
| Básico 2 | 250–320 acumulado | 450–600 (~650 con las flashcards) | 60–75 % de A1 |
| Conversacional 1 | 380–480 | 700–900 | ≈ 50 % de A2 |
| Conversacional 2 *(proyección)* | 500–650 | 1.000–1.300 | 65–85 % de A2 |
| Intermedio B1 *(meta)* | + 600–800 | hacia ~3.000 ⚑ | B1 |
| TOPIK II | + ~100 de examen (증가/감소, 장점/단점…) | Asume ~3.000 | Estrategia, no volumen |
| Niños | 50–70 | 120–150 | — |

### 5.4 Arquitectura de vocabulario propuesta

| # | Medida | Cuándo |
|---|---|---|
| V1 | **"Núcleo A1 Chingu" = las 230 flashcards de julio**, sin la columna de romanización y con una columna "semana de Básico 1/2 en la que aparece". Repaso SRS (la hoja "Importar Anki-Quizlet" ya existe) | [YA] opcional · [ENE] oficial |
| V2 | **Dos columnas en cada lista semanal:** *núcleo* (8–10 activas, se evalúan) y *del tema* (pasivas, se reconocen). Así 응원봉 no pesa lo mismo que 알다 | [ENE] |
| V3 | **Contrastar con una lista de frecuencia oficial**, p. ej. el 한국어 학습용 어휘 목록 del 국립국어원 (≈ 6.000 palabras en grados A/B/C; el A ronda las 1.000 ⚑). Meta: que el núcleo de A1.1 a A2.2 cubra el grado A | [ENE] |
| V4 | **Reciclaje explícito:** reconocimiento de las 50 palabras núcleo del curso anterior en el diagnóstico de S1; los labs exigen usar 5 palabras de cursos anteriores | [ENE] |
| V5 | **Audio para todo el vocabulario de curso** con el pipeline existente (SunHi, rate -8 %). Faltan ~70 clips de a11, 88 de a12, 91 de a21 y 96 de TOPIK II. En el Lector: "Mis palabras de la semana" | [2027], empezando por a11 |
| V6 | **TOPIK II:** 12 palabras activas por semana en clase + baraja SRS de 30–50 palabras semanales de temas de examen como tarea recomendada | [YA] |

---

## 6. Speaking

### 6.1 Qué puede DECIR el alumno al terminar cada curso

| Curso | Puede decir | Ejemplos | Todavía no |
|---|---|---|---|
| Básico 1 | Presentarse, familia, qué es algo, dónde está, a dónde va, qué hace cada día, qué le gusta; 1–2 min **preparados** | 저는 마리아예요. 칠레 사람이에요. · 우리 가족은 네 명이에요. · 책상 위에 컴퓨터가 있어요. · 매일 회사에 가요. · 김치를 정말 좋아해요. | Pasado, futuro, hora, edad; intercambios no ensayados de más de 3–4 turnos |
| Básico 2 | Rutina, fin de semana, planes; negar, poder, comparar; conectar dos ideas; **5 min en pares** | 어제 친구하고 영화를 봤어요. · 다음 주에 부산에 갈 거예요. · 수영할 수 있어요. · 한국어는 어렵지만 재미있어요. | Pedir favores, contar experiencias, dar razones con -아서, reparar la conversación |
| Conversacional 1 | Lo que ama de Corea; planes; pedir en un restaurante; opinar con matiz; condiciones; reparar; **5 min con una nativa sin volver al español** | 콘서트에 가 봤어요. · 제주도에 갈까요? · 삼겹살 이 인분 주세요. · 이 한복이 더 예쁜 것 같아요. · 다시 한번 말해 주세요. | Narrar una historia larga, argumentar, cambiar de registro con intención |
| Conversacional 2 *(meta)* | Explicar un aspecto de la sociedad coreana, contar una fiesta vivida, comparar con su país con razones y matiz | 설날에는 가족들이 모여서 떡국을 먹어요. · 많은 한국 학생들이 공부를 많이 해야 해서 힘들 것 같아요. ⚑ (con cuantificador, como pide la regla editorial de §10.4) | Argumentación formal (B1) |
| TOPIK II | Presentar su meta y su plan; justificar una respuesta; resumir un diálogo | 저는 내년 4월에 TOPIK 4급을 받고 싶어요. | — (el oral no es el foco) |
| Niños | Saludo con reverencia, nombre, edad, 2–3 familiares, animal y comida, gustos; **show de 30–40 s** | 저는 열 살이에요. · 우리 엄마예요! (señalando la foto) · 호랑이예요! · 저는 떡볶이 좋아해요. | Preguntas fuera de las fórmulas |

### 6.2 Cuánto habla de verdad cada alumno
- **Básico 1 con 15 alumnos:** unos **10–12 minutos por clase** (≈ 9 en pares + 1–2 en práctica controlada), **80–100 minutos en todo el curso**. Con 7 salas y 20 minutos, la profe pasa ~2,5 minutos por sala: por eso la corrección es diferida.
- **Conversacional 1:** unos 15–18 minutos por clase (salas de 2–3, 스몰토크, labs). Es el curso más speaking-first.
- **Conclusión:** la clase en vivo no alcanza para automatizar. **La palanca es la práctica oral diaria:** 5 minutos de shadowing × 7 días × 8 semanas = **~4,5 h extra**, tres veces lo que da la clase. Para eso hace falta audio (§9).

### 6.3 Auditoría R-C-G-L de Básico 1 (reconocer · controlada · guiada · libre)
● bien · ◐ parcial · ○ ausente

| S | Estructura central | R | C | G | L | Qué falta |
|---|---|---|---|---|---|---|
| 1 | Sílaba | ● | ● | ◐ | — | 이름이 뭐예요? como fórmula |
| 2 | 저는 N이에요/예요 | ● | ● | ● | ◐ | "Saluda a 3 compañeros que no conoces" en vez de un guion fijo |
| 3 | 이게 뭐예요? | ● | ● | ● | ○ | Preguntas abiertas con objetos no preparados ("¿qué hay en tu mochila?") |
| 4 | 우리 N · 누구예요? · números | ◐ | ● | ● | ◐ | Bien: 누구예요? sobre la foto del otro ya es semilibre |
| 5 | N에 있어요 | ● | ◐ | ● | ◐ | Drill corto de 위/아래/옆 antes del tour |
| 6 | -아요/어요 · N에 가요 | ◐ | ● | ● | ◐ | Bien encadenado |
| 7 | "hay" · 을/를 · 은/는 vs 이/가 | ● | ◐ | ● | ○ | **Semana sobrecargada**; la mímica es C, no L |
| 8 | 좋아해요 + integración | ◐ | ◐ | ● | ◐ | La presentación es G (ensayada); la única L es la pregunta del grupo |

**Otros cursos:** Básico 2 tiene L en S4, S6 y S8, pero S3 y S7 están sobrecargadas para una clase oral. Conversacional 1 tiene L todas las semanas; su punto débil es R (falta un momento de *input* antes de producir). En TOPIK II, el speaking vale 10 % a propósito. En Niños, TPR, canciones y juegos cubren R y C de sobra; L solo se espera en los de 13–15.

### 6.4 Objetivos de pronunciación por curso [ENE] (por capas: primero se imita la palabra, después se explica la regla)

| Curso | Se corrige siempre | Se deja pasar |
|---|---|---|
| Básico 1 | ㅓ/ㅗ, ㅡ/ㅜ; tríadas ㄱ/ㅋ/ㄲ y ㅂ/ㅍ/ㅃ; ㅇ final; sin vocal de apoyo tras el batchim (밥 ≠ 바브) · **Se imitan y corrigen como palabra entera, sin explicar la regla:** la 연음 con 이에요/이/을 (사람이에요 [사라미에요], 이름이 [이르미]), el 비음화 de -ㅂ니다 (감사합니다 [감사함니다], 반갑습니다 [반갑씀니다]), el 경음화 del vocabulario del curso (학생 [학쌩], 학교 [학꾜], 식당 [식땅]) y la ㅎ que se cae (좋아요 [조아요]) | Entonación, velocidad; la explicación de las reglas |
| Básico 2 | + **se explica la regla** de la 연음 (먹어요 [머거요], 있어요 [이써요]), del 비음화 en -ㅂ니다/습니다 y de 같이 [가치]; ㄹ intervocálica suave | Asimilaciones complejas |
| Conversacional 1 | + **유음화** (한라산 [할라산], 설날 [설랄]); **ㅎ** (좋아요 [조아요], 많이 [마니]); tensas; entonación de pregunta y de 맞장구 | — |
| Conversacional 2 | + **경음화 y 구개음화 explicados como sistema**; ritmo de frase | — |
| TOPIK II | Lectura en voz alta fluida | — |

### 6.5 Medidas
- **[YA] "Minuto libre" [Para profes]:** 3 minutos al final de los pares con una tarjeta: la pregunta de la semana más una de semanas anteriores, sin guion. Convierte cada semana de A1 en R-C-G-**L** sin tocar el syllabus. Las tarjetas las entrega la Fase 2 (bloque I); la profe no las produce.
- **[YA] Shadowing de las "3 frases clave"** que ya se cierran en coro en cada clase de Básico 1: el clip de 20 s se recorta de la grabación de Zoom, o las graba Jay (§9.3). Kiran no produce audio.
- **[ENE]** Cada plan de sesión de la Fase 2 en adelante abre con **"¿Qué podrá DECIR el alumno después de esta clase?"** y marca las cuatro etapas R-C-G-L.

---

## 7. Lectura

### 7.1 Progresión actual

| Etapa | Dónde |
|---|---|
| Letras | Lector (Alfabeto/Practicar); Básico 1 S1–S2; Niños S1–S2 |
| Sílabas con batchim | Lector; Dubu (mundos 1–4); Básico 1 S2; Niños S3 |
| Palabras | Lector (22 palabras + 34 pictogramas); Dubu; listas del curso |
| Frases sueltas | Hojas de Básico 1 y 2 |
| Texto corto conectado | Casi nada (repaso de la L10; un texto con 부터~까지 en A1.2 S4) |
| Texto auténtico | Recién en A2.1: letra (S2), metro (S3), menú de 네이버 (S4), 한복 en Instagram (S6), LCK subtitulada (S7) |
| Texto de examen | TOPIK II |

### 7.2 Hallazgos
1. **El Lector entrena decodificar hacia la romanización, no leer.** En los modos Lectura y Contrarreloj, las opciones de respuesta son romanizaciones; en Inversa, se parte de la romanización. Además, **el alumno no elige el modo:** en Practicar, cada ronda rota sola (Lectura → Escucha → Inversa, `startDrill()`) y el grupo cambia cada 3 rondas; el Contrarreloj siempre es Lectura. Sirve en las semanas 1–2, pero Básico 2 asigna Contrarreloj en S3 (en un "modo Escucha" que no existe), S5, S6 y S8, y A2.1 y TOPIK II lo recomiendan "para la velocidad de lectura".
2. **No hay peldaño graduado entre la palabra y el texto auténtico.** Ningún curso A1 trabaja un cartel o un menú, que es exactamente el "Leer A1" de nuestra Guía.
3. **La lectura en voz alta no enseña las reglas de sonido:** un alumno que lee 한국어 letra por letra suena mal aunque lea "bien".
4. **No hay lectura con formato TOPIK I**, aunque tres certificados dicen "preparación TOPIK I".
5. **Nadie mide la lectura con comprensión antes de TOPIK II.**

### 7.3 Progresión propuesta

| Curso | Unidad | Tipo de texto | Extensión | Cómo se practica |
|---|---|---|---|---|
| Básico 1 | Sílaba → palabra → frase | S1–2 letras · S3–4 etiquetas con dibujo · S5–8 frases modelo · **lectura de supervivencia**: 입구/출구, 화장실, menú de café con préstamos (아메리카노, 라떼) | Hasta un mini-texto de 4–6 frases | Voz alta con corrección; desde S5, leer y responder una pregunta |
| Básico 2 | Frase → mini-texto | Mini-diálogos de 6–8 líneas, **mensaje de KakaoTalk**, horario, agenda, aviso simple; **1 ítem estilo TOPIK I por quiz** | 60–120 sílabas | Lectura silenciosa + 3 preguntas; voz alta con 연음 marcado |
| Conversacional 1 | Texto auténtico corto | Menú, metro, letras, posts, **reseña de 3 líneas** (네이버/카카오맵), ficha de 한복 | 150–300 sílabas | Tarea con resultado (ya existe) + 3 preguntas de comprensión |
| Conversacional 2 | Narrativo y expositivo | Mito adaptado (해님 달님), nota ligera de prensa, webtoon, calendario de 설날; **primer 한다체 escrito** | 300–600 sílabas | Lectura para el lab; titulares como puente a TOPIK 읽기 |
| Intermedio B1 | Texto conectado | Crónicas, opinión, prensa adaptada, todo en 한다체 | 600–1.000 sílabas | Resumen oral y escrito |
| TOPIK II | Examen | 읽기 1–50 | Completo | Como hoy |
| Niños | Sílaba → palabra (8–11) · palabra → frase fija (12–15) | Láminas, bingo, nombres, "cazadores de 한글" | 1–3 palabras | Juego; los mayores leen el guion del show |

Referencias internas de fluidez (a calibrar con octubre): al final de Básico 1, leer en voz alta un mini-texto de 5 frases sin deletrear; al final de Básico 2, leer un mensaje de 60–80 sílabas y responder 3 preguntas en 3 minutos.

### 7.4 Romanización: política por curso (brief ítem 13)

**Hoy:** el Método Chingu dice "nada de romanización eterna" y el syllabus no la usa nunca. Pero **la herramienta que es la tarea principal de A1 premia al alumno por pasar el Hangul a letras latinas** (Lector: Lectura, Inversa y Contrarreloj; Dubu: `ver:'rr'` en los mundos 1–4; flashcards con columna de romanización). Un alumno puede sacar 3 estrellas en Contrarreloj mirando la romanización y no la sílaba. El problema no es que exista en la semana 1: es que **no tiene fecha de salida.**

**Por qué tiene que desaparecer, y más rápido con hispanohablantes:**
1. **Se lee con reglas del español:** *j* suena a jota (*juseyo*), la *h* se calla (*hanguk* → "anguk"), *eo* y *eu* se leen como dos vocales (*hangugeo* → "an-gu-ge-o", *geu* → "ge-u"). La romanización enseña justo los errores que las profes corrigen desde el día 1.
2. **Esconde el contraste que el español no tiene:** g/k/kk parecen variantes gráficas, no tres sonidos (ㄱ/ㅋ/ㄲ).
3. **No refleja cómo suena el coreano:** 한국어 se romaniza *hangugeo* y se dice [한구거]. La notación en Hangul entre corchetes sí lo muestra.
4. **Es una muleta que frena la lectura:** mientras haya letras latinas en pantalla, el ojo va primero a ellas.
5. **Fuera del aula no existe:** ni en el TOPIK, ni en los menús, ni en el metro, ni en KakaoTalk.
6. **Hay varios sistemas en competencia** (Revisada, McCune-Reischauer, grafías de fans y marcas como *Samsung* o *Lee*), y confunden.

| Curso / contexto | Formato | Romanización | Pronunciación |
|---|---|---|---|
| Marketing, reels, taller gratis | Coreano + romanización + español | Sí (el público aún no lee) | — |
| Básico 1 · S1–S2 | Coreano + romanización (gris, pequeña, **debajo** y **después del audio**) + español, solo en letras y palabras del alfabeto | Sí, como puente de sonido | Pistas en español ("sonríe y di u") |
| Básico 1 · S3–S4 | Coreano + español | Solo si la piden, en palabras con un fenómeno nuevo | Empieza la notación [ ]: 좋아요 [조아요] |
| Básico 1 · S5–S8 | Coreano + español | **No** en decks, hojas ni exámenes | [ ] cuando hay regla de sonido |
| Básico 2 en adelante | Coreano + español contextual → coreano con glosa | **Nunca** | [ ] en Hangul |
| Conversacional 1–2 | Coreano con glosa (regla 90/10 de Abby) | Nunca | [ ] |
| TOPIK II | Coreano; español solo para estrategia | Nunca | — |
| Niños (el niño) | Hangul con colores (como Dubu), dibujo y audio | **No**: a los 8–10 años aún consolida la lectura en español y le transferiría esas reglas | — |
| Niños (la familia) | Nota semanal: frase en Hangul + **romanización para el adulto** + español | Sí: el adulto no lee Hangul y acompaña la tarea | — |

**[YA] sin tocar lo publicado:** Kiran usa romanización solo en S1–S2 y siempre después del audio. En octubre, donde el syllabus dice "Contrarreloj", el mensaje de la semana pide **Practicar → Sílabas o Palabras y "haz 3 rondas seguidas"** (una de las tres es Escucha, porque el modo rota solo). El Contrarreloj queda como extra opcional, porque siempre se responde con romanización. En A2.1 y TOPIK II, en vez del Contrarreloj, 5 minutos de lectura en voz alta del texto de la semana.
**[2027] herramientas (recomendación; no se toca código ahora):** Lector con **elección de modo y de grupo** (hoy rotan solos) y con modo "sin romanización" que se desbloquea con 3 estrellas en Sílabas y Batchim (se elige audio o significado, no romanización). Dubu: conectar el indicador `roman`, que ya existe, a un interruptor visible, apagado por defecto desde el mundo 3. Flashcards v2 sin romanización (se conserva solo en la versión para familias).

---

## 8. Escritura

### 8.1 Hoy

| Curso | A mano | Teclado | Producción más larga | Registro |
|---|---|---|---|---|
| Básico 1 | Trazo (S1), nombre | **Nunca se enseña, pero se usa:** chat en S1 y S2, examen en línea con 6 frases | Guion de 8–10 frases | -아요 |
| Básico 2 | Cuaderno opcional | Se usa (WhatsApp, examen en línea) | 5 frases | -아요; -ㅂ니다 solo para reconocer |
| Conversacional 1 | — | Se usa | 6–8 frases | -아요 |
| TOPIK II | 51–52: completar una oración (registro del texto; 52 en 한다체) · 53–54 en 원고지 | — | Ensayo de 600–700 caracteres | El 51 copia el registro del texto (casi siempre -(스)ㅂ니다); **한다체 en 52–54** |
| Niños | Nombre, palabras, dibujo | No | Palabras sueltas | — |

### 8.2 Hallazgos
1. **Teclado (severidad alta, se arregla ya):** Básico 1 da por hecho un teclado coreano desde la S1, y los exámenes de Básico 1 y 2 son formularios en línea con producción en Hangul. No hay guía en ningún kit. Riesgo en octubre: alumnos que escriben romanización en el chat o que no pueden rendir la parte escrita.
2. **Del "5 frases" al "ensayo de 700 caracteres" no hay escalones.** Ningún curso pide un párrafo conectado antes de TOPIK II.
3. **El 한다체 aparece por primera vez en TOPIK II S4**, y se exige en tres de las cuatro tareas de 쓰기. Es el error nº 1 que anotan las notas de TOPIK II.
4. **El 띄어쓰기 no se enseña nunca.** El hispanohablante tiende a separar la partícula (저 는).
5. **Textos funcionales ausentes** (formulario, nota, mensaje), que son el "Escribir" de A1–A2 en nuestra Guía.

### 8.3 Progresión propuesta

| Curso | A mano | Teclado | Producción meta | Registro y convenciones |
|---|---|---|---|---|
| Básico 1 | Trazo de todas las letras (S1–S2), nombre, etiquetas | **S1: instalar el 두벌식** + tipear las 12 palabras de la semana | **Ficha personal** (이름, 국적, 직업, 전화번호) + 6–8 frases sobre ti | -아요; partícula pegada al sustantivo (primer 띄어쓰기) |
| Básico 2 | Mini-diario opcional | Mensajes de KakaoTalk / WhatsApp | **Párrafo de 8–10 frases en tres tiempos con 3 conectores** (그리고, 그래서, -지만) + mensaje de invitación y de rechazo | Reconocer -ㅂ니다; escribir 3 frases formales |
| Conversacional 1 | — | Reseña, comentario de fan, itinerario | **120–200 caracteres** con opinión y razón | Mensaje formal corto en -습니다 (a un hotel): semilla del 51 |
| Conversacional 2 | **원고지: primer contacto** | Diario | **일기 en 한다체** (200–300 caracteres; en Corea el diario se escribe así, es un contexto auténtico) | Tabla de conversión -아요 → -(느)ㄴ다 |
| Intermedio B1 | 원고지 | Textos de opinión | Párrafos conectados de 300–500 caracteres | 한다체 productivo; conectores de 53–54 |
| TOPIK II | 51–52 (oraciones) · 53–54 en 원고지 | — | 54 completo en 30 min | Como hoy |
| Niños | Nombre, palabras, guion del show | Opcional para 13–15 | Nombre + 5 palabras | — |

**[YA] Guía de teclado de una página [Borrador para alumnos · revisar Jay · probar en un equipo antes de enviar]** (va en el mensaje de bienvenida de todos los cursos de adultos, más 3 minutos en la S1 de Básico 1):
1. Celular: agrega "Coreano (두벌식 / 2-Set)" en Gboard (Android). iPhone: Ajustes → General → Teclado → Teclados → Agregar teclado → Coreano → Estándar.
2. Windows: agrega "Coreano" en Configuración → Hora e idioma → Idioma; cambia de idioma con Win + Espacio y, dentro del coreano, alterna 한/A con la tecla 한/영 o con Alt derecha.
3. Mac: Ajustes → Teclado → Fuentes de entrada → "2-Set Korean".
4. El mapa: consonantes a la izquierda (ㅂㅈㄷㄱㅅ en QWERT) y vocales a la derecha; con Shift salen las tensas (ㅃㅉㄸㄲㅆ) y ㅒ/ㅖ.
5. Práctica: tipea 안녕하세요, tu nombre y las 12 palabras de la semana.

---

## 9. Listening

### 9.1 Hoy
- **563 clips** en `public/audio/kr`: letras, sílabas, ~107 palabras y números. **Una sola frase** (세 시 삼십 분). Una voz, SunHi (TTS femenina, lenta), y Jay en Dubu.
- En clase: dictados en vivo en A1; A2.1 al 90 % en coreano, con el pedido a velocidad natural (S4), una canción y un clip de la LCK; TOPIK II con audio oficial.
- La "Audio Library" de julio (">5 horas") quedó marcada "⏳ Pendiente" y no existe.

### 9.2 Hallazgos
1. **Antes de A2.1 no hay ninguna frase o diálogo grabado** que el alumno pueda repetir las veces que quiera.
2. **El salto es doble:** de palabras sueltas en TTS lento a una profesora nativa al 90 % en coreano, y después al audio del TOPIK II. Básico 2 S2 promete entender la hora "a velocidad normal" y solo se practica con el dictado de Jay.
3. **Una sola voz:** nunca se oye una voz masculina grabada ni dos personas conversando. Las notas de TOPIK II lo confirman: los alumnos "confunden la voz masculina y la femenina".
4. **Sin formato TOPIK I** (듣기 1–30).
5. **Las reglas de sonido afectan más a la escucha que a la lectura:** quien aprendió 맛있어요 letra por letra no reconoce [마시써요].
6. **A favor:** A2.1 entrena bien la escucha interactiva (맞장구, 다시 한번 말해 주세요, 무슨 뜻이에요?).

### 9.3 "Audioteca Chingu": escalera de escucha en 7 niveles

| Nivel | Contenido | Voz y velocidad | Curso | Estado |
|---|---|---|---|---|
| A0 | Letras, sílabas, pares mínimos (어/오, 으/우, 가/카/까) | SunHi, lento | Básico 1 S1–2 · Niños | **Existe** |
| A1 | Palabras del curso | SunHi, lento | Básico 1–2 · Niños | Parcial (27 % / 7 %) → V5 |
| **A2** | **Las 3 frases clave de cada clase** (el cierre de Básico 1 ya las define) | Se extraen del coro de cierre en la grabación de Zoom (clip de 20 s que corta Jay o la producción) o las graba Jay; **Kiran no produce** | Básico 1 y 2 | **Falta · [YA]**: 8 clips por curso; el recorte semanal tiene un responsable (§14.4) |
| **A3** | **Mini-diálogos** de 20–40 s, 2 voces (femenina + masculina), 4–6 turnos | Jay + Kiran/Abby (voces reales); TTS solo como respaldo | Básico 2 | **Falta · [ENE]** |
| **A4** | **Monólogos** de 45–90 s (mi fin de semana, mis planes) con preguntas | Voz real, natural moderada | Básico 2 S4–S8 · Conversacional 1 | **Falta · [ENE]** |
| A5 | **Conversación no ensayada** de 2–3 min entre dos nativos del equipo | Natural | Conversacional 1–2 | **Falta · [2027]** (además es contenido de marca) |
| A6 | Ítems con formato **TOPIK I** (듣기) | Exámenes oficiales publicados en topik.go.kr | Básico 2 (1 por quiz) · Conversacional 1–2 | **Falta · [YA]** con exámenes oficiales |
| B1+ | 듣기 TOPIK II, podcast lento, shadowing | Oficial | TOPIK II | Existe |

Especificación mínima para A3–A4 (desde la Fase 2): guion en Hangul sin romanización; versión lenta y natural; tarea antes (predecir), durante (2–3 preguntas) y después (shadowing de 2 frases); nombre de archivo `Curso_S0X_dialogo.mp3`. Los diálogos TTS de dos voces suenan artificiales: desde A3, priorizar las voces reales del equipo.
⚑ Verificar si el libro 한글학교 한국어 1 y la edición en español de KGIU traen audio utilizable: si lo traen, A2–A3 ya tienen base.

---

## 10. Cultura

### 10.1 Diagnóstico
- **La cultura está en todas las semanas, pero casi siempre como un dato de una línea**, sin una frase que el alumno diga. **Conversacional 1 es el modelo:** ahí la cultura *es* la tarea.
- **Sin frase ancla:** A1.1 S3 (빵 / 파리바게뜨, que además es una marca), S6 (빨리빨리), S7 (온돌).
- **Sin columna vertebral:** ningún criterio dice qué capa de Corea toca cada nivel (tradicional, contemporánea, regional, generacional, individual). La capa regional aparece una sola vez (Jeju en A2.1 S3). La diáspora coreana en Latinoamérica no aparece nunca, y es el ángulo más propio de la casa (Jay creció en Chile, Kiran en Argentina).
- **La rúbrica oral no tiene criterio de cultura.**

### 10.2 Repeticiones que hay que convertir en espiral

| Tema | Dónde aparece | Qué hacer |
|---|---|---|
| Edad y jerarquía | A1.2 S1, A1.2 S2, A2.1 S1 y Niños S6 | A1.2: edad y registro + 만 나이 · **A2.1: negociar el registro** (el mayor pregunta 말 놔도 돼요?; el menor le dice 말씀 편하게 하세요) · A2.2: 선후배 |
| 수고했어요 / 수고하셨습니다 | A1.2 S8 y A2.1 S8 | A1.2: fórmula · A2.1: **a quién se dice** (con la profe al terminar, mejor 감사합니다: el 『표준 언어 예절』 del 국립국어원 recomienda evitar 수고 con superiores) |
| 수능 | TOPIK II S8, A2.2, blog y un post | A1.1: 학원 · A2.1: small talk el día del examen · A2.2: sistema, presión y cambios · TOPIK II: rituales |
| Hangul / Sejong | Niños S2–S3, A1.1 S1, TOPIK II S6 y blog | Un ángulo por nivel: cuento → diseño articulatorio → 외래어 (A2.2 ⚑) → 훈민정음 (TOPIK) |
| Comida | Niños S7, A1.1 S8, A2.1 S4, A2.2 (fiestas) | Espiral legítima: gustos → pedir y describir → comida ritual y 회식 |

### 10.3 Espiral de ejes culturales (uno por peldaño)

| Peldaño | Eje | Pregunta | Capas protagonistas | Lo que el alumno sabe *hacer* |
|---|---|---|---|---|
| Niños | **Corea que se juega** | ¿Cómo juegan, cantan y celebran los niños en Corea? | T + C | 인사, 언니/형, 선생님, un juego coreano |
| Básico 1 | **Corea en la vida diaria** | ¿Qué hago para no quedar mal en mi primer día en Corea? | C + T + R | Elegir 가세요/계세요, 저, 우리; ubicarse |
| Básico 2 | **Corea en el tiempo** | ¿Cómo organiza un coreano su día, su año y su edad? | C + G | Rechazar sin decir "no" (못 + razón, 다음에); **사람마다 달라요** |
| Conversacional 1 | **Corea que amas** | ¿Qué hay detrás de lo que me gusta de Corea? | C + G + R | 여기요, 맞장구, negociar el registro, opinar con -(으)ㄴ/는 것 같아요 |
| Conversacional 2 | **Corea por dentro** | ¿Por qué Corea funciona así y cómo está cambiando? | T ↔ C ↔ G + R + diáspora | Explicar con **옛날에는… 요즘은…**; comparar sin jerarquizar |
| Intermedio B1 | **Corea real** | ¿Cómo vive y habla la gente en la Corea de hoy? | C + G + I | Contar y citar experiencias ajenas |
| TOPIK II | **Corea en debate** | ¿Qué discute hoy la sociedad coreana? | C + G | Argumentar con postura equilibrada y en registro escrito |

### 10.4 Plantilla de cada bloque cultural [ENE]: frase ancla + capa + puente + matiz
Siguen siendo 3–5 minutos dentro de la práctica, no un bloque de trivia.

| Peldaño | Frase ancla | Capa | Puente a Latinoamérica | Matiz |
|---|---|---|---|---|
| Niños | **가위바위보!** | T/C | piedra, papel o tijera | Se usa para decidir turnos ⚑ |
| Básico 1 | **우리 엄마예요.** | T/C | "mi mamá", no "nuestra" | 우리 cambia de tono según el contexto ⚑ |
| Básico 2 | **일이 있어서 못 가요** (fórmula: -아서 de causa llega en A2.1 S2) · **다음에 같이 가요!** | C | "ahí vemos", "después te aviso" | 다음에 es cortesía, no promesa; **사람마다 달라요** |
| Conversacional 1 | **PC방에 가요. 친구하고 게임해요.** | C/G | los "cyber" de los 2000 | Hoy muchos juegan en casa; el PC방 es social |
| Conversacional 2 | **옛날에는 설날에 가족이 다 모였어요. 요즘은 여행 가는 사람도 많아요.** | T→C/G | Fiestas Patrias o Navidad: viajar a ver a la familia | 명절 스트레스; cambios en quién cocina y quién viaja |
| TOPIK II | **출산은 개인의 선택이지만, 저출산은 사회 전체가 함께 풀어야 할 문제이기도 하다.** ⚑ (o: 아이를 낳는 것은 개인의 선택이지만 저출산은 사회의 문제이기도 하다) | C | natalidad en Latinoamérica | Postura equilibrada, registro -다 |

**Lenguaje anti-estereotipo como contenido evaluable** (la escalera ya trae las piezas): 우리 가족은 ~ (A1.1) · **사람마다 달라요** (마다, A1.2) · 저는 매운 음식을 못 먹어요 (A1.2) · 한국에서는 ~ 것 같아요. 그런데 사람마다 달라요 (A2.1) · 어렸을 때는… 지금은… (A2.1, con 어렸을 때 como fórmula: -았/었을 때 llega en A2.2 S6) · 옛날에는… 요즘은… (A2.2) · 지역마다 달라요 (A2.2).
**Regla editorial [ENE]:** nada de "los coreanos + verbo en presente general" sin cuantificador (muchos, en Seúl, los jóvenes, en mi familia). Nada de "nunca" ni "siempre" en costumbres.

**Puentes que funcionan:** 이모/삼촌 ↔ el "tío/tía" chileno · 학원 ↔ preuniversitario · 수능 ↔ PAES, Saber 11, exámenes de admisión · 추석 ↔ Fiestas Patrias · 설날 y "un año más" ↔ cábalas de Año Nuevo · 반찬 ↔ pan con pebre, totopos · estaciones invertidas (첫눈 en diciembre ↔ verano) · diáspora: barrio Flores (Buenos Aires), Patronato (Santiago), Bom Retiro (São Paulo), Yucatán 1905 ⚑.
**Evitar:** "Corea es como Japón o China"; "latinos cálidos / coreanos fríos" (en su lugar, 정 y 맞장구); jerarquizar culturas; Corea del Norte y la guerra fuera de A1–A2 salvo pregunta (⚑ decisión editorial de Jay); Halloween como "fiesta divertida" (Itaewon 2022); *El juego del calamar* con niños.

### 10.5 [YA] Matices que la profe dice en clase (sin tocar el PDF) [Para profes]

| Dónde | Texto publicado (resumen) | Cómo decirlo |
|---|---|---|
| A1.1 S2 y S4 | "Nunca 안녕", "nunca por su nombre" | "Con un mayor, no; entre amigos de la misma edad, 안녕 es lo normal." "Normalmente", no "nunca" |
| A1.1 S3 | 빵 / 파리바게뜨 | En temporada: **이거 뭐예요? — 붕어빵이에요.** (más vivo y sin marca) |
| A1.1 S4 · Niños S5 | 이 사람은 우리 엄마예요 / 아빠예요 | ⚑ Llamar "이 사람" a la propia madre, al padre o a la abuela ante la profe puede sonar poco respetuoso (más con 할머니 o 할아버지). En clase: **우리 엄마예요!** (señalando la foto) y, para los mayores, **이분은 우리 할머니예요** (이분, palabra nueva). 이 사람 queda para amigos o personas de la misma edad |
| A1.1 S5 | Todos se ubican por el metro | Solo con lo de S5 (어디예요 · 에 있어요/없어요 · posiciones). Seúl: **지하철역이 어디예요? — 저기 있어요.** · **화장실이 어디예요? — 3번 출구 옆에 있어요.** · ciudad chica: **우리 동네에 지하철역이 없어요.** Las versiones con 에서 y -아요 (3번 출구에서 만나요 · 버스를 타요) solo como input que dice la profe, sin pedírselas al alumno |
| A1.1 S6 | "El 빨리빨리 empieza en la escuela" | Muchos estudiantes van al 학원 después del colegio. Ancla: **학교에 가요. 그리고 학원에 가요.** (그리고 = "y", como palabra nueva: se enseña en Básico 2). 빨리빨리 solo como autoironía coreana |
| A1.1 S7 | "Muchos duermen sobre un 요 con 온돌" | Capa ayer/hoy: **할머니 집에는 침대가 없어요.** · **우리 집에는 침대가 있어요.** ⚑ |
| A1.2 S1 | "Al conocerse, en Corea casi no se da la mano" | "Al conocerse se hace una pequeña reverencia; en el trabajo también es común darse la mano, inclinando un poco la cabeza." |
| A1.2 S3 | 먼저 가겠습니다 | ⚑ Lo más frecuente en la oficina sería **먼저 들어가 보겠습니다** |
| A1.2 S4 | "Una de las mayores densidades de cafeterías del mundo" | ⚑ Sin fuente: "hay cafés en todas partes y son el lugar para juntarse" |
| A2.1 S6 | "Hanbok y estética" | Quedarse en diseño, color (오방색), 모던 한복 y palacios; no belleza ni cirugía |
| A2.1 S7 | PC방 ~1.500 원/h; finales "en la calle" | ⚑ "Entre ~1.000 y 2.000 원 según la zona"; las finales se ven en estadios y en pantallas |
| Niños S7 | Kimchi "en casi todas las comidas" | "En muchas casas hay kimchi todos los días; a algunos niños no les gusta el picante": **김치 안 좋아해요** |
| Niños S8 | "El 손하트 nació en Corea" | ⚑ "Se hizo famoso en el mundo gracias a Corea" |
| TOPIK II S3 | "El registro -(으)세요 frente a -(스)ㅂ니다 revela quién tiene más jerarquía" | "Fíjate en 반말/존댓말 y en -(으)시- (o en 선배님, 부장님) para saber quién es 선배; -습니다 solo indica formalidad." |
| TOPIK II S4 | "En el 51 siempre se escribe en -(스)ㅂ니다" | "En el 51, copia el registro del texto: casi siempre -습니다 (un 문자 o un correo entre conocidos puede ir en -아/어요)." |

### 10.6 Calendario real

**[YA] Ganchos de octubre (solo como comentario o calentamiento):**

| Fecha en Corea | Qué pasa | Clase | Uso |
|---|---|---|---|
| 9 oct | 한글날 | A1.1 S1 (13 y 15 oct) | "Hace unos días Corea celebró este alfabeto" |
| mié 11 nov | 빼빼로데이 (fecha comercial) | A1.2 S5 (mié 11) | 1 minuto de calentamiento; no presentarla como tradición |
| mié 18 nov | Víspera del 수능 | A2.1 S6 (mar 17, 21:00 CL = mié 18, 09:00 KST) | Abby lo presenta como fórmula que dicen los coreanos (los alumnos no rinden el 수능): **내일은 한국에서 수능 날이에요. 수험생한테 이렇게 말해요: 시험 잘 보세요! 수능 대박!** |
| **jue 19 nov** | **수능** (verificado) | A1.2 S6 (mié 18, 21:00 CL = jue 19, 09:00 KST, en pleno examen) · **TOPIK II S6** (jue 19) | TOPIK II: adelantar el dato de S8 (엿, 찹쌀떡, 붙다) y usar titulares del día como 읽기 |
| fin de nov–dic | 김장 (varía de norte a sur: antes en el norte y en el interior, más tarde en el sur) | **Niños S7 (lun 30 nov)**, que ya trata el 김장 | Ya está alineado; sumar la capa regional |
| otoño–invierno | 붕어빵, 첫눈 ⚑ | A1.1 S3; Niños S3 (눈 = ojo / nieve) | Estaciones invertidas |

**Conversacional 2 y el 설날 (enero 2027):** 설날 2027 = **domingo 7 de febrero** (feriado en Corea del sábado 6 al martes 9); 추석 2027 = 15 de septiembre (ambas fechas verificadas). **La semana de inicio de la cohorte de enero no está definida** (horario tentativo de A2.2: miércoles 21:00 Chile = jueves 09:00 KST, según `Horarios_Equipo_2026-2`).

| Si A2.2 parte la semana del… | 1.ª clase (mié) | Clase justo antes del 설날 | Clase justo después | Semana del 설날 |
|---|---|---|---|---|
| 4 de enero | 6 ene | S5 (3 feb) | S6 (10 feb) | S6 (contarlo) |
| **11 de enero** | 13 ene | S4 (3 feb) | **S5 (10 feb)** | **S5** |
| 18 de enero | 20 ene | S3 (3 feb) | S4 (10 feb) | S4 |

**Tres problemas del orden del brief** (Educación · 수능 · Trabajo · Mitos · 설날 · 추석 · K-drama · Proyecto): 추석 queda con una semana propia en febrero, siete meses antes, y pegada al 설날; no hay ningún Lab (A2.1 tiene dos); y educación y 수능 ocupan dos semanas al inicio, cuando el curso debería abrir reactivando A2.1.
**Propuesta:** el orden de §4.7. 설날 va en la **semana posterior al feriado**, contado en pasado por una profe que lo acaba de vivir (si la profe es Abby, ⚑ confirmar), con 추석 como comparación (y con Fiestas Patrias). Se recuperan Lab 3 y Lab 4. **Regla de arquitectura:** las fiestas son **cápsulas de calendario móviles** (una clase o un bloque de 15 min) que se ubican en la semana más cercana a la fecha real de cada cohorte. Riesgo comercial a considerar: enero y febrero son vacaciones de verano en el cono sur (DECISIÓN DE JAY).

---

## 11. Evaluación

### 11.1 El problema: dos sistemas a la vez

| | Versión "flexible" | Versión "estricta" |
|---|---|---|
| Dónde vive | **Términos §6** (sin umbral: "participación… en las clases en vivo o grabadas") · FAQ (sin umbral: "en base a tu asistencia y participación") · Programa Completo Parte I (`certRegla`), guía del alumno y kits de Kiran y Abby (≥ 75 %, en vivo o grabación + tarea) · Parte III | Solo las fichas por curso (`cursos_es.json`, Parte II y PDFs de `/programas`) |
| Pesos | Participación 25 · Tareas 25 · Quizzes 15 · Final 35 | 40 / 30 / 30 (TOPIK II: 20 / 30 / 40 / oral 10) |
| Certificado | Participación (términos y FAQ, sin porcentaje); ≥ 75 % de asistencia, **en vivo o con grabación + tarea** (Parte I, guía y kits); ≥ 60 % solo como recomendación | ≥ 60 % de nota **y** 6 de 8 **en vivo**; "la grabación no cuenta" (A2.1: "salvo aviso previo", una tercera variante) |

**Riesgo concreto:** un alumno de Básico 2 que recupera tres clases con grabación y tarea cumple los términos, el FAQ y su guía, pero su ficha le niega el certificado. En una disputa, manda el documento legal.
**Otras inconsistencias:** aviso de ausencia del profe (48 h en los kits, 24 h en la Parte III) · cambio de sección ("hasta la semana 2" en las normas, "en cualquier momento, sujeto a cupo" en los términos) · quizzes ("clases 2–7" o "semanas 2–8") · sorteo del monólogo de A2.1 (el "domingo 22" es antes de ver M05, que entra en el sorteo) · "guía de estudio de mitad de curso" prometida para todos, pero solo existe la de A1 de julio · Dubu prometido en la guía del alumno y ausente en `cursos_es.json` · estructura de la clase: `/programa` (`ProgramaContent.tsx`) publica "30' Lección con el deck" para todos, la ficha de a11 publica 15' de presentación + 15' de práctica controlada, a12 25', a21 20' y TOPIK II 15' de estrategia.

### 11.2 PROPUESTA · Marco "Pasaporte Chingu" (DECISIÓN DE JAY)

**Principios:** se evalúa lo que el alumno puede hacer en coreano · pocas evidencias y todas útiles · primero el feedback, después la nota · nadie se queda afuera por un mal día (toda evidencia oral se puede rehacer una vez).

**5 habilidades × 4 niveles descriptivos iguales en toda la escalera:** *Empezando · En camino · Lo logras · Destacas*.

| Habilidad | Qué se mira | "Lo logras" en A1 | "Lo logras" en A2 |
|---|---|---|---|
| **말하기 · Habla** | Pronunciación, precisión, fluidez, comprensibilidad | Se presenta 60–90 s sin leer; se le entiende todo si el otro habla despacio | Sostiene 3 min de role play, reacciona y repara |
| **듣기 · Escucha** | Reconocer, comprender | Distingue 가/카/까 y batchim en un dictado; entiende las preguntas de clase dichas despacio | Entiende un pedido a velocidad natural y anota qué, cuánto y dónde |
| **읽기 · Lectura** | Hangul, vocabulario, comprensión | Lee en voz alta cualquier palabra del curso | Entiende un menú, un mapa del metro o un post sin traductor |
| **쓰기 · Escritura** | Precisión, gramática, vocabulario, organización | 6–8 frases sobre sí con la mayoría de las partículas bien | Itinerario u opinión de 6–8 frases con conectores |
| **문화 · Cultura** | Uso adecuado y comprensión | Usa bien 안녕히 가세요 / 계세요 y el registro -아요 con la profe | Elige el registro según el interlocutor y explica una diferencia sin estereotipos |

La cultura se evalúa **en el uso** (saludos, registro, cómo pide) y con una "reflexión cultural" de 3 frases por curso (en español en A1, en coreano en A2). Nunca con preguntas tipo "¿en qué año…?".

**Tres componentes (reemplazan las cuatro filas actuales):**

| Componente | Adultos A1–A2 | TOPIK II | Incluye |
|---|---|---|---|
| **Clase** | 40 % | 30 % | Asistencia activa (en vivo o recuperada con misión de recuperación), turnos de habla, quizzes de 5 min |
| **Misiones semanales** | 25 % | 30 % | La misión de 25 min (§11.6): entregada o no, más un bonus de calidad |
| **Proyecto final** | 35 % | 40 % | Proyecto de §11.5 (en A1.1 y A1.2 incluye la prueba escrita corta ya publicada) |
| Niños | Sin porcentaje | — | Indicadores semanales + show |

**Por qué 40/25/35:** es la misma tabla que ya tienen Kiran, Abby y los alumnos (25 + 15 = 40), así que solo cambian las fichas. El proyecto final es la prueba de "puedo usar coreano", la promesa de la marca. Las misiones premian el hábito sin que la nota mida disciplina en vez de nivel. TOPIK II es la única variante porque su producto es el puntaje del simulacro.

**Misión de recuperación (nueva, [ENE]):** quien falta ve la grabación y manda un audio de 60 s haciendo la actividad oral de esa clase. Así "grabación + tarea" sigue siendo práctica de habla. A la profe le cuesta 1 minuto. En octubre no condiciona la asistencia (rige "grabación + tarea de la semana"); se puede ofrecer solo como opción recomendada.

**Rúbrica oral:** en octubre sirve la actual (5 criterios × 4 niveles). **[ENE]** Dos opciones para meter la cultura (DECISIÓN DE JAY):
- **(a) Cambio mínimo, recomendado:** "Comprensión" pasa a "Comprensión e interacción" y "Vocabulario" a "Vocabulario y uso cultural". La escala sigue en 20.
- **(b) Un 6.º criterio, "Adecuación"** (1–4, con descriptores por nivel). La escala pasa a 24 y afecta al certificado.

### 11.3 PROPUESTA · Una sola regla de certificado (DECISIÓN DE JAY)

> **[Borrador para alumnos · no publicar sin Jay]**
> **Certificado Academia Seúl de [curso].** Lo recibe quien completa al menos **6 de las 8 clases** (en vivo, o recuperadas con la grabación + la misión de recuperación de esa semana) y **presenta su proyecto final** (en vivo, o por video o reposición antes del domingo siguiente a la clase 8). Quien repone recibe el certificado a más tardar 7 días después de la entrega general.
> **La nota no bloquea el certificado: define tu siguiente paso.** Con 60 % o más, pasas directo al siguiente peldaño sin test de nivel. Con menos, pasas con un plan de refuerzo o repites el peldaño, a criterio del profe.
> *Niños:* 6 de 8 clases + participar en el show (en vivo, o con un video si ese día no puede). *TOPIK II:* además, entregar el simulacro completo.
> El certificado acredita que completaste un curso de Academia Seúl; no es una certificación oficial (el TOPIK oficial lo otorga el 국립국제교육원).

**Por qué esta:** es compatible con los términos §6 y con la regla general de la Parte I y de los kits. Como agrega umbral (6/8), misión de recuperación y proyecto obligatorio, que los términos no tienen, **hay que actualizar los términos §6 antes de abrir la venta de enero** (DECISIÓN DE JAY). Sirve a un público repartido en muchos husos horarios. Mantiene el pilar de habla (la misión de recuperación obliga a hablar y el proyecto es obligatorio). Y separa "terminaste" de "estás listo para subir", que hoy se mezclan en el 60 %. El plazo de reposición (domingo siguiente a la clase 8) existe porque los certificados y la preventa van el lunes siguiente (7 de diciembre en octubre): quien repone no se queda sin certificado justo cuando entrar directo depende de él.
**Variante opcional para enero:** exigir al menos 4 de 8 clases en vivo (pilar 친구). Si se adopta, entra en la misma actualización de los términos §6, antes de abrir la matrícula.
**[YA] Octubre:** aplicar la regla general. Mensaje a Kiran y Abby: *"Aplicamos la tabla general del kit; el 60 % es para pasar directo de nivel."* Los PDFs por curso se regeneran en enero, salvo que Jay prefiera hacerlo ya. No basta con un campo: hay que editar en `cursos_es.json` (y `cursos_en.json`) el campo `evaluacion.certificado` y las menciones de pesos en `quizzes`, `tareas`, `oral` y `examen_final` de a11, a12, a21, topik2 y ninos (p. ej., "cuenta dentro del 40 % de participación", "Peso: 30 %"), además de la nota 7 de `a21.notas_profesor` ("Con ≥ 60 % y 6 de 8 asistencias se emite el certificado"), que sale en el Programa Completo público; luego, regenerar los 6 PDFs de `/programas` y el Programa Completo ES/EN. Aviso de ausencia del profe: 48 h hacia Jay, con excepción de emergencia.

### 11.4 Progresión de la evaluación por curso

| Curso | Entrada | Durante | Mitad (S4) | Final | Habilidades protagonistas |
|---|---|---|---|---|---|
| Básico 1 | Audio base de 20 s | Quiz de lectura y vocabulario; estrellas del Lector; audio semanal | Leer 10 palabras en voz alta (audio) | Proyecto oral + prueba escrita de 30 min (ya publicada) | **Lectura** · Habla |
| Básico 2 | Diagnóstico oral de 2 min (existe) | Quiz de conjugación y partículas; mini-diario | El mini-diario de pasado | Conversación en pares + prueba escrita (existen) | Habla · **Escritura** |
| Conversacional 1 | Diagnóstico + autopresentación grabada (existe) | Quiz oral; audio semanal | Lab 1 + autoevaluación (existe) | "Seúl en 24 horas" + "antes y después" (existe) | **Habla** · Escucha · Cultura |
| Conversacional 2 | Reconexión oral | Audio + texto auténtico corto | Lab 3 | Mini-pódcast + guion escrito | **Cultura** · Habla · Escucha · Escritura |
| Intermedio B1 | Diagnóstico escrito + oral | Audio + párrafo en 한다체 | Resumen de un texto | Proyecto de narración o reportaje ⚑ a diseñar | Las 5 equilibradas |
| TOPIK II | Simulacro reducido + entrevista (existe) | Tarea cronometrada; corrección de 쓰기 | 51–53 corregidos | Simulacro de 180 min (existe) + plan personal | Lectura · Escucha · **Escritura** |
| Niños | Sin test | Indicadores semanales (existe) | Resumen de 3 líneas para la familia | Show | Habla · Lectura · Escucha |

**Qué recibe el alumno:** en la S4, un "chequeo de mitad" de 3 líneas, que reemplaza la promesa de una "guía de estudio" individual con una carga realista. En la S8, el **Pasaporte Chingu** (5 habilidades, una fortaleza, un foco y la recomendación de peldaño). Y el **audio "antes y después"** en todos los cursos de adultos: hoy solo lo tiene A2.1, y es la evidencia más motivadora y la más barata.
**Hueco:** entre A2.1 y TOPIK II casi no se evalúa la escritura. A2.2 la recupera con el guion del pódcast y el 일기.

### 11.5 Proyectos finales (PROPUESTA; consigna, modelo y rúbrica completos en cada fase)

| Curso | Hoy (publicado) | Proyecto propuesto | Lenguaje esperado (muestra) |
|---|---|---|---|
| Básico 1 | Mini-presentación "Yo en coreano" de 1–2 min + una pregunta del grupo (guion en S7) | **[ENE] "Mi mundo en 4 fotos"**: yo, mi familia, mi pieza, algo que me gusta; 60–90 s sin leer + 2 preguntas del grupo (en octubre se mantiene "Yo en coreano", con 4 fotos solo como apoyo visual opcional) | 저는 칠레 사람이에요. 우리 가족은 네 명이에요. 방에 침대가 있어요. 저는 김치를 좋아해요. |
| Básico 2 | 5 min en pares sobre 6 temas | **"Mi semana y mi plan · 지난주와 다음 주"**: semana pasada + plan + invitación aceptada o rechazada; agenda escrita en Hangul | 아홉 시부터 여섯 시까지 일했어요. 다음 주에 부산에 갈 거예요. 미안해요, 내일은 못 가요. |
| Conversacional 1 | Monólogo de 2 min + role play sorteado | **"Seúl en 24 horas · 서울에서 24시간"**: plan con presupuesto + audioguía de 2 min + pedido en el restaurante en vivo (el Lab 2 ya existe como calentamiento) | 한복을 입으러 경복궁에 가요. 삼겹살 이 인분 주세요. 시간이 있으면 PC방에 가요. |
| Conversacional 2 | "Explica algo de la sociedad coreana" | **"Corea por dentro, contada por ti"**: mini-pódcast de 3 min + preguntas + guion de 8–10 frases | 수능 때문에 스트레스를 많이 받는 학생이 많아요. ⚑ |
| TOPIK II | Simulacro + plan | **"Ensayo general + mi ruta a abril"**: simulacro + portafolio de 쓰기 (el 54 de S7 reescrito frente al del simulacro) + metas por sección que sumen el corte total (120 para el 3급 · 150 para el 4급; no hay mínimo por sección) | -(느)ㄴ다 · 조사 결과에 따르면 · 증가하다 / 감소하다 · 따라서 |
| Niños | Show de 30–40 s + 5 palabras + 5 preguntas | **"우리 반 발표회 · El show de mi cartel"**: el cartel se construye en S2, S4, S5 y S7; versión **Explorador (8–11)** y **Reto (12–15)**, que suma 2 frases de gustos y una pregunta a otro niño | 안녕하세요! 저는 소피아예요. 열 살이에요. 저는 호랑이를 좋아해요. |

### 11.6 Misión semanal de 25 minutos (reemplaza las 3 entregas)
Hoy las tareas pesan **60–120 min por semana en adultos (Básico 2 declara 2 h) y ~150 min en TOPIK II** (el brief pide 20–30), como en §3.1. Niños declara "20 min × 3–4 días = 2 horas" (la cuenta no da).

| Curso | Input (≈ 10') | Output (≈ 10') | Puente a la clase siguiente (≈ 5') | Extra opcional |
|---|---|---|---|---|
| Básico 1 | Lector o Dubu: **una pestaña exacta** (el modo y el grupo rotan solos) | Audio personal de 30–45 s | Una foto o un objeto para la próxima clase | Hoja del libro |
| Básico 2 | Drill corto (flashcards de conjugación; Lector solo S1–S2) | Mini-diario de 4–5 frases, escrito y en audio | Una pregunta para un compañero con la estructura siguiente | Hoja de 15–20 frases |
| Conversacional 1 | Input auténtico breve con 5 palabras | Audio de 60–90 s con resultado | Material para el módulo siguiente | Texto de 5–8 frases (alternar) |
| Conversacional 2 | Texto o clip de 2 min | Audio de 90 s | Pregunta para el debate | Guion escrito (obligatorio en S6–S7) |
| TOPIK II | **Núcleo 30–45'**: una sección cronometrada de un examen oficial | Una producción de 쓰기 | Autocorrección con clave en un formulario | "Ruta intensiva" (hoy obligatoria) |
| Niños | Lector o Dubu 10' × 3 días (pestaña exacta en la nota) | Audio o video de 10–30 s | La pieza del cartel | Colorear, cazar 한글 en casa |

**[YA]** En octubre, lo que sobra se presenta como "extra" en el mensaje semanal, sin cambiar el programa. El output rota entre audio, texto, video y mini-diálogo por WhatsApp, y una vez por curso hay una misión cultural.

---

## 12. Prerrequisitos de entrada por curso

| Curso | Requisito declarado | Lo que de verdad necesita | Cómo se verifica hoy | Riesgo | Cómo debería verificarse |
|---|---|---|---|---|---|
| Básico 1 | Ninguno | — | — | — | Sin test; audio base de 20 s en la S1 |
| Básico 2 | A1.1, Nivel 1 de julio o test | Leer con batchim; 이에요/예요; 있어요; 은/는, 이/가, 을/를, 에; -아요 regular; sino 1–100 | `/test-nivel`: **5 preguntas de autodeclaración**. Con 8–10 puntos recomienda "Básico 2, Conversacional 1 **o TOPIK II**" | **Alto** | [ENE] **Micro-diagnóstico de 12 ítems** (4 lectura, 4 partículas, 4 conjugación) + audio de 30 s por WhatsApp |
| Conversacional 1 | A1.2 o test (web o 10 min por WhatsApp) | 3 tiempos; 이/가, 을/를, 에, 에서; 2–3 min de conversación | Igual; la vía de WhatsApp sí sirve | Medio | [ENE] Audio guiado de 2 min **obligatorio** para quien no viene de Básico 2 |
| Conversacional 2 | A2.1 | Paquete de salida de A2.1 (§2.3) | — | — | [ENE] Egresados de A2.1 con ≥ 60 % entran directo; el resto, audio guiado |
| Intermedio B1 | (por crear) | Paquete de salida de A2.2: -(으)니까, -기 때문에, -(으)시-, -는데, 한다체 de reconocimiento | — | — | [ENE] Diagnóstico escrito corto + conversación de 5 min |
| TOPIK II | B1 por test ("diagnóstico escrito estilo TOPIK + conversación de 5 min con Jay") o resultado TOPIK previo | Conectores B1, lectura en 한다체, ~3.000 palabras ⚑, capacidad de escribir el 51 | El diagnóstico descrito **no está en el sitio**; el filtro real es en la clase 1, **después del pago** | **Alto**: alumno mal ubicado en un grupo de 8 | **[YA]** Jay aplica el diagnóstico de `TOPIK2_Clase01` (3 conectores + un 51) por WhatsApp **antes de confirmar la matrícula**. [ENE] En el test web, TOPIK II solo como "conversemos". **DECISIÓN DE JAY:** qué pasa si alguien no pasa el filtro (hoy la norma solo habla de cambios de sección hasta la S2, no de cambio de curso) |
| Niños | 8–15 años + adulto acompañante | — | Edad declarada | Amplitud del rango (§13) | Edad + preferencia; test de 5 min para familias con raíces coreanas (comprensión oral alta y lectura nula, ⚑ caso a caso) |

**Regla de edad adultos/Niños (hoy se contradice):**

| Fuente | Dice |
|---|---|
| `textos_generales.js` (FAQ, ninosNota) y Guía para familias §10 | "Desde los 13 años y ritmo rápido → Básico 1" |
| `app/privacidad` §8 | Cursos de adultos: **14 años o más**; entre 14 y 18, con autorización |
| Rango de Niños | 8–15, así que un chico de 14–15 cabe en los dos |

**Recomendación (DECISIÓN DE JAY, antes de la venta de enero):** alinear en **14**, que es lo que dice el texto con más peso legal. 8–11 → Niños · 12–13 → Niños / Teens (no adultos) · 14–15 → Teens o Básico 1 con autorización y conversación de 5 min con Jay · 16+ → adultos. Falta además un **protocolo para menores en grupos de adultos**: número del apoderado en el WhatsApp o aviso a la profe; nada de contacto privado profe–menor; los avisos importantes van al apoderado (⚑ redactar en la fase de políticas).
**Detalle del test web:** la pregunta 4 da el máximo puntaje a "marca el tema/sujeto" para 은/는, que mezcla justo la distinción que enseñamos. Hay que corregirlo cuando se rehaga el test (no se toca código en esta fase).

---

## 13. Competencia esperada al terminar cada curso ("puede hacer")

Condiciones que siempre acompañan la promesa: *en los temas que practicaste · con un interlocutor paciente · con preparación cuando se indica.*

### Básico 1 (A1.1)
**Puede:** leer en voz alta, despacio, cualquier palabra en Hangul; escribir su nombre y las palabras del curso con teclado y a mano · saludar y despedirse eligiendo bien 가세요/계세요 · presentarse (nombre, país, ocupación) · preguntar qué es algo y quién es alguien; presentar a su familia con una foto · decir dónde vive y dónde están las cosas · contar su día con ~15 verbos en presente y decir qué le gusta y qué no · dictar un teléfono y decir cuántos son en su familia · hacer una presentación **preparada** de 1–2 min y responder una pregunta simple.
**Todavía no:** hora, edad, fechas, pasado, futuro, comprar, seguir una conversación a velocidad normal.
**Tramo:** parte inicial de A1, en temas personales ensayados.

### Básico 2 (A1.2)
**Puede:** decir y entender la edad, la fecha, el cumpleaños, la hora y un teléfono · contar su rutina, su fin de semana y sus planes en 6–8 frases con -고 / -지만 (con errores en irregulares que no impiden entender) · decir qué no hace, qué no puede y qué sabe hacer; comparar dos cosas · conversar 5 min con un compañero, con pausas · *(enero: pedir en un café o una tienda, preguntar precios, decir qué quiere y proponer un plan).*
**Todavía no:** razones más allá de 그래서 / -지만, favores corteses, honoríficos, audio auténtico.
**Tramo:** A1 en los temas centrales, con primeras islas de A2 (rutina y pasado).

### Conversacional 1 (A2.1)
**Puede:** conversar 5 min con una nativa sobre K-pop, viajes, comida, ropa y videojuegos sin pasar al español, pidiendo que repita o aclare · contar experiencias, dar una razón simple, proponer y aceptar planes, pedir en un restaurante con contadores, describir y opinar ("me parece que"), decir cuándo y bajo qué condición hace algo · entender un pedido a velocidad natural · leer un menú o un mapa del metro · *(enero: hacer peticiones corteses en orden y decir qué hay que hacer; el habla informal se reconoce desde A2.2).*
**Todavía no:** narrar una historia larga, argumentar, honoríficos con soltura, escribir más que mensajes cortos.
**Tramo:** A2 en temas conocidos y con apoyo del interlocutor.

### Conversacional 2 (A2.2) · meta
**Puede:** narrar una historia o una fiesta en pasado con fondo y hecho (-는데) · explicar razones y propósitos (-(으)니까, -기 때문에, -(으)려고) · hablar con cortesía en contextos formales (-(으)시-, -ㅂ니다 en un saludo de oficina) · reconocer el 한다체 en un cuento o una reseña y escribir un 일기 corto · usar un 반말 básico con amigos · opinar sobre un drama y comparar Corea con su país sin estereotipos.
**Tramo:** A2 más completo, en el umbral de B1 en la narración.

### Intermedio B1 · meta
**Puede:** contar la trama de una película, citar lo que dijo otro, explicar ventajas y desventajas, arreglárselas en casi cualquier situación de viaje y escribir un párrafo conectado en 한다체. **Sale listo para entrar al track TOPIK II con la meta del nivel 3.**

### TOPIK II (track)
**Puede:** administrar los 180 minutos; resolver 읽기 y 듣기 1–20 con método; escribir 51–53 con plantilla y el registro correcto; conocer su puntaje real y tener un plan hasta el examen de abril de 2027.
**No promete:** subir de nivel de lengua en 8 semanas. Promete convertir el nivel que traes en puntaje.

### Coreano para Niños (8–15)

| Logro | 8–10 años | 11–12 años | 13–15 años |
|---|---|---|---|
| Leer | 6 vocales, sílabas de 2 letras, su nombre | Palabras con batchim ㄴ ㅁ ㅇ ㄹ | Palabras nuevas del curso sin ayuda; empieza con aspiradas y tensas (reto) |
| Hablar | Saludo + nombre + edad + gustos, con modelo | Presentación de 30–40 s de memoria | 40–60 s + responder una pregunta no ensayada |
| Entender | Instrucciones de clase con gesto (네, 잘했어요, 다시) | Preguntas del curso | Preguntas del curso a velocidad de clase |
| Escribir | Su nombre en 한글 | Nombre + 5 palabras | Nombre + frases del guion |
| Cultura | 인사, 가위바위보, el tigre | 언니/형, 김장 | Registro de pares (반말) frente al de la profe ⚑ |

**Tramo:** sin CEFR. Internamente, Niños 1 ≈ Pre-A1 ≈ semanas 1–3 de Básico 1 + frases fijas.

### Matriz de síntesis (en *cursiva*, la meta desde enero donde hoy hay un hueco)

| Curso | DECIR | LEER | ESCRIBIR | ENTENDER |
|---|---|---|---|---|
| Básico 1 | Yo, familia, objetos, lugares, rutina, gustos; 1–2 min preparado | Cualquier sílaba; palabras y frases del curso; *carteles y menús* | *Teclado 두벌식*; 6–8 frases; *ficha personal* | Preguntas del curso despacio; *3 frases clave grabadas* |
| Básico 2 | Rutina, pasado, planes, negación, habilidad, comparación; 5 min en pares | *Mensajes y avisos de 60–120 sílabas; ítems TOPIK I* | *Párrafo de 8–10 frases con conectores; invitación y rechazo* | Números, horas, fechas; *mini-diálogos de 2 voces* |
| Conversacional 1 | Experiencias, propuestas, pedidos, opiniones, reparación; 5 min con una nativa | Menú, metro, letras; *reseñas con preguntas* | *120–200 caracteres con opinión y razón; mensaje en -습니다* | Clase al 90 % en coreano; *conversación de 2 nativos* |
| Conversacional 2 | Explicar sociedad, narrar fiestas y mitos, comparar | Textos de 300–600 sílabas; titulares | *일기 en 한다체; 원고지 básico* | Clips de K-drama con apoyo; *monólogos de 60–90 s* |
| Intermedio B1 | Narrar tramas, citar, pros y contras | Textos en 한다체 de 600–1.000 sílabas | Párrafos conectados en 한다체 | Conversación natural sobre temas conocidos |
| TOPIK II | Meta y plan; justificar respuestas | 읽기 1–50 con triaje | 51–54; el 54 en 30 min | 듣기 1–50 con notas |
| Niños | Show de 30–60 s | Sílabas y palabras | Nombre y palabras | Instrucciones de juego |

---

## 14. Tipos de material recomendados por curso

### 14.1 Tabla de tipos
●● núcleo · ● apoyo · — no aplica

| Material | Básico 1 | Básico 2 | Conv. 1 | Conv. 2 | Interm. B1 | TOPIK II | Niños |
|---|---|---|---|---|---|---|---|
| Deck semanal (plantilla trilingüe de la casa) | ●● | ●● | ●● | ●● | ●● | ● | ●● (muy visual) |
| Guía del profe por clase (secuencia, errores, plan B) | ●● | ● | ●● (en coreano para Abby) | ●● | ●● | ● | ●● (dos profes) |
| Hoja de misión semanal (25 min) | ●● | ●● | ●● | ●● | ●● | ●● | ●● (para la familia) |
| Hoja de vocabulario con audio (núcleo / tema) | ●● | ● | ● | ● | ● | ●● | ● (con dibujos) |
| Ficha gramatical explicada desde el español | ● | ●● | ● | ● | ●● | ●● (fórmulas de 쓰기) | — |
| Audio: Audioteca Chingu | ●● (A0–A2) | ●● (A2–A4) | ●● (A4–A6) | ●● (A5) | ●● | ●● (oficial) | ●● (canciones) |
| Tarjetas de rol o de estación | ● | ●● | ●● | ●● | ●● | ● | ● (juegos) |
| Material auténtico | — | ● | ●● | ●● | ●● | ●● | ● |
| Quiz de 5 ítems | ●● | ●● (+1 ítem TOPIK I) | ● oral (+1 TOPIK I) | ● oral | ● | ●● | ●● (juego) |
| Kit de proyecto final (consigna, modelo, rúbrica) | ●● | ●● | ●● | ●● | ●● | ●● | ●● |
| Lector / Dubu | ●● (S1–S4) | ● (S1–S2) | — | — | — | — | ●● |
| Flashcards / SRS | ●● (Núcleo A1) | ●● | ● | ● | ● | ●● | ● |
| Guía de teclado | ●● | ● | ● | — | — | — | ● (13–15) |
| Nota semanal a la familia + pasaporte 한글 | — | — | — | — | — | — | ●● |
| Pasaporte Chingu / informe | ●● | ●● | ●● | ●● | ●● | ●● (por sección) | ●● (5 líneas) |
| Planilla de asistencia y misiones | ●● | ●● | ●● | ●● | ●● | ●● | ●● |

**Separación de materiales (regla para todas las fases):** cada paquete de clase sale en dos archivos. **Profe:** guía, claves, rúbrica, notas de errores, plan B. **Alumno:** deck, hoja, misión, vocabulario, sin respuestas ni notas internas.

### 14.2 Lector, Dubu y taller: dónde sirven de verdad

| Curso | Lector | Dubu | Taller en video |
|---|---|---|---|
| Básico 1 | **Núcleo S1–S4**; S5–S8 solo Palabras/Pictogramas, 3 rondas seguidas (una es Escucha: el modo rota solo) | **Núcleo S1–S3** (oído para ㅓ/ㅗ y las tensas) | "Clase 0" antes del 13 oct y recuperación de la S1 |
| Básico 2 | Solo S1 (Sílabas/Batchim, 3 rondas seguidas para pasar por Escucha) y S2 (Números) | No | Remedial para quien entra por test y lee lento |
| Conversacional 1, 2, B1 | **No asignar** | No | No |
| TOPIK II | **Quitar en enero** (el Contrarreloj mide sílabas; el 읽기 se juega en párrafos) | No | No |
| Niños | Núcleo todo el curso, **una pestaña exacta en la nota** (el modo y el grupo rotan solos; ojo: el grupo "básicas" de Vocales trae ㅑㅕㅛㅠ, que Niños S1 no enseña) | **Núcleo**, en el orden en que Dubu abre los barrios (cada uno exige terminar el anterior): Bukchon ↔ S1–S2 · Insadong ↔ S2–S3 · Hongdae ↔ S3–S4 · Gwangjang ↔ S5–S6 (como juego de oído, sin explicar aspiradas y tensas) · Río Han y Estación de Seúl ↔ S7–S8 o Niños 2 | Para las familias en la semana 0 |

**Regla del brief §17:** cada vez que se asigna el Lector o Dubu, la misión dice qué habilidad entrena (decodificar, oír una oposición, leer rápido). Si no se puede decir, no se asigna.
**Lo que falta en el ecosistema no es otra app:** (1) **registro de tareas y asistencia** (Form + planilla; sin él no se puede aplicar "grabación + tarea = asistencia" en octubre ni calcular el 25 % de misiones desde enero) · (2) **banco de escucha nativa** (§9.3) · (3) **formularios autocorregibles** para 읽기/듣기 de TOPIK · (4) **paquetes de palabras por lección del libro** en el Lector [2027] · (5) modo **Frases** en el Lector [2027]. No construir apps de habla para A2: el audio de WhatsApp más la corrección de Abby ya funciona.

### 14.3 Inventario: qué existe y qué falta (P0 = antes de la 1.ª clase de ese curso · P1 = durante la cohorte, con 2 semanas de colchón · P2 = enero)

| Curso | Existe | P0 | P1 | P2 |
|---|---|---|---|---|
| Básico 1 | Libro; deck de Hangul de 126 láminas; hoja de Hangul; glosario; apuntes de Jay por lección; MidTerm A1 + guía; 230 flashcards; libro propio *Primeras Palabras*; Lector, Dubu, taller; kit de Kiran | **Confirmar si existen los decks por lección en 60 min** (`Horarios_Equipo_2026-2` dice "decks de A1.1 listos", pero en el repo no están; los de julio son de 90 min y otra secuencia; decisión 0, plazo jue 1 oct); quiz S2; plantilla de audio semanal; guía de teclado | Examen final desde el MidTerm (sin hora, máximo 2 ítems de L9); kit "Yo en coreano" tal como está publicado (1–2 min, una pregunta, guion en S7), con 4 fotos como apoyo visual opcional ("Mi mundo en 4 fotos", 60–90 s y 2 preguntas, queda en [ENE]) | Decks oficiales alineados al libro; paquetes del Lector |
| Básico 2 | Decks de julio reutilizables (`05_Fechas_Numeros`, `08_Comprar`, `09_Pasado`, `10_Futuro_Vacaciones`, `11_Invitar_Cierre`) con sus materiales; one-pager de números; lista de contadores | Hoja 1 + protocolo del diagnóstico oral | Hojas 2–7 (reciclando julio); hoja de partículas en formato de examen; **ubicar el "examen A2 de la casa"** para la clase 8 del mié 2 dic (Desarrollo_Clases dice que está listo, pero no está en el repo) | Banco de 8 microdiálogos; examen rehecho según §4.5 |
| Conversacional 1 | Decks M01–M05 (9 láminas, 3 fotos pendientes cada uno) | Clase 1 completa (mini-deck de orientación, tarjeta de entrevista, modelo de audio de Abby) + **M01 rehecho** (20 oct) | M02–M05 rehechos; tarjetas de los labs (10 nov, 1 dic); tarjetas del sorteo | Kit "Seúl en 24 horas" |
| Conversacional 2 | Decks M06–M10 y programa de 10 semanas (esqueleto de julio) | — | — | Ficha en `cursos_es.json` + 8 decks según §4.7 |
| TOPIK II | Clase particular del 17 sept (reutilizable para la S1, **no su plan de 8 semanas**) | S1 adaptada | Guía por tipo de pregunta; plantillas 51–54; 원고지; formularios con clave; 4–5 exámenes oficiales | Banco de ensayos 54 corregidos (anónimos, con permiso) |
| Niños | Programa, guía para familias, parte de Niños en el kit de Abby; `Programa_Infantil_A1_Propuesta.docx` en D:\ (sin revisar) | **Todo el kit de la clase 1:** guion con roles, canción de saludo propia (nunca comercial; letra ⚑), lámina de vocales, bingo, tablero, plantilla de nota, tabla de nombres en Hangul ⚑; confirmar el consentimiento para grabar a menores | Láminas S2–S8, canciones de familia y números, plantilla del cartel, guion del show | Niños 2; decisión de bandas por edad |
| Transversal | Plantilla de certificado del **taller** | Registro de tareas y asistencia | Informe de mitad (3 líneas); **plantilla de certificado de curso** (antes del 30 nov) | Pasaporte Chingu (generador `docx` de la casa) |

**Conversacional 1: el deck frente al syllabus** (Abby tiene que dar lo publicado, que es lo que leen los alumnos):

| Módulo | Fecha | Gramática del deck | Gramática publicada |
|---|---|---|---|
| M01 K-pop | mar 20 oct | -아/어서 · -(으)ㄹ 수 있다 · -(으)ㄹ 줄 알다 | -아/어 봤어요 · 제일 · N 중에서 · -아서 |
| M02 Viajes | mar 27 oct | N보다 · 처럼/같이 · -(으)ㄴ 적이 있다 | -(으)ㄹ까요? · -(으)러 가요 · (으)로 · -아서 |
| M03 Comida | mar 3 nov | -(으)로 만들다 · -이/가 들어가다 · -아/어서 | -아/어 주세요 · contadores · -지 마세요 · -(으)ㄴ + N |
| M04 Hanbok | mar 17 nov | -(으)ㄴ/-는/-(으)ㄹ + N · A-게 · -고 싶다 | -아/어 보여요 · -(으)ㄴ/는 것 같아요 · -지만 · 보다 |
| M05 PC방 | mar 24 nov | -기 전에 / -(으)ㄴ 후에 · -(으)ㄹ 거예요 · -기로 하다 | -(으)ㄹ 때 · -기 전에 / -(으)ㄴ 후에 · 잘/못 · -(으)면 |

Se reutilizan el vocabulario y las láminas culturales (que están bien). Se rehacen la lámina de gramática, las preguntas y la tarea.

### 14.4 Carga del equipo (estimación con grupos llenos; no es medición)

| Profe | Carga semanal | Veredicto |
|---|---|---|
| Kiran (Básico 1 × 2 secciones, hasta 30 alumnos) | 6–7 h | Realista **si los decks existen**. Hay que cumplir de verdad la regla "Kiran no produce material, solo enseña": los clips de las 3 frases clave, la tarjeta de gustos y las del minuto libre no son tarea suya (§6.5, §9.3) |
| Abby (Conversacional 1 + Niños) | 7,5–10,5 h | Realista para enseñar, **no para rehacer 5 decks** en paralelo |
| Jay (Básico 2 + TOPIK II + Niños + coordinación) | **13–19 h** (pico en la S8 de TOPIK: +4 h de simulacros) | **No es realista** además de producir y lanzar. El cuello de botella de octubre es Jay |

**Cómo sostenerlo (PROPUESTA):** (1) **presupuesto de feedback de 3 min por alumno y semana**: feedback grupal de "los 3 errores del día" + feedback individual rotativo (un tercio del grupo por semana; cada alumno recibe al menos 3 devoluciones personales por curso); en TOPIK II, línea a línea solo en 51–52, 53 y 54 · (2) autocorrección donde se pueda (claves, Forms) · (3) plantillas que escriben por el profe (informe, Pasaporte, nota a familias) · (4) **el material de la semana N está listo al cierre de la semana N−2** · (5) reutilizar antes que crear · (6) borradores con los generadores de la casa, revisión de naturalidad de Abby y aprobación final de Jay · (7) **un responsable del recorte semanal** de las 3 frases clave (clip de 20 s del coro de cierre, desde la grabación de Zoom): la persona de producción que Jay designe antes del 13 oct; si no hay nadie, Jay las graba. Jay no escribe material desde cero en octubre. El pico de la S8 (30 nov – 7 dic: cierres, simulacros, informes, certificados y preventa de enero) se prepara desde noviembre.

---

## 15. Huecos, redundancias y problemas

Severidad: **Alta** = rompe la progresión, deja a un alumno sin poder cumplir o hace una promesa pública que no se cumple · **Media** = baja la calidad o sobrecarga · **Baja** = pulido.

| # | Sev. | Problema | Evidencia | Curso / semana | Arreglo |
|---|---|---|---|---|---|
| 1 | **Alta** | Falta el tramo B1; TOPIK II asume gramática, registro y vocabulario que la escalera no da | `topik2 · requisito_entrada`, S1, S4; `lib/nivel1.ts` (TOPIK II = paso 5); Guía CEFR–TOPIK | A2.2 → TOPIK II | [YA] kit de nivelación · [ENE] Intermedio B1 + track |
| 2 | **Alta** | Dos reglas de evaluación y certificado; la de las fichas contradice los términos | Términos §6, FAQ, guía, kits vs `cursos_es.json`; A2.1 con una tercera variante | Todos | [YA] aplicar la general · [ENE] unificar |
| 3 | **Alta** | Certificados y etiquetas prometen nivel logrado | `a12` "A1 completo (A2 parcial)", "examen A2"; `a21` "TOPIK I nivel 2"; `topik2` "CEFR B1+" | A1.2, A2.1, TOPIK II | Jay antes del 7 dic · [ENE] |
| 4 | **Alta** | Promesa pública "decir la hora" en Básico 1, que el curso prohíbe adelantar | Logros en `lib/nivel1.ts` vs `a11 · objetivos` y notas | A1.1 | [YA] corregir el texto (DECISIÓN DE JAY; no se toca código en esta fase) |
| 5 | **Alta** | Se evalúa lo no enseñado: examen de A1.1 antes de la L9; en S8 se enseña y evalúa lo nuevo el mismo día | `a11 · evaluacion.examen_final`; `a12 · S8` | A1.1 S7–S8; A1.2 S8 | [YA] adelantar como fórmulas · [ENE] S8 sin gramática nueva |
| 6 | **Alta** | -(으)세요 y -(으)시- ausentes; -지 마세요 antes que -(으)세요 | `a21 · S4`; toda la escalera | A1.2–A2.2 | [YA] lámina de Abby · [ENE] |
| 7 | **Alta** | Comprar, pedir y querer fuera de A1 | Primera aparición en `a21 · S1` y `S4` | A1.1–A1.2 | [ENE] |
| 8 | **Alta** | Teclado coreano exigido y nunca enseñado | Chat en `a11 · S1–S2`; exámenes en línea | A1.1 S1 y todos | [YA] guía de 1 página |
| 9 | **Alta** | Cero audio de frases antes de A2.1; una sola voz | 563 clips, 1 frase | A1.1–A1.2 | [YA] 3 frases clave · [ENE] A3–A4 |
| 10 | **Alta** | Romanización sin fecha de salida en el Lector y Dubu, asignados hasta A1.2 S8 y recomendados en A2.1 y TOPIK | `makeQ()` del Lector; Dubu `ver:'rr'`; `a12 · S4–S8` | A1.2, A2.1, TOPIK II | [YA] Sílabas o Palabras, 3 rondas seguidas (el modo rota solo) · [2027] herramientas |
| 11 | **Alta** | Vocabulario sin núcleo ni reciclaje (~280 listadas contra 800 para A1; solape de 1–2 palabras entre A1.2, A2.1 y TOPIK II) | Conteo de `cursos_es.json`; Guía §1 | Todos | [YA] flashcards opcionales · [ENE] |
| 12 | **Alta** | Niños 8–15 sin diseño para 13–15; no pueden decir su edad (falta 열세–열다섯) | `ninos · S6`; notas "uno de 12" | Niños S6 y todo el curso | [YA] tarjeta + salas por edad · [ENE] bandas |
| 13 | **Alta** | Regla de edad para adultos contradictoria (13 vs 14) y sin protocolo para menores en grupos de adultos | `textos_generales`; Guía para familias §10; privacidad §8 | Niños → A1.1 | Jay antes de la venta de enero |
| 14 | **Alta** | Niños 2 prometido para enero sin syllabus; la venta abre ~la 1.ª semana de diciembre | FAQ de `textos_generales`; Guía para familias | Niños 2 | P1 (esqueleto en §4.9; fase 7 adelantada) |
| 15 | **Alta** | Grietas de privacidad de menores: video "para el álbum de la academia", foto grupal con caras, videos de tarea al grupo de 12 familias, sin plazo de borrado de grabaciones, foto de familia (S5), salas con un adulto | `ninos · S5, S8`; Guía para familias §13; términos §5; regla de redes | Niños | [YA] mensaje a apoderados · [ENE] política |
| 16 | **Alta** | Niños sin ningún material de clase; la clase 1 es el 19 oct | Repo | Niños S1–S8 | P0 |
| 17 | **Alta** | Decks M01–M05 de A2.1 no calzan con la gramática publicada; 9 láminas y fotos pendientes | Tabla de §14.3 | A2.1 S2–S7 (M01: 20 oct) | P0 / P1 |
| 18 | **Alta** | Carga de Jay de 13–19 h más producción y lanzamiento | Estimación de §14.4 | Operación | Presupuesto de feedback + colchón N−2 + reparto de producción |
| 19 | Media | Sobrecargas: A1.2 S7 (9 partículas), S3 (5 irregulares + -ㅂ니다 + 에서), S2 (números); A1.1 S2 y S7; A2.1 S7 | Tabla de §4.3 | Esas semanas | [YA] nota de Jay (쯤 y 의 a casa) · [ENE] |
| 20 | Media | 한다체 nunca antes de TOPIK II S4; escritura sin párrafo ni 띄어쓰기 | `topik2 · S4` y notas | A1.2–TOPIK II | [YA] kit TOPIK · [ENE] escalones |
| 21 | Media | Terminaciones de interacción A2 ausentes o tardías (-고 싶다, -고 있다, -아/어야, -(으)니까, -(으)ㄹ게요, -네요, -는데, 반말) | Tabla de §4.2 | A1.2–A2.2 | [ENE] |
| 22 | Media | Modificadores sin sistema; primer ejemplo con dos irregulares; colores en ㅎ | `a21 · S1, S2, S4, S6, S7` | A2.1 S4 y S6 | [YA] notas a Abby · [ENE] |
| 23 | Media | Test de nivel autodeclarativo que puede recomendar TOPIK II; filtro después del pago | `app/test-nivel/page.tsx` | A1.2, A2.1, TOPIK II | [YA] TOPIK por WhatsApp · [ENE] |
| 24 | Media | "Preparación TOPIK I" en tres certificados sin un solo ítem TOPIK I | Certificados de `a11`, `a12`, `a21` | A1.1–A2.1 | [YA] 1 ítem oficial por quiz |
| 25 | Media | Reglas de sonido (연음, 비음화, 경음화, ㅎ) nunca enseñadas | Ningún syllabus | Todos | [YA] notación [ ] en correcciones · [ENE] objetivos por curso |
| 26 | Media | Lectura sin textos conectados antes de A2.1 ni lectura de supervivencia en A1 | §7.1 | A1.1–A1.2 | [ENE] |
| 27 | Media | Producción libre casi siempre ensayada en A1 (10–12 min de habla por clase) | Auditoría R-C-G-L | A1.1–A1.2 | [YA] minuto libre |
| 28 | Media | Tareas de 60–120 min (TOPIK ~150) con 3 entregas semanales | Estimaciones de §11.6 | Todos | [YA] núcleo + extra · [ENE] misión de 25 min |
| 29 | Media | Cultura como dato suelto; generalizaciones y datos sin verificar | §10.1, §10.5 | A1.1 S3, S6, S7; A1.2 S4; A2.1 S7; Niños S7–S8 | [YA] matiz oral · [ENE] plantilla |
| 30 | Media | Repeticiones culturales (edad ×3, 수고 ×2, 수능 ×3, Sejong ×4) | §10.2 | A1.2, A2.1, A2.2, TOPIK | [ENE] |
| 31 | Media | A2.2: 추석 fuera de temporada, sin Lab, educación en dos semanas; inicio de enero sin fecha | Brief §5; calendario | A2.2 | [ENE] (P1) |
| 32 | Media | Rúbrica oral sin criterio de cultura | `textos_generales · rubricaRows` | Todos | [ENE] |
| 33 | Media | Show de Niños ≈ 64 min en 60; comprensión evaluada frente a las familias; juego eliminatorio en S6; stickers como requisito del certificado | `ninos · S6, S8, evaluación` | Niños S6, S8 | [YA] show y juegos · [ENE] certificado |
| 34 | Media | Inconsistencias internas: aviso de ausencia 48/24 h; sorteo de A2.1 el "domingo 22" (antes de M05); cambio de sección; quizzes 2–7 o 2–8; guía de mitad prometida sin material | §11.1 | Varios | [YA] sorteo al cierre de S7 (24 nov), con aviso escrito en la S6 + 48 h · [ENE] el resto |
| 35 | Media | Números: edad adulta (스물, 서른…), 유월/시월 | `a12 · S2` | A1.2 S2 | [YA] tarjeta |
| 36 | Baja | Redundancia de 있어요 entre A1.1 S5 y S7 | `a11 · S5, S7` | A1.1 | [ENE] L5 + L7 |
| 37 | Baja | Sino-coreanos 1–100 en A1.1 sin uso real (solo teléfono); precios sin 천 ni 만 (A1.2 S7 usa 천 원 sin enseñarlo) | `a11 · S4`; `a12 · S2, S7` | A1.1 S4; A1.2 | [YA] Jay presenta 천/만 en A1.2 S7 · [ENE] precios en A1.2 S4 con 백, 천, 만 (sin 일 delante) |
| 38 | Baja | Equivalencias discutibles en la Guía (TOPIK 6 = C2, vocabulario de 3–4급, "grilla para coreano") | Guía §1–2 | Documentos | [ENE] |
| 39 | Baja | Lector asignado donde no aporta (A1.2 S3+, A2.1, TOPIK); Dubu ausente de `cursos_es.json` pero prometido en la guía | §14.2 | A1.2, A2.1, TOPIK II | [YA] no asignarlo · [ENE] |
| 40 | Baja | Audio de vocabulario de curso: 27 % / 7 % / 1 % / 0 % | §5.1 | Todos | [2027] |
| 41 | Baja | Capa regional casi ausente; diáspora coreana en Latinoamérica ausente | §10.1 | Todos | [ENE] cápsulas |
| 42 | Baja | Ritmo de Niños publicado como 8–10 o 10–15 min; tarea de 20 min, 10 min o "2 h" | `ninos`; Guía para familias; `ProgramaContent.tsx` | Niños | [ENE] definir por banda de edad |
| 43 | Baja | Calendario de octubre sin aprovechar (수능 19 nov, 김장, 첫눈) | §10.6 | Varios | [YA] |
| 44 | Baja | Pregunta 4 del test web mezcla tema y sujeto | `app/test-nivel` | Test | [ENE] |
| 45 | Media | a11 S7 y a12 S3 piden "Contrarreloj en modo Escucha", que el Lector no tiene (el Contrarreloj siempre es Lectura, con opciones romanizadas). En Practicar, el modo rota solo, así que "modo Escucha" (a12 S1) solo se logra haciendo varias rondas | `startDrill()` y `makeQ()` en `public/lector-coreano/index.html`; `a11 · S7`, `a12 · S1, S3` | A1.1 S7; A1.2 S1, S3 | [YA] aclararlo en el mensaje de tarea: "Practicar → Sílabas o Palabras, 3 rondas seguidas" · [2027] elegir modo y grupo en el Lector |

### 15.1 Coreano y datos a verificar (⚑) antes de usarlos

| Dónde | Texto | Duda | Alternativa a validar |
|---|---|---|---|
| `a12 · S5` (quedemos) | 토요일에 영화를 보거나 산에 갈 거예요? | Pregunta por una intención; no propone | 토요일에 영화 볼까요, 아니면 산에 갈까요? |
| `a12 · S6` (invitación) | 내일 같이 영화 볼 거예요? | Suena a preguntar un plan más que a invitar | 내일 같이 영화 볼래요? / 볼까요? |
| `a12 · S5` | 뭐로 갈 거예요? | Correcto; en lo oral se oye mucho otra forma | 뭐 타고 갈 거예요? |
| `a21 · S4` | 너무 맵게 하지 마세요 | Usa el adverbial -게, que no se enseña; aun así, es natural y frecuente en restaurantes | Mantenerla y enseñar 맵게 / 덜 맵게 como fórmula de restaurante, sin explicar -게 (덜 맵게 해 주세요). Sin -게, con lo que S4 sí enseña (-아/어 주세요): 고추는 빼 주세요. O 안 매운 걸로 주세요 ⚑ (걸로 = 것으로) |
| `a12 · S3` | 먼저 가겠습니다 | En la oficina es más frecuente otra fórmula | 먼저 들어가 보겠습니다 / 먼저 퇴근하겠습니다 |
| `topik2 · S2` | -(으)ㄹ 수밖에 없다 ≈ -아/어야 하다 | Aproximación, no equivalencia | Mantener "≈" y explicar el matiz |
| `a11 · S4` · `ninos · S5` | 이 사람은 우리 엄마예요 / 아빠예요 | ⚑ Llamar "이 사람" a la propia madre, al padre o a la abuela ante la profe puede sonar poco respetuoso | 우리 엄마예요! (señalando la foto) · para mayores, 이분은 우리 할머니예요 · 이 사람 para amigos o personas de la misma edad (§10.5) |
| A2.1 (propuesta) | 말 편하게 하세요 · 말 놓아도 돼요? | **Resuelto:** natural (en lo oral, 말 놔도 돼요?) | El mayor pregunta 말 놔도 돼요?; el menor dice 말씀 편하게 하세요 |
| A2.1 (propuesta) | 수고하셨습니다 con superiores | **Resuelto:** el 『표준 언어 예절』 del 국립국어원 recomienda evitar 수고 con superiores | Con la profe al terminar, 감사합니다 |
| Niños (propuesta) | 몇 학년이에요? / 몇 학년이야? | **Resuelto:** entre niños y de adulto a niño se dice 몇 학년이야? | Respuesta con el grado coreano (저는 중학교 2학년이에요) y tabla de equivalencias para Chile, México, Argentina… |
| Niños 13–15 | 반말 entre pares como contenido | ¿Es adecuado para la academia? | — |
| A2.2 / B1 | -는 편이에요 · -에 따라 달라요 | ¿A2.2 o B1? | — |
| Proyecto A2.2 | …크리스마스에 가족이 모이는 반면에… | Naturalidad de -는 반면에 | — |
| Proyección A2.2 | 설날에는 가족들이 모여서 떡국을 먹어요 · 많은 한국 학생들이 공부를 많이 해야 해서 힘들 것 같아요 · 수능 때문에 스트레스를 많이 받는 학생이 많아요 | Naturalidad y nivel (los ejemplos anteriores generalizaban sin cuantificador, contra §10.4) | — |
| TOPIK II | 출산은 개인의 선택이지만, 저출산은 사회 전체가 함께 풀어야 할 문제이기도 하다 (o: 아이를 낳는 것은 개인의 선택이지만 저출산은 사회의 문제이기도 하다) | Naturalidad y registro. La versión anterior (저출산 문제는 개인의 선택이면서…) tenía un sujeto que no calzaba: lo individual es tener hijos, no el problema | — |
| Datos | Precio del PC방 y escena de las finales de la LCK; densidad de cafés; origen del 손하트; Navidad "de parejas"; 떡국 vs 만둣국 por región; 첫눈, 정월대보름 (~21 feb 2027), 동지; vuelos restringidos durante el 수능 2026; Yucatán 1905; nombres locales de 무궁화 꽃이 피었습니다 | Fuente | — |
| Referencias | ~200 h por 급; tabla oficial TOPIK ↔ MCER; cifras del 한국어 학습용 어휘 목록; vigencia del TOPIK 말하기 en Latinoamérica | Fuente | — |
| Legal y técnica | Ley 21.719 (Chile) y menores; qué graba Zoom en las salas; derechos de "곰 세 마리" y otros 동요; audio del libro de Kiran y de KGIU | Asesoría o prueba | — |

El resto de los ejemplos de `cursos_es.json` (a11, a12, a21 y ninos, S1–S8) se revisó y parece correcto y natural para su nivel, salvo 이 사람은 우리 엄마/아빠예요 (fila de arriba). Tres afirmaciones culturales publicadas quedan inexactas y se matizan en voz (§10.5): a12 S1 ("casi no se da la mano"), topik2 S3 (-(으)세요 frente a -(스)ㅂ니다 como marca de jerarquía) y topik2 S4 ("en el 51 siempre -(스)ㅂ니다"). **Verificados y sin ⚑:** 스무 살, 지역마다 달라요 y el 김장 de norte a sur (antes en el norte y en el interior, más tarde en el sur).

---

## 16. Mejoras recomendadas preservando la identidad

La identidad no se toca: **한글 desde el día 1 · 말하기 en cada clase · 문화 como lenguaje · 친구 como comunidad**. Cada mejora dice qué pilar refuerza.

### 16.1 Ahora, sin cambiar lo publicado (octubre 2026) [YA]

**Jay · decisiones y comunicación**

| Acción | Pilar | Cuándo | Mensaje a alumnos o familias |
|---|---|---|---|
| Confirmar si existen fuera del repo los decks de Básico 1 por lección en 60 min y el "examen A2 de la casa" (decisión 0) | — | Antes del jue 1 oct | No |
| Decidir quién produce M01–M05 y el kit de Niños (producción con borradores, Abby revisa, Jay aprueba) | todos | Antes del jue 1 oct | No |
| Decidir la regla de certificado de octubre y avisar a Kiran y Abby ("tabla del kit; el 60 % es para pasar directo") | 친구 | Antes del 13 oct | Ya está en los mensajes a alumnos ("¿Faltaste? Mira la grabación y entrega la tarea: cuenta como asistencia") |
| TOPIK II: diagnóstico por WhatsApp antes del cierre de matrícula (dom 11 oct) · kit de nivelación (한다체, 20 conectores, fórmulas del 51) + formularios con clave | 한글 | Diagnóstico antes del dom 11 oct; kit antes del 15 oct | Sí: a cada inscrito de TOPIK II, al pagar |
| Corregir el logro "decir la hora" de Básico 1 (texto público; no se toca código en esta fase) | — | Cuando Jay decida | No (texto web) |
| Mensaje al grupo de apoderados de Niños: videos con cara por privado; el "álbum" es solo la carpeta del curso; la foto final es de manos con 손하트; foto de familia → dibujo | 친구 | Antes del 19 oct | Sí: es el mensaje |
| Guía de teclado en el mensaje de bienvenida de todos los adultos | 한글 | Antes del 13 oct | Sí: bienvenida |
| Registro de tareas y asistencia (Form + planilla) | 친구 | Antes del 13 oct | Opcional, en el mensaje semanal: "si faltaste, además de la tarea, manda un audio de 60 s de la actividad oral" (recomendado; no condiciona la asistencia, que en octubre es grabación + tarea) |
| Sorteo de A2.1 al cierre de la S7 (24 nov) | 말하기 | Antes del 22 nov | Sí: aviso en el grupo en la S6 (la ficha dice "domingo 22") |
| Show de Niños: lectura y comprensión en las salas, antes de que entren las familias | 친구 | Antes de la S7 (lun 30 nov) | Sí: aviso a apoderados (la ficha y la guía para familias dicen "ante las familias") |
| Plantilla de certificado de curso | — | Antes del 30 nov | No |

**[Para profes] Kiran · Básico 1:** romanización solo en S1–S2 y siempre después del audio · 3 min de teclado en la S1 · "minuto libre" al final de los pares (tarjetas de la Fase 2) · decir las 3 frases clave en coro al cierre, como ya está en el programa (de ahí se recorta el clip; Kiran no graba ni edita) · 좋아해요 / 안 좋아해요 como fórmula en el cierre de S7 + tarjeta de gustos (de la Fase 2) · examen con máximo 2 ítems de la L9 · 붕어빵 en S3 · matices de §10.5 (안녕, 우리, 이 사람, metro, 학원, 온돌) · notación [ ] en las correcciones (좋아요 [조아요]), imitando la palabra entera sin explicar la regla (§6.4) · en S7, el mensaje de tarea aclara que el Contrarreloj no tiene "modo Escucha": Palabras, 3 rondas seguidas.
**Jay · Básico 2:** -고 en S3 y -지만 en S7 como fórmulas · 쯤 y 의 como lectura en casa · tarjeta de S2 con 유월/시월 y 스물/서른/마흔… · en S7, 천 y 만 al dar 천 원밖에 없어요 · donde dice Contrarreloj (S3, S5, S6, S8), Practicar → Sílabas o Palabras con 3 rondas seguidas (el Contrarreloj, como extra opcional) · 1 ítem oficial TOPIK I por quiz · el 수능 en la S6 (tu clase cae en pleno examen en Corea) · rotar el extra de la hoja de 15–20 frases · matiz de la mano en S1 (§10.5).
**[Para profes] Abby · Conversacional 1:** lámina de S4 con -(으)세요 antes de -지 마세요 y regulares antes de 매운/단 · en S6, colores en ㅎ + mapa de modificadores · no recomendar el Contrarreloj (mejor 5 min de lectura en voz alta) · 수능 en el small talk de S6 · 1 ítem TOPIK I por quiz · negociar el registro en S1 (el mayor pregunta 말 놔도 돼요?; el menor dice 말씀 편하게 하세요) en vez de repetir "pregunta la edad" · víspera del 수능 (S6) como fórmula que dicen los coreanos (§10.6).
**Jay · TOPIK II:** adelantar a la S6 (19 nov, día del 수능) el dato de S8 · SRS de 30–50 palabras semanales como tarea recomendada · núcleo de 30–45 min + "ruta intensiva" opcional · matices de §10.5 en S3 (jerarquía: 반말/존댓말 y -(으)시-) y S4 (el 51 copia el registro del texto).
**[Para profes] Jay y Abby · Niños:** salas del taller por edad (8–11 / 12–15 según inscritos) con versión "reto" y roles de estatus para los mayores (DJ de la canción, capitán, asistente de lectura) · 열세 / 열네 / 열다섯 살 en S6 · juegos sin eliminación ("quien se equivoca pasa a ser el juez") · show: lectura y comprensión en las salas antes de que entren las familias; frente a ellas, solo la presentación (con aviso escrito a apoderados antes de la S7) · nota semanal con la pestaña exacta del Lector (el modo y el grupo rotan solos) y el barrio de Dubu que toca, en el orden en que Dubu los abre (§14.2) · 이 사람은 우리 엄마예요 → 우리 엄마예요! (§10.5) · cantar en *mute* con la profe y después solistas por turno · explicar el efecto espejo de Zoom en la clase 1 · chat de Zoom solo público · nunca un adulto a solas con un solo niño en una sala.

### 16.2 Enero 2027 [ENE] · tres bloques, en este orden

Jay es el cuello de botella (§14.4), así que no todo va "antes de la venta": primero lo que cambia textos públicos, después lo que necesita la primera clase de enero y al final lo que mejora la escalera con el curso andando. Se conserva la numeración de las 14 mejoras. "Horas de Jay" es una estimación gruesa de decisión y revisión (no de producción), a calibrar con octubre.

**Bloque 1 · Antes de la preventa del lun 7 dic (solo lo que cambia textos públicos)**

| # | Mejora | Pilar | Quién · horas de Jay |
|---|---|---|---|
| 1 | Regla "código CEFR = tramo de temario" en certificados, FAQ y PDFs; renombrar el "examen A2 de la casa" | — (credibilidad) | Producción redacta · Jay aprueba · 1–2 h |
| 2 | Marco Pasaporte Chingu (40/25/35; TOPIK 30/30/40) + regla única de certificado, **con la misión de recuperación**, en fichas, términos §6 y PDFs (campos a editar: §11.3) | 친구 | Jay decide · producción edita `cursos_es/en.json` y regenera PDFs · 2–3 h |
| 4 | Syllabus de Conversacional 2 con el orden anclado al 설날 real (§4.7, §10.6), Lab 3 y Lab 4, y 한다체 de reconocimiento | 문화 | Fase 5 · Abby revisa · Jay aprueba · 2–3 h |
| 12a | Niños 2: syllabus (§4.9); decidir un grupo 8–15 o Niños (8–11) + Teens (12–15); regla de edad en 14 con protocolo | 친구 | Fase 7 (adelantada) · Jay decide · 2–3 h |
| 5 · 6a | TOPIK II presentado como track paralelo con entrada por diagnóstico; el test web deja de recomendar TOPIK II; fecha de inicio de enero (decisión 11) | — | Jay decide · producción redacta · 1 h |

**Bloque 2 · Antes del inicio de enero**

| # | Mejora | Pilar | Quién · horas de Jay |
|---|---|---|---|
| 3 | Redistribución gramatical de A1.1, A1.2 y A2.1 (§4.3–4.6), con el tope de §4.1; S8 sin gramática nueva; decks y exámenes rehechos (examen final de Básico 2, examen de Básico 1 sin gramática nueva en S8) | 말하기 | Fases 2–4 · Kiran y Abby revisan · Jay aprueba · 3–5 h |
| 6b | Micro-diagnóstico de 12 ítems + audio para entrar a A1.2 y A2.1 | — | Producción · Jay aprueba · 1 h |
| 11 | Misión semanal de 25 min en todos los cursos; Lector y Dubu solo donde entrenan algo | — | Producción · 1 h |
| 12b | Niños: certificado por asistencia + show (sin stickers como requisito); pasaporte 한글 + audio antes/después + informe de 5 líneas; plazo de borrado de grabaciones; cápsula de 설날 en Niños 2 | 친구 | Producción · Jay decide el plazo · 1–2 h |
| 13 | Proyectos finales nuevos (§11.5) con kit completo | 말하기 | Producción · profes revisan · 1–2 h |

**Bloque 3 · Durante enero–marzo (con el curso andando)**

| # | Mejora | Pilar | Quién · horas de Jay |
|---|---|---|---|
| 8 | Audioteca A3–A4 (mini-diálogos y monólogos con voces del equipo) para Básico 2 y Conversacional 1 | 말하기 | Producción escribe guiones · Jay, Kiran y Abby graban · 2–4 h |
| 7 | Vocabulario: Núcleo A1 (flashcards sin romanización), columnas núcleo/tema, contraste con lista NIKL, reciclaje en S1 y labs | 한글 | Producción · 1 h |
| 9 | Escritura escalonada (ficha personal → párrafo → 120–200 caracteres → 일기 en 한다체) y objetivos de pronunciación por curso (§6.4) | 한글 | Producción · profes aplican · 1 h |
| 10 | Cultura: espiral de ejes, plantilla "ancla + capa + puente + matiz", regla editorial y criterio cultural en la rúbrica | 문화 | Producción · Jay aprueba · 1–2 h |
| 14 | Ajustes a la Guía CEFR–TOPIK (TOPIK 5–6 ≈ C1; cifras aproximadas; cita de la grilla) | — | Producción · 1 h |

### 16.3 Más adelante (2027) [2027]

| Mejora | Pilar |
|---|---|
| **Intermedio B1.1 y B1.2** (lanzamiento natural: la cohorte que sigue a la primera de A2.2 ⚑ calendario de Jay) | todos |
| Lector: elegir modo y grupo (hoy rotan solos), modo sin romanización, "Mis palabras de la semana" por curso, paquetes por lección del libro, modo Frases | 한글 |
| Dubu: interruptor visible de romanización (apagado desde el mundo 3); "modo niños" filtrado (p. ej., abrir Río Han sin exigir Gwangjang) | 한글 |
| Audio para todo el vocabulario de curso (~350 clips con el pipeline existente) | 한글 |
| Audioteca A5: conversaciones no ensayadas de Jay, Kiran y Abby (también contenido de marca) | 말하기 · 친구 |
| Cápsulas de calendario móviles (설날, 추석, 수능, 김장, 한글날) y cápsula de diáspora coreana en Latinoamérica contada por Jay y Kiran | 문화 |
| Tramo B2 (la Guía lo esbozaba como "Debate y Drama") solo si hay egresados de B1 | — |

---

## MAPA CURRICULAR MAESTRO · de cero a TOPIK II

### Tabla maestra

| Peldaño | Perfil de entrada | Tramo MCER (temario) | Horas en vivo acumuladas | Gramática núcleo (propuesta enero) | Funciones que desbloquea | Lectura · Escritura · Escucha (hito) | Eje cultural | Proyecto final | Entrada verificada por | Estado |
|---|---|---|---|---|---|---|---|---|---|---|
| **Puerta gratis** | Curiosidad | — | — | — | Leer letras y sílabas | Lector, Dubu, taller | — | — | — | Publicado |
| **Coreano para Niños** | 8–15 años | Pre-A1 (sin etiqueta) | 8 | Fórmulas: 이에요/예요, 좋아해요, 몇 살 (hasta 열다섯) | Presentarse, gustos, contar | Sílabas y palabras · nombre · instrucciones de juego | Corea que se juega | El show de mi cartel | Edad | Publicado (oct) |
| **Niños 2** | Egresados de Niños | Pre-A1 → núcleo lúdico de A1.1 | 16 | -아요 con 4–8 verbos, 있어요/없어요, 주세요, sino-coreanos hasta 100 + 백 y 천 con 원 y 얼마예요?, 몇 학년이야? | Colegio, tienda, cuento | Aspiradas y tensas · frases fijas | 설날, juegos, colegio coreano | Show 2 | Certificado de Niños | **Por diseñar** (prometido para enero) |
| **Básico 1 · A1.1** | Cero (o 14+ desde Niños, con autorización) | A1 inicial | 8 | 이에요/예요, 은/는, 이/가, 을/를, 에, 있다/없다, -아요, 좋아해요 · fórmulas: N 주세요, 저도요 · reconocer: 에서 · 제 como palabra | Yo, familia, lugares, mi día, gustos, pedir un objeto | Decodificar todo · teclado + ficha personal · 3 frases clave | Corea en la vida diaria | Mi mundo en 4 fotos (octubre: "Yo en coreano") | Nada | Publicado |
| **Básico 2 · A1.2** | Paquete de salida de A1.1 | A1 | 16 | Nativos y fechas, 에 temporal, irregulares ㅂ/ㄷ/으, 부터~까지, 마다, 얼마예요 + precios (백/천/만), contador + 주세요, -고 싶어요, -았/었어요, 에서 vs 에, -고, -(으)ㄹ 거예요, (으)로, -(으)ㄹ까요?, 안/못, -(으)ㄹ 수 있다, 보다/더/제일 · fórmulas: -ㅂ니다, -지만, 만, 하고/(이)랑, 한테 · reconocer: -(으)세요 · 쯤 como palabra | Fechas, hora, edad, rutina, compras, pasado, planes, negar, comparar | Mensajes de 60–120 sílabas · párrafo de 8–10 frases · mini-diálogos | Corea en el tiempo | 지난주와 다음 주 | Micro-diagnóstico + audio | Publicado (orden de enero: decisión) |
| **Conversacional 1 · A2.1** | Paquete de salida de A1.2 | A2 inicial | 24 | -(으)ㄴ 지 됐어요, -고 있다, -아/어 봤어요, N 중에서, -아서, -(으)러, -아/어야 해요, -(으)세요 → -아/어 주세요 → -지 마세요 (+ -아/어 보세요), -(으)ㄴ + N con el mapa de modificadores, -아/어 보여요, -(으)ㄴ/는 것 같다, -(으)ㄹ 때, -기 전에/-(으)ㄴ 후에, -(으)면 · fórmulas: -(으)ㄹ래요?, 좋아하는 + N | Experiencias, planes, restaurante, opinar, condiciones, reparar | Menú, metro, reseñas · 120–200 caracteres · clase al 90 % en coreano | Corea que amas | 서울에서 24시간 | Audio guiado de 2 min | Publicado |
| **Conversacional 2 · A2.2** | Paquete de salida de A2.1 | A2 | 32 | -(으)니까, -기 때문에, -(으)려고, -게 되다, -(으)시-, -ㅂ니다 (producción), -아/어도 되다 / -(으)면 안 되다, -(으)ㄹ게요, -죠, -네요, -는데, 밖에, 처럼, -고 싶어 해요; 한다체 (reconocer); 반말 (reconocer → básico) | Narrar, explicar razones y propósitos, cortesía formal, opinar sobre la sociedad | Textos de 300–600 sílabas · 일기 en 한다체 · clips de K-drama | Corea por dentro | Mini-pódcast "Corea por dentro" | Audio guiado / pase directo | **Enero 2027, por diseñar** |
| **Intermedio B1.1 → B1.2** | Paquete de salida de A2.2 | B1 | 40 → 48 | Discurso indirecto, -는데 avanzado, -더라고요, -거든요, -(으)ㄹ 텐데, -아/어지다, pasivas y causativas, -도록, -기 위해서; 한다체 (producción) | Contar tramas, citar, pros y contras, párrafos | Textos de 600–1.000 sílabas · párrafos en 한다체 · conversación natural | Corea real | A diseñar ⚑ | Diagnóstico escrito + oral | **Por crear (2027)** |
| **TOPIK II (track B1+)** | B1 (Intermedio o acreditado) | Examen | +8 | Conectores y registro de examen; plantillas 51–54 | Estrategia y puntaje | 읽기/듣기 1–50 · 51–54 | Corea en debate | Ensayo general + ruta a abril | Diagnóstico **antes** del pago | Publicado |

**Horas, con honestidad:** del cero al final de A2.2 son 32 h en vivo (~45 h con misiones de 25 min; ~67–77 h con la carga de tarea actual); hasta el final de B1.2, 48 h en vivo. Esa es la razón de ser de la regla "tramo de temario, no nivel logrado" y de que TOPIK I se trabaje dentro de los quizzes (1 ítem oficial por quiz desde Básico 2) y no como un curso aparte.

### Diagrama de la ruta

```
                          PUERTA GRATIS
     Taller /taller · Lector /lector-coreano · Dubu /dubu · Test /test-nivel
                                  │
           ┌──────────────────────┴───────────────────────┐
           │                                              │
     TRACK NIÑOS                                  ESCALERA ADULTOS (14+ ⚑ regla)
           │                                              │
  Coreano para Niños (8–15)  ─────────┐          ETAPA 1 · LEO Y ME PRESENTO (A1)
  Pre-A1 · show                       │            Básico 1 · A1.1 ........... 8 h
           │                          │                 │
  [decisión ENE: Niños 8–11           │            Básico 2 · A1.2 .......... 16 h
   + Teens 12–15]                     │                 │
           │                          │          ETAPA 2 · USO EL COREANO (A2)
  Niños 2 (ene 2027, por diseñar)     │            Conversacional 1 · A2.1 .. 24 h
           │                          │                 │
           │  14–15 con autorización  │            Conversacional 2 · A2.2 .. 32 h  (ene 2027)
           └──────────────────────────┴──► Básico 1     │
                                                  ETAPA 3 · COREA REAL (B1)  [POR CREAR]
                                                   Intermedio B1.1 .......... 40 h
                                                        │
                                                   Intermedio B1.2 .......... 48 h
                                                        │
                                                        ▼
                          ══════════ TRACK EXAMEN (paralelo, no es un peldaño) ══════════
                          TOPIK II (B1+) · entra quien tiene B1 por diagnóstico,
                          venga de B1.2 o de fuera · meta: nivel 3 (4 con B1 sólido)

  TOPIK I: propuesta, no un curso; 1 ítem oficial por quiz desde Básico 2
  (la Guía de septiembre tenía un TOPIK I intensivo de 4 semanas: decisión 8).
  Regla de toda la escalera: S1 reactiva y diagnostica · S8 integra y evalúa (sin gramática nueva).
```

---

## Decisiones para Jay

| # | Decisión | Opciones | Recomendación | Plazo |
|---|---|---|---|---|
| 0 | Decks de Básico 1 en formato de 60 min: ¿existen? (`Horarios_Equipo_2026-2` los da por listos; en el repo no están). Son 2 secciones, hasta 30 alumnos, 1.ª clase el mar 13 oct. Ubicar también el "examen A2 de la casa" (Básico 2, clase 8 del mié 2 dic) | (a) Existen → pasárselos a Kiran · (b) No existen → la Fase 2 produce S1–S2 antes del vie 9 oct y el resto con colchón N−2 | Confirmarlo ya: el kit de Kiran le pide avisar "si falta algún material" recién el vie 9 oct | **Antes del jue 1 oct** |
| 1 | Regla de certificado en **octubre** | (a) Regla general: términos, FAQ y kits · (b) la de las fichas (≥ 60 % + 6/8 en vivo) | **(a)**, que es la que conocen alumnos y profes y no contradice los términos; avisar a las profes y regenerar los PDFs en enero | **Antes del 13 oct** |
| 2 | Producción de M01–M05 (A2.1) y del kit de Niños | (a) Abby produce · (b) producción en borrador, Abby revisa y Jay aprueba | **(b)**; M01 y kit de la clase 1 de Niños en borrador el vie 2 oct; revisión de Abby y versión final el vie 9 oct (regla N−2 de §14.4) | **Antes del jue 1 oct** |
| 3 | Filtro de TOPIK II | (a) Como hoy (filtro en la clase 1) · (b) diagnóstico por WhatsApp antes de confirmar | **(b)**, y definir qué pasa si alguien no lo pasa; el kit de nivelación puede llegar el 15 oct | **Antes del dom 11 oct (cierre de matrícula)** |
| 4 | Logro público "decir la hora" en Básico 1 | (a) Dejarlo · (b) cambiarlo por "Contar del 1 al 100 y decir cuántos son en tu familia" | **(b)** | Cuando puedas |
| 5 | Línea de nivel de los certificados de octubre (A1.2 "A1 completo (A2 parcial)", TOPIK "CEFR B1+") | (a) Como está publicado · (b) suavizar ya · (c) cambiar desde enero | **(b) en su versión mínima**, que casi no se aparta de lo publicado: en TOPIK II, "Preparación TOPIK II · puntaje del simulacro X/300 (nivel estimado N)" (el texto publicado ya dice "con el puntaje del simulacro final y el nivel TOPIK estimado"), quitando solo "CEFR B1+"; en Básico 2, "Básico 2 (A1.2) · contenidos del nivel A1 (MCER)". (c) emitiría el 7 dic dos líneas que §3.4 y §15 #3 marcan como no defendibles | Antes del 30 nov, con aviso breve a los alumnos en la S7 |
| 6 | Marco de evaluación desde enero | (a) 40/30/30 de las fichas · (b) Pasaporte Chingu 40/25/35 (TOPIK 30/30/40) + certificado desligado de la nota | **(b)**; opcional: mínimo de 4/8 en vivo | Antes de la venta de enero |
| 7 | Redistribución gramatical de Básico 2 | (a) Orden nuevo con la semana "De compras" · (b) orden actual + comprar dentro de S5 · (c) sin cambios | **(a)**; (b) si prefieres no mover temas | Antes de la venta de enero |
| 8 | Tramo B1 y lugar de TOPIK II | (a) No crear B1; TOPIK II sigue como paso 5 · (b) crear Intermedio B1.1 y B1.2 y presentar TOPIK II como track. **Ojo:** la Guía de septiembre planteaba B1 como 16 sesiones en 8 semanas a 2 por semana, con preventa el 30 nov, un TOPIK I intensivo de 4 semanas y el track TOPIK con especialista (modelo B). Esta propuesta cambia tres cosas, cada una a decidir: (1) mismas 16 h, pero 2 × 8 semanas de 1 clase; (2) TOPIK I dentro de los quizzes en vez de curso; (3) lanzamiento en 2027 y no preventa en noviembre (§4.8) | **(b)**; nombre, precio y fecha de lanzamiento: tuyos | Diseño en enero; lanzamiento en 2027 |
| 9 | Niños desde enero | (a) Un grupo 8–15 con pistas · (b) Niños (8–11) + Teens (12–15) · (c) Niños 8–12 y adolescentes a Básico 1 | **(a) ya; (b) si en octubre hay 3 o más inscritos de 12–15**; (c) no | Antes de la venta de enero |
| 10 | Edad mínima para adultos | (a) 13 (FAQ, guía) · (b) 14 (privacidad) | **(b)**, con autorización y protocolo para menores | Antes de la venta de enero |
| 11 | Inicio de A2.2 y de Niños 2 | Semana del 4, 11 o 18 de enero | Fijarlo ya: define en qué semana cae el 설날. Con el 11, 설날 va en S5; revisar con Abby la clase de Niños 2 del lun 8 feb (feriado en Corea) | Antes de diseñar A2.2 |
| 12 | Criterio de cultura en la rúbrica | (a) Renombrar dos criterios (escala 20) · (b) 6.º criterio "Adecuación" (escala 24) | **(a)** | Enero |
| 13 | Privacidad de Niños | Álbum: (a) eliminarlo · (b) solo la carpeta privada del curso. Plazo de borrado: X días | **(b)** + foto de manos + plazo definido por ti (⚑ asesoría sobre la Ley 21.719) | Álbum antes del 19 oct; plazo en enero |
| 14 | Sorteo del monólogo de A2.1 | (a) Domingo 22 sin M05 · (b) cierre de la clase 7 (24 nov) | **(b)** | Antes del 22 nov |

---

## Qué viene en la Fase 2 (Básico 1)

**Principio:** Kiran enseña el programa publicado desde el 13 de octubre. La Fase 2 produce **el material de la cohorte de octubre fiel a lo publicado, con los ajustes [YA] incorporados**, y deja en otra capa, marcada, **la versión de enero** (§4.4). No se mezclan.

**Entregables**

| Bloque | Contenido | Para quién |
|---|---|---|
| A. Diseño del curso | Los 16 campos del brief §8.A (nombre, promesa, objetivos, vocabulario, gramática, pronunciación, cultura, las 4 destrezas) alineados con §4.4, §6.4, §7.3, §8.3 y §13 | Interno |
| B. Semana a semana (S1–S8) | Los 17 campos del brief §9 por semana, con la línea **"¿Qué podrá DECIR el alumno?"** y el ciclo R-C-G-L explícito | Interno |
| C. Plan de 60 minutos | Minuto a minuto por clase; no siempre la misma plantilla (S1 y S8 distintas) | Kiran |
| D. Guía de la profe | Secuencia exacta, explicaciones desde el español, errores previsibles de hispanohablantes, corrección, pronunciación, preguntas, plan B (si sobra o falta tiempo) | **Kiran (archivo de profe)** |
| E. Material del alumno | Hoja por lección (objetivo, vocabulario núcleo/tema, gramática, ejemplos, diálogo, ejercicios, cultura con frase ancla, repaso), sin claves ni notas internas; tarjeta de 10 palabras de gustos (S7) | **Alumnos (archivo aparte)** |
| F. Misiones semanales | 8 misiones de 25 min (input + output + puente), con la pestaña exacta del Lector o de Dubu y lo que entrena | Alumnos |
| G. Audio A2 | Guion de "las 3 frases clave" de cada clase (24 frases): Kiran las dice en el coro de cierre, como ya está en el programa, y el clip de 20 s se recorta de la grabación de Zoom (o las graba Jay). Kiran no produce | Kiran (solo las dice) · responsable del recorte (§14.4) |
| H. Evaluación | Quizzes S2–S7; examen final desde el MidTerm (sin hora, máximo 2 ítems de L9); **octubre:** kit "Yo en coreano" tal como está publicado (1–2 min, una pregunta, guion en S7; consigna, modelo, rúbrica de profe), con 4 fotos como apoyo visual opcional. "Mi mundo en 4 fotos" (60–90 s, 2 preguntas) queda en la capa [ENE] | Kiran (claves) / alumnos (consigna) |
| I. Transversal | Guía de teclado; romanización solo en S1–S2; notación [ ]; matices culturales de §10.5; tarjetas del "minuto libre" (8) | Ambos |
| J. Control de calidad | Coreano revisado por Kiran o Abby; todo lo dudoso con ⚑; carga cognitiva por semana; separación profe/alumno | Interno |

**Lo que necesito de Jay para arrancar la Fase 2**
1. ¿Existen en Drive los decks de Básico 1 por lección en formato de 60 min? (Decisión 0, antes del jue 1 oct.) Si existen, la Fase 2 los alinea; si no, produce S1–S2 antes del vie 9 oct y el resto con colchón N−2.
2. OK a los ajustes [YA] de Básico 1 (좋아해요 en S7, máximo 2 ítems de L9, teclado, 3 frases clave recortadas de la grabación de Zoom, minuto libre) y nombre del responsable del recorte semanal (§14.4).
3. Decisión 1 (regla de certificado de octubre), porque cambia cómo se explica la evaluación en la hoja del alumno.
4. ⚑ ¿El libro 한글학교 한국어 1 trae audio? Si trae, es la base del nivel A2–A3 de la audioteca.

Cuando la Fase 2 esté cerrada, siguen Básico 2 (Fase 3), Conversacional 1 (Fase 4, con M01–M05 realineados), Conversacional 2 (Fase 5, que depende de la decisión 11), TOPIK II (Fase 6) y Niños (Fase 7). **Recomendación de orden:** adelantar el kit de la clase 1 de Niños y M01 de Conversacional 1 como piezas sueltas (versión final el vie 9 oct), porque sus clases son el 19 y el 20 de octubre, antes de que la secuencia de fases llegue a ellos. Si los decks de Básico 1 no existen (decisión 0), S1–S2 van primero que todo.

화이팅, chingu.
