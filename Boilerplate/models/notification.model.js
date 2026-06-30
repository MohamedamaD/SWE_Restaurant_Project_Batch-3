/**
 * @file notification.model.js
 * @description Sequelize model for the Notification entity.
 * 
 * TODO [Task 2]: Define the Notification model.
 * 
 * Schema requirements:
 * - id: UUID (Primary Key)
 * - user_id: UUID (Required)
 * - type: Enum ['email', 'system']
 * - title: String
 * - message: Text
 * - is_read: Boolean (Default: false)
 * - created_at (timestamp)
 * 
 * @see {@link ../Documentation/Tasks/2_Database_Models.md}
 */

module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('Notification', {
        // Implementation goes here
    }, {
        // Optional configuration goes here
        timestamps: true,
        updatedAt: false,
        tableName: 'notifications'
    });

    return Notification;
};
