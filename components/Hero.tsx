'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const RemotionPlayer = dynamic(() => import('./RemotionPlayer'), { ssr: false });

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
      {/* ── Remotion animated background (atmospheric only) ── */}
      {/* pointer-events-none lets clicks pass through to the HTML content above */}
      <div className="absolute inset-0 remotion-player-container pointer-events-none">
        <RemotionPlayer />
      </div>

      {/* ── Top gradient mask for navbar legibility ── */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-seoul-black/60 to-transparent pointer-events-none z-10" />

      {/* ── Hero content: REAL HTML, fully clickable ── */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-seoul-red sm:text-sm"
        >
          Academia Seúl · Santiago de Chile
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          className="text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <span className="block text-seoul-white">Aprende Coreano.</span>
          <span className="block text-seoul-red">Vive Seúl.</span>
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
          className="mt-6 font-korean text-xl text-white/50"
        >
          한국어를 배우세요
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-4 max-w-xl text-base leading-relaxed text-white/70"
        >
          Clases de coreano en vivo con profesora nativa · Grupos pequeños ·
          Para LATAM y España.
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
            className="inline-flex items-center gap-2 rounded-md bg-seoul-red px-8 py-4 font-semibold text-white shadow-xl shadow-seoul-red/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-seoul-red/40 focus:outline-none focus:ring-2 focus:ring-seoul-red focus:ring-offset-2 focus:ring-offset-seoul-black"
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
