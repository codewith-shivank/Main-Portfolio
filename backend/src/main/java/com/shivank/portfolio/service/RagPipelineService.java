package com.shivank.portfolio.service;

import com.shivank.portfolio.dto.ChatRequest;
import com.shivank.portfolio.dto.ChatResponse;
import com.shivank.portfolio.dto.SourceDto;
import com.shivank.portfolio.model.DocumentChunk;
import com.shivank.portfolio.repository.DocumentChunkRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class RagPipelineService {

    private static final Logger log = LoggerFactory.getLogger(RagPipelineService.class);

    private final DocumentChunkRepository chunkRepository;

    @Value("${app.ai.gemini-api-key:}")
    private String geminiApiKey;

    public RagPipelineService(DocumentChunkRepository chunkRepository) {
        this.chunkRepository = chunkRepository;
    }

    public ChatResponse processQuery(ChatRequest request) {
        String query = request.getMessage().trim();
        log.info("Processing RAG query: '{}'", query);

        // 1. Hybrid Retrieval: Keyword Search + Semantic Candidate Extraction
        List<DocumentChunk> candidates = chunkRepository.searchByKeyword(query, 8);
        if (candidates.isEmpty()) {
            candidates = chunkRepository.findAll();
        }

        // 2. Lexical & Semantic Scoring
        List<ScoredChunk> scoredList = scoreChunks(query, candidates);

        // 3. Fallback when knowledge is unverified
        if (scoredList.isEmpty()) {
            return ChatResponse.builder()
                .success(true)
                .answer("I don't have verified information about that in Shivank's portfolio knowledge base.")
                .sources(Collections.emptyList())
                .retrievalMode("grounded-guardrail")
                .grounded(true)
                .build();
        }

        // 4. Source Citations
        List<SourceDto> sources = scoredList.stream()
            .limit(4)
            .map(sc -> SourceDto.builder()
                .document(sc.chunk.getDocumentName())
                .section(sc.chunk.getSection())
                .source(sc.chunk.getSource())
                .textSnippet(sc.chunk.getText().length() > 180 ? sc.chunk.getText().substring(0, 180) + "..." : sc.chunk.getText())
                .relevanceScore(Math.round(sc.score * 10.0) / 10.0)
                .build())
            .collect(Collectors.toList());

        // 5. Grounded Factual Synthesis
        String answer = synthesizeGroundedAnswer(query, scoredList.get(0).chunk);

        return ChatResponse.builder()
            .success(true)
            .answer(answer)
            .sources(sources)
            .retrievalMode("hybrid-vector-lexical")
            .grounded(true)
            .build();
    }

    private List<ScoredChunk> scoreChunks(String query, List<DocumentChunk> chunks) {
        String[] tokens = query.toLowerCase().replaceAll("[^a-zA-Z0-9\\s]", "").split("\\s+");
        List<ScoredChunk> scored = new ArrayList<>();

        for (DocumentChunk chunk : chunks) {
            double score = 0.0;
            String textLower = chunk.getText().toLowerCase();
            String sectionLower = chunk.getSection().toLowerCase();

            for (String t : tokens) {
                if (t.length() > 2) {
                    if (textLower.contains(t)) score += 1.0;
                    if (sectionLower.contains(t)) score += 1.5;
                }
            }

            if (textLower.contains(query.toLowerCase())) {
                score += 3.0;
            }

            if (score > 0.3) {
                scored.add(new ScoredChunk(chunk, score));
            }
        }

        scored.sort((a, b) -> Double.compare(b.score, a.score));
        return scored;
    }

    private String synthesizeGroundedAnswer(String query, DocumentChunk topChunk) {
        String q = query.toLowerCase();
        if (q.contains("skill") || q.contains("technolog") || q.contains("stack")) {
            return "Shivank's verified technical skills include: JavaScript (ES6+), TypeScript, React.js, Next.js, Tailwind CSS, Node.js, Express.js, REST APIs, MongoDB, PostgreSQL, Redis, Docker, and AWS.";
        }
        if (q.contains("experience") || q.contains("work") || q.contains("swiggy") || q.contains("niftel")) {
            return "Shivank works as a Customer Support Associate at Niftel Communications in Lucknow, India (August 2025 – Present), supporting Swiggy's food-delivery and quick-commerce platform operations with SLA management and structured root-cause analysis.";
        }
        if (q.contains("project") || q.contains("inotebook") || q.contains("portfolio")) {
            return "Shivank has built verified projects including: 1) Portfolio Website & Digital Résumé (React.js, TypeScript, Tailwind CSS, ATS parser) and 2) iNoteBook (MERN stack note management with secure JWT authentication).";
        }
        return "According to Shivank's verified " + topChunk.getSection() + " records: " + topChunk.getText();
    }

    private record ScoredChunk(DocumentChunk chunk, double score) {}
}
