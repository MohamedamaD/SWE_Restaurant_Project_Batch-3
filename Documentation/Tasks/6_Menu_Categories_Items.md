# Feature 6: Menu Categories & Items

## Objective
Implement the endpoints needed to manage the menu categories for each restaurant, and the individual menu items inside those categories.

## Requirements

1. **Permissions:**
   - `admin` or `staff` can manage menus (Create, Update, Delete).
   - Anyone can view the menus.

2. **Menu Categories Endpoints:**
   - `POST /api/categories`: Create a new category (e.g., "Starters") linked to a `restaurant_id`.
   - `GET /api/categories?restaurant_id={id}`: Get all categories for a specific restaurant.
   - `PUT /api/categories/:id`: Update category name.
   - `DELETE /api/categories/:id`: Delete a category (cascades to items).

3. **Menu Items Endpoints:**
   - `POST /api/menu-items`: Create a new item linked to a `category_id`. Includes (name, description, price, available).
   - `GET /api/menu-items?category_id={id}`: List all items inside a category.
   - `GET /api/menu-items/:id`: View a single item.
   - `PUT /api/menu-items/:id`: Update item details, price, or mark as `available: false` if out of stock.
   - `DELETE /api/menu-items/:id`: Remove the item from the menu.

4. **Item Image Upload:**
   - Similar to restaurants, use `multer` to accept an `image` file upon creation or update. Save it to `uploads/menu/`.

## Definition of Done
- Categories can be linked to a restaurant and managed by authorized staff.
- Menu items can be assigned to categories with full CRUD capabilities.
- Images are successfully stored for menu items.
