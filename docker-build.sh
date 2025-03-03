
#!/bin/bash
set -e

PLATFORM="linux/amd64"
echo "Building Docker image for platform: $PLATFORM"

# Build the Docker image with platform targeting
docker build --platform $PLATFORM -t ragstack-app . || { echo "Docker build failed. Exiting."; exit 1; }

echo "Successfully built image, starting Docker container..."
docker run --platform $PLATFORM -p 5000:5000 ragstack-app
