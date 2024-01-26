package com.project.bidding.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "payment_validation")
public class PaymentValidation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transactional_id", nullable=false)
    private long id;

    @Column(name = "bank_name", nullable = false)
    private String bankName;

    @Column(name = "bank_number", nullable = false)
    private String bankNumber;

    @Column(name = "amount", nullable = false)
    private BigDecimal amount;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "address", nullable = false)
    private String address;

    @OneToOne
    @JoinColumn(name = "auction_id", nullable = false)
    private Auction auction;

    @Column(name= "image_url")
    private String imageURL;

//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "transactional_id", nullable=false)
//    private long id;
//
//    @Column(name = "bank_name", nullable = false)
//    private String bankName;
//
//    @Column(name = "bank_number", nullable = false)
//    private String bankNumber;
//
//    @Column(name = "amount", nullable = false)
//    private BigDecimal amount;
//
//    @Column(name = "created_at", nullable = false)
//    private LocalDateTime createdAt;
//
//    @Column(name = "address", nullable = false)
//    private String address;
//
//    @Column(name="auction_id")
//    private long auctionId;

}
