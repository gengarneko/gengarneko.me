import type { Config } from 'tailwindcss';

import { tailwindPreset } from '@repo/tailwind';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx,astro}',
    '../../packages/ui/dist/**/*.js',
  ],
  darkMode: 'class',
  presets: [tailwindPreset],
};

export default config;
