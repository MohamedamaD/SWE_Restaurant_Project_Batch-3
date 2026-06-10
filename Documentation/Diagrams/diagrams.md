# Restaurant Reservation System - Diagrams

This document contains important diagrams to help understand the system architecture and workflow.

---

# 1. System Architecture

```mermaid
flowchart LR

Client[Client App / Browser]

API[Express API Server]

Auth[Auth Module]

Reservation[Reservation Module]

Order[Order Module]

Payment[Stripe Payment]

Email[Email Service]

WS[WebSocket Server]

DB[(Database)]

Client --> API

API --> Auth
API --> Reservation
API --> Order
API --> Payment
API --> Email
API --> WS

Auth --> DB
Reservation --> DB
Order --> DB
Payment --> DB
