FROM node:10.15.2
WORKDIR /usr/src/echo
ADD package*.json ./
RUN npm install

COPY . .
RUN npm run build

CMD ["npm", "run", "server"]

EXPOSE 5000
