# VStay Implementation Overview

## Review Scope

This review checks whether the current backend implementation matches the delivered documentation in:

- `docs/md/` requirement, use case, package, class, sequence, database, design-pattern, and demo documents.
- `docs/uml/` PlantUML use case, package, class, database, sequence, and design-pattern diagrams.
- `backend/src/main/java/com/kna/vstay/` Spring Boot source code.

## Overall Result

The backend implementation is mostly aligned with the delivered documents. The system implements the documented guest and admin use cases, follows the package diagram structure, maps the main class diagram entities, follows the documented sequence flows at a business level, and applies the documented layered, repository, DTO/mapper, strategy, and factory patterns.

The main implementation gaps are authorization depth for guest-owned booking/payment actions, limited payment status behavior, and light validation for admin booking-status transitions.

## Use Case Coverage

| Use Case | Documentation Expectation | Implementation Status |
| --- | --- | --- |
| UC-01 View Villas | Guest can view active villas. | Implemented through `GET /api/villas`. |
| UC-02 Search and Filter Villas | Search by keyword and filter by price, capacity, and availability date. | Implemented through query parameters in `VillaController` and `VillaService`. |
| UC-03 View Villa Details | Guest can view one active villa. | Implemented through `GET /api/villas/{id}`. |
| UC-04 Create Booking | Validate dates, guest count, contact data, and villa availability before saving pending booking. | Implemented in `BookingService.create`. |
| UC-05 View Booking Details | Guest can view booking details. | Implemented through `GET /api/bookings/{id}`. Ownership restriction is not enforced. |
| UC-06 Cancel Booking | Guest can cancel eligible pending or confirmed bookings. | Implemented through `POST /api/bookings/{id}/cancel`. Ownership restriction is not enforced. |
| UC-07 Make Payment | Guest can submit simplified payment; successful payment confirms booking. | Implemented through `POST /api/payments` with MOMO/VNPAY strategy selection. |
| UC-08 View Payment Status | Guest can view payment status by booking. | Implemented through `GET /api/payments/booking/{bookingId}`. Ownership restriction is not enforced. |
| UC-09 Create Villa | Admin can create villa. | Implemented through `POST /api/admin/villas`. |
| UC-10 Update Villa | Admin can update villa. | Implemented through `PUT /api/admin/villas/{id}`. |
| UC-11 Delete Villa | Admin can delete villa if it has no active booking. | Implemented as soft delete through `active=false`; rejected when active bookings exist. |
| UC-12 View Villa List | Admin can view villa list. | Implemented through `GET /api/admin/villas`, including inactive villas. |
| UC-13 View All Bookings | Admin can view all bookings and details. | Implemented through `GET /api/admin/bookings` and `GET /api/admin/bookings/{id}`. |
| UC-14 Update Booking Status | Admin can update booking status. | Implemented through `PATCH /api/admin/bookings/{id}/status`; only enum/null validation is applied. |

## Class Diagram Alignment

The implementation contains the documented domain classes:

- `User` with `id`, `fullName`, `email`, `phone`, `role`, `isAdmin`, and `isGuest`.
- `Villa` with villa attributes, `active`, audit timestamps, `updateInfo`, and `deactivate`.
- `Booking` with user/villa relationships, dates, guest count, contact data, status, and status transition helpers.
- `Payment` with booking relationship, provider, amount, status, transaction code, paid timestamp, `markSuccessful`, and `markFailed`.
- `Role`, `BookingStatus`, and `PaymentStatus` enum values match the class diagram.

The database mapping also matches the documented schema. The implementation improves the documented one-to-one payment relationship by enforcing a unique `booking_id` at the JPA level.

## Package Diagram Alignment

The backend follows the documented package layout:

- `controller`: public, guest, payment, admin, and Swagger controllers.
- `service`: villa, booking, and payment business logic.
- `payment`: payment strategy interface, MOMO/VNPAY strategies, and factory.
- `repository`: Spring Data JPA repositories.
- `entity`: JPA domain entities.
- `enums`: role, booking status, and payment status.
- `dto`: request/response records and API response envelope.
- `mapper`: entity-to-response conversion.
- `exception`: custom exceptions and global exception handler.
- `config`: security and demo-data configuration.

The only notable addition outside the package diagram is `SwaggerController`, which supports the API documentation surface and does not conflict with the architecture.

## Sequence Diagram Alignment

The business sequence flows are implemented as documented:

- Browse villas: controller asks service, service queries repository, response returns villa DTOs.
- Create booking: input validation, availability check, pending booking persistence, conflict response on overlap.
- Cancel booking: booking load, eligibility check through active status, status update to `CANCELLED`.
- Payment: booking load, strategy/factory payment processing, payment persistence, booking confirmation on successful payment.
- Admin villa management: validation, create/update persistence, active-booking check before soft delete.
- Admin booking management: list/detail retrieval and status update.

The sequence diagrams describe a high-level "VStay System" participant, so the implemented controller/service/repository split is a valid technical realization of those flows.

## Design Pattern Alignment

| Pattern | Implementation |
| --- | --- |
| Layered Architecture | Controllers depend on services; services depend on repositories/domain; repositories persist entities. |
| Repository Pattern | `JpaRepository` interfaces encapsulate data access. |
| DTO and Mapper Pattern | API responses use DTO records and mapper classes instead of exposing entities directly. |
| Strategy Pattern | `PaymentStrategy` supports provider-specific payment behavior. |
| Factory Pattern | `PaymentStrategyFactory` selects a payment strategy by provider name. |

The design-pattern UML uses method names such as `pay` and `getProviderName`, while the code uses `process` and `provider`. This is a naming-level difference only; the pattern intent is implemented.

## Important Gaps and Risks

 while the demo implementation runs on H2 with Hibernate `create-drop`. This is acceptable for the documented classroom demo, but should be called out if PostgreSQL execution is required.
5. The test document is named `09-testing-strategy.md`, but its current content is closer to Phase 5 implementation and demo instructions than a full testing strategy.

## Verification

The backend has integration tests covering:

- Public villa browsing, search, and filters.
- Public Swagger/OpenAPI access.
- Admin endpoint security.
- Booking creation, conflict rejection, and cancellation.
- Successful payment and booking confirmation.
- Admin villa create/update/delete behavior.
- Admin booking status update and active-booking delete rejection.

Run from `backend/`:

```powershell
.\mvnw.cmd test
```

## Conclusion

The current codebase is a valid implementation of the delivered use case, package, class, sequence, database, and design-pattern documentation for the assignment scope. It is suitable for Phase 5 demonstration and final-report preparation, with the caveat that guest ownership checks and stricter status-transition validation should be treated as the highest-priority improvements if the system is evaluated beyond the demo scenario.
