const request = require('supertest');
const app = require('../server');

describe('Task 8: Reservation System (Complex Logic & Overlaps)', () => {
    let adminToken, customerToken, customer2Token;
    let restaurantId, table4Id, table2Id, reservationId;

    beforeAll(async () => {
        // Setup Users
        await request(app).post('/api/auth/register').send({ email: 'admin_res@test.com', password: 'pass', role: 'admin' });
        await request(app).post('/api/auth/register').send({ email: 'cust_res1@test.com', password: 'pass', role: 'customer' });
        await request(app).post('/api/auth/register').send({ email: 'cust_res2@test.com', password: 'pass', role: 'customer' });
        
        let res = await request(app).post('/api/auth/login').send({ email: 'admin_res@test.com', password: 'pass' });
        adminToken = res.body?.token;
        res = await request(app).post('/api/auth/login').send({ email: 'cust_res1@test.com', password: 'pass' });
        customerToken = res.body?.token;
        res = await request(app).post('/api/auth/login').send({ email: 'cust_res2@test.com', password: 'pass' });
        customer2Token = res.body?.token;

        // Setup Restaurant & Tables
        const restRes = await request(app).post('/api/restaurants').set('Authorization', `Bearer ${adminToken}`).send({ name: 'Res Rest', address: '1' });
        restaurantId = restRes.body?.id;

        const t4 = await request(app).post('/api/tables').set('Authorization', `Bearer ${adminToken}`).send({ restaurant_id: restaurantId, table_number: 1, capacity: 4 });
        table4Id = t4.body?.id;

        const t2 = await request(app).post('/api/tables').set('Authorization', `Bearer ${adminToken}`).send({ restaurant_id: restaurantId, table_number: 2, capacity: 2 });
        table2Id = t2.body?.id;
    });

    describe('8.1 Creating Reservations & Capacity Logic', () => {
        it('should return 400 Bad Request if missing fields (date, time, table_id, guests)', async () => {
            const response = await request(app)
                .post('/api/reservations')
                .set('Authorization', `Bearer ${customerToken}`)
                .send({ reservation_date: '2026-10-10' }); // missing time, table_id
                
            expect(response.statusCode).toBe(400); 
            expect(response.body).toHaveProperty('error');
        });

        it('should return 400 Bad Request if guests_count exceeds table capacity', async () => {
            const response = await request(app)
                .post('/api/reservations')
                .set('Authorization', `Bearer ${customerToken}`)
                .send({
                    table_id: table2Id, // Capacity is 2
                    reservation_date: '2026-10-10',
                    start_time: '18:00',
                    end_time: '20:00',
                    guests_count: 5 // Exceeds capacity
                });
                
            expect(response.statusCode).toBe(400);
            expect(response.body.error.toLowerCase()).toContain('capacity');
        });

        it('should return 400 Bad Request if end_time is before or equal to start_time', async () => {
            const response = await request(app)
                .post('/api/reservations')
                .set('Authorization', `Bearer ${customerToken}`)
                .send({
                    table_id: table4Id,
                    reservation_date: '2026-10-10',
                    start_time: '20:00',
                    end_time: '18:00', // Invalid
                    guests_count: 2
                });
            expect(response.statusCode).toBe(400);
        });

        it('should successfully create a valid reservation', async () => {
            const response = await request(app)
                .post('/api/reservations')
                .set('Authorization', `Bearer ${customerToken}`)
                .send({
                    table_id: table4Id,
                    reservation_date: '2026-10-10',
                    start_time: '18:00',
                    end_time: '20:00',
                    guests_count: 3
                });
                
            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body).toHaveProperty('status', 'pending');
            reservationId = response.body.id;
        });
    });

    describe('8.2 Overlapping Reservations Logic', () => {
        it('should return 409 Conflict if another customer tries to book the same exact time', async () => {
            const response = await request(app)
                .post('/api/reservations')
                .set('Authorization', `Bearer ${customer2Token}`)
                .send({
                    table_id: table4Id,
                    reservation_date: '2026-10-10',
                    start_time: '18:00',
                    end_time: '20:00',
                    guests_count: 2
                });
                
            expect(response.statusCode).toBe(409); // Conflict
            expect(response.body.error.toLowerCase()).toContain('overlap');
        });

        it('should return 409 Conflict for partial time overlap (intersects start)', async () => {
            const response = await request(app)
                .post('/api/reservations')
                .set('Authorization', `Bearer ${customer2Token}`)
                .send({
                    table_id: table4Id,
                    reservation_date: '2026-10-10',
                    start_time: '17:00',
                    end_time: '18:30', // overlaps 18:00 to 20:00
                    guests_count: 2
                });
            expect(response.statusCode).toBe(409);
        });

        it('should allow booking the same table on the same date at a DIFFERENT non-overlapping time', async () => {
            const response = await request(app)
                .post('/api/reservations')
                .set('Authorization', `Bearer ${customer2Token}`)
                .send({
                    table_id: table4Id,
                    reservation_date: '2026-10-10',
                    start_time: '20:00', // Matches previous end_time, valid depending on strict < vs <=
                    end_time: '22:00',
                    guests_count: 2
                });
            // Auto Grader expects either 201 or 409 if strict bounding, but standard logic accepts adjacent
            expect([201, 200]).toContain(response.statusCode); 
        });
    });

    describe('8.3 Reading & Updating Reservation Status', () => {
        it('should return a list of Customer 1 own reservations', async () => {
            const response = await request(app).get('/api/reservations').set('Authorization', `Bearer ${customerToken}`);
            expect(response.statusCode).toBe(200);
            expect(response.body.some(r => r.id === reservationId)).toBe(true);
        });

        it('should NOT return Customer 1 reservations when Customer 2 requests their list', async () => {
            const response = await request(app).get('/api/reservations').set('Authorization', `Bearer ${customer2Token}`);
            expect(response.statusCode).toBe(200);
            expect(response.body.some(r => r.id === reservationId)).toBe(false); // Shouldn't see customer 1's book
        });

        it('should return 403 Forbidden if a Customer attempts to CONFIRM their reservation', async () => {
            const response = await request(app)
                .patch(`/api/reservations/${reservationId}/status`)
                .set('Authorization', `Bearer ${customerToken}`)
                .send({ status: 'confirmed' });
                
            expect(response.statusCode).toBe(403); 
        });

        it('should allow a Customer to CANCEL their own pending reservation', async () => {
            const response = await request(app)
                .patch(`/api/reservations/${reservationId}/status`)
                .set('Authorization', `Bearer ${customerToken}`)
                .send({ status: 'cancelled' });
                
            expect(response.statusCode).toBe(200);
        });

        it('should allow Staff/Admin to CONFIRM a reservation', async () => {
            const response = await request(app)
                .patch(`/api/reservations/${reservationId}/status`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ status: 'confirmed' });
                
            expect(response.statusCode).toBe(200);
            expect(response.body.status).toBe('confirmed');
        });
    });
});
