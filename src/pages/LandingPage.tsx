import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import HowItWorks from '../components/sections/HowItWorks';
import ThemeShowcase from '../components/sections/ThemeShowcase';
import Features from '../components/sections/Features';
import CTABanner from '../components/sections/CTABanner';
import ThemePicker from '../components/ThemePicker';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] selection:bg-[var(--color-accent)] selection:text-[var(--color-bg)] transition-colors duration-300">
      <Navbar />
      
      <main>
        <Hero />
        
        <div className="py-12 bg-[var(--color-accent)]/5 border-y border-[var(--color-accent)]/10">
          <ThemePicker />
          <p className="text-center text-xs mt-4 opacity-50 uppercase tracking-widest font-bold">
            Live Preview: Switch the theme to see the entire landing page transform.
          </p>
        </div>

        <HowItWorks />
        <ThemeShowcase />
        <Features />
        <CTABanner />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
