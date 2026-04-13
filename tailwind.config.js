/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFBF5',
          100: '#FFF8E7',
          200: '#F5E6CC',
          300: '#E8D4B8',
          400: '#D4C4A8',
        },
        brown: {
          50: '#8B7355',
          100: '#5C4033',
          200: '#4A3328',
          300: '#3D2914',
        },
        gold: {
          100: '#F4E4BC',
          200: '#D4AF37',
          300: '#B8960C',
          400: '#9A7B0A',
        },
        dark: {
          100: '#2E2E2E',
          200: '#1A1A1A',
          300: '#0D0D0D',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(92, 64, 51, 0.08)',
        'glow': '0 0 20px rgba(212, 175, 55, 0.3)',
      }
    },
  },
  plugins: [],
}