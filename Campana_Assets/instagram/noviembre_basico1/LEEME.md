# Diseños · campaña Básico 1 de noviembre 2026 (Instagram y TikTok)

**Qué se promueve:** solo Básico 1 (A1.1) · coreano desde cero · con Kiran (기란). Martes 20:00, hora de Chile. Son 8 martes desde el **martes 10 de noviembre**.
**Precio:**
- Precio de lanzamiento: **US$120 el curso completo · o 2 cuotas de US$60**, hasta el **domingo 8 de noviembre a las 23:59** (Chile). El precio normal aparece tachado (US$150), en gris.
- Desde el lunes 9: **US$150 el curso completo · o 2 cuotas de US$75**.
- Matrícula hasta el **lunes 9 de noviembre a las 23:59**.

Son decisiones de Jay del lunes 26 de octubre.

**Generador:** `Lanzamiento_Octubre_2026/fuente/make_disenos_basico1_nov.js`. Usa el mismo sistema visual que los diseños de octubre: papel, tinta, franja azul `#4236F6`, sello del tigre v2 y acentos oro. Las portadas y los cierres van en azul. No hay rojo, rosado, coral ni magenta.

```
NODE_PATH=<scratchpad>/node_modules node Lanzamiento_Octubre_2026/fuente/make_disenos_basico1_nov.js        # todo
NODE_PATH=<scratchpad>/node_modules node Lanzamiento_Octubre_2026/fuente/make_disenos_basico1_nov.js b1n_1  # solo los que contengan "b1n_1"
```

El generador revisa cada PNG al terminar:
- fuentes cargadas;
- textos dentro de márgenes, de su caja y de la zona segura;
- que no haya solapes;
- que no haya píxeles rojizos ni rosados (la foto de Kiran no se cuenta).

Las historias dejan libres los 262 px de arriba y los 352 px de abajo.

## Archivos y día de publicación

Los días siguen la tabla de `Plan_Basico1_Noviembre_2026.md` §2. Ese plan manda: las horas, los captions y los textos encima de cada historia están ahí.

### Feed (1080×1350)

**`b1n_01_anuncio_feed.png`** · anuncio
- **Cuándo:** mar 27 a las 19:30, en colaboración entre @academiaseul y @jaychingu.oficial. Se fija.
- **Qué dice:**
  - 첫 한국어 · «Coreano desde cero» · Básico 1 con Kiran;
  - empieza el martes 10 de noviembre · 8 martes · 20:00 hora de Chile · 60 min por Zoom;
  - incluye certificado, grabación de cada clase, material de cada semana y grupo de WhatsApp;
  - precio de lanzamiento;
  - academiaseul.com/inscribete o WhatsApp.

**`b1n_02_carrusel_1.png` … `b1n_02_carrusel_6.png`** · carrusel «Qué vas a lograr en 8 clases»
- **Cuándo:** jue 29 a las 19:30, en colaboración. Va como segundo fijado.
- **Láminas:**
  1. Portada azul: la escalera 아 → 저는 마리아예요. → 이게 뭐예요? → 불고기를 정말 좋아해요!
  2. Clases 1–2: lees 한글 y te presentas. Romanización en gris, solo aquí.
  3. Clases 3–4: preguntas qué es algo y presentas a tu familia.
  4. Clases 5–6: dices dónde están las cosas y adónde vas.
  5. Clases 7–8: describes tu pieza y dices lo que te gusta. Proyecto final «Yo en coreano».
  6. Cierre azul: fecha, lo que incluye, precio de lanzamiento y URL.
- **Ejemplos en coreano:** las frases «Después de esta clase puedo decir…» y las frases clave (B.12) de `Curriculo/Fase2_Basico1/00_Diseno_Basico1.md`. El libro que se nombra es *한글학교 한국어 1*.

**`b1n_03_kiran_feed.png`** · «Tu profe de Básico 1»
- **Cuándo:** lun 2 a las 19:30, en colaboración, y con Kiran si tiene cuenta.
- **Foto:** un recorte de `octubre/reels/kiran/Reel_Kiran_portada.png`, el cuadro del reel ya publicado.
- **Bio:** la de `lib/nivel1.ts`, profesora coreana criada en Argentina, bilingüe.
- **Saludo:** 안녕하세요! 저는 기란이에요.

### Historias (1080×1920)

| Archivo | Cuándo (plan §2) | Notas |
|---|---|---|
| `b1n_10_anuncio_story.png` | mar 27 a las 12:30 y en el estado de WhatsApp. En el destacado desde el mar 27. También sirve de placa de cierre del Reel C | Trae la hora en México, Colombia y Perú, Argentina, EE.UU. (Este) y España. Es la misma de `TZ_ROWS` en `lib/nivel1.ts`, ya con EE.UU. y España en horario de invierno |
| `b1n_11_precio_story.png` | mié 28 a las 12:30 · mié 4 a las 18:00 · sáb 7 a las 12:30, con «Mañana es el último día ⏳» encima | US$120 en grande y US$150 tachado. Trae los pesos chilenos ($120.000 o 2 × $60.000) y el precio que rige desde el lun 9 |
| `b1n_12_quedan_7_story.png` | dom 1 a las 12:30 | Quedan 7 días de precio de lanzamiento, hasta el domingo 8 a las 23:59 |
| `b1n_13_quedan_3_story.png` | jue 5 a las 12:30 y en el estado de WhatsApp | Igual que la anterior, con 3 días |
| `b1n_14_ultimo_dia_precio_story.png` | dom 8 a las 10:00, a las 19:00 (con «Últimas horas ⏳») y a las 22:30 (con «Hora y media ⏳»), y en el estado | Va en oscuro. Dice «Desde mañana: US$150 el curso completo · o 2 cuotas de US$75». Abajo: «Inscríbete en academiaseul.com/inscribete · o por WhatsApp» (sin «link en la bio» ni flecha, porque también va al estado de WhatsApp) |
| `b1n_15_ultimas_horas_story.png` | lun 9 a las 12:30 y a las 21:00 (con «Quedan 3 horas») | Ya trae el **precio normal** (US$150 · o 2 × US$75). Dice «Mañana empezamos: martes 10 · 20:00». Mismo pie que `b1n_14` |
| `b1n_16_empezamos_story.png` | mar 10 a las 10:00, sin link. Desde ese día va en el destacado | Dice 시작합니다 y HOY EMPEZAMOS. Trae las horas por país y la clase 1: 아 어 오 우 으 이 |
| `b1n_17_trae_un_chingu_story.png` | mié 28 a las 22:05, al grupo de Básico 2 (mensaje §5.3), para que la suban ellos | **Solo para los alumnos de Básico 2.** La dice quien la comparte: «Yo ya estudio coreano en Academia Seúl… ¿Y tú, te animas?». Abajo trae «Etiqueta a tu chingu ↓». 친구 es palabra de la clase 4. **No va en las cuentas de la academia ni de Jay** (ahí la frase sería falsa) |
| `b1n_18_trae_un_chingu_cuentas_story.png` | vie 30 a las 12:30 · vie 6 a las 20:00, en @academiaseul y @jaychingu.oficial. También para Kiran y los ex-alumnos de julio (§5.8) | La misma pieza sin primera persona del alumno: «¿Tienes un chingu que siempre quiso aprender coreano? · Aprendan juntos». Abajo: «Mándasela a tu chingu ↓» |

### TikTok (1080×1920)

**`b1n_20_tiktok_portada.png`** · portada del TikTok en modo foto
- **Cuándo:** mié 28 a las 19:45, seguida de `b1n_02_carrusel_2…6`.
- **Formato:**
  - todo va centrado entre y≈430 y y≈1410;
  - no lo tapan el recorte 3:4 de la grilla del perfil, los botones de la derecha ni el texto de abajo.

## Reel de Kiran (fuera de esta carpeta)

Los archivos van en `Campana_Assets/instagram/octubre/reels/kiran/`. Los hace `Lanzamiento_Octubre_2026/fuente/make_reel_kiran.js`, que se ejecuta desde una copia en el scratchpad. Con `node make_reel_kiran.js 10nov` salen solo estas dos variantes, sin el video. Los archivos de octubre no se tocan.

- **`cierre_kiran_10nov.png`:** cierre de 1,5 s sobre azul. Dice:
  - Básico 1 con Kiran;
  - empieza el martes 10 de noviembre · 8 martes · 20:00 hora de Chile;
  - precio de lanzamiento hasta el domingo 8 de noviembre;
  - academiaseul.com/inscribete.

  Es el cierre del Reel C en el plan (§4), porque mantiene el estilo del reel original; `b1n_10` queda como alternativa.
- **`rotulo_3_horario_10nov.png`:** rótulo transparente para CapCut. Va en lugar de `rotulo_3_horario.png`, que decía «MARTES o JUEVES». Dice «MARTES · 20:00» y, debajo, «hora de Chile · 8 martes desde el 10 de noviembre · Zoom».

## Destacado INSCRÍBETE (fuera de esta carpeta)

Los archivos van en `Campana_Assets/instagram/octubre/destacado_inscribete/`. Se regeneraron con `make_destacado_inscribete.js` para Básico 1 del martes 10 de noviembre. La portada no cambió.

1. **`1_paso1_elige_tu_clase.png`:** paso 1, tu clase. Básico 1 · Kiran · martes 20:00 (Chile) · empieza el martes 10 de noviembre · 8 martes de 60 min.
2. **`2_pasos2y3_datos_y_pago.png`:** «paga en la web o coordina por WhatsApp». El grupo de WhatsApp y el Zoom llegan antes de la primera clase.
3. **`3_como_pago.png`:** precio de lanzamiento con US$150 tachado. Dice que el lanzamiento se coordina por WhatsApp, porque los links de pago que existen cobran US$150.
4. **`4_matricula_lunes_9.png`:** la matrícula cierra el lunes 9 de noviembre a las 23:59 · empezamos el martes 10 · «¿Dudas? Escríbenos INSCRIBIRME por DM» (sin emoji: el 🐯 salía naranjo; el sello del tigre ya va arriba). Por eso la respuesta automática de INSCRIBIRME se cambia, no se apaga (plan §1-g).

Para rehacer solo una lámina: `node make_destacado_inscribete.js 4_` (la portada solo se rehace sin filtro).

La lámina vieja `4_cierre_domingo_18.png` quedó en `_historico_octubre/`.

## Hoja de una página (fuera de esta carpeta)

`Curriculo/publico/Hoja_Basico1_Noviembre_2026.png` (para WhatsApp) y `.pdf` (para correo, con links y QR a `?clase=a11-martes`). Generador `Curriculo/fuente/make_hoja_basico1_nov.js`. Es lo que se manda cuando alguien pide el programa o el precio (plan §2 y §5.5). La hoja de octubre (`Hoja_Resumen_Cursos_Octubre_2026`) no se usa en esta campaña.

## Después del domingo 8 a las 23:59

Estas piezas dicen «precio de lanzamiento». Desde el lunes 9 no se vuelven a publicar:
- `b1n_01`, `b1n_02_carrusel_6`, `b1n_03` y `b1n_10` a `b1n_14`;
- `b1n_17` y `b1n_18`;
- `cierre_kiran_10nov`;
- la lámina 3 del destacado.

El plan ya dice que el lun 9 se sacan `b1n_10` y `b1n_11` del destacado. Las láminas 1 a 5 del carrusel no traen precio y siguen sirviendo.

En lo público no va la fecha de término: se dice «8 martes desde el 10 de noviembre». El tema del martes 8 de diciembre, que es feriado en Chile, sigue [POR CONFIRMAR] con Jay y no aparece en ninguna pieza.
