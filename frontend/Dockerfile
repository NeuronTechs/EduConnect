# syntax=docker/dockerfile:1.4
# Create image based on the official Node image from dockerhub
FROM node:18 as build
# Create app directory
WORKDIR /usr/src/app
# Copy dependency definitions
COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app
RUN npm i
# Get all the code needed to run the app
COPY . /usr/src/app
# Expose the port the app runs in
EXPOSE 3001

CMD ["npm","run","build"]

# production environment
FROM nginx:stable-alpine
COPY --from=build /usr/src/app/dist/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]