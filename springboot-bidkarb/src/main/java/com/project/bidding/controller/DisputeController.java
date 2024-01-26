package com.project.bidding.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.project.bidding.bean.DisputeInput;
import com.project.bidding.model.Dispute;
import com.project.bidding.service.DisputeService;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping(path="/dispute")
public class DisputeController {

	@Autowired
	DisputeService service;
	
//	@PostMapping("/open-dispute")
//    public void openDispute(@RequestBody DisputeInput disputeInput) {
//		System.out.println("dispute "+disputeInput.getDispute().getId());
//		System.out.println("userId"+disputeInput.getUserId());
//		System.out.println("userId"+disputeInput.getUserId());
////		return service.openDispute(dispute, auctId, userId);
//    }
//	
//	@GetMapping("/open-dispute/get")
//    public DisputeInput Get() {
//		DisputeInput test = new DisputeInput();
//		Dispute disputeA = new Dispute();
//		disputeA.setId(1L);
//		test.setDispute(disputeA);
//		test.setAucId(5L);
//		test.setUserId(9L);
//		return test;
//    }
//

	@PostMapping("/open-dispute/{auctId}/{userId}")
	public Dispute openDispute(@RequestPart("description") String description,
							   @RequestPart("imageURL") String image, @PathVariable("auctId") long auction, @PathVariable("userId") long userId) {
		return service.openDispute(description, image, auction, userId);
	}
}
