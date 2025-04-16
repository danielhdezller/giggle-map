# Use Node.js with Alpine for a lightweight image
FROM node:22.12.0-alpine

# Set working directory
WORKDIR /app

# Install required packages (especially for Prisma binary compatibility)
RUN apk add --no-cache \
  openssl \
  bash \
  libc6-compat \
  pkgconfig \
  libstdc++ \
  sqlite \
  python3 \
  make \
  g++

# Copy package files first to cache layers
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the entire app
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose the app port
EXPOSE 3000

# Run the development server
CMD ["npm", "run", "dev"]
