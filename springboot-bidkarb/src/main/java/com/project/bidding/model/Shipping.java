package com.project.bidding.model;
import java.time.LocalDateTime;
import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "shipping")
public class Shipping {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="shipping_id", nullable = false)
	private long id;

	@OneToOne
	@JoinColumn(name = "auction_id", nullable = false)
	@JsonIdentityInfo(
			scope= Auction.class,
            generator = ObjectIdGenerators.PropertyGenerator.class,
            property = "id")
	private Auction auction;

	@Column(name="shipping_company", nullable = false)
	private String shippingCompany;
	
	@Column(name="other_shipping_company")
	private String otherShippingCompany;

	@Column(name="tracking_number", nullable = false)
	private String trackingNumber;

	@Column(name="receive", nullable = false, columnDefinition = "BOOLEAN DEFAULT false")
	private boolean receive = false;
	
	@Column(name="created_at", nullable = false, updatable = false)
	private LocalDateTime createdAt = LocalDateTime.now();
	
	
	
//	public void uship(Shipping ship) {
//		this.setShippingId(ship.getShippingId());
//		this.setAuctionId(ship.getAuctionId());
//		this.setShippingCompany(ship.getShippingCompany());
//		this.setShippingStatus(ship.getShippingStatus());
//		this.setTrackingNumber(ship.getTrackingNumber());
//		this.setReceive(true);
//	}

//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	@Column(name="shipping_id", nullable = false)
//	private long id;
//
//	@Column(name="auction_id")
//	private long auctionId;
//
//	@Column(name="shipping_company", nullable = false)
//	private String shippingCompany;
//
//	@Column(name="shipping_status", nullable = false)
//	private String shippingStatus;
//
//	@Column(name="tracking_number", nullable = false)
//	private String trackingNumber;
//
//	@Column(name="receive", nullable = false, columnDefinition = "boolean default false")
//	private boolean receive;
	
	public void uship(Shipping ship) {
//		this.setId(ship.getId());
//		this.setAuction(ship.getAuction());
//		this.setShippingCompany(ship.getShippingCompany());
//		this.setShippingStatus(ship.getShippingStatus());
//		this.setTrackingNumber(ship.getTrackingNumber());
		this.setReceive(true);
	}
}
