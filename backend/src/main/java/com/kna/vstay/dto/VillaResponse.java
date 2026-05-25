package com.kna.vstay.dto;

import java.math.BigDecimal;

public record VillaResponse(
        Long id,
        String name,
        String location,
        String description,
        BigDecimal pricePerNight,
        int capacity,
        boolean active) {
}
