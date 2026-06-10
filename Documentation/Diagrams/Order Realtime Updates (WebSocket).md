flowchart LR

Kitchen[Kitchen Dashboard]

Server[WebSocket Server]

Customer[Customer App]

Customer --> Server
Server --> Kitchen

Kitchen --> Server
Server --> Customer
