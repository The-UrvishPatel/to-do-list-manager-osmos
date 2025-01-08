const taskManager = require("../models/taskModel");
const Invalid = require("../errors/invalid");
const { StatusCodes } = require("http-status-codes");

const markTaskComplete = (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ response: "error", message: "Task ID is required" });
    throw new Invalid(StatusCodes.BAD_REQUEST, "Task ID is required");
  }

  try {
    const updatedTask = taskManager.markTaskComplete(Number(id)); // Convert string id to number
    return res
      .status(200)
      .json({ response: "success", message: "Task updated" });
  } catch (error) {
    return res
      .status(error.statusCode)
      .json({ response: "error", message: error.message });
    throw new Invalid(error.statusCode, error.message);
  }
};

module.exports = markTaskComplete;
