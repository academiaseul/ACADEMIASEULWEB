import {
  CLASES,
  CURSOS,
  INICIO_ISO,
  PRECIO_UNICO,
  PRECIO_LANZAMIENTO_UNICO,
  LANZAMIENTO_HASTA_ISO,
  profeDe,
} from '@/lib/nivel1';

// Modo «Básico 1 · noviembre 2026»: solo las clases "abierta" se publican como instancia con oferta.
const abiertas = CLASES.filter((c) => c.estado === 'abierta');

const BASE = 'https://www.academiaseul.com';

const organization = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  '@id': `${BASE}/#organization`,
  name: 'Academia Seúl',
  alternateName: 'Academia Seul',
  url: BASE,
  logo: `${BASE}/logo-tiger-red.png`,
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

// Días en schema.org (DayOfWeek) para courseSchedule.byDay.
const DIA_SCHEMA: Record<string, string> = {
  Lunes: 'https://schema.org/Monday',
  Martes: 'https://schema.org/Tuesday',
  Miércoles: 'https://schema.org/Wednesday',
  Jueves: 'https://schema.org/Thursday',
  Viernes: 'https://schema.org/Friday',
  Sábado: 'https://schema.org/Saturday',
  Domingo: 'https://schema.org/Sunday',
};
// "2026-11-08T23:59:59-03:00" → "2026-11-08"; el precio normal rige desde el día siguiente (lun 9).
const LANZAMIENTO_HASTA_DIA = LANZAMIENTO_HASTA_ISO.slice(0, 10);
const NORMAL_DESDE_DIA = new Date(Date.parse(LANZAMIENTO_HASTA_ISO) + 1000).toISOString().slice(0, 10);

// Un Course solo por curso con clase abierta: el rich result "Course info" exige hasCourseInstance y
// offers, y un Course sin ellos sale como elemento no válido en Search Console. Los cursos en curso o
// de enero 2027 se vuelven a publicar cuando tengan una clase abierta.
// Ofertas: precio de lanzamiento (US$120 hasta el dom 8 nov) y precio normal (US$150 desde el lun 9).
const courses = CURSOS.filter((curso) => abiertas.some((c) => c.cursoId === curso.cursoId)).map((curso) => {
  const instancias = abiertas.filter((c) => c.cursoId === curso.cursoId);
  const url = `${BASE}/nivel-1?clase=${instancias[0].id}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `Coreano · ${curso.nombreCorto} · ${curso.subtitulo}`,
    description: curso.descripcion,
    educationalLevel: curso.cefr,
    inLanguage: 'es',
    url: `${BASE}/programa#${curso.cursoId}`,
    provider: {
      '@type': 'EducationalOrganization',
      '@id': `${BASE}/#organization`,
      name: 'Academia Seúl',
      url: BASE,
    },
    hasCourseInstance: instancias.map((c) => ({
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT8H',
      courseSchedule: {
        '@type': 'Schedule',
        repeatFrequency: 'P1W',
        repeatCount: 8,
        startDate: INICIO_ISO,
        byDay: DIA_SCHEMA[c.dia] ?? c.dia,
        startTime: c.horaChile,
        scheduleTimezone: 'America/Santiago',
      },
      instructor: { '@type': 'Person', name: profeDe(c.profeId).nombre },
      location: { '@type': 'VirtualLocation', url: 'https://zoom.us' },
    })),
    offers: [
      {
        '@type': 'Offer',
        category: 'Paid',
        name: 'Precio de lanzamiento',
        price: String(PRECIO_LANZAMIENTO_UNICO),
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        validFrom: '2026-10-26',
        priceValidUntil: LANZAMIENTO_HASTA_DIA,
        url,
      },
      {
        '@type': 'Offer',
        category: 'Paid',
        price: String(PRECIO_UNICO),
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        validFrom: NORMAL_DESDE_DIA,
        url,
      },
    ],
  };
});

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
