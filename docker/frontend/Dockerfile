# pull official base image
FROM node:16.13.0

# set working directory
WORKDIR /opt/frontend

# add `/app/node_modules/.bin` to $PATH
ENV PATH /opt/frontend/node_modules/.bin:$PATH

# install app dependencies
COPY web/package*.json ./
RUN npm install --include=dev;

# add app
COPY web/ ./

EXPOSE 8000
# start app
CMD ["npm", "run", "serve"]
