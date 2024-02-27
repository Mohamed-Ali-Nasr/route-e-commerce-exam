/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        teal: {
          100: "#ceefce",
          200: "#9dde9d",
          300: "#6cce6c",
          400: "#3bbd3b",
          500: "#0aad0a",
          600: "#088a08",
          700: "#066806",
          800: "#044504",
          900: "#022302",
        },
      },
      boxShadow: {
        "input-focus": "0 0 0 0.25rem rgba(10,173,10,.25)",
      },
    },
  },
  plugins: [],
};
