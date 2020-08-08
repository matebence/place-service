FROM node:10.21.0-jessie
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g sequelize-cli
RUN npm install
COPY . .
CMD ["./wait-for-it.sh" , "parcel-service:5800" , "--strict" , "--timeout=330" , "--" , "node", "server.js"]