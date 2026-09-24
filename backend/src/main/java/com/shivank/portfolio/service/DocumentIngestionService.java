package com.shivank.portfolio.service;

import com.shivank.portfolio.dto.DocumentIngestRequest;
import com.shivank.portfolio.model.DocumentChunk;
import com.shivank.portfolio.repository.DocumentChunkRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class DocumentIngestionService {

    private final DocumentChunkRepository chunkRepository;

    public DocumentIngestionService(DocumentChunkRepository chunkRepository) {
        this.chunkRepository = chunkRepository;
    }

    @Transactional
    public List<DocumentChunk> ingestDocument(DocumentIngestRequest request) {
        // Text Cleaning
        String cleaned = request.getText().replaceAll("\\r\\n", "\n").replaceAll("\\s+", " ").trim();

        // Sliding-window chunking
        String[] sentences = cleaned.split("(?<=[.?!])\\s+");
        List<String> paragraphs = new ArrayList<>();
        StringBuilder current = new StringBuilder();

        for (String sentence : sentences) {
            if (current.length() + sentence.length() > 450) {
                paragraphs.add(current.toString().trim());
                current = new StringBuilder(sentence);
            } else {
                if (!current.isEmpty()) current.append(" ");
                current.append(sentence);
            }
        }
        if (!current.isEmpty()) {
            paragraphs.add(current.toString().trim());
        }

        List<DocumentChunk> chunks = new ArrayList<>();
        for (int i = 0; i < paragraphs.size(); i++) {
            DocumentChunk chunk = DocumentChunk.builder()
                .documentName(request.getTitle())
                .source(request.getSource() != null ? request.getSource() : "Custom Upload")
                .section(request.getSection() + (paragraphs.size() > 1 ? " (Part " + (i + 1) + ")" : ""))
                .contentType(request.getContentType() != null ? request.getContentType() : "projects")
                .text(paragraphs.get(i))
                .tagsCsv(request.getTags() != null ? String.join(",", request.getTags()) : "")
                .build();
            chunks.add(chunkRepository.save(chunk));
        }

        return chunks;
    }
}
