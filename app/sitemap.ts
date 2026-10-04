import type { MetadataRoute } from 'next';

const BASE = 'https://www.academiaseul.com';
// Fechas fijas: si cambian en cada build, Google ignora lastmod.
const HOY = new Date('2026-09-22');
const BLOG_30SEP = new Date('2026-09-30');
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
    { url: `${BASE}/blog`, lastModified: BLOG_30SEP, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE}/blog/hangeulnal-el-dia-del-alfabeto-coreano`, lastModified: BLOG_30SEP, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/blog/chuseok-el-dia-de-accion-de-gracias-coreano`, lastModified: BLOG_30SEP, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/blog/como-se-pronuncia-seul-en-coreano`, lastModified: BLOG_30SEP, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/blog/gestos-que-delatan-a-un-coreano`, lastModified: BLOG_30SEP, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/blog/dangun-por-que-corea-nacio-de-una-osa`, lastModified: HOY, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/blog/sopa-de-algas-antes-de-un-examen-supersticion-coreana`, lastModified: HOY, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/blog/por-que-en-corea-no-existe-el-piso-4`, lastModified: HOY, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/blog/hangul-el-alfabeto-mas-cientifico`, lastModified: JUNIO, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/blog/nunchi-el-arte-coreano-de-leer-el-ambiente`, lastModified: JUNIO, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/faq`, lastModified: HOY, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/hangul-dle`, lastModified: MAYO, changeFrequency: 'daily', priority: 0.5 },
    { url: `${BASE}/lector-coreano`, lastModified: HOY, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/dubu`, lastModified: HOY, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/hangul-race`, lastModified: HOY, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/taller`, lastModified: HOY, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/privacidad`, lastModified: HOY, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE}/terminos`, lastModified: HOY, changeFrequency: 'yearly', priority: 0.2 },
  ];
}
