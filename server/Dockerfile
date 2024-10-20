# Use the official Node.js image
FROM node:20 AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the TypeScript files if you're using TypeScript
# Uncomment this line if you have a build step
# RUN npm run build 

# Use a lightweight image for the final server
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy all files from the build stage
COPY --from=build /usr/src/app .

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application using Node.js with ES modules
CMD ["node", "--loader", "ts-node/esm", "./src/index.js"]
