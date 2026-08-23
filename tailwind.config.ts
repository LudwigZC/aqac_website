import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{json,md}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#1A1A1A",
        orange: "#B8860B",
        crimson: "#B8860B",
        parchment: "#FAFAF8",
        mist: "#E8E4DF",
        ink: "#1A1A1A",
        ivory: "#FAFAF8",
        muted: "#F5F3F0",
        warmgray: "#6B6B6B",
        gold: "#B8860B",
        "gold-light": "#D4A84B",
      },
      fontFamily: {
        serif: ["var(--font-heading)", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow:
          "0 0 0 1px rgba(184,134,11,.16), 0 20px 50px rgba(26,26,26,.12)",
        glass: "0 20px 60px rgba(26, 26, 26, 0.10)",
      },
      backgroundImage: {
        grain:
          "radial-gradient(circle at 20% 20%, rgba(184,134,11,.10), transparent 30%), radial-gradient(circle at 80% 10%, rgba(212,168,75,.08), transparent 25%), radial-gradient(circle at 50% 80%, rgba(255,255,255,.12), transparent 35%)",
      },
      animation: {
        float: "float 8s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
