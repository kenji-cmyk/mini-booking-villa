package com.kna.vstay.config;

import com.kna.vstay.entity.Booking;
import com.kna.vstay.entity.Payment;
import com.kna.vstay.entity.User;
import com.kna.vstay.entity.Villa;
import com.kna.vstay.enums.Role;
import com.kna.vstay.repository.BookingRepository;
import com.kna.vstay.repository.PaymentRepository;
import com.kna.vstay.repository.UserRepository;
import com.kna.vstay.repository.VillaRepository;
import java.math.BigDecimal;
import java.time.LocalDate;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DemoDataInitializer {
    @Bean
    CommandLineRunner seedDemoData(UserRepository userRepository, VillaRepository villaRepository,
            BookingRepository bookingRepository, PaymentRepository paymentRepository) {
        return args -> {
            if (userRepository.count() > 0) {
                return;
            }

            User guest = userRepository
                    .save(new User("Demo Guest", "guest@vstay.local", "0900000001", Role.GUEST));
            userRepository.save(new User("Demo Admin", "admin@vstay.local", "0900000002", Role.ADMIN));

            Villa beachVilla = villaRepository.save(new Villa("Ocean Breeze Villa", "Da Nang Beach",
                    "Three-bedroom villa near the beach with private pool.", new BigDecimal("2500000.00"), 6));
            villaRepository.save(new Villa("Pine Hill Retreat", "Da Lat",
                    "Quiet mountain villa suitable for families.", new BigDecimal("1800000.00"), 4));
            villaRepository.save(new Villa("Riverside Garden Villa", "Hoi An",
                    "Garden villa close to the old town and river.", new BigDecimal("2100000.00"), 5));

            Booking booking = bookingRepository.save(new Booking(guest, beachVilla, LocalDate.of(2026, 7, 10),
                    LocalDate.of(2026, 7, 12), 4, "Demo Guest", "0900000001"));
            Payment payment = new Payment(booking, "MOMO", new BigDecimal("5000000.00"), "DEMO-MOMO-001");
            payment.markSuccessful();
            booking.confirm();
            bookingRepository.save(booking);
            paymentRepository.save(payment);
        };
    }
}
