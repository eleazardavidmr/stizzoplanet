/** @type {import('tailwindcss').Config} */ export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#a50d3e",
        "primary-light": "#ca3535",
        secondary: "#1d63a1",
        background: "#0c2c47",
      },
    },
  },

  plugins: [],
};
