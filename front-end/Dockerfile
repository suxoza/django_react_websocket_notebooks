FROM node:18-alpine as builder
WORKDIR /app
COPY . .
RUN npm ci 
RUN npm run build

FROM nginxinc/nginx-unprivileged  as develop
ENV NODE_ENV develop
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]