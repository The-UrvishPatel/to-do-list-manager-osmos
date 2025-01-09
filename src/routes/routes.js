const express = require("express");
const router = express.Router();

// Import controller functions for task management
const addTask = require("../controllers/addTask");
const deleteTask = require("../controllers/deleteTask");
const listTasks = require("../controllers/listTasks");
const markTaskComplete = require("../controllers/markTaskComplete");

/**
 * @route POST /addTask
 * @description Add a new task to the task list
 * @access Public
 */
router.route("/addTask").post(addTask);

/**
 * @route DELETE /deleteTask
 * @description Delete a task by ID
 * @access Public
 */
router.route("/deleteTask").delete(deleteTask);

/**
 * @route GET /listTasks
 * @description Get a list of tasks, optionally filtered by status (completed/pending)
 * @access Public
 */
router.route("/listTasks").get(listTasks);

/**
 * @route PATCH /markTaskComplete
 * @description Mark a specific task as complete by its ID
 * @access Public
 */
router.route("/markTaskComplete").patch(markTaskComplete);

module.exports = router;
