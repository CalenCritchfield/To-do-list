document.addEventListener("DOMContentLoaded", loadTasks);

const addTaskButton = document.getElementById("add-task-btn");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

addTaskButton.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const taskItem = document.createElement("li");
  taskItem.innerHTML = `
<input type="checkbox" class="task-checkbox">
<span>${taskText}</span>
<button class="delete-btn">Delete</button>
`;

  taskList.appendChild(taskItem);
  saveTasks();
  taskInput.value = "";
}

taskList.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    e.target.parentElement.remove();
    saveTasks();
  } else if (e.target.classList.contains("task-checkbox")) {
    e.target.nextElementSibling.classList.toggle("completed");
    saveTasks();
  }
});

function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll("li").forEach((taskItem) => {
    tasks.push({
      text: taskItem.querySelector("span").textContent,
      completed: taskItem.querySelector(".task-checkbox").checked,
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks) {
    tasks.forEach((task) => {
      const taskItem = document.createElement("li");
      taskItem.innerHTML = `
  <input type="checkbox" class="task-checkbox" ${
    task.completed ? "checked" : ""
  }>
  <span class="${task.completed ? "completed" : ""}">${task.text}</span>
  <button class="delete-btn">Delete</button>
  `;
      taskList.appendChild(taskItem);
    });
  }
}
