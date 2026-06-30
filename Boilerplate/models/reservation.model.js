/**
 * @file reservation.model.js
 * @description Sequelize model for the Reservation entity.
 * 
 * TODO [Task 2]: Define the Reservation model.
 * 
 * Schema requirements:
 * - id: UUID (Primary Key)
 * - user_id: UUID (Required)
 * - table_id: UUID (Required)
 * - reservation_date: DateOnly (Required)
 * - start_time: Time (Required)
 * - end_time: Time (Required)
 * - guests_count: Integer
 * - status: Enum ['pending','confirmed','cancelled','completed'] (Default: 'pending')
 * - created_at (timestamp)
 * 
 * @see {@link ../Documentation/Tasks/2_Database_Models.md}
 */

module.exports = (sequelize, DataTypes) => {
    const Reservation = sequelize.define('Reservation', {
        // Implementation goes here
    }, {
        // Optional configuration goes here
        timestamps: true,
        updatedAt: false,
        tableName: 'reservations'
    });

    return Reservation;
};
