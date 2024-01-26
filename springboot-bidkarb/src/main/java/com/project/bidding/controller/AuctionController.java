package com.project.bidding.controller;

import com.project.bidding.exceptionhandler.exception.BadRequestException;
import com.project.bidding.model.Auction;
import com.project.bidding.repository.AuctionRepository;
import com.project.bidding.service.AuctionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/auctions")
@CrossOrigin("http://localhost:5173")
public class AuctionController {

    @Autowired
    AuctionService service;

    @Autowired
    AuctionRepository repository;

    @PostMapping("/new/{id}")
    public ResponseEntity<Auction> newAuction(@PathVariable long id, @RequestBody Auction auction) {
        Auction response = service.newAuction(id, auction);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Auction> editAuction(@PathVariable("id") long id, @RequestBody Auction auction) {
        Auction response = service.editAuction(id, auction);
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @GetMapping("/")
    public ResponseEntity<List<Auction>> viewAllAuction() {
        List<Auction> response = service.getAllAuction();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Auction> viewAuctionDetail(@PathVariable("id") long id) {
        Auction response = service.getAuctionDetail(id);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<List<Auction>> viewAuctionListByCategory(@PathVariable("id") String id) {
        List<Auction> response = service.getAuctionByCategory(id);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/search/{name}")
    public ResponseEntity<List<Auction>> viewAuctionListByProductName(@PathVariable("name") String name) {
        List<Auction> response = service.getAuctionBySearch(name);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //Cancel
    @PutMapping("/cancel/{id}")
    public ResponseEntity<Auction> requestCancel(@PathVariable("id") long id) {
        Auction auction = repository.findById(id).get();
        LocalDateTime presentTime = LocalDateTime.now();
        LocalDateTime endTime = auction.getEndAt();
        if (presentTime.isBefore(endTime)) {
            Auction response = service.cancelAuction(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }else {
            throw new BadRequestException("This auction has been started");
        }
    }
    //Rate function
    @PutMapping("/rate/{id}/{point}")
    public ResponseEntity<String> updateRate(@PathVariable("id") Long id, @PathVariable("point") double point) {
        service.updateRate(id, point);
        return new ResponseEntity<>("Thank you for rating", HttpStatus.OK);
    }

    //hisory
    @GetMapping("/history/{id}/your-sales")
    public List<Auction> requestYourSales(@PathVariable("id") Long id) {
        return service.showYourSales(id);
    }
    @GetMapping("/history/{id}/ongoing")
    public List<Auction> requestOngoing(@PathVariable("id") Long id) {
        return service.showOngoing(id);
    }
    @GetMapping("/history/{id}/completed")
    public List<Auction> requestCompleted(@PathVariable("id") Long id) {
        return service.showCompleted(id);
    }
    @GetMapping("/history/{id}/cancelled")
    public List<Auction> requestCancelled(@PathVariable("id") Long id) {
        return service.showCancelled(id);
    }
}
