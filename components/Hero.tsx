'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useT } from '@/lib/i18n';

// Hero: en 5 segundos el visitante debe saber qué es, para quién, qué lo hace distinto y qué hacer.
// Presupuesto: eyebrow · H1 · sub · oferta · 2 botones · micro-link · franja de 3 datos. Un solo stagger
// para que el CTA aparezca antes de 0,6 s (antes tardaba 2 s).
const container = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } };
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useT();
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // Parallax suave: el contenido sube un poco al hacer scroll
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '12%']);
  const opacity  = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const prueba = [t('🎥 En vivo por Zoom · 60 min'), t('👥 Grupos de máx. 15'), t('🎓 Certificado incluido')];

  return (
    <section
      id="hero"
      ref={ref}
      className="relative w-full min-h-screen overflow-hidden bg-seoul-black"
    >
      {/* ── Korea background: Gwanghwamun & King Sejong statue ── */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/hero-gwanghwamun.jpg"
          alt={t('Puerta Gwanghwamun del palacio Gyeongbokgung, Seúl')}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: '50% 38%' }}
        />
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-seoul-black/80 via-seoul-black/70 to-seoul-black/90" />
        {/* Extra darkening right behind the text block for legibility */}
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 70% 45% at 50% 48%, rgba(0,0,0,0.55) 0%, transparent 70%)' }}
        />
        {/* Subtle cobalt glow */}
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 38%, rgba(61,46,232,0.20) 0%, transparent 65%)' }}
        />
      </div>

      {/* ── Top gradient mask for navbar legibility ── */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-seoul-black/70 to-transparent pointer-events-none z-10" />

      {/* ── Hero content: REAL HTML, fully clickable ── */}
      <motion.div
        style={{ y: contentY, opacity, textShadow: '0 2px 18px rgba(0,0,0,0.55)' }}
        className="hero-content relative z-20 flex min-h-screen flex-col items-center justify-center px-5 pt-36 pb-24 text-center sm:px-6 sm:pt-40 sm:pb-32"
        variants={container}
        initial={reduce ? 'show' : 'hidden'}
        animate="show"
      >
        {/* 1 · Qué es + para quién, y el titular */}
        <motion.div variants={item}>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#E8B84B] sm:text-xs sm:tracking-[0.3em]">
            <span lang="ko" className="font-korean normal-case tracking-normal text-white/70">한국어</span>
            <span className="text-white/50"> · </span>
            {t('Academia online de coreano para hispanohablantes')}
          </p>
          <h1 className="hero-title text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl md:text-7xl lg:text-8xl">
            <span className="block text-seoul-white">{t('Aprende coreano.')}</span>
            <span className="block text-seoul-red">{t('Entra en Corea.')}</span>
          </h1>
        </motion.div>

        {/* 2 · Qué lo hace distinto + la oferta */}
        <motion.div variants={item}>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white sm:max-w-xl sm:text-base">
            {t('Clases en vivo por Zoom con profesores coreanos nativos, para hispanohablantes de Latinoamérica y España. Gramática explicada desde tu español: lees')}{' '}
            <span lang="ko" className="font-korean">한글</span>{' '}
            {t('desde la primera semana y hablas desde el día uno.')}
          </p>
          <p className="mt-3 text-sm font-semibold text-white/90">
            {t('Cohorte octubre 2026 · 8 semanas desde la semana del 5 de octubre · US$150 el curso completo · o 2 cuotas de US$75')}
          </p>
        </motion.div>

        {/* 3 · Qué hacer: primario (elegir clase) + secundario (test de nivel) */}
        <motion.div variants={item} className="mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
          <a
            href="/nivel-1#clases"
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-seoul-red px-8 py-4 font-semibold text-white shadow-xl shadow-seoul-red/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2C1FB0] hover:shadow-seoul-red/40 focus:outline-none focus:ring-2 focus:ring-seoul-red focus:ring-offset-2 focus:ring-offset-seoul-black sm:w-auto"
          >
            {t('Elegir mi clase →')}
          </a>
          <a
            href="/test-nivel"
            className="inline-flex w-full items-center justify-center rounded-md border border-white/25 px-8 py-4 font-semibold text-white transition-colors duration-200 hover:border-white/50 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-seoul-black sm:w-auto"
          >
            {t('Hacer el test de nivel gratis')}
          </a>
        </motion.div>

        {/* 4 · Micro-link para quien empieza de cero */}
        <motion.p variants={item} className="mt-5 text-sm text-white/85">
          {t('¿Nunca estudiaste coreano?')}{' '}
          <a
            href="/nivel-1?clase=a11-martes#clases"
            className="font-bold text-white underline decoration-white/50 underline-offset-4 transition-colors hover:text-[#E8B84B]"
          >
            {t('Empiezas en Básico 1 (A1.1) →')}
          </a>
        </motion.p>

        {/* 5 · Franja de prueba (datos verificados, sin pills) */}
        <motion.p variants={item} className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-white/85">
          {prueba.map((p, i) => (
            <span key={p} className="inline-flex items-center gap-3">
              {i > 0 && <span aria-hidden className="hidden text-white/40 sm:inline">·</span>}
              {p}
            </span>
          ))}
        </motion.p>
      </motion.div>

      {/* ── Scroll indicator: real clickable anchor ── */}
      <motion.a
        href="#courses"
        style={{ opacity }}
        className="group absolute bottom-10 left-1/2 z-20 hidden -translate-x-1/2 cursor-pointer flex-col items-center gap-2 sm:flex"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        aria-label={t('Ver los cursos')}
      >
        <span className="text-xs font-medium uppercase tracking-[0.25em] text-white/60 transition-colors group-hover:text-white/90">
          {t('Ver los cursos')}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown
            size={20}
            className="text-white/60 transition-colors group-hover:text-white/90"
          />
        </motion.div>
      </motion.a>
    </section>
  );
}
