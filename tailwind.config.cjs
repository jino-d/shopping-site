/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{tsx,ts,html}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter var, sans-serif",
          { fontFeatureSettings: '"cv11", "ss01"' },
        ],
      },
      transitionProperty: {
        height: 'height'
      },
    },
  },
  plugins: [],
})