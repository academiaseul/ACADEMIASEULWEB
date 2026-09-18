'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useT, i18n } from '@/lib/i18n';

const testimonials = [
  {
    name: 'Isidora Figueroa',
    level: i18n('Nivel A1'),
    course: i18n('Coreano Básico'),
    initials: 'IF',
    color: '#3D2EE8',
    quote:
      i18n('Para mí fue un gran profesor. Le entendí muy bien y era bueno explicando. Si alguien no entendía, volvía a explicar. Sus clases eran muy divertidas y aprendimos muchas cosas sobre la cultura coreana.'),
  },
  {
    name: 'Nedielka Curkovic',
    level: i18n('Básico 2 (A1.2)'),
    course: i18n('Coreano Básico'),
    initials: 'NC',
    color: '#003478',
    quote:
      i18n('Las clases son bastante entretenidas porque, más que pasar solo contenido, también nos enseña otras cosas. Cuando le preguntamos un concepto, nos cuenta una pequeña historia relacionada — así lo recuerdo más fácilmente.'),
  },
  {
    name: 'Carolina Morales',
    level: i18n('Nivel B1'),
    course: i18n('Coreano Intermedio'),
    initials: 'CM',
    color: '#D4AF37',
    quote:
      i18n('Excelente profesor. Siempre disponible para responder dudas dentro y fuera del horario de clases, además de explicar hasta que se entienda. Las clases son divertidas y entendibles. ¡Gracias, profesor!'),
  },
  {
    name: 'Catalina Saavedra',
    level: i18n('Básico 2 (A1.2)'),
    course: i18n('Coreano Básico'),
    initials: 'CS',
    color: '#3D2EE8',
    quote:
      i18n('Muy buen profesor, sus explicaciones son muy claras y siempre da distintos ejemplos. Además nos enseña sobre cultura y cosas típicas de Corea. También enseña con música, lo cual facilita mucho el oído y la pronunciación correcta.'),
  },
  {
    name: 'Paulina Cerda',
    level: i18n('Nivel B1'),
    course: i18n('Coreano Intermedio'),
    initials: 'PC',
    color: '#003478',
    quote:
      i18n('Clases claras y didácticas, con entrega de material adecuado para el estudio. Se agradece el esfuerzo para fomentar la participación en clases y explicar reiteradamente en caso de dudas, además de la disposición para resolver dudas fuera del horario.'),
  },
  {
    name: 'Mariam',
    level: i18n('Nivel A1'),
    course: i18n('Coreano Básico'),
    initials: 'MA',
    color: '#D4AF37',
    quote:
      i18n('Jae Hee tiene muy buena disposición cuando alguien tiene una duda, complementa sus clases con cultura general y se dan espacios de confianza donde se pueden compartir experiencias.'),
  },
  {
    name: 'Valentina San Martín',
    level: i18n('Nivel A1'),
    course: i18n('Coreano Básico'),
    initials: 'VS',
    color: '#3D2EE8',
    quote:
      i18n('Fue entretenido y entendí muy bien las clases. Tiene mucha paciencia y hace agradable el aprender.'),
  },
];

function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(0);
  const total = testimonials.length;
  const { t } = useT();

  const go = (d: number) => {
    setDir(d);
    setIndex((prev) => (prev + d + total) % total);
  };

  const item = testimonials[index];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative flex items-center gap-3 md:gap-5">
        {/* Prev */}
        <button
          onClick={() => go(-1)}
          aria-label={t('Anterior')}
          className="flex-shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-full bg-black/[0.06] border border-black/10 text-seoul-black/70 hover:text-white hover:bg-seoul-red hover:border-seoul-red flex items-center justify-center transition-all duration-200"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Card */}
        <div className="relative flex-1 overflow-hidden min-h-[300px] sm:min-h-[260px]">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={index}
              custom={dir}
              initial={{ opacity: 0, x: dir >= 0 ? 60 : -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir >= 0 ? -60 : 60 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="glass-light rounded-2xl p-7 md:p-9 flex flex-col gap-5"
              style={{ boxShadow: '0 6px 24px rgba(10,10,40,0.06)' }}
            >
              <Quote size={32} className="text-seoul-red/40" strokeWidth={2.5} />
              <p className="text-base md:text-lg text-seoul-black/80 leading-relaxed italic flex-1">
                &ldquo;{t(item.quote)}&rdquo;
              </p>
              <div className="pt-4 border-t border-black/[0.06] flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm border-2 border-black/10"
                  style={{ background: item.color }}
                >
                  {item.initials}
                </div>
                <div>
                  <div className="text-sm md:text-base font-bold text-seoul-black leading-tight">
                    {item.name}
                  </div>
                  <div className="text-[11px] md:text-xs text-seoul-black/40 mt-0.5">
                    {t(item.course)} · {t(item.level)}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next */}
        <button
          onClick={() => go(1)}
          aria-label={t('Siguiente')}
          className="flex-shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-full bg-black/[0.06] border border-black/10 text-seoul-black/70 hover:text-white hover:bg-seoul-red hover:border-seoul-red flex items-center justify-center transition-all duration-200"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-7">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDir(i > index ? 1 : -1);
              setIndex(i);
            }}
            aria-label={t('Testimonio {n}', { n: i + 1 })}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? 'w-7 bg-seoul-red' : 'w-2 bg-seoul-black/20 hover:bg-seoul-black/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useT();
  const wa = 'https://wa.me/56942115562?text=' + encodeURIComponent(t('Hola Jay! Vi academiaseul.com y quiero información sobre los cursos de coreano.'));

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative bg-[#F4F7FF] section-padding overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-96 h-96 bg-seoul-red/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-seoul-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div
        aria-hidden
        className="absolute left-1/2 top-1/4 -translate-x-1/2 text-[18rem] font-black text-seoul-black/[0.015] leading-none select-none pointer-events-none font-korean"
      >
        {'신뢰'}
      </div>

      <div className="container-tight relative z-10">
        {/* Header: solo prueba social real */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-seoul-red mb-4">
            {t('Estudiantes reales')}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-seoul-black leading-tight">
            {t('Lo que dicen')} <span className="text-gradient-red">{t('mis chingus')}</span>
          </h2>
          <p className="mt-5 text-seoul-black/50 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            {t('Testimonios reales de estudiantes que tomé en mis clases anteriores. La misma energía y metodología llega ahora a Academia Seúl.')}
          </p>
        </motion.div>

        <TestimonialsCarousel />

        {/* Cierre: inscribirse o preguntar primero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 text-center"
        >
          <p className="text-seoul-black/50 text-sm mb-5">
            {t('La mejor forma de conocer nuestro método: una clase en vivo.')}
          </p>
          <a
            href="/nivel-1#clases"
            className="inline-flex items-center gap-2 px-8 py-4 bg-seoul-red hover:bg-[#2C1FB0] text-white font-semibold rounded-lg shadow-xl shadow-seoul-red/25 transition-all duration-300 group"
          >
            {t('Inscribirme · Octubre 2026 →')}
          </a>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block text-sm text-seoul-black/60 underline underline-offset-4 hover:text-seoul-red"
          >
            {t('¿Prefieres preguntar primero? Escríbele a Jay por WhatsApp →')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
