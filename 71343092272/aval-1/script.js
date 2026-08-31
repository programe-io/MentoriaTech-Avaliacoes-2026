const STORAGE_KEY = "gerenciador-tarefas-v1";

let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
let currentFilter = "todas";

const taskInput = document.querySelector("#taskInput");
const priorityInput = document.querySelector("#priorityInput");
const addButton = document.querySelector("#addButton");
const taskList = document.querySelector("#taskList");
const emptyState = document.querySelector("#emptyState");
const template = document.querySelector("#taskTemplate");
const progressText = document.querySelector("#progressText");
const progressFill = document.querySelector("#progressFill");

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function addTask() {
  const title = taskInput.value.trim();
  if (!title) {
    taskInput.focus();
    return;
  }

  tasks.unshift({
    id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
    title,
    priority: priorityInput.value,
    completed: false
  });

  taskInput.value = "";
  priorityInput.value = "media";
  save();
  render();
  taskInput.focus();
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  save();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  save();
  render();
}

function clearCompleted() {
  tasks = tasks.filter(task => !task.completed);
  save();
  render();
}

function getVisibleTasks() {
  if (currentFilter === "pendentes") return tasks.filter(t => !t.completed);
  if (currentFilter === "concluidas") return tasks.filter(t => t.completed);
  return tasks;
}

function render() {
  taskList.innerHTML = "";
  const visible = getVisibleTasks();

  visible.forEach(task => {
    const element = template.content.cloneNode(true);
    const article = element.querySelector(".task");
    const checkbox = element.querySelector(".task-check");
    const title = element.querySelector(".task-title");
    const priority = element.querySelector(".priority");
    const deleteButton = element.querySelector(".delete");

    article.classList.toggle("done", task.completed);
    checkbox.checked = task.completed;
    title.textContent = task.title;
    priority.textContent = task.priority;
    priority.classList.add(`priority-${task.priority}`);

    checkbox.addEventListener("change", () => toggleTask(task.id));
    deleteButton.addEventListener("click", () => deleteTask(task.id));

    taskList.appendChild(element);
  });

  emptyState.classList.toggle("hidden", visible.length > 0);

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const percent = total ? Math.round((completed / total) * 100) : 0;
  progressText.textContent = `${percent}% concluído (${completed}/${total})`;
  progressFill.style.width = `${percent}%`;
}

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keydown", event => {
  if (event.key === "Enter") addTask();
});

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    currentFilter = button.dataset.filter;
    render();
  });
});

document.querySelector("#clearCompleted").addEventListener("click", clearCompleted);

render();
