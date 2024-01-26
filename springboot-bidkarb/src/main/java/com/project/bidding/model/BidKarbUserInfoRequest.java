package com.project.bidding.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
public class BidKarbUserInfoRequest {
    private String firstName;

    private String lastName;

    private String telNum;

}
