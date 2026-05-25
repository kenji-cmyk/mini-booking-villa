package com.kna.vstay.controller;

import com.kna.vstay.dto.ApiResponse;
import com.kna.vstay.dto.PaymentRequest;
import com.kna.vstay.dto.PaymentResponse;
import com.kna.vstay.service.PaymentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<PaymentResponse> makePayment(@Valid @RequestBody PaymentRequest request) {
        return ApiResponse.ok(paymentService.makePayment(request));
    }

    @GetMapping("/booking/{bookingId}")
    public ApiResponse<PaymentResponse> getByBooking(@PathVariable Long bookingId) {
        return ApiResponse.ok(paymentService.getByBookingId(bookingId));
    }
}
