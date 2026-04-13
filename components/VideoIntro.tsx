'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';

export default function VideoIntro() {
  const ref = useRef(null);

  return (
    <section
      ref={ref}
      className="relative bg-[#0a0a0f] py-24 overflow-hidden"
    >
      {/* Corner glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Vertical center line */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-red-600/20 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-red-500 mb-4">
            Conócenos
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Tu chingu
            <br />
            <span className="text-red-500">coreano 친구</span>
          </h2>
          <p className="mt-6 text-base text-white/60 max-w-lg mx-auto leading-relaxed">
            Soy Jay, tu profe de coreano nacido en Seúl y criado en Santiago.
            Aprende el idioma y la cultura coreana de una manera única y entretenida.
          </p>
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: Video */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-[280px]">
              {/* Outer glow */}
              <div className="absolute -inset-6 bg-gradient-to-br from-red-600/15 to-blue-600/10 rounded-3xl blur-2xl" />

              {/* Video frame */}
              <div
                className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10"
                style={{ paddingTop: '177.78%' }}
              >
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/DqG2nzyViOg?autoplay=0&loop=1&rel=0&modestbranding=1"
                  title="Introducción Academia Seúl — Jay Chingu"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute -bottom-5 -right-5 bg-red-600 text-white rounded-xl px-5 py-3 shadow-xl"
              >
                <div className="text-sm font-black leading-none">🎬 Jay</div>
                <div className="text-xs font-medium opacity-80 mt-1">
                  Tu chingu coreano
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <p className="text-sm text-white/25 tracking-widest">
              안녕하세요, 저는 제이예요 👋
            </p>

            <p className="text-xl text-white/80 leading-relaxed font-medium">
              Nací en Seúl, crecí en Santiago y llevo más de 8 años enseñando
              coreano en Chile.
            </p>

            <p className="text-base text-white/55 leading-relaxed">
              Mi metodología combina conversación real, cultura contemporánea
              — K-pop, K-drama, gastronomía — y la energía única de Corea del Sur.
              No solo aprenderás el idioma, vivirás la cultura entera.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              {[
                { value: '8+', label: 'Años enseñando' },
                { value: '800+', label: 'Estudiantes' },
                { value: '97%', label: 'Satisfacción' },
                { value: '6', label: 'Niveles' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/5 rounded-xl p-4 text-center border border-white/10"
                >
                  <div className="text-2xl font-black text-red-500 leading-none mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/40 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Highlights */}
            <ul className="space-y-3 pt-2">
              {[
                'Nacido en Seúl, criado en Santiago 🇰🇷🇨🇱',
                'Profesor certificado con metodología moderna',
                'Clases presenciales y online disponibles',
                'Preparación oficial para el examen TOPIK',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-red-600/20 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                  </span>
                  <span className="text-white/70 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 mt-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm rounded-lg transition-all duration-300 shadow-lg"
            >
              Quiero mi clase de prueba gratis
              <span>→</span>
            </a>
          </motion.div>
        </div>

        {/* Bottom social strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 flex flex-wrap justify-center gap-4"
        >
          {[
            { emoji: '🎵', label: 'K-pop lover' },
            { emoji: '🎬', label: 'K-drama fan' },
            { emoji: '🇰🇷', label: 'Seúl born' },
            { emoji: '🇨🇱', label: 'Santiago raised' },
            { emoji: '📚', label: 'TOPIK certified' },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white/5 rounded-full px-5 py-2.5 flex items-center gap-2 border border-white/10"
            >
              <span className="text-base">{item.emoji}</span>
              <span className="text-xs font-medium text-white/50 uppercase tracking-wider">{item.label}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
