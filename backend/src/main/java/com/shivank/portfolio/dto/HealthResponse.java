package com.shivank.portfolio.dto;

import lombok.*;
import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HealthResponse {
    private String application;
    private String database;
    private String rag;
    private String ai;
    private Instant timestamp;
    private long totalKnowledgeChunks;
}
