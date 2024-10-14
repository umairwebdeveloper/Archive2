const { withUt } = require("uploadthing/tw");

/** @type {import('tailwindcss').Config} */
module.exports = withUt({
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
		"./node_modules/flowbite/**/*.js", // Add this line
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
				gr: "#6CC24A",
				gr1: "#f4ffef",
				prim: "#FF512D",
				primWhite: "#E3E3F1",
				primBlack: "#0F101C",
				prim50: "#FFF2ED",
				prim100: "#FFE1D4",
				prim200: "#FFBFA8",
				prim300: "#FF9271",
				prim400: "#FF512D",
				prim500: "#FE3011",
				prim600: "#EF1607",
				prim700: "#C60A08",
				prim800: "#9D0F13",
				prim900: "#7E1013",
				prim950: "#44060A",
				sec50: "#F5F5F6",
				sec100: "#E3E3F1",
				sec200: "#CDCED4",
				sec300: "#AAACB6",
				sec400: "#7F8191",
				sec500: "#646676",
				sec600: "#565764",
				sec700: "#4A4B54",
				sec800: "#414149",
				sec900: "#393940",
				sec950: "#070708",
				gra: "#E0ECFD",
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
	plugins: [require("tailwindcss-animate"), require("flowbite/plugin")],
});
