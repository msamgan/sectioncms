import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Poppins', ...defaultTheme.fontFamily.sans],
            },
            fontSize: {
                'xs': ['0.75rem', { lineHeight: '1rem' }],
                'sm': ['0.875rem', { lineHeight: '1.25rem' }],
                'base': ['1rem', { lineHeight: '1.5rem' }],
                'lg': ['1.125rem', { lineHeight: '1.75rem' }],
                'xl': ['1.25rem', { lineHeight: '1.75rem' }],
                '2xl': ['1.5rem', { lineHeight: '2rem' }],
                '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
                '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
                '5xl': ['3rem', { lineHeight: '1' }],
            },
            spacing: {
                'input-height': '2.5rem', // Consistent height for inputs and buttons
                'input-padding-x': '1rem', // Consistent horizontal padding
                'input-padding-y': '0.5rem', // Consistent vertical padding
                'section': '2rem', // Consistent section spacing
                'card': '1.5rem', // Consistent card padding
            },
            borderRadius: {
                'input': '0.375rem', // Consistent border radius for inputs and buttons
                'card': '0.5rem', // Consistent border radius for cards
                'panel': '0.5rem', // Consistent border radius for panels
            },
            boxShadow: {
                'card': 'none',
                'panel': 'none',
            },
            transitionProperty: {
                'height': 'height',
                'spacing': 'margin, padding',
            },
            transitionDuration: {
                '250': '250ms',
            },
            keyframes: {
                dropdown: {
                    '0%': { opacity: 0, transform: 'scale(0.95) translateY(-0.5rem)' },
                    '100%': { opacity: 1, transform: 'scale(1) translateY(0)' },
                },
                wave: {
                    '0%, 100%': { transform: 'scaleY(0.5)' },
                    '50%': { transform: 'scaleY(1.0)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' },
                },
                'count-up': {
                    '0%': { transform: 'translateY(10px)', opacity: 0 },
                    '100%': { transform: 'translateY(0)', opacity: 1 },
                },
                'scale-in': {
                    '0%': { transform: 'scale(0.9)', opacity: 0 },
                    '100%': { transform: 'scale(1)', opacity: 1 },
                },
                'slide-in-right': {
                    '0%': { transform: 'translateX(20px)', opacity: 0 },
                    '100%': { transform: 'translateX(0)', opacity: 1 },
                },
                'slide-in-left': {
                    '0%': { transform: 'translateX(-20px)', opacity: 0 },
                    '100%': { transform: 'translateX(0)', opacity: 1 },
                },
                'fade-in': {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 },
                },
                'bell': {
                    '0%': { transform: 'rotate(0deg)' },
                    '20%': { transform: 'rotate(15deg)' },
                    '40%': { transform: 'rotate(-15deg)' },
                    '60%': { transform: 'rotate(7deg)' },
                    '80%': { transform: 'rotate(-7deg)' },
                    '100%': { transform: 'rotate(0deg)' },
                },
            },
            animation: {
                dropdown: 'dropdown 0.2s ease-out forwards',
                wave: 'wave 1.2s linear infinite',
                shimmer: 'shimmer 2s linear infinite',
                'count-up': 'count-up 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
                'scale-in': 'scale-in 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
                'slide-in-right': 'slide-in-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
                'slide-in-left': 'slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
                'fade-in': 'fade-in 0.5s ease-out forwards',
                'bell': 'bell 1s ease-in-out',
            },
        },
        colors: {
            primary: "#3B82F6", // blue-500
            secondary: "#6366F1", // indigo-500
            success: "#38a169",
            danger: "#e53e3e",
            warning: "#d69e2e",
            info: "#4299e1",
            light: "#f7fafc",
            dark: "#1a202c",
            white: "#ffffff",
            black: "#000000",
            gray: {
                50: "#f4f3f3",
                100: "#e4e4e7",
                200: "#d4d4d8",
                300: "#a1a1aa",
                400: "#71717a",
                500: "#52525b",
                600: "#3f3f46",
                700: "#27272a",
                800: "#18181b",
                900: "#0f0f11"
            },
            blue: {
                50: "#eff6ff",
                100: "#dbeafe",
                200: "#bfdbfe",
                300: "#93c5fd",
                400: "#60a5fa",
                500: "#3b82f6",
                600: "#2563eb",
                700: "#1d4ed8",
                800: "#1e40af",
                900: "#1e3a8a"
            },
            yellow: {
                50: "#fefce8",
                100: "#fef9c3",
                200: "#fef08a",
                300: "#fde047",
                400: "#facc15",
                500: "#eab308",
                600: "#ca8a04",
                700: "#a16207",
                800: "#854d0e",
                900: "#713f12"
            },
            green: {
                50: "#f0fdf4",
                100: "#dcfce7",
                200: "#bbf7d0",
                300: "#86efac",
                400: "#4ade80",
                500: "#22c55e",
                600: "#16a34a",
                700: "#15803d",
                800: "#166534",
                900: "#14532d"
            },
            red: {
                50: "#fef2f2",
                100: "#fee2e2",
                200: "#fecaca",
                300: "#fca5a5",
                400: "#f87171",
                500: "#ef4444",
                600: "#dc2626",
                700: "#b91c1c",
                800: "#991b1b",
                900: "#7f1d1d"
            },
            purple: {
                50: "#faf5ff",
                100: "#f3e8ff",
                200: "#e9d5ff",
                300: "#d8b4fe",
                400: "#c084fc",
                500: "#a855f7",
                600: "#9333ea",
                700: "#7e22ce",
                800: "#6b21a8",
                900: "#581c87"
            },
            indigo: {
                50: "#eef2ff",
                100: "#e0e7ff",
                200: "#c7d2fe",
                300: "#a5b4fc",
                400: "#818cf8",
                500: "#6366f1",
                600: "#4f46e5",
                700: "#4338ca",
                800: "#3730a3",
                900: "#312e81"
            },
            cyan: {
                50: "#ecfeff",
                100: "#cffafe",
                200: "#a5f3fc",
                300: "#67e8f9",
                400: "#22d3ee",
                500: "#06b6d4",
                600: "#0891b2",
                700: "#0e7490",
                800: "#155e75",
                900: "#164e63"
            }
        }
    },

    plugins: [forms],
};
