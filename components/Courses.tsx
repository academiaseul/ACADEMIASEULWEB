'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Escalera from '@/components/Escalera';
import { useHoraLocal } from '@/lib/useHoraLocal';
import { useT, Tr } from '@/lib/i18n';
import {
  CURSOS,
  CONVERSACIONAL_2,
  clasesDe,
  profeDe,
  horarioDe,
  primeraClaseDe,
  precioLabel,
  PRECIO_CORTO,
  type Curso,
} from '@/lib/nivel1';

// Tarjetas de cursos derivadas de lib/nivel1.ts (una sola fuente de nombres).
// Cohorte octubre 2026 · inicio semana del 12 de octubre · todos a 8 semanas.

function CourseCard({ curso, index, pais, paisCorto }: { curso: Curso; index: number; pais: Parameters<typeof horarioDe>[1]; paisCorto: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { t, td } = useT();
  const clases = clasesDe(curso.cursoId);
  const profe = profeDe(clases[0].profeId);
  const esNinos = curso.grupo === 'ninos';
  const color = index % 2 === 0 ? '#3D2EE8' : '#003478';
  const colorTxt = index % 2 === 0 ? 'var(--as-azul-txt)' : 'var(--as-navy-txt)'; // se aclara en modo noche
  const horario = `${td(horarioDe(curso.cursoId, pais))} ${pais !== 'chile' ? t(paisCorto) : t('Chile')}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="relative group glass-light rounded-2xl p-7 flex flex-col gap-4 overflow-hidden"
      style={{ boxShadow: '0 6px 24px rgba(10,10,40,0.06)' }}
    >
      <div className="flex items-start gap-2">
        <span className="text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-full text-white" style={{ background: color }}>
          {esNinos ? t('Niños 8–12') : t('Paso {n} · {cefr}', { n: curso.paso, cefr: curso.cefr })}
        </span>
      </div>

      <div>
        <div className="text-3xl mb-1">{curso.emoji}</div>
        <h3 className="text-xl font-bold text-seoul-black leading-tight">{t(curso.nombreCorto)}</h3>
        <p className="text-sm text-seoul-black/45">{t(curso.subtitulo)} · <span className="font-korean">{curso.koreanTitle}</span></p>
        {curso.alias && (
          <span className="inline-block mt-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-black/[0.05] text-seoul-black/60">{t('antes: {alias}', { alias: t(curso.alias) })}</span>
        )}
      </div>

      <p className="text-sm text-seoul-black/60 leading-relaxed flex-1">{t(curso.descripcion)}</p>

      <div className="grid grid-cols-2 gap-x-3 gap-y-2 pt-4 border-t border-black/[0.06]">
        {[
          { label: t('Horario'), value: horario },
          { label: t('Profe'), value: `${profe.emoji} ${t(profe.corto)}` },
          { label: t('Duración'), value: t('8 semanas · 60 min') },
          { label: t('Precio'), value: t(PRECIO_CORTO) },
        ].map((m) => (
          <div key={m.label}>
            <div className="text-[10px] uppercase tracking-wider text-seoul-black/50 mb-0.5">{m.label}</div>
            <div className="text-xs text-seoul-black/75 font-semibold">{m.value}</div>
          </div>
        ))}
      </div>
      {curso.requiere && <div className="text-[11px] text-seoul-black/45">{t('Requiere {req}', { req: t(curso.requiere) })}</div>}

      <a href={`/nivel-1?clase=${primeraClaseDe(curso.cursoId)}#clases`} className="mt-1 flex items-center justify-between group/btn">
        <span className="text-sm font-semibold group-hover/btn:underline underline-offset-2" style={{ color: colorTxt }}>
          {esNinos ? t('Inscribir a mi hijo/a') : t('Inscribirme en {curso}', { curso: t(curso.nombreCorto).split(' (')[0] })}
        </span>
        <span className="w-8 h-8 rounded-full flex items-center justify-center text-white group-hover/btn:scale-110 transition-transform duration-200" style={{ background: color }}>→</span>
      </a>
    </motion.div>
  );
}

export default function Courses() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useT();
  const { pais, info } = useHoraLocal();
  const adultos = CURSOS.filter((c) => c.grupo === 'adultos').sort((a, b) => a.paso - b.paso);
  const ninos = CURSOS.find((c) => c.grupo === 'ninos')!;

  return (
    <section id="courses" ref={ref} className="relative bg-white section-padding overflow-hidden hangul-bg">
      <div className="absolute top-0 right-0 w-96 h-96 bg-seoul-red/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-seoul-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-tight relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-seoul-red">{t('Cohorte octubre 2026')}</span>
              <span className="text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-xl bg-[#E8B84B] text-[#0D0D0D]">{t('Matrícula abierta · cierra el 11 de octubre')}</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-seoul-black leading-tight">
              {t('Encuentra tu')}
              <br />
              <span className="text-gradient-red">{t('peldaño')}</span>
            </h2>
          </div>
          <p className="text-seoul-black/55 text-base max-w-sm leading-relaxed">
            {t('5 cursos · 6 horarios · 8 semanas desde la semana del 12 de octubre.')} <strong className="text-seoul-black">{t(precioLabel())}</strong> {t('— mismo precio en todos los cursos.')}
          </p>
        </motion.div>

        {/* Escalera con chips de entrada */}
        <div className="mb-14">
          <Escalera />
        </div>

        {/* Adultos */}
        <div className="text-xs font-bold tracking-[0.25em] uppercase text-seoul-black/40 mb-4">{t('Adultos · la escalera')}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
          {adultos.map((c, i) => (
            <CourseCard key={c.cursoId} curso={c} index={i} pais={pais} paisCorto={info.corto} />
          ))}
        </div>

        {/* Niños + Todo incluido (antes la sección Beneficios) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <div className="text-xs font-bold tracking-[0.25em] uppercase text-seoul-black/40 mb-4">{t('Niños 8–12 · ruta propia')}</div>
            <CourseCard curso={ninos} index={4} pais={pais} paisCorto={info.corto} />
          </div>
          <div className="flex flex-col">
            <div className="text-xs font-bold tracking-[0.25em] uppercase text-seoul-black/40 mb-4">{t('Todo incluido en tu curso')}</div>
            <ul className="glass-light rounded-2xl px-7 py-4 flex-1 flex flex-col justify-center divide-y divide-black/[0.06]" style={{ boxShadow: '0 6px 24px rgba(10,10,40,0.06)' }}>
              {[
                t('🎥 8 semanas en vivo por Zoom · 60 min por clase'),
                t('⏺ Grabación de cada clase en 24 h'),
                t('📚 Slides, hojas de actividad y Lector de Hangul'),
                t('🎓 Certificado de Academia Seúl al terminar'),
              ].map((item) => (
                <li key={item} className="py-3.5 text-[15px] text-seoul-black/75 font-semibold leading-snug">{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Próximamente: Conversacional 2 como fila, no como tarjeta */}
        <a
          href={CONVERSACIONAL_2.href}
          className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-xl border border-dashed border-black/15 px-5 py-4 hover:border-black/30 transition-colors group/next"
        >
          <div className="flex items-center gap-3 text-sm">
            <span className="text-2xl">🎎</span>
            <div>
              <span className="font-bold text-seoul-black">{t(CONVERSACIONAL_2.nombreCorto)}</span>
              <span className="text-seoul-black/50"> · {t('Próximamente · enero 2027')} · {t('Requiere {req}', { req: t(CONVERSACIONAL_2.requiere) })}</span>
            </div>
          </div>
          <span className="text-sm font-semibold text-seoul-black/60 group-hover/next:underline underline-offset-2 whitespace-nowrap">{t('Avísame cuando abra')} →</span>
        </a>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 text-center"
        >
          <p className="text-seoul-black/70 text-sm mb-5">
            <Tr k="¿Nunca estudiaste coreano? Tu curso es **Básico 1**. ¿Ya sabes algo? Haz el test de nivel." />
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/nivel-1#clases" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-seoul-red hover:bg-[#2C1FB0] text-white font-semibold rounded-lg shadow-xl shadow-seoul-red/25 transition-all duration-300 text-sm">
              {t('Elegir mi clase →')}
            </a>
            <a href="/test-nivel" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-black/15 hover:border-seoul-red text-seoul-black hover:text-seoul-red font-semibold rounded-lg transition-all duration-300 hover:bg-seoul-red/5 text-sm">
              {t('Hacer el test de nivel gratis')}
            </a>
          </div>
          <a href="/programa" className="mt-4 inline-block text-sm text-seoul-black/60 underline underline-offset-4 hover:text-seoul-red">
            {t('Ver el programa completo y los horarios →')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
