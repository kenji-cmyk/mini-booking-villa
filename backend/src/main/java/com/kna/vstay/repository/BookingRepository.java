package com.kna.vstay.repository;

import com.kna.vstay.entity.Booking;
import com.kna.vstay.enums.BookingStatus;
import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByVillaIdAndStatusInAndCheckInDateLessThanAndCheckOutDateGreaterThan(Long villaId,
            Collection<BookingStatus> statuses, LocalDate checkOutDate, LocalDate checkInDate);

    boolean existsByVillaIdAndStatusIn(Long villaId, Collection<BookingStatus> statuses);
}
