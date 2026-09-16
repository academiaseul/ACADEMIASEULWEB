'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Escalera from '@/components/Escalera';
import { useHoraLocal } from '@/lib/useHoraLocal';
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
// Cohorte octubre 2026 · inicio semana del 5 de octubre · todos a 8 semanas.

function CourseCard({ curso, index, pais, paisCorto }: { curso: Curso; index: number; pais: Parameters<typeof horarioDe>[1]; paisCorto: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const clases = clasesDe(curso.cursoId);
  const profe = profeDe(clases[0].profeId);
  const esNinos = curso.grupo === 'ninos';
  const color = index % 2 === 0 ? '#3D2EE8' : '#003478';
  const colorTxt = index % 2 === 0 ? 'var(--as-azul-txt)' : 'var(--as-navy-txt)'; // se aclara en modo noche
  const horario = `${horarioDe(curso.cursoId, pais)}${pais !== 'chile' ? ` ${paisCorto}` : ' Chile'}`;

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
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-full text-white" style={{ background: color }}>
          {esNinos ? 'Niños 8–12' : `Paso ${curso.paso} · ${curso.cefr}`}
        </span>
        <span className="text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-[#E8B84B] text-[#0D0D0D]">Matrícula abierta</span>
      </div>

      <div>
        <div className="text-3xl mb-1">{curso.emoji}</div>
        <h3 className="text-xl font-bold text-seoul-black leading-tight">{curso.nombreCorto}</h3>
        <p className="text-sm text-seoul-black/45">{curso.subtitulo} · <span className="font-korean">{curso.koreanTitle}</span></p>
        {curso.alias && (
          <span className="inline-block mt-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-black/[0.05] text-seoul-black/60">antes: {curso.alias}</span>
        )}
      </div>

      <p className="text-sm text-seoul-black/60 leading-relaxed flex-1">{curso.descripcion}</p>

      <div className="grid grid-cols-2 gap-x-3 gap-y-2 pt-4 border-t border-black/[0.06]">
        {[
          { label: 'Horario', value: horario },
          { label: 'Profe', value: `${profe.emoji} ${profe.corto}` },
          { label: 'Duración', value: '8 semanas · 60 min' },
          { label: 'Precio', value: PRECIO_CORTO },
        ].map((m) => (
          <div key={m.label}>
            <div className="text-[10px] uppercase tracking-wider text-seoul-black/30 mb-0.5">{m.label}</div>
            <div className="text-xs text-seoul-black/75 font-semibold">{m.value}</div>
          </div>
        ))}
      </div>
      {curso.requiere && <div className="text-[11px] text-seoul-black/45">Requiere {curso.requiere}</div>}

      <a href={`/nivel-1?clase=${primeraClaseDe(curso.cursoId)}#clases`} className="mt-1 flex items-center justify-between group/btn">
        <span className="text-sm font-semibold group-hover/btn:underline underline-offset-2" style={{ color: colorTxt }}>
          {esNinos ? 'Inscribir a mi hijo/a' : `Inscribirme en ${curso.nombreCorto.split(' (')[0]}`}
        </span>
        <span className="w-8 h-8 rounded-full flex items-center justify-center text-white group-hover/btn:scale-110 transition-transform duration-200" style={{ background: color }}>→</span>
      </a>
    </motion.div>
  );
}

export default function Courses() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
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
            <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-seoul-red mb-4">Cohorte octubre 2026</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-seoul-black leading-tight">
              Encuentra tu
              <br />
              <span className="text-gradient-red">peldaño</span>
            </h2>
          </div>
          <p className="text-seoul-black/55 text-base max-w-sm leading-relaxed">
            5 cursos · 6 horarios · 8 semanas desde la semana del 5 de octubre. <strong className="text-seoul-black">{precioLabel()}</strong> — mismo precio en todos los cursos.
          </p>
        </motion.div>

        {/* Escalera con chips de entrada */}
        <div className="mb-14">
          <Escalera />
        </div>

        {/* Adultos */}
        <div className="text-xs font-bold tracking-[0.25em] uppercase text-seoul-black/40 mb-4">Adultos · la escalera</div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
          {adultos.map((c, i) => (
            <CourseCard key={c.cursoId} curso={c} index={i} pais={pais} paisCorto={info.corto} />
          ))}
        </div>

        {/* Niños + próximamente */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <div className="text-xs font-bold tracking-[0.25em] uppercase text-seoul-black/40 mb-4">Niños 8–12 · ruta propia</div>
            <CourseCard curso={ninos} index={4} pais={pais} paisCorto={info.corto} />
          </div>
          <div>
            <div className="text-xs font-bold tracking-[0.25em] uppercase text-seoul-black/40 mb-4">Próximamente · enero 2027</div>
            <div className="glass-light rounded-2xl p-7 flex flex-col gap-4 opacity-75 hover:opacity-100 transition-opacity" style={{ boxShadow: '0 6px 24px rgba(10,10,40,0.06)' }}>
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-full bg-black/[0.06] text-seoul-black/60">Paso {CONVERSACIONAL_2.paso} · {CONVERSACIONAL_2.cefr}</span>
                <span className="text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-black/[0.06] text-seoul-black/55 border border-black/10">{CONVERSACIONAL_2.cuando}</span>
              </div>
              <div>
                <div className="text-3xl mb-1">🎎</div>
                <h3 className="text-xl font-bold text-seoul-black leading-tight">{CONVERSACIONAL_2.nombreCorto}</h3>
                <p className="text-sm text-seoul-black/45">{CONVERSACIONAL_2.subtitulo} · <span className="font-korean">회화 A2.2</span></p>
              </div>
              <p className="text-sm text-seoul-black/60 leading-relaxed flex-1">La continuación de Conversacional 1: educación y suneung, la oficina coreana, mitos, Seollal y Chuseok, K-drama. Para quienes terminen A2.1 en noviembre.</p>
              <div className="text-[11px] text-seoul-black/45">Requiere {CONVERSACIONAL_2.requiere}</div>
              <a href={CONVERSACIONAL_2.href} className="mt-1 flex items-center justify-between group/btn">
                <span className="text-sm font-semibold text-seoul-black/60 group-hover/btn:underline underline-offset-2">Avísame cuando abra</span>
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-white bg-black/20 group-hover/btn:scale-110 transition-transform duration-200">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 text-center"
        >
          <p className="text-seoul-black/70 text-sm mb-5">
            ¿Nunca estudiaste coreano? Tu curso es <strong>Básico 1</strong>. ¿Ya sabes algo? Haz el test de nivel.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/nivel-1#clases" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-seoul-red hover:bg-[#2C1FB0] text-white font-semibold rounded-lg transition-all duration-300 text-sm group">
              Inscribirme en mi clase
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </a>
            <a href="/programa" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-black/15 hover:border-seoul-red text-seoul-black hover:text-seoul-red font-semibold rounded-lg transition-all duration-300 hover:bg-seoul-red/5 text-sm group">
              Ver syllabus completo
            </a>
            <a href="/test-nivel" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-black/15 hover:border-seoul-red text-seoul-black hover:text-seoul-red font-semibold rounded-lg transition-all duration-300 hover:bg-seoul-red/5 text-sm group">
              Test de nivel gratuito
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
