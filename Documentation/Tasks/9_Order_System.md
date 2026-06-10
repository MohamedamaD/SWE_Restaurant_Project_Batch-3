# Feature 9: Order System

## Objective
Implement ordering logic for the system. This allows customers to order items, either stand-alone (e.g., takeaway) or connected to an existing table reservation (dine-in).

## Requirements

1. **Permissions:**
   - `customer` can Create an order, view their own.
   - `staff`/`admin` can view all orders, update status (e.g., from `pending` -> `preparing` -> `served`).

2. **Endpoints:**
   - **`POST /api/orders`:**
     - Accepts: `reservation_id` (optional), and an array of `items` consisting of `{ menu_item_id, quantity }`.
     - Calculate `total_price` dynamically by querying the DB for each item's price and multiplying by its quantity.
     - Insert a record into `orders`.
     - Associate items dynamically in `order_items` (bulk create).
   - **`GET /api/orders`:** List orders (filters: `?status=pending`, `?restaurant_id={id}`).
   - **`GET /api/orders/:id`:** View order details (include `OrderItems` and details about the `MenuItem`).
   - **`PATCH /api/orders/:id/status`:** Let staff update the progress of an order. Options: `pending, preparing, served, completed, cancelled`.

3. **Constraints:**
   - Ensure quantities > 0.
   - Verify `menu_item_id` exists before adding to an order.

## Definition of Done
- A customer can submit an order containing multiple items, and the system accurately calculates the total price and stores the records.
- Staff can fetch the order and update its status.
