FROM node:lts-bookworm-slim

WORKDIR /app

COPY package.json .

COPY . .

EXPOSE 4000

# https://stackoverflow.com/questions/51097652/install-node-modules-inside-docker-container-and-synchronize-them-with-host
CMD [ -d "node_modules" ] && npm run dev || npm ci && npm run dev