# Calendario de envíos · Brevo · lanzamiento octubre 2026

**Vigente desde el viernes 25 de septiembre de 2026.** Reemplaza las fechas de `Plan_Choque_20sep_13oct_2026.md` §3 y de `Plan_Email_Brevo_2026.md` §3: L1 y L1-b no salieron y todo se corrió.
Hora: **Chile (UTC−3)**. Revisa una vez que la zona horaria de la cuenta de Brevo sea *America/Santiago* (Settings → Time zone).
Remitente: "Jay · Academia Seúl" (`hola@academiaseul.com` si el dominio ya está autenticado; si no, `hola.academiaseul@gmail.com` verificado).
Base: lista **`01 Leads sitio`** (97 = P1 18 · P2 21 · P3 58). Inscritos: lista **`02 Alumnos octubre`**.

Hitos que citan los correos: reto **#LeoCoreanoEn7Días lun 28 sep → dom 4 oct** (la prueba el dom 4 hasta las 23:59) · **en vivo sáb 3 oct 20:00** "Lee tu nombre en coreano" · ganador/a el **lun 5** · cierre de matrícula **dom 11 oct 23:59** · clases desde la **semana del 12** (Niños desde el **lun 19**) · taller grabado en `academiaseul.com/taller`.

---

## 1 · Los envíos

| # | Fecha y hora (Chile) | Segmento | Asunto | Preheader | Archivo |
|---|---|---|---|---|---|
| **L1** | **HOY vie 25 sep** · antes de las 19:30 (antes del carrusel; tope 20:00) | P1 (18) − inscritos, en **2 campañas** para que nadie lo reciba dos veces: `L1` = P1 con ORIGEN que **no** contiene `alumno_julio` (16) · `L1 · variante 3` = segmento `Ex-alumnos julio` (2) | `{{ contact.FIRSTNAME \| default: "Chingu" }}, tu cupo en octubre 💙` | Clases desde la semana del 12 de octubre · US$150 el curso completo · o 2 cuotas de US$75 | `L1_Lanzamiento_P1.html` |
| **L1-b** | sáb 26 sep · 10:00 | P2 + P3 (79) − inscritos | `Del taller de Hangul a tu primera clase 🐯` | Clases desde el martes 13 de octubre · el taller quedó grabado · Lector y Dubu gratis | `L1b_Taller_P2P3.html` |
| **L2** | mié 30 sep · 10:00 | Todos menos inscritos (`01` − `02`) | `Día 3 del reto: ¿te sumas? 🐯` | 10 minutos al día · clase en vivo el sábado 3 a las 20:00 · el taller completo, gratis | `L2_Reto_y_Vivo.html` |
| **L3** | vie 2 oct · 10:00 | `Abrió L1, L1-b o L2` | `Mañana 20:00 · clase abierta en Instagram` | Sábado 3 de octubre · "Lee tu nombre en coreano" · gratis, en @academiaseul | `L3_Vivo_Manana.html` |
| **L4** | lun 5 oct · 10:00 | Todos menos inscritos | `{{ contact.FIRSTNAME \| default: "Chingu" }}, cierro el domingo 11` | Última semana de matrícula · quién ganó el reto · clases desde el martes 13 | `L4_Ultima_Semana.html` |
| **L5 · A** | jue 8 oct · 10:00 | `Abrió algo` − inscritos | `Quedan 3 días (y mañana es 한글날)` | El domingo 11 cierro la matrícula · US$150 el curso completo · o 2 cuotas de US$75 | `L5_Quedan_3_Dias.html` |
| **L5 · B** | jue 8 oct · 10:00 | `No abrió nada` − inscritos | `¿Todavía quieres aprender coreano?` | (el mismo) | `L5_Quedan_3_Dias.html` (mismo HTML) |
| **L5-b** | dom 11 oct · 12:00 | `Abrió L4 o L5` − inscritos | `Hoy cierra · 23:59` | Último día de matrícula de octubre · clases desde el martes 13 | `L5b_Hoy_Cierra.html` |
| **O1** | lun 12 oct · 09:00 (programar dom 11 después de las 23:59) | `02 Alumnos octubre` (solo inscritos, adultos y apoderados de Niños) | `¡Empezamos esta semana! Tu Zoom, tu grupo y tu hora` | Todo para tu primera clase: link de Zoom, grupo de WhatsApp, guía y programa de tu curso | `O1_Bienvenida_Inscritos.html` |
| **R1** | lun 12 → dom 18 oct, 18:00 del día anterior a cada 1.ª clase: **lun 12** → Básico 1 martes + Conversacional 1 · **mar 13** → Básico 2 · **mié 14** → Básico 1 jueves + TOPIK II · **dom 18** → familias de Niños | Inscritos de cada clase (dentro de `02 Alumnos octubre`) | `Mañana es tu primera clase: [CURSO]` · Niños: `Mañana es la primera clase de Coreano para Niños` | `[DÍA Y FECHA] · [HORA CHILE] hora Chile · tu link de Zoom adentro` · Niños: `Lunes 19 · 18:00 hora Chile · conecta y acompaña en esta primera clase` (tabla de valores en el comentario inicial del archivo) | `R1_Recordatorio_Primera_Clase.html` |
| **N1** | mar 13 oct · 10:00 | Todos menos inscritos | `Tu lugar en enero 2027 🌱` | Lista de espera de enero abierta · el Lector, Dubu y el taller siguen gratis | `N1_Lista_Enero_2027.html` |

O1 y R1 vienen en sus propios archivos del mismo lanzamiento; si cambian, manda lo que diga el comentario al inicio de cada HTML (ahí están el asunto, el preheader, el segmento y los links que hay que rellenar: Zoom, grupos de WhatsApp y guías).
Todos los links al sitio llevan `?utm_source=brevo&utm_medium=email&utm_campaign=` + `l1` · `l1b` · `l2` · `l3` · `l4` · `l5` · `l5b` · `n1`.

**Frecuencia (se cumple con esta tabla):** esta semana, 1 correo comercial por persona (P1 = L1, P2/P3 = L1-b). Del 28 sep al 4 oct, solo contenido (L2, L3). Semana de cierre (5 → 11 oct): 3 comerciales (L4, L5, L5-b). Ningún prospecto recibe 2 correos en 24 h (los inscritos de Básico 1 martes y Conversacional 1 sí reciben O1 y R1 el mismo lunes, a propósito), y ningún día pasa de ~100 envíos (el plan gratis permite 300/día).

**Ojo con P1:** según `contactos_brevo_import.csv`, los 18 de P1 **no son todos ex-alumnos**: son la lista de espera del Nivel 1, test de nivel, lista intermedio, contacto web y **2** ex-alumnos de julio. Por eso L1 habla de "me dejaste tus datos" y la variante 3 es solo para esos 2.

---

## 2 · Cuándo programar cada uno (≈ 10 min cada vez)

| Día | Qué haces en Brevo |
|---|---|
| **Vie 25 (hoy)** | Enviar **L1** (P1 sin los 2 ex-alumnos, 16) y **L1 · variante 3** (segmento `Ex-alumnos julio`, 2) · programar **L1-b** para mañana 10:00 |
| Dom 27 | Programar **L2** (mié 30, 10:00) |
| Jue 1, noche | Crear el segmento `Abrió L1, L1-b o L2` y programar **L3** (vie 2, 10:00) |
| Dom 4, noche | Rellenar en L4 el número de participantes y los cupos `[N]` · programar **L4** (lun 5, 10:00) |
| Lun 5, antes de las 10:00 | Sorteo del reto (por la mañana, §5 del plan) → editar L4 programado con el nombre del ganador/a; si no alcanzas, usa el texto alternativo del comentario de L4 |
| Jue 8, mañana | Crear `Abrió algo` y `No abrió nada` · enviar las **2 campañas de L5** · crear `Abrió L4 o L5` y programar **L5-b** (dom 11, 12:00) |
| Dom 11, noche | Programar **O1** (lun 12, 09:00) y los **R1** · actualizar `02 Alumnos octubre` con la lista final |
| Lun 12 | Programar **N1** (mar 13, 10:00), después de confirmar que el sitio ya está en lista de espera |

Antes de cada envío: **Send a test** a `hola.academiaseul@gmail.com` y míralo en el celular (nombre, botón, links, WhatsApp). El preheader ya va oculto dentro de cada HTML: deja vacío el campo *Preview text* de Brevo.

---

## 3 · Cómo crear los segmentos de actividad (5 pasos)

1. *Contacts → Segments → Create a segment* → condición **Email campaign activity** → *Opened* (o *Clicked*) → elige la(s) campaña(s) → *Save* con el nombre exacto de la tabla. Los segmentos se recalculan solos al enviar.
2. `Abrió L1, L1-b o L2` = *Opened* L1 **o** "L1 · variante 3" **o** L1-b **o** L2 (une las condiciones con **OR** / "any of"); el que hizo clic también abrió, así que no hace falta sumar *Clicked*.
3. `Abrió algo` = *Opened* cualquiera de L1, "L1 · variante 3", L1-b, L2, L3 o L4 (OR). `No abrió nada` = está en la lista `01 Leads sitio` **y** *Has not opened* cada una de esas 6 (AND).
4. `Abrió L4 o L5` = *Opened* L4 **o** "L5 · abrió algo" **o** "L5 · no abrió nada" (OR).
5. En cada campaña, *Recipients*: elige la lista o el segmento y en **Exclude** marca la lista `02 Alumnos octubre`.

(Apple Mail a veces cuenta como "abierto" un correo que nadie leyó, así que `Abrió algo` puede venir inflado. No importa: las dos campañas de L5 llevan el mismo HTML y solo cambia el asunto.)

---

## 4 · Regla antes de cada envío "todos menos inscritos"

**Antes de L2, L4, L5, L5-b y N1 (y de nuevo el dom 11 antes de las 12:00): mueve a la lista `02 Alumnos octubre` a todas las personas que ya pagaron** y exclúyela en *Recipients*. Revisa estas fuentes: Formspree (formulario de `/nivel-1`, avisos "💰 PAGO"), PayPal, Mercado Pago y las transferencias por WhatsApp. En Brevo: *Contacts* → busca el correo → *Add to list* → `02 Alumnos octubre` (si no existe, créalo con nombre y correo). Así nadie que ya pagó recibe "quedan 3 días".

---

## 5 · Qué rellenar a mano (buscar `[` en el HTML)

- **L4:** `[PARTICIPANTES]`, `[NOMBRE DEL GANADOR/A]` (con su permiso; si no, usa el texto alternativo del comentario) y los 6 `[N]` de cupos (hoja de números del dom 4; máximos 15 · 15 · 15 · 15 · 8 · 12).
- **N1:** nada; solo verifica que el sitio pasó a lista de espera el lun 12 a las 09:00. El párrafo de inscripción tardía va comentado y solo se activa si tú lo decides.
- **O1:** los 6 links de Zoom, los 6 links de los grupos de WhatsApp y los links de las guías en PDF (lista completa en su comentario inicial).
- **R1:** lo que indique su comentario inicial.
- **L1, L1-b, L2, L3, L5, L5-b:** nada. Listos para pegar.
- **Antes de importar el CSV:** 4 contactos traen `CURSO_SUGERIDO` = "… · test de nivel" (1 en P1, 3 en P2). L1 y L5 muestran ese campo tal cual ("Tu curso es …"): déjalo solo como `Básico 2 (A1.2)` o `Conversacional 1 (A2.1)`.
