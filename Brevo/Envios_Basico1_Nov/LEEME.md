# Correos de la campaña «Básico 1 · noviembre 2026»

**Pedido de Jay (lun 26 oct 2026): promover solo Básico 1.** Es una oferta, con una fecha y un botón.

Esta carpeta tiene 4 correos para Brevo y 1 texto para Gmail. Todos usan la plantilla académica (`Brevo/Envios_desde_29sep/herramientas/_base_academica.html`).

**Cómo se pega cada correo en Brevo:** `Brevo/Envios_desde_29sep/LEEME_Como_pegar_en_Brevo.md`. Ese paso a paso no cambia:
- *HTML custom code*;
- *Preview text* vacío;
- *Reply-To* hola.academiaseul@gmail.com;
- *UTM tracking* apagado.

## La oferta, como la dicen los correos

| | |
|---|---|
| Curso | Básico 1 (A1.1) · coreano desde cero · «Primeras Palabras · 첫 한국어» |
| Profesora | Kiran (기란) |
| Día y hora | martes 20:00–20:58, hora de Chile, por Zoom |
| Inicio | **martes 10 de noviembre de 2026** · 8 martes |
| Precio de lanzamiento | **US$120 el curso completo · o 2 cuotas de US$60** (en Chile, $120.000 o 2 × $60.000), hasta el **domingo 8 de noviembre a las 23:59** (hora de Chile) |
| Precio normal (desde el lun 9 nov) | US$150 el curso completo · o 2 cuotas de US$75 |
| Matrícula | Abierta hasta el **lunes 9 de noviembre a las 23:59**, o hasta llenar los cupos |
| Incluye | Grabación de cada clase, material de cada semana con audio nativo, grupo de WhatsApp y certificado |
| Botón | `academiaseul.com/inscribete?clase=a11-martes` (redirige a `/nivel-1?clase=a11-martes` y conserva los UTM) |
| Pago del precio de lanzamiento | **Por WhatsApp**: no hay links de US$120 ni de US$60. Los correos lo dicen así, con un link de WhatsApp que ya trae escrito «Hola Jay, quiero inscribirme en Básico 1 con el precio de lanzamiento». Si Jay crea los links después, los correos no cambian |

**Solo para uso interno:**
- Las 8 clases son el 10, el 17 y el 24 de noviembre, y el 1, el 8, el 15, el 22 y el 29 de diciembre.
- El **mar 8 de diciembre es feriado en Chile** y cae la clase 5. Hacerla igual (es online) queda **[POR CONFIRMAR]** con Jay.
- La clase 8 cae el **29 de diciembre**.
- Por eso **ningún correo da una fecha de término**: dicen «8 martes desde el 10 de noviembre».
- La fecha de la cuota 2 no está fijada. B1N_4 solo dice que Jay avisa por WhatsApp unos días antes.

---

## 0 · Antes del primer envío (bloqueantes)

1. **El sitio tiene que mostrar la oferta nueva.**
   - Hoy `/nivel-1` todavía dice «semana del 19 de octubre» y «matrícula hasta el domingo 18», y el botón de los correos lleva ahí.
   - **No programes B1N_1** hasta que `https://www.academiaseul.com/inscribete?clase=a11-martes` muestre el martes 10 de noviembre y el precio de lanzamiento.
   - Además, el commit tiene que salir verde en GitHub: el deploy de Vercel pasó.
2. **Lista nueva en Brevo: `02g Básico 1 noviembre`.**
   - Créala vacía (*CRM › Contacts › Lists › Create a list*), junto a `02a`…`02f`.
   - Cada persona que paga entra ahí **antes del siguiente envío**: Brevo aplica la exclusión en el momento de enviar.
3. **La persona que ya pagó la cuota 1 de Básico 1 en octubre** (su nombre no va en el repo):
   - ya está en `02 Alumnos octubre`, así que no recibe B1N_1, B1N_2 ni B1N_3;
   - Jay le escribe 1:1 por WhatsApp antes del mar 27;
   - si sigue, se agrega también a `02g` para que reciba B1N_4.
4. **Inscritos del taller que llegaron después de la importación a Brevo:**
   - en Formspree, exporta las respuestas nuevas del taller a CSV;
   - impórtalas a `01 Leads sitio` con `ORIGEN` = `taller` y `PRIORIDAD` = `P3` (o `P2` si dicen que conocen algo de Hangul);
   - el CSV **nunca va al repo** (`.gitignore` ya bloquea `*.csv`);
   - los 79 del taller que ya están en Brevo son **P2 (21) + P3 (58)** dentro de `01 Leads sitio`.
5. **Lista de 91 del 14 de octubre (Gmail):**
   - quien de los 91 también esté en `01` o en `03` recibiría dos correos el mismo día;
   - antes de mandar el de Gmail, saca de la CCO a quienes ya estén en Brevo: ellos reciben B1N_1, que trae el mismo precio;
   - Claude puede hacer el cruce si le pasas los dos archivos (quedan fuera del repo).
6. **Zoom:**
   - Una reunión recurrente de 8 martes desde el 10 de noviembre, a las 20:00.
   - Si ya existe la de Básico 1 martes de octubre, edita la serie: *Edit → All occurrences*, inicio el 10 de noviembre y 8 ocurrencias. El link no cambia.
   - Si no existe, créala. Su link va en B1N_4 (§2).

---

## 1 · Tabla de envíos

Copia el asunto tal cual, sin comillas. Ningún asunto lleva etiquetas de Brevo. El preheader ya viene oculto dentro de cada HTML; por eso el *Preview text* de Brevo va **vacío**.

| Id | Sale (hora de Chile) | Enviar a (*Send to*) | No enviar a (*Don't send to*) | Asunto | Preheader (ya va en el HTML) | Archivo · `utm_campaign` |
|---|---|---|---|---|---|---|
| **B1N_1** · Anuncio | **mar 27 oct · 10:00** | lista `01 Leads sitio` (P1 18 · P2 21 · P3 58, incluye a los inscritos del taller) **+** lista `03 Primer contacto` | listas `02 Alumnos octubre` **y** `02g Básico 1 noviembre` | **A:** Coreano desde cero con Kiran: empezamos el martes 10 🐯<br>**B:** Abro una clase nueva de Básico 1 (precio de lanzamiento) | Coreano desde cero, 8 martes por Zoom · precio de lanzamiento hasta el domingo 8 de noviembre | `B1N_1_Anuncio_27oct.html` · `b1n1` |
| Gmail · lista de 91 | **mar 27 oct · 12:00** | CCO: los 91 del 14 oct (sin los que ya están en Brevo, §0.5) | — | Básico 1 con Kiran: tu 20 % sigue en pie 🐯 | — (texto plano) | `Texto_Plano_Gmail_Lista91.txt` |
| *B1N_1-R* · reenvío (opcional) | jue 29 oct · 10:00 | segmento `B1N · No abrió el anuncio` (§3) | `02` **y** `02g` | el asunto que **no** se usó el martes (B si salió A) | el mismo | `B1N_1_Anuncio_27oct.html` (el mismo HTML) |
| **B1N_2** · Quedan 3 días | **jue 5 nov · 10:00** | `01 Leads sitio` **+** `03 Primer contacto` | `02` **y** `02g` | Quedan 3 días del precio de lanzamiento | El domingo 8 termina el precio de lanzamiento · esto aprendes en tu primera clase con Kiran | `B1N_2_Recordatorio_5nov.html` · `b1n2` |
| **B1N_3** · Último día del precio | **dom 8 nov · 12:00** | segmento `B1N · Abrió algo` (§3) | `02` **y** `02g` | Hoy es el último día del precio de lanzamiento | A las 23:59 de hoy (hora de Chile) termina el precio de lanzamiento · empezamos el martes 10 | `B1N_3_Ultimo_Dia_Precio_8nov.html` · `b1n3` |
| **B1N_4** · Bienvenida | **lun 9 nov · 18:00**, solo si la clase abre (§2) | lista `02g Básico 1 noviembre` | — | Mañana empezamos: tu Zoom y tu grupo de Básico 1 | Martes 10 de noviembre · 20:00 hora de Chile · tu Zoom, tu grupo y qué tener a mano | la **copia rellena** de `_privado/B1N_4_Bienvenida_9nov.html` · `b1n4` |

**Nombres internos de las campañas en Brevo:**
- `B1N_1 · Anuncio · 27 oct`
- `B1N_1-R · Reenvío · 29 oct`
- `B1N_2 · Quedan 3 días · 5 nov`
- `B1N_3 · Último día · 8 nov`
- `B1N_4 · Bienvenida · 9 nov`

**Reglas de la casa que se cumplen:**
- **Máximo 1 correo por persona cada 48 h:**
  - 27 oct → 29 oct (solo quien no abrió) → 5 nov → 8 nov;
  - B1N_4 es un aviso de clase y va solo a inscritos, como O1/R1 en octubre.
- **Máximo 290 envíos al día** (plan gratis: 300):
  - si `01` + `03` − `02` pasa de 290 el mar 27, manda B1N_1 a `01` ese día;
  - y a `03` el **mié 28 a las 10:00** (con *Duplicate*, cambiando solo los destinatarios).
- **Antes de cada envío a prospectos**, mueve a `02g` a quien ya pagó.

### A/B del asunto del anuncio
- **Si tu cuenta de Brevo ofrece *A/B test*** al crear la campaña (en el plan gratis puede no estar):
  - asunto A contra asunto B, con el **100 % de los destinatarios en la prueba** (mitad y mitad, sin «ganador»);
  - así todos lo reciben el martes a las 10:00;
  - el jueves 29 miras qué asunto abrió más y usas ese estilo en B1N_2 y B1N_3.
- **Si no la ofrece** (lo más probable en el plan gratis):
  - el martes sale el **A** a todos;
  - el **B** queda para el reenvío opcional del jue 29 a quien no abrió;
  - así la variante sirve igual: llega a otra gente, con otro asunto.

---

## 2 · B1N_4 (bienvenida): cómo se rellena

**Domingo 8 en la noche: Jay decide si la clase abre** (mínimo 3–4 alumnos).
- **Si no abre:** B1N_4 **no sale**. Jay escribe 1:1 por WhatsApp a cada inscrito.
- **Si abre:**
  1. Crea el grupo de WhatsApp del curso: *Invitar al grupo mediante enlace → Copiar enlace* (`https://chat.whatsapp.com/…`).
  2. Copia `B1N_4_Bienvenida_9nov.html` a `Brevo/Envios_Basico1_Nov/_privado/`. Esa carpeta está fuera de git, porque los links de Zoom y del grupo no van al repo, que es público.
  3. En la copia, con el Bloc de notas (Ctrl+H, «Reemplazar todo»):
     - `[LINK ZOOM]` → el link de la reunión (`https://…zoom.us/j/…`). Aparece **2 veces**: en la ficha y en el botón.
     - `[LINK GRUPO]` → el link del grupo. Aparece **2 veces**: en la ficha y en el botón blanco.
     - Guarda en UTF-8.
  4. Valida la copia: `node Brevo/Envios_desde_29sep/herramientas/preview.js Brevo/Envios_Basico1_Nov/_privado/B1N_4_Bienvenida_9nov.html`. Tiene que decir **LISTO PARA PEGAR EN BREVO**. La plantilla sin rellenar da 1 FALLA a propósito: «Marcadores sin rellenar».
  5. Pega en Brevo **la copia**, nunca la plantilla, y prográmala para el **lun 9 a las 18:00**, a `02g`.

**Quien pague después de las 18:00 del lunes** (la matrícula cierra a las 23:59):
- Jay lo agrega al grupo;
- y le manda por WhatsApp el link de Zoom y la hora.

---

## 3 · Segmentos nuevos (*CRM › Contacts › Segments › Create a segment*)

- **`B1N · Abrió algo`** (para B1N_3):
  - condición *Marketing › Email › Email opened* → *Email campaigns* → *At least 1 time* → *In the last* **14 days**;
  - el dom 8 a las 12:00 eso cubre B1N_2 (jue 5) y a quien abrió tarde el anuncio;
  - si te quedan **menos de 20 personas**, manda B1N_3 a `01` + `03` (excluyendo `02` y `02g`): es un correo corto y es el último.
- **`B1N · No abrió el anuncio`** (solo para el reenvío opcional):
  - condición de campaña, «no abrió» la campaña `B1N_1 · Anuncio · 27 oct` (según la pantalla: *Email opened* → *Has not* / *Did not open*);
  - más `01 Leads sitio` o `03 Primer contacto`.
  - Si tu Brevo no permite «no abrió», sáltate el reenvío.

---

## 4 · Qué dice cada correo (para revisar rápido)

- **B1N_1 · Anuncio:**
  - Título «Coreano desde cero, con Kiran».
  - Fechas clave: precio hasta el dom 8 · primera clase el mar 10, 20:00.
  - Hora en 6 países.
  - Temario de 8 clases, con el título en coreano de cada una: 가나다라 I · 가나다라 II + 안녕하세요 · 이게 뭐예요? · 우리 엄마예요 · 집이 어디예요? · 학교에 가요 · 방에 침대가 있어요 · 사과를 좋아해요.
  - Romanización solo en las clases 1–2 y proyecto «Yo en coreano».
  - Kiran.
  - Panel con lo que incluye y el precio de lanzamiento (con el normal debajo).
  - Botón «Quiero mi cupo en Básico 1».
  - WhatsApp con el texto ya escrito.
  - 3 recursos gratis: Lector, taller grabado y tu nombre en coreano (`/generador-nombre`).
  - «¿Ya lees 한글?» y «reenvíaselo a un amigo».
- **B1N_2 · Quedan 3 días:**
  - Lo que aprendes en la clase 1, sacado de `Curriculo/Fase2_Basico1/alumnos/S01_Material_Alumno.md`, sin testimonios inventados: 안녕하세요, las 6 vocales base, 나무 · 바다 · 우유, 아이/오이 y 감사합니다.
  - Recuadro «así se lee 나무».
  - Las consonantes dibujan la boca.
  - Sejong, 1443.
  - Teclado coreano en la clase 1.
  - Precio y botón.
- **B1N_3 · Último día:** corto, con el precio «solo hasta hoy», el botón, la ficha del curso y el precio normal desde mañana.
- **B1N_4 · Bienvenida:**
  - Ficha con Zoom y grupo.
  - Botón Zoom y botón del grupo.
  - Hora en 8 países: desde noviembre, EE. UU. Este 18:00 y España 00:00 del miércoles.
  - Qué tener a mano.
  - Teclado coreano en 5 minutos (Android, iPhone, Windows y Mac, más la prueba 아 = D + K).
  - Calentamiento con el Lector.
  - Grabación en 24 h.
  - Cuota 2 por WhatsApp.
  - No da fecha de término.

**Texto de Gmail para los 91:**
- Les recuerda el 20 % que se les ofreció el 14 de octubre, que ahora es el precio de lanzamiento: US$120 / 2 × US$60, hasta el dom 8.
- No trae direcciones.
- Los links al sitio van **sin UTM**, para que se vean limpios en texto plano.

---

## 5 · Validación (26 oct 2026)

`node Brevo/Envios_desde_29sep/herramientas/preview.js <archivo> --asunto "…"`: revisa los links por internet y saca capturas a 700 px y 390 px.

| Archivo | Resultado |
|---|---|
| `B1N_1_Anuncio_27oct.html` (asuntos A y B) | **LISTO PARA PEGAR EN BREVO · 0 avisos** · 33,4 KB · 11 links OK |
| `B1N_2_Recordatorio_5nov.html` | **LISTO · 0 avisos** · 21,5 KB · 8 links OK |
| `B1N_3_Ultimo_Dia_Precio_8nov.html` | **LISTO · 0 avisos** · 16,8 KB · 8 links OK |
| `B1N_4_Bienvenida_9nov.html` (plantilla) | 1 FALLA esperada: «Marcadores sin rellenar: [LINK ZOOM] [LINK GRUPO]» · 0 avisos · 8 links OK |
| `B1N_4` con los 2 links de ejemplo puestos | **LISTO · 0 avisos** |

Ninguno da avisos de «fechas del calendario viejo». En el celular (390 px) nada se sale.

**Revalidado el 26 oct en la noche**, después de las revisiones nativa y de textos: los 4 HTML no cambiaron y dan el mismo resultado (B1N_1, B1N_2 y B1N_3 LISTO · 0 avisos; B1N_4 con la falla esperada de los marcadores). En el texto de Gmail, la hora de España ahora dice «00:00 del miércoles en España» y la de Chile, «Chile, Argentina y Uruguay». `Plan_Basico1_Noviembre_2026.md` §2 y §6 quedaron alineados con este LEEME (lista `02g`, Gmail a los 91 el mar 27 a las 12:00, B1N_1-R opcional el jue 29, segmento `B1N · Abrió algo`, B1N_4 el lun 9 a las 18:00 solo si la clase abre, inscritos del taller importados a `01` en vez de un Gmail aparte).

**`preview.js` se actualizó el 26 oct:**
- ahora acepta también la fórmula «US$120 el curso completo · o 2 cuotas de US$60»;
- y avisa si un correo la usa sin decir hasta cuándo vale (domingo 8 de noviembre).
- Cualquier otro monto en US$ sigue dando FALLA.

**Si cambias un HTML a mano,** guarda en UTF-8 y vuelve a correr `preview.js`.

**Generador** (fuera del repo): `make_b1n_correos.js`, en la carpeta `b1nov/correos/` del scratchpad de la sesión del 26 oct. Los HTML de esta carpeta son la versión válida.
