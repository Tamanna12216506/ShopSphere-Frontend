export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        pastel: {
          violet: '#c4b5fd',
          pink: '#f9a8d4',
          mint: '#6ee7b7',
          peach: '#fcd9bd',
          sky: '#bae6fd',
          yellow: '#fde68a',
        },
        dark: {
          900: '#0f0a1e',
          800: '#1a1033',
          700: '#2d1f4e',
          600: '#3d2d6b',
          500: '#5b3f9a',
        },
        surface: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
}