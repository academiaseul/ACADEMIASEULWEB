import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import VideoIntro from '@/components/VideoIntro';
import About from '@/components/About';
import Courses from '@/components/Courses';
import Benefits from '@/components/Benefits';
import KoreanCulture from '@/components/KoreanCulture';
import Testimonials from '@/components/Testimonials';
import CTASection from '@/components/CTASection';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <VideoIntro />
      <About />
      <Courses />
      <Benefits />
      <KoreanCulture />
      <Testimonials />
      <CTASection />
      <Contact />
      <Footer />
    </main>
  );
}