
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Verify the entry file exists
const entryPath = path.resolve(__dirname, 'client', 'index.html');
if (!fs.existsSync(entryPath)) {
  throw new Error(`Entry file not found: ${entryPath}`);
}

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, 'client'),
  build: {
    outDir: path.resolve(__dirname, 'dist/public'),
    emptyOutDir: true,
    assetsDir: 'assets',
    // Make sure CSS is properly processed and extracted
    cssCodeSplit: true,
    // Make sure source files are fully processed
    sourcemap: false,
    // Improve asset handling
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client/src'),
      '@shared': path.resolve(__dirname, 'shared')
    }
  },
  // Add base path to ensure assets are loaded from the correct location
  base: '/',
  // Improve CSS loading
  css: {
    postcss: {
      // Remove the dynamic require of tailwindcss
      plugins: []
    },
    devSourcemap: true
  }
});
