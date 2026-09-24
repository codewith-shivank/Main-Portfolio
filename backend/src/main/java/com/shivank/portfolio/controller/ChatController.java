package com.shivank.portfolio.controller;

import com.shivank.portfolio.dto.ChatRequest;
import com.shivank.portfolio.dto.ChatResponse;
import com.shivank.portfolio.service.RagPipelineService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chat")
@Tag(name = "RAG Chat Assistant", description = "Query Ask Shivank AI assistant grounded in portfolio knowledge")
public class ChatController {

    private final RagPipelineService ragPipelineService;

    public ChatController(RagPipelineService ragPipelineService) {
        this.ragPipelineService = ragPipelineService;
    }

    @PostMapping
    @Operation(summary = "Ask question to grounded RAG assistant")
    public ResponseEntity<ChatResponse> chat(@Valid @RequestBody ChatRequest request) {
        ChatResponse response = ragPipelineService.processQuery(request);
        return ResponseEntity.ok(response);
    }
}
