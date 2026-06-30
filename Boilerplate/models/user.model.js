/**
 * @file user.model.js
 * @description Sequelize model for the User entity.
 * 
 * TODO [Task 2]: Define the User model.
 * 
 * Schema requirements:
 * - id: UUID (Primary Key)
 * - name: String (Required)
 * - email: String (Unique, Required)
 * - password: String (Required)
 * - phone: String
 * - role: Enum ['admin', 'customer', 'staff'] (Default: 'customer')
 * - is_verified: Boolean (Default: false)
 * - timestamps (created_at, updated_at)
 * 
 * @see {@link ../Documentation/Tasks/2_Database_Models.md}
 */

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        // Implementation goes here
    }, {
        // Optional configuration goes here
        timestamps: true,
        tableName: 'users'
    });

    return User;
};
