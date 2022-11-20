FROM node:19-alpine3.15 as builder

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npm run build --prod



FROM nginx:latest

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*
COPY --from=builder /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]