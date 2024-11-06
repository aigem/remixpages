/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.900'),
            a: {
              color: theme('colors.primary'),
              '&:hover': {
                color: theme('colors.primary'),
              },
            },
            'h1,h2,h3,h4': {
              scrollMarginTop: '5rem',
            },
          },
        },
        invert: {
          css: {
            color: theme('colors.gray.100'),
            a: {
              color: theme('colors.primary'),
              '&:hover': {
                color: theme('colors.primary'),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
} 