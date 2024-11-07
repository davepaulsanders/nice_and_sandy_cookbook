FROM golang:alpine AS builder
WORKDIR /app
COPY go.mod go.sum .
RUN go mod download
COPY . .
ENV CGO_ENABLED=1
RUN apk add --no-cache gcc musl-dev sqlite bash
RUN go build main.go 
FROM alpine
WORKDIR /app
RUN apk add --no-cache sqlite bash
COPY --from=builder /app/entrypoint .
COPY --from=builder /app/main .
COPY --from=builder /app/init.sql .
RUN chmod +x /app/entrypoint
RUN chmod +x /app/main
ENTRYPOINT ["/app/entrypoint"]
