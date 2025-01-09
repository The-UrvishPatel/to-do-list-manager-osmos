const request = require("supertest");
const express = require("express");
const deleteTask = require("../src/controllers/deleteTask");
const addTask = require("../src/controllers/addTask");

const app = express();

// Middleware to parse JSON bodies in requests
app.use(express.json());

// Routes for adding a task and deleting a task
app.delete("/deleteTasks", deleteTask); // Route for deleting a task
app.post("/tasks", addTask); // Route for adding a new task

/**
 * Test suite for the "DELETE /tasks" route.
 * This suite tests various scenarios related to deleting tasks.
 */
describe("DELETE /tasks", () => {
  /**
   * Test case: Should delete a task when a valid id is provided.
   */
  it("should delete a task when a valid id is provided", async () => {
    const taskData = { description: "Test Task", dueDate: "2026-01-01" };

    // Create a new task to be deleted
    const newTask = await request(app).post("/tasks").send(taskData);

    const taskId = newTask.body.task.id;

    // Send DELETE request with valid task ID
    const response = await request(app).delete(`/deleteTasks?id=${taskId}`);

    // Assert that the task was deleted successfully
    expect(response.status).toBe(200);
    expect(response.body.response).toBe("success");
    expect(response.body.message).toBe(`Task with ID ${taskId} deleted.`);
  });

  /**
   * Test case: Should return an error if id is missing.
   */
  it("should return an error if id is missing", async () => {
    // Send DELETE request with no ID provided
    const response = await request(app).delete("/deleteTasks");

    // Assert that the response status is 400 (Bad Request)
    expect(response.status).toBe(400);
    // Assert that the error message indicates a missing task ID
    expect(response.body.message).toBe("Task ID is required");
  });

  /**
   * Test case: Should return an error if task with the provided id does not exist.
   */
  it("should return an error if task with provided id does not exist", async () => {
    // Send DELETE request with a non-existent task ID (9999)
    const response = await request(app).delete("/deleteTasks?id=9999");

    // Assert that the response status is 400 (Bad Request)
    expect(response.status).toBe(400);
    // Assert that the error message indicates that the task with the given ID was not found
    expect(response.body.message).toBe("Task with ID 9999 not found.");
  });
});
