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
        navy: "#001F3F",
        orange: "#F28C28",
        crimson: "#B22222",
        parchment: "#F4EEE3",
        mist: "#D6D8DC",
        ink: "#08111E",
      },
      fontFamily: {
        serif: ["var(--font-heading)", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow:
          "0 0 0 1px rgba(242,140,40,.15), 0 20px 50px rgba(0,31,63,.18)",
        glass: "0 20px 60px rgba(0, 18, 36, 0.18)",
      },
      backgroundImage: {
        grain:
          "radial-gradient(circle at 20% 20%, rgba(242,140,40,.08), transparent 30%), radial-gradient(circle at 80% 10%, rgba(178,34,34,.08), transparent 25%), radial-gradient(circle at 50% 80%, rgba(255,255,255,.06), transparent 35%)",
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