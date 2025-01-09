/**
 * Displays a status message in the status box with a specified type.
 *
 * @param {string} message - The message to be displayed in the status box.
 * @param {string} type - The type of message ('success' or 'error') which determines the styling of the status box.
 */
const showStatus = (message, type) => {
  const statusBox = document.getElementById("statusBox");
  statusBox.textContent = message;
  statusBox.className = `status-box ${type}`;
  statusBox.style.display = "block";

  // Hide the status box after 5 seconds
  setTimeout(() => {
    statusBox.style.display = "none";
  }, 5000);
};

// Add Task
document
  .getElementById("addTaskForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    // Fetch input values for task description and due date
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("dueDate").value;

    try {
      // Send POST request to add a task
      const response = await axios.post("/api/todo/addTask", {
        description,
        dueDate,
      });
      showStatus("Task added successfully!", "success");
    } catch (error) {
      // Display error message if task addition fails
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

    // Fetch task ID to be deleted
    const taskId = document.getElementById("taskIdDelete").value;

    try {
      // Send DELETE request to remove the task
      await axios.delete(`/api/todo/deleteTask?id=${taskId}`);
      showStatus("Task deleted successfully!", "success");
    } catch (error) {
      // Display error message if task deletion fails
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

    // Fetch filter value to list tasks
    const filter = document.getElementById("filter").value;

    try {
      // Send GET request to fetch tasks based on the filter
      const response = await axios.get("/api/todo/listTasks", {
        params: { filter },
      });
      const taskListDiv = document.getElementById("taskList");

      // Display tasks in the task list
      taskListDiv.innerHTML = response.data.list
        .map(
          (task) =>
            `<div>Task ID: ${task.id}, Description: ${task.description}, Due Date: ${task.dueDate}, Completed: ${task.completed}</div>`
        )
        .join("");
      showStatus("Tasks listed successfully!", "success");
    } catch (error) {
      // Display error message if task listing fails
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

    // Fetch task ID to mark as complete
    const taskId = document.getElementById("taskIdComplete").value;

    try {
      // Send PATCH request to mark the task as complete
      await axios.patch("/api/todo/markTaskComplete", { id: taskId });
      showStatus("Task marked as complete!", "success");
    } catch (error) {
      // Display error message if marking task complete fails
      showStatus(
        "Failed to mark task as complete: " +
          (error.response?.data?.message || error.message),
        "error"
      );
    }
  });
