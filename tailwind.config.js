/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blush: {
          50: '#fff6f8',
          100: '#ffe9ef',
          200: '#fdd3e0',
          300: '#f9aec6',
          400: '#f087a8',
          500: '#e0648c',
          600: '#c44a74',
          700: '#a33a5e',
          800: '#84304f',
          900: '#5f2439',
        },
        lavender: {
          50: '#f8f6ff',
          100: '#efeafc',
          200: '#ddd3f7',
          300: '#c5b5ef',
          400: '#a893e3',
          500: '#8b74d4',
          600: '#7559bd',
          700: '#5f469b',
          800: '#4d3a7d',
          900: '#3a2c5e',
        },
        gold: {
          50: '#fcf8f4',
          100: '#f7ede5',
          200: '#eedacb',
          300: '#e3bfa6',
          400: '#d4a085',
          500: '#c18469',
          600: '#a86a52',
          700: '#8a5340',
          800: '#6e4132',
          900: '#4f2e24',
        },
        midnight: {
          700: '#2e2250',
          800: '#241a40',
          900: '#1a1131',
          950: '#120b24',
        },
        cream: '#fffaf5',
        ink: '#3a2b4a',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Manrope', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
