package com.kna.vstay.controller;

import com.kna.vstay.dto.ApiResponse;
import com.kna.vstay.dto.BookingResponse;
import com.kna.vstay.dto.UpdateBookingStatusRequest;
import com.kna.vstay.service.BookingService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/bookings")
public class AdminBookingController {
    private final BookingService bookingService;

    public AdminBookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping
    public ApiResponse<List<BookingResponse>> list() {
        return ApiResponse.ok(bookingService.getAll());
    }

    @GetMapping("/{id}")
    public ApiResponse<BookingResponse> getById(@PathVariable Long id) {
        return ApiResponse.ok(bookingService.getById(id));
    }

    @PatchMapping("/{id}/status")
    public ApiResponse<BookingResponse> updateStatus(@PathVariable Long id,
            @Valid @RequestBody UpdateBookingStatusRequest request) {
        return ApiResponse.ok(bookingService.updateStatus(id, request.status()));
    }
}
