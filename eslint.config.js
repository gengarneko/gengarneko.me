import { configs, defineConfig } from '@repo/eslint'

export default defineConfig({
  ignores: ['apps', 'packages', '**/dist/**'],
  extends: [...configs.base],
})
