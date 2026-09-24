package com.shivank.portfolio.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.shivank.portfolio.dto.ChatRequest;
import com.shivank.portfolio.dto.ChatResponse;
import com.shivank.portfolio.service.RagPipelineService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ChatController.class)
@AutoConfigureMockMvc(addFilters = false)
public class ChatControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RagPipelineService ragPipelineService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testChatEndpointSuccess() throws Exception {
        ChatRequest request = ChatRequest.builder()
            .message("What technologies does Shivank know?")
            .build();

        ChatResponse mockResponse = ChatResponse.builder()
            .success(true)
            .answer("Shivank works with React, TypeScript, Node.js, and PostgreSQL.")
            .sources(Collections.emptyList())
            .retrievalMode("hybrid-vector-lexical")
            .grounded(true)
            .build();

        Mockito.when(ragPipelineService.processQuery(Mockito.any(ChatRequest.class)))
            .thenReturn(mockResponse);

        mockMvc.perform(post("/api/chat")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true))
            .andExpect(jsonPath("$.grounded").value(true));
    }
}
