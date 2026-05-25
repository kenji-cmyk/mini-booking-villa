package com.kna.vstay.dto;

import com.kna.vstay.enums.PaymentStatus;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public record PaymentResponse(
        Long id,
        Long bookingId,
        String provider,
        BigDecimal amount,
        PaymentStatus status,
        String transactionCode,
        LocalDateTime paidAt) {
}
