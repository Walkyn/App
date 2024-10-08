/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      boxShadow: {
        'green-3d': '0 4px 8px rgba(34, 197, 94, 0.5)',
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
        userSelect: {
          'none': 'none',
        },
      },
      maxHeight: {
        '32': '12rem',
        '64': '28rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40.5rem',
        '192': '48rem',
        'screen-md': 'calc(100vh - 3rem)',
        'screen-lg': 'calc(100vh - 6rem)',
      },
      
    },
  },
  plugins: [],
}

