sequenceDiagram

participant User
participant Frontend
participant API
participant Stripe
participant DB

User->>Frontend: Click Pay

Frontend->>API: Create PaymentIntent

API->>Stripe: Create PaymentIntent

Stripe-->>API: paymentIntent

API-->>Frontend: clientSecret

Frontend->>Stripe: Confirm Payment

Stripe-->>API: Webhook payment_succeeded

API->>DB: Update Payment Status

API-->>User: Payment Successful
