# Calendario de envíos · Brevo · desde el martes 29 de septiembre de 2026

**Reemplaza a `Calendario_Envios_Octubre_2026.md` desde hoy, martes 29 de septiembre.** El reto #LeoCoreanoEn7Días no se lanzó y L1, L1-b y L2 nunca salieron. Por eso los correos L1–L5b, el O1, el R1 y el N1 del 25 de septiembre ya no se usan. Ahora mandan los archivos de `Brevo/Envios_desde_29sep/`.
Plan general: `Plan_Desde_29sep_2026.md` §4. **Cómo pegar cada correo en Brevo: `Brevo/Envios_desde_29sep/LEEME_Como_pegar_en_Brevo.md`** (léelo antes de la primera campaña).

| Dato fijo | Valor |
|---|---|
| Hora | **Chile (UTC−3)**. Zona de envío de Brevo: *America/Santiago* (menú de la cuenta → *Settings → Campaigns → Default settings*) |
| Remitente | Jay · Academia Seúl (el correo ya verificado en Brevo) |
| Responder a | hola.academiaseul@gmail.com (en *Additional settings*; varios correos piden "respóndeme") |
| Prospectos | lista `01 Leads sitio`: 97 contactos (P1 18 · P2 21 · P3 58). En P1 hay **solo 2** ex-alumnos de julio: al resto de julio se le escribe 1:1 por WhatsApp (plan §5) |
| Inscritos | lista `02 Alumnos octubre`, y el dom 11 también `02a` … `02f` (una por clase) |
| Precio (así en todos) | US$150 el curso completo · o 2 cuotas de US$75 |
| Cierre | domingo 11 de octubre, 23:59 (o antes si se llenan los cupos) |
| Seguimiento | Todos los links al sitio ya traen `utm_source=brevo&utm_medium=email&utm_campaign=` + `e1` … `e5`, `o1`, `r1`, `n1`. En Brevo deja **apagado** *Activate UTM tracking* |
| Preheader | Ya viene **oculto dentro de cada HTML**. En Brevo deja **vacío** el campo *Preview text* (si lo llenas, se ve dos veces) |

**Reglas:** máximo 1 correo por persona cada 48 h · máximo 300 envíos al día (plan gratis; el día más cargado no pasa de ~120) · **antes de cada envío a prospectos, mueve a `02 Alumnos octubre` a quien ya pagó**, porque Brevo aplica la exclusión en el momento del envío. Hay una sola excepción, a propósito: los inscritos de Básico 1 martes y de Conversacional 1 reciben O1 (09:00) y R1 (18:00) el mismo lunes 12. Son avisos de su clase.

---

## 1 · Tabla única de envíos

Copia el asunto **de esta tabla** tal cual, sin comillas. Ninguno lleva etiquetas de Brevo ni barras.

| Id | Sale (hora Chile) | Enviar a (*Send to*) | No enviar a (*Don't send to*) | Asunto | Preheader (ya va oculto en el HTML) | Archivo | Estado al 29 sep |
|---|---|---|---|---|---|---|---|
| **E1** | mié 30 sep · 10:00 | lista `01 Leads sitio` | lista `02 Alumnos octubre` | Te lo dejo en un minuto: los cursos de octubre 💙 | 5 cursos, días, horas, profes y precio en una página · matrícula hasta el domingo 11 | `E1_Programa_30sep.html` | ✅ Listo. El link al PDF de una página da 404 hasta que se publique la hoja resumen (§5, plan B) |
| **E2** | vie 2 oct · 10:00 | lista `01 Leads sitio` | lista `02 Alumnos octubre` | Tu nombre en coreano, en 5 minutos 🐯 | El sábado 3 es 개천절 · generador de nombres, taller grabado, Lector y Dubu, gratis | `E2_Tu_Nombre_En_Coreano_2oct.html` | ✅ Listo |
| **E3** | lun 5 oct · 10:00 | lista `01 Leads sitio` | lista `02 Alumnos octubre` | Última semana: cierro la matrícula el domingo 11 | Los 5 cursos con su día, hora y cupos · empezamos el martes 13 | `E3_Ultima_Semana_5oct.html` | ✅ Listo |
| **E4 · A** | jue 8 oct · 10:00 | segmento `E4 · Abrió algo` | lista `02 Alumnos octubre` | Quedan 3 días (y mañana es 한글날) | El domingo 11 cierro la matrícula · US$150 el curso completo · o 2 cuotas de US$75 | `E4_Quedan_3_Dias_8oct.html` | ✅ Listo (1 aviso a propósito: `CURSO_SUGERIDO`, §5) |
| **E4 · B** | jue 8 oct · 10:00 | lista `01 Leads sitio` | lista `02 Alumnos octubre` **y** segmento `E4 · Abrió algo` | ¿Todavía quieres aprender coreano? | (el mismo) | `E4_Quedan_3_Dias_8oct.html` (el mismo HTML) | ✅ Listo |
| **E5** | dom 11 oct · 12:00 | segmento `E5 · Abrió E3 o E4` | lista `02 Alumnos octubre` | Hoy cierra · 23:59 hora Chile | Último día de matrícula de octubre · clases desde el martes 13 | `E5_Hoy_Cierra_11oct.html` | ✅ Listo |
| **O1** | lun 12 oct · 09:00 | lista `02 Alumnos octubre` | — | ¡Empezamos esta semana! Tu Zoom, tu grupo y tu hora | Todo para tu primera clase: link de Zoom, grupo de WhatsApp, guía y programa de tu curso | `_privado/O1_Bienvenida_12oct.html` (copia rellena) | 🔧 Plantilla: 14 marcas ⟪…⟫ (§4) |
| **R1a** | lun 12 oct · 18:00 | lista `02a B1 martes` | — | Mañana es tu primera clase: Básico 1 (A1.1) | Martes 13 de octubre · 20:00 hora Chile · tu link de Zoom adentro | `_privado/R1a_Basico1_Martes.html` | 🔧 Plantilla: 1 marca (Zoom) |
| **R1b** | lun 12 oct · 18:00 | lista `02b Conversacional 1` | — | Mañana es tu primera clase: Conversacional 1 (A2.1) | Martes 13 de octubre · 21:00 hora Chile · tu link de Zoom adentro | `_privado/R1b_Conversacional1.html` | 🔧 Plantilla: 1 marca (Zoom) |
| **N1** | mar 13 oct · 13:00 (49 h después de E5) | lista `01 Leads sitio` | lista `02 Alumnos octubre` (con la lista final) | Tu lugar en enero 2027 🌱 | Lista de espera de enero abierta · el Lector, Dubu y el taller siguen gratis | `N1_Lista_Enero_13oct.html` | ✅ Listo. Solo se manda con el sitio en lista de espera (§5) |
| **R1c** | mar 13 oct · 18:00 | lista `02c Básico 2` | — | Mañana es tu primera clase: Básico 2 (A1.2) | Miércoles 14 de octubre · 21:00 hora Chile · tu link de Zoom adentro | `_privado/R1c_Basico2.html` | 🔧 Plantilla: 1 marca (Zoom) |
| **R1d** | mié 14 oct · 18:00 | lista `02d B1 jueves` | — | Mañana es tu primera clase: Básico 1 (A1.1) | Jueves 15 de octubre · 20:00 hora Chile · tu link de Zoom adentro | `_privado/R1d_Basico1_Jueves.html` | 🔧 Plantilla: 1 marca (Zoom) |
| **R1e** | mié 14 oct · 18:00 | lista `02e TOPIK II` | — | Mañana es tu primera clase: TOPIK II (B1+) | Jueves 15 de octubre · 21:00 hora Chile · tu link de Zoom adentro | `_privado/R1e_TOPIK2.html` | 🔧 Plantilla: 1 marca (Zoom) |
| **R1f** | dom 18 oct · 18:00 | lista `02f Niños` (apoderados) | — | Mañana es la primera clase de Coreano para Niños | Lunes 19 · 18:00 hora Chile · conecta y acompaña en esta primera clase | `_privado/R1f_Ninos.html` | 🔧 Plantilla: 1 marca (Zoom de Niños) |

Todas las rutas son relativas a `Brevo/Envios_desde_29sep/`. En O1 y en los R1 se pega **la copia rellena de `_privado/`**, nunca la plantilla (§4).

**Plan B de fechas:** si tu correo largo con el programa salió **después del lunes 28 a las 10:00**, E1 pasa al **jueves 1 a las 10:00** y E2 al **sábado 3 a las 10:00**. Lo demás no cambia. E2 dice "Este sábado 3 es 개천절", sin "mañana", así que sirve para los dos días.

**Nombre interno de cada campaña** (solo lo ves tú; ayuda a encontrarlas): `E1 · Programa · 30 sep` · `E2 · Tu nombre · 2 oct` · `E3 · Última semana · 5 oct` · `E4 A · Abrió algo · 8 oct` · `E4 B · No abrió · 8 oct` · `E5 · Hoy cierra · 11 oct` · `O1 · Bienvenida · 12 oct` · `R1a · Básico 1 martes` · `R1b · Conversacional 1` · `R1c · Básico 2` · `R1d · Básico 1 jueves` · `R1e · TOPIK II` · `R1f · Niños` · `N1 · Lista enero · 13 oct`.

**E4 son dos campañas normales** con el mismo HTML y distinto asunto. No uses la opción *A/B test* de Brevo, porque esa reparte a las personas al azar.

---

## 2 · Sesión única de programación en Brevo · hoy martes 29 · 21:00 (≈ 45 min)

Deja programados E1, E2, E3, E4 A, E4 B y E5. O1, los R1 y N1 **no** se programan hoy: necesitan los links de Zoom, los grupos y la lista final (dom 11 en la noche y lun 12).

0. **Solo si Brevo todavía no está listo** (+20 min): remitente verificado, zona de envío *America/Santiago*, CSV importado a `01 Leads sitio`, atributo de texto `CURSO_SUGERIDO` y lista vacía `02 Alumnos octubre`. Detalle en `Brevo/Plan_Email_Brevo_2026.md` §2.
1. **Antes de empezar (5 min):**
   - Mueve a `02 Alumnos octubre` a quien ya pagó (*CRM › Contacts* → busca el correo → agrégalo a la lista).
   - Si tu correo largo salió desde Gmail a personas que **no** están en `01` y que pidieron información, agrégalas a `01`.
   - Mira si la hoja resumen ya está publicada: https://www.academiaseul.com/programas/Hoja_Resumen_Cursos_Octubre_2026.pdf tiene que abrir el PDF. Si todavía da error, aplica el plan B de E1 (§5) antes de copiar el HTML.
2. **Crea los 2 segmentos (5 min, §3):** `E4 · Abrió algo` y `E5 · Abrió E3 o E4`. Se pueden crear hoy porque se llenan solos con las aperturas.
3. **Por cada correo, en este orden: E1 → E2 → E3 → E4 A → E4 B → E5.** Sigue los pasos del LEEME:
   *Marketing › Campaigns → Create campaign → Email → Regular* → nombre interno → *Create campaign*
   → *Sender* → *Recipients* (*Send to* + *Advanced options → Don't send to*, según la tabla)
   → *Subject* (asunto de la tabla, *Preview text* vacío)
   → *Design: Start designing → Start from scratch → HTML custom code* → pegar → *Save & quit*
   → *Additional settings*: Reply-To y *UTM tracking* apagado
   → *Preview & test* (con nombre y sin nombre) → *Send test email* a hola.academiaseul@gmail.com → míralo en el celular
   → *Schedule → Schedule for later* → fecha y hora de la tabla.
   **Atajo:** cuando E1 quede programada, en la lista de campañas usa *Duplicate* sobre E1 para crear E2, E3 y el resto. La copia conserva remitente, destinatarios y Reply-To. Solo cambias el nombre, el asunto, el diseño (en el editor: Ctrl+A, Supr y pegas el HTML nuevo), los destinatarios de E4 y E5 y la fecha.
4. **Al terminar:** en *Marketing › Campaigns* tienen que verse 6 campañas *Scheduled*, con estas fechas: 30 sep 10:00 · 2 oct 10:00 · 5 oct 10:00 · 8 oct 10:00 (dos) · 11 oct 12:00.
5. **Si Brevo no deja programar E4 A o E5** porque su segmento todavía está vacío: déjalas en borrador (*Draft*). E4 A se termina el **jue 8 a las 09:30** (5 min). E5 se programa el **jue 8 en la tarde**, cuando E4 ya salió y el segmento tiene gente, o a más tardar el dom 11 antes de las 11:30. E4 B siempre se puede programar hoy.

**Controles de 2 minutos en los días de envío** (ya están en el plan §3): lun 5, jue 8 y dom 11, antes de la hora de salida, mueve a los nuevos pagados a `02`. El jue 8 a las 09:30 y el dom 11 a las 11:30, abre la campaña programada y revisa que el número de destinatarios tenga sentido. E4 A + E4 B tienen que sumar lo mismo que `01` − `02`.

---

## 3 · Segmentos de actividad (E4 y E5)

Se crean una vez y Brevo los actualiza solo: *CRM › Contacts › Segments → Create a segment → Create segment from scratch*.

**`E4 · Abrió algo`**: quién abrió algún correo en los últimos 30 días. El jue 8 a las 10:00 eso significa E1, E2 o E3, y tu correo largo si salió por Brevo.
1. Condición: *Marketing › Email › Email opened*.
2. Tipo de correo: *Email campaigns* (campañas) · *At least* **1** *time* · periodo *In the last* **30 days**.
3. Si pregunta por las aperturas de Apple (*Apple MPP opens*), déjalas **incluidas**. El texto de E4 sirve igual para A y para B, así que da lo mismo si el iPhone cuenta de más.
4. *Save as segment* → nombre exacto `E4 · Abrió algo` → *Create*.

**`E4 · No abrió nada`**: **ya no hace falta crearlo.** E4 B va a `01 Leads sitio` y excluye `02` y `E4 · Abrió algo`. Son las mismas personas, con un paso menos, y nadie queda fuera ni recibe los dos.

**`E5 · Abrió E3 o E4`**: quién abrió algún correo en los últimos 7 días. El dom 11 a las 12:00 eso cubre desde el dom 4 a las 12:00, o sea E3 (lun 5) y E4 A o B (jue 8). Si en esa semana alguien abre tarde E1 o E2, también entra, y está bien: es alguien interesado.
1. Condición: *Marketing › Email › Email opened* → *Email campaigns* · *At least* **1** *time* · *In the last* **7 days**.
2. *Save as segment* → nombre exacto `E5 · Abrió E3 o E4` → *Create*.

**Si tu Brevo no ofrece *In the last … days*:** usa *Fixed period*, del 28 de septiembre al 8 de octubre para E4 y del 4 al 11 de octubre para E5.
Otra forma, más precisa pero que depende de los nombres: en la misma condición, *Choose which campaigns → Email name → Is exactly* con el nombre interno de cada campaña (`E1 · Programa · 30 sep`, `E2 · Tu nombre · 2 oct`, `E3 · Última semana · 5 oct`), unidas con **+ Or**. Para E5: `E3 · Última semana · 5 oct`, `E4 A · Abrió algo · 8 oct` y `E4 B · No abrió · 8 oct`.

---

## 4 · Marcas ⟪…⟫ de O1 y R1: qué completar y cuándo

El repo es **público**. Los links de Zoom (llevan la clave adentro) y los de los grupos de WhatsApp **nunca** van en las plantillas ni en git. Se rellenan en copias dentro de `Brevo/Envios_desde_29sep/_privado/`, que está en `.gitignore`.

| Marca | Dónde va | Qué pegar | Desde cuándo lo tienes |
|---|---|---|---|
| ⟪PEGAR LINK ZOOM BÁSICO 1 MARTES⟫ | O1 · R1a | Link de invitación de la reunión recurrente (`https://…zoom.us/j/…`) | **mar 6** (creas las 6 reuniones) |
| ⟪PEGAR LINK ZOOM CONVERSACIONAL 1⟫ | O1 · R1b | ídem | mar 6 |
| ⟪PEGAR LINK ZOOM BÁSICO 2⟫ | O1 · R1c | ídem | mar 6 |
| ⟪PEGAR LINK ZOOM BÁSICO 1 JUEVES⟫ | O1 · R1d | ídem | mar 6 |
| ⟪PEGAR LINK ZOOM TOPIK II⟫ | O1 · R1e | ídem | mar 6 |
| ⟪PEGAR LINK ZOOM NIÑOS⟫ | **solo R1f**. Por privacidad de los niños no va en O1, que también les llega a los adultos | ídem | mar 6 |
| ⟪PEGAR LINK GRUPO BÁSICO 1 MARTES⟫ · ⟪…CONVERSACIONAL 1⟫ · ⟪…BÁSICO 2⟫ · ⟪…BÁSICO 1 JUEVES⟫ · ⟪…TOPIK II⟫ · ⟪…NIÑOS⟫ | O1 (1 vez cada una) | Grupo → *Invitar al grupo mediante enlace* → *Copiar enlace* (`https://chat.whatsapp.com/…`) | **mié 7** (creas los 6 grupos) |
| ⟪PEGAR LINK GUÍA DEL ALUMNO⟫ · ⟪PEGAR LINK GUÍA PARA FAMILIAS⟫ | O1 | Google Drive → *Compartir* → "Cualquier persona con el enlace" (lector). Tiene que ser la **versión final**, sin "[POR CONFIRMAR]": Claude las regenera cuando decidas la regla del certificado (vie 9) y la cuota 2 | **sáb 10 o dom 11** |
| ⟪ESCRIBIR FECHA CUOTA 2⟫ | O1 | Texto, no link. Completa la frase "La segunda se paga ___." Propuesta: `la semana del 9 de noviembre`. Si aún no lo decides: `en noviembre (te confirmo la fecha exacta)` | decisión **antes del dom 11** |

En total son 15 marcas y todas se rellenan desde un solo archivo. O1 lleva 14 (todas menos el Zoom de Niños). Cada R1 lleva 1, que aparece 3 veces: en el texto, en su link y en el botón.

**Cómo rellenar (dom 11 en la noche, ~10 min; si quieres, deja los Zoom y los grupos pegados desde el mié 7):**
1. En la carpeta del repo: `node Brevo/Envios_desde_29sep/rellenar_links.js`. La primera vez crea `_privado/links_privados.txt` y se detiene.
2. Abre ese archivo con el Bloc de notas y pega cada link después de su "=" (uno por línea). Guarda.
3. Vuelve a correr el mismo comando. Deja las 7 copias rellenas en `_privado/` y te dice `LISTO` o `FALTA` con la marca vacía. Con `REVISA` te avisa si un Zoom no es de `zoom.us`, si un grupo no es de `chat.whatsapp.com` o si pegaste el mismo link dos veces.
4. Pídele a Claude que pase cada copia por `preview.js`. Tiene que decir **LISTO PARA PEGAR EN BREVO**. Hoy, con links de prueba, las 7 copias pasan.
5. Crea las listas `02a B1 martes`, `02b Conversacional 1`, `02c Básico 2`, `02d B1 jueves`, `02e TOPIK II` y `02f Niños` (en Niños, el correo del apoderado) a partir de las listas que arma Claude con el export de Formspree y el registro de pagos. Después programa O1 y los 6 R1.

**Si prefieres hacerlo a mano:** copia la plantilla dentro de `_privado/`, ábrela con el Bloc de notas y usa Ctrl+H con cada marca, incluidos los signos ⟪ ⟫. Al final busca "⟪": tiene que dar 0 resultados. Guarda en UTF-8 y pide la validación igual.

**Privacidad:** O1 va a toda la lista `02`, así que cada inscrito ve los Zoom de las 5 clases de adultos y los links de los 6 grupos. Activa *Aprobar nuevos participantes* en cada grupo de WhatsApp (en el de apoderados de Niños, sí o sí). En la reunión de Niños deja la **sala de espera** activada: tú o Abby admiten a cada niño por su nombre de pila.

**Si alguien paga después de programar O1:** agrégalo a `02` y a su lista de clase antes de las 18:00 del día anterior a su clase, para que le llegue su R1. El O1 se lo mandas por WhatsApp con el mensaje (a1) y el link de su grupo, o le reenvías el correo de prueba.

---

## 5 · Correo por correo: qué ajustar y qué mirar en la prueba

En todos: saludo "¡Hola, [nombre]!" y, en un contacto sin nombre, "¡Hola, chingu!" · nada se sale por la derecha en el celular · precio exacto · solo azul, navy y dorado · WhatsApp → chat con +56 9 4211 5562 · al pie, "Darme de baja" y "Ver en el navegador" (en la prueba a veces son de ejemplo; en el envío real funcionan). En el plan gratis, **los links del correo de prueba vencen unos 30 minutos después de que llega**: tócalos pronto.

**E1 · Programa corto** (mié 30): 5 tarjetas con nivel, para quién es, día y hora de Chile, profe, 1.ª clase y un botón con la clase ya marcada; luego lo que incluyen todos los cursos, el precio, "¿no sabes cuál es tu curso?" con el test, el PDF de una página y el cierre el dom 11. Sirve a quien leyó tu correo largo y a quien no.
- **Plan B del PDF**, si la hoja resumen todavía da 404 el mié 30 antes de las 10:00: abre el .html con el Bloc de notas y haz 2 reemplazos (Ctrl+H): `Hoja_Resumen_Cursos_Octubre_2026.pdf` → `Programa_Cursos_Octubre_2026.pdf` (8 págs, ya en línea) y `Ver el programa <span style="white-space:nowrap;">en una página (PDF)</span>` → `Ver el programa de cursos (PDF)`. Si E1 ya está programada, corrígela en su diseño (*Design → Edit*) y vuelve a guardarla.
- Prueba: toca un botón de cada curso (Básico 1 martes y jueves, Básico 2, Conversacional 1, TOPIK II y Niños) y revisa que `/nivel-1` abra con esa clase marcada. "Test de nivel gratis" → `/test-nivel` · "lista de espera" → Conversacional 2.
- Si preguntan por el test: pide nombre y correo antes de mostrar el resultado, y es normal (así les llega). El correo no dice "sin registro".
- **Si alguien responde** (a E1 o a cualquier correo): contesta con `Curriculo/publico/WhatsApp_Cursos_Octubre_2026.md` (mensaje principal, respuesta del curso, "¿no sé mi nivel?", "¿cómo pago?"). Para TOPIK II, el diagnóstico antes de pagar está en `Curriculo/Fase6_TOPIK2/00_Diseno_TOPIK2.md` (B0.2 y B0.4).

**E2 · Tu nombre en coreano** (vie 2): es un regalo, sin venta dura. Muestra 마리아 sílaba por sílaba → generador de nombres → Lector → Dubu → taller grabado → una línea suave a Básico 1. No menciona el reto ni el vivo del sábado.
- Prueba: el hangul se ve en el celular (no como cuadritos) · generador, Lector, Dubu, taller (el video carga) y "Ver Básico 1" (martes ya marcado).

**E3 · Última semana** (lun 5): trae una tabla con las 6 clases y su cupo **máximo** (15 · TOPIK II 8 · Niños 12), sin números inventados.
- Opcional, **solo con números reales del conteo del dom 4**: en el .html cambia `máx. 8</span>` por `máx. 8 · quedan N</span>` en la clase donde el dato ayude, y pide que lo validen con `preview.js`. Sin conteo, no toques nada.
- Prueba: cada nombre de curso de la tabla abre su clase en `/nivel-1`.

**E4 · Quedan 3 días** (jue 8, A y B): es corto. Trae el cierre del dom 11, el guiño a 한글날 (vie 9, 580 años), una tarjeta con **el curso sugerido**, el precio, un botón, WhatsApp y una salida sin presión (enero 2027; N1 lo cumple).
- La tarjeta usa `{{ contact.CURSO_SUGERIDO|default:"Básico 1 (A1.1)" }}`. Revisa que el atributo exista (*CRM › Contacts → Settings → Contact attributes* → `CURSO_SUGERIDO`, tipo texto). Si falta el dato, muestra "Básico 1 (A1.1)" y no se rompe.
- En el CSV, 4 contactos traen "… · test de nivel" al final (1 en P1, 3 en P2) y la tarjeta lo mostraría completo. Si prefieres que diga solo el curso, filtra `CURSO_SUGERIDO` contiene "test de nivel" y borra ese final en esos 4 (2 min).
- Prueba: *Preview* con un contacto de Básico 2 (debe decir "Básico 2 (A1.2)") y con uno sin dato ("Básico 1 (A1.1)"). Manda una prueba de cada campaña: cambia el asunto y el cuerpo es el mismo.

**E5 · Hoy cierra** (dom 11): son 4 líneas: "Si ya te inscribiste, ignora este correo", botón con el precio, WhatsApp y la lista de enero 2027. Se lee en una sola pantalla.
- Ese día ten el WhatsApp a mano: las historias de las 16:00 también mandan ahí.

**O1 · Bienvenida** (lun 12): una tarjeta por clase (Zoom, grupo y programa en PDF), qué preparar en 5 pasos, las horas por país (con el cambio de hora de España el 25 oct y de EE. UU. el 1 nov), las guías, la cuota 2, el Lector, Dubu, las 3 normas y el contacto. No dice la regla del certificado: remite a la guía.
- Prueba: toca **los 11 links de clase** (5 Zoom y 6 grupos). Cada uno tiene que abrir **su** clase o **su** grupo; es el error más caro. La tarjeta de Niños no trae Zoom, a propósito. Las 2 guías abren **sin iniciar sesión** (pruébalo en una ventana de incógnito). La línea de la cuota 2 dice la fecha que decidiste.

**R1a … R1f · Recordatorio** (18:00 del día anterior a cada 1.ª clase): cada archivo ya trae su curso, día, hora, profe, las horas por país y qué preparar.

| R1 | Curso | 1.ª clase | Hora Chile | Profe | Llegada | Qué pide para la clase 1 |
|---|---|---|---|---|---|---|
| a | Básico 1 (A1.1) · martes | mar 13 oct | 20:00 | Kiran (기란) | 5 min antes | Calentamiento opcional con el Lector o Dubu |
| b | Conversacional 1 (A2.1) | mar 13 oct | 21:00 (Corea: mié 09:00) | Abby | 21:00 en punto, sala 20:58 | Pensar 3 cosas que quiere poder decir al terminar |
| c | Básico 2 (A1.2) | mié 14 oct | 21:00 | Jay (김재희) | 5 min antes | 5 frases para presentarse |
| d | Básico 1 (A1.1) · jueves | jue 15 oct | 20:00 | Kiran (기란) | 5 min antes | Calentamiento opcional con el Lector o Dubu |
| e | TOPIK II (B1+) | jue 15 oct | 21:00 | Jay (김재희) | 21:00 en punto, sala 20:58 | Bajar de topik.go.kr el 제64회 TOPIK II (읽기, 듣기·쓰기 y MP3) **sin resolverlo** e imprimir la hoja de respuestas. Si decides no pedirlo o el MP3 no se puede bajar, pídele a Claude que saque esa frase |
| f | Coreano para Niños (8–15) | lun 19 oct | 18:00 (Corea: mar 06:00) | Jay y Abby | 10 min antes, con un adulto | Acompañar la clase 1 · nombre de pila · privacidad |

- Prueba de cada R1: el botón y el link de texto abren el Zoom **de esa clase**. El mismo recordatorio va por el grupo de cada curso (`Lanzamiento_Octubre_2026/alumnos/Mensajes_Alumnos.md`, c1–c5 y (i) para Niños).

**N1 · Lista de enero** (mar 13, se programa el lun 12): la cohorte de octubre arrancó y la próxima es en enero de 2027, con el estreno de Conversacional 2 (A2.2). Trae el botón a la lista de espera, los links por curso, "responde 'enero' y te anoto yo" y los 4 recursos gratis. No dice día, hora, profe ni precio de Conversacional 2.
- **Antes de programarlo:** el sitio tiene que estar en lista de espera (`COHORTE_ABIERTA = false` en `lib/nivel1.ts`, con el deploy verificado el lun 12). Con la cohorte todavía abierta, los links por curso muestran "ya tiene matrícula abierta" en `/notificarme`. Si el cambio no se hizo, N1 no sale.
- Respuestas "enero": agrégalas a una lista nueva `05 Enero 2027` (el número 03 ya está reservado para `03 Base escuela` en `Plan_Email_Brevo_2026.md`).
- Párrafo opcional, solo si aceptas inscripciones tardías esa semana: pégalo en su propia línea justo después del párrafo que termina en `el paso que sigue a Conversacional 1.</p>` y vuelve a validarlo:
  `<p style="margin:0 0 14px 0;">¿Se te pasó la fecha por unos días? Escríbeme hoy al WhatsApp y vemos si todavía te puedo sumar a un grupo de esta semana.</p>`

**Si editas cualquier HTML**, pídele a Claude que lo pase otra vez por `preview.js` antes de pegarlo.

---

## 6 · Validación (29 sep, `preview.js`)

| Correo | Resultado | Links |
|---|---|---|
| E1 | LISTO · 0 fallas · 0 avisos | 13 de 14 en 200 · el PDF de una página, "pendiente de deploy" (404 hasta publicar la hoja resumen) |
| E2 · E3 · E5 · N1 | LISTO · 0 fallas · 0 avisos | todos en 200 |
| E4 (asuntos A y B) | LISTO · 0 fallas · 1 aviso a propósito (`CURSO_SUGERIDO`) | todos en 200 |
| O1 (plantilla) | NO LISTO **a propósito**: 13 fallas, todas por marcas ⟪…⟫ de links (la 14.ª, la cuota 2, es texto) | los links reales, en 200 |
| R1a … R1f (plantillas) | NO LISTO **a propósito**: 2 fallas cada uno, las marcas de Zoom | los links reales, en 200 |
| O1 y R1a … R1f rellenados con links de prueba | LISTO · 0 fallas (O1: 1 aviso que viene del link de prueba) | en 200 |

También se validaron sin nombre ("¡Hola, chingu!") y en el celular (390 px): nada se sale de la pantalla y no hay nada rojo. Peso: E1 35 KB y O1 26 KB; los demás, entre 6 y 13 KB (Gmail recorta cerca de 102 KB).
Capturas (700 px y 390 px) y hoja de contacto con la vista de celular de todos: carpeta temporal de la sesión, `scratchpad/brevo_v2/previews/` (`_hoja.png`). La prueba que vale es el *Send a test* en tu celular.

**No usar más** (quedan como referencia en `Brevo/`): `L1_Lanzamiento_P1.html`, `L1b_Taller_P2P3.html`, `L2_Reto_y_Vivo.html`, `L3_Vivo_Manana.html`, `L4_Ultima_Semana.html`, `L5_Quedan_3_Dias.html`, `L5b_Hoy_Cierra.html`, `O1_Bienvenida_Inscritos.html`, `R1_Recordatorio_Primera_Clase.html`, `N1_Lista_Enero_2027.html` y `Email_Lanzamiento_Brevo.html`. Hablan del reto, de 추석 "hoy" o del vivo, y algunos se rompen en el celular.

화이팅!
