"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme, type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

// Re-export hook
export { useTheme };

// Tipos para temas customizados
export interface CustomTheme {
  name: string;
  displayName: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    border: string;
  };
  borderRadius: string;
  fontFamily: string;
}

// Temas predefinidos
export const themes: Record<string, CustomTheme> = {
  default: {
    name: "default",
    displayName: "Padrão",
    colors: {
      primary: "221.2 83.2% 53.3%",
      secondary: "210 40% 96%",
      accent: "210 40% 96%",
      background: "0 0% 100%",
      foreground: "222.2 84% 4.9%",
      muted: "210 40% 96%",
      border: "214.3 31.8% 91.4%",
    },
    borderRadius: "0.5rem",
    fontFamily: "Inter, sans-serif",
  },
  dark: {
    name: "dark",
    displayName: "Escuro",
    colors: {
      primary: "217.2 91.2% 59.8%",
      secondary: "217.2 32.6% 17.5%",
      accent: "217.2 32.6% 17.5%",
      background: "222.2 84% 4.9%",
      foreground: "210 40% 98%",
      muted: "217.2 32.6% 17.5%",
      border: "217.2 32.6% 17.5%",
    },
    borderRadius: "0.5rem",
    fontFamily: "Inter, sans-serif",
  },
  blue: {
    name: "blue",
    displayName: "Azul",
    colors: {
      primary: "221.2 83.2% 53.3%",
      secondary: "210 40% 96%",
      accent: "210 40% 96%",
      background: "0 0% 100%",
      foreground: "222.2 84% 4.9%",
      muted: "210 40% 96%",
      border: "214.3 31.8% 91.4%",
    },
    borderRadius: "0.75rem",
    fontFamily: "Inter, sans-serif",
  },
  green: {
    name: "green",
    displayName: "Verde",
    colors: {
      primary: "142.1 76.2% 36.3%",
      secondary: "138.5 76.2% 96.7%",
      accent: "138.5 76.2% 96.7%",
      background: "0 0% 100%",
      foreground: "222.2 84% 4.9%",
      muted: "138.5 76.2% 96.7%",
      border: "214.3 31.8% 91.4%",
    },
    borderRadius: "0.5rem",
    fontFamily: "Inter, sans-serif",
  },
  purple: {
    name: "purple",
    displayName: "Roxo",
    colors: {
      primary: "262.1 83.3% 57.8%",
      secondary: "270 95.2% 98.0%",
      accent: "270 95.2% 98.0%",
      background: "0 0% 100%",
      foreground: "222.2 84% 4.9%",
      muted: "270 95.2% 98.0%",
      border: "214.3 31.8% 91.4%",
    },
    borderRadius: "0.5rem",
    fontFamily: "Inter, sans-serif",
  },
};

// Hook para aplicar tema customizado
export function useCustomTheme() {
  const { theme, setTheme } = useTheme();
  
  const applyTheme = React.useCallback((themeName: string) => {
    const customTheme = themes[themeName];
    if (!customTheme) return;
    
    const root = document.documentElement;
    
    // Aplicar cores CSS
    Object.entries(customTheme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
    
    // Aplicar border radius
    root.style.setProperty('--radius', customTheme.borderRadius);
    
    // Aplicar fonte
    root.style.setProperty('--font-family', customTheme.fontFamily);
    
    setTheme(themeName);
  }, [setTheme]);
  
  return {
    theme,
    themes,
    applyTheme,
    currentTheme: themes[theme || 'default'],
  };
}
