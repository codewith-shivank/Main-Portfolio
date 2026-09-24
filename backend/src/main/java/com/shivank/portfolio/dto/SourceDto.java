package com.shivank.portfolio.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SourceDto {
    private String document;
    private String section;
    private String source;
    private String textSnippet;
    private double relevanceScore;
}
