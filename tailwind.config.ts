import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",

  plugins: [
    require("@tailwindcss/forms"),
    nextui({
      themes: {
        light: {
          layout: {},
          colors: {
            primary: {
              1: "#ccccc",
              2: "#f1f5f9",
              3: "#cbd5e1",
            },
            secondary: {
              1: "#020617",
              2: "#1e293b",
              3: "#475569",
            },
            primaryText: {
              1: "#ccccc",
              2: "#f1f5f9",
              3: "#cbd5e1",
            },
            secondaryText: {
              1: "#020617",
              2: "#1e293b",
              3: "#475569",
            },
          },
        },
        dark: {
          layout: {},
          colors: {
            primary: {
              1: "#020617",
              2: "##fecaca",
              3: "#475569",
            },
            secondary: {
              1: "#ccccc",
              2: "#f1f5f9",
              3: "#cbd5e1",
            },
            primaryText: {
              1: "#020617",
              2: "#1e293b",
              3: "#475569",
            },
            secondaryText: {
              1: "#ccccc",
              2: "#f1f5f9",
              3: "#cbd5e1",
            },
          },
        },
        pink: {
          layout: {},
          colors: {
            primary: {
              1: "#fef2f2",
              2: "#f9a8d4",
              3: "#f472b6",
            },
            secondary: {
              1: "#db2777",
              2: "#be185d",
              3: "#9d174d",
            },
            primaryText: {
              1: "#fce7f3",
              2: "#f9a8d4",
              3: "#f472b6",
            },
            secondaryText: {
              1: "#db2777",
              2: "#be185d",
              3: "#9d174d",
            },
          },
        },
      },
    }),
  ],
};
export default config;
