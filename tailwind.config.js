/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        user: "url('./assets/images/user.png')", // bg-user
      },
      flex: {
        1: '1 1 0%', // flex-grow: 1, flex-shrink: 1, flex-basis: 0%
        2: '2 2 0%', // flex-grow: 2, flex-shrink: 2, flex-basis: 0%
        3: '3 3 0%', // flex-grow: 3, flex-shrink: 3, flex-basis: 0%
        4: '4 4 0%', // flex-grow: 4, flex-shrink: 4, flex-basis: 0%
        5: '5 5 0%', // flex-grow: 5, flex-shrink: 5, flex-basis: 0%
      },
      flexGrow: {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
      },
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('daisyui'),
  ],
};
