import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        linen: {
          50: "#FCFAF6",
          100: "#F7F3EA",
          200: "#EFE8DA",
          300: "#E2D7C2",
          400: "#CFBEA1",
        },
        cobalt: {
          50: "#EEF4FF",
          100: "#E0ECFE",
          200: "#BED7FD",
          400: "#5D8DF8",
          600: "#2B57CC",
          800: "#1E3B8A",
          900: "#0F1E4A",
          950: "#08102B",
        },
        celestial: {
          gold: "#D4AF37",
          amber: "#F2CE63",
          light: "#FFF8E7",
        },
        dusk: {
          rose: "#D4B8B8",
          pink: "#C98CA7",
          deep: "#241A24",
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ['"Space Mono"', "Courier New", "monospace"],
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 4s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.85" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        }
      }
    },
  },
  plugins: [],
};
export default config;
