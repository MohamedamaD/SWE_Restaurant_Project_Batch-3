/**
 * @file user.routes.js
 * @description Routes for User profile and Admin management.
 * 
 * TODO [Task 4]: Define routes and connect them to the user controller, applying middlewares.
 * 
 * Required Routes:
 * - GET /api/users/profile (Protected)
 * - PUT /api/users/profile (Protected)
 * - GET /api/admin/users (Protected, Admin only)
 * - PUT /api/admin/users/:id/role (Protected, Admin only)
 * - DELETE /api/admin/users/:id (Protected, Admin only)
 * 
 * @see {@link ../Documentation/Tasks/4_User_Profiles_Roles.md}
 */

const express = require('express');
const router = express.Router();

module.exports = router;
