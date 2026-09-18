import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Courses from '@/components/Courses';
import MetodoChingu from '@/components/MetodoChingu';
import WordGame from '@/components/WordGame';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import CTASection from '@/components/CTASection';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { RecursoBanner, BannerInferior } from '@/components/HomeBanners';
import StructuredData from '@/components/StructuredData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <main className="relative">
      <StructuredData />
      <Navigation />
      {/* Orden por preguntas del visitante: qué es (Hero) → qué curso (Courses) → cómo enseñamos (Método)
          → quién enseña (About) → qué dicen (Testimonials) → pruébalo gratis (Recursos, Juego) → dudas (FAQ) → cierre */}
      <Hero />
      <Courses />
      <MetodoChingu />
      <About />
      <Testimonials />
      <RecursoBanner />
      <WordGame />
      <FAQ />
      <CTASection />
      <Contact />
      <BannerInferior />

      <Footer />
    </main>
  );
}
