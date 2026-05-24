# 08 — Design Pattern Description

## Purpose

This document explains the design patterns applied in the VStay Villa Booking System backend. It provides a clear mapping of each pattern to its location in the codebase and the rationale behind its usage, supporting maintainability and scalability (NFR-09).

---

## 1. Layered Architecture (Architectural Pattern)

*   **Where Applied:**
    *   Overall backend source code (`com.kna.vstay`).
    *   Organized into 4 standard packages:
        *   `controller` (Presentation Layer): Handles API endpoints.
        *   `service` / `payment` (Business Logic Layer): Handles domain validation, rules, and workflows.
        *   `repository` (Data Access Layer): Handles database querying and persistence.
        *   `entity` / `enums` (Domain Layer): Holds data representations and business state.
*   **Why:**
    *   Enforces a strict separation of concerns, ensuring each layer only depends on the layer directly below it.
    *   Implements **NFR-09** (separation of guest, admin, booking, and payment logic).
    *   Allows database technology changes or API route updates without affecting core business logic.

---

## 2. Strategy Pattern (Behavioral Pattern)

*   **Where Applied:**
    *   `payment` package.
    *   **Interface:** `PaymentStrategy`
    *   **Implementations:** `MomoPaymentStrategy` (handles Momo Pay) and `VNPayPaymentStrategy` (handles VNPay).
    *   **Context:** `PaymentService` in `service` package uses the strategy dynamically.
*   **Why:**
    *   Encapsulates payment processing algorithms for different payment providers.
    *   Enables adding new payment providers (e.g., ZaloPay, Paypal) by simply creating a new class implementing `PaymentStrategy` without modifying the core `PaymentService` (**Open/Closed Principle**).

---

## 3. Factory Pattern (Creational Pattern)

*   **Where Applied:**
    *   `payment` package.
    *   **Factory class:** `PaymentStrategyFactory`
    *   Instantiates the correct concrete `PaymentStrategy` (e.g., Momo vs. VNPay) based on a provider string parameter (e.g., `"MOMO"` or `"VNPAY"`).
*   **Why:**
    *   Encapsulates the instantiation logic of payment strategies.
    *   Decouples the client class (`PaymentService`) from concrete strategy classes, ensuring `PaymentService` only communicates via the high-level `PaymentStrategy` interface.

---

## 4. Repository Pattern (Data Access Pattern)

*   **Where Applied:**
    *   `repository` package.
    *   **Interfaces:** `VillaRepository`, `BookingRepository`, `PaymentRepository`, `UserRepository`.
    *   Extends Spring Data JPA interfaces to interact with the PostgreSQL database.
*   **Why:**
    *   Provides a clean, collection-like interface for accessing database entities, completely hiding underlying SQL query creation and connection management.
    *   Allows service classes to remain database-agnostic and makes unit testing easier by enabling simple mocking of repository interfaces.

---

## 5. DTO & Mapper Pattern (Structural Pattern)

*   **Where Applied:**
    *   `dto` and `mapper` packages.
    *   **DTOs:** `VillaResponse`, `BookingRequest`, `BookingResponse`, `PaymentRequest`, `PaymentResponse`, `CreateVillaRequest`, `UpdateVillaRequest`.
    *   **Mappers:** `VillaMapper`, `BookingMapper`, `PaymentMapper`.
*   **Why:**
    *   Prevents exposing database entities (`Villa`, `Booking`, `Payment`) directly through the HTTP endpoints, safeguarding sensitive data.
    *   Mappers centralize data conversion between entities and DTOs, keeping controllers and services thin, clean, and highly readable.

---

## Short Explanation

The VStay backend implements these five patterns to ensure high maintainability, loose coupling, and clean structure. The **Layered Architecture** sets the overall skeleton; the **Strategy** and **Factory** patterns organize flexible payment integration; the **Repository** pattern isolates database logic; and the **DTO/Mapper** patterns protect system borders and domain integrity.
