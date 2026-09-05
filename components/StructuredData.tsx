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
    'Academia online de idioma coreano con clases en vivo para hispanohablantes de Latinoamérica y España. Método Chingu, grupos pequeños y profesor nativo.',
  sameAs: [
    'https://www.instagram.com/jaychingu.oficial',
    'https://www.tiktok.com/@jaychingu.oficial',
  ],
  areaServed: ['Latin America', 'Spain'],
  knowsLanguage: ['es', 'ko'],
};

const course = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Coreano Nivel 1 (A1) · Primeras Palabras',
  description:
    'Curso de coreano desde cero (CEFR A1) con clases en vivo por Zoom. Aprende a leer hangul, gramática básica y conversación, en cohortes con cupos limitados.',
  inLanguage: 'es',
  url: `${BASE}/nivel-1`,
  provider: {
    '@type': 'EducationalOrganization',
    name: 'Academia Seúl',
    sameAs: BASE,
  },
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'online',
    courseWorkload: 'P10W',
    location: { '@type': 'VirtualLocation', url: 'https://zoom.us' },
  },
  offers: {
    '@type': 'Offer',
    category: 'Paid',
    availability: 'https://schema.org/PreOrder',
    url: `${BASE}/nivel-1`,
  },
};

export default function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(course) }}
      />
    </>
  );
}
