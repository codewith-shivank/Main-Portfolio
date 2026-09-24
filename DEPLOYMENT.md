# Deployment Guide

This guide covers deploying the Full Stack Portfolio and AI Personal Knowledge System across containerized and cloud environments.

---

## 1. Quick Start with Docker Compose

Run the entire stack (PostgreSQL with pgvector + Spring Boot Backend + React Frontend):

```bash
# 1. Clone repository & configure environment variables
cp .env.example .env

# 2. Build and start containers in detached mode
docker-compose up --build -d

# 3. Verify container status
docker-compose ps
```

Services exposed:
- **Frontend & Full Stack App:** `http://localhost:3000`
- **Spring Boot Backend:** `http://localhost:8080`
- **PostgreSQL Database:** `localhost:5432`

---

## 2. Cloud Deployment (Render / Railway / GCP Cloud Run)

### Option A: Full-Stack Node Runtime (Integrated Dev & Production)
The repository contains an integrated Node.js / Express server (`server.ts`) that serves both the compiled React frontend and the RAG API endpoints.

1. Build command:
   ```bash
   npm ci && npm run build
   ```
2. Start command:
   ```bash
   npm start
   ```
3. Set Environment Variables:
   - `GEMINI_API_KEY`: API key from Google AI Studio
   - `ADMIN_PASSWORD`: Administrative ingestion secret
   - `PORT`: 3000

---

## 3. Health & Readiness Verification

Run the automated health probe:
```bash
curl -f http://localhost:3000/api/health
```

Expected output:
```json
{
  "application": "UP",
  "database": "UP",
  "rag": "UP",
  "ai": "UP (Gemini Flash)",
  "totalKnowledgeChunks": 14
}
```
