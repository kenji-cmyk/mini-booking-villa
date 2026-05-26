package com.kna.vstay.service;

import com.kna.vstay.dto.PaymentRequest;
import com.kna.vstay.dto.PaymentResponse;
import com.kna.vstay.entity.Booking;
import com.kna.vstay.entity.Payment;
import com.kna.vstay.enums.BookingStatus;
import com.kna.vstay.enums.PaymentStatus;
import com.kna.vstay.exception.BookingConflictException;
import com.kna.vstay.exception.NotFoundException;
import com.kna.vstay.exception.ValidationException;
import com.kna.vstay.mapper.PaymentMapper;
import com.kna.vstay.payment.PaymentStrategy;
import com.kna.vstay.payment.PaymentStrategyFactory;
import com.kna.vstay.repository.BookingRepository;
import com.kna.vstay.repository.PaymentRepository;
import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final BookingService bookingService;
    private final BookingRepository bookingRepository;
    private final PaymentStrategyFactory paymentStrategyFactory;
    private final PaymentMapper paymentMapper;

    public PaymentService(PaymentRepository paymentRepository, BookingService bookingService,
            BookingRepository bookingRepository, PaymentStrategyFactory paymentStrategyFactory,
            PaymentMapper paymentMapper) {
        this.paymentRepository = paymentRepository;
        this.bookingService = bookingService;
        this.bookingRepository = bookingRepository;
        this.paymentStrategyFactory = paymentStrategyFactory;
        this.paymentMapper = paymentMapper;
    }

    @Transactional
    public PaymentResponse makePayment(PaymentRequest request, String userEmail) {
        paymentRepository.findByBookingId(request.bookingId()).ifPresent(payment -> {
            throw new BookingConflictException("Payment already exists for this booking.");
        });
        Booking booking = bookingService.findBookingForUser(request.bookingId(), userEmail);
        if (booking.getStatus() != BookingStatus.PENDING) {
            throw new ValidationException("Only pending bookings can be paid.");
        }
        PaymentStrategy strategy = paymentStrategyFactory.getStrategy(request.provider());
        Payment payment = new Payment(booking, strategy.provider(), calculateAmount(booking), request.transactionCode());
        PaymentStatus status = strategy.process(request);
        if (status == PaymentStatus.SUCCESSFUL) {
            payment.markSuccessful();
            booking.confirm();
            bookingRepository.save(booking);
        } else if (status == PaymentStatus.FAILED) {
            payment.markFailed();
        }
        return paymentMapper.toResponse(paymentRepository.save(payment));
    }

    @Transactional(readOnly = true)
    public PaymentResponse getByBookingId(Long bookingId, String userEmail) {
        bookingService.findBookingForUser(bookingId, userEmail);
        return paymentMapper.toResponse(paymentRepository.findByBookingId(bookingId)
                .orElseThrow(() -> new NotFoundException("Payment not found for booking.")));
    }

    private BigDecimal calculateAmount(Booking booking) {
        long nights = ChronoUnit.DAYS.between(booking.getCheckInDate(), booking.getCheckOutDate());
        return booking.getVilla().getPricePerNight().multiply(BigDecimal.valueOf(nights));
    }
}
