package com.shivank.portfolio.controller;

import com.shivank.portfolio.model.Project;
import com.shivank.portfolio.repository.ProjectRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@Tag(name = "Projects", description = "Engineering case studies and projects")
public class ProjectController {

    private final ProjectRepository projectRepository;

    public ProjectController(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @GetMapping
    @Operation(summary = "List all projects")
    public ResponseEntity<List<Project>> getProjects(@RequestParam(required = false) String category) {
        if (category != null && !category.equalsIgnoreCase("All")) {
            return ResponseEntity.ok(projectRepository.findByCategory(category));
        }
        return ResponseEntity.ok(projectRepository.findAll());
    }
}
