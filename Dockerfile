# Use Node.js LTS version
FROM node:20

# Create app directory
WORKDIR /app

# Install dependencies first (caching)
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build frontend
RUN npm run build

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 5000

# Environment variables
ENV LANGFLOW_API_KEY=""

# Start the server
CMD ["npm", "run", "start"]
