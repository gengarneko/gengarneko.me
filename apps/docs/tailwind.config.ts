import type { Config } from 'tailwindcss';

import { tailwindPreset } from '@repo/tailwind';

const config: Config = {
  content: [
    './docs/**/*.{js,ts,jsx,tsx,mdx,astro}',
    './ui/**/*.{js,ts,jsx,tsx,mdx,astro}',
    './theme/**/*.{js,ts,jsx,tsx,mdx,astro}',
  ],
  darkMode: 'class',
  presets: [tailwindPreset],
};

export default config;
