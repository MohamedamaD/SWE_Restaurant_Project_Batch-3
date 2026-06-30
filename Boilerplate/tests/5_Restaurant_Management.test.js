const request = require('supertest');
const app = require('../server');

describe('Task 5: Restaurant Management', () => {
    let adminToken, customerToken, staffToken;
    let restaurantId;

    beforeAll(async () => {
        // Setup mock accounts
        await request(app).post('/api/auth/register').send({ email: 'admin_rm@test.com', password: 'pass', role: 'admin' });
        await request(app).post('/api/auth/register').send({ email: 'cust_rm@test.com', password: 'pass', role: 'customer' });
        await request(app).post('/api/auth/register').send({ email: 'staff_rm@test.com', password: 'pass', role: 'staff' });
        
        let res = await request(app).post('/api/auth/login').send({ email: 'admin_rm@test.com', password: 'pass' });
        adminToken = res.body?.token;
        res = await request(app).post('/api/auth/login').send({ email: 'cust_rm@test.com', password: 'pass' });
        customerToken = res.body?.token;
        res = await request(app).post('/api/auth/login').send({ email: 'staff_rm@test.com', password: 'pass' });
        staffToken = res.body?.token;
    });

    describe('5.1 Creating Restaurants (Admin Only)', () => {
        it('should return 401 Unauthorized if no token provided', async () => {
            const response = await request(app).post('/api/restaurants').send({ name: 'T1' });
            expect(response.statusCode).toBe(401);
        });

        it('should return 403 Forbidden for Customer', async () => {
            const response = await request(app).post('/api/restaurants').set('Authorization', `Bearer ${customerToken}`).send({ name: 'T1' });
            expect(response.statusCode).toBe(403);
        });

        it('should return 403 Forbidden for Staff', async () => {
            const response = await request(app).post('/api/restaurants').set('Authorization', `Bearer ${staffToken}`).send({ name: 'T1' });
            expect(response.statusCode).toBe(403);
        });

        it('should return 400 Bad Request if missing required fields (name, address)', async () => {
            const response = await request(app)
                .post('/api/restaurants')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ description: 'A test restaurant without name' }); // Missing Name
            expect(response.statusCode).toBe(400); 
            expect(response.body).toHaveProperty('error');
        });

        it('should successfully create restaurant as Admin via POST', async () => {
            const response = await request(app)
                .post('/api/restaurants')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ name: 'Pizza Palace', address: '123 Test Street' });
                
            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.name).toBe('Pizza Palace');
            restaurantId = response.body.id;
        });
    });

    describe('5.2 Reading Restaurants (Public & Pagination)', () => {
        it('should allow public access (No Token) to get all restaurants', async () => {
            const response = await request(app).get('/api/restaurants');
            expect(response.statusCode).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });

        it('should return specifically exactly limit=1 data utilizing pagination via query string', async () => {
            // Create a second restaurant to test pagination limits
            await request(app).post('/api/restaurants').set('Authorization', `Bearer ${adminToken}`).send({ name: 'Burger Joint', address: '456 Test Street' });
            
            const response = await request(app).get('/api/restaurants?limit=1&page=1');
            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBeLessThanOrEqual(1);
        });

        it('should retrieve a single restaurant by ID', async () => {
            // we will need restaurantId
            if(!restaurantId) expect(true).toBe(false); 

            const response = await request(app).get(`/api/restaurants/${restaurantId}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('id', restaurantId);
            expect(response.body).toHaveProperty('name', 'Pizza Palace');
        });

        it('should return 404 for an invalid/non-existent UUID parameter', async () => {
            const response = await request(app).get('/api/restaurants/123e4567-e89b-12d3-a456-426614174000');
            expect(response.statusCode).toBe(404);
        });
    });

    describe('5.3 Updating / Deleting Restaurants', () => {
        it('should allow admin to UPDATE their restaurant details', async () => {
            // Create a third rest for updating
            const createRes = await request(app).post('/api/restaurants').set('Authorization', `Bearer ${adminToken}`).send({ name: 'Sushi Bar', address: '1' });
            const restId = createRes.body?.id;

            const response = await request(app)
                .put(`/api/restaurants/${restId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ address: 'New Location 2' });
                
            expect(response.statusCode).toBe(200);
            expect(response.body.address).toBe('New Location 2');
        });

        it('should allow admin to DELETE a restaurant', async () => {
            const createRes = await request(app).post('/api/restaurants').set('Authorization', `Bearer ${adminToken}`).send({ name: 'To be deleted', address: '1' });
            const restId = createRes.body?.id;

            const delResponse = await request(app)
                .delete(`/api/restaurants/${restId}`)
                .set('Authorization', `Bearer ${adminToken}`);
            expect(delResponse.statusCode).toBe(200);

            const getResponse = await request(app).get(`/api/restaurants/${restId}`);
            expect(getResponse.statusCode).toBe(404);
        });
    });
});
