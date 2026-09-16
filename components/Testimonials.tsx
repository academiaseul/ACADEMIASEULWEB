'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Languages,
  GraduationCap,
  BookOpenCheck,
  Users,
  ShieldCheck,
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const reasons = [
  {
    icon: Globe,
    title: 'Profesor nativo de Seúl',
    description:
      'Nací en Seúl en 1990 y llegué a Chile a los 10 años. No "hablo coreano" — lo viví desde pequeño. La pronunciación, los matices culturales y los modismos son parte de mi día a día.',
    color: '#3D2EE8',
  },
  {
    icon: Languages,
    title: 'Bilingüe perfecto coreano-español',
    description:
      'Crucé los dos idiomas durante 25+ años. Conozco exactamente dónde se traba un hispanohablante con el coreano — y cómo destrabarlo en minutos, no en años.',
    color: '#003478',
  },
  {
    icon: GraduationCap,
    title: '8+ años enseñando coreano',
    description:
      'No es mi primer rodeo. Llevo años enseñando coreano formal e informalmente a estudiantes chilenos y latinoamericanos. Cada error que cometes, ya lo he visto antes.',
    color: '#D4AF37',
  },
  {
    icon: BookOpenCheck,
    title: 'Método Chingu',
    description:
      'Diseñado específicamente para hispanohablantes. No es un programa coreano traducido — es un enfoque pensado desde el español, con metáforas y referencias que sí entiendes.',
    color: '#3D2EE8',
  },
  {
    icon: Users,
    title: 'Grupos con cupos limitados',
    description:
      'No saturamos las cohortes. Grupos pequeños para que cada Chingu reciba atención personal, dudas resueltas en vivo y feedback de pronunciación real.',
    color: '#003478',
  },
  {
    icon: ShieldCheck,
    title: 'Certificado por participación',
    description:
      'Certificado incluido en todos los cursos. Al terminar recibes el certificado de Academia Seúl de tu nivel (Básico 1 · A1.1, Básico 2 · A1.2, Conversacional 1 · A2.1, TOPIK II o Niños), por asistencia y participación.',
    color: '#D4AF37',
  },
];

const testimonials = [
  {
    name: 'Isidora Figueroa',
    level: 'Nivel A1',
    course: 'Coreano Básico',
    initials: 'IF',
    color: '#3D2EE8',
    quote:
      'Para mí fue un gran profesor. Le entendí muy bien y era bueno explicando. Si alguien no entendía, volvía a explicar. Sus clases eran muy divertidas y aprendimos muchas cosas sobre la cultura coreana.',
  },
  {
    name: 'Nedielka Curkovic',
    level: 'Básico 2 (A1.2)',
    course: 'Coreano Básico',
    initials: 'NC',
    color: '#003478',
    quote:
      'Las clases son bastante entretenidas porque, más que pasar solo contenido, también nos enseña otras cosas. Cuando le preguntamos un concepto, nos cuenta una pequeña historia relacionada — así lo recuerdo más fácilmente.',
  },
  {
    name: 'Carolina Morales',
    level: 'Nivel B1',
    course: 'Coreano Intermedio',
    initials: 'CM',
    color: '#D4AF37',
    quote:
      'Excelente profesor. Siempre disponible para responder dudas dentro y fuera del horario de clases, además de explicar hasta que se entienda. Las clases son divertidas y entendibles. ¡Gracias, profesor!',
  },
  {
    name: 'Catalina Saavedra',
    level: 'Básico 2 (A1.2)',
    course: 'Coreano Básico',
    initials: 'CS',
    color: '#3D2EE8',
    quote:
      'Muy buen profesor, sus explicaciones son muy claras y siempre da distintos ejemplos. Además nos enseña sobre cultura y cosas típicas de Corea. También enseña con música, lo cual facilita mucho el oído y la pronunciación correcta.',
  },
  {
    name: 'Paulina Cerda',
    level: 'Nivel B1',
    course: 'Coreano Intermedio',
    initials: 'PC',
    color: '#003478',
    quote:
      'Clases claras y didácticas, con entrega de material adecuado para el estudio. Se agradece el esfuerzo para fomentar la participación en clases y explicar reiteradamente en caso de dudas, además de la disposición para resolver dudas fuera del horario.',
  },
  {
    name: 'Mariam',
    level: 'Nivel A1',
    course: 'Coreano Básico',
    initials: 'MA',
    color: '#D4AF37',
    quote:
      'Jae Hee tiene muy buena disposición cuando alguien tiene una duda, complementa sus clases con cultura general y se dan espacios de confianza donde se pueden compartir experiencias.',
  },
  {
    name: 'Valentina San Martín',
    level: 'Nivel A1',
    course: 'Coreano Básico',
    initials: 'VS',
    color: '#3D2EE8',
    quote:
      'Fue entretenido y entendí muy bien las clases. Tiene mucha paciencia y hace agradable el aprender.',
  },
];

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={12} className="fill-seoul-gold text-seoul-gold" />
      ))}
    </div>
  );
}

function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(0);
  const total = testimonials.length;

  const go = (d: number) => {
    setDir(d);
    setIndex((prev) => (prev + d + total) % total);
  };

  const t = testimonials[index];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative flex items-center gap-3 md:gap-5">
        {/* Prev */}
        <button
          onClick={() => go(-1)}
          aria-label="Anterior"
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
              <div className="flex items-center justify-between">
                <Quote size={32} className="text-seoul-red/40" strokeWidth={2.5} />
                <StarRating />
              </div>
              <p className="text-base md:text-lg text-seoul-black/80 leading-relaxed italic flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="pt-4 border-t border-black/[0.06] flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm border-2 border-black/10"
                  style={{ background: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm md:text-base font-bold text-seoul-black leading-tight">
                    {t.name}
                  </div>
                  <div className="text-[11px] md:text-xs text-seoul-black/40 mt-0.5">
                    {t.course} · {t.level}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next */}
        <button
          onClick={() => go(1)}
          aria-label="Siguiente"
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
            aria-label={`Testimonio ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? 'w-7 bg-seoul-red' : 'w-2 bg-black/15 hover:bg-black/30'
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

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative bg-white section-padding overflow-hidden"
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-seoul-red mb-4">
            Por qué Academia Seúl
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-seoul-black leading-tight max-w-3xl mx-auto">
            Lo que nos hace
            <br />
            <span className="text-gradient-red">diferentes</span>
          </h2>
          <p className="mt-6 text-seoul-black/50 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            8+ años enseñando coreano, una metodología probada y la energía
            de una comunidad real.
          </p>
        </motion.div>

        {/* 김재희 bio card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative glass-light rounded-2xl p-8 md:p-12 mb-12 overflow-hidden"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 20% 20%, rgba(61, 46, 232,0.12) 0%, transparent 60%), rgba(255,255,255,0.02)',
            boxShadow: '0 6px 24px rgba(10,10,40,0.06)',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative z-10">
            <div className="md:col-span-1 text-center md:text-left">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-seoul-red text-white font-black text-2xl mb-4 border-2 border-black/10 font-korean">
                {'김재희'}
              </div>
              <div className="text-2xl font-bold text-seoul-black font-korean">{'김재희'}</div>
              <div className="text-sm text-seoul-black/60 mt-1">Jay Chingu</div>
              <div className="text-xs uppercase tracking-widest text-seoul-red mt-3 font-semibold">
                Fundador y profesor
              </div>
            </div>

            <div className="md:col-span-2 space-y-3">
              <p className="text-base md:text-lg text-seoul-black/85 leading-relaxed">
                <span className="font-korean">{'안녕하세요'}</span>, soy{' '}
                <span className="font-korean font-bold">{'김재희'}</span> — mejor conocido como Jay. Nací en Seúl, llegué a
                Chile a los 10 años, y crecí entre kimchi y empanadas — entre{' '}
                <span className="font-korean">{'한글'}</span> y español.
              </p>
              <p className="text-sm text-seoul-black/55 leading-relaxed">
                De día soy gerente en una empresa coreana de genómica en Las Condes. De noche
                hago lo que más amo: enseñar mi idioma a quienes lo aprenden por amor a la
                cultura. Academia Seúl nació para construir el puente que yo no tuve a los 10.
              </p>
              <div className="pt-3 flex flex-wrap gap-2">
                {[
                  'Nativo de Seúl',
                  'Bilingüe español',
                  '8+ años enseñando',
                  'Método Chingu',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-semibold text-seoul-black/70 bg-black/[0.04] border border-black/10 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href="/sobre"
                className="inline-block mt-5 text-sm font-bold text-seoul-red hover:text-[#818CF8] transition-colors"
              >
                Lee mi historia →
              </a>
            </div>
          </div>
        </motion.div>

        {/* Razones grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + (i % 3) * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative glass-light rounded-2xl p-7 flex flex-col gap-4 hover:translate-y-[-4px] transition-transform duration-300"
                style={{ boxShadow: '0 6px 24px rgba(10,10,40,0.06)' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${reason.color}20`,
                    border: `1px solid ${reason.color}30`,
                  }}
                >
                  <Icon size={22} style={{ color: reason.color }} />
                </div>
                <h3 className="text-lg font-bold text-seoul-black leading-tight">
                  {reason.title}
                </h3>
                <p className="text-sm text-seoul-black/55 leading-relaxed flex-1">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA principal (despues de las razones) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <p className="text-seoul-black/40 text-sm mb-5">
            La mejor forma de conocer nuestro método: una clase en vivo.
          </p>
          <a
            href="/nivel-1#clases"
            className="inline-flex items-center gap-2 px-8 py-4 bg-seoul-red hover:bg-seoul-red-muted text-white font-semibold rounded-lg transition-all duration-300 text-sm group"
          >
            Inscribirme · Octubre 2026
            <span className="group-hover:translate-x-1 transition-transform duration-200">{'->'}</span>
          </a>
        </motion.div>

        {/* Testimonios reales DEBAJO del CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-seoul-red mb-4">
            Estudiantes reales
          </span>
          <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-seoul-black leading-tight">
            Lo que dicen <span className="text-gradient-red">mis chingus</span>
          </h3>
          <p className="mt-4 text-seoul-black/50 text-base max-w-xl mx-auto leading-relaxed">
            Testimonios reales de estudiantes que tomé en mis clases anteriores.
            La misma energía y metodología llega ahora a Academia Seúl.
          </p>
        </motion.div>

        <TestimonialsCarousel />
      </div>
    </section>
  );
}
