# VStay: A Villa Booking System for a Software Design Assignment

## 1. Repository Overview

This repository contains the software design documentation and backend implementation prototype for VStay, a simple villa booking system. The project was created for a university-level Software Design (SWD) assignment to demonstrate core software engineering principles, including requirements analysis, system design, implementation, and verification.

The primary purpose of this repository is to:

1.  **Store software engineering documents:** Centralize the main analysis and design artifacts, including requirements specifications and UML diagrams.
2.  **Demonstrate the software design process:** Document the journey from project scope and requirements to system structure.
3.  **Provide an implementation prototype:** Provide a Spring Boot backend that implements the documented guest and admin workflows.

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

This repository currently includes documentation artifacts for requirements analysis, initial system design, detailed UML design, database schema, design pattern documentation, API reference, and technical implementation review:

*   **Introduction:** Describes the project background, problem statement, objectives, target users, scope, out-of-scope items, and expected outcome.
*   **Requirements Specification:** Defines functional requirements, non-functional requirements, use cases, business rules, assumptions, and constraints.
*   **Use Case Diagram:** Visualizes the interactions between the Guest/Admin actors and the system.
*   **Package Diagram:** Shows the planned backend organization using a layered Spring Boot structure.
*   **Class Diagram:** Describes the core domain classes, attributes, methods, enums, and relationships.
*   **Sequence Diagrams:** Describe the main guest and admin workflows using separated, focused diagrams.
*   **Database Schema:** Defines the PostgreSQL database tables, columns, data types, constraints, and relationships.
*   **Design Patterns:** Documents the five design patterns used in the codebase with rationale, code mapping, and UML diagrams.
*   **Technical Overview:** Reviews whether the backend implementation matches the delivered use cases, class diagram, sequence diagrams, package diagram, database schema, and design patterns.
*   **API Reference:** Documents the REST endpoints, authentication, request examples, and response envelope.

The current sequence diagrams are separated into:

*   Browse and view villas.
*   Create booking.
*   Cancel booking.
*   Make payment and view payment status.
*   Admin manage villas.
*   Admin manage bookings.

The Markdown documentation is located in `docs/md/`, the technical implementation documents are located in `docs/technical/`, and the PlantUML diagram sources are located in `docs/uml/`.

## 4. Repository Structure

The repository is organized to separate documentation from the backend codebase.

```text
.
|-- README.md
|-- docker-compose.yml
|-- .github/
|   `-- workflows/       # GitHub Actions CI/CD workflows
|-- asset/
|-- backend/              # Spring Boot backend scaffold
|   |-- Dockerfile
|   |-- src/
|   |-- mvnw
|   |-- mvnw.cmd
|   `-- pom.xml
|-- docs/                 # Software design and requirements documents
|   |-- md/               # Markdown documentation
|   |-- technical/        # Implementation overview and REST API reference
|   `-- uml/              # PlantUML diagram source files
`-- report/               # Final assignment report materials
```

## 5. Technology Stack

The current backend scaffold is configured with:

*   **Backend:** Java 25, Spring Boot 4.0.6
*   **Build Tool:** Apache Maven / Maven Wrapper
*   **API Documentation:** OpenAPI JSON / Swagger UI
*   **Demo Runtime:** H2 in-memory database
*   **Containerization:** Docker Compose

The backend contains the package/class structure aligned with the package diagram and now includes the Phase 5 implementation prototype. Domain design, workflow diagrams, database schema, design pattern documentation, API endpoints, H2 demo persistence, validation, role-based security, payment strategy handling, and demonstration materials have been completed.

The implementation also enforces guest booking ownership, supports pending/successful/failed payment outcomes, and validates admin booking status transitions according to the technical overview.

## 6. Setup and Usage

The following instructions are for setting up and running the backend scaffold.

**Prerequisites:**
*   Java JDK 25 or a compatible version for the current `pom.xml`
*   Apache Maven 3.8 or later, or the included Maven Wrapper
*   Docker Desktop, if running with Docker Compose

**Running the application with Maven:**

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

**Running the application with Docker Compose:**

From the repository root:

```powershell
docker compose up --build
```

The backend will be available at:

```text
http://localhost:8080
```

**API documentation:**

| Resource | URL / Path |
| --- | --- |
| Technical Implementation Overview | `docs/technical/IMPLEMENTATION-OVERVIEW.md` |
| API Reference | `docs/technical/API.md` |
| Swagger UI | `http://localhost:8080/swagger-ui.html` |
| OpenAPI JSON | `http://localhost:8080/v3/api-docs` |

**Demo accounts:**

| Role | Username | Password |
| --- | --- | --- |
| Guest | `guest@vstay.local` | `guest123` |
| Guest | `otherguest@vstay.local` | `guest456` |
| Admin | `admin@vstay.local` | `admin123` |

Guest booking and payment endpoints are ownership-scoped. Use the admin endpoints for cross-user booking review and status updates.

## 7. CI/CD

GitHub Actions workflows are defined in `.github/workflows/`.

| Workflow | Trigger | Purpose |
| --- | --- | --- |
| `CI` | Pull requests, pushes to `main`, `master`, or `develop`, manual dispatch | Runs backend tests, packages the Spring Boot jar, validates Docker Compose, and builds the Docker image. |
| `CD` | Pushes to `main`, version tags like `v1.0.0`, manual dispatch | Builds and publishes the backend Docker image to GitHub Container Registry. |

The published image name is:

```text
ghcr.io/<owner>/<repository>/vstay-backend
```

## 8. Project Status & Roadmap

This project is currently in the **final report preparation phase**. Requirements, use case modeling, package-level backend design, class design, sequence workflow design, database schema, design pattern documentation, Phase 5 backend implementation/demo materials, API reference, implementation-alignment review, and stricter business-rule verification have been completed.

*   [x] **Phase 1: Requirements & Analysis**
    *   [x] Define project scope and objectives.
    *   [x] Create functional and non-functional requirements.
    *   [x] Develop use case list and business rules.
*   [x] **Phase 2: Initial System Design**
    *   [x] Create Use Case Diagram.
    *   [x] Create Package Diagram.
    *   [x] Create backend package/class skeleton.
*   [x] **Phase 3: Detailed Design**
    *   [x] Create Class Diagram.
    *   [x] Create Sequence Diagrams.
    *   [x] Finalize database schema.
*   [x] **Phase 4: Design Pattern Documentation**
    *   [x] Explain design patterns used in the codebase.
    *   [x] Document why each pattern is used.
    *   [x] Connect each pattern to the related package, class, and workflow.
*   [x] **Phase 5: Implementation & Demonstration**
    *   [x] Implement core backend features for Guest and Admin.
    *   [x] Prepare demonstration materials.
    *   [x] Review backend implementation against delivered use case, class, sequence, and package documentation.
    *   [x] Enforce guest booking ownership, payment pending behavior, and admin status transition rules.
*   [ ] **Phase 6: Final Report**
    *   [ ] Compile all documentation into the final assignment report.
