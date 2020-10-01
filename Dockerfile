FROM node:14.12.0-alpine3.12

ENV PORT=3000

RUN mkdir /app
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

ADD . ./

EXPOSE $PORT

CMD [ "npm", "run", "serve" ]
