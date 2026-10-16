import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const POST_URL = "https://www.academiaseul.com/blog/numeros-en-coreano-dos-sistemas";

const DESCRIPTION =
  "하나 o 일: por qué el coreano tiene dos sistemas de números, cuándo se usa cada uno (hora, edad, plata, fechas, teléfono) y trucos para no confundirte.";

export const metadata: Metadata = {
  // El layout añade " | Academia Seúl" (16 caracteres): título ≤ 44 para que el <title> final quede ≤ 60.
  title: "Números en coreano: nativos y sino-coreanos",
  description: DESCRIPTION,
  alternates: {
    canonical: POST_URL,
  },
  openGraph: {
    type: "article",
    title: "하나 o 일: por qué el coreano tiene dos sistemas de números",
    description:
      "세 시 삼십 분: la hora en nativo y los minutos en sino-coreano. Los dos sistemas de números del coreano, el 만 y un mini-ejercicio con respuestas.",
    url: POST_URL,
    siteName: "Academia Seúl",
    locale: "es_CL",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Academia Seúl" }],
  },
};

const KR_FONT = { fontFamily: "'Noto Sans KR', sans-serif" };

const LINK = "text-seoul-red font-bold underline underline-offset-4";

function Kr({ children }: { children: ReactNode }) {
  return (
    <span className="kr break-keep" style={KR_FONT}>
      {children}
    </span>
  );
}

// Romanización revisada: solo como ayuda, en gris.
function Rom({ children }: { children: ReactNode }) {
  return <span className="text-gray-500">({children})</span>;
}

function Truco({ children }: { children: ReactNode }) {
  return (
    <div className="border-2 border-seoul-black bg-white shadow-[4px_4px_0_#0a0a0f] px-5 py-4 mb-10">
      <p className="text-xs font-bold tracking-wider uppercase text-seoul-red mb-2">
        El truco
      </p>
      <p className="text-base text-gray-700 leading-snug">{children}</p>
    </div>
  );
}

function Figura({
  src,
  alt,
  width,
  height,
  ancho,
  children,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  ancho: string;
  children: ReactNode;
}) {
  return (
    <figure className={`my-12 mx-auto ${ancho}`}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className="w-full h-auto border-2 border-seoul-black shadow-[6px_6px_0_#0a0a0f]"
      />
      <figcaption className="text-sm text-gray-500 mt-4 text-center">{children}</figcaption>
    </figure>
  );
}

const IMG = "/blog/numeros-en-coreano-dos-sistemas";

const uno_a_diez = [
  { n: "1", nat: "하나", natRom: "hana", sino: "일", sinoRom: "il", hanja: "一" },
  { n: "2", nat: "둘", natRom: "dul", sino: "이", sinoRom: "i", hanja: "二" },
  { n: "3", nat: "셋", natRom: "set", sino: "삼", sinoRom: "sam", hanja: "三" },
  { n: "4", nat: "넷", natRom: "net", sino: "사", sinoRom: "sa", hanja: "四" },
  { n: "5", nat: "다섯", natRom: "daseot", sino: "오", sinoRom: "o", hanja: "五" },
  { n: "6", nat: "여섯", natRom: "yeoseot", sino: "육", sinoRom: "yuk", hanja: "六" },
  { n: "7", nat: "일곱", natRom: "ilgop", sino: "칠", sinoRom: "chil", hanja: "七" },
  { n: "8", nat: "여덟", natRom: "yeodeol", sino: "팔", sinoRom: "pal", hanja: "八" },
  { n: "9", nat: "아홉", natRom: "ahop", sino: "구", sinoRom: "gu", hanja: "九" },
  { n: "10", nat: "열", natRom: "yeol", sino: "십", sinoRom: "sip", hanja: "十" },
];

const usosNativo = [
  { kr: "사과 세 개", es: "tres manzanas (cosas: 개)" },
  { kr: "학생 다섯 명", es: "cinco estudiantes (personas: 명)" },
  { kr: "커피 두 잔", es: "dos cafés (tazas y vasos: 잔)" },
  { kr: "세 시", es: "las tres (la hora del reloj)" },
  { kr: "스무 살", es: "veinte años (la edad)" },
  { kr: "두 번 · 두 시간", es: "dos veces · dos horas (cuánto dura)" },
];

const usosSino = [
  { kr: "삼십 분 · 십 초", es: "treinta minutos · diez segundos" },
  { kr: "2026년 10월 15일", es: "fechas: año, mes y día" },
  { kr: "만 원", es: "10.000 won (la plata)" },
  { kr: "공일공…", es: "números de teléfono" },
  { kr: "4층 · 3번 출구", es: "piso 4 · salida 3 del metro" },
  { kr: "삼겹살 2인분", es: "dos porciones de samgyeopsal" },
];

const cortas = [
  { de: "하나", a: "한", ej: "한 개", es: "una cosa" },
  { de: "둘", a: "두", ej: "두 명", es: "dos personas" },
  { de: "셋", a: "세", ej: "세 시", es: "las tres" },
  { de: "넷", a: "네", ej: "네 잔", es: "cuatro tazas" },
  { de: "스물", a: "스무", ej: "스무 살", es: "veinte años" },
];

const grandes = [
  { kr: "십", rom: "sip", n: "10" },
  { kr: "백", rom: "baek", n: "100" },
  { kr: "천", rom: "cheon", n: "1.000" },
  { kr: "만", rom: "man", n: "10.000" },
  { kr: "십만", rom: "simman", n: "100.000" },
  { kr: "백만", rom: "baengman", n: "1.000.000" },
  { kr: "천만", rom: "cheonman", n: "10.000.000" },
  { kr: "억", rom: "eok", n: "100.000.000" },
];

const paresTrampa = [
  { a: "세 시", aEs: "las tres (la hora)", b: "삼 분", bEs: "tres minutos" },
  { a: "한 번", aEs: "una vez", b: "일 번", bEs: "el número uno" },
  { a: "세 살", aEs: "tres años de edad", b: "삼 년", bEs: "tres años de tiempo" },
  { a: "두 달", aEs: "dos meses (de duración)", b: "이월", bEs: "febrero" },
  { a: "네 명", aEs: "cuatro personas", b: "4인분 (사 인분)", bEs: "cuatro porciones" },
];

const ejercicio = [
  {
    es: "«Son las tres y media.»",
    kr: "세 시 삼십 분이에요. (o 세 시 반이에요.)",
    por: "Hora en nativo, minutos en sino-coreano.",
  },
  {
    es: "«Tengo veinte años.»",
    kr: "스무 살이에요.",
    por: "Edad en nativo, y 스물 se acorta a 스무 ante 살.",
  },
  {
    es: "«Dos americanos, por favor.» (en la cafetería)",
    kr: "아메리카노 두 잔 주세요.",
    por: "Las tazas se cuentan en nativo con 잔, y 둘 pasa a 두.",
  },
  {
    es: "«Son 15.000 won.»",
    kr: "만 오천 원이에요.",
    por: "La plata es sino-coreana, y 만 va sin 일 delante.",
  },
  {
    es: "«Mi cumpleaños es el 9 de octubre.»",
    kr: "제 생일은 시월 구 일이에요.",
    por: "Fechas en sino-coreano, y octubre es 시월, no 십월.",
  },
  {
    es: "«Mi número es 010-2345-6789.»",
    kr: "제 전화번호는 공일공 이삼사오 육칠팔구예요.",
    por: "Teléfono en sino-coreano, dígito por dígito, con el cero 공.",
  },
  {
    es: "«Dos porciones de samgyeopsal, por favor.»",
    kr: "삼겹살 2인분 주세요. (이 인분)",
    por: "Las porciones van con 인분 y número sino-coreano.",
  },
];

const vocabulario = [
  {
    kr: "하나 · 한",
    rom: "hana · han",
    es: "Uno (nativo). Ante un contador se acorta: 한 개, 한 시.",
  },
  {
    kr: "일",
    rom: "il",
    es: "Uno (sino-coreano), del carácter chino 一. Para fechas, plata y teléfonos.",
  },
  {
    kr: "스물 · 스무",
    rom: "seumul · seumu",
    es: "Veinte (nativo). Ante un contador, 스무: 스무 살.",
  },
  {
    kr: "개",
    rom: "gae",
    es: "Contador de cosas en general: 사과 세 개, tres manzanas.",
  },
  {
    kr: "명",
    rom: "myeong",
    es: "Contador de personas: 네 명. Con respeto se pregunta 몇 분이세요?",
  },
  {
    kr: "잔",
    rom: "jan",
    es: "Contador de tazas y vasos: 커피 두 잔, dos cafés.",
  },
  {
    kr: "살",
    rom: "sal",
    es: "Años de edad, con números nativos: 몇 살이에요?",
  },
  {
    kr: "시 · 분",
    rom: "si · bun",
    es: "Hora (con nativos) · minuto (con sino-coreanos): 세 시 삼십 분.",
  },
  {
    kr: "원 · 만",
    rom: "won · man",
    es: "La moneda coreana · diez mil, la unidad grande: 만 원.",
  },
  {
    kr: "공",
    rom: "gong",
    es: "Cero al dictar teléfonos: 공일공. En matemáticas, 영.",
  },
];

const faqs = [
  {
    q: "¿Por qué el coreano tiene dos sistemas de números?",
    a: "Porque conviven el sistema nativo coreano (하나, 둘, 셋…) y el sino-coreano (일, 이, 삼…), que llegó con los caracteres chinos. Se repartieron las tareas: los nativos cuentan cosas, personas, horas del reloj y años de edad; los sino-coreanos sirven para fechas, precios, minutos, teléfonos, medidas y todo número desde 100, porque los nativos llegan solo hasta 99.",
  },
  {
    q: "¿La hora en coreano se dice con números nativos o sino-coreanos?",
    a: "Con los dos: la hora con nativos y los minutos con sino-coreanos. Las 3:30 son 세 시 삼십 분, o más corto, 세 시 반 (반 = media). Para a.m. y p.m. se antepone 오전 u 오후: 오후 세 시 반.",
  },
  {
    q: "¿Cómo se dice la edad en coreano?",
    a: "Con números nativos y el contador 살: 몇 살이에요? (¿cuántos años tienes?) — 스무 살이에요 (tengo veinte años). A un adulto que recién conoces se le pregunta 나이가 어떻게 되세요? En formularios y letreros aparece la forma sino-coreana con 세, como 20세. Y desde junio de 2023 las leyes y los documentos oficiales usan, salvo algunas excepciones, la edad internacional, 만 나이.",
  },
  {
    q: "¿Cuál de los dos sistemas conviene aprender primero?",
    a: "Los dos, por partes. El sino-coreano es muy regular: con 일 a 십, más 백, 천 y 만, armas cualquier cifra, y lo necesitas al tiro para teléfonos, precios y fechas. Del nativo, parte por 하나 a 열 y sus formas cortas (한, 두, 세, 네) para contar personas y cosas; las decenas nativas pueden esperar.",
  },
  {
    q: "¿Cómo se dice cero en coreano?",
    a: "Hay dos ceros y los dos son sino-coreanos: 영, el de las matemáticas y la temperatura (bajo cero se dice 영하), y 공, el que se usa al dictar números dígito por dígito, como los teléfonos: 010 se dice 공일공.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "하나 o 일: por qué el coreano tiene dos sistemas de números (y cuándo usar cada uno)",
      description: DESCRIPTION,
      datePublished: "2026-10-15",
      dateModified: "2026-10-15",
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

export default function NumerosPost() {
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
            <span className="bg-seoul-red text-white px-3 py-1">Idioma</span>
            <span className="text-white/40">15 de octubre, 2026 · 10 min</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            <span className="block text-seoul-gold text-5xl md:text-7xl mb-3" style={KR_FONT}>
              하나 · 일
            </span>
            Por qué el coreano tiene dos sistemas de números (y cuándo usar cada uno)
          </h1>
          <p className="text-white/70 text-lg leading-relaxed">
            Pregunta la hora en Seúl y te pueden contestar <Kr>세 시 삼십 분</Kr>: un
            &ldquo;tres&rdquo; de un sistema de números y un &ldquo;treinta&rdquo; de otro,
            en la misma frase. El coreano tiene dos juegos de números, los nativos (
            <Kr>하나</Kr>, <Kr>둘</Kr>, <Kr>셋</Kr>…) y los sino-coreanos (<Kr>일</Kr>,{" "}
            <Kr>이</Kr>, <Kr>삼</Kr>…). Acá va el mapa: de dónde vienen, cuándo se usa cada
            uno, por qué Corea cuenta de diez mil en diez mil y un mini-ejercicio para
            probarte.
          </p>
        </div>
      </section>

      {/* Body */}
      <article className="max-w-3xl mx-auto px-6 py-16 text-gray-800 leading-relaxed text-lg">

        {/* 1 · La escena */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          La escena: tres y media, dos sistemas
        </h2>
        <p className="mb-6">
          Estás en Seúl, tienes una reserva a las tres y media y le preguntas la hora a
          alguien: <Kr>지금 몇 시예요?</Kr> <Rom>jigeum myeot-ssiyeyo</Rom>. Te
          contestan: <Kr>세 시 삼십 분이에요</Kr> <Rom>se si samsip ppunieyo</Rom>. Si
          aprendiste a contar con <Kr>하나, 둘, 셋</Kr>, reconoces el <Kr>세</Kr>: es un
          &ldquo;tres&rdquo; nativo, recortado. Pero <Kr>삼십</Kr> no es <Kr>서른</Kr>, el
          &ldquo;treinta&rdquo; nativo: es el &ldquo;treinta&rdquo; del otro sistema. Tres
          de un lado, treinta del otro, en la misma respuesta, y nadie pestañea.
        </p>
        <p className="mb-10">
          No es un error: así funciona. La regla no es &ldquo;usa el que te guste&rdquo;,
          sino &ldquo;cada uno tiene su pega&rdquo;, y esas pegas son bastante ordenadas.
          Te dejamos la lectura en gris como ayuda; para leer de verdad, el{" "}
          <a href="/lector-coreano" className={LINK}>
            Lector de Hangul gratis
          </a>{" "}
          te enseña el alfabeto con audio de cada letra.
        </p>

        <blockquote className="border-l-4 border-seoul-red bg-[#F4F7FF] px-6 py-5 my-10 text-seoul-black font-medium">
          En coreano, la hora es de la casa y los minutos son importados. Y a nadie le
          parece raro.
        </blockquote>

        {/* 2 · Dos historias */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Dos sistemas, dos historias
        </h2>
        <p className="mb-6">
          Los números nativos son coreanos de toda la vida: <Kr>하나</Kr>, <Kr>둘</Kr>,{" "}
          <Kr>셋</Kr>. Los sino-coreanos llegaron con los caracteres chinos, el{" "}
          <Kr>한자</Kr> <Rom>hanja</Rom>, que durante siglos fueron la escritura culta de
          la península. Con ellos entró una cantidad enorme de vocabulario, y los números
          venían en el paquete: 一, 二, 三 se leen en coreano <Kr>일</Kr>, <Kr>이</Kr>,{" "}
          <Kr>삼</Kr>. Así el coreano terminó con un juego para contar &ldquo;de la
          casa&rdquo; y otro para numerar, fechar y medir. El japonés vive algo parecido:{" "}
          <em>hitotsu, futatsu, mittsu</em> por un lado; <em>ichi, ni, san</em> por el
          otro.
        </p>

        <div className="overflow-x-auto mb-4">
          <table className="w-full border-2 border-seoul-black text-left text-base">
            <thead className="bg-seoul-black text-white">
              <tr>
                <th className="px-3 py-2 font-bold">#</th>
                <th className="px-3 py-2 font-bold">Nativo</th>
                <th className="px-3 py-2 font-bold">Sino-coreano</th>
                <th className="px-3 py-2 font-bold">Carácter chino</th>
              </tr>
            </thead>
            <tbody>
              {uno_a_diez.map((f) => (
                <tr key={f.n} className="border-t border-gray-200">
                  <td className="px-3 py-2 font-black text-seoul-black">{f.n}</td>
                  <td className="px-3 py-2">
                    <span className="text-xl font-bold text-seoul-black" style={KR_FONT}>
                      {f.nat}
                    </span>{" "}
                    <span className="block text-sm text-gray-500">{f.natRom}</span>
                  </td>
                  <td className="px-3 py-2">
                    <span className="text-xl font-bold text-seoul-red" style={KR_FONT}>
                      {f.sino}
                    </span>{" "}
                    <span className="block text-sm text-gray-500">{f.sinoRom}</span>
                  </td>
                  <td className="px-3 py-2 text-xl text-gray-600">{f.hanja}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mb-8">
          <Kr>여덟</Kr> se pronuncia [<Kr>여덜</Kr>]: la ㅂ final no suena. Y el cero no
          tiene versión nativa (ya llegamos a eso).
        </p>

        <p className="mb-6">
          Las decenas nativas tienen nombre propio y no se arman multiplicando:{" "}
          <Kr>열</Kr> (10), <Kr>스물</Kr> (20), <Kr>서른</Kr> (30), <Kr>마흔</Kr> (40),{" "}
          <Kr>쉰</Kr> (50), <Kr>예순</Kr> (60), <Kr>일흔</Kr> (70), <Kr>여든</Kr> (80) y{" "}
          <Kr>아흔</Kr> (90). Las sino-coreanas, en cambio, son puro Lego: <Kr>이십</Kr>{" "}
          es &ldquo;dos-diez&rdquo;, <Kr>삼십</Kr> &ldquo;tres-diez&rdquo;, y{" "}
          <Kr>구십구</Kr> (99) es &ldquo;nueve-diez-nueve&rdquo;.
        </p>
        <p className="mb-10">
          Y los nativos llegan hasta el 99, <Kr>아흔아홉</Kr> <Rom>aheunahop</Rom>, ni uno
          más. El coreano antiguo tenía <Kr>온</Kr> para 100 y <Kr>즈믄</Kr> para 1.000,
          pero hoy viven casi solo en el diccionario. Desde 100 manda el sino-coreano.
        </p>

        {/* 3 · El mapa */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Quién manda dónde: el mapa rápido
        </h2>
        <p className="mb-6">
          La regla de bolsillo: los nativos cuentan cosas, personas, horas del reloj, años
          de edad y veces; los sino-coreanos ponen fecha, precio, minutos, teléfono, piso y
          todo lo que se mide.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <div className="border-2 border-seoul-black bg-white shadow-[4px_4px_0_#0a0a0f] px-5 py-4">
            <p className="text-xs font-bold tracking-wider uppercase text-seoul-red mb-1">
              Nativo
            </p>
            <p className="text-xl font-black text-seoul-black mb-3" style={KR_FONT}>
              하나, 둘, 셋…
            </p>
            <ul className="space-y-2 text-base text-gray-700 leading-snug">
              {usosNativo.map((u) => (
                <li key={u.kr}>
                  <span className="font-bold text-seoul-black" style={KR_FONT}>
                    {u.kr}
                  </span>{" "}
                  · {u.es}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-2 border-seoul-black bg-white shadow-[4px_4px_0_#0a0a0f] px-5 py-4">
            <p className="text-xs font-bold tracking-wider uppercase text-seoul-red mb-1">
              Sino-coreano
            </p>
            <p className="text-xl font-black text-seoul-black mb-3" style={KR_FONT}>
              일, 이, 삼…
            </p>
            <ul className="space-y-2 text-base text-gray-700 leading-snug">
              {usosSino.map((u) => (
                <li key={u.kr}>
                  <span className="font-bold text-seoul-black" style={KR_FONT}>
                    {u.kr}
                  </span>{" "}
                  · {u.es}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Figura
          src={`${IMG}/dos-tazas-de-cafe.png`}
          alt="Ilustración de Academia Seúl: dos tazas de café iguales, con carita sonriente y franja azul, sobre sus platos, para la frase 커피 두 잔 (dos cafés)."
          width={640}
          height={327}
          ancho="max-w-md"
        >
          <Kr>커피 두 잔</Kr> <Rom>keopi du jan</Rom>: dos cafés. Las tazas se cuentan con
          números nativos y el contador <Kr>잔</Kr>.
        </Figura>

        {/* 4 · La hora */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          La hora: la aguja corta es nativa; la larga, sino-coreana
        </h2>
        <p className="mb-6">
          Si te quedas con un solo truco de este artículo, que sea este: mira un reloj
          análogo. La aguja corta, la de las horas, habla coreano nativo: <Kr>한 시</Kr>,{" "}
          <Kr>두 시</Kr>, <Kr>세 시</Kr>… hasta <Kr>열두 시</Kr>. La larga, la de los
          minutos, habla sino-coreano: <Kr>오 분</Kr>, <Kr>십 분</Kr>,{" "}
          <Kr>삼십 분</Kr>. Las tres y cuarto son <Kr>세 시 십오 분</Kr>; las tres y media,{" "}
          <Kr>세 시 삼십 분</Kr> o, más corto, <Kr>세 시 반</Kr> <Rom>se si ban</Rom>,
          porque <Kr>반</Kr> es &ldquo;media&rdquo;. Para la mañana y la tarde se antepone{" "}
          <Kr>오전</Kr> <Rom>ojeon</Rom>, a.m., u <Kr>오후</Kr> <Rom>ohu</Rom>, p.m.:{" "}
          <Kr>오후 세 시 반</Kr>.
        </p>

        <Figura
          src={`${IMG}/reloj-horas-en-coreano.png`}
          alt="Reloj ilustrado de Academia Seúl con las doce horas escritas en coreano en lugar de números, de 한 시 a 열두 시; las agujas marcan las nueve y 아홉 시 aparece destacado en azul."
          width={560}
          height={646}
          ancho="max-w-sm"
        >
          Las doce horas del reloj, todas con números nativos, de <Kr>한 시</Kr> a{" "}
          <Kr>열두 시</Kr>. Este marca las nueve: <Kr>아홉 시</Kr> <Rom>ahop si</Rom>.
        </Figura>

        <p className="mb-6">
          Ojo: <Kr>한 시</Kr> es &ldquo;la una&rdquo;, pero <Kr>한 시간</Kr>{" "}
          <Rom>han sigan</Rom> es &ldquo;una hora&rdquo; de duración. Y como los números
          nativos se acortan delante de <Kr>시</Kr> (ya viene eso), son{" "}
          <Kr>열한 시</Kr> y <Kr>열두 시</Kr>, nunca &ldquo;열하나 시&rdquo;.
        </p>
        <Truco>
          Cada vez que mires la hora, léela en voz alta en coreano: aguja corta en nativo,
          aguja larga en sino-coreano. Es el ejercicio más barato del mundo.
        </Truco>

        {/* 5 · Contadores y edad */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Contadores y edad: <Kr>한, 두, 세, 네</Kr>… y <Kr>스무</Kr>
        </h2>
        <p className="mb-6">
          En coreano casi nunca se cuenta &ldquo;a secas&rdquo;: entre el número y la cosa
          va un contador, una palabrita que dice qué tipo de cosa estás contando, parecida
          a nuestro &ldquo;dos tazas de té&rdquo; o &ldquo;tres cabezas de
          ganado&rdquo;. <Kr>개</Kr> <Rom>gae</Rom> sirve para cosas en general,{" "}
          <Kr>명</Kr> <Rom>myeong</Rom> para personas, <Kr>잔</Kr> <Rom>jan</Rom> para
          tazas y vasos, <Kr>마리</Kr> <Rom>mari</Rom> para animales y <Kr>살</Kr>{" "}
          <Rom>sal</Rom> para años de edad. El orden es cosa, número y contador:{" "}
          <Kr>고양이 두 마리</Kr>, &ldquo;dos gatos&rdquo;.
        </p>
        <p className="mb-6">
          Y aquí viene la mutación: delante de un contador, los cuatro primeros números
          nativos y el veinte se encogen. Del cinco en adelante no cambia nada (
          <Kr>다섯 개</Kr>, <Kr>여섯 명</Kr>), y las formas cortas también valen dentro
          de números más grandes: <Kr>열한 개</Kr> (11 cosas), <Kr>스물두 살</Kr> (22
          años).
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
          {cortas.map((c) => (
            <div
              key={c.de}
              className="border-2 border-seoul-black bg-white shadow-[4px_4px_0_#0a0a0f] px-3 py-3 text-center last:col-span-2 sm:last:col-span-1"
            >
              <div className="text-lg font-black text-seoul-black" style={KR_FONT}>
                {c.de} → <span className="text-seoul-red">{c.a}</span>
              </div>
              <div className="text-base text-gray-700 mt-1" style={KR_FONT}>
                {c.ej}
              </div>
              <div className="text-sm text-gray-500">{c.es}</div>
            </div>
          ))}
        </div>

        <p className="mb-6">
          Una escena que vas a vivir: entras a un restaurante en Corea y te preguntan{" "}
          <Kr>몇 분이세요?</Kr> <Rom>myeot-ppuniseyo</Rom>, &ldquo;¿cuántas personas
          son?&rdquo;, con <Kr>분</Kr>, el contador respetuoso (se escribe igual que
          el <Kr>분</Kr> de los minutos, pero es otra palabra). Tú contestas con el
          normal: <Kr>두 명이요</Kr> <Rom>du myeongiyo</Rom>, &ldquo;dos&rdquo;. El
          respetuoso es para los demás; para uno mismo, nunca.
        </p>
        <p className="mb-6">
          La edad va con <Kr>살</Kr> y números nativos: <Kr>몇 살이에요?</Kr>{" "}
          <Rom>myeot-ssarieyo</Rom> — <Kr>스무 살이에요</Kr>, &ldquo;tengo veinte
          años&rdquo;. (A un adulto que recién conoces, mejor la versión fina:{" "}
          <Kr>나이가 어떻게 되세요?</Kr>) A los veintiuno es <Kr>스물한 살</Kr>: el{" "}
          <Kr>스물</Kr> vuelve entero, porque ahora el que va pegado al contador es{" "}
          <Kr>한</Kr>. En formularios y letreros vas a ver la versión sino-coreana con{" "}
          <Kr>세</Kr>, como en <Kr>20세 이상</Kr>, &ldquo;desde los 20 años&rdquo; (ojo:
          ese <Kr>세</Kr> significa &ldquo;años de edad&rdquo;, no es el &ldquo;tres&rdquo;
          nativo). Y desde junio de 2023 las leyes y los documentos oficiales usan, salvo
          algunas excepciones, la edad internacional, <Kr>만 나이</Kr>; la historia del
          año extra de la cuenta tradicional está en{" "}
          <Link href="/blog/gestos-que-delatan-a-un-coreano" className={LINK}>
            6 gestos que delatan a un coreano
          </Link>
          .
        </p>

        <Figura
          src={`${IMG}/perrito-tres-anos.png`}
          alt="Ilustración de Academia Seúl: un perrito con gorro de fiesta azul sentado junto a una torta azul con tres velas encendidas, para la frase 세 살 (tres años)."
          width={480}
          height={553}
          ancho="max-w-xs"
        >
          <Kr>세 살</Kr> <Rom>se sal</Rom>: tres años. La edad se cuenta con números
          nativos, y <Kr>셋</Kr> pasa a <Kr>세</Kr> ante <Kr>살</Kr>.
        </Figura>

        <Truco>
          Piensa que el número se encoge al pegarse al contador: <Kr>둘</Kr>,{" "}
          <Kr>셋</Kr>, <Kr>넷</Kr> y <Kr>스물</Kr> pierden su consonante final (
          <Kr>두</Kr>, <Kr>세</Kr>, <Kr>네</Kr>, <Kr>스무</Kr>) y <Kr>하나</Kr> se
          comprime en <Kr>한</Kr>. Cuando cuentas en voz alta, sin contador (
          <Kr>하나, 둘, 셋!</Kr>, como antes de una foto), van enteros.
        </Truco>

        {/* 6 · Fechas y teléfono */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Fechas y teléfono: territorio sino-coreano
        </h2>
        <p className="mb-6">
          Las fechas son cien por ciento sino-coreanas: año (<Kr>년</Kr>), mes (
          <Kr>월</Kr>) y día (<Kr>일</Kr>). El 15 de octubre de 2026, por ejemplo, se escribe{" "}
          <Kr>2026년 10월 15일</Kr> y se lee <Kr>이천이십육 년 시월 십오 일</Kr>. Los meses
          no tienen nombre propio: son el número más <Kr>월</Kr>. <Kr>일월</Kr> es enero,{" "}
          <Kr>이월</Kr> febrero, <Kr>삼월</Kr> marzo… con dos excepciones que pierden su
          consonante final: junio es <Kr>유월</Kr> <Rom>yuwol</Rom>, no &ldquo;육월&rdquo;,
          y octubre es <Kr>시월</Kr> <Rom>siwol</Rom>, no &ldquo;십월&rdquo;. Así, el día
          del alfabeto coreano, el 9 de octubre, es <Kr>시월 구 일</Kr> (su historia está
          en{" "}
          <Link href="/blog/hangeulnal-el-dia-del-alfabeto-coreano" className={LINK}>
            한글날
          </Link>
          ). Y si te preguntan <Kr>생일이 언제예요?</Kr> <Rom>saengiri eonjeyeyo</Rom>,
          &ldquo;¿cuándo es tu cumpleaños?&rdquo;, contestas con mes y día:{" "}
          <Kr>유월 이십 일이에요</Kr>, por ejemplo, si es el 20 de junio.
        </p>
        <p className="mb-6">
          Los teléfonos también son sino-coreanos y se dictan dígito por dígito, en
          bloques. El cero del teléfono es <Kr>공</Kr> <Rom>gong</Rom>: casi todos los
          celulares coreanos empiezan con 010, que se dice <Kr>공일공</Kr>. Así,
          010-1234-5678 es <Kr>공일공, 일이삼사, 오육칠팔</Kr>, con una pausa donde va el
          guion. El otro cero, <Kr>영</Kr> <Rom>yeong</Rom>, es el de las matemáticas y
          el termómetro: bajo cero se dice <Kr>영하</Kr> <Rom>yeongha</Rom>.
        </p>
        <p className="mb-10">
          Lo mismo vale para los números que funcionan como nombres: el piso (
          <Kr>4층</Kr>, que se lee <Kr>사 층</Kr>), la salida del metro (
          <Kr>3번 출구</Kr>, <Kr>삼 번 출구</Kr>) o la pieza del hotel (<Kr>301호</Kr>,{" "}
          <Kr>삼백일 호</Kr>). Ese <Kr>사</Kr> de cuatro suena igual que el carácter de
          &ldquo;muerte&rdquo; (死), y por eso en muchos ascensores coreanos el cuarto piso
          aparece como F: lo contamos en{" "}
          <Link href="/blog/por-que-en-corea-no-existe-el-piso-4" className={LINK}>
            el piso F
          </Link>
          .
        </p>

        {/* 7 · El 만 */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          <Kr>십, 백, 천, 만</Kr>: por qué Corea cuenta de diez mil en diez mil
        </h2>
        <p className="mb-6">
          En español agrupamos las cifras de a tres: mil, millón, mil millones. En
          coreano, como en chino y en japonés, se agrupan de a cuatro, y la unidad grande
          es <Kr>만</Kr> <Rom>man</Rom>, 10.000. Por eso 100.000 no es &ldquo;cien
          mil&rdquo; sino <Kr>십만</Kr>, &ldquo;diez diez-miles&rdquo;; un millón es{" "}
          <Kr>백만</Kr>, &ldquo;cien diez-miles&rdquo;; diez millones, <Kr>천만</Kr>, y
          cien millones ya tiene palabra propia: <Kr>억</Kr> <Rom>eok</Rom>.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {grandes.map((g) => (
            <div
              key={g.kr}
              className="border-2 border-seoul-black bg-white shadow-[4px_4px_0_#0a0a0f] px-3 py-3 text-center"
            >
              <div className="text-2xl font-black text-seoul-red" style={KR_FONT}>
                {g.kr}
              </div>
              <div className="text-sm text-gray-500 italic">{g.rom}</div>
              <div className="text-base font-bold text-seoul-black">{g.n}</div>
            </div>
          ))}
        </div>

        <p className="mb-6">
          Un detalle: en la conversación, <Kr>백</Kr>, <Kr>천</Kr> y <Kr>만</Kr> se dicen
          solos, sin &ldquo;uno&rdquo; delante. 100 es <Kr>백</Kr>, no &ldquo;일백&rdquo;,
          y 10.000 won son <Kr>만 원</Kr> <Rom>man won</Rom>. Con <Kr>억</Kr>, en cambio,
          sí: cien millones es <Kr>일억</Kr> <Rom>ireok</Rom>.
        </p>
        <p className="mb-6">
          Con la plata esto es pan de cada día. Los billetes coreanos son de{" "}
          <Kr>천 원</Kr>, <Kr>오천 원</Kr>, <Kr>만 원</Kr> y <Kr>오만 원</Kr>, y el de{" "}
          <Kr>만 원</Kr> lleva la cara del rey Sejong, el mismo que creó el Hangul. Si
          algo cuesta 15.000 won, se dice <Kr>만 오천 원</Kr>. Las cifras grandes tienen
          hasta fama propia: una película
          que pasa los diez millones de entradas en Corea es un <Kr>천만 영화</Kr>{" "}
          <Rom>cheonman yeonghwa</Rom>, y el grito <Kr>만세</Kr> <Rom>manse</Rom>, que se
          usa como nuestro &ldquo;¡viva!&rdquo;, significa literalmente &ldquo;diez mil
          años&rdquo;.
        </p>
        <Truco>
          Para leer una cifra grande, cuenta cuatro dígitos desde la derecha y ahí pon el{" "}
          <Kr>만</Kr>: 1.500.000 → 150|0000 → <Kr>150만</Kr> → <Kr>백오십만</Kr>. Unos 51
          millones, más o menos la población de Corea del Sur: 5100|0000 →{" "}
          <Kr>오천백만</Kr>. Y ojo, que en Corea las cifras se escriben con coma, como en
          inglés: 1,500,000.
        </Truco>

        {/* 8 · Trucos */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Trucos para no confundirse
        </h2>
        <ol className="list-decimal pl-6 space-y-3 mb-8">
          <li>
            <strong>La pregunta de los dedos.</strong> ¿Lo puedes contar con los dedos
            (personas, cosas, tazas, horas, años de vida)? Nativo. ¿Es una fecha, un precio,
            un minuto, una medida o un número que sirve de nombre? Sino-coreano.
          </li>
          <li>
            <strong>El reloj.</strong> Aguja corta en nativo, aguja larga en sino-coreano.
          </li>
          <li>
            <strong>La barrera del 100.</strong> Desde 100, siempre sino-coreano:{" "}
            <Kr>학생 백 명</Kr>, cien estudiantes, aunque las personas se cuenten con{" "}
            <Kr>명</Kr>.
          </li>
          <li>
            <strong>Los pares trampa, juntos.</strong> Apréndelos de a dos, porque se
            parecen justo donde no deben:
          </li>
        </ol>

        <div className="overflow-x-auto mb-8">
          <table className="w-full border-2 border-seoul-black text-left text-base">
            <thead className="bg-seoul-black text-white">
              <tr>
                <th className="px-3 py-2 font-bold">Nativo</th>
                <th className="px-3 py-2 font-bold">Sino-coreano</th>
              </tr>
            </thead>
            <tbody>
              {paresTrampa.map((p) => (
                <tr key={p.a} className="border-t border-gray-200">
                  <td className="px-3 py-2">
                    <span className="font-bold text-seoul-black" style={KR_FONT}>
                      {p.a}
                    </span>
                    <span className="block text-sm text-gray-500">{p.aEs}</span>
                  </td>
                  <td className="px-3 py-2">
                    <span className="font-bold text-seoul-red" style={KR_FONT}>
                      {p.b}
                    </span>
                    <span className="block text-sm text-gray-500">{p.bEs}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mb-6">
          Y si te equivocas, tranquilo: hasta los coreanos se enredan con los números
          nativos. En julio de 2020, cuando el gobierno declaró feriado el lunes 17 de
          agosto, los diarios anunciaron un fin de semana largo de <Kr>사흘</Kr>{" "}
          <Rom>saheul</Rom>, y muchos internautas reclamaron que eso no podía ser, que eran
          tres días y no cuatro: le habían visto cara de <Kr>사</Kr>, &ldquo;cuatro&rdquo;.
          Pero <Kr>사흘</Kr> sí significa &ldquo;tres días&rdquo;: los días tienen su propia
          cuenta nativa, <Kr>하루</Kr> (un día), <Kr>이틀</Kr> (dos), <Kr>사흘</Kr>{" "}
          (tres), <Kr>나흘</Kr> (cuatro).
        </p>

        <blockquote className="border-l-4 border-seoul-red bg-[#F4F7FF] px-6 py-5 my-10 text-seoul-black font-medium">
          Mi consejo de profe: no memorices tablas. Amarra cada sistema a una escena: el
          reloj, la cafetería, la caja del supermercado, el formulario. Los números se
          aprenden usándolos, no recitándolos.
        </blockquote>

        {/* 9 · Mini-ejercicio */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Mini-ejercicio: ¿nativo o sino-coreano?
        </h2>
        <p className="mb-6">
          Di en voz alta (o escribe) cómo dirías estas siete frases en coreano. Las
          respuestas están abajo, escondidas para que no hagas trampa.
        </p>
        <ol className="list-decimal pl-6 space-y-2 mb-8">
          {ejercicio.map((e) => (
            <li key={e.es}>{e.es}</li>
          ))}
        </ol>

        <details className="border-2 border-seoul-black bg-white shadow-[4px_4px_0_#0a0a0f] px-5 py-4 mb-8">
          <summary className="cursor-pointer font-black text-seoul-black">
            Ver respuestas
          </summary>
          <ol className="list-decimal pl-6 space-y-3 mt-4 text-base">
            {ejercicio.map((e) => (
              <li key={e.kr}>
                <span className="font-bold text-seoul-red" style={KR_FONT}>
                  {e.kr}
                </span>
                <span className="block text-gray-600">{e.por}</span>
              </li>
            ))}
          </ol>
        </details>

        <p className="mb-6">
          ¿Cuántas te salieron? Con cinco de siete ya cachaste el sistema, y las que fallaste
          suelen ser justo los pares trampa.
        </p>
        <p className="mb-10">
          En Academia Seúl los números entran por capas. En Básico 1 (A1.1) aprendes los
          sino-coreanos hasta 100, a dictar tu teléfono con <Kr>공</Kr> y los primeros
          nativos para decir cuántos son en tu familia: <Kr>우리 가족은 네 명이에요</Kr>.
          En Básico 2 (A1.2) hay una clase completa de números aplicados: edad,
          cumpleaños, hora y teléfono. Y en Coreano para Niños (8–15) hay una clase entera
          para contar con los números nativos y decir la edad: <Kr>저는 열 살이에요</Kr>.
        </p>

        {/* Vocabulario */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Mini-clase de coreano: las palabras de los números
        </h2>
        <p className="mb-6">
          Para que la próxima cuenta en coreano no te pille desprevenido. Si todavía no
          lees Hangul, el{" "}
          <a href="/lector-coreano" className={LINK}>
            Lector de Hangul
          </a>{" "}
          y{" "}
          <a href="/dubu" className={LINK}>
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
              <div className="text-2xl font-black text-seoul-red mb-1" style={KR_FONT}>
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
          . Y cuando quieras clases en vivo, Básico 1 (A1.1) parte desde cero: aprendes a
          leer el Hangul completo, a presentarte, a contar hasta 100 y a dictar tu
          teléfono en coreano. US$150 el curso completo · o 2 cuotas de US$75. Revisa las{" "}
          <Link href="/nivel-1#clases" className={LINK}>
            próximas clases
          </Link>
          .
        </p>

        {/* CTA */}
        <div className="bg-seoul-black text-white border-2 border-seoul-black shadow-[8px_8px_0_#3D2EE8] px-8 py-10 mt-14 text-center">
          <p className="text-4xl font-black text-seoul-gold mb-3" style={KR_FONT}>
            하나, 둘, 셋!
          </p>
          <h3 className="text-2xl font-black mb-3">
            ¿Listo para contar en coreano sin sacar la calculadora?
          </h3>
          <p className="text-white/70 mb-7 max-w-md mx-auto">
            Aprende a leer el Hangul gratis con el Lector, o súmate a Básico 1 (A1.1):
            desde cero, en vivo y con profe, para que los números, tu familia y tu
            teléfono te salgan en coreano.
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
