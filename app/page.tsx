import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import VideoIntro from '@/components/VideoIntro';
import Courses from '@/components/Courses';
import Benefits from '@/components/Benefits';
import MetodoChingu from '@/components/MetodoChingu';
import WordGame from '@/components/WordGame';
import KoreanCulture from '@/components/KoreanCulture';
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
      <Hero />
      <Courses />
      <VideoIntro />
      <About />
      <MetodoChingu />
      <Benefits />

      <RecursoBanner />

      <WordGame />

      <Testimonials />
      <KoreanCulture />
      <FAQ />
      <CTASection />
      <Contact />

      <BannerInferior />

      <Footer />
    </main>
  );
}
