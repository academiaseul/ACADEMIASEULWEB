# 🧭 Guía paso a paso + To-Do · Sistema de inscripciones Nivel 1

Esta guía tiene dos partes: primero **corres una inscripción de prueba tú mismo** (para entender el flujo en la práctica), y luego tienes el **checklist** para dejar todo listo y, más adelante, automatizar.

---

## Parte 1 · Tu primera inscripción de prueba (hazla hoy, 15 min)

> Idea: vas a hacerte pasar por un alumno y recorrer los 7 pasos completos. Usa datos de prueba (tu nombre + "PRUEBA"). Así ves con tus ojos qué hace cada herramienta.

**Paso 1 — Llenar el formulario (rol: alumno)**
- Abre tu web → página **Nivel 1** → sección "Reserva tu cupo".
- Llena: Nombre = "Prueba Jay", correo = tu correo, WhatsApp, edad, RUT, "¿Cómo nos conociste?" = Instagram, Clase = Martes.
- Clic en **Reservar mi cupo**. Debe aparecer el mensaje "¡Cupo reservado!".

**Paso 2 — Revisar que te llegó (rol: tú)**
- Abre tu correo `hola.academiaseul@gmail.com`.
- Debe haber llegado un email de **Formspree** con los datos. *(Si no llega, revisa spam y la configuración del formulario en Formspree.)*

**Paso 3 — Anotar en el Pipeline (rol: tú)**
- Abre `Pipeline_Inscripciones_Nivel1.xlsx` → hoja **Pipeline**.
- Pega los datos en una fila nueva. En **Estado** elige `Inscrito`.
- Mira la hoja **Tablero**: "Inscritos" subió a 1. ✅ Ya entiendes para qué sirve el cuaderno.

**Paso 4 — Enviar cómo pagar (rol: tú)**
- Copia el **Email 1** (archivo `01_Email_AutoRespuesta_Inscripcion.md`) y envíatelo a ti mismo.
- Léelo como si fueras el alumno: ¿se entiende cómo pagar? ¿están bien tus datos de BCI?

**Paso 5 — Simular el pago (rol: alumno)**
- Abre el **link de Mercado Pago** de la cohorte Martes para confirmar que abre bien (no pagues).
- Mira el panel de **transferencia** en la web: que tus datos de BCI se vean correctos.

**Paso 6 — Confirmar el pago (rol: tú)**
- En el Pipeline, cambia el Estado de tu fila de prueba a `Confirmado` y pon Cupo # = 1.
- Mira el Tablero: la cohorte Martes ahora dice "Quedan 14". ✅ Así se controla el cupo.

**Paso 7 — Enviar la bienvenida (rol: tú)**
- Copia el **Email A** de bienvenida (`02_Secuencia_Bienvenida.md`) y envíatelo.
- Aunque los links (Zoom/Discord) sean provisionales, verás cómo se siente el onboarding.

**Bonus — El recordatorio**
- Deja una segunda fila de prueba en estado `Inscrito` (sin pagar). Esa es la persona a la que, a las 24h, le mandarías el correo de **carrito abandonado**.

> 🎯 Al terminar esto vas a entender el sistema completo. Recién ahí tiene sentido automatizar.

---

## Parte 2 · To-Do List (marca con una X)

### ✅ Hoy — entender el flujo
- [ ] Correr la inscripción de prueba (los 7 pasos de arriba)
- [ ] Confirmar que llega el correo de Formspree a tu bandeja
- [ ] Ver cómo se llena el Pipeline y cómo cambia el Tablero

### 📋 Esta semana — dejar listo para recibir inscripciones reales
- [ ] Pegar el **Email 1** en Formspree → Settings → **Autoresponse** (así se manda solo)
- [ ] Conseguir los **links fijos**: Zoom de cada cohorte · invitación a Discord · carpeta de materiales
- [ ] Completar los 3 correos de bienvenida con esos links
- [ ] Tener los **links de Mercado Pago** por cohorte a la mano
- [ ] Abrir cuenta en **Flow.cl** (cubre Chile + trae Khipu para auto-confirmar transferencias)
- [ ] Definir la regla: el cupo se reserva 48h, se confirma con el pago

### 🔁 Cuando lleguen inscripciones reales — la rutina diaria
- [ ] Anotar cada persona en el Pipeline apenas llega (Estado: Inscrito)
- [ ] A las 24h sin pagar → enviar recordatorio (carrito abandonado)
- [ ] Al confirmar pago → enviar bienvenida + sumar a Discord (Estado: Confirmado)
- [ ] Revisar el Tablero cada día: cupos restantes, % conversión, de qué canal vienen

### 🤖 Automatizar después — con Zapier (paso a paso, sin apuro)
- [ ] **Zap 1:** Formspree → Google Sheet (la inscripción cae sola en la hoja)
- [ ] **Zap 2:** Formspree → email "cómo pagar" automático
- [ ] **Zap 3:** pago confirmado → email de bienvenida automático
- [ ] Conectar **Khipu/Flow** para que las transferencias se confirmen solas

---

## 🧩 Recordatorio del flujo (los 7 pasos)

1. El alumno llena el formulario →
2. Te llega su info al correo →
3. Lo anotas en el Pipeline (Inscrito) →
4. Le envías cómo pagar →
5. El alumno paga →
6. Confirmas el pago (Confirmado) →
7. Le mandas la bienvenida.

*Empieza haciéndolo a mano. Cuando lo domines, automatizas los pasos 3, 4, 6 y 7. No al revés.*

화이팅 chingu! 🇰🇷
