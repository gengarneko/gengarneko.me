import { configs, defineConfig } from '@repo/eslint';

export default defineConfig({
  ignores: ['apps', 'packages', '**/dist/**', '**/doc_build/**'],
  extends: [...configs.base],
});
