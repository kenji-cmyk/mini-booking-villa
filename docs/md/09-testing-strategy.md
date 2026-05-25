# 09 - Phase 5 Implementation and Demonstration

## Purpose

This document explains how to demonstrate the implemented VStay backend prototype for Phase 5.

The demo covers the required guest and admin workflows from the requirements, use case diagrams, sequence diagrams, class diagram, package diagram, database schema, and design pattern documentation.

## Demo Setup

Start the backend from the `backend` directory:

```powershell
.\mvnw.cmd spring-boot:run
```

The application runs with an H2 demo database. Demo data is loaded automatically at startup.

Base URL:

```text
http://localhost:8080
```

Demo users:

| Role | Username | Password |
| --- | --- | --- |
| Guest | `guest@vstay.local` | `guest123` |
| Admin | `admin@vstay.local` | `admin123` |

PowerShell note: when using `curl.exe.exe`, pipe JSON with `--data-binary '@-'`. Passing a JSON string variable directly to `curl.exe.exe --data-raw $body` can strip the JSON quotes and produce a `400 Bad Request`.

## Guest Demo Flow

View villas:

```powershell
curl.exe http://localhost:8080/api/villas
```

Search and filter villas:

```powershell
curl.exe "http://localhost:8080/api/villas?keyword=Da%20Lat&capacity=4&availableFrom=2026-08-01&availableTo=2026-08-03"
```

View villa details:

```powershell
curl.exe http://localhost:8080/api/villas/1
```

Create a booking:

```powershell
$body = @'
{"villaId":2,"checkInDate":"2026-08-01","checkOutDate":"2026-08-03","numberOfGuests":3,"contactName":"Demo Guest","contactPhone":"0900000001"}
'@

$body | curl.exe.exe -u guest@vstay.local:guest123 -X POST http://localhost:8080/api/bookings `
  -H "Content-Type: application/json" `
  --data-binary '@-'
```

View booking details:

```powershell
curl.exe -u guest@vstay.local:guest123 http://localhost:8080/api/bookings/{bookingId}
```

Cancel a booking:

```powershell
curl.exe -u guest@vstay.local:guest123 -X POST http://localhost:8080/api/bookings/{bookingId}/cancel
```

For the payment demo, create a separate booking that has not been cancelled.

Make a payment:

```powershell
$body = @'
{"bookingId":2,"provider":"VNPAY","transactionCode":"DEMO-VNPAY-002","successful":true}
'@

$body | curl.exe -u guest@vstay.local:guest123 -X POST http://localhost:8080/api/payments `
  -H "Content-Type: application/json" `
  --data-binary '@-'
```

View payment status:

```powershell
curl.exe -u guest@vstay.local:guest123 http://localhost:8080/api/payments/booking/{bookingId}
```

## Admin Demo Flow

List villas, including inactive villas:

```powershell
curl.exe -u admin@vstay.local:admin123 http://localhost:8080/api/admin/villas
```

Create a villa:

```powershell
$body = @'
{"name":"City View Villa","location":"Nha Trang","description":"Compact demo villa.","pricePerNight":1600000,"capacity":3}
'@

$body | curl.exe.exe -u admin@vstay.local:admin123 -X POST http://localhost:8080/api/admin/villas `
  -H "Content-Type: application/json" `
  --data-binary '@-'
```

Update a villa:

```powershell
$body = @'
{"name":"City View Villa Updated","location":"Nha Trang","description":"Updated demo villa.","pricePerNight":1700000,"capacity":4}
'@

$body | curl.exe.exe -u admin@vstay.local:admin123 -X PUT http://localhost:8080/api/admin/villas/4 `
  -H "Content-Type: application/json" `
  --data-binary '@-'
```

Delete or deactivate a villa with no active bookings:

```powershell
curl.exe -u admin@vstay.local:admin123 -X DELETE http://localhost:8080/api/admin/villas/4
```

List all bookings:

```powershell
curl.exe -u admin@vstay.local:admin123 http://localhost:8080/api/admin/bookings
```

View booking details:

```powershell
curl.exe -u admin@vstay.local:admin123 http://localhost:8080/api/admin/bookings/1
```

Update booking status:

```powershell
$body = @'
{"status":"COMPLETED"}
'@

$body | curl.exe.exe -u admin@vstay.local:admin123 -X PATCH http://localhost:8080/api/admin/bookings/1/status `
  -H "Content-Type: application/json" `
  --data-binary '@-'
```

## Requirement Coverage

| Area | Covered Requirements |
| --- | --- |
| Villa browsing, search, filter, details | FR-01, FR-02, FR-03, FR-04 |
| Booking creation, validation, conflicts, details, cancellation | FR-05, FR-06, FR-07, FR-08, FR-09 |
| Payment submission and payment status | FR-10, FR-11, FR-12 |
| Admin villa management | FR-13, FR-14, FR-15, FR-16 |
| Admin booking management | FR-17, FR-18, FR-19, FR-20 |

## Design Pattern Coverage

The implementation follows the documented layered architecture:

- Controllers handle HTTP requests.
- Services contain business rules and workflow logic.
- Repositories encapsulate database access.
- DTOs and mappers separate API data from JPA entities.
- Payment uses `PaymentStrategy`, `MomoPaymentStrategy`, `VNPayPaymentStrategy`, and `PaymentStrategyFactory`.
- Security configuration protects admin-only actions while allowing public villa browsing.
