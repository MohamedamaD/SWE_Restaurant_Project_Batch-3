/**
 * @file payment.model.js
 * @description Sequelize model for the Payment entity.
 * 
 * TODO [Task 2]: Define the Payment model.
 * 
 * Schema requirements:
 * - id: UUID (Primary Key)
 * - order_id: UUID (Unique, Required)
 * - user_id: UUID (Required)
 * - stripe_payment_intent_id: String
 * - amount: Decimal(10,2) (Required)
 * - currency: String
 * - payment_method: Enum ['card','apple_pay','google_pay']
 * - status: Enum ['pending','succeeded','failed','refunded'] (Default: 'pending')
 * - paid_at: Timestamp
 * 
 * @see {@link ../Documentation/Tasks/2_Database_Models.md}
 */

module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define('Payment', {
        // Implementation goes here
    }, {
        // Optional configuration goes here
        timestamps: false,
        tableName: 'payments'
    });

    return Payment;
};
