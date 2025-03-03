
#!/bin/bash

# Fix the Docker build issues
echo "Fixing Docker build issues..."

# Check if client/index.html exists
if [ ! -f "client/index.html" ]; then
  echo "Error: client/index.html not found. Make sure this file exists in your project."
  exit 1
fi

# Create a more robust Docker-specific Vite config
cat > vite.docker.config.js << 'EOL'
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
EOL

echo "Created fixed Vite config for Docker"

# Now adjust the Dockerfile
if grep -q "npx vite build --config vite.docker.config.js" Dockerfile; then
  echo "Dockerfile already contains the vite build command"
else
  echo "Please update your Dockerfile manually with the fix"
fi

echo "Fix completed. Try building your Docker image again."
