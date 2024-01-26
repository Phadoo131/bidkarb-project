package com.project.bidding.controller;

import com.project.bidding.exceptionhandler.exception.NotFoundException;
import com.project.bidding.model.Auction;
import com.project.bidding.model.Bidding;
import com.project.bidding.repository.AuctionRepository;
import com.project.bidding.service.BiddingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/bids")
@CrossOrigin("http://localhost:5173")
public class BiddingController {
    @Autowired
    BiddingService service;

    @GetMapping(value ="/findallbids")
    public ResponseEntity<List<Bidding>> requestFindAllBids() {
        List<Bidding> response = service.findAllBids();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

//    @PostMapping(value ="/{auctionId}/placebid")
//    public ResponseEntity<Object> requestPlaceBid(@PathVariable("auctionId") long id, @RequestBody Bidding bid) {
//        Auction auction = auctionRepository.findById(id).orElseThrow(() -> new NotFoundException("Auction not found"));
//        bid.setAuction(auction);
//
//        BigDecimal currentAmount = service.currentAmount(bid);
//        BigDecimal startBidPrice = service.startBidPrice(bid);
//
//        if (currentAmount.equals(BigDecimal.ZERO)) {//set first amount when open auction
//            service.FirstAmount(bid);
//            service.placeBid(id, bid);
//        }
//
//        BigDecimal minBid = service.minBid(bid);
//        BigDecimal newAmount = service.newAmount(bid);
//        BigDecimal buyNowPrice = service.buyNowPrice(bid);
//        BigDecimal diffBid = newAmount.subtract(currentAmount);
//        System.out.println(currentAmount);
//        System.out.println(newAmount);
//        if (newAmount.compareTo(startBidPrice) > 0 && !(newAmount.equals(BigDecimal.ZERO))) {
//
//            if (diffBid.compareTo(minBid)>=0 &&newAmount.compareTo(buyNowPrice) < 0&&newAmount.compareTo(currentAmount) > 0 ) {
//                Bidding response = service.placeBid(id, bid);
//                return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
//            }else if (newAmount.equals(buyNowPrice)) {
//                System.out.println("Your bid is same as buy now price");
//                Bidding response = service.buyNow(bid);
//                return new ResponseEntity<>(response, HttpStatus.OK);
//            }
//            else {
//               String response = "Bid's price must greater than current bid or your bid is lower than min bid.";
//                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
//            }
//        }else {
//            String response = "Please input valid amount";
//            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
//        }
//    }
//    @PostMapping(value = "/{auctionId}/buynow")
//    public Bidding requestBuyNow(@PathVariable("auctionId") long id, @RequestBody Bidding bid) {
//        BigDecimal buyNowPrice = service.buyNowPrice(bid);
//        System.out.println(buyNowPrice);
//        BigDecimal buyNow = service.newAmount(bid);
//        System.out.println(buyNow);
//        System.out.println(buyNow.compareTo(buyNowPrice)>=0);
//        if (buyNow.equals(buyNowPrice) && !(buyNow.equals(BigDecimal.ZERO))) {
//            return service.buyNow(bid);
//        }
//        else {
//            return null;
//        }
//    }

    @PostMapping("/{userId}/auction/{auctionId}/bidding")
    public ResponseEntity<Bidding> placeBid(@PathVariable("userId") long userId,
                         @PathVariable("auctionId") long auctionId,
                         @RequestBody Bidding bid) {
        Bidding response = service.placeBid(userId, auctionId, bid);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/{userId}/auction/{auctionId}/buynow")
    public ResponseEntity<String> buyNow(@PathVariable("userId") long userId,
                       @PathVariable("auctionId") long auctionId) {
        service.buyNow(userId, auctionId);
        return new ResponseEntity<>("Buy now succeed", HttpStatus.OK);
    }
}

