
# Use Node.js LTS version
FROM node:20-slim

# Create app directory
WORKDIR /app

# Install dependencies first (caching)
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Create non-root user
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init \
    && rm -rf /var/lib/apt/lists/* \
    && groupadd --system --gid 1001 nodejs \
    && useradd --system --uid 1001 nextjs \
    && chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 5000

# Environment variables
ENV PORT=5000
ENV NODE_ENV=production
ENV HOST=0.0.0.0

# Start the server with dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/index.js"]
