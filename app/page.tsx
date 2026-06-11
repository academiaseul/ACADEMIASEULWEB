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

      {/* Banner inferior */}
      <section style={{ backgroundColor: '#3D2EE8' }} className="text-white">
        <div className="max-w-5xl mx-auto px-6 py-14 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <div className="text-3xl md:text-4xl font-black">Academia Seúl</div>
            <p className="text-white/80 mt-1">
              Aprende coreano con un <span className="font-bold">chingu</span>. ¿Tienes dudas? Hablemos.
            </p>
          </div>
          <a
            href="/#contact"
            className="inline-block bg-white text-[#3D2EE8] font-bold px-8 py-4 rounded-full hover:bg-[#E8B84B] hover:text-[#0D0D0D] transition-colors whitespace-nowrap"
          >
            Contáctanos →
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
