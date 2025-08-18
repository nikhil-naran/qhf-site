/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        burgundy: '#4A1C27',
        goldA: '#C5A16D',
        goldB: '#E2C784',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(90deg, #C5A16D, #E2C784)',
        'hero-gradient':
          'radial-gradient(1200px 800px at 20% -10%, rgba(197,161,109,0.25), transparent 60%), radial-gradient(1000px 700px at 80% 10%, rgba(226,199,132,0.2), transparent 60%), linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.8))',
      },
      boxShadow: { glass: '0 8px 32px rgba(0,0,0,0.35)' },
      borderRadius: { '2xl': '1.25rem' },
      keyframes: {
        sheen: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        ripple: { '0%': { transform: 'scale(0)', opacity: '0.6' }, '100%': { transform: 'scale(1)', opacity: '0' } },
        shimmer: { '0%': { backgroundPosition: '0% 50%' }, '100%': { backgroundPosition: '200% 50%' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-4px)' } },
      },
      animation: {
        sheen: 'sheen 1.6s linear infinite',
        ripple: 'ripple 800ms ease-out',
        shimmer: 'shimmer 2.5s ease-in-out infinite',
        float: 'float 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};