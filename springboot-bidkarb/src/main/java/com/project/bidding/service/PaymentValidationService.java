package com.project.bidding.service;

import com.project.bidding.enums.AuctionStatus;
import com.project.bidding.exceptionhandler.exception.BadRequestException;
import com.project.bidding.exceptionhandler.exception.NotFoundException;
import com.project.bidding.model.Auction;
import com.project.bidding.model.BidKarbUser;
import com.project.bidding.model.CompanyAccount;
import com.project.bidding.model.PaymentValidation;
import com.project.bidding.repository.AuctionRepository;
import com.project.bidding.repository.BiddingRepository;
import com.project.bidding.repository.PaymentValidationRepository;
import com.project.bidding.repository.BidKarbUserRepository;
import com.project.bidding.util.EmailContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PaymentValidationService {

    @Autowired
    PaymentValidationRepository repo;

    @Autowired
    AuctionRepository auctionRepo;

    @Autowired
    BidKarbUserRepository userRepo;

    @Autowired
    BiddingRepository biddingRepo;

    @Autowired
    EmailService emailService;

    @Autowired
    CompanyAccountService companyAccountService;

    @Autowired
    EmailContext emailContext;

    public List<PaymentValidation> findAll(){
        return repo.findAll();
    }

    public PaymentValidation findOne(long id) {
        Optional<PaymentValidation> checker = repo.findById(id);

        if (checker.isEmpty()) {
            throw new NotFoundException("Payment Not found");
        }

        return checker.get();
    }

    public PaymentValidation createPayment(PaymentValidation payment) {

        //Check if the auction of the payment is exist or not
        Auction checker = auctionRepo.findById(payment.getAuction().getId())
                .orElseThrow(() -> new NotFoundException("Cannot find specific Auction based on Auction ID: "
                        + payment.getAuction().getId()));

        //Check whether the auction Id filled in payment (from Frontend) was paid or not!
        if (checker.getStatus().equals(AuctionStatus.PAID)){
            throw new BadRequestException("This Auction already paid! Auction ID: "
                    + checker.getId());
        }

        return repo.save(payment);
    }

    public ResponseEntity<Object> validatePayment(long paymentId){
        PaymentValidation validator = findOne(paymentId);

        Auction auction = auctionRepo.findById(validator.getAuction().getId())
                .orElseThrow(() -> new NotFoundException("Auction not found with ID: " + validator.getAuction().getId()));

        //Get wonAmount to check with the paid amount if it's aligned or not
        BigDecimal wonAmount = biddingRepo.findMaxAmount(auction.getId())
                .orElseThrow(() ->
                        new NotFoundException("Cannot find the specific Auction when validating payment! Auction ID:"
                                + validator.getAuction().getId()));

        BigDecimal percentage = new BigDecimal("0.07");
        BigDecimal tax = wonAmount.multiply(percentage);

        List<CompanyAccount> matchedWithAccounts = new ArrayList<>();

        for (CompanyAccount receipt : companyAccountService.findAll()) {
            if (Objects.equals(receipt.getCreatedAt(), validator.getCreatedAt())
                    && receipt.getAmount().compareTo(wonAmount.add(tax)) == 0
                    && Objects.equals(receipt.getAmount(), validator.getAmount())
                    && Objects.equals(receipt.getBankName(), validator.getBankName())
                    && Objects.equals(receipt.getBankNumber(), validator.getBankNumber())) {
                matchedWithAccounts.add(receipt);
            }
        }

        //If matchedWithAccounts are not null => then the CompanyAccount is matched with Payment
        //Then edit status of that auction
        if (!matchedWithAccounts.isEmpty()) {
            auction.setStatus(AuctionStatus.PAID);

            auctionRepo.save(auction);

            //Send success payment email to seller to continue the shipping process
//            ResponseEntity<Object> success =
            sendSuccessPaymentEmail(auction);

            return ResponseEntity.ok(matchedWithAccounts);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

//    public ResponseEntity<Object> validatePayment(long paymentId){
//        PaymentValidation validator = findOne(paymentId);
//
//        Auction auction = auctionRepo.findById(validator.getAuction().getId())
//                .orElseThrow(() -> new NotFoundException("Auction not found with ID: " + validator.getAuction().getId()));
//
//        //Get wonAmount to check with the paid amount if it's aligned or not
//        BigDecimal wonAmount = biddingRepo.findMaxAmount(auction.getId())
//                .orElseThrow(() ->
//                        new NotFoundException("Cannot find the specific Auction when validating payment! Auction ID:"
//                                + validator.getAuction().getId()));
//
//        BigDecimal percentage = new BigDecimal("0.07");
//        BigDecimal tax = wonAmount.multiply(percentage);
//
//        List<CompanyAccount> matchedWithAccounts = companyAccountService.findAll()
//                .stream()
//                .filter(receipt -> receipt.getCreatedAt().equals(validator.getCreatedAt())
//                        && receipt.getAmount().equals(wonAmount.add(tax))
//                        && receipt.getAmount().equals(validator.getAmount())
//                        && receipt.getBankName().equals(validator.getBankName())
//                        && receipt.getBankNumber().equals(validator.getBankNumber()))
//                .collect(Collectors.toList());
//
//        //If matchedWithAccounts are not null => then the CompanyAccount is matched with Payment
//        //Then edit status of that auction
//        if (!matchedWithAccounts.isEmpty()) {
//            auction.setStatus(AuctionStatus.PAID);
//
//            auctionRepo.save(auction);
//
//            //Send success payment email to seller to continue the shipping process
////            ResponseEntity<Object> success =
//            sendSuccessPaymentEmail(auction);
//
//            return ResponseEntity.ok(matchedWithAccounts);
//        } else {
//            return ResponseEntity.noContent().build();
//        }
//    }

    public ResponseEntity<Object> sendSuccessPaymentEmail(Auction auction){
        BidKarbUser seller = userRepo.findById(auction.getSeller().getId())
                .orElseThrow(() -> new NotFoundException("Cannot find a specific seller by Seller ID: " + auction.getSeller().getId()));

        //Get payment to see buyerAddress
        PaymentValidation payment = repo.findByAuctionId(auction.getId());

        String buyerAddress = payment.getAddress();

        BigDecimal wonAmount = biddingRepo.findMaxAmount(auction.getId())
                .orElseThrow(() -> new NotFoundException("Cannot find the won amount of Auction ID: " + auction.getId()));

        String subject = "[BidKarb - Success Payment] Success payment for your Auction";
        Context context = emailContext.setPaidEmailContext(auction.getId(), auction.getProductName(), wonAmount, buyerAddress);

        emailService.sendEmailWithHtmlTemplate(seller.getUser().getEmail(),
                subject, "success-payment-template", context);

        return new ResponseEntity<>("Email for completed payment was successfully sent!", HttpStatus.OK);
    }

    public ResponseEntity<Object> sendEmailToPay(long auctionId){
        Auction underPaidAuction = auctionRepo.findById(auctionId)
                .orElseThrow(() -> new NotFoundException("Cannot find any auction based on Auction ID: "+ auctionId));

        BidKarbUser buyer = userRepo.findById(underPaidAuction.getBuyer().getId())
                .orElseThrow(() ->
                        new NotFoundException("Cannot find Buyer based on User ID: "
                                + underPaidAuction.getBuyer().getId()));

        BigDecimal wonAmount = biddingRepo.findMaxAmount(underPaidAuction.getId())
                .orElseThrow(() ->
                        new NotFoundException("Cannot find the won amount of Auction ID: "+ auctionId));

        String subject = "[BidKarb - Payment] Congratulations on your winning, please proceed further with the payment process!";
        Context context = emailContext.setPaymentEmailContext(underPaidAuction.getId(), underPaidAuction.getProductName(), wonAmount);

        emailService.sendEmailWithHtmlTemplate(buyer.getUser().getEmail(),
                subject, "payment-email-template", context);

        underPaidAuction.setStatus(AuctionStatus.WAITING_FOR_PAYMENT);
        auctionRepo.save(underPaidAuction);

        return new ResponseEntity<>("Email for payment was successfully sent!", HttpStatus.OK);
    }

    public void remindToPay() {

        LocalDate todayDate = LocalDate.now();

        List<Auction> auctions = auctionRepo.findAll().stream()
                .filter(auction ->
                todayDate.isEqual(auction.getEndAt().plusDays(2).toLocalDate())
                && auction.getStatus().equals(AuctionStatus.WAITING_FOR_PAYMENT)).collect(Collectors.toList());

        for (Auction auction : auctions){
            BigDecimal wonAmount = biddingRepo.findMaxAmount(auction.getId())
                    .orElseThrow(() -> new NotFoundException("[Remind To Pay] Cannot find the won amount of Auction ID: " + auction.getId()));

            BidKarbUser buyer = userRepo.findById(auction.getBuyer().getId())
                    .orElseThrow(() -> new NotFoundException("[Remind To Pay] Cannot find a specific buyer in Auction ID: " + auction.getId()));

            String subject = "[BidKarb - Payment] Congratulations on your winning, please proceed further with the payment process!";
            Context context = emailContext.setPaymentEmailContext(auction.getId(), auction.getProductName(),
                    wonAmount);

            LocalDate endDate = auction.getEndAt().toLocalDate();
            LocalDate dayToRemind = endDate.plusDays(2);

            if (todayDate.isEqual(dayToRemind)){
                emailService.sendEmailWithHtmlTemplate(buyer.getUser().getEmail(),
                        subject, "payment-email-template", context);
            } else {
                return;
            }
        }
    }

    public void executeDeadline(){
        LocalDate todayDate = LocalDate.now();

        List<Auction> auctions = auctionRepo.findAll().stream()
                .filter(auction ->
                        todayDate.isEqual(auction.getEndAt().plusDays(3).toLocalDate())
                                && auction.getStatus().equals(AuctionStatus.WAITING_FOR_PAYMENT))
                .collect(Collectors.toList());

        for (Auction auction : auctions){
            LocalDate endDate = auction.getEndAt().toLocalDate();
            LocalDate deadline = endDate.plusDays(3);

            if (todayDate.isAfter(deadline)){
                auction.setStatus(AuctionStatus.CANCELLED);
                auctionRepo.save(auction);

            } else{
                auction.setStatus(AuctionStatus.WAITING_FOR_PAYMENT);
                auctionRepo.save(auction);
            }

        }
    }

//    Old version of remindToPay
//    public ResponseEntity<Object> remindToPay(long auctionId) {
//
//        Optional<Auction> auction = auctionRepo.findById(auctionId);
//
//        if (auction.isEmpty()){
//            throw new NotFoundException("Cannot find the specific auction!");
//        }
//
//        Auction underpaidAuction = auction.get();
//
//        Optional<User> buyer = userRepo.findById(underpaidAuction.getBuyerId());
//
//        if (buyer.isEmpty()){
//            throw new NotFoundException("Cannot find the specific user!");
//        }
//
//        Optional<BigDecimal> wonAmount = biddingRepo.findMaxAmount(underpaidAuction.getId());
//        if (wonAmount.isEmpty()){
//            throw new NotFoundException("Cannot find the won price!");
//        }
//
//        String subject = "[BidKarb - Payment] Congratulations on your winning, please proceed further with the payment process!";
//        Context context = setPaymentEmailContext(underpaidAuction.getId(), underpaidAuction.getProductName(),
//                wonAmount.get()); //Changed AuctionID to long in Bidding
//
//        LocalDateTime endDate = underpaidAuction.getEndAt();
//        LocalDateTime dayToRemind = endDate.plusDays(2);
//
//        LocalDateTime todayDate = LocalDateTime.now();
//
//        if (todayDate.isEqual(dayToRemind)){
//            emailService.sendEmailWithHtmlTemplate(buyer.get().getEmail(),
//                    subject, "email-template", context);
//            return new ResponseEntity<>("Email to remind was successfully sent!", HttpStatus.OK);
//        } else {
//            return ResponseEntity.noContent().build();
//        }
//
}
