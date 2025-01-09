const request = require("supertest");
const express = require("express");
const markTaskComplete = require("../src/controllers/markTaskComplete");
const addTask = require("../src/controllers/addTask");

const app = express();

// Middleware to parse JSON bodies in requests
app.use(express.json());

// Routes for marking a task as complete and adding a new task
app.patch("/markComplete", markTaskComplete); // Route for marking a task as complete
app.post("/tasks", addTask); // Route for adding a new task

/**
 * Test suite for the "PATCH /tasks/markComplete" route.
 * This suite tests scenarios for marking a task as complete.
 */
describe("PATCH /tasks/markComplete", () => {
  /**
   * Test case: Should mark a task as complete when a valid id is provided.
   */
  it("should mark a task as complete when a valid id is provided", async () => {
    const taskData = { description: "Test Task", dueDate: "2026-07-01" };

    // Create a new task
    const newTask = await request(app).post("/tasks").send(taskData);
    const taskId = newTask.body.task.id;

    // Send PATCH request to mark the task as complete
    const response = await request(app)
      .patch("/markComplete")
      .send({ id: taskId });

    console.log(response.body); // Logs the response for debugging

    // Assert that the response status is 200 (OK)
    expect(response.status).toBe(200);
    // Assert that the response message indicates success and task update
    expect(response.body.response).toBe("success");
    expect(response.body.message).toBe("Task updated");
  });

  /**
   * Test case: Should return an error if id is missing.
   */
  it("should return an error if id is missing", async () => {
    // Send PATCH request without providing an id
    const response = await request(app).patch("/markComplete");

    // Assert that the response status is 400 (Bad Request)
    expect(response.status).toBe(400);
    // Assert that the error message indicates the missing id
    expect(response.body.message).toBe("Task ID is required");
  });

  /**
   * Test case: Should return an error if task with provided id does not exist.
   */
  it("should return an error if task with provided id does not exist", async () => {
    // Send PATCH request with a non-existent task ID
    const response = await request(app)
      .patch("/markComplete")
      .send({ id: 9999 });

    // Assert that the response status is 400 (Bad Request)
    expect(response.status).toBe(400);
    // Assert that the error message indicates the task was not found
    expect(response.body.message).toBe("Task with ID 9999 not found.");
  });
});
