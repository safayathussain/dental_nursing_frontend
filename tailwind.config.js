/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "!./components/TextEditor.jsx",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3C55A5',
        secondary: '#1BB68A',
        'secondary-mid': '#E8F8F3',
        'secondary-low': '#F1FBF8',
'lightGray': '#4B5563'
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};
