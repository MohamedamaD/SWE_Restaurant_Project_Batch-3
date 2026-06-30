/**
 * @file reservation.routes.js
 * @description Routes for table reservations.
 * 
 * TODO [Task 8]: Define routes and connect them to the reservation controller.
 * 
 * Required Routes:
 * - POST /api/reservations -> reservationController.createReservation (Protected: Customer)
 * - GET /api/reservations -> reservationController.getReservations (Protected)
 * - PATCH /api/reservations/:id/status -> reservationController.updateReservationStatus (Protected)
 * 
 * @see {@link ../Documentation/Tasks/8_Reservation_System.md}
 */

const express = require('express');
const router = express.Router();

module.exports = router;
