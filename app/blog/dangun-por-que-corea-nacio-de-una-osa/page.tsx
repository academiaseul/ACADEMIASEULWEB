import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  // El layout añade " | Academia Seúl" (16 caracteres): título ≤ 44 para que el <title> final quede ≤ 60.
  title: "Dangún y el 개천절: Corea nació de una osa",
  description:
    "El mito de Dangún: una osa, un tigre, cien días de ajo y artemisa y el nacimiento de Corea en 2333 a. C. Por qué el 3 de octubre (개천절) es feriado nacional.",
  alternates: {
    canonical:
      "https://www.academiaseul.com/blog/dangun-por-que-corea-nacio-de-una-osa",
  },
  openGraph: {
    type: "article",
    title: "Dangún y el 개천절: por qué Corea nació de una osa",
    description:
      "Una osa, un tigre, cien días de ajo y artemisa: el mito fundacional de Corea y el feriado del 3 de octubre.",
    url: "https://www.academiaseul.com/blog/dangun-por-que-corea-nacio-de-una-osa",
    siteName: "Academia Seúl",
    locale: "es_CL",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Academia Seúl" }],
  },
};

const vocabulario = [
  {
    kr: "곰",
    rom: "gom",
    es: "Oso u osa. La heroína del mito: la que aguantó en la cueva.",
  },
  {
    kr: "호랑이",
    rom: "horangi",
    es: "Tigre. Rey de las montañas coreanas y el primero en rendirse.",
  },
  {
    kr: "마늘",
    rom: "maneul",
    es: "Ajo. Veinte dientes fue la ración; en Corea sigue estando en todo.",
  },
  {
    kr: "쑥",
    rom: "ssuk",
    es: "Artemisa. Hierba amarga y medicinal; hoy la comes en los 쑥떡 (pasteles de arroz verdes).",
  },
  {
    kr: "하늘",
    rom: "haneul",
    es: "Cielo. De ahí bajó Hwanung; también es un nombre de persona.",
  },
  {
    kr: "개천절",
    rom: "Gaecheonjeol",
    es: "El día en que se abrió el cielo. Feriado nacional, 3 de octubre.",
  },
  {
    kr: "단군",
    rom: "Dangun",
    es: "Dangún, el fundador legendario de Corea. Título completo: 단군왕검.",
  },
  {
    kr: "신화",
    rom: "sinhwa",
    es: "Mito. 단군 신화 = el mito de Dangún; 그리스 신화 = mitología griega.",
  },
  {
    kr: "인내",
    rom: "innae",
    es: "Paciencia. Lo que tuvo la osa y le faltó al tigre.",
  },
];

const faq = [
  {
    q: "¿Qué se celebra el 3 de octubre en Corea?",
    a: "El 개천절 (Gaecheonjeol), el Día de la Fundación Nacional: conmemora la bajada de Hwanung desde el cielo y la fundación de Gojoseon por Dangún en el 2333 a. C. Es feriado nacional en Corea del Sur desde 1949, con ceremonia oficial, bandera en los balcones y una ofrenda en el altar 참성단 del monte Manisan.",
  },
  {
    q: "¿Dangún existió de verdad?",
    a: "Los historiadores lo tratan como una figura legendaria y la fecha del 2333 a. C. como simbólica: no hay evidencia arqueológica de un reino tan temprano. Lo que sí existió fue Gojoseon, un estado real que aparece en fuentes chinas y cayó ante la dinastía Han en el 108 a. C. El mito le da un origen celestial a ese reino histórico.",
  },
  {
    q: "¿Por qué el tigre es el símbolo de Corea si perdió la prueba?",
    a: "Porque en la cultura coreana el tigre nunca fue el villano: es el guardián de las montañas, compañero del espíritu 산신, protagonista de las pinturas populares 민화 y hasta mascota olímpica (Hodori en 1988, Soohorang en 2018). La osa representa la paciencia que funda; el tigre, la energía que protege. Corea se quedó con los dos.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline:
        "Dangún y el 개천절: por qué Corea nació de una osa (y no de un tigre)",
      description:
        "El mito de Dangún: una osa, un tigre, cien días de ajo y artemisa y el nacimiento de Corea en 2333 a. C. Por qué el 3 de octubre (개천절) es feriado nacional.",
      datePublished: "2026-09-18",
      dateModified: "2026-09-18",
      inLanguage: "es",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://www.academiaseul.com/blog/dangun-por-que-corea-nacio-de-una-osa",
      },
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

export default function DangunPost() {
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
            <span className="bg-seoul-red text-white px-3 py-1">Mitos y fiestas</span>
            <span className="text-white/40">18 de septiembre, 2026 · 8 min</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            <span
              className="block text-seoul-gold text-5xl md:text-7xl mb-3"
              style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
            >
              단군
            </span>
            Dangún y el 개천절: por qué Corea nació de una osa (y no de un tigre)
          </h1>
          <p className="text-white/70 text-lg leading-relaxed">
            Cada 3 de octubre, Corea del Sur cierra oficinas y escuelas para
            celebrar su cumpleaños número cuatro mil y pico. No conmemora una
            batalla ni una independencia: celebra el día en que el cielo se abrió
            y un dios bajó a una montaña. Y en el centro de la historia hay una
            osa con más paciencia que todos nosotros juntos. Este es el mito de
            Dangún{" "}
            (<span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>단군</span>),
            el origen del{" "}
            <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>개천절</span>.
          </p>
        </div>
      </section>

      {/* Body */}
      <article className="max-w-3xl mx-auto px-6 py-16 text-gray-800 leading-relaxed text-lg">

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Una cueva, dos candidatos y un menú imposible
        </h2>
        <p className="mb-6">
          Imagina la escena. Una cueva oscura en la ladera de una montaña. Afuera,
          el sol; adentro, dos animales que acaban de aceptar el reto más raro de
          la historia: cien días sin ver la luz, comiendo solo ajo y artemisa. El
          premio no es dinero. El premio es convertirse en ser humano.
        </p>
        <p className="mb-10">
          El primer candidato es un tigre: fuerte, veloz, rey indiscutido de los
          montes coreanos. El segundo es una osa: lenta, silenciosa, de las que no
          llaman la atención hasta que las necesitas. ¿A quién le apostarías?
          Corea entera te diría que apostaste mal. Y de esa apuesta perdida nace,
          según el mito de Dangún, todo un país.
        </p>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          El mito de Dangún, paso a paso
        </h2>
        <p className="mb-6">
          La versión más citada está en el{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>삼국유사</span>{" "}
          (Samguk Yusa), la colección de historias y leyendas que el monje{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>일연</span>{" "}
          (Iryeon) compiló a finales del siglo XIII. Va así.
        </p>
        <p className="mb-6">
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>환인</span>{" "}
          (Hwanin), el señor del cielo, tenía un hijo,{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>환웅</span>{" "}
          (Hwanung), con ganas de gobernar el mundo de los humanos. El padre le
          dio permiso, tres sellos celestiales y tres mil seguidores. Hwanung
          bajó al monte{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>태백</span>{" "}
          (Taebaek), junto a un árbol sagrado, con tres ministros muy
          específicos: el señor del viento, el de la lluvia y el de las nubes.
        </p>
        <p className="mb-6">
          Entonces aparecieron el tigre y la osa, que compartían una cueva y
          rezaban a diario para ser humanos. Hwanung les dio un puñado de
          artemisa (<span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>쑥</span>)
          y veinte dientes de ajo (<span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>마늘</span>)
          con una sola instrucción: cómanlos y no vean la luz del sol durante
          cien días. El tigre, impaciente, se rindió a los pocos días. La osa
          aguantó y, según el texto, a los veintiún días (
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>삼칠일</span>,
          &ldquo;tres sietes&rdquo;, un número sagrado que todavía marca las
          tres semanas de resguardo de las madres coreanas que acaban de dar a
          luz) ya era mujer:{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>웅녀</span>{" "}
          (Ungnyeo), literalmente &ldquo;la mujer osa&rdquo;.
        </p>
        <p className="mb-10">
          A Ungnyeo le faltaba un hijo. Lo pidió bajo el árbol sagrado, Hwanung
          tomó forma humana para casarse con ella y de esa unión nació{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>단군왕검</span>{" "}
          (Dangun Wanggeom). Dangún fundó{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>고조선</span>{" "}
          (Gojoseon), el primer reino de la península, en el 2333 a. C. según la
          cronología tradicional, y terminó convertido en dios de la montaña a la
          nada despreciable edad de 1.908 años. Lo dice el texto; nosotros solo
          traducimos.
        </p>

        <blockquote className="border-l-4 border-seoul-red bg-[#F4F7FF] px-6 py-5 my-10 text-seoul-black font-medium">
          Para volverse humano no ganó el más fuerte ni el más rápido. Ganó la que
          supo esperar en la oscuridad.
        </blockquote>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          개천절: el feriado en que se abrió el cielo
        </h2>
        <p className="mb-6">
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>개천절</span>{" "}
          (Gaecheonjeol) significa &ldquo;el día en que se abrió el
          cielo&rdquo;:{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>개</span>{" "}
          (abrir) +{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>천</span>{" "}
          (cielo) +{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>절</span>{" "}
          (festividad). Conmemora la bajada de Hwanung y la fundación de
          Gojoseon, y desde 1949 se celebra en fecha fija: el 3 de octubre. Es
          uno de los cinco{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>국경일</span>,
          los días nacionales de Corea del Sur, y sí, es feriado: bandera en los
          balcones, ceremonia oficial y una ofrenda en el{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>참성단</span>,
          el altar de piedra del monte{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>마니산</span>{" "}
          (Manisan), en la isla de Ganghwa, que la tradición atribuye al propio
          Dangún.
        </p>
        <p className="mb-10">
          De ahí sale también el calendario{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>단기</span>{" "}
          (Dangi), que cuenta los años desde el 2333 a. C. Corea del Sur lo usó
          oficialmente entre 1948 y 1961 y todavía aparece en ceremonias. Haz la
          cuenta: 2026 es el año 4359 de la era de Dangún. Cuando un coreano te
          diga que su país tiene &ldquo;más de cuatro mil años de
          historia&rdquo;, ya sabes de dónde sale la cifra.
        </p>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Mini-clase de coreano: el vocabulario del mito
        </h2>
        <p className="mb-6">
          Nueve palabras que te dejan el mito en la punta de la lengua. Si
          todavía no lees Hangul, el{" "}
          <Link href="/lector-hangul" className="text-seoul-red font-bold underline">
            Lector de Hangul gratis
          </Link>{" "}
          te las pronuncia con voz nativa, y en{" "}
          <Link
            href="/blog/hangul-el-alfabeto-mas-cientifico"
            className="text-seoul-red font-bold underline"
          >
            nuestro artículo sobre el alfabeto más científico del mundo
          </Link>{" "}
          te contamos por qué se aprende tan rápido.
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
          Cómo se dice &ldquo;paciencia&rdquo; en coreano (y cómo la usó la osa)
        </h2>
        <p className="mb-6">
          La palabra elegante es{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>인내</span>{" "}
          (innae). En la conversación diaria se escucha más{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>인내심</span>{" "}
          (innaesim), &ldquo;el corazón de la paciencia&rdquo;, la cualidad de
          una persona:{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>인내심이 강해요</span>{" "}
          (innaesim-i ganghaeyo) = &ldquo;tiene mucha paciencia&rdquo;. La osa,
          sin duda,{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>인내심이 강했어요</span>.
        </p>
        <p className="mb-6">
          Pero el verbo que mueve la historia es{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>참다</span>{" "}
          (chamda): aguantar, contener, soportar. Es el verbo del hambre, del
          frío y de los veintiún días en la cueva. Tres frases que vas a usar
          más de lo que crees:
        </p>
        <p className="mb-2">
          <strong>
            <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>조금만 참으세요</span>
          </strong>{" "}
          (jogeumman chameuseyo) — &ldquo;Aguante un poquito más&rdquo;. Lo que
          Hwanung, seguramente, le dijo al tigre.
        </p>
        <p className="mb-2">
          <strong>
            <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>못 참겠어요</span>
          </strong>{" "}
          (mot chamgesseoyo) — &ldquo;Ya no aguanto más&rdquo;. La frase del
          tigre saliendo de la cueva.
        </p>
        <p className="mb-6">
          <strong>
            <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>잘 참았어요</span>
          </strong>{" "}
          (jal chamasseoyo) — &ldquo;Aguantaste bien&rdquo;. Lo que le diríamos
          a Ungnyeo, y a ti cuando termines tu primer curso.
        </p>
        <p className="mb-10">
          Hay hasta un refrán que resume la moraleja:{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>참을 인(忍) 자 셋이면 살인도 면한다</span>{" "}
          — &ldquo;con tres caracteres de <em>aguantar</em> te libras hasta de un
          asesinato&rdquo;. O sea: respira tres veces antes de reaccionar. Suena
          a{" "}
          <Link
            href="/blog/nunchi-el-arte-coreano-de-leer-el-ambiente"
            className="text-seoul-red font-bold underline"
          >
            nunchi
          </Link>
          , ¿no? No es casualidad: en Corea la paciencia y el arte de leer el
          ambiente son primas hermanas.
        </p>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          La osa, el tigre y nuestro tigre sin paciencia
        </h2>
        <p className="mb-6">
          Confesión de marca: el sello de Academia Seúl es un tigre. Sí, el mismo
          que se rindió a los pocos días. Lo elegimos porque en Corea el tigre es
          el guardián de las montañas y el protagonista de casi todos los cuentos
          que empiezan con{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>호랑이 담배 피우던 시절</span>{" "}
          (&ldquo;cuando los tigres fumaban en pipa&rdquo;, el &ldquo;érase una
          vez&rdquo; coreano). Pero también porque nos representa: tenemos cero
          paciencia para los métodos lentos.
        </p>
        <p className="mb-6">
          Por eso nuestra promesa es la del tigre: no te pedimos cien días en una
          cueva. El Hangul se diseñó en 1443 justamente para aprenderse rápido, y
          con el Lector de Hangul puedes leer tus primeras palabras esta misma
          semana. Lo que sí te pediremos, ya en clase, es un poquito de{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>인내심</span>{" "}
          de osa: ocho semanas, una hora por sesión. La cohorte que empieza la
          semana del 12 de octubre tiene Básico 1 (A1.1), Básico 2 (A1.2),
          Conversacional 1 (A2.1), TOPIK II (B1+) y Coreano para Niños (8–12),
          por US$150 el curso completo · o 2 cuotas de US$75.
        </p>

        <blockquote className="border-l-4 border-seoul-red bg-[#F4F7FF] px-6 py-5 my-10 text-seoul-black font-medium">
          Nuestro tigre sigue sin paciencia. Por eso acá aprendes a leer Hangul en
          una semana, no en cien días.
        </blockquote>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Corea y Latinoamérica: fiestas patrias de otro tipo
        </h2>
        <p className="mb-6">
          Septiembre es el mes de los gritos de independencia en buena parte del
          continente: Centroamérica el 15, México el 16, Chile el 18. Nuestras
          fiestas patrias celebran un acto humano y fechado. Corea tiene su
          versión de eso, el{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>광복절</span>{" "}
          (15 de agosto, la liberación de 1945), pero el{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>개천절</span>{" "}
          es otra cosa:
          celebra un nacimiento mítico, sin documento ni batalla, donde el país
          no se independiza de nadie sino que baja directamente del cielo.
        </p>
        <p className="mb-10">
          Y ojo, Latinoamérica tiene mitos de origen igual de potentes: el Popol
          Vuh maya dice que los dioses hicieron a los humanos de maíz; los incas
          cuentan que Manco Cápac y Mama Ocllo salieron del lago Titicaca
          enviados por el Sol. Fíjate en el paralelo: allá el ser humano nace del
          maíz, acá de una osa que comió ajo y artemisa. La comida siempre está
          en el centro del relato. La diferencia es que Corea le puso fecha,
          feriado y calendario a su mito.
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
          Si llegaste hasta aquí, ya sabes más del origen de Corea que muchos
          turistas que se sacan la foto en Gwanghwamun. Y para celebrar el{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>개천절</span>{" "}
          no necesitas una cueva: necesitas leer tu primera palabra en Hangul. De
          la osa, la paciencia; del tigre, las ganas. Vamos con las dos.
        </p>

        {/* CTA */}
        <div className="bg-seoul-black text-white border-2 border-seoul-black shadow-[8px_8px_0_#3D2EE8] px-8 py-10 mt-14 text-center">
          <p
            className="text-4xl font-black text-seoul-gold mb-3"
            style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
          >
            개천절
          </p>
          <h3 className="text-2xl font-black mb-3">
            ¿Cien días de ajo o una semana de Hangul?
          </h3>
          <p className="text-white/70 mb-7 max-w-md mx-auto">
            El cielo se abrió una vez sobre el monte Taebaek. El tuyo se abre con
            el Lector de Hangul gratis o con un cupo en los cursos en vivo que
            empiezan la semana del 12 de octubre.
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
          <p className="text-white/50 text-sm mt-6">화이팅 chingu! 🇰🇷</p>
        </div>
      </article>

      <Footer />
    </main>
  );
}
