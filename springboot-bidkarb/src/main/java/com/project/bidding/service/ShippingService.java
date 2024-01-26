package com.project.bidding.service;

import java.util.List;


import com.project.bidding.exceptionhandler.exception.NotFoundException;
import com.project.bidding.model.BidKarbUser;
import com.project.bidding.model.ShippingRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;

import com.project.bidding.enums.AuctionStatus;
import com.project.bidding.model.Auction;
import com.project.bidding.model.Shipping;
import com.project.bidding.repository.AuctionRepository;
import com.project.bidding.repository.PaymentValidationRepository;
import com.project.bidding.repository.ShippingRepository;
import com.project.bidding.repository.BidKarbUserRepository;
import com.project.bidding.util.EmailContext;

@Service
public class ShippingService {
	
	@Autowired
	ShippingRepository repo;

	@Autowired
	AuctionRepository auctRepo;

	@Autowired
	PaymentValidationRepository payRepo;
	
	@Autowired
    BidKarbUserRepository userRepo;
	
	@Autowired
	EmailContext emailContext;
	
	@Autowired
	EmailService emailService;
	
	public Shipping newShipment(Shipping ship) {
		Auction auction = ship.getAuction();
		auction.setStatus(AuctionStatus.SHIPPING);
		auction.setProductCategory(auction.getProductCategory());
		auctRepo.save(auction);

		Shipping newShip = new Shipping();

		newShip.setId(ship.getId());
		newShip.setShippingCompany(ship.getShippingCompany());
		newShip.setOtherShippingCompany(ship.getOtherShippingCompany());
		newShip.setAuction(auction);
		newShip.setTrackingNumber(ship.getTrackingNumber());

		return repo.save(ship);
	}

	public Shipping confirmReceived(long auctId, double point, String comment) {

		
		Auction auct = auctRepo.findById(auctId).get();
		
		Shipping ship = repo.findByAuctionId(auctId);

		auct.setStatus(AuctionStatus.COMPLETED);
		if (point == 0) {
			auct.setRating(0);
		} else {
			auct.setRating(point);
		}
		
		auct.setComment(comment);
		auctRepo.save(auct);

		
		long sellerId = auct.getSeller().getId();		
		double avgRate = repo.calAvgRatingBySeller(sellerId);
		BidKarbUser bkUser = userRepo.findById(sellerId).get();
		bkUser.setRate(avgRate);
		userRepo.save(bkUser);

		ship.setReceive(true);
		
		repo.save(ship);
		
		return ship;
	}

	public List<Shipping> findAll() {
		return repo.findAll();
	}

	public Shipping findByAuctionId(long auctId) {
		return repo.findByAuctionId(auctId);
	}
	
	public Auction forceCompleteAuct() {
		return auctRepo.forceCompleteAuct();
	}
	
	 public ResponseEntity<Object> sendShipmentConfirmEmail(Shipping ship){
	        BidKarbUser buyer = userRepo.findById(ship.getAuction().getBuyer().getId())
	                .orElseThrow(() -> new NotFoundException("Cannot find a specific seller by buyer ID: " + ship.getAuction().getBuyer().getId()));
	               

	        String subject = "[BidKarb - Shipping detail] Success shipment for your Auction";
	        Context context = emailContext.setReceivedConfirm(ship.getAuction().getId(), ship.getTrackingNumber(), ship.getShippingCompany(), ship.getOtherShippingCompany());

	        emailService.sendEmailWithHtmlTemplate(buyer.getUser().getEmail(), subject, "shipment-confirm-template", context);

	        return new ResponseEntity<>("Email for shipment confirm was successfully sent!", HttpStatus.OK);
	    }		
	}
