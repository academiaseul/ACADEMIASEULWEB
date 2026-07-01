# Formulario de Inscripción — Nivel 1 (A1) · Guía de montaje

**Flujo elegido:** el estudiante llena el formulario → en la pantalla de confirmación aparece el link de pago (Mercado Pago / PayPal).
Así capturas TODOS los leads (aunque no paguen enseguida) y puedes hacer seguimiento.

**Banner del formulario:** `Form_Header_Inscripcion.png` (súbelo como imagen de encabezado en Google Forms).

---

## 1) Crea el formulario en Google Forms

1. Ve a **forms.google.com** → **+ En blanco**.
2. **Título:** `Inscripción · Clases de Coreano · Nivel 1 (A1)`
3. **Descripción:**
   > ¡Bienvenido/a a Academia Seúl! 💜 Completa este formulario para reservar tu lugar en el Nivel 1 · Primeras Palabras. Cupos limitados (máx. 15 por sesión). Al enviar verás el link de pago para confirmar tu cupo. 화이팅 🇰🇷
4. Arriba a la derecha → **paleta de colores** → **Elegir imagen** → sube `Form_Header_Inscripcion.png`. El color de tema se ajustará al azul de la marca.
5. Engranaje (⚙️ Configuración):
   - **Respuestas** → activa **Recopilar direcciones de correo** (Verificado).
   - Activa **Limitar a 1 respuesta** solo si quieres (requiere login de Google).
   - **Presentación** → **Mensaje de confirmación:** pega el texto de la sección 3.

---

## 2) Preguntas (cópialas tal cual)

**Sección 1 — Tus datos**

1. **Nombre y apellido** · texto corto · *obligatorio*
2. **Correo electrónico** · (ya lo recopila Google, o texto corto validado como email) · *obligatorio*
3. **WhatsApp (con código de país)** · texto corto · *obligatorio*
   - Descripción: "Ej: +56 9 1234 5678. Por aquí te enviamos el link de Zoom y el material."
4. **País / ciudad** · texto corto · *obligatorio*

**Sección 2 — Tu clase**

5. **¿Qué horario prefieres?** · opción múltiple · *obligatorio*
   - Sesión A — Miércoles 20:00 (Chile) · desde el 8 de julio
   - Sesión B — Sábados 11:00 (Chile) / 16:00 (España) · desde el 11 de julio
   - Cualquiera de los dos / aún no estoy seguro/a
6. **¿Cuál es tu nivel de coreano?** · opción múltiple · *obligatorio*
   - Empiezo desde cero (no sé nada) 🐣
   - Sé leer algo del alfabeto (한글)
   - Ya sé leer 한글 y algo de vocabulario
7. **¿Cómo nos conociste?** · opción múltiple · *opcional*
   - Instagram · TikTok · Recomendación de un amigo · Taller gratis · Otro
8. **¿Por qué quieres aprender coreano?** · párrafo · *opcional*
   - Descripción: "Cuéntanos tu motivación (K-pop, K-drama, viaje, trabajo, cultura...). ¡Nos ayuda a conocerte! 💜"

**Sección 3 — Confirmación de cupo**

9. **¿Cómo vas a pagar?** · opción múltiple · *obligatorio*
   - Mercado Pago (Chile · CLP)
   - PayPal / tarjeta internacional (USD)
   - Transferencia (te enviamos los datos por WhatsApp)
10. **Acepto que mi cupo se confirma al completar el pago** · casilla · *obligatorio*
    - "Sí, entiendo que los cupos son limitados y se confirman con el pago."

> Consejo: usa **secciones** (los 3 bloques) para que se sienta un proceso serio, tipo "postulación", no un formulario suelto.

---

## 3) Mensaje de confirmación (pantalla al enviar)

Configuración ⚙️ → Presentación → **Mensaje de confirmación:**

> ¡Recibimos tu inscripción! 🎉 Para **asegurar tu cupo**, completa el pago aquí:
>
> 💳 Mercado Pago (CLP): https://mpago.la/1cHrbqy
> 🌎 ¿Pagas desde fuera de Chile? Escríbenos y te pasamos PayPal.
>
> Apenas pagues, envíanos el comprobante por WhatsApp y te confirmamos + te sumamos al grupo. 화이팅 💜
> — Academia Seúl · academiaseul.com/nivel-1

*(Google Forms no permite botones, pero sí links clicables en este mensaje.)*

---

## 4) Conecta las respuestas a una hoja de cálculo

1. Pestaña **Respuestas** → ícono verde de **Sheets** → **Crear hoja de cálculo**.
2. Cada inscripción entra como una fila con fecha/hora. Úsala junto a tu `Seguimiento_Leads_Nivel1.xlsx` para marcar quién pagó.
3. (Opcional) Activa **notificaciones por email** en la pestaña Respuestas (⋮ → Recibir notificaciones por correo de las respuestas nuevas) para que te avise cada vez que alguien se inscribe.

---

## 5) Email de confirmación automático (para el postulante)

Google Forms no envía emails personalizados por sí solo. Dos opciones:

- **Fácil:** activa "Recibir una copia de sus respuestas" (Configuración → Respuestas). El estudiante recibe una copia de lo que envió.
- **Recomendado:** instala el complemento gratis **"Email Notifications for Google Forms"** (de Digital Inspiration) → permite enviar un correo automático con TU texto (el de abajo) a cada persona que se inscribe.

### Texto del email (pégalo en el complemento)

**Asunto:** ¡Recibimos tu inscripción al Nivel 1! 💜 Un paso más para tu cupo

> ¡Hola {{Nombre y apellido}}! 안녕하세요 💜
>
> Soy Jay, de Academia Seúl. ¡Gracias por postular al **Nivel 1 · Primeras Palabras**! Ya tenemos tus datos y guardamos tu interés en la **Sesión {{¿Qué horario prefieres?}}**.
>
> **Para confirmar tu cupo** (son limitados, máx. 15 por sesión) solo falta un paso: el pago.
>
> 💳 Mercado Pago (CLP): https://mpago.la/1cHrbqy
> 🌎 ¿Desde fuera de Chile? Respóndeme este correo y te paso PayPal al mejor cambio.
>
> Apenas pagues, envíame el comprobante por WhatsApp y te confirmo + te sumo al grupo, te paso el link de Zoom y el material de bienvenida.
>
> **Lo que te llevas:** 12 clases EN VIVO por Zoom (90 min), profe nativo, grupos pequeños, cuaderno + grabaciones + 200 flashcards y tu Certificado por participación (CEFR A1). Precio de lanzamiento: $85.000 CLP / $89 USD = ~$7.000 por clase.
>
> Cualquier duda, respóndeme por aquí. ¡Nos vemos en clase! 화이팅 🇰🇷
>
> Jay Kim (김재희)
> Academia Seúl · academiaseul.com/nivel-1

---

## 6) Dónde poner el link del formulario

- **Bio de Instagram/TikTok** (o en Linktree).
- Botón **"Inscríbete"** en `academiaseul.com/nivel-1` → puede apuntar al formulario en vez de ir directo al pago.
- En los DMs, cuando alguien diga "sí, quiero": mándale el link del formulario ("es rápido, 1 min, así te reservo el lugar") → luego el pago.
- Botón de "reservar" en las stories de últimos cupos.

> **Por qué funciona:** el formulario convierte "comprar una clase" en "postular a un programa". Sube el valor percibido, te da los datos de contacto ANTES del pago, y te deja hacer seguimiento a los que no pagaron enseguida.
