import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#07070a",
          50: "#101014",
          100: "#0c0c10",
          900: "#050507",
        },
        gold: {
          DEFAULT: "#d4af37",
          soft: "#e8c874",
          bright: "#f4d98a",
          deep: "#9a7d28",
        },
        flux: {
          // cool data-flow accent, used for the architecture diagram packets
          DEFAULT: "#5ad1c8",
          soft: "#8fe3dc",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "hero": ["clamp(2.75rem, 7vw, 6rem)", { lineHeight: "0.98", letterSpacing: "-0.03em" }],
        "section": ["clamp(2rem, 4vw, 3.25rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        glass: "0 1px 0 0 rgba(255,255,255,0.05) inset, 0 12px 40px -12px rgba(0,0,0,0.7)",
        gold: "0 0 0 1px rgba(212,175,55,0.35), 0 0 28px -6px rgba(212,175,55,0.45)",
        "gold-sm": "0 0 18px -4px rgba(212,175,55,0.4)",
        flux: "0 0 22px -2px rgba(90,209,200,0.55)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gold-line": "linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)",
        "vignette": "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,175,55,0.08), transparent 70%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "bounce-soft": {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%": { transform: "scale(1.6)", opacity: "0" },
          "100%": { opacity: "0" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fade-in 0.9s ease both",
        "bounce-soft": "bounce-soft 1.8s ease-in-out infinite",
        "shimmer": "shimmer 6s linear infinite",
        "pulse-ring": "pulse-ring 2.4s ease-out infinite",
        "spin-slow": "spin-slow 14s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
