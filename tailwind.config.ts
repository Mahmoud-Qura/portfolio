import type { Config } from "tailwindcss";

// ─── Tailwind Config ────────────────────────────────────────────────────────
// We extend Tailwind with our design tokens so every component
// can reference theme-aware values (e.g. bg-cream, text-ink, etc.)

const config: Config = {
  // Enable class-based dark mode (toggled via <html class="dark">)
  darkMode: "class",

  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      // ── Color Palette ──────────────────────────────────────────────────
      colors: {
        // Light-mode backgrounds
        cream: {
          DEFAULT: "#fdf9f3",
          50: "#fefcf8",
          100: "#fdf9f3",
          200: "#f8f0e3",
        },
        // Dark-mode backgrounds
        ink: {
          DEFAULT: "#18181b",
          50: "#f4f4f5",
          100: "#e4e4e7",
          700: "#3f3f46",
          800: "#27272a",
          900: "#18181b",
          950: "#09090b",
        },
        // Accent — soft indigo, consistent in light & dark
        accent: {
          DEFAULT: "#6366f1",
          light: "#818cf8",
          dark: "#4f46e5",
        },
      },

      // ── Typography ──────────────────────────────────────────────────────
      // Fonts are loaded via <link> in layout.tsx
      fontFamily: {
        display: ["'Playfair Display'", "Georgia", "serif"],
        body: ["'DM Sans'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },

      // ── Subtle Shadows ──────────────────────────────────────────────────
      boxShadow: {
        card: "0 2px 12px 0 rgba(24,24,27,0.07)",
        "card-hover": "0 8px 28px 0 rgba(24,24,27,0.12)",
        "card-dark": "0 2px 12px 0 rgba(0,0,0,0.4)",
      },

      // ── Animation ────────────────────────────────────────────────────────
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
