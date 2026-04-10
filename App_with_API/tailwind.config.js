/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('nativewind/preset')],
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        mist: '#eef7fb',
        storm: '#102a43',
        cloud: '#d9eaf7',
        sunrise: '#f7b267',
        rain: '#3e7cb1',
        forest: '#1f7a5c',
        slate: '#486581',
        ink: '#17212b',
        paper: '#fdfdfc'
      },
      boxShadow: {
        soft: '0 10px 24px rgba(16, 42, 67, 0.12)'
      }
    }
  },
  plugins: []
};