const taskManager = require("../models/taskModel");
const Invalid = require("../errors/invalid");
const { StatusCodes } = require("http-status-codes");

const listTasks = (req, res) => {
  const { filter } = req.query; // Retrieve filter parameter from query string
  try {
    const tasks = taskManager.listTasks(filter); // Pass the filter (if any)
    return res
      .status(200)
      .json({ response: "success", message: "Here is the list!", list: tasks });
  } catch (error) {
    return res
      .status(error.statusCode)
      .json({ response: "error", message: error.message });
    throw new Invalid(error.statusCode, error.message);
  }
};

module.exports = listTasks;
