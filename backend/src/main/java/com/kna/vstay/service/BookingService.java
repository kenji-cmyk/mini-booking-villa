package com.kna.vstay.service;

import com.kna.vstay.dto.BookingRequest;
import com.kna.vstay.dto.BookingResponse;
import com.kna.vstay.entity.Booking;
import com.kna.vstay.entity.User;
import com.kna.vstay.entity.Villa;
import com.kna.vstay.enums.BookingStatus;
import com.kna.vstay.enums.Role;
import com.kna.vstay.exception.AccessDeniedException;
import com.kna.vstay.exception.BookingConflictException;
import com.kna.vstay.exception.NotFoundException;
import com.kna.vstay.exception.ValidationException;
import com.kna.vstay.mapper.BookingMapper;
import com.kna.vstay.repository.BookingRepository;
import com.kna.vstay.repository.UserRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BookingService {
    private static final List<BookingStatus> ACTIVE_BOOKING_STATUSES = List.of(BookingStatus.PENDING,
            BookingStatus.CONFIRMED);

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final VillaService villaService;
    private final BookingMapper bookingMapper;

    public BookingService(BookingRepository bookingRepository, UserRepository userRepository, VillaService villaService,
            BookingMapper bookingMapper) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.villaService = villaService;
        this.bookingMapper = bookingMapper;
    }

    @Transactional
    public BookingResponse create(BookingRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new NotFoundException("Authenticated user was not found."));
        Villa villa = villaService.findActiveVilla(request.villaId());
        validateBookingRequest(request, villa);
        ensureAvailable(villa.getId(), request);
        Booking booking = new Booking(user, villa, request.checkInDate(), request.checkOutDate(),
                request.numberOfGuests(), request.contactName(), request.contactPhone());
        return bookingMapper.toResponse(bookingRepository.save(booking));
    }

    @Transactional(readOnly = true)
    public BookingResponse getById(Long id) {
        return bookingMapper.toResponse(findBooking(id));
    }

    @Transactional(readOnly = true)
    public BookingResponse getByIdForUser(Long id, String userEmail) {
        Booking booking = findBookingForUser(id, userEmail);
        return bookingMapper.toResponse(booking);
    }

    @Transactional(readOnly = true)
    public List<BookingResponse> getAll() {
        return bookingRepository.findAll().stream().map(bookingMapper::toResponse).toList();
    }

    @Transactional
    public BookingResponse cancel(Long id, String userEmail) {
        Booking booking = findBookingForUser(id, userEmail);
        if (!booking.isActive()) {
            throw new ValidationException("Only pending or confirmed bookings can be cancelled.");
        }
        booking.cancel();
        return bookingMapper.toResponse(bookingRepository.save(booking));
    }

    @Transactional
    public BookingResponse updateStatus(Long id, BookingStatus status) {
        if (status == null) {
            throw new ValidationException("Booking status is required.");
        }
        Booking booking = findBooking(id);
        validateStatusTransition(booking.getStatus(), status);
        booking.updateStatus(status);
        return bookingMapper.toResponse(bookingRepository.save(booking));
    }

    @Transactional(readOnly = true)
    public Booking findBooking(Long id) {
        return bookingRepository.findById(id).orElseThrow(() -> new NotFoundException("Booking not found."));
    }

    @Transactional(readOnly = true)
    public Booking findBookingForUser(Long id, String userEmail) {
        Booking booking = findBooking(id);
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new NotFoundException("Authenticated user was not found."));
        if (user.getRole() == Role.ADMIN || booking.getUser().getId().equals(user.getId())) {
            return booking;
        }
        throw new AccessDeniedException("You can only access your own booking.");
    }

    private void validateBookingRequest(BookingRequest request, Villa villa) {
        if (!request.checkOutDate().isAfter(request.checkInDate())) {
            throw new ValidationException("Check-out date must be after check-in date.");
        }
        if (request.numberOfGuests() > villa.getCapacity()) {
            throw new ValidationException("Number of guests exceeds villa capacity.");
        }
    }

    private void ensureAvailable(Long villaId, BookingRequest request) {
        boolean hasConflict = !bookingRepository
                .findByVillaIdAndStatusInAndCheckInDateLessThanAndCheckOutDateGreaterThan(villaId,
                        ACTIVE_BOOKING_STATUSES, request.checkOutDate(), request.checkInDate())
                .isEmpty();
        if (hasConflict) {
            throw new BookingConflictException("Villa is not available for the selected dates.");
        }
    }

    private void validateStatusTransition(BookingStatus currentStatus, BookingStatus nextStatus) {
        if (currentStatus == nextStatus) {
            return;
        }
        boolean valid = switch (currentStatus) {
            case PENDING -> nextStatus == BookingStatus.CONFIRMED || nextStatus == BookingStatus.CANCELLED;
            case CONFIRMED -> nextStatus == BookingStatus.COMPLETED || nextStatus == BookingStatus.CANCELLED;
            case CANCELLED, COMPLETED -> false;
        };
        if (!valid) {
            throw new ValidationException(
                    "Invalid booking status transition from " + currentStatus + " to " + nextStatus + ".");
        }
    }
}
