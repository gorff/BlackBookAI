# Dockerfile for building the website front end
# following https://www.dailysmarty.com/posts/steps-for-deploying-a-static-html-site-with-docker-and-nginx
FROM node:14
# the front end site is in the same dir as the dockerfile
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install 
COPY . .
EXPOSE 8080
CMD ["node", "server.js"]
# copy the current dir into the dockerfile
#COPY . . 