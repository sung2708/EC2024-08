# Use the official Node.js image.
# https://hub.docker.com/_/node
FROM node:latest

# Set the working directory in the container
WORKDIR /src

# Copy package.json and package-lock.json
COPY package*.json ./

# Update npm
RUN npm update

# Install dependencies
RUN npm install

# Đặt biến môi trường DOCKER_ENV
ENV DOCKER_ENV=true

# Copy the rest of the application code
COPY . .

# Expose port 8000
EXPOSE 8000

# Define the command to run the app
CMD ["npm", "start"]
