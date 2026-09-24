package com.shivank.portfolio.controller;

import com.shivank.portfolio.dto.HealthResponse;
import com.shivank.portfolio.repository.DocumentChunkRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;

@RestController
@RequestMapping("/api/health")
@Tag(name = "Health Check", description = "System health and knowledge index status")
public class HealthController {

    private final DocumentChunkRepository chunkRepository;

    public HealthController(DocumentChunkRepository chunkRepository) {
        this.chunkRepository = chunkRepository;
    }

    @GetMapping
    @Operation(summary = "Get overall health and component status")
    public ResponseEntity<HealthResponse> getHealth() {
        long chunks = chunkRepository.count();
        HealthResponse response = HealthResponse.builder()
            .application("UP")
            .database("UP")
            .rag("UP")
            .ai("UP (Hybrid RAG Engine)")
            .timestamp(Instant.now())
            .totalKnowledgeChunks(chunks)
            .build();
        return ResponseEntity.ok(response);
    }
}
