/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
    content: ["./src/**/*.{html,js,njk,md,vue}", "./cfg/_11ty/**/*.js"],
    darkMode: "class",
    theme: {
        extend: {
            borderRadius: {
                DEFAULT: "0.375rem",
            },
            keyframes: {
                blink: {
                    "50%": { opacity: 0 },
                },
            },
            animation: {
                blink: "blink 1.5s steps(1) infinite",
            },
            aspectRatio: {
                auto: "auto",
                box: "1",
                landscape: "4/3",
                portrait: "3/4",
                video: "16/9",
            },
            height: {
                unset: "unset",
            },
            maxWidth: {
                "copy-xs": "25ch",
                "copy-sm": "45ch",
                "copy-md": "55ch",
                "copy-lg": "65ch",
                "copy-xl": "75ch",
                "copy-2xl": "85ch",
            },
            colors: {
                transparent: "transparent",
                current: "currentColor",
                inherit: "inherit",
                white: "#fff",
                black: "#000",
                red: {
                    DEFAULT: "#A80000"
                },
                gray: {
                    100: "#AAAAAA",
                    200: "#8A8A8A",
                    DEFAULT: "#666666"
                },
                aspectRatio: {
                    auto: "auto",
                    box: "1",
                    landscape: "4/3",
                    portrait: "3/4",
                    video: "16/9",
                },
                height: {
                    unset: "unset",
                },
                maxWidth: {
                    "copy-xs": "25ch",
                    "copy-sm": "45ch",
                    "copy-md": "55ch",
                    "copy-lg": "65ch",
                    "copy-xl": "75ch",
                    "copy-2xl": "85ch",
                },
            },

        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("@tailwindcss/aspect-ratio"),
        require("tailwindcss-safe-area"),
        require("@tailwindcss/line-clamp"),
        ({ addComponents, theme }) => {
            addComponents({
                ".prose": {
                    "@apply text-base md:text-lg": {},
                },
                ".container": {
                    "@apply px-4 mx-auto": {},
                    maxWidth: "900px",
                },
            });
        },
    ],
};
