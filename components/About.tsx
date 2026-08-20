'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const stats = [
  { value: '🇰🇷',     label: 'Profesor nativo de Seúl',  sublabel: 'Bilingüe coreano-español' },
  { value: '8',        label: 'Años enseñando coreano',    sublabel: 'Experiencia comprobada',     suffix: '+' },
  { value: 'Chingu™',  label: 'Método propio',             sublabel: 'Diseñado para hispanohablantes' },
  { value: '6',        label: 'Cursos diseñados',          sublabel: 'Del A1 al C2 + especializados' },
];

function StatCard({ value, label, sublabel, suffix, index }: (typeof stats)[0] & { index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="text-center md:text-left"
    >
      <div className="text-5xl md:text-6xl font-black tracking-tighter text-gradient-red mb-2">
        {value}{suffix || ''}
      </div>
      <div className="text-sm text-seoul-black/60 uppercase tracking-widest font-medium">
        {label}
      </div>
      {sublabel && (
        <div className="text-xs text-seoul-black/40 mt-1 font-medium normal-case tracking-normal">
          {sublabel}
        </div>
      )}
    </motion.div>
  );
}

export default function About() {
  const ref  = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={ref}
      className="relative bg-white section-padding overflow-hidden"
    >
      {/* Subtle hangul watermark */}
      <div
        aria-hidden
        className="absolute right-0 top-1/2 -translate-y-1/2 text-[22rem] font-black text-seoul-black/[0.025] leading-none select-none pointer-events-none font-korean"
        style={{ writingMode: 'vertical-rl' }}
      >
        한국어
      </div>

      <div className="container-tight relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-seoul-red mb-4">
            Sobre la academia
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-seoul-black leading-tight max-w-2xl">
            Donde el idioma
            <br />
            <em className="not-italic text-gradient-red">encuentra su hogar</em>
          </h2>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000&q=85&auto=format&fit=crop"
                alt="Estudiantes de coreano en Academia Seúl, Santiago de Chile"
                fill
                className="object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-seoul-red/20 to-transparent" />
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-6 -right-6 bg-seoul-red text-white rounded-xl px-6 py-4 shadow-xl shadow-seoul-red/30"
            >
              <div className="text-3xl font-black leading-none">8+</div>
              <div className="text-xs font-medium opacity-80 mt-1">
                años enseñando coreano<br />a hispanohablantes
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Story */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <p className="text-xl text-seoul-black/80 leading-relaxed font-medium">
              Nacimos del amor por la cultura coreana y la convicción de que aprender
              un idioma es una de las experiencias más transformadoras de la vida.
            </p>
            <p className="text-base text-seoul-black/60 leading-relaxed">
              Una nueva forma de aprender coreano desde Latinoamérica: profesores
              nativos formados en Seúl, materiales creados para hispanohablantes y una
              metodología que combina conversación real, cultura contemporánea y
              preparación académica.
            </p>
            <p className="text-base text-seoul-black/60 leading-relaxed">
              Aquí no solo aprendes un idioma — descubres una cultura entera: K-dramas,
              K-pop, gastronomía, historia y la energía única de Corea del Sur.
            </p>

            {/* Highlights */}
            <ul className="space-y-3 pt-4">
              {[
                'Profesores nativos certificados de Seúl',
                'Grupos reducidos: máximo 15 estudiantes',
                'Metodología comunicativa + cultural',
                'Preparación oficial para el examen TOPIK',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-seoul-red/10 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-seoul-red" />
                  </span>
                  <span className="text-seoul-black/70 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <a
              href="/sobre"
              className="inline-flex items-center gap-2 mt-2 px-6 py-3 bg-seoul-black text-seoul-white font-semibold text-sm rounded-lg hover:bg-seoul-red transition-all duration-300 group"
            >
              Conoce nuestra historia
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </a>
          </motion.div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-seoul-black/10">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
