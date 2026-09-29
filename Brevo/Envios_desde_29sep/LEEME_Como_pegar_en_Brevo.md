# LÉEME · Cómo pegar estos correos en Brevo (sin que se rompan)

Qué se manda, a quién y cuándo: `Brevo/Calendario_Envios_desde_29sep_2026.md`. Esta guía es solo el **cómo**. Menús de Brevo revisados en su centro de ayuda el 29 de septiembre de 2026.

---

## 1 · Por qué los archivos viejos "se veían rotos" (y estos no)

| Lo que veías | Por qué pasaba | Cómo quedó ahora |
|---|---|---|
| Al abrir el .html con doble clic aparecen etiquetas entre llaves dobles, como `{{ unsubscribe }}` o `{{ mirror }}`, y en el saludo la del nombre (`contact.FIRSTNAME`) | **Es normal.** Son etiquetas de Brevo, y Brevo las reemplaza recién al enviar (por el nombre, el link de baja, etc.) | Igual. Pasa también con los correos nuevos y no es un error |
| Letras raras, como "SeÃºl" | Los archivos viejos eran pedazos de código, sin `<!doctype>` ni `<meta charset>`, y algunos programas de Windows adivinaban mal la codificación | Cada correo nuevo es un documento completo y declara UTF-8 |
| En Brevo quedaba código crudo, o texto sin tablas ni botones | Las instrucciones usaban un menú viejo de Brevo y no decían desde dónde copiar. Si el HTML se pega en el editor de arrastrar (*Drag & drop*), o si se copia la página abierta en el navegador, se pierde el diseño | Abajo tienes el paso a paso con los menús de hoy |
| Brevo no dejaba guardar o probar la campaña, o se colaban notas internas | Los archivos viejos traían notas para ti dentro de comentarios `<!-- -->`, algunas con etiquetas de Brevo. Brevo las procesa **aunque estén comentadas**: con una sola mal escrita no compila la campaña. Además, esas notas le llegan a cada destinatario dentro del código | Los correos nuevos **no traen notas**. Todo lo que tienes que saber está en el calendario y en esta guía. Los únicos comentarios son los de Outlook (`<!--[if mso]>`), que son parte del diseño |
| Asunto con error al programar | En el calendario viejo, el asunto llevaba una etiqueta de Brevo con una barra invertida delante; copiado desde el archivo abierto como texto, Brevo no podía armar la campaña | Los asuntos nuevos no llevan etiquetas, barras ni comillas |
| En el celular, el correo se salía de la pantalla | `Email_Lanzamiento_Brevo.html` mide 608 px de ancho en un celular de 390 px y además usa colores fuera de la marca | **No lo uses.** Los nuevos se probaron a 390 px y nada se sale |
| En Outlook de escritorio los botones eran links planos y la tarjeta se estiraba | Botones hechos solo con CSS y sin ancho fijo | Botones a prueba de Outlook y un ancho máximo de 600 px |
| Logos coral o rojos | Casi todos los logos del sitio son coral o rojos (regla de la casa: nada rojo) | Los correos nuevos no llevan imágenes. La cabecera es texto azul y navy, y se ven iguales aunque el correo bloquee imágenes |

Y aunque la parte técnica hubiera funcionado, **L1–L4 ya vencieron**: hablan del reto, de 추석 "hoy" y del vivo. No los mandes.

---

## 2 · Antes de pegar: ¿qué archivo?

- **E1, E2, E3, E4, E5 y N1:** el archivo de esta carpeta, tal cual.
- **O1 y R1a … R1f:** la **copia rellena de `_privado/`**, nunca la plantilla con ⟪…⟫ (calendario §4). Si ves una "⟪" en la vista previa de Brevo, estás pegando la plantilla.

**Para mirarlo antes (opcional):** doble clic sobre el .html lo abre en Chrome. Se ve el diseño con las etiquetas `{{ … }}` sin reemplazar, y eso es normal. Para ver cómo queda de verdad con un nombre y en tamaño de celular, pídele a Claude que corra `preview.js`: te devuelve capturas y un informe que dice **LISTO PARA PEGAR EN BREVO**.

---

## 3 · Paso a paso en Brevo (≈ 7 min por correo)

1. **Copia el código, no la página.** Clic derecho en el .html → *Abrir con* → **Bloc de notas** (o VS Code) → **Ctrl+A** → **Ctrl+C**.
   Otra forma: ábrelo en Chrome → clic derecho → *Ver código fuente de la página* → Ctrl+A → Ctrl+C.
2. **Crea la campaña.** *Marketing › Campaigns* → **Create campaign** → **Email** → **Regular** → nombre interno (lista en el calendario §1) → **Create campaign**.
3. **Sender:** "Jay · Academia Seúl" (*Select sender* o *Manage sender*) → *Save*.
4. **Recipients:** *Add recipients* → en **Send to** elige la lista o el segmento de la tabla → **Advanced options** → en **Don't send to** marca `02 Alumnos octubre` (en E4 B, también el segmento `E4 · Abrió algo`) → *Save*. Mira el número de destinatarios: con ~100 contactos, tiene que tener sentido.
5. **Subject:** *Add subject* → en **Subject line** pega el asunto del calendario (sin comillas) → deja **vacío** el **Preview text** → *Save*.
6. **Design:** **Start designing** → **Start from scratch** (en algunas pantallas dice *Create from scratch*) → **HTML custom code** (en cuentas antiguas puede llamarse *Code your own* o *Paste your code*) → si el editor trae algo, bórralo (Ctrl+A, Supr) → **Ctrl+V** → **Save & quit**.
7. **Additional settings** (al final de la página) → *Edit settings*:
   - *Use a different 'Reply-To' Email address* → hola.academiaseul@gmail.com.
   - **Activate UTM tracking: apagado.** Los links ya traen su UTM y Brevo los pisaría.
   - No marques *Embed images* ni *Add an attachment*.
8. **Preview & test → Preview:** en *Select a contact* elige a alguien **con** nombre y después a alguien **sin** nombre. Con el ícono 📱 ves la versión de celular.
9. **Preview & test → Send test email:** destinatario hola.academiaseul@gmail.com → **Send test**. Ábrelo **en el celular** y revisa la lista del punto 5 de esta guía. En el plan gratis, **los links de la prueba vencen unos 30 minutos después de que llega**: tócalos pronto.
10. **Schedule → Schedule for later →** fecha y hora de la tabla → **Schedule**. En *Marketing › Campaigns* la campaña tiene que quedar como *Scheduled* con esa fecha.

**Atajo para el resto:** en la lista de campañas, **Duplicate** sobre una ya programada conserva el remitente, los destinatarios y el Reply-To. Cambia el nombre, el asunto, el diseño (*Design → Edit*: Ctrl+A, Supr, pegar el HTML nuevo, *Save & quit*), los destinatarios si corresponde y la fecha.

---

## 4 · Qué NO hacer

- **No** pegues el HTML en el editor *Drag & drop*, ni en un bloque de texto, ni en un bloque HTML dentro del *Drag & drop*, ni en el *Simple editor*. Solo va en **HTML custom code**.
- **No** pegues el HTML en el campo de asunto ni en *Preview text*.
- **No** copies desde la página abierta en el navegador (Ctrl+A sobre el correo que ves). Eso copia texto sin diseño.
- **No** abras ni guardes el .html con Word: cambia el código y la codificación.
- **No** toques las etiquetas `{{ … }}`. Brevo se rompe si:
  - una etiqueta queda partida en dos líneas;
  - las comillas rectas `"` se cambian por comillas tipográficas “ ”;
  - se escribe `{#`;
  - se usa un atributo que no existe en tu cuenta.
- **No** llenes *Preview text*: el preheader ya viene oculto dentro del HTML y se vería dos veces.
- **No** uses *A/B test* para E4: son 2 campañas normales con el mismo HTML.
- **No** actives *Activate UTM tracking*.
- **No** pegues las plantillas de O1 o R1 con ⟪…⟫, y **no** subas `_privado/` a git (ya está bloqueado en `.gitignore`).
- **No** uses los correos viejos de `Brevo/` (L1 … L5b, `Email_Lanzamiento_Brevo.html`, `O1_Bienvenida_Inscritos.html`, `R1_Recordatorio_Primera_Clase.html`, `N1_Lista_Enero_2027.html`).
- Si cambias algo con el Bloc de notas (por ejemplo, el plan B del PDF de E1), guarda en **UTF-8** y pídele a Claude que lo valide otra vez.

---

## 5 · El correo de prueba: qué mirar (2 minutos, en el celular)

- [ ] En la bandeja: el asunto correcto y, al lado, el texto gris del preheader una sola vez.
- [ ] El saludo dice "¡Hola, [tu nombre]!". Si tu contacto no tiene nombre, dice "¡Hola, chingu!". **Nunca** debe verse `{{ contact…`, ni una "⟪".
- [ ] Nada se sale por la derecha y se lee sin hacer zoom. El hangul se ve como letras, no como cuadritos.
- [ ] Los botones son botones (azules o con borde azul) y abren la página correcta. En E1 y E3, la clase ya viene marcada en `/nivel-1`.
- [ ] El precio dice exactamente: US$150 el curso completo · o 2 cuotas de US$75.
- [ ] Solo azul, navy y dorado; nada rojo.
- [ ] El WhatsApp abre el chat con +56 9 4211 5562.
- [ ] Al pie aparecen "Darme de baja" y "Ver en el navegador". En la prueba a veces llevan a una página de ejemplo; en el envío real funcionan.
- [ ] Si respondes el correo de prueba, la respuesta va a hola.academiaseul@gmail.com.

**Si algo sale mal:**
- Brevo no deja guardar, probar o programar, o avisa de un error de plantilla: casi siempre es una etiqueta `{{ … }}` tocada. Vuelve a copiar desde el archivo original (paso 1).
- En la prueba aparece `{{ contact.FIRSTNAME…` tal cual: **no programes**. Avísale a Claude.
- No llega la prueba: búscala por el asunto en *Spam* o en *Promociones* y espera unos minutos.
- E4 A o E5 no se pueden programar hoy porque su segmento está vacío: déjalas en borrador y termínalas el jue 8 (calendario §2, punto 5).

화이팅!
