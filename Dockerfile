FROM node:latest as buildenv

WORKDIR /app

# Install quasar
RUN npm install -g quasar@latest @quasar/cli@latest

# Copy package.json and install dependencies
COPY package.json /app
RUN npm install

# Copy source files and build
COPY . /app
RUN quasar build


FROM kyma/docker-nginx:latest

# Copy built SPA from buildenv container
COPY --from=buildenv /app/dist/spa/ /var/www/

# Expose necessary ports
EXPOSE 80 443

# Kick the tires and light the fires
CMD 'nginx'
