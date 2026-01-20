/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': 'rgb(0 102 204 / <alpha-value>)',
        'brand-blue-dark': 'rgb(0 82 163 / <alpha-value>)',
        'neutral': {
          '900': '#020617',
          '800': '#0F172A',
          '700': '#1E293B',
          '600': '#334155',
          '400': '#94A3B8',
          '300': '#CBD5E1',
          '100': '#F8FAFC',
        },
        'success': 'rgb(16 185 129 / <alpha-value>)',
        'warning': 'rgb(245 158 11 / <alpha-value>)',
        'error': 'rgb(239 68 68 / <alpha-value>)',
        'info': 'rgb(59 130 246 / <alpha-value>)',
      },
      spacing: {
        'xs': '0.25rem',
        'sm': '0.5rem',
        'md': '1rem',
        'lg': '1.5rem',
        'xl': '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
      },
      borderRadius: {
        'xs': '0.375rem',
        'sm': '0.75rem',
        'md': '1rem',
        'lg': '1.5rem',
      },
      fontSize: {
        'h1': ['3rem', { lineHeight: '1.1', fontWeight: '600' }],
        'h2': ['2rem', { lineHeight: '1.2', fontWeight: '600' }],
        'h3': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['0.75rem', { lineHeight: '1.4', fontWeight: '400' }],
      },
      transitionTimingFunction: {
        'standard': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'enter': 'cubic-bezier(0.4, 0, 1, 1)',
        'exit': 'cubic-bezier(0, 0, 0.2, 1)',
        'emphasized': 'cubic-bezier(0.2, 0, 0, 1)',
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}