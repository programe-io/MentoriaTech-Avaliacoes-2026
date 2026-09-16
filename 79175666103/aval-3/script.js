/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        bg: '#F5F4F1',
        surface: '#FFFFFF',
        ink: '#1A1D1C',
        muted: '#6B6862',
        line: '#E3E1DC',
        brand: {
          DEFAULT: '#1F6F5C',
          dark: '#164F41',
          light: '#E6F0EC',
        },
        ochre: '#D98F27',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}