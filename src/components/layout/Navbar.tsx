import { useState, useEffect } from 'react';
import { LightningBoltIcon, HamburgerIcon, CloseIcon } from '../icons';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[var(--color-bg)]/80 backdrop-blur-md border-b border-[var(--color-accent)]/10 py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-[var(--color-accent)] rounded-lg flex items-center justify-center text-[var(--color-bg)] transition-transform group-hover:rotate-12">
            <LightningBoltIcon size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            VibeKit Studio
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium hover:text-[var(--color-accent)] transition-colors">Features</a>
          <a href="#themes" className="text-sm font-medium hover:text-[var(--color-accent)] transition-colors">Themes</a>
          <button className="px-5 py-2.5 bg-[var(--color-accent)] text-[var(--color-bg)] text-sm font-bold rounded-[var(--radius)] hover:opacity-90 transition-opacity">
            Get Started
          </button>
        </div>

        <button 
          className="md:hidden text-[var(--color-text)] p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <CloseIcon size={24} /> : <HamburgerIcon size={24} />}
        </button>
      </div>

      <div className={`md:hidden absolute top-full left-0 right-0 bg-[var(--color-bg)] border-b border-[var(--color-accent)]/10 transition-all duration-300 overflow-hidden ${
        isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="p-6 flex flex-col gap-4">
          <a href="#features" className="text-lg font-medium" onClick={() => setIsOpen(false)}>Features</a>
          <a href="#themes" className="text-lg font-medium" onClick={() => setIsOpen(false)}>Themes</a>
          <button className="w-full py-4 bg-[var(--color-accent)] text-[var(--color-bg)] font-bold rounded-[var(--radius)]">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
