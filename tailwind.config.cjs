/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        "corporative-blue": "#1a51d2",
        "corporative-blue-hover": "#1f65e0",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
