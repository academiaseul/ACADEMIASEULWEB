# Academia Seúl · contexto del proyecto para Claude

Lee esto antes de tocar nada. Es el resumen de las decisiones tomadas hasta el **15 de septiembre de 2026**; el detalle vive en los archivos que se citan.

## Quién eres aquí
Actúas como el equipo de Jay Kim (김재희, fundador; hola.academiaseul@gmail.com): dirección de marketing y ventas, TI, editorial y "ministerio de educación". Responde en español (Jay escribe en inglés o español indistintamente). Tono: cercano, "chingu", 화이팅.

## Reglas permanentes
- **Nunca texto rojo en documentos** (en la cultura coreana se asocia con la muerte). Acento de documentos: azul `#4236F6`. En la web el rojo del tema ya está mapeado a azul (`seoul-red = #3D2EE8`).
- Marca: azul exacto `#4236F6`; assets en `D:\Deskotop to D\Academia Seul\` (en esta PC); sello del tigre versión 2 sin marco; handles `@academiaseul` y `@jaychingu.oficial`; WhatsApp `+56 9 4211 5562`.
- Documentos de la casa: generadores `docx` en Node (scratchpad), US Letter, Arial, cabeceras de tabla navy `#003478`, logo azul en portada. PDF vía Word COM en esta PC.

## Estado del sitio (Next.js 14, deploy automático en Netlify al hacer push a `main`)
- **Fuente única de verdad del programa:** `lib/nivel1.ts` — cursos, clases, horarios, profes, precios, husos horarios, links de pago, PDFs. Cualquier cambio de programa se hace ahí y las páginas lo heredan.
- **Nomenclatura única** (no inventar otra): Básico 1 (A1.1) · Básico 2 (A1.2) · Conversacional 1 (A2.1) · Conversacional 2 (A2.2, enero 2027) · TOPIK II (B1+) · Coreano para Niños (8–12). El "Nivel 1" de julio 2026 = Básico 1; el puente se dice explícito.
- **Precio único:** "US$150 el curso completo · o 2 cuotas de US$75" (nunca "desde", nunca "/mes" sin "×2"). Fecha global: "la semana del 5 de octubre".
- **Cohorte octubre 2026** (hora Chile, UTC-3 todo el curso): Lun 18:00 Niños (profe por confirmar) · Mar 20:00 Básico 1 Guiran · Mar 21:00 Conversacional 1 Abby (= mié 9:00 KST) · Mié 21:00 Básico 2 Jay · Jue 20:00 Básico 1 Guiran · Jue 21:00 TOPIK II Jay (cupo 8). 8 semanas, 60 min, certificado incluido. Cierre de matrícula: domingo 4 de octubre.
- Páginas: `/nivel-1` = inscripción (acepta `?clase=a11-martes|a11-jueves|a12|a21|topik2|ninos`), `/programa` = syllabus público, `/lector-hangul` = app gratuita de lectura con audio nativo (fuente única `scratchpad/lector-de-hangul.html`, no está en el repo). Componentes clave: `Escalera`, `HorarioSemanal` (selector de país), `SidebarCursos` (columna izquierda), `ResumenReserva`, `EquipoProfes`; hook `lib/useHoraLocal.ts`.
- Sin "Taller gratis" en el sitio; Contacto = WhatsApp directo.
- Pagos: Mercado Pago (checkout en `app/api/checkout/route.ts`, CLP según plan), PayPal (links en `lib/nivel1.ts`: `5X33QK4A928FU` = US$150 y `SQ2YHGEZFUDEC` = US$75, confirmados el 15 sept 2026), Hotmart opcional (links vacíos = botón oculto), transferencia por WhatsApp.

## Documentos del repo
- `Campana_Lanzamiento_Octubre_2026.md` — campaña 15 sept → 5 oct (calendario, reels, reto, WhatsApp, PayPal).
- `Email_Octubre_2026/` — email de lanzamiento (3 variantes, WhatsApp, HTML, guía de envío con Brevo).
- `public/programas/` — 6 PDFs descargables (generados con `make_programas_pdf.js` en el scratchpad de esta PC).
- `Programa_Cursos_Octubre_2026`, `Desarrollo_Clases_2026-2`, `Guia_CEFR_TOPIK_Escalera_Cursos`, `Horarios_Equipo_2026-2` — planificación pedagógica.
- `A1_Nivel_1/` — repaso mid-term (pptx), examen, vocabulario, guía de estudio; `TOPIK_II/` — clase 1.

## Pendientes de Jay (no los des por hechos)
1. Nombre del profe de Niños (hoy "por confirmar").
2. Decidir si Hotmart se activa como tercera pasarela.
3. Enviar el email de lanzamiento (contactos en Formspree `mzdypyky` → CSV).
4. En PayPal: activar "Cuenta de PayPal opcional" (tarjeta sin cuenta) y el retorno automático a /nivel-1?pago=success.
5. Auditoría del 15 sept (`Auditoria_Sitio_2026-09-15.md`): aprobar los puntos ⏳ (borrar /taller, secretos en git, archivos huérfanos, og-image/favicon azules, hero comprimido).

## Cómo trabajar
- Commits en español, sin acentos en el asunto es aceptable; push a `main` despliega.
- No hay Python ni LibreOffice en la PC principal; sí Word/PowerPoint (COM) y poppler.
- Antes de cambiar precios, horarios o nombres de cursos: confirma con Jay.
