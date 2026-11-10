/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        instagram: "#0095f6",
        background: "#fafafa",
        border: "#dbdbdb",
      },
    },
  },
  plugins: [],
};