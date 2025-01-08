// const taskManager = require("../src/models/taskModel");
// const markTaskComplete = require("../src/controllers/markTaskComplete");
// const Invalid = require("../src/errors/invalid");

// describe("markTaskComplete", () => {
//   let req, res;

//   beforeEach(() => {
//     req = { params: {} };
//     res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//     taskManager.taskList = [];
//     taskManager.addTask("Test Task", "2099-12-31");
//   });

//   it("should mark a task as complete with a valid ID", () => {
//     req.params.id = "1";

//     markTaskComplete(req, res);

//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         response: "success",
//         message: expect.objectContaining({
//           id: 1,
//           completed: true,
//         }),
//       })
//     );
//   });

//   it("should throw an error if task ID does not exist", () => {
//     req.params.id = "999";

//     expect(() => markTaskComplete(req, res)).toThrowError(
//       new Invalid(400, "Task with ID 999 not found.")
//     );
//   });
// });

const request = require("supertest");
const express = require("express");
const markTaskComplete = require("../src/controllers/markTaskComplete");
const addTask = require("../src/controllers/addTask");
const app = express();

app.use(express.json());
app.patch("/markComplete", markTaskComplete);
app.post("/tasks", addTask);

describe("PATCH /tasks/markComplete", () => {
  it("should mark a task as complete when a valid id is provided", async () => {
    const taskData = { description: "Test Task", dueDate: "2026-07-01" };
    const newTask = await request(app).post("/tasks").send(taskData);

    const taskId = newTask.body.task.id;

    const response = await request(app)
      .patch("/markComplete")
      .send({ id: taskId });

    console.log(response.body);

    expect(response.status).toBe(200);
    expect(response.body.response).toBe("success");
    expect(response.body.message).toBe("Task updated");
  });

  it("should return an error if id is missing", async () => {
    const response = await request(app).patch("/markComplete");

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Task ID is required");
  });

  it("should return an error if task with provided id does not exist", async () => {
    const response = await request(app)
      .patch("/markComplete")
      .send({ id: 9999 });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Task with ID 9999 not found.");
  });
});
