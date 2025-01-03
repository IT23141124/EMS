/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "ConcertOne" : ["Concert One", "cursive"],
      }
    },
  },
  plugins: [],
}

