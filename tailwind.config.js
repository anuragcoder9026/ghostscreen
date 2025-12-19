/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust to your project structure
  ],
  darkMode: 'selector', // Enable class-based dark mode using 'selector' strategy
  theme: {
    extend: {},
  },
  plugins: [],
}