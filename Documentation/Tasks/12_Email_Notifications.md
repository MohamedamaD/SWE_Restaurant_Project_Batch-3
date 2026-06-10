# Feature 12: Email Notifications (Nodemailer)

## Objective
Automate transactional emails using NodeMailer and Mailtrap (or another SMTP provider) to keep users informed.

## Requirements

1. **Setup NodeMailer:**
   - Create a service utility `utils/email.js`.
   - Configure a `transporter` using environment variables for the SMTP host, port, user, and password.

2. **Email Triggers:**
   - **Registration:** When a new user finishes registering (Feature 3), asynchronously send a "Welcome to our Restaurant Reservation system" email to their address.
   - **Reservations:** When a reservation status changes to `confirmed` or `cancelled` (Feature 8).
     - Send an email combining the `reservation_date`, `start_time`, and Table information.
   - **Payments:** When a payment webhook succeeds (Feature 10).
     - Send a basic receipt email listing the Total Paid and `order_id`.

3. **Code Quality:**
   - Ensure the email sending logic is asynchronous and doesn't block the main API response.
   - Implement basic error catching in case the SMTP server is down.

## Definition of Done
- Successfully receive a welcome email in the configured Mailtrap inbox upon newly created user.
- Successfully receive a reservation update email upon status change.
- Errors during email sending do not crash the application or prevent the API from returning `200 OK`.
