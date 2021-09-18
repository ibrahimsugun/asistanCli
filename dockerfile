FROM node:alpine
COPY . .
ENTRYPOINT  ["sleep", "infinite"]

