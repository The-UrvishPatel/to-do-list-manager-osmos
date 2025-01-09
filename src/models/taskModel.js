const Invalid = require("../errors/invalid");
const { StatusCodes } = require("http-status-codes");

/**
 * Class representing a Task.
 */
class Task {
  /**
   * Create a new Task.
   *
   * @param {number} id - The unique identifier for the task.
   * @param {string} description - The description of the task.
   * @param {string} dueDate - The due date for the task.
   */
  constructor(id, description, dueDate) {
    this.id = id;
    this.description = description;
    this.dueDate = dueDate;
    this.completed = false;
  }

  /**
   * Mark the task as completed.
   */
  markComplete() {
    this.completed = true;
  }

  /**
   * Mark the task as pending (not completed).
   */
  markPending() {
    this.completed = false;
  }
}

/**
 * Class for managing tasks.
 */
class TaskManager {
  /**
   * Create a TaskManager instance.
   * Initializes taskList and sets the nextId to 1.
   */
  constructor() {
    this.taskList = [];
    this.nextId = 1;
  }

  /**
   * Add a new task to the task list.
   *
   * @param {string} description - The description of the new task.
   * @param {string} dueDate - The due date for the new task.
   * @returns {Task} - The newly created task.
   */
  addTask(description, dueDate) {
    const newTask = new Task(this.nextId, description, dueDate);
    this.nextId = this.nextId + 1;
    this.taskList.push(newTask);
    console.log(this.taskList);
    return newTask;
  }

  /**
   * Mark a task as complete by its ID.
   *
   * @param {number} id - The ID of the task to mark as complete.
   * @returns {Task} - The updated task.
   * @throws {Invalid} - Throws an error if the task with the given ID is not found.
   */
  markTaskComplete(id) {
    const task = this.taskList.find((task) => task.id === id);

    if (!task) {
      throw new Invalid(
        StatusCodes.BAD_REQUEST,
        `Task with ID ${id} not found.`
      );
    }

    task.markComplete();
    console.log(task);
    return task;
  }

  /**
   * List all tasks or filter them by their status (completed or pending).
   *
   * @param {string} [filter=null] - Filter the tasks by status: "completed" or "pending".
   * @returns {Task[]} - A list of tasks that match the filter.
   */
  listTasks(filter = null) {
    if (filter === "completed") {
      return this.taskList.filter((task) => task.completed);
    } else if (filter === "pending") {
      return this.taskList.filter((task) => !task.completed);
    }

    return this.taskList;
  }

  /**
   * Delete a task by its ID.
   *
   * @param {number} id - The ID of the task to delete.
   * @returns {boolean} - Returns true if the task was deleted successfully.
   * @throws {Invalid} - Throws an error if the task with the given ID is not found.
   */
  deleteTask(id) {
    const index = this.taskList.findIndex((task) => task.id === id);

    if (index === -1) {
      throw new Invalid(
        StatusCodes.BAD_REQUEST,
        `Task with ID ${id} not found.`
      );
    }

    this.taskList.splice(index, 1);
    return true;
  }
}

// Create a new TaskManager instance
const taskManager = new TaskManager();
// Object.freeze(taskManager); // Optionally freeze the object to prevent modification

module.exports = taskManager;
