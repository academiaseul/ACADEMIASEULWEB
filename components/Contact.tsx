'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, Instagram, MessageCircle, MapPin, Facebook } from 'lucide-react';
import clsx from 'clsx';

const levels = ['Principiante (sin experiencia)', 'Básico A1-A2', 'Intermedio B1-B2', 'Avanzado C1-C2', 'No sé mi nivel'];
const interests = ['Coreano General', 'K-pop / K-drama', 'Conversación', 'Preparación TOPIK', 'Viaje a Corea', 'Negocios en coreano'];

const CONTACT_PHONE_DISPLAY = '+56 9 4211 5562';
const CONTACT_EMAIL = 'hola.academiaseul@gmail.com';
const WHATSAPP_URL =
  'https://wa.me/56942115562?text=Hola%20Jay!%20Quiero%20apuntarme%20al%20taller%20gratuito%20de%20Hangul%20(mi%20clase%20de%20prueba)';

// Brand (academy) channel — used in the contact info card
const INSTAGRAM_URL = 'https://www.instagram.com/academiaseul/';

// Personal channels (jaychingu.oficial) — used in the "Síguenos" row
const PERSONAL_INSTAGRAM_URL = 'https://www.instagram.com/jaychingu.oficial/';
const TIKTOK_URL = 'https://www.tiktok.com/@jaychingu.oficial';
const FACEBOOK_URL = 'https://www.facebook.com/jaychingu.oficial';

// TikTok isn't included in lucide-react, so we use a small inline SVG
const TikTokIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.8a8.16 8.16 0 0 0 4.77 1.52V6.87a4.85 4.85 0 0 1-1.84-.18z" />
  </svg>
);

type FormData = {
  nombre: string;
  email: string;
  telefono: string;
  nivel: string;
  interes: string;
  mensaje: string;
};

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState<FormData>({
    nombre: '', email: '', telefono: '', nivel: '', interes: '', mensaje: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('https://formspree.io/f/mzdypyky', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError('Hubo un problema al enviar tu mensaje. Por favor intenta nuevamente.');
      }
    } catch {
      setError('Hubo un problema al enviar tu mensaje. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = clsx(
    'w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3.5 text-seoul-white text-sm',
    'placeholder:text-white/25 focus:outline-none focus:border-seoul-red/60 focus:bg-white/[0.05]',
    'transition-all duration-200',
  );

  return (
    <section
      id="contact"
      ref={ref}
      className="relative bg-seoul-black section-padding overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-seoul-red/5 blur-3xl pointer-events-none" />

      <div className="container-tight relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-seoul-red mb-4">
            Contáctanos
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-seoul-white leading-tight max-w-2xl">
            Tu primera clase
            <br />
            <span className="text-gradient-red">es completamente gratis</span>
          </h2>
          <p className="mt-5 text-base text-white/45 max-w-md leading-relaxed">
            Déjanos tus datos y te escribimos en menos de 24 h para agendar tu clase.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="glass rounded-2xl p-12 text-center"
              >
                <div className="text-5xl mb-6">🎉</div>
                <h3 className="text-2xl font-bold text-seoul-white mb-3">¡Mensaje recibido!</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  Te escribimos en las próximas 24 h para agendar tu clase gratis. ¡Hasta pronto!
                </p>
                <p className="mt-4 text-2xl font-korean text-white/20">안녕히 계세요 👋</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-white/40 mb-2 tracking-wider uppercase">Nombre completo *</label>
                    <input name="nombre" value={form.nombre} onChange={handleChange} required placeholder="Ej. María González" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/40 mb-2 tracking-wider uppercase">Teléfono / WhatsApp</label>
                    <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="+56 9 xxxx xxxx" className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/40 mb-2 tracking-wider uppercase">Correo electrónico *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder={CONTACT_EMAIL} className={inputClass} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-white/40 mb-2 tracking-wider uppercase">Nivel actual</label>
                    <select name="nivel" value={form.nivel} onChange={handleChange} className={clsx(inputClass, 'cursor-pointer')}>
                      <option value="" disabled>Selecciona un nivel</option>
                      {levels.map((l) => (<option key={l} value={l} className="bg-seoul-black">{l}</option>))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/40 mb-2 tracking-wider uppercase">Me interesa</label>
                    <select name="interes" value={form.interes} onChange={handleChange} className={clsx(inputClass, 'cursor-pointer')}>
                      <option value="" disabled>Selecciona un interés</option>
                      {interests.map((i) => (<option key={i} value={i} className="bg-seoul-black">{i}</option>))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/40 mb-2 tracking-wider uppercase">Mensaje (opcional)</label>
                  <textarea name="mensaje" value={form.mensaje} onChange={handleChange} rows={4} placeholder="Cuéntanos sobre tus objetivos, disponibilidad o cualquier pregunta..." className={clsx(inputClass, 'resize-none')} />
                </div>

                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">{error}</div>
                )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.01 }}
                  whileTap={{ scale: loading ? 1 : 0.99 }}
                  className="w-full py-4 bg-seoul-red hover:bg-red-600 text-white font-bold text-base rounded-lg transition-all duration-200 shadow-xl shadow-seoul-red/25 hover:shadow-seoul-red/40 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? 'Enviando...' : 'Reservar mi clase gratis →'}
                </motion.button>

                <p className="text-xs text-white/25 text-center leading-relaxed">
                  Al enviar aceptas ser contactado por Academia Seúl. No compartimos tus datos.
                </p>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="space-y-5">
              <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest">Información de contacto</h3>
              {[
                { icon: Phone,     label: 'Teléfono / WhatsApp', value: CONTACT_PHONE_DISPLAY,          href: 'tel:+56942115562' },
                { icon: Mail,      label: 'Email',               value: CONTACT_EMAIL,                   href: `mailto:${CONTACT_EMAIL}` },
                { icon: Instagram, label: 'Instagram',           value: '@academiaseul',                 href: INSTAGRAM_URL },
                { icon: MapPin,    label: 'Dirección',           value: 'Magdalena 140, Las Condes\nSantiago, Chile', href: 'https://maps.google.com/?q=Magdalena+140+Las+Condes+Santiago' },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-seoul-red/10 border border-seoul-red/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={16} className="text-seoul-red" />
                  </div>
                  <div>
                    <div className="text-xs text-white/30 uppercase tracking-wider mb-0.5">{label}</div>
                    <a href={href} target={label === 'Dirección' ? '_blank' : undefined} rel={label === 'Dirección' ? 'noopener noreferrer' : undefined} className="text-sm text-white/70 whitespace-pre-line leading-relaxed hover:text-seoul-red transition-colors">
                      {value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-4">Síguenos</h3>
              <div className="flex gap-3 flex-wrap">
                <a
                  href={PERSONAL_INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-lg glass flex items-center justify-center text-white/50 hover:text-seoul-red hover:border-seoul-red/30 transition-all duration-200"
                  aria-label="Instagram @jaychingu.oficial"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href={TIKTOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-lg glass flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all duration-200"
                  aria-label="TikTok @jaychingu.oficial"
                >
                  <TikTokIcon size={18} />
                </a>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-lg glass flex items-center justify-center text-white/50 hover:text-blue-400 hover:border-blue-400/30 transition-all duration-200"
                  aria-label="Facebook jaychingu.oficial"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-lg glass flex items-center justify-center text-white/50 hover:text-green-400 hover:border-green-400/30 transition-all duration-200"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={18} />
                </a>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="w-11 h-11 rounded-lg glass flex items-center justify-center text-white/50 hover:text-seoul-red hover:border-seoul-red/30 transition-all duration-200"
                  aria-label="Email"
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>

            <div className="glass-red rounded-xl p-6">
              <h3 className="text-sm font-semibold text-seoul-red mb-4 uppercase tracking-widest">Horarios de atención</h3>
              <div className="space-y-2">
                {[
                  { day: 'Lunes – Viernes', hours: '10:00 – 20:00' },
                  { day: 'Sábados',         hours: '10:00 – 14:00' },
                  { day: 'Domingos',        hours: 'Cerrado' },
                ].map(({ day, hours }) => (
                  <div key={day} className="flex justify-between text-sm">
                    <span className="text-white/50">{day}</span>
                    <span className="text-white/80 font-medium">{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full py-4 px-5 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl transition-colors duration-200 text-sm">
              <MessageCircle size={20} />
              Escríbenos por WhatsApp
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
