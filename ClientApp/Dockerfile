FROM node:14.17.0 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod
FROM nginx:1.21.1
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
#RUN rm ./docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]
