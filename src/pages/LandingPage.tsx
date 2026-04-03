import { useTheme } from '../themes/ThemeProvider';
import ThemePicker from '../components/ThemePicker';

const LandingPage = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-6xl font-bold tracking-tighter mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
          Create with Vibe
        </h1>
        <p className="text-xl opacity-80" style={{ fontFamily: 'var(--font-body)' }}>
          Select a theme below to see the entire app transform instantly.
        </p>
      </div>

      <ThemePicker />

      <div className="mt-20 max-w-md mx-auto p-8 rounded-[var(--radius)] bg-[var(--color-surface)] border border-[var(--color-accent)]/20 shadow-xl">
        <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
          Preview Card
        </h3>
        <p className="opacity-70 mb-6" style={{ fontFamily: 'var(--font-body)' }}>
          This card demonstrates how border radius, background colors, and typography adapt to your selected vibe.
        </p>
        <button className="w-full py-3 px-6 rounded-[var(--radius)] font-bold transition-all"
          style={{ 
            backgroundColor: theme.buttonStyle === 'outline' ? 'transparent' : 'var(--color-accent)', 
            color: theme.buttonStyle === 'outline' ? 'var(--color-accent)' : 'var(--color-bg)',
            fontFamily: 'var(--font-heading)',
            boxShadow: theme.buttonStyle === 'glow' ? '0 0 20px var(--color-accent)' : 'none',
            border: theme.buttonStyle === 'outline' ? '2px solid var(--color-accent)' : 'none'
          }}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
