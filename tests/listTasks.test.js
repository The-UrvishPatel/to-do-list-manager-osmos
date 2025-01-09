const request = require("supertest");
const express = require("express");
const listTasks = require("../src/controllers/listTasks");
const addTask = require("../src/controllers/addTask");
const markTaskComplete = require("../src/controllers/markTaskComplete");

const app = express();

// Middleware to parse JSON bodies in requests
app.use(express.json());

// Routes for listing tasks, adding a task, and marking a task as complete
app.get("/listTasks", listTasks); // Route for listing tasks
app.post("/tasks", addTask); // Route for adding a new task
app.patch("/markComplete", markTaskComplete); // Route for marking a task as complete

/**
 * Test suite for the "GET /tasks" route.
 * This suite tests different scenarios for listing tasks, including applying filters.
 */
describe("GET /tasks", () => {
  /**
   * Test case: Should return all tasks when no filter is applied.
   */
  it("should return all tasks when no filter is applied", async () => {
    const taskData1 = { description: "Test Task 1", dueDate: "2026-05-01" };
    const taskData2 = { description: "Test Task 2", dueDate: "2026-06-01" };

    // Create two tasks
    await request(app).post("/tasks").send(taskData1);
    await request(app).post("/tasks").send(taskData2);

    // Send GET request to list all tasks
    const response = await request(app).get("/listTasks");

    // Assert that the response status is 200 (OK)
    expect(response.status).toBe(200);
    // Assert that the response contains two tasks
    expect(response.body.list.length).toBe(2);
  });

  /**
   * Test case: Should return only completed tasks when "completed" filter is applied.
   */
  it('should return only completed tasks when "completed" filter is applied', async () => {
    const taskData = { description: "Test Task 3", dueDate: "2026-07-01" };

    // Create a task and mark it as complete
    const newTask = await request(app).post("/tasks").send(taskData);
    const taskId = newTask.body.task.id;

    // Mark the task as completed
    await request(app).patch("/markComplete").send({ id: taskId });

    // Send GET request with the "completed" filter
    const response = await request(app).get("/listTasks?filter=completed");

    // Assert that the response status is 200 (OK)
    expect(response.status).toBe(200);
    // Assert that only completed tasks are returned
    expect(response.body.list.length).toBe(1);
    expect(response.body.list[0].completed).toBe(true);
  });

  /**
   * Test case: Should return only pending tasks when "pending" filter is applied.
   */
  it('should return only pending tasks when "pending" filter is applied', async () => {
    const taskData = { description: "Test Task 4", dueDate: "2026-09-01" };

    // Create a task
    const newTask = await request(app).post("/tasks").send(taskData);
    const taskId = newTask.body.task.id;

    // Send GET request with the "pending" filter
    const response = await request(app).get("/listTasks?filter=pending");

    // Assert that the response status is 200 (OK)
    expect(response.status).toBe(200);
    // Assert that only pending tasks are returned
    expect(response.body.list.length).toBe(3);
    expect(response.body.list[0].completed).toBe(false);
  });
});
