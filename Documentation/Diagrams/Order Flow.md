sequenceDiagram

participant User
participant API
participant DB
participant Kitchen

User->>API: Create Order
API->>DB: Save Order

API->>Kitchen: Send Order (WebSocket)

Kitchen-->>API: Order accepted
API-->>User: Order confirmed
