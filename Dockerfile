# Stage 1: Build the React app
FROM node:20-alpine AS builder

ARG VITE_API_ROOT
ARG VITE_STRIPE_PK
ARG VITE_FLOWISE_CHATFLOW_ID
ARG VITE_FLOWISE_API_HOST

WORKDIR /app
COPY . /app/

ENV VITE_API_ROOT=${VITE_API_ROOT}
ENV VITE_STRIPE_PK=${VITE_STRIPE_PK}
ENV VITE_FLOWISE_CHATFLOW_ID=${VITE_FLOWISE_CHATFLOW_ID}
ENV VITE_FLOWISE_API_HOST=${VITE_FLOWISE_API_HOST}

RUN npm install -g npm@10.8.3

# Set the ownership of the .npm directory
RUN mkdir -p /root/.npm && chown -R 501:20 /root/.npm
RUN npm install

# Build the React app
RUN npm run build

# Stage 2: Serve the app with NGINX
FROM nginx:stable-alpine

# Copy the build output to NGINX's html directory
COPY --from=builder /app/build /usr/share/nginx/html

# Copy the custom nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 443

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
