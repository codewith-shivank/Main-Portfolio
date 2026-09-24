package com.shivank.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatRequest {

    @NotBlank(message = "Query message cannot be empty")
    @Size(max = 500, message = "Message must not exceed 500 characters")
    private String message;

    private List<ChatMessageDto> history;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ChatMessageDto {
        private String role;
        private String content;
    }
}
