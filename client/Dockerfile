# Client Dockerfile
FROM node:20

WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./

RUN npm install

# Copy all the project files
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 8080

# Run the application
CMD ["npm", "run", "preview"]
