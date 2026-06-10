# Feature 2: Database Models & Migrations

## Objective
Define the data structures for the application using Sequelize Models and set up associations between them.

## Requirements

1. **Model Creation:**
   - Create the following Sequelize models based on the schema:
     - `User` (id, name, email, password, role, is_verified, timestamps).
     - `Restaurant` (id, name, description, address, phone, image).
     - `Table` (id, restaurant_id, table_number, capacity, status).
     - `Reservation` (id, user_id, table_id, reservation_date, start_time, end_time, guests_count, status).
     - `MenuCategory` (id, restaurant_id, name).
     - `MenuItem` (id, category_id, name, description, price, image, available).
     - `Order` (id, user_id, reservation_id, total_price, status).
     - `OrderItem` (id, order_id, menu_item_id, quantity, price).
     - `Payment` (id, order_id, user_id, amount, status, etc.).
     - `Notification` (id, user_id, type, title, message, is_read).

2. **Associations:**
   - Define all relationships inside `models/index.js` (or within the models themselves).
   - Examples:
     - A Restaurant has many Tables, Categories.
     - A User has many Reservations, Orders, Payments, Notifications.
     - An Order has many OrderItems.
     - An OrderItem belongs to an Order and a MenuItem.

3. **Migrations (Optional but Recommended):**
   - Alternatively, use Sequelize CLI to generate migrations for these tables to maintain a track record of schema changes.

## Definition of Done
- All 10 models are defined without syntax errors.
- Running `sequelize.sync({ alter: true })` successfully creates/updates the tables in the MySQL database in the correct order (handling foreign keys properly).
