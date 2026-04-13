'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const pillars = [
  {
    id: 'kdrama',
    tag: 'K-drama',
    tagKorean: '드라마',
    headline: 'Entiende cada diálogo sin subtítulos',
    body: 'Desde Squid Game hasta El juego del calamar. Desde Business Proposal hasta Crash Landing on You. El idioma detrás de cada escena, disponible para ti.',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1000&q=85&auto=format&fit=crop',
    imageAlt: 'K-drama watching experience',
    accent: '#C8001E',
    reverse: false,
  },
  {
    id: 'kpop',
    tag: 'K-pop',
    tagKorean: '케이팝',
    headline: 'Canta en coreano real, no en fonética',
    body: 'BTS, BLACKPINK, NewJeans, aespa — sus letras están llenas de coreano real, cotidiano y poético. Aprende el idioma a través de la música que ya amas.',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1000&q=85&auto=format&fit=crop',
    imageAlt: 'K-pop culture and music',
    accent: '#003478',
    reverse: true,
  },
  {
    id: 'seoul',
    tag: 'Seúl',
    tagKorean: '서울',
    headline: 'Viaja a Corea sin barreras lingüísticas',
    body: 'Myeongdong, Gangnam, Insadong, el metro de Seúl. Con nuestras clases, llegas a Corea lista para comunicarte desde el primer día de tu viaje.',
    image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=1000&q=85&auto=format&fit=crop',
    imageAlt: 'Seoul South Korea cityscape',
    accent: '#D4AF37',
    reverse: false,
  },
];

function CulturePillar({
  pillar,
  index,
}: {
  pillar: (typeof pillars)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);

  const textVariants = {
    hidden: { opacity: 0, x: pillar.reverse ? 40 : -40 },
    visible: { opacity: 1, x: 0 },
  };

  const imgVariants = {
    hidden: { opacity: 0, x: pillar.reverse ? -40 : 40 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div
      ref={ref}
      className={`flex flex-col ${pillar.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 lg:gap-20 items-center`}
    >
      {/* Text side */}
      <motion.div
        variants={textVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 space-y-5"
      >
        <div className="flex items-center gap-3">
          <span
            className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
            style={{ background: `${pillar.accent}20`, color: pillar.accent, border: `1px solid ${pillar.accent}30` }}
          >
            {pillar.tag}
          </span>
          <span className="text-xs font-korean text-white/30">{pillar.tagKorean}</span>
        </div>

        <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-seoul-white leading-tight">
          {pillar.headline}
        </h3>

        <p className="text-base text-white/55 leading-relaxed max-w-md">
          {pillar.body}
        </p>

        <a
          href="#courses"
          className="inline-flex items-center gap-2 text-sm font-semibold group"
          style={{ color: pillar.accent }}
        >
          Descubrir cursos relacionados
          <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
        </a>
      </motion.div>

      {/* Image side with parallax */}
      <motion.div
        variants={imgVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 relative overflow-hidden rounded-2xl"
        style={{ minHeight: 340 }}
      >
        <motion.div style={{ y: imageY }} className="relative w-full h-[420px]">
          <Image
            src={pillar.image}
            alt={pillar.imageAlt}
            fill
            className="object-cover"
          />
          {/* Color overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${pillar.accent}30 0%, transparent 60%)`,
            }}
          />
        </motion.div>

        {/* Tag overlay */}
        <div
          className="absolute top-4 left-4 px-3 py-1.5 rounded-lg text-xs font-bold tracking-widest uppercase backdrop-blur-sm"
          style={{ background: `${pillar.accent}cc`, color: '#fff' }}
        >
          {pillar.tag}
        </div>
      </motion.div>
    </div>
  );
}

export default function KoreanCulture() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="culture"
      ref={ref}
      className="relative bg-seoul-dark section-padding overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-seoul-red/20 to-transparent" />
      </div>

      {/* Giant decorative Korean char */}
      <div
        aria-hidden
        className="absolute -right-16 top-1/2 -translate-y-1/2 font-black font-korean leading-none text-white/[0.015] select-none pointer-events-none"
        style={{ fontSize: '40vw' }}
      >
        문
      </div>

      <div className="container-tight relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 text-center"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-seoul-red mb-4">
            Cultura coreana
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-seoul-white leading-tight">
            El idioma que abre
            <br />
            <span className="text-gradient-gold">un mundo entero</span>
          </h2>
          <p className="mt-6 text-base text-white/45 max-w-lg mx-auto leading-relaxed">
            Corea del Sur es más que un país — es un universo cultural que
            ha conquistado el mundo. Y tú puedes ser parte de él.
          </p>
        </motion.div>

        {/* Pillars */}
        <div className="space-y-24 md:space-y-32">
          {pillars.map((pillar, i) => (
            <CulturePillar key={pillar.id} pillar={pillar} index={i} />
          ))}
        </div>

        {/* Cultural icons strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-24 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { emoji: '🎭', label: 'K-drama',     sub: '드라마'  },
            { emoji: '🎵', label: 'K-pop',        sub: '케이팝' },
            { emoji: '🍜', label: 'K-food',       sub: '음식'   },
            { emoji: '🏙️', label: 'Seúl',         sub: '서울'   },
          ].map((item) => (
            <div
              key={item.label}
              className="glass rounded-xl p-5 text-center flex flex-col items-center gap-2 hover:border-seoul-red/30 transition-all duration-300"
            >
              <span className="text-3xl">{item.emoji}</span>
              <span className="text-sm font-bold text-seoul-white/80">{item.label}</span>
              <span className="text-xs font-korean text-white/30">{item.sub}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
