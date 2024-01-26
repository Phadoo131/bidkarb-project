package com.project.bidding.bean;

import com.project.bidding.model.Dispute;

import lombok.Data;

@Data
public class DisputeInput {
	
	private Long UserId;
	private Long AuctId;
	private Dispute dispute;
}
