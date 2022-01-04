FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
COPY ./.env ./.env
COPY . .

RUN npm install && \
  npm run-script build

EXPOSE 3001

CMD ["npm", "start"]