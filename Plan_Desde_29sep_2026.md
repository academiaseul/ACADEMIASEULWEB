# Plan desde el martes 29 de septiembre de 2026 · Academia Seúl

**Reemplaza a `Plan_Lanzamiento_25sep_19oct_2026.md` desde el 29 sept** (y a `Estado_y_Pendientes_28sep_2026.md` como lista de ejecución).

Fuente única del programa: `lib/nivel1.ts`. Todo en **hora de Chile (UTC−3)**; Corea = Chile + 12 h.
Precio, siempre así: **US$150 el curso completo · o 2 cuotas de US$75**. Cierre: **domingo 11 de octubre, 23:59** (o antes si se llenan los cupos).

| Clase | Día y hora (Chile) | Profe | Cupos | 1.ª clase | Link |
|---|---|---|---|---|---|
| Básico 1 (A1.1) | mar 20:00 | Kiran | 15 | mar 13 oct | `/nivel-1?clase=a11-martes` |
| Básico 1 (A1.1) · mismo curso, se elige un día | jue 20:00 | Kiran | 15 | jue 15 oct | `/nivel-1?clase=a11-jueves` |
| Conversacional 1 (A2.1) · clase en coreano | mar 21:00 (= mié 09:00 KST) | Abby | 15 | mar 13 oct | `/nivel-1?clase=a21` |
| Básico 2 (A1.2) | mié 21:00 | Jay | 15 | mié 14 oct | `/nivel-1?clase=a12` |
| TOPIK II (B1+) | jue 21:00 | Jay | 8 | jue 15 oct | `/nivel-1?clase=topik2` |
| Coreano para Niños (8–15) | lun 18:00 (= mar 06:00 KST) | Jay y Abby | 12 | lun 19 oct (hasta el 7 dic) | `/nivel-1?clase=ninos` |

Todas: 8 semanas · 1 clase en vivo de 60 min por Zoom a la semana · certificado de finalización. Conversacional 2 (A2.2) abre en enero 2027 (lista de espera: `/notificarme?curso=conversacion`).

Marcas: ✅ listo para usar hoy · 🔧 hay que ajustarlo (se dice qué) · 📚 referencia o enero 2027.

---

## 0 · Lo que se creó desde el 18 de septiembre

### Sitio web (academiaseul.com)
| | Qué | Fecha | Dónde |
|---|---|---|---|
| ✅ | Home con jerarquía de conversión (qué es · para quién · qué hacer en 5 s) | 18 sep | `/` |
| ✅ | **Dubu · 두부**, puzzle gratis del Hangul (30 niveles, 6 barrios, modo oído), con la cabecera y el pie del sitio; enlazado en menú, footer "Gratis", home y `/recursos` | 19–22 sep | `/dubu` · `public/dubu/index.html` |
| ✅ | **Lector de Hangul** en su URL oficial (5 URLs viejas redirigen) | 22 sep | `/lector-coreano` |
| ✅ | **Taller de Hangul grabado** (clase completa en video + formulario) | 22 sep | `/taller` · `lib/taller.ts` |
| ✅ | Cohorte al día: Kiran, Niños 8–15 desde el lun 19, cierre dom 11, inicio semana del 12 | 22 sep | `/nivel-1` · `/programa` · `lib/nivel1.ts` |
| ✅ | Mercado Pago con link fijo ($150.000 CLP) + PayPal US$150 y US$75 | 22 sep | `/nivel-1` |
| 🔧 | Cuotas por Mercado Pago: falta el link de $75.000 CLP (o `MP_ACCESS_TOKEN` en Vercel). Mientras, cuotas por PayPal o transferencia | — | §8 |
| ✅ | Auditoría rev. 2: página 404 propia, og-image e iconos azules, hero liviano, idioma que prefiere español, formulario accesible, `.env` fuera de git | 22 sep | `Auditoria_Sitio_2026-09-22.md` |
| ✅ | Guía de pronunciación pública en azul (18 págs) + hoja de práctica de Hangul corregida | 26 sep | `/recursos/guias` |
| ✅ | Logro de Básico 1 corregido ("Contar del 1 al 100 y decir cuántos son en tu familia") en sitio, PDFs y lámina 01 del boletín | 26 sep | `/programa` |
| ✅ | ≈ 1.600 audios nativos (voz SunHi) del vocabulario y las frases clave de los 6 cursos | 26–28 sep | `public/audio/kr/` · índice `Curriculo/audio/Clips_Octubre_2026.md` |
| ✅ | **Deploys de Vercel arreglados** (27 sep): fallaban del 22 al 27 porque Resend se creaba al compilar sin clave; ahora se crea al recibir un mensaje. Todo lo de esos días quedó en línea el 27 | 27 sep | `app/api/route.ts` · `app/contact/route.ts` |
| ✅ | 51 archivos con datos personales sacados del repo público (siguen en tu disco; `.gitignore` los bloquea) | 28 sep | — |
| ✅ | **Hoja resumen de una página**: publicada el 29 sept (el PDF que enlaza E1 ya responde) | 28 sep | `/programas/Hoja_Resumen_Cursos_Octubre_2026.pdf` y `.png` |

### Lanzamiento y ventas
**Correos (Brevo)**
| | Qué | Dónde |
|---|---|---|
| 📚 | L1, L1-b, L2, L3 (25 sep): hablan de 추석 "hoy", del reto y del vivo → **no enviar** | `Brevo/L1_Lanzamiento_P1.html` · `L1b_Taller_P2P3.html` · `L2_Reto_y_Vivo.html` · `L3_Vivo_Manana.html` |
| 📚 | L4, L5, L5-b, O1, R1, N1 (25 sep): son la **base** de los correos nuevos (§4) | `Brevo/` |
| 📚 | Calendario de envíos del 25 sep → lo reemplaza `Brevo/Calendario_Envios_desde_29sep_2026.md` (§4) | `Brevo/Calendario_Envios_Octubre_2026.md` |
| ✅ | Configuración de Brevo (remitente, listas, segmentos) y guía DNS | `Brevo/Plan_Email_Brevo_2026.md` §2 · `Brevo/Guia_DNS_Brevo.md` |
| ✅ | Lista limpia de 97 contactos (P1 18 · P2 21 · P3 58). **Solo en tu disco**, nunca en git | `Brevo/contactos_brevo_import.csv` |
| 📚 | Email de lanzamiento del 22 sep (3 variantes) | `Email_Octubre_2026/` · `Brevo/Email_Lanzamiento_Brevo.html` |
| ✅ 🔧 | **Correos nuevos (29 sep):** E1–E5 y N1 listos para pegar (validados con `preview.js`) · O1 y R1a–R1f son plantillas: los links de Zoom, grupos y guías se rellenan el dom 11 · calendario con la sesión de Brevo y los segmentos · guía "cómo pegar en Brevo" | `Brevo/Envios_desde_29sep/` · `Brevo/Calendario_Envios_desde_29sep_2026.md` · `Brevo/Envios_desde_29sep/LEEME_Como_pegar_en_Brevo.md` |

**WhatsApp**
| | Qué | Dónde |
|---|---|---|
| ✅ | Respuestas a "¿qué cursos tienen?": mensaje principal, 1 por curso, Conversacional 2, "¿no sé mi nivel?", "¿cómo pago?" | `Curriculo/publico/WhatsApp_Cursos_Octubre_2026.md` |
| ✅ 🔧 | Mensajes a alumnos: pago confirmado (a), grupos (b0, b), recordatorios (c, d), post-clase (e), ex-alumnos de julio (f), formulario sin pago (g), cuota 2 (h), familias de Niños (i), cambio de hora (j). **Ajuste en f1:** borrar la última frase del P.D. ("Y hoy empieza el reto…") | `Lanzamiento_Octubre_2026/alumnos/Mensajes_Alumnos.md` |
| ✅ | Textos 1:1 msg 1 (apertura), msg 2 (cupos), msg 3 (cierre), "inscrito sin pagar" y los links de pago | `Plan_Lanzamiento_25sep_19oct_2026.md` Anexo A |
| ✅ | Hoja resumen PNG (para mandar como imagen) y folleto PDF de 11 págs (para quien pide todo el detalle) | `Curriculo/publico/Hoja_Resumen_Cursos_Octubre_2026.png` · `Folleto_Cursos_Octubre_2026.pdf` |

**Redes y diseños**
| | Qué | Dónde |
|---|---|---|
| ✅ | Reel 01 "Volví" (publicado el 22 sep) | Instagram |
| 🔧 | Captions de la campaña. Tal cual: §2.1 boletín, §2.14 calendario, §2.17 한글날, §2.20 empezamos, §2.21 primeras clases. Con ajuste: §2.9 Piso F, §2.10 profes, §2.11 Dangún, §2.16 sopa de algas, §2.19 cierre (detalle en §6). Desfasadas: §2.3–2.8, §2.12, §2.13, §2.15, §2.18 (reto o reels no grabados) | `Captions_Redes_Octubre_2026.md` |
| ✅ | Boletín de cursos, 7 láminas (17 sep; lámina 01 corregida el 26) | `Posts_Boletin_Cursos_Octubre_2026/` |
| ✅ | Diseños vigentes: 02 profes · 04 한글날 · 05 cierre · 05b hoy cierra · 06 empezamos | `Campana_Assets/instagram/octubre/` |
| 🔧 | 03 vivo "Lee tu nombre en coreano": solo si haces el vivo | idem |
| 📚 | 01 reto + 07_reto_dia_1…7 (el reto no se lanzó) · 00_chuseok_story (ya pasó) | idem |
| ✅ | Carrusel "¿Qué es 추석?" (8 láminas, 26 sep). No tiene caption: va en §6 | `Campana_Assets/instagram/octubre/chuseok/` |
| ✅ | 3 culturales: Dangún, sopa de algas, piso F (20 sep) + sus artículos del blog | `Campana_Assets/instagram/` · `/blog` |
| 🔧 | Miniaturas azules de YouTube: falta subir la del taller | `Campana_Assets/youtube/taller_hangul_miniatura.png` |
| 📚 | Guiones de reels y bloques de grabación (opcionales en modo liviano) | `Captions_Redes_Octubre_2026.md` §3 · `Plan_Lanzamiento_25sep_19oct_2026.md` §4 |
| 📚 | Planes anteriores: choque (20 sep), lanzamiento (25 sep), estado (28 sep) | raíz del repo |

### Profes y alumnos
| | Qué | Dónde |
|---|---|---|
| ✅ 🔧 | Kit de Kiran (ES, 13 págs) y de Abby (KO, 19 págs). El kit dice "clip el mié 30": el mensaje de hoy da el plazo nuevo. Los `[PLACEHOLDER]` de Zoom, Drive y grupos se completan el mié 7 | `Lanzamiento_Octubre_2026/profes/Kit_*.pdf` |
| 🔧 | Mensajes a Kiran y Abby con plazos. **1.2 (Abby) abre con "즐거운 추석 보내고 계시죠? 연휴 중에 연락드려서 죄송해요"** → cambiar por "추석 연휴 잘 보내셨어요?" · 3.1 ya no aplica · 3.2 se junta con 3.2-b | `Lanzamiento_Octubre_2026/profes/Mensajes_Kiran_Abby.md` |
| ✅ 🔧 | Guía del alumno (10 págs) y guía para familias de Niños (8 págs). Cuota 2 y regla del certificado van [POR CONFIRMAR] | `Lanzamiento_Octubre_2026/alumnos/` |

### Currículo (Fases 1–7)
| | Fase | Guía del profe | Cuaderno | Dónde |
|---|---|---|---|---|
| 📚 | 1 · Arquitectura académica de los 6 cursos | — | — | `Curriculo/Fase1_Arquitectura_Academica.md` |
| ✅ | 1B · Programas públicos, folleto (11 págs), WhatsApp y **hoja resumen** (28 sep) | — | — | `Curriculo/publico/` |
| ✅ | 2 · Básico 1 (Kiran) | 267 págs | 105 págs | `Curriculo/Fase2_Basico1/` |
| ✅ | 3 · Básico 2 (Jay) | 336 | 132 | `Curriculo/Fase3_Basico2/` |
| ✅ | 4 · Conversacional 1 (Abby, guía en coreano) | 372 | 132 | `Curriculo/Fase4_Conversacional1/` |
| 📚 | **5 · Conversacional 2 · enero 2027** (terminada el 29 sep) | **460** | **175** | `Curriculo/Fase5_Conversacional2/` |
| ✅ | 6 · TOPIK II (Jay), con diagnóstico por WhatsApp antes de pagar (B0.2) | 388 | 145 | `Curriculo/Fase6_TOPIK2/` |
| ✅ | 7 · Coreano para Niños (Jay y Abby) | 374 | 132 | `Curriculo/Fase7_Ninos/` |
| 🔧 | Piezas de la clase 1 de cada curso (decks, hojas, tablero de stickers, kit de nivelación de TOPIK II): por producir antes del vie 9 (§7) | — | — | biblioteca de cada `00_Diseno_*.md` |

### Documentos de consulta
📚 `CLAUDE.md` · `Auditoria_Sitio_2026-09-22.md` · `.env.example` · `public/programas/Programa_Completo_Octubre_2026_ES.pdf` / `_EN.pdf` (17 sep) · `Campana_Lanzamiento_Octubre_2026.md` · `Plan_Lanzamiento_25sep_19oct_2026.md` (checklist operativo §6 y Anexo A siguen sirviendo).

---

## 1 · Dónde estamos hoy (martes 29 de septiembre)

**Salió:** tu correo largo con el programa completo a las personas interesadas (antes, el 22, el Reel 01 "Volví").
**No salió:** L1, L1-b ni L2 · el reto #LeoCoreanoEn7Días · ningún post de la campaña · los WhatsApp 1:1 a ex-alumnos de julio · (se asume) el kit y el pedido del clip a Kiran y Abby. Si algo de esto ya lo hiciste, táchalo y sigue.

**Quedan 12 días** para el cierre (dom 11, 23:59) · 14 para la primera clase (mar 13) · 20 para Niños (lun 19).

**Meta:** que las 6 clases partan. Propuesta: **al menos 4 pagados por clase** (24 en total, mínimo propuesto para abrir; decisión del jue 8) sobre 80 cupos. En este repo no hay conteo de inscritos: el primer conteo real es el **dom 4** (Formspree "PAGO" + PayPal + Mercado Pago + transferencias).

**Las 3 prioridades**
1. **Correos en piloto automático:** una sesión de Brevo hoy deja programados E1–E5 hasta el cierre.
2. **Conversaciones 1:1**, donde se cierran las ventas: ex-alumnos de julio, quien respondió tu correo y quien llenó el formulario sin pagar.
3. **Que las clases partan bien:** kit a las profes hoy · Zoom el mar 6 · grupos el mié 7 · listas el dom 11.

---

## 2 · Decisiones que simplifican

| Tema | Recomendación | Alternativa |
|---|---|---|
| **Reto #LeoCoreanoEn7Días** (era lun 28 → dom 4) | **No lanzarlo.** No alcanzó a partir, exige 7 días seguidos de historias y el sorteo del lun 5. Los diseños 01 y 07 quedan guardados | Usarlo en noviembre como puerta de entrada a enero 2027: solo cambian las fechas de los diseños y las captions |
| **Vivo del sáb 3 · 20:00 "Lee tu nombre en coreano"** (개천절) | **Opcional, solo si tienes energía.** Ningún correo depende de él: E2 usa el taller grabado y el generador de nombres. Decides el vie 2 | Si lo haces: historia `03_vivo…` a las 10:00 y 18:00, vivo de 30 min, guion en `Captions_Redes_Octubre_2026.md` §2.12 |
| **Brevo** | **Una sola sesión de ~45 min hoy** programa E1, E2, E3, E4 (A y B) y E5 | Si Brevo no deja programar E4 A o E5 porque su segmento todavía está vacío: quedan en borrador; E4 A se termina el jue 8 a las 09:30 y E5 el jue 8 en la tarde (10 min) |
| **Reels** | **Ninguno obligatorio.** El feed usa solo diseños que ya existen | Si un día tienes 15 min: graba **R2 "Tu curso según tu caso"** (guion en `Captions_Redes_Octubre_2026.md` §3; caption §2.8 sin la línea "Reto, día 3") y publícalo en lugar del post de ese día |
| **Mensajes a las profes** | Kit hoy · el Zoom va en **un solo mensaje** el mar 6 (3.2 + 3.2-b juntos) · 3.1 no se manda | — |
| **Link en bio** | `academiaseul.com/nivel-1` desde el mié 30 hasta el dom 11 · `academiaseul.com` desde el lun 12 | — |
| **Canales** | Instagram + WhatsApp + correo. TikTok y YouTube Shorts solo si grabas R2 | — |

---

## 3 · Día a día · mar 29 sep → lun 19 oct

Rutina fija (no cuenta en la tabla): cada pago que llega → registro de pagos + mensaje **(a1/a2/a3)** de `Mensajes_Alumnos.md` (2 min). Lo que no cabe en el día se cae, no se acumula.

| Fecha | Qué hacer (máx. 3) | Min | Archivo |
|---|---|---|---|
| **Mar 29 sep** · hoy | 1) **Kit + clip a Kiran** (antes de las 20:00) **y a Abby** (20:00–22:00 = mié 30, 08:00–10:00 KST). Plazo nuevo del clip: **jue 1, 22:00 Chile (= vie 2, 10:00 KST)**; a Abby, cambiar la primera línea (§7). 2) ✅ Hoja resumen ya publicada en el sitio. 3) **21:00 · sesión única de Brevo** (§4): E1–E5 programados. *Hoy es el día más largo; desde mañana baja.* | 50 | `Lanzamiento_Octubre_2026/profes/Mensajes_Kiran_Abby.md` §1–2 · `Kit_*.pdf` · `Brevo/Calendario_Envios_desde_29sep_2026.md` §2 · `Brevo/Envios_desde_29sep/LEEME_Como_pegar_en_Brevo.md` |
| **Mié 30** | 1) 10:00 sale **E1** (solo). WhatsApp 1:1: **ex-alumnos de julio** (f1 sin la frase del reto) + responder a quien contestó tu correo (mensaje principal + hoja resumen PNG). 2) 19:30 **carrusel del boletín** (7 láminas) → fijarlo · historia con link `/programa` · link en bio → `/nivel-1` · comentario fijado del Reel 01 → "Matrícula abierta hasta el domingo 11 · tu cupo en el link de la bio". 3) Estado de WhatsApp: hoja resumen PNG | 30 | `Mensajes_Alumnos.md` (f1) · `WhatsApp_Cursos_Octubre_2026.md` §1–3 · `Posts_Boletin_Cursos_Octubre_2026/` · caption `Captions_Redes_Octubre_2026.md` §2.1 |
| **Jue 1 oct** | 1) WhatsApp **msg 1 (apertura)** a los contactos con WhatsApp del CSV que no son de julio ni te respondieron ya. 2) (opc.) 19:30 **carrusel 추석** (8 láminas) con la caption de §6. 3) Decidir: ¿existen los decks de clase de Básico 1, Básico 2 y Niños? 22:00: plazo del clip de las profes | 20 | `Plan_Lanzamiento_25sep_19oct_2026.md` Anexo A · `octubre/chuseok/` |
| **Vie 2** | 1) 10:00 sale **E2** (solo). 2) (opc.) 19:30 post **Piso F** (caption §2.9 sin la línea del reto). 3) **Decidir el vivo del sáb 3**: si va, "Archivar directos" activado + vivo programado en Instagram + historia `03_vivo…`. TOPIK II: confirmar el banco de exámenes con audio | 15 | `Campana_Assets/instagram/03_piso_f_numeros.png` · `Captions…` §2.9, §2.12 |
| **Sáb 3** · 개천절 | 1) (opc.) 12:30 post **Dangún** (caption §2.11 ajustada, §6). 2) (opc.) 20:00 **vivo** de 30 min (historias 10:00 y 18:00 con `03_vivo…`). 3) Si no hay vivo: descanso | 0–45 | `Campana_Assets/instagram/01_dangun_tigre.png` |
| **Dom 4** | 1) **Primer conteo de pagos** (Formspree "PAGO" + PayPal + Mercado Pago + transferencias) → registro de pagos. 2) Mover pagados a `02 Alumnos octubre` en Brevo. 3) Descanso | 15 | registro de pagos (plantilla: Claude) |
| **Lun 5** | 1) Antes de 10:00: pagados a `02` (2 min); 10:00 sale **E3**. 2) WhatsApp: **msg 2** a conversaciones abiertas (con cupos reales o sin número) + **f2** a julio que no respondió. 3) 19:30 **"Conoce a tus profes"** (`02` + clips si llegaron; caption §2.10 sin la línea del vivo) · historia `05_cierre_domingo_11_story` + link `/nivel-1` | 30 | `Plan_Lanzamiento…` Anexo A · `Mensajes_Alumnos.md` (f2) · `octubre/02_conoce_a_tus_profes.png` |
| **Mar 6** | 1) **Crear las 6 reuniones recurrentes de Zoom** (8 sesiones cada una; ajustes en §7). 2) Kiran 12:00 y Abby 20:00 (= mié 7, 08:00 KST): **link + clave de anfitrión** en un solo mensaje, + guía del profesor y cuaderno de su curso (PDF) para revisar la clase 1. 3) 19:30 lámina **Calendario académico** (caption §2.14 tal cual: "Quedan 5 días") | 45 | `Mensajes_Kiran_Abby.md` 3.2-b · `Curriculo/Fase2_Basico1/` · `Fase4_…` · `Fase7_…` · `Posts_Boletin…/06_Calendario_Academico.png` |
| **Mié 7** | 1) **6 grupos de WhatsApp** (nombre, foto, descripción con su Zoom). 2) Carpetas de Drive por curso + hoja de asistencia + registro de pagos (plantillas: Claude). 3) **Tope:** Kiran y Abby tienen su Zoom | 40 | `Mensajes_Alumnos.md` (b0) |
| **Jue 8** | 1) Antes de 10:00: pagados a `02`; 10:00 sale **E4 A/B** (si E4 A quedó en borrador: terminarla y programarla a las 09:30; en la tarde, programar E5 si también quedó en borrador). 2) WhatsApp **g2** (una sola vez) a quien llenó el formulario sin pagar + estado "cierro el domingo". 3) 19:30 post **Sopa de algas** (TOPIK II; caption §2.16 con el cupo real o sin esa frase) · decidir el **mínimo de alumnos por clase** | 25 | `Mensajes_Alumnos.md` (g2) · `Campana_Assets/instagram/02_sopa_de_algas_topik.png` |
| **Vie 9** · 한글날 | 1) 12:30 post **한글날** (caption §2.17 tal cual) + historia del Lector con link `/lector-coreano`. 2) **Plazo de las profes:** revisan programa y clase 1; responder sus dudas. 3) Decidir la **regla del certificado** (§8) | 20 | `octubre/04_hangeulnal_9_octubre.png` |
| **Sáb 10** | 1) Historia `05_cierre_domingo_11_story` + "mañana cierra" + link `/nivel-1`. 2) (opc.) R6 "Jay sin edición", una toma. 3) Registrar pagos | 10 | `Captions…` §2.18 (solo si grabas) |
| **Dom 11** · CIERRE 23:59 | 1) Antes de 12:00: pagados a `02`; 12:00 sale **E5**. 2) Historias 10:00, 16:00, 19:00 y 22:00 con `05b_hoy_cierra_story` (§6) + **msg 3** a conversaciones abiertas. 3) Noche: export de Formspree → Claude arma listas por clase + CSV → lista `02` (y `02a…02f`) en Brevo → rellenar los links privados (`rellenar_links.js`) → programar **O1** y los 6 **R1** (R1a–R1f) | 60 repartidos | `octubre/05b_hoy_cierra_story.png` · `Plan_Lanzamiento…` Anexo A (msg 3) |
| **Lun 12** · feriado | 1) 09:00 sale **O1** · Claude pasa el sitio a lista de espera (con tu OK) · bienvenida (b1–b6) fijada en cada grupo. 2) 10:00 Kiran y Abby: **listas + admins de sus grupos** (3.3) · 18:00 sale **R1** → Básico 1 martes + Conversacional 1 (+ c1, c2 en los grupos). 3) 19:30 post **Empezamos** (caption §2.20) · programar **N1** (mar 13, 13:00) | 40 | `Mensajes_Alumnos.md` (b, c) · `Mensajes_Kiran_Abby.md` 3.3 · `octubre/06_empezamos_esta_semana.png` |
| **Mar 13** | 1) 13:00 sale **N1** · Kiran 14:00 y Abby 19:00 (3.4). 2) 18:00 **R1** → Básico 2 (+ c3) · recordatorios 1 h antes (d). 3) **20:00 Básico 1 martes (Kiran) · 21:00 Conversacional 1 (Abby)** · historia post-clase con permiso | 20 | `Mensajes_Kiran_Abby.md` 3.4 · `Mensajes_Alumnos.md` (c, d) |
| **Mié 14** | 1) 18:00 **R1** → Básico 1 jueves + TOPIK II (+ c4, c5). 2) **21:00 Básico 2 (tú).** 3) Post-clase (e) en los grupos del martes, dentro de 24 h | 15 + clase | `Mensajes_Alumnos.md` (c, e) |
| **Jue 15** | 1) Kiran 14:00 (3.4 jueves). 2) **20:00 Básico 1 jueves (Kiran) · 21:00 TOPIK II (tú)**. 3) Post-clase (e) | 10 + clase | `Mensajes_Kiran_Abby.md` 3.4 |
| **Vie 16** | 1) **Check-in** con Kiran 12:00 y Abby 20:00 (3.5). 2) Grabaciones de la semana 1 en los grupos + asistencia. 3) Historia "Semana 1 ✅" (§2.21) | 20 | `Mensajes_Kiran_Abby.md` 3.5 |
| **Sáb 17** | Descanso | 0 | — |
| **Dom 18** | 1) 18:00 **R1** → familias de Niños + mensaje (i) fijado en su grupo | 5 | `Mensajes_Alumnos.md` (i) |
| **Lun 19** | 1) 10:00 Abby (3.4 Niños) · 17:00 recordatorio 1 h (d). 2) **18:00 Coreano para Niños (Jay y Abby).** 3) Nada con caras ni nombres de menores en redes | 5 + clase | `Mensajes_Kiran_Abby.md` 3.4 |

---

## 4 · Correos desde hoy

Archivos en `Brevo/Envios_desde_29sep/`. **Detalle, paso a paso y segmentos: `Brevo/Calendario_Envios_desde_29sep_2026.md`** (reemplaza a `Calendario_Envios_Octubre_2026.md`). **Cómo pegar en Brevo sin que se rompa: `Brevo/Envios_desde_29sep/LEEME_Como_pegar_en_Brevo.md`.** Remitente "Jay · Academia Seúl" · Reply-To hola.academiaseul@gmail.com. Links con `?utm_source=brevo&utm_medium=email&utm_campaign=` + `e1` … `e5`, `o1`, `r1`, `n1`. El preheader va oculto dentro de cada HTML: en Brevo, *Preview text* vacío.
**Reglas:** ≤ 1 correo por persona cada 48 h · ≤ 300 envíos al día (la lista es de ~100) · antes de cada envío a prospectos, mover a los pagados a `02 Alumnos octubre` (Brevo mira la exclusión al momento del envío). Excepción a propósito: inscritos que reciben O1 y R1 el mismo lunes (son avisos de su clase).

| Id | Fecha y hora (Chile) | Segmento | Asunto | Preheader | Archivo | Propósito · base |
|---|---|---|---|---|---|---|
| **E1** | mié 30 sep · 10:00 | `01 Leads sitio` − `02 Alumnos octubre` | Te lo dejo en un minuto: los cursos de octubre 💙 | 5 cursos, días, horas, profes y precio en una página · matrícula hasta el domingo 11 | `E1_Programa_30sep.html` | El programa corto: 5 cursos, para quién es cada uno, día/hora/profe/1.ª clase, qué incluye, precio, cómo elegir (test), botón de inscripción, link al PDF de una página, cierre dom 11. Sirve a quien leyó tu correo largo y a quien no. Base: ninguna (hoja resumen + WhatsApp_Cursos) |
| **E2** | vie 2 oct · 10:00 | mismos | Tu nombre en coreano, en 5 minutos 🐯 | El sábado 3 es 개천절 · generador de nombres, taller grabado, Lector y Dubu, gratis | `E2_Tu_Nombre_En_Coreano_2oct.html` | Valor sin venta dura: leer tu nombre en 한글 (generador + taller grabado + Lector + Dubu) y una línea suave a Básico 1. Sin reto ni vivo. Base: L2 + L1-b |
| **E3** | lun 5 oct · 10:00 | mismos | Última semana: cierro la matrícula el domingo 11 | Los 5 cursos con su día, hora y cupos · empezamos el martes 13 | `E3_Ultima_Semana_5oct.html` | Cierre el domingo; resumen de cursos y cupos máximos (15 · TOPIK II 8 · Niños 12), sin números inventados; sin ganador del reto. Base: L4 |
| **E4 · A** | jue 8 oct · 10:00 | `E4 · Abrió algo` − `02` | Quedan 3 días (y mañana es 한글날) | El domingo 11 cierro la matrícula · US$150 el curso completo · o 2 cuotas de US$75 | `E4_Quedan_3_Dias_8oct.html` | Corto y directo: 3 días, curso sugerido, precio, botón. Base: L5 |
| **E4 · B** | jue 8 oct · 10:00 | `01 Leads sitio` − `02` − `E4 · Abrió algo` (= quien no abrió nada; ya no hace falta un segmento propio) | ¿Todavía quieres aprender coreano? | (el mismo) | `E4_Quedan_3_Dias_8oct.html` (mismo HTML) | Mismo correo, otro asunto para quien no abrió nada. Son 2 campañas normales, no un *A/B test* de Brevo |
| **E5** | dom 11 oct · 12:00 | `E5 · Abrió E3 o E4` − `02` | Hoy cierra · 23:59 hora Chile | Último día de matrícula de octubre · clases desde el martes 13 | `E5_Hoy_Cierra_11oct.html` | 3–4 líneas + botón + WhatsApp. Base: L5-b |
| **O1** | lun 12 oct · 09:00 | `02 Alumnos octubre` | ¡Empezamos esta semana! Tu Zoom, tu grupo y tu hora | Todo para tu primera clase: link de Zoom, grupo de WhatsApp, guía y programa de tu curso | `O1_Bienvenida_12oct.html` → se pega la copia rellena de `_privado/` | Bienvenida con Zoom, grupo, guía y programa de cada clase. Plantilla con 14 marcas ⟪…⟫ que se rellenan el dom 11 (el Zoom de Niños no va aquí, por privacidad). Base: O1_Bienvenida_Inscritos |
| **R1a** | lun 12 oct · 18:00 | `02a B1 martes` | Mañana es tu primera clase: Básico 1 (A1.1) | Martes 13 de octubre · 20:00 hora Chile · tu link de Zoom adentro | `R1a_Basico1_Martes.html` (copia de `_privado/`) | Recordatorio con su Zoom, la hora en su país y qué tener listo. 1 marca: su Zoom. Base: el R1 existente |
| **R1b** | lun 12 oct · 18:00 | `02b Conversacional 1` | Mañana es tu primera clase: Conversacional 1 (A2.1) | Martes 13 de octubre · 21:00 hora Chile · tu link de Zoom adentro | `R1b_Conversacional1.html` (copia de `_privado/`) | ídem · "21:00 en punto, la sala se abre a las 20:58" |
| **N1** | mar 13 oct · 13:00 (49 h después de E5) | `01 Leads sitio` − `02` | Tu lugar en enero 2027 🌱 | Lista de espera de enero abierta · el Lector, Dubu y el taller siguen gratis | `N1_Lista_Enero_13oct.html` | Lista de espera de enero 2027 + recursos gratis. Solo con el sitio ya en lista de espera. Base: N1_Lista_Enero_2027 |
| **R1c** | mar 13 oct · 18:00 | `02c Básico 2` | Mañana es tu primera clase: Básico 2 (A1.2) | Miércoles 14 de octubre · 21:00 hora Chile · tu link de Zoom adentro | `R1c_Basico2.html` (copia de `_privado/`) | ídem |
| **R1d** | mié 14 oct · 18:00 | `02d B1 jueves` | Mañana es tu primera clase: Básico 1 (A1.1) | Jueves 15 de octubre · 20:00 hora Chile · tu link de Zoom adentro | `R1d_Basico1_Jueves.html` (copia de `_privado/`) | ídem |
| **R1e** | mié 14 oct · 18:00 | `02e TOPIK II` | Mañana es tu primera clase: TOPIK II (B1+) | Jueves 15 de octubre · 21:00 hora Chile · tu link de Zoom adentro | `R1e_TOPIK2.html` (copia de `_privado/`) | ídem · pide bajar el 제64회 sin resolverlo · "21:00 en punto" |
| **R1f** | dom 18 oct · 18:00 | `02f Niños` (apoderados) | Mañana es la primera clase de Coreano para Niños | Lunes 19 · 18:00 hora Chile · conecta y acompaña en esta primera clase | `R1f_Ninos.html` (copia de `_privado/`) | A la familia: 10 min antes, nombre de pila, acompañar, privacidad. Único correo con el Zoom de Niños |

**Si tu correo largo salió después del lun 28 a las 10:00** (menos de 48 h antes de E1): E1 pasa al **jue 1 · 10:00** y E2 al **sáb 3 · 10:00**; lo demás no cambia.

### Sesión única de Brevo · hoy mar 29 · 21:00 (≈ 45 min)
Paso a paso completo en `Brevo/Calendario_Envios_desde_29sep_2026.md` §2–3 y en el LEEME. Resumen:
0. (Solo si Brevo no está listo, +20 min: remitente verificado, zona de envío *America/Santiago* en *Settings → Campaigns → Default settings*, CSV importado a `01 Leads sitio`, atributo `CURSO_SUGERIDO`, lista vacía `02 Alumnos octubre`; `Brevo/Plan_Email_Brevo_2026.md` §2.)
1. Mover a `02` a quien ya pagó. Si tu correo largo fue desde Gmail a gente que **no** está en `01` y que pidió información, agrégala a `01`. Ver si la hoja resumen ya abre; si no, plan B de E1 (calendario §5).
2. Crear 2 segmentos (*CRM › Contacts › Segments → Create a segment → Marketing › Email › Email opened*, campañas, al menos 1 vez): `E4 · Abrió algo` = en los últimos 30 días (el jue 8 = abrió E1, E2 o E3, y tu correo largo si salió por Brevo) · `E5 · Abrió E3 o E4` = en los últimos 7 días (el dom 11 = abrió E3 o E4). `E4 · No abrió nada` ya no se crea: E4 B excluye `E4 · Abrió algo`.
3. Por cada correo (E1 → E2 → E3 → E4 A → E4 B → E5): *Marketing › Campaigns → Create campaign → Email → Regular* → *Recipients* (*Send to* + *Advanced options → Don't send to* `02`) → asunto (*Preview text* vacío) → *Start designing → Start from scratch → HTML custom code* → pegar el HTML copiado desde el Bloc de notas → *Save & quit* → Reply-To y *UTM tracking* apagado → *Preview & test* → *Send test email* a tu Gmail y mirarlo en el celular → *Schedule for later*. Para ir más rápido, *Duplicate* sobre la anterior.
4. Si Brevo no deja programar E4 A o E5 con el segmento todavía vacío: borrador; E4 A el jue 8 a las 09:30, E5 el jue 8 en la tarde.
5. O1, R1a–R1f y N1 **no** se programan hoy (necesitan links de Zoom, grupos y la lista final): dom 11 noche y lun 12.

---

## 5 · WhatsApp

| Cuándo | A quién | Mensaje | Archivo |
|---|---|---|---|
| mié 30 | Ex-alumnos de julio (1:1; en Brevo solo hay 2) | **(f1)** sin la última frase del P.D. (reto). Si recibieron tu correo largo, agrega arriba: "Te mandé el programa por correo; te lo resumo aquí" | `Mensajes_Alumnos.md` (f1) |
| desde hoy, cada día | Quien respondió tu correo o escribe "¿qué cursos tienen?" | Mensaje principal + **hoja resumen PNG** → respuesta del curso que pida → "¿no sé mi nivel?" / "¿cómo pago?". Folleto PDF solo si pide todo el detalle | `Curriculo/publico/WhatsApp_Cursos_Octubre_2026.md` |
| cuando pregunte | Interesados en TOPIK II | **Diagnóstico por WhatsApp antes de pagar** (y ruta honesta a Conversacional 1 si no llega) | `Curriculo/Fase6_TOPIK2/00_Diseno_TOPIK2.md` B0.2 y B0.4 |
| jue 1 | Contactos con WhatsApp del CSV (no julio, no ya conversando) | **msg 1** (apertura) | `Plan_Lanzamiento_25sep_19oct_2026.md` Anexo A |
| día siguiente al formulario | Llenó `/nivel-1` y no pagó | **(g1)**, con los 3 medios de pago; una sola vez **(g2)** el jue 8 (o dom 11) | `Mensajes_Alumnos.md` (g) |
| cada pago | Quien pagó | **(a1)** completo · **(a2)** cuota 1 · **(a3)** apoderado de Niños. Desde el lun 12, sin el párrafo "trae un chingu" | `Mensajes_Alumnos.md` (a) |
| lun 5 | Conversaciones abiertas · julio sin respuesta | **msg 2** (cupos: solo números reales) · **(f2)** | Anexo A · (f2) |
| mié 30 y jue 8 | Estado de WhatsApp | mié 30: hoja resumen PNG · jue 8: "Cierro la matrícula de octubre el domingo 11 · academiaseul.com/nivel-1" | — |
| dom 11 | Conversaciones abiertas | **msg 3** (cierre, sin presión: "o te anoto para enero") | Anexo A |
| mié 7 → dom 18 | Grupos de cada clase | (b0) crear · (b) bienvenida lun 12 09:00 · (c) 24 h antes · (d) 1 h antes · (e) post-clase · (i) familias de Niños dom 18 | `Mensajes_Alumnos.md` |

Links de pago para pegar: Mercado Pago $150.000 CLP `https://mpago.la/1cHrbqy` · PayPal US$150 `https://www.paypal.com/ncp/payment/5X33QK4A928FU` · PayPal cuota de US$75 `https://www.paypal.com/ncp/payment/SQ2YHGEZFUDEC` · transferencia en Chile por WhatsApp. No prometas un medio específico para las cuotas.

---

## 6 · Redes (Instagram)

Rutas: `oct/` = `Campana_Assets/instagram/octubre/` · `ig/` = `Campana_Assets/instagram/` · `bol/` = `Posts_Boletin_Cursos_Octubre_2026/`. Captions: `Captions_Redes_Octubre_2026.md`. Cada post del feed se comparte a historias con sticker de link.

| Fecha · hora | Pieza | Archivo | Caption |
|---|---|---|---|
| mié 30 · 19:30 | **Boletín de cursos** (7 láminas) → fijar | `bol/00_Portada_Boletin.png` … `06_Calendario_Academico.png` | §2.1 tal cual |
| mié 30 · 19:35 | Historia: hoja resumen + link `/nivel-1` (va en historia y WhatsApp; como post del feed Instagram le corta los bordes) | `Curriculo/publico/Hoja_Resumen_Cursos_Octubre_2026.png` | "Los cursos de octubre en una página 👇" |
| jue 1 · 19:30 (opc.) | **Carrusel 추석** (8 láminas) | `oct/chuseok/chuseok_01…08.png` | Nueva (abajo) |
| vie 2 · 19:30 (opc.) | **Piso F** | `ig/03_piso_f_numeros.png` | §2.9 **sin** "Hoy en el reto (día 4): pestaña Practicar del Lector, vocales y consonantes." |
| sáb 3 · 12:30 (opc.) | **Dangún** (como imagen) | `ig/01_dangun_tigre.png` | §2.11: si no hay vivo, cambia "hoy a las 20:00 (hora Chile) te enseño a leer tu nombre en coreano, en vivo aquí" por "tu nombre en coreano, gratis: generador en mis historias" (historia con link `/generador-nombre`) |
| sáb 3 · 10:00 y 18:00 (solo si hay vivo) | Historia del vivo | `oct/03_vivo_lee_tu_nombre_story.png` | §2.12 |
| lun 5 · 19:30 | **Conoce a tus profes** (+ clips) | `oct/02_conoce_a_tus_profes.png` | §2.10 **sin** "Y mañana sábado 3, a las 20:00 Chile: clase abierta…" |
| lun 5 · 12:00 | Historia "Últimos días" + link `/nivel-1` | `oct/05_cierre_domingo_11_story.png` | — (el diseño ya trae todo) |
| mar 6 · 19:30 | **Calendario académico** | `bol/06_Calendario_Academico.png` | §2.14 tal cual |
| jue 8 · 19:30 | **Sopa de algas** (TOPIK II) | `ig/02_sopa_de_algas_topik.png` | §2.16: "[N] de 8" con el dato real, o borrar esa frase |
| vie 9 · 12:30 | **한글날 · 580 años** | `oct/04_hangeulnal_9_octubre.png` | §2.17 tal cual (historia con captura del Lector, no clip B3) |
| sáb 10 | Historia "mañana cierra" + link `/nivel-1` | `oct/05_cierre_domingo_11_story.png` | — |
| dom 11 · 10:00 · 16:00 · 19:00 · 22:00 | Historias del cierre | `oct/05b_hoy_cierra_story.png` | §2.19 sin clips C1–C3: 10:00 el diseño + link · 16:00 sticker "¿Dudas? Escríbeme" → `https://wa.me/56942115562` · 19:00 "Quedan 5 horas" · 22:00 "Últimas horas" |
| lun 12 · 19:30 | **Empezamos esta semana** → fijar en lugar del boletín | `oct/06_empezamos_esta_semana.png` | §2.20 tal cual |
| mar 13 → lun 19 | Historias de las primeras clases (con permiso; Niños sin caras) | capturas | §2.21 tal cual |

**Caption del carrusel 추석 (nueva):**
```
La semana pasada Corea celebró 추석 (Chuseok) 🌕 la gran fiesta de la cosecha.

Desliza: qué es, cuándo cae, sus costumbres y una frase para guardar 👉

En Academia Seúl no solo aprendemos coreano: aprendemos la cultura que hay detrás. Clases desde la semana del 12 de octubre · matrícula hasta el domingo 11 · link en la bio.

#academiaseul #aprendecoreano #coreanoparalatinos #한글 #clasesdecoreano #추석 #chuseok #culturacoreana
```

**Ya no usar:** `oct/01_reto_leocoreanoen7dias.png` · `oct/07_reto_dia_1…7_story.png` · `oct/00_chuseok_story.png` · captions §2.3–2.7 (R1, reto, R3), §2.13 (ganador), §2.15 (R4, no se grabó), el guion del vivo que habla del "día 7 del reto" y los bloques de grabación del dom 27 y dom 4.

---

## 7 · Profes y operativo del inicio de clases

### Kiran y Abby
| Cuándo (Chile) | Qué | Archivo |
|---|---|---|
| **hoy mar 29** · Kiran antes de 20:00 · Abby 20:00–22:00 (= mié 30, 08:00–10:00 KST) | Kit + mensaje 1.1 / 1.2 + guion del clip 2.1 / 2.2. **Ajustes:** a Abby, primera línea → "추석 연휴 잘 보내셨어요?" (sin "연휴 중에 연락드려서 죄송해요"); a las dos, plazo del clip **jue 1, 22:00 Chile** (Abby: "10월 2일(금) 오전 10시"). Si ya tenían el kit desde el 25, se mantiene el mié 30. Abby confirma en una línea que Niños = mar 06:00 KST | `Lanzamiento_Octubre_2026/profes/Mensajes_Kiran_Abby.md` §1–2 · `Kit_Kiran_Basico1_ES.pdf` · `Kit_Abby_Conversacional_Ninos_KO.pdf` |
| jue 1 · 22:00 | Plazo del clip de 15 s (se publica el lun 5) | — |
| **mar 6** · Kiran 12:00 · Abby 20:00 | Link de Zoom + clave de anfitrión (3.2-b, con la explicación de 3.2) + guía del profesor y cuaderno del alumno de su curso. Tope: mié 7 | `Mensajes_Kiran_Abby.md` 3.2-b · `Curriculo/Fase2_Basico1/Guia_Profesor_Basico1_Octubre_2026.pdf` · `Curriculo/Fase4_Conversacional1/Guia_Profesora_Conversacional1_Octubre_2026.pdf` · `Curriculo/Fase7_Ninos/Guia_Profesores_Ninos_Octubre_2026.pdf` |
| antes del vie 9 | A Abby: mensaje con las 21 diferencias entre su kit y el diseño de Conversacional 1 (borrador en coreano en el diseño) | `Curriculo/Fase4_Conversacional1/00_Diseno_Conversacional1.md` |
| vie 9 | Las profes revisan programa y clase 1 | — |
| lun 12 · 10:00 | Listas + admins de sus grupos (3.3) | `Mensajes_Kiran_Abby.md` 3.3 |
| mar 13 · jue 15 · lun 19 | Mensaje del día de su 1.ª clase (3.4) | 3.4 |
| vie 16 | Check-in de la semana 1 (3.5) | 3.5 |

### Checklist operativo
| # | Tarea | Fecha límite | Quién |
|---|---|---|---|
| 1 | **6 reuniones recurrentes de Zoom** en la cuenta de pago (8 sesiones cada una): salas para grupos, grabación en la nube y "entrar antes que el anfitrión" activados. Mar y jue, la clase de las 20:00 termina a las **20:58** (misma cuenta). Prueba de grabación de 5 min | mar 6 (tope mié 7) | Jay |
| 2 | **6 grupos de WhatsApp** con su Zoom en la descripción; Niños = solo apoderados; foto = sello del tigre | mié 7 | Jay |
| 3 | Carpeta de Drive por curso (Grabaciones / Material) · hoja de asistencia · **registro de pagos** (medio, plan único / cuota 1 / cuota 2, comprobante) | mié 7 | Claude (plantillas) · Jay |
| 4 | **Material de la clase 1** en cada carpeta: Básico 1 (deck S1 + hoja 가나다라 I; Kiran confirma la tabla de nombres) · Básico 2 (deck S1, hoja 1, tarjeta de números) · Conversacional 1 (mini-deck de orientación + planilla del diagnóstico) · TOPIK II (kit de nivelación de 4 págs, hoja de respuestas y 원고지) · Niños (canción del saludo validada, **tablero de stickers**, mensaje de privacidad a los apoderados). Claude puede armarlas desde las guías: pídelas por curso | mié 7 (las profes revisan el vie 9) | Jay · Claude · Abby |
| 5 | Mensaje de bienvenida de cada grupo con la guía del teclado coreano (probar en Android, iPhone, Windows y Mac) | lun 12 | Jay |
| 6 | **Listas por clase:** export de Formspree (`mzdypyky`) → Claude cruza con el registro de pagos → 6 listas + CSV para Brevo (solo en tu disco) | dom 11 noche | Jay · Claude |
| 7 | Lista `02 Alumnos octubre` (+ `02a…02f` por clase) → programar O1 y los R1 | dom 11 noche | Jay |
| 8 | Pagos que llegan después de programar O1: agregarlos a `02` y a su lista de clase antes de las 18:00 del día previo, reenviarles O1 y sumarlos al grupo | lun 12 → jue 15 | Jay |
| 9 | **Sitio en lista de espera** (`COHORTE_ABIERTA = false`, `PROXIMA_COHORTE_LABEL = "Enero 2027"`), build, push y deploy verificado | lun 12 · 09:00, con tu OK | Claude |
| 10 | Después de cada clase: grabación en el grupo ≤ 24 h + asistencia + tarea | cada clase | profe de la clase |
| 11 | **Privacidad de Niños:** nada de caras ni nombres de menores en redes; grabaciones solo para el grupo de familias | todo el curso | Jay · Abby |
| 12 | Avisos de cambio de hora (España dom 25 oct, EE.UU. dom 1 nov; Chile no cambia) | vie 23 oct y vie 30 oct | Jay |

---

## 8 · Pendientes técnicos y decisiones de Jay

### Técnicos
| Qué | Cuándo | Quién | Por qué |
|---|---|---|---|
| ~~Subir la hoja resumen al sitio~~ ✅ hecho el 29 sept (deploy verificado; el PDF de E1 responde 200) | — | Claude | — |
| **Repo a privado:** GitHub → `academiaseul/ACADEMIASEULWEB` → Settings → Danger Zone → Change visibility → Private | esta semana (2 min) | Jay | El historial conserva datos personales y la clave vieja de Resend. Vercel sigue funcionando |
| **Rotar `RESEND_API_KEY`** (resend.com → API Keys) y cargarla en Vercel con `OWNER_EMAIL` | esta semana (10 min) | Jay | Sin eso no te llega por correo el aviso de los pagos de Mercado Pago: revisa Mercado Pago a mano cada noche |
| **Link de Mercado Pago de $75.000 CLP** → `MP_LINK_MENSUAL` en `lib/nivel1.ts` (o `MP_ACCESS_TOKEN` en Vercel) | antes del lun 5 | Jay (Claude lo pega) | Hoy las cuotas van por PayPal o transferencia |
| PayPal: "Cuenta de PayPal opcional" + retorno a `/nivel-1?pago=success` | cuando puedas | Jay | Pago con tarjeta sin cuenta |
| Subir a YouTube la miniatura azul del taller | cuando puedas (2 min) | Jay | `Campana_Assets/youtube/taller_hangul_miniatura.png` |
| Hotmart como tercera pasarela | — | Jay | Recomendación: no activarlo en esta cohorte |

### Decisiones
| Decisión | Plazo | Propuesta |
|---|---|---|
| ¿Existen los decks de clase de Básico 1, Básico 2 y Niños? | jue 1 | Si no, Claude arma la clase 1 de cada uno desde el guion de slides de las guías |
| Vivo del sáb 3 | vie 2 | Solo si tienes energía (§2) |
| TOPIK II: banco de exámenes con audio (el 64회 del disco no tiene audio) | vie 2 | Citar exámenes oficiales por 회차 para que el alumno los baje de topik.go.kr |
| Material de la clase 1 de Conversacional 1 y Niños | lun 5 | Claude hace el borrador y Abby lo ajusta |
| **Mínimo de alumnos para abrir una clase** | jue 8 | 4 por clase; si Básico 1 martes o jueves queda chico, se fusionan |
| **Regla del certificado y pesos de nota** (guías y kits: 75 % en vivo o grabación + tarea, 25/25/15/35; PDF de Básico 1 y Conversacional 1: 60 % + 6 de 8 en vivo, 40/30/30) | vie 9 | Regla general para adultos; Niños 6 de 8 en vivo. Después Claude regenera los PDF distintos |
| Aviso si una clase no se puede dar (kits 48 h · Programa Completo 24 h) · cambio de sección (hasta la semana 2) | vie 9 | 48 h · hasta la semana 2 según cupos |
| **Fecha de la cuota 2** | antes del lun 12 (va en O1) | Semana del 9 de noviembre, antes de la clase 5 |
| **Correo de contacto único** (`hola.academiaseul@gmail.com` vs `hola@academiaseul.com` de `/terminos`) | antes del lun 12 | El que revises a diario |
| Libro de Básico 1 y 2 | antes del lun 12 | No obligatorio: todo en slides y hojas PDF |
| Quién comparte las grabaciones en 24 h | antes del lun 12 | Jay comparte el link de la grabación en la nube en el grupo (1 min por clase) y la baja a Drive una vez por semana |
| Cómo llaman los alumnos a Abby ("애비" en hangul suena mal) | antes del lun 12 | Preguntarle a Abby |
| **Conversacional 2 publicado a US$150** (WhatsApp, programa público y folleto) · día, hora y profe por confirmar | antes de N1 (mar 13) | Confirmar el precio o corregirlo en los 3 lugares |
| Premio del reto | — | Ya no aplica si el reto no se lanza |
| Plataforma de quizzes y exámenes | vie 16 | Formulario con autocorrección |

화이팅. Hoy: kit a las profes, OK para subir la hoja resumen y la sesión de Brevo. Mañana E1 sale sola y tú solo publicas el boletín y escribes a los de julio.
