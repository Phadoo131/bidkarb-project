package com.project.bidding.service;

import com.project.bidding.enums.AuctionStatus;
import com.project.bidding.exceptionhandler.exception.BadRequestException;
import com.project.bidding.exceptionhandler.exception.NotFoundException;
import com.project.bidding.model.Auction;
import com.project.bidding.model.BidKarbUser;
import com.project.bidding.model.Bidding;
import com.project.bidding.repository.AuctionRepository;
import com.project.bidding.repository.BiddingRepository;
import com.project.bidding.repository.BidKarbUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BiddingService {
    @Autowired
    BiddingRepository biddingRepo;

    @Autowired
    AuctionRepository auctionRepo;

    @Autowired
    BidKarbUserRepository userRepo;

    @Autowired
    PaymentValidationService paymentService;

//    public BigDecimal currentAmount(Bidding bid) {
//        BigDecimal getCurrentAmount = biddingRepo.findMaxAmount(bid.getAuction().getId()).orElse(BigDecimal.ZERO);
//        return getCurrentAmount;
//    }
//    public BigDecimal minBid(Bidding bid) {
//        BigDecimal minBid = bid.getAuction().getMinBid();
//        return minBid;
//    }
//    public BigDecimal startBidPrice(Bidding bid) {
//        BigDecimal startBidPrice = bid.getAuction().getOpenPrice();
//        return startBidPrice;
//    }
//    public BigDecimal newAmount(Bidding bid) {
//        BigDecimal newAmount = bid.getAmount();
//        return newAmount;
//    }
//    public BigDecimal buyNowPrice(Bidding bid) {
//        BigDecimal buyNowPrice = bid.getAuction().getBuyNow();
//        return buyNowPrice;
//    }
//
//    public Bidding findBid(Long id) {
//        return biddingRepo.findById(id).orElse(null);
//    }
//    public Bidding placeBid(long id, Bidding bid) {
//        Auction auction = auctionRepo.findById(id).orElseThrow(() -> new NotFoundException("Auction not found"));
//        BidKarbUser bidKarbUser = userRepo.findById(bid.getBidKarbUser().getId()).orElseThrow(() -> new NotFoundException("User not found"));
////        Auction auctionId = auctionRepo.findById(bid.getAuction().getId()).get();
//        bid.setAuction(auction);
//        bid.setBidKarbUser(bidKarbUser);
//        bid.getAuction().setBuyer(bidKarbUser);
////        bid.getAuction().setStatus(AuctionStatus.ON_GOING);
//        bid.getAuction().setLatestBid(bid.getAmount());
//        return biddingRepo.save(bid);
//    }
//    public Bidding buyNow(Bidding bid) {
//        System.out.println("You want to buy now");
//        BidKarbUser bidKarbUser = userRepo.findById(bid.getBidKarbUser().getId()).get();
//        bid.setBidKarbUser(bidKarbUser);
//        bid.getAuction().setBuyer(bidKarbUser);
//        bid.getAuction().setStatus(AuctionStatus.AUCTION_ENDED);
//        bid.getAuction().setEndAt(bid.getCreatedAt());
//        bid.getAuction().setLatestBid(bid.getAmount());
//        return biddingRepo.save(bid);
//    }
//
//    set open price to first amount
//    public void FirstAmount(Bidding bid) {
//        biddingRepo.save(bid);
//    }

    public List<Bidding> findAllBids() {
        return biddingRepo.findAll();
    }
    public Bidding placeBid(long userId, long auctionId, Bidding bid) {
        BidKarbUser user = userRepo.findById(userId).orElseThrow(() -> new NotFoundException("User not found"));
        Auction auction = auctionRepo.findById(auctionId).orElseThrow(() -> new NotFoundException("Auction not found"));
        List<Bidding> biddingList = biddingRepo.findByAuction(auction);

        Bidding bidding = new Bidding();
        bidding.setAuction(auction);
        bidding.setBidKarbUser(user);
        bidding.setCreatedAt(LocalDateTime.now());
        bidding.getAuction().setBuyer(user);

        if (bid.getAmount().compareTo(auction.getMinBid()) >= 0) {
            if (biddingList.isEmpty()) {
                bidding.setAmount(bid.getAmount());
                bidding.getAuction().setLatestBid(bidding.getAuction().getOpenPrice().add(bid.getAmount()));
            } else {
                Bidding recentBid = biddingList.get(biddingList.size() - 1);
                bidding.setAmount(bid.getAmount());
                bidding.getAuction().setLatestBid(recentBid.getAuction().getLatestBid().add(bid.getAmount()));

            }
        } else {
            throw new BadRequestException("Bid's price must greater than minimun bid");
        }

        return biddingRepo.save(bidding);
    }

    public void buyNow(long userId, long auctionId) {
        BidKarbUser user = userRepo.findById(userId).orElseThrow(() -> new NotFoundException("User not found"));
        Auction auction = auctionRepo.findById(auctionId).orElseThrow(() -> new NotFoundException("User not found"));
        Bidding buyNow = new Bidding();
        buyNow.setAuction(auction);
        buyNow.setBidKarbUser(user);
        buyNow.setAmount(buyNow.getAuction().getBuyNow());
        buyNow.setCreatedAt(LocalDateTime.now());
        buyNow.getAuction().setStatus(AuctionStatus.AUCTION_ENDED);
        buyNow.getAuction().setLatestBid(buyNow.getAmount());
        buyNow.getAuction().setBuyer(buyNow.getBidKarbUser());
        biddingRepo.save(buyNow);

        paymentService.sendEmailToPay(auction.getId());
    }
}



