/**
 * @file order-item.model.js
 * @description Sequelize model for the OrderItem entity.
 * 
 * TODO [Task 2]: Define the OrderItem model.
 * 
 * Schema requirements:
 * - id: UUID (Primary Key)
 * - order_id: UUID (Required)
 * - menu_item_id: UUID (Required)
 * - quantity: Integer (Required)
 * - price: Decimal(10,2) (Required)
 * 
 * @see {@link ../Documentation/Tasks/2_Database_Models.md}
 */

module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define('OrderItem', {
        // Implementation goes here
    }, {
        // Optional configuration goes here
        timestamps: false,
        tableName: 'order_items'
    });

    return OrderItem;
};
