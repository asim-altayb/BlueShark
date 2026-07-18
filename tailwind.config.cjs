/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        marine: {
          50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc',
          400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1',
          800: '#075985', 900: '#0c4a6e', 950: '#082f49',
        },
      },
      fontFamily: {
        sans: ['IBM Plex Sans Arabic', 'Helvetica Neue', 'Arial', 'sans-serif'],
        helvetica: ['IBM Plex Sans Arabic', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      keyframes: {
        floatShip: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        floatShip: 'floatShip 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
