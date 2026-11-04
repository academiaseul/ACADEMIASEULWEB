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
