package com.shivank.portfolio.controller;

import com.shivank.portfolio.dto.DocumentIngestRequest;
import com.shivank.portfolio.model.DocumentChunk;
import com.shivank.portfolio.repository.DocumentChunkRepository;
import com.shivank.portfolio.service.DocumentIngestionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/documents")
@Tag(name = "Document Ingestion", description = "Ingest, manage, and inspect RAG knowledge chunks")
public class DocumentController {

    private final DocumentIngestionService ingestionService;
    private final DocumentChunkRepository chunkRepository;

    public DocumentController(DocumentIngestionService ingestionService, DocumentChunkRepository chunkRepository) {
        this.ingestionService = ingestionService;
        this.chunkRepository = chunkRepository;
    }

    @GetMapping
    @Operation(summary = "List all indexed chunks")
    public ResponseEntity<List<DocumentChunk>> getAllChunks() {
        return ResponseEntity.ok(chunkRepository.findAll());
    }

    @PostMapping("/ingest")
    @Operation(summary = "Ingest, clean, chunk, and index a document")
    public ResponseEntity<Map<String, Object>> ingest(@Valid @RequestBody DocumentIngestRequest request) {
        List<DocumentChunk> created = ingestionService.ingestDocument(request);
        return ResponseEntity.ok(Map.of(
            "success", true,
            "message", "Successfully ingested document into RAG vector store.",
            "chunksCreated", created.size(),
            "totalChunks", chunkRepository.count()
        ));
    }
}
