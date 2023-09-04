import * as path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: './src/main.ts',
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        esModule: true,
        sourcemap: true,
      },
    },
  },

  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
});
