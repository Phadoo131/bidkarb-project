package com.project.bidding.service;

import com.project.bidding.enums.AuctionStatus;
import com.project.bidding.exceptionhandler.exception.BadRequestException;
import com.project.bidding.exceptionhandler.exception.NotFoundException;
import com.project.bidding.model.Auction;
import com.project.bidding.model.BidKarbUser;
import com.project.bidding.repository.AuctionRepository;
import com.project.bidding.repository.BidKarbUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AuctionService {

    @Autowired
    BidKarbUserRepository userRepository;

    @Autowired
    AuctionRepository auctionRepository;

    @Autowired
    PaymentValidationService paymentService;

    public Auction newAuction(long id, Auction auction) {
        BidKarbUser bidKarbUser = userRepository.findById(id).get();
        auction.setCreatedAt(LocalDateTime.now());
        auction.setStatus(AuctionStatus.OPEN_SOON);
        auction.setSeller(bidKarbUser);
        return auctionRepository.save(auction);
    }

    public Auction editAuction(long id, Auction auction) throws BadRequestException {
        Auction auct = auctionRepository.findById(id).orElseThrow(() -> new NotFoundException("Auction not found"));

        if (auct.getId() != auction.getId()) {
            throw new BadRequestException("Auction ID not match");
        }

        return auctionRepository.save(auction);
    }

    public List<Auction> getAllAuction() {
        return auctionRepository.findAll();
    }

    public Auction getAuctionDetail(long id) {
//        Auction auction =
              return  auctionRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Auction not found"));

//        return auction;
    }

    public List<Auction> getAuctionByCategory(String id) {
        List<Auction> auctions = auctionRepository.findByProductCategory(id);

        return auctions;
    }

    public List<Auction> getAuctionBySearch(String name) {
        List<Auction> auctions = auctionRepository.findBySearch(name);

        return auctions;
    }

    public void startAuction() {

        List<Auction> auctList = auctionRepository.findByStatus(AuctionStatus.OPEN_SOON);

        for (Auction auction : auctList) {
            if (auction.getStartAt().isBefore(LocalDateTime.now())) {
                auction.setStatus(AuctionStatus.ON_GOING);
                auctionRepository.save(auction);
            }
        }
    }

    public void endAuction() {

        List<Auction> auctionList = auctionRepository.findByStatus(AuctionStatus.ON_GOING);

        for (Auction auction : auctionList) {
            if (auction.getEndAt().isBefore(LocalDateTime.now())) {
                auction.setStatus(AuctionStatus.AUCTION_ENDED);
                auctionRepository.save(auction);
                paymentService.sendEmailToPay(auction.getId());
            }
        }
    }

    // cancel auction
    public Auction cancelAuction(long id) {
        Auction auction = auctionRepository.findById(id).get();
        auction.setStatus(AuctionStatus.CANCELLED);
        return auctionRepository.save(auction);
    }

    //history
    public List<Auction> showYourSales(Long id) {
        BidKarbUser user = userRepository.findById(id).orElseThrow(() -> new NotFoundException("User not found"));
        return auctionRepository.findAuctionForYourSalesTab(user.getId());
    }
    public List<Auction> showOngoing(Long id) {
        BidKarbUser user = userRepository.findById(id).orElseThrow(() -> new NotFoundException("User not found"));
        return auctionRepository.findStatusByIdForOngoingTab(user.getId());
    }
    public List<Auction> showCompleted(Long id) {
        BidKarbUser user = userRepository.findById(id).orElseThrow(() -> new NotFoundException("User not found"));
        return auctionRepository.findStatusByIdForCompletedTab(user.getId());
    }
    public List<Auction> showCancelled(Long id) {
        BidKarbUser user = userRepository.findById(id).orElseThrow(() -> new NotFoundException("User not found"));
        return auctionRepository.findStatusByIdForCancelledTab(user.getId());
    }

	//Rate function
	public void updateRate(Long id, double point) {
        Auction auction = auctionRepository.findById(id).orElseThrow(() -> new NotFoundException("Auction not found"));
        auction.setRating(point);
        auctionRepository.save(auction);
    }
	
}
