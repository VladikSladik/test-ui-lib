// tailwind.config.js
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./node_modules/flowbite-react/**/*.js",
        "./node_modules/flowbite/**/*.js",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    // Используем палитру yellow из Tailwind
                    ...require('tailwindcss/colors').yellow,
                },
            },
        },
    },
    plugins: [
        require('flowbite/plugin')
    ],
};
