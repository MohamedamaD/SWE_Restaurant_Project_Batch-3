# Feature 7: Table Management

## Objective
Allow staff to manage the physical tables available in a restaurant to prepare the system for reservations.

## Requirements

1. **Permissions:**
   - `admin` or `staff` can Add, Update, and Remove tables.
   - `staff` and `customer` can view table availability.

2. **Endpoints:**
   - `POST /api/tables`: Add a new table. Requires (`restaurant_id`, `table_number`, `capacity`).
   - `GET /api/tables?restaurant_id={id}`: Retrieve all tables for a given restaurant.
   - `PUT /api/tables/:id`: Update table details (`table_number`, `capacity`).
   - `PATCH /api/tables/:id/status`: Update the table status between `available` and `reserved` manually (if needed for walk-ins).
   - `DELETE /api/tables/:id`: Remove a table.

3. **Validation logic:**
   - Ensure `table_number` is unique *within* the same `restaurant_id` (a restaurant can't have two "Table 1"s).
   - Capacity must be > 0.

## Definition of Done
- Tables can be created, updated, and fetched accurately.
- Table uniqueness constraint per restaurant is enforced.
