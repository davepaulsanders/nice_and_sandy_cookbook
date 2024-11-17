FROM golang:alpine AS builder
WORKDIR /app
COPY go.mod go.sum .
RUN go mod download
COPY . .
ENV CGO_ENABLED=1
RUN apk add --no-cache gcc musl-dev sqlite bash
RUN go build -o go-recipes
FROM alpine
WORKDIR /app
RUN apk add --no-cache sqlite bash
COPY --from=builder /app/entrypoint .
COPY --from=builder /app/go-recipes .
COPY --from=builder /app/recipes.json .
RUN chmod +x /app/entrypoint
RUN chmod +x /app/go-recipes
ENTRYPOINT ["/app/entrypoint"]
