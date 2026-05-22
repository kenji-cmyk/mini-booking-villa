# VStay: A Villa Booking System for a Software Design Assignment

## 1. Repository Overview

This repository contains the software design documentation and backend scaffold for VStay, a simple villa booking system. The project was created for a university-level Software Design (SWD) assignment to demonstrate core software engineering principles, including requirements analysis, system design, and implementation planning.

The primary purpose of this repository is to:

1.  **Store software engineering documents:** Centralize the main analysis and design artifacts, including requirements specifications and UML diagrams.
2.  **Demonstrate the software design process:** Document the journey from project scope and requirements to system structure.
3.  **Prepare an implementation prototype:** Provide a Spring Boot backend structure that can be extended into the system's core features.

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
| **Guest** | A person who wants to browse villas, make a booking, cancel a booking, make payment, and view booking or payment information. |
| **Admin** | A system user responsible for managing villa records and updating booking status.                                  |

## 3. Software Design Artifacts

This repository currently includes the Day 2 documentation artifacts for requirements analysis and early system design:

*   **Introduction:** Describes the project background, problem statement, objectives, target users, scope, out-of-scope items, and expected outcome.
*   **Requirements Specification:** Defines functional requirements, non-functional requirements, use cases, business rules, assumptions, and constraints.
*   **Use Case Diagram:** Visualizes the interactions between the Guest/Admin actors and the system.
*   **Package Diagram:** Shows the planned backend organization using a layered Spring Boot structure.

The Markdown documentation is located in `docs/md/`, and the PlantUML diagram sources are located in `docs/uml/`.

## 4. Repository Structure

The repository is organized to separate documentation from the backend codebase.

```text
.
|-- README.md
|-- asset/
|-- backend/              # Spring Boot backend scaffold
|   |-- src/
|   |-- mvnw
|   |-- mvnw.cmd
|   `-- pom.xml
|-- docs/                 # Software design and requirements documents
|   |-- md/               # Markdown documentation for Day 2
|   `-- uml/              # PlantUML diagram source files
`-- report/               # Final assignment report materials
```

## 5. Technology Stack

The current backend scaffold is configured with:

*   **Backend:** Java 25, Spring Boot 4.0.6
*   **Build Tool:** Apache Maven / Maven Wrapper

The backend currently contains the package/class skeleton aligned with the package diagram. API endpoints, persistence behavior, and full business logic are still planned implementation work.

## 6. Setup and Usage

The following instructions are for setting up and running the backend scaffold.

**Prerequisites:**
*   Java JDK 25 or a compatible version for the current `pom.xml`
*   Apache Maven 3.8 or later, or the included Maven Wrapper

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

On Windows, the Maven Wrapper can also be used:

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

## 7. Project Status & Roadmap

This project is currently in the **requirements and early design phase**. The Day 2 files are focused on requirements, use case modeling, and package-level backend design.

*   [x] **Phase 1: Requirements & Analysis**
    *   [x] Define project scope and objectives.
    *   [x] Create functional and non-functional requirements.
    *   [x] Develop use case list and business rules.
*   [x] **Phase 2: Initial System Design**
    *   [x] Create Use Case Diagram.
    *   [x] Create Package Diagram.
    *   [x] Create backend package/class skeleton.
*   [ ] **Phase 3: Detailed Design**
    *   [ ] Create Sequence Diagrams.
    *   [ ] Create Class Diagram.
    *   [ ] Finalize database schema.
*   [ ] **Phase 4: Implementation & Demonstration**
    *   [ ] Implement core backend features for Guest and Admin.
    *   [ ] Prepare demonstration materials.
*   [ ] **Phase 5: Final Report**
    *   [ ] Compile all documentation into the final assignment report.
