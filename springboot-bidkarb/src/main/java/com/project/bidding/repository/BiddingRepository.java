package com.project.bidding.repository;

import com.project.bidding.model.Auction;
import com.project.bidding.model.Bidding;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface BiddingRepository extends JpaRepository<Bidding, Long> {

    List<Bidding> findByAuction(Auction auction);

    @Query(value =
            "SELECT latest_bid FROM auction WHERE id = :auctionId",
            nativeQuery = true)
    Optional<BigDecimal> findMaxAmount(@Param("auctionId") long id);
}
