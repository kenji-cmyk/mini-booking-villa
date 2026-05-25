package com.kna.vstay.controller;

import com.kna.vstay.dto.ApiResponse;
import com.kna.vstay.dto.VillaResponse;
import com.kna.vstay.service.VillaService;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/villas")
public class VillaController {
    private final VillaService villaService;

    public VillaController(VillaService villaService) {
        this.villaService = villaService;
    }

    @GetMapping
    public ApiResponse<List<VillaResponse>> search(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) Integer capacity,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate availableFrom,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate availableTo) {
        return ApiResponse.ok(villaService.search(keyword, minPrice, maxPrice, capacity, availableFrom, availableTo,
                false));
    }

    @GetMapping("/{id}")
    public ApiResponse<VillaResponse> getById(@PathVariable Long id) {
        return ApiResponse.ok(villaService.getById(id));
    }
}
