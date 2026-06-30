describe('Task 11: Realtime Notifications (Socket.io) & Structure', () => {

    describe('11.1 Socket Service Export & Injection', () => {
        it('should export an initializeSocket function that accepts the HTTP server', () => {
            const socketService = require('../services/socket.service');
            expect(typeof socketService.initializeSocket).toBe('function');
        });

        it('should expose event emitting functions (e.g., emitNewOrder, emitReservationStatus)', () => {
            const socketService = require('../services/socket.service');
            // We expect the student to have implemented ways for controllers to trigger socket events
            expect(typeof socketService.emitNewOrder).toBe('function');
            expect(typeof socketService.emitReservationStatus).toBe('function');
        });
    });

    describe('11.2 Socket Authentication Logic', () => {
        it('should contain a verify JWT logic inside the socket middleware', () => {
            // This is a static/structural check hint for Auto-Grader
            const fs = require('fs');
            const path = require('path');
            const servicePath = path.join(__dirname, '../services/socket.service.js');
            
            if (fs.existsSync(servicePath)) {
                const code = fs.readFileSync(servicePath, 'utf8');
                // The code must use socket.io middleware: io.use(...)
                expect(code).toMatch(/io\.use/);
                // The code must verify token: jwt.verify(...)
                expect(code).toMatch(/jwt\.verify/);
            }
        });
    });

    describe('11.3 Room Assignment', () => {
        it('should group staff/admins into a "staff" room upon connection', () => {
             // Static Grader check
             const fs = require('fs');
             const path = require('path');
             const servicePath = path.join(__dirname, '../services/socket.service.js');
             
             if (fs.existsSync(servicePath)) {
                 const code = fs.readFileSync(servicePath, 'utf8');
                 // Must check role and join string
                 expect(code).toMatch(/\.join\(['"`]?staff['"`]?\)/);
             }
        });
    });
});
