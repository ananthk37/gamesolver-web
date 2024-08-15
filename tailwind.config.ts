import type { Config } from "tailwindcss";
import colors from 'tailwindcss/colors';

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
        "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:
      {
              color0: colors.white,
              color1: colors.red,
              color2: colors.yellow,
              color3: colors.blue,
              color4: colors.orange,
              color5: colors.green,
              color6: colors.fuchsia
        
      }
    },
  },
  plugins: [],
};
export default config;

