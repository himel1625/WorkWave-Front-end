/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lightPrimary: '#ecf0f4',
        lightSecondary: '#FFFFFF',
        darkPrimary: '#232b3e',
        darkSecondary: '#1a202e',
      },
      fontFamily: {
        Roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
