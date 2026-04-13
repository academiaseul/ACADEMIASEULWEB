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
  const opacity   = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative w-full h-screen min-h-[640px] overflow-hidden bg-seoul-black"
    >
      {/* ── Remotion animated background ── */}
      <div className="absolute inset-0 remotion-player-container">
        <RemotionPlayer />
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 5.5, duration: 1 }}
      >
        <span className="text-xs tracking-[0.25em] uppercase text-white/40 font-medium">
          Descubre más
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="text-white/40" />
        </motion.div>
      </motion.div>

      {/* ── Top gradient mask ── */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-seoul-black/60 to-transparent pointer-events-none z-10" />
    </section>
  );
}
