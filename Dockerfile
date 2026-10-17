# Multi-stage Dockerfile for Google Cloud Run Deployment
# Stage 1: Build the React TypeScript frontend
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production Server with Cloud Run Port
FROM node:20-alpine AS production
WORKDIR /app

# Set Cloud Run production environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Install server dependencies
COPY server/package*.json ./server/
WORKDIR /app/server
RUN npm ci --only=production

# Copy server code
COPY server/ ./

# Copy built frontend assets to server public directory
COPY --from=build /app/dist ./public

# Expose default Cloud Run port
EXPOSE 8080

# Run the Cloud Run microservice
CMD ["node", "server.js"]
