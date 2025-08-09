import tailwindUIConfig from "../../packages/ui/tailwind.config.js";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [tailwindUIConfig],
  theme: {
    extend: {
      colors: {
        // Tema escuro AidaEon - Paleta de cinzas e azul vibrante
        background: {
          DEFAULT: "#0A0A0A",
          secondary: "#1A1A1A",
          tertiary: "#2A2A2A",
        },
        foreground: {
          DEFAULT: "#FFFFFF",
          secondary: "#CCCCCC",
          muted: "#a3a3a3",
        },
        primary: {
          50: "#e0f2ff",
          100: "#bbf7d0",
          200: "#86efac",
          300: "#4ade80",
          400: "#22c55e",
          500: "#007BFF",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          DEFAULT: "#007BFF",
        },
        gray: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0a0a0a",
        },
        border: "#262626",
        input: "#1a1a1a",
        ring: "#2563eb",
        card: {
          DEFAULT: "#111111",
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "#111111",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#1a1a1a",
          foreground: "#a3a3a3",
        },
        accent: {
          DEFAULT: "#262626",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "#dc2626",
          foreground: "#ffffff",
        },
      },
    },
  },
};

export default config;