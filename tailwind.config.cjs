/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'day-animation': 'growth 0.3s linear 1 forwards'
      },
      keyframes: {
        growth: {
          '0%': {
            transform: 'scale(1)'
          },
          '100%': {
            transform: 'scale(1.3)'
          }
        }
      }
    },
  },
  plugins: [],
}
