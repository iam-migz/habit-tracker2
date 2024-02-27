FROM node:lts-bookworm-slim

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4000

VOLUME [ "/app/node_modules" ]

CMD ["npm", "run", "dev"]