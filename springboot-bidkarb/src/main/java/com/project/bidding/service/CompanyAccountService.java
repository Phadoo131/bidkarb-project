package com.project.bidding.service;

import com.project.bidding.exceptionhandler.exception.BadRequestException;
import com.project.bidding.exceptionhandler.exception.NotFoundException;
import com.project.bidding.model.CompanyAccount;
import com.project.bidding.model.PaymentValidation;
import com.project.bidding.repository.CompanyAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompanyAccountService {
    @Autowired
    CompanyAccountRepository repo;

    public List<CompanyAccount> findAll(){
        return repo.findAll();
    }
    public CompanyAccount findOne(long id) {
        Optional<CompanyAccount> checker = repo.findById(id);

        if (checker.isEmpty()) {
            throw new NotFoundException("Receipt not found!");
        }

        return checker.get();
    }

    public CompanyAccount createPaymentInAccount(PaymentValidation payment) {
        CompanyAccount newCompanyAcc = new CompanyAccount();

        newCompanyAcc.setId(payment.getId());
        newCompanyAcc.setBankName(payment.getBankName());
        newCompanyAcc.setBankNumber(payment.getBankNumber());
        newCompanyAcc.setAmount(payment.getAmount());
        newCompanyAcc.setCreatedAt(payment.getCreatedAt());

        Optional<CompanyAccount> checker = repo.findById(newCompanyAcc.getId());

        if (checker.isPresent()) {
            throw new BadRequestException("Payment is already added to the Server!");
        }

        return repo.save(newCompanyAcc);
    }

    public ResponseEntity<Object> deletePaymentInAccount(long id) {
        Optional<CompanyAccount> checker = repo.findById(id);

        if (checker.isEmpty()) {
            throw new NotFoundException("Cannot find any receipt in the company's account!");
        }

        repo.deleteById(id);

        return new ResponseEntity<>("Payment in Company Account was deleted successfully!", HttpStatus.OK);
    }

    public ResponseEntity<Object> updatePaymentInAccount(CompanyAccount companyAccount, long id) {
        Optional<CompanyAccount> checker = repo.findById(id);
        if (checker.isEmpty()) {
            throw new NotFoundException("Cannot find any receipt in the company's account!");
        } else {
            CompanyAccount newCompanyAccount = checker.get();
            newCompanyAccount = companyAccount;

            repo.save(newCompanyAccount);

            return new ResponseEntity<>("Payment in Company Account was updated successfully!", HttpStatus.OK);
        }
    }

}
