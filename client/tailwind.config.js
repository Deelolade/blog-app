/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        spin: 'spin 5s linear infinite', // Default Tailwind spin
        customSpin: 'customSpin 5s linear infinite', // Custom animation
      },
      keyframes: {
        customSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
    },
  }
  },
  plugins: [
    require('daisyui'),
  ],
}