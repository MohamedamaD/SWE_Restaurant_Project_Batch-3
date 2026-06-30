const request = require('supertest');
const app = require('../server');

describe('Task 1: Project Setup & Core Configuration', () => {
    
    describe('1.1 Express App & Server Initialization', () => {
        it('should have an Express application exported from server.js', () => {
            expect(app).toBeDefined();
            expect(typeof app.use).toBe('function');
        });

        it('should have a working health check endpoint (GET /api/health)', async () => {
            const response = await request(app).get('/api/health');
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('status', 'UP');
        });
    });

    describe('1.2 Package Dependencies', () => {
        it('should have required dependencies in package.json', () => {
            const packageJson = require('../package.json');
            const deps = packageJson.dependencies || {};
            
            // Core Framework
            expect(deps).toHaveProperty('express');
            expect(deps).toHaveProperty('dotenv');
            // DB
            expect(deps).toHaveProperty('sequelize');
            expect(deps).toHaveProperty('mysql2');
            // Security & Validation
            expect(deps).toHaveProperty('joi');
            expect(deps).toHaveProperty('jsonwebtoken');
            expect(deps).toHaveProperty('bcrypt');
            expect(deps).toHaveProperty('cors');
        });
    });

    describe('1.3 Global Middlewares', () => {
        it('should handle JSON body parsing middleware', async () => {
            const response = await request(app)
                .post('/api/health') // any endpoint
                .send({ test: 'data' })
                .set('Content-Type', 'application/json');
                
            expect(response.statusCode).not.toBe(500); // Should not crash
        });

        it('should have a global error handling middleware (Catch-all 404 & 500)', async () => {
            const response = await request(app).get('/api/this-route-does-not-exist');
            // Students must implement a 404 middleware
            expect(response.statusCode).toBe(404);
            expect(response.body).toHaveProperty('error');
        });
    });
});
