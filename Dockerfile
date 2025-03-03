
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production image
FROM node:20-alpine AS runner

WORKDIR /app

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm ci --production

# Copy built app from builder stage
COPY --from=builder /app/dist ./dist

# Set production environment
ENV NODE_ENV=production

# Expose the port the app runs on
EXPOSE 5000

# Start the application
CMD ["node", "dist/index.js"]
