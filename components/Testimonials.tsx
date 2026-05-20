'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe, Languages, GraduationCap, BookOpenCheck, Users, ShieldCheck } from 'lucide-react';

const reasons = [
  {
    icon: Globe,
    title: 'Profesora nativa de Seúl',
    description:
      'Nací en Seúl en 1990 y llegué a Chile a los 10 años. No "hablo coreano" — lo viví desde pequeña. La pronunciación, los matices culturales y los modismos son parte de mi día a día.',
    color: '#C8001E',
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
    title: 'Método Chingu™',
    description:
      'Diseñado específicamente para hispanohablantes. No es un programa coreano traducido — es un enfoque pensado desde el español, con metáforas y referencias que sí entiendes.',
    color: '#C8001E',
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
    title: 'Garantía y transparencia',
    description:
      'Si después de la primera semana sientes que no es para ti, devolvemos el 100%. Cero letra chica. Cero atadura. Si vienes, es porque quieres estar.',
    color: '#D4AF37',
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative bg-seoul-black section-padding overflow-hidden"
    >
      {/* Corner glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-seoul-red/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-seoul-blue/5 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle hangul watermark */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[18rem] font-black text-white/[0.015] leading-none select-none pointer-events-none font-korean"
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
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-seoul-white leading-tight max-w-3xl mx-auto">
            Lo que nos hace
            <br />
            <span className="text-gradient-red">diferentes</span>
          </h2>
          <p className="mt-6 text-white/50 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Academia Seúl recién abre sus puertas. No tenemos cientos de testimonios todavía
            — tenemos algo mejor: una propuesta honesta de quién soy y cómo voy a enseñarte.
          </p>
        </motion.div>

        {/* Jay bio card destacado */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative glass rounded-2xl p-8 md:p-12 mb-12 overflow-hidden"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 20% 20%, rgba(200,0,30,0.12) 0%, transparent 60%), rgba(255,255,255,0.02)',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.06)',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative z-10">
            {/* Jay info */}
            <div className="md:col-span-1 text-center md:text-left">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-seoul-red text-white font-black text-3xl mb-4 border-2 border-white/10">
                {'JC'}
              </div>
              <div className="text-2xl font-bold text-seoul-white">Jay Chingu</div>
              <div className="text-sm font-korean text-white/50 mt-1">{'제이 친구'}</div>
              <div className="text-xs uppercase tracking-widest text-seoul-red mt-3 font-semibold">
                Fundadora · Profesora
              </div>
            </div>

            {/* Story */}
            <div className="md:col-span-2 space-y-3">
              <p className="text-base md:text-lg text-seoul-white/85 leading-relaxed">
                <span className="font-korean">{'안녕'}</span>, soy Jay. Nací en Seúl, llegué a
                Chile a los 10 años, y crecí entre kimchi y empanadas — entre{' '}
                <span className="font-korean">{'한글'}</span> y español.
              </p>
              <p className="text-sm text-white/55 leading-relaxed">
                De día soy gerente en una empresa coreana de genómica en Las Condes. De noche
                hago lo que más amo: enseñar mi idioma a quienes lo aprenden por amor a la
                cultura. Academia Seúl nació para construir el puente que yo no tuve a los 10.
              </p>
              <div className="pt-3 flex flex-wrap gap-2">
                {[
                  '🇰🇷 Nativa de Seúl',
                  '🇨🇱 Bilingüe español',
                  '8+ años enseñando',
                  'Método Chingu™',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-semibold text-white/70 bg-white/[0.04] border border-white/10 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Grid de razones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
                className="relative glass rounded-2xl p-7 flex flex-col gap-4 hover:translate-y-[-4px] transition-transform duration-300"
                style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.06)' }}
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
                <h3 className="text-lg font-bold text-seoul-white leading-tight">
                  {reason.title}
                </h3>
                <p className="text-sm text-white/55 leading-relaxed flex-1">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 text-center"
        >
          <p className="text-white/40 text-sm mb-5">
            La mejor forma de conocerme: el taller gratuito del 7 de junio.
          </p>
          <a
            href="/taller"
            className="inline-flex items-center gap-2 px-8 py-4 bg-seoul-red hover:bg-seoul-red-muted text-white font-semibold rounded-lg transition-all duration-300 text-sm group"
          >
            Conoce el método en vivo (gratis)
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
