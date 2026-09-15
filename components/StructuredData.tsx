import { CLASES, CURSOS, INICIO_ISO, PRECIO_UNICO } from '@/lib/nivel1';

const BASE = 'https://www.academiaseul.com';

const organization = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  '@id': `${BASE}/#organization`,
  name: 'Academia Seúl',
  alternateName: 'Academia Seul',
  url: BASE,
  logo: `${BASE}/logo.png`,
  description:
    'Academia online de idioma coreano con clases en vivo para hispanohablantes de Latinoamérica y España. Método Chingu, grupos pequeños y profesores nativos.',
  sameAs: [
    'https://www.instagram.com/academiaseul',
    'https://www.instagram.com/jaychingu.oficial',
    'https://www.tiktok.com/@jaychingu.oficial',
  ],
  areaServed: ['Latin America', 'Spain', 'United States'],
  knowsLanguage: ['es', 'ko'],
};

// Un Course por curso del catálogo, con sus instancias (clases) de la cohorte.
const courses = CURSOS.map((curso) => ({
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: `Coreano · ${curso.nombre}`,
  description: curso.descripcion,
  inLanguage: 'es',
  url: `${BASE}/programa#${curso.cursoId}`,
  provider: {
    '@type': 'EducationalOrganization',
    name: 'Academia Seúl',
    sameAs: BASE,
  },
  hasCourseInstance: CLASES.filter((c) => c.cursoId === curso.cursoId).map((c) => ({
    '@type': 'CourseInstance',
    courseMode: 'online',
    courseWorkload: 'PT8H',
    courseSchedule: {
      '@type': 'Schedule',
      repeatFrequency: 'P1W',
      repeatCount: 8,
      startDate: INICIO_ISO,
      byDay: c.dia,
      startTime: c.horaChile,
      scheduleTimezone: 'America/Santiago',
    },
    instructor: { '@type': 'Person', name: c.profe },
    location: { '@type': 'VirtualLocation', url: 'https://zoom.us' },
  })),
  offers: {
    '@type': 'Offer',
    category: 'Paid',
    price: String(PRECIO_UNICO),
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    validFrom: '2026-09-15',
    url: `${BASE}/nivel-1`,
  },
}));

export default function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      {courses.map((c) => (
        <script
          key={c.url}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(c) }}
        />
      ))}
    </>
  );
}
