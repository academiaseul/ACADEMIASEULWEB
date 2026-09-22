'use client';

import { Instagram, Youtube, Facebook, MessageCircle } from 'lucide-react';
import { useT, i18n } from '@/lib/i18n';

const INSTAGRAM_URL = 'https://www.instagram.com/academiaseul/';
const YOUTUBE_URL = 'https://www.youtube.com/@JayChingu.Oficial';
const FACEBOOK_URL = 'https://www.facebook.com/jaychingu.oficial';

// Títulos y labels marcados con i18n(); se traducen al renderizar con t().
const footerLinks = [
  {
    title: i18n('Cursos'),
    links: [
      { label: i18n('Básico 1 (A1.1)'),        href: '/programa#a11' },
      { label: i18n('Básico 2 (A1.2)'),        href: '/programa#a12' },
      { label: i18n('Conversacional 1 (A2.1)'), href: '/programa#a21' },
      { label: i18n('TOPIK II (B1+)'),         href: '/programa#topik2' },
      { label: i18n('Coreano para Niños'),     href: '/programa#ninos' },
      { label: i18n('Inscripción octubre 2026'), href: '/nivel-1#clases' },
    ],
  },
  {
    title: i18n('Academia'),
    links: [
      { label: i18n('Sobre nosotros'),         href: '/sobre' },
      { label: i18n('Nuestro método'),         href: '/#metodo' },
      { label: i18n('Estudiantes reales'),     href: '/#testimonials' },
      { label: i18n('Blog'),                   href: '/blog' },
      { label: i18n('Programa y syllabus'),    href: '/programa' },
    ],
  },
  {
    title: i18n('Gratis'),
    links: [
      { label: i18n('Dubu · el puzzle del Hangul'), href: '/dubu' },
      { label: i18n('Lector de Hangul'),           href: '/lector-coreano' },
      { label: i18n('Taller gratis (video)'),        href: '/taller' },
      { label: i18n('Test de nivel'),              href: '/test-nivel' },
      { label: i18n('Guías y recursos'),           href: '/recursos' },
    ],
  },
  {
    title: i18n('Legal'),
    links: [
      { label: i18n('Política de privacidad'), href: '/privacidad' },
      { label: i18n('Términos y condiciones'), href: '/terminos' },
    ],
  },
];

export default function Footer() {
  const { t } = useT();
  const whatsappUrl =
    'https://wa.me/56942115562?text=' +
    encodeURIComponent(t('Hola Jay! Vi academiaseul.com y quiero información sobre los cursos de coreano.'));

  return (
    <footer className="bg-seoul-black border-t border-white/[0.05]">
      <div className="container-tight py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-16">
          <div className="lg:col-span-2">
            <a href="/#hero" className="flex items-center gap-3 group mb-5">
              <img
                src="/logo-tiger-red.png"
                alt="Academia Seul"
                className="h-11 w-11 object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <img
                src="/logo-text-red.png"
                alt="Academia Seul"
                className="h-8 w-auto object-contain group-hover:opacity-80 transition-opacity duration-300"
              />
            </a>

            <p className="text-base font-semibold text-seoul-white mb-3">
              {t('Aprende coreano con un')} <span className="text-seoul-red">chingu</span>.
            </p>

            <p className="text-sm text-white/40 leading-relaxed max-w-xs mb-3">
              {t('Academia online de coreano para hispanohablantes. Profesores nativos, método Chingu y una comunidad apasionada por la cultura coreana.')}
            </p>

            <p className="text-sm text-white/30 leading-relaxed max-w-xs mb-6">
              {t('Santiago, Chile · Clases online por Zoom')}
            </p>

            <div className="flex gap-3">
              {[
                { icon: Instagram, href: INSTAGRAM_URL, label: 'Instagram', external: true },
                { icon: Youtube, href: YOUTUBE_URL, label: 'YouTube', external: true },
                { icon: Facebook, href: FACEBOOK_URL, label: 'Facebook', external: true },
                { icon: MessageCircle, href: whatsappUrl, label: 'WhatsApp', external: true },
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

          {footerLinks.map(({ title, links }) => (
            <div key={title}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-5">
                {t(title)}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/50 hover:text-seoul-white transition-colors duration-150"
                    >
                      {t(link.label)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            {t('© {y} Academia Seúl. Todos los derechos reservados.', { y: new Date().getFullYear() })}
          </p>
          <p className="text-xs text-white/20">
            {t('El futuro de la enseñanza del coreano')}
          </p>
        </div>
      </div>
    </footer>
  );
}
