/**
 * @file table.model.js
 * @description Sequelize model for the Table entity.
 * 
 * TODO [Task 2]: Define the Table model.
 * 
 * Schema requirements:
 * - id: UUID (Primary Key)
 * - restaurant_id: UUID (Required)
 * - table_number: Integer (Required)
 * - capacity: Integer (Required)
 * - status: Enum ['available', 'reserved'] (Default: 'available')
 * 
 * @see {@link ../Documentation/Tasks/2_Database_Models.md}
 */

module.exports = (sequelize, DataTypes) => {
    const Table = sequelize.define('Table', {
        // Implementation goes here
    }, {
        // Optional configuration goes here
        timestamps: false,
        tableName: 'tables'
    });

    return Table;
};
