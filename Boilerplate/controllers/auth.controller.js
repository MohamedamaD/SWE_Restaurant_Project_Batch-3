/**
 * @file auth.controller.js
 * @description Controller handling user authentication (Registration & Login).
 *
 * TODO [Task 3]: Implement registration and login logic.
 *
 * Required Methods:
 * 1. register(req, res) - Handle user signup, hash password, and save to DB.
 * 2. login(req, res) - Authenticate user, compare passwords, and generate JWT.
 *
 * @see {@link ../Documentation/Tasks/3_User_Authentication.md}
 */

/**
 * Handle user registration.
 *
 * @param {Object} req - Express request object containing user details in body.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */

const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    // 1. Validate
    const value = req.value;

    //2.  Find User Email In Database
    const user = await User.findOne({ where: { email: value.email } });
    if (user) return res.status(409).json({ message: "User Already Exists" });

    // 3. Assign default customer role
    if (!value.role) {
      value.role = "customer";
    }

    // 4. Restrict admin registration
    if (value.role === "admin") {
      return res
        .status(403)
        .json({ message: "Admin registration is not allowed" });
    }

    //5. Hash Password
    value.password = await bcrypt.hash(value.password, 10);

    // 6. Save user

    const newUser = await User.create(value);
    const { password, ...userData } = newUser.toJSON();

    // Send Response
    res
      .status(201)
      .json({ message: "User registered successfully", user: userData });
  } catch (error) {
    console.log(`DEBUG REGISTER >> ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Handle user login.
 *
 * @param {Object} req - Express request object containing email and password.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
const login = async (req, res) => {
  // Implementation goes here
};

module.exports = {
  register,
  login,
};
