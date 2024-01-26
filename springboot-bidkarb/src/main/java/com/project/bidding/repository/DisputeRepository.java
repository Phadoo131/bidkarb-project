package com.project.bidding.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.project.bidding.model.Auction;
import com.project.bidding.model.BidKarbUser;
import com.project.bidding.model.Dispute;

public interface DisputeRepository extends JpaRepository<Dispute, Long> {
	
	@Query(value = 
			"SELECT buyer_id FROM auction "+
			"WHERE id = :auctId",
			nativeQuery = true)
	Long getBuyer(@Param("auctId") Long auction);
	
	@Query(value = 
			"SELECT seller_id FROM auction "+
			"WHERE id = :auctId",
			nativeQuery = true)
	Long getSeller(@Param("auctId") Long auction);
	
//	BidKarbUser findByBuyer(@Param("auctId") Long auctId);
//	BidKarbUser findBySeller(@Param("auctId") Long auctId);
	
	Auction findByAuction(Auction auction);
}
