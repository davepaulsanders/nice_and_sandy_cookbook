# syntax=docker/dockerfile:1
FROM node:alpine AS base
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN pnpm i
COPY . .
CMD [""]

FROM base AS build
RUN pnpm run build

FROM nginx:latest
COPY --from=build /app/dist /usr/share/nginx/html

