
#!/bin/bash
set -e

IMAGE_NAME="ragstack-app"
PLATFORM="linux/amd64"

echo "Building Docker image for platform: $PLATFORM"

# Make scripts executable
chmod +x build.sh

# Build the Docker image with platform targeting
docker build --platform $PLATFORM -t $IMAGE_NAME . || { 
  echo "Docker build failed. Exiting."
  exit 1
}

echo "Successfully built image, starting Docker container..."
docker run --platform $PLATFORM -p 5000:5000 $IMAGE_NAME
