package com.shivank.portfolio.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Table(name = "experiences")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false, length = 150)
    private String company;

    @Column(nullable = false, length = 100)
    private String location;

    @Column(nullable = false, length = 100)
    private String period;

    @Column(name = "is_current")
    private Boolean isCurrent;

    @Column(name = "platform_supported")
    private String platformSupported;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String summary;

    @Column(name = "repeat_ticket_reduction")
    private String repeatTicketReduction;

    @Column(name = "daily_volume")
    private String dailyVolume;
}
