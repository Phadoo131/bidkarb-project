package com.project.bidding.repository;

import com.project.bidding.model.PaymentValidation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentValidationRepository extends JpaRepository<PaymentValidation, Long> {
    PaymentValidation findByAuctionId(long id);
}
