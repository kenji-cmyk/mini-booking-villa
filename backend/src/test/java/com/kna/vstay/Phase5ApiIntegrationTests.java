package com.kna.vstay;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class Phase5ApiIntegrationTests {
    private static final String GUEST = "guest@vstay.local";
    private static final String GUEST_PASSWORD = "guest123";
    private static final String ADMIN = "admin@vstay.local";
    private static final String ADMIN_PASSWORD = "admin123";

    @Autowired
    private MockMvc mockMvc;

    @Test
    void publicVillaBrowsingSupportsSearchAndFilters() throws Exception {
        mockMvc.perform(get("/api/villas"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data", hasSize(3)));

        mockMvc.perform(get("/api/villas")
                        .param("keyword", "Da Lat")
                        .param("capacity", "4")
                        .param("availableFrom", "2026-08-01")
                        .param("availableTo", "2026-08-03"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data", hasSize(1)))
                .andExpect(jsonPath("$.data[0].name").value("Pine Hill Retreat"));
    }

    @Test
    void securityProtectsGuestAndAdminEndpoints() throws Exception {
        mockMvc.perform(get("/api/admin/villas"))
                .andExpect(status().isUnauthorized());

        mockMvc.perform(get("/api/admin/villas").with(httpBasic(GUEST, GUEST_PASSWORD)))
                .andExpect(status().isForbidden());

        mockMvc.perform(get("/api/admin/villas").with(httpBasic(ADMIN, ADMIN_PASSWORD)))
                .andExpect(status().isOk());
    }

    @Test
    void guestCanCreateBookingAndConflictingBookingIsRejectedThenBookingCanBeCancelled() throws Exception {
        String body = """
                {
                  "villaId": 2,
                  "checkInDate": "2026-08-01",
                  "checkOutDate": "2026-08-03",
                  "numberOfGuests": 3,
                  "contactName": "Demo Guest",
                  "contactPhone": "0900000001"
                }
                """;

        MvcResult created = mockMvc.perform(post("/api/bookings")
                        .with(httpBasic(GUEST, GUEST_PASSWORD))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.status").value("PENDING"))
                .andReturn();

        String bookingId = com.jayway.jsonpath.JsonPath.read(created.getResponse().getContentAsString(), "$.data.id")
                .toString();

        mockMvc.perform(post("/api/bookings")
                        .with(httpBasic(GUEST, GUEST_PASSWORD))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.success").value(false));

        mockMvc.perform(post("/api/bookings/{id}/cancel", bookingId).with(httpBasic(GUEST, GUEST_PASSWORD)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.status").value("CANCELLED"));
    }

    @Test
    void successfulPaymentRecordsPaymentAndConfirmsBooking() throws Exception {
        MvcResult created = mockMvc.perform(post("/api/bookings")
                        .with(httpBasic(GUEST, GUEST_PASSWORD))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "villaId": 3,
                                  "checkInDate": "2026-08-10",
                                  "checkOutDate": "2026-08-12",
                                  "numberOfGuests": 4,
                                  "contactName": "Demo Guest",
                                  "contactPhone": "0900000001"
                                }
                                """))
                .andExpect(status().isCreated())
                .andReturn();
        String bookingId = com.jayway.jsonpath.JsonPath.read(created.getResponse().getContentAsString(), "$.data.id")
                .toString();

        mockMvc.perform(post("/api/payments")
                        .with(httpBasic(GUEST, GUEST_PASSWORD))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "bookingId": %s,
                                  "provider": "VNPAY",
                                  "transactionCode": "TEST-VNPAY-001",
                                  "successful": true
                                }
                                """.formatted(bookingId)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.status").value("SUCCESSFUL"));

        mockMvc.perform(get("/api/bookings/{id}", bookingId).with(httpBasic(GUEST, GUEST_PASSWORD)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.status").value("CONFIRMED"));

        mockMvc.perform(get("/api/payments/booking/{id}", bookingId).with(httpBasic(GUEST, GUEST_PASSWORD)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.provider").value("VNPAY"));
    }

    @Test
    void adminCanManageVillaWithoutActiveBookings() throws Exception {
        MvcResult created = mockMvc.perform(post("/api/admin/villas")
                        .with(httpBasic(ADMIN, ADMIN_PASSWORD))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "name": "City View Villa",
                                  "location": "Nha Trang",
                                  "description": "Compact demo villa.",
                                  "pricePerNight": 1600000,
                                  "capacity": 3
                                }
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.name").value("City View Villa"))
                .andReturn();
        String villaId = com.jayway.jsonpath.JsonPath.read(created.getResponse().getContentAsString(), "$.data.id")
                .toString();

        mockMvc.perform(put("/api/admin/villas/{id}", villaId)
                        .with(httpBasic(ADMIN, ADMIN_PASSWORD))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "name": "City View Villa Updated",
                                  "location": "Nha Trang",
                                  "description": "Updated demo villa.",
                                  "pricePerNight": 1700000,
                                  "capacity": 4
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.capacity").value(4));

        mockMvc.perform(delete("/api/admin/villas/{id}", villaId).with(httpBasic(ADMIN, ADMIN_PASSWORD)))
                .andExpect(status().isNoContent());
    }

    @Test
    void adminCanUpdateBookingStatusAndCannotDeleteVillaWithActiveBooking() throws Exception {
        mockMvc.perform(delete("/api/admin/villas/1").with(httpBasic(ADMIN, ADMIN_PASSWORD)))
                .andExpect(status().isConflict());

        mockMvc.perform(patch("/api/admin/bookings/1/status")
                        .with(httpBasic(ADMIN, ADMIN_PASSWORD))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "status": "COMPLETED"
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.status").value("COMPLETED"));
    }
}
