# Academia Seúl · Qué está hecho y qué hay que ejecutar
### Corte: lunes 28 de septiembre de 2026 · cohorte de octubre (cierre dom 11 oct · clases desde el 13 · Niños desde el 19)

> Plan día a día completo: [Plan_Lanzamiento_25sep_19oct_2026.md](Plan_Lanzamiento_25sep_19oct_2026.md). Este documento es el índice: qué existe y qué falta, con fecha y responsable.

---

## PARTE 1 · Lo que ya está creado

### A. Sitio web (en vivo en academiaseul.com, verificado el 28 sept)
| Qué | Dónde |
|---|---|
| Cohorte al día: clases desde la semana del 12 de octubre, cierre dom 11, profesora **Kiran**, Niños **8–15** desde el lun 19 | `/nivel-1`, `/programa`, home, PDFs de `/programas` |
| Lector de Hangul en **/lector-coreano** (redirigen /lector-hangul, /lectorhangul, /lectorcoreano, /coreano) | `public/lector-coreano/` |
| **Dubu · 두부** (puzzle del Hangul) con la misma cabecera y pie que el Lector; enlazado en menú, footer "Gratis", home y /recursos | `/dubu` |
| **Taller gratis en video** (clase completa de Hangul) | `/taller` |
| **Mercado Pago** con link fijo $150.000 CLP (pago único) · PayPal US$150 y US$75 | `/nivel-1` |
| **1.382 audios nativos** (voz del Lector) para todo el vocabulario y las frases clave de los 5 cursos | `public/audio/kr/` · índice `Curriculo/audio/Clips_Octubre_2026.md` |
| Página 404 propia, og-image e iconos **azules**, hero liviano (302 KB), idioma automático que prefiere español, formulario accesible | — |
| Guía de pronunciación **en azul** y con datos al día (18 págs) | `/recursos/guias` |
| Logro de Básico 1 corregido: "Contar del 1 al 100 y decir cuántos son en tu familia" | `/programa` |
| Deploys de Vercel arreglados (estaban fallando del 22 al 27 sept) | — |

### B. Lanzamiento de octubre (marketing y operación)
| Qué | Archivo |
|---|---|
| Plan maestro día a día 25 sept → 19 oct (modo liviano, 2 bloques de grabación, reto, vivo, checklist operativo) | `Plan_Lanzamiento_25sep_19oct_2026.md` |
| **10 emails de Brevo** listos (L1, L1-b, L2, L3, L4, L5, L5-b, O1, R1, N1) + calendario de envíos | `Brevo/` · `Brevo/Calendario_Envios_Octubre_2026.md` |
| Captions para Instagram, TikTok y YouTube de cada post + guía de grabación | `Captions_Redes_Octubre_2026.md` |
| **15 diseños de octubre** (reto + 7 historias diarias, profes, vivo, 한글날, cierre, hoy cierra, empezamos, 추석) | `Campana_Assets/instagram/octubre/` |
| **Carrusel "¿Qué es 추석?"** (8 láminas) | `Campana_Assets/instagram/octubre/chuseok/` |
| Boletín de cursos (7 láminas) + 3 posts culturales (Dangún, Sopa de algas, Piso F) | `Posts_Boletin_Cursos_Octubre_2026/` · `Campana_Assets/instagram/` |
| Miniaturas de YouTube en azul (taller y Dubu) | `Campana_Assets/youtube/` |
| **Kits de Kiran (ES) y Abby (KO)** en PDF + mensajes con plazos (Zoom de la academia) | `Lanzamiento_Octubre_2026/profes/` |
| Guía del alumno + guía para familias de Niños (PDF) + todos los mensajes de WhatsApp para alumnos | `Lanzamiento_Octubre_2026/alumnos/` |

### C. Currículo completo de octubre (material para dar las clases)
| Curso | Profe | Guía del profesor | Cuaderno del alumno |
|---|---|---|---|
| Arquitectura académica (Fase 1) | — | `Curriculo/Fase1_Arquitectura_Academica.md` | — |
| Básico 1 (A1.1) | Kiran | 267 págs | 105 págs |
| Básico 2 (A1.2) | Jay | 336 págs | 132 págs |
| Conversacional 1 (A2.1) | Abby | 372 págs **en coreano** | 132 págs |
| TOPIK II (B1+) | Jay | 388 págs | 145 págs |
| Coreano para Niños (8–15) | Jay y Abby | 374 págs (con resumen en coreano para Abby) | 132 págs (cuaderno de actividades) |
| Conversacional 2 (A2.2) · enero 2027 | — | **Fase 5: pendiente** | — |

Cada curso: diseño (`00_Diseno_*.md` con mapa de 8 semanas, evaluación, proyecto final con rúbrica, biblioteca de materiales, decisiones para Jay y ⚑ para revisión nativa), 8 guías, 8 unidades del alumno, PDF y Word. Cada semana pasó revisión de coreano nativo y pedagógica.

### D. Documentos públicos
- **Programas públicos** de los 6 cursos (web), **folleto PDF** de 11 páginas y **mensaje de WhatsApp** "¿qué cursos tienen?": `Curriculo/publico/`
- Programa Completo ES/EN y los 6 PDFs de programas: `public/programas/`
- Auditorías del sitio (15 y 22 sept): `Auditoria_Sitio_2026-09-22.md`

### E. Seguridad
- `.env` y **51 archivos con datos personales** (contactos, inscritos, leads, certificados con nombre) fuera del repositorio; siguen en el disco. `.gitignore` bloquea que vuelvan a subirse.

---

## PARTE 2 · Qué ejecutar desde hoy

### 🔴 Seguridad (hoy, 10 minutos, solo tú)
- [ ] **Pasar el repositorio a privado**: GitHub → `academiaseul/ACADEMIASEULWEB` → Settings → Danger Zone → Change visibility → Private. El historial todavía tiene datos personales.
- [ ] **Rotar la clave de Resend** (resend.com → API Keys) y cargar la nueva en Vercel → academiaseulweb → Settings → Environment Variables como `RESEND_API_KEY` (+ `OWNER_EMAIL`).

### ⏪ Si no alcanzaste a hacerlo el 25–27 (ponerse al día hoy)
- [ ] Email **L1** (P1, 18 contactos) y **L1-b** (P2+P3, 79). Si sale hoy, L1-b dice que el reto "empieza hoy".
- [ ] Enviar el **kit en PDF** a Kiran y a Abby con su mensaje (`Mensajes_Kiran_Abby.md` §1.1 y §1.2). Abby: entre 20:00 y 22:00 Chile.
- [ ] Publicar el **carrusel del boletín** (7 láminas) y fijarlo arriba.
- [ ] Grabar/publicar **R1 Dubu** (grabación de pantalla, 30 s).
- [ ] **Bloque de grabación 1** (R2, R6, R7 + B-roll, ≈60 min) si no se hizo el domingo.

### 📅 Hoy lunes 28 · reto día 1
- [ ] 19:30 **post del reto** (`oct/01_reto_leocoreanoen7dias.png`) + historia D1 (`oct/07_reto_dia_1_story.png`).
- [ ] WhatsApp 1:1 a **ex-alumnos de julio**: puente a Básico 2 (`Mensajes_Alumnos.md` (f1)).
- [ ] **TOPIK II**: mandar el **mensaje de diagnóstico** a los interesados antes de que paguen (`Curriculo/Fase6_TOPIK2/00_Diseno_TOPIK2.md`, sección B0).

### Semana del reto · mar 29 → dom 4 oct
| Día | Qué |
|---|---|
| mar 29 | R3 "우유 en 60 s" (pantalla) · historia D2 · recordar a Kiran y Abby el clip de presentación (plazo mié 30 22:00) |
| mié 30 | R2 "Tu curso según tu caso" · historia D3 · **email L2** (todos menos inscritos) · mover pagados a la lista "02 Alumnos octubre" |
| jue 1 oct | Post "Piso F" · historia D4 · programar L3 · **decidir si existen los decks de clase** (Básico 1, Básico 2, Niños) |
| vie 2 | "Conoce a tus profes" (+ clips) · historia D5 · **email L3** · TOPIK II: **confirmar el banco de exámenes con audio** |
| sáb 3 · 개천절 | R7 Dangún 12:30 · **EN VIVO 20:00 "Lee tu nombre en coreano"** (30 min) |
| dom 4 | Historia D7 (la prueba) · **bloque de grabación 2** (R4, R5, clips "hoy cierra") · programar L4 |

### Semana de cierre · lun 5 → dom 11 oct
| Día | Qué |
|---|---|
| lun 5 | R5 ganador del reto · **email L4** · link en bio → `/nivel-1` · WhatsApp msg 2 · aviso a profes (Zoom) |
| mar 6 | Lámina calendario académico · **crear las 6 reuniones de Zoom** y mandar link + clave de anfitrión a Kiran y Abby |
| mié 7 | R4 "cupos reales" · **6 grupos de WhatsApp**, carpetas de Drive por curso, hojas de asistencia y pagos |
| jue 8 | Post "Sopa de algas" · **email L5** (2 asuntos) · estado de WhatsApp "cierro el domingo" · decidir **mínimo de alumnos por clase** |
| vie 9 · 한글날 | Post 한글날 · **plazo de las profes**: revisar programa y clase 1 · **fecha límite de las piezas P0** (abajo) |
| sáb 10 | R6 "Jay sin edición" |
| dom 11 | **CIERRE 23:59** · 5 historias · **email L5-b** · WhatsApp msg 3 · noche: listas por clase → programar **O1** |

### Semana de inicio · lun 12 → lun 19 oct
| Día | Qué |
|---|---|
| lun 12 (feriado) | Post "Empezamos" · **O1** a inscritos 09:00 · Claude pasa el sitio a lista de espera (enero 2027) · listas y grupos a las profes · **R1** 18:00 (Básico 1 mar + Conv. 1) |
| mar 13 | **N1** a no inscritos · 20:00 **Básico 1 martes** (Kiran) · 21:00 **Conversacional 1** (Abby) · R1 → Básico 2 |
| mié 14 | 21:00 **Básico 2** (Jay) · R1 → Básico 1 jueves + TOPIK II |
| jue 15 | 20:00 **Básico 1 jueves** (Kiran) · 21:00 **TOPIK II** (Jay) |
| vie 16 | Grabaciones de la semana 1 subidas · check-in con Kiran y Abby · planilla del diagnóstico de cada curso |
| dom 18 | R1 → familias de Niños |
| lun 19 | 18:00 **Coreano para Niños** (Jay y Abby) · nada con caras de menores en redes |

### 🧰 Material por producir antes del **vie 9 oct** (P0 de cada curso)
| Curso | Pieza | Quién |
|---|---|---|
| Todos | **Registro del curso** en Drive (asistencia en vivo / grabación + tarea en columnas separadas, quizzes, final) | Jay (Claude puede armar la plantilla) |
| Todos | **Mensaje de bienvenida** de cada grupo con la guía de teclado coreano (probar la guía en Android, iPhone, Windows y Mac) | Jay |
| Básico 1 | Decks S1–S2 (si no existen: se arman con el guion de slides de la guía) · Kiran confirma la tabla de nombres en 한글 | Jay / Kiran |
| Básico 2 | Deck S1–S2 · Hoja 1 y 2 · tarjeta de números · protocolo del diagnóstico · tarjeta de sala por semana | Jay |
| Conversacional 1 | Mini-deck de orientación + deck M01 rehecho · planilla del diagnóstico · modelo de audio de Abby (lun 12) · **mensaje a Abby con las 21 diferencias del kit** | Jay / Abby |
| TOPIK II | Kit de nivelación (4 págs) · hoja de respuestas y 원고지 de la casa · criterios de corrección · formularios de autocorrección · banco de exámenes con audio (vie 2) | Jay |
| Niños | Canción del saludo validada + audio de Abby · **tablero de stickers** · **mensaje de privacidad a los apoderados** (lun 12) · probar Zoom con 2 dispositivos · pista de música libre de derechos | Jay / Abby |

> Claude puede producir la mayoría de estas piezas (decks, hojas, tableros, plantillas, formularios) desde las guías ya escritas: pídelas por curso.

### ⚖️ Decisiones que te tocan (con plazo)
| Plazo | Decisión |
|---|---|
| jue 1 oct | ¿Existen los decks de clase de Básico 1, Básico 2 y Niños? |
| vie 2 oct | TOPIK II: banco de exámenes (el 64회 de tu disco no tiene audio) |
| lun 5 oct | Premio del reto: ¿cupo en Básico 1 martes o jueves? ¿y si el ganador ya pagó? |
| jue 8 oct | Mínimo de alumnos para abrir una clase (propuesta: 4) |
| antes del lun 12 | **Regla del certificado** (75 % con grabación + tarea vs 60 % + 6 de 8 en vivo) · **fecha de la cuota 2** (propuesta: semana del 9 nov) · libro **no** obligatorio · correo de contacto oficial (gmail vs @academiaseul.com) · quién comparte las grabaciones en 24 h · cómo llaman los alumnos a Abby ("애비" en hangul suena mal) |
| vie 16 oct | Plataforma de quizzes y exámenes (propuesta: formulario con autocorrección) |

### Después del 19 de octubre
- **Semana 4 (2–6 nov):** guía de estudio + feedback individual en cada curso (Conversacional 1: guía M01–M03 para el mié 4 nov).
- **Semana del 9 nov:** cuota 2 (si se confirma) · recordatorio el vie 6 nov.
- **29 nov:** sorteo del monólogo de Conversacional 1.
- **Semana del 30 nov:** finales · Niños: mini-show el lun 7 dic · **certificados lun 7 dic** · preventa de enero 2027.
- **Currículo:** Fase 5 = Conversacional 2 (enero 2027) · Conversacional 2 publicado para la preventa.
