FROM node:16

WORKDIR /usr/the-reader

COPY . .

EXPOSE 5000

RUN npm i
RUN npx prisma generate