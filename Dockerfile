FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Install Prisma globally
RUN npm install -g prisma

# Build the Next.js application for production
RUN npm run build
