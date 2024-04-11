FROM node:18-alpine

ARG VITE_API_ROOT
ARG VITE_STRIPE_PK

# Set the working directory in the container
WORKDIR /app
COPY . /app/

# Set environment variables during the build process
ENV VITE_API_ROOT=${VITE_API_ROOT}
ENV VITE_STRIPE_PK=${VITE_STRIPE_PK}

# Install app dependencies
RUN npm install

# Build static
RUN npm run build

# Expose a port to communicate with the React app
EXPOSE 4173

# Start your React app
CMD ["npm", "run", "preview"]