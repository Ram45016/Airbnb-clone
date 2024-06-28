# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock (or package-lock.json) to the working directory
COPY package.json yarn.lock /app/

# Install dependencies using yarn (you can replace with npm if you prefer)
RUN yarn install --frozen-lockfile

# Copy the rest of the application code to the working directory
COPY . /app/

# Build the Next.js application for production
RUN yarn build

# Expose the port that the Next.js application runs on
EXPOSE 3000

# Set the command to run your Next.js application
CMD ["yarn", "start"]
