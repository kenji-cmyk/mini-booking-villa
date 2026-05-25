package com.kna.vstay.repository;

import com.kna.vstay.entity.Villa;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VillaRepository extends JpaRepository<Villa, Long> {
    @Query("""
            select v from Villa v
            where (:includeInactive = true or v.active = true)
              and (:keyword is null
                or lower(v.name) like lower(concat('%', :keyword, '%'))
                or lower(v.location) like lower(concat('%', :keyword, '%')))
              and (:minPrice is null or v.pricePerNight >= :minPrice)
              and (:maxPrice is null or v.pricePerNight <= :maxPrice)
              and (:capacity is null or v.capacity >= :capacity)
            order by v.id
            """)
    List<Villa> search(@Param("keyword") String keyword, @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice, @Param("capacity") Integer capacity,
            @Param("includeInactive") boolean includeInactive);
}
