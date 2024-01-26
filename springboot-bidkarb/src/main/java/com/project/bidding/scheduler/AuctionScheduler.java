package com.project.bidding.scheduler;

import com.project.bidding.service.AuctionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@Configuration
@EnableScheduling
public class AuctionScheduler {

    @Autowired
    AuctionService service;


    @Scheduled(fixedRate = 1000)
    public void startAuction() {
        service.startAuction();
    }

    @Scheduled(fixedRate = 1000)
    public void endAuction() {
        service.endAuction();
    }
}
