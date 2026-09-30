import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const POST_URL = "https://www.academiaseul.com/blog/gestos-que-delatan-a-un-coreano";

const DESCRIPTION =
  "La venia (인사), dar y recibir con las dos manos, preguntar la edad, el «¿comiste?», los zapatos fuera y el mito del ventilador: 6 costumbres coreanas explicadas.";

export const metadata: Metadata = {
  // El layout añade " | Academia Seúl" (16 caracteres): título ≤ 44 para que el <title> final quede ≤ 60.
  title: "6 gestos que delatan a un coreano",
  description: DESCRIPTION,
  alternates: {
    canonical: POST_URL,
  },
  openGraph: {
    type: "article",
    title: "6 gestos que delatan a un coreano (aunque haya crecido en Chile)",
    description:
      "La venia al teléfono, el vuelto con las dos manos, un «¿comiste?» en vez de «¿cómo estás?»: seis costumbres coreanas y su palabra en coreano.",
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

function SiTePasa({ children }: { children: ReactNode }) {
  return (
    <div className="border-2 border-seoul-black bg-white shadow-[4px_4px_0_#0a0a0f] px-5 py-4 mb-10">
      <p className="text-xs font-bold tracking-wider uppercase text-seoul-red mb-2">
        Si te pasa a ti
      </p>
      <p className="text-base text-gray-700 leading-snug">{children}</p>
    </div>
  );
}

const vocabulario = [
  {
    kr: "인사",
    rom: "insa",
    es: "Saludo. En Corea casi siempre viene con venia.",
  },
  {
    kr: "두 손으로",
    rom: "du soneuro",
    es: "Con las dos manos: 두 (dos) + 손 (mano) + 으로 (con).",
  },
  {
    kr: "몇 살이에요?",
    rom: "myeot-ssarieyo",
    es: "¿Cuántos años tienes? A un adulto: 나이가 어떻게 되세요?",
  },
  {
    kr: "형 · 누나",
    rom: "hyeong · nuna",
    es: "Hermano mayor · hermana mayor (o amigos mayores), dicho por un hombre.",
  },
  {
    kr: "오빠 · 언니",
    rom: "oppa · eonni",
    es: "Hermano mayor · hermana mayor (o amigos mayores), dicho por una mujer.",
  },
  {
    kr: "밥 먹었어요?",
    rom: "bam-meogeosseoyo",
    es: "¿Comiste? Un «¿cómo estás?» con cariño.",
  },
  {
    kr: "현관 · 신발",
    rom: "hyeongwan · sinbal",
    es: "La entrada de la casa · los zapatos que se quedan ahí.",
  },
  {
    kr: "선풍기",
    rom: "seonpunggi",
    es: "Ventilador. El protagonista del mito del verano.",
  },
];

const faqs = [
  {
    q: "¿Tengo que hacer la venia si conozco a un coreano?",
    a: "No es obligatorio, pero se agradece. Basta con inclinar un poco la cabeza y los hombros mientras dices 안녕하세요. Con una persona mayor, un poco más. Nadie espera que un extranjero lo haga perfecto: el gesto ya dice que te interesa su cultura.",
  },
  {
    q: "¿Es de mala educación preguntar la edad en Corea?",
    a: "No. Es una pregunta habitual al conocerse, porque la edad, junto con la confianza, define si dos personas se hablan con 존댓말 (respetuoso) o 반말 (informal) y si se dicen 형, 누나, 오빠 o 언니. A un adulto que recién conoces se le pregunta 나이가 어떻게 되세요?",
  },
  {
    q: "¿Qué respondo si un coreano me pregunta 밥 먹었어요?",
    a: "Lo mismo que a un «¿cómo estás?»: 네, 먹었어요 (sí, ya comí) o 아직이요 (todavía no). No es necesariamente una invitación, aunque si dices que no has comido, puede que termines comiendo. Lo amable es devolver la pregunta.",
  },
  {
    q: "¿Por qué en Corea se sacan los zapatos al entrar a la casa?",
    a: "Porque la vida tradicional coreana ocurre en el suelo, donde se come, se conversa y se duerme, y ese suelo se calienta con el 온돌 (ondol), una calefacción bajo el piso. Los zapatos se dejan en el 현관, la entrada.",
  },
  {
    q: "¿Es verdad que en Corea creen que dormir con el ventilador encendido es peligroso?",
    a: "Es un mito urbano muy conocido, el 선풍기 사망설. No tiene base científica: un ventilador no consume oxígeno ni produce dióxido de carbono. Hoy muchos coreanos lo cuentan riéndose, aunque más de alguno programa el temporizador por si acaso.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "6 gestos que delatan a un coreano (aunque haya crecido en Chile)",
      description: DESCRIPTION,
      datePublished: "2026-09-30",
      dateModified: "2026-09-30",
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

export default function GestosPost() {
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
            <span className="bg-seoul-red text-white px-3 py-1">Cultura y costumbres</span>
            <span className="text-white/40">30 de septiembre, 2026 · 9 min</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            <span className="block text-seoul-gold text-5xl md:text-7xl mb-3" style={KR_FONT}>
              인사
            </span>
            6 gestos que delatan a un coreano (aunque haya crecido en Chile)
          </h1>
          <p className="text-white/70 text-lg leading-relaxed">
            Un coreano puede haber llegado a Chile de niño, decir &ldquo;po&rdquo; y
            pedir un completo sin mirar la carta. Pero hay gestos que no se van: una venia
            hablando por teléfono, el vuelto recibido con las dos manos, un
            &ldquo;¿comiste?&rdquo; en vez de &ldquo;¿cómo estás?&rdquo;. Son seis
            costumbres coreanas que delatan a cualquiera, cada una con su palabra en
            coreano, empezando por la más básica: <Kr>인사</Kr> (insa), el saludo.
          </p>
        </div>
      </section>

      {/* Body */}
      <article className="max-w-3xl mx-auto px-6 py-16 text-gray-800 leading-relaxed text-lg">

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          La escena: el vuelto con las dos manos
        </h2>
        <p className="mb-6">
          Un almacén de barrio en Santiago. El almacenero pasa el vuelto con una
          mano, como toda la vida, y el cliente lo recibe con las dos y una pequeña
          inclinación de cabeza. El almacenero se queda mirando: ¿le pasé mal el
          vuelto?
        </p>
        <p className="mb-10">
          No: es un reflejo. Quien crece en una familia coreana aprende estos gestos
          antes que el abecedario, y el cuerpo los repite solo aunque haya pasado
          media vida en Latinoamérica. Casi todos son formas de respeto y todos se
          entienden mejor con su palabra en coreano. Te dejamos la lectura entre
          paréntesis como ayuda (y te avisamos cuando no suena como se escribe);
          para leer de verdad, el{" "}
          <a href="/lector-coreano" className="text-seoul-red font-bold underline underline-offset-4">
            Lector de Hangul gratis
          </a>{" "}
          te enseña el alfabeto con audio de cada letra.
        </p>

        <blockquote className="border-l-4 border-seoul-red bg-[#F4F7FF] px-6 py-5 my-10 text-seoul-black font-medium">
          Puedes sacar a un coreano de Corea. La venia del teléfono, en cambio, no
          se la saca nadie.
        </blockquote>

        {/* 1 · La venia */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          1. La venia: <Kr>인사</Kr>
        </h2>
        <p className="mb-6">
          <Kr>인사</Kr> es el saludo, pero en Corea casi nunca viene solo en
          palabras: el <Kr>안녕하세요</Kr> (annyeonghaseyo) va con una inclinación
          de cabeza y hombros, más profunda cuanto mayor es la persona o más formal
          la ocasión. Al vecino del ascensor le basta un gesto leve; a la abuela,
          bastante más. Y en <Kr>설날</Kr> (se pronuncia seollal), el año nuevo
          lunar, los niños (y también los hijos ya adultos) les hacen a sus mayores
          el <Kr>세배</Kr> (sebae), una reverencia de rodillas hasta el suelo; los
          mayores responden con buenos deseos y, a los niños, con dinero de año
          nuevo, el <Kr>세뱃돈</Kr> (sebaetdon).
        </p>
        <p className="mb-6">
          Es herencia de siglos de tradición confuciana, que ordena el trato según
          la edad y la posición, y es tan automática que muchos coreanos se inclinan
          hablando por teléfono, sobre todo al dar las gracias o pedir disculpas a
          un jefe o a alguien mayor. Nadie los ve. Da igual: la cabeza baja sola. En
          Chile, en cambio, lo común es saludar con un beso en la mejilla, y así nace un
          clásico: el chileno va al beso, el coreano va a la venia y alguien termina
          con un cabezazo de cortesía.
        </p>
        <SiTePasa>
          Responde con una venia leve y un <Kr>안녕하세요</Kr>, sin medir grados.
          Con alguien mayor, un poco más profunda y sin las manos en los bolsillos.
        </SiTePasa>

        {/* 2 · Dos manos */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          2. Todo con las dos manos: <Kr>두 손으로</Kr>
        </h2>
        <p className="mb-6">
          Una tarjeta, un regalo, un vaso, el vuelto: en Corea, a una persona mayor
          se le pasan las cosas con las dos manos, y se reciben igual. Vale la
          versión abreviada: la mano derecha entrega y la izquierda toca el
          antebrazo derecho. Con los tragos, la coreografía se afina: por
          tradición, nadie se sirve su propio vaso, el más joven sirve a los
          mayores con las dos manos y, al tomar frente a ellos, gira un poco la
          cara.
        </p>
        <p className="mb-6">
          ¿Por qué? Porque con una sola mano, como al pasar, se siente descuidado,
          casi como tirárselo. Las dos manos dicen &ldquo;esto tiene toda mi
          atención&rdquo;. Y la frase sirve de mini-clase: <Kr>두 손으로</Kr> (du
          soneuro) se arma con <Kr>두</Kr>, &ldquo;dos&rdquo;, + <Kr>손</Kr>,
          &ldquo;mano&rdquo;, + <Kr>으로</Kr>, &ldquo;con&rdquo;.
        </p>
        <SiTePasa>
          Recibe con las dos manos y agradece con un <Kr>감사합니다</Kr>{" "}
          (gamsahamnida). Si te sirven un trago, levanta el vaso con las dos:
          acabas de ganar puntos sin decir una palabra.
        </SiTePasa>

        {/* 3 · La edad */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          3. La edad, de entrada: <Kr>몇 살이에요?</Kr>
        </h2>
        <p className="mb-6">
          En Latinoamérica, preguntar la edad al conocerse puede sonar a falta de
          tacto. En Corea sale muy pronto, a veces apenas después del nombre. Entre
          jóvenes suena así: <Kr>몇 살이에요?</Kr> (se pronuncia myeot-ssarieyo),
          &ldquo;¿cuántos años tienes?&rdquo;. Soltada en un asado chileno,
          produce un silencio muy particular.
        </p>
        <p className="mb-6">
          No es curiosidad: es logística. La edad, junto con la confianza, decide
          si dos personas se hablan con <Kr>존댓말</Kr> (se pronuncia jondaenmal),
          el registro respetuoso, o con <Kr>반말</Kr> (banmal), el informal, y
          cómo se llaman. Entre personas cercanas, un hombre le dice{" "}
          <Kr>형</Kr> (hyeong) a un hombre mayor y <Kr>누나</Kr> (nuna) a una mujer
          mayor; una mujer dice <Kr>오빠</Kr> (oppa) y <Kr>언니</Kr> (eonni). Sí, el
          oppa de los K-dramas lo dicen ellas. Y si tienen la misma edad son{" "}
          <Kr>동갑</Kr> (donggap): pase directo a la amistad.
        </p>
        <p className="mb-6">
          A un adulto que recién conoces se le pregunta más fino:{" "}
          <Kr>나이가 어떻게 되세요?</Kr> (naiga eotteoke doeseyo). Y un dato: en
          la cuenta tradicional coreana se nacía con un año y se sumaba otro con
          cada año nuevo, pero desde el 28 de junio de 2023 las leyes y los documentos
          oficiales usan, salvo algunas excepciones, la edad internacional, llamada{" "}
          <Kr>만 나이</Kr> (man nai). Igual, mucha gente se sigue comparando por el
          año de nacimiento: <Kr>몇 년생이에요?</Kr> (se pronuncia
          myeon-nyeonsaengieyo), &ldquo;¿de qué año eres?&rdquo;.
        </p>
        <SiTePasa>
          Responde tranquilo y devuelve la pregunta. Si tienen la misma edad, un{" "}
          <Kr>동갑이네요!</Kr> (donggabineyo, &ldquo;¡somos de la misma
          edad!&rdquo;) cambia el ambiente. Y si eres hombre, a tu amigo mayor no le
          digas oppa: dile <Kr>형</Kr>. A menos que quieras hacer reír a toda la
          mesa.
        </SiTePasa>

        {/* 4 · ¿Comiste? */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          4. &ldquo;¿Comiste?&rdquo; en vez de &ldquo;¿cómo estás?&rdquo;:{" "}
          <Kr>밥 먹었어요?</Kr>
        </h2>
        <p className="mb-6">
          Muchas veces, un coreano no te pregunta &ldquo;¿cómo estás?&rdquo;: te
          pregunta <Kr>밥 먹었어요?</Kr> Ojo con la lectura: se dice
          bam-meogeosseoyo, porque la <Kr>ㅂ</Kr> de <Kr>밥</Kr> suena como m antes
          de la <Kr>ㅁ</Kr> de <Kr>먹</Kr>. Literalmente, &ldquo;¿comiste
          arroz?&rdquo; (<Kr>밥</Kr> es el arroz cocido y, por extensión, la
          comida). Normalmente no es una invitación: es un &ldquo;¿cómo
          estás?&rdquo; con cariño. Entre amigos se dice <Kr>밥 먹었어?</Kr>; a una
          persona mayor, <Kr>식사하셨어요?</Kr> (siksa-hasyeosseoyo), y a los
          abuelos, con todo respeto, <Kr>진지 드셨어요?</Kr> (jinji
          deusyeosseoyo).
        </p>
        <p className="mb-6">
          La explicación que más se repite en Corea apunta a los tiempos de
          escasez, como el <Kr>보릿고개</Kr>, &ldquo;la cuesta de la cebada&rdquo;:
          los meses de primavera en que se acababa el arroz guardado y la cebada
          aún no estaba lista. Preguntar si alguien había comido era preguntar si
          estaba bien. La escasez pasó; la pregunta se quedó. Su prima,{" "}
          <Kr>언제 밥 한번 먹자</Kr> (&ldquo;comamos juntos algún día&rdquo;), a veces
          es un plan y a veces pura amabilidad, como nuestro &ldquo;¡hay que
          juntarse!&rdquo;. Y <Kr>미역국 먹었어?</Kr> es otra historia, que
          contamos en{" "}
          <Link
            href="/blog/sopa-de-algas-antes-de-un-examen-supersticion-coreana"
            className="text-seoul-red font-bold underline underline-offset-4"
          >
            por qué en Corea nadie come sopa de algas antes de un examen
          </Link>
          .
        </p>
        <SiTePasa>
          Contesta <Kr>네, 먹었어요</Kr> (ne, meogeosseoyo), &ldquo;sí, ya
          comí&rdquo;, o <Kr>아직이요</Kr> (ajigiyo), &ldquo;todavía no&rdquo;, y
          devuelve la pregunta. Advertencia: si dices que no has comido, lo más
          probable es que termines comiendo.
        </SiTePasa>

        {/* 5 · Zapatos */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          5. Zapatos fuera, siempre: <Kr>신발</Kr> y <Kr>현관</Kr>
        </h2>
        <p className="mb-6">
          En una casa coreana, los zapatos (<Kr>신발</Kr>, sinbal) se quedan en el{" "}
          <Kr>현관</Kr> (hyeongwan), la entrada, que suele estar un escalón más
          abajo que el resto de la casa: abajo, zona de zapatos; arriba, zona de
          calcetines. Las visitas también se descalzan, igual que en los
          restaurantes donde se come sentado en el suelo y al entrar a las salas
          de los templos.
        </p>
        <p className="mb-6">
          La razón está en el piso. La vida tradicional coreana pasa en el suelo:
          ahí se come en mesas bajas, se conversa y se duerme, y ese suelo lo
          calienta el <Kr>온돌</Kr> (ondol), una calefacción bajo el piso con más de
          dos mil años de historia en la península. Nadie quiere meter el polvo de
          la calle donde después va a comer. Por eso, en una casa coreana en Santiago, lo
          normal es que las visitas lleguen con zapatillas y terminen la once en
          calcetines.
        </p>
        <SiTePasa>
          Si en la entrada hay una fila de zapatos, descálzate, deja los tuyos
          ordenados y sube. Y ese día, calcetines sin hoyos.
        </SiTePasa>

        {/* 6 · El ventilador */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          6. El ventilador, apagado: <Kr>선풍기 사망설</Kr>
        </h2>
        <p className="mb-6">
          Noche de verano, calor pegajoso, y alguien apaga el ventilador antes de
          dormir, &ldquo;por si acaso&rdquo;. Es el <Kr>선풍기 사망설</Kr>{" "}
          (seonpunggi samangseol), &ldquo;la teoría de la muerte por
          ventilador&rdquo; (<Kr>선풍기</Kr> = ventilador, <Kr>사망</Kr> = muerte,{" "}
          <Kr>설</Kr> = teoría o rumor), uno de los mitos urbanos más famosos de
          Corea: dormir con el ventilador encendido en una pieza cerrada sería
          peligroso.
        </p>
        <p className="mb-6">
          No lo es. Un ventilador no consume oxígeno ni produce dióxido de carbono:
          solo mueve el aire de la pieza. Lo curioso es lo antiguo del mito: ya en
          1927 un diario coreano advertía que los ventiladores eléctricos podían
          dejar a los pulmones sin oxígeno, y en 2006 una agencia pública de
          protección al consumidor todavía ponía la &ldquo;asfixia&rdquo; por
          ventiladores y aires acondicionados entre los cinco accidentes más
          comunes del verano. Hoy muchos coreanos lo cuentan riéndose, pero los ventiladores
          que se venden en Corea suelen traer temporizador (<Kr>타이머</Kr>,
          taimeo) para apagarse solos. Por si acaso, claro.
        </p>
        <SiTePasa>
          No discutas a las tres de la mañana: sonríe y programa el temporizador.
          Nadie ha perdido una amistad por eso.
        </SiTePasa>

        {/* Lo que tienen en común */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Lo que tienen en común: respeto y <Kr>눈치</Kr>
        </h2>
        <p className="mb-10">
          Mira los seis juntos: la venia, las dos manos y la edad ordenan el
          respeto; el &ldquo;¿comiste?&rdquo; y el temporizador son cuidado; los
          zapatos, las dos cosas. Ninguno se explica en voz alta: se leen en el
          ambiente, y eso en coreano tiene nombre,{" "}
          <Link
            href="/blog/nunchi-el-arte-coreano-de-leer-el-ambiente"
            className="text-seoul-red font-bold underline underline-offset-4"
          >
            눈치 (nunchi)
          </Link>
          . Por eso aprender coreano es aprender también estos gestos: la edad vive
          en cómo se llama a cada uno (<Kr>형</Kr>, <Kr>언니</Kr>), el respeto en
          las terminaciones de los verbos y el cariño en una pregunta sobre arroz.
        </p>

        <blockquote className="border-l-4 border-seoul-red bg-[#F4F7FF] px-6 py-5 my-10 text-seoul-black font-medium">
          Los gestos coreanos no son reglas para memorizar. Son maneras de decir
          &ldquo;te veo&rdquo; sin decirlo.
        </blockquote>

        {/* Vocabulario */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Mini-clase de coreano: las palabras de los 6 gestos
        </h2>
        <p className="mb-6">
          Para que el próximo gesto coreano no te pille desprevenido. Si todavía no
          lees Hangul, el{" "}
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
          aprendes a leer el Hangul completo, a saludar con <Kr>안녕하세요</Kr>{" "}
          (venia incluida) y a presentarte. US$150 el curso completo · o 2 cuotas
          de US$75. Revisa las{" "}
          <Link href="/nivel-1#clases" className="text-seoul-red font-bold underline underline-offset-4">
            próximas clases
          </Link>
          .
        </p>

        {/* CTA */}
        <div className="bg-seoul-black text-white border-2 border-seoul-black shadow-[8px_8px_0_#3D2EE8] px-8 py-10 mt-14 text-center">
          <p className="text-4xl font-black text-seoul-gold mb-3" style={KR_FONT}>
            인사
          </p>
          <h3 className="text-2xl font-black mb-3">
            ¿Listo para tu primer 안녕하세요 con venia?
          </h3>
          <p className="text-white/70 mb-7 max-w-md mx-auto">
            Aprende a leer el Hangul gratis con el Lector, o súmate a Básico 1
            (A1.1): desde cero, en vivo y con profe, para que los gestos vengan con
            sus palabras.
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
