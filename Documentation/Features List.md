# Restaurant Reservation System - Features List

This document outlines the core features that students need to implement for the backend of the Restaurant Reservation System. Each feature has a dedicated task file in the `Tasks/` directory with detailed requirements.

## Phase 1: Core Architecture & Setup
1. **[Feature 1]: Project Setup & Configuration**
   - Initialize project structure, database connection, and environment variables.

2. **[Feature 2]: Database Models & Migrations (Sequelize)**
   - Create Sequelize models based on the provided ERD and raw SQL schema.

## Phase 2: Authentication & User Management
3. **[Feature 3]: User Authentication (Register/Login)**
   - Implement JWT-based authentication and password hashing.

4. **[Feature 4]: User Profile Management & Roles**
   - Implement role-based access control (Admin, Customer, Staff) and profile updates.

## Phase 3: Restaurant & Menu Management
5. **[Feature 5]: Restaurant Management**
   - CRUD operations for restaurants (Admin only). Image upload integration.

6. **[Feature 6]: Menu Categories & Items**
   - Manage menu categories and items linked to specific restaurants.

## Phase 4: Core Business Logic (Reservations & Orders)
7. **[Feature 7]: Table Management**
   - Manage restaurant tables and their capacities/statuses.

8. **[Feature 8]: Reservation System**
   - Implement the complex logic for booking tables, checking availability, and preventing double bookings.

9. **[Feature 9]: Order System (Kitchen/Dine-in)**
   - Create orders linked to reservations or standalone, with multiple order items.

## Phase 5: Payments, Notifications & Real-time
10. **[Feature 10]: Payment Integration (Stripe)**
    - Process payments for orders, handle webhooks for payment status updates.

11. **[Feature 11]: Real-time Notifications (Socket.io)**
    - Implement real-time updates for kitchen staff (new orders) and users (order/reservation status).

12. **[Feature 12]: Email Notifications (Nodemailer)**
    - Send welcome emails, reservation confirmations, and payment receipts.
