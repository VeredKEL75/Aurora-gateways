#Inherit from existing Dockerfile containing Linux Alpine + Node.js:
FROM node:24-alpine3.22

#Create an empty folder inside the root of our alpine image
WORKDIR /app

#Copy only package.json from current folder into /app image:
COPY package.json /app

#Install only node_modules into /app image. However when copying in will ignore it:
RUN npm i

#Copy entire files from current host into /app inside the image without the list in .dockerignore:
COPY . /app
#---------------------------------------

#When the container start - which command should run our app:
ENTRYPOINT npm start

#1. Create image:              docker build -t VeredKEL75/vacations-image:1.0 .
#2. Create container:          docker create --name vacations-container -p 4001:4000 VeredKEL75/vacations-image:1.0
#3. Run image:                 docker start vacations-container
#4. Push image to docker-hub:  docker push VeredKEL75/vacations-image:1.0

#presenting other project
#5. Pull image to the host:    docker pull enonpollak/vacations-image:1.0

#to create container for the pulled image:  
#                              docker create --name enon-container -p 4001:4000 enonpollak/vacations-image:1.0

#                              docker start enon-container
