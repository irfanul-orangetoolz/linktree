FROM node:20-slim

WORKDIR /app

RUN npm install -g pnpm@9.1.2

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

EXPOSE 5000

CMD [ "node", "src/index.js" ]
