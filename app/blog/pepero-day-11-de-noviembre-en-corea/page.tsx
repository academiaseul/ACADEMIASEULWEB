import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PrecioCampana from "@/components/PrecioCampana";

const POST_URL = "https://www.academiaseul.com/blog/pepero-day-11-de-noviembre-en-corea";

const DESCRIPTION =
  "Pepero Day (빼빼로데이): por qué en Corea se regalan palitos de chocolate cada 11/11, su origen, a quién se regala, las críticas, el 가래떡데이 y frases.";

export const metadata: Metadata = {
  // El layout añade " | Academia Seúl" (16 caracteres): título ≤ 44 para que el <title> final quede ≤ 60.
  // "Pepero Day" en letras latinas: es lo que busca un hispanohablante.
  title: "Pepero Day: el 11 de noviembre en Corea",
  description: DESCRIPTION,
  alternates: {
    canonical: POST_URL,
  },
  openGraph: {
    type: "article",
    title: "Pepero Day (빼빼로데이): por qué en Corea se regalan palitos cada 11 de noviembre",
    description:
      "Cuatro palitos en el calendario, escolares de Busan, torres de cajas en el 편의점, críticos del «상술» y un rival hecho de arroz: así es el 11/11 coreano.",
    url: POST_URL,
    siteName: "Academia Seúl",
    locale: "es_CL",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Academia Seúl" }],
  },
};

const KR_FONT = { fontFamily: "'Noto Sans KR', sans-serif" };

function Kr({ children }: { children: ReactNode }) {
  return (
    <span className="kr break-keep" style={KR_FONT}>
      {children}
    </span>
  );
}

// Romanización (RR): solo una ayuda, en gris.
function Rom({ children }: { children: ReactNode }) {
  return <span className="text-gray-500">({children})</span>;
}

function Recuadro({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <div className="border-2 border-seoul-black bg-white shadow-[4px_4px_0_#0a0a0f] px-5 py-4 mb-10">
      <p className="text-xs font-bold tracking-wider uppercase text-seoul-red mb-2">{titulo}</p>
      <p className="text-base text-gray-700 leading-snug">{children}</p>
    </div>
  );
}

function Frase({ kr, rom, children }: { kr: string; rom: string; children: ReactNode }) {
  return (
    <p className="mb-6">
      <span className="kr font-bold break-keep" style={KR_FONT}>
        {kr}
      </span>{" "}
      <span className="text-gray-400 italic">({rom})</span>
      <br />
      {children}
    </p>
  );
}

const vocabulario = [
  {
    kr: "빼빼로데이",
    rom: "ppaeppaerodei",
    es: "El Día del Pepero, cada 11 de noviembre.",
  },
  {
    kr: "빼빼",
    rom: "ppaeppae",
    es: "Flaquito, como palo: 빼빼 마르다 = estar muy flaco.",
  },
  {
    kr: "막대과자",
    rom: "makdaegwaja",
    es: "Galletita de palito: el nombre genérico, sin marca.",
  },
  {
    kr: "십일월 십일일",
    rom: "sibirwol sibiril",
    es: "11 de noviembre. Se dice [시비뤌 시비릴].",
  },
  {
    kr: "선물",
    rom: "seonmul",
    es: "Regalo. 선물이에요! = ¡Es un regalo!",
  },
  {
    kr: "받아!",
    rom: "bada",
    es: "¡Toma! (literalmente, «recibe»), entre amigos.",
  },
  {
    kr: "고마워 · 고마워요",
    rom: "gomawo · gomawoyo",
    es: "Gracias, a un amigo · con respeto.",
  },
  {
    kr: "상술",
    rom: "sangsul",
    es: "Truco comercial. Lo que dicen los críticos del 11/11.",
  },
  {
    kr: "가래떡",
    rom: "garaetteok",
    es: "Pastel de arroz largo y blanco: el otro palito del 11/11.",
  },
  {
    kr: "농업인의 날",
    rom: "nongeobinui nal",
    es: "Día del Agricultor, también el 11 de noviembre.",
  },
];

const faqs = [
  {
    q: "¿Qué es el Pepero Day (빼빼로데이)?",
    a: "Es el 11 de noviembre en Corea del Sur, cuando amigos, parejas, compañeros de curso y colegas se regalan 빼빼로, galletitas en forma de palito bañadas en chocolate. Se eligió esa fecha porque 11/11 parece cuatro palitos en fila. No es una fiesta tradicional ni un feriado: es una fecha comercial que se hizo popular en los años 90.",
  },
  {
    q: "¿Quién inventó el Pepero Day?",
    a: "No hay una versión única. La más contada dice que en los años 90 unas escolares de Busan y del sureste de Corea empezaron a regalarse estas galletitas el 11/11, deseándose quedar altas y delgadas como el palito. Los años cambian según la fuente. La empresa que las fabrica dice que no inventó el día, pero desde fines de los 90 lo impulsó con publicidad hasta hacerlo nacional.",
  },
  {
    q: "¿El 11 de noviembre es feriado en Corea?",
    a: "No. Se trabaja y hay clases normales. Ese mismo día también es el 농업인의 날 (Día del Agricultor), una fecha conmemorativa oficial desde 1996, y el 가래떡데이, que se promueve para comer más arroz. Tampoco es feriado.",
  },
  {
    q: "¿Qué es el 가래떡데이?",
    a: "Es la versión de arroz del 11/11. El 가래떡 es un pastel de arroz largo, blanco y cilíndrico (el mismo que se corta en rodajas para el 떡국 y que va en el 떡볶이). En 2006, el entonces Ministerio de Agricultura de Corea empezó a promover el 11 de noviembre como 가래떡데이, para celebrar el Día del Agricultor con arroz nuevo y fomentar su consumo.",
  },
  {
    q: "¿A quién se le regala en el Pepero Day?",
    a: "A amigos, a la pareja, a compañeros de curso y a colegas de la oficina, donde muchas veces alguien reparte a todo el equipo. Ojo con los profes: por la ley anticorrupción coreana (청탁금지법), vigente desde 2016, en principio un alumno no le puede regalar nada a su profesor actual, ni siquiera una cajita. Una carta escrita a mano es la opción segura.",
  },
  {
    q: "¿Cómo se dice «ayer fue el Pepero Day» en coreano?",
    a: "어제는 빼빼로데이였어요 (eojeneun ppaeppaerodeiyeosseoyo). Como 빼빼로데이 termina en vocal, el pasado de 이에요/예요 es 였어요; después de consonante es 이었어요, como en 어제는 농업인의 날이었어요.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Pepero Day (빼빼로데이): por qué en Corea se regalan palitos de chocolate cada 11 de noviembre",
      description: DESCRIPTION,
      datePublished: "2026-10-15",
      dateModified: "2026-10-15",
      inLanguage: "es",
      mainEntityOfPage: { "@type": "WebPage", "@id": POST_URL },
      image: [
        "https://www.academiaseul.com/og-image.png",
        "https://www.academiaseul.com/blog/pepero-day-11-de-noviembre-en-corea/palitos-11-11.png",
      ],
      author: {
        "@type": "Organization",
        name: "Academia Seúl",
        url: "https://www.academiaseul.com",
      },
      publisher: {
        "@type": "Organization",
        name: "Academia Seúl",
        url: "https://www.academiaseul.com",
        logo: {
          "@type": "ImageObject",
          url: "https://www.academiaseul.com/og-image.png",
        },
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const LINK = "text-seoul-red font-bold underline underline-offset-4";

export default function PeperoDayPost() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Navigation solid />

      {/* Hero */}
      <section className="bg-seoul-black text-white pt-32 md:pt-40 pb-16 px-6 md:px-12">
        <div className="max-w-3xl mx-auto break-keep">
          <div className="flex flex-wrap items-center gap-3 text-xs font-bold tracking-wider uppercase mb-6">
            <Link href="/blog" className="text-white/50 hover:text-white transition-colors">
              ← Blog
            </Link>
            <span className="bg-seoul-red text-white px-3 py-1">Mitos y fiestas</span>
            <span className="text-white/40">15 de octubre, 2026 · 10 min</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            <span className="block text-seoul-gold text-5xl md:text-7xl mb-3" style={KR_FONT}>
              빼빼로데이
            </span>
            Pepero Day: por qué en Corea se regalan palitos de chocolate cada 11 de noviembre
          </h1>
          <p className="text-white/70 text-lg leading-relaxed">
            Imagina que en Chile existiera el Día del Super 8: una fecha cualquiera de
            noviembre en que los almacenes arman torres de cajas en la entrada, los
            pololos se regalan canastos con peluche y alguien en la oficina reparte una
            cajita a cada uno, para que nadie se sienta. En Corea ese día existe: el 11 de
            noviembre es <Kr>빼빼로데이</Kr> (ppaeppaerodei), el Día del Pepero. ¿Y por
            qué justo el 11/11? Mira la fecha con calma: son cuatro palitos.
          </p>
        </div>
      </section>

      {/* Body */}
      <article className="max-w-3xl mx-auto px-6 py-16 text-gray-800 leading-relaxed text-lg break-keep">

        {/* 1 · Qué es */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Qué es <Kr>빼빼로데이</Kr>: el día de los palitos
        </h2>
        <p className="mb-6">
          <Kr>빼빼로</Kr> <Rom>ppaeppaero</Rom> es una galletita coreana muy delgada,
          en forma de palito, bañada en chocolate salvo en la punta, que queda libre
          para tomarla sin mancharse. Salió a la venta en 1983. El 11 de
          noviembre toma prestado su nombre y se convierte en <Kr>빼빼로데이</Kr>, el
          día en que amigos, parejas, compañeros de curso y colegas se regalan cajas
          de estos palitos.
        </p>
        <p className="mb-6">
          No es una fiesta tradicional ni un feriado: ese día se trabaja y hay clases
          como siempre. Pero se nota. Ya a fines de octubre, los <Kr>편의점</Kr>{" "}
          <Rom>pyeonuijeom</Rom>, las tiendas de conveniencia que hay en cada esquina
          de Seúl, suelen llenar la entrada de pirámides de cajas, cajas con forma de
          corazón y canastos envueltos en celofán con un peluche encima. Y los más
          dedicados hacen la versión casera, el <Kr>수제 빼빼로</Kr>{" "}
          <Rom>suje ppaeppaero</Rom>: palitos de galleta bañados en chocolate
          derretido y chispitas de colores.
        </p>
        <p className="mb-10">
          La mejor comparación: un San Valentín en miniatura que no es solo para
          parejas. Barato, dulce y con un mensaje simple: «me acordé de ti».
        </p>

        <blockquote className="border-l-4 border-seoul-red bg-[#F4F7FF] px-6 py-5 my-10 text-seoul-black font-medium">
          En Corea, el 11/11 no se lee «once del once». Se lee «cuatro palitos».
        </blockquote>

        {/* 2 · Por qué el 11/11 */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          ¿Por qué el 11/11? Cuatro palitos en fila
        </h2>
        <p className="mb-6">
          En Corea las fechas se escriben de lo grande a lo chico: año, mes y día,
          como 2026.11.11. Y ese 11.11 del final parece cuatro palitos parados uno al
          lado del otro. No hace falta más explicación: la fecha se dibuja sola.
        </p>

        <figure className="my-12 mx-auto max-w-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/blog/pepero-day-11-de-noviembre-en-corea/palitos-11-11.png"
            alt="Dibujo de Academia Seúl: una caja azul sin marca con «11/11» escrito en blanco y una carita sonriente; de la caja asoman cuatro palitos de galleta con chocolate en dos pares, como 11 11, y hay dos palitos sueltos delante, con corazones azules y dorados alrededor."
            width={900}
            height={1038}
            loading="lazy"
            decoding="async"
            className="w-full h-auto"
          />
          <figcaption className="text-sm text-gray-500 mt-4 text-center">
            11/11: cuatro palitos. Dibujo propio, sin marca, como el que usamos en
            clase.
          </figcaption>
        </figure>

        <p className="mb-6">
          De paso, una mini-clase de números. En coreano, los meses y los días se
          cuentan con los números de origen chino: <Kr>십</Kr> <Rom>sip</Rom> es 10
          e <Kr>일</Kr> <Rom>il</Rom> es 1, así que 11 es <Kr>십일</Kr>. El mes se
          dice con <Kr>월</Kr> y el día con <Kr>일</Kr>, que además de «uno» significa
          «día». Resultado: el 11 de noviembre es <Kr>십일월 십일일</Kr>, con tres{" "}
          <Kr>일</Kr> en una sola fecha. Ojo con la lectura: las sílabas se encadenan
          y suena [<Kr>시비뤌 시비릴</Kr>] <Rom>sibirwol sibiril</Rom>.
        </p>
        <Recuadro titulo="Para practicar">
          Tu cumpleaños, en coreano: el mes con <Kr>월</Kr> y el día con <Kr>일</Kr>.
          Si naciste el 1 de marzo, es <Kr>삼월 일일</Kr> <Rom>samwol iril</Rom>. Si el
          número te sale con <Kr>십</Kr>, ya vas a mitad de camino del 11/11. Ojo
          con dos meses que se salen de la regla: junio es <Kr>유월</Kr>{" "}
          <Rom>yuwol</Rom> y octubre es <Kr>시월</Kr> <Rom>siwol</Rom>, sin la
          consonante final del número.
        </Recuadro>

        {/* 3 · Origen */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          ¿Quién lo inventó? Una historia con varias versiones
        </h2>
        <p className="mb-6">
          El origen de <Kr>빼빼로데이</Kr> se cuenta de varias maneras y ninguna
          tiene acta de nacimiento. La versión más
          repetida, que también recoge la prensa coreana, dice que todo empezó en los
          años 90 entre escolares de Busan y de la región del sureste, el{" "}
          <Kr>영남</Kr> <Rom>yeongnam</Rom>: el 11 de noviembre se regalaban estas
          galletitas deseándose quedar altas y delgadas como el palito. Algunas
          fuentes dicen 1993; otras, mediados de los 90 o incluso antes. Y algunas
          versiones agregan un detalle muy de colegio: para que funcionara, había que
          comérselo a las 11 y 11.
        </p>
        <p className="mb-6">
          El deseo de quedar delgadas tiene su juego de palabras. En coreano,{" "}
          <Kr>빼빼</Kr> <Rom>ppaeppae</Rom> describe a alguien muy flaco, como palo:{" "}
          <Kr>빼빼 마르다</Kr> es «estar flaco como un fideo». Con un nombre así, el
          palito era el regalo perfecto. La paradoja la han notado hasta los diarios
          coreanos: desearle a alguien que adelgace regalándole chocolate.
        </p>
        <p className="mb-6">
          ¿Y la empresa? Según la propia compañía que fabrica el palito (Lotte, hoy
          Lotte Wellfood), el día no lo inventaron ellos: sus vendedores de la zona se
          dieron cuenta de que cada 11 de noviembre las ventas se disparaban. Desde
          fines de los 90, la publicidad y las tiendas hicieron el resto, y lo que era
          una moda escolar del sur se volvió una fecha nacional. La prensa coreana lo
          resume más o menos así: lo crearon los consumidores y lo agrandó el
          comercio.
        </p>
        <p className="mb-10">
          Un dato para la sobremesa: Japón también tiene su 11/11 de palitos, el Día
          del Pocky, que su fabricante promueve desde 1999. Y en China, el 11/11 es
          el Día de los Solteros, hoy un festival de compras gigante. Por lo visto,
          nadie en Asia mira el 11/11 sin pensar en algo.
        </p>

        {/* 4 · Qué se regala y a quién */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Qué se regala y a quién
        </h2>
        <p className="mb-6">
          <strong>A los amigos</strong>, una cajita normal, y muchas veces se
          intercambian: tú me das una, yo te doy otra. <strong>A la pareja</strong>,
          la versión deluxe: el canasto con peluche, la caja gigante o el{" "}
          <Kr>수제 빼빼로</Kr> hecho en casa, que vale más por el esfuerzo que por el
          chocolate. <strong>En la oficina</strong>, es común que alguien compre
          varias cajas y reparta a todo el equipo. Y <strong>en el colegio</strong>, los
          compañeros de curso se llenan la mochila.
        </p>
        <p className="mb-6">
          La regla no escrita, sobre todo en el curso y en la oficina: o a todos o a nadie. Regalarle
          a uno y no al de al lado se nota, y eso en coreano tiene nombre:{" "}
          <Link href="/blog/nunchi-el-arte-coreano-de-leer-el-ambiente" className={LINK}>
            <Kr>눈치</Kr> (nunchi)
          </Link>
          , el arte de leer el ambiente.
        </p>
        <p className="mb-6">
          ¿Y los profes? Ojo. Desde 2016 rige en Corea la ley
          anticorrupción <Kr>청탁금지법</Kr> <Rom>cheongtakgeumjibeop</Rom>, conocida
          como «ley Kim Young-ran», y según las orientaciones oficiales, un alumno no
          le puede regalar nada a su profesor actual, por barato que sea. Ni una
          cajita. Lo que sí es seguro es una carta escrita a mano.
        </p>
        <Recuadro titulo="Si te toca regalar">
          Compra para todos o para nadie, entrega la caja con las dos manos (a una
          persona mayor, sobre todo) y acompáñala con una frase en coreano, que te
          dejamos más abajo. Sobre las dos manos, te contamos más en{" "}
          <Link href="/blog/gestos-que-delatan-a-un-coreano" className={LINK}>
            6 gestos que delatan a un coreano
          </Link>
          .
        </Recuadro>

        {/* 5 · Críticas */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Las críticas: ¿fiesta o <Kr>상술</Kr>?
        </h2>
        <p className="mb-6">
          Cada noviembre, en Corea vuelve la misma discusión. Para muchos,{" "}
          <Kr>빼빼로데이</Kr> es puro <Kr>상술</Kr> <Rom>sangsul</Rom>, un truco
          comercial: una fecha que existe para vender. Y los números ayudan a la
          crítica: según la prensa coreana, cerca de la mitad de las ventas anuales
          del palito se concentra en torno al 11 de noviembre, y la fábrica empieza a
          producir para esa fecha desde septiembre.
        </p>
        <p className="mb-6">
          Además, el 11/11 es parte de una tradición muy coreana de <Kr>데이</Kr>{" "}
          <Rom>dei</Rom>, días con nombre en inglés. El 14 de febrero, en Corea,
          tradicionalmente son ellas las que regalan chocolate; el 14 de marzo, el
          White Day, ellos devuelven el gesto con dulces; y el 14 de abril, el Black
          Day, los que no recibieron nada en ninguno de los dos se juntan a comer{" "}
          <Kr>짜장면</Kr> <Rom>jjajangmyeon</Rom>, fideos con salsa negra de porotos
          fermentados, para consolarse. El 11/11 encaja perfecto en ese calendario.
        </p>
        <p className="mb-6">
          A eso se suman los canastos caros, que son más celofán y peluche que
          chocolate; el azúcar, sobre todo en los niños; y lo más serio: en los
          colegios, el que no recibe nada lo pasa mal. Por eso hay profesores que
          declaran su sala libre de <Kr>빼빼로데이</Kr>.
        </p>
        <p className="mb-10">
          Con todo, mucha gente lo toma con humor y lo celebra igual. Al final, un
          palito de chocolate que aparece en tu escritorio un día cualquiera de
          noviembre no le hace mal a nadie. Bueno, a la dieta, quizás.
        </p>

        <blockquote className="border-l-4 border-seoul-red bg-[#F4F7FF] px-6 py-5 my-10 text-seoul-black font-medium">
          Que lo infló el marketing, puede ser. Que una cajita inesperada te alegra el
          día, también.
        </blockquote>

        {/* 6 · 가래떡데이 */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          <Kr>가래떡데이</Kr>: el 11/11 en versión arroz
        </h2>
        <p className="mb-6">
          El 11 de noviembre tiene otra cara, con raíces más antiguas y mucho menos
          dulce. Es el <Kr>농업인의 날</Kr> <Rom>nongeobinui nal</Rom>, el Día del
          Agricultor, que se celebró por primera vez en 1964 en la ciudad de Wonju y
          es fecha conmemorativa oficial en Corea desde 1996. ¿Por qué ese día? Por un juego
          con los caracteres chinos: <Kr>土</Kr>, «tierra», se arma con <Kr>十</Kr>{" "}
          (diez) y <Kr>一</Kr> (uno). Así, «mes de tierra, día de tierra»,{" "}
          <Kr>土月土日</Kr>, se puede leer como 11 y 11: la fecha de la gente que vive
          de la tierra.
        </p>
        <p className="mb-6">
          Y como a un día del agricultor le queda mejor el arroz que el chocolate,
          apareció el <Kr>가래떡데이</Kr> <Rom>garaetteokdei</Rom>. El{" "}
          <Kr>가래떡</Kr> es un pastel de arroz largo, blanco y cilíndrico, recién
          hecho, tibio y masticable, que se come solo o untado en miel o en{" "}
          <Kr>조청</Kr> <Rom>jocheong</Rom>, un almíbar de cereal. Es el mismo que se
          corta en rodajas para el <Kr>떡국</Kr> <Rom>tteokguk</Rom>, la sopa del Año
          Nuevo, y el que en versión delgadita va en el <Kr>떡볶이</Kr>{" "}
          <Rom>tteokbokki</Rom>. Largo y blanco: otro palito para el 11/11.
        </p>

        <figure className="my-12 mx-auto max-w-md">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/blog/pepero-day-11-de-noviembre-en-corea/garaetteok.png"
            alt="Dibujo de Academia Seúl: tres 가래떡, pasteles de arroz largos, blancos y cilíndricos, sobre un plato azul, con vapor que sube y un pocillo de miel dorada al lado."
            width={900}
            height={675}
            loading="lazy"
            decoding="async"
            className="w-full h-auto"
          />
          <figcaption className="text-sm text-gray-500 mt-4 text-center">
            <Kr>가래떡</Kr> recién hecho, con miel: el otro palito del 11/11.
          </figcaption>
        </figure>

        <p className="mb-6">
          En 2006, el entonces Ministerio de Agricultura coreano empezó a promover el
          11 de noviembre como <Kr>가래떡데이</Kr>, con dos objetivos: agradecer a los
          agricultores con el arroz de la cosecha nueva y animar a la gente a comer
          más arroz, cuyo consumo por persona lleva décadas bajando. Hay hasta un
          antecedente de oficina: según cuenta la propia empresa, en AhnLab, una
          compañía coreana de antivirus, los empleados ya repartían <Kr>가래떡</Kr>{" "}
          cada 11/11 desde 2003, en vez de chocolate.
        </p>
        <p className="mb-6">
          ¿Quién gana la pelea? En el <Kr>편의점</Kr>, por goleada, el chocolate. Pero
          cada año hay municipios, colegios y empresas que reparten{" "}
          <Kr>가래떡</Kr>. Nuestro consejo para quedar bien con todos: palito de
          chocolate para tus amigos y palito de arroz para tu abuela.
        </p>
        <p className="mb-10">
          Y el 11/11 todavía no da abasto. También es el <Kr>보행자의 날</Kr>, el Día
          del Peatón (oficial desde 2010), y el <Kr>지체장애인의 날</Kr>, el Día de
          las Personas con Discapacidad Física, que su asociación eligió porque el 1
          recuerda a una persona que se pone de pie. Y la ciudad de <Kr>청주</Kr>{" "}
          (Cheongju) lo promueve como Día de los Palillos, <Kr>젓가락의 날</Kr>: pon
          un par de palillos sobre la mesa y mira, otro 11. Pocas fechas del
          calendario coreano trabajan tanto.
        </p>

        {/* 7 · Frases */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Frases para regalar (y agradecer) en coreano
        </h2>
        <p className="mb-6">
          Para que tu cajita no llegue muda. Las que terminan en <Kr>요</Kr> o en{" "}
          <Kr>니다</Kr> son para alguien mayor o con quien todavía no tienes
          confianza; el resto, para amigos.
        </p>
        <Frase kr="빼빼로 받아!" rom="ppaeppaero bada!">
          «¡Toma, un Pepero!». Literalmente, «¡recíbelo!». Ojo: <Kr>받아</Kr> suena
          igual que <Kr>바다</Kr>, «mar», porque la <Kr>ㄷ</Kr> se pasa a la sílaba
          siguiente. Así que, técnicamente, puedes regalar un océano de chocolate.
        </Frase>
        <Frase kr="너 주려고 샀어." rom="neo juryeogo sasseo">
          «Lo compré para ti». Corto, directo y con más efecto que el chocolate.
        </Frase>
        <Frase kr="이거 드세요!" rom="igeo deuseyo!">
          «¡Sírvase, es para usted!», para el colega mayor, la jefa o la vecina.{" "}
          <Kr>드세요</Kr> es la forma respetuosa de «coma». Con las dos manos, claro.
        </Frase>
        <Frase kr="고마워! · 고마워요! · 감사합니다!" rom="gomawo · gomawoyo · gamsahamnida">
          «¡Gracias!», de más cercano a más formal: a tu amigo, a alguien con quien
          tienes trato pero no tanta confianza, y a la jefa o a una persona mayor.
        </Frase>
        <Frase kr="같이 먹자!" rom="gachi meokja!">
          «¡Comámoslo juntos!». La respuesta más generosa cuando te regalan una
          caja. Se pronuncia [<Kr>가치 먹짜</Kr>].
        </Frase>
        <Frase kr="내 건 없어?" rom="nae geon eopseo?">
          «¿Y el mío?». Para cuando ves que todos tienen cajita menos tú. Úsala con
          sonrisa, o se vuelve drama.
        </Frase>
        <p className="mb-10">
          Y para el mensaje del día, lo más común en el chat es simplemente{" "}
          <Kr>해피 빼빼로데이!</Kr> <Rom>haepi ppaeppaerodei</Rom>, con el inglés a
          la coreana. Funciona con todos.
        </p>

        {/* 8 · El pasado */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Un viaje al pasado: <Kr>어제는 빼빼로데이였어요</Kr>
        </h2>
        <p className="mb-6">
          Un detalle que a los latinoamericanos nos pasa siempre: en noviembre, Corea
          va 12 horas adelante de Chile continental (y 15 adelante de Ciudad de
          México). Cuando aquí es la noche del 11, en Seúl ya es la mañana del 12. O
          sea, para Corea, el <Kr>빼빼로데이</Kr> ya fue ayer:
        </p>
        <Frase kr="어제는 빼빼로데이였어요." rom="eojeneun ppaeppaerodeiyeosseoyo">
          «Ayer fue el Día del Pepero». Se pronuncia [<Kr>어제는 빼빼로데이여써요</Kr>].
        </Frase>
        <p className="mb-6">
          La gramática es más simple de lo que parece. «Es» se dice{" "}
          <Kr>이에요</Kr> o <Kr>예요</Kr>, y su pasado, «fue», es <Kr>이었어요</Kr> o{" "}
          <Kr>였어요</Kr>. Depende de cómo termina la palabra: si termina en vocal,
          como <Kr>빼빼로데이</Kr>, va <Kr>였어요</Kr>; si termina en consonante
          (lo que en coreano se llama <Kr>받침</Kr>), va <Kr>이었어요</Kr>, como en{" "}
          <Kr>어제는 농업인의 날이었어요</Kr>, «ayer fue el Día del Agricultor». Es
          justo lo que se practica en Básico 2 (A1.2), cuando empezamos a contar qué
          pasó ayer, el fin de semana o la semana pasada.
        </p>
        <Recuadro titulo="Tu turno">
          ¿Cómo dirías «ayer fue mi cumpleaños»? Pista: cumpleaños es{" "}
          <Kr>생일</Kr> y mi es <Kr>제</Kr>. Respuesta: <Kr>어제는 제 생일이었어요</Kr>{" "}
          <Rom>eojeneun je saengirieosseoyo</Rom>. <Kr>생일</Kr> termina en{" "}
          <Kr>ㄹ</Kr>, así que va <Kr>이었어요</Kr>. Y si de verdad fue tu cumpleaños,{" "}
          <Kr>생일 축하해요!</Kr>
        </Recuadro>

        {/* Vocabulario */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Mini-clase de coreano: el vocabulario del 11/11
        </h2>
        <p className="mb-6">
          La romanización va solo como ayuda: <em>eo</em> (<Kr>선물</Kr>,{" "}
          <Kr>떡</Kr>) es una o abierta, sin redondear los labios, y la doble
          consonante de <em>pp</em> o <em>tt</em> es tensa, sin aire. Para oírlo bien,
          el{" "}
          <a href="/lector-coreano" className={LINK}>
            Lector de Hangul gratis
          </a>{" "}
          te pronuncia cada letra con voz nativa, y con{" "}
          <a href="/dubu" className={LINK}>
            Dubu, nuestro puzzle del Hangul
          </a>
          , armas sílabas jugando.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {vocabulario.map((e) => (
            <div
              key={e.kr}
              className="border-2 border-seoul-black bg-white shadow-[4px_4px_0_#0a0a0f] px-5 py-4"
            >
              <div className="text-2xl font-black text-seoul-red mb-1 break-keep" style={KR_FONT}>
                {e.kr}
              </div>
              <div className="text-sm text-gray-400 italic mb-2">{e.rom}</div>
              <div className="text-base text-gray-700 leading-snug">{e.es}</div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Preguntas frecuentes
        </h2>
        {faqs.map((f) => (
          <div key={f.q} className="mb-8">
            <h3 className="text-xl font-black text-seoul-black mb-2">{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}

        <p className="mb-6 mt-10">
          Más fechas coreanas en el blog:{" "}
          <Link href="/blog/chuseok-el-dia-de-accion-de-gracias-coreano" className={LINK}>
            Chuseok, el Día de Acción de Gracias coreano
          </Link>{" "}
          (donde el spam se regala en caja) y{" "}
          <Link
            href="/blog/sopa-de-algas-antes-de-un-examen-supersticion-coreana"
            className={LINK}
          >
            por qué en Corea nadie come sopa de algas antes de un examen
          </Link>
          , justo antes del gran examen de noviembre.
        </p>
        <p className="mb-6">
          Para seguir gratis tienes el{" "}
          <a href="/lector-coreano" className={LINK}>
            Lector de Hangul
          </a>
          ,{" "}
          <a href="/dubu" className={LINK}>
            Dubu
          </a>
          , el{" "}
          <Link href="/taller" className={LINK}>
            taller gratis de Hangul
          </Link>{" "}
          y{" "}
          <Link href="/generador-nombre" className={LINK}>
            tu nombre en coreano
          </Link>
          , para firmar tu tarjeta del 11/11. Y cuando quieras clases en vivo, Básico
          1 (A1.1) parte desde cero con Kiran: aprendes a leer el Hangul completo, a
          presentarte y a dar las gracias como corresponde. Son 8 martes desde el 10 de
          noviembre, a las 20:00 hora de Chile · <PrecioCampana />.{" "}
          <Link href="/nivel-1?clase=a11-martes#clases" className={LINK}>
            Reserva tu cupo
          </Link>
          .
        </p>

        {/* CTA */}
        <div className="bg-seoul-black text-white border-2 border-seoul-black shadow-[8px_8px_0_#3D2EE8] px-8 py-10 mt-14 text-center">
          <p className="text-4xl font-black text-seoul-gold mb-3 break-keep" style={KR_FONT}>
            빼빼로 받아!
          </p>
          <h3 className="text-2xl font-black mb-3">
            ¿Y si este 11/11 tu cajita llega con una frase en coreano?
          </h3>
          <p className="text-white/70 mb-7 max-w-md mx-auto">
            Aprende a leer el Hangul gratis con el Lector, o súmate a Básico 1 (A1.1):
            desde cero, en vivo y con profe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/lector-coreano"
              className="bg-[#E8B84B] text-seoul-black font-bold px-7 py-3.5 shadow-[4px_4px_0_rgba(255,255,255,0.2)] hover:-translate-y-0.5 transition-transform"
            >
              Lector de Hangul gratis →
            </a>
            <Link
              href="/nivel-1?clase=a11-martes#clases"
              className="bg-seoul-red text-white font-bold px-7 py-3.5 shadow-[4px_4px_0_rgba(255,255,255,0.2)] hover:-translate-y-0.5 transition-transform"
            >
              Inscribirme en Básico 1 →
            </Link>
          </div>
          <p className="text-white/60 text-sm mt-6">
            También gratis:{" "}
            <a href="/dubu" className="underline hover:text-white">
              Dubu
            </a>{" "}
            ·{" "}
            <Link href="/taller" className="underline hover:text-white">
              taller de Hangul
            </Link>{" "}
            ·{" "}
            <Link href="/generador-nombre" className="underline hover:text-white">
              tu nombre en coreano
            </Link>
          </p>
          <p className="text-white/50 text-sm mt-4">해피 빼빼로데이, chingu! 🇰🇷</p>
        </div>
      </article>

      <Footer />
    </main>
  );
}
