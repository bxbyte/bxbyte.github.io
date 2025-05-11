# Install only build dependencies
FROM oven/bun:alpine AS build-deps
WORKDIR /web
RUN apk update
RUN apk add --upgrade brotli gzip build-base g++ cairo-dev pango-dev giflib-dev gcompat
COPY ./web/package.json ./web/bun.lockb ./
RUN bun install --production --frozen-lockfile

# Install runtime dependencies
FROM nginx:alpine-slim AS runtime
RUN apk del -r nginx && apk add nginx-mod-http-brotli

# Generate static content
FROM build-deps AS build-static
COPY ./web .
RUN bun run build

# Gzip compress static content
FROM build-static AS build-gzip
RUN find ./dist -type f ! -name "*.gz" -exec sh -c 'gzip -9kf "$1" && [ $(stat -c%s "$1.gz") -ge $(stat -c%s "$1") ] && rm "$1.gz"' _ {} \;

# Brotli compress static content
FROM build-static AS build-brotli
RUN find ./dist -type f ! -name "*.br" -exec sh -c 'brotli -Zkf "$1" && [ $(stat -c%s "$1.br") -ge $(stat -c%s "$1") ] && rm "$1.br"' _ {} \;

# Run the static website server
FROM runtime
COPY ./nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
COPY --from=build-gzip /web/dist .
COPY --from=build-brotli /web/dist .
COPY --from=build-static /web/dist .
EXPOSE 4321