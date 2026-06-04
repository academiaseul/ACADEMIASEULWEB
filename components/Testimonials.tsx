'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Globe,
  Languages,
  GraduationCap,
  BookOpenCheck,
  Users,
  ShieldCheck,
  Star,
  Quote,
} from 'lucide-react';

const reasons = [
  {
    icon: Globe,
    title: 'Profesora nativa de Seul',
    description:
      'Naci en Seul en 1990 y llegue a Chile a los 10 anos. No "hablo coreano" - lo vivi desde pequena. La pronunciacion, los matices culturales y los modismos son parte de mi dia a dia.',
    color: '#C8001E',
  },
  {
    icon: Languages,
    title: 'Bilingue perfecto coreano-espanol',
    description:
      'Cruce los dos idiomas durante 25+ anos. Conozco exactamente donde se traba un hispanohablante con el coreano - y como destrabarlo en minutos, no en anos.',
    color: '#003478',
  },
  {
    icon: GraduationCap,
    title: '8+ anos ensenando coreano',
    description:
      'No es mi primer rodeo. Llevo anos ensenando coreano formal e informalmente a estudiantes chilenos y latinoamericanos. Cada error que cometes, ya lo he visto antes.',
    color: '#D4AF37',
  },
  {
    icon: BookOpenCheck,
    title: 'Metodo Chingu',
    description:
      'Disenado especificamente para hispanohablantes. No es un programa coreano traducido - es un enfoque pensado desde el espanol, con metaforas y referencias que si entiendes.',
    color: '#C8001E',
  },
  {
    icon: Users,
    title: 'Grupos con cupos limitados',
    description:
      'No saturamos las cohortes. Grupos pequenos para que cada Chingu reciba atencion personal, dudas resueltas en vivo y feedback de pronunciacion real.',
    color: '#003478',
  },
  {
    icon: ShieldCheck,
    title: 'Garantia y transparencia',
    description:
      'Si despues de la primera semana sientes que no es para ti, devolvemos el 100%. Cero letra chica. Cero atadura. Si vienes, es porque quieres estar.',
    color: '#D4AF37',
  },
];

const testimonials = [
  {
    name: 'Isidora Figueroa',
    level: 'Nivel A1',
    course: 'Coreano Basico',
    initials: 'IF',
    color: '#C8001E',
    quote:
      'Para mi fue un gran profesor! Le entendi muy bien y era bueno explicando. Si alguien no entendia volvia a explicar. Sus clases eran muy divertidas y aprendimos muchas cosas sobre la cultura coreana.',
  },
  {
    name: 'Nedielka Curkovic',
    level: 'Nivel A2',
    course: 'Coreano Basico',
    initials: 'NC',
    color: '#003478',
    quote:
      'Las clases son bastante entretenidas porque mas que pasar solo contenido tambien nos ensena de otras cosas. Cuando le preguntamos un concepto nos cuenta una pequena historia relacionada - asi lo recuerdo mas facilmente.',
  },
  {
    name: 'Carolina Morales',
    level: 'Nivel B1',
    course: 'Coreano Intermedio',
    initials: 'CM',
    color: '#D4AF37',
    quote:
      'Excelente profesor. Siempre disponible para responder dudas dentro y fuera del horario de clases, ademas de explicar hasta que se entienda. Las clases son divertidas y entendibles. Gracias profesor!',
  },
  {
    name: 'Catalina Saavedra',
    level: 'Nivel A2',
    course: 'Coreano Basico',
    initials: 'CS',
    color: '#C8001E',
    quote:
      'Muy buen profesor, sus explicaciones son muy claras y siempre da distintos ejemplos. Ademas nos ensena sobre cultura y cosas tipicas de Corea. Tambien ensena con musica, lo cual facilita mucho el oido y la pronunciacion correcta.',
  },
  {
    name: 'Paulina Cerda',
    level: 'Nivel B1',
    course: 'Coreano Intermedio',
    initials: 'PC',
    color: '#003478',
    quote:
      'Clases claras y didacticas, con entrega de material adecuado para estudio. Se agradece el esfuerzo para fomentar la participacion en clases y explicar reiteradamente en caso de dudas. Ademas la disposicion para resolver dudas fuera del horario.',
  },
  {
    name: 'Mariam',
    level: 'Nivel A1',
    course: 'Coreano Basico',
    initials: 'MA',
    color: '#D4AF37',
    quote:
      'Jae Hee tiene muy buena disposicion cuando alguien tiene una duda, complementa sus clases con cultura general y se dan espacios de confianza donde se pueden compartir experiencias.',
  },
  {
    name: 'Valentina San Martin',
    level: 'Nivel A1',
    course: 'Coreano Basico',
    initials: 'VS',
    color: '#C8001E',
    quote:
      'Fue entretenido y entendi muy bien las clases. Tiene mucha paciencia y hace agradable el aprender.',
  },
];

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={12} className="fill-seoul-gold text-seoul-gold" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative bg-seoul-black section-padding overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-96 h-96 bg-seoul-red/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-seoul-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div
        aria-hidden
        className="absolute left-1/2 top-1/4 -translate-x-1/2 text-[18rem] font-black text-white/[0.015] leading-none select-none pointer-events-none font-korean"
      >
        {'신뢰'}
      </div>

      <div className="container-tight relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-seoul-red mb-4">
            Por que Academia Seul
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-seoul-white leading-tight max-w-3xl mx-auto">
            Lo que nos hace
            <br />
            <span className="text-gradient-red">diferentes</span>
          </h2>
          <p className="mt-6 text-white/50 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            8+ anos ensenando coreano, una metodologia probada y la energia
            de una comunidad real.
          </p>
        </motion.div>

        {/* 김재희 bio card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative glass rounded-2xl p-8 md:p-12 mb-12 overflow-hidden"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 20% 20%, rgba(200,0,30,0.12) 0%, transparent 60%), rgba(255,255,255,0.02)',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.06)',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative z-10">
            <div className="md:col-span-1 text-center md:text-left">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-seoul-red text-white font-black text-2xl mb-4 border-2 border-white/10 font-korean">
                {'김재희'}
              </div>
              <div className="text-2xl font-bold text-seoul-white font-korean">{'김재희'}</div>
              <div className="text-sm text-white/60 mt-1">Jay Chingu</div>
              <div className="text-xs uppercase tracking-widest text-seoul-red mt-3 font-semibold">
                Fundador / Profesor
              </div>
            </div>

            <div className="md:col-span-2 space-y-3">
              <p className="text-base md:text-lg text-seoul-white/85 leading-relaxed">
                <span className="font-korean">{'안녕하세요'}</span>, soy{' '}
                <span className="font-korean font-bold">{'김재희'}</span> - mejor conocido como Jay. Naci en Seul, llegue a
                Chile a los 10 anos, y creci entre kimchi y empanadas - entre{' '}
                <span className="font-korean">{'한글'}</span> y espanol.
              </p>
              <p className="text-sm text-white/55 leading-relaxed">
                De dia soy gerente en una empresa coreana de genomica en Las Condes. De noche
                hago lo que mas amo: ensenar mi idioma a quienes lo aprenden por amor a la
                cultura. Academia Seul nacio para construir el puente que yo no tuve a los 10.
              </p>
              <div className="pt-3 flex flex-wrap gap-2">
                {[
                  'Nativo de Seul',
                  'Bilingue espanol',
                  '8+ anos ensenando',
                  'Metodo Chingu',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-semibold text-white/70 bg-white/[0.04] border border-white/10 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Razones grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + (i % 3) * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative glass rounded-2xl p-7 flex flex-col gap-4 hover:translate-y-[-4px] transition-transform duration-300"
                style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.06)' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${reason.color}20`,
                    border: `1px solid ${reason.color}30`,
                  }}
                >
                  <Icon size={22} style={{ color: reason.color }} />
                </div>
                <h3 className="text-lg font-bold text-seoul-white leading-tight">
                  {reason.title}
                </h3>
                <p className="text-sm text-white/55 leading-relaxed flex-1">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA principal (despues de las razones) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <p className="text-white/40 text-sm mb-5">
            La mejor forma de conocer mi metodo: la primera cohorte del Nivel 1.
          </p>
          <a
            href="/nivel-1"
            className="inline-flex items-center gap-2 px-8 py-4 bg-seoul-red hover:bg-seoul-red-muted text-white font-semibold rounded-lg transition-all duration-300 text-sm group"
          >
            Empieza el Nivel 1 · Promo de lanzamiento $89
            <span className="group-hover:translate-x-1 transition-transform duration-200">{'->'}</span>
          </a>
        </motion.div>

        {/* Testimonios reales DEBAJO del CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-seoul-red mb-4">
            Estudiantes reales
          </span>
          <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-seoul-white leading-tight">
            Lo que dicen <span className="text-gradient-red">mis chingus</span>
          </h3>
          <p className="mt-4 text-white/50 text-base max-w-xl mx-auto leading-relaxed">
            Testimonios reales de estudiantes que tome en mis clases anteriores.
            La misma energia y metodologia llega ahora a Academia Seul.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.6 + (i % 3) * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative glass rounded-2xl p-7 flex flex-col gap-4 hover:translate-y-[-4px] transition-transform duration-300"
              style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.06)' }}
            >
              <Quote
                size={28}
                className="text-seoul-red/40 flex-shrink-0"
                strokeWidth={2.5}
              />
              <p className="text-sm text-white/70 leading-relaxed italic flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="pt-4 border-t border-white/[0.06] flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm border-2 border-white/10"
                  style={{ background: t.color }}
                >
                  {t.initials}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-seoul-white leading-tight">
                    {t.name}
                  </div>
                  <div className="text-[11px] text-white/40 mt-0.5">
                    {t.course} · {t.level}
                  </div>
                </div>
                <StarRating />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
