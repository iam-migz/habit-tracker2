FROM node:lts-bookworm-slim

WORKDIR /app

COPY package.json .

COPY . .

EXPOSE 5173

CMD [ -d "node_modules" ] && npm run dev || npm ci && npm run dev