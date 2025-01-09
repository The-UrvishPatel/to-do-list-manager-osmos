const Invalid = require("../errors/invalid");
const { StatusCodes } = require("http-status-codes");

/**
 * Middleware for handling errors in the application.
 * This function intercepts errors and sends appropriate HTTP responses based on the error type.
 *
 * @param {Error} err - The error that was thrown during the request.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 *
 * @returns {Object} - A JSON response indicating the error and its corresponding status code.
 */
const errorHandler = (err, req, res, next) => {
  console.log(err); // Log the error details for debugging purposes

  // If the error is an instance of the Invalid class (custom error)
  if (err instanceof Invalid) {
    // Return the custom status code and message for Invalid errors
    return res
      .status(err.statusCode)
      .json({ response: "error", message: err.message });
  }

  // For any other unhandled errors, return a generic server error response
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR) // 500 Internal Server Error
    .send({ response: "error", message: "Something went wrong!" });
};

module.exports = errorHandler;
