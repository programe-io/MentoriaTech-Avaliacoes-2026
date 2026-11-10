
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        instagram: {
          blue: "#0095f6",
          gray: "#8e8e8e",
          border: "#dbdbdb",
          background: "#fafafa",
        },
      },
    },
  },
  plugins: [],
};
