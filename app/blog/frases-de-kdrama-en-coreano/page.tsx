import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const POST_URL = "https://www.academiaseul.com/blog/frases-de-kdrama-en-coreano";

const HEADLINE = "15 frases que escuchas en todos los K-dramas (y qué significan de verdad)";

const DESCRIPTION =
  "대박, 진짜?, 괜찮아, 보고 싶어, 오빠, 화이팅: 15 frases de K-drama, qué significan de verdad, cuándo no usarlas (반말) y su versión cortés.";

const IMG = "/blog/frases-de-kdrama-en-coreano";

export const metadata: Metadata = {
  // El layout añade " | Academia Seúl" (16 caracteres): título ≤ 44 para que el <title> final quede ≤ 60.
  title: "15 frases de K-drama y qué significan",
  description: DESCRIPTION,
  alternates: {
    canonical: POST_URL,
  },
  openGraph: {
    type: "article",
    title: HEADLINE,
    description:
      "Del 대박 al 오빠: lo que dicen literalmente, lo que quieren decir y cómo decirlas sin sonar mal educado fuera de la pantalla.",
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

/** Romanización (RR) como ayuda, siempre en gris. */
function Rom({ children }: { children: ReactNode }) {
  return <span className="text-gray-400 italic">({children})</span>;
}

function Linea({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mb-4 last:mb-0">
      <p className="text-xs font-bold tracking-wider uppercase text-seoul-red mb-1">{label}</p>
      <p className="text-base text-gray-700 leading-relaxed">{children}</p>
    </div>
  );
}

function Frase({
  n,
  kr,
  rom,
  literal,
  uso,
  ojo,
  cortes,
}: {
  n: number;
  kr: string;
  rom: string;
  literal: ReactNode;
  uso: ReactNode;
  ojo: ReactNode;
  cortes: ReactNode;
}) {
  return (
    <div className="border-2 border-seoul-black bg-white shadow-[4px_4px_0_#0a0a0f] px-5 py-5 mb-8">
      <h3 className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-4">
        <span className="text-sm font-black text-seoul-red">{String(n).padStart(2, "0")}</span>
        <span className="text-3xl font-black text-seoul-black kr break-keep" style={KR_FONT}>
          {kr}
        </span>
        <span className="text-base text-gray-400 italic font-normal">{rom}</span>
      </h3>
      <Linea label="Literal">{literal}</Linea>
      <Linea label="Cómo se usa">{uso}</Linea>
      <Linea label="Cuándo no">{ojo}</Linea>
      <Linea label="Versión cortés">{cortes}</Linea>
    </div>
  );
}

const chuleta = [
  { kr: "대박!", es: "¡Increíble!", cortes: "와, 대단하네요! · 대박 나세요!" },
  { kr: "진짜?", es: "¿En serio?", cortes: "정말요?" },
  { kr: "헐", es: "¡Plop!", cortes: "아, 정말요?" },
  { kr: "뭐야?", es: "¿Qué es esto? / ¿Qué te pasa?", cortes: "이게 뭐예요? · 왜 그러세요?" },
  { kr: "사랑해", es: "Te amo", cortes: "사랑해요 · 사랑합니다" },
  { kr: "보고 싶어", es: "Te extraño", cortes: "보고 싶어요" },
  { kr: "가지 마", es: "No te vayas", cortes: "가지 마세요" },
  { kr: "잘 자", es: "Buenas noches", cortes: "잘 자요 · 안녕히 주무세요" },
  { kr: "미안해", es: "Perdón", cortes: "미안해요 · 죄송합니다" },
  { kr: "괜찮아", es: "Estoy bien / ¿Estás bien?", cortes: "괜찮아요 · 괜찮으세요?" },
  { kr: "어떡해", es: "¡¿Y ahora qué hago?!", cortes: "어떡해요" },
  { kr: "아이고", es: "¡Ay, ay, ay!", cortes: "Sirve con todos" },
  { kr: "잠깐만", es: "¡Espera!", cortes: "잠깐만요 · 잠시만요" },
  { kr: "화이팅", es: "¡Ánimo!", cortes: "힘내세요" },
  { kr: "오빠", es: "Hermano mayor (lo dice ella)", cortes: "선배님 (en el trabajo)" },
];

const vocabulario = [
  {
    kr: "반말",
    rom: "banmal",
    es: "Habla informal: amigos de tu edad, pareja, menores. «Media habla».",
  },
  {
    kr: "존댓말",
    rom: "jondaenmal",
    es: "Habla respetuosa: desconocidos, mayores, trabajo.",
  },
  {
    kr: "대박 나세요",
    rom: "daebang naseyo",
    es: "¡Que le vaya increíble! El deseo para un negocio nuevo.",
  },
  {
    kr: "정말요?",
    rom: "jeongmallyo",
    es: "¿De verdad? La versión cuidada de 진짜?",
  },
  {
    kr: "죄송합니다",
    rom: "joesonghamnida",
    es: "Perdón, en serio y con respeto.",
  },
  {
    kr: "안녕히 주무세요",
    rom: "annyeonghi jumuseyo",
    es: "Buenas noches, dicho a los mayores.",
  },
  {
    kr: "잠깐만요",
    rom: "jamkkanmanyo",
    es: "Un momento, por favor. El «permiso» del metro.",
  },
  {
    kr: "힘내세요",
    rom: "himnaeseyo",
    es: "¡Ánimo!, con respeto. Entre amigos: 힘내.",
  },
  {
    kr: "선배님",
    rom: "seonbaenim",
    es: "Quien entró antes que tú al colegio, la universidad o el trabajo.",
  },
];

const faqs = [
  {
    q: "¿Qué significa 대박 en coreano?",
    a: "Es una exclamación de sorpresa: «¡increíble!», «¡bacán!», «¡no puede ser!». 대 significa «grande»; el origen del 박 no está claro. La explicación más popular lo liga a la calabaza llena de tesoros del cuento de 흥부, pero un artículo de la revista del Instituto Nacional de la Lengua Coreana la considera menos convincente que otras dos: la del «barco grande» (大舶) y la de la jerga de las apuestas. Es informal. Para desearle éxito a alguien, por ejemplo a quien abre un negocio, se dice 대박 나세요.",
  },
  {
    q: "¿Qué diferencia hay entre 반말 y 존댓말?",
    a: "반말 es el coreano informal, para amigos de tu edad, pareja, hermanos menores y niños. 존댓말 es el respetuoso, para desconocidos, personas mayores y el trabajo. Muchas veces la diferencia es un 요 al final: 미안해 es 반말 y 미안해요, 존댓말. Ante la duda, usa siempre 요 hasta que te digan que puedes hablar con confianza.",
  },
  {
    q: "¿Quién puede decir oppa?",
    a: "Solo una mujer: 오빠 es «hermano mayor» dicho por ella, y también se lo dice a un amigo mayor de confianza, a su pareja o a un idol. Un hombre le dice 형 a un hombre mayor. En el trabajo, por lo general, no se usa 오빠: a un compañero con más antigüedad se le dice 선배님 o se usa su cargo.",
  },
  {
    q: "¿Cómo se dice «te extraño» en coreano?",
    a: "보고 싶어 entre personas cercanas y 보고 싶어요 con respeto. Literalmente significa «quiero verte». Existe 그리워, «te añoro», pero suena más a poema o a canción; en la vida diaria todos dicen 보고 싶어.",
  },
  {
    q: "¿Se escribe 화이팅 o 파이팅?",
    a: "El diccionario estándar del coreano registra 파이팅, y el Instituto Nacional de la Lengua Coreana (국립국어원) recomienda reemplazarla por 힘내자. En la práctica se ven las dos y 화이팅 es muy común en redes, carteles y chats.",
  },
  {
    q: "¿Se puede aprender coreano viendo K-dramas?",
    a: "Sirven para entrenar el oído, aprender frases hechas y entender la cultura, pero no bastan solos: mucho de lo que se dice es 반말 cargado de emoción, los subtítulos esconden el cambio de registro y nadie te corrige. Lo ideal es combinarlos con clases donde practiques el coreano cortés del día a día.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: HEADLINE,
      description: DESCRIPTION,
      datePublished: "2026-10-15",
      dateModified: "2026-10-15",
      inLanguage: "es",
      mainEntityOfPage: { "@type": "WebPage", "@id": POST_URL },
      image: [
        "https://www.academiaseul.com/og-image.png",
        `https://www.academiaseul.com${IMG}/kdrama-pantalla-panuelos.png`,
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

export default function FrasesKdramaPost() {
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
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 text-xs font-bold tracking-wider uppercase mb-6">
            <Link href="/blog" className="text-white/50 hover:text-white transition-colors">
              ← Blog
            </Link>
            <span className="bg-seoul-red text-white px-3 py-1">K-drama</span>
            <span className="text-white/40">15 de octubre, 2026 · 10 min</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            <span className="block text-seoul-gold text-5xl md:text-7xl mb-3" style={KR_FONT}>
              대박
            </span>
            15 frases que escuchas en todos los K-dramas (y qué significan de verdad)
          </h1>
          <p className="text-white/70 text-lg leading-relaxed">
            Vas en el tercer capítulo y ya no necesitas subtítulos para entender
            cuando alguien grita <Kr>대박</Kr>, cuando la protagonista dice{" "}
            <Kr>괜찮아</Kr> con cara de que nada está bien o cuando él la toma de
            la muñeca y suelta un <Kr>가지 마</Kr>. Sabes más coreano del que
            crees. Aquí van las 15 frases que más se repiten: qué dicen
            literalmente, qué quieren decir de verdad y, lo más importante,
            cuándo no usarlas fuera de la pantalla.
          </p>
        </div>
      </section>

      {/* Body */}
      <article className="max-w-3xl mx-auto px-6 py-16 text-gray-800 leading-relaxed text-lg">

        {/* Antes de empezar */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Antes de empezar: los K-dramas hablan en <Kr>반말</Kr>
        </h2>
        <p className="mb-6">
          Desde Boys Over Flowers (<Kr>꽃보다 남자</Kr>, 2009) hasta hoy cambiaron
          los peinados y los celulares, pero no una cosa: en las escenas que
          importan se oye muchísimo <Kr>반말</Kr> <Rom>banmal</Rom>, el coreano
          informal, el que se usa con amigos de tu edad, con la pareja, con
          hermanos menores y con niños. Tiene lógica, porque los dramas viven de
          peleas, reconciliaciones y declaraciones, y nadie pelea a gritos en
          registro de oficina.
        </p>
        <p className="mb-6">
          El problema es que el <Kr>반말</Kr>, dicho a la persona equivocada,
          suena mal educado. Su contrario es el <Kr>존댓말</Kr>{" "}
          <Rom>jondaenmal</Rom>, el registro respetuoso. Los nombres lo
          explican: <Kr>반말</Kr> viene de <Kr>반</Kr>, «mitad», y{" "}
          <Kr>말</Kr>, «habla»: es «media habla», y el diccionario la define,
          en su primer sentido, como un habla a medio camino, que ni sube ni
          baja al otro. <Kr>존댓말</Kr> es el habla del <Kr>존대</Kr>, el trato
          respetuoso.
        </p>
        <p className="mb-6">
          La buena noticia: muchas veces la diferencia es una sola sílaba,{" "}
          <Kr>요</Kr>. <Kr>미안해</Kr> pasa a <Kr>미안해요</Kr>;{" "}
          <Kr>괜찮아</Kr>, a <Kr>괜찮아요</Kr>. Ese <Kr>요</Kr> lleva la frase
          al coreano cortés de todos los días, el que sirve con casi cualquier
          adulto. Para el jefe, los clientes o un discurso hay un nivel todavía
          más formal, el de las terminaciones en <Kr>-ㅂ니다</Kr>, como{" "}
          <Kr>감사합니다</Kr> y <Kr>죄송합니다</Kr>. Por qué la edad pesa tanto
          en esta elección lo contamos en{" "}
          <Link
            href="/blog/gestos-que-delatan-a-un-coreano"
            className="text-seoul-red font-bold underline underline-offset-4"
          >
            6 gestos que delatan a un coreano
          </Link>
          .
        </p>
        <p className="mb-10">
          Y un detalle que los subtítulos casi nunca muestran: en muchos dramas,
          el momento en que dos personajes dejan el <Kr>존댓말</Kr> y pasan al{" "}
          <Kr>반말</Kr> es un hito, casi un primer beso. Suele empezar con una
          pregunta: <Kr>우리 말 놓을까요?</Kr> <Rom>uri mal noeulkkayo</Rom>,
          algo así como «¿nos hablamos con confianza?». Como coreano que creció
          en Chile, te doy la regla segura: con un desconocido o con alguien
          mayor, siempre con <Kr>요</Kr>, hasta que te digan{" "}
          <Kr>말 편하게 하세요</Kr> <Rom>mal pyeonhage haseyo</Rom>, «háblame
          con confianza». Por eso, en cada frase te dejo su versión cortés.
        </p>

        <figure className="my-12 mx-auto max-w-xs">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${IMG}/kdrama-pantalla-panuelos.png`}
            alt="Ilustración de Academia Seúl: un televisor azul muestra a una pareja sonriente y, al lado, una caja de pañuelos con cara preocupada y una gota de sudor."
            width={640}
            height={640}
            loading="lazy"
            decoding="async"
            className="w-full h-auto"
          />
          <figcaption className="text-sm text-gray-500 mt-3 text-center">
            Pantalla, pañuelos y 15 frases: el kit básico de todo K-drama.
          </figcaption>
        </figure>

        <blockquote className="border-l-4 border-seoul-red bg-[#F4F7FF] px-6 py-5 my-10 text-seoul-black font-medium">
          En un K-drama, <Kr>괜찮아</Kr> casi nunca significa «estoy bien».
          Significa «pregúntame otra vez».
        </blockquote>

        {/* Sorpresa */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Las de sorpresa: <Kr>대박</Kr>, <Kr>진짜?</Kr>, <Kr>헐</Kr> y{" "}
          <Kr>뭐야</Kr>
        </h2>
        <p className="mb-8">
          Cuatro reacciones que oyes en cada capítulo, normalmente con zoom a la
          cara de quien las dice.
        </p>

        <Frase
          n={1}
          kr="대박"
          rom="daebak"
          literal={
            <>
              <Kr>대</Kr> es «grande» (大). El <Kr>박</Kr> es un misterio: la
              explicación más popular dice que es la calabaza del cuento de{" "}
              <Kr>흥부</Kr> (Heungbu), que al abrirse soltó un tesoro, pero un
              artículo de 2005 en la revista del Instituto Nacional de la Lengua
              Coreana la considera menos convincente que otras dos: la del
              «barco grande» (大舶) y la de la jerga de las apuestas, donde{" "}
              <Kr>박</Kr> era lo que ganaba quien llevaba la banca. Nadie lo sabe
              con certeza.
            </>
          }
          uso={
            <>
              «¡Increíble!», «¡bacán!», «¡no puede ser!». Va para una sorpresa
              de cumpleaños, un gol en el último minuto o un plato que te voló
              la cabeza: <Kr>이 떡볶이 대박이야!</Kr> («¡este tteokbokki está
              buenísimo!»). También puede sonar a «no lo puedo creer» ante algo
              malo, aunque para eso el rey es <Kr>헐</Kr>.
            </>
          }
          ojo={
            <>
              Es jerga. Si tu jefa termina una presentación o tu suegro te
              muestra su huerto, un <Kr>대박!</Kr> suena a comentario de amigo
              en la galería.
            </>
          }
          cortes={
            <>
              <Kr>와, 대단하네요!</Kr> <Rom>wa, daedanhaneyo</Rom>, «¡wow,
              impresionante!». Y una joya: <Kr>대박 나세요!</Kr> (se pronuncia
              daebang naseyo), «¡que le vaya increíble!», el deseo clásico para
              alguien que abre un negocio.
            </>
          }
        />

        <Frase
          n={2}
          kr="진짜?"
          rom="jinjja"
          literal={
            <>
              «¿Verdadero?». <Kr>진짜</Kr> es «lo auténtico», lo contrario de{" "}
              <Kr>가짜</Kr>, «lo falso».
            </>
          }
          uso={
            <>
              «¿En serio?», «¿de verdad?». Y como adverbio sirve para todo:{" "}
              <Kr>진짜 맛있어</Kr>, «está rico de verdad». La <Kr>ㅉ</Kr> es
              tensa: una especie de «ch» apretada, sin soltar aire.
            </>
          }
          ojo={
            <>
              <Kr>진짜?</Kr> a secas es <Kr>반말</Kr>. A una persona mayor que
              te cuenta algo, suena demasiado suelto.
            </>
          }
          cortes={
            <>
              <Kr>진짜요?</Kr> <Rom>jinjjayo</Rom> con gente de confianza. Con
              alguien mayor o en el trabajo, <Kr>정말요?</Kr> (suele sonar
              jeongmallyo), que suena más cuidado.
            </>
          }
        />

        <Frase
          n={3}
          kr="헐"
          rom="heol"
          literal={
            <>
              Nada. Es una interjección que se hizo masiva con internet y los
              mensajes de texto.
            </>
          }
          uso={
            <>
              Es el «¡plop!» de Condorito: lo que sale cuando algo te deja sin
              palabras, casi siempre por absurdo o por malo. El combo{" "}
              <Kr>헐, 대박</Kr> es incredulidad total.
            </>
          }
          ojo={
            <>
              Es muy de amigos y de gente joven. Un <Kr>헐</Kr> frente a tu
              profesora o a la mamá de tu pareja suena a falta de respeto.
            </>
          }
          cortes={
            <>
              No tiene. Cámbialo por <Kr>아, 정말요?</Kr> y deja que la cara de
              sorpresa haga el resto.
            </>
          }
        />

        <Frase
          n={4}
          kr="뭐야"
          rom="mwoya"
          literal={
            <>
              «¿Qué es?»: <Kr>뭐</Kr> (qué) + <Kr>야</Kr> (es, en{" "}
              <Kr>반말</Kr>).
            </>
          }
          uso={
            <>
              Depende del tono. Seco, es «¿qué te pasa?» o «¿y esto qué es?», al
              borde de la pelea. Alargado y con sonrisa, <Kr>뭐야~</Kr> es el
              «¡ay, ya po!» de cuando te dicen algo lindo y no sabes dónde
              meterte.
            </>
          }
          ojo={
            <>
              A una persona mayor, nunca como exclamación: <Kr>뭐야?</Kr> le
              suena a desafío.
            </>
          }
          cortes={
            <>
              Para la pregunta literal, <Kr>이게 뭐예요?</Kr>{" "}
              <Rom>ige mwoyeyo</Rom>, «¿qué es esto?». Para la sorpresa,{" "}
              <Kr>왜 그러세요?</Kr> <Rom>wae geureoseyo</Rom>, «¿qué le
              pasa?», que además suena preocupado y no desafiante. Fíjate que
              aquí no basta con pegar <Kr>요</Kr>: el <Kr>야</Kr> cambia a{" "}
              <Kr>예요</Kr>.
            </>
          }
        />

        {/* Corazón */}
        <h2 className="text-3xl font-black text-seoul-black mb-5 mt-14">
          Las del corazón: <Kr>사랑해</Kr>, <Kr>보고 싶어</Kr>,{" "}
          <Kr>가지 마</Kr> y <Kr>잘 자</Kr>
        </h2>
        <p className="mb-8">
          Las que vienen con música de piano y, a veces, con lluvia.
        </p>

        <Frase
          n={5}
          kr="사랑해"
          rom="saranghae"
          literal={
            <>
              «Amo». Sin «te» y sin «yo»: en coreano se sobreentienden.{" "}
              <Kr>사랑</Kr> (amor) + <Kr>해</Kr> (hago).
            </>
          }
          uso={
            <>
              «Te amo», y no solo a la pareja: a los hijos, a los papás (
              <Kr>엄마, 사랑해</Kr>) y, en un concierto, a miles de
              desconocidos a la vez. Dato de drama: muchas veces la primera
              confesión no es <Kr>사랑해</Kr>, sino <Kr>좋아해</Kr>{" "}
              <Rom>joahae</Rom>, «me gustas». <Kr>사랑해</Kr> llega después, y
              pesa.
            </>
          }
          ojo={
            <>
              Funciona en <Kr>반말</Kr> porque es íntimo. Si algún día se lo
              dices a tus suegros, que sea con <Kr>요</Kr>.
            </>
          }
          cortes={
            <>
              <Kr>사랑해요</Kr> <Rom>saranghaeyo</Rom>, la de las canciones y
              los mensajes a la familia. <Kr>사랑합니다</Kr>{" "}
              <Rom>saranghamnida</Rom>, la formal, la que se le dice a un
              público entero.
            </>
          }
        />

        <Frase
          n={6}
          kr="보고 싶어"
          rom="bogo sipeo"
          literal={
            <>
              «Quiero verte»: <Kr>보다</Kr> (ver) + <Kr>-고 싶다</Kr> (querer
              hacer algo). <Kr>싶어</Kr> se lee [<Kr>시퍼</Kr>]: la{" "}
              <Kr>ㅍ</Kr> se pasa a la sílaba siguiente.
            </>
          }
          uso={
            <>
              «Te extraño». Es la frase de los amores a distancia, y tiene
              versión para el monólogo: <Kr>보고 싶다</Kr> <Rom>bogo sipda</Rom>,
              dicha al aire, mirando la luna o un chat sin respuesta. Existe{" "}
              <Kr>그리워</Kr> <Rom>geuriwo</Rom>, «te añoro», pero suena a
              poema; en la vida diaria todos dicen <Kr>보고 싶어</Kr>.
            </>
          }
          ojo={
            <>
              A alguien mayor o con quien no tienes confianza, el{" "}
              <Kr>반말</Kr> sobra.
            </>
          }
          cortes={
            <>
              <Kr>보고 싶어요</Kr> <Rom>bogo sipeoyo</Rom>, que sirve hasta con
              la abuela: <Kr>할머니, 보고 싶어요</Kr>. Para alguien a quien le
              debes mucho respeto, como un profesor o una autoridad, existe el
              verbo humilde: <Kr>뵙고 싶어요</Kr> <Rom>boepgo sipeoyo</Rom>,
              «quisiera verlo».
            </>
          }
        />

        <Frase
          n={7}
          kr="가지 마"
          rom="gaji ma"
          literal={
            <>
              «No vayas»: <Kr>가다</Kr> (ir) + <Kr>-지 마</Kr> (no hagas).
            </>
          }
          uso={
            <>
              «¡No te vayas!». La escena es un clásico: aeropuerto, lluvia o
              paradero, y alguien que toma al otro de la muñeca. De yapa te
              regala un molde para decenas de frases: <Kr>울지 마</Kr>{" "}
              <Rom>ulji ma</Rom>, «no llores»; <Kr>걱정하지 마</Kr>{" "}
              <Rom>geokjeonghaji ma</Rom>, «no te preocupes».
            </>
          }
          ojo={
            <>
              Es una orden en <Kr>반말</Kr>. A un desconocido o a un mayor le
              suena brusca, por mucho que llueva.
            </>
          }
          cortes={
            <>
              <Kr>가지 마세요</Kr> <Rom>gaji maseyo</Rom>, y lo mismo con el
              resto: <Kr>걱정하지 마세요</Kr>, «no se preocupe».
            </>
          }
        />

        <Frase
          n={8}
          kr="잘 자"
          rom="jal ja"
          literal={
            <>
              «Duerme bien»: <Kr>잘</Kr> (bien) + <Kr>자</Kr> (duerme).
            </>
          }
          uso={
            <>
              «Buenas noches», el último mensaje del día entre pareja, amigos o
              hermanos. La versión cursi, muy de drama:{" "}
              <Kr>잘 자, 내 꿈 꿔</Kr> <Rom>jal ja, nae kkum kkwo</Rom>, «duerme
              bien y sueña conmigo».
            </>
          }
          ojo={
            <>
              A tus abuelos o a tu suegra, nunca. Y aquí ni siquiera basta con
              agregar <Kr>요</Kr>.
            </>
          }
          cortes={
            <>
              <Kr>안녕히 주무세요</Kr> <Rom>annyeonghi jumuseyo</Rom>, con{" "}
              <Kr>주무시다</Kr>, el verbo «dormir» de respeto: lo que dicen los
              nietos antes de irse a la cama. <Kr>잘 자요</Kr>{" "}
              <Rom>jal jayo</Rom> queda para alguien cercano con quien igual
              usas <Kr>요</Kr>.
            </>
          }
        />

        {/* Perdón y consuelo */}
        <h2 className="text-3xl font-black text-seoul-black mb-5 mt-14">
          Las de perdón y consuelo: <Kr>미안해</Kr> y <Kr>괜찮아</Kr>
        </h2>
        <p className="mb-8">
          Una que en los dramas suele llegar tarde, a veces recién en el
          penúltimo capítulo, y otra que se dice tanto que ya nadie se la cree.
        </p>

        <Frase
          n={9}
          kr="미안해"
          rom="mianhae"
          literal={
            <>
              Viene de 未安, «no tranquilo»: algo como «estoy intranquilo por lo
              que te hice».
            </>
          }
          uso={
            <>
              «Perdón», «lo siento», entre personas cercanas. En pantalla suele
              llegar después de diez capítulos de orgullo, con la voz quebrada.
            </>
          }
          ojo={
            <>
              Con un jefe, un profesor o un cliente, <Kr>미안해</Kr> (e incluso{" "}
              <Kr>미안해요</Kr>) se queda corto.
            </>
          }
          cortes={
            <>
              <Kr>미안해요</Kr> <Rom>mianhaeyo</Rom> con conocidos.{" "}
              <Kr>죄송합니다</Kr> <Rom>joesonghamnida</Rom> para disculparte en
              serio con alguien mayor, en el trabajo o en una tienda. Si pisas a
              alguien en el metro de Seúl, es la que va.
            </>
          }
        />

        <Frase
          n={10}
          kr="괜찮아"
          rom="gwaenchana"
          literal={
            <>
              «Está bien», «no está mal». La <Kr>ㅎ</Kr> de <Kr>찮</Kr> no
              suena: se dice [<Kr>괜차나</Kr>].
            </>
          }
          uso={
            <>
              Es pregunta y respuesta a la vez: <Kr>괜찮아?</Kr> («¿estás
              bien?») / <Kr>괜찮아</Kr> («estoy bien»). En los dramas, la regla
              es infalible: quien dice <Kr>괜찮아</Kr> con los ojos llorosos no
              está nada bien. Fuera de la pantalla, también sirve para rechazar
              algo con amabilidad: <Kr>괜찮아요</Kr> es «no, gracias, así
              estoy bien».
            </>
          }
          ojo={
            <>
              Es <Kr>반말</Kr>: no va con desconocidos ni con mayores.
            </>
          }
          cortes={
            <>
              <Kr>괜찮아요</Kr> <Rom>gwaenchanayo</Rom> para responder. Para
              preguntarle a una persona mayor si está bien,{" "}
              <Kr>괜찮으세요?</Kr> <Rom>gwaenchaneuseyo</Rom>.
            </>
          }
        />

        {/* Crisis */}
        <h2 className="text-3xl font-black text-seoul-black mb-5 mt-14">
          Las de crisis: <Kr>어떡해</Kr>, <Kr>아이고</Kr> y <Kr>잠깐만</Kr>
        </h2>
        <p className="mb-8">
          Para cuando el auto no frena, la suegra llega antes de tiempo o la
          puerta del ascensor se está cerrando.
        </p>

        <Frase
          n={11}
          kr="어떡해"
          rom="eotteokae"
          literal={
            <>
              «¿Cómo hago?»: es la contracción de <Kr>어떻게 해</Kr>. Se dice
              [<Kr>어떠캐</Kr>].
            </>
          }
          uso={
            <>
              «¡¿Y ahora qué hago?!», «¡chuta!». Se grita cuando algo se arruina
              y se susurra para acompañar una mala noticia ajena:{" "}
              <Kr>어떡해…</Kr>, «ay, pobre…». Ojo con la trampa ortográfica que
              confunde hasta a los coreanos: <Kr>어떡해</Kr> (qué hago) no es{" "}
              <Kr>어떻게</Kr> (cómo), el de <Kr>어떻게 지내?</Kr>{" "}
              <Rom>eotteoke jinae</Rom>, «¿cómo has estado?».
            </>
          }
          ojo={
            <>
              Con mayores, el <Kr>반말</Kr> sobra, aunque el mundo se esté
              acabando.
            </>
          }
          cortes={
            <>
              <Kr>어떡해요</Kr> <Rom>eotteokaeyo</Rom>.
            </>
          }
        />

        <Frase
          n={12}
          kr="아이고"
          rom="aigo"
          literal={<>Nada: es una interjección pura, sin significado propio.</>}
          uso={
            <>
              El «¡ay, ay, ay!» coreano: para el cansancio, el dolor, la pena,
              la sorpresa y hasta el alivio. <Kr>아이고, 허리야</Kr>{" "}
              <Rom>aigo, heoriya</Rom> es «¡ay, mi espalda!» y se dice al
              levantarse de la silla, a cualquier edad. Las abuelas también lo
              usan con ternura: <Kr>아이고, 우리 강아지!</Kr>, «¡ay, mi
              perrito!», dicho a los nietos. Sí, a los nietos.
            </>
          }
          ojo={
            <>
              No es <Kr>반말</Kr> ni <Kr>존댓말</Kr>, así que sirve frente a
              cualquiera. Eso sí: un <Kr>아이고</Kr> muy sentido en boca de alguien de veinte
              años puede hacer reír, porque suena a abuelo.
            </>
          }
          cortes={<>No necesita: sirve con todo el mundo.</>}
        />

        <Frase
          n={13}
          kr="잠깐만"
          rom="jamkkanman"
          literal={
            <>
              «Solo un momento»: <Kr>잠깐</Kr> (un momento) + <Kr>만</Kr>{" "}
              (solo).
            </>
          }
          uso={
            <>
              «¡Espera!». En el drama se grita justo antes de que alguien se
              suba a un taxi o se cierre la puerta del ascensor.
            </>
          }
          ojo={
            <>
              Dicho seco a una persona mayor, suena a que la estás frenando.
            </>
          }
          cortes={
            <>
              <Kr>잠깐만요</Kr> <Rom>jamkkanmanyo</Rom>, y es oro para viajar:
              en el metro de Seúl, cuando el vagón va lleno y te toca bajar,{" "}
              <Kr>잠깐만요</Kr> (o <Kr>잠시만요</Kr> <Rom>jamsimanyo</Rom>) es tu
              «permiso». <Kr>잠시만요</Kr> suena un poco más cuidado: es el que
              se oye en el trabajo y con clientes, junto con{" "}
              <Kr>잠시만 기다려 주세요</Kr> <Rom>jamsiman gidaryeo juseyo</Rom>,
              «espere un momento, por favor».
            </>
          }
        />

        {/* Intraducibles */}
        <h2 className="text-3xl font-black text-seoul-black mb-5 mt-14">
          Las que no se traducen: <Kr>화이팅</Kr> y <Kr>오빠</Kr>
        </h2>
        <p className="mb-8">
          Dos palabras que ya viven en el español de los fans, aunque no
          siempre signifiquen lo que creemos.
        </p>

        <Frase
          n={14}
          kr="화이팅"
          rom="hwaiting"
          literal={
            <>
              Del inglés <em>fighting</em>, «peleando». En inglés no se usa
              así: es inglés hecho en Corea.
            </>
          }
          uso={
            <>
              «¡Ánimo!», «¡tú puedes!», «¡vamos!»: antes de un examen, una
              entrevista o un partido, con el puño arriba. Sobre la ortografía:
              el diccionario estándar del coreano lo registra como{" "}
              <Kr>파이팅</Kr> y el Instituto Nacional de la Lengua Coreana
              recomienda decir <Kr>힘내자</Kr>. Aun así, en carteles, chats y en
              esta academia se sigue viendo <Kr>화이팅</Kr>.
            </>
          }
          ojo={
            <>
              No es <Kr>반말</Kr>, así que se le puede decir a casi cualquiera.
              Pero a alguien mayor que lo está pasando mal, un grito de estadio
              puede sonar fuera de lugar.
            </>
          }
          cortes={
            <>
              <Kr>힘내세요</Kr> <Rom>himnaeseyo</Rom>, «¡ánimo!», con respeto
              y cariño. Entre amigos, <Kr>힘내</Kr> <Rom>himnae</Rom>.
            </>
          }
        />

        <figure className="my-12 mx-auto max-w-xs">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${IMG}/hwaiting.png`}
            alt="Ilustración de Academia Seúl: un joven con polerón azul sonríe y levanta el puño en señal de ánimo, el gesto de 화이팅."
            width={640}
            height={640}
            loading="lazy"
            decoding="async"
            className="w-full h-auto"
          />
          <figcaption className="text-sm text-gray-500 mt-3 text-center">
            El puño arriba es obligatorio. El grito, opcional.
          </figcaption>
        </figure>

        <Frase
          n={15}
          kr="오빠"
          rom="oppa"
          literal={<>«Hermano mayor», dicho por una mujer.</>}
          uso={
            <>
              Ella se lo dice a su hermano mayor, a un amigo mayor de confianza,
              al pololo (el novio, para quienes no son de Chile) y, sí, a los
              idols. Un hombre le dice <Kr>형</Kr> <Rom>hyeong</Rom> a un hombre
              mayor. Y ojo con la pronunciación: la <Kr>ㅃ</Kr> es una p seca,
              sin soplar aire, como te contamos en{" "}
              <Link
                href="/blog/como-se-pronuncia-seul-en-coreano"
                className="text-seoul-red font-bold underline underline-offset-4"
              >
                cómo se pronuncia <Kr>서울</Kr>
              </Link>
              .
            </>
          }
          ojo={
            <>
              Si eres hombre, no: es <Kr>형</Kr>, a menos que quieras hacer
              reír a toda la mesa. Y en el trabajo, por lo general, ni ellas lo
              usan con un colega mayor.
            </>
          }
          cortes={
            <>
              <Kr>오빠</Kr> no tiene versión con <Kr>요</Kr>: es una relación,
              no una terminación. Fuera de la confianza, a un compañero con más
              antigüedad se le dice <Kr>선배님</Kr> <Rom>seonbaenim</Rom>, o se
              usa su cargo.
            </>
          }
        />

        <figure className="my-12 mx-auto max-w-xs">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${IMG}/oppa.png`}
            alt="Ilustración de Academia Seúl: una niña con moños y polera amarilla señala sonriendo a un joven mayor con polerón azul, su 오빠."
            width={640}
            height={640}
            loading="lazy"
            decoding="async"
            className="w-full h-auto"
          />
          <figcaption className="text-sm text-gray-500 mt-3 text-center">
            El <Kr>오빠</Kr> original: el hermano mayor de verdad.
          </figcaption>
        </figure>

        {/* Chuleta */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          La chuleta: las 15 frases y su versión cortés
        </h2>
        <p className="mb-6">
          Para la próxima maratón, o para cuando estés en Seúl y no quieras
          tratar de tú al abuelo del almacén.
        </p>
        <div className="overflow-x-auto border-2 border-seoul-black shadow-[4px_4px_0_#0a0a0f] mb-10">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-seoul-black text-white">
                <th className="px-3 py-2 font-bold">Frase</th>
                <th className="px-3 py-2 font-bold">Qué significa</th>
                <th className="px-3 py-2 font-bold">Versión cortés</th>
              </tr>
            </thead>
            <tbody>
              {chuleta.map((c) => (
                <tr key={c.kr} className="border-t border-seoul-black/15 align-top">
                  <td className="px-3 py-2 font-black text-seoul-red whitespace-nowrap" style={KR_FONT}>
                    {c.kr}
                  </td>
                  <td className="px-3 py-2 text-gray-700">{c.es}</td>
                  <td className="px-3 py-2 text-gray-700 kr break-keep" style={KR_FONT}>
                    {c.cortes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <blockquote className="border-l-4 border-seoul-red bg-[#F4F7FF] px-6 py-5 my-10 text-seoul-black font-medium">
          Los K-dramas te enseñan cómo hablan los coreanos entre ellos. La
          sílaba <Kr>요</Kr> te enseña cómo hablarles a ellos.
        </blockquote>

        {/* Cómo aprender con dramas */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Cómo sacarle coreano a tu próxima maratón
        </h2>
        <ul className="list-disc pl-6 mb-10 space-y-3">
          <li>
            <strong>Caza el <Kr>요</Kr>.</strong> Cada vez que un personaje le
            hable a alguien mayor, fíjate en cómo terminan sus frases. Cuando
            dos personajes pasen al <Kr>반말</Kr>, ya sabrás que algo cambió
            entre ellos, aunque el subtítulo no lo diga.
          </li>
          <li>
            <strong>Repite en voz alta.</strong> Pausa y di la frase con la
            misma entonación del actor. Empieza por las cortas de esta lista:{" "}
            <Kr>대박</Kr>, <Kr>진짜?</Kr>, <Kr>잠깐만</Kr>.
          </li>
          <li>
            <strong>Lee lo que escuchas.</strong> Si la plataforma ofrece
            subtítulos en coreano, actívalos en una escena que ya viste. Para
            eso necesitas leer Hangul, y se aprende antes de lo que crees.
          </li>
          <li>
            <strong>Practica con personas.</strong> El drama no te corrige ni te
            avisa cuando tu <Kr>반말</Kr> suena a falta de respeto. Una clase,
            sí.
          </li>
        </ul>

        {/* Vocabulario */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Mini-clase de coreano: las palabras para salir de la pantalla
        </h2>
        <p className="mb-6">
          Lo que no te enseña el drama, pero sí la vida real. Si todavía no lees
          Hangul, el{" "}
          <a href="/lector-coreano" className="text-seoul-red font-bold underline underline-offset-4">
            Lector de Hangul
          </a>{" "}
          y{" "}
          <a href="/dubu" className="text-seoul-red font-bold underline underline-offset-4">
            Dubu, nuestro puzzle del Hangul
          </a>{" "}
          te enseñan gratis.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {vocabulario.map((e) => (
            <div
              key={e.kr}
              className="border-2 border-seoul-black bg-white shadow-[4px_4px_0_#0a0a0f] px-5 py-4"
            >
              <div className="text-2xl font-black text-seoul-red mb-1 kr break-keep" style={KR_FONT}>
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
          Para seguir gratis tienes el{" "}
          <a href="/lector-coreano" className="text-seoul-red font-bold underline underline-offset-4">
            Lector de Hangul
          </a>
          ,{" "}
          <a href="/dubu" className="text-seoul-red font-bold underline underline-offset-4">
            Dubu
          </a>
          , el{" "}
          <Link href="/taller" className="text-seoul-red font-bold underline underline-offset-4">
            taller gratis de Hangul
          </Link>{" "}
          y{" "}
          <Link href="/generador-nombre" className="text-seoul-red font-bold underline underline-offset-4">
            tu nombre en coreano
          </Link>
          . Y cuando quieras clases en vivo, Básico 1 (A1.1) parte desde cero:
          aprendes a leer el Hangul completo, a presentarte y a hablar con{" "}
          <Kr>요</Kr>, el coreano cortés que sirve con casi todo el mundo. Si ya
          te defiendes y quieres soltarte a conversar con una profesora nativa,
          está Conversacional 1 (A2.1), al que llegas desde Básico 2 (A1.2) o
          con un test de nivel. US$150 el curso completo · o 2 cuotas de US$75.
          Revisa las{" "}
          <Link href="/nivel-1#clases" className="text-seoul-red font-bold underline underline-offset-4">
            próximas clases
          </Link>
          .
        </p>

        {/* CTA */}
        <div className="bg-seoul-black text-white border-2 border-seoul-black shadow-[8px_8px_0_#3D2EE8] px-8 py-10 mt-14 text-center">
          <p className="text-4xl font-black text-seoul-gold mb-3" style={KR_FONT}>
            진짜?
          </p>
          <h3 className="text-2xl font-black mb-3">
            ¿Y si el próximo 대박 lo entiendes sin subtítulos?
          </h3>
          <p className="text-white/70 mb-7 max-w-md mx-auto">
            Aprende a leer el Hangul gratis con el Lector, o súmate a Básico 1
            (A1.1): desde cero, en vivo y con profe, para pasar del{" "}
            <Kr>반말</Kr> de la pantalla al coreano de verdad.
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
          <p className="text-white/50 text-sm mt-6">화이팅 chingu! 🇰🇷</p>
        </div>
      </article>

      <Footer />
    </main>
  );
}
