import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// Verify the entry file exists
const entryPath = './client/index.html';
if (!fs.existsSync(entryPath)) {
  throw new Error(`Entry file not found: ${entryPath}`);
}

export default defineConfig({
  plugins: [react()],
  root: './client',
  build: {
    outDir: path.resolve('dist/public'),
    emptyOutDir: true
  }
});
