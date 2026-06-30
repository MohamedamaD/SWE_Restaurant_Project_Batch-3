const request = require('supertest');
const app = require('../server');

describe('Task 3: User Authentication & Validation', () => {
    const testUser = {
        name: 'Test Setup User',
        email: `auth_test_${Date.now()}@example.com`,
        password: 'Password123!',
        phone: '1234567890'
    };

    describe('3.1 User Registration (POST /api/auth/register)', () => {
        it('should return 400 Bad Request if email is invalid', async () => {
            const response = await request(app).post('/api/auth/register').send({ ...testUser, email: 'not-an-email' });
            expect(response.statusCode).toBe(400); 
            expect(response.body).toHaveProperty('error');
        });

        it('should return 400 Bad Request if password is too short', async () => {
            const response = await request(app).post('/api/auth/register').send({ ...testUser, password: 'short' });
            expect(response.statusCode).toBe(400);
        });

        it('should return 400 Bad Request if required fields are missing', async () => {
            const response = await request(app).post('/api/auth/register').send({ email: testUser.email });
            expect(response.statusCode).toBe(400); // Missing name, password
        });

        it('should successfully register a valid user and return 201', async () => {
            const response = await request(app).post('/api/auth/register').send(testUser);
            expect(response.statusCode).toBe(201);
            expect(response.body.user).toHaveProperty('email', testUser.email);
            // Security Check
            expect(response.body.user).not.toHaveProperty('password');
        });

        it('should prevent registering an email that already exists', async () => {
            const response = await request(app).post('/api/auth/register').send(testUser);
            expect(response.statusCode).toBe(409); // Conflict
            expect(response.body).toHaveProperty('error');
        });
    });

    describe('3.2 User Login (POST /api/auth/login)', () => {
        it('should return 400 if email or password are not provided', async () => {
            const response = await request(app).post('/api/auth/login').send({ email: testUser.email });
            expect(response.statusCode).toBe(400); // Missing password
        });

        it('should return 401 Unauthorized for non-existent email', async () => {
            const response = await request(app).post('/api/auth/login').send({ email: 'fake@example.com', password: 'Password123!' });
            expect(response.statusCode).toBe(401);
        });

        it('should return 401 Unauthorized for incorrect password', async () => {
            const response = await request(app).post('/api/auth/login').send({ email: testUser.email, password: 'WrongPassword' });
            expect(response.statusCode).toBe(401);
        });

        it('should successfully login and return a JWT token', async () => {
            const response = await request(app).post('/api/auth/login').send({ email: testUser.email, password: testUser.password });
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('token');
            
            // Validate Token Structure (Header.Payload.Signature)
            const tokenParts = response.body.token.split('.');
            expect(tokenParts.length).toBe(3);
        });
    });
});
