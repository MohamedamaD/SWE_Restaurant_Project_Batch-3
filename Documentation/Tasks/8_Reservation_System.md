# Feature 8: Reservation System

## Objective
Build the core engine for booking tables. This is a complex feature that requires checking for overlapping times and validating table capacities.

## Requirements

1. **Validation & Conflict Checking (The Hard Part):**
   - When a `customer` requests a `POST /api/reservations`:
   - Retrieve the target `table_id`.
   - Check if `guests_count` <= `table.capacity`. Throw an error if the table is too small.
   - Query existing reservations for that `table_id` on the requested `reservation_date`.
   - Ensure the new `start_time` and `end_time` *do not overlap* with any existing `confirmed` or `pending` reservation.
     - Overlap condition: `(new_start < existing_end) AND (new_end > existing_start)`.

2. **Endpoints:**
   - `POST /api/reservations`: Create a new reservation. Defaults to status `pending`. Requires (`table_id`, `reservation_date`, `start_time`, `end_time`, `guests_count`). Uses `req.user.id` from JWT.
   - `GET /api/reservations`:
     - If `customer`: See only their own reservations.
     - If `staff`/`admin`: See all reservations. Support filtering by `?date=YYYY-MM-DD` or `?restaurant_id=UUID`.
   - `PUT /api/reservations/:id`: Reschedule a reservation (must re-run conflict checks).
   - `PATCH /api/reservations/:id/status`: Update status (`confirmed`, `cancelled`, `completed`).
     - `customer` can only change to `cancelled`.
     - `staff` can change to any status.
   - `DELETE /api/reservations/:id`: (Optional) Permanent deletion by admin.

## Definition of Done
- A customer can successfully book an available table.
- The system rejects bookings that exceed table capacity.
- The system correctly identifies and rejects overlapping time slots for the same table on the same date.
- Both customers and staff can view reservations according to their roles.
