# DESIGN.md — VStay Frontend Design System & API Integration Guide

## 1. Document Purpose

This document defines the **visual design system**, **layout rules**, **component behavior**, **API integration conventions**, and **UX motion standards** for the VStay frontend.

This file is intended to help both:
- human developers
- AI coding models

build the frontend consistently without:
- breaking the visual system
- introducing layout inconsistencies
- missing API fields
- calling wrong endpoints
- inventing unsupported UI patterns

---

## 2. Product Context

**Product name:** VStay  
**Domain:** Villa Booking Platform  
**Goal:** Provide a clean, modern, trustworthy booking experience for guests who want to browse villas, view details, create bookings, and make payments.

The frontend should feel:
- premium
- coastal
- clean
- calm
- trustworthy
- conversion-oriented

The visual style should match the approved homepage concept:
- beach / resort / luxury villa mood
- white surfaces
- teal and ocean-blue accents
- rounded cards
- soft shadows
- strong readability
- clear booking flow

---

## 3. Core Design Principles

### 3.1 Visual Principles
1. **Clarity first** — every section should be easy to scan.
2. **Trust over decoration** — UI should feel reliable, not flashy.
3. **Booking-driven layout** — important booking actions must always be obvious.
4. **Calm premium aesthetic** — use whitespace, soft contrast, and restrained color.
5. **Consistent structure** — cards, spacing, buttons, and forms should follow one system.

### 3.2 UX Principles
1. Users should understand the booking flow within seconds.
2. Primary actions must always stand out clearly.
3. Inputs must be easy to scan and validate.
4. Error states must be explicit and helpful.
5. Motion should support usability, not distract from it.

---

## 4. Brand Direction

### 4.1 Brand Personality
- Elegant
- Relaxing
- Premium
- Trustworthy
- Friendly
- Modern

### 4.2 Design Keywords
- coastal luxury
- boutique resort
- soft modern
- clean booking experience
- curated travel platform

---

## 5. Design Tokens

## 5.1 Color Palette

### Primary Colors
- **Primary / Teal 600:** `#1697A6`
- **Primary / Teal 500:** `#1FA9B8`
- **Primary / Teal 700:** `#127C8A`

### Secondary Colors
- **Ocean Blue 900:** `#123B63`
- **Ocean Blue 800:** `#1B4D7A`
- **Ocean Blue 700:** `#2A628F`

### Neutral Colors
- **White:** `#FFFFFF`
- **Neutral 50:** `#F8FAFB`
- **Neutral 100:** `#F2F5F7`
- **Neutral 200:** `#E4EAEE`
- **Neutral 300:** `#D5DDE3`
- **Neutral 400:** `#A0AEBB`
- **Neutral 500:** `#6B7A88`
- **Neutral 700:** `#3C4A57`
- **Neutral 900:** `#1F2A37`

### Accent Colors
- **Success:** `#22A06B`
- **Warning:** `#F5A524`
- **Error:** `#D64545`
- **Info:** `#2D8CFF`

### Supporting Accent
- **MoMo Accent:** `#D82D7E`
- **VNPay Accent:** `#1D7ED6`

## 5.2 Color Usage Rules

### Use Primary Teal For:
- primary buttons
- active states
- selected filters
- important highlights
- links when emphasis is needed

### Use Ocean Blue For:
- header/footer
- headings
- strong branding elements
- trust-oriented areas

### Use Neutral Colors For:
- page background
- input borders
- card separators
- body text
- subtle surfaces

### Do Not:
- use too many saturated colors
- use red for decorative purposes
- create random new accent colors
- use gradients unless explicitly approved

---

## 5.3 Typography

### Font Family
Use:
- `Inter`
- fallback: `system-ui, sans-serif`

### Font Scale
- **Display XL:** 56px / 64px / 700
- **Display L:** 48px / 56px / 700
- **Heading 1:** 40px / 48px / 700
- **Heading 2:** 32px / 40px / 700
- **Heading 3:** 24px / 32px / 700
- **Heading 4:** 20px / 28px / 600
- **Body Large:** 18px / 28px / 400
- **Body Base:** 16px / 24px / 400
- **Body Small:** 14px / 20px / 400
- **Caption:** 12px / 16px / 500
- **Button:** 14px / 20px / 600

### Typography Rules
- Headings use Ocean Blue 900 or Neutral 900.
- Body text uses Neutral 700.
- Muted text uses Neutral 500.
- Avoid long paragraphs wider than 70 characters per line.
- Use bold sparingly for emphasis only.

---

## 5.4 Spacing Scale

Use an 8px-based system:

- 4px
- 8px
- 12px
- 16px
- 20px
- 24px
- 32px
- 40px
- 48px
- 64px
- 80px
- 96px

### Spacing Rules
- Card padding: 20px or 24px
- Section vertical spacing: 64px to 96px
- Input internal padding: 12px to 16px
- Gap between cards in grids: 20px to 24px
- Gap between form fields: 16px

---

## 5.5 Border Radius

- **Small:** 8px
- **Medium:** 12px
- **Large:** 16px
- **XL:** 20px
- **Pill:** 999px

### Usage
- Inputs: 12px
- Buttons: 12px
- Cards: 16px
- Hero panel: 20px
- Chips / pills: full pill radius

---

## 5.6 Shadows

### Shadow Styles
- **Shadow 1 (subtle):** `0 2px 8px rgba(16, 24, 40, 0.06)`
- **Shadow 2 (card):** `0 8px 24px rgba(16, 24, 40, 0.08)`
- **Shadow 3 (focus panel):** `0 12px 32px rgba(16, 24, 40, 0.12)`

### Rules
- Use soft shadows only.
- Avoid overly dark or dramatic shadows.
- Hover may increase shadow slightly.

---

## 5.7 Borders

- Default border color: `#E4EAEE`
- Strong border color: `#D5DDE3`
- Focus border color: `#1697A6`
- Error border color: `#D64545`

---

## 5.8 Layout Grid

### Max Content Width
- Desktop container: `1280px`
- Wide desktop: `1360px`
- Tablet: fluid with `24px` side padding
- Mobile: fluid with `16px` side padding

### Grid Rules
- Use 12-column grid on desktop
- Use 6-column grid on tablet
- Use 4-column grid on mobile

### Section Width Behavior
- Main page content should be centered
- Avoid overly stretched content
- Cards should feel balanced and breathable

---

## 5.9 Breakpoints

- **Mobile:** `< 640px`
- **Small Tablet:** `640px - 767px`
- **Tablet:** `768px - 1023px`
- **Desktop:** `1024px - 1279px`
- **Large Desktop:** `1280px+`

---

## 6. Page Layout Rules

## 6.1 Homepage Structure

The homepage should follow this order:

1. Header / Navigation
2. Hero Section with Search Bar
3. Trust / Value Proposition Strip
4. Main Discovery Area
   - Filter Sidebar
   - Featured Villa Cards
   - Booking Summary Sidebar
5. “How It Works” Section
6. Footer

### Important Layout Intent
- Hero should immediately communicate purpose and booking action.
- Main content should balance discovery and booking conversion.
- Booking summary sidebar should feel helpful, not intrusive.

---

## 6.2 Header

### Structure
- Left: VStay logo
- Center / middle: main navigation
- Right: Sign In button

### Header Rules
- White background
- Sticky on scroll (recommended)
- Height: 72px to 80px
- Clean with minimal shadow or bottom border

### Navigation Items
- Explore Villas
- How It Works
- My Bookings

### Primary Right Action
- Sign In

---

## 6.3 Hero Section

### Left Panel
Contains:
- large headline
- supporting text
- search form

### Right Visual
- premium seaside villa image
- strong aspirational value
- not too dark
- not cluttered

### Hero Rules
- large visual impact
- search form must be immediately visible
- left content area needs strong contrast and readability
- hero must not be overloaded with too many actions

---

## 6.4 Search Form

### Fields
- Location
- Check-in
- Check-out
- Guests
- Search Villas button

### Rules
- Large horizontal form on desktop
- Stacked layout on mobile
- Inputs must clearly show labels
- Date inputs must be explicit
- CTA button must be visually strongest

---

## 6.5 Value Proposition Strip

Should contain 4 trust points:
- Verified villas
- Transparent pricing
- Secure payment
- Fast booking

### Rules
- Use icons in circular subtle backgrounds
- Keep text short
- Horizontal layout on desktop
- 2-column or stacked layout on smaller screens

---

## 6.6 Featured Villas Section

### Card Content
Each villa card should include:
- image
- title
- location
- rating
- guest/bed/bath meta
- amenity icons
- nightly price
- View Details button
- optional favorite / wishlist icon

### Rules
- Cards should be consistent height
- Images must be attractive and well-cropped
- Price and CTA should be easy to find
- Metadata should not feel crowded

---

## 6.7 Filter Sidebar

### Typical Filters
- Price range
- Guests
- Beach access
- Private pool
- Available now

### Rules
- Use clear section labels
- Provide “Clear all”
- Keep filter UI compact and readable
- On mobile, filters should open inside a drawer or modal

---

## 6.8 Booking Summary Sidebar

### Content
- Selected villa preview
- check-in / check-out
- guest summary
- pricing breakdown
- total
- payment method
- booking CTA

### Rules
- Should remain visible on desktop while browsing
- Can become a sticky card
- Total price must be highly visible
- Payment method options should be visually clear

---

## 6.9 How It Works Section

### Steps
1. Search
2. Book
3. Pay

### Rules
- Use icons
- Keep microcopy brief
- Visually simple and instructional
- Good section for trust and onboarding

---

## 6.10 Footer

### Content Groups
- brand / short description
- explore links
- company links
- support links
- newsletter subscription

### Rules
- Dark ocean-blue background
- White / muted text
- clear column alignment
- strong but not oversized spacing

---

## 7. Component System

## 7.1 Buttons

### Variants
1. **Primary**
   - teal background
   - white text
2. **Secondary**
   - white background
   - teal border
   - teal text
3. **Ghost**
   - transparent
   - minimal emphasis
4. **Danger**
   - red background
   - white text

### Sizes
- Small: 36px height
- Medium: 44px height
- Large: 52px height

### Button States
- default
- hover
- active
- disabled
- loading

### Rules
- Primary button reserved for main CTA
- Do not use too many primary buttons in the same viewport

---

## 7.2 Inputs

### Input Types
- text
- select
- date
- number
- phone
- search
- textarea

### Input Rules
- Every input must have:
  - label
  - placeholder if needed
  - validation state
  - helper or error text if relevant

### Input States
- default
- hover
- focus
- error
- disabled
- filled

---

## 7.3 Cards

### Card Types
- villa card
- booking summary card
- trust info card
- admin stat card
- modal card

### Rules
- Rounded corners
- Soft shadow
- Strong content hierarchy
- Consistent internal padding

---

## 7.4 Chips / Pills

Used for:
- booking status
- payment status
- filter tags
- labels

### Status Colors
- PENDING: warning
- CONFIRMED: success
- CANCELLED: error
- COMPLETED: info or neutral-dark

### Payment Status Colors
- PENDING: warning
- SUCCESSFUL: success
- FAILED: error

---

## 7.5 Icons

### Style
- simple line icons
- clean and lightweight
- consistent stroke width

### Recommended Uses
- location
- guests
- bed
- bath
- wifi
- beach
- pool
- secure payment
- booking steps

---

## 8. Responsive Design Rules

## 8.1 Desktop
- 3-column main body is acceptable
- sticky booking summary can be used
- search form horizontal

## 8.2 Tablet
- reduce to 2-column or stacked sections
- booking summary may move below featured villas
- filters may collapse

## 8.3 Mobile
- single column
- hero becomes stacked
- search form vertical
- filters inside modal or drawer
- booking summary below selected villa details
- footer collapses into stacked sections

### Mobile Priorities
1. Search quickly
2. Browse cards
3. View villa detail
4. Complete booking
5. Make payment

---

## 9. UX Writing Rules

### Tone
- concise
- helpful
- calm
- trustworthy

### Good Examples
- “Search Villas”
- “View Details”
- “Your Stay”
- “Secure checkout”
- “Payment successful”

### Avoid
- vague labels
- slang
- overly technical user-facing text
- long button texts

---

## 10. API Integration Standards

This section is critical.  
The frontend must follow strict API conventions to avoid:
- wrong endpoints
- field mismatch
- missing payload fields
- inconsistent naming
- avoidable bugs

---

## 10.1 API Base Rules

### Base URL
Use environment variables:

- `VITE_API_BASE_URL` for Vite
- or `NEXT_PUBLIC_API_BASE_URL` for Next.js

Example:
- local: `http://localhost:8080`
- production: `https://your-api-domain.com`

### API Prefix
All application endpoints should be called using:
- `/api/...`

Do not hardcode hostnames inside components.

---

## 10.2 HTTP Client Rules

Create one shared API client module.

### Required Features
- base URL
- JSON headers
- auth token injection
- response parsing
- centralized error handling
- timeout handling
- optional retry for safe GET requests

### Do Not
- call fetch/axios directly from random UI components
- duplicate endpoint strings everywhere
- manually attach auth headers in many places

---

## 10.3 Naming Rules

### Frontend Field Naming
Use **camelCase** consistently.

Examples:
- `checkInDate`
- `checkOutDate`
- `numberOfGuests`
- `contactName`
- `contactPhone`
- `paymentStatus`

### Date Format
Use ISO-like date strings for API payloads when sending booking dates:
- `YYYY-MM-DD`

Example:
- `2026-06-15`

### Currency
Backend stores or returns VND values as numbers.
Frontend should:
- keep raw value as number
- format for display only in UI

Do not send formatted currency strings like:
- `₫4,200,000`

Send:
- `4200000`

---

## 10.4 Authentication Rules

### Public Endpoints
Examples:
- view villas
- search villas
- view villa details

### Protected Endpoints
Examples:
- create booking
- view booking details
- cancel booking
- make payment
- admin management

### Auth Header
When authenticated, send:

`Authorization: Bearer <token>`

If using basic login for classroom demo, adapt accordingly, but keep auth injection centralized.

---

## 10.5 Standard API Response Handling

If backend uses raw objects, frontend must map them safely.  
If possible, prefer a normalized shape.

### Recommended Response Normalization
```json
{
  "success": true,  
  "data": {},
  "message": "optional message"
}

## 10.6 Core Domain Models

The frontend must use consistent domain models when reading from or sending data to the backend.

All frontend API types should be defined centrally in:

```txt
src/api/types.ts
```

Do not redefine these types inside individual components.

---

### Villa

```ts
export type Villa = {
  id: number | string;
  name: string;
  location: string;
  description: string;
  pricePerNight: number;
  capacity: number;
  available: boolean;
  imageUrl?: string;
  rating?: number;
  numberOfBeds?: number;
  numberOfBaths?: number;
  amenities?: string[];
};
```

### Villa Field Rules

| Field           | Required | Description                        |
| --------------- | -------- | ---------------------------------- |
| `id`            | Yes      | Unique villa identifier            |
| `name`          | Yes      | Villa display name                 |
| `location`      | Yes      | Villa location                     |
| `description`   | Yes      | Short villa description            |
| `pricePerNight` | Yes      | Price per night in VND as a number |
| `capacity`      | Yes      | Maximum number of guests           |
| `available`     | Yes      | Whether the villa is available     |
| `imageUrl`      | Optional | Main villa image                   |
| `rating`        | Optional | Villa rating                       |
| `numberOfBeds`  | Optional | Number of beds                     |
| `numberOfBaths` | Optional | Number of bathrooms                |
| `amenities`     | Optional | List of amenities                  |

---

### Booking

```ts
export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED";

export type Booking = {
  id: number | string;
  villaId: number | string;
  villaName?: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  contactName: string;
  contactPhone: string;
  bookingStatus: BookingStatus;
  totalAmount?: number;
  createdAt?: string;
};
```

### Booking Field Rules

| Field            | Required | Description                       |
| ---------------- | -------- | --------------------------------- |
| `id`             | Yes      | Unique booking identifier         |
| `villaId`        | Yes      | Related villa ID                  |
| `villaName`      | Optional | Villa name for display            |
| `checkInDate`    | Yes      | Check-in date using `YYYY-MM-DD`  |
| `checkOutDate`   | Yes      | Check-out date using `YYYY-MM-DD` |
| `numberOfGuests` | Yes      | Number of guests                  |
| `contactName`    | Yes      | Guest contact name                |
| `contactPhone`   | Yes      | Guest phone number                |
| `bookingStatus`  | Yes      | Current booking status            |
| `totalAmount`    | Optional | Total booking amount              |
| `createdAt`      | Optional | Booking creation timestamp        |

---

### Payment

```ts
export type PaymentMethod = "VNPAY" | "MOMO";

export type PaymentStatus =
  | "PENDING"
  | "SUCCESSFUL"
  | "FAILED";

export type Payment = {
  id: number | string;
  bookingId: number | string;
  method: PaymentMethod;
  amount: number;
  paymentStatus: PaymentStatus;
  transactionCode?: string;
  createdAt?: string;
};
```

### Payment Field Rules

| Field             | Required | Description                              |
| ----------------- | -------- | ---------------------------------------- |
| `id`              | Yes      | Unique payment identifier                |
| `bookingId`       | Yes      | Related booking ID                       |
| `method`          | Yes      | Payment method, either `VNPAY` or `MOMO` |
| `amount`          | Yes      | Payment amount in VND as a number        |
| `paymentStatus`   | Yes      | Current payment status                   |
| `transactionCode` | Optional | External or mock transaction code        |
| `createdAt`       | Optional | Payment creation timestamp               |

---

## 10.7 Endpoint Contract Map

The frontend must not guess endpoints.

All endpoint functions must be defined centrally inside the API layer.

Recommended structure:

```txt
src/
  api/
    client.ts
    villas.ts
    bookings.ts
    payments.ts
    admin.ts
    types.ts
    mappers.ts
```

---

### Guest APIs

#### 1. Get Villa List

* **Method:** `GET`
* **Endpoint:** `/api/villas`
* **Purpose:** Load public villa list.

```ts
getVillas(): Promise<Villa[]>
```

---

#### 2. Search / Filter Villas

* **Method:** `GET`
* **Endpoint:** `/api/villas`
* **Purpose:** Search and filter villas.

Supported query params:

```ts
type VillaSearchParams = {
  keyword?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  capacity?: number;
  availableDate?: string;
};
```

Example URL:

```txt
/api/villas?keyword=ocean&minPrice=1000000&maxPrice=5000000&capacity=4
```

---

#### 3. Get Villa Detail

* **Method:** `GET`
* **Endpoint:** `/api/villas/{villaId}`
* **Purpose:** Load one villa detail.

```ts
getVillaById(villaId: number | string): Promise<Villa>
```

---

#### 4. Create Booking

* **Method:** `POST`
* **Endpoint:** `/api/bookings`
* **Purpose:** Create a new guest booking.

Request type:

```ts
export type CreateBookingRequest = {
  villaId: number | string;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  contactName: string;
  contactPhone: string;
};
```

Payload example:

```json
{
  "villaId": 1,
  "checkInDate": "2026-06-15",
  "checkOutDate": "2026-06-18",
  "numberOfGuests": 4,
  "contactName": "Nguyen Van A",
  "contactPhone": "0901234567"
}
```

---

#### 5. View Booking Details

* **Method:** `GET`
* **Endpoint:** `/api/bookings/{bookingId}`
* **Purpose:** Load one booking detail.

```ts
getBookingById(bookingId: number | string): Promise<Booking>
```

---

#### 6. Cancel Booking

* **Method:** `PUT` or `PATCH`
* **Endpoint:** `/api/bookings/{bookingId}/cancel`
* **Purpose:** Cancel an eligible booking.

```ts
cancelBooking(bookingId: number | string): Promise<Booking>
```

---

#### 7. Make Payment

* **Method:** `POST`
* **Endpoint:** `/api/payments`
* **Purpose:** Submit a payment attempt for a booking.

Request type:

```ts
export type CreatePaymentRequest = {
  bookingId: number | string;
  method: PaymentMethod;
  amount: number;
};
```

Payload example:

```json
{
  "bookingId": 101,
  "method": "VNPAY",
  "amount": 18100000
}
```

---

#### 8. View Payment Status

* **Method:** `GET`
* **Endpoint:** `/api/payments/{bookingId}/status`
* **Purpose:** View payment status for a booking.

```ts
getPaymentStatus(bookingId: number | string): Promise<Payment>
```

---

### Admin APIs

#### 9. Create Villa

* **Method:** `POST`
* **Endpoint:** `/api/admin/villas`

```ts
createVilla(payload: CreateVillaRequest): Promise<Villa>
```

---

#### 10. Update Villa

* **Method:** `PUT`
* **Endpoint:** `/api/admin/villas/{villaId}`

```ts
updateVilla(
  villaId: number | string,
  payload: UpdateVillaRequest
): Promise<Villa>
```

---

#### 11. Delete Villa

* **Method:** `DELETE`
* **Endpoint:** `/api/admin/villas/{villaId}`

```ts
deleteVilla(villaId: number | string): Promise<void>
```

---

#### 12. View All Bookings

* **Method:** `GET`
* **Endpoint:** `/api/admin/bookings`

```ts
getAllBookings(): Promise<Booking[]>
```

---

#### 13. View Booking Detail

* **Method:** `GET`
* **Endpoint:** `/api/admin/bookings/{bookingId}`

```ts
getAdminBookingById(bookingId: number | string): Promise<Booking>
```

---

#### 14. Update Booking Status

* **Method:** `PUT` or `PATCH`
* **Endpoint:** `/api/admin/bookings/{bookingId}/status`

Request type:

```ts
export type UpdateBookingStatusRequest = {
  bookingStatus: BookingStatus;
};
```

Payload example:

```json
{
  "bookingStatus": "CONFIRMED"
}
```

---

## 10.8 Field Validation Rules

### Booking Form Validation

| Field            | Rule                                  |
| ---------------- | ------------------------------------- |
| `villaId`        | Required                              |
| `checkInDate`    | Required                              |
| `checkOutDate`   | Required                              |
| `checkOutDate`   | Must be later than `checkInDate`      |
| `numberOfGuests` | Required and must be greater than `0` |
| `numberOfGuests` | Must not exceed villa capacity        |
| `contactName`    | Required                              |
| `contactPhone`   | Required                              |

---

### Payment Validation

| Field       | Rule                                   |
| ----------- | -------------------------------------- |
| `bookingId` | Required                               |
| `method`    | Required, must be `VNPAY` or `MOMO`    |
| `amount`    | Required and must be a positive number |

---

### Villa Admin Validation

| Field           | Rule                          |
| --------------- | ----------------------------- |
| `name`          | Required                      |
| `location`      | Required                      |
| `description`   | Required                      |
| `pricePerNight` | Required and must be positive |
| `capacity`      | Required and must be positive |
| `available`     | Required                      |

---

## 10.9 Frontend API Safety Rules

1. Never construct payloads directly inside JSX.
2. Always use typed request objects.
3. Always define request and response types centrally.
4. Always map API responses before UI rendering when necessary.
5. Always handle loading, error, empty, and success states.
6. Always show backend validation errors clearly in forms.
7. Never silently swallow API errors.
8. Never rename fields differently in different components.
9. Never send formatted currency strings to the backend.
10. Never hardcode API base URLs inside UI components.

---

## 10.10 Suggested Frontend API Layer

Recommended file structure:

```txt
src/
  api/
    client.ts
    villas.ts
    bookings.ts
    payments.ts
    admin.ts
    types.ts
    mappers.ts
```

### File Responsibilities

| File          | Responsibility                                             |
| ------------- | ---------------------------------------------------------- |
| `client.ts`   | Shared HTTP client, base URL, auth headers, error handling |
| `types.ts`    | Shared API and domain types                                |
| `mappers.ts`  | Backend-to-frontend response adapters                      |
| `villas.ts`   | Villa-related API functions                                |
| `bookings.ts` | Booking-related API functions                              |
| `payments.ts` | Payment-related API functions                              |
| `admin.ts`    | Admin-only API functions                                   |

---

## 11. UI State Rules

Every async page or component must support these states:

1. `loading`
2. `empty`
3. `error`
4. `success`

---

### Villa List State Requirements

The villa list page must support:

* skeleton loading cards
* “No villas found” empty state
* retry action on error
* normal villa grid on success

---

### Booking State Requirements

The booking flow must support:

* selected villa state
* date selection state
* guest count state
* pricing calculation state
* form validation state
* booking submission loading state
* booking success state
* booking failure state

---

### Payment State Requirements

The payment flow must support:

* selected payment method
* payment processing state
* payment success state
* payment failed state
* payment pending state

---

## 12. Motion & Animation Standards

Motion must feel elegant, subtle, and premium.

Animation should improve user understanding and should never distract from booking actions.

---

## 12.1 Motion Principles

1. Motion should communicate state changes.
2. Motion should improve clarity and hierarchy.
3. Motion should never delay primary actions unnecessarily.
4. Motion should feel soft and smooth, not bouncy or cartoonish.
5. Motion must respect accessibility preferences.

---

## 12.2 Motion Tokens

### Duration

| Token  | Value   | Usage                                 |
| ------ | ------- | ------------------------------------- |
| Fast   | `120ms` | Button press, quick hover             |
| Normal | `180ms` | Hover, focus, simple state transition |
| Medium | `240ms` | Modal, drawer, card entrance          |
| Slow   | `320ms` | Large panel transition                |

---

### Easing

| Token           | Value                            | Usage                     |
| --------------- | -------------------------------- | ------------------------- |
| Standard        | `ease-out`                       | Most UI transitions       |
| Smooth Entrance | `cubic-bezier(0.22, 1, 0.36, 1)` | Page and section entrance |
| Soft Exit       | `ease-in-out`                    | Modal close, drawer close |

---

## 12.3 Allowed Motion Patterns

### Hover

Use for:

* cards
* buttons
* icon buttons
* clickable villa images

Recommended effects:

```css
transform: translateY(-2px);
box-shadow: 0 8px 24px rgba(16, 24, 40, 0.08);
transition: all 180ms ease-out;
```

---

### Focus

Use for:

* inputs
* buttons
* links
* interactive controls

Recommended effects:

```css
outline: 2px solid rgba(22, 151, 166, 0.35);
outline-offset: 2px;
border-color: #1697A6;
```

---

### Page / Section Entrance

Use for:

* hero content
* villa cards
* booking summary card
* modal content

Recommended effects:

```css
opacity: 0;
transform: translateY(8px);
animation: section-enter 240ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
```

---

### Drawers / Modals

Recommended effects:

* overlay fade in
* panel slide up on mobile
* panel slide from side on desktop
* duration around `240ms`

---

### Toast / Notifications

Recommended effects:

* fade in
* slight upward motion
* auto-dismiss for non-critical messages
* persistent display for critical errors

---

## 12.4 Motion Rules By Component

### Buttons

* Hover: background darkens slightly
* Active: subtle scale down to `0.98`
* Disabled: no hover motion
* Loading: show spinner or progress indicator

---

### Cards

* Hover: soft shadow increase
* Hover: slight lift
* Mobile: avoid hover-only interactions

---

### Villa Images

* Optional subtle image zoom on hover
* Keep image zoom minimal
* Do not distort image aspect ratio

Recommended effect:

```css
transform: scale(1.03);
transition: transform 240ms ease-out;
```

---

### Filter Drawer

* Desktop modal mode: slide from side
* Mobile mode: slide from bottom
* Overlay should fade in
* Close action must be obvious

---

### Booking Summary Updates

When pricing changes:

* use soft fade transition
* optional count-up effect for total price
* avoid flashy animation
* do not delay booking action

---

## 12.5 Motion Accessibility

The frontend must respect `prefers-reduced-motion`.

If reduced motion is enabled:

* disable entrance translations
* disable image zoom effects
* disable card lift effects
* keep only simple opacity or instant state changes

Example:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 13. Accessibility Rules

1. All interactive elements must be keyboard accessible.
2. Buttons and links must have visible focus states.
3. Inputs must have labels.
4. Color alone must not communicate status.
5. Icon-only buttons must have accessible labels.
6. Text contrast must remain readable.
7. Error messages must be readable and tied to form fields.
8. Form validation messages must be shown near the related input.
9. Modal and drawer components must support keyboard escape behavior.
10. Images must use meaningful `alt` text when they carry content meaning.

---

## 14. Recommended Frontend Stack

The recommended frontend stack is:

* React
* Vite or Next.js
* Tailwind CSS
* React Router if using Vite
* TanStack Query for server state
* Axios or Fetch wrapper
* Zod for schema validation
* React Hook Form for forms
* Framer Motion only if motion complexity is needed

---

## 15. AI Implementation Rules

If an AI model uses this file, it must follow these rules:

1. Do not invent new color systems.
2. Do not change the approved homepage structure.
3. Do not rename API fields arbitrarily.
4. Do not call endpoints outside the defined API contract.
5. Do not skip loading, error, or empty states.
6. Do not add random animations.
7. Do not use inconsistent spacing or typography.
8. Do not create multiple visual styles in one app.
9. Always prioritize clarity and booking flow.
10. Always respect mobile responsiveness.
11. Always keep API calls inside the API layer.
12. Always reuse shared domain types.
13. Always keep UI components separated from API implementation details.

---

## 16. Definition of Done

A frontend screen is considered complete only if it satisfies all of the following requirements.

---

### Visual Requirements

* Follows the defined color tokens
* Follows the spacing system
* Follows typography rules
* Matches the approved VStay UI direction
* Uses consistent cards, buttons, forms, and icons

---

### UX Requirements

* Has loading state
* Has error state
* Has empty state where needed
* Has success state
* Has clear validation
* Has clear call-to-action hierarchy
* Is responsive on desktop, tablet, and mobile

---

### API Requirements

* Uses the correct endpoint
* Uses the correct HTTP method
* Sends the correct field names
* Sends all required payload fields
* Handles backend validation errors
* Handles network errors
* Does not hardcode API base URL inside components

---

### Motion Requirements

* Uses approved transitions only
* Feels subtle and polished
* Does not distract from booking actions
* Respects reduced motion accessibility

---

## 17. Final Implementation Priority

Build the frontend in this order:

1. Global layout shell
2. Header and footer
3. Hero section and search form
4. Villa card component
5. Villa list section
6. Filter sidebar
7. Booking summary card
8. Villa detail page
9. Booking form integration
10. Payment flow
11. Admin villa management
12. Admin booking management
13. Responsive behavior
14. Loading, error, and empty states
15. Motion polish
16. Final deployment configuration

---

## 18. Final Note

This document is the source of truth for:

* UI consistency
* frontend architecture intent
* API integration discipline
* UX motion behavior
* responsive behavior
* frontend implementation quality

If there is a conflict between a quick implementation shortcut and this file, follow this file.

The goal is not only to create a beautiful interface, but also to create a frontend that is consistent, maintainable, API-safe, and realistic to deploy.
