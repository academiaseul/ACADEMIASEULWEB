# Academia Seúl · contexto del proyecto para Claude

Lee esto antes de tocar nada. Es el resumen de las decisiones tomadas hasta el **22 de septiembre de 2026**; el detalle vive en los archivos que se citan.

## Quién eres aquí
Actúas como el equipo de Jay Kim (김재희, fundador; hola.academiaseul@gmail.com): dirección de marketing y ventas, TI, editorial y "ministerio de educación". Responde en español (Jay escribe en inglés o español indistintamente). Tono: cercano, "chingu", 화이팅.

## Reglas permanentes
- **Nunca texto rojo en documentos** (en la cultura coreana se asocia con la muerte). Acento de documentos: azul `#4236F6`. En la web el rojo del tema ya está mapeado a azul (`seoul-red = #3D2EE8`).
- Marca: azul exacto `#4236F6`; assets en `D:\Deskotop to D\Academia Seul\` (en esta PC); sello del tigre versión 2 sin marco; handles `@academiaseul` y `@jaychingu.oficial`; WhatsApp `+56 9 4211 5562`.
- Documentos de la casa: generadores `docx` en Node (scratchpad), US Letter, Arial, cabeceras de tabla navy `#003478`, logo azul en portada. PDF vía Word COM en esta PC.

## Estado del sitio (Next.js 14, deploy automático en Netlify al hacer push a `main`)
- **Fuente única de verdad del programa:** `lib/nivel1.ts` — cursos, clases, horarios, profes, precios, husos horarios, links de pago, PDFs. Cualquier cambio de programa se hace ahí y las páginas lo heredan.
- **Nomenclatura única** (no inventar otra): Básico 1 (A1.1) · Básico 2 (A1.2) · Conversacional 1 (A2.1) · Conversacional 2 (A2.2, enero 2027) · TOPIK II (B1+) · Coreano para Niños (8–15). El "Nivel 1" de julio 2026 = Básico 1; el puente se dice explícito.
- **Precio único:** "US$150 el curso completo · o 2 cuotas de US$75" (nunca "desde", nunca "/mes" sin "×2"). Fecha global: "la semana del 12 de octubre".
- **Cohorte octubre 2026** (hora Chile, UTC-3 todo el curso): Lun 18:00 Niños (Jay y Abby) · Mar 20:00 Básico 1 Kiran · Mar 21:00 Conversacional 1 Abby (= mié 9:00 KST) · Mié 21:00 Básico 2 Jay · Jue 20:00 Básico 1 Kiran · Jue 21:00 TOPIK II Jay (cupo 8). 8 semanas, 60 min, certificado incluido. Cierre de matrícula: domingo 11 de octubre. **Inicio: semana del 12 de octubre** (Niños empieza el lunes 19 porque el 12 es feriado en Chile, y termina el 7 de diciembre; el resto termina la semana del 30 de noviembre). Profesora de Básico 1: **Kiran** (기란; id interno `guiran` en `lib/nivel1.ts`, no renombrar).
- Páginas: `/nivel-1` = inscripción (acepta `?clase=a11-martes|a11-jueves|a12|a21|topik2|ninos`), `/programa` = syllabus público, `/lector-coreano` (URL oficial desde el 22 sept 2026; `/lector-hangul`, `/coreano`, `/lector`, `/lectorcoreano` y `/lectorhangul` redirigen; rewrite en next.config.mjs) = app gratuita de lectura con audio nativo. **Fuente única: `public/lector-coreano/index.html`** (cabecera `.site-top` y pie `.site-foot` propios; Dubu usa la misma cabecera y pie — misma interfaz — y ambos comparten `as-theme`) (HTML+CSS+JS en un archivo; clips en `public/audio/kr/<hex-utf8>.mp3`, voz ko-KR-SunHiNeural, rate -8%). Pestañas: Alfabeto (21 vocales / 19 consonantes como botones con audio) · Aprender · Practicar · Progreso. Componentes clave: `Escalera`, `HorarioSemanal` (selector de país), `SidebarCursos` (columna izquierda), `ResumenReserva`, `EquipoProfes`; hook `lib/useHoraLocal.ts`.
- **Dubu · 두부** (`/dubu`, rewrite en next.config.mjs → `public/dubu/index.html`, un solo archivo): puzzle gratuito del Hangul (consonante + vocal → palabra leída o escuchada; 30 niveles en 6 barrios; audio Jay → SunHi → TTS). Enlazado en el menú Recursos, en la columna "Gratis" del footer, en la home (RecursoBanner) y en `/recursos`. Fuentes y guía de voz en `Juego_Dubu/`.
- **Taller gratis** (`/taller`, desde el 22 sept 2026): modo "grabado" — la clase completa de Hangul en YouTube (`zmbuLPcgfpw`, empieza en el segundo 2414) embebida en la página, formulario = material + aviso del próximo en vivo; datos en `lib/taller.ts` (`PROXIMO_TALLER.fechaISO = null` ⇒ grabado; con fecha futura vuelve el modo en vivo). Enlazado en Recursos (menú), footer "Gratis" y `/recursos`. Contacto = WhatsApp directo.
- **Trilingüe ES/EN/KO + modo día/noche** (16 sept 2026). Preferencias en `lib/prefs.tsx` (localStorage `as-lang`/`as-theme`; controles en `components/PrefsControls.tsx`, en el menú). Traducción estilo gettext: `t("texto en español")` desde `lib/i18n.tsx` en componentes cliente; datos a nivel de módulo se marcan con `i18n("...")`; los campos de `lib/nivel1.ts` se traducen al renderizar (`t(curso.subtitulo)`, `td(horarioDe(...))` para días). Diccionarios `lib/dict/en.ts` y `lib/dict/ko.ts` (915 claves; si falta una clave se muestra el español). Para textos nuevos: envolver con `t()`, extraer claves con `scratchpad/i18n_extract.js`, traducir en `i18n_en.json`/`i18n_ko.json` y regenerar con `i18n_build_dict.js`. Nunca `${}` dentro de `t()`. Páginas con `metadata` se parten en `app/x/page.tsx` (server, metadata) + `components/XContent.tsx` (cliente). Siguen solo en español: Lector, blog, legales, guías/pronunciación, generador-nombre, hangul-dle y la metadata SEO.
- Modo noche: sin `dark:` por componente; `app/globals.css` remapea las utilidades claras bajo `html.dark` (bloque generado por `scratchpad/gen_dark_css.js`). Textos azules inline: `var(--as-azul-txt)` / `var(--as-navy-txt)`. El Lector comparte `as-theme` y tiene botón luna/sol.
- Pagos: Mercado Pago — link fijo `MP_LINK_UNICO = https://mpago.la/1cHrbqy` ($150.000 CLP, tarjeta o transferencia sin cuenta; confirmado por Jay el 22 sept 2026) abre directo desde /nivel-1; `MP_LINK_MENSUAL` vacío ⇒ el plan en cuotas usa el checkout dinámico `app/api/checkout/route.ts` (CLP 150.000 / 75.000, requiere `MP_ACCESS_TOKEN` en Netlify), PayPal (links en `lib/nivel1.ts`: `5X33QK4A928FU` = US$150 y `SQ2YHGEZFUDEC` = US$75, confirmados el 15 sept 2026), Hotmart opcional (links vacíos = botón oculto), transferencia por WhatsApp.

## Documentos del repo
- `Plan_Choque_20sep_13oct_2026.md` — plan vigente día a día 20 sept → 13 oct (reels, emails Brevo L1–N1, WhatsApp normal sin Business, historias). `Campana_Lanzamiento_Octubre_2026.md` = estrategia original (referencia). `Posts_Boletin_Cursos_Octubre_2026/` = 7 láminas de Instagram (boletín de cursos) + captions.
- `Captions_Redes_Octubre_2026.md` — evaluación del Reel 01 ("Volví", 22 sept) + captions Instagram/YouTube Shorts/TikTok de todos los posts de la campaña + guía de grabación (set, texto en pantalla, portadas, bloques de grabación).
- `Email_Octubre_2026/` — email de lanzamiento (3 variantes, WhatsApp, HTML, guía de envío con Brevo).
- `public/programas/` — 6 PDFs descargables (generados con `make_programas_pdf.js` en el scratchpad de esta PC).
- `Programa_Cursos_Octubre_2026`, `Desarrollo_Clases_2026-2`, `Guia_CEFR_TOPIK_Escalera_Cursos`, `Horarios_Equipo_2026-2` — planificación pedagógica.
- `A1_Nivel_1/` — repaso mid-term (pptx), examen, vocabulario, guía de estudio; `TOPIK_II/` — clase 1.

## Pendientes de Jay (no los des por hechos)
1. Decidir si Hotmart se activa como tercera pasarela.
2. Enviar el email de lanzamiento (contactos en Formspree `mzdypyky` → CSV).
3. En PayPal: activar "Cuenta de PayPal opcional" (tarjeta sin cuenta) y el retorno automático a /nivel-1?pago=success.
4. **Rotar `RESEND_API_KEY`** (estaba versionada en `.env.local`/`.env.production` desde el primer commit; hoy se sacó de git) y cargarla en Netlify junto con `OWNER_EMAIL`. Ver `Auditoria_Sitio_2026-09-22.md` §1.
5. Crear el link de Mercado Pago de $75.000 CLP (cuota 1 de 2) → `MP_LINK_MENSUAL` en `lib/nivel1.ts`.
6. Subir a YouTube la miniatura azul del taller (`Campana_Assets/youtube/taller_hangul_miniatura.png`).

## Auditorías
- `Auditoria_Sitio_2026-09-22.md` (rev. 2) — 14 hallazgos resueltos (hero 3,5 MB → 302 KB, og-image/iconos azules, /taller grabado, LiteYouTube, /lector-coreano, Dubu con cabecera y pie, 404 propio, idioma automático que prefiere español, aria-labels del formulario, `.env` fuera de git) y 4 pendientes de Jay. Scripts en el scratchpad: `audit_site.js` (metadatos, peso, textos prohibidos) y `audit_links.js` (rastreo de links).
- Variables de entorno documentadas en `.env.example` (nunca subir `.env.local` ni `.env.production`).

## Cómo trabajar
- Commits en español, sin acentos en el asunto es aceptable; push a `main` despliega.
- No hay Python ni LibreOffice en la PC principal; sí Word/PowerPoint (COM) y poppler.
- Antes de cambiar precios, horarios o nombres de cursos: confirma con Jay.
