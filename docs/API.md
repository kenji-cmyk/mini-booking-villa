# VStay API Documentation

## Overview

VStay exposes a REST API for villa browsing, booking management, simplified payment, and admin management.

Base URL:

```text
http://localhost:8080
```

Swagger UI:

```text
http://localhost:8080/swagger-ui.html
```

OpenAPI JSON:

```text
http://localhost:8080/v3/api-docs
```

All responses use this envelope:

```json
{
  "success": true,
  "data": {},
  "error": null,
  "timestamp": "2026-05-25T21:30:08.2472667"
}
```

## Authentication

Villa browsing endpoints are public. Booking, payment, and admin endpoints use HTTP Basic Auth.

Demo users:

| Role | Username | Password |
| --- | --- | --- |
| Guest | `guest@vstay.local` | `guest123` |
| Admin | `admin@vstay.local` | `admin123` |

PowerShell note: for JSON requests with `curl.exe`, pipe the JSON with `--data-binary '@-'` to preserve quotes.

## Guest Villa Endpoints

### List, Search, And Filter Villas

```http
GET /api/villas
```

Query parameters:

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `keyword` | string | No | Matches villa name or location. |
| `minPrice` | decimal | No | Minimum price per night. |
| `maxPrice` | decimal | No | Maximum price per night. |
| `capacity` | integer | No | Minimum villa capacity. |
| `availableFrom` | date | No | Availability start date, `YYYY-MM-DD`. |
| `availableTo` | date | No | Availability end date, `YYYY-MM-DD`. |

Example:

```powershell
curl.exe "http://localhost:8080/api/villas?keyword=Da%20Lat&capacity=4&availableFrom=2026-08-01&availableTo=2026-08-03"
```

### View Villa Details

```http
GET /api/villas/{id}
```

Example:

```powershell
curl.exe http://localhost:8080/api/villas/1
```

## Guest Booking Endpoints

### Create Booking

```http
POST /api/bookings
Authorization: Basic guest@vstay.local:guest123
Content-Type: application/json
```

Request:

```json
{
  "villaId": 2,
  "checkInDate": "2026-08-01",
  "checkOutDate": "2026-08-03",
  "numberOfGuests": 3,
  "contactName": "Demo Guest",
  "contactPhone": "0900000001"
}
```

PowerShell example:

```powershell
$body = @'
{"villaId":2,"checkInDate":"2026-08-01","checkOutDate":"2026-08-03","numberOfGuests":3,"contactName":"Demo Guest","contactPhone":"0900000001"}
'@

$body | curl.exe -u guest@vstay.local:guest123 -X POST http://localhost:8080/api/bookings `
  -H "Content-Type: application/json" `
  --data-binary '@-'
```

Validation rules:

- `checkOutDate` must be after `checkInDate`.
- `numberOfGuests` must not exceed villa capacity.
- The selected villa must not have an overlapping active booking.

### View Booking Details

```http
GET /api/bookings/{id}
```

Example:

```powershell
curl.exe -u guest@vstay.local:guest123 http://localhost:8080/api/bookings/1
```

### Cancel Booking

```http
POST /api/bookings/{id}/cancel
```

Example:

```powershell
curl.exe -u guest@vstay.local:guest123 -X POST http://localhost:8080/api/bookings/1/cancel
```

Only `PENDING` and `CONFIRMED` bookings can be cancelled.

## Guest Payment Endpoints

### Make Payment

```http
POST /api/payments
Authorization: Basic guest@vstay.local:guest123
Content-Type: application/json
```

Request:

```json
{
  "bookingId": 2,
  "provider": "VNPAY",
  "transactionCode": "DEMO-VNPAY-002",
  "successful": true
}
```

Supported providers:

- `MOMO`
- `VNPAY`

PowerShell example:

```powershell
$body = @'
{"bookingId":2,"provider":"VNPAY","transactionCode":"DEMO-VNPAY-002","successful":true}
'@

$body | curl.exe -u guest@vstay.local:guest123 -X POST http://localhost:8080/api/payments `
  -H "Content-Type: application/json" `
  --data-binary '@-'
```

Behavior:

- Successful payment creates a `SUCCESSFUL` payment and confirms the booking.
- Failed payment creates a `FAILED` payment and leaves the booking unconfirmed.
- Only one payment can be recorded per booking.

### View Payment Status

```http
GET /api/payments/booking/{bookingId}
```

Example:

```powershell
curl.exe -u guest@vstay.local:guest123 http://localhost:8080/api/payments/booking/2
```

## Admin Villa Endpoints

Admin endpoints require:

```text
admin@vstay.local / admin123
```

### List Villas

```http
GET /api/admin/villas
```

Includes inactive villas.

### Create Villa

```http
POST /api/admin/villas
Content-Type: application/json
```

Request:

```json
{
  "name": "City View Villa",
  "location": "Nha Trang",
  "description": "Compact demo villa.",
  "pricePerNight": 1600000,
  "capacity": 3
}
```

### Update Villa

```http
PUT /api/admin/villas/{id}
Content-Type: application/json
```

Request body matches Create Villa.

### Delete Villa

```http
DELETE /api/admin/villas/{id}
```

The implementation deactivates villas using the documented `active` flag. Deletion is rejected when the villa has active bookings.

## Admin Booking Endpoints

### List All Bookings

```http
GET /api/admin/bookings
```

### View Booking Details

```http
GET /api/admin/bookings/{id}
```

### Update Booking Status

```http
PATCH /api/admin/bookings/{id}/status
Content-Type: application/json
```

Request:

```json
{
  "status": "COMPLETED"
}
```

Supported statuses:

- `PENDING`
- `CONFIRMED`
- `CANCELLED`
- `COMPLETED`

## Error Responses

Validation, conflict, not-found, and access errors return the same response envelope with `success: false`.

Example:

```json
{
  "success": false,
  "data": null,
  "error": "Villa is not available for the selected dates.",
  "timestamp": "2026-05-25T21:30:08.2472667"
}
```
