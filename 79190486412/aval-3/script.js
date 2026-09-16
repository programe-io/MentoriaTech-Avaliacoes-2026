/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        bg: '#F4F3EE',
        surface: '#FFFFFF',
        ink: '#122118',
        muted: '#6B6862',
        line: '#E1DFD7',
        pitch: {
          DEFAULT: '#2D6A4F',
          dark: '#1B4332',
          light: '#E3EFE8',
        },
        gold: {
          DEFAULT: '#E9C46A',
          dark: '#B8873A',
        },
        card: '#C94C4C',
      },
      fontFamily: {
        display: ['Teko', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}