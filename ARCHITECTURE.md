# Architecture: Personal Knowledge System & RAG Engine

**Subject:** Shivank Maurya — Full Stack Developer  
**System:** Production Full Stack Developer Portfolio + AI Personal Knowledge System

---

## 1. High-Level Architecture Overview

```
                               ┌────────────────────────────────────────┐
                               │             USER CLIENT                │
                               │  (Recruiters, Engineers, Mobile Users) │
                               └──────────────────┬─────────────────────┘
                                                  │
                                                  ▼
                               ┌────────────────────────────────────────┐
                               │           FRONTEND LAYER               │
                               │   React 19 / TypeScript / Tailwind     │
                               │  - ATS Keyword Matrix                  │
                               │  - Case Study CMS                      │
                               │  - Ask Shivank AI Drawer               │
                               │  - Resume-Portfolio Consistency Audit │
                               └──────────────────┬─────────────────────┘
                                                  │
                                    REST / JSON   │ Rate Limited (35 req/min)
                                                  ▼
                               ┌────────────────────────────────────────┐
                               │          FULL-STACK API LAYER          │
                               │  Node.js (Express) & Spring Boot 3.3   │
                               │  - CORS & Security Headers (CSP, X-CTO)│
                               │  - Ingestion Pipeline Controller       │
                               │  - Hybrid Vector/Lexical RAG Engine    │
                               │  - Grounded Anti-Hallucination Guard   │
                               └──────────┬──────────────────┬──────────┘
                                          │                  │
                         Semantic Vector  │                  │  Normalized Relational
                         Candidate Search │                  │  CRUD & Logs
                                          ▼                  ▼
                    ┌─────────────────────────┐  ┌─────────────────────────┐
                    │     pgvector STORE      │  │   PostgreSQL DATABASE   │
                    │  - HNSW Index           │  │  - Profiles             │
                    │  - 768-dim Embeddings   │  │  - Experiences & Skills │
                    │  - Document Chunks      │  │  - Project Case Studies │
                    └─────────────────────────┘  └─────────────────────────┘
```

---

## 2. RAG Document Ingestion Pipeline

```
  Raw Input Document (.pdf, .docx, .txt, .md, .json)
                          │
                          ▼
                  1. Text Extraction
                          │
                          ▼
            2. Text Normalization & Cleaning
      (Strips non-printable chars, trims excess whitespace)
                          │
                          ▼
           3. Sliding Window Sentence Chunking
     (Target 450 characters per chunk with sentence preservation)
                          │
                          ▼
                4. Metadata Tagging
   (Document, Source, Section, ContentType, Keywords, Timestamp)
                          │
                          ▼
             5. Embedding Vector Generation
     (Gemini gemini-embedding-2-preview or Local Cosine Space)
                          │
                          ▼
            6. Persistence in Vector Store
       (PostgreSQL with pgvector & In-Memory Fallback)
```

---

## 3. Hybrid Search & Re-Ranking Formula

When a user query arrives at `/api/chat` or `/api/search`:

1. **Lexical / BM25-style Match:**
   - Evaluates token frequencies across tags (weight: 2.0x), section names (weight: 1.5x), and chunk text (weight: 1.0x).
   - Exact phrase match bonus: +3.0 points.

2. **Semantic Similarity Proxy:**
   - Evaluates vector cosine similarity between query embeddings and indexed chunk embeddings.

3. **Combined Scoring:**
   $$\text{HybridScore} = 0.65 \times \text{SemanticScore} + 0.35 \times \text{KeywordScore}$$

4. **Cutoff Guardrail:**
   - Any chunk with a score below 0.4 is excluded to prevent ungrounded, weak associations.

---

## 4. Strict Grounding & Anti-Hallucination Protocol

To protect Shivank's professional credibility:
- The system instructions explicitly forbid the AI from inventing employment, metrics, degrees, or clients.
- If the knowledge base does not contain verified records for a query, the assistant responds deterministically:  
  `"I don't have verified information about that in Shivank's portfolio knowledge base."`
- Every assistant answer provides expandable verified citations linking directly to the document source, section name, and relevance score.
