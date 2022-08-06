const colors = require('tailwindcss/colors');

// remove renamed color warnings
[
    'lightBlue',
    'warmGray',
    'trueGray',
    'coolGray',
    'blueGray'
].forEach(name => delete colors[name]);

/** @type {import('@types/tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
    content: [ './{components,lib,pages,partials}/**/*.{js,ts,jsx,tsx}' ],
    safelist: [
        'w-5',
        'h-5',
        'pl-2',
        'text-slate-500',
        'text-red-400'
    ],
    theme: {
        extend: {
            fontFamily: {'press-start': [ '"Press Start 2P"', 'cursive' ],},
            animation: {'bounce-slow': 'bounce 4s linear infinite',},
            ...colors,
        },
    },
    plugins: [
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/typography')
    ],
};
