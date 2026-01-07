import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                bg: "#F7F7F7",
                foreground: "#1A1A1A",
                accent: {
                    DEFAULT: "#333333",
                    hover: "#000000",
                },
                success: "#3C83F6",
                border: "#1A1A1A",
                card: {
                    DEFAULT: "#FFFFFF",
                    border: "#CCCCCC",
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['Space Mono', 'Fira Code', 'monospace'],
            },
            borderRadius: {
                sm: "20px",
                pill: "9999px",
            },
            spacing: {
                xs: "0.25rem",   // 4px
                sm: "0.5rem",    // 8px
                md: "1rem",      // 16px
                lg: "2rem",      // 32px
                xl: "3rem",      // 48px
                "2xl": "5rem",   // 80px (mobile)
            },
            keyframes: {
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
            animation: {
                slideUp: 'slideUp 0.3s ease-out',
            },
        },
    },
    plugins: [],
};

export default config;
