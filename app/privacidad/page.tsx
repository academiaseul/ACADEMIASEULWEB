import Link from 'next/link';
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Política de Privacidad | Academia Seúl',
  description:
    'Política de privacidad y tratamiento de datos personales de Academia Seúl.',
};

export default function Privacidad() {
  return (
    <main className="min-h-screen bg-seoul-black text-white">
      <Navigation solid />
      <div className="max-w-3xl mx-auto pt-32 pb-20 px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/40 hover:text-seoul-red text-sm mb-8 transition-colors"
        >
          ← Volver al inicio
        </Link>

        <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-seoul-red mb-4">
          Legal
        </span>
        <h1 className="font-serif text-4xl md:text-5xl text-seoul-white leading-tight mb-3">
          Política de <span className="text-gradient-red">Privacidad</span>
        </h1>
        <p className="text-white/40 text-sm mb-12">
          Última actualización: mayo 2026
        </p>

        <div className="space-y-10 text-white/70 leading-relaxed text-[15px]">
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-seoul-white mb-3">
              1. Quiénes somos
            </h2>
            <p>
              Academia Seúl (en adelante &ldquo;la Academia&rdquo;, &ldquo;nosotros&rdquo;)
              es una academia online de coreano para hispanohablantes, fundada y operada
              por Jae Hee Kim, con domicilio en Santiago de Chile.
            </p>
            <p className="mt-3">
              Contacto:{' '}
              <a
                href="mailto:hola@academiaseul.com"
                className="text-seoul-red hover:underline"
              >
                hola@academiaseul.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-seoul-white mb-3">
              2. Qué información recopilamos
            </h2>
            <p>Cuando interactúas con Academia Seúl, podemos recopilar:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                <strong>Datos de identificación:</strong> nombre, correo electrónico,
                ciudad, edad, país de residencia.
              </li>
              <li>
                <strong>Datos de contacto:</strong> número de WhatsApp si decides
                comunicarte con nosotros.
              </li>
              <li>
                <strong>Datos de aprendizaje:</strong> nivel actual de coreano, motivación
                para aprender, intereses culturales.
              </li>
              <li>
                <strong>Datos de pago:</strong> procesados por terceros (Stripe, Mercado
                Pago, PayPal). Nosotros no almacenamos información de tarjetas.
              </li>
              <li>
                <strong>Datos de navegación:</strong> cookies, dirección IP, dispositivo y
                comportamiento en el sitio (Vercel Analytics, Meta Pixel si activo).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-seoul-white mb-3">
              3. Para qué usamos tu información
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Confirmar tu inscripción al taller gratuito y/o a los cursos.</li>
              <li>Enviarte el material del curso y notificaciones de clases.</li>
              <li>
                Comunicarte ofertas, contenido educativo y novedades de Academia Seúl
                (siempre puedes darte de baja).
              </li>
              <li>
                Mejorar nuestros cursos y experiencia web mediante análisis agregado.
              </li>
              <li>Cumplir con obligaciones legales y tributarias.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-seoul-white mb-3">
              4. Compartimos información con terceros
            </h2>
            <p>
              Solo con servicios necesarios para operar Academia Seúl. Estos terceros
              tienen sus propias políticas de privacidad:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                <strong>Formspree:</strong> procesamiento de formularios de contacto e
                inscripción.
              </li>
              <li>
                <strong>Vercel:</strong> hosting y analytics del sitio web.
              </li>
              <li>
                <strong>Zoom:</strong> plataforma de clases en vivo.
              </li>
              <li>
                <strong>Procesadores de pago:</strong> Stripe, Mercado Pago, PayPal según
                tu elección.
              </li>
              <li>
                <strong>Plataforma de email:</strong> Mailerlite / Systeme.io para envío de
                comunicaciones.
              </li>
            </ul>
            <p className="mt-3">
              No vendemos ni cedemos tu información personal a terceros con fines
              comerciales ajenos a Academia Seúl.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-seoul-white mb-3">
              5. Tus derechos
            </h2>
            <p>De acuerdo con la legislación aplicable (Ley 19.628 en Chile, LGPD en Brasil,
            LFPDPPP en México, RGPD si estás en la UE), tienes derecho a:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Acceder a los datos personales que tenemos sobre ti.</li>
              <li>Solicitar la rectificación o actualización de tus datos.</li>
              <li>Solicitar la eliminación de tus datos.</li>
              <li>Oponerte al uso de tus datos para marketing.</li>
              <li>Solicitar la portabilidad de tus datos a otro servicio.</li>
            </ul>
            <p className="mt-3">
              Para ejercer cualquier derecho, escríbenos a{' '}
              <a
                href="mailto:hola@academiaseul.com"
                className="text-seoul-red hover:underline"
              >
                hola@academiaseul.com
              </a>{' '}
              y responderemos en un plazo máximo de 30 días.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-seoul-white mb-3">
              6. Cookies
            </h2>
            <p>
              Usamos cookies propias y de terceros para mejorar tu experiencia, recordar
              tus preferencias y analizar el tráfico del sitio. Al navegar Academia Seúl
              aceptas su uso. Puedes deshabilitarlas desde la configuración de tu
              navegador, aunque algunas funcionalidades podrían dejar de funcionar.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-seoul-white mb-3">
              7. Seguridad
            </h2>
            <p>
              Aplicamos medidas técnicas y organizativas razonables para proteger tu
              información. Sin embargo, ningún sistema en línea es 100% seguro y no
              podemos garantizar protección absoluta frente a ataques externos.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-seoul-white mb-3">
              8. Menores de edad
            </h2>
            <p>
              Nuestros servicios están dirigidos a personas de 14 años o más. Si tienes
              entre 14 y 18 años, necesitas autorización de tu padre, madre o tutor para
              inscribirte. No recopilamos conscientemente datos de menores de 14 años.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-seoul-white mb-3">
              9. Cambios a esta política
            </h2>
            <p>
              Podemos actualizar esta política para reflejar mejoras del servicio o
              cambios legales. Te notificaremos por email o en el sitio cualquier cambio
              significativo.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-seoul-white mb-3">
              10. Contacto
            </h2>
            <p>
              Si tienes preguntas sobre esta política o sobre el manejo de tus datos,
              escríbenos:
            </p>
            <p className="mt-3">
              📧{' '}
              <a
                href="mailto:hola@academiaseul.com"
                className="text-seoul-red hover:underline"
              >
                hola@academiaseul.com
              </a>
            </p>
            <p className="mt-1">
              📍 Academia Seúl · Santiago de Chile
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.08] text-center">
          <Link
            href="/terminos"
            className="text-sm text-white/50 hover:text-seoul-red transition-colors"
          >
            Ver Términos y Condiciones →
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
