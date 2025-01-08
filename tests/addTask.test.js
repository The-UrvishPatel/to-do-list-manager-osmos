// const taskManager = require("../src/models/taskModel");
// const addTask = require("../src/controllers/addTask");
// const Invalid = require("../src/errors/invalid");

// describe("addTask", () => {
//   let req, res;

//   beforeEach(() => {
//     req = { body: {} };
//     res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
//   });

//   it("should add a task with valid data", () => {
//     req.body = { description: "Test Task", dueDate: "2099-12-31" };

//     addTask(req, res);

//     expect(res.status).toHaveBeenCalledWith(201);
//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         response: "success",
//         messsge: expect.objectContaining({
//           id: expect.any(Number),
//           description: "Test Task",
//           dueDate: "2099-12-31",
//           completed: false,
//         }),
//       })
//     );
//   });

//   it("should throw an error if description is missing", () => {
//     req.body = { dueDate: "2099-12-31" };

//     expect(() => addTask(req, res)).toThrowError(
//       new Invalid(400, "Description is required.")
//     );
//   });

//   it("should throw an error if due date is missing", () => {
//     req.body = { description: "Test Task" };

//     expect(() => addTask(req, res)).toThrowError(
//       new Invalid(400, "Due date is required.")
//     );
//   });

//   it("should throw an error if due date is in the past", () => {
//     req.body = { description: "Test Task", dueDate: "2000-01-01" };

//     expect(() => addTask(req, res)).toThrowError(
//       new Invalid(400, "Due date cannot be in the past.")
//     );
//   });
// });

const request = require("supertest");
const express = require("express");
const addTask = require("../src/controllers/addTask");
const app = express();

app.use(express.json());
app.post("/tasks", addTask);

describe("POST /tasks", () => {
  it("should create a new task when description and dueDate are provided", async () => {
    const taskData = { description: "Test Task", dueDate: "2025-05-01" };

    const response = await request(app).post("/tasks").send(taskData);

    expect(response.status).toBe(201);
    expect(response.body.response).toBe("success");
    expect(response.body.message).toBe("Task Created!");
  });

  it("should return an error if description is missing", async () => {
    const taskData = { dueDate: "2025-01-01" };

    const response = await request(app).post("/tasks").send(taskData);
    console.log(response.body);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Description is required.");
  });

  it("should return an error if dueDate is missing", async () => {
    const taskData = { description: "Test Task" };

    const response = await request(app).post("/tasks").send(taskData);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Due date is required.");
  });

  it("should return an error if dueDate is in the past", async () => {
    const taskData = { description: "Test Task", dueDate: "2020-01-01" };

    const response = await request(app).post("/tasks").send(taskData);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Due date cannot be in the past.");
  });
});
