const taskManager = require("../models/taskModel");
const Invalid = require("../errors/invalid");
const { StatusCodes } = require("http-status-codes");

/**
 * Handles the creation of a new task by validating input data and interacting with the taskManager.
 *
 * @param {Object} req - The request object containing the task details in the body.
 * @param {Object} res - The response object used to send back the result of the task creation.
 *
 * @returns {Object} - A JSON response indicating the success or failure of the task creation.
 */
const addTask = (req, res) => {
  const { description, dueDate } = req.body; // Destructure description and dueDate from the request body

  // Check if the description is provided
  if (!description) {
    return res
      .status(StatusCodes.BAD_REQUEST) // Return bad request if description is missing
      .json({ response: "error", message: "Description is required." });
    throw new Invalid(StatusCodes.BAD_REQUEST, "Description is required.");
  }

  // Check if the dueDate is provided
  if (!dueDate) {
    return res
      .status(StatusCodes.BAD_REQUEST) // Return bad request if due date is missing
      .json({ response: "error", message: "Due date is required." });
    throw new Invalid(StatusCodes.BAD_REQUEST, "Due date is required.");
  }

  // Validate that the due date is not in the past
  const currentDate = new Date(); // Get the current date
  const taskDueDate = new Date(dueDate); // Parse the provided due date

  // Reset the time part of the dates to 00:00:00 for both dates to only compare the date
  currentDate.setHours(0, 0, 0, 0);
  taskDueDate.setHours(0, 0, 0, 0);

  // Check if the task's due date is earlier than the current date
  if (taskDueDate < currentDate) {
    return res
      .status(StatusCodes.BAD_REQUEST) // Return bad request if due date is in the past
      .json({ response: "error", message: "Due date cannot be in the past." });
    throw new Invalid(
      StatusCodes.BAD_REQUEST,
      "Due date cannot be in the past."
    );
  }

  try {
    // Add the new task using the taskManager model
    const newTask = taskManager.addTask(description, dueDate);

    // Respond with a success message and the new task details
    return res
      .status(201) // HTTP status code 201 indicates successful creation
      .json({ response: "success", message: "Task Created!", task: newTask });
  } catch (error) {
    // In case of an error, return the error status and message
    return res
      .status(error.statusCode) // Use the error's status code
      .json({ response: "error", message: error.message });
    throw new Invalid(error.statusCode, error.message);
  }
};

module.exports = addTask;
