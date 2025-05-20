/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        techjus: {
          blue: '#005DA4',
          green: '#1CA639',
          yellow: '#FFD600',
          red: '#E30613',
          light: '#F5F9FC',
        },
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};