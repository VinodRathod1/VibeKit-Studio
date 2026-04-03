import { ArrowRightIcon } from '../icons';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden min-h-[90vh] flex flex-col justify-center">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,var(--color-accent),transparent_25%)] opacity-20 animate-pulse"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 mb-8 animate-bounce">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">
            New — Version 1.0 is here
          </span>
        </div>

        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]" style={{ fontFamily: 'var(--font-heading)' }}>
          Generate a theme. <br />
          Build a mini-site. <br />
          <span className="text-[var(--color-accent)]">Publish it.</span>
        </h1>

        <p className="max-w-2xl text-xl md:text-2xl font-medium opacity-60 mb-12 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
          VibeKit Studio lets you create beautiful themed pages in minutes — no code needed.
          Just pick a vibe, add your content, and go live.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link 
            to="/signup"
            className="w-full sm:w-auto px-8 py-4 bg-[var(--color-accent)] text-[var(--color-bg)] font-black rounded-[var(--radius)] flex items-center justify-center gap-2 text-lg hover:scale-105 transition-transform"
          >
            Create your first page
            <ArrowRightIcon size={20} />
          </Link>
          <a href="#how-it-works" className="w-full sm:w-auto px-8 py-4 border-2 border-[var(--color-accent)]/20 hover:border-[var(--color-accent)] text-[var(--color-accent)] font-bold rounded-[var(--radius)] text-lg transition-colors text-center">
            See examples
          </a>
        </div>
      </div>

      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full max-w-5xl h-64 bg-gradient-to-t from-[var(--color-bg)] to-transparent z-20"></div>
    </section>
  );
};

export default Hero;
