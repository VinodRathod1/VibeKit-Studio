export type ButtonStyle = 'solid' | 'outline' | 'glow';

export interface Theme {
  name: string;
  colors: {
    bg: string;
    surface: string;
    text: string;
    accent: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  radius: string;
  spacing: string;
  buttonStyle: ButtonStyle;
}

export const themes: Record<string, Theme> = {
  minimal: {
    name: 'Minimal / Editorial',
    colors: {
      bg: '#ffffff',
      surface: '#f4f4f5',
      text: '#0a0a0a',
      accent: '#18181b'
    },
    fonts: {
      heading: "'Playfair Display', serif",
      body: "'Inter', sans-serif"
    },
    radius: '0px',
    spacing: '0.75rem',
    buttonStyle: 'outline'
  },
  neobrutal: {
    name: 'Neo-brutal',
    colors: {
      bg: '#ffffff',
      surface: '#111827',
      text: '#000000',
      accent: '#facc15'
    },
    fonts: {
      heading: "'Space Grotesk', sans-serif",
      body: "'Inter', sans-serif"
    },
    radius: '0px',
    spacing: '1rem',
    buttonStyle: 'solid'
  },
  darkneon: {
    name: 'Dark / Neon',
    colors: {
      bg: '#09090b',
      surface: '#18181b',
      text: '#fafafa',
      accent: '#22c55e'
    },
    fonts: {
      heading: "'JetBrains Mono', monospace",
      body: "'JetBrains Mono', monospace"
    },
    radius: '8px',
    spacing: '1rem',
    buttonStyle: 'glow'
  },
  pastel: {
    name: 'Pastel / Soft',
    colors: {
      bg: '#fce7f3',
      surface: '#f5f3ff',
      text: '#4b5563',
      accent: '#8b5cf6'
    },
    fonts: {
      heading: "'Montserrat', sans-serif",
      body: "'Inter', sans-serif"
    },
    radius: '24px',
    spacing: '1.25rem',
    buttonStyle: 'solid'
  },
  luxury: {
    name: 'Luxury / Serif',
    colors: {
      bg: '#020617',
      surface: '#0f172a',
      text: '#f8fafc',
      accent: '#eab308'
    },
    fonts: {
      heading: "'Cormorant Garamond', serif",
      body: "'Lora', serif"
    },
    radius: '4px',
    spacing: '1.5rem',
    buttonStyle: 'outline'
  },
  retro: {
    name: 'Retro / Pixel',
    colors: {
      bg: '#c0c0c0',
      surface: '#808080',
      text: '#000000',
      accent: '#000080'
    },
    fonts: {
      heading: "'VT323', monospace",
      body: "'VT323', monospace"
    },
    radius: '0px',
    spacing: '0.5rem',
    buttonStyle: 'solid'
  }
};
