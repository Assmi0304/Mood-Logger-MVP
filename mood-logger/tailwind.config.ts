import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F6F1E9",
        card: "#E7D8C9",
        primaryText: "#3E3A36",
        secondaryText: "#6B625B",
        accent: "#A67C52",
        border: "#D8C4B6",
        highlight: "#C7A27C",
      },
      fontFamily: {
        serif: ["var(--font-dm-serif)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px rgba(62, 58, 54, 0.08)",
        softLift: "0 14px 34px rgba(62, 58, 54, 0.12)",
      },
      borderRadius: {
        card: "20px",
      },
      transitionTimingFunction: {
        soft: "ease",
      },
      keyframes: {
        boomIn: {
          "0%": { opacity: "0", transform: "scale(0.6) translateY(6px)" },
          "60%": { opacity: "1", transform: "scale(1.08) translateY(-2px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        boomOut: {
          "0%": { opacity: "1", transform: "scale(1) translateY(0)" },
          "100%": { opacity: "0", transform: "scale(0.85) translateY(-6px)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-4px)" },
          "75%": { transform: "translateX(4px)" },
        },
      },
      animation: {
        boomIn: "boomIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        boomOut: "boomOut 0.3s ease forwards",
        shake: "shake 0.35s ease",
      },
    },
  },
  plugins: [],
};

export default config;
