package com.shivank.portfolio.controller;

import com.shivank.portfolio.model.Profile;
import com.shivank.portfolio.repository.ProfileRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/profile")
@Tag(name = "Profile", description = "Public profile information for Shivank Maurya")
public class ProfileController {

    private final ProfileRepository profileRepository;

    public ProfileController(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    @GetMapping
    @Operation(summary = "Get professional profile")
    public ResponseEntity<?> getProfile() {
        return profileRepository.findFirstByOrderByCreatedAtDesc()
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.ok(Profile.builder()
                .name("Shivank Maurya")
                .headline("Full Stack Developer | Customer Support & Technical Support")
                .primaryRole("Full Stack Developer")
                .location("Lucknow, India")
                .email("codewithshivank@gmail.com")
                .bioIntro("Full Stack Developer with dual expertise in web development and technical customer support.")
                .availabilityStatus("Available for Full-time Roles")
                .build()));
    }
}
