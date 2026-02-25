/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom colors for the glassmorphism dark theme
      colors: {
        surface: {
          base: "rgba(10, 12, 20, 1)",
          card: "rgba(255, 255 255, 0.05)",
          input: "rgba(255, 255, 255, 0.08)",
        },
        accent: {
          green: "#4ade80",
          red: "#f87171",
          blue: "#60a5fa",
        },
      },
      // Custom backdrop blur value for the glassmorphism effect
      backdropBlur: {
        glass: "12px",
      },
    },
  },
  plugins: [],
};

