# Feature 4: User Profile Management & Roles

## Objective
Implement profile viewing and updating for users, and establish Role-Based Access Control (RBAC) middleware for the application.

## Requirements

1. **Profile Management (`GET`, `PUT` `/api/users/profile`):**
   - **GET:** Return the currently authenticated user's details (excluding password).
   - **PUT:** Allow the user to update their name, phone, and password.
   - *Security:* If the password is being updated, it MUST be hashed again before saving.

2. **Authorization Middlewares:**
   - Create a `checkRole(...roles)` middleware that runs *after* `verifyToken`.
   - Ensure the user's role from `req.user.role` matches one of the allowed roles passed to the middleware.

3. **Admin Endpoints (`GET`, `PUT`, `DELETE` `/api/admin/users/`):**
   - Allow an `admin` to view a list of all users.
   - Allow an `admin` to change a user's role (e.g., promote `customer` to `staff`).
   - Allow an `admin` to delete a user.

## Definition of Done
- Users can retrieve and update their own profiles securely.
- Only authenticated users with the role `admin` can access the admin user management endpoints.
- Attempting to access an admin endpoint with a `customer` token results in a `403 Forbidden` response.
