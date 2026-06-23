import { ChevronDown } from 'lucide-react';

export const faqs = [
  {
    q: '¿Necesito saber algo de coreano para empezar?',
    a: 'No. El Nivel 1 (A1) está pensado para empezar desde cero: lo primero que aprenderás es a leer el alfabeto (한글). Si ya sabes algo, igual te sirve para ordenar tus bases.',
  },
  {
    q: '¿Las clases son en vivo o grabadas?',
    a: 'En vivo por Zoom, en grupos pequeños con cupos limitados. Así resolvemos dudas al momento y corregimos tu pronunciación en tiempo real. Si faltas, te apoyamos con material para ponerte al día.',
  },
  {
    q: '¿Cuánto cuesta y qué incluye?',
    a: 'El Nivel 1 tiene un precio de lanzamiento de $89. Incluye todas las clases en vivo de la cohorte, material de estudio y acceso a la comunidad. Puedes ver el programa completo en la página del Nivel 1.',
  },
  {
    q: '¿Qué horarios y fechas hay?',
    a: 'Tenemos dos horarios: miércoles 20:00 (hora Chile) — ideal para LATAM después del trabajo — y sábados 11:00 (Chile) / 16:00 (España). Una clase por semana, desde la semana del 8 de julio. Elige el que mejor te acomode; los detalles están en la página del Nivel 1.',
  },
  {
    q: '¿Me sirve para el examen TOPIK?',
    a: 'Sí. Nuestro camino está alineado con el marco CEFR: el Nivel 1 (A1) te deja la base para avanzar hacia el TOPIK 1. Vamos construyendo nivel a nivel con un método claro.',
  },
  {
    q: '¿Desde qué países puedo tomar las clases?',
    a: 'Desde toda Latinoamérica y España. Las clases son 100% online por Zoom; solo necesitas internet y ganas de aprender. Coordinamos los horarios pensando en distintas zonas horarias.',
  },
  {
    q: '¿Cómo puedo pagar?',
    a: 'Tarjeta de crédito/débito, PayPal o transferencia bancaria. Al inscribirte eliges tu método y reservas tu cupo en la cohorte. Te confirmamos por correo apenas registramos tu pago.',
  },
  {
    q: '¿Y si siento que no es para mí?',
    a: 'Tienes nuestra garantía: si después de la primera semana sientes que no es para ti, te devolvemos el 100%. Sin letra chica. Queremos que estés porque realmente quieres aprender.',
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="relative bg-white section-padding overflow-hidden">
      <div
        aria-hidden
        className="absolute right-6 top-10 text-[12rem] font-black text-seoul-black/[0.03] leading-none select-none pointer-events-none font-korean"
      >
        {'질문'}
      </div>

      <div className="container-tight relative z-10 max-w-3xl">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-seoul-red mb-4">
            FAQ · Preguntas frecuentes
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-seoul-black leading-tight">
            Todo lo que <span className="text-gradient-red">quieres saber</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.slice(0, 4).map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl bg-white border-2 border-seoul-black/10 open:border-seoul-red/50 shadow-sm transition-colors"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 md:p-6 text-seoul-black font-bold text-base md:text-lg">
                <span>{f.q}</span>
                <ChevronDown
                  size={20}
                  className="flex-shrink-0 text-seoul-red transition-transform duration-300 group-open:rotate-180"
                />
              </summary>
              <p className="px-5 md:px-6 pb-5 md:pb-6 -mt-1 text-seoul-black/60 leading-relaxed text-sm md:text-base">
                {f.a}
              </p>
            </details>
          ))}
        </div>

        <div className="text-center mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/faq"
            className="inline-flex items-center gap-2 px-7 py-3 border border-seoul-black/15 hover:border-seoul-red text-seoul-black hover:bg-seoul-red/5 font-semibold rounded-lg transition-all duration-300 text-sm"
          >
            Ver todas las preguntas →
          </a>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-7 py-3 bg-seoul-red hover:bg-seoul-red-muted text-white font-semibold rounded-lg transition-all duration-300 text-sm"
          >
            Escríbenos →
          </a>
        </div>
      </div>
    </section>
  );
}
