# Use an existing Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies in the container
RUN npm install

# Copy the rest of the project files to the container
COPY . .

# Expose port 3001 in the container
EXPOSE 3001

# Set the command to start the application
CMD ["npm", "start"]
