# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy files
COPY package*.json ./
RUN npm install

COPY . .

# Build
RUN npm run build

# Serve
RUN npm install -g serve
CMD ["serve", "-s", "dist"]
