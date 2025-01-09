const taskManager = require("../models/taskModel");
const Invalid = require("../errors/invalid");
const { StatusCodes } = require("http-status-codes");

/**
 * Marks a task as complete based on the provided task ID.
 * Validates the input and interacts with the taskManager to update the task status.
 *
 * @param {Object} req - The request object, which contains the task ID in the request body.
 * @param {Object} res - The response object, used to send back the result of the task update.
 *
 * @returns {Object} - A JSON response indicating the success or failure of the task update.
 */
const markTaskComplete = (req, res) => {
  const { id } = req.body; // Extract the task ID from the request body

  // Check if the task ID is provided
  if (!id) {
    return res
      .status(StatusCodes.BAD_REQUEST) // Return a 400 Bad Request if the task ID is missing
      .json({ response: "error", message: "Task ID is required" });
    throw new Invalid(StatusCodes.BAD_REQUEST, "Task ID is required");
  }

  try {
    // Attempt to mark the task as complete using the taskManager
    const updatedTask = taskManager.markTaskComplete(Number(id)); // Convert the string ID to a number

    // Respond with a success message upon successful update
    return res
      .status(200) // HTTP status code 200 indicates successful task update
      .json({ response: "success", message: "Task updated" });
  } catch (error) {
    // In case of an error, return the error status and message
    return res
      .status(error.statusCode) // Use the error's status code
      .json({ response: "error", message: error.message });
    throw new Invalid(error.statusCode, error.message);
  }
};

module.exports = markTaskComplete;
