/**
 * Custom Error class to represent an Invalid request or operation.
 * This class extends the built-in `Error` class and includes a statusCode.
 */
class Invalid extends Error {
  /**
   * Creates an instance of the Invalid error.
   *
   * @param {number} statusCode - The HTTP status code to associate with the error (e.g., 400 for bad request).
   * @param {string} message - The error message to be provided.
   */
  constructor(statusCode, message) {
    super(message); // Call the parent class constructor to set the message
    this.statusCode = statusCode; // Set the custom status code for the error
  }
}

module.exports = Invalid;
