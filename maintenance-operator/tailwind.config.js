/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      width: {
        '250': '250px', // You can name this key as you like, for example 'custom'
        '350': '330px', // You can name this key as you like, for example 'custom'
        '450': '430px', // You can name this key as you like, for example 'custom'
        '50%': '70%', // You can name this key as you like, for example 'custom'
        '90vh': '90vh'
      },
      colors: {
        'primary': {
          'back': '#DDD0C8',
          'front': '#000000',
          'bg': '#ffe7bf',
          'lightblue': '#F5DEB3',
          'blue': '#ffcba4',
          'darkblue': '#f77f35',
          'yellow': 'black',
        }
      },
      height: {
        '80vh': '80vh',
      },
      fontFamily: {
        'railextra': ['railextra', 'sans-serif'],
        'raillight': ['raillight', 'sans-serif'],
        'railregular': ['railregular', 'sans-serif'],
        'railmedium': ['railmedium', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

