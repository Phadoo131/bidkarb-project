package com.project.bidding.scheduler;

import com.project.bidding.service.PaymentValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@Configuration
@EnableScheduling
public class PaymentValidationScheduler {
    @Autowired
    PaymentValidationService service;

    @Scheduled(cron = "0 0 12 * * ?")
    public void remindToPay() {
        service.remindToPay();
    }

    @Scheduled(cron = "59 59 23 * * ?")
    public void executeDeadline(){
        service.executeDeadline();
    }

}
