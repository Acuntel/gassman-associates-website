import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        oxblood: {
          DEFAULT: "#5C1F23",
          dark: "#421518",
          light: "#7A2D32",
        },
        camel: {
          DEFAULT: "#B58A5A",
          light: "#D9BE96",
          dark: "#8E6938",
        },
        ivory: {
          DEFAULT: "#FAF6EE",
          warm: "#F2EBDC",
        },
        ink: "#1C1A18",
        muted: "#6E6964",
        border: "#E5DDCC",
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out forwards",
        "fade-in": "fadeIn 0.6s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
