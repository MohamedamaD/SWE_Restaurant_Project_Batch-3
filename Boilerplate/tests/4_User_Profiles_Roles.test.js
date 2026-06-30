const request = require('supertest');
const app = require('../server');

describe('Task 4: User Profiles & RBAC', () => {
    let customerToken;
    let adminToken;
    let customerUserId;
    const testCustomer = { name: 'Customer User', email: `customer_${Date.now()}@test.com`, password: 'password123', role: 'customer' };
    const testAdmin = { name: 'Admin User', email: `admin_${Date.now()}@test.com`, password: 'adminpassword', role: 'admin' };

    beforeAll(async () => {
        // Register Accounts (Assuming endpoints work)
        await request(app).post('/api/auth/register').send(testCustomer);
        await request(app).post('/api/auth/register').send(testAdmin);
        
        let res = await request(app).post('/api/auth/login').send({ email: testCustomer.email, password: testCustomer.password });
        customerToken = res.body?.token;
        customerUserId = res.body?.user?.id; // assuming your login returns user object
        
        res = await request(app).post('/api/auth/login').send({ email: testAdmin.email, password: testAdmin.password });
        adminToken = res.body?.token;
    });

    describe('4.1 User Profiles (GET / PUT /api/users/profile)', () => {
        it('should return 401 Unauthorized when requesting profile without Token', async () => {
            const response = await request(app).get('/api/users/profile');
            expect(response.statusCode).toBe(401);
        });

        it('should retrieve the authenticated user profile details', async () => {
            const response = await request(app)
                .get('/api/users/profile')
                .set('Authorization', `Bearer ${customerToken}`);
                
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('email', testCustomer.email);
            expect(response.body).toHaveProperty('role', 'customer');
            expect(response.body).not.toHaveProperty('password'); // Password hidden
        });

        it('should allow user to update their own profile information', async () => {
            const response = await request(app)
                .put('/api/users/profile')
                .set('Authorization', `Bearer ${customerToken}`)
                .send({ name: 'Updated Name', phone: '0987654321' });
                
            expect(response.statusCode).toBe(200);
            expect(response.body.name).toBe('Updated Name');
            expect(response.body.phone).toBe('0987654321');
        });

        it('should hash the new password if user updates their password', async () => {
            const response = await request(app)
                .put('/api/users/profile')
                .set('Authorization', `Bearer ${customerToken}`)
                .send({ password: 'newSecurePassword!' });
                
            expect(response.statusCode).toBe(200);

            // Verify they can login with NEW password
            const loginRes = await request(app).post('/api/auth/login').send({ email: testCustomer.email, password: 'newSecurePassword!' });
            expect(loginRes.statusCode).toBe(200);
        });
    });

    describe('4.2 RBAC - Admin Endpoints (/api/admin/users)', () => {
        it('should deny 403 Forbidden to regular customer trying to access /api/admin/users', async () => {
            const response = await request(app)
                .get('/api/admin/users')
                .set('Authorization', `Bearer ${customerToken}`);
                
            expect(response.statusCode).toBe(403);
            expect(response.body).toHaveProperty('error');
        });

        it('should allow admin to get all users', async () => {
            const response = await request(app)
                .get('/api/admin/users')
                .set('Authorization', `Bearer ${adminToken}`);
                
            expect(response.statusCode).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(1);
        });

        it('should deny customer trying to update another user role', async () => {
            const response = await request(app)
                .put(`/api/admin/users/${customerUserId}/role`)
                .set('Authorization', `Bearer ${customerToken}`)
                .send({ role: 'staff' });
                
            expect(response.statusCode).toBe(403);
        });

        it('should allow admin to update a specific user role', async () => {
            // we will need customerUserId
            if(!customerUserId) {
                // To force failure if not implemented correctly during earlier setup
                expect(true).toBe(false); 
            }

            const response = await request(app)
                .put(`/api/admin/users/${customerUserId}/role`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ role: 'staff' });
                
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('role', 'staff');
        });
    });
});
