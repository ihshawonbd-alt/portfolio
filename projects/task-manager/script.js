const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const API_URL = "https://portfolio-7gfo.onrender.com";


// Load tasks
async function loadTasks() {
  const res = await fetch(`${API_URL}/tasks`);
  const tasks = await res.json();
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center bg-secondary text-white";
    li.innerHTML = `${task}<button class="btn btn-sm btn-danger">Delete</button>`;
    li.querySelector("button").addEventListener("click", () => deleteTask(index));
    taskList.appendChild(li);
  });
}

// Add task
async function addTask() {
  const task = taskInput.value.trim();
  if (!task) return alert("Enter a task!");
  await fetch(`${API_URL}/add-task`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task })
  });
  taskInput.value = "";
  loadTasks();
}

// Delete task
async function deleteTask(index) {
  await fetch(`${API_URL}/delete-task/${index}`, { method: "DELETE" });
  loadTasks();
}

// Event listener
addTaskBtn.addEventListener("click", addTask);

// Load tasks on page load
loadTasks();