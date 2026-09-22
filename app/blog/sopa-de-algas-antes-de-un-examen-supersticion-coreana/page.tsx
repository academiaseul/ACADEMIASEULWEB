import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const POST_URL =
  "https://www.academiaseul.com/blog/sopa-de-algas-antes-de-un-examen-supersticion-coreana";

export const metadata: Metadata = {
  // El layout añade " | Academia Seúl" (16 caracteres): título ≤ 44 para que el <title> final quede ≤ 60.
  title: "Sopa de algas antes del examen: tabú coreano",
  description:
    "Por qué en Corea nadie come miyeokguk (sopa de algas) antes de un examen, qué se regala en su lugar y por qué el país se detiene el día del 수능.",
  alternates: {
    canonical: POST_URL,
  },
  openGraph: {
    type: "article",
    title: "Sopa de algas antes de un examen: la superstición coreana",
    description:
      "La sopa de cumpleaños que nadie toca antes de un examen — y el idioma que explica por qué.",
    url: POST_URL,
    siteName: "Academia Seúl",
    locale: "es_CL",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Academia Seúl" }],
  },
};

const vocabulario = [
  {
    kr: "미역국",
    rom: "miyeokguk",
    es: "Sopa de algas. La del cumpleaños, la del posparto y, como modismo, «reprobar».",
  },
  {
    kr: "시험",
    rom: "siheom",
    es: "Examen, prueba. En coreano un examen se «ve»: 시험을 보다 es rendirlo.",
  },
  {
    kr: "붙다",
    rom: "butda",
    es: "Pegarse. 시험에 붙다 = aprobar, literalmente «pegarse al examen».",
  },
  {
    kr: "떨어지다 · 미끄러지다",
    rom: "tteoreojida · mikkeureojida",
    es: "Caerse · resbalarse. Las dos maneras de decir «reprobar».",
  },
  {
    kr: "찹쌀떡",
    rom: "chapssaltteok",
    es: "Pastel de arroz glutinoso. El regalo pegajoso por excelencia.",
  },
  {
    kr: "엿",
    rom: "yeot",
    es: "Caramelo tradicional de malta. Se regala; no se «manda a comer».",
  },
  {
    kr: "수능",
    rom: "suneung",
    es: "El examen nacional de acceso a la universidad, un jueves de noviembre.",
  },
  {
    kr: "합격",
    rom: "hapgyeok",
    es: "Aprobado, admisión. 합격했어요! = ¡Aprobé!",
  },
  {
    kr: "응원",
    rom: "eungwon",
    es: "Ánimo, apoyo, porra. 응원할게! = ¡Te voy a estar animando!",
  },
];

const faqs = [
  {
    q: "¿Y si mi cumpleaños cae el día del examen? ¿Puedo comer sopa de algas?",
    a: "La tradición dice que no: muchas familias sirven la 미역국 al día siguiente, cuando ya no hay nada de qué resbalarse. Otras la toman igual, porque la superstición es un juego y la sopa es un cariño. Pero si preguntas en Corea, la mayoría te dirá «mejor mañana».",
  },
  {
    q: "¿Qué se regala en Corea a alguien que va a rendir un examen?",
    a: "Cosas que se pegan: 찹쌀떡 (pastel de arroz glutinoso) y 엿 (caramelo de malta) son los clásicos. Hoy también se regalan tenedores para «pinchar» las respuestas correctas y papel higiénico para que los problemas se «desenrollen». Todos son juegos de palabras en coreano.",
  },
  {
    q: "¿Por qué los aviones no despegan en Corea el día del 수능?",
    a: "Durante la sección de comprensión auditiva de inglés, unos 25 a 35 minutos al inicio de la tarde, se suspenden despegues y aterrizajes en todo el país para que el ruido no distraiga a los estudiantes. Ese día las oficinas y la bolsa abren más tarde y la policía escolta a los alumnos atrasados.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Por qué en Corea nadie come sopa de algas antes de un examen",
      description:
        "Por qué en Corea nadie come miyeokguk (sopa de algas) antes de un examen, qué se regala en su lugar y por qué el país se detiene el día del 수능.",
      datePublished: "2026-09-18",
      dateModified: "2026-09-18",
      inLanguage: "es",
      mainEntityOfPage: { "@type": "WebPage", "@id": POST_URL },
      image: "https://www.academiaseul.com/og-image.png",
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

export default function MiyeokgukPost() {
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
            <span className="bg-seoul-red text-white px-3 py-1">Cultura y comida</span>
            <span className="text-white/40">18 de septiembre, 2026 · 8 min</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            <span
              className="block text-seoul-gold text-5xl md:text-7xl mb-3"
              style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
            >
              미역국
            </span>
            Por qué en Corea nadie come sopa de algas antes de un examen
          </h1>
          <p className="text-white/70 text-lg leading-relaxed">
            En Corea, la sopa de algas{" "}
            <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>미역국</span>{" "}
            (miyeokguk) es el plato del cumpleaños y del posparto: cariño puro en
            un tazón. Pero la noche antes de un examen desaparece de todas las
            mesas del país. Detrás de esa superstición coreana hay un juego de
            palabras que, de paso, te enseña dos verbos clave.
          </p>
        </div>
      </section>

      {/* Body */}
      <article className="max-w-3xl mx-auto px-6 py-16 text-gray-800 leading-relaxed text-lg">

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          La noche antes del examen
        </h2>
        <p className="mb-6">
          Es un miércoles de noviembre en Seúl y mañana es el día grande. Una
          mamá abre el refrigerador, ve el envase de{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>미역국</span>{" "}
          que sobró del cumpleaños del abuelo y lo empuja hasta el fondo, detrás
          del kimchi, como quien esconde evidencia. Sobre la mesa deja otra cosa:
          una cajita de pasteles de arroz glutinoso y una barra de caramelo de
          malta. Su hija ni pregunta. Sabe leer el ambiente (sí, eso es{" "}
          <Link href="/blog/nunchi-el-arte-coreano-de-leer-el-ambiente" className="text-seoul-red font-bold underline">
            nunchi
          </Link>
          ) y sabe que esta noche la sopa no se toca.
        </p>
        <p className="mb-10">
          No es una familia rara. Es Corea entera. Y para entender por qué, hay
          que empezar por la sopa.
        </p>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Sopa de algas: la de cumpleaños, la de las mamás
        </h2>
        <p className="mb-6">
          La{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>미역국</span>{" "}
          se prepara con <em>miyeok</em> (alga wakame), a veces con carne de res
          o mariscos, y un caldo suave de aceite de sésamo y salsa de soya. Es
          uno de los platos más queridos de Corea, y no por moda: es rica en
          yodo, hierro y calcio, así que desde hace siglos es lo primero que
          toma una madre después del parto, a veces durante semanas.
        </p>
        <p className="mb-10">
          De ahí nace la costumbre más bonita del calendario coreano: comer sopa
          de algas el día de tu cumpleaños. No es un capricho, es un gesto: al
          tomarla recuerdas el primer plato que comió tu madre cuando naciste.
          Por eso, preguntar{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>미역국 먹었어?</span>{" "}
          (&ldquo;¿ya comiste tu sopa de algas?&rdquo;) el día del cumpleaños de
          alguien es, en la práctica, decirle &ldquo;feliz cumpleaños&rdquo;.
        </p>

        <blockquote className="border-l-4 border-seoul-red bg-[#F4F7FF] px-6 py-5 my-10 text-seoul-black font-medium">
          En el cumpleaños, la sopa de algas es un abrazo a tu mamá. Antes de un
          examen, es una cáscara de plátano.
        </blockquote>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Por qué la sopa de algas está prohibida antes de un examen
        </h2>
        <p className="mb-6">
          Todo se explica con una palabra:{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>미끄럽다</span>{" "}
          (mikkeureopda), &ldquo;resbaloso&rdquo;. Las algas cocidas se resbalan
          de los palillos... y en coreano, reprobar un examen se dice
          literalmente <strong>resbalarse</strong>:{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>시험에서 미끄러지다</span>.
          También se dice{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>떨어지다</span>,
          &ldquo;caerse&rdquo; del examen. ¿Y aprobar?{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>시험에 붙다</span>:
          &ldquo;pegarse&rdquo; al examen. Uno se pega o se resbala; no hay
          término medio.
        </p>
        <p className="mb-6">
          Con esa lógica, la sopa de algas es el enemigo público número uno de
          la temporada de exámenes. Nadie cree de verdad que un tazón de
          miyeokguk te haga olvidar la gramática, pero tampoco nadie quiere ser
          la mamá que la sirvió &ldquo;justo ese día&rdquo;. La superstición
          coreana funciona así: es un juego que todos juegan en serio.
        </p>
        <p className="mb-10">
          Tanto, que el propio plato se volvió sinónimo de fracaso. Si un
          coreano te dice con cara larga{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>미역국 먹었어</span>{" "}
          (&ldquo;me comí la sopa de algas&rdquo;), no te está contando su
          almuerzo: te está diciendo que reprobó, que lo despidieron o que le
          dijeron que no, sea en una entrevista de trabajo o en una declaración
          de amor.
        </p>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Lo que sí se regala: cosas pegajosas
        </h2>
        <p className="mb-6">
          Si resbalar es malo, pegarse es bueno, y Corea llevó la metáfora hasta
          el final. Los dos regalos clásicos para quien va a rendir un examen
          son el{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>찹쌀떡</span>{" "}
          (chapssaltteok), un pastel de arroz glutinoso que hay que despegarse
          de los dedos, y el{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>엿</span>{" "}
          (yeot), un caramelo tradicional de malta que se adhiere a los dientes
          con entusiasmo. Comes algo que se pega, te pegas al examen.
        </p>
        <p className="mb-6">
          La tradición no se quedó en el siglo pasado. Hoy también se regalan
          tenedores, para &ldquo;pinchar&rdquo; las respuestas correctas, y
          rollos de papel higiénico, porque los problemas se
          &ldquo;desenrollan&rdquo; (
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>풀다</span>{" "}
          significa a la vez desenrollar y resolver). Un idioma entero convertido
          en amuletos.
        </p>
        <p className="mb-10">
          Un consejo de amigo: regala{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>엿</span>, pero
          nunca digas{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>엿 먹어라</span>{" "}
          (&ldquo;come yeot&rdquo;): esa frase es un insulto de los fuertes. El
          caramelo, en cambio, se recibe con una sonrisa.
        </p>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          El día en que Corea entera se detiene
        </h2>
        <p className="mb-6">
          Todo esto llega a su punto máximo un jueves de mediados de noviembre:
          el día del{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>수능</span>{" "}
          (suneung), el examen nacional de acceso a la universidad. Más de medio
          millón de estudiantes rinden en una sola jornada la prueba que define
          buena parte de su futuro, y el país se organiza alrededor de ellos.
        </p>
        <p className="mb-6">
          Las oficinas y muchas empresas abren una hora más tarde para que el
          tráfico de la mañana sea de los estudiantes; la bolsa también retrasa
          su apertura. Si a un alumno no le llega el bus, puede subirse a un
          patrullero con sirena: cada año las noticias muestran a la policía
          escoltando a alguno que llegó con los segundos contados. Y durante la
          sección de comprensión auditiva de inglés, cerca de media hora al
          inicio de la tarde, ningún avión despega ni aterriza en todo el país.
        </p>
        <p className="mb-6">
          Afuera de cada colegio, desde el amanecer, los compañeros de cursos
          menores forman una hilera con carteles y tambores, gritando{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>화이팅</span>{" "}
          y{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>합격!</span>{" "}
          a cada estudiante que entra. Eso es{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>응원</span>{" "}
          (eungwon): ánimo organizado, casi deportivo, para gente que va a
          escribir en silencio durante horas.
        </p>

        <blockquote className="border-l-4 border-seoul-red bg-[#F4F7FF] px-6 py-5 my-10 text-seoul-black font-medium">
          El{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>수능</span>{" "}
          no es solo un examen. Es el día en que un país entero acuerda hacer
          silencio por sus hijos.
        </blockquote>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Mini-clase de coreano: el vocabulario del examen
        </h2>
        <p className="mb-6">
          Si todavía no lees Hangul, estas palabras te van a parecer dibujos
          bonitos. Con nuestro{" "}
          <Link href="/lector-hangul" className="text-seoul-red font-bold underline">
            Lector de Hangul gratis
          </Link>{" "}
          las lees en una tarde, porque{" "}
          <Link href="/blog/hangul-el-alfabeto-mas-cientifico" className="text-seoul-red font-bold underline">
            el alfabeto coreano es más lógico de lo que parece
          </Link>
          .
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

        <h3 className="text-2xl font-black text-seoul-black mb-4">
          Cómo se dice, cómo se usa
        </h3>
        <p className="mb-2">
          <span className="kr font-bold" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>시험 잘 봐! 꼭 붙을 거야.</span>{" "}
          <span className="text-gray-400 italic">(siheom jal bwa! kkok buteul geoya.)</span>
          <br />
          &ldquo;¡Que te vaya bien en el examen! Seguro apruebas.&rdquo;
          Literal: &ldquo;ve bien el examen, seguro te pegas&rdquo;.
        </p>
        <p className="mb-2">
          <span className="kr font-bold" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>이번엔 미역국 먹었어.</span>{" "}
          <span className="text-gray-400 italic">(ibeonen miyeokguk meogeosseo.)</span>
          <br />
          &ldquo;Esta vez me comí la sopa de algas&rdquo;: reprobé.
        </p>
        <p className="mb-10">
          <span className="kr font-bold" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>찹쌀떡 먹고 합격해!</span>{" "}
          <span className="text-gray-400 italic">(chapssaltteok meokgo hapgyeokhae!)</span>
          <br />
          &ldquo;Come chapssaltteok y aprueba.&rdquo; Lo que le dices a un
          amigo la noche anterior, cajita en mano.
        </p>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Y en Latinoamérica, ¿de qué nos agarramos?
        </h2>
        <p className="mb-6">
          Nosotros también tenemos nuestras mañas: el lápiz de la suerte que no
          se presta, la estampita de San José de Cupertino (patrono de los
          estudiantes con prueba difícil) dentro del estuche, la abuela que te
          echa la bendición en la puerta, el &ldquo;tocar madera&rdquo;. La
          diferencia está en dónde vive la suerte: en Latinoamérica, en un
          objeto o en un santo; en Corea, en el idioma. Como aprobar se dice
          &ldquo;pegarse&rdquo; y reprobar &ldquo;resbalarse&rdquo;, la comida
          sigue a las palabras.
        </p>
        <p className="mb-10">
          Y otra diferencia: cuando en Chile se rinde la PAES o en Colombia el
          ICFES, la vida sigue igual. Nadie retrasa la bolsa, ningún avión
          espera en la pista. En Corea, el{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>수능</span>{" "}
          es una fecha nacional: como un partido de la selección, pero en
          silencio absoluto.
        </p>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          ¿Vas por tu TOPIK? Nosotros no te prohibimos la sopa
        </h2>
        <p className="mb-6">
          Si estás preparando el TOPIK, el examen oficial de coreano, ya sabes
          qué <em>no</em> comer la noche anterior. Lo demás te lo damos
          nosotros: en Academia Seúl abrimos un grupo de{" "}
          <Link href="/nivel-1#clases" className="text-seoul-red font-bold underline">
            TOPIK II (B1+)
          </Link>{" "}
          los jueves a las 21:00 hora de Chile, con Jay, ocho semanas y máximo
          ocho personas. Trabajamos la escritura{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>쓰기</span>{" "}
          (preguntas 51 a 54, las que más puntos dejan en el camino) con
          corrección individual, y hacemos simulacros con tiempo real para que
          el día del examen no haya sorpresas. Cuesta US$150 el curso completo ·
          o 2 cuotas de US$75, y arrancamos la semana del 12 de octubre.
        </p>
        <p className="mb-10">
          La sopa de algas te la tomas el día que apruebes. Esa sí que va a
          saber a cumpleaños.
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
          <p
            className="text-4xl font-black text-seoul-gold mb-3"
            style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
          >
            미역국
          </p>
          <h3 className="text-2xl font-black mb-3">
            ¿Quieres leer estas palabras sin mirar la romanización?
          </h3>
          <p className="text-white/70 mb-7 max-w-md mx-auto">
            Empieza por el Lector de Hangul gratis (el alfabeto coreano se
            aprende en una tarde) o entra directo a los cursos en vivo de
            octubre: Básico 1, Básico 2, Conversacional 1, TOPIK II y Coreano
            para Niños.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/lector-hangul"
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
          <p className="text-white/50 text-sm mt-6">합격을 응원합니다, chingu! 🇰🇷</p>
        </div>
      </article>

      <Footer />
    </main>
  );
}
