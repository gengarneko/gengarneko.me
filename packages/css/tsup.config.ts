import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  sourcemap: false,
  dts: true,
  clean: true,
  external: ['react'],
  format: ['cjs', 'esm'],
});
