import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
      },
      typography: {
        DEFAULT: {
          css: {
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            code: {
              backgroundColor: 'var(--color-code-bg)',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
          },
        },
      },
    },
  },
  plugins: [typography],
} satisfies Config
