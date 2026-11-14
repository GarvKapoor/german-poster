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
          der: '#2563EB', // masculine - blue
          die: '#DC2626', // feminine - red
          das: '#16A34A', // neuter - green
          plural: '#9333EA' // plural - purple
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Playfair Display', 'Merriweather', 'serif'],
        display: ['Cabinet Grotesk', 'Outfit', 'sans-serif'],
        gothic: ['UnifrakturMaguntia', 'cursive', 'serif']
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        steam: {
          '0%': { transform: 'translateY(0) scaleX(1)', opacity: '0' },
          '50%': { opacity: '0.6' },
          '100%': { transform: 'translateY(-20px) scaleX(1.3)', opacity: '0' },
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2.5s ease-in-out infinite',
        steam: 'steam 2.5s ease-out infinite'
      }
    },
  },
  plugins: [],
}
