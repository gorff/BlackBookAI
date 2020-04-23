# Dockerfile for building the website front end
# following https://www.dailysmarty.com/posts/steps-for-deploying-a-static-html-site-with-docker-and-nginx
FROM nginx:alpine
# the front end site is in the same dir as the dockerfile
COPY . /usr/share/nginx/html

# copy yhe current dir into the dockerfile
copy . . 
