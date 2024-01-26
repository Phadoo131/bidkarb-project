package com.project.bidding.repository;

import com.project.bidding.model.CompanyAccount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyAccountRepository extends JpaRepository<CompanyAccount, Long> {
}
