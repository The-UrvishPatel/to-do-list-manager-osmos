const request = require("supertest");
const express = require("express");
const addTask = require("../src/controllers/addTask");
const app = express();

// Use express.json() middleware to parse JSON in request bodies
app.use(express.json());

// Define POST route for adding a task
app.post("/tasks", addTask);

/**
 * Test suite for the "POST /tasks" route.
 * This suite checks different scenarios for task creation, including validation checks.
 */
describe("POST /tasks", () => {
  /**
   * Test case: Should create a new task when description and dueDate are provided.
   */
  it("should create a new task when description and dueDate are provided", async () => {
    const taskData = { description: "Test Task", dueDate: "2025-05-01" };

    // Send POST request to the /tasks endpoint with valid task data
    const response = await request(app).post("/tasks").send(taskData);

    // Assert that the response status is 201 (Created)
    expect(response.status).toBe(201);
    // Assert that the response body contains the expected success response
    expect(response.body.response).toBe("success");
    // Assert that the message returned is "Task Created!"
    expect(response.body.message).toBe("Task Created!");
  });

  /**
   * Test case: Should return an error if description is missing.
   */
  it("should return an error if description is missing", async () => {
    const taskData = { dueDate: "2025-01-01" };

    // Send POST request to the /tasks endpoint with missing description
    const response = await request(app).post("/tasks").send(taskData);

    // Log the response for debugging purposes (remove in production)
    console.log(response.body);

    // Assert that the response status is 400 (Bad Request)
    expect(response.status).toBe(400);
    // Assert that the error message is about missing description
    expect(response.body.message).toBe("Description is required.");
  });

  /**
   * Test case: Should return an error if dueDate is missing.
   */
  it("should return an error if dueDate is missing", async () => {
    const taskData = { description: "Test Task" };

    // Send POST request to the /tasks endpoint with missing dueDate
    const response = await request(app).post("/tasks").send(taskData);

    // Assert that the response status is 400 (Bad Request)
    expect(response.status).toBe(400);
    // Assert that the error message is about missing due date
    expect(response.body.message).toBe("Due date is required.");
  });

  /**
   * Test case: Should return an error if dueDate is in the past.
   */
  it("should return an error if dueDate is in the past", async () => {
    const taskData = { description: "Test Task", dueDate: "2020-01-01" };

    // Send POST request to the /tasks endpoint with a past due date
    const response = await request(app).post("/tasks").send(taskData);

    // Assert that the response status is 400 (Bad Request)
    expect(response.status).toBe(400);
    // Assert that the error message is about the due date being in the past
    expect(response.body.message).toBe("Due date cannot be in the past.");
  });
});
