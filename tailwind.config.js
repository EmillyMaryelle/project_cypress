/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        detail: '#e4a691',
        primary: '#f7efd8',
        secondary: '#c8c8a9',
        muted: '#556270',
        dark: '#273142',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 8px 24px -8px rgba(39, 49, 66, 0.15)',
        card: '0 4px 16px -4px rgba(39, 49, 66, 0.12)',
      },
    },
  },
  plugins: [],
}
