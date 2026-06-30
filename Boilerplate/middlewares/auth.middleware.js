/**
 * @file auth.middleware.js
 * @description Middlewares for protecting routes and verifying JWT.
 * 
 * TODO [Task 3, 4]: Implement token verification and role checking middlewares.
 * 
 * Required Middlewares:
 * 1. verifyToken - Extracts JWT from Authorization header, verifies it, and attaches user to req.
 * 2. checkRole(...roles) - Checks if the authenticated user has one of the required roles.
 * 
 * @see {@link ../Documentation/Tasks/3_User_Authentication.md}
 * @see {@link ../Documentation/Tasks/4_User_Profiles_Roles.md}
 */

/**
 * Middleware to verify a JSON Web Token.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const verifyToken = (req, res, next) => {
    // Implementation goes here
};

/**
 * Middleware factory to authorize specific roles.
 * 
 * @param {...string} roles - Allowed roles (e.g., 'admin', 'staff').
 * @returns {Function} Express middleware function.
 */
const checkRole = (...roles) => {
    return (req, res, next) => {
        // Implementation goes here
    };
};

module.exports = {
    verifyToken,
    checkRole
};
