/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: null,
            img: {
              maxWidth: '100%',
            },
            p: {
              overflowWrap: 'break-word',
              wordWrap: 'break-word',
              wordBreak: 'break-word',
              hyphens: 'auto',
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
