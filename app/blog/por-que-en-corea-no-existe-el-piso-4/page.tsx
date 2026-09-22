import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  // El layout añade " | Academia Seúl" (16 caracteres): título ≤ 44 para que el <title> final quede ≤ 60.
  title: "Por qué en Corea no existe el piso 4",
  description:
    "En Corea el 4 se dice 사 (sa), igual que muerte (死). Por eso muchos ascensores marcan F en vez de 4. Tetrafobia, el 13 de Occidente y números sino-coreanos.",
  alternates: {
    canonical:
      "https://www.academiaseul.com/blog/por-que-en-corea-no-existe-el-piso-4",
  },
  openGraph: {
    type: "article",
    title: "Por qué en Corea no existe el piso 4: la tetrafobia",
    description:
      "El 4 suena a 'muerte' en coreano — y por eso muchos ascensores tienen un piso F. Aprende los números sino-coreanos de paso.",
    url: "https://www.academiaseul.com/blog/por-que-en-corea-no-existe-el-piso-4",
    siteName: "Academia Seúl",
    locale: "es_CL",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Academia Seúl" }],
  },
};

const numeros = [
  { kr: "일", rom: "il", es: "1" },
  { kr: "이", rom: "i", es: "2" },
  { kr: "삼", rom: "sam", es: "3" },
  { kr: "사", rom: "sa", es: "4" },
  { kr: "오", rom: "o", es: "5" },
  { kr: "육", rom: "yuk", es: "6" },
  { kr: "칠", rom: "chil", es: "7" },
  { kr: "팔", rom: "pal", es: "8" },
  { kr: "구", rom: "gu", es: "9" },
  { kr: "십", rom: "sip", es: "10" },
];

const vocabulario = [
  {
    kr: "층",
    rom: "cheung",
    es: "Piso, planta. Se pega al número: 삼층 (piso 3), 오층 (piso 5).",
  },
  {
    kr: "F층",
    rom: "epeu-cheung",
    es: "El famoso “piso F”: el nombre que recibe el piso 4 en muchos edificios.",
  },
  {
    kr: "엘리베이터",
    rom: "ellibeiteo",
    es: "Ascensor. Préstamo del inglés, pronunciado a la coreana.",
  },
  {
    kr: "숫자",
    rom: "sutja",
    es: "Número, cifra. La palabra que vas a repetir mucho en Básico 1.",
  },
  {
    kr: "죽음",
    rom: "jugeum",
    es: "Muerte. La palabra nativa; el carácter chino 死 también se lee 사.",
  },
  {
    kr: "미신",
    rom: "misin",
    es: "Superstición. Evitar el 4 es la más famosa de Corea.",
  },
  {
    kr: "병원",
    rom: "byeongwon",
    es: "Hospital. El lugar donde casi nunca vas a encontrar un piso 4.",
  },
  {
    kr: "사월",
    rom: "sawol",
    es: "Abril. Lleva el mismo 사 y nadie le tiene miedo.",
  },
];

const faq = [
  {
    q: "¿De verdad no existe el piso 4 en ningún edificio de Corea?",
    a: "No en todos. Muchos edificios modernos sí tienen piso 4. La costumbre de saltarlo o marcarlo con una F se ve sobre todo en hospitales, clínicas y edificios más antiguos, donde la asociación con la muerte pesa más. Es una superstición viva, no una ley.",
  },
  {
    q: "¿Por qué el número 4 se considera de mala suerte en Corea?",
    a: "Porque el número 4 se dice 사 (sa), exactamente igual que la lectura coreana del carácter chino 死, que significa muerte. Ese juego de sonidos, llamado tetrafobia, también existe en China y Japón, donde 四 y 死 suenan casi igual.",
  },
  {
    q: "¿Tengo que evitar decir el número 4 cuando hablo coreano?",
    a: "Para nada. El 4 se usa con total normalidad en fechas (사월 es abril), precios, minutos, teléfonos y direcciones. Lo único que algunos edificios evitan es etiquetar un piso o una habitación con ese número.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "El piso F: por qué en muchos edificios de Corea no existe el piso 4",
    description:
      "En Corea el 4 se dice 사 (sa), igual que muerte (死). Por eso muchos ascensores marcan F en vez de 4. Tetrafobia, el 13 de Occidente y números sino-coreanos.",
    datePublished: "2026-09-18",
    dateModified: "2026-09-18",
    inLanguage: "es",
    mainEntityOfPage:
      "https://www.academiaseul.com/blog/por-que-en-corea-no-existe-el-piso-4",
    image: "https://www.academiaseul.com/og-image.png",
    author: { "@type": "Organization", name: "Academia Seúl", url: "https://www.academiaseul.com" },
    publisher: {
      "@type": "Organization",
      name: "Academia Seúl",
      logo: { "@type": "ImageObject", url: "https://www.academiaseul.com/logo.png" },
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
];

export default function Piso4Post() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Navigation solid />

      {/* Hero */}
      <section className="bg-seoul-black text-white pt-32 md:pt-40 pb-16 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 text-xs font-bold tracking-wider uppercase mb-6">
            <Link href="/blog" className="text-white/50 hover:text-white transition-colors">
              ← Blog
            </Link>
            <span className="bg-seoul-red text-white px-3 py-1">Curiosidades</span>
            <span className="text-white/40">18 de septiembre, 2026 · 7 min</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            <span
              className="block text-seoul-gold text-5xl md:text-7xl mb-3"
              style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
            >
              4층
            </span>
            El piso F: por qué en muchos edificios de Corea no existe el piso 4
          </h1>
          <p className="text-white/70 text-lg leading-relaxed">
            Entras a un ascensor en Seúl, miras los botones y algo no cuadra: 1, 2,
            3, F, 5. En Corea no existe el piso 4 en muchos edificios, y la razón
            no está en la arquitectura, sino en el idioma. Una sola sílaba,{" "}
            <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>사</span>{" "}
            (sa), lo explica todo.
          </p>
        </div>
      </section>

      {/* Body */}
      <article className="max-w-3xl mx-auto px-6 py-16 text-gray-800 leading-relaxed text-lg">

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          La escena: un botón que no está
        </h2>
        <p className="mb-6">
          Es tu primer día en Corea. Vas a visitar a alguien en un hospital de
          Seúl, te dicen &ldquo;cuarto piso&rdquo; y entras al ascensor con la
          seguridad de quien ya sabe leer Hangul. Buscas el 4. No está. Hay un
          3, hay un 5 y, entre los dos, una letra que parece un error de
          imprenta: <strong>F</strong>. Aprietas F con cara de duda, las puertas se
          abren y sí, ahí está la habitación que buscabas. Acabas de subir al
          piso que oficialmente no existe.
        </p>
        <p className="mb-10">
          Si te pasa, no te asustes: no es un fallo del edificio. Es una de las
          supersticiones más famosas de Asia oriental, y para entenderla solo
          necesitas saber cómo suena un número.
        </p>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Por qué en Corea no existe el piso 4: el número que suena a muerte
        </h2>
        <p className="mb-6">
          En coreano, el número 4 se dice{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>사</span>{" "}
          (sa). Hasta ahí, nada raro. El problema es que el carácter chino de{" "}
          <em>muerte</em>, <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>死</span>,
          también se lee <strong>사</strong> en coreano. Mismo sonido, misma
          sílaba, misma entonación. Cada vez que alguien dice &ldquo;cuatro&rdquo;,
          el oído coreano escucha, aunque sea de reojo, &ldquo;muerte&rdquo;.
        </p>
        <p className="mb-6">
          A ese miedo se le llama <strong>tetrafobia</strong>, y no es exclusivo
          de Corea. Nace en China, donde 四 (sì, cuatro) y 死 (sǐ, muerte) suenan
          casi idénticos, y viaja a Japón, donde 四 puede leerse <em>shi</em>,
          exactamente igual que 死. Por eso en japonés la gente prefiere decir{" "}
          <em>yon</em> para el 4: es la misma superstición con otro acento.
        </p>
        <p className="mb-10">
          Lo curioso es que la sílaba{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>사</span>{" "}
          está en cientos de palabras coreanas que nadie evita:{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>사람</span>{" "}
          (persona),{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>사과</span>{" "}
          (manzana) y hasta{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>사랑</span>{" "}
          (amor). El problema no es el sonido: es el sonido <em>pegado a un
          número</em>, en un lugar donde la vida y la muerte están a la vuelta
          del pasillo.
        </p>

        <blockquote className="border-l-4 border-seoul-red bg-[#F4F7FF] px-6 py-5 my-10 text-seoul-black font-medium">
          Nadie en Corea cree de verdad que el piso 4 te va a hacer daño. Pero
          cuando el ascensor de un hospital es el que sube, ¿para qué tentar a la
          suerte?
        </blockquote>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          F de <em>four</em>: cómo lo resuelven los edificios
        </h2>
        <p className="mb-6">
          Hay dos soluciones clásicas. La primera es saltarse el número: el
          ascensor va del 3 al 5 y todos fingen que la matemática funciona así.
          La segunda, más coreana y más ingeniosa, es reemplazar el 4 por una{" "}
          <strong>F</strong>, de <em>four</em> en inglés. El piso sigue existiendo,
          la gente sigue viviendo ahí, pero el botón dice{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>F층</span>{" "}
          en vez de{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>사층</span>.
          Problema resuelto sin decir la palabra prohibida.
        </p>
        <p className="mb-10">
          ¿Dónde se ve más? En hospitales, clínicas y edificios de cierta edad.
          En un{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>병원</span>{" "}
          (hospital) tiene todo el sentido del mundo: nadie quiere que la
          habitación de su abuela esté en el &ldquo;piso muerte&rdquo;. Los
          edificios nuevos, en cambio, cada vez lo respetan menos; en muchos
          departamentos modernos de Seúl el 4 está ahí, tan tranquilo. Es una
          superstición en retirada, pero todavía te la vas a cruzar.
        </p>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          El 13 de Occidente y el martes de Latinoamérica
        </h2>
        <p className="mb-6">
          Antes de reírte de los coreanos, mira hacia tu propio ascensor. En
          Estados Unidos y en buena parte de Occidente, el número maldito es el{" "}
          <strong>13</strong>: hay hoteles y edificios enteros donde el piso 12
          pasa directo al 14, y la gente hasta le puso nombre al miedo,
          triscaidecafobia. En Latinoamérica el día de mala suerte no es el
          viernes 13 sino el <strong>martes 13</strong> (&ldquo;ni te cases ni te
          embarques&rdquo;), y en varios países todavía se piensa dos veces
          antes de sentar a trece personas en una mesa.
        </p>
        <p className="mb-10">
          La diferencia está en el origen del miedo. El 13 arrastra historia y
          religión; el 4 arrastra <em>fonética</em>. Es una superstición hecha de
          puro sonido, y por eso es tan buena excusa para aprender los números en
          coreano: cuando entiendes por qué 사 asusta, ya te sabes la mitad del
          sistema.
        </p>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Mini-clase de coreano: los números sino-coreanos
        </h2>
        <p className="mb-6">
          El coreano tiene dos sistemas de números, y el del piso 4 es el{" "}
          <strong>sino-coreano</strong>: los números que llegaron desde el chino
          hace siglos. Del 1 al 10 son estos:
        </p>

        <div className="grid grid-cols-5 gap-3 mb-6">
          {numeros.map((n) => (
            <div
              key={n.kr}
              className="border-2 border-seoul-black bg-white shadow-[4px_4px_0_#0a0a0f] px-2 py-3 text-center"
            >
              <div
                className="text-2xl font-black text-seoul-red"
                style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
              >
                {n.kr}
              </div>
              <div className="text-xs text-gray-400 italic">{n.rom}</div>
              <div className="text-sm font-bold text-gray-700">{n.es}</div>
            </div>
          ))}
        </div>

        <p className="mb-6">
          La buena noticia: con esas diez piezas se arma todo lo demás, como un{" "}
          <strong>LEGO</strong>. El 15 es{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>십오</span>{" "}
          (sibo: diez-cinco), el 27 es{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>이십칠</span>{" "}
          (isipchil: dos-diez-siete), 100 es{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>백</span>{" "}
          (baek) y 1.000 es{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>천</span>{" "}
          (cheon). Cero excepciones raras, cero &ldquo;once, doce, trece&rdquo; que
          memorizar aparte. Si ya leíste{" "}
          <Link href="/blog/hangul-el-alfabeto-mas-cientifico" className="text-seoul-red font-bold underline underline-offset-4">
            por qué el Hangul es el alfabeto más científico
          </Link>
          , esto te va a sonar familiar: los coreanos tienen debilidad por los
          sistemas que se explican solos.
        </p>
        <p className="mb-10">
          Los sino-coreanos se usan para <strong>pisos, fechas, dinero, minutos
          y números de teléfono</strong>. El otro sistema, el <em>nativo</em>{" "}
          (<span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>하나, 둘, 셋, 넷</span>…
          hana, dul, set, net), se usa para contar cosas, decir la edad y las
          horas. Sí, en coreano dices la hora con un sistema y los minutos con el
          otro. Suena a broma, pero en un par de semanas de{" "}
          <Link href="/nivel-1#clases" className="text-seoul-red font-bold underline underline-offset-4">
            Básico 1 (A1.1)
          </Link>{" "}
          te sale solo.
        </p>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Cómo se dice, cómo se usa
        </h2>
        <p className="mb-2">
          <span className="kr font-bold" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>저는 오층에 살아요.</span>{" "}
          <span className="text-gray-400 italic">jeoneun ocheung-e sarayo.</span>{" "}
          — Vivo en el piso 5.
        </p>
        <p className="mb-2">
          <span className="kr font-bold" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>삼층 눌러 주세요.</span>{" "}
          <span className="text-gray-400 italic">samcheung nulleo juseyo.</span>{" "}
          — Presiona el piso 3, por favor. (Lo que le dices a quien está junto a
          los botones.)
        </p>
        <p className="mb-2">
          <span className="kr font-bold" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>사월에 한국에 가요.</span>{" "}
          <span className="text-gray-400 italic">sawol-e hanguge gayo.</span>{" "}
          — Voy a Corea en abril. Fíjate: 사 en una fecha no molesta a nadie.
        </p>
        <p className="mb-10">
          <span className="kr font-bold" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>제 번호는 공일공…</span>{" "}
          <span className="text-gray-400 italic">je beonhoneun gong-il-gong…</span>{" "}
          — Mi número es 010… Todos los celulares coreanos empiezan así, y el
          cero se dice{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>공</span>{" "}
          (gong).
        </p>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Vocabulario del piso que no existe
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {vocabulario.map((e) => (
            <div
              key={e.kr}
              className="border-2 border-seoul-black bg-white shadow-[4px_4px_0_#0a0a0f] px-5 py-4"
            >
              <div
                className="text-2xl font-black text-seoul-red mb-1"
                style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
              >
                {e.kr}
              </div>
              <div className="text-sm text-gray-400 italic mb-2">{e.rom}</div>
              <div className="text-base text-gray-700 leading-snug">{e.es}</div>
            </div>
          ))}
        </div>

        <blockquote className="border-l-4 border-seoul-red bg-[#F4F7FF] px-6 py-5 my-10 text-seoul-black font-medium">
          El día que un ascensor coreano te muestre una F y sonrías en vez de
          confundirte, ya no eres turista: eres alguien que entiende el idioma
          por dentro.
        </blockquote>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Un poco de nunchi numérico
        </h2>
        <p className="mb-10">
          Saber que el 4 incomoda es, en el fondo, una forma de{" "}
          <Link href="/blog/nunchi-el-arte-coreano-de-leer-el-ambiente" className="text-seoul-red font-bold underline underline-offset-4">
            nunchi
          </Link>
          : leer lo que nadie te va a explicar en voz alta. Si algún día regalas
          algo en Corea, evita que sean cuatro unidades; si eliges habitación de
          hotel para tus suegros coreanos, quizá no la 404. No porque vayas a
          ofender a nadie, sino porque ese pequeño gesto dice &ldquo;entiendo tu
          mundo&rdquo;. Y eso, en cualquier idioma, vale más que un número.
        </p>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Preguntas frecuentes
        </h2>
        {faq.map((f) => (
          <div key={f.q} className="mb-6">
            <h3 className="text-xl font-black text-seoul-black mb-2">{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}

        <p className="mb-6 mt-10">
          Los números son lo primero que un coreano te va a preguntar (tu edad,
          tu piso, tu teléfono) y lo primero que puedes practicar hoy mismo. En
          el{" "}
          <Link href="/lector-coreano" className="text-seoul-red font-bold underline underline-offset-4">
            Lector de Hangul
          </Link>{" "}
          tienes la lección <strong>Dos maneras de contar (숫자)</strong>, en
          la pestaña Aprender, con los dos sistemas, un explorador que te lee
          en voz nativa el número que elijas y un modo de práctica,
          todo gratis. Y si quieres que alguien te acompañe piso por
          piso, en Básico 1 (A1.1) los aprendemos juntos: US$150 el curso
          completo · o 2 cuotas de US$75, y empezamos la semana del 5 de
          octubre.
        </p>

        {/* CTA */}
        <div className="bg-seoul-black text-white border-2 border-seoul-black shadow-[8px_8px_0_#3D2EE8] px-8 py-10 mt-14 text-center">
          <p
            className="text-4xl font-black text-seoul-gold mb-3"
            style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
          >
            일 이 삼 사 오
          </p>
          <h3 className="text-2xl font-black mb-3">
            ¿Quieres contar hasta el piso F sin pensarlo?
          </h3>
          <p className="text-white/70 mb-7 max-w-md mx-auto">
            Practica los números sino-coreanos y nativos con audio de voz nativa
            en el Lector de Hangul gratis, o ve directo a los cursos en vivo de
            octubre: ambos sistemas se aprenden en Básico 1 (A1.1).
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
              Ver cursos de octubre →
            </Link>
          </div>
          <p className="text-white/50 text-sm mt-6">화이팅 chingu! 🇰🇷</p>
        </div>
      </article>

      <Footer />
    </main>
  );
}
