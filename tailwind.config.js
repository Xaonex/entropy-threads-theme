/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './src/components/react-bits/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'void-black': '#050505',
        'off-black': '#111111',
        'signal-red': '#FF3333',
        'cyan-glitch': '#00FFFF',
        'static-gray': '#888888',
      },
    },
  },
  plugins: [],
}
