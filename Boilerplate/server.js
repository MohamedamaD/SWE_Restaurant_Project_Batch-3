const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Basic route for testing server setup
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Export the app for testing purposes
// Students will add `app.listen` logic inside index.js or conditionally check if required
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
