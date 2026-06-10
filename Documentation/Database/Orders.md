# Orders Schema

```sql
CREATE TABLE orders (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    reservation_id UUID,
    total_price DECIMAL(10,2),
    status ENUM('pending','preparing','served','completed','cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_order_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

    CONSTRAINT fk_order_reservation
    FOREIGN KEY (reservation_id)
    REFERENCES reservations(id)
    ON DELETE SET NULL
);

CREATE TABLE order_items (
    id UUID PRIMARY KEY,
    order_id UUID NOT NULL,
    menu_item_id UUID NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,

    CONSTRAINT fk_orderitem_order
    FOREIGN KEY (order_id)
    REFERENCES orders(id)
    ON DELETE CASCADE,

    CONSTRAINT fk_orderitem_menu
    FOREIGN KEY (menu_item_id)
    REFERENCES menu_items(id)
);
```
