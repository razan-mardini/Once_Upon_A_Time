/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",

  theme: {
    extend: {
      colors: {
        primary: "#1182c5",
        secondary: "#2aa6df",
      },
      animation: {
        "spin-slow": "spin-slow 20s linear infinite",
      },
      keyframes: {
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      fontFamily: {
        sevillana: ["Sevillana", "cursive"],
      },

      container: {
        center: true,
        padding: {
          default: "1rem",
          sm: "4rem",
        },
      },
    },
  },
  plugins: [],
};
