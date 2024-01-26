package com.project.bidding.service;

import com.project.bidding.exceptionhandler.exception.NotFoundException;
import net.bytebuddy.asm.Advice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.project.bidding.enums.AuctionStatus;
import com.project.bidding.enums.DisputeOn;
import com.project.bidding.model.Auction;
import com.project.bidding.model.BidKarbUser;
import com.project.bidding.model.Dispute;
import com.project.bidding.repository.AuctionRepository;
import com.project.bidding.repository.DisputeRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class DisputeService {

	@Autowired
	DisputeRepository repo;
	
	@Autowired
	AuctionRepository auctRepo;

	public Dispute openDispute(String description, String image, long auctionId, long userId) {

		Auction auction = auctRepo.findById(auctionId)
				.orElseThrow(() -> new
						NotFoundException("Cannot find auction from Auction ID: " + auctionId));

		BidKarbUser buyer = auction.getBuyer();
		BidKarbUser seller = auction.getSeller();

		Dispute dispute = new Dispute();

		if (userId == buyer.getId()){
			dispute.setCreatedAt(LocalDateTime.now());
			dispute.setDisputer(buyer);
			dispute.setDisputeOn(DisputeOn.SELLER);
			dispute.setDisputedUser(seller);
			dispute.setDescription(description);
			dispute.setAuction(auction);
			dispute.setImageURL(image);

			auction.setStatus(AuctionStatus.DISPUTE);
			auctRepo.save(auction);
		} else {
			dispute.setCreatedAt(LocalDateTime.now());
			dispute.setDisputer(seller);
			dispute.setDisputeOn(DisputeOn.BUYER);
			dispute.setDisputedUser(buyer);
			dispute.setDescription(description);
			dispute.setAuction(auction);
			dispute.setImageURL(image);

			auction.setStatus(AuctionStatus.DISPUTE);
			auctRepo.save(auction);
		}

		return repo.save(dispute);
	}
}
