package com.shivank.portfolio.repository;

import com.shivank.portfolio.model.DocumentChunk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DocumentChunkRepository extends JpaRepository<DocumentChunk, UUID> {

    List<DocumentChunk> findByContentType(String contentType);

    @Query(value = "SELECT * FROM document_chunks WHERE text ILIKE %:query% OR tags_csv ILIKE %:query% OR section ILIKE %:query% LIMIT :limit", nativeQuery = true)
    List<DocumentChunk> searchByKeyword(@Param("query") String query, @Param("limit") int limit);
}
