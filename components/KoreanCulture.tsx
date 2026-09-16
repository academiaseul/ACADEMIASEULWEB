'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useT, i18n } from '@/lib/i18n';

const items = [
  { emoji: '🎭', label: 'K-drama', sub: '드라마', desc: i18n('Entiende cada diálogo sin subtítulos.') },
  { emoji: '🎵', label: 'K-pop',   sub: '케이팝', desc: i18n('Canta en coreano real, no en fonética.') },
  { emoji: '🍜', label: 'K-food',  sub: '음식',   desc: i18n('Pide en coreano como un local.') },
  { emoji: '🏙️', label: i18n('Seúl'), sub: '서울', desc: i18n('Viaja a Corea sin barreras.') },
];

export default function KoreanCulture() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { t } = useT();

  return (
    <section
      id="culture"
      ref={ref}
      className="relative bg-[#F4F7FF] py-20 md:py-28 overflow-hidden"
    >
      {/* Giant decorative Korean char */}
      <div
        aria-hidden
        className="absolute -right-16 top-1/2 -translate-y-1/2 font-black font-korean leading-none text-seoul-black/[0.03] select-none pointer-events-none"
        style={{ fontSize: '40vw' }}
      >
        문
      </div>

      <div className="container-tight relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-seoul-red mb-4">
            {t('Cultura coreana')}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-seoul-black leading-tight">
            {t('El idioma que abre')} <span className="text-gradient-red">{t('un mundo entero')}</span>
          </h2>
          <p className="mt-5 text-base text-seoul-black/55 max-w-lg mx-auto leading-relaxed">
            {t('K-drama, K-pop, gastronomía y Seúl. Aprender coreano es entrar a un universo cultural completo — y en el blog lo exploramos contigo.')}
          </p>
        </motion.div>

        {/* Icon cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="glass-light rounded-xl p-5 text-center flex flex-col items-center gap-2 hover:-translate-y-1 transition-all duration-300"
            >
              <span className="text-3xl">{item.emoji}</span>
              <span className="text-sm font-bold text-seoul-black/80">{t(item.label)}</span>
              <span className="text-xs font-korean text-seoul-black/35">{item.sub}</span>
              <span className="text-[11px] text-seoul-black/50 leading-snug mt-1">{t(item.desc)}</span>
            </motion.div>
          ))}
        </div>

        {/* Blog CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 text-center"
        >
          <a
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-seoul-red hover:bg-seoul-red-muted text-white font-semibold rounded-lg transition-all duration-300 text-sm group"
          >
            {t('Lee el blog de cultura coreana')}
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
