const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];

// Get all tasks
app.get("/tasks", (req, res) => res.json(tasks));

// Add a task
app.post("/add-task", (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).json({ error: "Task required" });
  tasks.push(task);
  res.json({ tasks });
});

// Delete task
app.delete("/delete-task/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < tasks.length) tasks.splice(index, 1);
  res.json({ tasks });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

