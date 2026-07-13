/**
 * @file auth.routes.js
 * @description Routes for user authentication.
 *
 * TODO [Task 3]: Define routes and connect them to the auth controller.
 *
 * Required Routes:
 * - POST /api/auth/register -> authController.register
 * - POST /api/auth/login -> authController.login
 *
 * @see {@link ../Documentation/Tasks/3_User_Authentication.md}
 */

const express = require('express');
const router = express.Router();

const authController = require("../controllers/auth.controller");
const { registerSchema } = require("../validators/auth.validator");
const { verifySchemaMiddleware } = require('../middlewares/schema.middleware');
router.post(
  "/register",
  verifySchemaMiddleware(registerSchema),
  authController.register
);

module.exports = router;


