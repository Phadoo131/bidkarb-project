package com.project.bidding.model;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "bidding")
public class Bidding {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    @JoinColumn(name = "auction_id")
    @JsonIdentityInfo(scope = Bidding.class, generator = ObjectIdGenerators.PropertyGenerator.class,
            property = "id")
    Auction auction;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIdentityInfo(scope = Bidding.class, generator = ObjectIdGenerators.PropertyGenerator.class,
            property = "id")
    BidKarbUser bidKarbUser;

    @Column(name = "amount", nullable = false)
    BigDecimal amount;

    @Column(name = "created_at")
    LocalDateTime createdAt;
}
