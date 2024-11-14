/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightSky: "#E5F7FB",
        softAqua: "#C4EEF8",
        aqua: "#58D1EC",
        deepSea: "#117991",
        ocean: "#0C5668",
        midnightBlue: "#29333F"
      }
    },
  },
  plugins: [],
}