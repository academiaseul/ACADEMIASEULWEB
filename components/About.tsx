'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useT, Tr } from '@/lib/i18n';

// Historia del fundador en un solo bloque: video de presentación (antes VideoIntro) + bio de Jay
// (antes en Testimonials) + el equipo. Sustituye la foto de stock y el texto genérico "Sobre la academia".
export default function About() {
  const ref  = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useT();

  const tags = [t('Nativo de Seúl'), t('Bilingüe español'), t('8+ años enseñando'), 'Método Chingu™'];

  return (
    <section
      id="about"
      ref={ref}
      className="relative bg-white section-padding overflow-hidden"
    >
      {/* Ancla de seguridad: el antiguo bloque de video vivía en #teacher */}
      <span id="teacher" className="absolute -top-24" aria-hidden />

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
          className="mb-12 md:mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-seoul-red mb-4">
            {t('Tu chingu coreano')}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-seoul-black leading-tight max-w-4xl">
            {t('Un profe de Seúl que llegó a Chile a los 10')}
            <br />
            <em className="not-italic text-gradient-red">{t('y te explica el coreano desde tu español.')}</em>
          </h2>
        </motion.div>

        {/* Main grid: video (izquierda) + historia (derecha) */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-12 lg:gap-20 items-center">
          {/* Left: Jay's intro video (9:16) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-[260px] sm:w-[300px]"
          >
            <div className="relative">
            <div className="relative aspect-[9/16] rounded-[28px] overflow-hidden shadow-2xl ring-1 ring-black/10 bg-seoul-black">
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube-nocookie.com/embed/DqG2nzyViOg"
                title={t('Jay se presenta')}
                loading="lazy"
                allow="accelerometer; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-5 -right-2 sm:-right-6 bg-seoul-red text-white rounded-xl px-5 py-3 shadow-xl shadow-seoul-red/30"
            >
              <div className="text-3xl font-black leading-none">8+</div>
              <div className="text-xs font-medium opacity-80 mt-1">
                <Tr k={'años enseñando coreano\na hispanohablantes'} />
              </div>
            </motion.div>
            </div>
            <p className="mt-10 text-center text-xs text-seoul-black/60">{t('▶ Conóceme en video')}</p>
          </motion.div>

          {/* Right: Story */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5"
          >
            <p className="text-xl text-seoul-black/80 leading-relaxed font-medium">
              <span className="font-korean">{'안녕하세요'}</span>{t(', soy')}{' '}
              <span className="font-korean font-bold">{'김재희'}</span>{' '}
              {t('— mejor conocido como Jay. Nací en Seúl, llegué a Chile a los 10 años, y crecí entre kimchi y empanadas — entre')}{' '}
              <span className="font-korean">{'한글'}</span> {t('y español.')}
            </p>
            <p className="text-base text-seoul-black/60 leading-relaxed">
              {t('De día soy gerente en una empresa coreana de genómica en Las Condes. De noche hago lo que más amo: enseñar mi idioma a quienes lo aprenden por amor a la cultura. Academia Seúl nació para construir el puente que yo no tuve a los 10.')}
            </p>
            <p className="text-sm text-seoul-black/60 leading-relaxed">
              {t('En clase también te acompañan Guiran, profesora coreana criada en Argentina, y Abby, profesora nativa que enseña en vivo desde Corea.')}
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full border border-black/10 text-seoul-black/70"
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href="/sobre"
              className="inline-flex items-center gap-2 mt-2 px-6 py-3 bg-seoul-black text-seoul-white font-semibold text-sm rounded-lg hover:bg-seoul-red transition-all duration-300 group"
            >
              {t('Conoce nuestra historia')}
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
