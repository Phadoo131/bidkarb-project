package com.project.bidding.controller;

import com.example.demo.auth.model.User;
import com.project.bidding.model.BidKarbUser;
import com.project.bidding.model.BidKarbUserInfoRequest;
import com.project.bidding.service.BidKarbUserService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/userInfo")
@CrossOrigin("http://localhost:5173")
public class BidKarbUserController {
	
	@Autowired
    BidKarbUserService bidKarbUserService;

    //Create BidKarb UserInfo from User
    @PostMapping("/fillInfo")
    public ResponseEntity<Object> fillUserInfo(@AuthenticationPrincipal UserDetails principal,
                                               @RequestBody BidKarbUserInfoRequest bkRequest){
        return bidKarbUserService.createBidKarbUserInfo(principal, bkRequest);

    }
	
	@GetMapping("/{id}")
    public ResponseEntity<BidKarbUser> getUserById(@PathVariable long id) {
        BidKarbUser response = bidKarbUserService.getBidKarbUserById(id);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

	@GetMapping("/")
	public List<BidKarbUser> findAll() {
		return bidKarbUserService.findAll();
	}

    //Rate of user
    @PutMapping("/{id}")
    public BidKarbUser userRate(@PathVariable long id) {
		return bidKarbUserService.userRate(id);
    	
    }

//
//    @PostMapping("/register")
//    public ResponseEntity<String> registerUser(@RequestBody BidKarbUser bidKarbUser) {
//        bidKarbUserService.registerUser(bidKarbUser);
//        return new ResponseEntity<>("Register successfully", HttpStatus.CREATED);
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<BidKarbUser> loginUser(@PathVariable String email, @PathVariable String password) {
//        BidKarbUser response = bidKarbUserService.loginUser(email, password);
//        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
//    }
//
//    @PostMapping("/forgot-password/{id}")
//    public ResponseEntity<String> forgotPassword(@PathVariable long id) {
//        bidKarbUserService.forgotPassword(id);
//        return new ResponseEntity<>("Reset password link sent to your email", HttpStatus.OK);
//    }
//
//    @PutMapping("/update-password")
//    public ResponseEntity<String> updatePassword(@PathVariable String email, @PathVariable String oldPassword, @PathVariable String newPassword) {
//        bidKarbUserService.updatePassword(email, oldPassword, newPassword);
//        return new ResponseEntity<>("Password updated", HttpStatus.ACCEPTED);
//    }

}

	

