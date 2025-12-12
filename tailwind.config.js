/** @type {import('tailwindcss').Config} */ export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#a50d3e",
        "primary-light": "#ca3535",
        secondary: "#1d63a1",
        background: "#0c2c47",
        "product-background": "#173351",
      },
      animation: {
        blob: "blob 10s infinite", // Animación base de 10 segundos
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            // Se mueve a la derecha y arriba, se agranda un poco
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            // Se mueve a la izquierda y abajo, se achica un poco
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            // Vuelve al inicio
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
    },
  },

  plugins: [],
};
