# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY server ./server

# Build TypeScript
RUN npm run build

# Runtime stage
FROM node:18-alpine

WORKDIR /app

# Copy package files for production
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy wrapper script
COPY start.js ./

# Copy built application from builder
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 5000

# Environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start the application
CMD ["npm", "start"]
