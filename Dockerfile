FROM node:16.15-alpine

# Create app directory
WORKDIR /palador-assesment

COPY package*.json ./

RUN npm install

COPY . ./

RUN npm run build

EXPOSE 9000

CMD [ "node","dist/server.js" ]