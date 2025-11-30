/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Hyper-minimal terminal-inspired palette
        graphite: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e8e8e8',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#3a3a3a',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        accent: {
          DEFAULT: '#00ff88',
          dim: '#00cc6a',
          dark: '#00ff88',
          light: '#00aa55',
        },
      },
      fontFamily: {
        mono: ['"SF Mono"', '"JetBrains Mono"', '"Fira Code"', 'Consolas', 'monospace'],
      },
      transitionProperty: {
        'none': 'none',
      },
    },
  },
  plugins: [],
};