import type { Config } from 'tailwindcss';

import { tailwindPreset } from '@repo/tailwind';

const config: Config = {
  content: [
    './docs/**/*.{js,ts,jsx,tsx,mdx,astro}',
    './ui/**/*.{js,ts,jsx,tsx,mdx,astro}',
    './theme/**/*.{js,ts,jsx,tsx,mdx,astro}',
  ],
  darkMode: ['class', 'class'],
  presets: [tailwindPreset],
  theme: {
    extend: {
      colors: {
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
    },
  },
};

export default config;
