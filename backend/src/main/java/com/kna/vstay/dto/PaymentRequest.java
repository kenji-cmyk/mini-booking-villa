package com.kna.vstay.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record PaymentRequest(
        @NotNull Long bookingId,
        @NotBlank @Size(max = 50) String provider,
        @Size(max = 100) String transactionCode,
        Boolean successful) {
}
