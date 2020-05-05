# Dockerfile for building the website front end
FROM ubuntu

RUN apt update

# Install python
RUN apt install software-properties-common -y
RUN add-apt-repository ppa:deadsnakes/ppa
RUN apt-get update || : && apt-get install python3.7 -y

#install pip
RUN apt-get update
RUN apt-get install python3-pip -y
RUN pip3 install --upgrade pip

RUN pip install Pillow

# install tensorflow
RUN pip install tensorflow

# install node
RUN apt install curl -y
RUN curl -sL https://deb.nodesource.com/setup_14.x 
RUN apt-get install -y nodejs npm

# install node packages
COPY package*.json ./
RUN npm install 

# Image setup
WORKDIR /app
COPY . /app
CMD ["node", "server.js"]
