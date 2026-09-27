/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['Spectral', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        burgundy: '#7A2436',
        goldA: '#7A2436',
        goldB: '#9C3448',
        paper: '#FFFFFF',
        panel: '#FFFFFF',
        ink: '#0A0A0A',
        rule: '#EAEAEA',
      },
      boxShadow: { glass: '0 1px 2px rgba(33,26,22,0.06)' },
      borderRadius: { '2xl': '1.25rem' },
    },
  },
  plugins: [],
};