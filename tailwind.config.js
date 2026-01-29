/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        ab: "950px",
        xs: "420px",
        xss: "360px",
      },
      fontSize: {
        // ✅ This is the correct syntax for both v3 and v4
        '6xl': ['3.75rem', { lineHeight: '1.2' }], 
      },  
    },
  },
  plugins: [
        require('tw-animate-css'), // Make sure to require your plugins
  ],
};
