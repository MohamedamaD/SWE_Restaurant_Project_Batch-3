const request = require('supertest');
const app = require('../server');
const fs = require('fs');
const path = require('path');

describe('Task 12: Email Notifications (Nodemailer)', () => {

    describe('12.1 Nodemailer Service Configuration', () => {
        it('should have a configured nodemailer transporter and export sendEmail function', () => {
            const emailService = require('../services/email.service');
            expect(typeof emailService.sendEmail).toBe('function');
        });

        it('should use environment variables (SMTP_HOST, SMTP_PORT, etc) for configuration', () => {
            const servicePath = path.join(__dirname, '../services/email.service.js');
            if (fs.existsSync(servicePath)) {
                const code = fs.readFileSync(servicePath, 'utf8');
                expect(code).toMatch(/process\.env\.SMTP_HOST/);
                expect(code).toMatch(/process\.env\.SMTP_USER/);
                expect(code).toMatch(/process\.env\.SMTP_PASS/);
            }
        });
    });

    describe('12.2 Integration with Auth & Reservations', () => {
        it('should NOT block user registration if the email fails to send (Async logic)', async () => {
            // Even if SMTP is misconfigured locally, User creation MUST succeed.
            // The controller should await User.create() but MUST NOT fail if emailService throws.
            const response = await request(app)
                .post('/api/auth/register')
                .send({ 
                    name: 'Email Async Test', 
                    email: `async_${Date.now()}@test.com`, 
                    password: 'SecurePassword123!',
                    phone: '0123456789'
                });
                
            // Must still be 201 Created
            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('user');
        });

        it('should trigger sendEmail when a reservation status changes to confirmed', () => {
             // We statically inspect that the reservation controller calls sendEmail
             const ctrlPath = path.join(__dirname, '../controllers/reservation.controller.js');
             if (fs.existsSync(ctrlPath)) {
                 const code = fs.readFileSync(ctrlPath, 'utf8');
                 // Must import/require emailService
                 expect(code.toLowerCase()).toMatch(/email\.service/);
                 // status updating logic must call sendEmail
                 expect(code).toMatch(/sendEmail\(/);
             }
        });
    });
});
