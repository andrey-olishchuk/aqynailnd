
#!/bin/bash
set -e

echo "Building Docker image for RAGStack application..."
docker build -t ragstack-app .

echo "Starting Docker container..."
docker run -p 5000:5000 ragstack-app
