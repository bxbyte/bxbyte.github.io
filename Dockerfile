# Install only build dependencies
FROM oven/bun:alpine AS build-deps
WORKDIR /web
COPY ./web/package.json ./web/bun.lockb ./
RUN apk update
RUN apk add --upgrade brotli gzip
RUN bun install --production --frozen-lockfile

# Install runtime dependencies
FROM nginx:alpine-slim AS runtime
RUN apk del -r nginx
RUN apk add nginx-mod-http-brotli

# Generate the static pages
FROM build-deps AS build
COPY .env* ./web/ .
RUN bun run build
RUN gzip -9kr ./dist
RUN brotli -Zk $(find ./dist -type f ! -name "*.gz")

# Run the static website server
FROM runtime
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build /web/dist /usr/share/nginx/html
EXPOSE 4321