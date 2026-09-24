-- Enable pgvector extension for semantic vector similarity
CREATE EXTENSION IF NOT EXISTS vector;

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    headline VARCHAR(255) NOT NULL,
    primary_role VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    bio_intro TEXT NOT NULL,
    availability_status VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Skills Table
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    is_core BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Experiences Table
CREATE TABLE IF NOT EXISTS experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(150) NOT NULL,
    company VARCHAR(150) NOT NULL,
    location VARCHAR(100) NOT NULL,
    period VARCHAR(100) NOT NULL,
    is_current BOOLEAN DEFAULT false,
    platform_supported VARCHAR(150),
    summary TEXT NOT NULL,
    repeat_ticket_reduction VARCHAR(50),
    daily_volume VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    tagline VARCHAR(300) NOT NULL,
    category VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL,
    role VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    problem_solved TEXT NOT NULL,
    solution TEXT NOT NULL,
    github_url VARCHAR(255),
    live_url VARCHAR(255),
    is_featured BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS project_technologies (
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    technology VARCHAR(100) NOT NULL,
    PRIMARY KEY (project_id, technology)
);

-- 5. Education Table
CREATE TABLE IF NOT EXISTS educations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    degree VARCHAR(200) NOT NULL,
    institution VARCHAR(200) NOT NULL,
    location VARCHAR(100) NOT NULL,
    period VARCHAR(100) NOT NULL,
    details TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Certifications Table
CREATE TABLE IF NOT EXISTS certifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    issuer VARCHAR(150) NOT NULL,
    credential_type VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. RAG Documents & Document Chunks (Vector Store)
CREATE TABLE IF NOT EXISTS documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    source VARCHAR(255) NOT NULL,
    content_type VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS document_chunks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
    document_name VARCHAR(255) NOT NULL,
    source VARCHAR(255) NOT NULL,
    section VARCHAR(255) NOT NULL,
    content_type VARCHAR(100) NOT NULL,
    text TEXT NOT NULL,
    tags TEXT[],
    embedding vector(768),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance & vector search
CREATE INDEX IF NOT EXISTS idx_chunks_doc_id ON document_chunks(document_id);
CREATE INDEX IF NOT EXISTS idx_chunks_content_type ON document_chunks(content_type);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);

-- Full text search index
CREATE INDEX IF NOT EXISTS idx_chunks_text_search ON document_chunks USING gin(to_tsvector('english', text));

-- Seed verified profile information
INSERT INTO profiles (name, headline, primary_role, location, email, bio_intro, availability_status)
VALUES (
    'Shivank Maurya',
    'Full Stack Developer | Customer Support & Technical Support',
    'Full Stack Developer',
    'Lucknow, India',
    'codewithshivank@gmail.com',
    'Full Stack Developer bridging modern web development across React, TypeScript, Next.js, Node.js, and PostgreSQL with high-volume technical support operations.',
    'Available for Full-time Roles'
);
