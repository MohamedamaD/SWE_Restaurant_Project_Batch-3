# Feature 10: Payment Integration (Stripe)

## Objective
Integrate Stripe logic to accept payments for orders and handle the webhook events securely.

## Requirements

1. **Environment Config:**
   - Configure `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` in `.env`.

2. **Endpoints:**
   - **`POST /api/payments/create-intent`:**
     - Required: `order_id`.
     - Fetch the order and its `total_price`.
     - Prevent double-payment check `total_price` > 0.
     - Call Stripe's API to generate a `PaymentIntent`. Include metadata (e.g., `order_id`, `user_id`).
     - Save the `stripe_payment_intent_id` and amounts to the `payments` table with `status: pending`.
     - Return the Stripe `client_secret` to the frontend.

3. **Stripe Webhook (The Tricky Part):**
   - **`POST /api/payments/webhook`:**
     - Use `express.raw({type: 'application/json'})` specifically for this route so Stripe's signature can be verified.
     - Verify `stripe-signature` using the `STRIPE_WEBHOOK_SECRET`.
     - Handle `payment_intent.succeeded`:
       - Find the payment record using the intent ID.
       - Update it to `status: succeeded`.
       - Find the related `order_id` and update its status if applicable.
     - Handle `payment_intent.payment_failed`:
       - Update payment to `status: failed`.

## Definition of Done
- A customer can request a payment intent for an unpaid order.
- The webhook endpoint successfully verifies Stripe events and syncs the order/payment status in the local DB.
