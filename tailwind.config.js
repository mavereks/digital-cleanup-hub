/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // University of St. Thomas brand colors — see ustbrandcolors.json
        // Primary purples (dominant), medium purple tints 10–100
        plum: {
          50: '#f2eaf6',   // mediumPurple tint 10
          100: '#e6d8ee',  // tint 20
          200: '#dac5e6',  // tint 30
          300: '#ceb3de',  // tint 40
          400: '#b68fce',  // tint 60
          500: '#9d6bbd',  // tint 80
          600: '#8348ad',  // mediumPurple (Pantone 2587 C)
          700: '#510c76',  // darkPurple (Pantone 2607 C)
          800: '#510c76',
          900: '#510c76',
        },
        // Secondary accents — use sparingly
        leaf: '#4c9c2e',     // emeraldGreen (Pantone 362 C)
        orchid: '#9e28b5',   // brightPurple (Pantone 2592 C)
      },
    },
  },
  plugins: [],
}
