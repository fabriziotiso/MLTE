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
          DEFAULT: '#FFFBF5',
          dark: '#F5EFE4',
          darker: '#EDE4D6',
        },
        navy: {
          DEFAULT: '#1A1A2E',
          light: '#2D2D4E',
          lighter: '#3D3D5E',
        },
        forest: {
          DEFAULT: '#2D5F3F',
          light: '#3A7A52',
          dark: '#1F4229',
          pale: '#E8F2EC',
        },
        terra: {
          DEFAULT: '#D4956A',
          light: '#E8B08A',
          pale: '#FAF0E8',
          dark: '#B8774F',
        },
        gold: {
          DEFAULT: '#C5A55A',
          light: '#D4B870',
          pale: '#FAF5E8',
        },
        sand: {
          DEFAULT: '#E8E0D4',
          light: '#F2EDE5',
          dark: '#D4C8B8',
        },
      },
      fontFamily: {
        heading: ['var(--font-dm-serif)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        warm: '0 2px 16px 0 rgba(45,30,15,0.08)',
        'warm-md': '0 4px 24px 0 rgba(45,30,15,0.12)',
        'warm-lg': '0 8px 40px 0 rgba(45,30,15,0.16)',
        card: '0 1px 4px rgba(45,30,15,0.06), 0 4px 16px rgba(45,30,15,0.08)',
        'card-hover': '0 4px 12px rgba(45,30,15,0.10), 0 12px 32px rgba(45,30,15,0.12)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(to top, rgba(26,26,46,0.85) 0%, rgba(26,26,46,0.4) 50%, transparent 100%)',
        'gradient-card': 'linear-gradient(to top, rgba(26,26,46,0.75) 0%, transparent 60%)',
        'gradient-warm': 'linear-gradient(135deg, #FFFBF5 0%, #F5EFE4 100%)',
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
