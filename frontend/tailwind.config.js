/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#F6F4FF',
          dark: '#0B0220',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#1A0B3A',
          50: '#FFFFFF',
          100: '#F8F5FF',
          200: '#EEE8FF',
          800: '#2A1454',
          900: '#1A0B3A',
          950: '#14062E',
        },
        'text-primary': {
          DEFAULT: '#1A1233',
          dark: '#F5F3FF',
        },
        'text-secondary': {
          DEFAULT: '#5E5A80',
          dark: '#B8B5D6',
        },
        neon: {
          pink: '#FF2E9F',
          orange: '#FF7A18',
          violet: '#7B61FF',
          accent: '#FF4ECD',
        },
        primary: {
          50: '#F5F1FF',
          100: '#ECE5FF',
          200: '#D6CBFF',
          300: '#B8A5FF',
          400: '#9A7EFF',
          500: '#7B61FF',
          600: '#6D4FFF',
          700: '#5638D9',
          800: '#3A2395',
          900: '#25145D',
          950: '#14062E',
        },
        accent: {
          300: '#FF78DA',
          400: '#FF4ECD',
          500: '#FF2E9F',
          600: '#E7228D',
        },
        cta: {
          400: '#FF9C57',
          500: '#FF7A18',
          600: '#EA5F00',
        },
        brand: {
          400: '#9A7EFF',
          500: '#7B61FF',
          600: '#6D4FFF',
          700: '#5638D9',
          900: '#25145D',
        },
        textPrimary: '#F5F3FF',
        textSecondary: '#B8B5D6'
      },
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-in': 'slideIn 0.3s ease-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'btn-primary-gradient': 'linear-gradient(90deg, #FF2E9F 0%, #FF7A18 100%)',
        'brand-primary-gradient': 'linear-gradient(120deg, #FF2E9F 0%, #7B61FF 100%)',
        'hero-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%235EB1BF' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};