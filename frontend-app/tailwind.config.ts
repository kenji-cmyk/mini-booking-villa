import type { Config } from "tailwindcss";
import nativeWindPreset from "nativewind/preset";

const config: Config = {
  content: ["./App.tsx", "./src/**/*.{ts,tsx}"],
  presets: [nativeWindPreset],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#1FA9B8",
          600: "#1697A6",
          700: "#127C8A"
        },
        ocean: {
          700: "#2A628F",
          800: "#1B4D7A",
          900: "#123B63"
        },
        neutral: {
          50: "#F8FAFB",
          100: "#F2F5F7",
          200: "#E4EAEE",
          300: "#D5DDE3",
          400: "#A0AEBB",
          500: "#6B7A88",
          700: "#3C4A57",
          900: "#1F2A37"
        },
        success: "#22A06B",
        warning: "#F5A524",
        error: "#D64545",
        info: "#2D8CFF",
        momo: "#D82D7E",
        vnpay: "#1D7ED6",
        brand: {
          50: "#EAF8FA",
          100: "#D6F1F4",
          500: "#1FA9B8",
          600: "#1697A6",
          700: "#127C8A"
        },
        ink: {
          900: "#1F2A37",
          700: "#3C4A57",
          500: "#6B7A88"
        }
      },
      boxShadow: {
        subtle: "0 2px 8px rgba(16, 24, 40, 0.06)",
        card: "0 8px 24px rgba(16, 24, 40, 0.08)",
        panel: "0 12px 32px rgba(16, 24, 40, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
