import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "눈치 (nunchi): el arte coreano de leer el ambiente | Academia Seúl",
  description:
    "Qué es el nunchi (눈치), el 'superpoder' coreano de leer el ambiente y entender lo que nadie dice en voz alta. Su origen cultural, ejemplos del día a día y de los K-dramas, y cómo desarrollarlo.",
  alternates: {
    canonical:
      "https://www.academiaseul.com/blog/nunchi-el-arte-coreano-de-leer-el-ambiente",
  },
  openGraph: {
    title: "눈치 (nunchi): el arte coreano de leer el ambiente",
    description:
      "El 'superpoder' coreano de entender lo que nadie dice en voz alta — y cómo aprenderlo.",
  },
};

const expresiones = [
  {
    kr: "눈치가 빠르다",
    rom: "nunchi-ga ppareuda",
    es: "Tener el nunchi rápido: captar todo al instante, ser muy perceptivo.",
  },
  {
    kr: "눈치가 없다",
    rom: "nunchi-ga eopda",
    es: "No tener nunchi: no darse cuenta de lo que pasa alrededor.",
  },
  {
    kr: "눈치를 보다",
    rom: "nunchi-reul boda",
    es: "Estar pendiente de la reacción de alguien antes de actuar.",
  },
  {
    kr: "눈치 채다",
    rom: "nunchi chaeda",
    es: "Darse cuenta de algo que nadie dijo abiertamente.",
  },
];

export default function NunchiPost() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation solid />

      {/* Hero */}
      <section className="bg-seoul-black text-white pt-32 md:pt-40 pb-16 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 text-xs font-bold tracking-wider uppercase mb-6">
            <Link href="/blog" className="text-white/50 hover:text-white transition-colors">
              ← Blog
            </Link>
            <span className="bg-seoul-red text-white px-3 py-1">Palabras intraducibles</span>
            <span className="text-white/40">7 de junio, 2026 · 5 min</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            <span
              className="block text-seoul-gold text-5xl md:text-7xl mb-3"
              style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
            >
              눈치
            </span>
            El superpoder coreano de leer el ambiente
          </h1>
          <p className="text-white/70 text-lg leading-relaxed">
            Existe una palabra coreana para esa habilidad de entrar a un lugar y,
            sin que nadie diga nada, saber exactamente qué está pasando. Se llama{" "}
            <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>눈치</span>{" "}
            (nunchi), y una vez que la conoces, la ves en todas partes.
          </p>
        </div>
      </section>

      {/* Body */}
      <article className="max-w-3xl mx-auto px-6 py-16 text-gray-800 leading-relaxed text-lg">

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          La escena que todos hemos vivido
        </h2>
        <p className="mb-6">
          Imagina una cena. Alguien cuenta una noticia y, de repente, el aire
          cambia. Nadie dice nada, pero todos lo sienten: este no es el momento
          para bromear. Una persona percibe ese cambio al instante y suaviza la
          conversación. Otra, en cambio, sigue como si nada y suelta el chiste
          equivocado.
        </p>
        <p className="mb-10">
          La diferencia entre esas dos personas tiene nombre en coreano:{" "}
          <strong>nunchi</strong>. La primera{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>눈치가 빠르다</span>{" "}
          (tiene el nunchi rápido); la segunda{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>눈치가 없다</span>{" "}
          (no tiene nunchi).
        </p>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          ¿Qué significa 눈치 exactamente?
        </h2>
        <p className="mb-6">
          La palabra se forma con{" "}
          <span className="kr" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>눈</span>{" "}
          (nun = ojo) y un sufijo que aporta la idea de <em>medida</em>. Literalmente
          sería algo como <strong>&ldquo;la medida del ojo&rdquo;</strong>: la
          capacidad de leer con la mirada lo que las personas sienten y piensan,
          sin que lo digan con palabras.
        </p>
        <p className="mb-10">
          No es adivinación ni manipulación. Es <strong>atención</strong>: notar el
          tono de voz, la postura, los silencios, quién mira a quién. En español
          nos acercamos con frases como &ldquo;leer el ambiente&rdquo;, &ldquo;tener
          tacto&rdquo; o &ldquo;tener calle&rdquo;, pero ninguna captura la idea
          completa en una sola palabra. El coreano sí.
        </p>

        <blockquote className="border-l-4 border-seoul-red bg-[#F4F7FF] px-6 py-5 my-10 text-seoul-black font-medium">
          El nunchi no es leer la mente. Es prestar tanta atención a las personas
          que casi no necesitas que te expliquen lo que sienten.
        </blockquote>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Por qué Corea desarrolló esta palabra
        </h2>
        <p className="mb-6">
          Corea es una cultura de <em>alto contexto</em>: gran parte del mensaje no
          está en las palabras, sino en lo que las rodea. A eso se suma una
          sociedad donde la armonía del grupo y el respeto por la jerarquía pesan
          mucho. En ese entorno, saber leer lo no dicho no es un lujo: es una forma
          de cuidar a los demás y de moverse con gracia.
        </p>
        <p className="mb-10">
          Por eso el nunchi se enseña desde la infancia. Un niño con buen nunchi
          entiende cuándo su abuela está cansada, cuándo conviene quedarse callado,
          cuándo ofrecer ayuda antes de que se la pidan. Es empatía convertida en
          habilidad social.
        </p>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          El nunchi en el día a día
        </h2>
        <p className="mb-6">
          En una comida coreana, la persona más joven sirve la bebida a los
          mayores <em>antes</em> de que la pidan: eso es nunchi. Notar que tu amigo
          está incómodo y cambiar de tema sin que él lo mencione: nunchi. Saber el
          momento exacto para irte de una reunión: también nunchi.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {expresiones.map((e) => (
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
          Por qué lo reconoces de los K-dramas
        </h2>
        <p className="mb-10">
          ¿Esas escenas donde dos personajes no se dicen nada pero tú sientes toda
          la tensión? Eso es nunchi llevado a la pantalla. Gran parte de la magia
          del K-drama está en lo que <em>no</em> se dice: una mirada que se sostiene
          un segundo de más, un silencio que pesa, un gesto que lo cambia todo. Si
          alguna vez lloraste con una escena sin diálogo, ya entiendes el nunchi
          mejor de lo que crees.
        </p>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Cómo empezar a desarrollar tu nunchi
        </h2>
        <p className="mb-6">
          La buena noticia: el nunchi se entrena. Y curiosamente, aprender coreano
          lo despierta, porque el idioma te obliga a fijarte en el contexto, en la
          jerarquía y en el tono. Tres ideas para empezar hoy:
        </p>
        <p className="mb-2">
          <strong>1. Observa antes de hablar.</strong> Al entrar a un lugar, date
          tres segundos para sentir el ambiente antes de reaccionar.
        </p>
        <p className="mb-2">
          <strong>2. Escucha los silencios.</strong> Muchas veces lo importante
          está en lo que la persona no dijo.
        </p>
        <p className="mb-10">
          <strong>3. Pregúntate &ldquo;¿cómo se siente el otro?&rdquo;</strong> antes
          de &ldquo;¿qué quiero decir yo?&rdquo;. Ahí empieza todo.
        </p>

        <p className="mb-6">
          El nunchi es, en el fondo, una manera de querer a las personas con
          atención. Y esa misma sensibilidad es la que hace que aprender coreano se
          sienta menos como estudiar un idioma y más como entrar a otra forma de
          ver el mundo.
        </p>

        {/* CTA */}
        <div className="bg-seoul-black text-white border-2 border-seoul-black shadow-[8px_8px_0_#3D2EE8] px-8 py-10 mt-14 text-center">
          <p
            className="text-4xl font-black text-seoul-gold mb-3"
            style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
          >
            눈치
          </p>
          <h3 className="text-2xl font-black mb-3">
            ¿Quieres entender el coreano que no está en las palabras?
          </h3>
          <p className="text-white/70 mb-7 max-w-md mx-auto">
            En Academia Seúl no solo aprendes gramática: aprendes la cultura que
            le da sentido. Empieza por leer tu primera palabra en nuestro taller
            gratuito, o ve directo al curso Nivel 1.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/taller"
              className="bg-[#E8B84B] text-seoul-black font-bold px-7 py-3.5 shadow-[4px_4px_0_rgba(255,255,255,0.2)] hover:-translate-y-0.5 transition-transform"
            >
              Taller gratuito →
            </Link>
            <Link
              href="/nivel-1"
              className="bg-seoul-red text-white font-bold px-7 py-3.5 shadow-[4px_4px_0_rgba(255,255,255,0.2)] hover:-translate-y-0.5 transition-transform"
            >
              Curso Nivel 1 →
            </Link>
          </div>
          <p className="text-white/50 text-sm mt-6">화이팅 chingu! 🇰🇷</p>
        </div>
      </article>

      <Footer />
    </main>
  );
}
