/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#8884d8',
        secondary: '#82ca9d',
        axis: '#ccc',
        grid: '#e0e0e0',
        text: '#333',
      },
    },
  },
};