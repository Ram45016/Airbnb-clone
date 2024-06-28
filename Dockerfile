# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json /app/

# Install dependencies using npm
RUN npm install --production

# Copy the rest of the application code to the working directory
COPY . /app/

# Build the Next.js application for production
RUN npm run build

# Expose the port that the Next.js application runs on
EXPOSE 3000

# Set the command to run your Next.js application
CMD ["npm", "start"]
