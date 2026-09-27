# Fase 7 · Coreano para Niños (8–15) · Diseño del curso
### Juega y aprende · 어린이 한국어 · cohorte octubre 2026 · la columna vertebral para los 8 redactores

**Documento interno de Dirección Académica · versión 1 · domingo 27 de septiembre de 2026**
Para Jay y para el equipo que redacta las 8 guías de los profes y los 8 cuadernos de actividades. Nada de este archivo se entrega tal cual a los niños ni a las familias: los recuadros marcados **Texto para la familia** o **Texto para el niño** están listos para copiarse en su material.

> **Cómo leer este documento**
> - **Manda lo publicado.** Temas, objetivos, gramática, vocabulario, práctica, tareas, cultura y evaluación salen de `Programa_Completo_Octubre_2026/fuente/cursos_es.json` (curso `ninos`), que ya está en `public/programas/Programa_Ninos_Octubre_2026.pdf`, en el programa público (`Curriculo/publico/Programa_Ninos.md`), en la Guía para familias (`Lanzamiento_Octubre_2026/alumnos/Guia_Familias_Ninos_Octubre_2026.docx`, generada con `Lanzamiento_Octubre_2026/fuente/make_guias_alumnos.js`) y en el kit de Abby (`Lanzamiento_Octubre_2026/profes/Kit_Abby_Conversacional_Ninos_KO.pdf`). Aquí se ordena, se precisa y se completa, sin contradecirlo.
> - **[YA]** = mejora de la Fase 1 (`Curriculo/Fase1_Arquitectura_Academica.md`) que se aplica en octubre sin cambiar nada publicado. **[ENE]** = va al anexo I (enero 2027). **⚑** = coreano o dato que se valida antes de usarlo (en este curso lo valida Jay; para canciones, usos actuales en Corea y lenguaje de aula, segunda opinión de Abby). **DECISIÓN DE JAY** = nombres, políticas, privacidad o textos públicos.
> - **[regla del certificado: pendiente de decisión de Jay]** aparece donde la ficha `ninos`, la Guía para familias, el programa público y el kit de Abby no coinciden (sección E).
> - **PROFE** = material con respuestas, notas y tiempos (va a `profes/`). **NIÑO** = cuaderno de actividades, sin respuestas ni notas internas (va a `alumnos/`), con un recuadro final **"Para la familia"**. No se mezclan nunca en un mismo archivo.
> - **🇰🇷** = texto en coreano para Abby. Todo lo demás de las guías va en español, porque Jay conduce la clase.
> - Este curso **no tiene libro**: todo el material es propio de Academia Seúl. No se copian láminas, canciones ni ejercicios de terceros; las canciones son **originales o tradicionales de dominio público** (nunca letras de K-pop ni de canciones con derechos).

**Hechos fijos (no se tocan)**

| | |
|---|---|
| Curso | Coreano para Niños (8–15) · Juega y aprende · 어린이 한국어 · código KOR 050 |
| Profes | **Jay Kim (김재희)**: conduce, lleva el hilo y explica en español; nació en Seúl y vive en Chile desde los 10 años. **Abby (홍미영)**: co-profesora desde Corea, pedagoga; lidera canciones, sonidos, el modelo de pronunciación nativa y los juegos de movimiento. Su idioma de trabajo es el coreano (su resumen de cada guía va en coreano) |
| Horario | **Lunes 18:00–19:00 (hora de Chile, UTC−3 todo el curso) = martes 06:00–07:00 en Corea** · Zoom (cuenta de pago de la academia, reunión recurrente; salas y grabación en la nube las activa Jay) · **máximo 12** niños · taller en **2 salas de hasta 6**, una con cada profe |
| Otros husos | México (CDMX) 15:00 · Colombia y Perú 16:00 · Argentina 18:00 · EE. UU. Este 17:00 → 16:00 desde el 1 de noviembre · España 23:00 → 22:00 desde el 25 de octubre (tarde para un niño: ver B0.1) |
| Fechas | **S1 lun 19 oct** (el 12 es feriado en Chile) · S2 26 oct · S3 2 nov · S4 9 nov · S5 16 nov · S6 23 nov · S7 30 nov · **S8 lun 7 dic: mini-show para las familias + certificado**. En Corea: mar 20 oct · 27 oct · 3 nov · 10 nov · 17 nov · 24 nov · 1 dic · 8 dic, 06:00 |
| Material publicado | Láminas ilustradas por sesión, cartones de bingo, tarjetas de letras, plantilla del guion del show, canciones propias de saludo, familia y números (letra en 한글 y español), tablero de stickers, nota semanal a la familia, kit de casa (hojas, lápices de colores, tijeras, pegamento; peluches en la S4; foto o dibujo de la familia en la S5), grabación de cada clase para el grupo |
| Ecosistema | **Lector** (`/lector-coreano`): Alfabeto (21 vocales / 19 consonantes con audio) · Aprender 1–8 · Practicar (Vocales, Consonantes, Aspiradas y tensas, Sílabas, Batchim, Palabras, Números, 🖼 Pictogramas, ⚡ Contrarreloj) · Progreso. **Dubu** (`/dubu`): puzzle del Hangul, 6 barrios × 5 niveles, que se abren en orden (Bukchon → Insadong → Hongdae → Gwangjang → Río Han → Estación de Seúl). **Generador de nombres** (`/generador-nombre`). **1.124 clips nativos** en `public/audio/kr` (voz SunHi, la del Lector y Dubu): **76 de las 125 filas** de la lista C ya tienen clip completo; faltan 65 clips (G.4) |
| Niños reales de octubre | **[PENDIENTE: lista de inscritos del lun 12 oct]** (edades, países, hermanos). Perfiles esperables y cómo se atiende cada uno: B0 |
| Hitos | vie 2 oct borrador del kit de la S1 · **vie 9 oct kit de la S1 final (P0)** · lun 12 oct lista de inscritos, grupo de WhatsApp de apoderados y correo con el link · mié 14 oct tabla de nombres en 한글 · dom 18 oct recordatorio · **lun 19 oct S1 con el apoderado al lado** · mié 21 oct mapa del grupo (salas fijas y roles) · S4 lun 9 nov chequeo de mitad (3 líneas a la familia) · lun 23 nov aviso escrito del formato del show (si Jay lo aprueba, E.5) · **lun 30 nov S7: ensayo del show + invitación a las familias** · **lun 7 dic S8: show + certificado [regla del certificado: pendiente de decisión de Jay]** · PDF del certificado a la familia esa semana |

**Qué hace este documento en una frase:** convierte el syllabus publicado de Coreano para Niños en un mapa semana a semana que 8 redactores pueden usar sin inventar nada, con **dos bandas de edad (Explorador 8–11 · Reto 12–15) con la misma meta**, números hasta **열다섯** para que todos digan su edad, juegos sin eliminación, privacidad de menores en cada actividad, un cartel que se arma semana a semana y un show final que cabe de verdad en 60 minutos.

---

## 0. Para los 8 redactores: reglas de trabajo

1. **Una semana por redactor.** Tu fuente es tu bloque de la sección B y la lista maestra (C) **hasta tu semana**. Si una palabra o frase no está en C antes de tu semana, no la uses; si la necesitas, márcala como fórmula (F) o reconocimiento (R) y avísalo en tu entrega.
2. **Dos archivos por semana, siempre separados** (convención en G.3):
   - `profes/S0N_Guia_Profesor.md` · **en español**, con un bloque **🇰🇷 Abby를 위한 요약 en coreano** (formato en B.13). Lleva la secuencia de 60 minutos, las dos versiones de cada juego (Explorador y Reto), claves, errores previsibles, plan B, guion de láminas y la nota semanal a la familia lista para pegar.
   - `alumnos/S0N_Material_Alumno.md` · el **Cuaderno de actividades** de la semana, para el niño: en español, con 한글 grande, actividades de dibujar, recortar, unir, colorear y cantar, y al final el recuadro **"Para la familia"**. Sin claves, sin tiempos, sin notas de los profes.
3. **Mismo esqueleto que Básico 2**, adaptado a niños (G.3): guías *0 · A (17 campos) · B (minuto a minuto 18:00–19:00) · AB (🇰🇷 Abby를 위한 요약) · C (C.1–C.17) · D · E*; cuadernos *1–10 + "Para la familia"*.
4. **Speaking-first con los 4 pasos, en versión niños:** **R** reconocer (escucha + gesto) → **C** controlada (eco, coro con micrófono apagado y solistas por turno, cadena) → **G** guiada (juego con tarjeta o dibujo) → **L** libre (**"¡Tu turno!"**, 2 minutos al final de la sala: el niño elige qué decir, B.11). Abre tu guía con "Después de esta clase puedo decir/hacer…" (tus frases de B).
5. **Ritmo:** cambio de actividad cada **8–12 minutos** con **señal fija** (B.1), alternando pantalla → cuerpo → papel. Nunca más de 3 minutos de explicación seguida.
6. **Dos bandas, la misma meta:** cada juego tiene versión **Explorador (8–11)** y **Reto (12–15)**. Reto no es "más difícil por más difícil": es más autonomía, más lectura, un rol de estatus (DJ, capitán, asistente de lectura, juez, presentador) y un tono que **no infantiliza** (nada de "¡muy bien, campeón!" a un chico de 14; sí "¡bien ahí!", "¿quién se atreve?").
7. **Canciones y cantos:** solo los de B.12 (originales o con melodía tradicional de dominio público). **Nunca** letras ni audio de K-pop, ni canciones con derechos (tampoco "곰 세 마리" ni otros 동요 con autor: Fase 1 §15.1 ⚑). El K-pop entra como referencia cultural (palabras que ya conocen, el 손하트), nunca como canción de clase.
8. **Romanización:** política de la sección D. En el cuaderno del niño, **nunca**; en el recuadro "Para la familia", **sí**, en gris y solo para el adulto.
9. **Coreano:** 해요체 con los profes y en las fórmulas; 안녕 y 반가워 solo entre niños (en la canción). Todo en fórmulas: nada de explicar gramática más allá del gesto de 받침 (S4). Si dudas, **⚑**. No inventes expresiones.
10. **Cultura** conectada a una frase que el niño dice (frase ancla), con el matiz [YA] de B, sin estereotipos ("muchas familias", "en Seúl", "algunos niños"; nunca "los coreanos" + verbo en presente general). Eje del curso: **Corea que se juega** (Fase 1 §10.3). Nada de *El juego del calamar* ni de juegos que se asocian a la serie (tampoco 무궁화 꽃이 피었습니다 en octubre, ⚑ D-16).
11. **Privacidad de menores en cada actividad** (sección D.4): nunca caras en redes · la grabación es solo para el grupo · solo nombre de pila · el chat de Zoom solo en público · los videos con cara van **por privado**, no al grupo · familia en **dibujo**, no en foto · **nunca un adulto a solas con un solo niño en una sala** · foto final **de manos** con 손하트.
12. **Sin competencia agresiva:** ningún juego elimina. Quien se equivoca pasa a ser **el juez** o **el que dirige** la ronda siguiente. Los stickers se ganan por participar y por el logro de la semana, no por ganarle a otro.
13. **Jay no produce material** (Fase 1 §14.4: es el cuello de botella de octubre). Revisa y aprueba. Todo lo visual lo hace producción con la plantilla de la casa; Abby revisa el coreano de canciones, láminas y su bloque.
14. **Voz Academia Seúl** para niños: cálida, juguetona, clara, con humor; emojis con moderación. **Nunca texto rojo** (acento azul `#4236F6`), tampoco en stickers, cruces, "incorrecto" ni semáforos: los indicadores usan **● ◐ ○**. Colores del 한글 como en el Lector y Dubu: **consonante azul `#4236F6` · vocal dorada `#B8860B` · 받침 verde `#2F7D46`**.

---

## A. Diseño del curso (los 16 campos del brief §8)

**1 · Nombre del curso.** Coreano para Niños (8–15) · Juega y aprende.

**2 · Nombre coreano.** 어린이 한국어 ("coreano para niños"). ⚑ En Corea, 어린이 se usa sobre todo para niños de primaria: a un chico de 13–15 le puede sonar infantil. En octubre no se toca (está publicado); para enero, ver la decisión de bandas (anexo I, #1).

**3 · Nivel CEFR (con la regla honesta de la Fase 1).** **Sin etiqueta CEFR**, como ya está publicado ("no equivale a un nivel del examen TOPIK"). Uso interno: Niños 1 ≈ **Pre-A1** ≈ semanas 1–3 de Básico 1 + frases fijas (Fase 1 §13). Horas reales: 8 h en vivo + la misión de casa (núcleo de 10 min × 3 días + una pieza del cartel + un audio de 10–30 s ≈ 45 min por semana ≈ 6 h) ≈ **14 h guiadas**; con todo lo que la ficha llama "unas 2 horas semanales", hasta ~24 h (la Fase 1 estimó 15–22 h). Lo esperable al terminar: **50–70 palabras activas y 120–150 pasivas** (Fase 1 §5.3), lectura de sílabas y palabras de 1–3 sílabas y una presentación memorizada de 30–60 s. El certificado dice lo que el niño hizo (el curso y el show), no un nivel.

**4 · Alumno objetivo.** Niños y niñas de **8 a 15 años**, hispanohablantes, desde cero (o con palabras sueltas del K-pop y los dramas), curiosos, con ganas de jugar, cantar y dibujar, y con **un adulto en casa** que conecte la clase 1, reciba la nota semanal por WhatsApp y envíe las tareas (publicado). En octubre, en concreto: (a) niños de 8–11 que empiezan de cero, algunos todavía afirmando la lectura en español; (b) preadolescentes y adolescentes de 12–15 que llegan por el K-pop o los dramas, con oído y a veces algo de 한글 de fandom; (c) eventualmente, niños de familias con raíces coreanas que entienden más de lo que leen; (d) hermanos inscritos juntos. Perfiles y cómo se atiende cada uno: B0.

**5 · Prerrequisitos.** Publicados: ninguno. Prácticos (publicados): tener entre 8 y 15 años, computador o tablet con cámara y micrófono (mejor computador), un lugar tranquilo, hojas y lápices de colores a mano y un adulto responsable que gestione el WhatsApp de la familia. **De 13 a 15 años** también se puede tomar Básico 1 (publicado); la regla de edad para adultos (13 o 14) está pendiente (DECISIÓN DE JAY 10 de la Fase 1, anexo I #4).

**6 · Promesa del curso.** *"Juega, canta y dibuja en coreano: en 8 semanas lees tus primeras palabras en 한글 y te presentas en un mini-show para tu familia."* (la del programa público).

**7 · Objetivos de aprendizaje** (los 7 publicados, sin cambios):
1. Leer en voz alta sílabas y palabras sencillas en 한글: vocales y consonantes básicas y los 받침 más frecuentes.
2. Saludar, despedirse y agradecer en coreano con la pequeña reverencia que corresponde.
3. Presentarse con nombre y edad: 안녕하세요, 저는 ___이에요/예요, ___ 살이에요.
4. Contar del 1 al 10 con los números coreanos nativos y preguntar la edad.
5. Nombrar 10 animales, los miembros de la familia y 10 comidas coreanas, y decir cuáles le gustan y cuáles no.
6. Escribir su propio nombre y palabras cortas en 한글.
7. Presentar un mini-show de 30–40 segundos en coreano ante la familia y recibir su certificado.

*Cómo se leen en octubre:* el 3 y el 4 se cumplen **hasta 열다섯** [YA] (tarjeta de edades de la S6: 열한 · 열두 · 열세 · 열네 · 열다섯 살), para que ningún niño de 11–15 se quede sin poder decir su edad (Fase 1 §4.9, problema #12). El 5 se cumple con **우리 엄마예요!** en lugar de "이 사람은 우리 엄마예요" para la propia familia (Fase 1 §10.5). El 7 es de 30–40 s en Explorador y de **40–60 s + una pregunta a otro niño** en Reto (Fase 1 §11.5), dentro del mismo show.

**8 · Resultados esperados ("puede hacer").** *Siempre en los temas del curso, con un profe paciente y con preparación cuando se indica.*

| Logro | Explorador (8–11) | Reto (12–15) |
|---|---|---|
| Leer | Las 6 vocales y las 10 consonantes básicas; sílabas de 2 letras; su nombre; palabras de 1–2 sílabas con 받침 ㄴ ㅁ ㅇ ㄹ | Cualquier palabra del curso sin dibujo; palabras con letras "con aire" y "tensas" de oído; su guion en 한글 |
| Hablar | Saludo con reverencia + nombre + edad + 1 familiar + animal + comida, de memoria y con el cartel (30–40 s) | Lo mismo en 40–60 s, con 2 gustos y una pregunta a otro niño; responde 몇 살이에요? / 뭐 좋아해요? sin ensayar |
| Entender | Instrucciones de clase con gesto (네, 잘했어요, 다시, 따라 하세요); las preguntas del curso dichas despacio | Las preguntas del curso a velocidad de clase; historias cortas de Abby con apoyo de imágenes |
| Escribir | Su nombre en 한글 y 3–5 palabras copiadas bajo sus dibujos | Nombre + las frases de su guion; opcional, teclado coreano |
| Cultura | 인사 (reverencia), 가위바위보, el tigre, 언니/형 | Lo mismo + por qué en Corea se pregunta la edad (y el 만 나이), el 김장 y sus diferencias regionales |

**Todavía no:** decir frases fuera de las fórmulas, conjugar verbos, los números sino-coreanos (일, 이, 삼…), la hora, preguntas no ensayadas (Explorador), las reglas de pronunciación (se imitan, no se explican).

**9 · Vocabulario requerido.** **125 filas** en la lista maestra (C): **86 palabras de núcleo publicado** (11 + 10 + 11 + 11 + 11 + 12 + 12 + 8; los números 하나–열 son una fila de paradigma) + las 16 letras (6 vocales y 10 consonantes) + fórmulas, agregados [YA], anticipos y reconocimiento. Carga: 10–21 filas por semana. Reglas: **N** núcleo publicado = se dice y entra en el quiz-juego, el tablero o el show · **L** letra = se lee · **F** fórmula = se dice entera, sin explicar · **P** paradigma = serie que se aprende junta · **Y** agregado [YA] dentro de lo publicado (tarjeta extra, versión Reto) · **A** anticipo = palabra de una semana posterior usada antes, marcada · **T** palabra de clase · **R** reconocimiento = lo dicen los profes o es cultura; no se pide ni se evalúa.

**10 · Gramática** (en fórmulas; tope: **un patrón nuevo por clase**; conteo en B.10): S1 fórmulas de saludo + 6 vocales con la ㅇ muda → S2 **저는 ___이에요/예요** (con el nombre de cada uno ya escrito) + consonante + vocal = sílaba → S3 la sílaba como bloque + 받침 ㄴ ㅁ ㅇ ㄹ (leer) → S4 **N이에요/예요** + 이거 뭐예요? (primera estructura real, con el gesto puño / mano abierta) → S5 **우리 + familia** (+ 이 사람은… para reconocer) → S6 **números nativos + ___ 살이에요** (한/두/세/네) → S7 **N 좋아해요 / 안 좋아해요** → S8 integración, sin nada nuevo.

**11 · Pronunciación.** *Se corrige siempre* (nota publicada): el saludo con reverencia, el propio nombre bien pronunciado y los sonidos de las 6 vocales. *Se deja pasar* (nota publicada): confundir 이에요/예요, omitir 을/를, mezclar 살 con números sino-coreanos. Errores típicos de hispanohablantes (publicados): ㅓ que sale como "e" (es una o abierta: "boca de bostezo"), ㅡ (no existe en español: "sonríe y di u"), ㄹ entre vocales (r suave, nunca r fuerte), la ㅇ final que se pierde (강 no es "gan"). **[YA]** El 받침 sin vocal de apoyo (산, no "sanu"; 발, no "balu"). Las letras "con aire" (ㅋ ㅌ ㅍ ㅊ) y las "tensas" (ㄲ ㄸ ㅃ) se trabajan **solo de oído** (Dubu Gwangjang, 토끼, 코끼리, 아빠, 떡볶이), sin explicación (Fase 1 §14.2). Técnica: modelo de Abby + espejo + exageración + gesto (ㅓ bostezo · ㅗ boca de besito · ㅡ sonrisa · ㅜ trompita), nunca explicación fonética (publicado). Las palabras con cambios de sonido se imitan enteras; la notación [ ] es **solo para los profes**: 감사합니다 [감사함니다] · 여덟 [여덜] · 맛있어요 [마시써요] · 떡볶이 [떡뽀끼] · 몇 살 [멷쌀] · 할아버지 [하라버지] · 곰이에요 [고미에요] ⚑ D-17.

**12 · Cultura.** Eje del curso (Fase 1 §10.3): **Corea que se juega** — "¿cómo juegan, cantan y celebran los niños en Corea?". Capas: tradicional + contemporánea. Lo que el niño sabe *hacer*: saludar con 인사 · elegir turnos con **가위바위보** · decir 선생님 y usar 언니/오빠/누나/형 · jugar al "가라사대" (el "Simón dice" coreano, ⚑ D-14) · hacer el 손하트 · contar el cuento del oso y el tigre (단군) y el del rey que inventó el 한글 · saber qué es el 돌잡이 y el 김장. Cada semana tiene su **frase ancla** (B) y el matiz [YA] que los profes dicen en voz (Fase 1 §10.5), sin tocar el PDF.

**13 · Speaking.** Cada niño dice algo en coreano **al menos 8 veces por clase**: pase de lista (네! y lo que muestra), quiz-juego, coro de lo nuevo (con micrófono apagado y después como solista), **al menos 3 turnos individuales en la sala** (el kit de Abby ya pide "cada alumno habla al menos 3 veces") y "¡Tu turno!" (B.11). Los 20 minutos de taller en salas no se recortan nunca. Producción final: el show (Explorador 30–40 s · Reto 40–60 s + pregunta).

**14 · Lectura.** Letra → sílaba → palabra (Fase 1 §7.3): vocales (S1) → consonantes y sílabas de 2 letras (S2) → 받침 ㄴ ㅁ ㅇ ㄹ y palabras de 1–2 sílabas (S3) → palabras de 2–3 sílabas con dibujo (S4–S7) → **5 palabras al azar del curso** (S8). Explorador lee sílaba → palabra; Reto, palabra → frase fija (su guion). Siempre en voz alta, con el 🔊 como modelo; nunca pasando por letras latinas.

**15 · Escritura.** Su **nombre en 한글** (S2, publicado) con el orden de trazo básico (de arriba hacia abajo, de izquierda a derecha) · etiquetas en 한글 bajo cada dibujo del cartel (S2, S4, S5, S7) · Reto: las frases de su guion (S7) y, opcional, el teclado coreano (guía de una página de Básico 1, G.1). Sin dictados largos ni copias de frases.

**16 · Listening.** Instrucciones de clase en coreano con gesto (Abby, desde el minuto 1) · canciones y cantos · bingos con audio · "Abby dice" · sonidos de animales · cuentos cortos con láminas · el 🔊 del cuaderno, del Lector y de Dubu (Audioteca A0–A1, Fase 1 §9.3) · las **3 frases clave de cada clase** (Audioteca A2, B.12). Meta: entender las preguntas del curso con apoyo visual; en el show, 5 preguntas con dibujos (señalar lo que dice el profe).

---
## B0. Perfil real de entrada en octubre y diagnóstico de la S1

### B0.1 Quién llega (perfiles esperables) y cómo se atiende cada uno

**Lo que sabemos de verdad:** el rango publicado es 8–15, el cupo es 12 y el curso parte de cero. **Lo que todavía no sabemos:** cuántos se inscriben, sus edades, países y si hay hermanos → **[PENDIENTE: lista de inscritos del lun 12 oct]**. Un antecedente real: en julio, tres familias pidieron clases para hijos de **5, 7 y 11 años** (`D:\Deskotop to D\Academia Seul\Programa_Infantil_A1_Propuesta.docx`, solo lectura). Si alguna se inscribe ahora con un niño menor de 8, es **DECISIÓN DE JAY** (el rango publicado es 8–15). La nota interna publicada ya anticipa "uno de 12" junto a niños de 8 (`ninos · notas_profesor`).

| Perfil | Qué trae | Qué le cuesta | Qué necesita | Cómo se atiende (todo dentro de lo publicado) |
|---|---|---|---|---|
| **8–9 años, desde cero** | Energía, imitación, cero vergüenza | Todavía afirma la lectura en español; atención corta frente a la pantalla; salas y micrófono | Movimiento, dibujo, repetición, un adulto cerca en la S1 | Sala Explorador; tarjetas con dibujo; responde primero con gesto; nunca romanización (D) |
| **10–11 años, desde cero o con K-pop suelto** | Lee bien en español; quiere "hacerlo bien" | Frustración si no entiende; comparación con los mayores | Metas cortas y visibles (stickers, cartel) | Sala Explorador con rol de ayudante; versión Reto disponible si la pide |
| **12–15 años, fans del K-pop o los dramas** | **Oído** (오빠, 사랑해, 대박, 화이팅, 진짜?); a veces lee algo de 한글 de fandom o de apps; nombres de idols | Sentir que el curso es "para chicos"; formas en 반말 de las canciones; grafías de fandom en letras latinas (*saranghae*) | Estatus, autonomía, lectura real, humor | **Sala Reto** con Abby; roles (DJ de la canción, capitán, asistente de lectura, juez, presentador del show); tablero de "sellos" en vez de stickers (misma hoja, otro diseño, B.1) |
| **Raíces coreanas** (familia que habla coreano en casa) | Comprensión oral alta, pronunciación nativa, a veces 반말 | Leer: puede no leer nada | Que su oído sea un valor, no un aburrimiento | "Embajador del sonido" (modela palabras en la sala); lectura como Explorador; **conversación de 5 min con la familia por WhatsApp antes de la S1, caso a caso** (Fase 1 §12, ⚑ N-8) |
| **Hermanos inscritos juntos** | Se apoyan en casa | Uno "responde por el otro"; diferencia de edad | Cada uno con su turno | Salas según su banda (pueden quedar en salas distintas); si la familia prefiere juntos, en la de la banda del menor con rol para el mayor |
| **Fuera de Chile** | — | España: 23:00 hasta el 25 oct y 22:00 después: tarde para un niño | Saber la hora exacta | La tabla de husos va en la Guía para familias; si hay un inscrito en España, Jay lo conversa con la familia antes del 19 oct (no cambia el horario) |

**Regla de las salas (para todo el curso):** sala **Explorador (8–11) con Jay** y sala **Reto (12–15) con Abby**. Razones: los más chicos necesitan más andamiaje en español (Jay); los mayores aguantan más coreano y lo viven como estatus (Abby, 90 % en coreano con apoyo visual). Si las edades no se reparten parejo, **prima el tamaño (máximo 6 por sala)** y el niño de 11 más lector pasa a Reto; si hay solo 1–2 de 12–15, van a la sala de Abby con los de 10–11 más avanzados y un rol de estatus (no quedan solos). **Mínimo 2 niños por sala** (si por ausencias una sala queda con uno, se trabaja en una sola sala con los dos profes: nunca un adulto a solas con un solo niño, Fase 1 §16.1). Las salas quedan fijas desde la S2 con el mapa del grupo (B0.2) y se revisan en la S4.

### B0.2 El diagnóstico de la S1 (sin test, sin nota, jugando)

Lo publicado dice que Niños **no tiene test** (Fase 1 §11.4: entrada "sin test"). El diagnóstico es **observación durante las actividades normales de la S1**: nadie "rinde" nada, las familias no ven una planilla y el niño no sabe que se le observa. Sirve para tres cosas: armar las salas fijas, repartir roles y saber quién necesita ayuda técnica o más tiempo.

**Qué se observa y dónde (PROFE)**

| Momento de la S1 | Qué se mira | Cómo |
|---|---|---|
| 18:00–18:05 · pase de lista con 네 | ¿Responde con voz, con gesto o no responde? ¿Cámara y audio funcionan? | Jay llama por nombre; Abby anota |
| 18:05–18:12 · "¿Qué palabras coreanas conoces?" | **Trae:** palabras del K-pop o los dramas; si dice alguna en 반말 (사랑해, 진짜) | Cada niño dice una (o levanta la mano de Zoom); Jay las escribe en 한글 en la pizarra |
| 18:12–18:15 · lámina "¿Alguien lo puede leer?" (안녕 · 한국) | **Trae:** ¿lee algo de 한글? | Voluntario, sin presión; si nadie lee, es lo esperado |
| 18:15–18:35 · lo nuevo (vocales con el cuerpo, eco con Abby) | ¿Entiende la instrucción en coreano con gesto? ¿Imita el sonido (ㅓ/ㅗ, ㅡ)? | Abby observa la forma de la boca; Jay, el cuerpo |
| 18:35–18:55 · sala | ¿Dice 안녕하세요 solo o sola? ¿Lee una vocal de su cartón? ¿Cómo participa (voz, gesto, cámara apagada)? | Cada profe con la planilla de su sala |

**Planilla del mapa del grupo (PROFE; una fila por niño; sin colores: ● sí · ◐ con ayuda · ○ todavía)**

| Niño (nombre de pila) | Edad | Entiende la instrucción con gesto | Repite con buena pronunciación | Dice la frase solo | Trae (K-pop · lee algo · coreano en casa) | Participa con (voz · gesto · chat) | Técnica (✔ · necesita al adulto) | Sala y rol sugerido |
|---|---|---|---|---|---|---|---|---|

Las tres primeras columnas son **los 3 indicadores publicados** que se registran todas las semanas (E.3): la S1 es su punto de partida.

**Salida: el mapa del grupo, mié 21 oct** (Jay, con la planilla de las dos salas): (1) salas fijas desde la S2; (2) un rol por niño de 12–15 (y de ayudante para quien lo pida); (3) quién responde primero con gesto; (4) qué familias necesitan una llamada técnica antes de la S2. **"Antes y después":** el **audio de 10 s de la tarea de la S1** (안녕하세요 + 감사합니다, publicado) se guarda en la carpeta privada del curso como el "antes"; el show de la S8 es el "después" (Fase 1 §11.4). Se escuchan juntos solo en la devolución a la familia, nunca en el grupo.

### B0.3 Herramientas para el grupo mixto (todas dentro de lo publicado)

1. **Salas por banda** (regla de B0.1), con la **misma meta**: el mismo juego en versión Explorador y Reto (la nota publicada ya lo pide: "una versión 'fácil' y una 'reto' del mismo juego").
2. **Roles de estatus** para 12–15 (Fase 1 §16.1): **DJ de la canción** (dirige el canto en su sala), **capitán** (lleva la cuenta de turnos con 가위바위보), **asistente de lectura** (lee primero la fila del bingo), **juez** (verifica en "Abby dice"), **guardián del tiempo** (muestra 시작 / 끝 desde la S8), **presentador** del show. Rotan cada semana.
3. **Gesto primero** para los tímidos (publicado): responden con el cuerpo o mostrando la tarjeta antes que con la voz; la voz llega en el "¡Tu turno!" con el profe al lado.
4. **Tablero en dos diseños:** "stickers" (Explorador) o "sellos" (Reto); **mismos 10 logros** (E.3). Nadie ve el tablero de otro.
5. **Ayudantes, no profesores:** los mayores ayudan en su propia sala; nunca se les pide "cuidar" a los chicos.
6. **Embajador del sonido** (raíces coreanas): modela una palabra por ronda; su reto es leerla.

### B0.4 Qué es repaso para unos y nuevo para otros, semana a semana

| S | Tema | Desde cero (8–11) | Fan del K-pop (12–15) | Raíces coreanas | Qué hacen Jay y Abby |
|---|---|---|---|---|---|
| 1 | ¡Hola, Corea! | Todo nuevo | Conoce 안녕 y 감사합니다 de oído; nuevo: leer vocales y la reverencia | Oído completo; nuevo: leer | "¿Qué palabras conoces?" como puerta de entrada; matiz de 안녕 (B.2) |
| 2 | Mi nombre | Nuevo | Quizá sabe escribir el nombre de su idol: se usa como reto | Puede tener nombre coreano: se respeta el que la familia quiera usar | Tarjeta de nombre preparada para todos (G.2) |
| 3 | Fábrica de sílabas | Nuevo | Lee más rápido: capitán de la fábrica | Suena bien, lee lento | Reto con palabras de dos sílabas |
| 4 | Animales | Nuevo | Algunos animales de oído | Oído completo | Gesto del 받침 para todos; Reto explica la regla |
| 5 | Familia | Nuevo | **오빠** y **언니** de oído (fandom): se aclara el uso real | Usa los términos en casa | Embajador del sonido; matiz de 오빠 (B.6) |
| 6 | Números | Nuevo | Quizá cuenta 하나–다섯 de canciones | Cuenta; quizá no lee | Todos hasta 열다섯 (tarjeta [YA]) |
| 7 | Comida | Nombres de comidas quizá conocidos | 떡볶이, 라면, 김밥 de los dramas | Come comida coreana en casa | Encuesta de gustos; nadie está obligado a que le guste el 김치 |
| 8 | Show | — | Presentador | Puede ayudar con el modelo | Todos presentan; cada uno con su versión |

---

## B. Mapa de 8 semanas

### B.0 Vista rápida

| S | Fecha (Chile · Corea) | Tema (publicado) | Lo nuevo (carga) | Frase clave | Lector (exacto) · Dubu | Pieza del cartel | Evaluación |
|---|---|---|---|---|---|---|---|
| 1 | lun 19 oct · mar 20 oct 06:00 | ¡Hola, Corea! · 안녕하세요 | Fórmulas de saludo + 6 vocales | 안녕하세요! | Alfabeto (6 vocales) + Practicar → Vocales · Bukchon 1-1 a 1-3 | — (lámina de vocales para colorear) | Sin quiz · diagnóstico por observación (B0.2) |
| 2 | lun 26 oct · mar 27 oct | Mi nombre en coreano | 저는 ___예요/이에요 + 10 consonantes + C+V | 저는 소피아예요. | Alfabeto (10 consonantes) + Practicar → Consonantes · Bukchon 1-4, 1-5 e Insadong 2-1, 2-2 | **① Mi nombre en 한글** | Quiz-juego de la S1 |
| 3 | lun 2 nov · mar 3 nov | La fábrica de sílabas | La sílaba como bloque + 받침 ㄴ ㅁ ㅇ ㄹ (leer) | 강, 방, 가방! | Aprender 5 y 6 + Practicar → Sílabas y Batchim · Insadong 2-3 a 2-5 y Hongdae 3-1, 3-2 | (cazadores de 한글) | Quiz-juego de la S2 |
| 4 | lun 9 nov · mar 10 nov | Los animales · 동물 | **N이에요/예요** + 이거 뭐예요? | 호랑이예요! | Practicar → Pictogramas y Palabras · Hongdae 3-3 a 3-5 | **② Mi animal favorito** | Quiz-juego de la S3 · chequeo de mitad |
| 5 | lun 16 nov · mar 17 nov | Mi familia · 가족 | **우리 + familia** | 우리 엄마예요! | Practicar → Palabras + Alfabeto (repaso) · Gwangjang 4-1, 4-2 | **③ Mi familia (dibujo)** | Quiz-juego de la S4 |
| 6 | lun 23 nov · mar 24 nov | Los números mágicos | **Nativos 1–10 (+ 11–15 [YA]) + ___ 살이에요** | 몇 살이에요? | Aprender 7 (explorador) · Reto: Practicar → Números · Gwangjang 4-3 a 4-5 | (tarjeta de edad) | Quiz-juego de la S5 |
| 7 | lun 30 nov · mar 1 dic | ¡Ñam! Comida coreana | **N 좋아해요 / 안 좋아해요** | 저는 김밥 좋아해요. | Practicar → Pictogramas y Palabras · Río Han 5-1 a 5-5 | **④ Mi comida favorita** + cartel completo | Quiz-juego de la S6 · ensayo del show |
| 8 | lun 7 dic · mar 8 dic | 🎤 Show final + certificado | Nada nuevo: integración | 잘했어요! 축하해요! | Progreso (captura) · Estación de Seúl (vacaciones) | El cartel en el show | Show (F) + indicadores · [regla del certificado: pendiente de decisión de Jay] |

Romanización para el niño: ninguna semana (sección D). La familia la tiene en su recuadro.

### B.1 La hora de clase (60 minutos) y las señales fijas

La estructura publicada se respeta tal cual (5 bloques). Lo que se agrega va **dentro** de sus bloques.

| Minuto | Hora (Chile) | Bloque (publicado) | Quién | Cómo se usa en octubre |
|---|---|---|---|---|
| 0–5 | 18:00–18:05 | **Bienvenida y canción** | Abby canta · Jay pasa lista | Saludo 안녕하세요 con reverencia · canto de la semana (**todos con el micrófono apagado cantando con Abby**; después, 2–3 solistas por turno: Zoom desfasa las voces, Fase 1 §16.1) · pase de lista jugando: cada niño responde **네!** y muestra a la cámara su dibujo o su tarea |
| 5–15 | 18:05–18:15 | **Repaso jugando** | Abby dirige · Jay anota | Quiz-juego de 5' sobre la clase anterior (bingo, memorice o "Abby dice") · revisión relámpago de la tarea del Lector (captura o "¿quién jugó a Dubu?") · stickers del tablero |
| 15–25 | 18:15–18:25 | **Lo nuevo 1** | **Jay** | Presenta con dibujos, gestos y objetos reales; R → C (eco y coro). Máximo 3 minutos de explicación seguida |
| 25–35 | 18:25–18:35 | **Lo nuevo 2** | **Abby** | Juego de movimiento (TPR) para fijarlo con el cuerpo y la voz; C → G |
| 35–55 | 18:35–18:55 | **Taller en equipos** | Sala Explorador (Jay) · Sala Reto (Abby) | Dos actividades de ~9 minutos (G) + **"¡Tu turno!"** 2' (L, B.11). Cada niño: al menos 3 turnos individuales; corrección uno a uno de pronunciación. Cuenta regresiva de Zoom de 60 s |
| 55–60 | 18:55–19:00 | **Cierre y nota a la familia** | Abby canta · Jay explica | Canto de despedida · sticker del día · **las 3 frases clave en coro** (Audioteca A2, B.14) · la misión de la semana con la pestaña exacta, que Jay dice en español para las familias que escuchan · 감사합니다! 안녕히 계세요! con reverencia |

**Señales fijas de transición (las mismas las 8 semanas; se enseñan en la S1)**

| Señal | Qué significa | Quién la da |
|---|---|---|
| **3 palmas + "하나, 둘, 셋!"** | Cambiamos de actividad | Abby (publicado) |
| **Campanita** | 5 segundos de silencio y mirar a la cámara | Abby |
| **Música bajita** | Dibujamos o recortamos (sin hablar) | Jay comparte el audio de la pantalla |
| **✋ de Zoom** | Quiero hablar | Los niños |
| **"마이크!"** + gesto de apagar | Todos apagan el micrófono | Jay o Abby |

**Semanas que cambian el formato:** **S1** (el apoderado está al lado; el repaso jugando se convierte en "¿Qué palabras coreanas conoces?" + las reglas de Zoom y el efecto espejo, D.4) · **S7** (los últimos 8 minutos de la sala son el primer ensayo del show) · **S8** (show: B.9 y F.5).

**Zoom con niños (PROFE, cada semana):** salas **preasignadas** por nombre (B0.1) · la sala de cada profe se abre con él o ella adentro antes que los niños · el chat queda en **"solo en público"** (nunca mensajes privados entre participantes) · nombres en pantalla: solo nombre de pila (desde la S2, en 한글, publicado) · grabación en la nube desde el minuto 0 (la de la sala principal; ⚑ N-3: confirmar qué graba Zoom en las salas) · música bajita cuando dibujan (publicado) · 2 juegos de reserva (memorice y bingo) por si falla una conexión (publicado).

### B.2 Semana 1 · lun 19 oct · ¡Hola, Corea! · 안녕하세요

| Campo | Semana 1 |
|---|---|
| Fecha | Lunes 19 de octubre de 2026 · 18:00–19:00 (Chile) · martes 20, 06:00 en Corea · **el apoderado acompaña toda la clase** (publicado) |
| Tema | Saludos con canciones + primeras vocales jugando: conocernos, saludar con reverencia y descubrir las 6 vocales con el cuerpo, la voz y el Lector |
| **Después de esta clase puedo decir/hacer…** | 1. (reverencia) **안녕하세요!** — a Jay y a Abby<br>2. **안녕!** — a un compañero, con la mano<br>3. **감사합니다!** · **안녕히 계세요!** (al irme, con reverencia)<br>4. **네!** / **아니요!** en el pase de lista y en los juegos<br>5. Leo en voz alta **아 어 오 우 으 이** y hago su forma con el cuerpo<br>*Reto:* además leo **아이** y **오이** (mis primeras palabras) y reconozco de oído 야 여 요 유 ("vocales con rayita extra") |
| Gramática / estrategia · carga: 0 patrones | • Fórmulas fijas, sin analizar (publicado): 안녕하세요 · 안녕 · 감사합니다 · 안녕히 계세요 · 네 / 아니요<br>• **Las 6 vocales con la ㅇ muda delante** (publicado): ㅏ ㅓ ㅗ ㅜ ㅡ ㅣ → 아 어 오 우 으 이<br>• Estrategia: **el cuento del cielo, la tierra y la persona** (천지인): las vocales se hicieron con tres dibujos, un punto (el sol en el cielo), una raya acostada (la tierra, ㅡ) y una de pie (la persona, ㅣ) (Lector → Aprender 2) ⚑ D-8<br>• Ciclo: R = Abby saluda y Jay muestra la reverencia · C = eco y coro (micrófono apagado → solistas) · G = "La vocal viva" y bingo · L = ¡Tu turno!: cada uno elige a quién saludar y cómo (안녕하세요 a un profe o 안녕 a un compañero) |
| Vocabulario | **Núcleo publicado (11; se dicen y entran en el tablero):** 안녕하세요 · 안녕 · 안녕히 계세요 · 감사합니다 · 네 · 아니요 · 선생님 · 친구 · 한국 · 한글 · 잘했어요<br>**Letras (6):** ㅏ ㅓ ㅗ ㅜ ㅡ ㅣ<br>**Anticipo (A, solo leer):** 아이 · 오이 (núcleo de la S2)<br>**Lenguaje de clase (R, lo dice Abby con gesto):** 따라 하세요 · 다시 · 좋아요 · 친구들 · 다음 주에 만나요<br>**Cultura (R):** 인사 · *Reto (R):* 야 여 요 유 |
| Expresiones | • Abby: 친구들, 안녕하세요! — Niños: 안녕하세요! (reverencia)<br>• Pase de lista: 소피아? — 네!<br>• Abby: 따라 하세요: 아! — 아! · 다시! · 잘했어요!<br>• Cierre: Abby: 오늘도 잘했어요! (R) — Niños: 감사합니다! 안녕히 계세요! — Profes: 안녕! 다음 주에 만나요! ⚑ D-4<br>• **Frases clave del coro:** 안녕하세요! / 감사합니다! / 안녕히 계세요! |
| Foco de habilidad | Escucha (instrucciones con gesto) · habla (fórmulas) · lectura de 6 vocales |
| Pronunciación | Se corrige siempre: la reverencia en el saludo y las 6 vocales (publicado). **ㅓ/ㅗ** (bostezo / besito) · **ㅡ** (sonrisa) · **ㅜ** (trompita de verdad) · 감사합니다 y 안녕히 계세요 se imitan enteras ([감사함니다], ⚑ D-17), sin explicar por qué. Técnica: Abby exagera la boca en primer plano; los niños se miran en su cuadrito como en un espejo |
| Cultura | **Publicado:** en Corea se saluda con una pequeña reverencia (인사); se usa al entrar y salir de cada clase. **Matiz [YA]** (Fase 1 §10.5): "A los profes y a los mayores, 안녕하세요 con reverencia; entre amigos de la misma edad, 안녕 con la mano está bien" ⚑ D-1. **Frase ancla:** (reverencia) **안녕하세요!** **Puente:** en Latinoamérica saludamos con un beso o con la mano; en Corea, la reverencia hace ese trabajo. *Reto:* cuanto más formal la situación, más profunda la reverencia |
| Juegos, canción y cuento | • **Canción del saludo · 안녕 노래** (B.12; con melodía tradicional de "Martinillo")<br>• **"La vocal viva"** (publicado): Jay muestra una vocal y los niños hacen su forma con los brazos (ㅏ brazo al costado, ㅗ brazo arriba, ㅜ brazo abajo, ㅡ brazos abiertos, ㅣ firmes); después un niño posa y los demás adivinan. **Regla del espejo** (D.4): cada uno copia a Jay "como en un espejo"<br>• **Bingo de vocales con audio** (publicado): cartón de 6 casillas; Abby dice una vocal; quien completa lee su fila en voz alta — **y se sigue hasta que todos completen** (nadie queda "perdedor")<br>• **Cuento de 2 minutos:** "El cielo, la tierra y la persona" (천지인), con 3 dibujos |
| Recurso digital (exacto) | **Lector** → pestaña **Alfabeto** → Vocales: en la fila "10 básicas", tocar **solo ㅏ ㅓ ㅗ ㅜ ㅡ ㅣ** (cuadros 1, 3, 5, 7, 9 y 10) y repetir en voz alta · **Practicar → Vocales**: una ronda de 10 (el grupo "vocales básicas" trae también ㅑ ㅕ ㅛ ㅠ: se escuchan sin miedo, son las de "rayita extra"). Regla para todas las semanas: **primero el sonido** (toca 🔊 y di la letra en voz alta), **después** elige. **Dubu** → **Bukchon 1-1, 1-2 y 1-3** (아, 오 y "¿Cuál oíste?": 어/오 · 으/우) |
| Tarea (prepara la clase siguiente) | **Misión de 10 minutos, 3 días** (publicado: 5 min × 3 días de Alfabeto + Practicar hasta 10 aciertos): día 1 Alfabeto + Dubu 1-1 y 1-2 · día 2 Alfabeto + Practicar → Vocales · día 3 Dubu 1-3 + colorear. **Pieza:** colorear la lámina de las 6 vocales (cuaderno) y pegarla cerca del computador (publicado). **Audio de 10 s:** 안녕하세요 y 감사합니다, por el grupo o por privado (publicado). **Prepara la S2:** la familia confirma en el grupo **el nombre (de pila o apodo) que el niño quiere usar en coreano** antes del mié 21 oct; Jay lo trae escrito en 한글 el lunes. Tener 2 hojas blancas y lápices de colores |
| Entregable del niño | Audio de 10 s (es su "antes", B0.2) · opcional: foto de la lámina coloreada, **sin caras** |
| Evaluación | **Sin quiz** (no hay clase anterior). Diagnóstico por observación (B0.2) → mapa del grupo el mié 21 oct. Primeros **3 indicadores** (E.3). **Tablero:** empiezan los logros 1 (saludo con reverencia) y 2 (las 6 vocales). Registro: asistencia en vivo / grabación + tarea, en columnas separadas **[regla del certificado: pendiente de decisión de Jay]** |
| Explorador (8–11) / Reto (12–15) | **Explorador:** las 6 vocales por forma y sonido; bingo de 6 casillas con dibujos de apoyo. **Reto:** bingo con 아이 y 오이 · 야 여 요 유 de oído · **asistente de lectura** (lee primero su fila) · **DJ del saludo** (dirige el canto en su sala) |
| 🇰🇷 Abby 역할 | 인사 노래 리드 (다 같이 음소거로 → 한 명씩 솔로) · 모음 발음 모델 (입 모양을 크게) · "모음 빙고" 호출 · 도전반(12–15세) 소그룹 진행 · 첫 수업이라 보호자가 옆에 있어요 · 마무리: "오늘도 잘했어요! 다음 주에 만나요!" |
| Para la familia (frase de la semana) | **안녕하세요!** *(annyeonghaseyo)* · ¡Hola! (con una pequeña reverencia) |

### B.3 Semana 2 · lun 26 oct · Mi nombre en coreano

| Campo | Semana 2 |
|---|---|
| Fecha | Lunes 26 de octubre de 2026 · 18:00–19:00 (Chile) · martes 27, 06:00 en Corea · desde hoy el niño participa solo o sola (publicado) |
| Tema | Consonantes básicas + cada uno escribe su nombre en 한글: las primeras 10 consonantes, la primera sílaba y el nombre de cada uno en coreano |
| **Después de esta clase puedo decir/hacer…** | 1. **이름이 뭐예요?** — **저는 소피아예요.** / **저는 다니엘이에요.** (con mi propio nombre)<br>2. Leo **가 나 다 라 마 바 사 아 자 하**<br>3. Escribo mi nombre en 한글 y lo leo en voz alta<br>4. Leo y digo **나무, 바다, 나비, 모자, 머리, 다리, 아이, 오이**<br>5. Decido quién empieza con **가위바위보!**<br>*Reto:* armo sílabas con cualquier consonante y vocal del curso (거, 노, 무, 스…) y leo las 8 palabras sin dibujo |
| Gramática / estrategia · carga: 1 fórmula + 10 consonantes | • **저는 ___이에요/예요** (publicado, "frase hecha"): cada niño recibe **su frase completa** en la tarjeta de nombre; no se explica cuándo va 이에요 (llega con gesto en la S4)<br>• **이름이 뭐예요?** — pregunta fija en cadena (publicado)<br>• **Consonante + vocal = sílaba** (publicado): ㄱ + ㅏ = 가; ㄴ + ㅏ = 나 ("la fábrica empieza a funcionar"); la vocal de palo (ㅏ ㅓ ㅣ) va al lado, la acostada (ㅗ ㅜ ㅡ) va abajo<br>• Tu nombre puede traer letras que no están en la lista (ㅋ ㅌ ㅍ ㅊ, "letras con aire"): se aprenden como parte del nombre<br>• Ciclo: R = Jay arma su nombre (제이) y muestra cómo se escribe el de Abby (el que ella elija, ⚑ D-6, decisión 13) · C = fábrica en coro con ㅏ · G = cada uno arma su nombre con tarjetas y ronda 이름이 뭐예요? · L = ¡Tu turno!: pregunta el nombre a quien quiera y presenta a su muñeco o mascota con un nombre inventado |
| Vocabulario | **Núcleo publicado (10):** 이름 · 저 · 나무 · 바다 · 아이 (↺ S1) · 오이 (↺ S1) · 머리 · 다리 · 나비 · 모자<br>**Letras (10):** ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅅ ㅇ ㅈ ㅎ (= las 10 de Lector → Practicar → Consonantes)<br>**Fórmulas:** 이름이 뭐예요? · 저는 ___이에요/예요<br>**[YA] (Y):** 가위바위보 (para decidir turnos desde hoy, Fase 1 §10.4) ⚑ D-3<br>**Cultura (R):** 한글날 · 세종대왕 |
| Expresiones | • 이름이 뭐예요? — 저는 ___예요/이에요.<br>• 가위바위보! (y quien gana empieza)<br>• TPR de Abby: 머리! (tocarse la cabeza) · 다리! (tocarse la pierna)<br>• **Frases clave del coro:** 이름이 뭐예요? / 저는 소피아예요. / 나무, 바다, 나비! |
| Foco de habilidad | Lectura (C+V) · escritura (el nombre) · habla (presentarse) |
| Pronunciación | **ㄹ** suave como la r de "pero" (라, 다리, 머리) · **ㅈ** "ch suave" (자, 모자) · ㄱ ㄷ ㅂ suaves (entre g/k, d/t, b/p) · el propio nombre **a la coreana** (소피아 no suena igual que "Sofía": es parte del juego). Se deja pasar: 이에요/예요 |
| Cultura | **Publicado:** el 9 de octubre es **한글날** (Día del Hangul), feriado en Corea: se celebra el alfabeto que inventó el rey **세종대왕** para que todas las personas pudieran aprender a leer; esta semana cada niño escribe su nombre con él. **Cuento de 2 minutos:** "El rey que quería que todos leyeran" (en 1443 el rey Sejong creó el alfabeto; en 1446 lo presentó al pueblo) ⚑ D-7. **Puente:** Sejong aparece en el billete de 10.000 wones (만 원) y tiene una estatua gigante en la plaza Gwanghwamun, en Seúl. **Frase ancla:** **저는 ___예요!** "tu nombre, con las letras de Sejong". **Matiz:** un nombre extranjero se escribe como suena y a veces tiene más de una forma |
| Juegos, canción y cuento | • **Fábrica de nombres** (publicado): cada niño arma su nombre con tarjetas de letras en la pizarra de Zoom mientras Jay guía (Sofía → 소피아, Mateo → 마테오, Valentina → 발렌티나); luego lo escribe en una hoja grande y lo muestra a la cámara (**en su cuadrito se ve al revés: no darla vuelta**, D.4)<br>• **Ronda 이름이 뭐예요?** (publicado): en círculo virtual; el orden sale con 가위바위보; Abby corrige la reverencia y la entonación<br>• **Dictado dibujado** (publicado): Abby dice 나무 o 바다; 20 segundos para dibujar y escribir la palabra debajo<br>• **"Abby dice" de partes del cuerpo:** 머리! 다리! (anticipa el juego de la S6)<br>• Canto de la semana: 안녕 노래 + ronda de nombres (B.12) |
| Recurso digital (exacto) | **Lector** → **Alfabeto** → Consonantes: en "14 básicas", tocar las 10 del día (todas **menos** ㅊ ㅋ ㅌ ㅍ, que son "con aire" y se escuchan jugando más adelante) y repetir · **Practicar → Consonantes** hasta 10 aciertos (son exactamente las 10 del curso). **Dubu** → **Bukchon 1-4 y 1-5** (나, 우유) e **Insadong 2-1 y 2-2** (고기, 나무). **Extra con el adulto:** `/generador-nombre` para comparar su nombre |
| Tarea (prepara la clase siguiente) | **Misión 10' × 3 días:** Alfabeto (consonantes) · Practicar → Consonantes · Dubu. **Pieza ① del cartel:** decorar la hoja con tu nombre en 한글 (colores, dibujos, stickers): se muestra al inicio de la S3 y va al show final (publicado). **Audio de 10 s:** 안녕하세요, 저는 ___이에요/예요 (publicado). **Prepara la S3:** recortar las **tarjetas de letras** del cuaderno y traerlas en un sobre (se usan en la fábrica de sílabas) |
| Entregable del niño | Foto de la hoja del nombre (**solo la hoja**) · audio de 10 s |
| Evaluación | **Quiz-juego de la S1** (5'): Abby dice una vocal → los niños muestran la tarjeta o hacen la forma; saludo en cadena. Indicadores (E.3). **Tablero:** logros 3 (lee las 10 consonantes con ㅏ) y 4 (escribe su nombre en 한글) |
| Explorador / Reto | **Explorador:** sílabas con ㅏ (가 나 다…), su nombre con la tarjeta de Jay, 4 de las 8 palabras con dibujo. **Reto:** todas las vocales × las 10 consonantes; las 8 palabras sin dibujo; **reto de fans:** "¿cómo se escribe el nombre de tu idol o de tu jugador favorito?" (solo el nombre, nada de letras de canciones); capitán del 가위바위보 |
| 🇰🇷 Abby 역할 | 자음 발음 모델 (가 나 다 라…, ㄹ은 부드럽게) · "이름이 뭐예요?" 릴레이 진행 · 그림 받아쓰기 (나무, 바다, 나비…) 호출 · "머리! 다리!" 몸 게임 · 아이들 이름을 한국어로 불러 주기 (이름 카드 확인 ⚑ D-6) · 도전반 진행 |
| Para la familia | **저는 ___예요 / 이에요.** *(jeoneun ___yeyo / ieyo)* · Yo soy ___. (El nombre de su hijo o hija ya viene escrito en la tarjeta) |

### B.4 Semana 3 · lun 2 nov · La fábrica de sílabas

| Campo | Semana 3 |
|---|---|
| Fecha | Lunes 2 de noviembre de 2026 · 18:00–19:00 (Chile) · martes 3, 06:00 en Corea |
| Tema | Armar y leer sílabas + bingo de lectura: las letras se vuelven sílabas y las sílabas, palabras reales; aparece el **받침** |
| **Después de esta clase puedo decir/hacer…** | 1. Fabrico sílabas cambiando la vocal: **가 거 고 구 그 기** (y con otra consonante)<br>2. Leo palabras con 받침 ㄴ ㅁ ㅇ ㄹ: **문, 산, 손, 발, 물, 강, 방, 밤, 눈, 김, 가방**<br>3. Digo y señalo: **눈!** (ojo) · **손!** · **발!**<br>4. Distingo de oído **강 / 간** (la ㅇ de abajo suena "ng")<br>*Reto:* leo palabras de dos sílabas que ya digo desde la S1: **한국, 한글, 선생님, 안녕** |
| Gramática / estrategia · carga: 1 estrategia de lectura | • **La sílaba como bloque** (publicado): consonante + vocal (가) y consonante + vocal + 받침 (강): "cada sílaba vive en una cajita"<br>• **받침 ㄴ ㅁ ㅇ ㄹ** (publicado): solo reconocer y leer, sin reglas<br>• **La ㅇ tiene dos caras** (publicado): muda arriba (아), "ng" abajo (강)<br>• Oral: se reciclan las fórmulas de S1–S2 (la sala abre con 이름이 뭐예요? y 가위바위보)<br>• Ciclo: R = Jay arma 가 → 강 con las piezas de colores · C = fábrica en coro · G = bingo de lectura y carrera del 받침 · L = ¡Tu turno!: cada uno elige una palabra, la lee y los demás la actúan |
| Vocabulario | **Núcleo publicado (11):** 문 · 산 · 손 · 발 · 물 · 강 · 방 · 밤 · 눈 · 김 · 가방<br>**Paradigma:** 가 거 고 구 그 기<br>**Palabra de clase (T):** 받침<br>**Cultura (R):** 첫눈 ⚑ D-11<br>*Reto (↺ S1, ahora leídas):* 한국 · 한글 · 선생님 · 안녕 |
| Expresiones | • Jay: "¡La fábrica abre!" — ㄱ + ㅏ = **가**!<br>• Abby, en el bingo: una sílaba cada 10 segundos (가!… 기!), con la tarjeta en pantalla<br>• **Frases clave del coro:** 가, 거, 고, 구, 그, 기! / 문, 산, 손, 발! / 강, 방, 가방! |
| Foco de habilidad | Lectura (decodificar) · escucha (bingo) |
| Pronunciación | **El 받침 sin vocal de apoyo** [YA]: 산 (no "sanu"), 발 (no "balu"), 김 (no "kimu") · **ㅇ final = ng** como en "tango" (강, 방) · **ㄴ/ㅇ al final** (간 / 강: Dubu 3-3) · **ㄹ final = l** (발, 물) |
| Cultura | **Publicado:** las sílabas coreanas se escriben en bloques cuadrados, como si cada una viviera en una cajita; un libro antiguo dice que una persona sabia aprende 한글 **en una mañana** (y cualquiera, en diez días) ⚑ D-9. **Gancho de temporada [YA]** (Fase 1 §10.6): **눈** es "ojo" y también "nieve"; en Corea, en noviembre y diciembre, mucha gente espera el **첫눈** (la primera nieve) ⚑ D-11, mientras aquí se viene el verano (estaciones al revés). **Frase ancla:** **눈!** (tocarse el ojo · hacer que cae nieve). **Puente:** en español también hay palabras con dos sentidos ("vela": de cumpleaños y de barco) |
| Juegos, canción y cuento | • **Fábrica de sílabas** (publicado): Jay fija una consonante y los niños "fabrican" sílabas cambiando la vocal a coro (micrófono apagado → solistas); luego un niño elige la consonante y dirige la fábrica<br>• **Mis tarjetas de letras** (preparadas en casa): arman 강, 방, 가방 sobre la mesa y lo muestran a la cámara<br>• **Bingo de lectura** (publicado): cartón de 9 sílabas; Abby lee una cada 10 segundos; quien completa lee su fila — y se sigue hasta que todos completen<br>• **Carrera del 받침** (publicado) **[YA] sin eliminación:** en equipos de 3, cada equipo lee 5 palabras con 받침 y **compite contra su propio tiempo** (primera vuelta → segunda vuelta más rápida); Jay y Abby cronometran y corrigen la ㅇ final<br>• **"Actúa la palabra"**: 문 (abrir una puerta), 산 (brazos en triángulo), 물 (beber), 밤 (dormir), 강 (ola), 손 / 발 / 눈 (tocarse) |
| Recurso digital (exacto) | **Lector** → **Aprender 5** "Arma bloques, no letras sueltas" (el constructor de colores: consonante azul, vocal dorada, 받침 verde) y **Aprender 6** "El truco del 받침" → **Practicar → Sílabas** (10 aciertos) y **Practicar → Batchim** (10 aciertos: 8 de sus 16 palabras son de esta semana: 물 눈 밤 문 손 방 산 강) (publicado). **Dubu** → **Insadong 2-3 a 2-5** (그/구, 바다, 하나) y **Hongdae 3-1 y 3-2** (강, 산) |
| Tarea (prepara la clase siguiente) | **Misión 10' × 3 días:** Aprender 5–6 una vez; Practicar → Sílabas y Batchim; Dubu. **Cazadores de 한글** (publicado): buscar 3 palabras coreanas en casa (un envase de ramen, un álbum, un drama en la tele) y enviar una foto o un dibujo de una — **foto solo del objeto** [YA]. **Audio:** leer en voz alta las 11 palabras de la semana (publicado). **Prepara la S4:** tener a mano **un peluche o juguete de animal** (o un dibujo de un animal) para el lunes (publicado: kit de casa) |
| Entregable del niño | Foto o dibujo del hallazgo · audio de las 11 palabras |
| Evaluación | **Quiz-juego de la S2** (5'): cadena 이름이 뭐예요? — 저는 ___예요/이에요 + "¿cuál dije?" con tarjetas 가 나 다 마 바. Indicadores. **Tablero:** logro 5 (lee palabras con 받침) |
| Explorador / Reto | **Explorador:** palabras de una sílaba (문, 산, 손…) + fábrica con ㅏ ㅓ ㅗ ㅜ; bingo con dibujos. **Reto:** 가방, 한국, 한글, 선생님, 안녕 · **capitán de la fábrica** · lee la palabra coreana de su hallazgo de "cazador" |
| 🇰🇷 Abby 역할 | 음절 공장 합창 (음소거 → 솔로) · 읽기 빙고 10초마다 호출 · 받침 발음 모델 (강/간, 산/상) · "눈" 이야기: 눈(eye)과 눈(snow), 첫눈 한마디 (⚑ D-11) · 도전반: 두 글자 단어 읽기 |
| Para la familia | **가방** *(gabang)* · mochila (dos sílabas: 가 + 방; la ㅇ de abajo suena "ng") |

### B.5 Semana 4 · lun 9 nov · Los animales · 동물

| Campo | Semana 4 |
|---|---|
| Fecha | Lunes 9 de noviembre de 2026 · 18:00–19:00 (Chile) · martes 10, 06:00 en Corea · **mitad del curso** |
| Tema | 10 animales + "¡es un…!" (이에요/예요) con dibujos: primera estructura real, decir qué es algo |
| **Después de esta clase puedo decir/hacer…** | 1. **이거 뭐예요?** — **호랑이예요!** / **곰이에요!**<br>2. Nombro 10 animales: **강아지, 고양이, 토끼, 곰, 호랑이, 새, 물고기, 코끼리, 돼지, 사자**<br>3. Hago y reconozco los sonidos: **멍멍, 야옹, 꿀꿀** (y el rugido del tigre: **어흥!**)<br>4. Presento mi animal favorito con un dibujo: **이거 토끼예요!**<br>*Reto:* hago la pregunta a un compañero y explico el truco: si la palabra termina en 받침 → 이에요; si termina en vocal → 예요 |
| Gramática / estrategia · carga: 1 patrón | • **N + 이에요/예요** (publicado): 곰이에요 (termina en consonante) · 토끼예요 (termina en vocal). **Gesto** (publicado): **puño** = termina en 받침 → 이에요; **mano abierta** = termina en vocal → 예요<br>• **이거 뭐예요?** (publicado), pregunta y respuesta en formato juego<br>• Onomatopeyas (publicado): 멍멍 · 야옹 · 꿀꿀<br>• Ciclo: R = Abby hace el sonido y Jay muestra el dibujo · C = "¿qué es?" en coro · G = dibujo relámpago y memorice · L = ¡Tu turno!: cada uno muestra un objeto o peluche que elija y pregunta 이거 뭐예요? |
| Vocabulario | **Núcleo publicado (11):** 동물 · 강아지 · 고양이 · 토끼 · 곰 · 호랑이 · 새 · 물고기 · 코끼리 · 돼지 · 사자<br>**Fórmulas:** 이거 뭐예요? · ___이에요/예요<br>**Reconocimiento:** 멍멍 · 야옹 · 꿀꿀 (publicado) · 호돌이<br>**[YA] (Y):** 어흥 ⚑ D-12<br>**Anticipo (A):** 사람 (en el cuento; núcleo de la S5) |
| Expresiones | • 이거 뭐예요? — 곰이에요! / 토끼예요!<br>• Abby: 멍멍! — Niños: 강아지예요!<br>• **Frases clave del coro:** 이거 뭐예요? / 호랑이예요! / 곰이에요! |
| Foco de habilidad | Habla (pregunta y respuesta) · escucha (sonidos) |
| Pronunciación | 호랑이 (ㄹ suave) · 고양이 (la ㅇ) · 곰이에요 se imita entero [고미에요] ⚑ D-17 · **de oído, sin explicar:** 토끼 y 코끼리 (una letra "con aire" y una "tensa") · 돼지 (ㅙ suena "ue"). Se corrige con el gesto, sin detener el juego; se deja pasar la confusión 이에요/예요 (publicado) |
| Cultura | **Publicado:** el **호랑이** es el animal símbolo de Corea: protagoniza los cuentos antiguos, fue la mascota de los Juegos Olímpicos de Seúl 1988 (**호돌이**) y es el sello de Academia Seúl. **Cuento de 2 minutos [YA]:** "El oso y el tigre que querían ser personas" (el mito de 단군: un oso y un tigre piden ser personas; el oso tiene paciencia en la cueva y lo logra, el tigre se va) ⚑ D-22; para las familias, el artículo del blog `/blog/dangun-por-que-corea-nacio-de-una-osa`. **Frase ancla:** **호랑이예요! 어흥!** **Puente:** en Latinoamérica el cóndor, el jaguar o el quetzal son símbolos; en Corea, el tigre. **Y los animales "hablan" distinto:** el perro coreano no dice "guau", dice 멍멍 |
| Juegos, canción y cuento | • **Adivina el animal** (publicado): Abby hace el sonido o el gesto; los niños responden con la frase completa (호랑이예요!); quien acierta hace el siguiente — **y nadie repite turno hasta que todos pasaron**<br>• **Dibujo relámpago** (publicado): 30 segundos para dibujar el animal que dice Jay; se muestra a la cámara con 이거 곰이에요; Jay corrige 이에요/예요 con el gesto<br>• **Memorice en pantalla** (publicado): 12 cartas con dibujos y palabras en 한글; quien encuentra el par lo lee y responde 이거 뭐예요?<br>• **Mis peluches:** cada uno muestra el suyo — 이거 뭐예요? — 강아지예요! |
| Recurso digital (exacto) | **Lector** → **Practicar → Pictogramas** (una ronda de 10: sin letras latinas en la pregunta ni en las respuestas) y **Practicar → Palabras** (una ronda de 10; di la palabra en voz alta **antes** de elegir) → **Progreso**: captura (publicado: "15 palabras con dibujo + captura"). Ojo: el Lector solo trae 강아지 y 고양이 entre los animales; los 10 están con 🔊 en el cuaderno (G.4). **Dubu** → **Hongdae 3-3 a 3-5** (안/앙…, 물, 한국) |
| Tarea (prepara la clase siguiente) | **Misión 10' × 3 días:** Pictogramas · Palabras · Dubu. **Pieza ② del cartel** (publicado): dibujar tu animal favorito y escribir su nombre en 한글; lo presentas en 10 segundos la próxima clase y va al show. **Audio** (publicado): 3 frases 이거 ___이에요/예요 con tus peluches o las mascotas de tu casa. **Prepara la S5:** **dibujar a tu familia** (3–4 personas; las mascotas también cuentan) [YA]: la ficha dice "foto o dibujo"; pedimos **dibujo** para cuidar la privacidad (Fase 1 §16.1) |
| Entregable del niño | Foto del dibujo del animal · audio de 3 frases |
| Evaluación | **Quiz-juego de la S3** (5'): bingo relámpago de palabras con 받침 o "¿cuál dije?" (강/간, 산/상). Indicadores. **Tablero:** logro 6 (pregunta y responde con un animal). **Chequeo de mitad [YA]** (Fase 1 §11.4; el kit de Abby lo deja "a confirmar con Jay"): **3 líneas a cada familia** (qué logró · qué practicar · un ánimo) con la nota de esta semana o el dom 15 nov (DECISIÓN DE JAY 4) |
| Explorador / Reto | **Explorador:** memorice con dibujos; responde con ayuda del gesto. **Reto:** memorice **solo con palabras**; hace la pregunta; explica el truco del gesto a su sala; cuenta el cuento del oso y el tigre en español con 3 palabras en coreano (곰, 호랑이, 사람) |
| 🇰🇷 Abby 역할 | 동물 소리·제스처 퀴즈 (멍멍, 야옹, 꿀꿀, 어흥) · "이거 뭐예요?" 모델 · 받침 제스처 교정 (주먹 = 받침 있음 → 이에요 / 손바닥 = 받침 없음 → 예요) · 도전반: 단어만 있는 메모리 게임 · 단군 이야기 한 줄 "곰이 사람이 됐어요!" (R, ⚑ D-22) |
| Para la familia | **이거 뭐예요?** *(igeo mwoyeyo?)* · ¿Qué es esto? — **호랑이예요!** *(horangiyeyo)* · ¡Es un tigre! |

### B.6 Semana 5 · lun 16 nov · Mi familia · 가족

| Campo | Semana 5 |
|---|---|
| Fecha | Lunes 16 de noviembre de 2026 · 18:00–19:00 (Chile) · martes 17, 06:00 en Corea |
| Tema | 엄마, 아빠, 할머니… presentar a la familia con un dibujo (publicado: "foto o dibujo"; en octubre, **dibujo** [YA]) |
| **Después de esta clase puedo decir/hacer…** | 1. **우리 가족이에요!** (mostrando mi dibujo)<br>2. **우리 엄마예요!** · **우리 아빠예요!** · **우리 강아지예요!** (señalando a cada uno)<br>3. Nombro a mi familia: **엄마, 아빠, 할머니, 할아버지, 동생** y, según quién soy, **언니/오빠** o **누나/형**<br>4. Entiendo **이 사람은 ___예요** cuando la profe lo dice de un personaje o de un amigo<br>*Reto:* **이분은 우리 할머니예요** (con respeto) · respondo **누구예요?** ("¿quién es?") sin mirar la tarjeta |
| Gramática / estrategia · carga: 1 patrón | • **우리 + familia** (publicado): 우리 엄마 = "mi mamá"; en coreano, para hablar de la familia se dice "nuestra"<br>• Se recicla **N이에요/예요** de la S4: 우리 엄마**예요** · 우리 형**이에요** (el mismo gesto de puño / mano abierta)<br>• **이 사람은 ___이에요/예요** (publicado) → **[YA]** para la propia familia se dice **우리 엄마예요!** señalando el dibujo; 이 사람은… queda para reconocer (Fase 1 §10.5: llamar "이 사람" a la propia mamá o a la abuela delante de la profe puede sonar poco respetuoso) ⚑ D-13<br>• **엄마 이름이 뭐예요?** (publicado): vale el nombre real, uno inventado o el de la mascota (강아지 이름이 뭐예요?) ⚑ D-24<br>• Ciclo: R = Abby presenta a su familia ⚑ D-29 · C = canto de la familia con gestos · G = presentar 2 personas del dibujo y el árbol gigante · L = ¡Tu turno!: presenta a quien quiera de su dibujo, incluida la mascota |
| Vocabulario | **Núcleo publicado (11):** 가족 · 엄마 · 아빠 · 할머니 · 할아버지 · 언니 · 오빠 · 누나 · 형 · 동생 · 사람 (anticipada en la S4)<br>**Fórmulas:** 우리 ___예요/이에요 · 엄마 이름이 뭐예요?<br>**Reconocimiento:** 이 사람은 ___예요 · 누구예요?<br>**[YA] (Y):** 이분은 우리 할머니예요 (Reto) · 이모 · 삼촌 (a pedido) |
| Expresiones | • Abby: 이 사람은 누구예요? (señalando el dibujo) — Niño: 우리 할머니예요!<br>• 강아지 이름이 뭐예요? — 초코예요!<br>• **Frases clave del coro:** 우리 가족이에요! / 우리 엄마예요! / 우리 강아지예요! |
| Foco de habilidad | Habla (presentar) · vocabulario |
| Pronunciación | 엄마 y 언니 (**ㅓ**: boca de bostezo) · 아빠 (ㅃ **de oído**, "p seca") · 할아버지 [하라버지] (imitar entera) · 형 (ㅕ + ng) · 우리 (ㄹ suave) |
| Cultura | **Publicado:** en Corea, a los amigos mayores también se les dice **언니, 오빠, 누나 o 형**, como si fueran de la familia; por eso se oye tanto en el K-pop y en los dramas. **Matiz [YA]:** "오빠 es el hermano mayor o un amigo mayor de una niña; los fans también se lo dicen a los cantantes" ⚑ D-23. **Frase ancla:** **우리 엄마예요!** **Puente** (Fase 1 §10.4): en Chile a los amigos de los papás les decimos "tía" o "tío"; en Corea se dice **이모** y **삼촌**. **Familias diversas:** vale cualquier familia (la abuela que cría, dos mamás, tíos, primos, mascotas); nadie tiene que explicar su familia ni mostrarla completa |
| Juegos, canción y cuento | • **Show & tell familiar** (publicado): cada niño muestra su **dibujo** y presenta a 2 personas con **우리 ___예요!**; Abby modela primero con su familia en Corea (foto o dibujo: lo decide ella, ⚑ D-29)<br>• **Árbol de familia gigante** (publicado): Jay comparte un árbol vacío en la pizarra y los niños dicen quién va en cada rama (할머니 arriba, 동생 abajo) mientras un voluntario lo escribe<br>• **Canto de la familia con gestos** (publicado; letra en B.12) a velocidad creciente; el último que se equivoca **elige** el siguiente canto (nadie sale)<br>• Orden de turnos con 가위바위보 |
| Recurso digital (exacto) | **Lector** → **Practicar → Palabras** (10 aciertos; di la palabra antes de elegir) + una ronda de repaso en **Alfabeto** (vocales y consonantes en voz alta) (publicado). Las 11 palabras de la familia tienen 🔊 en el cuaderno (todas con clip). **Dubu** → **Gwangjang 4-1 y 4-2** (커피 y "¿Cuál oíste?" 가/카/까): juego de oído, sin explicar las letras "con aire" (Fase 1 §14.2) |
| Tarea (prepara la clase siguiente) | **Misión 10' × 3 días:** Palabras · Alfabeto · Dubu. **Pieza ③ del cartel** (publicado): dibujar tu árbol de familia con los nombres en 한글 (mínimo 4; las mascotas también cuentan): va al show. **Audio** (publicado: "presentar a 3 personas con 이 사람은 우리 ___이에요/예요") → [YA] **presentar a 3 personas con 우리 ___예요!** señalando el dibujo. **Prepara la S6:** contar con los dedos cuántas personas (y mascotas) hay en tu dibujo y averiguar la edad de un hermano, primo o amigo menor de 16 (en cifras) |
| Entregable del niño | Foto del árbol (**sin fotos de personas pegadas**) · audio de 3 frases |
| Evaluación | **Quiz-juego de la S4** (5'): Abby hace un sonido — "¿qué es?" — 호랑이예요!; dibujo relámpago. Indicadores. **Tablero:** logro 7 (presenta a su familia) |
| Explorador / Reto | **Explorador:** 2 personas con 우리 ___예요! y el dibujo como apoyo. **Reto:** 3–4 personas + **이분은 우리 할머니예요** + responde 누구예요? sin tarjeta; **embajador del árbol** (escribe en la pizarra) |
| 🇰🇷 Abby 역할 | 가족 사진(또는 그림)으로 먼저 모델 (공개 범위는 선생님이 결정 ⚑ D-29) · 가족 노래 동작 리드 · 도전반: "이 사람은 누구예요?" 질문 · 호칭은 한국어 한 줄 + 제스처 (언니/누나, 오빠/형) · 발음: 엄마의 ㅓ, 아빠의 ㅃ · "이 사람"은 모델에서만 (⚑ D-13) |
| Para la familia | **우리 엄마예요!** *(uri eommayeyo)* · ¡Es mi mamá! (en coreano, "nuestra" mamá) |

### B.7 Semana 6 · lun 23 nov · Los números mágicos

| Campo | Semana 6 |
|---|---|
| Fecha | Lunes 23 de noviembre de 2026 · 18:00–19:00 (Chile) · martes 24, 06:00 en Corea |
| Tema | Contar del 1 al 10 + decir la edad: los números coreanos nativos con palmas, saltos y canto, y la pregunta más importante entre niños coreanos |
| **Después de esta clase puedo decir/hacer…** | 1. Cuento **하나, 둘, 셋, 넷, 다섯, 여섯, 일곱, 여덟, 아홉, 열!** (y todos, con la tarjeta [YA]: **열하나 … 열다섯**)<br>2. **몇 살이에요?** — **저는 열 살이에요.** / **아홉 살이에요.** / **열세 살이에요.**<br>3. Cuento la edad de un compañero: **마테오는 열 살이에요.**<br>4. Muestro con los dedos el número que dice la profe<br>*Reto:* digo la edad de un adulto de mi casa con la tarjeta "para curiosos" (**스물, 서른, 마흔, 쉰**) |
| Gramática / estrategia · carga: 1 paradigma + 1 patrón | • **Números nativos 하나–열** (publicado), los que se usan para contar cosas y decir la edad<br>• **___ 살이에요** (publicado) con las formas cortas **한, 두, 세, 네** antes de 살 ("pierden la cola": 하나 → 한 살); **[YA] tarjeta de edades hasta 15** (Fase 1 §4.9): 여덟 살 · 아홉 살 · 열 살 · 열한 살 · 열두 살 · **열세 살 · 열네 살 · 열다섯 살** (salen como 열 + 한/두/세/네/다섯, que ya conocen)<br>• **몇 살이에요?** (publicado), pregunta fija de la entrevista<br>• Ciclo: R = canto de los números con palmas · C = "Abby dice" con dedos · G = entrevista en salas · L = ¡Tu turno!: pregunta la edad a quien quiera (y a un profe: Jay y Abby responden con la tarjeta "para curiosos") |
| Vocabulario | **Núcleo publicado (12):** 하나 · 둘 · 셋 · 넷 · 다섯 · 여섯 · 일곱 · 여덟 · 아홉 · 열 · 살 · 생일<br>**Paradigma:** 한 · 두 · 세 · 네 (+ 살)<br>**Fórmulas:** 몇 살이에요? · 저는 ___ 살이에요 · 마테오는 열 살이에요<br>**[YA] (Y):** 열하나 · 열둘 · 열셋 · 열넷 · 열다섯 · tarjeta de edades (8 a 15)<br>**Reconocimiento:** 스물 · 서른 · 마흔 · 쉰 ("para curiosos") · 돌 · 돌잡이 · 가라사대 ⚑ D-14 |
| Expresiones | • 몇 살이에요? — 저는 열한 살이에요.<br>• Abby 가라사대: 셋! (tres dedos) · 일곱! (siete saltos)<br>• **Frases clave del coro:** 몇 살이에요? / 저는 열 살이에요. / 저는 열세 살이에요. |
| Foco de habilidad | Habla · escucha (números) |
| Pronunciación | **여덟 [여덜]** · 다섯 / 여섯 (ㅓ) · 셋 / 세 (la "cola" se cae antes de 살) · 열 (ㄹ final "l") · se imitan enteras: 몇 살 [멷쌀], 열두 살 [열뚜살], 열세 살 [열쎄살], 여덟 살 [여덜쌀] ⚑ D-17. Se deja pasar: números sino-coreanos con 살 (publicado) |
| Cultura | **Publicado:** en el primer cumpleaños de un bebé coreano, el **돌**, se hace el **돌잡이**: el bebé elige un objeto de una mesa (un lápiz, un hilo, dinero) que "predice" su futuro. **Matiz [YA]:** es un juego de la fiesta; hoy muchas familias suman objetos nuevos (un micrófono, un balón…) ⚑ D-19. **Espiral con la S5:** en Corea se pregunta la edad para saber cómo hablarle al otro (¿es mi 언니 o mi 동생?). *Reto:* desde junio de 2023, en Corea la edad oficial se cuenta igual que aquí (**만 나이**). **Frase ancla:** **몇 살이에요?** **Puente:** aquí el primer cumpleaños es con torta y piñata; en Corea, el 돌 y su 돌잡이 |
| Juegos, canción y cuento | • **Canto de los números** (publicado; B.12): una palma por número y un salto en 열; al revés (열, 아홉, 여덟…); al final solo con gestos, sin voz<br>• **"Jay dice / Abby dice"** (publicado; en Corea se juega como **가라사대**): 셋! → tres dedos; 일곱! → siete saltos. **[YA] sin eliminación** (Fase 1 §16.1): la ficha dice "quien se equivoca se sienta y cuenta en coreano a los que siguen"; en octubre, **quien se equivoca pasa a ser el juez** (cuenta en voz alta los saltos de los demás) y vuelve a jugar en la ronda siguiente<br>• **Entrevista en salas** (publicado): en pares, 몇 살이에요? — 저는 아홉 살이에요; luego cada uno cuenta la edad de su compañero al grupo (마테오는 열 살이에요)<br>• **Tarjeta de edades** (8 a 15, con dibujo de velas): cada uno encuentra la suya |
| Recurso digital (exacto) | **Explorador:** Lector → **Aprender 7** "Dos maneras de contar" → **el explorador**: con − y + ir del 1 al 15 y tocar 🔊 **solo en la tarjeta "Nativo 고유어"** (la otra, "sino-coreano", es para más adelante). **Reto:** Lector → **Practicar → Números** (publicado: "ronda de números nativos"): el Lector empieza siempre por los **sino-coreanos**; **tocar "Números" hasta que el encabezado diga "nativos"** (cada toque avanza una ronda) y hacer esa ronda. **⚡ Contrarreloj** (publicado): **solo como extra del Reto** — sus respuestas vienen en letras latinas (sección D). **Dubu** → **Gwangjang 4-3 a 4-5** (꽃, 빵, 피자). Los números del 1 al 15 tienen 🔊 en el cuaderno (todos con clip) |
| Tarea (prepara la clase siguiente) | **Misión 10' × 3 días:** explorador o Números · Dubu. **Audio** (publicado): contar en coreano 10 objetos de tu casa (lápices, cucharas, peluches) hasta 열. **Entrevista** (publicado: "preguntar la edad a 2 personas de tu familia") **[YA]:** a 2 personas **de 15 o menos** (hermanos, primos, amigos) o a una mascota; si pregunta a un adulto, anota la edad en cifras y, si quiere, la busca en la tarjeta "para curiosos". **Prepara la S7:** mirar qué hay en la cocina: ¿algo coreano? (ramen, algas, kimchi…) y **dibujar tu comida favorita** (coreana o no) |
| Entregable del niño | Audio de 10 objetos · la hoja de la entrevista (foto) |
| Evaluación | **Quiz-juego de la S5** (5'): árbol relámpago — Abby dice 할머니, los niños señalan la rama; 우리 ___예요 en cadena. Indicadores. **Tablero:** logro 8 (cuenta hasta 열 y dice su edad) |
| Explorador / Reto | **Explorador:** 1–10 + su propia edad (de 여덟 a 열한). **Reto:** 1–15 + 열세 / 열네 / 열다섯 살 + tarjeta "para curiosos" · **juez** del "Abby dice" · pregunta la edad a Jay y a Abby |
| 🇰🇷 Abby 역할 | 숫자 노래·박수 리드 (음소거 → 한 명씩) · "Abby 가라사대" 진행: **틀린 사람은 심판이 돼요 (탈락 없음)** · 나이 발음 모델 (여덟 살, 열두 살, 열세 살…) · 돌잡이 이야기 한두 문장 + 사진 (⚑ D-29) · 도전반: 열하나–열다섯 |
| Para la familia | **몇 살이에요?** *(myeot sarieyo?)* · ¿Cuántos años tienes? — **저는 열 살이에요.** *(jeoneun yeol sarieyo)* · Tengo 10 años |

### B.8 Semana 7 · lun 30 nov · ¡Ñam! Comida coreana

| Campo | Semana 7 |
|---|---|
| Fecha | Lunes 30 de noviembre de 2026 · 18:00–19:00 (Chile) · martes 1 de diciembre, 06:00 en Corea · **primer ensayo del show + invitación a las familias** |
| Tema | 김밥, 라면, 불고기 + "me gusta" (좋아해요): platos coreanos, lo que me gusta y lo que no, y el guion del show |
| **Después de esta clase puedo decir/hacer…** | 1. **뭐 좋아해요?** — **저는 김밥 좋아해요!**<br>2. **김치 안 좋아해요.** (y está bien que no me guste)<br>3. Reacciono en la mesa: **맛있어요!** · **매워요!**<br>4. Nombro 10 comidas: **김밥, 라면, 불고기, 떡볶이, 김치, 밥, 사과, 바나나, 딸기, 주스**<br>5. Digo mi guion del show de principio a fin con mi cartel<br>*Reto:* 2 gustos (**저는 호랑이 좋아해요. 저는 떡볶이 좋아해요!**) + una pregunta a otro niño (**뭐 좋아해요?**) |
| Gramática / estrategia · carga: 1 patrón | • **N + 좋아해요** (publicado): 김밥 좋아해요; la partícula 을/를 solo se escucha en el modelo, no se explica<br>• **안 좋아해요** (publicado), "la negación más útil del curso"<br>• **뭐 좋아해요?** y las respuestas de mesa **맛있어요 / 매워요** (publicado)<br>• Se recicla 네 / 아니요 (S1): **네, 좋아해요 / 아니요, 안 좋아해요**<br>• Ciclo: R = Abby cuenta qué comió hoy en Corea · C = encuesta relámpago en coro · G = menú de dibujos y guion · L = ¡Tu turno!: le pregunta 뭐 좋아해요? a quien quiera (también a un profe) |
| Vocabulario | **Núcleo publicado (12):** 김밥 · 라면 · 불고기 · 떡볶이 · 김치 · 밥 · 사과 · 바나나 · 딸기 · 주스 · 맛있어요 · 매워요<br>**Fórmulas:** 저는 ___ 좋아해요 · 안 좋아해요 · 뭐 좋아해요? · 네, 좋아해요 · 아니요, 안 좋아해요<br>**Cultura (R):** 김장 (publicado) |
| Expresiones | • Abby: 김치 좋아해요? — 👍 네, 좋아해요! / 👎 아니요, 안 좋아해요.<br>• Jay (foto que se destapa): 뭐예요? — 떡볶이예요! (recicla la S4)<br>• **Frases clave del coro:** 뭐 좋아해요? / 저는 김밥 좋아해요. 맛있어요! / 김치 안 좋아해요. 매워요! |
| Foco de habilidad | Habla (gustos) · integración (ensayo del show) |
| Pronunciación | **맛있어요 [마시써요]** · **떡볶이 [떡뽀끼]** (tensas de oído) · **좋아해요 [조아해요]** (la ㅎ casi no suena; se imita entera) · 김밥 [김밥] o [김빱] (las dos valen) · 매워요 (ㅐ suena "e") ⚑ D-17, D-30 |
| Cultura | **Publicado:** el 김치 se come en muchas comidas coreanas, y en noviembre las familias se juntan para el **김장** (preparar el kimchi de todo el invierno), que la UNESCO reconoce como patrimonio. **Matiz [YA]** (Fase 1 §10.5): "En muchas casas hay kimchi todos los días; **a algunos niños no les gusta el picante**: 김치 안 좋아해요" · el 김장 **cambia según la región**: antes en el norte y en el interior, más tarde en el sur (verificado, Fase 1 §10.6). Esta clase cae justo en la temporada del 김장. **Frase ancla:** **김치 안 좋아해요.** (decir que no te gusta algo también es hablar coreano). **Puente:** como cuando la familia se junta a hacer empanadas o humitas para una fiesta |
| Juegos, canción y cuento | • **Menú de dibujos** (publicado): cada niño muestra su plato favorito dibujado (tarea de la S6) y lo presenta: 저는 떡볶이 좋아해요. 맛있어요!; Abby cuenta qué comió hoy en Corea (R) ⚑ D-29<br>• **Encuesta relámpago** (publicado): Abby pregunta 김치 좋아해요? y los niños responden con pulgar arriba o abajo más la frase completa; Jay arma el ranking del grupo en la pizarra (el ranking es de las comidas, no de los niños)<br>• **Adivina la comida** (publicado): Jay destapa una foto de a poco; quien la nombra primero pregunta 뭐 좋아해요? al siguiente — **y todos los que la dijeron bien reciben sticker**<br>• **Primer ensayo del show** (publicado: "ensaya el show desde la clase 7"): los últimos 8 minutos de la sala; cada uno dice su guion con el cartel; se reparten los roles (F.5) |
| Recurso digital (exacto) | **Lector** → **Practicar → Pictogramas** (el primer grupo, "comida y objetos", trae 바나나, 라면, 밥, 사과, 딸기, 우유…) y **Practicar → Palabras** (10 aciertos) (publicado). **⚡ Contrarreloj** (publicado: "mejorar tu tiempo"): **solo como extra del Reto** (sección D). **Dubu** → **Río Han 5-1 a 5-5** (사과, 우산, "¿Cuál oíste?", 안녕, 학교: solo oído) |
| Tarea (prepara la clase siguiente) | **Misión 10' × 3 días:** Pictogramas · Palabras · Dubu. **Pieza ④ del cartel:** tu comida favorita dibujada con su nombre en 한글 → **el cartel queda completo** (nombre + animal + familia + comida). **Ensayo** (publicado: "enviar un primer video de prueba"): **video por privado a Jay** (+56 9 4211 5562) o **solo audio** al grupo [YA]. **Audio o video** (publicado): probar una comida coreana (o mostrar una foto de una) y decir 맛있어요 o 매워요. **Prepara la S8:** cartel listo, el guion practicado 3 veces y la familia invitada (texto en F.6) |
| Entregable del niño | Video o audio del ensayo · foto del cartel completo (**sin cara**) |
| Evaluación | **Quiz-juego de la S6** (5'): "Abby dice" con dedos (sin eliminación) y cadena de 몇 살이에요?. Indicadores. **Tablero:** logro 9 (dice qué le gusta y qué no). Entrega de la **consigna del show** y del rol de cada niño (F.1, F.5). **Invitación a las familias** (publicado: una semana antes): se envía hoy después de la clase (F.6) |
| Explorador / Reto | **Explorador:** 좋아해요 / 안 좋아해요 + 맛있어요; guion Explorador (6 líneas, F.4). **Reto:** 2 gustos + pregunta a otro niño; lee su guion en 한글; **presentadores** del show (F.5) |
| 🇰🇷 Abby 역할 | 오늘 아침에 먹은 음식 한국어로 짧게 (R: "오늘 아침에 김밥 먹었어요!" ⚑ D-29) · "김치 좋아해요?" 설문 진행 · 김장 이야기 한두 문장 (지역마다 달라요) · 도전반 발표회 리허설 · 역할 정하기 (사회자, DJ, 손하트 대장…) |
| Para la familia | **저는 김밥 좋아해요!** *(jeoneun gimbap joahaeyo)* · ¡Me gusta el kimbap! + la invitación al show del lunes 7 de diciembre |

### B.9 Semana 8 · lun 7 dic · 🎤 Show final + certificado

| Campo | Semana 8 |
|---|---|
| Fecha | Lunes 7 de diciembre de 2026 · 18:00–19:00 (Chile) · martes 8, 06:00 en Corea · **las familias entran a Zoom** (publicado) |
| Tema | Mini-presentación en coreano para las familias + certificado |
| **Después de esta clase puedo decir/hacer…** | 1. Me presento ante mi familia: **Explorador 30–40 s · Reto 40–60 s + una pregunta a otro niño** (F)<br>2. Leo en voz alta **5 palabras al azar** del curso en 한글<br>3. Entiendo 5 preguntas con dibujos (señalo el animal, la comida o el número que dice el profe)<br>4. Animo como público: **박수! 잘했어요! 축하해요! 화이팅!**<br>5. Cierro con **감사합니다!** y **안녕히 계세요!**, con reverencia, y un **손하트** |
| Gramática / estrategia · carga: 0 | Integración del guion (publicado): 안녕하세요 → 저는 ___이에요/예요 → ___ 살이에요 → 우리 ___예요 [YA] → 저는 ___ 좋아해요 → 감사합니다. Fórmulas de cierre: 감사합니다 · 안녕히 계세요 con reverencia (publicado) |
| Vocabulario | **Núcleo publicado (8):** 박수 · 잘했어요 (↺ S1) · 축하해요 · 수료증 · 시작 · 끝 · 화이팅 · 사랑해요<br>**Cultura (R):** 손하트<br>**[YA] (Y):** 우리 반 발표회 (título del show) ⚑ D-15 |
| Expresiones | • Guardián del tiempo: **시작!** / **끝!** (con tarjetas)<br>• Público: **박수!** 👏 · **잘했어요!** · **화이팅!**<br>• Certificado: Abby: **소피아, 축하해요!** — **감사합니다!**<br>• Foto: 하나, 둘, 셋 — **사랑해요!** (손하트)<br>• **Frases clave del coro:** 잘했어요! / 축하해요! / 화이팅! |
| Foco de habilidad | Habla (presentación) · lectura (5 palabras) · escucha (5 preguntas) |
| Pronunciación | Solo **una última corrección suave** por niño en el ensayo general (publicado); en el show, **ninguna corrección** delante de la familia |
| Cultura | **Publicado:** "el 손하트 nació en Corea" → **matiz [YA]**: "se hizo famoso en el mundo gracias a Corea: ídolos y deportistas de muchos países lo hacen" ⚑ D-28. **Foto grupal [YA]:** **de manos** haciendo el 손하트, sin caras (Fase 1 §16.1). **Frase ancla:** **축하해요!** |
| Juegos, canción y cuento | • **Ensayo general en salas** (publicado: "primeros 15 minutos, antes de que entren las familias") **+ [YA] lectura de 5 palabras y 5 preguntas con dibujos en la sala**, antes de que entren las familias (Fase 1 §16.1: así el show dura lo que el curso promete y nadie es "evaluado" delante de los adultos; **requiere aviso escrito a los apoderados antes de la S7**, DECISIÓN DE JAY 2, F.5)<br>• **Show con las familias** (publicado): cada niño presenta con su cartel; los demás aplauden con 박수 y gritan 잘했어요<br>• **Ceremonia** (publicado): certificado en pantalla uno por uno con 축하해요 **[regla del certificado: pendiente de decisión de Jay]**; foto **de manos** con 손하트; despedida con 안녕히 계세요 y el canto del saludo |
| Recurso digital (exacto) | **Lector** → **Progreso**: captura del avance (vocales, consonantes, sílabas, palabras) para el portafolio del niño (publicado). **Dubu** para las vacaciones → **Estación de Seúl 6-1 a 6-5** (친구, 김치, 강아지, 선생님: palabras del curso) |
| Tarea (después del show) | (publicado) Captura de **Progreso** · **enseñar a alguien de la familia** a decir 안녕하세요 y 감사합니다 y a leer su nombre en 한글 · *Opcional:* el video del show **"para el álbum de la academia (solo con permiso escrito)"** → **[YA · DECISIÓN DE JAY 13 de la Fase 1]** el "álbum" es **solo la carpeta privada del curso**; nada va a redes. Vacaciones: Dubu hasta la Estación de Seúl |
| Entregable del niño | El show (en vivo, o con un video si ese día no puede: F.5) · captura de Progreso |
| Evaluación | Show en 3 partes (publicado; [YA] partes 2 y 3 en la sala) con la rúbrica de F.7 · últimos indicadores · **tablero:** logro 10 (show) · certificado **[regla del certificado: pendiente de decisión de Jay]** · nota final de 3 líneas a la familia (E.6) |
| Explorador / Reto | **Explorador:** guion de 6 líneas con el cartel (30–40 s). **Reto:** guion de 8 líneas + pregunta a otro niño (40–60 s); **presentadores**, **guardián del tiempo**, **capitán del 손하트** |
| 🇰🇷 Abby 역할 | 발표회 사회 (한국어 인사, Jay가 스페인어로 통역) · 소그룹 방(도전반)에서 단어 5개 읽기 + 그림 질문 5개 진행 (가족 입장 전) · 수료증: "○○, 축하해요!" · 마지막 노래 · 손하트 사진 "하나, 둘, 셋!" |
| Para la familia | **감사합니다!** *(gamsahamnida)* · ¡Gracias! — **축하해요!** *(chukahaeyo)* · ¡Felicitaciones! |

### B.10 Carga cognitiva y continuidad

| S | Patrón nuevo (tope: 1) | Letras y lectura | No cuentan (fórmula · reconocimiento · léxico) | Recicla |
|---|---|---|---|---|
| 1 | 0 (fórmulas de saludo) | 6 vocales + ㅇ muda | 안녕하세요, 감사합니다… (F) · lenguaje de clase (R) · 아이, 오이 (A) | — |
| 2 | 1 (저는 ___이에요/예요, con la frase ya escrita) | 10 consonantes + C+V | 이름이 뭐예요? (F) · 가위바위보 (Y) · 한글날, 세종대왕 (R) | Vocales (S1) · 아이, 오이 (S1) |
| 3 | 0 orales (1 estrategia de lectura: bloque + 받침) | 받침 ㄴ ㅁ ㅇ ㄹ · la ㅇ con dos caras | 받침 (T) · 첫눈 (R) | Fórmulas S1–S2 en la sala · vocales y consonantes |
| 4 | 1 (N이에요/예요 + 이거 뭐예요?) | Palabras de 2–3 sílabas con dibujo | Onomatopeyas, 어흥, 호돌이 (R/Y) · 사람 (A) | 받침 (S3) = el puño del gesto · 물 (S3) → 물고기 |
| 5 | 1 (우리 + familia) | Etiquetas del árbol | 이 사람은… y 누구예요? (R) · 이분은… (Y, Reto) · 이모/삼촌 (Y) | N이에요/예요 (S4) · 이름이 뭐예요? (S2) → 엄마 이름이 뭐예요? · 강아지 (S4) → 우리 강아지예요 |
| 6 | 1 paradigma + 1 patrón (nativos + 살) | Números en 한글 (explorador) | 열하나–열다섯 y la tarjeta de edades (Y) · "para curiosos" (R) · 돌, 돌잡이, 가라사대 (R) | 네/아니요 · "Abby dice" (S2) · 동생/언니 (S5): ¿quién es mayor? |
| 7 | 1 (N 좋아해요 / 안 좋아해요) | Nombres de comidas | 맛있어요, 매워요 (N, fórmulas de mesa) · 김장 (R) | 네/아니요 (S1) · 이거 뭐예요? (S4) · 김 (S3) → 김밥 · 고기 (Dubu) → 불고기 |
| 8 | 0 | 5 palabras al azar | 시작, 끝, 박수… (N, fórmulas) · 손하트 (R) | Todo el curso |

Criterio de conteo (Fase 1 §4.1, adaptado): cuenta lo que se practica para decirlo con partes que cambian (저는 **___**예요, **___** 살이에요, **___** 좋아해요); no cuentan las fórmulas enteras, lo que solo se reconoce ni el léxico. **Ninguna clase pasa de un patrón nuevo**, sin cambiar nada publicado. Las dos semanas pesadas son de **letras**, no de frases: la **S2** (10 consonantes en una clase) se alivia con la tarjeta de nombre ya escrita, la fábrica con una sola vocal (ㅏ) para Explorador y el Lector → Consonantes, que trae exactamente esas 10; la **S3** no suma nada oral.

**Continuidad (nada se usa antes de enseñarse):**

| Pieza | Se enseña | Se usa antes como… | Se recicla en |
|---|---|---|---|
| 안녕하세요 · 감사합니다 · 안녕히 계세요 | S1 | — | Todas las clases (bienvenida y cierre) · S8 |
| 네 / 아니요 | S1 | — | Pase de lista · S7 (네, 좋아해요 / 아니요, 안 좋아해요) |
| Vocales | S1 | — | S2 (sílabas) · S3 (fábrica) |
| Consonantes | S2 | Nombres (S2, en la tarjeta) | S3 · S4–S7 (etiquetas) |
| 저는 ___이에요/예요 | S2 (fórmula) | — | S6 (저는 열 살이에요) · S7 (저는 ___ 좋아해요) · S8 |
| 받침 | S3 (leer) | — | S4 (el puño del gesto = "termina en 받침") |
| N이에요/예요 | S4 | S2, dentro de 저는 ___예요 | S5 (우리 엄마예요) · S7 (떡볶이예요!) · S8 |
| 사람 | S5 | S4 (A, en el cuento) | S5 |
| 우리 | S5 | — | S8 (우리 반 발표회) |
| Números nativos | S6 | 하나, 둘, 셋 como señal desde la S1 (R) | S7 (foto: 하나, 둘, 셋!) · S8 |
| 좋아해요 | S7 | — | S8 (Reto: 저는 호랑이 좋아해요) |
| 잘했어요 | S8 (lo dicen los niños) | R desde la S1 (lo dicen los profes) | — |
| 가위바위보 | S2 | — | Todas las salas desde la S2 |
| 김 · 고기 · 물 | S3 · Dubu 2-1 · S3 | — | 김밥, 김치 (S7) · 불고기 (S7), 물고기 (S4) |

### B.11 "¡Tu turno!" (L · 2 minutos al final de la sala, sin guion)

La versión para niños del minuto libre de Básico 1 y 2: cada niño **elige** qué decir (y a quién). Nadie lo corrige mientras habla; el profe repite bien la frase después, con una sonrisa. Es el ensayo, semana a semana, del show.

| S | "¡Tu turno!" (Explorador) | "¡Tu turno!" (Reto) |
|---|---|---|
| 1 | Saluda a quien quieras: 안녕하세요 a un profe o 안녕 a un compañero | Lo mismo + lee una vocal que elijas del cartón |
| 2 | Pregunta 이름이 뭐예요? a quien quieras | Presenta a tu muñeco o mascota con un nombre inventado: 저는 ___예요 (hablando por él) |
| 3 | Lee una palabra; los demás la actúan | Lee una palabra de 2 sílabas y desafía a otro con otra |
| 4 | Muestra un objeto o peluche: 이거 뭐예요? | Pregunta 이거 뭐예요? de un objeto que nadie conoce en coreano; el profe da la palabra |
| 5 | Presenta a quien quieras de tu dibujo: 우리 ___예요! | 이분은… o 우리… con 3 personas + 누구예요? a otro |
| 6 | 몇 살이에요? a quien quieras | 몇 살이에요? a un profe (responde con la tarjeta "para curiosos") |
| 7 | 뭐 좋아해요? a quien quieras | 뭐 좋아해요? + reacciona: 맛있어요! / 저도요! (R, lo modela el profe) |
| 8 | No aplica: el show es el "¡Tu turno!" largo | — |

### B.12 Canciones, cantos y cuentos (originales · letras ⚑ para Abby)

**Reglas:** letras **originales** de Academia Seúl; melodías **tradicionales de dominio público** o sin melodía (canto rítmico con palmas). **Nunca** letras, pistas ni audio de K-pop ni de canciones con autor. En Zoom se canta **con el micrófono apagado junto a Abby** y después **solistas por turno** (el desfase de Zoom hace imposible el coro abierto). Las letras van en el cuaderno con 한글 grande y traducción; **sin romanización** (D). Abby graba cada canto una vez (audio de 20–30 s, solo su voz) para la nota a la familia (G.2).

| Canto | Semanas | Letra (propuesta ⚑ D-2, D-25, D-26) | Traducción | Cómo se usa |
|---|---|---|---|---|
| **안녕 노래** (canción del saludo) · melodía tradicional de "Martinillo" (*Frère Jacques*) | Todas (bienvenida) | 안녕 친구, 안녕 친구, / 반가워! 반가워! / 꾸벅 인사해요, 꾸벅 인사해요, / 짝짝짝! 짝짝짝! → (hablado, a los profes, con reverencia) **안녕하세요!** | Hola, amigo (×2) / ¡Qué gusto verte! (×2) / Saludamos con una reverencia (×2) / ¡Clap, clap, clap! (×2) | 반가워 y 안녕 van **entre amigos** (es la canción de los niños); el 안녕하세요 final es para los profes. Cuenta de sílabas: 4 · 4 · 3 · 3 · 6 · 6 · 3 · 3, como la melodía |
| **Canto de la despedida** (llamada y respuesta, sin melodía) | Todas (cierre) | Abby: 오늘도 잘했어요! — Niños: **감사합니다!** (reverencia) · **안녕히 계세요!** — Profes: 안녕! 다음 주에 만나요! | ¡Hoy también lo hicieron muy bien! — ¡Gracias! · ¡Adiós! — ¡Chao! ¡Nos vemos la próxima semana! | ⚑ D-4 |
| **Ronda de nombres** (palmas) | S2 | Abby: 이름이 뭐예요? — Niño: 저는 ___예요! — Todos: **안녕, ___!** 👏👏 | ¿Cómo te llamas? — ¡Yo soy ___! — ¡Hola, ___! | En cadena; el orden sale con 가위바위보 |
| **La fábrica** (rap de palmas) | S3 | Jay: ㄱ 공장, 시작! — Todos: **가 거 고 구 그 기!** · ㄴ: **나 너 노 누 느 니!** · ㅁ: **마 머 모 무 므 미!** | ¡La fábrica de ㄱ abre! | Una palma por sílaba. 공장 ("fábrica") y 시작 solo los dice Jay (R; 시작 es núcleo de la S8) |
| **El eco de los animales** | S4 | Abby: 멍멍! — **강아지예요!** · 야옹! — **고양이예요!** · 꿀꿀! — **돼지예요!** · 어흥! — **호랑이예요!** | ¡Guau! — ¡Es un perrito!… | Primero en coro, después cada niño responde uno |
| **El canto de la familia** (con gestos) | S5 | 엄마, 아빠, 👏👏 / 할머니, 할아버지, 👏👏 / 언니, 오빠, 누나, 형, 👏👏 / 동생, 동생, 우리 동생! / 우리 가족, **사랑해요!** | Mamá, papá / abuela, abuelo / hermanas y hermanos mayores / hermanito, hermanito / ¡Mi familia, te quiero! | **Cada sala inventa el gesto de cada palabra** (así no hay estereotipos de "mamá cocina, papá fuerte"). 사랑해요 es anticipo de la S8 (A) |
| **El canto de los números** (palmas y salto; publicado) | S6 (y S8) | **하나, 둘, 셋, 넷, 다섯!** 👏 / **여섯, 일곱, 여덟, 아홉, 열!** (salto) / *Reto:* **열하나, 열둘, 열셋, 열넷, 열다섯!** / Abby: 몇 살이에요? — Niño: 저는 ___ 살이에요! | 1 al 5 / 6 al 10 / 11 al 15 / ¿Cuántos años tienes? | Al derecho, al revés y solo con gestos (publicado) |
| **El canto de la mesa** | S7 | Abby: 김밥! — **맛있어요!** · 떡볶이! — **매워요!** · 김치! — (cada uno dice la suya) **맛있어요!** o **안 좋아해요!** | ¡Kimbap! — ¡Rico!… | Nadie tiene que decir que algo le gusta |
| **La foto final** | S8 | 하나, 둘, 셋 — **사랑해요!** (손하트) | 1, 2, 3 — ¡Los queremos! | Cámaras enfocando **las manos** |

**Cuentos cortos (2 minutos, Jay con 3–4 láminas; Abby dice la frase en coreano):**

| S | Cuento | La frase que dice Abby | Fuente y cuidado |
|---|---|---|---|
| 1 | "El cielo, la tierra y la persona": cómo se dibujaron las vocales | 하늘, 땅, 사람! (R) | Lector → Aprender 2 · ⚑ D-8 |
| 2 | "El rey que quería que todos leyeran" (Sejong, 1443 · 1446) | 세종대왕이 한글을 만들었어요. (R) | Blog `/blog/hangul-el-alfabeto-mas-cientifico` para las familias · ⚑ D-7 |
| 3 | "Las letras que viven en cajitas" y "aprender en una mañana" | 한글은 쉬워요! (R) | Cita del libro antiguo (훈민정음 해례본) · ⚑ D-9 |
| 4 | "El oso y el tigre que querían ser personas" (mito de 단군) | 곰이 사람이 됐어요! (R) | Blog `/blog/dangun-por-que-corea-nacio-de-una-osa` · versión para niños sin detalles que asusten · ⚑ D-22 |
| 5 | "Hermanos que no son hermanos" (언니, 오빠 entre amigos) | 우리 지수 언니예요! (R) ⚑ | Abby, con su propia experiencia ⚑ D-29 |
| 6 | "¿Qué eligió el bebé?" (돌잡이) | 뭘 잡았어요? (R) ⚑ | Foto propia o dibujo ⚑ D-19, D-29 |
| 7 | "La gran fiesta del repollo" (김장) | 김장해요! 같이 김치를 만들어요. (R) ⚑ | Matiz regional (Fase 1 §10.6) |
| 8 | "Un corazón con dos dedos" (손하트) | 손하트! 사랑해요! | Matiz ⚑ D-28 |

### B.13 🇰🇷 El bloque "Abby를 위한 요약" (formato fijo para las 8 guías)

Va en cada guía **entre la sección B (plan minuto a minuto) y la C**, **en coreano**, en 해요체, en una página como máximo. Abby lo lee la noche anterior (en Corea, el lunes en la noche). Estructura fija:

1. **이번 주 한눈에** — 주제, 날짜 (한국 시간 + 칠레 시간), 아이들이 말할 문장 3개 (= frases clave).
2. **선생님의 60분** — tabla: 시간 (KST / 칠레) · 블록 · 선생님이 하는 일 · 선생님이 하는 말 (las frases exactas en coreano).
3. **소그룹 방 (도전반 12–15세)** — las dos actividades de la sala, la versión Reto, el rol de estatus de la semana y el "¡Tu turno!" (○○ 차례예요!).
4. **준비물** — láminas que Jay comparte, campanita, letra del canto, tarjetas, fotos propias (si ella quiere compartirlas).
5. **꼭 지켜 주세요** — qué corregir y qué dejar pasar; **탈락 없는 게임** (quien se equivoca es juez); **거울 효과** (el espejo de Zoom); **아이 얼굴 사진·영상 금지**; **어른 한 명과 아이 한 명만 방에 남지 않기**; nada de romanización ni de canciones con derechos.
6. **수업 후** — nota de voz de 10 s con la frase de la semana para el grupo de apoderados (B.15) · comentario de voz a las tareas de los niños **de su sala** (máximo 6, 1 minuto cada uno) · una línea a Jay (다 좋았어요 / ○○ 결석 / ○○ 도움 필요).

**Ejemplo para los redactores (S1, extracto):**

> **이번 주 한눈에** · 1회차 "안녕, 한국!" · 10월 20일(화) 06:00 (칠레 19일(월) 18:00) · 아이들이 말할 문장: 안녕하세요! / 감사합니다! / 안녕히 계세요!
> **선생님의 60분** (일부) · 06:00–06:05 인사 노래 리드: "친구들, 안녕하세요!" → 다 같이 음소거로 노래 → 두세 명 솔로 · 06:05–06:15 "한국어 단어 알아요?" — Jay가 스페인어로 진행, 선생님은 아이들이 말한 단어를 한국어로 다시 말해 주세요 · 06:25–06:35 모음 몸 게임: "따라 하세요: 아!" (입 모양을 크게) …
> **꼭 지켜 주세요** · 첫 수업이라 보호자가 옆에 있어요. 모음 ㅓ/ㅗ, ㅡ는 꼭 교정하고, 이에요/예요 실수는 넘어가요. 아이가 보여 주는 종이는 자기 화면에서 좌우가 바뀌어 보인다고 알려 주세요 (Jay가 스페인어로 설명해요).

### B.14 Las 3 frases clave (Audioteca A2 · 24 frases)

Se dicen en coro al cierre (micrófono apagado con Abby → 2–3 solistas). **Diferencia con los cursos de adultos [YA]:** en Niños el clip de referencia **no se recorta del coro de la grabación** (son voces de menores): se usa el clip SunHi del sitio y, si Abby quiere, una nota de voz suya de 10 s para el grupo de apoderados (B.15). Las frases que son listas de palabras usan los clips de cada palabra.

| S | Frase 1 | Frase 2 | Frase 3 |
|---|---|---|---|
| 1 | 안녕하세요! [🔊](https://www.academiaseul.com/audio/kr/ec9588eb8595ed9598ec84b8ec9a94.mp3) | 감사합니다! [🔊](https://www.academiaseul.com/audio/kr/eab090ec82aced95a9eb8b88eb8ba4.mp3) | 안녕히 계세요! [🔊](https://www.academiaseul.com/audio/kr/ec9588eb8595ed9e8820eab384ec84b8ec9a94.mp3) |
| 2 | 이름이 뭐예요? (clip pendiente) | 저는 소피아예요. (clip pendiente) | 나무, 바다, 나비! [🔊 나무](https://www.academiaseul.com/audio/kr/eb8298ebacb4.mp3) [🔊 바다](https://www.academiaseul.com/audio/kr/ebb094eb8ba4.mp3) (나비: pendiente) |
| 3 | 가, 거, 고, 구, 그, 기! [🔊 가](https://www.academiaseul.com/audio/kr/eab080.mp3) [🔊 거](https://www.academiaseul.com/audio/kr/eab1b0.mp3) [🔊 고](https://www.academiaseul.com/audio/kr/eab3a0.mp3) [🔊 구](https://www.academiaseul.com/audio/kr/eab5ac.mp3) [🔊 그](https://www.academiaseul.com/audio/kr/eab7b8.mp3) [🔊 기](https://www.academiaseul.com/audio/kr/eab8b0.mp3) | 문, 산, 손, 발! [🔊 문](https://www.academiaseul.com/audio/kr/ebacb8.mp3) [🔊 산](https://www.academiaseul.com/audio/kr/ec82b0.mp3) [🔊 손](https://www.academiaseul.com/audio/kr/ec8690.mp3) (발: pendiente) | 강, 방, 가방! [🔊 강](https://www.academiaseul.com/audio/kr/eab095.mp3) [🔊 방](https://www.academiaseul.com/audio/kr/ebb0a9.mp3) [🔊 가방](https://www.academiaseul.com/audio/kr/eab080ebb0a9.mp3) |
| 4 | 이거 뭐예요? (clip pendiente) | 호랑이예요! (clip pendiente) | 곰이에요! (clip pendiente) |
| 5 | 우리 가족이에요! (clip pendiente) | 우리 엄마예요! [🔊](https://www.academiaseul.com/audio/kr/ec9ab0eba6ac20ec9784eba788ec9888ec9a94.mp3) | 우리 강아지예요! (clip pendiente) |
| 6 | 몇 살이에요? [🔊](https://www.academiaseul.com/audio/kr/ebaa8720ec82b4ec9db4ec9790ec9a943f.mp3) | 저는 열 살이에요. (clip pendiente) | 저는 열세 살이에요. (clip pendiente) |
| 7 | 뭐 좋아해요? (clip pendiente) | 저는 김밥 좋아해요. 맛있어요! (저는 김밥 좋아해요: pendiente) (맛있어요: pendiente) | 김치 안 좋아해요. 매워요! (김치 안 좋아해요: pendiente) (매워요: pendiente) |
| 8 | 잘했어요! [🔊](https://www.academiaseul.com/audio/kr/ec9e98ed9688ec96b4ec9a94.mp3) | 축하해요! [🔊](https://www.academiaseul.com/audio/kr/ecb695ed9598ed95b4ec9a94.mp3) | 화이팅! [🔊](https://www.academiaseul.com/audio/kr/ed9994ec9db4ed8c85.mp3) |

Clips pendientes de esta tabla: 15 (todos en la lista de G.4). Hasta que existan, la guía de cada semana usa la nota de voz de Abby.

### B.15 "Para la familia": la nota semanal y la frase de la semana

**Lo publicado:** dentro de las 24 horas después de la clase, la familia recibe por WhatsApp **una nota de 3 líneas como máximo**: qué aprendimos, qué repasar en el Lector con la pestaña exacta y una frase para practicar en casa. Es "el principal factor de retención y de que la tarea llegue" (nota publicada). El kit de Abby dice que el envío se reparte entre los dos.

**Reparto [YA] (DECISIÓN DE JAY 6):** **Jay** manda la nota escrita (en español: las familias no leen coreano) el lunes en la noche o el martes en la mañana (Chile); **Abby** manda, a continuación, una **nota de voz de 10 segundos** con la frase de la semana dicha despacio dos veces (su voz nativa es el mejor modelo, y en Corea es martes por la mañana, justo después de la clase). Cada profe comenta las tareas **de su sala**.

**Plantilla de la nota (lista para pegar; la guía de cada semana la trae completa, sección C.15):**

> **Coreano para Niños · Semana N · [tema]** 🐯
> 1️⃣ **Hoy aprendimos:** [una línea, con 1–2 palabras en 한글].
> 2️⃣ **Para repasar (10 minutos, 3 días):** Lector de Hangul → [pestaña exacta] (academiaseul.com/lector-coreano) · Dubu → [barrio y niveles] (academiaseul.com/dubu) · y envíennos [el audio / la foto del dibujo] (los videos con cara, por privado).
> 3️⃣ **Frase de la semana:** **[한글]** *([romanización para ustedes])* · [español] 🔊 [link al clip]
> Próxima clase: lunes [fecha], 18:00 (hora de Chile). ¡화이팅!

**Las 8 frases de la semana** (la romanización es **solo para el adulto**, en gris en el cuaderno; el niño escucha el 🔊 o la nota de voz de Abby):

| S | Frase | Para el adulto | Español | Audio |
|---|---|---|---|---|
| 1 | 안녕하세요! | *annyeonghaseyo* | ¡Hola! (con una pequeña reverencia) | [🔊](https://www.academiaseul.com/audio/kr/ec9588eb8595ed9598ec84b8ec9a94.mp3) |
| 2 | 저는 ___예요 / 이에요. | *jeoneun ___yeyo / ieyo* | Yo soy ___. | pendiente (저는 소피아예요) |
| 3 | 가방 | *gabang* | mochila | [🔊](https://www.academiaseul.com/audio/kr/eab080ebb0a9.mp3) |
| 4 | 이거 뭐예요? — 호랑이예요! | *igeo mwoyeyo? — horangiyeyo!* | ¿Qué es esto? — ¡Es un tigre! | pendiente |
| 5 | 우리 엄마예요! | *uri eommayeyo* | ¡Es mi mamá! | [🔊](https://www.academiaseul.com/audio/kr/ec9ab0eba6ac20ec9784eba788ec9888ec9a94.mp3) |
| 6 | 몇 살이에요? — 저는 열 살이에요. | *myeot sarieyo? — jeoneun yeol sarieyo* | ¿Cuántos años tienes? — Tengo 10 años. | [🔊 pregunta](https://www.academiaseul.com/audio/kr/ebaa8720ec82b4ec9db4ec9790ec9a943f.mp3) · respuesta pendiente |
| 7 | 저는 김밥 좋아해요! | *jeoneun gimbap joahaeyo* | ¡Me gusta el kimbap! | pendiente |
| 8 | 감사합니다! · 축하해요! | *gamsahamnida · chukahaeyo* | ¡Gracias! · ¡Felicitaciones! | [🔊](https://www.academiaseul.com/audio/kr/eab090ec82aced95a9eb8b88eb8ba4.mp3) · [🔊](https://www.academiaseul.com/audio/kr/ecb695ed9598ed95b4ec9a94.mp3) |

**Una línea para la familia sobre la romanización** (va en el recuadro de la S1): *"La pronunciación en letras latinas es para ustedes, los adultos, para acompañar la tarea. Al niño no se la mostramos: 'eo' o 'eu' se leen con reglas del español y lo harían pronunciar mal. Él aprende con el 🔊 y con 한글."*

### B.16 El cartel del show (se arma semana a semana)

Una hoja grande (o dos hojas tamaño carta pegadas) con **cuatro zonas**, que el niño sostiene en el show como guion visual (la nota publicada pide "un guion visual, con dibujos en vez de texto"). Todo lo que va en el cartel ya lo pidió la ficha publicada ("va al show final", "será parte del show final"): aquí solo se ordena.

| Pieza | Semana | Qué es (publicado) | En el show dice… |
|---|---|---|---|
| ① Mi nombre | S2 | La hoja del nombre en 한글, decorada | 안녕하세요! 저는 ___예요/이에요. |
| (edad) | S6 | La tarjeta de edades: su número en 한글 pegado junto al nombre | ___ 살이에요. |
| ② Mi animal | S4 | El dibujo del animal favorito con su nombre en 한글 | *(Explorador)* 호랑이예요! · *(Reto)* 저는 호랑이 좋아해요. |
| ③ Mi familia | S5 | El árbol de familia (dibujo, no foto) | 우리 가족이에요! 우리 엄마예요! |
| ④ Mi comida | S7 | El dibujo de su comida favorita | 저는 떡볶이 좋아해요. 맛있어요! |

**Explorador:** el reverso del cartel lleva el guion en dibujos (una mano que saluda, el número, el animal, la familia, el plato, una reverencia). **Reto:** el guion en 한글, que puede mirar si se queda en blanco.

---

## C. Lista maestra de vocabulario del curso

Sin romanización (sección D). **Tipo:** **N** núcleo publicado (se dice; entra en el quiz-juego, el tablero o el show) · **N↺** núcleo publicado ya visto en una semana anterior · **L** letra (se lee) · **F** fórmula (se dice entera, sin explicar) · **P** paradigma (serie que se aprende junta) · **Y** agregado [YA] dentro de lo publicado (tarjeta extra o versión Reto) · **A** anticipo (núcleo de una semana posterior usado antes, marcado) · **T** palabra de clase · **R** reconocimiento (lo dicen los profes o es cultura; no se pide ni se evalúa).
**Audio:** 🔊 = clip nativo en `public/audio/kr` (voz SunHi, la del Lector y Dubu), enlazado como `https://www.academiaseul.com/audio/kr/<hex del UTF-8>.mp3`, verificado archivo por archivo el 27 sept. **"pendiente"** = hay que generarlo (G.4). En las filas con varias formas hay un 🔊 por forma.

**Resumen:** **125 filas** · N 73 + N↺ 3 (= los **86 ítems de núcleo publicado**, con los números 하나–열 en una fila P) · L 2 (16 letras) · F 13 · P 3 · Y 8 · A 3 · T 1 · R 19. Por semana: S1 21 · S2 16 · S3 14 · S4 17 · S5 17 · S6 13 · S7 17 · S8 10. **Audio completo en 76 filas**; faltan **65 clips** (G.4).

| S | Coreano | Español | Tipo | Audio | Nota |
|---|---|---|---|---|---|
| 1 | 안녕하세요 | hola (con reverencia: a los profes y a los mayores) | N | [🔊](https://www.academiaseul.com/audio/kr/ec9588eb8595ed9598ec84b8ec9a94.mp3) | frase ancla de la S1 |
| 1 | 안녕 | hola / chao (entre amigos) | N | [🔊](https://www.academiaseul.com/audio/kr/ec9588eb8595.mp3) | a un compañero, con la mano |
| 1 | 안녕히 계세요 | adiós (cuando tú te vas) | N | [🔊](https://www.academiaseul.com/audio/kr/ec9588eb8595ed9e8820eab384ec84b8ec9a94.mp3) | al salir de la clase, con reverencia |
| 1 | 감사합니다 | gracias | N | [🔊](https://www.academiaseul.com/audio/kr/eab090ec82aced95a9eb8b88eb8ba4.mp3) | se imita entera: [감사함니다] |
| 1 | 네 | sí | N | [🔊](https://www.academiaseul.com/audio/kr/eb84a4.mp3) | pase de lista |
| 1 | 아니요 | no | N | [🔊](https://www.academiaseul.com/audio/kr/ec9584eb8b88ec9a94.mp3) |  |
| 1 | 선생님 | profesor, profesora | N | [🔊](https://www.academiaseul.com/audio/kr/ec84a0ec839deb8b98.mp3) | Jay 선생님 · Abby 선생님 |
| 1 | 친구 | amigo, amiga | N | [🔊](https://www.academiaseul.com/audio/kr/ecb99ceab5ac.mp3) | ¡chingu! |
| 1 | 한국 | Corea | N | [🔊](https://www.academiaseul.com/audio/kr/ed959ceab5ad.mp3) |  |
| 1 | 한글 | el alfabeto coreano | N | [🔊](https://www.academiaseul.com/audio/kr/ed959ceab880.mp3) |  |
| 1 | 잘했어요 | ¡bien hecho! | N | [🔊](https://www.academiaseul.com/audio/kr/ec9e98ed9688ec96b4ec9a94.mp3) | lo dicen los profes desde el minuto 1; los niños lo dicen como público en la S8 |
| 1 | ㅏ ㅓ ㅗ ㅜ ㅡ ㅣ → 아 어 오 우 으 이 | las 6 vocales básicas (con la ㅇ muda delante) | L | [🔊](https://www.academiaseul.com/audio/kr/ec95842c20ec96b42c20ec98a42c20ec9ab02c20ec9cbc2c20ec9db4.mp3) | además hay un clip por vocal (아 · 어 · 오 · 우 · 으 · 이) |
| 1 | 아이 | niño, niña | A | [🔊](https://www.academiaseul.com/audio/kr/ec9584ec9db4.mp3) | núcleo de la S2; se lee en la S1 solo con vocales |
| 1 | 오이 | pepino | A | [🔊](https://www.academiaseul.com/audio/kr/ec98a4ec9db4.mp3) | núcleo de la S2; idem |
| 1 | 따라 하세요 | repitan | R | [🔊](https://www.academiaseul.com/audio/kr/eb94b0eb9dbc20ed9598ec84b8ec9a94.mp3) | lenguaje de clase (Abby), con la mano de la boca hacia afuera |
| 1 | 다시 | otra vez | R | pendiente | lenguaje de clase |
| 1 | 좋아요 | ¡bien! | R | [🔊](https://www.academiaseul.com/audio/kr/eca28bec9584ec9a94.mp3) | lenguaje de clase |
| 1 | 친구들 | amigos, amigas (al grupo) | R | pendiente | 친구들, 안녕하세요! |
| 1 | 다음 주에 만나요 | nos vemos la próxima semana | R | pendiente | despedida de los profes |
| 1 | 인사 | saludo con reverencia | R | [🔊](https://www.academiaseul.com/audio/kr/ec9db8ec82ac.mp3) | cultura |
| 1 | 야 여 요 유 | las vocales con "rayita extra" (Reto, solo al oído) | R | [🔊1](https://www.academiaseul.com/audio/kr/ec95bc.mp3) [🔊2](https://www.academiaseul.com/audio/kr/ec97ac.mp3) [🔊3](https://www.academiaseul.com/audio/kr/ec9a94.mp3) [🔊4](https://www.academiaseul.com/audio/kr/ec9ca0.mp3) | aparecen en el Lector (grupo "vocales básicas") y en Dubu 1-3 |
| 2 | 이름 | nombre | N | [🔊](https://www.academiaseul.com/audio/kr/ec9db4eba684.mp3) | 이름이 뭐예요? |
| 2 | 저 | yo (forma cortés) | N | [🔊](https://www.academiaseul.com/audio/kr/eca080.mp3) | solo dentro de 저는 ___예요/이에요 |
| 2 | 나무 | árbol | N | [🔊](https://www.academiaseul.com/audio/kr/eb8298ebacb4.mp3) | Dubu 2-2 |
| 2 | 바다 | mar | N | [🔊](https://www.academiaseul.com/audio/kr/ebb094eb8ba4.mp3) | Dubu 2-4 |
| 2 | 아이 | niño, niña | N↺ | [🔊](https://www.academiaseul.com/audio/kr/ec9584ec9db4.mp3) | leída en la S1 |
| 2 | 오이 | pepino | N↺ | [🔊](https://www.academiaseul.com/audio/kr/ec98a4ec9db4.mp3) | leída en la S1 |
| 2 | 머리 | cabeza | N | [🔊](https://www.academiaseul.com/audio/kr/eba8b8eba6ac.mp3) | TPR: tócate la 머리 |
| 2 | 다리 | pierna | N | pendiente | TPR |
| 2 | 나비 | mariposa | N | pendiente |  |
| 2 | 모자 | gorro | N | [🔊](https://www.academiaseul.com/audio/kr/ebaaa8ec9e90.mp3) |  |
| 2 | ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅅ ㅇ ㅈ ㅎ → 가 나 다 라 마 바 사 아 자 하 | las 10 consonantes básicas (con ㅏ) | L | [🔊1](https://www.academiaseul.com/audio/kr/eab080.mp3) [🔊2](https://www.academiaseul.com/audio/kr/eb8298.mp3) [🔊3](https://www.academiaseul.com/audio/kr/eb8ba4.mp3) [🔊4](https://www.academiaseul.com/audio/kr/eb9dbc.mp3) [🔊5](https://www.academiaseul.com/audio/kr/eba788.mp3) [🔊6](https://www.academiaseul.com/audio/kr/ebb094.mp3) [🔊7](https://www.academiaseul.com/audio/kr/ec82ac.mp3) [🔊8](https://www.academiaseul.com/audio/kr/ec9584.mp3) [🔊9](https://www.academiaseul.com/audio/kr/ec9e90.mp3) [🔊10](https://www.academiaseul.com/audio/kr/ed9598.mp3) | = Lector → Practicar → Consonantes (son exactamente estas 10) |
| 2 | 이름이 뭐예요? | ¿cómo te llamas? | F | pendiente | cadena en círculo |
| 2 | 저는 ___예요 / 이에요 | yo soy ___ (저는 소피아예요 · 저는 다니엘이에요) | F | pendiente | la tarjeta de cada niño trae su frase completa |
| 2 | 가위바위보 | piedra, papel o tijera | Y | pendiente | para decidir turnos desde la S2 (Fase 1 §10.4) ⚑ D-3 |
| 2 | 한글날 | Día del Hangul (9 de octubre) | R | [🔊](https://www.academiaseul.com/audio/kr/ed959ceab880eb82a0.mp3) | cultura |
| 2 | 세종대왕 | el rey Sejong el Grande | R | pendiente | cultura (cuento de 2 minutos) |
| 3 | 문 | puerta | N | [🔊](https://www.academiaseul.com/audio/kr/ebacb8.mp3) | 받침 ㄴ |
| 3 | 산 | montaña | N | [🔊](https://www.academiaseul.com/audio/kr/ec82b0.mp3) | Dubu 3-2 |
| 3 | 손 | mano | N | [🔊](https://www.academiaseul.com/audio/kr/ec8690.mp3) | TPR |
| 3 | 발 | pie | N | pendiente | 받침 ㄹ; TPR |
| 3 | 물 | agua | N | [🔊](https://www.academiaseul.com/audio/kr/ebacbc.mp3) | Dubu 3-4 |
| 3 | 강 | río | N | [🔊](https://www.academiaseul.com/audio/kr/eab095.mp3) | ㅇ abajo = "ng"; Dubu 3-1 |
| 3 | 방 | habitación | N | [🔊](https://www.academiaseul.com/audio/kr/ebb0a9.mp3) |  |
| 3 | 밤 | noche | N | [🔊](https://www.academiaseul.com/audio/kr/ebb0a4.mp3) | también "castaña" (no se enseña) |
| 3 | 눈 | ojo / nieve | N | [🔊](https://www.academiaseul.com/audio/kr/eb8888.mp3) | la palabra con doble sentido de la S3 |
| 3 | 김 | alga seca | N | pendiente | anticipa 김밥 (S7) |
| 3 | 가방 | mochila | N | [🔊](https://www.academiaseul.com/audio/kr/eab080ebb0a9.mp3) | primera palabra de 2 sílabas con 받침 |
| 3 | 가 거 고 구 그 기 | la fábrica de sílabas (ㄱ + las 6 vocales) | P | [🔊1](https://www.academiaseul.com/audio/kr/eab080.mp3) [🔊2](https://www.academiaseul.com/audio/kr/eab1b0.mp3) [🔊3](https://www.academiaseul.com/audio/kr/eab3a0.mp3) [🔊4](https://www.academiaseul.com/audio/kr/eab5ac.mp3) [🔊5](https://www.academiaseul.com/audio/kr/eab7b8.mp3) [🔊6](https://www.academiaseul.com/audio/kr/eab8b0.mp3) | se canta en coro |
| 3 | 받침 | consonante final ("la que va abajo") | T | pendiente | palabra de clase |
| 3 | 첫눈 | la primera nieve del año | R | pendiente | cultura: estaciones invertidas ⚑ D-11 |
| 4 | 동물 | animal | N | pendiente |  |
| 4 | 강아지 | perrito | N | [🔊](https://www.academiaseul.com/audio/kr/eab095ec9584eca780.mp3) | Dubu 6-4; Lector → Pictogramas |
| 4 | 고양이 | gato | N | [🔊](https://www.academiaseul.com/audio/kr/eab3a0ec9691ec9db4.mp3) | Lector → Pictogramas |
| 4 | 토끼 | conejo | N | pendiente | 토끼예요 (vocal) |
| 4 | 곰 | oso | N | [🔊](https://www.academiaseul.com/audio/kr/eab3b0.mp3) | 곰이에요 (받침) |
| 4 | 호랑이 | tigre | N | pendiente | frase ancla de la S4 |
| 4 | 새 | pájaro | N | [🔊](https://www.academiaseul.com/audio/kr/ec8388.mp3) |  |
| 4 | 물고기 | pez | N | pendiente | 물 (S3) + 고기 (Dubu 2-1) |
| 4 | 코끼리 | elefante | N | pendiente | ㄲ al oído |
| 4 | 돼지 | cerdo | N | pendiente | ㅙ suena "ue" |
| 4 | 사자 | león | N | pendiente |  |
| 4 | 이거 뭐예요? | ¿qué es esto? | F | pendiente |  |
| 4 | ___이에요 / 예요 | es un/una ___ (곰이에요 · 토끼예요 · 호랑이예요) | F | pendiente | gesto: puño = termina en 받침 → 이에요 · mano abierta = termina en vocal → 예요 |
| 4 | 멍멍 · 야옹 · 꿀꿀 | guau · miau · oinc | R | pendiente | publicado |
| 4 | 어흥 | el rugido del tigre | Y | pendiente | agregado para la frase ancla ⚑ D-12 |
| 4 | 호돌이 | Hodori, la mascota de Seúl 1988 | R | pendiente | cultura |
| 4 | 사람 | persona | A | [🔊](https://www.academiaseul.com/audio/kr/ec82aceb9e8c.mp3) | núcleo de la S5; aparece en el cuento del oso y el tigre |
| 5 | 가족 | familia | N | [🔊](https://www.academiaseul.com/audio/kr/eab080eca1b1.mp3) | 우리 가족이에요! |
| 5 | 엄마 | mamá | N | [🔊](https://www.academiaseul.com/audio/kr/ec9784eba788.mp3) |  |
| 5 | 아빠 | papá | N | [🔊](https://www.academiaseul.com/audio/kr/ec9584ebb9a0.mp3) | ㅃ al oído |
| 5 | 할머니 | abuela | N | [🔊](https://www.academiaseul.com/audio/kr/ed95a0eba8b8eb8b88.mp3) |  |
| 5 | 할아버지 | abuelo | N | [🔊](https://www.academiaseul.com/audio/kr/ed95a0ec9584ebb284eca780.mp3) | [하라버지] |
| 5 | 언니 | hermana mayor (si tú eres niña) | N | [🔊](https://www.academiaseul.com/audio/kr/ec96b8eb8b88.mp3) |  |
| 5 | 오빠 | hermano mayor (si tú eres niña) | N | [🔊](https://www.academiaseul.com/audio/kr/ec98a4ebb9a0.mp3) |  |
| 5 | 누나 | hermana mayor (si tú eres niño) | N | [🔊](https://www.academiaseul.com/audio/kr/eb8884eb8298.mp3) |  |
| 5 | 형 | hermano mayor (si tú eres niño) | N | [🔊](https://www.academiaseul.com/audio/kr/ed9895.mp3) |  |
| 5 | 동생 | hermano o hermana menor | N | [🔊](https://www.academiaseul.com/audio/kr/eb8f99ec839d.mp3) |  |
| 5 | 사람 | persona | N | [🔊](https://www.academiaseul.com/audio/kr/ec82aceb9e8c.mp3) | anticipada en la S4 |
| 5 | 우리 ___예요 / 이에요 | es mi ___ (우리 엄마예요 · 우리 가족이에요 · 우리 강아지예요) | F | [🔊 우리 엄마예요](https://www.academiaseul.com/audio/kr/ec9ab0eba6ac20ec9784eba788ec9888ec9a94.mp3) · pendiente: 우리 가족이에요, 우리 강아지예요 | [YA] en lugar de 이 사람은 우리 엄마예요 (Fase 1 §10.5) |
| 5 | 이 사람은 ___예요 / 이에요 | esta persona es ___ | R | pendiente | publicado; queda para reconocer ⚑ D-13 |
| 5 | 이분은 우리 할머니예요 | ella es mi abuela (con respeto) | Y | pendiente | solo Reto (Fase 1 §10.5) |
| 5 | 누구예요? | ¿quién es? | R | [🔊](https://www.academiaseul.com/audio/kr/eb8884eab5acec9888ec9a943f.mp3) | la pregunta de Abby en la sala Reto |
| 5 | 엄마 이름이 뭐예요? | ¿cómo se llama tu mamá? | F | pendiente | publicado; vale un nombre inventado o el de la mascota |
| 5 | 이모 · 삼촌 | tía (hermana de la mamá) · tío | Y | pendiente | a pedido |
| 6 | 하나 둘 셋 넷 다섯 여섯 일곱 여덟 아홉 열 | 1 al 10 (números coreanos nativos) | P | [🔊1](https://www.academiaseul.com/audio/kr/ed9598eb8298.mp3) [🔊2](https://www.academiaseul.com/audio/kr/eb9198.mp3) [🔊3](https://www.academiaseul.com/audio/kr/ec858b.mp3) [🔊4](https://www.academiaseul.com/audio/kr/eb84b7.mp3) [🔊5](https://www.academiaseul.com/audio/kr/eb8ba4ec84af.mp3) [🔊6](https://www.academiaseul.com/audio/kr/ec97acec84af.mp3) [🔊7](https://www.academiaseul.com/audio/kr/ec9dbceab3b1.mp3) [🔊8](https://www.academiaseul.com/audio/kr/ec97aceb8d9f.mp3) [🔊9](https://www.academiaseul.com/audio/kr/ec9584ed9989.mp3) [🔊10](https://www.academiaseul.com/audio/kr/ec97b4.mp3) | 여덟 [여덜] |
| 6 | 살 | años (de edad) | N | [🔊](https://www.academiaseul.com/audio/kr/ec82b4.mp3) |  |
| 6 | 생일 | cumpleaños | N | [🔊](https://www.academiaseul.com/audio/kr/ec839dec9dbc.mp3) |  |
| 6 | 한 · 두 · 세 · 네 (+ 살) | 1, 2, 3 y 4 antes de 살 (pierden la "cola") | P | [🔊1](https://www.academiaseul.com/audio/kr/ed959c.mp3) [🔊2](https://www.academiaseul.com/audio/kr/eb9190.mp3) [🔊3](https://www.academiaseul.com/audio/kr/ec84b8.mp3) [🔊4](https://www.academiaseul.com/audio/kr/eb84a4.mp3) | 열한 살, 열두 살… |
| 6 | 몇 살이에요? | ¿cuántos años tienes? | F | [🔊](https://www.academiaseul.com/audio/kr/ebaa8720ec82b4ec9db4ec9790ec9a943f.mp3) |  |
| 6 | 저는 ___ 살이에요 | tengo ___ años (저는 열 살이에요) | F | pendiente |  |
| 6 | 열하나 열둘 열셋 열넷 열다섯 | 11 al 15 | Y | [🔊1](https://www.academiaseul.com/audio/kr/ec97b4ed9598eb8298.mp3) [🔊2](https://www.academiaseul.com/audio/kr/ec97b4eb9198.mp3) [🔊3](https://www.academiaseul.com/audio/kr/ec97b4ec858b.mp3) [🔊4](https://www.academiaseul.com/audio/kr/ec97b4eb84b7.mp3) [🔊5](https://www.academiaseul.com/audio/kr/ec97b4eb8ba4ec84af.mp3) | [YA] Fase 1 §4.9: para que todos puedan decir su edad |
| 6 | 여덟 살 · 아홉 살 · 열 살 | 8, 9 y 10 años | Y | pendiente | tarjeta de edades |
| 6 | 열한 살 · 열두 살 · 열세 살 · 열네 살 · 열다섯 살 | 11 a 15 años | Y | pendiente | tarjeta de edades [YA] |
| 6 | 마테오는 열 살이에요 | Mateo tiene 10 años (contar la edad de otro) | F | pendiente | publicado; 는 sin explicar |
| 6 | 스물 · 서른 · 마흔 · 쉰 | 20 · 30 · 40 · 50 | R | [🔊1](https://www.academiaseul.com/audio/kr/ec8aa4ebacbc.mp3) [🔊2](https://www.academiaseul.com/audio/kr/ec849ceba5b8.mp3) [🔊3](https://www.academiaseul.com/audio/kr/eba788ed9d94.mp3) [🔊4](https://www.academiaseul.com/audio/kr/ec89b0.mp3) | tarjeta "para curiosos" (la edad de los adultos de la casa) |
| 6 | 돌 · 돌잡이 | primer cumpleaños · el juego de elegir un objeto | R | pendiente | cultura |
| 6 | 가라사대 | "Simón dice" en Corea | R | pendiente | nombre coreano del juego "Jay dice / Abby dice" ⚑ D-14 |
| 7 | 김밥 | rollo de arroz con alga | N | pendiente | [김밥] o [김빱]: las dos valen |
| 7 | 라면 | fideos instantáneos | N | [🔊](https://www.academiaseul.com/audio/kr/eb9dbceba9b4.mp3) | Lector → Palabras |
| 7 | 불고기 | carne marinada | N | [🔊](https://www.academiaseul.com/audio/kr/ebb688eab3a0eab8b0.mp3) |  |
| 7 | 떡볶이 | pastelitos de arroz picantes | N | [🔊](https://www.academiaseul.com/audio/kr/eb96a1ebb3b6ec9db4.mp3) | [떡뽀끼] |
| 7 | 김치 | kimchi (col fermentada) | N | [🔊](https://www.academiaseul.com/audio/kr/eab980ecb998.mp3) | Dubu 6-2 |
| 7 | 밥 | arroz cocido / comida | N | [🔊](https://www.academiaseul.com/audio/kr/ebb0a5.mp3) | Lector → Batchim y Pictogramas |
| 7 | 사과 | manzana | N | [🔊](https://www.academiaseul.com/audio/kr/ec82aceab3bc.mp3) | Dubu 5-1 |
| 7 | 바나나 | banana, plátano | N | [🔊](https://www.academiaseul.com/audio/kr/ebb094eb8298eb8298.mp3) |  |
| 7 | 딸기 | frutilla, fresa | N | [🔊](https://www.academiaseul.com/audio/kr/eb94b8eab8b0.mp3) |  |
| 7 | 주스 | jugo | N | pendiente |  |
| 7 | 맛있어요 | ¡está rico! | N | pendiente | [마시써요] |
| 7 | 매워요 | pica | N | pendiente |  |
| 7 | 저는 ___ 좋아해요 | me gusta ___ (저는 김밥 좋아해요) | F | pendiente | 을/를 solo se oye en el modelo |
| 7 | 안 좋아해요 | no me gusta | F | [🔊](https://www.academiaseul.com/audio/kr/ec958820eca28bec9584ed95b4ec9a94.mp3) | 김치 안 좋아해요 |
| 7 | 뭐 좋아해요? | ¿qué te gusta? | F | pendiente |  |
| 7 | 네, 좋아해요 · 아니요, 안 좋아해요 | sí, me gusta · no, no me gusta | F | [🔊 아니요, 안 좋아해요](https://www.academiaseul.com/audio/kr/ec9584eb8b88ec9a942c20ec958820eca28bec9584ed95b4ec9a94.mp3) · pendiente: 네, 좋아해요 | encuesta relámpago |
| 7 | 김장 | preparar juntos el kimchi del invierno | R | [🔊](https://www.academiaseul.com/audio/kr/eab980ec9ea5.mp3) | cultura (noviembre) |
| 8 | 박수 | aplauso | N | pendiente | 박수! = ¡aplausos! |
| 8 | 잘했어요 | ¡bien hecho! | N↺ | [🔊](https://www.academiaseul.com/audio/kr/ec9e98ed9688ec96b4ec9a94.mp3) | desde la S1 en voz de los profes |
| 8 | 축하해요 | ¡felicitaciones! | N | [🔊](https://www.academiaseul.com/audio/kr/ecb695ed9598ed95b4ec9a94.mp3) | al entregar el certificado |
| 8 | 수료증 | certificado (de haber terminado el curso) | N | [🔊](https://www.academiaseul.com/audio/kr/ec8898eba38ceca69d.mp3) |  |
| 8 | 시작 | comienzo / ¡empieza! | N | pendiente | tarjeta del guardián del tiempo |
| 8 | 끝 | fin | N | pendiente | idem |
| 8 | 화이팅 | ¡ánimo! / ¡vamos! | N | [🔊](https://www.academiaseul.com/audio/kr/ed9994ec9db4ed8c85.mp3) |  |
| 8 | 사랑해요 | te quiero | N | pendiente | con el 손하트, al cierre |
| 8 | 손하트 | corazón con los dedos | R | pendiente | cultura; foto de manos |
| 8 | 우리 반 발표회 | el show de nuestra clase | Y | pendiente | título del show (Fase 1 §11.5) ⚑ D-15 |

---

## D. Política de idioma, romanización y cuidado en Zoom

### D.1 Quién habla qué idioma

| Quién | Idioma | Cómo |
|---|---|---|
| **Jay** | Español para explicar, organizar y hablar con las familias; coreano para modelar y felicitar | Explica en 3 minutos como máximo; traduce a Abby solo cuando hace falta ("sándwich": Abby en coreano → Jay una línea en español → Abby repite en coreano) |
| **Abby** | **Coreano** (su idioma de trabajo), con gesto, imagen y exageración | Canta, saluda, da las instrucciones de juego y corrige la pronunciación en coreano; su sala (Reto) funciona ~90 % en coreano con la **tarjeta de sala en español en pantalla** (la hace producción) |
| **Los niños** | Coreano en las fórmulas y los juegos; español para preguntar y para pensar | Nunca se castiga el español: se reformula en coreano ("¿cómo se dice? 따라 하세요…") |
| **Las familias** | Español (nota semanal, grupo, invitación) | La frase de la semana llega con romanización para el adulto (D.2) |

**Lenguaje de aula de Abby** (R: los niños lo entienden con el gesto; no lo producen; ⚑ D-5):

| Coreano | Gesto | Español |
|---|---|---|
| 친구들, 안녕하세요! | Reverencia | ¡Hola, chicos! |
| 따라 하세요. | Mano desde la boca hacia la cámara | Repitan. |
| 다시! | Dedo en círculo | ¡Otra vez! |
| 잘했어요! · 좋아요! | Pulgar arriba | ¡Bien hecho! · ¡Bien! |
| 잘 들어 보세요. | Mano en la oreja | Escuchen bien. |
| 보여 주세요. | Manos que muestran algo a la cámara | Muéstrenmelo. |
| 손 들어 주세요. | Mano arriba (o ✋ de Zoom) | Levanten la mano. |
| 마이크 꺼 주세요. · 켜 주세요. | Dedo en los labios · mano que abre | Apaguen el micrófono · enciéndanlo. |
| 하나, 둘, 셋! | Tres palmas | ¡Cambiamos! (señal fija) |
| ○○ 차례예요! | Mano abierta hacia el niño | ¡Es el turno de ○○! (con el nombre: "네 차례" se confundiría con 네 = sí) |

### D.2 Romanización

**Regla (Fase 1 §7.4):** **el niño no ve romanización** en ningún material del curso; **la familia sí**, en el recuadro "Para la familia" y en la nota semanal, en gris y solo para acompañar la tarea. Motivo: a los 8–10 años el niño todavía afirma la lectura en español y le transferiría esas reglas ("eo" como dos vocales, "j" como jota, la "h" muda); a los 12–15 el problema es otro: la romanización de fandom (*saranghae*) ya le enseñó a leer mal. Para el niño, el puente al sonido es siempre **el audio** (🔊, Abby, el Lector, Dubu) y **el color** (consonante azul, vocal dorada, 받침 verde).

| Contexto | Cómo se hace en Niños |
|---|---|
| Cuaderno de actividades, láminas, tarjetas de sala, bingo, cartel | 한글 grande + dibujo + español. Pistas de sonido **en español, con palabras** ("ㅡ: sonríe y di u"; "ㅓ: una o con boca de bostezo"), nunca letras latinas |
| Recuadro "Para la familia" y nota semanal | 한글 + *romanización en gris* + español + 🔊 |
| Nombres propios | En el texto en español, como siempre (Seúl, Sejong, Hodori); en la frase coreana, en 한글 |
| Canciones | Letra en 한글 + traducción; se aprenden de oído, con la voz de Abby |
| **Lector** | Muestra romanización en los cuadros del Alfabeto, en las respuestas de "Lectura" e "Inversa" de Practicar y en todo el Contrarreloj. **No se toca código en octubre**, así que: regla **"primero el sonido"** (toca 🔊 y di la letra en voz alta, después elige) · se prefieren **Pictogramas** y **Números** (casi sin romanización) · el **Contrarreloj queda como extra solo para Reto** (sus respuestas son siempre en letras latinas) |
| **Dubu** | Los barrios 1–4 muestran la palabra meta en letras latinas (niveles "rr"). Regla: **tocar 🔊 primero y armar lo que se oye**; la línea en letras latinas es para el adulto. Río Han y la Estación de Seúl son solo de oído |
| Chat de Zoom y WhatsApp | Si un niño escribe en letras latinas, el profe responde con la misma palabra en 한글, sin reproche |

> **Texto para el niño** (cuaderno S1, sección 4): **"Las letras coreanas se leen con los oídos."** Cuando no sepas cómo suena una palabra, toca el 🔊, escucha a Abby y mira los colores. Si en el Lector o en Dubu ves letras como las nuestras, tápalas con el dedo: ¡tú ya lees 한글!

### D.3 Nombres en 한글 (S2)

Cada niño recibe en la S2 una **tarjeta con su nombre en 한글 y su frase completa** (저는 소피아예요). La prepara producción con la tabla de nombres de Básico 1 (`Curriculo/Fase2_Basico1/alumnos/S01_Material_Alumno.md`, sección 3.5) y el generador del sitio (`/generador-nombre`), y **Jay valida cada una** (⚑ D-6). Se usa el nombre (o apodo) que **la familia confirmó** en el grupo después de la S1. Si la familia tiene nombre coreano para el niño, se usa ese. Reto puede armar su nombre solo con la tabla y comparar con la tarjeta.

### D.4 Cuidado de menores en Zoom (en cada clase)

Todo esto sale de lo publicado (programa, Guía para familias §8) y de las mejoras [YA] de la Fase 1 (§16.1, problema #15). Las guías de cada semana lo aplican en su checklist (C.2).

| Tema | Regla |
|---|---|
| Redes sociales | **Nunca** fotos, videos ni capturas con la cara de un niño (publicado). Un dibujo sin nombre solo con permiso escrito y opcional |
| Grabación | Solo para las familias del curso, en la carpeta privada (publicado). Plazo de borrado: **DECISIÓN DE JAY** para enero (Fase 1, decisión 13; ⚑ N-9 Ley 21.719) |
| Nombres | Solo nombre de pila (desde la S2, en 한글) |
| Chat | Solo en público (nunca mensajes privados entre participantes) y para emojis (publicado) |
| Datos personales | Los niños no dicen dirección, colegio ni teléfono (publicado); tampoco se piden fotos de la familia: **dibujo** (S5) |
| Tareas con video | **Videos con cara, por privado** a la academia (+56 9 4211 5562), no al grupo de 12 familias; los audios y las fotos de dibujos pueden ir al grupo [YA] |
| Salas | **Nunca un adulto a solas con un solo niño** (mínimo 2 niños por sala; si no, una sola sala con los dos profes) [YA] |
| Foto final | **De manos** con el 손하트, sin caras [YA] |
| "Álbum de la academia" | La ficha lo menciona (S8); en octubre = **solo la carpeta privada del curso** [YA, DECISIÓN DE JAY 5] |
| Grupo de WhatsApp | Solo apoderados; los niños no están (publicado) |

**El efecto espejo de Zoom (se explica en la S1, en 1 minuto; Fase 1 §16.1):** Zoom muestra tu propio video **como un espejo** solo a ti. Por eso: (1) **cuando muestras una hoja**, en tu cuadrito se ve al revés, pero **a los demás les llega bien: no la des vuelta**; (2) en "La vocal viva", **copia a Jay como en un espejo**: si Jay estira el brazo hacia un lado, tú lo estiras hacia el mismo lado de tu pantalla. Jay hace las vocales pensando en cómo se ven desde la cámara (para ㅏ estira su brazo **izquierdo**, que los niños ven a la derecha); a los profes, la ㅏ de un niño les llega como ㅓ y **no se corrige** (⚑ N-4: probar con dos dispositivos antes del 19 oct).

**Mensaje a los apoderados antes del 19 oct (borrador; DECISIÓN DE JAY 5, Fase 1 §16.1):**

> **Texto para la familia** · ¡Hola, familias! Tres detalles para cuidar a los niños del curso: (1) cuando la tarea sea un **video donde se vea la cara**, mándenlo **por privado** a este número, no al grupo (los audios y las fotos de dibujos sí pueden ir al grupo); (2) en la clase 5 presentamos la familia con un **dibujo**, no con fotos; (3) la foto del final del curso será **de manos** haciendo un corazón (손하트), sin caras. La grabación de cada clase queda solo en la carpeta del curso. ¡Gracias! 화이팅

---

## E. Evaluación del curso

### E.1 Principios

**Sin notas numéricas ni examen escrito** (publicado). Se valora "que se entienda y se atreva a hablar, no la perfección gramatical" (publicado). Primero el comentario (de voz, cálido, concreto), después el registro. **Nada se evalúa antes de enseñarse** (el quiz-juego de cada clase es de la semana anterior). **[YA] Nada se evalúa delante de las familias:** en el show, las familias ven la presentación; la lectura y la comprensión se registran en la sala (E.5). Ningún juego elimina (regla 12 de la sección 0).

### E.2 Lo que dicen los textos publicados (no coinciden)

| | Ficha `ninos` (`cursos_es.json`, PDF por curso, Programa Completo) | Guía para familias (§10–11) | Programa público (`Programa_Ninos.md`) | Kit de Abby (§7) | Propuesta Fase 1 §11.3 [ENE] |
|---|---|---|---|---|---|
| Asistencia | ≥ 75 % (6 de 8), **la grabación no reemplaza** | 6 de 8 **en vivo**; "la grabación sirve para repasar, no reemplaza la clase" | "Requisitos exactos: **Confirmar** con Academia Seúl"; si la grabación cuenta: "**Confirmar**" | ≥ 75 %, **en vivo o grabación + tarea** (regla general de la academia) | 6 de 8 + show (en vivo o video) |
| Show | Completar el show | Participar en el show | Presentar el show | Mini-show (35 % en la tabla general) | Participar en el show |
| Logros | ≥ 60 % de los logros del tablero | ≥ 60 % de los logros del tablero | — | Pesos generales 25/25/15/35 | **Sin stickers como requisito** |
| Entrega | En pantalla en la clase 8 y en PDF a la familia | Igual | Igual | — | — |

**[regla del certificado: pendiente de decisión de Jay]** (DECISIÓN DE JAY 1). Mientras Jay decide, **se registra todo por separado** (planilla del curso): asistencia en vivo · asistencia por grabación + tarea · cada tarea · los 3 indicadores de cada semana · los 10 logros del tablero · el show (en vivo / por video) · lectura (n/5) · comprensión (n/5). Así se puede aplicar cualquiera de las reglas el vie 4 dic. Recomendación de Dirección Académica: la de la **Guía para familias** (6 de 8 en vivo + show), que es la que las familias recibieron por escrito; el 60 % del tablero se cumple de hecho con los 10 logros de E.3 (cualquier niño que asiste llega a 6), y para enero, la regla de la Fase 1 sin stickers como requisito (anexo I #3).

### E.3 Semana a semana: quiz-juego, 3 indicadores y el tablero

- **Quiz-juego de 5 minutos** al inicio de las clases 2 a 7 (publicado: "cada clase abre con un quiz-juego sobre la semana anterior"; la S1 no tiene clase anterior y en la S8 su lugar lo toma el ensayo). Formatos publicados: bingo, memorice, "Jay dice / Abby dice". Todos juegan hasta el final; se anota quién lo logra solo y quién con ayuda. Contenido exacto en cada semana de B.
- **3 indicadores por niño y por semana** (publicado), en la planilla de cada sala: **① entiende la instrucción en coreano · ② repite con buena pronunciación · ③ dice la frase solo o sola**. Escala sin colores: **● sí · ◐ con ayuda · ○ todavía**.
- **Tablero de progreso** (publicado: "tablero de stickers", PDF imprimible). Diez logros, uno o dos por semana; un logro no se "pierde" nunca y se puede ganar después. Dos diseños con los mismos logros: **stickers** (Explorador) y **sellos** (Reto) (B0.3). La hoja de stickers para colorear y recortar va en el cuaderno; el "sticker del día" lo anuncia Jay al cierre y la familia lo pega en casa. **Nadie ve el tablero de otro.**

| # | Logro | Semana |
|---|---|---|
| 1 | Saludo con reverencia: 안녕하세요 · 감사합니다 · 안녕히 계세요 | S1 |
| 2 | Leo las 6 vocales | S1 |
| 3 | Leo las 10 consonantes con ㅏ (가 나 다…) | S2 |
| 4 | Escribo mi nombre en 한글 | S2 |
| 5 | Leo palabras con 받침 | S3 |
| 6 | Pregunto y respondo: 이거 뭐예요? — ___예요! | S4 |
| 7 | Presento a mi familia: 우리 ___예요! | S5 |
| 8 | Cuento hasta 열 y digo mi edad | S6 |
| 9 | Digo qué me gusta y qué no | S7 |
| 10 | ¡Hice mi show! | S8 |

Los logros 2–9 cubren los publicados para el certificado ("leer sus primeras palabras, presentarse con nombre y edad, contar del 1 al 10 y nombrar animales, familia y comidas").

### E.4 Mitad del curso (S4 · 9 de noviembre) [YA]

La Fase 1 (§11.4) propone para Niños un **resumen de 3 líneas para la familia** a mitad de curso; el kit de Abby deja la fecha "a confirmar con Jay". Se hace **sin agregar ninguna prueba**, con la evidencia que ya existe (indicadores S1–S4, tareas, tablero): *lo que ya logra · qué practicar en casa (una pestaña exacta) · un ánimo*. Cada profe escribe las de su sala (máximo 6 × 3 minutos). Fecha: con la nota de la S4 (mar 10 nov) o el dom 15 nov (**DECISIÓN DE JAY 4**). Si un niño está en ○ en los tres indicadores, Jay llama a la familia (5 minutos) antes de la S5.

### E.5 El show (S8 · 7 de diciembre)

**Lo publicado:** tres partes por niño ("3 minutos en total, dentro de la clase de 60 minutos"): (1) presentación de 30–40 s ante las familias con saludo, nombre, edad, familia, animal y comida favorita; (2) lectura en voz alta de 5 palabras en 한글 elegidas al azar entre las del curso; (3) 5 preguntas de comprensión con dibujos (señalar el animal, la comida o el número que dice el profe). Y en la práctica publicada de la S8: "ensayo general en salas (primeros 15 minutos, antes de que entren las familias)".

**El problema** (Fase 1 §15, #33): 12 niños × 3 minutos = 36 minutos, más 15 de ensayo, más bienvenida, certificados y foto ≈ 64 minutos en 60; y la comprensión se evalúa delante de los adultos.

**[YA] Solución (DECISIÓN DE JAY 2 · requiere aviso escrito a los apoderados antes de la S7, porque la ficha y la Guía para familias dicen "ante las familias"):** las partes (2) y (3) se hacen **en la sala de cada profe, en los primeros 20 minutos, antes de que entren las familias** (junto con el ensayo general); frente a las familias queda **la presentación** (parte 1), que es lo que las familias vienen a ver. Todo sigue siendo el mismo show de tres partes en la misma clase. Horario completo en F.5. El aviso se manda con la nota de la S6 (lun 23 nov; texto en F.6).

### E.6 Cierre y certificado

- **Certificado** "Coreano para Niños (8–15) · Academia Seúl", en pantalla en la clase 8 y en PDF a la familia esa semana (publicado); **no es una acreditación oficial y no equivale a un nivel del TOPIK** (publicado). Regla: **[regla del certificado: pendiente de decisión de Jay]** (E.2).
- **En la ceremonia:** para no exponer a nadie delante de las familias, **todos los niños que presentan reciben en pantalla su "diploma del show"** con 축하해요; el certificado en PDF llega a la familia según la regla que Jay decida (DECISIÓN DE JAY 3). Plantilla del certificado: antes del lun 30 nov (Fase 1 §16.1).
- **Quien no puede el día del show:** lo publicado no lo cubre. Propuesta (Fase 1 §11.3): la familia manda **por privado** un video de la presentación hasta el mié 9 dic y Jay y Abby hacen la lectura y las preguntas en 10 minutos por Zoom esa semana (con el adulto presente) → DECISIÓN DE JAY 3.
- **Nota final a la familia** (en lugar de la nota semanal de la S8): 3 líneas por niño (lo que logró · lo que más disfrutó · cómo seguir en vacaciones con Dubu y el Lector) + el audio "antes y después" si la familia lo pide (B0.2).
- **Qué sigue:** "Coreano para Niños 2, planificado para enero de 2027" (publicado); fechas y horario: **Confirmar con Academia Seúl**. De 13 años en adelante, también Básico 1 (publicado).

---

## F. Proyecto final: "우리 반 발표회 · El show de mi cartel"

En octubre se mantiene el formato publicado (presentación de 30–40 s + 5 palabras + 5 preguntas, con las familias, clase 8). Lo que se agrega [YA] es preparación y orden, todo dentro de lo publicado: el **cartel** que se arma con piezas que la ficha ya pide (B.16), la versión **Reto** (40–60 s + una pregunta a otro niño, Fase 1 §11.5), los **roles** para cada niño, el ensayo desde la S7 y la lectura y comprensión en la sala (E.5).

### F.1 Consigna (NIÑO y FAMILIA · va en el cuaderno de la S7)

> **Texto para el niño**
>
> **¡Tu show en coreano! · 우리 반 발표회**
> El **lunes 7 de diciembre** tu familia entra a Zoom para verte. Vas a presentarte **en coreano**, con tu cartel en las manos, durante unos **40 segundos**. ¡No es un examen! Es tu show.
>
> **Tu cartel** (ya lo tienes casi listo): ① tu nombre en 한글 · tu edad · ② tu animal favorito · ③ tu familia · ④ tu comida favorita.
>
> **Tu guion** (lo dices mirando tu cartel):
> 1. (reverencia) 안녕하세요!
> 2. 저는 ___예요 / 이에요.
> 3. ___ 살이에요.
> 4. 우리 가족이에요! 우리 ___예요!
> 5. ___예요! (tu animal) — *Reto:* 저는 ___ 좋아해요.
> 6. 저는 ___ 좋아해요. 맛있어요!
> 7. *Reto:* ___, 뭐 좋아해요? (le preguntas a un compañero)
> 8. 감사합니다! (reverencia)
>
> **Antes del show**, con Jay o Abby en tu sala, vas a leer 5 palabras en 한글 y a mostrar con dibujos lo que te dicen. ¡Ya lo sabes hacer!
> **Cómo lo preparas:** di tu guion **3 veces** esta semana, una frente a alguien de tu casa. Si te quedas en blanco en el show, mira tu cartel: ¡para eso está!
> **Tu rol en el show:** además de presentarte, tienes una tarea especial (te la damos en la clase 7).

### F.2 Lenguaje esperado (PROFE)

| Parte del guion | Estructura | Semana | Ejemplo |
|---|---|---|---|
| Saludo | Fórmula + reverencia | S1 | 안녕하세요! |
| Nombre | 저는 ___이에요/예요 | S2 | 저는 발렌티나예요. · 저는 다니엘이에요. |
| Edad | ___ 살이에요 (한/두/세/네) | S6 | 아홉 살이에요. · 열두 살이에요. · 열네 살이에요. |
| Familia | 우리 + N이에요/예요 | S5 (+ S4) | 우리 가족이에요! 우리 할머니예요! |
| Animal | N이에요/예요 · (Reto) N 좋아해요 | S4 · S7 | 토끼예요! · 저는 토끼 좋아해요. |
| Comida | N 좋아해요 + 맛있어요 | S7 | 저는 떡볶이 좋아해요. 맛있어요! |
| Pregunta (Reto) | 뭐 좋아해요? | S7 | 마테오, 뭐 좋아해요? |
| Cierre | Fórmula + reverencia | S1 | 감사합니다! |
| Público | Fórmulas | S8 | 박수! 잘했어요! 화이팅! |

### F.3 Criterios (PROFE)

**Mínimo esperado (Explorador):** saluda con reverencia · dice su nombre y su edad · dice al menos 2 de las 3 piezas del cartel (familia, animal, comida) · cierra con 감사합니다 · se le entiende con un oyente amable · puede mirar el cartel y recibir un "empujón" (el profe dice la primera sílaba). **Reto:** lo anterior en 40–60 s, con 2 gustos con 좋아해요 y una pregunta a otro niño, mirando el cartel solo si se queda en blanco. **Lectura:** lee al menos 3 de 5 palabras (con 받침 incluidas en Reto). **Comprensión:** señala al menos 3 de 5. **No se evalúa:** la gramática fina (이에요/예요, 을/를), la velocidad ni los nervios.

### F.4 Modelos (PROFE · en la S7 se muestran completos con el cartel de Jay; Abby los graba para la nota a la familia)

**Modelo Explorador** (Sofía, 9 años · ~35 s):

| Coreano | Español |
|---|---|
| (reverencia) 안녕하세요! | ¡Hola! |
| 저는 소피아예요. | Yo soy Sofía. |
| 아홉 살이에요. | Tengo nueve años. |
| 우리 가족이에요! 우리 엄마예요! 우리 강아지예요! | ¡Es mi familia! ¡Es mi mamá! ¡Es mi perrito! |
| 호랑이예요! 어흥! | ¡Es un tigre! ¡Grrr! |
| 저는 김밥 좋아해요. 맛있어요! | Me gusta el kimbap. ¡Es rico! |
| 감사합니다! (reverencia) | ¡Gracias! |

**Modelo Reto** (Tomás, 13 años · ~50 s):

| Coreano | Español |
|---|---|
| (reverencia) 안녕하세요! 저는 토마스예요. | ¡Hola! Yo soy Tomás. |
| 열세 살이에요. | Tengo trece años. |
| 우리 가족이에요. 우리 아빠예요. 우리 형이에요. 이분은 우리 할머니예요. | Es mi familia. Es mi papá. Es mi hermano mayor. Ella es mi abuela. |
| 저는 호랑이 좋아해요. 어흥! | Me gusta el tigre. ¡Grrr! |
| 저는 떡볶이 좋아해요. 매워요! 맛있어요! | Me gusta el tteokbokki. ¡Pica! ¡Es rico! |
| 김치 안 좋아해요. | No me gusta el kimchi. |
| 마테오, 뭐 좋아해요? — (Mateo: 저는 라면 좋아해요!) | Mateo, ¿qué te gusta? — (¡Me gusta el ramen!) |
| 감사합니다! (reverencia) | ¡Gracias! |

Notas para Jay: 이분은… es el agregado Reto de la S5. Si un niño de Reto prefiere no hablar de su familia, cambia la pieza ③ por una segunda comida o un segundo animal (nadie está obligado a mostrar su familia).

### F.5 Guion del show, roles y logística del día (PROFE)

**Antes:** S7 (lun 30 nov): consigna, modelo, roles y primer ensayo (últimos 8 minutos de la sala) · lun 30 nov en la noche: invitación a las familias (F.6) · semana del 30 nov: cada familia manda, **por privado**, un audio o video del ensayo; Jay y Abby responden con una nota de voz (una sola cosa a mejorar) · vie 4 dic: orden del show y lista de roles en la planilla · dom 6 dic: recordatorio a las familias.

**Roles (uno por niño; se reparten en la S7; si hay menos de 12, se juntan):**

| Rol | Quién (sugerido) | Qué dice o hace |
|---|---|---|
| 2 **presentadores** | Reto | Abren (안녕하세요! 우리 반 발표회, 시작!) y llaman a cada niño (소피아! 박수!) |
| **Guardián del tiempo** | Reto | Muestra las tarjetas **시작** y **끝** |
| **DJ del canto** | Reto | Dirige el 안녕 노래 de apertura con Abby |
| **Líder de los números** | Reto o Explorador | Dirige el canto de los números con las familias |
| **Capitán del 손하트** | Reto | Cuenta 하나, 둘, 셋 — 사랑해요! para la foto de manos |
| **Líder de la reverencia** | Explorador | Da la señal del primer 안녕하세요 de todo el grupo |
| 2 **aplausómetros** | Explorador | Guían 박수! y 잘했어요! después de cada presentación |
| 2 **asistentes del certificado** | Explorador | Dicen 축하해요! junto con Abby |
| **Voz del cierre** | Explorador | Cierra el show: 감사합니다! 안녕히 계세요! |

**El día (lun 7 dic · 18:00–19:00 Chile · 06:00–07:00 del mar 8 en Corea):**

| Hora | Qué pasa | Quién |
|---|---|---|
| 18:00–18:04 | Solo los niños: 안녕 노래, "hoy nadie se equivoca: todo es aplauso", orden del show en pantalla | Abby canta · Jay |
| 18:04–18:20 | **Salas** (Explorador con Jay · Reto con Abby): **lectura de 5 palabras** (el niño dice un número del 1 al 15 y lee la tarjeta de ese número) + **5 preguntas con dibujos** (en su hoja de dibujos del cuaderno: "호랑이!" → señala; "셋!" → tres dedos) ≈ 1 minuto por niño, con el resto de la sala mirando y aplaudiendo · **ensayo general** con una última corrección suave (publicado) | Cada profe con su planilla (F.7) |
| 18:20–18:24 | Todos a la sala principal · Jay admite a las familias desde la sala de espera (se conectan desde las 18:15) · spotlight del orden | Jay |
| 18:24–18:27 | Bienvenida: Jay (español, 1 minuto: qué van a ver, reglas de privacidad) y Abby (coreano, con Jay traduciendo) · los presentadores abren | Jay · Abby · presentadores |
| 18:27–18:44 | **12 presentaciones** (≈ 80 s cada una con el aplauso y el cambio de spotlight), alternando Explorador y Reto; los más tímidos, ni primeros ni últimos | Presentadores · guardián del tiempo · aplausómetros |
| 18:44–18:47 | Canto de los números **con las familias** (ellas cuentan también) | Líder de los números · Abby |
| 18:47–18:55 | Certificados / diplomas en pantalla, uno por uno: "○○, 축하해요!" — 감사합니다! — 박수! **[regla del certificado: pendiente de decisión de Jay]** | Abby · Jay · asistentes |
| 18:55–19:00 | **Foto de manos** con 손하트 (cámaras a las manos) · canto de la despedida · 감사합니다! 안녕히 계세요! · Jay: una línea sobre Niños 2 ("fechas: las confirmamos por el grupo") | Capitán · voz del cierre · Jay |

**Reglas del día:** cámaras encendidas para los niños; las familias pueden apagar la suya · la clase se graba como siempre (solo para el grupo); **las familias no graban ni capturan** · si un niño se desconecta durante su turno, pasa al final · si un niño no quiere presentar solo, lo hace **junto a Abby** (ella dice la primera sílaba de cada línea) · ningún comentario de corrección delante de las familias.

### F.6 Textos para las familias (los manda Jay)

**Aviso del formato (con la nota de la S6, lun 23 nov) · DECISIÓN DE JAY 2:**
> **Texto para la familia** · ¡Hola, familias! Una buena noticia sobre el show del lunes 7 de diciembre: la **lectura de 5 palabras** y las **preguntas con dibujos** las haremos en las salas con Jay y Abby, **antes de que ustedes entren**. Frente a ustedes, cada niño hará **su presentación con su cartel**. Así los chicos están más tranquilos y el show dura lo justo. 화이팅!

**Invitación (lun 30 nov, después de la clase 7):**
> **Texto para la familia** · 🎤 **¡Están invitados al show de Coreano para Niños!** · **Lunes 7 de diciembre**, mismo link de Zoom de siempre.
> • **Los niños entran a las 18:00** (hora de Chile), como siempre: los primeros 20 minutos se preparan con Jay y Abby.
> • **Las familias entran a las 18:20**: los dejamos pasar desde la sala de espera. Pueden sentarse junto a su hijo o hija o conectarse desde otro dispositivo (solo con el nombre en pantalla). ¿Abuelos o tíos en otra ciudad? Compartan el link **solo con la familia**.
> • El show dura unos 35 minutos: cada niño se presenta en coreano con su cartel y recibe su diploma en pantalla.
> • **Tres pedidos:** (1) no graben ni saquen capturas donde aparezcan otros niños (la academia graba la clase solo para el grupo); (2) hoy solo valen los aplausos: nada de correcciones; (3) si su hijo o hija no puede ese día, avísennos antes.
> ¡Los esperamos! 감사합니다 🐯 — Jay y Abby

### F.7 Rúbrica para los profes (PROFE · los 3 criterios simplificados del kit de Abby: 이해 · 참여 · 발음)

| Criterio | Destacas | Lo logras | En camino | Empezando |
|---|---|---|---|---|
| **Comprensión (이해)** · 5 preguntas con dibujos + las instrucciones del día | 5/5 sin repetir | 4/5 o 5/5 con una repetición | 3/5 o con gesto de ayuda | Menos de 3, aun con ayuda |
| **Participación (참여)** · se atreve | Presenta todo el guion con voz clara, mira a la cámara, usa el cartel; en Reto, hace la pregunta | Presenta el guion con 1–2 pausas o un "empujón" | Presenta partes, con ayuda del profe | Presenta junto a Abby o solo el saludo |
| **Pronunciación (발음)** | Vocales, 받침 y ㄹ bien; su nombre a la coreana | Se le entiende todo; 1–2 sonidos del español | Se le entiende con esfuerzo en algunas palabras | Cuesta entenderle |
| **Lectura** (registro, no criterio) | 5/5 | 4/5 | 3/5 | Menos de 3 |

**Para la familia no hay puntaje:** la rúbrica ordena la nota final de 3 líneas (E.6), que empieza siempre por lo que el niño logró. En el registro, "Lo logras" o "Destacas" en participación + haber presentado = **show completo** para el logro 10 del tablero.

---

## G. Biblioteca de materiales de Coreano para Niños

### G.1 Lo que ya existe (verificado en el repo y en la PC de Jay el 27 sept; lo de `D:\Deskotop to D\` es **solo lectura**: no se mueve ni se modifica)

| Archivo | Qué es | Sirve para | Veredicto |
|---|---|---|---|
| `Programa_Completo_Octubre_2026/fuente/cursos_es.json` (ninos) · `public/programas/Programa_Ninos_Octubre_2026.pdf` y `.docx` · `Curriculo/publico/Programa_Ninos.md` | Syllabus y programa publicados | Fuente de todo este diseño | **Manda**; no se edita en octubre (cambios: anexo I) |
| `Lanzamiento_Octubre_2026/alumnos/Guia_Familias_Ninos_Octubre_2026.docx` y `.pdf` (generador `Lanzamiento_Octubre_2026/fuente/make_guias_alumnos.js`, función `guiaFamilias`) | Guía para familias (15 secciones: rol del apoderado, privacidad, tareas, certificado, fechas) | Tono y reglas de familia; D.4 y E.2 salen de aquí | **Usar**. Su texto del certificado es una de las versiones de E.2 |
| `Lanzamiento_Octubre_2026/profes/Kit_Abby_Conversacional_Ninos_KO.pdf` (generador `make_kits_profes.js`, `NIN_KO`) · `profes/Mensajes_Kiran_Abby.md` (mensaje 3.4: primera clase de Niños, lun 19 oct 10:00 Chile) | Kit de Abby en coreano con la parte de Niños (roles, 60 min, tareas, nota a la familia, evaluación) | Base del bloque 🇰🇷 de las guías (B.13) | **Usar**, avisándole las diferencias (ver "Discrepancias con el kit de Abby") |
| Lector (`public/lector-coreano/index.html`) | Alfabeto, Aprender 1–8, Practicar (9 modos), Progreso, con audio | Misión semanal (destinos exactos de B) | **Usar** con la regla "primero el sonido" (D.2) |
| Dubu (`public/dubu/index.html`) | 30 niveles en 6 barrios, que se abren en orden | Misión semanal (B.0) | **Usar** en el orden de los barrios; tocar 🔊 primero |
| `/generador-nombre` (`app/generador-nombre/page.tsx`) | Transliteración español → 한글 | Tarjetas de nombre (D.3) y extra de la S2 | **Usar**; Jay valida cada nombre |
| `/taller` (YouTube `zmbuLPcgfpw`, desde el segundo 2414) | Clase grabada de Hangul para adultos | Para las familias que quieran entender la S1 | **Opcional** (Fase 1 §14.2: "para las familias en la semana 0") |
| Blog: `/blog/hangul-el-alfabeto-mas-cientifico` · `/blog/dangun-por-que-corea-nacio-de-una-osa` | Artículos en español | Cuentos de la S2 y la S4 (para las familias y Reto) | **Enlazar** en la nota |
| `public/audio/kr/` (1.124 clips) + `Curriculo/audio/Clips_Octubre_2026.md` | Audio SunHi | 🔊 del cuaderno y de C | **Usar**: 76 de 125 filas completas; faltan 65 (G.4) |
| `A1_Nivel_1/Hoja_Practica_Hangul_A1.pdf` (fuente `A1_Nivel_1/fuente/Hoja_Practica_Hangul_A1.html`) | Hoja de trazo corregida (26 sept) + página "Tu nombre en 한글" | Trazo de vocales (S1) y consonantes y nombre (S2) | **Adaptar** para niños: letra más grande, colores del Lector, sin encabezado de Básico 1 |
| `Curriculo/Fase2_Basico1/alumnos/S01_Material_Alumno.md` §3.5 | Tabla "Tu nombre en 한글" + 40 nombres frecuentes | Tarjetas de nombre (D.3) | **Reutilizar** (versión profe; al niño le llega su tarjeta hecha) |
| `A1_Nivel_1/Academia_Seul_Hangul_A1_126.pptx` · `01_Hangul_Vocales/Hangul_Deck_Cap1-2.pptx` · `02_Hangul_Consonantes_Batchim/Hangul_Deck_Cap3-4.pptx` | Decks de Hangul de adultos (90 min) | Ilustraciones de letras | **Consultar** solo imágenes; traen romanización y ritmo de adultos |
| `A1_Nivel_1/Parte 1 - historia de hangul.pptx` | Historia del Hangul | Retrato de Sejong para el cuento de la S2 | **Usar** 2–3 láminas |
| `A1_Nivel_1/200_Flashcards_Coreano_A1.xlsx` | 230 tarjetas | Memorice de la S4 y la S7 | **Filtrar** las palabras de C y ocultar la romanización |
| `public/Guia_Alfabeto_Coreano_Hangul.pdf` · `public/pronunciacion-coreana-academia-seul.pdf` | Guías de adultos | Para la familia que quiera más | **Opcional**, solo para adultos |
| `D:\Deskotop to D\Academia Seul\4.Sello\` (`Sello-Academia Seúl.ai`) · `5.Elementos Gráficos\` (Patrones, Íconos) | Sello del tigre (versión 2 sin marco) y gráficos de marca | Tablero, cartel, portada del cuaderno, diploma | **Usar** (acento azul `#4236F6`) |
| `D:\…\Academia Seul\Sky Earth Human.pptx` | Presentación sobre cielo, tierra y persona (천지인) | Cuento de la S1 | **Consultar** (sin revisar en detalle) |
| `D:\…\Academia Seul\한글 01 - 모음[1].docx` / `.pdf` · `한글 음절 모아쓰기.pptx` | Clase trilingüe de vocales; armado de sílabas | Ideas para las láminas de la S1–S3 | **Consultar**: la de vocales trae texto en color coral (`FE6768`) y las grafías *Hangeul / Hanguel*: no reutilizar sin pasar a azul y sin letras latinas |
| `D:\…\Academia Seul\한글을 만든 원리 책.docx` | Texto largo en coreano sobre el principio del Hangul | Fondo para Jay y Abby (cuentos S1–S3) | **Solo referencia**; no es material para niños |
| `D:\…\Academia Seul\Programa_Infantil_A1_Propuesta.docx` (julio) | Propuesta de 3 grupos (5–6, 7–9, 10–12) con otro precio y otra profe | Antecedente | **No aplica**: rango, precio y profes distintos; su idea de "testimonio/foto" de las familias choca con la política de no publicar caras |
| `D:\…\Academia Seul\First Class  자음.docx` | Casi vacío (solo el encabezado) | — | No sirve |
| **Material de clase de Niños** (láminas, bingos, tarjetas, canciones, tablero, cartel) | — | Las 8 clases | **No existe** (Fase 1 §15 #16): hay que producirlo (G.2) |

### G.2 Lo que hay que producir (P0 = antes del **vie 9 oct** · P1 = regla N−2: el material de la semana N está listo al cierre de la semana N−2)

Jay no produce: revisa y aprueba (Fase 1 §14.4). Abby revisa el coreano de canciones, láminas y su bloque. Reglas para todo lo visual: plantilla de la casa, acento azul `#4236F6`, cabeceras navy `#003478`, colores del 한글 (azul / dorado / verde), **nunca rojo** (tampoco en "incorrecto", cruces ni semáforos), sin romanización para el niño, dibujos propios o con licencia libre, **ninguna cara de niño real**, nada de imágenes con derechos (la mascota 호돌이 se describe o se dibuja un tigre propio, ⚑ N-6).

| Prioridad | Pieza | Dónde va | Plazo |
|---|---|---|---|
| **P0** | **Kit de la S1** (Fase 1, decisión 2): guía `profes/S01_Guia_Profesor.md` con el bloque 🇰🇷 · cuaderno `alumnos/S01_Material_Alumno.md` · láminas (bienvenida, reglas de Zoom y efecto espejo, "¿qué palabras coreanas conoces?", "¿alguien lo puede leer?" 안녕 / 한국, las 6 vocales con color y dibujo, el cuento del cielo, la tierra y la persona) · cartones de bingo de vocales (Explorador con dibujo · Reto con 아이/오이) · lámina de vocales para colorear | Repo + Drive | **Borrador vie 2 oct · final vie 9 oct** |
| **P0** | **Canción del saludo y canto de despedida**: letra validada por Abby (⚑ D-2, D-4) + audio de Abby (20–30 s, solo su voz) | Drive + cuaderno | vie 9 oct |
| **P0** | **Tablero de progreso** en 2 diseños (stickers · sellos) con los 10 logros de E.3 + **hoja de stickers** para colorear y recortar | `alumnos/N_Tablero.md` → PDF | vie 9 oct |
| **P0** | **Planilla del curso**: asistencia en vivo / grabación + tarea (columnas separadas) · 3 indicadores × 8 semanas · 10 logros · show (en vivo / video) · lectura n/5 · comprensión n/5 · mapa del grupo (B0.2) | Drive | vie 9 oct |
| **P0** | **Mensaje de privacidad a los apoderados** (D.4) y **reparto de la nota semanal** (B.15) aprobados por Jay | Grupo de apoderados (con la bienvenida del lun 12 oct) | lun 12 oct |
| **P0** | **Zoom probado con dos dispositivos**: salas preasignadas, chat "solo en público", sala de espera, grabación, efecto espejo (⚑ N-3, N-4, N-5) | Jay | vie 9 oct |
| **P0** | **Clips de la S1 y la S2** (10 de los 65, G.4) generados y **publicados** (push a `main`) | `public/audio/kr` | lun 12 oct |
| **P0** | Plantilla de las **tarjetas de nombre** (D.3) | Drive | vie 9 oct (las tarjetas, jue 22 oct) |
| P1 | **S2:** guía y cuaderno (tarjetas de letras para recortar, hoja del nombre decorable), láminas (10 consonantes con dibujo, la fábrica, el cuento de Sejong), **tarjetas de nombre** con la frase completa | Repo + Drive | vie 16 oct · tarjetas jue 22 oct |
| P1 | **S3:** cartones de bingo de 9 sílabas (dos versiones), tarjetas de la carrera del 받침, láminas de "actúa la palabra" y del 첫눈 | idem | vie 23 oct |
| P1 | **S4:** 12 cartas de memorice (dibujos + 한글; Reto solo palabras), láminas de los 10 animales (dibujos propios), cuento del oso y el tigre (4 láminas) | idem | vie 30 oct |
| P1 | **S5:** árbol de familia vacío (pizarra) y plantilla del árbol en el cuaderno, canto de la familia (audio de Abby), lámina de 언니/오빠/누나/형 | idem | vie 6 nov |
| P1 | **S6:** tarjeta de edades (8 a 15), tarjeta "para curiosos", cartas de números 1–15, canto de los números (audio de Abby) | idem | vie 13 nov |
| P1 | **S7:** fotos de comidas (licencia libre), consigna del show (F.1), guion en dibujos (Explorador) y en 한글 (Reto), lista de roles (F.5), invitación (F.6) | idem · `alumnos/N_Cartel_Show.md` · `profes/N_Show_Profe.md` | vie 20 nov |
| P1 | **S8:** 15 tarjetas numeradas con las palabras de la lectura al azar, hoja de dibujos para las 5 preguntas, tarjetas 시작 / 끝, diploma del show, orden del show | idem | vie 27 nov |
| P1 | **Plantilla del certificado** (con la regla que decida Jay) | Jay | antes del lun 30 nov |
| P1 | Plantilla del **chequeo de mitad** (3 líneas, E.4) | `profes/N_Chequeo_Mitad.md` | vie 6 nov |
| P1 | **Notas de voz de Abby** con la frase de la semana (B.15) | Grupo de apoderados | dentro de las 24 h de cada clase |
| P1 | Los otros **55 clips** (G.4) | `public/audio/kr` + push | con la guía de su semana (N−2) |
| P2 [ENE] | Niños 2 (syllabus y materiales), canciones grabadas en estudio, audio del vocabulario con la voz de Abby | — | Anexo I |

*No se producen:* los dibujos, carteles, audios y videos de los niños (son suyos y quedan en la carpeta privada del curso) · las fotos personales de Abby (las elige ella, ⚑ D-29).

### G.3 Carpetas, nombres y estructura común

- `Curriculo/Fase7_Ninos/00_Diseno_Ninos.md` · este documento (interno).
- `Curriculo/Fase7_Ninos/profes/S0N_Guia_Profesor.md` · la guía de cada semana, **en español**, con el bloque **AB. 🇰🇷 Abby를 위한 요약** en coreano. Piezas transversales: `profes/N_<Pieza>.md` (p. ej., `N_Mapa_Grupo.md`, `N_Show_Profe.md`, `N_Chequeo_Mitad.md`, `N_Clips_Pendientes.md`).
- `Curriculo/Fase7_Ninos/alumnos/S0N_Material_Alumno.md` · el **Cuaderno de actividades** de cada semana, para el niño, con el recuadro "Para la familia". **Sin respuestas, claves, tiempos ni notas de los profes.** Piezas transversales: `alumnos/N_<Pieza>.md` (p. ej., `N_Tablero.md`, `N_Cartel_Show.md`, `N_Canciones.md`).
- **Estructura de las guías (la de Básico 2, adaptada):** *0. En una mirada · A. Ficha de la semana (los 17 campos del brief §9) · B. Plan de clase minuto a minuto (18:00–19:00 Chile = 06:00–07:00 Corea; columnas: sala principal · Jay · Abby · sala Explorador · sala Reto) · **AB. 🇰🇷 Abby를 위한 요약** (formato de B.13) · C. Guía de los profes (C.1 Objetivo · C.2 Checklist, con privacidad y Zoom · C.3 Secuencia exacta: lo que dice Jay · C.4 Cada frase en 4 pasos R-C-G-L · C.5 Explicaciones para niños (8–11 y 12–15) · C.6 Pronunciación con gesto · C.7 Errores típicos y cómo corregirlos jugando · C.8 Mini-historia o diálogo modelo original · C.9 Preguntas para el grupo · C.10 Explorador y Reto · C.11 Juego de emergencia · C.12 Si vas atrasado · C.13 Plan B técnico · C.14 Evaluación de la semana (quiz-juego, 3 indicadores, logro) · C.15 Nota semanal a la familia, lista para pegar · C.16 Clave · C.17 Guion de láminas) · D. ⚑ Para revisar con nativo y pendientes · E. Anexo "Enero 2027"*.
- **Estructura del cuaderno (las 10 secciones de Básico 2, en versión niños):** *1. Esta semana voy a poder decir… · 2. Mis palabras (한글 grande + dibujo + 🔊) · 3. ¿Cómo funciona? (la explicación con dibujos) · 4. ¿Cómo suena? (pistas con palabras del español + 🔊) · 5. Mini-historia (viñetas con la frase de la semana) · 6. ¡A jugar! (dibujar, recortar, unir, colorear, laberintos, sopas de sílabas) · 7. En clase (tarjeta de sala 🌱 Explorador / ⭐ Reto + letra del canto) · 8. Corea de cerca (la cultura con su frase ancla) · 9. Mi misión de la semana (10 minutos × 3 días con el destino exacto + la pieza del cartel + el audio) · 10. ¡Ya puedo decir! (autoevaluación con caritas o sellos) · **Para la familia** (qué aprendimos · cómo practicar 10 minutos en casa con el Lector y Dubu · frase de la semana con 🔊 y romanización gris · qué enviar y por dónde).*
- **Dos versiones en un solo cuaderno:** las actividades marcadas **🌱 Explorador** y **⭐ Reto** conviven en la misma página; el niño hace la suya y puede probar la otra.
- **Audio en los cuadernos:** 🔊 fila por fila en la sección 2 (solo clips existentes; los pendientes se enlazan cuando se publiquen) y las 3 frases de la sección 10.
- **Drive:** la convención del kit de Abby para grabaciones y PDFs (`Ninos_S01_2026-10-20`, con la fecha de Corea).

### G.4 Clips de audio pendientes (65)

Se generan con el mismo pipeline de la Audioteca (voz ko-KR-SunHiNeural, −8 %, MP3; nombre = hex del UTF-8 del texto, sin el punto ni el "!" final y con el "?" incluido: `Curriculo/audio/Clips_Octubre_2026.md`) y **se publican con un push a `main`**. Hasta entonces, los 🔊 de esas filas no se enlazan en los cuadernos. Si un ⚑ cambia una frase, se genera el clip nuevo.

| Semana | Clips que faltan | N.º |
|---|---|---|
| S1 | 다시 · 친구들 · 다음 주에 만나요 | 3 |
| S2 | 다리 · 나비 · 이름이 뭐예요? · 저는 소피아예요 · 저는 다니엘이에요 · 가위바위보 · 세종대왕 | 7 |
| S3 | 발 · 김 · 받침 · 첫눈 | 4 |
| S4 | 동물 · 토끼 · 호랑이 · 물고기 · 코끼리 · 돼지 · 사자 · 이거 뭐예요? · 곰이에요 · 토끼예요 · 호랑이예요 · 멍멍 · 야옹 · 꿀꿀 · 어흥 · 호돌이 | 16 |
| S5 | 우리 가족이에요 · 우리 강아지예요 · 이 사람은 우리 엄마예요 · 이분은 우리 할머니예요 · 엄마 이름이 뭐예요? · 이모 · 삼촌 | 7 |
| S6 | 저는 열 살이에요 · 저는 열세 살이에요 · 여덟 살 · 아홉 살 · 열 살 · 열한 살 · 열두 살 · 열세 살 · 열네 살 · 열다섯 살 · 마테오는 열 살이에요 · 돌 · 돌잡이 · 가라사대 | 14 |
| S7 | 김밥 · 주스 · 맛있어요 · 매워요 · 저는 김밥 좋아해요 · 뭐 좋아해요? · 네, 좋아해요 · 김치 안 좋아해요 | 8 |
| S8 | 박수 · 시작 · 끝 · 사랑해요 · 손하트 · 우리 반 발표회 | 6 |

---

## H. Control de calidad (brief §22) aplicado a Coreano para Niños

| Criterio | Estado en este diseño | Pendiente para los redactores |
|---|---|---|
| **Coreano correcto y natural** | Todo en fórmulas de 해요체 con los profes; 안녕 y 반가워 solo entre niños; se corrige el "이 사람은 우리 엄마예요" publicado (→ 우리 엄마예요!); los dudosos llevan ⚑ (27 de coreano o de cultura y 10 de otro tipo, al final) | Abby revisa canciones, láminas y su bloque antes del N−2 |
| **Nivel adecuado** | Un patrón nuevo por clase como máximo (B.10); nada de conjugación, sino-coreanos, hora ni partículas explicadas; las letras "con aire" y "tensas", solo de oído | Revisar que no "se escape" nada (típico: 을/를 explicado, 먹어요, 있어요, 몇 학년이에요?) |
| **Adecuado a la edad** | Dos bandas con la misma meta; roles de estatus para 12–15; tono que no infantiliza; cambio de actividad cada 8–12 minutos con señales fijas | Cada juego con versión 🌱 y ⭐; nada de "campeón" a un chico de 14 |
| **Español correcto** | Neutro latinoamericano, con puentes de Chile y la región (tía/tío, empanadas, Fiestas Patrias) | Frases cortas, para leer en voz alta a un niño de 8 |
| **Cultura precisa y sin estereotipos** | Matices [YA] de la Fase 1 §10.5 (안녕, 이 사람, kimchi, 손하트) incorporados; 김장 con su capa regional; familias diversas; nadie obligado a que le guste el 김치; nada de *El juego del calamar* | "Muchas familias", "algunos niños", "en Seúl"; nunca "los coreanos" + verbo |
| **Calidad pedagógica** | Ciclo R-C-G-L por semana con "¡Tu turno!"; cada tarea prepara la siguiente (nombre → tarjetas de letras → peluche → dibujo de la familia → edad de alguien → comida → cartel → show) | Marcar las 4 etapas en C.4 |
| **¿El niño habla coreano en clase?** | ≥ 8 veces por clase, ≥ 3 turnos individuales en la sala, "¡Tu turno!" de 2 minutos, coro de cierre | La sala siempre termina con voz, no con papel |
| **Carga cognitiva** | La S2 (10 consonantes) y la S3 (받침) sin frases nuevas extra; misión de 10 minutos × 3 días | Una sola pieza del cartel por semana |
| **Continuidad** | Tabla de B.10: todo lo que se adelanta está marcado (아이/오이, 사람, 사랑해요, 잘했어요, 하나 둘 셋 como señal) | Usar C hasta tu semana |
| **Autenticidad** | Frases que un niño coreano dice: 가위바위보!, 맛있어요!, 매워요!, 어흥!, 몇 살이에요? | Preferir lo que se dice de verdad a lo "de libro" |
| **Privacidad de menores** | D.4 aplicada en cada semana (dibujo de la familia, videos por privado, foto de manos, salas con ≥ 2 niños) | C.2 de cada guía la repite como checklist |
| **Nunca rojo · sin romanización para el niño** | Indicadores ● ◐ ○; colores del 한글 azul/dorado/verde; romanización solo en el recuadro de la familia | Revisar cada lámina reutilizada de adultos |

---

## I. Anexo "Enero 2027": cambios recomendados que NO se aplican en octubre

Todo esto cambiaría lo publicado (ficha, PDFs, Guía para familias, términos o herramientas). Requiere aprobación de Jay; el bloque 1 va **antes de la preventa del lun 7 dic** (Fase 1 §16.2).

| # | Cambio | Fuente | Por qué no en octubre |
|---|---|---|---|
| 1 | **Bandas desde enero:** un grupo 8–15 con pistas, o **Niños (8–11) + Teens (12–15)** si en octubre hubo 3 o más inscritos de 12–15 (el mapa del grupo lo dirá); nombre coreano para los mayores (어린이 les suena infantil) | Fase 1 §16.2 #12a, decisión 9 | Nombre y oferta publicados |
| 2 | **Niños 2** (prometido para enero, sin syllabus): el esqueleto de la Fase 1 §4.9, ajustado a cómo termina este curso: S1 reencuentro con el cartel y 몇 학년이야? · S2 las letras "con aire" y "tensas" (que en octubre se jugaron de oído en Gwangjang) · S3 el colegio con 있어요/없어요 · S4 설날 según la fecha real (⚑ con inicio el lun 11 ene, la clase del lun 8 feb cae el mar 9 en Corea, feriado del 설날: revisarlo con Abby) · S5 -아요 con 4–8 verbos · S6 la tienda (sino-coreanos, 원, 얼마예요?, 주세요) · S7 cuento 호랑이와 곶감 · S8 Show 2 | Fase 1 §4.9, §16.2 #12a | Curso nuevo; la venta abre ~la 1.ª semana de diciembre |
| 3 | **Certificado de Niños:** asistencia + show (en vivo o por video), **sin stickers como requisito**; pasaporte 한글 + audio antes/después + informe de 5 líneas; términos §6 actualizados | Fase 1 §11.3, §16.2 #12b | Política pública |
| 4 | **Regla de edad en 14** para los cursos de adultos + protocolo para menores en grupos de adultos (FAQ y Guía para familias dicen 13; privacidad dice 14) | Fase 1 §12, decisión 10 | Textos legales y FAQ |
| 5 | **Política escrita de privacidad de Niños:** plazo de borrado de las grabaciones, consentimiento para grabar a menores (⚑ Ley 21.719), álbum eliminado o solo carpeta, videos por privado | Fase 1 §15 #15, decisión 13 | Términos y Guía para familias |
| 6 | **Ficha `ninos` corregida:** 이 사람은 우리 엄마예요 → 우리 엄마예요 · kimchi "en casi todas las comidas" → matiz · "el 손하트 nació en Corea" → matiz · S5 "foto o dibujo" → dibujo · S6 juego que elimina → "el juez" · S6 edad "11 y 12" → hasta 15 · S6 tarea "edad de 2 personas de tu familia" → ≤ 15 o tarjeta "para curiosos" · S6 "Practicar → Números" → explorador de Aprender 7 · Contrarreloj fuera de las tareas · S8 foto grupal → foto de manos · S8 "álbum" → carpeta · formato del show (lectura y comprensión en la sala) · regenerar el PDF y el Programa Completo ES/EN | Fase 1 §10.5, §15 #12, #15, #33 | Textos publicados |
| 7 | **Tarea y ritmo con un solo número:** misión de 10 minutos × 3 días + pieza + audio (hoy la ficha dice "≈ 20 minutos, 3 o 4 días, unas 2 horas", el programa público "unos 10 minutos" y el kit de Abby "하루 약 20분"); ritmo "cada 8–12 minutos" en todos los textos | Fase 1 §11.6, §15 #42 | Cambia la ficha y la guía |
| 8 | **Versión Reto con mini-explicaciones:** 이에요/예요 como regla, 을/를 y el 받침 que "se corta" (ㄱ, ㅂ, ㄷ) | Fase 1 §4.9 | Cambia contenidos publicados |
| 9 | **Lector "modo niños"** (sin romanización, elegir modo y grupo, un grupo de solo 6 vocales, pictogramas de animales y familia) · **Dubu** con interruptor de romanización y "modo niños" (Río Han sin exigir Gwangjang) | Fase 1 §7.4, §16.3 [2027] | Cambia código |
| 10 | **Audio propio:** canciones grabadas en estudio con Abby, el vocabulario con su voz, frases clave "lentas" | Fase 1 §9.3 | Producción larga |
| 11 | **반말 entre pares** como contenido para 12–15 (¿es adecuado para la academia?) y tabla de grados (몇 학년이야? — un 8.º básico chileno ≈ 중학교 2학년) | Fase 1 §15.1 | Decisión editorial y curso nuevo |
| 12 | **Kit de Abby actualizado** (certificado, tarea, Dubu, privacidad) con las diferencias de abajo | Este diseño | Documento entregado |

---

## Decisiones que este diseño necesita de Jay

| # | Decisión | Recomendación | Plazo |
|---|---|---|---|
| 0 | Quién produce el kit de Niños (Fase 1, decisión 2) | Producción en borrador, Abby revisa, Jay aprueba: kit de la S1 en borrador el vie 2 oct y final el vie 9 oct | **Antes del jue 1 oct** |
| 1 | Regla del certificado de octubre (E.2: la ficha, la Guía para familias, el programa público y el kit de Abby no coinciden) | La de la **Guía para familias** (6 de 8 en vivo + show), que las familias ya recibieron; registrar todo por separado | Antes del lun 19 oct |
| 2 | Formato del show [YA]: lectura y comprensión en la sala antes de que entren las familias, con aviso escrito (F.6) | Sí | Aviso el **lun 23 nov** (antes de la S7) |
| 3 | Ceremonia y reposición: diploma del show en pantalla para todos + certificado en PDF según la regla; quien falta al show manda su video por privado y hace lectura y preguntas en 10 minutos esa semana | Sí a las dos | Antes del lun 30 nov |
| 4 | Chequeo de mitad: 3 líneas por niño (E.4); fecha y quién escribe | Cada profe las de su sala, con la nota de la S4 (mar 10 nov) | Antes del lun 9 nov |
| 5 | Privacidad (D.4): videos con cara por privado, familia en dibujo, foto de manos, "álbum" = carpeta del curso (Fase 1, decisión 13) + consentimiento para grabar a menores (⚑ N-9) | Sí; mensaje con la bienvenida | **lun 12 oct** (antes de la S1) |
| 6 | Nota semanal: Jay la escribe y la manda; Abby suma una nota de voz de 10 s con la frase de la semana | Sí | Antes del lun 19 oct |
| 7 | Salas por banda (Explorador con Jay · Reto con Abby) y roles de estatus; qué hacer si hay solo 1–2 de 12–15 | Sí (B0.1) | Mapa del grupo, mié 21 oct |
| 8 | Tarea presentada como misión de 10 minutos × 3 días + pieza + audio (lo demás, "extra") | Sí | Con la nota de la S1 |
| 9 | Contrarreloj solo como extra de Reto; en la S6, el explorador de Aprender 7 para Explorador | Sí | Antes del lun 23 nov |
| 10 | Inscritos fuera del rango (menores de 8) y conversación previa con familias de raíces coreanas | Fuera del rango: conversarlo con la familia antes de confirmar; raíces: 5 minutos por WhatsApp | lun 12 oct |
| 11 | Generar y publicar los 65 clips (G.4) | Sí: los 10 de S1–S2 antes del lun 12 oct; el resto con su semana | lun 12 oct y N−2 |
| 12 | Juegos asociados a *El juego del calamar* (무궁화 꽃이 피었습니다) fuera del curso | Fuera en octubre (Fase 1 §10.4) | Cuando puedas |
| 13 | Cómo quiere Abby que los niños la llamen y escriban su nombre (Abby 선생님 / 미영 선생님) | Que lo decida Abby; la tarjeta de ejemplo de la S2 usa 제이 y el nombre que ella elija | vie 9 oct |

## Discrepancias con el kit de Abby: qué avisarle (con la guía de la S1)

| Tema | El kit dice | Este diseño | Qué decirle |
|---|---|---|---|
| Certificado | Regla general (75 %, en vivo o grabación + tarea; 25/25/15/35) | **[regla del certificado: pendiente de decisión de Jay]** (la ficha y la Guía para familias dicen "en vivo") | "La regla de Niños la confirma Jay antes del 19 oct" |
| Tarea | "주 3–4일, 하루 약 20분" | Misión de 10 minutos × 3 días + pieza + audio | La misión es la de la nota semanal |
| Dubu | "어린이반 2–3회차 과제로 추천" | Dubu todas las semanas, en el orden de los barrios (B.0) | Tabla de B.0 |
| Álbum del show | "발표회 영상은 가족의 서면 동의가 있을 때만 학원 앨범에" | Solo la carpeta privada del curso; foto de manos | D.4 |
| Salas | "각자 최대 6명" | Sala Explorador con Jay, **sala Reto (12–15) con Abby** | B0.1 |
| Juegos | "Jay 가라사대", "틀린 사람은…" (sin definir) | **Sin eliminación**: el que se equivoca es juez | B.7 |
| Rúbrica | "간소화(이해 · 참여 · 발음)" | La misma, con descriptores (F.7) | F.7 |

---

## ⚑ Para revisión nativa (Jay; segunda opinión de Abby para canciones, lenguaje de aula y usos actuales)

Todos los ⚑ abiertos de este diseño. Los cuadernos de los niños no llevan ⚑: sus dudas van en la guía de la misma semana. **Plazo:** antes del N−2 de su semana (S1: vie 9 oct · S2: vie 16 oct · S3: vie 23 oct · S4: vie 30 oct · S5: vie 6 nov · S6: vie 13 nov · S7: vie 20 nov · S8: vie 27 nov). Si Jay cambia una frase, se cambia en la guía, en el cuaderno y en C (con su clip nuevo).

### 1 · Coreano y cultura

| # | Sem. | ⚑ | Pregunta | Dónde |
|---|---|---|---|---|
| D-1 | S1 | 안녕 entre compañeros | En un grupo de 8 a 15 años, ¿"안녕 entre amigos" sin más matiz, o se dice que al mayor (un chico de 15) el de 8 le diría 안녕하세요? | B.2 |
| D-2 | todas | Canción del saludo | 안녕 친구 / 반가워 / 꾸벅 인사해요 / 짝짝짝, con la melodía de "Martinillo": ¿natural y cantable? | B.12 |
| D-3 | S2 | 가위바위보 para los turnos | ¿Así deciden los turnos los niños coreanos? (Fase 1 §10.4) | B.3, C |
| D-4 | todas | Despedida | 오늘도 잘했어요! — 감사합니다! 안녕히 계세요! — 안녕! 다음 주에 만나요!: ¿natural en Zoom, donde todos "se van"? | B.2, B.12 |
| D-5 | todas | Lenguaje de aula de Abby | 따라 하세요 · 다시 · 잘 들어 보세요 · 보여 주세요 · 손 들어 주세요 · 마이크 꺼 주세요 · ○○ 차례예요 | D.1 |
| D-6 | S2 | Nombres en 한글 | Cada tarjeta (con el generador y la tabla de Básico 1) · 제이 para Jay · cómo escribe Abby su nombre para los niños | D.3, B.3 |
| D-7 | S2 | Cuento de Sejong | 1443 (creación) y 1446 (presentación) · 세종대왕이 한글을 만들었어요 · el billete de 10.000 wones | B.3, B.12 |
| D-8 | S1 | Cielo, tierra y persona | 하늘, 땅, 사람 como cuento de las vocales (천지인) para niños de 8 | B.2, B.12 |
| D-9 | S3 | "Aprender en una mañana" | La cita del libro antiguo (y "cualquiera, en diez días"), contada a niños | B.4 |
| D-11 | S3 | 첫눈 | ¿Noviembre–diciembre es la época del 첫눈 en Seúl? ¿Lo dice Abby como experiencia? | B.4, C |
| D-12 | S4 | 어흥 | Rugido del tigre en la frase ancla: 호랑이예요! 어흥! | B.5, C |
| D-13 | S5 | 이 사람은 / 우리 / 이분은 | 우리 엄마예요! para la propia familia; 이분은 우리 할머니예요 para Reto; 이 사람은… solo para reconocer | B.6, C |
| D-14 | S6 | 가라사대 | ¿Es el nombre coreano del "Simón dice"? ¿"Abby 가라사대" suena natural? | B.7, C |
| D-15 | S8 | 우리 반 발표회 | Como título del show (y 우리 반 발표회, 시작! de los presentadores) | B.9, F |
| D-16 | — | 무궁화 꽃이 피었습니다 | Excluido en octubre por su asociación con la serie: ¿de acuerdo? | Regla 10 |
| D-17 | todas | Notación [ ] (solo profes) | 감사합니다 [감사함니다] · 여덟 [여덜] · 몇 살 [멷쌀] · 열두 살 [열뚜살] · 열세 살 [열쎄살] · 여덟 살 [여덜쌀] · 맛있어요 [마시써요] · 떡볶이 [떡뽀끼] · 할아버지 [하라버지] · 곰이에요 [고미에요] · 좋아해요 [조아해요] | A.11, B |
| D-18 | S6 | Contar con los dedos | Si se menciona que en Corea muchos cuentan doblando los dedos desde la mano abierta: ¿es así? (si no, no se dice) | — (solo si Abby lo confirma) |
| D-19 | S6 | 돌잡이 de hoy | "Hoy muchas familias suman objetos nuevos (micrófono, balón…)" | B.7 |
| D-20 | S7 | 김치의 날 | Si Abby lo menciona: ¿el 22 de noviembre es el Día del Kimchi en Corea? | — (solo si Abby lo confirma) |
| D-22 | S4 | El mito de 단군 para niños | 곰이 사람이 됐어요! · versión sin detalles que asusten (la cueva, el ajo y la artemisa, los días) | B.5, B.12 |
| D-23 | S5 | 오빠 y los fans | "Los fans también se lo dicen a los cantantes": ¿cómo lo dirías a un grupo de niños? | B.6 |
| D-24 | S5 | 엄마 이름이 뭐예요? | Publicado. ¿Natural preguntárselo a un niño? ¿Mejor 강아지 이름이 뭐예요? como ejemplo central? | B.6, C |
| D-25 | S5 | Canto de la familia | 동생, 동생, 우리 동생! / 우리 가족, 사랑해요! | B.12 |
| D-26 | S6 | Canto de los números | Con 몇 살이에요? — 저는 ___ 살이에요! al final | B.12 |
| D-28 | S8 | 손하트 | "Se hizo famoso en el mundo gracias a Corea" (Fase 1 §10.5) | B.9 |
| D-29 | S5–S7 | Lo personal de Abby | Foto o dibujo de su familia (S5), de su 돌 (S6), qué comió (S7), la frase de 언니/오빠 (우리 지수 언니예요!): todo opcional y lo decide ella | B.6–B.8, B.12 |
| D-30 | S7 | 김밥 [김밥] / [김빱] | ¿Las dos pronunciaciones valen en la clase? | C, B.8 |

Resueltos sin ⚑ (por eso faltan esos números): **D-10** 눈 = ojo y nieve (diccionario) · **D-21** los tigres salvajes en Corea no se mencionan · **D-27** 만 나이 oficial desde junio de 2023 (verificado en Básico 2).

### 2 · ⚑ que no son de coreano (probar, confirmar un dato o preparar)

| # | ⚑ | Qué hay que hacer | Quién · plazo |
|---|---|---|---|
| N-1 | Publicar los clips | 65 clips nuevos (G.4) y push a `main`: sin eso, los 🔊 de esas filas no existen | Jay · S1–S2 lun 12 oct; resto N−2 |
| N-2 | Lista de inscritos | Edades, países, hermanos, raíces coreanas → salas y tarjetas de nombre | Jay · lun 12 oct |
| N-3 | Grabación y salas | Confirmar qué graba Zoom cuando hay salas (la nube suele grabar solo la sala principal) | Jay · vie 9 oct |
| N-4 | Efecto espejo | Probar "La vocal viva" y una hoja con 한글 con dos dispositivos | Jay y Abby · vie 9 oct |
| N-5 | Zoom con niños | Chat "solo en público", sala de espera, salas preasignadas por nombre | Jay · vie 9 oct |
| N-6 | Imágenes con derechos | 호돌이 (mascota oficial) y fotos de Seúl 1988: describir o dibujar un tigre propio | Producción · vie 30 oct |
| N-7 | Fotos y billetes | Estatua de Sejong y billete de 10.000 wones: licencia libre o dibujo propio (y las reglas del Banco de Corea si se usa la imagen del billete) | Producción · vie 16 oct |
| N-8 | Familias con raíces coreanas | Conversación de 5 minutos antes de la S1 | Jay · lun 12–18 oct |
| N-9 | Legal | Ley 21.719 y menores; consentimiento para grabar (Fase 1 §14.3 P0) | Jay (asesoría) · antes del lun 19 oct |
| N-10 | Kit de Abby | Avisarle las diferencias de la tabla anterior | Jay · con la guía de la S1 (vie 9 oct) |

화이팅, chingu.
