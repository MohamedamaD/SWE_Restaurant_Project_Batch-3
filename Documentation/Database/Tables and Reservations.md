# Tables and Reservations Schema

```sql
CREATE TABLE tables (
    id UUID PRIMARY KEY,
    restaurant_id UUID NOT NULL,
    table_number INT NOT NULL,
    capacity INT NOT NULL,
    status ENUM('available','reserved') DEFAULT 'available',

    CONSTRAINT fk_table_restaurant
    FOREIGN KEY (restaurant_id)
    REFERENCES restaurants(id)
    ON DELETE CASCADE
);

CREATE TABLE reservations (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    table_id UUID NOT NULL,
    reservation_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    guests_count INT,
    status ENUM('pending','confirmed','cancelled','completed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_reservation_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

    CONSTRAINT fk_reservation_table
    FOREIGN KEY (table_id)
    REFERENCES tables(id)
    ON DELETE CASCADE
);
```
