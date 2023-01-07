FROM nginx:stable-alpine 
RUN rm /etc/nginx/conf.d/default.conf
COPY ./dist /usr/src/app
COPY .nginx/arektacoinstore.conf /etc/nginx/conf.d/

# FROM node:16-alpine AS builder
# WORKDIR /usr/src/app
# ENV PATH /usr/src/app/node_modules/.bin:$PATH
# COPY . .
# RUN npm install --quiet
# RUN npm run generate 

# FROM nginx:stable-alpine 
# RUN rm /etc/nginx/conf.d/default.conf
# COPY --from=builder /usr/src/app/dist /usr/src/app
# COPY .nginx/arektacoinstore.conf /etc/nginx/conf.d/






