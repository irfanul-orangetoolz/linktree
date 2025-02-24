FROM node:20 as builder

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm@9.1.2

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 7000

# Build the application
RUN pnpm run build

# Start the application
CMD ["pnpm", "start"]