'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Globe, Users, Zap, Trophy, Video, Shield,
  BookMarked, HeartHandshake,
} from 'lucide-react';
import { useT, i18n } from '@/lib/i18n';

const benefits = [
  {
    icon: Globe,
    title: i18n('Profesores coreanos nativos'),
    desc: i18n('Aprende la pronunciación y el acento real desde el primer día. Nuestros profesores son coreanos nativos y bilingües, y traen la cultura viva al aula.'),
    color: '#3D2EE8',
  },
  {
    icon: Users,
    title: i18n('Grupos reducidos'),
    desc: i18n('Máximo 15 estudiantes por clase (8 en TOPIK II, 12 en Niños). Más tiempo de práctica oral, más feedback personalizado y un ambiente donde realmente puedes equivocarte y aprender.'),
    color: '#003478',
  },
  {
    icon: Zap,
    title: i18n('Metodología innovadora'),
    desc: i18n('Combinamos comunicación oral, gramática funcional y cultura contemporánea. Sin aburrimiento. Sin memorizar tablas interminables.'),
    color: '#D4AF37',
  },
  {
    icon: Trophy,
    title: i18n('TOPIK II (B1+): preparación oficial'),
    desc: i18n('Somos tu puerta al certificado internacional TOPIK I y TOPIK II. Te preparamos con simulacros, estrategias y material oficial.'),
    color: '#3D2EE8',
  },
  {
    icon: Video,
    title: i18n('Grabaciones incluidas'),
    desc: i18n('¿Te pierdes una clase? Recibes la grabación en 24 horas. Todas las clases son 100% online en vivo por Zoom.'),
    color: '#003478',
  },
  {
    icon: BookMarked,
    title: i18n('Materiales incluidos'),
    desc: i18n('Slides, hojas de actividad y el Lector de Hangul con audio nativo, incluidos en cada curso. Sin comprar libros.'),
    color: '#D4AF37',
  },
  {
    icon: HeartHandshake,
    title: i18n('Comunidad vibrante'),
    desc: i18n('Sé parte de la comunidad Chingu: alumnos de toda Latinoamérica y España aprendiendo coreano juntos.'),
    color: '#3D2EE8',
  },
  {
    icon: Shield,
    title: i18n('Certificado por participación'),
    desc: i18n('Al completar tu curso recibes el certificado de Academia Seúl de tu nivel (A1.1, A1.2, A2.1, TOPIK II o Niños). Tu avance queda respaldado peldaño a peldaño.'),
    color: '#003478',
  },
];

export default function Benefits() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { t } = useT();

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
            {t('¿Por qué elegirnos?')}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-seoul-black leading-tight max-w-3xl mx-auto">
            {t('Todo lo que necesitas')}
            <br />
            {t('para')} <em className="not-italic text-gradient-red">{t('hablar coreano')}</em>
          </h2>
          <p className="mt-6 text-base text-seoul-black/55 max-w-xl mx-auto leading-relaxed">
            {t('No somos una academia más. Una nueva forma de aprender coreano desde Latinoamérica, diseñada para hispanohablantes.')}
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
                  {t(b.title)}
                </h3>
                <p className="text-sm text-seoul-black/55 leading-relaxed flex-1">
                  {t(b.desc)}
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
              ].map((s) => (
                <span key={s + Math.random()} className="text-sm font-medium text-seoul-black/25 tracking-widest uppercase">
                  {s}
                </span>
              )),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
