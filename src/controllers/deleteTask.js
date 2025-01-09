const { StatusCodes } = require("http-status-codes");
const taskManager = require("../models/taskModel");
const Invalid = require("../errors/invalid");

/**
 * Handles the deletion of a task based on the provided task ID.
 * Validates the input and interacts with the taskManager to delete the task.
 *
 * @param {Object} req - The request object, which contains the task ID in the query parameters.
 * @param {Object} res - The response object, used to send back the result of the task deletion.
 *
 * @returns {Object} - A JSON response indicating the success or failure of the task deletion.
 */
const deleteTask = (req, res) => {
  const id = req.query.id; // Extract the task ID from the query parameters

  // Check if the ID is provided
  if (!id) {
    return res
      .status(StatusCodes.BAD_REQUEST) // Return a 400 Bad Request if the task ID is missing
      .json({ response: "error", message: "Task ID is required" });
    throw new Invalid(StatusCodes.BAD_REQUEST, "Task ID is required");
  }

  try {
    // Attempt to delete the task using the taskManager, converting the ID to a number
    const success = taskManager.deleteTask(Number(id));

    // Respond with a success message upon successful deletion
    return res
      .status(200) // HTTP status code 200 indicates successful deletion
      .json({ response: "success", message: `Task with ID ${id} deleted.` });
  } catch (error) {
    // In case of an error (e.g., task not found), return the error status and message
    return res
      .status(error.statusCode) // Use the error's status code
      .json({ response: "error", message: error.message });
    throw new Invalid(error.statusCode, error.message);
  }
};

module.exports = deleteTask;
