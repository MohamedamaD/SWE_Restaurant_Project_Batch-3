const request = require('supertest');
const app = require('../server');

describe('Task 9: Order System & Calculations', () => {
    let adminToken, customerToken;
    let menuItem1Id, menuItem2Id;
    let orderId;

    beforeAll(async () => {
        // Setup Users
        await request(app).post('/api/auth/register').send({ email: 'admin_ord@test.com', password: 'pass', role: 'admin' });
        await request(app).post('/api/auth/register').send({ email: 'cust_ord@test.com', password: 'pass', role: 'customer' });
        
        let res = await request(app).post('/api/auth/login').send({ email: 'admin_ord@test.com', password: 'pass' });
        adminToken = res.body?.token;
        res = await request(app).post('/api/auth/login').send({ email: 'cust_ord@test.com', password: 'pass' });
        customerToken = res.body?.token;

        // Setup Restaurant & Context for Orders (MenuItems)
        const restRes = await request(app).post('/api/restaurants').set('Authorization', `Bearer ${adminToken}`).send({ name: 'Order Rest', address: '1' });
        const rid = restRes.body?.id;
        const catRes = await request(app).post('/api/categories').set('Authorization', `Bearer ${adminToken}`).send({ name: 'Food', restaurant_id: rid });
        const cid = catRes.body?.id;

        const m1 = await request(app).post('/api/menu-items').set('Authorization', `Bearer ${adminToken}`).send({ name: 'Burger', price: 10.50, category_id: cid });
        menuItem1Id = m1.body?.id;

        const m2 = await request(app).post('/api/menu-items').set('Authorization', `Bearer ${adminToken}`).send({ name: 'Fries', price: 4.25, category_id: cid });
        menuItem2Id = m2.body?.id;
    });

    describe('9.1 Creating Orders & Calculating Total Price', () => {
        it('should reject order if items array is missing or empty', async () => {
            const response = await request(app)
                .post('/api/orders')
                .set('Authorization', `Bearer ${customerToken}`)
                .send({ items: [] });
                
            expect(response.statusCode).toBe(400); // Validation error
            expect(response.body).toHaveProperty('error');
        });

        it('should return 400 Bad Request if a menu_item_id is invalid/missing', async () => {
            const response = await request(app)
                .post('/api/orders')
                .set('Authorization', `Bearer ${customerToken}`)
                .send({
                    items: [
                        { menu_item_id: 'fake-uuid', quantity: 1 }
                    ]
                });
                
            expect([400, 404]).toContain(response.statusCode);
        });

        it('should correctly calculate total_price dynamically based on DB item prices', async () => {
            // Burger (10.50) * 2 = 21.00
            // Fries (4.25) * 1  = 4.25
            // Total = 25.25
            const response = await request(app)
                .post('/api/orders')
                .set('Authorization', `Bearer ${customerToken}`)
                .send({
                    items: [
                        { menu_item_id: menuItem1Id, quantity: 2 },
                        { menu_item_id: menuItem2Id, quantity: 1 }
                    ]
                });
                
            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body).toHaveProperty('status', 'pending');
            expect(Number(response.body.total_price)).toBe(25.25);
            orderId = response.body.id;
        });
    });

    describe('9.2 Fetching Orders', () => {
        it('should retrieve a single order by ID with its OrderItems populated', async () => {
            const response = await request(app).get(`/api/orders/${orderId}`).set('Authorization', `Bearer ${customerToken}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('total_price');
            // Check if items (OrderItems) are joined
            expect(response.body).toHaveProperty('OrderItems'); 
            expect(Array.isArray(response.body.OrderItems)).toBe(true);
        });

        it('should restrict customers to viewing only their own orders', async () => {
            const response = await request(app).get('/api/orders').set('Authorization', `Bearer ${customerToken}`);
            expect(response.statusCode).toBe(200);
            expect(response.body.some(o => o.id === orderId)).toBe(true);
        });
    });

    describe('9.3 Updating Order Status (Staff / Admin vs Customer)', () => {
        it('should return 403 Forbidden if Customer tries to mark order as "preparing"', async () => {
            const response = await request(app)
                .patch(`/api/orders/${orderId}/status`)
                .set('Authorization', `Bearer ${customerToken}`)
                .send({ status: 'preparing' });
                
            expect(response.statusCode).toBe(403);
        });

        it('should allow Staff/Admin to update order status to preparing', async () => {
            const response = await request(app)
                .patch(`/api/orders/${orderId}/status`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ status: 'preparing' });
                
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('status', 'preparing');
        });

        it('should return 400 Bad Request if status is invalid (e.g., "unknown_status")', async () => {
            const response = await request(app)
                .patch(`/api/orders/${orderId}/status`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ status: 'unknown_status' });
                
            expect(response.statusCode).toBe(400); // Validation error
        });
    });
});
