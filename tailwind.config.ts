import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background:   'rgb(14,14,14)',
        surface: {
          DEFAULT:    'rgb(14,14,14)',
          low:        'rgb(19,19,19)',
          high:       'rgb(26,26,26)',
          highest:    'rgb(38,38,38)',
        },
        primary: {
          DEFAULT:    '#ffc965',
          dark:       '#feb700',
          on:         '#5f4200',
        },
        outline: {
          DEFAULT:    '#767575',
          variant:    '#484847',
        },
        'on-surface':         '#ffffff',
        'on-surface-variant': '#adaaaa',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body:    ['"Manrope"',       'sans-serif'],
      },
      fontSize: {
        'display-lg': ['3.5rem',   { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'display-md': ['2.5rem',   { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-sm': ['1.75rem',  { lineHeight: '1.2',  letterSpacing: '-0.015em' }],
        'body-lg':    ['1rem',     { lineHeight: '1.6'  }],
        'body-md':    ['0.875rem', { lineHeight: '1.6'  }],
        'label-sm':   ['0.75rem',  { lineHeight: '1.4', letterSpacing: '0.05em' }],
        'label-md':   ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.03em' }],
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #ffc965 0%, #feb700 100%)',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 35s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
