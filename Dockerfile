# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies first for better caching
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source code and build
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app

# Copy dependencies and build artifacts
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# Install production-only dependencies
RUN npm prune --omit=dev

# Environment variables
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE $PORT

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s \
  CMD node -e "require('http').request('http://localhost:$PORT/health', {timeout: 1000}, (res) => { \
    process.exit(res.statusCode === 200 ? 0 : 1) \
  }).end()"

# Runtime command
USER node

CMD ["node", "dist/server.js"] 