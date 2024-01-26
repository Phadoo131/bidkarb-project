package com.project.bidding.util;

import org.springframework.stereotype.Component;
import org.thymeleaf.context.Context;

import java.math.BigDecimal;

@Component
public class EmailContext {
    public Context setPaymentEmailContext(long auctionId, String productName, BigDecimal amount){
        BigDecimal percentage = new BigDecimal("0.07");
        BigDecimal tax = amount.multiply(percentage);

        Context context = new Context();
        context.setVariable("auctionID", auctionId);
        context.setVariable("productName", productName);
        context.setVariable("amount", amount);
        context.setVariable("amountPlusTax", amount.add(tax));
        context.setVariable("paymentLink", "http://localhost:5173/payment/" + auctionId);

        return context;
    }

    public Context setPaidEmailContext(long auctionId, String productName,BigDecimal amount, String buyerAddress){
        BigDecimal percentage = new BigDecimal("0.07");
        BigDecimal tax = amount.multiply(percentage);

        Context context = new Context();
        context.setVariable("auctionID", auctionId);
        context.setVariable("productName", productName);
        context.setVariable("amount", amount);
        context.setVariable("amountPlusTax", amount.add(tax));
        context.setVariable("buyerAddress", buyerAddress);
        context.setVariable("shippingConfirmationUrl", "http://localhost:5173/shipping/" + auctionId);

        return context;
    }

    public Context setForgetPasswordContext() {
        Context context = new Context();

        return context;
    }
    
    public Context setReceivedConfirm(long auctionId, String trackingNumber, String shippingCompany, String otherShippingCompany) {
    	Context context = new Context();
    	context.setVariable("trackingNumber", trackingNumber);
    	context.setVariable("shippingCompany", shippingCompany);
    	context.setVariable("otherShippingCompany", otherShippingCompany);
    	context.setVariable("auctionId", auctionId);
    	context.setVariable("ReceiveConfirmationUrl", "http://localhost:5173/received/" + auctionId);
		return context;
    }
}
