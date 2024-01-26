package com.project.bidding.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
public class ShippingRequest {

    long id;

    String trackingNumber;

    String shippingCompany;

    String otherShippingCompany;

    Auction auction;

}
