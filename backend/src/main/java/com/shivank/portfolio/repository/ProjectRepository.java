package com.shivank.portfolio.repository;

import com.shivank.portfolio.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProjectRepository extends JpaRepository<Project, UUID> {
    List<Project> findByCategory(String category);
    List<Project> findByIsFeaturedTrue();
}
