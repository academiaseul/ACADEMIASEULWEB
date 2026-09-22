# Auditoría del sitio · 22 de septiembre de 2026

Revisión de las 19 rutas públicas (desktop y móvil 390 px), links internos y externos, metadatos, peso de página, marca (nada rojo) y textos vigentes (fechas, precio, nombres). Complementa la del 15 de septiembre (`Auditoria_Sitio_2026-09-15.md`).

## Resuelto hoy ✅

| Tema | Antes | Ahora |
|---|---|---|
| **Peso de la home** | `hero-gwanghwamun.jpg` de 5602 px y **3,5 MB** (la home pesaba 4,2 MB en móvil) | Recomprimido a 1920 px · **302 KB** (original guardado en el scratchpad). Home ≈ 0,9 MB. |
| **Imagen al compartir (og-image)** | Logo **rojo** sobre azul: es lo que salía en WhatsApp/Instagram al pegar cualquier link | Nueva `og-image.png` azul `#4236F6` con el logo blanco, sello del tigre y "Dubu y Lector de Hangul gratis". |
| **Favicon / icono iOS** | Tigre sobre **rojo** (`app/icon.png`, `app/apple-icon.png`) | Tigre blanco sobre azul `#4236F6`, esquinas redondeadas. |
| **"chingu" en rojo** | Pie del Lector: `chingu` en `#FF5A5F` y hover de redes en rojo | Azul `#8B85FF` (el mismo que usa el sitio en modo noche). |
| **/taller** | Página huérfana en modo "próximo taller · fecha por anunciar", con link externo a YouTube | Modo **grabado**: la clase completa embebida (arranca en el minuto 40:14 del directo), formulario = material + aviso del próximo en vivo, bloque "tu siguiente paso" (Dubu · Lector · Básico 1). Enlazada en menú Recursos, footer "Gratis", `/recursos` y sitemap. Metadatos propios (`app/taller/layout.tsx`). |
| **YouTube en /taller** | 2 reproductores cargaban al abrir la página (**2,7 MB**) | Componente `LiteYouTube`: miniatura + botón; el reproductor se carga al hacer clic. |
| **URL del Lector** | `/lector-hangul` | **`/lector-coreano`** (oficial). Redirigen 308: `/lector-hangul`, `/lectorhangul`, `/lectorcoreano`, `/coreano`, `/lector`. Todos los links internos, emails y documentos actualizados. |
| **Dubu sin navegación** | El juego no tenía forma de volver al sitio | Misma cabecera y pie que el Lector (`.site-top` / `.site-foot`), botón de tema en la cabecera, `<h1>`, canonical y Open Graph. |
| **Mercado Pago** | Solo checkout dinámico (depende de `MP_ACCESS_TOKEN` en Netlify) | Link fijo de Jay `https://mpago.la/1cHrbqy` ($150.000 CLP, tarjeta o transferencia sin cuenta) abre directo para el pago único; el plan en cuotas sigue por el checkout dinámico hasta que exista el link de $75.000. Precios CLP alineados (150.000 / 75.000). |
| **Carpeta `out/`** | Export estático viejo (37 archivos) versionado aunque está en `.gitignore` | Quitada del control de versiones (`git rm --cached`); no afecta al deploy (Netlify usa `.next`). |
| **Sitemap** | Sin `/dubu` ni `/taller` | Añadidos; `lastmod` 22 sept. |
| Textos vigentes | — | Sin restos de "5/4 de octubre", "Guiran" ni "8–12" en las 19 rutas. |

## Verificado sin problemas ✅
- 51 rutas internas rastreadas: 0 enlaces rotos. Externos: PayPal US$150 y US$75 (muestran monto y "pagar con tarjeta" sin cuenta), Mercado Pago, Formspree, WhatsApp, Instagram, YouTube, TikTok responden. Facebook `jaychingu.oficial` responde 400 a robots (normal en Facebook); abrirlo a mano.
- Metadatos: título, description, canonical y og:image en todas las rutas (Dubu y taller incluidos).
- Sin errores de consola en ninguna ruta. Sin overflow horizontal en móvil.
- Un solo `<h1>` por página.

## Pendiente (requiere decisión o acción de Jay) ⏳
1. **Miniatura del video del taller en YouTube** (`zmbuLPcgfpw`): tiene un panel rojo con el logo antiguo. Cambiarla en YouTube Studio por una azul (puedo generarla: 1280×720, mismo estilo que la og-image).
2. **`MP_LINK_MENSUAL`**: crear en Mercado Pago el link de $75.000 CLP ("cuota 1 de 2") y pegarlo en `lib/nivel1.ts`; hasta entonces el botón de cuotas usa el checkout dinámico (necesita `MP_ACCESS_TOKEN`, `MP_PRICE_CLP_UNICO=150000` y `MP_PRICE_CLP_MENSUAL=75000` en Netlify).
3. **PayPal**: retorno automático a `https://www.academiaseul.com/nivel-1?pago=success` (se configura en la cuenta PayPal).
4. **Archivos sin uso en `public/`** (no se sirven salvo que alguien tenga el link): `cartoon-gwanghwamun.png` (1,9 MB), `pronunciacion-coreana-PRINT.html` (1,4 MB), `logo-*_redbak.png`, `logo-tiger-red_ORIGINAL.png`. Se pueden borrar cuando Jay confirme.
5. **Secretos en el historial de git** (auditoría del 15 sept): sigue pendiente rotar las claves si alguna vez se subieron.
6. **Google Docs del Drive** (Programa Completo): siguen con las fechas del 5 de octubre y "Guiran"; regenerar cuando Jay lo pida.

## Cómo repetir esta auditoría
`node scratchpad/audit_site.js` (metadatos, h1, alt, consola, overflow, textos prohibidos, peso) y `node scratchpad/audit_links.js` (rastreo de links) con el dev server en `localhost:3111`.
