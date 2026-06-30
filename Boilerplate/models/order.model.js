/**
 * @file order.model.js
 * @description Sequelize model for the Order entity.
 * 
 * TODO [Task 2]: Define the Order model.
 * 
 * Schema requirements:
 * - id: UUID (Primary Key)
 * - user_id: UUID (Required)
 * - reservation_id: UUID
 * - total_price: Decimal(10,2)
 * - status: Enum ['pending','preparing','served','completed','cancelled'] (Default: 'pending')
 * - created_at (timestamp)
 * 
 * @see {@link ../Documentation/Tasks/2_Database_Models.md}
 */

module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        // Implementation goes here
    }, {
        // Optional configuration goes here
        timestamps: true,
        updatedAt: false,
        tableName: 'orders'
    });

    return Order;
};
