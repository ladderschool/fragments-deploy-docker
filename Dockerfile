# base
# ----
FROM node:20-bookworm-slim as base

RUN corepack enable
RUN apt-get update && apt-get install -y \
    openssl \
    && rm -rf /var/lib/apt/lists/*

USER node
WORKDIR /app

COPY --chown=node:node .yarnrc.yml .
COPY --chown=node:node package.json .
COPY --chown=node:node api/package.json api/
COPY --chown=node:node web/package.json web/
COPY --chown=node:node yarn.lock .

RUN mkdir -p /app/.yarn/berry/index
RUN mkdir -p /app/.cache

RUN --mount=type=cache,target=/app/.yarn/berry/cache,uid=1000 \
    --mount=type=cache,target=/app/.cache,uid=1000 \
    CI=1 yarn install

COPY --chown=node:node redwood.toml .
COPY --chown=node:node graphql.config.js .

# api build
# ---------
FROM base as api_build

COPY --chown=node:node api api
COPY --chown=node:node scripts ./scripts/
RUN yarn rw build api

# web prerender build
# -------------------
FROM api_build as web_build_with_prerender

COPY --chown=node:node web web
RUN yarn rw build web

# web build
# ---------
FROM base as web_build

COPY --chown=node:node web web
RUN yarn rw build web --no-prerender

# api serve
# ---------
FROM node:20-bookworm-slim as api_serve

RUN corepack enable

RUN apt-get update && apt-get install -y \
    openssl \
    curl \
    && rm -rf /var/lib/apt/lists/*

USER node
WORKDIR /app

COPY --chown=node:node .yarnrc.yml .
COPY --chown=node:node package.json .
COPY --chown=node:node api/package.json api/
COPY --chown=node:node yarn.lock .

RUN mkdir -p /app/.yarn/berry/index
RUN mkdir -p /app/.cache

RUN --mount=type=cache,target=/app/.yarn/berry/cache,uid=1000 \
    --mount=type=cache,target=/app/.cache,uid=1000 \
    CI=1 yarn workspaces focus api --production

COPY --chown=node:node redwood.toml .
COPY --chown=node:node graphql.config.js .

COPY --chown=node:node --from=api_build /app/api/dist /app/api/dist
COPY --chown=node:node --from=api_build /app/api/db /app/api/db
COPY --chown=node:node --from=api_build /app/node_modules/.prisma /app/node_modules/.prisma

ENV NODE_ENV=production

CMD [ "./api/dist/server.js" ]

# web serve
# ---------
FROM node:20-bookworm-slim as web_serve

RUN corepack enable

USER node
WORKDIR /app

COPY --chown=node:node .yarnrc.yml .
COPY --chown=node:node package.json .
COPY --chown=node:node web/package.json web/
COPY --chown=node:node yarn.lock .

RUN mkdir -p /app/.yarn/berry/index
RUN mkdir -p /app/.cache

RUN --mount=type=cache,target=/app/.yarn/berry/cache,uid=1000 \
    --mount=type=cache,target=/app/.cache,uid=1000 \
    CI=1 yarn workspaces focus web --production

COPY --chown=node:node redwood.toml .
COPY --chown=node:node graphql.config.js .

COPY --chown=node:node --from=web_build /app/web/dist /app/web/dist

ENV NODE_ENV=production \
    API_PROXY_TARGET=http://localhost:8911

CMD "node_modules/.bin/rw-web-server" "--api-proxy-target" "$API_PROXY_TARGET"
