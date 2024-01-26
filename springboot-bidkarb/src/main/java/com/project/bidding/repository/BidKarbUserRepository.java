package com.project.bidding.repository;

import java.util.Optional;

import com.project.bidding.model.BidKarbUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BidKarbUserRepository extends JpaRepository<BidKarbUser, Long>{
	
//    Optional<BidKarbUser> findByEmail(String email);
//    boolean existsByEmail(String email);


}
