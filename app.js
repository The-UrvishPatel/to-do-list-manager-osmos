require("express-async-errors"); // Allows for async errors to be handled by express middleware
const express = require("express");
const app = express();
const routes = require("./src/routes/routes"); // Importing routes for the application
const notFoundError = require("./src/middlewares/not-found"); // Middleware to handle 404 errors
const errorHandler = require("./src/middlewares/error-handlers"); // Middleware for handling other errors

// Middlewares for parsing and serving static files
app.use(express.static("public")); // Serves static files from the 'public' directory
app.use(express.json()); // Middleware to parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded requests

// Routes for handling API requests
app.use("/api/todo", routes); // All routes under "/api/todo" will be handled by the imported routes

// Error handling middlewares
app.use(notFoundError); // Handles 404 errors if no route is matched
app.use(errorHandler); // Handles other errors

// Define the port to listen on (either from environment or default to 3000)
const port = process.env.PORT || 3000;

// Start the server and log the listening port
app.listen(port, () => console.log(`Server is listening on port ${port}`));
