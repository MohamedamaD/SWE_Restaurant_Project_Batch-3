# Payments and Refunds Schema

```sql
CREATE TABLE payments (
    id UUID PRIMARY KEY,
    order_id UUID UNIQUE NOT NULL,
    user_id UUID NOT NULL,
    stripe_payment_intent_id VARCHAR(255),
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10),
    payment_method ENUM('card','apple_pay','google_pay'),
    status ENUM('pending','succeeded','failed','refunded') DEFAULT 'pending',
    paid_at TIMESTAMP,

    CONSTRAINT fk_payment_order
    FOREIGN KEY (order_id)
    REFERENCES orders(id)
    ON DELETE CASCADE,

    CONSTRAINT fk_payment_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
);

CREATE TABLE refunds (
    id UUID PRIMARY KEY,
    payment_id UUID NOT NULL,
    stripe_refund_id VARCHAR(255),
    amount DECIMAL(10,2),
    reason VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_refund_payment
    FOREIGN KEY (payment_id)
    REFERENCES payments(id)
    ON DELETE CASCADE
);
```
