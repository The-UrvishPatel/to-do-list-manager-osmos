const { StatusCodes } = require("http-status-codes");
const taskManager = require("../models/taskModel");
const Invalid = require("../errors/invalid");

const deleteTask = (req, res) => {
  const id = req.query.id;

  if (!id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ response: "error", message: "Task ID is required" });
    throw new Invalid(StatusCodes.BAD_REQUEST, "Task ID is required");
  }

  try {
    const success = taskManager.deleteTask(Number(id));
    return res
      .status(200)
      .json({ response: "success", message: `Task with ID ${id} deleted.` });
  } catch (error) {
    return res
      .status(error.statusCode)
      .json({ response: "error", message: error.message });
    throw new Invalid(error.statusCode, error.message);
  }
};

module.exports = deleteTask;
