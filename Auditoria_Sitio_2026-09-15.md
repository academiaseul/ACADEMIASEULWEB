# Auditoría del sitio · 15 de septiembre de 2026

Alcance: `app/`, `components/`, `lib/`, `public/`, `next.config.mjs`, `tailwind.config.ts`. Método: 4 auditores en paralelo (contenido · coherencia/terminología/CTAs · enlaces y código sin uso · responsive/SEO) y re-verificación de cada hallazgo contra el código. **166 hallazgos únicos confirmados**, 4 descartados.

Fuente de verdad: cohorte octubre 2026 · 8 semanas · 60 min · US$150 el curso completo o 2 cuotas de US$75 · nomenclatura Básico 1 (A1.1) / Básico 2 (A1.2) / Conversacional 1 (A2.1) / TOPIK II (B1+) / Coreano para Niños (8–12) · `lib/nivel1.ts` como única fuente de datos.

Leyenda: ✅ = corregido en este commit · ⏳ = requiere tu aprobación (sustancial, visual o depende de una decisión tuya).

---

## 1. Precios desactualizados
| Dónde | Qué decía | Estado |
|---|---|---|
| `app/nivel-1/layout.tsx` (meta description + OpenGraph) | "US$150 o US$75/mes" | ✅ "US$150 el curso completo o 2 cuotas de US$75" |
| `app/notificarme/page.tsx:142` | "US$150 pago único o US$75/mes" | ✅ |
| `app/notificarme/page.tsx:120, 166` | "acceso prioritario y **descuento de lanzamiento**" (no existe) | ✅ "acceso prioritario a horarios y cupos" |
| `app/api/checkout/route.ts:42` | título del ítem en Mercado Pago "Mensualidad 1 de 2 (US$75/mes)" | ✅ "Cuota 1 de 2 (US$75)" |
| `lib/nivel1.ts:38` | PayPal `5X33QK4A928FU` cobraba US$89 (link de julio) bajo un botón que dice US$150 | ✅ Jay actualizó el link a US$150 y creó `SQ2YHGEZFUDEC` para la cuota de US$75; ambos publicados el 15 sept |
| `public/programa-curso-nivel-1-a1.pdf` | PDF de julio: 11 sesiones × 90 min, US$89 | ⏳ borrar + redirect a `/programas/Programa_Basico1_Octubre_2026.pdf` |
| `public/pronunciacion-coreana-PRINT.html:1222-1228` | "Reserva tu lugar gratis… martes 7 de julio… precio fundador" (HTML público sin enlaces) | ⏳ sacar de `public/` |

## 2. Fechas desactualizadas
| Dónde | Qué decía | Estado |
|---|---|---|
| `app/taller/page.tsx` + `lib/taller.ts` | "Sábado 27 de Junio · 11:00 Chile · 16:00 España", tabla de husos del 6 de junio, "Próximo taller · Fecha por anunciar", captura correos a Formspree | ⏳ **borrar `/taller`** (+ `lib/taller.ts`, `TallerPopup.tsx`) y redirect 301 a `/lector-hangul` |
| `public/lector-hangul/index.html:1291` | footer con `<a href="/taller">Taller gratis</a>` | ✅ → "Cursos de octubre" (`/nivel-1#clases`) — corregido también en la fuente del scratchpad |
| `app/generador-nombre`, `app/test-nivel`, `components/WhatsAppFloat`, `Testimonials`, `WordGame`, `CTASection` | "desde el 5 de octubre" (Básico 1 parte el 6/8) | ✅ "la semana del 5 de octubre" / CTA unificado |
| `app/sitemap.ts` | `lastModified: new Date()` en todas (Google lo ignora) | ✅ fechas fijas |

## 3. Duraciones desactualizadas
Sin restos de "11 sesiones / 10 semanas / 90 min" en `app/`, `components/` ni `lib/` (ya limpiados hoy). Quedan solo en los archivos estáticos viejos de `public/` listados arriba (⏳).

## 4. Horarios desactualizados
`app/taller/page.tsx:127-137` (tabla del 6 de junio 20:00) — ⏳ se va con la página. `components/Benefits.tsx` items 5-8 (no renderizados) hablaban de clases presenciales — ✅ reescritos.

## 5. Información duplicada o contradictoria
| Dónde | Contradicción | Estado |
|---|---|---|
| `app/privacidad/page.tsx:189` | "servicios para mayores de 14; no recopilamos datos de menores de 14" vs curso Niños 8–12 | ✅ sección 8 reescrita (inscripción vía apoderado) |
| `app/privacidad/page.tsx:74,122` | procesadores de pago "Stripe, Mercado Pago, PayPal" (Stripe no existe) | ✅ |
| `app/privacidad/page.tsx:79,116,126` | "Vercel: hosting" (es Netlify), omite GA4/Clarity/Resend; "Mailerlite / Systeme.io" | ✅ Netlify + lista real de terceros; email marketing "Brevo" ⏳ **confirma** que es lo que usarás |
| `app/privacidad:89`, `app/terminos:51,117` | "taller gratuito" como servicio | ✅ |
| `app/terminos:105,250` + `privacidad:47,152,217` | correo `hola@academiaseul.com` vs `hola.academiaseul@gmail.com` en el resto del sitio | ⏳ **confirma** si el buzón del dominio existe; si no, lo cambio |
| `app/layout.tsx:47` | OpenGraph global: "método Korea Foundation", "profesor nativo" | ✅ Método Chingu™, profesores nativos |
| `components/About.tsx:8,11,123,136`, `Hero.tsx:174`, `Benefits.tsx:13-14` | "Profesor nativo de Seúl" (singular), "6 cursos del A1 al C2 + especializados", "profesores crecieron en Corea" (Guiran se crió en Argentina) | ✅ "Profesores coreanos nativos y bilingües", "De A1.1 a TOPIK II + Niños" |
| `components/CTASection.tsx:111`, `Benefits.tsx:20` | "Máx. 15 (12 en Niños)" omite TOPIK II = 8 | ✅ |
| `components/KoreanCulture.tsx:47` | "artículos cada semana" (hay 2 posts de junio) | ✅ |
| `app/sobre/page.tsx:83` | "equipo que pronto van a conocer" (ya está publicado) | ✅ |
| `components/Contact.tsx:217` | Dirección física "Magdalena 140, Las Condes" con mapa en una academia 100% online | ⏳ **confirma** si es oficina/dirección legal o la quito |
| `components/About.tsx:90` | alt "Estudiantes de coreano en Academia Seúl" sobre una foto de stock de Unsplash | ✅ alt "imagen ilustrativa" (⏳ ideal: foto real) |
| `components/Testimonials.tsx:66-121` | etiquetas mezcladas "Nivel A1 / Coreano Básico / Nivel B1 / Coreano Intermedio / Básico 2 (A1.2)" | ⏳ **confirma** de qué clases son (¿anteriores a la academia?) y unifico |

## 6. Enlaces rotos
Ningún enlace interno roto en `app/`/`components/` (verificados 30 destinos: rutas, archivos y anclas). Mejoras: `Footer.tsx:21` "Nuestro método" apuntaba a `/#about` (existe `#metodo`) ✅; `app/faq/page.tsx:65` "Escríbenos" iba al formulario en vez de WhatsApp ✅; `MetodoChingu.tsx:101` CTA a `/nivel-1` sin `#clases` ✅. `/lector-hangul` funciona porque Netlify sirve `public/lector-hangul/index.html`, pero no hay rewrite explícito en Next ⏳ (opcional).

## 7. Páginas y componentes sin uso
| Elemento | Estado |
|---|---|
| `components/TallerPopup.tsx`, `LeadMagnet.tsx`, `RemotionPlayer.tsx` (nadie los importa; Remotion arrastra `transpilePackages` + 4 dependencias) | ⏳ borrar |
| `app/api/route.ts` y `app/contact/route.ts` (mismo handler Resend duplicado; nadie hace `fetch` a ellos — todo va a Formspree) | ⏳ borrar |
| `app/taller/` + `lib/taller.ts` | ⏳ borrar + redirect |
| `public/`: `cartoon-gwanghwamun.png` (1,9 MB), `logo-stamp.png`, `logo-white.png`, `logo-tiger.png`, `logo-text.png`, `logo-tiger-red_ORIGINAL.png`, `*_redbak.png`, `pron-thumb-01.png` (duplicado), `syllable.png`, `coreano-basico-textbook-sample.html`, `pronunciacion-coreana-PRINT.html`, `programa-curso-nivel-1-a1.pdf`, 6 `.docx` fuente en `public/programas/` | ⏳ borrar / mover fuera de `public/` |
| `out/` (37 archivos del export estático de abril) versionado pese al `.gitignore` | ⏳ `git rm -r --cached out` |
| `@vercel/analytics` + `@vercel/speed-insights` en `app/layout.tsx` (el sitio vive en Netlify: los scripts dan 404) | ⏳ quitar |
| `lib/analytics.ts:52` evento `tallerSignup` | ✅ quitado |
| `tailwind.config.ts`: tokens `seoul-dark/charcoal/off-white/pink`, keyframe `glowPulse` rojo, `content: './pages/**'` | ⏳ limpieza opcional |
| **Seguridad:** `.env.local` y `.env.production` están **versionados en git** (contienen `RESEND_API_KEY`) aunque `.gitignore` los excluye | ⏳ `git rm --cached` + **rotar la clave en resend.com** y cargarla en Netlify → Environment variables. No lo hice yo porque si Netlify depende del archivo del repo, el webhook dejaría de enviar correos. |

## 8. Terminología inconsistente
✅ Corregidos: `app/notificarme` (nombres viejos "Conversacional A2.1", "Básico 2 · Tu primer año coreano", "Preparación TOPIK II"; eliminados "Coreano Intermedio / Avanzado / K-pop & K-drama"), `app/test-nivel`, `app/terminos:156`, `components/Benefits:31`, `Contact.tsx` (opciones de nivel/interés alineadas con la escalera), `WordGame`, voseo en `hangul-dle` ("Volvé", "Querés") y `WordGame` ("tenés"), rol de Jay unificado "Fundador y profesor".

## 9. CTAs inconsistentes
Había 9 redacciones para la misma acción (ir a `/nivel-1#clases`): "Inscribirme · Octubre 2026", "Inscribirme · semana del 5 de octubre", "Inscribirme · desde el 5 de octubre", "Inscribirme · Clases desde el 5 de octubre", "Ir a inscribirme", "Inscribirme ahora", "Aprende con el Método Chingu", "Reservar cupo", "Reservar mi cupo". ✅ Unificado: **"Inscribirme · Octubre 2026 →"** para entrar a la página de inscripción y **"Reservar mi cupo →"** dentro de ella.

## 10. Responsive (evidente en el código)
| Dónde | Problema | Estado |
|---|---|---|
| `app/nivel-1/page.tsx:303` | aviso "✅ Pago recibido" con `pt-20` queda bajo el header fijo (~120 px) | ✅ `pt-36 md:pt-40` |
| `app/nivel-1` stepper (l.422) y fila "¿Desde dónde pagas?" (l.586); `app/blog/page.tsx:63` meta de tarjetas; `app/page.tsx:73` botón con `whitespace-nowrap` de 335 px | filas sin `flex-wrap` que desbordan a 360–400 px | ✅ `flex-wrap` / sin `nowrap` |
| `components/HorarioSemanal.tsx:50` | tabla `min-w-[600px]`: en móvil es scroll horizontal (funciona, pero es el selector principal) | ⏳ versión apilada por día en <md |
| `components/Hero.tsx:20` | `h-screen overflow-hidden` con más contenido (chips + badges) del que cabe en móvil bajo | ⏳ revisar (`min-h-screen` sin `overflow-hidden`) |
| `components/Navigation.tsx:166` | menú móvil con `pt-20` bajo un header de ~120 px | ⏳ |
| `app/globals.css:21` | `scroll-padding-top: 140px` fijo vs header variable | ⏳ variable CSS desde Navigation |
| `components/HangulBoard.tsx:262,280` | `grid-cols-7` / `grid-cols-4` fijos en móvil | ⏳ |
| `components/VideoIntro.tsx` | h2 de 36 px inline y `<iframe height="560">` | ⏳ |
| `app/blog/hangul…:161` | `grid-cols-3` en móvil | ⏳ |

## 11. SEO
| Problema | Estado |
|---|---|
| **Títulos con doble marca**: el `template: '%s \| Academia Seúl'` del layout raíz se sumaba al "\| Academia Seúl" que ya traía cada página → "… \| Academia Seúl \| Academia Seúl" (faq, blog ×3, recursos ×3, sobre, programa, nivel-1, privacidad, terminos) | ✅ sufijo quitado de las 11 páginas |
| 4 páginas `"use client"` **sin metadata ni canonical** (heredaban título y canonical `/` de la home): `/generador-nombre`, `/hangul-dle`, `/test-nivel`, `/notificarme` | ✅ `layout.tsx` con title, description, canonical y OG para cada una |
| `alternates.canonical: '/'` en el layout raíz se heredaba en todas | ✅ movido a `app/page.tsx`; canonical propia en privacidad y terminos |
| Posts del blog con `openGraph` parcial (sin `images`/`url`/`type`) → se comparten sin imagen | ✅ |
| Páginas sin `openGraph` heredaban el título de la home al compartirse (faq, sobre, recursos ×3, blog, legales) | ✅ OG propio |
| Sitemap sin `/faq`, `/hangul-dle`, `/lector-hangul` | ✅ |
| `StructuredData`: `logo` apuntaba a `public/logo.png` (logo rojo antiguo, y es un JPEG) | ✅ → `/logo-tiger-red.png`; `provider` con `@id`/`url` |
| JSON-LD de cursos solo en la home | ✅ `StructuredData` también en `/programa` y en el layout de `/nivel-1` |
| `public/og-image.png` (lo que sale al compartir cualquier link) muestra el **logo rojo con marco** | ⏳ regenerar con el sello azul |
| `app/icon.png` / `apple-icon.png`: **favicon rojo** | ⏳ versión azul |
| `public/hero-gwanghwamun.jpg` **3,45 MB** (5602 px) servido sin optimizar como LCP de la home | ⏳ redimensionar a ≤1920 px / WebP |

---

## Archivos modificados en este commit (solo cambios seguros)
`app/layout.tsx` · `app/page.tsx` · `app/sitemap.ts` · `app/nivel-1/layout.tsx` · `app/nivel-1/page.tsx` · `app/programa/page.tsx` · `app/notificarme/page.tsx` · `app/notificarme/layout.tsx` (nuevo) · `app/generador-nombre/layout.tsx` (nuevo) · `app/generador-nombre/page.tsx` · `app/hangul-dle/layout.tsx` (nuevo) · `app/hangul-dle/page.tsx` · `app/test-nivel/layout.tsx` (nuevo) · `app/test-nivel/page.tsx` · `app/faq/page.tsx` · `app/sobre/page.tsx` · `app/blog/page.tsx` · `app/blog/*/page.tsx` · `app/recursos/page.tsx` · `app/recursos/guias/page.tsx` · `app/recursos/pronunciacion/page.tsx` · `app/privacidad/page.tsx` · `app/terminos/page.tsx` · `app/api/checkout/route.ts` · `components/About.tsx` · `Benefits.tsx` · `Hero.tsx` · `CTASection.tsx` · `Contact.tsx` · `Footer.tsx` · `KoreanCulture.tsx` · `MetodoChingu.tsx` · `StructuredData.tsx` · `Testimonials.tsx` · `WordGame.tsx` · `WhatsAppFloat.tsx` · `lib/analytics.ts` · `public/lector-hangul/index.html`.

## Pendiente de tu aprobación (no tocado)
1. **Borrar `/taller`** (`app/taller/`, `lib/taller.ts`, `components/TallerPopup.tsx`) + redirect 301 `/taller → /lector-hangul`.
2. **Secretos en git**: `git rm --cached .env.local .env.production`, rotar `RESEND_API_KEY` en resend.com y cargarla en Netlify. Y `git rm -r --cached out/`.
3. **Código y archivos sin uso**: `LeadMagnet`, `RemotionPlayer` + Remotion (deps y `transpilePackages`), `app/api/route.ts`, `app/contact/route.ts`, `@vercel/analytics` + `speed-insights`, 13 archivos huérfanos de `public/`, los 6 `.docx` de `public/programas/`, tokens muertos de Tailwind.
4. **Assets de marca**: og-image y favicon en azul; hero comprimido.
5. **Decisiones de contenido**: correo `hola@academiaseul.com` ¿existe?; dirección Magdalena 140 ¿se publica?; etiquetas de los testimonios; plataforma de email en la política (Brevo).
6. **Responsive de segunda pasada**: grilla semanal apilada en móvil, hero `h-screen`, menú móvil, `scroll-padding` dinámico, HangulBoard, VideoIntro.
7. ~~PayPal~~ — resuelto: links de US$150 y US$75 publicados.
