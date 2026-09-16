/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        asphalt: '#16181C',
        surface: '#1F2227',
        ink: '#F1F0EC',
        muted: '#8A8F98',
        line: '#2C3036',
        throttle: {
          DEFAULT: '#F2542D',
          dark: '#C7431F',
        },
        steel: '#6C93B0',
      },
      fontFamily: {
        display: ['Oswald', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}