import { 
  PreviewIcon, 
  ThemesIcon, 
  PublishIcon, 
  MobileIcon, 
  SlugIcon, 
  AnalyticsIcon 
} from '../icons';

const Card = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="p-8 rounded-[var(--radius)] bg-[var(--color-surface)] border border-[var(--color-accent)]/10 hover:border-[var(--color-accent)] transition-all hover:-translate-y-2 group shadow-sm hover:shadow-xl">
    <div className="w-14 h-14 rounded-2xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex items-center justify-center mb-6 transition-colors group-hover:bg-[var(--color-accent)] group-hover:text-[var(--color-bg)]">
      <Icon size={28} />
    </div>
    <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>{title}</h3>
    <p className="opacity-60 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{description}</p>
  </div>
);

const Features = () => {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Fully Loaded Features
          </h2>
          <div className="w-24 h-1 bg-[var(--color-accent)] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card 
            icon={PreviewIcon}
            title="Live Preview"
            description="See exactly how your page looks as you build it. Real-time updates with every keystroke."
          />
          <Card 
            icon={ThemesIcon}
            title="6 Vibe Themes"
            description="From Neo-brutal to Luxury, switch the entire aesthetic of your site with a single click."
          />
          <Card 
            icon={PublishIcon}
            title="One-Click Publish"
            description="Integrated with Netlify for bulletproof global deployment in seconds."
          />
          <Card 
            icon={MobileIcon}
            title="Mobile Ready"
            description="Every theme is built responsive by default. Your content looks great on any screen."
          />
          <Card 
            icon={SlugIcon}
            title="Custom Slugs"
            description="Create memorable, clean URLs for your pages (e.g. vibekit.studio/p/your-site)."
          />
          <Card 
            icon={AnalyticsIcon}
            title="View Analytics"
            description="Track how many visitors land on your page with our simple, privacy-focused analytics."
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
