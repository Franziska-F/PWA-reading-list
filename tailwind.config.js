/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        main: ['Roboto'],
      },
      backgroundImage: {
        'hero-img': "url('/img/libery.jpg')",
      },
      colors: {
        'main-bg': '#393a4e',
        btn: '#E0B197',
        container: '#262735',
      },
    },
  },
  plugins: [],
};
