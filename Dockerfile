#Primera Etapa
FROM node:16-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build

#Segunda Etapa
FROM nginxinc/nginx-unprivileged
# Comprobar que se utiliza la dirección correcta en que se construye el proyecto
COPY --from=build-step /app/dist/portal-secretaria /usr/share/nginx/html
