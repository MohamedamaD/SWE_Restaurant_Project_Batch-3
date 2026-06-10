# Feature 5: Restaurant Management

## Objective
Implement CRUD operations for restaurants so that administrators can manage the venues in the system. Integrate image uploading for restaurant thumbnails.

## Requirements

1. **Permissions:**
   - Only `admin` role users can access the Create, Update, and Delete endpoints.
   - Anyone (`customer`, `staff`, or non-authenticated users) can access the Read endpoints (`GET /api/restaurants` & `GET /api/restaurants/:id`).

2. **Endpoints:**
   - `POST /api/restaurants`: Create a new restaurant with fields (name, description, address, phone). Ensure unique names or handle duplicates properly.
   - `GET /api/restaurants`: List all restaurants (implement basic pagination: `page`, `limit`).
   - `GET /api/restaurants/:id`: Retrieve a specific restaurant by its UUID.
   - `PUT /api/restaurants/:id`: Update existing restaurant details.
   - `DELETE /api/restaurants/:id`: Delete a restaurant. This should cascade and delete its tables, menus, etc. (Check Sequelize configurations).

3. **Image Upload (Multer):**
   - Create a `multer` config middleware in `middlewares/upload.js`.
   - Update `POST` and `PUT` endpoints to accept a `multipart/form-data` request with a file field named `image`.
   - Save the image to an `uploads/restaurants/` directory.
   - Save the file path string (e.g., `/uploads/restaurants/image-123.jpg`) in the database `image` column.

## Definition of Done
- Admins can create, update, delete, and list restaurants with pagination.
- Images can be successfully uploaded and linked to a restaurant.
- Customers can fetch the list of restaurants and view their details.
