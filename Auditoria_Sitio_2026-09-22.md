# Auditoría del sitio · 22 de septiembre de 2026
**Revisión 2 (tarde del 22)** — los puntos se reordenaron por impacto real y se cerraron todos los que no dependen de una cuenta externa.

**Alcance:** 19 rutas públicas en escritorio y móvil (390 px), 51 rutas internas rastreadas, links externos, metadatos, peso de página, accesibilidad básica, marca (nada rojo) y textos vigentes (fechas, precio, nombres). Continúa la auditoría del 15 de septiembre (`Auditoria_Sitio_2026-09-15.md`).

**Resultado:** 14 hallazgos resueltos · 4 pendientes (3 dependen de cuentas externas de Jay) · 3 en observación. Sin enlaces rotos, sin errores de consola, sin overflow en móvil, un solo `<h1>` por página.

---

## 🔴 Crítico · acción de Jay HOY

### 1. La clave de Resend estaba versionada en git
**Qué pasó:** `.env.local` y `.env.production` estaban en el repositorio desde el primer commit (el `.gitignore` los cubre desde hace tiempo, pero git ya los seguía y la regla no aplica a lo ya rastreado). Los dos contienen `RESEND_API_KEY`.
**Por qué importa:** cualquiera con acceso al repositorio —y todo el historial, aunque hoy se borre— puede leer la clave y enviar correos desde el dominio de la academia.
**Hecho hoy:** los dos archivos salieron del control de versiones (`git rm --cached`; siguen en el disco, el desarrollo local no cambia) y se agregó `.env.example` documentando cada variable.
**Te toca a ti, en este orden:**
1. **Rotar la clave** en resend.com → API Keys → borrar la actual y crear una nueva. *(2 min; mientras no lo hagas, la clave vieja sigue siendo válida para quien la tenga.)*
2. Netlify → Site configuration → **Environment variables** → agregar `RESEND_API_KEY` (la nueva) y `OWNER_EMAIL=hola.academiaseul@gmail.com`.
**Si no lo haces:** el sitio sigue funcionando igual (el webhook está protegido con `if (process.env.RESEND_API_KEY)`), pero dejarás de recibir el correo de aviso cuando alguien pague por Mercado Pago **y** la clave filtrada seguirá activa.
**Cómo verificar:** `git ls-files | grep .env` no debe devolver nada; en Netlify, la variable aparece en la lista.

---

## 🟡 Pendiente · necesita tu cuenta

### 2. Falta el link de Mercado Pago de las cuotas (US$75 / $75.000 CLP)
**Estado:** el pago único ya abre tu link fijo `https://mpago.la/1cHrbqy` ($150.000 CLP, tarjeta o transferencia sin cuenta). El plan en 2 cuotas usa el checkout dinámico, que **solo funciona si `MP_ACCESS_TOKEN` está cargada en Netlify**; si falla, el botón manda al alumno a WhatsApp (no se pierde la venta, pero se enfría).
**Qué hacer:** crear en Mercado Pago un link de pago de **$75.000 CLP** llamado "Academia Seúl · Curso de coreano · cuota 1 de 2" y pegarlo en `MP_LINK_MENSUAL` en [lib/nivel1.ts](lib/nivel1.ts) (línea junto a `MP_LINK_UNICO`). *(5 min.)*
**Alternativa si no lo creas:** carga en Netlify `MP_ACCESS_TOKEN`, `MP_PRICE_CLP_UNICO=150000` y `MP_PRICE_CLP_MENSUAL=75000` (están documentadas en `.env.example`).
**Cómo verificar:** en `/nivel-1`, elegir "2 cuotas" → el botón de Mercado Pago debe abrir el checkout con $75.000, no WhatsApp.

### 3. PayPal: retorno automático al sitio
**Qué falta:** en la cuenta PayPal, activar el retorno automático a `https://www.academiaseul.com/nivel-1?pago=success`. La página ya entiende ese parámetro y muestra el mensaje de "pago recibido".
**Por qué importa:** hoy el alumno termina de pagar y se queda en PayPal; no vuelve a la página que le confirma el cupo y le explica los siguientes pasos.
**Cómo verificar:** pagar US$1 de prueba (o pedirle a alguien) y comprobar que el navegador vuelve solo a `/nivel-1?pago=success`.

### 4. Miniatura del taller en YouTube (es el último rojo que queda de la marca)
**Qué pasa:** el video `zmbuLPcgfpw` (el que ahora se ve dentro de `/taller`) tiene una miniatura con un panel rojo y el logo antiguo. Se ve en la página del taller, en YouTube y en cualquier lugar donde se comparta.
**Hecho hoy:** te dejé **dos miniaturas listas en azul de marca**, 1280×720, en `Campana_Assets/youtube/`:
- `taller_hangul_miniatura.png` — "Aprende a leer coreano · 한글 · Clase completa · 1 hora · desde cero"
- `dubu_miniatura.png` — "Tu primera palabra en 30 segundos · 우유" (para cuando subas el Short de Dubu)
**Qué hacer:** YouTube Studio → el video → Editar → Miniatura → subir el PNG. *(2 min.)*

---

## ✅ Resuelto hoy

| # | Hallazgo | Impacto | Qué se hizo |
|---|---|---|---|
| 5 | **Hero de 3,5 MB** (`hero-gwanghwamun.jpg`, 5602 px) — la home pesaba 4,2 MB en móvil | Primera impresión lenta en datos móviles; es la métrica que Google usa para rankear | Recomprimido a 1920 px · **302 KB** (−91 %). Original guardado en el scratchpad. Home ≈ 970 KB en dev |
| 6 | **Imagen al compartir en rojo** (`og-image.png` con el logo rojo antiguo) | Era lo que aparecía en WhatsApp e Instagram al pegar *cualquier* link del sitio | Nueva imagen azul `#4236F6` con el logo blanco, el tigre y "Dubu y Lector de Hangul gratis" |
| 7 | **Favicon e icono de iPhone en rojo** | El icono guardado en la pantalla de inicio salía rojo | `app/icon.png` y `app/apple-icon.png` regenerados: tigre blanco sobre azul de marca |
| 8 | **"chingu" en rojo** en el pie del Lector (`#FF5A5F`) y hover de redes | Regla de la casa: nada en rojo | Azul `#8B85FF`, el mismo del modo noche |
| 9 | **`/taller` huérfana** en modo "fecha por anunciar" | Página muerta que recibía visitas desde emails y Google | Modo **grabado**: clase completa embebida (arranca en 40:14), formulario de material, bloque "tu siguiente paso" (Dubu · Lector · Básico 1). Enlazada en menú, footer, `/recursos` y sitemap, con metadatos propios |
| 10 | **2 reproductores de YouTube cargaban solos** en `/taller` (2,7 MB) | Página lentísima en celular y cookies de Google antes de que nadie pida ver nada | Componente `LiteYouTube`: miniatura + botón; el reproductor entra al hacer clic. `/taller` bajó a **517 KB** |
| 11 | **URL del Lector** `/lector-hangul` | Jay quiere `/lector-coreano` como dirección oficial | Renombrada. Redirigen 308: `/lector-hangul`, `/lectorhangul`, `/lectorcoreano`, `/coreano`, `/lector`. Ningún link publicado se rompe |
| 12 | **Dubu sin salida al sitio** | El jugador terminaba el puzzle y no tenía cómo llegar a los cursos | Misma cabecera y pie que el Lector (logo, Inicio/Lector/Recursos/Cursos, botón de tema), más `<h1>`, canonical y Open Graph |
| 13 | **Sin página 404** | Un link mal escrito mostraba la pantalla en blanco de Next | [app/not-found.tsx](app/not-found.tsx): 404 de marca, trilingüe, con los 6 destinos más usados, precio y fecha de la cohorte, y botón de WhatsApp |
| 14 | **Idioma automático demasiado agresivo** | Un alumno chileno con el teléfono en inglés veía el sitio en inglés | Ahora se revisa toda la lista `navigator.languages`: si hay español en cualquier posición, manda español. Probado: `es-CL`→es · `en-US + es-419`→**es** · `en-US`→en · `ko-KR`→ko |
| 15 | **Formulario de inscripción sin nombres accesibles** (9 campos) | Un lector de pantalla leía solo el texto de ejemplo; también afecta al autocompletado | `aria-label` en los 9 campos (traducido a EN/KO). Verificado: 0 campos sin nombre |
| 16 | **Botón de cerrar la barra de promoción de 18×18 px** | Por debajo del mínimo táctil (24 px): difícil de cerrar en celular | Área de toque de 36×36 px con estado hover |
| 17 | **3,3 MB de archivos sin uso en `public/`** | Peso muerto en el deploy; ninguno estaba enlazado desde el sitio ni desde los emails | `cartoon-gwanghwamun.png`, `pronunciacion-coreana-PRINT.html` y 3 logos duplicados (`_redbak`, `_ORIGINAL`) movidos a `Campana_Assets/fuente/` — se conservan, ya no se publican |
| 18 | **Export estático viejo (`out/`, 37 archivos) versionado** | Confunde: parecía el sitio en producción y no lo es (Netlify usa `.next`) | Fuera del control de versiones |

---

## 🔍 En observación (no hace falta actuar hoy)

- **Facebook `jaychingu.oficial` responde 400 a los rastreadores.** Es el comportamiento normal de Facebook con bots; ábrelo una vez en el navegador para confirmar que la página está publicada. Si no la usas, conviene sacarla del footer: un link a una página vacía resta confianza.
- **Enlaces de texto del pie por debajo de 24 px de alto.** Son links dentro de texto (la norma los exenta) y tienen separación suficiente entre filas. Si el pie crece, subir el interlineado.
- **`SecurityError: localStorage` en las pruebas automáticas.** Solo aparece en el navegador de pruebas sin permisos de almacenamiento; el código ya lo captura con `try/catch` y el sitio se muestra en español. No ocurre en un navegador real.
- **Google Docs del Drive (Programa Completo ES/EN).** Siguen con las fechas de octubre 5 y "Guiran". El HTML ya regenerado está en el scratchpad (`programa/programa_es.html`, `programa_en.html`); avísame y los actualizo en la carpeta de Drive.

---

## Cómo repetir esta auditoría

```bash
npm run build && npx next start -p 3111
```
Con el servidor arriba, desde el scratchpad de la sesión:
- `node audit_site.js` — metadatos, `h1`, `alt`, errores de consola, overflow móvil, peso por página y textos prohibidos (fechas viejas, "Guiran", "8–12", `lector-hangul`).
- `node audit_links.js` — rastrea las 51 rutas internas y prueba los links externos.

> **Corrección de la revisión 1:** el informe de la mañana marcaba "5 de octubre / 4 de octubre" en `/programa`. Era un falso positivo del script: la expresión `5 de octubre` también coincide dentro de "1**5 de octubre**". Ya está corregida (`(^|[^0-9])[45] de octubre`) y `/programa` está limpia.
