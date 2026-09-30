import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const POST_URL =
  "https://www.academiaseul.com/blog/como-se-pronuncia-seul-en-coreano";

const DESCRIPTION =
  "En coreano, Seúl no se dice «Se-úl»: es 서울, dos sílabas parejas con la vocal ㅓ y una l final como la de «sol». Y tres palabras que solemos pronunciar mal.";

const HEADLINE = "En coreano, Seúl no se dice «Se-úl»: así se pronuncia 서울";

export const metadata: Metadata = {
  // El layout añade " | Academia Seúl" (16 caracteres): título ≤ 44 para que el <title> final quede ≤ 60.
  title: "Cómo se pronuncia Seúl en coreano: 서울",
  description: DESCRIPTION,
  alternates: {
    canonical: POST_URL,
  },
  openGraph: {
    type: "article",
    title: HEADLINE,
    description:
      "Dos sílabas que pesan igual, una vocal que el español no tiene y una l que no suelta nada. Más 감사합니다, 안녕하세요 y 오빠.",
    url: POST_URL,
    siteName: "Academia Seúl",
    locale: "es_CL",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Academia Seúl" }],
  },
};

/** Texto en hangul con la fuente coreana (mismo marcado que los otros artículos). */
function Kr({ children }: { children: ReactNode }) {
  return (
    <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
      {children}
    </span>
  );
}

// Las pistas son las mismas del Lector de Hangul (pestaña Alfabeto).
const vocales = [
  { kr: "ㅓ", pista: "o abierta, boca relajada", nota: "La de 서. No existe en español." },
  { kr: "ㅗ", pista: "o de oso, labios redondos", nota: "La de 오빠. Esta sí es nuestra o." },
  { kr: "ㅜ", pista: "u de uva", nota: "La de 울. Labios redondos, hacia adelante." },
];

const chuleta = [
  {
    kr: "서울",
    rom: "seoul",
    suena: "[서울]",
    es: "Seúl. Dos sílabas parejas, ㅓ relajada y una l final como la de «sol».",
  },
  {
    kr: "감사합니다",
    rom: "gamsahamnida",
    suena: "[감사함니다]",
    es: "Gracias (formal). La ㅂ antes de ㄴ se dice ㅁ.",
  },
  {
    kr: "안녕하세요",
    rom: "annyeonghaseyo",
    suena: "[안녕하세요]",
    es: "Hola (con respeto). Dos n, ㅕ relajada y una ㅎ suave.",
  },
  {
    kr: "오빠",
    rom: "oppa",
    suena: "[오빠]",
    es: "Hermano mayor, dicho por una mujer. ㅗ redonda y ㅃ seca.",
  },
];

const faq = [
  {
    q: "¿Está mal decir «Seúl» en español?",
    a: "No. Seúl, con tilde, es el nombre de la ciudad en español: así aparece en la lista de países y capitales del Diccionario panhispánico de dudas (RAE y ASALE). Es como decir Londres y no London. Solo cuando hablas coreano conviene decir 서울, a la coreana.",
  },
  {
    q: "¿Cuántas sílabas tiene 서울 y por qué se escribe Seoul?",
    a: "Dos, 서 y 울, y pesan igual. La «eo» de Seoul son dos letras para una sola vocal, ㅓ: la Romanización Revisada, oficial en Corea del Sur desde el año 2000, la escribe así porque el alfabeto latino básico no tiene una letra para ese sonido. Decir «Se-o-úl» agrega una sílaba que no existe.",
  },
  {
    q: "¿Por qué 감사합니다 se pronuncia con m?",
    a: "Por la asimilación nasal: una ㄱ, ㄷ o ㅂ al final de sílaba, antes de ㄴ o ㅁ, se pronuncia ㅇ, ㄴ o ㅁ. La ㅂ de 합 va antes de la ㄴ de 니, así que suena [감사함니다]. Es una regla de la pronunciación estándar, y por eso la romanización oficial escribe gamsahamnida.",
  },
  {
    q: "¿Qué significa 서울?",
    a: "Es una palabra coreana nativa que desde hace siglos significa «capital», y los diccionarios coreanos todavía la registran con ese sentido. En 1946 pasó a ser el nombre oficial de la ciudad. A diferencia de la mayoría de los lugares de Corea, no tiene caracteres chinos propios: se escribe solo en hangul.",
  },
  {
    q: "¿Dónde puedo escuchar 서울 en coreano gratis?",
    a: "En el Lector de Hangul de Academia Seúl: en Practicar → Palabras está 서울 con audio en voz coreana, y en la pestaña Alfabeto puedes escuchar ㅓ, ㅗ y ㅜ una por una. Es gratis y funciona en el navegador del celular.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: HEADLINE,
      description: DESCRIPTION,
      datePublished: "2026-09-30",
      dateModified: "2026-09-30",
      inLanguage: "es",
      mainEntityOfPage: { "@type": "WebPage", "@id": POST_URL },
      image: ["https://www.academiaseul.com/og-image.png"],
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
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function SeulPronunciacionPost() {
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
            <span className="bg-seoul-red text-white px-3 py-1">Pronunciación</span>
            <span className="text-white/40">30 de septiembre, 2026 · 9 min</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            <span
              className="block text-seoul-gold text-5xl md:text-7xl mb-3"
              style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
            >
              서울
            </span>
            En coreano, Seúl no se dice &ldquo;Se-úl&rdquo;: así se pronuncia{" "}
            <Kr>서울</Kr>
          </h1>
          <p className="text-white/70 text-lg leading-relaxed">
            Confesión de la casa: nuestra academia se llama Seúl… y en coreano no
            se dice así. En español, &ldquo;Seúl&rdquo; está perfecto. Pero cuando
            hablas coreano la ciudad es <Kr>서울</Kr>: dos sílabas que pesan
            igual, una vocal que el español no tiene y una l final que no suelta
            nada. Aquí va sílaba por sílaba, con tres palabras más que casi todos
            pronunciamos mal al principio.
          </p>
        </div>
      </section>

      {/* Body */}
      <article className="max-w-3xl mx-auto px-6 py-16 text-gray-800 leading-relaxed text-lg">

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Seúl, Seoul, 서울: tres nombres para una ciudad
        </h2>
        <p className="mb-6">
          Haz la prueba: dile a un amigo coreano &ldquo;me muero por conocer
          Se-ÚL&rdquo;, con toda la fuerza en la ú. Te va a entender, porque es
          amable y porque lo ha escuchado mil veces. Pero lo que oye es una
          palabra en español. En su idioma la ciudad es <Kr>서울</Kr>, y no suena
          ni como nuestra versión ni como la del inglés.
        </p>
        <p className="mb-10">
          Ojo: en español lo correcto es <strong>Seúl</strong>, con tilde. Así
          aparece en la lista de países y capitales del{" "}
          <em>Diccionario panhispánico de dudas</em>, de la RAE y la Asociación
          de Academias de la Lengua Española. Es como decir
          Londres y no London: cada idioma tiene su nombre para las ciudades
          importantes. El problema aparece solo cuando hablas coreano y le pones
          a <Kr>서울</Kr> el acento de Seúl.
        </p>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          ¿Y de dónde sale Seoul, con esa &ldquo;eo&rdquo;?
        </h2>
        <p className="mb-6">
          En el siglo XIX, en tiempos de la dinastía Joseon, los misioneros
          católicos franceses escribían{" "}
          <em>Séoul</em> (en francés suena &ldquo;se-ul&rdquo;), y esa forma se
          quedó en muchos idiomas. En el año 2000, Corea del Sur adoptó la{" "}
          <strong>Romanización Revisada</strong> del coreano: como el alfabeto
          latino básico no tiene una letra para la vocal <Kr>ㅓ</Kr> y el sistema
          evita los signos especiales, la escribe con dos letras, <em>eo</em>. El
          sistema anterior, McCune-Reischauer, usaba una o con una curvita
          encima: <em>Sŏul</em>.
        </p>
        <p className="mb-6">
          Resultado: Seoul parece de tres sílabas, pero en coreano son dos. Y en
          inglés se pronuncia igual que <em>soul</em>, &ldquo;alma&rdquo;, en una
          sola sílaba. Ninguna de esas versiones es la coreana.
        </p>
        <p className="mb-10">
          Dato para la sobremesa: <Kr>서울</Kr> es una palabra coreana{" "}
          <strong>nativa</strong>. Desde hace siglos es un sustantivo común que
          significa &ldquo;capital&rdquo; (los diccionarios coreanos todavía lo
          registran así), y en 1946 pasó a ser el nombre oficial de la ciudad.
          Por eso, a diferencia de la mayoría de los lugares de Corea, no tiene
          caracteres chinos propios. Tanto así que en chino se siguió usando el
          nombre antiguo, <Kr>漢城</Kr>, hasta que en 2005 el gobierno de Seúl
          adoptó <Kr>首爾</Kr>, que en mandarín se lee <em>Shǒu&apos;ěr</em> y
          suena parecido a <Kr>서울</Kr>.
        </p>

        <blockquote className="border-l-4 border-seoul-red bg-[#F4F7FF] px-6 py-5 my-10 text-seoul-black font-medium">
          &ldquo;Seoul&rdquo; es la romanización oficial, no una guía de cómo
          suena. La guía es el hangul: <Kr>서울</Kr>.
        </blockquote>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Cómo se pronuncia 서울, sílaba por sílaba
        </h2>

        <h3 className="text-2xl font-black text-seoul-black mb-4">
          1. Dos sílabas que pesan igual
        </h3>
        <p className="mb-8">
          En español, Seúl es aguda: la fuerza cae en la ú. En coreano no hay
          golpe: <Kr>서</Kr> y <Kr>울</Kr> pesan lo mismo. El coreano de Seúl, la
          base del coreano estándar, no marca una sílaba tónica en cada palabra
          como hacemos nosotros: no tiene pares como <em>papa</em> y{" "}
          <em>papá</em>. Dilo parejo pero natural: ni <Kr>울</Kr> golpeada, ni{" "}
          <Kr>서</Kr> estirada, ni voz de robot.
        </p>

        <h3 className="text-2xl font-black text-seoul-black mb-4">
          2. 서: la vocal ㅓ, que el español no tiene
        </h3>
        <p className="mb-6">
          <Kr>서</Kr> es <Kr>ㅅ</Kr> (una s como la nuestra) más <Kr>ㅓ</Kr>, la
          estrella del día. Abre la boca como para decir &ldquo;a&rdquo;… y di
          &ldquo;o&rdquo;, sin redondear los labios. Te sale una{" "}
          <strong>o abierta, con la boca relajada</strong>: la misma pista que
          usamos en el Lector de Hangul.
        </p>
        <p className="mb-6">
          Su gemela peligrosa es <Kr>ㅗ</Kr>, la &ldquo;o de oso&rdquo;, con los
          labios redondos. Si dices <Kr>서</Kr> con los labios en trompita, te
          sale <Kr>소</Kr>, que es &ldquo;vaca&rdquo;. Y <Kr>서울</Kr> se
          vuelve <Kr>소울</Kr>, que es como se escribe en coreano el{" "}
          <em>soul</em> del inglés, el de la música. O sea: querías ir a Seúl y
          terminaste pidiendo un disco de soul. En coreano los sonidos pesan, y
          mucho. Si no, pregúntale al{" "}
          <Link
            href="/blog/por-que-en-corea-no-existe-el-piso-4"
            className="text-seoul-red font-bold underline"
          >
            piso 4 de los ascensores coreanos
          </Link>
          .
        </p>

        <div className="grid grid-cols-3 gap-3 mb-8">
          {vocales.map((v) => (
            <div
              key={v.kr}
              className="border-2 border-seoul-black bg-white shadow-[4px_4px_0_#0a0a0f] px-2 py-4 text-center"
            >
              <div
                className="text-4xl font-black text-seoul-red mb-1"
                style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
              >
                {v.kr}
              </div>
              <div className="text-sm font-bold text-gray-700 leading-snug mb-1">
                {v.pista}
              </div>
              <div className="text-xs text-gray-400 leading-snug">{v.nota}</div>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-black text-seoul-black mb-4">
          3. 울: una u redonda y la &ldquo;l&rdquo; de &ldquo;sol&rdquo;
        </h3>
        <p className="mb-6">
          <Kr>울</Kr> empieza con <Kr>ㅇ</Kr>, que al inicio de sílaba es muda:
          solo ocupa el lugar. Sigue <Kr>ㅜ</Kr>, la &ldquo;u de uva&rdquo;, con
          los labios redondos. Y cierra con <Kr>ㄹ</Kr>, que al final de la
          sílaba es prácticamente la l de <strong>&ldquo;sol&rdquo;</strong>: la
          lengua sube detrás de los dientes de arriba y se queda ahí.
        </p>
        <p className="mb-8">
          Lo que no hay que hacer es soltar algo después: ni una vocal
          (&ldquo;Seúle&rdquo;) ni una r (&ldquo;Seúr&rdquo;). Piensa en cómo
          terminas &ldquo;sol&rdquo; o &ldquo;papel&rdquo;: exactamente así
          termina <Kr>울</Kr>.
        </p>

        <h3 className="text-2xl font-black text-seoul-black mb-4">
          4. Todo junto
        </h3>
        <p className="mb-8">
          Dos sílabas, mismo peso: <Kr>서</Kr>… <Kr>울</Kr>. Ahora sin la pausa:{" "}
          <Kr>서울</Kr>. Repítelo tres veces en voz alta. Si alguien en la micro
          te mira raro, es parte del proceso.
        </p>

        <h3 className="text-2xl font-black text-seoul-black mb-4">
          Bonus: la ㄹ camaleón
        </h3>
        <p className="mb-10">
          Si después de la <Kr>ㄹ</Kr> viene una vocal, se muda a la sílaba
          siguiente y se vuelve una r suave, como la de &ldquo;pero&rdquo;. Por
          eso <Kr>서울에 가요</Kr> (&ldquo;voy a Seúl&rdquo;) suena{" "}
          <Kr>[서우레 가요]</Kr>. Los corchetes indican cómo suena, escrito en
          hangul, igual que en los diccionarios coreanos.
        </p>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          El error típico: Se-ÚL, Se-o-úl o Soul
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Se-ÚL:</strong> español puro. Una e en vez de <Kr>ㅓ</Kr> y
            todo el golpe en la ú.
          </li>
          <li>
            <strong>Se-o-úl:</strong> leer la romanización letra por letra. La
            &ldquo;eo&rdquo; se vuelve dos vocales y aparece una sílaba de más.
          </li>
          <li>
            <strong>Soul:</strong> la versión en inglés. Una sola sílaba y, en
            coreano, otra palabra.
          </li>
        </ul>
        <p className="mb-10">
          Los tres nacen de leer <Kr>서울</Kr> con el alfabeto latino. La
          solución es leerlo en hangul, que se aprende más rápido de lo que
          crees: te contamos por qué en{" "}
          <Link
            href="/blog/hangul-el-alfabeto-mas-cientifico"
            className="text-seoul-red font-bold underline"
          >
            Hangul: el alfabeto que un rey inventó para su pueblo
          </Link>
          .
        </p>

        <blockquote className="border-l-4 border-seoul-red bg-[#F4F7FF] px-6 py-5 my-10 text-seoul-black font-medium">
          Una vocal nueva no se aprende leyendo sobre ella: se aprende
          escuchándola cien veces y diciéndola otras cien. La buena noticia es
          que <Kr>서울</Kr> tiene solo dos sílabas.
        </blockquote>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Tres palabras más que solemos pronunciar mal
        </h2>
        <p className="mb-8">
          Estas tres aparecen en tus primeras semanas de coreano (y en casi
          cualquier K-drama), y casi todos las decimos a la española al
          principio.
        </p>

        <h3 className="text-2xl font-black text-seoul-black mb-4">
          감사합니다: se escribe ㅂ, se dice ㅁ
        </h3>
        <p className="mb-6">
          &ldquo;Gracias&rdquo;, en formal. Se escribe <Kr>감사합니다</Kr>, pero
          se dice <Kr>[감사함니다]</Kr>: la <Kr>ㅂ</Kr> de <Kr>합</Kr> se vuelve{" "}
          <Kr>ㅁ</Kr> porque la sigue una <Kr>ㄴ</Kr>. Es la{" "}
          <strong>asimilación nasal</strong>: una <Kr>ㄱ</Kr>, <Kr>ㄷ</Kr> o{" "}
          <Kr>ㅂ</Kr> al final de sílaba, seguida de una <Kr>ㄴ</Kr> o una{" "}
          <Kr>ㅁ</Kr>, se contagia y suena <Kr>ㅇ</Kr>, <Kr>ㄴ</Kr> o{" "}
          <Kr>ㅁ</Kr>. No es un descuido: está en las normas oficiales de
          pronunciación del coreano estándar (<Kr>표준 발음법</Kr>, artículo 18).
        </p>
        <p className="mb-8">
          El español hace algo parecido sin avisarte: di &ldquo;un beso&rdquo;
          rápido y esa n te sale como m. En coreano pasa siempre, y por eso la
          romanización oficial lo escribe con m: <em>gamsahamnida</em>. Regla de
          bolsillo: todo lo que termina en <Kr>-ㅂ니다</Kr> suena{" "}
          <Kr>[-ㅁ니다]</Kr>. Y la <Kr>ㅎ</Kr> del medio es suave, casi un
          suspiro: nada de jota fuerte.
        </p>

        <h3 className="text-2xl font-black text-seoul-black mb-4">
          안녕하세요: dos n, una ㅓ escondida y una h tímida
        </h3>
        <ul className="list-disc pl-6 mb-8 space-y-2">
          <li>
            <strong>Dos n.</strong> La primera cierra <Kr>안</Kr> y la segunda
            abre <Kr>녕</Kr>; no se funden en una. Y la segunda, pegada a la y,
            suena casi como nuestra ñ.
          </li>
          <li>
            <strong><Kr>ㅕ</Kr> es y + <Kr>ㅓ</Kr>:</strong> la misma vocal
            relajada de <Kr>서울</Kr>. Si la dices como el &ldquo;yo&rdquo;
            español, con los labios redondos, te sale <Kr>ㅛ</Kr>, que es otra
            vocal.
          </li>
          <li>
            <strong>La <Kr>ㅇ</Kr> final de <Kr>녕</Kr></strong> suena como la n
            de &ldquo;banco&rdquo; o &ldquo;tengo&rdquo;, sin decir la g.
          </li>
          <li>
            <strong>La <Kr>ㅎ</Kr> de <Kr>하</Kr></strong> es suave, y en el
            habla rápida muchos coreanos casi no la pronuncian. Tú dila suave y
            vas bien.
          </li>
        </ul>

        <h3 className="text-2xl font-black text-seoul-black mb-4">
          오빠: ㅗ redonda y una p seca
        </h3>
        <p className="mb-4">
          La palabra estrella de los K-dramas. Significa &ldquo;hermano
          mayor&rdquo;, pero solo si lo dice una mujer; en confianza, ella
          también se lo dice a un chico algo mayor. (Un hombre, a su hermano
          mayor, le dice <Kr>형</Kr>.)
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong><Kr>ㅗ</Kr></strong> es la &ldquo;o de oso&rdquo;: aquí sí va
            nuestra o, bien redonda.
          </li>
          <li>
            <strong><Kr>ㅃ</Kr></strong> es una p tensa, con los labios apretados
            y sin soplar aire: la &ldquo;p seca&rdquo; del Lector. Justo antes
            hay un mini freno: la <Kr>오</Kr> sale cortita, los labios se
            cierran un instante y la p sale sin aire.
          </li>
          <li>
            <strong>Sin golpe:</strong> nada de &ldquo;Ó-pa&rdquo; a la
            española, con toda la fuerza en la o. Si el <Kr>빠</Kr> te sale un
            pelito más agudo, vas bien: en el coreano de Seúl, las sílabas que
            empiezan con una consonante tensa como <Kr>ㅃ</Kr> suelen sonar
            más altas.
          </li>
        </ul>
        <p className="mb-8">
          Y ojo con la vocal: si cambias <Kr>ㅗ</Kr> por <Kr>ㅏ</Kr>, dices{" "}
          <Kr>아빠</Kr>, que es &ldquo;papá&rdquo;. En la fila para conocer a tu
          idol, la diferencia importa.
        </p>

        <h3 className="text-2xl font-black text-seoul-black mb-4">
          La chuleta
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {chuleta.map((p) => (
            <div
              key={p.kr}
              className="border-2 border-seoul-black bg-white shadow-[4px_4px_0_#0a0a0f] px-5 py-4"
            >
              <div
                className="text-2xl font-black text-seoul-red mb-1"
                style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
              >
                {p.kr}
              </div>
              <div className="text-sm text-gray-400 italic mb-1">
                romanización oficial: {p.rom}
              </div>
              <div className="text-sm font-bold text-gray-700 mb-2">
                suena{" "}
                <span style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
                  {p.suena}
                </span>
              </div>
              <div className="text-base text-gray-700 leading-snug">{p.es}</div>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Cómo se dice, cómo se usa
        </h2>
        <p className="mb-2">
          <span className="kr font-bold" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>서울에 가요.</span>{" "}
          <span className="text-gray-400" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>[서우레 가요]</span>{" "}
          — Voy a Seúl. La <Kr>ㄹ</Kr> camaleón en acción.
        </p>
        <p className="mb-2">
          <span className="kr font-bold" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>저는 서울 사람이에요.</span>{" "}
          <span className="text-gray-400" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>[저는 서울 사라미에요]</span>{" "}
          — Soy de Seúl. Literal: &ldquo;soy persona de Seúl&rdquo;.
        </p>
        <p className="mb-10">
          <span className="kr font-bold" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>발음이 좋아요!</span>{" "}
          <span className="text-gray-400" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>[바르미 조아요]</span>{" "}
          — ¡Qué buena pronunciación! Lo que esperamos que te digan después de
          leer esto.
        </p>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Practícalo hoy mismo, gratis
        </h2>
        <ol className="list-decimal pl-6 mb-8 space-y-2">
          <li>
            Abre el{" "}
            <a href="/lector-coreano" className="text-seoul-red font-bold underline">
              Lector de Hangul
            </a>{" "}
            en la pestaña <strong>Alfabeto</strong> y toca <Kr>ㅓ</Kr>,{" "}
            <Kr>ㅗ</Kr> y <Kr>ㅜ</Kr>, una tras otra. Ahí mismo está el recuadro
            &ldquo;Las 3 confusiones típicas del hispanohablante&rdquo;, con{" "}
            <Kr>어</Kr> y <Kr>오</Kr> lado a lado.
          </li>
          <li>
            Frente al espejo, alterna <Kr>어</Kr> y <Kr>오</Kr>: en <Kr>어</Kr>{" "}
            los labios quedan quietos y relajados; en <Kr>오</Kr> se redondean.
          </li>
          <li>
            Pasa a <strong>Practicar → Palabras</strong>. <Kr>서울</Kr> está
            entre las palabras de la práctica: cuando te toque, escúchala en voz
            coreana, repítela tres veces y compárate.
          </li>
        </ol>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <a
            href="/lector-coreano"
            className="block border-2 border-seoul-black bg-[#F4F7FF] shadow-[4px_4px_0_#0a0a0f] hover:-translate-y-0.5 transition-transform px-5 py-4"
          >
            <div className="font-black text-seoul-black mb-1">Lector de Hangul →</div>
            <div className="text-base text-gray-700 leading-snug">
              El alfabeto con audio, lecciones y práctica. Ahí suena <Kr>서울</Kr>.
            </div>
          </a>
          <a
            href="/dubu"
            className="block border-2 border-seoul-black bg-[#F4F7FF] shadow-[4px_4px_0_#0a0a0f] hover:-translate-y-0.5 transition-transform px-5 py-4"
          >
            <div className="font-black text-seoul-black mb-1">
              Dubu · <Kr>두부</Kr> →
            </div>
            <div className="text-base text-gray-700 leading-snug">
              El puzzle del Hangul: consonante + vocal = la palabra que lees o
              escuchas.
            </div>
          </a>
          <Link
            href="/taller"
            className="block border-2 border-seoul-black bg-[#F4F7FF] shadow-[4px_4px_0_#0a0a0f] hover:-translate-y-0.5 transition-transform px-5 py-4"
          >
            <div className="font-black text-seoul-black mb-1">Taller de Hangul grabado →</div>
            <div className="text-base text-gray-700 leading-snug">
              La clase completa de Hangul, gratis, para verla a tu ritmo.
            </div>
          </Link>
          <Link
            href="/generador-nombre"
            className="block border-2 border-seoul-black bg-[#F4F7FF] shadow-[4px_4px_0_#0a0a0f] hover:-translate-y-0.5 transition-transform px-5 py-4"
          >
            <div className="font-black text-seoul-black mb-1">Tu nombre en coreano →</div>
            <div className="text-base text-gray-700 leading-snug">
              Escríbelo, míralo en hangul y escúchalo en voz coreana.
            </div>
          </Link>
        </div>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Con profe y en vivo: Básico 1
        </h2>
        <p className="mb-10">
          Si quieres que alguien te escuche y te corrija la <Kr>ㅓ</Kr>, eso
          hacemos en{" "}
          <Link href="/nivel-1#clases" className="text-seoul-red font-bold underline">
            Básico 1 (A1.1)
          </Link>
          , el curso desde cero. Las vocales con la boca correcta son parte de la
          primera clase, y <Kr>안녕하세요</Kr>, <Kr>감사합니다</Kr> y{" "}
          <Kr>오빠</Kr> llegan en la primera mitad del curso. Son ocho semanas en
          vivo, con una clase de una hora por semana: US$150 el curso completo ·
          o 2 cuotas de US$75. En la misma página ves los otros niveles y las
          próximas clases.
        </p>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Preguntas frecuentes
        </h2>
        {faq.map((f) => (
          <div key={f.q} className="mb-8">
            <h3 className="text-xl font-black text-seoul-black mb-2">{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}

        <p className="mb-6 mt-10">
          Así que sí: nos llamamos Academia Seúl, con tilde y todo, y en español
          está perfecto. Pero en clase, desde el primer día, es <Kr>서울</Kr>.
          Dos sílabas, mismo peso, boca relajada y una l que no suelta nada.
        </p>

        {/* CTA */}
        <div className="bg-seoul-black text-white border-2 border-seoul-black shadow-[8px_8px_0_#3D2EE8] px-8 py-10 mt-14 text-center">
          <p
            className="text-4xl font-black text-seoul-gold mb-3"
            style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
          >
            서 · 울
          </p>
          <h3 className="text-2xl font-black mb-3">
            ¿Te animas a decirlo en voz alta?
          </h3>
          <p className="text-white/70 mb-7 max-w-md mx-auto">
            Escucha <Kr>서울</Kr> y las vocales <Kr>ㅓ</Kr>, <Kr>ㅗ</Kr> y{" "}
            <Kr>ㅜ</Kr> en el Lector de Hangul gratis, o aprende a pronunciar
            desde cero, con profe y en vivo, en Básico 1 (A1.1).
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
