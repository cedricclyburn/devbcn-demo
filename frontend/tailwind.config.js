/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'barcelona': {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
          primary: '#A50E2C',
          secondary: '#004D98',
          accent: '#FFED02'
        },
        'real': {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
          primary: '#FEBE10',
          secondary: '#00529F',
          accent: '#FFFFFF'
        }
      },
      fontFamily: {
        'sans': ['Inter', 'Arial', 'sans-serif'],
        'barcelona': ['Inter', 'Arial', 'sans-serif'],
        'real': ['Inter', 'Arial', 'sans-serif']
      },
      animation: {
        'fly-out-left': 'flyOutLeft 1s ease-in-out',
        'fly-out-right': 'flyOutRight 1s ease-in-out',
        'bounce-in': 'bounceIn 0.6s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite'
      },
      keyframes: {
        flyOutLeft: {
          '0%': { transform: 'translateX(0) translateY(0) rotate(0deg) scale(1)', opacity: '1' },
          '100%': { transform: 'translateX(-200vw) translateY(-100vh) rotate(-360deg) scale(0)', opacity: '0' }
        },
        flyOutRight: {
          '0%': { transform: 'translateX(0) translateY(0) rotate(0deg) scale(1)', opacity: '1' },
          '100%': { transform: 'translateX(200vw) translateY(-100vh) rotate(360deg) scale(0)', opacity: '0' }
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.02)' }
        }
      }
    },
  },
  plugins: [],
} 