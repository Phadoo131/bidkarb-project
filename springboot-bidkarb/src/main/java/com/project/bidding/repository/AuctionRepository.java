package com.project.bidding.repository;

import com.project.bidding.enums.AuctionStatus;
import com.project.bidding.model.Auction;
import com.project.bidding.model.BidKarbUser;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AuctionRepository extends JpaRepository<Auction, Long> {
	List<Auction> findByStatusAndEndAtAfter(String status, LocalDateTime dateTime);

	//filter category
	@Query(value = 
			"SELECT * FROM auction" +
			"RIGHT JOIN product_category c ON a.category = c.id "+
		    "WHERE c.category_id = :id;",
		    nativeQuery = true)
	List<Auction> findByProductCategory(String id);

	@Query(value = "SELECT * FROM auction a " +
			"JOIN product_category c ON a.category_id = c.id " +
			"WHERE a.product_name LIKE CONCAT('%',:name, '%')" +
			"OR c.category_name LIKE CONCAT ('%', :name, '%')" +
			"AND a.auction_status NOT IN ('AUCTION_ENDED','OPEN_SOON','WAITING_FOR_PAYMENT'," +
			" 'PAID', 'SHIPPING', 'COMPLETED', 'CANCELLED', 'DISPUTE')",
	nativeQuery = true)
	List<Auction> findBySearch(String name);
	
	//search
//	@Query(value =
//			"SELECT * FROM auction a " +
//					"RIGHT JOIN product_category c ON a.category = c.category_id "+
//					"WHERE a.product_name like %:name% OR c.category_name like %:name%;",
//			nativeQuery = true)
//	List<Auction> findBySearch(@Param("name") String name);


	List<Auction> findByStatus(AuctionStatus status);

	//Rate by auction function
//	@Modifying
//	@Query(value =
//			"UPDATE auction a "+
//			"SET a.rating = ':point'"+
//			"WHERE id = ':id'",
//			nativeQuery = true)
//	void urate(Long id, double point);

	//Rate by user
	@Query(value =
			"SELECT AVG(rating) AS 'point_of_user'"+
					"FROM auction"+
					"WHERE seller = :id",
			nativeQuery = true)
	BidKarbUser userRate(Long id);


	// Force complete auction from over deadline for receive confirmation
	@Modifying
	@Query(value =
			"UPDATE auction"+
			"SET auction_status = 'COMPLETE'"+
			"WHERE EXISTS ("+
			"SELECT 1"+
			"FROM shipping"+
			"WHERE auction.id = shipping.auction_id"+
			"AND DATEDIFF(NOW(),shipping.created_at)>14"+
			"AND auction.auction_status = 'SHIPPING')",
			nativeQuery = true)
	Auction forceCompleteAuct();

	@Query(value =
			"SELECT auction_status "+
					"FROM auction "+"WHERE id = :id",
			nativeQuery = true)
	Optional<String> findStatusById(@Param("id") Long id);

	//history
	@Query(value =
			"SELECT * "+
					"FROM auction a "+
					"INNER JOIN bidkarb_user u on u.id = a.seller_id "+
					"WHERE a.seller_id = :userId",
			nativeQuery = true)
	List<Auction> findAuctionForYourSalesTab(@Param("userId") Long userId);

	@Query(value =
			"SELECT * "+
					"FROM auction a "+
					"INNER JOIN bidkarb_user u on u.id = a.seller_id "+
					"WHERE a.auction_status IN ('ON_GOING', 'WAITING_FOR_PAYMENT', 'PAID', 'SHIPPING') "+
					"AND a.seller_id = :userId",
			nativeQuery = true)
	List<Auction> findStatusByIdForOngoingTab(@Param("userId") Long userId);

	@Query(value =
			"SELECT * "+
					"FROM auction a "+
					"INNER JOIN bidkarb_user u on u.id = a.seller_id "+
					"WHERE a.auction_status IN ('COMPLETED') "+
					"AND a.seller_id = :userId",
			nativeQuery = true)
	List<Auction> findStatusByIdForCompletedTab(@Param("userId") Long userId);

	@Query(value =
			"SELECT * "+
					"FROM auction a "+
					"INNER JOIN bidkarb_user u on u.id = a.seller_id "+
					"WHERE a.auction_status IN ('CANCELLED') "+
					"AND a.seller_id = :userId",
			nativeQuery = true)
	List<Auction> findStatusByIdForCancelledTab(@Param("userId") Long userId);
}
