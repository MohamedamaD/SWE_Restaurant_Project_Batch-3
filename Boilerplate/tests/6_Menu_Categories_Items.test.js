const request = require('supertest');
const app = require('../server');

describe('Task 6: Menu Categories & Items', () => {
    let adminToken, restaurantId, categoryId, menuItemId;

    beforeAll(async () => {
        await request(app).post('/api/auth/register').send({ email: 'admin_menu@test.com', password: 'pass', role: 'admin' });
        const res = await request(app).post('/api/auth/login').send({ email: 'admin_menu@test.com', password: 'pass' });
        adminToken = res.body?.token;
        const restRes = await request(app).post('/api/restaurants').set('Authorization', `Bearer ${adminToken}`).send({ name: 'Menu Rest', address: 'Addr' });
        restaurantId = restRes.body?.id;
    });

    describe('6.1 Menu Categories', () => {
        it('should prevent creating a category without authentication', async () => {
            const response = await request(app).post('/api/categories').send({ name: 'Drinks', restaurant_id: restaurantId });
            expect(response.statusCode).toBe(401);
        });

        it('should throw 400 Bad Request if restaurant_id is not passed to category payload', async () => {
            const response = await request(app)
                .post('/api/categories')
                .set('Authorization', `Bearer ${adminToken}`) 
                .send({ name: 'Drinks' }); // Missing restaurant_id
            
            expect(response.statusCode).toBe(400); 
        });

        it('should successfully create a new category', async () => {
            const response = await request(app)
                .post('/api/categories')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ name: 'Beverages', restaurant_id: restaurantId });
                
            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body).toHaveProperty('name', 'Beverages');
            categoryId = response.body.id;
        });

        it('should return categories linked to a specific restaurant', async () => {
            let fakeId = '123e4567-e89b-12d3-a456-426614174000';
            const res1 = await request(app).get(`/api/categories?restaurant_id=${fakeId}`);
            expect(res1.statusCode).toBe(200);
            expect(Array.isArray(res1.body)).toBe(true);
            expect(res1.body.length).toBe(0); // Should be empty

            const res2 = await request(app).get(`/api/categories?restaurant_id=${restaurantId}`);
            expect(res2.statusCode).toBe(200);
            expect(res2.body.length).toBeGreaterThan(0);
        });
    });

    describe('6.2 Menu Items', () => {
        it('should prevent creating a menu item if price < 0', async () => {
            const response = await request(app)
                .post('/api/menu-items')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ name: 'Negative Item', price: -5.00, category_id: categoryId });
            
            expect(response.statusCode).toBe(400); // Validation error
        });

        it('should successfully generate a menu item linked to a valid category', async () => {
            const response = await request(app)
                .post('/api/menu-items')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ 
                    name: 'Diet Cola', 
                    price: 2.50, 
                    description: 'Cold diet cola',
                    category_id: categoryId 
                });
                
            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body).toHaveProperty('name', 'Diet Cola');
            menuItemId = response.body.id;
        });

        it('should test fetching all menu items by category UUID', async () => {
            const response = await request(app).get(`/api/menu-items?category_id=${categoryId}`);
            expect(response.statusCode).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            
            const item = response.body.find(i => i.id === menuItemId);
            expect(item).toBeDefined();
            expect(item.name).toBe('Diet Cola');
        });

        it('should update availability status of a menu item', async () => {
            const response = await request(app)
                .put(`/api/menu-items/${menuItemId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ is_available: false });

            expect(response.statusCode).toBe(200);
            // Re-fetch to confirm
            const getRes = await request(app).get(`/api/menu-items/${menuItemId}`);
            expect(getRes.body.is_available).toBe(false);
        });

        it('should successfully delete a category which auto cascades deleting items or rejects if items exist', async () => {
            // Note: Either choice is fine depending on student implementation (Cascade vs Restrict). 
            // We'll just test that we can delete a menu item and category.
            const delItem = await request(app).delete(`/api/menu-items/${menuItemId}`).set('Authorization', `Bearer ${adminToken}`);
            expect(delItem.statusCode).toBe(200);

            const delCat = await request(app).delete(`/api/categories/${categoryId}`).set('Authorization', `Bearer ${adminToken}`);
            expect(delCat.statusCode).toBe(200);
        });
    });
});
