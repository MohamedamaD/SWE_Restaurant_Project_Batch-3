sequenceDiagram

participant User
participant API
participant DB

User->>API: Request available tables
API->>DB: Check tables availability
DB-->>API: Available tables

User->>API: Create reservation
API->>DB: Save reservation

API-->>User: Reservation confirmed
