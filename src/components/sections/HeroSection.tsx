import React from 'react';

interface HeroSectionProps {
  data: {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    buttonUrl?: string;
  };
}

const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  return (
    <section className="py-24 px-6 text-center bg-[var(--color-bg)]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-[var(--font-heading)] text-[var(--color-text)] mb-6 leading-tight">
          {data.title || 'Your Stunning Headline Here'}
        </h1>
        <p className="text-xl md:text-2xl font-[var(--font-body)] text-[var(--color-text)] opacity-70 max-w-2xl mx-auto mb-10 leading-relaxed">
          {data.subtitle || 'Add a compelling subheadline that perfectly describes your unique value proposition and captures visitor attention.'}
        </p>
        {data.buttonText && (
          <a 
            href={data.buttonUrl || '#'}
            className={`inline-block px-10 py-5 rounded-[var(--radius)] font-bold text-lg transition-all transform hover:scale-105 active:scale-95
              ${process.env.VITE_BTN_STYLE === 'glow' ? 'shadow-[0_0_20px_var(--color-accent)]' : ''}
              ${process.env.VITE_BTN_STYLE === 'outline' ? 'border-2 border-[var(--color-accent)] text-[var(--color-accent)]' : 'bg-[var(--color-accent)] text-white'}
              hover:opacity-90`}
          >
            {data.buttonText}
          </a>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
