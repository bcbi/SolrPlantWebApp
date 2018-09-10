# Dockerfile used front end
FROM node:10.5.0

RUN node -v
RUN npm -v

# ----------------------SolrPlant Web App------------------------------------
# Create app directory
RUN mkdir -p /usr/src/solrplant_web_app
WORKDIR /usr/src/solrplant_web_app

# Bundle app source
COPY . /usr/src/solrplant_web_app

# Clean up build directories if they were copied from local 
RUN rm -rfv build
RUN rm -rfv node_modules

# Install global static server
RUN npm install -g serve

# Install app dependencies
RUN cd ./client; npm install;

# Build and optimize react app
RUN cd ./client; npm run build;

EXPOSE 3000

RUN ls ./client/

# Run server and client
CMD ["serve", "-s", "-p", "3000", "./client/build"]
# ---------------------- The End -----------------------------------------
