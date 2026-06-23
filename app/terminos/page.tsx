import Link from 'next/link';
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Academia Seúl',
  description:
    'Términos y condiciones de uso de los servicios y cursos de Academia Seúl.',
};

export default function Terminos() {
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
          Términos y <span className="text-gradient-red">Condiciones</span>
        </h1>
        <p className="text-white/40 text-sm mb-12">
          Última actualización: mayo 2026
        </p>

        <div className="space-y-10 text-white/70 leading-relaxed text-[15px]">
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-seoul-white mb-3">
              1. Aceptación de los términos
            </h2>
            <p>
              Al inscribirte en cualquier curso, taller o servicio de Academia Seúl
              (operado por Jae Hee Kim, Santiago de Chile), aceptas estos términos y
              condiciones en su totalidad.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-seoul-white mb-3">
              2. Servicios ofrecidos
            </h2>
            <p>
              Academia Seúl ofrece cursos de idioma coreano en distintos niveles, talleres
              gratuitos y material educativo, principalmente bajo modalidad online en
              vivo por Zoom y, eventualmente, material complementario descargable.
            </p>
            <p className="mt-3">
              Los cursos se imparten en español, dirigidos a hispanohablantes de Chile,
              Latinoamérica y España.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-seoul-white mb-3">
              3. Inscripción y pago
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                La inscripción a cursos pagados requiere completar el formulario
                correspondiente y realizar el pago según el método elegido
                (tarjeta crédito/débito, transferencia bancaria, Mercado Pago, PayPal).
              </li>
              <li>
                Los precios están publicados en USD o CLP según corresponda y pueden
                variar según la cohorte o el plan elegido.
              </li>
              <li>
                Tu cupo queda confirmado únicamente cuando recibimos el pago completo o
                la reserva acordada.
              </li>
              <li>
                Los cupos son limitados por cohorte. Se asignan por orden de inscripción.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-seoul-white mb-3">
              4. Política de reembolso
            </h2>
            <p>
              El precio de lanzamiento del Nivel 1 es de{' '}
              <strong>$89 USD / $85.000 CLP</strong> (pago único). Sobre los pagos:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                El cupo se confirma una vez registrado el pago. Por tratarse de un grupo
                con cupos limitados, el pago no es reembolsable una vez iniciada la cohorte.
              </li>
              <li>
                Si por algún motivo no puedes continuar, escríbenos a{' '}
                <a
                  href="mailto:hola@academiaseul.com"
                  className="text-seoul-red hover:underline"
                >
                  hola@academiaseul.com
                </a>{' '}
                y buscamos juntos una solución, como tu traslado a una cohorte posterior.
              </li>
              <li>
                Si Academia Seúl cancela una cohorte antes de su inicio, se reembolsa el
                100% de lo pagado.
              </li>
              <li>
                El taller gratuito no genera obligación económica de ninguna parte: es 100%
                gratuito.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-seoul-white mb-3">
              5. Cambios de cohorte y reprogramación
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Puedes solicitar cambio de cohorte (de A a B o viceversa) en cualquier
                momento, sujeto a disponibilidad de cupo.
              </li>
              <li>
                Las clases en vivo se graban y quedan disponibles durante el curso, así
                que puedes verlas si pierdes una sesión.
              </li>
              <li>
                Si Academia Seúl debe cancelar o reprogramar una clase, lo comunicaremos
                con la mayor anticipación posible y se ofrecerá una sesión de reposición
                o grabación.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-seoul-white mb-3">
              6. Asistencia y certificado
            </h2>
            <p>
              El certificado del Nivel 1 (o cualquier curso pagado) se entrega por
              participación:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                Recibes tu certificado de Academia Seúl por participar en las clases de la
                cohorte (equivalente a CEFR A1 / TOPIK 초급 1).
              </li>
              <li>
                Se considera tu asistencia y participación en las clases en vivo o grabadas
                a lo largo del curso.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-seoul-white mb-3">
              7. Propiedad intelectual
            </h2>
            <p>
              Todo el material entregado en Academia Seúl (PDFs, grabaciones, slides,
              ejercicios, método Chingu™, marca y logos) es propiedad intelectual de Jae
              Hee Kim / Academia Seúl. Se otorga al estudiante uso personal y no
              transferible para fines educativos.
            </p>
            <p className="mt-3">
              Queda prohibido reproducir, distribuir, vender, modificar o compartir el
              material a terceros sin autorización escrita.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-seoul-white mb-3">
              8. Código de conducta
            </h2>
            <p>
              Academia Seúl fomenta un ambiente de respeto, curiosidad y comunidad. Se
              prohíbe:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Comportamientos discriminatorios, ofensivos o de acoso hacia otros estudiantes o profesores.</li>
              <li>Compartir contenido inapropiado en clases, Discord o WhatsApp del curso.</li>
              <li>Grabar las clases con fines distintos al estudio personal.</li>
            </ul>
            <p className="mt-3">
              El incumplimiento puede resultar en suspensión del acceso al curso sin
              derecho a reembolso del tiempo ya transcurrido.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-seoul-white mb-3">
              9. Limitación de responsabilidad
            </h2>
            <p>
              Academia Seúl entrega un servicio educativo de calidad, pero no garantiza
              resultados de aprendizaje específicos, ya que dependen del esfuerzo y
              dedicación personal de cada estudiante.
            </p>
            <p className="mt-3">
              Tampoco somos responsables por interrupciones técnicas externas (caída de
              Zoom, internet del estudiante, etc.), aunque haremos lo posible por
              compensar con grabaciones o sesiones alternativas.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-seoul-white mb-3">
              10. Modificaciones a los términos
            </h2>
            <p>
              Podemos actualizar estos términos para reflejar mejoras del servicio,
              cambios legales o de mercado. Te notificaremos por email o en el sitio
              cualquier cambio significativo. El uso continuado de los servicios después
              de las actualizaciones implica aceptación de los nuevos términos.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-seoul-white mb-3">
              11. Legislación aplicable
            </h2>
            <p>
              Estos términos se rigen por la legislación de la República de Chile. Para
              cualquier disputa, las partes se someten a la jurisdicción de los tribunales
              ordinarios de Santiago, Chile.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-seoul-white mb-3">
              12. Contacto
            </h2>
            <p>
              Para cualquier consulta sobre estos términos:
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
            href="/privacidad"
            className="text-sm text-white/50 hover:text-seoul-red transition-colors"
          >
            Ver Política de Privacidad →
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
