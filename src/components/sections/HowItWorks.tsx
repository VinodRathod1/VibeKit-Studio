const Step = ({ number, title, description }: { number: string, title: string, description: string }) => (
  <div className="flex flex-col items-center text-center p-8 bg-[var(--color-surface)]/50 rounded-[var(--radius)] border border-[var(--color-accent)]/10 hover:border-[var(--color-accent)]/30 transition-all">
    <div className="w-12 h-12 rounded-full bg-[var(--color-accent)] text-[var(--color-bg)] flex items-center justify-center font-black text-xl mb-6 shadow-glow">
      {number}
    </div>
    <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{title}</h3>
    <p className="opacity-60 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{description}</p>
  </div>
);

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            How It Works
          </h2>
          <div className="w-24 h-1 bg-[var(--color-accent)] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Step 
            number="1" 
            title="Pick a Vibe" 
            description="Choose from 6 professionally designed theme presets to instantly define your site's aesthetic."
          />
          <Step 
            number="2" 
            title="Build your page" 
            description="Use our intuitive editor to add text, images, and links. Your progress is saved automatically."
          />
          <Step 
            number="3" 
            title="Publish instantly" 
            description="Hit publish and get a unique URL to share your creation with the world in seconds."
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
