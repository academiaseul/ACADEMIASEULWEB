import { ChevronDown } from 'lucide-react';

export const faqs = [
  {
    q: '¿Necesito saber algo de coreano para empezar?',
    a: 'No. Básico 1 (A1.1) y Coreano para Niños están pensados para empezar desde cero: lo primero que aprenderás es a leer el alfabeto (한글). Si ya sabes algo, tenemos Básico 2, Conversacional A2.1 y Preparación TOPIK II — haz el test de nivel gratuito o escríbenos y te orientamos.',
  },
  {
    q: '¿Las clases son en vivo o grabadas?',
    a: 'En vivo por Zoom, en grupos pequeños con cupos limitados. Así resolvemos dudas al momento y corregimos tu pronunciación en tiempo real. Si faltas, te apoyamos con material para ponerte al día.',
  },
  {
    q: '¿Cuánto cuesta y qué incluye?',
    a: 'Todos los cursos cuestan lo mismo: US$150 en pago único o US$75/mes durante 2 meses. Incluye las 8 clases en vivo (60 min), grabaciones, material de estudio, el Lector de Hangul, certificado de Academia Seúl y acceso a la comunidad. El programa completo está en /programa.',
  },
  {
    q: '¿Qué horarios y fechas hay?',
    a: 'La cohorte parte la semana del 5 de octubre de 2026 y dura 8 semanas (una clase por semana, hora de Chile): Coreano para Niños lunes 18:00 · Básico 1 martes 20:00 o jueves 20:00 · Conversacional A2.1 martes 21:00 · Básico 2 miércoles 21:00 · TOPIK II jueves 21:00. En la página de inscripción hay una tabla con la hora exacta para México, Colombia, Perú, Argentina, EE.UU. y España.',
  },
  {
    q: '¿Me sirve para el examen TOPIK?',
    a: 'Sí. Nuestra escalera está alineada con el marco CEFR y el TOPIK: Básico 1 y 2 te llevan al TOPIK I, y el grupo de Preparación TOPIK II (jueves 21:00 Chile) está enfocado 100% en el examen oficial, con corrección de escritura y simulacros.',
  },
  {
    q: '¿Desde qué países puedo tomar las clases?',
    a: 'Desde toda Latinoamérica, España y EE.UU. Las clases son 100% online por Zoom; solo necesitas internet y ganas de aprender. Los horarios están en hora de Chile y publicamos la conversión a cada país.',
  },
  {
    q: '¿Cómo puedo pagar?',
    a: 'Tarjeta de crédito/débito vía Mercado Pago (se cobra en pesos chilenos), PayPal en dólares (también con tarjeta sin cuenta PayPal) o transferencia bancaria en Chile sin comisión. Puedes pagar los US$150 de una vez o en 2 cuotas mensuales de US$75. Te confirmamos por correo apenas registramos tu pago.',
  },
  {
    q: '¿Recibo un certificado?',
    a: 'Sí, está incluido en todos los cursos. Al completar tu curso recibes el certificado de Academia Seúl del nivel correspondiente (A1.1, A1.2, A2.1 o TOPIK II), en base a tu asistencia y participación.',
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
