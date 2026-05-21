# VStay: A Villa Booking System for a Software Design Assignment

## 1. Repository Overview

This repository contains the software design documentation and implementation prototype for VStay, a simple villa booking system. The project was created for a university-level Software Design (SWD) assignment to demonstrate core software engineering principles, including requirements analysis, system design, and implementation.

The primary purpose of this repository is to:

1.  **Store software engineering documents:** Centralize all design artifacts, including requirements specifications and UML diagrams.
2.  **Demonstrate the software design process:** Document the journey from requirements to a functional prototype.
3.  **Provide an implementation prototype:** Offer a lightweight, demonstrable version of the system's core features.

This project is an academic exercise and is **not** intended to be a production-ready commercial system.

## 2. Project Scope and Context

VStay is a web-based platform that allows guests to find and book villas, while providing administrators with tools to manage villa listings and bookings. The system's scope is intentionally limited to the essential features required to fulfill the assignment's objectives, focusing on clear and organized booking management.

### System Features

*   **Guest Functions:**
    *   View, search, and filter villas.
    *   View detailed information for each villa.
    *   Create, view, and cancel bookings.
    *   Make payments and view payment status.
*   **Admin Functions:**
    *   Manage villa records (Create, Read, Update, Delete).
    *   View all system bookings and update their status.

### Actors

| User Type | Description |
|-----------|--------------------------------------------------------------------------------------------------------------------|
| **Guest** | A person who wants to browse villas, make a booking, cancel a booking, and view booking or payment information.      |
| **Admin** | A system user responsible for managing villa records and booking status.                                            |

## 3. Software Design Artifacts

This repository includes key software design artifacts that illustrate the system's architecture and behavior. The following UML diagrams are planned as part of the design documentation:

*   **Use Case Diagram:** To visualize the interactions between actors (Guests, Admins) and the system.
*   **Sequence Diagrams:** To model the logic for key scenarios like creating a booking or managing a villa.
*   **Package Diagram:** To show the organization of the system into logical groups.
*   **Class Diagram:** To describe the structure of the system by showing its classes, attributes, operations, and relationships.

These artifacts are located in the `docs/` directory.

## 4. Repository Structure

The repository is organized to separate documentation from the implementation codebase.

```
.
├── README.md
├── backend/              # Spring Boot implementation prototype
│   ├── src/
│   └── pom.xml
├── docs/                 # Software design and requirements documents
│   ├── diagrams/         # UML diagrams and other visual artifacts
│   └── ...
└── report/               # Final assignment report materials
```

## 5. Technology Stack

The implementation prototype is built with a lightweight and modern technology stack suitable for demonstration.

*   **Backend:** Java 17, Spring Boot 3
*   **Database:** H2 InMemory Database
*   **Build Tool:** Apache Maven

## 6. Setup and Usage

The following instructions are for setting up and running the backend prototype.

**Prerequisites:**
*   Java JDK 17 or later
*   Apache Maven 3.8 or later

**Running the application:**

1.  Navigate to the `backend` directory:
    ```sh
    cd backend
    ```
2.  Build the project using Maven:
    ```sh
    mvn clean install
    ```
3.  Run the Spring Boot application:
    ```sh
    mvn spring-boot:run
    ```
The application will be accessible at `http://localhost:8080`.

## 7. Project Status & Roadmap

This project is currently in the **design and development phase**. The focus is on completing the required documentation and implementing the core features for the prototype.

*   [x] **Phase 1: Requirements & Analysis**
    *   [x] Define project scope and objectives.
    *   [x] Create functional and non-functional requirements.
    *   [x] Develop use case list and business rules.
*   [ ] **Phase 2: System Design**
    *   [ ] Create Use Case Diagram.
    *   [ ] Create Sequence, Package, and Class Diagrams.
    *   [ ] Finalize database schema.
*   [ ] **Phase 3: Implementation & Demonstration**
    *   [ ] Implement core backend features for Guest and Admin.
    *   [ ] Prepare demonstration materials.
*   [ ] **Phase 4: Final Report**
    *   [ ] Compile all documentation into the final assignment report.
