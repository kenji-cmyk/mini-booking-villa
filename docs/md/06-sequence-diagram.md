# 06 - Sequence Diagram Description

## Purpose

This document describes the sequence diagrams of the VStay Villa Booking System.

Instead of using one large sequence diagram, the system behavior is separated into smaller diagrams. Each diagram focuses on one main action or workflow from the use case diagram.

This keeps the diagrams simple, readable, and consistent with the earlier use case diagram, package diagram, and class diagram.

---

# Related Use Cases

| Diagram | Related Use Cases | PlantUML File |
|---|---|---|
| Browse and View Villas | UC-01, UC-02, UC-03 | `docs/uml/sequence-diagram-browse-villas.puml` |
| Create Booking | UC-04, UC-05 | `docs/uml/sequence-diagram-create-booking.puml` |
| Cancel Booking | UC-06 | `docs/uml/sequence-diagram-cancel-booking.puml` |
| Make Payment and View Payment Status | UC-07, UC-08 | `docs/uml/sequence-diagram-payment.puml` |
| Admin Manage Villas | UC-09, UC-10, UC-11, UC-12 | `docs/uml/sequence-diagram-admin-manage-villas.puml` |
| Admin Manage Bookings | UC-13, UC-14 | `docs/uml/sequence-diagram-admin-manage-bookings.puml` |

---

# AI Prompt Used

```text
Create simple UML sequence diagrams for a villa booking management system.

Actors:
- Guest
- Admin

Separate the sequence diagrams by action:
- Guest browses, searches, and views villas
- Guest creates a booking
- Guest cancels a booking
- Guest makes a payment and views payment status
- Admin manages villas
- Admin views bookings and updates booking status

Keep each diagram high-level and business-focused.
Do not include technical implementation layers.
Generate the diagrams using PlantUML.
```

---

# AI Generated UML Code

## Browse and View Villas

```plantuml
@startuml
skinparam shadowing false
skinparam sequenceMessageAlign center
skinparam responseMessageBelowArrow true

actor Guest
participant "VStay System" as System
database "Stored Data" as Data

Guest -> System: Request villa list or search result
System -> Data: Load matching villas
Data --> System: Villa list
System --> Guest: Show villas

Guest -> System: Select villa
System -> Data: Load villa details
Data --> System: Villa details
System --> Guest: Show villa details

@enduml
```

## Create Booking

```plantuml
@startuml
skinparam shadowing false
skinparam sequenceMessageAlign center
skinparam responseMessageBelowArrow true

actor Guest
participant "VStay System" as System
database "Stored Data" as Data

Guest -> System: Submit booking information
System -> System: Validate dates, guest count, and contact information
System -> Data: Check villa availability
Data --> System: Availability result

alt Villa is not available
  System --> Guest: Show booking conflict message
else Villa is available
  System -> Data: Save booking with PENDING status
  Data --> System: Saved booking
  System --> Guest: Show booking details
end

@enduml
```

## Cancel Booking

```plantuml
@startuml
skinparam shadowing false
skinparam sequenceMessageAlign center
skinparam responseMessageBelowArrow true

actor Guest
participant "VStay System" as System
database "Stored Data" as Data

Guest -> System: Request booking cancellation
System -> Data: Load booking
Data --> System: Booking details
System -> System: Check cancellation eligibility

alt Booking can be cancelled
  System -> Data: Update booking status to CANCELLED
  Data --> System: Updated booking
  System --> Guest: Show cancelled booking
else Booking cannot be cancelled
  System --> Guest: Show validation message
end

@enduml
```

## Make Payment and View Payment Status

```plantuml
@startuml
skinparam shadowing false
skinparam sequenceMessageAlign center
skinparam responseMessageBelowArrow true

actor Guest
participant "VStay System" as System
database "Stored Data" as Data

Guest -> System: Submit payment information
System -> Data: Load booking
Data --> System: Booking details
System -> System: Process simplified payment

alt Payment is successful
  System -> Data: Save payment with SUCCESSFUL status
  System -> Data: Update booking status to CONFIRMED
  Data --> System: Updated payment and booking
  System --> Guest: Show successful payment status
else Payment fails or is pending
  System -> Data: Save payment with FAILED or PENDING status
  Data --> System: Saved payment
  System --> Guest: Show payment status
end

Guest -> System: Request payment status
System -> Data: Load payment by booking
Data --> System: Payment status
System --> Guest: Show payment status

@enduml
```

## Admin Manage Villas

```plantuml
@startuml
skinparam shadowing false
skinparam sequenceMessageAlign center
skinparam responseMessageBelowArrow true

actor Admin
participant "VStay System" as System
database "Stored Data" as Data

Admin -> System: Create or update villa information
System -> System: Validate villa information
System -> Data: Save villa information
Data --> System: Saved villa
System --> Admin: Show updated villa list

Admin -> System: Delete villa
System -> Data: Check active bookings for villa
Data --> System: Active booking result

alt Villa has active booking
  System --> Admin: Reject villa deletion
else Villa has no active booking
  System -> Data: Delete villa
  Data --> System: Villa deleted
  System --> Admin: Show updated villa list
end

@enduml
```

## Admin Manage Bookings

```plantuml
@startuml
skinparam shadowing false
skinparam sequenceMessageAlign center
skinparam responseMessageBelowArrow true

actor Admin
participant "VStay System" as System
database "Stored Data" as Data

Admin -> System: Request all bookings
System -> Data: Load bookings
Data --> System: Booking list
System --> Admin: Show booking list

Admin -> System: Update booking status
System -> System: Validate status change
System -> Data: Save updated booking status
Data --> System: Updated booking
System --> Admin: Show updated booking

@enduml
```

---

# UML Diagram Images

```text
assets/sequence-diagram-browse-villas.png
assets/sequence-diagram-create-booking.png
assets/sequence-diagram-cancel-booking.png
assets/sequence-diagram-payment.png
assets/sequence-diagram-admin-manage-villas.png
assets/sequence-diagram-admin-manage-bookings.png
```

---

# Short Explanation

The sequence diagrams are separated by action to keep each workflow clear.

The guest diagrams cover villa browsing, booking creation, booking cancellation, payment submission, and payment status viewing.

The admin diagrams cover villa management and booking status management.

Each diagram stays at the business level by showing the actor, the VStay system, and stored data. This matches the simple class diagram while still covering all use cases from UC-01 to UC-14.

---
