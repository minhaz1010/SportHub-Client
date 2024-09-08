/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        protest:['Protest Guerrilla','sans-serif'],
        handjet:['Handjet','sans-serif']
      }
    },
  },
  plugins: [],
}