# 03 — Use Case Diagram Description

## Purpose

This document describes the use case diagram of the VStay Villa Booking System.
The purpose of the diagram is to identify the major actors and system interactions
before moving to class diagrams, sequence diagrams, and implementation planning.

The use case model is based on the requirements specification document.

---

# Related Requirements

- FR-01 → FR-20
- BR-01 → BR-12

---

# Primary Actors

| Actor | Description |
|---|---|
| Guest | A user who browses villas, creates bookings, cancels bookings, makes payments, and checks booking details. |
| Admin | A user who manages villas and booking status. |

---

# Major Use Cases

| Use Case ID | Use Case Name | Actor |
|---|---|---|
| UC-01 | View Villas | Guest |
| UC-02 | Search and Filter Villas | Guest |
| UC-03 | View Villa Details | Guest |
| UC-04 | Create Booking | Guest |
| UC-05 | View Booking Details | Guest |
| UC-06 | Cancel Booking | Guest |
| UC-07 | Make Payment | Guest |
| UC-08 | View Payment Status | Guest |
| UC-09 | Create Villa | Admin |
| UC-10 | Update Villa | Admin |
| UC-11 | Delete Villa | Admin |
| UC-12 | View Villa List | Admin |
| UC-13 | View All Bookings | Admin |
| UC-14 | Update Booking Status | Admin |

---

# AI Prompt Used

```text
Create a UML use case diagram for a villa booking management system.

Requirements:
- Guests can view villas, search villas, view villa details,
create bookings, cancel bookings, make payments, and view payment status.
- Admins can create, update, delete, and manage villas and bookings.

Generate a PlantUML use case diagram using Guest and Admin actors.
Keep the diagram simple and suitable for a university software engineering assignment.
```

---

# AI Generated UML Code

```plantuml
@startuml
left to right direction

actor Guest
actor Admin

rectangle "VStay Villa Booking System" {

  usecase "UC-01\nView Villas" as UC01
  usecase "UC-02\nSearch and Filter Villas" as UC02
  usecase "UC-03\nView Villa Details" as UC03

  usecase "UC-04\nCreate Booking" as UC04
  usecase "Validate Booking Information" as UC04A
  usecase "Check Villa Availability" as UC04B

  usecase "UC-05\nView Booking Details" as UC05
  usecase "UC-06\nCancel Booking" as UC06
  usecase "UC-07\nMake Payment" as UC07
  usecase "UC-08\nView Payment Status" as UC08

  usecase "UC-09\nCreate Villa" as UC09
  usecase "UC-10\nUpdate Villa" as UC10
  usecase "UC-11\nDelete Villa" as UC11
  usecase "UC-12\nView Villa List" as UC12
  usecase "UC-13\nView All Bookings" as UC13
  usecase "UC-14\nUpdate Booking Status" as UC14
}

Guest --> UC01
Guest --> UC02
Guest --> UC03
Guest --> UC04
Guest --> UC05
Guest --> UC06
Guest --> UC07
Guest --> UC08

Admin --> UC09
Admin --> UC10
Admin --> UC11
Admin --> UC12
Admin --> UC13
Admin --> UC14

UC04 ..> UC04A : <<include>>
UC04 ..> UC04B : <<include>>

@enduml
```

---

# UML Diagram Image

```text
assets/use-case-diagram.png
```

---

# Short Explanation

The use case diagram models the major interactions between system actors and the
VStay Villa Booking System.

The Guest actor focuses on villa browsing, booking management, and payment actions.

The Admin actor focuses on villa management and booking administration.

The diagram intentionally avoids advanced commercial features to remain aligned
with the project scope and university assignment constraints.

The "Create Booking" use case includes booking validation and villa availability
checking because these behaviors are mandatory parts of the booking workflow.

---

