import { Instagram, Youtube, Facebook, MessageCircle } from 'lucide-react';

const INSTAGRAM_URL = 'https://www.instagram.com/academiaseul/';
const WHATSAPP_URL =
  'https://wa.me/56942115562?text=Hola,%20me%20interesa%20una%20clase%20de%20prueba%20gratuita%20en%20Academia%20Seúl';

const footerLinks = {
  Cursos: [
    { label: 'Básico A1-A2',       href: '#courses' },
    { label: 'Intermedio B1-B2',   href: '#courses' },
    { label: 'Avanzado C1-C2',     href: '#courses' },
    { label: 'K-pop & K-drama',    href: '#courses' },
    { label: 'Conversación',       href: '#courses' },
    { label: 'Preparación TOPIK',  href: '#courses' },
  ],
  Academia: [
    { label: 'Sobre nosotros',     href: '#about'   },
    { label: 'Nuestro método',     href: '#about'   },
    { label: 'Testimonios',        href: '#testimonials' },
    { label: 'Cultura coreana',    href: '#culture' },
  ],
  Legal: [
    { label: 'Política de privacidad', href: '#' },
    { label: 'Términos y condiciones', href: '#' },
    { label: 'Política de cookies',    href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-seoul-black border-t border-white/[0.05]">
      <div className="container-tight py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#hero" className="flex items-center gap-3 group mb-5">
              <img
                src="/logo-tiger-red.png"
                alt="Academia Seúl"
                className="h-11 w-11 object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <img
                src="/logo-text-red.png"
                alt="Academia Seúl"
                className="h-8 w-auto object-contain group-hover:opacity-80 transition-opacity duration-300"
              />
            </a>

            <p className="text-sm text-white/40 leading-relaxed max-w-xs mb-3">
              La academia de coreano más premium de Santiago. Profesores nativos,
              metodología moderna y una comunidad apasionada por la cultura coreana.
            </p>

            <p className="text-sm text-white/30 leading-relaxed max-w-xs mb-6">
              📍 Magdalena 140, Las Condes, Santiago
            </p>

            <div className="flex gap-3">
              {[
                { icon: Instagram, href: INSTAGRAM_URL, label: 'Instagram @academiaseul', external: true },
                { icon: Youtube, href: '#', label: 'YouTube', external: false },
                { icon: Facebook, href: '#', label: 'Facebook', external: false },
                { icon: MessageCircle, href: WHATSAPP_URL, label: 'WhatsApp', external: true },
              ].map(({ icon: Icon, href, label, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/[0.05] hover:bg-seoul-red/20 hover:text-seoul-red text-white/40 flex items-center justify-center transition-all duration-200 border border-white/[0.06]"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-5">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/50 hover:text-seoul-white transition-colors duration-150"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Academia Seúl. Todos los derechos reservados.
          </p>
          <p className="text-xs text-white/20 font-korean">
            한국어 교육의 미래 · El futuro de la enseñanza del coreano
          </p>
        </div>
      </div>
    </footer>
  );
}
