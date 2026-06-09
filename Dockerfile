FROM node:22

WORKDIR /app

# Copy package files first
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code (this won't overwrite node_modules)
COPY backend/ .

EXPOSE 5000

CMD ["npm", "start"]