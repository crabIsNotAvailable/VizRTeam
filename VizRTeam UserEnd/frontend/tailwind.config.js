/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGray: '#363839',
        customOrange: '#FF7D4A'
      },
    },
  },
  plugins: [],
}
