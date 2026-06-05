import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hangul: el alfabeto que un rey inventó para su pueblo | Academia Seúl",
  description:
    "La historia del Hangul: por qué el rey Sejong creó el alfabeto coreano en 1443, cómo sus letras imitan la forma de tu boca y por qué los lingüistas lo consideran uno de los sistemas de escritura más lógicos del mundo.",
  alternates: {
    canonical:
      "https://www.academiaseul.com/blog/hangul-el-alfabeto-mas-cientifico",
  },
  openGraph: {
    title: "Hangul: el alfabeto que un rey inventó para su pueblo",
    description:
      "Por qué puedes aprender a leer coreano en una hora — la historia y la ciencia detrás del Hangul.",
  },
};

const consonants = [
  { char: "ㄱ", sound: "g/k", organ: "La raíz de la lengua cerrando la garganta" },
  { char: "ㄴ", sound: "n", organ: "La lengua tocando la encía superior" },
  { char: "ㅁ", sound: "m", organ: "La forma de los labios cerrados" },
  { char: "ㅅ", sound: "s", organ: "El perfil de los dientes" },
  { char: "ㅇ", sound: "ng", organ: "La forma redonda de la garganta abierta" },
];

const vowelElements = [
  { char: "ㆍ", name: "Cielo", desc: "Un punto: el sol en el cielo (hoy es un trazo corto)" },
  { char: "ㅡ", name: "Tierra", desc: "Una línea horizontal: la tierra plana" },
  { char: "ㅣ", name: "Ser humano", desc: "Una línea vertical: la persona de pie" },
];

export default function HangulPost() {
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
            <span className="bg-seoul-red text-white px-3 py-1">Cultura</span>
            <span className="text-white/40">5 de junio, 2026 · 6 min</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            <span
              className="block text-seoul-gold text-5xl md:text-7xl mb-3"
              style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
            >
              한글
            </span>
            El alfabeto que un rey inventó para su pueblo
          </h1>
          <p className="text-white/70 text-lg leading-relaxed">
            Hace casi 600 años, un rey decidió que leer no podía seguir siendo un
            privilegio de las élites. Esta es la historia del Hangul — y la razón
            por la que tú puedes aprender a leerlo en una sola hora.
          </p>
        </div>
      </section>

      {/* Body */}
      <article className="max-w-3xl mx-auto px-6 py-16 text-gray-800 leading-relaxed text-lg">

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Un país que no podía escribir su propia lengua
        </h2>
        <p className="mb-6">
          Durante siglos, Corea habló coreano pero escribió en chino. Los hanja —
          caracteres chinos — eran el único sistema disponible, y dominarlos
          exigía años de estudio que solo los aristócratas podían pagar. El
          resultado: la inmensa mayoría del pueblo coreano vivía sin poder leer
          ni escribir su propio idioma. Las leyes, los contratos, las cartas —
          todo pasaba por manos ajenas.
        </p>
        <p className="mb-10">
          Y había un problema extra: el chino y el coreano son idiomas
          completamente distintos. Escribir coreano con caracteres chinos era
          como intentar escribir español con kanji japonés. Simplemente no
          encajaba.
        </p>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          1443: el proyecto secreto del rey Sejong
        </h2>
        <p className="mb-6">
          El rey Sejong el Grande (세종대왕), cuarto monarca de la dinastía
          Joseon, hizo algo que ningún otro gobernante de la historia había
          hecho: en lugar de aceptar el sistema heredado, creó un alfabeto nuevo
          desde cero, diseñado específicamente para los sonidos del coreano y
          para que cualquier persona pudiera aprenderlo rápido.
        </p>
        <p className="mb-6">
          Lo presentó en 1443 y lo promulgó en 1446 en un documento llamado{" "}
          <em>Hunminjeongeum</em> (훈민정음): &ldquo;los sonidos correctos para
          la instrucción del pueblo&rdquo;. En su proclamación, Sejong explicó
          su motivo con una franqueza que todavía emociona: existían muchos
          coreanos que querían expresarse y no podían. El nuevo alfabeto era
          para ellos.
        </p>
        <blockquote className="border-l-4 border-seoul-red bg-[#FDF6EC] px-6 py-5 my-10 text-seoul-black font-medium">
          La tradición dice que una persona inteligente puede aprender el Hangul
          en una mañana, y cualquier persona en unos pocos días. Casi 600 años
          después, en nuestros talleres lo comprobamos cada semana: en una hora
          ya estás leyendo tus primeras palabras.
        </blockquote>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          La ciencia: letras que dibujan tu boca
        </h2>
        <p className="mb-8">
          Aquí está el genio del Hangul, y lo que lo hace distinto de casi todo
          alfabeto del planeta: <strong>las consonantes son diagramas de tu
          aparato fonador</strong>. Cada letra básica dibuja la posición de la
          lengua, los labios o la garganta al pronunciar ese sonido.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {consonants.map((c) => (
            <div
              key={c.char}
              className="flex items-center gap-5 border-2 border-seoul-black bg-white shadow-[4px_4px_0_#0a0a0f] px-5 py-4"
            >
              <span
                className="text-5xl font-black text-seoul-red"
                style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
              >
                {c.char}
              </span>
              <div>
                <div className="font-bold text-seoul-black">[{c.sound}]</div>
                <div className="text-sm text-gray-600">{c.organ}</div>
              </div>
            </div>
          ))}
        </div>

        <p className="mb-10">
          ¿Y los sonidos más fuertes? Se construyen <em>agregando trazos</em> a
          la letra base: ㄱ (g) se convierte en ㅋ (k), ㄷ (d) en ㅌ (t). El
          sistema es tan consistente que los lingüistas lo clasifican como un
          alfabeto <em>featural</em>: la forma de cada letra codifica
          información sobre cómo se pronuncia. Por eso muchos académicos lo
          describen como uno de los sistemas de escritura más científicos jamás
          creados.
        </p>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Las vocales: cielo, tierra y ser humano
        </h2>
        <p className="mb-8">
          Las vocales nacen de tres elementos de la filosofía oriental — el
          cielo, la tierra y el ser humano — que se combinan entre sí:
        </p>

        <div className="grid grid-cols-3 gap-4 mb-10">
          {vowelElements.map((v) => (
            <div
              key={v.name}
              className="text-center border-2 border-seoul-black bg-[#FDF6EC] shadow-[4px_4px_0_#0a0a0f] px-4 py-6"
            >
              <div
                className="text-5xl font-black text-seoul-black mb-2"
                style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
              >
                {v.char}
              </div>
              <div className="font-bold text-seoul-red mb-1">{v.name}</div>
              <div className="text-xs text-gray-600 leading-snug">{v.desc}</div>
            </div>
          ))}
        </div>

        <p className="mb-10">
          Combina el punto del cielo con la línea de la tierra y obtienes ㅗ
          (o); ponlo junto a la persona y aparece ㅏ (a). Catorce consonantes,
          diez vocales, y un sistema de combinación que se aprende en una tarde.
          Compáralo con los miles de caracteres que exige el chino, o con la
          ortografía caótica del inglés, y entenderás por qué Corea presume de
          su alfabeto.
        </p>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          Sílabas que se arman como bloques
        </h2>
        <p className="mb-6">
          El Hangul no escribe las letras en fila como el español: las agrupa en
          bloques silábicos. La palabra 한글 (Hangul) son dos bloques: 한 (h + a
          + n) y 글 (g + eu + l). Cada bloque es una sílaba completa que se lee
          de un vistazo.
        </p>
        <p className="mb-10">
          Esto, que parece exótico, es justamente lo que hace que leer coreano
          sea tan rápido una vez que conoces las piezas. Es Lego lingüístico:
          mismas piezas, combinaciones infinitas.
        </p>

        <h2 className="text-3xl font-black text-seoul-black mb-5">
          El alfabeto que tiene su propio feriado
        </h2>
        <p className="mb-6">
          Corea del Sur celebra cada 9 de octubre el <strong>Día del
          Hangul</strong> (한글날) — probablemente el único país del mundo con
          un feriado nacional dedicado a su alfabeto. Y la UNESCO entrega desde
          1989 el <em>Premio de Alfabetización Rey Sejong</em>, en honor al
          monarca que entendió, siglos antes que nadie, que la alfabetización es
          poder.
        </p>
        <p className="mb-6">
          El <em>Hunminjeongeum</em> original está inscrito en el registro
          Memoria del Mundo de la UNESCO. No es solo patrimonio de Corea: es un
          recordatorio de que la escritura puede diseñarse con lógica, ciencia y
          — sobre todo — amor por la gente común.
        </p>

        {/* CTA */}
        <div className="bg-seoul-black text-white border-2 border-seoul-black shadow-[8px_8px_0_#C8001E] px-8 py-10 mt-14 text-center">
          <p
            className="text-4xl font-black text-seoul-gold mb-3"
            style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
          >
            한글
          </p>
          <h3 className="text-2xl font-black mb-3">
            ¿Quieres leerlo con tus propios ojos?
          </h3>
          <p className="text-white/70 mb-7 max-w-md mx-auto">
            En nuestro taller gratuito en vivo aprendes a leer tus primeras
            palabras en coreano en una hora. Y si quieres ir en serio, el Nivel
            1 te lleva de cero a conversar.
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
