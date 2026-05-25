package com.kna.vstay.controller;

import com.kna.vstay.dto.ApiResponse;
import com.kna.vstay.dto.CreateVillaRequest;
import com.kna.vstay.dto.UpdateVillaRequest;
import com.kna.vstay.dto.VillaResponse;
import com.kna.vstay.service.VillaService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/villas")
public class AdminVillaController {
    private final VillaService villaService;

    public AdminVillaController(VillaService villaService) {
        this.villaService = villaService;
    }

    @GetMapping
    public ApiResponse<List<VillaResponse>> list() {
        return ApiResponse.ok(villaService.search(null, null, null, null, null, null, true));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<VillaResponse> create(@Valid @RequestBody CreateVillaRequest request) {
        return ApiResponse.ok(villaService.create(request));
    }

    @PutMapping("/{id}")
    public ApiResponse<VillaResponse> update(@PathVariable Long id, @Valid @RequestBody UpdateVillaRequest request) {
        return ApiResponse.ok(villaService.update(id, request));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        villaService.delete(id);
    }
}
