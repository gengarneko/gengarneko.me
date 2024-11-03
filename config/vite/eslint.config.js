import { configs, defineConfig } from '@repo/eslint';

export default defineConfig({
  extends: [...configs.base],
});
