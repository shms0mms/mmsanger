FROM node 
WORKDIR /app
COPY package.json .
RUN npm install -g pnpm
RUN pnpm i


COPY . .



ENV PORT 8080

EXPOSE $PORT

CMD ["pnpm", "start"]
