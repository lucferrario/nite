/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        backlight: "#ECEDEF",
        backpanel: "#F6F6F6",
        primary: "",
        secondary: "",
        lighttxt: "#BABAC7",
        panelhover: "#F0F0F0",
        hovertxt: "#575757",
      },
      height: {
        screen: "calc(var(--vh, 1vh) * 100)",
      },
      boxShadow: {
        custom: "0px 0px 2px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
