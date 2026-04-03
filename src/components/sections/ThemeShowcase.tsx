import { themes } from '../../themes/index';

const MiniPreview = ({ themeKey }: { themeKey: string }) => {
  const t = themes[themeKey];
  if (!t) return null;

  return (
    <div 
      className="p-6 rounded-[var(--radius)] shadow-2xl flex flex-col gap-4 border border-[var(--color-accent)]/10"
      style={{ backgroundColor: t.colors.bg, color: t.colors.text }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: t.colors.accent, color: t.colors.bg }}>
          <span className="font-black text-xl leading-none">{t.name[0]}</span>
        </div>
        <div>
          <h4 className="text-sm font-bold truncate leading-tight" style={{ fontFamily: t.fonts.heading }}>{t.name}</h4>
          <p className="text-[10px] opacity-50 uppercase tracking-widest" style={{ fontFamily: t.fonts.body }}>Preview Card</p>
        </div>
      </div>
      
      <div className="w-full h-2 md:h-3 rounded-full opacity-10" style={{ backgroundColor: t.colors.text }}></div>
      <div className="w-4/5 h-2 md:h-3 rounded-full opacity-10" style={{ backgroundColor: t.colors.text }}></div>
      <div className="w-3/5 h-2 md:h-3 rounded-full opacity-10" style={{ backgroundColor: t.colors.text }}></div>
      
      <div className="mt-4 py-2 px-4 text-[10px] font-bold text-center border-2" 
        style={{ 
          fontFamily: t.fonts.heading,
          borderColor: t.buttonStyle === 'glow' ? 'transparent' : t.colors.accent,
          backgroundColor: t.buttonStyle === 'solid' ? t.colors.accent : 'transparent',
          color: t.buttonStyle === 'solid' ? t.colors.bg : t.colors.accent,
          boxShadow: t.buttonStyle === 'glow' ? `0 0 15px ${t.colors.accent}` : 'none',
          borderRadius: t.radius || '8px'
        }}>
        Call To Action
      </div>
    </div>
  );
};

const ThemeShowcase = () => {
  return (
    <section id="themes" className="py-24 px-6 bg-[var(--color-surface)]/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Live Vibe Showcase
          </h2>
          <p className="max-w-xl mx-auto font-medium opacity-60" style={{ fontFamily: 'var(--font-body)' }}>
            Experience how typography and colors shift across presets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <MiniPreview themeKey="minimal" />
          <MiniPreview themeKey="neobrutal" />
          <MiniPreview themeKey="darkneon" />
        </div>
      </div>
    </section>
  );
};

export default ThemeShowcase;
