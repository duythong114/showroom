FROM node:14-alpine

WORKDIR /duythong/nodejs

COPY package*.json ./

RUN npm install

RUN npm install -g @babel/core @babel/cli

COPY . .

CMD ["npm","run", "build"]

#docker build --tag node-docker .
#docker run -p 8080:8080 -d node-docker