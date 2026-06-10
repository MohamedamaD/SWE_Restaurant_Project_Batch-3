# Feature 11: Real-time Notifications (Socket.io)

## Objective
Add a real-time layer to the application so that the kitchen receives orders immediately without refreshing the page, and the customer knows when their food is ready.

## Requirements

1. **Setup Socket.io:**
   - Modify `server.js` (or `index.js`) to extract the raw `http` server from Express.
   - Initialize `socket.io` on that server.
   - Configure CORS tightly matching the frontend URL.

2. **Authentication for Sockets:**
   - Implement a middleware for Socket.io that extracts the JWT from the connection handshake.
   - Decode the token and attach the user Object to `socket.user`. Eject unauthenticated sockets.

3. **Rooms & Events:**
   - When a `customer` connects, join them to a private room: `user_${user.id}`.
   - When a `staff` member connects, join them to a room: `restaurant_${restaurant_id}_staff`.
   - **Emit Events:**
     - When a new order is created in `Feature 9`, emit an event `new_order` to the appropriate `restaurant_${id}_staff` room.
     - When a staff updates order status (e.g., `preparing` -> `served`), emit `order_status_update` to `user_${order.user_id}`.
     - When a reservation status changes, emit `reservation_update` to the customer.

## Definition of Done
- Socket connection requires a valid JWT.
- Clients receive immediate updates for events assigned to their role/user ID.
- Postman or a simple HTML client confirms the Socket connection works and receives broadcasts.
