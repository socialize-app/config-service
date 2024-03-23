# Use Node.js 14 LTS as the base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if present) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm i -g pnpm
RUN pnpm install

# Copy the built application to the working directory
COPY ./dist ./dist

# Expose the port the app runs on
ARG PORT
ENV PORT $PORT

EXPOSE $PORT

# Command to run the application
CMD ["node", "dist/main"]