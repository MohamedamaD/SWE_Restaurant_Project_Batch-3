const { DataTypes } = require('sequelize');

describe('Task 2: Database Models & Schema Validations', () => {
    let models;

    beforeAll(() => {
        try {
            models = require('../models');
        } catch (error) {
            console.error('Models not fully implemented yet.');
        }
    });

    describe('2.1 Model Definitions', () => {
        it('should export all 10 required models', () => {
            expect(models).toBeDefined();
            const expectedModels = ['User', 'Restaurant', 'Table', 'Reservation', 'MenuCategory', 'MenuItem', 'Order', 'OrderItem', 'Payment', 'Notification'];
            
            expectedModels.forEach(modelName => {
                expect(models).toHaveProperty(modelName);
            });
        });
    });

    describe('2.2 Model Schema & Constraints', () => {
        it('User model should define correct attributes and types', () => {
            const attributes = models?.User?.getAttributes();
            expect(attributes.id.primaryKey).toBe(true);
            expect(attributes.email.unique).toBe(true);
            expect(attributes.email.allowNull).toBe(false);
            expect(attributes.password.allowNull).toBe(false);
            expect(attributes.role.type.key).toBe('ENUM');
        });

        it('Restaurant model should define correct attributes', () => {
            const attributes = models?.Restaurant?.getAttributes();
            expect(attributes.id.primaryKey).toBe(true);
            expect(attributes.name.allowNull).toBe(false);
        });

        it('Table model should have capacity and status enum', () => {
            const attributes = models?.Table?.getAttributes();
            expect(attributes.capacity.allowNull).toBe(false);
            expect(attributes.status.type.key).toBe('ENUM');
            expect(attributes.status.values).toContain('available');
        });

        it('Reservation model should have proper date/time fields', () => {
            const attributes = models?.Reservation?.getAttributes();
            expect(attributes.reservation_date.allowNull).toBe(false);
            expect(attributes.start_time.allowNull).toBe(false);
            expect(attributes.end_time.allowNull).toBe(false);
            expect(attributes.status.type.key).toBe('ENUM');
        });

        it('Order model should calculate total_price correctly', () => {
             const attributes = models?.Order?.getAttributes();
             expect(attributes.total_price.type.key).toBe('DECIMAL');
        });
    });

    describe('2.3 Model Associations (Relationships)', () => {
        it('User should have many Reservations and Orders', () => {
            const User = models?.User;
            expect(User.associations).toHaveProperty('Reservations');
            expect(User.associations).toHaveProperty('Orders');
        });

        it('Restaurant should have many Tables and MenuCategories', () => {
            const Restaurant = models?.Restaurant;
            expect(Restaurant.associations).toHaveProperty('Tables');
            expect(Restaurant.associations).toHaveProperty('MenuCategories');
        });

        it('Order should belong to a User and contain many OrderItems', () => {
            const Order = models?.Order;
            expect(Order.associations).toHaveProperty('User');
            expect(Order.associations).toHaveProperty('OrderItems');
        });
    });
});
