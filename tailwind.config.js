/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        primary: {
          1: '#3B71FE',
          2: '#8BC5E5',
          3: '#92A5EF',
          4: '#58C27D',
        },
        secondary: {
          1: '#A0D7E7',
          2: '#E4D7CF',
          3: '#FFD166',
          4: '#FA8F54',
        },
        neutral: {
          1: '#141416',
          2: '#23262F',
          3: '#353945',
          4: '#777E90',
          5: '#B1B5C3',
          6: '#E6E8EC',
          7: '#F4F5F6',
          8: '#FCFCFD',
        },
      },
    },
  },
  plugins: [],
}
