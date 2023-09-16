/** @type {import('tailwindcss').Config} */
/*eslint-env node*/
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // can just replace below stuff with hex codes!
        border: "hsl(var(--border))",
        input: "#3a472e",
        ring: "hsl(var(--ring))",
        background: "#f7fdf5",
        foreground: "#24341c",
        primary: {
          DEFAULT: "#2fb31c",
          foreground: "#f7fdf5",
        },
        secondary: {
          DEFAULT: "#caee80",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#D34053",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "#748b64",
          foreground: "#f7fdf5",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#24341c",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#24341c",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
