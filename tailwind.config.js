/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0066cc',
        'primary-focus': '#0071e3',
        'primary-on-dark': '#2997ff',
        canvas: '#ffffff',
        parchment: '#f5f5f7',
        pearl: '#fafafc',
        'tile-1': '#272729',
        'tile-2': '#2a2a2c',
        ink: '#1d1d1f',
        'ink-muted-80': '#333333',
        'ink-muted-48': '#7a7a7a',
        hairline: '#e0e0e0',
        'divider-soft': '#f0f0f0',
        'body-muted': '#cccccc',
      },
      fontFamily: {
        sans: [
          'SF Pro Text',
          'SF Pro Display',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Inter',
          'sans-serif',
        ],
      },
      borderRadius: {
        lg: '18px',
        md: '11px',
        sm: '8px',
      },
      letterSpacing: {
        tight: '-0.374px',
        display: '-0.28px',
      },
    },
  },
  plugins: [],
}
