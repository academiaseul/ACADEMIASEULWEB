# Revisión nativa · 호랑이의 모험, capítulo 1

Fecha: 2 de noviembre de 2026. La hizo un revisor adversarial con el perfil de hablante nativo y profesor de coreano. Revisó el coreano nuevo de `public/aventura/mundo.json` (diálogos, tienda, letreros, info) y los textos fijos de `public/aventura/juego.js`. Las 122 preguntas de los duelos vienen del material de Tigre 100, que ya pasó su propia revisión el 8 oct, y no se volvieron a revisar. **Falta la revisión de Jay**, que tiene la última palabra.

## Sin errores
- **Coreano:** ortografía, espaciado, puntuación y nivel de habla de todas las frases, incluidas 「저는 하나예요. 반갑습니다!」, 어서 오세요, 안녕히 가세요, 뚝딱, 아이고, 멍멍, y 시작이 반이다 en forma -다, que es como se citan los dichos.
- **예요/이에요:** bien en todos los casos.
  - Con consonante final, 이에요: 김밥, 물, 연필, 우산, 도윤, 사람.
  - Con vocal final, 예요: 우유, 부채, 하나, 마테오, 발렌티나.
- **Datos:**
  - 1443 y 1446.
  - La placa 光化門, en 한자 desde 2010.
  - El 청계천 reabierto en 2005.
  - El café helado en invierno (얼죽아) y la carne que se asa en la mesa.
  - Los precios del 편의점.
- **Colores:** no hay texto rojo ni color rojo o rosado.

## Corregido el mismo día (obligatorio)
1. **La explicación de la tienda** decía «김밥이에요. significa «es rollo de arroz y algas»». Ahora cada objeto tiene `esUn` («un lápiz», «un paraguas»…) y el texto dice: «김밥이에요» significa «Es un rollo de arroz y algas»: describe, no pide.
2. **La despedida:** 안녕히 = bien, en paz · 계세요 = quédese · 가세요 = váyase. Antes se le daba todo el significado al verbo solo. Además, las glosas de 안녕히 계세요 ahora son iguales en todo el juego: «Adiós (a quien se queda)».
3. **안녕 frente a 안녕하세요.** Es el error típico del hispanohablante: como 안녕 suena a «hola», lo usa con profes y adultos. Ahora:
   - 서아 «te ve como a otro niño».
   - El juego aclara «안녕 es para niños y amigos de tu edad. A un adulto, siempre 안녕하세요».
   - 하나 explica que 안녕하세요 es el saludo respetuoso.

## Mejoras aplicadas
- **할머니:** se agregó la diferencia entre 고마워요 y 감사합니다.
- **콩이:** «En coreano, el «guau, guau» se escribe 멍멍».
- **뚝딱:** el golpe del 방망이 mágico; en los cuentos, «금 나와라, 뚝딱!» y aparece oro.
- **Estatua:** «el gran rey Sejong», y el 한글 «entonces se llamaba 훈민정음».
- **Placa:** se lee de derecha a izquierda.
- **청계천:** «tapado por una avenida y una autopista elevada» (en Chile, «carretera» es una ruta entre ciudades).
- **Subtítulos:** 멕시코 사람이에요 = «Soy mexicano.» · 칠레 사람이에요 = «Soy chilena.». Así se ve que 사람 sirve para la nacionalidad.
- **마테오:** «가 lleva muy poco aire» (antes decía «es suave»).
- **Tienda:** una línea de cultura explica que en un 편의점 real tomas el producto y lo llevas a la caja; 주세요 se usa en el mercado, en un café o para lo que está detrás del mostrador.

## Agregado el 3 nov 2026 (sin revisión nativa todavía)
- **황금 도깨비:** nombre del 도깨비 dorado del repaso diario. Es la única palabra coreana nueva de las mejoras del 3 nov.
- Los 28 clips nuevos son de SunHi. Conviene escuchar 「뚝딱」, 「아이고」 y 「네, 여기 있어요」: la voz sintética no siempre da con la intención.

## Quedan para Jay (no se tocaron)
- **할머니:** una abuela a un joven diría más bien 고마워 o 고마워라; se dejó 고마워요 por ser A1.
- **점원:** en el trato de tienda es más típico 「여기 있습니다」; se dejó 「네, 여기 있어요」.
- **El 부채 en un 편의점 en otoño** es raro (en verano venden 손선풍기). Se dejó como objeto de juego.
- **El sprite del 도깨비 lleva un cuerno.** Los folcloristas asocian el aspecto de oni japonés (cuernos y maza con púas) a la época colonial. El garrote liso está bien; el cuerno se puede quitar.
- **Regla para el futuro:** nunca usar 「X(이)요」 como distractor de 「X 주세요」, porque 「김밥이요」 sí es una forma real de pedir.

## La lección de 김재희 선생님 (23 nov 2026)
Revisor adversarial con el mismo perfil (nativo, profesor de coreano para hispanohablantes, 훈민정음 해례본). Revisó `mundo.json` → `leccion` y el NPC `hunjang`, los cortes de la boca (`bocaSVG`) y el armado de vocales.

**Corregido el mismo día:**
1. «Con los siglos, el punto se volvió una rayita» era falso: en pocos años (석보상절, 언해본 de 1459) ya eran rayitas.
2. ㄱ decía «tapa la garganta» (literal de 閉喉): podía llevar a una «j» o a un golpe de glotis. Ahora: la lengua toca el fondo del paladar, entre «g» y «k».
3. El primer coreano del juego es 반말 de un mayor («호랑이야, 안녕!»): ahora el maestro aclara que a los mayores se les dice 안녕하세요, también en el repaso.
4. En el 서당 se enseñaban caracteres chinos, no 한글: el maestro lo cuenta y lo usa de gancho («hoy te enseño algo mucho más fácil»). Además glosa 훈장님 = «señor maestro». Antes decía «Soy el 훈장님», y nadie se nombra a sí mismo con 님. **El mismo día Jay le puso nombre al maestro: 김재희 선생님.** La frase quedó «Mis alumnos me dicen 김재희 선생님: 선생님 es «profesor»», otra vez sin nombrarse con 님, y el título pasó a «김재희 선생님의 한글 교실». El revisor vio la versión con 훈장님.
5. Cada consonante tiene ahora su sonido de referencia (ㄴ «n», ㅁ «m», ㅅ «s», ㅇ final «ng»); ㅗ es «más cerrada que nuestra o»; la mano frente a la boca para sentir el soplo de ㅋ.
6. El quiz de vocales empezaba con 오/어, el contraste más difícil: ahora va 우 primero.
7. 아이 = «niño o niña» (no tiene género). La parte 3 se llama «Sílabas en bloque» (글자 no es «palabra»).

**Sin cambios, a juicio del revisor:** 잘했어, 하늘/땅/사람, 모음/자음, «훈장님의 한글 교실», 1443, la cita de 정인지, las cinco consonantes base, las familias por trazos y «el sonido sale más fuerte» (聲出稍厲), los cortes de la boca, el armado (derecha ㅏ, izquierda ㅓ, arriba ㅗ, abajo ㅜ), el 갓 en la calle y el CSS sin rojo ni rosado.

**Quedan para Jay:**
- **화이팅** al cierre: la forma estándar es 파이팅, y en boca de un 훈장 con 갓 suena fuera de personaje; 「힘내라!」 sería coreano de mayor a niño. Se dejó 화이팅 porque es el saludo de la marca.
- **ㅇ → ㅎ:** la cadena real es ㅇ→ㆆ→ㅎ; se simplificó para A1, sin nota.

## El 식당 de 도윤 y la granja del 할아버지 (23 nov 2026)
Mismo perfil de revisor. No encontró coreano mal escrito. **Corregido el mismo día:** la uva pasó del 밭 al 과수원 como parra (포도나무), con el dato de 거봉/캠벨 frente a 샤인머스캣; «¿Qué tal estuvo?» ahora pregunta en presente (지수: 맛있어요?), porque el pasado no es de Básico 1; «주세요 sirve en cualquier lugar» chocaba con la regla del 편의점 y ahora enseña 김밥 하나 주세요; 잠시만 기다려 주세요 en vez de 기다리세요; 혼자요 y la diferencia 분/명; 계산해 주세요 y que en Corea no se deja propina; glosas para Chile (guiso de kimchi, carne de res salteada, trocitos de masa de arroz, pera asiática); el 김밥 a 4.000 ₩; el 할아버지 explica su 반말; la explicación del quiz habla de 받침. **Quedan para Jay:** si se prefiere 딸기 en el invernadero (es la fruta de invierno en Corea, pero es roja y el juego no usa rojo) y si el 불고기 debe ir como 불고기 정식.
