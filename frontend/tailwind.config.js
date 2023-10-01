/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";
import flowbite from "flowbite/plugin";

// eslint-disable-next-line no-undef
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {},
    },
  },
  plugins: [flowbite],
});
