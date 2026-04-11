/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.ts"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef7ff",
          100: "#d8ebff",
          200: "#badcff",
          300: "#8ac6ff",
          400: "#52a7ff",
          500: "#2483ff",
          600: "#0a63f0",
          700: "#094dcc",
          800: "#0d43a6",
          900: "#123a82",
        },
      },
      boxShadow: {
        card: "0 20px 60px rgba(15, 23, 42, 0.18)",
      },
    },
  },
  plugins: [],
};
