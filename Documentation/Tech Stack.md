# Restaurant Reservation System – Tech Stack

This document describes the technologies and tools used to build the **Restaurant Reservation System** backend.

---

## 1. Backend Framework

* **Node.js**: Server-side runtime used to run JavaScript on the backend.
* **Express.js**: Minimal and flexible web framework used to build the REST API.

## 2. Database

* **MySQL**: Relational database used to store application data such as users, reservations, orders, and payments.
* **Sequelize**: ORM used to interact with the database using JavaScript models instead of raw SQL queries.
  * **Features:** Models, Associations, Migrations, Seeders

## 3. Validation

* **Joi**: Used to validate request data such as:
  * User registration
  * Login data
  * Reservation data
  * Order creation

## 4. Authentication & Security

* **JSON Web Token (JWT)**: Used to authenticate users and protect API routes.
* **bcrypt**: Used to hash user passwords before storing them in the database.
* **Express Rate Limit**: Protects the API from brute-force attacks and excessive requests.
* **CORS**: Allows the frontend application to communicate with the backend.

## 5. File Upload

* **Multer**: Used for uploading images such as:
  * Restaurant images
  * Menu item images
  * User profile pictures

## 6. Email Service

* **Nodemailer**: Used to send emails such as:
  * Email verification
  * Reservation confirmation
  * Payment confirmation
  * Password reset

## 7. Real-Time Communication

* **Socket.io**: Used for real-time features such as:
  * Kitchen receiving new orders instantly
  * Live order status updates
  * Admin dashboard notifications

## 8. Payment Gateway

* **Stripe**: Used for handling online payments.
  * **Features used:** PaymentIntent API, Webhooks, Refunds
  * **Supported payment methods:** Card, Apple Pay, Google Pay

## 9. Development Tools

* **Visual Studio Code**: Primary development environment.
* **Postman**: Used to test API endpoints.
* **GitHub**: Used for source control and collaboration.
* **Git**: Used for tracking code changes.

## 10. Environment Configuration

* **dotenv**: Used to manage environment variables such as:
  * Database credentials
  - Stripe secret keys
  - JWT secrets
  - Email configuration

## 11. API Architecture

* **Architecture Type:** RESTful API
* **Example endpoints:**
  * `POST /auth/register`
  * `POST /auth/login`
  * `GET /restaurants`
  * `POST /reservations`
  * `POST /orders`
  * `POST /payments`

## 12. Project Structure

The project follows a modular structure:

* `config/`
* `controllers/`
* `routes/`
* `services/`
* `models/`
* `middlewares/`
* `validators/`
* `utils/`

This structure helps keep the project scalable and maintainable.
