import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import VideoIntro from '@/components/VideoIntro';
import Courses from '@/components/Courses';
import Benefits from '@/components/Benefits';
import KoreanCulture from '@/components/KoreanCulture';
import LeadMagnet from '@/components/LeadMagnet';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import CTASection from '@/components/CTASection';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import StructuredData from '@/components/StructuredData';

export default function HomePage() {
  return (
    <main className="relative">
      <StructuredData />
      <Navigation />
      <Hero />
      <About />
      <VideoIntro />
      <Courses />
      <Benefits />
      <KoreanCulture />
      <LeadMagnet />
      <Testimonials />
      <FAQ />
      <CTASection />
      <Contact />
      <Footer />
    </main>
  );
}
