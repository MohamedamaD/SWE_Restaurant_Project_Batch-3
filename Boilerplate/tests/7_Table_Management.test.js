const request = require('supertest');
const app = require('../server');

describe('Task 7: Table Management & Status Tracking', () => {
    let adminToken, customerToken;
    let restaurantId;
    let tableId;

    beforeAll(async () => {
        // Setup Users
        await request(app).post('/api/auth/register').send({ email: 'admin_t@test.com', password: 'pass', role: 'admin' });
        await request(app).post('/api/auth/register').send({ email: 'cust_t@test.com', password: 'pass', role: 'customer' });
        const admRes = await request(app).post('/api/auth/login').send({ email: 'admin_t@test.com', password: 'pass' });
        adminToken = admRes.body?.token;
        const custRes = await request(app).post('/api/auth/login').send({ email: 'cust_t@test.com', password: 'pass' });
        customerToken = custRes.body?.token;

        // Setup Restaurant
        const restRes = await request(app).post('/api/restaurants').set('Authorization', `Bearer ${adminToken}`).send({ name: 'Table Config Rest', address: '123' });
        restaurantId = restRes.body?.id;
    });

    describe('7.1 Creating Tables (Admin Only)', () => {
        it('should return 400 Bad Request if capacity is <= 0 or not an integer', async () => {
            const response = await request(app)
                .post('/api/tables')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ restaurant_id: restaurantId, table_number: 1, capacity: -2 });
                
            expect(response.statusCode).toBe(400); // Validation Error
            expect(response.body).toHaveProperty('error');
        });

        it('should return 403 Forbidden for a Customer attempting to create a table', async () => {
            const response = await request(app)
                .post('/api/tables')
                .set('Authorization', `Bearer ${customerToken}`)
                .send({ restaurant_id: restaurantId, table_number: 1, capacity: 4 });
                
            expect(response.statusCode).toBe(403);
        });

        it('should successfully create a valid table as Admin', async () => {
            const response = await request(app)
                .post('/api/tables')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ restaurant_id: restaurantId, table_number: 1, capacity: 4 });
                
            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.status).toBe('available');
            tableId = response.body.id;
        });

        it('should reject creating a table with a duplicate table_number in the same restaurant', async () => {
            const response = await request(app)
                .post('/api/tables')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ restaurant_id: restaurantId, table_number: 1, capacity: 2 });
                
            // Either 409 Conflict or 400 Validation, depending on how student handles it
            expect([400, 409]).toContain(response.statusCode);
        });
    });

    describe('7.2 Reading & Listing Tables Filters', () => {
        it('should allow anyone (or customer) to list all available tables for a restaurant', async () => {
            const response = await request(app)
                .get(`/api/tables?restaurant_id=${restaurantId}&status=available`);
                
            expect(response.statusCode).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.some(t => t.id === tableId)).toBe(true);
        });
    });

    describe('7.3 Updating Table Status (Admin / Staff)', () => {
        it('should allow Admin to update a table capacity and status', async () => {
            const response = await request(app)
                .put(`/api/tables/${tableId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ capacity: 6, status: 'reserved' });
            
            expect(response.statusCode).toBe(200);
            expect(response.body.capacity).toBe(6);
            expect(response.body.status).toBe('reserved');
        });

        it('should reject invalid status enums', async () => {
            const response = await request(app)
                .put(`/api/tables/${tableId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ status: 'broken' }); // Not in ['available', 'reserved']
            
            expect(response.statusCode).toBe(400); // Validation Error
        });

        it('should allow Admin to successfully delete the table', async () => {
            const response = await request(app)
                .delete(`/api/tables/${tableId}`)
                .set('Authorization', `Bearer ${adminToken}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('message');
        });
    });
});
