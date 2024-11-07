FROM golang:alpine
WORKDIR /app
COPY go.mod go.sum .
RUN go mod download
COPY . .
ENV CGO_ENABLED=1
RUN apk add --no-cache gcc musl-dev sqlite bash
RUN go build main.go 
RUN chmod +x /app/entrypoint
RUN chmod +x /app/main
ENTRYPOINT ["/app/entrypoint"]
