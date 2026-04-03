import { LightningBoltIcon } from '../icons';

const Footer = () => {
  return (
    <footer className="py-20 px-6 border-t border-[var(--color-accent)]/10 bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-center md:text-left">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-6">
              <div className="w-6 h-6 bg-[var(--color-accent)] rounded flex items-center justify-center text-[var(--color-bg)]">
                <LightningBoltIcon size={14} />
              </div>
              <span className="text-lg font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                VibeKit Studio
              </span>
            </div>
            <p className="text-sm opacity-50 font-medium max-w-xs mx-auto md:mx-0">
              Build and publish stunning themed mini-sites, effortlessly.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-xs uppercase tracking-widest opacity-60">Product</h4>
            <a href="#features" className="text-sm hover:text-[var(--color-accent)] transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm hover:text-[var(--color-accent)] transition-colors">How It Works</a>
            <a href="#themes" className="text-sm hover:text-[var(--color-accent)] transition-colors">Themes</a>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-xs uppercase tracking-widest opacity-60">Legal</h4>
            <a href="#" className="text-sm hover:text-[var(--color-accent)] transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm hover:text-[var(--color-accent)] transition-colors">Terms of Service</a>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-xs uppercase tracking-widest opacity-60">Community</h4>
            <a href="https://github.com/VinodRathod1/VibeKit-Studio" className="text-sm hover:text-[var(--color-accent)] transition-colors">GitHub Repository</a>
            <a href="#" className="text-sm hover:text-[var(--color-accent)] transition-colors">Examples</a>
            <a href="#" className="text-sm hover:text-[var(--color-accent)] transition-colors">Docs</a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-[var(--color-accent)]/5 text-xs opacity-50 uppercase tracking-widest">
          <p>© 2026 VibeKit Studio — Modern Page Building</p>
          <div className="flex gap-6">
            <p>Made for creators</p>
            <p>Powered by Netlify</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
