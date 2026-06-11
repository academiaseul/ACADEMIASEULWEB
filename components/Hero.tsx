'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // Parallax: content rises slightly on scroll
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity  = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative w-full h-screen min-h-[640px] overflow-hidden bg-seoul-black"
    >
      {/* ── Korea background: Gwanghwamun & King Sejong statue ── */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/hero-gwanghwamun.jpg"
          alt="Puerta Gwanghwamun del palacio Gyeongbokgung, Seúl"
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
        className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          className="text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <span className="block text-seoul-white">Aprende Coreano.</span>
          <span className="block text-seoul-red">Con un chingu.</span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-8 h-px w-24 bg-gradient-to-r from-seoul-red to-seoul-blue"
        />

        {/* Korean subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-6 font-korean text-xl text-white/85"
        >
          한국어를 배우세요
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-4 max-w-xl text-base leading-relaxed text-white"
        >
          Aprende a leer <span className="font-korean text-white">한글</span> desde tu primera semana.
          Clases en vivo con profesor nativo y grupos pequeños — para toda LATAM y España.
        </motion.p>

        {/* CTA Buttons — real anchor tags with real click targets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="/nivel-1"
            className="inline-flex items-center gap-2 rounded-md bg-seoul-red px-8 py-4 font-semibold text-white shadow-xl shadow-seoul-red/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2C1FB0] hover:shadow-seoul-red/40 focus:outline-none focus:ring-2 focus:ring-seoul-red focus:ring-offset-2 focus:ring-offset-seoul-black"
          >
            Empieza a aprender · Nivel 1 <span aria-hidden>→</span>
          </a>
          <a
            href="#courses"
            className="inline-flex items-center rounded-md border border-white/20 px-8 py-4 font-semibold text-white transition-colors duration-200 hover:border-white/40 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-seoul-black"
          >
            Ver cursos
          </a>
        </motion.div>

        {/* Free hook */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="mt-5 text-sm text-white/85"
        >
          o{' '}
          <a
            href="/recursos/guias"
            className="text-white font-medium underline underline-offset-4 decoration-white/50 transition-colors hover:text-seoul-red"
          >
            descarga la guía del alfabeto gratis
          </a>
        </motion.p>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.8 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-white/90"
        >
          {[
            '🇰🇷 Profesor nativo de Seúl',
            '🎥 En vivo por Zoom',
            '👥 Grupos pequeños',
            '🌎 LATAM y España',
          ].map((b) => (
            <span
              key={b}
              className="rounded-full border border-white/25 bg-black/35 px-3 py-1.5 backdrop-blur-sm"
            >
              {b}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator: now a real clickable anchor ── */}
      <motion.a
        href="#about"
        style={{ opacity }}
        className="group absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.8, duration: 1 }}
        aria-label="Descubre más — desplazar hacia abajo"
      >
        <span className="text-xs font-medium uppercase tracking-[0.25em] text-white/40 transition-colors group-hover:text-white/70">
          Descubre más
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown
            size={20}
            className="text-white/40 transition-colors group-hover:text-white/70"
          />
        </motion.div>
      </motion.a>
    </section>
  );
}
