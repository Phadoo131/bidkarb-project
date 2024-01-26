package com.project.bidding.controller;

import com.project.bidding.exceptionhandler.exception.NotFoundException;
import com.project.bidding.model.Auction;
import com.project.bidding.model.PaymentValidation;
import com.project.bidding.model.BidKarbUser;
import com.project.bidding.repository.AuctionRepository;
import com.project.bidding.repository.BiddingRepository;
import com.project.bidding.repository.BidKarbUserRepository;
import com.project.bidding.service.CompanyAccountService;
import com.project.bidding.service.EmailService;
import com.project.bidding.service.PaymentValidationService;
import com.project.bidding.util.EmailContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.context.Context;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/payments")
@CrossOrigin("http://localhost:5173")
public class PaymentValidationController {

	@Autowired
    PaymentValidationService paymentService;

    @Autowired
    CompanyAccountService companyAccountService;

    @Autowired
    AuctionRepository auctRepo;

    //Testing purpose
    @Autowired
    BidKarbUserRepository userRepo;

    @Autowired
    BiddingRepository biddingRepo;

    @Autowired
    EmailService emailService;

    @Autowired
    EmailContext emailContext;

    @GetMapping("/")
    public List<PaymentValidation> findAll(){
        return paymentService.findAll();
    }

    @PostMapping("/new")
    public ResponseEntity<Object> createPayment(@RequestBody PaymentValidation payment) {

        //CreatedPayment to generate ID first jaa => If not the repo cannot find matching payment by id
        PaymentValidation createdPayment = paymentService.createPayment(payment);
        companyAccountService.createPaymentInAccount(payment);

        try {
            //To validate payment => If matched => Auction status will be changed to "Paid"
            paymentService.validatePayment(createdPayment.getId());
        } catch (Exception e) {
            // Log or print the exception details
            e.printStackTrace();
        }

        return new ResponseEntity<>("Payment Confirmed", HttpStatus.ACCEPTED);
    }

    //To test sending email to buyer
    @PostMapping("/testsendemail/{auctionId}")
    public ResponseEntity<Object> testSendEmail(@PathVariable("auctionId") long auctionId){
        Optional<Auction> auction = auctRepo.findById(auctionId);

        if (auction.isEmpty()){
            throw new NotFoundException("Cannot find the specific auction!");
        }

        Auction underpaidAuction = auction.get();

        Optional<BidKarbUser> buyer = userRepo.findById(underpaidAuction.getBuyer().getId());

        if (buyer.isEmpty()){
            throw new NotFoundException("Cannot find the specific user!");
        }
        Optional<BigDecimal> wonAmount = biddingRepo.findMaxAmount(underpaidAuction.getId());
        if (wonAmount.isEmpty()){
            throw new NotFoundException("Cannot find the won price!");
        }

        String subject = "[BidKarb - Payment] Congratulations on your winning, please proceed further with the payment process!";
        Context context = emailContext.setPaymentEmailContext(underpaidAuction.getId(), underpaidAuction.getProductName(), wonAmount.get());

        emailService.sendEmailWithHtmlTemplate(buyer.get().getUser().getEmail(),
                subject, "email-template", context);
        return new ResponseEntity<>("Email for payment was successfully sent!", HttpStatus.OK);
    }

    //    Moved both to be under endAuction in AuctionService
    //    @PostMapping("/payment/email/{auctionId}")
    //    public ResponseEntity<Object> sendPaymentEmail(@PathVariable("auctionId") long auctionId) {
    //        return paymentService.sendEmailToPay(auctionId);
    //    }
    //    @PostMapping("/remind/{auctionId}")
    //    public ResponseEntity<Object> reminderToPay(@PathVariable("auctionId") long auctionId){
    //        return paymentService.remindToPay(auctionId);
    //    }

    //    Set up this just in case we wanted to validate specific payment manually
    //    @PostMapping("/validate/{id}")
    //    public ResponseEntity<Object> validatePayment(@PathVariable("id") long paymentId){
    //        PaymentValidation validator = paymentService.findOne(paymentId);
    //        List<CompanyAccount> matchedWithAccounts = companyAccountService.findAll()
    //                .stream()
    //                .filter(receipt -> receipt.getCreatedAt().equals(validator.getCreatedAt())
    //                        && receipt.getAmount().equals(validator.getAmount())
    //                        && receipt.getBankName().equals(validator.getBankName())
    //                        && receipt.getBankNumber().equals(validator.getBankNumber()))
    //                .collect(Collectors.toList());
    //
    //        if (!matchedWithAccounts.isEmpty()) {
    //            Auction auction = (auctRepo.findById(validator.getAuction().getId())
    //                    .orElseThrow(() -> new NotFoundException("Auction not found with ID: " + validator.getAuction().getId())));
    //            auction.setStatus("Paid");
    //
    //            auctService.editAuction(auction.getId(), auction);
    //
    //            return ResponseEntity.ok(matchedWithAccounts);
    //        } else {
    //            return ResponseEntity.noContent().build();
    //        }
    //    }
    //    @PostMapping("/deadline/{id}")
    //    public ResponseEntity<Object> paymentDeadline(@PathVariable("id") long auctionId){
    //        return paymentService.calculateDeadline(auctionId);
    //    }

}

