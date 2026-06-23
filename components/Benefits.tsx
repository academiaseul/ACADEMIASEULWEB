'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Globe, Users, Zap, Trophy, Video, Shield,
  BookMarked, HeartHandshake,
} from 'lucide-react';

const benefits = [
  {
    icon: Globe,
    title: 'Profesores nativos de Seúl',
    desc: 'Aprende la pronunciación y el acento real desde el primer día. Nuestros profesores crecieron en Corea del Sur y traen la cultura viva al aula.',
    color: '#3D2EE8',
  },
  {
    icon: Users,
    title: 'Grupos ultra-reducidos',
    desc: 'Máximo 8 estudiantes por clase. Más tiempo de práctica oral, más feedback personalizado y un ambiente donde realmente puedes equivocarte y aprender.',
    color: '#003478',
  },
  {
    icon: Zap,
    title: 'Metodología innovadora',
    desc: 'Combinamos comunicación oral, gramática funcional y cultura contemporánea. Sin aburrimiento. Sin memorizar tablas interminables.',
    color: '#D4AF37',
  },
  {
    icon: Trophy,
    title: 'Preparación TOPIK oficial',
    desc: 'Somos tu puerta al certificado internacional TOPIK I y TOPIK II. Te preparamos con simulacros, estrategias y material oficial.',
    color: '#3D2EE8',
  },
  {
    icon: Video,
    title: 'Clases online disponibles',
    desc: 'Vives lejos o no puedes asistir presencialmente? Clases online en vivo con la misma calidad, los mismos profesores y las mismas dinámicas.',
    color: '#003478',
  },
  {
    icon: BookMarked,
    title: 'Materiales incluidos',
    desc: 'Olvídate de comprar libros. Te entregamos todos los materiales digitales e impresos que necesitas, actualizados constantemente.',
    color: '#D4AF37',
  },
  {
    icon: HeartHandshake,
    title: 'Comunidad vibrante',
    desc: 'Sé parte de la primera comunidad Chingu en Santiago. Eventos culturales, intercambios y actividades de inmersión durante el año.',
    color: '#3D2EE8',
  },
  {
    icon: Shield,
    title: 'Certificado por participación',
    desc: 'Al participar en las clases recibes tu certificado de Academia Seúl (CEFR A1 / TOPIK 초급 1). Tu avance queda respaldado nivel a nivel.',
    color: '#003478',
  },
];

export default function Benefits() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="relative bg-[#F4F7FF] section-padding overflow-hidden"
    >
      {/* Left column accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-seoul-red via-seoul-blue to-seoul-red" />

      <div className="container-tight relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-seoul-red mb-4">
            ¿Por qué elegirnos?
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-seoul-black leading-tight max-w-3xl mx-auto">
            Todo lo que necesitas
            <br />
            para <em className="not-italic text-gradient-red">hablar coreano</em>
          </h2>
          <p className="mt-6 text-base text-seoul-black/55 max-w-xl mx-auto leading-relaxed">
            No somos una academia más. Somos el sistema completo de inmersión
            coreana más efectivo de Chile.
          </p>
        </motion.div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.slice(0, 4).map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl hover:shadow-black/5 transition-shadow duration-400 group border border-black/[0.04] flex flex-col gap-4"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `${b.color}12`, border: `1px solid ${b.color}20` }}
                >
                  <Icon size={22} style={{ color: b.color }} />
                </div>
                <h3 className="font-bold text-base text-seoul-black leading-tight">
                  {b.title}
                </h3>
                <p className="text-sm text-seoul-black/55 leading-relaxed flex-1">
                  {b.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Marquee strip */}
        <div className="mt-14 overflow-hidden border-y border-black/[0.06] py-5">
          <div
            className="flex gap-12 whitespace-nowrap"
            style={{ animation: 'marquee 28s linear infinite' }}
          >
            {Array.from({ length: 4 }).flatMap(() =>
              [
                '한국어 · Korean',
                'Hangul · 한글',
                'TOPIK Certification',
                'K-drama · 드라마',
                'K-pop · 케이팝',
                'Native Teachers · 원어민',
                'Santiago · Chile',
                'Small Groups',
              ].map((t) => (
                <span key={t + Math.random()} className="text-sm font-medium text-seoul-black/25 tracking-widest uppercase">
                  {t}
                </span>
              )),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
