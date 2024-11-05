/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          900: '#1a1b1e',
          800: '#2c2e33',
          700: '#3e4047',
          600: '#4a4b50',
          400: '#9ca3af',
          100: '#f3f4f6',
        },
        teal: {
          400: '#2dd4bf',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};