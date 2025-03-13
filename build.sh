
#!/bin/bash
set -e

echo "Building application..."

# Install dependencies if needed
npm ci

# Build the application
npm run build

echo "Build completed successfully."
echo "You can run the application with: npm start"
