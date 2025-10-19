/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Fira Sans', 'sans-serif'],
      },
      colors: {
        'cv-dark': '#1a2328',
        'cv-text': 'rgba(255, 255, 255, 0.8)',
        'cv-white': 'rgba(255, 255, 255, 1)',
        'cv-muted': '#9297a8',
      },
    },
  },
  plugins: [],
}
