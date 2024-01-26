package com.project.bidding.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.bidding.model.FileData;

public interface FileRepository extends JpaRepository<FileData,Integer> {
    Optional<FileData> findByName(String fileName);
    
}
