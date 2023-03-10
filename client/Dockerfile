FROM node as builder

WORKDIR /pets_frontend
COPY . .
RUN npm run build

FROM nginx

COPY --from=builder /pets_frontend/dist /usr/share/nginx/html
