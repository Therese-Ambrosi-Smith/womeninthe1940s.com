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
                    300: "#777777",
                    DEFAULT: "#666666"
                },
                carbon: {
                    500: "#333333",
                    DEFAULT: "#333333"
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
                    "@apply text-carbon marker:prose-li:text-black prose-h3:text-black prose-h3:text-[16px] prose-h3:font-bold prose-h2:text-lg prose-h2:text-black prose-h1:text-black prose-h1:font-bold prose-h1:text-2xl prose-h2:text-lg": {},
                },
                ".container": {
                    "@apply px-4 mx-auto": {},
                    maxWidth: "900px",
                },
                ".prose :where(picture):not(:where([class~='not-prose'],[class~='not-prose'] *))": {
                    margin: 0
                }
            });
        },
    ],
};
