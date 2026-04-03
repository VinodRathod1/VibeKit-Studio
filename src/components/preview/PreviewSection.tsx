import React from 'react';

interface PreviewSectionProps {
  type: 'hero' | 'features' | 'gallery' | 'contact';
  data: any;
}

const PreviewSection: React.FC<PreviewSectionProps> = ({ type, data }) => {
  switch (type) {
    case 'hero':
      return (
        <section className="py-20 px-6 text-center bg-[var(--color-bg)]">
          <h1 className="text-5xl font-[var(--font-heading)] text-[var(--color-text)] mb-6">
            {data.title || 'Your Headline Here'}
          </h1>
          <p className="text-xl font-[var(--font-body)] text-[var(--color-text)] opacity-80 max-w-2xl mx-auto mb-10">
            {data.subtitle || 'Add a compelling subtitle to engage your visitors.'}
          </p>
          {data.buttonText && (
            <button className={`px-8 py-4 rounded-[var(--radius)] font-bold transition-all
              ${process.env.VITE_BTN_STYLE === 'glow' ? 'shadow-[0_0_20px_var(--color-accent)]' : ''}
              ${process.env.VITE_BTN_STYLE === 'outline' ? 'border-2 border-[var(--color-accent)] text-[var(--color-accent)]' : 'bg-[var(--color-accent)] text-white'}
              hover:opacity-90 active:scale-95`}>
              {data.buttonText}
            </button>
          )}
        </section>
      );

    case 'features':
      return (
        <section className="py-16 px-6 bg-[var(--color-surface)]">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {(data.cards || [1, 2, 3]).map((card: any, i: number) => (
              <div key={i} className="p-8 rounded-[var(--radius)] border border-[var(--color-text)] border-opacity-10 bg-[var(--color-bg)]">
                <h3 className="text-xl font-[var(--font-heading)] text-[var(--color-text)] mb-4">
                  {card.title || `Feature ${i + 1}`}
                </h3>
                <p className="font-[var(--font-body)] text-[var(--color-text)] opacity-70">
                  {card.description || 'Describe the amazing benefit your service provides to users.'}
                </p>
              </div>
            ))}
          </div>
        </section>
      );

    case 'gallery':
      return (
        <section className="py-16 px-6 bg-[var(--color-bg)]">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {(data.images || [1, 2, 3, 4]).map((img: any, i: number) => (
              <div key={i} className="aspect-square rounded-[var(--radius)] overflow-hidden bg-[var(--color-surface)] border border-[var(--color-text)] border-opacity-10">
                {img.url ? (
                  <img src={img.url} alt={img.alt || ''} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[var(--color-text)] opacity-30 italic text-sm">
                    No Image
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      );

    case 'contact':
      return (
        <section className="py-16 px-6 text-center bg-[var(--color-surface)] border-t border-[var(--color-text)] border-opacity-5">
          <h2 className="text-3xl font-[var(--font-heading)] text-[var(--color-text)] mb-4">
            {data.heading || 'Get In Touch'}
          </h2>
          <p className="text-lg font-[var(--font-body)] text-[var(--color-text)] opacity-70 mb-8 max-w-xl mx-auto">
            {data.subheading || 'Ready to start your project? Drop us a line and we will get back to you.'}
          </p>
          <div className="inline-flex items-center gap-4 p-4 rounded-[var(--radius)] border border-[var(--color-text)] border-opacity-20 font-mono text-sm text-[var(--color-text)]">
            hello@vibekit.studio
          </div>
        </section>
      );

    default:
      return null;
  }
};

export default PreviewSection;
