const { StatusCodes } = require("http-status-codes");

/**
 * Middleware for handling 404 - Not Found errors.
 * This function sends a response when a requested route does not exist in the application.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 *
 * @returns {Object} - A response indicating that the route does not exist, with a 404 status code.
 */
const notFound = (req, res) =>
  res.status(StatusCodes.NOT_FOUND).send("Route does not exist!");

module.exports = notFound;
