# Feature 3: User Authentication

## Objective
Implement a secure registration and login system for users using JSON Web Tokens (JWT) and password hashing.

## Requirements

1. **Registration (`POST /api/auth/register`):**
   - Validate incoming request body (name, email, password, phone, role).
   - Check if a user with the provided email already exists.
   - Hash the password using `bcrypt` (salt rounds: 10 or 12) before saving it to the database.
   - Assign the default role (`customer`) if none is provided. Admin creation should be restricted.
   - Save the user and return a success message.

2. **Login (`POST /api/auth/login`):**
   - Validate incoming request (email, password).
   - Find the user by email.
   - Compare the provided password with the hashed password using `bcrypt.compare`.
   - If valid, generate a JWT.
     - Payload: `{ id: user.id, role: user.role }`.
     - Expiration: Defined in `.env` (e.g., `1d`).
   - Return the generated token and basic user info.

3. **Authentication Middleware:**
   - Create a middleware function `verifyToken` to extract the JWT from the `Authorization` header (`Bearer <token>`).
   - Verify the token signature.
   - Attach the decoded user object to `req.user` to be used in subsequent controllers.

## Definition of Done
- A user can successfully register with a hashed password in the DB.
- A user can log in and receive a valid JWT.
- Attempting to access protected routes without a valid JWT returns a `401 Unauthorized` error.
