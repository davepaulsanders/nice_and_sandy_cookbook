# syntax=docker/dockerfile:1
FROM node:alpine AS base
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm -g install pnpm
RUN pnpm i
COPY . .
CMD [""]

FROM base AS build
RUN npm run build

FROM nginx:latest
COPY --from=build /app/dist /usr/share/nginx/html

