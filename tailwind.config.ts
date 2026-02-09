import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0C0F14',
        panel: '#10141C',
        stroke: '#1B2130',
        text: '#E6EAF2',
        subtext: '#99A3B3',
        accent: '#C7D2FE'
      },
      boxShadow: {
        focus: '0 0 0 2px rgba(199, 210, 254, 0.6)'
      }
    }
  },
  plugins: []
};

export default config;
