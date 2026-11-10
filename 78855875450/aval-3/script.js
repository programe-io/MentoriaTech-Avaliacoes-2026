
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        instagram: {
          blue: "#0095f6",
          gray: "#737373",
          border: "#dbdbdb",
          background: "#fafafa",
        },
      },
    },
  },
  plugins: [],
};
