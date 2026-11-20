/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#1648a8',
          darkBlue: '#0c2e6b',
          navy: '#0f172a',
          orange: '#ea580c',
          orangeHover: '#c2410c',
          lightBlue: '#eff6ff',
          badgeBlue: '#e0e7ff',
          badgeText: '#3730a3',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
