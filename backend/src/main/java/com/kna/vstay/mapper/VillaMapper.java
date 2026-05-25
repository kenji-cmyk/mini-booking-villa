package com.kna.vstay.mapper;

import com.kna.vstay.dto.CreateVillaRequest;
import com.kna.vstay.dto.UpdateVillaRequest;
import com.kna.vstay.dto.VillaResponse;
import com.kna.vstay.entity.Villa;
import org.springframework.stereotype.Component;

@Component
public class VillaMapper {
    public Villa toEntity(CreateVillaRequest request) {
        return new Villa(request.name(), request.location(), request.description(), request.pricePerNight(),
                request.capacity());
    }

    public void updateEntity(Villa villa, UpdateVillaRequest request) {
        villa.updateInfo(request.name(), request.location(), request.description(), request.pricePerNight(),
                request.capacity());
    }

    public VillaResponse toResponse(Villa villa) {
        return new VillaResponse(villa.getId(), villa.getName(), villa.getLocation(), villa.getDescription(),
                villa.getPricePerNight(), villa.getCapacity(), villa.isActive());
    }
}
