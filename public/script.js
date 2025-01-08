const showStatus = (message, type) => {
  const statusBox = document.getElementById("statusBox");
  statusBox.textContent = message;
  statusBox.className = `status-box ${type}`;
  statusBox.style.display = "block";

  setTimeout(() => {
    statusBox.style.display = "none";
  }, 10000);
};

// Add Task
document
  .getElementById("addTaskForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("dueDate").value;

    try {
      const response = await axios.post("/api/todo/addTask", {
        description,
        dueDate,
      });
      showStatus("Task added successfully!", "success");
    } catch (error) {
      showStatus(
        "Failed to add task: " +
          (error.response?.data?.message || error.message),
        "error"
      );
    }
  });

// Delete Task
document
  .getElementById("deleteTaskForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const taskId = document.getElementById("taskIdDelete").value;

    try {
      await axios.delete(`/api/todo/deleteTask?id=${taskId}`);
      showStatus("Task deleted successfully!", "success");
    } catch (error) {
      console.log(error.response.data);
      showStatus(
        "Failed to delete task: " +
          (error.response?.data?.message || error.message),
        "error"
      );
    }
  });

// List Tasks
document
  .getElementById("listTasksForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const filter = document.getElementById("filter").value;

    try {
      const response = await axios.get("/api/todo/listTasks", {
        params: { filter },
      });
      const taskListDiv = document.getElementById("taskList");

      taskListDiv.innerHTML = response.data.list
        .map(
          (task) =>
            `<div>Task ID: ${task.id}, Description: ${task.description}, Due Date: ${task.dueDate}, Completed: ${task.completed}</div>`
        )
        .join("");
      showStatus("Tasks listed successfully!", "success");
    } catch (error) {
      showStatus(
        "Failed to list tasks: " +
          (error.response?.data?.message || error.message),
        "error"
      );
    }
  });

// Mark Task Complete
document
  .getElementById("markCompleteForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const taskId = document.getElementById("taskIdComplete").value;

    try {
      await axios.patch("/api/todo/markTaskComplete", { id: taskId });
      showStatus("Task marked as complete!", "success");
    } catch (error) {
      showStatus(
        "Failed to mark task as complete: " +
          (error.response?.data?.message || error.message),
        "error"
      );
    }
  });
