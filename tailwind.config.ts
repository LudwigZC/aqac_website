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
        navy: "#173C57",
        orange: "#8D3D35",
        crimson: "#B14F43",
        parchment: "#F5F8F9",
        mist: "#D4E0E5",
        ink: "#163043",
        ivory: "#F5F8F9",
        muted: "#E7EEF1",
        warmgray: "#50636F",
        gold: "#B14F43",
        "gold-light": "#E9B7AD",
      },
      fontFamily: {
        serif: ["var(--font-heading)", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow:
          "0 0 0 1px rgba(177,79,67,.18), 0 20px 50px rgba(14,38,56,.14)",
        glass: "0 20px 60px rgba(22, 48, 67, 0.12)",
      },
      backgroundImage: {
        grain:
          "radial-gradient(circle at 20% 20%, rgba(177,79,67,.10), transparent 30%), radial-gradient(circle at 80% 10%, rgba(233,183,173,.12), transparent 25%), radial-gradient(circle at 50% 80%, rgba(255,255,255,.18), transparent 35%)",
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
