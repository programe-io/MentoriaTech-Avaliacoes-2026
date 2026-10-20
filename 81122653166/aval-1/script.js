const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("counter");
const clearButton = document.getElementById("clearButton");

function updateCounter() {
  const tasks = taskList.querySelectorAll("li");
  const pending = taskList.querySelectorAll(
    "li:not(.completed)"
  );

  counter.textContent =
    `${pending.length} tarefas pendentes de ${tasks.length}`;
}

function addTask(text) {
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  const span = document.createElement("span");
  const deleteButton = document.createElement("button");

  checkbox.type = "checkbox";
  checkbox.setAttribute("aria-label", "Concluir tarefa");

  span.textContent = text;
  deleteButton.textContent = "Excluir";
  deleteButton.type = "button";

  checkbox.addEventListener("change", () => {
    li.classList.toggle("completed", checkbox.checked);
    updateCounter();
  });

  deleteButton.addEventListener("click", () => {
    li.remove();
    updateCounter();
  });

  li.append(checkbox, span, deleteButton);
  taskList.appendChild(li);

  updateCounter();
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = taskInput.value.trim();

  if (!text) return;

  addTask(text);
  taskInput.value = "";
  taskInput.focus();
});

clearButton.addEventListener("click", () => {
  taskList.querySelectorAll(".completed").forEach((task) => {
    task.remove();
  });

  updateCounter();
});

updateCounter();