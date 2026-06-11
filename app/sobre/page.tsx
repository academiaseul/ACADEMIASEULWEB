import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mi historia — Jay (김재희) | Academia Seúl",
  description:
    "La historia de Jay Kim, fundador de Academia Seúl: de little Kim en Seúl a profesor en Chile. Por qué creó la primera academia de coreano pensada para hispanohablantes.",
  alternates: { canonical: "https://www.academiaseul.com/sobre" },
};

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-[#FDF6EC]">
      <Navigation solid />

      {/* Header */}
      <section className="pt-32 md:pt-40 pb-8 px-6 max-w-3xl mx-auto text-center">
        <p className="text-seoul-red text-xs font-bold tracking-[4px] uppercase mb-4">
          이야기 · Mi historia
        </p>
        <h1 className="text-4xl md:text-6xl font-black text-seoul-black mb-6">
          Hola, soy <span className="text-seoul-red">Jay</span> 👋
        </h1>

        <div className="flex items-center justify-center gap-4 mb-2">
          <div
            className="w-16 h-16 rounded-full bg-seoul-red text-white font-black text-xl flex items-center justify-center border-2 border-seoul-black"
            style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
          >
            김재희
          </div>
          <div className="text-left">
            <div className="font-black text-seoul-black">Jay Kim · 김재희</div>
            <div className="text-sm text-gray-500">Fundador y profesor · Academia Seúl</div>
          </div>
        </div>
      </section>

      {/* Letter */}
      <section className="px-6 pb-10 max-w-2xl mx-auto">
        <article className="text-[17px] md:text-lg leading-relaxed text-gray-800 space-y-5">
          <p>
            Nací como <em>little Kim</em> en Seúl, entre kimchi y una educación
            coreana de la dura — esa que te enseña a esforzarte y a no rendirte
            nunca.
          </p>
          <p>
            Tenía 10 años cuando crucé medio mundo y llegué a Chile. Fue
            increíble… y durísimo. En el colegio americano me tocaba hacer
            malabares con el español y el inglés al mismo tiempo, sin red.
            Aprender a <em>pertenecer</em> fue mi primera gran lección — y nadie
            me dio un mapa.
          </p>
          <p>
            Pero Chile me adoptó. Me enamoré de los asados, las empanadas y los
            zapateos de norte a sur. Sin darme cuenta, me convertí en las dos
            cosas a la vez: coreano y latino.
          </p>

          <blockquote className="border-l-4 border-seoul-red pl-5 my-8">
            <p className="text-2xl md:text-3xl font-black text-seoul-black leading-snug">
              Una conexión para el mundo. Un puente con piernas.
            </p>
          </blockquote>

          <p>
            Después me fui a estudiar a Michigan y me hice economista. Pero si
            miro hacia atrás, toda mi vida hice lo mismo: enseñar y ayudar. Mi
            mamá fue profesora universitaria, y de ella heredé la fascinación por
            aprender. Estudiar no es mi obligación; es mi pasión.
          </p>
          <p>
            De ahí nació Academia Seúl. Quiero compartir lo que amo —el idioma,
            la cultura, la música, el K-pop, la comida— con quienes lo aman desde
            lejos, igual que yo amé a Chile desde el primer asado.
          </p>
          <p>
            Y en el camino descubrí algo que me dolió: casi todo el material para
            aprender coreano está hecho <strong>para nativos</strong>, o{" "}
            <strong>en inglés</strong>. No existe contenido —ni un libro de
            verdad— pensado para hispanohablantes. Seré su{" "}
            <strong>profesor Kim</strong>, y un buen <em>chingu</em>. Por eso voy a
            escribirlo junto al gran equipo de profesores que he formado y que
            pronto van a conocer. <strong>Para ustedes.</strong>
          </p>
          <p>
            Gracias por estar aquí, justo al inicio de este viaje. Este puente lo
            cruzamos juntos.
          </p>
          <p className="font-bold text-seoul-black">
            화이팅, chingu 🇰🇷
            <br />— Jay (김재희)
          </p>
        </article>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24 max-w-2xl mx-auto">
        <div className="border-2 border-seoul-black bg-white shadow-[8px_8px_0_#C8001E] p-8 text-center">
          <p
            className="text-2xl font-black text-seoul-black mb-2"
          >
            Aprende coreano con un{" "}
            <span className="text-seoul-red">chingu</span>.
          </p>
          <p className="text-gray-600 mb-6">
            Empieza desde cero conmigo y el equipo. Clases en vivo, grupos
            pequeños.
          </p>
          <a
            href="/nivel-1"
            className="inline-block bg-seoul-red text-white font-bold px-8 py-4 rounded-full hover:scale-[1.02] transition"
          >
            Empezar el Nivel 1 →
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
