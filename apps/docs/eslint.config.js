import { configs, defineConfig } from '@repo/eslint';

export default defineConfig({
  extends: [...configs.base],
  ignorePatterns: ['node_modules', 'dist', 'doc_build'],
});
