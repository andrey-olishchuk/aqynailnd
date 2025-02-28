# Use Nginx as base image
FROM nginx:alpine

# Copy static files to Nginx's default serving directory
COPY index.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# No need to specify CMD as nginx:alpine image already has it configured
