# Production Multi-Stage Dockerfile for Frontend & Full-Stack Node Runtime
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/server.ts ./
COPY --from=builder /app/src/data ./src/data
COPY --from=builder /app/src/server ./src/server

USER node
EXPOSE 3000

CMD ["npx", "tsx", "server.ts"]
