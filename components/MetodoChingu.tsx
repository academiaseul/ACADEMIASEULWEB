'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const pillars = [
  {
    num: '01',
    korean: '한글',
    title: 'Lee desde el principio',
    desc: 'Nada de romanización eterna. Aprendes a leer 한글 desde tu primera semana, porque leer coreano de verdad cambia cómo aprendes todo lo demás.',
    color: '#3D2EE8',
  },
  {
    num: '02',
    korean: '말하기',
    title: 'Habla desde el día uno',
    desc: 'Cada clase tiene práctica oral real. Te equivocas, te corrigen, vuelves a intentar — así se aprende a hablar, no memorizando tablas.',
    color: '#003478',
  },
  {
    num: '03',
    korean: '문화',
    title: 'Entiende Corea',
    desc: 'No solo qué se dice, sino por qué se dice así. Honoríficos, jerarquía, comida, K-drama: la cultura es parte de la gramática.',
    color: '#D4AF37',
  },
  {
    num: '04',
    korean: '친구',
    title: 'Aprende con tus chingus',
    desc: 'Grupos reducidos y una comunidad que sigue después de clase. Aprender un idioma acompañado es más rápido — y mucho más divertido.',
    color: '#3D2EE8',
  },
];

export default function MetodoChingu() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="metodo" ref={ref} className="relative bg-seoul-black section-padding overflow-hidden">
      {/* Subtle glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(61,46,232,0.18) 0%, transparent 70%)' }}
      />

      <div className="container-tight relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-seoul-red mb-4">
            Método Chingu™
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-seoul-white leading-tight max-w-3xl mx-auto">
            No aprendas coreano como un libro.
            <br />
            <em className="not-italic text-gradient-red">Aprende como un chingu.</em>
          </h2>
          <p className="mt-6 text-base text-white/55 max-w-xl mx-auto leading-relaxed">
            Cuatro pilares, pensados desde el español — no un programa coreano traducido.
          </p>
        </motion.div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-7 hover:border-white/25 transition-colors duration-300"
            >
              <div className="flex items-baseline justify-between mb-5">
                <span className="text-xs font-bold tracking-widest" style={{ color: p.color === '#D4AF37' ? '#E8B84B' : '#8FA3C7' }}>
                  {p.num}
                </span>
                <span className="font-korean text-3xl font-bold text-seoul-white">{p.korean}</span>
              </div>
              <h3 className="text-seoul-white font-bold text-lg mb-3">{p.title}</h3>
              <p className="text-white/55 text-sm leading-relaxed">{p.desc}</p>
              <div className="absolute bottom-0 left-7 right-7 h-px" style={{ backgroundColor: p.color }} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-14 text-center"
        >
          <a
            href="/nivel-1"
            className="inline-flex items-center gap-2 rounded-md bg-seoul-red px-8 py-4 font-semibold text-white shadow-xl shadow-seoul-red/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-seoul-red/40"
          >
            Aprende con el Método Chingu →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
