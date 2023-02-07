# Use an existing Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Copy the rest of the project files to the container
COPY . ./

# Install the dependencies in the container
RUN yarn

RUN yarn build

# Expose port 3001 in the container
EXPOSE 3001

# Set the command to start the application
CMD ["node", "dist/src/main.js"]
