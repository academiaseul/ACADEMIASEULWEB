import { ChevronDown } from 'lucide-react';

// Las 4 primeras se muestran en la home (faqs.slice(0, 4)): responden en orden
// "¿qué curso?", "¿cuánto?", "¿cómo pago?", "¿a qué hora?".
export const faqs = [
  {
    q: '¿Necesito saber algo de coreano para empezar?',
    a: 'No. Básico 1 (A1.1) y Coreano para Niños están pensados para empezar desde cero: lo primero que aprendes es a leer el alfabeto (한글). Si ya sabes algo, tienes Básico 2 (A1.2), Conversacional 1 (A2.1) y TOPIK II — haz el test de nivel gratuito o escríbenos y te ubicamos en 5 minutos.',
  },
  {
    q: '¿Cuánto cuesta y qué incluye?',
    a: 'Mismo precio en todos los cursos: US$150 el curso completo o 2 cuotas de US$75. Incluye las 8 clases en vivo (60 min), grabaciones, material de estudio, el Lector de Hangul, certificado de Academia Seúl y acceso a la comunidad. El programa completo está en /programa.',
  },
  {
    q: '¿Cómo puedo pagar?',
    a: 'Transferencia bancaria en Chile (sin comisión), tarjeta de crédito/débito vía Mercado Pago (se cobra en pesos chilenos) o PayPal en dólares — también con tarjeta, sin tener cuenta PayPal. Puedes pagar los US$150 de una vez o en 2 cuotas de US$75. Te confirmamos por correo apenas registramos tu pago.',
  },
  {
    q: '¿Qué horarios y fechas hay?',
    a: 'La cohorte parte la semana del 5 de octubre de 2026 y dura 8 semanas (una clase por semana, hora de Chile): Coreano para Niños lunes 18:00 · Básico 1 martes 20:00 o jueves 20:00 · Conversacional 1 martes 21:00 · Básico 2 miércoles 21:00 · TOPIK II jueves 21:00. Conversión rápida: 20:00 Chile = 18:00 Colombia/Perú · 17:00 México · 20:00 Argentina · 19:00 EE.UU. Este · 01:00 España. En la página de inscripción eliges tu país y ves la hora exacta.',
  },
  {
    q: '¿Las clases son en vivo o grabadas?',
    a: 'En vivo por Zoom, en grupos pequeños con cupos limitados. Así resolvemos dudas al momento y corregimos tu pronunciación en tiempo real. Si te pierdes alguna, recibes la grabación en 24 horas y puedes escribirnos para resolver dudas de esa clase.',
  },
  {
    q: 'Fui alumno/a del Nivel 1 en julio, ¿qué curso sigo?',
    a: 'Ese curso hoy se llama Básico 1 (A1.1) y tu certificado equivale a A1.1. Tu siguiente paso es Básico 2 (A1.2) · miércoles 21:00 Chile · con Jay. Si lo que quieres es hablar, también puedes entrar a Conversacional 1 (A2.1) con el test de nivel.',
  },
  {
    q: '¿Me sirve para el examen TOPIK?',
    a: 'Sí. Nuestra escalera está alineada con el marco CEFR y el TOPIK: Básico 1 y 2 te llevan al TOPIK I, y el grupo TOPIK II (jueves 21:00 Chile) está enfocado 100% en el examen oficial, con corrección de escritura y simulacros.',
  },
  {
    q: '¿Desde qué países puedo tomar las clases?',
    a: 'Desde toda Latinoamérica, España y EE.UU. Las clases son 100% online por Zoom; solo necesitas internet y ganas de aprender. Los horarios están en hora de Chile y en la página de inscripción los ves convertidos a tu país.',
  },
  {
    q: '¿Recibo un certificado?',
    a: 'Sí, está incluido en todos los cursos. Al completar tu curso recibes el certificado de Academia Seúl del nivel correspondiente (Básico 1 · A1.1, Básico 2 · A1.2, Conversacional 1 · A2.1, TOPIK II o Niños), en base a tu asistencia y participación. Si tienes el certificado Nivel 1 (cohorte julio 2026), equivale a Básico 1 (A1.1) y te habilita directo para Básico 2.',
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
            href="https://wa.me/56942115562?text=Hola%20Jay!%20Vi%20academiaseul.com%20y%20quiero%20informaci%C3%B3n%20sobre%20los%20cursos%20de%20coreano."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 bg-seoul-red hover:bg-seoul-red-muted text-white font-semibold rounded-lg transition-all duration-300 text-sm"
          >
            Escríbenos por WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
}
