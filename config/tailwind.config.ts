import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: '#131313',
        'surface-dim': '#131313',
        'surface-container-lowest': '#0e0e0e',
        'surface-container-low': '#1c1b1b',
        'surface-container': '#201f1f',
        'surface-container-high': '#2a2a2a',
        'surface-container-highest': '#353534',
        'surface-bright': '#393939',
        'surface-variant': '#353534',
        'on-surface': '#e5e2e1',
        'on-surface-variant': '#c7c4d7',
        primary: '#c0c1ff',
        'primary-container': '#8083ff',
        'on-primary': '#1000a9',
        secondary: '#b9c7df',
        'secondary-container': '#3c4a5e',
        'on-secondary': '#233144',
        tertiary: '#4cd7f6',
        'tertiary-container': '#009eb9',
        'on-tertiary': '#003640',
        outline: '#908fa0',
        'outline-variant': '#464554',
        error: '#ffb4ab',
        'error-container': '#93000a',
        'inverse-surface': '#e5e2e1',
        'inverse-on-surface': '#313030',
        'inverse-primary': '#494bd6',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['Space Grotesk', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tight: '-0.02em',
      },
      spacing: {
        section: '7rem',
      },
      backdropBlur: {
        nav: '20px',
      },
      boxShadow: {
        ambient: '0 0 32px rgba(192, 193, 255, 0.06)',
        node: '0 0 15px rgba(76, 215, 246, 0.4)',
      },
    },
  },
  plugins: [],
} satisfies Config
