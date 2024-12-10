/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-venetian-lace': '#F7EDDA',
        'custom-macadamia-beige': '#F7GFBA',
        'custom-pumpkin-vapor': '#FFA74F',
        'custom-fiery-glow': '#F0531C',
        'custom-norfolk-green': '#2E4B3C',
        'custom-fence-green': '#09332C',

        'custom-fiery-glow-0.3': 'rgba(240, 83, 28, 0.3)',
        'custom-fiery-glow-0.5': 'rgba(240, 83, 28, 0.5)',
        'custom-fiery-glow-0.8': 'rgba(240, 83, 28, 0.8)',
      },
    },
  },
  darkMode: 'media',
  plugins: [],
}

