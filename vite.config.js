import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  css: {
    postcss: {},
  },
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 900,
  },
});
