package com.kna.vstay.controller;

import com.kna.vstay.dto.ApiResponse;
import com.kna.vstay.dto.BookingRequest;
import com.kna.vstay.dto.BookingResponse;
import com.kna.vstay.service.BookingService;
import jakarta.validation.Valid;
import java.security.Principal;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<BookingResponse> create(@Valid @RequestBody BookingRequest request, Principal principal) {
        return ApiResponse.ok(bookingService.create(request, principal.getName()));
    }

    @GetMapping("/{id}")
    public ApiResponse<BookingResponse> getById(@PathVariable Long id) {
        return ApiResponse.ok(bookingService.getById(id));
    }

    @PostMapping("/{id}/cancel")
    public ApiResponse<BookingResponse> cancel(@PathVariable Long id) {
        return ApiResponse.ok(bookingService.cancel(id));
    }
}
