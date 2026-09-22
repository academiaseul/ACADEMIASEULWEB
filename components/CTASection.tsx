'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useT } from '@/lib/i18n';
import { precioLabel } from '@/lib/nivel1';

export default function CTASection() {
  const { t } = useT();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#F4F7FF]"
    >
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY }}
      >
        {/* Animated gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 50%, #3D2EE81f 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 20% 80%, #00347814 0%, transparent 60%)',
          }}
        />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: [
              'linear-gradient(rgba(61, 46, 232,0.08) 1px, transparent 1px)',
              'linear-gradient(90deg, rgba(61, 46, 232,0.08) 1px, transparent 1px)',
            ].join(', '),
            backgroundSize: '80px 80px',
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container-tight py-32 md:py-44 text-center">
        {/* Korean text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl font-korean font-black text-seoul-black/10 mb-6 tracking-widest"
          aria-hidden
        >
          지금 시작하세요
        </motion.div>

        {/* Main headline */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl text-seoul-black leading-tight mb-6"
        >
          {t('¿Listo para hablar')}
          <br />
          <span className="text-gradient-red">{t('coreano de verdad?')}</span>
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-base md:text-lg text-seoul-black/65 max-w-lg mx-auto leading-relaxed mb-4"
        >
          {t('Clases en vivo desde la semana del 12 de octubre · 8 semanas · certificado incluido. US$150 el curso completo · o 2 cuotas de US$75.')}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="font-bold text-seoul-black/80 mb-12"
        >
          {t('La matrícula cierra el domingo 11 de octubre.')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center"
        >
          <a
            href="/nivel-1#clases"
            className="group relative text-center px-10 py-4 bg-seoul-red text-white font-bold text-base rounded-lg hover:bg-[#2C1FB0] transition-all duration-300 shadow-2xl shadow-seoul-red/30 hover:shadow-seoul-red/50 hover:-translate-y-0.5"
          >
            <span className="relative z-10">
              {t('Inscribirme · Octubre 2026 →')}
            </span>
          </a>
          <a
            href="/test-nivel"
            className="text-center px-10 py-4 border border-black/15 hover:border-black/30 text-seoul-black/70 hover:text-seoul-black font-medium text-base rounded-lg transition-all duration-300 hover:bg-black/5"
          >
            {t('Hacer el test de nivel gratis')}
          </a>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 flex flex-col sm:flex-row sm:flex-wrap gap-6 justify-center items-center"
        >
          {[
            '✓ ' + t(precioLabel()),
            t('✓ Grabación de cada clase en 24 h'),
            t('✓ Máx. 15 alumnos (8 en TOPIK II · 12 en Niños)'),
            t('✓ Certificado incluido'),
          ].map((item) => (
            <span key={item} className="text-sm text-seoul-black/55 font-medium">
              {item}
            </span>
          ))}
        </motion.div>

        {/* Decorative hangul */}
        <div
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 bottom-0 font-black font-korean text-seoul-black/[0.015] leading-none select-none pointer-events-none"
          style={{ fontSize: '32vw', lineHeight: 0.8 }}
        >
          서울
        </div>
      </div>
    </section>
  );
}
