package com.shivank.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DocumentIngestRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String source;

    @NotBlank(message = "Section is required")
    private String section;

    private String contentType;

    @NotBlank(message = "Text is required")
    private String text;

    private List<String> tags;
}
