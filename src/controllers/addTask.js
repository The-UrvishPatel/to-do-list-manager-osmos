const taskManager = require("../models/taskModel");
const Invalid = require("../errors/invalid");
const { StatusCodes } = require("http-status-codes");

const addTask = (req, res) => {
  const { description, dueDate } = req.body;

  // Check if the description or dueDate is missing
  if (!description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ response: "error", message: "Description is required." });
    throw new Invalid(StatusCodes.BAD_REQUEST, "Description is required.");
  }

  if (!dueDate) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ response: "error", message: "Due date is required." });
    throw new Invalid(StatusCodes.BAD_REQUEST, "Due date is required.");
  }

  // Check if the due date is in the past
  const currentDate = new Date();
  const taskDueDate = new Date(dueDate);

  // Reset the time part of the dates to 00:00:00 for both dates
  currentDate.setHours(0, 0, 0, 0);
  taskDueDate.setHours(0, 0, 0, 0);

  if (taskDueDate < currentDate) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ response: "error", message: "Due date cannot be in the past." });
    throw new Invalid(
      StatusCodes.BAD_REQUEST,
      "Due date cannot be in the past."
    );
  }

  try {
    const newTask = taskManager.addTask(description, dueDate);
    return res
      .status(201)
      .json({ response: "success", message: "Task Created!", task: newTask });
  } catch (error) {
    return res
      .status(error.statusCode)
      .json({ response: "error", message: error.message });
    throw new Invalid(error.statusCode, error.message);
  }
};

module.exports = addTask;
