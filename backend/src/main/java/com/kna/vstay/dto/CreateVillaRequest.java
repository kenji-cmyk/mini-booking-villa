package com.kna.vstay.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;

public record CreateVillaRequest(
        @NotBlank @Size(max = 150) String name,
        @NotBlank @Size(max = 255) String location,
        @Size(max = 2000) String description,
        @NotNull @DecimalMin(value = "0.01") BigDecimal pricePerNight,
        @Min(1) int capacity) {
}
