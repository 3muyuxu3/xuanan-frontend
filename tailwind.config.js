module.exports = {
  darkMode: ["class"],
  content: ["./public/index.html", "./src/**/*.{vue,js,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-animate"), require("@inspira-ui/plugins")],
};
