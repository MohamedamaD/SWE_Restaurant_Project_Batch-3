# Restaurant Reservation System - ERD

## 1. User
Represents system users (customers, admins, staff).

| Field | Type | Notes |
|-----|-----|-----|
| id | UUID (PK) | Primary key |
| name | String | |
| email | String | Unique |
| password | String | Hashed |
| phone | String | |
| role | ENUM(admin, customer, staff) | |
| isVerified | Boolean | |
| createdAt | Date | |
| updatedAt | Date | |

Relationships:
- User → Reservation (1:N)
- User → Order (1:N)
- User → Payment (1:N)

---

# 2. Restaurant

| Field | Type | Notes |
|-----|-----|-----|
| id | UUID (PK) | |
| name | String | |
| description | Text | |
| address | String | |
| phone | String | |
| image | String | Uploaded using multer |
| createdAt | Date | |

Relationships:
- Restaurant → Table (1:N)
- Restaurant → MenuCategory (1:N)

---

# 3. Table

| Field | Type | Notes |
|-----|-----|-----|
| id | UUID (PK) | |
| restaurantId | UUID (FK) | |
| tableNumber | Integer | |
| capacity | Integer | |
| status | ENUM(available,reserved) | |

Relationships:
- Table → Reservation (1:N)

---

# 4. Reservation

| Field | Type | Notes |
|-----|-----|-----|
| id | UUID (PK) | |
| userId | UUID (FK) | |
| tableId | UUID (FK) | |
| reservationDate | Date | |
| startTime | Time | |
| endTime | Time | |
| guestsCount | Integer | |
| status | ENUM(pending,confirmed,cancelled,completed) | |
| createdAt | Date | |

---

# 5. MenuCategory

| Field | Type | Notes |
|-----|-----|-----|
| id | UUID (PK) | |
| restaurantId | UUID (FK) | |
| name | String | |

Relationships:
- MenuCategory → MenuItem (1:N)

---

# 6. MenuItem

| Field | Type | Notes |
|-----|-----|-----|
| id | UUID (PK) | |
| categoryId | UUID (FK) | |
| name | String | |
| description | Text | |
| price | Decimal | |
| image | String | Uploaded via multer |
| available | Boolean | |

Relationships:
- MenuItem → OrderItem (1:N)

---

# 7. Order

| Field | Type | Notes |
|-----|-----|-----|
| id | UUID (PK) | |
| userId | UUID (FK) | |
| reservationId | UUID (FK) | Optional |
| totalPrice | Decimal | |
| status | ENUM(pending,preparing,served,completed,cancelled) | |
| createdAt | Date | |

Relationships:
- Order → OrderItem (1:N)
- Order → Payment (1:1)

---

# 8. OrderItem

| Field | Type | Notes |
|-----|-----|-----|
| id | UUID (PK) | |
| orderId | UUID (FK) | |
| menuItemId | UUID (FK) | |
| quantity | Integer | |
| price | Decimal | |

---

# 9. Payment (Stripe)

| Field | Type | Notes |
|-----|-----|-----|
| id | UUID (PK) | |
| orderId | UUID (FK) | |
| userId | UUID (FK) | |
| stripePaymentIntentId | String | Stripe payment ID |
| amount | Decimal | |
| currency | String | eg: USD |
| paymentMethod | ENUM(card,apple_pay,google_pay) | |
| status | ENUM(pending,succeeded,failed,refunded) | |
| paidAt | Date | |

Relationships:
- Payment → Order (1:1)
- Payment → User (N:1)

---

# 10. Refund (Optional)

| Field | Type | Notes |
|-----|-----|-----|
| id | UUID (PK) | |
| paymentId | UUID (FK) | |
| stripeRefundId | String | Stripe refund ID |
| amount | Decimal | |
| reason | String | |
| createdAt | Date | |

Relationships:
- Refund → Payment (N:1)

---

# 11. Notification

| Field | Type | Notes |
|-----|-----|-----|
| id | UUID (PK) | |
| userId | UUID (FK) | |
| type | ENUM(email,system) | |
| title | String | |
| message | Text | |
| isRead | Boolean | |
| createdAt | Date | |

---

# Relationships Overview

User
 ├── Reservations
 ├── Orders
 ├── Payments
 └── Notifications

Restaurant
 ├── Tables
 └── MenuCategories

MenuCategory
 └── MenuItems

Order
 ├── OrderItems
 └── Payment

Payment
 └── Refunds
