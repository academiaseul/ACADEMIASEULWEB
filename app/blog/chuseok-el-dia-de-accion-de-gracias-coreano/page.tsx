import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const POST_URL =
  "https://www.academiaseul.com/blog/chuseok-el-dia-de-accion-de-gracias-coreano";

const DESCRIPTION =
  "Chuseok (추석), el Día de Acción de Gracias coreano: cuándo cae, qué se come (송편), el 차례 y el 성묘, la luna llena, el spam de regalo y frases para saludar.";

export const metadata: Metadata = {
  // El layout añade " | Academia Seúl" (16 caracteres): título ≤ 44 para que el <title> final quede ≤ 60.
  // "Chuseok" en letras latinas: es lo que busca un hispanohablante.
  title: "Chuseok: el Día de Acción de Gracias coreano",
  description: DESCRIPTION,
  alternates: {
    canonical: POST_URL,
  },
  openGraph: {
    type: "article",
    title: "Chuseok (추석): el Día de Acción de Gracias coreano",
    description:
      "Luna llena, 송편, antepasados, 31 millones de viajes y spam en caja de regalo: así se vive Chuseok (추석) en Corea.",
    url: POST_URL,
    siteName: "Academia Seúl",
    locale: "es_CL",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Academia Seúl" }],
  },
};

// keep-all: el hangul no se corta a mitad de palabra (송 / 편) en pantallas angostas
const KR = { fontFamily: "'Noto Sans KR', sans-serif", wordBreak: "keep-all" as const };

// Palabra coreana dentro del texto (mismo marcado que los otros artículos del blog)
function K({ children }: { children: ReactNode }) {
  return (
    <span className="kr" style={KR}>
      {children}
    </span>
  );
}

const vocabulario = [
  { kr: "추석", rom: "chuseok", es: "秋夕, «noche de otoño». El día 15 del 8.º mes lunar." },
  { kr: "한가위", rom: "hangawi", es: "El nombre nativo: «el gran medio», la mitad del 8.º mes." },
  { kr: "고향", rom: "gohyang", es: "Pueblo o ciudad natal. Adonde todos vuelven." },
  { kr: "귀성", rom: "gwiseong", es: "El viaje al 고향. La vuelta a Seúl es 귀경." },
  { kr: "차례", rom: "charye", es: "Ceremonia de la mañana para los antepasados." },
  { kr: "성묘", rom: "seongmyo", es: "Visita a las tumbas de la familia." },
  { kr: "송편", rom: "songpyeon", es: "Pastelito de arroz en media luna, al vapor sobre pino." },
  { kr: "보름달", rom: "boreumdal", es: "Luna llena. Se le pide un deseo: 소원을 빌다." },
  { kr: "선물세트", rom: "seonmul seteu", es: "Set de regalo: fruta, carne, champú... y spam." },
];

const faqs = [
  {
    q: "¿Qué es Chuseok (추석) y cuándo se celebra?",
    a: "Es la gran fiesta de la cosecha de Corea, también llamada 한가위: el Día de Acción de Gracias coreano. Cae el día 15 del octavo mes lunar, con luna llena, y el feriado dura tres días. En 2026 fue el viernes 25 de septiembre, con feriado del jueves 24 al sábado 26.",
  },
  {
    q: "¿Cuándo es Chuseok en 2027?",
    a: "El miércoles 15 de septiembre de 2027, con feriado del martes 14 al jueves 16 de septiembre.",
  },
  {
    q: "¿Qué se come en Chuseok?",
    a: "El plato emblema es el 송편, un pastelito de arroz en forma de media luna cocido al vapor sobre agujas de pino. También son típicos el 전 (tortitas fritas), la sopa de taro 토란국, las verduras 나물, el arroz nuevo y la fruta de otoño.",
  },
  {
    q: "¿Cómo se saluda a alguien en Chuseok?",
    a: "Con 추석 잘 보내세요 (¡que pases un lindo Chuseok!) o 즐거운 한가위 보내세요 (¡que tengas un feliz 한가위!). A un amigo cercano, 추석 잘 보내! Y si el feriado ya pasó: 추석 잘 보내셨어요? (¿lo pasaste bien en Chuseok?).",
  },
  {
    q: "¿Chuseok es lo mismo que el Festival del Medio Otoño chino?",
    a: "No. Comparten la fecha lunar (el 15 del octavo mes) y ambas celebran la luna llena de la cosecha, pero son fiestas distintas, cada una con su propia historia: en Corea, el 삼국사기 remonta 추석 a la fiesta 가배 del reino de Silla. En China el dulce típico es el pastel de luna; en Corea, el 송편, y el corazón de la fiesta es volver al 고향 y honrar a los antepasados con el 차례 y el 성묘.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline:
        "Chuseok (추석): el Día de Acción de Gracias coreano, con luna llena, 송편 y sets de spam",
      description: DESCRIPTION,
      datePublished: "2026-09-30",
      dateModified: "2026-09-30",
      inLanguage: "es",
      mainEntityOfPage: { "@type": "WebPage", "@id": POST_URL },
      image: [
        "https://www.academiaseul.com/og-image.png",
        "https://www.academiaseul.com/blog/chuseok/chuseok_03.webp",
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

export default function ChuseokPost() {
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
          <div className="flex items-center gap-3 text-xs font-bold tracking-wider uppercase mb-6">
            <Link href="/blog" className="text-white/50 hover:text-white transition-colors">
              ← Blog
            </Link>
            <span className="bg-seoul-red text-white px-3 py-1">Mitos y fiestas</span>
            <span className="text-white/40">30 de septiembre, 2026 · 9 min</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            <span className="block text-seoul-gold text-5xl md:text-7xl mb-3" style={KR}>
              추석
            </span>
            Chuseok (<K>추석</K>): el Día de Acción de Gracias coreano, con luna
            llena, <K>송편</K> y sets de spam
          </h1>
          <p className="text-white/70 text-lg leading-relaxed">
            Imagina un 18 de septiembre en que millones de personas salen de la
            capital al mismo tiempo, las autopistas no cobran peaje, el
            supermercado vende spam en caja de regalo y la familia entera se
            sienta a armar pastelitos de
            arroz en forma de media luna. Cámbiale la cueca por una ronda bajo la
            luna llena y agrégale una mesa servida para los abuelos que ya
            partieron. Eso, más o menos, es <K>추석</K> (Chuseok), que este año
            cayó el viernes 25 de septiembre.
          </p>
        </div>
      </section>

      {/* Body */}
      <article className="max-w-3xl mx-auto px-6 py-16 text-gray-800 leading-relaxed text-lg break-keep">

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Qué es 추석: cosecha, familia y antepasados
        </h2>
        <p className="mb-6">
          <K>추석</K> se escribe con dos caracteres chinos, 秋夕: otoño y noche.
          «Noche de otoño» suena a poema, y algo de eso tiene: es la fiesta de
          la luna llena de la cosecha, cuando la familia se junta a compartir la
          comida nueva, dar las gracias y recordar a sus antepasados. En inglés
          la llaman <em>Korean Thanksgiving</em>, y la comparación sirve. Solo
          que no hay pavo, y las gracias no van solo para los vivos.
        </p>
        <p className="mb-10">
          Su nombre nativo es <K>한가위</K> (hangawi): <K>한</K>, «grande», y{" "}
          <K>가위</K>, una palabra antigua para «el medio» (la mitad del mes). El{" "}
          <K>삼국사기</K> (Samguk Sagi), la crónica del siglo XII, sitúa su
          origen en el reino de Silla: dos princesas dirigían a las mujeres de la
          capital en una competencia de un mes hilando cáñamo (el{" "}
          <K>길쌈</K>), del 16 del séptimo mes al 15 del octavo; el equipo
          perdedor invitaba la comida y la bebida, y todos terminaban cantando y
          bailando. A esa fiesta la llamaron <K>가배</K>{" "}
          (gabae). Moraleja: en Corea, hasta la derrota termina en banquete.
        </p>

        <blockquote className="border-l-4 border-seoul-red bg-[#F4F7FF] px-6 py-5 my-10 text-seoul-black font-medium">
          <K>더도 말고 덜도 말고 한가위만 같아라.</K>
          <br />
          Ni más ni menos: que todos los días sean como <K>한가위</K>. (Dicho
          coreano)
        </blockquote>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          ¿Cuándo es 추석? Lo decide la luna
        </h2>
        <p className="mb-10">
          <K>추석</K> cae el día 15 del octavo mes lunar (<K>음력 8월 15일</K>),
          noche de luna llena, así que en nuestro calendario salta entre
          comienzos de septiembre y comienzos de octubre. El feriado dura tres
          días: la víspera, el día y el día siguiente. En 2026 fue el viernes 25
          de septiembre, con feriado del jueves 24 al sábado 26 (más el domingo:
          cuatro días seguidos de descanso). Anota el próximo: miércoles 15 de
          septiembre de 2027.
        </p>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          민족 대이동: millones en la carretera
        </h2>
        <p className="mb-10">
          Las noticias lo llaman <K>민족 대이동</K>, «la gran migración del
          pueblo». Suena exagerado hasta que ves los números: para el feriado de
          2026, el Ministerio de Transporte coreano (<K>국토교통부</K>) proyectó
          unos 31 millones de desplazamientos entre el 23 y el 27 de septiembre,
          en un país de unos 51 millones de habitantes. Las autopistas no
          cobraron peaje del 24 al 27, pero el viaje de siempre puede durar el
          doble. Ir al pueblo natal, el <K>고향</K> (gohyang), se dice <K>귀성</K>{" "}
          (gwiseong); volver a Seúl, <K>귀경</K> (gwigyeong).
        </p>

        <figure className="my-12 mx-auto max-w-md">
          <Image
            src="/blog/chuseok/chuseok_03.webp"
            alt="Lámina ilustrada de Academia Seúl: arriba, 귀성 (Gwiseong), un auto azul sube por un camino entre cerros hacia una casa tradicional coreana; abajo, 송편 (Songpyeon), pastelitos de arroz blancos, verdes y amarillos en forma de media luna sobre agujas de pino."
            width={1080}
            height={1350}
            sizes="(max-width: 640px) 100vw, 448px"
            className="w-full h-auto border-2 border-seoul-black shadow-[6px_6px_0_#0a0a0f]"
          />
          <figcaption className="text-sm text-gray-500 mt-4 text-center">
            <K>귀성</K> y <K>송편</K>, del carrusel «¿Qué es <K>추석</K>?» de
            @academiaseul.
          </figcaption>
        </figure>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          차례 y 성묘: gracias a los que ya no están
        </h2>
        <p className="mb-6">
          La mañana de <K>추석</K>, muchas familias hacen el <K>차례</K>{" "}
          (charye): sobre una mesa se sirven <K>송편</K>, fruta de la
          temporada, verduras, carne o pescado y licor para los antepasados,
          todos hacen una reverencia profunda y después comen juntos lo que se
          ofreció. El nombre, 茶禮, significa «rito del té»: en el ritual
          original, lo que se ofrecía era <K>차</K>, té.
        </p>
        <p className="mb-6">
          Durante décadas esa mesa fue también fuente de estrés: decenas de
          platos, horas friendo <K>전</K> (tortitas) y reglas que el abuelo o
          el tío mayor recitaba de memoria, como <K>홍동백서</K>, «lo rojo al
          este, lo blanco al oeste» (se refiere a la fruta). En 2022, el{" "}
          <K>성균관</K> (Sungkyunkwan), la institución guardiana de la
          tradición confuciana, propuso una mesa simplificada: seis básicos (
          <K>송편</K>, verduras, un asado, kimchi, fruta y licor) y nueve
          platos como máximo. Aclaró además que no hace falta freír <K>전</K>{" "}
          y que <K>홍동백서</K> no aparece en los textos clásicos de ritos.
          Cuántos tíos se enteraron es otro tema.
        </p>
        <p className="mb-10">
          Luego viene el <K>성묘</K> (seongmyo): visitar las tumbas de la
          familia, montículos redondos de pasto en la ladera de un cerro, para
          saludar a los antepasados. Unas semanas antes se hace el{" "}
          <K>벌초</K> (beolcho), cortar ese pasto. Nada que ver con <K>벌</K>{" "}
          (abeja o avispa), aunque cada año los bomberos coreanos advierten
          justamente sobre las picaduras de avispa en temporada de <K>벌초</K>.
        </p>

        <figure className="my-12 mx-auto max-w-md">
          <Image
            src="/blog/chuseok/chuseok_04.webp"
            alt="Lámina ilustrada de Academia Seúl: arriba, 차례 (Charye), una mesa ceremonial con velas, fruta, pasteles de arroz y una tablilla frente a un biombo; abajo, 성묘 (Seongmyo), un túmulo de pasto con su lápida y un banco de piedra junto a un pino."
            width={1080}
            height={1350}
            sizes="(max-width: 640px) 100vw, 448px"
            className="w-full h-auto border-2 border-seoul-black shadow-[6px_6px_0_#0a0a0f]"
          />
          <figcaption className="text-sm text-gray-500 mt-4 text-center">
            <K>차례</K> y <K>성묘</K>: la parte más sobria de la fiesta.
          </figcaption>
        </figure>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          송편: la media luna que predice tu futuro
        </h2>
        <p className="mb-6">
          Si <K>추석</K> tuviera sabor, sería el <K>송편</K> (songpyeon): masa
          de harina de arroz en forma de media luna, rellena de sésamo con miel,
          porotos o castaña, y cocida al vapor sobre agujas de pino (el{" "}
          <K>송</K> del nombre es 松, pino), que le dan aroma y evitan que se
          peguen. Parece una empanadita de cóctel, pero es de arroz, dulce y
          suavecita.
        </p>
        <p className="mb-10">
          Lo mejor es hacerlos en familia, alrededor de una bandeja. Ahí aparece
          uno de los dichos más conocidos de la fiesta: quien hace <K>송편</K>{" "}
          bonitos tendrá una hija bonita o, según la versión, un buen marido o
          una buena esposa. Nadie lo toma al pie de la letra, pero nadie quiere
          que el suyo sea el más feo de la vaporera. Y si un amigo coreano te
          pregunta <K>송편 먹었어요?</K> (¿comiste songpyeon?), no es una
          encuesta gastronómica: es una forma cariñosa de preguntar cómo te fue
          en Chuseok, algo así como el <K>미역국 먹었어?</K> del cumpleaños que
          te contamos en{" "}
          <Link
            href="/blog/sopa-de-algas-antes-de-un-examen-supersticion-coreana"
            className="text-seoul-red font-bold underline"
          >
            por qué en Corea nadie come sopa de algas antes de un examen
          </Link>
          .
        </p>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          La luna llena, los deseos y el 강강술래
        </h2>
        <p className="mb-10">
          De noche, la protagonista es la <K>보름달</K> (boreumdal), la luna
          llena: se la mira y se le pide un deseo, <K>소원을 빌다</K>. En el
          suroeste de Corea, bajo esa luna, las jóvenes se tomaban de la mano en
          un gran círculo y bailaban toda la noche, guiadas por una cantante
          principal: el <K>강강술래</K> (ganggangsullae). El nombre sale del
          estribillo y, lo más curioso, nadie sabe con certeza qué significa.
          Según la UNESCO, que lo inscribió en 2009 como Patrimonio Cultural
          Inmaterial de la Humanidad, era una de las pocas noches en que las
          muchachas podían salir y cantar en voz alta. Hoy lo mantienen vivo
          sobre todo mujeres adultas en las ciudades, y se enseña en las clases
          de música de la escuela primaria.
        </p>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          선물세트: el país donde el spam viene en caja de regalo
        </h2>
        <p className="mb-10">
          Semanas antes de <K>추석</K>, los supermercados se llenan de{" "}
          <K>선물세트</K> (seonmul seteu), sets de regalo: carne de res coreana,
          peras y manzanas enormes en caja individual, aceite, atún... y spam.
          Sí, spam, en caja elegante con manilla, y es un clásico entre los
          sets más vendidos de cada feriado. Llegó con el ejército
          estadounidense después de la Guerra de Corea, cuando la carne era un
          lujo, y desde 1987 se fabrica en el país. Para los prácticos están
          los sets de champú, jabón y pasta de dientes: el regalo que dice «te
          quiero, y quiero que te bañes».
        </p>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          El 추석 de hoy: aeropuerto, sofá y 명절 스트레스
        </h2>
        <p className="mb-6">
          Como toda tradición, <K>추석</K> cambió. Unos siguen viajando al{" "}
          <K>고향</K>; otros se van al extranjero, juntan a la familia en un
          restaurante o no se mueven del sofá. Y hay un lado B con nombre
          propio: <K>명절 스트레스</K>, el estrés del feriado. Horas de viaje,
          horas de cocina (que históricamente cayeron casi siempre sobre las
          mujeres) y las preguntas de los parientes: ¿cuándo te casas?, ¿ya
          tienes trabajo? En internet circulan «menús de sermones» (
          <K>명절 잔소리 메뉴판</K>) con precio para cada pregunta; en la
          versión que una app de pagos coreana estampó en poleras en 2025, la
          del matrimonio «costaba» 300.000 wones.
        </p>
        <p className="mb-10">
          Si te suena conocido, es porque lo es. La tía que en Navidad pregunta
          «¿y el pololo?» tiene una prima en Daegu.
        </p>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Mini-clase de coreano: el vocabulario de 추석
        </h2>
        <p className="mb-6">
          Un truco para la romanización: <em>eo</em> (seok, seong) es una o
          abierta, con la boca relajada y sin redondear los labios, y{" "}
          <em>eu</em> (boreum, seteu), una u con los labios estirados. Mejor aún: el{" "}
          <a href="/lector-coreano" className="text-seoul-red font-bold underline">
            Lector de Hangul gratis
          </a>{" "}
          te las pronuncia con voz nativa, y con{" "}
          <a href="/dubu" className="text-seoul-red font-bold underline">
            Dubu
          </a>{" "}
          armas sílabas como en un puzzle.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {vocabulario.map((e) => (
            <div
              key={e.kr}
              className="border-2 border-seoul-black bg-white shadow-[4px_4px_0_#0a0a0f] px-5 py-4"
            >
              <div className="text-2xl font-black text-seoul-red mb-1" style={KR}>
                {e.kr}
              </div>
              <div className="text-sm text-gray-400 italic mb-2">{e.rom}</div>
              <div className="text-base text-gray-700 leading-snug">{e.es}</div>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Frases para saludar en 추석
        </h2>
        <p className="mb-2">
          <span className="kr font-bold" style={KR}>추석 잘 보내세요!</span>{" "}
          <span className="text-gray-400 italic">(chuseok jal bonaeseyo)</span>
          <br />
          «¡Que pases un lindo Chuseok!», a profes, colegas y conocidos. Ojo:
          dicho de corrido, después de <K>추석</K> el <K>잘</K> suena tenso
          [<K>짤</K>]. A un amigo cercano: <K>추석 잘 보내!</K>
        </p>
        <p className="mb-2 mt-6">
          <span className="kr font-bold" style={KR}>즐거운 한가위 보내세요!</span>{" "}
          <span className="text-gray-400 italic">(jeulgeoun hangawi bonaeseyo)</span>
          <br />
          «¡Que tengas un feliz <K>한가위</K>!», la versión de tarjeta y de
          mensaje de empresa, junto a <K>풍성한 한가위 보내세요</K> («que
          tengas un <K>한가위</K> abundante»).
        </p>
        <p className="mb-2 mt-6">
          <span className="kr font-bold" style={KR}>송편 먹었어요?</span>{" "}
          <span className="text-gray-400 italic">(songpyeon meogeosseoyo?)</span>
          <br />
          «¿Comiste songpyeon?». Respuesta ideal: <K>네, 많이 먹었어요!</K>{" "}
          (¡sí, comí harto!).
        </p>
        <p className="mb-10 mt-6">
          <span className="kr font-bold" style={KR}>추석 잘 보내셨어요?</span>{" "}
          <span className="text-gray-400 italic">(chuseok jal bonaesyeosseoyo?)</span>
          <br />
          «¿Lo pasaste bien en Chuseok?», para cuando el feriado ya pasó. Si
          estás leyendo esto después de <K>추석</K>, es la que te toca.
        </p>

        <figure className="my-12 mx-auto max-w-md">
          <Image
            src="/blog/chuseok/chuseok_07.webp"
            alt="Lámina de Academia Seúl con la frase 추석 잘 보내세요!, su pronunciación [추석 짤 보내세요] y su traducción, ¡Que pases un lindo Chuseok!, desglosada palabra por palabra: 추석 (Chuseok), 잘 (bien), 보내세요 (que pases). Abajo, cuándo usarla y la pregunta 추석 잘 보내셨어요? para después del feriado."
            width={1080}
            height={1350}
            sizes="(max-width: 640px) 100vw, 448px"
            className="w-full h-auto border-2 border-seoul-black shadow-[6px_6px_0_#0a0a0f]"
          />
          <figcaption className="text-sm text-gray-500 mt-4 text-center">
            Guárdala para el próximo <K>추석</K>.
          </figcaption>
        </figure>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          추석 y Latinoamérica: parientes lejanos
        </h2>
        <p className="mb-10">
          En Chile, las Fiestas Patrias también vacían Santiago: carreteras
          llenas, familia reunida y mesa abundante (en 2026, el 18 y el{" "}
          <K>추석</K> quedaron a una semana). Y la parte de los antepasados tiene
          un primo en México: en el Día de Muertos, el 1 y el 2 de noviembre,
          las familias arman un altar con la comida favorita de sus difuntos y
          adornan sus tumbas. <K>추석</K> no gira en torno a la muerte, sino a
          la gratitud por la cosecha, pero la idea de fondo es la misma: a la
          mesa se invita también a los que ya no están. Por cierto, el feriado
          que sigue en el calendario coreano, el 3 de octubre, viene con{" "}
          <Link
            href="/blog/dangun-por-que-corea-nacio-de-una-osa"
            className="text-seoul-red font-bold underline"
          >
            una osa, un tigre y el mito de Dangún
          </Link>
          , y el 9 de octubre Corea celebra su alfabeto en{" "}
          <Link
            href="/blog/hangeulnal-el-dia-del-alfabeto-coreano"
            className="text-seoul-red font-bold underline"
          >
            <K>한글날</K>
          </Link>
          .
        </p>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Tu próximo 추석, en coreano
        </h2>
        <p className="mb-6">
          Ya sabes más de <K>추석</K> que muchos fans de los K-dramas. Para
          decir estas frases por tu cuenta, empieza gratis con el{" "}
          <a href="/lector-coreano" className="text-seoul-red font-bold underline">
            Lector de Hangul
          </a>
          , el juego{" "}
          <a href="/dubu" className="text-seoul-red font-bold underline">
            Dubu
          </a>
          , el{" "}
          <Link href="/taller" className="text-seoul-red font-bold underline">
            taller grabado de Hangul
          </Link>{" "}
          y el{" "}
          <Link href="/generador-nombre" className="text-seoul-red font-bold underline">
            generador de tu nombre en coreano
          </Link>
          , para firmar tu primer <K>추석 잘 보내세요</K>.
        </p>
        <p className="mb-10">
          Si prefieres clases en vivo, Básico 1 (A1.1) parte desde cero: ocho
          semanas, una clase de 60 minutos por semana por Zoom y certificado
          incluido. US$150 el curso completo · o 2 cuotas de US$75. Revisa las
          fechas de las{" "}
          <Link href="/nivel-1#clases" className="text-seoul-red font-bold underline">
            próximas clases
          </Link>
          .
        </p>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Preguntas frecuentes
        </h2>
        {faqs.map((f) => (
          <div key={f.q} className="mb-8">
            <h3 className="text-xl font-black text-seoul-black mb-2">{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}

        {/* CTA */}
        <div className="bg-seoul-black text-white border-2 border-seoul-black shadow-[8px_8px_0_#3D2EE8] px-8 py-10 mt-14 text-center">
          <p className="text-4xl font-black text-seoul-gold mb-3" style={KR}>
            한가위
          </p>
          <h3 className="text-2xl font-black mb-3">
            ¿Y si en el próximo 추석 saludas en coreano?
          </h3>
          <p className="text-white/70 mb-7 max-w-md mx-auto">
            Empieza hoy con el Lector de Hangul gratis o revisa las próximas
            clases de Básico 1: desde cero y en vivo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/lector-coreano"
              className="bg-[#E8B84B] text-seoul-black font-bold px-7 py-3.5 shadow-[4px_4px_0_rgba(255,255,255,0.2)] hover:-translate-y-0.5 transition-transform"
            >
              Lector de Hangul gratis →
            </a>
            <Link
              href="/nivel-1#clases"
              className="bg-seoul-red text-white font-bold px-7 py-3.5 shadow-[4px_4px_0_rgba(255,255,255,0.2)] hover:-translate-y-0.5 transition-transform"
            >
              Ver próximas clases →
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
          <p className="text-white/50 text-sm mt-4">추석 잘 보내셨어요, chingu? 🇰🇷</p>
        </div>
      </article>

      <Footer />
    </main>
  );
}
