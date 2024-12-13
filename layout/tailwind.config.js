/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-venetian-lace': {
          DEFAULT: '#F7EDDA',
          0.8: 'rgba(247, 237, 218, 0.8)',
        },
        'custom-macadamia-beige': '#F7GFBA',
        'custom-pumpkin-vapor': '#FFA74F',
        'custom-fiery-glow': {
          DEFAULT: '#F0531C',
          0.5: 'rgba(240, 83, 28, 0.5)',
          0.8: 'rgba(240, 83, 28, 0.8)',
        },
        'custom-norfolk-green': '#2E4B3C',
        'custom-fence-green': {
          DEFAULT: '#09332C',
          0.5: 'rgba(9, 51, 44, 0.5)',
          0.8: 'rgba(9, 51, 44, 0.8)',
        },
        'custom-gray': {
          DEFAULT: '#A6A6A6',
          0.9: 'rgba(166, 166, 166, 0.9)',
        },
        'custom-orange': {
          DEFAULT: '#EF531C',
          0.9: 'rgba(239, 83, 28, 0.9)',
        },
      },
      boxShadow: {
        'fiery-glow-glow': '0 0 25px 5px rgba(240, 83, 28, 0.5)',
      },
      textShadow: {
        'fiery-glow-glow': '0 0 40px rgba(240, 83, 28)',
      },
    },
  },
  darkMode: 'media',
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-glow': {
          'text-shadow': '0 0 40px rgba(240, 83, 28)',
        },
      }
      addUtilities(newUtilities)
    },
  ],
}

