'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, FileText, CheckCircle2 } from 'lucide-react';

const PDF_FILE_URL = '/Guia_Alfabeto_Coreano_Hangul.pdf';

export default function LeadMagnet() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const [formData, setFormData] = useState({ nombre: '', email: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!formData.nombre || !formData.email) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('https://formspree.io/f/mzdypyky', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          _subject: 'Descarga PDF Guia del Alfabeto Coreano',
          recurso: 'Guia del Alfabeto Coreano - Hangul (PDF)',
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        // Trigger automatic download
        const link = document.createElement('a');
        link.href = PDF_FILE_URL;
        link.download = 'Guia-Alfabeto-Coreano-Hangul.pdf';
        link.click();
      } else {
        setError('Hubo un problema. Intenta nuevamente.');
      }
    } catch {
      setError('Hubo un problema. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="recursos"
      ref={ref}
      className="relative bg-seoul-black section-padding overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-seoul-red/8 rounded-full blur-3xl pointer-events-none" />

      {/* Hangul watermark */}
      <div
        aria-hidden
        className="absolute right-8 top-1/2 -translate-y-1/2 text-[14rem] font-black text-white/[0.02] leading-none select-none pointer-events-none font-korean"
      >
        {'무료'}
      </div>

      <div className="container-tight relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: PDF mockup */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center lg:justify-start"
          >
            <div className="relative">
              {/* PDF cover */}
              <div
                className="relative w-64 md:w-80 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-seoul-red/30"
                style={{
                  background:
                    'linear-gradient(180deg, #0a0a0f 0%, #1a0a15 100%)',
                  border: '1px solid rgba(200,0,30,0.3)',
                }}
              >
                {/* Cover content */}
                <div className="absolute inset-0 p-7 flex flex-col">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-seoul-red font-bold">
                    Academia Seul
                  </div>

                  <div className="font-korean font-black text-seoul-red leading-none mt-5" style={{ fontSize: '4.5rem' }}>
                    {'한글'}
                  </div>

                  <div className="font-serif text-3xl md:text-4xl text-seoul-white leading-tight mt-4">
                    Guia del <br /> alfabeto
                  </div>

                  <div className="text-xs text-white/45 mt-2 leading-relaxed">
                    aprende a leer desde cero
                  </div>

                  <div className="mt-auto">
                    <div className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Por</div>
                    <div className="text-sm text-seoul-white font-bold">Jay Chingu</div>
                    <div className="text-[10px] text-white/40 mt-1">Edicion 2026 - Vol 01</div>
                  </div>
                </div>

                {/* Top right corner badge */}
                <div className="absolute top-5 right-5 bg-seoul-red text-white text-[10px] font-bold tracking-widest px-3 py-1 rounded-full">
                  GRATIS
                </div>
              </div>

              {/* Floating second page hint */}
              <div
                aria-hidden
                className="absolute -bottom-3 -right-3 w-56 md:w-64 aspect-[3/4] rounded-2xl bg-white/[0.04] border border-white/10 -z-10 rotate-3"
              />
              <div
                aria-hidden
                className="absolute -bottom-6 -right-6 w-52 md:w-60 aspect-[3/4] rounded-2xl bg-white/[0.02] border border-white/[0.06] -z-20 rotate-6"
              />
            </div>
          </motion.div>

          {/* Right: Content + form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-seoul-red mb-4">
              Recurso gratis
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-seoul-white leading-tight mb-5">
              Descarga tu guia del <br />
              <span className="text-gradient-red">alfabeto coreano</span>
            </h2>
            <p className="text-base text-white/55 leading-relaxed mb-7 max-w-md">
              Todas las letras del Hangul en una sola hoja: las 14 consonantes y las 10 vocales
              con su pronunciacion, como se arma una silaba y tus primeras palabras. Aprende a leer
              coreano desde cero.
            </p>

            {/* Bullets */}
            <ul className="space-y-3 mb-8">
              {[
                'Las 14 consonantes y las 10 vocales con su sonido',
                'Como se arma una silaba (ㄱ + ㅏ = 가)',
                'Las vocales segun cielo, tierra y persona (천지인)',
                'Tus primeras palabras sin batchim para leer ya',
                'Todo en una sola hoja, lista para imprimir',
              ].map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-seoul-red flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-white/70 leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Form */}
            {!submitted ? (
              <div className="space-y-3 max-w-md">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    placeholder="Tu nombre"
                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-seoul-white placeholder:text-white/30 focus:border-seoul-red focus:outline-none transition-colors text-sm"
                  />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Tu email"
                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-seoul-white placeholder:text-white/30 focus:border-seoul-red focus:outline-none transition-colors text-sm"
                  />
                </div>

                {error && (
                  <div className="bg-seoul-red/10 border border-seoul-red/30 rounded-lg p-3 text-seoul-red text-xs">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={loading || !formData.nombre || !formData.email}
                  className="group w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-seoul-red hover:bg-seoul-red-muted disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl transition-all duration-300"
                >
                  <Download size={18} />
                  <span>{loading ? 'Enviando...' : 'Descargar PDF gratis'}</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-200">{'->'}</span>
                </button>

                <p className="text-[11px] text-white/35 text-center">
                  Sin spam. Te enviamos el PDF + tips esporadicos de coreano.
                </p>
              </div>
            ) : (
              <div className="max-w-md p-6 rounded-2xl bg-seoul-red/10 border border-seoul-red/30">
                <div className="flex items-start gap-3 mb-3">
                  <FileText size={24} className="text-seoul-red flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-lg font-bold text-seoul-white mb-1">
                      Listo, {formData.nombre}! 💜
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed">
                      Tu PDF ya esta descargando. Tambien te lo enviamos al email por si lo necesitas despues.
                    </p>
                  </div>
                </div>
                <a
                  href={PDF_FILE_URL}
                  download
                  className="inline-flex items-center gap-2 text-sm font-semibold text-seoul-red hover:underline"
                >
                  <Download size={14} />
                  Descargar de nuevo
                </a>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
