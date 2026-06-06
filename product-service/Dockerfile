# Base

FROM node:22-alpine AS base

WORKDIR /app

RUN corepack enable
RUN corepack prepare pnpm@latest --activate

RUN pnpm config set fetch-retries 5
RUN pnpm config set fetch-retry-maxtimeout 120000
RUN pnpm config set network-concurrency 1
RUN pnpm config set store-dir /pnpm/store

# Dependencies

FROM base AS deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# copy package manifests only
COPY packages/*/package.json ./packages/
COPY product-service/package.json ./product-service/

# RUN pnpm install --frozen-lockfile
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

# Builder

FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build shared packages first
RUN pnpm --filter "./packages/**" build

# Generate Prisma client
RUN pnpm --filter product-service exec prisma generate

# Then build product service
RUN pnpm --filter product-service build

# Runner

FROM node:22-alpine AS runner

WORKDIR /app

RUN corepack enable
RUN corepack prepare pnpm@latest --activate

ENV NODE_ENV=production

COPY --from=builder /app ./

EXPOSE 8008

CMD ["node", "product-service/dist/src/index.js"]