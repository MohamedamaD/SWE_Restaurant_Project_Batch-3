/**
 * @file restaurant.model.js
 * @description Sequelize model for the Restaurant entity.
 * 
 * TODO [Task 2]: Define the Restaurant model.
 * 
 * Schema requirements:
 * - id: UUID (Primary Key)
 * - name: String (Required)
 * - description: Text
 * - address: String
 * - phone: String
 * - image: String
 * - created_at (timestamp)
 * 
 * @see {@link ../Documentation/Tasks/2_Database_Models.md}
 */

module.exports = (sequelize, DataTypes) => {
    const Restaurant = sequelize.define('Restaurant', {
        // Implementation goes here
    }, {
        // Optional configuration goes here
        timestamps: true,
        updatedAt: false, // adjust based on schema
        tableName: 'restaurants'
    });

    return Restaurant;
};
