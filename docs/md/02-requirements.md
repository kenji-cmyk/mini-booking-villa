# 02 - VStay Requirements Specification

## Actors

| Actor | Description |
| --- | --- |
| Guest | A user who browses villas, creates bookings, cancels bookings, makes payments, and checks booking or payment details. |
| Admin | A user who manages villa information and updates booking status. |

## Functional Requirements

### Guest Requirements

| ID | Requirement |
| --- | --- |
| FR-01 | The system shall allow guests to view a list of villas. |
| FR-02 | The system shall allow guests to search villas by keyword, such as villa name or location. |
| FR-03 | The system shall allow guests to filter villas by basic criteria, such as price range, capacity, and availability date. |
| FR-04 | The system shall allow guests to view villa details, including name, location, description, price, capacity, and availability information. |
| FR-05 | The system shall allow guests to create a booking by selecting a villa, check-in date, check-out date, number of guests, and contact information. |
| FR-06 | The system shall validate booking information before saving a booking. |
| FR-07 | The system shall prevent a guest from creating a booking when the selected villa is not available for the selected dates. |
| FR-08 | The system shall allow guests to view the details of their booking. |
| FR-09 | The system shall allow guests to cancel a booking if the booking is still eligible for cancellation. |
| FR-10 | The system shall allow guests to make a payment for a booking. |
| FR-11 | The system shall record payment information after a payment attempt is submitted. |
| FR-12 | The system shall allow guests to view payment status for a booking. |

### Admin Requirements

| ID | Requirement |
| --- | --- |
| FR-13 | The system shall allow admins to create a new villa record. |
| FR-14 | The system shall allow admins to update an existing villa record. |
| FR-15 | The system shall allow admins to delete a villa record if it is not linked to an active booking. |
| FR-16 | The system shall allow admins to view the full list of villas. |
| FR-17 | The system shall allow admins to view all bookings in the system. |
| FR-18 | The system shall allow admins to view booking details. |
| FR-19 | The system shall allow admins to update booking status. |
| FR-20 | The system shall keep booking status consistent with payment and cancellation actions. |

## Non-Functional Requirements

| ID | Category | Requirement |
| --- | --- | --- |
| NFR-01 | Performance | The system should load villa lists and booking details within 3 seconds under normal classroom testing conditions. |
| NFR-02 | Performance | The system should process search and filter requests within 3 seconds for the expected assignment dataset. |
| NFR-03 | Security | The system shall restrict admin functions so that only authorized admin users can create, update, or delete villas and update booking status. |
| NFR-04 | Security | The system shall not display sensitive payment information in full after payment submission. |
| NFR-05 | Usability | The system should provide clear navigation for guest booking actions and admin management actions. |
| NFR-06 | Usability | The system should display clear validation messages when required fields are missing or invalid. |
| NFR-07 | Reliability | The system shall not create duplicate bookings for the same villa and overlapping date range. |
| NFR-08 | Reliability | The system should preserve booking and payment records after normal page refresh or user navigation. |
| NFR-09 | Maintainability | The system should separate guest functions, admin functions, booking logic, and payment logic clearly enough for future maintenance. |
| NFR-10 | Maintainability | Requirement IDs and related use cases should remain consistent across project documentation. |
| NFR-11 | Data Validation | The system shall validate required fields for villa records, booking records, and payment records. |
| NFR-12 | Data Validation | The system shall reject booking dates where the check-out date is earlier than or equal to the check-in date. |

## Use Case List

| Use Case ID | Use Case Name | Primary Actor | Related Requirements |
| --- | --- | --- | --- |
| UC-01 | View Villas | Guest | FR-01 |
| UC-02 | Search and Filter Villas | Guest | FR-02, FR-03 |
| UC-03 | View Villa Details | Guest | FR-04 |
| UC-04 | Create Booking | Guest | FR-05, FR-06, FR-07 |
| UC-05 | View Booking Details | Guest | FR-08 |
| UC-06 | Cancel Booking | Guest | FR-09 |
| UC-07 | Make Payment | Guest | FR-10, FR-11 |
| UC-08 | View Payment Status | Guest | FR-12 |
| UC-09 | Create Villa | Admin | FR-13 |
| UC-10 | Update Villa | Admin | FR-14 |
| UC-11 | Delete Villa | Admin | FR-15 |
| UC-12 | View Villa List | Admin | FR-16 |
| UC-13 | View All Bookings | Admin | FR-17, FR-18 |
| UC-14 | Update Booking Status | Admin | FR-19, FR-20 |

## Basic Business Rules

| Rule ID | Business Rule |
| --- | --- |
| BR-01 | A villa can only be booked if it is available for the selected check-in and check-out dates. |
| BR-02 | The check-out date must be later than the check-in date. |
| BR-03 | The number of guests in a booking must not exceed the villa capacity. |
| BR-04 | A booking starts with a pending status after it is created. |
| BR-05 | A booking can be marked as confirmed after valid payment information is recorded. |
| BR-06 | A cancelled booking must not be treated as an active booking for availability checking. |
| BR-07 | A villa with an active booking cannot be deleted by an admin. |
| BR-08 | Payment status must be linked to one booking only. |
| BR-09 | Admins are responsible for updating booking status when manual review is required. |
| BR-10 | Required guest contact information must be provided before a booking can be created. |
| BR-11 |  A payment may have pending, successful, or failed status.\
| BR-12 | Booking status may include pending, confirmed, cancelled, and completed.

## Assumptions

- Guests can use the system without advanced account management features.
- Admin users are created or prepared before the system is used.
- The payment function is simplified for the assignment and does not require full integration with real banking services.
- Villa data, booking data, and payment data are stored in a system database or equivalent persistent storage.
- The expected number of users and records is small and suitable for classroom demonstration.
- The system is designed primarily for web access through a standard browser.

## Constraints

- The project scope is limited to the core guest and admin features listed in this document.
- The system must remain realistic for a university software engineering assignment.
- The project must avoid advanced commercial features such as AI recommendation, loyalty programs, chat systems, complex revenue management, multi-vendor marketplace support, and mobile app development.
- The documentation must use consistent requirement IDs and clear wording so it can be included in a final PDF report.
- The booking workflow must remain simple enough to analyze with standard use case and requirements techniques.
- Payment handling must stay within a simplified educational scope and should not store full sensitive card details.
