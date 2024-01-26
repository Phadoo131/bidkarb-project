package com.project.bidding.controller;

import java.util.List;
import java.util.Optional;

import com.project.bidding.model.ShippingRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.project.bidding.model.Shipping;
import com.project.bidding.service.ShippingService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping(path="/shipping")
public class ShippingController {
	
	@Autowired
	ShippingService service;
	
	@GetMapping("/")
	public ResponseEntity<List<Shipping>> findAll() {
		List<Shipping> response = service.findAll();

		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@GetMapping(value="/{id}")
	public Shipping findOne(@PathVariable("id") long auctId) {
		return service.findByAuctionId(auctId);
	}

	@PostMapping("/confirm-shipping/")
	public Shipping confirmShipping(@RequestBody Shipping shipping) {
		Shipping ship = service.newShipment(shipping);
		service.sendShipmentConfirmEmail(shipping);
		return ship;
	}

	@PutMapping("/confirm-received/{auctId}/{point}")
	public Shipping confirmReceived(@PathVariable long auctId,@PathVariable double point, String comment) {
		return service.confirmReceived(auctId, point, comment);

	}
	
}
