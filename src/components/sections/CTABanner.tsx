const CTABanner = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto text-center relative z-10 px-10 py-16 md:py-24 rounded-[var(--radius)] bg-[var(--color-surface)] border-4 border-[var(--color-accent)] shadow-[20px_20px_0px_var(--color-accent)]">
        <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
          Ready to build <br /> your <span className="underline decoration-wavy underline-offset-8">vibe?</span>
        </h2>
        <p className="max-w-2xl mx-auto text-lg md:text-xl opacity-70 mb-12" style={{ fontFamily: 'var(--font-body)' }}>
          Join thousands of creators making beautiful, themed mini-sites without touching a single line of code.
        </p>
        <button className="px-10 py-5 bg-[var(--color-accent)] text-[var(--color-bg)] font-black text-xl rounded-[var(--radius)] hover:scale-105 transition-all shadow-glow flex items-center gap-2 mx-auto">
          Get Started Free
        </button>
      </div>
    </section>
  );
};

export default CTABanner;
