const { transform, animate, animations } = require('framer-motion');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        helvetica: ['Helvetica', 'Helvetica Neue', 'Arial', 'sans-serif'],
        sans: ['Helvetica', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['Helvetica', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['Helvetica', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      keyframes: {
        floatShip: {
          "0% , 100%": {
            transform:
              "translateY(0px)"
          },
          "50%": {
            transform:
              "translateY(-10px)"
          },
        },
        animation: {
          floatShip: "floatShip 4s ease-in-out infinite"
        },
      },
    },
  },
  plugins: [],
};

