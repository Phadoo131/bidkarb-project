package com.project.bidding.exceptionhandler;

import lombok.Data;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Data
public class ApiException {

    private final String message;

    private final HttpStatus httpStatus;

    private final LocalDateTime timestamp;
}