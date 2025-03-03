
# Use Nginx as base image
FROM nginx:alpine

# Expose port 80
EXPOSE 80

# No need to specify CMD as nginx:alpine image already has it configured
