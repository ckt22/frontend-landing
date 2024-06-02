/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)"],
      },
      colors: {
        "primary-green": "#2EC4B6",
        "primary-orange": "#FF9F1C",
        "secondary-green": "#CBF3F0",
        "secondary-orange": "FFBF69",
      },
    },
  },
  plugins: [],
};
