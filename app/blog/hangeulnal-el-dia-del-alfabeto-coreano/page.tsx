import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const POST_URL =
  "https://www.academiaseul.com/blog/hangeulnal-el-dia-del-alfabeto-coreano";

const DESCRIPTION =
  "El 9 de octubre Corea celebra el 한글날: el rey Sejong, el 훈민정음, por qué se eligió esa fecha, desde cuándo es feriado y un reto para leer 한글 en 30 segundos.";

export const metadata: Metadata = {
  // El layout añade " | Academia Seúl" (16 caracteres): título ≤ 44 para que el <title> final quede ≤ 60.
  title: "한글날: por qué Corea celebra su alfabeto",
  description: DESCRIPTION,
  alternates: {
    canonical: POST_URL,
  },
  openGraph: {
    type: "article",
    title: "한글날: por qué Corea celebra su alfabeto cada 9 de octubre",
    description:
      "580 años del 훈민정음 de 1446: el rey Sejong, el ejemplar que apareció en 1940 y un reto para leer 한글 en 30 segundos.",
    url: POST_URL,
    siteName: "Academia Seúl",
    locale: "es_CL",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Academia Seúl" }],
  },
};

/** Texto en hangul con la fuente coreana (mismo marcado que el resto del blog). */
function Kr({ children }: { children: ReactNode }) {
  return (
    <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
      {children}
    </span>
  );
}

const vocabulario = [
  {
    kr: "한글",
    rom: "Hangeul",
    es: "El alfabeto coreano. 글 = escritura.",
  },
  {
    kr: "날",
    rom: "nal",
    es: "Día. También en 어린이날, el Día del Niño.",
  },
  {
    kr: "글자",
    rom: "geulja",
    es: "Letra, carácter. 한 y 글 son dos 글자.",
  },
  {
    kr: "세종대왕",
    rom: "Sejong Daewang",
    es: "El gran rey Sejong. Sale en el billete de 10.000 wones.",
  },
  {
    kr: "훈민정음",
    rom: "Hunminjeongeum",
    es: "«Los sonidos correctos para enseñar al pueblo».",
  },
  {
    kr: "읽다",
    rom: "ikda",
    es: "Leer. Se escribe con ㄺ, pero suena [익따].",
  },
  {
    kr: "쓰다",
    rom: "sseuda",
    es: "Escribir. También «usar» y «amargo»: el contexto manda.",
  },
  {
    kr: "돌",
    rom: "dol",
    es: "Aniversario: cuenta los años de algo (y es el primer cumpleaños de un bebé). 제580돌 = 580.º aniversario. Ojo: 돌 también es «piedra».",
  },
];

const faq = [
  {
    q: "¿Qué se celebra el 9 de octubre en Corea?",
    a: "El 한글날 (Hangeullal), el Día del Hangul: Corea del Sur celebra el alfabeto que creó el rey Sejong el Grande (세종대왕). La fecha recuerda la terminación, en 1446, del libro 훈민정음 que presentó las letras. En 2026 se cumplen 580 años.",
  },
  {
    q: "¿El 한글날 es feriado en Corea del Sur?",
    a: "Sí. Se estrenó como feriado en 1946, cuando el 훈민정음 cumplió 500 años; dejó de serlo entre 1991 y 2012 (aunque en 2005 una ley lo convirtió en uno de los cinco días nacionales, los 국경일) y desde 2013 vuelve a ser día libre.",
  },
  {
    q: "¿Por qué el 한글날 es el 9 de octubre?",
    a: "Porque el ejemplar original del libro 훈민정음 hallado en 1940 (el 해례본) trae la fecha de su texto final: los primeros diez días del 9.º mes lunar de 1446. Se tomó el último de esos días, el 10, que pasado al calendario actual cae el 9 de octubre. Se celebra en esa fecha desde 1945.",
  },
  {
    q: "¿Quién creó el Hangul y en qué año?",
    a: "El rey 세종대왕 (Sejong el Grande), cuarto rey de la dinastía Joseon. Los Anales registran la creación de 28 letras en el 12.º mes lunar de 1443; en 1446 se terminó el libro que las explicaba. Hoy se usan 24 letras básicas.",
  },
  {
    q: "¿Corea del Norte celebra el día del alfabeto?",
    a: "Sí, el 15 de enero, con el nombre de 조선글날. Toma como referencia la creación de 1443 y no el libro de 1446.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "한글날: por qué Corea celebra su alfabeto cada 9 de octubre",
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

export default function HangeulnalPost() {
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
          <div className="flex flex-wrap items-center gap-3 text-xs font-bold tracking-wider uppercase mb-6">
            <Link href="/blog" className="text-white/50 hover:text-white transition-colors">
              ← Blog
            </Link>
            <span className="bg-seoul-red text-white px-3 py-1">Mitos y fiestas</span>
            <span className="text-white/40">30 de septiembre, 2026 · 9 min</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            <span
              className="block text-seoul-gold text-5xl md:text-7xl mb-3"
              style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
            >
              한글날
            </span>
            Por qué Corea celebra su alfabeto cada 9 de octubre
          </h1>
          <p className="text-white/70 text-lg leading-relaxed">
            Imagina que en Chile hubiera un feriado para celebrar el abecedario:
            colegios cerrados, banderas en las calles y una ceremonia oficial
            en honor a la ñ. Suena a chiste, pero en Corea del Sur existe. Se
            llama <Kr>한글날</Kr>, el Día del Hangul, y cada 9 de octubre el país
            le agradece a un rey que decidió que escribir no podía ser un
            privilegio. Este 2026 se cumplen 580 años del libro que dio a
            conocer el alfabeto, y la fecha de la fiesta se decidió gracias a
            un ejemplar de ese libro que apareció recién en 1940.
          </p>
        </div>
      </section>

      {/* Body */}
      <article className="max-w-3xl mx-auto px-6 py-16 text-gray-800 leading-relaxed text-lg">

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Un feriado para un alfabeto (sí, en serio)
        </h2>
        <p className="mb-6">
          <Kr>한글날</Kr> se arma con dos piezas: <Kr>한글</Kr> (Hangeul), el
          nombre del alfabeto, y <Kr>날</Kr> (nal), &ldquo;día&rdquo;. Ojo con
          la pronunciación: se escribe <Kr>한글날</Kr>, pero se dice [
          <Kr>한글랄</Kr>]. La <Kr>ㄴ</Kr> de <Kr>날</Kr> se contagia de la{" "}
          <Kr>ㄹ</Kr> que tiene al lado y suena como ella; por eso la
          romanización oficial es <em>Hangeullal</em>. Primera regla de
          pronunciación coreana, de regalo.
        </p>
        <p className="mb-10">
          Es uno de los cinco <Kr>국경일</Kr> (gukgyeongil), los días nacionales
          de Corea del Sur. Los otros cuatro recuerdan un movimiento de
          independencia, una constitución, la liberación de 1945 y un mito
          fundacional (el del 3 de octubre te lo contamos en{" "}
          <Link
            href="/blog/dangun-por-que-corea-nacio-de-una-osa"
            className="text-seoul-red font-bold underline"
          >
            Dangún y el 개천절
          </Link>
          ). Este celebra un sistema de escritura. Veinticuatro letras básicas,
          para ser exactos.
        </p>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          세종대왕: el rey que quiso que todos pudieran escribir
        </h2>
        <p className="mb-6">
          A comienzos del siglo XV, Corea hablaba coreano pero escribía en
          chino clásico, con miles de caracteres que costaban años de estudio.
          Escribir era cosa de una élite. <Kr>세종대왕</Kr> (Sejong Daewang,
          &ldquo;el gran rey Sejong&rdquo;), cuarto rey de la dinastía Joseon
          (reinó de 1418 a 1450), decidió cambiar eso.
        </p>
        <p className="mb-6">
          Lo curioso es lo poco que se anotó. Los Anales de la dinastía (
          <Kr>조선왕조실록</Kr>), que registran casi todo lo que hacía un rey
          con fecha exacta, le dedican apenas un párrafo sin día, al final del
          12.º mes lunar de 1443, que empieza así: &ldquo;Este mes, el rey creó
          personalmente 28 letras&rdquo;. Así de discreto nació uno de los
          inventos que más cambiaron la historia de Corea.
        </p>
        <p className="mb-6">
          ¿Por qué lo hizo? En el prólogo que escribió para presentarlas,
          Sejong lo explica sin rodeos: la lengua de su país es distinta de la
          de China y no calza con los caracteres chinos, y por eso mucha gente
          común tiene cosas que decir y no puede ponerlas por escrito. Eso le
          dio pena, así que hizo 28 letras nuevas para que cualquiera las
          aprendiera fácil y las usara todos los días.
        </p>

        <blockquote className="border-l-4 border-seoul-red bg-[#F4F7FF] px-6 py-5 my-10 text-seoul-black font-medium">
          Hay reyes que se recuerdan por sus batallas. A Sejong se le recuerda,
          sobre todo, por un abecedario, y su cara está en el billete de 10.000
          wones.
        </blockquote>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          훈민정음: los sonidos correctos para enseñar al pueblo
        </h2>
        <p className="mb-6">
          Sejong no lo llamó &ldquo;<Kr>한글</Kr>&rdquo;. Lo llamó <Kr>훈민정음</Kr>{" "}
          (Hunminjeongeum), y el nombre es una declaración de principios:{" "}
          <Kr>훈</Kr> (enseñar) + <Kr>민</Kr> (pueblo) + <Kr>정</Kr> (correcto)
          + <Kr>음</Kr> (sonido). Es decir, <strong>los sonidos correctos para
          enseñar al pueblo</strong>.
        </p>
        <p className="mb-10">
          Fíjate en la palabra <em>sonidos</em>. Sejong diseñó las consonantes
          básicas como dibujos de la boca y la garganta al pronunciarlas: la{" "}
          <Kr>ㄴ</Kr> es la lengua tocando la encía de arriba, justo detrás de
          los dientes; la <Kr>ㅁ</Kr>, la forma de la boca. El detalle de ese diseño está en{" "}
          <Link
            href="/blog/hangul-el-alfabeto-mas-cientifico"
            className="text-seoul-red font-bold underline"
          >
            nuestro artículo sobre el alfabeto que un rey inventó para su pueblo
          </Link>
          ; aquí vamos por la fiesta. Un dato más: de aquellas 28 letras, cuatro
          dejaron de usarse y hoy el coreano se escribe con 24 letras básicas
          (que se combinan en otras, como <Kr>ㄲ</Kr> o <Kr>ㅐ</Kr>).
        </p>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Los letrados que dijeron &ldquo;mejor no&rdquo;
        </h2>
        <p className="mb-6">
          No todos aplaudieron. En 1444, apenas dos meses después, un grupo de
          letrados encabezado por <Kr>최만리</Kr> (Choe Malli), subdirector del{" "}
          <Kr>집현전</Kr> (la academia de eruditos de la corte) y, en la
          práctica, su jefe, presentó un memorial contra el alfabeto: dejar de
          lado los caracteres chinos quedaba mal ante China, y las letras
          nuevas iban a distraer del estudio serio.
        </p>
        <p className="mb-10">
          Sejong respondió con preguntas dignas de profesor: &ldquo;¿Ustedes
          conocen los libros de rimas? ¿Saben cuántas consonantes iniciales hay?
          Si yo no corrijo esos libros, ¿quién lo hará?&rdquo;. El alfabeto
          siguió adelante, aunque la élite tardó siglos en tomárselo en serio:
          al chino clásico lo llamaban <Kr>진서</Kr> (jinseo), &ldquo;la
          escritura verdadera&rdquo;, y a las letras de Sejong, <Kr>언문</Kr>{" "}
          (eonmun), &ldquo;la escritura de la lengua común&rdquo;. Los propios
          Anales usan ese nombre, pero al lado de &ldquo;la verdadera&rdquo;
          sonaba a segunda categoría.
        </p>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          El 해례본 y el misterio del 9 de octubre
        </h2>
        <p className="mb-6">
          En el 9.º mes lunar de 1446, los Anales repiten la fórmula sin día:
          &ldquo;Este mes quedó terminado el <Kr>훈민정음</Kr>&rdquo;. Esta vez
          era un libro: el manual de las letras, con el prólogo del rey,
          explicaciones y ejemplos de un grupo de eruditos, casi todos del{" "}
          <Kr>집현전</Kr>, y un texto final firmado por el erudito{" "}
          <Kr>정인지</Kr> (Jeong Inji). Los Anales copian el prólogo y ese
          texto final, pero no la línea con la fecha. Hoy al libro se le llama{" "}
          <Kr>해례본</Kr> (Haeryebon), &ldquo;la edición con explicaciones y
          ejemplos&rdquo;. En Corea se dice que 1446 es el año de la{" "}
          <Kr>반포</Kr> (banpo), la proclamación, aunque los historiadores
          precisan que las fuentes hablan de un libro terminado, no de una
          ceremonia con tambores.
        </p>
        <p className="mb-6">
          ¿Y el 9 de octubre? Aquí viene la parte detectivesca. En 1926, en plena
          ocupación japonesa, la Sociedad de Investigación de la Lengua Coreana
          (<Kr>조선어연구회</Kr>) celebró por primera vez el día del alfabeto.
          Como los Anales solo decían &ldquo;este mes&rdquo;, eligieron el día
          29 del 9.º mes lunar, el último de ese mes en 1446, que en 1926 cayó
          el 4 de noviembre. Lo llamaron{" "}
          <Kr>가갸날</Kr> (Gagyanal), por cómo se aprendía a leer:{" "}
          <Kr>가, 갸, 거, 겨</Kr>… En 1928 pasó a llamarse <Kr>한글날</Kr>.
          Como era una fecha lunar, cada año caía en un día distinto, así que
          en los años 30 se pasó al calendario solar: desde 1934 se celebraba
          el 28 de octubre.
        </p>
        <p className="mb-6">
          Entonces, en 1940, apareció en <Kr>안동</Kr> (Andong) un ejemplar
          original del <Kr>해례본</Kr>, y el texto de <Kr>정인지</Kr> sí traía
          la fecha: los primeros diez días del 9.º mes de 1446. Se tomó el último,
          el 10, se pasó al calendario actual y dio… 9 de octubre, casi tres
          semanas antes de lo que se venía celebrando. Desde 1945, con Corea ya
          libre, el <Kr>한글날</Kr> cae en esa fecha.
        </p>
        <p className="mb-10">
          Ese ejemplar es tesoro nacional (<Kr>국보</Kr>), pertenece a la
          colección del museo <Kr>간송미술관</Kr> (Kansong) y desde 1997 está en el registro
          Memoria del Mundo de la UNESCO. Su texto final trae una frase que
          parece publicidad: una persona lista aprende estas letras antes de que
          termine la mañana; una lenta, en diez días.
        </p>

        <blockquote className="border-l-4 border-seoul-red bg-[#F4F7FF] px-6 py-5 my-10 text-seoul-black font-medium">
          La fecha del 한글날 no la eligió un rey ni un gobierno: la dictó una
          línea de un libro de 1446 que salió a la luz en 1940.
        </blockquote>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Feriado, no feriado y otra vez feriado
        </h2>
        <p className="mb-6">
          El 9 de octubre de 1946, cuando el <Kr>훈민정음</Kr> cumplió 500
          años, el <Kr>한글날</Kr> se estrenó como feriado, y en 1949 la recién
          fundada República de Corea lo mantuvo en su lista oficial. En 1990 el
          gobierno concluyó que había demasiados días
          libres y desde 1991 el <Kr>한글날</Kr> dejó de ser feriado (una
          discusión que en Latinoamérica nos suena conocida). En 2005 una ley lo
          convirtió en uno de los cinco <Kr>국경일</Kr>, pero sin día libre, y
          desde 2013 vuelve a ser feriado: oficinas públicas y colegios cierran
          y, como en todo día nacional, se iza el <Kr>태극기</Kr> en edificios
          públicos, en las calles y en algunos balcones.
        </p>
        <p className="mb-10">
          Para dimensionarlo: en Colombia el 23 de abril es el Día del Idioma,
          en recuerdo de Cervantes; en Chile, el Día del Libro. Hay actos en los colegios, pero nadie se queda en casa.
          Corea le da el día libre a todo el país por un alfabeto.
        </p>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Dos Coreas, dos fechas y un nombre del siglo XX
        </h2>
        <p className="mb-6">
          Corea del Norte también celebra su alfabeto, pero el 15 de enero, con
          el nombre de <Kr>조선글날</Kr>: toma como referencia la creación de
          1443 y no el libro de 1446.
        </p>
        <p className="mb-10">
          Y el dato que sorprende a casi todos: Sejong nunca dijo{" "}
          <Kr>한글</Kr>. Durante siglos el alfabeto fue el <Kr>훈민정음</Kr> (o{" "}
          <Kr>정음</Kr>, para abreviar) o el <Kr>언문</Kr>, y desde fines del
          siglo XIX también el <Kr>국문</Kr> (&ldquo;escritura nacional&rdquo;). El nombre{" "}
          <Kr>한글</Kr> llega a comienzos del siglo XX y se atribuye al
          lingüista <Kr>주시경</Kr> (Ju Si-gyeong, 1876–1914); el registro más
          antiguo que se conserva es de 1913. <Kr>글</Kr> es
          &ldquo;escritura&rdquo;, y el <Kr>한</Kr> se explica como
          &ldquo;grande&rdquo; o como &ldquo;coreano&rdquo;, el mismo de{" "}
          <Kr>한국</Kr> (Corea). Las dos lecturas le quedan bien.
        </p>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Cómo se celebra hoy el 한글날
        </h2>
        <p className="mb-6">
          El gobierno organiza una ceremonia oficial, el <Kr>경축식</Kr>{" "}
          (gyeongchuksik): se lee el prólogo del <Kr>훈민정음</Kr> y se
          condecora a personas que han trabajado por el idioma, a veces
          extranjeras. La estatua de Sejong en la plaza{" "}
          <Kr>광화문</Kr> (Gwanghwamun) se inauguró un 9 de octubre, el de 2009,
          y el Museo Nacional del Hangul (<Kr>국립한글박물관</Kr>) abrió otro,
          el de 2014. Y claro, muchos coreanos simplemente descansan.
        </p>
        <p className="mb-10">
          Este año viene con torta doble: 580 años del libro de 1446, que en
          Corea se escribe <Kr>제580돌 한글날</Kr>, y 100 años desde aquel
          primer <Kr>가갸날</Kr> de 1926.
        </p>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Mini-clase de coreano: el vocabulario del 한글날
        </h2>
        <p className="mb-6">
          Ocho palabras para celebrar con propiedad. Si todavía no lees Hangul,
          el{" "}
          <a href="/lector-coreano" className="text-seoul-red font-bold underline">
            Lector de Hangul gratis
          </a>{" "}
          te enseña a leerlas letra por letra, con audio.
        </p>

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

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Mini-reto del 한글날: lee 한글 en 30 segundos
        </h2>
        <p className="mb-6">
          <Kr>정인지</Kr> prometía una mañana; nosotros te pedimos 30 segundos
          para dos sílabas. Abre el{" "}
          <a href="/lector-coreano" className="text-seoul-red font-bold underline">
            Lector de Hangul
          </a>{" "}
          (gratis, con audio y sin registrarte), pon el cronómetro y vamos:
        </p>
        <p className="mb-2">
          <strong>1. Entra a Aprender → lección 5</strong>, &ldquo;Arma bloques,
          no letras sueltas&rdquo;: ahí está el constructor de sílabas.
        </p>
        <p className="mb-2">
          <strong>2. Arma <Kr>한</Kr>:</strong> <Kr>ㅎ</Kr> (una j muy suave,
          casi un suspiro) + <Kr>ㅏ</Kr> (a) + <Kr>ㄴ</Kr> abajo (n).
        </p>
        <p className="mb-2">
          <strong>3. Arma <Kr>글</Kr>:</strong> <Kr>ㄱ</Kr> (una g suave, entre
          g y k) +{" "}
          <Kr>ㅡ</Kr> (sonríe y di u) + <Kr>ㄹ</Kr> abajo (al final suena l).
        </p>
        <p className="mb-6">
          <strong>4. Júntalas: <Kr>한글</Kr>.</strong> Di la n bien clara: la
          pronunciación estándar es [<Kr>한글</Kr>]. Hablando rápido, muchos
          coreanos lo dicen casi como &ldquo;hang-geul&rdquo; y nadie se
          confunde, pero el diccionario lo quiere con n (y tu profe también).
        </p>
        <p className="mb-10">
          ¿Lo lograste? Acabas de leer el nombre del alfabeto en su propio
          alfabeto. Para seguir:{" "}
          <a href="/dubu" className="text-seoul-red font-bold underline">
            Dubu
          </a>{" "}
          (el puzzle del Hangul, 30 niveles), el{" "}
          <Link href="/taller" className="text-seoul-red font-bold underline">
            taller grabado
          </Link>{" "}
          (una clase completa de Hangul) y{" "}
          <Link href="/generador-nombre" className="text-seoul-red font-bold underline">
            tu nombre en coreano
          </Link>
          , con audio. Todo gratis.
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
          Sejong hizo su alfabeto para que <em>cualquiera</em> pudiera
          aprenderlo, y cualquiera incluye a alguien en Santiago, Lima o Ciudad
          de México con ganas de entender sus K-dramas sin subtítulos. Si
          quieres aprender a leer (y a hablar) con profe, en vivo y en español,{" "}
          <strong>Básico 1 (A1.1)</strong> es nuestro curso desde cero: ocho
          semanas por Zoom, con certificado, por US$150 el curso completo · o 2
          cuotas de US$75. Horarios y fecha de inicio, en{" "}
          <Link href="/nivel-1#clases" className="text-seoul-red font-bold underline">
            próximas clases
          </Link>
          .
        </p>

        {/* CTA */}
        <div className="bg-seoul-black text-white border-2 border-seoul-black shadow-[8px_8px_0_#3D2EE8] px-8 py-10 mt-14 text-center">
          <p
            className="text-4xl font-black text-seoul-gold mb-3"
            style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
          >
            한글날
          </p>
          <h3 className="text-2xl font-black mb-3">
            ¿Celebramos con tu primera palabra?
          </h3>
          <p className="text-white/70 mb-7 max-w-md mx-auto">
            Sejong quería que todos pudieran leer. Empieza gratis con el Lector
            de Hangul o aprende desde cero en Básico 1 (A1.1), en vivo y en
            español.
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
