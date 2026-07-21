/**
 * @file auth.validator.js
 * @description Joi validation schemas for user authentication.
 *
 * TODO [Task 3]: Define Joi schemas to validate request bodies before reaching the controller.
 *
 * Required Schemas:
 * 1. registerSchema - Validate name, email (valid format), password (min length), phone.
 * 2. loginSchema - Validate email and password.
 *
 * @see {@link ../Documentation/Tasks/3_User_Authentication.md}
 */

const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .pattern(/^[A-Za-z\s]+$/)
    .required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .max(50)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[&%])[A-Za-z0-9&%]{8,}$/)
    .required(),
  phone: Joi.string()
    .pattern(/^\+?[0-9]{7,14}$/)
    .optional(),
});

const loginSchema = null; // Replace with Joi schema

module.exports = {
  registerSchema,
  loginSchema,
};
