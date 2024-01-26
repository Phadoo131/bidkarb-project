package com.project.bidding.repository;

import com.project.bidding.model.Shipping;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ShippingRepository extends JpaRepository<Shipping, Long>{

	@Query(value = "SELECT * "+
			"FROM shipping "+
			"WHERE auction_id = :auctId ",
			nativeQuery = true)
	Shipping findByAuctionId(@Param("auctId") Long auctId);

	@Query(value =
			"SELECT AVG(rating) "+
					"FROM auction "+
					"WHERE seller_id = :seller "+
					"AND rating > 0 ",
			nativeQuery = true)
	double calAvgRatingBySeller(@Param("seller") Long seller);

	
}
