/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./lib/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#e9f6ef",
          100: "#cfe9da",
          200: "#a8d5bc",
          300: "#78bb95",
          400: "#459f6f",
          500: "#008540",
          600: "#00753a",
          700: "#02683c",
          800: "#0d573f",
          900: "#0d573f"
        },
        gold: {
          50: "#faf7e8",
          100: "#f4efcc",
          200: "#ece09e",
          300: "#dac961",
          400: "#c6ad39",
          500: "#dac961",
          600: "#bca848",
          700: "#aa8a00",
          800: "#8f7609",
          900: "#6f5f0c"
        },
        petrol: {
          50: "#e6f1f4",
          100: "#c8dde4",
          200: "#9fbdcb",
          300: "#6f99ae",
          400: "#3a748d",
          500: "#003e51",
          600: "#003547",
          700: "#003143",
          800: "#0d2f3a",
          900: "#19282d"
        },
        forest: "#0d573f",
        stone: "#aa8a00",
        sand: "#f7f5ee",
        ink: "#373938",
        accent: "#dac961",
        success: "#008540",
        danger: "#d14343"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(55, 57, 56, 0.10)"
      },
      borderRadius: {
        "2xl": "1.5rem"
      }
    }
  },
  plugins: []
};
