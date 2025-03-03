
#!/bin/bash
set -e

# Build the Docker image
docker build -t ragstack-app .

# Run the Docker container
docker run -p 5000:5000 ragstack-app
