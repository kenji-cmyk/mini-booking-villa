package com.kna.vstay.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public record BookingRequest(
        @NotNull Long villaId,
        @NotNull @FutureOrPresent LocalDate checkInDate,
        @NotNull @FutureOrPresent LocalDate checkOutDate,
        @Min(1) int numberOfGuests,
        @NotBlank @Size(max = 100) String contactName,
        @NotBlank @Size(max = 20) String contactPhone) {
}
