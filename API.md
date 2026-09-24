# REST API Specification

Base URL: `http://localhost:3000/api` (Dev) / `https://<domain>/api` (Prod)

All requests and responses use `application/json` format with UTF-8 encoding.

---

## 1. System Health

### `GET /api/health`
Returns health check status for backend, database, RAG pipeline, and vector chunks.

**Response:**
```json
{
  "application": "UP",
  "database": "UP",
  "rag": "UP",
  "ai": "UP (Gemini Flash)",
  "environment": "production",
  "timestamp": "2026-09-23T15:20:00.000Z",
  "totalKnowledgeChunks": 14
}
```

---

## 2. RAG Chat Assistant

### `POST /api/chat`
Submits a natural language query to the grounded RAG engine.

**Rate limit:** 35 requests per minute per IP.

**Request Body:**
```json
{
  "message": "What backend technologies does Shivank know?",
  "history": [
    { "role": "user", "content": "Tell me about Shivank" },
    { "role": "assistant", "content": "Shivank is a Full Stack Developer..." }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "answer": "Shivank is proficient in full-stack backend development using Node.js, Express.js, REST APIs, Mongoose, Prisma, MongoDB, PostgreSQL, and Redis.",
  "sources": [
    {
      "document": "resume.pdf",
      "section": "Technical Skills: Backend",
      "source": "Verified Resume",
      "textSnippet": "Backend Technologies: Node.js, Express.js, REST APIs...",
      "relevanceScore": 3.8
    }
  ],
  "retrievalMode": "hybrid-gemini",
  "grounded": true
}
```

---

## 3. Search & Discovery

### `GET /api/search?q={query}`
Performs a hybrid semantic + keyword search over portfolio knowledge chunks.

**Query Parameters:**
- `q` (string, required): Search terms (e.g. `jwt`, `postgresql`, `swiggy`)

**Response:**
```json
{
  "success": true,
  "query": "jwt",
  "count": 2,
  "results": [
    {
      "id": "chunk-proj-2",
      "document": "resume.pdf",
      "section": "Featured Projects: iNoteBook",
      "contentType": "projects",
      "text": "iNoteBook – Secure Note-Taking Web Application...",
      "score": 3.4,
      "tags": ["jwt", "react", "mongodb", "authentication"]
    }
  ]
}
```

---

## 4. Ingestion & Administration

### `POST /api/documents/ingest`
Ingests a document or transcript, cleaning text and creating vector chunks.

**Request Body:**
```json
{
  "title": "additional-case-study.md",
  "source": "Portfolio CMS",
  "section": "Technical Architecture",
  "contentType": "projects",
  "text": "Detailed architecture notes for full stack applications...",
  "tags": ["fullstack", "react", "spring boot"]
}
```

---

## 5. Consistency Audit

### `GET /api/consistency-check`
Runs automated synchronization verification between live portfolio state and verified resume data.
