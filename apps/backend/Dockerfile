# Dockerfile para Backend Convex com Bun
FROM oven/bun:1 AS base

# Instalar dependências apenas quando necessário
FROM base AS deps
WORKDIR /app

# Copiar arquivos de dependências
COPY package.json bun.lockb* ./
COPY apps/backend/package.json ./apps/backend/

# Instalar dependências
RUN bun install --frozen-lockfile

# Build apenas quando necessário
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build da aplicação backend
RUN bun run build --filter=backend

# Imagem de produção
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Criar usuário não-root
RUN addgroup --system --gid 1001 convex
RUN adduser --system --uid 1001 convex

# Copiar arquivos necessários
COPY --from=builder --chown=convex:convex /app/apps/backend ./apps/backend
COPY --from=builder --chown=convex:convex /app/node_modules ./node_modules
COPY --from=builder --chown=convex:convex /app/package.json ./package.json

USER convex

EXPOSE 8080

ENV PORT 8080
ENV HOSTNAME "0.0.0.0"

# Comando para iniciar o Convex
CMD ["bun", "run", "--cwd", "apps/backend", "convex", "dev", "--prod"]