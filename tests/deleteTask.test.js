// const taskManager = require("../src/models/taskModel");
// const deleteTask = require("../src/controllers/deleteTask");
// const Invalid = require("../src/errors/invalid");

// describe("deleteTask", () => {
//   let req, res;

//   beforeEach(() => {
//     req = { params: {} };
//     res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
//   });

//   it("should delete a task with a valid ID", () => {
//     taskManager.addTask("Test Task", "2099-12-31");
//     req.params.id = "1";

//     deleteTask(req, res);

//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith({
//       response: "success",
//       message: "Task with ID 1 deleted.",
//     });
//   });

//   it("should throw an error if task ID does not exist", () => {
//     req.params.id = "999";

//     expect(() => deleteTask(req, res)).toThrowError(
//       new Invalid(400, "Task with ID 999 not found.")
//     );
//   });
// });

const request = require("supertest");
const express = require("express");
const deleteTask = require("../src/controllers/deleteTask");
const addTask = require("../src/controllers/addTask");

const app = express();

app.use(express.json());
app.delete("/deleteTasks", deleteTask);
app.post("/tasks", addTask);

describe("DELETE /tasks", () => {
  it("should delete a task when a valid id is provided", async () => {
    const taskData = { description: "Test Task", dueDate: "2026-01-01" };
    const newTask = await request(app).post("/tasks").send(taskData);

    const taskId = newTask.body.task.id;

    const response = await request(app).delete(`/deleteTasks?id=${taskId}`);

    expect(response.status).toBe(200);
    expect(response.body.response).toBe("success");
    expect(response.body.message).toBe(`Task with ID ${taskId} deleted.`);
  });

  it("should return an error if id is missing", async () => {
    const response = await request(app).delete("/deleteTasks");

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Task ID is required");
  });

  it("should return an error if task with provided id does not exist", async () => {
    const response = await request(app).delete("/deleteTasks?id=9999");

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Task with ID 9999 not found.");
  });
});
