package com.project.bidding.scheduler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;

import com.project.bidding.service.ShippingService;

public class ShippingScheduler {

	@Autowired
	ShippingService service;
	
	  @Scheduled(fixedRate = 60000)
	    public void forceCompleteAuct(){
	        service.forceCompleteAuct();
	    }

}
