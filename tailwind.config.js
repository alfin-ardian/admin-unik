/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        spartan: ["League Spartan", "sans-serif"],
      },
      colors: {
        primary: "#5242F4",
        primaryDark: "#4838EA",
        primaryLight: "#F5F5FF",
        secondary: "#EDEDED",
        darkPrimary: "#2E3230",
        darkPrimaryDark: "#252626",
        gold: "#B3A071",
        darkGold: "#887649",
      },
      boxShadow: {
        default: "1px 4px 13px -3px rgba(9, 17, 87, 0.07)",
      },
    },
  },
  plugins: [],
};
