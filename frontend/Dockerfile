# ---------- Stage 1: build the static files ----------
FROM node:24-alpine AS build
WORKDIR /app

# Dependencies first (cached unless package files change)
COPY package.json package-lock.json ./
RUN npm ci

# Source code last
COPY . .
RUN npm run build

# ---------- Stage 2: serve them with nginx ----------
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
