import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: 'src',
  publicDir: false,
  plugins: [react()],
  base: '/portfolio/',
  build: { outDir: '..', emptyOutDir: false, assetsDir: 'assets/build' },
});
