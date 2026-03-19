/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './context/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF4500',
        background: '#FFFFFF',
        foreground: '#1A1A1A',
        muted: '#F5F5F5',
      },
      fontFamily: {
        sans: ['Poppins', 'Avenir Next', 'Segoe UI', 'sans-serif'],
        display: ['Poppins', 'Avenir Next', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0, 0, 0, 0.08)',
      },
    },
  },
};
