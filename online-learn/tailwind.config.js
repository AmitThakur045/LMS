module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      textColor: {
        primary: "#046387",
        secondary: "#f48320",
      },
      backgroundColor: {
        primary: "#046387",
        primaryHover: "#02374a",
        secondary: "#f48320",
        secondaryHover: "#924807",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
