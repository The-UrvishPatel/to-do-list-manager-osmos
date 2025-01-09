const taskManager = require("../models/taskModel");
const Invalid = require("../errors/invalid");
const { StatusCodes } = require("http-status-codes");

/**
 * Retrieves a list of tasks based on an optional filter.
 * Validates the filter input and interacts with the taskManager to fetch the task list.
 *
 * @param {Object} req - The request object, which contains the filter parameter in the query string.
 * @param {Object} res - The response object, used to send back the list of tasks or an error message.
 *
 * @returns {Object} - A JSON response with the task list or an error message.
 */
const listTasks = (req, res) => {
  const { filter } = req.query; // Retrieve filter parameter from the query string

  try {
    // Fetch the tasks from the taskManager, applying the filter if provided
    const tasks = taskManager.listTasks(filter);

    // Respond with the list of tasks and a success message
    return res
      .status(200) // HTTP status code 200 indicates a successful request
      .json({ response: "success", message: "Here is the list!", list: tasks });
  } catch (error) {
    // In case of an error, return the error status and message
    return res
      .status(error.statusCode) // Use the error's status code
      .json({ response: "error", message: error.message });
    throw new Invalid(error.statusCode, error.message);
  }
};

module.exports = listTasks;
