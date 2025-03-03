
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Create Docker-specific Vite config that explicitly sets paths
RUN echo 'import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true
  }
});' > vite.docker.config.js

# Set NODE_OPTIONS to ensure proper crypto support
ENV NODE_OPTIONS=--openssl-legacy-provider

# Build the client application first with Docker-specific config
RUN npx vite build --config vite.docker.config.js && \
    esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

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
