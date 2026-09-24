package com.shivank.portfolio.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "document_chunks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DocumentChunk {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "document_name", nullable = false)
    private String documentName;

    @Column(nullable = false)
    private String source;

    @Column(nullable = false)
    private String section;

    @Column(name = "content_type", nullable = false)
    private String contentType;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String text;

    @Column(name = "tags")
    private String tagsCsv;

    @Column(name = "created_at")
    private OffsetDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = OffsetDateTime.now();
    }
}
