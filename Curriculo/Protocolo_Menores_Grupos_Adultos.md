# Protocolo · menores de edad en un grupo de adultos

**Academia Seúl · versión 1.0 · lunes 2 de noviembre de 2026**

Este documento es el protocolo que la Fase 1 marcó como riesgo **Alta** en su tabla de decisiones (`Curriculo/Fase1_Arquitectura_Academica.md` §12, decisión 10) y que nunca se escribió, porque hasta hoy no hacía falta: los menores iban a Coreano para Niños y los adultos a la escalera.

**Hoy sí hace falta.** El lunes 2 de noviembre de 2026 Jay decidió que **Básico 1 no tiene edad mínima**: el criterio publicado es «si puede seguir una clase de 60 minutos por Zoom, puede entrar», y a cualquier menor de 18 lo inscribe su padre, madre o tutor. Desde esa decisión, un menor puede estar en la clase de los martes, que tiene **una sola profesora** y **salas de a 2 sin ella dentro**.

Aplica a Básico 1, Básico 2, Conversacional 1, Conversacional 2 y TOPIK II — a toda la escalera de adultos. **No** aplica a Coreano para Niños, que tiene su propio diseño con dos profes y salas por edad (`Curriculo/Fase7_Ninos/00_Diseno_Ninos.md` §D.4).

---

## 1 · Las seis reglas

Las cinco primeras **no son nuevas**: son las reglas de privacidad de menores que Jay ya aprobó para Coreano para Niños. Lo único nuevo es que ahora rigen también en los cursos de adultos. La sexta sí es nueva, y sale del formato de la clase de adultos.

| # | Regla | De dónde sale |
|---|---|---|
| 1 | **Nunca un adulto a solas con un menor**, ni en la sala principal ni en una sala de grupos. | Fase 7 §D.4 y §B0.1; Fase 1 §16.1 |
| 2 | En Zoom, el menor usa **solo su nombre de pila**. Nunca nombre y apellido. | Fase 7 §D.4 («solo nombre de pila») |
| 3 | El **chat de Zoom solo en público**. Nada de mensajes privados entre participantes. | Fase 7 §D.4 |
| 4 | Las **tareas con video donde se le ve la cara** van por privado al WhatsApp de la academia (+56 9 4211 5562), nunca al grupo. Audios y fotos de la hoja sí pueden ir al grupo. | Fase 7 §D.4 |
| 5 | El menor **no dice dirección, colegio ni teléfono** en clase ni en el grupo. | Fase 7 §D.4 |
| 6 | **La sala de grupos del menor es siempre de 3 personas**, nunca de 2. Si el número no da para un trío, Kiran entra a esa sala o esa ronda se hace en la sala principal. | Nueva. La consigna de Básico 1 dice «salas de 2 (alguna de 3), 18 minutos» (`S01_Guia_Profesor.md`, bloque 7, y equivalente en las 8 semanas) |

**Por qué la regla 6 es la que importa.** La clase manda a los alumnos a salas de a 2 durante **18 minutos**, sin la profesora dentro, **las 8 semanas**. Para un alumno adulto eso es práctica entre pares. Para un menor es estar a solas con un adulto desconocido, con cámara, 18 minutos, ocho veces. La consigna ya permite tríos («alguna de 3»), así que la regla no cambia la pedagogía ni cuesta un minuto de clase: solo fija cuál sala es la de tres.

---

## 2 · Lo que Kiran hace, en concreto

**Antes de la clase 1.** Jay le dice a Kiran si hay un menor inscrito, con su nombre de pila y su edad. Nada más: la edad y el nombre completo viven en Formspree, no en el grupo ni en el kit.

**Al armar las salas.** La sala del menor se arma con **3 personas**. Si ese día faltan alumnos y no se puede armar un trío, hay dos salidas, las dos válidas: Kiran entra a la sala del menor y se queda, o esa ronda se hace sin salas, todos en la sala principal. Nunca la tercera opción.

**Al pasar lista.** Si el menor entró a Zoom con nombre y apellido, Kiran se lo cambia desde el panel de participantes (botón derecho → Cambiar nombre) y deja solo el nombre de pila. No hace falta explicarlo delante del grupo.

**Durante la clase.** El chat queda en «Todos» (Zoom → Más → Chat → Participantes pueden chatear con: Todos). Eso ya está en el checklist de la S2; con un menor en la sala es obligatorio desde la S1.

**Si el menor queda solo en la sesión** —se cayeron los demás, llegó antes, se quedó después—: Kiran deja la grabación corriendo y termina la sesión, o espera con la cámara y el micrófono encendidos hasta que llegue alguien más. No hay clase particular improvisada de uno a uno.

**Lo que Kiran NO tiene que hacer:** no es su trabajo verificar edades, ni pedir documentos, ni hablar de pagos con la familia. Eso es de Jay.

---

## 3 · Lo que se le pide al apoderado

**Al inscribir** (ya está en el sitio desde hoy). El formulario de `/nivel-1` tiene una casilla: «Inscribo a un o una menor de 18 años. Dejo mis propios datos de contacto como su padre, madre o tutor/a y autorizo su participación.» Marcarla es el acto de autorización, y queda registrado en el correo de Formspree con el campo `menor_de_edad`. Eso es lo que `app/privacidad/page.tsx` §8 promete y lo que la Ley 21.719 va a pedir que Academia Seúl pueda probar.

**Al confirmar el pago**, Jay le dice al apoderado estas cuatro cosas por WhatsApp, en un solo mensaje:

```
Un par de cosas antes de empezar, porque [nombre] es menor de edad:

1. En Zoom entra solo con su nombre de pila, sin apellido.
2. Las clases se graban y la grabación se comparte con el grupo del
   curso, que son alumnos adultos. Si prefieres que esté con la cámara
   apagada, me dices y no hay ningún problema.
3. El grupo de WhatsApp del curso es de adultos: entras tú, no [nombre].
   Todo lo de la clase te llega a ti.
4. En los trabajos en pareja siempre va a estar en un grupo de tres,
   nunca a solas con otro alumno.

Si algo de esto no te acomoda, lo conversamos.
```

---

## 4 · Lo que falta que decida Jay

Estas cuatro no se pueden resolver desde el material: son reglas de la casa y son suyas.

1. **El grupo de WhatsApp.** Propuesta: entra el apoderado, no el menor — es la regla de Coreano para Niños («el grupo de WhatsApp es solo para apoderados: los niños no están en el grupo»). Alternativa razonable: desde los 16, entran los dos. **[POR CONFIRMAR]**
2. **La grabación.** Hoy la clase se graba en la nube y el link se fija en el grupo. Propuesta: se mantiene igual, se le avisa al apoderado al confirmar el pago (punto 2 del mensaje de arriba) y se le ofrece la cámara apagada. Falta definir **hasta cuándo se guardan** las grabaciones y quién las borra. **[POR CONFIRMAR]**
3. **El certificado.** ¿A nombre del menor o del apoderado? Lo lógico es a nombre del alumno, pero es su regla. **[POR CONFIRMAR]**
4. **Hasta dónde llega «sin edad mínima».** El criterio publicado —60 minutos por Zoom— lo evalúa el apoderado, no nosotros. Falta decidir qué hace Jay si se inscribe alguien de 6 o 7 años: ¿lo acepta igual, o le ofrece la lista de espera de enero y devuelve el pago? Propuesta: lo conversa por WhatsApp antes de confirmar, y si la familia insiste después de escuchar la advertencia, se acepta. **[POR CONFIRMAR]**

---

## 5 · Lo que ya está hecho en el sitio (2 nov 2026)

- `app/nivel-1/page.tsx` — casilla del apoderado, bloque «Datos del apoderado/a» y campo `menor_de_edad` en los dos envíos a Formspree. Antes el bloque existía solo para Coreano para Niños, que está cerrado hasta enero: un apoderado no tenía dónde decir que inscribía a un menor.
- `app/privacidad/page.tsx` §8 — sin el piso de 14 años; cualquier menor de 18 se inscribe por su apoderado.
- `components/Escalera.tsx` y `app/notificarme/page.tsx` — el papá o la mamá ya no termina en la lista de espera de enero.
- `components/FAQ.tsx` — pregunta de edad, con el criterio y la regla del apoderado.

Lo que **no** está hecho y depende de las decisiones de la sección 4: el kit de Kiran (sección nueva de menores), la Guía del Alumno (quién entra al grupo) y `/terminos`, que todavía no dice nada de edad ni de quién contrata.
