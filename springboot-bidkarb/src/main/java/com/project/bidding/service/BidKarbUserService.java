package com.project.bidding.service;

import com.example.demo.auth.model.User;
import com.example.demo.auth.repository.UserRepository;
import com.example.demo.auth.service.UserDetailsImpl;
import com.example.demo.auth.service.jwt.JwtUtils;
import com.project.bidding.exceptionhandler.exception.NotFoundException;
import com.project.bidding.model.BidKarbUser;
import com.project.bidding.model.BidKarbUserInfoRequest;
import com.project.bidding.repository.AuctionRepository;
import com.project.bidding.repository.BidKarbUserRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class BidKarbUserService {

    @Autowired
    BidKarbUserRepository bidKarbUserRepo;
    
    @Autowired
    AuctionRepository auctRepo;

    @Autowired
    UserRepository userRepo;

    public List<BidKarbUser> findAll() {
        return bidKarbUserRepo.findAll();
    }

    public ResponseEntity<Object> createBidKarbUserInfo(UserDetails principal, BidKarbUserInfoRequest bkRequest) {
        UserDetailsImpl userDetails = (UserDetailsImpl) principal;

        String username = userDetails.getUsername();

        if (username.isBlank() || username.isEmpty()) {
            throw new NotFoundException("Cannot find username!");
        } else {
            User user = userRepo.findByUsername(username)
                    .orElseThrow(() -> new NotFoundException("Cannot find User by username: " + username));

            BidKarbUser bkUser = new BidKarbUser();
            bkUser.setUser(user);

//            bkUser.setEmail(user.getEmail());
            bkUser.setFirstName(bkRequest.getFirstName());
            bkUser.setLastName(bkRequest.getLastName());
            bkUser.setFullName(bkRequest.getFirstName() + " " + bkRequest.getLastName());
            bkUser.setTelNum(bkRequest.getTelNum());
            bkUser.setRate(0.0);

            bidKarbUserRepo.save(bkUser);

            return new ResponseEntity<>("Successfully filled in information!", HttpStatus.CREATED);
        }
    }

    public BidKarbUser getBidKarbUserById(long id) {
        BidKarbUser bidKarbUser = bidKarbUserRepo.findById(id)
                .orElseThrow(() -> new NotFoundException("User not found"));

        return bidKarbUser;
    }

    //Rate of user
    public BidKarbUser userRate(Long id) {
        return auctRepo.userRate(id);
    }

//        public void registerUser(BidKarbUser bidKarbUser) {
//            if (userRepo.existsByEmail(bidKarbUser.getUser().getEmail())) {
//                throw new RuntimeException("Email already exists");
//            }
//            userRepo.save(bidKarbUser);
//        }
//
//        public BidKarbUser loginUser(String email, String password) {
//            BidKarbUser bidKarbUser = userRepo.findByEmail(email)
//                    .orElseThrow(() -> new NotFoundException("User not found"));
//
//            if (!password.equals(bidKarbUser.getUser().getPassword())) {
//                throw new BadRequestException("Invalid password");
//            }
//
//            return bidKarbUser;
//        }
//
//        public void forgotPassword(long id) {
//            BidKarbUser bidKarbUser = userRepo.findById(id).orElseThrow(() -> new NotFoundException("User not found"));
//
//            String subject = "[BidKarb - Forget passward] Reset your password";
//            Context context = emailContext.setForgetPasswordContext();
//
//            emailService.sendEmailWithHtmlTemplate(bidKarbUser.getUser().getEmail(),
//                    subject, "success-payment-template", context);
//        }
//
//        public void updatePassword(String email, String oldPassword, String newPassword) {
//            BidKarbUser bidKarbUser = userRepo.findByEmail(email)
//                    .orElseThrow(() -> new NotFoundException("User not found"));
//
//            if (!oldPassword.equals(bidKarbUser.getUser().getPassword())) {
//                throw new RuntimeException("Invalid old password");
//            }
//
//            bidKarbUser.getUser().setPassword(newPassword);
//            userRepo.save(bidKarbUser);
//    }
	
}