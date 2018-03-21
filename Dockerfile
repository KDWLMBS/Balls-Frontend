FROM node:8-alpine
COPY . /app

RUN cd /app \
 && yarn \
 && yarn build

FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
COPY nginx-default.conf /etc/nginx/conf.d/default.conf
