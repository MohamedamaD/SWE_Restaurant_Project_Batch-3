/**
 * @file category.model.js
 * @description Sequelize model for the MenuCategory entity.
 * 
 * TODO [Task 2]: Define the MenuCategory model.
 * 
 * Schema requirements:
 * - id: UUID (Primary Key)
 * - restaurant_id: UUID (Required)
 * - name: String (Required)
 * 
 * @see {@link ../Documentation/Tasks/2_Database_Models.md}
 */

module.exports = (sequelize, DataTypes) => {
    const MenuCategory = sequelize.define('MenuCategory', {
        // Implementation goes here
    }, {
        // Optional configuration goes here
        timestamps: false,
        tableName: 'menu_categories'
    });

    return MenuCategory;
};
