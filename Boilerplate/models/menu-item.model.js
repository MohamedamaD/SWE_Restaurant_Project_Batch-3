/**
 * @file menu-item.model.js
 * @description Sequelize model for the MenuItem entity.
 * 
 * TODO [Task 2]: Define the MenuItem model.
 * 
 * Schema requirements:
 * - id: UUID (Primary Key)
 * - category_id: UUID (Required)
 * - name: String (Required)
 * - description: Text
 * - price: Decimal(10,2) (Required)
 * - image: String
 * - available: Boolean (Default: true)
 * 
 * @see {@link ../Documentation/Tasks/2_Database_Models.md}
 */

module.exports = (sequelize, DataTypes) => {
    const MenuItem = sequelize.define('MenuItem', {
        // Implementation goes here
    }, {
        // Optional configuration goes here
        timestamps: false,
        tableName: 'menu_items'
    });

    return MenuItem;
};
