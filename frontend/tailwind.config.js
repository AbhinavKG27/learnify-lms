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
          dark: '#14062E',
          50: '#f7fcfe',
          100: '#cdedf6',
          200: '#b4dbe5',
          800: '#0f363b',
          900: '#042a2b',
          950: '#031d1e',
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
          50: '#cdeff6',
          100: '#b8e5f0',
          200: '#8cd2df',
          300: '#5eb1bf',
          400: '#4d9aa8',
          500: '#3a7e8a',
          600: '#2a636d',
          700: '#1c4b53',
          800: '#0f363b',
          900: '#042a2b',
          950: '#031d1e',
        },
        accent: {
          300: '#7bc3cf',
          400: '#5eb1bf',
          500: '#4d9ca9',
          600: '#3e8792',
        },
        cta: {
          400: '#f39a70',
          500: '#ef7b45',
          600: '#d84727',
        },
        brand: {
          400: '#5eb1bf',
          500: '#3a7e8a',
          600: '#2a636d',
          700: '#1c4b53',
          900: '#042a2b',
        }
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