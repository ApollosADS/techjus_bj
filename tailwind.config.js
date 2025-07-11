/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './public/**/*.html'
  ],
  theme: {
    extend: {
      colors: {
        techjus: {
          blue: '#005DA4',
          green: '#1CA639',
          yellow: '#FFD600',
          red: '#E30613',
          light: '#F5F9FC',
          indigo: '#818cf8',
          purple: '#a855f7',
          orange: '#fdba74',
          gradientFrom: '#f0f9ff',
          gradientTo: '#e0e7ff',
        },
        blue: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          600: '#2563eb',
        },
        indigo: {
          100: '#e0e7ff',
        },
        green: {
          100: '#dcfce7',
          600: '#16a34a',
        },
        purple: {
          100: '#f3e8ff',
          600: '#9333ea',
        },
        orange: {
          100: '#ffedd5',
          600: '#ea580c',
        }
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
        code: ['Fira Code', 'monospace']
      },
      spacing: {
        18: '4.5rem',
        112: '28rem',
        128: '32rem'
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'scroll-slow': 'scroll-slow 40s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'scroll-slow': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      backgroundImage: {
        'techjus-pattern': "url('/src/assets/bg-pattern.svg')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))'
      },
      boxShadow: {
        'techjus': '0 4px 20px rgba(0, 93, 164, 0.15)',
        'techjus-lg': '0 10px 30px rgba(0, 93, 164, 0.2)',
        'presentation-card': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'presentation-icon': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '3rem'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-animate'),
    function({ addUtilities }) {
      const newUtilities = {
        '.text-balance': {
          'text-wrap': 'balance'
        },
        '.scroll-smooth': {
          'scroll-behavior': 'smooth'
        },
        '.hide-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        },
        '.animation-paused': {
          'animation-play-state': 'paused',
        },
        '.animation-running': {
          'animation-play-state': 'running',
        }
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
    function({ addUtilities }) {
      const newUtilities = {
        '.animate-gradient': {
          backgroundSize: '300% 300%',
          animation: 'gradient 8s ease infinite',
        },
        '@keyframes gradient': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover']);
    }
  ],
  darkMode: 'class',
  // Remplacer purge par safelist directement à la racine
  safelist: [
    'bg-techjus-blue',
    'bg-techjus-green',
    'bg-techjus-yellow',
    'bg-techjus-red',
    'text-techjus-blue',
    'text-techjus-green',
    'text-techjus-yellow',
    'text-techjus-red',
    'dark:bg-techjus-dark',
    'dark:text-techjus-light',
    'animate-scroll-slow',
    'animation-paused',
    'animation-running'
  ]
}