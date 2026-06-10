# Menu Schema

```sql
CREATE TABLE menu_categories (
    id UUID PRIMARY KEY,
    restaurant_id UUID NOT NULL,
    name VARCHAR(100) NOT NULL,

    CONSTRAINT fk_category_restaurant
    FOREIGN KEY (restaurant_id)
    REFERENCES restaurants(id)
    ON DELETE CASCADE
);

CREATE TABLE menu_items (
    id UUID PRIMARY KEY,
    category_id UUID NOT NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(255),
    available BOOLEAN DEFAULT TRUE,

    CONSTRAINT fk_item_category
    FOREIGN KEY (category_id)
    REFERENCES menu_categories(id)
    ON DELETE CASCADE
);
```
