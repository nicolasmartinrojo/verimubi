FROM node:20-bullseye AS builder
WORKDIR /app

# Accept build-time secrets so the Nuxt build can bake runtimeConfig
ARG NUXT_SESSION_PASSWORD
ARG NUXT_OMDB_API_KEY
ARG NUXT_DB_FILE_NAME
ENV NUXT_SESSION_PASSWORD=${NUXT_SESSION_PASSWORD}
ENV NUXT_OMDB_API_KEY=${NUXT_OMDB_API_KEY}
ENV NUXT_DB_FILE_NAME=${NUXT_DB_FILE_NAME}

# Install pnpm via corepack (Node 20 includes corepack)
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate && \
    pnpm install

# Copy source and build (build will read the ENV vars above)
COPY . .
RUN pnpm build

FROM node:20-bullseye-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

# Enable corepack in runtime image
RUN corepack enable && corepack prepare pnpm@latest --activate || true

# Copy production node_modules and built output from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.output ./.output

EXPOSE 3000
CMD ["node", "/app/.output/server/index.mjs"]
