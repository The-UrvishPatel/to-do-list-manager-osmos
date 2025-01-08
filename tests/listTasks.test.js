// const taskManager = require("../src/models/taskModel");
// const listTasks = require("../src/controllers/listTasks");

// describe("listTasks", () => {
//   let req, res;

//   beforeEach(() => {
//     req = { query: {} };
//     res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//     taskManager.taskList = [];
//     taskManager.addTask("Completed Task", "2099-12-31").markComplete();
//     taskManager.addTask("Pending Task", "2099-12-31");
//   });

//   it("should list all tasks", () => {
//     listTasks(req, res);

//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         response: "success",
//         message: expect.arrayContaining([
//           expect.objectContaining({ description: "Completed Task" }),
//           expect.objectContaining({ description: "Pending Task" }),
//         ]),
//       })
//     );
//   });

//   it("should list only completed tasks", () => {
//     req.query.filter = "completed";

//     listTasks(req, res);

//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         response: "success",
//         message: expect.arrayContaining([
//           expect.objectContaining({ description: "Completed Task" }),
//         ]),
//       })
//     );
//   });

//   it("should list only pending tasks", () => {
//     req.query.filter = "pending";

//     listTasks(req, res);

//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         response: "success",
//         message: expect.arrayContaining([
//           expect.objectContaining({ description: "Pending Task" }),
//         ]),
//       })
//     );
//   });
// });

const request = require("supertest");
const express = require("express");
const listTasks = require("../src/controllers/listTasks");
const addTask = require("../src/controllers/addTask");
const markTaskComplete = require("../src/controllers/markTaskComplete");

const app = express();

app.use(express.json());
app.get("/listTasks", listTasks);
app.post("/tasks", addTask);
app.patch("/markComplete", markTaskComplete);

describe("GET /tasks", () => {
  it("should return all tasks when no filter is applied", async () => {
    const taskData1 = { description: "Test Task 1", dueDate: "2026-05-01" };
    const taskData2 = { description: "Test Task 2", dueDate: "2026-06-01" };

    const resp = await request(app).post("/tasks").send(taskData1);
    await request(app).post("/tasks").send(taskData2);

    const response = await request(app).get("/listTasks");

    expect(response.status).toBe(200);
    expect(response.body.list.length).toBe(2);
  });

  it('should return only completed tasks when "completed" filter is applied', async () => {
    const taskData = { description: "Test Task 3", dueDate: "2026-07-01" };
    const newTask = await request(app).post("/tasks").send(taskData);

    const taskId = newTask.body.task.id;

    await request(app).patch("/markComplete").send({ id: taskId });

    const response = await request(app).get("/listTasks?filter=completed");

    expect(response.status).toBe(200);
    expect(response.body.list.length).toBe(1);
    expect(response.body.list[0].completed).toBe(true);
  });

  it('should return only pending tasks when "pending" filter is applied', async () => {
    const taskData = { description: "Test Task 4", dueDate: "2026-09-01" };
    const newTask = await request(app).post("/tasks").send(taskData);

    const taskId = newTask.body.task.id;

    const response = await request(app).get("/listTasks?filter=pending");

    expect(response.status).toBe(200);
    expect(response.body.list.length).toBe(3);
    expect(response.body.list[0].completed).toBe(false);
  });
});
