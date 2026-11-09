const form = document.querySelector("#taskForm");
const titleInput = document.querySelector("#taskTitle");
const priorityInput = document.querySelector("#taskPriority");
const taskList = document.querySelector("#taskList");
const emptyState = document.querySelector("#emptyState");
const formMessage = document.querySelector("#formMessage");
const titleHint = document.querySelector("#titleHint");

let tasks = loadTasks();
let currentFilter = "all";

const priorityNames = { 1: "Alta", 2: "Média", 3: "Baixa" };

document.querySelector("#todayDate").textContent = new Intl.DateTimeFormat("pt-BR", {
  weekday: "short", day: "2-digit", month: "short", year: "numeric"
}).format(new Date());

function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem("taskflow-tasks")) || [];
  } catch {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem("taskflow-tasks", JSON.stringify(tasks));
}

function showMessage(message, isError = true) {
  formMessage.textContent = message;
  formMessage.style.color = isError ? "#c06b42" : "#3e9b79";
}

function addTask(title, priority) {
  tasks.unshift({
    id: (crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random())),
    title,
    priority: Number(priority),
    completed: false,
    createdAt: new Date().toISOString()
  });
  saveTasks();
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
}

function changePriority(id, priority) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, priority: Number(priority) } : task
  );
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

function createTaskElement(task) {
  const article = document.createElement("article");
  article.className = `task-item${task.completed ? " completed" : ""}`;

  const checkButton = document.createElement("button");
  checkButton.className = "task-check";
  checkButton.type = "button";
  checkButton.textContent = task.completed ? "✓" : "";
  checkButton.setAttribute("aria-label", task.completed ? "Marcar como pendente" : "Marcar como concluída");
  checkButton.addEventListener("click", () => toggleTask(task.id));

  const main = document.createElement("div");
  main.className = "task-main";

  const title = document.createElement("span");
  title.className = "task-title";
  title.textContent = task.title;

  const meta = document.createElement("div");
  meta.className = "task-meta";

  const priority = document.createElement("span");
  priority.className = `priority priority-${task.priority}`;
  priority.textContent = `Prioridade ${task.priority} · ${priorityNames[task.priority]}`;

  const status = document.createElement("span");
  status.textContent = task.completed ? "Concluída" : "Pendente";

  meta.append(priority, status);
  main.append(title, meta);

  const actions = document.createElement("div");
  actions.className = "task-actions";

  const prioritySelect = document.createElement("select");
  prioritySelect.setAttribute("aria-label", `Alterar prioridade de ${task.title}`);
  [1, 2, 3].forEach(value => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = `Prioridade ${value}`;
    option.selected = task.priority === value;
    prioritySelect.append(option);
  });
  prioritySelect.addEventListener("change", event => changePriority(task.id, event.target.value));

  const removeButton = document.createElement("button");
  removeButton.className = "delete-button";
  removeButton.type = "button";
  removeButton.textContent = "×";
  removeButton.setAttribute("aria-label", `Excluir tarefa ${task.title}`);
  removeButton.addEventListener("click", () => deleteTask(task.id));

  actions.append(prioritySelect, removeButton);
  article.append(checkButton, main, actions);
  return article;
}

function renderTasks() {
  taskList.replaceChildren();

  const filteredTasks = tasks.filter(task => {
    if (currentFilter === "pending") return !task.completed;
    if (currentFilter === "done") return task.completed;
    return true;
  });

  filteredTasks.forEach(task => taskList.append(createTaskElement(task)));
  emptyState.hidden = filteredTasks.length > 0;
  taskList.hidden = filteredTasks.length === 0;

  document.querySelector("#totalCount").textContent = tasks.length;
  document.querySelector("#pendingCount").textContent = tasks.filter(task => !task.completed).length;
  document.querySelector("#doneCount").textContent = tasks.filter(task => task.completed).length;
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const title = titleInput.value.trim();

  if (title.length < 5) {
    showMessage("O título precisa ter pelo menos 5 caracteres.");
    titleInput.focus();
    return;
  }

  addTask(title, priorityInput.value);
  titleInput.value = "";
  priorityInput.value = "2";
  showMessage("Tarefa adicionada com sucesso!", false);
  titleInput.focus();
});

titleInput.addEventListener("input", () => {
  const remaining = Math.max(0, 5 - titleInput.value.trim().length);
  titleHint.textContent = remaining ? `Digite mais ${remaining} caractere(s).` : "Título válido.";
  titleHint.style.color = remaining ? "#9aa5ab" : "#3e9b79";
  if (formMessage.textContent) showMessage("");
});

document.querySelectorAll(".filter-button").forEach(button => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    document.querySelectorAll(".filter-button").forEach(item =>
      item.classList.toggle("active", item === button)
    );
    renderTasks();
  });
});

renderTasks();
