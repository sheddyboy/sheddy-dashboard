import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    fontSize: {
      xsm: ["0.75rem", { lineHeight: "1.125rem", letterSpacing: "0.02em" }],
      sm: ["0.875rem", { lineHeight: "1.3125rem", letterSpacing: "0.02em" }],
      md: ["1rem", { lineHeight: "1.5rem", letterSpacing: "0.02em" }],
      base: ["1.125rem", { lineHeight: "1.6875rem", letterSpacing: "0.02em" }],
      lg: ["1.25rem", { lineHeight: "1.875rem", letterSpacing: "0.02em" }],
      xlg: ["1.625rem", { lineHeight: "1.875rem", letterSpacing: "0.02em" }],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        poppins: ['var(--font-poppins)'],
        manrope: ['var(--font-manrope)'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        text: {
          0: "#FFFFFF",
          20: "#B3B1BB",
          40: "#7D7A89",
          60: "#55555F",
          80: "#4C4958",
          100: "#2B283D",
        },
        purple: {
          10: "#DAD9F5",
          20: "#B4B1E5",
          40: "#7E7BB2",
          60: "#44408A",
          80: "#28246F",
          100: "#110D59",
        },
        cyan: {
          10: "#D5ECF5",
          20: "#9FD1E4",
          40: "#6AB8D6",
          60: "#3FA0C6",
          80: "#2086AD",
          100: "#005F84",
        },
        orange: {
          10: "#FFECDC",
          20: "#FDD5B2",
          40: "#F9BC87",
          60: "#FEB371",
          80: "#F18524",
          100: "#DF6F0B",
        },
        green1: {
          10: "#D9FCF1",
          20: "#C7F8E9",
          40: "#95F4D8",
          60: "#55E7BB",
          80: "#1AC391",
          100: "#039267",
        },
        green2: {
          10: "#DDFBC5",
          20: "#C2F799",
          40: "#9AEC59",
          60: "#76DE24",
          80: "#5FB918",
          100: "#49950D",
        },
        blue: {
          10: "#CFE8FF",
          20: "#A3D1FC",
          40: "#3F9CF2",
          60: "#0E77D9",
          80: "#0B5FAE",
          100: "#08437A",
        },
        red: {
          10: "#FCDBDB",
          20: "#FBB4B4",
          40: "#FF7878",
          60: "#F14D4D",
          80: "#C91616",
          100: "#980808",
        },
        lightPurple: {
          10: "#F3CEFA",
          20: "#E3A7ED",
          40: "#D97DE9",
          60: "#C750DB",
          80: "#AF20C7",
          100: "#800C93",
        },
        magenta: {
          10: "#FED5F2",
          20: "#F8B0E4",
          40: "#F173CE",
          60: "#E924B1",
          80: "#C11390",
          100: "#930C6D",
        },
        yellow: {
          10: "#FCE9C0",
          20: "#FDE2A1",
          40: "#FFCC5A",
          60: "#FFBC26",
          80: "#ECAA18",
          100: "#D39405",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
