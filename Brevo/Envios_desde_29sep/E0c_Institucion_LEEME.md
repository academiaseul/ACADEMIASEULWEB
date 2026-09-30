# E0c · Envío institucional a educadores · LÉEME

**Qué es:** el correo a educadores de colegios de Chile, listo para que **lo mande la institución que tiene la lista, desde su propia cuenta y a su propia lista**. No sale desde el Brevo de Academia Seúl: esas personas nunca aceptaron correos de la academia (ver el recuadro DECISIÓN de `E0b_Educadores_notas.md`). Quien se interese se inscribe o escribe a Academia Seúl, y **desde ahí sí es contacto con permiso**.

| Archivo | Para qué |
|---|---|
| `E0c_Institucion_Mailchimp.html` | **El principal.** La institución lo pega en su Mailchimp (§b). Etiquetas de Mailchimp: nombre, firma con el nombre de la institución (`*\|LIST:COMPANY\|*`), baja, dirección y recordatorio de permiso |
| `E0c_Institucion_Brevo.html` | El mismo correo, por si la institución usa Brevo. Firma "Un saludo cordial de todo nuestro equipo." |
| Este LÉEME | Mensaje para tu contacto, paso a paso, asuntos, cuándo, respuestas y versión de texto |
| `herramientas/e0c_check_mailchimp.js` · `e0c_brevo_desde_mailchimp.js` · `e0c_enero.js` | Validar la versión Mailchimp (y renderizarla fuera del repo), regenerar la versión Brevo desde la de Mailchimp y armar la versión "enero 2027" (§d) |

**Qué dice, de arriba abajo:** saludo ("Hola, [nombre]:" · sin nombre, "Hola, profe:") → la institución presenta la iniciativa ("Te compartimos una iniciativa que puede servirte en el aula") → quién es Academia Seúl y Jay (2 líneas) → 4 recursos gratis para la sala (Lector de Hangul, Dubu, taller grabado, tu nombre en coreano) + el Día del Hangul del vie 9 de octubre → recuadro "Si tienes estudiantes o apoderados interesados": Niños (8–15), lun 18:00, del 19 de octubre al 7 de diciembre, con Jay y Abby, máx. 12; Básico 1 para adultos (profes incluidos), mar o jue 20:00 con Kiran, desde la semana del 12 de octubre; **US$150 el curso completo · o 2 cuotas de US$75**; inscripciones hasta el dom 11 (o antes, si se llenan los cupos) → botón "Ver el programa en una página (PDF)", para reenviar → contacto directo con Academia Seúl (correo, WhatsApp y botón) → firma de la institución → pie de Academia Seúl → pie legal de la institución. Está escrito de **tú**. Sin descuentos, convenios ni charlas.

**Validación (30 sep, después del control de calidad):**
- Brevo · `node Brevo/Envios_desde_29sep/herramientas/preview.js Brevo/Envios_desde_29sep/E0c_Institucion_Brevo.html`: **LISTO PARA PEGAR EN BREVO** · 0 fallas · 12 links en 200 (incluidos los 2 PDF) · con nombre y sin nombre · 390 px sin nada que se salga · 15,1 KB · nada rojo. Tiene 1 aviso, y es a propósito: los links llevan `utm_source=institucion` (no `brevo`).
- Mailchimp · `node Brevo/Envios_desde_29sep/herramientas/e0c_check_mailchimp.js`: **LISTO PARA PEGAR EN MAILCHIMP** · etiquetas conocidas y bien cerradas, `*|UNSUB|*` dentro de un link, `*|LIST:ADDRESSLINE|*`, `*|LIST:DESCRIPTION|*` y `*|HTML:REWARDS|*` presentes, sin etiquetas de Brevo, 8 links con `utm_source=institucion&utm_medium=email&utm_campaign=educadores_oct`, precio exacto, nada rojo ni rosado. Renderizado con un nombre de ejemplo y sin nombre, a 700 y 390 px: nada se sale (las capturas quedan en la carpeta temporal del sistema, fuera del repo).
- **Una sola fuente:** se edita `E0c_Institucion_Mailchimp.html` y la versión Brevo se regenera con `node Brevo/Envios_desde_29sep/herramientas/e0c_brevo_desde_mailchimp.js` (el cuerpo es idéntico; cambian solo el saludo, la firma y el pie). Después, validar las dos.

---

## a · Mensaje de WhatsApp para tu contacto

Parte del §12 a de `E0b_Educadores_notas.md`. Mándale después el archivo `E0c_Institucion_Mailchimp.html` **como documento** (clip → Documento), o por correo como adjunto, y el texto del §b. Si te dice que su plan de Mailchimp es Free o Essentials (no deja pegar código), mándale en cambio la versión de texto del §f y el último párrafo del §b.

```text
¡Hola, [nombre]! Gracias de nuevo por pasarme la lista de educadores 🙏

Pensándolo bien, prefiero no escribirles yo directo: no me conocen, y no quiero que les llegue como spam ni que te complique a ti. ¿Lo pueden mandar ustedes desde su Mailchimp, a quienes crean que les puede servir? Te paso el archivo listo: solo lo pegan, le ponen el asunto y lo programan (te dejo abajo los pasos, son 10 minutos). Si su plan de Mailchimp no deja pegar código, o si usan Brevo, también tengo esas versiones.

Son 4 recursos gratis de coreano para usar en clase y, si hay estudiantes o apoderados interesados, la info de los cursos de octubre. Sale firmado por ustedes (el nombre lo pone Mailchimp solo) y quien se interese me escribe a mí directo.

Ideal que salga lo antes que puedan, en la mañana y a más tardar el miércoles 7, para que alcancen a usarlo el Día del Hangul (viernes 9) y a inscribirse antes del domingo 11. ¿Me mandas una prueba a hola.academiaseul@gmail.com antes de programarlo?

¡Mil gracias, de verdad! 화이팅
Jay
```

Si te dice que sí, **no le pidas los datos de quién abrió o hizo clic**: con las cifras basta (§e).

---

## b · Cómo pegarlo en Mailchimp (para reenviar a tu contacto)

```text
PEGAR EL CORREO DE ACADEMIA SEÚL EN MAILCHIMP (≈ 10 min)

Antes de empezar: pegar código propio ("Paste in code") solo está en los planes Standard y Premium de Mailchimp. En Free o Essentials esa opción no aparece: en ese caso, vayan directo a "Si no pueden pegar código", al final. Los nombres de los menús pueden cambiar un poco según la versión de Mailchimp y el idioma de la cuenta.

1. Copia el código, no la página. Guarda el archivo en el computador (no se puede pegar desde el celular). Clic derecho → Abrir con → Bloc de notas → Ctrl+A → Ctrl+C.
2. Mailchimp → Campaigns → Create (tipo Email / Regular) → nombre interno, p. ej. "Academia Seúl · recursos de coreano" → Create email.
3. Diseño: "Use HTML to code my own" (o "Code your own") → Paste in code → Apply → pegar (Ctrl+V) → Save. Si Mailchimp avisa que el código propio se edita en el editor clásico ("legacy builder"), acepten: es normal.
4. To: su audiencia, o el segmento que ustedes elijan.
5. From: el nombre y el correo de siempre de la institución.
6. Subject: el asunto (abajo). Preview text: VACÍO (el correo ya trae el suyo; si lo llenan, se puede ver repetido).
7. Tracking: si aparece "Google Analytics link tracking", déjenlo APAGADO (los links ya vienen marcados). "Track clicks" puede quedar encendido.
8. Preview → activen "Enable live merge tag info" y miren un contacto con nombre ("Hola, " y su nombre) y uno sin nombre ("Hola, profe:").
9. Send a test email: a ustedes y a hola.academiaseul@gmail.com. En el celular, revisen que los botones abran y que el pie diga su institución y su dirección.
10. Schedule → fecha y hora → Schedule campaign.

El pie lo arma Mailchimp con los datos de su audiencia (Audience → Audience settings): el nombre de la institución (que va también en la firma) y la dirección salen de "Required email footer content", y la frase de por qué reciben el correo, del "Permission reminder" (ojalá en español). Además trae "Darme de baja", "Actualizar mis datos" y "Ver en el navegador". En el plan gratis, Mailchimp agrega además su insignia al final: es normal.

El saludo usa el campo del nombre (FNAME). Si su audiencia guarda el nombre en otro campo (Audience settings → "Audience fields and *|MERGE|* tags"), cambien FNAME por esa etiqueta en el código (Ctrl+F "FNAME", son 2) antes de pegarlo.

Si no pueden pegar código (plan Free o Essentials): creen el correo con su plantilla de siempre, peguen la versión de texto (va aparte) en un bloque de texto y agreguen un botón "Ver el programa en una página (PDF)" con el link https://www.academiaseul.com/programas/Hoja_Resumen_Cursos_Octubre_2026.pdf. El asunto, la prueba y la programación son iguales.
```

**Si la institución usa Brevo:** el archivo es `E0c_Institucion_Brevo.html`. *Campaigns → Create campaign → Email → Regular* → remitente y lista de ellos → asunto, con *Preview text* vacío → *Design: Start from scratch → HTML custom code* → pegar → guardar → prueba → programar. En Brevo no hay etiqueta con el nombre de la institución: la firma dice "Un saludo cordial de todo nuestro equipo." y el pie "Recibes este correo porque estás en la lista de contactos de nuestra institución.". Si quieren, cambian esas dos frases por su nombre y su dirección en el editor de código (Ctrl+F). El saludo usa el atributo `FIRSTNAME`: si en su cuenta el nombre está en otro atributo (por ejemplo `NOMBRE`), cámbienlo en el código (Ctrl+F "FIRSTNAME") y revisen en la prueba que salga "Hola, " y el nombre.

**Si prefieren otro saludo:** "profe" es el saludo cuando falta el nombre. Si su lista tiene muchos directivos o administrativos, lo pueden cambiar (Ctrl+F "Hola, profe:"). Si la audiencia de Mailchimp tiene un valor por defecto para el nombre (*FNAME*), revisen en la prueba con un contacto sin nombre qué saludo sale.

---

## c · Asunto y preheader

| | Texto |
|---|---|
| **Asunto principal** | Recursos gratis de coreano para tus estudiantes |
| Asunto alternativo | Coreano en la sala: una iniciativa de Academia Seúl |
| Preheader (ya va oculto en el HTML) | Lector de Hangul, un juego de lectura y un taller grabado: gratis y sin registrarse |

Usen uno solo, sin comillas. Los dos van sin emoji, sin mayúsculas gritadas y sin "¡Último día!": es la institución presentando algo útil, no una venta.

---

## d · Cuándo enviarlo

- **Hora: un día hábil entre 8:00 y 10:00** (antes de clases o en la primera hora libre).
- **Fecha: lo antes posible, entre el jue 1 y el mié 7 de octubre** (mar 6 o mié 7 si tu contacto necesita unos días). Cuanto antes salga, más margen hay para usar los recursos el Día del Hangul (vie 9) y para inscribirse antes del cierre del dom 11. **Lo más tarde: jue 8 en la mañana.**
- **Vie 9 a dom 11: no.** Queda muy poco margen para inscribirse y es fin de semana.
- **Desde el lun 12: versión "enero 2027".** Sin apuro: la institución la puede mandar cuando le acomode. Son 3 cambios; se generan con `node Brevo/Envios_desde_29sep/herramientas/e0c_enero.js <entrada.html> <salida.html>` (sirve para la versión Mailchimp y para la Brevo) y se validan otra vez con `e0c_check_mailchimp.js <salida.html>` o `preview.js <salida.html>`. Probado el 30 sep con las dos versiones: LISTO, 390 px OK:
  1. Se borra la frase del Día del Hangul ("El viernes 9 de octubre es el Día del Hangul…").
  2. El recuadro "Si tienes estudiantes o apoderados interesados" pasa a decir: `En enero de 2027 abre la próxima cohorte de Academia Seúl, con Coreano para Niños (8–15) y Básico 1 (A1.1) para adultos, desde cero y profes incluidos. Clases en vivo por Zoom, con profes coreanos.` (sin precio ni fechas, porque todavía no están confirmados).
  3. El botón del PDF de octubre pasa a "Quiero el aviso de enero" → `https://www.academiaseul.com/notificarme`, con el texto "Para recibir el aviso cuando abran las inscripciones:", y la campaña de los links cambia a `utm_campaign=educadores_ene`.

---

## e · Qué pasa con las respuestas

- **El correo pide escribir directo a Academia Seúl:** hola.academiaseul@gmail.com y WhatsApp +56 9 4211 5562 (con link y botón). Las consultas llegan a ti, no a la institución.
- **Si alguien le responde a la institución** (el "Responder" de Mailchimp llega a su correo): pídele a tu contacto que le conteste a esa persona con el correo o el WhatsApp de la academia. Que te reenvíe el mensaje **solo si la persona lo pide**: sus datos son de la institución.
- **Quien te escribe o se inscribe** es contacto con permiso para lo que pidió. Si se inscribe en `/nivel-1` o se anota en `/notificarme`, ya entra por el sitio. Si te escribe y te pide que le avises de los cursos, agrégalo a `01 Leads sitio` (recuadro DECISIÓN y §7–§8 de `E0b_Educadores_notas.md`). A los demás, solo les respondes lo que preguntaron.
- **Medición:** las visitas llegan con `utm_source=institucion&utm_campaign=educadores_oct`. A la institución pídele **solo las cifras** del informe de Mailchimp (enviados, aperturas, clics, bajas), nunca quién abrió o hizo clic.
- **Tú no le escribes a nadie de la lista.** Nada se importa a Brevo. Cuando termine la campaña, borra `MailChimpChile (1).csv` y la carpeta `Downloads\Brevo_Educadores\` (son datos personales).

---

## f · Versión de texto (si prefieren reenviarlo como correo normal)

Sale del §12 b de `E0b_Educadores_notas.md`, con el precio agregado. Sirve para un boletín, un bloque de texto de su plantilla o un grupo interno. **No** para mandarlo desde un Gmail con 600 direcciones en copia oculta: Gmail lo frena y llega como spam. Para la lista completa, lo correcto es su Mailchimp.

**Asunto:** Recursos gratis de coreano para tus estudiantes

```text
Estimada comunidad educativa:

Les compartimos una iniciativa que puede servirles en el aula. Academia Seúl es una escuela online de coreano fundada en Chile por Jay Kim (김재희), profesor coreano con más de 8 años enseñando a hispanohablantes.

Muchos estudiantes se interesan por Corea gracias al K-pop o a los K-dramas y quieren aprender el idioma. Estas herramientas son gratuitas y no piden registro (y el viernes 9 de octubre es el Día del Hangul en Corea, una buena excusa para probarlas en clase):

- Lector de Hangul: el alfabeto coreano letra por letra, con el audio de cada sonido → https://www.academiaseul.com/lector-coreano
- Dubu: un juego de lectura de 30 niveles → https://www.academiaseul.com/dubu
- Taller de Hangul grabado: una clase completa desde cero → https://www.academiaseul.com/taller
- Tu nombre en coreano, escrito en 한글 → https://www.academiaseul.com/generador-nombre

Si tienen estudiantes o apoderados interesados, en octubre parte Coreano para Niños (8 a 15 años): lunes a las 18:00 (hora de Chile), del 19 de octubre al 7 de diciembre, en vivo por Zoom con dos profesores coreanos. Para adultos, profesores incluidos, está Básico 1, desde cero, martes o jueves a las 20:00, desde la semana del 12 de octubre. Son 8 semanas, con una clase en vivo de 60 minutos a la semana y certificado: US$150 el curso completo · o 2 cuotas de US$75. Las inscripciones cierran el domingo 11 de octubre (o antes, si se llenan los cupos).

Toda la información en una página: https://www.academiaseul.com/programas/Hoja_Resumen_Cursos_Octubre_2026.pdf
Inscripción: https://www.academiaseul.com/nivel-1

Consultas directamente con Academia Seúl: hola.academiaseul@gmail.com · WhatsApp +56 9 4211 5562 · www.academiaseul.com
```

Desde el lun 12, cambia el párrafo de los cursos por `En enero de 2027 abre la próxima cohorte, con Coreano para Niños (8–15) y Básico 1 para adultos. Pueden anotarse para recibir el aviso en https://www.academiaseul.com/notificarme`, borra la línea de "Toda la información…" y la de "Inscripción", y quita el paréntesis del Día del Hangul.

화이팅!
