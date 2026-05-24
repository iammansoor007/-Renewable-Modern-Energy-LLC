import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Space Grotesk', 'sans-serif'],
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Renewable Modern Energy — Dark Crimson Palette
        'crimson':       '#C0151A',
        'crimson-light': '#E8292F',
        'crimson-dark':  '#8B0A14',
        'burgundy':      '#5C0A11',
        'deep-red':      '#3C0508',
        'charcoal':      '#0F0809',
        'charcoal-light':'#1A0D0E',
        'warm-white':    '#F2EAE8',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        'gradient-crimson': 'linear-gradient(135deg, #3C0508 0%, #8B0A14 45%, #C0151A 100%)',
        'gradient-crimson-light': 'linear-gradient(135deg, #8B0A14 0%, #C0151A 50%, #E8292F 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0F0809 0%, #1A0D0E 100%)',
        'gradient-glow': 'radial-gradient(ellipse at center, rgba(192,21,26,0.4) 0%, transparent 70%)',
      },
      boxShadow: {
        'crimson-sm':  '0 4px 14px rgba(139, 10, 20, 0.35)',
        'crimson-md':  '0 10px 30px rgba(139, 10, 20, 0.45)',
        'crimson-lg':  '0 20px 60px rgba(139, 10, 20, 0.55)',
        'crimson-glow':'0 0 30px rgba(192, 21, 26, 0.40), 0 0 80px rgba(139, 10, 20, 0.20)',
        'dark-card':   '0 8px 32px rgba(0, 0, 0, 0.50)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { transform: "translateY(20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 12px rgba(192, 21, 26, 0.3)" },
          "50%":       { boxShadow: "0 0 28px rgba(192, 21, 26, 0.6), 0 0 60px rgba(139, 10, 20, 0.25)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "accordion-up": "accordion-up 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.6s ease-out",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;