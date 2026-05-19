'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, Users, Award, BookOpen, Mic, Star } from 'lucide-react';
import clsx from 'clsx';

const courses = [
  {
    id: 'basico',
    level: 'A1 – A2',
    icon: BookOpen,
    title: 'Coreano Básico',
    koreanTitle: '기초 한국어',
    description:
      'Empieza desde cero. Aprende el alfabeto Hangul, pronunciación perfecta, saludos y conversaciones cotidianas. El punto de partida ideal.',
    duration: '3 meses',
    sessions: '2 clases / semana',
    groupSize: 'Grupo con cupos limitados',
    badge: 'Lanzamiento Julio',
    color: '#C8001E',
    bgGlow: 'rgba(200,0,30,0.08)',
    status: 'launching' as const,
    cta: 'Únete a la lista de espera',
    ctaLink: '/taller',
  },
  {
    id: 'intermedio',
    level: 'B1 – B2',
    icon: Users,
    title: 'Coreano Intermedio',
    koreanTitle: '중급 한국어',
    description:
      'Consolida tu gramática y expande tu vocabulario. Participa en conversaciones fluidas sobre temas reales y actuales de la vida coreana.',
    duration: '4 meses',
    sessions: '2 clases / semana',
    groupSize: 'Grupo con cupos limitados',
    badge: 'Próximamente',
    color: '#003478',
    bgGlow: 'rgba(0,52,120,0.08)',
    status: 'comingSoon' as const,
    cta: 'Notifícame cuando lance',
    ctaLink: '/notificarme?curso=intermedio',
  },
  {
    id: 'avanzado',
    level: 'C1 – C2',
    icon: Award,
    title: 'Coreano Avanzado',
    koreanTitle: '고급 한국어',
    description:
      'Perfecciona tu dominio del idioma. Análisis de textos complejos, expresiones idiomáticas, registros formales e informales.',
    duration: '5 meses',
    sessions: '2 clases / semana',
    groupSize: 'Grupo con cupos limitados',
    badge: 'Próximamente',
    color: '#D4AF37',
    bgGlow: 'rgba(212,175,55,0.08)',
    status: 'comingSoon' as const,
    cta: 'Notifícame cuando lance',
    ctaLink: '/notificarme?curso=avanzado',
  },
  {
    id: 'kpop',
    level: 'Todos los niveles',
    icon: Star,
    title: 'K-pop & K-drama',
    koreanTitle: '케이팝 & 드라마',
    description:
      'Aprende coreano a través de la cultura que amas. Canciones, diálogos de series, slang moderno y la jerga generacional de Corea.',
    duration: '2 meses',
    sessions: '1 clase / semana',
    groupSize: 'Grupo con cupos limitados',
    badge: 'Próximamente',
    color: '#C8001E',
    bgGlow: 'rgba(200,0,30,0.08)',
    status: 'comingSoon' as const,
    cta: 'Notifícame cuando lance',
    ctaLink: '/notificarme?curso=kpop',
  },
  {
    id: 'conversacion',
    level: 'A2+',
    icon: Mic,
    title: 'Conversación Express',
    koreanTitle: '대화 특급',
    description:
      'Clases intensivas de conversación para estudiantes que quieren fluir rápidamente. Simulaciones reales, role-play y debates.',
    duration: '6 semanas',
    sessions: '3 clases / semana',
    groupSize: 'Grupo con cupos limitados',
    badge: 'Próximamente',
    color: '#003478',
    bgGlow: 'rgba(0,52,120,0.08)',
    status: 'comingSoon' as const,
    cta: 'Notifícame cuando lance',
    ctaLink: '/notificarme?curso=conversacion',
  },
  {
    id: 'topik',
    level: 'B2 – C2',
    icon: Clock,
    title: 'Preparación TOPIK',
    koreanTitle: 'TOPIK 준비',
    description:
      'Preparación intensiva y enfocada para el examen oficial TOPIK I y TOPIK II. Simulacros, estrategias y material oficial.',
    duration: '3 meses',
    sessions: '3 clases / semana',
    groupSize: 'Grupo con cupos limitados',
    badge: 'Próximamente',
    color: '#D4AF37',
    bgGlow: 'rgba(212,175,55,0.08)',
    status: 'comingSoon' as const,
    cta: 'Notifícame cuando lance',
    ctaLink: '/notificarme?curso=topik',
  },
];

function CourseCard({
  course,
  index,
}: {
  course: (typeof courses)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const Icon = course.icon;

  const isComingSoon = course.status === 'comingSoon';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        delay: (index % 3) * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className={clsx(
        'relative group glass rounded-2xl p-8 flex flex-col gap-5 cursor-pointer overflow-hidden transition-opacity duration-300',
        isComingSoon && 'opacity-75 hover:opacity-100'
      )}
      style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.06)` }}
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 30% 30%, ${course.bgGlow} 0%, transparent 70%)` }}
      />

      {/* Badge */}
      {course.badge && (
        <span
          className="absolute top-5 right-5 text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full"
          style={{
            background: isComingSoon ? 'rgba(255,255,255,0.1)' : course.color,
            color: isComingSoon ? 'rgba(255,255,255,0.7)' : '#fff',
            border: isComingSoon ? '1px solid rgba(255,255,255,0.15)' : 'none',
          }}
        >
          {course.badge}
        </span>
      )}

      {/* Level pill */}
      <span className="self-start text-xs font-semibold tracking-wider uppercase text-white/40 bg-white/[0.06] px-3 py-1.5 rounded-full">
        {course.level}
      </span>

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${course.color}20`, border: `1px solid ${course.color}30` }}
      >
        <Icon size={22} style={{ color: course.color }} />
      </div>

      {/* Title */}
      <div>
        <h3 className="text-xl font-bold text-seoul-white mb-1">{course.title}</h3>
        <p className="text-sm font-korean text-white/30">{course.koreanTitle}</p>
      </div>

      {/* Description */}
      <p className="text-sm text-white/55 leading-relaxed flex-1">{course.description}</p>

      {/* Meta */}
      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/[0.06]">
        {[
          { label: 'Duración',  value: course.duration   },
          { label: 'Sesiones',  value: course.sessions   },
          { label: 'Grupo',     value: course.groupSize  },
        ].map((m) => (
          <div key={m.label}>
            <div className="text-[10px] uppercase tracking-wider text-white/30 mb-0.5">{m.label}</div>
            <div className="text-xs text-white/70 font-medium">{m.value}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <a
        href={course.ctaLink}
        className="mt-2 flex items-center justify-between group/btn"
      >
        <span
          className="text-sm font-semibold group-hover/btn:underline underline-offset-2"
          style={{ color: isComingSoon ? 'rgba(255,255,255,0.75)' : course.color }}
        >
          {course.cta}
        </span>
        <span
          className="w-8 h-8 rounded-full flex items-center justify-center text-white group-hover/btn:scale-110 transition-transform duration-200"
          style={{ background: isComingSoon ? 'rgba(255,255,255,0.15)' : course.color }}
        >
          →
        </span>
      </a>
    </motion.div>
  );
}

export default function Courses() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="courses"
      ref={ref}
      className="relative bg-seoul-black section-padding overflow-hidden hangul-bg"
    >
      {/* Corner glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-seoul-red/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-seoul-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-tight relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-seoul-red mb-4">
              Nuestros cursos
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-seoul-white leading-tight">
              Encuentra tu
              <br />
              <span className="text-gradient-red">nivel perfecto</span>
            </h2>
          </div>
          <p className="text-seoul-white/45 text-base max-w-xs leading-relaxed">
            Cada curso está diseñado para llevarte al siguiente nivel con confianza,
            sin importar dónde empieces.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {courses.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 text-center"
        >
          <p className="text-white/40 text-sm mb-5">
            ¿No sabes qué nivel elegir? Haz nuestro test de nivelación gratuito.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/15 hover:border-seoul-red text-seoul-white hover:text-white font-semibold rounded-lg transition-all duration-300 hover:bg-seoul-red/10 text-sm group"
          >
            Test de nivelación gratuito
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
