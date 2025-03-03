
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Create Docker-specific Vite config file
RUN echo "import { defineConfig } from 'vite';" > vite.docker.config.js && \
    echo "import react from '@vitejs/plugin-react';" >> vite.docker.config.js && \
    echo "import path from 'path';" >> vite.docker.config.js && \
    echo "" >> vite.docker.config.js && \
    echo "export default defineConfig({" >> vite.docker.config.js && \
    echo "  plugins: [react()]," >> vite.docker.config.js && \
    echo "  root: './client'," >> vite.docker.config.js && \
    echo "  build: {" >> vite.docker.config.js && \
    echo "    outDir: path.resolve('dist/public')," >> vite.docker.config.js && \
    echo "    emptyOutDir: true" >> vite.docker.config.js && \
    echo "  }" >> vite.docker.config.js && \
    echo "});" >> vite.docker.config.js

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
