/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        german: {
          black: '#121214',
          red: '#DD0000',
          gold: '#FFCC00',
          darkRed: '#990000',
          amber: '#E5A919',
          cream: '#FFFDF9',
          bread: '#D4A373',
          pretzel: '#8B4513',
          beer: '#F39C12',
          forest: '#2D4B39'
        },
        gender: {
          der: '#2563EB',
          die: '#DC2626',
          das: '#16A34A',
          plural: '#9333EA'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Playfair Display', 'Merriweather', 'serif'],
        display: ['Outfit', 'Cabinet Grotesk', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        steam: {
          '0%': { transform: 'translateY(0) scaleX(1)', opacity: '0' },
          '50%': { opacity: '0.6' },
          '100%': { transform: 'translateY(-24px) scaleX(1.4)', opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2.5s ease-in-out infinite',
        steam: 'steam 2.5s ease-out infinite',
        marquee: 'marquee 30s linear infinite',
        marqueeReverse: 'marqueeReverse 30s linear infinite'
      }
    },
  },
  plugins: [],
}
