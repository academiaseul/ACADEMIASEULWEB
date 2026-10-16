import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const POST_URL = "https://www.academiaseul.com/blog/como-escribir-tu-nombre-en-coreano";
const IMG = "/blog/como-escribir-tu-nombre-en-coreano";

const DESCRIPTION =
  "Tu nombre en hangul paso a paso: sílabas, 받침, la f, la v, la j y la z, la e final, 24 nombres como María (마리아) o José (호세) y cómo firmar en coreano.";

export const metadata: Metadata = {
  // El layout añade " | Academia Seúl" (16 caracteres): título ≤ 44 para que el <title> final quede ≤ 60.
  title: "Cómo se escribe tu nombre en coreano",
  description: DESCRIPTION,
  alternates: {
    canonical: POST_URL,
  },
  openGraph: {
    type: "article",
    title: "Cómo se escribe tu nombre en coreano (y por qué Sofía se lee «Sopia»)",
    description:
      "María es 마리아, José es 호세 y Valentina es 발렌티나: las reglas para escribir tu nombre en hangul, por qué hay variantes y cómo firmar con él.",
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

// Envuelve en <Kr> cada tramo en hangul de un texto plano (fichas, notas y FAQ).
const HANGUL = /([ㄱ-ㆎ가-힣]+)/;

function ConKr({ texto }: { texto: string }) {
  return (
    <>
      {texto.split(HANGUL).map((parte, i) =>
        i % 2 === 1 ? <Kr key={i}>{parte}</Kr> : parte
      )}
    </>
  );
}

function TuTurno({ children }: { children: ReactNode }) {
  return (
    <div className="border-2 border-seoul-black bg-white shadow-[4px_4px_0_#0a0a0f] px-5 py-4 mb-10">
      <p className="text-xs font-bold tracking-wider uppercase text-seoul-red mb-2">
        Tu turno
      </p>
      <p className="text-base text-gray-700 leading-snug">{children}</p>
    </div>
  );
}

const linkCls = "text-seoul-red font-bold underline underline-offset-4";

// Las letras que el coreano no tiene (외래어 표기법, apartado del español)
const letras = [
  {
    regla: "f → ㅍ",
    ejemplos: "소피아 Sofía · 페르난다 Fernanda · 펠리페 Felipe",
    nota: "La ㅍ es una p con soplo. Por eso, en boca coreana, Sofía suena «Sopia» y Felipe, «Pelipe». Con cariño.",
  },
  {
    regla: "v → ㅂ",
    ejemplos: "발렌티나 Valentina · 비센테 Vicente · 빅토리아 Victoria",
    nota: "En español la b y la v suenan igual, y en coreano también: las dos son ㅂ. Adiós al «¿con b larga o v corta?».",
  },
  {
    regla: "l y r → ㄹ",
    ejemplos: "카밀라 Camila · 다니엘라 Daniela · 로드리고 Rodrigo",
    nota: "Una sola letra para las dos. Entre vocales, ㄹ suena como la r de «pero», así que la l entre vocales se escribe doble: 카밀라, no 카미라 (que sonaría «Camira»). La rr fuerte de «perro» no existe: queda en ㄹ.",
  },
  {
    regla: "j y g (antes de e, i) → ㅎ",
    ejemplos: "호세 José · 하비에르 Javier · 호르헤 Jorge",
    nota: "La ㅎ es una h aspirada, más suave que nuestra j. En Jorge, la j y la g suenan igual, y en hangul también. Ojo: la J del inglés es ㅈ (제니퍼, Jennifer).",
  },
  {
    regla: "z y c (antes de e, i) → ㅅ",
    ejemplos: "루시아 Lucía · 콘스탄사 Constanza · 베아트리스 Beatriz",
    nota: "Como en Latinoamérica, la z y la c suave suenan s. Y los apellidos en -ez terminan todos en 스: 페레스, 곤살레스, 마르티네스.",
  },
  {
    regla: "h → nada",
    ejemplos: "우고 Hugo · 엑토르 Héctor · 에르난데스 Hernández",
    nota: "Si en español no suena, en coreano no se escribe. Hugo es 우고; 휴고 sería la versión en inglés.",
  },
  {
    regla: "ll / y → 야, 예, 요, 유",
    ejemplos: "기예르모 Guillermo · 욜란다 Yolanda · 에스트레야 Estrella",
    nota: "La ll y la y se funden con la vocal que sigue en un solo bloque: lla es 야, lle es 예, yo es 요.",
  },
  {
    regla: "ñ → 냐, 녜, 뇨, 뉴",
    ejemplos: "베고냐 Begoña · 무뇨스 Muñoz · 페냐 Peña",
    nota: "La ñ se arma con ㄴ y una vocal de doble rayita: ña es 냐 y ño es 뇨.",
  },
  {
    regla: "qu, gu y gua",
    ejemplos: "호아킨 Joaquín · 미겔 Miguel · 과달루페 Guadalupe",
    nota: "Antes de e o i, qu es ㅋ y gu es ㄱ: la u no suena y no se escribe. Antes de a, se funden en un bloque: gua es 과.",
  },
  {
    regla: "x",
    ejemplos: "히메나 / 시메나 Ximena",
    nota: "La norma escribe la x inicial como ㅅ (시메나), pero si la dices «Jimena», como casi todos, lo que suena es 히메나. Más abajo, en las variantes.",
  },
];

// Nombres frecuentes · transcripción según la 외래어 표기법 · rom = romanización revisada del hangul
const nombres = [
  { kr: "마리아", es: "María", rom: "maria", nota: "Tres sílabas, tres bloques. La tilde se va." },
  { kr: "카밀라", es: "Camila", rom: "kamilla", nota: "La l entre vocales va doble: ㄹㄹ." },
  { kr: "발렌티나", es: "Valentina", rom: "ballentina", nota: "v → ㅂ, y otra vez la ㄹㄹ." },
  { kr: "소피아", es: "Sofía", rom: "sopia", nota: "f → ㅍ. En Corea, «Sopia»." },
  { kr: "페르난다", es: "Fernanda", rom: "pereunanda", nota: "r antes de consonante: 르." },
  { kr: "마르티나", es: "Martina", rom: "mareutina", nota: "Igual que Fernanda: 마르." },
  { kr: "카탈리나", es: "Catalina", rom: "katallina", nota: "c → ㅋ y l → ㄹㄹ." },
  { kr: "하비에라", es: "Javiera", rom: "habiera", nota: "j → ㅎ y v → ㅂ." },
  { kr: "루시아", es: "Lucía", rom: "rusia", nota: "Romanizado da «rusia». Tranquila: nadie te va a confundir con un país." },
  { kr: "콘스탄사", es: "Constanza", rom: "konseutansa", nota: "La s antes de t pide su ㅡ; la z, ㅅ." },
  { kr: "히메나", es: "Ximena · Jimena", rom: "himena", nota: "Por sonido. Por letra, la x daría 시메나." },
  { kr: "가브리엘라", es: "Gabriela", rom: "gabeuriella", nota: "Como Gabriela Mistral en los libros coreanos." },
  { kr: "호세", es: "José", rom: "hose", nota: "La e final se queda: 세." },
  { kr: "디에고", es: "Diego", rom: "diego", nota: "ie: dos bloques, 디 + 에." },
  { kr: "하비에르", es: "Javier", rom: "habiereu", nota: "La r final va aparte: 르." },
  { kr: "호아킨", es: "Joaquín", rom: "hoakin", nota: "qu antes de i: ㅋ." },
  { kr: "마티아스", es: "Matías", rom: "matiaseu", nota: "La s final: 스." },
  { kr: "벤하민", es: "Benjamín", rom: "benhamin", nota: "La j española, siempre ㅎ." },
  { kr: "아구스틴", es: "Agustín", rom: "aguseutin", nota: "La n final, abajo: 틴." },
  { kr: "미겔", es: "Miguel", rom: "migel", nota: "gu antes de e: ㄱ, sin u." },
  { kr: "호르헤", es: "Jorge", rom: "horeuhe", nota: "La j y la g, las dos ㅎ." },
  { kr: "카를로스", es: "Carlos", rom: "kareulloseu", nota: "r → 르, l → ㄹㄹ, s → 스." },
  { kr: "앙헬", es: "Ángel", rom: "anghel", nota: "n antes de g: ㅇ abajo." },
  { kr: "우고", es: "Hugo", rom: "ugo", nota: "La h no suena ni se escribe." },
];

const vocabulario = [
  { kr: "이름", rom: "ireum", es: "Nombre. «¿Cómo te llamas?» se dice 이름이 뭐예요?" },
  { kr: "성함", rom: "seongham", es: "Nombre, en respetuoso. A un adulto: 성함이 어떻게 되세요?" },
  { kr: "성", rom: "seong", es: "Apellido. En Corea va primero: 김재희 = 김 + 재희." },
  { kr: "한글", rom: "hangeul", es: "El alfabeto coreano, con 19 consonantes y 21 vocales." },
  { kr: "음절", rom: "eumjeol", es: "Sílaba. En hangul, cada sílaba es un bloque." },
  { kr: "받침", rom: "batchim", es: "La consonante final, la que va abajo del bloque." },
  { kr: "외래어 표기법", rom: "oeraeeo pyogibeop", es: "La norma oficial para escribir palabras extranjeras en hangul." },
  { kr: "서명 · 사인", rom: "seomyeong · sain", es: "Firma. 사인 es la forma más coloquial." },
  { kr: "도장", rom: "dojang", es: "Sello con el nombre, para firmar documentos." },
  { kr: "드림", rom: "deurim", es: "«De parte de», con respeto, al final de un mensaje: 카밀라 드림." },
];

const faqs = [
  {
    q: "¿Cómo se escribe mi nombre en coreano?",
    a: "Por cómo suena, sílaba por sílaba. Cada sílaba es un bloque de hangul: María es 마리아, José es 호세, Camila es 카밀라 y Valentina es 발렌티나. Las letras que no existen en coreano tienen reemplazo fijo: la f es ㅍ, la v es ㅂ, la j es ㅎ y la z es ㅅ. Para una primera versión al tiro, usa el generador gratis de Academia Seúl en academiaseul.com/generador-nombre y revísala con estas reglas.",
  },
  {
    q: "¿Mi nombre en coreano tiene un significado?",
    a: "No. Tu nombre se transcribe por su sonido, no se traduce: 마리아 no significa nada en coreano, solo suena María. Lo que sí existe es el 한국 이름, un nombre coreano nuevo que algunos extranjeros adoptan, elegido por significado y muchas veces con caracteres chinos (한자) detrás de cada sílaba. Es bonito, pero es otro nombre.",
  },
  {
    q: "¿Por qué mi nombre aparece escrito de varias formas en hangul?",
    a: "Porque hay una norma oficial, la 외래어 표기법, y también gente que escribe de oído. Además cambia según el idioma de origen (David es 다비드 en español y 데이비드 en inglés) y según cómo lo pronuncias tú (Ximena puede ser 히메나 o 시메나). Elige una forma y úsala siempre igual.",
  },
  {
    q: "¿Cómo se escriben la f, la v, la j y la z en coreano?",
    a: "El coreano no tiene esas letras, así que se reemplazan: f → ㅍ (Sofía, 소피아), v → ㅂ (Valentina, 발렌티나), j → ㅎ (José, 호세) y z → ㅅ (Constanza, 콘스탄사). La l y la r comparten una sola letra, ㄹ, y la h que no suena tampoco se escribe (Hugo, 우고).",
  },
  {
    q: "¿Cómo me presento con mi nombre en coreano?",
    a: "Si tu nombre en hangul termina en vocal, di 저는 카밀라예요 (soy Camila); si termina en consonante final (받침), 저는 가브리엘이에요 (soy Gabriel). Ojo: Carlos, 카를로스, termina en vocal en hangul, así que es 저는 카를로스예요. También puedes decir 제 이름은 마르티나예요 (mi nombre es Martina).",
  },
  {
    q: "¿Cómo escribo mi apellido en coreano?",
    a: "Con las mismas reglas que el nombre: González es 곤살레스, Muñoz es 무뇨스, Rojas es 로하스, Pérez es 페레스 y Silva es 실바. Para un nombre extranjero se mantiene el orden y se deja un espacio: 카밀라 로하스. Los coreanos, en cambio, escriben primero el apellido y pegado: 김재희.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Cómo se escribe tu nombre en coreano (y por qué Sofía se lee «Sopia»)",
      description: DESCRIPTION,
      datePublished: "2026-10-15",
      dateModified: "2026-10-15",
      inLanguage: "es",
      mainEntityOfPage: { "@type": "WebPage", "@id": POST_URL },
      image: [
        "https://www.academiaseul.com/og-image.png",
        `https://www.academiaseul.com${IMG}/credencial-camila.png`,
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

export default function NombreEnCoreanoPost() {
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
            <span className="bg-seoul-red text-white px-3 py-1">Idioma</span>
            <span className="text-white/40">15 de octubre, 2026 · 12 min</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            <span className="block text-seoul-gold text-5xl md:text-7xl mb-3" style={KR_FONT}>
              이름
            </span>
            Cómo se escribe tu nombre en coreano (y por qué Sofía se lee «Sopia»)
          </h1>
          <p className="text-white/70 text-lg leading-relaxed">
            Nací en Seúl y crecí en Chile, así que mi nombre hizo el viaje al
            revés: en Corea soy <Kr>김재희</Kr> y en Chile todos me dicen Jay. Hoy
            te toca a ti el viaje de ida. La buena noticia: tu nombre no se
            traduce al coreano, se escucha. María es <Kr>마리아</Kr>, José es{" "}
            <Kr>호세</Kr> y Valentina es <Kr>발렌티나</Kr>. Aquí van las reglas
            para escribir el tuyo en hangul, por qué a veces aparece de dos formas
            y cómo firmar con él.
          </p>
        </div>
      </section>

      {/* Body */}
      <article className="max-w-3xl mx-auto px-6 py-16 text-gray-800 leading-relaxed text-lg">

        {/* 1 · Por sonido */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Por sonido, no por significado
        </h2>
        <p className="mb-6">
          Lo primero: tu nombre no tiene &ldquo;traducción&rdquo;. Un coreano no
          busca qué significa Camila; escucha cómo suena y lo escribe con las
          letras del hangul, sílaba por sílaba. Es lo mismo que pasa al revés con
          los nombres coreanos: <Kr>김재희</Kr> se escribe Kim Jae-hee en letras
          latinas, y nadie pregunta qué quiere decir.
        </p>
        <p className="mb-6">
          Para que todos lo hagan igual existe una norma: la{" "}
          <Kr>외래어 표기법</Kr> (oeraeeo pyogibeop), las reglas oficiales para
          escribir palabras extranjeras en hangul, hoy a cargo del{" "}
          <Kr>국립국어원</Kr>, el Instituto Nacional de la Lengua Coreana. Tiene
          un apartado completo para el español y es la que siguen, en general,
          los libros y la prensa: en la cartelera coreana, Javier Bardem es{" "}
          <Kr>하비에르 바르뎀</Kr>, y Guillermo del Toro,{" "}
          <Kr>기예르모 델 토로</Kr>. Salvo cuando te muestre variantes (y te
          aviso), los ejemplos de este artículo siguen esa norma.
        </p>
        <p className="mb-10">
          ¿Y si quieres un nombre con significado? Eso es otra cosa: un{" "}
          <Kr>한국 이름</Kr> (hanguk ireum), un nombre coreano nuevo. Los nombres
          coreanos suelen tener tres sílabas, primero el apellido y después el
          nombre (<Kr>김</Kr> + <Kr>재희</Kr>), y muchas veces cada sílaba lleva
          detrás un carácter chino, un <Kr>한자</Kr>, con su significado. Hay
          extranjeros que adoptan uno, elegido con un amigo o un profe coreano.
          Es bonito, pero no es tu nombre en hangul: es un nombre nuevo.
        </p>

        <figure className="my-12 mx-auto max-w-xs">
          <img
            src={`${IMG}/credencial-camila.png`}
            alt="Ilustración de Academia Seúl: una credencial azul que cuelga de su cinta, con la palabra 이름 (nombre) en la cabecera, una carita sonriente y el nombre Camila escrito en hangul, 카밀라."
            width={720}
            height={720}
            loading="lazy"
            decoding="async"
            className="w-full h-auto"
          />
          <figcaption className="text-sm text-gray-500 mt-2 text-center">
            Camila en hangul: <Kr>카밀라</Kr>. Ya verás por qué lleva dos{" "}
            <Kr>ㄹ</Kr>.
          </figcaption>
        </figure>

        {/* 2 · Sílabas */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Paso 1: corta tu nombre en sílabas
        </h2>
        <p className="mb-6">
          El hangul no se escribe letra tras letra en fila, sino en bloques: cada
          bloque es una sílaba, con una consonante, una vocal y, a veces, una
          consonante final abajo. Así que el primer paso es decir tu nombre lento
          y contar: Va-len-ti-na son cuatro sílabas, y en hangul, cuatro bloques:{" "}
          <Kr>발렌티나</Kr>. Ma-rí-a son tres: <Kr>마리아</Kr>.
        </p>
        <p className="mb-6">
          Si una sílaba empieza con vocal, se le pone delante una <Kr>ㅇ</Kr>, que
          al comienzo del bloque no suena: es como un asiento vacío para que la
          vocal no quede sola. Por eso Ana es <Kr>아나</Kr> y la última a de
          María es <Kr>아</Kr>.
        </p>
        <p className="mb-10">
          Y algo clave: el coreano no junta consonantes. Cada consonante necesita
          su vocal (salvo las que bajan al <Kr>받침</Kr>, que vemos en el paso 2),
          y cuando no la tiene se le agrega <Kr>ㅡ</Kr> (eu), una vocal
          cortita y apagada. Así, Pablo es <Kr>파블로</Kr>; Cristóbal,{" "}
          <Kr>크리스토발</Kr>, y Andrés, <Kr>안드레스</Kr>. Por lo mismo, la s del
          final se escribe aparte, como <Kr>스</Kr>: Carlos es <Kr>카를로스</Kr>;
          Matías, <Kr>마티아스</Kr>, y Tomás, <Kr>토마스</Kr>.
        </p>

        {/* 3 · 받침 */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Paso 2: el <Kr>받침</Kr>, la consonante del piso de abajo
        </h2>
        <p className="mb-6">
          Algunos bloques tienen un piso de abajo: la consonante final, que en
          coreano se llama <Kr>받침</Kr> (batchim), &ldquo;lo que sostiene&rdquo;.
          En <Kr>강</Kr> (gang, río), la <Kr>ㄱ</Kr> y la <Kr>ㅏ</Kr> van arriba y
          la <Kr>ㅇ</Kr> abajo, donde ya no es un asiento vacío: suena ng.
        </p>

        <figure className="my-12 mx-auto max-w-xs">
          <img
            src={`${IMG}/silaba-gang-batchim.png`}
            alt="Ilustración de Academia Seúl: un edificio con el letrero 강 en el techo; en el piso de arriba, las letras ㄱ (consonante) y ㅏ (vocal); en el piso de abajo, pintado de amarillo, la letra ㅇ con el rótulo 받침."
            width={720}
            height={830}
            loading="lazy"
            decoding="async"
            className="w-full h-auto"
          />
          <figcaption className="text-sm text-gray-500 mt-2 text-center">
            La sílaba <Kr>강</Kr>: consonante y vocal arriba, <Kr>받침</Kr> abajo.
          </figcaption>
        </figure>

        <p className="mb-6">
          Para palabras extranjeras, la norma permite solo siete <Kr>받침</Kr>:{" "}
          <Kr>ㄱ</Kr>, <Kr>ㄴ</Kr>, <Kr>ㄹ</Kr>, <Kr>ㅁ</Kr>, <Kr>ㅂ</Kr>,{" "}
          <Kr>ㅅ</Kr> y <Kr>ㅇ</Kr>. En nombres en español verás sobre todo estos:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <Kr>ㄴ</Kr>, la n al final o antes de consonante: <Kr>후안</Kr> (Juan),{" "}
            <Kr>아구스틴</Kr> (Agustín), <Kr>페르난다</Kr> (Fernanda).
          </li>
          <li>
            <Kr>ㄹ</Kr>, la l al final o antes de consonante: <Kr>가브리엘</Kr>{" "}
            (Gabriel), <Kr>라울</Kr> (Raúl), <Kr>실바</Kr> (Silva).
          </li>
          <li>
            <Kr>ㅇ</Kr>, la n antes de c o g, que en español ya suena ng:{" "}
            <Kr>앙헬</Kr> (Ángel), <Kr>블랑카</Kr> (Blanca), <Kr>도밍고</Kr>{" "}
            (Domingo). Dilo lento: en Ángel, la n se va para atrás, hacia el
            fondo de la boca. El hangul lo anota tal cual.
          </li>
          <li>
            <Kr>ㄱ</Kr>, la c antes de otra consonante: <Kr>빅토리아</Kr>{" "}
            (Victoria), <Kr>엑토르</Kr> (Héctor).
          </li>
          <li>
            <Kr>ㅁ</Kr>, la m antes de consonante: <Kr>암파로</Kr> (Amparo).
          </li>
        </ul>
        <p className="mb-6">
          ¿Y por qué la s, la d y la r del final no van abajo, como{" "}
          <Kr>받침</Kr>? Porque ahí cambian de sonido. Una <Kr>ㅅ</Kr> como <Kr>받침</Kr> suena casi
          como t: <Kr>토맛</Kr> se leería &ldquo;Tomat&rdquo;. Para que suene la
          s, va aparte, con su <Kr>ㅡ</Kr>: <Kr>토마스</Kr>. Lo mismo pasa con la
          d (<Kr>다비드</Kr>, David; <Kr>트리니다드</Kr>, Trinidad) y con la r:
          una <Kr>ㄹ</Kr> abajo suena l, y Javier quedaría &ldquo;Javiel&rdquo;
          (<Kr>하비엘</Kr>). Por eso la norma escribe <Kr>하비에르</Kr>.
        </p>
        <TuTurno>
          Di tu nombre lento y fíjate en cada consonante que cierra una sílaba.
          ¿Es una n, una l, una m o una c antes de otra consonante? Va abajo, como{" "}
          <Kr>받침</Kr> (y si es una n antes de c o g, como <Kr>ㅇ</Kr>). ¿Es una
          s, una d, una r o una z? Va aparte, con su <Kr>ㅡ</Kr>.
        </TuTurno>

        {/* 4 · Letras que no existen */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Paso 3: las letras que el coreano no tiene
        </h2>
        <p className="mb-6">
          El hangul tiene 19 consonantes y entre ellas no hay f, ni v, ni z, ni
          nuestra j. No importa: para cada sonido del español hay un reemplazo
          fijo. Estos son los que más aparecen en nuestros nombres.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {letras.map((l) => (
            <div
              key={l.regla}
              className="border-2 border-seoul-black bg-white shadow-[4px_4px_0_#0a0a0f] px-5 py-4"
            >
              <div className="text-xl font-black text-seoul-red mb-1">
                <ConKr texto={l.regla} />
              </div>
              <div className="text-sm text-seoul-black font-bold mb-2">
                <ConKr texto={l.ejemplos} />
              </div>
              <div className="text-base text-gray-700 leading-snug">
                <ConKr texto={l.nota} />
              </div>
            </div>
          ))}
        </div>

        {/* 5 · La e final */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          La e final (y las otras vocales)
        </h2>
        <p className="mb-6">
          Las vocales son la parte fácil: la a es <Kr>ㅏ</Kr>, la e es{" "}
          <Kr>ㅔ</Kr>, la i es <Kr>ㅣ</Kr>, la o es <Kr>ㅗ</Kr> y la u es{" "}
          <Kr>ㅜ</Kr>. Igual que en español, suenan claras y siempre igual.
        </p>
        <p className="mb-6">
          La e del final merece un párrafo propio. En inglés muchas veces no
          suena; en español sí, y en hangul se queda con su sílaba: <Kr>호세</Kr>{" "}
          (José), <Kr>비센테</Kr> (Vicente), <Kr>펠리페</Kr> (Felipe),{" "}
          <Kr>호르헤</Kr> (Jorge), <Kr>엔리케</Kr> (Enrique). Compara: Irene, como
          la de Red Velvet, se escribe <Kr>아이린</Kr>, porque se dice a la inglesa;
          una Irene chilena es <Kr>이레네</Kr>.
        </p>
        <p className="mb-6">
          Dos trampas. El coreano tiene otra vocal parecida, <Kr>ㅐ</Kr>, que hoy
          suena casi igual que <Kr>ㅔ</Kr>, pero para la e del español la norma
          usa siempre <Kr>ㅔ</Kr>: <Kr>호세</Kr>, no <Kr>호새</Kr>. Y no confundas
          tu e con la <Kr>ㅡ</Kr> de relleno: Carlos es <Kr>카를로스</Kr>, con
          esa vocal cortita al final, no &ldquo;Carlose&rdquo;.
        </p>
        <p className="mb-10">
          Cuando hay dos vocales seguidas, cada una va en su bloque: Diego es{" "}
          <Kr>디에고</Kr>; Juan, <Kr>후안</Kr>; Paula, <Kr>파울라</Kr>, y Mateo,{" "}
          <Kr>마테오</Kr>. Y las tildes desaparecen, porque el hangul no marca el
          acento: Sofía y Sofia son el mismo <Kr>소피아</Kr>.
        </p>

        <blockquote className="border-l-4 border-seoul-red bg-[#F4F7FF] px-6 py-5 my-10 text-seoul-black font-medium">
          En hangul tu nombre no se traduce: se escucha y se arma, bloque por
          bloque, como un puzzle.
        </blockquote>

        {/* 6 · Nombres frecuentes */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          24 nombres frecuentes en Latinoamérica, en hangul
        </h2>
        <p className="mb-6">
          Todos siguen la norma del <Kr>국립국어원</Kr>, salvo Ximena, que va por
          sonido (más abajo te explico por qué). Debajo de cada uno, en gris, va
          la romanización del hangul: es como un coreano leería tu nombre de
          vuelta en letras latinas. Ahí se ve clarito cómo la f se volvió p.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {nombres.map((n) => (
            <div
              key={n.es}
              className="border-2 border-seoul-black bg-white shadow-[4px_4px_0_#0a0a0f] px-4 py-3"
            >
              <div className="text-lg sm:text-2xl font-black text-seoul-red break-keep" style={KR_FONT}>
                {n.kr}
              </div>
              <div className="text-base font-bold text-seoul-black">{n.es}</div>
              <div className="text-sm text-gray-400 italic mb-1">{n.rom}</div>
              <div className="text-sm text-gray-700 leading-snug">
                <ConKr texto={n.nota} />
              </div>
            </div>
          ))}
        </div>
        <p className="mb-10">
          Y tu apellido, con las mismas reglas: <Kr>곤살레스</Kr> (González),{" "}
          <Kr>무뇨스</Kr> (Muñoz), <Kr>로하스</Kr> (Rojas), <Kr>디아스</Kr>{" "}
          (Díaz), <Kr>페레스</Kr> (Pérez), <Kr>실바</Kr> (Silva),{" "}
          <Kr>로드리게스</Kr> (Rodríguez), <Kr>가르시아</Kr> (García),{" "}
          <Kr>로페스</Kr> (López) o <Kr>에르난데스</Kr> (Hernández). Y de yapa,
          nuestros países como los escriben los coreanos: <Kr>칠레</Kr>,{" "}
          <Kr>아르헨티나</Kr>, <Kr>콜롬비아</Kr>, <Kr>페루</Kr>,{" "}
          <Kr>우루과이</Kr>.
        </p>

        {/* Generador */}
        <div className="border-2 border-seoul-black bg-[#F4F7FF] shadow-[6px_6px_0_#3D2EE8] px-6 py-7 mb-14">
          <p className="text-xs font-bold tracking-wider uppercase text-seoul-red mb-2">
            Herramienta gratis
          </p>
          <h3 className="text-2xl font-black text-seoul-black mb-3">
            Prueba con tu nombre en el generador
          </h3>
          <p className="text-base text-gray-700 leading-snug mb-5">
            Escribe tu nombre, míralo en hangul, escúchalo con la voz coreana de
            tu celular o computador y descárgalo como imagen para tus historias.
            Ojo: es una transcripción rápida y aproximada, no la norma. Si tu
            nombre tiene una r antes de consonante o al final (Fernanda, Javier),
            una n antes de c o g (Ángel), una x, un gua o grupos como bl, fl, pl
            o ct (Pablo, Victoria), compara el resultado con las reglas de este
            artículo: si no coinciden, quédate con la del artículo.
          </p>
          <Link
            href="/generador-nombre"
            className="inline-block bg-seoul-red text-white font-bold px-7 py-3.5 shadow-[4px_4px_0_#0a0a0f] hover:-translate-y-0.5 transition-transform"
          >
            Ver mi nombre en coreano →
          </Link>
        </div>

        {/* 7 · Variantes */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          ¿Por qué tu nombre aparece escrito de dos formas?
        </h2>
        <p className="mb-6">
          Si buscas tu nombre en internet, puede que encuentres más de una
          versión. Hay cuatro razones.
        </p>
        <p className="mb-6">
          <strong>La norma y el oído.</strong> El español pronuncia la p, la t y
          la k sin soplo, y a muchos oídos coreanos les suenan más cerca de{" "}
          <Kr>ㅃ</Kr>, <Kr>ㄸ</Kr> y <Kr>ㄲ</Kr>, las consonantes tensas. Por eso
          no te extrañe ver <Kr>빠블로</Kr> o <Kr>까밀라</Kr> en un chat. Pero la
          norma no usa consonantes tensas para estos sonidos: lo correcto es{" "}
          <Kr>파블로</Kr> y <Kr>카밀라</Kr>.
        </p>
        <p className="mb-6">
          <strong>El idioma de origen.</strong> El mismo nombre cambia según de
          dónde venga: David es <Kr>다비드</Kr> en español y <Kr>데이비드</Kr> en
          inglés; Daniel, <Kr>다니엘</Kr> y <Kr>대니얼</Kr>. María es{" "}
          <Kr>마리아</Kr>, pero Mariah Carey es <Kr>머라이어 캐리</Kr>. Y el caso
          más famoso: en Corea, a Colón se le conoce por su nombre en inglés, así
          que en los libros es <Kr>크리스토퍼 콜럼버스</Kr> (Christopher
          Columbus), no <Kr>크리스토발 콜론</Kr>.
        </p>
        <p className="mb-6">
          <strong>Cómo lo dices tú.</strong> La norma va por la letra, pero tu
          nombre es tuyo. Ximena, por letra, sería <Kr>시메나</Kr>; si la dices
          &ldquo;Jimena&rdquo;, lo honesto es <Kr>히메나</Kr>. Con Isabella pasa
          algo parecido: si haces sonar la ll como en &ldquo;calle&rdquo;, la
          norma da <Kr>이사베야</Kr>; si dices &ldquo;Isabela&rdquo;, eres{" "}
          <Kr>이사벨라</Kr>.
        </p>
        <p className="mb-6">
          <strong>La costumbre.</strong> Algunos nombres quedaron fijados hace
          tiempo y ya nadie los cambia. España, en el día a día, es{" "}
          <Kr>스페인</Kr>, del inglés Spain, aunque la propia norma titule su
          apartado de nuestro idioma <Kr>에스파냐어</Kr>. Y México es{" "}
          <Kr>멕시코</Kr>: la norma lee la x en medio de palabra como ks y, aunque
          allá suene j, en Corea nadie dice <Kr>메히코</Kr>.
        </p>
        <p className="mb-10">
          Y no creas que solo nos pasa a nosotros. Los coreanos sufren lo mismo al
          revés: el apellido <Kr>이</Kr> aparece como Lee, Yi o Rhee; <Kr>박</Kr>{" "}
          es Park, aunque la romanización oficial, aplicada al pie de la letra,
          daría Bak, y <Kr>김</Kr> es Kim y no Gim. Son los tres apellidos más
          comunes de Corea: según el censo de 2015, entre los tres suman cerca
          del 45 % de la población. Mi propio nombre, <Kr>김재희</Kr>, aparece
          como Kim Jae Hee, Kim Jae-hee o, con la romanización oficial al pie de
          la letra, Gim Jaehui. Mi consejo: elige una forma y úsala
          siempre igual. Si dudas, quédate con la de la norma: es la que un
          coreano va a reconocer en un libro o un subtítulo.
        </p>

        {/* 8 · Firmar */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Cómo firmar con tu nombre en coreano
        </h2>
        <p className="mb-6">
          <strong>El orden.</strong> Los coreanos escriben primero el apellido y
          todo junto: <Kr>김재희</Kr>. Los nombres extranjeros, en cambio, se
          escriben en su orden y con espacio, como en los subtítulos:{" "}
          <Kr>카밀라 로하스</Kr>, <Kr>마리아 호세 무뇨스</Kr>.
        </p>
        <p className="mb-6">
          <strong>La letra.</strong> Cada sílaba va en su propio cuadrado
          imaginario, todas del mismo tamaño. Los niños coreanos practican en el{" "}
          <Kr>깍두기 공책</Kr>, un cuaderno de cuadros que se llama así por el{" "}
          <Kr>깍두기</Kr>, el kimchi de rábano en cubitos. Los trazos van de
          arriba abajo y de izquierda a derecha.
        </p>
        <p className="mb-6">
          <strong>La firma.</strong> Una firma, <Kr>서명</Kr> (seomyeong) o, más
          coloquial, <Kr>사인</Kr> (sain), puede ser simplemente tu nombre en
          hangul escrito con estilo. En Corea también se usa el <Kr>도장</Kr>{" "}
          (dojang), un sello con el nombre para firmar documentos, y en Insadong,
          en Seúl, hay tiendas que te tallan uno con tu nombre en hangul: es un
          recuerdo muy popular entre los turistas.
        </p>
        <p className="mb-6">
          <strong>Al final de un mensaje.</strong> Tu nombre + <Kr>드림</Kr>{" "}
          (deurim), &ldquo;de parte de&rdquo;, con respeto:{" "}
          <Kr>카밀라 드림</Kr>. A un profe o a alguien mayor, más formal todavía:{" "}
          <Kr>카밀라 올림</Kr> (ollim).
        </p>
        <p className="mb-6">
          <strong>Al presentarte.</strong> Aquí vuelve el <Kr>받침</Kr>. Si tu
          nombre en hangul termina en vocal, dices <Kr>저는 카밀라예요</Kr>{" "}
          (jeoneun kamillayeyo), &ldquo;soy Camila&rdquo;. Si termina en{" "}
          <Kr>받침</Kr>, cambia la terminación: <Kr>저는 가브리엘이에요</Kr>{" "}
          (jeoneun gabeurierieyo). Ojo con Carlos: <Kr>카를로스</Kr> termina en
          vocal en hangul, así que es <Kr>저는 카를로스예요</Kr>. Y si te
          preguntan <Kr>이름이 뭐예요?</Kr> (&ldquo;¿cómo te llamas?&rdquo;),
          también puedes decir <Kr>제 이름은 마르티나예요</Kr>, &ldquo;mi nombre
          es Martina&rdquo;.
        </p>

        <figure className="my-12 mx-auto max-w-xs">
          <img
            src={`${IMG}/maria-saluda-en-zoom.png`}
            alt="Ilustración de Academia Seúl: en la pantalla de un computador, una alumna con su nombre 마리아 (María) en la esquina hace una pequeña venia y dice 안녕하세요!"
            width={720}
            height={830}
            loading="lazy"
            decoding="async"
            className="w-full h-auto"
          />
          <figcaption className="text-sm text-gray-500 mt-2 text-center">
            En clase, tu nombre en hangul en la pantalla: <Kr>마리아</Kr>.
          </figcaption>
        </figure>

        <TuTurno>
          Escribe tu nombre en hangul en un papel, cuenta los bloques y revisa
          cada <Kr>받침</Kr>. Después preséntate en voz alta:{" "}
          <Kr>저는 ___예요</Kr> o <Kr>저는 ___이에요</Kr>. Si lo subes a tus
          historias, etiquétanos en @academiaseul.
        </TuTurno>

        {/* Vocabulario */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Mini-clase de coreano: las palabras de tu nombre
        </h2>
        <p className="mb-6">
          Para que la próxima vez que alguien te pregunte el nombre en coreano
          tengas todo a mano. Si todavía no lees hangul, el{" "}
          <a href="/lector-coreano" className={linkCls}>
            Lector de Hangul
          </a>{" "}
          y{" "}
          <a href="/dubu" className={linkCls}>
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
              <div className="text-2xl font-black text-seoul-red mb-1 break-keep" style={KR_FONT}>
                {e.kr}
              </div>
              <div className="text-sm text-gray-400 italic mb-2">{e.rom}</div>
              <div className="text-base text-gray-700 leading-snug">
                <ConKr texto={e.es} />
              </div>
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
            <p>
              <ConKr texto={f.a} />
            </p>
          </div>
        ))}

        <p className="mb-6 mt-10">
          Para seguir gratis tienes el{" "}
          <a href="/lector-coreano" className={linkCls}>
            Lector de Hangul
          </a>
          ,{" "}
          <a href="/dubu" className={linkCls}>
            Dubu
          </a>
          , el{" "}
          <Link href="/taller" className={linkCls}>
            taller gratis de Hangul
          </Link>{" "}
          y el{" "}
          <Link href="/generador-nombre" className={linkCls}>
            generador de tu nombre en coreano
          </Link>
          . Y cuando quieras clases en vivo, Básico 1 (A1.1) parte desde cero:
          aprendes a leer el Hangul completo, a escribir tu nombre sin ayuda y a
          presentarte con <Kr>저는 ___예요</Kr>. US$150 el curso completo · o 2
          cuotas de US$75. Revisa las{" "}
          <Link href="/nivel-1#clases" className={linkCls}>
            próximas clases
          </Link>
          .
        </p>

        {/* CTA */}
        <div className="bg-seoul-black text-white border-2 border-seoul-black shadow-[8px_8px_0_#3D2EE8] px-8 py-10 mt-14 text-center">
          <p className="text-4xl font-black text-seoul-gold mb-3" style={KR_FONT}>
            이름
          </p>
          <h3 className="text-2xl font-black mb-3">
            ¿Ya sabes cómo se escribe el tuyo?
          </h3>
          <p className="text-white/70 mb-7 max-w-md mx-auto">
            Míralo gratis en el generador y aprende a leerlo tú mismo con el
            Lector de Hangul, o súmate a Básico 1 (A1.1): desde cero, en vivo y
            con profe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/generador-nombre"
              className="bg-[#E8B84B] text-seoul-black font-bold px-7 py-3.5 shadow-[4px_4px_0_rgba(255,255,255,0.2)] hover:-translate-y-0.5 transition-transform"
            >
              Tu nombre en coreano →
            </Link>
            <Link
              href="/nivel-1#clases"
              className="bg-seoul-red text-white font-bold px-7 py-3.5 shadow-[4px_4px_0_rgba(255,255,255,0.2)] hover:-translate-y-0.5 transition-transform"
            >
              Ver próximas clases →
            </Link>
          </div>
          <p className="text-white/60 text-sm mt-6">
            También gratis:{" "}
            <a href="/lector-coreano" className="underline hover:text-white">
              Lector de Hangul
            </a>{" "}
            ·{" "}
            <a href="/dubu" className="underline hover:text-white">
              Dubu
            </a>{" "}
            ·{" "}
            <Link href="/taller" className="underline hover:text-white">
              taller de Hangul
            </Link>
          </p>
          <p className="text-white/50 text-sm mt-4">화이팅 chingu! 🇰🇷</p>
        </div>
      </article>

      <Footer />
    </main>
  );
}
