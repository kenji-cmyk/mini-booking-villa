package com.kna.vstay.mapper;

import com.kna.vstay.dto.PaymentResponse;
import com.kna.vstay.entity.Payment;
import org.springframework.stereotype.Component;

@Component
public class PaymentMapper {
    public PaymentResponse toResponse(Payment payment) {
        return new PaymentResponse(
                payment.getId(),
                payment.getBooking().getId(),
                payment.getProvider(),
                payment.getAmount(),
                payment.getStatus(),
                payment.getTransactionCode(),
                payment.getPaidAt());
    }
}
