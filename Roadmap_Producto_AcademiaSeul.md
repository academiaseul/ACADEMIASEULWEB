# 🗺️ Roadmap de Producto — Academia Seúl

> **Principio rector:** tu ventaja no es el contenido pre-grabado (eso lo hace Haru y mil más). Es **clases en vivo + comunidad + la marca Jay Chingu + el Método Chingu**. Todo lo que construyamos debe *reforzar* eso: herramientas que hagan el aprendizaje divertido entre clases, que enganchen, y que se mantengan baratas. Construimos sobre tu web actual (Next.js en Vercel) para no pagar infraestructura nueva.

**Cómo leer cada ítem:** _Qué es · Valor · Costo (inicial / mensual) · Tecnología · Esfuerzo._

---

## ✅ Fase 0 — La base (ya construida)

Esto ya existe y funciona:
- Web (Next.js/Vercel), página Nivel 1 con formulario de inscripción y pagos
- Pipeline de inscripciones (Excel), kit de ventas, brochure
- Blog + sistema de contenido (Método Chingu, calendario 30 días)
- Sistema de certificados del taller

**Costo mensual actual:** prácticamente solo el dominio + Vercel (plan gratis/bajo).

---

## 🚀 Fase 1 — Herramientas interactivas en tu web (mes 1–2)
*Alto valor · costo casi cero · viven en tu web actual, sin backend nuevo.*

**1. Generador de nombre en 한글** ⭐ _(empezar por aquí)_
- _Qué:_ el usuario escribe su nombre → se lo muestra en coreano, bonito, listo para descargar/compartir.
- _Valor:_ altísimo en marketing (es tu gancho más viral) + sirve para los certificados.
- _Costo:_ inicial bajo · mensual **$0**.
- _Tech:_ página en tu Next.js + tabla de transliteración (regla, sin IA cara).
- _Esfuerzo:_ bajo (1–2 días).

**2. Entrenador de Hangul (juego "lee tu primera palabra")**
- _Qué:_ muestra una sílaba/palabra, el alumno la lee y la teclea o elige; feedback al instante.
- _Valor:_ refuerza tu promesa de marca; engancha; sirve de "prueba gratis" interactiva.
- _Costo:_ inicial medio-bajo · mensual **$0**.
- _Tech:_ Next.js + datos en JSON. Sin servidor.
- _Esfuerzo:_ medio (3–5 días).

**3. Flashcards con repaso espaciado + quizzes por lección**
- _Qué:_ tarjetas de vocabulario que repiten lo que cuesta (estilo Duolingo) + un quiz corto por lección.
- _Valor:_ retención entre clases = alumnos que terminan y recompran.
- _Costo:_ inicial medio · mensual **$0**.
- _Tech:_ Next.js, progreso guardado en el navegador (o cuenta simple después).
- _Esfuerzo:_ medio.

**Meta de Fase 1:** que tu web no sea solo informativa, sino un lugar donde la gente *practica gratis* → se engancha → se inscribe.

---

## 🤖 Fase 2 — IA y escala (mes 2–4)
*Alto valor · costo controlable por uso.*

**4. Tutor IA "Chingu" (chatbot 24/7)** ⭐
- _Qué:_ un chat en tu web/Discord que responde dudas de coreano en español, practica conversación y explica gramática a cualquier hora.
- _Valor:_ soporte sin que tú estés despierto; gran factor de retención y diferenciación.
- _Costo:_ inicial medio · mensual **variable según uso** (pagas tokens de API; se controla con límites por alumno).
- _Tech:_ API de un modelo de lenguaje (Claude/OpenAI) + tu web. Le das instrucciones con el Método Chingu para que enseñe a tu estilo.
- _Esfuerzo:_ medio.

**5. Biblioteca de clases pre-grabadas (complemento, no reemplazo)**
- _Qué:_ versiones grabadas de tus lecciones, para repaso o como producto "self-paced" más barato.
- _Valor:_ escala infinita (grabas una vez), nueva fuente de ingresos.
- _Costo:_ inicial = tu tiempo de grabar · mensual = hosting de video (bajo-medio).
- _Tech:_ Teachable / Hotmart / Vimeo (no construir LMS propio).
- _Esfuerzo:_ medio-alto (grabar lleva tiempo).

**6. Bot de ventas/soporte (WhatsApp o web)**
- _Qué:_ responde automáticamente "¿info del Nivel 1?" con el kit de ventas que ya armamos.
- _Valor:_ no pierdes leads por responder tarde.
- _Costo:_ bajo-medio.
- _Tech:_ ManyChat / API de WhatsApp / chatbot web + el kit de ventas como base.
- _Esfuerzo:_ bajo-medio.

---

## 🌱 Fase 3 — Profundizar (mes 4–8)
*Valor alto pero más caro o más complejo → cuando ya tengas tracción.*

**7. Coach de pronunciación con IA**
- _Qué:_ el alumno graba su voz, la IA compara y da feedback.
- _Costo:_ alto (APIs de voz) → por eso va aquí.
- _Tech:_ APIs de reconocimiento/evaluación de voz.

**8. Gamificación + comunidad**
- _Qué:_ rachas, insignias, ranking; Discord "Los Chingus" con bots.
- _Valor:_ retención y sentido de pertenencia.
- _Costo:_ bajo-medio.

**9. Test de nivel (recomendador)**
- _Qué:_ un quiz que recomienda por qué nivel empezar.
- _Valor:_ guía la compra; bajo costo.

---

## 🚫 Lo que NO haremos (todavía)
- **App móvil nativa desde cero** — mucho costo y mantenimiento; tu web responsive hace el 90%.
- **Plataforma LMS propia** — reinventar la rueda; usa Teachable/Hotmart cuando llegue el pre-grabado.

Estas las reconsideramos solo cuando tengas cientos de alumnos pagando de forma estable.

---

## 🧰 Stack tecnológico recomendado
| Área | Herramienta | Por qué |
|------|-------------|---------|
| Web / apps | Next.js en Vercel (ya lo tienes) | Las herramientas de Fase 1 viven aquí, costo casi nulo |
| IA / tutor | API de un LLM (Claude / OpenAI) | Pagas por uso, sin servidor propio |
| Nombre en 한글 | Tabla de transliteración | Casi sin costo, no necesita IA cara |
| Video pre-grabado | Teachable / Hotmart / Vimeo | No construir LMS propio |
| Pagos | Mercado Pago · Flow (Chile) · PayPal | Ya definido |
| CRM / datos | Hoja de cálculo o Airtable + Zapier | Barato, sin código |
| Email | MailerLite | Plan gratis para empezar |
| Comunidad | Discord | Gratis, donde ya está tu audiencia |

---

## 💰 Lógica de costos (resumen honesto)
- **Fase 1:** ~$0 extra al mes (todo en tu Vercel actual). Solo invierte tiempo de desarrollo.
- **Fase 2:** costo **variable** = tokens de IA (controlable con límites) + hosting de video (bajo-medio). Sube solo si suben los alumnos = buena señal.
- **Fase 3:** aquí entran los costos más altos (voz), por eso van al final.

*Verifica los precios actuales de cada herramienta antes de comprometerte — cambian seguido.*

---

## 📊 Métrica de éxito por fase
- **Fase 1:** % de visitantes que usan una herramienta (engagement) → más inscripciones desde la web.
- **Fase 2:** retención entre clases (¿usan el tutor?) + ventas del pre-grabado.
- **Fase 3:** finalización del curso + recompra al Nivel 2.

---

## 🎯 Recomendación de arranque
Empieza por el **Generador de nombre en 한글**: máximo impacto de marca, costo cero, lo construimos en tu web y lo pruebas el mismo día. Es la prueba perfecta de este enfoque "herramienta interactiva barata que alimenta el negocio".

*화이팅 chingu! 🇰🇷 — Roadmap vivo: lo ajustamos con lo que diga tu data y tus alumnos.*
