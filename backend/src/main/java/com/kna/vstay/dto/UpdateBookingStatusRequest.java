package com.kna.vstay.dto;

import com.kna.vstay.enums.BookingStatus;
import jakarta.validation.constraints.NotNull;

public record UpdateBookingStatusRequest(@NotNull BookingStatus status) {
}
