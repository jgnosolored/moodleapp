## BUILD STAGE
FROM node:14 as build-stage

WORKDIR /app

# Prepare node dependencies
RUN apt-get update && apt-get install libsecret-1-0 -y
COPY package*.json ./
RUN npm ci

# Build source
ARG build_command="npm run build:prod"
COPY . /app
RUN ${build_command}

## SERVE STAGE
FROM nginx:alpine as serve-stage

# Copy assets
COPY --from=build-stage /app/www /usr/share/nginx/html