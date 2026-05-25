package com.kna.vstay.dto;

import com.kna.vstay.enums.BookingStatus;
import java.time.LocalDate;

public record BookingResponse(
        Long id,
        Long userId,
        String guestName,
        Long villaId,
        String villaName,
        LocalDate checkInDate,
        LocalDate checkOutDate,
        int numberOfGuests,
        String contactName,
        String contactPhone,
        BookingStatus status) {
}
