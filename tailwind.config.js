/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "fact-text-light": "#535353",
        "fact-text-medium": "#1B2636",
        "fact-text-dark": "#000000",
        "fact-text-red": "#3F0202",
        "fact-blue": "#1B5BFD",
        "fact-green": "#B1EFA7",
        "fact-red": "#FF9494",
        "fact-background": "#F6F9FB",
        "fact-red-gr-1": "#FD4B18",
        "fact-red-gr-2": "#FF5F5F",
        "fact-green-gr-1": "#81FBB8",
        "fact-green-gr-2": "#28C76F",
      },
    },
  },
  plugins: [],
};
