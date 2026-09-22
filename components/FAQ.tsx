'use client';

import { ChevronDown } from 'lucide-react';
import { useT, i18n } from '@/lib/i18n';

// Las 5 primeras se muestran en la home (faqs.slice(0, 5)) en orden de objeciones:
// "¿necesito saber algo?", "¿cuánto?", "¿a qué hora?", "¿en vivo?", "¿cómo pago?".
// Los textos van marcados con i18n() y se traducen al renderizar con t(f.q) / t(f.a).
export const faqs = [
  {
    q: i18n('¿Necesito saber algo de coreano para empezar?'),
    a: i18n('No. Básico 1 (A1.1) y Coreano para Niños están pensados para empezar desde cero: lo primero que aprendes es a leer el alfabeto (한글). Si ya sabes algo, tienes Básico 2 (A1.2), Conversacional 1 (A2.1) y TOPIK II — haz el test de nivel gratuito o escríbenos y te ayudamos a elegir tu curso.'),
  },
  {
    q: i18n('¿Cuánto cuesta y qué incluye?'),
    a: i18n('Mismo precio en todos los cursos: US$150 el curso completo o 2 cuotas de US$75. Incluye las 8 clases en vivo (60 min), grabaciones, material de estudio, el Lector de Hangul, certificado de Academia Seúl y acceso a la comunidad. El programa completo está en /programa.'),
  },
  {
    q: i18n('¿Qué horarios y fechas hay?'),
    a: i18n('La cohorte parte la semana del 12 de octubre de 2026 y dura 8 semanas (una clase por semana, hora de Chile): Coreano para Niños lunes 18:00 · Básico 1 martes 20:00 o jueves 20:00 · Conversacional 1 martes 21:00 · Básico 2 miércoles 21:00 · TOPIK II jueves 21:00. Conversión rápida: 20:00 Chile = 18:00 Colombia/Perú · 17:00 México · 20:00 Argentina · 19:00 EE.UU. Este (18:00 desde el 1 de noviembre) · 01:00 España (00:00 desde el 25 de octubre). En la página de inscripción eliges tu país y ves la hora exacta.'),
  },
  {
    q: i18n('¿Las clases son en vivo o grabadas?'),
    a: i18n('En vivo por Zoom, en grupos pequeños con cupos limitados. Así resolvemos dudas al momento y corregimos tu pronunciación en tiempo real. Si te pierdes alguna, recibes la grabación en 24 horas y puedes escribirnos para resolver dudas de esa clase.'),
  },
  {
    q: i18n('¿Cómo puedo pagar?'),
    a: i18n('Transferencia bancaria en Chile (sin comisión), tarjeta de crédito/débito vía Mercado Pago (se cobra en pesos chilenos) o PayPal en dólares — también con tarjeta, sin tener cuenta PayPal. Puedes pagar los US$150 de una vez o en 2 cuotas de US$75. Te confirmamos por correo apenas registramos tu pago.'),
  },
  {
    q: i18n('¿Recibo un certificado?'),
    a: i18n('Sí, está incluido en todos los cursos. Al completar tu curso recibes el certificado de Academia Seúl del nivel correspondiente (Básico 1 · A1.1, Básico 2 · A1.2, Conversacional 1 · A2.1, TOPIK II o Niños), en base a tu asistencia y participación. Si tienes el certificado Nivel 1 (cohorte julio 2026), equivale a Básico 1 (A1.1) y te habilita directo para Básico 2.'),
  },
  {
    q: i18n('¿Me sirve para el examen TOPIK?'),
    a: i18n('Sí. Nuestra escalera está alineada con el marco CEFR y el TOPIK: Básico 1 y 2 te llevan al TOPIK I, y el grupo TOPIK II (jueves 21:00 Chile) está enfocado 100% en el examen oficial, con corrección de escritura y simulacros.'),
  },
  {
    q: i18n('¿Desde qué países puedo tomar las clases?'),
    a: i18n('Desde toda Latinoamérica, España y EE.UU. Las clases son 100% online por Zoom; solo necesitas internet y ganas de aprender. Los horarios están en hora de Chile y en la página de inscripción los ves convertidos a tu país.'),
  },
  {
    q: i18n('Fui alumno/a del Nivel 1 en julio, ¿qué curso sigo?'),
    a: i18n('Ese curso hoy se llama Básico 1 (A1.1) y tu certificado equivale a A1.1. Tu siguiente paso es Básico 2 (A1.2) · miércoles 21:00 Chile · con Jay. Si lo que quieres es hablar, también puedes entrar a Conversacional 1 (A2.1) con el test de nivel.'),
  },
];

export default function FAQ() {
  const { t } = useT();
  const whatsappUrl =
    'https://wa.me/56942115562?text=' +
    encodeURIComponent(t('Hola Jay! Vi academiaseul.com y quiero información sobre los cursos de coreano.'));

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
            {t('FAQ · Preguntas frecuentes')}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-seoul-black leading-tight">
            {t('Todo lo que')} <span className="text-gradient-red">{t('quieres saber')}</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.slice(0, 5).map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl bg-white border-2 border-seoul-black/10 open:border-seoul-red/50 shadow-sm transition-colors"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 md:p-6 text-seoul-black font-bold text-base md:text-lg">
                <span>{t(f.q)}</span>
                <ChevronDown
                  size={20}
                  className="flex-shrink-0 text-seoul-red transition-transform duration-300 group-open:rotate-180"
                />
              </summary>
              <p className="px-5 md:px-6 pb-5 md:pb-6 -mt-1 text-seoul-black/60 leading-relaxed text-sm md:text-base">
                {t(f.a)}
              </p>
            </details>
          ))}
        </div>

        <div className="text-center mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/faq"
            className="inline-flex items-center gap-2 px-7 py-3 border border-seoul-black/15 hover:border-seoul-red text-seoul-black hover:bg-seoul-red/5 font-semibold rounded-lg transition-all duration-300 text-sm"
          >
            {t('Ver todas las preguntas →')}
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 bg-seoul-red hover:bg-seoul-red-muted text-white font-semibold rounded-lg transition-all duration-300 text-sm"
          >
            {t('Escríbenos por WhatsApp →')}
          </a>
        </div>
        <p className="mt-6 text-center text-sm">
          <a href="/blog" className="underline underline-offset-4 text-seoul-black/60 hover:text-seoul-red">{t('Cultura coreana en el blog →')}</a>
        </p>
      </div>
    </section>
  );
}
