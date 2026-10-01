# Plantilla académica de correos · guía corta

Plantilla: `_base_academica.html` (misma carpeta). La anterior, `_base.html` (banda azul, estilo juvenil), queda solo de referencia.
Muestra completa armada con estos componentes: E1 "Los cursos de octubre, en un minuto" (validada: 0 avisos; solo los 2 sellos dan 404 hasta publicar `public/email/`).

**Idea:** carta de una universidad de primer nivel. Papel marfil, membrete centrado con el sello del tigre, títulos en serif navy, filetes finos en vez de cajas de color, versalitas espaciadas para rótulos, mucho aire. El azul #4236F6 es acento (rótulos y links), no relleno.

## 1. Cómo armar un correo nuevo

1. Copia `_base_academica.html`, cambia `<title>`, el preheader (el `div` oculto al inicio del `body`) y `utm_campaign=base` por el código del correo (`e2`, `o1`…).
2. Todo el contenido vive en la columna de 504 px: son filas `<tr>…</tr>` una debajo de otra. Borra los componentes que no uses y pega los de abajo en el orden que necesites.
3. Valida: `node herramientas/preview.js <archivo> --asunto "…"` y mira las PNG de escritorio (700) y celular (390). Hasta que se publiquen los sellos, las 2 FALLA de `/email/sello-*.png` son esperadas.
4. No agregues comentarios HTML (solo los `<!--[if mso]>` de Outlook) ni bloques `<style>`.

## 2. Medidas

| Elemento | Medida |
|---|---|
| Tarjeta | 600 px, borde 1 px #E2E0D9, filete superior navy de 5 px; en el celular pasa a 100 % con 8 px de margen |
| Columna de contenido | 504 px (18 px de margen interior; en un celular de 390 px quedan 336 px) |
| Curso del catálogo | columna de nivel 120 px + columna de contenido 382 px; en el celular se apilan |
| Botón primario | navy, 13 px versalitas, espaciado 2 px, relleno 18 × 28 px (alto 56 px) |
| Botón secundario | blanco con borde navy de 1 px, 12 px versalitas, espaciado 1,5 px, relleno 14 × 18 px (alto 46 px) |
| Ritmo vertical | 12 · 16 · 18 · 28 · 32 · 36 · 40 · 44 px (entre secciones, 40–44) |
| Peso | E1 completa: 61,5 KB (límite de la casa 90 KB; Gmail recorta cerca de 102 KB) |

Tipografía (solo pilas seguras; se ve igual en Gmail y Outlook):

| Uso | Pila | Tamaño / interlínea | Color |
|---|---|---|---|
| Título (h1) | Georgia | 34 / 42, normal | navy |
| Título de sección (h2) | Georgia | 26 / 33 | navy |
| Nombre del curso, cifras | Georgia | 25 / 32 · cifras 40 / 44 | navy |
| Bajadas, notas finas | Georgia cursiva | 15–17 | gris |
| Antetítulo, rótulos | Arial negrita versalitas | 11–12 / 16, espaciado 2–3 px | azul (antetítulo) o gris (rótulo de ficha) |
| Cuerpo | Arial | 16 / 26 (dentro de un curso, 15 / 24) | tinta |
| Pie | Arial | 12–13 | gris |

`SERIF = Georgia,'Times New Roman','Apple SD Gothic Neo','Malgun Gothic',serif`
`SANS = Arial,Helvetica,'Apple SD Gothic Neo','Malgun Gothic',sans-serif`
(Las fuentes coreanas van en la pila para que el hangul no caiga en una fuente fea.)

## 3. Colores

| Token | Hex | Uso | Contraste |
|---|---|---|---|
| navy | #003478 | títulos, filetes, botón primario, horas | 11,9:1 sobre blanco |
| azul | #4236F6 | antetítulos, links subrayados, sello de la firma | 6,8:1 sobre blanco |
| tinta | #2B2F3A | cuerpo | 13,4:1 |
| gris | #5C5F6B | bajadas, rótulos, pie | 6,4:1 (5,7:1 sobre el papel) |
| oro | #E8B84B | **solo** filete corto bajo el título y barra del destacado | 1,8:1: nunca para texto |
| papel | #F4F3EF | fondo exterior | — |
| panel | #F8F7F3 | fondo del panel "incluye" | — |
| línea / fina / borde | #D9DCE3 · #E6E4DE · #E2E0D9 | separadores, ficha, borde de la tarjeta | — |

**Nunca texto rojo ni rosado** (en la cultura coreana se asocia con la muerte). El validador falla si aparece un color rojizo.

## 4. Reglas

- **Un solo botón primario** por correo (navy). Lo demás, secundarios con borde o links.
- **Precio literal y una vez:** "US$150 el curso completo · o 2 cuotas de US$75" (el panel ya lo trae partido en trozos que no se cortan mal en el celular). Nunca "desde" ni "/mes".
- **Nombres de curso de la casa**, sin códigos inventados: Básico 1 (A1.1) · Básico 2 (A1.2) · Conversacional 1 (A2.1) · Conversacional 2 (A2.2) · TOPIK II (B1+) · Coreano para Niños (8–15). La columna de nivel muestra el código MCER (o "8–15 años"); las dos propuestas usaban "KOR 101…", que no se usa porque sería otra nomenclatura (si Jay la quiere, se agrega ahí).
- **Versalitas** solo para rótulos cortos (antetítulo, ficha, botones): máximo 4–5 palabras.
- Hangul dentro de una cursiva: envuélvelo en `<span style="font-style:normal;">` (el coreano en cursiva falsa se ve mal).
- Fechas y horas que no deben partirse: `<span style="white-space:nowrap;">`, pero nunca un trozo de más de ~200 px (en un celular de 320 px se sale).
- Imágenes: solo `https://www.academiaseul.com/…`, con `width`, `height` y `alt`. Sello del membrete navy 56 × 54; sello de la firma azul 38 × 37 (los PNG miden 168 × 162: respeta esa proporción).
- Botones a prueba de Outlook: el color va en la celda (`bgcolor` + `mso-padding-alt`) y el `<a>` lleva el mismo relleno.
- Links de academiaseul.com con `utm_source=brevo&utm_medium=email&utm_campaign=<código>`.
- Si el correo cambia el texto del botón del PDF, conserva `Ver el programa <span style="white-space:nowrap;">en una página (PDF)</span>` tal cual: el plan B del calendario lo reemplaza con Ctrl+H.

## 5. Componentes (copiar y pegar)

### Membrete (va primero, siempre igual)
```html
<tr>
<td align="center" style="padding:40px 0 16px 0;"><img src="https://www.academiaseul.com/email/sello-navy.png" width="56" height="54" alt="Academia Seúl" style="display:block;width:56px;height:54px;border:0;outline:none;text-decoration:none;font-family:Georgia,'Times New Roman','Apple SD Gothic Neo','Malgun Gothic',serif;font-size:13px;line-height:16px;color:#003478;"></td>
</tr>
<tr>
<td align="center">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="264" align="center" style="width:264px;">
<tr>
<td align="center" style="border-top:1px solid #003478;border-bottom:1px solid #003478;padding:10px 0 10px 6px;font-family:Georgia,'Times New Roman','Apple SD Gothic Neo','Malgun Gothic',serif;font-size:15px;line-height:20px;letter-spacing:6px;color:#003478;white-space:nowrap;mso-line-height-rule:exactly;">ACADEMIA&nbsp;SEÚL</td>
</tr>
</table>
</td>
</tr>
<tr>
<td align="center" style="padding:11px 0 0 0;font-family:Georgia,'Times New Roman','Apple SD Gothic Neo','Malgun Gothic',serif;font-size:14px;line-height:20px;font-style:italic;color:#5C5F6B;mso-line-height-rule:exactly;">Escuela de Coreano &middot; Santiago de Chile</td>
</tr>
```

### Portada: antetítulo, título, filete dorado y bajada
```html
<tr>
<td align="center" style="padding:44px 0 0 0;font-family:Arial,Helvetica,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;font-size:12px;line-height:16px;font-weight:bold;letter-spacing:3px;text-transform:uppercase;color:#4236F6;mso-line-height-rule:exactly;">Cohorte &middot; Octubre 2026</td>
</tr>
<tr>
<td align="center" style="padding:14px 0 0 0;"><h1 style="margin:0;text-align:center;font-family:Georgia,'Times New Roman','Apple SD Gothic Neo','Malgun Gothic',serif;font-size:34px;line-height:42px;font-weight:normal;color:#003478;mso-line-height-rule:exactly;">Título del correo, breve y&nbsp;claro</h1></td>
</tr>
<tr>
<td align="center" style="padding:20px 0 18px 0;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="48" align="center" style="width:48px;">
<tr><td bgcolor="#E8B84B" height="2" style="height:2px;line-height:2px;font-size:2px;background-color:#E8B84B;mso-line-height-rule:exactly;">&nbsp;</td></tr>
</table>
</td>
</tr>
<tr>
<td align="center" style="padding:0;font-family:Georgia,'Times New Roman','Apple SD Gothic Neo','Malgun Gothic',serif;font-size:17px;line-height:27px;font-style:italic;color:#5C5F6B;mso-line-height-rule:exactly;"><span style="white-space:nowrap;">8 semanas&nbsp;&middot;</span> <span style="white-space:nowrap;">en vivo por Zoom</span></td>
</tr>
```

### Fechas clave (2 o 3 celdas; lo que se tiene que ver en 10 segundos)
```html
<tr>
<td style="padding:28px 0 36px 0;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-top:1px solid #003478;border-bottom:1px solid #003478;">
<tr>
<td width="50%" valign="top" align="center" style="width:50%;padding:16px 8px 18px 8px;">
<div style="font-family:Arial,Helvetica,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;font-size:11px;line-height:16px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:#5C5F6B;mso-line-height-rule:exactly;">Matrícula</div>
<div style="font-family:Georgia,'Times New Roman','Apple SD Gothic Neo','Malgun Gothic',serif;font-size:18px;line-height:25px;color:#003478;padding-top:6px;mso-line-height-rule:exactly;">hasta el domingo<br>11 de octubre</div>
</td>
<td width="50%" valign="top" align="center" style="width:50%;padding:16px 8px 18px 8px;border-left:1px solid #D9DCE3;">
<div style="font-family:Arial,Helvetica,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;font-size:11px;line-height:16px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:#5C5F6B;mso-line-height-rule:exactly;">Inicio</div>
<div style="font-family:Georgia,'Times New Roman','Apple SD Gothic Neo','Malgun Gothic',serif;font-size:18px;line-height:25px;color:#003478;padding-top:6px;mso-line-height-rule:exactly;">semana del<br>12 de octubre</div>
</td>
</tr>
</table>
</td>
</tr>
```

### Párrafos de cuerpo
```html
<tr>
<td align="left" style="padding:0px 0 0px 0;font-family:Arial,Helvetica,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;font-size:16px;line-height:26px;color:#2B2F3A;mso-line-height-rule:exactly;">
<p style="margin:0 0 16px 0;">¡Hola, {{ contact.FIRSTNAME|default:"chingu" }}! 안녕하세요</p>
<p style="margin:0 0 0px 0;">Una idea por párrafo. Los links van <a href="https://www.academiaseul.com/?utm_source=brevo&utm_medium=email&utm_campaign=CAMPANA" target="_blank" style="color:#4236F6;text-decoration:underline;">subrayados en azul</a>.</p>
</td>
</tr>
```

### Encabezado de sección (antetítulo + h2 + nota + filete navy)
```html
<tr>
<td align="left" style="padding:44px 0 0 0;font-family:Arial,Helvetica,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;font-size:12px;line-height:16px;font-weight:bold;letter-spacing:3px;text-transform:uppercase;color:#4236F6;mso-line-height-rule:exactly;">Elige tu curso &middot; hora de Chile</td>
</tr>
<tr>
<td align="left" style="padding:10px 0 0 0;"><h2 style="margin:0;text-align:left;font-family:Georgia,'Times New Roman','Apple SD Gothic Neo','Malgun Gothic',serif;font-size:26px;line-height:33px;font-weight:normal;color:#003478;mso-line-height-rule:exactly;">Catálogo de cursos</h2></td>
</tr>
<tr>
<td align="left" style="padding:8px 0 0 0;font-family:Arial,Helvetica,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;font-size:13px;line-height:20px;color:#5C5F6B;mso-line-height-rule:exactly;">Nota breve en gris (por ejemplo, husos horarios).</td>
</tr>
<tr>
<td style="padding:18px 0 0 0;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;">
<tr><td bgcolor="#003478" height="1" style="height:1px;line-height:1px;font-size:1px;background-color:#003478;mso-line-height-rule:exactly;">&nbsp;</td></tr>
</table>
</td>
</tr>
```
Sin filete (antes de una tabla con su propia línea): agrega `filete: false`, o sea, borra la última fila.

### Curso del catálogo (con ficha y botones)
Al último curso de la lista quítale el `border-bottom` de la primera celda y pon debajo el filete navy.
```html
<tr>
<td style="padding:28px 0 20px 0;border-bottom:1px solid #D9DCE3;font-size:0;line-height:0;">
<!--[if mso]><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="504"><tr><td width="120" valign="top"><![endif]--><div style="display:inline-block;width:100%;max-width:120px;vertical-align:top;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;">
<tr><td style="padding:3px 12px 0 0;font-family:Georgia,'Times New Roman','Apple SD Gothic Neo','Malgun Gothic',serif;font-size:20px;line-height:26px;color:#003478;white-space:nowrap;mso-line-height-rule:exactly;">A1.1</td></tr>
<tr><td style="padding:2px 12px 12px 0;font-family:Georgia,'Times New Roman','Apple SD Gothic Neo','Malgun Gothic',serif;font-size:14px;line-height:20px;font-style:italic;color:#5C5F6B;mso-line-height-rule:exactly;">Desde cero</td></tr>
</table>
</div><!--[if mso]></td><td width="384" valign="top"><![endif]--><div style="display:inline-block;width:100%;max-width:382px;vertical-align:top;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;">
<tr><td style="font-family:Georgia,'Times New Roman','Apple SD Gothic Neo','Malgun Gothic',serif;font-size:25px;line-height:32px;color:#003478;mso-line-height-rule:exactly;">Básico 1</td></tr>
<tr><td style="padding:2px 0 0 0;font-family:Georgia,'Times New Roman','Apple SD Gothic Neo','Malgun Gothic',serif;font-size:15px;line-height:22px;font-style:italic;color:#5C5F6B;mso-line-height-rule:exactly;">Primeras Palabras · <span style="font-style:normal;">첫 한국어</span></td></tr>
<tr><td style="padding:12px 0 0 0;font-family:Arial,Helvetica,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;font-size:15px;line-height:24px;color:#2B2F3A;mso-line-height-rule:exactly;"><strong style="color:#003478;">Para ti si</strong> nunca has estudiado coreano.</td></tr>
<tr><td style="padding:8px 0 0 0;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0">
<tr><td valign="top" width="24" style="width:24px;font-family:Georgia,'Times New Roman','Apple SD Gothic Neo','Malgun Gothic',serif;font-size:15px;line-height:24px;color:#003478;mso-line-height-rule:exactly;">&mdash;</td><td style="font-family:Arial,Helvetica,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;font-size:15px;line-height:24px;color:#2B2F3A;mso-line-height-rule:exactly;">Logro 1</td></tr>
<tr><td valign="top" width="24" style="width:24px;font-family:Georgia,'Times New Roman','Apple SD Gothic Neo','Malgun Gothic',serif;font-size:15px;line-height:24px;color:#003478;mso-line-height-rule:exactly;">&mdash;</td><td style="font-family:Arial,Helvetica,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;font-size:15px;line-height:24px;color:#2B2F3A;mso-line-height-rule:exactly;">Logro 2</td></tr>
<tr><td valign="top" width="24" style="width:24px;font-family:Georgia,'Times New Roman','Apple SD Gothic Neo','Malgun Gothic',serif;font-size:15px;line-height:24px;color:#003478;mso-line-height-rule:exactly;">&mdash;</td><td style="font-family:Arial,Helvetica,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;font-size:15px;line-height:24px;color:#2B2F3A;mso-line-height-rule:exactly;">Logro 3</td></tr>
</table>
</td></tr>
<tr><td style="padding:16px 0 0 0;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;">
<tr><td valign="top" width="104" style="width:104px;padding:9px 12px 9px 0;border-top:1px solid #E6E4DE;font-family:Arial,Helvetica,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;font-size:11px;line-height:22px;font-weight:bold;letter-spacing:1.2px;text-transform:uppercase;color:#5C5F6B;white-space:nowrap;mso-line-height-rule:exactly;">Horario</td><td valign="top" style="padding:9px 0;border-top:1px solid #E6E4DE;font-family:Arial,Helvetica,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;font-size:15px;line-height:22px;color:#2B2F3A;mso-line-height-rule:exactly;"><span style="font-family:Georgia,'Times New Roman','Apple SD Gothic Neo','Malgun Gothic',serif;font-size:17px;color:#003478;white-space:nowrap;">Mar o jue 20:00</span> <span style="font-size:13px;color:#5C5F6B;white-space:nowrap;">hora de Chile</span></td></tr>
<tr><td valign="top" width="104" style="width:104px;padding:9px 12px 9px 0;border-top:1px solid #E6E4DE;font-family:Arial,Helvetica,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;font-size:11px;line-height:22px;font-weight:bold;letter-spacing:1.2px;text-transform:uppercase;color:#5C5F6B;white-space:nowrap;mso-line-height-rule:exactly;">Docente</td><td valign="top" style="padding:9px 0;border-top:1px solid #E6E4DE;font-family:Arial,Helvetica,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;font-size:15px;line-height:22px;color:#2B2F3A;mso-line-height-rule:exactly;">Kiran</td></tr>
<tr><td valign="top" width="104" style="width:104px;padding:9px 12px 9px 0;border-top:1px solid #E6E4DE;border-bottom:1px solid #E6E4DE;font-family:Arial,Helvetica,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;font-size:11px;line-height:22px;font-weight:bold;letter-spacing:1.2px;text-transform:uppercase;color:#5C5F6B;white-space:nowrap;mso-line-height-rule:exactly;">1.ª clase</td><td valign="top" style="padding:9px 0;border-top:1px solid #E6E4DE;border-bottom:1px solid #E6E4DE;font-family:Arial,Helvetica,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;font-size:15px;line-height:22px;color:#2B2F3A;mso-line-height-rule:exactly;"><span style="white-space:nowrap;">mar 13</span> o <span style="white-space:nowrap;">jue 15 de octubre</span></td></tr>
</table>
</td></tr>
<tr><td style="padding:12px 0 0 0;font-family:Arial,Helvetica,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;font-size:14px;line-height:22px;color:#5C5F6B;mso-line-height-rule:exactly;">Nota opcional en gris (borra esta fila si no hace falta).</td></tr>
<tr>
<td style="padding:18px 0 0 0;font-size:0;line-height:0;">
<!--[if mso]><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top" style="padding:0 10px 10px 0;"><![endif]--><div style="display:inline-block;vertical-align:top;padding:0 10px 10px 0;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0">
<tr>
<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;border:1px solid #003478;mso-padding-alt:14px 18px;"><a href="https://www.academiaseul.com/nivel-1?clase=a11-martes&utm_source=brevo&utm_medium=email&utm_campaign=CAMPANA" target="_blank" style="display:inline-block;padding:14px 18px;font-family:Arial,Helvetica,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;font-size:12px;line-height:16px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;color:#003478;text-decoration:none;text-align:center;mso-line-height-rule:exactly;">Elegir martes</a></td>
</tr>
</table>
</div><!--[if mso]></td><td valign="top" style="padding:0 10px 10px 0;"><![endif]--><div style="display:inline-block;vertical-align:top;padding:0 10px 10px 0;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0">
<tr>
<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;border:1px solid #003478;mso-padding-alt:14px 18px;"><a href="https://www.academiaseul.com/nivel-1?clase=a11-jueves&utm_source=brevo&utm_medium=email&utm_campaign=CAMPANA" target="_blank" style="display:inline-block;padding:14px 18px;font-family:Arial,Helvetica,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;font-size:12px;line-height:16px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;color:#003478;text-decoration:none;text-align:center;mso-line-height-rule:exactly;">Elegir jueves</a></td>
</tr>
</table>
</div><!--[if mso]></td></tr></table><![endif]-->
</td>
</tr>
</table>
</div><!--[if mso]></td></tr></table><![endif]-->
</td>
</tr>
```

### Ficha suelta (registro: rótulo + dato), por ejemplo para un recordatorio de clase
```html
<tr>
<td style="padding:16px 0 0 0;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;">
<tr><td valign="top" width="104" style="width:104px;padding:9px 12px 9px 0;border-top:1px solid #E6E4DE;font-family:Arial,Helvetica,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;font-size:11px;line-height:22px;font-weight:bold;letter-spacing:1.2px;text-transform:uppercase;color:#5C5F6B;white-space:nowrap;mso-line-height-rule:exactly;">Curso</td><td valign="top" style="padding:9px 0;border-top:1px solid #E6E4DE;font-family:Arial,Helvetica,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;font-size:15px;line-height:22px;color:#2B2F3A;mso-line-height-rule:exactly;">Básico 1 (A1.1)</td></tr>
<tr><td valign="top" width="104" style="width:104px;padding:9px 12px 9px 0;border-top:1px solid #E6E4DE;font-family:Arial,Helvetica,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;font-size:11px;line-height:22px;font-weight:bold;letter-spacing:1.2px;text-transform:uppercase;color:#5C5F6B;white-space:nowrap;mso-line-height-rule:exactly;">Horario</td><td valign="top" style="padding:9px 0;border-top:1px solid #E6E4DE;font-family:Arial,Helvetica,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;font-size:15px;line-height:22px;color:#2B2F3A;mso-line-height-rule:exactly;"><span style="font-family:Georgia,'Times New Roman','Apple SD Gothic Neo','Malgun Gothic',serif;font-size:17px;color:#003478;white-space:nowrap;">Mar 20:00</span> <span style="font-size:13px;color:#5C5F6B;white-space:nowrap;">hora de Chile</span></td></tr>
<tr><td valign="top" width="104" style="width:104px;padding:9px 12px 9px 0;border-top:1px solid #E6E4DE;border-bottom:1px solid #E6E4DE;font-family:Arial,Helvetica,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;font-size:11px;line-height:22px;font-weight:bold;letter-spacing:1.2px;text-transform:uppercase;color:#5C5F6B;white-space:nowrap;mso-line-height-rule:exactly;">Zoom</td><td valign="top" style="padding:9px 0;border-top:1px solid #E6E4DE;border-bottom:1px solid #E6E4DE;font-family:Arial,Helvetica,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;font-size:15px;line-height:22px;color:#2B2F3A;mso-line-height-rule:exactly;"><a href="https://www.academiaseul.com/" target="_blank" style="color:#4236F6;text-decoration:underline;">Entrar a la clase</a></td></tr>
</table>
</td>
</tr>
```

### Botón primario (uno por correo)
```html
<tr>
<td align="center" style="padding:32px 0 0px 0;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
<tr>
<td align="center" bgcolor="#003478" style="background-color:#003478;border:1px solid #003478;mso-padding-alt:18px 28px;"><a href="https://www.academiaseul.com/nivel-1?utm_source=brevo&utm_medium=email&utm_campaign=CAMPANA" target="_blank" style="display:inline-block;padding:18px 28px;font-family:Arial,Helvetica,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;font-size:13px;line-height:18px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:#FFFFFF;text-decoration:none;text-align:center;mso-line-height-rule:exactly;">Elegir mi curso e inscribirme</a></td>
</tr>
</table>
</td>
</tr>
```

### Línea bajo el botón (por ejemplo, la invitación a reunirse con Jay en el correo a profesores)
```html
<tr>
<td align="center" style="padding:16px 0 0 0;font-family:Georgia,'Times New Roman','Apple SD Gothic Neo','Malgun Gothic',serif;font-size:16px;line-height:24px;font-style:italic;color:#5C5F6B;mso-line-height-rule:exactly;">¿Quieres saber más? <a href="https://wa.me/56942115562" target="_blank" style="color:#4236F6;text-decoration:underline;">Coordina una reunión breve con Jay</a>.</td>
</tr>
```

### Botones secundarios (uno o dos; en un celular angosto el segundo baja solo)
```html
<tr>
<td style="padding:18px 0 0 0;font-size:0;line-height:0;">
<!--[if mso]><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top" style="padding:0 10px 10px 0;"><![endif]--><div style="display:inline-block;vertical-align:top;padding:0 10px 10px 0;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0">
<tr>
<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;border:1px solid #003478;mso-padding-alt:14px 18px;"><a href="https://www.academiaseul.com/nivel-1?clase=a11-martes&utm_source=brevo&utm_medium=email&utm_campaign=CAMPANA" target="_blank" style="display:inline-block;padding:14px 18px;font-family:Arial,Helvetica,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;font-size:12px;line-height:16px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;color:#003478;text-decoration:none;text-align:center;mso-line-height-rule:exactly;">Elegir martes</a></td>
</tr>
</table>
</div><!--[if mso]></td><td valign="top" style="padding:0 10px 10px 0;"><![endif]--><div style="display:inline-block;vertical-align:top;padding:0 10px 10px 0;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0">
<tr>
<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;border:1px solid #003478;mso-padding-alt:14px 18px;"><a href="https://www.academiaseul.com/nivel-1?clase=a11-jueves&utm_source=brevo&utm_medium=email&utm_campaign=CAMPANA" target="_blank" style="display:inline-block;padding:14px 18px;font-family:Arial,Helvetica,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;font-size:12px;line-height:16px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;color:#003478;text-decoration:none;text-align:center;mso-line-height-rule:exactly;">Elegir jueves</a></td>
</tr>
</table>
</div><!--[if mso]></td></tr></table><![endif]-->
</td>
</tr>
```
Un secundario centrado y suelto: pon el `<table>` del botón dentro de `<tr><td align="center" style="padding:12px 0 0 0;">…</td></tr>` y agrégale `align="center"`.

### Panel "Todos los cursos incluyen" (cifras + lista + precio)
```html
<tr>
<td style="padding:40px 0 0 0;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#F8F7F3" style="width:100%;background-color:#F8F7F3;border-top:1px solid #003478;border-bottom:1px solid #003478;">
<tr>
<td style="padding:28px 20px 30px 20px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;">
<tr><td style="font-family:Arial,Helvetica,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;font-size:12px;line-height:16px;font-weight:bold;letter-spacing:3px;text-transform:uppercase;color:#003478;mso-line-height-rule:exactly;">Todos los cursos incluyen</td></tr>
<tr><td style="padding:4px 0 18px 0;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;">
<tr>
<td width="33%" valign="top" style="width:33%;padding:14px 10px 0 0;">
<div style="font-family:Georgia,'Times New Roman','Apple SD Gothic Neo','Malgun Gothic',serif;font-size:40px;line-height:44px;color:#003478;white-space:nowrap;mso-line-height-rule:exactly;">8</div>
<div style="font-family:Arial,Helvetica,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;font-size:13px;line-height:18px;color:#5C5F6B;padding-top:4px;mso-line-height-rule:exactly;">semanas de curso</div>
</td>
<td width="33%" valign="top" style="width:33%;padding:14px 10px 0 0;">
<div style="font-family:Georgia,'Times New Roman','Apple SD Gothic Neo','Malgun Gothic',serif;font-size:40px;line-height:44px;color:#003478;white-space:nowrap;mso-line-height-rule:exactly;">60</div>
<div style="font-family:Arial,Helvetica,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;font-size:13px;line-height:18px;color:#5C5F6B;padding-top:4px;mso-line-height-rule:exactly;">minutos por clase</div>
</td>
<td width="33%" valign="top" style="width:33%;padding:14px 10px 0 0;">
<div style="font-family:Georgia,'Times New Roman','Apple SD Gothic Neo','Malgun Gothic',serif;font-size:40px;line-height:44px;color:#003478;white-space:nowrap;mso-line-height-rule:exactly;">15</div>
<div style="font-family:Arial,Helvetica,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;font-size:13px;line-height:18px;color:#5C5F6B;padding-top:4px;mso-line-height-rule:exactly;">personas máx. por grupo</div>
</td>
</tr>
</table>
</td></tr>
<tr><td>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;">
<tr><td bgcolor="#D9DCE3" height="1" style="height:1px;line-height:1px;font-size:1px;background-color:#D9DCE3;mso-line-height-rule:exactly;">&nbsp;</td></tr>
</table>
</td></tr>
<tr><td style="padding:16px 0 0 0;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0">
<tr><td valign="top" width="24" style="width:24px;font-family:Georgia,'Times New Roman','Apple SD Gothic Neo','Malgun Gothic',serif;font-size:15px;line-height:24px;color:#003478;mso-line-height-rule:exactly;">&mdash;</td><td style="font-family:Arial,Helvetica,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;font-size:15px;line-height:24px;color:#2B2F3A;mso-line-height-rule:exactly;">Grabación de cada clase</td></tr>
<tr><td valign="top" width="24" style="width:24px;font-family:Georgia,'Times New Roman','Apple SD Gothic Neo','Malgun Gothic',serif;font-size:15px;line-height:24px;color:#003478;mso-line-height-rule:exactly;">&mdash;</td><td style="font-family:Arial,Helvetica,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;font-size:15px;line-height:24px;color:#2B2F3A;mso-line-height-rule:exactly;">Material, slides y tareas corregidas</td></tr>
<tr><td valign="top" width="24" style="width:24px;font-family:Georgia,'Times New Roman','Apple SD Gothic Neo','Malgun Gothic',serif;font-size:15px;line-height:24px;color:#003478;mso-line-height-rule:exactly;">&mdash;</td><td style="font-family:Arial,Helvetica,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;font-size:15px;line-height:24px;color:#2B2F3A;mso-line-height-rule:exactly;">Certificado de finalización</td></tr>
</table>
</td></tr>

<tr><td style="padding:22px 0 0 0;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;">
<tr><td bgcolor="#D9DCE3" height="1" style="height:1px;line-height:1px;font-size:1px;background-color:#D9DCE3;mso-line-height-rule:exactly;">&nbsp;</td></tr>
</table>
</td></tr>
<tr><td align="center" style="padding:22px 0 0 0;font-family:Georgia,'Times New Roman','Apple SD Gothic Neo','Malgun Gothic',serif;font-size:21px;line-height:30px;color:#003478;mso-line-height-rule:exactly;"><span style="white-space:nowrap;">US$150</span> el curso <span style="white-space:nowrap;">completo ·</span> <span style="white-space:nowrap;">o 2 cuotas de US$75</span></td></tr>
<tr><td align="center" style="padding:6px 0 0 0;font-family:Arial,Helvetica,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;font-size:14px;line-height:22px;color:#5C5F6B;mso-line-height-rule:exactly;">Puedes pagar por transferencia en Chile, Mercado Pago o PayPal.</td></tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
```

### Guía de nivel (situación → curso)
```html
<tr>
<td style="padding:14px 0 0 0;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;border-top:1px solid #D9DCE3;">
<tr>
<td style="padding:11px 10px 11px 0;border-bottom:1px solid #D9DCE3;font-family:Arial,Helvetica,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;font-size:15px;line-height:22px;color:#2B2F3A;mso-line-height-rule:exactly;">No leo Hangul</td>
<td align="right" valign="top" style="padding:11px 0;border-bottom:1px solid #D9DCE3;font-family:Georgia,'Times New Roman','Apple SD Gothic Neo','Malgun Gothic',serif;font-size:16px;line-height:22px;font-style:italic;color:#003478;white-space:nowrap;mso-line-height-rule:exactly;">&rarr; Básico 1</td>
</tr>
<tr>
<td style="padding:11px 10px 11px 0;border-bottom:1px solid #D9DCE3;font-family:Arial,Helvetica,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;font-size:15px;line-height:22px;color:#2B2F3A;mso-line-height-rule:exactly;">Leo y me presento, o hice el Nivel 1 de julio</td>
<td align="right" valign="top" style="padding:11px 0;border-bottom:1px solid #D9DCE3;font-family:Georgia,'Times New Roman','Apple SD Gothic Neo','Malgun Gothic',serif;font-size:16px;line-height:22px;font-style:italic;color:#003478;white-space:nowrap;mso-line-height-rule:exactly;">&rarr; Básico 2</td>
</tr>
</table>
</td>
</tr>
```

### Separadores
Navy (cierra el catálogo), doble (entre grandes secciones) y fino (entre bloques menores):
```html
<tr>
<td style="padding:0px 0 0px 0;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;">
<tr><td bgcolor="#003478" height="1" style="height:1px;line-height:1px;font-size:1px;background-color:#003478;mso-line-height-rule:exactly;">&nbsp;</td></tr>
</table>
</td>
</tr>
<tr>
<td style="padding:44px 0 36px 0;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;">
<tr><td height="2" style="height:2px;line-height:2px;font-size:2px;border-top:1px solid #003478;border-bottom:1px solid #003478;mso-line-height-rule:exactly;">&nbsp;</td></tr>
</table>
</td>
</tr>
<tr>
<td style="padding:32px 0 32px 0;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;">
<tr><td bgcolor="#D9DCE3" height="1" style="height:1px;line-height:1px;font-size:1px;background-color:#D9DCE3;mso-line-height-rule:exactly;">&nbsp;</td></tr>
</table>
</td>
</tr>
```

### Destacado (barra dorada + serif cursiva): fecha límite o cita
```html
<tr>
<td style="padding:0px 0 0px 0;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;">
<tr>
<td width="3" bgcolor="#E8B84B" style="width:3px;background-color:#E8B84B;font-size:1px;line-height:1px;">&nbsp;</td>
<td style="padding:4px 0 4px 20px;font-family:Georgia,'Times New Roman','Apple SD Gothic Neo','Malgun Gothic',serif;font-size:20px;line-height:30px;font-style:italic;color:#003478;mso-line-height-rule:exactly;">La matrícula está abierta hasta el <span style="font-style:normal;font-weight:bold;">domingo 11 de octubre</span> (o antes, si se llenan los cupos).</td>
</tr>
</table>
</td>
</tr>
```

### Firma de Jay (va última dentro de la tarjeta)
```html
<tr>
<td align="left" style="padding:0 0 48px 0;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0">
<tr>
<td valign="middle" style="padding:0 16px 0 0;"><img src="https://www.academiaseul.com/email/sello-azul.png" width="38" height="37" alt="" style="display:block;width:38px;height:37px;border:0;outline:none;text-decoration:none;"></td>
<td valign="middle" style="border-left:1px solid #D9DCE3;padding:2px 0 2px 16px;">
<div style="font-family:Georgia,'Times New Roman','Apple SD Gothic Neo','Malgun Gothic',serif;font-size:19px;line-height:26px;color:#003478;mso-line-height-rule:exactly;">Jay Kim &middot; 김재희</div>
<div style="font-family:Arial,Helvetica,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;font-size:12px;line-height:18px;letter-spacing:1.5px;text-transform:uppercase;color:#5C5F6B;mso-line-height-rule:exactly;">Fundador de Academia Seúl</div>
</td>
</tr>
</table>
</td>
</tr>
```

El pie (wordmark, WhatsApp, web, Instagram, baja y "ver en el navegador") ya viene en la plantilla, fuera de la tarjeta: no lo toques salvo el `utm_campaign`.
