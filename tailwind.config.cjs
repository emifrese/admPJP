/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "day-animation": "growth 0.3s linear 1 forwards",
        "modal-animation": "slideDown 0.3s ease-out forwards",
        "menu-animation": "menuSlide 0.3s ease-out forwards"
      },
      keyframes: {
        growth: {
          "0%": {
            transform: "scale(1)",
          },
          "100%": {
            transform: "scale(1.3)",
          },
        },
        slideDown: {
          "0%": {
            opacity: "0",
            transform: "translateY(-3rem)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        menuSlide: {
          "0%": {
            zIndex: "-10",
            opacity: "0",
            transform: "translate(0)"
          },
          "100%": {
            zIndex: "1",
            opacity: "1",
            transform: "translateY(4rem)"
          }
        }
      },
    },
  },
  plugins: [],
};
