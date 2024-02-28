import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'terser', // Minify the output using Terser
    target: 'es2018', // Target modern browsers supporting ES2018
    outDir: 'dist', // Specify the output directory for the build
    sourcemap: false, // Disable sourcemaps in production for smaller bundle size
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log statements
        // You can add more optimizations here based on your needs
      },
    },
  },
});
