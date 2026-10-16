import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const POST_URL = "https://www.academiaseul.com/blog/suneung-el-dia-que-corea-se-detiene";

const HEADLINE = "수능: el día que Corea entera se detiene (y los aviones esperan)";

const DESCRIPTION =
  "El 수능, la prueba de ingreso a la universidad en Corea: oficinas que entran tarde, aviones en tierra, regalos que son juegos de palabras y frases de ánimo.";

const IMG = "/blog/suneung-el-dia-que-corea-se-detiene";

export const metadata: Metadata = {
  // El layout añade " | Academia Seúl" (16 caracteres): título ≤ 44 para que el <title> final quede ≤ 60.
  // "Suneung" en letras latinas: es lo que busca un hispanohablante.
  title: "Suneung: el día que Corea entera se detiene",
  description: DESCRIPTION,
  alternates: {
    canonical: POST_URL,
  },
  openGraph: {
    type: "article",
    title: HEADLINE,
    description:
      "Aviones en tierra, bolsa que abre tarde, policías que llevan a los atrasados y tenedores de regalo: así vive Corea el día del 수능.",
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

function Recuadro({ titulo, children }: { titulo: ReactNode; children: ReactNode }) {
  return (
    <div className="border-2 border-seoul-black bg-white shadow-[4px_4px_0_#0a0a0f] px-5 py-4 mb-10">
      <p className="text-xs font-bold tracking-wider uppercase text-seoul-red mb-2">{titulo}</p>
      <p className="text-base text-gray-700 leading-snug">{children}</p>
    </div>
  );
}

// Horario oficial del 수능 2026 (2027학년도), hora de Corea, según el plan de KICE.
const horario = [
  { hora: "08:10", kr: "입실", es: "Hora límite para entrar a la sala. Después, la puerta se cierra." },
  { hora: "08:40–10:00", kr: "1교시 국어", es: "Lenguaje: comprensión de lectura y literatura coreana." },
  { hora: "10:30–12:10", kr: "2교시 수학", es: "Matemática (esta vez sí, la de los números)." },
  { hora: "12:10–13:00", kr: "점심시간", es: "Almuerzo, con el 도시락 traído de la casa." },
  { hora: "13:10–14:20", kr: "3교시 영어", es: "Inglés. Los primeros 25 minutos son de comprensión auditiva." },
  { hora: "14:50–16:37", kr: "4교시 한국사·탐구", es: "Historia de Corea (obligatoria) y hasta dos asignaturas de ciencias sociales, naturales o técnico-profesionales." },
  { hora: "17:05–17:45", kr: "5교시 제2외국어/한문", es: "Segunda lengua extranjera o caracteres chinos. Es optativa." },
];

const regalos = [
  {
    kr: "포크 · 도끼",
    rom: "pokeu · dokki",
    verbo: "찍다",
    es: "Un tenedor o un hacha de juguete. 찍다 es pinchar con el tenedor, golpear con el hacha... y, en jerga estudiantil, marcar una alternativa a ojo cuando no sabes la respuesta. El deseo: que hasta lo adivinado salga bien.",
  },
  {
    kr: "휴지",
    rom: "hyuji",
    verbo: "풀다",
    es: "Un rollo de papel higiénico. 풀다 es desenrollar y también resolver: 문제를 풀다, resolver un problema. Que todo se desenrolle solito.",
  },
  {
    kr: "거울",
    rom: "geoul",
    verbo: "보다",
    es: "Un espejo, 잘 보라고: «para que mires bien». En coreano un examen no se da ni se rinde: se «ve», 시험을 보다.",
  },
  {
    kr: "족집게",
    rom: "jokjipge",
    verbo: "맞히다",
    es: "Unas pinzas, para acertar justo en la respuesta (맞히다). Un 족집게 강사 es el profe que adivina con precisión qué vendrá en la prueba.",
  },
  {
    kr: "주사위",
    rom: "jusawi",
    verbo: "굴리다",
    es: "Un dado. 굴리다 es hacer rodar, y 머리를 굴리다, «hacer rodar la cabeza», es pensar rápido. Más de alguno lo usa para decidir entre la 3 y la 4.",
  },
];

const vocabulario = [
  {
    kr: "수능",
    rom: "suneung",
    es: "La prueba de ingreso a la universidad: abreviación de 대학수학능력시험.",
  },
  {
    kr: "수험생",
    rom: "suheomsaeng",
    es: "Quien rinde un examen. En noviembre, el protagonista de Corea.",
  },
  {
    kr: "수험표",
    rom: "suheompyo",
    es: "La credencial del examen. Después del 수능, también vale descuentos.",
  },
  {
    kr: "고3 (고삼)",
    rom: "gosam",
    es: "Tercer y último año de la enseñanza media: nuestro 4º medio.",
  },
  {
    kr: "학원",
    rom: "hagwon",
    es: "Academia privada de reforzamiento. Algo así como el preu, pero todos los días.",
  },
  {
    kr: "재수",
    rom: "jaesu",
    es: "Volver a dar el examen al año siguiente. Quien lo hace es 재수생.",
  },
  {
    kr: "대박",
    rom: "daebak",
    es: "Éxito enorme. 수능 대박! = ¡que te vaya increíble en el 수능!",
  },
  {
    kr: "찍다",
    rom: "jjikda",
    es: "Pinchar, golpear con el hacha... y, en el examen, marcar una alternativa al azar.",
  },
  {
    kr: "풀다",
    rom: "pulda",
    es: "Desenrollar, desatar... y resolver un problema.",
  },
  {
    kr: "수고했어",
    rom: "sugohaesseo",
    es: "«Te esforzaste», «buen trabajo». Lo que todos escuchan al salir.",
  },
];

const faqs = [
  {
    q: "¿Cuándo es el 수능 2026?",
    a: "El jueves 19 de noviembre de 2026. Es el 수능 del año académico 2027 (2027학년도), porque sirve para entrar a la universidad en marzo de 2027. Hay que estar en la sala a las 8:10, la última prueba termina a las 17:45 (hora de Corea) y los puntajes se entregan el 11 de diciembre de 2026.",
  },
  {
    q: "¿Por qué en Corea no vuelan aviones durante el 수능?",
    a: "Para que el ruido no interrumpa la prueba de comprensión auditiva de inglés. Cada año el gobierno suspende los despegues y aterrizajes en todo el país, salvo emergencias, durante unos 35 minutos (en 2025, de 13:05 a 13:40), y los aviones que ya están volando esperan a más de 3 km de altura. En 2025 hubo que reprogramar 140 vuelos.",
  },
  {
    q: "¿Qué se le regala a alguien que va a dar el 수능?",
    a: "Los clásicos son el 엿 (caramelo de malta) y el 찹쌀떡 (pastelito de arroz glutinoso), porque se pegan, y 붙다, pegarse, también significa aprobar. También se regalan tenedores (찍다: pinchar y adivinar la alternativa), papel higiénico (풀다: desenrollar y resolver) y espejos (보다: mirar y dar un examen). Hoy también son comunes los chocolates y los cupones de regalo que se mandan por el celular.",
  },
  {
    q: "¿Cómo se dice «suerte en el examen» en coreano?",
    a: "Lo más común es 시험 잘 봐! (siheom jal bwa), «¡que te vaya bien en el examen!», o 시험 잘 보세요! con alguien mayor. Para el 수능 se dice 수능 대박 나세요! (se pronuncia suneung daebang naseyo), «¡que te vaya increíble!», y, por supuesto, 화이팅!",
  },
  {
    q: "¿Qué significa 고3?",
    a: "Es 고등학교 3학년, el tercer y último año de la enseñanza media coreana, el equivalente al 4º medio en Chile. Se lee 고삼 (gosam). Es el año del 수능, y en Corea se asocia con jornadas larguísimas entre el colegio, el estudio nocturno y las academias privadas (학원).",
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
        `https://www.academiaseul.com${IMG}/dia-del-suneung.png`,
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

export default function SuneungPost() {
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
            <span className="bg-seoul-red text-white px-3 py-1">Cultura y costumbres</span>
            <span className="text-white/40">15 de octubre, 2026 · 11 min</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            <span className="block text-seoul-gold text-5xl md:text-7xl mb-3" style={KR_FONT}>
              수능
            </span>
            El día que Corea entera se detiene (y los aviones esperan)
          </h1>
          <p className="text-white/70 text-lg leading-relaxed">
            Imagina que un jueves de noviembre todo el país se pone de acuerdo para que
            más de medio millón de personas llegue a tiempo a una prueba: las oficinas
            entran a las diez, la bolsa abre una hora tarde, la policía hace de taxi y,
            durante 35 minutos, ningún avión despega ni aterriza. En Corea no hay que
            imaginarlo: pasa todos los años. Es el día del <Kr>수능</Kr> (suneung), la
            prueba de ingreso a la universidad, y este año cae el jueves 19 de noviembre
            de 2026.
          </p>
        </div>
      </section>

      {/* Body */}
      <article className="max-w-3xl mx-auto px-6 py-16 text-gray-800 leading-relaxed text-lg">

        {/* 1 · Qué es */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Qué es el <Kr>수능</Kr> (y por qué no es una prueba de matemáticas)
        </h2>
        <p className="mb-6">
          <Kr>수능</Kr> es la abreviación de <Kr>대학수학능력시험</Kr> (se pronuncia
          daehak-ssuhang-neungnyeok-ssiheom; respira antes), la «prueba de aptitud para
          los estudios universitarios». Ojo con la trampa: ese <Kr>수학</Kr> no es
          «matemáticas» (<Kr>數學</Kr>), sino <Kr>修學</Kr>, «cursar estudios». Mismo sonido, otro carácter
          chino, y una cáscara de plátano clásica para quien aprende coreano. Del nombre
          largo se toma la primera sílaba de <Kr>수학</Kr> y la primera de{" "}
          <Kr>능력</Kr> (capacidad): <Kr>수</Kr> + <Kr>능</Kr> = <Kr>수능</Kr>.
        </p>
        <p className="mb-6">
          La prepara el Instituto Coreano de Currículo y Evaluación (
          <Kr>한국교육과정평가원</Kr>, conocido por su sigla en inglés, KICE), y el
          Ministerio de Educación (<Kr>교육부</Kr>) fija la fecha con mucha
          anticipación: la de este año se anunció en agosto de 2024. Se rinde desde 1993,
          cuando reemplazó al antiguo <Kr>학력고사</Kr>, y ese primer año, de hecho, se
          rindió dos veces, en agosto y en noviembre. Desde entonces es una sola vez al
          año: casi siempre en noviembre y, desde hace unos veinte años, siempre en
          jueves.
        </p>
        <p className="mb-6">
          El de 2026 se llama <Kr>2027학년도 수능</Kr>, el del «año académico 2027»,
          porque sirve para entrar a la universidad en marzo de 2027, cuando parte el
          año escolar coreano. Es el jueves 19 de noviembre y los puntajes se entregan
          el viernes 11 de diciembre. Según KICE, se inscribieron 551.864 personas. Y
          trae una curiosidad: es el último <Kr>수능</Kr> con el sistema actual de
          materias electivas, porque el de noviembre de 2027 (<Kr>2028학년도</Kr>) estrena
          formato.
        </p>
        <Recuadro titulo="Dato: casi nada lo mueve">
          La fecha del <Kr>수능</Kr> se ha corrido muy pocas veces: en 2005 y 2010,
          para no chocar con cumbres internacionales en Corea; en 2017, una semana, por
          un terremoto en Pohang la víspera de la prueba; y en 2020, dos semanas, por la
          pandemia, que la llevó al 3 de diciembre.
        </Recuadro>

        {/* 2 · Horario */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Un día de casi diez horas: el horario del <Kr>수능</Kr>
        </h2>
        <p className="mb-6">
          El <Kr>수능</Kr> no es una prueba: son cinco, una detrás de otra. Este es el
          horario oficial de 2026, en hora de Corea:
        </p>

        <div className="border-2 border-seoul-black bg-white shadow-[4px_4px_0_#0a0a0f] mb-8">
          {horario.map((h, i) => (
            <div
              key={h.hora}
              className={`flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 px-5 py-3 ${
                i > 0 ? "border-t border-gray-200" : ""
              }`}
            >
              <div className="text-sm font-black text-seoul-black tabular-nums sm:w-28 shrink-0">
                {h.hora}
              </div>
              <div className="sm:w-56 shrink-0 font-bold text-seoul-red" style={KR_FONT}>
                {h.kr}
              </div>
              <div className="text-base text-gray-700 leading-snug">{h.es}</div>
            </div>
          ))}
        </div>

        <p className="mb-6">
          Si rinde todo, un estudiante pasa más de seis horas respondiendo y casi diez
          dentro del colegio. Dos datos para los curiosos: Historia de Corea (
          <Kr>한국사</Kr>) es obligatoria, y quien no la rinde pierde el{" "}
          <Kr>수능</Kr> completo. Y entre las segundas lenguas del último bloque está el
          español (<Kr>스페인어</Kr>): ese jueves, a las cinco de la tarde, en algún liceo
          de Corea alguien está conjugando el verbo «haber» con el corazón en la mano.
        </p>
        <p className="mb-10">
          Para el almuerzo, cada uno lleva su <Kr>도시락</Kr> (dosirak), la colación
          de la casa, muchas veces en un termo para que llegue calentita. Lo que va
          adentro tiene sus reglas, y la más famosa ya te la contamos en{" "}
          <Link
            href="/blog/sopa-de-algas-antes-de-un-examen-supersticion-coreana"
            className="text-seoul-red font-bold underline underline-offset-4"
          >
            por qué en Corea nadie come sopa de algas antes de un examen
          </Link>
          .
        </p>

        {/* 3 · El día */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Oficinas a las diez, aviones en espera: así se detiene Corea
        </h2>
        <p className="mb-6">
          Las medidas exactas se anuncian cada año pocos días antes, pero el libreto casi
          no cambia. Desde temprano, el país se organiza en torno a una sola meta: que
          nadie llegue tarde. El gobierno les pide a las oficinas públicas y a las
          empresas que ese día la entrada sea a las 10:00, para dejarles las calles y el
          transporte a los estudiantes, y el metro de Seúl y sus alrededores suma trenes
          en la mañana.
          Los bancos abren a las 10:00 y la bolsa de valores también abre una hora más
          tarde (y cierra una hora más tarde, para no perder la jornada).
        </p>
        <p className="mb-6">
          ¿Y si igual se te hace tarde? Llamas al 112, el número de la policía, y una
          patrulla o una moto te lleva al local. Cada año la prensa coreana junta las
          historias de esa mañana: el que se equivocó de colegio, la mamá que corre con
          el <Kr>수험표</Kr> olvidado en la mano, el carnet de identidad que llegó en
          patrulla con minutos de sobra. Adentro, el celular se entrega antes de
          empezar: si lo encuentran encima durante la prueba, se anula.
        </p>
        <p className="mb-6">
          Y a la una de la tarde llega el momento más famoso. Durante la comprensión
          auditiva de inglés, Corea apaga el cielo: de 13:05 a 13:40 ningún avión
          despega ni aterriza en todo el país (salvo emergencias), y los que ya vienen
          volando esperan en el aire, a más de 3 kilómetros de altura. Tampoco pueden
          volar drones. En 2025, esos 35 minutos obligaron a reprogramar 140 vuelos.
          Todo para que ningún motor tape una pregunta del <em>listening</em>.
        </p>

        <blockquote className="border-l-4 border-seoul-red bg-[#F4F7FF] px-6 py-5 my-10 text-seoul-black font-medium">
          Durante 35 minutos, Corea apaga el cielo para que más de medio millón de
          estudiantes escuche bien un audio en inglés.
        </blockquote>

        <p className="mb-6">
          Afuera, la escena es otra. Frente a muchos locales, compañeros de cursos
          menores llegan temprano con carteles y bolsitas de golosinas a aplaudir a los
          que entran, y cuando se cierra la puerta quedan los papás: algunos parten al
          trabajo y otros se quedan en la reja con las manos juntas, como si la oración
          pudiera atravesar la pared. Y muchas veces hace frío, tanto que existe una
          expresión para eso, <Kr>수능 한파</Kr> (suneung hanpa), «la ola de frío
          del <Kr>수능</Kr>», aunque hay años en que el frío ni aparece.
        </p>

        <figure className="my-12 mx-auto max-w-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${IMG}/dia-del-suneung.png`}
            alt="Ilustración de Academia Seúl: un estudiante de espaldas, con mochila amarilla, entra por el portón de un colegio con un reloj en la torre, mientras su mamá y su papá esperan afuera con las manos juntas, rodeados de corazones azules y amarillos."
            width={720}
            height={830}
            loading="lazy"
            decoding="async"
            className="w-full h-auto"
          />
          <figcaption className="text-sm text-gray-500 mt-3 text-center">
            La puerta se cierra a las 8:10. Afuera, la familia rinde su propio examen.
          </figcaption>
        </figure>

        {/* 4 · Supersticiones */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Supersticiones: aprobar con juegos de palabras
        </h2>
        <p className="mb-6">
          Si leíste{" "}
          <Link
            href="/blog/sopa-de-algas-antes-de-un-examen-supersticion-coreana"
            className="text-seoul-red font-bold underline underline-offset-4"
          >
            la historia de la sopa de algas
          </Link>
          , ya conoces la lógica: la <Kr>미역국</Kr> es resbalosa y{" "}
          <Kr>미끄러지다</Kr>, «resbalarse», también es reprobar; el <Kr>엿</Kr> y el{" "}
          <Kr>찹쌀떡</Kr> son pegajosos y <Kr>붙다</Kr>, «pegarse», también es aprobar.
          Esa parte está completa allá. Aquí vamos por la segunda generación de
          amuletos, que según la prensa coreana apareció con el <Kr>수능</Kr> y sus
          preguntas de alternativas: regalos que son, literalmente, verbos.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {regalos.map((r) => (
            <div
              key={r.kr}
              className="border-2 border-seoul-black bg-white shadow-[4px_4px_0_#0a0a0f] px-5 py-4"
            >
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-black text-seoul-red" style={KR_FONT}>
                  {r.kr}
                </span>
                <span className="text-base font-bold text-seoul-black" style={KR_FONT}>
                  → {r.verbo}
                </span>
              </div>
              <div className="text-sm text-gray-400 italic mb-2">{r.rom}</div>
              <div className="text-base text-gray-700 leading-snug">{r.es}</div>
            </div>
          ))}
        </div>

        <figure className="my-12 mx-auto max-w-[240px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${IMG}/espejo.png`}
            alt="Ilustración de Academia Seúl: un espejo de pie con marco dorado y cara sonriente, rodeado de destellos."
            width={640}
            height={640}
            loading="lazy"
            decoding="async"
            className="w-full h-auto"
          />
          <figcaption className="text-sm text-gray-500 mt-3 text-center">
            <Kr>거울</Kr>: un espejo, «para que veas bien» el examen.
          </figcaption>
        </figure>

        <p className="mb-6">
          ¿Y hoy? Los amuletos de juego siguen apareciendo, pero según la prensa
          coreana, muchos ya prefieren chocolates, plata o un{" "}
          <Kr>기프티콘</Kr> (gipeutikon), un cupón de regalo que se manda por el
          celular. El deseo es el mismo; el envoltorio se modernizó.
        </p>
        <p className="mb-10">
          Los papás, en cambio, tienen sus propios rituales. Cien días antes del{" "}
          <Kr>수능</Kr>, muchos empiezan un <Kr>100일 기도</Kr> (baegil gido), cien días
          de oración, en templos e iglesias. El lugar más famoso es el{" "}
          <Kr>갓바위</Kr> (gatbawi), un Buda de piedra en el monte Palgong, cerca de
          Daegu, que lleva sobre la cabeza una losa plana como un sombrero tradicional,
          el <Kr>갓</Kr>. A muchos papás les recuerda un birrete de graduación (
          <Kr>학사모</Kr>), y la tradición dice que le concede un deseo a quien sube a
          pedirlo con fe. En noviembre, en la explanada de arriba no cabe un alfiler.
        </p>

        {/* 5 · 고3 */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          <Kr>고3</Kr>: el año más largo
        </h2>
        <p className="mb-6">
          En Corea la enseñanza media dura tres años, y el último, <Kr>고3</Kr> (se lee{" "}
          <Kr>고삼</Kr>, gosam, por <Kr>고등학교 3학년</Kr>), es como nuestro 4º medio, pero con
          esteroides. Para muchos, el día empieza temprano en el colegio, sigue en el{" "}
          <Kr>야자</Kr> (yaja, el «estudio autónomo nocturno» que muchos liceos ofrecen
          en sus propias salas) o termina en un <Kr>학원</Kr> (hagwon), la
          academia privada de reforzamiento: algo así como nuestro preu, pero todos los
          días. En Seúl, una ordenanza obliga a los <Kr>학원</Kr> a terminar sus clases
          a las 22:00 (y cada cierto tiempo se discute alargar ese horario). Que haya
          hecho falta una regla así ya dice bastante.
        </p>

        <figure className="my-12 mx-auto max-w-[240px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${IMG}/hagwon.png`}
            alt="Ilustración de Academia Seúl: un edificio azul de academia con cara sonriente y todas las ventanas iluminadas, una luna creciente en el cielo, un libro y un lápiz a los lados."
            width={640}
            height={640}
            loading="lazy"
            decoding="async"
            className="w-full h-auto"
          />
          <figcaption className="text-sm text-gray-500 mt-3 text-center">
            <Kr>학원</Kr>: luna afuera, luces encendidas adentro.
          </figcaption>
        </figure>

        <p className="mb-6">
          Hay un dicho que resume la época: <Kr>사당오락</Kr> (<Kr>四當五落</Kr>, sadang-orak),
          «cuatro horas, apruebas; cinco, repruebas». O sea, quien duerme cinco horas ya
          durmió demasiado. Hoy se cita más como advertencia que como consejo, y con
          razón: dormir también es estudiar.
        </p>
        <p className="mb-6">
          Además, no todos los que rinden son escolares. De los inscritos de 2026, más
          de un tercio (35,6 %) ya egresó del colegio o rinde por exámenes libres: muchos
          son <Kr>재수생</Kr> (jaesusaeng), quienes vuelven a intentarlo al año
          siguiente, o <Kr>삼수생</Kr> (samsusaeng), que van por la tercera vez. La
          prensa los junta a todos bajo un nombre: <Kr>N수생</Kr>, «los de la
          enésima vez». Según la prensa coreana, es la mayor cantidad de postulantes
          fuera del colegio en 23 años.
        </p>
        <p className="mb-6">
          Detrás de los aviones en tierra y los tenedores de regalo hay una presión
          real, y en Corea se discute en serio: lo que gastan las familias en{" "}
          <Kr>학원</Kr>, el cansancio, la salud mental de los jóvenes, la idea de que un
          solo día defina tanto. La universidad no se decide solo con el{" "}
          <Kr>수능</Kr> (muchas carreras seleccionan también por las notas y la
          trayectoria escolar), pero el jueves de noviembre sigue pesando como ningún
          otro.
        </p>
        <Recuadro titulo={<>Si tienes un amigo en <Kr>고3</Kr></>}>
          No le preguntes «¿y si te va mal?». En noviembre, <Kr>떨어지다</Kr> (caerse)
          y <Kr>미끄러지다</Kr> (resbalarse) son palabras prohibidas, porque las dos
          significan reprobar. Mejor pregúntale si ha dormido, y cuando termine, solo
          dile <Kr>수고했어</Kr>.
        </Recuadro>

        {/* 6 · Después */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Cuando suena la última campana: <Kr>수고했어</Kr>
        </h2>
        <p className="mb-6">
          A las 17:45 termina el último bloque (los que no dan la segunda lengua salen
          antes) y las puertas se abren. Afuera esperan las familias con abrazos y la
          frase que se escucha en todo el país esa tarde: <Kr>수고했어</Kr>{" "}
          (sugohaesseo), «te esforzaste», «buen trabajo». En la versión formal de los
          noticieros y los carteles: <Kr>수험생 여러분, 수고하셨습니다</Kr>,
          «estudiantes, gracias por todo su esfuerzo».
        </p>
        <p className="mb-6">
          Esa misma tarde, KICE publica las respuestas correctas y cada uno se corrige
          con lo que alcanzó a anotar: es el <Kr>가채점</Kr> (gachaejeom), la
          «corrección provisoria», a veces con la familia mirando por encima del
          hombro. Este año trae una novedad: la tablita para anotar las respuestas
          viene impresa en el reverso del <Kr>수험표</Kr>, y hay que llenarla antes de
          que suene el fin de cada prueba (después, cuenta como trampa). Los puntajes
          oficiales llegan semanas después: este año, el 11 de diciembre.
        </p>
        <p className="mb-10">
          Y entonces viene el premio: con el <Kr>수험표</Kr> (suheompyo), la credencial
          de la prueba, llueven los descuentos. En 2025, por ejemplo, varias cadenas de
          cine cobraban 7.000 wones la entrada a quien lo mostrara, y los parques de
          diversiones hacían descuentos de la mitad o más. Ese papelito vale tanto que
          todos los años hay que recordar que usar el de otro para un descuento puede
          terminar en una denuncia por estafa.
        </p>

        {/* 7 · Frases */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Cómo animar a alguien antes del <Kr>수능</Kr> (en coreano)
        </h2>
        <p className="mb-6">
          Si tienes un amigo coreano en edad de <Kr>수능</Kr>, o simplemente quieres
          sumarte al ánimo nacional, estas son las frases que más se escuchan. La lectura
          en gris es solo una ayuda.
        </p>

        <p className="mb-2">
          <span className="kr font-bold" style={KR_FONT}>수능 대박 나세요!</span>{" "}
          <span className="text-gray-400 italic">(suneung daebak naseyo)</span>
          <br />
          «¡Que te vaya increíble en el <Kr>수능</Kr>!». <Kr>대박</Kr> es un exitazo,
          y <Kr>대박 나다</Kr>, «tener un exitazo». Ojo: se pronuncia
          daebang naseyo, porque la <Kr>ㄱ</Kr> final de <Kr>박</Kr> suena ng antes de la{" "}
          <Kr>ㄴ</Kr>. Entre amigos, <Kr>수능 대박 나!</Kr>, y en los carteles, a secas:{" "}
          <Kr>수능 대박!</Kr>
        </p>
        <p className="mb-2 mt-6">
          <span className="kr font-bold" style={KR_FONT}>화이팅!</span>{" "}
          <span className="text-gray-400 italic">(hwaiting)</span>
          <br />
          «¡Ánimo, tú puedes!», del inglés <em>fighting</em>. La ortografía oficial es{" "}
          <Kr>파이팅</Kr>, pero en carteles y chats verás casi siempre{" "}
          <Kr>화이팅</Kr>. Con el puño arriba, idealmente.
        </p>
        <p className="mb-2 mt-6">
          <span className="kr font-bold" style={KR_FONT}>잘 볼 거야.</span>{" "}
          <span className="text-gray-400 italic">(jal bol geoya)</span>
          <br />
          «Te va a ir bien». Literalmente, «lo vas a ver bien», porque el examen, ya
          sabes, se «ve». Se pronuncia jal bol kkeoya. Con alguien mayor:{" "}
          <Kr>잘 보실 거예요</Kr>.
        </p>
        <p className="mb-2 mt-6">
          <span className="kr font-bold" style={KR_FONT}>긴장하지 말고 평소처럼 해.</span>{" "}
          <span className="text-gray-400 italic">(ginjanghaji malgo pyeongsocheoreom hae)</span>
          <br />
          «No te pongas nervioso, hazlo como siempre». El mejor consejo, en una línea.
        </p>
        <p className="mb-2 mt-6">
          <span className="kr font-bold" style={KR_FONT}>넌 할 수 있어.</span>{" "}
          <span className="text-gray-400 italic">(neon hal su isseo)</span>
          <br />
          «Tú puedes». Se pronuncia neon hal ssu isseo.
        </p>
        <p className="mb-10 mt-6">
          <span className="kr font-bold" style={KR_FONT}>그동안 고생 많았어.</span>{" "}
          <span className="text-gray-400 italic">(geudongan gosaeng manasseo)</span>
          <br />
          «Te esforzaste mucho todo este tiempo». Para después del examen, junto con{" "}
          <Kr>수고했어</Kr>, y sin preguntar por el puntaje.
        </p>

        <blockquote className="border-l-4 border-seoul-red bg-[#F4F7FF] px-6 py-5 my-10 text-seoul-black font-medium">
          Cada noviembre, cuando veo desde Chile las noticias del <Kr>수능</Kr>, lo que
          más me mueve no son los aviones en tierra. Es que un país entero se ponga de
          acuerdo en algo tan simple: que los chiquillos lleguen a tiempo, que nadie
          haga ruido y que, al salir, alguien les diga <Kr>수고했어</Kr>.
          <span className="block mt-3 text-sm font-bold text-gray-500">Jay Kim, fundador de Academia Seúl</span>
        </blockquote>

        {/* Vocabulario */}
        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Mini-clase de coreano: el vocabulario del <Kr>수능</Kr>
        </h2>
        <p className="mb-6">
          Diez palabras para seguir las noticias de noviembre. Si todavía no lees
          Hangul, el{" "}
          <a href="/lector-coreano" className="text-seoul-red font-bold underline underline-offset-4">
            Lector de Hangul
          </a>{" "}
          y{" "}
          <a href="/dubu" className="text-seoul-red font-bold underline underline-offset-4">
            Dubu, nuestro puzzle del Hangul
          </a>{" "}
          te enseñan gratis, con audio nativo.
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
          , para firmar tu primer <Kr>수능 대박!</Kr> Y cuando quieras clases en vivo,
          Básico 1 (A1.1) parte desde cero: aprendes a leer el Hangul completo, a
          presentarte y a decir <Kr>화이팅</Kr> con la pronunciación correcta. Si tu
          examen es el TOPIK, tenemos TOPIK II (B1+). US$150 el curso completo · o 2
          cuotas de US$75. Revisa las{" "}
          <Link href="/nivel-1#clases" className="text-seoul-red font-bold underline underline-offset-4">
            próximas clases
          </Link>
          .
        </p>

        {/* CTA */}
        <div className="bg-seoul-black text-white border-2 border-seoul-black shadow-[8px_8px_0_#3D2EE8] px-8 py-10 mt-14 text-center">
          <p className="text-4xl font-black text-seoul-gold mb-3" style={KR_FONT}>
            수능 대박!
          </p>
          <h3 className="text-2xl font-black mb-3">
            Aquí no hay <Kr>수능</Kr>: solo tú, el Hangul y tu ritmo
          </h3>
          <p className="text-white/70 mb-7 max-w-md mx-auto">
            Aprende a leer el Hangul gratis con el Lector, o súmate a Básico 1 (A1.1):
            desde cero, en vivo y con profe. Sin aviones en tierra ni sopa prohibida.
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
