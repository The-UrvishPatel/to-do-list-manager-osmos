const Invalid = require("../errors/invalid");
const { StatusCodes } = require("http-status-codes");

class Task {
  constructor(id, description, dueDate) {
    this.id = id;
    this.description = description;
    this.dueDate = dueDate;
    this.completed = false;
  }

  markComplete() {
    this.completed = true;
  }

  markPending() {
    this.completed = false;
  }
}

class TaskManager {
  constructor() {
    this.taskList = [];
    this.nextId = 1;
  }

  addTask(description, dueDate) {
    const newTask = new Task(this.nextId, description, dueDate);
    this.nextId = this.nextId + 1;
    this.taskList.push(newTask);
    console.log(this.taskList);
    return newTask;
  }

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

  listTasks(filter = null) {
    if (filter === "completed") {
      return this.taskList.filter((task) => task.completed);
    } else if (filter === "pending") {
      return this.taskList.filter((task) => !task.completed);
    }

    return this.taskList;
  }

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

const taskManager = new TaskManager();
// Object.freeze(taskManager);

module.exports = taskManager;
