package com.shivank.portfolio.repository;

import com.shivank.portfolio.model.Certification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CertificationRepository extends JpaRepository<Certification, UUID> {
}
