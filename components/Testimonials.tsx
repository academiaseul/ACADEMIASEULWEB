'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 0,
    name: 'Isidora Figueroa',
    role: 'Estudiante · Nivel A1',
    initials: 'IF',
    stars: 5,
    quote: 'Para mi fue un gran profesor! Le entendí muy bien y era bueno explicando. Si alguien no entendía volvía a explicar. Sus clases eran muy divertidas y aprendimos muchas cosas sobre la cultura coreana.',
    course: 'Coreano Básico',
    achievement: 'Cultura coreana + idioma',
  },
  {
    id: 1,
    name: 'Nedielka Curkovic',
    role: 'Estudiante · Nivel A2',
    initials: 'NC',
    stars: 5,
    quote: 'Las clases son bastante entretenidas porque más que pasar solo contenido también nos enseña de otras cosas. Cuando le preguntamos un concepto nos cuenta una pequeña historia relacionada — así lo recuerdo más fácilmente.',
    course: 'Coreano Básico',
    achievement: 'Aprendizaje dinámico y cultural',
  },
  {
    id: 2,
    name: 'Carolina Morales',
    role: 'Estudiante · Nivel B1',
    initials: 'CM',
    stars: 5,
    quote: 'Excelente profesor. Siempre disponible para responder dudas dentro y fuera del horario de clases, además de explicar hasta que se entienda. Las clases son divertidas y entendibles. ¡Gracias profesor!',
    course: 'Coreano Intermedio',
    achievement: 'Atención personalizada',
  },
  {
    id: 3,
    name: 'Catalina Saavedra',
    role: 'Estudiante · Nivel A2',
    initials: 'CS',
    stars: 5,
    quote: 'Muy buen profesor, sus explicaciones son muy claras y siempre da distintos ejemplos. Además nos enseña sobre cultura y cosas típicas de Corea. También enseña con música, lo cual facilita mucho el oído y la pronunciación correcta.',
    course: 'Coreano Básico',
    achievement: 'Pronunciación perfecta con música',
  },
  {
    id: 4,
    name: 'Paulina Cerda',
    role: 'Estudiante · Nivel B1',
    initials: 'PC',
    stars: 5,
    quote: 'Clases claras y didácticas, con entrega de material adecuado para estudio. Se agradece el esfuerzo para fomentar la participación en clases y explicar reiteradamente en caso de dudas. Además la disposición para resolver dudas fuera del horario.',
    course: 'Coreano Intermedio',
    achievement: 'Material completo incluido',
  },
  {
    id: 5,
    name: 'Mariam',
    role: 'Estudiante · Nivel A1',
    initials: 'MA',
    stars: 5,
    quote: 'Jae Hee tiene muy buena disposición cuando alguien tiene una duda, complementa sus clases con cultura general y se dan espacios de confianza donde se pueden compartir experiencias.',
    course: 'Coreano Básico',
    achievement: 'Ambiente de confianza',
  },
  {
    id: 6,
    name: 'Valentina San Martín',
    role: 'Estudiante · Nivel A1',
    initials: 'VS',
    stars: 5,
    quote: 'Fue entretenido y entendí muy bien las clases. Tiene mucha paciencia y hace agradable el aprender.',
    course: 'Coreano Básico',
    achievement: 'Paciencia y dedicación',
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="fill-seoul-gold text-seoul-gold" />
      ))}
    </div>
  );
}

function Avatar({ initials, color }: { initials: string; color: string }) {
  return (
    <div
      className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-seoul-red/20 text-white font-bold text-lg"
      style={{ background: color }}
    >
      {initials}
    </div>
  );
}

const avatarColors = [
  '#C8001E', '#003478', '#D4AF37', '#C8001E', '#003478', '#D4AF37', '#C8001E',
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const prev = () => setActive((v) => (v - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((v) => (v + 1) % testimonials.length);

  const t = testimonials[active];

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative bg-seoul-white section-padding overflow-hidden"
    >
      {/* Decorative red strip */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-seoul-red to-transparent" />

      <div className="container-tight relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-seoul-red mb-4">
            Testimonios reales
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-seoul-black leading-tight">
            Lo que dicen
            <br />
            <em className="not-italic text-gradient-red">nuestros estudiantes</em>
          </h2>
        </motion.div>

        {/* Main testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative bg-white rounded-3xl shadow-xl shadow-black/5 border border-black/[0.05] p-10 md:p-14 overflow-hidden">
            {/* Quote icon */}
            <Quote
              size={60}
              className="absolute top-8 right-10 text-seoul-red/10 rotate-180"
              fill="currentColor"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Stars */}
                <div className="mb-6">
                  <StarRating count={t.stars} />
                </div>

                {/* Quote text */}
                <blockquote className="text-xl md:text-2xl text-seoul-black/80 leading-relaxed font-medium mb-8">
                  "{t.quote}"
                </blockquote>

                {/* Author row */}
                <div className="flex items-center gap-4">
                  <Avatar initials={t.initials} color={avatarColors[t.id]} />
                  <div className="flex-1">
                    <div className="font-bold text-seoul-black text-base">{t.name}</div>
                    <div className="text-sm text-seoul-black/50">{t.role}</div>
                  </div>
                  <div className="hidden md:flex flex-col items-end gap-1">
                    <span className="text-xs bg-seoul-red/10 text-seoul-red font-semibold px-3 py-1 rounded-full">
                      {t.course}
                    </span>
                    <span className="text-xs text-seoul-black/40">✓ {t.achievement}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8 px-2">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === active
                      ? 'w-8 h-2 bg-seoul-red'
                      : 'w-2 h-2 bg-black/15 hover:bg-black/30'
                  }`}
                  aria-label={`Testimonio ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-3">
              <button
                onClick={prev}
                className="w-11 h-11 rounded-full border border-black/10 flex items-center justify-center hover:border-seoul-red hover:text-seoul-red text-black/50 transition-all duration-200 hover:bg-seoul-red/5"
                aria-label="Anterior"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-11 h-11 rounded-full bg-seoul-red text-white flex items-center justify-center hover:bg-red-700 transition-colors duration-200 shadow-lg shadow-seoul-red/20"
                aria-label="Siguiente"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Rating summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-14 flex flex-col items-center gap-4"
        >
          <div className="flex -space-x-3">
            {testimonials.slice(0, 7).map((t) => (
              <div
                key={t.id}
                className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                style={{ background: avatarColors[t.id], zIndex: 7 - t.id }}
              >
                {t.initials}
              </div>
            ))}
          </div>
          <div className="text-center">
            <div className="flex items-center gap-1.5 justify-center mb-1">
              <StarRating count={5} />
              <span className="text-sm font-bold text-seoul-black">5.0</span>
            </div>
            <p className="text-xs text-seoul-black/50">
              Basado en +16 reseñas verificadas de estudiantes reales
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
