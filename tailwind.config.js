/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.pug"],
  theme: {
    extend: {
      boxShadow: {
        'sharp': '13px 16px 0 2px rgba(0, 0, 0, 0.6)',
        'sharp-sm': '6px 8px 0 2px rgba(0, 0, 0, 0.6)',

      }
    },
  },
  plugins: [],
}

