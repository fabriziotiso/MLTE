import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FAFAF8',
          dark: '#F0EDEA',
          darker: '#E5E0DA',
        },
        navy: {
          DEFAULT: '#1a3a52',
          light: '#254565',
          lighter: '#2f5278',
        },
        forest: {
          DEFAULT: '#1a3a52',
          light: '#254565',
          dark: '#142d42',
          pale: '#E8EEF4',
        },
        terra: {
          DEFAULT: '#FF8C42',
          light: '#FFA866',
          pale: '#FFF3EC',
          dark: '#E07030',
        },
        gold: {
          DEFAULT: '#FF8C42',
          light: '#FFA866',
          pale: '#FFF3EC',
        },
        sand: {
          DEFAULT: '#E8E4DE',
          light: '#F0EDEA',
          dark: '#D4CEC8',
        },
      },
      fontFamily: {
        heading: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        warm: '0 2px 16px 0 rgba(0,0,0,0.07)',
        'warm-md': '0 4px 24px 0 rgba(0,0,0,0.10)',
        'warm-lg': '0 8px 40px 0 rgba(0,0,0,0.13)',
        card: '0 4px 12px rgba(0,0,0,0.07)',
        'card-hover': '0 6px 20px rgba(0,0,0,0.12)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(to top, rgba(26,58,82,0.85) 0%, rgba(26,58,82,0.4) 50%, transparent 100%)',
        'gradient-card': 'linear-gradient(to top, rgba(26,58,82,0.75) 0%, transparent 60%)',
        'gradient-warm': 'linear-gradient(135deg, #FAFAF8 0%, #F0EDEA 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      spacing: {
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-top': 'env(safe-area-inset-top)',
      },
    },
  },
  plugins: [],
}

export default config
