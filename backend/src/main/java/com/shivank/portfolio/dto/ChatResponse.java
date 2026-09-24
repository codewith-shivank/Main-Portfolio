package com.shivank.portfolio.dto;

import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatResponse {
    private boolean success;
    private String answer;
    private List<SourceDto> sources;
    private String retrievalMode;
    private boolean grounded;
}
