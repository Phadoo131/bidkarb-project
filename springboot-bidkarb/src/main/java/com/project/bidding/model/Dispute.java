package com.project.bidding.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.project.bidding.enums.DisputeOn;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "dispute")
public class Dispute {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="dispute_id", nullable = false)
	private long id;

	@Column(name="created_at", nullable = false)
	private LocalDateTime createdAt;

	@ManyToOne
	@JoinColumn(name = "disputer", nullable = false)
	@JsonIdentityInfo( scope = BidKarbUser.class,
			generator = ObjectIdGenerators.PropertyGenerator.class,
			property = "id")
	private BidKarbUser disputer;

	@Enumerated(EnumType.STRING)
	@Column(name="dispute_on", nullable = false)
	private DisputeOn disputeOn;

	@ManyToOne
	@JoinColumn(name = "disputed_user", nullable = false)
	@JsonIdentityInfo(scope = BidKarbUser.class,
			generator = ObjectIdGenerators.PropertyGenerator.class,
			property = "id")
	private BidKarbUser disputedUser ;

	@Column(name="description", nullable = false)
	private String description;
	
	@ManyToOne
	@JoinColumn(name="auction_id", nullable = false)
	@JsonIdentityInfo(scope = Auction.class,
			generator = ObjectIdGenerators.PropertyGenerator.class,
			property = "id")
	private Auction auction;
	
    @Column(name= "image_url")
    private String imageURL;

//
//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	@Column(name="dispute_id", nullable = false)
//	private long id;
//
//	@Column(name="created_at", nullable = false)
//	private LocalDate createdAt = LocalDate.now();
//
//	@Column(nullable = false)
//	String disputer;
//
//	@Column(name="dispute_on", nullable = false)
//	private String disputeOn;
//
//	@Column(name="disputed_user")
//	String disputedUser;
//
//	@Column(name="description", nullable = false)
//	private String description;
}
