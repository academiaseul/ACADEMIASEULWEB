import type { MetadataRoute } from 'next';

const BASE = 'https://www.academiaseul.com';
// Fechas fijas: si cambian en cada build, Google ignora lastmod.
const HOY = new Date('2026-09-18');
const JUNIO = new Date('2026-06-07');
const MAYO = new Date('2026-05-20');

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, lastModified: HOY, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/nivel-1`, lastModified: HOY, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/programa`, lastModified: HOY, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/generador-nombre`, lastModified: HOY, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/recursos`, lastModified: HOY, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/test-nivel`, lastModified: HOY, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/sobre`, lastModified: HOY, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/recursos/guias`, lastModified: HOY, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/recursos/pronunciacion`, lastModified: HOY, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/blog`, lastModified: HOY, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE}/blog/dangun-por-que-corea-nacio-de-una-osa`, lastModified: HOY, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/blog/sopa-de-algas-antes-de-un-examen-supersticion-coreana`, lastModified: HOY, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/blog/por-que-en-corea-no-existe-el-piso-4`, lastModified: HOY, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/blog/hangul-el-alfabeto-mas-cientifico`, lastModified: JUNIO, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/blog/nunchi-el-arte-coreano-de-leer-el-ambiente`, lastModified: JUNIO, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/faq`, lastModified: HOY, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/hangul-dle`, lastModified: MAYO, changeFrequency: 'daily', priority: 0.5 },
    { url: `${BASE}/lector-hangul`, lastModified: HOY, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/privacidad`, lastModified: HOY, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE}/terminos`, lastModified: HOY, changeFrequency: 'yearly', priority: 0.2 },
  ];
}
