# ManyChat — Flujo de inscripción (Instagram + Facebook)

**Objetivo:** que cada comentario o DM termine en tu formulario de inscripción.
**Link del formulario:**
https://docs.google.com/forms/d/e/1FAIpQLScBdZpwLNBi_5qOFfn5bIeUB8OkglfqCu4ai8y59VgAinj_Pg/viewform

> Consejo: acórtalo con bit.ly (ej. bit.ly/coreano-nivel1) para que se vea limpio en los mensajes.

---

## PARTE 1 · El disparador (Trigger)

Tienes 2 formas de activar el flujo. Puedes usar las dos.

**A) Palabra clave (Keyword)**
1. En ManyChat: **Automation → New Automation → Trigger → "Keyword"** (Instagram y/o Facebook).
2. Palabras que activan: `COREANO`, `INFO`, `PRECIO`, `CLASE`, `INSCRIPCION`.
3. Conéctalo al flujo de la Parte 2.

**B) Comentarios en tus publicaciones (Comment Trigger)**
1. **Automation → New → Trigger → "Instagram Comments"** (o "Facebook Comments").
2. Elige: aplicar a **todos los posts** o a uno específico (ej. el Reel de Sejong / el carrusel de inscripción).
3. Opción "responde a cualquier comentario".
4. **Respuesta pública** (la que ve todo el mundo), escribe 1–2 variantes:
   - "¡Te acabo de escribir por DM con toda la info! 💜🇰🇷"
   - "Revisa tu mensaje privado, te mandé el detalle 💜"
5. Y que **abra el DM** con el flujo de la Parte 2.

---

## PARTE 2 · El flujo de mensajes (DM)

Crea estos 3 pasos (Message nodes) dentro del flujo.

### Mensaje 1 — Bienvenida + valor
> ¡Hola! 안녕하세요 💜 Soy Jay, de Academia Seúl 🇰🇷
> Te cuento del **Nivel 1 · Primeras Palabras** (desde cero):
> 📚 12 clases EN VIVO por Zoom (90 min) · profe nativo · grupos pequeños
> 🎓 Cuaderno + grabaciones + 200 flashcards + Certificado (A1)
> 💜 Precio de lanzamiento: $85.000 CLP / $89 USD (~$7.000 por clase)
>
> [Botón] ✅ Quiero inscribirme
> [Botón] 🕐 Ver horarios
> [Botón] 💬 Tengo una duda

- **Botón "Quiero inscribirme"** → tipo **URL** → pega el link del formulario. (Salta al Mensaje 2.)
- **Botón "Ver horarios"** → abre un mensaje corto:
  "🌙 Miércoles 20:00 (Chile) — desde el 8 jul · ☀️ Sábados 11:00 (Chile) / 17:00 (España) — desde el 11 jul. ¿Te reservo tu cupo?" + botón URL al formulario.
- **Botón "Tengo una duda"** → respuesta: "¡Cuéntame! Te leo por aquí 💜" y te llega la notificación para responder tú.

### Mensaje 2 — Enviar el formulario (el paso clave)
> ¡Genial! 🎉 Para reservar tu cupo, completa este formulario rápido (1 min) 👇
> [Botón URL] 📝 Inscribirme aquí  →  (link del formulario)
>
> Apenas lo recibas, te confirmo y te paso el link de pago. Cierro inscripciones el **6 de julio** y quedan pocos cupos 💜🇰🇷

Marca al usuario con la **etiqueta (Tag)** `formulario_enviado` en este paso (para el seguimiento).

### Mensaje 3 — Seguimiento automático (Follow-up)
Agrega un **Delay de 1 día** después del Mensaje 2 → luego una **Condición**: "si NO tiene el Tag `inscrito`" → envía:
> ¡Hola de nuevo! 👋 ¿Pudiste llenar el formulario? No quiero que te quedes sin cupo — los grupos son de máx. 15 y cierro el 6 de julio 💜
> [Botón URL] 📝 Completar mi inscripción

---

## PARTE 3 · Cerrar la venta (tú, a mano)

ManyChat trae al lead hasta el formulario; el cierre lo haces tú:
1. Revisa las respuestas del formulario (en la Google Sheet conectada).
2. Escribe a cada persona: confirma su clase + manda el **link de pago**
   (Mercado Pago https://mpago.la/1cHrbqy · PayPal para el exterior).
3. Cuando pague, ponle el Tag `inscrito` en ManyChat (así deja de recibir follow-ups)
   y anótalo en tu Excel de seguimiento.

---

## CHECKLIST DE MONTAJE
- [ ] Trigger de palabra clave (COREANO, INFO, PRECIO…) activo en IG y FB.
- [ ] Trigger de comentarios en tus posts (respuesta pública + DM).
- [ ] Mensaje 1 (bienvenida + 3 botones).
- [ ] Mensaje 2 con el botón URL al formulario + Tag `formulario_enviado`.
- [ ] Follow-up a 1 día con condición "no inscrito".
- [ ] Google Form conectado a una Google Sheet para ver inscripciones.
- [ ] Link del formulario acortado (bit.ly) para que se vea limpio.

> Nota: la primera respuesta de ManyChat debe **dar valor y llevar al formulario**, no soltar
> "link de pago" en frío. El pago va después, cuando ya llenaron el formulario y hablas tú con ellos.
