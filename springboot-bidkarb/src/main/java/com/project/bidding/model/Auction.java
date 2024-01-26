package com.project.bidding.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.project.bidding.enums.AuctionStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;


@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "auction")
public class Auction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    @Column(name = "product_name", nullable = false)
    String productName;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    @JsonIdentityInfo(
            scope = Auction.class,
            generator = ObjectIdGenerators.PropertyGenerator.class,
            property = "id")
    private ProductCategory productCategory;

    @Column(name = "quality", nullable = false)
    String quality;

    @Column(name = "open_price", nullable = false)
    BigDecimal openPrice;

    @Column(name = "min_bid", nullable = false)
    BigDecimal minBid;

    @Column(name = "latest_bid")
    private BigDecimal latestBid;

    @Column(name = "buy_now_price")
    BigDecimal buyNow;

    @Column(name = "created_at", nullable = false, updatable = false)
    LocalDateTime createdAt;

    @Column(name = "start_time", nullable = false)
    LocalDateTime startAt;

    @Column(name = "end_time", nullable = false)
    LocalDateTime endAt;

    @Column(name = "description")
    String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "auction_status", nullable = false)
    private AuctionStatus status;

    @ManyToOne
    @JoinColumn(name = "buyer_id")
    @JsonIdentityInfo(
            scope = BidKarbUser.class,
            generator = ObjectIdGenerators.PropertyGenerator.class,
            property = "id")
    BidKarbUser buyer;

    @ManyToOne
    @JoinColumn(name = "seller_id")
    @JsonIdentityInfo(
            scope = BidKarbUser.class,
            generator = ObjectIdGenerators.PropertyGenerator.class,
            property = "id")
    BidKarbUser seller;

    @Column(name = "bank_name", nullable = false)
    private String bankName;

    @Column(name = "bank_number", nullable = false)
    private String bankNumber;

    @Column(name = "rating")
    private double rating;

    @Column(name = "comment")
    private String comment;

    @Column(name = "image_url")
    private String imageURL;



//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private long id;
//
//    @Column(name = "product_name", nullable = false)
//    private String productName;
//
//    @Column(name = "product_category", nullable = false)
//    private String productCategory;
//
//    @Column(name = "quality", nullable = false)
//    private String quality;
//
//    @Column(name = "open_price", nullable = false)
//    private BigDecimal openPrice;
//
//    @Column(name = "min_bid", nullable = false)
//    private BigDecimal minBid;
//
//    @Column(name = "buy_now_price")
//    private BigDecimal buyNow;
//
//    @Column(name = "create_at", nullable = false, updatable = false)
//    private LocalDateTime createAt = LocalDateTime.now();
//
//    @Column(name = "start_time")
//    private LocalDateTime startAt;
//
//    @Column(name = "end_time")
//    private LocalDateTime endAt;
//
//    @Column(name = "description")
//    private String description;
//
//    @Enumerated(EnumType.STRING)
//    @Column(name = "auction_status", nullable = false)
//    private AuctionStatus status;
//
//    @Column(name = "buyer")
//    private long buyerId;
//
//    @Column(name = "seller")
//    private long sellerId;
//
//    @Column(name = "bank_name", nullable = false)
//    private String bankName;
//
//    @Column(name = "bank_number", nullable = false)
//    private String bankNumber;
//
//    @Column(name = "rating")
//    private double rating;
}
