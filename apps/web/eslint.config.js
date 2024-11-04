import { configs, defineConfig } from '@repo/eslint';

export default defineConfig({
  extends: [...configs.base, ...configs.react, ...configs.playwright],
  rules: {
    'no-bare-urls': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
  },
});
