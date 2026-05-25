package com.kna.vstay.mapper;

import com.kna.vstay.dto.BookingResponse;
import com.kna.vstay.entity.Booking;
import org.springframework.stereotype.Component;

@Component
public class BookingMapper {
    public BookingResponse toResponse(Booking booking) {
        return new BookingResponse(
                booking.getId(),
                booking.getUser().getId(),
                booking.getUser().getFullName(),
                booking.getVilla().getId(),
                booking.getVilla().getName(),
                booking.getCheckInDate(),
                booking.getCheckOutDate(),
                booking.getNumberOfGuests(),
                booking.getContactName(),
                booking.getContactPhone(),
                booking.getStatus());
    }
}
