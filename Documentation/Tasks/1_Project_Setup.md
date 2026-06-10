# Feature 1: Project Setup & Configuration

## Objective
Initialize the Node.js project, install the required dependencies, and set up the basic folder structure and environment configuration.

## Requirements

1. **Initialize Project:**
   - Create a `package.json` file.
   - Install the following dependencies: `express`, `sequelize`, `mysql2`, `dotenv`, `cors`, `helmet`.
   - Install dev dependencies: `nodemon`.
2. **Project Structure:**
   - Create the following folders: `config`, `controllers`, `models`, `routes`, `middlewares`, `services`, `utils`.
3. **Server Setup:**
   - Create an `index.js` (or `server.js`) file.
   - Initialize an Express application.
   - Configure global middlewares: `cors`, `express.json()`, `express.urlencoded()`.
   - Start the server on a port defined in the environment variables (fallback: 3000).
4. **Environment Variables:**
   - Create a `.env` file containing application and database credentials.
   - Create a `.env.example` file for reference.
5. **Database Configuration:**
   - Inside `config/database.js`, configure a Sequelize instance to connect to the MySQL database using credentials from the `.env` file.
   - Implement a script or a self-executing function to test the database connection and log the result.

## Definition of Done
- `npm start` or `npm run dev` successfully starts the server without errors.
- A log message confirms a successful connection to the MySQL database.
- Directory structure matches the specifications.
