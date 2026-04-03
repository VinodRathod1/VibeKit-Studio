import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { themes, type Theme } from './index';

interface ThemeContextType {
  theme: Theme;
  themeName: string;
  setTheme: (name: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children, theme: themeProp }: { children: ReactNode; theme?: string }) => {
  const [themeName, setThemeName] = useState(() => {
    return localStorage.getItem('vibekit-theme') || 'minimal';
  });

  const activeThemeName = themeProp || themeName;
  const theme = themes[activeThemeName] || themes.minimal;

  useEffect(() => {
    if (!themeProp) {
      localStorage.setItem('vibekit-theme', themeName);
    }
  }, [themeName, themeProp]);

  const cssVariables = {
    '--color-bg': theme.colors.bg,
    '--color-surface': theme.colors.surface,
    '--color-text': theme.colors.text,
    '--color-accent': theme.colors.accent,
    '--font-heading': theme.fonts.heading,
    '--font-body': theme.fonts.body,
    '--radius': theme.radius,
    '--spacing-unit': theme.spacing,
    '--btn-style': theme.buttonStyle,
  } as React.CSSProperties;

  return (
    <ThemeContext.Provider value={{ theme, themeName, setTheme: setThemeName }}>
      <div 
        className="theme-wrapper"
        style={{ 
          ...cssVariables, 
          backgroundColor: 'var(--color-bg)', 
          color: 'var(--color-text)',
          fontFamily: 'var(--font-body)',
          minHeight: '100%',
          transition: 'all 0.3s ease'
        }}>
        <div style={{ fontFamily: 'var(--font-heading)' }} className="h-full">
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
