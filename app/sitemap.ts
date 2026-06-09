import type { MetadataRoute } from 'next';

const BASE = 'https://www.academiaseul.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/nivel-1`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/taller`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/generador-nombre`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/recursos`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/recursos/guias`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/recursos/pronunciacion`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE}/blog/hangul-el-alfabeto-mas-cientifico`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/blog/nunchi-el-arte-coreano-de-leer-el-ambiente`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/notificarme`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE}/privacidad`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE}/terminos`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
  ];
}
