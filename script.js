// Define variables
const container = document.getElementById("container");
const form = document.getElementById("form");
const input = document.getElementById("input");
const addTaskBtn = document.getElementById("add-task-btn");
const tasks = document.getElementById("tasks");

// Load tasks from localStorage
const localStorageTasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Add event listener to form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTask();
});

// Add task function
function addTask() {
  const task = input.value;
  if (task) {
    const taskEl = document.createElement("div");
    taskEl.classList.add("task");
    taskEl.innerHTML = `
    <div class="listContainer">
      <p>${task}</p>
      <button class="delete-btn">Delete</button>
    </div>
    `;

    const deleteBtn = taskEl.querySelector(".delete-btn");
    const p = taskEl.querySelector("p");
    const listContainer = taskEl.querySelector(".listContainer");

    // Styling
    if (listContainer) {
      listContainer.style.display = "flex";
      listContainer.style.justifyContent = "space-between";
      listContainer.style.alignItems = "center";
      listContainer.style.padding = "20px";
      listContainer.style.margin = "10px 0";
      listContainer.style.borderRadius = "5px";
    }

    if (deleteBtn) {
      deleteBtn.style.fontSize = "12px";
      deleteBtn.style.width = "70px";
      deleteBtn.style.padding = "10px";
      deleteBtn.style.border = "none";
      deleteBtn.style.backgroundColor = "red";
      deleteBtn.style.color = "white";
      deleteBtn.style.alignItems = "center";
    }

    if (p) {
      p.style.fontSize = "20px";
      p.style.fontWeight = "bold";
      p.style.color = "white";
    }

    tasks.appendChild(taskEl);
    input.value = "";

    // Add task to localStorage and update the list
    localStorageTasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
  }
}

// Add event listener to tasks for delete button
tasks.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const taskEl = e.target.parentElement.parentElement;
    taskEl.remove();

    // Get task text to remove it from localStorage
    const taskText = e.target.previousElementSibling.textContent;
    const index = localStorageTasks.indexOf(taskText);
    if (index > -1) {
      localStorageTasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
    }
  }
});

// Load tasks from localStorage when the page loads
document.addEventListener("DOMContentLoaded", () => {
  if (localStorageTasks.length > 0) {
    localStorageTasks.forEach((task) => {
      const taskEl = document.createElement("div");
      taskEl.classList.add("task");
      taskEl.innerHTML = `
          <div class="listContainer">
          <p>${task}</p>
          <button class="delete-btn">Delete</button>
          </div>
      `;
      const deleteBtn = taskEl.querySelector(".delete-btn");
      const p = taskEl.querySelector("p");
      const listContainer = taskEl.querySelector(".listContainer");

      // Styling
      if (listContainer) {
        listContainer.style.display = "flex";
        listContainer.style.justifyContent = "space-between";
        listContainer.style.alignItems = "center";
        listContainer.style.padding = "20px";
        listContainer.style.margin = "10px 0";
        listContainer.style.borderRadius = "5px";
      }

      if (deleteBtn) {
        deleteBtn.style.fontSize = "12px";
        deleteBtn.style.width = "70px";
        deleteBtn.style.padding = "10px";
        deleteBtn.style.border = "none";
        deleteBtn.style.backgroundColor = "red";
        deleteBtn.style.color = "white";
        deleteBtn.style.alignItems = "center";
      }

      if (p) {
        p.style.fontSize = "20px";
        p.style.fontWeight = "bold";
        p.style.color = "white";
      }

      tasks.appendChild(taskEl);
    });
  }
});
