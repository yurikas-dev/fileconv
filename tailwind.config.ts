import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-noto)', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
      },
      colors: {
        brand: {
          50:  '#e6f1fb',
          100: '#b5d4f4',
          200: '#85b7eb',
          500: '#378add',
          600: '#185fa5',
          700: '#0c447c',
          900: '#042c53',
        },
        teal: {
          50:  '#e1f5ee',
          500: '#1d9e75',
          600: '#0f6e56',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'inherit',
            a: { color: '#185fa5', '&:hover': { color: '#0c447c' } },
            h1: { fontWeight: '700' },
            h2: { fontWeight: '600' },
            h3: { fontWeight: '600' },
          },
        },
      },
    },
  },
  plugins: [],
}

export default config
