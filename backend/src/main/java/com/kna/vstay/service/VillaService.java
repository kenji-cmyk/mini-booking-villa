package com.kna.vstay.service;

import com.kna.vstay.dto.CreateVillaRequest;
import com.kna.vstay.dto.UpdateVillaRequest;
import com.kna.vstay.dto.VillaResponse;
import com.kna.vstay.entity.Villa;
import com.kna.vstay.enums.BookingStatus;
import com.kna.vstay.exception.BookingConflictException;
import com.kna.vstay.exception.NotFoundException;
import com.kna.vstay.mapper.VillaMapper;
import com.kna.vstay.repository.BookingRepository;
import com.kna.vstay.repository.VillaRepository;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class VillaService {
    private static final List<BookingStatus> ACTIVE_BOOKING_STATUSES = List.of(BookingStatus.PENDING,
            BookingStatus.CONFIRMED);

    private final VillaRepository villaRepository;
    private final BookingRepository bookingRepository;
    private final VillaMapper villaMapper;

    public VillaService(VillaRepository villaRepository, BookingRepository bookingRepository, VillaMapper villaMapper) {
        this.villaRepository = villaRepository;
        this.bookingRepository = bookingRepository;
        this.villaMapper = villaMapper;
    }

    @Transactional(readOnly = true)
    public List<VillaResponse> search(String keyword, BigDecimal minPrice, BigDecimal maxPrice, Integer capacity,
            LocalDate availableFrom, LocalDate availableTo, boolean includeInactive) {
        return villaRepository.search(blankToNull(keyword), minPrice, maxPrice, capacity, includeInactive).stream()
                .filter(villa -> availableFrom == null || availableTo == null
                        || isAvailable(villa.getId(), availableFrom, availableTo))
                .map(villaMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public VillaResponse getById(Long id) {
        return villaMapper.toResponse(findActiveVilla(id));
    }

    @Transactional
    public VillaResponse create(CreateVillaRequest request) {
        Villa villa = villaMapper.toEntity(request);
        return villaMapper.toResponse(villaRepository.save(villa));
    }

    @Transactional
    public VillaResponse update(Long id, UpdateVillaRequest request) {
        Villa villa = findVilla(id);
        villaMapper.updateEntity(villa, request);
        return villaMapper.toResponse(villaRepository.save(villa));
    }

    @Transactional
    public void delete(Long id) {
        Villa villa = findVilla(id);
        boolean hasActiveBookings = bookingRepository.existsByVillaIdAndStatusIn(id, ACTIVE_BOOKING_STATUSES);
        if (hasActiveBookings) {
            throw new BookingConflictException("Villa cannot be deleted while it has active bookings.");
        }
        villa.deactivate();
        villaRepository.save(villa);
    }

    @Transactional(readOnly = true)
    public Villa findActiveVilla(Long id) {
        Villa villa = findVilla(id);
        if (!villa.isActive()) {
            throw new NotFoundException("Villa not found.");
        }
        return villa;
    }

    private Villa findVilla(Long id) {
        return villaRepository.findById(id).orElseThrow(() -> new NotFoundException("Villa not found."));
    }

    private boolean isAvailable(Long villaId, LocalDate checkInDate, LocalDate checkOutDate) {
        return bookingRepository
                .findByVillaIdAndStatusInAndCheckInDateLessThanAndCheckOutDateGreaterThan(villaId,
                        ACTIVE_BOOKING_STATUSES, checkOutDate, checkInDate)
                .isEmpty();
    }

    private String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }
}
