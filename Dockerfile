FROM node:18 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --configuration=production

FROM nginx:1.21
COPY --from=node /app/dist/comanda-facil /usr/share/nginx/html

EXPOSE 80