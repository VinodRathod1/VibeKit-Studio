import { themes, type Theme } from '../themes/index';
import { useTheme } from '../themes/ThemeProvider';

const ThemePicker = () => {
  const { themeName, setTheme } = useTheme();

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center italic" style={{ fontFamily: 'var(--font-heading)' }}>
        Select Your Vibe
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(themes).map(([key, t]: [string, Theme]) => {
          const isActive = themeName === key;
          
          return (
            <button
              key={key}
              onClick={() => setTheme(key)}
              className={`relative overflow-hidden p-4 rounded-xl border-2 transition-all duration-300 text-left h-40 flex flex-col justify-between group ${
                isActive ? 'border-[var(--color-accent)] scale-105 shadow-lg' : 'border-neutral-800 hover:border-neutral-500'
              }`}
              style={{ backgroundColor: t.colors.bg, color: t.colors.text }}
            >
              <div>
                <p className="text-xs uppercase tracking-widest opacity-60 mb-1" style={{ fontFamily: t.fonts.body }}>
                  Preset
                </p>
                <h3 className="text-sm font-bold leading-tight" style={{ fontFamily: t.fonts.heading }}>
                  {t.name}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-full border border-current" 
                  style={{ backgroundColor: t.colors.accent }}
                />
                <span className="text-[10px] uppercase opacity-50 truncate" style={{ fontFamily: t.fonts.body }}>
                  {t.fonts.heading.split(',')[0].replace(/'/g, '')}
                </span>
              </div>

              {isActive && (
                <div className="absolute top-2 right-2">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-ping" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ThemePicker;
